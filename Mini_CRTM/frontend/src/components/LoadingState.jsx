import { motion } from 'framer-motion';

const shimmer = {
  initial: { backgroundPosition: '200% 0' },
  animate: { backgroundPosition: '-200% 0' },
};

const LoadingBar = ({ className }) => (
  <motion.div
    variants={shimmer}
    initial="initial"
    animate="animate"
    transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
    className={`rounded-2xl bg-[linear-gradient(90deg,rgba(226,232,240,0.8),rgba(255,255,255,0.95),rgba(226,232,240,0.8))] bg-[length:200%_100%] ${className}`}
  />
);

const LoadingState = ({ title = 'Loading data', description = 'Preparing your workspace...', rows = 3 }) => (
  <div className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
    <div className="flex items-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
        className="h-12 w-12 rounded-2xl border-4 border-slate-200 border-t-teal-500"
      />
      <div>
        <p className="text-lg font-semibold text-slate-900">{title}</p>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
    </div>
    <div className="mt-6 space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <LoadingBar key={index} className={index === 0 ? 'h-16 w-full' : 'h-12 w-full'} />
      ))}
    </div>
  </div>
);

export default LoadingState;
