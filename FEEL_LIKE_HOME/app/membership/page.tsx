import { membershipTiers } from "@/lib/mock-data";

export default function MembershipPage() {
  return (
    <main className="shell py-10">
      <div className="glass rounded-[2rem] border border-white/60 p-6 shadow-soft">
        <p className="text-sm uppercase tracking-[0.25em] text-clay">Premium plans</p>
        <h1 className="mt-3 font-display text-4xl text-ink">Membership tiers for loyal customers</h1>
        <p className="mt-3 max-w-2xl text-stone">
          Early plan page for Bronze, Silver, and Gold with a structure tuned to repeat
          home and vehicle renters in India.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {membershipTiers.map((tier) => (
            <div
              key={tier.name}
              className="rounded-[1.75rem] border border-ink/10 bg-white p-6"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-clay">{tier.label}</p>
              <h2 className="mt-3 font-display text-3xl text-ink">{tier.name}</h2>
              <p className="mt-2 text-2xl font-semibold text-forest">{tier.price}</p>
              <p className="mt-4 leading-7 text-stone">{tier.description}</p>
              <ul className="mt-5 space-y-3 text-sm text-stone">
                {tier.perks.map((perk) => (
                  <li key={perk} className="rounded-full bg-canvas px-4 py-2">
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
