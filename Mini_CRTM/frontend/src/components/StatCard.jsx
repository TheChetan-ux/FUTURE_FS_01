import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const StatCard = ({ label, value, accent, helper, trend }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    className="group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl"
  >
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.10),transparent_24%)] opacity-80 transition group-hover:opacity-100" />
    <div className="relative">
      <div className="flex items-start justify-between gap-4">
        <div className={`inline-flex rounded-2xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] ${accent}`}>
          {label}
        </div>
        <div className="rounded-2xl bg-slate-100 p-2 text-slate-500">
          <TrendingUp size={16} />
        </div>
      </div>
      <p className="mt-6 text-4xl font-semibold tracking-tight text-slate-950">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-500">{helper}</p>
      {trend ? <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">{trend}</p> : null}
    </div>
  </motion.div>
);

export default StatCard;
