import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StartupCard from "@/components/StartupCard";
import Testimonial from "@/components/Testimonial";
import FaqAccordion from "@/components/FaqAccordion";
import { startups } from "@/data/startups";
import { testimonials } from "@/data/testimonials";
import { faqs } from "@/data/faqs";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4 text-primary">Pitch. Match. Raise.</h1>
          <p className="text-xl text-base-content mb-8">
            Connecting founders and investors for the next big thing.
          </p>
          <div className="flex justify-center gap-6 mb-10">
            <Link
              href="/startups"
              className="btn btn-primary text-lg"
            >
              Browse Startups
            </Link>
            <Link
              href="/submit"
              className="btn btn-outline btn-primary text-lg"
            >
              Post a Pitch
            </Link>
          </div>
        </section>
        {/* 3-step explainer */}
        <section className="flex flex-col md:flex-row justify-center gap-8 mb-16">
          <div className="card bg-base-100 border-2 border-base-300 rounded-2xl flex-1 text-center">
            <div className="card-body">
              <div className="text-3xl mb-2">1️⃣</div>
              <h3 className="card-title">Create a Pitch</h3>
              <p className="text-base-content/70">
                Share your startup's story and deal terms.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 border-2 border-base-300 rounded-2xl flex-1 text-center">
            <div className="card-body">
              <div className="text-3xl mb-2">2️⃣</div>
              <h3 className="card-title">Get Matched</h3>
              <p className="text-base-content/70">
                Connect with interested investors.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 border-2 border-base-300 rounded-2xl flex-1 text-center">
            <div className="card-body">
              <div className="text-3xl mb-2">3️⃣</div>
              <h3 className="card-title">Raise Capital</h3>
              <p className="text-base-content/70">
                Secure funding and grow your vision.
              </p>
            </div>
          </div>
        </section>
        {/* Featured Startups */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Featured Startups
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {startups.slice(0, 6).map((s) => (
              <StartupCard key={s.id} {...s} />
            ))}
          </div>
        </section>
        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            What People Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <Testimonial key={t.id} {...t} />
            ))}
          </div>
        </section>
        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            FAQ
          </h2>
          <FaqAccordion faqs={faqs} />
        </section>
      </main>
      <Footer />
    </>
  );
}
