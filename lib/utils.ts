import { GENERO_LABEL, LINEA_LABEL, type Perfume } from "@/lib/types";

export function formatPrecio(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export function descripcionPorDefecto(p: Perfume): string {
  const para = { dama: "para dama", hombre: "para hombre", unisex: "unisex" }[p.genero];
  return `${p.nombre} de ${p.marca}: una fragancia ${para} de línea ${LINEA_LABEL[p.linea].toLowerCase()}, disponible en D'Melara Maison. Categoría: ${GENERO_LABEL[p.genero]}.`;
}
