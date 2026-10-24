// Tontonan peristiwa di peta 3D kota Mekah.
// Rasulullah ﷺ dan malaikat hanya ditampilkan sebagai nama dan cahaya, tanpa sosok.
// Tokoh lain tampil sebagai karakter sederhana: wajah hanya mata (titik/bulan sabit) dan mulut (garis).
// Posisi dalam meter dari Ka'bah (e = timur, n = utara). Dialog adalah terjemahan bebas. DRAF: wajib diverifikasi ustadz.
(function () {
  const B3 = { sumber: "HR. Bukhari no. 3 (Aisyah)", url: "https://sunnah.com/bukhari:3" };
  const KHADIJAH = [140, 104], R_RUMAH = [124, 92];             // depan gerbang rumah Khadijah
  const GUA = [3587, 3912], JIBRIL = [3592, 3904];              // mulut Gua Hira & cahaya di depannya
  const WARAQAH = [45, 237];                                     // depan rumah Waraqah (ilustrasi)
  const CAM_GUA = { follow: "rasul", dist: 4, el: 0.24, az: -0.74, up: 6 };
  const CAM_KHADIJAH = { at: [132, 97], dist: 2.6, el: 0.42, az: -0.94, up: 3 };
  const CAM_WARAQAH = { at: [44, 236], dist: 2.2, el: 0.4, az: -0.18, up: 3 };
  const jib = (power, at = JIBRIL, up = 7) => ({ at, up, power });

  window.TONTONAN = {
    "wahyu-pertama": {
      peta: true,
      judul: "Wahyu Pertama di Gua Hira",
      tahun: 610,
      tanggal: {
        judul: "Senin malam, bulan Ramadhan, 610 M",
        rinci: [
          { k: "Hari Senin", v: "Nabi bersabda tentang hari Senin: \"Pada hari itu aku dilahirkan dan pada hari itu aku diutus atau wahyu diturunkan kepadaku.\"", s: "HR. Muslim no. 1162", url: "https://sunnah.com/muslim:1162b" },
          { k: "Bulan Ramadhan", v: "Al-Qur'an diturunkan pada bulan Ramadhan.", s: "QS. Al-Baqarah: 185" },
          { k: "Tanggal", v: "Diperselisihkan. Al-Mubarakfuri menghitung Senin 21 Ramadhan sebelum fajar, bertepatan 10 Agustus 610 M. Di Indonesia, Nuzulul Qur'an umum diperingati 17 Ramadhan.", s: "Wikipedia: Muhammad's first revelation", url: "https://en.wikipedia.org/wiki/Muhammad%27s_first_revelation" },
          { k: "Usia beliau", v: "40 tahun.", s: "HR. Bukhari no. 3902 (Ibnu Abbas)", url: "https://sunnah.com/bukhari:3902" }
        ]
      },
      pengantar: "Rasulullah ﷺ dan malaikat tidak digambarkan; keduanya hanya tampil sebagai nama dan cahaya. Rute, letak rumah Waraqah, dan dialog adalah rekonstruksi dari HR. Bukhari no. 3 dan perlu diverifikasi ustadz.",
      tokoh: { khadijah: { nama: "Khadijah" }, waraqah: { nama: "Waraqah bin Naufal" } },
      lampu: [[139, 103], [44, 239]],
      paths: {
        pergi: [R_RUMAH, [114, 112], [113, 150], [118, 250], [125, 345], [170, 470], [230, 620], [300, 800], [340, 1000], [700, 1500], [1300, 2150], [2050, 2850], [2850, 3400], [3250, 3650]],
        naik: [[3250, 3650], [3300, 3700], [3420, 3700], [3380, 3760], [3500, 3790], [3460, 3840], [3560, 3870], GUA],
        rasulKeWaraqah: [R_RUMAH, [114, 112], [106, 160], [80, 215], [58, 232]],
        khadijahKeWaraqah: [KHADIJAH, [118, 116], [111, 162], [85, 214], [33, 241]]
      },
      // inside: adegan dalam ruangan (panggung 1600x900). inside: null kembali ke peta.
      babak: [
        { judul: "Malam di Mekah", beats: [
          { cam: { at: [260, 520], dist: 40, el: 0.85, az: -0.45, up: 0 }, rasul: { at: R_RUMAH, state: "tenang" },
            chars: [{ id: "khadijah", at: KHADIJAH, expr: "lembut", on: true }],
            sumber: "QS. Al-Baqarah: 185; HR. Bukhari no. 3902", url: "https://sunnah.com/bukhari:3902",
            narr: "Mekah, suatu malam di bulan Ramadhan. Rasulullah ﷺ berusia 40 tahun." },
          { cam: CAM_KHADIJAH, ...B3, narr: "Beliau suka menyendiri, beribadah di Gua Hira selama beberapa malam." },
          { inside: { scene: "rumah-khadijah", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 590, y: 600, small: false, state: "tenang" },
              chars: [{ id: "khadijah", x: 1000, y: 640, expr: "lembut", on: true }] }, ...B3,
            narr: "Sebelum berangkat, beliau membawa bekal dari rumah Khadijah. Setelah bekal habis, beliau pulang untuk mengambil bekal lagi." }
        ] },
        { judul: "Berjalan ke Jabal Nur", beats: [
          { inside: null, rasul: { path: "pergi", from: 0, to: 1, dur: 16000 }, cam: { follow: "rasul", dist: 9, el: 0.55, az: "behind", up: 3 },
            sumber: "Rute perkiraan; letak Jabal Nur: Wikipedia", url: "https://en.wikipedia.org/wiki/Jabal_al-Nour",
            narr: "Beliau berjalan ke utara melewati Ma'la, menuju Jabal Nur, sekitar 4 km dari Ka'bah." },
          { rasul: { path: "naik", from: 0, to: 1, dur: 10000 }, cam: { follow: "rasul", dist: 4, el: 0.45, az: "behind", up: 3 },
            sumber: "Rute pendakian perkiraan", narr: "Gua Hira berada di dekat puncak Jabal Nur. Jalannya menanjak dan berbatu." },
          { cam: CAM_GUA, ...B3, narr: "Beliau tiba di mulut Gua Hira." },
          { inside: { scene: "hira-dalam", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 800, y: 640, small: false, state: "tenang" }, jibril: { x: 800, y: 320, power: 0 } }, ...B3,
            narr: "Di dalam gua beliau beribadah (tahannuts) selama beberapa malam." }
        ] },
        { judul: "Datangnya malaikat", beats: [
          { tanggal: true, ...B3, sumber: "HR. Bukhari no. 3; bulan Ramadhan menurut Sirah Ibnu Hisyam",
            narr: "Hingga pada suatu malam, saat beliau sendirian di dalam gua, datanglah kebenaran." },
          { inside: { jibril: { x: 800, y: 320, power: 0.6 } }, ...B3, say: { who: "jibril", text: "Bacalah!", arab: "اقْرَأْ" } },
          { ...B3, say: { who: "rasul", text: "Aku tidak bisa membaca.", arab: "مَا أَنَا بِقَارِئٍ" } },
          { inside: { jibril: { x: 800, y: 600, power: 1 }, rasul: { state: "payah" } }, hitung: "Dekapan pertama", ...B3,
            narr: "Malaikat itu mendekap beliau dengan kuat hingga beliau merasa sangat payah, lalu melepaskannya." },
          { inside: { jibril: { x: 800, y: 320, power: 0.6 }, rasul: { state: "tenang" } }, ...B3, say: { who: "jibril", text: "Bacalah!", arab: "اقْرَأْ" } },
          { ...B3, say: { who: "rasul", text: "Aku tidak bisa membaca.", arab: "مَا أَنَا بِقَارِئٍ" } },
          { inside: { jibril: { x: 800, y: 600, power: 1 }, rasul: { state: "payah" } }, hitung: "Dekapan kedua", ...B3,
            narr: "Malaikat itu mendekap beliau untuk kedua kalinya hingga beliau sangat payah, lalu melepaskannya." },
          { inside: { jibril: { x: 800, y: 320, power: 0.6 }, rasul: { state: "tenang" } }, ...B3, say: { who: "jibril", text: "Bacalah!", arab: "اقْرَأْ" } },
          { ...B3, say: { who: "rasul", text: "Aku tidak bisa membaca.", arab: "مَا أَنَا بِقَارِئٍ" } },
          { inside: { jibril: { x: 800, y: 600, power: 1 }, rasul: { state: "payah" } }, hitung: "Dekapan ketiga", ...B3,
            narr: "Untuk ketiga kalinya malaikat itu mendekap beliau, lalu melepaskannya dan berkata:" },
          { inside: { jibril: { x: 800, y: 380, power: 0.85 }, rasul: { state: "tenang" } }, sumber: "HR. Bukhari no. 3; QS. Al-'Alaq: 1–3", url: B3.url, hold: 4500,
            say: { who: "jibril", ayat: "QS. Al-'Alaq: 1–3",
              arab: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ﴿١﴾ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ ﴿٢﴾ اقْرَأْ وَرَبُّكَ الْأَكْرَمُ ﴿٣﴾",
              text: "Bacalah dengan nama Tuhanmu yang menciptakan. Dia menciptakan manusia dari segumpal darah. Bacalah, dan Tuhanmulah Yang Maha Mulia." } },
          { inside: { jibril: { x: 800, y: 320, power: 0 } }, ...B3,
            narr: "Hadits ini menyebutnya \"malaikat\". Waraqah kemudian menyebutnya an-Namus, yang dijelaskan para ulama sebagai Jibril." }
        ] },
        { judul: "Pulang dengan hati gemetar", beats: [
          { inside: null, rasul: { path: "naik", from: 1, to: 0, dur: 8000, state: "gemetar" }, cam: { follow: "rasul", dist: 4, el: 0.45, az: "behind", up: 3 }, ...B3,
            narr: "Rasulullah ﷺ keluar dari gua dan turun membawa ayat-ayat itu dengan hati yang gemetar." },
          { rasul: { path: "pergi", from: 1, to: 0, dur: 14000 }, cam: { follow: "rasul", dist: 9, el: 0.55, az: "behind", up: 3 }, ...B3,
            narr: "Beliau pulang ke rumah Khadijah binti Khuwailid." }
        ] },
        { judul: "Di rumah Khadijah", beats: [
          { cam: CAM_KHADIJAH, chars: [{ id: "khadijah", expr: "kaget" }], ...B3, narr: "Beliau tiba di rumah dan masuk menemui Khadijah." },
          { inside: { scene: "rumah-khadijah", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 590, y: 600, small: false, state: "gemetar" },
              chars: [{ id: "khadijah", x: 1040, y: 640, expr: "kaget", on: true }] }, ...B3,
            say: { who: "rasul", text: "Selimuti aku, selimuti aku!", arab: "زَمِّلُونِي زَمِّلُونِي" } },
          { inside: { rasul: { state: "berselimut" }, chars: [{ id: "khadijah", x: 860, expr: "khawatir" }] }, ...B3,
            narr: "Beliau pun diselimuti hingga rasa takutnya hilang. Lalu beliau menceritakan semua yang terjadi kepada Khadijah." },
          { ...B3, say: { who: "rasul", text: "Sungguh, aku khawatir terhadap diriku.", arab: "لَقَدْ خَشِيتُ عَلَى نَفْسِي" } },
          { inside: { chars: [{ id: "khadijah", expr: "tegas" }] }, ...B3,
            say: { who: "khadijah", text: "Sekali-kali tidak. Demi Allah, Allah tidak akan menghinakanmu selamanya.", arab: "كَلَّا وَاللَّهِ مَا يُخْزِيكَ اللَّهُ أَبَدًا" } },
          { inside: { chars: [{ id: "khadijah", expr: "lembut" }] }, ...B3, hold: 3500,
            say: { who: "khadijah", text: "Engkau menyambung silaturahim, menanggung beban orang lain, memberi orang yang tidak punya, memuliakan tamu, dan menolong orang yang tertimpa musibah di jalan kebenaran." } }
        ] },
        { judul: "Menemui Waraqah bin Naufal", beats: [
          { inside: null, rasul: { path: "rasulKeWaraqah", from: 0, to: 1, dur: 7000, state: "tenang" }, chars: [{ id: "khadijah", path: "khadijahKeWaraqah", from: 0, to: 1, dur: 7000, expr: "netral" }],
            cam: { follow: "rasul", dist: 3, el: 0.45, az: "behind", up: 3 }, ...B3,
            narr: "Khadijah membawa beliau kepada sepupunya, Waraqah bin Naufal. Letak rumah Waraqah tidak tercatat; rumah di peta ini hanya ilustrasi." },
          { inside: { scene: "rumah-waraqah", cam: { x: 820, y: 480, s: 1 }, rasul: { x: 500, y: 600, small: false, state: "tenang" },
              chars: [{ id: "khadijah", x: 790, y: 640, expr: "netral", on: true }, { id: "waraqah", x: 1130, y: 660, expr: "netral", on: true }] }, ...B3,
            narr: "Di masa jahiliyah Waraqah memeluk Nasrani, menulis kitab dengan aksara Ibrani, dan menyalin Injil. Ia sudah tua dan buta." },
          { inside: { chars: [{ id: "khadijah", expr: "senyum" }] }, ...B3,
            say: { who: "khadijah", text: "Wahai putra pamanku, dengarkanlah putra saudaramu ini.", arab: "يَا ابْنَ عَمِّ، اسْمَعْ مِنَ ابْنِ أَخِيكَ" } },
          { inside: { chars: [{ id: "khadijah", expr: "netral" }] }, ...B3,
            say: { who: "waraqah", text: "Wahai putra saudaraku, apa yang engkau lihat?", arab: "يَا ابْنَ أَخِي، مَاذَا تَرَى؟" } },
          { inside: { chars: [{ id: "waraqah", expr: "kaget" }] }, ...B3, narr: "Rasulullah ﷺ menceritakan apa yang beliau lihat di Gua Hira." },
          { inside: { chars: [{ id: "waraqah", expr: "kagum" }] }, ...B3,
            say: { who: "waraqah", text: "Inilah an-Namus yang dahulu Allah turunkan kepada Musa.", arab: "هَذَا النَّامُوسُ الَّذِي نَزَّلَ اللَّهُ عَلَى مُوسَى" } },
          { inside: { chars: [{ id: "waraqah", expr: "sedih" }] }, ...B3,
            say: { who: "waraqah", text: "Andai aku masih muda saat itu. Andai aku masih hidup ketika kaummu mengusirmu." } },
          { inside: { chars: [{ id: "khadijah", expr: "khawatir" }] }, ...B3,
            say: { who: "rasul", text: "Apakah mereka akan mengusirku?", arab: "أَوَمُخْرِجِيَّ هُمْ" } },
          { inside: { chars: [{ id: "waraqah", expr: "tegas" }] }, ...B3, hold: 3500,
            say: { who: "waraqah", text: "Ya. Tidak seorang pun datang membawa seperti yang engkau bawa melainkan dimusuhi. Jika aku masih hidup di harimu, aku akan menolongmu dengan sungguh-sungguh." } },
          { inside: { chars: [{ id: "waraqah", on: false }, { id: "khadijah", expr: "sedih" }] }, ...B3,
            narr: "Tidak lama kemudian Waraqah wafat, dan wahyu terhenti untuk sementara waktu." },
          { inside: null, cam: { at: [44, 236], dist: 8, el: 0.65, az: -0.18, up: 3 }, chars: [{ id: "khadijah", expr: "sedih" }], ...B3,
            narr: "Peristiwa malam itu menjadi awal kenabian. Wahyu berikutnya turun setelah masa fatrah." }
        ] }
      ],
      penutup: "Setelah masa terhentinya wahyu, turunlah Surah Al-Muddatstsir. Lihat peristiwa 611 M di peta."
    }
  };
})();
