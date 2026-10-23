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
        <button type="button" onClick=${() => api.current.zoom(0.8)} aria-label="Perbesar">+</button>
        <button type="button" onClick=${() => api.current.zoom(1.25)} aria-label="Perkecil">−</button>
        <button type="button" onClick=${() => api.current.rotate(-0.4)} aria-label="Putar kiri">⟲</button>
        <button type="button" onClick=${() => api.current.rotate(0.4)} aria-label="Putar kanan">⟳</button>
        <button type="button" class="wide" onClick=${onOverview}>Seluruh peta</button>
      </div>
      <p class="map-hint">Seret untuk memutar, gulir untuk zoom, klik nama kota untuk detail.</p>
    </section>`;
  }

  // ---------- Kartu peristiwa ----------
  function EventCard({ e, onProfile, showLoc, onGoto }) {
    return html`<article class="event">
      <header>
        <p class="event-when"><b>${e.tahun} M</b> <span>${e.h}</span> ${showLoc ? html`<span>· ${D.lokasi[e.lok].nama}</span>` : html`<span>· ${e.tempat}</span>`}</p>
        <h3>${showLoc ? html`<button type="button" class="link" onClick=${() => onGoto(e)}>${e.judul}</button>` : e.judul}</h3>
      </header>
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
      </div>`)}
      ${!showLoc && (e.sumber || e.catatan) && html`<div class="foot">
        ${e.sumber && html`<p class="src">${e.sumber}</p>`}${e.catatan && html`<p class="note">${e.catatan}</p>`}</div>`}
    </article>`;
  }

  // ---------- Panel kanan ----------
  function Panel({ year, sel, eventsYear, onProfile, setYear, select }) {
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
  function Profile({ id, year, onClose, onGoto }) {
    const t = D.tokoh[id];
    const evs = D.peristiwa.filter((e) => e.tokoh.includes(id));
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
      </div>
    </div>`;
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

    const goto = (e) => { setPlaying(false); setYear(e.tahun); setSel(e.lok); setProfile(null); };

    return html`<div class="app">
      <header class="top">
        <div class="brand"><h1>Jejak Sirah</h1><p>Sejarah Islam dari Tahun Gajah sampai Khulafaur Rasyidin</p></div>
        <span class="badge">Prototipe</span>
      </header>
      <${MapView} year=${year} sel=${sel} activeLoks=${activeLoks} tokohAt=${tokohAt}
        onSelect=${(id) => { setPlaying(false); setSel(id); }} onProfile=${setProfile}
        onOverview=${() => setSel(null)} />
      <${Timeline} year=${year} setYear=${setYear} playing=${playing} setPlaying=${setPlaying} />
      <${Panel} year=${year} sel=${sel} eventsYear=${eventsYear} onProfile=${setProfile} setYear=${setYear} select=${setSel} />
      ${profile && html`<${Profile} id=${profile} year=${year} onClose=${() => setProfile(null)} onGoto=${goto} />`}
    </div>`;
  }

  ReactDOM.createRoot(document.getElementById("root")).render(html`<${App} />`);
})();
