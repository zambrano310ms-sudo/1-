# Instrucciones — Amazon Afiliados Automatizado

Monta un negocio de afiliación de Amazon de principio a fin y lo deja funcionando solo. Esta skill orquesta a las demás del kit, así que conviene tenerlas todas instaladas.

## Requisitos

- **Claude Code** abierto en esta carpeta.
- **Una cuenta de Amazon Associates** (gratis — te guío para crearla si no la tienes).
- Para la automatización desatendida: una instancia de **n8n** (la skill `automatizaciones-n8n` instala su MCP automáticamente; n8n necesita Node.js).
- Opcional: presupuesto para **Meta Ads** si quieres añadir tráfico de pago.
- Las otras skills del kit instaladas (prospeccion, web-scrolling, auditoria-seo, instagram-a-web, automatizaciones-n8n, auditoria-meta-ads, dashboard-facturas).

## Las dos fases

1. **Arranque** — sin PA-API. Links manuales (SiteStripe) y "Ver precio en Amazon" sin cifra. Meta: las 3 primeras ventas en 180 días.
2. **Automática** — con la PA-API activa (Amazon la desbloquea tras esas 3 ventas). Precios e imágenes en tiempo real y orquestación n8n totalmente desatendida.

El sistema se diseña para que el salto sea solo añadir las claves PA-API a `afiliados.config.json`.

## Pasos

1. Abre esta carpeta en Claude Code.
2. Escribe algo como *"montamos el negocio de afiliados de Amazon"* o *"quiero ganar dinero con Amazon"*.
3. Claude te guiará para:
   - Crear/conectar tu cuenta de Amazon Associates y guardar tu Associate Tag.
   - Elegir un nicho rentable (o te propone opciones) e investigar productos y keywords.
   - Generar la web de reseñas/comparativas con tus links de afiliado y la divulgación legal.
   - Optimizar el SEO de cada página.
   - Crear las piezas para redes y, si quieres, las campañas de Meta Ads.
   - Montar los workflows de n8n (refresco de precios, publicación, redes, alertas).
   - Generar el dashboard de ingresos.
4. Sigue las acciones manuales que Claude te indique (crear cuenta, pedir PA-API tras las 3 ventas, conectar credenciales en n8n).

## Qué tienes que hacer tú (la automatización no puede hacerlo sola)

- Crear la cuenta de Amazon Associates y darle tu Associate Tag.
- Solicitar y entregar las claves de la PA-API cuando Amazon te la active (tras 3 ventas).
- Conectar las credenciales de tu n8n, tu CMS/web y tus redes para lo desatendido.
- Fondear las campañas de Meta Ads si decides usarlas.

## Cumplimiento (importante)

Esta skill aplica siempre el Operating Agreement de Amazon:
- Divulgación de afiliado visible en todas partes.
- Precios solo vía PA-API en tiempo real (en arranque, sin cifra).
- Links de afiliado solo en web/redes aprobadas, nunca en emails ni offline.
- Sin reseñas ni datos inventados.

Saltarse esto implica el cierre de la cuenta de Amazon.

## Estructura de archivos

```
kit-amazon-afiliados/
├── CLAUDE.md                         ← Mensaje de bienvenida + qué hace
├── INSTRUCCIONES.md                  ← Esta guía
└── .claude/
    └── skills/
        └── amazon-afiliados/
            └── SKILL.md              ← La skill orquestadora
```

Durante el uso se generarán además: la web de afiliados, `afiliados.config.json`, los workflows de n8n (JSON + documentación HTML), `dashboard-afiliados.html` y el plan de contenido del nicho.
