import { motion } from 'framer-motion';
import { ClipboardList, LayoutDashboard, LogOut, Menu, Sparkles, UsersRound } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/customers', label: 'Customers', icon: UsersRound },
  { to: '/tasks', label: 'Tasks', icon: ClipboardList },
];

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { user, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
      isActive ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20' : 'text-slate-300 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-30 rounded-xl bg-ink p-3 text-white shadow-lg lg:hidden"
      >
        <Menu size={18} />
      </button>

      <div
        className={`fixed inset-0 z-20 bg-slate-950/50 transition lg:hidden ${mobileOpen ? 'block' : 'hidden'}`}
        onClick={() => setMobileOpen(false)}
      />

      <motion.aside
        initial={{ x: -24, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className={`fixed left-0 top-0 z-30 flex h-screen w-72 flex-col bg-ink px-5 py-6 text-white transition-transform lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-teal-400/15 p-3 text-teal-300">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-teal-300">Mini CRM</p>
              <h1 className="mt-1 text-xl font-semibold">Revenue OS</h1>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-400">Stay close to every customer conversation with a polished command center.</p>
        </div>

        <nav className="mt-10 space-y-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={linkClass} onClick={() => setMobileOpen(false)}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Logged In</p>
          <p className="mt-3 font-medium">{user?.name}</p>
          <p className="text-sm text-slate-400">{user?.email}</p>
          <button
            type="button"
            onClick={logout}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
