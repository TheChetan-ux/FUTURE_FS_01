import { Search } from "lucide-react";
import { mockListings } from "@/lib/mock-data";

const filters = ["Stay", "Drive", "Daily", "Monthly", "Weekend Deals", "Near Me"];

export default function DiscoverPage() {
  return (
    <main className="shell py-10">
      <div className="glass rounded-[2rem] border border-white/60 p-6 shadow-soft">
        <p className="text-sm uppercase tracking-[0.25em] text-clay">Discovery</p>
        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-display text-4xl text-ink">Explore verified stays and drives</h1>
            <p className="mt-2 max-w-2xl text-stone">
              Starter marketplace view with proximity, category, and booking-mode filters.
            </p>
          </div>
          <div className="flex min-w-[280px] items-center gap-3 rounded-full border border-ink/10 bg-white px-4 py-3">
            <Search className="h-4 w-4 text-stone" />
            <span className="text-sm text-stone">Search Pune, Goa, Bengaluru, Delhi...</span>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {mockListings.map((listing) => (
          <article
            key={listing.title}
            className="glass rounded-[1.75rem] border border-white/60 p-5 shadow-soft"
          >
            <div className="h-48 rounded-[1.25rem] bg-gradient-to-br from-sand via-white to-canvas" />
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-ink">{listing.title}</h2>
                <p className="mt-1 text-sm text-stone">{listing.location}</p>
              </div>
              <span className="rounded-full bg-forest px-3 py-1 text-xs font-semibold text-white">
                {listing.mode}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-stone">
              {listing.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-stone">{listing.type}</p>
                <p className="text-lg font-semibold text-forest">{listing.price}</p>
              </div>
              <button className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white">
                View detail
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
