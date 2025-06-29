"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase/client";

import { StartupCard } from "@/components/startup-card";

import { Tables } from "@/types/supabase";

export default function HomePage() {
  const [startups, setStartups] = useState<Tables<"startups">[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStartups = async () => {
      const { data, error } = await supabase.from("startups").select("*");

      if (error) console.log(error);

      setStartups(data || []);
    };

    fetchStartups();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {loading ? (
        <div className="flex col-span-full justify-center py-20 text-lg text-muted-foreground">
          Loading startups...
        </div>
      ) : startups.length === 0 ? (
        <div className="flex col-span-full justify-center py-20 text-lg text-muted-foreground">
          No startups found.
        </div>
      ) : (
        startups.map((startup) => (
          <StartupCard key={startup.id} startup={startup} />
        ))
      )}
    </div>
  );
}
