"use client";

import { useState } from "react";

import { supabase } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";

import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"founder" | "investor">("founder");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Step 1: Email/password signup
  function handleStep1Success(email: string, password: string) {
    setEmail(email);
    setPassword(password);
    setStep(2);
  }

  // Step 2: Role select
  function handleStep2Select(selectedRole: "founder" | "investor") {
    setRole(selectedRole);
    setStep(3);
  }

  // Step 3: Name
  async function handleStep3Submit(name: string) {
    setLoading(true);
    setError(null);
    setName(name);
    // Update user profile in your users table
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      setError("No user session");
      setLoading(false);
      return;
    }
    const { error } = await supabase.from("users").upsert({
      id: user.id,
      name,
      role,
    });
    setLoading(false);
    if (error) setError(error.message);
    else setSuccess(true);
  }

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col gap-6 mx-auto w-full max-w-md">
          <div className="text-2xl font-bold text-center">
            Welcome to Pitch Arena!
          </div>
          <div className="mb-4 text-center text-muted-foreground">
            Your account has been created and profile set up.
          </div>
          <Button className="w-full" asChild>
            <a href="/dashboard">Go to Dashboard</a>
          </Button>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return <Step1 onSuccess={handleStep1Success} />;
  }
  if (step === 2) {
    return <Step2 onSelect={handleStep2Select} selectedRole={role} />;
  }
  if (step === 3) {
    return (
      <Step3
        onSubmit={handleStep3Submit}
        loading={loading}
        error={error}
        initialName={name}
      />
    );
  }
  return null;
}
