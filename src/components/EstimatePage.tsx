import { Clock3, Sparkles, House } from "lucide-react";
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
  const firstName = knownName?.trim().split(/\s+/)[0];

  return (
    <main className="min-h-screen bg-white px-4 py-7 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.05em] text-foreground sm:text-[2.7rem]">
            {firstName ? (
              <>
                {firstName}, see how{" "}
                <span className={isPlaceholderCompany ? "text-muted-foreground" : "text-foreground"}>
                  {companyName}
                </span>{" "}
                could respond to every new lead instantly.
              </>
            ) : (
              <>
                See how{" "}
                <span className={isPlaceholderCompany ? "text-muted-foreground" : "text-foreground"}>
                  {companyName}
                </span>
                {" "}could respond to every new lead instantly.
              </>
            )}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[0.98rem] leading-7 text-muted-foreground sm:text-base">
            {firstName
              ? "Send a sample project request and receive a personalized follow-up in seconds."
              : "See the kind of fast, personalized follow-up your prospects could receive in under 60 seconds."}
          </p>
        </header>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {[
            { label: "Personalized reply", icon: "✓" },
            { label: "Usually under 60 sec", icon: <Clock3 className="size-3.5" /> },
            { label: "Built for home remodels", icon: <House className="size-3.5" /> },
          ].map((item) => (
            <div
              key={item.label}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700"
            >
              <span className="inline-flex size-5 items-center justify-center rounded-full bg-[linear-gradient(135deg,oklch(0.34_0.14_270),oklch(0.42_0.16_305))] text-[10px] font-bold text-white">
                {item.icon}
              </span>
              {item.label}
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10">
          <EstimateForm companyName={companyName} knownName={knownName} knownEmail={knownEmail} />
        </div>
      </div>
    </main>
  );
}
