# Proceso de Vibe Coding: D'Melara Maison

> **Plantilla:** completa cada sección con TU proceso real (prompts exactos, errores que te dio la IA, cómo los resolviste). Los campos entre `[corchetes]` son para ti.

- **Herramienta(s) de IA usada(s):** [Claude code]
- **Fecha de inicio:** [ 17/11/2026]  ·  **Fecha de entrega:** [22/11/2026 ]

---

## 1. Concepción del proyecto

Tienda de perfumes de diseñador y nicho con catálogo de 40 productos (dama, hombre, unisex), registro, inicio de sesión y favoritos.

**Decisión:** usar Supabase para Auth y base de datos (cubre registro/login y servicio serverless sin montar un backend propio).

## 2. Prompts principales

### Prompt 1: Arquitectura inicial
```
Actúa como desarrollador senior de Next.js 16. Crea la base de una tienda de perfumes
llamada D'Melara Maison con App Router, TypeScript y Tailwind. Rutas: /, /catalogo,
/catalogo/[slug], /login, /registro, /perfil (protegida con proxy.ts). Usa Supabase Auth
con @supabase/ssr. El listado es Server Component y los filtros son un Client Component
con useState/useEffect. Crea un Route Handler en /api/perfumes. Incluye loading.tsx,
error.tsx y diseño mobile-first con estética de lujo (negro, dorado y crema).
```
**Resultado:** [El 90% de la interfaz y funcionalidad]

### Prompt 2: [Correccion en diseño]
```
Quisiera que llevara una mejor nivelacion entre el marging y padding de cada una de las tarjetas a modo que el diseño luzca profesiona
y mas limpio.
```

**Resultado:** [La correccion esperada en los margenes y rellenos del diseño para que se vea mas profesional ]

## 3. Iteraciones

| # | Qué pedí | Qué generó la IA | Problema encontrado | Cómo lo resolví |
|---|---|---|---|---|
| 1 | Estructura base | [ ] | [ ] | [ ] |
| 2 | Catálogo y filtros | [ ] | [ ] | [ ] |
| 3 | Autenticación | [ ] | [ ] | [ ] |
| 4 | Favoritos y RLS | [ ] | [ ] | [ ] |
| 5 | Pulido responsive | [ ] | [ ] | [ ] |

## 4. Decisiones técnicas

- **`proxy.ts` en lugar de `middleware.ts`:** Next.js 16 renombró el archivo; protege `/perfil` y refresca la sesión de Supabase.
- **`params` y `searchParams` como `Promise`:** en Next.js 15+ se leen con `await`.
- **Filtros en la URL:** el Client Component actualiza los query params (con debounce) y el Server Component vuelve a consultar los datos; así los filtros son compartibles y el listado se renderiza en el servidor.
- **RLS en Supabase:** catálogo público; perfiles y favoritos solo accesibles por su dueño.
- **Modo demo:** sin variables de entorno, el catálogo usa datos locales para poder desarrollar sin conexión.
- **Imágenes locales** en `public/perfumes/` con `next/image` y placeholder si falta el archivo.
- [Agrega tus propias decisiones]

## 5. Desafíos y cómo los resolví con la IA

1. **[Desafío, p. ej. error de hidratación / código de Next.js desactualizado]**
   - Síntoma: [No tuve ningun problema con Claude ya que genero lo esperado]
   - Prompt que usé para depurar: [Todo salio muy bien]
   - Solución: [ ]


## 6. Validación y revisión del código generado

- [Si] Revisé que cada componente tenga `"use client"` solo donde hace falta
- [ ] Probé registro, login, logout y favoritos
- [ ] Probé la app en móvil y escritorio
- [ ] `npm run build` pasa sin errores
- [ ] Verifiqué que `.env.local` no está en el repositorio

## 7. Aprendizajes

Tuve una muy buena sinergia trabajando con Claude ya que pude establecer unos muy buenos limites entre las cosas que esperaba con cada prompt
y tambien a optimizar mis scripts ya que en un script podemos sacar al menos el 75% de un proyecto como este.
