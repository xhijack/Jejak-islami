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
  const PERGI = [R_RUMAH, [114, 112], [113, 150], [118, 250], [125, 345], [170, 470], [230, 620], [300, 800], [340, 1000], [700, 1500], [1300, 2150], [2050, 2850], [2850, 3400], [3250, 3650]];
  const NAIK = [[3250, 3650], [3300, 3700], [3420, 3700], [3380, 3760], [3500, 3790], [3460, 3840], [3560, 3870], GUA];

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
        pergi: PERGI,
        naik: NAIK,
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

  // ---------- Wahyu kedua: Al-Muddatstsir 1–5 ----------
  const B4 = { sumber: "HR. Bukhari no. 4 (Jabir bin Abdullah)", url: "https://sunnah.com/bukhari:4" };
  const B4922 = { sumber: "HR. Bukhari no. 4922 (Jabir bin Abdullah)", url: "https://sunnah.com/bukhari:4922" };
  const B4925 = { sumber: "HR. Bukhari no. 4925 (Jabir bin Abdullah)", url: "https://sunnah.com/bukhari:4925" };
  const T_PANGGIL = 0.45;                                   // titik di jalan turun saat beliau dipanggil
  const LOOK = -0.91;                                       // arah pandang menanjak ke timur laut
  const JIB2 = [3421, 3786];                                // cahaya malaikat di atas lereng, sedikit di depan beliau
  const camPanggil = (az, dist = 3, el = 0.3) => ({ follow: "rasul", dist, el, az, up: 3 });

  window.TONTONAN["wahyu-kedua"] = {
    peta: true,
    malam: 0,
    judul: "Wahyu Turun Kembali",
    tahun: 611,
    tanggal: {
      judul: "Setelah masa jeda wahyu, ±611 M",
      rinci: [
        { k: "Masa jeda", v: "Setelah wafatnya Waraqah, wahyu sempat terhenti. Lamanya tidak disebut dalam riwayat ini dan diperselisihkan ulama.", s: "HR. Bukhari no. 3 (Aisyah)", url: "https://sunnah.com/bukhari:3" },
        { k: "Hari dan jam", v: "Tidak disebut dalam riwayat. Peta menampilkan siang hari hanya sebagai ilustrasi.", s: "Catatan penyusun" },
        { k: "Tahun", v: "±611 M adalah perkiraan, satu tahun setelah wahyu pertama.", s: "Perkiraan" }
      ]
    },
    pengantar: "Rasulullah ﷺ dan malaikat tidak digambarkan; keduanya hanya tampil sebagai nama dan cahaya. Rute adalah perkiraan. Urutan kejadian mengikuti HR. Bukhari no. 4, 4922, dan 4925 dan perlu diverifikasi ustadz.",
    tokoh: { khadijah: { nama: "Khadijah" } },
    lampu: [],
    paths: { pergi: PERGI, naik: NAIK },
    babak: [
      { judul: "Masa jeda wahyu", beats: [
        { cam: { at: [3540, 3870], dist: 24, el: 0.55, az: LOOK, up: 0 }, rasul: { at: GUA, state: "tenang" }, tanggal: true,
          sumber: "HR. Bukhari no. 3 dan 4", url: "https://sunnah.com/bukhari:4",
          narr: "Setelah wahyu pertama, wahyu sempat terhenti beberapa waktu. Masa ini disebut fatrah." },
        { cam: CAM_GUA, ...B4922, narr: "Rasulullah ﷺ kembali berdiam di Gua Hira." }
      ] },
      { judul: "Panggilan dari langit", beats: [
        { rasul: { path: "naik", from: 1, to: T_PANGGIL, dur: 7000 }, cam: { follow: "rasul", dist: 4, el: 0.42, az: "behind", up: 3 }, ...B4922,
          narr: "Setelah selesai, beliau keluar dari gua dan berjalan turun." },
        { cam: camPanggil(LOOK + Math.PI, 3.2, 0.34), ...B4922, hold: 600, narr: "Di tengah jalan, beliau mendengar suara memanggil." },
        { cam: camPanggil(LOOK + Math.PI / 2), ...B4922, narr: "Beliau menoleh ke kanan, lalu ke kiri." },
        { cam: camPanggil(LOOK - Math.PI / 2), ...B4922, narr: "Beliau melihat ke depan dan ke belakang, tetapi tidak melihat apa pun." },
        { cam: { follow: "rasul", dist: 11, el: 0.12, az: LOOK, up: 22 }, rasul: { state: "gemetar" },
          jibril: { at: JIB2, up: 50, power: 1 }, ...B4922, hold: 1200,
          narr: "Lalu beliau mengangkat kepala." },
        { ...B4, hold: 1500,
          narr: "Ternyata malaikat yang dahulu mendatangi beliau di Hira duduk di atas kursi, di antara langit dan bumi." },
        { ...B4, narr: "Beliau merasa sangat takut kepadanya." }
      ] },
      { judul: "Pulang ke rumah Khadijah", beats: [
        { jibril: { at: JIB2, up: 50, power: 0 }, rasul: { path: "naik", from: T_PANGGIL, to: 0, dur: 6000 },
          cam: { follow: "rasul", dist: 4, el: 0.45, az: "behind", up: 3 }, ...B4, narr: "Beliau bergegas pulang." },
        { rasul: { path: "pergi", from: 1, to: 0, dur: 13000 }, cam: { follow: "rasul", dist: 9, el: 0.55, az: "behind", up: 3 }, ...B4922,
          narr: "Beliau pulang menemui Khadijah." },
        { cam: CAM_KHADIJAH, chars: [{ id: "khadijah", at: KHADIJAH, expr: "kaget", on: true }], ...B4922, narr: "Beliau tiba di rumah dan masuk menemui Khadijah." }
      ] },
      { judul: "Selimuti aku", beats: [
        { inside: { scene: "rumah-khadijah-siang", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 590, y: 600, small: false, state: "gemetar" },
            chars: [{ id: "khadijah", x: 1040, y: 640, expr: "kaget", on: true }] }, ...B4922,
          say: { who: "rasul", text: "Selimuti aku, dan siramkan air dingin kepadaku.", arab: "دَثِّرُونِي وَصُبُّوا عَلَيَّ مَاءً بَارِدًا" } },
        { inside: { rasul: { state: "berselimut" }, chars: [{ id: "khadijah", x: 960, expr: "khawatir" }] }, ...B4922,
          narr: "Beliau pun diselimuti dan disirami air dingin." },
        { inside: { jibril: { x: 800, y: 250, power: 0.45 }, chars: [{ id: "khadijah", expr: "kagum" }] }, ...B4,
          narr: "Kemudian Allah menurunkan wahyu." },
        { ...B4925, hold: 5000,
          say: { who: "wahyu", ayat: "QS. Al-Muddatstsir: 1–5",
            arab: "يَا أَيُّهَا الْمُدَّثِّرُ ﴿١﴾ قُمْ فَأَنذِرْ ﴿٢﴾ وَرَبَّكَ فَكَبِّرْ ﴿٣﴾ وَثِيَابَكَ فَطَهِّرْ ﴿٤﴾ وَالرُّجْزَ فَاهْجُرْ ﴿٥﴾",
            text: "Wahai orang yang berselimut! Bangunlah, lalu berilah peringatan! Dan agungkanlah Tuhanmu, dan bersihkanlah pakaianmu, dan tinggalkanlah ar-rujz." } },
        { inside: { jibril: { x: 800, y: 250, power: 0 }, chars: [{ id: "khadijah", expr: "lembut" }] }, ...B4925,
          narr: "Dalam riwayat ini, ar-rujz dijelaskan sebagai berhala." },
        { inside: { rasul: { state: "tenang" } }, sumber: "Catatan penyusun",
          narr: "Seruan \"Bangunlah, lalu berilah peringatan\" dipahami sebagai awal perintah untuk berdakwah." },
        { inside: null, cam: { at: [180, 420], dist: 42, el: 0.8, az: -0.45, up: 0 }, chars: [{ id: "khadijah", expr: "lembut" }], ...B4,
          narr: "Setelah itu wahyu turun berturut-turut dan tidak terputus lagi." }
      ] }
    ],
    penutup: "Wahyu kini turun terus-menerus. Dakwah dimulai secara diam-diam di Mekah. Lihat peristiwa berikutnya di timeline."
  };

  // ---------- Ad-Dhuha 1–3: ejekan saat wahyu tertunda ----------
  const B4950 = { sumber: "HR. Bukhari no. 4950 (Jundub bin Sufyan)", url: "https://sunnah.com/bukhari:4950" };
  const B1125 = { sumber: "HR. Bukhari no. 1125 (Jundub bin Abdullah)", url: "https://sunnah.com/bukhari:1125" };
  const M1797 = { sumber: "HR. Muslim no. 1797 (Jundub bin Abdullah)", url: "https://sunnah.com/muslim:1797a" };
  const CAM_PINTU = { at: [121, 101], dist: 2.4, el: 0.4, az: -0.94, up: 3 };

  window.TONTONAN["wahyu-dhuha"] = {
    peta: true,
    malam: 1,
    judul: "Ejekan Saat Wahyu Tertunda",
    tahun: 612,
    tanggal: {
      judul: "Awal periode Mekah, ±612 M",
      rinci: [
        { k: "Waktu", v: "Tahun, bulan, dan hari tidak disebut dalam riwayat. ±612 M adalah perkiraan.", s: "Perkiraan" },
        { k: "Lama tertunda", v: "Dua atau tiga malam.", s: "HR. Bukhari no. 4950", url: "https://sunnah.com/bukhari:4950" },
        { k: "Riwayat lain", v: "Beberapa hari, menurut riwayat Ibnu Abbas.", s: "Tafsir Ibnu Katsir", url: "https://quran.com/93:1/tafsirs/en-tafisr-ibn-kathir" }
      ]
    },
    pengantar: "Rasulullah ﷺ dan malaikat tidak digambarkan; keduanya hanya tampil sebagai nama dan cahaya. Perempuan yang mengejek tidak disebut namanya dalam Shahih Bukhari, jadi tampil sebagai \"seorang perempuan\". Urutan kejadian mengikuti HR. Bukhari no. 4950 dan 1125 serta HR. Muslim no. 1797, dan perlu diverifikasi ustadz.",
    tokoh: { perempuan: { nama: "Seorang perempuan" } },
    lampu: [[139, 103]],
    paths: { datang: [[113, 150], [114, 124], [117, 108]] },
    babak: [
      { judul: "Malam-malam yang sunyi", beats: [
        { cam: { at: [132, 97], dist: 12, el: 0.72, az: -0.94, up: 0 }, rasul: { at: R_RUMAH, state: "sakit" }, tanggal: true,
          sumber: "Catatan penyusun", narr: "Mekah, pada masa awal kenabian. Waktu persisnya tidak disebut dalam riwayat." },
        { inside: { scene: "rumah-khadijah", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 760, y: 610, small: false, state: "sakit" } }, ...B4950,
          narr: "Rasulullah ﷺ sakit, sehingga tidak bangun untuk shalat malam selama dua atau tiga malam." },
        { ...B1125, narr: "Dalam riwayat lain disebutkan: Jibril terlambat datang kepada beliau." }
      ] },
      { judul: "Ejekan", beats: [
        { inside: null, malam: 0, cam: CAM_PINTU, chars: [{ id: "perempuan", path: "datang", from: 0, to: 1, dur: 5000, expr: "sinis", on: true }], ...B4950,
          narr: "Lalu datang seorang perempuan." },
        { ...B4950, hold: 1500,
          say: { who: "perempuan", text: "Wahai Muhammad, aku berharap setanmu telah meninggalkanmu. Aku tidak melihatnya mendekatimu sejak dua atau tiga malam.",
            arab: "يَا مُحَمَّدُ، إِنِّي لَأَرْجُو أَنْ يَكُونَ شَيْطَانُكَ قَدْ تَرَكَكَ" } },
        { sumber: "Catatan penyusun",
          narr: "Shahih Bukhari tidak menyebut nama perempuan ini. Sebagian ulama menyebut riwayat di luar Shahih yang menamainya Ummu Jamil, istri Abu Lahab. Keterangan ini perlu diverifikasi." },
        { chars: [{ id: "perempuan", path: "datang", from: 1, to: 0, dur: 5000, on: false }], cam: { at: [125, 98], dist: 4, el: 0.55, az: -0.94, up: 3 }, ...M1797,
          narr: "Dalam riwayat Muslim, kaum musyrik berkata: \"Muhammad telah ditinggalkan.\"" }
      ] },
      { judul: "Demi waktu dhuha", beats: [
        { cam: { at: [132, 97], dist: 9, el: 0.6, az: -0.6, up: 0 }, rasul: { state: "tenang" }, ...B4950, narr: "Maka Allah menurunkan wahyu." },
        { inside: { scene: "rumah-khadijah-siang", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 700, y: 600, small: false, state: "tenang" }, jibril: { x: 800, y: 250, power: 0.45 } },
          ...B4950, hold: 4500,
          say: { who: "wahyu", ayat: "QS. Ad-Dhuha: 1–3",
            arab: "وَالضُّحَىٰ ﴿١﴾ وَاللَّيْلِ إِذَا سَجَىٰ ﴿٢﴾ مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ ﴿٣﴾",
            text: "Demi waktu dhuha, dan demi malam apabila telah sunyi, Tuhanmu tidak meninggalkanmu dan tidak (pula) membencimu." } },
        { inside: { jibril: { x: 800, y: 250, power: 0 } }, sumber: "QS. Ad-Dhuha: 4–11",
          narr: "Allah tidak meninggalkan Nabi-Nya dan tidak membenci beliau. Ayat-ayat berikutnya berisi kabar gembira dan pengingat akan nikmat Allah kepada beliau." },
        { inside: null, cam: { at: [180, 300], dist: 30, el: 0.75, az: -0.45, up: 0 }, sumber: "Catatan penyusun",
          narr: "Jeda wahyu itu bukan tanda ditinggalkan. Wahyu terus turun kepada beliau." }
      ] }
    ],
    penutup: "Ejekan kaum musyrik terhadap Nabi terus berlanjut, dan dakwah segera dilakukan secara terang-terangan. Berikutnya: Asy-Syu'ara 214."
  };

  // ---------- Bukit Shafa: Asy-Syu'ara 214 dan Al-Masad 1–5 ----------
  const B4770 = { sumber: "HR. Bukhari no. 4770 (Ibnu Abbas)", url: "https://sunnah.com/bukhari:4770" };
  const B4971 = { sumber: "HR. Bukhari no. 4971 (Ibnu Abbas)", url: "https://sunnah.com/bukhari:4971" };
  const SHAFA = [100, -86];
  const CAM_SHAFA = { at: [100, -64], dist: 4.4, el: 0.36, az: Math.PI - 0.25, up: 7 };
  const JIB_SHAFA = [91, -92];
  const jibAt = (p, power, up = 9) => ({ at: p, up, power });

  window.TONTONAN["dakwah-shafa"] = {
    peta: true, malam: 0,
    judul: "Seruan di Bukit Shafa",
    tahun: 613,
    tanggal: {
      judul: "±613 M, awal dakwah terang-terangan",
      rinci: [
        { k: "Waktu", v: "Hari dan bulan tidak disebut dalam riwayat. Menurut kitab sirah, peristiwa ini terjadi setelah sekitar tiga tahun dakwah secara diam-diam.", s: "Sirah Ibnu Hisyam" },
        { k: "Tempat", v: "Bukit Shafa, di sisi timur Masjidil Haram.", s: "HR. Bukhari no. 4971", url: "https://sunnah.com/bukhari:4971" }
      ]
    },
    pengantar: "Rasulullah ﷺ dan malaikat tidak digambarkan; keduanya hanya tampil sebagai nama dan cahaya. Orang-orang Quraisy tampil sebagai karakter sederhana. Urutan kejadian mengikuti HR. Bukhari no. 4770, 4971, dan 2753, dan perlu diverifikasi ustadz.",
    tokoh: { abulahab: { nama: "Abu Lahab" }, quraisy1: { nama: "Orang Quraisy" }, quraisy2: { nama: "Orang Quraisy" }, quraisy3: { nama: "Orang Quraisy" } },
    lampu: [],
    paths: {
      keShafa: [R_RUMAH, [116, 70], [110, 20], [104, -30], [102, -60], SHAFA],
      q1: [[60, 30], [78, -20], [92, -58]], q2: [[150, 25], [130, -20], [112, -60]],
      q3: [[40, -20], [70, -45], [84, -66]], lahab: [[152, 142], [124, 92], [116, 40], [106, -10], [102, -56]],
      lahabPergi: [[102, -56], [108, -10], [124, 60], [152, 142]]
    },
    babak: [
      { judul: "Perintah memberi peringatan", beats: [
        { cam: { at: [110, 20], dist: 26, el: 0.78, az: Math.PI - 0.4, up: 0 }, rasul: { at: R_RUMAH, state: "tenang" }, tanggal: true,
          sumber: "Sirah Ibnu Hisyam", narr: "Sekitar tiga tahun Rasulullah ﷺ berdakwah secara diam-diam kepada orang-orang terdekat." },
        { cam: { at: [124, 94], dist: 3.2, el: 0.42, az: Math.PI - 0.4, up: 3 }, jibril: jibAt([116, 86], 0.6), ...B4770, narr: "Lalu turun wahyu." },
        { ...B4770, hold: 3000, say: { who: "wahyu", ayat: "QS. Asy-Syu'ara: 214", arab: "وَأَنذِرْ عَشِيرَتَكَ الْأَقْرَبِينَ",
          text: "Dan berilah peringatan kepada kerabat-kerabatmu yang terdekat." } }
      ] },
      { judul: "Di atas Bukit Shafa", beats: [
        { jibril: jibAt([116, 86], 0), rasul: { path: "keShafa", from: 0, to: 1, dur: 9000 }, cam: { follow: "rasul", dist: 5, el: 0.5, az: "behind", up: 3 }, ...B4971,
          narr: "Rasulullah ﷺ berjalan ke Bukit Shafa dan naik ke atasnya." },
        { cam: { at: [101, -78], dist: 3, el: 0.3, az: Math.PI - 0.25, up: 6 }, ...B4971, say: { who: "rasul", text: "Wahai, bahaya pagi ini!", arab: "يَا صَبَاحَاهْ" } },
        { ...B4770, say: { who: "rasul", text: "Wahai Bani Fihr! Wahai Bani 'Adi!", arab: "يَا بَنِي فِهْرٍ، يَا بَنِي عَدِيٍّ" } },
        { cam: CAM_SHAFA, chars: [
            { id: "quraisy1", path: "q1", from: 0, to: 1, dur: 6000, expr: "netral", on: true },
            { id: "quraisy2", path: "q2", from: 0, to: 1, dur: 6500, expr: "netral", on: true },
            { id: "quraisy3", path: "q3", from: 0, to: 1, dur: 5500, expr: "netral", on: true },
            { id: "abulahab", path: "lahab", from: 0, to: 1, dur: 8000, expr: "tegas", on: true }], ...B4770,
          narr: "Kabilah-kabilah Quraisy berdatangan. Yang tidak bisa datang mengirim utusan untuk melihat apa yang terjadi. Abu Lahab pun datang." },
        { ...B4770, say: { who: "rasul", text: "Bagaimana pendapat kalian, jika aku kabarkan bahwa ada pasukan berkuda di lembah ini yang hendak menyerang kalian, apakah kalian akan mempercayaiku?" } },
        { chars: [{ id: "quraisy2", expr: "senyum" }], ...B4770,
          say: { who: "quraisy2", text: "Ya. Kami tidak pernah mendapatimu kecuali berkata benar.", arab: "مَا جَرَّبْنَا عَلَيْكَ إِلَّا صِدْقًا" } },
        { chars: [{ id: "quraisy1", expr: "kaget" }, { id: "quraisy3", expr: "khawatir" }], ...B4770, hold: 1200,
          say: { who: "rasul", text: "Sesungguhnya aku adalah pemberi peringatan bagi kalian sebelum datangnya azab yang pedih.", arab: "فَإِنِّي نَذِيرٌ لَكُمْ بَيْنَ يَدَيْ عَذَابٍ شَدِيدٍ" } },
        { sumber: "HR. Bukhari no. 2753 (Abu Hurairah)", url: "https://sunnah.com/bukhari:2753", hold: 1500,
          narr: "Dalam riwayat Abu Hurairah, beliau berseru: \"Wahai kaum Quraisy, selamatkanlah diri kalian.\" Sampai kepada putrinya: \"Wahai Fatimah, mintalah dari hartaku sesukamu, tetapi aku tidak dapat menolongmu sedikit pun dari Allah.\"" }
      ] },
      { judul: "Celaan Abu Lahab", beats: [
        { chars: [{ id: "abulahab", expr: "sinis" }], cam: { at: [101, -64], dist: 2.6, el: 0.36, az: Math.PI - 0.25, up: 3 }, ...B4770,
          say: { who: "abulahab", text: "Celakalah engkau sepanjang hari ini! Untuk inikah engkau mengumpulkan kami?", arab: "تَبًّا لَكَ سَائِرَ الْيَوْمِ، أَلِهَذَا جَمَعْتَنَا" } },
        { chars: [{ id: "abulahab", path: "lahabPergi", from: 0, to: 0.45, dur: 4500, expr: "tegas" }, { id: "quraisy1", expr: "netral" }, { id: "quraisy3", expr: "netral" }],
          cam: CAM_SHAFA, ...B4971, narr: "Abu Lahab lalu berdiri dan pergi." },
        { jibril: jibAt(JIB_SHAFA, 0.6, 24), cam: { at: [97, -82], dist: 3.4, el: 0.36, az: Math.PI - 0.25, up: 6 }, ...B4770, narr: "Maka Allah menurunkan wahyu." },
        { ...B4770, hold: 4500, say: { who: "wahyu", ayat: "QS. Al-Masad: 1–3",
          arab: "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ ﴿١﴾ مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ ﴿٢﴾ سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ ﴿٣﴾",
          text: "Binasalah kedua tangan Abu Lahab, dan benar-benar binasa dia! Tidaklah berguna baginya hartanya dan apa yang dia usahakan. Kelak dia akan masuk ke dalam api yang bergejolak." } },
        { ...B4770, hold: 3000, say: { who: "wahyu", ayat: "QS. Al-Masad: 4–5",
          arab: "وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ ﴿٤﴾ فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ ﴿٥﴾",
          text: "Dan (begitu pula) istrinya, pembawa kayu bakar. Di lehernya ada tali dari sabut." } },
        { jibril: jibAt(JIB_SHAFA, 0, 24), chars: [{ id: "quraisy1", on: false }, { id: "quraisy2", on: false }, { id: "quraisy3", on: false }, { id: "abulahab", on: false }],
          cam: { at: [110, 0], dist: 24, el: 0.72, az: Math.PI - 0.4, up: 0 }, sumber: "Tafsir Ibnu Katsir", url: "https://quran.com/111:1/tafsirs/en-tafisr-ibn-kathir",
          narr: "Kata \"celaka\" yang diucapkan Abu Lahab dijawab dengan kata yang sama. Ia adalah paman Nabi sendiri, dan ia wafat dalam kekafiran setelah Perang Badar." }
      ] }
    ],
    penutup: "Sejak hari itu dakwah dilakukan secara terang-terangan, dan permusuhan Quraisy pun makin keras."
  };

  // ---------- 'Abasa 1–10 ----------
  const T3331 = { sumber: "HR. Tirmidzi no. 3331 (Aisyah), hasan gharib", url: "https://sunnah.com/tirmidhi:3331" };
  const R_ABASA = [30, -34], PEMBESAR = [36, -30];
  const CAM_ABASA = { at: [33, -32], dist: 2.4, el: 0.36, az: 0.5, up: 3 };
  window.TONTONAN["abasa"] = {
    peta: true, malam: 0,
    judul: "Teguran dalam Surah 'Abasa",
    tahun: 614,
    tanggal: {
      judul: "Periode Mekah, ±614 M",
      rinci: [
        { k: "Waktu", v: "Tahun, bulan, dan hari tidak disebut dalam riwayat. ±614 M adalah perkiraan.", s: "Perkiraan" },
        { k: "Tempat", v: "Tidak disebut. Di peta ini ditampilkan di dekat Ka'bah hanya sebagai ilustrasi.", s: "Catatan penyusun" },
        { k: "Pembesar Quraisy", v: "Namanya tidak disebut dalam riwayat Tirmidzi; kitab tafsir menyebut nama yang berbeda-beda.", s: "Tafsir Ibnu Katsir", url: "https://quran.com/80:1/tafsirs/en-tafisr-ibn-kathir" }
      ]
    },
    pengantar: "Rasulullah ﷺ dan malaikat tidak digambarkan; keduanya hanya tampil sebagai nama dan cahaya. Pembesar Quraisy tidak disebut namanya dalam riwayat. Urutan kejadian mengikuti HR. Tirmidzi no. 3331 dan Tafsir Ibnu Katsir, dan perlu diverifikasi ustadz.",
    tokoh: { pembesar: { nama: "Pembesar Quraisy" }, ibnuummimaktum: { nama: "Ibnu Ummi Maktum" } },
    lampu: [],
    paths: { datang: [[70, -80], [46, -56], [27, -42]] },
    babak: [
      { judul: "Berbicara dengan pembesar Quraisy", beats: [
        { cam: { at: [20, -20], dist: 14, el: 0.7, az: 0.5, up: 0 }, rasul: { at: R_ABASA, state: "tenang" }, chars: [{ id: "pembesar", at: PEMBESAR, expr: "netral", on: true }], tanggal: true,
          sumber: "Tafsir Ibnu Katsir", url: "https://quran.com/80:1/tafsirs/en-tafisr-ibn-kathir",
          narr: "Di Mekah, Rasulullah ﷺ sedang berbicara dengan salah seorang pembesar Quraisy. Beliau sangat berharap orang itu mau menerima Islam." },
        { cam: CAM_ABASA, ...T3331, narr: "Tempat dan nama pembesar itu tidak disebut dalam riwayat. Di peta ini peristiwanya ditampilkan di dekat Ka'bah sebagai ilustrasi." }
      ] },
      { judul: "Datangnya seorang tunanetra", beats: [
        { chars: [{ id: "ibnuummimaktum", path: "datang", from: 0, to: 1, dur: 6000, expr: "senyum", on: true }], ...T3331,
          narr: "Datanglah Abdullah bin Ummi Maktum, seorang tunanetra yang sudah lebih dulu masuk Islam." },
        { ...T3331, say: { who: "ibnuummimaktum", text: "Wahai Rasulullah, bimbinglah aku.", arab: "يَا رَسُولَ اللَّهِ أَرْشِدْنِي" } },
        { chars: [{ id: "ibnuummimaktum", expr: "netral" }], ...T3331, narr: "Rasulullah ﷺ bermuka masam dan berpaling darinya, lalu menghadap kepada pembesar itu." },
        { ...T3331, say: { who: "rasul", text: "Apakah menurutmu ada yang salah dengan apa yang aku katakan?", arab: "أَتَرَى بِمَا أَقُولُ بَأْسًا" } },
        { chars: [{ id: "pembesar", expr: "tegas" }], ...T3331, say: { who: "pembesar", text: "Tidak.", arab: "لَا" } }
      ] },
      { judul: "Teguran dari Allah", beats: [
        { jibril: jibAt([22, -28], 0.55), ...T3331, narr: "Maka turunlah wahyu." },
        { ...T3331, hold: 4000, say: { who: "wahyu", ayat: "QS. 'Abasa: 1–4",
          arab: "عَبَسَ وَتَوَلَّىٰ ﴿١﴾ أَن جَاءَهُ الْأَعْمَىٰ ﴿٢﴾ وَمَا يُدْرِيكَ لَعَلَّهُ يَزَّكَّىٰ ﴿٣﴾ أَوْ يَذَّكَّرُ فَتَنفَعَهُ الذِّكْرَىٰ ﴿٤﴾",
          text: "Dia bermuka masam dan berpaling, karena seorang buta telah datang kepadanya. Dan tahukah engkau, barangkali dia ingin menyucikan dirinya, atau dia ingin mendapatkan pengajaran, sehingga pengajaran itu bermanfaat baginya?" } },
        { ...T3331, hold: 4000, say: { who: "wahyu", ayat: "QS. 'Abasa: 5–10",
          arab: "أَمَّا مَنِ اسْتَغْنَىٰ ﴿٥﴾ فَأَنتَ لَهُ تَصَدَّىٰ ﴿٦﴾ وَمَا عَلَيْكَ أَلَّا يَزَّكَّىٰ ﴿٧﴾ وَأَمَّا مَن جَاءَكَ يَسْعَىٰ ﴿٨﴾ وَهُوَ يَخْشَىٰ ﴿٩﴾ فَأَنتَ عَنْهُ تَلَهَّىٰ ﴿١٠﴾",
          text: "Adapun orang yang merasa dirinya serba cukup, maka engkau memberi perhatian kepadanya, padahal tidak ada cela atasmu kalau dia tidak menyucikan diri. Adapun orang yang datang kepadamu dengan bersegera, sedang dia takut kepada Allah, engkau malah mengabaikannya." } },
        { jibril: jibAt([22, -28], 0), chars: [{ id: "pembesar", on: false }], sumber: "Tafsir Ibnu Katsir", url: "https://quran.com/80:1/tafsirs/en-tafisr-ibn-kathir",
          narr: "Peringatan Al-Qur'an disampaikan sama rata kepada yang mulia dan yang lemah, yang kaya dan yang miskin." },
        { chars: [{ id: "ibnuummimaktum", expr: "lembut" }], sumber: "HR. Bukhari no. 617 (Ibnu Umar)", url: "https://sunnah.com/bukhari:617",
          narr: "Ibnu Ummi Maktum tetap dekat dengan Nabi. Di Madinah ia menjadi salah satu muadzin Rasulullah ﷺ bersama Bilal." }
      ] }
    ],
    penutup: "Teguran ini dibacakan sampai sekarang sebagai pelajaran untuk tidak membeda-bedakan orang yang datang mencari ilmu."
  };

  // ---------- Al-'Alaq 6–19: ancaman Abu Jahal ----------
  const M2797 = { sumber: "HR. Muslim no. 2797 (Abu Hurairah)", url: "https://sunnah.com/muslim:2797" };
  const R_SHALAT = [14, -18], MAJELIS = [-22, 26];
  const CAM_KABAH = { at: [9, 0], dist: 3.6, el: 0.42, az: Math.PI / 2, up: 3 };
  window.TONTONAN["ancaman-abujahal"] = {
    peta: true, malam: 0,
    judul: "Ancaman Abu Jahal di Ka'bah",
    tahun: 614,
    malaikat: { ar: "ملائكة", id: "Para malaikat" },
    tanggal: {
      judul: "Periode Mekah, ±614 M",
      rinci: [
        { k: "Waktu", v: "Tahun, bulan, dan hari tidak disebut dalam riwayat. ±614 M adalah perkiraan, setelah Nabi shalat terang-terangan di Ka'bah.", s: "Perkiraan" },
        { k: "Tempat", v: "Dekat Ka'bah.", s: "HR. Bukhari no. 4958", url: "https://sunnah.com/bukhari:4958" }
      ]
    },
    pengantar: "Rasulullah ﷺ dan malaikat tidak digambarkan; keduanya hanya tampil sebagai nama dan cahaya. Apa yang dilihat Abu Jahal hanya diceritakan lewat ucapannya. Urutan kejadian mengikuti HR. Muslim no. 2797, HR. Bukhari no. 4958, dan HR. Tirmidzi no. 3349, dan perlu diverifikasi ustadz.",
    tokoh: { abujahal: { nama: "Abu Jahal" }, quraisy1: { nama: "Orang Quraisy" }, quraisy2: { nama: "Orang Quraisy" } },
    lampu: [],
    paths: { dekat: [MAJELIS, [-6, 22], [12, 10], [16, -4], [15, -11]] },
    babak: [
      { judul: "Sumpah Abu Jahal", beats: [
        { cam: { at: [-6, 6], dist: 12, el: 0.66, az: 2.5, up: 0 }, rasul: { at: R_SHALAT, state: "tenang" }, tanggal: true,
          chars: [{ id: "abujahal", at: MAJELIS, expr: "tegas", on: true }, { id: "quraisy1", at: [-28, 22], expr: "netral", on: true }, { id: "quraisy2", at: [-16, 32], expr: "netral", on: true }],
          ...M2797, narr: "Di dekat Ka'bah, Abu Jahal duduk bersama orang-orang Quraisy." },
        { cam: { at: [-21, 27], dist: 2.6, el: 0.4, az: 2.5, up: 3 }, ...M2797,
          say: { who: "abujahal", text: "Apakah Muhammad menyungkurkan wajahnya (sujud) di hadapan kalian?" } },
        { ...M2797, say: { who: "quraisy1", text: "Ya." } },
        { chars: [{ id: "abujahal", expr: "sinis" }], ...M2797,
          say: { who: "abujahal", text: "Demi Lata dan Uzza, jika aku melihatnya melakukan itu, sungguh akan kuinjak lehernya, atau akan kubenamkan wajahnya ke tanah." } }
      ] },
      { judul: "Parit api dan sayap-sayap", beats: [
        { cam: CAM_KABAH, rasul: { state: "sujud" }, ...M2797, narr: "Rasulullah ﷺ shalat di dekat Ka'bah." },
        { chars: [{ id: "abujahal", path: "dekat", from: 0, to: 0.85, dur: 6000, expr: "tegas" }], ...M2797,
          narr: "Abu Jahal mendatangi beliau, bermaksud menginjak leher beliau." },
        { chars: [{ id: "abujahal", path: "dekat", from: 0.85, to: 0.62, dur: 2200, expr: "kaget" }], jibril: { at: [15, -9], up: 2, power: 0.7 }, ...M2797,
          narr: "Tiba-tiba ia mundur sambil melindungi diri dengan kedua tangannya." },
        { jibril: { at: [15, -9], up: 2, power: 0 }, chars: [{ id: "quraisy2", expr: "kaget" }], ...M2797, say: { who: "quraisy2", text: "Ada apa denganmu?" } },
        { chars: [{ id: "abujahal", expr: "khawatir" }], ...M2797,
          say: { who: "abujahal", text: "Sesungguhnya antara aku dan dia ada parit dari api, kengerian, dan sayap-sayap.", arab: "إِنَّ بَيْنِي وَبَيْنَهُ لَخَنْدَقًا مِنْ نَارٍ وَهَوْلًا وَأَجْنِحَةً" } },
        { rasul: { state: "tenang" }, ...M2797,
          say: { who: "rasul", text: "Seandainya ia mendekatiku, niscaya malaikat akan menyambarnya anggota demi anggota.", arab: "لَوْ دَنَا مِنِّي لَاخْتَطَفَتْهُ الْمَلَائِكَةُ عُضْوًا عُضْوًا" } }
      ] },
      { judul: "Turunnya ayat", beats: [
        { jibril: { at: [20, -24], up: 9, power: 0.6 }, ...M2797, narr: "Maka Allah menurunkan ayat-ayat Surah Al-'Alaq." },
        { ...M2797, hold: 3000, say: { who: "wahyu", ayat: "QS. Al-'Alaq: 6–10",
          arab: "كَلَّا إِنَّ الْإِنسَانَ لَيَطْغَىٰ ﴿٦﴾ أَن رَّآهُ اسْتَغْنَىٰ ﴿٧﴾ إِنَّ إِلَىٰ رَبِّكَ الرُّجْعَىٰ ﴿٨﴾ أَرَأَيْتَ الَّذِي يَنْهَىٰ ﴿٩﴾ عَبْدًا إِذَا صَلَّىٰ ﴿١٠﴾",
          text: "Sekali-kali tidak! Sungguh, manusia benar-benar melampaui batas, apabila melihat dirinya serba cukup. Sungguh, hanya kepada Tuhanmulah tempat kembali. Bagaimana pendapatmu tentang orang yang melarang seorang hamba ketika dia melaksanakan shalat?" } },
        { ...M2797, hold: 3000, say: { who: "wahyu", ayat: "QS. Al-'Alaq: 11–14",
          arab: "أَرَأَيْتَ إِن كَانَ عَلَى الْهُدَىٰ ﴿١١﴾ أَوْ أَمَرَ بِالتَّقْوَىٰ ﴿١٢﴾ أَرَأَيْتَ إِن كَذَّبَ وَتَوَلَّىٰ ﴿١٣﴾ أَلَمْ يَعْلَم بِأَنَّ اللَّهَ يَرَىٰ ﴿١٤﴾",
          text: "Bagaimana pendapatmu jika dia berada di atas petunjuk, atau dia menyuruh bertakwa? Bagaimana pendapatmu jika dia mendustakan dan berpaling? Tidakkah dia mengetahui bahwa sesungguhnya Allah melihat?" } },
        { ...M2797, hold: 3500, say: { who: "wahyu", ayat: "QS. Al-'Alaq: 15–19",
          arab: "كَلَّا لَئِن لَّمْ يَنتَهِ لَنَسْفَعًا بِالنَّاصِيَةِ ﴿١٥﴾ نَاصِيَةٍ كَاذِبَةٍ خَاطِئَةٍ ﴿١٦﴾ فَلْيَدْعُ نَادِيَهُ ﴿١٧﴾ سَنَدْعُ الزَّبَانِيَةَ ﴿١٨﴾ كَلَّا لَا تُطِعْهُ وَاسْجُدْ وَاقْتَرِب ﴿١٩﴾",
          text: "Sekali-kali tidak! Jika dia tidak berhenti, niscaya Kami tarik ubun-ubunnya, ubun-ubun orang yang mendustakan dan durhaka. Maka biarlah dia memanggil golongannya, Kami pun akan memanggil Malaikat Zabaniyah. Sekali-kali tidak! Janganlah engkau patuh kepadanya; sujudlah dan dekatkanlah dirimu kepada Allah." } },
        { jibril: { at: [20, -24], up: 9, power: 0 }, rasul: { state: "sujud" }, cam: { at: [0, 0], dist: 14, el: 0.7, az: Math.PI / 2, up: 0 },
          sumber: "HR. Tirmidzi no. 3349 (Ibnu Abbas)", url: "https://sunnah.com/tirmidhi:3349",
          narr: "Dalam riwayat Ibnu Abbas, Abu Jahal membanggakan majelisnya yang paling banyak di Mekah. Ibnu Abbas berkata, seandainya ia memanggil golongannya, malaikat Zabaniyah pasti menyambarnya." }
      ] }
    ],
    penutup: "Ayat terakhir surah ini adalah ayat sajdah: \"sujudlah dan dekatkanlah dirimu kepada Allah.\""
  };
})();
