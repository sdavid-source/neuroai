# Few Examples, Far Transfer

An interactive map of 36 learners — human, animal, classical AI and current AI —
plotted on **sample efficiency** against **transfer breadth**.

> **DRAFT — read every line and make it true before submitting.**
> The factual spine here is real: it comes from my planning notes and the build
> history. But some sentences describe reasoning only I can confirm. Everything
> in `[brackets]` is a question to answer. Delete this blockquote and every
> bracket before handing in.

## To view it

Open `index.html` in any browser — double-click it, or drag it onto a browser
window. Nothing to install, no server, and it works with no internet connection.

- **Lifetime / Total** changes how experience is counted, and moves the points.
  This is the main argument of the piece.
- **Show the shift** draws each point's movement between the two.
- **Ages** labels the human points by age, birth to adulthood.
- **Families** and **Prior** filter the map.
- **Click any dot** for its full record — what it learned, from how much, and
  the study behind the placement.
- **Map / Table** switches to a table of all 36 points with every field, which
  is also the accessible equivalent of the chart.

---

## The facet I picked, and what the map argues

### Where the topic came from

I started from a list of things I was curious about rather than one question:
how intelligence relates to an ecological niche; the mechanisms behind
correlated abilities (general cognitive capacity, process overlap, mutualism);
fluid versus crystallised intelligence; whether AGI will look human-like;
ethics; creativity in AI against humans; and learning rate.

I asked Claude to help me sort that list. It grouped them into three clusters —
the positive-manifold debate, intelligence as niche-fit, and the AI questions —
and **recommended the positive-manifold cluster**, arguing that its four
competing theories each have a different structural shape, so the map's form
could be the content.

**I did not take that recommendation.** I built this instead, combining two
items from my own list: learning rate and ecological niche. [Say why, in a
sentence or two. Was the positive-manifold option too abstract? Were you more
interested in comparing humans, animals and machines directly? Did you want an
argument you could test rather than four structures to display? This is the most
important sentence in the document — it is the clearest evidence that the
organising idea is yours.]

### What belongs in it

36 learners, chosen so each family is carried by cases a reader either already
knows or can be told in two sentences: taste aversion and the digger wasp rather
than only lab paradigms; riding a bike and learning to drive alongside Bayesian
Program Learning and AlphaZero.

I left things out deliberately. Older-adult learning came out late as the
weakest item on the board — thin citation, and its job was closing the lifespan
rather than carrying the argument. [Name one or two others you considered and
cut, if you remember them.]

### What distinctions matter

Three, and the map is built on them:

1. **Sample efficiency against transfer breadth.** Both are rankings out of ten,
   not measurements. The map says so, because the units genuinely do not compare
   across families — nobody can say a crow needed *n* examples the way a network
   did.
2. **Lifetime against total accounting.** Lifetime counts only the examples met
   during the learning episode in question. Total counts the whole budget:
   evolution for animals, pretraining for models, hand-built knowledge for
   symbolic systems.
3. **Where the prior came from** — built or evolved, against learned from data.
   This distinction came last and turned out to carry the finding.

### How the pieces relate

Position carries the meaning on both axes. Colour and shape give the family.
The accounting toggle makes position *conditional*, which is the point: the same
learner sits in two different places depending on what you agree to count.

The collisions are content rather than clutter. Under total accounting, taste
aversion, the digger wasp and birdsong land on one square; Deep Blue lands on
AlphaZero, having reached the same game from the opposite end.

### The story

Efficiency is bought with priors, and the question worth asking is what the
prior charges. Priors that are **built or evolved** buy speed by narrowing —
they make a learner fast at one problem and useless at the rest. Priors
**learned from data** appear not to. That asymmetry, rather than one universal
tradeoff, is what the map turns out to show.

---

## How I used generative AI

### What I brought before any building started

I wrote the content spec myself first: the two axes and what each end means, the
lifetime-versus-total distinction, the thesis, an initial set of points with
coordinates, the region annotations, and a list of things I knew I had to verify
before publishing.

That ordering mattered. The site was built around my content rather than my
content being fitted into a template. [If you sketched the two-axis layout on
paper first, say so here.]

### Working in pieces

I did not ask for the site in one go. The order was: the map and its toggle
first; then more everyday examples, once the first version read too much like a
literature review; then a human age series, so species and task are held
constant and only age of first exposure varies; then a correlation check on my
own data; then the Prior filter, once it was clear the finding rested on a
distinction no viewer could see; then cuts; then styling last.

### Decisions I made

- The axes are ordinal rankings, and the map says so rather than implying
  precision it does not have.
- The accounting toggle is the central interaction, not decoration.
- Every coordinate is hand-assigned and anchored to a named study — 36 pairs.
  This is the part of the project that could not be generated.
- The prose under the chart was cut roughly in half once it had grown into an
  essay competing with the map.
- The map opens on chess expertise, a point any reader already understands,
  rather than on the keystone.

### What I turned down

- The positive-manifold topic, as above.
- A per-point visual flag for ecological validity. Two reviewers pushed for it.
  I put the argument on six animal cards and in the footer instead, because a
  fourth visual channel on an already dense scatter costs more than it returns.
- Trimming more human points for family balance. That recommendation rested on a
  reading of the thesis the map does not have, and the numbers showed dropping
  four humans could swing the subgroup correlation by as much as 1.5.
- More vivid data colours. Only three of seventy candidate palettes cleared
  colour-blindness separation in both themes, and the best scored worse than
  what was already there.

### What changed because I checked

The strongest thing I did was test the thesis on my own data instead of assuming
it. Across all 36 points the correlation between the two axes is **+0.06** — no
tradeoff at all. The universal claim I started with is simply not in the data.
Splitting the points by where the prior came from is what found the real
structure: **−0.12** for built and evolved priors against **+0.56** for priors
learned from data. The map reports the null result before the finding.

Fact-checking the citations moved several points materially:

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

### What I would do next

The clearest weakness is that the transfer axis conflates how many domains a
skill covers with how far it reaches inside one — AlphaFold scores 2 for
generalising to proteins unlike anything it trained on, while the honeybee
scores 7 for carrying one rule between two senses. Defining transfer by how far
an input can drift before performance drops would reshuffle the rankings.

The falsification test the site names is the other thread worth pulling: two
systems with the same total experience, one with a stronger built-in bias, and
see whether the stronger one really transfers less far.

[Pick one and say why it interests you, or replace both with your own.]

---

## Files

`index.html`, `style.css` and `script.js` are the site. The data lives in a
clearly marked block at the top of `script.js` — 36 points with their
coordinates, fields and sources. The three typefaces are embedded in the CSS so
the page looks the same with no network connection.
