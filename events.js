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

  // ======================================================================
  // Kejadian 8–17. Kejadian di luar Mekah memakai mode panggung (peta: false).
  // ======================================================================
  const S_ = (sumber, url) => ({ sumber, url });
  const PENGANTAR = (r) => `Rasulullah ﷺ, para nabi, dan malaikat tidak digambarkan; mereka hanya tampil sebagai nama dan cahaya. Tokoh lain tampil sebagai karakter sederhana. Urutan kejadian mengikuti ${r}, dan perlu diverifikasi ustadz.`;
  const W_ = (power = 0.45) => ({ x: 800, y: 240, power });
  const LBL = (id, ar, x, y, ket) => ({ id, ar, x, y, ket });
  const MALAIKAT = { ar: "ملائكة", nama: "Para malaikat" };

  // ---------- 8. Isra' Mi'raj ----------
  const B3887 = S_("HR. Bukhari no. 3887 (Malik bin Sha'sha'ah)", "https://sunnah.com/bukhari:3887");
  const B3886 = S_("HR. Bukhari no. 3886 (Jabir bin Abdullah)", "https://sunnah.com/bukhari:3886");
  const HIJR = [-9, 9];
  const CAM_HIJR = { at: [-6, 8], dist: 3, el: 0.42, az: 2.3, up: 3 };
  const LANGIT = (n, labels, narr, extra = {}) => ({ inside: { label: `Mi'raj: ${n}`, labels }, ...B3887, narr, ...extra });
  window.TONTONAN["isra-miraj"] = {
    peta: true, malam: 1,
    judul: "Isra' Mi'raj",
    tahun: 621,
    tanggal: {
      judul: "Suatu malam, ±1 tahun sebelum Hijrah",
      rinci: [
        { k: "Tanggal", v: "Tidak disebut dalam hadits shahih. Pendapat yang masyhur: 27 Rajab. Ibnu Sa'd mencatat tanggal lain, dan sebagian peneliti menilai 27 Rajab tidak bersandar pada riwayat yang kuat.", s: "Wikipedia: Isra' and Mi'raj", url: "https://en.wikipedia.org/wiki/Isra%27_and_Mi%27raj" },
        { k: "Tempat berangkat", v: "Al-Hathim atau Al-Hijr di sisi Ka'bah.", s: "HR. Bukhari no. 3887", url: "https://sunnah.com/bukhari:3887" }
      ]
    },
    pengantar: PENGANTAR("HR. Bukhari no. 3887 dan 3886 serta HR. Muslim no. 162") + " Buraq hanya disebut dalam narasi.",
    tokoh: { quraisy1: { nama: "Orang Quraisy" }, quraisy2: { nama: "Orang Quraisy" }, quraisy3: { nama: "Orang Quraisy" } },
    lampu: [],
    paths: {},
    babak: [
      { judul: "Malam di sisi Ka'bah", beats: [
        { cam: { at: [0, 0], dist: 12, el: 0.62, az: 2.3, up: 0 }, rasul: { at: HIJR, state: "tenang" }, tanggal: true, ...B3887,
          narr: "Suatu malam, sekitar satu tahun sebelum Hijrah, Rasulullah ﷺ sedang berbaring di Al-Hijr, di sisi Ka'bah." },
        { cam: CAM_HIJR, jibril: { at: [-4, 14], up: 4, power: 0.8 }, ...B3887,
          narr: "Malaikat datang. Dada beliau dibelah, hati beliau dicuci dalam bejana emas berisi iman, lalu dikembalikan." },
        { ...B3887, narr: "Lalu didatangkan Buraq, hewan putih yang lebih kecil dari bagal dan lebih besar dari keledai. Langkahnya sejauh pandangan mata." },
        { cam: { at: [-9, 60], dist: 16, el: 0.12, az: 0, up: 40 }, jibril: { at: [-9, 420], up: 260, power: 1 }, ...B3887, hold: 1200,
          narr: "Malam itu juga beliau diperjalankan menuju Masjidil Aqsha di Baitul Maqdis." }
      ] },
      { judul: "Di Baitul Maqdis", beats: [
        { inside: { scene: "baitul-maqdis", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 760, y: 620, small: false, state: "tenang" }, jibril: { x: 1120, y: 380, power: 0.5 } },
          ...S_("HR. Muslim no. 162 (Anas)", "https://sunnah.com/muslim:162a"),
          narr: "Di Baitul Maqdis beliau shalat dua rakaat, menurut riwayat Muslim. Gambar tempat ini hanya rekonstruksi; pada masa itu belum ada bangunan masjid seperti sekarang." }
      ] },
      { judul: "Naik ke tujuh langit", beats: [
        { inside: { scene: "langit", cam: { x: 800, y: 470, s: 1 }, label: "Mi'raj: langit pertama", rasul: { x: 800, y: 700, small: true, state: "tenang" }, jibril: { x: 1080, y: 640, power: 0.55 },
            labels: [LBL("adam", "آدم", 800, 320, "langit pertama")] }, ...B3887,
          narr: "Jibril membawa beliau naik. Di setiap langit pintu dibukakan. Di langit pertama beliau bertemu Adam, yang menyambut: \"Selamat datang, anak yang shalih dan nabi yang shalih.\"" },
        LANGIT("langit kedua", [LBL("yahya", "يحيى", 600, 320, "langit kedua"), LBL("isa", "عيسى", 1000, 320, "langit kedua")], "Di langit kedua beliau bertemu Yahya dan Isa, dua saudara sepupu."),
        LANGIT("langit ketiga sampai kelima", [LBL("yusuf", "يوسف", 420, 340, "langit ketiga"), LBL("idris", "إدريس", 800, 300, "langit keempat"), LBL("harun", "هارون", 1180, 340, "langit kelima")],
          "Di langit ketiga beliau bertemu Yusuf, di langit keempat Idris, dan di langit kelima Harun."),
        LANGIT("langit keenam", [LBL("musa", "موسى", 800, 320, "langit keenam")], "Di langit keenam beliau bertemu Musa. Ketika beliau melewatinya, Musa menangis karena umat nabi sesudahnya lebih banyak masuk surga daripada umatnya."),
        LANGIT("langit ketujuh", [LBL("ibrahim", "إبراهيم", 800, 320, "langit ketujuh")], "Di langit ketujuh beliau bertemu Ibrahim, yang menyambut: \"Selamat datang, anak yang shalih dan nabi yang shalih.\""),
        { inside: { label: "Sidratul Muntaha", labels: [], jibril: { x: 800, y: 300, power: 1 } }, ...B3887,
          narr: "Beliau dinaikkan ke Sidratul Muntaha dan diperlihatkan Baitul Ma'mur. Beliau ditawari khamar, susu, dan madu, lalu memilih susu. Jibril berkata: itulah fitrah." }
      ] },
      { judul: "Lima puluh menjadi lima", beats: [
        { inside: { label: "Kewajiban shalat", jibril: { x: 800, y: 300, power: 0.4 }, labels: [LBL("musa", "موسى", 1200, 360, "")] }, ...B3887,
          narr: "Allah mewajibkan lima puluh shalat sehari. Musa menyarankan beliau kembali memohon keringanan, karena umatnya tidak akan sanggup." },
        { ...B3887, narr: "Beliau kembali beberapa kali, dan kewajiban itu dikurangi sedikit demi sedikit hingga menjadi lima." },
        { ...B3887, say: { who: "rasul", text: "Aku telah meminta kepada Tuhanku hingga aku malu. Tetapi aku ridha dan menerima.", arab: "سَأَلْتُ رَبِّي حَتَّى اسْتَحْيَيْتُ، وَلَكِنِّي أَرْضَى وَأُسَلِّمُ" } },
        { inside: { labels: [] }, ...B3887, hold: 1500, narr: "Lalu terdengar seruan: \"Aku telah menetapkan kewajiban-Ku dan meringankan hamba-hamba-Ku.\"" }
      ] },
      { judul: "Pagi di Mekah", beats: [
        { inside: null, malam: 0, jibril: { at: [-4, 14], up: 4, power: 0 }, cam: CAM_HIJR, rasul: { at: HIJR },
          chars: [{ id: "quraisy1", at: [-2, 18], expr: "sinis", on: true }, { id: "quraisy2", at: [4, 13], expr: "tegas", on: true }, { id: "quraisy3", at: [-15, 18], expr: "sinis", on: true }], ...B3886,
          narr: "Pagi harinya beliau menceritakan perjalanan itu. Kaum Quraisy mendustakannya." },
        { chars: [{ id: "quraisy1", expr: "kaget" }, { id: "quraisy2", expr: "kaget" }, { id: "quraisy3", expr: "khawatir" }], ...B3886,
          say: { who: "rasul", text: "Ketika Quraisy mendustakanku, aku berdiri di Al-Hijr. Allah menampakkan Baitul Maqdis kepadaku, dan aku menceritakan tanda-tandanya sambil melihatnya.", arab: "فَجَلَا اللَّهُ لِي بَيْتَ الْمَقْدِسِ" } },
        { ...S_("QS. Al-Isra': 1", ""), hold: 4500, say: { who: "wahyu", ayat: "QS. Al-Isra': 1",
          arab: "سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى",
          text: "Mahasuci (Allah) yang telah memperjalankan hamba-Nya pada malam hari dari Masjidil Haram ke Masjidil Aqsha yang telah Kami berkahi sekelilingnya, agar Kami perlihatkan kepadanya sebagian tanda-tanda (kebesaran) Kami." } }
      ] }
    ],
    penutup: "Sejak malam itu shalat lima waktu diwajibkan. Sekitar setahun kemudian Rasulullah ﷺ hijrah ke Madinah."
  };

  // ---------- 9. Al-Baqarah 144: pemindahan kiblat ----------
  const B4486 = S_("HR. Bukhari no. 4486 (Al-Bara' bin 'Azib)", "https://sunnah.com/bukhari:4486");
  window.TONTONAN["kiblat"] = {
    peta: false, malam: 0,
    judul: "Pemindahan Kiblat",
    tahun: 624,
    tanggal: {
      judul: "16 atau 17 bulan setelah Hijrah",
      rinci: [
        { k: "Lama menghadap Baitul Maqdis", v: "16 atau 17 bulan setelah tiba di Madinah.", s: "HR. Bukhari no. 4486", url: "https://sunnah.com/bukhari:4486" },
        { k: "Bulan", v: "Rajab atau Sya'ban 2 H (±624 M) menurut kitab sirah.", s: "Wikipedia: Qibla", url: "https://en.wikipedia.org/wiki/Qibla" },
        { k: "Shalat", v: "Shalat pertama menghadap Ka'bah adalah shalat Ashar.", s: "HR. Bukhari no. 4486", url: "https://sunnah.com/bukhari:4486" }
      ]
    },
    pengantar: PENGANTAR("HR. Bukhari no. 4486 dan 403") + " Kejadian ini di Madinah, jadi ditampilkan sebagai panggung, bukan di peta Mekah.",
    tokoh: { sahabat: { nama: "Sahabat" }, sahabat2: { nama: "Jamaah" }, sahabat3: { nama: "Jamaah" }, kabar: { nama: "Seorang sahabat" } },
    lampu: [], paths: {},
    babak: [
      { judul: "Menghadap Baitul Maqdis", beats: [
        { inside: { scene: "masjid-madinah", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 800, y: 600, small: false, state: "tenang" },
            chars: [{ id: "sahabat", x: 440, y: 650, expr: "netral", on: true }, { id: "sahabat2", x: 1160, y: 650, expr: "netral", on: true }] }, tanggal: true, ...B4486,
          narr: "Setelah Hijrah, selama 16 atau 17 bulan Rasulullah ﷺ dan para sahabat shalat menghadap Baitul Maqdis, di arah utara Madinah." },
        { ...S_("QS. Al-Baqarah: 144", ""), narr: "Beliau ingin kiblatnya diarahkan ke Ka'bah, dan sering menengadahkan wajah ke langit." },
        { inside: { jibril: W_() }, ...B4486, narr: "Lalu turun wahyu." },
        { ...B4486, hold: 4000, say: { who: "wahyu", ayat: "QS. Al-Baqarah: 144",
          arab: "قَدْ نَرَىٰ تَقَلُّبَ وَجْهِكَ فِي السَّمَاءِ ۖ فَلَنُوَلِّيَنَّكَ قِبْلَةً تَرْضَاهَا ۚ فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ",
          text: "Kami melihat wajahmu sering menengadah ke langit, maka akan Kami palingkan engkau ke kiblat yang engkau senangi. Maka hadapkanlah wajahmu ke arah Masjidil Haram." } },
        { inside: { jibril: W_(0), chars: [{ id: "sahabat", expr: "senyum" }, { id: "sahabat2", expr: "senyum" }] }, ...B4486,
          narr: "Shalat pertama yang beliau kerjakan menghadap Ka'bah adalah shalat Ashar, bersama sebagian sahabat." }
      ] },
      { judul: "Berputar dalam ruku'", beats: [
        { inside: { scene: "masjid-madinah", label: "Masjid lain di Madinah", cam: { x: 800, y: 470, s: 1 }, rasul: { x: -600, y: 600 },
            chars: [{ id: "sahabat2", x: 560, y: 650, expr: "netral", on: true }, { id: "sahabat3", x: 900, y: 650, expr: "netral", on: true }, { id: "kabar", x: 1300, y: 650, expr: "tegas", on: true }] }, ...B4486,
          narr: "Seorang laki-laki yang ikut shalat bersama Nabi melewati jamaah sebuah masjid yang sedang ruku', masih menghadap Baitul Maqdis." },
        { ...B4486, say: { who: "kabar", text: "Aku bersaksi demi Allah, aku telah shalat bersama Nabi menghadap Mekah.", arab: "أَشْهَدُ بِاللَّهِ لَقَدْ صَلَّيْتُ مَعَ النَّبِيِّ قِبَلَ مَكَّةَ" } },
        { inside: { chars: [{ id: "sahabat2", expr: "kaget" }, { id: "sahabat3", expr: "kaget" }] }, ...B4486,
          narr: "Mereka pun berputar menghadap Ka'bah dalam keadaan masih ruku'. Tempat ini kemudian dikenal sebagai Masjid Al-Qiblatain, \"masjid dua kiblat\"." },
        { ...S_("HR. Bukhari no. 403 (Ibnu Umar)", "https://sunnah.com/bukhari:403"),
          narr: "Jamaah di Quba baru menerima kabar ini keesokan harinya, saat shalat Subuh, lalu mereka juga berputar ke arah Ka'bah." },
        { inside: { chars: [{ id: "sahabat2", expr: "lembut" }, { id: "sahabat3", expr: "lembut" }] }, ...B4486,
          narr: "Orang-orang bertanya tentang shalat para sahabat yang wafat sebelum kiblat berpindah. Allah menurunkan ayat 143: \"Allah tidak akan menyia-nyiakan imanmu.\"" }
      ] }
    ],
    penutup: "Sejak itu kaum muslimin di mana pun shalat menghadap Ka'bah di Masjidil Haram."
  };

  // ---------- 11. Al-Anfal 9: Perang Badar ----------
  const M1763 = S_("HR. Muslim no. 1763 (Umar bin Khattab)", "https://sunnah.com/muslim:1763");
  window.TONTONAN["badar"] = {
    peta: false, malam: 0,
    judul: "Doa di Lembah Badar",
    tahun: 624,
    tanggal: {
      judul: "17 Ramadhan 2 H (±624 M)",
      rinci: [
        { k: "Tanggal", v: "17 Ramadhan 2 H, hari Jumat, menurut kitab sirah.", s: "Sirah Ibnu Hisyam" },
        { k: "Jumlah pasukan", v: "Kaum musyrikin 1.000 orang; kaum muslimin 319 orang.", s: "HR. Muslim no. 1763", url: "https://sunnah.com/muslim:1763" }
      ]
    },
    pengantar: PENGANTAR("HR. Muslim no. 1763") + " Pertempuran tidak digambarkan.",
    tokoh: { abubakar: { nama: "Abu Bakar" } },
    lampu: [], paths: {},
    babak: [
      { judul: "Menghadap kiblat", beats: [
        { inside: { scene: "badar", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 560, y: 600, small: false, state: "tenang" },
            chars: [{ id: "abubakar", x: 980, y: 650, expr: "khawatir", on: true }] }, tanggal: true, ...M1763,
          narr: "Hari Badar. Rasulullah ﷺ melihat kaum musyrikin berjumlah seribu orang, sedangkan para sahabat 319 orang." },
        { ...M1763, narr: "Beliau menghadap kiblat, menengadahkan kedua tangan, dan terus berdoa." },
        { ...M1763, say: { who: "rasul", text: "Ya Allah, penuhilah untukku apa yang Engkau janjikan kepadaku. Ya Allah, berikanlah apa yang Engkau janjikan kepadaku.", arab: "اللَّهُمَّ أَنْجِزْ لِي مَا وَعَدْتَنِي" } },
        { ...M1763, say: { who: "rasul", text: "Ya Allah, jika pasukan kecil kaum muslimin ini binasa, Engkau tidak akan disembah di muka bumi.", arab: "اللَّهُمَّ إِنْ تُهْلِكْ هَذِهِ الْعِصَابَةَ مِنْ أَهْلِ الْإِسْلَامِ لَا تُعْبَدْ فِي الْأَرْضِ" } },
        { ...M1763, narr: "Beliau berdoa begitu lama hingga selendangnya jatuh dari bahu." },
        { inside: { chars: [{ id: "abubakar", x: 700, expr: "lembut" }] }, ...M1763,
          narr: "Abu Bakar datang, memakaikan selendang itu kembali, dan memeluk beliau dari belakang." },
        { ...M1763, say: { who: "abubakar", text: "Wahai Nabi Allah, cukuplah permohonanmu kepada Tuhanmu. Sungguh Dia akan memenuhi apa yang Dia janjikan kepadamu.", arab: "سَيُنْجِزُ لَكَ مَا وَعَدَكَ" } }
      ] },
      { judul: "Seribu malaikat", beats: [
        { inside: { jibril: { x: 1150, y: 240, power: 1, ...MALAIKAT }, chars: [{ id: "abubakar", x: 980, expr: "kagum" }] }, ...M1763, narr: "Maka Allah menurunkan wahyu." },
        { ...M1763, hold: 3500, say: { who: "wahyu", ayat: "QS. Al-Anfal: 9",
          arab: "إِذْ تَسْتَغِيثُونَ رَبَّكُمْ فَاسْتَجَابَ لَكُمْ أَنِّي مُمِدُّكُم بِأَلْفٍ مِّنَ الْمَلَائِكَةِ مُرْدِفِينَ",
          text: "(Ingatlah) ketika kamu memohon pertolongan kepada Tuhanmu, lalu Dia mengabulkan bagimu, \"Sungguh, Aku akan mendatangkan bala bantuan kepadamu dengan seribu malaikat yang datang berturut-turut.\"" } },
        { ...M1763, narr: "Seorang sahabat Anshar mendengar suara cambuk dan seruan penunggang kuda, \"Majulah, Haizum!\" Nabi ﷺ bersabda, \"Itu adalah bantuan dari langit ketiga.\"" },
        { inside: { jibril: { x: 1150, y: 240, power: 0, ...MALAIKAT }, chars: [{ id: "abubakar", expr: "senyum" }] }, ...M1763,
          narr: "Hari itu tujuh puluh orang musyrikin terbunuh, termasuk Abu Jahal, dan tujuh puluh lainnya tertawan." }
      ] }
    ],
    penutup: "Badar adalah kemenangan besar pertama kaum muslimin. Surah Al-Anfal turun berkenaan dengan perang ini."
  };

  // ---------- 12. Al-Anfal 30: makar Quraisy di malam Hijrah ----------
  const A3251 = S_("HR. Ahmad no. 3251 (Ibnu Abbas), sanad hasan menurut Ibnu Hajar", "https://hadithunlocked.com/ahmad:3251");
  const CAM_NADWAH = { at: [-24, 32], dist: 3, el: 0.42, az: 2.4, up: 3 };
  window.TONTONAN["makar-nadwah"] = {
    peta: true, malam: 1,
    judul: "Makar Quraisy di Malam Hijrah",
    tahun: 622,
    tanggal: {
      judul: "Malam Hijrah, 622 M",
      rinci: [
        { k: "Waktu", v: "Akhir Shafar atau awal Rabi'ul Awwal, tahun pertama Hijrah, menurut kitab sirah.", s: "Sirah Ibnu Hisyam" },
        { k: "Tempat musyawarah", v: "Darun Nadwah menurut kitab sirah; riwayat Ahmad hanya menyebut \"di Mekah\".", s: "HR. Ahmad no. 3251", url: "https://hadithunlocked.com/ahmad:3251" },
        { k: "Turunnya ayat", v: "Al-Anfal turun di Madinah setelah Perang Badar (2 H); ayat 30 mengenang malam ini.", s: "Catatan penyusun" }
      ]
    },
    pengantar: PENGANTAR("HR. Ahmad no. 3251, HR. Bukhari no. 3905, dan Sirah Ibnu Hisyam") + " Usul Abu Jahal berasal dari kitab sirah.",
    tokoh: { abujahal: { nama: "Abu Jahal" }, quraisy1: { nama: "Orang Quraisy" }, quraisy2: { nama: "Orang Quraisy" }, quraisy3: { nama: "Orang Quraisy" }, ali: { nama: "Ali bin Abi Thalib" } },
    lampu: [[139, 103], [-38, 50]],
    paths: {
      jaga1: [[-30, 28], [20, 60], [100, 104], [110, 100]], jaga2: [[-16, 34], [30, 80], [104, 112], [118, 110]], jaga3: [[-26, 38], [10, 90], [110, 120], [132, 110]],
      keluar: [R_RUMAH, [126, 70], [110, 20], [80, -60], [40, -200], [0, -360], [-40, -520]]
    },
    babak: [
      { judul: "Musyawarah di malam hari", beats: [
        { cam: CAM_NADWAH, rasul: { at: R_RUMAH, state: "tenang" }, tanggal: true,
          chars: [{ id: "abujahal", at: [-22, 30], expr: "tegas", on: true }, { id: "quraisy1", at: [-30, 28], expr: "netral", on: true }, { id: "quraisy2", at: [-16, 34], expr: "netral", on: true }, { id: "quraisy3", at: [-26, 38], expr: "netral", on: true }],
          ...A3251, narr: "Mekah, 622 M. Kaum Quraisy bermusyawarah pada suatu malam untuk menghadapi Rasulullah ﷺ. Menurut kitab sirah, tempatnya di Darun Nadwah." },
        { ...A3251, say: { who: "quraisy1", text: "Jika pagi tiba, ikatlah dia." } },
        { ...A3251, say: { who: "quraisy2", text: "Bunuhlah dia." } },
        { ...A3251, say: { who: "quraisy3", text: "Usirlah dia." } },
        { chars: [{ id: "abujahal", expr: "sinis" }], ...S_("Sirah Ibnu Hisyam (kitab sirah)", ""),
          say: { who: "abujahal", text: "Kita ambil dari setiap kabilah seorang pemuda yang kuat. Mereka menyerangnya bersama-sama, sehingga darahnya terbagi ke semua kabilah." } }
      ] },
      { judul: "Ali di tempat tidur Nabi", beats: [
        { cam: { at: [126, 94], dist: 3, el: 0.45, az: -0.94, up: 3 }, ...A3251, narr: "Allah memberi tahu Nabi ﷺ rencana itu." },
        { inside: { scene: "rumah-khadijah", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 560, y: 600, small: false, state: "tenang" },
            chars: [{ id: "ali", x: 1020, y: 650, expr: "tegas", on: true }] }, ...A3251,
          narr: "Malam itu Ali bin Abi Thalib tidur di tempat tidur beliau." },
        { inside: { chars: [{ id: "ali", expr: "lembut" }] }, ...A3251, narr: "Ali berbaring di tempat tidur itu, sementara Rasulullah ﷺ bersiap keluar." }
      ] },
      { judul: "Keluar menuju gua", beats: [
        { inside: null, cam: { at: [118, 100], dist: 4, el: 0.55, az: -0.94, up: 3 },
          chars: [{ id: "quraisy1", path: "jaga1", from: 0, to: 1, dur: 7000, expr: "tegas" }, { id: "quraisy2", path: "jaga2", from: 0, to: 1, dur: 7500, expr: "tegas" },
            { id: "quraisy3", path: "jaga3", from: 0, to: 1, dur: 7000, expr: "tegas" }, { id: "abujahal", on: false }], ...A3251,
          narr: "Kaum musyrikin berjaga semalaman di sekitar rumah, mengira yang berbaring di dalam adalah Nabi." },
        { rasul: { path: "keluar", from: 0, to: 1, dur: 20000 }, cam: { follow: "rasul", dist: 14, el: 0.75, az: "behind", up: 3 }, ...S_("HR. Bukhari no. 3905 (Aisyah)", "https://sunnah.com/bukhari:3905"),
          narr: "Rasulullah ﷺ keluar. Bersama Abu Bakar, beliau menuju Gua Tsur, sekitar 4 km di selatan Mekah, dan bersembunyi di sana tiga malam." }
      ] },
      { judul: "Pagi harinya", beats: [
        { malam: 0, cam: { at: [116, 102], dist: 3, el: 0.45, az: -0.94, up: 3 }, chars: [{ id: "ali", at: [120, 96], expr: "tegas", on: true },
            { id: "quraisy1", expr: "kaget" }, { id: "quraisy2", expr: "kaget" }, { id: "quraisy3", expr: "kaget" }], ...A3251,
          narr: "Pagi harinya mereka menyerbu dan mendapati Ali. Allah menggagalkan tipu daya mereka." },
        { ...A3251, say: { who: "quraisy2", text: "Di mana sahabatmu?" } },
        { ...A3251, say: { who: "ali", text: "Aku tidak tahu." } },
        { ...A3251, narr: "Mereka mengikuti jejak sampai ke gunung. Di mulut gua mereka melihat sarang laba-laba dan berkata, \"Seandainya ia masuk ke sini, tentu tidak ada sarang laba-laba di mulutnya.\"" },
        { ...S_("QS. Al-Anfal: 30 (turun setelah Badar)", ""), hold: 4500, say: { who: "wahyu", ayat: "QS. Al-Anfal: 30",
          arab: "وَإِذْ يَمْكُرُ بِكَ الَّذِينَ كَفَرُوا لِيُثْبِتُوكَ أَوْ يَقْتُلُوكَ أَوْ يُخْرِجُوكَ ۚ وَيَمْكُرُونَ وَيَمْكُرُ اللَّهُ ۖ وَاللَّهُ خَيْرُ الْمَاكِرِينَ",
          text: "Dan (ingatlah) ketika orang-orang kafir memikirkan tipu daya terhadapmu untuk menahanmu, atau membunuhmu, atau mengusirmu. Mereka membuat tipu daya, dan Allah membalas tipu daya mereka. Allah sebaik-baik pembalas tipu daya." } }
      ] }
    ],
    penutup: "Setelah tiga malam di Gua Tsur, Rasulullah ﷺ dan Abu Bakar melanjutkan perjalanan ke Madinah."
  };

  // ---------- 13–14. Ali 'Imran 128 dan 144: Perang Uhud ----------
  const M1791 = S_("HR. Muslim no. 1791 (Anas)", "https://sunnah.com/muslim:1791");
  const IK144 = S_("Tafsir Ibnu Katsir, Ali 'Imran 144", "https://quran.com/3:144/tafsirs/en-tafisr-ibn-kathir");
  const B1242 = S_("HR. Bukhari no. 1242 (Ibnu Abbas)", "https://sunnah.com/bukhari:1242");
  window.TONTONAN["uhud"] = {
    peta: false, malam: 0,
    judul: "Luka dan Kabar Palsu di Uhud",
    tahun: 625,
    tanggal: {
      judul: "Syawal 3 H (±625 M)",
      rinci: [
        { k: "Waktu", v: "Syawal 3 H menurut kitab sirah.", s: "Sirah Ibnu Hisyam" },
        { k: "Dua sebab Ali 'Imran 128", v: "Luka Nabi di Uhud (Muslim 1791) dan doa beliau dalam shalat Subuh (Bukhari 4069).", s: "HR. Bukhari no. 4069", url: "https://sunnah.com/bukhari:4069" },
        { k: "Ali 'Imran 144", v: "Sebab turunnya dari Tafsir Ibnu Katsir; ayat ini dibacakan Abu Bakar saat Nabi wafat, 11 H.", s: "HR. Bukhari no. 1242", url: "https://sunnah.com/bukhari:1242" }
      ]
    },
    pengantar: PENGANTAR("HR. Muslim no. 1791, HR. Bukhari no. 4069, 1241, 1242, dan Tafsir Ibnu Katsir") + " Pertempuran tidak digambarkan.",
    tokoh: { sahabat: { nama: "Sahabat" }, sahabat2: { nama: "Sahabat" }, abubakar: { nama: "Abu Bakar" }, umar: { nama: "Umar bin Khattab" } },
    lampu: [], paths: {},
    babak: [
      { judul: "Di kaki Gunung Uhud", beats: [
        { inside: { scene: "uhud", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 640, y: 620, small: false, state: "tenang" },
            chars: [{ id: "sahabat", x: 1000, y: 660, expr: "tegas", on: true }] }, tanggal: true, ...S_("Sirah Ibnu Hisyam", ""),
          narr: "Syawal 3 H. Pasukan Quraisy datang untuk membalas kekalahan di Badar, dan pertempuran terjadi di kaki Gunung Uhud." },
        { inside: { rasul: { state: "payah" }, chars: [{ id: "sahabat", expr: "khawatir" }] }, ...M1791,
          narr: "Kaum muslimin terdesak dan sebagian gugur. Gigi seri Rasulullah ﷺ patah dan kepala beliau terluka. Beliau mengusap darah dari wajahnya." },
        { ...M1791, say: { who: "rasul", text: "Bagaimana mungkin beruntung suatu kaum yang melukai nabi mereka dan mematahkan giginya, padahal ia menyeru mereka kepada Allah?", arab: "كَيْفَ يُفْلِحُ قَوْمٌ شَجُّوا نَبِيَّهُمْ وَكَسَرُوا رَبَاعِيَتَهُ" } },
        { inside: { jibril: W_() }, ...M1791, hold: 3000, say: { who: "wahyu", ayat: "QS. Ali 'Imran: 128",
          arab: "لَيْسَ لَكَ مِنَ الْأَمْرِ شَيْءٌ أَوْ يَتُوبَ عَلَيْهِمْ أَوْ يُعَذِّبَهُمْ فَإِنَّهُمْ ظَالِمُونَ",
          text: "Itu bukan menjadi urusanmu, apakah Allah menerima tobat mereka atau mengazab mereka, karena sesungguhnya mereka orang-orang zalim." } },
        { inside: { jibril: W_(0), rasul: { state: "tenang" } }, ...S_("HR. Bukhari no. 4069 (Ibnu Umar)", "https://sunnah.com/bukhari:4069"),
          narr: "Dalam riwayat Ibnu Umar, ayat ini turun ketika beliau mendoakan laknat atas beberapa orang dalam shalat Subuh, setelah bangkit dari ruku'." }
      ] },
      { judul: "\"Muhammad telah terbunuh\"", beats: [
        { inside: { chars: [{ id: "sahabat", expr: "kaget" }, { id: "sahabat2", x: 1280, y: 660, expr: "sedih", on: true }] }, ...IK144,
          narr: "Terdengar teriakan bahwa Muhammad telah terbunuh. Ibnu Qami'ah, yang melukai beliau, juga mengaku telah membunuhnya. Sebagian kaum muslimin mempercayainya, dan semangat mereka runtuh." },
        { inside: { jibril: W_() }, ...IK144, hold: 4000, say: { who: "wahyu", ayat: "QS. Ali 'Imran: 144",
          arab: "وَمَا مُحَمَّدٌ إِلَّا رَسُولٌ قَدْ خَلَتْ مِن قَبْلِهِ الرُّسُلُ ۚ أَفَإِن مَّاتَ أَوْ قُتِلَ انقَلَبْتُمْ عَلَىٰ أَعْقَابِكُمْ",
          text: "Dan Muhammad hanyalah seorang rasul; sebelumnya telah berlalu beberapa rasul. Apakah jika dia wafat atau dibunuh kamu berbalik ke belakang? Barang siapa berbalik ke belakang, ia tidak akan merugikan Allah sedikit pun." } },
        { inside: { jibril: W_(0), chars: [{ id: "sahabat", expr: "tegas" }, { id: "sahabat2", expr: "tegas" }] }, ...IK144,
          narr: "Iman tidak boleh bergantung pada hadirnya seseorang, sekalipun ia Rasulullah ﷺ." }
      ] },
      { judul: "Tujuh tahun kemudian", beats: [
        { inside: { scene: "rumah-madinah", label: "Madinah, 11 H", cam: { x: 800, y: 470, s: 1 }, rasul: { x: -600, y: 600 },
            chars: [{ id: "umar", x: 1120, y: 650, expr: "kaget", on: true }, { id: "abubakar", x: 620, y: 650, expr: "sedih", on: true }] }, ...S_("HR. Bukhari no. 1241 (Aisyah)", "https://sunnah.com/bukhari:1241"),
          narr: "Rabi'ul Awwal 11 H, Rasulullah ﷺ wafat. Abu Bakar datang, membuka wajah beliau, menciumnya, dan menangis: \"Allah tidak akan menghimpun dua kematian atasmu.\"" },
        { ...B1242, narr: "Di luar, Umar sedang berbicara kepada orang-orang. Abu Bakar memintanya duduk, tetapi ia menolak." },
        { inside: { chars: [{ id: "abubakar", expr: "tegas" }] }, ...B1242,
          say: { who: "abubakar", text: "Barang siapa menyembah Muhammad, sesungguhnya Muhammad telah wafat. Barang siapa menyembah Allah, sesungguhnya Allah Maha Hidup dan tidak akan mati.", arab: "مَنْ كَانَ يَعْبُدُ مُحَمَّدًا فَإِنَّ مُحَمَّدًا قَدْ مَاتَ" } },
        { ...B1242, say: { who: "abubakar", text: "\"Dan Muhammad hanyalah seorang rasul; sebelumnya telah berlalu beberapa rasul...\"", arab: "وَمَا مُحَمَّدٌ إِلَّا رَسُولٌ قَدْ خَلَتْ مِن قَبْلِهِ الرُّسُلُ" } },
        { inside: { chars: [{ id: "umar", expr: "sedih" }] }, ...B1242, narr: "Orang-orang seakan-akan baru mengetahui ayat itu, dan mereka pun membacanya." }
      ] }
    ],
    penutup: "Ayat yang turun di Uhud menjadi peneguh umat ketika Rasulullah ﷺ benar-benar wafat."
  };

  // ---------- 15. Al-Ahzab 10: Perang Khandaq ----------
  const B4103 = S_("HR. Bukhari no. 4103 (Aisyah)", "https://sunnah.com/bukhari:4103");
  const B4099 = S_("HR. Bukhari no. 4099 (Anas)", "https://sunnah.com/bukhari:4099");
  window.TONTONAN["khandaq"] = {
    peta: false, malam: 0,
    judul: "Parit di Utara Madinah",
    tahun: 627,
    tanggal: {
      judul: "Syawal 5 H (±627 M)",
      rinci: [
        { k: "Tahun", v: "Syawal 5 H menurut Ibnu Ishaq; Musa bin Uqbah menyebut 4 H.", s: "Sirah Ibnu Hisyam" },
        { k: "Ayat", v: "Aisyah: ayat \"ketika mereka datang dari atas dan dari bawahmu\" terjadi pada hari Khandaq.", s: "HR. Bukhari no. 4103", url: "https://sunnah.com/bukhari:4103" }
      ]
    },
    pengantar: PENGANTAR("HR. Bukhari no. 4099 dan 4103 serta Sirah Ibnu Hisyam"),
    tokoh: { sahabat: { nama: "Kaum Muhajirin" }, sahabat2: { nama: "Kaum Anshar" } },
    lampu: [], paths: {},
    babak: [
      { judul: "Menggali parit", beats: [
        { inside: { scene: "khandaq", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 600, y: 600, small: false, state: "tenang" },
            chars: [{ id: "sahabat", x: 920, y: 640, expr: "tegas", on: true }, { id: "sahabat2", x: 1220, y: 650, expr: "tegas", on: true }] }, tanggal: true, ...S_("Sirah Ibnu Hisyam", ""),
          narr: "Quraisy dan kabilah-kabilah sekutunya bergerak menuju Madinah. Kaum muslimin menggali parit di sisi utara kota yang terbuka." },
        { ...B4099, narr: "Di pagi yang dingin, kaum Muhajirin dan Anshar menggali dan mengangkat tanah. Rasulullah ﷺ ikut bersama mereka." },
        { ...B4099, say: { who: "rasul", text: "Ya Allah, sesungguhnya kehidupan (sejati) adalah kehidupan akhirat. Maka ampunilah kaum Anshar dan Muhajirin.", arab: "اللَّهُمَّ إِنَّ الْعَيْشَ عَيْشُ الْآخِرَهْ، فَاغْفِرْ لِلْأَنْصَارِ وَالْمُهَاجِرَهْ" } },
        { inside: { chars: [{ id: "sahabat", expr: "senyum" }, { id: "sahabat2", expr: "senyum" }] }, ...B4099,
          say: { who: "sahabat2", text: "Kamilah yang telah berbaiat kepada Muhammad untuk berjihad selama kami hidup.", arab: "نَحْنُ الَّذِينَ بَايَعُوا مُحَمَّدَا، عَلَى الْجِهَادِ مَا بَقِينَا أَبَدَا" } }
      ] },
      { judul: "Dikepung dari atas dan bawah", beats: [
        { inside: { chars: [{ id: "sahabat", expr: "khawatir" }, { id: "sahabat2", expr: "khawatir" }] }, ...S_("Sirah Ibnu Hisyam", ""),
          narr: "Pasukan sekutu datang dari atas dan dari bawah lembah, dan mengepung Madinah sekitar sebulan." },
        { inside: { jibril: W_() }, ...B4103, hold: 3500, say: { who: "wahyu", ayat: "QS. Al-Ahzab: 10",
          arab: "إِذْ جَاءُوكُم مِّن فَوْقِكُمْ وَمِنْ أَسْفَلَ مِنكُمْ وَإِذْ زَاغَتِ الْأَبْصَارُ وَبَلَغَتِ الْقُلُوبُ الْحَنَاجِرَ وَتَظُنُّونَ بِاللَّهِ الظُّنُونَا",
          text: "(Yaitu) ketika mereka datang kepadamu dari atas dan dari bawahmu, dan ketika penglihatanmu terpana dan hatimu naik sampai ke tenggorokan, dan kamu berprasangka yang bukan-bukan terhadap Allah." } },
        { inside: { jibril: W_(0) }, ...B4103, narr: "Aisyah berkata tentang ayat ini: \"Itu terjadi pada hari Khandaq.\"" },
        { inside: { chars: [{ id: "sahabat", expr: "lembut" }, { id: "sahabat2", expr: "lembut" }] }, ...S_("QS. Al-Ahzab: 9", ""),
          narr: "Akhirnya Allah mengirim angin kencang dan pasukan yang tidak terlihat, sehingga pasukan sekutu pulang tanpa hasil." }
      ] }
    ],
    penutup: "Setelah Khandaq, Quraisy tidak lagi menyerang Madinah."
  };

  // ---------- 16. An-Nur 11–20: Haditsul Ifki ----------
  const B4750 = S_("HR. Bukhari no. 4750 (Aisyah)", "https://sunnah.com/bukhari:4750");
  window.TONTONAN["ifki"] = {
    peta: false, malam: 0,
    judul: "Haditsul Ifki",
    tahun: 627,
    tanggal: {
      judul: "Sepulang sebuah ekspedisi, 5 atau 6 H",
      rinci: [
        { k: "Ekspedisi", v: "Hadits tidak menyebut namanya. Kitab sirah menyebut ekspedisi Bani Mushthaliq; tahunnya diperselisihkan (5 atau 6 H).", s: "Sirah Ibnu Hisyam" },
        { k: "Lama wahyu tertunda", v: "Sekitar sebulan.", s: "HR. Bukhari no. 4750", url: "https://sunnah.com/bukhari:4750" }
      ]
    },
    pengantar: PENGANTAR("HR. Bukhari no. 4750"),
    tokoh: { aisyah: { nama: "Aisyah" }, safwan: { nama: "Shafwan bin Al-Mu'aththal" }, abubakar: { nama: "Abu Bakar" }, ummuruman: { nama: "Ummu Ruman (ibu Aisyah)" } },
    lampu: [], paths: {},
    babak: [
      { judul: "Kalung yang hilang", beats: [
        { inside: { scene: "padang-malam", cam: { x: 800, y: 470, s: 1 }, rasul: { x: -600, y: 600 },
            chars: [{ id: "aisyah", x: 760, y: 650, expr: "netral", on: true }] }, tanggal: true, ...B4750,
          narr: "Aisyah ikut bersama Rasulullah ﷺ dalam sebuah ekspedisi. Di perjalanan pulang, saat rombongan berhenti malam hari, ia keluar sebentar untuk suatu keperluan." },
        { inside: { chars: [{ id: "aisyah", expr: "khawatir" }] }, ...B4750, narr: "Kalungnya putus. Ia kembali mencarinya, sehingga tertinggal." },
        { inside: { chars: [{ id: "aisyah", expr: "sedih" }] }, ...B4750,
          narr: "Orang-orang yang mengangkat sekedupnya mengira ia ada di dalam, karena tubuhnya ringan. Rombongan pun berangkat. Ia duduk di tempat itu menunggu, hingga tertidur." },
        { inside: { scene: "padang-siang", cam: { x: 800, y: 470, s: 1 }, rasul: { x: -600, y: 600 },
            chars: [{ id: "aisyah", x: 620, y: 650, expr: "sedih", on: true }, { id: "safwan", x: 1100, y: 650, expr: "kaget", on: true }] }, ...B4750,
          narr: "Pagi hari, Shafwan bin Al-Mu'aththal, yang berjalan di belakang pasukan, menemukannya." },
        { ...B4750, say: { who: "safwan", text: "Inna lillahi wa inna ilaihi raji'un.", arab: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ" } },
        { inside: { chars: [{ id: "safwan", expr: "tegas" }] }, ...B4750,
          narr: "Ia menundukkan untanya, Aisyah naik, dan Shafwan menuntunnya sampai menyusul pasukan di siang terik. Keduanya tidak berbicara sepatah kata pun." }
      ] },
      { judul: "Fitnah menyebar", beats: [
        { inside: { scene: "rumah-madinah", label: "Madinah", cam: { x: 800, y: 470, s: 1 }, rasul: { x: -600, y: 600 },
            chars: [{ id: "aisyah", x: 800, y: 650, expr: "sedih", on: true }] }, ...B4750,
          narr: "Sekelompok orang menyebarkan tuduhan dusta. Pemimpinnya adalah Abdullah bin Ubay bin Salul. Aisyah jatuh sakit sebulan, tanpa mengetahui apa yang beredar." },
        { ...B4750, narr: "Ia baru mengetahuinya dari Ummu Misthah. Sakitnya bertambah, dan ia pulang ke rumah orang tuanya. Ia menangis dua malam dan satu hari." },
        { ...B4750, narr: "Wahyu tidak turun. Nabi ﷺ bertanya kepada Usamah bin Zaid, Barirah, dan Zainab binti Jahsy; semuanya berkata hanya mengetahui kebaikan tentang Aisyah." }
      ] },
      { judul: "Kesabaran yang indah", beats: [
        { inside: { scene: "rumah-madinah", label: "Di rumah Abu Bakar", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 470, y: 600, small: false, state: "tenang" },
            chars: [{ id: "aisyah", x: 830, y: 650, expr: "sedih", on: true }, { id: "abubakar", x: 1130, y: 650, expr: "khawatir", on: true }, { id: "ummuruman", x: 1380, y: 650, expr: "khawatir", on: true }] }, ...B4750,
          say: { who: "rasul", text: "Wahai Aisyah, jika engkau bersih, Allah akan membersihkanmu. Jika engkau melakukan dosa, mohonlah ampun kepada Allah dan bertobatlah." } },
        { ...B4750, narr: "Kedua orang tuanya tidak sanggup menjawab." },
        { inside: { chars: [{ id: "aisyah", expr: "tegas" }] }, ...B4750,
          say: { who: "aisyah", text: "Aku tidak menemukan perumpamaan untukku dan kalian kecuali ucapan ayah Nabi Yusuf: \"Maka kesabaran yang indah, dan Allah tempat memohon pertolongan atas apa yang kalian ceritakan.\"", arab: "فَصَبْرٌ جَمِيلٌ وَاللَّهُ الْمُسْتَعَانُ عَلَى مَا تَصِفُونَ" } },
        { inside: { jibril: W_() }, ...B4750, narr: "Sebelum beliau beranjak, wahyu turun. Keringat bercucuran dari beliau seperti mutiara, padahal hari itu dingin." },
        { inside: { jibril: W_(0), chars: [{ id: "aisyah", expr: "kaget" }, { id: "abubakar", expr: "kagum" }, { id: "ummuruman", expr: "kagum" }] }, ...B4750,
          say: { who: "rasul", text: "Wahai Aisyah, adapun Allah, Dia telah membersihkanmu.", arab: "يَا عَائِشَةُ، أَمَّا اللَّهُ فَقَدْ بَرَّأَكِ" } },
        { inside: { chars: [{ id: "ummuruman", expr: "senyum" }] }, ...B4750, say: { who: "ummuruman", text: "Berdirilah kepada beliau." } },
        { inside: { chars: [{ id: "aisyah", expr: "lembut" }] }, ...B4750,
          say: { who: "aisyah", text: "Demi Allah, aku tidak akan berdiri kepadanya, dan aku tidak memuji kecuali Allah." } },
        { ...B4750, hold: 3500, say: { who: "wahyu", ayat: "QS. An-Nur: 11–12",
          arab: "إِنَّ الَّذِينَ جَاءُوا بِالْإِفْكِ عُصْبَةٌ مِّنكُمْ ۚ لَا تَحْسَبُوهُ شَرًّا لَّكُم ۖ بَلْ هُوَ خَيْرٌ لَّكُمْ",
          text: "Sesungguhnya orang-orang yang membawa berita bohong itu adalah dari golongan kamu juga. Janganlah kamu mengira berita itu buruk bagi kamu, bahkan itu baik bagi kamu... Mengapa orang-orang mukmin tidak berbaik sangka dan berkata, \"Ini adalah berita bohong yang nyata\"?" } },
        { inside: { chars: [{ id: "abubakar", expr: "lembut" }] }, ...B4750,
          narr: "Abu Bakar sempat bersumpah berhenti menafkahi kerabatnya, Misthah, yang ikut menyebarkan fitnah. Lalu turun ayat 22 tentang memaafkan, dan ia kembali menafkahinya." }
      ] }
    ],
    penutup: "Allah menurunkan sepuluh ayat untuk membersihkan nama Aisyah, sekaligus pelajaran untuk berbaik sangka dan tidak menyebarkan kabar tanpa bukti."
  };

  // ---------- 17. Al-Fath 1: sepulang dari Hudaibiyah ----------
  const B4177 = S_("HR. Bukhari no. 4177 (Aslam, dari Umar)", "https://sunnah.com/bukhari:4177");
  window.TONTONAN["fath"] = {
    peta: false, malam: 0,
    judul: "Kemenangan yang Nyata",
    tahun: 628,
    tanggal: {
      judul: "Dzulqa'dah 6 H (±628 M), malam hari",
      rinci: [
        { k: "Bulan", v: "Umrah Hudaibiyah terjadi di bulan Dzulqa'dah.", s: "HR. Bukhari no. 1778", url: "https://sunnah.com/bukhari:1778" },
        { k: "Waktu turun", v: "Malam hari, dalam perjalanan pulang.", s: "HR. Bukhari no. 4177", url: "https://sunnah.com/bukhari:4177" }
      ]
    },
    pengantar: PENGANTAR("HR. Bukhari no. 4177 dan 4172"),
    tokoh: { umar: { nama: "Umar bin Khattab" } },
    lampu: [], paths: {},
    babak: [
      { judul: "Tiga pertanyaan Umar", beats: [
        { inside: { scene: "padang-malam", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 520, y: 610, small: false, state: "tenang" },
            chars: [{ id: "umar", x: 900, y: 650, expr: "netral", on: true }] }, tanggal: true, ...B4177,
          narr: "Setelah Perjanjian Hudaibiyah, rombongan kaum muslimin pulang ke Madinah. Suatu malam Umar bin Khattab berjalan bersama Rasulullah ﷺ." },
        { ...B4177, narr: "Umar bertanya tentang sesuatu, tetapi beliau tidak menjawab. Ia bertanya lagi, tidak dijawab. Ketiga kalinya, tetap tidak dijawab." },
        { inside: { chars: [{ id: "umar", x: 1250, expr: "khawatir" }] }, ...B4177,
          say: { who: "umar", text: "Celakalah engkau, Umar. Engkau telah mendesak Rasulullah tiga kali, dan beliau tidak menjawabmu." } },
        { ...B4177, narr: "Ia memacu untanya ke depan rombongan, khawatir turun ayat Al-Qur'an tentang dirinya." }
      ] },
      { judul: "Surah yang paling dicintai", beats: [
        { inside: { chars: [{ id: "umar", x: 900, expr: "kaget" }] }, ...B4177, narr: "Tak lama kemudian seseorang memanggilnya. Umar datang dan mengucapkan salam." },
        { ...B4177, say: { who: "rasul", text: "Malam ini telah turun kepadaku sebuah surah yang lebih aku cintai daripada apa pun yang disinari matahari.", arab: "لَقَدْ أُنْزِلَتْ عَلَيَّ اللَّيْلَةَ سُورَةٌ لَهِيَ أَحَبُّ إِلَيَّ مِمَّا طَلَعَتْ عَلَيْهِ الشَّمْسُ" } },
        { inside: { jibril: W_(), chars: [{ id: "umar", expr: "kagum" }] }, ...B4177, hold: 3000,
          say: { who: "wahyu", ayat: "QS. Al-Fath: 1", arab: "إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا", text: "Sungguh, Kami telah memberikan kepadamu kemenangan yang nyata." } },
        { inside: { jibril: W_(0), chars: [{ id: "umar", expr: "senyum" }] }, ...S_("HR. Bukhari no. 4172 (Anas)", "https://sunnah.com/bukhari:4172"),
          narr: "Anas berkata: kemenangan itu adalah Perjanjian Hudaibiyah. Dua tahun kemudian, perjanjian ini membuka jalan bagi Fathu Makkah." }
      ] }
    ],
    penutup: "Yang tampak sebagai kekalahan di Hudaibiyah, Allah sebut sebagai kemenangan yang nyata."
  };
})();
