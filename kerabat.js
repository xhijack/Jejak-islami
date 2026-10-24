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

  // ---------- Jaringan 3D (Three.js): tampak atas = jaringan 2D, sumbu tegak = tahun lahir ----------
  const WARNA_SIMPUL = { nabi: 0xfff3cf, keluarga: 0xc79a3c, istri: 0xd0607a, sahabat: 0x5b78d6, anshar: 0x49b08a, penentang: 0x9c6b6b };
  let L3 = null;
  function layout3D() {
    if (L3) return L3;
    const { P, box } = layout();
    const cx = box[0] + box[2] / 2, cz = box[1] + box[3] / 2, w = Math.max(box[2], box[3]);
    const ys = (w * 0.55) / 120; // ±120 tahun
    const Q = {};
    // tampak atas sama dengan jaringan 2D; sumbu tegak: makin ke atas makin tua (lahir lebih awal)
    NODES.forEach((id) => { const t = D.tokoh[id]; Q[id] = { x: P[id].x - cx, y: (570 - (t.lahir || 570)) * ys, z: P[id].y - cz }; });
    L3 = { Q, w, ys };
    return L3;
  }
  function glowTex(THREE) {
    const c = document.createElement("canvas"); c.width = c.height = 128; const g = c.getContext("2d");
    const r = g.createRadialGradient(64, 64, 0, 64, 64, 64); r.addColorStop(0, "rgba(255,246,216,1)"); r.addColorStop(0.35, "rgba(255,226,150,.55)"); r.addColorStop(1, "rgba(212,174,90,0)");
    g.fillStyle = r; g.fillRect(0, 0, 128, 128); const t = new THREE.CanvasTexture(c); return t;
  }
  function buat3D(container, labels, opts) {
    const THREE = window.THREE, { Q, w, ys } = layout3D();
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); container.appendChild(renderer.domElement);
    const scene = new THREE.Scene(); scene.fog = new THREE.Fog(0x0b1430, w * 1.4, w * 3.4);
    const camera = new THREE.PerspectiveCamera(42, 1, 1, w * 10);
    scene.add(new THREE.HemisphereLight(0xdde4ff, 0x2a2140, 0.9));
    const sun = new THREE.DirectionalLight(0xffe7c0, 0.8); sun.position.set(1, 2, 1.5); scene.add(sun);
    // simpul
    const meshes = {}, pick = [];
    const geo = new THREE.SphereGeometry(1, 20, 14);
    NODES.forEach((id) => {
      const kg = kelompokSimpul(id), r = id === "nabi" ? 22 : 13;
      const mat = id === "nabi" ? new THREE.MeshBasicMaterial({ color: WARNA_SIMPUL.nabi, transparent: true })
        : new THREE.MeshStandardMaterial({ color: WARNA_SIMPUL[kg], roughness: 0.4, metalness: 0.2, emissive: WARNA_SIMPUL[kg], emissiveIntensity: 0.3, transparent: true });
      const m = new THREE.Mesh(geo, mat); m.scale.setScalar(r); m.position.set(Q[id].x, Q[id].y, Q[id].z); m.userData.id = id; m.userData.r = r;
      scene.add(m); meshes[id] = m; pick.push(m);
    });
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex(THREE), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
    glow.scale.setScalar(130); glow.position.copy(meshes.nabi.position); scene.add(glow);
    // garis hubungan per jenis
    const garis = {};
    JENIS.forEach(([k, , c]) => {
      const es = valid.filter((e) => e.g === k), pos = new Float32Array(es.length * 6);
      es.forEach((e, i) => { const a = Q[e.a], b = Q[e.b]; pos.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6); });
      const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const mat = k === "muakhah" ? new THREE.LineDashedMaterial({ color: c, dashSize: 7, gapSize: 5, transparent: true, opacity: 0.35 })
        : new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: 0.35 });
      const ln = new THREE.LineSegments(g, mat); if (k === "muakhah") ln.computeLineDistances();
      scene.add(ln); garis[k] = ln;
    });
    // penggaris tahun lahir
    const X0 = -w * 0.62, Z0 = -w * 0.1;
    const ax = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(X0, (570 - 660) * ys, Z0), new THREE.Vector3(X0, (570 - 490) * ys, Z0)]);
    scene.add(new THREE.Line(ax, new THREE.LineBasicMaterial({ color: 0xd4ae5a, transparent: true, opacity: 0.5 })));
    const TICK = [500, 530, 570, 600, 630, 660];
    TICK.forEach((y) => { const t = new THREE.Mesh(new THREE.SphereGeometry(3, 8, 6), new THREE.MeshBasicMaterial({ color: 0xd4ae5a })); t.position.set(X0, (570 - y) * ys, Z0); scene.add(t); });
    const lantai = new THREE.GridHelper(w * 1.3, 13, 0x26397a, 0x1b2b5e); lantai.position.y = (570 - 665) * ys; lantai.material.transparent = true; lantai.material.opacity = 0.35; scene.add(lantai);
    // sorotan: tabung untuk hubungan yang aktif
    let sorotG = new THREE.Group(); scene.add(sorotG);
    const up = new THREE.Vector3(0, 1, 0);
    function tabung(a, b, color, putus) {
      const A = new THREE.Vector3(a.x, a.y, a.z), B = new THREE.Vector3(b.x, b.y, b.z), d = B.clone().sub(A), len = d.length();
      const m = new THREE.Mesh(new THREE.CylinderGeometry(putus ? 2.4 : 3.6, putus ? 2.4 : 3.6, len, 8), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95 }));
      m.position.copy(A).add(B).multiplyScalar(0.5); m.quaternion.setFromUnitVectors(up, d.normalize()); return m;
    }
    let state = { terang: new Set(NODES), fokus: "nabi", tepi: [] };
    function sorot(st) {
      state = st;
      scene.remove(sorotG); sorotG.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); }); sorotG = new THREE.Group(); scene.add(sorotG);
      st.tepi.forEach((e) => sorotG.add(tabung(Q[e.a], Q[e.b], WARNA[e.g], e.g === "muakhah" || e.cerai)));
      NODES.forEach((id) => {
        const m = meshes[id], on = st.terang.has(id), on2 = st.tampil.has(id);
        m.visible = on2; m.material.opacity = on ? 1 : 0.22;
        if (m.material.emissiveIntensity !== undefined && id !== "nabi") m.material.emissiveIntensity = id === st.fokus ? 0.8 : on ? 0.4 : 0.08;
        m.scale.setScalar(m.userData.r * (id === st.fokus ? 1.45 : 1));
      });
      JENIS.forEach(([k]) => { garis[k].visible = !!st.on[k]; garis[k].material.opacity = st.redup ? 0.12 : 0.35; });
    }
    // kamera orbit
    const cam = { az: 0.6, el: 0.42, dist: w * 1.25, target: new THREE.Vector3(0, 0, 0) }, goal = { az: cam.az, el: cam.el, dist: cam.dist, target: cam.target.clone() };
    let auto = true, last = performance.now();
    const el = renderer.domElement; el.style.touchAction = "none";
    let drag = null; const pts = new Map();
    el.addEventListener("pointerdown", (ev) => {
      el.setPointerCapture(ev.pointerId); pts.set(ev.pointerId, [ev.clientX, ev.clientY]);
      drag = { x: ev.clientX, y: ev.clientY, moved: 0, pan: ev.button === 2 || ev.shiftKey || ev.ctrlKey, pinch: pts.size === 2 ? Math.hypot(...[...pts.values()].reduce((a, b) => [a[0] - b[0], a[1] - b[1]])) : 0 };
      auto = false;
    });
    el.addEventListener("pointermove", (ev) => {
      if (!drag || !pts.has(ev.pointerId)) return;
      pts.set(ev.pointerId, [ev.clientX, ev.clientY]);
      if (pts.size === 2) { const d = Math.hypot(...[...pts.values()].reduce((a, b) => [a[0] - b[0], a[1] - b[1]])); if (drag.pinch) goal.dist = Math.max(w * 0.25, Math.min(w * 3, goal.dist * (drag.pinch / d))); drag.pinch = d; drag.moved += 10; return; }
      const dx = ev.clientX - drag.x, dy = ev.clientY - drag.y; drag.x = ev.clientX; drag.y = ev.clientY; drag.moved += Math.abs(dx) + Math.abs(dy);
      if (drag.pan) {
        const k = (2 * cam.dist * Math.tan((camera.fov * Math.PI) / 360)) / Math.max(1, container.clientHeight);
        const right = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 0), upv = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 1);
        goal.target.addScaledVector(right, -dx * k).addScaledVector(upv, dy * k); cam.target.copy(goal.target);
      } else { goal.az -= dx * 0.006; goal.el = Math.max(-1.35, Math.min(1.45, goal.el + dy * 0.005)); }
    });
    const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
    el.addEventListener("pointerup", (ev) => {
      pts.delete(ev.pointerId);
      if (drag && drag.moved < 5 && ev.button === 0) {
        const r = el.getBoundingClientRect(); ndc.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
        ray.setFromCamera(ndc, camera); const hit = ray.intersectObjects(pick.filter((m) => m.visible))[0];
        if (hit) opts.onPick(hit.object.userData.id);
      }
      if (!pts.size) drag = null;
    });
    el.addEventListener("contextmenu", (ev) => ev.preventDefault());
    container.parentElement.addEventListener("pointerenter", () => { auto = false; });
    el.addEventListener("wheel", (ev) => { ev.preventDefault(); auto = false; goal.dist = Math.max(w * 0.25, Math.min(w * 3, goal.dist * Math.exp(ev.deltaY * (ev.ctrlKey ? 0.01 : 0.0012)))); }, { passive: false });
    function resize() { const W = container.clientWidth, H = container.clientHeight; renderer.setSize(W, H, false); camera.aspect = W / Math.max(1, H); camera.updateProjectionMatrix(); }
    const ro = new ResizeObserver(resize); ro.observe(container); resize();
    const v = new THREE.Vector3(); let raf;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function frame(now) {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (auto && !reduce) goal.az += dt * 0.12;
      const k = reduce ? 1 : 0.12;
      cam.az += (goal.az - cam.az) * k; cam.el += (goal.el - cam.el) * k; cam.dist += (goal.dist - cam.dist) * k; cam.target.lerp(goal.target, k);
      camera.position.set(cam.target.x + cam.dist * Math.cos(cam.el) * Math.sin(cam.az), cam.target.y + cam.dist * Math.sin(cam.el), cam.target.z + cam.dist * Math.cos(cam.el) * Math.cos(cam.az));
      camera.lookAt(cam.target);
      glow.material.opacity = 0.75 + 0.25 * Math.sin(now / 600);
      const W = container.clientWidth, H = container.clientHeight;
      for (const id in labels) {
        const n = labels[id]; if (!n) continue;
        let p;
        if (id.startsWith("__t")) { const y = +id.slice(3); p = v.set(X0 - 10, (570 - y) * ys, Z0); }
        else { const m = meshes[id]; if (!m || !m.visible) { n.style.visibility = "hidden"; continue; } p = v.set(m.position.x, m.position.y - m.userData.r * m.scale.x / m.userData.r - 6, m.position.z); }
        p.project(camera);
        n.style.transform = `translate(${((p.x * 0.5 + 0.5) * W).toFixed(1)}px, ${((-p.y * 0.5 + 0.5) * H).toFixed(1)}px)`;
        n.style.visibility = p.z < 1 ? "visible" : "hidden";
        n.style.zIndex = String(Math.round((1 - p.z) * 100000));
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return {
      sorot,
      zoom(f) { auto = false; goal.dist = Math.max(w * 0.25, Math.min(w * 3, goal.dist * f)); },
      putar(d) { auto = false; goal.az += d; },
      reset() { goal.az = 0.6; goal.el = 0.42; goal.dist = w * 1.25; goal.target.set(0, 0, 0); },
      atas() { auto = false; goal.el = 1.45; goal.dist = w * 1.1; },
      samping() { auto = false; goal.el = 0.02; goal.dist = w * 1.2; },
      ke(id) { const m = meshes[id]; if (m) goal.target.lerp(m.position, 0.6); },
      setAuto(a) { auto = a; },
      dispose() { cancelAnimationFrame(raf); ro.disconnect(); renderer.dispose(); el.remove(); }
    };
  }

  function Jaringan3D({ focus, onFocus, on, path }) {
    const box = useRef(null), eng = useRef(null), labels = useRef({}), pickRef = useRef(onFocus);
    pickRef.current = onFocus;
    const [gagal, setGagal] = useState(false);
    useEffect(() => {
      try { eng.current = buat3D(box.current, labels.current, { onPick: (id) => pickRef.current(id) }); } catch (e) { setGagal(true); }
      return () => eng.current && eng.current.dispose();
    }, []);
    const jalur = path && path.length > 0;
    const pathN = new Set(jalur ? [path[0].from, ...path.map((p) => p.s.to)] : []);
    const neigh = new Set([focus]); (ADJ[focus] || []).forEach((e) => on[e.g] && neigh.add(e.a === focus ? e.b : e.a));
    const terang = jalur ? pathN : neigh;
    const tepi = jalur ? path.map((p) => p.e) : (ADJ[focus] || []).filter((e) => on[e.g]);
    const tampil = new Set([focus]); valid.forEach((e) => { if (on[e.g]) { tampil.add(e.a); tampil.add(e.b); } });
    useEffect(() => { eng.current && eng.current.sorot({ terang, tepi, fokus: focus, on, tampil, redup: true }); if (eng.current && !jalur) eng.current.ke(focus); },
      [focus, on, path]);
    const reg = (id) => (n) => { if (n) labels.current[id] = n; else delete labels.current[id]; };
    if (gagal) return html`<div class="kr-net"><p class="kr-none" style=${{ padding: "20px" }}>Tampilan 3D tidak didukung di perangkat ini. Pilih tampilan 2D.</p></div>`;
    return html`<div class="kr-net kr-3d">
      <div class="kr-canvas" ref=${box}></div>
      <div class="kr-labels">
        ${NODES.map((id) => html`<div key=${id} ref=${reg(id)} class=${`kr-l k-${kelompokSimpul(id)}${terang.has(id) ? " on" : ""}${id === focus ? " fokus" : ""}${tampil.has(id) ? "" : " sembunyi"}`}
          role="button" tabindex="0" onClick=${() => onFocus(id)} onKeyDown=${(ev) => { if (ev.key === "Enter") onFocus(id); }}>${SINGKAT[id]}</div>`)}
        ${[500, 530, 570, 600, 630, 660].map((y) => html`<div key=${y} ref=${reg("__t" + y)} class="kr-tick">${y === 570 ? "570 M (Tahun Gajah)" : y + " M"}</div>`)}
      </div>
      <div class="kr-legend">
        <div>${JENIS.filter(([k]) => on[k]).map(([k, l, c]) => html`<span key=${k}><i style=${{ background: c }} class=${k === "muakhah" ? "putus" : ""}></i>${l}</span>`)}</div>
        <div>${SIMPUL.map(([k, l]) => html`<span key=${k}><b class=${`dot k-${k}`}></b>${l}</span>`)}</div>
        <div><span>Sumbu tegak: tahun lahir (makin atas makin tua)</span></div>
      </div>
      <div class="kr-zoom tool-group">
        <button type="button" class="tool" onClick=${() => eng.current.zoom(0.8)} aria-label="Perbesar">+</button>
        <button type="button" class="tool" onClick=${() => eng.current.zoom(1.25)} aria-label="Perkecil">−</button>
        <button type="button" class="tool" onClick=${() => eng.current.putar(-0.5)} aria-label="Putar kiri">⟲</button>
        <button type="button" class="tool" onClick=${() => eng.current.putar(0.5)} aria-label="Putar kanan">⟳</button>
        <button type="button" class="tool wide" onClick=${() => eng.current.atas()}>Dari atas</button>
        <button type="button" class="tool wide" onClick=${() => eng.current.samping()}>Dari samping</button>
        <button type="button" class="tool wide" onClick=${() => eng.current.reset()}>Atur ulang</button>
      </div>
      <p class="kr-hint">Seret untuk memutar, klik kanan atau Shift + seret untuk menggeser, gulir untuk zoom. Klik bola atau nama untuk melihat kerabatnya.</p>
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

  function Kerabat({ onProfile, onTokoh, rute, onRute }) {
    const r0 = rute || {};
    const [focus, setFocus] = useState(r0.fokus && D.tokoh[r0.fokus] ? r0.fokus : "nabi");
    const [from, setFrom] = useState(r0.dari && ADJ[r0.dari] ? r0.dari : "nabi"), [to, setTo] = useState(r0.ke && ADJ[r0.ke] ? r0.ke : "abubakar");
    const [dim, setDim] = useState(() => { try { return localStorage.getItem("jejak-kerabat-dim") || "3d"; } catch (e) { return "3d"; } });
    const pilihDim = (d) => { setDim(d); try { localStorage.setItem("jejak-kerabat-dim", d); } catch (e) {} };
    const [on, setOn] = useState({ darah: true, nikah: true, susuan: true, muakhah: true });
    const [mode, setMode] = useState(r0.fokus ? "fokus" : "jalur");
    // URL ikut berubah: #/kerabat/<dari>/<ke> atau #/kerabat/fokus/<id>
    useEffect(() => { onRute && onRute(mode === "fokus" ? { fokus: focus } : { dari: from, ke: to }); }, [mode, focus, from, to]);
    useEffect(() => {
      if (!rute) return;
      if (rute.fokus && rute.fokus !== focus && D.tokoh[rute.fokus]) { setFocus(rute.fokus); setMode("fokus"); }
      else if (rute.dari && rute.ke && (rute.dari !== from || rute.ke !== to) && ADJ[rute.dari] && ADJ[rute.ke]) { setFrom(rute.dari); setTo(rute.ke); setMode("jalur"); }
    }, [rute && rute.fokus, rute && rute.dari, rute && rute.ke]);
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
          <div><h2>${mode === "jalur" && path && path.length ? `${nama(from)} dan ${nama(to)}` : `Kerabat ${nama(focus)}`}</h2>
          <p>${mode === "jalur" && path && path.length ? "Jalur hubungan disorot di jaringan. Klik sebuah nama untuk beralih ke kerabatnya." : "Hubungan langsung disorot. Pilih dua tokoh di panel kanan untuk melihat jalurnya."}</p></div>
          <div class="nz-seg" role="group" aria-label="Tampilan jaringan">
            ${[["3d", "3D"], ["2d", "2D"]].map(([k, l]) => html`<button key=${k} type="button" class=${dim === k ? "on" : ""} aria-pressed=${dim === k} onClick=${() => pilihDim(k)}>${l}</button>`)}
          </div>
        </header>
        ${dim === "3d" && window.THREE ? html`<${Jaringan3D} focus=${focus} onFocus=${fokus} on=${on} path=${mode === "jalur" ? path : null} />`
          : html`<${Jaringan} focus=${focus} onFocus=${fokus} on=${on} path=${mode === "jalur" ? path : null} />`}
      </section>
      <${KerabatPanel} focus=${focus} onFocus=${fokus} from=${from} to=${to} setFrom=${(v) => pick(v)} setTo=${(v) => pick(undefined, v)}
        on=${on} setOn=${setOn} path=${path} lain=${alt ? [utama, ...lain.filter((p) => p !== alt)] : lain} onAlt=${(p) => { setAlt(p === utama ? null : p); setMode("jalur"); }} onProfile=${onProfile} onTokoh=${onTokoh} />
    </${React.Fragment}>`;
  }

  window.SirahKerabat = Kerabat;
  window.SIRAH_KERABAT = { EDGES: valid, cariJalur, jalurLain, semuaJalur, istilah, kalimat, step, NODES };
})();
