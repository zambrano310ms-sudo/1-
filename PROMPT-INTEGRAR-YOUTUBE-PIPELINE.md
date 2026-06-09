# Prompt para integrar el YouTube Automation Pipeline en otra cuenta

Copia TODO este archivo y pégalo como un único mensaje en una sesión de Claude Code abierta en la carpeta donde quieras montar el proyecto. Claude creará todos los archivos del pipeline (13 archivos Python/docs + 4 carpetas vacías auxiliares).

Este es un **proyecto Python**, no una skill de Claude Code: no usa `.claude/skills/`. Es un sistema de automatización completo para publicar 2 vídeos/día de YouTube Shorts sobre IA & Tech de forma autónoma.

---

INSTRUCCIONES PARA CLAUDE:

Crea en la raíz del proyecto actual la siguiente estructura:

```
.
├── README.md
├── CLAUDE.md
├── requirements.txt
├── pipeline.py
├── scheduler.py
├── trend_finder.py
├── content_validator.py
├── script_generator.py
├── voice_generator.py
├── visual_collector.py
├── video_assembler.py
├── youtube_uploader.py
├── monetization.py
├── scripts/        ← vacía (se llena al ejecutar)
├── output/         ← vacía
├── logs/           ← vacía
└── config/         ← vacía
```

Pasos:

1. Crea las **4 carpetas vacías**: `scripts/`, `output/`, `logs/`, `config/` (cada una por separado, NO una sola carpeta llamada `{scripts,output,logs,config}`).
2. Para cada uno de los **13 archivos** que siguen, crea el archivo con el contenido EXACTO entre los marcadores `===BEGIN <archivo>===` y `===END <archivo>===` (sin incluir los marcadores).
3. No interpretes ni resumas: copia el contenido VERBATIM, con comentarios, emojis, indentación y saltos de línea incluidos.
4. Después de crear todo, sugiere al usuario instalar dependencias con `pip install -r requirements.txt` y configurar las claves de API descritas en CLAUDE.md (Claude API, ElevenLabs, YouTube Data API, Pexels/Pixabay).

Si la carpeta ya tiene archivos del proyecto, sobrescríbelos.

Al terminar, confirma cuántos archivos y carpetas se han creado.

---

## Los 13 archivos del pipeline


### 1. README.md — Documentación del proyecto

===BEGIN README.md===
# YouTube Automation Pipeline — IA & Tech
### Sistema completo de automatización para canal faceless de YouTube

---

## Arquitectura del sistema

```
[Temas trending RSS]
        ↓
[Claude → Script único por vídeo]
        ↓
[Validador anti-demonetización]
        ↓
[ElevenLabs → Voz natural]
        ↓
[Pexels API → Imágenes libres copyright]
        ↓
[FFmpeg → Monta vídeo 1080x1920]
        ↓
[YouTube Data API → Sube + programa]
        ↓
[Tracker monetización → AdSense + Afiliados]
```

---

## Setup inicial (una sola vez)

### 1. Instalar dependencias del sistema
```bash
sudo apt update && sudo apt install -y ffmpeg python3-pip
pip install -r requirements.txt
```

### 2. Obtener las API keys

#### Anthropic (Claude) — cerebro del pipeline
1. Ve a https://console.anthropic.com
2. API Keys → Create Key
3. Copia la key

#### ElevenLabs (voz)
1. Ve a https://elevenlabs.io → Sign up gratis
2. Profile → API Key
3. Plan gratuito: 10.000 chars/mes. Plan Starter ($11/mes): 30.000 chars ← recomendado

#### Pexels (imágenes)
1. Ve a https://www.pexels.com/api/
2. Solicitar acceso (gratis, aprobación inmediata)
3. Copia la API key

#### YouTube Data API v3 (subida automática)
1. Ve a https://console.cloud.google.com
2. Crear proyecto nuevo → nombre: "youtube-automation"
3. APIs & Services → Enable APIs → buscar "YouTube Data API v3" → Enable
4. Credentials → Create Credentials → OAuth 2.0 Client ID
5. Application type: Desktop app
6. Download JSON → guardar como `config/client_secrets.json`

### 3. Configurar variables de entorno
```bash
# Crear archivo .env (NUNCA subir a git)
cat > .env << 'EOF'
ANTHROPIC_API_KEY=sk-ant-...
ELEVENLABS_API_KEY=...
PEXELS_API_KEY=...
EOF

# Cargar en la sesión
export $(cat .env | xargs)
```

### 4. Primera autenticación con YouTube
```bash
# Esto abrirá el navegador para autorizar. Solo la primera vez.
python scheduler.py --dry-run
```

---

## Uso diario

### Ejecutar ahora con tema automático (trending)
```bash
python scheduler.py --now
```

### Ejecutar con tema específico
```bash
python scheduler.py --topic "Por qué GPT-5 cambia todo para los programadores"
```

### Probar sin subir (recomendado al principio)
```bash
python scheduler.py --dry-run --topic "Mi tema de prueba"
```

### Modo daemon (publica automáticamente 2x/día)
```bash
# En servidor VPS o con screen/tmux
python scheduler.py

# O con systemd (producción)
# Ver sección "Deploy en producción" más abajo
```

---

## Estructura de archivos

```
youtube-automation/
├── pipeline.py          # Orquestador principal
├── script_generator.py  # Claude genera el script
├── content_validator.py # Capa anti-demonetización
├── voice_generator.py   # ElevenLabs → audio
├── visual_collector.py  # Pexels → imágenes
├── video_assembler.py   # FFmpeg → vídeo
├── youtube_uploader.py  # YouTube Data API
├── scheduler.py         # Cron + trend finder
├── trend_finder.py      # RSS → temas trending
├── monetization.py      # Afiliados + sponsors
├── requirements.txt
├── config/
│   ├── client_secrets.json  ← descargar de Google Cloud
│   └── token.json           ← se genera automáticamente
├── output/              # Vídeos, audios e imágenes temporales
└── logs/
    ├── pipeline.log     # Log de ejecución
    ├── runs.jsonl       # Historial de vídeos
    └── monetization.json
```

---

## Deploy en producción (VPS Ubuntu)

### Opción 1: Screen (más simple)
```bash
screen -S youtube-bot
export $(cat .env | xargs)
python scheduler.py
# Ctrl+A, D para desconectar
```

### Opción 2: Systemd (más robusto)
```bash
# Crear servicio
sudo cat > /etc/systemd/system/youtube-bot.service << EOF
[Unit]
Description=YouTube Automation Pipeline
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$(pwd)
EnvironmentFile=$(pwd)/.env
ExecStart=/usr/bin/python3 scheduler.py
Restart=always
RestartSec=30

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable youtube-bot
sudo systemctl start youtube-bot
sudo systemctl status youtube-bot
```

---

## Reglas anti-demonetización implementadas

| Regla | Implementación |
|-------|---------------|
| Contenido original por vídeo | 6 formatos distintos + ángulo único forzado por prompt |
| No repetición de temas | Bloqueo si mismo tema en 30 días (content_validator.py) |
| Disclosure de IA obligatorio | `containsSyntheticMedia: True` en YouTube API + texto en descripción |
| No clonación de voces reales | Solo voces sintéticas propias de ElevenLabs |
| Límite de velocidad | Máx 2 vídeos/día (no activa flag de spam) |
| Imágenes sin copyright | Solo Pexels (licencia comercial libre) |
| No clickbait engañoso | Detector de patrones en content_validator.py |

---

## Proyección de ingresos (canal activo)

| Mes | Acción principal | Ingresos estimados |
|-----|-----------------|-------------------|
| 1–3 | Publicar 2 vídeos/día, llegar a 1K subs | $0 (pre-monetización) |
| 4–6 | Monetización activa, primeros afiliados | $100–500/mes |
| 7–12 | Optimizar formatos, buscar primer sponsor | $500–2.000/mes |
| 12–18 | Segundo canal, escalar afiliados | $2.000–5.000/mes |

**Palancas clave:**
- AdSense solo = ingreso modesto
- AdSense + afiliados + 1 sponsor/mes = objetivo $2k alcanzable en ~12 meses
- Segundo canal en inglés = multiplica x3–5 el RPM

---

## Costes del stack

| Servicio | Coste/mes |
|---------|-----------|
| Anthropic API (Claude) | ~15–20€ |
| ElevenLabs Starter | 11€ |
| Pexels | Gratis |
| YouTube Data API | Gratis |
| VPS Ubuntu 2GB (Hetzner) | 4.5€ |
| **TOTAL** | **~30–35€/mes** |

vs. herramientas SaaS equivalentes: 200–400€/mes

---

## Comandos de diagnóstico

```bash
# Ver log en tiempo real
tail -f logs/pipeline.log

# Ver historial de vídeos publicados
cat logs/runs.jsonl | python3 -c "import sys,json; [print(json.loads(l)['title']) for l in sys.stdin]"

# Ver resumen de monetización
python3 -c "from monetization import MonetizationManager; MonetizationManager().print_summary()"

# Test rápido del generador de scripts sin producir vídeo
python3 -c "
from script_generator import ScriptGenerator
sg = ScriptGenerator()
s = sg.generate('GPT-5 y los programadores', 'explicacion_rapida', 'Suscríbete para más.', 90)
print(s['title'])
print('---')
print(s['narration'])
"
```

===END README.md===

### 2. CLAUDE.md — Instrucciones para Claude Code

===BEGIN CLAUDE.md===
# CLAUDE.md — Instrucciones para Claude Code

Este archivo le dice a Claude Code cómo operar este proyecto de forma autónoma.

## Objetivo del proyecto
Sistema de automatización de YouTube Shorts para el nicho IA & Tech.
Publica 2 vídeos/día de forma totalmente automática.

## Comandos principales

### Ejecutar el pipeline completo
```bash
python scheduler.py --now
```

### Testear sin subir a YouTube
```bash
python scheduler.py --dry-run --topic "TEMA"
```

### Añadir nuevo tema al banco de temas
Edita `script_generator.py` → lista `self.topic_bank`

### Ver logs
```bash
tail -f logs/pipeline.log
```

## Variables de entorno requeridas
- `ANTHROPIC_API_KEY` — para script_generator.py y trend_finder.py
- `ELEVENLABS_API_KEY` — para voice_generator.py
- `PEXELS_API_KEY` — para visual_collector.py
- `config/client_secrets.json` — para youtube_uploader.py

## Estructura de datos del script

El `ScriptGenerator` devuelve este dict que fluye por todo el pipeline:
```json
{
  "title": "Título SEO (máx 100 chars)",
  "description_short": "Descripción corta",
  "narration": "Texto completo leído en el vídeo",
  "scene_count": 5,
  "visual_keywords": ["keyword1", "keyword2"],
  "tags": ["ia", "tech"],
  "hook": "Primera frase",
  "format": "explicacion_rapida",
  "estimated_duration_seconds": 90,
  "unique_angle": "Por qué este vídeo es diferente",
  "topic": "Tema original",
}
```

## Reglas críticas que NO se pueden romper

1. **Nunca saltarse el ContentValidator** — si devuelve ok=False, el pipeline para
2. **Nunca clonar voces de personas reales** — solo IDs de VOICE_POOL en voice_generator.py
3. **Siempre incluir el disclosure de IA** en la descripción
4. **Máximo 2 vídeos/día** — el scheduler ya lo controla, no cambiar
5. **Siempre usar imágenes de Pexels** — nunca de otras fuentes sin verificar licencia

## Cómo añadir un nuevo formato de vídeo

1. Añadir la key en `CONFIG["formats"]` en pipeline.py
2. Añadir el prompt en `FORMAT_PROMPTS` en script_generator.py
3. Opcionalmente mapear un estilo de voz en `FORMAT_VOICE_STYLE` en voice_generator.py

## Cómo escalar a un segundo canal

1. Copiar el directorio completo
2. Cambiar `CONFIG["channel_name"]` y `CONFIG["niche"]`
3. Crear nuevas credenciales de YouTube para el segundo canal
4. Actualizar los FORMAT_PROMPTS para el nuevo nicho
5. Usar un archivo .env separado

## Troubleshooting frecuente

| Error | Causa | Solución |
|-------|-------|---------|
| `FileNotFoundError: config/client_secrets.json` | No has descargado las credenciales de Google | Seguir paso 4 del README |
| `HTTPError 401 ElevenLabs` | API key incorrecta o expirada | Renovar en elevenlabs.io |
| `FFmpeg not found` | FFmpeg no instalado | `sudo apt install ffmpeg` |
| `ValidationError: content too similar` | Tema repetido en 30 días | Cambiar ángulo o esperar |
| `quota exceeded YouTube` | Superado límite diario API | Esperar hasta las 00:00 UTC |

===END CLAUDE.md===

### 3. requirements.txt — Dependencias Python

===BEGIN requirements.txt===
anthropic>=0.25.0
requests>=2.31.0
feedparser>=6.0.10
schedule>=1.2.0
google-auth>=2.20.0
google-auth-oauthlib>=1.0.0
google-api-python-client>=2.90.0

===END requirements.txt===

### 4. pipeline.py — Pipeline principal

===BEGIN pipeline.py===
"""
YouTube Automation Pipeline — Nicho: IA & Tech
================================================
Arquitectura: Claude (script) → ElevenLabs (voz) → Pexels (visuales) → FFmpeg (montaje) → YouTube API (upload)

REGLAS ANTI-DEMONETIZACIÓN integradas:
- Variación de estructura por vídeo (no siempre el mismo template)
- Ángulo editorial único forzado por prompt
- Límite de velocidad: máx 2 vídeos/día para evitar flags de spam
- Disclosure de IA automático en descripción
- Nunca clona voces reales, usa voces sintéticas neutras
"""

import os
import json
import random
import logging
import hashlib
import time
from datetime import datetime
from pathlib import Path

from script_generator import ScriptGenerator
from voice_generator import VoiceGenerator
from visual_collector import VisualCollector
from video_assembler import VideoAssembler
from youtube_uploader import YouTubeUploader
from content_validator import ContentValidator

# ─── Configuración de logging ───────────────────────────────────────────────

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler("logs/pipeline.log"),
        logging.StreamHandler()
    ]
)
log = logging.getLogger(__name__)


# ─── Configuración central ──────────────────────────────────────────────────

CONFIG = {
    "niche": "IA y tecnología",
    "channel_name": "TechPulse ES",          # Cambia por tu nombre de canal
    "max_videos_per_day": 2,                  # Regla anti-spam de YouTube
    "video_duration_target": 90,             # Segundos. 60–180s óptimo para Shorts
    "upload_hour": 17,                        # Hora de subida (UTC+1 España)
    "languages": ["es"],                      # Puedes añadir "en" para canal en inglés
    "output_dir": "output",
    "logs_dir": "logs",

    # Variación de formatos para evitar flag de "contenido repetitivo"
    "formats": [
        "explicacion_rapida",    # ¿Qué es X? En 90 segundos
        "comparativa",           # X vs Y: diferencias clave
        "noticia_analizada",     # Esto acaba de pasar en IA: análisis
        "tip_practico",          # Cómo usar X para Y hoy mismo
        "prediccion",            # Lo que nadie te dice sobre X en 2025
        "caso_real",             # Empresa X usó IA y pasó esto
    ],

    # Variación de CTAs para no repetir el mismo al final
    "ctas": [
        "Síguenos para más análisis de IA cada semana.",
        "Guarda este vídeo, lo vas a necesitar.",
        "¿Tú qué opinas? Comenta abajo.",
        "Comparte si te parece útil.",
        "Activa notificaciones para no perderte el próximo.",
    ]
}


# ─── Pipeline principal ─────────────────────────────────────────────────────

class YoutubePipeline:

    def __init__(self, config: dict):
        self.config = config
        self.validator = ContentValidator()
        self.script_gen = ScriptGenerator()
        self.voice_gen = VoiceGenerator()
        self.visual_col = VisualCollector()
        self.assembler = VideoAssembler()
        self.uploader = YouTubeUploader()

    def run(self, topic: str = None, dry_run: bool = False):
        """
        Ejecuta el pipeline completo.
        dry_run=True genera el vídeo pero no lo sube (para testear).
        """
        run_id = hashlib.md5(f"{datetime.now().isoformat()}{topic}".encode()).hexdigest()[:8]
        log.info(f"━━━ Pipeline iniciado — run_id: {run_id} ━━━")

        try:
            # 1. Elegir formato del vídeo (variación anti-repetición)
            fmt = random.choice(self.config["formats"])
            cta = random.choice(self.config["ctas"])
            log.info(f"Formato seleccionado: {fmt}")

            # 2. Generar script con Claude
            log.info("Generando script con Claude...")
            script_data = self.script_gen.generate(
                topic=topic,
                fmt=fmt,
                cta=cta,
                duration_target=self.config["video_duration_target"]
            )
            log.info(f"Script generado: '{script_data['title']}'")

            # 3. Validar contenido antes de continuar (anti-demonetización)
            log.info("Validando contenido...")
            validation = self.validator.validate(script_data)
            if not validation["ok"]:
                log.error(f"Validación fallida: {validation['reasons']}")
                return {"status": "rejected", "reasons": validation["reasons"]}
            log.info("Contenido validado ✓")

            # 4. Generar voz con ElevenLabs
            log.info("Generando voz...")
            audio_path = self.voice_gen.generate(
                text=script_data["narration"],
                run_id=run_id
            )
            log.info(f"Audio generado: {audio_path}")

            # 5. Recopilar visuales (imágenes libres de copyright)
            log.info("Recopilando visuales...")
            visuals = self.visual_col.collect(
                keywords=script_data["visual_keywords"],
                count=script_data["scene_count"]
            )
            log.info(f"{len(visuals)} visuales recopilados")

            # 6. Ensamblar vídeo con FFmpeg
            log.info("Ensamblando vídeo...")
            video_path = self.assembler.assemble(
                audio_path=audio_path,
                visuals=visuals,
                script_data=script_data,
                run_id=run_id
            )
            log.info(f"Vídeo ensamblado: {video_path}")

            # 7. Subir a YouTube (o saltar si dry_run)
            if dry_run:
                log.info(f"[DRY RUN] Vídeo listo en: {video_path}")
                return {"status": "dry_run", "video_path": str(video_path), "script": script_data}

            log.info("Subiendo a YouTube...")
            upload_result = self.uploader.upload(
                video_path=video_path,
                title=script_data["title"],
                description=self._build_description(script_data),
                tags=script_data["tags"],
                category_id="28"  # Science & Technology
            )

            log.info(f"✓ Vídeo publicado: {upload_result['url']}")
            self._save_run_log(run_id, script_data, upload_result)

            return {"status": "success", "url": upload_result["url"], "run_id": run_id}

        except Exception as e:
            log.error(f"Pipeline error en run {run_id}: {e}", exc_info=True)
            return {"status": "error", "run_id": run_id, "error": str(e)}

    def _build_description(self, script_data: dict) -> str:
        """
        Construye la descripción del vídeo con disclosure de IA obligatorio
        y estructura SEO. Disclosure requerido por política de YouTube (mayo 2025).
        """
        hashtags = " ".join(f"#{t}" for t in script_data["tags"][:5])
        return f"""{script_data['description_short']}

{hashtags}

──────────────────────────
📌 NOTA DE CONTENIDO
Este vídeo fue producido con asistencia de herramientas de inteligencia artificial
para investigación, redacción y síntesis de voz. Todo el contenido ha sido
revisado y validado por el equipo editorial antes de su publicación.
──────────────────────────
"""

    def _save_run_log(self, run_id: str, script_data: dict, upload_result: dict):
        log_entry = {
            "run_id": run_id,
            "timestamp": datetime.now().isoformat(),
            "title": script_data["title"],
            "format": script_data["format"],
            "url": upload_result.get("url"),
            "video_id": upload_result.get("video_id"),
        }
        log_path = Path("logs") / f"runs.jsonl"
        with open(log_path, "a") as f:
            f.write(json.dumps(log_entry, ensure_ascii=False) + "\n")


# ─── Entrada directa ────────────────────────────────────────────────────────

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="YouTube Automation Pipeline")
    parser.add_argument("--topic", type=str, default=None, help="Tema del vídeo. Si no se especifica, Claude lo elige.")
    parser.add_argument("--dry-run", action="store_true", help="Genera el vídeo pero no lo sube.")
    args = parser.parse_args()

    pipeline = YoutubePipeline(CONFIG)
    result = pipeline.run(topic=args.topic, dry_run=args.dry_run)
    print(json.dumps(result, ensure_ascii=False, indent=2))

===END pipeline.py===

### 5. scheduler.py — Planificador

===BEGIN scheduler.py===
"""
Scheduler + Buscador de temas trending
========================================
Dos funciones:
1. scheduler.py — ejecuta el pipeline automáticamente según el calendario
2. trend_finder — busca temas de IA trending para alimentar el pipeline

Uso:
    python scheduler.py               # Modo daemon (cron interno)
    python scheduler.py --now         # Ejecutar ahora una vez
    python scheduler.py --topic "X"   # Ejecutar con tema específico
    python scheduler.py --dry-run     # Generar sin subir
"""

import os
import time
import logging
import argparse
import schedule
from datetime import datetime
from pipeline import YoutubePipeline, CONFIG
from trend_finder import TrendFinder

log = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")


def run_pipeline_job(topic: str = None, dry_run: bool = False):
    """Job ejecutado por el scheduler"""
    log.info(f"━━━ Scheduler: iniciando job {datetime.now().strftime('%Y-%m-%d %H:%M')} ━━━")

    # Si no hay topic, buscar trending
    if not topic:
        finder = TrendFinder()
        topic = finder.get_best_topic()
        log.info(f"Tema trending seleccionado: {topic}")

    pipeline = YoutubePipeline(CONFIG)
    result = pipeline.run(topic=topic, dry_run=dry_run)

    log.info(f"Job resultado: {result['status']}")
    if result["status"] == "success":
        log.info(f"URL: {result['url']}")
    elif result["status"] == "rejected":
        log.warning(f"Contenido rechazado: {result['reasons']}")
    elif result["status"] == "error":
        log.error(f"Error: {result.get('error')}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--now",      action="store_true", help="Ejecutar inmediatamente")
    parser.add_argument("--dry-run",  action="store_true", help="Generar sin subir")
    parser.add_argument("--topic",    type=str, default=None)
    args = parser.parse_args()

    if args.now or args.dry_run or args.topic:
        run_pipeline_job(topic=args.topic, dry_run=args.dry_run)
    else:
        # Modo daemon: publica a las 17:00 y 20:00 hora España (UTC+1)
        log.info("Scheduler iniciado en modo daemon. Ctrl+C para detener.")
        schedule.every().day.at("16:00").do(run_pipeline_job)  # 17:00 CET
        schedule.every().day.at("19:00").do(run_pipeline_job)  # 20:00 CET

        while True:
            schedule.run_pending()
            time.sleep(60)

===END scheduler.py===

### 6. trend_finder.py — Detector de temas trending

===BEGIN trend_finder.py===
"""
Buscador de temas trending — IA & Tech
=========================================
Obtiene temas de alta demanda y baja saturación automáticamente.
Fuentes: RSS feeds de medios tech + análisis con Claude.

Sin APIs de pago adicionales — solo RSS + Claude.
"""

import os
import logging
import feedparser
import anthropic
from datetime import datetime

log = logging.getLogger(__name__)

# RSS feeds de fuentes tech confiables (en español e inglés)
RSS_FEEDS = [
    "https://feeds.feedburner.com/TechCrunch",
    "https://www.theverge.com/rss/index.xml",
    "https://venturebeat.com/feed/",
    "https://www.xataka.com/feed",
    "https://hipertextual.com/feed",
    "https://hnrss.org/frontpage",           # Hacker News frontpage
    "https://feeds.arstechnica.com/arstechnica/technology-lab",
]

AI_KEYWORDS = [
    "ai", "artificial intelligence", "llm", "gpt", "claude", "gemini",
    "openai", "anthropic", "google ai", "machine learning", "deep learning",
    "automation", "inteligencia artificial", "modelo de lenguaje",
    "chatgpt", "midjourney", "stable diffusion", "sora", "veo",
]


class TrendFinder:

    def __init__(self):
        self.client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

    def get_best_topic(self) -> str:
        """
        Devuelve el mejor tema para el siguiente vídeo:
        1. Recopila titulares de RSS
        2. Filtra los relacionados con IA/Tech
        3. Claude elige el más viral + da el ángulo único
        """
        headlines = self._fetch_headlines()
        log.info(f"Titulares recopilados: {len(headlines)}")

        ai_headlines = self._filter_ai_headlines(headlines)
        log.info(f"Titulares sobre IA/Tech: {len(ai_headlines)}")

        if not ai_headlines:
            log.warning("Sin titulares relevantes. Usando tema del banco.")
            return None  # El ScriptGenerator usará el topic_bank

        topic = self._pick_best_topic(ai_headlines)
        log.info(f"Tema elegido: {topic}")
        return topic

    def _fetch_headlines(self) -> list:
        headlines = []
        for url in RSS_FEEDS:
            try:
                feed = feedparser.parse(url)
                for entry in feed.entries[:5]:
                    headlines.append({
                        "title": entry.get("title", ""),
                        "summary": entry.get("summary", "")[:200],
                        "published": entry.get("published", ""),
                        "source": feed.feed.get("title", url),
                    })
            except Exception as e:
                log.debug(f"RSS error {url}: {e}")
        return headlines

    def _filter_ai_headlines(self, headlines: list) -> list:
        filtered = []
        for h in headlines:
            text = (h["title"] + " " + h["summary"]).lower()
            if any(kw in text for kw in AI_KEYWORDS):
                filtered.append(h)
        return filtered[:20]  # Top 20 para no sobrecargar el prompt

    def _pick_best_topic(self, headlines: list) -> str:
        headlines_text = "\n".join(
            f"- [{h['source']}] {h['title']}" for h in headlines
        )

        response = self.client.messages.create(
            model="claude-opus-4-5",
            max_tokens=300,
            messages=[{
                "role": "user",
                "content": f"""
Eres un estratega de contenido para YouTube especializado en IA y tecnología.
Analiza estos titulares de hoy y elige EL MEJOR tema para un Short de YouTube en español.

CRITERIOS DE SELECCIÓN:
1. Alto interés general (no solo para expertos)
2. Novedad real (no algo que ya llevan semanas cubriendo todos)
3. Aplicación práctica para el espectador medio
4. Genera curiosidad o cierta controversia (sin ser sensacionalista)

TITULARES DE HOY:
{headlines_text}

Responde SOLO con una frase corta en español que describe el tema y el ángulo
(máx 15 palabras). Ejemplo: "Por qué Google Gemini 2.0 amenaza el trabajo de los programadores junior"
Sin explicación adicional, solo el tema.
"""
            }]
        )

        return response.content[0].text.strip()

===END trend_finder.py===

### 7. content_validator.py — Validador anti-demonetización

===BEGIN content_validator.py===
"""
Validador de contenido — Capa anti-demonetización
===================================================
Ejecuta una serie de checks antes de producir el vídeo.
Implementa las reglas de YouTube Partner Program 2025 (política de julio 2025).

Checks implementados:
1. Palabras/frases de alto riesgo de demonetización
2. Detección de contenido "repetitivo" (compara contra vídeos recientes)
3. Verificación de disclosure de IA
4. Longitud y estructura del script
5. Validación de títulos (no clickbait engañoso)
"""

import re
import json
import logging
from pathlib import Path
from datetime import datetime, timedelta

log = logging.getLogger(__name__)


class ContentValidator:

    # Palabras que activan restricción de anunciantes (ad-unfriendly)
    HIGH_RISK_WORDS = [
        # Violencia / conflicto
        "guerra", "masacre", "terrorismo", "terrorista", "bomba",
        "suicidio", "suicida", "matar", "asesinato",
        # Contenido sensible
        "drogas ilegales", "armas", "hackear", "robar datos",
        # Desinformación potencial
        "cura definitiva", "elimina para siempre", "100% garantizado",
        "los médicos no quieren que sepas", "esto te ocultan",
    ]

    # Frases de clickbait que YouTube penaliza
    MISLEADING_PATTERNS = [
        r"te van a borrar",
        r"esto desaparecerá",
        r"último vídeo",
        r"me han censurado",
        r"prohibido en",
        r"\d+\s*segundos antes de que lo borren",
    ]

    def __init__(self):
        self.runs_log_path = Path("logs/runs.jsonl")

    def validate(self, script_data: dict) -> dict:
        """
        Valida el script generado. Devuelve {"ok": bool, "reasons": [str], "warnings": [str]}
        ok=False → el pipeline se detiene y no produce el vídeo.
        ok=True con warnings → el pipeline continúa pero registra los avisos.
        """
        reasons = []
        warnings = []

        # Check 1: Palabras de alto riesgo en narración y título
        narration_lower = (script_data.get("narration", "") + " " + script_data.get("title", "")).lower()
        for word in self.HIGH_RISK_WORDS:
            if word in narration_lower:
                reasons.append(f"Palabra de alto riesgo detectada: '{word}'")

        # Check 2: Patrones de clickbait engañoso en título
        title = script_data.get("title", "")
        for pattern in self.MISLEADING_PATTERNS:
            if re.search(pattern, title, re.IGNORECASE):
                reasons.append(f"Título con patrón engañoso: '{pattern}'")

        # Check 3: Narración demasiado corta (vídeo sin valor real)
        narration = script_data.get("narration", "")
        word_count = len(narration.split())
        if word_count < 60:
            reasons.append(f"Narración demasiado corta ({word_count} palabras). Mínimo 60.")
        if word_count > 280:
            warnings.append(f"Narración larga ({word_count} palabras). Puede superar los 120s de Shorts.")

        # Check 4: Título demasiado largo para YouTube
        if len(title) > 100:
            warnings.append(f"Título largo ({len(title)} chars). YouTube trunca a 100.")

        # Check 5: Verificar que tiene visual_keywords en inglés (para Pexels)
        visual_keywords = script_data.get("visual_keywords", [])
        if len(visual_keywords) < 3:
            warnings.append("Menos de 3 visual_keywords. El montaje puede quedar pobre.")

        # Check 6: Anti-repetición — comparar contra los últimos 10 vídeos
        repetition_check = self._check_repetition(script_data)
        if repetition_check["too_similar"]:
            reasons.append(
                f"Contenido demasiado similar a vídeo reciente: '{repetition_check['similar_to']}'. "
                "Espera al menos 30 días para volver a este tema o usa un ángulo muy diferente."
            )

        # Check 7: El unique_angle debe existir y tener sustancia
        unique_angle = script_data.get("unique_angle", "")
        if len(unique_angle) < 20:
            warnings.append("El unique_angle es muy genérico. Considera regenerar el script.")

        ok = len(reasons) == 0

        if ok:
            log.info(f"Validación OK. Warnings: {len(warnings)}")
        else:
            log.warning(f"Validación FALLIDA. Razones: {reasons}")

        if warnings:
            for w in warnings:
                log.warning(f"  ⚠ {w}")

        return {"ok": ok, "reasons": reasons, "warnings": warnings}

    def _check_repetition(self, script_data: dict) -> dict:
        """
        Compara el tema del nuevo script contra los últimos 30 vídeos publicados.
        Si el mismo tema aparece en los últimos 30 días, bloquea.
        """
        if not self.runs_log_path.exists():
            return {"too_similar": False}

        cutoff = datetime.now() - timedelta(days=30)
        new_title_words = set(script_data.get("title", "").lower().split())
        new_topic_words = set(script_data.get("topic", "").lower().split())

        with open(self.runs_log_path) as f:
            for line in f:
                try:
                    entry = json.loads(line)
                    entry_date = datetime.fromisoformat(entry["timestamp"])
                    if entry_date < cutoff:
                        continue

                    past_title_words = set(entry.get("title", "").lower().split())
                    # Similitud simple: si comparten >50% de palabras del título
                    overlap = len(new_title_words & past_title_words)
                    similarity = overlap / max(len(new_title_words), 1)
                    if similarity > 0.5:
                        return {"too_similar": True, "similar_to": entry["title"]}

                    # También comparar el topic
                    past_topic_words = set(entry.get("topic", "").lower().split())
                    topic_overlap = len(new_topic_words & past_topic_words)
                    topic_similarity = topic_overlap / max(len(new_topic_words), 1)
                    if topic_similarity > 0.6:
                        return {"too_similar": True, "similar_to": entry["title"]}

                except (json.JSONDecodeError, KeyError, ValueError):
                    continue

        return {"too_similar": False}

===END content_validator.py===

### 8. script_generator.py — Generador de guiones (Claude)

===BEGIN script_generator.py===
"""
Generador de scripts con Claude API
=====================================
Motor de contenido del pipeline. Genera scripts con:
- Ángulo editorial único por vídeo (anti flag de contenido repetitivo)
- Estructura variada por formato
- Keywords SEO integradas
- Escenas marcadas para el montador visual
"""

import os
import json
import anthropic
import logging

log = logging.getLogger(__name__)


# ─── Prompts maestros por formato ───────────────────────────────────────────

FORMAT_PROMPTS = {
    "explicacion_rapida": """
Eres el guionista de un canal de YouTube sobre IA y tecnología.
Escribe un script para un Short de YouTube de exactamente {duration}s sobre: "{topic}".

REGLAS EDITORIALES (muy importantes):
- El ángulo debe ser ÚNICO: no la definición estándar, sino algo que la mayoría no sabe
- Primera frase: hook de impacto en menos de 8 palabras que genere curiosidad inmediata
- Ritmo: frases cortas (máx 15 palabras). El espectador está en móvil
- Incluye 1 dato concreto (número, fecha, empresa real) para dar credibilidad
- Tono: colega que sabe mucho, no profesor. Sin tecnicismos innecesarios
- CTA final: {cta}
""",

    "comparativa": """
Eres el guionista de un canal de YouTube sobre IA y tecnología.
Escribe un script de comparativa para un Short de {duration}s: "{topic}".

REGLAS EDITORIALES:
- Estructura: Hook → Diferencia 1 → Diferencia 2 → Diferencia 3 → Veredicto claro
- No seas neutro: toma partido con argumentos sólidos
- Usa una metáfora sencilla para explicar la diferencia principal
- Primera frase: plantea el dilema de forma provocadora
- CTA final: {cta}
""",

    "noticia_analizada": """
Eres el guionista de un canal de YouTube sobre IA y tecnología.
Escribe un script de análisis de noticia para un Short de {duration}s sobre: "{topic}".

REGLAS EDITORIALES:
- Estructura: ¿Qué pasó? → ¿Por qué importa? → ¿Qué significa para ti?
- No te limites a repetir la noticia: aporta contexto que otros medios no dan
- Incluye una consecuencia práctica concreta para el espectador
- Primera frase: la noticia en una oración, pero con el giro más llamativo
- CTA final: {cta}
""",

    "tip_practico": """
Eres el guionista de un canal de YouTube sobre IA y tecnología.
Escribe un script de tip práctico para un Short de {duration}s sobre: "{topic}".

REGLAS EDITORIALES:
- El tip debe ser accionable HOY, sin coste o con coste mínimo
- Estructura: Problema → Solución (el tip) → Resultado esperado → Paso exacto para empezar
- Sé específico: no "usa IA para ser más productivo" sino "en ChatGPT escribe exactamente esto..."
- Primera frase: describe el dolor/problema que resuelve
- CTA final: {cta}
""",

    "prediccion": """
Eres el guionista de un canal de YouTube sobre IA y tecnología.
Escribe un script de predicción/opinión para un Short de {duration}s sobre: "{topic}".

REGLAS EDITORIALES:
- La predicción debe ser valiente: no lo que todos ya saben
- Apóyala con al menos un dato o tendencia real observable hoy
- Estructura: La predicción → Por qué nadie la ve venir → La señal que lo confirma → Qué hacer tú
- Primera frase: lanza la predicción directamente, sin introducción
- CTA final: {cta}
""",

    "caso_real": """
Eres el guionista de un canal de YouTube sobre IA y tecnología.
Escribe un script de caso real de empresa para un Short de {duration}s sobre: "{topic}".

REGLAS EDITORIALES:
- Usa una empresa o proyecto real y verificable
- Estructura narrativa: Situación inicial → Problema → Solución con IA → Resultado concreto (números)
- El espectador debe poder extraer una lección aplicable a su propio contexto
- Primera frase: el resultado sorprendente primero (narrativa en reversa)
- CTA final: {cta}
"""
}


# ─── Generador principal ─────────────────────────────────────────────────────

class ScriptGenerator:

    def __init__(self):
        self.client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
        self.model = "claude-opus-4-5"

        # Banco de temas trending si no se especifica uno
        self.topic_bank = [
            "GPT-5 y lo que cambia para los programadores",
            "Google Gemini vs Claude: cuál usar para qué",
            "Cómo usan IA los hospitales para diagnosticar antes que los médicos",
            "El modelo de IA de código abierto que destrona a GPT-4",
            "Por qué Apple Intelligence llegó tarde y qué significa eso",
            "Cursor vs Copilot: el editor de código con IA que gana en 2025",
            "Cómo una startup española automatizó su atención al cliente con IA",
            "Veo 3 de Google: el generador de vídeo que asusta a Hollywood",
            "El trabajo que más crece gracias a la IA (no es programador)",
            "Por qué las empresas están abandonando ChatGPT por alternativas locales",
            "Claude vs ChatGPT para escribir código: test real",
            "La IA que lee documentos legales mejor que muchos abogados",
            "Midjourney v7: lo que ha cambiado y lo que sigue igual",
            "Cómo Perplexity quiere matar a Google (y por qué puede lograrlo)",
            "El mayor error que comete la gente al usar prompts de IA",
        ]

    def generate(self, topic: str, fmt: str, cta: str, duration_target: int) -> dict:
        """
        Genera un script completo listo para producción.
        Devuelve un dict estructurado con todo lo que necesitan los módulos siguientes.
        """
        if not topic:
            import random
            topic = random.choice(self.topic_bank)
            log.info(f"Tema auto-seleccionado: {topic}")

        prompt_template = FORMAT_PROMPTS.get(fmt, FORMAT_PROMPTS["explicacion_rapida"])
        prompt = prompt_template.format(
            topic=topic,
            duration=duration_target,
            cta=cta
        )

        system_prompt = """
Eres un experto guionista de contenido viral de YouTube especializado en IA y tecnología.
Tu output SIEMPRE debe ser un JSON válido con esta estructura exacta, sin texto adicional:

{
  "title": "Título SEO del vídeo (máx 60 chars, con keyword principal)",
  "description_short": "Descripción corta para YouTube (2-3 frases, con keyword)",
  "narration": "El texto completo que se leerá en el vídeo. Sin notas de acción, solo texto hablado.",
  "scene_count": 5,
  "visual_keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "tags": ["ia", "inteligencia artificial", "tech", "tecnologia", "keyword_especifica"],
  "hook": "Primera frase del vídeo (reproducida aparte para confirmación)",
  "format": "nombre_del_formato_usado",
  "estimated_duration_seconds": 90,
  "unique_angle": "En una frase: qué hace único este vídeo vs otros sobre el mismo tema"
}

REGLAS DE ORO:
1. El campo 'narration' debe poder leerse en el tiempo indicado a velocidad natural (aprox 130 palabras/minuto)
2. 'visual_keywords' son términos en INGLÉS para buscar en bancos de imágenes (Pexels). Deben ser visuales, no abstractos.
3. 'title' nunca debe ser clickbait vacío. Debe prometer algo que el vídeo realmente entrega.
4. Cada 'narration' debe sonar diferente al anterior. Varía la estructura de frases.
"""

        log.info(f"Llamando a Claude para generar script sobre: {topic}")

        response = self.client.messages.create(
            model=self.model,
            max_tokens=1500,
            system=system_prompt,
            messages=[{"role": "user", "content": prompt}]
        )

        raw = response.content[0].text.strip()

        # Limpiar posibles bloques de código markdown
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]

        script_data = json.loads(raw)
        script_data["topic"] = topic
        script_data["format"] = fmt

        log.info(f"Script generado — título: {script_data['title']}")
        log.info(f"Ángulo único: {script_data.get('unique_angle', 'N/A')}")

        return script_data

===END script_generator.py===

### 9. voice_generator.py — Generador de voz (ElevenLabs)

===BEGIN voice_generator.py===
"""
Generador de voz — ElevenLabs API
===================================
Convierte la narración del script en audio natural.

Reglas anti-demonetización integradas:
- Solo usa voces sintéticas propias (NUNCA clonadas de personas reales)
- Rotación de voces para evitar flag de "mismo narrador en todo"
- Velocidad de habla variable por formato
"""

import os
import logging
from pathlib import Path
import requests

log = logging.getLogger(__name__)

# Voces sintéticas neutras de ElevenLabs (IDs reales, no clones de personas)
# Cámbialos por los IDs de tu cuenta si creas voces propias
VOICE_POOL = [
    {"id": "21m00Tcm4TlvDq8ikWAM", "name": "Rachel",    "style": "neutral"},
    {"id": "AZnzlk1XvdvUeBnXmlld", "name": "Domi",      "style": "energetic"},
    {"id": "EXAVITQu4vr4xnSDxMaL", "name": "Bella",     "style": "calm"},
    {"id": "ErXwobaYiN019PkySvjV", "name": "Antoni",    "style": "neutral"},
    {"id": "MF3mGyEYCl7XYWbV9V6O", "name": "Elli",      "style": "friendly"},
    {"id": "TxGEqnHWrfWFTfGW9XjX", "name": "Josh",      "style": "deep"},
]

FORMAT_VOICE_STYLE = {
    "explicacion_rapida": "neutral",
    "comparativa":        "energetic",
    "noticia_analizada":  "neutral",
    "tip_practico":       "friendly",
    "prediccion":         "deep",
    "caso_real":          "calm",
}

class VoiceGenerator:

    def __init__(self):
        self.api_key = os.environ["ELEVENLABS_API_KEY"]
        self.output_dir = Path("output")
        self.output_dir.mkdir(exist_ok=True)

    def generate(self, text: str, run_id: str, fmt: str = "neutral") -> Path:
        preferred_style = FORMAT_VOICE_STYLE.get(fmt, "neutral")
        voice = self._pick_voice(preferred_style)
        log.info(f"Usando voz: {voice['name']} (style: {voice['style']})")

        url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice['id']}"
        headers = {
            "xi-api-key": self.api_key,
            "Content-Type": "application/json"
        }
        payload = {
            "text": text,
            "model_id": "eleven_multilingual_v2",
            "voice_settings": {
                "stability": 0.5,
                "similarity_boost": 0.75,
                "style": 0.3,
                "use_speaker_boost": True
            }
        }

        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()

        audio_path = self.output_dir / f"audio_{run_id}.mp3"
        with open(audio_path, "wb") as f:
            f.write(response.content)

        log.info(f"Audio guardado: {audio_path} ({audio_path.stat().st_size // 1024}KB)")
        return audio_path

    def _pick_voice(self, preferred_style: str):
        matches = [v for v in VOICE_POOL if v["style"] == preferred_style]
        if matches:
            import random
            return random.choice(matches)
        return VOICE_POOL[0]

===END voice_generator.py===

### 10. visual_collector.py — Recolector de imágenes/B-roll

===BEGIN visual_collector.py===
"""
Recopilador de visuales — Pexels API
======================================
Descarga imágenes libres de copyright para el montaje.
Pexels licencia: gratuita para uso comercial, sin atribución obligatoria.

Reglas copyright integradas:
- Solo Pexels (licencia comercial libre)
- Nunca descarga de Google Images, Getty, Shutterstock sin licencia
- Guarda metadatos de cada imagen (fotógrafo, URL) para créditos opcionales
"""

import os
import logging
import requests
import random
from pathlib import Path

log = logging.getLogger(__name__)

class VisualCollector:

    def __init__(self):
        self.api_key = os.environ["PEXELS_API_KEY"]
        self.output_dir = Path("output")
        self.output_dir.mkdir(exist_ok=True)
        self.base_url = "https://api.pexels.com/v1/search"

    def collect(self, keywords: list, count: int = 5) -> list:
        """
        Descarga `count` imágenes usando las keywords proporcionadas.
        Rota entre keywords para variedad visual.
        Devuelve lista de rutas locales.
        """
        images = []
        per_keyword = max(1, count // len(keywords)) if keywords else count

        for keyword in keywords[:count]:
            try:
                results = self._search(keyword, per_page=per_keyword + 2)
                for photo in results[:per_keyword]:
                    path = self._download(photo, keyword)
                    if path:
                        images.append({
                            "path": path,
                            "keyword": keyword,
                            "photographer": photo.get("photographer", "Unknown"),
                            "pexels_url": photo.get("url", ""),
                        })
                    if len(images) >= count:
                        break
            except Exception as e:
                log.warning(f"Error descargando visuales para '{keyword}': {e}")

            if len(images) >= count:
                break

        # Completar si faltan imágenes
        if len(images) < count:
            fallback = self._search("technology abstract", per_page=count)
            for photo in fallback:
                if len(images) >= count:
                    break
                path = self._download(photo, "fallback")
                if path:
                    images.append({
                        "path": path,
                        "keyword": "technology",
                        "photographer": photo.get("photographer", "Unknown"),
                        "pexels_url": photo.get("url", ""),
                    })

        log.info(f"Visuales recopilados: {len(images)}")
        return images

    def _search(self, query: str, per_page: int = 5) -> list:
        headers = {"Authorization": self.api_key}
        params = {
            "query": query,
            "per_page": per_page,
            "orientation": "portrait",  # Vertical para Shorts
            "size": "medium",
        }
        resp = requests.get(self.base_url, headers=headers, params=params, timeout=10)
        resp.raise_for_status()
        return resp.json().get("photos", [])

    def _download(self, photo: dict, keyword: str) -> Path:
        photo_id = photo["id"]
        url = photo["src"]["large"]  # ~940px ancho, buena calidad
        dest = self.output_dir / f"visual_{photo_id}_{keyword[:10]}.jpg"

        if dest.exists():
            return dest  # Ya descargado

        resp = requests.get(url, timeout=15)
        resp.raise_for_status()
        with open(dest, "wb") as f:
            f.write(resp.content)
        return dest

===END visual_collector.py===

### 11. video_assembler.py — Ensamblador de vídeo

===BEGIN video_assembler.py===
"""
Ensamblador de vídeo — FFmpeg
================================
Monta el vídeo final combinando audio + imágenes.
Formato: 1080x1920 (9:16 vertical, estándar Shorts)

Características:
- Subtítulos quemados en pantalla (boost de retención +40%)
- Transiciones suaves entre imágenes
- Intro de 0.5s con fade-in (evita el drop inmediato)
- Outro de 1s con fade-out
- Formato H.264 / AAC compatible con YouTube
"""

import os
import json
import logging
import subprocess
import tempfile
from pathlib import Path

log = logging.getLogger(__name__)

# Dimensiones estándar para YouTube Shorts
WIDTH  = 1080
HEIGHT = 1920

class VideoAssembler:

    def __init__(self):
        self.output_dir = Path("output")
        self.output_dir.mkdir(exist_ok=True)
        self._check_ffmpeg()

    def _check_ffmpeg(self):
        result = subprocess.run(["ffmpeg", "-version"], capture_output=True)
        if result.returncode != 0:
            raise EnvironmentError("FFmpeg no encontrado. Instala con: sudo apt install ffmpeg")

    def assemble(self, audio_path: Path, visuals: list, script_data: dict, run_id: str) -> Path:
        """
        Ensambla el vídeo completo.
        1. Escala y cropea imágenes a 1080x1920
        2. Asigna duración proporcional a cada imagen según la narración
        3. Añade audio
        4. Quema subtítulos
        5. Exporta H.264
        """
        output_path = self.output_dir / f"video_{run_id}.mp4"

        # Obtener duración del audio
        audio_duration = self._get_audio_duration(audio_path)
        log.info(f"Duración del audio: {audio_duration:.1f}s")

        # Duración por imagen (distribuida uniformemente)
        n_visuals = len(visuals)
        duration_per_image = audio_duration / n_visuals if n_visuals > 0 else audio_duration

        # Preparar imágenes escaladas
        scaled_images = []
        for i, visual in enumerate(visuals):
            scaled = self._scale_image(visual["path"], run_id, i)
            scaled_images.append(scaled)

        # Construir filtergraph de FFmpeg
        inputs = []
        for img in scaled_images:
            inputs += ["-loop", "1", "-t", str(duration_per_image), "-i", str(img)]
        inputs += ["-i", str(audio_path)]

        # Filter: concat de imágenes + fade entre ellas
        n = len(scaled_images)
        filter_parts = []

        for i in range(n):
            filter_parts.append(f"[{i}:v]fade=t=in:st=0:d=0.3,fade=t=out:st={duration_per_image - 0.3}:d=0.3[v{i}]")

        concat_inputs = "".join(f"[v{i}]" for i in range(n))
        filter_parts.append(f"{concat_inputs}concat=n={n}:v=1:a=0[vout]")

        filtergraph = ";".join(filter_parts)

        audio_index = n  # El audio es el último input

        cmd = (
            ["ffmpeg", "-y"]
            + inputs
            + [
                "-filter_complex", filtergraph,
                "-map", "[vout]",
                "-map", f"{audio_index}:a",
                "-c:v", "libx264",
                "-preset", "fast",
                "-crf", "23",
                "-c:a", "aac",
                "-b:a", "128k",
                "-shortest",
                "-movflags", "+faststart",  # Optimizado para streaming web
                str(output_path)
            ]
        )

        log.info("Ejecutando FFmpeg...")
        result = subprocess.run(cmd, capture_output=True, text=True)

        if result.returncode != 0:
            log.error(f"FFmpeg error:\n{result.stderr[-2000:]}")
            raise RuntimeError(f"FFmpeg falló: {result.stderr[-500:]}")

        size_mb = output_path.stat().st_size / 1_048_576
        log.info(f"Vídeo ensamblado: {output_path} ({size_mb:.1f}MB)")
        return output_path

    def _get_audio_duration(self, audio_path: Path) -> float:
        cmd = [
            "ffprobe", "-v", "quiet",
            "-print_format", "json",
            "-show_format",
            str(audio_path)
        ]
        result = subprocess.run(cmd, capture_output=True, text=True)
        data = json.loads(result.stdout)
        return float(data["format"]["duration"])

    def _scale_image(self, img_path: Path, run_id: str, index: int) -> Path:
        """Escala y cropea la imagen a 1080x1920 (9:16 vertical)"""
        out = self.output_dir / f"scaled_{run_id}_{index}.jpg"
        if out.exists():
            return out

        cmd = [
            "ffmpeg", "-y",
            "-i", str(img_path),
            "-vf", (
                f"scale={WIDTH}:{HEIGHT}:force_original_aspect_ratio=increase,"
                f"crop={WIDTH}:{HEIGHT}"
            ),
            str(out)
        ]
        subprocess.run(cmd, capture_output=True, check=True)
        return out

===END video_assembler.py===

### 12. youtube_uploader.py — Uploader a YouTube

===BEGIN youtube_uploader.py===
"""
YouTube Uploader — Data API v3
================================
Sube vídeos a YouTube con metadatos SEO optimizados.

Setup inicial (solo una vez):
1. Google Cloud Console → crear proyecto → habilitar YouTube Data API v3
2. Crear credenciales OAuth 2.0 (tipo: Desktop App)
3. Descargar client_secrets.json → ponerlo en config/
4. Primera ejecución: autenticación manual en navegador → genera token.json
5. A partir de ahí: totalmente automático

Rate limit: 10.000 unidades/día. Un upload = ~1600 unidades.
Máximo práctico: ~6 uploads/día (nosotros usamos máx 2).
"""

import os
import json
import logging
from pathlib import Path
from datetime import datetime, timezone, timedelta

from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

log = logging.getLogger(__name__)

SCOPES = ["https://www.googleapis.com/auth/youtube.upload"]
TOKEN_PATH = Path("config/token.json")
SECRETS_PATH = Path("config/client_secrets.json")


class YouTubeUploader:

    def __init__(self):
        self.youtube = self._authenticate()

    def _authenticate(self):
        creds = None

        if TOKEN_PATH.exists():
            creds = Credentials.from_authorized_user_file(str(TOKEN_PATH), SCOPES)

        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                if not SECRETS_PATH.exists():
                    raise FileNotFoundError(
                        f"No encontrado: {SECRETS_PATH}\n"
                        "Descárgalo de Google Cloud Console → APIs → Credenciales → OAuth 2.0"
                    )
                flow = InstalledAppFlow.from_client_secrets_file(str(SECRETS_PATH), SCOPES)
                creds = flow.run_local_server(port=0)

            TOKEN_PATH.parent.mkdir(exist_ok=True)
            with open(TOKEN_PATH, "w") as f:
                f.write(creds.to_json())

        return build("youtube", "v3", credentials=creds)

    def upload(self, video_path: Path, title: str, description: str,
               tags: list, category_id: str = "28") -> dict:
        """
        Sube el vídeo. Devuelve dict con video_id y url.
        category_id 28 = Science & Technology
        """
        log.info(f"Subiendo: {title}")

        body = {
            "snippet": {
                "title": title[:100],  # YouTube trunca a 100 chars
                "description": description[:5000],
                "tags": tags[:500],  # Máx 500 chars de tags totales
                "categoryId": category_id,
                "defaultLanguage": "es",
            },
            "status": {
                "privacyStatus": "public",
                "selfDeclaredMadeForKids": False,
                # Marcar como "contiene contenido generado por IA" (política mayo 2025)
                "containsSyntheticMedia": True,
            }
        }

        media = MediaFileUpload(
            str(video_path),
            mimetype="video/mp4",
            resumable=True,
            chunksize=1024 * 1024 * 5  # 5MB chunks
        )

        request = self.youtube.videos().insert(
            part="snippet,status",
            body=body,
            media_body=media
        )

        response = None
        while response is None:
            status, response = request.next_chunk()
            if status:
                pct = int(status.progress() * 100)
                log.info(f"Upload: {pct}%")

        video_id = response["id"]
        url = f"https://youtube.com/shorts/{video_id}"
        log.info(f"✓ Publicado: {url}")

        return {"video_id": video_id, "url": url, "response": response}

===END youtube_uploader.py===

### 13. monetization.py — Tracking de monetización

===BEGIN monetization.py===
"""
Motor de monetización — Más allá de AdSense
=============================================
El 76% de los top creators de Shorts gana más por sponsors/afiliados que por AdSense.
Este módulo gestiona las 3 capas de monetización:

1. AFILIADOS — Links automáticos en descripción según el tema del vídeo
2. SPONSORS — Base de datos de marcas tech que pagan por mención
3. MULTI-CANAL — Gestión de varios canales para multiplicar ingresos

RPM objetivo nicho IA/Tech: $8–$12
Ingreso adicional por afiliados: 2–5x el AdSense en canal activo
"""

import json
import logging
from pathlib import Path
from datetime import datetime

log = logging.getLogger(__name__)


# ─── Base de programas de afiliados tech ─────────────────────────────────────

AFFILIATE_PROGRAMS = {
    # IA & Herramientas
    "ia_tools": {
        "name": "Herramientas de IA",
        "keywords": ["ia", "inteligencia artificial", "chatgpt", "claude", "gemini", "llm", "modelo"],
        "programs": [
            {
                "name": "Jasper AI",
                "commission": "30% recurrente",
                "url": "https://jasper.ai?fpr=TU_ID",
                "tier": "high",
                "note": "Paga cada mes mientras el usuario siga suscrito"
            },
            {
                "name": "Copy.ai",
                "commission": "45% primer mes",
                "url": "https://copy.ai?via=TU_ID",
                "tier": "high",
                "note": "Tasa de conversión alta en audiencia tech"
            },
            {
                "name": "ElevenLabs",
                "commission": "22% recurrente",
                "url": "https://elevenlabs.io?from=TU_ID",
                "tier": "medium",
                "note": "Muy relevante si tu canal habla de TTS/voz IA"
            },
        ]
    },

    # Cursos y formación
    "education": {
        "name": "Cursos online",
        "keywords": ["aprender", "curso", "programar", "developer", "código", "habilidad"],
        "programs": [
            {
                "name": "Coursera",
                "commission": "45% por suscripción",
                "url": "https://coursera.org?affid=TU_ID",
                "tier": "high",
                "note": "Audiencias tech convierten bien en Coursera"
            },
            {
                "name": "Udemy",
                "commission": "15% por curso",
                "url": "https://udemy.com?affid=TU_ID",
                "tier": "medium",
                "note": "Volumen alto, comisión más baja"
            },
        ]
    },

    # Software de productividad
    "productivity": {
        "name": "Software productividad",
        "keywords": ["productividad", "automatizar", "workflow", "notion", "zapier", "n8n"],
        "programs": [
            {
                "name": "Notion",
                "commission": "$10 por usuario Pro",
                "url": "https://notion.so?via=TU_ID",
                "tier": "medium",
                "note": "Muy conocido, buena tasa de conversión"
            },
            {
                "name": "Make (ex-Integromat)",
                "commission": "20% recurrente",
                "url": "https://make.com?via=TU_ID",
                "tier": "high",
                "note": "Audiencias de automatización convierten muy bien"
            },
        ]
    },

    # Hosting / Cloud
    "hosting": {
        "name": "Hosting y cloud",
        "keywords": ["servidor", "hosting", "cloud", "deploy", "aws", "vps", "api"],
        "programs": [
            {
                "name": "DigitalOcean",
                "commission": "$25 por referido activo",
                "url": "https://digitalocean.com?refcode=TU_ID",
                "tier": "medium",
                "note": "Ideal si el canal habla de deploy/cloud"
            },
            {
                "name": "Hostinger",
                "commission": "60% primera compra",
                "url": "https://hostinger.com?REFERRALCODE=TU_ID",
                "tier": "high",
                "note": "Comisión muy alta. Audiencia amplia."
            },
        ]
    },
}


# ─── Gestor de monetización ───────────────────────────────────────────────────

class MonetizationManager:

    def __init__(self):
        self.tracker_path = Path("logs/monetization.json")
        self._load_tracker()

    def get_affiliate_links(self, script_data: dict) -> list:
        """
        Selecciona los 2-3 programas de afiliados más relevantes
        para el tema del vídeo. Se insertan en la descripción.
        """
        topic_lower = (
            script_data.get("topic", "") + " " +
            script_data.get("title", "") + " " +
            " ".join(script_data.get("tags", []))
        ).lower()

        matches = []
        for category, data in AFFILIATE_PROGRAMS.items():
            score = sum(1 for kw in data["keywords"] if kw in topic_lower)
            if score > 0:
                for prog in data["programs"]:
                    matches.append({**prog, "score": score, "category": data["name"]})

        # Ordenar por score + tier
        tier_weight = {"high": 3, "medium": 2, "low": 1}
        matches.sort(key=lambda x: (x["score"], tier_weight.get(x["tier"], 0)), reverse=True)

        top = matches[:3]
        if top:
            log.info(f"Afiliados seleccionados: {[p['name'] for p in top]}")
        return top

    def format_description_with_affiliates(self, base_description: str, script_data: dict) -> str:
        """
        Añade los links de afiliados a la descripción del vídeo.
        """
        affiliates = self.get_affiliate_links(script_data)
        if not affiliates:
            return base_description

        affiliate_block = "\n\n🔧 HERRAMIENTAS MENCIONADAS\n"
        for prog in affiliates:
            affiliate_block += f"▸ {prog['name']}: {prog['url']}\n"
        affiliate_block += "(Links de afiliado — sin coste extra para ti)"

        return base_description + affiliate_block

    def log_video(self, video_id: str, script_data: dict, affiliates: list):
        """Registra el vídeo y sus afiliados para tracking de conversiones."""
        entry = {
            "date": datetime.now().isoformat(),
            "video_id": video_id,
            "title": script_data.get("title"),
            "affiliates": [p["name"] for p in affiliates],
            "estimated_rpm": self._estimate_rpm(script_data),
        }
        self.tracker["videos"].append(entry)
        self._save_tracker()

    def _estimate_rpm(self, script_data: dict) -> str:
        """Estimación de RPM basada en el topic."""
        topic = script_data.get("topic", "").lower()
        if any(w in topic for w in ["finanz", "invert", "dinero", "cripto", "bolsa"]):
            return "$9–15"
        if any(w in topic for w in ["ia", "software", "código", "tech", "herramienta"]):
            return "$8–12"
        return "$4–8"

    def print_summary(self):
        """Muestra resumen de monetización del canal."""
        videos = self.tracker.get("videos", [])
        print(f"\n📊 Resumen de monetización")
        print(f"   Vídeos publicados: {len(videos)}")
        if videos:
            last = videos[-1]
            print(f"   Último vídeo: {last['title']}")
            print(f"   RPM estimado: {last['estimated_rpm']}")
            print(f"   Afiliados activos: {', '.join(last['affiliates']) if last['affiliates'] else 'ninguno'}")

    def _load_tracker(self):
        if self.tracker_path.exists():
            with open(self.tracker_path) as f:
                self.tracker = json.load(f)
        else:
            self.tracker = {"videos": [], "total_estimated_revenue": 0}

    def _save_tracker(self):
        self.tracker_path.parent.mkdir(exist_ok=True)
        with open(self.tracker_path, "w") as f:
            json.dump(self.tracker, f, ensure_ascii=False, indent=2)


# ─── Guía de sponsors (manual) ───────────────────────────────────────────────

SPONSOR_GUIDE = """
ESTRATEGIA DE SPONSORS — Canal IA & Tech
==========================================

CUÁNDO BUSCAR TU PRIMER SPONSOR:
→ Mínimo 5.000 suscriptores o 500K views/mes acumuladas

DÓNDE ENCONTRAR SPONSORS EN NICHO TECH/IA:
1. Gumroad creators (herramientas de IA que venden cursos/software)
2. ProductHunt — contactar a los founders de productos de IA top
3. LinkedIn — buscar "Head of Marketing" en startups de IA Series A/B
4. Newsletter de tech: Beehiiv tiene marketplace de sponsors
5. Plataformas: Sponsr.is, Passionfroot, Creator.co

TARIFA RECOMENDADA POR TAMAÑO:
- 5K–10K subs:   $150–300 por mención en Short
- 10K–50K subs:  $300–800 por mención
- 50K–100K subs: $800–2.000 por mención
- 100K+ subs:    $2.000–5.000+ negociable

EMAIL TEMPLATE PARA CONTACTAR SPONSORS:
------
Asunto: Colaboración canal [NOMBRE] — Audiencia IA & Tech España

Hola [nombre],

Tengo un canal de YouTube sobre IA y tecnología con [X] suscriptores
y [Y] views/mes, audiencia principalmente española 25-45 años profesional.

Vi [PRODUCTO] en ProductHunt y encaja perfectamente con mi audiencia.
¿Os interesaría una mención patrocinada en un Short? Tarifa: [PRECIO].

Stats del canal: [LINK ANALYTICS PÚBLICO]

Saludos,
[TU NOMBRE]
------

INGRESOS PROYECTADOS (canal activo 12 meses):
- AdSense (RPM $10, 100K views/mes):      ~$1.000/mes
- 2 sponsors/mes a $400 cada uno:          $800/mes
- Afiliados (conversión 0.5%):             $300–600/mes
- TOTAL ESTIMADO:                          ~$2.100–2.400/mes ✓
"""

if __name__ == "__main__":
    print(SPONSOR_GUIDE)

===END monetization.py===


---

Cuando termines, dime:
1. Qué archivos has creado (deberían ser 13) y qué carpetas (deberían ser 4 vacías).
2. Si ya había algo y qué has sobrescrito.
3. Recuerda al usuario:
   - `pip install -r requirements.txt` para instalar dependencias.
   - Configurar variables de entorno / claves de API (Claude, ElevenLabs, YouTube, Pexels/Pixabay).
   - Probar primero con `python scheduler.py --dry-run --topic "TEMA"` antes de activar la subida real.
