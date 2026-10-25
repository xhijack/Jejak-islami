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
          { k: "Tanggal", v: "Diperselisihkan. Al-Mubarakfuri, dengan menghitung hari Senin di bulan Ramadhan tahun itu, menyimpulkan malam 21 Ramadhan, bertepatan 10 Agustus 610 M. Di Indonesia, Nuzulul Qur'an umum diperingati 17 Ramadhan.", s: "Ar-Rahiq Al-Makhtum (Al-Mubarakfuri)", url: "https://usul.ai/t/the-sealed-nectar-with-additions/19" },
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
            sumber: "Rute perkiraan; letak Jabal Nur: Ar-Rahiq Al-Makhtum", url: "https://usul.ai/t/the-sealed-nectar-with-additions/18",
            narr: "Beliau berjalan ke utara melewati Ma'la, menuju Jabal Nur, sekitar dua mil dari Mekah." },
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
        { k: "Lama tertunda", v: "Dua atau tiga malam; dalam lafaz lain riwayat Jundub, satu atau dua malam (HR. Bukhari no. 4983).", s: "HR. Bukhari no. 4950", url: "https://sunnah.com/bukhari:4950" },
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
        { sumber: "Ad-Durr al-Mantsur (riwayat Al-Hakim); Al-Muharrar (mengutip Ibnu Hajar)", url: "https://quranpedia.net/surah/4/93/book/460",
          narr: "Shahih Bukhari tidak menyebut nama perempuan ini. Dalam riwayat Al-Hakim dari Zaid bin Arqam ia adalah istri Abu Lahab, dan Ibnu Hajar menyebut namanya Ummu Jamil binti Harb." },
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
          say: { who: "rasul", text: "Sesungguhnya aku adalah pemberi peringatan bagi kalian sebelum datangnya azab yang keras.", arab: "فَإِنِّي نَذِيرٌ لَكُمْ بَيْنَ يَدَيْ عَذَابٍ شَدِيدٍ" } },
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
          cam: { at: [110, 0], dist: 24, el: 0.72, az: Math.PI - 0.4, up: 0 }, sumber: "Tafsir Ibnu Katsir", url: "https://quran.com/111:5/tafsirs/ar-tafsir-ibn-kathir",
          narr: "Kata \"celaka\" yang diucapkan Abu Lahab dijawab dengan kata yang sama. Ia adalah paman Nabi sendiri. Ia dan istrinya tidak pernah beriman, dan para ulama memandang surah ini sebagai mukjizat." }
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
        { k: "Tanggal", v: "Tidak disebut dalam hadits shahih dan diperselisihkan ulama: setahun sebelum Hijrah (Az-Zuhri), malam 27 Rabi'ul Akhir setahun sebelum Hijrah (Al-Harbi), enam belas bulan sebelum Hijrah (As-Suddi), atau dua atau tiga tahun sebelum Hijrah (dikuatkan Ibnu Hajar). Tanggal 27 Rajab populer sebagai hari peringatan, tetapi tidak bersandar pada riwayat shahih.", s: "Tafsir Al-Qurthubi dan Ibnu Katsir (Al-Isra' 1); Fath al-Bari 8/670", url: "https://quran.com/17:1/tafsirs/ar-tafseer-al-qurtubi" },
        { k: "Tempat berangkat", v: "Al-Hathim atau Al-Hijr di sisi Ka'bah menurut riwayat ini; dalam riwayat Abu Dzar (HR. Bukhari no. 349), dari rumah beliau di Mekah.", s: "HR. Bukhari no. 3887", url: "https://sunnah.com/bukhari:3887" }
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
        { k: "Bulan", v: "Diperselisihkan: Rajab 2 H, Selasa pertengahan Sya'ban, atau dua bulan sebelum Badar (±624 M). Ibnu Hajar menguatkan pertengahan Rajab 2 H sebagai pendapat jumhur.", s: "Tafsir Al-Qurthubi (Al-Baqarah 142); Ibnu Hajar dikutip Fatwa Islamweb 240181", url: "https://quran.com/2:142/tafsirs/ar-tafseer-al-qurtubi" },
        { k: "Shalat", v: "Shalat pertama menghadap Ka'bah adalah shalat Ashar menurut riwayat Al-Bara'; ada riwayat lain yang menyebut shalat Zhuhur.", s: "HR. Bukhari no. 4486", url: "https://sunnah.com/bukhari:4486" }
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
          narr: "Mereka pun berputar menghadap Ka'bah dalam keadaan masih ruku'. Hadits ini tidak menyebut nama masjidnya." },
        { ...S_("Tafsir Al-Qurthubi (Al-Baqarah 142); Wafa' al-Wafa' (As-Samhudi)", "https://shamela.ws/book/23695/273"),
          narr: "Nama Masjid Al-Qiblatain, \"masjid dua kiblat\", dikaitkan dengan riwayat lain: shalat Zhuhur di masjid Bani Salimah. Riwayat tentang masjid mana yang dimaksud berbeda-beda." },
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
        { k: "Jumlah pasukan", v: "Kaum musyrikin 1.000 orang; kaum muslimin 319 orang menurut riwayat ini. Riwayat Al-Bara' (HR. Bukhari no. 3957) dan At-Tirmidzi menyebut \"tiga ratus sepuluh lebih\".", s: "HR. Muslim no. 1763", url: "https://sunnah.com/muslim:1763" }
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
        { k: "Turunnya ayat", v: "Menurut Ibnu Abbas, Surah Al-Anfal turun tentang Perang Badar (2 H); ayat 30 turun di Madinah dan mengenang malam ini. Ath-Thabari memuat riwayat Mujahid bahwa ayat ini Makkiyah, tetapi itu pendapat minoritas.", s: "HR. Bukhari no. 4645", url: "https://sunnah.com/bukhari:4645" }
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
          narr: "Rasulullah ﷺ keluar. Bersama Abu Bakar, beliau menuju Gua Tsur, sekitar lima mil di selatan Mekah, dan bersembunyi di sana tiga malam. Tonton \"Malam Keberangkatan ke Gua Tsur\"." }
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
        { k: "Tahun", v: "Syawal 5 H menurut pendapat yang masyhur; Musa bin 'Uqbah dan lainnya menyebut 4 H.", s: "Tafsir Ibnu Katsir, Al-Ahzab 9–10", url: "https://quran.com/33:10/tafsirs/en-tafisr-ibn-kathir" },
        { k: "Letak parit", v: "Sisi utara kota menurut Al-Mubarakfuri; Ibnu Katsir menyebut parit digali di arah timur Madinah.", s: "Ar-Rahiq Al-Makhtum; Tafsir Ibnu Katsir", url: "https://usul.ai/t/the-sealed-nectar-with-additions/227" },
        { k: "Ayat", v: "Aisyah: ayat \"ketika mereka datang dari atas dan dari bawahmu\" terjadi pada hari Khandaq.", s: "HR. Bukhari no. 4103", url: "https://sunnah.com/bukhari:4103" }
      ]
    },
    pengantar: PENGANTAR("HR. Bukhari no. 4099 dan 4103, Sirah Ibnu Hisyam, dan Ar-Rahiq Al-Makhtum"),
    tokoh: { sahabat: { nama: "Kaum Muhajirin" }, sahabat2: { nama: "Kaum Anshar" } },
    lampu: [], paths: {},
    babak: [
      { judul: "Menggali parit", beats: [
        { inside: { scene: "khandaq", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 600, y: 600, small: false, state: "tenang" },
            chars: [{ id: "sahabat", x: 920, y: 640, expr: "tegas", on: true }, { id: "sahabat2", x: 1220, y: 650, expr: "tegas", on: true }] }, tanggal: true, ...S_("Ar-Rahiq Al-Makhtum (kitab sirah)", "https://usul.ai/t/the-sealed-nectar-with-additions/227"),
          narr: "Quraisy dan kabilah-kabilah sekutunya bergerak menuju Madinah. Kaum muslimin menggali parit di sisi utara kota, satu-satunya sisi yang tidak terlindung harrah, gunung, dan kebun kurma." },
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
      judul: "Sepulang sebuah ekspedisi, 4–6 H (diperselisihkan)",
      rinci: [
        { k: "Ekspedisi", v: "Hadits tidak menyebut namanya. Al-Qurthubi menyebutnya ghazwah Bani al-Mushthaliq (al-Muraisi'): 6 H menurut Ibnu Ishaq, 4 H menurut Musa bin 'Uqbah; ada pula yang menyebut Sya'ban 5 H.", s: "Tafsir Al-Qurthubi, An-Nur 11", url: "https://quran.com/24:11/tafsirs/ar-tafseer-al-qurtubi" },
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
        { k: "Waktu turun", v: "Malam hari, dalam salah satu perjalanan beliau. Al-Bukhari meletakkan hadits ini di bab Hudaibiyah, dan Ibnu Katsir menyebut surah ini turun sepulang dari Hudaibiyah.", s: "HR. Bukhari no. 4177", url: "https://sunnah.com/bukhari:4177" }
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
  // =====================================================================
  // ---------- Hijrah: dari rumah Abu Bakar sampai jalan pantai ----------
  // Rumah Abu Bakar (perkiraan) di (-228, -199); Gua Tsur di (2538, -4952). Rute ke Tsur perkiraan.
  const SN_ = (k, n) => S_(`HR. ${k} no. ${n}`, `https://sunnah.com/${k.toLowerCase()}:${n}`);
  const B3905 = S_("HR. Bukhari no. 3905 (Aisyah)", "https://sunnah.com/bukhari:3905");
  const B2979 = S_("HR. Bukhari no. 2979 (Asma' binti Abu Bakar)", "https://sunnah.com/bukhari:2979");
  const B3653 = S_("HR. Bukhari no. 3653 (Anas, dari Abu Bakar)", "https://sunnah.com/bukhari:3653");
  const B3615 = S_("HR. Bukhari no. 3615 (Al-Bara', dari Abu Bakar)", "https://sunnah.com/bukhari:3615");
  const B3906 = S_("HR. Bukhari no. 3906 (Suraqah bin Malik)", "https://sunnah.com/bukhari:3906");
  const B3911 = S_("HR. Bukhari no. 3911 (Anas)", "https://sunnah.com/bukhari:3911");
  const B2263 = S_("HR. Bukhari no. 2263 (Aisyah)", "https://sunnah.com/bukhari:2263");
  const SIRAH_H = S_("Sirah Ibnu Hisyam; Ar-Rahiq Al-Makhtum (kitab sirah)", "https://usul.ai/t/the-sealed-nectar-with-additions/104");
  const LEMAH = (s, url) => S_(`${s} · riwayat lemah`, url || "");
  const AB = [-228, -199], AB_DEPAN = [-219, -191], AB_BELAKANG = [-237, -207];
  const GUA_T = [2538, -4952], KAKI_T = [2000, -4350];
  const CAM_AB = { at: [-222, -194], dist: 3.2, el: 0.42, az: 2.29, up: 3 };
  const CAM_TSUR = { at: GUA_T, dist: 4.5, el: 0.32, az: -2.67, up: 4 };
  const geser = (pts, de, dn) => pts.map(([e, n]) => [e + de, n + dn]);
  const frac = (pts, k) => { let a = 0, t = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); t += d; if (i <= k) a += d; } return a / t; };
  const KE_AB = [R_RUMAH, [126, 70], [110, 20], [70, -30], [30, -62], [-40, -110], [-120, -150], [-180, -176], AB_DEPAN];
  const KE_TSUR = [AB_BELAKANG, [-200, -262], [-120, -320], [-40, -345], [-30, -520], [-60, -820], [-250, -1250], [-150, -1700], [250, -2200], [600, -2650], [1100, -3050], [1500, -3500], [1800, -4000], KAKI_T];
  const T_KOTA = frac(KE_TSUR, 4);                                  // ujung selatan kota, sebelum keluar ke lembah
  const NAIK_T = [KAKI_T, [2150, -4500], [2300, -4620], [2250, -4720], [2420, -4800], [2380, -4880], GUA_T];
  const TGL_HIJRAH = (extra = []) => ({
    judul: "Akhir Shafar 1 H (±September 622 M)",
    rinci: [
      { k: "Malam keberangkatan", v: "Malam 27 Shafar 1 H (±12/13 September 622 M) menurut Ar-Rahiq Al-Makhtum. Hadits shahih tidak menyebut tanggalnya.", s: "Ar-Rahiq Al-Makhtum", url: "https://usul.ai/t/the-sealed-nectar-with-additions/104" },
      { k: "Di gua", v: "Tiga malam, lalu pemandu datang pada pagi hari ketiga.", s: "HR. Bukhari no. 3905", url: "https://sunnah.com/bukhari:3905" },
      ...extra
    ]
  });
  const PENGANTAR_H = (r) => PENGANTAR(r) + " Letak rumah Abu Bakar dan rute ke Jabal Tsur adalah perkiraan.";

  // ---------- Siang hari di rumah Abu Bakar ----------
  window.TONTONAN["siang-abubakar"] = {
    peta: true, malam: 0,
    judul: "Siang Hari di Rumah Abu Bakar",
    tahun: 622,
    tanggal: TGL_HIJRAH([{ k: "Waktu kunjungan", v: "Tengah hari, saat panas terik; menurut kitab sirah pada hari terakhir sebelum keberangkatan.", s: "HR. Bukhari no. 3905; Sirah Ibnu Hisyam", url: "https://sunnah.com/bukhari:3905" }]),
    pengantar: PENGANTAR_H("HR. Bukhari no. 3905 dan 2979"),
    tokoh: { abubakar: { nama: "Abu Bakar" }, aisyah: { nama: "Aisyah" }, asma: { nama: "Asma' binti Abu Bakar" } },
    lampu: [], paths: { datang: KE_AB },
    babak: [
      { judul: "Kunjungan di tengah hari", beats: [
        { cam: { at: [-60, -60], dist: 22, el: 0.8, az: 1.9, up: 0 }, rasul: { at: R_RUMAH, state: "tenang" }, tanggal: true,
          chars: [{ id: "abubakar", at: [-214, -187], expr: "netral", on: true }, { id: "aisyah", at: [-224, -186], expr: "netral", on: true }, { id: "asma", at: [-210, -197], expr: "netral", on: true }],
          ...B3905, narr: "Mekah, akhir bulan Shafar. Kaum muslimin sudah banyak yang berhijrah ke Madinah, sementara Abu Bakar menunggu izin untuk menemani Rasulullah ﷺ." },
        { rasul: { path: "datang", from: 0, to: 1, dur: 12000 }, cam: { follow: "rasul", dist: 9, el: 0.6, az: "behind", up: 3 }, ...B3905,
          narr: "Aisyah bercerita: suatu hari, saat mereka duduk di rumah Abu Bakar di tengah hari yang terik, Rasulullah ﷺ datang dengan kepala tertutup, pada jam yang biasanya beliau tidak datang." },
        { cam: CAM_AB, chars: [{ id: "abubakar", expr: "kaget" }], ...B3905,
          say: { who: "abubakar", text: "Demi Allah, beliau tidak datang pada jam seperti ini kecuali karena ada urusan penting.", arab: "وَاللَّهِ مَا جَاءَ بِهِ فِي هَذِهِ السَّاعَةِ إِلَّا أَمْرٌ" } }
      ] },
      { judul: "\"Aku telah diizinkan keluar\"", beats: [
        { inside: { scene: "rumah-abubakar", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 560, y: 600, small: false, state: "tenang" },
            chars: [{ id: "abubakar", x: 980, y: 650, expr: "kaget", on: true }, { id: "aisyah", x: 1200, y: 660, expr: "netral", on: true, s: 0.85 }, { id: "asma", x: 1370, y: 650, expr: "netral", on: true, s: 0.95 }] },
          ...B3905, say: { who: "rasul", text: "Suruh keluar orang-orang yang ada bersamamu.", arab: "أَخْرِجْ مَنْ عِنْدَكَ" } },
        { ...B3905, say: { who: "abubakar", text: "Mereka hanyalah keluargamu, ayahku tebusanmu, wahai Rasulullah.", arab: "إِنَّمَا هُمْ أَهْلُكَ بِأَبِي أَنْتَ يَا رَسُولَ اللَّهِ" } },
        { ...B3905, say: { who: "rasul", text: "Sungguh, aku telah diizinkan untuk keluar.", arab: "فَإِنِّي قَدْ أُذِنَ لِي فِي الْخُرُوجِ" } },
        { inside: { chars: [{ id: "abubakar", expr: "kagum" }] }, ...B3905, say: { who: "abubakar", text: "Aku menemanimu, ayahku tebusanmu, wahai Rasulullah?", arab: "الصَّحَابَةَ بِأَبِي أَنْتَ يَا رَسُولَ اللَّهِ" } },
        { ...B3905, say: { who: "rasul", text: "Ya.", arab: "نَعَمْ" } },
        { inside: { chars: [{ id: "abubakar", expr: "lembut" }, { id: "aisyah", expr: "senyum" }] }, ...S_("Sirah Ibnu Hisyam (Ibnu Ishaq, dari Aisyah)", ""),
          narr: "Menurut riwayat Ibnu Ishaq, Aisyah berkata ia belum pernah melihat orang menangis karena gembira sampai ia melihat ayahnya menangis hari itu." },
        { ...B3905, say: { who: "abubakar", text: "Ambillah salah satu dari dua untaku ini, wahai Rasulullah." } },
        { ...B3905, say: { who: "rasul", text: "Dengan membayar harganya.", arab: "بِالثَّمَنِ" } }
      ] },
      { judul: "Dzatun Nithaqain", beats: [
        { inside: { chars: [{ id: "abubakar", x: 900, expr: "netral" }, { id: "aisyah", x: 1140, expr: "netral" }, { id: "asma", x: 1320, expr: "khawatir" }],
            props: [{ id: "bekal", kind: "bekal", x: 760, y: 760, s: 1.1, depan: true }] }, ...B3905,
          narr: "Mereka menyiapkan bekal secepatnya dan menaruhnya dalam kantong kulit. Tetapi tidak ada tali untuk mengikat kantong makanan dan wadah air." },
        { inside: { props: [{ id: "bekal", kind: "bekal", x: 760, y: 760, s: 1.1, depan: true }, { id: "sabuk", kind: "sabuk", x: 1250, y: 820, s: 0.9, depan: true }] }, ...B2979,
          say: { who: "asma", text: "Demi Allah, aku tidak menemukan apa pun untuk mengikatnya selain ikat pinggangku.", arab: "وَاللَّهِ مَا أَجِدُ شَيْئًا أَرْبِطُ بِهِ إِلَّا نِطَاقِي" } },
        { ...B2979, say: { who: "abubakar", text: "Belahlah menjadi dua. Ikatkan yang satu pada wadah air dan yang lain pada kantong makanan.", arab: "فَشُقِّيهِ بِاثْنَيْنِ" } },
        { inside: { chars: [{ id: "asma", x: 1200, expr: "senyum" }], props: [{ id: "bekal", kind: "bekal", x: 760, y: 760, s: 1.1, depan: true, ikat: true }, { id: "sabuk", kind: "sabuk", x: 1050, y: 820, s: 0.9, depan: true, belah: true }] },
          hitung: "Dzatun Nithaqain", ...B2979,
          narr: "Asma' pun melakukannya. Sejak itu ia dijuluki Dzatun Nithaqain, \"pemilik dua ikat pinggang\"." },
        { inside: null, cam: { at: [-222, -194], dist: 7, el: 0.55, az: 2.29, up: 3 }, chars: [{ id: "asma", expr: "senyum" }], ...B3905,
          narr: "Rencana pun disusun: keduanya akan berangkat di malam hari, bersembunyi di sebuah gua di Jabal Tsur, lalu melanjutkan perjalanan dengan seorang pemandu." }
      ] }
    ],
    penutup: "Malam itu Rasulullah ﷺ datang lagi ke rumah ini, lalu bersama Abu Bakar berangkat ke selatan, menuju Gua Tsur."
  };

  // ---------- Keluar di malam hari menuju Gua Tsur ----------
  window.TONTONAN["keluar-menuju-tsur"] = {
    peta: true, malam: 1,
    judul: "Malam Keberangkatan ke Gua Tsur",
    tahun: 622,
    tanggal: TGL_HIJRAH(),
    pengantar: PENGANTAR_H("Sirah Ibnu Hisyam, Ar-Rahiq Al-Makhtum, HR. Bukhari no. 3905, dan HR. Tirmidzi no. 3925") + " Kisah menabur pasir sambil membaca Yasin: 9 adalah riwayat mursal (lemah).",
    tokoh: { abubakar: { nama: "Abu Bakar" }, abujahal: { nama: "Abu Jahal" }, quraisy1: { nama: "Pemuda Quraisy" }, quraisy2: { nama: "Pemuda Quraisy" }, quraisy3: { nama: "Pemuda Quraisy" } },
    lampu: [[139, 103], [-222, -194]],
    paths: { keAbubakar: KE_AB, keTsur: KE_TSUR, keTsurAB: geser(KE_TSUR, 5, -4), naik: NAIK_T, naikAB: geser(NAIK_T, 4, -3) },
    babak: [
      { judul: "Rumah yang dikepung", beats: [
        { cam: { at: [122, 92], dist: 4.5, el: 0.55, az: -0.94, up: 3 }, rasul: { at: R_RUMAH, state: "tenang" }, tanggal: true,
          chars: [{ id: "abujahal", at: [102, 104], expr: "sinis", on: true }, { id: "quraisy1", at: [110, 78], expr: "tegas", on: true }, { id: "quraisy2", at: [138, 76], expr: "tegas", on: true }, { id: "quraisy3", at: [104, 90], expr: "tegas", on: true },
            { id: "abubakar", at: AB_DEPAN, expr: "khawatir", on: true }],
          ...SIRAH_H, narr: "Malam itu para pemuda pilihan dari berbagai kabilah mengepung rumah Rasulullah ﷺ, menunggu saat untuk menyerang. Di dalam, Ali bin Abi Thalib berbaring di tempat tidur beliau." },
        { ...LEMAH("Sirah Ibnu Hisyam (Ibnu Ishaq, dari Muhammad bin Ka'ab Al-Qurazhi, mursal)"),
          narr: "Menurut sebuah riwayat dalam kitab sirah, beliau keluar melewati mereka, menaburkan segenggam pasir ke atas kepala mereka sambil membaca awal Surah Yasin. Riwayat ini sanadnya terputus; yang pasti, beliau keluar dengan selamat." },
        { ...LEMAH("Sirah Ibnu Hisyam (mursal)"), hold: 2500, say: { who: "rasul", ayat: "QS. Yasin: 9", arab: "وَجَعَلْنَا مِن بَيْنِ أَيْدِيهِمْ سَدًّا وَمِنْ خَلْفِهِمْ سَدًّا فَأَغْشَيْنَاهُمْ فَهُمْ لَا يُبْصِرُونَ",
          text: "Dan Kami jadikan di hadapan mereka sekat dan di belakang mereka sekat, lalu Kami tutup (penglihatan) mereka sehingga mereka tidak dapat melihat." } }
      ] },
      { judul: "Ke rumah Abu Bakar", beats: [
        { rasul: { path: "keAbubakar", from: 0, to: 1, dur: 14000 }, cam: { follow: "rasul", dist: 8, el: 0.62, az: "behind", up: 3 }, ...SIRAH_H,
          narr: "Rasulullah ﷺ berjalan dalam gelap melewati lorong-lorong kota menuju rumah Abu Bakar, yang sudah menunggu dengan bekal dan kendaraan yang dititipkan kepada pemandu." },
        { cam: CAM_AB, chars: [{ id: "abubakar", expr: "lembut" }], ...S_("Sirah Ibnu Hisyam (Ibnu Ishaq, dari Asma')", ""),
          narr: "Abu Bakar membawa seluruh hartanya yang tersisa, sekitar lima atau enam ribu dirham, untuk keperluan perjalanan." },
        { rasul: { at: AB_BELAKANG }, chars: [{ id: "abubakar", at: geser([AB_BELAKANG], 5, -4)[0] }], cam: { at: AB, dist: 4, el: 0.6, az: -0.85, up: 3 }, ...SIRAH_H,
          narr: "Menurut kitab sirah, keduanya keluar lewat pintu kecil di belakang rumah." }
      ] },
      { judul: "Ke selatan, bukan ke utara", beats: [
        { rasul: { path: "keTsur", from: 0, to: T_KOTA, dur: 11000 }, chars: [{ id: "abubakar", path: "keTsurAB", from: 0, to: T_KOTA, dur: 11000 }],
          cam: { follow: "rasul", dist: 6, el: 0.6, az: "behind", up: 3 }, ...SIRAH_H,
          narr: "Mereka berjalan ke selatan melewati Misfalah, bagian bawah kota. Jalan ke Madinah ada di utara; para pengejar tentu mengira mereka ke sana." },
        { cam: { at: [-35, -440], dist: 6, el: 0.24, az: 0.05, up: 4 }, ...S_("HR. Tirmidzi no. 3925 (Abdullah bin 'Adi); hasan shahih menurut Tirmidzi", "https://sunnah.com/tirmidhi:3925"),
          narr: "Ada hadits tentang Mekah yang sering dikaitkan dengan malam ini, walaupun hadits itu tidak menyebut kapan diucapkan:" },
        { ...S_("HR. Tirmidzi no. 3925 (Abdullah bin 'Adi)", "https://sunnah.com/tirmidhi:3925"), hold: 2500,
          say: { who: "rasul", text: "Demi Allah, engkau adalah bumi Allah yang terbaik dan yang paling dicintai Allah. Seandainya aku tidak diusir darimu, aku tidak akan keluar.", arab: "وَاللَّهِ إِنَّكِ لَخَيْرُ أَرْضِ اللَّهِ وَأَحَبُّ أَرْضِ اللَّهِ إِلَى اللَّهِ وَلَوْلَا أَنِّي أُخْرِجْتُ مِنْكِ مَا خَرَجْتُ" } },
        { rasul: { path: "keTsur", from: T_KOTA, to: 1, dur: 24000 }, chars: [{ id: "abubakar", path: "keTsurAB", from: T_KOTA, to: 1, dur: 24000 }],
          cam: { at: [1700, -2700], dist: 300, el: 1.0, az: 1.62, up: 0 }, ...SIRAH_H,
          narr: "Mereka menempuh sekitar lima mil di antara bukit-bukit batu menuju Jabal Tsur, berlawanan arah dengan Madinah di utara." }
      ] },
      { judul: "Mendaki Jabal Tsur", beats: [
        { rasul: { path: "naik", from: 0, to: 1, dur: 13000 }, chars: [{ id: "abubakar", path: "naikAB", from: 0, to: 1, dur: 13000, expr: "khawatir" }],
          cam: { follow: "rasul", dist: 7, el: 0.78, az: "behind", up: 3 }, ...SIRAH_H,
          narr: "Jalan ke puncak menanjak dan berbatu. Gua itu berada di dekat puncak Jabal Tsur." },
        { cam: CAM_TSUR, chars: [{ id: "abubakar", expr: "lembut" }], ...B3905,
          narr: "Mereka sampai di sebuah gua di Gunung Tsur dan bersembunyi di sana tiga malam." }
      ] }
    ],
    penutup: "Selama tiga malam di gua, Abdullah bin Abi Bakar membawa kabar dari Mekah dan Amir bin Fuhairah membawa susu. Tonton \"Tiga Malam di Gua Tsur\"."
  };

  // ---------- Tiga malam di Gua Tsur ----------
  window.TONTONAN["tiga-malam"] = {
    peta: true, malam: 1,
    judul: "Tiga Malam di Gua Tsur",
    tahun: 622,
    tanggal: TGL_HIJRAH([{ k: "Hadiah Quraisy", v: "Bukhari menyebut diyat bagi masing-masing tanpa angka; Ibnu Ishaq menyebut seratus unta untuk masing-masing.", s: "HR. Bukhari no. 3906; Sirah Ibnu Hisyam", url: "https://sunnah.com/bukhari:3906" }]),
    pengantar: PENGANTAR_H("HR. Bukhari no. 3905 dan 3906 serta Sirah Ibnu Hisyam"),
    tokoh: { abubakar: { nama: "Abu Bakar" }, abdullahabubakar: { nama: "Abdullah bin Abi Bakar" }, amirfuhairah: { nama: "Amir bin Fuhairah" },
      penyeru: { nama: "Penyeru Quraisy" }, quraisy1: { nama: "Orang Quraisy" }, abujahal: { nama: "Abu Jahal" }, asma: { nama: "Asma' binti Abu Bakar" }, abuquhafah: { nama: "Abu Quhafah" } },
    lampu: [[-222, -194], [2520, -4930]],
    paths: { naikAbdullah: geser(NAIK_T, -3, 4), turunAbdullah: geser(NAIK_T, -3, 4).slice().reverse() },
    babak: [
      { judul: "Malam pertama", beats: [
        { cam: CAM_TSUR, rasul: { at: GUA_T, state: "tenang" }, tanggal: true,
          chars: [{ id: "abubakar", at: [2543, -4956], expr: "khawatir", on: true }, { id: "abdullahabubakar", at: KAKI_T, expr: "tegas", on: true }], ...B3905,
          narr: "Rasulullah ﷺ dan Abu Bakar bersembunyi di gua di Jabal Tsur." },
        { chars: [{ id: "abdullahabubakar", path: "naikAbdullah", from: 0, to: 1, dur: 9000 }], cam: { follow: "abdullahabubakar", dist: 8, el: 0.5, az: "behind", up: 3 }, ...B3905,
          narr: "Ketika hari mulai gelap, Abdullah bin Abi Bakar, pemuda yang cerdas dan cepat paham, mendaki ke gua membawa setiap rencana Quraisy yang ia dengar." },
        { inside: { scene: "gua-tsur-luar", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 1080, y: 420, small: true, state: "tenang" },
            chars: [{ id: "abubakar", x: 900, y: 470, expr: "netral", on: true, s: 0.8 }, { id: "abdullahabubakar", x: 720, y: 540, expr: "tegas", on: true, s: 0.85 }],
            props: [{ id: "jejak", kind: "jejak", x: 300, y: 730, n: 9, ang: -28, s: 1.2, warna: "#6a5a6c" }] }, ...B3905,
          narr: "Abdullah bermalam bersama mereka, lalu turun sebelum fajar, sehingga pagi harinya ia sudah berada di tengah Quraisy seperti orang yang bermalam di Mekah." },
        { inside: { chars: [{ id: "abdullahabubakar", x: 230, y: 790, expr: "netral" }, { id: "amirfuhairah", x: 420, y: 660, expr: "senyum", on: true, s: 0.85 }],
            props: [{ id: "jejak", kind: "jejak", x: 300, y: 730, n: 9, ang: -28, s: 1.2, warna: "#6a5a6c" }, { id: "domba", kind: "domba", x: 620, y: 700, n: 5, s: 0.9, depan: true }] }, ...B3905,
          narr: "Amir bin Fuhairah, bekas budak yang dimerdekakan Abu Bakar, menggembalakan kambing di dekat gua. Ia membawanya kepada mereka selepas sebagian malam, sehingga keduanya bisa minum susu segar." },
        { inside: { chars: [{ id: "amirfuhairah", x: 180, y: 810 }], props: [{ id: "jejak", kind: "jejak", x: 300, y: 730, n: 9, ang: -28, s: 1.2, warna: "#6a5a6c", hapus: true }, { id: "domba", kind: "domba", x: 400, y: 790, n: 5, s: 0.9, dur: 4, depan: true }] },
          ...S_("Sirah Ibnu Hisyam (Ibnu Ishaq)", ""), hitung: "Jejak terhapus",
          narr: "Menurut kitab sirah, kambing-kambing itu sengaja digiring di atas jejak Abdullah sehingga jejaknya terhapus. Sebelum fajar, Amir menggiringnya pergi." }
      ] },
      { judul: "Sementara itu di Mekah", beats: [
        { inside: null, malam: 0, cam: { at: [20, -12], dist: 4.5, el: 0.4, az: 0.9, up: 3 },
          chars: [{ id: "abubakar", on: false }, { id: "abdullahabubakar", on: false }, { id: "penyeru", at: [24, -18], expr: "tegas", on: true }, { id: "quraisy1", at: [36, -6], expr: "kaget", on: true }], ...B3906,
          narr: "Di Mekah, Quraisy menjaga jalan-jalan dan mengirim utusan ke kabilah-kabilah, menjanjikan diyat bagi siapa pun yang membunuh atau menawan salah satu dari keduanya." },
        { hitung: "100 unta untuk masing-masing", ...S_("Sirah Ibnu Hisyam (Ibnu Ishaq); HR. Bukhari no. 3906 menyebut \"diyat\"", "https://sunnah.com/bukhari:3906"),
          say: { who: "penyeru", text: "Siapa yang membawa Muhammad atau Abu Bakar, hidup atau mati, baginya seratus ekor unta untuk masing-masing!" } },
        { cam: CAM_AB, chars: [{ id: "penyeru", on: false }, { id: "quraisy1", at: [-210, -184], expr: "tegas" }, { id: "abujahal", at: [-214, -182], expr: "sinis", on: true }, { id: "asma", at: [-221, -192], expr: "tegas", on: true }],
          ...S_("Sirah Ibnu Hisyam (Ibnu Ishaq, dari Asma')", ""), say: { who: "abujahal", text: "Di mana ayahmu, wahai putri Abu Bakar?" } },
        { ...S_("Sirah Ibnu Hisyam (Ibnu Ishaq, dari Asma')", ""), say: { who: "asma", text: "Demi Allah, aku tidak tahu di mana ayahku." } },
        { chars: [{ id: "abujahal", expr: "tegas" }, { id: "asma", expr: "sedih" }], ...S_("Sirah Ibnu Hisyam (Ibnu Ishaq, dari Asma')", ""),
          narr: "Abu Jahal marah dan menampar Asma', lalu pergi bersama rombongannya." },
        { inside: { scene: "rumah-abubakar", cam: { x: 800, y: 470, s: 1 },
            chars: [{ id: "abuquhafah", x: 620, y: 650, expr: "khawatir", on: true }, { id: "asma", x: 940, y: 650, expr: "lembut", on: true }] },
          chars: [{ id: "abujahal", on: false }, { id: "quraisy1", on: false }], ...S_("Sirah Ibnu Hisyam (Ibnu Ishaq, dari Asma')", ""),
          say: { who: "abuquhafah", text: "Demi Allah, kurasa ia telah membuat kalian susah dengan membawa seluruh hartanya." } },
        { inside: { chars: [{ id: "asma", x: 760, expr: "lembut" }, { id: "abuquhafah", expr: "lembut" }] }, ...S_("Sirah Ibnu Hisyam (Ibnu Ishaq, dari Asma')", ""),
          narr: "Kakek Asma' ini sudah buta dan belum masuk Islam. Asma' menaruh batu-batu di ceruk tempat ayahnya biasa menyimpan uang, menutupnya dengan kain, lalu menuntun tangan kakeknya untuk merabanya. Orang tua itu pun tenang." },
        { ...S_("Sirah Ibnu Hisyam (Ibnu Ishaq, dari Asma')", ""), narr: "Asma' berkata, sebenarnya ayahnya tidak meninggalkan apa pun; ia hanya ingin menenangkan kakeknya." }
      ] },
      { judul: "Malam kedua dan ketiga", beats: [
        { inside: { scene: "gua-tsur-luar", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 1080, y: 420, small: true, state: "tenang" },
            chars: [{ id: "abubakar", x: 900, y: 470, expr: "netral", on: true, s: 0.8 }, { id: "abdullahabubakar", x: 720, y: 540, expr: "tegas", on: true, s: 0.85 }],
            props: [{ id: "jejak", kind: "jejak", x: 300, y: 730, n: 9, ang: -28, s: 1.2, warna: "#6a5a6c" }] },
          malam: 1, ...B3905, narr: "Malam berikutnya Abdullah datang lagi membawa kabar, dan Amir kembali membawa kambing-kambingnya." },
        { inside: { chars: [{ id: "abdullahabubakar", x: 230, y: 790 }, { id: "amirfuhairah", x: 180, y: 810, on: true, s: 0.85 }],
            props: [{ id: "jejak", kind: "jejak", x: 300, y: 730, n: 9, ang: -28, s: 1.2, warna: "#6a5a6c", hapus: true }, { id: "domba", kind: "domba", x: 400, y: 790, n: 5, s: 0.9, depan: true }] },
          hitung: "Malam ketiga", ...B3905, narr: "Begitu pula malam ketiga. Para pencari tidak menemukan jejak mereka." },
        { inside: { chars: [{ id: "abdullahabubakar", on: false }, { id: "amirfuhairah", x: 640, y: 620 }], props: [{ id: "domba", kind: "domba", x: 480, y: 690, n: 5, s: 0.9, depan: true }] }, ...B3905,
          narr: "Pada pagi hari ketiga, pemandu yang telah mereka sewa datang membawa dua unta, sesuai janji." }
      ] }
    ],
    penutup: "Rombongan berangkat lewat jalan pantai. Tonton \"Berangkat Lewat Jalan Pantai\"."
  };

  // ---------- "Jangan bersedih, Allah bersama kita" ----------
  const QURAISY4 = { nama: "Pencari jejak" };
  window.TONTONAN["laa-tahzan"] = {
    peta: false, malam: 0,
    judul: "\"Jangan Bersedih, Allah Bersama Kita\"",
    tahun: 622,
    tanggal: TGL_HIJRAH([{ k: "Turunnya ayat", v: "Surah At-Taubah turun sekitar 9 H; ayat 40 mengenang peristiwa di gua ini.", s: "Catatan penyusun" }]),
    pengantar: PENGANTAR("HR. Bukhari no. 3653 dan QS. At-Taubah: 40") + " Kisah laba-laba dan merpati ditampilkan dengan label riwayat lemah.",
    tokoh: { abubakar: { nama: "Abu Bakar" }, quraisy1: { nama: "Pemuda Quraisy" }, quraisy2: { nama: "Pemuda Quraisy" }, quraisy3: { nama: "Pemuda Quraisy" }, pencari: QURAISY4 },
    lampu: [], paths: {},
    babak: [
      { judul: "Para pengejar di atas gua", beats: [
        { inside: { scene: "gua-tsur", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 690, y: 680, small: true, state: "tenang" },
            chars: [{ id: "abubakar", x: 930, y: 640, expr: "khawatir", on: true, s: 0.7 },
              { id: "pencari", x: 1700, y: 250, expr: "tegas", on: true, s: 0.42 }, { id: "quraisy1", x: 1820, y: 262, expr: "tegas", on: true, s: 0.42 }, { id: "quraisy2", x: 1930, y: 272, expr: "tegas", on: true, s: 0.42 }] },
          tanggal: true, ...B3653, narr: "Para pencari jejak Quraisy mengikuti tanda-tanda sampai ke Jabal Tsur." },
        { inside: { chars: [{ id: "pencari", x: 760, y: 236 }, { id: "quraisy1", x: 900, y: 238 }, { id: "quraisy2", x: 1040, y: 250 }] }, ...B3653,
          narr: "Mereka sampai tepat di atas gua. Dari dalam, Abu Bakar melihat kaki-kaki mereka." },
        { inside: { chars: [{ id: "abubakar", expr: "khawatir" }] }, ...B3653,
          say: { who: "abubakar", text: "Wahai Rasulullah, seandainya salah seorang dari mereka melihat ke bawah kakinya, tentu ia akan melihat kita.", arab: "لَوْ أَنَّ أَحَدَهُمْ نَظَرَ تَحْتَ قَدَمَيْهِ لَأَبْصَرَنَا" } },
        { ...B3653, hold: 1500, say: { who: "rasul", text: "Apa pendapatmu, wahai Abu Bakar, tentang dua orang yang Allah adalah yang ketiganya?", arab: "مَا ظَنُّكَ يَا أَبَا بَكْرٍ بِاثْنَيْنِ اللَّهُ ثَالِثُهُمَا" } },
        { inside: { chars: [{ id: "abubakar", expr: "lembut" }], labels: [LBL("Sakinah", "سكينة", 800, 560, "ketenangan dari Allah")] }, ...S_("QS. At-Taubah: 40 (turun sekitar 9 H)", ""), hold: 4500,
          say: { who: "quran", ayat: "QS. At-Taubah: 40", arab: "إِذْ هُمَا فِي الْغَارِ إِذْ يَقُولُ لِصَاحِبِهِ لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا ۖ فَأَنزَلَ اللَّهُ سَكِينَتَهُ عَلَيْهِ",
            text: "…ketika keduanya berada di dalam gua, ketika ia berkata kepada sahabatnya, \"Jangan bersedih, sesungguhnya Allah bersama kita.\" Lalu Allah menurunkan ketenangan kepadanya…" } },
        { inside: { labels: [], chars: [{ id: "pencari", x: -200, y: 300, on: false }, { id: "quraisy1", x: -120, y: 320, on: false }, { id: "quraisy2", x: -60, y: 340, on: false }] }, ...B3653,
          narr: "Para pengejar berbalik tanpa menemukan mereka. Allah melindungi keduanya dengan cara yang tidak terlihat." }
      ] },
      { judul: "Kisah yang masyhur", beats: [
        { inside: { scene: "gua-tsur-kisah", cam: { x: 800, y: 470, s: 1 } },
          ...LEMAH("HR. Ahmad no. 3251 (Ibnu Abbas); sanadnya diperselisihkan", "https://hadithunlocked.com/ahmad:3251"),
          narr: "Ada riwayat bahwa para pengejar melihat sarang laba-laba di mulut gua dan berkata, \"Seandainya ia masuk ke sini, tentu tidak ada sarang laba-laba di mulutnya.\" Sanadnya dinilai hasan oleh Ibnu Hajar dan Ibnu Katsir, tetapi lemah menurut Al-Albani." },
        { ...LEMAH("Al-Bazzar dan Ath-Thabarani; Majma' Az-Zawa'id", "https://islamqa.info/en/answers/27224"),
          narr: "Kisah sebatang pohon dan sepasang merpati di depan gua lebih lemah lagi, karena sebagian perawinya tidak dikenal." },
        { inside: { scene: "gua-tsur-pasti", cam: { x: 800, y: 470, s: 1 } }, ...S_("QS. At-Taubah: 40; HR. Bukhari no. 3653", "https://sunnah.com/bukhari:3653"),
          narr: "Yang pasti menurut Al-Qur'an dan hadits shahih: keduanya bersembunyi di gua, para pengejar sampai sangat dekat, dan Allah melindungi mereka. Kisah-kisah tadi boleh diceritakan dengan menyebut derajatnya." }
      ] }
    ],
    penutup: "Setelah tiga malam, rombongan melanjutkan perjalanan ke Madinah lewat jalan pantai."
  };

  // ---------- Berangkat lewat jalan pantai ----------
  window.TONTONAN["berangkat-pantai"] = {
    peta: false, malam: 0,
    judul: "Berangkat Lewat Jalan Pantai",
    tahun: 622,
    tanggal: { judul: "1 Rabi'ul Awwal 1 H (±16 September 622 M)", rinci: [
      { k: "Keberangkatan", v: "Pagi hari ketiga menurut Bukhari; malam Senin 1 Rabi'ul Awwal 1 H menurut Ar-Rahiq. Padanan Masehi perkiraan.", s: "HR. Bukhari no. 3905; Ar-Rahiq Al-Makhtum", url: "https://sunnah.com/bukhari:3905" },
      { k: "Pemandu", v: "Seorang lelaki dari Bani Ad-Dil yang masih memeluk agama Quraisy. Kitab sirah menyebut namanya Abdullah bin Uraiqith.", s: "HR. Bukhari no. 2263", url: "https://sunnah.com/bukhari:2263" }] },
    pengantar: PENGANTAR("HR. Bukhari no. 2263, 3905, 3615, dan 3911"),
    tokoh: { abubakar: { nama: "Abu Bakar" }, amirfuhairah: { nama: "Amir bin Fuhairah" }, uraiqith: { nama: "Abdullah bin Uraiqith (pemandu)" }, penggembala: { nama: "Penggembala" }, pejalan: { nama: "Seorang kenalan" } },
    lampu: [], paths: {},
    babak: [
      { judul: "Pemandu datang", beats: [
        { inside: { scene: "kaki-tsur", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 1010, y: 560, small: true, state: "tenang" },
            chars: [{ id: "abubakar", x: 1130, y: 600, expr: "netral", on: true, s: 0.75 }, { id: "uraiqith", x: -120, y: 700, expr: "netral", on: true, s: 0.85 }],
            props: [{ id: "unta1", kind: "unta", x: -300, y: 760, s: 0.9 }, { id: "unta2", kind: "unta", x: -520, y: 770, s: 0.85, pelana: "#7a3a4a" }] },
          tanggal: true, ...B2263, narr: "Keduanya telah menyewa seorang penunjuk jalan yang mahir dari Bani Ad-Dil. Ia masih memeluk agama Quraisy, tetapi keduanya memercayainya dan menitipkan unta kepadanya." },
        { inside: { chars: [{ id: "uraiqith", x: 560, y: 700 }], props: [{ id: "unta1", kind: "unta", x: 380, y: 760, s: 0.9, dur: 3 }, { id: "unta2", kind: "unta", x: 190, y: 770, s: 0.85, pelana: "#7a3a4a", dur: 3 }] },
          ...B3905, narr: "Sesuai janji, pada pagi hari ketiga ia datang membawa kedua unta itu ke Gua Tsur." },
        { inside: { rasul: { x: 760, y: 640 }, chars: [{ id: "abubakar", x: 900, y: 680 }, { id: "amirfuhairah", x: 1060, y: 690, expr: "senyum", on: true, s: 0.85 }] }, ...B3905,
          narr: "Berangkatlah mereka berempat: Rasulullah ﷺ, Abu Bakar, Amir bin Fuhairah, dan sang pemandu. Ia membawa mereka lewat bagian bawah Mekah, lalu menyusuri jalan pantai." }
      ] },
      { judul: "Naungan batu di tengah hari", beats: [
        { inside: { scene: "batu-naungan", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 840, y: 690, small: true, state: "tenang" },
            chars: [{ id: "abubakar", x: 1080, y: 700, expr: "netral", on: true, s: 0.8 }, { id: "penggembala", x: 1800, y: 700, expr: "netral", on: true, s: 0.75 }],
            props: [{ id: "tikar", kind: "tikar", x: 860, y: 760, s: 1.1 }, { id: "domba", kind: "domba", x: 1900, y: 720, n: 5, s: 0.8 }] }, ...B3615,
          narr: "Abu Bakar bercerita: mereka berjalan semalaman dan siangnya sampai tengah hari, ketika jalan sepi. Tampak sebuah batu tinggi yang masih menyisakan naungan. Abu Bakar meratakan tanah, menghamparkan alas, dan mempersilakan Rasulullah ﷺ beristirahat." },
        { inside: { chars: [{ id: "penggembala", x: 1330 }], props: [{ id: "tikar", kind: "tikar", x: 860, y: 760, s: 1.1 }, { id: "domba", kind: "domba", x: 1440, y: 720, n: 5, s: 0.8, dur: 3 }] }, ...B3615,
          say: { who: "abubakar", text: "Milik siapa engkau, wahai anak muda?", arab: "لِمَنْ أَنْتَ يَا غُلَامُ" } },
        { ...B3615, say: { who: "penggembala", text: "Milik seorang lelaki Quraisy.", arab: "لِرَجُلٍ مِنْ قُرَيْشٍ" } },
        { inside: { props: [{ id: "tikar", kind: "tikar", x: 860, y: 760, s: 1.1 }, { id: "domba", kind: "domba", x: 1440, y: 720, n: 5, s: 0.8 }, { id: "bejana", kind: "bejana", x: 980, y: 790, isi: 0.9, depan: true }] }, ...B3615,
          narr: "Abu Bakar meminta susu, menyuruhnya membersihkan ambing kambing dari debu, lalu mendinginkan susu itu dengan air. Ketika Rasulullah ﷺ bangun, beliau minum sampai Abu Bakar merasa senang." },
        { ...B3615, say: { who: "rasul", text: "Bukankah sudah tiba waktunya untuk berangkat?", arab: "أَلَمْ يَأْنِ لِلرَّحِيلِ" } }
      ] },
      { judul: "\"Ia menunjukiku jalan\"", beats: [
        { inside: { scene: "pesisir", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 620, y: 640, small: true, state: "tenang" },
            chars: [{ id: "abubakar", x: 760, y: 680, expr: "netral", on: true, s: 0.8 }, { id: "pejalan", x: 1120, y: 690, expr: "kagum", on: true, s: 0.8 }],
            props: [{ id: "unta1", kind: "unta", x: 360, y: 740, s: 0.85 }] }, ...B3911,
          narr: "Di sepanjang jalan, orang yang mengenal Abu Bakar bertanya siapa lelaki yang bersamanya." },
        { ...B3911, say: { who: "abubakar", text: "Lelaki ini menunjukiku jalan.", arab: "هَذَا الرَّجُلُ يَهْدِينِي السَّبِيلَ" } },
        { inside: { chars: [{ id: "pejalan", expr: "senyum" }] }, ...B3911,
          narr: "Orang mengira yang dimaksud jalan biasa, padahal maksud Abu Bakar adalah jalan kebaikan." }
      ] }
    ],
    penutup: "Di jalan pantai ini, Suraqah bin Malik kemudian memacu kudanya mengejar rombongan. Tonton \"Suraqah Mengejar\"."
  };

  // ---------- Suraqah bin Malik mengejar ----------
  window.TONTONAN["suraqah"] = {
    peta: false, malam: 0,
    judul: "Suraqah Mengejar",
    tahun: 622,
    tanggal: { judul: "Awal Rabi'ul Awwal 1 H (±September 622 M)", rinci: [
      { k: "Waktu", v: "Tidak disebut dalam hadits. Bukhari no. 3615 mengisahkannya setelah istirahat siang; Ar-Rahiq mengutip kemungkinan hari ketiga perjalanan.", s: "HR. Bukhari no. 3615; Ar-Rahiq Al-Makhtum", url: "https://sunnah.com/bukhari:3615" },
      { k: "Tempat", v: "Pesisir di wilayah Bani Mudlij, dekat Qudaid. Titik ini perkiraan.", s: "HR. Bukhari no. 3906", url: "https://sunnah.com/bukhari:3906" }] },
    pengantar: PENGANTAR("HR. Bukhari no. 3906, 3615, dan 3911") + " Kisah gelang Kisra tidak ada dalam riwayat Bukhari dan tidak ditampilkan.",
    tokoh: { abubakar: { nama: "Abu Bakar" }, amirfuhairah: { nama: "Amir bin Fuhairah" }, uraiqith: { nama: "Pemandu" }, suraqah: { nama: "Suraqah bin Malik" }, mudlij: { nama: "Seorang dari Bani Mudlij" } },
    lampu: [], paths: {},
    babak: [
      { judul: "Kabar di majelis Bani Mudlij", beats: [
        { inside: { scene: "kemah-badui", label: "Perkampungan Bani Mudlij, dekat Qudaid (perkiraan)", cam: { x: 800, y: 470, s: 1 },
            chars: [{ id: "suraqah", x: 760, y: 660, expr: "netral", on: true }, { id: "mudlij", x: 480, y: 670, expr: "kaget", on: true }] }, tanggal: true, ...B3906,
          say: { who: "mudlij", text: "Wahai Suraqah, tadi aku melihat beberapa sosok di pantai. Kurasa itu Muhammad dan sahabat-sahabatnya.", arab: "إِنِّي قَدْ رَأَيْتُ آنِفًا أَسْوِدَةً بِالسَّاحِلِ أُرَاهَا مُحَمَّدًا وَأَصْحَابَهُ" } },
        { inside: { chars: [{ id: "suraqah", expr: "sinis" }] }, ...B3906,
          say: { who: "suraqah", text: "Itu bukan mereka. Engkau melihat si Fulan dan si Fulan yang berangkat di depan mata kita.", arab: "إِنَّهُمْ لَيْسُوا بِهِمْ" } },
        { ...B3906, narr: "Suraqah tahu itu benar, tetapi ia ingin hadiah Quraisy untuk dirinya sendiri. Diam-diam ia menyuruh budaknya membawa kuda ke balik bukit kecil, lalu keluar lewat belakang rumah dengan ujung tombak direndahkan agar tidak terlihat." }
      ] },
      { judul: "Pengejaran di pesisir", beats: [
        { inside: { scene: "pesisir", label: null, cam: { x: 800, y: 470, s: 1 }, rasul: { x: 470, y: 640, small: true, state: "tenang" },
            chars: [{ id: "abubakar", x: 600, y: 680, expr: "netral", on: true, s: 0.75 }, { id: "amirfuhairah", x: 330, y: 690, expr: "netral", on: true, s: 0.75 }, { id: "uraiqith", x: 210, y: 690, expr: "netral", on: true, s: 0.75 },
              { id: "suraqah", x: 1820, y: 500, expr: "tegas", on: true, s: 0.7 }],
            props: [{ id: "unta1", kind: "unta", x: 130, y: 740, s: 0.75 }, { id: "kuda", kind: "kuda", x: 1830, y: 700, s: 0.9, flip: true }] }, ...B3906,
          narr: "Ia memacu kudanya. Kudanya tersandung dan ia terjatuh. Menurut kebiasaan jahiliyah ia mengundi dengan anak panah, dan hasilnya tidak sesuai keinginannya, tetapi ia tetap melanjutkan." },
        { inside: { chars: [{ id: "suraqah", x: 1180, y: 500 }], props: [{ id: "unta1", kind: "unta", x: 130, y: 740, s: 0.75 }, { id: "kuda", kind: "kuda", x: 1190, y: 700, s: 0.9, flip: true, dur: 3 }] }, ...B3906,
          narr: "Ia makin dekat, sampai mendengar bacaan Al-Qur'an Rasulullah ﷺ. Beliau tidak menoleh, sedangkan Abu Bakar sering menoleh ke belakang." },
        { inside: { chars: [{ id: "abubakar", expr: "khawatir" }] }, ...B3615,
          say: { who: "abubakar", text: "Para pengejar telah menyusul kita, wahai Rasulullah.", arab: "هَذَا الطَّلَبُ قَدْ لَحِقَنَا يَا رَسُولَ اللَّهِ" } },
        { ...B3615, say: { who: "rasul", text: "Jangan bersedih, sesungguhnya Allah bersama kita.", arab: "لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا" } },
        { inside: { chars: [{ id: "suraqah", x: 1120, y: 640, expr: "kaget" }, { id: "abubakar", expr: "kagum" }], props: [{ id: "unta1", kind: "unta", x: 130, y: 740, s: 0.75 }, { id: "kuda", kind: "kuda", x: 1190, y: 700, s: 0.9, flip: true, terbenam: true }] },
          hitung: "Kaki kuda terbenam", ...B3906, narr: "Tiba-tiba kaki depan kudanya terbenam ke tanah sampai ke lutut, dan Suraqah jatuh. Ketika kuda itu menarik kakinya keluar, debu membubung seperti asap." }
      ] },
      { judul: "Surat jaminan keamanan", beats: [
        { inside: { chars: [{ id: "suraqah", x: 980, y: 680, expr: "khawatir" }] }, ...B3615,
          say: { who: "suraqah", text: "Aku tahu kalian telah mendoakan keburukan atasku. Doakanlah kebaikan untukku. Demi Allah, aku akan menghalau para pencari dari kalian." } },
        { ...B3615, narr: "Rasulullah ﷺ mendoakannya, dan kudanya terlepas. Suraqah menceritakan hadiah yang dijanjikan Quraisy dan menawarkan bekal, tetapi mereka tidak mengambil apa pun." },
        { ...B3906, say: { who: "rasul", text: "Rahasiakan tentang kami.", arab: "أَخْفِ عَنَّا" } },
        { inside: { chars: [{ id: "amirfuhairah", x: 800, y: 690, expr: "senyum" }], props: [{ id: "unta1", kind: "unta", x: 130, y: 740, s: 0.75 }, { id: "kuda", kind: "kuda", x: 1240, y: 700, s: 0.9, flip: true }, { id: "surat", kind: "surat", x: 930, y: 600, s: 0.9, depan: true }] },
          hitung: "Surat jaminan keamanan", ...B3906, narr: "Suraqah meminta surat jaminan keamanan. Rasulullah ﷺ menyuruh Amir bin Fuhairah, dan ia menuliskannya pada sepotong kulit." },
        { inside: { chars: [{ id: "suraqah", x: 1750, y: 500, expr: "senyum" }], props: [{ id: "unta1", kind: "unta", x: 130, y: 740, s: 0.75 }, { id: "kuda", kind: "kuda", x: 1760, y: 700, s: 0.9, flip: false, dur: 3 }] }, ...B3911,
          narr: "Suraqah menepati janjinya: setiap pencari yang ia temui ia suruh pulang. Anas berkata, di awal hari ia memburu Nabi ﷺ, dan di akhir hari ia menjadi pelindung beliau." },
        { ...S_("Ibnu Hajar, Al-Mathalib Al-'Aliyah no. 2040; sanadnya dinilai shahih", "https://en.tohed.com/hadith/matalib-al-aliyah/2040/"),
          narr: "Delapan tahun kemudian, di Ji'ranah sepulang dari Thaif, Suraqah datang membawa surat itu. Rasulullah ﷺ menyambutnya, dan ia masuk Islam." }
      ] }
    ],
    penutup: "Kisah yang terkenal tentang janji gelang Kisra kepada Suraqah tidak terdapat dalam riwayat Bukhari, dan riwayat lain tentangnya lemah."
  };

  // ---------- Kemah Ummu Ma'bad (riwayat diperselisihkan) ----------
  const UM = LEMAH("Al-Hakim, Al-Mustadrak; Ibnu Sa'd, Ath-Thabaqat (diperselisihkan)", "https://shamela.ws/book/23708/883");
  window.TONTONAN["ummu-mabad"] = {
    peta: false, malam: 0,
    judul: "Kemah Ummu Ma'bad",
    tahun: 622,
    tanggal: { judul: "Awal Rabi'ul Awwal 1 H (±September 622 M)", rinci: [
      { k: "Derajat", v: "Diperselisihkan. Tiap sanadnya dipersoalkan, tetapi Ibnu Katsir menyebutnya masyhur dengan jalur-jalur yang saling menguatkan.", s: "Ibnu Katsir, Al-Bidayah wan Nihayah 3/190", url: "https://shamela.ws/book/23708/883" },
      { k: "Tempat", v: "Qudaid, menurut sebagian kitab sirah. Titik ini perkiraan.", s: "Kitab sirah" }] },
    pengantar: "Riwayat ini derajatnya diperselisihkan (lemah menurut sebagian ulama), jadi ditampilkan dengan label. Rasulullah ﷺ tidak digambarkan; dalam riwayat ini Ummu Ma'bad menggambarkan rupa beliau, dan bagian itu sengaja tidak ditampilkan. Perlu diverifikasi ustadz.",
    tokoh: { abubakar: { nama: "Abu Bakar" }, amirfuhairah: { nama: "Amir bin Fuhairah" }, uraiqith: { nama: "Pemandu" }, ummumabad: { nama: "Ummu Ma'bad" }, abumabad: { nama: "Abu Ma'bad" } },
    lampu: [], paths: {},
    babak: [
      { judul: "Singgah di kemah", beats: [
        { inside: { scene: "kemah-badui", label: "Kemah Ummu Ma'bad, Qudaid (riwayat diperselisihkan)", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 560, y: 610, small: true, state: "tenang" },
            chars: [{ id: "ummumabad", x: 1100, y: 670, expr: "netral", on: true, s: 0.9 }, { id: "abubakar", x: 700, y: 680, expr: "netral", on: true, s: 0.75 }, { id: "amirfuhairah", x: 380, y: 690, expr: "netral", on: true, s: 0.7 }, { id: "uraiqith", x: 250, y: 690, expr: "netral", on: true, s: 0.7 }],
            props: [{ id: "lencana", kind: "lencana", x: 800, y: 120, teks: "Riwayat diperselisihkan", w: 340 }, { id: "kambing", kind: "kambing", x: 1390, y: 720, s: 0.9, kurus: true }, { id: "bejana", kind: "bejana", x: 930, y: 790, isi: 0, depan: true }] },
          tanggal: true, ...UM,
          narr: "Rombongan melewati kemah Ummu Ma'bad dari Khuza'ah, perempuan yang biasa memberi makan dan minum musafir di depan kemahnya. Mereka ingin membeli daging atau kurma." },
        { inside: { chars: [{ id: "ummumabad", expr: "sedih" }] }, ...UM, say: { who: "ummumabad", text: "Seandainya kami punya sesuatu, kalian tidak akan kekurangan jamuan. Musim sedang kering." } },
        { ...UM, say: { who: "rasul", text: "Kambing apa ini, wahai Ummu Ma'bad?" } },
        { ...UM, say: { who: "ummumabad", text: "Kambing yang tertinggal dari kawanan karena terlalu lemah." } },
        { ...UM, say: { who: "rasul", text: "Bolehkah aku memerahnya?" } },
        { inside: { chars: [{ id: "ummumabad", expr: "netral" }] }, ...UM, say: { who: "ummumabad", text: "Silakan, jika engkau melihat ada susunya." } },
        { inside: { chars: [{ id: "ummumabad", expr: "kaget" }, { id: "abubakar", expr: "kagum" }], props: [{ id: "lencana", kind: "lencana", x: 800, y: 120, teks: "Riwayat diperselisihkan", w: 340 }, { id: "kambing", kind: "kambing", x: 1390, y: 720, s: 0.9, kurus: true }, { id: "bejana", kind: "bejana", x: 930, y: 790, isi: 1, depan: true }] },
          ...UM, narr: "Beliau mengusap ambingnya, menyebut nama Allah, dan berdoa. Kambing itu pun mengeluarkan susu yang banyak. Semua minum sampai puas, lalu beliau memerah lagi dan meninggalkan satu bejana penuh untuk tuan rumah." }
      ] },
      { judul: "Abu Ma'bad pulang", beats: [
        { inside: { rasul: { x: -320, y: 610 }, chars: [{ id: "abubakar", x: -200, on: false }, { id: "amirfuhairah", x: -300, on: false }, { id: "uraiqith", x: -400, on: false }, { id: "abumabad", x: 640, y: 680, expr: "kaget", on: true, s: 0.85 }] },
          ...UM, say: { who: "abumabad", text: "Dari mana susu ini, wahai Ummu Ma'bad? Kambing-kambing kita jauh di padang dan tidak ada yang bisa diperah." } },
        { inside: { chars: [{ id: "ummumabad", expr: "senyum" }] }, ...UM, say: { who: "ummumabad", text: "Tadi lewat seorang lelaki yang penuh berkah." } },
        { inside: { chars: [{ id: "abumabad", expr: "kagum" }] }, ...UM, say: { who: "abumabad", text: "Demi Allah, inilah orang Quraisy yang sedang dicari-cari itu." } },
        { ...UM, narr: "Dalam riwayat ini Ummu Ma'bad juga menggambarkan rupa Rasulullah ﷺ kepada suaminya. Aplikasi ini sengaja tidak menampilkan gambaran fisik beliau." }
      ] }
    ],
    penutup: "Kisah Ummu Ma'bad masyhur dalam kitab sirah, tetapi derajat sanadnya diperselisihkan. Mohon diverifikasi sebelum diceritakan."
  };
  // =====================================================================
  // ---------- Hijrah di Madinah (peta 3D kota Madinah, kota: "madinah") ----------
  // Posisi dalam meter dari Raudhah Masjid Nabawi (e = timur, n = utara). Jalur rombongan dan letak kerumunan adalah perkiraan.
  const B428 = S_("HR. Bukhari no. 428 (Anas)", "https://sunnah.com/bukhari:428");
  const B3925 = S_("HR. Bukhari no. 3925 (Al-Bara' bin 'Azib)", "https://sunnah.com/bukhari:3925");
  const B446 = S_("HR. Bukhari no. 446 (Ibnu Umar)", "https://sunnah.com/bukhari:446");
  const B447 = S_("HR. Bukhari no. 447 (Abu Sa'id Al-Khudri)", "https://sunnah.com/bukhari:447");
  const M2053 = S_("HR. Muslim no. 2053c (Abu Ayyub)", "https://sunnah.com/muslim:2053c");
  const IH = S_("Sirah Ibnu Hisyam (Ibnu Ishaq)", "");
  const RAHIQ = S_("Ar-Rahiq Al-Makhtum (kitab sirah)", "https://usul.ai/t/the-sealed-nectar-with-additions/110");
  const KULTSUM = [660, -3165], QUBA = [610, -3110], JUMUAH = [419, -2410], MIRBAD = [-6, 14], R_ABUAYYUB = [35, -60];
  const TIBA = [[-2950, -4500], [-2600, -4300], [-2250, -3700], [-2000, -3350], [-1700, -3250], [-1000, -3220], [-300, -3190], [300, -3170], [640, -3168]];
  const T_TEPI = frac(TIBA, 4);                                    // tepi harrah, tempat kaum Anshar menyambut
  const KE_JUMUAH = [[650, -3160], [610, -3080], [560, -2900], [470, -2620], [425, -2425]];
  const KE_KOTA = [[425, -2425], [380, -2350], [150, -1700], [-60, -1100], [-250, -500], [-380, -50], [-380, 250], [-220, 140], [-80, 60], [-20, 30], MIRBAD];
  const K1 = frac(KE_KOTA, 3), K2 = frac(KE_KOTA, 6), K3 = frac(KE_KOTA, 7);
  const PENGANTAR_M = (r) => PENGANTAR(r) + " Jalur rombongan dan letak kerumunan di peta Madinah adalah perkiraan.";
  const TGL_QUBA = (extra = []) => ({
    judul: "Rabi'ul Awwal 1 H (±September 622 M)",
    rinci: [
      { k: "Tiba di Quba", v: "Senin, 8 Rabi'ul Awwal 1 H (±23 September 622 M) menurut Ar-Rahiq; Senin 12 Rabi'ul Awwal menurut Ibnu Ishaq. Bukhari hanya menyebut hari Senin di bulan Rabi'ul Awwal.", s: "HR. Bukhari no. 3906; Ar-Rahiq Al-Makhtum", url: "https://sunnah.com/bukhari:3906" },
      { k: "Lama di Quba", v: "Empat hari (Ibnu Ishaq), lebih dari sepuluh malam (Bukhari 3906), atau empat belas malam (Anas, Bukhari 428).", s: "HR. Bukhari no. 3906 dan 428", url: "https://sunnah.com/bukhari:428" },
      ...extra
    ]
  });
  const ANSHAR = { anshar1: { nama: "Orang Anshar" }, anshar2: { nama: "Orang Anshar" }, anshar3: { nama: "Orang Anshar" } };

  // ---------- Penantian di harrah dan tiba di Quba ----------
  window.TONTONAN["tiba-quba"] = {
    kota: "madinah", peta: true, malam: 0,
    judul: "Tiba di Quba",
    tahun: 622,
    tanggal: TGL_QUBA(),
    pengantar: PENGANTAR_M("HR. Bukhari no. 3906 dan Sirah Ibnu Hisyam"),
    tokoh: { abubakar: { nama: "Abu Bakar" }, amirfuhairah: { nama: "Amir bin Fuhairah" }, ...ANSHAR, yahudi: { nama: "Seorang Yahudi" }, kultsum: { nama: "Kultsum bin Al-Hidm" } },
    lampu: [], paths: { tiba: TIBA, tibaAB: geser(TIBA, 5, -4), tibaAmir: geser(TIBA, -5, 4),
      pulang1: [[-2080, -3180], [-1600, -3200]], pulang2: [[-2055, -3205], [-1580, -3225]], pulang3: [[-2105, -3230], [-1620, -3250]],
      sambut1: [[-1600, -3200], [-1710, -3240]], sambut2: [[-1580, -3225], [-1700, -3262]], sambut3: [[-1620, -3250], [-1720, -3270]],
      iring1: [[-1710, -3240], [-1000, -3210], [-300, -3180], [300, -3160], [628, -3150]], iring2: [[-1700, -3262], [-1000, -3232], [-300, -3200], [300, -3180], [630, -3182]] },
    babak: [
      { judul: "Menanti di tepi harrah", beats: [
        { cam: { at: [-2080, -3205], dist: 4.5, el: 0.42, az: 2.3, up: 1.5 }, rasul: { at: TIBA[0], state: "tenang" }, tanggal: true,
          chars: [{ id: "anshar1", at: [-2080, -3180], expr: "netral", on: true }, { id: "anshar2", at: [-2055, -3205], expr: "netral", on: true }, { id: "anshar3", at: [-2105, -3230], expr: "khawatir", on: true },
            { id: "yahudi", at: [-1740, -3060], expr: "netral", on: true }, { id: "abubakar", at: TIBA[0], on: true }, { id: "amirfuhairah", at: TIBA[0], on: true }, { id: "kultsum", at: [690, -3170], expr: "senyum", on: true }],
          ...B3906, narr: "Kaum muslimin Madinah sudah mendengar Rasulullah ﷺ keluar dari Mekah. Setiap pagi mereka pergi ke harrah, padang batu hitam di tepi kota, dan menunggu beliau." },
        { chars: [{ id: "anshar1", path: "pulang1", from: 0, to: 1, dur: 6000, expr: "sedih" }, { id: "anshar2", path: "pulang2", from: 0, to: 1, dur: 6500, expr: "netral" }, { id: "anshar3", path: "pulang3", from: 0, to: 1, dur: 6000, expr: "sedih" }],
          cam: { at: [-1850, -3210], dist: 14, el: 0.6, az: 2.3, up: 1 }, ...B3906,
          narr: "Mereka menunggu sampai panas tengah hari memaksa mereka pulang. Suatu hari, setelah lama menunggu, mereka baru saja kembali ke rumah." },
        { cam: { at: [-1745, -3068], dist: 3.5, el: 0.4, az: 2.6, up: 1.5 }, chars: [{ id: "yahudi", expr: "kaget" }], ...B3906,
          narr: "Seorang Yahudi naik ke atas salah satu bentengnya untuk suatu keperluan. Ia melihat rombongan berpakaian putih muncul dari balik fatamorgana." },
        { ...B3906, say: { who: "yahudi", text: "Wahai orang-orang Arab, inilah orang besar kalian yang kalian tunggu!", arab: "يَا مَعَاشِرَ الْعَرَبِ، هَذَا جَدُّكُمُ الَّذِي تَنْتَظِرُونَ" } }
      ] },
      { judul: "Penyambutan", beats: [
        { rasul: { path: "tiba", from: 0, to: T_TEPI, dur: 12000 }, chars: [{ id: "abubakar", path: "tibaAB", from: 0, to: T_TEPI, dur: 12000 }, { id: "amirfuhairah", path: "tibaAmir", from: 0, to: T_TEPI, dur: 12000 },
            { id: "anshar1", path: "sambut1", from: 0, to: 1, dur: 7000, expr: "senyum" }, { id: "anshar2", path: "sambut2", from: 0, to: 1, dur: 7500, expr: "kagum" }, { id: "anshar3", path: "sambut3", from: 0, to: 1, dur: 7000, expr: "senyum" }],
          cam: { at: [-1640, -3215], dist: 34, el: 0.8, az: 2.0, up: 0 }, ...B3906,
          narr: "Kaum muslimin bergegas mengambil senjata dan keluar menyambut Rasulullah ﷺ di tepi harrah." },
        { rasul: { path: "tiba", from: T_TEPI, to: 1, dur: 16000 }, chars: [{ id: "abubakar", path: "tibaAB", from: T_TEPI, to: 1, dur: 16000 }, { id: "amirfuhairah", path: "tibaAmir", from: T_TEPI, to: 1, dur: 16000 },
            { id: "anshar1", path: "iring1", from: 0, to: 1, dur: 16000 }, { id: "anshar2", path: "iring2", from: 0, to: 1, dur: 16000 }, { id: "anshar3", on: false }, { id: "yahudi", on: false }],
          cam: { at: [-520, -3260], dist: 165, el: 1.0, az: 0.05, up: 0 }, ...B3906,
          narr: "Beliau berbelok ke kanan bersama mereka, lalu singgah di perkampungan Bani Amr bin Auf di Quba, pada hari Senin di bulan Rabi'ul Awwal." },
        { cam: { at: [655, -3165], dist: 4, el: 0.42, az: 2.2, up: 3 }, chars: [{ id: "kultsum", expr: "senyum" }], ...IH,
          narr: "Menurut kitab sirah, Rasulullah ﷺ menginap di rumah Kultsum bin Al-Hidm, sesepuh Bani Amr bin Auf. Abu Bakar singgah di rumah Khubaib bin Isaf di As-Sunh." }
      ] },
      { judul: "Abu Bakar menaungi beliau", beats: [
        { inside: { scene: "quba", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 520, y: 640, small: false, state: "tenang" },
            chars: [{ id: "abubakar", x: 820, y: 660, expr: "senyum", on: true, s: 0.85 }, { id: "anshar1", x: 1060, y: 680, expr: "senyum", on: true, s: 0.85 }, { id: "anshar2", x: 1260, y: 690, expr: "kagum", on: true, s: 0.85 }] },
          ...B3906, narr: "Abu Bakar berdiri menyambut orang-orang, sedangkan Rasulullah ﷺ duduk diam. Kaum Anshar yang datang dan belum pernah melihat beliau memberi salam kepada Abu Bakar." },
        { inside: { chars: [{ id: "abubakar", x: 640, y: 650, expr: "lembut" }, { id: "anshar1", expr: "kaget" }, { id: "anshar2", expr: "kagum" }],
            props: [{ id: "selendang", kind: "selendang", x: 540, y: 470, s: 1.1, depan: true }] }, hitung: "Abu Bakar menaungi beliau", ...B3906,
          narr: "Ketika sinar matahari mengenai Rasulullah ﷺ, Abu Bakar datang dan menaungi beliau dengan selendangnya. Saat itulah orang-orang mengenali Rasulullah ﷺ." }
      ] }
    ],
    penutup: "Selama di Quba, Rasulullah ﷺ mendirikan Masjid Quba. Tonton \"Masjid Quba\"."
  };

  // ---------- Masjid Quba ----------
  window.TONTONAN["masjid-quba"] = {
    kota: "madinah", peta: true, malam: 0,
    judul: "Masjid Quba",
    tahun: 622,
    tanggal: TGL_QUBA([{ k: "Turunnya ayat", v: "Surah At-Taubah turun sekitar 9 H; ayat 108 memuji masjid yang didirikan atas dasar takwa.", s: "Catatan penyusun" }]),
    pengantar: PENGANTAR_M("HR. Bukhari no. 3906, HR. Abu Dawud no. 44, dan HR. Muslim no. 1398"),
    tokoh: { abubakar: { nama: "Abu Bakar" }, ...ANSHAR, sahabat: { nama: "Sahabat" }, kultsum: { nama: "Kultsum bin Al-Hidm" } },
    lampu: [], paths: {},
    babak: [
      { judul: "Di Bani Amr bin Auf", beats: [
        { cam: { at: [612, -3108], dist: 5, el: 0.5, az: 2.0, up: 3 }, rasul: { at: [606, -3104], state: "tenang" }, tanggal: true,
          chars: [{ id: "abubakar", at: [616, -3112], expr: "netral", on: true }, { id: "kultsum", at: [626, -3100], expr: "senyum", on: true }, { id: "anshar1", at: [600, -3120], expr: "senyum", on: true }], ...B3906,
          narr: "Rasulullah ﷺ tinggal di perkampungan Bani Amr bin Auf, lalu mendirikan masjid yang didasarkan atas takwa dan shalat di dalamnya. Inilah Masjid Quba." },
        { inside: { scene: "membangun-masjid", label: "Membangun Masjid Quba (rekonstruksi)", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 760, y: 620, small: true, state: "tenang" },
            chars: [{ id: "abubakar", x: 460, y: 680, expr: "tegas", on: true, s: 0.8 }, { id: "anshar1", x: 1000, y: 690, expr: "senyum", on: true, s: 0.8 }, { id: "sahabat", x: 1240, y: 700, expr: "tegas", on: true, s: 0.8 }],
            props: [{ id: "b1", kind: "bata", x: 470, y: 720, depan: true }, { id: "b2", kind: "bata", x: 1010, y: 730, depan: true }, { id: "b3", kind: "bata", x: 1250, y: 740, depan: true }] }, ...B3906,
          narr: "Dindingnya disusun dari batu dan bata, dan para sahabat bekerja bersama. Inilah masjid pertama yang dibangun Rasulullah ﷺ setelah hijrah." },
        { inside: { chars: [{ id: "abubakar", x: 300, y: 690 }, { id: "anshar1", x: 860, y: 680 }, { id: "sahabat", x: 1080, y: 690 }],
            props: [{ id: "b1", kind: "bata", x: 310, y: 730, depan: true }, { id: "b2", kind: "bata", x: 870, y: 720, depan: true }, { id: "b3", kind: "bata", x: 1090, y: 730, depan: true }] }, ...B3906,
          narr: "Menurut Bukhari, beliau tinggal di sana lebih dari sepuluh malam; riwayat lain menyebut empat hari atau empat belas malam." }
      ] },
      { judul: "Didirikan atas dasar takwa", beats: [
        { inside: { props: [] }, ...S_("QS. At-Taubah: 108 (turun sekitar 9 H)", ""), hold: 4000, say: { who: "quran", ayat: "QS. At-Taubah: 108",
          arab: "لَّمَسْجِدٌ أُسِّسَ عَلَى التَّقْوَىٰ مِنْ أَوَّلِ يَوْمٍ أَحَقُّ أَن تَقُومَ فِيهِ ۚ فِيهِ رِجَالٌ يُحِبُّونَ أَن يَتَطَهَّرُوا",
          text: "Sungguh, masjid yang didirikan atas dasar takwa sejak hari pertama lebih pantas engkau shalat di dalamnya. Di dalamnya ada orang-orang yang suka menyucikan diri…" } },
        { ...S_("HR. Abu Dawud no. 44 (Abu Hurairah); dishahihkan Al-Albani", "https://sunnah.com/abudawud:44"),
          narr: "Abu Hurairah meriwayatkan bahwa ayat ini turun tentang penduduk Quba, yang terbiasa bersuci dengan air." },
        { inside: null, cam: { at: [610, -3110], dist: 9, el: 0.6, az: 2.0, up: 3 }, ...S_("HR. Muslim no. 1398 (Abu Sa'id Al-Khudri)", "https://sunnah.com/muslim:1398"),
          narr: "Ulama berbeda pendapat tentang masjid yang dimaksud ayat ini. Dalam riwayat Muslim, Nabi ﷺ menunjuk masjid beliau di Madinah. Sebagian ulama memadukan keduanya." }
      ] }
    ],
    penutup: "Pada hari Jumat, Rasulullah ﷺ meninggalkan Quba menuju pusat Madinah. Tonton \"Jumat Pertama\"."
  };

  // ---------- Jumat pertama di Bani Salim bin Auf ----------
  const SHAF = [[412, -2406], [419, -2406], [426, -2406], [412, -2413], [419, -2413], [426, -2413]];
  window.TONTONAN["jumat-pertama"] = {
    kota: "madinah", peta: true, malam: 0,
    judul: "Jumat Pertama",
    tahun: 622,
    tanggal: { judul: "Jumat, 12 Rabi'ul Awwal 1 H (±27 September 622 M)", rinci: [
      { k: "Tanggal", v: "Mengikuti Ar-Rahiq: empat hari di Quba, berangkat hari kelima (Jumat). Jika mengikuti riwayat empat belas malam (HR. Bukhari no. 428), Jumat ini sekitar dua pekan setelah tiba di Quba.", s: "Ar-Rahiq Al-Makhtum", url: "https://usul.ai/t/the-sealed-nectar-with-additions/112" },
      { k: "Kiblat", v: "Saat itu kiblat masih menghadap Baitul Maqdis, di utara Madinah.", s: "HR. Bukhari no. 40", url: "https://sunnah.com/bukhari:40" }] },
    pengantar: PENGANTAR_M("Sirah Ibnu Hisyam, Ar-Rahiq Al-Makhtum, dan HR. Abu Dawud no. 1069"),
    tokoh: { abubakar: { nama: "Abu Bakar" }, ...ANSHAR, sahabat: { nama: "Sahabat" }, sahabat2: { nama: "Sahabat" } },
    lampu: [], paths: { berangkat: KE_JUMUAH, berangkatAB: geser(KE_JUMUAH, 4, -4) },
    babak: [
      { judul: "Meninggalkan Quba", beats: [
        { cam: { at: [655, -3160], dist: 5, el: 0.5, az: 2.2, up: 3 }, rasul: { at: KE_JUMUAH[0], state: "tenang" }, tanggal: true,
          chars: [{ id: "abubakar", at: geser([KE_JUMUAH[0]], 4, -4)[0], expr: "netral", on: true }], ...IH,
          narr: "Pada hari Jumat, Rasulullah ﷺ menaiki untanya meninggalkan Quba menuju pusat Madinah." },
        { rasul: { path: "berangkat", from: 0, to: 1, dur: 13000 }, chars: [{ id: "abubakar", path: "berangkatAB", from: 0, to: 1, dur: 13000 }],
          cam: { follow: "rasul", dist: 9, el: 0.6, az: "behind", up: 3 }, ...IH,
          narr: "Waktu Jumat tiba ketika beliau sampai di perkampungan Bani Salim bin Auf, di lembah Ranuna'." }
      ] },
      { judul: "Shalat di dasar lembah", beats: [
        { rasul: { at: [419, -2398] }, chars: [{ id: "abubakar", at: SHAF[0] }, { id: "anshar1", at: SHAF[1], expr: "lembut", on: true }, { id: "anshar2", at: SHAF[2], expr: "lembut", on: true },
            { id: "anshar3", at: SHAF[3], expr: "lembut", on: true }, { id: "sahabat", at: SHAF[4], expr: "lembut", on: true }, { id: "sahabat2", at: SHAF[5], expr: "lembut", on: true }],
          cam: { at: [419, -2410], dist: 3.6, el: 0.4, az: 0.35, up: 3 }, hitung: "Sekitar 100 orang", ...RAHIQ,
          narr: "Beliau mengumpulkan orang-orang dan shalat Jumat bersama mereka di dasar lembah. Menurut Ar-Rahiq, jumlah mereka sekitar seratus orang. Saf menghadap ke utara, ke arah Baitul Maqdis." },
        { ...IH, narr: "Inilah shalat Jumat pertama yang dipimpin Rasulullah ﷺ sendiri. Di tempat ini kemudian berdiri masjid yang dikenal sebagai Masjid Jumu'ah." },
        { cam: { at: [419, -2405], dist: 8, el: 0.6, az: 0.35, up: 3 }, ...S_("HR. Abu Dawud no. 1069 (Ka'ab bin Malik); dinilai hasan oleh Al-Albani", "https://sunnah.com/abudawud:1069"),
          narr: "Sebelum itu kaum muslimin Madinah sudah pernah berkumpul untuk shalat Jumat, dipimpin As'ad bin Zurarah." }
      ] }
    ],
    penutup: "Setelah shalat Jumat, Rasulullah ﷺ melanjutkan perjalanan ke pusat Madinah. Tonton \"Memasuki Madinah\"."
  };

  // ---------- Memasuki Madinah ----------
  window.TONTONAN["masuk-madinah"] = {
    kota: "madinah", peta: true, malam: 0,
    judul: "Memasuki Madinah",
    tahun: 622,
    tanggal: { judul: "Jumat, 12 Rabi'ul Awwal 1 H (±27 September 622 M)", rinci: [
      { k: "Waktu", v: "Setelah shalat Jumat di Bani Salim bin Auf, menurut Ar-Rahiq.", s: "Ar-Rahiq Al-Makhtum", url: "https://usul.ai/t/the-sealed-nectar-with-additions/112" },
      { k: "Syair Thala'al badru", v: "Riwayatnya lemah (sanad terputus). Ibnul Qayyim menyebut Tsaniyyatul Wada' ada di arah Syam, dan ada ulama yang mengaitkan syair ini dengan kepulangan dari Tabuk.", s: "IslamQA no. 119722", url: "https://islamqa.info/en/answers/119722/the-nasheed-talaa-al-badru-alayna" }] },
    pengantar: PENGANTAR_M("HR. Bukhari no. 3925, 3911, dan 428 serta Sirah Ibnu Hisyam") + " Syair \"Thala'al badru\" ditampilkan dengan label riwayat lemah.",
    tokoh: { abubakar: { nama: "Abu Bakar" }, ...ANSHAR, perempuan: { nama: "Penduduk Madinah" }, saadubadah: { nama: "Sa'ad bin Ubadah" }, saadrabi: { nama: "Sa'ad bin Ar-Rabi'" }, abdullahrawahah: { nama: "Abdullah bin Rawahah" } },
    lampu: [], paths: { kota: KE_KOTA, kotaAB: geser(KE_KOTA, -3, -3) },
    babak: [
      { judul: "Kegembiraan penduduk Madinah", beats: [
        { cam: { at: [425, -2425], dist: 5, el: 0.5, az: 0.4, up: 3 }, rasul: { at: KE_KOTA[0], state: "tenang" }, tanggal: true,
          chars: [{ id: "abubakar", at: geser([KE_KOTA[0]], -3, -3)[0], expr: "senyum", on: true },
            { id: "anshar1", at: [-48, -1090], expr: "senyum", on: true }, { id: "anshar2", at: [-74, -1112], expr: "kagum", on: true }, { id: "perempuan", at: [-40, -1120], expr: "senyum", on: true },
            { id: "saadubadah", at: [-372, 262], expr: "senyum", on: true }, { id: "saadrabi", at: [-226, 154], expr: "senyum", on: true }, { id: "abdullahrawahah", at: [-208, 128], expr: "senyum", on: true }],
          ...B428, narr: "Rasulullah ﷺ berangkat dari Bani Salim di atas untanya, dan Abu Bakar membonceng di belakang beliau." },
        { rasul: { path: "kota", from: 0, to: K1, dur: 14000 }, chars: [{ id: "abubakar", path: "kotaAB", from: 0, to: K1, dur: 14000 }],
          cam: { follow: "rasul", dist: 14, el: 0.65, az: "behind", up: 3 }, ...B3925,
          narr: "Al-Bara' bin 'Azib berkata, ia tidak pernah melihat penduduk Madinah bergembira dengan sesuatu seperti kegembiraan mereka dengan kedatangan Rasulullah ﷺ." },
        { cam: { at: [-58, -1100], dist: 4, el: 0.4, az: 2.5, up: 3 }, chars: [{ id: "perempuan", expr: "kagum" }], ...B3911,
          narr: "Orang-orang naik ke tempat-tempat tinggi untuk melihat, sambil berseru bahwa Nabi Allah telah datang." },
        { hitung: "Riwayat lemah", ...LEMAH("Al-Baihaqi, Dala'il An-Nubuwwah (dari Ibnu Aisyah, sanad terputus); IslamQA no. 119722", "https://islamqa.info/en/answers/119722/the-nasheed-talaa-al-badru-alayna"),
          narr: "Syair \"Thala'al badru 'alaina, min tsaniyyatil wada'\" (bulan purnama terbit di atas kami, dari celah bukit Al-Wada') sangat terkenal dan disebut dinyanyikan saat itu. Riwayatnya lemah, dan ada ulama yang mengaitkannya dengan kepulangan dari Tabuk." }
      ] },
      { judul: "\"Biarkan untanya, ia diperintah\"", beats: [
        { rasul: { path: "kota", from: K1, to: K2, dur: 14000 }, chars: [{ id: "abubakar", path: "kotaAB", from: K1, to: K2, dur: 14000 }],
          cam: { follow: "rasul", dist: 12, el: 0.65, az: "behind", up: 3 }, ...IH,
          narr: "Menurut kitab sirah, setiap kabilah Anshar yang dilewati memegang tali kekang unta dan meminta beliau singgah." },
        { cam: { at: [-376, 252], dist: 3.6, el: 0.4, az: 2.4, up: 3 }, chars: [{ id: "saadubadah", expr: "senyum" }], ...IH,
          say: { who: "saadubadah", text: "Tinggallah bersama kami, wahai Rasulullah, dengan jumlah, perlengkapan, dan perlindungan kami." } },
        { ...IH, say: { who: "rasul", text: "Biarkan jalannya, sesungguhnya ia diperintah.", arab: "خَلُّوا سَبِيلَهَا فَإِنَّهَا مَأْمُورَةٌ" } },
        { rasul: { path: "kota", from: K2, to: K3, dur: 6000 }, chars: [{ id: "abubakar", path: "kotaAB", from: K2, to: K3, dur: 6000 }],
          cam: { at: [-216, 140], dist: 3.8, el: 0.4, az: 2.4, up: 3 }, ...IH,
          say: { who: "saadrabi", text: "Tinggallah bersama kami, wahai Rasulullah." } },
        { chars: [{ id: "abdullahrawahah", expr: "lembut" }], ...IH, narr: "Kepada Bani Al-Harits bin Al-Khazraj dan kabilah-kabilah lain, beliau menjawab dengan lembut hal yang sama." },
        { rasul: { path: "kota", from: K3, to: 1, dur: 8000 }, chars: [{ id: "abubakar", path: "kotaAB", from: K3, to: 1, dur: 8000 }],
          cam: { follow: "rasul", dist: 6, el: 0.6, az: "behind", up: 3 }, ...IH,
          narr: "Unta itu terus berjalan sampai ke perkampungan Bani Malik bin An-Najjar." }
      ] }
    ],
    penutup: "Unta itu berlutut di sebuah tempat menjemur kurma. Tonton \"Unta Berlutut dan Rumah Abu Ayyub\"."
  };

  // ---------- Unta berlutut di mirbad dan rumah Abu Ayyub ----------
  window.TONTONAN["unta-abuayyub"] = {
    kota: "madinah", peta: true, malam: 0,
    judul: "Unta Berlutut dan Rumah Abu Ayyub",
    tahun: 622,
    tanggal: { judul: "Rabi'ul Awwal 1 H (±27 September 622 M)", rinci: [
      { k: "Hari", v: "Hari kedatangan di pusat Madinah, setelah shalat Jumat di Bani Salim menurut Ar-Rahiq.", s: "Ar-Rahiq Al-Makhtum", url: "https://usul.ai/t/the-sealed-nectar-with-additions/112" },
      { k: "Wali anak yatim", v: "Bukhari 3906 menyebut As'ad bin Zurarah; sebagian riwayat sirah menyebut Mu'adz bin 'Afra'.", s: "HR. Bukhari no. 3906", url: "https://sunnah.com/bukhari:3906" }] },
    pengantar: PENGANTAR_M("HR. Bukhari no. 3906, 3911, dan 428, HR. Muslim no. 2053c, serta Sirah Ibnu Hisyam"),
    tokoh: { abubakar: { nama: "Abu Bakar" }, abuayyub: { nama: "Abu Ayyub Al-Anshari" }, ummuayyub: { nama: "Istri Abu Ayyub" }, asad: { nama: "As'ad bin Zurarah" },
      sahlnajjar: { nama: "Sahl" }, suhailnajjar: { nama: "Suhail" }, abdullahsalam: { nama: "Abdullah bin Salam" } },
    lampu: [[30, -55]], paths: { datang: [[-80, 60], [-40, 38], MIRBAD] },
    babak: [
      { judul: "Unta berlutut", beats: [
        { cam: { at: [-10, 10], dist: 5, el: 0.55, az: 2.6, up: 3 }, rasul: { at: [-80, 60], state: "tenang" }, tanggal: true,
          chars: [{ id: "abubakar", at: [-84, 63], expr: "senyum", on: true }, { id: "abuayyub", at: [28, -48], expr: "kagum", on: true }, { id: "asad", at: [12, 22], expr: "senyum", on: true },
            { id: "sahlnajjar", at: [-16, 28], expr: "kagum", on: true }, { id: "suhailnajjar", at: [-8, 32], expr: "senyum", on: true }], ...IH,
          narr: "Unta itu berjalan di perkampungan Bani Najjar, keluarga ibu Abdul Muthalib." },
        { rasul: { path: "datang", from: 0, to: 1, dur: 7000 }, cam: { at: [-6, 14], dist: 3.5, el: 0.45, az: 2.6, up: 3 }, ...IH,
          narr: "Menurut kitab sirah, unta itu berlutut, bangkit, berjalan sebentar, lalu kembali dan berlutut lagi di tempat yang sama." },
        { inside: { scene: "mirbad", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 760, y: 560, small: false, state: "tenang" },
            chars: [{ id: "sahlnajjar", x: 1050, y: 700, expr: "kagum", on: true, s: 0.7 }, { id: "suhailnajjar", x: 1170, y: 710, expr: "senyum", on: true, s: 0.7 }, { id: "asad", x: 1330, y: 690, expr: "senyum", on: true, s: 0.85 },
              { id: "abuayyub", x: 360, y: 690, expr: "kagum", on: true, s: 0.85 }],
            props: [{ id: "unta", kind: "unta", x: 760, y: 780, s: 1.1, duduk: true, pelana: "#7a3a4a" }] }, ...B3906,
          say: { who: "rasul", text: "Inilah, insya Allah, tempat tinggal kita.", arab: "هَذَا إِنْ شَاءَ اللَّهُ الْمَنْزِلُ" } },
        { ...B3906, narr: "Tempat itu adalah mirbad, lahan menjemur kurma, milik Sahl dan Suhail, dua anak yatim yang diasuh As'ad bin Zurarah. Di sinilah kemudian berdiri Masjid Nabawi." }
      ] },
      { judul: "\"Ini rumahku dan ini pintuku\"", beats: [
        { ...B3911, say: { who: "rasul", text: "Rumah keluarga kita yang mana yang paling dekat?", arab: "أَيُّ بُيُوتِ أَهْلِنَا أَقْرَبُ" } },
        { inside: { chars: [{ id: "abuayyub", x: 480, expr: "senyum" }] }, ...B3911,
          say: { who: "abuayyub", text: "Saya, wahai Nabi Allah. Ini rumahku dan ini pintuku.", arab: "أَنَا يَا نَبِيَّ اللَّهِ، هَذِهِ دَارِي وَهَذَا بَابِي" } },
        { ...B3911, say: { who: "rasul", text: "Pergilah, siapkan tempat istirahat untuk kami.", arab: "فَانْطَلِقْ فَهَيِّئْ لَنَا مَقِيلًا" } },
        { inside: { chars: [{ id: "abuayyub", x: 1500, expr: "senyum" }] }, ...IH, narr: "Menurut kitab sirah, Abu Ayyub lalu membawa pelana beliau masuk ke rumahnya." }
      ] },
      { judul: "Rumah dua lantai", beats: [
        { inside: { scene: "rumah-abuayyub", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 820, y: 720, small: true, state: "tenang" },
            chars: [{ id: "abuayyub", x: 700, y: 330, expr: "netral", on: true, s: 0.75 }, { id: "ummuayyub", x: 900, y: 335, expr: "netral", on: true, s: 0.75 }] },
          malam: 1, ...M2053, narr: "Rumah Abu Ayyub bertingkat dua. Rasulullah ﷺ menempati lantai bawah, sedangkan Abu Ayyub dan keluarganya di lantai atas." },
        { inside: { chars: [{ id: "abuayyub", expr: "kaget" }, { id: "ummuayyub", expr: "khawatir" }] }, ...M2053,
          say: { who: "abuayyub", text: "Kita berjalan di atas kepala Rasulullah ﷺ!" } },
        { inside: { chars: [{ id: "abuayyub", x: 360, expr: "khawatir" }, { id: "ummuayyub", x: 480, expr: "khawatir" }] }, ...M2053,
          narr: "Malam itu mereka menyingkir dan bermalam di satu sudut. Esoknya Abu Ayyub memohon kepada beliau, dan Rasulullah ﷺ menjawab bahwa lantai bawah lebih memudahkan beliau." },
        { inside: { rasul: { x: 820, y: 360 }, chars: [{ id: "abuayyub", x: 620, y: 690, expr: "lembut" }, { id: "ummuayyub", x: 1000, y: 695, expr: "lembut" }] }, ...M2053,
          narr: "Abu Ayyub berkata ia tidak akan naik ke atap yang di bawahnya ada Rasulullah ﷺ. Maka beliau pindah ke lantai atas, dan Abu Ayyub ke lantai bawah." },
        { inside: null, malam: 0, cam: { at: [30, -55], dist: 4, el: 0.5, az: 2.4, up: 3 }, chars: [{ id: "abdullahsalam", at: [44, -40], expr: "kagum", on: true }], ...B3911,
          narr: "Hari itu juga Abdullah bin Salam, pemuka ilmu kaum Yahudi, bergegas datang dari kebunnya. Ia mendengarkan Rasulullah ﷺ, dan tak lama kemudian masuk Islam." }
      ] }
    ],
    penutup: "Rasulullah ﷺ tinggal di rumah Abu Ayyub beberapa bulan sampai masjid dan bilik-bilik beliau selesai. Tonton \"Membangun Masjid Nabawi\"."
  };

  // ---------- Membangun Masjid Nabawi ----------
  const BATA = (id, x, y, n = 1) => ({ id, kind: "bata", x, y, n, depan: true });
  window.TONTONAN["masjid-nabawi"] = {
    kota: "madinah", peta: true, malam: 0,
    judul: "Membangun Masjid Nabawi",
    tahun: 622,
    tanggal: { judul: "Rabi'ul Awwal 1 H dan bulan-bulan sesudahnya (622–623 M)", rinci: [
      { k: "Pembelian lahan", v: "Bukhari 3906: kedua anak yatim menawarkan hibah, lalu Nabi ﷺ membelinya. Bukhari 428: Bani Najjar berkata mereka hanya mengharap harganya dari Allah. Harganya diriwayatkan berbeda-beda.", s: "HR. Bukhari no. 3906 dan 428", url: "https://sunnah.com/bukhari:428" },
      { k: "Kiblat", v: "Saat dibangun, kiblat masih menghadap Baitul Maqdis di utara; dipindah ke Ka'bah sekitar 16–17 bulan kemudian.", s: "HR. Bukhari no. 40", url: "https://sunnah.com/bukhari:40" }] },
    pengantar: PENGANTAR_M("HR. Bukhari no. 3906, 428, 446, dan 447"),
    tokoh: { abubakar: { nama: "Abu Bakar" }, sahlnajjar: { nama: "Sahl" }, suhailnajjar: { nama: "Suhail" }, ammar: { nama: "Ammar bin Yasir" }, anshar1: { nama: "Orang Anshar" }, sahabat: { nama: "Sahabat" } },
    lampu: [], paths: {},
    babak: [
      { judul: "Lahan dua anak yatim", beats: [
        { cam: { at: [-6, 14], dist: 3.5, el: 0.45, az: 2.6, up: 3 }, rasul: { at: [-12, 10], state: "tenang" }, tanggal: true,
          chars: [{ id: "sahlnajjar", at: [-2, 18], expr: "senyum", on: true }, { id: "suhailnajjar", at: [4, 14], expr: "senyum", on: true }, { id: "abubakar", at: [-18, 4], expr: "netral", on: true }], ...B3906,
          narr: "Rasulullah ﷺ memanggil kedua anak yatim itu dan menawar lahan mereka untuk dijadikan masjid." },
        { ...B3906, say: { who: "sahlnajjar", text: "Kami hibahkan saja untukmu, wahai Rasulullah.", arab: "بَلْ نَهَبُهُ لَكَ يَا رَسُولَ اللَّهِ" } },
        { ...B3906, narr: "Beliau menolak menerimanya sebagai hibah, lalu membelinya dari mereka. Dalam riwayat Anas, Bani Najjar berkata mereka hanya mengharap harganya dari Allah." },
        { ...B428, narr: "Di lahan itu ada kuburan orang musyrik, puing-puing, dan pohon kurma. Kuburan itu dibongkar, tanahnya diratakan, dan pohon kurma ditebang. Batang-batangnya dijajarkan sebagai dinding kiblat, yang saat itu menghadap Baitul Maqdis di utara." }
      ] },
      { judul: "Mengangkut bata", beats: [
        { inside: { scene: "membangun-masjid", label: "Membangun Masjid Nabawi (rekonstruksi)", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 640, y: 620, small: true, state: "tenang" },
            chars: [{ id: "abubakar", x: 420, y: 680, expr: "tegas", on: true, s: 0.8 }, { id: "anshar1", x: 880, y: 690, expr: "senyum", on: true, s: 0.8 }, { id: "sahabat", x: 1080, y: 690, expr: "tegas", on: true, s: 0.8 },
              { id: "ammar", x: 1300, y: 700, expr: "senyum", on: true, s: 0.8 }],
            props: [BATA("b1", 430, 720), BATA("b2", 890, 730), BATA("b3", 1090, 730), BATA("b4", 1310, 745, 2), BATA("b0", 650, 700)] }, ...B3906,
          narr: "Para sahabat mengangkut batu dan bata sambil bersyair, dan Rasulullah ﷺ ikut mengangkut bata bersama mereka." },
        { ...B3906, hold: 1500, say: { who: "rasul", text: "Inilah beban yang sesungguhnya, bukan beban dagangan Khaibar. Ini lebih baik dan lebih suci, wahai Tuhan kami.", arab: "هَذَا الْحِمَالُ لَا حِمَالَ خَيْبَرْ، هَذَا أَبَرُّ رَبَّنَا وَأَطْهَرْ" } },
        { inside: { rasul: { x: 560 }, chars: [{ id: "abubakar", x: 300 }, { id: "anshar1", x: 760 }, { id: "sahabat", x: 960 }, { id: "ammar", x: 1160 }],
            props: [BATA("b1", 310, 720), BATA("b2", 770, 730), BATA("b3", 970, 730), BATA("b4", 1170, 745, 2), BATA("b0", 570, 700)] }, ...B428, hold: 1500,
          say: { who: "rasul", text: "Ya Allah, tidak ada kebaikan kecuali kebaikan akhirat, maka ampunilah kaum Anshar dan Muhajirin.", arab: "اللَّهُمَّ لَا خَيْرَ إِلَّا خَيْرُ الْآخِرَهْ، فَاغْفِرْ لِلْأَنْصَارِ وَالْمُهَاجِرَهْ" } },
        { inside: { chars: [{ id: "ammar", x: 1000, expr: "senyum" }, { id: "sahabat", x: 1240 }], props: [BATA("b1", 310, 720), BATA("b2", 770, 730), BATA("b3", 1250, 730), BATA("b4", 1010, 745, 2), BATA("b0", 570, 700)] },
          hitung: "Ammar: dua bata sekaligus", ...B447, narr: "Abu Sa'id Al-Khudri bercerita: mereka membawa bata satu per satu, sedangkan Ammar bin Yasir membawa dua-dua." },
        { inside: { rasul: { x: 860 }, chars: [{ id: "ammar", expr: "lembut" }] }, ...B447, narr: "Rasulullah ﷺ melihatnya, lalu menyeka debu dari kepalanya." }
      ] },
      { judul: "Masjid yang sederhana", beats: [
        { inside: null, cam: { at: [-4, 10], dist: 5, el: 0.5, az: 2.6, up: 3 }, chars: [{ id: "sahlnajjar", on: false }, { id: "suhailnajjar", on: false }, { id: "abubakar", on: false }], ...B446,
          narr: "Pada masa Rasulullah ﷺ, masjid itu dibangun dari bata lumpur, atapnya pelepah kurma, dan tiangnya batang kurma." },
        { cam: { at: [-4, 10], dist: 12, el: 0.7, az: 2.6, up: 3 }, ...S_("Wikipedia: Al-Masjid an-Nabawi", "https://en.wikipedia.org/wiki/Al-Masjid_an-Nabawi"),
          narr: "Bangunan pertama berukuran sekitar 30 x 35 meter. Di sisi timurnya kemudian dibangun bilik-bilik keluarga Rasulullah ﷺ." }
      ] }
    ],
    penutup: "Sekitar 16–17 bulan kemudian kiblat dipindahkan ke Ka'bah. Tonton \"Pemindahan Kiblat\"."
  };

  // ---------- Persaudaraan Muhajirin dan Anshar ----------
  window.TONTONAN["muakhah"] = {
    kota: "madinah", peta: false, malam: 0,
    judul: "Persaudaraan Muhajirin dan Anshar",
    tahun: 622,
    tanggal: { judul: "Tahun 1 H (622–623 M)", rinci: [
      { k: "Waktu", v: "Tidak disebut dalam hadits; urutannya di sini perkiraan.", s: "Catatan penyusun" },
      { k: "Jumlah", v: "Sembilan puluh orang, separuh Muhajirin dan separuh Anshar, menurut Ibnul Qayyim.", s: "Zad Al-Ma'ad 2/56 (dikutip Ar-Rahiq)", url: "https://usul.ai/t/the-sealed-nectar-with-additions/118" }] },
    pengantar: PENGANTAR("HR. Bukhari no. 2294, 3780, 3937, 4580, dan 1968") + " Letak rumah Anas tidak tercatat; ruangannya ilustrasi.",
    tokoh: { abdurrahman: { nama: "Abdurrahman bin Auf" }, saadrabi: { nama: "Sa'ad bin Ar-Rabi'" }, anas: { nama: "Anas bin Malik" }, sahabat2: { nama: "Muhajirin" }, anshar1: { nama: "Anshar" } },
    lampu: [], paths: {},
    babak: [
      { judul: "Dipersaudarakan", beats: [
        { inside: { scene: "rumah-madinah", label: "Di rumah Anas bin Malik (ilustrasi)", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 800, y: 560, small: true, state: "tenang" },
            chars: [{ id: "abdurrahman", x: 470, y: 660, expr: "netral", on: true, s: 0.85 }, { id: "sahabat2", x: 300, y: 670, expr: "netral", on: true, s: 0.8 },
              { id: "saadrabi", x: 1130, y: 660, expr: "senyum", on: true, s: 0.85 }, { id: "anshar1", x: 1300, y: 670, expr: "senyum", on: true, s: 0.8 }, { id: "anas", x: 980, y: 720, expr: "senyum", on: true, s: 0.6 }] },
          tanggal: true, ...S_("HR. Bukhari no. 2294 (Anas)", "https://sunnah.com/bukhari:2294"),
          narr: "Kaum Muhajirin tiba dengan meninggalkan rumah, kebun, dan dagangan di Mekah. Rasulullah ﷺ mengikat persaudaraan antara mereka dan kaum Anshar. Anas berkata, ikatan itu dibuat di rumahnya." },
        { inside: { chars: [{ id: "abdurrahman", x: 640 }, { id: "saadrabi", x: 960 }, { id: "sahabat2", x: 470 }, { id: "anshar1", x: 1130 }] }, hitung: "Sekitar 90 orang, berpasang-pasangan", ...S_("Ibnul Qayyim, Zad Al-Ma'ad (dikutip Ar-Rahiq)", "https://usul.ai/t/the-sealed-nectar-with-additions/118"),
          narr: "Mereka dipasangkan satu Muhajirin dengan satu Anshar, sehingga yang datang tanpa harta mendapat saudara yang menanggungnya." },
        { inside: { chars: [{ id: "saadrabi", expr: "senyum" }] }, ...S_("HR. Bukhari no. 3780 (Abdurrahman bin Auf)", "https://sunnah.com/bukhari:3780"),
          say: { who: "saadrabi", text: "Aku orang Anshar yang paling banyak hartanya. Akan kubagi dua hartaku untukmu.", arab: "إِنِّي أَكْثَرُ الْأَنْصَارِ مَالًا، فَأَقْسِمُ لَكَ نِصْفَ مَالِي" } },
        { inside: { chars: [{ id: "abdurrahman", expr: "lembut" }] }, ...S_("HR. Bukhari no. 3937 (Anas)", "https://sunnah.com/bukhari:3937"),
          say: { who: "abdurrahman", text: "Semoga Allah memberkahi keluarga dan hartamu. Tunjukkan saja aku jalan ke pasar." } },
        { ...S_("QS. Al-Hasyr: 9 (turun kemudian)", ""), hold: 4000, say: { who: "quran", ayat: "QS. Al-Hasyr: 9",
          arab: "يُحِبُّونَ مَنْ هَاجَرَ إِلَيْهِمْ وَلَا يَجِدُونَ فِي صُدُورِهِمْ حَاجَةً مِّمَّا أُوتُوا وَيُؤْثِرُونَ عَلَىٰ أَنفُسِهِمْ وَلَوْ كَانَ بِهِمْ خَصَاصَةٌ",
          text: "…mereka mencintai orang yang berhijrah kepada mereka, tidak menginginkan dalam hati apa yang diberikan kepada (Muhajirin), dan mengutamakan (Muhajirin) atas diri mereka sendiri, meskipun mereka juga memerlukan." } },
        { ...S_("HR. Bukhari no. 4580 (Ibnu Abbas) dan 1968 (Abu Juhaifah)", "https://sunnah.com/bukhari:4580"),
          narr: "Awalnya mereka saling mewarisi; hukum waris itu kemudian dihapus, sedangkan ikatan tolong-menolong tetap berlaku. Persaudaraan juga diikat dengan sahabat yang datang belakangan, seperti Salman Al-Farisi dan Abu Darda'." }
      ] }
    ],
    penutup: "Persaudaraan ini menjadi dasar masyarakat Madinah. Lihat menu Kekerabatan untuk pasangan-pasangan yang tercatat."
  };
})();
