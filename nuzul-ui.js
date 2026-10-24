// Asbabun Nuzul: daftar kejadian di panel kanan, detail sebab turunnya ayat di atas peta (sisi kiri), dengan tombol putar kejadian.
(function () {
  const { useState, useEffect, useRef, useMemo } = React;
  const html = htm.bind(React.createElement);

  // ---------- Data ----------
  function buildEntries() {
    const D = window.SIRAH, K = window.MEKAH, N = window.NUZUL;
    return N.urutan.map((u, i) => {
      const no = i + 1;
      if (N.artikel[u.id]) { const a = N.artikel[u.id]; return { id: u.id, no, full: true, judul: a.judul, tahun: a.tahun, sub: a.sub, art: a, u }; }
      if (u.ev) {
        const e = D.peristiwa.find((x) => x.id === u.ev), ay = e && e.ayat[u.a]; if (!ay) return null;
        return { id: u.id, no, full: false, judul: `${ay.surah} ${ay.no}`, tahun: e.tahun, sub: e.judul, kind: "ev", e, ay, u };
      }
      const p = K.tempat.find((x) => x.id === u.tempat), r = p && p.riwayat.find((x) => x.judul === u.r); if (!r || !r.ayat) return null;
      return { id: u.id, no, full: false, judul: `${r.ayat.surah} ${r.ayat.no}`, tahun: r.t ? r.t[0] : null, sub: r.judul, kind: "tempat", p, r, u };
    }).filter(Boolean);
  }
  const nama = (t) => (window.SIRAH.tokoh[t] ? window.SIRAH.tokoh[t].nama : t);

  // Ringkasan otomatis dari data peristiwa untuk entri yang artikelnya belum ditulis
  function toArticle(en) {
    if (en.full) return en.art;
    if (en.kind === "ev") {
      const e = en.e, ay = en.ay, notes = [ay.catatan, en.u.catatan].filter(Boolean);
      return {
        judul: en.judul, sub: e.judul, ringkas: true, tontonan: e.tontonan, peta: { tahun: e.tahun, lok: e.lok },
        lead: [`${ay.surah} ayat ${ay.no} berkaitan dengan peristiwa "${e.judul}" di ${e.tempat}, sekitar ${e.tahun} M (${e.h}).[ref:s1]`],
        infobox: [["Surah", ay.surah], ["Ayat", ay.no], ["Peristiwa", e.judul], ["Waktu", en.u.waktu ? en.u.waktu + (en.u.ws ? "[ref:w]" : "") : `${e.tahun} M (${e.h})`], ["Tempat", e.tempat], ["Tokoh", e.tokoh.map(nama).join(", ")]],
        ayat: [{ no: ay.no, ar: ay.arab }],
        bagian: [
          { id: "nuzul", judul: "Asbabun nuzul", isi: [ay.nuzul + "[ref:s1]"] },
          { id: "peristiwa", judul: "Peristiwa", isi: [e.narasi] },
          ...(notes.length ? [{ id: "catatan", judul: "Catatan", isi: notes }] : [])
        ],
        lihatJuga: [], rujukan: { s1: { t: ay.sumber }, ...(en.u.ws ? { w: { t: en.u.ws, url: en.u.wu } } : {}) }
      };
    }
    const p = en.p, r = en.r, notes = [r.catatan, en.u.catatan].filter(Boolean);
    return {
      judul: en.judul, sub: r.judul, ringkas: true, tontonan: r.tontonan, peta: { tahun: r.t ? r.t[0] : 610, tempat: p.id },
      lead: [`${r.ayat.surah} ayat ${r.ayat.no} berkaitan dengan peristiwa "${r.judul}" di ${p.nama}${r.t ? `, sekitar ${r.t[0]} M` : ""}.[ref:s1]`],
      infobox: [["Surah", r.ayat.surah], ["Ayat", r.ayat.no], ["Peristiwa", r.judul], ["Waktu", en.u.waktu ? en.u.waktu + (en.u.ws ? "[ref:w]" : "") : r.t ? `${r.t[0]}${r.t[1] !== r.t[0] ? "–" + r.t[1] : ""} M` : "Tidak disebut dalam riwayat"], ["Tempat", p.nama], ["Tokoh", r.tokoh.map(nama).join(", ")]],
      ayat: [{ no: r.ayat.no, ar: r.ayat.arab }],
      bagian: [{ id: "nuzul", judul: "Asbabun nuzul", isi: [r.isi + "[ref:s1]"] }, ...(notes.length ? [{ id: "catatan", judul: "Catatan", isi: notes }] : [])],
      lihatJuga: [{ label: p.nama, tempat: p.id, ket: "lokasi di peta" }], rujukan: { s1: { t: r.sumber, url: r.url }, ...(en.u.ws ? { w: { t: en.u.ws, url: en.u.wu } } : {}) }
    };
  }

  // Pencarian balik: dari peristiwa/riwayat ke entri ensiklopedia
  window.NUZUL_LOOKUP = {
    ev(evId, i) { const u = window.NUZUL.urutan.find((x) => x.ev === evId && x.a === i) || (evId === "hira" && i === 0 ? { id: "alaq-1-5" } : evId === "muddatstsir" && i === 0 ? { id: "muddatstsir-1-5" } : evId === "dhuha" && i === 0 ? { id: "dhuha-1-3" } : null); return u && u.id; },
    tempat(pid, judul) { const u = window.NUZUL.urutan.find((x) => x.tempat === pid && x.r === judul) || ((pid === "hira" || pid === "khadijah") && /Wahyu pertama|Selimuti/.test(judul) ? { id: "alaq-1-5" } : null); return u && u.id; }
  };

  // ---------- Rujukan bernomor ----------
  const REF = /\[ref:(\w+)\]/g;
  function numberRefs(art) {
    const order = [], seen = {};
    const scan = (s) => { if (typeof s !== "string") return; let m; REF.lastIndex = 0; while ((m = REF.exec(s))) if (!seen[m[1]] && art.rujukan[m[1]]) { seen[m[1]] = order.length + 1; order.push(m[1]); } };
    (art.infobox || []).forEach(([, v]) => scan(v)); (art.lead || []).forEach(scan); (art.bagian || []).forEach((b) => b.isi.forEach(scan));
    return { order, num: seen };
  }
  function Txt({ s, refs, onRef }) {
    const parts = []; let last = 0, m; REF.lastIndex = 0;
    while ((m = REF.exec(s))) {
      if (m.index > last) parts.push(s.slice(last, m.index));
      const n = refs.num[m[1]];
      if (n) parts.push(html`<sup class="wk-ref" key=${m.index}><a href=${"#wk-r-" + n} onClick=${(e) => { e.preventDefault(); onRef(n); }}>[${n}]</a></sup>`);
      last = m.index + m[0].length;
    }
    if (last < s.length) parts.push(s.slice(last));
    return parts;
  }

  // ---------- Daftar (panel kanan) ----------
  const ENTRIES = () => (window.__nzEntries || (window.__nzEntries = buildEntries()));

  // ---------- Per surah ----------
  const DER = { shahih: "Hadits shahih", sirah: "Kitab sirah", tafsir: "Kitab tafsir" };
  function SurahList({ sel, onSelect }) {
    const entries = ENTRIES();
    const [q, setQ] = useState(""), [urut, setUrut] = useState("mushaf"), [filt, setFilt] = useState("semua");
    const ql = q.trim().toLowerCase();
    const count = useMemo(() => { const c = {}; entries.forEach((x) => { const n = x.u.s; if (n) c[n] = (c[n] || 0) + 1; }); return c; }, []);
    let list = window.SURAH.filter((s) => (!ql || (s.no + " " + s.nama + " " + s.arti).toLowerCase().includes(ql))
      && (filt === "semua" || (filt === "mk" ? s.mk : filt === "md" ? !s.mk : count[s.no])));
    if (urut === "turun") list = [...list].sort((a, b) => a.urut - b.urut);
    return html`<${React.Fragment}>
      <div class="nz-tools">
        <label class="nz-search"><span class="sr">Cari surah</span><input type="search" placeholder="Cari nama atau nomor surah" value=${q} onInput=${(e) => setQ(e.target.value)} /></label>
        <div class="nz-seg" role="group" aria-label="Urutkan">
          <button type="button" class=${urut === "mushaf" ? "on" : ""} aria-pressed=${urut === "mushaf"} onClick=${() => setUrut("mushaf")}>Urutan mushaf</button>
          <button type="button" class=${urut === "turun" ? "on" : ""} aria-pressed=${urut === "turun"} onClick=${() => setUrut("turun")}>Urutan turun</button>
        </div>
        <div class="nz-seg small" role="group" aria-label="Saring">
          ${[["semua", "Semua"], ["mk", "Makkiyah"], ["md", "Madaniyah"], ["ada", "Ada asbabun nuzul"]].map(([k, l]) => html`<button key=${k} type="button" class=${filt === k ? "on" : ""} aria-pressed=${filt === k} onClick=${() => setFilt(k)}>${l}</button>`)}
        </div>
      </div>
      <ol class="nz-list nz-surah">
        ${list.map((s) => html`<li key=${s.no}><button type="button" class=${s.no === sel ? "on" : ""} aria-pressed=${s.no === sel} onClick=${() => onSelect(s.no)}>
          <span class="n">${urut === "turun" ? s.urut : s.no}</span>
          <span class="t"><b>${s.nama} <span class="ar" lang="ar">${s.ar}</span></b>
            <small>${s.arti} · ${s.ayat} ayat</small>
            <small class="y">${s.mk ? "Makkiyah" : "Madaniyah"}${s.beda ? " (diperselisihkan)" : ""} · urutan turun ke-${s.urut} · ${s.periode.tahun}</small></span>
          ${count[s.no] && html`<span class="nz-count" title=${`${count[s.no]} kejadian asbabun nuzul`}>${count[s.no]}</span>`}
        </button></li>`)}
        ${!list.length && html`<li class="nz-none">Tidak ada surah yang cocok.</li>`}
      </ol></${React.Fragment}>`;
  }

  function SurahDetail({ no, onSelect, onSurah, onClose }) {
    const s = window.SURAH[no - 1], entries = ENTRIES().filter((x) => x.u.s === no);
    const ref = useRef(null);
    useEffect(() => { if (ref.current) ref.current.scrollTop = 0; }, [no]);
    useEffect(() => { const k = (e) => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); });
    const byTurun = useMemo(() => [...window.SURAH].sort((a, b) => a.urut - b.urut), []);
    const ti = byTurun.findIndex((x) => x.no === no), sebelum = byTurun[ti - 1], sesudah = byTurun[ti + 1];
    return html`<section class="nz-detail" ref=${ref} aria-label=${"Surah " + s.nama}>
      <div class="nz-head">
        <div><p class="nz-k">Surah ke-${s.no} dalam mushaf · urutan turun ke-${s.urut} dari 114</p>
          <h2>${s.nama} <span class="nz-ar" lang="ar">${s.ar}</span></h2><p class="nz-sub">${s.arti} · ${s.ayat} ayat</p></div>
        <button type="button" class="close" onClick=${onClose} aria-label="Tutup">×</button>
      </div>
      <h3 class="nz-h">Kapan diturunkan</h3>
      <dl class="nz-facts">
        <div><dt>Golongan</dt><dd>${s.mk ? "Makkiyah (turun sebelum Hijrah)" : "Madaniyah (turun setelah Hijrah)"}${s.beda ? "; diperselisihkan ulama" : ""}</dd></div>
        <div><dt>Urutan turun</dt><dd>Ke-${s.urut} dari 114, setelah ${sebelum ? sebelum.nama : "—"}${sesudah ? ", sebelum " + sesudah.nama : ""}</dd></div>
        <div><dt>${s.catatan.length ? "Perkiraan dari urutan turun" : "Perkiraan periode"}</dt><dd>${s.periode.label}, ${s.periode.tahun}</dd></div>
      </dl>
      ${s.catatan.length ? html`<ul class="nz-catat">${s.catatan.map((c, i) => html`<li key=${i}><p>${c.t}</p>
          <small><span class=${`nz-der ${c.d}`}>${DER[c.d]}</span> ${c.url ? html`<a href=${c.url} target="_blank" rel="noopener">${c.s}</a>` : c.s}</small></li>`)}</ul>`
        : html`<p class="nz-note">Belum ada riwayat yang mencatat waktu turunnya surah ini secara khusus. Periode di atas hanya perkiraan kasar dari urutan turun.</p>`}
      <h3 class="nz-h">Asbabun nuzul dalam surah ini</h3>
      ${entries.length ? html`<ul class="nz-in">${entries.map((x) => html`<li key=${x.id}><button type="button" onClick=${() => onSelect(x.id)}>
          <b>${x.judul}</b><small>${x.sub}${x.u.waktu ? " · " + x.u.waktu : ""}</small><span class=${`st ${x.full ? "full" : ""}`}>${x.full ? "Lengkap" : "Ringkasan"}</span></button></li>`)}</ul>`
        : html`<p class="nz-p dim">Belum ada kejadian asbabun nuzul untuk surah ini di aplikasi. Banyak ayat turun tanpa sebab khusus; yang punya riwayat akan ditambahkan bertahap.</p>`}
      <p class="nz-src">Golongan dan urutan turun mengikuti mushaf standar Mesir (Al-Azhar, 1924), dipakai juga oleh Tanzil. Urutan ini hasil ijtihad ulama, bukan nash.</p>
      <nav class="nz-nav" aria-label="Surah lain menurut urutan turun">
        ${sebelum ? html`<button type="button" onClick=${() => onSurah(sebelum.no)}><small>‹ Turun sebelumnya</small>${sebelum.nama}</button>` : html`<span />`}
        ${sesudah ? html`<button type="button" class="r" onClick=${() => onSurah(sesudah.no)}><small>Turun sesudahnya ›</small>${sesudah.nama}</button>` : html`<span />`}
      </nav>
    </section>`;
  }

  function NuzulList({ sel, onSelect, tab = "kejadian", onTab, surah, onSurah }) {
    const entries = ENTRIES();
    const [q, setQ] = useState("");
    const ql = q.trim().toLowerCase();
    const list = entries.filter((x) => !ql || (x.judul + " " + (x.sub || "")).toLowerCase().includes(ql));
    return html`<aside class="panel nz-panel" aria-label="Daftar asbabun nuzul">
      <div class="loc-head plain">
        <h2>Asbabun Nuzul</h2>
        <div class="nz-tabs" role="tablist">
          <button type="button" role="tab" aria-selected=${tab === "kejadian"} class=${tab === "kejadian" ? "on" : ""} onClick=${() => onTab && onTab("kejadian")}>Per kejadian</button>
          <button type="button" role="tab" aria-selected=${tab === "surah"} class=${tab === "surah" ? "on" : ""} onClick=${() => onTab && onTab("surah")}>Per surah (114)</button>
        </div>
        <p class="loc-ket">${tab === "surah" ? "Kapan setiap surah diturunkan, dan kejadian asbabun nuzul di dalamnya." : "Urutan kejadian turunnya ayat. Pilih salah satu untuk melihat sebab turunnya dan memutar kejadiannya."}</p>
        ${tab !== "surah" && html`<label class="nz-search"><span class="sr">Cari</span><input id="nz-q" type="search" placeholder="Cari surah atau peristiwa" value=${q} onInput=${(e) => setQ(e.target.value)} /></label>`}
      </div>
      ${tab === "surah" ? html`<${SurahList} sel=${surah} onSelect=${onSurah} />` : html`<ol class="nz-list">
        ${list.map((x) => {
          const art = toArticle(x);
          return html`<li key=${x.id}><button type="button" class=${x.id === sel ? "on" : ""} onClick=${() => onSelect(x.id)} aria-pressed=${x.id === sel}>
            <span class="n">${x.no}</span>
            <span class="t"><b>${x.judul}</b><small>${x.sub}</small><small class="y">${x.u && x.u.waktu ? x.u.waktu : x.tahun ? x.tahun + " M" : "Waktu tidak disebut"}</small><small class=${`st ${x.full ? "full" : ""}`}>${x.full ? "Lengkap" : "Ringkasan"}</small></span>
            ${art.tontonan && html`<span class="nz-play-dot" title="Ada tontonan kejadian" aria-label="Ada tontonan">▶</span>`}
          </button></li>`;
        })}
        ${!list.length && html`<li class="nz-none">Tidak ada yang cocok dengan "${q}".</li>`}
      </ol>`}
      <p class="draft">Isi masih draf dan perlu diverifikasi ustadz. Entri "Ringkasan" akan dilengkapi satu per satu.</p>
    </aside>`;
  }

  // ---------- Detail (di atas peta, sisi kiri) ----------
  function NuzulDetail({ id, onSelect, onClose, onWatch, onMap, onProfile }) {
    const entries = ENTRIES();
    const idx = Math.max(0, entries.findIndex((x) => x.id === id));
    const en = entries[idx], art = useMemo(() => toArticle(en), [en.id]), refs = useMemo(() => numberRefs(art), [en.id]);
    const prev = entries[idx - 1], next = entries[idx + 1];
    const boxRef = useRef(null);
    useEffect(() => { if (boxRef.current) boxRef.current.scrollTop = 0; }, [en.id]);
    const onRef = (n) => { const el = boxRef.current && boxRef.current.querySelector("#nz-r-" + n); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); };
    const T = (s) => html`<${Txt} s=${s} refs=${refs} onRef=${onRef} />`;
    const why = art.bagian;
    return html`<section class="nz-detail" ref=${boxRef} aria-label=${"Asbabun nuzul " + art.judul}>
      <header class="nz-head">
        <div><p class="nz-k">Asbabun nuzul · kejadian ke-${en.no} dari ${entries.length}</p><h2>${art.judul}</h2>${art.sub && html`<p class="nz-sub">${art.sub}</p>`}</div>
        <button type="button" class="close" onClick=${onClose} aria-label="Tutup detail">×</button>
      </header>
      <div class="nz-actions">
        ${art.tontonan ? html`<button type="button" class="nz-play" onClick=${() => onWatch(art.tontonan)}><span aria-hidden="true">▶</span> Putar kejadian</button>`
          : html`<span class="nz-noplay">Tontonan kejadian ini belum dibuat</span>`}
        ${art.peta && html`<button type="button" class="nz-btn" onClick=${() => onMap(art.peta)}>Lihat di peta</button>`}
      </div>
      ${art.ringkas && html`<p class="nz-note">Masih ringkasan dari data peristiwa. Penjelasan lengkapnya belum ditulis.</p>`}
      <dl class="nz-facts">${art.infobox.filter(([k]) => k !== "Surah" && k !== "Ayat").map(([k, v]) => html`<div key=${k}><dt>${k}</dt><dd>${T(v)}</dd></div>`)}</dl>
      <div class="nz-ayat">
        <p class="nz-ayat-h">${art.infobox.find(([k]) => k === "Surah")?.[1].replace(/\[ref:\w+\]/g, "")} · ayat ${art.ayat.length > 1 ? art.ayat[0].no + "–" + art.ayat[art.ayat.length - 1].no : art.ayat[0].no}</p>
        ${art.ayat.map((a) => html`<div class="nz-ay" key=${a.no}><p class="ar" lang="ar" dir="rtl">${a.ar}${art.ayat.length > 1 ? html` <span class="num">﴿${String(a.no).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d])}﴾</span>` : ""}</p>
          ${a.id && html`<p class="id"><b>${a.no}.</b> ${a.id}</p>`}</div>`)}
      </div>
      <h3 class="nz-h">Mengapa ayat ini turun</h3>
      ${art.lead.map((p, i) => html`<p class="nz-p" key=${i}>${T(p)}</p>`)}
      ${why.map((b) => html`<section key=${b.id}><h4 class="nz-h4">${b.judul}</h4>${b.isi.map((p, i) => html`<p class="nz-p" key=${i}>${T(p)}</p>`)}</section>`)}
      ${art.lihatJuga.length > 0 && html`<h4 class="nz-h4">Terkait</h4><div class="chips">${art.lihatJuga.map((l) => html`<button type="button" class="chip go" key=${l.label}
        onClick=${() => { if (l.wiki) onSelect(l.wiki); else if (l.tempat) onMap({ tahun: art.peta ? art.peta.tahun : 610, tempat: l.tempat }); else if (l.tokoh) onProfile(l.tokoh); }}>${l.label}</button>`)}</div>`}
      <h4 class="nz-h4">Rujukan</h4>
      <ol class="nz-refs">${refs.order.map((k, i) => { const r = art.rujukan[k]; return html`<li key=${k} id=${"nz-r-" + (i + 1)}>${r.url ? html`<a href=${r.url} target="_blank" rel="noopener">${r.t}</a>` : r.t}</li>`; })}</ol>
      <footer class="nz-nav">
        ${prev ? html`<button type="button" onClick=${() => onSelect(prev.id)}><small>‹ Sebelumnya</small>${prev.judul}</button>` : html`<span></span>`}
        ${next ? html`<button type="button" class="r" onClick=${() => onSelect(next.id)}><small>Berikutnya ›</small>${next.judul}</button>` : html`<span></span>`}
      </footer>
    </section>`;
  }
  window.SirahSurahDetail = SurahDetail;
  window.SirahNuzulList = NuzulList;
  window.SirahNuzulDetail = NuzulDetail;
})();
