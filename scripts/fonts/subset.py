"""Sous-ensemble de la police variable du site (Archivo).

Lit les fichiers de @fontsource-variable (devDependencies), ne garde que le
latin utile au français et limite les axes, puis écrit les WOFF2 dans
public/fonts. Prérequis : pip install fonttools brotli
Usage : python3 scripts/fonts/subset.py
"""
from pathlib import Path
import tempfile

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "public" / "fonts"
UNICODES = (
    "U+0000-00FF,U+0131,U+0152-0153,U+0178,U+02C6,U+02DA,U+02DC,"
    "U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215"
)

FONTS = [
    ("archivo/files/archivo-latin-wdth-normal.woff2", "archivo.woff2",
     {"wght": (300, 700), "wdth": (62, 125)}),
]


def parse_unicodes(spec: str) -> list[int]:
    points: list[int] = []
    for part in spec.split(","):
        part = part.replace("U+", "")
        start, _, end = part.partition("-")
        points.extend(range(int(start, 16), int(end or start, 16) + 1))
    return points


def build(source: Path, target: Path, axes: dict[str, tuple[int, int]]) -> None:
    font = TTFont(source)
    options = subset.Options()
    options.layout_features = ["*"]
    options.name_IDs = ["*"]
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=parse_unicodes(UNICODES))
    subsetter.subset(font)
    with tempfile.TemporaryDirectory() as tmp:
        # Recharger après le sous-ensemble évite les tables chargées paresseusement.
        staged = Path(tmp) / "staged.ttf"
        font.flavor = None
        font.save(staged)
        limited = instancer.instantiateVariableFont(TTFont(staged), axes)
        limited.flavor = "woff2"
        limited.save(target)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    base = ROOT / "node_modules" / "@fontsource-variable"
    for source, name, axes in FONTS:
        target = OUT / name
        build(base / source, target, axes)
        print(f"{name}: {target.stat().st_size // 1024} Ko")


if __name__ == "__main__":
    main()
