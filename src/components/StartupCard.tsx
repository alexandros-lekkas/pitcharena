import Link from "next/link";
type Props = {
  id: string;
  name: string;
  logo: string;
  industry: string;
  headline: string;
  equity: string;
  amount: string;
};
export default function StartupCard({ id, name, logo, industry, headline, equity, amount }: Props) {
  return (
    <Link href={`/startups/${id}`} className="card bg-base-100 border-2 border-base-300 rounded-2xl hover:border-primary transition">
      <div className="card-body items-center text-center">
        <img src={logo} alt={name} className="w-16 h-16 rounded-full mb-2" />
        <h3 className="card-title">{name}</h3>
        <p className="text-sm text-base-content/60">{industry}</p>
        <p className="mt-2">{headline}</p>
        <div className="card-actions mt-4 gap-2">
          <span className="badge badge-primary badge-outline">{equity} equity</span>
          <span className="badge badge-accent badge-outline">{amount}</span>
        </div>
      </div>
    </Link>
  );
} 