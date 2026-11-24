"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const inputClass =
  "w-full rounded border border-gold/30 bg-ink-soft px-3 py-2 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none";

export default function CatalogoFiltros() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [q, setQ] = useState(params.get("q") ?? "");
  const [genero, setGenero] = useState(params.get("genero") ?? "");
  const [linea, setLinea] = useState(params.get("linea") ?? "");
  const [max, setMax] = useState(params.get("max") ?? "");
  const [orden, setOrden] = useState(params.get("orden") ?? "");

  // Cada cambio de filtro actualiza la URL (con debounce) y el Server Component se vuelve a renderizar.
  useEffect(() => {
    const t = setTimeout(() => {
      const next = new URLSearchParams();
      if (q.trim()) next.set("q", q.trim());
      if (genero) next.set("genero", genero);
      if (linea) next.set("linea", linea);
      if (max) next.set("max", max);
      if (orden) next.set("orden", orden);
      const qs = next.toString();
      if (qs !== params.toString()) {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      }
    }, 350);
    return () => clearTimeout(t);
  }, [q, genero, linea, max, orden, pathname, router, params]);

  function limpiar() {
    setQ("");
    setGenero("");
    setLinea("");
    setMax("");
    setOrden("");
  }

  return (
    <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar perfume o marca…"
        aria-label="Buscar"
        className={`${inputClass} lg:col-span-2`}
      />
      <select value={genero} onChange={(e) => setGenero(e.target.value)} aria-label="Género" className={inputClass}>
        <option value="">Todos los géneros</option>
        <option value="dama">Dama</option>
        <option value="hombre">Hombre</option>
        <option value="unisex">Unisex</option>
      </select>
      <select value={linea} onChange={(e) => setLinea(e.target.value)} aria-label="Línea" className={inputClass}>
        <option value="">Diseñador y nicho</option>
        <option value="disenador">Diseñador</option>
        <option value="nicho">Nicho</option>
      </select>
      <select value={max} onChange={(e) => setMax(e.target.value)} aria-label="Precio máximo" className={inputClass}>
        <option value="">Cualquier precio</option>
        <option value="100">Hasta $100</option>
        <option value="150">Hasta $150</option>
        <option value="250">Hasta $250</option>
        <option value="350">Hasta $350</option>
      </select>
      <div className="flex gap-3">
        <select value={orden} onChange={(e) => setOrden(e.target.value)} aria-label="Ordenar" className={inputClass}>
          <option value="">Nombre (A–Z)</option>
          <option value="precio-asc">Precio ↑</option>
          <option value="precio-desc">Precio ↓</option>
        </select>
        <button
          type="button"
          onClick={limpiar}
          className="shrink-0 rounded border border-gold/40 px-3 text-sm text-gold hover:bg-gold hover:text-ink"
        >
          Limpiar
        </button>
      </div>
    </div>
  );
}
