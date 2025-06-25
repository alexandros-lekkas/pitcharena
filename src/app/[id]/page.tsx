import { startups } from "@/data/startups";
import Link from "next/link";
// Placeholder for TeamBios component
function TeamBios({ team }: { team: { name: string; role: string; bio: string }[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
      <h2 className="font-bold mb-2">Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {team.map((member, i) => (
          <div key={i} className="">
            <div className="font-semibold">{member.name} <span className="text-gray-500">({member.role})</span></div>
            <div className="text-gray-600 text-sm">{member.bio}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StartupDetail({ params }: { params: { id: string } }) {
  const startup = startups.find(s => s.id === params.id);
  if (!startup) return <div>Startup not found.</div>;
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        <img src={startup.logo} alt={startup.name} className="w-24 h-24 rounded-2xl shadow-md" />
        <div>
          <h1 className="text-3xl font-bold">{startup.name}</h1>
          <p className="text-primary font-semibold">{startup.industry}</p>
          <p className="mt-2">{startup.headline}</p>
        </div>
      </div>
      <div className="mb-8">
        <iframe
          src={startup.video}
          title="Pitch Video"
          className="w-full h-64 rounded-2xl shadow-md"
          allowFullScreen
        />
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <h2 className="font-bold mb-2">Deal Terms</h2>
        <p>Offering <span className="font-semibold">{startup.equity}</span> for <span className="font-semibold">{startup.amount}</span></p>
        <button className="mt-4 bg-primary text-white px-4 py-2 rounded-2xl shadow hover:bg-blue-700 transition" disabled>Download Pitch Deck</button>
      </div>
      <TeamBios team={startup.team} />
      <div className="mt-8 flex justify-end">
        <Link href="/thank-you" className="bg-accent text-white px-6 py-3 rounded-2xl shadow hover:bg-amber-500 transition">Express Interest</Link>
      </div>
    </main>
  );
} 