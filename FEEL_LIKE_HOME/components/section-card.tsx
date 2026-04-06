import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  description: string;
  icon?: ReactNode;
};

export function SectionCard({ title, description, icon }: SectionCardProps) {
  return (
    <div className="glass rounded-[1.75rem] border border-white/60 p-5 shadow-soft">
      {icon ? <div className="mb-4 text-clay">{icon}</div> : null}
      <h3 className="text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-stone">{description}</p>
    </div>
  );
}
