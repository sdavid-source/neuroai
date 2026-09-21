#!/usr/bin/env python3
"""Build the standalone submission from the artifact source.

The source (few-examples-far-transfer.html) is a page *fragment*: the publishing
platform wraps it in a document skeleton, so it carries no <!doctype>, <html>,
<head> or <body>, and it pulls its typefaces from Google Fonts over the network.

This produces dist/, holding the three files the assignment names:

    index.html   a real document — doctype, UTF-8 (the citations use accented
                 names), viewport, and a <head> that owns the title
    style.css    the page's CSS, with the three typefaces embedded as base64 so
                 nothing is fetched at run time
    script.js    the data block and all the rendering

and zips them. Run it after any edit to the source:

    python3 build/make-standalone.py
"""
import io, os, re, zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC  = os.path.join(ROOT, "few-examples-far-transfer.html")
DIST = os.path.join(ROOT, "dist")
ZIP  = os.path.join(ROOT, "few-examples-far-transfer.zip")

src = io.open(SRC, encoding="utf-8").read()

title = re.search(r"<title>(.*?)</title>", src, re.S).group(1).strip()
rest  = re.sub(r"<title>.*?</title>\s*", "", src, count=1, flags=re.S)
# the webfonts are embedded in style.css, so drop the network requests
rest  = re.sub(r'\s*<link rel="(?:preconnect|stylesheet)"[^>]*>\s*', "\n", rest).lstrip()

style  = re.search(r"<style>(.*?)</style>", rest, re.S).group(1)
script = re.search(r"<script>(.*?)</script>", rest, re.S).group(1)
body   = re.sub(r"<style>.*?</style>\s*", "", rest, count=1, flags=re.S)
body   = re.sub(r"<script>.*?</script>\s*", "", body, count=1, flags=re.S).strip()

fonts = io.open(os.path.join(ROOT, "build", "fonts-inline.css"), encoding="utf-8").read()

css = """/* Typefaces embedded as base64 so the page renders identically with no network. */
%s

/* Baseline reset, matching the skeleton the published version is wrapped in. */
:root {
  color-scheme: light;
  padding-top: env(safe-area-inset-top, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
body { margin: 0; font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; background: #e9ece9; }
img { max-width: 100%%; }
[hidden] { display: none !important; }
%s""" % (fonts, style)

html = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>%s</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
%s
<script src="script.js"></script>
</body>
</html>
""" % (title, body)

os.makedirs(DIST, exist_ok=True)
files = {"index.html": html, "style.css": css, "script.js": script.strip() + "\n"}
for name, text in files.items():
    io.open(os.path.join(DIST, name), "w", encoding="utf-8").write(text)

with zipfile.ZipFile(ZIP, "w", zipfile.ZIP_DEFLATED) as z:
    for name in files:
        z.write(os.path.join(DIST, name), "few-examples-far-transfer/" + name)
    z.write(os.path.join(ROOT, "build", "READ-ME-FIRST.txt"),
            "few-examples-far-transfer/READ-ME-FIRST.txt")
    note = os.path.join(ROOT, "PROCESS-NOTE.md")
    if os.path.exists(note):
        z.write(note, "few-examples-far-transfer/PROCESS-NOTE.md")

for name in files:
    print("  dist/%-12s %6.0f KB" % (name, os.path.getsize(os.path.join(DIST, name)) / 1024))
print("  %s  %.0f KB" % (os.path.basename(ZIP), os.path.getsize(ZIP) / 1024))
