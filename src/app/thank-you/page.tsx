import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-12">
      <div className="card bg-base-100 border-2 border-base-300 rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Thank You!</h1>
        <p className="mb-6">Your interest has been received. The founder will be in touch if there's a fit.</p>
        <Link href="/" className="btn btn-primary">Back to Homepage</Link>
      </div>
    </main>
  );
} 