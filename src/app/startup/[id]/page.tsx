"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import ReactCountryFlag from "react-country-flag";
import { User } from "lucide-react";

export default function StartupDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [startup, setStartup] = useState<any>(null);
  const [founders, setFounders] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    async function fetchStartup() {
      setLoading(true);
      setError(null);
      // Fetch startup
      const { data, error } = await supabase
        .from("startups")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error || !data) {
        setError(error ? error.message : "Startup not found");
        setLoading(false);
        return;
      }
      setStartup(data);
      // Fetch founders
      const { data: foundersData } = await supabase
        .from("startup_founders")
        .select("users(name)")
        .eq("startup_id", id);
      setFounders(
        foundersData?.map((f: any) => f.users?.name).filter(Boolean) || []
      );
      setLoading(false);
    }
    fetchStartup();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">Loading...</div>
    );
  if (error || !startup)
    return (
      <div className="flex justify-center items-center min-h-screen text-destructive">
        {error || "Startup not found"}
      </div>
    );

  return (
    <div className="px-4 py-10 mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            {startup.name}
            <span title={startup.country} className="text-xl">
              <ReactCountryFlag
                countryCode={startup.country}
                svg
                style={{
                  width: "1.5em",
                  height: "1.5em",
                  verticalAlign: "middle",
                  borderRadius: "0.2em",
                }}
              />
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {startup.logo_url && (
            <img
              src={startup.logo_url}
              alt={startup.name}
              className="object-cover mb-4 w-32 h-32 rounded-xl bg-muted"
            />
          )}
          <div className="mb-4 text-muted-foreground">{startup.description}</div>
          <div className="flex gap-2 mb-4">
            <Badge
              variant={startup.incorporated ? "default" : "secondary"}
              className={
                startup.incorporated
                  ? "bg-primary text-primary-foreground px-3"
                  : "bg-muted text-muted-foreground px-3"
              }
            >
              Incorporated: {startup.incorporated ? "Yes" : "No"}
            </Badge>
            <Badge
              variant={startup.funded ? "default" : "secondary"}
              className={
                startup.funded
                  ? "bg-primary text-primary-foreground px-3"
                  : "bg-muted text-muted-foreground px-3"
              }
            >
              Funded: {startup.funded ? "Yes" : "No"}
            </Badge>
            {startup.open_to_investment && (
              <Badge
                variant="outline"
                className="px-3 text-green-700 bg-green-100 border-green-200"
              >
                Open to Investment
              </Badge>
            )}
          </div>
          <div className="mb-4">
            <span className="text-sm text-muted-foreground">Founders:</span>
            <span className="flex gap-1 items-center ml-2">
              {founders.length === 0 ? (
                <Avatar className="w-7 h-7 text-muted-foreground bg-muted">
                  <User className="w-4 h-4" />
                </Avatar>
              ) : (
                founders.map((f, i) => (
                  <Avatar
                    key={i}
                    className="flex justify-center items-center -ml-2 w-7 h-7 text-xs font-bold border-2 text-primary bg-muted border-card first:ml-0"
                  >
                    {f.length <= 2
                      ? f
                      : f
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                  </Avatar>
                ))
              )}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            Listed at: {startup.listed_at ? new Date(startup.listed_at).toLocaleString() : "N/A"}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 