import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CheckCheck, Pencil, Plus, Trash2 } from 'lucide-react';

import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import MotionSection from '../components/MotionSection';
import PageHeader from '../components/PageHeader';
import TaskFormModal from '../components/TaskFormModal';
import api from '../services/api';
import { formatDate, statusBadgeClass } from '../utils/formatters';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchCustomers = async () => {
    const { data } = await api.get('/customers');
    setCustomers(data.customers);
  };

  const fetchTasks = async (selectedStatus = status) => {
    setLoading(true);
    try {
      const { data } = await api.get('/tasks', { params: { status: selectedStatus } });
      setTasks(data.tasks);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const bootstrap = async () => {
      try {
        await Promise.all([fetchCustomers(), fetchTasks('all')]);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to initialize tasks page');
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  const openCreate = () => {
    setSelectedTask(null);
    setModalOpen(true);
  };

  const openEdit = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    setSaving(true);
    try {
      const payload = {
        ...formData,
        dueDate: new Date(formData.dueDate).toISOString(),
      };

      if (selectedTask) {
        await api.put(`/tasks/${selectedTask._id}`, payload);
      } else {
        await api.post('/tasks', payload);
      }

      setModalOpen(false);
      setSelectedTask(null);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save task');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await api.put(`/tasks/${task._id}`, { completed: !task.completed });
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update task');
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this task?');
    if (!confirmed) return;

    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete task');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Follow-Ups"
        title="A cleaner task board for disciplined customer follow-through"
        description="Track every next step with clearer states, stronger hierarchy, and premium interaction feedback."
        actions={
          <button
            type="button"
            onClick={openCreate}
            disabled={!customers.length}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Plus size={18} />
            Add task
          </button>
        }
      />

      <MotionSection delay={0.05} className="rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {[
              ['all', 'All'],
              ['pending', 'Pending'],
              ['completed', 'Completed'],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setStatus(value);
                  fetchTasks(value);
                }}
                className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  status === value
                    ? 'bg-slate-950 text-white shadow-lg shadow-slate-900/10'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {!customers.length ? <p className="text-sm text-amber-600">Add a customer before creating follow-up tasks.</p> : null}
        </div>

        {error && !loading ? <div className="mt-5"><ErrorState title="Tasks unavailable" message={error} onRetry={() => fetchTasks()} /></div> : null}

        <div className="mt-6 space-y-4">
          {loading ? (
            <LoadingState title="Loading tasks" description="Bringing in reminders, due dates, and completion states." rows={4} />
          ) : tasks.length ? (
            tasks.map((task, index) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: index * 0.04 }}
                className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(248,250,252,0.95)_100%)] p-5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-slate-950">{task.title}</h3>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${task.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {task.completed ? 'Completed' : 'Pending'}
                      </span>
                      {task.customer?.status ? (
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClass(task.customer.status)}`}>
                          {task.customer.status}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                      {task.customer?.name} at {task.customer?.company}
                    </p>
                    {task.description ? <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{task.description}</p> : null}
                    <p className="mt-3 text-sm font-medium text-slate-500">Due: {formatDate(task.dueDate)}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleComplete(task)}
                      className="inline-flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
                    >
                      <CheckCheck size={16} />
                      {task.completed ? 'Mark pending' : 'Mark done'}
                    </button>
                    <button type="button" onClick={() => openEdit(task)} className="rounded-2xl bg-slate-100 p-3 text-slate-600 transition hover:bg-slate-200">
                      <Pencil size={16} />
                    </button>
                    <button type="button" onClick={() => handleDelete(task._id)} className="rounded-2xl bg-rose-50 p-3 text-rose-600 transition hover:bg-rose-100">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <EmptyState
              title="No follow-ups in this view"
              description="Create a task for a customer so upcoming calls, emails, and reminders stay visible."
              action={
                customers.length ? (
                  <button
                    type="button"
                    onClick={openCreate}
                    className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                  >
                    <Plus size={16} />
                    Create follow-up
                  </button>
                ) : null
              }
            />
          )}
        </div>
      </MotionSection>

      <TaskFormModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedTask(null);
        }}
        onSubmit={handleSubmit}
        task={selectedTask}
        customers={customers}
        saving={saving}
      />
    </div>
  );
};

export default TasksPage;
