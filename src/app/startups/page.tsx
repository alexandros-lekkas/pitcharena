import StartupCard from "@/components/StartupCard";
import { startups } from "@/data/startups";
import Link from "next/link";

const industries = ["All", ...Array.from(new Set(startups.map(s => s.industry)))];
const stages = ["All", "Seed", "Series A", "Series B"];
const locations = ["All", "Remote", "Berlin", "London", "NYC"];

export default function StartupsPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-primary">Browse Startups</h1>
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 mb-8 items-center">
        <select className="select select-bordered" aria-label="Industry">
          {industries.map((ind) => (
            <option key={ind}>{ind}</option>
          ))}
        </select>
        <select className="select select-bordered" aria-label="Stage">
          {stages.map((stage) => (
            <option key={stage}>{stage}</option>
          ))}
        </select>
        <select className="select select-bordered" aria-label="Location">
          {locations.map((loc) => (
            <option key={loc}>{loc}</option>
          ))}
        </select>
        <div className="ml-auto">
          <select className="select select-bordered" aria-label="Sort">
            <option>Newest</option>
            <option>Trending</option>
          </select>
        </div>
      </div>
      {/* Grid of Startups */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {startups.map((s) => (
          <StartupCard key={s.id} {...s} />
        ))}
      </div>
    </main>
  );
} 