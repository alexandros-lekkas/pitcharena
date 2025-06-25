"use client";
import { useState } from "react";

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
  const [form, setForm] = useState({
    name: "",
    logo: null as File | null,
    country: "US",
    tags: [] as string[],
    description: "",
    founders: "",
  });
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((f) => ({
        ...f,
        tags: checked ? [...f.tags, value] : f.tags.filter((t) => t !== value),
      }));
    } else if (type === "file") {
      setForm((f) => ({
        ...f,
        logo: (e.target as HTMLInputElement).files?.[0] || null,
      }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Startup listed! (mock)");
  }
  return (
    <div className="px-4 py-12 mx-auto max-w-lg">
      <h1 className="mb-4 text-2xl font-bold">List a Startup</h1>
      <p className="mb-6 font-medium text-secondary">
        $20 listing fee (mocked)
      </p>
      <form
        className="flex flex-col gap-4 p-8 rounded-lg shadow bg-card"
        onSubmit={handleSubmit}
      >
        <input
          className="input input-bordered"
          type="text"
          name="name"
          placeholder="Startup Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="input input-bordered"
          type="file"
          name="logo"
          accept="image/*"
          onChange={handleChange}
        />
        <select
          className="input input-bordered"
          name="country"
          value={form.country}
          onChange={handleChange}
        >
          {countryOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="flex gap-4">
          {tagOptions.map((opt) => (
            <label key={opt.value} className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="tags"
                value={opt.value}
                checked={form.tags.includes(opt.value)}
                onChange={handleChange}
              />
              {opt.label}
            </label>
          ))}
        </div>
        <textarea
          className="input input-bordered"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          required
        />
        <input
          className="input input-bordered"
          type="text"
          name="founders"
          placeholder="Founders (comma separated)"
          value={form.founders}
          onChange={handleChange}
          required
        />
        <button className="mt-4 btn btn-primary" type="submit">
          List Startup
        </button>
      </form>
    </div>
  );
}
