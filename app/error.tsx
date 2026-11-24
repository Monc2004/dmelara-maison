"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="font-serif text-4xl text-gold">Algo salió mal</p>
      <p className="mt-3 text-cream/70">{error.message || "Ocurrió un error inesperado."}</p>
      <button
        onClick={() => reset()}
        className="mt-6 rounded bg-gold px-6 py-3 text-sm font-medium text-ink hover:bg-gold-light"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
