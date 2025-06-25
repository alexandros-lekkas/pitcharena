"use client";

import { startups } from "@/data/startups";
import { useState } from "react";

const interests = startups.slice(0, 3);
const messages = [
  { from: "EcoCharge", text: "Thanks for your interest!" },
  { from: "HealthHive", text: "Let's connect soon." },
];

export default function DashboardPage() {
  const [tab, setTab] = useState(0);
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-primary">Dashboard</h1>
      <div role="tablist" className="tabs tabs-boxed mb-8">
        <button role="tab" className={`tab${tab === 0 ? " tab-active" : ""}`} onClick={() => setTab(0)}>My Startups</button>
        <button role="tab" className={`tab${tab === 1 ? " tab-active" : ""}`} onClick={() => setTab(1)}>My Interests</button>
        <button role="tab" className={`tab${tab === 2 ? " tab-active" : ""}`} onClick={() => setTab(2)}>Messages</button>
      </div>
      {tab === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {startups.slice(0, 2).map((s) => (
            <div key={s.id} className="card bg-base-100 border-2 border-base-300 rounded-2xl p-6 flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <img src={s.logo} alt={s.name} className="w-12 h-12 rounded-full" />
                <div>
                  <div className="font-bold">{s.name}</div>
                  <div className="text-base-content/60 text-sm">{s.industry}</div>
                </div>
              </div>
              <div className="flex gap-2 mt-auto">
                <button className="btn btn-sm btn-outline">Edit</button>
                <button className="btn btn-sm btn-error text-white">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interests.map((s) => (
            <div key={s.id} className="card bg-base-100 border-2 border-base-300 rounded-2xl p-6 flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <img src={s.logo} alt={s.name} className="w-12 h-12 rounded-full" />
                <div>
                  <div className="font-bold">{s.name}</div>
                  <div className="text-base-content/60 text-sm">{s.industry}</div>
                </div>
              </div>
              <button className="btn btn-sm btn-outline mt-auto">View</button>
            </div>
          ))}
        </div>
      )}
      {tab === 2 && (
        <div className="space-y-4">
          {messages.map((m, i) => (
            <div key={i} className="chat chat-start">
              <div className="chat-header font-bold mb-1">{m.from}</div>
              <div className="chat-bubble bg-base-200 border-2 border-base-300 text-base-content">{m.text}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
} 