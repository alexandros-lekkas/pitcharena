"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/use-auth";

export default function UserProfilePage() {
  const params = useParams();
  const id = params?.id as string;
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [startups, setStartups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    async function fetchUser() {
      setLoading(true);
      setError(null);
      // Fetch user
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error || !data) {
        setError(error ? error.message : "User not found");
        setLoading(false);
        return;
      }
      setUser(data);
      // Fetch startups founded by this user
      const { data: startupsData } = await supabase
        .from("startups")
        .select("*")
        .eq("created_by", id)
        .order("listed_at", { ascending: false });
      setStartups(startupsData || []);
      setLoading(false);
    }
    fetchUser();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">Loading...</div>
    );
  if (error || !user)
    return (
      <div className="flex justify-center items-center min-h-screen text-destructive">
        {error || "User not found"}
      </div>
    );

  const isSelf = currentUser?.id === user.id;

  return (
    <div className="px-4 py-10 mx-auto max-w-2xl">
      <Card>
        <CardHeader className="flex flex-col items-center gap-4">
          <Avatar className="w-20 h-20 text-3xl font-bold bg-secondary text-secondary-foreground">
            {user.name ? user.name[0] : "U"}
          </Avatar>
          <CardTitle className="text-2xl font-bold text-center">{user.name || "User"}</CardTitle>
          <div className="text-muted-foreground text-center">{user.role || "No role"}</div>
          {user.bio && <div className="text-center text-base mt-2">{user.bio}</div>}
          <div className="flex gap-3 mt-4">
            {isSelf ? (
              <Button variant="outline">Edit Profile</Button>
            ) : (
              <Button variant="default">Message</Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="mt-6">
            <div className="font-semibold mb-2">Startups Founded</div>
            {startups.length === 0 ? (
              <div className="text-muted-foreground text-sm">No startups listed yet.</div>
            ) : (
              <ul className="flex flex-col gap-2">
                {startups.map((s) => (
                  <li key={s.id}>
                    <a href={`/startup/${s.id}`} className="text-primary hover:underline font-medium">
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 