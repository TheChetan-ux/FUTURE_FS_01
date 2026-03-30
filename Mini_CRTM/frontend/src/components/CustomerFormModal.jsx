import { useEffect, useState } from 'react';

const initialState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  status: 'Lead',
  notes: '',
};

const CustomerFormModal = ({ isOpen, onClose, onSubmit, customer, saving }) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    setFormData(
      customer
        ? {
            name: customer.name || '',
            email: customer.email || '',
            phone: customer.phone || '',
            company: customer.company || '',
            status: customer.status || 'Lead',
            notes: customer.notes || '',
          }
        : initialState
    );
  }, [customer, isOpen]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/50 px-4 py-6">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-glow">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900">{customer ? 'Edit customer' : 'Add customer'}</h3>
            <p className="mt-1 text-sm text-slate-500">Keep core contact and company details in one place.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
            Close
          </button>
        </div>

        <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
          <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500" name="name" placeholder="Full name" value={formData.name} onChange={handleChange} required />
          <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500" name="phone" placeholder="Phone number" value={formData.phone} onChange={handleChange} required />
          <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500" name="company" placeholder="Company" value={formData.company} onChange={handleChange} required />
          <select className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500 sm:col-span-2" name="status" value={formData.status} onChange={handleChange}>
            <option value="Lead">Lead</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <textarea className="min-h-32 rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500 sm:col-span-2" name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} />

          <button
            type="submit"
            disabled={saving}
            className="sm:col-span-2 rounded-2xl bg-ink px-4 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? 'Saving...' : customer ? 'Update customer' : 'Create customer'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerFormModal;
