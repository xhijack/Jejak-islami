(function () {
  const { useState, useEffect, useRef, useMemo } = React;
  const html = htm.bind(React.createElement);
  const D = window.SIRAH;
  const Y0 = 570, Y1 = 661;
  const EVENT_YEARS = [...new Set(D.peristiwa.map((e) => e.tahun))].sort((a, b) => a - b);

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

  // ---------- Peta ----------
  function MapView({ year, sel, activeLoks, tokohAt, onSelect, onProfile, onOverview }) {
    const box = useRef(null), api = useRef(null), nodes = useRef({});
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
    useEffect(() => { if (!api.current) return; sel ? api.current.select(sel) : api.current.overview(); }, [sel]);

    return html`<section class="map" aria-label="Peta 3D">
      <div class="map-canvas" ref=${box}></div>
      <div class="map-labels">
        ${Object.entries(D.lokasi).map(([id, l]) => {
          const act = activeLoks.has(id), tk = tokohAt[id] || [];
          return html`<div key=${id} class=${`pin${act ? " is-active" : ""}${sel === id ? " is-sel" : ""}`} ref=${reg(id)}>
           <div class="pin-wrap">
            <button type="button" class="pin-btn" onClick=${() => onSelect(id)} aria-pressed=${sel === id}>
              <span class="pin-name">${l.nama}</span><span class="pin-ar" lang="ar">${l.arab}</span>
            </button>
            ${act && tk.length > 0 && html`<div class="pin-medals">
              ${tk.slice(0, 3).map((t) => html`<${Medal} key=${t} id=${t} size="sm" onClick=${onProfile} />`)}
              ${tk.length > 3 && html`<button type="button" class="more" onClick=${() => onSelect(id)}>+${tk.length - 3}</button>`}
            </div>`}
           </div>
          </div>`;
        })}
      </div>
      <div class="map-tools">
        <div class="panpad" aria-label="Geser peta">
          <button type="button" class="u" ...${hold("w")} aria-label="Geser ke atas">▲</button>
          <button type="button" class="l" ...${hold("a")} aria-label="Geser ke kiri">◀</button>
          <button type="button" class="r" ...${hold("d")} aria-label="Geser ke kanan">▶</button>
          <button type="button" class="d" ...${hold("s")} aria-label="Geser ke bawah">▼</button>
        </div>
        <button type="button" onClick=${() => api.current.zoom(0.8)} aria-label="Perbesar">+</button>
        <button type="button" onClick=${() => api.current.zoom(1.25)} aria-label="Perkecil">−</button>
        <button type="button" onClick=${() => api.current.rotate(-0.4)} aria-label="Putar kiri">⟲</button>
        <button type="button" onClick=${() => api.current.rotate(0.4)} aria-label="Putar kanan">⟳</button>
        <button type="button" class="wide" onClick=${onOverview}>Seluruh peta</button>
      </div>
      <p class="map-hint">Seret untuk menggeser, klik kanan atau Shift+seret untuk memutar, scroll untuk zoom, klik nama kota untuk detail.</p>
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
  function Panel({ year, sel, eventsYear, onProfile, setYear, select, onEnterCity }) {
    const [tab, setTab] = useState("peristiwa");
    const l = sel && D.lokasi[sel];
    const here = sel ? eventsYear.filter((e) => e.lok === sel) : eventsYear;
    const allHere = sel ? D.peristiwa.filter((e) => e.lok === sel) : [];
    const prev = [...allHere].reverse().find((e) => e.tahun < year), next = allHere.find((e) => e.tahun > year);
    const hereTokoh = new Set(here.flatMap((e) => e.tokoh));
    const living = Object.entries(D.tokoh).filter(([, t]) => alive(t, year))
      .sort((a, b) => (hereTokoh.has(b[0]) - hereTokoh.has(a[0])) || a[1].lahir - b[1].lahir);
    const goto = (e) => { setYear(e.tahun); select(e.lok); setTab("peristiwa"); };

    return html`<aside class="panel" aria-label="Detail">
      ${l ? html`<div class="loc-head">
          <${Vignette} jenis=${l.jenis} />
          <div class="loc-title"><h2>${l.nama}</h2><span class="loc-ar" lang="ar">${l.arab}</span></div>
          <p class="loc-ket">${l.ket}</p>
          ${sel === "makkah" && html`<button type="button" class="enter-city" onClick=${onEnterCity}>
            <b>Masuk ke kota Mekah</b><span>Ka'bah, rumah Khadijah, Abu Jahal, Abdul Muthalib, dan lainnya</span></button>`}
        </div>`
        : html`<div class="loc-head plain"><h2>Tahun ${year} M</h2><p class="loc-ket">${eraFor(year).nama}. ${here.length ? `${here.length} peristiwa tercatat di peta tahun ini. Pilih kota untuk melihat detailnya.` : "Belum ada peristiwa tercatat di tahun ini. Geser timeline atau pilih kota."}</p></div>`}

      <div class="tabs" role="tablist">
        <button role="tab" aria-selected=${tab === "peristiwa"} onClick=${() => setTab("peristiwa")}>Peristiwa${here.length ? ` (${here.length})` : ""}</button>
        <button role="tab" aria-selected=${tab === "tokoh"} onClick=${() => setTab("tokoh")}>Tokoh yang hidup (${living.length})</button>
      </div>

      <div class="panel-body">
        ${tab === "peristiwa" && (here.length
          ? here.map((e) => html`<${EventCard} key=${e.id} e=${e} onProfile=${onProfile} showLoc=${!sel} onGoto=${goto} />`)
          : html`<div class="empty">
              <p>${sel ? `Tidak ada peristiwa tercatat di ${l.nama} pada ${year} M.` : `Tidak ada peristiwa tercatat pada ${year} M.`}</p>
              ${sel && html`<div class="jump">
                ${prev && html`<button type="button" onClick=${() => setYear(prev.tahun)}><small>Sebelumnya, ${prev.tahun} M</small>${prev.judul}</button>`}
                ${next && html`<button type="button" onClick=${() => setYear(next.tahun)}><small>Berikutnya, ${next.tahun} M</small>${next.judul}</button>`}
              </div>`}
            </div>`)}
        ${tab === "tokoh" && html`<ul class="people">
          ${living.map(([id, t]) => html`<li key=${id}><button type="button" class=${hereTokoh.has(id) ? "here" : ""} onClick=${() => onProfile(id)}>
            <${Medal} id=${id} size="sm" />
            <span><b>${t.nama}</b><small>${hereTokoh.has(id) ? "Terlibat di sini · " : ""}usia ±${year - t.lahir} th</small></span></button></li>`)}
        </ul>`}
      </div>
      <p class="draft">Prototipe internal Sopwer. Narasi dan rujukan masih draf dan harus diverifikasi ustadz sebelum dipakai.</p>
    </aside>`;
  }

  // ---------- Timeline ----------
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
        <div class="eras">${D.eras.map((e) => html`<button type="button" key=${e.id}
            class=${`era${e.id === era.id ? " on" : ""}`}
            style=${{ left: pct(e.dari) + "%", width: pct(Math.min(e.sampai, Y1)) - pct(e.dari) + "%" }}
            onClick=${() => setYear(EVENT_YEARS.find((y) => y + 0.4 >= e.dari) || Math.ceil(e.dari))} title=${e.nama}>
            <span>${e.nama}</span></button>`)}</div>
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
  function Profile({ id, year, onClose, onGoto, onGotoCity }) {
    const t = D.tokoh[id];
    const evs = D.peristiwa.filter((e) => e.tokoh.includes(id));
    const cityRefs = window.MEKAH.tempat.flatMap((p) => p.riwayat.filter((r) => r.tokoh.includes(id) && !r.lihat).map((r) => ({ p, r })))
      .sort((a, b) => (a.r.t ? a.r.t[0] : 0) - (b.r.t ? b.r.t[0] : 0));
    const status = year < t.lahir ? `Belum lahir pada ${year} M.` : year > t.wafat ? `Telah wafat pada ${year} M.` : `Pada ${year} M berusia ±${year - t.lahir} tahun.`;
    useEffect(() => { const k = (e) => e.key === "Escape" && onClose(); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, []);
    return html`<div class="overlay" onClick=${onClose}>
      <div class="profile" role="dialog" aria-modal="true" aria-label=${t.nama} onClick=${(e) => e.stopPropagation()}>
        <button type="button" class="close" onClick=${onClose} aria-label="Tutup">×</button>
        <div class="profile-head">
          <${Medal} id=${id} size="lg" />
          <div><h2>${t.nama}</h2><p class="gelar">${t.gelar}</p><p class="years">${tahunTokoh(t)}</p></div>
        </div>
        <p class="status">${status}</p>
        <p>${t.ringkas}</p>
        <h3>Peristiwa di peta</h3>
        <ol class="plist">${evs.map((e) => html`<li key=${e.id}><button type="button" onClick=${() => onGoto(e)}>
          <span class="py">${e.tahun}</span><span><b>${e.judul}</b><small>${D.lokasi[e.lok].nama}</small></span></button></li>`)}</ol>
        ${cityRefs.length > 0 && html`<h3>Jejak di kota Mekah</h3>
          <ol class="plist">${cityRefs.map(({ p, r }, i) => html`<li key=${i}><button type="button" onClick=${() => onGotoCity(p.id, r)}>
            <span class="py">${r.t ? r.t[0] : "–"}</span><span><b>${r.judul}</b><small>${p.nama}</small></span></button></li>`)}</ol>`}
      </div>
    </div>`;
  }

  // ---------- Kota Mekah ----------
  const K = window.MEKAH;
  const inYear = (r, y) => r.t && y >= r.t[0] && y <= r.t[1];
  const placeActive = (p, y) => p.riwayat.some((r) => inYear(r, y));
  const fmtT = (t) => (!t ? "Sebelum 570 M" : t[0] === t[1] ? `${t[0]} M` : `${t[0]}–${t[1]} M`);

  function CityMap({ year, csel, activeIds, onSelect, onOverview, onBack, walkReq, story, onStoryEnd }) {
    const box = useRef(null), api = useRef(null), nodes = useRef({});
    const [status, setStatus] = useState({ walking: false, detail: 0, cells: 0 });
    const [ready, setReady] = useState(false);
    const [quality, setQualityS] = useState(() => { try { return localStorage.getItem("jejak-kualitas") !== "ringan"; } catch (e) { return true; } });
    const toggleQuality = () => { const q = !quality; setQualityS(q); api.current && api.current.setQuality(q); try { localStorage.setItem("jejak-kualitas", q ? "tinggi" : "ringan"); } catch (e) {} };
    const reg = (id) => (n) => { if (n) nodes.current[id] = n; else delete nodes.current[id]; api.current && api.current.registerLabel(id, n); };
    useEffect(() => {
      let lastS = "";
      api.current = window.MekahScene.create(box.current, { tempat: K.tempat, jalan: K.jalan, year, quality,
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
    return html`<section class=${`map city${walking ? " walking" : ""}${story ? " story-on" : ""}`} aria-label="Peta 3D kota Mekah">
      <div class="map-canvas" ref=${box}></div>
      <div class="map-labels">
        ${K.tempat.map((p) => html`<div key=${p.id} ref=${reg(p.id)}
            class=${`pin k-${p.keyakinan} j-${p.jenis}${activeIds.has(p.id) ? " is-active" : ""}${csel === p.id ? " is-sel" : ""}`}>
          <div class="pin-wrap"><button type="button" class="pin-btn" onClick=${() => onSelect(p.id)} aria-pressed=${csel === p.id}>
            <i class="kdot"></i><span class="pin-name">${p.nama}</span>
          </button></div>
        </div>`)}
      </div>
      <div class="city-top">
        ${walking
          ? html`<button type="button" class="back" onClick=${() => api.current.stopWalk()}>‹ Keluar jalan kaki</button>`
          : html`<button type="button" class="back" onClick=${onBack}>‹ Peta wilayah</button>`}
        <div class="city-title"><b>Kota Mekah</b><span>${walking && status.facing ? `Menghadap ${status.facing}` : `Keadaan sekitar ${year} M`}</span></div>
      </div>
      ${!walking && html`<div class="map-tools">
        <div class="panpad" aria-label="Geser peta">
          <button type="button" class="u" ...${hold("w")} aria-label="Geser ke atas">▲</button>
          <button type="button" class="l" ...${hold("a")} aria-label="Geser ke kiri">◀</button>
          <button type="button" class="r" ...${hold("d")} aria-label="Geser ke kanan">▶</button>
          <button type="button" class="d" ...${hold("s")} aria-label="Geser ke bawah">▼</button>
        </div>
        <button type="button" onClick=${() => api.current.zoom(0.75)} aria-label="Perbesar">+</button>
        <button type="button" onClick=${() => api.current.zoom(1.33)} aria-label="Perkecil">−</button>
        <button type="button" onClick=${() => api.current.rotate(-0.4)} aria-label="Putar kiri">⟲</button>
        <button type="button" onClick=${() => api.current.rotate(0.4)} aria-label="Putar kanan">⟳</button>
        <button type="button" class="wide" onClick=${onOverview}>Seluruh kota</button>
        <button type="button" class="wide walk-btn" onClick=${() => api.current.startWalk(csel)}>Jalan kaki${csel ? " di sini" : ""}</button>
      </div>`}
      ${walking && html`<div class="walk-hud">
        ${status.kabah && html`<p class="kabah-dir">Ka'bah ${status.kabah.dist} m ke arah ${status.kabah.dir}</p>`}
        ${nearP && html`<button type="button" class="near" onClick=${() => onSelect(nearP.id)}>
          <span>Di dekat <b>${nearP.nama}</b>${status.near.dist > 0 ? ` · ${status.near.dist} m` : ""}</span><em>Lihat riwayat</em></button>`}
      </div>
      <div class="dpad" aria-label="Tombol gerak">
        <button type="button" class="u" ...${hold("w")} aria-label="Maju">▲</button>
        <button type="button" class="l" ...${hold("q")} aria-label="Belok kiri">⟲</button>
        <button type="button" class="d" ...${hold("s")} aria-label="Mundur">▼</button>
        <button type="button" class="r" ...${hold("e")} aria-label="Belok kanan">⟳</button>
      </div>`}
      <div class="city-foot">
        <ul class="legend" aria-label="Tingkat keyakinan lokasi">
          ${Object.entries(K.keyakinan).map(([k, v]) => html`<li key=${k} class=${`k-${k}`} title=${v.ket}><i class="kdot"></i>${v.nama}</li>`)}
        </ul>
        <p class="hint">${walking
          ? "W/S atau ▲▼ jalan, A/D geser, Q/E atau ←→ belok, seret untuk melihat, Shift untuk berlari, Esc keluar"
          : "Seret untuk menggeser, klik kanan atau Shift+seret untuk memutar, scroll untuk zoom, WASD atau panah juga bisa menggeser"}</p>
        <button type="button" class="stat qbtn" onClick=${toggleQuality} title="Mode ringan mematikan bayangan, bebatuan, dan relief tanah">Kualitas: ${quality ? "tinggi" : "ringan"}</button>
        <p class="stat" title="Rumah dibangun detail hanya di sekitar dan di depan kamera">Rumah detail: ${status.detail}</p>
      </div>
      ${ready && story && window.SirahStory && html`<${window.SirahStory} key=${story} api=${api.current} id=${story} onClose=${onStoryEnd} />`}
    </section>`;
  }

  function Riwayat({ r, year, onProfile, onLihat, pid }) {
    const now = inYear(r, year);
    return html`<article class=${`riwayat${now ? " now" : ""}`}>
      <p class="event-when"><b>${fmtT(r.t)}</b>${now && html`<span class="tag-now">Tahun terpilih</span>`}</p>
      <h3>${r.judul}</h3>
      ${r.tontonan && html`<button type="button" class="watch" onClick=${() => window.__tonton(r.tontonan)}><span aria-hidden="true">▶</span> Tonton peristiwa</button>`}
      <p class="narasi">${r.isi}</p>
      ${r.ayat && html`<div class="ayat"><p class="ayat-ref">${r.ayat.surah} : ${r.ayat.no}</p><p class="ayat-ar" lang="ar" dir="rtl">${r.ayat.arab}</p>
        ${pid && window.NUZUL_LOOKUP && window.NUZUL_LOOKUP.tempat(pid, r.judul) && html`<button type="button" class="link wk-open" onClick=${() => window.__wiki(window.NUZUL_LOOKUP.tempat(pid, r.judul))}>Baca artikel asbabun nuzul ›</button>`}</div>`}
      ${r.matan && html`<p class="matan" lang="ar" dir="rtl">${r.matan}</p>`}
      <p class="src-line"><span class=${`deg d-${r.derajat}`}>${K.derajat[r.derajat]}</span>
        ${r.url ? html`<a href=${r.url} target="_blank" rel="noopener">${r.sumber}</a>` : html`<span>${r.sumber}</span>`}</p>
      ${r.catatan && html`<p class="note">${r.catatan}</p>`}
      ${(r.tokoh.length > 0 || r.lihat) && html`<div class="chips">
        ${r.tokoh.map((t) => html`<button type="button" key=${t} class="chip" onClick=${() => onProfile(t)}><${Medal} id=${t} size="xs" /><span>${D.tokoh[t].nama}</span></button>`)}
        ${r.lihat && html`<button type="button" class="chip go" onClick=${() => onLihat(r.lihat)}>Buka ${K.tempat.find((p) => p.id === r.lihat).nama}</button>`}
      </div>`}
    </article>`;
  }

  function CityPanel({ year, csel, setCsel, onProfile, activeIds, onWalk }) {
    const p = csel && K.tempat.find((x) => x.id === csel);
    if (p) {
      const kv = K.keyakinan[p.keyakinan];
      return html`<aside class="panel" aria-label="Detail tempat">
        <div class="loc-head plain">
          <button type="button" class="link small" onClick=${() => setCsel(null)}>‹ Semua tempat di Mekah</button>
          <div class="loc-title flush"><h2>${p.nama}</h2><span class="loc-ar" lang="ar">${p.arab}</span></div>
          <p class=${`kbadge k-${p.keyakinan}`}><i class="kdot"></i><b>${kv.nama}.</b> ${kv.ket}</p>
          <p class="loc-ket">${p.ket}</p>
          ${p.sumberLokasi && html`<p class="src">Sumber lokasi: ${p.sumberLokasi}</p>`}
          ${p.jenis !== "gunung" && html`<button type="button" class="walk-here" onClick=${() => onWalk(p.id)}>Jalan kaki ke sini</button>`}
        </div>
        <div class="panel-body">
          ${p.riwayat.length ? [...p.riwayat].sort((a, b) => inYear(b, year) - inYear(a, year) || (a.t ? a.t[0] : 0) - (b.t ? b.t[0] : 0))
              .map((r, i) => html`<${Riwayat} key=${i} r=${r} year=${year} onProfile=${onProfile} onLihat=${setCsel} pid=${p.id} />`)
            : html`<p class="empty-p">Belum ada riwayat yang dicatat untuk tempat ini.</p>`}
        </div>
        <p class="draft">Konten draf. Lokasi dan riwayat perlu diverifikasi ustadz sebelum dipakai.</p>
      </aside>`;
    }
    const list = K.tempat.filter((x) => x.jenis !== "gunung");
    const now = list.filter((x) => activeIds.has(x.id)), rest = list.filter((x) => !activeIds.has(x.id));
    const row = (x) => html`<li key=${x.id}><button type="button" class=${`prow k-${x.keyakinan}`} onClick=${() => setCsel(x.id)}>
      <i class="kdot"></i><span><b>${x.nama}</b><small>${K.keyakinan[x.keyakinan].nama} · ${x.riwayat.length} riwayat</small></span></button></li>`;
    return html`<aside class="panel" aria-label="Tempat di Mekah">
      <div class="loc-head plain">
        <h2>Kota Mekah</h2>
        <p class="loc-ket">Ka'bah, rumah para tokoh, dan bukit-bukit di sekitarnya. Warna penanda menunjukkan seberapa yakin lokasinya. Tempat yang punya riwayat di tahun ${year} M ikut menyala.</p>
        <p class="loc-ket">${K.catatanVisual}</p>
        <button type="button" class="walk-here" onClick=${() => onWalk("kabah")}>Mulai jalan kaki dari Ka'bah</button>
      </div>
      <div class="panel-body">
        ${now.length > 0 && html`<section><h3 class="sec">Terkait ${year} M</h3><ul class="plist2">${now.map(row)}</ul></section>`}
        <section><h3 class="sec">${now.length ? "Tempat lain" : "Semua tempat"}</h3><ul class="plist2">${rest.map(row)}</ul></section>
        <section><h3 class="sec">Belum bisa dipetakan</h3>
          ${K.belumDipetakan.map((b) => html`<div class="unmapped" key=${b.id}><p><b>${b.nama}.</b> ${b.ket}</p>
            ${b.riwayat.map((r, i) => html`<${Riwayat} key=${i} r=${r} year=${year} onProfile=${onProfile} onLihat=${setCsel} />`)}</div>`)}
        </section>
        <section><h3 class="sec">Sumber</h3><ul class="srcs">${K.sumber.map((s) => html`<li key=${s.url}><a href=${s.url} target="_blank" rel="noopener">${s.judul}</a></li>`)}</ul></section>
      </div>
      <p class="draft">Konten draf. Lokasi dan riwayat perlu diverifikasi ustadz sebelum dipakai.</p>
    </aside>`;
  }

  // ---------- App ----------
  function App() {
    const [year, setYear] = useState(610);
    const [sel, setSel] = useState("makkah");
    const [profile, setProfile] = useState(null);
    const [playing, setPlaying] = useState(false);

    const eventsYear = useMemo(() => D.peristiwa.filter((e) => e.tahun === year), [year]);
    const activeLoks = useMemo(() => new Set(eventsYear.map((e) => e.lok)), [eventsYear]);
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
        const first = D.peristiwa.find((e) => e.tahun === n);
        if (first) setSel(first.lok);
      }, 2600);
      return () => clearTimeout(t);
    }, [playing, year]);

    const [mode, setMode] = useState("wilayah");
    const [csel, setCsel] = useState(null);
    const [walkReq, setWalkReq] = useState(null);
    const [story, setStory] = useState(null);
    const [nuzul, setNuzul] = useState(false), [nuzulSel, setNuzulSel] = useState(null);
    const [nzTab, setNzTab] = useState("kejadian"), [nzSurah, setNzSurah] = useState(null);
    const pickTab = (t) => { setNzTab(t); if (t === "surah") { setNuzulSel(null); setNzSurah(nzSurah || 96); } else if (!nuzulSel) setNuzulSel(window.NUZUL.urutan[0].id); };
    window.__wiki = (id) => { setPlaying(false); setNuzul(true); setNzTab("kejadian"); setNuzulSel(id); };
    const toggleNuzul = () => { if (nuzul) { setNuzul(false); return; } setPlaying(false); setNuzul(true); if (nzTab === "kejadian") setNuzulSel(nuzulSel || window.NUZUL.urutan[0].id); else if (!nzSurah) setNzSurah(96); };
    window.__tonton = (id) => {
      const ev = window.TONTONAN[id]; if (!ev) return;
      setPlaying(false); setProfile(null); setYear(ev.tahun); setMode("mekah"); setCsel(null); setStory(id);
    };
    const activeIds = useMemo(() => new Set(window.MEKAH.tempat.filter((p) => placeActive(p, year)).map((p) => p.id)), [year]);

    const goto = (e) => { setPlaying(false); setMode("wilayah"); setYear(e.tahun); setSel(e.lok); setProfile(null); };
    const gotoCity = (pid, r) => { setPlaying(false); if (r && r.t) setYear(r.t[0]); setMode("mekah"); setCsel(pid); setProfile(null); };
    const city = mode === "mekah";

    return html`<div class=${`app${city ? " in-city" : ""}`}>
      <header class="top">
        <div class="brand"><h1>Jejak Sirah</h1><p>Sejarah Islam dari Tahun Gajah sampai Khulafaur Rasyidin</p></div>
        <div class="top-act">
          <button type="button" class=${`hdr-btn${nuzul ? " on" : ""}`} onClick=${toggleNuzul} aria-pressed=${nuzul}>Asbabun Nuzul</button>
          <span class="badge">Prototipe</span>
        </div>
      </header>
      ${city
        ? html`<${CityMap} year=${year} csel=${csel} activeIds=${activeIds} onSelect=${(id) => { setPlaying(false); setCsel(id); }}
            onOverview=${() => setCsel(null)} onBack=${() => { setStory(null); setMode("wilayah"); setSel("makkah"); }} walkReq=${walkReq}
            story=${story} onStoryEnd=${() => setStory(null)} />`
        : html`<${MapView} year=${year} sel=${sel} activeLoks=${activeLoks} tokohAt=${tokohAt}
            onSelect=${(id) => { setPlaying(false); setSel(id); }} onProfile=${setProfile}
            onOverview=${() => setSel(null)} />`}
      <${Timeline} year=${year} setYear=${setYear} playing=${playing} setPlaying=${setPlaying} />
      ${nuzul && window.SirahNuzulList ? html`<${window.SirahNuzulList} sel=${nuzulSel} onSelect=${setNuzulSel} tab=${nzTab} onTab=${pickTab} surah=${nzSurah} onSurah=${(n) => { setNuzulSel(null); setNzSurah(n); }} />` : html`<${React.Fragment}>
      ${city
        ? html`<${CityPanel} year=${year} csel=${csel} setCsel=${setCsel} onProfile=${setProfile} activeIds=${activeIds}
            onWalk=${(id) => { setPlaying(false); setWalkReq({ id, k: Date.now() }); }} />`
        : html`<${Panel} year=${year} sel=${sel} eventsYear=${eventsYear} onProfile=${setProfile} setYear=${setYear} select=${setSel}
            onEnterCity=${() => { setPlaying(false); setMode("mekah"); setCsel(null); }} />`}</${React.Fragment}>`}
      ${nuzul && nuzulSel && !story && window.SirahNuzulDetail && html`<${window.SirahNuzulDetail} id=${nuzulSel} onSelect=${setNuzulSel} onClose=${() => setNuzulSel(null)}
        onWatch=${(id) => window.__tonton(id)} onProfile=${setProfile}
        onMap=${(pt) => { setNuzul(false); setStory(null); setPlaying(false); setYear(pt.tahun); if (pt.tempat) { setMode("mekah"); setCsel(pt.tempat); } else { setMode("wilayah"); setSel(pt.lok); } }} />`}
      ${nuzul && !nuzulSel && nzTab === "surah" && nzSurah && !story && window.SirahSurahDetail && html`<${window.SirahSurahDetail} no=${nzSurah}
        onSelect=${setNuzulSel} onSurah=${setNzSurah} onClose=${() => setNzSurah(null)} />`}
      ${profile && html`<${Profile} id=${profile} year=${year} onClose=${() => setProfile(null)} onGoto=${goto} onGotoCity=${gotoCity} />`}
    </div>`;
  }

  ReactDOM.createRoot(document.getElementById("root")).render(html`<${App} />`);
})();
