import { createFileRoute } from "@tanstack/react-router";
import { EstimatePage, slugToCompany } from "@/components/EstimatePage";

type Search = {
  name?: string | undefined;
  email?: string | undefined;
};

export const Route = createFileRoute("/$company")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    name: typeof search["name"] === "string" ? search["name"].slice(0, 100) : undefined,
    email: typeof search["email"] === "string" ? search["email"].slice(0, 255) : undefined,
  }),
  head: ({ params }) => {
    const company = slugToCompany(params.company) || "Your Company";
    return {
      meta: [
        { title: `${company} — Request a Remodeling Estimate` },
        {
          name: "description",
          content: `Request a project estimate from ${company} and see the automated AI-written reply arrive in seconds.`,
        },
        { property: "og:title", content: `${company} — Request a Remodeling Estimate` },
        {
          property: "og:description",
          content: `See how ${company} could respond to every remodeling lead instantly.`,
        },
      ],
    };
  },
  component: CompanyPage,
});

function CompanyPage() {
  const { company } = Route.useParams();
  const { name, email } = Route.useSearch();
  const companyName = slugToCompany(company) || "Your Company";

  return (
    <EstimatePage
      companyName={companyName}
      isPlaceholderCompany={!slugToCompany(company)}
      knownName={name?.trim() || undefined}
      knownEmail={email?.trim() || undefined}
    />
  );
}
