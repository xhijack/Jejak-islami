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

  // Pohon kurma: batang melengkung dan pelepah
  const Palm = ({ x, y, h = 200 }) => html`<g transform=${`translate(${x} ${y})`}>
    <path d=${`M-6 0 Q-14 ${-h * 0.5} 4 ${-h}`} fill="none" stroke="#6a4e34" stroke-width="12" stroke-linecap="round" />
    ${[[-1, -0.2], [-0.7, -0.6], [-0.3, -0.9], [0.3, -0.9], [0.7, -0.6], [1, -0.2], [0, -1]].map(([dx, dy], i) => html`<path key=${i} d=${`M4 ${-h} q${dx * 50} ${dy * 40 - 10} ${dx * 110} ${dy * 50 + 30}`} fill="none" stroke="#4f6a34" stroke-width="9" stroke-linecap="round" />`)}
    <circle cx="0" cy=${-h + 16} r="9" fill="#8a4a22" /><circle cx="12" cy=${-h + 20} r="8" fill="#7a3e1a" />
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
    if (kind === "baitul-maqdis") return html`<g>
      <rect width=${W} height=${H} fill="url(#g-malam)" /><${Stars} /><${Moon} x=${1320} y=${150} />
      <path d="M0 600 L260 520 L520 560 L800 500 L1080 550 L1340 505 L1600 560 L1600 900 L0 900Z" fill="#161c3a" />
      <rect x="140" y="560" width="1320" height="340" fill="#3a3326" />
      ${Array.from({ length: 16 }, (_, i) => html`<rect key=${i} x=${140 + i * 82.5} y="560" width="80" height="40" fill="#4a4131" stroke="#2d281e" stroke-width="2" />`)}
      ${[300, 470, 1130, 1300].map((x, i) => html`<g key=${i}><rect x=${x} y=${430 - (i % 2) * 40} width="34" height=${170 + (i % 2) * 40} fill="#5a503d" /><rect x=${x - 8} y=${420 - (i % 2) * 40} width="50" height="14" fill="#6a5f49" /></g>`)}
      <rect x="0" y="760" width=${W} height="140" fill="#2c271d" />
      ${Array.from({ length: 9 }, (_, i) => html`<rect key=${i} x=${120 + i * 160} y=${780 + (i % 3) * 18} width=${60 + (i % 4) * 14} height="22" rx="4" fill="#3d3628" />`)}
    </g>`;
    if (kind === "langit") return html`<g>
      <rect width=${W} height=${H} fill="#050818" /><${Stars} />
      <g transform="translate(0 340)"><${Stars} /></g>
      ${[0, 1, 2, 3, 4, 5, 6].map((i) => html`<ellipse key=${i} cx="800" cy=${980 - i * 40} rx=${1500 - i * 150} ry=${560 - i * 62} fill="none" stroke="#f2d27a" stroke-opacity=${0.07 + i * 0.035} stroke-width="3" />`)}
      <circle cx="800" cy="120" r="320" fill="url(#g-halo)" opacity=".35" />
    </g>`;
    if (kind === "masjid-madinah") return html`<g>
      <rect width=${W} height=${H} fill="url(#g-siang)" />
      <rect x="0" y="560" width=${W} height="340" fill="#cdb48a" />
      <rect x="0" y="150" width=${W} height="70" fill="#6b5a3a" />
      ${Array.from({ length: 40 }, (_, i) => html`<path key=${i} d=${`M${i * 42} 150 l40 70`} stroke="#8a7448" stroke-width="5" />`)}
      ${[180, 520, 860, 1200, 1500].map((x, i) => html`<g key=${i}><rect x=${x} y="220" width="34" height="400" fill="#7a5a36" />${[0, 1, 2, 3, 4, 5, 6, 7].map((k) => html`<path key=${k} d=${`M${x} ${250 + k * 46} h34`} stroke="#5a4026" stroke-width="3" />`)}</g>`)}
      <rect x="0" y="600" width=${W} height="60" fill="#b39468" />
      <g transform="translate(1380 120)"><rect x="-120" y="-34" width="240" height="56" rx="10" fill="#0b1430" opacity=".75" /><text x="0" y="2" text-anchor="middle" fill="#f2d27a" style=${{ font: "600 26px sans-serif" }}>arah kiblat ↔</text></g>
    </g>`;
    if (kind === "badar") return html`<g>
      <rect width=${W} height=${H} fill="url(#g-fajar)" />
      <circle cx="1240" cy="760" r="300" fill="url(#g-matahari)" class="pl-dawn" />
      <path d="M0 620 Q300 540 600 600 T1200 580 T1600 600 L1600 900 L0 900Z" fill="#7a5a3e" />
      <path d="M0 720 Q400 660 800 700 T1600 690 L1600 900 L0 900Z" fill="#a07a50" />
      <g transform="translate(330 560)"><path d="M-170 0 L0 -110 L170 0 Z" fill="#6b5a2e" /><path d="M-170 0 L0 -110 L170 0" fill="none" stroke="#4a3e1e" stroke-width="6" />${Array.from({ length: 9 }, (_, i) => html`<path key=${i} d=${`M${-150 + i * 37} -6 l20 -60`} stroke="#8a7a3e" stroke-width="5" />`)}<rect x="-150" y="0" width="10" height="150" fill="#4a3e1e" /><rect x="140" y="0" width="10" height="150" fill="#4a3e1e" /></g>
      <ellipse cx="1180" cy="780" rx="70" ry="18" fill="#4a3a2a" /><ellipse cx="1180" cy="776" rx="50" ry="10" fill="#2a3a4a" />
    </g>`;
    if (kind === "uhud") return html`<g>
      <rect width=${W} height=${H} fill="url(#g-siang)" />
      <path d="M200 620 L520 260 L700 330 L900 180 L1120 300 L1300 240 L1560 620 Z" fill="#8a4a32" />
      <path d="M520 260 L700 330 L900 180 L1120 300 L1300 240" fill="none" stroke="#6a3422" stroke-width="8" />
      <path d="M0 660 Q160 560 320 660 Z" fill="#9a6a44" />
      <rect x="0" y="640" width=${W} height="260" fill="#c09a6a" />
      ${Array.from({ length: 12 }, (_, i) => html`<ellipse key=${i} cx=${80 + i * 135} cy=${700 + (i % 3) * 50} rx="30" ry="8" fill="#a07a50" />`)}
    </g>`;
    if (kind === "khandaq") return html`<g>
      <rect width=${W} height=${H} fill="#9aa4ae" />
      <path d="M0 520 L300 360 L560 470 L820 330 L1100 450 L1400 360 L1600 440 L1600 900 L0 900Z" fill="#6a6258" />
      <rect x="0" y="560" width=${W} height="340" fill="#a8946e" />
      <path d="M0 690 L1600 650 L1600 730 L0 770 Z" fill="#4a3a28" />
      <path d="M0 690 L1600 650" stroke="#7a6446" stroke-width="6" />
      ${Array.from({ length: 14 }, (_, i) => html`<ellipse key=${i} cx=${60 + i * 118} cy=${640 - i * 2} rx="34" ry="12" fill="#8a7654" />`)}
      ${Array.from({ length: 30 }, (_, i) => html`<path key=${i} d=${`M${(i * 61) % 1600} ${(i * 37) % 500} l-40 22`} stroke="#e8edf2" stroke-opacity=".35" stroke-width="2" />`)}
    </g>`;
    if (kind === "padang-malam") return html`<g>
      <rect width=${W} height=${H} fill="url(#g-malam)" /><${Stars} /><${Moon} x=${1240} y=${160} />
      <path d="M0 640 Q300 580 600 620 T1200 600 T1600 620 L1600 900 L0 900Z" fill="#1e2244" />
      <path d="M0 740 Q500 690 900 720 T1600 710 L1600 900 L0 900Z" fill="#2a2a4a" />
      ${[[1080, 690], [1260, 700], [1430, 686]].map(([x, y], i) => html`<g key=${i} transform=${`translate(${x} ${y}) scale(.9)`} fill="#14162e"><ellipse cx="0" cy="0" rx="60" ry="26" /><path d="M-30 -10 q10 -40 30 -30 q20 -14 30 22" /><path d="M48 -8 q30 -30 36 -70 l14 0 q-4 50 -34 84z" /><rect x="-44" y="10" width="8" height="54" /><rect x="-20" y="10" width="8" height="54" /><rect x="20" y="10" width="8" height="54" /><rect x="40" y="10" width="8" height="54" /></g>`)}
    </g>`;
    if (kind === "padang-siang") return html`<g>
      <rect width=${W} height=${H} fill="url(#g-siang)" />
      <path d="M0 600 Q300 540 600 580 T1200 560 T1600 580 L1600 900 L0 900Z" fill="#c8a678" />
      <path d="M0 720 Q500 670 900 700 T1600 690 L1600 900 L0 900Z" fill="#d6b88a" />
      <path d="M560 900 L760 600 L840 600 L1040 900Z" fill="#c09a6a" opacity=".6" />
    </g>`;
    // ---------- Hijrah: Quba dan Madinah ----------
    if (kind === "quba" || kind === "harrah") return html`<g>
      <rect width=${W} height=${H} fill="url(#g-siang)" /><circle cx="800" cy="60" r="160" fill="url(#g-matahari)" opacity=".7" />
      <path d="M0 520 Q300 500 600 512 T1200 506 T1600 516 L1600 600 L0 600 Z" fill="#2c2622" />
      ${kind === "harrah" ? html`<path d="M0 560 Q400 530 800 560 T1600 552 L1600 900 L0 900Z" fill="#3a332c" />
        ${Array.from({ length: 40 }, (_, i) => html`<ellipse key=${i} cx=${(i * 97) % 1600} cy=${620 + ((i * 53) % 260)} rx=${14 + (i % 4) * 8} ry=${6 + (i % 3) * 3} fill="#1e1a17" />`)}
        <path d="M0 470 Q400 462 800 470 T1600 466" fill="none" stroke="#fff6dc" stroke-opacity=".35" stroke-width="10" class="pl-dawn" />`
      : html`<path d="M0 600 Q400 570 800 590 T1600 584 L1600 900 L0 900Z" fill="#cdb48a" />
        ${[[120, 600], [300, 590], [1280, 596], [1460, 606], [200, 640], [1380, 650]].map(([x, y], i) => html`<${Palm} key=${i} x=${x} y=${y} h=${190 + (i % 3) * 40} />`)}
        ${[[440, 600, 150, 90], [620, 596, 120, 76], [1000, 600, 170, 96], [1150, 598, 110, 70]].map(([x, y, w, h], i) => html`<g key=${i}><rect x=${x} y=${y - h} width=${w} height=${h} fill=${["#b08a5c", "#a8845a", "#bb956a", "#a07a50"][i]} /><rect x=${x - 4} y=${y - h - 8} width=${w + 8} height="10" fill="#6a4a30" /><rect x=${x + w / 2 - 12} y=${y - 44} width="24" height="44" fill="#4a3424" /></g>`)}`}
    </g>`;
    if (kind === "mirbad") return html`<g>
      <rect width=${W} height=${H} fill="url(#g-siang)" />
      ${[[90, 520], [240, 500], [1380, 505], [1530, 520], [700, 470], [960, 480]].map(([x, y], i) => html`<${Palm} key=${i} x=${x} y=${y} h=${200 + (i % 3) * 30} />`)}
      <path d="M0 560 L1600 560 L1600 900 L0 900Z" fill="#d6be90" />
      <rect x="0" y="520" width="1600" height="50" fill="#a8845a" /><rect x="0" y="512" width="1600" height="10" fill="#8a6a46" />
      <g transform="translate(1180 520)"><rect x="0" y="-260" width="330" height="260" fill="#b8926a" /><rect x="0" y="-136" width="330" height="10" fill="#6a4a30" /><rect x="-6" y="-270" width="342" height="12" fill="#6a4a30" />
        <rect x="140" y="-90" width="46" height="90" fill="#4a3424" /><rect x="60" y="-220" width="40" height="40" fill="#4a3424" /><rect x="230" y="-220" width="40" height="40" fill="#4a3424" /></g>
      ${[[260, 700], [520, 740], [820, 690], [600, 820], [300, 830]].map(([x, y], i) => html`<g key=${i}><ellipse cx=${x} cy=${y} rx="130" ry="34" fill="#a8864a" />${Array.from({ length: 18 }, (_, k) => html`<circle key=${k} cx=${x - 100 + ((k * 37) % 200)} cy=${y - 18 + ((k * 23) % 36)} r="7" fill=${k % 3 ? "#5a2e1a" : "#7a3e22"} />`)}</g>`)}
    </g>`;
    if (kind === "rumah-abuayyub") return html`<g>
      <rect width=${W} height=${H} fill="url(#g-malam)" /><${Stars} />
      <rect x="240" y="140" width="1120" height="720" fill="#6b5038" />
      <rect x="270" y="170" width="1060" height="320" fill="#8d6a48" /><rect x="270" y="530" width="1060" height="300" fill="#7a5c40" />
      <rect x="240" y="490" width="1120" height="40" fill="#4a3424" />${Array.from({ length: 14 }, (_, i) => html`<rect key=${i} x=${250 + i * 80} y="494" width="40" height="32" fill="#3a2a1e" />`)}
      <rect x="240" y="120" width="1120" height="30" fill="#4a3424" />
      <rect x="1360" y="160" width="40" height="700" fill="#5a4430" />${Array.from({ length: 9 }, (_, i) => html`<rect key=${i} x="1360" y=${820 - i * 80} width="90" height="14" fill="#6a5038" />`)}
      <${Lamp} x=${430} y=${700} />
      <text x="290" y="215" fill="#f2e6c8" opacity=".6" style=${{ font: "600 24px sans-serif" }}>Lantai atas</text>
      <text x="290" y="575" fill="#f2e6c8" opacity=".6" style=${{ font: "600 24px sans-serif" }}>Lantai bawah</text>
    </g>`;
    if (kind === "membangun-masjid") return html`<g>
      <rect width=${W} height=${H} fill="url(#g-siang)" />
      ${[[100, 470], [1500, 480], [1340, 450]].map(([x, y], i) => html`<${Palm} key=${i} x=${x} y=${y} h=${210} />`)}
      <path d="M0 560 L1600 560 L1600 900 L0 900Z" fill="#cdb48a" />
      ${[[260, 6], [420, 7], [580, 5], [740, 8], [900, 6], [1060, 4], [1220, 7]].map(([x, n], i) => html`<g key=${i}>${Array.from({ length: n }, (_, r) => html`<rect key=${r} x=${x + (r % 2) * 20} y=${560 - (r + 1) * 30} width="140" height="28" fill=${r % 2 ? "#a07a50" : "#b08a5c"} stroke="#7a5a38" stroke-width="2" />`)}</g>`)}
      ${[330, 650, 970, 1290].map((x, i) => html`<g key=${i}><rect x=${x} y="250" width="26" height="420" fill="#7a5a36" />${[0, 1, 2, 3, 4, 5, 6, 7].map((k) => html`<path key=${k} d=${`M${x} ${280 + k * 48} h26`} stroke="#5a4026" stroke-width="3" />`)}</g>`)}
      <g transform="translate(160 760)">${Array.from({ length: 12 }, (_, i) => html`<rect key=${i} x=${(i % 4) * 46} y=${-Math.floor(i / 4) * 24} width="44" height="22" fill="#a8845a" stroke="#7a5a38" stroke-width="2" />`)}</g>
      <g transform="translate(1300 800)" stroke="#5a7a3a" stroke-width="6" fill="none">${Array.from({ length: 7 }, (_, i) => html`<path key=${i} d=${`M${-120 + i * 30} 0 Q${-40 + i * 20} -60 ${80 + i * 14} -30`} />`)}</g>
    </g>`;
    // ---------- Hijrah ----------
    if (kind === "rumah-abubakar") return html`<g><${Interior} siang=${true} />
      <rect x="430" y="690" width="420" height="40" rx="6" fill="#7a4a3a" /><rect x="430" y="700" width="420" height="6" fill="#a8774a" opacity=".6" />
      <g transform="translate(1270 520)"><rect x="-120" y="0" width="240" height="12" fill="#3a2a1e" />${[-90, -30, 30, 90].map((x, i) => html`<g key=${i}><path d=${`M${x - 18} 0 Q${x - 22} -44 ${x} -52 Q${x + 22} -44 ${x + 18} 0 Z`} fill=${["#a8774a", "#8a6440", "#b08454", "#9a6a44"][i]} /></g>`)}</g></g>`;
    if (kind === "gua-tsur" || kind === "gua-tsur-malam") return html`<g>
      <rect width=${W} height=${H} fill=${kind === "gua-tsur" ? "url(#g-siang)" : "url(#g-malam)"} />${kind === "gua-tsur-malam" && html`<${Stars} />`}
      <path d="M0 470 L180 420 L380 370 Q560 330 800 316 Q1040 330 1220 372 L1420 420 L1600 470 L1600 900 L0 900 Z" fill="#4a382b" />
      <path d="M0 470 L180 420 L380 370 Q560 330 800 316 Q1040 330 1220 372 L1420 420 L1600 470" fill="none" stroke="#7a604a" stroke-width="6" />
      ${[[260, 560, 90], [1340, 600, 110], [300, 800, 120], [1320, 820, 100], [640, 860, 90], [980, 870, 110]].map(([x, y, r], i) => html`<path key=${i} d=${`M${x - r} ${y} q${r / 2} -${r / 4} ${r} -${r / 8} t${r} ${r / 9}`} fill="none" stroke="#3a2c22" stroke-width="5" />`)}
      <path d="M470 600 Q510 470 800 462 Q1090 470 1130 600 Q1150 730 1060 772 Q800 806 540 772 Q450 730 470 600 Z" fill="#1d1511" />
      <path d="M500 748 Q800 790 1100 748 L1090 772 Q800 806 510 772 Z" fill="#2c211a" />
      <path d="M470 640 L300 610 Q250 660 300 700 L480 704 Z" fill="#1d1511" />
      <path d="M796 462 L806 410 L794 352 L800 318" fill="none" stroke="#1d1511" stroke-width="7" stroke-linecap="round" />
      <text x="1540" y="880" text-anchor="end" fill="#e8dcc0" opacity=".55" style=${{ font: "500 20px sans-serif" }}>Potongan melintang, ilustrasi</text>
    </g>`;
    if (kind === "gua-tsur-luar" || kind === "gua-tsur-kisah" || kind === "gua-tsur-pasti") {
      const malam = kind === "gua-tsur-luar", kisah = kind === "gua-tsur-kisah";
      return html`<g>
        <rect width=${W} height=${H} fill=${malam ? "url(#g-malam)" : "url(#g-siang)"} />${malam && html`<${Stars} /><${Moon} x=${300} y=${140} />`}
        <path d="M0 900 L0 760 L420 640 L780 470 L1060 330 L1300 250 L1600 210 L1600 900 Z" fill=${malam ? "#231d2b" : "#6b5242"} />
        <path d="M0 760 L420 640 L780 470 L1060 330 L1300 250 L1600 210" fill="none" stroke=${malam ? "#3f3442" : "#8a6a52"} stroke-width="6" />
        ${[[1180, 300, 70], [1300, 268, 56], [1250, 230, 60]].map(([x, y, r], i) => html`<ellipse key=${i} cx=${x} cy=${y} rx=${r} ry=${r * 0.72} fill=${malam ? "#2e2632" : "#5a4436"} />`)}
        <ellipse cx="1210" cy="316" rx="56" ry="30" fill="#07060c" />
        ${!malam && !kisah && html`<ellipse cx="1210" cy="316" rx="120" ry="80" fill="url(#g-halo)" opacity=".7" />`}
        <polyline points="120,860 330,760 300,700 560,620 520,560 780,500 760,440 1000,380 1150,330" fill="none" stroke=${malam ? "#5a4a52" : "#a08468"} stroke-width="3" stroke-dasharray="8 10" />
        ${kisah && html`<g stroke="#f3efe6" stroke-width="1.6" fill="none" opacity=".9">
          ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => html`<path key=${i} d=${`M1210 316 L${1210 + Math.cos(i * 0.785) * 60} ${316 + Math.sin(i * 0.785) * 34}`} />`)}
          ${[18, 34, 50].map((r) => html`<ellipse key=${r} cx="1210" cy="316" rx=${r} ry=${r * 0.56} />`)}</g>
          <g fill="#e8e4dc">${[[1120, 268], [1150, 262]].map(([x, y], i) => html`<g key=${i} transform=${`translate(${x} ${y})`}><ellipse rx="16" ry="10" /><circle cx="13" cy="-7" r="6" /><path d="M-14 -2 L-26 -10 L-22 2 Z" /></g>`)}</g>`}
        <g transform="translate(70 70)"><rect width=${kisah ? 470 : 520} height="58" rx="12" fill="#0b1430" opacity=".82" />
          <text x="22" y="38" fill=${kisah ? "#f0b08a" : "#f2d27a"} style=${{ font: "600 26px sans-serif" }}>${malam ? "Lereng Jabal Tsur, malam hari" : kisah ? "Kisah masyhur · riwayat lemah" : "Yang pasti: QS. At-Taubah: 40"}</text></g>
      </g>`;
    }
    if (kind === "kaki-tsur") return html`<g>
      <rect width=${W} height=${H} fill="url(#g-fajar)" /><circle cx="300" cy="820" r="380" fill="url(#g-matahari)" class="pl-dawn" />
      <path d="M560 900 L900 420 L1080 260 L1180 230 L1300 300 L1600 520 L1600 900 Z" fill="#3a2c34" />
      <path d="M0 720 Q400 660 800 690 T1600 680 L1600 900 L0 900Z" fill="#6a5040" />
      <polyline points="1160,260 1080,360 1120,420 980,520 1020,580 860,700" fill="none" stroke="#7a6470" stroke-width="3" stroke-dasharray="8 10" />
    </g>`;
    if (kind === "pesisir") return html`<g>
      <rect width=${W} height=${H} fill="url(#g-siang)" />
      <rect x="0" y="470" width=${W} height="46" fill="#5d8fa8" /><rect x="0" y="470" width=${W} height="6" fill="#9cc3dc" opacity=".6" />
      <path d="M0 520 Q300 500 600 516 T1200 506 T1600 518 L1600 900 L0 900Z" fill="#d8bd8c" />
      <path d="M0 640 Q400 600 800 630 T1600 620 L1600 900 L0 900Z" fill="#cfae7c" />
      ${Array.from({ length: 16 }, (_, i) => html`<ellipse key=${i} cx=${60 + i * 100} cy=${680 + (i % 4) * 46} rx=${14 + (i % 3) * 6} ry="6" fill="#a8885e" />`)}
    </g>`;
    if (kind === "batu-naungan") return html`<g>
      <rect width=${W} height=${H} fill="url(#g-siang)" />
      <path d="M0 600 Q400 560 800 590 T1600 580 L1600 900 L0 900Z" fill="#d6b88a" />
      <path d="M140 720 L200 470 L320 380 L520 360 L660 420 L720 560 L700 720 Z" fill="#8a6a52" />
      <path d="M200 470 L320 380 L520 360 L660 420" fill="none" stroke="#a8866a" stroke-width="8" />
      <path d="M700 720 L1040 740 L980 790 L620 780 Z" fill="#000" opacity=".16" />
    </g>`;
    if (kind === "kemah-badui") return html`<g>
      <rect width=${W} height=${H} fill="url(#g-siang)" />
      <path d="M0 600 Q300 570 600 590 T1200 580 T1600 592 L1600 900 L0 900Z" fill="#c8a678" />
      <g transform="translate(1180 600)">
        <path d="M-300 0 L-260 -200 L-60 -240 L160 -230 L300 0 Z" fill="#3a2c24" /><path d="M-260 -200 L-60 -240 L160 -230" fill="none" stroke="#5a4636" stroke-width="6" />
        <path d="M-160 0 L-150 -150 L40 -150 L50 0 Z" fill="#1e1612" />
        ${[-260, -60, 160].map((x, i) => html`<rect key=${i} x=${x - 4} y=${i === 1 ? -244 : -220} width="8" height=${i === 1 ? 244 : 220} fill="#6a4a30" />`)}
        <path d="M-260 -200 L-360 0 M160 -230 L360 0" stroke="#6a5a48" stroke-width="3" />
      </g>
      ${[[180, 640], [420, 700], [560, 650]].map(([x, y], i) => html`<g key=${i} stroke="#7a6040" stroke-width="3" fill="none"><path d=${`M${x} ${y} l-14 -30 M${x} ${y} l10 -36 M${x} ${y} l24 -20`} /></g>`)}
    </g>`;
    if (kind === "rumah-madinah") return html`<g><${Interior} alt=${true} siang=${true} />
      <ellipse cx="1220" cy="700" rx="90" ry="26" fill="#6a4a3a" /><ellipse cx="420" cy="700" rx="80" ry="24" fill="#5a4a3a" /></g>`;
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
      <circle r="130" fill="url(#g-halo)" class=${`pl-halo${speaking ? " on" : ""}`} opacity=${r.state === "payah" || r.state === "sakit" ? 0.5 : 1} />
      ${r.state === "berselimut" && html`<g class="pl-cloth">
        <path d="M-150 -6 Q-168 70 -132 128 L132 128 Q168 70 150 -6 Q0 -40 -150 -6Z" fill="#7a5a3a" stroke="#5a4028" stroke-width="4" />
        <path d="M-90 4 Q-96 70 -80 120 M0 -6 Q-6 64 6 124 M90 4 Q98 70 84 120" stroke="#5a4028" stroke-width="3" fill="none" opacity=".7" /></g>`}
      <g class=${`pl-name${r.state === "gemetar" || r.state === "payah" ? " shake" : ""}`}>
        <text y="-22" text-anchor="middle" class="pl-r-ar">رسول الله ﷺ</text>
        <text y="26" text-anchor="middle" class="pl-r-id">Rasulullah ﷺ</text>
      </g>
    </g>`;
  }

  // ---------- Para nabi dan nama lain: hanya tulisan bercahaya ----------
  function Label({ l }) {
    return html`<g style=${{ transform: `translate(${l.x}px, ${l.y}px)`, transition: "transform 1.4s ease" }} class="pl-scene">
      <circle r="110" fill="url(#g-halo)" opacity=".55" />
      ${l.ar && html`<text y="-10" text-anchor="middle" class="pl-r-ar" style=${{ fontSize: "40px" }}>${l.ar}</text>`}
      <text y="30" text-anchor="middle" class="pl-r-id" style=${{ fontSize: "24px" }}>${l.id}</text>
      ${l.ket && html`<text y="62" text-anchor="middle" class="pl-r-id" style=${{ fontSize: "18px", opacity: 0.75 }}>${l.ket}</text>`}
    </g>`;
  }

  // ---------- Jibril: cahaya dengan nama ----------
  function Jibril({ j }) {
    if (!j) return null;
    const p = j.power || 0;
    return html`<g style=${{ transform: `translate(${j.x}px, ${j.y}px)`, opacity: p > 0 ? 1 : 0, transition: "transform 1.3s ease, opacity 1.2s ease" }}>
      <circle r=${150 + p * 230} fill="url(#g-jibril)" style=${{ transition: "r 1.2s ease" }} class="pl-jlight" />
      <g class="pl-rays" opacity=${0.25 + p * 0.45}>${Array.from({ length: 16 }, (_, i) => html`<rect key=${i} x="-3" y=${-(190 + p * 200)} width="6" height=${90 + p * 80} rx="3" fill="#fff3c4" transform=${`rotate(${i * 22.5})`} />`)}</g>
      <text y="-12" text-anchor="middle" class="pl-j-ar">${j.ar || "جبريل"}</text>
      <text y="30" text-anchor="middle" class="pl-j-id">${j.nama || "Jibril"}</text>
    </g>`;
  }

  // ---------- Karakter chibi: wajah hanya mata dan mulut ----------
  const EXPR = {
    netral: { eye: "dot", mouth: "line" }, senyum: { eye: "happy", mouth: "smile" }, lembut: { eye: "closed", mouth: "smile" },
    khawatir: { eye: "dot", mouth: "wavy" }, kaget: { eye: "wide", mouth: "o" }, sedih: { eye: "sad", mouth: "frown" },
    tegas: { eye: "dot", mouth: "short" }, kagum: { eye: "happy", mouth: "o" }, sinis: { eye: "half", mouth: "smirk" }
  };
  function Eye({ kind, x }) {
    const st = { fill: "none", stroke: "#2a1d16", "stroke-width": 3.4, "stroke-linecap": "round" };
    if (kind === "dot") return html`<g class="pl-blink" style=${{ transformOrigin: `${x}px -30px` }}><circle cx=${x} cy="-30" r="3.6" fill="#2a1d16" /></g>`;
    if (kind === "wide") return html`<circle cx=${x} cy="-31" r="4.8" fill="#2a1d16" />`;
    if (kind === "happy") return html`<path d=${`M${x - 6} -28 Q${x} -37 ${x + 6} -28`} ...${st} />`;
    if (kind === "half") return html`<path d=${`M${x - 6} -30 H${x + 6}`} ...${st} />`;
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
    if (kind === "smirk") return html`<path d="M-6 -13 Q2 -13 7 -18" ...${st} />`;
    return null;
  }
  function Chibi({ id, c, talk }) {
    if (!c) return null;
    const ex = EXPR[c.expr] || EXPR.netral;
    const blind = id === "waraqah" || id === "ibnuummimaktum" || !!(window.SirahBlind || {})[id], m = (window.SirahMale || {})[id] || ["#6a5440", "#efe8d8", "#f2efe6"];
    const eye = blind ? (c.expr === "sedih" ? "sad" : c.expr === "kagum" || c.expr === "senyum" ? "happy" : "closed") : ex.eye;
    const s = (id === "waraqah" ? 1.9 : 2) * (c.s || 1);
    return html`<g style=${{ transform: `translate(${c.x}px, ${c.y}px) scale(${s})`, opacity: c.on === false ? 0 : 1, transition: "transform 1.4s ease, opacity 1.6s ease" }}>
      <ellipse cx="0" cy="96" rx="50" ry="9" fill="#000" opacity=".22" />
      <g class="pl-bob">
        ${(window.SirahFem || {})[id] ? html`<g>
          <path d="M-50 94 Q-54 22 -30 4 L30 4 Q54 22 50 94 Z" fill=${window.SirahFem[id][0]} />
          <path d="M-48 -30 Q-48 -84 0 -84 Q48 -84 48 -30 L54 36 Q0 50 -54 36 Z" fill=${window.SirahFem[id][1]} />
          <ellipse cx="0" cy="-26" rx="28" ry="30" fill="#e8c9a6" />
          <path d="M-31 -40 Q0 -66 31 -40" fill="none" stroke="#2f3b4a" stroke-width="6" stroke-linecap="round" />
        </g>` : html`<g>
          <path d="M-50 94 Q-54 24 -30 6 L30 6 Q54 24 50 94 Z" fill=${m[0]} />
          <path d="M-14 6 L0 40 L14 6" fill="#e9e2d2" />
          <ellipse cx="0" cy="-26" rx="29" ry="30" fill="#e2c09a" />
          <path d="M-27 -16 Q-30 22 0 32 Q30 22 27 -16 Q16 -4 0 -4 Q-16 -4 -27 -16Z" fill=${m[2]} />
          <path d="M-33 -36 Q-34 -72 0 -72 Q34 -72 33 -36 Q16 -48 0 -48 Q-16 -48 -33 -36Z" fill=${m[1]} />
          <path d="M-33 -36 L-38 -8" stroke=${m[1]} stroke-width="7" stroke-linecap="round" /><path d="M33 -36 L38 -8" stroke=${m[1]} stroke-width="7" stroke-linecap="round" />
          ${blind && html`<path d="M40 30 L58 94" stroke="#5a3e28" stroke-width="5" stroke-linecap="round" />`}
        </g>`}
        <${Eye} kind=${eye} x=${-11} /><${Eye} kind=${eye} x=${11} />
        <g transform=${id === "waraqah" ? "translate(0 4)" : ""}><${Mouth} kind=${ex.mouth} talk=${talk} /></g>
      </g>
    </g>`;
  }

  // ---------- Properti panggung: hewan dan benda (tanpa manusia) ----------
  // { id, kind, x, y, s, flip, on, ... }; y = garis tanah. Posisi berubah dengan transisi agar tampak bergerak.
  function PropShape({ p }) {
    const k = p.kind;
    if (k === "unta") {
      const c = p.warna || "#a87d4f", d = "#8a6440";
      if (p.duduk) return html`<g><ellipse cx="0" cy="0" rx="110" ry="12" fill="#000" opacity=".18" />
        <path d="M-100 -2 Q-110 -60 -50 -70 Q-15 -118 20 -72 Q60 -64 92 -44 Q104 -30 96 -2 Z" fill=${c} />
        <path d="M88 -40 Q118 -84 120 -124 L140 -130 Q156 -124 150 -112 L132 -106 Q128 -62 100 -16 Z" fill=${c} /><circle cx="140" cy="-121" r="2.6" fill="#2a1d16" /></g>`;
      return html`<g><ellipse cx="0" cy="0" rx="110" ry="12" fill="#000" opacity=".18" />
        ${[-66, -44, 44, 66].map((x, i) => html`<path key=${i} d=${`M${x - 6} -96 L${x - 5} 0 L${x + 6} 0 L${x + 6} -96 Z`} fill=${i % 2 ? c : d} />`)}
        <path d="M-92 -92 Q-100 -140 -52 -150 Q-18 -204 16 -152 Q48 -142 84 -122 Q98 -110 92 -88 Q0 -76 -92 -92 Z" fill=${c} />
        <path d="M82 -116 Q114 -156 118 -196 L138 -202 Q154 -196 148 -184 L130 -178 Q124 -134 96 -96 Z" fill=${c} /><circle cx="138" cy="-193" r="2.6" fill="#2a1d16" />
        ${p.pelana && html`<path d="M-40 -158 Q-14 -186 16 -160 L22 -130 L-46 -130 Z" fill=${p.pelana} />`}</g>`;
    }
    if (k === "kuda") {
      const c = p.warna || "#6a4a32";
      return html`<g><ellipse cx="0" cy="0" rx="100" ry="11" fill="#000" opacity=".2" />
        ${[-56, -36, 40, 60].map((x, i) => html`<path key=${i} d=${`M${x - 5} -78 L${x - 4} 0 L${x + 5} 0 L${x + 5} -78 Z`} fill=${c} />`)}
        <path d="M-74 -78 Q-84 -124 -40 -128 L56 -130 Q84 -126 84 -96 Q80 -76 60 -74 Z" fill=${c} />
        <path d="M70 -118 Q96 -150 104 -184 L126 -186 Q136 -176 126 -164 Q118 -136 92 -96 Z" fill=${c} /><circle cx="118" cy="-176" r="2.6" fill="#140d08" />
        <path d="M72 -124 Q90 -160 100 -186" fill="none" stroke="#2e2016" stroke-width="8" stroke-linecap="round" />
        <path d="M-74 -110 Q-110 -96 -104 -50" fill="none" stroke="#2e2016" stroke-width="9" stroke-linecap="round" />
        ${p.terbenam && html`<g><path d="M-140 4 Q-90 -64 0 -58 Q90 -64 140 4 Z" fill="#cfae7c" /><path d="M-140 4 Q-90 -64 0 -58 Q90 -64 140 4" fill="none" stroke="#b8956a" stroke-width="4" />
          ${[[-90, -110, 50], [-20, -140, 64], [60, -118, 52], [120, -150, 40], [-140, -150, 36]].map(([x, y, r], i) => html`<circle key=${i} cx=${x} cy=${y} r=${r} fill="#e2cfa8" opacity=".55" class="pl-dust" />`)}</g>`}</g>`;
    }
    if (k === "domba") return html`<g>${Array.from({ length: p.n || 5 }, (_, i) => { const x = (i % 3) * 70 - 70 + (i > 2 ? 34 : 0), y = i > 2 ? 26 : 0;
      return html`<g key=${i} transform=${`translate(${x} ${y})`}><ellipse cx="0" cy="2" rx="34" ry="6" fill="#000" opacity=".18" />
        <rect x="-18" y="-22" width="6" height="22" fill="#3a2e26" /><rect x="12" y="-22" width="6" height="22" fill="#3a2e26" />
        <g fill=${p.warna || "#e8e0cc"}><circle cx="-14" cy="-34" r="16" /><circle cx="6" cy="-38" r="18" /><circle cx="22" cy="-30" r="14" /><circle cx="-2" cy="-26" r="15" /></g>
        <ellipse cx="38" cy="-36" rx="10" ry="8" fill="#3a2e26" /></g>`; })}</g>`;
    if (k === "kambing") return html`<g><ellipse cx="0" cy="2" rx="46" ry="7" fill="#000" opacity=".18" />
      ${[-26, -14, 18, 30].map((x, i) => html`<rect key=${i} x=${x - 3} y="-42" width="6" height="42" fill="#5a4636" />`)}
      <path d="M-36 -42 Q-40 -70 -10 -72 L26 -72 Q44 -68 42 -42 Z" fill=${p.warna || "#8a7a68"} />
      <path d="M36 -66 Q48 -84 58 -88 Q68 -84 64 -74 Q56 -64 44 -56 Z" fill=${p.warna || "#8a7a68"} /><path d="M52 -88 Q48 -104 40 -108" fill="none" stroke="#4a3a2a" stroke-width="4" stroke-linecap="round" />
      ${p.kurus && html`<g stroke="#5a4a3a" stroke-width="2.4" fill="none" opacity=".8"><path d="M-14 -66 q-4 10 0 20 M-4 -66 q-4 10 0 20 M6 -66 q-4 10 0 20" /></g>`}</g>`;
    if (k === "bejana") return html`<g><ellipse cx="0" cy="2" rx="40" ry="7" fill="#000" opacity=".2" />
      <path d="M-38 -44 Q-40 0 0 2 Q40 0 38 -44 Z" fill="#8a5a36" /><ellipse cx="0" cy="-44" rx="38" ry="10" fill="#6a4228" />
      <ellipse cx="0" cy=${-44 + 10 * (1 - (p.isi || 0))} rx=${34 * (0.7 + 0.3 * (p.isi || 0))} ry="7" fill="#f6f1e4" opacity=${p.isi ? 1 : 0} style=${{ transition: "all 1.6s ease" }} /></g>`;
    if (k === "bekal") return html`<g><ellipse cx="0" cy="2" rx="80" ry="8" fill="#000" opacity=".2" />
      <path d="M-74 0 Q-84 -60 -50 -76 L-20 -76 Q8 -60 -2 0 Z" fill="#8a6440" /><path d="M20 0 Q14 -54 40 -70 Q70 -70 78 -40 Q82 -10 70 0 Z" fill="#6a4a30" />
      ${p.ikat && html`<g><path d="M-58 -80 Q-36 -92 -14 -80" fill="none" stroke="#b0405a" stroke-width="8" stroke-linecap="round" /><path d="M36 -74 Q52 -84 68 -70" fill="none" stroke="#b0405a" stroke-width="8" stroke-linecap="round" /></g>`}</g>`;
    if (k === "sabuk") return p.belah
      ? html`<g><path d="M-120 -8 Q-60 -18 0 -8" fill="none" stroke="#b0405a" stroke-width="10" stroke-linecap="round" /><path d="M24 4 Q84 -6 140 4" fill="none" stroke="#b0405a" stroke-width="10" stroke-linecap="round" /></g>`
      : html`<path d="M-120 -4 Q0 -20 140 -4" fill="none" stroke="#b0405a" stroke-width="10" stroke-linecap="round" />`;
    if (k === "surat") return html`<g transform="rotate(-6)"><path d="M-60 -40 Q-66 0 -58 40 L58 44 Q66 0 60 -42 Z" fill="#c8a070" stroke="#8a6440" stroke-width="3" />
      ${[-22, -8, 6, 20].map((y) => html`<path key=${y} d=${`M-40 ${y} H${y === 20 ? 10 : 40}`} stroke="#4a3020" stroke-width="3" stroke-linecap="round" />`)}</g>`;
    if (k === "jejak") return html`<g opacity=${p.hapus ? 0.12 : 0.85} style=${{ transition: "opacity 2.4s ease" }}>${Array.from({ length: p.n || 8 }, (_, i) => html`<ellipse key=${i} cx=${i * 46} cy=${i % 2 ? -10 : 8} rx="11" ry="6" fill=${p.warna || "#1a1410"} transform=${`rotate(${p.ang || 0} ${i * 46} 0)`} />`)}</g>`;
    if (k === "tikar") return html`<g><path d="M-120 0 L-90 -30 L120 -30 L150 0 Z" fill="#a8864a" />${[-60, 0, 60].map((x) => html`<path key=${x} d=${`M${x - 20} 0 L${x + 10} -30`} stroke="#7a5a30" stroke-width="4" />`)}</g>`;
    if (k === "bata") return html`<g>${Array.from({ length: p.n || 1 }, (_, i) => html`<rect key=${i} x="-30" y=${-24 - i * 24} width="60" height="22" fill="#a8845a" stroke="#7a5a38" stroke-width="2" />`)}</g>`;
    if (k === "selendang") return html`<path d="M-120 0 Q-60 -40 0 -30 Q60 -40 120 0 Q60 -14 0 -8 Q-60 -14 -120 0 Z" fill=${p.warna || "#e8dcc0"} stroke="#b8a888" stroke-width="2" />`;
    if (k === "lencana") return html`<g><rect x=${-(p.w || 300) / 2} y="-30" width=${p.w || 300} height="52" rx="12" fill="#0b1430" opacity=".86" stroke=${p.warna || "#f0b08a"} stroke-width="2" />
      <text x="0" y="5" text-anchor="middle" fill=${p.warna || "#f0b08a"} style=${{ font: "600 24px sans-serif" }}>${p.teks}</text></g>`;
    return null;
  }
  function Prop({ p }) {
    const s = p.s || 1;
    return html`<g style=${{ transform: `translate(${p.x}px, ${p.y}px) scale(${p.flip ? -s : s}, ${s})`, opacity: p.on === false ? 0 : 1, transition: `transform ${p.dur || 1.4}s ease, opacity 1.2s ease` }}><${PropShape} p=${p} /></g>`;
  }

  // ---------- Pemutar ----------
  function anchorOf(st, who) {
    if (who === "rasul" && st.rasul) return { x: st.rasul.x, y: st.rasul.y - (st.rasul.small ? 70 : 120) };
    if (who === "jibril" && st.jibril) return { x: st.jibril.x, y: st.jibril.y - 130 };
    if (who === "wahyu" || who === "quran") return { x: st.rasul ? st.rasul.x : 800, y: 250 };
    const c = st.chars[who]; if (c) return { x: c.x, y: c.y - 190 };
    return { x: 800, y: 200 };
  }
  const NAMA = { rasul: "Rasulullah ﷺ", jibril: "Jibril", wahyu: "Wahyu turun", quran: "Diabadikan dalam Al-Qur'an" };

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
              ${(st.props || []).filter((p) => !p.depan).map((p, i) => html`<${Prop} key=${p.id || i} p=${p} />`)}
              ${Object.entries(st.chars || {}).map(([cid, c]) => html`<${Chibi} key=${cid} id=${cid} c=${c} talk=${talk && who === cid} />`)}
              ${(st.props || []).filter((p) => p.depan).map((p, i) => html`<${Prop} key=${p.id || "d" + i} p=${p} />`)}
              ${(st.labels || []).map((l) => html`<${Label} key=${l.id} l=${l} />`)}
              <${Rasul} r=${st.rasul} speaking=${who === "rasul"} />
              <${Jibril} j=${st.jibril} />
            </g>
          </g>
          ${flash && html`<g class="pl-flash" key=${"f" + idx}><rect width=${W} height=${H} fill="#fff8e0" /></g>`}
        </svg>
        ${anchor && show && html`<div class="pl-bubble-wrap" style=${{ left: anchor.x + bx + "px", top: anchor.y + by + "px" }}>
          <div ref=${bubRef} class=${`pl-bubble${who === "jibril" || who === "wahyu" || who === "quran" ? " light" : who === "rasul" ? " rasul" : ""}${tail ? "" : " notail"}`} key=${idx}>
            <p class="pl-who">${NAMA[who] || tokoh[who].nama}${say.ayat ? html` <span>${say.ayat}</span>` : ""}</p>
            ${say.arab && html`<p class="pl-ar" lang="ar" dir="rtl">${say.arab}</p>`}
            <p class="pl-txt">${shown}<span class="pl-caret">${caret}</span></p>
          </div>
        </div>`}
        <p class="in-label">${st.label || { "hira-dalam": "Di dalam Gua Hira", "rumah-khadijah": "Di dalam rumah Khadijah", "rumah-khadijah-siang": "Di dalam rumah Khadijah", "baitul-maqdis": "Baitul Maqdis (rekonstruksi, abad ke-7)", "langit": "Mi'raj", "masjid-madinah": "Masjid di Madinah", "badar": "Lembah Badar", "uhud": "Gunung Uhud", "khandaq": "Parit (Khandaq), utara Madinah", "padang-malam": "Perjalanan malam", "padang-siang": "Di perjalanan", "rumah-madinah": "Sebuah rumah di Madinah", "rumah-waraqah": "Di rumah Waraqah bin Naufal",
          "rumah-abubakar": "Di dalam rumah Abu Bakar (rekonstruksi)", "gua-tsur": "Gua Tsur", "gua-tsur-malam": "Gua Tsur, malam hari", "gua-tsur-luar": "Di luar Gua Tsur", "gua-tsur-kisah": "Mulut Gua Tsur", "gua-tsur-pasti": "Mulut Gua Tsur",
          "quba": "Quba, perkampungan Bani Amr bin Auf", "harrah": "Tepi harrah di selatan Madinah", "mirbad": "Mirbad milik Sahl dan Suhail", "rumah-abuayyub": "Rumah Abu Ayyub (potongan, ilustrasi)", "membangun-masjid": "Membangun masjid (rekonstruksi)",
          "kaki-tsur": "Kaki Jabal Tsur", "pesisir": "Jalan pantai menuju Madinah", "batu-naungan": "Naungan batu di tengah perjalanan", "kemah-badui": "Kemah di padang" }[st.scene] || ""}</p>
      </div>
    </div>`;
  }
  window.SirahInterior = SirahInterior;
})();
