"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const inputClass =
  "w-full rounded border border-gold/30 bg-ink px-3 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none";

function traducir(msg: string): string {
  if (msg.includes("Invalid login credentials")) return "Correo o contraseña incorrectos.";
  if (msg.includes("already registered")) return "Ese correo ya tiene una cuenta.";
  if (msg.includes("Password should be")) return "La contraseña debe tener al menos 6 caracteres.";
  if (msg.includes("Email not confirmed")) return "Confirma tu correo antes de ingresar.";
  return msg;
}

export default function AuthForm({ mode }: { mode: "login" | "registro" }) {
  const router = useRouter();
  const params = useSearchParams();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const redirectParam = params.get("redirect") ?? "/perfil";
  const redirectTo = redirectParam.startsWith("/") && !redirectParam.startsWith("//") ? redirectParam : "/perfil";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    const supabase = createClient();

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(traducir(error.message));
        setLoading(false);
        return;
      }
      router.push(redirectTo);
      router.refresh();
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nombre } },
    });
    if (error) {
      setError(traducir(error.message));
      setLoading(false);
      return;
    }
    if (data.session) {
      router.push("/perfil");
      router.refresh();
    } else {
      setInfo("Cuenta creada. Revisa tu correo para confirmar tu registro y luego inicia sesión.");
      setLoading(false);
    }
  }

  const esLogin = mode === "login";

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-lg border border-gold/20 bg-ink-soft p-6 sm:p-8">
      <h1 className="font-serif text-3xl text-gold">{esLogin ? "Iniciar sesión" : "Crear cuenta"}</h1>

      {!esLogin && (
        <input
          type="text"
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre completo"
          autoComplete="name"
          className={inputClass}
        />
      )}
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo electrónico"
        autoComplete="email"
        className={inputClass}
      />
      <input
        type="password"
        required
        minLength={6}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña (mínimo 6 caracteres)"
        autoComplete={esLogin ? "current-password" : "new-password"}
        className={inputClass}
      />

      {error && (
        <p role="alert" className="rounded border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}
      {info && (
        <p role="status" className="rounded border border-gold/40 bg-gold/10 px-3 py-2 text-sm text-gold-light">
          {info}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-gold py-3 text-sm font-medium tracking-wide text-ink transition hover:bg-gold-light disabled:opacity-60"
      >
        {loading ? "Procesando…" : esLogin ? "Ingresar" : "Registrarme"}
      </button>

      <p className="text-center text-sm text-cream/70">
        {esLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
        <Link href={esLogin ? "/registro" : "/login"} className="text-gold hover:underline">
          {esLogin ? "Regístrate" : "Inicia sesión"}
        </Link>
      </p>
    </form>
  );
}
