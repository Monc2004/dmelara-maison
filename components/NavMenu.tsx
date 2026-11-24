"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "@/app/actions";

type Props = { isLoggedIn: boolean; nombre: string; authEnabled: boolean };

const links = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/acerca", label: "Acerca" },
];

export default function NavMenu({ isLoggedIn, nombre, authEnabled }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const linkClass = (href: string) => {
    const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return `block px-3 py-2 text-sm tracking-wide transition-colors hover:text-gold ${
      active ? "text-gold" : "text-cream/80"
    }`;
  };

  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
      <Link href="/" onClick={() => setOpen(false)} className="font-serif text-xl text-gold sm:text-2xl">
        D&apos;Melara <span className="text-cream">Maison</span>
      </Link>

      <button
        type="button"
        className="rounded border border-gold/40 p-2 text-gold md:hidden"
        aria-label="Abrir menú"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      <div
        className={`${
          open ? "absolute inset-x-0 top-full flex flex-col border-b border-gold/20 bg-ink px-4 pb-4" : "hidden"
        } md:static md:flex md:flex-row md:items-center md:gap-2 md:border-0 md:bg-transparent md:p-0`}
      >
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={linkClass(l.href)} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}

        {authEnabled &&
          (isLoggedIn ? (
            <>
              <Link href="/perfil" className={linkClass("/perfil")} onClick={() => setOpen(false)}>
                Mi perfil{nombre ? ` (${nombre.split(" ")[0]})` : ""}
              </Link>
              <form action={signOut}>
                <button type="submit" className="block px-3 py-2 text-sm text-cream/80 hover:text-gold">
                  Salir
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className={linkClass("/login")} onClick={() => setOpen(false)}>
                Ingresar
              </Link>
              <Link
                href="/registro"
                onClick={() => setOpen(false)}
                className="mt-2 rounded border border-gold px-4 py-2 text-center text-sm text-gold transition hover:bg-gold hover:text-ink md:mt-0"
              >
                Crear cuenta
              </Link>
            </>
          ))}
      </div>
    </nav>
  );
}
