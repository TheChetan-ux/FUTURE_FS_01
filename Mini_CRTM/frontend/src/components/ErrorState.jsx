import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const ErrorState = ({ title = 'Something went wrong', message, onRetry }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
    className="rounded-[2rem] border border-rose-200 bg-[linear-gradient(180deg,#fff7f7_0%,#fff1f2_100%)] p-6 shadow-[0_24px_70px_rgba(225,29,72,0.08)]"
  >
    <div className="flex items-start gap-4">
      <div className="rounded-2xl bg-rose-100 p-3 text-rose-600">
        <AlertTriangle size={20} />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-rose-900">{title}</h3>
        <p className="mt-2 text-sm text-rose-700">{message}</p>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-rose-700"
          >
            <RefreshCcw size={16} />
            Try again
          </button>
        ) : null}
      </div>
    </div>
  </motion.div>
);

export default ErrorState;
