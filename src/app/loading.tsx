export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading page"
      className="mx-auto max-w-5xl animate-pulse space-y-6 px-6 py-20"
    >
      <div className="bg-paper-2 h-4 w-32" />
      <div className="bg-paper-2 h-10 w-2/3" />
      <div className="bg-paper-2 h-4 w-1/2" />
      <div className="border-line mt-10 grid grid-cols-2 gap-px border sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-paper-2 h-24" />
        ))}
      </div>
    </div>
  );
}
