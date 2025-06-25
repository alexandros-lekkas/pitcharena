import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-12">
      <div className="card bg-base-100 border-2 border-base-300 rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-primary mb-6 text-center">Sign Up</h1>
        <form className="space-y-4">
          <input className="input input-bordered w-full" placeholder="Email" type="email" disabled />
          <input className="input input-bordered w-full" placeholder="Password" type="password" disabled />
          <select className="select select-bordered w-full" aria-label="Role" disabled>
            <option>Founder</option>
            <option>Investor</option>
          </select>
          <button className="btn btn-primary w-full" disabled>Sign Up</button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-base-content/60">Already have an account?</span>
          <Link href="/login" className="link link-primary ml-1">Login</Link>
        </div>
      </div>
    </main>
  );
} 