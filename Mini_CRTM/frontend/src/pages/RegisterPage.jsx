import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../hooks/useAuth';

const RegisterPage = () => {
  const { register, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create account" subtitle="Start your own lightweight CRM workspace in just a minute.">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500" type="text" name="name" placeholder="Full name" value={formData.name} onChange={handleChange} required />
        <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500" type="password" name="password" placeholder="Password (min 6 chars)" value={formData.password} onChange={handleChange} required minLength={6} />
        {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</p> : null}
        <button type="submit" disabled={loading} className="w-full rounded-2xl bg-ink px-4 py-3 font-medium text-white transition hover:bg-slate-800 disabled:opacity-70">
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <p className="mt-6 text-sm text-slate-500">
        Already have an account?{' '}
        <Link className="font-semibold text-teal-600" to="/login">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default RegisterPage;
