"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ReactCountryFlag from "react-country-flag";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [startups, setStartups] = useState<any[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        window.location.href = "/auth/login";
      } else {
        setUser(data.user);
        // Fetch user's startups
        const { data: startups } = await supabase
          .from("startups")
          .select("*")
          .eq("created_by", data.user.id)
          .order("listed_at", { ascending: false });
        setStartups(startups || []);
        setLoading(false);
      }
    });
  }, []);

  async function handleDelete(startupId: string) {
    await supabase.from("startups").delete().eq("id", startupId);
    setStartups((prev) => prev.filter((s) => s.id !== startupId));
    setDeletingId(null);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="px-4 py-12 mx-auto max-w-2xl">
      <h1 className="mb-4 text-3xl font-bold">Dashboard</h1>
      <div className="mb-6">Welcome, {user?.email}!</div>
      <h2 className="text-xl font-semibold mb-4">Your Startups</h2>
      <div className="flex flex-col gap-4 mb-8">
        {startups.length === 0 && (
          <div className="text-muted-foreground">
            You haven't listed any startups yet.
          </div>
        )}
        {startups.map((startup) => (
          <Card
            key={startup.id}
            className="flex flex-col md:flex-row items-center gap-4 p-4"
          >
            {startup.logo_url && (
              <img
                src={startup.logo_url}
                alt={startup.name}
                className="w-16 h-16 rounded object-cover bg-muted"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg">{startup.name}</span>
                <span title={startup.country} className="text-xl">
                  <ReactCountryFlag
                    countryCode={startup.country}
                    svg
                    style={{
                      width: "1.2em",
                      height: "1.2em",
                      verticalAlign: "middle",
                      borderRadius: "0.2em",
                    }}
                  />
                </span>
              </div>
              <div className="flex gap-2 mt-1">
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
              <div className="text-xs text-muted-foreground mt-1">
                Listed at: {new Date(startup.listed_at).toLocaleString()}
              </div>
            </div>
            <div className="flex flex-col gap-2 min-w-[120px]">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeletingId(startup.id)}
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Startup</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete <b>{startup.name}</b>?
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setDeletingId(null)}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(startup.id)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </Card>
        ))}
      </div>
      <Button
        onClick={async () => {
          await supabase.auth.signOut();
          window.location.href = "/auth/login";
        }}
      >
        Logout
      </Button>
    </div>
  );
}
