"use client";

import { StartupCard } from "@/components/startup-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const mockStartups = [
  {
    id: "1",
    name: "EcoTech Solutions",
    logo: "",
    founders: ["AB", "CD"],
    incorporated: true,
    funded: false,
    openToInvestment: true,
    country: "US",
    listedAt: "2024-06-01T12:00:00Z",
    description: "Sustainable technology for a greener future",
  },
  {
    id: "2",
    name: "FinanceAI",
    logo: "",
    founders: ["EF"],
    incorporated: true,
    funded: true,
    openToInvestment: false,
    country: "GB",
    listedAt: "2024-05-28T09:00:00Z",
    description: "AI-powered financial planning for everyone",
  },
  {
    id: "3",
    name: "HealthTrack Pro",
    logo: "",
    founders: ["GH", "IJ", "KL"],
    incorporated: false,
    funded: false,
    openToInvestment: true,
    country: "CA",
    listedAt: "2024-06-03T09:00:00Z",
    description: "Personal health monitoring made simple",
  },
];

export default function HomePage() {
  return (
    <div className="px-4 py-10 mx-auto max-w-7xl bg-background text-foreground">
      {/* Search, Filter, Trending Bar */}
      <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center">
        <div className="flex flex-1 items-center px-4 py-3 rounded-lg border shadow-sm bg-card text-card-foreground border-border">
          <svg
            className="mr-2 w-5 h-5 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <Input
            className="flex-1 px-0 text-base bg-transparent border-0 shadow-none outline-none"
            placeholder="Search startups..."
          />
        </div>
        <Button
          variant="outline"
          className="flex gap-2 items-center px-5 py-2 font-semibold rounded-lg border transition bg-card text-card-foreground border-border hover:bg-muted"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Filter
        </Button>
        <span className="px-5 py-2 text-base font-semibold rounded-full bg-secondary text-secondary-foreground">
          Trending
        </span>
      </div>
      {/* Startup Cards Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {mockStartups.map((startup) => (
          <StartupCard key={startup.id} {...startup} />
        ))}
      </div>
      {/* Load More Button */}
      <div className="flex justify-center mt-10">
        <Button
          variant="outline"
          className="px-8 py-3 font-semibold rounded-lg border-2 transition bg-card text-card-foreground border-border hover:bg-muted"
        >
          Load More Startups
        </Button>
      </div>
    </div>
  );
}
