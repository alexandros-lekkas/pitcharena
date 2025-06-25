import Link from "next/link";
export default function Navbar() {
  return (
    <div className="navbar bg-base-100 border-2 border-base-300 rounded-b-2xl px-6 py-4">
      <div className="flex-1">
        <Link href="/" className="text-2xl font-bold text-primary">Pitch Arena</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-base">
          <li><Link href="/startups">Browse Startups</Link></li>
          <li><Link href="/submit">Post a Pitch</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
        </ul>
        <Link href="/login" className="btn btn-primary ml-4">Login</Link>
      </div>
    </div>
  );
} 