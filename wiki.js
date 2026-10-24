// Ensiklopedia Asbabun Nuzul bergaya Wikipedia: indeks berurutan + artikel dengan kotak info, daftar isi, dan rujukan bernomor.
(function () {
  const { useState, useEffect, useRef, useMemo } = React;
  const html = htm.bind(React.createElement);

  // ---------- Data ----------
  function buildEntries() {
    const D = window.SIRAH, K = window.MEKAH, N = window.NUZUL;
    return N.urutan.map((u, i) => {
      const no = i + 1;
      if (N.artikel[u.id]) { const a = N.artikel[u.id]; return { id: u.id, no, full: true, judul: a.judul, tahun: a.tahun, sub: a.sub, art: a }; }
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
        infobox: [["Surah", ay.surah], ["Ayat", ay.no], ["Peristiwa", e.judul], ["Waktu", `${e.tahun} M (${e.h})`], ["Tempat", e.tempat], ["Tokoh", e.tokoh.map(nama).join(", ")]],
        ayat: [{ no: ay.no, ar: ay.arab }],
        bagian: [
          { id: "nuzul", judul: "Asbabun nuzul", isi: [ay.nuzul + "[ref:s1]"] },
          { id: "peristiwa", judul: "Peristiwa", isi: [e.narasi] },
          ...(notes.length ? [{ id: "catatan", judul: "Catatan", isi: notes }] : [])
        ],
        lihatJuga: [], rujukan: { s1: { t: ay.sumber } }
      };
    }
    const p = en.p, r = en.r, notes = [r.catatan, en.u.catatan].filter(Boolean);
    return {
      judul: en.judul, sub: r.judul, ringkas: true, tontonan: r.tontonan, peta: { tahun: r.t ? r.t[0] : 610, tempat: p.id },
      lead: [`${r.ayat.surah} ayat ${r.ayat.no} berkaitan dengan peristiwa "${r.judul}" di ${p.nama}${r.t ? `, sekitar ${r.t[0]} M` : ""}.[ref:s1]`],
      infobox: [["Surah", r.ayat.surah], ["Ayat", r.ayat.no], ["Peristiwa", r.judul], ["Waktu", r.t ? `${r.t[0]}${r.t[1] !== r.t[0] ? "–" + r.t[1] : ""} M` : "Tidak disebut dalam riwayat"], ["Tempat", p.nama], ["Tokoh", r.tokoh.map(nama).join(", ")]],
      ayat: [{ no: r.ayat.no, ar: r.ayat.arab }],
      bagian: [{ id: "nuzul", judul: "Asbabun nuzul", isi: [r.isi + "[ref:s1]"] }, ...(notes.length ? [{ id: "catatan", judul: "Catatan", isi: notes }] : [])],
      lihatJuga: [{ label: p.nama, tempat: p.id, ket: "lokasi di peta" }], rujukan: { s1: { t: r.sumber, url: r.url } }
    };
  }

  // Pencarian balik: dari peristiwa/riwayat ke entri ensiklopedia
  window.NUZUL_LOOKUP = {
    ev(evId, i) { const u = window.NUZUL.urutan.find((x) => x.ev === evId && x.a === i) || (evId === "hira" && i === 0 ? { id: "alaq-1-5" } : null); return u && u.id; },
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

  // ---------- Komponen ----------
  function SirahWiki({ entryId, onOpen, onClose, onWatch, onMap, onProfile }) {
    const entries = useMemo(buildEntries, []);
    const [q, setQ] = useState("");
    const mainRef = useRef(null);
    const idx = Math.max(0, entries.findIndex((x) => x.id === entryId));
    const en = entries[idx], art = useMemo(() => toArticle(en), [en.id]), refs = useMemo(() => numberRefs(art), [en.id]);
    const prev = entries[idx - 1], next = entries[idx + 1];
    useEffect(() => { if (mainRef.current) mainRef.current.scrollTop = 0; }, [en.id]);
    useEffect(() => { const k = (e) => { if (e.key === "Escape" && !document.querySelector(".overlay")) onClose(); }; window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, []);
    const jump = (id) => { const el = mainRef.current && mainRef.current.querySelector("#" + id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); };
    const onRef = (n) => jump("wk-r-" + n);
    const T = (s) => html`<${Txt} s=${s} refs=${refs} onRef=${onRef} />`;
    const ql = q.trim().toLowerCase();
    const list = entries.filter((x) => !ql || (x.judul + " " + (x.sub || "")).toLowerCase().includes(ql));
    const sections = [{ id: "wk-teks", judul: "Teks ayat" }, ...art.bagian.map((b) => ({ id: "wk-" + b.id, judul: b.judul })),
      ...(art.lihatJuga.length ? [{ id: "wk-lihat", judul: "Lihat juga" }] : []), { id: "wk-rujukan", judul: "Rujukan" }];

    return html`<div class="wk" role="dialog" aria-modal="true" aria-label="Ensiklopedia Asbabun Nuzul">
      <header class="wk-top">
        <div class="wk-brand"><span class="wk-logo" lang="ar" aria-hidden="true">ن</span><div><b>Jejak Sirah</b><small>Ensiklopedia Asbabun Nuzul</small></div></div>
        <label class="wk-search"><span class="sr">Cari</span><input id="wk-q" type="search" placeholder="Cari surah atau peristiwa" value=${q} onInput=${(e) => setQ(e.target.value)} /></label>
        <button type="button" class="wk-close" onClick=${onClose}>Kembali ke peta</button>
      </header>
      <div class="wk-body">
        <nav class="wk-side" aria-label="Urutan turunnya ayat">
          <p class="wk-side-h">Urutan turunnya ayat</p>
          <ol>${list.map((x) => html`<li key=${x.id}><button type="button" class=${x.id === en.id ? "on" : ""} onClick=${() => onOpen(x.id)}>
            <span class="n">${x.no}</span><span class="t"><b>${x.judul}</b><small>${x.tahun ? x.tahun + " M" : "Waktu tidak disebut"} · ${x.full ? "Artikel" : "Ringkasan"}</small></span></button></li>`)}
            ${!list.length && html`<li class="wk-none">Tidak ada yang cocok dengan "${q}".</li>`}</ol>
          <p class="wk-side-note">Artikel lengkap ditulis satu per satu. Entri bertanda "Ringkasan" diambil dari data peristiwa di peta.</p>
        </nav>
        <main class="wk-main" ref=${mainRef}>
          <article class="wk-art">
            <h1>${art.judul}</h1>
            <p class="wk-from">Dari Jejak Sirah, ensiklopedia internal Sopwer${art.sub ? html` · <i>${art.sub}</i>` : ""}</p>
            <div class=${`wk-ambox${art.ringkas ? " warn" : ""}`}>
              ${art.ringkas ? "Entri ini baru berupa ringkasan dari data peristiwa. Artikel lengkapnya belum ditulis." : "Artikel ini masih draf. Isi, terjemahan, dan rujukannya perlu diverifikasi ustadz sebelum dipakai."}
            </div>
            <aside class="wk-info">
              <div class="wk-info-h">${art.judul}</div>
              <p class="wk-info-ar" lang="ar" dir="rtl">${art.ayat[0].ar}</p>
              <table><tbody>${art.infobox.map(([k, v]) => html`<tr key=${k}><th scope="row">${k}</th><td>${T(v)}</td></tr>`)}</tbody></table>
              <div class="wk-info-act">
                ${art.tontonan && html`<button type="button" class="wk-btn pri" onClick=${() => onWatch(art.tontonan)}><span aria-hidden="true">▶</span> Tonton kejadian</button>`}
                ${art.peta && html`<button type="button" class="wk-btn" onClick=${() => onMap(art.peta)}>Lihat di peta</button>`}
              </div>
            </aside>
            ${art.lead.map((p, i) => html`<p key=${i}>${T(p)}</p>`)}
            <div class="wk-toc" role="navigation" aria-label="Daftar isi">
              <p class="wk-toc-h">Daftar isi</p>
              <ol>${sections.map((s) => html`<li key=${s.id}><a href=${"#" + s.id} onClick=${(e) => { e.preventDefault(); jump(s.id); }}>${s.judul}</a></li>`)}</ol>
            </div>
            <h2 id="wk-teks">Teks ayat</h2>
            <div class="wk-ayat-wrap"><table class="wk-ayat"><tbody>${art.ayat.map((a) => html`<tr key=${a.no}>
              <td class="no">${a.no}</td><td class="id">${a.id || html`<span class="dim">Terjemahan lengkap belum ditulis.</span>`}</td><td class="ar" lang="ar" dir="rtl">${a.ar}</td></tr>`)}</tbody></table></div>
            ${!art.ringkas && html`<p class="wk-cap">Teks Arab mengikuti mushaf standar; terjemahan bebas dan perlu dicocokkan dengan terjemahan Kemenag.</p>`}
            ${art.bagian.map((b) => html`<section key=${b.id}><h2 id=${"wk-" + b.id}>${b.judul}</h2>${b.isi.map((p, i) => html`<p key=${i}>${T(p)}</p>`)}</section>`)}
            ${art.lihatJuga.length > 0 && html`<h2 id="wk-lihat">Lihat juga</h2><ul class="wk-see">${art.lihatJuga.map((l) => html`<li key=${l.label}>
              <a href="#" onClick=${(e) => { e.preventDefault(); if (l.wiki) onOpen(l.wiki); else if (l.tempat) onMap({ tahun: art.peta ? art.peta.tahun : 610, tempat: l.tempat }); else if (l.tokoh) onProfile(l.tokoh); }}>${l.label}</a>${l.ket ? html` <span class="dim">(${l.ket})</span>` : ""}</li>`)}</ul>`}
            <h2 id="wk-rujukan">Rujukan</h2>
            <ol class="wk-refs">${refs.order.map((k, i) => { const r = art.rujukan[k]; return html`<li key=${k} id=${"wk-r-" + (i + 1)}>
              ${r.url ? html`<a href=${r.url} target="_blank" rel="noopener">${r.t}</a>` : r.t}</li>`; })}</ol>
            <div class="wk-navbox">
              <p class="wk-navbox-h">Urutan asbabun nuzul</p>
              <div class="wk-navbox-row">
                ${prev ? html`<button type="button" onClick=${() => onOpen(prev.id)}><small>‹ Sebelumnya</small>${prev.judul}</button>` : html`<span class="dim">Ini kejadian pertama.</span>`}
                <span class="wk-navbox-pos">${en.no} dari ${entries.length}</span>
                ${next ? html`<button type="button" class="r" onClick=${() => onOpen(next.id)}><small>Berikutnya ›</small>${next.judul}</button>` : html`<span class="dim">Belum ada kejadian berikutnya.</span>`}
              </div>
            </div>
          </article>
        </main>
      </div>
    </div>`;
  }
  window.SirahWiki = SirahWiki;
})();
