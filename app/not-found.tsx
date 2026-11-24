import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="font-serif text-6xl text-gold">404</p>
      <p className="mt-3 text-cream/70">Esta fragancia no existe en nuestro catálogo.</p>
      <Link href="/catalogo" className="mt-6 rounded bg-gold px-6 py-3 text-sm font-medium text-ink hover:bg-gold-light">
        Volver al catálogo
      </Link>
    </div>
  );
}
