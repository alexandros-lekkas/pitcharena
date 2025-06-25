import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-12">
      <div className="card bg-base-100 border-2 border-base-300 rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-primary mb-6 text-center">Login</h1>
        <form className="space-y-4">
          <input className="input input-bordered w-full" placeholder="Email" type="email" disabled />
          <input className="input input-bordered w-full" placeholder="Password" type="password" disabled />
          <button className="btn btn-primary w-full" disabled>Login</button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-base-content/60">Don't have an account?</span>
          <Link href="/signup" className="link link-primary ml-1">Sign up</Link>
        </div>
      </div>
    </main>
  );
} 