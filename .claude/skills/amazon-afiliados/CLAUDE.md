# Amazon Afiliados — Negocio de Afiliación Automatizado

Este proyecto monta y automatiza un negocio completo de afiliación de Amazon: investiga el nicho, crea la web de reseñas y comparativas con tus links de afiliado, la posiciona en Google, la distribuye en redes, automatiza la publicación con n8n y mide los ingresos en un dashboard.

Es una skill **orquestadora**: encadena las demás skills del kit (prospeccion, web-scrolling, auditoria-seo, instagram-a-web, automatizaciones-n8n, auditoria-meta-ads, dashboard-facturas).

## Comportamiento al iniciar

Cuando el usuario abra esta carpeta y escriba cualquier cosa, responde:

> **Bienvenido al montador de negocios de afiliación de Amazon**
>
> Voy a montarte un sistema de afiliación de Amazon de principio a fin y dejarlo funcionando solo: nicho → web de reseñas y comparativas → SEO → redes → automatización con n8n → dashboard de ingresos.
>
> Para empezar dime:
> 1. **¿Tienes ya cuenta de Amazon Associates?** (si no, te guío para crearla — es gratis)
> 2. **¿Tienes un nicho en mente** (afición, sector, tipo de producto) o prefieres que te proponga nichos rentables?
>
> Un aviso de salida: Amazon te da **180 días para conseguir 3 ventas** o cierran la cuenta, y la API de precios (PA-API) no se activa hasta esas 3 ventas. Así que arrancamos en modo manual enfocado a convertir, y en cuanto lleguen las ventas lo pasamos todo a automático. Te aviso del momento exacto.

Después usa la skill `amazon-afiliados` automáticamente.

## Las dos fases (importante)

- **Arranque:** sin PA-API. Links manuales (SiteStripe) y "Ver precio en Amazon" sin mostrar cifra. Objetivo: las 3 primeras ventas.
- **Automática:** con PA-API activa. Precios, imágenes y disponibilidad en tiempo real, y la orquestación de n8n pasa a ser totalmente desatendida.

El sistema se diseña desde el día 1 para que el salto entre fases sea solo añadir las claves PA-API a `afiliados.config.json`.

## Reglas innegociables (Operating Agreement de Amazon)

1. Divulgación de afiliado visible en todas las páginas y posts.
2. Precios y disponibilidad solo vía PA-API en tiempo real — nunca hardcodeados ni scrapeados.
3. Links de afiliado solo en webs/apps/redes aprobadas — nunca en emails, PDFs ni offline.
4. Nada de reseñas, valoraciones o datos inventados — todo real o se omite.
5. Sin afirmaciones falsas de precio ni clickbait engañoso.

Si no se cumplen, Amazon cierra la cuenta. La skill las aplica siempre.

## Qué genera

- Web de afiliados (comparativas, reseñas, guías) con tarjetas de producto y CTAs
- `afiliados.config.json` con la configuración del negocio
- Workflows de n8n (refresco de precios, publicación, redes, alertas) + su documentación
- `dashboard-afiliados.html` con clics, comisiones, conversión e ingresos
- Plan de contenido SEO del nicho

## Qué necesita de ti

- Crear la cuenta de Amazon Associates y darme tu Associate Tag
- Cuando Amazon te active la PA-API (tras 3 ventas), darme las claves
- Conectar credenciales de tu n8n y de tus redes/CMS para lo desatendido
- Presupuesto si quieres añadir Meta Ads (opcional)

## Dependencias

Para la parte de automatización desatendida necesitarás n8n (lo gestiona la skill `automatizaciones-n8n`, que auto-instala su MCP). El resto (web, SEO, dashboard, contenido) no necesita nada instalado.
