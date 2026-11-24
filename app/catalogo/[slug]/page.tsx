import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PerfumeImage from "@/components/PerfumeImage";
import PerfumeCard from "@/components/PerfumeCard";
import FavoritoButton from "@/components/FavoritoButton";
import { getFavoritoIds, getPerfumeBySlug, getPerfumes } from "@/lib/perfumes";
import { getUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { GENERO_LABEL, LINEA_LABEL, type Perfume } from "@/lib/types";
import { descripcionPorDefecto, formatPrecio } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPerfumeBySlug(slug);
  return { title: p ? `${p.nombre} · ${p.marca}` : "Perfume no encontrado" };
}

export default async function PerfumePage({ params }: Props) {
  const { slug } = await params;
  const perfume = await getPerfumeBySlug(slug);
  if (!perfume) notFound();

  const [user, favIds, mismoGenero] = await Promise.all([
    getUser(),
    getFavoritoIds(),
    getPerfumes({ genero: perfume.genero }),
  ]);
  const favSet = new Set(favIds);
  const favFor = (p: Perfume) =>
    isSupabaseConfigured ? { initial: favSet.has(p.id), isLoggedIn: !!user } : undefined;
  const similares = mismoGenero.filter((p) => p.id !== perfume.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Link href="/catalogo" className="text-sm text-cream/60 hover:text-gold">
        ← Volver al catálogo
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="group relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-lg border border-gold/20">
          <PerfumeImage
            src={perfume.imagen}
            alt={`${perfume.nombre} de ${perfume.marca}`}
            marca={perfume.marca}
            priority
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold/80">{perfume.marca}</p>
          <h1 className="mt-2 font-serif text-4xl sm:text-5xl">{perfume.nombre}</h1>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-gold/40 px-3 py-1 text-xs text-gold">
              {GENERO_LABEL[perfume.genero]}
            </span>
            <span className="rounded-full border border-gold/40 px-3 py-1 text-xs text-gold">
              {LINEA_LABEL[perfume.linea]}
            </span>
          </div>

          <p className="mt-6 font-serif text-4xl text-gold">{formatPrecio(perfume.precio)}</p>
          <p className="mt-6 max-w-prose text-cream/70">
            {perfume.descripcion ?? descripcionPorDefecto(perfume)}
          </p>

          {isSupabaseConfigured && (
            <div className="mt-8">
              <FavoritoButton
                perfumeId={perfume.id}
                initial={favSet.has(perfume.id)}
                isLoggedIn={!!user}
                variant="full"
              />
            </div>
          )}
        </div>
      </div>

      {similares.length > 0 && (
        <section className="mt-20">
          <h2 className="font-serif text-3xl text-gold">También te puede gustar</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {similares.map((p) => (
              <PerfumeCard key={p.id} perfume={p} fav={favFor(p)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
