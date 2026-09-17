/* =============================================================================
   Borrowed Brains — rendering & interaction
   ========================================================================== */
(function () {
  "use strict";

  const SVGNS = "http://www.w3.org/2000/svg";

  /* ------------------------------------------------------------ geometry -- */
  const GEO = {
    width: 1240,
    windowH: 760,      // the visible slice; the content is taller and pans
    axisX: 44,
    nodeW: 310,
    nodeH: 50,
    leftX: 78,         // left edge of neuro boxes
    rightX: 852,       // left edge of ai boxes
    top: 64,
    span: 1250,        // vertical extent of the raw year scale
    minGap: 58,        // minimum centre-to-centre spacing after collision fix
    yearMin: 1940,
    yearMax: 2026,
    curve: 1.55        // >1 expands recent decades, where everything happens
  };
  GEO.leftAnchorX = GEO.leftX + GEO.nodeW;   // 388 — where neuro edges attach
  GEO.rightAnchorX = GEO.rightX;             // 852 — where ai edges attach

  const el = (id) => document.getElementById(id);
  const svgEl = (tag, attrs) => {
    const n = document.createElementNS(SVGNS, tag);
    if (attrs) for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  };
  const hexToRgba = (hex, a) => {
    const h = hex.replace("#", "");
    const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
  };
  const truncate = (s, n) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);
  // The prose in data.js uses *asterisks* for emphasis; render them as <em>.
  const md = (s) => String(s).replace(/\*([^*\n]+)\*/g, "<em>$1</em>");

  /* --------------------------------------------------------------- state -- */
  const nodeById = {};
  NODES.forEach((n) => (nodeById[n.id] = n));

  const state = {
    view: "map",
    activeTypes: new Set(Object.keys(TRANSFER_TYPES)),
    focus: null,           // {kind:'node'|'edge', id}
    k: 1, tx: 0, ty: 0,
    contentH: 0
  };

  /* ====================================================== LAYOUT (y pass) == */
  // One global year → y mapping for BOTH columns, so the map reads as a single
  // time ladder: every node gets its own row and left/right tells you the field.
  function layout() {
    const t = (yr) =>
      Math.pow(
        (yr - GEO.yearMin) / (GEO.yearMax - GEO.yearMin),
        GEO.curve
      );
    const ordered = NODES.slice().sort((a, b) => a.year - b.year || (a.side === "neuro" ? -1 : 1));
    let prev = -Infinity;
    ordered.forEach((n) => {
      const raw = GEO.top + t(n.year) * GEO.span;
      n._y = Math.max(raw, prev + GEO.minGap);
      prev = n._y;
    });
    state.contentH = prev + GEO.nodeH + 70;
    return ordered;
  }

  /* ============================================================== DEFS ===== */
  function buildDefs() {
    const defs = el("mapdefs");
    defs.textContent = "";
    Object.entries(TRANSFER_TYPES).forEach(([key, t]) => {
      const m = svgEl("marker", {
        id: "arrow-" + key,
        viewBox: "0 0 10 10",
        refX: "9", refY: "5",
        markerWidth: "7", markerHeight: "7",
        orient: "auto-start-reverse"
      });
      m.appendChild(svgEl("path", { d: "M 0 1 L 9 5 L 0 9 z", fill: t.color }));
      defs.appendChild(m);
    });
  }

  /* ============================================================== AXIS ===== */
  function drawAxis(ordered) {
    const g = el("layer-axis");
    g.textContent = "";
    g.appendChild(svgEl("line", {
      class: "axis-line",
      x1: GEO.axisX, y1: GEO.top - 34, x2: GEO.axisX, y2: state.contentH - 50
    }));

    const cap = svgEl("text", { class: "axis-label", x: GEO.axisX - 6, y: GEO.top - 44 });
    cap.setAttribute("text-anchor", "end");
    cap.textContent = "YEAR";
    g.appendChild(cap);

    // A tick per node row, labelled only when the year (and the space) changes.
    let lastLabelY = -Infinity, lastYear = null;
    ordered.forEach((n) => {
      g.appendChild(svgEl("line", {
        class: "axis-tick", x1: GEO.axisX, y1: n._y, x2: GEO.axisX + 10, y2: n._y
      }));
      if (n.year !== lastYear && n._y - lastLabelY > 20) {
        const tx = svgEl("text", { class: "axis-label", x: GEO.axisX - 8, y: n._y + 3.5 });
        tx.setAttribute("text-anchor", "end");
        tx.textContent = n.year;
        g.appendChild(tx);
        lastLabelY = n._y;
        lastYear = n.year;
      }
    });
  }

  /* ============================================================= NODES ===== */
  function drawNodes() {
    const g = el("layer-nodes");
    g.textContent = "";
    NODES.forEach((n) => {
      const x = n.side === "neuro" ? GEO.leftX : GEO.rightX;
      const y = n._y - GEO.nodeH / 2;
      const grp = svgEl("g", { class: "node", "data-id": n.id, "data-side": n.side, tabindex: "0" });

      grp.appendChild(svgEl("rect", {
        class: "node-box", x, y, width: GEO.nodeW, height: GEO.nodeH, rx: 9
      }));

      // anchor dot on the side the edges leave from
      const ax = n.side === "neuro" ? x + GEO.nodeW : x;
      grp.appendChild(svgEl("circle", { class: "node-accent", cx: ax, cy: n._y, r: 3.5 }));

      const tx = svgEl("text", { class: "node-title", x: x + 15, y: n._y - 4 });
      tx.textContent = truncate(n.title, 40);
      grp.appendChild(tx);

      const sub = svgEl("text", { class: "node-who", x: x + 15, y: n._y + 14 });
      sub.textContent = truncate(n.who, 32) + "  ·  " + n.year;
      grp.appendChild(sub);

      grp.addEventListener("click", (e) => { e.stopPropagation(); focusNode(n.id); });
      grp.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); focusNode(n.id); }
      });
      g.appendChild(grp);
    });
  }

  /* ============================================================= EDGES ===== */
  function edgePath(e) {
    const a = nodeById[e.from], b = nodeById[e.to];
    if (a.side === b.side) {
      // within-field descent: bow outward from the column
      const outward = a.side === "neuro" ? -1 : 1;
      const x = a.side === "neuro" ? GEO.leftX : GEO.rightX + GEO.nodeW;
      const bow = x + outward * 68;
      return {
        d: `M ${x} ${a._y} C ${bow} ${a._y}, ${bow} ${b._y}, ${x} ${b._y}`,
        mid: bezMid(x, a._y, bow, a._y, bow, b._y, x, b._y)
      };
    }
    const fromNeuro = a.side === "neuro";
    const x0 = fromNeuro ? GEO.leftAnchorX : GEO.rightAnchorX;
    const x1 = fromNeuro ? GEO.rightAnchorX : GEO.leftAnchorX;
    const dir = fromNeuro ? 1 : -1;
    const c1 = x0 + dir * 175, c2 = x1 - dir * 175;
    return {
      d: `M ${x0} ${a._y} C ${c1} ${a._y}, ${c2} ${b._y}, ${x1} ${b._y}`,
      mid: bezMid(x0, a._y, c1, a._y, c2, b._y, x1, b._y)
    };
  }
  function bezMid(x0, y0, x1, y1, x2, y2, x3, y3) {
    return {
      x: (x0 + 3 * x1 + 3 * x2 + x3) / 8,
      y: (y0 + 3 * y1 + 3 * y2 + y3) / 8
    };
  }

  function drawEdges() {
    const g = el("layer-edges");
    g.textContent = "";
    EDGES.forEach((e) => {
      const t = TRANSFER_TYPES[e.type];
      const p = edgePath(e);
      const grp = svgEl("g", { class: "edge-group", "data-id": e.id, "data-type": e.type });

      grp.appendChild(svgEl("path", { class: "edge-hit", d: p.d }));
      grp.appendChild(svgEl("path", {
        class: "edge", "data-type": e.type, d: p.d,
        stroke: t.color, "marker-end": `url(#arrow-${e.type})`
      }));

      const label = t.short;
      const w = label.length * 6 + 14;
      grp.appendChild(svgEl("rect", {
        class: "edge-label-bg", x: p.mid.x - w / 2, y: p.mid.y - 9,
        width: w, height: 18, rx: 4
      }));
      const lt = svgEl("text", { class: "edge-label", x: p.mid.x, y: p.mid.y + 4, fill: t.color });
      lt.setAttribute("text-anchor", "middle");
      lt.textContent = label;
      grp.appendChild(lt);

      grp.addEventListener("click", (ev) => { ev.stopPropagation(); focusEdge(e.id); });
      g.appendChild(grp);
    });
  }

  /* ============================================================ LEGEND ===== */
  function drawLegend() {
    const box = el("legend");
    box.textContent = "";
    Object.entries(TRANSFER_TYPES).forEach(([key, t]) => {
      const count = EDGES.filter((e) => e.type === key).length;
      const chip = document.createElement("button");
      chip.className = "chip";
      chip.dataset.type = key;
      chip.style.setProperty("--c", t.color);
      chip.title = t.gloss;
      chip.innerHTML =
        `<span class="swatch" style="background:${t.color};box-shadow:0 0 0 3px ${hexToRgba(t.color, .22)}"></span>` +
        `<span>${t.label}</span><span class="count">${count}</span>`;
      chip.addEventListener("click", () => {
        if (state.activeTypes.has(key)) state.activeTypes.delete(key);
        else state.activeTypes.add(key);
        if (state.activeTypes.size === 0) state.activeTypes = new Set(Object.keys(TRANSFER_TYPES));
        chip.classList.toggle("is-off", !state.activeTypes.has(key));
        drawLegendStates();
        applyVisibility();
      });
      box.appendChild(chip);
    });
  }
  function drawLegendStates() {
    document.querySelectorAll(".chip").forEach((c) => {
      c.classList.toggle("is-off", !state.activeTypes.has(c.dataset.type));
    });
  }

  /* ======================================================== VISIBILITY ===== */
  function applyVisibility() {
    const visibleEdges = EDGES.filter((e) => state.activeTypes.has(e.type));
    const live = new Set();
    visibleEdges.forEach((e) => { live.add(e.from); live.add(e.to); });

    let focusEdges = null;
    if (state.focus && state.focus.kind === "node") {
      focusEdges = new Set(
        visibleEdges.filter((e) => e.from === state.focus.id || e.to === state.focus.id).map((e) => e.id)
      );
    } else if (state.focus && state.focus.kind === "edge") {
      focusEdges = new Set([state.focus.id]);
    }

    document.querySelectorAll(".edge-group").forEach((g) => {
      const e = EDGES.find((x) => x.id === g.dataset.id);
      const shown = state.activeTypes.has(e.type);
      g.style.display = shown ? "" : "none";
      g.classList.toggle("hl", !!focusEdges && focusEdges.has(e.id));
      g.classList.toggle("dim", !!focusEdges && !focusEdges.has(e.id));
    });

    const touched = new Set();
    if (focusEdges) {
      visibleEdges.forEach((e) => {
        if (focusEdges.has(e.id)) { touched.add(e.from); touched.add(e.to); }
      });
    }
    document.querySelectorAll(".node").forEach((g) => {
      const id = g.dataset.id;
      const off = !live.has(id) || (focusEdges && !touched.has(id));
      g.classList.toggle("dim-node", off);
      g.classList.toggle("is-selected", !!state.focus && state.focus.kind === "node" && state.focus.id === id);
    });

    el("btn-clear").hidden = !state.focus;
  }

  /* ============================================================ PANEL ====== */
  const panel = el("panel"), panelBody = el("panel-body"), scrim = el("panel-scrim");

  function openPanel(html) {
    panelBody.innerHTML = html;
    panel.classList.add("is-open");
    scrim.classList.add("is-open");
    panel.scrollTop = 0;
    panelBody.querySelectorAll("[data-goto-node]").forEach((b) =>
      b.addEventListener("click", () => focusNode(b.dataset.gotoNode, true)));
    panelBody.querySelectorAll("[data-goto-edge]").forEach((b) =>
      b.addEventListener("click", () => focusEdge(b.dataset.gotoEdge)));
  }
  function closePanel() {
    panel.classList.remove("is-open");
    scrim.classList.remove("is-open");
    state.focus = null;
    applyVisibility();
    document.querySelectorAll(".cellbtn.is-active").forEach((b) => b.classList.remove("is-active"));
  }
  el("panel-close").addEventListener("click", closePanel);
  scrim.addEventListener("click", closePanel);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePanel(); });

  function sideTag(side) {
    return side === "neuro"
      ? '<span class="side side-neuro">Neuroscience</span>'
      : '<span class="side side-ai">AI</span>';
  }

  function nodePanelHTML(n) {
    const conns = EDGES.filter((e) => e.from === n.id || e.to === n.id);
    const accent = n.side === "neuro" ? "#5fb3d4" : "#d98c5f";
    const items = conns.map((e) => {
      const t = TRANSFER_TYPES[e.type];
      const other = nodeById[e.from === n.id ? e.to : e.from];
      const dirn = e.from === n.id ? "→" : "←";
      return `<li><button data-goto-edge="${e.id}">
        <span class="dot" style="background:${t.color}"></span>
        <span><strong style="color:#e6ebf2">${t.short}</strong> ${dirn} ${other.title}</span></button></li>`;
    }).join("");

    return `
      <span class="kicker" style="--c:${accent};background:${hexToRgba(accent, .14)};border-color:${hexToRgba(accent, .35)};color:${accent}">
        ${n.side === "neuro" ? "Neuroscience" : "AI / machine learning"}
      </span>
      <h2>${n.title}</h2>
      <p class="byline">${n.who} · ${n.year}</p>
      <p class="lead">${md(n.blurb)}</p>
      <h4>What it is</h4>
      <p>${md(n.detail)}</p>
      <h4>Connections (${conns.length})</h4>
      <ul class="related">${items}</ul>
      <p class="cite">${md(n.cite)}</p>`;
  }

  function edgePanelHTML(e) {
    const t = TRANSFER_TYPES[e.type];
    const a = nodeById[e.from], b = nodeById[e.to];
    return `
      <span class="kicker" style="--c:${t.color};background:${hexToRgba(t.color, .14)};border-color:${hexToRgba(t.color, .35)};color:${t.color}">
        ${t.label}
      </span>
      <h2>${e.title}</h2>
      <p class="flow" style="--c:${t.color}">
        <span class="end">${a.title}</span> ${sideTag(a.side)}
        <span class="arrow" style="color:${t.color}">⟶</span>
        <span class="end">${b.title}</span> ${sideTag(b.side)}
      </p>
      <p class="byline">${a.year} → ${b.year}</p>
      <p class="lead" style="margin-top:14px">${md(t.gloss)}</p>
      <h4>The claim</h4>
      <p>${md(e.claim)}</p>
      <h4>Why it holds</h4>
      <p>${md(e.evidence)}</p>
      <h4>The strongest objection</h4>
      <p>${md(e.counter)}</p>
      <div class="verdict-box" style="--c:${t.color};background:${hexToRgba(t.color, .09)};border-color:${hexToRgba(t.color, .3)}">
        <p><strong style="color:${t.color}">Verdict &nbsp;</strong>${md(e.verdict)}</p>
      </div>
      <h4>Endpoints</h4>
      <ul class="related">
        <li><button data-goto-node="${a.id}"><span class="dot" style="background:#5fb3d4"></span><span>${a.title} <span style="color:#6f7d90">· ${a.who}, ${a.year}</span></span></button></li>
        <li><button data-goto-node="${b.id}"><span class="dot" style="background:#d98c5f"></span><span>${b.title} <span style="color:#6f7d90">· ${b.who}, ${b.year}</span></span></button></li>
      </ul>`;
  }

  function focusNode(id, recenter) {
    state.focus = { kind: "node", id };
    applyVisibility();
    openPanel(nodePanelHTML(nodeById[id]));
    if (recenter) centerOn(nodeById[id]);
  }
  function focusEdge(id) {
    const e = EDGES.find((x) => x.id === id);
    if (!state.activeTypes.has(e.type)) {
      state.activeTypes.add(e.type);
      drawLegendStates();
    }
    state.focus = { kind: "edge", id };
    applyVisibility();
    openPanel(edgePanelHTML(e));
  }

  /* ======================================================== PAN & ZOOM ===== */
  const svg = el("mapsvg"), viewport = el("viewport");

  function applyTransform() {
    const maxUp = Math.min(0, GEO.windowH - state.contentH * state.k);
    state.ty = Math.max(maxUp, Math.min(40, state.ty));
    const maxX = Math.max(0, GEO.width * state.k - GEO.width);
    state.tx = Math.max(-maxX - 40, Math.min(40, state.tx));
    viewport.setAttribute("transform", `translate(${state.tx} ${state.ty}) scale(${state.k})`);
  }
  function zoomBy(f, cx, cy) {
    const k2 = Math.max(0.42, Math.min(2.4, state.k * f));
    const px = (cx - state.tx) / state.k, py = (cy - state.ty) / state.k;
    state.k = k2;
    state.tx = cx - px * k2;
    state.ty = cy - py * k2;
    applyTransform();
  }
  function centerOn(n) {
    state.ty = -(n._y * state.k) + GEO.windowH / 2;
    applyTransform();
  }
  // Exact client → viewBox-user-space conversion, independent of how the
  // browser letterboxes the viewBox under preserveAspectRatio.
  function toSvg(evt) {
    const m = svg.getScreenCTM();
    if (!m) return { x: 0, y: 0 };
    const inv = m.inverse();
    if (typeof DOMPoint === "function") {
      const p = new DOMPoint(evt.clientX, evt.clientY).matrixTransform(inv);
      return { x: p.x, y: p.y };
    }
    const pt = svg.createSVGPoint();
    pt.x = evt.clientX; pt.y = evt.clientY;
    const p = pt.matrixTransform(inv);
    return { x: p.x, y: p.y };
  }

  let dragging = false, last = null, moved = 0;
  svg.addEventListener("pointerdown", (e) => {
    dragging = true; moved = 0; last = toSvg(e);
    svg.classList.add("is-dragging");
    svg.setPointerCapture(e.pointerId);
  });
  svg.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const p = toSvg(e);
    state.tx += p.x - last.x;
    state.ty += p.y - last.y;
    moved += Math.abs(p.x - last.x) + Math.abs(p.y - last.y);
    last = p;
    applyTransform();
  });
  const endDrag = () => { dragging = false; svg.classList.remove("is-dragging"); };
  svg.addEventListener("pointerup", endDrag);
  svg.addEventListener("pointercancel", endDrag);
  svg.addEventListener("pointerleave", endDrag);

  svg.addEventListener("wheel", (e) => {
    e.preventDefault();
    const p = toSvg(e);
    if (e.ctrlKey || e.metaKey) zoomBy(e.deltaY < 0 ? 1.12 : 1 / 1.12, p.x, p.y);
    else { state.ty -= e.deltaY * 0.7; state.tx -= e.deltaX * 0.7; applyTransform(); }
  }, { passive: false });

  svg.addEventListener("click", () => { if (moved < 4) closePanel(); });

  el("btn-zoom-in").addEventListener("click", () => zoomBy(1.2, GEO.width / 2, GEO.windowH / 2));
  el("btn-zoom-out").addEventListener("click", () => zoomBy(1 / 1.2, GEO.width / 2, GEO.windowH / 2));
  el("btn-reset").addEventListener("click", () => {
    state.k = 1; state.tx = 0; state.ty = 0; applyTransform();
  });
  el("btn-clear").addEventListener("click", closePanel);

  /* ========================================================= SCORECARD ===== */
  function buildScorecard() {
    const table = el("scorecard");
    table.textContent = "";

    const thead = document.createElement("thead");
    const hr = document.createElement("tr");
    hr.appendChild(document.createElement("th"));
    SCORE_CONSTRAINTS.forEach((c) => {
      const th = document.createElement("th");
      th.innerHTML = `${c.label}<span class="th-tip">${md(c.tip)}</span>`;
      hr.appendChild(th);
    });
    thead.appendChild(hr);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    SCORE_ROWS.forEach((row) => {
      const tr = document.createElement("tr");
      const th = document.createElement("th");
      th.className = "row-head";
      th.innerHTML =
        `<span class="rh-label">${row.label}</span><span class="rh-who">${row.who}</span>` +
        (row.nodeId ? `<button class="rh-link" data-node="${row.nodeId}">see on the map ›</button>` : "");
      tr.appendChild(th);

      SCORE_CONSTRAINTS.forEach((c) => {
        const td = document.createElement("td");
        td.className = "cell";
        const [grade, note] = row.cells[c.id];
        const b = document.createElement("button");
        b.className = "cellbtn " + grade;
        b.textContent = grade === "pass" ? "meets" : grade === "partial" ? "partial" : "fails";
        b.addEventListener("click", () => {
          document.querySelectorAll(".cellbtn.is-active").forEach((x) => x.classList.remove("is-active"));
          b.classList.add("is-active");
          const col = grade === "pass" ? "#3fb8a0" : grade === "partial" ? "#e0913a" : "#d9594c";
          openPanel(`
            <span class="kicker" style="--c:${col};background:${hexToRgba(col, .14)};border-color:${hexToRgba(col, .35)};color:${col}">
              ${grade === "pass" ? "Meets the constraint" : grade === "partial" ? "Partially meets it" : "Fails the constraint"}
            </span>
            <h2>${row.label}</h2>
            <p class="byline">${row.who}</p>
            <h4>Constraint · ${c.label}</h4>
            <p class="lead">${md(c.tip)}</p>
            <h4>Assessment</h4>
            <p>${md(note)}</p>
            ${row.nodeId ? `<h4>On the map</h4><ul class="related"><li><button data-goto-node="${row.nodeId}"><span class="dot" style="background:#8fd4c2"></span><span>${nodeById[row.nodeId].title}</span></button></li></ul>` : ""}
          `);
        });
        td.appendChild(b);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    table.querySelectorAll(".rh-link").forEach((b) =>
      b.addEventListener("click", () => {
        setView("map");
        focusNode(b.dataset.node, true);
      }));

    el("score-verdict").innerHTML =
      `<h3>${md(SCORE_VERDICT.headline)}</h3><p>${md(SCORE_VERDICT.body)}</p>`;
  }

  /* ============================================================= VIEWS ===== */
  function setView(v) {
    state.view = v;
    document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("is-active", t.dataset.view === v));
    document.querySelectorAll(".view").forEach((s) => s.classList.toggle("is-active", s.id === "view-" + v));
    document.body.className = "view-" + v;
    window.scrollTo({ top: 0 });
  }
  document.querySelectorAll(".tab").forEach((t) =>
    t.addEventListener("click", () => setView(t.dataset.view)));

  el("thesis-more").addEventListener("click", () => {
    const box = el("thesis-expand");
    box.hidden = !box.hidden;
    el("thesis-more").textContent = box.hidden ? "Why this matters ›" : "Hide ‹";
  });

  /* ============================================================== INIT ===== */
  function init() {
    const ordered = layout();
    svg.setAttribute("viewBox", `0 0 ${GEO.width} ${GEO.windowH}`);
    svg.setAttribute("preserveAspectRatio", "xMidYMin meet");
    buildDefs();
    drawAxis(ordered);
    drawEdges();
    drawNodes();
    drawLegend();
    applyVisibility();
    applyTransform();
    buildScorecard();
    setView("map");
  }
  init();
})();
