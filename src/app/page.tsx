"use client";

import { StartupCard } from "@/app/startup/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function HomePage() {
  const [startups, setStartups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStartups() {
      // Fetch all startups
      const { data: startupsData, error } = await supabase
        .from("startups")
        .select("*")
        .order("listed_at", { ascending: false });
      if (error) {
        setStartups([]);
        setLoading(false);
        return;
      }
      // Fetch all founders for all startups
      const { data: foundersData } = await supabase
        .from("startup_founders")
        .select("startup_id, users(name)");
      // Map startup_id to array of founder names
      const foundersMap: Record<string, string[]> = {};
      if (foundersData) {
        for (const row of foundersData) {
          if (!foundersMap[row.startup_id]) foundersMap[row.startup_id] = [];
          if (row.users?.name) foundersMap[row.startup_id].push(row.users.name);
        }
      }
      // Map startups to StartupCard props
      const mapped = (startupsData || []).map((s: any) => ({
        id: s.id,
        name: s.name,
        logo: s.logo_url,
        founders: foundersMap[s.id] || [],
        incorporated: s.incorporated,
        funded: s.funded,
        openToInvestment: s.open_to_investment,
        country: s.country,
        listedAt: s.listed_at,
        description: s.description,
      }));
      setStartups(mapped);
      setLoading(false);
    }
    fetchStartups();
  }, []);

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl bg-background text-foreground">
      {/* Search Bar Only, right-aligned and smaller */}
      <div className="flex justify-end mb-8">
        <div className="flex items-center px-2 py-2 rounded-lg border shadow-sm bg-card text-card-foreground border-border w-full max-w-xs">
          <svg
            className="mr-2 w-4 h-4 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <Input
            className="flex-1 px-0 text-sm bg-transparent border-0 shadow-none outline-none"
            placeholder="Search startups..."
          />
        </div>
      </div>
      {/* Startup Cards Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="flex col-span-full justify-center py-20 text-lg text-muted-foreground">Loading startups...</div>
        ) : startups.length === 0 ? (
          <div className="flex col-span-full justify-center py-20 text-lg text-muted-foreground">No startups found.</div>
        ) : (
          startups.map((startup) => (
            <StartupCard key={startup.id} {...startup} />
          ))
        )}
      </div>
    </div>
  );
}
