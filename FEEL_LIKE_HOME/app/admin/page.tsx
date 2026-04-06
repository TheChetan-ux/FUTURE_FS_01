const pendingQueue = [
  {
    asset: "2BHK in Kharadi",
    owner: "Aarav Kulkarni",
    docs: "Aadhaar, electricity bill, property images",
    status: "Pending"
  },
  {
    asset: "Honda Activa 125",
    owner: "Meera Shah",
    docs: "RC, insurance, DL, vehicle images",
    status: "Pending"
  },
  {
    asset: "Studio in Indiranagar",
    owner: "Rahul Jain",
    docs: "Rental agreement, PAN, selfie verification",
    status: "Needs resubmission"
  }
];

export default function AdminPage() {
  return (
    <main className="shell py-10">
      <div className="glass rounded-[2rem] border border-white/60 p-6 shadow-soft">
        <p className="text-sm uppercase tracking-[0.25em] text-clay">Admin review</p>
        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-display text-4xl text-ink">Manual verification queue</h1>
            <p className="mt-2 max-w-2xl text-stone">
              MVP-friendly admin workflow where listings only go live after documents are reviewed.
            </p>
          </div>
          <div className="rounded-[1.25rem] bg-forest px-5 py-4 text-white">
            <p className="text-sm text-white/70">Items awaiting action</p>
            <p className="text-3xl font-semibold">28</p>
          </div>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-sm uppercase tracking-[0.15em] text-stone">
                <th className="px-4">Asset</th>
                <th className="px-4">Owner</th>
                <th className="px-4">Documents</th>
                <th className="px-4">Status</th>
                <th className="px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingQueue.map((row) => (
                <tr key={row.asset} className="bg-white">
                  <td className="rounded-l-2xl px-4 py-4 font-semibold text-ink">{row.asset}</td>
                  <td className="px-4 py-4 text-stone">{row.owner}</td>
                  <td className="px-4 py-4 text-stone">{row.docs}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-ink">
                      {row.status}
                    </span>
                  </td>
                  <td className="rounded-r-2xl px-4 py-4">
                    <button className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white">
                      Review docs
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
