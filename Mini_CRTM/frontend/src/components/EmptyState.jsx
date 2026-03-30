import { motion } from 'framer-motion';

const EmptyState = ({ title, description, action }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
    className="rounded-[2rem] border border-dashed border-slate-200 bg-white/70 px-6 py-10 text-center backdrop-blur-sm"
  >
    <div className="mx-auto max-w-md">
      <div className="mx-auto h-16 w-16 rounded-3xl bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.18),transparent_45%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)]" />
      <h3 className="mt-5 text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  </motion.div>
);

export default EmptyState;
