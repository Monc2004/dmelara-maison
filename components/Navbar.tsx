import NavMenu from "@/components/NavMenu";
import { getUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default async function Navbar() {
  const user = await getUser();
  const nombre = (user?.user_metadata?.nombre as string | undefined) ?? "";

  return (
    <header className="sticky top-0 z-40 border-b border-gold/20 bg-ink/90 backdrop-blur">
      <NavMenu isLoggedIn={!!user} nombre={nombre} authEnabled={isSupabaseConfigured} />
    </header>
  );
}
