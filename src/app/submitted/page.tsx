import Link from "next/link";

export default function SubmittedPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-12">
      <div className="card bg-base-100 border-2 border-base-300 rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Pitch Submitted!</h1>
        <p className="mb-6">Thank you for submitting your startup pitch. We'll review it and get in touch if there's a match.</p>
        <Link href="/" className="btn btn-primary">Back to Homepage</Link>
      </div>
    </main>
  );
} 