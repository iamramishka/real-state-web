import { AgentCard } from "@/components/cards/AgentCard";
import { featuredAgents } from "@/data/agents";

export function Agents() {
  return (
    <section aria-labelledby="agents-title" className="bg-bg-soft section-y">
      <div className="container-page grid gap-8">
        <div className="grid gap-3 md:max-w-2xl">
          <h2
            className="font-display text-h1 text-ink font-semibold text-balance"
            id="agents-title"
          >
            Meet our expert agents
          </h2>
          <p className="text-body-lg text-muted">
            Local knowledge, honest advice, and a track record you can trust.
          </p>
        </div>

        {featuredAgents.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredAgents.map((agent) => (
              <AgentCard agent={agent} key={agent.id} />
            ))}
          </div>
        ) : (
          <p className="border-line bg-surface text-body text-muted rounded-lg border p-5">
            {
              "Agent profiles are loading. If they don't appear, please refresh the page."
            }
          </p>
        )}
      </div>
    </section>
  );
}
