import { useEffect, useState } from 'react';

const emptyState = {
  customer: '',
  title: '',
  description: '',
  dueDate: '',
};

const toInputDateTime = (value) => {
  if (!value) return '';
  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60000);
  return localDate.toISOString().slice(0, 16);
};

const TaskFormModal = ({ isOpen, onClose, onSubmit, task, customers, saving }) => {
  const [formData, setFormData] = useState(emptyState);

  useEffect(() => {
    setFormData(
      task
        ? {
            customer: task.customer?._id || '',
            title: task.title || '',
            description: task.description || '',
            dueDate: toInputDateTime(task.dueDate),
          }
        : {
            ...emptyState,
            customer: customers[0]?._id || '',
          }
    );
  }, [task, customers, isOpen]);

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
            <h3 className="text-2xl font-semibold text-slate-900">{task ? 'Edit task' : 'Add follow-up'}</h3>
            <p className="mt-1 text-sm text-slate-500">Set a reminder and keep the next customer action visible.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
            Close
          </button>
        </div>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <select className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500" name="customer" value={formData.customer} onChange={handleChange} required>
            {customers.map((customer) => (
              <option key={customer._id} value={customer._id}>
                {customer.name} - {customer.company}
              </option>
            ))}
          </select>
          <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500" name="title" placeholder="Task title" value={formData.title} onChange={handleChange} required />
          <textarea className="min-h-28 rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
          <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500" name="dueDate" type="datetime-local" value={formData.dueDate} onChange={handleChange} required />

          <button
            type="submit"
            disabled={saving}
            className="rounded-2xl bg-ink px-4 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? 'Saving...' : task ? 'Update task' : 'Create task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;
