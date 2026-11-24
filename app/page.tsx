import Link from "next/link";
import PerfumeCard from "@/components/PerfumeCard";
import { getPerfumes } from "@/lib/perfumes";

const categorias = [
  { href: "/catalogo?genero=dama", titulo: "Dama", texto: "Florales, ambarados y gourmand" },
  { href: "/catalogo?genero=hombre", titulo: "Hombre", texto: "Frescos, amaderados y especiados" },
  { href: "/catalogo?genero=unisex", titulo: "Unisex", texto: "Sin etiquetas, solo carácter" },
  { href: "/catalogo?linea=nicho", titulo: "Nicho", texto: "Casas artesanales y ediciones únicas" },
];

export default async function HomePage() {
  const todos = await getPerfumes();
  const destacados = todos.filter((p) => p.destacado).slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden border-b border-gold/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,75,0.18),transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:py-32">
          <p className="text-xs uppercase tracking-[0.4em] text-gold">Perfumería de autor</p>
          <h1 className="mt-4 font-serif text-5xl leading-tight sm:text-7xl">
            D&apos;Melara <span className="text-gold">Maison</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-cream/70">
            Fragancias de diseñador y nicho seleccionadas para dama, hombre y unisex. Encuentra la que cuente tu historia.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/catalogo" className="rounded bg-gold px-8 py-3 text-sm font-medium tracking-wide text-ink transition hover:bg-gold-light">
              Ver catálogo
            </Link>
            <Link href="/acerca" className="rounded border border-gold/60 px-8 py-3 text-sm tracking-wide text-gold transition hover:bg-gold/10">
              Conócenos
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="font-serif text-3xl text-gold">Explora por categoría</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categorias.map((c) => (
            <Link
              key={c.titulo}
              href={c.href}
              className="group rounded-lg border border-gold/20 bg-ink-soft p-6 transition hover:border-gold/60"
            >
              <h3 className="font-serif text-2xl group-hover:text-gold">{c.titulo}</h3>
              <p className="mt-2 text-sm text-cream/60">{c.texto}</p>
              <span className="mt-4 inline-block text-sm text-gold">Explorar →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-3xl text-gold">Destacados</h2>
          <Link href="/catalogo" className="text-sm text-cream/70 hover:text-gold">
            Ver todos →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {destacados.map((p, i) => (
            <PerfumeCard key={p.id} perfume={p} priority={i < 4} />
          ))}
        </div>
      </section>
    </>
  );
}
