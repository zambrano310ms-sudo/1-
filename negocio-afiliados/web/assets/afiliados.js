/* ============================================================
   CONFIG DEL SITIO — rellena esto cuando tengas tu cuenta de
   Amazon Afiliados. Se aplica a TODAS las páginas del sitio.
   ============================================================ */
const TAG_AFILIADO = "PENDIENTE-21";     // <- tu Associate Tag (ej: tunombre-21)
const DOMINIO_AMAZON = "www.amazon.es";  // mercado

/* Cuando tengas los ASIN reales, sustituye los data-asin del HTML
   (ASIN_CONGA_Z100, etc.) por el ASIN real: lo ves en la URL de
   Amazon -> /dp/XXXXXXXXXX */

document.addEventListener("DOMContentLoaded", () => {
  // Construye los links de afiliado a partir de data-asin
  document.querySelectorAll("a[data-asin]").forEach(a => {
    const asin = a.getAttribute("data-asin");
    a.href = `https://${DOMINIO_AMAZON}/dp/${asin}?tag=${TAG_AFILIADO}`;
    a.target = "_blank";
    a.rel = "nofollow sponsored noopener";
  });

  // Reveal on scroll, ligero y sin librerías
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
});
