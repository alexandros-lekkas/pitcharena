import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Step3({ onSubmit, loading, error, initialName }: {
  onSubmit: (name: string) => void,
  loading: boolean,
  error: string | null,
  initialName?: string
}) {
  const [name, setName] = useState(initialName || "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(name);
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Set up your profile</CardTitle>
          <CardDescription>
            Add your name
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            {error && <div className="text-destructive text-sm">{error}</div>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : "Finish"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 