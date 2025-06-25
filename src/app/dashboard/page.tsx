"use client";
import { useState } from "react";
import DashboardCard from "./components/dashboard-card";

const mockFounderStartups = [
  { id: "1", name: "EcoCharge", status: "Listed" },
  { id: "2", name: "HealthSync", status: "Listed" },
];
const mockBookmarked = [
  { id: "1", name: "EcoCharge", status: "Bookmarked" },
];
const mockContacted = [
  { id: "2", name: "HealthSync", status: "Contacted" },
];

export default function DashboardPage() {
  const [role, setRole] = useState<"founder" | "investor">("founder");
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${role === "founder" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
          onClick={() => setRole("founder")}
        >
          Founder View
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${role === "investor" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
          onClick={() => setRole("investor")}
        >
          Investor View
        </button>
      </div>
      {role === "founder" ? (
        <div>
          <h2 className="font-bold text-xl mb-4">Your Startups</h2>
          <div className="flex flex-col gap-4">
            {mockFounderStartups.map((startup) => (
              <DashboardCard key={startup.id} startup={startup} role="founder" />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="font-bold text-xl mb-4">Bookmarked Startups</h2>
          <div className="flex flex-col gap-4 mb-8">
            {mockBookmarked.map((startup) => (
              <DashboardCard key={startup.id} startup={startup} role="investor" />
            ))}
          </div>
          <h2 className="font-bold text-xl mb-4">Contacted Startups</h2>
          <div className="flex flex-col gap-4">
            {mockContacted.map((startup) => (
              <DashboardCard key={startup.id} startup={startup} role="investor" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 