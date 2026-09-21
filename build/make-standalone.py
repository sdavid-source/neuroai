#!/usr/bin/env python3
"""Build the standalone, offline submission from the artifact source.

The source file (few-examples-far-transfer.html) is a page *fragment*: the
publishing platform wraps it in a document skeleton, so it carries no
<!doctype>, <html>, <head> or <body> of its own, and it pulls its typefaces
from Google Fonts.

A file opened from disk gets neither. This script produces dist/index.html:
the same page, wrapped in a real document with a charset (the citations use
accented names), a viewport, the skeleton's reset, and the three typefaces
inlined as base64 so the page needs no network at all.

    python3 build/make-standalone.py
"""
import io, os, re, zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC  = os.path.join(ROOT, "few-examples-far-transfer.html")
DIST = os.path.join(ROOT, "dist")
ZIP  = os.path.join(ROOT, "few-examples-far-transfer.zip")

src = io.open(SRC, encoding="utf-8").read()

title = re.search(r"<title>(.*?)</title>", src, re.S).group(1).strip()
body  = re.sub(r"<title>.*?</title>\s*", "", src, count=1, flags=re.S)
# the webfonts are inlined below, so drop the network requests for them
body  = re.sub(r'\s*<link rel="(?:preconnect|stylesheet)"[^>]*>\s*', "\n", body).lstrip()

fonts = io.open(os.path.join(ROOT, "build", "fonts-inline.css"), encoding="utf-8").read()

doc = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>%s</title>
<style>
/* Typefaces inlined as base64 so the page renders identically with no network. */
%s
</style>
<style>
/* Baseline reset, matching the skeleton the published version is wrapped in. */
:root {
  color-scheme: light;
  padding-top: env(safe-area-inset-top, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
body { margin: 0; font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; background: #fcfcfb; }
img { max-width: 100%%; }
[hidden] { display: none !important; }
</style>
</head>
<body>
%s
</body>
</html>
""" % (title, fonts, body)

os.makedirs(DIST, exist_ok=True)
out = os.path.join(DIST, "index.html")
io.open(out, "w", encoding="utf-8").write(doc)

with zipfile.ZipFile(ZIP, "w", zipfile.ZIP_DEFLATED) as z:
    z.write(out, "few-examples-far-transfer/index.html")
    z.write(os.path.join(ROOT, "build", "READ-ME-FIRST.txt"), "few-examples-far-transfer/READ-ME-FIRST.txt")

print("dist/index.html  %.0f KB" % (os.path.getsize(out) / 1024))
print("%s  %.0f KB" % (os.path.basename(ZIP), os.path.getsize(ZIP) / 1024))
