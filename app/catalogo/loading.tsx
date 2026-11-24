import PerfumeSkeletonGrid from "@/components/PerfumeSkeletonGrid";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-8 h-10 w-48 animate-pulse rounded bg-white/10" />
      <PerfumeSkeletonGrid />
    </div>
  );
}
