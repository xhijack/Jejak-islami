// Cerita peristiwa yang diputar langsung di peta 3D kota Mekah.
// Scene (city.js) menggerakkan aktor dan kamera serta menempatkan elemen HTML; komponen ini mengatur adegan, teks, dan kontrol.
(function () {
  const { useState, useEffect, useRef, useMemo } = React;
  const html = htm.bind(React.createElement);

  // ---------- Karakter chibi: wajah hanya mata dan mulut ----------
  const EXPR = {
    netral: { eye: "dot", mouth: "line" }, senyum: { eye: "happy", mouth: "smile" }, lembut: { eye: "closed", mouth: "smile" },
    khawatir: { eye: "dot", mouth: "wavy" }, kaget: { eye: "wide", mouth: "o" }, sedih: { eye: "sad", mouth: "frown" },
    tegas: { eye: "dot", mouth: "short" }, kagum: { eye: "happy", mouth: "o" }, sinis: { eye: "half", mouth: "smirk" }
  };
  // Tokoh perempuan: [warna baju, warna kerudung]
  const FEM = window.SirahFem = { khadijah: ["#7b2f3a", "#3d4c5e"], perempuan: ["#5d5a2e", "#6e3b26"], aisyah: ["#3f5f4f", "#7a3a4a"], ummuruman: ["#5a4a6a", "#3a3a4a"] };
  // Tokoh laki-laki: [warna jubah, warna serban, warna janggut]; tanpa entri = tampilan Waraqah
  const MALE = window.SirahMale = { abubakar: ["#6b5a3a", "#f0e9d8", "#cbb9a0"], umar: ["#3a4a5a", "#e8dcc0", "#2a1d16"], ali: ["#2f5a4a", "#e8dcc0", "#3a2a20"],
    safwan: ["#5a4a2a", "#e0d4b4", "#3a2a20"], sahabat: ["#4f5f4a", "#e6dcc4", "#3a2a20"], sahabat2: ["#6a4a3a", "#e2d6ba", "#2e2018"], sahabat3: ["#3a4a6a", "#ece2c8", "#4a3a2a"], kabar: ["#5a5a3a", "#e6dcc0", "#3a2a20"], abulahab: ["#8a3b22", "#e0d3ae", "#5a3a26"], abujahal: ["#3e2f5a", "#cfc3a0", "#2e2018"], pembesar: ["#2f4f5a", "#e6dcc0", "#3a2a20"],
    ibnuummimaktum: ["#7a6a50", "#efe8d8", "#4a3a2a"], quraisy1: ["#5c4a3a", "#d9cfb4", "#3a2a20"], quraisy2: ["#4a5a3a", "#e2d8bc", "#5a4636"], quraisy3: ["#6a3a3a", "#e8dcc2", "#2e2018"] };
  const BLIND = { waraqah: 1, ibnuummimaktum: 1 };
  const ST = { fill: "none", stroke: "#2a1d16", "stroke-width": 3.4, "stroke-linecap": "round" };
  function Eye({ kind, x }) {
    if (kind === "dot") return html`<g class="pl-blink"><circle cx=${x} cy="-30" r="3.6" fill="#2a1d16" /></g>`;
    if (kind === "wide") return html`<circle cx=${x} cy="-31" r="4.8" fill="#2a1d16" />`;
    if (kind === "happy") return html`<path d=${`M${x - 6} -28 Q${x} -37 ${x + 6} -28`} ...${ST} />`;
    if (kind === "half") return html`<path d=${`M${x - 6} -30 H${x + 6}`} ...${ST} />`;
    if (kind === "closed") return html`<path d=${`M${x - 6} -31 Q${x} -24 ${x + 6} -31`} ...${ST} />`;
    if (kind === "sad") return x < 0 ? html`<path d=${`M${x - 6} -27 Q${x} -33 ${x + 6} -31`} ...${ST} />` : html`<path d=${`M${x - 6} -31 Q${x} -33 ${x + 6} -27`} ...${ST} />`;
    return null;
  }
  function Mouth({ kind, talk }) {
    if (talk) return html`<ellipse cx="0" cy="-13" rx="4.5" ry="3.6" fill="#2a1d16" />`;
    if (kind === "line") return html`<path d="M-6 -14 H6" ...${ST} />`;
    if (kind === "short") return html`<path d="M-4 -14 H4" ...${ST} />`;
    if (kind === "smile") return html`<path d="M-7 -16 Q0 -9 7 -16" ...${ST} />`;
    if (kind === "frown") return html`<path d="M-6 -11 Q0 -17 6 -11" ...${ST} />`;
    if (kind === "wavy") return html`<path d="M-7 -13 q3.5 -4 7 0 t7 0" ...${ST} />`;
    if (kind === "o") return html`<ellipse cx="0" cy="-13" rx="3.6" ry="4.4" fill="#2a1d16" />`;
    if (kind === "smirk") return html`<path d="M-6 -13 Q2 -13 7 -18" ...${ST} />`;
    return null;
  }
  function Chibi({ id, expr, talk }) {
    const ex = EXPR[expr] || EXPR.netral, blind = !!BLIND[id], m = MALE[id] || ["#6a5440", "#efe8d8", "#f2efe6"];
    const eye = blind ? (expr === "sedih" ? "sad" : expr === "kagum" || expr === "senyum" ? "happy" : "closed") : ex.eye;
    return html`<svg class="st-chibi" viewBox="-60 -92 120 196" aria-hidden="true">
      <ellipse cx="0" cy="96" rx="46" ry="8" fill="#000" opacity=".3" />
      <g class="pl-bob">
        ${FEM[id] ? html`<g>
          <path d="M-50 94 Q-54 22 -30 4 L30 4 Q54 22 50 94 Z" fill=${FEM[id][0]} />
          <path d="M-48 -30 Q-48 -84 0 -84 Q48 -84 48 -30 L54 36 Q0 50 -54 36 Z" fill=${FEM[id][1]} />
          <ellipse cx="0" cy="-26" rx="28" ry="30" fill="#e8c9a6" />
          <path d="M-31 -40 Q0 -66 31 -40" fill="none" stroke="#2f3b4a" stroke-width="6" stroke-linecap="round" /></g>`
        : html`<g>
          <path d="M-50 94 Q-54 24 -30 6 L30 6 Q54 24 50 94 Z" fill=${m[0]} />
          <path d="M-14 6 L0 40 L14 6" fill="#e9e2d2" />
          <ellipse cx="0" cy="-26" rx="29" ry="30" fill="#e2c09a" />
          <path d="M-27 -16 Q-30 22 0 32 Q30 22 27 -16 Q16 -4 0 -4 Q-16 -4 -27 -16Z" fill=${m[2]} />
          <path d="M-33 -36 Q-34 -72 0 -72 Q34 -72 33 -36 Q16 -48 0 -48 Q-16 -48 -33 -36Z" fill=${m[1]} />
          ${blind && html`<path d="M40 30 L58 94" stroke="#5a3e28" stroke-width="5" stroke-linecap="round" />`}</g>`}
        <${Eye} kind=${eye} x=${-11} /><${Eye} kind=${eye} x=${11} />
        <g transform=${blind ? "translate(0 4)" : ""}><${Mouth} kind=${ex.mouth} talk=${talk} /></g>
      </g>
    </svg>`;
  }

  // ---------- Susun keadaan tiap adegan ----------
  function resolve(ev) {
    const out = []; let s = { rasul: { e: 0, n: 0, state: "tenang" }, chars: {}, jib: { e: 0, n: 0, up: 9, power: 0 }, cam: null, inside: null, malam: ev.malam ?? 1 };
    const endOf = (pts, t) => window.SirahPathAt(pts, t);
    ev.babak.forEach((bk, bi) => bk.beats.forEach((b, k) => {
      const moves = []; s = { ...s, rasul: { ...s.rasul }, chars: { ...s.chars }, jib: { ...s.jib } };
      if (b.rasul) {
        const r = b.rasul;
        if (r.at) { s.rasul.e = r.at[0]; s.rasul.n = r.at[1]; }
        if (r.path) { const pts = ev.paths[r.path]; moves.push({ id: "rasul", pts, from: r.from, to: r.to, dur: r.dur }); [s.rasul.e, s.rasul.n] = endOf(pts, r.to); }
        if (r.state) s.rasul.state = r.state;
      }
      (b.chars || []).forEach((c) => {
        const cur = { on: true, expr: "netral", ...(s.chars[c.id] || {}) };
        if (c.at) { cur.e = c.at[0]; cur.n = c.at[1]; }
        if (c.path) { const pts = ev.paths[c.path]; moves.push({ id: c.id, pts, from: c.from, to: c.to, dur: c.dur }); [cur.e, cur.n] = endOf(pts, c.to); }
        if (c.expr) cur.expr = c.expr; if (c.on !== undefined) cur.on = c.on;
        s.chars[c.id] = cur;
      });
      if (b.jibril) s.jib = { e: b.jibril.at[0], n: b.jibril.at[1], up: b.jibril.up, power: b.jibril.power };
      if (b.cam) s.cam = b.cam;
      if (b.malam !== undefined) s.malam = b.malam;
      if (b.inside === null) s.inside = null;
      else if (b.inside) {
        const I = b.inside, prev = s.inside && (!I.scene || I.scene === s.inside.scene) ? s.inside : { scene: I.scene, chars: {}, jibril: { x: 800, y: 300, power: 0 } };
        const nx = { ...prev, label: I.label !== undefined ? I.label : prev.label, labels: I.labels !== undefined ? I.labels : prev.labels, cam: I.cam || prev.cam, rasul: I.rasul ? { ...prev.rasul, ...I.rasul } : prev.rasul, jibril: I.jibril ? { ...prev.jibril, ...I.jibril } : prev.jibril, chars: { ...prev.chars } };
        (I.chars || []).forEach((c) => { nx.chars[c.id] = { on: true, ...nx.chars[c.id], ...c }; });
        s.inside = nx;
      }
      out.push({ ...s, beat: b, moves, babak: bi, babakJudul: bk.judul, first: k === 0 });
    }));
    return out;
  }
  // Titik pada jalur di posisi t (0..1) menurut panjang lintasan
  window.SirahPathAt = function (pts, t) {
    if (t <= 0) return pts[0]; if (t >= 1) return pts[pts.length - 1];
    const len = [0]; for (let i = 1; i < pts.length; i++) len.push(len[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const d = t * len[len.length - 1]; let i = 1; while (i < len.length - 1 && len[i] < d) i++;
    const k = (d - len[i - 1]) / (len[i] - len[i - 1] || 1), a = pts[i - 1], b = pts[i];
    return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
  };
  const textOf = (b) => (b.say ? b.say.text : b.narr) || "";
  const holdOf = (b) => (b.hold || 0) + 1400 + textOf(b).length * 22 + (b.say && b.say.arab ? 1000 : 0);
  const NAMA = { rasul: "Rasulullah ﷺ", jibril: "Jibril", wahyu: "Wahyu turun" };

  function SirahStory({ api, id, onClose }) {
    const ev = window.TONTONAN[id], S = api.story;
    const frames = useMemo(() => resolve(ev), [id]);
    const [i, setI] = useState(0), [playing, setPlaying] = useState(true), [typed, setTyped] = useState(0), [done, setDone] = useState(false);
    const [talk, setTalk] = useState(false), [showDate, setShowDate] = useState(false);
    const moveEnd = useRef(0);
    const st = frames[i], b = st.beat, text = textOf(b), who = b.say && b.say.who;
    const reduce = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);

    function apply(f, animate) {
      const mv = {}; f.moves.forEach((m) => { mv[m.id] = m; });
      const put = (aid, o, vis) => {
        const m = animate && mv[aid];
        if (m) { const p = window.SirahPathAt(m.pts, m.from); S.actor(aid, { e: p[0], n: p[1], up: 0, vis }); S.move(aid, m.pts, m.from, m.to, reduce ? 300 : m.dur); }
        else S.actor(aid, { e: o.e, n: o.n, up: 0, vis });
      };
      put("rasul", f.rasul, true);
      Object.entries(f.chars).forEach(([cid, c]) => put(cid, c, true));
      if (animate) S.glide("jibril", f.jib); else S.actor("jibril", { ...f.jib, vis: true });
      S.camera(f.cam); if (S.night) S.night(f.malam);
      moveEnd.current = performance.now() + (animate ? Math.max(0, ...f.moves.map((m) => (reduce ? 300 : m.dur))) : 0);
    }
    useEffect(() => {
      S.begin({ lamps: ev.lampu, malam: frames[0].malam });
      S.actor("jibril", { e: 0, n: 0, up: 9, power: 0, vis: true });
      apply(frames[0], false);
      return () => S.end();
    }, []);
    const go = (n, animate) => { setDone(false); setI(n); apply(frames[n], animate); };

    useEffect(() => { setTyped(reduce ? 9999 : 0); }, [i]);
    useEffect(() => { if (typed >= text.length) return; const t = setTimeout(() => setTyped((n) => n + 2), 26); return () => clearTimeout(t); }, [typed, text]);
    useEffect(() => {
      if (!b.say || typed >= text.length) { setTalk(false); return; }
      const t = setInterval(() => setTalk((v) => !v), 150); return () => clearInterval(t);
    }, [i, typed >= text.length]);
    useEffect(() => {
      if (!playing || done || typed < text.length) return;
      const wait = Math.max(holdOf(b), moveEnd.current - performance.now() + 900);
      const t = setTimeout(() => { if (i < frames.length - 1) go(i + 1, true); else { setDone(true); setPlaying(false); } }, wait);
      return () => clearTimeout(t);
    }, [playing, typed, i, done]);
    const next = () => { if (typed < text.length) { setTyped(9999); return; } if (i < frames.length - 1) go(i + 1, true); else { setDone(true); setPlaying(false); } };
    const prev = () => go(Math.max(0, i - 1), false);
    const toggle = () => { if (done) { go(0, false); setPlaying(true); } else setPlaying(!playing); };
    useEffect(() => {
      const k = (e) => {
        if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
        if (e.key === "Escape") onClose(); else if (e.key === " ") { e.preventDefault(); toggle(); }
        else if (e.key === "ArrowRight") { e.preventDefault(); next(); } else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      };
      window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
    });

    const node = (actor, extra = {}) => (el) => S.node(el, el ? { actor, ...extra } : null);
    const shown = text.slice(0, typed), caret = typed < text.length ? "▍" : "";
    const bubble = (sp) => who === sp && !st.inside && html`<div class=${`pl-bubble st-bubble${sp === "jibril" || sp === "wahyu" ? " light" : sp === "rasul" ? " rasul" : ""}`} key=${"b" + i}>
      <p class="pl-who">${NAMA[sp] || ev.tokoh[sp].nama}${b.say.ayat ? html` <span>${b.say.ayat}</span>` : ""}</p>
      ${b.say.arab && html`<p class="pl-ar" lang="ar" dir="rtl">${b.say.arab}</p>`}
      <p class="pl-txt">${shown}<span class="pl-caret">${caret}</span></p></div>`;

    const lastInside = useRef(null); if (st.inside) lastInside.current = st.inside;
    return html`<div class=${`st-root${st.inside ? " is-inside" : ""}${ev.peta === false ? " stage-only" : ""}`}>
      <div class="st-layer" aria-hidden=${false}>
        <div class="st-node" ref=${node("rasul", { dy: 3 })}>
          <div class=${`st-in st-rasul ${st.rasul.state}`}>${bubble("rasul")}
            <p class="ar" lang="ar">رسول الله ﷺ</p><p class="id">Rasulullah ﷺ</p></div>
        </div>
        <div class="st-node" ref=${node("jibril", { dy: 0 })}>
          <div class=${`st-in st-jibril${st.jib.power > 0.05 ? "" : " off"}`}>${bubble("jibril")}
            <p class="ar" lang="ar">${(ev.malaikat || {}).ar || "جبريل"}</p><p class="id">${(ev.malaikat || {}).id || "Jibril"}</p></div>
        </div>
        ${Object.entries(st.chars).map(([cid, c]) => html`<div key=${cid} class="st-node" ref=${node(cid, { dy: 0, scale: true })}>
          <div class=${`st-in st-char${c.on === false ? " off" : ""}`}>${bubble(cid)}<${Chibi} id=${cid} expr=${c.expr} talk=${talk && who === cid} />
            <p class="st-cname">${ev.tokoh[cid].nama}</p></div>
        </div>`)}
      </div>

      ${who === "wahyu" && !st.inside && html`<div class="pl-bubble light st-wahyu" key=${"w" + i} role="status">
        <p class="pl-who">${NAMA.wahyu}${b.say.ayat ? html` <span>${b.say.ayat}</span>` : ""}</p>
        ${b.say.arab && html`<p class="pl-ar" lang="ar" dir="rtl">${b.say.arab}</p>`}
        <p class="pl-txt">${shown}<span class="pl-caret">${caret}</span></p></div>`}
      ${lastInside.current && window.SirahInterior && html`<${window.SirahInterior} inside=${lastInside.current} show=${!!st.inside} say=${st.inside ? b.say : null}
        talk=${talk} shown=${shown} caret=${caret} tokoh=${ev.tokoh} idx=${i} flash=${!!(st.inside && b.hitung)} />`}
      <div class=${`st-date${b.tanggal ? " hl" : ""}`}>
        <p class="st-k">Peristiwa · ${ev.tahun} M</p>
        <h3>${ev.judul}</h3>
        <p class="st-when">${ev.tanggal.judul}</p>
        <button type="button" class="link small" onClick=${() => setShowDate(!showDate)} aria-expanded=${showDate}>${showDate ? "Tutup keterangan" : "Keterangan tanggal"}</button>
        ${showDate && html`<dl>${ev.tanggal.rinci.map((r) => html`<div key=${r.k}><dt>${r.k}</dt><dd>${r.v} <span class="src">${r.url ? html`<a href=${r.url} target="_blank" rel="noopener">${r.s}</a>` : r.s}</span></dd></div>`)}</dl>`}
      </div>
      <button type="button" class="close st-close" onClick=${onClose} aria-label="Tutup tontonan">×</button>
      ${st.first && html`<p class="pl-babak st-babak" key=${"bk" + st.babak}>Babak ${st.babak + 1}: ${st.babakJudul}</p>`}
      ${b.hitung && html`<p class="pl-count" key=${"c" + i}>${b.hitung}</p>`}
      ${b.hitung && !st.inside && html`<div class="st-flash" key=${"f" + i}></div>`}
      ${done && html`<div class="pl-end st-end"><h3>Selesai</h3><p>${ev.penutup}</p>
        <div class="pl-end-btns"><button type="button" onClick=${toggle}>Putar ulang</button><button type="button" onClick=${onClose}>Jelajahi peta</button></div></div>`}

      <div class="st-bottom">
        <div class="pl-caption">
          ${!b.say ? html`<p class="pl-narr">${shown}<span class="pl-caret">${caret}</span></p>` : html`<p class="pl-narr dim">${who === "wahyu" ? "Wahyu turun kepada Rasulullah ﷺ" : (NAMA[who] || ev.tokoh[who].nama) + " berbicara"}</p>`}
          <p class="pl-src">Sumber: ${b.url ? html`<a href=${b.url} target="_blank" rel="noopener">${b.sumber}</a>` : b.sumber}</p>
        </div>
        <div class="pl-ctl">
          <button type="button" onClick=${prev} disabled=${i === 0} aria-label="Adegan sebelumnya">‹</button>
          <button type="button" class="play" onClick=${toggle}>${done ? "Putar ulang" : playing ? "Jeda" : "Putar"}</button>
          <button type="button" onClick=${next} aria-label="Adegan berikutnya">›</button>
          <div class="pl-progress" role="group" aria-label="Babak">
            ${ev.babak.map((bk, bi) => {
              const idx = frames.map((f, n) => [f, n]).filter(([f]) => f.babak === bi), a = idx[0][1], z = idx[idx.length - 1][1];
              const fill = i > z ? 1 : i < a ? 0 : (i - a + 1) / (z - a + 1);
              return html`<button type="button" key=${bi} class=${`seg${bi === st.babak ? " on" : ""}`} style=${{ flex: idx.length }} onClick=${() => go(a, false)} title=${bk.judul}>
                <i style=${{ width: fill * 100 + "%" }}></i><span>${bk.judul}</span></button>`;
            })}
          </div>
        </div>
        <p class="pl-note">${ev.pengantar} Spasi: putar/jeda, ←/→: adegan, Esc: tutup.</p>
      </div>
    </div>`;
  }
  window.SirahStory = SirahStory;
})();
