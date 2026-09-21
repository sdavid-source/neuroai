# neuroai

Coursework for a Neuro AI class.

## Few Examples, Far Transfer

`few-examples-far-transfer.html` — an interactive argument map plotting
thirty-seven learners (human, animal, classical AI, current AI) on **sample
efficiency** against **transfer breadth**, with a toggle between two ways of
counting experience:

- **Lifetime** — only the examples this individual or model met during the
  learning episode in question. Evolution and pretraining are free.
- **Total** — the whole experience budget: evolutionary shaping for organisms,
  pretraining for models, hand-engineered priors for symbolic systems.

The thesis is that sample efficiency is purchased with priors, and priors are
what limit transfer — so the upper-right corner is empty once you count
honestly. The toggle is the argument: LLM in-context learning sits alone in
that corner under lifetime accounting and collapses onto pretraining under
total accounting.

The human family is an age series from birth to 65+. Filter to **Human** and
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

### The number that should worry you

Across the 37 points, the correlation between the two axes is **+0.06** under
lifetime accounting and **+0.23** under total accounting. The thesis predicts a
negative relationship. The data, as placed, does not show one — and the toggle
changes the transfer coordinate for **zero** of the 37 points, so it can only
ever test half of the claim. Either the placements need revisiting or the
thesis needs narrowing. See the notes in the page footer.

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
requests blocked: standards mode, 8 faces loaded, 37 points drawn, zero
requests, zero errors.
