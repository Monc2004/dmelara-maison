import type { Genero, Linea, Perfume } from "@/lib/types";

// [slug, nombre, marca, genero, linea, precio USD (referencial), destacado]
type Fila = [string, string, string, Genero, Linea, number, boolean?];

const filas: Fila[] = [
  // DAMA (13)
  ["coco-mademoiselle", "Coco Mademoiselle", "Chanel", "dama", "disenador", 135, true],
  ["jadore", "J'adore", "Dior", "dama", "disenador", 140],
  ["libre", "Libre", "Yves Saint Laurent", "dama", "disenador", 130],
  ["la-vie-est-belle", "La Vie Est Belle", "Lancôme", "dama", "disenador", 120],
  ["good-girl", "Good Girl", "Carolina Herrera", "dama", "disenador", 115],
  ["bloom", "Bloom", "Gucci", "dama", "disenador", 110],
  ["born-in-roma-donna", "Born in Roma Donna", "Valentino", "dama", "disenador", 125],
  ["delina", "Delina", "Parfums de Marly", "dama", "nicho", 330, true],
  ["love-dont-be-shy", "Love, Don't Be Shy", "Kilian", "dama", "nicho", 295],
  ["portrait-of-a-lady", "Portrait of a Lady", "Frédéric Malle", "dama", "nicho", 280],
  ["roses-vanille", "Roses Vanille", "Mancera", "dama", "nicho", 165],
  ["roses-musk", "Roses Musk", "Montale", "dama", "nicho", 150],
  ["velvet-orchid", "Velvet Orchid", "Tom Ford", "dama", "nicho", 250],
  // HOMBRE (13)
  ["sauvage", "Sauvage", "Dior", "hombre", "disenador", 125, true],
  ["bleu-de-chanel", "Bleu de Chanel", "Chanel", "hombre", "disenador", 140],
  ["1-million", "1 Million", "Paco Rabanne", "hombre", "disenador", 100],
  ["eros", "Eros", "Versace", "hombre", "disenador", 95],
  ["acqua-di-gio-profondo", "Acqua di Giò Profondo", "Giorgio Armani", "hombre", "disenador", 110],
  ["lhomme", "L'Homme", "Prada", "hombre", "disenador", 115],
  ["le-male-elixir", "Le Male Elixir", "Jean Paul Gaultier", "hombre", "disenador", 130],
  ["explorer", "Explorer", "Montblanc", "hombre", "disenador", 90],
  ["the-most-wanted", "The Most Wanted", "Azzaro", "hombre", "disenador", 105],
  ["aventus", "Aventus", "Creed", "hombre", "nicho", 365, true],
  ["herod", "Herod", "Parfums de Marly", "hombre", "nicho", 320],
  ["naxos", "Naxos", "Xerjoff", "hombre", "nicho", 290],
  ["interlude-man", "Interlude Man", "Amouage", "hombre", "nicho", 310],
  // UNISEX (14)
  ["baccarat-rouge-540", "Baccarat Rouge 540", "Maison Francis Kurkdjian", "unisex", "nicho", 325, true],
  ["oud-wood", "Oud Wood", "Tom Ford", "unisex", "nicho", 260],
  ["gypsy-water", "Gypsy Water", "Byredo", "unisex", "nicho", 235],
  ["santal-33", "Santal 33", "Le Labo", "unisex", "nicho", 220, true],
  ["by-the-fireplace", "Replica By the Fireplace", "Maison Margiela", "unisex", "disenador", 150],
  ["side-effect", "Side Effect", "Initio", "unisex", "nicho", 300],
  ["erba-pura", "Erba Pura", "Xerjoff", "unisex", "nicho", 270],
  ["hacivat", "Hacivat", "Nishane", "unisex", "nicho", 210],
  ["tam-dao", "Tam Dao", "Diptyque", "unisex", "nicho", 170],
  ["wood-sage-sea-salt", "Wood Sage & Sea Salt", "Jo Malone", "unisex", "disenador", 160],
  ["tobacco-vanille", "Tobacco Vanille", "Tom Ford", "unisex", "nicho", 270],
  ["molecule-01", "Molecule 01", "Escentric Molecules", "unisex", "nicho", 150],
  ["oud-maracuja", "Oud Maracujá", "Maison Crivelli", "unisex", "nicho", 280],
  ["silver-mountain-water", "Silver Mountain Water", "Creed", "unisex", "nicho", 345],
];

export const perfumesLocal: Perfume[] = filas.map(
  ([slug, nombre, marca, genero, linea, precio, destacado]) => ({
    id: slug,
    slug,
    nombre,
    marca,
    genero,
    linea,
    precio,
    imagen: `/perfumes/${slug}.jpg`,
    descripcion: null,
    destacado: Boolean(destacado),
  }),
);
