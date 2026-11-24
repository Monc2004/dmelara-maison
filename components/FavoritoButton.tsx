"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Props = {
  perfumeId: string;
  initial: boolean;
  isLoggedIn: boolean;
  variant?: "icon" | "full";
};

export default function FavoritoButton({ perfumeId, initial, isLoggedIn, variant = "icon" }: Props) {
  const router = useRouter();
  const [active, setActive] = useState(initial);
  const [busy, setBusy] = useState(false);

  async function toggle() {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    setBusy(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setBusy(false);
      router.push("/login");
      return;
    }

    const next = !active;
    setActive(next); // actualización optimista

    const { error } = next
      ? await supabase.from("favoritos").insert({ user_id: user.id, perfume_id: perfumeId })
      : await supabase.from("favoritos").delete().eq("user_id", user.id).eq("perfume_id", perfumeId);

    if (error) setActive(!next);
    else router.refresh();
    setBusy(false);
  }

  const heart = (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={toggle}
        disabled={busy}
        className="inline-flex items-center gap-2 rounded border border-gold px-5 py-3 text-sm tracking-wide text-gold transition hover:bg-gold hover:text-ink disabled:opacity-60"
      >
        {heart}
        {active ? "En tus favoritos" : "Guardar en favoritos"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      aria-label={active ? "Quitar de favoritos" : "Agregar a favoritos"}
      aria-pressed={active}
      className="rounded-full bg-ink/70 p-2 text-gold backdrop-blur transition hover:bg-ink disabled:opacity-60"
    >
      {heart}
    </button>
  );
}
