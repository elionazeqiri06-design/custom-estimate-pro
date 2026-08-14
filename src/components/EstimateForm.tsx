import { useState } from "react";
import { z } from "zod";
import { ArrowRight, CheckCircle2, Loader2, Mail, Sparkles, Zap } from "lucide-react";

const WEBHOOK_URL = "https://n8n.piplineloop.com/webhook/demo-estimate";

const PROJECT_TYPES = [
  "Kitchen Remodel",
  "Bathroom Remodel",
  "Full Home Renovation",
  "Addition/ADU",
  "Other",
] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  project_type: z.string().trim().min(1, "Please choose a project type"),
  description: z
    .string()
    .trim()
    .min(10, "Tell us a little more about your project")
    .max(2000, "Please keep it under 2000 characters"),
});

export type EstimateFormProps = {
  companyName: string;
  knownName?: string | undefined;
  knownEmail?: string | undefined;
};

export function EstimateForm({ companyName, knownName, knownEmail }: EstimateFormProps) {
  const contactKnown = Boolean(knownName && knownEmail);

  const [name, setName] = useState(knownName ?? "");
  const [email, setEmail] = useState(knownEmail ?? "");
  const [projectType, setProjectType] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    const parsed = schema.safeParse({
      name,
      email,
      project_type: projectType,
      description,
    });

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company_name: companyName, ...parsed.data }),
      });
      setStatus("done");
    } catch {
      setStatus("idle");
      setSubmitError("We couldn't send that just now. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
        <div className="flex size-9 items-center justify-center rounded-full bg-secondary text-foreground">
          <CheckCircle2 className="size-5" />
        </div>
        <h2 className="mt-4 font-display text-base font-semibold tracking-[-0.03em] text-card-foreground">
          Request received
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Thanks{parsed(name)}. Your request for{" "}
          <span className="text-card-foreground">{projectType.toLowerCase()}</span> is in, and an
          personalized reply from {companyName} is on its way to{" "}
          <span className="text-card-foreground">{email}</span>.
        </p>
        <div className="mt-6 space-y-2.5 border-t border-[rgba(0,0,0,0)] pt-5">
          <Step icon={<Zap className="size-3.5" />} label="Lead captured and routed instantly" />
          <Step icon={<Sparkles className="size-3.5" />} label="A tailored reply is prepared" />
          <Step icon={<Mail className="size-3.5" />} label="Reply lands in the inbox in seconds" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[42rem] rounded-xl border border-neutral-200 bg-white p-6 sm:p-7">
      <div className="bg-transparent p-0">
        <h2 className="text-left font-display text-[1.1rem] font-semibold tracking-[-0.04em] text-card-foreground sm:text-[1.1rem]">
          Try your lead-response experience
        </h2>
        <p className="mt-2 text-left text-[1.1rem] text-muted-foreground sm:text-[1.1rem]">
          {contactKnown
            ? "Send a sample project request and see the experience your leads could receive."
            : "Enter your email and we'll send the sample response to your inbox."}
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <Field error={errors["name"]}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              maxLength={100}
              className="form-control w-full"
            />
          </Field>
          <Field error={errors["email"]}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              maxLength={255}
              className="form-control w-full"
            />
          </Field>

          <Field error={errors["project_type"]}>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="form-control w-full"
            >
              <option value="">How can we help?</option>
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>

          <Field error={errors["description"]}>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              maxLength={2000}
              placeholder="Tell us about your project (e.g. remodel a 12x14 kitchen)"
              className="form-control w-full resize-y"
            />
          </Field>

          {submitError && <p className="text-sm text-destructive">{submitError}</p>}

          <button type="submit" disabled={status === "loading"} className="btn-primary mt-1 w-full rounded-xl text-sm sm:text-[0.95rem]">
            {status === "loading" ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Sending your request…
              </>
            ) : (
              <>
                Send my estimate request
              </>
            )}
          </button>

          <p className="pt-1 text-center text-[11px] leading-relaxed text-muted-foreground">
            Your details are used only to deliver your estimate request.
          </p>
        </form>
      </div>
    </div>
  );
}

function parsed(name: string) {
  const first = name.trim().split(/\s+/)[0];
  return first ? `, ${first}` : "";
}

function Field({
  label,
  error,
  children,
}: {
  label?: string | undefined;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      {label && (
        <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </span>
      )}
      {children}
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function Step({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <span className="flex size-7 items-center justify-center rounded-md bg-secondary text-accent">
        {icon}
      </span>
      {label}
    </div>
  );
}
