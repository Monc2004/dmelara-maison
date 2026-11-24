import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getUser } from "@/lib/auth";
import { perfumesLocal } from "@/data/perfumes";
import type { Perfume } from "@/lib/types";

export type Filtros = {
  q?: string;
  genero?: string;
  linea?: string;
  max?: number;
  orden?: string;
};

const GENEROS = ["dama", "hombre", "unisex"];
const LINEAS = ["disenador", "nicho"];

/**
 * Lista perfumes aplicando filtros.
 * - Con Supabase configurado: consulta la tabla `perfumes`.
 * - Sin variables de entorno: usa los datos locales (modo demo).
 */
export async function getPerfumes(f: Filtros = {}): Promise<Perfume[]> {
  const q = f.q?.trim() ?? "";
  const genero = f.genero && GENEROS.includes(f.genero) ? f.genero : undefined;
  const linea = f.linea && LINEAS.includes(f.linea) ? f.linea : undefined;
  const max = f.max && f.max > 0 ? f.max : undefined;
  const orden = f.orden ?? "nombre";

  if (isSupabaseConfigured) {
    const supabase = await createClient();
    let query = supabase.from("perfumes").select("*");

    if (genero) query = query.eq("genero", genero);
    if (linea) query = query.eq("linea", linea);
    if (max) query = query.lte("precio", max);
    if (q) {
      const safe = q.replace(/[,%()*]/g, " ");
      query = query.or(`nombre.ilike.%${safe}%,marca.ilike.%${safe}%`);
    }

    if (orden === "precio-asc") query = query.order("precio", { ascending: true });
    else if (orden === "precio-desc") query = query.order("precio", { ascending: false });
    else query = query.order("nombre", { ascending: true });

    const { data, error } = await query;
    if (error) throw new Error(`No se pudo cargar el catálogo: ${error.message}`);
    return (data ?? []) as Perfume[];
  }

  const needle = q.toLowerCase();
  const result = perfumesLocal.filter(
    (p) =>
      (!genero || p.genero === genero) &&
      (!linea || p.linea === linea) &&
      (!max || p.precio <= max) &&
      (!needle ||
        p.nombre.toLowerCase().includes(needle) ||
        p.marca.toLowerCase().includes(needle)),
  );

  if (orden === "precio-asc") result.sort((a, b) => a.precio - b.precio);
  else if (orden === "precio-desc") result.sort((a, b) => b.precio - a.precio);
  else result.sort((a, b) => a.nombre.localeCompare(b.nombre));
  return result;
}

export async function getPerfumeBySlug(slug: string): Promise<Perfume | null> {
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("perfumes")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw new Error(`No se pudo cargar el perfume: ${error.message}`);
    return (data as Perfume | null) ?? null;
  }
  return perfumesLocal.find((p) => p.slug === slug) ?? null;
}

export async function getFavoritoIds(): Promise<string[]> {
  if (!isSupabaseConfigured) return [];
  const user = await getUser();
  if (!user) return [];
  const supabase = await createClient();
  const { data } = await supabase.from("favoritos").select("perfume_id").eq("user_id", user.id);
  return (data ?? []).map((r) => r.perfume_id as string);
}
