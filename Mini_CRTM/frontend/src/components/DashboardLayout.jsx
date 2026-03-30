import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

import Sidebar from './Sidebar';

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.12),transparent_22%),radial-gradient(circle_at_top_right,rgba(20,184,166,0.12),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.10),transparent_18%)]" />
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className="relative min-h-screen lg:ml-72">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="px-4 pb-8 pt-20 sm:px-6 lg:px-8 lg:pt-8"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardLayout;
