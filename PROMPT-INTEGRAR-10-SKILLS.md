# Prompt para integrar las 10 skills en otra cuenta de Claude Code

Copia TODO este archivo y pégalo como un único mensaje en una sesión de Claude Code abierta en el proyecto donde quieras tener las skills. Claude creará la estructura `.claude/skills/<nombre>/SKILL.md` con cada una.

---

INSTRUCCIONES PARA CLAUDE:

Crea en la raíz del proyecto actual la carpeta `.claude/skills/` y dentro 10 subcarpetas, una por skill. En cada subcarpeta crea un archivo `SKILL.md` con el contenido exacto que viene entre los marcadores `===BEGIN SKILL.md FOR <nombre>===` y `===END SKILL.md FOR <nombre>===` (sin incluir los marcadores).

Importante:
- El frontmatter YAML al principio de cada SKILL.md (entre `---` y `---`) DEBE preservarse exactamente.
- No interpretes ni resumas el contenido: cópialo VERBATIM, incluidos los bloques de código, emojis y saltos de línea.
- Si la carpeta `.claude/skills/` ya existe, NO la borres; solo añade lo que falte.

Estructura final esperada:

```
.claude/
└── skills/
    ├── web-scrolling/SKILL.md
    ├── instagram-a-web/SKILL.md
    ├── auditoria-seo/SKILL.md
    ├── dashboard-facturas/SKILL.md
    ├── automatizaciones-n8n/SKILL.md
    ├── prospeccion/SKILL.md
    ├── auditoria-negocio/SKILL.md
    ├── auditoria-meta-ads/SKILL.md
    ├── extension-chrome/SKILL.md
    └── crear-skill/SKILL.md
```

Al terminar, confírmame los 10 archivos creados.

---

## Las 10 skills


### 1. web-scrolling — Web premium con efectos de scroll

===BEGIN SKILL.md FOR web-scrolling===
---
name: web-scrolling
description: "Genera una web profesional de una sola página con animaciones de scroll, parallax y diseño premium. Usa esta skill siempre que el usuario quiera crear una web, landing page, página de negocio, portfolio, o cualquier sitio web estático. Triggers: 'hazme una web', 'crea una web', 'web para mi negocio', 'landing page', 'necesito una página web', 'web para restaurante/clínica/gimnasio/estudio/peluquería', 'web con efectos', 'web con animaciones', 'web profesional', 'diseño web', 'quiero una web', 'página para mi empresa', 'sitio web'."
---

# Web Premium con Efectos de Scroll

Generas webs de una sola página con animaciones de scroll que parecen hechas por una agencia de diseño. Un único archivo HTML que se abre en el navegador.

**Regla fundamental: no inventes ningún dato del negocio.** Servicios, precios, horarios, contacto, testimonios — todo viene del usuario. Si no te lo ha dado, pregúntaselo.

---

## Paso 1 — Recoger la información REAL del negocio

Pregunta al usuario lo necesario en **2-3 mensajes**, agrupando por bloques. No hagas un interrogatorio de 20 preguntas, pero tampoco te saltes nada.

### Bloque 1 — Lo básico (preguntar siempre si no lo ha dado)

- Nombre del negocio
- Tipo de negocio (restaurante, clínica, gimnasio, peluquería, estudio, etc.)
- Ciudad y dirección (aunque sea aproximada)
- Servicios reales con precios
- Teléfono y email de contacto reales
- Horario de apertura real

### Bloque 2 — Identidad visual

- **Colores de marca** — si no tiene, proponle 2-3 paletas adaptadas a su sector y que elija
- **Eslogan** — si no tiene, proponle 2-3 opciones y que elija
- **Fotos o imágenes** — si tiene, que las ponga en una carpeta `assets/`. Si no tiene, usa placeholders con gradientes CSS y avísale de que debería sustituirlos

### Bloque 3 — Contenido opcional

- **Testimonios reales** — si tiene reseñas de clientes, úsalas. Si no tiene, **omite la sección**. No inventes reseñas.
- **Redes sociales** — URLs reales. Si no tiene, no pongas iconos de redes.
- **Vídeo para el hero** — si tiene un vídeo, se activa el efecto scroll-video (ver más abajo)

### Si el usuario da info parcial

Genera con lo que tienes. Donde falte info, pon **placeholders visibles**: `[TU TELÉFONO AQUÍ]`, `[DIRECCIÓN]`, `[PRECIO]`. Avísale al final qué datos faltan.

---

## Paso 2 — Adaptar el diseño al tipo de negocio

La web de un restaurante japonés debe sentirse completamente diferente a la de un gimnasio. Adapta el tono, la paleta, la tipografía, los nombres de sección y el estilo visual al sector.

### Guía de adaptación

**Restaurante / Bar / Cafetería**
- Tono: cálido, sensorial, evocador
- Sección estrella: "Nuestra Carta" con categorías y precios (no "Servicios")
- Tipografía: serif elegante para títulos, sans-serif para cuerpo
- Detalles: si es un restaurante de una cultura específica (japonés, italiano, mexicano), refleja esa cultura en la tipografía, iconos decorativos y vocabulario
- CTA: "Reserva tu mesa" / "Ver la carta"

**Gimnasio / CrossFit / Centro deportivo**
- Tono: enérgico, directo, motivacional
- Sección estrella: "Planes" con comparativa de tarifas destacando el plan recomendado
- Tipografía: sans-serif potente y bold para títulos
- CTA: "Empieza tu prueba gratis" / "Apúntate hoy"

**Peluquería / Barbería / Centro de estética**
- Tono: elegante, cuidado, personal
- Sección estrella: servicios con precios detallados
- Tipografía: mezcla de serif elegante y sans-serif limpia
- CTA: "Pide tu cita" / "Reserva ahora"

**Clínica / Consulta médica**
- Tono: profesional, confiable, cercano
- Considera usar **tema claro** en vez de oscuro — transmite limpieza
- Sección estrella: especialidades y equipo médico
- CTA: "Pide cita" / "Consulta sin compromiso"

**Estudio creativo / Agencia / Freelance**
- Tono: creativo, moderno, seguro
- Sección estrella: portfolio de trabajos reales
- CTA: "Hablemos de tu proyecto"

**Tienda / Negocio local**
- Tono: cercano, práctico, confiable
- Sección estrella: productos destacados con precios
- CTA: "Visítanos" / "Ver productos"

---

## Paso 3 — Generar la web

Crea **un único archivo HTML** autocontenido con CSS y JS inline. Sin dependencias externas excepto Google Fonts. Debe funcionar abriéndolo directamente en el navegador.

### Principio creativo

Tienes total libertad para diseñar. No te limites a un template genérico — haz que cada web se sienta única y hecha a medida para ese negocio. Elige las fuentes, colores, espaciados, animaciones y detalles decorativos que mejor encajen con el sector y la personalidad del negocio.

Lo que sí debe cumplir siempre:
- **Responsive** (funcionar bien en móvil, tablet y escritorio)
- **Rendimiento** (no cargar librerías externas pesadas)
- **Accesibilidad básica** (contraste legible, textos no demasiado pequeños)

### Idioma

El mismo que usó el usuario.

### Secciones

Incluye estas secciones en este orden. Omite las que no apliquen:

1. **Navegación fija** — Se fija al hacer scroll con fondo semi-transparente y blur. Links a cada sección con scroll suave. Logo si el usuario lo proporcionó.

2. **Hero** — Pantalla completa. Dos variantes:
   - **Estándar (por defecto):** Título impactante, subtítulo, CTA. Diseña el hero para que sea la pieza más llamativa de la web — usa tipografía expresiva, efectos visuales creativos, elementos decorativos que reflejen el sector.
   - **Con vídeo scroll-driven:** Solo si el usuario da un vídeo o pide "efecto Apple". El vídeo avanza fotograma a fotograma con el scroll. Usa `position: sticky` + `height: 500vh` para el contenedor padre, y sincroniza `video.currentTime` con el progreso de scroll vía `requestAnimationFrame`. En móvil: autoplay silenciado. Respeta `prefers-reduced-motion`.

3. **Sobre nosotros** — Texto descriptivo con datos reales. Estadísticas reales (solo las que el usuario proporcionó) con números que se animan contando desde 0 al entrar en viewport.

4. **Servicios / Carta / Planes** — Nombre adaptado al sector. Los servicios REALES del usuario con precios REALES. Diseño en tarjetas o lista según lo que mejor encaje.

5. **Galería** — Solo si el usuario proporcionó imágenes o la pidió. Con fotos: usar rutas relativas a `assets/`. Sin fotos: placeholders con gradientes y aviso al usuario.

6. **Testimonios** — **Solo con testimonios reales del usuario.** Respeta la cantidad exacta que proporcionó (si dio 2, pon 2, no 3). Sin testimonios: omitir la sección.

7. **Contacto + Footer** — Formulario, datos de contacto REALES, redes sociales solo si dio URLs. Copyright con año actual.

### Efectos de scroll obligatorios

Implementa con **Intersection Observer nativo** (sin librerías):

- **Reveal animations** — Los elementos aparecen con transiciones al entrar en viewport (fade, slide, scale — elige las que mejor queden)
- **Stagger** — Los elementos de listas/grids entran escalonados
- **Counter** — Los números de stats se animan contando desde 0
- **Parallax** — Al menos 1 sección o elemento con movimiento diferencial al scroll
- **Hover effects** — Las tarjetas/cards responden al hover con elevación y/o transformación

La implementación concreta es tuya — elige las transiciones, duraciones, easings y efectos que hagan que la web se sienta premium. No te limites a un fade-up genérico si otra animación queda mejor.

### Diseño visual

- **Tema**: oscuro por defecto, pero usa tema claro si el sector lo requiere (clínicas, bodas, etc.)
- **Tipografía**: elige las fuentes de Google Fonts que mejor encajen con el sector — serif para elegancia, sans-serif para modernidad, display para impacto. Usa 2-3 fuentes máximo.
- **Paleta**: los colores del usuario, o los que eligió de tu propuesta
- **Detalles creativos**: scrollbar personalizada, elementos decorativos de fondo, gradientes sutiles, separadores visuales entre secciones — lo que haga falta para que no parezca un template genérico
- **Espaciado generoso** entre secciones
- **Max-width** ~1200px centrado

---

## Paso 4 — Guardar y abrir

- Guarda como `web-[nombre-negocio].html` (kebab-case, sin caracteres especiales)
- Abre automáticamente: `open` (macOS), `start` (Windows), `xdg-open` (Linux)

---

## Paso 5 — Presentar el resultado

Muestra:

1. Nombre del archivo generado
2. Secciones incluidas
3. **Datos que faltan** — lista exacta de placeholders que el usuario debe rellenar
4. Instrucciones para sustituir imágenes placeholder si las hay
5. Pregunta si quiere ajustar algo

No muestres precios sugeridos ni consejos de venta.

---

## Referencia técnica: Efecto Scroll-Video (Hero Variante B)

Este efecto solo se usa cuando el usuario proporciona un vídeo o pide explícitamente "efecto Apple", "vídeo con scroll", "que el vídeo avance con el scroll". El diseño visual del resto de la web sigue siendo libre.

### Cómo funciona

1. El usuario llega a la página — el vídeo está parado en el primer fotograma
2. Al hacer scroll hacia abajo, el vídeo avanza fotograma a fotograma sincronizado
3. Cuando el vídeo termina, el scroll normal de la página continúa
4. En móvil: autoplay silenciado (el scroll-driven no funciona bien en táctil)

### Estructura HTML

```html
<section class="scroll-video-hero" id="scroll-hero">
  <div class="scroll-video-sticky">
    <video id="heroVideo" src="assets/hero.mp4" poster="assets/hero-poster.jpg"
           playsinline muted preload="auto"></video>
    <div class="hero-content">
      <!-- Título, subtítulo, CTA van encima del vídeo con overlay oscuro -->
    </div>
    <div class="scroll-progress-bar">
      <div class="scroll-progress-fill" id="progressFill"></div>
    </div>
  </div>
</section>
```

### CSS necesario

```css
.scroll-video-hero {
  height: 500vh; /* Controla la velocidad: 300vh=rápido, 500vh=medio, 700vh=lento */
  position: relative;
}
.scroll-video-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
.scroll-video-sticky video {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  object-fit: cover;
}
.hero-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  background: rgba(0, 0, 0, 0.55);
  color: white;
  text-align: center;
  padding: 0 20px;
}
.scroll-progress-bar {
  position: absolute;
  bottom: 0; left: 0;
  width: 100%; height: 4px;
  background: rgba(255, 255, 255, 0.2);
  z-index: 3;
}
.scroll-progress-fill {
  height: 100%;
  width: 0%;
  transition: width 0.05s linear;
}

/* Móvil: autoplay en vez de scroll-driven */
@media (max-width: 768px) {
  .scroll-video-hero { height: 100vh; }
  .scroll-video-sticky { position: relative; }
}
@media (prefers-reduced-motion: reduce) {
  .scroll-video-hero { height: 100vh; }
}
```

### JavaScript necesario

```javascript
(function() {
  const video = document.getElementById('heroVideo');
  const hero = document.getElementById('scroll-hero');
  const progressFill = document.getElementById('progressFill');
  if (!video || !hero) return;

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isMobile || prefersReduced) {
    video.autoplay = true;
    video.loop = true;
    video.play().catch(() => {});
    return;
  }

  video.pause();
  video.currentTime = 0;
  let isReady = false;
  video.addEventListener('loadedmetadata', () => { isReady = true; });
  video.load();

  function updateVideo() {
    if (!isReady || !video.duration) return;
    const rect = hero.getBoundingClientRect();
    const scrolled = -rect.top;
    const scrollable = hero.offsetHeight - window.innerHeight;
    if (scrolled <= 0) { video.currentTime = 0; if (progressFill) progressFill.style.width = '0%'; return; }
    if (scrolled >= scrollable) { video.currentTime = video.duration; if (progressFill) progressFill.style.width = '100%'; return; }
    const progress = scrolled / scrollable;
    video.currentTime = progress * video.duration;
    if (progressFill) progressFill.style.width = (progress * 100) + '%';
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { updateVideo(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  window.addEventListener('resize', updateVideo);
})();
```

### Ajuste de velocidad

Si el usuario dice que va demasiado rápido, aumenta el `height` de `.scroll-video-hero`. Si dice que va lento, redúcelo.

### Al implementarlo

Integra estos estilos y scripts dentro del diseño creativo que hayas elegido para la web — adapta los colores de la barra de progreso, el overlay del hero-content y la tipografía al estilo general. El código de arriba es la base funcional, el estilo visual es tuyo.

===END SKILL.md FOR web-scrolling===

### 2. instagram-a-web — Instagram → web de marca personal

===BEGIN SKILL.md FOR instagram-a-web===
---
name: instagram-a-web
description: "Convierte un perfil de Instagram en una web de marca personal profesional. Usa esta skill cuando el usuario quiera crear una web desde su Instagram, convertir su perfil en web, hacer una web de marca personal, o cualquier variación de generar un sitio web a partir de un perfil de Instagram. Triggers: 'convierte mi Instagram en web', 'web de marca personal', 'web desde mi Instagram', 'quiero una web como mi perfil', 'web para influencer', 'web para creador de contenido', 'landing de marca personal', 'web desde mi @'."
---

# Instagram → Web de Marca Personal

Conviertes un perfil de Instagram en una web profesional de marca personal. La web debe reflejar la identidad, estilo y personalidad del perfil real.

**Regla fundamental: no inventes ningún dato.** No inventes servicios, precios, testimonios, clientes ni biografía. Todo sale del perfil real o lo proporciona el usuario.

---

## Paso 1 — Obtener los datos y fotos del perfil

Pide al usuario su **@handle de Instagram**.

### 1A. Extracción automática (intentar siempre primero)

Intenta extraer datos y fotos del perfil en este orden de prioridad:

**Opción 1 — Firecrawl MCP** (si está disponible):
Úsalo para scrapear `https://www.instagram.com/[handle]/`. Extrae datos del perfil e imágenes.

**Opción 2 — Playwright** (instalar automáticamente si no está):

Verifica si está disponible e instálalo si no:
```bash
# Verificar e instalar si falta
node -e "require('playwright')" 2>/dev/null || (npm install playwright && npx playwright install chromium)
```

**Importante**: antes de ejecutar la instalación, avisa al usuario para que no se asuste:
> "Estoy preparando las herramientas para acceder a Instagram. La primera vez tarda un poco (30-60 segundos), solo pasa una vez."

Si la instalación falla (permisos, sin Node.js, etc.), no te bloquees — salta al paso 1D y pregunta al usuario. Dile de forma amigable:
> "No he podido instalar las herramientas de navegación automática. No pasa nada — te pediré los datos directamente y la web quedará igual de bien."

Con Playwright disponible, crea y ejecuta un script que:
1. Navegue a `https://www.instagram.com/[handle]/`
2. Espere a que cargue el perfil (esperar selector de bio o timeout)
3. Extraiga del DOM: nombre, bio, categoría, stats (seguidores/posts/seguidos), link en bio
4. Extraiga las URLs de las imágenes de los posts visibles en el grid
5. Descargue las imágenes a `assets/instagram/`
6. Descargue la foto de perfil a `assets/instagram/profile.jpg`

Consejos para el scraping de Instagram:
- Los meta tags (`og:description`, `og:title`, `og:image`) son lo más fiable — suelen contener nombre, stats y foto de perfil
- El formato del meta description suele ser: "X Followers, Y Following, Z Posts - bio text"
- Las imágenes de posts están en tags `<img>` dentro del grid — filtra las que no sean iconos o avatares pequeños
- Instagram cambia selectores con frecuencia — si uno falla, prueba alternativas
- Haz scroll para cargar más imágenes si el grid inicial tiene pocas

**Opción 3 — WebFetch**:
Descarga `https://www.instagram.com/[handle]/` y parsea lo que puedas del HTML.

### 1B. Extracción de otras redes sociales

Después de obtener los datos de Instagram, busca al usuario en otras plataformas para:
- **Sumar seguidores totales** entre todas las redes (Instagram + Threads + TikTok + YouTube + LinkedIn + X + Skool, etc.)
- **Obtener más contexto** sobre su actividad profesional
- **Encontrar testimonios** en páginas de formación (Skool, academias, etc.)

Usa WebSearch para buscar el nombre + handle del usuario en otras plataformas. Si tiene comunidades (Skool, Discord, etc.), busca también los testimonios publicados ahí.

Para cada red encontrada, intenta obtener el número de seguidores con Playwright o WebFetch. Si no puedes, pregunta al usuario.

### 1C. Lo que necesitas extraer

**Datos del perfil de Instagram:**
- Nombre completo
- Bio / descripción
- Categoría profesional
- Número de seguidores, seguidos y publicaciones
- Link en bio
- Foto de perfil

**Fotos de posts (el objetivo principal):**
- Las imágenes visibles del grid de posts (las primeras 6-12)
- Descárgalas a `assets/instagram/post-1.jpg`, `post-2.jpg`, etc.
- Estas fotos se usarán en la galería/portfolio y en el hero de la web

**Datos de otras redes:**
- Seguidores en cada plataforma encontrada
- Total de comunidad sumando todas las redes
- Testimonios de clientes/alumnos si existen en plataformas públicas

### 1D. Si el scraping falla o es parcial

Dile al usuario de forma clara y amigable:

> "No he podido acceder a tu perfil automáticamente (Instagram lo bloquea bastante). Necesito que me ayudes con dos cosas:
>
> 1. **Tus datos**: cópiame tu bio, a qué te dedicas, servicios con precios, email y redes
> 2. **Tus fotos**: descarga 6-12 fotos de tus posts favoritos y ponlas en la carpeta `assets/instagram/` que he creado aquí"

Crea la carpeta `assets/instagram/` automáticamente:

```bash
mkdir -p assets/instagram
```

**Alternativa**: dile que puede exportar sus datos desde Instagram: Configuración → Tu actividad → Descargar tu información.

### 1E. Preguntas complementarias (después de tener los datos base)

- **Bio completa** (si no se pudo extraer)
- **A qué te dedicas** (fotógrafo, coach, diseñador, nutricionista, etc.)
- **Servicios reales** con precios si los tiene — si dice que no quiere poner precios o que es "bajo presupuesto", respétalo y no pongas precios
- **Email o forma de contacto**
- **Link que tienes en la bio**

### Bloque 2 — Identidad visual (preguntar después)

- **Colores de marca** — si tiene web o materiales, extrae los colores de ahí con WebFetch. Si no tiene, proponle 2-3 paletas que encajen con su perfil y que elija
- **Eslogan o frase principal** — si su bio tiene uno bueno, proponlo. Si no, ofrece 2-3 opciones
- **Fotos adicionales** — además de las de Instagram, pregunta si tiene fotos profesionales o logo

### Bloque 3 — Contenido opcional

- **Testimonios de clientes reales** — si los encontraste en Skool/web/Google, muéstraselos y pregunta si quiere usarlos. Si no tiene, **omite la sección**
- **Portfolio / trabajos reales** — si tiene ejemplos de su trabajo, inclúyelos
- **Redes sociales** — URLs reales de todas sus redes

---

## Paso 2 — Adaptar al tipo de marca personal

La web de un fotógrafo debe sentirse completamente diferente a la de un coach de negocios. Adapta todo al perfil.

### Guía de adaptación

**Fotógrafo / Videógrafo / Creativo visual**
- Tono: visual, artístico, inmersivo
- Sección estrella: Portfolio/Galería con grid grande y vistoso
- La web debe ser casi toda visual — las fotos son el protagonista
- CTA: "Reserva tu sesión" / "Ver portfolio"

**Coach / Consultor / Mentor**
- Tono: inspirador, profesional, cercano
- Sección estrella: Servicios/Programas con descripción clara de qué ofrece
- Social proof importante: número de alumnos, testimonios, comunidad
- CTA: "Agenda una llamada" / "Empieza tu transformación"

**Influencer / Creador de contenido**
- Tono: fresco, personal, auténtico
- Sección estrella: Contenido destacado / Colaboraciones
- Stats de todas las redes como social proof
- CTA: "Colabora conmigo" / "Contacto para marcas"

**Freelancer / Diseñador / Desarrollador**
- Tono: profesional, moderno, limpio
- Sección estrella: Portfolio con proyectos reales
- Skills técnicos en badges o barras
- CTA: "Hablemos de tu proyecto" / "Ver trabajos"

**Nutricionista / Fitness / Salud**
- Tono: energético, saludable, motivador
- Sección estrella: Planes/Programas con precios (si los dio)
- Resultados de clientes si tiene
- CTA: "Empieza tu plan" / "Consulta gratis"

**Artista / Músico / Performer**
- Tono: expresivo, inmersivo, emotivo
- Sección estrella: Galería/Shows/Obra
- Audio/video embeds si tiene links
- CTA: "Escúchame" / "Próximos eventos"

---

## Paso 3 — Generar la web

Crea **un único archivo HTML** autocontenido con CSS y JS inline. Sin dependencias externas excepto Google Fonts.

### Principio creativo

Tienes libertad total para diseñar. La web debe sentirse como una extensión natural del perfil de Instagram — misma energía, mismo estilo, pero en formato web profesional. Haz que sea única, no un template genérico.

Requisitos técnicos:
- **Responsive** (móvil, tablet, escritorio)
- **Rendimiento** (sin librerías externas pesadas)
- **Accesibilidad básica** (contraste, tamaños legibles)

### Idioma

El mismo que usa el usuario en la conversación.

### Secciones

Incluye en este orden. Omite las que no apliquen:

1. **Navegación fija** — Con el nombre/marca del usuario. Blur + semi-transparente al scroll. Links a secciones.

2. **Hero con tarjeta de perfil de Instagram** — El hero debe incluir una tarjeta premium que simule la parte superior de un perfil de Instagram, pero con diseño elevado. La tarjeta debe contener:
   - **Foto de perfil** con anillo decorativo animado (estilo stories de IG, con gradiente que rota)
   - **Stats reales**: publicaciones, seguidores y seguidos — visibles directamente, no animados (el usuario quiere ver los números al instante)
   - **Nombre con tick de verificación azul** — un badge circular azul con gradiente y check blanco al lado del nombre. Estilo premium con sombra sutil
   - **Handle de Instagram** como link clicable
   - **Categoría profesional** y ubicación si la tiene
   - **Bio real** tal cual
   - **Botones de acción** estilo IG: Contactar, Servicios, Seguir (o los que encajen)
   - **Mini grid de 6 fotos** de sus posts más recientes al final de la tarjeta

   Debajo de la tarjeta, un título grande con el propósito/misión del usuario y el **total de comunidad sumando todas las redes**.

3. **Sobre mí** — Bio real expandida (basada en lo que proporcionó, no inventada). Áreas de expertise en badges/pills. Fotos reales de Instagram en grid visual. Solo info que el usuario haya dado.

4. **Servicios** — Solo con servicios REALES. Si el usuario dijo que no quiere poner precios, no los pongas — pon "Bajo presupuesto" o similar. Si no dio servicios, omite la sección. Si tiene una comunidad/formación destacada (como Skool), dale una sección propia con sus stats.

5. **Galería / Contenido** — Usa las fotos reales descargadas de Instagram con rutas relativas a `assets/instagram/`. Grid visual atractivo con hover effects. Las fotos son el mayor activo visual — hazlas protagonistas.

6. **Métricas** — Barra de stats con los datos reales más impactantes (casos de éxito, países, comunidad total, años de experiencia). Solo datos reales proporcionados o extraídos. Números con counter animation al entrar en viewport.

7. **Testimonios** — **Solo testimonios reales** encontrados en Skool, web, o proporcionados por el usuario. Elige los más potentes — los que mencionan resultados concretos (clientes cerrados, facturación, transformación). Respeta la cantidad exacta que tienes.

8. **Contacto + Footer** — Formulario, email real, links a TODAS sus redes reales con iconos. CTA directo a Instagram. Copyright con nombre y año.

### Efectos de scroll obligatorios

Implementa con **Intersection Observer nativo**:

- **Reveal animations** — Elementos aparecen al entrar en viewport
- **Stagger** — Grids/listas entran escalonados
- **Counter** — Números de métricas cuentan desde 0
- **Parallax** — Al menos 1 sección con movimiento diferencial
- **Hover effects** — Cards responden al hover

Elige las animaciones que mejor encajen con la personalidad del perfil.

### Diseño visual

- **Tema**: elige según la marca personal — oscuro para tech/creativos, claro para coaches/salud
- **Tipografía**: 2-3 fuentes de Google Fonts que reflejen la personalidad del perfil
- **Paleta**: los colores elegidos por el usuario, o extraídos de su web/marca
- **Detalles creativos**: scrollbar personalizada, elementos decorativos, gradientes, la línea dorada de acento en la tarjeta IG — lo que haga falta para que se sienta premium y personal
- **Instagram como hilo conductor**: la web nace del perfil de Instagram — que se note visualmente en la tarjeta del hero, las fotos, los stats y los links prominentes al perfil

---

## Paso 4 — Guardar y abrir

- Guarda como `web-[handle].html` (sin el @, kebab-case)
- Abre automáticamente en el navegador

---

## Paso 5 — Presentar el resultado

Muestra:

1. Nombre del archivo generado
2. Secciones incluidas
3. De dónde salió cada dato (extraído de Instagram / extraído de otra red / proporcionado por el usuario)
4. **Seguidores totales** — desglose por red y suma total
5. **Fotos utilizadas** — cuántas se descargaron de Instagram y dónde están (`assets/instagram/`)
6. **Datos que faltan** — placeholders que el usuario debe completar
7. Pregunta si quiere ajustar algo

No muestres precios sugeridos ni consejos de venta.

===END SKILL.md FOR instagram-a-web===

### 3. auditoria-seo — Auditoría SEO de una web

===BEGIN SKILL.md FOR auditoria-seo===
---
name: auditoria-seo
description: "Audita el SEO completo de cualquier web y genera un informe visual con puntuación y correcciones específicas. Usa esta skill cuando el usuario quiera analizar el SEO de una web, verificar su posicionamiento, revisar meta tags, analizar la estructura, o mejorar su visibilidad en Google. Triggers: 'audita el SEO', 'analiza mi web', 'revisa el posicionamiento', 'qué está mal en mi SEO', 'cómo mejorar mi web en Google', 'auditoría SEO', 'analiza esta URL', 'revisa mi página', 'SEO de mi web'."
---

# Auditoría SEO Completa

Le das una URL y Claude analiza todo: meta tags, headings, velocidad, schema, Open Graph, sitemap, robots.txt, imágenes, enlaces. Genera un dashboard HTML visual con puntuación global y correcciones priorizadas por impacto.

**Regla fundamental: solo reporta datos reales.** Cada hallazgo debe estar respaldado por lo que encontraste en la web. No inventes problemas ni infles la gravedad.

---

## Paso 1 — Obtener la URL y contexto

Pide al usuario la **URL completa** del sitio a auditar.

Pregunta también:
- **¿Es tu web o la de un competidor?** — cambia el tono del informe
- **¿Quieres que audite también algún competidor para comparar?** — si da 1-2 URLs más, incluye comparativa
- **¿Hay alguna keyword o búsqueda por la que quieras posicionar?** — si la da, evalúa la presencia de esa keyword en title, h1, contenido, meta description

Si el usuario no quiere dar más contexto y solo da la URL, empieza directamente con la auditoría.

---

## Paso 2 — Recopilar datos de la web

Usa las herramientas nativas de Claude Code para extraer todo. No necesitas instalar nada — WebFetch y Bash son suficientes.

### 2A. Página principal

Usa WebFetch para descargar y analizar la página. Extrae:
- HTML completo para analizar estructura
- Todos los meta tags
- Estructura de headings (h1-h6)
- Imágenes y sus atributos alt
- Enlaces internos y externos
- Schema / JSON-LD
- Open Graph y Twitter Cards

### 2B. Archivos técnicos

Verifica con WebFetch o curl:
- `[URL]/robots.txt` — ¿existe? ¿qué bloquea?
- `[URL]/sitemap.xml` — ¿existe? ¿está bien formado?
- `[URL]/favicon.ico` — ¿existe?

### 2C. Verificaciones técnicas

Con Bash (curl):
```bash
# Tiempo de respuesta y headers
curl -sI -o /dev/null -w "HTTP %{http_code} | Tiempo: %{time_total}s | Redirect: %{redirect_url}" [URL]

# Verificar HTTPS
curl -sI [URL] | head -5

# Verificar si hay redirección www vs no-www
curl -sI http://[dominio] 2>/dev/null | grep -i location
curl -sI https://www.[dominio] 2>/dev/null | grep -i location
```

### 2D. Verificación de enlaces (los primeros 15-20)

Verifica el status code de los enlaces internos más importantes para detectar enlaces rotos (404). No hagas más de 20 peticiones para no saturar el servidor.

### 2E. Páginas secundarias (opcional)

Si el usuario lo pide, audita también 2-3 páginas internas (about, servicios, blog) para tener una visión más completa.

---

## Paso 3 — Evaluar cada categoría

Puntúa cada categoría de 0 a 100. Sé justo y objetivo — no regales puntos pero tampoco penalices en exceso por cosas menores.

### Categorías y pesos

**1. Meta Tags (20%)**
- `<title>`: ¿existe? ¿longitud 50-60 chars? ¿descriptivo y con keyword?
- `<meta description>`: ¿existe? ¿longitud 150-160 chars? ¿persuasiva?
- `<meta viewport>`: ¿existe?
- `<meta robots>`: ¿bloquea indexación sin querer?
- `<link canonical>`: ¿existe y apunta bien?
- Idioma: `<html lang="xx">` definido

**2. Headings (15%)**
- ¿Hay exactamente un `<h1>`?
- ¿La jerarquía es correcta? (no saltar de h1 a h3)
- ¿El h1 contiene la keyword principal (si se proporcionó)?
- ¿Los h2 son descriptivos del contenido?

**3. Imágenes (10%)**
- Total de imágenes
- ¿Cuántas tienen atributo `alt` descriptivo?
- ¿Hay `loading="lazy"` en imágenes below the fold?
- ¿Se usan formatos modernos (WebP, AVIF)?

**4. Enlaces (10%)**
- Total internos vs externos
- ¿Hay enlaces rotos (404)?
- ¿Los externos tienen `rel="noopener"` o `rel="nofollow"` cuando corresponde?
- ¿Los textos ancla son descriptivos? (no "click aquí", "ver más")

**5. Open Graph y Social (10%)**
- og:title, og:description, og:image, og:url, og:type — ¿completos?
- twitter:card, twitter:title, twitter:description, twitter:image
- ¿Las longitudes son correctas? ¿La imagen OG existe?

**6. Schema / Datos Estructurados (10%)**
- ¿Hay JSON-LD, Microdata o RDFa?
- ¿Qué tipos? (Organization, LocalBusiness, Article, Product, etc.)
- ¿Está bien formado el JSON?
- ¿Faltan campos importantes?

**7. Técnico (15%)**
- Tiempo de respuesta del servidor
- ¿HTTPS activo?
- ¿Robots.txt presente y correcto?
- ¿Sitemap.xml presente y accesible?
- ¿Favicon presente?
- Tamaño del HTML
- Redirecciones www vs no-www configuradas

**8. Contenido (10%)**
- Conteo de palabras del texto visible
- Ratio texto/HTML (debería ser >25%)
- ¿Hay contenido suficiente? (>300 palabras para páginas principales)
- ¿Title y description son únicos?

### Puntuación global

Media ponderada de las 8 categorías según los pesos indicados.

---

## Paso 4 — Generar el dashboard HTML

Genera un único archivo HTML autocontenido con todo el informe. Libertad creativa total en el diseño, pero debe incluir:

### Contenido obligatorio del dashboard

1. **Header** — URL auditada, fecha de la auditoría, puntuación global en un elemento visual grande y claro. Color según resultado: verde (80+), amarillo (50-79), rojo (<50).

2. **Resumen ejecutivo** — 4 tarjetas:
   - Puntuación global
   - Problemas críticos (count)
   - Advertencias (count)
   - Tests aprobados (count)

3. **Top 5 correcciones prioritarias** — Lo más importante. Ordenadas por impacto real en SEO. Cada una con:
   - Qué está mal (concreto)
   - Por qué importa (impacto en Google)
   - Cómo corregirlo (código exacto o instrucción clara que cualquier persona pueda seguir)

4. **Desglose por categoría** — Las 8 categorías con:
   - Barra de progreso visual con puntuación
   - Lista de hallazgos con estado (aprobado / advertencia / error)
   - Recomendación para cada problema

5. **Comparativa con competidores** — Solo si el usuario proporcionó URLs de competidores. Tabla lado a lado con puntuaciones por categoría.

6. **Detalle técnico completo** — Tabla expandible/colapsable con TODOS los hallazgos para quien quiera profundizar.

### Requisitos del dashboard

- Responsive (se ve bien en móvil)
- Autocontenido (CSS y JS inline, sin dependencias)
- Imprimible (que al imprimir/exportar PDF se vea bien)
- Con navegación interna (links a cada sección)

---

## Paso 5 — Guardar y presentar

- Guarda como `auditoria-seo-[dominio].html` (dominio en kebab-case)
- Abre automáticamente en el navegador

Presenta un resumen breve:

1. **Puntuación global** y nivel (bueno/mejorable/crítico)
2. **Top 3 correcciones** más urgentes en una frase cada una
3. **Qué secciones tiene el informe** para que sepa qué encontrar
4. Pregunta si quiere que **aplique las correcciones directamente** en su código (si tiene el código fuente accesible)

No muestres precios sugeridos ni consejos de venta.

---

## Paso 6 — Aplicar correcciones (opcional)

Si el usuario dice que sí y tiene los archivos del sitio accesibles:

1. Localiza los archivos HTML/template relevantes
2. Aplica las correcciones una por una (meta tags, alts, headings, schema, etc.)
3. Muestra cada cambio realizado
4. Ofrece volver a ejecutar la auditoría para ver la mejora en puntuación

===END SKILL.md FOR auditoria-seo===

### 4. dashboard-facturas — Dashboard a partir de facturas PDF

===BEGIN SKILL.md FOR dashboard-facturas===
---
name: dashboard-facturas
description: "Lee facturas PDF de una carpeta y genera un dashboard visual completo con balances, ingresos, gastos, IVA, evolución temporal y métricas del negocio. Usa esta skill cuando el usuario quiera analizar facturas, ver su facturación, crear un dashboard financiero, revisar ingresos y gastos, o cualquier análisis de documentos contables. Triggers: 'analiza mis facturas', 'dashboard de facturas', 'cuánto he facturado', 'resumen financiero', 'balance de ingresos y gastos', 'métricas de mi negocio', 'gráficos de facturación', 'lee mis facturas PDF'."
---

# Dashboard de Facturas

El usuario te señala una carpeta con facturas en PDF. Tú las lees una a una, extraes todos los datos y generas un dashboard HTML visual con el análisis financiero completo del negocio.

**Regla fundamental: solo reporta datos reales extraídos de las facturas.** No inventes cifras, no redondees para que quede bonito, no asumas datos que no están en los documentos.

---

## Paso 1 — Localizar las facturas

Pregunta al usuario:
- **¿Dónde están tus facturas?** — ruta de la carpeta (ej: `~/facturas/`, `./facturas/`, `/Users/juan/Documents/facturas 2025/`)
- **¿Son todas facturas emitidas (ingresos) o también hay facturas recibidas (gastos)?** — esto cambia completamente el análisis

Si no tiene una carpeta preparada:
> "Crea una carpeta y mete ahí todos tus PDFs de facturas. Puedo leer facturas emitidas (lo que cobras) y recibidas (lo que pagas). Si tienes ambas, ponlas en subcarpetas separadas: `facturas/ingresos/` y `facturas/gastos/`."

```bash
mkdir -p facturas/ingresos facturas/gastos
```

---

## Paso 2 — Leer las facturas

Lee cada PDF de la carpeta directamente con la herramienta Read (Claude Code puede leer PDFs nativamente). No necesitas instalar pdfplumber ni ninguna librería Python.

Para cada factura PDF:
1. Lee el archivo con la herramienta Read
2. Extrae del texto estos campos:

**Datos a extraer de cada factura:**
- **Tipo**: ingreso (factura emitida) o gasto (factura recibida) — inferir del contexto o preguntar al usuario
- **Número de factura**
- **Fecha de emisión**
- **Emisor** (quién factura)
- **Receptor** (a quién se factura)
- **Concepto / descripción de las líneas**
- **Base imponible / subtotal / neto** (importe sin IVA)
- **IVA** (porcentaje y cantidad)
- **IRPF / retenciones** (si aplica — común en España para autónomos)
- **Total factura**
- **Moneda**

**Patrones comunes a buscar:**
- Fechas: `dd/mm/yyyy`, `dd-mm-yyyy`, `dd de mes de yyyy`
- Importes: números seguidos de €, EUR, $, USD
- IVA: "IVA 21%", "I.V.A.", "Tax", porcentajes cerca de importes
- IRPF: "Retención", "IRPF", "-15%", "-7%"
- Totales: "Total", "TOTAL", "Importe total", "Total factura", "Amount due"
- Base: "Base imponible", "Subtotal", "Neto", "Net amount"
- Factura nº: "Factura nº", "Invoice #", "Nº:", patrones tipo F-2025-001, INV-001

**Si un campo no se puede extraer**, márcalo como desconocido. No inventes. Al final del proceso, muestra al usuario las facturas con datos incompletos para que valide.

### Guardar datos extraídos

Guarda todos los datos en un JSON intermedio (`facturas_datos.json`) para que el usuario pueda revisar y corregir si hay errores de extracción:

```json
[
  {
    "archivo": "factura-001.pdf",
    "tipo": "ingreso",
    "numero": "F-2025-001",
    "fecha": "2025-01-15",
    "emisor": "Mi Empresa SL",
    "receptor": "Cliente XYZ",
    "concepto": "Consultoría tecnológica enero",
    "base_imponible": 1500.00,
    "iva_porcentaje": 21,
    "iva_cantidad": 315.00,
    "irpf_porcentaje": -15,
    "irpf_cantidad": -225.00,
    "total": 1590.00,
    "moneda": "EUR"
  }
]
```

Después de extraer todas las facturas, muestra un resumen al usuario:
> "He leído X facturas. Y se leyeron correctamente, Z tuvieron datos incompletos. ¿Quieres revisar los datos antes de generar el dashboard?"

---

## Paso 3 — Calcular métricas

Con los datos extraídos, calcula todo lo que los datos permitan. No fuerces métricas si no hay datos suficientes.

### Métricas principales (si hay datos)

**Ingresos:**
- Facturación total bruta (con IVA)
- Facturación total neta (base imponible)
- IVA repercutido total
- IRPF retenido total (si aplica)
- Factura media
- Factura más alta / más baja

**Gastos (si hay facturas recibidas):**
- Gasto total bruto
- Gasto total neto
- IVA soportado total

**Balance (si hay ingresos y gastos):**
- Balance neto (ingresos netos - gastos netos)
- IVA a pagar/devolver (repercutido - soportado)
- Beneficio antes de impuestos
- Margen (ingresos / gastos)

**Temporal:**
- Evolución mensual de ingresos
- Evolución mensual de gastos (si los hay)
- Mejor mes / peor mes
- Tendencia (comparar últimos 3 meses con anteriores)
- Media mensual
- Meses sin facturación (gaps)

**Clientes:**
- Top clientes por facturación
- Nº de facturas por cliente
- % de facturación que representa cada cliente
- Dependencia de cliente (si un cliente supone >40% del total, alertar)

**IVA trimestral (si son facturas españolas):**
- Desglose Q1, Q2, Q3, Q4
- IVA repercutido por trimestre
- IVA soportado por trimestre (si hay gastos)
- Liquidación estimada por trimestre

---

## Paso 4 — Generar el dashboard HTML

Crea un único archivo HTML autocontenido con todo el análisis. Libertad creativa total en el diseño, pero debe incluir:

### Contenido obligatorio

1. **Header** — Rango de fechas, total de facturas procesadas, facturas con errores si las hay

2. **KPIs principales** — Tarjetas grandes con las cifras más importantes. Adapta las KPIs según lo que haya en los datos:
   - Si solo hay ingresos: facturación total, neto, IVA, ticket medio, nº facturas, nº clientes
   - Si hay ingresos y gastos: añade balance, beneficio, margen, IVA a liquidar
   - Los números deben ser claros, grandes y con formato local (1.234,56 € para España)

3. **Gráfico de evolución temporal** — Barras o líneas mostrando la evolución mes a mes. Si hay ingresos y gastos, mostrar ambos en el mismo gráfico con colores diferentes. Implementar con CSS/SVG puro, sin Chart.js.

4. **Balance por trimestre** — Si los datos lo permiten, desglose trimestral con IVA repercutido, soportado y liquidación estimada

5. **Top clientes** — Tabla ordenada por facturación con barra de progreso visual. Alertar si hay dependencia excesiva de un cliente.

6. **Distribución de conceptos** — Si los conceptos son variados, agrupar por tipo de servicio

7. **Tabla de detalle** — Todas las facturas en una tabla completa con:
   - Fecha, número, emisor/receptor, concepto, neto, IVA, total
   - Ordenable por columna
   - Filtrable por tipo (ingreso/gasto), cliente, mes
   - Indicador visual de ingreso (verde) vs gasto (rojo)

8. **Alertas y observaciones** — Cosas que el usuario debería saber:
   - Facturas sin IVA detectado
   - Meses sin facturación
   - Dependencia de cliente (>40% en uno solo)
   - Tendencia ascendente/descendente
   - Facturas que no se pudieron leer bien
   - IRPF: total retenido en el año (para la declaración)

### Requisitos del dashboard

- Responsive (móvil y escritorio)
- Autocontenido (CSS y JS inline)
- Imprimible / exportable a PDF
- Navegación interna entre secciones
- Números con formato local (separador de miles, decimales, símbolo €)
- Colores: verde para ingresos, rojo para gastos, azul/neutro para totales

---

## Paso 5 — Guardar y presentar

- Guarda el dashboard como `dashboard-facturacion.html`
- Guarda los datos en `facturas_datos.json` (para que el usuario pueda reusar)
- Abre el dashboard automáticamente en el navegador

Presenta un resumen:

1. Facturas leídas correctamente vs con errores
2. Las 3-4 métricas más relevantes en una frase
3. Alertas importantes si las hay
4. Pregunta si quiere ajustar algo o corregir datos de alguna factura

No muestres precios sugeridos ni consejos de venta.

===END SKILL.md FOR dashboard-facturas===

### 5. automatizaciones-n8n — Workflows de automatización n8n

===BEGIN SKILL.md FOR automatizaciones-n8n===
---
name: automatizaciones-n8n
description: "Crea, revisa y gestiona workflows de automatización en n8n. Conecta con tu instancia de n8n para crear workflows directamente, revisar los existentes, y automatizar cualquier proceso de negocio. Usa esta skill cuando el usuario quiera automatizar procesos, crear workflows en n8n, revisar automatizaciones existentes, conectar herramientas, o cualquier cosa relacionada con n8n. Triggers: 'automatiza esto', 'workflow de n8n', 'automatización', 'conectar herramientas', 'automatizar emails/leads/redes', 'revisa mis workflows', 'crea una automatización', 'n8n'."
---

# Automatizaciones n8n

Creas workflows de automatización profesionales en n8n. Puedes conectarte a la instancia del usuario para crear workflows directamente, revisar los existentes, y generar documentación visual.

**Regla fundamental: pregunta antes de ejecutar.** No crees ni modifiques workflows en la instancia del usuario sin su confirmación explícita.

---

## Paso 0 — Verificar e instalar dependencias

Antes de empezar, verifica que el MCP de n8n y las skills están disponibles. Si no lo están, instálalos automáticamente.

### Verificar MCP n8n

Comprueba si las herramientas del MCP de n8n están disponibles (busca tools como `get_node`, `search_nodes`, `list_workflows`, etc.). Si no están:

> "Para trabajar con n8n necesito instalar un par de cosas. Dame un momento (30-60 segundos la primera vez)."

```bash
# Instalar el MCP server de n8n globalmente
npm install -g n8n-mcp 2>/dev/null || npm install n8n-mcp
```

Después configura el MCP en el settings del proyecto. Crea o actualiza `.mcp.json` en la raíz del proyecto:

```json
{
  "mcpServers": {
    "n8n-mcp": {
      "command": "npx",
      "args": ["n8n-mcp"],
      "env": {
        "MCP_MODE": "stdio",
        "LOG_LEVEL": "error",
        "DISABLE_CONSOLE_OUTPUT": "true"
      }
    }
  }
}
```

Avisa al usuario que necesita reiniciar Claude Code para que el MCP se active.

### Verificar skills de n8n

Comprueba si las skills de n8n están instaladas (n8n-expression-syntax, n8n-workflow-patterns, etc.). Si no:

```bash
# Clonar e instalar skills de n8n
git clone https://github.com/czlonkowski/n8n-skills.git /tmp/n8n-skills
mkdir -p ~/.claude/skills
cp -r /tmp/n8n-skills/skills/* ~/.claude/skills/
rm -rf /tmp/n8n-skills
```

---

## Paso 1 — Conectar con n8n (opcional pero recomendado)

Pregunta al usuario si tiene una instancia de n8n y quiere conectarla:

> "¿Tienes una instancia de n8n funcionando? Si me das la URL y tu API key, puedo:
> - Crear workflows directamente en tu n8n
> - Revisar y mejorar tus workflows existentes
> - Ver qué credenciales tienes configuradas
>
> Si no tienes n8n o prefieres no conectarlo, puedo generar los workflows como archivo JSON para que los importes manualmente.
>
> **¿Tu URL de n8n?** (ej: https://mi-n8n.dominio.com o http://localhost:5678)
> **¿Tu API key?** (la encuentras en Settings → API → Create API Key)"

Si el usuario proporciona URL + API key:

1. Actualiza `.mcp.json` añadiendo las credenciales:
```json
{
  "mcpServers": {
    "n8n-mcp": {
      "command": "npx",
      "args": ["n8n-mcp"],
      "env": {
        "MCP_MODE": "stdio",
        "LOG_LEVEL": "error",
        "DISABLE_CONSOLE_OUTPUT": "true",
        "N8N_API_URL": "[URL del usuario]",
        "N8N_API_KEY": "[API key del usuario]"
      }
    }
  }
}
```

2. Avisa que necesita reiniciar Claude Code

3. Una vez conectado, verifica que funciona listando los workflows existentes

**Si el usuario no quiere conectar n8n**: trabaja en modo offline — genera JSONs importables y documentación.

---

## Paso 2 — Entender qué automatizar

### Si el usuario tiene n8n conectado

Primero explora lo que ya tiene:
- Lista sus workflows existentes
- Revisa las credenciales que tiene configuradas (esto te dice qué herramientas usa)
- Pregunta qué quiere mejorar, crear, o qué procesos manuales tiene

### Si trabaja desde cero

Pregunta:
- **¿Qué quieres automatizar?** — describe el proceso manual que haces hoy
- **¿Qué herramientas usas?** — Gmail, Google Sheets, Slack, Notion, CRM, Stripe, WhatsApp, WordPress, etc.
- **¿Cuál es el disparador?** — qué evento inicia el proceso (llega un email, alguien rellena un formulario, cada día a las 9h, alguien paga, etc.)
- **¿Qué debe pasar paso a paso?** — el flujo completo

Si el usuario no sabe qué automatizar, proponle ideas basadas en su negocio:

**Para agencias/consultorías:**
- Captación de leads: formulario web → CRM + email de bienvenida + Slack
- Seguimiento automático: si el lead no responde en 3 días → email de follow-up
- Onboarding de cliente: pago recibido → crear carpeta Drive + enviar accesos + tarea en Notion

**Para ecommerce:**
- Pedido nuevo → confirmar stock + enviar email + actualizar inventario
- Review negativa → alerta a Slack + respuesta automática
- Carrito abandonado → email de recordatorio a las 24h

**Para creadores de contenido:**
- Planificación: Google Sheets con calendario → publicar en LinkedIn + Twitter + Telegram
- Nuevo suscriptor → email de bienvenida + añadir a lista + notificar

---

## Paso 3 — Diseñar y crear el workflow

### Usa las herramientas del MCP

Si el MCP de n8n está disponible, úsalo para:
- **Buscar nodos** correctos para cada herramienta (search_nodes)
- **Consultar documentación** de cada nodo (get_node) — propiedades, operaciones, campos requeridos
- **Buscar templates** similares a lo que necesita el usuario (search_templates)
- **Validar el workflow** antes de crearlo

### Usa las skills de n8n

Si las skills están instaladas, aplícalas:
- **n8n-expression-syntax** para escribir expresiones correctas ({{ $json.field }})
- **n8n-workflow-patterns** para elegir el patrón arquitectónico correcto
- **n8n-node-configuration** para configurar nodos correctamente
- **n8n-validation-expert** si hay errores de validación
- **n8n-code-javascript/python** si necesitas nodos de código

### Crear el workflow

**Si tiene n8n conectado:** crea el workflow directamente en su instancia con la API. Muéstrale el resultado y pregunta si quiere activarlo.

**Si no tiene n8n conectado:** genera un archivo `workflow-[nombre].json` válido para importar.

En ambos casos:
- Posiciona los nodos de forma legible (flujo de izquierda a derecha, 250px entre nodos)
- Nombra cada nodo de forma descriptiva (no "HTTP Request" sino "Obtener datos del lead")
- Añade notas/sticky notes explicando las partes clave
- Configura manejo de errores (Error Trigger + notificación)

---

## Paso 4 — Documentar el workflow

Genera un archivo HTML con la documentación visual del workflow:

### Contenido

1. **Nombre y descripción** del workflow
2. **Diagrama visual del flujo** — representación con cajas y flechas (HTML/CSS puro) mostrando cada nodo y las conexiones
3. **Configuración paso a paso** — qué configurar en cada nodo
4. **Credenciales necesarias** — lista de API keys/OAuth que necesita
5. **Datos de ejemplo** — qué entra y qué sale en cada paso
6. **Cómo importar en n8n** — si se generó como JSON, instrucciones claras:
   - Abre n8n → Workflows → Import from file
   - Selecciona el archivo JSON
   - Configura las credenciales en cada nodo
   - Activa el workflow

### Diseño

Libertad creativa total. El diagrama debe ser claro y visualmente atractivo.

---

## Paso 5 — Revisar workflows existentes (si tiene n8n conectado)

Si el usuario pide revisar un workflow existente:

1. Lee el workflow de su instancia
2. Analiza:
   - ¿Los nodos están bien configurados?
   - ¿Las expresiones son correctas?
   - ¿Hay manejo de errores?
   - ¿El flujo es eficiente o hay pasos innecesarios?
   - ¿Hay riesgos de seguridad? (API keys en texto plano, webhooks sin auth, etc.)
3. Propón mejoras concretas
4. Si el usuario acepta, aplica los cambios directamente

---

## Paso 6 — Presentar el resultado

Muestra:

1. Nombre del workflow creado/modificado
2. Diagrama resumido del flujo (texto)
3. Credenciales que necesita configurar
4. Si está conectado: link directo al workflow en su n8n
5. Si es JSON: nombre del archivo + instrucciones de importación
6. Documentación generada
7. Pregunta si quiere ajustar algo

No muestres precios sugeridos ni consejos de venta.

===END SKILL.md FOR automatizaciones-n8n===

### 6. prospeccion — Prospección de clientes (Firecrawl)

===BEGIN SKILL.md FOR prospeccion===
---
name: prospeccion
description: "Encuentra clientes potenciales buscando negocios de un nicho, analizando su presencia digital y generando un informe con datos de contacto y oportunidades. Usa esta skill cuando el usuario quiera buscar clientes, hacer prospección, encontrar leads, analizar negocios de un sector, o buscar empresas a las que ofrecerles servicios. Triggers: 'buscar clientes', 'prospección', 'encontrar leads', 'lista de clientes potenciales', 'a quién le vendo', 'encontrar empresas de [sector]', 'buscar negocios en [ciudad]', 'analizar competencia', 'scraping de negocios'."
---

# Prospección de Clientes

Le dices un sector + ubicación y Claude busca negocios reales, analiza su presencia digital, puntúa la oportunidad y genera un informe con los mejores prospectos y sus datos de contacto.

**Regla fundamental: solo datos reales.** Cada negocio, teléfono, web y dato de contacto debe ser real y verificado. No inventes negocios ni datos de contacto.

---

## Paso 1 — Definir la búsqueda

Pregunta al usuario:
- **¿Qué tipo de negocio buscas?** (restaurantes, clínicas, gimnasios, abogados, agencias, tiendas...)
- **¿En qué ciudad o zona?** (Barcelona, Madrid centro, Valencia, una provincia entera...)
- **¿Qué servicio les vas a ofrecer?** — esto afecta cómo se puntúa la oportunidad (si vendes webs, un negocio sin web es oportunidad máxima; si vendes SEO, una web sin optimizar es la oportunidad)
- **¿Cuántos prospectos necesitas?** (10, 25, 50)

---

## Paso 2 — Buscar negocios reales

Usa las herramientas disponibles para encontrar negocios reales. Orden de prioridad:

### Opción 1 — WebSearch (siempre disponible)

Busca en Google con queries específicas:
- `"[nicho] en [ciudad]"` — resultados orgánicos
- `"[nicho] [ciudad] teléfono"` — para encontrar datos de contacto
- `"[nicho] [ciudad] opiniones"` — Google Business results
- `site:paginasamarillas.es [nicho] [ciudad]` — directorio

Haz varias búsquedas con variaciones para acumular negocios únicos.

### Opción 2 — Firecrawl MCP (si está configurado)

Si tiene Firecrawl, scrapea directorios directamente:
- Páginas Amarillas / QDQ / Yelp
- Google Maps (resultados de búsqueda)
- Directorios específicos del sector

### Opción 3 — Playwright (si está instalado)

Navega a directorios y extrae listados de negocios con sus datos.

### Qué extraer de cada negocio

- **Nombre** del negocio
- **Web** (URL si tiene)
- **Teléfono**
- **Email** (si está visible)
- **Dirección**
- **Google Maps / Google Business** (si aparece)
- **Redes sociales** (Instagram, Facebook, etc.)

**Si no puedes encontrar suficientes negocios automáticamente**, dile al usuario cuántos encontraste y pregunta si quiere que busques de otra forma o si tiene URLs que quiera analizar directamente.

---

## Paso 3 — Analizar la presencia digital

Para cada negocio encontrado que tenga web, analízala con WebFetch:

### Checklist de análisis

- **¿Tiene web?** — si no tiene, oportunidad máxima para servicios de web
- **¿HTTPS?** — ¿tiene certificado SSL?
- **¿Responsive?** — ¿tiene meta viewport?
- **¿SEO básico?** — ¿tiene title, meta description, h1?
- **¿Velocidad?** — tiempo de respuesta del servidor (curl)
- **¿Redes sociales?** — buscar links a Instagram, Facebook, LinkedIn, etc. en la web
- **¿Google Business?** — ¿tiene ficha con reseñas?
- **¿Diseño moderno?** — ¿se ve como una web de 2024+ o parece de 2015?
- **¿Contenido?** — ¿tiene blog, páginas de servicios, fotos?

### Puntuación de oportunidad

Puntúa cada negocio de 0-100 según el servicio que ofrece el usuario:

**Si vende webs/diseño:**
- Sin web = 95-100
- Web antigua + sin responsive + sin HTTPS = 80-94
- Web aceptable pero fea/lenta = 50-79
- Web moderna = 0-49

**Si vende SEO:**
- Sin meta tags + sin h1 + sin content = 90-100
- SEO parcial (title pero sin description) = 60-89
- SEO básico cubierto = 30-59
- SEO bien hecho = 0-29

**Si vende marketing/redes:**
- Sin redes sociales = 90-100
- Redes con pocos seguidores/sin actividad = 60-89
- Redes activas pero sin estrategia = 30-59
- Marketing digital completo = 0-29

Adapta el scoring al servicio que ofrece el usuario.

---

## Paso 4 — Generar el informe HTML

Dashboard visual con todos los prospectos. Libertad creativa total en diseño.

### Contenido obligatorio

1. **Resumen ejecutivo** — Total encontrados, distribución por nivel de oportunidad (gráfico), top 5 recomendados

2. **Tabla de prospectos** — Ordenada por oportunidad, con:
   - Nombre del negocio (link a su web si tiene)
   - Teléfono y email (si encontrados)
   - Dirección
   - Score de oportunidad (barra visual de color)
   - Nivel digital (bajo/medio/alto con badge)
   - Problemas detectados (lista corta)
   - Link a Google Maps si está disponible

3. **Ficha detallada de los top 5-10** — Para los mejores prospectos:
   - Análisis completo de su presencia digital
   - 3 problemas concretos encontrados
   - Propuesta de valor personalizada para ese negocio
   - Mensaje de contacto en frío listo para enviar (personalizado con datos reales del negocio y problemas detectados)

4. **Estadísticas del nicho** — Vista general del sector:
   - % sin web
   - % sin HTTPS
   - % sin SEO
   - % sin redes sociales
   - Conclusión sobre la oportunidad del nicho

5. **Datos exportables** — Tabla de contactos con botón para copiar todos los emails/teléfonos

### Sobre los mensajes de contacto

Los mensajes deben ser:
- **Personalizados** con el nombre del negocio y un problema real encontrado
- **Concretos** — no genéricos, que el destinatario sienta que has mirado su web de verdad
- **Cortos** — máximo 5-6 líneas
- **Sin presión** — ofrecer valor, no vender agresivamente

---

## Paso 5 — Guardar y presentar

- Guarda como `prospeccion-[nicho]-[ciudad].html`
- Guarda también `prospeccion-[nicho]-[ciudad].json` con los datos crudos (para CRM, Sheets, etc.)
- Abre el HTML en el navegador

Presenta:
1. Cuántos negocios encontraste y analizaste
2. Distribución de oportunidades
3. Top 3 prospectos en una frase
4. Pregunta si quiere profundizar en alguno o buscar más

No muestres precios sugeridos ni consejos de venta.

===END SKILL.md FOR prospeccion===

### 7. auditoria-negocio — Auditoría de presencia digital de un negocio

===BEGIN SKILL.md FOR auditoria-negocio===
---
name: auditoria-negocio
description: "Audita la presencia digital completa de un negocio: web, redes sociales, lo que vende, precios, ofertas, cómo vende, embudo de ventas, reputación y coherencia de marca. Detecta incoherencias, errores y mejoras. Usa esta skill cuando el usuario quiera auditar un negocio, analizar su presencia online, revisar cómo vende, detectar errores en su estrategia digital, o mejorar su negocio digital. Triggers: 'audita mi negocio', 'análisis digital', 'qué tal está mi presencia online', 'auditoría de mi marca', 'cómo mejorar mi negocio digital', 'revisa mi negocio', 'qué estoy haciendo mal', 'analiza cómo vendo'."
---

# Auditoría de Negocio Digital

Le das la información de un negocio y Claude audita TODO: web, redes sociales, lo que vende, cómo lo vende, precios, ofertas, embudo de ventas, coherencia de marca, reputación y competencia. Genera un informe ejecutivo con errores, incoherencias y plan de acción.

**Regla fundamental: análisis honesto y basado en datos reales.** No suavices los problemas ni exageres los aciertos. El valor de una auditoría está en la verdad.

---

## Paso 1 — Recoger toda la información del negocio

Pregunta al usuario todo lo necesario. Agrupa en 2 mensajes:

### Bloque 1 — Lo básico

- **URL de la web** (si tiene)
- **Redes sociales** — Instagram, TikTok, YouTube, LinkedIn, Facebook, Twitter/X (las que tenga, con @ o URLs)
- **¿Qué vende exactamente?** — productos, servicios, cursos, consultoría, etc.
- **¿A qué precio?** — rangos, tarifas, si tiene ofertas activas
- **¿Quién es su cliente ideal?** — a quién se dirige

### Bloque 2 — Contexto estratégico

- **¿Cuál es su objetivo principal ahora?** — más ventas, más leads, más visibilidad, lanzar algo nuevo...
- **¿Tiene competidores directos que conozca?** — 1-2 URLs o nombres para comparar
- **¿Qué canales usa para vender?** — web directa, redes sociales, email marketing, ads, boca a boca...
- **¿Tiene algo que crea que no funciona?** — a veces el usuario ya sabe dónde le duele

Si el usuario no quiere dar mucho contexto, trabaja con lo que te dé. Puedes investigar el resto por tu cuenta.

---

## Paso 2 — Investigar y auditar

Usa WebSearch, WebFetch y Bash para recopilar toda la info posible. Investiga a fondo antes de opinar.

### 2A. Web (si tiene)

Con WebFetch analiza:
- **Primera impresión** — ¿se entiende qué vende en los primeros 5 segundos? ¿El h1 y hero son claros?
- **Propuesta de valor** — ¿está diferenciada o es genérica ("los mejores", "calidad y servicio")?
- **CTA (llamadas a la acción)** — ¿hay botones claros? ¿Hacia dónde llevan? ¿Cuántos clicks hasta la compra/contacto?
- **Precios** — ¿son visibles o hay que pedir presupuesto? ¿Las ofertas están claras? ¿Hay incoherencias entre precios de la web y redes?
- **Testimonios / Social proof** — ¿tiene pruebas de que funciona?
- **Lead magnet / Captación** — ¿captura emails? ¿Tiene formularios? ¿Pop-ups?
- **Email marketing** — buscar en el código: Mailchimp, ConvertKit, ActiveCampaign, Brevo, etc.
- **Chat / WhatsApp** — ¿tiene canal de contacto rápido?
- **Velocidad y técnico** — tiempo de respuesta, HTTPS, responsive

### 2B. Redes sociales

Para cada red que tenga, usa Playwright (si disponible) o WebFetch + WebSearch:

- **Bio** — ¿es clara? ¿Dice qué hace y para quién? ¿Tiene CTA?
- **Link en bio** — ¿lleva a la oferta correcta o a una home genérica?
- **Contenido** — ¿qué tipo de posts hace? ¿Educativo, entretenimiento, venta directa?
- **Frecuencia** — ¿cada cuánto publica? ¿Hay gaps largos sin publicar?
- **Coherencia visual** — ¿los colores, tono y estilo son consistentes entre redes y web?
- **Engagement** — ¿tiene interacción real o solo publica y nadie responde?
- **Seguidores vs interacción** — ratio sano o seguidores inflados con 0 engagement

### 2C. Lo que vende y cómo lo vende

Esto es la parte más importante. Analiza:

- **Oferta** — ¿qué vende exactamente? ¿Está bien definido o es confuso?
- **Precio** — ¿es coherente con el posicionamiento? ¿Se posiciona premium pero el precio es bajo? ¿O al revés?
- **Ofertas activas** — ¿tiene descuentos, bonos, paquetes? ¿Tienen sentido o son confusas?
- **Página de ventas** — ¿hay una página específica para cada producto/servicio o está todo mezclado?
- **Proceso de compra** — ¿cuántos pasos del "quiero esto" al "lo he comprado"? ¿Hay fricción?
- **Incoherencias** — ¿dice una cosa en Instagram y otra en la web? ¿Los precios no cuadran? ¿La oferta de Stories es diferente a la de la web?

### 2D. Anuncios (Meta Ads Library)

Busca si el negocio tiene anuncios activos en la Biblioteca de Anuncios de Meta:

1. Usa WebFetch o Playwright para acceder a `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&q=[nombre del negocio]`
2. También busca con WebSearch: `"[nombre negocio]" site:facebook.com/ads/library`

Si tiene anuncios activos, analiza:
- **¿Cuántos anuncios tiene activos?**
- **¿Desde cuándo están corriendo?** — un anuncio activo mucho tiempo suele ser rentable
- **¿Qué tipo de creativos usa?** — imagen, vídeo, carrusel
- **¿Qué mensaje/copy usan los anuncios?** — ¿es coherente con lo que dice en la web y redes?
- **¿Hacia dónde llevan?** — ¿a la home genérica o a una landing específica?
- **¿El CTA del anuncio es claro?**
- **Incoherencias ads vs web** — ¿el anuncio promete algo que la web no refleja? ¿Los precios del ad no cuadran con los de la web?

Si NO tiene anuncios: registrarlo como observación (no necesariamente es un error — depende del tipo de negocio).

### 2E. Análisis del Copy

Analiza el lenguaje y los textos que usa el negocio en todos sus canales:

- **¿Habla para su cliente ideal o para sí mismo?** — muchos negocios hablan de lo que hacen en vez de lo que el cliente consigue
- **¿Usa lenguaje que su audiencia entiende?** — tecnicismos innecesarios, jerga del sector que el cliente no conoce
- **¿Los títulos son claros y atractivos?** — o son genéricos tipo "Bienvenido a nuestra web"
- **¿Tiene un mensaje diferenciador?** — ¿por qué elegirle a él y no a otro? ¿Lo comunica?
- **¿El tono es coherente entre canales?** — ¿mismo tono en web, Instagram, ads, emails?
- **¿Usa prueba social en el copy?** — números, resultados, testimonios integrados en el texto
- **¿Responde objeciones?** — ¿anticipa las dudas del cliente antes de que las piense?
- **¿Los CTAs son específicos o genéricos?** — "Reserva tu plaza" es mejor que "Enviar", "Empieza tu transformación" es mejor que "Más información"

Compara el copy de la web vs redes vs ads (si tiene). Las incoherencias de tono o mensaje son un hallazgo importante.

### 2F. Customer Journey completo

No solo el embudo de venta — mapea todo el recorrido del cliente, incluido lo que pasa DESPUÉS de comprar:

**PRE-VENTA:**
```
Descubrimiento → Primera impresión → Investigación → Consideración → Decisión
```
- ¿Cómo te descubren? (redes, Google, ads, referidos)
- ¿Qué ven primero? ¿Engancha?
- ¿Pueden investigar fácilmente? (precios, testimonios, portfolio)
- ¿Hay algo que resuelva objeciones? (FAQ, garantías, prueba gratis)
- ¿El proceso de compra/contacto es sencillo?

**POST-VENTA:**
- ¿Hay seguimiento después de la compra? (email de bienvenida, onboarding)
- ¿Tiene sistema de upsell/cross-sell? (otros productos/servicios relacionados)
- ¿Pide reseñas o referidos?
- ¿Tiene programa de fidelización o recurrencia?
- ¿Mantiene comunicación con clientes existentes? (newsletter, comunidad)

Los negocios que solo se centran en captar y no en retener pierden mucho dinero. Detectar si tiene post-venta es un hallazgo muy valioso.

### 2G. Google Maps / Google Business

Busca la ficha de Google Business del negocio:

1. WebSearch: `"[nombre negocio]" "[ciudad]" google maps`
2. O directamente en la web, buscar si tiene link a Google Maps

Si tiene ficha, analiza:
- **¿Está reclamada y verificada?**
- **¿Tiene fotos?** — ¿cuántas? ¿Son profesionales o parecen hechas con el móvil de hace 5 años?
- **¿Tiene descripción del negocio?**
- **¿Horarios actualizados?**
- **Puntuación media** — ¿cuántas estrellas? ¿Cuántas reseñas?
- **¿Responde a las reseñas?** — tanto positivas como negativas. No responder reseñas negativas es un error grave.
- **¿Las reseñas mencionan problemas recurrentes?** — si 3 reseñas hablan de lo mismo, es un patrón real
- **¿La info de Google Business coincide con la web?** — horarios, teléfono, dirección, servicios

Si NO tiene ficha de Google Business y es un negocio local: es un error grave y un quick win inmediato.

### 2H. Competencia (análisis profundo)

Si el usuario dio competidores, haz un análisis serio, no superficial:

**Comparar oferta vs oferta:**
- ¿Qué venden los competidores? ¿A qué precio?
- ¿Dónde está posicionado el auditado respecto a sus competidores? (más caro, más barato, similar)
- ¿La diferencia de precio se justifica con la diferencia de valor?

**Comparar presencia digital:**
- Web: ¿cuál se ve más profesional? ¿Cuál convierte mejor?
- Redes: ¿quién tiene más engagement real (no solo seguidores)?
- SEO: ¿quién aparece primero en Google para las keywords del sector?
- Ads: ¿los competidores hacen publicidad? ¿Con qué mensajes?

**Comparar posicionamiento:**
- ¿Hablan al mismo público o a segmentos diferentes?
- ¿Hay un hueco que nadie está ocupando?
- ¿El auditado tiene algo que los competidores no? ¿Lo comunica?

**Oportunidades de diferenciación:**
- Lista concreta de cosas que el auditado podría hacer diferente
- No genéricas ("ser más innovador") sino específicas ("ofrecer garantía de devolución que ningún competidor ofrece")

---

## Paso 3 — Detectar incoherencias y errores

Esta es la parte que más valor aporta. Busca activamente:

### Incoherencias comunes

- **Precio vs posicionamiento** — se vende como premium pero los precios son de gama baja (o al revés)
- **Mensaje vs audiencia** — habla como si vendiera a corporaciones pero su cliente es autónomo
- **Web vs redes** — tono formal en la web pero informal en Instagram (o al revés sin sentido)
- **Promesa vs entrega** — promete resultados en 30 días pero no tiene testimonios que lo demuestren
- **Ofertas contradictorias** — descuento del 50% en Instagram pero precio completo en la web
- **Bio vs realidad** — dice "experto en X" pero su contenido habla de Y
- **Muchos servicios sin foco** — hace de todo para todos (señal de que no tiene posicionamiento)

### Errores comunes

- No tener un CTA claro en ningún sitio
- No capturar emails (sin lead magnet, sin formularios)
- Redes sociales abandonadas (peor que no tenerlas)
- Blog muerto con último post de hace 1 año
- Precios ocultos que generan desconfianza
- Página de ventas que no responde objeciones
- Demasiados pasos para comprar/contactar
- Cero testimonios o social proof

---

## Paso 4 — Generar el informe HTML

Dashboard ejecutivo visual. Libertad creativa total en diseño.

### Contenido obligatorio

1. **Puntuación global** (0-100) con desglose visual por área:
   - Web y UX
   - SEO (versión resumida)
   - Redes Sociales
   - Anuncios (Meta Ads)
   - Copy y Comunicación
   - Oferta y Precios
   - Customer Journey (pre y post-venta)
   - Google Business / Maps
   - Contenido
   - Reputación
   - Coherencia de Marca
   - Competencia (si aplica)

2. **Resumen ejecutivo** — 3 párrafos máximo:
   - Estado actual (dónde está)
   - El problema principal (por qué no crece)
   - La oportunidad (qué puede ganar si lo arregla)

3. **Incoherencias y errores detectados** — Sección destacada con:
   - Cada incoherencia explicada de forma clara
   - Por qué es un problema
   - Cómo corregirla
   - Prioridad (alta/media/baja)

4. **Mapa del Customer Journey completo** — Diagrama visual del recorrido COMPLETO:
   ```
   [Descubrimiento] → [Primera visita] → [Interés] → [Conversión] → [Post-venta] → [Retención/Referidos]
   ```
   Con indicación clara de dónde se pierden los clientes y qué fases no existen.

5. **Análisis de Ads** — Si tiene anuncios en Meta: cuántos, desde cuándo, qué dicen, coherencia con la web. Si no tiene: indicar si debería tenerlos.

6. **Análisis del Copy** — Hallazgos sobre el lenguaje: ¿habla para el cliente o para sí mismo? ¿CTAs genéricos? ¿Tono coherente entre canales? Ejemplos concretos de mejoras con antes/después.

7. **Google Business** — Estado de la ficha, reseñas, fotos, si responde a reseñas negativas.

5. **Desglose por área** — Cada pilar con:
   - Puntuación
   - Lo que está bien
   - Lo que está mal
   - Acciones concretas

6. **Plan de acción priorizado** — Tabla con:
   | Prioridad | Acción | Impacto | Esfuerzo | Área |

7. **Quick wins** — Las 3-5 cosas que puede hacer esta semana:
   - Qué hacer (concreto)
   - Resultado esperado
   - Tiempo estimado

8. **Comparativa con competencia** (si aplica) — Tabla lado a lado

### Requisitos del dashboard

- Responsive
- Autocontenido (CSS y JS inline)
- Imprimible / exportable a PDF
- Navegación interna
- Tono profesional pero directo — que no parezca un informe de consultoría genérico

---

## Paso 5 — Guardar y presentar

- Guarda como `auditoria-negocio-[dominio].html`
- Abre automáticamente en el navegador

Presenta:
1. Puntuación global
2. El problema principal del negocio en una frase
3. Los 3 quick wins más urgentes
4. Pregunta si quiere profundizar en algún área o que aplique correcciones

No muestres precios sugeridos ni consejos de venta.

===END SKILL.md FOR auditoria-negocio===

### 8. auditoria-meta-ads — Auditoría de campañas de Meta Ads

===BEGIN SKILL.md FOR auditoria-meta-ads===
---
name: auditoria-meta-ads
description: "Audita campañas de Meta Ads (Facebook/Instagram Ads) analizando los anuncios activos en la Biblioteca de Meta, las landing pages a las que llevan, y la coherencia entre ad y landing. Usa esta skill cuando el usuario quiera auditar sus anuncios, mejorar sus campañas de Facebook/Instagram Ads, analizar landing pages, o entender por qué sus ads no convierten. Triggers: 'audita mis Meta Ads', 'analiza mis anuncios de Facebook', 'por qué no convierten mis ads', 'auditoría de landing page', 'mejorar mis campañas', 'revisa mis Facebook Ads', 'analiza mis Instagram Ads', 'auditoría de anuncios'."
---

# Auditoría Meta Ads + Landing Pages

Analiza los anuncios activos de un negocio en la Biblioteca de Meta, las landing pages a las que llevan, y la coherencia entre ambos. Genera un informe con puntuación y correcciones para aumentar conversiones.

**Regla fundamental: análisis basado en datos reales.** Solo analiza anuncios que existan realmente en la Biblioteca de Meta. No inventes métricas de rendimiento que no puedes ver.

**Regla de formato: el resultado SIEMPRE es un archivo HTML.** No entregues el análisis como texto en el chat. Usa la herramienta Write para guardar el archivo `auditoria-meta-ads-[nombre].html` y luego ábrelo con `open [archivo]`. El HTML es el único entregable válido.

---

## Paso 1 — Recoger información

Pregunta al usuario:

- **Nombre de su página de Facebook o negocio** — para buscar en la Biblioteca de Ads
- **URL de la landing page principal** (si tiene)
- **¿Qué vende?** — producto, servicio, lead magnet, curso...
- **¿A qué precio?** — o si es captación de leads sin venta directa
- **¿Tiene datos de rendimiento?** — CTR, CPC, tasa de conversión, ROAS (opcional, si los tiene es oro)
- **¿Quién es su público objetivo?**

---

## Paso 2 — Extraer anuncios de la Biblioteca de Meta

### 2A. Buscar anuncios activos

Usa WebFetch o Playwright para acceder a la Biblioteca de Anuncios de Meta:

```
https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&q=[nombre del negocio]
```

También busca con WebSearch:
- `"[nombre negocio]" site:facebook.com/ads/library`
- `"[nombre negocio]" facebook ads library`

### 2B. Lo que extraer de cada anuncio

Para cada anuncio activo encontrado:
- **Creatividad**: ¿imagen, vídeo o carrusel?
- **Copy del anuncio**: texto principal, headline, descripción
- **CTA del anuncio**: qué botón usa (Más información, Comprar, Registrarse...)
- **URL de destino**: ¿a dónde lleva? ¿Landing específica o home genérica?
- **Fecha de inicio**: desde cuándo está activo (un ad activo mucho tiempo = probablemente rentable)
- **Plataformas**: Facebook, Instagram, Audience Network, Messenger
- **Variantes**: ¿tiene varias versiones del mismo anuncio? (A/B testing)

### 2C. Si no encuentra anuncios

Si el negocio no tiene anuncios activos:
- Informar al usuario
- Ofrecer auditar solo la landing page
- Sugerir qué tipo de anuncios debería crear según su negocio y público

---

## Paso 3 — Auditar los anuncios

Para cada anuncio encontrado, analiza:

### Creatividad
- **¿Capta la atención en los primeros 3 segundos?** — en Meta Ads compites con el scroll infinito
- **¿Se entiende la oferta sin leer el texto?** — muchas personas no leen, solo ven la imagen/vídeo
- **¿Tiene texto dentro de la imagen?** — Meta penaliza imágenes con más del 20% de texto
- **¿Es genérica o específica?** — fotos de stock vs fotos reales del producto/servicio
- **¿Muestra el resultado o el proceso?** — la gente compra resultados

### Copy del anuncio
- **Primera línea** — ¿engancha? ¿Tiene hook? La primera línea es lo que se ve antes de "Ver más"
- **¿Habla del beneficio o de la característica?** — "Pierde 5kg en 30 días" > "Programa nutricional avanzado"
- **¿Incluye prueba social?** — números, resultados, testimonios en el copy
- **¿Tiene CTA claro en el texto?** — además del botón
- **¿Usa emojis de forma estratégica o abusiva?**
- **Longitud** — ¿es adecuada para el tipo de oferta? (tráfico frío necesita más copy, retargeting menos)

### Estructura de campaña (si se puede inferir)
- **¿Cuántos anuncios activos tiene?** — pocos puede ser peligroso (fatiga), muchos puede ser desenfocado
- **¿Hay variantes?** — señal de que hace testing (bueno)
- **¿Los mensajes son consistentes?** — o cada anuncio dice algo distinto
- **¿Mezcla formatos?** — imagen + vídeo + carrusel = buena práctica

### Comentarios en los anuncios

Si puedes acceder a los comentarios de los anuncios (vía Playwright navegando al ad en Facebook), analízalos:

- **Objeciones reales** — ¿la gente pregunta sobre el precio, la garantía, los plazos? Esas son las objeciones que la landing debería responder
- **Quejas** — ¿hay quejas recurrentes? ¿Sobre qué?
- **Preguntas frecuentes** — ¿preguntan siempre lo mismo? Señal de que la info no está clara en el ad ni en la landing
- **Sentimiento general** — ¿positivo, negativo, escéptico?
- **¿Responde el negocio a los comentarios?** — no responder es perder ventas en público

Los comentarios son la investigación de mercado más honesta que existe — la gente dice exactamente lo que piensa.

---

## Paso 3B — Analizar ads de competidores

Si el usuario proporcionó competidores (o puedes inferirlos del sector):

1. Busca sus anuncios en la Biblioteca de Meta con la misma técnica
2. Para cada competidor analiza:
   - **¿Cuántos ads activos tienen?** — más ads = más inversión = más serio
   - **¿Qué mensajes usan?** — ¿ángulos diferentes al auditado?
   - **¿Qué ofertas hacen?** — precios, bonos, garantías
   - **¿Qué formatos usan?** — vídeo, imagen, carrusel
   - **¿Desde cuándo están activos sus mejores ads?** — ads con meses activos = probablemente rentables (referencia para el auditado)
   - **¿A dónde llevan?** — ¿landing específica o home?

3. Comparativa directa:
   - ¿El auditado tiene más o menos ads que la competencia?
   - ¿Sus mensajes son más fuertes o más débiles?
   - ¿Los competidores están usando ángulos que el auditado no ha probado?
   - **Oportunidades**: mensajes, ofertas o formatos que la competencia usa con éxito y el auditado no

---

## Paso 3C — Benchmarks del sector

Contextualiza los datos con benchmarks medios. Busca con WebSearch datos actualizados de benchmarks de Meta Ads para el sector del usuario:

- `"Meta Ads benchmarks [sector] 2025 2026 CTR CPC"`
- `"Facebook Ads average CTR [industry]"`

**Benchmarks de referencia generales (si no encuentras del sector):**

| Métrica | Media general | Bueno | Excelente |
|---------|-------------|-------|-----------|
| CTR (link) | 1.5-2% | 2-3% | >3% |
| CPC | 0.50-1.50€ | <0.50€ | <0.30€ |
| CPM | 8-15€ | <8€ | <5€ |
| Tasa de conversión landing | 2-5% | 5-10% | >10% |
| ROAS | 2-3x | 3-5x | >5x |

Si el usuario proporcionó sus datos de rendimiento, compáralos con los benchmarks y resalta:
- Métricas que están por debajo de la media (problemas)
- Métricas que están por encima (fortalezas)
- Dónde tiene más margen de mejora

Si no tiene datos de rendimiento, usa los benchmarks como referencia para estimar qué debería esperar.

---

## Paso 4 — Auditar la landing page

Para cada URL de destino de los anuncios, analiza con WebFetch:

### Above the fold (lo primero que se ve)
- **¿El headline coincide con el mensaje del anuncio?** — el "message match" es crítico
- **¿Hay CTA visible sin hacer scroll?**
- **¿La propuesta de valor es clara en 5 segundos?**
- **¿Hay imagen/vídeo que refuerce el mensaje?**

### Copy de la landing
- **¿Habla de beneficios o de características?**
- **¿Usa el lenguaje del cliente?** — no jerga técnica
- **¿Aborda objeciones?** — "¿Es para mí?", "¿Funciona?", "¿Y si no me gusta?"
- **¿Sigue una estructura persuasiva?** — AIDA (Atención, Interés, Deseo, Acción) o PAS (Problema, Agitación, Solución)
- **¿La longitud es adecuada?** — oferta cara = más copy, lead magnet gratis = menos

### CTA y conversión
- **¿Cuántos CTAs hay?** — ideal: 1 principal repetido 2-3 veces
- **¿El texto del botón es específico?** — "Quiero mi plan gratis" > "Enviar"
- **¿El botón contrasta visualmente?**
- **¿Hay urgencia/escasez?** — plazas limitadas, countdown, oferta temporal

### Social proof
- **¿Hay testimonios?** — ¿con nombre, foto, resultado concreto?
- **¿Hay números de prueba social?** — "X clientes", "X resultados"
- **¿Hay logos de clientes/medios/certificaciones?**
- **¿Hay garantía?**

### Formulario (si es captación de leads)
- **¿Cuántos campos?** — menos = más conversión en tráfico frío
- **¿Pide solo lo necesario?**
- **¿El botón tiene texto de acción?**

### Técnico
- **¿Tiene pixel de Facebook?** — buscar `fbq(` o `facebook.com/tr` en el código
- **¿Tiene eventos de conversión?** — buscar `fbq('track',`
- **¿Es responsive?**
- **¿Carga rápido?** — tiempo de respuesta con curl
- **¿HTTPS?**
- **¿Tiene Google Analytics u otro tracking?**

---

## Paso 5 — Coherencia Ad ↔ Landing

Este es el análisis más valioso. Compara cada anuncio con su landing de destino:

- **Message match** — ¿el headline del ad coincide con el headline de la landing? Si el ad dice "Pierde 5kg en 30 días" y la landing dice "Bienvenido a nuestra web de nutrición", hay un desconexión que mata la conversión.
- **Oferta match** — ¿la oferta es exactamente la misma? ¿El precio cuadra?
- **Visual match** — ¿los colores, estilo y tono son coherentes?
- **CTA match** — ¿lo que promete el botón del ad es lo que encuentra en la landing?
- **Público match** — ¿el tono del ad habla al mismo público que la landing?

Puntúa el message match de 0-100. Cualquier cosa por debajo de 70 es un problema serio.

---

## Paso 6 — Generar el informe HTML (OBLIGATORIO)

**Este paso no es opcional.** Toda auditoría termina con un archivo HTML guardado con Write. Nunca respondas con el análisis solo en texto.

Dashboard visual. Libertad creativa total en diseño.

### Contenido obligatorio

1. **Puntuación global** (0-100) con veredicto:
   - 80-100: "Campaña bien optimizada — ajustes menores"
   - 60-79: "Campaña funcional — hay margen de mejora significativo"
   - 40-59: "Campaña con problemas — correcciones necesarias"
   - 0-39: "Campaña no optimizada — rediseño recomendado"

2. **Resumen de anuncios encontrados** — Cuántos ads activos, desde cuándo, qué formatos, qué mensajes. Vista rápida de todos los anuncios.

3. **Análisis ad por ad** — Para cada anuncio:
   - Copy analizado con hallazgos
   - Puntuación de la creatividad
   - URL de destino y su análisis
   - Message match score con la landing

4. **Análisis de la landing** — Los puntos auditados con:
   - Puntuación por área
   - Lo que está bien / lo que falla
   - Correcciones con código exacto o copy alternativo

5. **Incoherencias Ad ↔ Landing** — Sección destacada con cada desconexión encontrada y cómo resolverla

6. **Reescrituras sugeridas** — Para los elementos que fallan:
   - 3 headlines alternativos para la landing
   - CTA alternativo
   - Copy mejorado para secciones débiles
   - Hook alternativo para el primer línea del ad

7. **Checklist de implementación** — Ordenada por impacto:
   - Cada corrección con impacto estimado (alto/medio/bajo) y tiempo
   - Las de mayor impacto primero

8. **Benchmarks** — Tabla comparativa de los datos del usuario (si los proporcionó) vs media del sector. Resaltar dónde está por debajo y por encima.

9. **Análisis de competidores** (si aplica) — Comparativa de ads: cuántos tienen, qué mensajes usan, qué ofertas, qué hacen que el auditado no.

10. **Insights de los comentarios** (si se pudieron extraer) — Objeciones reales de la audiencia, preguntas frecuentes, sentimiento general. Estas son recomendaciones directas para mejorar tanto los ads como la landing.

11. **Pack de nuevos anuncios listos para lanzar** — Genera 3-5 anuncios nuevos completos, no solo ideas:

   Para cada anuncio nuevo incluye:
   - **Hook** (primera línea que engancha)
   - **Copy completo** del anuncio (texto principal)
   - **Headline** (el título bajo la imagen)
   - **Descripción**
   - **CTA recomendado** (botón)
   - **Ángulo/enfoque** (por qué este ángulo puede funcionar)
   - **Formato sugerido** (imagen, vídeo, carrusel)
   - **Briefing del creativo** (qué debería mostrar la imagen/vídeo)

   Usa ángulos diferentes para cada uno:
   - Ángulo de resultado ("Conseguí X en Y tiempo")
   - Ángulo de problema ("¿Cansado de X?")
   - Ángulo de prueba social ("Más de X personas ya...")
   - Ángulo de curiosidad ("El método que nadie te cuenta")
   - Ángulo de contraste ("Antes hacía X, ahora hago Y")

   Los copies deben estar escritos para el público objetivo del usuario, con su tono y su lenguaje. Listos para copiar y pegar en el Ads Manager.

### Requisitos del dashboard
- Responsive
- Autocontenido
- Imprimible
- Que incluya los textos de los anuncios reales dentro del informe

---

## Paso 7 — Guardar y presentar

- Guarda como `auditoria-meta-ads-[nombre].html`
- Abre en el navegador

Presenta:
1. Cuántos anuncios analizados
2. Puntuación global
3. El problema principal (la mayor fuga de conversión)
4. Top 3 correcciones con mayor impacto
5. Pregunta si quiere que reescriba copies, headlines o CTAs

No muestres precios sugeridos ni consejos de venta.

===END SKILL.md FOR auditoria-meta-ads===

### 9. extension-chrome — Crea extensiones de Chrome

===BEGIN SKILL.md FOR extension-chrome===
---
name: extension-chrome
description: "Crea extensiones de Chrome personalizadas desde cero, listas para instalar. Usa esta skill cuando el usuario quiera crear una extensión de navegador, plugin para Chrome, herramienta que funcione en el navegador, o automatizar algo dentro de una web. Triggers: 'extensión Chrome', 'plugin para el navegador', 'extensión que haga X', 'add-on de Chrome', 'herramienta para el navegador', 'quiero una extensión', 'crear extensión', 'chrome extension'."
---

# Extensión Chrome Personalizada

Le dices qué necesitas y Claude genera una extensión de Chrome completa y funcional, lista para instalar en 2 minutos. Manifest V3, popup con diseño premium, y toda la lógica funcionando.

**Regla fundamental: la extensión debe funcionar al instalarla.** Nada de código a medias o funciones placeholder. Todo lo que generes debe ser funcional y testeado.

---

## Paso 1 — Entender qué necesita el usuario

Pregunta:
- **¿Qué quieres que haga la extensión?** — describe el comportamiento que quieres
- **¿En qué webs debe funcionar?** — todas, solo YouTube, solo LinkedIn, webs específicas...
- **¿Necesita una ventanita (popup)?** — si necesita interfaz visible al clickar el icono
- **¿Necesita guardar datos?** — configuración, historial, contadores, notas...

Si el usuario no sabe qué extensión crear, proponle ideas según su contexto:

**Para productividad:** Pomodoro timer, bloqueador de distracciones, contador de tiempo en webs, quick notes
**Para ventas/marketing:** Extractor de emails, extractor de datos de LinkedIn, tracker de precios, captura de leads
**Para desarrollo:** Color picker, inspector de fuentes, medidor de elementos, captura de pantalla
**Para contenido:** Resaltador de texto, traductor hover, lector de artículos limpio, guardador de referencias
**Para uso personal:** Dark mode universal, custom CSS injector, bloqueador de cookies popups, speed controller de vídeos

---

## Paso 2 — Generar la extensión completa

Crea una carpeta con todos los archivos. La estructura depende de lo que necesite:

```
extension-[nombre]/
├── manifest.json       → Configuración (siempre Manifest V3)
├── popup.html          → Interfaz del popup (si aplica)
├── popup.css           → Estilos
├── popup.js            → Lógica del popup
├── content.js          → Script inyectado en las webs (si aplica)
├── background.js       → Service worker (si aplica)
├── styles.css          → Estilos inyectados en webs (si aplica)
└── icons/
    ├── icon16.svg      → Icono 16x16
    ├── icon48.svg      → Icono 48x48
    └── icon128.svg     → Icono 128x128
```

### Manifest V3 (obligatorio)

Siempre usa Manifest V3 (V2 está deprecado). Solo incluye los permisos que realmente necesita:

- `"storage"` — guardar datos del usuario
- `"activeTab"` — acceder a la pestaña actual (al hacer click en la extensión)
- `"tabs"` — gestionar pestañas
- `"scripting"` — inyectar scripts dinámicamente
- `"alarms"` — temporizadores y alarmas
- `"notifications"` — notificaciones del sistema
- `"contextMenus"` — menú click derecho

No pidas `"<all_urls>"` ni permisos amplios si no son necesarios — Chrome los penaliza en la revisión.

### Popup con diseño premium

Si la extensión tiene popup, haz que se vea profesional. Libertad creativa total, pero:
- Ancho fijo razonable (320-400px)
- Tema oscuro o claro según la función
- Fuentes del sistema (no Google Fonts — no se cargan en popups)
- Transiciones suaves
- Estados claros (on/off, activo/inactivo)
- Footer con versión

### Iconos

Genera iconos como SVG — funcionan directamente en Chrome sin conversión:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  <rect width="128" height="128" rx="28" fill="#667eea"/>
  <text x="50%" y="55%" font-size="56" fill="white" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-weight="bold">🔥</text>
</svg>
```

Adapta el color y el emoji/texto al propósito de la extensión.

### Content Scripts (si modifica webs)

Si la extensión inyecta contenido en páginas web:
- Usa `matches` específicos, no `"<all_urls>"` cuando sea posible
- Aísla los estilos para no romper la web (usa prefijos únicos en clases CSS)
- Limpia los elementos cuando la extensión se desactiva
- Maneja errores — la web puede cambiar su estructura

### Background Service Worker

Si necesita lógica en segundo plano:
- Recuerda que en Manifest V3 los service workers se duermen — no confíes en variables globales persistentes
- Usa `chrome.storage` para persistir estado
- Usa `chrome.alarms` para tareas periódicas (no `setInterval`)

### Comunicación entre componentes

Si popup, content script y background necesitan comunicarse:
- Popup ↔ Background: `chrome.runtime.sendMessage`
- Content ↔ Background: `chrome.runtime.sendMessage`
- Background → Content: `chrome.tabs.sendMessage`

---

## Paso 3 — Testear

Después de generar todos los archivos:

1. Verifica que `manifest.json` es JSON válido
2. Verifica que todos los archivos referenciados existen
3. Verifica que los permisos son los mínimos necesarios
4. Si puedes, abre la extensión en Chrome para verificar que no hay errores de consola

---

## Paso 4 — Instrucciones de instalación

Crea un `README.md` dentro de la carpeta de la extensión:

```markdown
# [Nombre de la Extensión]

[Descripción de una línea]

## Instalación (2 minutos)

1. Abre Chrome y ve a `chrome://extensions/`
2. Activa **Modo desarrollador** (interruptor en la esquina superior derecha)
3. Click en **Cargar extensión sin empaquetar**
4. Selecciona esta carpeta
5. Verás el icono de la extensión en la barra de herramientas

## Cómo usar

[Instrucciones específicas de la extensión]

## Personalización

[Si aplica: cómo cambiar configuración, colores, webs objetivo, etc.]
```

---

## Paso 5 — Presentar el resultado

Muestra:
1. Nombre de la carpeta generada
2. Lista de archivos creados
3. Funcionalidades implementadas
4. Instrucciones de instalación en 5 pasos
5. Pregunta si quiere ajustar algo (diseño, funcionalidad, webs objetivo)

No muestres precios sugeridos ni consejos de venta.

===END SKILL.md FOR extension-chrome===

### 10. crear-skill — Skill que crea skills

===BEGIN SKILL.md FOR crear-skill===
---
name: crear-skill
description: "Crea nuevas skills de Claude Code desde cero. Es la skill que hace skills. Usa esta skill cuando el usuario quiera crear su propia skill, automatizar un flujo de trabajo, hacer que Claude repita un proceso, crear un comando personalizado, o convertir algo que hace manualmente en algo automático. Triggers: 'crea una skill', 'quiero hacer una skill', 'skill personalizada', 'automatizar esto como skill', 'crear un comando para Claude Code', 'convierte esto en una skill', 'quiero que Claude siempre haga X', 'skill para Y'."
---

# Skill Creator — Crea tus propias skills

Le describes un proceso que quieres automatizar y Claude genera una skill completa lista para usar. Es la herramienta que crea herramientas.

Las skills de Claude Code son archivos `.md` que le enseñan a Claude a hacer tareas específicas. Cualquier proceso que hagas de forma repetitiva puede convertirse en una skill.

---

## Paso 1 — Entender qué necesita el usuario

Pregunta de forma conversacional:

- **¿Qué quieres que haga Claude automáticamente?** — describe el resultado que esperas
- **¿Qué información necesita recibir?** — URL, texto, carpeta, datos, archivo...
- **¿Qué debe generar?** — HTML, informe, archivo, código, dashboard...
- **¿Lo vas a usar tú o se lo vas a dar a otras personas?**

Si el usuario ya describió suficiente (ej: "una skill que lea un CSV de productos y genere fichas de producto en HTML"), diseña directamente.

Si no sabe qué skill crear, proponle ideas:

**Para negocios:**
- Generador de propuestas comerciales (datos del cliente → propuesta PDF/HTML profesional)
- Calculadora de presupuestos (servicio + horas → presupuesto detallado)
- Generador de contratos (datos → contrato personalizado)
- Creador de presentaciones de ventas (producto → slides HTML)
- Onboarding de clientes (datos → carpeta + emails + documentos)

**Para marketing:**
- Generador de copy para ads (producto + público → variantes de anuncios)
- Planificador de contenido (nicho → calendario de 30 días con ideas)
- Creador de emails de venta (producto → secuencia de emails)
- Generador de posts para redes (tema → posts para IG, LinkedIn, X)

**Para desarrollo:**
- Generador de APIs (modelo de datos → API completa)
- Documentador de código (repositorio → documentación)
- Generador de tests (código → suite de tests)
- Scaffolding de proyectos (tipo de proyecto → estructura completa)

**Para productividad:**
- Resumidor de documentos (PDF → resumen ejecutivo)
- Transcriptor de reuniones (notas → acta formal)
- Generador de SOPs (proceso → documento de procedimiento paso a paso)
- Analizador de datos (CSV → dashboard con insights)

---

## Paso 2 — Diseñar la skill

Antes de escribir, planifica la estructura:

1. **Input** — qué recibe la skill (qué pregunta al usuario)
2. **Proceso** — qué pasos sigue (en orden)
3. **Herramientas** — qué necesita usar (WebFetch, Bash, Playwright, Read, Write, herramientas nativas de Claude Code)
4. **Output** — qué genera y en qué formato
5. **Experiencia de usuario** — cómo se siente usarla (mensajes amigables, flujo conversacional)

### Principios de diseño de skills (aprendidos de nuestras 9 skills anteriores)

Estos principios son los que hacen que una skill sea realmente buena:

**1. No inventes datos** — si la skill necesita información del usuario (servicios, precios, contacto, testimonios), pregúntala. Nunca la inventes. Si algo no está disponible, usa placeholders visibles o omite la sección.

**2. Datos reales primero, preguntas después** — si la skill puede obtener datos automáticamente (scraping, WebFetch, WebSearch), hazlo primero. Solo pregunta lo que no puedes encontrar solo.

**3. Auto-instalación de dependencias** — si necesita Playwright, npm packages o cualquier herramienta, la skill debe instalarlas automáticamente. Avisa al usuario con un mensaje amigable ("Estoy preparando las herramientas, tarda 30 segundos la primera vez").

**4. Libertad creativa en diseño** — si genera HTML/dashboards, no dictes CSS rígido. Describe el resultado visual deseado y deja que Claude diseñe libremente. Esto produce resultados más bonitos y únicos.

**5. Adaptación al contexto** — si la skill sirve para diferentes sectores/tipos (como la de web que se adapta a restaurante vs gimnasio), incluye una guía de adaptación.

**6. Flujo conversacional** — la skill debe funcionar como una conversación natural, no como un formulario. Agrupa preguntas en 2-3 bloques, no hagas interrogatorios largos.

**7. Fallbacks amigables** — si algo falla (scraping, instalación, etc.), no te bloquees. Ofrece alternativa y sigue adelante.

**8. Mensaje de bienvenida** — si la skill va en un kit independiente con CLAUDE.md, incluye un mensaje de bienvenida que se active con cualquier input del usuario.

**9. Sin precios sugeridos** — no incluir "como servicio" ni precios al final del output.

**10. Presentar resultado claro** — al terminar, mostrar qué se generó, qué datos se usaron, qué falta por completar, y preguntar si quiere ajustar algo.

---

## Paso 3 — Escribir la skill

Genera el archivo `.md` con esta estructura:

```markdown
---
name: nombre-en-kebab-case
description: "Descripción completa de qué hace y cuándo activarse. Incluir múltiples frases trigger variadas. Ser específico pero cubrir sinónimos y formas diferentes de pedir lo mismo."
---

# Nombre de la Skill

Una línea describiendo qué hace en lenguaje simple.

**Regla fundamental: [la regla más importante de esta skill]**

---

## Paso 1 — [Recoger información / Entender qué necesita]

[Flujo conversacional para obtener los datos necesarios]
[Qué intentar obtener automáticamente primero]
[Qué preguntar si falta]

---

## Paso 2 — [Procesar / Analizar / Investigar]

[La lógica principal de la skill]
[Qué herramientas usar y cómo]
[Adaptación según contexto si aplica]

---

## Paso 3 — [Generar el resultado]

[Qué formato tiene el output]
[Estructura del contenido]
[Libertad creativa en diseño si es HTML]

---

## Paso 4 — [Guardar y presentar]

[Cómo nombrar el archivo]
[Abrirlo automáticamente si es HTML]
[Resumen de lo generado]
[Preguntar si quiere ajustar]
```

### Reglas del archivo generado

**Frontmatter:**
- `name` en kebab-case, sin espacios ni mayúsculas
- `description` con al menos 5-8 frases trigger diferentes
- La description debe cubrir sinónimos y variaciones

**Instrucciones:**
- Escritas en imperativo (haz, pregunta, genera)
- Auto-suficientes — funcionar sin que el usuario sepa programar
- Si necesita dependencias, incluir comando exacto de instalación
- Si necesita APIs, explicar cómo obtener la key

**Herramientas:**
- Preferir herramientas nativas de Claude Code (Read, Write, WebFetch, WebSearch, Bash)
- Evitar dependencias externas cuando sea posible
- Si necesita Python/Node, que sea lo mínimo y con auto-instalación

---

## Paso 4 — Instalar la skill

Después de generarla, instálala automáticamente:

```bash
mkdir -p .claude/skills
cp [nombre-skill].md .claude/skills/
```

Si el usuario quiere que la skill esté disponible en todos sus proyectos (no solo en esta carpeta):

```bash
mkdir -p ~/.claude/skills
cp [nombre-skill].md ~/.claude/skills/
```

---

## Paso 5 — Crear el kit (si el usuario quiere compartirla)

Si la skill va a ser usada por otras personas, genera un kit completo:

```
kit-[nombre]/
├── CLAUDE.md                    ← Mensaje de bienvenida + qué hace
├── INSTRUCCIONES.md             ← Guía paso a paso para instalar y usar
├── .claude/
│   └── skills/
│       └── [nombre].md          ← La skill
└── [carpetas extra si necesita] ← assets/, facturas/, etc.
```

**CLAUDE.md** debe incluir:
- Sección "Comportamiento al iniciar" con mensaje de bienvenida
- Qué hace la skill
- Qué necesita del usuario
- Que no necesita nada instalado (si es el caso)

**INSTRUCCIONES.md** debe incluir:
- Requisitos (Claude Code + lo que necesite)
- Pasos numerados desde abrir la carpeta hasta ver el resultado
- Estructura de archivos

---

## Paso 6 — Testear

Después de instalar:

1. Simula que eres un usuario nuevo y escribe una frase que debería activar la skill
2. Verifica que las instrucciones son claras y completas
3. Si genera archivos, verifica que funcionan
4. Ajusta si algo no fluye bien

---

## Paso 7 — Presentar al usuario

Muestra:
1. Nombre y ruta del archivo generado
2. Frases que la activan
3. Qué input necesita y qué output genera
4. Si se creó kit, listar los archivos del kit
5. Instrucciones para usarla
6. Pregunta si quiere ajustar algo

No muestres precios sugeridos ni consejos de venta.

===END SKILL.md FOR crear-skill===


---

Cuando termines, dime:
1. Qué carpetas y archivos se han creado.
2. Si algún skill ya existía y ha quedado intacto.
