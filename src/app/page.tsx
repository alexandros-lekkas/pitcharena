"use client";
import StartupCard from "./home/components/startup-card";

const mockStartups = [
  {
    id: "1",
    name: "EcoCharge",
    logo: "/logos/ecocharge.png",
    founders: ["AB", "CD"],
    incorporated: true,
    funded: false,
    openToInvestment: true,
    country: "US",
    listedAt: "2024-06-01T12:00:00Z",
  },
  {
    id: "2",
    name: "HealthSync",
    logo: "/logos/healthsync.png",
    founders: ["EF"],
    incorporated: false,
    funded: true,
    openToInvestment: false,
    country: "GB",
    listedAt: "2024-06-03T09:00:00Z",
  },
  // Add more mock startups as needed
];

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Filter and Trending Section Placeholder */}
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex gap-2">
          <input className="input input-bordered w-full" placeholder="Search startups..." />
          {/* Add filter dropdowns here */}
        </div>
        <div className="bg-secondary/10 rounded-lg p-4 text-secondary-foreground">
          <span className="font-semibold">Trending Startups</span>
          <div className="flex gap-2 mt-2">
            {/* Trending startup badges (mocked) */}
            <span className="badge badge-secondary">EcoCharge</span>
            <span className="badge badge-secondary">HealthSync</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {mockStartups.map((startup) => (
          <StartupCard key={startup.id} startup={startup} />
        ))}
      </div>
    </div>
  );
} 