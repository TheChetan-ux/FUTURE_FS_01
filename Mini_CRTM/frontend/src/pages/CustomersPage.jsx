import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Pencil, Plus, Search, Trash2, UsersRound } from 'lucide-react';

import CustomerFormModal from '../components/CustomerFormModal';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import MotionSection from '../components/MotionSection';
import PageHeader from '../components/PageHeader';
import api from '../services/api';
import { formatDate, statusBadgeClass } from '../utils/formatters';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const fetchCustomers = async (filters = {}) => {
    setLoading(true);
    try {
      const { data } = await api.get('/customers', {
        params: {
          search: filters.search ?? search,
          status: filters.status ?? status,
        },
      });
      setCustomers(data.customers);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers({ search: '', status: 'All' });
  }, []);

  const totals = useMemo(
    () => ({
      all: customers.length,
      active: customers.filter((customer) => customer.status === 'Active').length,
      leads: customers.filter((customer) => customer.status === 'Lead').length,
    }),
    [customers]
  );

  const openCreate = () => {
    setSelectedCustomer(null);
    setModalOpen(true);
  };

  const openEdit = (customer) => {
    setSelectedCustomer(customer);
    setModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    setSaving(true);
    try {
      if (selectedCustomer) {
        await api.put(`/customers/${selectedCustomer._id}`, formData);
      } else {
        await api.post('/customers', formData);
      }

      setModalOpen(false);
      setSelectedCustomer(null);
      fetchCustomers();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save customer');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this customer and all linked tasks?');
    if (!confirmed) return;

    try {
      await api.delete(`/customers/${id}`);
      fetchCustomers();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete customer');
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchCustomers();
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    fetchCustomers({ status: value });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Customers"
        title="A premium customer directory built for fast decision-making"
        description="Search, segment, and manage relationships in a cleaner workspace with clearer focus states and less visual noise."
        actions={
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 font-medium text-white transition hover:bg-slate-800"
          >
            <Plus size={18} />
            Add customer
          </button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ['All customers', totals.all, 'Portfolio size'],
          ['Active customers', totals.active, 'Accounts progressing'],
          ['Leads', totals.leads, 'Open opportunities'],
        ].map(([label, value, helper], index) => (
          <MotionSection key={label} delay={index * 0.05} className="rounded-[2rem] border border-white/60 bg-white/85 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">{helper}</p>
          </MotionSection>
        ))}
      </div>

      <MotionSection delay={0.1} className="rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <form className="flex flex-1 gap-3" onSubmit={handleSearch}>
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                placeholder="Search by name, email, phone, or company"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <button className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">Search</button>
          </form>

          <select
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
            value={status}
            onChange={(event) => handleStatusChange(event.target.value)}
          >
            <option value="All">All statuses</option>
            <option value="Lead">Lead</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {error && !loading ? <div className="mt-5"><ErrorState title="Customer data unavailable" message={error} onRetry={() => fetchCustomers()} /></div> : null}

        <div className="mt-6 overflow-x-auto">
          {loading ? (
            <LoadingState title="Loading customers" description="Gathering customer records and filters for this workspace." rows={5} />
          ) : customers.length ? (
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 text-sm text-slate-500">
                  <th className="pb-4 pr-4 font-medium">Customer</th>
                  <th className="pb-4 pr-4 font-medium">Company</th>
                  <th className="pb-4 pr-4 font-medium">Status</th>
                  <th className="pb-4 pr-4 font-medium">Phone</th>
                  <th className="pb-4 pr-4 font-medium">Created</th>
                  <th className="pb-4 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <motion.tr
                    key={customer._id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.03 }}
                    className="border-b border-slate-100 align-top"
                  >
                    <td className="py-5 pr-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 rounded-2xl bg-slate-100 p-3 text-slate-600">
                          <UsersRound size={16} />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{customer.name}</p>
                          <p className="mt-1 text-sm text-slate-500">{customer.email}</p>
                          {customer.notes ? <p className="mt-2 max-w-xs text-sm leading-6 text-slate-400">{customer.notes}</p> : null}
                        </div>
                      </div>
                    </td>
                    <td className="py-5 pr-4 text-slate-600">{customer.company}</td>
                    <td className="py-5 pr-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClass(customer.status)}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="py-5 pr-4 text-slate-600">{customer.phone}</td>
                    <td className="py-5 pr-4 text-slate-600">{formatDate(customer.createdAt)}</td>
                    <td className="py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => openEdit(customer)} className="rounded-2xl bg-slate-100 p-3 text-slate-600 transition hover:bg-slate-200">
                          <Pencil size={16} />
                        </button>
                        <button type="button" onClick={() => handleDelete(customer._id)} className="rounded-2xl bg-rose-50 p-3 text-rose-600 transition hover:bg-rose-100">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          ) : (
            <EmptyState
              title="No customers match this view"
              description="Try adjusting the search or status filter, or create a new customer to start building your CRM database."
              action={
                <button
                  type="button"
                  onClick={openCreate}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  <Plus size={16} />
                  Add first customer
                </button>
              }
            />
          )}
        </div>
      </MotionSection>

      <CustomerFormModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedCustomer(null);
        }}
        onSubmit={handleSubmit}
        customer={selectedCustomer}
        saving={saving}
      />
    </div>
  );
};

export default CustomersPage;
