import { Clock, MessageSquareReply, ShieldCheck } from "lucide-react";
import { EstimateForm } from "./EstimateForm";

export function slugToCompany(slug: string): string {
  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => (w.length <= 3 && w === w.toUpperCase() ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

type Props = {
  companyName: string;
  isPlaceholderCompany?: boolean;
  knownName?: string | undefined;
  knownEmail?: string | undefined;
};

export function EstimatePage({
  companyName,
  isPlaceholderCompany = false,
  knownName,
  knownEmail,
}: Props) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[var(--gradient-hero)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] size-[36rem] rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-24">
        <section>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs font-medium tracking-wide text-muted-foreground">
            <span className="size-1.5 rounded-full bg-accent" />
            AI lead response demo
          </div>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
            See how{" "}
            <span className={isPlaceholderCompany ? "text-muted-foreground" : "text-accent"}>
              {companyName}
            </span>{" "}
            could respond to every lead instantly
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Submit an estimate request the way a real homeowner would. Within seconds you'll see the
            automated, AI-written reply {companyName} could be sending — no missed calls, no leads
            gone cold overnight.
          </p>

          <dl className="mt-10 grid gap-5 sm:grid-cols-3">
            <Stat icon={<Clock className="size-4" />} value="< 60 sec" label="First reply time" />
            <Stat
              icon={<MessageSquareReply className="size-4" />}
              value="100%"
              label="Leads answered"
            />
            <Stat icon={<ShieldCheck className="size-4" />} value="24/7" label="Always covering" />
          </dl>

          <ul className="mt-10 space-y-3 border-t border-border pt-8 text-sm text-muted-foreground">
            <li>Every inbound request captured with full project context.</li>
            <li>Personalized reply drafted and sent while interest is highest.</li>
            <li>Your team steps in only when the lead is warm and qualified.</li>
          </ul>
        </section>

        <section className="lg:pt-6">
          <EstimateForm companyName={companyName} knownName={knownName} knownEmail={knownEmail} />
        </section>
      </div>
    </main>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div>
      <span className="flex size-8 items-center justify-center rounded-md bg-secondary text-accent">
        {icon}
      </span>
      <dt className="mt-3 font-display text-xl font-semibold text-foreground">{value}</dt>
      <dd className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dd>
    </div>
  );
}
