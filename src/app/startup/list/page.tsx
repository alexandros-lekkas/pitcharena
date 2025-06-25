"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    const { error } = await supabase.from("startups").insert({
      ...form,
      created_by: user.id,
    });
    if (error) setError(error.message);
    else {
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
    }
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
            {error && <div className="text-destructive text-sm">{error}</div>}
            {success && <div className="text-green-700 text-sm">Startup listed successfully!</div>}
            <Button type="submit" className="w-full">List Startup</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
