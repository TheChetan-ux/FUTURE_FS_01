import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CarFront,
  IndianRupee,
  MapPin,
  MessageSquareText
} from "lucide-react";
import { SectionCard } from "@/components/section-card";
import { membershipTiers, mockListings } from "@/lib/mock-data";

const featurePoints = [
  {
    title: "Hybrid booking",
    description: "Let every property switch between daily stays and monthly rentals."
  },
  {
    title: "Verified supply",
    description: "Keep all listings in a pending queue until documents are reviewed."
  },
  {
    title: "Stay + Drive",
    description: "Serve homes, co-living spaces, scooters, and cars from one app."
  }
];

export default function HomePage() {
  return (
    <main className="pb-16">
      <section className="shell grid gap-10 py-10 md:grid-cols-[1.2fr_0.8fr] md:py-16">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-white/70 px-4 py-2 text-sm text-forest">
            <BadgeCheck className="h-4 w-4" />
            Trusted rentals for Indian stays and self-drive mobility
          </div>
          <div className="space-y-4">
            <h1 className="max-w-3xl font-display text-5xl leading-tight text-ink md:text-7xl">
              Find a place to stay and a ride to move, all in one calm workflow.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-stone">
              Feel_Like_Home is a dual-sided marketplace for verified homes, rooms,
              hostels, scooters, and cars with owner onboarding, admin checks,
              memberships, and real-time customer conversations.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/discover"
              className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 font-semibold text-white transition hover:bg-ink"
            >
              Explore listings
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/owner"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-5 py-3 font-semibold text-ink transition hover:border-forest/50"
            >
              Launch owner dashboard
            </Link>
          </div>
          <div className="grid gap-4 pt-4 md:grid-cols-3">
            {featurePoints.map((item) => (
              <SectionCard key={item.title} title={item.title} description={item.description} />
            ))}
          </div>
        </div>

        <div className="glass rounded-[2rem] border border-white/60 p-6 shadow-soft">
          <div className="rounded-[1.5rem] bg-ink p-6 text-white">
            <p className="text-sm uppercase tracking-[0.25em] text-sand">Live snapshot</p>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Pending verifications</span>
                <span className="text-3xl font-semibold">28</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Daily stay inventory</span>
                <span className="text-3xl font-semibold">146</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">6-hour vehicle blocks</span>
                <span className="text-3xl font-semibold">320</span>
              </div>
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            {mockListings.slice(0, 3).map((listing) => (
              <div
                key={listing.title}
                className="rounded-[1.25rem] border border-ink/10 bg-white/90 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-ink">{listing.title}</p>
                    <div className="mt-2 flex items-center gap-2 text-sm text-stone">
                      <MapPin className="h-4 w-4" />
                      {listing.location}
                    </div>
                  </div>
                  <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-ink">
                    {listing.mode}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-stone">
                  <span>{listing.type}</span>
                  <span className="flex items-center gap-1 font-semibold text-forest">
                    <IndianRupee className="h-4 w-4" />
                    {listing.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell grid gap-6 md:grid-cols-3">
        <SectionCard
          icon={<CarFront className="h-5 w-5" />}
          title="Vehicle rentals"
          description="Fixed 6-hour blocks, DL verification, late-return fines, and damage tracking."
        />
        <SectionCard
          icon={<MessageSquareText className="h-5 w-5" />}
          title="Realtime chat"
          description="Use Supabase Realtime to let renters and owners negotiate before booking."
        />
        <SectionCard
          icon={<IndianRupee className="h-5 w-5" />}
          title="Smart pricing"
          description="Apply weekend and weekday rates while keeping fees aligned to asset value."
        />
      </section>

      <section className="shell py-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-clay">Memberships</p>
            <h2 className="mt-2 font-display text-4xl text-ink">Tiers built for frequent renters</h2>
          </div>
          <Link href="/membership" className="text-sm font-semibold text-forest">
            View benefits
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {membershipTiers.map((tier) => (
            <div
              key={tier.name}
              className="glass rounded-[1.75rem] border border-white/60 p-6 shadow-soft"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-clay">{tier.label}</p>
              <h3 className="mt-3 font-display text-3xl text-ink">{tier.name}</h3>
              <p className="mt-2 text-2xl font-semibold text-forest">{tier.price}</p>
              <p className="mt-4 text-sm leading-7 text-stone">{tier.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
