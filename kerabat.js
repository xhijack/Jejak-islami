// Kekerabatan: jaringan keluarga, pernikahan, susuan/asuhan, dan persaudaraan (muakhah) di sekitar Nabi ﷺ.
// DRAF: setiap hubungan wajib diverifikasi ustadz. Hubungan orang tua dan pernikahan bersumber dari profil
// masing-masing tokoh (Wikipedia/sunnah.com); hubungan khusus dan muakhah diberi rujukan sendiri.
(function () {
  const { useState, useEffect, useRef, useMemo } = React;
  const html = htm.bind(React.createElement);
  const D = window.SIRAH;
  const SN = (k) => "https://sunnah.com/" + k;
  const WK = (k) => "https://en.wikipedia.org/wiki/" + k;

  // Tokoh perempuan, untuk istilah ayah/ibu, putra/putri, dan seterusnya
  const PR = new Set(["aminah", "khadijah", "aisyah", "fatimah", "halimah", "ummuaiman", "zainab", "ruqayyah", "ummukultsum", "safiyyah",
    "saudah", "hafshah", "zainabkhuzaimah", "ummusalamah", "zainabjahsy", "juwairiyah", "ummuhabibah", "shafiyyah", "maimunah", "mariyah",
    "sumayyah", "ummusulaim", "nusaibah", "asma", "rufaidah", "khansa", "ummuhani", "ummuruman", "ummujamil", "hindun"]);

  // [orang tua, [anak, ...]]
  const ORTU = [
    ["abdulmuthalib", ["abdullah", "abuthalib", "hamzah", "abbas", "abulahab", "safiyyah"]],
    ["abdullah", ["nabi"]], ["aminah", ["nabi"]],
    ["nabi", ["zainab", "ruqayyah", "ummukultsum", "fatimah", "ibrahim"]],
    ["khadijah", ["zainab", "ruqayyah", "ummukultsum", "fatimah"]],
    ["mariyah", ["ibrahim"]],
    ["abuthalib", ["ali", "jafar", "ummuhani"]],
    ["ali", ["hasan", "husain"]], ["fatimah", ["hasan", "husain"]],
    ["abubakar", ["aisyah", "asma"]], ["ummuruman", ["aisyah"]],
    ["umar", ["hafshah", "ibnuumar"]],
    ["abbas", ["ibnuabbas"]],
    ["safiyyah", ["zubair"]],
    ["zubair", ["abdullahzubair"]], ["asma", ["abdullahzubair"]],
    ["zaid", ["usamah"]], ["ummuaiman", ["usamah"]],
    ["yasir", ["ammar"]], ["sumayyah", ["ammar"]],
    ["abujahal", ["ikrimah"]],
    ["abusufyan", ["muawiyah", "yazid", "ummuhabibah"]], ["hindun", ["muawiyah"]],
    ["utbah", ["hindun"]],
    ["walid", ["khalid"]],
    ["ummusulaim", ["anas"]],
  ];

  // [suami, istri, catatan]
  const NIKAH = [
    ["abdullah", "aminah"],
    ...["khadijah", "saudah", "aisyah", "hafshah", "zainabkhuzaimah", "ummusalamah", "zainabjahsy", "juwairiyah", "ummuhabibah", "shafiyyah", "maimunah"].map((w) => ["nabi", w]),
    ["ali", "fatimah"],
    ["utsman", "ruqayyah", "wafat 624 M"], ["utsman", "ummukultsum", "dinikahi setelah Ruqayyah wafat"],
    ["abubakar", "ummuruman"], ["abulahab", "ummujamil"], ["abusufyan", "hindun"],
    ["zaid", "ummuaiman"], ["zaid", "zainabjahsy", "bercerai, lalu Zainab dinikahi Nabi (QS. Al-Ahzab: 37)", true],
    ["zubair", "asma"], ["abuthalhah", "ummusulaim"], ["yasir", "sumayyah"],
  ];

  // [a, b, a bagi b, b bagi a, kelompok, catatan, sumber]
  const KHUSUS = [
    ["halimah", "nabi", "ibu susuan", "anak susuan", "susuan", "Menyusui Nabi di perkampungan Bani Sa'ad", WK("Halimah_bint_Abi_Dhuayb")],
    ["ummuaiman", "nabi", "pengasuh sejak kecil", "anak asuh", "susuan", "Mengasuh Nabi sejak bayi dan masa kecil", WK("Umm_Ayman")],
    ["zaid", "nabi", "anak angkat", "ayah angkat", "susuan", "Dahulu dipanggil Zaid bin Muhammad sampai turun QS. Al-Ahzab: 5", SN("bukhari:4782")],
    ["hamzah", "nabi", "saudara sesusuan", "saudara sesusuan", "susuan", "Nabi menyebut putri Hamzah \"putri saudaraku sesusuan\"; menurut Al-Isti'ab, keduanya disusui Tsuwaibah", SN("bukhari:5100")],
    ["waraqah", "khadijah", "sepupu", "sepupu", "darah", "Putra paman Khadijah", SN("bukhari:3")],
    ["khadijah", "zubair", "bibi (saudari ayahnya)", "keponakan", "darah", "Ayah Az-Zubair, Al-Awwam, adalah saudara Khadijah", WK("Zubayr_ibn_al-Awwam")],
    ["maimunah", "ibnuabbas", "bibi (saudari ibunya)", "keponakan", "darah", "Ibu Ibnu Abbas, Lubabah, adalah saudari Maimunah", SN("bukhari:117")],
    ["maimunah", "khalid", "bibi (saudari ibunya)", "keponakan", "darah", "Maimunah adalah bibi Khalid dan Ibnu Abbas", SN("bukhari:5391")],
    ["maimunah", "zainabkhuzaimah", "seibu (diperselisihkan)", "seibu (diperselisihkan)", "darah", "Menurut satu riwayat (Al-Jurjani, dinukil Ibnu Abdil Barr) ibu keduanya Hind binti Auf; Ibnu Abdil Barr dan Ibnu Katsir menilainya lemah", WK("Zaynab_bint_Khuzayma")],
    ["utsmanmazhun", "hafshah", "paman (saudara ibunya)", "keponakan", "darah", "Ibu Hafshah, Zainab binti Mazh'un, adalah saudari Utsman bin Mazh'un", WK("Uthman_ibn_Maz%27un")],
    ["utsmanmazhun", "ibnuumar", "paman (saudara ibunya)", "keponakan", "darah", "Ibu Ibnu Umar, Zainab binti Mazh'un", WK("Uthman_ibn_Maz%27un")],
    ["zainabjahsy", "nabi", "sepupu", "sepupu", "darah", "Ibunya, Umaimah, adalah putri Abdul Muthalib", WK("Zaynab_bint_Jahsh")],
    ["saad", "nabi", "kerabat dari pihak ibu", "kerabat dari pihak ibu", "darah", "Sama-sama dari Bani Zuhrah, kabilah Aminah: Sa'ad bin Malik bin Uhaib bin Abdu Manaf bin Zuhrah, Aminah binti Wahb bin Abdu Manaf bin Zuhrah. Hadits \"Ini pamanku\" (HR. Tirmidzi 3752) sanadnya dinilai lemah", WK("Sa%27d_ibn_Abi_Waqqas")],
    ["abusufyan", "ummujamil", "saudara", "saudari", "darah", "Anak-anak Harb bin Umayyah", WK("Umm_Jamil")],
    ["abujahal", "khalid", "sepupu", "sepupu", "darah", "Ayah mereka, Hisyam dan Al-Walid, putra Al-Mughirah", WK("Khalid_ibn_al-Walid")],
    ["ummusalamah", "khalid", "sepupu", "sepupu", "darah", "Ayahnya, Abu Umayyah, putra Al-Mughirah", WK("Umm_Salama")],
    ["ummusalamah", "abujahal", "sepupu", "sepupu", "darah", "Sama-sama cucu Al-Mughirah (Bani Makhzum)", WK("Banu_Makhzum")],
    ["said", "umar", "sepupu dan ipar", "sepupu dan ipar", "darah", "Suami Fatimah binti Khattab, adik Umar. Ayah Sa'id (Zaid bin Amr) dan Al-Khattab saudara seibu; Al-Khattab juga paman Zaid dari pihak ayah", WK("Umar")],
    ["asad", "saadmuadz", "sepupu", "sepupu", "darah", "Anak bibi dari pihak ibu, menurut Ibnu Ishaq", WK("As%27ad_ibn_Zurara")],
    ["ibnuummimaktum", "khadijah", "sepupu (dari pihak ibu)", "sepupu (dari pihak ibu)", "darah", "Ayahnya, Qais bin Za'idah, adalah saudara ibu Khadijah (Al-Isti'ab)", "https://hadithtransmitters.hawramani.com/%d8%b9%d9%85%d8%b1%d9%88-%d8%a8%d9%86-%d9%82%d9%8a%d8%b3-%d8%a8%d9%86-%d8%b2%d8%a7%d8%a6%d8%af%d8%a9-%d8%a8%d9%86-%d8%a7%d9%84%d8%a7%d8%b5%d9%85/"],
    ["hassan", "mariyah", "ipar (suami saudarinya, Sirin)", "ipar (saudari istrinya, Sirin)", "nikah", "Sirin, saudari Mariyah, diberikan Nabi kepada Hassan", WK("Maria_al-Qibtiyya")],
    ["uqbah", "utsman", "ayah tiri", "anak tiri", "nikah", "Menikahi Arwa binti Kuraiz, ibu Utsman, setelah Affan wafat", WK("Walid_ibn_Uqba")],
    ["utsman", "nabi", "anak sepupu", "sepupu ibunya", "darah", "Ibu Utsman, Arwa binti Kuraiz, adalah sepupu Nabi", WK("Uthman")],
    ["ummuhabibah", "utsman", "sepupu", "sepupu", "darah", "Ibunya, Shafiyyah binti Abil Ash, adalah bibi Utsman", WK("Umm_Habiba")],
    ["ummuhabibah", "zainabjahsy", "ipar", "ipar", "nikah", "Suami pertama Ummu Habibah, Ubaidullah bin Jahsy, saudara Zainab", WK("Umm_Habiba")],
    ["abbas", "maimunah", "ipar", "ipar", "nikah", "Istri Al-Abbas, Lubabah (Ummul Fadhl), saudari kandung Maimunah", WK("Lubaba_bint_al-Harith")],
    ["ibnuabbas", "khalid", "sepupu", "sepupu", "darah", "Ibu mereka, Lubabah Al-Kubra dan Lubabah Ash-Shughra, bersaudari; Maimunah bibi keduanya", SN("bukhari:5391")],,
  ];

  // Persaudaraan (muakhah) yang diikat Nabi setelah Hijrah: [a, b, derajat, sumber, catatan]
  const MUAKHAH = [
    ["salman", "abudarda", "shahih", SN("bukhari:1968")],
    ["abuubaidah", "abuthalhah", "shahih", SN("muslim:2528"), "Menurut Ibnu Ishaq, Abu Ubaidah dipersaudarakan dengan Sa'ad bin Mu'adz"],
    ["abuubaidah", "saadmuadz", "sirah (Ibnu Ishaq)", "https://hadithunlocked.com/ibnhisham:587", "Riwayat lain dari HR. Muslim 2528 memasangkannya dengan Abu Thalhah"],
    ["thalhah", "kaab", "sirah (Ibnu Ishaq)", "https://hadithunlocked.com/ibnhisham:587", "Ibnu Sa'd memasangkan Thalhah dengan Sa'id bin Zaid"],
    ["mushab", "abuayyub", "sirah (Ibnu Ishaq)", "https://hadithunlocked.com/ibnhisham:587"],
    ["jafar", "muadz", "sirah (Ibnu Ishaq)", "https://hadithunlocked.com/ibnhisham:587", "Ja'far saat itu masih di Habasyah"],
    ["hamzah", "zaid", "sirah (Ibnu Ishaq)", "https://hadithunlocked.com/ibnhisham:587", "Keduanya Muhajirin; Zaid menyebut putri Hamzah \"putri saudaraku\" (HR. Bukhari 4251)"],
    ["said", "ubay", "sirah (Ibnu Ishaq)", "https://hadithunlocked.com/ibnhisham:587"],
    ["nabi", "ali", "sirah (Ibnu Ishaq)", "https://hadithunlocked.com/ibnhisham:587", "Nabi memegang tangan Ali dan bersabda, \"Ini saudaraku\" (Ibnu Ishaq). Hadits Tirmidzi 3720 tentang hal ini dinilai lemah"],
  ];

  const JENIS = [
    ["darah", "Keluarga sedarah", "#d4ae5a"],
    ["nikah", "Pernikahan", "#e07a8a"],
    ["susuan", "Susuan dan asuhan", "#6fc6a0"],
    ["muakhah", "Persaudaraan (muakhah)", "#7fb2ff"],
  ];
  const WARNA = Object.fromEntries(JENIS.map(([k, , c]) => [k, c]));

  // ---------- Graf ----------
  const EDGES = [];
  ORTU.forEach(([p, cs]) => cs.forEach((c) => EDGES.push({ a: p, b: c, k: "ortu", g: "darah" })));
  NIKAH.forEach(([h, w, note, cerai]) => EDGES.push({ a: h, b: w, k: "nikah", g: "nikah", note, cerai: !!cerai }));
  KHUSUS.forEach(([a, b, ab, ba, g, note, src]) => EDGES.push({ a, b, k: "khusus", g, ab, ba, note, src }));
  MUAKHAH.forEach(([a, b, der, src, cat]) => EDGES.push({ a, b, k: "muakhah", g: "muakhah", der, src, note: (a === "nabi" ? "Persaudaraan setelah Hijrah" : "Dipersaudarakan Nabi setelah Hijrah") + ` (${der})` + (cat ? `. ${cat}` : "") }));
  const valid = EDGES.filter((e) => D.tokoh[e.a] && D.tokoh[e.b]);
  if (valid.length !== EDGES.length) console.warn("kerabat: ada id tokoh tidak dikenal", EDGES.filter((e) => !valid.includes(e)));

  const g = (id, m, f) => (PR.has(id) ? f : m);
  // Langkah dari x ke tetangga: label = siapa tetangga itu bagi x
  function step(e, from) {
    const to = e.a === from ? e.b : e.a, fwd = e.a === from;
    if (e.k === "ortu") return fwd ? { to, dir: "down", label: g(to, "putra", "putri") } : { to, dir: "up", label: g(to, "ayah", "ibu") };
    if (e.k === "nikah") return { to, dir: "sp", label: (fwd ? "istri" : "suami") + (e.cerai ? " (kemudian bercerai)" : "") };
    if (e.k === "khusus") {
      const lab = fwd ? e.ba : e.ab;
      const dir = /^saudar/.test(lab) && e.g === "darah" ? "sib" : "k";
      return { to, dir, label: lab };
    }
    return { to, dir: "m", label: "saudara seiman (muakhah)" };
  }
  const ADJ = {};
  valid.forEach((e) => { [e.a, e.b].forEach((x) => { (ADJ[x] = ADJ[x] || []).push(e); }); });
  const NODES = Object.keys(ADJ);
  const URUT_G = { darah: 0, nikah: 1, susuan: 2, muakhah: 3 };

  // Jalur terpendek berbobot: hubungan darah dan pernikahan didahulukan, muakhah paling akhir
  const BOBOT = (e) => (e.g === "muakhah" ? 2.5 : e.g === "susuan" ? 1.3 : e.k === "khusus" ? 1.1 : e.k === "nikah" ? 1.05 : 1);
  function cariJalur(a, b, on, tanpa) {
    if (a === b) return [];
    const dist = { [a]: 0 }, prev = { [a]: null }, done = new Set();
    for (;;) {
      let x = null;
      for (const k in dist) if (!done.has(k) && (x === null || dist[k] < dist[x])) x = k;
      if (x === null) return null;
      if (x === b) break;
      done.add(x);
      (ADJ[x] || []).forEach((e) => {
        if (!on[e.g] || (tanpa && tanpa.has(e))) return;
        const s = step(e, x), nd = dist[x] + BOBOT(e);
        if (done.has(s.to) || (s.to in dist && dist[s.to] <= nd)) return;
        dist[s.to] = nd; prev[s.to] = { from: x, e, s };
      });
    }
    const out = []; let y = b;
    while (prev[y]) { out.unshift(prev[y]); y = prev[y].from; }
    return out;
  }
  // Jalur lain: buang satu hubungan dari jalur utama lalu cari ulang
  function jalurLain(a, b, on, utama, max = 3) {
    if (!utama || !utama.length) return [];
    const sig = (p) => p.map((x) => x.s.to).join(">"), berat = (p) => p.reduce((s, x) => s + BOBOT(x.e), 0);
    const cand = [];
    const tambah = (p) => { if (p && p.length && p.length <= 4) cand.push(p); };
    const varian = (p, o) => p.forEach((u) => tambah(cariJalur(a, b, o, new Set([u.e]))));
    varian(utama, on);
    [{ darah: on.darah }, { darah: on.darah, nikah: on.nikah }, { ...on, muakhah: false }].forEach((o) => { const p = cariJalur(a, b, o); tambah(p); p && varian(p, o); });
    // Buang jalur memutar: yang melewati semua simpul antara dari jalur lain yang lebih pendek
    const terima = [utama], seen = new Set([sig(utama)]);
    cand.sort((p, q) => berat(p) - berat(q)).forEach((p) => {
      if (seen.has(sig(p))) return; seen.add(sig(p));
      if (!istilah(p) && (!kalimat(a, p) || utama.length === 1)) return;
      const sp = new Set(p.map((x) => x.s.to));
      if (terima.some((q) => q.length > 1 && q.length < p.length && q.slice(0, -1).every((x) => sp.has(x.s.to)))) return;
      terima.push(p);
    });
    return terima.slice(1, max + 1);
  }
  // Semua jalur, diurutkan: hubungan yang punya istilah kekerabatan (terutama sedarah) didahulukan
  function semuaJalur(a, b, on) {
    const u = cariJalur(a, b, on);
    if (!u || !u.length) return u;
    const darahMurni = (p) => p.every((x) => x.e.k === "ortu" || (x.e.g === "darah" && x.s.dir === "sib"));
    const skor = (p) => p.reduce((s, x) => s + BOBOT(x.e), 0) - (istilah(p) ? 1 : 0) - (istilah(p) && darahMurni(p) ? 1 : 0);
    return [u, ...jalurLain(a, b, on, u)].sort((p, q) => skor(p) - skor(q));
  }

  // Istilah kekerabatan dari pola langkah (hanya untuk hubungan darah dan pernikahan)
  function istilah(path) {
    if (!path || !path.length || path.some((p) => p.s.dir === "k" || p.s.dir === "m")) return null;
    const n = [];
    path.forEach((p) => {
      const d = p.s.dir;
      if (d === "down" && n[n.length - 1] === "up") n[n.length - 1] = "sib";
      else if (d === "sib" && n[n.length - 1] === "sib") return;
      else n.push(d);
    });
    const last = path[path.length - 1].s.to, f = PR.has(last);
    const T = {
      "up": f ? "ibu" : "ayah", "down": f ? "putri" : "putra", "sp": f ? "istri" : "suami", "sib": f ? "saudari" : "saudara",
      "up up": f ? "nenek" : "kakek", "down down": "cucu", "up sib": f ? "bibi" : "paman", "sib down": "keponakan",
      "up sib down": "sepupu", "sp up": "mertua", "down sp": "menantu", "sp sib": "ipar", "sib sp": "ipar",
      "up sp": f ? "ibu tiri" : "ayah tiri", "sp down": "anak tiri", "down up": f ? "ibu dari anaknya" : "ayah dari anaknya",
      "down sp up": "besan", "up sib sp": f ? "bibi (istri paman)" : "paman (suami bibi)", "up up sib": f ? "saudari kakek" : "saudara kakek",
      "up sib down down": "anak sepupu",
    };
    return T[n.join(" ")] || null;
  }
  const dasar = (l) => l.replace(/\s*\(.*\)$/, "");
  const nya = (l) => { const m = l.match(/^(.*?)(\s*\(.*\))?$/); return m[1] + "nya" + (m[2] || ""); };
  function kalimat(a, path) {
    if (!path || !path.length) return null;
    const nm = (id) => D.tokoh[id].nama;
    // "putra dari ayah" diringkas menjadi "saudara"
    const lab = [];
    path.forEach((p, i) => {
      if (p.s.dir === "down" && i && path[i - 1].s.dir === "up" && lab.length) lab[lab.length - 1] = PR.has(p.s.to) ? "saudari" : "saudara";
      else lab.push(dasar(p.s.label));
    });
    if (lab.length > 3) return null;
    const chain = lab.reverse().join(" dari ");
    return `${nm(path[path.length - 1].s.to)} adalah ${chain} ${nm(a)}`;
  }

  // ---------- Tata letak gaya (deterministik) ----------
  let LAYOUT = null;
  function layout() {
    if (LAYOUT) return LAYOUT;
    const P = {};
    const order = NODES.slice().sort((x, y) => (x === "nabi" ? -1 : y === "nabi" ? 1 : ADJ[y].length - ADJ[x].length));
    order.forEach((id, i) => { const a = i * 2.39996, r = i ? 60 + 34 * Math.sqrt(i) : 0; P[id] = { x: Math.cos(a) * r, y: Math.sin(a) * r, vx: 0, vy: 0 }; });
    const N = order.length, IT = 700;
    for (let it = 0; it < IT; it++) {
      const cool = 1 - it / IT;
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const p = P[order[i]], q = P[order[j]];
        let dx = p.x - q.x, dy = p.y - q.y, d2 = dx * dx + dy * dy;
        if (d2 < 1) { dx = 0.5; dy = 0.3; d2 = 1; }
        const f = 8200 / d2, d = Math.sqrt(d2);
        p.vx += dx / d * f; p.vy += dy / d * f; q.vx -= dx / d * f; q.vy -= dy / d * f;
      }
      valid.forEach((e) => {
        const p = P[e.a], q = P[e.b], dx = q.x - p.x, dy = q.y - p.y, d = Math.max(1, Math.hypot(dx, dy));
        const L = e.g === "muakhah" ? 170 : e.k === "nikah" && e.a === "nabi" ? 150 : 90, f = (d - L) * 0.045;
        p.vx += dx / d * f; p.vy += dy / d * f; q.vx -= dx / d * f; q.vy -= dy / d * f;
      });
      order.forEach((id) => {
        const p = P[id]; p.vx -= p.x * 0.006; p.vy -= p.y * 0.006;
        const v = Math.hypot(p.vx, p.vy), cap = 2 + 24 * cool;
        if (v > cap) { p.vx *= cap / v; p.vy *= cap / v; }
        p.x += p.vx; p.y += p.vy; p.vx *= 0.6; p.vy *= 0.6;
      });
      P.nabi.x = 0; P.nabi.y = 0;
    }
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    order.forEach((id) => { const p = P[id]; x0 = Math.min(x0, p.x); y0 = Math.min(y0, p.y); x1 = Math.max(x1, p.x); y1 = Math.max(y1, p.y); });
    LAYOUT = { P, box: [x0 - 70, y0 - 50, x1 - x0 + 140, y1 - y0 + 110] };
    return LAYOUT;
  }

  // Nama pendek untuk label simpul; nama yang bentrok memakai nama lengkap
  const SINGKAT = (() => {
    const fix = { nabi: "Muhammad ﷺ", ibnuabbas: "Ibnu Abbas", ibnuumar: "Ibnu Umar", abdullahzubair: "Ibnu Zubair", abdullah: "Abdullah (ayah Nabi)",
      abubakar: "Abu Bakar", ummuhabibah: "Ummu Habibah", ummujamil: "Ummu Jamil", ummuaiman: "Ummu Aiman", halimah: "Halimah", mariyah: "Mariyah", khalid: "Khalid", walid: "Al-Walid" };
    const raw = {};
    NODES.forEach((id) => { raw[id] = fix[id] || D.tokoh[id].nama.replace(/\s*\(.*\)/, "").split(/ (bin|binti) /)[0].replace(/^(Al|Az|An|Ash|As)-/, (m) => m); });
    const cnt = {}; Object.values(raw).forEach((v) => (cnt[v] = (cnt[v] || 0) + 1));
    NODES.forEach((id) => { if (cnt[raw[id]] > 1 && !fix[id]) raw[id] = D.tokoh[id].nama.replace(/\s*\(.*\)/, ""); });
    return raw;
  })();

  const kelompokSimpul = (id) => {
    const k = (D.tokoh[id].kel || []);
    if (id === "nabi") return "nabi";
    if (k.includes("istri")) return "istri";
    if (k.includes("penentang")) return "penentang";
    if (k.includes("keluarga")) return "keluarga";
    if (k.includes("anshar")) return "anshar";
    return "sahabat";
  };
  const SIMPUL = [["nabi", "Nabi ﷺ"], ["keluarga", "Keluarga Nabi"], ["istri", "Istri Nabi"], ["sahabat", "Sahabat"], ["anshar", "Anshar"], ["penentang", "Penentang"]];

  // ---------- Jaringan (SVG) ----------
  function Jaringan({ focus, onFocus, on, path }) {
    const { P, box } = layout();
    const svg = useRef(null);
    const [tf, setTf] = useState({ x: 0, y: 0, k: 1 });
    const drag = useRef(null);
    const pathE = useMemo(() => new Set((path || []).map((p) => p.e)), [path]);
    const pathN = useMemo(() => new Set(path && path.length ? [path[0].from, ...path.map((p) => p.s.to)] : []), [path]);
    const neigh = useMemo(() => { const s = new Set([focus]); (ADJ[focus] || []).forEach((e) => on[e.g] && s.add(e.a === focus ? e.b : e.a)); return s; }, [focus, on]);
    const jalur = path && path.length > 0;
    const terang = (id) => (jalur ? pathN.has(id) : neigh.has(id));
    const edgeOn = (e) => (jalur ? pathE.has(e) : e.a === focus || e.b === focus);

    const toLocal = (cx, cy) => {
      const r = svg.current.getBoundingClientRect();
      const s = Math.min(r.width / box[2], r.height / box[3]);
      const ox = (r.width - box[2] * s) / 2, oy = (r.height - box[3] * s) / 2;
      return [(cx - r.left - ox) / s, (cy - r.top - oy) / s, s];
    };
    useEffect(() => {
      const el = svg.current; if (!el) return;
      const wheel = (ev) => {
        ev.preventDefault();
        const [lx, ly] = toLocal(ev.clientX, ev.clientY);
        setTf((t) => {
          const k = Math.min(4, Math.max(0.6, t.k * Math.exp(-ev.deltaY * (ev.ctrlKey ? 0.01 : 0.0015))));
          return { k, x: lx - (lx - t.x) * (k / t.k), y: ly - (ly - t.y) * (k / t.k) };
        });
      };
      el.addEventListener("wheel", wheel, { passive: false });
      return () => el.removeEventListener("wheel", wheel);
    }, []);
    const down = (ev) => { if (ev.button !== 0) return; drag.current = { x: ev.clientX, y: ev.clientY, t: tf, moved: false }; };
    const move = (ev) => {
      const d = drag.current; if (!d) return;
      const [, , s] = toLocal(0, 0), dx = (ev.clientX - d.x) / s, dy = (ev.clientY - d.y) / s;
      if (Math.abs(dx) + Math.abs(dy) > 2) d.moved = true;
      setTf({ ...d.t, x: d.t.x + dx, y: d.t.y + dy });
    };
    const up = () => { setTimeout(() => { drag.current = null; }, 0); };
    const zoom = (f) => setTf((t) => { const cx = box[2] / 2, cy = box[3] / 2, k = Math.min(4, Math.max(0.6, t.k * f)); return { k, x: cx - (cx - t.x) * (k / t.k), y: cy - (cy - t.y) * (k / t.k) }; });
    const klik = (id) => { if (drag.current && drag.current.moved) return; onFocus(id); };

    const X = (id) => P[id].x - box[0], Y = (id) => P[id].y - box[1];
    const es = valid.filter((e) => on[e.g]);
    const tampil = new Set(); es.forEach((e) => { tampil.add(e.a); tampil.add(e.b); }); tampil.add(focus);
    return html`<div class="kr-net">
      <svg ref=${svg} viewBox=${`0 0 ${box[2]} ${box[3]}`} role="img" aria-label="Jaringan kekerabatan" onPointerDown=${down} onPointerMove=${move} onPointerUp=${up} onPointerLeave=${up}>
        <defs><radialGradient id="kr-cahaya"><stop offset="0" stop-color="#fff6d8" stop-opacity=".9" /><stop offset="1" stop-color="#d4ae5a" stop-opacity="0" /></radialGradient></defs>
        <g transform=${`translate(${tf.x} ${tf.y}) scale(${tf.k})`}>
          ${es.map((e, i) => html`<line key=${i} x1=${X(e.a)} y1=${Y(e.a)} x2=${X(e.b)} y2=${Y(e.b)} stroke=${WARNA[e.g]}
            class=${`kr-e${edgeOn(e) ? " on" : ""}${e.g === "muakhah" || e.cerai ? " putus" : ""}`} />`)}
          ${NODES.filter((id) => tampil.has(id)).map((id) => {
            const kg = kelompokSimpul(id), r = id === "nabi" ? 15 : 9;
            return html`<g key=${id} class=${`kr-n k-${kg}${terang(id) ? " on" : ""}${id === focus ? " fokus" : ""}`} transform=${`translate(${X(id)} ${Y(id)})`}
              tabindex="0" role="button" aria-label=${`${D.tokoh[id].nama}, tampilkan kerabatnya`} onClick=${() => klik(id)}
              onKeyDown=${(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); onFocus(id); } }}>
              ${id === "nabi" && html`<circle r="34" fill="url(#kr-cahaya)" />`}
              <circle r=${r} />
              <text y=${r + 13}>${SINGKAT[id]}</text>
            </g>`;
          })}
        </g>
      </svg>
      <div class="kr-legend">
        <div>${JENIS.filter(([k]) => on[k]).map(([k, l, c]) => html`<span key=${k}><i style=${{ background: c }} class=${k === "muakhah" ? "putus" : ""}></i>${l}</span>`)}</div>
        <div>${SIMPUL.map(([k, l]) => html`<span key=${k}><b class=${`dot k-${k}`}></b>${l}</span>`)}</div>
      </div>
      <div class="kr-zoom tool-group">
        <button type="button" class="tool" onClick=${() => zoom(1.25)} aria-label="Perbesar">+</button>
        <button type="button" class="tool" onClick=${() => zoom(0.8)} aria-label="Perkecil">−</button>
        <button type="button" class="tool wide" onClick=${() => setTf({ x: 0, y: 0, k: 1 })}>Seluruh jaringan</button>
      </div>
      <p class="kr-hint">Klik nama untuk melihat kerabatnya. Geser untuk memindah, gulir untuk memperbesar.</p>
    </div>`;
  }

  // ---------- Panel ----------
  const nama = (id) => D.tokoh[id].nama;
  const PRESET = ["abubakar", "umar", "utsman", "ali", "muawiyah", "khalid", "zubair", "ibnuabbas", "abusufyan", "abulahab"];
  const pilihan = NODES.slice().sort((a, b) => nama(a).localeCompare(nama(b), "id"));

  function Rantai({ a, path }) {
    if (!path) return html`<p class="kr-none">Tidak ditemukan jalur dengan jenis hubungan yang sedang ditampilkan.</p>`;
    if (!path.length) return html`<p class="kr-none">Pilih dua tokoh yang berbeda.</p>`;
    const ist = istilah(path), kal = kalimat(a, path), M = window.SirahMedal;
    return html`<div class="kr-hasil">
      ${ist && html`<p class="kr-ist"><span>${nama(path[path.length - 1].s.to)}</span> adalah <b>${ist}</b> ${nama(a)}.</p>`}
      ${kal && html`<p class=${ist ? "kr-kal" : "kr-ist"}>${ist ? `Yaitu ${kal.replace(/^.*? adalah /, "")}` : kal}.</p>`}
      <ol class="kr-rantai">
        <li><span class="kr-tk">${M && html`<${M} id=${a} size="xs" />`}${nama(a)}</span></li>
        ${path.map((p, i) => html`<li key=${i}><small style=${{ color: WARNA[p.e.g] }}>${nya(p.s.label)}</small>
          <span class="kr-tk">${M && html`<${M} id=${p.s.to} size="xs" />`}${nama(p.s.to)}</span>
          ${p.e.src && html`<a class="kr-src" href=${p.e.src} target="_blank" rel="noopener">sumber</a>`}</li>`)}
      </ol>
      <p class="kr-step">${path.length} langkah hubungan.</p>
    </div>`;
  }
  function RantaiPendek({ a, path, onPick }) {
    const ist = istilah(path), kal = kalimat(a, path);
    return html`<li><button type="button" class="kr-alt" onClick=${onPick}>
      <b>${ist || (kal ? kal.replace(/^.*? adalah /, "") : `${path.length} langkah`)}</b>
      <small>${[a, ...path.map((p) => p.s.to)].map((id) => SINGKAT[id] || nama(id)).join(" → ")}</small></button></li>`;
  }

  let TERHUBUNG = null;
  const hitungTerhubung = () => TERHUBUNG || (TERHUBUNG = NODES.filter((t) => cariJalur("nabi", t, { darah: 1, nikah: 1, susuan: 1, muakhah: 1 })).length);
  function KerabatPanel({ focus, onFocus, from, to, setFrom, setTo, on, setOn, path, lain, onAlt, onProfile, onTokoh }) {
    const terhubung = hitungTerhubung();
    const M = window.SirahMedal, t = D.tokoh[focus];
    const rel = (ADJ[focus] || []).filter((e) => on[e.g]).map((e) => ({ e, s: step(e, focus) }))
      .sort((p, q) => URUT_G[p.e.g] - URUT_G[q.e.g]);
    const grup = JENIS.map(([k, l, c]) => [k, l, c, rel.filter((r) => r.e.g === k)]).filter((x) => x[3].length);
    return html`<aside class="panel nz-panel kr-panel" aria-label="Kekerabatan">
      <div class="loc-head plain">
        <h2>Kekerabatan</h2>
        <p class="loc-ket">Jaringan keluarga, pernikahan, susuan, dan persaudaraan para sahabat dengan Nabi ﷺ.</p>
      </div>
      <div class="panel-body">
        <section class="kr-box">
          <h3 class="sec">Jenis hubungan</h3>
          <div class="kr-jenis">${JENIS.map(([k, l, c]) => html`<label key=${k}><input type="checkbox" checked=${on[k]} onChange=${(e) => setOn({ ...on, [k]: e.target.checked })} /><i style=${{ background: c }}></i>${l}</label>`)}</div>
        </section>
        <section class="kr-box">
          <h3 class="sec">Cari hubungan dua tokoh</h3>
          <div class="kr-cari">
            <label><span>Dari</span><select value=${from} onChange=${(e) => setFrom(e.target.value)}>${pilihan.map((id) => html`<option key=${id} value=${id}>${nama(id)}</option>`)}</select></label>
            <button type="button" class="tool" aria-label="Tukar" title="Tukar" onClick=${() => { setFrom(to); setTo(from); }}>⇅</button>
            <label><span>Ke</span><select value=${to} onChange=${(e) => setTo(e.target.value)}>${pilihan.map((id) => html`<option key=${id} value=${id}>${nama(id)}</option>`)}</select></label>
          </div>
          <div class="kr-preset"><small>Nabi ﷺ dengan:</small>${PRESET.map((id) => html`<button key=${id} type="button" class=${from === "nabi" && to === id ? "chip on" : "chip"} onClick=${() => { setFrom("nabi"); setTo(id); }}>${SINGKAT[id] || nama(id)}</button>`)}</div>
          <${Rantai} a=${from} path=${path} />
          ${lain.length > 0 && html`<div class="kr-lain"><h4>Jalur lain</h4><ul>${lain.map((p, i) => html`<${RantaiPendek} key=${i} a=${from} path=${p} onPick=${() => onAlt(p)} />`)}</ul></div>`}
          ${path === null && html`<p class="kr-none">${terhubung} dari ${NODES.length} tokoh di jaringan ini terhubung ke Nabi ﷺ lewat keluarga, pernikahan, susuan, atau muakhah. Sebagian sahabat memang tidak bertalian kerabat dengan beliau.</p>`}
        </section>
        <section class="kr-box kr-tahu">
          <h3 class="sec">Tahukah?</h3>
          <p>Keempat Khulafaur Rasyidin terikat dengan Nabi lewat pernikahan. Abu Bakar dan Umar adalah mertua beliau, sedangkan Utsman dan Ali adalah menantu beliau.</p>
        </section>
        <section class="kr-box">
          <div class="kr-fokus">
            ${M && html`<${M} id=${focus} size="md" />`}
            <div><h3>${t.nama}</h3><p>${t.kira ? "±" : ""}${t.lahir}–${t.wafat} M · ${t.gelar}</p></div>
          </div>
          <div class="kr-aksi">
            <button type="button" class="chip" onClick=${() => onProfile(focus)}>Lihat profil</button>
            <button type="button" class="chip" onClick=${() => { setFrom("nabi"); setTo(focus); }} disabled=${focus === "nabi"}>Hubungannya dengan Nabi ﷺ</button>
            ${onTokoh && html`<button type="button" class="chip" onClick=${() => onTokoh(focus)}>Buka di halaman Tokoh</button>`}
          </div>
          ${!rel.length && html`<p class="kr-none">Belum ada hubungan kerabat yang dicatat untuk tokoh ini.</p>`}
          ${grup.map(([k, l, c, rs]) => html`<div key=${k} class="kr-grup"><h4><i style=${{ background: c }}></i>${l}</h4>
            <ul>${rs.map((r, i) => html`<li key=${i}><small>${r.s.label}</small>
              <button type="button" class="chip" onClick=${() => onFocus(r.s.to)}>${M && html`<${M} id=${r.s.to} size="xs" />`}<span>${nama(r.s.to)}</span></button>
              ${r.e.note && html`<em>${r.e.note}</em>`}
              ${r.e.src && html`<a class="kr-src" href=${r.e.src} target="_blank" rel="noopener">sumber</a>`}</li>`)}</ul></div>`)}
        </section>
        <p class="kr-catat">Draf. Hubungan disusun dari kitab sirah, hadits, dan ensiklopedia; hanya tokoh yang ada di aplikasi ini yang ditampilkan, sehingga banyak kerabat lain belum muncul. Mohon validasi kepada ustadz.</p>
      </div>
    </aside>`;
  }

  function Kerabat({ onProfile, onTokoh }) {
    const [focus, setFocus] = useState("nabi");
    const [from, setFrom] = useState("nabi"), [to, setTo] = useState("abubakar");
    const [on, setOn] = useState({ darah: true, nikah: true, susuan: true, muakhah: true });
    const [mode, setMode] = useState("jalur");
    const semua = useMemo(() => semuaJalur(from, to, on), [from, to, on]);
    const utama = semua && semua.length ? semua[0] : semua, lain = semua && semua.length ? semua.slice(1) : [];
    const [alt, setAlt] = useState(null);
    useEffect(() => setAlt(null), [from, to, on]);
    const path = alt || utama;
    const pick = (f, t) => { setMode("jalur"); f !== undefined && setFrom(f); t !== undefined && setTo(t); };
    const fokus = (id) => { setFocus(id); setMode("fokus"); };
    return html`<${React.Fragment}>
      <section class="nz-detail kr-main" aria-label="Jaringan kekerabatan">
        <header class="kr-head">
          <h2>${mode === "jalur" && path && path.length ? `${nama(from)} dan ${nama(to)}` : `Kerabat ${nama(focus)}`}</h2>
          <p>${mode === "jalur" && path && path.length ? "Jalur hubungan disorot di jaringan. Klik sebuah nama untuk beralih ke kerabatnya." : "Hubungan langsung disorot. Pilih dua tokoh di panel kanan untuk melihat jalurnya."}</p>
        </header>
        <${Jaringan} focus=${focus} onFocus=${fokus} on=${on} path=${mode === "jalur" ? path : null} />
      </section>
      <${KerabatPanel} focus=${focus} onFocus=${fokus} from=${from} to=${to} setFrom=${(v) => pick(v)} setTo=${(v) => pick(undefined, v)}
        on=${on} setOn=${setOn} path=${path} lain=${alt ? [utama, ...lain.filter((p) => p !== alt)] : lain} onAlt=${(p) => { setAlt(p === utama ? null : p); setMode("jalur"); }} onProfile=${onProfile} onTokoh=${onTokoh} />
    </${React.Fragment}>`;
  }

  window.SirahKerabat = Kerabat;
  window.SIRAH_KERABAT = { EDGES: valid, cariJalur, jalurLain, semuaJalur, istilah, kalimat, step, NODES };
})();
