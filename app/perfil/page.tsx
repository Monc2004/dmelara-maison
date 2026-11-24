import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import PerfumeCard from "@/components/PerfumeCard";
import { getUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { Perfume } from "@/lib/types";

export const metadata: Metadata = { title: "Mi perfil" };

export default async function PerfilPage() {
  if (!isSupabaseConfigured) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center text-cream/80">
        Configura Supabase en <code>.env.local</code> para usar tu perfil.
      </div>
    );
  }

  const user = await getUser();
  if (!user) redirect("/login?redirect=/perfil");

  const supabase = await createClient();
  const [{ data: profile }, { data: favs }] = await Promise.all([
    supabase.from("profiles").select("nombre").eq("id", user.id).maybeSingle(),
    supabase
      .from("favoritos")
      .select("perfume_id, perfumes(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
  ]);

  const perfumes = ((favs ?? []) as unknown as { perfumes: Perfume | null }[])
    .map((f) => f.perfumes)
    .filter((p): p is Perfume => p !== null);

  const nombre = profile?.nombre || (user.user_metadata?.nombre as string | undefined) || "";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p className="text-xs uppercase tracking-[0.3em] text-gold/80">Mi cuenta</p>
      <h1 className="mt-2 font-serif text-4xl">
        Hola{nombre ? `, ${nombre.split(" ")[0]}` : ""}
      </h1>
      <p className="mt-1 text-cream/60">{user.email}</p>

      <h2 className="mt-12 font-serif text-3xl text-gold">Mis favoritos</h2>
      {perfumes.length === 0 ? (
        <div className="mt-6 rounded-lg border border-gold/20 p-10 text-center">
          <p className="text-cream/70">Aún no has guardado perfumes.</p>
          <Link href="/catalogo" className="mt-4 inline-block text-gold hover:underline">
            Explorar el catálogo →
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {perfumes.map((p) => (
            <PerfumeCard key={p.id} perfume={p} fav={{ initial: true, isLoggedIn: true }} />
          ))}
        </div>
      )}
    </div>
  );
}
