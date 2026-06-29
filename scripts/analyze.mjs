import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { gzipSync } from "node:zlib";

const budgetBytes = 200 * 1024;
const isWindows = process.platform === "win32";

function run(command, args, options = {}) {
  const executable =
    isWindows && ["npm", "npx"].includes(command) ? "cmd.exe" : command;
  const spawnArgs =
    executable === "cmd.exe" ? ["/d", "/s", "/c", command, ...args] : args;

  return new Promise((resolve, reject) => {
    const child = spawn(executable, spawnArgs, {
      stdio: "inherit",
      ...options,
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(" ")} exited with ${code}`));
      }
    });
  });
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function collectHomeFiles() {
  const files = new Set();
  const buildManifestPath = join(".next", "build-manifest.json");
  const appManifestPath = join(".next", "app-build-manifest.json");

  if (existsSync(buildManifestPath)) {
    const manifest = readJson(buildManifestPath);
    for (const file of manifest.rootMainFiles ?? []) {
      if (file.endsWith(".js")) files.add(file);
    }
    for (const file of manifest.pages?.["/"] ?? []) {
      if (file.endsWith(".js")) files.add(file);
    }
  }

  if (existsSync(appManifestPath)) {
    const manifest = readJson(appManifestPath);
    for (const file of manifest.pages?.["/page"] ?? []) {
      if (file.endsWith(".js")) files.add(file);
    }
  }

  return [...files];
}

await run("npx", ["next", "build"], {
  env: {
    ...process.env,
    ANALYZE: "true",
  },
});

const chunks = collectHomeFiles().map((file) => {
  const absolutePath = join(".next", file);
  const raw = readFileSync(absolutePath);

  return {
    bytes: statSync(absolutePath).size,
    file,
    gzipBytes: gzipSync(raw).length,
  };
});

const totalGzipBytes = chunks.reduce(
  (total, chunk) => total + chunk.gzipBytes,
  0,
);
const report = {
  budgetBytes,
  chunks,
  totalGzipBytes,
  totalGzipKb: Number((totalGzipBytes / 1024).toFixed(1)),
};

writeFileSync(
  join(".next", "bundle-budget.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);

console.log(
  `Home JS bundle gzip: ${report.totalGzipKb} KB / ${(budgetBytes / 1024).toFixed(0)} KB`,
);

if (totalGzipBytes > budgetBytes) {
  throw new Error("Home JS bundle exceeds the 200 KB gzip budget.");
}
