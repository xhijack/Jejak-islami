// Hijrah per kejadian: daftar di panel kanan, kisah lengkap di sisi kiri.
(function () {
  const { useEffect, useRef, useMemo } = React;
  const html = htm.bind(React.createElement);
  const DER = { shahih: "Hadits shahih", sirah: "Kitab sirah", lemah: "Riwayat lemah" };
  const nama = (t) => (window.SIRAH.tokoh[t] ? window.SIRAH.tokoh[t].nama : t);
  const tempatNama = (t) => {
    if (!t) return "";
    if (t.kota) {
      const K = t.kota === "madinah" ? window.MADINAH : window.MEKAH;
      const p = K && K.tempat.find((x) => x.id === t.id);
      return (p ? p.nama : t.id) + (t.kota === "madinah" ? ", Madinah" : ", Mekah");
    }
    return t.nama;
  };
  const lemah = (e) => e.riwayat && e.riwayat.length > 0 && e.riwayat.every((r) => r.derajat === "lemah");

  function HijrahList({ sel, onSelect, onRute }) {
    const H = window.HIJRAH, fase = H.fase || [];
    return html`<aside class="panel nz-panel" aria-label="Kejadian Hijrah">
      <div class="loc-head plain">
        <h2>Hijrah</h2>
        <p class="loc-ket">Perjalanan Nabi ﷺ dari Mekah ke Madinah, ${H.episode.length} kejadian berurutan dari Bai'at Aqabah sampai persaudaraan Muhajirin dan Anshar.</p>
        <button type="button" class="nz-btn" onClick=${onRute}>Lihat rute di peta wilayah</button>
      </div>
      <div class="panel-body hj-body">
        ${fase.map((f) => {
          const list = H.episode.filter((e) => e.fase === f.id);
          if (!list.length) return null;
          return html`<section key=${f.id}><h3 class="sec">${f.nama}</h3><p class="hj-fk">${f.ket}</p>
            <ol class="nz-list">${list.map((e) => html`<li key=${e.id}><button type="button" class=${e.id === sel ? "on" : ""} aria-pressed=${e.id === sel} onClick=${() => onSelect(e.id)}>
              <span class="n">${e.no}</span>
              <span class="t"><b>${e.judul}</b><small class="y">${e.tanggal}</small>${lemah(e) && html`<small class="st lemah">Riwayat lemah</small>`}</span>
              ${e.tontonan && html`<span class="nz-play-dot" title="Ada tontonan kejadian" aria-label="Ada tontonan">▶</span>`}
            </button></li>`)}</ol></section>`;
        })}
        <section><h3 class="sec">Sumber</h3><ul class="srcs">${(H.sumber || []).map((s) => html`<li key=${s.url || s.judul}>${s.url ? html`<a href=${s.url} target="_blank" rel="noopener">${s.judul}</a>` : s.judul}</li>`)}</ul></section>
      </div>
    </aside>`;
  }

  function HijrahDetail({ id, onSelect, onClose, onWatch, onMap, onProfile }) {
    const H = window.HIJRAH, eps = H.episode;
    const i = Math.max(0, eps.findIndex((e) => e.id === id)), e = eps[i], prev = eps[i - 1], next = eps[i + 1];
    const f = (H.fase || []).find((x) => x.id === e.fase);
    const ref = useRef(null);
    useEffect(() => { if (ref.current) ref.current.scrollTop = 0; }, [id]);
    useEffect(() => { const k = (ev) => { if (ev.key === "Escape" && !document.querySelector(".overlay, .st-root")) onClose(); }; window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); });
    return html`<section class="nz-detail hj-detail" ref=${ref} aria-label=${e.judul}>
      <header class="nz-head">
        <div><p class="nz-k">Hijrah · kejadian ke-${e.no} dari ${eps.length}${f ? " · " + f.nama : ""}</p>
          <h2>${e.judul}</h2>${e.arab && html`<p class="nz-ar-sub" lang="ar" dir="rtl">${e.arab}</p>`}<p class="nz-sub">${e.ringkas}</p></div>
        <button type="button" class="close" onClick=${onClose} aria-label="Tutup">×</button>
      </header>
      <div class="nz-actions">
        ${e.tontonan ? html`<button type="button" class="nz-play" onClick=${() => onWatch(e.tontonan)}><span aria-hidden="true">▶</span> Putar kejadian</button>`
          : html`<span class="nz-noplay">Tontonan kejadian ini belum dibuat</span>`}
        <button type="button" class="nz-btn" onClick=${() => onMap(e)}>Lihat di peta</button>
      </div>
      <dl class="nz-facts">
        <div><dt>Waktu</dt><dd>${e.tanggal}</dd></div>
        <div><dt>Tempat</dt><dd>${tempatNama(e.tempat)}</dd></div>
        ${e.tokoh.length > 0 && html`<div><dt>Tokoh</dt><dd><div class="chips">${e.tokoh.map((t) => html`<button type="button" key=${t} class="chip" onClick=${() => onProfile(t)}>${window.SirahMedal && html`<${window.SirahMedal} id=${t} size="xs" />`}<span>${nama(t)}</span></button>`)}</div></dd></div>`}
      </dl>
      ${(e.ayat || []).map((a, k) => html`<div class="nz-ayat" key=${k}><p class="nz-ayat-h">QS. ${a.surah} : ${a.no}</p>
        <div class="nz-ay"><p class="ar" lang="ar" dir="rtl">${a.arab}</p>${a.arti && html`<p class="id">${a.arti}</p>`}</div></div>`)}
      <h3 class="nz-h">Kisahnya</h3>
      ${e.isi.map((p, k) => html`<p class="nz-p" key=${k}>${p}</p>`)}
      ${e.catatan && html`<div class="hj-catatan"><h4 class="nz-h4">Catatan</h4><p>${e.catatan}</p></div>`}
      <h4 class="nz-h4">Riwayat dan derajatnya</h4>
      <ul class="nz-catat">${e.riwayat.map((r, k) => html`<li key=${k}>${r.kutip && html`<p>"${r.kutip}"</p>`}
        <small><span class=${`nz-der ${r.derajat}`}>${DER[r.derajat] || r.derajat}</span> ${r.url ? html`<a href=${r.url} target="_blank" rel="noopener">${r.sumber}</a>` : r.sumber}</small>
        ${r.catatan && html`<small class="hj-rc">${r.catatan}</small>`}</li>`)}</ul>
      <footer class="nz-nav">
        ${prev ? html`<button type="button" onClick=${() => onSelect(prev.id)}><small>‹ Sebelumnya</small>${prev.judul}</button>` : html`<span></span>`}
        ${next ? html`<button type="button" class="r" onClick=${() => onSelect(next.id)}><small>Berikutnya ›</small>${next.judul}</button>` : html`<span></span>`}
      </footer>
    </section>`;
  }

  // Titik rute terdekat untuk sebuah kejadian (dipakai untuk menyorot di peta wilayah)
  function ruteIndex(e) {
    const R = window.HIJRAH.rute, t = e.tempat || {};
    if (t.kota === "mekah") return /tsur/.test(t.id) ? 1 : 0;
    if (t.kota === "madinah") return R.length - 1;
    if (t.lat == null) return -1;
    let b = -1, bd = 1e9;
    R.forEach((p, i) => { const d = Math.hypot(p.lat - t.lat, p.lon - t.lon); if (d < bd) { bd = d; b = i; } });
    return b;
  }

  window.SirahHijrahList = HijrahList;
  window.SirahHijrahDetail = HijrahDetail;
  window.SirahHijrahRute = ruteIndex;
})();
