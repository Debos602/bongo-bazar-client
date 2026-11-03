export default function DashboardLoading() {
  return (
    <div role="status" aria-label="Loading" className="animate-pulse">
      <div className="mb-6 h-7 w-48 rounded-md bg-slate-200" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => <div key={i} className="h-24 rounded-xl bg-slate-200/70" />)}
      </div>
      <div className="mt-5 h-72 rounded-xl bg-slate-200/70" />
    </div>
  );
}
