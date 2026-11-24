export type Genero = "dama" | "hombre" | "unisex";
export type Linea = "disenador" | "nicho";

export type Perfume = {
  id: string;
  slug: string;
  nombre: string;
  marca: string;
  genero: Genero;
  linea: Linea;
  precio: number;
  imagen: string | null;
  descripcion: string | null;
  destacado: boolean;
};

export const GENERO_LABEL: Record<Genero, string> = {
  dama: "Dama",
  hombre: "Hombre",
  unisex: "Unisex",
};

export const LINEA_LABEL: Record<Linea, string> = {
  disenador: "Diseñador",
  nicho: "Nicho",
};
