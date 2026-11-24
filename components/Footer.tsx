export default function Footer() {
  return (
    <footer className="border-t border-gold/20 py-8 text-center text-sm text-cream/60">
      <p className="font-serif text-lg text-gold">D&apos;Melara Maison</p>
      <p className="mt-1">Perfumería de diseñador y nicho · El Salvador</p>
      <p className="mt-3 text-xs">© {new Date().getFullYear()} D&apos;Melara Maison · Proyecto académico</p>
    </footer>
  );
}
