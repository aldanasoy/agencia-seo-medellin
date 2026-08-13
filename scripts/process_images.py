#!/usr/bin/env python3
"""
process_images.py — Agencia SEO Medellín image pipeline
Mejorado desde Pawayo: descarga Unsplash, aplica grain + vignette + color_jitter,
elimina EXIF original, embeds metadatos SEO propios, convierte a WebP <90kb.

Usage:
    pip3 install Pillow piexif numpy
    python3 scripts/process_images.py
"""

import io
import os
import random
import sys
import time
import urllib.request

try:
    from PIL import Image, ImageFilter, ImageEnhance, ImageDraw
    import piexif
    import numpy as np
except ImportError:
    sys.exit("Ejecuta: pip3 install Pillow piexif numpy")

IMAGES = [
    {
        "out": "hero.webp",
        "url": "https://images.unsplash.com/photo-1548397968-8790c49522db?w=1280&q=80&fit=crop&crop=center",
        "w": 1280, "h": 600,
        "seo_title": "Medellín Valle de Aburrá — Agencia SEO Medellín Sergio Aldana",
        "seo_desc": "Vista panorámica de Medellín, Ciudad de la Eterna Primavera. Sergio Aldana agencia SEO local en Medellín.",
        "seo_keywords": "agencia seo medellin,posicionamiento web medellin,seo local medellin,sergio aldana seo",
    },
    {
        "out": "analytics.webp",
        "url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85&fit=crop",
        "w": 1200, "h": 675,
        "seo_title": "Análisis SEO y Posicionamiento Web — Sergio Aldana Medellín",
        "seo_desc": "Resultados de posicionamiento SEO medibles para empresas de Medellín y el Valle de Aburrá.",
        "seo_keywords": "resultados seo medellin,analytics seo,posicionamiento google medellin",
    },
    {
        "out": "strategy.webp",
        "url": "https://images.unsplash.com/photo-1529119368496-2dfda6ec2804?w=1200&q=85&fit=crop",
        "w": 1200, "h": 675,
        "seo_title": "Estrategia SEO Medellín — Consultoría y Planificación",
        "seo_desc": "Metodología SEO estructurada para empresas paisas. Auditoría, estrategia e implementación.",
        "seo_keywords": "estrategia seo medellin,consultoria seo,metodologia seo colombia",
    },
    {
        "out": "medellin2.webp",
        "url": "https://images.unsplash.com/photo-1653932610416-399b3deb52d2?w=1200&q=85&fit=crop&crop=center",
        "w": 1200, "h": 675,
        "seo_title": "Ciudad de Medellín — Agencia SEO Local Valle de Aburrá",
        "seo_desc": "Medellín, la Ciudad de la Eterna Primavera. Posicionamos negocios locales en Google.",
        "seo_keywords": "seo local medellin,valle de aburra,agencia digital medellin",
    },
]

MAX_SIZE_KB     = 88
WEBP_QUALITY    = 82
OUTPUT_DIR      = os.path.join(os.path.dirname(__file__), "..", "img")

CROP_RANGE      = (0.02, 0.05)
GRAIN_INTENSITY = 7
GRAIN_OPACITY   = 0.08
COLOR_JITTER    = 0.02
VIGNETTE_STRENGTH = 0.18


def download_url(url: str) -> bytes:
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"},
    )
    with urllib.request.urlopen(req, timeout=45) as resp:
        return resp.read()


def add_grain(img: Image.Image) -> Image.Image:
    arr = np.array(img, dtype=np.float32)
    noise = np.random.normal(0, GRAIN_INTENSITY, arr.shape).astype(np.float32)
    blended = arr + noise * GRAIN_OPACITY
    return Image.fromarray(np.clip(blended, 0, 255).astype(np.uint8))


def add_vignette(img: Image.Image) -> Image.Image:
    """Agrega viñeta sutil en bordes para diferenciar del original."""
    w, h = img.size
    mask = Image.new("L", (w, h), 255)
    draw = ImageDraw.Draw(mask)
    strength = VIGNETTE_STRENGTH
    for i in range(min(w, h) // 3):
        alpha = int(255 * (1 - strength * (1 - i / (min(w, h) // 3))))
        draw.rectangle([i, i, w - i - 1, h - i - 1], outline=alpha)
    arr_img = np.array(img, dtype=np.float32)
    arr_mask = np.array(mask, dtype=np.float32) / 255.0
    for c in range(3):
        arr_img[:, :, c] = arr_img[:, :, c] * arr_mask
    return Image.fromarray(np.clip(arr_img, 0, 255).astype(np.uint8))


def random_crop(img: Image.Image) -> Image.Image:
    w, h = img.size
    lo, hi = CROP_RANGE
    left   = int(w * random.uniform(lo, hi))
    right  = int(w * random.uniform(lo, hi))
    top    = int(h * random.uniform(lo, hi))
    bottom = int(h * random.uniform(lo, hi))
    cropped = img.crop((left, top, w - right, h - bottom))
    return cropped.resize((w, h), Image.LANCZOS)


def color_jitter(img: Image.Image) -> Image.Image:
    img = ImageEnhance.Brightness(img).enhance(1.0 + random.uniform(-COLOR_JITTER, COLOR_JITTER))
    img = ImageEnhance.Color(img).enhance(1.0 + random.uniform(-COLOR_JITTER, COLOR_JITTER))
    img = ImageEnhance.Contrast(img).enhance(1.0 + random.uniform(-0.01, 0.01))
    return img


def build_exif(title: str, description: str, keywords: str) -> bytes:
    """EXIF limpio con metadatos SEO propios — elimina huella del original."""
    exif_dict = {
        "0th": {
            piexif.ImageIFD.ImageDescription: description.encode("utf-8"),
            piexif.ImageIFD.XPTitle:    title.encode("utf-16le"),
            piexif.ImageIFD.XPKeywords: keywords.encode("utf-16le"),
            piexif.ImageIFD.Software:  b"Sergio Aldana Agencia SEO Medellin",
            piexif.ImageIFD.Artist:    b"Sergio Aldana",
            piexif.ImageIFD.Copyright: b"Sergio Aldana - Agencia SEO Medellin Colombia",
            piexif.ImageIFD.Make:      b"Agencia SEO Medellin",
        },
        "Exif": {},
        "GPS":  {},
    }
    return piexif.dump(exif_dict)


def save_webp_under_limit(img: Image.Image, out_path: str, exif_bytes: bytes) -> int:
    current_img = img.copy()
    for scale_pass in range(3):
        if scale_pass > 0:
            w, h = current_img.size
            current_img = current_img.resize((int(w * 0.85), int(h * 0.85)), Image.LANCZOS)
        quality = WEBP_QUALITY
        for _ in range(8):
            buf = io.BytesIO()
            current_img.save(buf, "WEBP", quality=quality, method=6, exif=exif_bytes)
            size_kb = len(buf.getvalue()) / 1024
            if size_kb <= MAX_SIZE_KB:
                with open(out_path, "wb") as f:
                    f.write(buf.getvalue())
                return int(size_kb)
            quality -= 5
    with open(out_path, "wb") as f:
        f.write(buf.getvalue())
    return int(size_kb)


def process_one(entry: dict) -> None:
    out_path = os.path.join(OUTPUT_DIR, entry["out"])
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    print(f"  → {entry['out']} ...", end=" ", flush=True)

    raw = download_url(entry["url"])
    img = Image.open(io.BytesIO(raw)).convert("RGB")

    img = random_crop(img)
    img = color_jitter(img)
    img = add_grain(img)
    img = add_vignette(img)
    img = img.resize((entry["w"], entry["h"]), Image.LANCZOS)
    img = img.filter(ImageFilter.UnsharpMask(radius=0.5, percent=60, threshold=3))

    exif_bytes = build_exif(entry["seo_title"], entry["seo_desc"], entry["seo_keywords"])
    size_kb = save_webp_under_limit(img, out_path, exif_bytes)
    print(f"ok  ({size_kb} KB)")


if __name__ == "__main__":
    random.seed()
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"Procesando {len(IMAGES)} imágenes → {OUTPUT_DIR}\n")
    failed = []
    for entry in IMAGES:
        try:
            process_one(entry)
            time.sleep(0.4)
        except Exception as e:
            print(f"FALLÓ ({e})")
            failed.append(entry["out"])
    print()
    if failed:
        print(f"Fallaron: {', '.join(failed)}")
    else:
        print("Todas las imágenes procesadas correctamente.")
