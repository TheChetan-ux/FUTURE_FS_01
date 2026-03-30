import { motion } from 'framer-motion';

const MotionSection = ({ children, className = '', delay = 0, y = 18 }) => (
  <motion.section
    initial={{ opacity: 0, y }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, ease: 'easeOut', delay }}
    className={className}
  >
    {children}
  </motion.section>
);

export default MotionSection;
