# D'Melara Maison

Tienda de perfumes de **diseñador y nicho** (dama, hombre y unisex) con catálogo de 40 fragancias, registro, inicio de sesión y favoritos.
Proyecto de la actividad evaluada **"Implementación de Aplicación Next.js mediante Vibe Coding"**.

🔗 **Demo en producción:** `https://TU-PROYECTO.vercel.app` ← *reemplaza con tu URL de Vercel*

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Supabase (Auth + PostgreSQL con RLS)
- Despliegue en Vercel

## Rutas

| Ruta | Descripción |
|---|---|
| `/` | Inicio con destacados y categorías |
| `/catalogo` | Catálogo con búsqueda y filtros (género, línea, precio, orden) |
| `/catalogo/[slug]` | Detalle del perfume y favoritos |
| `/login` · `/registro` | Autenticación con Supabase |
| `/perfil` | Favoritos del usuario (ruta protegida por `proxy.ts`) |
| `/acerca` | Información de la tienda |
| `/api/perfumes` | Route Handler (JSON) con filtros por query params |

## Requisitos del curso cubiertos

- App Router con más de 4 rutas · TypeScript · Tailwind
- Server Components (home, catálogo, detalle, perfil) y Client Components (filtros, formularios, favoritos, menú)
- `useState` y `useEffect` (filtros con debounce, formularios, menú móvil)
- API interna (Route Handler) y servicio serverless (Supabase)
- `loading.tsx`, `error.tsx` y `not-found.tsx`
- Diseño responsive (mobile-first)
- Variables sensibles en `.env.local`

## Instalación

```bash
git clone https://github.com/TU-USUARIO/dmelara-maison.git
cd dmelara-maison
npm install
cp .env.example .env.local   # completa con tus claves de Supabase
npm run dev
```

Abre http://localhost:3000.

> Si no defines las variables de Supabase, el catálogo funciona en **modo demo** con los datos locales (`data/perfumes.ts`), pero el registro, login y favoritos quedan deshabilitados.

## Configurar Supabase

1. Crea un proyecto en https://supabase.com.
2. En **SQL Editor**, ejecuta el contenido de `supabase/schema.sql` (tablas, RLS, trigger de perfiles y los 40 perfumes).
3. En **Authentication → Providers → Email**, desactiva *Confirm email* mientras desarrollas.
4. En **Project Settings → API**, copia la URL y la `anon key` a `.env.local`.

## Imágenes

Guarda una foto por perfume en `public/perfumes/<slug>.jpg` (por ejemplo `sauvage.jpg`). Los slugs están en `data/perfumes.ts`. Si falta alguna, se muestra un placeholder con la inicial de la marca.

## Despliegue en Vercel

1. Sube el repo a GitHub.
2. En Vercel: **Add New → Project** e importa el repositorio.
3. En *Environment Variables* agrega `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Deploy. Luego, en Supabase → Authentication → URL Configuration, agrega tu dominio de Vercel como *Site URL*.

## Scripts

| Comando | Acción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build |
| `npm run typecheck` | Revisión de tipos |

## Proceso de desarrollo

Consulta [`VIBE_CODING.md`](./VIBE_CODING.md) para ver los prompts, iteraciones y decisiones técnicas.
