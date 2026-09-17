BORROWED BRAINS
What AI actually took from neuroscience — and what it only pretends to

An interactive map about intelligence.


HOW TO OPEN IT
--------------
Unzip the folder and double-click index.html. It opens in any modern browser
(Chrome, Firefox, Safari, Edge). No server, no build step, no internet
connection required — everything is local HTML, CSS and JavaScript.


WHAT IT IS
----------
The map's argument is that every claim of the form "X in AI is brain-inspired"
is really one of five different claims, and that they are not worth the same:

  Mechanistic import   a named neural mechanism was deliberately implemented
  Reverse transfer     AI → neuroscience: an algorithm became the brain theory
  Convergent discovery both sides arrived independently; nobody borrowed
  Loose inspiration    the framing crossed over; the mechanism did not
  False cognate        same word, unrelated mechanisms — actively misleading

So the unit of the map is the EDGE, not the node. Each of the 19 connections
between 28 ideas is classified, argued for, and given its strongest
counter-argument.


HOW TO READ IT
--------------
  Left column   neuroscience          Right column   AI / machine learning
  Vertical      time, 1943 → 2023     Edge colour    kind of transfer
  Arrow head    direction of travel   Dashed grey    within-field descent

  · Scroll or drag to move down the timeline
  · Cmd/Ctrl + scroll (or the +/− buttons) to zoom
  · Click any node or connection to open its panel with sources
  · Click a legend chip to filter by transfer type


THREE VIEWS
-----------
  The Map        the 28 ideas and the 19 typed transfers between them
  The Scorecard  one edge (backprop → the weight-transport objection) expanded
                 into a rubric: 7 candidate learning algorithms scored against
                 the 5 constraints biology imposes on credit assignment
  How I Built    the curation rationale — what was cut and why, what I changed
                 my mind about, and how generative AI was used


FILES
-----
  index.html      structure and the written sections
  css/styles.css  presentation
  js/data.js      ALL content: nodes, typed edges, arguments, citations
  js/app.js       layout, rendering, pan/zoom, filtering, panels

All content lives in js/data.js and is separate from the rendering code, so
the argument can be read and edited on its own.
