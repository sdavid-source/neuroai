# neuroai

**Borrowed Brains** — an interactive map about intelligence.
*What AI actually took from neuroscience, and what it only pretends to.*

## Run it

Open `site/index.html` in any browser. No server, no build, no network.

## Submit it

`borrowed-brains.zip` is the packaged standalone site (unzip → double-click `index.html`).
Rebuild it after any edit with:

```sh
rm -f borrowed-brains.zip && (cd site && zip -rq ../borrowed-brains.zip . -x '.*')
```

## The argument

Every claim of the form *"X in AI is brain-inspired"* is really one of five different
claims, and they are not worth the same. The unit of the map is therefore the **edge**,
not the node: each of the 19 connections between 28 ideas is typed, argued for, and
given its strongest counter-argument.

| Type | Meaning |
|---|---|
| Mechanistic import | A named neural mechanism was deliberately implemented |
| Reverse transfer | AI → neuroscience: an algorithm became the brain theory |
| Convergent discovery | Both sides arrived independently; nobody borrowed |
| Loose inspiration | The framing crossed over; the mechanism did not |
| False cognate | Same word, unrelated mechanisms — actively misleading |

Three views: **The Map**, **The Scorecard** (7 credit-assignment algorithms × 5
biological-plausibility constraints), and **How I Built This** (curation rationale).

## Layout

```
site/
  index.html      structure + the written sections
  css/styles.css  presentation
  js/data.js      ALL content — nodes, typed edges, arguments, citations
  js/app.js       layout, rendering, pan/zoom, filtering, panels
  README.txt      instructions bundled inside the zip
```

Content is fully separated from rendering, so the argument in `js/data.js` can be
read and edited on its own.
