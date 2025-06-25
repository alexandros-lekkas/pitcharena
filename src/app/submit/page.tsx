"use client";

import Link from "next/link";
import { useState } from "react";

const steps = ["Startup Info", "Media", "Deal & Team"];

export default function SubmitPage() {
  const [step, setStep] = useState(0);
  return (
    <main className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-primary">Submit Your Pitch</h1>
      {/* Stepper */}
      <ul className="steps mb-8 w-full">
        {steps.map((label, i) => (
          <li key={label} className={`step ${i <= step ? "step-primary" : ""}`}>{label}</li>
        ))}
      </ul>
      {/* Step Content */}
      <div className="card bg-base-100 border-2 border-base-300 rounded-2xl p-8 mb-8 transition-all duration-300">
        {step === 0 && (
          <form className="space-y-4">
            <input className="input input-bordered w-full" placeholder="Startup Name" disabled />
            <input className="input input-bordered w-full" placeholder="Logo URL" disabled />
            <input className="input input-bordered w-full" placeholder="Tagline" disabled />
          </form>
        )}
        {step === 1 && (
          <form className="space-y-4">
            <input className="input input-bordered w-full" placeholder="YouTube Video Link" disabled />
            <input className="file-input file-input-bordered w-full" placeholder="Pitch Deck (PDF)" disabled />
          </form>
        )}
        {step === 2 && (
          <form className="space-y-4">
            <input className="input input-bordered w-full" placeholder="Equity %" disabled />
            <input className="input input-bordered w-full" placeholder="Amount Sought" disabled />
            <textarea className="textarea textarea-bordered w-full" placeholder="Team Bios" disabled />
          </form>
        )}
      </div>
      {/* Stepper Controls */}
      <div className="flex justify-between">
        <button className="btn btn-outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>Back</button>
        {step < 2 ? (
          <button className="btn btn-primary" onClick={() => setStep(Math.min(2, step + 1))}>Next</button>
        ) : (
          <Link href="/submitted" className="btn btn-accent text-white">Submit Pitch</Link>
        )}
      </div>
    </main>
  );
} 