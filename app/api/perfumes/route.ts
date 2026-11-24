import { NextResponse, type NextRequest } from "next/server";
import { getPerfumes } from "@/lib/perfumes";

// GET /api/perfumes?q=dior&genero=hombre&linea=nicho&max=200&orden=precio-asc
export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const maxParam = sp.get("max");

  try {
    const perfumes = await getPerfumes({
      q: sp.get("q") ?? undefined,
      genero: sp.get("genero") ?? undefined,
      linea: sp.get("linea") ?? undefined,
      max: maxParam ? Number(maxParam) : undefined,
      orden: sp.get("orden") ?? undefined,
    });
    return NextResponse.json({ total: perfumes.length, data: perfumes });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
