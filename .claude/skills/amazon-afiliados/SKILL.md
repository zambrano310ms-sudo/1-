---
name: amazon-afiliados
description: "Monta y automatiza un negocio completo de afiliación de Amazon de principio a fin: investiga el nicho, crea la web de reseñas y comparativas con links de afiliado, la optimiza para SEO, distribuye en redes, orquesta la publicación desatendida con n8n y mide los ingresos en un dashboard. Es una skill orquestadora que encadena las demás (prospeccion, web-scrolling, auditoria-seo, instagram-a-web, automatizaciones-n8n, auditoria-meta-ads, dashboard-facturas). Usa esta skill cuando el usuario quiera ganar dinero con Amazon, montar una web de afiliados, automatizar Amazon Associates, crear comparativas de productos, o cualquier variación de un negocio de afiliación automatizado. Triggers: 'monta un negocio de afiliados de amazon', 'automatiza amazon afiliados', 'web de afiliados', 'amazon associates', 'quiero ganar dinero con amazon', 'nichos de afiliación', 'comparativas de productos de amazon', 'reseñas de productos para afiliados', 'programa de afiliados automatizado', 'links de afiliado de amazon', 'negocio de afiliación pasivo'."
---

# Amazon Afiliados — Negocio de Afiliación Automatizado

Montas un negocio de afiliación de Amazon de principio a fin y lo dejas funcionando solo: investigas un nicho rentable, generas la web de reseñas/comparativas con los links de afiliado, la posicionas en Google, la distribuyes en redes, automatizas la publicación con n8n y mides los ingresos en un dashboard.

Esta es una **skill orquestadora**: no reinventa lo que ya saben hacer las otras skills, las encadena. En cada paso, **usa la skill correspondiente** (`prospeccion`, `web-scrolling`, `auditoria-seo`, `instagram-a-web`, `automatizaciones-n8n`, `auditoria-meta-ads`, `dashboard-facturas`) en lugar de duplicar su lógica.

**Regla fundamental: cumplir SIEMPRE el Operating Agreement de Amazon Associates.** Si no se cumple, Amazon cierra la cuenta y se pierde todo. Las reglas innegociables:

1. **Divulgación de afiliado obligatoria** en toda página y publicación ("Como Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables"). Visible, no escondida.
2. **Precios y disponibilidad solo vía PA-API en tiempo real.** Nunca hardcodear precios, ni scrapearlos, ni mostrar precios "cacheados". Si no hay PA-API, no se muestra precio: se enlaza con "Ver precio en Amazon".
3. **Los links de afiliado solo van en webs/apps/redes aprobadas.** Nunca en emails, PDFs, ebooks ni mensajería offline — eso viola el acuerdo.
4. **No inventes reseñas, opiniones, valoraciones ni datos de producto.** Todo sale de fuentes reales (PA-API, reseñas reales, specs del fabricante) o se omite.
5. **Sin afirmaciones falsas** sobre precio ("el más barato"), ni clickbait engañoso, ni incentivar clics.

---

## Arquitectura del sistema (cómo encaja todo)

```
                 ┌─────────────────────────────────────────┐
                 │   Paso 0 · Setup Amazon Associates + tag  │
                 └─────────────────────────────────────────┘
                                    │
   ┌───────────────┐   ┌───────────────────┐   ┌──────────────────┐
   │ 1. Nicho/prod.│ → │ 2. Web reseñas/    │ → │ 3. Motor SEO      │
   │  [prospeccion]│   │  comparativas      │   │  [auditoria-seo]  │
   │               │   │  [web-scrolling]   │   │                   │
   └───────────────┘   └───────────────────┘   └──────────────────┘
                                    │
   ┌──────────────────┐   ┌──────────────────────┐   ┌─────────────────┐
   │ 4. Distribución  │   │ 5. Orquestación      │   │ 6. Dashboard    │
   │ [instagram-a-web]│ ← │  desatendida (cron)  │ → │  ingresos       │
   │ [auditoria-meta] │   │ [automatizaciones-n8n]│   │ [dashboard-fact]│
   └──────────────────┘   └──────────────────────┘   └─────────────────┘
```

Las **dos fases** del negocio (importante por una restricción de Amazon):

- **Fase ARRANQUE** — La PA-API de Amazon **no se desbloquea hasta tener 3 ventas cualificadas** en los primeros 180 días. Hasta entonces se trabaja con **SiteStripe** (los links manuales de Amazon) y "Ver precio en Amazon" sin mostrar cifras. El objetivo de esta fase es conseguir esas 3 ventas.
- **Fase AUTOMÁTICA** — Con la PA-API ya activa, el sistema obtiene precios/imágenes/disponibilidad en tiempo real y la orquestación de n8n pasa a ser totalmente desatendida.

Diséñalo desde el principio para que el salto de una fase a otra sea solo añadir las claves PA-API a la config — sin rehacer nada.

---

## Paso 0 — Setup de Amazon Associates

El usuario no tiene cuenta todavía, así que empieza aquí. **No inventes IDs ni claves**: guíale para obtenerlas y pídeselas.

### 0A. Crear la cuenta de afiliado

Explícale el proceso (no puedes hacerlo por él, requiere sus datos):

> "Para arrancar necesitas una cuenta de Amazon Associates (es gratis):
> 1. Entra en el programa de tu país: `https://afiliados.amazon.es` (o `.com`, `.de`, etc. — elige donde esté tu audiencia).
> 2. Regístrate con tu cuenta de Amazon, añade la URL de la web que vamos a crear y tus redes.
> 3. Te darán un **Associate Tag / Tracking ID** (algo como `tunombre-21`). Ese es el que mete las comisiones en tu bolsillo.
> 4. Importante: Amazon te da **180 días para conseguir 3 ventas**. Si no, cierran la cuenta. Por eso vamos a priorizar contenido que convierta desde el día 1."

Pídele:
- **País del programa** (determina el dominio: amazon.es/.com/.de/.it/.fr/.co.uk...)
- **Associate Tag / Tracking ID** (cuando lo tenga)

Guarda la config del proyecto en `afiliados.config.json`:

```json
{
  "programa": "ES",
  "dominioAmazon": "amazon.es",
  "associateTag": "PENDIENTE",
  "paApi": { "activa": false, "accessKey": "", "secretKey": "", "partnerTag": "" },
  "nicho": "",
  "dominioWeb": ""
}
```

### 0B. PA-API (Product Advertising API)

Explícale el "huevo y la gallina" con honestidad:

> "La PA-API es la que permite mostrar precios e imágenes actualizados de forma automática y 100% legal. **Pero Amazon no te la activa hasta que hagas tus primeras 3 ventas.** Así que arrancamos en modo SiteStripe (links manuales + 'Ver precio en Amazon') y, en cuanto lleguen las ventas, activamos la PA-API y todo pasa a ser automático. Te aviso del momento exacto en que hay que pedirla."

Cuando tenga acceso, las claves están en `https://affiliate-program.amazon.com/assoc_credentials/home`. Las añades a `afiliados.config.json` y pones `paApi.activa = true`.

---

## Paso 1 — Investigar el nicho y los productos

**Usa la skill `prospeccion`** (Firecrawl/WebSearch) para esto. Objetivo: encontrar un nicho rentable y los productos concretos a reseñar.

Pregunta o investiga:
- **¿Tiene ya un nicho/afición/sector en mente?** Si no, propón nichos con buen encaje para afiliación: alta intención de compra, ticket medio-alto, productos que se renuevan, poca estacionalidad.
- Evita nichos prohibidos o sensibles por las políticas de Amazon (salud con claims médicos, etc.).

Para el nicho elegido, investiga de forma real (no inventes):
- **Keywords de intención de compra**: "mejor [producto]", "[producto] vs [producto]", "[producto] opiniones", "[producto] barato", "review [producto]". Agrupa en clusters.
- **Productos concretos** a reseñar/comparar (ASINs si los puedes obtener). Saca specs reales del fabricante y reseñas reales.
- **Competencia**: qué webs de afiliados ya posicionan para esas keywords y qué les falta (huecos de contenido).

Entrega un **plan de contenido**: lista de artículos a crear (comparativas + reseñas individuales + guías), cada uno con su keyword objetivo y los productos/ASINs que incluye.

---

## Paso 2 — Construir la web de afiliados

**Usa la skill `web-scrolling`** como base de diseño, pero adaptada al formato de afiliación (no es una web de negocio normal). Genera la estructura del sitio:

### Tipos de página

1. **Comparativas** (las que más convierten): "Las 5 mejores [producto] de 2026" → tabla comparativa + tarjetas de producto con CTA.
2. **Reseñas individuales**: análisis a fondo de un producto, pros/contras reales, specs, para quién es.
3. **Guías de compra**: "Cómo elegir [producto]" → educan e insertan productos de forma natural.
4. **Home**: agrupa las comparativas destacadas del nicho.

### Tarjeta de producto (componente clave)

Cada producto se muestra en una tarjeta con:
- Imagen (de PA-API si está activa; en arranque, imagen del fabricante o SiteStripe)
- Nombre + specs reales
- Pros/contras reales (no inventados)
- **CTA con el link de afiliado**:
  - **Fase automática (PA-API):** precio + disponibilidad en tiempo real + botón "Ver en Amazon".
  - **Fase arranque (sin PA-API):** botón "Ver precio en Amazon" SIN mostrar cifra (cumplimiento).
- El link siempre lleva el `associateTag`: `https://www.amazon.es/dp/ASIN?tag=tunombre-21`

### Cumplimiento visual obligatorio

- **Banner/aviso de divulgación** de afiliado visible en cabecera o bajo cada CTA.
- Página de **Aviso legal / Política de afiliados** y **Política de privacidad** (cookies).
- Nada de "precio más bajo garantizado" ni precios fuera de PA-API.

### Diseño

Libertad creativa total (como en `web-scrolling`): adapta paleta y tono al nicho. Pero prioriza **conversión y velocidad de carga** sobre efectos pesados — las webs de afiliados viven del SEO y del tráfico móvil. Responsive obligatorio.

Genera el sitio con rutas limpias por artículo (`/comparativa-x/`, `/review-y/`) para que escale.

---

## Paso 3 — Motor de contenido SEO

**Usa la skill `auditoria-seo`** sobre cada página generada y sobre el sitio completo. Objetivo: que las páginas posicionen.

Para cada artículo del plan de contenido:
- Title y meta description optimizados a la keyword objetivo.
- Estructura de encabezados (H1/H2/H3) con las keywords del cluster.
- Schema markup: `Product`, `Review`, `AggregateRating` (solo con datos reales), `FAQPage`, `BreadcrumbList`.
- Enlazado interno entre comparativas ↔ reseñas ↔ guías del mismo cluster.
- `sitemap.xml` y `robots.txt`.
- Velocidad: imágenes optimizadas, lazy-load, CSS/JS mínimos.

Pasa la `auditoria-seo` como control de calidad antes de publicar cada lote y corrige lo que marque.

---

## Paso 4 — Distribución multicanal

El usuario eligió **mix completo**. Monta los canales:

### Redes sociales (orgánico)
**Usa la skill `instagram-a-web`** y su lógica de contenido para generar, a partir de cada artículo, piezas para redes (carruseles de comparativa, reels de "top 5", posts de reseña) con CTA a la web (el link de afiliado va en la web, no directo en el post si la red no lo permite — respeta las reglas de cada plataforma y de Amazon).

### Meta Ads (pago, opcional)
**Usa la skill `auditoria-meta-ads`** para diseñar y revisar campañas que lleven tráfico a las comparativas. Ojo: Amazon prohíbe enviar tráfico de ads directamente a Amazon con tu link; el tráfico de pago va **a tu web**, y desde tu web al link de afiliado.

### Email
**NO** se ponen links de afiliado en emails (viola el acuerdo). El email solo enlaza a la web.

---

## Paso 5 — Orquestación desatendida con n8n

**Usa la skill `automatizaciones-n8n`** para crear el sistema que lo mantiene vivo solo. Diseña estos workflows (créalos en su instancia si la conecta, o genera los JSON importables):

### Workflow A — Refresco de precios/disponibilidad (Fase automática)
- **Trigger:** cron cada X horas.
- Para cada ASIN del sitio, llama a la **PA-API** (`GetItems`) → actualiza precio, disponibilidad e imagen en el dato del sitio.
- Si un producto está agotado/descatalogado → lo marca y avisa para sustituirlo.
- Maneja el rate limit de la PA-API (empieza en 1 req/seg, escala con ventas).

### Workflow B — Generación y publicación de contenido
- **Trigger:** cron (p. ej. 2-3 artículos/semana del plan de contenido).
- Genera el siguiente artículo del backlog (comparativa/reseña/guía), pasa la `auditoria-seo`, lo publica en la web, actualiza el `sitemap.xml`.

### Workflow C — Distribución en redes
- **Trigger:** al publicarse un artículo (o cron).
- Genera las piezas de redes y las programa/publica en los canales conectados.

### Workflow D — Monitorización y alertas
- Caídas de la web, errores de PA-API, productos rotos, picos de tráfico → alerta (Slack/Telegram/email).
- **Error Trigger** global con notificación.

Para cada workflow: nodos nombrados de forma descriptiva, sticky notes explicativas y manejo de errores, tal como exige la skill de n8n. Documenta cada uno en HTML.

> Recuérdale al usuario que lo "totalmente desatendido" depende de: PA-API activa + credenciales de publicación (web/CMS y redes) configuradas en n8n. Mientras falte alguna, ese tramo queda en semi-automático (genera y deja listo para revisar).

---

## Paso 6 — Dashboard de rendimiento

**Adapta la skill `dashboard-facturas`** a métricas de afiliación. Genera `dashboard-afiliados.html` con:

- **Ingresos por comisiones**, clics, pedidos, tasa de conversión, EPC (earnings per click).
- Evolución temporal y desglose por producto/artículo (qué páginas convierten).
- Estado del nicho: progreso hacia las "3 ventas" en fase arranque.

**Honestidad sobre los datos:** Amazon Associates **no ofrece una API limpia de ingresos** en todos los países. Las opciones reales son:
- Importar los **informes descargables** (CSV) del panel de Associates → el dashboard los parsea (igual que `dashboard-facturas` parsea PDFs).
- Combinar con datos de tráfico (Google Analytics/Search Console) y clics propios.

No inventes cifras de ingresos. Si no hay datos aún, muestra el dashboard con la estructura y un aviso de "conecta tus informes de Amazon para ver datos reales".

---

## Paso 7 — Arranque seguro y checklist de cumplimiento

Antes de dar por lanzado, verifica (y enséñale el checklist al usuario):

- [ ] Divulgación de afiliado visible en todas las páginas y publicaciones.
- [ ] Aviso legal + política de privacidad/cookies publicados.
- [ ] Ningún precio fuera de la PA-API (en arranque, "Ver precio en Amazon" sin cifra).
- [ ] Todos los links llevan el `associateTag` correcto.
- [ ] Ningún link de afiliado en emails/PDFs/offline.
- [ ] Reseñas, pros/contras y valoraciones son reales, no inventados.
- [ ] Tráfico de pago va a la web propia, nunca directo a Amazon con el tag.
- [ ] Plan claro para las 3 ventas en 180 días.

---

## Paso 8 — Presentar el resultado

Muestra al usuario:

1. **Qué se ha montado**: nicho elegido, nº de páginas/artículos, canales activados.
2. **Archivos generados**: web, `afiliados.config.json`, workflows de n8n (+ docs), `dashboard-afiliados.html`, plan de contenido.
3. **Fase actual**: arranque (sin PA-API) o automática, y qué falta para pasar a la siguiente.
4. **Qué queda en tus manos** (lo que la automatización no puede hacer sola): crear la cuenta de Associates, conseguir las claves PA-API tras las 3 ventas, conectar credenciales de publicación/redes en n8n, fondear las campañas de ads si las usa.
5. **Siguiente acción concreta** recomendada.
6. Pregunta si quiere ajustar algo o empezar por un workflow/página en concreto.

No muestres precios sugeridos ni consejos de venta.
