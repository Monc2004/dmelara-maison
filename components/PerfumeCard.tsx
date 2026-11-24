import Link from "next/link";
import PerfumeImage from "@/components/PerfumeImage";
import FavoritoButton from "@/components/FavoritoButton";
import { GENERO_LABEL, LINEA_LABEL, type Perfume } from "@/lib/types";
import { formatPrecio } from "@/lib/utils";

type Props = {
  perfume: Perfume;
  fav?: { initial: boolean; isLoggedIn: boolean };
  priority?: boolean;
};

export default function PerfumeCard({ perfume, fav, priority = false }: Props) {
  return (
    <article className="group relative overflow-hidden rounded-lg border border-gold/20 bg-ink-soft transition hover:border-gold/60">
      <Link href={`/catalogo/${perfume.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <PerfumeImage
            src={perfume.imagen}
            alt={`${perfume.nombre} de ${perfume.marca}`}
            marca={perfume.marca}
            priority={priority}
          />
        </div>
        <div className="space-y-1 p-4">
          <p className="text-xs uppercase tracking-widest text-gold/80">{perfume.marca}</p>
          <h3 className="font-serif text-lg leading-tight">{perfume.nombre}</h3>
          <div className="flex items-center justify-between pt-2">
            <span className="font-medium text-gold">{formatPrecio(perfume.precio)}</span>
            <span className="text-xs text-cream/60">
              {GENERO_LABEL[perfume.genero]} · {LINEA_LABEL[perfume.linea]}
            </span>
          </div>
        </div>
      </Link>
      {fav && (
        <div className="absolute right-3 top-3">
          <FavoritoButton perfumeId={perfume.id} initial={fav.initial} isLoggedIn={fav.isLoggedIn} />
        </div>
      )}
    </article>
  );
}
