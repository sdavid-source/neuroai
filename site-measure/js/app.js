/* =============================================================================
   What the Number Does — rendering & interaction
   ========================================================================== */
(function () {
  "use strict";

  const NS = "http://www.w3.org/2000/svg";
  const el = (id) => document.getElementById(id);
  const mk = (tag, attrs) => {
    const n = document.createElementNS(NS, tag);
    if (attrs) for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  };
  const rgba = (hex, a) => {
    const h = hex.replace("#", "");
    const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
  };
  const md = (s) => String(s).replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
  const paras = (s) => md(s).split(/\n\n+/).map((p) => `<p>${p}</p>`).join("");

  const DOMAINS = {
    human: { label: "Human psychometrics", short: "Human", color: "#3987e5", shape: "circle" },
    machine: { label: "Machine benchmarks", short: "Machine", color: "#d95926", shape: "triangle" }
  };

  const stageById = {};
  STAGES.forEach((s, i) => { stageById[s.id] = s; s._i = i; });
  const caseById = {};
  CASES.forEach((c) => (caseById[c.id] = c));

  const state = {
    view: "pipeline",
    kinds: new Set(Object.keys(KINDS)),
    domains: new Set(Object.keys(DOMAINS)),
    sel: null // {type:'marker'|'case'|'stage'|'point', id}
  };

  /* ================================================== SHAPE CONSTRUCTION == */
  // Every colour is doubled by a shape, so identity never rests on hue alone.
  function shapeNode(shape, color, scale) {
    const s = scale || 1;
    const g = mk("g");
    let n;
    if (shape === "circle") {
      n = mk("circle", { cx: 0, cy: 0, r: 7 * s, fill: color });
      g.appendChild(n);
    } else if (shape === "ring") {
      g.appendChild(mk("circle", { cx: 0, cy: 0, r: 7.5 * s, fill: color }));
      const inner = mk("circle", { cx: 0, cy: 0, r: 3.4 * s, fill: "#141922" });
      inner.setAttribute("stroke", "none");
      g.appendChild(inner);
    } else if (shape === "diamond") {
      g.appendChild(mk("path", {
        d: `M 0 ${-8.6 * s} L ${8.6 * s} 0 L 0 ${8.6 * s} L ${-8.6 * s} 0 Z`, fill: color
      }));
    } else if (shape === "square") {
      g.appendChild(mk("rect", {
        x: -6.2 * s, y: -6.2 * s, width: 12.4 * s, height: 12.4 * s, rx: 2, fill: color
      }));
    } else if (shape === "star") {
      const a = 11 * s, b = 3.1 * s;
      g.appendChild(mk("path", {
        d: `M 0 ${-a} L ${b} ${-b} L ${a} 0 L ${b} ${b} L 0 ${a} L ${-b} ${b} L ${-a} 0 L ${-b} ${-b} Z`,
        fill: color
      }));
    } else if (shape === "triangle") {
      g.appendChild(mk("path", {
        d: `M 0 ${-8.6 * s} L ${8 * s} ${6.4 * s} L ${-8 * s} ${6.4 * s} Z`, fill: color
      }));
    }
    Array.from(g.children).forEach((c) => c.classList.add("marker-shape"));
    return g;
  }
  function shapeSwatch(shape, color) {
    const svg = mk("svg", { width: 14, height: 14, viewBox: "-9 -9 18 18" });
    const g = shapeNode(shape, color, 0.78);
    Array.from(g.children).forEach((c) => c.setAttribute("stroke", "none"));
    svg.appendChild(g);
    return svg;
  }

  /* ========================================================= TOOLTIP ====== */
  const tip = el("tooltip");
  function showTip(evt, html) {
    tip.innerHTML = html;
    tip.hidden = false;
    const pad = 14;
    let x = evt.clientX + pad, y = evt.clientY + pad;
    const r = tip.getBoundingClientRect();
    if (x + r.width > window.innerWidth - 8) x = evt.clientX - r.width - pad;
    if (y + r.height > window.innerHeight - 8) y = evt.clientY - r.height - pad;
    tip.style.left = x + "px";
    tip.style.top = y + "px";
  }
  const hideTip = () => { tip.hidden = true; };

  /* ========================================================== PIPELINE ==== */
  const PIPE = {
    W: 1440, gutter: 266, right: 1424,
    headH: 106, rowH: 40, bandGap: 44, bandHeadH: 30, padBottom: 46
  };
  PIPE.colW = (PIPE.right - PIPE.gutter) / STAGES.length;

  const colX = (i) => PIPE.gutter + PIPE.colW * (i + 0.5);

  function layoutPipeline() {
    const bands = [
      { domain: "human", cases: CASES.filter((c) => c.domain === "human") },
      { domain: "machine", cases: CASES.filter((c) => c.domain === "machine") }
    ];
    let y = PIPE.headH;
    bands.forEach((b, bi) => {
      if (bi > 0) y += PIPE.bandGap;
      b._headY = y + PIPE.bandHeadH - 10;
      b._ruleY = y + PIPE.bandHeadH - 2;
      y += PIPE.bandHeadH + 6;
      b._top = y;
      b.cases.forEach((c) => { c._y = y + PIPE.rowH / 2; y += PIPE.rowH; });
      b._bottom = y;
    });
    PIPE.H = y + PIPE.padBottom;
    return bands;
  }

  function drawPipeline() {
    const bands = layoutPipeline();
    const svg = el("pipesvg");
    svg.setAttribute("viewBox", `0 0 ${PIPE.W} ${PIPE.H}`);

    const gCols = el("p-columns"), gRows = el("p-rows"), gHead = el("p-header"),
          gLab = el("p-labels"), gMark = el("p-markers");
    [gCols, gRows, gHead, gLab, gMark].forEach((g) => (g.textContent = ""));

    /* --- column bands + stage headers ------------------------------------ */
    STAGES.forEach((s, i) => {
      const x = PIPE.gutter + PIPE.colW * i;
      const band = mk("rect", {
        class: "col-band", "data-stage": s.id,
        x, y: PIPE.headH - 14, width: PIPE.colW, height: PIPE.H - PIPE.headH - 10
      });
      gCols.appendChild(band);
      if (i > 0) gCols.appendChild(mk("line", { class: "col-rule", x1: x, y1: 26, x2: x, y2: PIPE.H - 22 }));

      const head = mk("g", { class: "stage-head", "data-stage": s.id, tabindex: "0" });
      head.appendChild(mk("rect", {
        x, y: 20, width: PIPE.colW, height: PIPE.headH - 34, fill: "transparent"
      }));
      const cx = colX(i);
      const num = mk("text", { class: "stage-num", x: cx, y: 44 });
      num.setAttribute("text-anchor", "middle");
      num.textContent = "STAGE " + s.n;
      head.appendChild(num);

      const nm = mk("text", { class: "stage-name", x: cx, y: 64 });
      nm.setAttribute("text-anchor", "middle");
      nm.textContent = s.label;
      head.appendChild(nm);

      wrapText(head, s.question, cx, 80, PIPE.colW - 18, "stage-q", 13);

      head.addEventListener("click", () => selectStage(s.id));
      head.addEventListener("mouseenter", () => hotColumn(s.id, true));
      head.addEventListener("mouseleave", () => hotColumn(s.id, false));
      gHead.appendChild(head);
    });

    /* --- bands, rows, case labels ---------------------------------------- */
    bands.forEach((b) => {
      const d = DOMAINS[b.domain];
      const lab = mk("text", { class: "band-label", x: 16, y: b._headY, fill: d.color });
      lab.textContent = d.label;
      gLab.appendChild(lab);
      gLab.appendChild(mk("line", {
        class: "band-rule", x1: 16, y1: b._ruleY, x2: PIPE.right, y2: b._ruleY,
        stroke: rgba(d.color, 0.35)
      }));

      b.cases.forEach((c) => {
        const row = mk("g", { class: "case-row", "data-case": c.id, tabindex: "0" });
        row.appendChild(mk("rect", {
          class: "row-band", "data-case": c.id,
          x: 8, y: c._y - PIPE.rowH / 2, width: PIPE.right - 8, height: PIPE.rowH
        }));
        row.appendChild(mk("line", {
          class: "row-track", x1: PIPE.gutter + 12, y1: c._y, x2: PIPE.right - 12, y2: c._y
        }));

        const t = mk("text", { class: "case-label", x: PIPE.gutter - 20, y: c._y - 2 });
        t.setAttribute("text-anchor", "end");
        t.textContent = c.label;
        row.appendChild(t);

        const yr = mk("text", { class: "case-years", x: PIPE.gutter - 20, y: c._y + 12 });
        yr.setAttribute("text-anchor", "end");
        yr.textContent = c.years;
        row.appendChild(yr);

        row.addEventListener("click", () => selectCase(c.id));
        row.addEventListener("mouseenter", () => hotRow(c.id, true));
        row.addEventListener("mouseleave", () => hotRow(c.id, false));
        gRows.appendChild(row);
      });

      /* Per-stage counts for this band. The visual impression of the map is
         "the human band fills stage six and the machine band has not yet";
         these numbers let a reader check that rather than take it on trust. */
      const tally = mk("text", { class: "band-tally", x: PIPE.gutter - 20, y: b._bottom + 15 });
      tally.setAttribute("text-anchor", "end");
      tally.textContent = "markers per stage";
      gLab.appendChild(tally);

      STAGES.forEach((s, i) => {
        const n = b.cases.reduce((a, c) => a + c.markers.filter((m) => m.stage === s.id).length, 0);
        const t = mk("text", {
          class: "band-count", x: colX(i), y: b._bottom + 15,
          fill: n ? rgba(d.color, 0.95) : "#48505d"
        });
        t.setAttribute("text-anchor", "middle");
        t.textContent = n;
        gLab.appendChild(t);
      });
    });

    /* --- markers ---------------------------------------------------------- */
    CASES.forEach((c) => {
      const byStage = {};
      c.markers.forEach((m) => (byStage[m.stage] = (byStage[m.stage] || []).concat(m)));
      Object.keys(byStage).forEach((sid) => {
        const list = byStage[sid];
        list.forEach((m, i) => {
          const k = KINDS[m.kind];
          const x = colX(stageById[sid]._i) + (i - (list.length - 1) / 2) * 24;
          const g = mk("g", {
            class: "marker", "data-case": c.id, "data-stage": sid,
            "data-kind": m.kind, "data-domain": c.domain,
            "data-id": c.id + ":" + sid + ":" + i, tabindex: "0"
          });
          g.setAttribute("transform", `translate(${x} ${c._y})`);
          g.appendChild(shapeNode(k.shape, k.color));
          g.appendChild(mk("circle", { class: "marker-hit", cx: 0, cy: 0, r: 15 }));

          if (m.kind === "constraint") {
            const note = mk("text", { class: "constraint-note", x: 18, y: 4 });
            note.textContent = "a theorem, not an event";
            g.appendChild(note);
          }

          g.addEventListener("mousemove", (e) =>
            showTip(e, `<div class="tt-kind" style="color:${k.color}">${k.label}</div>
                        <div class="tt-title">${m.title}</div>
                        <div class="tt-sub">${c.label} · stage ${stageById[sid].n}, ${stageById[sid].label}</div>`));
          g.addEventListener("mouseleave", hideTip);
          g.addEventListener("click", (e) => { e.stopPropagation(); selectMarker(c.id, sid, i); });
          g.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectMarker(c.id, sid, i); }
          });
          gMark.appendChild(g);
        });
      });
    });
  }

  // crude but sufficient centred word-wrap for the stage questions
  function wrapText(parent, text, cx, y, maxW, cls, lineH) {
    const words = text.split(" ");
    const perChar = 5.0;
    const lines = [];
    let cur = "";
    words.forEach((w) => {
      const t = cur ? cur + " " + w : w;
      if (t.length * perChar > maxW && cur) { lines.push(cur); cur = w; }
      else cur = t;
    });
    if (cur) lines.push(cur);
    lines.slice(0, 2).forEach((ln, i) => {
      const t = mk("text", { class: cls, x: cx, y: y + i * lineH });
      t.setAttribute("text-anchor", "middle");
      t.textContent = ln;
      parent.appendChild(t);
    });
  }

  function hotColumn(sid, on) {
    document.querySelectorAll(`.col-band[data-stage="${sid}"]`)
      .forEach((n) => n.classList.toggle("is-hot", on));
  }
  function hotRow(cid, on) {
    document.querySelectorAll(`.row-band[data-case="${cid}"]`)
      .forEach((n) => n.classList.toggle("is-hot", on));
  }

  /* ========================================================= FILTERING ==== */
  function applyFilters() {
    document.querySelectorAll("#p-markers .marker").forEach((g) => {
      const ok = state.kinds.has(g.dataset.kind) && state.domains.has(g.dataset.domain);
      g.classList.toggle("dim", !ok);
      g.style.pointerEvents = ok ? "" : "none";
    });
    document.querySelectorAll(".case-row").forEach((r) => {
      r.classList.toggle("dim", !state.domains.has(caseById[r.dataset.case].domain));
    });
    el("btn-clear").hidden = !state.sel;
  }

  function buildLegends() {
    const kb = el("legend-kinds");
    kb.textContent = "";
    Object.entries(KINDS).forEach(([key, k]) => {
      const n = CASES.reduce((a, c) => a + c.markers.filter((m) => m.kind === key).length, 0);
      const chip = document.createElement("button");
      chip.className = "chip";
      chip.dataset.kind = key;
      chip.title = k.gloss;
      chip.appendChild(shapeSwatch(k.shape, k.color));
      const s = document.createElement("span"); s.textContent = k.label; chip.appendChild(s);
      const c = document.createElement("span"); c.className = "count"; c.textContent = n; chip.appendChild(c);
      chip.addEventListener("click", () => {
        state.kinds.has(key) ? state.kinds.delete(key) : state.kinds.add(key);
        if (!state.kinds.size) state.kinds = new Set(Object.keys(KINDS));
        syncChips(); applyFilters();
      });
      kb.appendChild(chip);
    });

    const db = el("legend-domains");
    db.textContent = "";
    Object.entries(DOMAINS).forEach(([key, d]) => {
      const n = CASES.filter((c) => c.domain === key).length;
      const chip = document.createElement("button");
      chip.className = "chip";
      chip.dataset.domain = key;
      const sw = document.createElement("span");
      sw.className = "dot";
      sw.style.cssText = `width:9px;height:9px;border-radius:50%;background:${d.color};flex:none`;
      chip.appendChild(sw);
      const s = document.createElement("span"); s.textContent = d.label; chip.appendChild(s);
      const c = document.createElement("span"); c.className = "count"; c.textContent = n; chip.appendChild(c);
      chip.addEventListener("click", () => {
        state.domains.has(key) ? state.domains.delete(key) : state.domains.add(key);
        if (!state.domains.size) state.domains = new Set(Object.keys(DOMAINS));
        syncChips(); applyFilters();
      });
      db.appendChild(chip);
    });

    const sb = el("legend-scatter");
    sb.textContent = "";
    Object.entries(DOMAINS).forEach(([key, d]) => {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.style.cursor = "default";
      chip.appendChild(shapeSwatch(d.shape, d.color));
      const s = document.createElement("span"); s.textContent = d.label; chip.appendChild(s);
      sb.appendChild(chip);
    });
  }
  function syncChips() {
    document.querySelectorAll(".chip[data-kind]").forEach((c) =>
      c.classList.toggle("is-off", !state.kinds.has(c.dataset.kind)));
    document.querySelectorAll(".chip[data-domain]").forEach((c) =>
      c.classList.toggle("is-off", !state.domains.has(c.dataset.domain)));
  }

  /* ============================================================ PANEL ===== */
  const panel = el("panel"), body = el("panel-body"), scrim = el("panel-scrim");

  function open(html) {
    body.innerHTML = html;
    panel.classList.add("is-open");
    scrim.classList.add("is-open");
    panel.scrollTop = 0;
    body.querySelectorAll("[data-go-case]").forEach((b) =>
      b.addEventListener("click", () => selectCase(b.dataset.goCase)));
    body.querySelectorAll("[data-go-stage]").forEach((b) =>
      b.addEventListener("click", () => selectStage(b.dataset.goStage)));
    body.querySelectorAll("[data-go-marker]").forEach((b) => {
      const [c, s, i] = b.dataset.goMarker.split(":");
      b.addEventListener("click", () => selectMarker(c, s, +i));
    });
  }
  function close() {
    panel.classList.remove("is-open");
    scrim.classList.remove("is-open");
    state.sel = null;
    document.querySelectorAll(".is-sel").forEach((n) => n.classList.remove("is-sel"));
    applyFilters();
  }
  el("panel-close").addEventListener("click", close);
  scrim.addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { close(); hideTip(); } });
  el("btn-clear").addEventListener("click", close);

  function kicker(color, text) {
    return `<span class="kicker" style="background:${rgba(color, .14)};border-color:${rgba(color, .35)};color:${color}">${text}</span>`;
  }
  function markerList(c) {
    return c.markers.map((m, i) => {
      const k = KINDS[m.kind];
      const st = stageById[m.stage];
      const idx = c.markers.filter((x, j) => j < i && x.stage === m.stage).length;
      return `<li><button data-go-marker="${c.id}:${m.stage}:${idx}">
        <span class="dot" style="background:${k.color}"></span>
        <span><strong style="color:#e6ebf2">${st.label}</strong> <span class="sub">· ${k.label}</span><br>${m.title}</span>
      </button></li>`;
    }).join("");
  }

  function selectMarker(caseId, stageId, idx) {
    const c = caseById[caseId];
    const list = c.markers.filter((m) => m.stage === stageId);
    const m = list[idx] || list[0];
    const k = KINDS[m.kind], st = stageById[stageId];

    state.sel = { type: "marker", id: `${caseId}:${stageId}:${idx}` };
    document.querySelectorAll(".marker.is-sel").forEach((n) => n.classList.remove("is-sel"));
    const node = document.querySelector(`.marker[data-id="${caseId}:${stageId}:${idx}"]`);
    if (node) node.classList.add("is-sel");
    applyFilters();

    open(`
      ${kicker(k.color, k.label)}
      <h2>${md(m.title)}</h2>
      <p class="crumb">
        <button class="linkish seg" data-go-case="${c.id}">${c.label}</button>
        <span class="sep">›</span>
        <button class="linkish seg" data-go-stage="${st.id}">Stage ${st.n} · ${st.label}</button>
      </p>
      <p class="byline">${c.who} · ${c.years}</p>
      <h4>What happened</h4>
      <p>${md(m.what)}</p>
      <h4>Evidence</h4>
      <p>${md(m.evidence)}</p>
      <div class="stakebox" style="background:${rgba(k.color, .09)};border-color:${rgba(k.color, .3)}">
        <p><strong style="color:${k.color}">Why it is here &nbsp;</strong>${md(m.stake)}</p>
      </div>
      <h4>Other markers on this case</h4>
      <ul class="related">${markerList(c)}</ul>
      <p class="cite">${md(c.cite)}</p>`);
  }

  function selectCase(caseId) {
    const c = caseById[caseId], d = DOMAINS[c.domain];
    state.sel = { type: "case", id: caseId };
    document.querySelectorAll(".is-sel").forEach((n) => n.classList.remove("is-sel"));
    applyFilters();
    open(`
      ${kicker(d.color, d.label)}
      <h2>${c.label}</h2>
      <p class="byline">${c.who} · ${c.years}</p>
      <p class="lead">${md(c.summary)}</p>
      ${paras(c.detail)}
      <h4>Where it enters the pipeline (${c.markers.length})</h4>
      <ul class="related">${markerList(c)}</ul>
      <p class="cite">${md(c.cite)}</p>`);
  }

  function selectStage(stageId) {
    const s = stageById[stageId];
    state.sel = { type: "stage", id: stageId };
    document.querySelectorAll(".is-sel").forEach((n) => n.classList.remove("is-sel"));
    applyFilters();

    const rows = [];
    CASES.forEach((c) => {
      c.markers.forEach((m, i) => {
        if (m.stage !== stageId) return;
        const idx = c.markers.filter((x, j) => j < i && x.stage === stageId).length;
        const k = KINDS[m.kind];
        rows.push(`<li><button data-go-marker="${c.id}:${stageId}:${idx}">
          <span class="dot" style="background:${k.color}"></span>
          <span><strong style="color:#e6ebf2">${c.label}</strong> <span class="sub">· ${DOMAINS[c.domain].short}</span><br>${m.title}</span>
        </button></li>`);
      });
    });

    open(`
      ${kicker("#8fd4c2", "Stage " + s.n + " of 7")}
      <h2>${s.label}</h2>
      <p class="byline">${s.question}</p>
      <p>${md(s.detail)}</p>
      <div class="stakebox">
        <p><strong style="color:#8fd4c2">Characteristic failure &nbsp;</strong>${md(s.failure)}</p>
      </div>
      <h4>What lands here (${rows.length})</h4>
      <ul class="related">${rows.join("")}</ul>`);
  }

  /* ========================================================== SCATTER ===== */
  const SC = { W: 940, H: 600, x0: 120, x1: 860, yTop: 80, yBot: 500 };
  const sx = (v) => SC.x0 + (v / 100) * (SC.x1 - SC.x0);
  const sy = (s) => SC.yBot - ((s - 1) / 3) * (SC.yBot - SC.yTop);

  function drawScatter() {
    const svg = el("scatsvg");
    svg.setAttribute("viewBox", `0 0 ${SC.W} ${SC.H}`);
    const gGrid = el("s-grid"), gQ = el("s-quadrant"), gA = el("s-axes"), gP = el("s-points");
    [gGrid, gQ, gA, gP].forEach((g) => (g.textContent = ""));

    /* danger quadrant: validity below 50, stakes at or above 3 */
    const qy = sy(2.5);
    gQ.appendChild(mk("rect", {
      class: "quad", x: SC.x0 - 28, y: SC.yTop - 34, width: sx(50) - SC.x0 + 28, height: qy - (SC.yTop - 34)
    }));
    const ql = mk("text", { class: "quad-label", x: SC.x0 - 20, y: SC.yTop - 42 });
    ql.textContent = "High stakes, unsettled construct";
    gQ.appendChild(ql);

    /* horizontal grid at each stakes level */
    STAKE_LEVELS.forEach((lv) => {
      const y = sy(lv.v);
      gGrid.appendChild(mk("line", { class: "grid-line", x1: SC.x0 - 28, y1: y, x2: SC.x1 + 40, y2: y }));
      const t = mk("text", { class: "axis-text", x: SC.x0 - 38, y: y - 3 });
      t.setAttribute("text-anchor", "end");
      t.textContent = lv.label;
      t.setAttribute("fill", "#a9b4c4");
      gA.appendChild(t);
      const g2 = mk("text", { class: "axis-text", x: SC.x0 - 38, y: y + 11 });
      g2.setAttribute("text-anchor", "end");
      g2.textContent = "stakes " + lv.v;
      gA.appendChild(g2);
    });

    /* x axis */
    gA.appendChild(mk("line", { class: "axis-rule", x1: SC.x0 - 28, y1: SC.yBot + 34, x2: SC.x1 + 40, y2: SC.yBot + 34 }));
    [0, 25, 50, 75, 100].forEach((v) => {
      const x = sx(v);
      gA.appendChild(mk("line", { class: "axis-rule", x1: x, y1: SC.yBot + 34, x2: x, y2: SC.yBot + 40 }));
      const t = mk("text", { class: "axis-text", x, y: SC.yBot + 54 });
      t.setAttribute("text-anchor", "middle");
      t.textContent = v;
      gA.appendChild(t);
    });
    const xt = mk("text", { class: "axis-title", x: (SC.x0 + SC.x1) / 2, y: SC.yBot + 78 });
    xt.setAttribute("text-anchor", "middle");
    xt.textContent = "Construct validity  →";
    gA.appendChild(xt);

    const yt = mk("text", { class: "axis-title", x: 0, y: 0 });
    yt.setAttribute("transform", `translate(22 ${(SC.yTop + SC.yBot) / 2}) rotate(-90)`);
    yt.setAttribute("text-anchor", "middle");
    yt.textContent = "What the score decides  →";
    gA.appendChild(yt);

    /* points */
    POINTS.forEach((p) => {
      const d = DOMAINS[p.domain];
      const x = sx(p.validity), y = sy(p.stakes);
      const g = mk("g", { class: "pt", "data-id": p.id, tabindex: "0" });
      const sh = shapeNode(d.shape, d.color, 1.05);
      sh.setAttribute("transform", `translate(${x} ${y})`);
      g.appendChild(sh);

      const lab = mk("text", {
        class: "pt-label", x: x + (p.lx || 10), y: y + (p.ly || -12)
      });
      lab.setAttribute("text-anchor", p.anchor || "start");
      lab.textContent = p.label;
      g.appendChild(lab);

      const hit = mk("circle", { cx: x, cy: y, r: 16, fill: "transparent" });
      g.appendChild(hit);

      g.addEventListener("mousemove", (e) =>
        showTip(e, `<div class="tt-kind" style="color:${d.color}">${d.label}</div>
                    <div class="tt-title">${p.label}</div>
                    <div class="tt-sub">stakes ${p.stakes} · validity ${p.validity}/100</div>`));
      g.addEventListener("mouseleave", hideTip);
      g.addEventListener("click", () => selectPoint(p.id));
      g.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectPoint(p.id); }
      });
      gP.appendChild(g);
    });
  }

  function selectPoint(id) {
    const p = POINTS.find((x) => x.id === id);
    const d = DOMAINS[p.domain];
    const lv = STAKE_LEVELS.find((l) => l.v === p.stakes);
    document.querySelectorAll(".pt.is-sel").forEach((n) => n.classList.remove("is-sel"));
    const node = document.querySelector(`.pt[data-id="${id}"]`);
    if (node) node.classList.add("is-sel");
    open(`
      ${kicker(d.color, d.label)}
      <h2>${p.label}</h2>
      <p class="byline">stakes ${p.stakes} of 4 · construct validity ${p.validity} of 100</p>
      <h4>What the score decides — ${lv.label}</h4>
      <p>${md(lv.gloss)}</p>
      <h4>Assessment</h4>
      <p>${md(p.note)}</p>
      <div class="stakebox">
        <p><strong style="color:#8fd4c2">Note &nbsp;</strong>Both coordinates are judgements against the stated rubric, not measurements. The vertical axis is close to objective; the horizontal one is an assessment you are invited to disagree with.</p>
      </div>`);
  }

  function buildScatterSide() {
    const r = el("rubric");
    r.textContent = "";
    VALIDITY_RUBRIC.forEach((q) => {
      const li = document.createElement("li");
      li.textContent = q;
      r.appendChild(li);
    });
    el("scatter-caveat").textContent = SCATTER_CAVEAT;
    el("scatter-verdict").innerHTML =
      `<h3>${md(SCATTER_VERDICT.headline)}</h3><p>${md(SCATTER_VERDICT.body)}</p>`;

    /* table view — required alternative to the visual encoding */
    const t = el("scatter-table");
    t.innerHTML =
      "<thead><tr><th>Measurement regime</th><th>Column</th><th>Stakes</th><th>Validity</th><th>Assessment</th></tr></thead>";
    const tb = document.createElement("tbody");
    POINTS.slice().sort((a, b) => b.stakes - a.stakes || a.validity - b.validity).forEach((p) => {
      const d = DOMAINS[p.domain];
      const tr = document.createElement("tr");
      tr.innerHTML =
        `<td style="color:#e6ebf2">${p.label}</td>` +
        `<td><span class="dom"><span style="width:8px;height:8px;border-radius:50%;background:${d.color};display:inline-block"></span>${d.short}</span></td>` +
        `<td class="n">${p.stakes} — ${STAKE_LEVELS.find((l) => l.v === p.stakes).label}</td>` +
        `<td class="n">${p.validity}</td>` +
        `<td>${p.note}</td>`;
      tb.appendChild(tr);
    });
    t.appendChild(tb);

    const btn = el("btn-table");
    btn.addEventListener("click", () => {
      const w = el("scatter-table-wrap");
      w.hidden = !w.hidden;
      btn.textContent = w.hidden ? "Show as a table" : "Hide the table";
    });
  }

  /* ============================================================ VIEWS ===== */
  function setView(v) {
    state.view = v;
    document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("is-active", t.dataset.view === v));
    document.querySelectorAll(".view").forEach((s) => s.classList.toggle("is-active", s.id === "view-" + v));
    document.body.className = "view-" + v;
    hideTip();
    window.scrollTo({ top: 0 });
  }
  document.querySelectorAll(".tab").forEach((t) =>
    t.addEventListener("click", () => setView(t.dataset.view)));

  el("thesis-more").addEventListener("click", () => {
    const box = el("thesis-expand");
    box.hidden = !box.hidden;
    el("thesis-more").textContent = box.hidden ? "Read the rest ›" : "Hide ‹";
  });

  /* ============================================================= INIT ===== */
  drawPipeline();
  drawScatter();
  buildLegends();
  buildScatterSide();
  syncChips();
  applyFilters();
  setView("pipeline");
})();
