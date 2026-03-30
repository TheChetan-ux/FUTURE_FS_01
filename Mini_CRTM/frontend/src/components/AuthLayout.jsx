import { motion } from 'framer-motion';

const AuthLayout = ({ title, subtitle, children }) => (
  <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.14),transparent_24%),linear-gradient(180deg,#f8fbff_0%,#f3f7fb_100%)]" />
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 shadow-[0_30px_90px_rgba(15,23,42,0.10)] backdrop-blur-xl lg:grid-cols-[1.18fr,0.92fr]"
    >
      <div className="hidden bg-[linear-gradient(160deg,#08111f_0%,#0f172a_55%,#10263d_100%)] p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Mini CRM</p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight">
            A calmer control center for every customer conversation.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
            Keep leads, active customers, and next-step follow-ups in one premium workspace designed to feel focused and fast.
          </p>
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
            Pipeline visibility, follow-up discipline, and clean execution in one place.
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Leads</p>
              <p className="mt-2 text-2xl font-semibold">24</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Tasks</p>
              <p className="mt-2 text-2xl font-semibold">18</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Active</p>
              <p className="mt-2 text-2xl font-semibold">12</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 sm:p-10">
        <div className="mx-auto max-w-md">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-600">Workspace Access</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </motion.div>
  </div>
);

export default AuthLayout;
