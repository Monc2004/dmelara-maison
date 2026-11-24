import PerfumeCard from "@/components/PerfumeCard";
import { getFavoritoIds, getPerfumes, type Filtros } from "@/lib/perfumes";
import { getUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";

// Server Component asíncrono: consulta los datos en el servidor.
export default async function CatalogoLista({ filtros }: { filtros: Filtros }) {
  const [perfumes, user, favIds] = await Promise.all([
    getPerfumes(filtros),
    getUser(),
    getFavoritoIds(),
  ]);
  const favSet = new Set(favIds);

  if (perfumes.length === 0) {
    return (
      <div className="rounded-lg border border-gold/20 p-10 text-center">
        <p className="font-serif text-2xl text-gold">Sin resultados</p>
        <p className="mt-2 text-cream/70">Prueba con otros filtros o limpia la búsqueda.</p>
      </div>
    );
  }

  return (
    <>
      <p className="mb-4 text-sm text-cream/60">
        {perfumes.length} {perfumes.length === 1 ? "perfume" : "perfumes"}
      </p>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {perfumes.map((p, i) => (
          <PerfumeCard
            key={p.id}
            perfume={p}
            priority={i < 4}
            fav={isSupabaseConfigured ? { initial: favSet.has(p.id), isLoggedIn: !!user } : undefined}
          />
        ))}
      </div>
    </>
  );
}
