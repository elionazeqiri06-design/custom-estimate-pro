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
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-md px-5 py-12">
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          AI lead response demo
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold leading-snug tracking-tight text-foreground">
          See how{" "}
          <span className={isPlaceholderCompany ? "text-muted-foreground" : "text-foreground"}>
            {companyName}
          </span>{" "}
          replies to every lead instantly
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Send an estimate request like a real homeowner would. You'll get the automated AI-written
          reply within seconds.
        </p>

        <div className="mt-8">
          <EstimateForm companyName={companyName} knownName={knownName} knownEmail={knownEmail} />
        </div>
      </div>
    </main>
  );
}
