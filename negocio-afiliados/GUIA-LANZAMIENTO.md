# Guía de lanzamiento — Domótica Fácil (Amazon Afiliados)

Pasos para poner el negocio en marcha, en orden. Marca cada casilla al completarla. Tiempo total estimado: una tarde (sin contar la aprobación de Amazon).

---

## Resumen del recorrido

```
1. Dominio  →  2. Hosting  →  3. Subir la web  →  4. Alta en Amazon Associates
   →  5. Poner tu tag + ASINs  →  6. Completar legales + cookies  →  7. Search Console
   →  8. Difusión  →  9. Conseguir 3 ventas  →  10. PA-API + automatización n8n
```

Hay **dos fases**: **arranque** (sin PA-API, a por las 3 primeras ventas) y **automática** (con PA-API, ya desatendido).

---

## 1. Registrar el dominio

- [ ] Elige un dominio corto y con sentido (ideas: `casainteligentefacil.es`, `domoticafacil.es`, `tuhogarinteligente.es`).
- [ ] Regístralo en un registrador (Namecheap, Dinahosting, IONOS, Cloudflare Registrar...). Coste: ~10-15 €/año.
- [ ] Apunta el dominio que elijas: lo necesitarás en el paso 2 y 4.

## 2. Elegir hosting (gratis y suficiente: es una web estática)

La web son archivos HTML/CSS/JS, así que no necesitas servidor ni base de datos. Opciones gratuitas recomendadas:

| Hosting | Por qué | Cómo |
|---------|---------|------|
| **Cloudflare Pages** | Gratis, rápido, HTTPS y dominio fácil | Conecta el repo o sube la carpeta `web/` |
| **Netlify** | Arrastrar y soltar la carpeta `web/` | Drag & drop en netlify.com |
| **Vercel** | Igual de simple | Importa el repo |
| **GitHub Pages** | Si ya usas GitHub | Activa Pages sobre la carpeta |

- [ ] Crea cuenta en el que prefieras.
- [ ] Conecta tu dominio (todos tienen guía de "dominio personalizado") y activa **HTTPS**.

## 3. Subir la web

- [ ] Sube **el contenido de la carpeta `negocio-afiliados/web/`** (que el `index.html` quede en la raíz del sitio).
- [ ] Comprueba que se ve: `https://TU-DOMINIO.es` debe abrir la home.
- [ ] Revisa que `https://TU-DOMINIO.es/robots.txt` y `/sitemap.xml` cargan.

> Importante: sube el contenido **de dentro** de `web/`, no la carpeta `web` entera, para que el index quede en la raíz.

## 4. Alta en Amazon Associates

- [ ] Entra en `https://afiliados.amazon.es` y regístrate con tu cuenta de Amazon.
- [ ] Añade **tu dominio** (ya publicado) como sitio web, y tus redes si las tienes.
- [ ] Completa el perfil (cómo generas tráfico, temática: hogar/tecnología).
- [ ] Te darán tu **Associate Tag / Tracking ID** (ej: `tunombre-21`). **Apúntalo.**
- [ ] ⏳ Recuerda: tienes **180 días para 3 ventas cualificadas** o cierran la cuenta.

## 5. Poner tu tag y los ASIN reales

- [ ] Abre `web/assets/afiliados.js` y cambia:
  ```js
  const TAG_AFILIADO = "PENDIENTE-21";   // -> pon tu tag real, ej: tunombre-21
  ```
  Con esto, **todos los botones de toda la web** apuntan a tu cuenta.
- [ ] Sustituye cada `data-asin="ASIN_*"` por el **ASIN real** del producto (lo ves en la URL de Amazon: `/dp/XXXXXXXXXX`). La lista de claves está en `web/` (busca `ASIN_`) y en `n8n/products.json`.
- [ ] Vuelve a subir los archivos cambiados.
- [ ] Haz clic en un botón y confirma que te lleva a Amazon **con tu tag** en la URL (`?tag=tunombre-21`).

## 6. Completar legales y cookies (obligatorio para Amazon y RGPD)

- [ ] En `aviso-legal.html`, `politica-privacidad.html` y `aviso-afiliados.html`, sustituye los `[CORCHETES]` por tus datos reales (nombre/razón social, NIF, email, dominio) y **quita el aviso amarillo de "plantilla"**.
- [ ] Revisa los textos (idealmente con un profesional).
- [ ] Añade un **banner de cookies** (Cookiebot, Complianz, Iubenda o uno propio) si vas a usar analítica. La política ya menciona las cookies de Amazon y de analítica.
- [ ] Verifica que la **divulgación de afiliado** se ve en todas las páginas (ya está en la barra superior y el footer).

## 7. Search Console y SEO inicial

- [ ] Da de alta el dominio en **Google Search Console** y verifica la propiedad.
- [ ] Envía el **sitemap**: `https://TU-DOMINIO.es/sitemap.xml`.
- [ ] (Opcional) Crea la imagen **`assets/og-default.png`** (1200×630). Tienes el diseño base en `assets/og-default.svg`: ábrelo y expórtalo a PNG. Mejora cómo se ve al compartir en redes.
- [ ] (Opcional) Sustituye los placeholders de imagen por **fotos reales de producto** del fabricante y añade `loading="lazy"` a las `<img>`.

## 8. Difusión

- [ ] Comparte los artículos en redes (puedes usar el copy que genera el workflow `n8n/workflow-distribucion-redes.json`).
- [ ] Recuerda: el **link de afiliado va dentro de la web**, nunca directo en el post ni en emails (regla de Amazon).
- [ ] (Opcional) Si haces Meta Ads, lleva el tráfico **a tu web**, no a Amazon.

## 9. Conseguir las 3 primeras ventas (fase arranque)

- [ ] Prioriza las páginas con más intención de compra (las comparativas de robot aspirador).
- [ ] Comprueba que el botón "Ver precio en Amazon" funciona en todas.
- [ ] (Opcional) Activa ya el workflow `n8n/workflow-monitorizacion-web.json` para que te avise si la web se cae.

## 10. PA-API y automatización total (fase automática)

Cuando Amazon te active la **Product Advertising API** (tras las 3 ventas):

- [ ] Saca tus claves en Associates → *Tools → Product Advertising API*.
- [ ] Mételas como variables de entorno en n8n: `PAAPI_ACCESS_KEY`, `PAAPI_SECRET_KEY`, `PAAPI_PARTNER_TAG`.
- [ ] Pon `paApi.activa = true` en `afiliados.config.json`.
- [ ] Importa y activa `n8n/workflow-refresco-precios-paapi.json` (precios/disponibilidad reales al día).
- [ ] Conecta tus redes en `n8n/workflow-distribucion-redes.json` para publicación automática.
- [ ] A partir de aquí, muestra precios reales en la web (vía la PA-API) en lugar de "Ver precio en Amazon".

---

## Checklist de cumplimiento (repásalo antes de publicar)

- [ ] Divulgación de afiliado visible en todas las páginas ✅ (ya incluida)
- [ ] Aviso legal + privacidad/cookies completados y publicados
- [ ] Ningún precio inventado: en arranque, "Ver precio en Amazon" sin cifra ✅
- [ ] Todos los enlaces llevan tu Associate Tag
- [ ] Ningún enlace de afiliado en emails/PDFs/offline
- [ ] Reseñas y datos verificados con la ficha real de Amazon (quita los avisos "verifica…")
- [ ] Tráfico de pago va a tu web, nunca directo a Amazon

---

## Mapa de archivos del proyecto

```
negocio-afiliados/
├── GUIA-LANZAMIENTO.md          ← esta guía
├── afiliados.config.json        ← configuración del negocio (tag, PA-API, nicho)
├── plan-contenido.md            ← clusters, keywords y backlog
├── web/                         ← LA WEB (sube el contenido de esta carpeta)
│   ├── index.html               ← home
│   ├── *.html                   ← comparativas, guías y reseñas
│   ├── assets/ (styles.css, afiliados.js, og-default.svg)
│   ├── sitemap.xml, robots.txt
│   └── dashboard-afiliados.html ← panel interno (no público)
└── n8n/                         ← automatización (importar en tu n8n)
    ├── README.md
    ├── workflow-monitorizacion-web.json
    ├── workflow-refresco-precios-paapi.json
    ├── workflow-distribucion-redes.json
    └── products.json
```
