export default function PerfumeSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4" aria-busy="true" aria-label="Cargando perfumes">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-lg border border-gold/10 bg-ink-soft">
          <div className="aspect-[4/5] bg-white/5" />
          <div className="space-y-2 p-4">
            <div className="h-3 w-1/2 rounded bg-white/10" />
            <div className="h-4 w-3/4 rounded bg-white/10" />
            <div className="h-3 w-1/3 rounded bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
