import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footerLabel: string;
  footerHref: string;
  footerAction: string;
};

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footerLabel,
  footerHref,
  footerAction
}: AuthShellProps) {
  return (
    <main className="shell py-10 md:py-16">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[2rem] bg-ink p-8 text-white shadow-soft">
          <p className="text-sm uppercase tracking-[0.25em] text-sand">{eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-white/75">{description}</p>
          <div className="mt-10 space-y-4">
            <div className="rounded-[1.5rem] border border-white/10 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-sand">Stay</p>
              <p className="mt-2 text-white/80">
                Access verified homes, daily bookings, and monthly rentals with one account.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-sand">Drive</p>
              <p className="mt-2 text-white/80">
                Book 6-hour vehicle blocks, upload documents, and manage requests smoothly.
              </p>
            </div>
          </div>
        </section>

        <section className="glass rounded-[2rem] border border-white/60 p-6 md:p-8 shadow-soft">
          {children}
          <p className="mt-6 text-sm text-stone">
            {footerLabel}{" "}
            <Link href={footerHref} className="font-semibold text-forest">
              {footerAction}
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
