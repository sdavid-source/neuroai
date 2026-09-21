# Process note

> **DRAFT — read every line and make it true before you submit.**
> This was assembled from your own planning conversation and the build log, so
> the factual spine is real. But some sentences describe reasoning only you can
> confirm. Anything in `[brackets]` is a question for you. Delete this
> blockquote and every bracket when you are done.

## Where the topic came from

I started from a list of things I was curious about rather than a single
question: how intelligence relates to an ecological niche; the psychological
mechanisms behind correlated abilities (general cognitive capacity, process
overlap, mutualism); fluid versus crystallised intelligence; whether AGI will
look human-like; ethics; creativity in AI against humans; and learning rate.

I asked Claude to help me sort that list. It grouped them into three clusters —
the positive-manifold debate, intelligence as niche-fit, and the AI questions —
and **recommended the positive-manifold cluster**, on the grounds that the four
competing theories each have a different structural shape and the map's form
could be the content.

**I did not take that recommendation.** I built the learning-rate map instead,
which combines two items from my original list: learning rate and ecological
niche. [Say why in a sentence or two. Was it that the positive-manifold option
felt too abstract? That you were more interested in the comparison across
humans, animals and machines? That you wanted an argument you could test rather
than four structures to display? Whatever the real reason was.]

## What I brought before any building started

Before asking for any code I wrote the content spec myself: the two axes and
what each end means, the lifetime-versus-total accounting distinction, the
thesis, an initial set of points with coordinates, the region annotations, and
a list of things I knew I had to verify before publishing.

That ordering mattered. The site was built around my content rather than my
content being fitted into a template. [If you sketched the two-axis layout on
paper first, say so — that is worth a sentence.]

## Decisions I made during the build

- **The two axes are ordinal rankings, not measurements.** The map says so
  outright, because the units genuinely do not compare across families.
- **The accounting toggle is the central interaction**, not decoration.
  Switching it moves the points and changes the conclusion.
- **Every coordinate is hand-assigned** and anchored to a named study — 36
  pairs. This is the part of the project that could not be generated.
- **Scope calls:** I asked for more everyday examples when the first version
  read too much like a literature review, added a human age series so that
  species and task are held constant and only age varies, cut the prose under
  the chart roughly in half when it had grown into an essay, and cut the
  older-adult learning point as the weakest item on the board.
- **The map opens on chess expertise**, a point any reader already understands,
  rather than on the keystone.

## What I rejected

- The positive-manifold topic, as above.
- A per-point visual flag for ecological validity. Two reviewers pushed for it.
  I put the argument on six animal cards and in the footer instead, because a
  fourth visual channel on an already dense scatter costs more than it returns.
- Trimming more human points for family balance. The recommendation rested on a
  reading of the thesis the map does not have, and the numbers showed that
  dropping four humans could swing the subgroup correlation by as much as 1.5.
- Swapping the four data colours for more vivid ones. Only three of seventy
  candidate palettes cleared colour-blindness separation in both themes, and the
  best scored worse than what was already there.

## What changed because I checked

The strongest thing I did was test the thesis on my own data instead of
assuming it. Across all 36 points the correlation between the two axes is
**+0.06** — no tradeoff at all. The universal claim I started with is simply not
in the data. Splitting the points by where the prior came from is what found the
real structure: **−0.12** for built and evolved priors against **+0.56** for
priors learned from data. The map now reports the null result before the
finding.

Fact-checking the citations changed several points materially:

- **Deep Blue** was described as needing no training data. Its own cited paper
  says the evaluation weights were tuned on master games and the opening book
  came from over 700,000 grandmaster games. The point moved from (8,0) to (2,0).
- **One-shot face recognition** had the finding backwards. Unfamiliar-face
  matching is close to chance; it is familiarity that buys accuracy.
- **Toddler fast mapping** is 3- and 4-year-olds across about five weeks, not a
  single exposure at 2–3.
- The **/r/–/l/ narrowing** result is Kuhl et al. 2006, not Werker & Tees.
- A reviewer reported a correlation of **r = 0.62** for Chang et al. That figure
  does not appear in the paper, so it is not quoted anywhere on the site.

## What I would do next

The map's clearest weakness is that the transfer axis conflates how many domains
a skill covers with how far it reaches inside one — AlphaFold scores 2 for
generalising to proteins unlike anything it trained on, while the honeybee
scores 7 for carrying one rule between two senses. Defining transfer by how far
an input can drift before performance drops would reshuffle the rankings.

The falsification test the site names is the other thread worth pulling: two
systems with the same total experience, one with a stronger built-in bias, and
see whether the stronger one really transfers less far.

[Pick one and say why it interests you, or replace both with your own.]
