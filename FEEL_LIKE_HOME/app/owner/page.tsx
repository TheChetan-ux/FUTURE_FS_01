import { CheckCircle2, Clock3, FileBadge2, UploadCloud } from "lucide-react";
import { ownerChecklist } from "@/lib/mock-data";

const onboardingFlows = [
  {
    title: "Property owner",
    fee: "Registration fee: Rs. 500",
    steps: ["KYC and PAN", "Upload ownership or lease proof", "Set daily/monthly pricing"]
  },
  {
    title: "Vehicle owner",
    fee: "Registration fee: Rs. 200",
    steps: ["DL and RC upload", "Insurance and fitness proof", "Enable 6-hour time blocks"]
  }
];

export default function OwnerPage() {
  return (
    <main className="shell py-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <section className="glass rounded-[2rem] border border-white/60 p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.25em] text-clay">Owner dashboard</p>
          <h1 className="mt-3 font-display text-4xl text-ink">Manage listings with trust-first controls</h1>
          <p className="mt-3 max-w-2xl text-stone">
            This starter dashboard shows the owner onboarding shape, listing states,
            and verification upload flow for both homes and vehicles.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {onboardingFlows.map((flow) => (
              <div key={flow.title} className="rounded-[1.5rem] border border-ink/10 bg-white p-5">
                <h2 className="text-2xl font-semibold text-ink">{flow.title}</h2>
                <p className="mt-2 text-sm font-semibold text-clay">{flow.fee}</p>
                <ul className="mt-4 space-y-3 text-sm text-stone">
                  {flow.steps.map((step) => (
                    <li key={step} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-forest" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] bg-ink p-6 text-white shadow-soft">
          <p className="text-sm uppercase tracking-[0.25em] text-sand">Listing status</p>
          <div className="mt-6 space-y-4">
            {ownerChecklist.map((item) => (
              <div key={item.title} className="rounded-[1.25rem] border border-white/10 p-4">
                <div className="flex items-center gap-3">
                  {item.icon === "upload" ? (
                    <UploadCloud className="h-5 w-5 text-sand" />
                  ) : item.icon === "pending" ? (
                    <Clock3 className="h-5 w-5 text-sand" />
                  ) : (
                    <FileBadge2 className="h-5 w-5 text-sand" />
                  )}
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-white/70">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
