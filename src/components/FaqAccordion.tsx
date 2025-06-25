"use client";

import { useState } from "react";
type Faq = { q: string; a: string };
type Props = { faqs: Faq[] };
export default function FaqAccordion({ faqs }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <div key={i} className="collapse collapse-arrow bg-base-100 border-2 border-base-300 rounded-2xl">
          <input type="checkbox" aria-label={`Expand FAQ: ${faq.q}`} checked={open === i} onChange={() => setOpen(open === i ? null : i)} className="peer" />
          <div className="collapse-title font-semibold text-base-content">
            {faq.q}
          </div>
          <div className="collapse-content text-base-content/70">
            {faq.a}
          </div>
        </div>
      ))}
    </div>
  );
} 