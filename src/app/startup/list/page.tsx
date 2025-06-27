"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const tagOptions = [
  { label: "Incorporated", value: "incorporated" },
  { label: "Funded", value: "funded" },
  { label: "Open to Investment", value: "openToInvestment" },
];
const countryOptions = [
  { label: "United States", value: "US" },
  { label: "United Kingdom", value: "GB" },
  { label: "Canada", value: "CA" },
  // Add more countries as needed
];

export default function ListStartupPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    logo_url: "",
    description: "",
    country: "",
    incorporated: false,
    funded: false,
    open_to_investment: false,
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [founders, setFounders] = useState<string[]>([]);
  const [founderInput, setFounderInput] = useState("");
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = "/auth/login";
      } else {
        setUser(data.user);
        setLoading(false);
      }
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    // Insert startup
    const { data: startupData, error } = await supabase.from("startups").insert({
      ...form,
      created_by: user.id,
    }).select();
    if (error || !startupData || !startupData[0]) {
      setError(error?.message || "Failed to create startup");
      return;
    }
    const startupId = startupData[0].id;
    // Insert founders (if any)
    for (const founder of founders) {
      let userId = null;
      const { data: userByEmail } = await supabase.from("users").select("id").eq("email", founder).maybeSingle();
      if (userByEmail?.id) userId = userByEmail.id;
      else {
        const { data: userByName } = await supabase.from("users").select("id").eq("name", founder).maybeSingle();
        if (userByName?.id) userId = userByName.id;
      }
      if (userId) {
        await supabase.from("startup_founders").insert({ startup_id: startupId, user_id: userId });
      }
    }
    setSuccess(true);
    setForm({
      name: "",
      logo_url: "",
      description: "",
      country: "",
      incorporated: false,
      funded: false,
      open_to_investment: false,
    });
    setFounders([]);
    setFounderInput("");
    // Redirect to the new startup's page
    router.push(`/startup/${startupId}`);
  }

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle>List a Startup</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Startup Name</Label>
              <Input id="name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="logo_url">Logo URL</Label>
              <Input id="logo_url" value={form.logo_url} onChange={e => setForm(f => ({ ...f, logo_url: e.target.value }))} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input id="description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="country">Country (ISO code, e.g. US)</Label>
              <Input id="country" value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value.toUpperCase() }))} required />
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.incorporated} onChange={e => setForm(f => ({ ...f, incorporated: e.target.checked }))} /> Incorporated
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.funded} onChange={e => setForm(f => ({ ...f, funded: e.target.checked }))} /> Funded
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.open_to_investment} onChange={e => setForm(f => ({ ...f, open_to_investment: e.target.checked }))} /> Open to Investment
              </label>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="founders">Founders (add by email or name)</Label>
              <div className="flex gap-2">
                <Input
                  id="founders"
                  value={founderInput}
                  onChange={e => setFounderInput(e.target.value)}
                  placeholder="Enter founder email or name"
                  onKeyDown={e => {
                    if ((e.key === "Enter" || e.key === ",") && founderInput.trim()) {
                      e.preventDefault();
                      if (!founders.includes(founderInput.trim())) {
                        setFounders(f => [...f, founderInput.trim()]);
                      }
                      setFounderInput("");
                    }
                  }}
                />
                <Button type="button" onClick={() => {
                  if (founderInput.trim() && !founders.includes(founderInput.trim())) {
                    setFounders(f => [...f, founderInput.trim()]);
                    setFounderInput("");
                  }
                }}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {founders.map((f, i) => (
                  <span key={i} className="flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs">
                    {f}
                    <button type="button" aria-label="Remove founder" onClick={() => setFounders(founders.filter((x, idx) => idx !== i))}>
                      <X className="w-3 h-3 ml-1" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
            {error && <div className="text-destructive text-sm">{error}</div>}
            {success && <div className="text-green-700 text-sm">Startup listed successfully!</div>}
            <Button type="submit" className="w-full">List Startup</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
