"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string | null;
  alt: string;
  marca: string;
  priority?: boolean;
};

// Muestra la foto del perfume; si no existe, un placeholder con la inicial de la marca.
export default function PerfumeImage({ src, alt, marca, priority = false }: Props) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-soft via-ink to-black">
        <span className="font-serif text-6xl text-gold/50">{marca.charAt(0)}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      className="object-cover transition duration-500 group-hover:scale-105"
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}
