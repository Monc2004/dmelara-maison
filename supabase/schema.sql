-- ============================================================
-- D'MELARA MAISON · Script de base de datos para Supabase
-- Pegar completo en: Supabase Dashboard > SQL Editor > New query > Run
-- Es seguro ejecutarlo más de una vez (idempotente).
-- ============================================================


-- ------------------------------------------------------------
-- 1. TABLA DE PERFUMES
-- ------------------------------------------------------------
create table if not exists public.perfumes (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  nombre      text not null,
  marca       text not null,
  genero      text not null check (genero in ('dama', 'hombre', 'unisex')),
  linea       text not null check (linea in ('disenador', 'nicho')),
  precio      numeric(10,2) not null check (precio >= 0),
  imagen      text,
  descripcion text,
  destacado   boolean not null default false,
  created_at  timestamptz not null default now()
);

create index if not exists perfumes_genero_idx on public.perfumes (genero);
create index if not exists perfumes_linea_idx  on public.perfumes (linea);
create index if not exists perfumes_precio_idx on public.perfumes (precio);


-- ------------------------------------------------------------
-- 2. PERFILES DE USUARIO (se crean solos al registrarse)
-- ------------------------------------------------------------
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  nombre     text,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, nombre)
  values (new.id, new.raw_user_meta_data ->> 'nombre')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ------------------------------------------------------------
-- 3. FAVORITOS (relación usuario <-> perfume)
-- ------------------------------------------------------------
create table if not exists public.favoritos (
  user_id    uuid not null references auth.users (id) on delete cascade,
  perfume_id uuid not null references public.perfumes (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, perfume_id)
);


-- ------------------------------------------------------------
-- 4. ROW LEVEL SECURITY (RLS)
-- ------------------------------------------------------------
alter table public.perfumes  enable row level security;
alter table public.profiles  enable row level security;
alter table public.favoritos enable row level security;

-- Perfumes: lectura pública (el catálogo lo ve cualquiera)
drop policy if exists "perfumes_select_publico" on public.perfumes;
create policy "perfumes_select_publico"
  on public.perfumes for select
  to anon, authenticated
  using (true);

-- Perfiles: cada usuario ve y edita solo el suyo
drop policy if exists "profiles_select_propio" on public.profiles;
create policy "profiles_select_propio"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "profiles_update_propio" on public.profiles;
create policy "profiles_update_propio"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Favoritos: cada usuario gestiona solo los suyos
drop policy if exists "favoritos_select_propios" on public.favoritos;
create policy "favoritos_select_propios"
  on public.favoritos for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "favoritos_insert_propios" on public.favoritos;
create policy "favoritos_insert_propios"
  on public.favoritos for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "favoritos_delete_propios" on public.favoritos;
create policy "favoritos_delete_propios"
  on public.favoritos for delete
  to authenticated
  using (auth.uid() = user_id);


-- ------------------------------------------------------------
-- 5. DATOS SEMILLA: 40 PERFUMES
--    (precios referenciales en USD; ajústalos a tu inventario)
-- ------------------------------------------------------------
insert into public.perfumes (slug, nombre, marca, genero, linea, precio, destacado) values
  -- DAMA (13)
  ('coco-mademoiselle',   'Coco Mademoiselle',        'Chanel',               'dama',   'disenador', 135.00, true),
  ('jadore',              'J''adore',                 'Dior',                 'dama',   'disenador', 140.00, false),
  ('libre',               'Libre',                    'Yves Saint Laurent',   'dama',   'disenador', 130.00, false),
  ('la-vie-est-belle',    'La Vie Est Belle',         'Lancôme',              'dama',   'disenador', 120.00, false),
  ('good-girl',           'Good Girl',                'Carolina Herrera',     'dama',   'disenador', 115.00, false),
  ('bloom',               'Bloom',                    'Gucci',                'dama',   'disenador', 110.00, false),
  ('born-in-roma-donna',  'Born in Roma Donna',       'Valentino',            'dama',   'disenador', 125.00, false),
  ('delina',              'Delina',                   'Parfums de Marly',     'dama',   'nicho',     330.00, true),
  ('love-dont-be-shy',    'Love, Don''t Be Shy',      'Kilian',               'dama',   'nicho',     295.00, false),
  ('portrait-of-a-lady',  'Portrait of a Lady',       'Frédéric Malle',       'dama',   'nicho',     280.00, false),
  ('roses-vanille',       'Roses Vanille',            'Mancera',              'dama',   'nicho',     165.00, false),
  ('roses-musk',          'Roses Musk',               'Montale',              'dama',   'nicho',     150.00, false),
  ('velvet-orchid',       'Velvet Orchid',            'Tom Ford',             'dama',   'nicho',     250.00, false),

  -- HOMBRE (13)
  ('sauvage',             'Sauvage',                  'Dior',                 'hombre', 'disenador', 125.00, true),
  ('bleu-de-chanel',      'Bleu de Chanel',           'Chanel',               'hombre', 'disenador', 140.00, false),
  ('1-million',           '1 Million',                'Paco Rabanne',         'hombre', 'disenador', 100.00, false),
  ('eros',                'Eros',                     'Versace',              'hombre', 'disenador',  95.00, false),
  ('acqua-di-gio-profondo','Acqua di Giò Profondo',   'Giorgio Armani',       'hombre', 'disenador', 110.00, false),
  ('lhomme',              'L''Homme',                 'Prada',                'hombre', 'disenador', 115.00, false),
  ('le-male-elixir',      'Le Male Elixir',           'Jean Paul Gaultier',   'hombre', 'disenador', 130.00, false),
  ('explorer',            'Explorer',                 'Montblanc',            'hombre', 'disenador',  90.00, false),
  ('the-most-wanted',     'The Most Wanted',          'Azzaro',               'hombre', 'disenador', 105.00, false),
  ('aventus',             'Aventus',                  'Creed',                'hombre', 'nicho',     365.00, true),
  ('herod',               'Herod',                    'Parfums de Marly',     'hombre', 'nicho',     320.00, false),
  ('naxos',               'Naxos',                    'Xerjoff',              'hombre', 'nicho',     290.00, false),
  ('interlude-man',       'Interlude Man',            'Amouage',              'hombre', 'nicho',     310.00, false),

  -- UNISEX (14)
  ('baccarat-rouge-540',  'Baccarat Rouge 540',       'Maison Francis Kurkdjian', 'unisex', 'nicho',   325.00, true),
  ('oud-wood',            'Oud Wood',                 'Tom Ford',             'unisex', 'nicho',     260.00, false),
  ('gypsy-water',         'Gypsy Water',              'Byredo',               'unisex', 'nicho',     235.00, false),
  ('santal-33',           'Santal 33',                'Le Labo',              'unisex', 'nicho',     220.00, true),
  ('by-the-fireplace',    'Replica By the Fireplace', 'Maison Margiela',      'unisex', 'disenador', 150.00, false),
  ('side-effect',         'Side Effect',              'Initio',               'unisex', 'nicho',     300.00, false),
  ('erba-pura',           'Erba Pura',                'Xerjoff',              'unisex', 'nicho',     270.00, false),
  ('hacivat',             'Hacivat',                  'Nishane',              'unisex', 'nicho',     210.00, false),
  ('tam-dao',             'Tam Dao',                  'Diptyque',             'unisex', 'nicho',     170.00, false),
  ('wood-sage-sea-salt',  'Wood Sage & Sea Salt',     'Jo Malone',            'unisex', 'disenador', 160.00, false),
  ('tobacco-vanille',     'Tobacco Vanille',          'Tom Ford',             'unisex', 'nicho',     270.00, false),
  ('molecule-01',         'Molecule 01',              'Escentric Molecules',  'unisex', 'nicho',     150.00, false),
  ('oud-maracuja',        'Oud Maracujá',             'Maison Crivelli',      'unisex', 'nicho',     280.00, false),
  ('silver-mountain-water','Silver Mountain Water',   'Creed',                'unisex', 'nicho',     345.00, false)
on conflict (slug) do nothing;

-- Ruta de imagen local: coloca cada archivo en public/perfumes/<slug>.jpg
update public.perfumes
set imagen = '/perfumes/' || slug || '.jpg'
where imagen is null;


-- ------------------------------------------------------------
-- 6. VERIFICACIÓN (opcional): debe devolver 40 en total
--    dama = 13 · hombre = 13 · unisex = 14
-- ------------------------------------------------------------
-- select genero, count(*) from public.perfumes group by genero;
-- select count(*) from public.perfumes;
