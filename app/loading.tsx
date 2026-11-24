export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-label="Cargando">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
    </div>
  );
}
