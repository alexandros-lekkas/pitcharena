import BookmarkButton from "../components/bookmark-button";
import CountryFlagIcon from "../components/country-flag-icon";
import TagBadge from "../../home/components/tag-badge";

const mockStartup = {
  id: "1",
  name: "EcoCharge",
  logo: "/logos/ecocharge.png",
  founders: ["Alice Brown", "Chris Doe"],
  incorporated: true,
  funded: false,
  openToInvestment: true,
  country: "US",
  description: "EcoCharge is building the next generation of sustainable battery technology for electric vehicles.",
};

export default function StartupDetailPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="flex flex-col items-center gap-4">
        <img src={mockStartup.logo} alt={mockStartup.name} className="w-32 h-32 rounded-xl object-cover bg-muted" />
        <h1 className="text-3xl font-bold flex items-center gap-2">
          {mockStartup.name}
          <CountryFlagIcon country={mockStartup.country} />
        </h1>
        <div className="flex gap-2 mt-2">
          <TagBadge variant={mockStartup.incorporated ? "default" : "secondary"}>
            {mockStartup.incorporated ? "Incorporated" : "Not Incorporated"}
          </TagBadge>
          <TagBadge variant={mockStartup.funded ? "default" : "secondary"}>
            {mockStartup.funded ? "Funded" : "Not Funded"}
          </TagBadge>
          {mockStartup.openToInvestment && (
            <TagBadge variant="outline">Open to Investment</TagBadge>
          )}
        </div>
        <p className="mt-4 text-lg text-center max-w-xl">{mockStartup.description}</p>
        <div className="mt-6 w-full">
          <h2 className="font-semibold mb-2">Founders</h2>
          <ul className="flex gap-3">
            {mockStartup.founders.map((founder, i) => (
              <li key={i} className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                {founder}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8">
          <BookmarkButton startupId={mockStartup.id} />
        </div>
      </div>
    </div>
  );
} 