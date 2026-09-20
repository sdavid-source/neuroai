# neuroai

Two interactive maps about intelligence. Each is a standalone HTML/CSS/JS site
that runs by opening `index.html` — no server, no build, no network.

| | Project | Directory | Zip |
|---|---|---|---|
| 1 | **Borrowed Brains** — what AI actually took from neuroscience, and what it only pretends to | `site/` | `borrowed-brains.zip` |
| 2 | **What the Number Does** — the ethics of measuring intelligence, as a pipeline | `site-measure/` | `what-the-number-does.zip` |

Rebuild either zip after editing:

```sh
rm -f borrowed-brains.zip      && (cd site         && zip -rq ../borrowed-brains.zip . -x '.*')
rm -f what-the-number-does.zip && (cd site-measure && zip -rq ../what-the-number-does.zip . -x '.*')
```

---

## 1 · Borrowed Brains

**Thesis.** Every claim of the form *"X in AI is brain-inspired"* is really one of five
different claims, and they are not worth the same. The unit of the map is therefore the
**edge**, not the node: 19 connections between 28 ideas, each typed, argued for, and given
its strongest counter-argument.

| Type | Meaning |
|---|---|
| Mechanistic import | A named neural mechanism was deliberately implemented |
| Reverse transfer | AI → neuroscience: an algorithm became the brain theory |
| Convergent discovery | Both sides arrived independently; nobody borrowed |
| Loose inspiration | The framing crossed over; the mechanism did not |
| False cognate | Same word, unrelated mechanisms — actively misleading |

Views: **The Map** · **The Scorecard** (7 credit-assignment algorithms × 5
biological-plausibility constraints) · **How I Built This**.

## 2 · What the Number Does

**Thesis.** Ethical failure in intelligence measurement is not a property of bad tests. It
is what happens when a measure reaches **allocation** before its **construct validity** is
settled. Human psychometrics made that journey between 1905 and 1927; machine evaluation is
running the identical pipeline now and has just reached stage six.

Organised by **stage**, not by harm — which makes the claim checkable rather than editorial,
and lets the human and machine bands be read against each other on one shared axis.
16 cases, 39 markers, across seven stages: Construct → Operationalisation → Norming →
Aggregation → Interpretation → Allocation → Feedback.

Markers are typed *failure / contested / correction / design choice / formal constraint* —
the corrections matter, because the Flynn effect and *Gender Shades* are cases where
measurement was the instrument that exposed the problem.

Views: **The Pipeline** · **Stakes & Validity** (12 regimes plotted by what the score decides
against how settled the construct is) · **How I Built This**.

---

## Layout

```
site/                     Borrowed Brains
site-measure/             What the Number Does
  index.html              structure + the written sections
  css/styles.css          presentation
  js/data.js              ALL content — the argument, separate from the code
  js/app.js               layout, rendering, interaction
  README.txt              instructions bundled inside the zip
```

Content is fully separated from rendering in both sites, so each argument lives in one
readable `js/data.js` and can be edited without touching the code.
