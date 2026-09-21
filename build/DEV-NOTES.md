# Dev notes

Not part of the submission. This is how the repo fits together.

## Which file is which

- **`few-examples-far-transfer.html`** is the source, and it is a page
  *fragment* — no `<!doctype>`, `<html>` or `<head>`, because the publishing
  platform wraps it. Opening this one directly gives quirks mode and no declared
  charset. **Edit here.**
- **`dist/`** holds the built site: `index.html`, `style.css`, `script.js`.
  This is what runs by double-clicking, offline included.
- **`few-examples-far-transfer.zip`** is the submission: those three files plus
  `README.md`.
- **`README.md`** is the submission document — the write-up a grader reads.

## Rebuilding

    python3 build/make-standalone.py

The build wraps the fragment in a real document (UTF-8, since the citations use
accented names; viewport; the same baseline reset the platform applies), splits
the CSS and JS into their own files, and embeds the three typefaces as base64 so
nothing is fetched at run time.

Verified from the unzipped submission with all network requests blocked:
standards mode, title in `<head>`, 8 faces loaded, 36 points drawn, zero
requests, zero errors.

## Editing the data

Edit the `DATA` block at the top of the `<script>` — the `POINTS`, `FAMILIES`
and `ZONES` arrays. Everything below it is rendering and needs no changes to
add, remove or move a point. A point with `total: null` drops out of the map
under total accounting.

If you change which points exist, **recompute the correlations** before trusting
the figures quoted on the page and in the README. They are load-bearing.

## Still to verify

- Self-driving fleet mileage and the ARC-AGI leaderboard figures both date
  quickly.
- Chang et al. is cited qualitatively. A reviewer reported r = 0.62 for it; that
  figure is not in the paper as supplied, so it is not quoted anywhere.

## The correlations, for reference

| group | n | r(efficiency, transfer), lifetime |
|---|---|---|
| all points | 36 | +0.06 |
| built or evolved | 26 | −0.12 |
| ... humans only | 13 | +0.09 |
| ... animals and hand-built | 13 | −0.39 |
| learned from data, ARC excluded | 9 | +0.56 |
| learned from data, ARC included | 10 | +0.70 |
| learned, less in-context learning | 8 | +0.24 |

Under total accounting: all points +0.23, built-or-evolved +0.53. The toggle
changes the transfer coordinate for zero of the 36 points.
