export const formatDate = (value) =>
  new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

export const statusBadgeClass = (status) => {
  if (status === 'Active') return 'bg-emerald-100 text-emerald-700';
  if (status === 'Inactive') return 'bg-rose-100 text-rose-700';
  return 'bg-amber-100 text-amber-700';
};
