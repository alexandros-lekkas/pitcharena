import { startups } from "@/data/startups";
import Link from "next/link";

function TeamBios({ team }: { team: { name: string; role: string; bio: string }[] }) {
  return (
    <div className="card bg-base-100 border-2 border-base-300 rounded-2xl p-6 mb-8">
      <h2 className="card-title mb-4">Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {team.map((member, i) => (
          <div key={i} className="">
            <div className="font-semibold">{member.name} <span className="text-base-content/60">({member.role})</span></div>
            <div className="text-base-content/70 text-sm">{member.bio}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StartupDetail({ params }: { params: { id: string } }) {
  const startup = startups.find(s => s.id === params.id);
  if (!startup) return <div className="text-center py-20">Startup not found.</div>;
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        <img src={startup.logo} alt={startup.name} className="w-24 h-24 rounded-2xl border-2 border-base-300" />
        <div>
          <h1 className="text-3xl font-bold text-primary">{startup.name}</h1>
          <p className="text-base-content/70 font-semibold">{startup.industry}</p>
          <p className="mt-2 text-base-content">{startup.headline}</p>
        </div>
      </div>
      <div className="mb-8">
        <iframe
          src={startup.video}
          title="Pitch Video"
          className="w-full h-64 rounded-2xl border-2 border-base-300"
          allowFullScreen
        />
      </div>
      <div className="card bg-base-100 border-2 border-base-300 rounded-2xl p-6 mb-8">
        <h2 className="card-title mb-2">Deal Terms</h2>
        <p>Offering <span className="font-semibold">{startup.equity}</span> for <span className="font-semibold">{startup.amount}</span></p>
        <button className="btn btn-outline btn-primary mt-4" disabled>Download Pitch Deck</button>
      </div>
      <TeamBios team={startup.team} />
      <div className="mt-8 flex justify-end">
        <Link href="/thank-you" className="btn btn-accent text-white">Express Interest</Link>
      </div>
    </main>
  );
} 