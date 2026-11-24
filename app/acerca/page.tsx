import type { Metadata } from "next";

export const metadata: Metadata = { title: "Acerca de nosotros" };

const pilares = [
  { t: "Diseñador", d: "Las casas clásicas que definieron la perfumería moderna, a precios accesibles." },
  { t: "Nicho", d: "Creaciones de autor, de tirada limitada y con ingredientes poco convencionales." },
  { t: "Para todos", d: "Colecciones para dama, hombre y unisex: la fragancia no tiene género." },
];

export default function AcercaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <p className="text-xs uppercase tracking-[0.3em] text-gold/80">Nuestra casa</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">
        D&apos;Melara <span className="text-gold">Maison</span>
      </h1>
      <p className="mt-6 max-w-prose text-cream/75">
        D&apos;Melara Maison es una boutique de perfumería enfocada en seleccionar fragancias de diseñador y de nicho. Creemos que un perfume es la firma invisible de cada persona, y nuestro catálogo busca ayudarte a encontrar la tuya.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {pilares.map((p) => (
          <div key={p.t} className="rounded-lg border border-gold/20 bg-ink-soft p-6">
            <h2 className="font-serif text-2xl text-gold">{p.t}</h2>
            <p className="mt-2 text-sm text-cream/70">{p.d}</p>
          </div>
        ))}
      </div>

      <p className="mt-12 text-xs text-cream/40">
        Proyecto académico desarrollado con Next.js, TypeScript, Tailwind CSS y Supabase mediante la metodología de Vibe Coding.
      </p>
    </div>
  );
}
