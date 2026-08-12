import { createFileRoute } from "@tanstack/react-router";
import { EstimatePage } from "@/components/EstimatePage";

type Search = { name?: string | undefined; email?: string | undefined; company?: string };

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    name: typeof search["name"] === "string" ? search["name"].slice(0, 100) : undefined,
    email: typeof search["email"] === "string" ? search["email"].slice(0, 255) : undefined,
    company: typeof search["company"] === "string" ? search["company"].slice(0, 80) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Instant Estimate Requests for Remodelers | Lead Response Demo" },
      {
        name: "description",
        content:
          "Send a home remodeling estimate request and watch an AI-written reply go out in seconds. Live demo of an automated lead-response system.",
      },
      { property: "og:title", content: "Instant Estimate Requests for Remodelers" },
      {
        property: "og:description",
        content:
          "Request a remodeling estimate and see how an AI lead-response system replies in under a minute.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { name, email, company } = Route.useSearch();
  const trimmedCompany = company?.trim();

  return (
    <EstimatePage
      companyName={trimmedCompany || "Your Company"}
      isPlaceholderCompany={!trimmedCompany}
      knownName={name?.trim() || undefined}
      knownEmail={email?.trim() || undefined}
    />
  );
}
