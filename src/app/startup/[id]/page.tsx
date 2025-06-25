"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ReactCountryFlag from "react-country-flag";
import BookmarkButton from "../components/bookmark-button";
import TagBadge from "../../home/components/tag-badge";

export default function StartupDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [startup, setStartup] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    supabase.from("startups").select("*").eq("id", id).single().then(({ data, error }) => {
      if (error) setError(error.message);
      else setStartup(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (error || !startup) return <div className="flex items-center justify-center min-h-screen text-destructive">{error || "Startup not found"}</div>;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {startup.name}
            <span title={startup.country} className="text-xl">
              <ReactCountryFlag countryCode={startup.country} svg style={{ width: "1.5em", height: "1.5em", verticalAlign: "middle", borderRadius: "0.2em" }} />
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {startup.logo_url && (
            <img src={startup.logo_url} alt={startup.name} className="w-32 h-32 rounded-xl object-cover bg-muted mb-4" />
          )}
          <div className="mb-4 text-muted-foreground">{startup.description}</div>
          <div className="flex gap-2 mb-4">
            <Badge variant={startup.incorporated ? "default" : "secondary"} className={startup.incorporated ? "bg-primary text-primary-foreground px-3" : "bg-muted text-muted-foreground px-3"}>
              Incorporated: {startup.incorporated ? "Yes" : "No"}
            </Badge>
            <Badge variant={startup.funded ? "default" : "secondary"} className={startup.funded ? "bg-primary text-primary-foreground px-3" : "bg-muted text-muted-foreground px-3"}>
              Funded: {startup.funded ? "Yes" : "No"}
            </Badge>
            {startup.open_to_investment && (
              <Badge variant="outline" className="px-3 text-green-700 bg-green-100 border-green-200">
                Open to Investment
              </Badge>
            )}
          </div>
          <div className="text-xs text-muted-foreground">Listed at: {new Date(startup.listed_at).toLocaleString()}</div>
        </CardContent>
      </Card>
      <div className="mt-8">
        <BookmarkButton startupId={startup.id} />
      </div>
    </div>
  );
} 