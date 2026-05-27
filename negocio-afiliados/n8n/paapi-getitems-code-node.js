// =============================================================================
//  PA-API 5.0 · GetItems con firma AWS SigV4  (nodo "Code" de n8n)
//  Modo: "Run Once for All Items".
//  Trae precio, disponibilidad, título e imagen reales de Amazon.
//
//  REQUISITOS (fase automática, tras tus 3 primeras ventas):
//   - Define estas variables de entorno en n8n:
//       PAAPI_ACCESS_KEY, PAAPI_SECRET_KEY, PAAPI_PARTNER_TAG
//     (el acceso a $env requiere que N8N_BLOCK_ENV_ACCESS_IN_NODE no esté activado)
//   - El nodo anterior debe entregar items con un campo `asin` (uno por producto).
//
//  Mercado configurado: Amazon España. Para otro país cambia HOST/REGION/MARKETPLACE.
// =============================================================================
const crypto = require('crypto');

const ACCESS_KEY  = $env.PAAPI_ACCESS_KEY;
const SECRET_KEY  = $env.PAAPI_SECRET_KEY;
const PARTNER_TAG = $env.PAAPI_PARTNER_TAG;

const HOST        = 'webservices.amazon.es';
const REGION      = 'eu-west-1';
const MARKETPLACE = 'www.amazon.es';
const SERVICE     = 'ProductAdvertisingAPI';
const PATH        = '/paapi5/getitems';
const TARGET      = 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems';

const hmac      = (key, data) => crypto.createHmac('sha256', key).update(data, 'utf8').digest();
const sha256hex = (data) => crypto.createHash('sha256').update(data, 'utf8').digest('hex');

// 1) ASINs reales (descarta los PENDIENTE)
const asins = $input.all()
  .map(i => i.json.asin)
  .filter(a => a && a !== 'PENDIENTE');

if (asins.length === 0) {
  return [{ json: { aviso: 'No hay ASINs reales todavía. Rellena products.json y vuelve a ejecutar.' } }];
}

// 2) Payload GetItems (máx. 10 ASIN por llamada)
const payload = JSON.stringify({
  ItemIds: asins.slice(0, 10),
  PartnerTag: PARTNER_TAG,
  PartnerType: 'Associates',
  Marketplace: MARKETPLACE,
  Resources: [
    'ItemInfo.Title',
    'Offers.Listings.Price',
    'Offers.Listings.Availability.Message',
    'Images.Primary.Medium'
  ]
});

// 3) Firma AWS SigV4
const now       = new Date();
const amzDate   = now.toISOString().replace(/[:-]|\.\d{3}/g, ''); // YYYYMMDDTHHMMSSZ
const dateStamp = amzDate.slice(0, 8);

const canonicalHeaders =
  `content-encoding:amz-1.0\n` +
  `content-type:application/json; charset=utf-8\n` +
  `host:${HOST}\n` +
  `x-amz-date:${amzDate}\n` +
  `x-amz-target:${TARGET}\n`;
const signedHeaders = 'content-encoding;content-type;host;x-amz-date;x-amz-target';
const payloadHash   = sha256hex(payload);
const canonicalRequest = ['POST', PATH, '', canonicalHeaders, signedHeaders, payloadHash].join('\n');

const algorithm       = 'AWS4-HMAC-SHA256';
const credentialScope = `${dateStamp}/${REGION}/${SERVICE}/aws4_request`;
const stringToSign    = [algorithm, amzDate, credentialScope, sha256hex(canonicalRequest)].join('\n');

const kDate    = hmac('AWS4' + SECRET_KEY, dateStamp);
const kRegion  = hmac(kDate, REGION);
const kService = hmac(kRegion, SERVICE);
const kSigning = hmac(kService, 'aws4_request');
const signature = crypto.createHmac('sha256', kSigning).update(stringToSign, 'utf8').digest('hex');

const authorization = `${algorithm} Credential=${ACCESS_KEY}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

// 4) Llamada a la PA-API
const res = await this.helpers.httpRequest({
  method: 'POST',
  url: `https://${HOST}${PATH}`,
  headers: {
    'content-encoding': 'amz-1.0',
    'content-type': 'application/json; charset=utf-8',
    'host': HOST,
    'x-amz-date': amzDate,
    'x-amz-target': TARGET,
    'Authorization': authorization
  },
  body: payload,
  json: false
});
const data = typeof res === 'string' ? JSON.parse(res) : res;

// 5) Normaliza la respuesta -> un item por producto
const encontrados = (data.ItemsResult && data.ItemsResult.Items) || [];
const out = encontrados.map(it => {
  const listing = it.Offers && it.Offers.Listings && it.Offers.Listings[0];
  return { json: {
    asin: it.ASIN,
    titulo: it.ItemInfo?.Title?.DisplayValue || null,
    precio: listing?.Price?.DisplayAmount || null,
    disponibilidad: listing?.Availability?.Message || null,
    imagen: it.Images?.Primary?.Medium?.URL || null,
    agotado: !listing || !listing.Price,
    actualizado: new Date().toISOString()
  }};
});

// Errores devueltos por la API (ASIN inválido, throttling, etc.)
if (data.Errors) {
  out.push({ json: { errores: data.Errors } });
}

return out;
