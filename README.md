# neuroai

Coursework for a Neuro AI class.

## Few Examples, Far Transfer

`few-examples-far-transfer.html` — an interactive argument map plotting fifteen
learners (human, animal, classical AI, current AI) on **sample efficiency**
against **transfer breadth**, with a toggle between two ways of counting
experience:

- **Lifetime** — only the examples this individual or model met during the
  learning episode in question. Evolution and pretraining are free.
- **Total** — the whole experience budget: evolutionary shaping for organisms,
  pretraining for models, hand-engineered priors for symbolic systems.

The thesis is that sample efficiency is purchased with priors, and priors are
what limit transfer — so the upper-right corner is empty once you count
honestly. The toggle is the argument: LLM in-context learning sits alone in
that corner under lifetime accounting and collapses onto pretraining under
total accounting.

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

- Trial counts and sample sizes in each cited study — drafted from memory.
- Whether the honeybee visual-to-olfactory transfer is in Giurfa et al. 2001
  itself or a later paper from that group.
- The ARC-AGI figures, which are contested and move fast. See the note under
  the map.
