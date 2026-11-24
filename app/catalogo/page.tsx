import type { Metadata } from "next";
import { Suspense } from "react";
import CatalogoFiltros from "@/components/CatalogoFiltros";
import CatalogoLista from "@/components/CatalogoLista";
import PerfumeSkeletonGrid from "@/components/PerfumeSkeletonGrid";
import type { Filtros } from "@/lib/perfumes";

export const metadata: Metadata = { title: "Catálogo" };

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function CatalogoPage({ searchParams }: Props) {
  const sp = await searchParams;
  const get = (k: string) => {
    const v = sp[k];
    return Array.isArray(v) ? v[0] : v;
  };

  const filtros: Filtros = {
    q: get("q"),
    genero: get("genero"),
    linea: get("linea"),
    max: get("max") ? Number(get("max")) : undefined,
    orden: get("orden"),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-4xl text-gold">Catálogo</h1>
      <p className="mt-2 mb-8 text-cream/70">Fragancias de diseñador y nicho para todos los gustos.</p>

      <Suspense fallback={null}>
        <CatalogoFiltros />
      </Suspense>

      <Suspense key={JSON.stringify(filtros)} fallback={<PerfumeSkeletonGrid />}>
        <CatalogoLista filtros={filtros} />
      </Suspense>
    </div>
  );
}
