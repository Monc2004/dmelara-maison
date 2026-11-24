import type { Metadata } from "next";
import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = { title: "Iniciar sesión" };

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      {isSupabaseConfigured ? (
        <Suspense fallback={null}>
          <AuthForm mode="login" />
        </Suspense>
      ) : (
        <SinSupabase />
      )}
    </div>
  );
}

function SinSupabase() {
  return (
    <div className="rounded-lg border border-gold/30 bg-ink-soft p-6 text-sm text-cream/80">
      <p className="font-serif text-xl text-gold">Autenticación no configurada</p>
      <p className="mt-2">
        Define <code>NEXT_PUBLIC_SUPABASE_URL</code> y <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> en <code>.env.local</code> y reinicia el servidor.
      </p>
    </div>
  );
}
