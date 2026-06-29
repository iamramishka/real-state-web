import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { chromium } from "playwright";

const port = 3102;
const origin = `http://localhost:${port}`;
const reportDir = ".lighthouse";
const isWindows = process.platform === "win32";

function run(command, args, options = {}) {
  const { quiet = false, ...spawnOptions } = options;
  const executable =
    isWindows && ["npm", "npx"].includes(command) ? "cmd.exe" : command;
  const spawnArgs =
    executable === "cmd.exe" ? ["/d", "/s", "/c", command, ...args] : args;

  return new Promise((resolve, reject) => {
    const child = spawn(executable, spawnArgs, {
      stdio: quiet ? "pipe" : "inherit",
      ...spawnOptions,
    });
    const output = [];

    if (quiet) {
      child.stdout?.on("data", (chunk) => output.push(chunk));
      child.stderr?.on("data", (chunk) => output.push(chunk));
    }

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        const details = quiet ? `\n${Buffer.concat(output).toString()}` : "";
        reject(
          new Error(
            `${command} ${args.join(" ")} exited with ${code}${details}`,
          ),
        );
      }
    });
  });
}

async function waitForServer() {
  const startedAt = Date.now();

  while (Date.now() - startedAt < 120_000) {
    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {
      // Server is still booting.
    }
    await new Promise((resolve) => setTimeout(resolve, 1_000));
  }

  throw new Error(`Timed out waiting for ${origin}`);
}

async function runLighthouse(label, extraArgs = []) {
  const outputPath = join(reportDir, `${label}.json`);

  try {
    await run(
      "npx",
      [
        "--yes",
        "lighthouse@12.6.1",
        origin,
        "--only-categories=performance",
        "--output=json",
        `--output-path=${outputPath}`,
        "--quiet",
        "--throttling-method=provided",
        "--chrome-flags=--headless=new --no-sandbox",
        ...extraArgs,
      ],
      {
        env: {
          ...process.env,
          CHROME_PATH: chromium.executablePath(),
        },
        quiet: true,
      },
    );
  } catch (error) {
    if (!existsSync(outputPath)) throw error;
    console.warn(
      `${label} Lighthouse exited non-zero after writing ${outputPath}; continuing with the report.`,
    );
  }

  return JSON.parse(readFileSync(outputPath, "utf8"));
}

async function warmPage(viewport) {
  const browser = await chromium.launch({
    executablePath: chromium.executablePath(),
  });

  try {
    const page = await browser.newPage({ viewport });
    await page.goto(origin, { waitUntil: "load" });
    await page.waitForTimeout(1_500);
  } finally {
    await browser.close();
  }
}

function summarize(label, report) {
  return {
    cls: Number(
      report.audits["cumulative-layout-shift"].numericValue.toFixed(3),
    ),
    label,
    lcpMs: Math.round(report.audits["largest-contentful-paint"].numericValue),
    performance: Math.round((report.categories.performance.score ?? 0) * 100),
    tbtMs: Math.round(report.audits["total-blocking-time"].numericValue),
  };
}

function assertBudget(summary) {
  const failures = [];

  if (summary.performance < 90)
    failures.push(`performance ${summary.performance} < 90`);
  if (summary.lcpMs > 2500) failures.push(`LCP ${summary.lcpMs}ms > 2500ms`);
  if (summary.cls > 0.1) failures.push(`CLS ${summary.cls} > 0.1`);
  if (summary.tbtMs > 200) failures.push(`TBT ${summary.tbtMs}ms > 200ms`);

  if (failures.length > 0) {
    throw new Error(
      `${summary.label} Lighthouse budget failed: ${failures.join(", ")}`,
    );
  }
}

if (existsSync(reportDir)) {
  rmSync(reportDir, { force: true, recursive: true });
}
mkdirSync(reportDir, { recursive: true });

await run("npm", ["run", "build"]);

const server = spawn(
  isWindows ? "cmd.exe" : "npm",
  isWindows
    ? ["/d", "/s", "/c", "npm", "run", "start", "--", "--port", String(port)]
    : ["run", "start", "--", "--port", String(port)],
  {
    stdio: "inherit",
  },
);

try {
  await waitForServer();
  await warmPage({ height: 844, width: 390 });
  await warmPage({ height: 900, width: 1440 });

  const summaries = [
    summarize("mobile", await runLighthouse("mobile")),
    summarize("desktop", await runLighthouse("desktop", ["--preset=desktop"])),
  ];

  for (const summary of summaries) {
    assertBudget(summary);
    console.log(
      `${summary.label}: performance ${summary.performance}, LCP ${summary.lcpMs}ms, CLS ${summary.cls}, TBT ${summary.tbtMs}ms`,
    );
  }

  writeFileSync(
    join(reportDir, "summary.json"),
    `${JSON.stringify(summaries, null, 2)}\n`,
  );
} finally {
  if (server.pid && isWindows) {
    spawnSync("taskkill", ["/PID", String(server.pid), "/T", "/F"], {
      stdio: "ignore",
    });
  } else {
    server.kill();
  }
}
