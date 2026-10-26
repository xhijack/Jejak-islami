(function () {
  const { useState, useEffect, useRef, useMemo } = React;
  const html = htm.bind(React.createElement);
  const D = window.SIRAH;
  const Y0 = 570, Y1 = 661;
  const EVENT_YEARS = [...new Set([...D.peristiwa.map((e) => e.tahun), ...(window.PERANG ? window.PERANG.daftar.map((p) => p.tahun) : [])])].sort((a, b) => a - b);
  const perangDi = (lok, y) => (window.PERANG ? window.PERANG.daftar.filter((p) => (!lok || p.lokPeta === lok) && (y == null || p.tahun === y)).sort((a, b) => a.urutWaktu - b.urutWaktu) : []);

  const eraFor = (y) => D.eras.find((e) => y + 0.4 >= e.dari && y + 0.4 < e.sampai) || D.eras[D.eras.length - 1];
  function hijri(y) {
    if (y < 622) return `${622 - y} tahun sebelum Hijrah`;
    const a = Math.floor((y - 622.54) * 1.0307) + 1, b = Math.floor((y + 1 - 622.54) * 1.0307) + 1;
    const lo = Math.max(1, a);
    return lo === b ? `${b} H` : `${lo}–${b} H`;
  }
  const alive = (t, y) => y >= t.lahir && y <= t.wafat;
  const tahunTokoh = (t) => `${t.kira ? "±" : ""}${t.lahir} – ${t.wafat} M`;

  // ---------- Medali nama (tanpa wajah) ----------
  function Medal({ id, size = "md", onClick, title }) {
    const t = D.tokoh[id];
    const cls = `medal medal-${size}${id === "nabi" ? " medal-nabi" : ""}`;
    const inner = html`<span class="medal-ar" lang="ar" dir="rtl">${t.arab}</span>`;
    if (!onClick) return html`<span class=${cls} aria-hidden="true">${inner}</span>`;
    return html`<button type="button" class=${cls} title=${title || t.nama} aria-label=${"Profil " + t.nama}
      onClick=${(e) => { e.stopPropagation(); onClick(id); }}>${inner}</button>`;
  }

  window.SirahMedal = Medal;

  // ---------- Ikon fungsi tempat (garis 16×16, warna mengikuti teks) ----------
  const IKON = {
    kabah: ["M4 5.5h8v8H4z", "M4 8.3h8", 1],
    masjid: ["M3 14h10M4.5 14V9a3.5 3.5 0 0 1 7 0v5M8 5.5V4M7 14v-2.5a1 1 0 0 1 2 0V14"],
    kubah: ["M2.5 14h11M3.5 14v-3.5h9V14M4.5 10.5a3.5 3.5 0 0 1 7 0M8 7V5.5"],
    pedang: ["M3 3l8.5 8.5M13 3l-8.5 8.5M10 13l3-3M3 10l3 3"],
    benteng: ["M4 14V6.5h8V14M3.5 6.5V3.5h2v1.5h1.5V3.5h2v1.5h1.5V3.5h2v3M7 14v-2.5h2V14"],
    kota: ["M2 14h12M3 14V8.5h3V14M6 14V5h4v9M10 14V9.5h3V14M7.5 7h1M7.5 9.5h1"],
    mahkota: ["M3 12.5h10L13.5 5l-3 2.5L8 3.5 5.5 7.5l-3-2.5zM3 14h10"],
    kemah: ["M1.5 13.5 8 3.5l6.5 10zM8 3.5v10M6 13.5 8 10.5l2 3"],
    kurma: ["M8 14V7.5M8 7.5C6.5 5.5 4.5 5 2.5 6M8 7.5c1.5-2 3.5-2.5 5.5-1.5M8 7.5C7.5 5 6 3.5 4 3M8 7.5C8.5 5 10 3.5 12 3M6 14h4"],
    gunung: ["M1.5 13.5 6 5.5l3 4.5 2-2.5 3.5 6z"],
    bukit: ["M1.5 13.5c2-4 4.3-6 6.5-6s4.5 2 6.5 6z"],
    rumah: ["M2.5 8 8 3.5 13.5 8M4 7v6.5h8V7M7 13.5v-3h2v3"],
    balai: ["M2 6h12L8 2.5zM3.5 6v7M6.5 6v7M9.5 6v7M12.5 6v7M2 13.5h12"],
    sumur: ["M3 4h10M5 4v3.5M11 4v3.5M8 4v4M3.5 8.5h9v5h-9zM3.5 11h9"],
    makam: ["M2 14h12M4 14V9.5a1.75 1.75 0 0 1 3.5 0V14M9 14v-3a1.5 1.5 0 0 1 3 0v3"],
    pasar: ["M2.5 3h11l1 3h-13zM3 6v7.5M13 6v7.5M2.5 13.5h11M6 13.5V10h4v3.5"],
    jalan: ["M5.5 14 7 2M10.5 14 9 2M8 3.5v1.5M8 7.25v1.5M8 11v1.5"],
    kampung: ["M1.5 9 4.5 6.5 7.5 9M2.5 8.5v5h4v-5M8 8l3.25-3 3.25 3M9 7.5v6h4.5v-6M1.5 13.5h13"],
    wadi: ["M1.5 6c2-1.5 3.5-1.5 5 0s3 1.5 5 0 2.5-1 3-1M1.5 10c2-1.5 3.5-1.5 5 0s3 1.5 5 0 2.5-1 3-1"],
    batu: ["M1.5 13.5 3 10l2.5-1 1.5 2 2-3.5 2.5 1 1.5 2.5 1.5 2.5z", null, 1],
    gua: ["M1.5 13.5c1.5-6 4-9 6.5-9s5 3 6.5 9zM6 13.5c0-2 .9-3.5 2-3.5s2 1.5 2 3.5"],
    parit: ["M1.5 6h4v4.5h5V6h4M1.5 13h13"],
    titik: ["M8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z", null, 1]
  };
  const IKON_NAMA = { kabah: "Ka'bah", masjid: "Masjid", kubah: "Tempat suci", pedang: "Medan perang", benteng: "Benteng", kota: "Kota", mahkota: "Pusat kerajaan",
    kemah: "Ekspedisi tanpa pertempuran", kurma: "Oasis atau kebun kurma", gunung: "Gunung", bukit: "Bukit", rumah: "Rumah", balai: "Balai pertemuan", sumur: "Sumur",
    makam: "Pemakaman", pasar: "Pasar", jalan: "Jalan", kampung: "Kampung kabilah", wadi: "Wadi", batu: "Harrah (padang batu)", gua: "Gua", parit: "Parit", titik: "Titik penting" };
  function Ikon({ n, cls = "" }) {
    const d = IKON[n] || IKON.titik;
    return html`<svg class=${"ikon " + cls} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d=${d[0]} fill=${d[2] ? "currentColor" : "none"} fill-opacity=${d[2] ? (n === "titik" ? 1 : 0.28) : 0} />
      ${d[1] && html`<path d=${d[1]} stroke-width="2.2" />`}</svg>`;
  }
  // Ikon untuk tempat di peta kota, menurut jenis dan beberapa pengecualian
  const IKON_TEMPAT = { zamzam: "sumur", hira: "gua", "gua-tsur": "gua", nadwah: "balai", saqifah: "balai", mirbad: "kurma", musalla: "masjid", "tsaniyyah-wada": "bukit",
    khandaq: "parit", "kemah-ahzab": "kemah", syaikhain: "kemah", "harrah-waqim": "batu", "harrah-wabrah": "batu", qanat: "wadi", aqiq: "wadi", bathan: "wadi" };
  const IKON_JENIS = { kabah: "kabah", masjid: "masjid", rumah: "rumah", benteng: "benteng", sumur: "sumur", kebun: "kurma", makam: "makam", pasar: "pasar",
    gunung: "gunung", bukit: "bukit", jalan: "jalan", kawasan: "kampung", titik: "titik" };
  const ikonTempat = (p) => IKON_TEMPAT[p.id] || IKON_JENIS[p.jenis] || "titik";
  const ikonLokasi = (l) => l.ikon || { kabah: "kabah", kota: "kota", medan: "pedang", oasis: "kurma", gunung: "gunung" }[l.jenis] || "kota";
  window.SirahIkon = Ikon;

  // ---------- Ilustrasi lokasi ----------
  function Vignette({ jenis }) {
    const g = "var(--gold)";
    const ground = html`<path d="M0 92 Q60 80 120 88 T240 84 L240 120 L0 120 Z" fill="var(--sand-deep)" />`;
    const sky = html`<rect width="240" height="120" fill="var(--lapis-2)" /><circle cx="196" cy="26" r="9" fill="none" stroke=${g} stroke-width="1.5" /><circle cx="200" cy="23" r="8" fill="var(--lapis-2)" />`;
    const art = {
      kabah: html`<path d="M0 90 L40 52 L70 74 L104 40 L140 70 L180 46 L240 86 L240 120 L0 120Z" fill="var(--rock)" opacity=".7" />
        <path d="M96 96 L96 64 L132 58 L150 64 L150 96 Z" fill="#141414" stroke=${g} stroke-width="1" />
        <path d="M132 58 L132 90 L96 96" fill="none" stroke=${g} stroke-width=".6" opacity=".6" />
        <path d="M96 72 L132 67 L150 72" fill="none" stroke=${g} stroke-width="3" />`,
      oasis: html`${[50, 92, 150, 188].map((x, i) => html`<g key=${i} stroke=${g} fill="none" stroke-width="1.6">
          <path d=${`M${x} 92 Q${x + 3} 70 ${x} ${52 + i * 3}`} />
          <path d=${`M${x} ${52 + i * 3} q-16 0 -22 10 M${x} ${52 + i * 3} q16 0 22 10 M${x} ${52 + i * 3} q-8 -12 -20 -12 M${x} ${52 + i * 3} q8 -12 20 -12`} /></g>`)}
        <path d="M100 98 h44 v-14 a22 22 0 0 0 -44 0 Z" fill="var(--sand)" stroke=${g} stroke-width="1" />`,
      gunung: html`<path d="M0 96 L50 40 L84 70 L120 26 L168 78 L200 50 L240 92 L240 120 L0 120Z" fill="var(--rock)" stroke=${g} stroke-width="1" />
        <path d="M110 38 L120 26 L130 40" fill="none" stroke="var(--sand)" stroke-width="2" />`,
      medan: html`<path d="M0 96 Q50 76 110 92 T240 88" fill="none" stroke=${g} stroke-width="1" />
        <line x1="120" y1="94" x2="120" y2="40" stroke=${g} stroke-width="1.6" />
        <path d="M120 42 L152 50 L120 60 Z" fill=${g} opacity=".85" />
        <line x1="60" y1="98" x2="60" y2="70" stroke=${g} stroke-width="1" /><line x1="182" y1="96" x2="182" y2="66" stroke=${g} stroke-width="1" />`,
      kota: html`<path d="M30 96 V70 H210 V96" fill="var(--sand)" stroke=${g} stroke-width="1" />
        ${[40, 70, 160, 190].map((x, i) => html`<rect key=${i} x=${x} y="62" width="10" height="10" fill="var(--sand)" stroke=${g} stroke-width=".8" />`)}
        <path d="M96 70 a24 24 0 0 1 48 0 Z" fill="var(--sand-deep)" stroke=${g} stroke-width="1" />
        <line x1="120" y1="46" x2="120" y2="38" stroke=${g} stroke-width="1.4" />
        <rect x="112" y="80" width="16" height="16" rx="8" fill="var(--lapis-2)" />`
    }[jenis];
    return html`<svg class="vignette" viewBox="0 0 240 120" role="img" aria-label="Ilustrasi lokasi">${sky}${art}${ground}</svg>`;
  }


  // ---------- Kontrol peta (pojok kanan bawah) ----------
  function Popover({ label, icon, children, cls = "" }) {
    const [open, setOpen] = useState(false), ref = useRef(null);
    useEffect(() => {
      if (!open) return;
      const off = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
      const k = (e) => { if (e.key === "Escape") setOpen(false); };
      document.addEventListener("pointerdown", off); window.addEventListener("keydown", k);
      return () => { document.removeEventListener("pointerdown", off); window.removeEventListener("keydown", k); };
    }, [open]);
    return html`<div class=${`pop ${cls}`} ref=${ref}>
      <button type="button" class="tool" aria-expanded=${open} aria-label=${label} title=${label} onClick=${() => setOpen(!open)}>${icon}</button>
      ${open && html`<div class="pop-box" role="dialog" aria-label=${label}>${children}</div>`}
    </div>`;
  }
  function MapControls({ api, hold, zoomIn, zoomOut, onOverview, overviewLabel, help, legenda, children }) {
    return html`<div class="map-tools" role="toolbar" aria-label="Kontrol peta">
      ${children}
      <div class="tool-group panpad" aria-label="Geser peta">
        <button type="button" class="u" ...${hold("w")} aria-label="Geser ke atas">▲</button>
        <button type="button" class="l" ...${hold("a")} aria-label="Geser ke kiri">◀</button>
        <button type="button" class="r" ...${hold("d")} aria-label="Geser ke kanan">▶</button>
        <button type="button" class="d" ...${hold("s")} aria-label="Geser ke bawah">▼</button>
      </div>
      <div class="tool-group">
        <button type="button" class="tool" onClick=${() => api.current.zoom(zoomIn)} aria-label="Perbesar" title="Perbesar">+</button>
        <button type="button" class="tool" onClick=${() => api.current.zoom(zoomOut)} aria-label="Perkecil" title="Perkecil">−</button>
      </div>
      <div class="tool-group">
        <button type="button" class="tool" onClick=${() => api.current.rotate(-0.4)} aria-label="Putar kiri" title="Putar kiri">⟲</button>
        <button type="button" class="tool" onClick=${() => api.current.rotate(0.4)} aria-label="Putar kanan" title="Putar kanan">⟳</button>
      </div>
      <button type="button" class="tool wide" onClick=${onOverview}>${overviewLabel}</button>
      <${Popover} label="Cara menggerakkan peta" icon="?" cls="up">
        <ul class="help-list">${help.map(([k, v]) => html`<li key=${k}><b>${k}</b><span>${v}</span></li>`)}</ul>
        ${legenda && html`<p class="help-sub">Arti ikon</p><ul class="ikon-legend">${legenda.map((n) => html`<li key=${n}><${Ikon} n=${n} />${IKON_NAMA[n]}</li>`)}</ul>`}
      </${Popover}>
    </div>`;
  }
  const HELP_PETA = [["Seret", "geser peta"], ["Klik kanan atau Shift + seret", "putar dan miringkan"], ["Scroll atau cubit", "zoom ke arah kursor"], ["WASD atau panah", "geser"], ["Q / E", "putar"]];

  // ---------- Peta ----------
  function MapView({ year, sel, activeLoks, tokohAt, wargaAt, onSelect, onProfile, onOverview, rute, ruteHi, focusReq, ruteNama, jejak, jejakLok, jejakBar }) {
    const box = useRef(null), api = useRef(null), nodes = useRef({});
    const [buka, setBuka] = useState(null); // kota yang daftar warganya dibuka lewat tombol jumlah
    useEffect(() => { setBuka(jejak && jejakLok ? jejakLok : null); }, [year, jejak, jejakLok]);
    const reg = (id) => (n) => { if (n) nodes.current[id] = n; else delete nodes.current[id]; api.current && api.current.registerLabel(id, n); };
    const hold = (k) => ({
      onPointerDown: (e) => { e.preventDefault(); api.current.press(k, true); },
      onPointerUp: () => api.current.press(k, false), onPointerLeave: () => api.current.press(k, false), onPointerCancel: () => api.current.press(k, false)
    });
    useEffect(() => {
      api.current = window.SirahScene.create(box.current, { lokasi: D.lokasi });
      Object.entries(nodes.current).forEach(([id, n]) => api.current.registerLabel(id, n));
      api.current.setActive(activeLoks);
      if (sel) api.current.select(sel);
      return () => api.current.dispose();
    }, []);
    useEffect(() => { api.current && api.current.setActive(activeLoks); }, [activeLoks]);
    useEffect(() => { if (!api.current) return; sel ? api.current.select(sel) : focusReq ? null : api.current.overview(); }, [sel]);
    useEffect(() => { api.current && api.current.setRoute && api.current.setRoute(rute, ruteHi ? ruteHi.i : -1); }, [rute, ruteHi && ruteHi.i]);
    useEffect(() => { if (focusReq && api.current && api.current.focus) api.current.focus(focusReq.lon, focusReq.lat, focusReq.dist); }, [focusReq && focusReq.k]);

    return html`<section class=${`map${rute ? " rute-on" : ""}`} aria-label="Peta 3D">
      <div class="map-canvas" ref=${box}></div>
      <div class="map-labels">
        ${Object.entries(D.lokasi).map(([id, l]) => {
          const act = activeLoks.has(id), tk = tokohAt[id] || [], wg0 = (wargaAt && wargaAt[id]) || [];
          const wg = jejak && wg0.includes(jejak) ? [jejak, ...wg0.filter((x) => x !== jejak)] : wg0;
          const open = buka === id;
          return html`<div key=${id} class=${`pin i-${ikonLokasi(l)}${act ? " is-active" : ""}${sel === id ? " is-sel" : ""}${l.kecil ? " kecil" : ""}${open ? " wg-open" : ""}${jejakLok === id ? " jejak" : ""}`} ref=${reg(id)}>
           <div class="pin-wrap">
            <div class="pin-row">
              <button type="button" class="pin-btn" onClick=${() => onSelect(id)} aria-pressed=${sel === id} title=${IKON_NAMA[ikonLokasi(l)]}>
                <${Ikon} n=${ikonLokasi(l)} cls="pin-ikon" /><span class="pin-name">${l.nama}</span>${l.arab && html`<span class="pin-ar" lang="ar">${l.arab}</span>`}
              </button>
              ${wg.length > 0 && html`<button type="button" class="pin-n" aria-expanded=${open} onClick=${(e) => { e.stopPropagation(); setBuka(open ? null : id); }}
                title=${`${wg.length} tokoh tinggal di ${l.nama} pada ${year} M. Klik untuk ${open ? "menutup" : "melihat"} namanya.`}><i aria-hidden="true"></i>${wg.length}</button>`}
            </div>
            ${wg.length > 0 && html`<div class="pin-warga" aria-label=${`Tokoh yang tinggal di ${l.nama} pada ${year} M`}>
              <div class="wg-names"><p class="wg-head">Tinggal di ${l.nama}, ${year} M${open && html`<button type="button" class="wg-x" aria-label="Tutup" onClick=${(e) => { e.stopPropagation(); setBuka(null); }}>×</button>`}</p>
                ${wg.slice(0, 8).map((t) => html`<button type="button" key=${t} class=${`wg-name${t === jejak ? " on" : ""}`} onClick=${(e) => { e.stopPropagation(); onProfile(t); }}>${D.tokoh[t].nama}</button>`)}
                ${wg.length > 8 && html`<button type="button" class="wg-name more-w" onClick=${(e) => { e.stopPropagation(); setBuka(null); onSelect(id); }}>+${wg.length - 8} lainnya di panel</button>`}</div>
            </div>`}
            ${act && tk.length > 0 && html`<div class="pin-medals">
              ${tk.slice(0, 3).map((t) => html`<${Medal} key=${t} id=${t} size="sm" onClick=${onProfile} />`)}
              ${tk.length > 3 && html`<button type="button" class="more" onClick=${() => onSelect(id)}>+${tk.length - 3}</button>`}
            </div>`}
           </div>
          </div>`;
        })}
        ${rute && html`<div class="pin rute-pin" ref=${reg("__rute")}><div class="pin-wrap"><span class="rute-lbl">${ruteHi && ruteHi.label ? ruteHi.label : ruteNama || "Rute Hijrah"}</span></div></div>`}
      </div>
      ${jejakBar ? html`<div class="map-jejak">${jejakBar}</div>` : rute && html`<p class="rute-note"><i></i>${ruteNama || "Rute Hijrah (perkiraan, mengikuti daftar singgahan Ibnu Ishaq)"}</p>`}
      <${MapControls} api=${api} hold=${hold} zoomIn=${0.8} zoomOut=${1.25} onOverview=${onOverview} overviewLabel="Seluruh peta"
        help=${[...HELP_PETA, ["Klik nama kota", "lihat peristiwa dan tokohnya"], ["Klik angka di label", "lihat nama tokoh yang tinggal di sana"]]}
        legenda=${["kabah", "masjid", "kubah", "kota", "mahkota", "benteng", "kurma", "pedang", "kemah"]} />
    </section>`;
  }

  // ---------- Kartu peristiwa ----------
  function EventCard({ e, onProfile, showLoc, onGoto }) {
    return html`<article class="event">
      <header>
        <p class="event-when"><b>${e.tahun} M</b> <span>${e.h}</span> ${showLoc ? html`<span>· ${D.lokasi[e.lok].nama}</span>` : html`<span>· ${e.tempat}</span>`}</p>
        <h3>${showLoc ? html`<button type="button" class="link" onClick=${() => onGoto(e)}>${e.judul}</button>` : e.judul}</h3>
      </header>
      ${e.tontonan && html`<button type="button" class="watch" onClick=${() => window.__tonton(e.tontonan)}><span aria-hidden="true">▶</span> Tonton peristiwa</button>`}
      ${!showLoc && html`<p class="narasi">${e.narasi}</p>`}
      <div class="chips">
        ${e.tokoh.map((t) => html`<button type="button" key=${t} class="chip" onClick=${() => onProfile(t)}>
          <${Medal} id=${t} size="xs" /><span>${D.tokoh[t].nama}</span></button>`)}
      </div>
      ${!showLoc && e.ayat.map((a, i) => html`<div class="ayat" key=${i}>
        <p class="ayat-ref">${a.surah} : ${a.no}</p>
        <p class="ayat-ar" lang="ar" dir="rtl">${a.arab}</p>
        <p class="ayat-label">Asbabun nuzul</p>
        <p>${a.nuzul}</p>
        <p class="src">${a.sumber}</p>
        ${a.catatan && html`<p class="note">${a.catatan}</p>`}
        ${window.NUZUL_LOOKUP && window.NUZUL_LOOKUP.ev(e.id, i) && html`<button type="button" class="link wk-open" onClick=${() => window.__wiki(window.NUZUL_LOOKUP.ev(e.id, i))}>Baca artikel asbabun nuzul ›</button>`}
      </div>`)}
      ${!showLoc && (e.sumber || e.catatan) && html`<div class="foot">
        ${e.sumber && html`<p class="src">${e.sumber}</p>`}${e.catatan && html`<p class="note">${e.catatan}</p>`}</div>`}
    </article>`;
  }

  // ---------- Panel kanan ----------
  function Panel({ year, sel, eventsYear, onProfile, setYear, select, onEnterCity, onPerang }) {
    const [tab, setTab] = useState("peristiwa");
    const l = sel && D.lokasi[sel];
    const here = sel ? eventsYear.filter((e) => e.lok === sel) : eventsYear;
    const allHere = sel ? D.peristiwa.filter((e) => e.lok === sel) : [];
    const prev = [...allHere].reverse().find((e) => e.tahun < year), next = allHere.find((e) => e.tahun > year);
    const hereTokoh = new Set(here.flatMap((e) => e.tokoh));
    const tinggalDi = (t) => { const r = D.tinggalPada && D.tinggalPada(t, year); return r && r[0] === sel; };
    const living = Object.entries(D.tokoh).filter(([, t]) => alive(t, year))
      .sort((a, b) => (hereTokoh.has(b[0]) - hereTokoh.has(a[0])) || (sel ? tinggalDi(b[1]) - tinggalDi(a[1]) : 0) || a[1].lahir - b[1].lahir);
    const nWarga = sel ? living.filter(([, t]) => tinggalDi(t)).length : 0;
    const goto = (e) => { setYear(e.tahun); select(e.lok); setTab("peristiwa"); };

    return html`<aside class="panel" aria-label="Detail">
      ${l ? html`<div class="loc-head">
          <${Vignette} jenis=${l.jenis} />
          <button type="button" class="link small ph-back" onClick=${() => select(null)}>‹ Seluruh wilayah</button>
          <div class="loc-title"><h2>${l.nama}</h2><span class="loc-ar" lang="ar">${l.arab}</span></div>
          <p class="loc-ket">${l.ket}</p>
          ${sel === "makkah" && html`<button type="button" class="enter-city" onClick=${() => onEnterCity("mekah")}>
            <b>Buka peta kota Mekah</b><span>Ka'bah, rumah Khadijah, Abu Jahal, Abdul Muthalib, dan lainnya</span></button>`}
          ${sel === "madinah" && window.MadinahScene && html`<button type="button" class="enter-city" onClick=${() => onEnterCity("madinah")}>
            <b>Buka peta kota Madinah</b><span>Masjid Nabawi, Quba, Baqi', benteng Yahudi, Uhud, dan parit Khandaq</span></button>`}
        </div>`
        : html`<div class="loc-head plain"><p class="ph-k">Seluruh wilayah</p><h2>Tahun ${year} M</h2><p class="loc-ket">${eraFor(year).nama}. ${here.length ? `${here.length} peristiwa tercatat di peta tahun ini. Pilih kota untuk melihat detailnya.` : "Belum ada peristiwa tercatat di tahun ini. Geser timeline atau pilih kota."}</p></div>`}

      <div class="tabs" role="tablist">
        <button role="tab" aria-selected=${tab === "peristiwa"} onClick=${() => setTab("peristiwa")}>Peristiwa${here.length ? ` (${here.length})` : ""}</button>
        <button role="tab" aria-selected=${tab === "tokoh"} onClick=${() => setTab("tokoh")}>${sel ? `Tokoh (${nWarga} tinggal di sini)` : `Tokoh yang hidup (${living.length})`}</button>
      </div>

      <div class="panel-body">
        ${tab === "peristiwa" && (() => {
          const pr = perangDi(sel, sel ? null : year);
          if (!pr.length) return null;
          return html`<section class="pr-here"><h3 class="sec">${sel ? `Ghazwah di ${l.nama}` : `Ghazwah pada ${year} M`}</h3>
            <ul class="plist2">${pr.map((p) => html`<li key=${p.id}><button type="button" class=${`prow${p.tahun === year ? " now" : ""}`} onClick=${() => onPerang(p.id)}>
              <i class="pr-dot"></i><span><b>${p.nama}</b><small>${p.bulan}${p.muslim && p.muslim.jumlah ? ` · ±${p.muslim.jumlah.toLocaleString("id-ID")} muslim` : ""}</small></span></button></li>`)}</ul></section>`;
        })()}
        ${tab === "peristiwa" && (here.length
          ? here.map((e) => html`<${EventCard} key=${e.id} e=${e} onProfile=${onProfile} showLoc=${!sel} onGoto=${goto} />`)
          : html`<div class="empty">
              <p>${sel ? `Tidak ada peristiwa tercatat di ${l.nama} pada ${year} M.` : `Tidak ada peristiwa tercatat pada ${year} M.`}</p>
              ${sel && html`<div class="jump">
                ${prev && html`<button type="button" onClick=${() => setYear(prev.tahun)}><small>Sebelumnya, ${prev.tahun} M</small>${prev.judul}</button>`}
                ${next && html`<button type="button" onClick=${() => setYear(next.tahun)}><small>Berikutnya, ${next.tahun} M</small>${next.judul}</button>`}
              </div>`}
            </div>`)}
        ${tab === "tokoh" && (() => {
          const item = ([id, t]) => html`<li key=${id}><button type="button" class=${hereTokoh.has(id) ? "here" : ""} onClick=${() => onProfile(id)}>
            <${Medal} id=${id} size="sm" />
            <span><b>${t.nama}</b><small>${hereTokoh.has(id) ? "Terlibat peristiwa di sini · " : ""}usia ±${Math.max(0, year - t.lahir)} th</small></span></button></li>`;
          if (!sel) return html`<ul class="people">${living.map(item)}</ul>`;
          const warga = living.filter(([, t]) => tinggalDi(t)), lain = living.filter(([, t]) => !tinggalDi(t));
          return html`<section><h3 class="sec">Tinggal di ${l.nama} pada ${year} M</h3>
              ${warga.length ? html`<ul class="people">${warga.map(item)}</ul>` : html`<p class="empty-p">Belum ada tokoh di aplikasi yang tercatat tinggal di sini pada tahun ini.</p>`}</section>
            <section><h3 class="sec">Tokoh lain yang hidup pada ${year} M</h3><ul class="people">${lain.map(item)}</ul></section>`;
        })()}
      </div>
    </aside>`;
  }

  // ---------- Timeline ----------
  const ERA_SINGKAT = { pra: "Sebelum kenabian", mekah: "Mekah", madinah: "Madinah", abubakar: "Abu Bakar", umar: "Umar", utsman: "Utsman", ali: "Ali" };
  function Timeline({ year, setYear, playing, setPlaying }) {
    const era = eraFor(year);
    const pct = (y) => ((y - Y0) / (Y1 - Y0)) * 100;
    const step = (d) => {
      const list = d > 0 ? EVENT_YEARS.filter((y) => y > year) : EVENT_YEARS.filter((y) => y < year).reverse();
      if (list.length) setYear(list[0]);
    };
    return html`<section class="timeline" aria-label="Timeline">
      <div class="tl-now">
        <div><span class="tl-year">${year}</span><span class="tl-m">M</span></div>
        <div class="tl-meta"><b>${era.nama}</b><span>${hijri(year)}</span></div>
      </div>
      <div class="tl-track">
        <div class="eras">${D.eras.map((e) => { const w = pct(Math.min(e.sampai, Y1)) - pct(e.dari); return html`<button type="button" key=${e.id}
            class=${`era${e.id === era.id ? " on" : ""}`}
            style=${{ left: pct(e.dari) + "%", width: w + "%" }}
            onClick=${() => setYear(EVENT_YEARS.find((y) => y + 0.4 >= e.dari) || Math.ceil(e.dari))} title=${e.nama} aria-label=${e.nama}>
            ${w >= 4.5 && html`<span>${ERA_SINGKAT[e.id] || e.nama}</span>`}</button>`; })}</div>
        <div class="ticks">${EVENT_YEARS.map((y) => html`<i key=${y} class=${y === year ? "on" : ""} style=${{ left: pct(y) + "%" }}></i>`)}</div>
        <input id="tahun" type="range" min=${Y0} max=${Y1} value=${year} aria-label="Pilih tahun"
          onInput=${(e) => { setPlaying(false); setYear(+e.target.value); }} />
        <div class="scale">${[[570, "Tahun Gajah"], [610, "Wahyu"], [622, "Hijrah"], [632, "Wafat Nabi"], [661, ""]].map(([y, n]) =>
          html`<span key=${y} style=${{ left: pct(y) + "%" }}>${y}${n && html`<em>${n}</em>`}</span>`)}</div>
      </div>
      <div class="tl-ctl">
        <button type="button" onClick=${() => step(-1)} aria-label="Peristiwa sebelumnya">‹</button>
        <button type="button" class="play" onClick=${() => setPlaying(!playing)}>${playing ? "Jeda" : "Putar"}</button>
        <button type="button" onClick=${() => step(1)} aria-label="Peristiwa berikutnya">›</button>
      </div>
    </section>`;
  }

  // ---------- Profil ----------
  const kelNama = (k) => (D.kelompok && D.kelompok[k]) || k;
  const tahunProfil = (t) => (t.takTercatat ? `±${t.lahir} – ±${t.wafat} M (tidak tercatat pasti)` : tahunTokoh(t));
  const namaTempat = (r) => (r[0] ? D.lokasi[r[0]].nama : (r[3] || "Di luar peta").split(";")[0]);
  function ProfileBody({ id, year, onGoto, onGotoCity, onGotoLok }) {
    const t = D.tokoh[id];
    const evs = D.peristiwa.filter((e) => e.tokoh.includes(id));
    const refsKota = (kota) => { const K0 = window.KOTA && window.KOTA[kota] ? window.KOTA[kota].data() : kota === "mekah" ? window.MEKAH : null;
      return K0 ? K0.tempat.flatMap((p) => (p.riwayat || []).filter((r) => (r.tokoh || []).includes(id) && !r.lihat).map((r) => ({ p, r, kota })))
        .sort((a, b) => (a.r.t ? a.r.t[0] : 0) - (b.r.t ? b.r.t[0] : 0)) : []; };
    const cityRefs = refsKota("mekah"), madRefs = refsKota("madinah");
    const hjRefs = window.HIJRAH ? window.HIJRAH.episode.filter((e) => e.tokoh.includes(id)) : [];
    const prRefs = window.PERANG ? window.PERANG.daftar.filter((p) => p.panglima && [...(p.panglima.muslim || []), ...(p.panglima.musuh || [])].includes(id)).sort((a, b) => a.urutWaktu - b.urutWaktu) : [];
    const status = year < t.lahir ? `Belum lahir pada ${year} M.` : year > t.wafat ? `Telah wafat pada ${year} M.` : `Pada ${year} M berusia ±${year - t.lahir} tahun.`;
    const kini = D.tinggalPada ? D.tinggalPada(t, year) : null;
    const rumah = (t.rumah || []).map(([pid, ket]) => ({ p: window.MEKAH.tempat.find((x) => x.id === pid), ket })).filter((x) => x.p);
    return html`<div class="prof">
      <div class="profile-head">
        <${Medal} id=${id} size="lg" />
        <div><h2>${t.nama}</h2><p class="gelar">${t.gelar}</p><p class="years">${tahunProfil(t)}</p>
          ${t.kel && html`<p class="kel">${t.kel.map((k) => html`<span key=${k}>${kelNama(k)}</span>`)}</p>`}</div>
      </div>
      <p class="status">${status}${kini && year >= t.lahir && year <= t.wafat ? ` Tinggal di ${namaTempat(kini)}.` : ""}</p>
      <p>${t.ringkas}</p>
      ${t.tinggal && t.tinggal.length > 0 && html`<h3>Tempat tinggal</h3>
        <ol class="tinggal">${t.tinggal.map((r, i) => { const now = year >= r[1] && year <= r[2]; return html`<li key=${i} class=${now ? "now" : ""}>
          <span class="py">${r[1] === r[2] ? r[1] : `${r[1]}–${r[2]}`}</span>
          <span class="tg"><b>${namaTempat(r)}</b>${r[0] && r[3] ? html`<small>${r[3]}</small>` : !r[0] && r[3] && r[3].includes(";") ? html`<small>${r[3].split(";").slice(1).join(";").trim()}</small>` : ""}</span>
          ${r[0] && onGotoLok && html`<span class="tg-go"><button type="button" class="link small" onClick=${() => onGotoLok(r[0], Math.max(570, Math.min(661, Math.max(r[1], t.lahir))), id)}>Lihat di peta</button>
            ${KOTA_LOK[r[0]] && onGotoCity && (KOTA_LOK[r[0]] === "mekah" || window.MadinahScene) && html`<button type="button" class="link small" onClick=${() => onGotoCity(null, { t: [Math.max(570, Math.min(661, Math.max(r[1], t.lahir, KOTA_LOK[r[0]] === "madinah" ? 622 : 0)))] }, KOTA_LOK[r[0]], id)}>Peta kota</button>`}</span>`}
        </li>`; })}</ol>`}
      ${rumah.length > 0 && html`<h3>Rumah di peta kota Mekah</h3>
        <div class="chips">${rumah.map(({ p, ket }) => html`<button type="button" key=${p.id} class="chip go" onClick=${() => onGotoCity(p.id, null, "mekah", id)}>${p.nama}${ket ? html` <small>(${ket})</small>` : ""}</button>`)}</div>`}
      <h3>Kejadian yang melibatkannya</h3>
      ${evs.length ? html`<ol class="plist">${evs.map((e) => html`<li key=${e.id}><button type="button" onClick=${() => onGoto(e, id)}>
        <span class="py">${e.tahun}</span><span><b>${e.judul}</b><small>${e.tempat || D.lokasi[e.lok].nama}</small></span></button></li>`)}</ol>`
        : html`<p class="dim">Belum ada kejadian di peta yang mencatat tokoh ini.</p>`}
      ${cityRefs.length > 0 && html`<h3>Jejak di kota Mekah</h3>
        <ol class="plist">${cityRefs.map(({ p, r }, i) => html`<li key=${i}><button type="button" onClick=${() => onGotoCity(p.id, r, "mekah", id)}>
          <span class="py">${r.t ? r.t[0] : "–"}</span><span><b>${r.judul}</b><small>${p.nama}</small></span></button></li>`)}</ol>`}
      ${madRefs.length > 0 && html`<h3>Jejak di kota Madinah</h3>
        <ol class="plist">${madRefs.map(({ p, r }, i) => html`<li key=${i}><button type="button" onClick=${() => onGotoCity(p.id, r, "madinah", id)}>
          <span class="py">${r.t ? r.t[0] : "–"}</span><span><b>${r.judul}</b><small>${p.nama}</small></span></button></li>`)}</ol>`}
      ${hjRefs.length > 0 && html`<h3>Dalam kisah Hijrah</h3>
        <ol class="plist">${hjRefs.map((e) => html`<li key=${e.id}><button type="button" onClick=${() => window.__buka && window.__buka("hijrah", e.id)}>
          <span class="py">${e.tahun}</span><span><b>${e.judul}</b><small>${e.tanggal}</small></span></button></li>`)}</ol>`}
      ${prRefs.length > 0 && html`<h3>Dalam peperangan</h3>
        <ol class="plist">${prRefs.map((p) => html`<li key=${p.id}><button type="button" onClick=${() => window.__buka && window.__buka("perang", p.id)}>
          <span class="py">${p.tahun}</span><span><b>${p.nama}</b><small>${p.bulan}</small></span></button></li>`)}</ol>`}
      ${t.wiki && html`<p class="prof-src">Sumber profil: <a href=${t.wiki} target="_blank" rel="noopener">${/sunnah\.com/.test(t.wiki) ? "Sunnah.com" : "Wikipedia"}</a>. Tahun bertanda ± adalah perkiraan.</p>`}
    </div>`;
  }
  function Profile({ id, year, onClose, onGoto, onGotoCity, onGotoLok }) {
    const t = D.tokoh[id];
    useEffect(() => { const k = (e) => e.key === "Escape" && onClose(); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, []);
    return html`<div class="overlay" onClick=${onClose}>
      <div class="profile" role="dialog" aria-modal="true" aria-label=${t.nama} onClick=${(e) => e.stopPropagation()}>
        <button type="button" class="close" onClick=${onClose} aria-label="Tutup">×</button>
        <${ProfileBody} id=${id} year=${year} onGoto=${onGoto} onGotoCity=${onGotoCity} onGotoLok=${onGotoLok} />
      </div>
    </div>`;
  }

  // ---------- Halaman Tokoh ----------
  const URUT_KEL = ["keluarga", "istri", "khulafa", "asyarah", "muhajirin", "anshar", "sahabiyat", "panglima", "ulama", "penentang", "raja", "pra", "lain"];
  function TokohList({ sel, onSelect, year }) {
    const [q, setQ] = useState(""), [kel, setKel] = useState("semua"), [hidup, setHidup] = useState(false);
    const ql = q.trim().toLowerCase();
    const all = Object.entries(D.tokoh);
    const list = all.filter(([, t]) => (!ql || (t.nama + " " + t.gelar).toLowerCase().includes(ql)) && (kel === "semua" || (t.kel || []).includes(kel)) && (!hidup || alive(t, year)))
      .sort((a, b) => a[1].lahir - b[1].lahir);
    const count = (k) => all.filter(([, t]) => (t.kel || []).includes(k)).length;
    return html`<aside class="panel nz-panel" aria-label="Daftar tokoh">
      <div class="loc-head plain">
        <h2>Tokoh</h2>
        <p class="loc-ket">${all.length} tokoh dari Tahun Gajah sampai akhir Khulafaur Rasyidin, beserta tempat tinggal dan kejadiannya.</p>
      </div>
      <div class="nz-tools">
        <label class="nz-search"><span class="sr">Cari tokoh</span><input type="search" placeholder="Cari nama atau gelar" value=${q} onInput=${(e) => setQ(e.target.value)} /></label>
        <label class="hidup"><input type="checkbox" checked=${hidup} onChange=${(e) => setHidup(e.target.checked)} /> Hanya yang hidup pada ${year} M</label>
        <div class="nz-seg small" role="group" aria-label="Kelompok">
          <button type="button" class=${kel === "semua" ? "on" : ""} aria-pressed=${kel === "semua"} onClick=${() => setKel("semua")}>Semua</button>
          ${URUT_KEL.filter((k) => count(k)).map((k) => html`<button key=${k} type="button" class=${kel === k ? "on" : ""} aria-pressed=${kel === k} onClick=${() => setKel(k)}>${kelNama(k)} <small>${count(k)}</small></button>`)}
        </div>
      </div>
      <ul class="tk-list">
        ${list.map(([id, t]) => html`<li key=${id}><button type="button" class=${id === sel ? "on" : ""} aria-pressed=${id === sel} onClick=${() => onSelect(id)}>
          <${Medal} id=${id} size="sm" />
          <span><b>${t.nama}</b><small>${t.kira ? "±" : ""}${t.lahir}–${t.wafat} M · ${t.gelar}</small></span></button></li>`)}
        ${!list.length && html`<li class="nz-none">Tidak ada tokoh yang cocok.</li>`}
      </ul>
    </aside>`;
  }

  // ---------- Kota (Mekah dan Madinah) ----------
  const kotaData = (kota) => (window.KOTA && window.KOTA[kota] ? window.KOTA[kota].data() : window.MEKAH);
  const kotaInfo = (kota) => (window.KOTA && window.KOTA[kota]) || { nama: "Mekah", pusat: "kabah", mulai: "Mulai jalan kaki dari Ka'bah", ket: "" };
  const adaPada = (p, y) => !p.ada || (y >= p.ada[0] && y <= p.ada[1]);
  // ---------- Jejak tokoh: dari profil ke peta tanpa kehilangan jejak ----------
  const KOTA_LOK = { makkah: "mekah", madinah: "madinah" };
  const RUMAH_ALIAS = { "rumah-fatimah": ["fatimah", "ali"], "rumah-abubakar-sunh": ["abubakar"], "rumah-abubakar": ["abubakar"], "masyrabah-mariyah": ["mariyah"], khadijah: ["khadijah", "nabi"], maulid: ["nabi"] };
  function jejakKota(id, kota) {
    const K = kotaData(kota), t = D.tokoh[id];
    if (!K || !t) return { rumah: [], terkait: [], pernah: false };
    const rumah = [];
    const tambah = (p, ket) => { if (p && !rumah.some((r) => r.p.id === p.id)) rumah.push({ p, ket: ket || "" }); };
    if (kota === "mekah") (t.rumah || []).forEach(([pid, ket]) => tambah(K.tempat.find((x) => x.id === pid), ket));
    K.tempat.forEach((p) => { if (p.jenis === "rumah" && (p.id === id || p.id === "rumah-" + id || (RUMAH_ALIAS[p.id] || []).includes(id))) tambah(p, p.keyakinan === "perkiraan" ? "letak perkiraan" : ""); });
    const terkait = K.tempat.map((p) => ({ p, rs: (p.riwayat || []).filter((r) => (r.tokoh || []).includes(id)) })).filter((x) => x.rs.length && !rumah.some((r) => r.p.id === x.p.id));
    const lok = kota === "madinah" ? "madinah" : "makkah";
    return { rumah, terkait, pernah: (t.tinggal || []).some((r) => r[0] === lok) };
  }
  // Rangkaian tempat tinggal seorang tokoh sebagai rute di peta wilayah
  function jejakRute(id, year) {
    const t = D.tokoh[id]; if (!t) return null;
    const pts = [];
    (t.tinggal || []).forEach((r) => { const l = r[0] && D.lokasi[r[0]]; if (!l) return; if (pts.length && pts[pts.length - 1].lok === r[0]) { pts[pts.length - 1].sampai = r[2]; return; } pts.push({ lat: l.lat, lon: l.lon, nama: l.nama, lok: r[0], dari: r[1], sampai: r[2] }); });
    let i = pts.findIndex((p) => year >= p.dari && year <= p.sampai);
    if (i < 0) i = year < (pts[0] || {}).dari ? 0 : pts.length - 1;
    return { pts, i };
  }
  function JejakBar({ id, year, kota, onClose, onProfile, onKota, onSelect, onLok }) {
    const t = D.tokoh[id]; if (!t) return null;
    const M = Medal, now = D.tinggalPada ? D.tinggalPada(t, year) : null, hidup = alive(t, year);
    const head = html`<div class="jk-head"><${M} id=${id} size="xs" /><span>${kota ? `Jejak ${t.nama} di ${kotaInfo(kota).nama}` : `Mengikuti jejak ${t.nama}`}</span>
      <button type="button" class="link small" onClick=${() => onProfile(id)}>Profil</button>
      <button type="button" class="wg-x" aria-label="Berhenti mengikuti" title="Berhenti mengikuti" onClick=${onClose}>×</button></div>`;
    if (kota) {
      const j = jejakKota(id, kota), nm = t.nama.split(" ")[0];
      return html`<div class="jejak-bar">${head}
        ${j.rumah.length > 0 ? html`<div class="jk-row"><small>Rumah</small>${j.rumah.map(({ p, ket }) => html`<button type="button" key=${p.id} class="chip go" onClick=${() => onSelect(p.id)}><${Ikon} n="rumah" />${p.nama}${ket && html` <em>(${ket})</em>`}</button>`)}</div>`
          : html`<p class="jk-note">${j.pernah ? `Letak rumah ${nm} di ${kotaInfo(kota).nama} tidak tercatat dalam sumber yang kami gunakan.` : `${nm} tidak tercatat tinggal di ${kotaInfo(kota).nama}.`}</p>`}
        ${j.terkait.length > 0 ? html`<div class="jk-row"><small>Tercatat di</small>${j.terkait.map(({ p, rs }) => html`<button type="button" key=${p.id} class="chip go" onClick=${() => onSelect(p.id)} title=${rs.map((r) => r.judul).join("; ")}>${p.nama} <em>${rs[0].t ? rs[0].t[0] + " M" : ""}</em></button>`)}</div>`
          : !j.rumah.length && html`<p class="jk-note">Belum ada tempat di peta kota ini yang mencatat ${nm}.</p>`}
      </div>`;
    }
    const lok = now && now[0], kk = KOTA_LOK[lok];
    return html`<div class="jejak-bar">${head}
      <p class="jk-note">${!hidup ? (year < t.lahir ? `Belum lahir pada ${year} M.` : `Telah wafat pada ${year} M.`) : lok ? `Pada ${year} M tinggal di ${D.lokasi[lok].nama}${now[3] ? ": " + now[3] : "."}` : `Tempat tinggalnya pada ${year} M tidak ada di peta.`}</p>
      ${kk && hidup && html`<button type="button" class="jk-go" onClick=${() => onKota(kk)}><${Ikon} n=${kk === "mekah" ? "kabah" : "masjid"} /> Masuk peta kota ${kotaInfo(kk).nama} dan lihat tempat ${t.nama.split(" ")[0]}</button>`}
      <div class="jk-row"><small>Tempat tinggal</small>${(t.tinggal || []).filter((r) => r[0] && D.lokasi[r[0]]).map((r, i) => html`<button type="button" key=${i} class=${`chip${now === r ? " on" : ""}`} onClick=${() => onLok(r[0], Math.max(Y0, Math.min(Y1, Math.max(r[1], t.lahir))))}>${D.lokasi[r[0]].nama} <em>${r[1]}–${r[2]}</em></button>`)}</div>
    </div>`;
  }
  const namaPada = (p, y) => { const l = (p.namaLama || []).find((x) => x.t && y >= x.t[0] && y <= x.t[1]); return l ? `${l.nama} (kemudian ${p.nama})` : p.nama; };
  const inYear = (r, y) => r.t && y >= r.t[0] && y <= r.t[1];
  const placeActive = (p, y) => (p.riwayat || []).some((r) => inYear(r, y));
  const fmtT = (t) => (!t ? "Sebelum 570 M" : t[0] === t[1] ? `${t[0]} M` : `${t[0]}–${t[1]} M`);

  function CityMap({ kota = "mekah", onKota, year, csel, activeIds: aktif0, onSelect, onOverview, onBack, walkReq, story, onStoryEnd, jejak, jejakBar }) {
    const K = kotaData(kota), info = kotaInfo(kota);
    const jejakIds = useMemo(() => { if (!jejak) return new Set(); const j = jejakKota(jejak, kota); return new Set([...j.rumah.map((r) => r.p.id), ...j.terkait.map((x) => x.p.id)]); }, [jejak, kota]);
    const activeIds = useMemo(() => (jejakIds.size ? new Set([...aktif0, ...jejakIds]) : aktif0), [aktif0, jejakIds]);
    const box = useRef(null), api = useRef(null), nodes = useRef({});
    const [status, setStatus] = useState({ walking: false, detail: 0, cells: 0 });
    const [ready, setReady] = useState(false);
    const [quality, setQualityS] = useState(() => { try { return localStorage.getItem("jejak-kualitas") !== "ringan"; } catch (e) { return true; } });
    const toggleQuality = () => { const q = !quality; setQualityS(q); api.current && api.current.setQuality(q); try { localStorage.setItem("jejak-kualitas", q ? "tinggi" : "ringan"); } catch (e) {} };
    const reg = (id) => (n) => { if (n) nodes.current[id] = n; else delete nodes.current[id]; api.current && api.current.registerLabel(id, n); };
    useEffect(() => {
      let lastS = "";
      const E = (window.KOTA && window.KOTA[kota] ? window.KOTA[kota].engine() : null) || window.MekahScene;
      api.current = E.create(box.current, { tempat: K.tempat, jalan: K.jalan, medan: K.medan, year, quality,
        onStatus: (s) => { const j = JSON.stringify(s); if (j !== lastS) { lastS = j; setStatus(s); } } });
      Object.entries(nodes.current).forEach(([id, n]) => api.current.registerLabel(id, n));
      api.current.setActive(activeIds);
      if (csel) api.current.select(csel);
      setReady(true);
      return () => api.current.dispose();
    }, []);
    useEffect(() => { api.current && api.current.setActive(activeIds); }, [activeIds]);
    useEffect(() => { api.current && api.current.setYear(year); }, [year]);
    useEffect(() => { if (!api.current) return; csel ? api.current.select(csel) : api.current.overview(); }, [csel]);
    useEffect(() => { if (walkReq && api.current) api.current.startWalk(walkReq.id); }, [walkReq]);
    useEffect(() => {
      const k = (e) => { if (e.key === "Escape" && status.walking && !document.querySelector(".overlay")) api.current.stopWalk(); };
      window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
    }, [status.walking]);
    const walking = status.walking;
    const hold = (k) => ({
      onPointerDown: (e) => { e.preventDefault(); api.current.press(k, true); },
      onPointerUp: () => api.current.press(k, false), onPointerLeave: () => api.current.press(k, false), onPointerCancel: () => api.current.press(k, false)
    });
    const nearP = status.near && K.tempat.find((p) => p.id === status.near.id);
    return html`<section class=${`map city kota-${kota}${walking ? " walking" : ""}${story ? " story-on" : ""}`} aria-label=${"Peta 3D kota " + info.nama}>
      <div class="map-canvas" ref=${box}></div>
      <div class="map-labels">
        ${K.tempat.map((p) => html`<div key=${p.id} ref=${reg(p.id)}
            class=${`pin k-${p.keyakinan} j-${p.jenis}${activeIds.has(p.id) ? " is-active" : ""}${csel === p.id ? " is-sel" : ""}${jejakIds.has(p.id) ? " jejak" : ""}`}>
          <div class="pin-wrap"><button type="button" class="pin-btn" onClick=${() => onSelect(p.id)} aria-pressed=${csel === p.id} title=${IKON_NAMA[ikonTempat(p)]}>
            <${Ikon} n=${ikonTempat(p)} cls="pin-ikon" /><span class="pin-name">${p.nama}</span>${jejakIds.has(p.id) && html`<${Medal} id=${jejak} size="xs" />`}
          </button></div>
        </div>`)}
      </div>
      <div class="city-top">
        <div class="city-title"><b>Kota ${info.nama}</b><span>${walking && status.facing ? `Jalan kaki · menghadap ${status.facing}` : `Keadaan sekitar ${year} M`}</span></div>
        ${!walking && !story && onKota && window.MadinahScene && html`<div class="nz-seg kota-seg" role="group" aria-label="Pilih kota">
          ${[["mekah", "Mekah"], ["madinah", "Madinah"]].map(([k, l]) => html`<button key=${k} type="button" class=${kota === k ? "on" : ""} aria-pressed=${kota === k} onClick=${() => onKota(k)}>${l}</button>`)}</div>`}
        ${walking
          ? html`<button type="button" class="back" onClick=${() => api.current.stopWalk()}>Keluar dari jalan kaki <kbd>Esc</kbd></button>`
          : html`<ul class="legend" aria-label="Tingkat keyakinan lokasi">
              ${Object.entries(K.keyakinan).map(([k, v]) => html`<li key=${k} class=${`k-${k}`} title=${v.ket}><i class="kdot"></i>${v.nama}</li>`)}
            </ul>`}
        ${!walking && !story && jejakBar}
      </div>
      ${!walking && html`<${MapControls} api=${api} hold=${hold} zoomIn=${0.75} zoomOut=${1.33} onOverview=${onOverview} overviewLabel="Seluruh kota"
        help=${[...HELP_PETA, ["Klik nama tempat", "lihat riwayatnya"], ["Jalan kaki", "jelajahi kota setinggi mata"], ["Warna ikon", "seberapa yakin letaknya; bentuknya menunjukkan jenis tempat"]]}
        legenda=${kota === "madinah" ? ["masjid", "rumah", "kampung", "benteng", "sumur", "pasar", "makam", "kurma", "gunung", "batu", "wadi", "parit", "kemah"] : ["kabah", "rumah", "balai", "sumur", "gua", "gunung", "bukit", "jalan", "kampung", "titik"]}>
        <button type="button" class="tool wide primary" onClick=${() => api.current.startWalk(csel)}>Jalan kaki${csel ? " di sini" : ""}</button>
        <${Popover} label="Pengaturan tampilan" icon="⚙" cls="up">
          <div class="set-row"><span><b>Kualitas grafis</b><small>Mode ringan mematikan bayangan, bebatuan, dan relief tanah untuk laptop yang lebih lemah.</small></span>
            <button type="button" class=${`switch${quality ? " on" : ""}`} role="switch" aria-checked=${quality} onClick=${toggleQuality}>${quality ? "Tinggi" : "Ringan"}</button></div>
          <p class="set-stat">Rumah detail yang sedang dibangun: ${status.detail}</p>
        </${Popover}>
      </${MapControls}>`}
      ${walking && html`<div class="walk-hud">
        ${status.kabah && html`<p class="kabah-dir">Ka'bah ${status.kabah.dist} m ke arah ${status.kabah.dir}</p>`}
        ${!status.kabah && status.pusat && html`<p class="kabah-dir">${status.pusat.nama} ${status.pusat.dist} m ke arah ${status.pusat.dir}</p>`}
        ${nearP && html`<button type="button" class="near" onClick=${() => onSelect(nearP.id)}>
          <span>Di dekat <b>${nearP.nama}</b>${status.near.dist > 0 ? ` · ${status.near.dist} m` : ""}</span><em>Lihat riwayat</em></button>`}
      </div>
      <div class="dpad" aria-label="Tombol gerak">
        <button type="button" class="u" ...${hold("w")} aria-label="Maju">▲</button>
        <button type="button" class="l" ...${hold("q")} aria-label="Belok kiri">⟲</button>
        <button type="button" class="d" ...${hold("s")} aria-label="Mundur">▼</button>
        <button type="button" class="r" ...${hold("e")} aria-label="Belok kanan">⟳</button>
      </div>`}
      ${walking && html`<p class="walk-keys">W/S jalan · A/D geser · Q/E belok · seret untuk melihat · Shift berlari</p>`}
      ${ready && story && window.SirahStory && html`<${window.SirahStory} key=${story} api=${api.current} id=${story} onClose=${onStoryEnd} />`}
    </section>`;
  }

  function Riwayat({ r, year, onProfile, onLihat, pid, K = window.MEKAH, jejak }) {
    const now = inYear(r, year), jk = jejak && (r.tokoh || []).includes(jejak);
    return html`<article class=${`riwayat${now ? " now" : ""}${jk ? " jejak" : ""}`}>
      <p class="event-when"><b>${fmtT(r.t)}</b>${now && html`<span class="tag-now">Tahun terpilih</span>`}</p>
      <h3>${r.judul}</h3>
      ${r.tontonan && html`<button type="button" class="watch" onClick=${() => window.__tonton(r.tontonan)}><span aria-hidden="true">▶</span> Tonton peristiwa</button>`}
      <p class="narasi">${r.isi}</p>
      ${r.ayat && html`<div class="ayat"><p class="ayat-ref">${r.ayat.surah} : ${r.ayat.no}</p><p class="ayat-ar" lang="ar" dir="rtl">${r.ayat.arab}</p>
        ${pid && window.NUZUL_LOOKUP && window.NUZUL_LOOKUP.tempat(pid, r.judul) && html`<button type="button" class="link wk-open" onClick=${() => window.__wiki(window.NUZUL_LOOKUP.tempat(pid, r.judul))}>Baca artikel asbabun nuzul ›</button>`}</div>`}
      ${r.matan && html`<p class="matan" lang="ar" dir="rtl">${r.matan}</p>`}
      <p class="src-line"><span class=${`deg d-${r.derajat}`}>${(K.derajat || {})[r.derajat] || r.derajat}</span>
        ${r.url ? html`<a href=${r.url} target="_blank" rel="noopener">${r.sumber}</a>` : html`<span>${r.sumber}</span>`}</p>
      ${r.catatan && html`<p class="note">${r.catatan}</p>`}
      ${((r.tokoh || []).length > 0 || r.lihat) && html`<div class="chips">
        ${(r.tokoh || []).filter((t) => D.tokoh[t]).map((t) => html`<button type="button" key=${t} class="chip" onClick=${() => onProfile(t)}><${Medal} id=${t} size="xs" /><span>${D.tokoh[t].nama}</span></button>`)}
        ${r.lihat && K.tempat.find((p) => p.id === r.lihat) && html`<button type="button" class="chip go" onClick=${() => onLihat(r.lihat)}>Buka ${K.tempat.find((p) => p.id === r.lihat).nama}</button>`}
      </div>`}
    </article>`;
  }

  function CityPanel({ kota = "mekah", year, csel, setCsel, onProfile, activeIds, onWalk, jejak }) {
    const K = kotaData(kota), info = kotaInfo(kota);
    const p = csel && K.tempat.find((x) => x.id === csel);
    if (p) {
      const kv = K.keyakinan[p.keyakinan];
      return html`<aside class="panel" aria-label="Detail tempat">
        <div class="loc-head plain">
          <button type="button" class="link small ph-back" onClick=${() => setCsel(null)}>‹ Semua tempat di ${info.nama}</button>
          <div class="loc-title flush"><h2>${namaPada(p, year)}</h2><span class="loc-ar" lang="ar">${p.arab}</span></div>
          ${p.ada && !adaPada(p, year) && html`<p class="ada-note">${year < p.ada[0] ? `Belum ada pada ${year} M (mulai ${p.ada[0]} M).` : `Pada ${year} M sudah tidak seperti dulu (sampai ${p.ada[1]} M).`}</p>`}
          <p class=${`kbadge k-${p.keyakinan}`}><i class="kdot"></i><b>${kv.nama}.</b> ${kv.ket}</p>
          <p class="loc-ket">${p.ket}</p>
          ${p.sumberLokasi && html`<p class="src">Sumber lokasi: ${p.sumberLokasi}</p>`}
          ${p.jenis !== "gunung" && html`<button type="button" class="walk-here" onClick=${() => onWalk(p.id)}>Jalan kaki ke sini</button>`}
        </div>
        <div class="panel-body">
          ${jejak && D.tokoh[jejak] && html`<p class="jk-pnote"><${Medal} id=${jejak} size="xs" />${p.riwayat.some((r) => (r.tokoh || []).includes(jejak)) ? `Riwayat yang melibatkan ${D.tokoh[jejak].nama} ditandai dan ditaruh paling atas.` : `Tidak ada riwayat ${D.tokoh[jejak].nama} di tempat ini.`}</p>`}
          ${p.riwayat.length ? [...p.riwayat].sort((a, b) => (jejak ? ((b.tokoh || []).includes(jejak) - (a.tokoh || []).includes(jejak)) : 0) || inYear(b, year) - inYear(a, year) || (a.t ? a.t[0] : 0) - (b.t ? b.t[0] : 0))
              .map((r, i) => html`<${Riwayat} key=${i} r=${r} year=${year} onProfile=${onProfile} onLihat=${setCsel} pid=${p.id} K=${K} jejak=${jejak} />`)
            : html`<p class="empty-p">Belum ada riwayat yang dicatat untuk tempat ini.</p>`}
        </div>
      </aside>`;
    }
    const semua = K.tempat.filter((x) => x.jenis !== "gunung");
    const list = semua.filter((x) => adaPada(x, year)), tiada = semua.filter((x) => !adaPada(x, year));
    const now = list.filter((x) => activeIds.has(x.id)), rest = list.filter((x) => !activeIds.has(x.id));
    const row = (x) => html`<li key=${x.id}><button type="button" class=${`prow k-${x.keyakinan}`} onClick=${() => setCsel(x.id)}>
      <${Ikon} n=${ikonTempat(x)} cls="prow-ikon" /><span><b>${x.nama}</b><small>${IKON_NAMA[ikonTempat(x)]} · ${K.keyakinan[x.keyakinan].nama} · ${(x.riwayat || []).length} riwayat${x.ada && !adaPada(x, year) ? ` · ${year < x.ada[0] ? "mulai " + x.ada[0] : "sampai " + x.ada[1]} M` : ""}</small></span></button></li>`;
    return html`<aside class="panel" aria-label=${"Tempat di " + info.nama}>
      <div class="loc-head plain">
        <h2>Kota ${info.nama}</h2>
        <p class="loc-ket">${info.ket} Warna penanda menunjukkan seberapa yakin letaknya; tempat yang punya riwayat di tahun ${year} M ikut menyala.</p>
        ${kota === "madinah" && year < 622 && html`<p class="ada-note">Nabi ﷺ tiba di Madinah pada 622 M. Sebelum itu kota ini bernama Yatsrib; geser timeline ke 622 M atau sesudahnya.</p>`}
        <details class="more-info"><summary>Tentang gambar kota ini</summary><p>${K.catatanVisual}</p></details>
        <button type="button" class="walk-here" onClick=${() => onWalk(info.pusat)}>${info.mulai}</button>
      </div>
      <div class="panel-body">
        ${now.length > 0 && html`<section><h3 class="sec">Terkait ${year} M</h3><ul class="plist2">${now.map(row)}</ul></section>`}
        <section><h3 class="sec">${now.length ? "Tempat lain" : "Semua tempat"}</h3><ul class="plist2">${rest.map(row)}</ul></section>
        ${tiada.length > 0 && html`<section><h3 class="sec">Belum ada atau sudah berubah pada ${year} M</h3><ul class="plist2 dim">${tiada.map(row)}</ul></section>`}
        ${(K.belumDipetakan || []).length > 0 && html`<section><h3 class="sec">Belum bisa dipetakan</h3>
          ${K.belumDipetakan.map((b) => html`<div class="unmapped" key=${b.id}><p><b>${b.nama}.</b> ${b.ket}</p>
            ${b.riwayat.map((r, i) => html`<${Riwayat} key=${i} r=${r} year=${year} onProfile=${onProfile} onLihat=${setCsel} K=${K} />`)}</div>`)}
        </section>`}
        <section><h3 class="sec">Sumber</h3><ul class="srcs">${K.sumber.map((s) => html`<li key=${s.url}><a href=${s.url} target="_blank" rel="noopener">${s.judul}</a></li>`)}</ul></section>
      </div>
    </aside>`;
  }

  // ---------- Tentang dan daftar sumber ----------
  const KOLEKSI = { bukhari: "Shahih Bukhari", muslim: "Shahih Muslim", tirmidhi: "Jami' At-Tirmidzi", ahmad: "Musnad Ahmad", abudawud: "Sunan Abu Dawud", nasai: "Sunan An-Nasa'i", ibnmajah: "Sunan Ibnu Majah" };
  const KITAB = [
    ["Sirah Ibnu Hisyam (dari Ibnu Ishaq)", "urutan peristiwa, tahun, dan kisah yang ditandai \"kitab sirah\""],
    ["Tafsir Ibnu Katsir", "penjelasan sebab turun beberapa ayat"],
    ["As-Suyuthi, Al-Itqan fi 'Ulum al-Qur'an", "pembahasan ayat yang pertama dan terakhir turun"],
    ["Al-Mubarakfuri, Ar-Rahiq al-Makhtum", "perhitungan tanggal wahyu pertama"],
    ["Al-Azraqi, Akhbar Makkah (melalui kajian yang dikutip)", "letak rumah-rumah di sekitar Ka'bah"]
  ];
  const TEKNIS = [
    ["Urutan turun dan golongan surah: mushaf standar Mesir (Al-Azhar, 1924) melalui paket quran-meta", "https://www.npmjs.com/package/quran-meta"],
    ["Terjemah ayat disusun mengikuti gaya terjemahan Kementerian Agama RI; teks Arab dan terjemahnya perlu dicek dengan mushaf", ""],
    ["React 18, htm, dan Three.js r128", "https://threejs.org"],
    ["Huruf Amiri, Amiri Quran, Literata, dan Instrument Sans dari Google Fonts", "https://fonts.google.com"]
  ];
  function collectSources() {
    const seen = new Map();
    const walk = (o, depth) => {
      if (!o || typeof o !== "object" || depth > 9) return;
      if (Array.isArray(o)) { o.forEach((x) => walk(x, depth + 1)); return; }
      if (typeof o.url === "string" && /^https?:/.test(o.url) && !seen.has(o.url)) seen.set(o.url, o.s || o.sumber || o.judul || o.t || o.url);
      if (typeof o.wu === "string" && /^https?:/.test(o.wu) && !seen.has(o.wu)) seen.set(o.wu, o.ws || o.wu);
      if (typeof o.wiki === "string" && /^https?:/.test(o.wiki) && !seen.has(o.wiki)) seen.set(o.wiki, o.nama ? "Profil " + o.nama : o.wiki);
      Object.values(o).forEach((v) => { if (v && typeof v === "object") walk(v, depth + 1); });
    };
    [window.SIRAH, window.MEKAH, window.MADINAH, window.HIJRAH, window.PERANG, window.PERANG_SKENARIO, window.NUZUL, window.NUZUL_RUJUKAN, window.SURAH, window.TONTONAN].forEach((x) => walk(x, 0));
    if (window.SIRAH_KERABAT) window.SIRAH_KERABAT.EDGES.forEach((e) => { if (e.src && !seen.has(e.src)) seen.set(e.src, e.note || e.src); });
    const hadits = {}, lain = {};
    for (const [url, label] of seen) {
      const m = url.match(/(?:sunnah\.com|hadithunlocked\.com)\/([a-z]+):(\w+)/);
      if (m) { (hadits[m[1]] = hadits[m[1]] || new Map()).set(m[2], url); continue; }
      const host = new URL(url).hostname.replace(/^www\.|^en\./, "");
      (lain[host] = lain[host] || []).push({ url, label: String(label).replace(/\[ref:\w+\]/g, "") });
    }
    const num = (k) => parseInt(k, 10) || 0;
    return {
      total: seen.size,
      hadits: Object.entries(hadits).map(([k, m]) => ({ k, nama: KOLEKSI[k] || k, list: [...m].sort((a, b) => num(a[0]) - num(b[0]) || a[0].localeCompare(b[0])) }))
        .sort((a, b) => b.list.length - a.list.length),
      lain: Object.entries(lain).sort((a, b) => b[1].length - a[1].length)
    };
  }
  const HOST = { "wikipedia.org": "Wikipedia", "quran.com": "Quran.com (tafsir)", "okaz.com.sa": "Okaz (surat kabar Saudi)", "al-furqan.com": "Al-Furqan Heritage Foundation" };
  function About({ onClose }) {
    const [tab, setTab] = useState("tentang");
    const src = useMemo(collectSources, []);
    const nHadits = src.hadits.reduce((a, h) => a + h.list.length, 0);
    useEffect(() => { const k = (e) => e.key === "Escape" && onClose(); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, []);
    return html`<div class="overlay" onClick=${onClose}>
      <div class="profile about" role="dialog" aria-modal="true" aria-label="Tentang Jejak Sirah" onClick=${(e) => e.stopPropagation()}>
        <button type="button" class="close" onClick=${onClose} aria-label="Tutup">×</button>
        <h2>Tentang Jejak Sirah</h2>
        <div class="tabs about-tabs" role="tablist">
          <button role="tab" aria-selected=${tab === "tentang"} onClick=${() => setTab("tentang")}>Tentang</button>
          <button role="tab" aria-selected=${tab === "sumber"} onClick=${() => setTab("sumber")}>Sumber (${src.total + KITAB.length})</button>
        </div>
        ${tab === "tentang" ? html`<div class="about-body">
          <p>Jejak Sirah adalah aplikasi pengetahuan sejarah Islam dari Tahun Gajah (570 M) sampai akhir Khulafaur Rasyidin (661 M) dalam bentuk peta 3D, timeline, tontonan peristiwa, dan asbabun nuzul.</p>
          <div class="author"><span class="medal medal-md" aria-hidden="true"><span class="medal-ar">ر</span></span>
            <div><p class="ph-k">Dibuat oleh</p><b>Ramdani</b><a href="mailto:ramd4ni@gmail.com">ramd4ni@gmail.com</a></div></div>
          <h3>Isi aplikasi</h3>
          <ul class="about-list">
            <li><b>Peta wilayah</b> ${Object.keys(D.lokasi).length} tempat, ${D.peristiwa.length} peristiwa, dan ${Object.keys(D.tokoh).length} tokoh, mengikuti tahun di timeline.</li>
            <li><b>Tokoh</b> ${Object.keys(D.tokoh).length} tokoh dengan profil, tempat tinggal per periode, rumah di peta Mekah bila tercatat, dan kejadian yang melibatkannya.</li>
            <li><b>Kota Mekah</b> ${window.MEKAH.tempat.length} tempat dengan tingkat keyakinan lokasi, jalan kaki, dan ${Object.keys(window.TONTONAN).length} tontonan peristiwa.</li>
            ${window.MADINAH && html`<li><b>Kota Madinah</b> ${window.MADINAH.tempat.length} tempat: Masjid Nabawi per tahap pembangunan, Quba, Baqi', benteng, sumur, kebun kurma, Uhud, dan parit Khandaq.</li>`}
            ${window.HIJRAH && html`<li><b>Hijrah</b> ${window.HIJRAH.episode.length} kejadian berurutan dengan tanggal, tempat, rute di peta wilayah, dan derajat riwayatnya.</li>`}
            ${window.PERANG && html`<li><b>Perang</b> ${window.PERANG.daftar.length} ekspedisi (27 ghazwah menurut Ibnu Ishaq dan Bani Qainuqa'), dengan jumlah pasukan, korban, kronologi, dan ${window.PERANG_SKENARIO ? Object.keys(window.PERANG_SKENARIO).length : 0} simulasi susunan pasukan.</li>`}
            ${window.SIRAH_KERABAT && html`<li><b>Kekerabatan</b> ${window.SIRAH_KERABAT.EDGES.length} hubungan keluarga, pernikahan, susuan, dan muakhah, dengan pencari jalur hubungan dua tokoh.</li>`}
            <li><b>Asbabun Nuzul</b> ${window.NUZUL.urutan.length} kejadian (${Object.keys(window.NUZUL.artikel).length} sudah lengkap) dan 114 surah dengan waktu turunnya.${window.NUZUL_RUJUKAN ? ` Setiap kejadian dicek silang ke ${Object.values(window.NUZUL_RUJUKAN.entries).reduce((a, e) => a + e.rujukan.length, 0)} rujukan: kitab asbabun nuzul (Al-Wahidi, As-Suyuthi, Muqbil Al-Wadi'i), tafsir, hadits, dan Tafsir Kemenag RI.` : ""}</li>
          </ul>
          <h3>Batasan</h3>
          <p>Narasi, tahun, letak tempat, dan dialog tontonan adalah rekonstruksi dari sumber yang tercantum. Rasulullah ﷺ, para nabi, dan malaikat tidak pernah digambarkan; mereka hanya tampil sebagai nama dan cahaya.</p>
          <p class="disclaimer"><b>Disklaimer.</b> Informasi di aplikasi ini bersifat edukatif dan masih draf. Mohon validasi setiap informasi kepada ustadz atau langsung ke sumber aslinya sebelum dikutip, diajarkan, atau disebarkan. Kami tidak bertanggung jawab atas apa pun yang mengatasnamakan aplikasi ini atau pembuatnya.</p>
          <p class="dim">Disusun dengan bantuan AI (Claude). Setiap riwayat diberi label derajat dan tautan ke sumbernya supaya bisa diperiksa.</p>
          <button type="button" class="nz-btn" onClick=${() => setTab("sumber")}>Lihat semua sumber</button>
        </div>` : html`<div class="about-body">
          <p class="dim">Dikumpulkan otomatis dari seluruh data aplikasi: ${nHadits} hadits dan ${src.total - nHadits} halaman lain, ditambah kitab rujukan.</p>
          <h3>Hadits</h3>
          ${src.hadits.map((h) => html`<div class="src-group" key=${h.k}><p><b>${h.nama}</b> <span>${h.list.length} hadits</span></p>
            <div class="src-nums">${h.list.map(([n, url]) => html`<a key=${n} href=${url} target="_blank" rel="noopener">${n}</a>`)}</div></div>`)}
          <h3>Kitab rujukan</h3>
          <ul class="about-list">${KITAB.map(([k, v]) => html`<li key=${k}><b>${k}</b> ${v}</li>`)}</ul>
          <h3>Halaman web</h3>
          ${src.lain.map(([host, list]) => html`<div class="src-group" key=${host}><p><b>${HOST[host] || host}</b> <span>${list.length} halaman</span></p>
            <ul class="src-links">${list.map((x) => html`<li key=${x.url}><a href=${x.url} target="_blank" rel="noopener">${x.label}</a></li>`)}</ul></div>`)}
          <h3>Data dan teknologi</h3>
          <ul class="about-list">${TEKNIS.map(([k, u]) => html`<li key=${k}>${u ? html`<a href=${u} target="_blank" rel="noopener">${k}</a>` : k}</li>`)}</ul>
        </div>`}
      </div>
    </div>`;
  }

  // ---------- Catatan draf (satu tempat untuk seluruh aplikasi) ----------
  function DraftNote() {
    const [open, setOpen] = useState(false), ref = useRef(null);
    useEffect(() => {
      if (!open) return;
      const off = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
      document.addEventListener("pointerdown", off); return () => document.removeEventListener("pointerdown", off);
    }, [open]);
    return html`<div class="draft-note pop" ref=${ref}>
      <button type="button" class="badge" aria-expanded=${open} onClick=${() => setOpen(!open)}>Draf, belum diverifikasi ustadz</button>
      ${open && html`<div class="pop-box down" role="dialog" aria-label="Tentang isi aplikasi">
        <p>Narasi, tahun, letak tempat, dialog tontonan, dan rujukan hadits masih draf. Setiap riwayat diberi label derajat (shahih, kitab sirah, atau lemah) dan tautan sumbernya.</p>
        <p class="disclaimer"><b>Disklaimer.</b> Informasi di aplikasi ini bersifat edukatif dan masih draf. Mohon validasi setiap informasi kepada ustadz atau langsung ke sumber aslinya sebelum dikutip, diajarkan, atau disebarkan. Kami tidak bertanggung jawab atas apa pun yang mengatasnamakan aplikasi ini atau pembuatnya.</p>
      </div>`}
    </div>`;
  }

  // ---------- App ----------
  const NAV = [
    ["wilayah", "Peta wilayah", "Jazirah Arab dan sekitarnya"],
    ["kota", "Kota", "Mekah dan Madinah 3D"],
    ["hijrah", "Hijrah", "Perjalanan ke Madinah"],
    ["perang", "Perang", "27 ghazwah dan simulasinya"],
    ["tokoh", "Tokoh", "Profil, tempat tinggal, kejadian"],
    ["kerabat", "Kekerabatan", "Jaringan keluarga dan sahabat"],
    ["nuzul", "Asbabun Nuzul", "Sebab turunnya ayat, per surah"]
  ].filter(([v]) => (v !== "hijrah" || window.HIJRAH) && (v !== "perang" || window.PERANG));
  const BACA = ["nuzul", "hijrah", "perang"]; // halaman baca yang bisa memutar tontonan lalu kembali

  // ---------- Alamat halaman (hash), misalnya #/perang/uhud atau #/kota/madinah/masjid-nabawi?tahun=625 ----------
  const VIEW_URL = { wilayah: "peta", kota: "kota", hijrah: "hijrah", perang: "perang", tokoh: "tokoh", kerabat: "kerabat", nuzul: "nuzul" };
  const URL_VIEW = Object.fromEntries(Object.entries(VIEW_URL).map(([k, v]) => [v, k]));
  function bacaHash() {
    let h = "";
    try { h = decodeURIComponent((window.location.hash || "").replace(/^#\/?/, "")); } catch (e) { h = ""; }
    const [path, q] = h.split("?"), seg = (path || "").split("/").filter(Boolean);
    const qs = new URLSearchParams(q || ""), t = +qs.get("tahun"), jk = qs.get("jejak");
    return { view: URL_VIEW[seg[0]] || null, seg: seg.slice(1), tahun: t >= Y0 && t <= Y1 ? t : null, jejak: jk && D.tokoh[jk] ? jk : null };
  }
  const tulisHash = (view, seg, tahun, jejak) => {
    const q = [tahun ? "tahun=" + tahun : "", jejak ? "jejak=" + encodeURIComponent(jejak) : ""].filter(Boolean).join("&");
    return "#/" + [VIEW_URL[view], ...seg.filter((x) => x != null && x !== "")].map((x) => encodeURIComponent(x)).join("/") + (q ? "?" + q : "");
  };
  // Terjemahkan alamat menjadi keadaan awal aplikasi
  function dariHash(h) {
    const r = {}, [a, b, c] = h.seg;
    if (!h.view) return r;
    r.view = h.view;
    if (h.tahun) r.year = h.tahun;
    if (h.view === "wilayah" || h.view === "kota") r.jejak = h.jejak;
    if (h.view === "wilayah") r.sel = a && D.lokasi[a] ? a : null;
    if (h.view === "kota") { r.kota = a === "madinah" && window.MADINAH ? "madinah" : "mekah"; const K0 = kotaData(r.kota); r.csel = b && K0.tempat.some((p) => p.id === b) ? b : null; }
    if (h.view === "hijrah" && window.HIJRAH) r.hjSel = a && window.HIJRAH.episode.some((e) => e.id === a) ? a : null;
    if (h.view === "perang" && window.PERANG) { r.prSel = a && window.PERANG.daftar.some((p) => p.id === a) ? a : null; r.sim = r.prSel && b === "simulasi" && window.PERANG_SKENARIO && window.PERANG_SKENARIO[a] ? a : null; }
    if (h.view === "tokoh") r.tokohSel = a && D.tokoh[a] ? a : "nabi";
    if (h.view === "kerabat") r.krRute = a === "fokus" ? { fokus: b } : a && b ? { dari: a, ke: b } : null;
    if (h.view === "nuzul" && window.NUZUL) {
      if (a === "pustaka") { r.nzTab = "pustaka"; r.nuzulSel = null; }
      else if (a === "surah") { r.nzTab = "surah"; r.nzSurah = Math.max(1, Math.min(114, +b || 96)); r.nuzulSel = null; }
      else { r.nzTab = "kejadian"; r.nuzulSel = a && window.NUZUL.urutan.some((u) => u.id === a) ? a : window.NUZUL.urutan[0].id; }
    }
    return r;
  }
  const H0 = dariHash(bacaHash());

  function App() {
    const [year, setYear] = useState(H0.year || (H0.view === "kota" && H0.kota === "madinah" ? 622 : 610));
    const [sel, setSel] = useState(H0.view === "wilayah" ? H0.sel : "makkah");
    const [profile, setProfile] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [view, setView] = useState(H0.view || "wilayah");
    const [kota, setKota] = useState(H0.kota || "mekah");
    const [csel, setCsel] = useState(H0.csel || null);
    const [krRute, setKrRute] = useState(H0.krRute || null);
    const [jejak, setJejak] = useState(H0.jejak || null);
    const [walkReq, setWalkReq] = useState(null);
    const [story, setStory] = useState(null);
    const storyFrom = useRef(null);
    const [about, setAbout] = useState(false);
    const [nuzulSel, setNuzulSel] = useState(H0.nuzulSel || null), [nzTab, setNzTab] = useState(H0.nzTab || "kejadian"), [nzSurah, setNzSurah] = useState(H0.nzSurah || null);
    const [tokohSel, setTokohSel] = useState(H0.tokohSel || "nabi");
    const [hjSel, setHjSel] = useState(H0.view === "hijrah" ? H0.hjSel : window.HIJRAH ? window.HIJRAH.episode[0].id : null);
    const [prSel, setPrSel] = useState(H0.view === "perang" ? H0.prSel : "badar"), [sim, setSim] = useState(H0.sim || null);
    const [ruteHi, setRuteHi] = useState(null), [focusReq, setFocusReq] = useState(null);

    const eventsYear = useMemo(() => D.peristiwa.filter((e) => e.tahun === year), [year]);
    const activeLoks = useMemo(() => new Set([...eventsYear.map((e) => e.lok), ...perangDi(null, year).map((p) => p.lokPeta).filter(Boolean)]), [eventsYear, year]);
    const wargaAt = useMemo(() => {
      const m = {};
      Object.entries(D.tokoh).forEach(([id, t]) => { if (!alive(t, year) || !D.tinggalPada) return; const r = D.tinggalPada(t, year); if (r && r[0]) (m[r[0]] = m[r[0]] || []).push(id); });
      return m;
    }, [year]);
    const tokohAt = useMemo(() => {
      const m = {};
      eventsYear.forEach((e) => { m[e.lok] = [...new Set([...(m[e.lok] || []), ...e.tokoh])]; });
      return m;
    }, [eventsYear]);

    useEffect(() => {
      if (!playing) return;
      const t = setTimeout(() => {
        const n = EVENT_YEARS.find((y) => y > year);
        if (n === undefined) { setPlaying(false); return; }
        setYear(n);
        const first = D.peristiwa.find((e) => e.tahun === n) || perangDi(null, n)[0];
        if (first) setSel(first.lok || first.lokPeta);
      }, 2600);
      return () => clearTimeout(t);
    }, [playing, year]);

    // Alamat mengikuti halaman yang dibuka; tombol kembali di peramban ikut bekerja
    const hashKini = (() => {
      if (view === "wilayah") return tulisHash(view, [sel], year, jejak);
      if (view === "kota") return tulisHash(view, [kota, csel], year, jejak);
      if (view === "hijrah") return tulisHash(view, [hjSel]);
      if (view === "perang") return tulisHash(view, [prSel, sim ? "simulasi" : null]);
      if (view === "tokoh") return tulisHash(view, [tokohSel]);
      if (view === "kerabat") return tulisHash(view, krRute ? (krRute.fokus ? ["fokus", krRute.fokus] : [krRute.dari, krRute.ke]) : []);
      if (view === "nuzul") return tulisHash(view, nzTab === "pustaka" ? ["pustaka"] : nzTab === "surah" && !nuzulSel ? ["surah", nzSurah] : [nuzulSel]);
      return "#/";
    })();
    const pertama = useRef(true);
    useEffect(() => {
      if (story) return;
      const cur = window.location.hash || "";
      if (cur === hashKini) { pertama.current = false; return; }
      const jalan = (x) => x.split("?")[0];
      try {
        if (pertama.current || jalan(cur) === jalan(hashKini)) window.history.replaceState(null, "", hashKini);
        else window.history.pushState(null, "", hashKini);
      } catch (e) { /* alamat tidak bisa diubah di lingkungan ini */ }
      pertama.current = false;
    }, [hashKini, story]);
    useEffect(() => {
      const balik = () => {
        const r = dariHash(bacaHash()); if (!r.view) return;
        setStory(null); setProfile(null); setPlaying(false);
        if (r.year) setYear(r.year);
        if ("sel" in r) setSel(r.sel);
        if (r.kota) setKota(r.kota);
        if ("csel" in r) setCsel(r.csel);
        if ("hjSel" in r) setHjSel(r.hjSel);
        if ("prSel" in r) { setPrSel(r.prSel); setSim(r.sim || null); }
        if (r.tokohSel) setTokohSel(r.tokohSel);
        if ("krRute" in r) setKrRute(r.krRute);
        if ("jejak" in r) setJejak(r.jejak || null);
        if (r.nzTab) { setNzTab(r.nzTab); setNuzulSel(r.nuzulSel || null); if (r.nzSurah) setNzSurah(r.nzSurah); }
        setView(r.view);
      };
      window.addEventListener("popstate", balik); window.addEventListener("hashchange", balik);
      return () => { window.removeEventListener("popstate", balik); window.removeEventListener("hashchange", balik); };
    }, []);

    const city = view === "kota";
    const reset = () => { setPlaying(false); setStory(null); storyFrom.current = null; setProfile(null); setSim(null); };
    const go = (v) => {
      reset();
      if (v === "nuzul") { if (nzTab === "kejadian") setNuzulSel(nuzulSel || window.NUZUL.urutan[0].id); else if (!nzSurah) setNzSurah(96); }
      if (v === "wilayah" && view === "kota" && kota === "mekah") setSel("makkah");
      if (v === "wilayah" && view === "kota" && kota === "madinah") setSel("madinah");
      if (v !== "wilayah") setRuteHi(null);
      setView(v);
    };
    const bukaKota = (k, pid, y) => { reset(); setKota(k); if (y != null) setYear(y); setCsel(pid || null); setView("kota"); };
    const pickTab = (t) => { setNzTab(t); if (t === "pustaka") return; if (t === "surah") { setNuzulSel(null); setNzSurah(nzSurah || 96); } else if (!nuzulSel) setNuzulSel(window.NUZUL.urutan[0].id); };
    window.__wiki = (id) => { reset(); setView("nuzul"); setNzTab("kejadian"); setNuzulSel(id); };
    window.__buka = (v, id) => { reset(); if (v === "hijrah") setHjSel(id); if (v === "perang") setPrSel(id); if (v === "tokoh") setTokohSel(id); setView(v); };
    window.__tonton = (id) => {
      const ev = window.TONTONAN[id]; if (!ev) return;
      storyFrom.current = BACA.includes(view) ? view : null;
      setPlaying(false); setProfile(null); setSim(null); setYear(ev.tahun); setKota(ev.kota || "mekah"); setCsel(null); setView("kota"); setStory(id);
    };
    const endStory = () => { setStory(null); if (storyFrom.current) setView(storyFrom.current); storyFrom.current = null; };
    const gotoLok = (lok, y, id) => { reset(); setView("wilayah"); setYear(y); setSel(lok); setRuteHi(null); if (id) setJejak(id); };
    const goto = (e, id) => { reset(); setView("wilayah"); setYear(e.tahun); setSel(e.lok); if (id) setJejak(id); };
    const gotoCity = (pid, r, k, id) => { bukaKota(k || "mekah", pid, r && r.t ? r.t[0] : null); if (id) setJejak(id); };
    const jejakNow = jejak && D.tokoh[jejak] && D.tinggalPada ? D.tinggalPada(D.tokoh[jejak], year) : null;
    const jejakLok = jejakNow && alive(D.tokoh[jejak], year) ? jejakNow[0] : null;
    const jr = useMemo(() => (jejak ? jejakRute(jejak, year) : null), [jejak, year]);
    const jejakBar = jejak && D.tokoh[jejak] ? html`<${JejakBar} id=${jejak} year=${year} kota=${view === "kota" ? kota : null} onClose=${() => setJejak(null)} onProfile=${setProfile}
      onKota=${(k) => bukaKota(k, null, k === "madinah" ? Math.max(622, year) : year)} onSelect=${(pid) => { setPlaying(false); setCsel(pid); }} onLok=${(lok, y) => { setYear(y); setSel(lok); }} />` : null;
    const activeIds = useMemo(() => new Set(kotaData(kota).tempat.filter((p) => placeActive(p, year)).map((p) => p.id)), [year, kota]);

    // Hijrah dan perang ke peta
    const ruteJejak = view === "wilayah" && jr && jr.pts.length > 1 ? jr.pts : null;
    const ruteTampil = ruteJejak || (window.HIJRAH && view === "wilayah" && (year === 622 || ruteHi) ? window.HIJRAH.rute : null);
    const ruteHiTampil = ruteJejak ? { i: jr.i, label: `${D.tokoh[jejak].nama.split(" ")[0]}, ${year} M` } : ruteHi;
    const lihatHijrah = (e) => {
      const t = e.tempat || {}; setJejak(null);
      if (t.kota && (t.kota === "mekah" || window.MadinahScene)) { bukaKota(t.kota, t.id, e.tahun); return; }
      reset(); setYear(e.tahun); setSel(null); setView("wilayah");
      const i = window.SirahHijrahRute ? window.SirahHijrahRute(e) : -1;
      setRuteHi({ i, label: e.judul });
      const pt = t.lat != null ? t : window.HIJRAH.rute[Math.max(0, i)];
      setFocusReq({ lon: pt.lon, lat: pt.lat, dist: 11, k: Date.now() });
    };
    const lihatRute = () => { reset(); setJejak(null); setYear(622); setSel(null); setView("wilayah"); setRuteHi({ i: -1, label: "" }); setFocusReq({ lon: 39.4, lat: 22.9, dist: 16, k: Date.now() }); };
    const lihatPerang = (p) => { reset(); setJejak(null); setYear(p.tahun); setView("wilayah"); setSel(p.lokPeta || null); if (!p.lokPeta && p.tempat) setFocusReq({ lon: p.tempat.lon, lat: p.tempat.lat, dist: 12, k: Date.now() }); };

    const reader = (() => {
      if (view === "kerabat" && window.SirahKerabat) return html`<${window.SirahKerabat} rute=${krRute} onRute=${(r) => setKrRute((o) => (JSON.stringify(o) === JSON.stringify(r) ? o : r))}
        onProfile=${setProfile} onTokoh=${(id) => { setProfile(null); setTokohSel(id); setView("tokoh"); }} />`;
      if (view === "tokoh") return html`<${TokohList} sel=${tokohSel} onSelect=${setTokohSel} year=${year} />
        <section class="nz-detail tk-detail" key=${tokohSel} aria-label="Profil tokoh"><${ProfileBody} id=${tokohSel} year=${year} onGoto=${goto} onGotoCity=${gotoCity} onGotoLok=${gotoLok} /></section>`;
      if (view === "hijrah" && window.SirahHijrahList) return html`<${window.SirahHijrahList} sel=${hjSel} onSelect=${setHjSel} onRute=${lihatRute} />
        ${hjSel && !story && html`<${window.SirahHijrahDetail} id=${hjSel} onSelect=${setHjSel} onClose=${() => setHjSel(null)} onWatch=${(id) => window.__tonton(id)}
          onMap=${lihatHijrah} onProfile=${setProfile} />`}
        ${!hjSel && html`<section class="nz-detail nz-empty"><h2>Pilih kejadian di kanan</h2><p>Setiap kejadian hijrah punya tanggal, tempat, tokoh, dan riwayat beserta derajatnya. Sebagian bisa diputar sebagai tontonan.</p></section>`}`;
      if (view === "perang" && window.SirahPerangList) return html`<${window.SirahPerangList} sel=${prSel} onSelect=${(id) => { setSim(null); setPrSel(id); }} />
        ${sim ? html`<${window.SirahPerangSim} key=${sim} id=${sim} onClose=${() => setSim(null)} onProfile=${setProfile} />`
          : prSel ? html`<${window.SirahPerangDetail} id=${prSel} onSelect=${setPrSel} onClose=${() => setPrSel(null)} onWatch=${(id) => window.__tonton(id)}
              onMap=${lihatPerang} onProfile=${setProfile} onSim=${setSim} />`
          : html`<section class="nz-detail nz-empty"><h2>Pilih ghazwah di kanan</h2><p>Lihat jumlah pasukan, panglima, korban, dan jalannya peristiwa. Sembilan perang yang terjadi pertempuran punya simulasi susunan pasukan.</p></section>`}`;
      if (view === "nuzul" && window.SirahNuzulList) return html`<${window.SirahNuzulList} sel=${nuzulSel} onSelect=${(id) => { setNzTab("kejadian"); setNuzulSel(id); }} tab=${nzTab} onTab=${pickTab} surah=${nzSurah} onSurah=${(n) => { setNuzulSel(null); setNzSurah(n); }} />
        ${nzTab === "pustaka" && window.SirahNuzulPustaka && html`<${window.SirahNuzulPustaka} />`}
        ${nzTab !== "pustaka" && nuzulSel && !story && window.SirahNuzulDetail && html`<${window.SirahNuzulDetail} id=${nuzulSel} onSelect=${setNuzulSel} onClose=${() => setNuzulSel(null)}
          onWatch=${(id) => window.__tonton(id)} onProfile=${setProfile}
          onMap=${(pt) => { if (pt.tempat) bukaKota(pt.kota === "madinah" && window.MADINAH ? "madinah" : "mekah", pt.tempat, pt.tahun); else { reset(); setYear(pt.tahun); setView("wilayah"); setSel(pt.lok); } }} />`}
        ${nzTab !== "pustaka" && !nuzulSel && !(nzTab === "surah" && nzSurah) && html`<section class="nz-detail nz-empty">
          <h2>Pilih dari daftar di kanan</h2>
          <p>Buka satu kejadian untuk membaca mengapa ayatnya turun dan memutar kejadiannya, atau pilih tab Per surah untuk melihat kapan setiap surah diturunkan.</p></section>`}
        ${nzTab === "surah" && !nuzulSel && nzSurah && !story && window.SirahSurahDetail && html`<${window.SirahSurahDetail} no=${nzSurah}
          onSelect=${setNuzulSel} onSurah=${setNzSurah} onClose=${() => setNzSurah(null)} />`}`;
      return null;
    })();

    return html`<div class=${`app${city ? " in-city" : ""}${view === "perang" && sim ? " sim-fokus" : ""}`}>
      <header class="top">
        <div class="brand"><h1>Jejak Sirah</h1><p>570–661 M, dari Tahun Gajah sampai Khulafaur Rasyidin</p></div>
        <nav class="nav" aria-label="Bagian utama">
          ${NAV.map(([v, l, d]) => html`<button type="button" key=${v} class=${view === v ? "on" : ""} aria-current=${view === v ? "page" : undefined} onClick=${() => go(v)}><b>${l}</b><small>${d}</small></button>`)}
        </nav>
        <div class="top-end"><${DraftNote} /><button type="button" class="about-btn" onClick=${() => setAbout(true)}>Tentang</button></div>
      </header>
      ${city
        ? html`<${CityMap} key=${"peta-" + kota} kota=${kota} onKota=${(k) => { setCsel(null); setKota(k); }} year=${year} csel=${csel} activeIds=${activeIds} onSelect=${(id) => { setPlaying(false); setCsel(id); }}
            onOverview=${() => setCsel(null)} onBack=${() => go("wilayah")} walkReq=${walkReq}
            story=${story} onStoryEnd=${endStory} jejak=${jejak} jejakBar=${jejakBar} />`
        : html`<${MapView} year=${year} sel=${sel} activeLoks=${activeLoks} tokohAt=${tokohAt} wargaAt=${wargaAt}
            onSelect=${(id) => { setPlaying(false); setSel(id); }} onProfile=${setProfile}
            onOverview=${() => { setSel(null); setRuteHi(null); }} rute=${ruteTampil} ruteHi=${ruteHiTampil} focusReq=${focusReq}
            ruteNama=${ruteJejak ? "Jejak tempat tinggal " + D.tokoh[jejak].nama : null} jejak=${jejak} jejakLok=${jejakLok} jejakBar=${jejakBar} />`}
      ${(view === "wilayah" || city) && html`<${Timeline} year=${year} setYear=${setYear} playing=${playing} setPlaying=${setPlaying} />`}
      ${reader || (city
        ? html`<${CityPanel} key=${"panel-" + kota} kota=${kota} year=${year} csel=${csel} setCsel=${setCsel} onProfile=${setProfile} activeIds=${activeIds} jejak=${jejak}
            onWalk=${(id) => { setPlaying(false); setWalkReq({ id, k: Date.now() }); }} />`
        : html`<${Panel} year=${year} sel=${sel} eventsYear=${eventsYear} onProfile=${setProfile} setYear=${setYear} select=${setSel}
            onEnterCity=${(k) => bukaKota(k || "mekah", null)} onPerang=${(id) => window.__buka("perang", id)} />`)}
      ${about && html`<${About} onClose=${() => setAbout(false)} />`}
      ${profile && html`<${Profile} id=${profile} year=${year} onClose=${() => setProfile(null)} onGoto=${goto} onGotoCity=${gotoCity} onGotoLok=${gotoLok} />`}
    </div>`;
  }

  ReactDOM.createRoot(document.getElementById("root")).render(html`<${App} />`);
})();
