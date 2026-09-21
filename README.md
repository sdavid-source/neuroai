# neuroai

Coursework for a Neuro AI class.

## Few Examples, Far Transfer

An interactive argument map plotting thirty-six learners (human, animal,
classical AI, current AI) on **sample efficiency** against **transfer
breadth**, with a toggle between two ways of counting experience:

- **Lifetime** — only the examples this individual or model met during the
  learning episode in question. Evolution and pretraining are free.
- **Total** — the whole experience budget: evolutionary shaping for organisms,
  pretraining for models, hand-engineered priors for symbolic systems.

The thesis: efficiency is bought with priors, and what matters is what the
prior charges. **Hand-built and evolved priors buy efficiency by narrowing.
Priors learned from data appear not to.** That asymmetry, rather than a
universal tradeoff, is what the map is evidence for.

The toggle illustrates it — in-context learning sits alone in the upper-right
corner under lifetime accounting and collapses onto pretraining under total —
but the accounting rule guarantees that collision, so it illustrates rather
than evidences. The evidence is the correlation split below.

The human family is an age series from birth to adulthood. Filter to **Human** and
switch **Ages** on to read it: the prior arrives pre-installed at birth,
efficiency peaks in infancy, perceptual narrowing spends general capacity to
buy efficiency in one language between 6 and 12 months, and late first-language
acquisition shows that the window matters more than the experience budget.

Watch what collides in the lower left when you switch. Taste aversion, the
digger wasp and birdsong land on the same square. Deep Blue lands on AlphaZero,
having reached the same game from the opposite end. Fine-tuning lands on
in-context learning lands on pretraining. The pile-up is the argument.

Positions are arguments, not measurements. The axes are ordinal, the units are
not commensurable across families, and every point is anchored to a named study
so the placement can be contested. Low-confidence placements carry a dashed
ring on the map.

### Which file is which

- **`few-examples-far-transfer.html`** is the source, and it is a page
  *fragment* — no `<!doctype>`, `<html>` or `<head>`, because the publishing
  platform wraps it. Opening this one directly gives quirks mode and no
  declared charset. Edit here.
- **`dist/`** holds the built site as the three files the assignment names —
  `index.html`, `style.css`, `script.js`. This is what runs by double-clicking,
  offline included.
- **`few-examples-far-transfer.zip`** is the submission: those three files, a
  short read-me, and `PROCESS-NOTE.md`. Rebuild with
  `python3 build/make-standalone.py` after any edit to the source.
- **`PROCESS-NOTE.md`** is a template you must fill in before submitting. The
  assignment marks whether you can explain your own choices, and that is not
  something to leave blank or to have written for you.

### Editing

Open the file and edit the `DATA` block at the top of the `<script>` — the
`POINTS`, `FAMILIES` and `ZONES` arrays. Everything below that block is
rendering and needs no changes to add, remove or move a point. A point with
`total: null` drops out of the map when you switch to total accounting.

The page is a single self-contained HTML file with no build step; open it in a
browser directly.

### Still to verify before this is presentable

Every citation was fact-checked against the literature in September 2026 and
the errors found were corrected. What remains open:

- Current self-driving fleet mileage and the ARC-AGI leaderboard figures, both
  of which date quickly.
- Chang et al. is cited qualitatively. Another reviewer reported a specific
  correlation of r = 0.62 for it; that figure does not appear in the paper as
  supplied, so it is deliberately not quoted here. Check the figures directly
  if you want a number.

### Three objections to have an answer ready for

- The transfer axis conflates *breadth of domain* with *reach within one*.
  AlphaFold generalises to proteins unlike anything it trained on and still
  scores low here, only because proteins are one domain.
- If every efficient learner turns out to have paid somewhere, what
  observation would falsify the thesis? A claim that survives every case by
  relocating the cost is not yet a claim. The matched-budget test is the one
  to name: hold total experience constant, vary the strength of the prior,
  and see whether transfer actually falls.
- Several animal points may sit low on transfer because of how the study was
  run rather than what the animal can do. Bräuer et al. argue species are
  routinely tested outside their primary modality.

### Does the map show its own thesis?

Across all 36 points the correlation between the axes is **+0.06** (lifetime)
and **+0.23** (total). A tradeoff would be negative, so on that reading the
universal thesis is simply not in the data — which is why it was narrowed.

Split by where the prior came from, under lifetime accounting:

| group | n | r(efficiency, transfer) |
|---|---|---|
| hand-built or evolved priors | 26 | **−0.12** |
| priors learned from data | 10 | **+0.70** |

The gap between those is the finding. Caveats, all stated on the page: −0.12
is weak; the coordinates are one author's ordinal judgements, so this describes
the placements rather than measuring the world; and several biological points
resist it outright (infant segmentation 9/6, toddler 8/7, honeybee 5/7).

Note also that the toggle changes the transfer coordinate for **zero** of the
36 points, so it can only ever test half the claim, and that under total
accounting the hand-built group flips to +0.53 — compression, not a discovery.

## Submitting it

`few-examples-far-transfer.zip` is the standalone build. It unzips to a
folder containing `index.html` and a short read-me; open the HTML in any
browser, with or without an internet connection.

Rebuild it after editing the map:

    python3 build/make-standalone.py

The source file is a page *fragment* — it has no `<!doctype>`, `<html>` or
`<head>`, because the publishing platform wraps it in a skeleton. The build
script supplies a real document: a UTF-8 charset (the citations use accented
names), a viewport, the same baseline reset, and the three typefaces inlined
as base64 so nothing is fetched over the network. Verified with all network
requests blocked: standards mode, 8 faces loaded, 36 points drawn, zero
requests, zero errors.
