# Automatización n8n — Negocio de Afiliados

Workflows para mantener el negocio funcionando solo. Están en formato **JSON importable** (modo offline) porque aún no hay instancia de n8n conectada. Cuando conectes tu n8n, se pueden crear directamente con la skill `automatizaciones-n8n`.

## Archivos

| Archivo | Qué hace | ¿Funciona ya? |
|---------|----------|---------------|
| `workflow-monitorizacion-web.json` | Comprueba cada 30 min que la web responde; si está caída, te avisa por Telegram | ✅ Sí (solo necesita la URL + bot de Telegram) |
| `workflow-refresco-precios-paapi.json` | Cada 24 h consulta precios/disponibilidad reales en Amazon vía PA-API y avisa de productos agotados | ⏳ Fase automática (necesita PA-API, tras tus 3 ventas) |
| `workflow-distribucion-redes.json` | Cada semana genera el copy de un artículo para Instagram, Facebook y X, listo para publicar | ⏳ Necesita conectar tus redes (Buffer/Meta/X) |
| `paapi-getitems-code-node.js` | Código del nodo que firma la petición a la PA-API (SigV4). Es el que va dentro del workflow de precios | — |
| `products.json` | Lista de ASINs del sitio (la fuente de verdad que lee el refresco) | — |

## Cómo importar un workflow en n8n

1. Abre tu n8n → **Workflows** → menú **⋯** → **Import from File**.
2. Selecciona el `.json`.
3. Abre cada nodo marcado y rellena lo que ponga `REEMPLAZAR` / `TU_...`.
4. Configura las **credenciales** (ver abajo).
5. Prueba con **Execute Workflow** antes de activarlo.
6. Cuando funcione, **Activa** el workflow (toggle arriba a la derecha).

## Credenciales / variables necesarias

### Monitorización web
- **URL** de tu web (nodo "GET sitio web").
- **Telegram**: crea un bot con @BotFather, añade la credencial *Telegram API* en n8n y pon tu `chat_id` en el nodo de alerta.
  - (Alternativa: cambia el nodo Telegram por **Send Email** si prefieres avisos por correo.)

### Refresco de precios PA-API  (solo fase automática)
Define estas **variables de entorno** en tu n8n (no las escribas en el nodo):
```
PAAPI_ACCESS_KEY=...
PAAPI_SECRET_KEY=...
PAAPI_PARTNER_TAG=tunombre-21
```
- Las claves se obtienen en el panel de Amazon Associates → *Tools → Product Advertising API*, **tras conseguir 3 ventas**.
- El nodo Code necesita poder leer `$env` (que `N8N_BLOCK_ENV_ACCESS_IN_NODE` NO esté activado en tu n8n).
- Rellena los **ASIN reales** en el nodo "Cargar productos" (y en `products.json`).

## Arquitectura completa (hoja de ruta)

```
[Schedule] → [GET web] → [¿caída?] → Telegram                 (monitorización · activo ya)

[Schedule 24h] → [Cargar productos] → [PA-API GetItems SigV4]
                                          ├─→ Guardar precios.json (→ la web muestra precio real)
                                          └─→ [¿agotado?] → Telegram   (refresco de precios · fase auto)
```

El workflow de **distribución en redes** ya genera el copy por plataforma; solo falta conectar tu cuenta (Buffer, Meta Graph API o X) en el último nodo para que publique solo.

Workflow previsto para más adelante:
- **Publicación de contenido**: genera el siguiente artículo del backlog, pasa la auditoría SEO y lo publica en la web.

> Nota: el "Guardar precios.json" es un placeholder porque persistir el archivo depende de tu hosting (FTP/SFTP, API del CMS, commit a Git, etc.). Cuando elijas hosting, sustituimos ese nodo por el de tu plataforma. En fase de arranque no se muestran precios, así que este workflow se activa al pasar a fase automática.

## Aviso

Los JSON están escritos para versiones recientes de n8n. Si tu instancia es más antigua, puede que algún `typeVersion` cambie al importar: abre el nodo, vuelve a seleccionar el tipo y guarda. Con la skill `automatizaciones-n8n` conectada a tu n8n se pueden validar y crear automáticamente.
