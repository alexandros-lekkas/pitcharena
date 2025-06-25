"use client";
import StartupCard from "./home/components/startup-card";

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
    <div className="max-w-7xl mx-auto py-10 px-4">
      {/* Search, Filter, Trending Bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <div className="flex-1 flex items-center bg-white rounded-lg shadow-sm px-4 py-3 border border-gray-200">
          <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
          <input className="flex-1 outline-none bg-transparent text-base" placeholder="Search startups..." />
        </div>
        <button className="flex items-center gap-2 px-5 py-2 rounded-lg border border-primary text-primary font-semibold bg-white hover:bg-primary/10 transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          Filter
        </button>
        <span className="px-5 py-2 rounded-full bg-secondary text-white font-semibold text-base">Trending</span>
      </div>
      {/* Startup Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockStartups.map((startup) => (
          <StartupCard key={startup.id} startup={startup} />
        ))}
      </div>
      {/* Load More Button */}
      <div className="flex justify-center mt-10">
        <button className="px-8 py-3 rounded-lg border-2 border-primary text-primary font-semibold bg-white hover:bg-primary/10 transition">
          Load More Startups
        </button>
      </div>
    </div>
  );
} 