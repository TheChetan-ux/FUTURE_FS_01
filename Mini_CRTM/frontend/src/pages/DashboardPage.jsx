import { useEffect, useState } from 'react';
import { Activity, ArrowUpRight, Clock3, Target, Zap } from 'lucide-react';

import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import MotionSection from '../components/MotionSection';
import StatCard from '../components/StatCard';
import api from '../services/api';
import { formatDate } from '../utils/formatters';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/customers/stats');
      setStats(data.stats);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return <LoadingState title="Loading dashboard" description="Pulling in pipeline health, customer counts, and recent activity." rows={4} />;
  }

  if (error) {
    return <ErrorState title="Dashboard unavailable" message={error} onRetry={fetchStats} />;
  }

  const engagementRate = stats.totalCustomers
    ? Math.round((stats.activeCustomers / stats.totalCustomers) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <MotionSection className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#07111f_0%,#10263d_45%,#0b3b4d_100%)] p-8 text-white shadow-[0_30px_90px_rgba(8,17,31,0.18)]">
        <div className="grid gap-8 xl:grid-cols-[1.2fr,0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-300">Command Center</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
              Premium visibility into every relationship in your pipeline.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Monitor customer growth, identify engagement gaps, and keep follow-up momentum high with a workspace that feels focused and executive-ready.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-sky-300">
                  <Activity size={16} />
                  <span className="text-xs uppercase tracking-[0.22em]">Engagement</span>
                </div>
                <p className="mt-3 text-3xl font-semibold">{engagementRate}%</p>
                <p className="mt-1 text-sm text-slate-300">Active customer share</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-teal-300">
                  <Target size={16} />
                  <span className="text-xs uppercase tracking-[0.22em]">Lead Pool</span>
                </div>
                <p className="mt-3 text-3xl font-semibold">{stats.leadCustomers}</p>
                <p className="mt-1 text-sm text-slate-300">Open opportunities</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-amber-300">
                  <Zap size={16} />
                  <span className="text-xs uppercase tracking-[0.22em]">Focus</span>
                </div>
                <p className="mt-3 text-3xl font-semibold">{stats.inactiveCustomers}</p>
                <p className="mt-1 text-sm text-slate-300">Needs reactivation</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Today&apos;s Focus</p>
                <h3 className="mt-2 text-2xl font-semibold">Momentum snapshot</h3>
              </div>
              <ArrowUpRight className="text-teal-300" size={18} />
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-3xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">Best next move</p>
                <p className="mt-2 text-lg font-medium">Convert high-intent leads into active accounts this week.</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">Risk check</p>
                <p className="mt-2 text-lg font-medium">Follow up with inactive customers before they drift further.</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">Team signal</p>
                <p className="mt-2 text-lg font-medium">Recent activity is updating correctly and your workspace is healthy.</p>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Customers" value={stats.totalCustomers} helper="Complete customer records in your workspace" accent="bg-sky-100 text-sky-700" trend="Live portfolio size" />
        <StatCard label="Active" value={stats.activeCustomers} helper="Customers currently engaged and progressing" accent="bg-emerald-100 text-emerald-700" trend="Healthy account momentum" />
        <StatCard label="Inactive" value={stats.inactiveCustomers} helper="Accounts that may need reactivation" accent="bg-rose-100 text-rose-700" trend="Risk to review this week" />
        <StatCard label="Leads" value={stats.leadCustomers} helper="Prospects waiting for qualification or outreach" accent="bg-amber-100 text-amber-700" trend="Pipeline growth opportunities" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
        <MotionSection delay={0.05} className="rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-950">Recent activity</h3>
              <p className="mt-1 text-sm text-slate-500">Latest customer and follow-up movement in your workspace.</p>
            </div>
            <ArrowUpRight className="text-teal-600" size={18} />
          </div>
          <div className="mt-6 space-y-4">
            {stats.recentActivity.length ? (
              stats.recentActivity.map((item, index) => (
                <div key={`${item.type}-${index}`} className="flex gap-4 rounded-3xl border border-slate-100 bg-slate-50/80 px-4 py-4">
                  <div className="mt-1 rounded-2xl bg-white p-3 text-slate-500 shadow-sm">
                    <Clock3 size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{item.message}</p>
                    <p className="mt-1 text-sm text-slate-500">{formatDate(item.date)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-3xl bg-slate-50 px-4 py-6 text-sm text-slate-500">
                No activity yet. Add your first customer to start building momentum.
              </div>
            )}
          </div>
        </MotionSection>

        <MotionSection delay={0.1} className="rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <h3 className="text-xl font-semibold text-slate-950">Executive notes</h3>
          <div className="mt-6 space-y-4 text-sm text-slate-600">
            <div className="rounded-3xl bg-[linear-gradient(180deg,#f0fdfa_0%,#ecfeff_100%)] px-4 py-5">
              Leads should receive a first action quickly while intent is still warm.
            </div>
            <div className="rounded-3xl bg-[linear-gradient(180deg,#fff7ed_0%,#fffbeb_100%)] px-4 py-5">
              Move qualified relationships to Active as soon as they show repeat engagement.
            </div>
            <div className="rounded-3xl bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] px-4 py-5">
              Review follow-up completion daily to keep your pipeline from stalling.
            </div>
          </div>
        </MotionSection>
      </div>
    </div>
  );
};

export default DashboardPage;
