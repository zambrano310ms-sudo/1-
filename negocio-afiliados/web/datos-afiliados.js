/* ============================================================
   DATOS DEL DASHBOARD — EJEMPLO (DEMO)
   Sustituye estas cifras por las REALES de tu panel de
   Amazon Associates (Informes → Resumen, descarga CSV).
   NO publiques estas cifras de ejemplo como reales.
   ============================================================ */
window.DATOS_AFILIADOS = {
  mesActual: { ingresos: 0, clics: 0, pedidos: 0, variacion: 0 },

  arranque: { ventas: 0, diasRestantes: 180 },

  evolucion: [
    { mes: "Ene", ingresos: 0 },
    { mes: "Feb", ingresos: 0 },
    { mes: "Mar", ingresos: 0 },
    { mes: "Abr", ingresos: 0 },
    { mes: "May", ingresos: 0 },
    { mes: "Jun", ingresos: 0 }
  ],

  articulos: [
    { titulo: "Mejor robot aspirador 2026",            clics: 0, pedidos: 0, ingresos: 0 },
    { titulo: "Robot aspirador calidad-precio <300€",  clics: 0, pedidos: 0, ingresos: 0 },
    { titulo: "Robot aspirador para mascotas",         clics: 0, pedidos: 0, ingresos: 0 },
    { titulo: "Roborock vs Conga",                     clics: 0, pedidos: 0, ingresos: 0 },
    { titulo: "Mejores cámaras de vigilancia",         clics: 0, pedidos: 0, ingresos: 0 },
    { titulo: "Mejores enchufes inteligentes",         clics: 0, pedidos: 0, ingresos: 0 },
    { titulo: "Mejores bombillas inteligentes",        clics: 0, pedidos: 0, ingresos: 0 },
    { titulo: "Mejor videoportero inteligente",        clics: 0, pedidos: 0, ingresos: 0 },
    { titulo: "Mejor termostato inteligente",          clics: 0, pedidos: 0, ingresos: 0 }
  ]
};

/* --- Ejemplo de cómo se verían unos datos reales (descomenta y ajusta):
window.DATOS_AFILIADOS = {
  mesActual: { ingresos: 48.30, clics: 1240, pedidos: 22, variacion: 35 },
  arranque: { ventas: 3, diasRestantes: 120 },
  evolucion: [
    { mes:"Ene", ingresos: 0 }, { mes:"Feb", ingresos: 6.10 }, { mes:"Mar", ingresos: 14.80 },
    { mes:"Abr", ingresos: 21.50 }, { mes:"May", ingresos: 35.90 }, { mes:"Jun", ingresos: 48.30 }
  ],
  articulos: [
    { titulo:"Mejor robot aspirador 2026", clics: 540, pedidos: 11, ingresos: 26.40 },
    ...
  ]
};
*/
