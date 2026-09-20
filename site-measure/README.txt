WHAT THE NUMBER DOES
The ethics of measuring intelligence, as a pipeline
— and why machines are running it again

An interactive map about intelligence.


HOW TO OPEN IT
--------------
Unzip the folder and double-click index.html. It opens in any modern browser
(Chrome, Firefox, Safari, Edge). No server, no build step, no internet
connection required — everything is local HTML, CSS and JavaScript.


THE ARGUMENT
------------
Ethical failure in intelligence measurement is not a property of bad tests.
It is what happens when a measure reaches ALLOCATION before its CONSTRUCT
VALIDITY is settled. Human psychometrics made that journey between 1905 and
1927. Machine evaluation is running the identical pipeline now, and it has
just reached stage six.

So the map is organised by STAGE rather than by harm. That makes the claim
checkable instead of editorial, and it lets the two columns be read against
each other directly.

  1 Construct          What are we claiming intelligence is?
  2 Operationalisation What task stands in for it?
  3 Norming            Who is the reference population?
  4 Aggregation        How do many things become one number?
  5 Interpretation     What is the number taken to mean?
  6 Allocation         What does the number do to someone?
  7 Feedback           How does the measure change what it measures?


WHAT THIS MAP IS NOT
--------------------
An argument against measurement. The Flynn effect was the instrument refuting
the strongest claims made for it. Gender Shades exposed a harm that was
invisible until someone built a better benchmark. The APA task force was a
field publishing its own uncertainty. Measurement is both the mechanism of
the damage and the only instrument that finds it — which is why corrections
are marked on the map alongside failures.


HOW TO READ IT
--------------
  Columns      the seven stages, left to right
  Top band     human psychometrics, 1905–1996 (9 cases)
  Bottom band  machine benchmarks, 1950–today (7 cases)
  Markers      where something entered the process, by kind:

     ●  red      documented failure
     ◌  amber    contested — the map marks the dispute, not a side
     ◆  blue     correction — the field caught and fixed something
     ■  grey     design choice — neither failure nor fix
     ✦  violet   formal constraint — a proof, not an event

  Each colour is doubled by a shape, so nothing depends on hue alone.
  The "markers per stage" row under each band is the quantitative version of
  the visual argument.

  · Click a stage heading, a case name, or any marker
  · Filter with the chips above the map
  · Hover anything for a summary


THREE VIEWS
-----------
  The Pipeline      16 cases plotted against the 7 stages, 39 markers
  Stakes & Validity 12 measurement regimes plotted by what the score decides
                    against how settled the construct is; the danger quadrant
                    is high stakes with low validity, and it is populated
  How I Built This  curation rationale — what was cut, where the evidence is
                    contested, what I changed my mind about


THE LOAD-BEARING ELEMENT
------------------------
Kleinberg, Mullainathan & Raghavan (2017) proved that calibration within
groups and equal error rates across groups cannot both hold when base rates
differ. "Just make the test fair" is therefore not an available instruction.
That is why the ethical work has to happen at stage six — deciding what a
score is permitted to decide — rather than at stage four. It is the one
marker on the map that is a theorem rather than an event, and it is drawn
differently because it constrains every row.


FILES
-----
  index.html      structure and the written sections
  css/styles.css  presentation
  js/data.js      ALL content: stages, cases, markers, arguments, citations
  js/app.js       layout, rendering, filtering, panels, the scatter plot

All content lives in js/data.js, separate from the rendering code, so the
argument can be read and edited on its own.


A NOTE ON THE COLOURS
---------------------
The marker palette and the two-domain scatter palette were checked with a
colour-vision validator against the dark chart surface: lightness band,
chroma floor, colour-blind separation across all pairs, normal-vision
separation, and contrast. Both pass on every check. Shape encoding is
carried alongside colour regardless.
