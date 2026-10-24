// Perang zaman Rasul ﷺ: 27 ghazwah (daftar Ibnu Ishaq) dan Bani Qainuqa'. Daftar di panel kanan, detail di sisi kiri.
(function () {
  const { useState, useEffect, useRef, useMemo } = React;
  const html = htm.bind(React.createElement);
  const DER = { shahih: "Hadits shahih", sirah: "Kitab sirah", lemah: "Riwayat lemah" };
  const JENIS = { pertempuran: "Pertempuran", pengepungan: "Pengepungan", "tanpa-pertempuran": "Tanpa pertempuran" };
  const angka = (n) => (n == null ? "–" : n.toLocaleString("id-ID"));
  const urut = () => [...window.PERANG.daftar].sort((a, b) => a.urutWaktu - b.urutWaktu);
  // Sembilan ghazwah yang terjadi pertempuran menurut Ibnu Ishaq
  const SEMBILAN = new Set(["badar", "uhud", "khandaq", "quraizhah", "mushthaliq", "khaibar", "fathumakkah", "hunain", "thaif"]);
  const bertempur = (p) => SEMBILAN.has(p.id);
  const lawanSingkat = (s) => (s || "").split(/[:(]/)[0].trim();

  function Orang({ x, onProfile }) {
    const D = window.SIRAH, M = window.SirahMedal;
    if (D.tokoh[x]) return html`<button type="button" class="chip" onClick=${() => onProfile(x)}>${M && html`<${M} id=${x} size="xs" />`}<span>${D.tokoh[x].nama}</span></button>`;
    return html`<span class="chip plain"><span>${x}</span></span>`;
  }

  function PerangList({ sel, onSelect }) {
    const [f, setF] = useState("semua");
    const all = urut();
    const list = all.filter((p) => f === "semua" || (f === "tempur" ? bertempur(p) : !bertempur(p)));
    const tahun = [...new Set(list.map((p) => p.tahun))];
    return html`<aside class="panel nz-panel" aria-label="Daftar perang">
      <div class="loc-head plain">
        <h2>Perang zaman Rasul ﷺ</h2>
        <p class="loc-ket">27 ghazwah yang dipimpin Nabi ﷺ sendiri menurut Ibnu Ishaq, ditambah pengepungan Bani Qainuqa' (Ibnu Sa'd). Sembilan di antaranya terjadi pertempuran.</p>
        <div class="nz-seg small" role="group" aria-label="Saring">
          ${[["semua", `Semua (${all.length})`], ["tempur", `Bertempur (${all.filter(bertempur).length})`], ["tidak", "Lainnya"]].map(([k, l]) =>
            html`<button key=${k} type="button" class=${f === k ? "on" : ""} aria-pressed=${f === k} onClick=${() => setF(k)}>${l}</button>`)}
        </div>
      </div>
      <div class="panel-body hj-body">
        ${tahun.map((y) => html`<section key=${y}><h3 class="sec">${y} M</h3>
          <ol class="nz-list">${list.filter((p) => p.tahun === y).map((p) => html`<li key=${p.id}><button type="button" class=${p.id === sel ? "on" : ""} aria-pressed=${p.id === sel} onClick=${() => onSelect(p.id)}>
            <span class="n">${p.no || "+"}</span>
            <span class="t"><b>${p.nama}</b><small>${p.bulan} · ${lawanSingkat(p.lawan)}</small>
              <small class="y">${p.muslim && p.muslim.jumlah ? angka(p.muslim.jumlah) + " muslim" : "Jumlah tak tercatat"}${p.musuh && p.musuh.jumlah ? " vs " + angka(p.musuh.jumlah) : ""}</small>
              <small class=${`st ${bertempur(p) ? "tempur" : ""}`}>${JENIS[p.jenis]}${bertempur(p) ? " · salah satu dari sembilan" : ""}</small></span>
            ${window.PERANG_SKENARIO && window.PERANG_SKENARIO[p.id] && html`<span class="nz-play-dot" title="Ada simulasi" aria-label="Ada simulasi">▶</span>`}
          </button></li>`)}</ol></section>`)}
        <p class="kr-catat">${window.PERANG.catatan}</p>
      </div>
    </aside>`;
  }

  function Pasukan({ p }) {
    const m = p.muslim || {}, u = p.musuh || {};
    const max = Math.max(m.jumlah || 0, u.jumlah || 0, 1);
    const bar = (n, cls) => html`<i class=${cls} style=${{ width: n ? Math.max(4, (n / max) * 100) + "%" : "0" }}></i>`;
    return html`<div class="pr-kekuatan">
      <div class="pr-side muslim"><p class="pr-lbl">Kaum muslimin</p><p class="pr-n">${m.jumlah ? "±" + angka(m.jumlah) : "Tak tercatat"}</p>
        <div class="pr-bar">${bar(m.jumlah, "m")}</div>${(m.kuda || m.unta) && html`<p class="pr-x">${m.kuda ? `${m.kuda} kuda` : ""}${m.kuda && m.unta ? " · " : ""}${m.unta ? `${m.unta} unta` : ""}</p>`}</div>
      <div class="pr-side musuh"><p class="pr-lbl">${lawanSingkat(p.lawan) || "Pihak lawan"}</p><p class="pr-n">${u.jumlah ? "±" + angka(u.jumlah) : "Tak tercatat"}</p>
        <div class="pr-bar">${bar(u.jumlah, "u")}</div></div>
    </div>`;
  }

  function PerangDetail({ id, onSelect, onClose, onWatch, onMap, onProfile, onSim }) {
    const all = urut(), i = Math.max(0, all.findIndex((p) => p.id === id)), p = all[i], prev = all[i - 1], next = all[i + 1];
    const ref = useRef(null);
    useEffect(() => { if (ref.current) ref.current.scrollTop = 0; }, [id]);
    const sim = window.PERANG_SKENARIO && window.PERANG_SKENARIO[p.id];
    const k = p.korban || {};
    return html`<section class="nz-detail pr-detail" ref=${ref} aria-label=${p.nama}>
      <header class="nz-head">
        <div><p class="nz-k">${p.no ? `Ghazwah ke-${p.no} dari 27` : "Tambahan menurut Ibnu Sa'd"} · ${JENIS[p.jenis]}</p>
          <h2>${p.nama}</h2>${p.arab && html`<p class="nz-ar-sub" lang="ar" dir="rtl">${p.arab}</p>`}<p class="nz-sub">${p.ringkas}</p></div>
        <button type="button" class="close" onClick=${onClose} aria-label="Tutup">×</button>
      </header>
      <div class="nz-actions">
        ${sim && html`<button type="button" class="nz-play" onClick=${() => onSim(p.id)}><span aria-hidden="true">▶</span> Simulasi dan susunan pasukan</button>`}
        ${p.tontonan && html`<button type="button" class="nz-btn" onClick=${() => onWatch(p.tontonan)}>Tonton kisahnya</button>`}
        <button type="button" class="nz-btn" onClick=${() => onMap(p)}>Lihat di peta</button>
      </div>
      <${Pasukan} p=${p} />
      <dl class="nz-facts">
        <div><dt>Waktu</dt><dd>${p.tanggal || p.bulan} (${p.tahun} M)</dd></div>
        <div><dt>Tempat</dt><dd>${p.tempat.nama}</dd></div>
        <div><dt>Lawan</dt><dd>${p.lawan}</dd></div>
        <div class="lebar"><dt>Jumlah pasukan</dt><dd>${p.muslim && p.muslim.ket}${p.musuh && p.musuh.ket ? html`<br />${p.musuh.ket}` : ""}</dd></div>
        <div class="lebar"><dt>Korban</dt><dd>${k.muslim != null ? `${angka(k.muslim)} muslim syahid` : ""}${k.muslim != null && k.musuh != null ? "; " : ""}${k.musuh != null ? `${angka(k.musuh)} dari pihak lawan tewas` : ""}${k.ket ? html`<small class="pr-ket">${k.ket}</small>` : ""}</dd></div>
        <div class="lebar"><dt>Hasil</dt><dd>${p.hasil}</dd></div>
        ${p.panji && html`<div><dt>Panji</dt><dd>${p.panji}</dd></div>`}
        ${p.wakilMadinah && html`<div><dt>Wakil di Madinah</dt><dd>${p.wakilMadinah}</dd></div>`}
      </dl>
      ${p.panglima && html`<div class="pr-pang">
        ${(p.panglima.muslim || []).length > 0 && html`<div><h4 class="nz-h4">Tokoh kaum muslimin</h4><div class="chips">${p.panglima.muslim.map((x) => html`<${Orang} key=${x} x=${x} onProfile=${onProfile} />`)}</div></div>`}
        ${(p.panglima.musuh || []).length > 0 && html`<div><h4 class="nz-h4">Tokoh pihak lawan</h4><div class="chips">${p.panglima.musuh.map((x) => html`<${Orang} key=${x} x=${x} onProfile=${onProfile} />`)}</div></div>`}
      </div>`}
      <h3 class="nz-h">Jalannya peristiwa</h3>
      <ol class="pr-kron">${p.kronologi.map((c, j) => html`<li key=${j}><h4>${c.judul}</h4><p class="nz-p">${c.isi}</p></li>`)}</ol>
      ${(p.ayat || []).map((a, j) => html`<div class="nz-ayat" key=${j}><p class="nz-ayat-h">QS. ${a.surah} : ${a.no}</p>
        <div class="nz-ay"><p class="ar" lang="ar" dir="rtl">${a.arab}</p>${a.arti && html`<p class="id">${a.arti}</p>`}</div></div>`)}
      ${p.catatan && html`<div class="hj-catatan"><h4 class="nz-h4">Catatan</h4><p>${p.catatan}</p></div>`}
      <h4 class="nz-h4">Rujukan</h4>
      <ul class="nz-catat">${(p.riwayat || []).map((r, j) => html`<li key=${j}><small><span class=${`nz-der ${r.derajat}`}>${DER[r.derajat] || r.derajat}</span> ${r.url ? html`<a href=${r.url} target="_blank" rel="noopener">${r.sumber}</a>` : r.sumber}</small></li>`)}</ul>
      <footer class="nz-nav">
        ${prev ? html`<button type="button" onClick=${() => onSelect(prev.id)}><small>‹ Sebelumnya</small>${prev.nama}</button>` : html`<span></span>`}
        ${next ? html`<button type="button" class="r" onClick=${() => onSelect(next.id)}><small>Berikutnya ›</small>${next.nama}</button>` : html`<span></span>`}
      </footer>
    </section>`;
  }

  // Wadah simulasi: komponen dari perang-sim.js memenuhi wadah ini
  function PerangSim({ id, onClose, onProfile }) {
    const S = window.SirahSimulasi;
    return html`<section class="nz-detail ps-host" aria-label="Simulasi perang">
      ${S ? html`<${S} id=${id} onClose=${onClose} onProfile=${onProfile} />` : html`<p class="nz-p">Simulasi belum tersedia.</p>`}
    </section>`;
  }

  window.SirahPerangList = PerangList;
  window.SirahPerangDetail = PerangDetail;
  window.SirahPerangSim = PerangSim;
})();
