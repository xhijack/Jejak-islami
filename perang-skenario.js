// Skenario simulasi sembilan ghazwah yang terjadi pertempuran.
// Koordinat dalam meter: x = timur (+), y = utara (+), titik nol di tengah meja.
// Letak dan susunan pasukan adalah REKONSTRUKSI ILUSTRATIF dari kitab sirah dan perkiraan, bukan peta arkeologis.
// Jumlah total pasukan diambil dari perang.js (window.PERANG); jumlah per satuan di sini hanya untuk tata letak.
// Satuan dengan `jumlah: null` berarti angkanya tidak tercatat; `ilustrasi` hanya mengatur banyaknya figur.
// DRAF: wajib diverifikasi ustadz.
(function () {
  const SN = (k) => "https://sunnah.com/" + k;
  // Konversi dari koordinat peta Madinah (meter dari Raudhah, lihat madinah-data.js)
  const MD = (cx, cy) => (pts) => pts.map(([e, n]) => [e - cx, n - cy]);
  const HARRAH_WAQIM = [[2600, -4500], [2500, -3200], [2400, -2400], [2100, -1600], [1500, -800], [1100, -100], [950, 500], [850, 1200], [650, 1900], [550, 2450], [900, 2850], [1500, 3300], [2600, 3650], [4000, 3800], [6800, 3500], [7000, 0], [6800, -4500]];
  const HARRAH_WABRAH = [[-1850, -2600], [-1750, -1200], [-1850, -200], [-2050, 500], [-2400, 1000], [-2900, 1150], [-3350, 1350], [-3550, 1700], [-3950, 1500], [-4300, 800], [-4600, -300], [-5000, -1800], [-5300, -3300], [-4500, -4200], [-3000, -4000], [-2200, -3500]];
  const KHANDAQ = [[900, 2850], [600, 2760], [300, 2680], [0, 2600], [-300, 2470], [-560, 2280], [-800, 2060], [-1020, 1840], [-1250, 1640], [-1500, 1480], [-1800, 1420], [-2100, 1430], [-2400, 1400], [-2700, 1330], [-3000, 1280], [-3350, 1350]];

  const S = {};

  // ===================== BADAR =====================
  S.badar = {
    catatan: "Lembah Badar digambarkan sebagai dataran lonjong yang dikelilingi bukit. Sesuai QS. Al-Anfal: 42, kaum muslimin berada di tepi lembah yang dekat (arah Madinah, utara), Quraisy di tepi yang jauh (arah Mekah, selatan), dan kafilah di bawah mereka ke arah pesisir. Letak sumur, 'arisy, dan barisan adalah perkiraan berdasarkan Sirah Ibnu Hisyam; jarak antarsatuan diperpendek agar terbaca. Pembagian 82 Muhajirin dan 231 Anshar mengikuti Wikipedia.",
    medan: {
      ukuran: [3200, 2600], vertikal: 1.4,
      fitur: [
        { id: "udwah-dunya", jenis: "bukit", nama: "Tepi lembah yang dekat", pos: [350, 1050], r: 520, h: 42 },
        { id: "udwah-quswa", jenis: "bukit", nama: "Tepi lembah yang jauh", pos: [-250, -1080], r: 560, h: 46 },
        { jenis: "gunung", pos: [1350, -150], r: 480, h: 120 },
        { jenis: "gunung", pos: [-1350, 800], r: 380, h: 80 },
        { jenis: "gunung", pos: [1200, 1100], r: 350, h: 70 },
        { id: "aqanqal", jenis: "bukit-pasir", nama: "Bukit pasir Al-'Aqanqal", pos: [80, -700], r: 380, h: 14 },
        { jenis: "bukit-pasir", pos: [-700, -350], r: 300, h: 8 },
        { id: "sumur-utama", jenis: "sumur", nama: "Sumur yang dikuasai muslimin", pos: [120, 60], penting: true },
        { id: "sumur-2", jenis: "sumur", nama: "Sumur ditimbun", pos: [380, 420], ditimbun: 1 },
        { id: "sumur-3", jenis: "sumur", nama: "Sumur ditimbun", pos: [-180, 430], ditimbun: 1 },
        { id: "arisy", jenis: "naungan", nama: "'Arisy (naungan)", pos: [260, 580], penting: true },
        { id: "kemah-quraisy", jenis: "kemah", nama: "Perkemahan Quraisy", pos: [-120, -1020], r: 240, warna: "gelap" },
        { id: "jalan-kafilah", jenis: "jalan", nama: "Jalur kafilah", pts: [[-1550, 1300], [-1450, 500], [-1520, -300], [-1450, -1300]], lebar: 40, labelT: 0.3 },
        { id: "jalan-madinah", jenis: "jalan", pts: [[1600, 1300], [1000, 950], [450, 520], [150, 150]], lebar: 35 },
        { jenis: "arah", nama: "↗ Madinah (±150 km)", pos: [1350, 1180] },
        { jenis: "arah", nama: "↓ Mekah", pos: [-250, -1250] },
        { jenis: "arah", nama: "← Pesisir Laut Merah", pos: [-1450, 120] }
      ]
    },
    unit: [
      { id: "m-muhajirin", sisi: "muslim", nama: "Muhajirin", jumlah: 82, jenis: "infanteri", panglima: "mushab", sumber: "Wikipedia" },
      { id: "m-anshar", sisi: "muslim", nama: "Anshar", jumlah: 231, jenis: "infanteri", panglima: "saadmuadz", sumber: "Wikipedia" },
      { id: "m-kuda", sisi: "muslim", nama: "Dua penunggang kuda", jumlah: 2, jenis: "kavaleri", panglima: "zubair", panji: false, hitung: false },
      { id: "d-hamzah", sisi: "muslim", jenis: "tokoh", tokoh: "hamzah", nama: "Hamzah" },
      { id: "d-ali", sisi: "muslim", jenis: "tokoh", tokoh: "ali", nama: "Ali" },
      { id: "d-ubaidah", sisi: "muslim", jenis: "tokoh", nama: "Ubaidah bin Al-Harits" },
      { id: "q-utama", sisi: "musuh", nama: "Pasukan Quraisy", jumlah: 900, jenis: "infanteri", panglima: "abujahal" },
      { id: "q-kuda", sisi: "musuh", nama: "Pasukan berkuda Quraisy", jumlah: 100, jenis: "kavaleri" },
      { id: "q-kafilah", sisi: "musuh", nama: "Kafilah dagang Abu Sufyan", jumlah: null, ilustrasi: 40, jenis: "unta", panglima: "abusufyan", hitung: false },
      { id: "d-utbah", sisi: "musuh", jenis: "tokoh", tokoh: "utbah", nama: "Utbah" },
      { id: "d-syaibah", sisi: "musuh", jenis: "tokoh", nama: "Syaibah bin Rabi'ah" },
      { id: "d-walid", sisi: "musuh", jenis: "tokoh", nama: "Al-Walid bin Utbah" },
      { id: "q-tawanan", sisi: "musuh", nama: "Tawanan Quraisy", jumlah: 70, jenis: "tawanan", panji: false, hitung: false }
    ],
    fase: [
      { judul: "Kafilah dan musyawarah", waktu: "Awal Ramadhan 2 H",
        narasi: "Kaum muslimin keluar untuk menghadang kafilah dagang Quraisy dari Syam. Abu Sufyan membelokkan kafilahnya lewat pesisir dan meminta bantuan ke Mekah, sehingga Quraisy datang dengan pasukan besar. Nabi ﷺ bermusyawarah, dan kaum Anshar menyatakan siap berperang.",
        derajat: "sirah", sumber: "Sirah Ibnu Hisyam; HR. Muslim no. 1779", url: SN("muslim:1779"),
        posisi: {
          "m-muhajirin": { pos: [1050, 960], arah: 230, formasi: "kolom" }, "m-anshar": { pos: [1300, 1130], arah: 230, formasi: "kolom" }, "m-kuda": { pos: [880, 850], arah: 230, formasi: "kolom" },
          "q-utama": { pos: [-220, -1150], arah: 10, formasi: "kolom" }, "q-kuda": { pos: [80, -1120], arah: 10, formasi: "kolom" },
          "q-kafilah": { pos: [-1480, 350], arah: 185, formasi: "kolom" }, rasul: { pos: [1150, 1060] }
        },
        panah: [{ dari: [1350, 1180], ke: [450, 480], sisi: "muslim" }, { dari: [-1460, 650], ke: [-1470, -1150], sisi: "musuh", lengkung: 0.03, label: "kafilah lolos lewat pesisir" }, { dari: [-250, -1250], ke: [-150, -880], sisi: "musuh", lengkung: 0.05 }],
        kamera: { target: [0, 0], jarak: 3400, sudut: 0, tinggi: 58 } },
      { judul: "Berkemah di Badar", waktu: "Malam 17 Ramadhan 2 H",
        narasi: "Kaum muslimin tiba lebih dulu dan menguasai sumber air. Menurut kitab sirah, atas usul Al-Hubab bin Al-Mundzir mereka berkemah di sumur terdekat ke arah musuh dan menimbun sumur-sumur lainnya. Hujan turun malam itu, memadatkan pasir di pihak muslimin (QS. Al-Anfal: 11).",
        derajat: "sirah", sumber: "Sirah Ibnu Hisyam; HR. Muslim no. 1779", url: SN("muslim:1779"),
        posisi: {
          "m-muhajirin": { pos: [60, 290], arah: 195, formasi: "bertahan" }, "m-anshar": { pos: [360, 270], arah: 195, formasi: "bertahan" }, "m-kuda": { pos: [560, 390], formasi: "bertahan" },
          "q-utama": { pos: [-160, -900], arah: 10, formasi: "bertahan" }, "q-kuda": { pos: [170, -960], formasi: "bertahan" },
          "q-kafilah": { aktif: false }, rasul: { pos: [260, 580] }
        },
        sorot: ["sumur-utama", "sumur-2", "sumur-3", "arisy"],
        kamera: { target: [100, -100], jarak: 2500, sudut: -10, tinggi: 52 } },
      { judul: "Doa di pagi Badar", waktu: "Pagi 17 Ramadhan 2 H",
        narasi: "Kedua pasukan bersiap. Melihat musuh tiga kali lebih banyak, Nabi ﷺ menghadap kiblat dan berdoa sungguh-sungguh hingga Abu Bakar berkata, \"Cukuplah, wahai Nabi Allah.\" Lalu turun Al-Anfal 9 tentang bala bantuan malaikat. Malaikat tidak digambarkan dalam simulasi ini.",
        derajat: "shahih", sumber: "HR. Muslim no. 1763", url: SN("muslim:1763"),
        posisi: {
          "m-muhajirin": { pos: [-60, 150], arah: 190, formasi: "shaf" }, "m-anshar": { pos: [260, 140], arah: 190, formasi: "shaf" }, "m-kuda": { pos: [500, 190], arah: 190, formasi: "shaf" },
          "q-utama": { pos: [-90, -470], arah: 10, formasi: "shaf" }, "q-kuda": { pos: [330, -520], arah: 10, formasi: "kolom" }
        },
        kamera: { target: [100, -80], jarak: 1700, sudut: -18, tinggi: 42 } },
      { judul: "Perang tanding", waktu: "17 Ramadhan 2 H",
        narasi: "Pertempuran dibuka dengan duel. Hamzah, Ali, dan Ubaidah bin Al-Harits menghadapi Utbah, Syaibah, dan Al-Walid bin Utbah. Ketiga penantang Quraisy kalah, sedangkan Ubaidah terluka berat. Abu Dzar bersumpah bahwa ayat Al-Hajj 19 turun tentang mereka.",
        derajat: "shahih", sumber: "HR. Bukhari no. 3969", url: SN("bukhari:3969"),
        posisi: {
          "q-utama": { pos: [-90, -400] }, "q-kuda": { pos: [330, -450] },
          "d-hamzah": { pos: [-140, -40], arah: 190 }, "d-ali": { pos: [40, -40], arah: 190 }, "d-ubaidah": { pos: [220, -40], arah: 190 },
          "d-utbah": { pos: [-140, -200], arah: 10 }, "d-syaibah": { pos: [40, -200], arah: 10 }, "d-walid": { pos: [220, -200], arah: 10 }
        },
        sorot: ["d-hamzah", "d-ali", "d-ubaidah", "d-utbah", "d-syaibah", "d-walid"],
        kamera: { target: [40, -100], jarak: 900, sudut: -25, tinggi: 34 } },
      { judul: "Serangan umum", waktu: "17 Ramadhan 2 H",
        narasi: "Quraisy menyerbu, kaum muslimin bertahan dalam barisan lalu balik menyerang hingga Quraisy kocar-kacir. Abu Jahal tewas di tangan dua pemuda Anshar, Mu'adz bin Amr bin Al-Jamuh dan Mu'adz bin Afra'. Empat belas muslim gugur sebagai syahid.",
        derajat: "shahih", sumber: "HR. Bukhari no. 3141", url: SN("bukhari:3141"),
        posisi: {
          "m-muhajirin": { pos: [-40, -40], formasi: "shaf", jumlah: 76 }, "m-anshar": { pos: [270, -60], formasi: "shaf", jumlah: 223 }, "m-kuda": { pos: [520, -40] },
          "q-utama": { pos: [-60, -330], formasi: "tersebar", jumlah: 830 }, "q-kuda": { pos: [320, -420], formasi: "tersebar" },
          "d-hamzah": { pos: [-30, -120] }, "d-ali": { pos: [80, -130] }, "d-ubaidah": { pos: [120, 220], arah: 10 },
          "d-utbah": { aktif: false }, "d-syaibah": { aktif: false }, "d-walid": { aktif: false }, rasul: { pos: [200, 330] }
        },
        panah: [{ dari: [100, 160], ke: [-20, -320], sisi: "muslim" }, { dari: [300, 140], ke: [300, -380], sisi: "muslim", lengkung: -0.1 }, { dari: [-100, -560], ke: [-60, -200], sisi: "musuh", lengkung: 0.1 }],
        korban: { muslim: 14, musuh: 70 },
        kamera: { target: [100, -150], jarak: 1500, sudut: -12, tinggi: 46 } },
      { judul: "Tawanan dan kepulangan", waktu: "Setelah pertempuran",
        narasi: "Tujuh puluh orang Quraisy tewas dan tujuh puluh ditawan, sisanya lari ke Mekah. Para tawanan dibawa ke Madinah; sebagian ditebus dengan harta, dan menurut kitab sirah sebagian yang pandai menulis diminta mengajari anak-anak Madinah.",
        derajat: "shahih", sumber: "HR. Muslim no. 1763; HR. Bukhari no. 3986", url: SN("bukhari:3986"),
        posisi: {
          "m-muhajirin": { pos: [80, 330], formasi: "bertahan" }, "m-anshar": { pos: [380, 300], formasi: "bertahan" }, "m-kuda": { pos: [600, 420] },
          "q-utama": { pos: [-260, -1150], arah: 190, formasi: "tersebar", jumlah: 760 }, "q-kuda": { pos: [120, -1180], arah: 190, formasi: "tersebar" },
          "q-tawanan": { pos: [260, 120], arah: 20, formasi: "bertahan" },
          "d-hamzah": { aktif: false }, "d-ali": { aktif: false }, "d-ubaidah": { aktif: false }, rasul: { pos: [260, 580] }
        },
        panah: [{ dari: [-100, -500], ke: [-250, -1150], sisi: "musuh", label: "lari ke Mekah" }, { dari: [450, 420], ke: [1250, 1100], sisi: "muslim", label: "kembali ke Madinah" }],
        korban: { muslim: 14, musuh: 70, tawanan: 70 },
        kamera: { target: [100, -100], jarak: 3000, sudut: 0, tinggi: 56 } }
    ]
  };

  // ===================== UHUD =====================
  // Titik nol = (200, 4200) pada peta Madinah. Jabal Rumat dan Wadi Qanat mengikuti madinah-data.js.
  const UH = MD(200, 4200);
  S.uhud = {
    catatan: "Letak Gunung Uhud, Jabal Rumat (bukit pemanah), Wadi Qanat, dan makam syuhada mengikuti peta Madinah aplikasi ini. Wikipedia menyebut kaum muslimin berkemah di lereng Uhud dengan gunung di belakang, dan bukit pemanah di sisi barat perkemahan. Posisi sayap Khalid (barat) dan Ikrimah (timur) serta jalur Khalid memutari bukit adalah rekonstruksi; sumber berbeda tentang kanan-kiri sayap. Gunung Uhud direndahkan agar medan tetap terlihat. Jumlah kuda Quraisy mengikuti Ibnu Sa'd (200), dibagi rata ke dua sayap secara ilustratif.",
    medan: {
      ukuran: [2800, 2400], vertikal: 1.25,
      fitur: [
        { id: "uhud", jenis: "gunung", nama: "Gunung Uhud", ridge: [[-1600, 980], [1600, 1120]], lebar: 820, h: 210, labelPos: [300, 860], penting: true },
        { id: "rumat", jenis: "bukit", nama: "Jabal Rumat (bukit pemanah)", pos: UH([[123, 3839]])[0], r: 75, h: 16, penting: true },
        { id: "qanat", jenis: "wadi", nama: "Wadi Qanat", pts: UH([[3000, 4100], [1800, 4150], [800, 4150], [250, 4130], [-400, 4200], [-1100, 4250], [-1800, 4150]]), lebar: 70, dalam: 3, labelT: 0.2 },
        { id: "syuhada", jenis: "titik", nama: "Makam para syuhada", pos: UH([[220, 3960]])[0], fase: [6, 6] },
        { id: "kemah-quraisy", jenis: "kemah", nama: "Perkemahan Quraisy", pos: [-700, -1000], r: 200, warna: "gelap" },
        { jenis: "kebun", pos: [1100, -800], r: 260, rapat: 0.8 },
        { jenis: "kebun", pos: [-1100, -150], r: 200, rapat: 0.6 },
        { jenis: "arah", nama: "↓ Madinah (±5 km)", pos: [700, -1150] },
        { jenis: "arah", nama: "↙ Mekah", pos: [-1250, -1100] }
      ]
    },
    unit: [
      { id: "m-utama", sisi: "muslim", nama: "Pasukan muslimin", jumlah: 650, jenis: "infanteri", panglima: "mushab" },
      { id: "m-pemanah", sisi: "muslim", nama: "50 pemanah", jumlah: 50, jenis: "pemanah", panglima: "abdullahjubair", sumber: "HR. Bukhari no. 3039" },
      { id: "m-turun", sisi: "muslim", nama: "Pemanah yang turun", jumlah: 40, jenis: "pemanah", panji: false },
      { id: "m-pengawal", sisi: "muslim", nama: "Yang melindungi Nabi ﷺ", jumlah: 9, jenis: "infanteri", panji: false, hitung: false, sumber: "HR. Muslim no. 1789" },
      { id: "n-ubay", sisi: "netral", nama: "Abdullah bin Ubay dan pengikutnya", jumlah: 300, jenis: "infanteri", panglima: "abdullahubay", hitung: false },
      { id: "d-hamzah", sisi: "muslim", jenis: "tokoh", tokoh: "hamzah", nama: "Hamzah" },
      { id: "d-abudujanah", sisi: "muslim", jenis: "tokoh", tokoh: "abudujanah", nama: "Abu Dujanah" },
      { id: "q-tengah", sisi: "musuh", nama: "Pasukan inti Quraisy", jumlah: 2800, jenis: "infanteri", panglima: "abusufyan" },
      { id: "q-khalid", sisi: "musuh", nama: "Sayap berkuda Khalid bin Walid", jumlah: 100, jenis: "kavaleri", panglima: "khalid" },
      { id: "q-ikrimah", sisi: "musuh", nama: "Sayap berkuda Ikrimah", jumlah: 100, jenis: "kavaleri", panglima: "ikrimah" }
    ],
    fase: [
      { judul: "Musyawarah dan berangkat", waktu: "Syawal 3 H",
        narasi: "Setelah bermusyawarah, Nabi ﷺ keluar menghadapi Quraisy dengan sekitar 1.000 orang. Di Asy-Syauth, Abdullah bin Ubay pulang membawa sekitar sepertiga pasukan. Sisanya, sekitar 700 orang, melewati kebun-kebun Bani Haritsah menuju kaki Uhud.",
        derajat: "sirah", sumber: "Sirah Ibnu Hisyam; Wikipedia",
        posisi: {
          "m-utama": { pos: [850, -650], arah: 330, formasi: "kolom" }, "m-pemanah": { pos: [980, -820], arah: 330, formasi: "kolom" },
          "n-ubay": { pos: [1150, -1050], arah: 150, formasi: "kolom" },
          "q-tengah": { pos: [-650, -820], arah: 35, formasi: "bertahan" }, "q-khalid": { pos: [-1000, -650], arah: 35, formasi: "bertahan" }, "q-ikrimah": { pos: [-250, -950], arah: 35, formasi: "bertahan" },
          rasul: { pos: [820, -560] }
        },
        panah: [{ dari: [1050, -1050], ke: [420, 160], sisi: "muslim", label: "menuju kaki Uhud" }, { dari: [1000, -900], ke: [1250, -1150], sisi: "netral", lengkung: 0.05, label: "kembali ke Madinah" }],
        kamera: { target: [0, -150], jarak: 2900, sudut: 0, tinggi: 56 } },
      { judul: "Pemanah di Bukit Ar-Rumat", waktu: "Pagi, Sabtu",
        narasi: "Nabi ﷺ menempatkan 50 pemanah di bawah Abdullah bin Jubair di sebuah bukit kecil dan berpesan agar mereka tidak meninggalkan tempat apa pun yang terjadi. Gunung Uhud berada di belakang kaum muslimin; Quraisy berbaris menghadap mereka.",
        derajat: "shahih", sumber: "HR. Bukhari no. 3039", url: SN("bukhari:3039"),
        posisi: {
          "m-utama": { pos: [330, 170], arah: 215, formasi: "shaf" }, "m-pemanah": { pos: UH([[123, 3839]])[0], arah: 225, formasi: "bertahan" }, "n-ubay": { aktif: false },
          "q-tengah": { pos: [-450, -620], arah: 35, formasi: "shaf" }, "q-khalid": { pos: [-950, -520], arah: 40, formasi: "kolom" }, "q-ikrimah": { pos: [180, -820], arah: 20, formasi: "kolom" },
          "d-hamzah": { pos: [180, 60], arah: 215 }, rasul: { pos: [420, 330] }
        },
        sorot: ["m-pemanah", "rumat"],
        kamera: { target: [-150, -150], jarak: 2300, sudut: -15, tinggi: 50 } },
      { judul: "Kaum muslimin unggul", waktu: "Awal pertempuran",
        narasi: "Para pembawa panji Quraisy berjatuhan satu per satu. Abu Dujanah maju dengan pedang yang diserahkan Nabi ﷺ kepadanya, dan barisan Quraisy terdesak hingga lari meninggalkan perkemahan.",
        derajat: "shahih", sumber: "HR. Muslim no. 2470; HR. Bukhari no. 4043", url: SN("bukhari:4043"),
        posisi: {
          "m-utama": { pos: [-280, -560], arah: 215, formasi: "shaf" }, "d-abudujanah": { pos: [-380, -700], arah: 215 }, "d-hamzah": { pos: [-150, -640] },
          "q-tengah": { pos: [-720, -1000], arah: 215, formasi: "tersebar", jumlah: 2780 }, "q-khalid": { pos: [-1050, -520] }, "q-ikrimah": { pos: [300, -900] }
        },
        panah: [{ dari: [150, 0], ke: [-500, -800], sisi: "muslim" }],
        korban: { muslim: 0, musuh: 20 },
        kamera: { target: [-350, -500], jarak: 1900, sudut: -10, tinggi: 46 } },
      { judul: "Pemanah turun dari bukit", waktu: "Tengah pertempuran",
        narasi: "Melihat musuh lari, sebagian besar pemanah turun mengejar harta rampasan meskipun Abdullah bin Jubair mengingatkan mereka. Khalid bin Walid memimpin pasukan berkuda memutari bukit dan menyerang pemanah yang tersisa.",
        derajat: "shahih", sumber: "HR. Bukhari no. 3039", url: SN("bukhari:3039"),
        posisi: {
          "m-pemanah": { jumlah: 10 }, "m-turun": { pos: [-450, -820], formasi: "tersebar", aktif: true },
          "q-khalid": { pos: [-420, -150], arah: 70, formasi: "kolom" }
        },
        panah: [{ dari: [-1050, -520], ke: [-380, -220], sisi: "musuh", lewat: [-900, 50], label: "Khalid memutari bukit" }, { dari: [-120, -380], ke: [-420, -760], sisi: "muslim", lengkung: 0.05, label: "pemanah turun" }],
        sorot: ["m-pemanah", "q-khalid", "rumat"],
        kamera: { target: [-350, -350], jarak: 1700, sudut: -30, tinggi: 46 } },
      { judul: "Saat paling genting", waktu: "Tengah pertempuran",
        narasi: "Pasukan berkuda Quraisy menyerang dari belakang dan barisan muslim terpecah; tersiar kabar bahwa Nabi ﷺ terbunuh. Beliau tetap bertahan, dilindungi beberapa sahabat, dan terluka. Hamzah gugur oleh tombak Wahsyi.",
        derajat: "shahih", sumber: "HR. Muslim no. 1789; HR. Bukhari no. 4072", url: SN("muslim:1789"),
        posisi: {
          "m-pemanah": { aktif: false, jumlah: 0 }, "m-turun": { aktif: false },
          "m-utama": { pos: [-120, -280], formasi: "tersebar", jumlah: 620 },
          "m-pengawal": { pos: [330, 330], formasi: "lingkar", radius: 18, aktif: true },
          "q-khalid": { pos: [120, 230], arah: 200, formasi: "tersebar" }, "q-tengah": { pos: [-450, -600], arah: 35, formasi: "tersebar" }, "q-ikrimah": { pos: [380, -380], arah: 330, formasi: "tersebar" },
          "d-hamzah": { aktif: false }, "d-abudujanah": { pos: [300, 260] }, rasul: { pos: [330, 330] }
        },
        panah: [{ dari: [-380, -220], ke: [80, 200], sisi: "musuh", lengkung: 0.2 }, { dari: [-600, -800], ke: [-250, -350], sisi: "musuh", lengkung: -0.1 }],
        korban: { muslim: 60, musuh: 22 },
        sorot: ["m-pengawal"],
        kamera: { target: [50, -50], jarak: 1700, sudut: 10, tinggi: 48 } },
      { judul: "Berkumpul di lereng Uhud", waktu: "Akhir pertempuran",
        narasi: "Nabi ﷺ dan para sahabat naik ke lereng gunung. Abu Sufyan berseru memuji berhala Hubal, dan Nabi ﷺ menyuruh para sahabat menjawab, \"Allah lebih tinggi dan lebih agung.\" Quraisy kemudian pulang ke Mekah.",
        derajat: "shahih", sumber: "HR. Bukhari no. 3039", url: SN("bukhari:3039"),
        posisi: {
          "m-utama": { pos: [350, 620], arah: 200, formasi: "bertahan", jumlah: 630 }, "m-pengawal": { aktif: false }, "d-abudujanah": { aktif: false },
          "q-tengah": { pos: [-550, -750], arah: 215, formasi: "bertahan" }, "q-khalid": { pos: [-800, -650], arah: 215, formasi: "kolom" }, "q-ikrimah": { pos: [-300, -950], arah: 215, formasi: "kolom" },
          rasul: { pos: [380, 720] }
        },
        panah: [{ dari: [-600, -850], ke: [-1150, -1100], sisi: "musuh", label: "pulang ke Mekah" }],
        korban: { muslim: 70, musuh: 22 },
        kamera: { target: [0, 0], jarak: 2600, sudut: 0, tinggi: 52 } },
      { judul: "Memakamkan para syuhada", waktu: "Sore hari dan esoknya",
        narasi: "Para syuhada dimakamkan di Uhud, dua orang dalam satu liang, tanpa dimandikan. Esok harinya Nabi ﷺ membawa pasukan menyusul Quraisy sampai Hamra'ul Asad.",
        derajat: "shahih", sumber: "HR. Bukhari no. 1343", url: SN("bukhari:1343"),
        posisi: {
          "m-utama": { pos: UH([[240, 4010]])[0], formasi: "lingkar", radius: 90 },
          "q-tengah": { aktif: false }, "q-khalid": { aktif: false }, "q-ikrimah": { aktif: false },
          rasul: { pos: UH([[300, 4060]])[0] }
        },
        panah: [{ dari: [300, -350], ke: [-700, -1100], sisi: "muslim", label: "esoknya ke Hamra'ul Asad" }],
        sorot: ["syuhada"],
        kamera: { target: [0, -250], jarak: 1500, sudut: 0, tinggi: 50 } }
    ]
  };

  // ===================== KHANDAQ =====================
  // Titik nol = (-700, 1600) pada peta Madinah. Parit, Gunung Sal', dan harrah mengikuti madinah-data.js.
  const KD = MD(-700, 1600);
  const parit = KD(KHANDAQ);
  S.khandaq = {
    catatan: "Garis parit, Gunung Sal', kedua harrah, dan perkemahan sekutu mengikuti peta Madinah aplikasi ini (kemah Quraisy di Mujtama' Al-Asyal, Ghathafan di dekat Uhud). Pembagian pasukan muslim ke tiga sektor dan titik penyeberangan Amr bin Abd Wudd adalah ilustrasi. Rincian sekutu (Quraisy 4.000, Bani Sulaim 700, Ghathafan sekitar 1.800) mengikuti Ar-Rahiq Al-Makhtum; sisanya tidak dirinci sehingga ditulis tidak tercatat. Parit digambar lebih lebar dari aslinya (±9 m) agar terlihat.",
    medan: {
      ukuran: [6400, 7000], vertikal: 1.6, kasar: 4,
      fitur: [
        { id: "harrah-waqim", jenis: "harrah", nama: "Harrah Waqim", poly: KD(HARRAH_WAQIM), h: 10, labelPos: [3000, 0] },
        { id: "harrah-wabrah", jenis: "harrah", nama: "Harrah Wabrah", poly: KD(HARRAH_WABRAH), h: 10, labelPos: [-2600, -1700] },
        { id: "sal", jenis: "gunung", nama: "Gunung Sal'", ridge: KD([[-1200, 420], [-1120, 1260]]), lebar: 520, h: 80, penting: true },
        { id: "uhud", jenis: "gunung", nama: "Gunung Uhud", ridge: KD([[-2000, 5200], [4200, 6300]]), lebar: 1800, h: 230, labelPos: [1300, 3300] },
        { id: "parit", jenis: "parit", nama: "Parit (khandaq)", pts: parit, lebar: 9, labelT: 0.62, penting: true, fase: [1, 5] },
        { id: "kota", jenis: "kota", nama: "Madinah", pos: KD([[0, 0]])[0], r: 850 },
        { jenis: "kebun", poly: KD([[300, -900], [1500, -900], [1700, -2600], [500, -2900]]), rapat: 1.2 },
        { jenis: "kebun", poly: KD([[-1400, -400], [-500, -300], [-400, -1500], [-1600, -1500]]), rapat: 0.9 },
        { id: "masjid", jenis: "masjid", nama: "Masjid Nabawi", pos: KD([[0, 0]])[0] },
        { id: "kemah-quraisy", jenis: "kemah", nama: "Kemah Quraisy (Mujtama' Al-Asyal)", pos: KD([[-2650, 4000]])[0], r: 300, warna: "gelap", fase: [2, 4] },
        { id: "kemah-ghathafan", jenis: "kemah", nama: "Kemah Ghathafan (dekat Uhud)", pos: KD([[800, 4600]])[0], r: 260, warna: "gelap", fase: [2, 4] },
        { id: "quraizhah", jenis: "benteng", nama: "Benteng Bani Quraizhah", pos: KD([[1900, -1450]])[0], ukuran: [80, 70, 14] },
        { jenis: "arah", nama: "↙ Mekah", pos: [-2800, -3000] }
      ]
    },
    unit: [
      { id: "m-sal", sisi: "muslim", nama: "Perkemahan inti di kaki Sal'", jumlah: 1200, jenis: "infanteri" },
      { id: "m-barat", sisi: "muslim", nama: "Penjaga parit barat", jumlah: 700, jenis: "infanteri" },
      { id: "m-timur", sisi: "muslim", nama: "Penjaga parit timur", jumlah: 1100, jenis: "infanteri" },
      { id: "d-salman", sisi: "muslim", jenis: "tokoh", tokoh: "salman", nama: "Salman" },
      { id: "d-ali", sisi: "muslim", jenis: "tokoh", tokoh: "ali", nama: "Ali" },
      { id: "d-nuaim", sisi: "muslim", jenis: "tokoh", tokoh: "nuaim", nama: "Nu'aim bin Mas'ud" },
      { id: "q-quraisy", sisi: "musuh", nama: "Quraisy dan sekutunya", jumlah: 4000, jenis: "infanteri", panglima: "abusufyan", sumber: "Ar-Rahiq Al-Makhtum" },
      { id: "q-sulaim", sisi: "musuh", nama: "Bani Sulaim", jumlah: 700, jenis: "infanteri" },
      { id: "q-ghathafan", sisi: "musuh", nama: "Ghathafan (Fazarah, Murrah, Asyja')", jumlah: 1800, jenis: "unta", panglima: "Uyainah bin Hishn Al-Fazari" },
      { id: "q-asad", sisi: "musuh", nama: "Bani Asad dan sekutu lain", jumlah: null, ilustrasi: 3500, jenis: "infanteri" },
      { id: "q-kuda-amr", sisi: "musuh", nama: "Penunggang kuda yang menyeberang", jumlah: null, ilustrasi: 6, jenis: "kavaleri", panji: false },
      { id: "d-amr", sisi: "musuh", jenis: "tokoh", tokoh: "amrabdwudd", nama: "Amr bin Abd Wudd" },
      { id: "q-quraizhah", sisi: "musuh", nama: "Bani Quraizhah (membatalkan perjanjian)", jumlah: null, ilustrasi: 600, jenis: "benteng", panglima: "kaabasad", hitung: false }
    ],
    fase: [
      { judul: "Pasukan sekutu dihimpun", waktu: "Syawal 5 H",
        narasi: "Pemuka Bani Nadhir yang terusir ke Khaibar, di antaranya Huyay bin Akhthab, menghimpun Quraisy dan Ghathafan untuk menyerang Madinah. Sekitar 10.000 pasukan bergerak dari barat daya dan timur laut.",
        derajat: "sirah", sumber: "Sirah Ibnu Hisyam",
        posisi: {
          "m-sal": { pos: KD([[0, 100]])[0], formasi: "bertahan" }, "m-barat": { pos: KD([[-400, -250]])[0], formasi: "bertahan" }, "m-timur": { pos: KD([[350, -150]])[0], formasi: "bertahan" },
          "q-quraisy": { pos: [-2700, 2900], arah: 120, formasi: "kolom" }, "q-sulaim": { pos: [-2300, 3200], arah: 130, formasi: "kolom" },
          "q-ghathafan": { pos: [2800, 3150], arah: 235, formasi: "kolom" }, "q-asad": { pos: [2300, 3300], arah: 230, formasi: "kolom" },
          rasul: { pos: KD([[0, 30]])[0] }
        },
        panah: [{ dari: [-3000, 2600], ke: [-2100, 2300], sisi: "musuh", lengkung: 0.1 }, { dari: [3000, 3300], ke: [1700, 2950], sisi: "musuh", lengkung: -0.1 }],
        kamera: { target: [0, 0], jarak: 7400, sudut: 0, tinggi: 62 } },
      { judul: "Menggali parit", waktu: "Sebelum sekutu tiba",
        narasi: "Kaum muslimin menggali parit di sisi utara Madinah yang terbuka di antara dua harrah; menurut kitab sirah gagasan ini datang dari Salman Al-Farisi. Nabi ﷺ ikut menggali di pagi yang dingin sambil bersyair mendoakan kaum Anshar dan Muhajirin.",
        derajat: "shahih", sumber: "HR. Bukhari no. 4099 dan 4101", url: SN("bukhari:4099"),
        posisi: {
          "m-barat": { garis: parit.slice(10), arah: 0, formasi: "garis" }, "m-sal": { garis: parit.slice(7, 11), arah: 0, formasi: "garis" }, "m-timur": { garis: parit.slice(0, 8), arah: 330, formasi: "garis" },
          "d-salman": { pos: [-950, -260], arah: 0 },
          "q-quraisy": { pos: [-2400, 2700] }, "q-sulaim": { pos: [-2000, 2900] }, "q-ghathafan": { pos: [2300, 3050] }, "q-asad": { pos: [1900, 3200] },
          rasul: { pos: [-760, -280] }
        },
        sorot: ["parit", "d-salman"],
        kamera: { target: [-500, 200], jarak: 5200, sudut: 0, tinggi: 56 } },
      { judul: "Pengepungan dan pengkhianatan", waktu: "Sekitar sebulan",
        narasi: "Pasukan sekutu tertahan di depan parit. Huyay membujuk Ka'ab bin Asad, pemimpin Bani Quraizhah, membatalkan perjanjian dengan kaum muslimin, sehingga Madinah terancam dari dalam. Aisyah menegaskan bahwa Al-Ahzab 10 turun tentang hari itu.",
        derajat: "shahih", sumber: "HR. Bukhari no. 4103", url: SN("bukhari:4103"),
        posisi: {
          "m-barat": { garis: parit.slice(10).map(([x, y]) => [x, y - 140]), arah: 0, formasi: "garis" },
          "m-sal": { pos: [-560, -660], arah: 0, formasi: "bertahan" },
          "m-timur": { garis: parit.slice(0, 8).map(([x, y]) => [x + 60, y - 130]), arah: 330, formasi: "garis" },
          "d-salman": { aktif: false },
          "q-quraisy": { pos: [-1950, 2400], formasi: "bertahan" }, "q-sulaim": { pos: [-2350, 2050], formasi: "bertahan" },
          "q-ghathafan": { pos: [1500, 3000], formasi: "bertahan" }, "q-asad": { pos: [700, 2750], formasi: "bertahan" },
          "q-quraizhah": { pos: KD([[1900, -1450]])[0], formasi: "bertahan", aktif: true },
          rasul: { pos: [-700, -600] }
        },
        panah: [{ dari: [2500, -2900], ke: [1100, -1750], sisi: "musuh", putus: true, label: "ancaman dari dalam kota" }],
        sorot: ["q-quraizhah"],
        kamera: { target: [0, 0], jarak: 7000, sudut: 0, tinggi: 60 } },
      { judul: "Amr bin Abd Wudd menyeberang", waktu: "Masa pengepungan",
        narasi: "Beberapa penunggang kuda Quraisy menemukan bagian parit yang sempit dan menyeberang. Amr bin Abd Wudd menantang duel dan tewas di tangan Ali bin Abi Thalib (kitab sirah). Hari itu kaum muslimin begitu sibuk hingga shalat Ashar tertunda sampai matahari terbenam.",
        derajat: "sirah", sumber: "Sirah Ibnu Hisyam; HR. Bukhari no. 4111", url: SN("bukhari:4111"),
        posisi: {
          "q-kuda-amr": { pos: [-1250, -330], arah: 180, formasi: "tersebar", aktif: true }, "d-amr": { pos: [-1230, -420], arah: 180 }, "d-ali": { pos: [-1230, -520], arah: 0 }
        },
        panah: [{ dari: [-1300, 250], ke: [-1250, -300], sisi: "musuh", lengkung: 0.05, label: "menyeberang di bagian sempit" }],
        sorot: ["d-amr", "d-ali"],
        kamera: { target: [-1150, -300], jarak: 1700, sudut: -10, tinggi: 42 } },
      { judul: "Nu'aim memecah sekutu", waktu: "Akhir pengepungan",
        narasi: "Nu'aim bin Mas'ud dari Ghathafan diam-diam masuk Islam. Atas izin Nabi ﷺ, ia menanamkan saling curiga antara Bani Quraizhah dan pasukan sekutu, sehingga kerja sama mereka berantakan (kitab sirah).",
        derajat: "sirah", sumber: "Sirah Ibnu Hisyam",
        posisi: {
          "q-kuda-amr": { aktif: false }, "d-amr": { aktif: false }, "d-ali": { aktif: false },
          "d-nuaim": { pos: [400, 400], arah: 0 }
        },
        panah: [{ dari: [2500, -2900], ke: [-1850, 2300], sisi: "netral", putus: true, lengkung: 0.12, label: "saling curiga" }, { dari: [2550, -2850], ke: [1450, 2850], sisi: "netral", putus: true, lengkung: -0.05 }],
        sorot: ["d-nuaim"],
        kamera: { target: [300, 0], jarak: 7000, sudut: 0, tinggi: 62 } },
      { judul: "Angin dan kepulangan sekutu", waktu: "Malam yang sangat dingin",
        narasi: "Allah mengirim angin dingin yang kencang (Al-Ahzab 9). Nabi ﷺ bersabda, \"Aku ditolong dengan angin timur.\" Hudzaifah diutus mengintai dan melihat sekutu bersiap pulang. Pasukan sekutu pun bubar tanpa pertempuran besar.",
        derajat: "shahih", sumber: "HR. Bukhari no. 4105; HR. Muslim no. 1788", url: SN("bukhari:4105"),
        posisi: {
          "d-nuaim": { aktif: false },
          "q-quraisy": { pos: [-2900, 3150], arah: 300, formasi: "kolom" }, "q-sulaim": { pos: [-2700, 2700], arah: 300, formasi: "kolom" },
          "q-ghathafan": { pos: [2800, 3250], arah: 60, formasi: "kolom" }, "q-asad": { pos: [2400, 3150], arah: 60, formasi: "kolom" }
        },
        panah: [{ dari: [-1900, 2350], ke: [-3000, 3200], sisi: "musuh", label: "pulang ke Mekah" }, { dari: [1400, 2950], ke: [2950, 3300], sisi: "musuh", lengkung: -0.1, label: "pulang ke Najd" }],
        korban: { muslim: 6, musuh: 3 },
        kamera: { target: [0, 300], jarak: 7400, sudut: 0, tinggi: 62 } }
    ]
  };

  // ===================== BANI QURAIZHAH =====================
  const QZ = MD(900, -700);
  S.quraizhah = {
    catatan: "Letak permukiman dan benteng Bani Quraizhah di tenggara Madinah mengikuti peta Madinah aplikasi ini; bentuk dan jumlah benteng adalah ilustrasi. Keputusan atas Bani Quraizhah hanya diceritakan, tidak divisualkan. Angka pejuang Bani Quraizhah diperselisihkan (400 menurut HR. Tirmidzi 1582, 600–900 menurut kitab sirah).",
    medan: {
      ukuran: [3800, 3200], vertikal: 1.6, kasar: 3,
      fitur: [
        { id: "harrah-waqim", jenis: "harrah", nama: "Harrah Waqim", poly: QZ(HARRAH_WAQIM), h: 9, labelPos: [1700, 700] },
        { id: "kota", jenis: "kota", nama: "Madinah", pos: QZ([[0, 0]])[0], r: 600 },
        { id: "masjid", jenis: "masjid", nama: "Masjid Nabawi", pos: QZ([[0, 0]])[0] },
        { id: "b1", jenis: "benteng", nama: "Benteng-benteng Bani Quraizhah", pos: QZ([[1850, -1380]])[0], ukuran: [70, 60, 14], penting: true },
        { id: "b2", jenis: "benteng", pos: QZ([[2080, -1520]])[0], ukuran: [60, 60, 12] },
        { id: "b3", jenis: "benteng", pos: QZ([[1880, -1650]])[0], ukuran: [60, 50, 12] },
        { jenis: "kebun", poly: QZ([[1300, -900], [2300, -1000], [2500, -2100], [1300, -2200]]), rapat: 1.3 },
        { jenis: "kebun", poly: QZ([[300, -700], [1100, -700], [1200, -1700], [400, -1900]]), rapat: 1.0 },
        { id: "nadhir", jenis: "titik", nama: "Bekas permukiman Bani Nadhir", pos: QZ([[1650, -2650]])[0] },
        { id: "jalan", jenis: "jalan", pts: QZ([[50, -40], [600, -500], [1200, -1000], [1750, -1330]]), lebar: 25 }
      ]
    },
    unit: [
      { id: "m-utama", sisi: "muslim", nama: "Pasukan muslimin", jumlah: 2970, jenis: "infanteri" },
      { id: "m-kuda", sisi: "muslim", nama: "Pasukan berkuda", jumlah: 30, jenis: "kavaleri" },
      { id: "d-ali", sisi: "muslim", jenis: "tokoh", tokoh: "ali", nama: "Ali (pembawa panji)" },
      { id: "d-saad", sisi: "muslim", jenis: "tokoh", tokoh: "saadmuadz", nama: "Sa'ad bin Mu'adz" },
      { id: "q-quraizhah", sisi: "musuh", nama: "Pejuang Bani Quraizhah", jumlah: 600, jenis: "benteng", panglima: "kaabasad", sumber: "Ibnu Ishaq (600–700)" }
    ],
    fase: [
      { judul: "Perintah setelah Khandaq", waktu: "Dzulqa'dah 5 H",
        narasi: "Ketika Nabi ﷺ baru meletakkan senjata sepulang dari Khandaq, Jibril datang dan berkata bahwa para malaikat belum meletakkan senjata, lalu menunjuk ke arah Bani Quraizhah. Malaikat tidak digambarkan dalam simulasi ini.",
        derajat: "shahih", sumber: "HR. Bukhari no. 4117", url: SN("bukhari:4117"),
        posisi: {
          "m-utama": { pos: QZ([[50, 80]])[0], formasi: "bertahan" }, "m-kuda": { pos: QZ([[-250, 0]])[0], formasi: "bertahan" },
          "q-quraizhah": { pos: QZ([[1930, -1500]])[0], formasi: "bertahan" }, rasul: { pos: QZ([[0, 0]])[0] }
        },
        kamera: { target: [0, 0], jarak: 3900, sudut: 0, tinggi: 60 } },
      { judul: "Shalat Ashar di Bani Quraizhah", waktu: "Hari yang sama",
        narasi: "Nabi ﷺ berpesan, \"Janganlah seorang pun shalat Ashar kecuali di perkampungan Bani Quraizhah.\" Sebagian sahabat shalat di jalan dan sebagian menunggu sampai tiba; Nabi ﷺ tidak mencela kedua kelompok itu.",
        derajat: "shahih", sumber: "HR. Bukhari no. 4119", url: SN("bukhari:4119"),
        posisi: {
          "m-utama": { pos: QZ([[800, -560]])[0], arah: 130, formasi: "kolom" }, "m-kuda": { pos: QZ([[1150, -820]])[0], arah: 130, formasi: "kolom" },
          "d-ali": { pos: QZ([[1350, -1000]])[0], arah: 130 }, rasul: { pos: QZ([[600, -420]])[0] }
        },
        panah: [{ dari: QZ([[100, -50]])[0], ke: QZ([[1600, -1250]])[0], sisi: "muslim", label: "berangkat ke Bani Quraizhah" }],
        kamera: { target: [0, -200], jarak: 3200, sudut: 0, tinggi: 56 } },
      { judul: "Pengepungan", waktu: "Sekitar 25 malam",
        narasi: "Benteng Bani Quraizhah dikepung sekitar 25 malam. Pemimpin mereka, Ka'ab bin Asad, menawarkan beberapa jalan keluar kepada kaumnya, tetapi semuanya ditolak. Dua orang muslim gugur selama pengepungan.",
        derajat: "sirah", sumber: "Sirah Ibnu Hisyam; Wikipedia",
        posisi: {
          "m-utama": { pos: QZ([[1950, -1500]])[0], formasi: "lingkar", radius: 420 }, "m-kuda": { pos: QZ([[1400, -1100]])[0], formasi: "bertahan" },
          "d-ali": { pos: QZ([[1700, -1300]])[0], arah: 130 }, rasul: { pos: QZ([[1450, -1250]])[0] }
        },
        korban: { muslim: 2, musuh: null },
        sorot: ["b1"],
        kamera: { target: QZ([[1900, -1500]])[0], jarak: 1900, sudut: -15, tinggi: 46 } },
      { judul: "Keputusan Sa'ad bin Mu'adz", waktu: "Akhir pengepungan",
        narasi: "Bani Quraizhah menyerah dan bersedia menerima keputusan Sa'ad bin Mu'adz, yang sedang dirawat karena luka panah di Khandaq. Nabi ﷺ bersabda, \"Berdirilah untuk pemimpin kalian.\" Sa'ad memutuskan hukuman bagi pasukan tempur mereka dan keluarga mereka ditawan; Nabi ﷺ menyetujuinya.",
        derajat: "shahih", sumber: "HR. Bukhari no. 4121", url: SN("bukhari:4121"),
        posisi: {
          "q-quraizhah": { pos: QZ([[1600, -1250]])[0], formasi: "bertahan" }, "d-saad": { pos: QZ([[1350, -1080]])[0], arah: 130, aktif: true },
          "d-ali": { pos: QZ([[1500, -1150]])[0] }, rasul: { pos: QZ([[1300, -1000]])[0] }
        },
        panah: [{ dari: QZ([[200, -150]])[0], ke: QZ([[1300, -1050]])[0], sisi: "muslim", lengkung: 0.05, label: "Sa'ad didatangkan" }],
        sorot: ["d-saad"],
        kamera: { target: QZ([[1500, -1200]])[0], jarak: 1700, sudut: -10, tinggi: 44 } },
      { judul: "Wafatnya Sa'ad", waktu: "Tak lama kemudian",
        narasi: "Kaum muslimin kembali ke Madinah. Tak lama kemudian luka Sa'ad bin Mu'adz kembali terbuka dan ia wafat. Al-Ahzab 26 menyebut bahwa Allah menurunkan Ahli Kitab yang membantu pasukan sekutu dari benteng-benteng mereka.",
        derajat: "shahih", sumber: "HR. Bukhari no. 4122", url: SN("bukhari:4122"),
        posisi: {
          "m-utama": { pos: QZ([[150, -60]])[0], formasi: "bertahan" }, "m-kuda": { pos: QZ([[-200, 50]])[0] },
          "d-ali": { aktif: false }, "d-saad": { pos: QZ([[30, 40]])[0] }, "q-quraizhah": { aktif: false }, rasul: { pos: QZ([[0, 0]])[0] }
        },
        panah: [{ dari: QZ([[1500, -1200]])[0], ke: QZ([[200, -100]])[0], sisi: "muslim", label: "kembali ke Madinah" }],
        kamera: { target: [0, 0], jarak: 3900, sudut: 0, tinggi: 60 } }
    ]
  };

  // ===================== BANI AL-MUSHTHALIQ =====================
  S.mushthaliq = {
    catatan: "Mata air Al-Muraisi' berada di wilayah Qudaid, dekat pesisir antara Mekah dan Madinah; letak pastinya tidak diketahui. Kemah, ternak, dan susunan pasukan adalah ilustrasi. Jumlah Bani Al-Mushthaliq tidak tercatat, sehingga jumlah figur mereka hanya ilustrasi. Pembagian panji Muhajirin (Abu Bakar) dan Anshar (Sa'ad bin Ubadah) mengikuti kitab sirah; besar tiap kelompok tidak tercatat.",
    medan: {
      ukuran: [2400, 2000], vertikal: 1.5,
      fitur: [
        { id: "mataair", jenis: "mataair", nama: "Mata air Al-Muraisi'", pos: [0, 0], penting: true },
        { id: "kemah", jenis: "kemah", nama: "Perkemahan Bani Al-Mushthaliq", pos: [-180, -220], r: 220, warna: "gelap" },
        { id: "ternak", jenis: "ternak", nama: "Ternak yang sedang diberi minum", pos: [220, -60], r: 140 },
        { jenis: "bukit-pasir", pos: [-700, 450], r: 380, h: 12 },
        { jenis: "bukit-pasir", pos: [700, -600], r: 420, h: 14 },
        { jenis: "bukit", pos: [900, 700], r: 350, h: 40 },
        { jenis: "kebun", pos: [-60, 60], r: 110, rapat: 0.5 },
        { jenis: "arah", nama: "↗ Madinah", pos: [950, 880] },
        { jenis: "arah", nama: "← Pesisir Laut Merah", pos: [-1080, 0] }
      ]
    },
    unit: [
      { id: "m-muhajirin", sisi: "muslim", nama: "Muhajirin", jumlah: null, ilustrasi: 250, jenis: "infanteri", panglima: "abubakar" },
      { id: "m-anshar", sisi: "muslim", nama: "Anshar", jumlah: null, ilustrasi: 420, jenis: "infanteri", panglima: "saadubadah" },
      { id: "m-kuda", sisi: "muslim", nama: "Pasukan berkuda", jumlah: 30, jenis: "kavaleri" },
      { id: "q-mushthaliq", sisi: "musuh", nama: "Bani Al-Mushthaliq", jumlah: null, ilustrasi: 300, jenis: "infanteri", panglima: "Al-Harits bin Abi Dhirar" },
      { id: "q-tawanan", sisi: "musuh", nama: "Tawanan Bani Al-Mushthaliq", jumlah: null, ilustrasi: 200, jenis: "tawanan", panji: false, hitung: false },
      { id: "n-munafik", sisi: "netral", nama: "Abdullah bin Ubay dan kaum munafik", jumlah: null, ilustrasi: 120, jenis: "infanteri", panglima: "abdullahubay", hitung: false }
    ],
    fase: [
      { judul: "Kabar dari Al-Muraisi'", waktu: "Sya'ban 6 H (pendapat Ibnu Ishaq)",
        narasi: "Nabi ﷺ mendengar Al-Harits bin Abi Dhirar menghimpun kaumnya untuk menyerang Madinah. Setelah kabar itu dipastikan, beliau berangkat bersama sekitar 700 orang, dan banyak orang munafik ikut serta.",
        derajat: "sirah", sumber: "Sirah Ibnu Hisyam; Al-Waqidi",
        posisi: {
          "m-muhajirin": { pos: [650, 620], arah: 225, formasi: "kolom" }, "m-anshar": { pos: [820, 760], arah: 225, formasi: "kolom" }, "m-kuda": { pos: [520, 500], arah: 225, formasi: "kolom" },
          "n-munafik": { pos: [980, 880], arah: 225, formasi: "kolom" },
          "q-mushthaliq": { pos: [-200, -250], formasi: "bertahan" }, rasul: { pos: [700, 690] }
        },
        panah: [{ dari: [1050, 950], ke: [300, 280], sisi: "muslim" }],
        kamera: { target: [150, 100], jarak: 2500, sudut: 0, tinggi: 56 } },
      { judul: "Serangan di mata air", waktu: "Saat ternak diberi minum",
        narasi: "Kaum muslimin menyerang Bani Al-Mushthaliq di dekat mata air Al-Muraisi' ketika ternak mereka sedang diberi minum. Pertempurannya singkat; sebagian tewas dan selebihnya ditawan. Seorang muslim terbunuh karena salah sasaran.",
        derajat: "shahih", sumber: "HR. Bukhari no. 2541", url: SN("bukhari:2541"),
        posisi: {
          "m-muhajirin": { pos: [-60, 250], arah: 200, formasi: "shaf" }, "m-anshar": { pos: [260, 220], arah: 210, formasi: "shaf" }, "m-kuda": { pos: [-380, 120], arah: 160, formasi: "kolom" },
          "n-munafik": { pos: [700, 650], formasi: "bertahan" },
          "q-mushthaliq": { pos: [-120, -120], formasi: "tersebar" }, rasul: { pos: [150, 400] }
        },
        panah: [{ dari: [400, 480], ke: [-20, -20], sisi: "muslim" }, { dari: [-450, 200], ke: [-300, -200], sisi: "muslim", lengkung: -0.2 }],
        korban: { muslim: 1, musuh: null },
        kamera: { target: [0, 50], jarak: 1700, sudut: -15, tinggi: 46 } },
      { judul: "Juwairiyah dan pembebasan tawanan", waktu: "Setelah pertempuran",
        narasi: "Juwairiyah binti Al-Harits termasuk tawanan. Nabi ﷺ menikahinya, lalu para sahabat membebaskan tawanan dari kaumnya karena mereka kini kerabat istri Nabi ﷺ; menurut riwayat Abu Dawud, sekitar seratus keluarga dibebaskan.",
        derajat: "shahih", sumber: "HR. Bukhari no. 2541", url: SN("bukhari:2541"),
        posisi: {
          "q-mushthaliq": { aktif: false }, "q-tawanan": { pos: [260, -280], formasi: "bertahan", aktif: true },
          "m-muhajirin": { pos: [-100, 280], formasi: "bertahan" }, "m-anshar": { pos: [300, 250], formasi: "bertahan" }, "m-kuda": { pos: [-350, 200] }
        },
        kamera: { target: [50, 0], jarak: 1800, sudut: 0, tinggi: 50 } },
      { judul: "Ucapan Abdullah bin Ubay", waktu: "Di mata air",
        narasi: "Di mata air terjadi perselisihan antara seorang Muhajirin dan seorang Anshar. Abdullah bin Ubay berkata bahwa jika kembali ke Madinah, orang yang mulia akan mengusir orang yang hina. Umar meminta izin menghukumnya, tetapi Nabi ﷺ menolak; lalu turun Al-Munafiqun 8.",
        derajat: "shahih", sumber: "HR. Bukhari no. 4905", url: SN("bukhari:4905"),
        posisi: {
          "q-tawanan": { aktif: false }, "n-munafik": { pos: [-380, 260], formasi: "bertahan" },
          "m-muhajirin": { pos: [-60, 170], formasi: "bertahan" }, "m-anshar": { pos: [220, 160], formasi: "bertahan" }, rasul: { pos: [120, 330] }
        },
        sorot: ["mataair", "n-munafik"],
        kamera: { target: [0, 100], jarak: 1500, sudut: 10, tinggi: 46 } },
      { judul: "Pulang ke Madinah", waktu: "Perjalanan pulang",
        narasi: "Dalam perjalanan pulang, Aisyah tertinggal rombongan karena mencari kalungnya, lalu diantar pulang oleh Shafwan bin Al-Mu'aththal. Kaum munafik menyebarkan fitnah, sampai Allah menurunkan An-Nur 11–20 yang membersihkan namanya (haditsul ifki).",
        derajat: "shahih", sumber: "HR. Bukhari no. 4750", url: SN("bukhari:4750"),
        posisi: {
          "m-muhajirin": { pos: [650, 640], arah: 45, formasi: "kolom" }, "m-anshar": { pos: [820, 760], arah: 45, formasi: "kolom" }, "m-kuda": { pos: [500, 520], arah: 45, formasi: "kolom" },
          "n-munafik": { pos: [980, 880], arah: 45, formasi: "kolom" }, rasul: { pos: [700, 700] }
        },
        panah: [{ dari: [100, 150], ke: [1000, 900], sisi: "muslim", label: "pulang ke Madinah" }],
        kamera: { target: [300, 300], jarak: 2500, sudut: 0, tinggi: 56 } }
    ]
  };

  // ===================== KHAIBAR =====================
  S.khaibar = {
    catatan: "Tata letak tiga kelompok benteng (An-Nathah, Asy-Syiqq, Al-Katibah), kebun kurma, dan Harrah Khaibar adalah rekonstruksi ilustratif berdasarkan kitab sirah dan Wikipedia; jaraknya diperpendek. Perkemahan di Ar-Raji' (di antara Khaibar dan wilayah Ghathafan) mengikuti kitab sirah. Angka 10.000 pejuang Khaibar adalah perkiraan, dan pembagiannya ke tiga kelompok tidak tercatat. Pembunuh Marhab menurut HR. Muslim 1807a adalah Ali; menurut Ibnu Ishaq Muhammad bin Maslamah.",
    medan: {
      ukuran: [6000, 5000], vertikal: 1.8, kasar: 4,
      fitur: [
        { id: "harrah", jenis: "harrah", nama: "Harrah Khaibar", poly: [[1200, 2600], [3100, 2600], [3100, -400], [2300, -250], [1700, 500], [1300, 1500]], h: 14, labelPos: [2500, 1100] },
        { jenis: "kebun", poly: [[-2300, 1500], [700, 1700], [900, 400], [300, -300], [-1300, -1300], [-2600, -900]], rapat: 1.3 },
        { jenis: "kebun", poly: [[700, -500], [2300, -650], [2500, -1700], [800, -1800]], rapat: 1.1 },
        { jenis: "wadi", pts: [[-2900, 1900], [-1300, 900], [0, 250], [1200, -850], [2900, -2100]], lebar: 90, dalam: 4 },
        { id: "naim", jenis: "benteng", nama: "Na'im (An-Nathah)", pos: [-300, 900], ukuran: [80, 70, 14], penting: true },
        { id: "shab", jenis: "benteng", nama: "Ash-Sha'b bin Mu'adz", pos: [120, 1120], ukuran: [70, 70, 14] },
        { id: "zubair-q", jenis: "benteng", nama: "Qal'at Az-Zubair", pos: [450, 1450], ukuran: [60, 60, 16] },
        { jenis: "bukit", pos: [450, 1450], r: 150, h: 35 },
        { id: "ubay", jenis: "benteng", nama: "Ubay (Asy-Syiqq)", pos: [-1500, -300], ukuran: [70, 60, 13] },
        { id: "nizar", jenis: "benteng", nama: "An-Nizar", pos: [-1800, -650], ukuran: [70, 60, 13] },
        { id: "qamush", jenis: "benteng", nama: "Al-Qamush (Al-Katibah)", pos: [1300, -1100], ukuran: [90, 80, 16], penting: true },
        { jenis: "bukit", pos: [1300, -1100], r: 180, h: 45 },
        { id: "wathih", jenis: "benteng", nama: "Al-Wathih", pos: [1720, -1400], ukuran: [60, 60, 13] },
        { id: "sulalim", jenis: "benteng", nama: "As-Sulalim", pos: [2050, -1100], ukuran: [60, 60, 13] },
        { id: "raji", jenis: "kemah", nama: "Perkemahan di Ar-Raji'", pos: [2250, 1700], r: 220 },
        { jenis: "arah", nama: "↘ Madinah (±150 km)", pos: [2650, -2250] },
        { jenis: "arah", nama: "↗ Wilayah Ghathafan", pos: [2700, 2350] }
      ]
    },
    unit: [
      { id: "m-utama", sisi: "muslim", nama: "Pasukan muslimin", jumlah: 1200, jenis: "infanteri" },
      { id: "m-kuda", sisi: "muslim", nama: "Pasukan berkuda", jumlah: 200, jenis: "kavaleri" },
      { id: "d-ali", sisi: "muslim", jenis: "tokoh", tokoh: "ali", nama: "Ali" },
      { id: "q-nathah", sisi: "musuh", nama: "Pembela An-Nathah", jumlah: null, ilustrasi: 4000, jenis: "benteng" },
      { id: "q-syiqq", sisi: "musuh", nama: "Pembela Asy-Syiqq", jumlah: null, ilustrasi: 3000, jenis: "benteng" },
      { id: "q-katibah", sisi: "musuh", nama: "Pembela Al-Katibah", jumlah: null, ilustrasi: 3000, jenis: "benteng", panglima: "Kinanah bin Ar-Rabi' bin Abil Huqaiq" },
      { id: "d-marhab", sisi: "musuh", jenis: "tokoh", tokoh: "marhab", nama: "Marhab" },
      { id: "q-ghathafan", sisi: "musuh", nama: "Sekutu Ghathafan (tidak jadi datang)", jumlah: 4000, jenis: "unta", hitung: false }
    ],
    fase: [
      { judul: "Berangkat dari Madinah", waktu: "Akhir Muharram 7 H",
        narasi: "Nabi ﷺ berangkat bersama para peserta Hudaibiyah, sekitar 1.400 orang. Menurut kitab sirah, pasukan berkemah di Ar-Raji', di antara Khaibar dan wilayah Ghathafan, agar sekutu itu tidak bisa membantu.",
        derajat: "sirah", sumber: "Sirah Ibnu Hisyam; Wikipedia",
        posisi: {
          "m-utama": { pos: [2300, -1500], arah: 0, formasi: "kolom" }, "m-kuda": { pos: [2450, -1200], arah: 0, formasi: "kolom" },
          "q-nathah": { pos: [80, 1150], formasi: "lingkar", radius: 380 }, "q-syiqq": { pos: [-1650, -470], formasi: "lingkar", radius: 260 }, "q-katibah": { pos: [1680, -1200], formasi: "lingkar", radius: 380 },
          "q-ghathafan": { pos: [2650, 2250], arah: 225, formasi: "kolom" }, rasul: { pos: [2350, -1350] }
        },
        panah: [{ dari: [2550, -2100], ke: [2280, 1450], sisi: "muslim", lengkung: -0.08, label: "menuju Ar-Raji'" }],
        kamera: { target: [300, 0], jarak: 6300, sudut: 0, tinggi: 60 } },
      { judul: "Pagi di Khaibar", waktu: "Subuh",
        narasi: "Pasukan tiba malam hari dan bergerak di pagi hari ketika penduduk keluar ke ladang. Melihat pasukan, mereka berseru, \"Muhammad dan pasukannya!\" lalu berlindung di benteng. Nabi ﷺ bertakbir, \"Allahu akbar, binasalah Khaibar.\"",
        derajat: "shahih", sumber: "HR. Bukhari no. 371", url: SN("bukhari:371"),
        posisi: {
          "m-utama": { pos: [800, 650], arah: 290, formasi: "shaf" }, "m-kuda": { pos: [950, 950], arah: 290, formasi: "kolom" },
          "q-nathah": { pos: [250, 750], formasi: "tersebar" }, "q-ghathafan": { aktif: false }, rasul: { pos: [1000, 600] }
        },
        panah: [{ dari: [2150, 1500], ke: [950, 700], sisi: "muslim" }, { dari: [300, 650], ke: [-150, 1000], sisi: "musuh", lengkung: -0.2, label: "berlindung ke benteng" }],
        kamera: { target: [400, 800], jarak: 3200, sudut: -10, tinggi: 50 } },
      { judul: "Benteng-benteng dikepung", waktu: "Belasan hari",
        narasi: "Benteng-benteng Khaibar dikepung dan direbut satu per satu, mulai dari kawasan An-Nathah dan Asy-Syiqq, lalu benteng Al-Qamush yang kokoh. Benteng terakhir, Al-Wathih dan As-Sulalim, menyerah dengan perjanjian.",
        derajat: "sirah", sumber: "Wikipedia; kitab sirah",
        posisi: {
          "m-utama": { pos: [80, 1150], formasi: "lingkar", radius: 650 }, "m-kuda": { pos: [-900, 100], arah: 225, formasi: "kolom" },
          "q-nathah": { pos: [80, 1150], formasi: "lingkar", radius: 380 }, rasul: { pos: [700, 500] }
        },
        panah: [{ dari: [-600, 400], ke: [-1450, -250], sisi: "muslim", label: "lalu Asy-Syiqq" }, { dari: [500, 300], ke: [1250, -950], sisi: "muslim", lengkung: -0.15, label: "lalu Al-Katibah" }],
        sorot: ["naim", "ubay", "qamush"],
        kamera: { target: [0, 100], jarak: 5200, sudut: 0, tinggi: 58 } },
      { judul: "Panji untuk Ali", waktu: "Pengepungan An-Nathah",
        narasi: "Nabi ﷺ bersabda, \"Besok akan kuserahkan panji ini kepada seseorang yang melalui tangannya Allah memberi kemenangan.\" Panji itu diberikan kepada Ali, yang sedang sakit mata lalu sembuh setelah didoakan.",
        derajat: "shahih", sumber: "HR. Bukhari no. 4210", url: SN("bukhari:4210"),
        posisi: {
          "m-utama": { pos: [-150, 560], arah: 340, formasi: "shaf" }, "m-kuda": { pos: [350, 600], arah: 330, formasi: "kolom" },
          "d-ali": { pos: [-260, 720], arah: 350 }, rasul: { pos: [-100, 420] }
        },
        sorot: ["d-ali", "naim"],
        kamera: { target: [-200, 750], jarak: 1700, sudut: -15, tinggi: 42 } },
      { judul: "Marhab", waktu: "Pengepungan An-Nathah",
        narasi: "Marhab, jagoan Khaibar, keluar menantang duel. Amir bin Al-Akwa' gugur saat menghadapinya, lalu Ali maju dan mengalahkan Marhab. Menurut Ibnu Ishaq, yang mengalahkannya adalah Muhammad bin Maslamah.",
        derajat: "shahih", sumber: "HR. Muslim no. 1807a", url: SN("muslim:1807a"),
        posisi: {
          "d-marhab": { pos: [-280, 830], arah: 170 }, "d-ali": { pos: [-270, 745], arah: 350 }
        },
        sorot: ["d-ali", "d-marhab"],
        kamera: { target: [-260, 790], jarak: 900, sudut: -20, tinggi: 34 } },
      { judul: "Perjanjian dan sesudahnya", waktu: "Akhir Shafar 7 H",
        narasi: "Penduduk Khaibar dibiarkan menggarap tanah dengan bagi hasil separuh panen. Shafiyyah binti Huyay dimerdekakan lalu dinikahi Nabi ﷺ. Saat itu pula rombongan Ja'far bin Abi Thalib tiba dari Habasyah.",
        derajat: "shahih", sumber: "HR. Bukhari no. 2285; HR. Bukhari no. 371", url: SN("bukhari:2285"),
        posisi: {
          "m-utama": { pos: [1680, -1200], formasi: "lingkar", radius: 650 }, "m-kuda": { pos: [900, -700], formasi: "bertahan" },
          "q-nathah": { aktif: false }, "q-syiqq": { aktif: false }, "d-marhab": { aktif: false }, "d-ali": { aktif: false },
          "q-katibah": { pos: [1680, -1200], formasi: "lingkar", radius: 330 }, rasul: { pos: [1000, -900] }
        },
        korban: { muslim: 18, musuh: 93 },
        sorot: ["qamush", "wathih", "sulalim"],
        kamera: { target: [1300, -900], jarak: 3000, sudut: 0, tinggi: 52 } }
    ]
  };

  // ===================== FATHU MAKKAH =====================
  // Titik nol = Ka'bah; koordinat mengikuti peta Mekah aplikasi ini (city-data.js).
  S.fathumakkah = {
    catatan: "Arah masuk empat kelompok mengikuti Ibnu Ishaq dan Ar-Rahiq Al-Makhtum: Az-Zubair dari Mekah bagian atas (Kada') dan menancapkan panji di Al-Hajun, Khalid dari Mekah bagian bawah, Abu Ubaidah memimpin pejalan kaki lewat dasar lembah, dan Sa'ad bin Ubadah (lalu panjinya diserahkan kepada putranya, Qais) bersama Anshar dari sisi lain. HR. Bukhari 4280 justru menyebut Khalid masuk dari atas; perbedaan ini dicatat dalam data perang. Letak Khandamah mengikuti peta Mekah aplikasi ini, sehingga jalur Khalid digambar memutar dari tenggara. Pembagian 10.000 orang ke empat kelompok tidak tercatat. Marr Azh-Zhahran (±20 km) digeser ke tepi meja.",
    medan: {
      ukuran: [8000, 8400], vertikal: 1.6, kasar: 4,
      fitur: [
        { id: "kabah", jenis: "kabah", nama: "Ka'bah", pos: [0, 0], penting: true },
        { id: "berhala", jenis: "berhala", pos: [0, 0], r: 60, jumlah: 72, fase: [0, 4] },
        { id: "kota", jenis: "kota", pos: [80, 120], r: 650 },
        { id: "abuqubais", jenis: "gunung", nama: "Abu Qubais", pos: [430, -260], r: 300, h: 130 },
        { id: "quaiqian", jenis: "gunung", nama: "Qu'aiqi'an", pos: [-480, 180], r: 300, h: 110 },
        { id: "khandamah", jenis: "gunung", nama: "Khandamah", pos: [820, 470], r: 280, h: 120, penting: true },
        { id: "jabalnur", jenis: "gunung", nama: "Jabal Nur", pos: [3616, 3943], r: 280, h: 260 },
        { jenis: "gunung", pos: [-1700, 1300], r: 700, h: 170 }, { jenis: "gunung", pos: [1800, -1500], r: 750, h: 190 },
        { jenis: "gunung", pos: [-1700, -1800], r: 650, h: 160 }, { jenis: "gunung", pos: [2300, 1500], r: 700, h: 170 },
        { jenis: "gunung", pos: [-200, 2700], r: 600, h: 140 }, { jenis: "gunung", pos: [2800, -200], r: 550, h: 160 },
        { jenis: "gunung", pos: [-3200, 300], r: 700, h: 150 }, { jenis: "gunung", pos: [600, -3300], r: 800, h: 170 },
        { id: "hajun", jenis: "titik", nama: "Al-Hajun (perkemahan Nabi ﷺ)", pos: [330, 1150], penting: true },
        { id: "rumah-abusufyan", jenis: "titik", nama: "Rumah Abu Sufyan", pos: [174, 90], fase: [3, 5] },
        { id: "jalan-atas", jenis: "jalan", nama: "Jalan dari arah Madinah (Kada')", pts: [[120, 340], [300, 1000], [250, 1800], [-500, 3000], [-2400, 3800], [-3500, 3900]], lebar: 45, labelT: 0.55 },
        { id: "jalan-bawah", jenis: "jalan", nama: "Jalan Mekah bagian bawah (Al-Lith)", pts: [[40, -45], [10, -330], [-60, -820], [-200, -2000], [-300, -4000]], lebar: 40, labelT: 0.6 },
        { id: "jalan-barat", jenis: "jalan", pts: [[-38, -12], [-300, -190], [-560, -380], [-1500, -700], [-3800, -1000]], lebar: 40 },
        { id: "marr", jenis: "kemah", nama: "Marr Azh-Zhahran (±20 km, digeser ke tepi)", pos: [-3300, 3500], r: 420 },
        { jenis: "arah", nama: "↖ Madinah", pos: [-3600, 4050] }
      ]
    },
    unit: [
      { id: "c-zubair", sisi: "muslim", nama: "Kelompok Az-Zubair", jumlah: null, ilustrasi: 2500, jenis: "kavaleri", panglima: "zubair" },
      { id: "c-khalid", sisi: "muslim", nama: "Kelompok Khalid bin Walid", jumlah: null, ilustrasi: 2500, jenis: "infanteri", panglima: "khalid" },
      { id: "c-abuubaidah", sisi: "muslim", nama: "Pejalan kaki Abu Ubaidah", jumlah: null, ilustrasi: 2500, jenis: "infanteri", panglima: "abuubaidah" },
      { id: "c-saad", sisi: "muslim", nama: "Anshar (Sa'ad bin Ubadah)", jumlah: null, ilustrasi: 2500, jenis: "infanteri", panglima: "saadubadah" },
      { id: "d-abusufyan", sisi: "netral", jenis: "tokoh", tokoh: "abusufyan", nama: "Abu Sufyan" },
      { id: "q-perlawanan", sisi: "musuh", nama: "Kelompok Ikrimah, Shafwan, dan Suhail", jumlah: null, ilustrasi: 150, jenis: "infanteri", panglima: "ikrimah" }
    ],
    fase: [
      { judul: "Perjanjian dilanggar", waktu: "Sya'ban 8 H",
        narasi: "Bani Bakar, sekutu Quraisy, menyerang Khuza'ah, sekutu kaum muslimin, dengan bantuan sebagian orang Quraisy. Perjanjian Hudaibiyah pun batal (kitab sirah).",
        derajat: "sirah", sumber: "Sirah Ibnu Hisyam",
        posisi: {},
        sorot: ["kabah"],
        kamera: { target: [0, 300], jarak: 5200, sudut: 0, tinggi: 58 } },
      { judul: "Persiapan rahasia", waktu: "Ramadhan 8 H",
        narasi: "Nabi ﷺ menyiapkan pasukan secara rahasia. Hathib bin Abi Balta'ah sempat mengirim surat peringatan kepada Quraisy; Ali, Az-Zubair, dan Al-Miqdad mencegat pembawa surat itu. Pasukan sekitar 10.000 orang berangkat di bulan Ramadhan.",
        derajat: "shahih", sumber: "HR. Bukhari no. 3007", url: SN("bukhari:3007"),
        posisi: {
          "c-zubair": { pos: [-3300, 4050], arah: 110, formasi: "kolom" }, "c-khalid": { pos: [-3700, 3950], arah: 110, formasi: "kolom" },
          "c-abuubaidah": { pos: [-3500, 3750], arah: 110, formasi: "kolom" }, "c-saad": { pos: [-3800, 3650], arah: 110, formasi: "kolom" },
          rasul: { pos: [-3400, 3900] }
        },
        kamera: { target: [-1500, 2200], jarak: 6500, sudut: 0, tinggi: 58 } },
      { judul: "Marr Azh-Zhahran", waktu: "Malam sebelum masuk Mekah",
        narasi: "Pasukan berkemah di Marr Azh-Zhahran dan menyalakan banyak api. Abu Sufyan yang keluar mencari kabar tertangkap penjaga, lalu masuk Islam dan menyaksikan kabilah-kabilah lewat satu per satu.",
        derajat: "shahih", sumber: "HR. Bukhari no. 4280", url: SN("bukhari:4280"),
        posisi: {
          "c-zubair": { pos: [-3050, 3650], formasi: "bertahan" }, "c-khalid": { pos: [-3550, 3700], formasi: "bertahan" },
          "c-abuubaidah": { pos: [-3200, 3300], formasi: "bertahan" }, "c-saad": { pos: [-3600, 3300], formasi: "bertahan" },
          "d-abusufyan": { pos: [-2900, 3350], arah: 290 }, rasul: { pos: [-3300, 3500] }
        },
        sorot: ["marr", "d-abusufyan"],
        kamera: { target: [-3100, 3400], jarak: 2600, sudut: 0, tinggi: 50 } },
      { judul: "Masuk dari beberapa arah", waktu: "Sekitar 20 Ramadhan 8 H",
        narasi: "Pasukan dibagi: Az-Zubair masuk dari Mekah bagian atas, Khalid dari bagian bawah, Abu Ubaidah memimpin pejalan kaki lewat dasar lembah. Nabi ﷺ menjamin keamanan bagi siapa saja yang masuk ke rumah Abu Sufyan, menutup pintu rumahnya, atau masuk Masjidil Haram.",
        derajat: "shahih", sumber: "HR. Muslim no. 1780a", url: SN("muslim:1780a"),
        posisi: {
          "c-zubair": { pos: [300, 1500], arah: 195, formasi: "kolom" }, "c-khalid": { pos: [1500, -1300], arah: 320, formasi: "kolom" },
          "c-abuubaidah": { pos: [-650, 1000], arah: 150, formasi: "kolom" }, "c-saad": { pos: [-1500, -550], arah: 70, formasi: "kolom" },
          "d-abusufyan": { pos: [174, 140] }, "q-perlawanan": { pos: [760, 430], formasi: "tersebar", aktif: true }, rasul: { pos: [330, 1150] }
        },
        panah: [{ dari: [-1800, 3300], ke: [300, 1400], sisi: "muslim", lengkung: 0.12, label: "Az-Zubair dari atas" }, { dari: [-300, -3400], ke: [1450, -1200], sisi: "muslim", lengkung: -0.15, label: "Khalid dari bawah" },
          { dari: [-2400, 2600], ke: [-650, 900], sisi: "muslim", lengkung: 0.05, label: "Abu Ubaidah" }, { dari: [-3500, -900], ke: [-1450, -500], sisi: "muslim", lengkung: 0.05, label: "Anshar" }],
        sorot: ["hajun", "rumah-abusufyan"],
        kamera: { target: [0, 0], jarak: 5600, sudut: 0, tinggi: 60 } },
      { judul: "Bentrokan di Khandamah", waktu: "Hari masuk Mekah",
        narasi: "Hanya pasukan Khalid yang menghadapi perlawanan, dari kelompok Ikrimah, Shafwan, dan Suhail di Khandamah. Sekitar 12–13 orang Quraisy tewas, dan dua orang dari pasukan Khalid gugur.",
        derajat: "shahih", sumber: "HR. Bukhari no. 4280", url: SN("bukhari:4280"),
        posisi: {
          "c-khalid": { pos: [950, 250], arah: 330, formasi: "tersebar" }, "q-perlawanan": { pos: [790, 470], formasi: "tersebar" },
          "c-zubair": { pos: [330, 1000], formasi: "bertahan" }, "c-abuubaidah": { pos: [-350, 550], arah: 150, formasi: "kolom" }, "c-saad": { pos: [-700, -300], arah: 60, formasi: "kolom" }
        },
        panah: [{ dari: [1400, -500], ke: [920, 300], sisi: "muslim", lengkung: -0.1 }],
        korban: { muslim: 2, musuh: 12 },
        sorot: ["khandamah", "c-khalid", "q-perlawanan"],
        kamera: { target: [600, 300], jarak: 2200, sudut: -10, tinggi: 46 } },
      { judul: "Ka'bah dibersihkan", waktu: "Hari pembebasan",
        narasi: "Nabi ﷺ thawaf dan menjatuhkan 360 berhala di sekitar Ka'bah sambil membaca, \"Kebenaran telah datang dan yang batil telah lenyap.\" Penduduk Mekah diberi pengampunan, dan menurut kitab sirah Bilal mengumandangkan adzan di atas Ka'bah.",
        derajat: "shahih", sumber: "HR. Bukhari no. 4287", url: SN("bukhari:4287"),
        posisi: {
          "c-zubair": { pos: [0, 0], formasi: "lingkar", radius: 260 }, "c-khalid": { pos: [0, 0], formasi: "lingkar", radius: 420 },
          "c-abuubaidah": { pos: [0, 0], formasi: "lingkar", radius: 580 }, "c-saad": { pos: [0, 0], formasi: "lingkar", radius: 740 },
          "q-perlawanan": { aktif: false }, "d-abusufyan": { pos: [200, 150] }, rasul: { pos: [0, 0] }
        },
        sorot: ["kabah"],
        kamera: { target: [0, 0], jarak: 2600, sudut: -10, tinggi: 52 } }
    ]
  };

  // ===================== HUNAIN =====================
  S.hunain = {
    catatan: "Lembah Hunain digambarkan sebagai lembah sempit dengan lereng di kedua sisi, tempat pemanah Hawazin bersembunyi; bentuknya ilustratif. Angka sekitar 20.000 pasukan Hawazin dan Tsaqif serta sekitar 4.000 penyergap berasal dari Wikipedia dan buku sirah modern, bukan sumber klasik, sehingga per satuan ditulis tidak tercatat. Pembagian pasukan muslim ke barisan depan (Bani Sulaim di bawah Khalid) dan pasukan utama adalah ilustrasi; 2.000 penduduk Mekah yang baru masuk Islam mengikuti Wikipedia.",
    medan: {
      ukuran: [5000, 3400], vertikal: 1.5,
      fitur: [
        { id: "lereng-utara", jenis: "lereng", nama: "Lereng utara", ridge: [[-2400, 900], [2400, 760]], lebar: 950, h: 170, labelPos: [-600, 700] },
        { id: "lereng-selatan", jenis: "lereng", nama: "Lereng selatan", ridge: [[-2400, -900], [2400, -760]], lebar: 950, h: 170, labelPos: [-600, -700] },
        { jenis: "bukit", pos: [500, 440], r: 300, h: 95 }, { jenis: "bukit", pos: [700, -430], r: 300, h: 95 },
        { id: "wadi", jenis: "wadi", nama: "Lembah Hunain", pts: [[-2500, 0], [-1000, 30], [0, 0], [1200, -30], [2500, 0]], lebar: 110, dalam: 4, labelT: 0.35, penting: true },
        { id: "kemah", jenis: "kemah", nama: "Kemah Hawazin bersama keluarga", pos: [1950, 60], r: 260, warna: "gelap" },
        { id: "ternak", jenis: "ternak", nama: "Ternak Hawazin", pos: [2100, -280], r: 220 },
        { id: "jiranah", jenis: "titik", nama: "Al-Ji'ranah (arah Mekah)", pos: [-2250, 260], penting: true },
        { jenis: "arah", nama: "← Mekah", pos: [-2350, -120] },
        { jenis: "arah", nama: "Thaif →", pos: [2300, -1250] },
        { jenis: "arah", nama: "↗ Awthas", pos: [2250, 1300] }
      ]
    },
    unit: [
      { id: "m-depan", sisi: "muslim", nama: "Barisan depan (Bani Sulaim)", jumlah: null, ilustrasi: 1000, jenis: "kavaleri", panglima: "khalid" },
      { id: "m-utama", sisi: "muslim", nama: "Pasukan utama", jumlah: null, ilustrasi: 9000, jenis: "infanteri" },
      { id: "m-thulaqa", sisi: "muslim", nama: "Penduduk Mekah yang baru masuk Islam", jumlah: 2000, jenis: "infanteri" },
      { id: "m-teguh", sisi: "muslim", nama: "Yang tetap bersama Nabi ﷺ", jumlah: null, ilustrasi: 80, jenis: "infanteri", panji: false, hitung: false },
      { id: "d-abbas", sisi: "muslim", jenis: "tokoh", tokoh: "abbas", nama: "Al-Abbas" },
      { id: "q-utama", sisi: "musuh", nama: "Pasukan utama Hawazin dan Tsaqif", jumlah: null, ilustrasi: 16000, jenis: "infanteri", panglima: "malikauf" },
      { id: "q-utara", sisi: "musuh", nama: "Penyergap lereng utara", jumlah: null, ilustrasi: 2000, jenis: "pemanah" },
      { id: "q-selatan", sisi: "musuh", nama: "Penyergap lereng selatan", jumlah: null, ilustrasi: 2000, jenis: "pemanah" },
      { id: "q-tawanan", sisi: "musuh", nama: "Tawanan dan ternak rampasan", jumlah: 6000, jenis: "tawanan", panji: false, hitung: false }
    ],
    fase: [
      { judul: "Hawazin berhimpun", waktu: "Syawal 8 H",
        narasi: "Malik bin Auf An-Nashri menghimpun Hawazin dan Tsaqif dan membawa serta perempuan, anak-anak, serta ternak agar pasukannya tidak lari. Duraid bin Ash-Shimmah, tokoh tua yang berpengalaman, tidak setuju dengan siasat itu (kitab sirah).",
        derajat: "sirah", sumber: "Sirah Ibnu Hisyam",
        posisi: {
          "q-utama": { pos: [1700, 60], arah: 270, formasi: "bertahan" }, "q-utara": { pos: [1450, 380], arah: 270, formasi: "bertahan" }, "q-selatan": { pos: [1450, -280], arah: 270, formasi: "bertahan" }
        },
        sorot: ["kemah", "ternak"],
        kamera: { target: [1000, 0], jarak: 3600, sudut: 0, tinggi: 54 } },
      { judul: "Berangkat dari Mekah", waktu: "Awal Syawal 8 H",
        narasi: "Nabi ﷺ keluar dari Mekah bersama 12.000 orang. Malam itu para pemanah Hawazin bersembunyi di lereng-lereng lembah. Al-Qur'an mengingatkan bahwa saat itu jumlah yang banyak membuat kaum muslimin bangga (At-Taubah 25).",
        derajat: "sirah", sumber: "Sirah Ibnu Hisyam; QS. At-Taubah: 25",
        posisi: {
          "m-depan": { pos: [-1300, 20], arah: 90, formasi: "kolom" }, "m-utama": { pos: [-1900, 10], arah: 90, formasi: "kolom" }, "m-thulaqa": { pos: [-2250, -40], arah: 90, formasi: "kolom" },
          "q-utara": { pos: [500, 560], arah: 200, formasi: "tersebar" }, "q-selatan": { pos: [700, -560], arah: 340, formasi: "tersebar" },
          rasul: { pos: [-1650, 60] }
        },
        panah: [{ dari: [-2450, 0], ke: [-1100, 20], sisi: "muslim", lengkung: 0.02 }, { dari: [1500, 380], ke: [600, 560], sisi: "musuh", lengkung: 0.1 }, { dari: [1500, -300], ke: [800, -560], sisi: "musuh", lengkung: -0.1 }],
        sorot: ["q-utara", "q-selatan"],
        kamera: { target: [-300, 0], jarak: 4800, sudut: 0, tinggi: 54 } },
      { judul: "Disergap di lembah", waktu: "Subuh, 10 Syawal 8 H",
        narasi: "Saat subuh, pasukan muslim turun ke lembah dan disambut hujan anak panah dari para pemanah yang bersembunyi. Barisan depan lari dan sebagian besar pasukan kocar-kacir.",
        derajat: "shahih", sumber: "HR. Bukhari no. 2864; HR. Bukhari no. 4337", url: SN("bukhari:2864"),
        posisi: {
          "m-depan": { pos: [-700, 120], arah: 270, formasi: "tersebar" }, "m-utama": { pos: [-1100, -40], arah: 270, formasi: "tersebar" }, "m-thulaqa": { pos: [-1500, 60], arah: 270, formasi: "tersebar" },
          "m-teguh": { pos: [-350, 0], formasi: "lingkar", radius: 45, aktif: true }, "d-abbas": { pos: [-300, 70], arah: 270 },
          "q-utama": { pos: [900, 0], arah: 270, formasi: "shaf" }, rasul: { pos: [-350, 0] }
        },
        panah: [{ dari: [500, 520], ke: [0, 90], sisi: "musuh", lengkung: 0.1 }, { dari: [700, -520], ke: [100, -90], sisi: "musuh", lengkung: -0.1 }, { dari: [-200, 60], ke: [-1500, 80], sisi: "muslim", lengkung: 0.05, putus: true, label: "barisan mundur" }],
        kamera: { target: [-200, 0], jarak: 3200, sudut: -8, tinggi: 46 } },
      { judul: "Nabi ﷺ tetap teguh", waktu: "Pagi yang sama",
        narasi: "Nabi ﷺ tetap di atas bagal putihnya dan berseru, \"Aku adalah Nabi, tidak dusta; aku putra Abdul Muthalib.\" Al-Abbas yang bersuara lantang memanggil para sahabat yang dulu berbaiat di bawah pohon, lalu kaum Anshar, dan mereka pun kembali.",
        derajat: "shahih", sumber: "HR. Bukhari no. 2864; HR. Muslim no. 1775a", url: SN("muslim:1775a"),
        posisi: {
          "m-utama": { pos: [-700, 0], arah: 90, formasi: "kolom" }, "m-depan": { pos: [-1000, 300], arah: 90, formasi: "kolom" }, "m-thulaqa": { pos: [-1300, -200], arah: 90, formasi: "kolom" },
          "d-abbas": { pos: [-290, 80], arah: 270 }
        },
        panah: [{ dari: [-1500, 0], ke: [-450, 0], sisi: "muslim", lengkung: 0.05, label: "kembali menyambut seruan" }],
        sorot: ["m-teguh", "d-abbas"],
        kamera: { target: [-500, 0], jarak: 2200, sudut: -10, tinggi: 44 } },
      { judul: "Kemenangan", waktu: "Siang hari",
        narasi: "Nabi ﷺ melempar kerikil ke arah musuh, dan Hawazin akhirnya kalah. Allah menurunkan ketenangan dan bala tentara yang tidak terlihat (At-Taubah 26). Sisa pasukan lari ke Awthas, Nakhlah, dan Thaif.",
        derajat: "shahih", sumber: "HR. Muslim no. 1775a", url: SN("muslim:1775a"),
        posisi: {
          "m-utama": { pos: [700, 0], arah: 90, formasi: "shaf" }, "m-depan": { pos: [850, 350], arah: 80, formasi: "kolom" }, "m-thulaqa": { pos: [450, -260], arah: 90, formasi: "shaf" },
          "m-teguh": { aktif: false }, "d-abbas": { aktif: false },
          "q-utara": { aktif: false }, "q-selatan": { aktif: false }, "q-utama": { pos: [2100, 250], formasi: "tersebar" }, rasul: { pos: [300, 0] }
        },
        panah: [{ dari: [-200, 0], ke: [1000, 0], sisi: "muslim", lengkung: 0 }, { dari: [1700, 200], ke: [2400, 1100], sisi: "musuh", label: "ke Awthas" }, { dari: [1700, -100], ke: [2400, -1100], sisi: "musuh", label: "ke Thaif" }],
        korban: { muslim: 4, musuh: 70 },
        kamera: { target: [900, 0], jarak: 4200, sudut: 0, tinggi: 52 } },
      { judul: "Rampasan dan kaum Anshar", waktu: "Di Al-Ji'ranah",
        narasi: "Tawanan dan harta dikumpulkan di Al-Ji'ranah. Sebagian besar dibagikan kepada tokoh-tokoh Mekah yang baru masuk Islam, sehingga sebagian Anshar kecewa. Nabi ﷺ berpidato, \"Tidakkah kalian rela orang-orang pulang membawa kambing dan unta, sedangkan kalian pulang membawa Rasulullah?\"",
        derajat: "shahih", sumber: "HR. Bukhari no. 4330", url: SN("bukhari:4330"),
        posisi: {
          "m-utama": { pos: [-1900, 350], formasi: "bertahan" }, "m-depan": { pos: [-1700, 600], formasi: "bertahan" }, "m-thulaqa": { pos: [-2050, 600], formasi: "bertahan" },
          "q-utama": { aktif: false }, "q-tawanan": { pos: [-1850, -200], formasi: "bertahan", aktif: true }, rasul: { pos: [-2150, 300] }
        },
        panah: [{ dari: [1200, 0], ke: [-1600, 0], sisi: "muslim", lengkung: 0.05, label: "ke Al-Ji'ranah" }],
        korban: { muslim: 4, musuh: 70, tawanan: 6000 },
        sorot: ["jiranah"],
        kamera: { target: [-1500, 200], jarak: 2800, sudut: 0, tinggi: 52 } }
    ]
  };

  // ===================== THAIF =====================
  S.thaif = {
    catatan: "Bentuk kota Thaif berdinding, benteng di dalamnya, dan letak perkemahan adalah ilustrasi; Thaif berada di dataran tinggi dengan kebun-kebun di sekitarnya. Perkemahan kedua digambar di barat daya, kira-kira di kawasan Masjid Ibnu Abbas sekarang (perkiraan). Jumlah pembela Thaif tidak tercatat dalam sumber klasik, sehingga jumlah figurnya hanya ilustrasi. HR. Bukhari 4326 menyebut 23 orang turun dari benteng (teks Arab).",
    medan: {
      ukuran: [2800, 2400], vertikal: 1.4,
      fitur: [
        { id: "tembok", jenis: "tembok", nama: "Tembok kota Thaif", pts: [[-360, 120], [-200, -70], [160, -60], [400, 150], [330, 540], [0, 660], [-310, 520]], h: 9, penting: true },
        { id: "benteng", jenis: "benteng", pos: [20, 330], ukuran: [100, 80, 18] },
        { id: "kota", jenis: "kota", pos: [10, 280], r: 260 },
        { jenis: "gunung", pos: [-900, 900], r: 520, h: 120 }, { jenis: "gunung", pos: [950, 950], r: 520, h: 140 }, { jenis: "gunung", pos: [100, 1150], r: 600, h: 150 },
        { jenis: "kebun", pos: [-750, -150], r: 300, rapat: 0.9 }, { jenis: "kebun", pos: [750, -300], r: 320, rapat: 0.9 }, { jenis: "kebun", pos: [600, 450], r: 200, rapat: 0.8 },
        { id: "kemah-1", jenis: "kemah", nama: "Perkemahan pertama", pos: [-500, -380], r: 150, fase: [0, 0] },
        { id: "kemah-2", jenis: "kemah", nama: "Perkemahan kedua, di luar jangkauan panah", pos: [-800, -820], r: 200, fase: [1, 2] },
        { id: "manjaniq", jenis: "manjaniq", nama: "Manjaniq (pelontar batu)", pos: [-330, -260], arah: 40, fase: [2, 2] },
        { jenis: "arah", nama: "↖ Hunain dan Al-Ji'ranah", pos: [-1150, 1050] }
      ]
    },
    unit: [
      { id: "m-utama", sisi: "muslim", nama: "Pasukan muslimin", jumlah: 12000, jenis: "infanteri" },
      { id: "q-tsaqif", sisi: "musuh", nama: "Pembela Thaif (Tsaqif)", jumlah: null, ilustrasi: 600, jenis: "benteng", panglima: "Abdu Yalail bin Amr" },
      { id: "n-budak", sisi: "netral", nama: "Budak yang turun dari benteng", jumlah: 23, jenis: "infanteri", panji: false, hitung: false, sumber: "HR. Bukhari no. 4326" }
    ],
    fase: [
      { judul: "Tiba dari Hunain", waktu: "Syawal 8 H",
        narasi: "Setelah Hunain, Nabi ﷺ bergerak ke Thaif, tempat sisa pasukan Tsaqif dan Malik bin Auf berlindung. Pasukan berkemah dekat tembok kota, tetapi para pemanah Tsaqif menghujani mereka dari atas tembok.",
        derajat: "sirah", sumber: "Sirah Ibnu Hisyam",
        posisi: {
          "m-utama": { pos: [-650, -350], arah: 60, formasi: "bertahan" },
          "q-tsaqif": { ikut: "tembok", arah: 200, formasi: "garis" }, rasul: { pos: [-560, -420] }
        },
        panah: [{ dari: [-1200, 800], ke: [-650, -200], sisi: "muslim", lengkung: 0.15 }, { dari: [-230, -40], ke: [-520, -330], sisi: "musuh", lengkung: 0.05, label: "hujan anak panah" }],
        kamera: { target: [-200, 100], jarak: 2600, sudut: 0, tinggi: 54 } },
      { judul: "Mengepung kota", waktu: "Sekitar dua pekan atau lebih",
        narasi: "Perkemahan dipindahkan lebih jauh, keluar dari jangkauan panah, dan kota Thaif dikepung dari berbagai sisi. Lama pengepungan diperselisihkan, antara belasan malam sampai empat puluh malam.",
        derajat: "sirah", sumber: "Sirah Ibnu Hisyam; HR. Muslim no. 1059g", url: SN("muslim:1059g"),
        posisi: { "m-utama": { pos: [20, 290], formasi: "lingkar", radius: 640 }, rasul: { pos: [-800, -820] } },
        korban: { muslim: 6, musuh: null },
        kamera: { target: [0, 150], jarak: 2700, sudut: 0, tinggi: 58 } },
      { judul: "Manjaniq dan seruan kepada budak", waktu: "Masa pengepungan",
        narasi: "Kaum muslimin memakai manjaniq dan alat pelindung untuk mendekati tembok. Diumumkan bahwa budak yang turun dari benteng akan merdeka; di antara yang turun adalah Abu Bakrah, salah satu dari sekitar 23 orang.",
        derajat: "shahih", sumber: "HR. Bukhari no. 4326", url: SN("bukhari:4326"),
        posisi: { "n-budak": { pos: [-450, -480], arah: 225, formasi: "kolom", aktif: true } },
        panah: [{ dari: [-150, -60], ke: [-650, -700], sisi: "netral", lengkung: 0.1, label: "turun dari benteng" }],
        sorot: ["manjaniq", "n-budak"],
        kamera: { target: [-350, -250], jarak: 1700, sudut: -15, tinggi: 46 } },
      { judul: "Kembali pulang", waktu: "Akhir Syawal 8 H",
        narasi: "Benteng tetap tidak jebol. Nabi ﷺ bersabda, \"Kita akan pulang besok, insya Allah.\" Para sahabat semula keberatan, tetapi setelah bertempur keesokan harinya mereka menerima, dan Nabi ﷺ tersenyum. Pasukan kembali ke Al-Ji'ranah.",
        derajat: "shahih", sumber: "HR. Bukhari no. 4325", url: SN("bukhari:4325"),
        posisi: { "m-utama": { pos: [-950, 400], arah: 320, formasi: "kolom" }, "n-budak": { aktif: false }, rasul: { pos: [-900, 520] } },
        panah: [{ dari: [-700, -300], ke: [-1200, 950], sisi: "muslim", label: "ke Al-Ji'ranah" }],
        korban: { muslim: 12, musuh: null },
        kamera: { target: [-300, 250], jarak: 2800, sudut: 0, tinggi: 54 } }
    ]
  };

  window.PERANG_SKENARIO = S;
})();
