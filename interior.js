// Adegan dalam ruangan (gua dan rumah) untuk cerita di peta: panggung SVG 1600x900 yang tampil di atas peta.
// Rasulullah ﷺ dan Jibril hanya sebagai tulisan dan cahaya; tokoh lain chibi dengan wajah hanya mata dan mulut.
(function () {
  const { useState, useEffect, useRef, useMemo } = React;
  const html = htm.bind(React.createElement);
  const W = 1600, H = 900;
  // ---------- Bintang deterministik ----------
  const STARS = Array.from({ length: 80 }, (_, i) => { const r = (n) => { const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453; return x - Math.floor(x); }; return [r(1) * W, r(2) * H * 0.55, 0.6 + r(3) * 1.6, 0.3 + r(4) * 0.7]; });
  const Stars = () => html`<g class="pl-stars">${STARS.map(([x, y, r, o], i) => html`<circle key=${i} cx=${x} cy=${y} r=${r} fill="#fff6dc" opacity=${o} style=${{ animationDelay: `${(i % 7) * 0.6}s` }} />`)}</g>`;
  const Moon = ({ x, y }) => html`<g><circle cx=${x} cy=${y} r="26" fill="#f3e6bf" /><circle cx=${x + 11} cy=${y - 6} r="24" fill="#0d1535" /></g>`;
  const Lights = ({ x0, x1, y0, y1, n = 40, seed = 1 }) => html`<g>${Array.from({ length: n }, (_, i) => {
    const r = (k) => { const v = Math.sin((i + seed) * 91.7 + k * 13.1) * 9999; return v - Math.floor(v); };
    return html`<circle key=${i} cx=${x0 + r(1) * (x1 - x0)} cy=${y0 + r(2) * (y1 - y0)} r=${1.4 + r(3) * 2} fill="#ffcf7a" opacity=${0.45 + r(4) * 0.5} />`; })}</g>`;

  const Defs = () => html`<defs>
    <linearGradient id="g-malam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#060b20" /><stop offset=".6" stop-color="#15204a" /><stop offset="1" stop-color="#2c2f5e" /></linearGradient>
    <linearGradient id="g-fajar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#121c48" /><stop offset=".42" stop-color="#4b3a6e" /><stop offset=".72" stop-color="#c77a5e" /><stop offset="1" stop-color="#f3c47c" /></linearGradient>
    <linearGradient id="g-dinding" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5c4431" /><stop offset=".55" stop-color="#8d6a48" /><stop offset="1" stop-color="#6b5038" /></linearGradient>
    <linearGradient id="g-dinding2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4d4034" /><stop offset=".55" stop-color="#7a6651" /><stop offset="1" stop-color="#5a4a3b" /></linearGradient>
    <radialGradient id="g-halo"><stop offset="0" stop-color="#fff7da" stop-opacity=".95" /><stop offset=".45" stop-color="#f2d27a" stop-opacity=".35" /><stop offset="1" stop-color="#f2d27a" stop-opacity="0" /></radialGradient>
    <radialGradient id="g-jibril"><stop offset="0" stop-color="#ffffff" stop-opacity="1" /><stop offset=".25" stop-color="#fff4c8" stop-opacity=".85" /><stop offset=".6" stop-color="#ffe08a" stop-opacity=".25" /><stop offset="1" stop-color="#ffe08a" stop-opacity="0" /></radialGradient>
    <radialGradient id="g-lampu"><stop offset="0" stop-color="#ffd58a" stop-opacity=".75" /><stop offset="1" stop-color="#ffb24a" stop-opacity="0" /></radialGradient>
    <linearGradient id="g-siang" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9cc3dc" /><stop offset=".7" stop-color="#e8dcc0" /><stop offset="1" stop-color="#d9b98a" /></linearGradient>
    <radialGradient id="g-matahari"><stop offset="0" stop-color="#fff0c2" stop-opacity=".9" /><stop offset="1" stop-color="#f3a86a" stop-opacity="0" /></radialGradient>
  </defs>`;

  // ---------- Latar ----------
  const Interior = ({ alt, siang }) => html`<g>
    <rect width=${W} height=${H} fill=${alt ? "url(#g-dinding2)" : "url(#g-dinding)"} />
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => html`<rect key=${i} x="0" y=${140 + i * 64} width=${W} height="1.5" fill="#000" opacity=".06" />`)}
    <rect x="0" y="0" width=${W} height="86" fill="#3a2a1e" />
    ${Array.from({ length: 12 }, (_, i) => html`<rect key=${i} x=${30 + i * 135} y="70" width="34" height="34" rx="3" fill="#4d3626" />`)}
    <rect x="0" y="730" width=${W} height="170" fill="#4e3a2a" />
    <rect x="80" y="250" width="230" height="480" fill=${siang ? "url(#g-siang)" : "url(#g-malam)"} stroke="#3a2a1e" stroke-width="22" />
    ${siang ? html`<path d="M310 730 L560 900 L80 900 L80 730 Z" fill="#fff2c8" opacity=".14" />` : html`<g clip-path="url(#door)"><${Stars} /></g>`}
    <clipPath id="door"><rect x="91" y="261" width="208" height="458" /></clipPath>
    <rect x="360" y="712" width="980" height="44" rx="6" fill=${alt ? "#6d5a44" : "#8a6a3a"} />
    ${[0, 1, 2, 3, 4, 5, 6].map((i) => html`<rect key=${i} x=${380 + i * 140} y="716" width="8" height="36" fill="#000" opacity=".12" />`)}
  </g>`;
  const Lamp = ({ x, y }) => html`<g>
    <circle cx=${x} cy=${y} r="190" fill="url(#g-lampu)" class="pl-flicker" />
    <path d=${`M${x - 40} ${y + 40} V${y - 30} Q${x} ${y - 80} ${x + 40} ${y - 30} V${y + 40} Z`} fill="#2e2219" />
    <ellipse cx=${x} cy=${y + 18} rx="22" ry="9" fill="#a86f3c" /><path d=${`M${x + 14} ${y + 12} q10 -4 16 -2 l-12 8z`} fill="#a86f3c" />
    <path d=${`M${x + 26} ${y + 8} q-4 -14 2 -22 q6 10 -2 22z`} fill="#ffd47a" class="pl-flame" />
  </g>`;

  function Scene({ kind }) {
    if (kind === "fajar") return html`<g>
      <rect width=${W} height=${H} fill="url(#g-fajar)" />
      <circle cx="820" cy="800" r="420" fill="url(#g-matahari)" class="pl-dawn" />
      <path d="M0 640 L180 540 L320 600 L520 480 L700 570 L860 510 L1040 600 L1220 490 L1400 570 L1600 510 L1600 900 L0 900Z" fill="#2a2140" />
      <path d="M0 760 L1600 740 L1600 900 L0 900Z" fill="#1a1430" />
      ${Array.from({ length: 22 }, (_, i) => { const x = 40 + i * 72, h = 26 + ((i * 37) % 30); return html`<rect key=${i} x=${x} y=${740 - h} width=${50 + ((i * 13) % 20)} height=${h + 30} fill="#1a1430" />`; })}
      <rect x="730" y="650" width="70" height="60" fill="#1a1430" /><rect x="752" y="668" width="18" height="16" fill="#ffcf7a" opacity=".85" />
    </g>`;
    if (kind === "hira-luar") return html`<g>
      <rect width=${W} height=${H} fill="url(#g-malam)" /><${Stars} /><${Moon} x=${300} y=${150} />
      <path d="M0 700 L200 610 L420 660 L640 570 L820 640 L1000 600 L1600 700 L1600 900 L0 900Z" fill="#141a36" />
      <${Lights} x0=${120} x1=${640} y0=${770} y1=${870} n=${55} />
      <path d="M760 900 L1060 330 L1170 212 L1215 190 L1262 222 L1380 400 L1620 900Z" fill="#231d2b" />
      <path d="M1060 330 L1170 212 L1215 190 L1262 222" fill="none" stroke="#3f3442" stroke-width="5" />
      <polyline points="1000,880 1080,760 1020,700 1110,600 1060,540 1150,440 1120,380 1200,300 1215,262" fill="none" stroke="#5a4a52" stroke-width="3" stroke-dasharray="8 10" />
      <ellipse cx="1215" cy="262" rx="20" ry="12" fill="#07060c" />
    </g>`;
    if (kind === "hira-dalam") return html`<g>
      <rect width=${W} height=${H} fill="url(#g-malam)" /><${Stars} /><${Moon} x=${1080} y=${210} />
      <path d="M0 620 L300 560 L600 600 L900 540 L1200 590 L1600 560 L1600 900 L0 900Z" fill="#121833" />
      <${Lights} x0=${420} x1=${1100} y0=${590} y1=${640} n=${30} seed=${7} />
      <path fill-rule="evenodd" fill="#2b221c" d="M0 0 H1600 V900 H0 Z M380 180 Q520 90 800 112 Q1100 100 1230 200 Q1290 360 1240 520 Q1000 580 800 570 Q560 580 350 520 Q300 360 380 180 Z" />
      <path d="M380 180 Q520 90 800 112 Q1100 100 1230 200" fill="none" stroke="#45372c" stroke-width="10" />
      ${[[150, 260, 120], [1400, 300, 140], [220, 640, 160], [1330, 680, 150], [700, 40, 200]].map(([x, y, r], i) => html`<path key=${i} d=${`M${x - r} ${y} q${r / 2} -${r / 3} ${r} -${r / 6} t${r} ${r / 8}`} fill="none" stroke="#3d3027" stroke-width="6" />`)}
      <path d="M0 900 L0 720 Q400 650 800 668 Q1200 650 1600 720 L1600 900Z" fill="#33281f" />
    </g>`;
    if (kind === "turun") return html`<g>
      <rect width=${W} height=${H} fill="url(#g-malam)" /><${Stars} /><${Moon} x=${260} y=${140} />
      <path d="M0 900 L0 770 L500 650 L900 490 L1300 270 L1600 190 L1600 900Z" fill="#231d2b" />
      <polyline points="1240,290 1000,420 1080,470 760,560 840,610 460,700 300,770" fill="none" stroke="#5a4a52" stroke-width="3" stroke-dasharray="8 10" />
      <${Lights} x0=${0} x1=${380} y0=${800} y1=${890} n=${30} seed=${3} />
    </g>`;
    if (kind === "rumah-khadijah") return html`<g><${Interior} /><${Lamp} x=${1380} y=${380} />
      <ellipse cx="1220" cy="700" rx="90" ry="26" fill="#7a4b3a" /><ellipse cx="420" cy="700" rx="80" ry="24" fill="#6a4a3a" /></g>`;
    if (kind === "rumah-khadijah-siang") return html`<g><${Interior} siang=${true} />
      <ellipse cx="1220" cy="700" rx="90" ry="26" fill="#7a4b3a" /><ellipse cx="420" cy="700" rx="80" ry="24" fill="#6a4a3a" />
      <g transform="translate(1300 640)"><ellipse cx="0" cy="70" rx="44" ry="10" fill="#000" opacity=".2" /><path d="M-34 -20 Q-40 40 -24 70 L24 70 Q40 40 34 -20 Z" fill="#a8774a" /><ellipse cx="0" cy="-20" rx="34" ry="9" fill="#7d5636" /><ellipse cx="0" cy="-20" rx="26" ry="6" fill="#4f7d93" /></g></g>`;
    if (kind === "rumah-waraqah") return html`<g><${Interior} alt=${true} />
      <g>${[0, 1, 2].map((r) => html`<g key=${r}><rect x="1260" y=${250 + r * 140} width="280" height="12" fill="#3a2a1e" />
        ${[0, 1, 2, 3, 4, 5].map((c) => html`<g key=${c}><rect x=${1272 + c * 44} y=${200 + r * 140} width="38" height="50" rx="18" fill=${["#d8c8a2", "#cdb98d", "#e2d4b0"][c % 3]} /><circle cx=${1291 + c * 44} cy=${225 + r * 140} r="6" fill="#a8916a" /></g>`)}</g>`)}</g>
      <rect x="960" y="664" width="260" height="22" rx="4" fill="#4a3526" /><rect x="980" y="686" width="14" height="40" fill="#4a3526" /><rect x="1186" y="686" width="14" height="40" fill="#4a3526" />
      <rect x="1010" y="640" width="120" height="26" rx="2" fill="#e6d8b4" transform="rotate(-4 1070 652)" />
      <${Lamp} x=${1240} y=${600} /></g>`;
    return null;
  }

  // ---------- Rasulullah ﷺ: hanya tulisan bercahaya ----------
  function Rasul({ r, speaking }) {
    if (!r) return null;
    const sc = r.small ? 0.55 : 1;
    return html`<g style=${{ transform: `translate(${r.x}px, ${r.y}px) scale(${sc})`, transition: "transform 1.6s ease" }}>
      <circle r="130" fill="url(#g-halo)" class=${`pl-halo${speaking ? " on" : ""}`} opacity=${r.state === "payah" ? 0.55 : 1} />
      ${r.state === "berselimut" && html`<g class="pl-cloth">
        <path d="M-150 -6 Q-168 70 -132 128 L132 128 Q168 70 150 -6 Q0 -40 -150 -6Z" fill="#7a5a3a" stroke="#5a4028" stroke-width="4" />
        <path d="M-90 4 Q-96 70 -80 120 M0 -6 Q-6 64 6 124 M90 4 Q98 70 84 120" stroke="#5a4028" stroke-width="3" fill="none" opacity=".7" /></g>`}
      <g class=${`pl-name${r.state === "gemetar" || r.state === "payah" ? " shake" : ""}`}>
        <text y="-22" text-anchor="middle" class="pl-r-ar">رسول الله ﷺ</text>
        <text y="26" text-anchor="middle" class="pl-r-id">Rasulullah ﷺ</text>
      </g>
    </g>`;
  }

  // ---------- Jibril: cahaya dengan nama ----------
  function Jibril({ j }) {
    if (!j) return null;
    const p = j.power || 0;
    return html`<g style=${{ transform: `translate(${j.x}px, ${j.y}px)`, opacity: p > 0 ? 1 : 0, transition: "transform 1.3s ease, opacity 1.2s ease" }}>
      <circle r=${150 + p * 230} fill="url(#g-jibril)" style=${{ transition: "r 1.2s ease" }} class="pl-jlight" />
      <g class="pl-rays" opacity=${0.25 + p * 0.45}>${Array.from({ length: 16 }, (_, i) => html`<rect key=${i} x="-3" y=${-(190 + p * 200)} width="6" height=${90 + p * 80} rx="3" fill="#fff3c4" transform=${`rotate(${i * 22.5})`} />`)}</g>
      <text y="-12" text-anchor="middle" class="pl-j-ar">جبريل</text>
      <text y="30" text-anchor="middle" class="pl-j-id">Jibril</text>
    </g>`;
  }

  // ---------- Karakter chibi: wajah hanya mata dan mulut ----------
  const EXPR = {
    netral: { eye: "dot", mouth: "line" }, senyum: { eye: "happy", mouth: "smile" }, lembut: { eye: "closed", mouth: "smile" },
    khawatir: { eye: "dot", mouth: "wavy" }, kaget: { eye: "wide", mouth: "o" }, sedih: { eye: "sad", mouth: "frown" },
    tegas: { eye: "dot", mouth: "short" }, kagum: { eye: "happy", mouth: "o" }
  };
  function Eye({ kind, x }) {
    const st = { fill: "none", stroke: "#2a1d16", "stroke-width": 3.4, "stroke-linecap": "round" };
    if (kind === "dot") return html`<g class="pl-blink" style=${{ transformOrigin: `${x}px -30px` }}><circle cx=${x} cy="-30" r="3.6" fill="#2a1d16" /></g>`;
    if (kind === "wide") return html`<circle cx=${x} cy="-31" r="4.8" fill="#2a1d16" />`;
    if (kind === "happy") return html`<path d=${`M${x - 6} -28 Q${x} -37 ${x + 6} -28`} ...${st} />`;
    if (kind === "closed") return html`<path d=${`M${x - 6} -31 Q${x} -24 ${x + 6} -31`} ...${st} />`;
    if (kind === "sad") return html`<path d=${`M${x - 6} -27 Q${x} -32 ${x + 6} -31`} ...${st} transform=${x < 0 ? "" : `scale(-1 1) translate(${-2 * x} 0)`} />`;
    return null;
  }
  function Mouth({ kind, talk }) {
    const st = { fill: "none", stroke: "#2a1d16", "stroke-width": 3.2, "stroke-linecap": "round" };
    if (talk) return html`<ellipse cx="0" cy="-13" rx="4.5" ry="3.6" fill="#2a1d16" class="pl-talk" />`;
    if (kind === "line") return html`<path d="M-6 -14 H6" ...${st} />`;
    if (kind === "short") return html`<path d="M-4 -14 H4" ...${st} />`;
    if (kind === "smile") return html`<path d="M-7 -16 Q0 -9 7 -16" ...${st} />`;
    if (kind === "frown") return html`<path d="M-6 -11 Q0 -17 6 -11" ...${st} />`;
    if (kind === "wavy") return html`<path d="M-7 -13 q3.5 -4 7 0 t7 0" ...${st} />`;
    if (kind === "o") return html`<ellipse cx="0" cy="-13" rx="3.6" ry="4.4" fill="#2a1d16" />`;
    return null;
  }
  function Chibi({ id, c, talk }) {
    if (!c) return null;
    const ex = EXPR[c.expr] || EXPR.netral;
    const blind = id === "waraqah";
    const eye = blind ? (c.expr === "sedih" ? "sad" : c.expr === "kagum" || c.expr === "senyum" ? "happy" : "closed") : ex.eye;
    const s = id === "waraqah" ? 1.9 : 2;
    return html`<g style=${{ transform: `translate(${c.x}px, ${c.y}px) scale(${s})`, opacity: c.on === false ? 0 : 1, transition: "transform 1.4s ease, opacity 1.6s ease" }}>
      <ellipse cx="0" cy="96" rx="50" ry="9" fill="#000" opacity=".22" />
      <g class="pl-bob">
        ${id === "khadijah" ? html`<g>
          <path d="M-50 94 Q-54 22 -30 4 L30 4 Q54 22 50 94 Z" fill="#7b2f3a" />
          <path d="M-48 -30 Q-48 -84 0 -84 Q48 -84 48 -30 L54 36 Q0 50 -54 36 Z" fill="#3d4c5e" />
          <ellipse cx="0" cy="-26" rx="28" ry="30" fill="#e8c9a6" />
          <path d="M-31 -40 Q0 -66 31 -40" fill="none" stroke="#2f3b4a" stroke-width="6" stroke-linecap="round" />
        </g>` : html`<g>
          <path d="M-50 94 Q-54 24 -30 6 L30 6 Q54 24 50 94 Z" fill="#6a5440" />
          <path d="M-14 6 L0 40 L14 6" fill="#e9e2d2" />
          <ellipse cx="0" cy="-26" rx="29" ry="30" fill="#e2c09a" />
          <path d="M-27 -16 Q-30 22 0 32 Q30 22 27 -16 Q16 -4 0 -4 Q-16 -4 -27 -16Z" fill="#f2efe6" />
          <path d="M-33 -36 Q-34 -72 0 -72 Q34 -72 33 -36 Q16 -48 0 -48 Q-16 -48 -33 -36Z" fill="#efe8d8" />
          <path d="M-33 -36 L-38 -8" stroke="#efe8d8" stroke-width="7" stroke-linecap="round" /><path d="M33 -36 L38 -8" stroke="#efe8d8" stroke-width="7" stroke-linecap="round" />
          <path d="M40 30 L58 94" stroke="#5a3e28" stroke-width="5" stroke-linecap="round" />
        </g>`}
        <${Eye} kind=${eye} x=${-11} /><${Eye} kind=${eye} x=${11} />
        <g transform=${id === "waraqah" ? "translate(0 4)" : ""}><${Mouth} kind=${ex.mouth} talk=${talk} /></g>
      </g>
    </g>`;
  }

  // ---------- Pemutar ----------
  function anchorOf(st, who) {
    if (who === "rasul" && st.rasul) return { x: st.rasul.x, y: st.rasul.y - (st.rasul.small ? 70 : 120) };
    if (who === "jibril" && st.jibril) return { x: st.jibril.x, y: st.jibril.y - 130 };
    if (who === "wahyu") return { x: st.rasul ? st.rasul.x : 800, y: 250 };
    const c = st.chars[who]; if (c) return { x: c.x, y: c.y - 190 };
    return { x: 800, y: 200 };
  }
  const NAMA = { rasul: "Rasulullah ﷺ", jibril: "Jibril", wahyu: "Wahyu turun" };

  function SirahInterior({ inside, show, say, talk, shown, caret, tokoh, idx, flash }) {
    const stageRef = useRef(null), bubRef = useRef(null);
    const [box, setBox] = useState({ w: 1600, h: 900 }), [bub, setBub] = useState({ w: 0, h: 0 });
    const reduce = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);
    useEffect(() => { const ro = new ResizeObserver(([en]) => setBox({ w: en.contentRect.width, h: en.contentRect.height })); ro.observe(stageRef.current); return () => ro.disconnect(); }, []);
    React.useLayoutEffect(() => { const el = bubRef.current; if (!el) return; const w = el.offsetWidth, h = el.offsetHeight; if (Math.abs(w - bub.w) > 2 || Math.abs(h - bub.h) > 2) setBub({ w, h }); });
    const st = inside, cam = st.cam || { x: 800, y: 450, s: 1 };
    const k = Math.min(box.w / W, box.h / H), ox = (box.w - W * k) / 2, oy = (box.h - H * k) / 2;
    const toScreen = (p) => ({ x: ox + k * (W / 2 + (p.x - cam.x) * cam.s), y: oy + k * (H / 2 + (p.y - cam.y) * cam.s) });
    const who = say && say.who, anchor = who && toScreen(anchorOf(st, who));
    let bx = 0, by = 0, tail = true;
    if (anchor && bub.h) {
      const half = bub.w / 2 + 10;
      if (anchor.x - half < 0) bx = half - anchor.x; else if (anchor.x + half > box.w) bx = box.w - half - anchor.x;
      if (anchor.y - bub.h - 14 < 8) { by = bub.h + 22 - anchor.y; tail = false; }
      if (bx) tail = false;
    }
    return html`<div class=${`in-wrap${show ? " show" : ""}`} aria-hidden=${!show}>
      <div class="in-stage" ref=${stageRef}>
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <${Defs} />
          <g key=${st.scene} class="pl-scene">
            <g style=${{ transform: `translate(${W / 2 - cam.x * cam.s}px, ${H / 2 - cam.y * cam.s}px) scale(${cam.s})`, transformOrigin: "0 0", transition: reduce ? "none" : "transform 1.6s ease" }}>
              <${Scene} kind=${st.scene} />
              ${Object.entries(st.chars || {}).map(([cid, c]) => html`<${Chibi} key=${cid} id=${cid} c=${c} talk=${talk && who === cid} />`)}
              <${Rasul} r=${st.rasul} speaking=${who === "rasul"} />
              <${Jibril} j=${st.jibril} />
            </g>
          </g>
          ${flash && html`<g class="pl-flash" key=${"f" + idx}><rect width=${W} height=${H} fill="#fff8e0" /></g>`}
        </svg>
        ${anchor && show && html`<div class="pl-bubble-wrap" style=${{ left: anchor.x + bx + "px", top: anchor.y + by + "px" }}>
          <div ref=${bubRef} class=${`pl-bubble${who === "jibril" || who === "wahyu" ? " light" : who === "rasul" ? " rasul" : ""}${tail ? "" : " notail"}`} key=${idx}>
            <p class="pl-who">${NAMA[who] || tokoh[who].nama}${say.ayat ? html` <span>${say.ayat}</span>` : ""}</p>
            ${say.arab && html`<p class="pl-ar" lang="ar" dir="rtl">${say.arab}</p>`}
            <p class="pl-txt">${shown}<span class="pl-caret">${caret}</span></p>
          </div>
        </div>`}
        <p class="in-label">${{ "hira-dalam": "Di dalam Gua Hira", "rumah-khadijah": "Di dalam rumah Khadijah", "rumah-khadijah-siang": "Di dalam rumah Khadijah", "rumah-waraqah": "Di rumah Waraqah bin Naufal" }[st.scene] || ""}</p>
      </div>
    </div>`;
  }
  window.SirahInterior = SirahInterior;
})();
