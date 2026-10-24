// Madinah (Yatsrib) masa Nabi ﷺ sampai akhir Khulafaur Rasyidin (622–661 M).
// Posisi dalam meter dari Raudhah Masjid Nabawi (24.46730, 39.61120): e = timur (+), n = utara (+).
// Rumus: e = (lon − 39.61120) × 101300; n = (lat − 24.46730) × 110570.
// keyakinan: "pasti" | "kitab" | "perkiraan". derajat riwayat: "shahih" | "sirah" | "lemah".
// Tambahan opsional di luar kontrak: tahap[].e/n = titik tengah denah masjid pada tahap itu (w = timur–barat, l = utara–selatan);
// namaLama = nama tempat sebelum tahun tertentu; sumberLokasi = asal titik koordinat; lihat = id tempat lain yang memuat detail riwayat.
// DRAF: wajib diverifikasi ustadz sebelum dipakai.
(function () {
  const sn = (k, n) => `https://sunnah.com/${k}:${n}`;
  const W = (p) => "https://en.wikipedia.org/wiki/" + p;

  window.MADINAH = {
    keyakinan: {
      pasti: { nama: "Lokasi pasti", ket: "Situsnya masih ada (masjid, gunung, sumur, lembah) dan posisinya tidak diperselisihkan. Koordinat diambil dari peta modern." },
      kitab: { nama: "Menurut kitab sejarah", ket: "Disebut dalam kitab sejarah Madinah (Ibnu Syabbah, Ibnu Zabalah, As-Samhudi) atau tradisi yang dikenal luas. Titiknya perkiraan peneliti modern." },
      perkiraan: { nama: "Perkiraan", ket: "Sumber hanya menyebut kawasan atau arah umum, jadi titik di peta adalah perkiraan kami." }
    },
    derajat: {
      shahih: "Hadits shahih",
      sirah: "Kitab sirah/sejarah",
      lemah: "Riwayat lemah"
    },
    catatanVisual: "Madinah adalah oasis. Kebun kurma paling rapat di selatan ('Aliyah dan Quba) dan makin jarang ke utara. Rumah bata lumpur beratap datar berkelompok per kabilah, masing-masing dengan beberapa utum, yaitu menara benteng batu dua lantai untuk berlindung dan menyimpan hasil panen. Di timur dan barat terbentang harrah, hamparan batu basal hitam yang sulit dilalui. Lembah (wadi) biasanya kering dan baru mengalir setelah hujan. Masjid Nabawi sangat sederhana: dinding bata lumpur setinggi sekitar 3,6 m, tiang batang kurma, atap pelepah, dan lantai tanah yang kemudian ditaburi kerikil. Belum ada menara, kubah, atau mihrab cekung. Sebelum 624 M kiblatnya ke utara (Baitul Maqdis), sesudahnya ke selatan (Ka'bah). Bilik istri-istri Nabi menempel di sisi timur masjid. Parit Khandaq hanya tampak pada 627 M. Makam di Baqi' mulai sekitar 623 M dan makam syuhada Uhud mulai 625 M. Perkampungan Yahudi berpenghuni sampai pengusiran masing-masing (624, 625, 627 M). Garis jalan, batas kebun, dan alur wadi adalah perkiraan.",
    pusat: { lat: 24.4673, lon: 39.6112 },

    // Jalur jalan (meter dari Raudhah). Arah dan tujuan dari sumber; garisnya perkiraan.
    jalan: [
      { id: "jalan-quba", nama: "Jalan ke Quba", lebar: 6, pts: [[-5, -30], [-80, -500], [-60, -1100], [150, -1700], [380, -2350], [560, -2900], [610, -3080]] },
      { id: "jalan-uhud", nama: "Jalan ke Uhud", lebar: 6, pts: [[-5, 30], [-40, 500], [-120, 1300], [-230, 2100], [-262, 2418], [-150, 2719], [20, 3300], [110, 3700], [168, 4600]] },
      { id: "jalan-suq", nama: "Jalan ke pasar", lebar: 8, pts: [[-25, 10], [-150, 40], [-300, 80], [-420, 100], [-520, 120]] },
      { id: "jalan-baqi", nama: "Jalan ke Baqi'", lebar: 5, pts: [[20, 5], [150, 0], [300, -20], [420, -40]] },
      { id: "jalan-mekah", nama: "Jalan ke Mekah lewat Dzul Hulaifah", lebar: 6, pts: [[-30, -20], [-428, -168], [-900, -800], [-1500, -1800], [-1900, -3000], [-2600, -4300], [-4000, -4700], [-5600, -5000], [-6500, -5600], [-6966, -5925]] },
      { id: "jalan-syam", nama: "Jalan ke Syam", lebar: 6, pts: [[-20, 40], [-300, 520], [-700, 1150], [-950, 1800], [-1300, 2700], [-1800, 3500], [-2550, 4350], [-3000, 5300], [-3600, 6600], [-4200, 8200]] }
    ],

    medan: {
      // Hamparan batu basal hitam (bekas aliran lava). Batas luarnya perkiraan.
      harrah: [
        { id: "harrah-waqim", nama: "Harrah Waqim (timur)", poly: [[2600, -4500], [2500, -3200], [2400, -2400], [2100, -1600], [1500, -800], [1100, -100], [950, 500], [850, 1200], [650, 1900], [550, 2450], [900, 2850], [1500, 3300], [2600, 3650], [4000, 3800], [6800, 3500], [7000, 0], [6800, -4500]] },
        { id: "harrah-wabrah", nama: "Harrah Wabrah (barat)", poly: [[-1850, -2600], [-1750, -1200], [-1850, -200], [-2050, 500], [-2400, 1000], [-2900, 1150], [-3350, 1350], [-3550, 1700], [-3950, 1500], [-4300, 800], [-4600, -300], [-5000, -1800], [-5300, -3300], [-4500, -4200], [-3000, -4000], [-2200, -3500]] }
      ],
      // h = tinggi di atas dataran (m). ridge = sumbu panjang; lebar = lebar punggung gunung (m).
      gunung: [
        { id: "uhud", nama: "Gunung Uhud", e: 1100, n: 5750, r: 3600, h: 420, ridge: [[-2000, 5200], [4200, 6300]], lebar: 1800 },
        { id: "rumat", nama: "Jabal Rumat", e: 123, n: 3839, r: 70, h: 15 },
        { id: "sal", nama: "Gunung Sal'", e: -1160, n: 840, r: 450, h: 80, ridge: [[-1200, 420], [-1120, 1260]], lebar: 500 },
        { id: "ayr", nama: "Gunung 'Ayr", e: -5450, n: -7500, r: 1000, h: 330, ridge: [[-6200, -7450], [-4700, -7550]], lebar: 700 },
        { id: "tsaur", nama: "Gunung Tsaur", e: -400, n: 8300, r: 300, h: 90 }
      ],
      // Alur wadi (perkiraan, ±100–300 m). Semua bertemu di utara kota (Zaghabah / Mujtama' al-Asyal).
      wadi: [
        { id: "aqiq", nama: "Wadi Al-'Aqiq", lebar: 180, pts: [[-6800, -10500], [-6750, -8500], [-6700, -7000], [-6700, -5900], [-6300, -4600], [-5600, -3300], [-5100, -1800], [-4800, -300], [-4500, 800], [-4100, 1500], [-3800, 1900], [-3300, 2400], [-2900, 2900], [-2800, 3800], [-2800, 4500], [-3200, 5400], [-3800, 6800], [-4300, 8200]] },
        { id: "bathan", nama: "Wadi Bathan", lebar: 60, pts: [[1100, -5500], [1000, -4300], [900, -3300], [750, -2500], [450, -1700], [200, -1150], [-150, -700], [-400, -380], [-600, 0], [-700, 500], [-800, 1100], [-1000, 1700], [-1800, 2300], [-2400, 2700], [-2900, 2900]] },
        { id: "ranuna", nama: "Wadi Ranuna'", lebar: 40, pts: [[300, -5200], [330, -4000], [380, -3200], [390, -2410], [330, -1800], [200, -1150]] },
        { id: "qanat", nama: "Wadi Qanat", lebar: 120, pts: [[6500, 3750], [4500, 4000], [3000, 4100], [1800, 4150], [800, 4150], [250, 4130], [-400, 4200], [-1100, 4250], [-1800, 4150], [-2400, 4250], [-2800, 4500]] }
      ],
      // Kebun kurma. rapat 0..1 = kepadatan pohon.
      kebun: [
        { id: "kebun-quba", nama: "Kebun Quba", rapat: 0.75, poly: [[-150, -2300], [600, -2200], [1200, -2600], [1300, -3400], [1000, -4200], [300, -4500], [-300, -3800]] },
        { id: "kebun-awali", nama: "Kebun 'Awali (Bani Nadhir, Quraizhah, Sunh)", rapat: 0.65, poly: [[900, -1000], [1700, -1100], [2050, -1900], [2300, -2700], [2300, -3500], [1400, -3500], [1250, -2600], [800, -1800]] },
        { id: "kebun-selatan", nama: "Kebun di selatan kota", rapat: 0.5, poly: [[-300, -500], [500, -400], [800, -1000], [650, -1800], [0, -1900], [-400, -1200]] },
        { id: "kebun-birha", nama: "Kebun Bairuha'", rapat: 0.45, poly: [[-60, 130], [320, 110], [380, 430], [120, 540], [-80, 380]] },
        { id: "kebun-asyhal", nama: "Kebun Bani Abdul Asyhal", rapat: 0.4, poly: [[550, 350], [950, 300], [820, 1100], [500, 1000]] },
        { id: "kebun-haritsah", nama: "Kebun Bani Haritsah", rapat: 0.5, poly: [[-700, 1950], [250, 1950], [400, 2450], [150, 3200], [-600, 3050]] },
        { id: "kebun-bathan", nama: "Kebun di tepi Bathan", rapat: 0.5, poly: [[-1000, -1300], [-200, -1300], [-150, -700], [-700, -200], [-1100, -600]] },
        { id: "kebun-salimah", nama: "Kebun Bani Salimah", rapat: 0.45, poly: [[-2950, 1250], [-2200, 1080], [-1700, 1150], [-1650, 1380], [-2400, 1380], [-2950, 1320]] },
        { id: "kebun-aqiq", nama: "Kebun di tepi Al-'Aqiq", rapat: 0.3, poly: [[-3300, 2300], [-2650, 2450], [-2450, 3300], [-3050, 3500]] }
      ],
      // Parit Khandaq (627 M). Garis ±4,7 km dari tepi Harrah Waqim (Bani Haritsah) ke Harrah Wabrah, melewati utara Gunung Sal'.
      khandaq: { pts: [[900, 2850], [600, 2760], [300, 2680], [0, 2600], [-300, 2470], [-560, 2280], [-800, 2060], [-1020, 1840], [-1250, 1640], [-1500, 1480], [-1800, 1420], [-2100, 1430], [-2400, 1400], [-2700, 1330], [-3000, 1280], [-3350, 1350]], lebar: 9, dalam: 4.5, t: [627, 627] },
      dataran: 620
    },

    tempat: [
      // ---------- Masjid Nabawi dan sekitarnya ----------
      { id: "masjid-nabawi", nama: "Masjid Nabawi", arab: "المسجد النبوي", jenis: "masjid", besar: true, e: -4, n: 10, lod: 0, keyakinan: "pasti", ada: [622, 661],
        tahap: [
          { t: [622, 628], w: 30.5, l: 35.6, e: -4, n: 10, ket: "Bangunan pertama: dinding bata lumpur, tiang batang kurma, atap pelepah setinggi sekitar 3,6 m." },
          { t: [629, 637], w: 47.3, l: 47.3, e: -13, n: 16, ket: "Diperluas Nabi ﷺ sepulang dari Khaibar (7 H) karena jamaah bertambah." },
          { t: [638, 648], w: 57.5, l: 66.1, e: -18, n: 20, ket: "Perluasan Umar (17 H) dengan bahan serupa; tiangnya diganti kayu." },
          { t: [649, 661], w: 62.6, l: 81.4, e: -20, n: 23, ket: "Perluasan Utsman (29–30 H): dinding batu berukir dan kapur, tiang batu, atap kayu jati." }
        ],
        kiblat: [{ t: [622, 624], arah: "utara" }, { t: [624, 661], arah: "selatan" }],
        ket: "Masjid yang dibangun Nabi ﷺ bersama para sahabat tak lama setelah tiba di Madinah, di tanah tempat unta beliau berlutut. Sisi timurnya tidak pernah digeser karena berbatasan langsung dengan bilik istri-istri Nabi, sehingga setiap perluasan mengarah ke barat, utara, dan selatan.",
        sumberLokasi: "Ukuran tiap tahap: Wikipedia, Prophet's Mosque. Letak denah relatif terhadap Raudhah adalah rekonstruksi kami.",
        riwayat: [
          { t: [623, 632], judul: "Bilal, muadzin Masjid Nabawi", tokoh: ["bilal", "umar", "nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 604 (Ibnu Umar)", url: sn("bukhari", 604),
            isi: "Setelah tiba di Madinah, kaum muslimin bermusyawarah bagaimana memanggil orang untuk shalat. Ada yang mengusulkan lonceng atau terompet; Umar mengusulkan seseorang yang menyerukan panggilan. Nabi ﷺ bersabda, \"Wahai Bilal, berdirilah dan serukanlah shalat.\" Sejak itu Bilal menjadi muadzin di masjid ini.",
            catatan: "Letak rumah Bilal di Madinah tidak tercatat dalam sumber yang kami gunakan." },
          { t: [622, 622], judul: "Dibangun bergotong royong", tokoh: ["nabi", "abubakar"], derajat: "shahih", sumber: "HR. Bukhari no. 428 (Anas bin Malik)", url: sn("bukhari", 428),
            isi: "Nabi ﷺ meminta Bani Najjar menyebutkan harga kebun mereka, tetapi mereka hanya mengharap balasan dari Allah. Kuburan lama orang musyrik dibongkar, reruntuhan diratakan, dan pohon kurma ditebang. Batang-batang kurma disusun menjadi dinding kiblat. Nabi ikut mengangkut batu sambil bersyair bersama para sahabat, memohon ampunan bagi Anshar dan Muhajirin." },
          { t: [622, 650], judul: "Dari pelepah kurma ke batu berukir", tokoh: ["abubakar", "umar", "utsman"], derajat: "shahih", sumber: "HR. Bukhari no. 446 (Abdullah bin Umar)", url: sn("bukhari", 446),
            isi: "Di masa Nabi ﷺ masjid ini dari bata lumpur, beratap pelepah, dan bertiang batang kurma. Abu Bakar tidak mengubahnya. Umar memperluasnya dengan bahan yang sama dan mengganti tiangnya dengan kayu. Utsman memperluasnya besar-besaran dengan dinding batu berukir dan kapur, tiang batu, dan atap kayu jati." },
          { t: [624, 624], judul: "Kiblat berpindah ke Ka'bah", tontonan: "kiblat", tokoh: ["nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 40 (Al-Bara' bin Azib)", url: sn("bukhari", 40),
            isi: "Selama 16 atau 17 bulan Nabi ﷺ shalat menghadap Baitul Maqdis di utara. Lalu turun perintah menghadap Ka'bah di selatan. Shalat pertama beliau yang menghadap Ka'bah adalah shalat Ashar.",
            ayat: { surah: "Al-Baqarah", no: "144", arab: "فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ" },
            catatan: "Bulannya umumnya disebut Rajab atau pertengahan Sya'ban 2 H." },
          { t: [632, 632], judul: "\"Tutup semua pintu kecuali pintu Abu Bakar\"", tokoh: ["nabi", "abubakar"], derajat: "shahih", sumber: "HR. Bukhari no. 466 (Abu Sa'id Al-Khudri)", url: sn("bukhari", 466),
            isi: "Banyak rumah sahabat punya pintu kecil yang langsung membuka ke masjid. Nabi ﷺ memerintahkan semua pintu itu ditutup kecuali pintu Abu Bakar.",
            catatan: "Teks hadits ini tidak menyebut waktunya. Para pensyarah mengaitkannya dengan khutbah Nabi di masa sakit menjelang wafat." }
        ] },

      { id: "raudhah", nama: "Raudhah", arab: "الروضة", jenis: "titik", e: 0, n: 0, lod: 2, keyakinan: "pasti", ada: [622, 661],
        ket: "Area antara bilik Nabi ﷺ (kamar Aisyah) dan mimbar beliau. Titik ini menjadi titik nol peta Madinah.",
        riwayat: [
          { t: null, judul: "Taman dari taman-taman surga", tokoh: ["nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 1196 (Abu Hurairah)", url: sn("bukhari", 1196),
            matan: "مَا بَيْنَ بَيْتِي وَمِنْبَرِي رَوْضَةٌ مِنْ رِيَاضِ الْجَنَّةِ",
            isi: "Nabi ﷺ bersabda bahwa antara rumah beliau dan mimbar beliau adalah salah satu taman surga, dan mimbar beliau berada di atas telaga beliau." },
          { t: [628, 630], judul: "Batang kurma yang merintih", tokoh: ["nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 3583 (Ibnu Umar)", url: sn("bukhari", 3583),
            isi: "Dulu Nabi ﷺ berkhutbah sambil berdiri di samping sebatang batang kurma. Ketika mimbar dibuat dan beliau mulai berkhutbah di atasnya, batang itu merintih. Nabi mendatanginya dan mengusapnya hingga diam.",
            catatan: "Hadits ini tidak menyebut tahun pembuatan mimbar; sumber sekunder menyebut sekitar 7–8 H (628–630 M)." }
        ] },

      { id: "mirbad", nama: "Tempat Jemur Kurma Sahl dan Suhail", arab: "مربد سهل وسهيل", jenis: "titik", e: -6, n: 14, lod: 2, keyakinan: "kitab", ada: [570, 622],
        ket: "Tempat menjemur kurma milik dua anak yatim Bani Najjar, Sahl dan Suhail, yang diasuh As'ad bin Zurarah. Di sinilah unta Nabi ﷺ berlutut, lalu tanahnya dibeli dan dijadikan masjid.",
        sumberLokasi: "HR. Bukhari no. 3906; titik di bawah denah masjid pertama",
        riwayat: [
          { t: [622, 622], judul: "Unta berlutut di sini", tokoh: ["nabi", "asad"], derajat: "shahih", sumber: "HR. Bukhari no. 3906 (Urwah bin Az-Zubair)", url: sn("bukhari", 3906),
            isi: "Unta Nabi ﷺ berlutut di tempat menjemur kurma milik Sahl dan Suhail. Beliau bersabda, \"Insya Allah, inilah tempat tinggal kita.\" Kedua anak itu ingin menghibahkannya, tetapi Nabi membelinya lalu membangun masjid di atasnya. Beliau ikut mengangkut bata sambil bersyair, \"Muatan ini lebih baik daripada muatan Khaibar.\"" },
          { t: [622, 622], judul: "Kebun Bani Najjar", tokoh: ["nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 428 (Anas bin Malik)", url: sn("bukhari", 428), lihat: "masjid-nabawi",
            isi: "Riwayat Anas menyebut tanah ini kebun berdinding milik Bani Najjar yang tidak mau menerima harga. Lihat di Masjid Nabawi.",
            catatan: "Ulama memadukan dua riwayat ini: tanah itu milik anak yatim dari Bani Najjar yang diurus kerabat mereka." }
        ] },

      { id: "rumah-aisyah", nama: "Rumah Aisyah", arab: "حجرة عائشة", jenis: "rumah", e: 14, n: -4, lod: 2, keyakinan: "pasti", ada: [622, 661],
        ket: "Bilik Aisyah menempel di sisi timur masjid dan pintunya membuka ke arah masjid. Nabi ﷺ wafat dan dimakamkan di bilik ini, kemudian Abu Bakar (634 M) dan Umar (644 M). Kini berada di bawah Kubah Hijau.",
        sumberLokasi: "Wikipedia: Prophet's Mosque (Kubah Hijau di sudut tenggara, di atas bekas rumah Aisyah)",
        riwayat: [
          { t: [632, 632], judul: "Wafatnya Nabi ﷺ", tokoh: ["nabi", "aisyah"], derajat: "shahih", sumber: "HR. Bukhari no. 4450 (Aisyah)", url: sn("bukhari", 4450),
            isi: "Saat sakit menjelang wafat, Nabi ﷺ berulang kali bertanya, \"Di mana aku besok?\" Para istri lalu mengizinkan beliau dirawat di rumah Aisyah. Beliau wafat di rumah ini pada giliran Aisyah, bersandar di dadanya, setelah sempat bersiwak." },
          { t: [623, 632], judul: "I'tikaf di samping bilik", tokoh: ["nabi", "aisyah"], derajat: "shahih", sumber: "HR. Bukhari no. 2029 (Aisyah)", url: sn("bukhari", 2029),
            isi: "Saat i'tikaf di masjid, Nabi ﷺ memasukkan kepala beliau ke dalam rumah, lalu Aisyah menyisir rambut beliau. Selama i'tikaf beliau tidak masuk rumah kecuali ada keperluan." },
          { t: [627, 627], judul: "Turunnya ayat hijab", tokoh: ["nabi", "anas", "zainabjahsy", "aisyah"], derajat: "shahih", sumber: "HR. Bukhari no. 4793 (Anas bin Malik)", url: sn("bukhari", 4793),
            isi: "Setelah walimah pernikahan dengan Zainab binti Jahsy, tiga tamu masih asyik berbincang di rumah. Nabi ﷺ keluar ke bilik Aisyah lalu bilik istri-istri lainnya untuk mengucapkan salam. Ketika kaki beliau sudah di ambang pintu, beliau menurunkan tirai antara dirinya dan Anas, dan turunlah ayat hijab.",
            ayat: { surah: "Al-Ahzab", no: "53", arab: "وَإِذَا سَأَلْتُمُوهُنَّ مَتَاعًا فَاسْأَلُوهُنَّ مِن وَرَاءِ حِجَابٍ" },
            catatan: "Pernikahan dengan Zainab umumnya disebut terjadi pada 5 H (627 M)." },
          { t: [644, 644], judul: "Umar minta dimakamkan di sini", tokoh: ["umar", "ibnuumar", "aisyah"], derajat: "shahih", sumber: "HR. Bukhari no. 1392 (Amr bin Maimun)", url: sn("bukhari", 1392),
            isi: "Menjelang wafat, Umar mengutus putranya, Abdullah, meminta izin Aisyah agar ia dimakamkan bersama dua sahabatnya. Aisyah berkata tempat itu tadinya ia inginkan untuk dirinya, tetapi hari itu ia mendahulukan Umar." }
        ] },

      { id: "rumah-saudah", nama: "Rumah Saudah", arab: "بيت سودة", jenis: "rumah", e: 15, n: 13, lod: 2, keyakinan: "perkiraan", ada: [622, 661],
        ket: "Saudah binti Zam'ah sudah menjadi istri Nabi ﷺ sejak di Mekah. Biliknya termasuk dua bilik pertama yang dibangun di sisi timur masjid bersama bilik Aisyah. Letak persisnya di sisi timur tidak tercatat jelas, jadi titik ini perkiraan.",
        sumberLokasi: "SeekersGuidance (mengutip Asah al-Siyar): dua bilik pertama di sisi timur masjid",
        riwayat: [
          { t: [622, 623], judul: "Dua bilik pertama", tokoh: ["nabi", "saudah", "aisyah"], derajat: "sirah", sumber: "Abdur Rauf Danapuri, Asah al-Siyar (dikutip SeekersGuidance)", url: "https://seekersguidance.org/uncategorized/how-many-houses-did-the-prophet-have-in-madinah/",
            isi: "Bersamaan dengan pembangunan masjid, dibangun dua bilik kecil di sisi timurnya untuk Saudah dan Aisyah. Bilik untuk istri-istri lain menyusul kemudian sehingga jumlahnya menjadi sembilan." },
          { t: null, judul: "Memberikan giliran kepada Aisyah", tokoh: ["saudah", "aisyah", "nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 5212 (Aisyah)", url: sn("bukhari", 5212),
            isi: "Saudah memberikan giliran malamnya kepada Aisyah, sehingga Nabi ﷺ berada di rumah Aisyah pada gilirannya sendiri dan pada giliran Saudah.",
            catatan: "Riwayat ini tidak menyebut tahunnya." },
          { t: [630, 631], judul: "Dipanggil dari balik bilik", tokoh: ["nabi"], derajat: "sirah", sumber: "Tafsir Ibnu Katsir, QS. Al-Hujurat: 4",
            isi: "Rombongan Bani Tamim datang dan memanggil Nabi ﷺ dengan suara keras dari luar bilik-bilik istri beliau. Turunlah ayat yang mengajarkan adab kepada Nabi.",
            ayat: { surah: "Al-Hujurat", no: "4", arab: "إِنَّ الَّذِينَ يُنَادُونَكَ مِن وَرَاءِ الْحُجُرَاتِ أَكْثَرُهُمْ لَا يَعْقِلُونَ" },
            catatan: "Ayat ini tentang bilik istri-istri Nabi secara umum, bukan khusus rumah Saudah. Tahunnya mengikuti kedatangan delegasi Bani Tamim (9 H)." }
        ] },

      { id: "rumah-hafshah", nama: "Rumah Hafshah", arab: "بيت حفصة", jenis: "rumah", e: 15, n: -12, lod: 2, keyakinan: "kitab", ada: [625, 661],
        ket: "Rumah Hafshah binti Umar berada di selatan rumah Aisyah dan bersambung dengannya. Kini kira-kira di tempat peziarah berdiri mengucapkan salam kepada Nabi ﷺ.",
        sumberLokasi: "People of Madina: The Prophetic Homes Around the Masjid al-Nabawi (mengutip Subul al-Huda wa ar-Rasyad)",
        riwayat: [
          { t: [645, 650], judul: "Lembaran Al-Qur'an di rumah Hafshah", tokoh: ["hafshah", "utsman", "zaidtsabit", "abdullahzubair"], derajat: "shahih", sumber: "HR. Bukhari no. 4987 (Anas bin Malik)", url: sn("bukhari", 4987),
            isi: "Lembaran-lembaran Al-Qur'an yang dikumpulkan di masa Abu Bakar disimpan Hafshah. Utsman meminjamnya dan menugaskan Zaid bin Tsabit, Abdullah bin Az-Zubair, dan dua orang lainnya menyalinnya menjadi mushaf. Salinannya dikirim ke berbagai wilayah, dan lembaran aslinya dikembalikan kepada Hafshah.",
            catatan: "Hadits ini tidak menyebut tahunnya; ahli sejarah umumnya menyebut sekitar 25 H (645 M)." }
        ] },

      { id: "rumah-fatimah", nama: "Rumah Fatimah dan Ali", arab: "بيت فاطمة", jenis: "rumah", e: 14, n: 3, lod: 2, keyakinan: "kitab", ada: [624, 661],
        ket: "Rumah Ali dan Fatimah berada tepat di utara bilik Aisyah, sangat dekat dengan rumah Nabi ﷺ. Kini termasuk dalam bangunan berpagar di sekitar makam Nabi.",
        sumberLokasi: "Tradisi sejarah Madinah (As-Samhudi); belum kami periksa langsung di kitabnya",
        riwayat: [
          { t: [624, 624], judul: "Pindah ke dekat Nabi", tokoh: ["ali", "fatimah", "nabi"], derajat: "sirah", sumber: "Ibnu Sa'd, Ath-Thabaqat al-Kubra (bab Fatimah)",
            isi: "Setelah menikah pada 2 H, Ali dan Fatimah awalnya tinggal agak jauh dari Nabi ﷺ. Haritsah bin An-Nu'man lalu memberikan rumahnya yang berdekatan dengan rumah Nabi, dan mereka pindah ke sana." },
          { t: [624, 632], judul: "\"Tidakkah kalian shalat malam?\"", tokoh: ["nabi", "ali", "fatimah"], derajat: "shahih", sumber: "HR. Bukhari no. 1127 (Ali bin Abi Thalib)", url: sn("bukhari", 1127),
            isi: "Suatu malam Nabi ﷺ mendatangi Ali dan Fatimah dan bertanya apakah mereka tidak shalat malam. Ali menjawab bahwa jiwa mereka di tangan Allah; bila Allah menghendaki, Dia akan membangunkan mereka. Nabi berlalu sambil menepuk paha dan membaca ayat ini.",
            ayat: { surah: "Al-Kahfi", no: "54", arab: "وَكَانَ الْإِنسَانُ أَكْثَرَ شَيْءٍ جَدَلًا" } },
          { t: [628, 632], judul: "Mencari cucu kecilnya", tokoh: ["nabi", "fatimah", "hasan", "abuhurairah"], derajat: "shahih", sumber: "HR. Bukhari no. 2122 (Abu Hurairah)", url: sn("bukhari", 2122),
            isi: "Nabi ﷺ pergi ke pasar Bani Qainuqa', lalu duduk di halaman rumah Fatimah dan menanyakan si kecil. Tak lama Hasan berlari keluar. Nabi memeluk dan menciumnya, lalu berdoa, \"Ya Allah, cintailah dia dan cintailah orang yang mencintainya.\"",
            catatan: "Abu Hurairah tiba di Madinah pada 7 H (628 M), jadi peristiwa ini terjadi setelahnya." },
          { t: [632, 632], judul: "Fatimah wafat", tokoh: ["fatimah", "ali"], derajat: "shahih", sumber: "HR. Bukhari no. 4240 (Aisyah)", url: sn("bukhari", 4240),
            isi: "Fatimah hidup enam bulan setelah Nabi ﷺ wafat. Ketika ia wafat, Ali memakamkannya pada malam hari dan menshalatinya sendiri.",
            catatan: "Letak makam Fatimah diperselisihkan: banyak riwayat menyebut Baqi', sebagian menyebut di rumahnya sendiri." }
        ] },

      { id: "shuffah", nama: "Shuffah", arab: "الصفة", jenis: "titik", e: 2, n: 26, lod: 2, keyakinan: "kitab", ada: [624, 661],
        ket: "Serambi beratap di sepanjang dinding utara masjid, yang menjadi bagian belakang setelah kiblat pindah ke selatan. Di sini tinggal sahabat miskin tanpa keluarga dan rumah, yang disebut Ahlus Shuffah.",
        sumberLokasi: "Wikipedia: Prophet's Mosque (Shuffah di sepanjang dinding utara)",
        riwayat: [
          { t: [628, 632], judul: "Semangkuk susu untuk Ahlus Shuffah", tokoh: ["abuhurairah", "nabi", "abubakar", "umar"], derajat: "shahih", sumber: "HR. Bukhari no. 6452 (Abu Hurairah)", url: sn("bukhari", 6452),
            isi: "Abu Hurairah pernah begitu lapar sampai mengikat batu di perutnya. Nabi ﷺ melihatnya, lalu menyuruhnya memanggil Ahlus Shuffah, \"tamu-tamu Islam\" yang tidak punya keluarga, harta, atau tempat bergantung. Semuanya minum dari semangkuk susu hadiah itu sampai puas, lalu Abu Hurairah, dan terakhir Nabi sendiri." }
        ] },

      { id: "rumah-abuayyub", nama: "Rumah Abu Ayyub Al-Anshari", arab: "دار أبي أيوب", jenis: "rumah", besar: true, e: 35, n: -60, lod: 1, keyakinan: "kitab",
        ket: "Rumah dua lantai milik Abu Ayyub dari Bani Najjar, dekat tempat unta Nabi ﷺ berlutut. Nabi tinggal di sini beberapa bulan sampai masjid dan bilik-bilik beliau selesai. Lokasinya kini termasuk pelataran selatan Masjid Nabawi.",
        sumberLokasi: "Madain Project: Mosques in Medina (bekas rumah Abu Ayyub kini bagian pelataran selatan Masjid Nabawi)",
        riwayat: [
          { t: [622, 622], judul: "\"Ini rumahku, ini pintuku\"", tokoh: ["nabi", "abuayyub", "abubakar"], derajat: "shahih", sumber: "HR. Bukhari no. 3911 (Anas bin Malik)", url: sn("bukhari", 3911),
            isi: "Setibanya di Madinah, Nabi ﷺ bertanya rumah kerabat mana yang paling dekat. Abu Ayyub menjawab, \"Rumahku, wahai Nabi Allah. Ini rumahku dan ini pintuku.\"" },
          { t: [622, 623], judul: "Tamu di lantai bawah", tokoh: ["nabi", "abuayyub"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam",
            isi: "Nabi ﷺ memilih lantai bawah agar mudah menerima tamu, sementara Abu Ayyub dan keluarganya di lantai atas. Abu Ayyub merasa sungkan berada di atas Nabi. Suatu malam bejana air mereka pecah, dan mereka cepat-cepat mengeringkannya dengan selimut agar air tidak menetes ke bawah. Akhirnya Nabi bersedia pindah ke atas." },
          { t: [622, 623], judul: "Makanan berbawang putih", tokoh: ["nabi", "abuayyub"], derajat: "shahih", sumber: "HR. Muslim no. 2053 (Abu Ayyub)", url: sn("muslim", 2053),
            isi: "Nabi ﷺ biasa mengirimkan sisa makanan beliau kepada Abu Ayyub. Suatu hari makanan itu kembali tanpa disentuh karena berisi bawang putih. Abu Ayyub bertanya apakah itu haram. Nabi menjawab tidak, hanya beliau tidak menyukai baunya. Abu Ayyub berkata ia pun tidak menyukai apa yang Nabi tidak sukai.",
            catatan: "Riwayat ini tidak menyebut tempatnya; dikaitkan dengan masa Nabi tinggal di rumah Abu Ayyub." }
        ] },

      { id: "rumah-utsman", nama: "Rumah Utsman bin Affan", arab: "دار عثمان", jenis: "rumah", e: 55, n: 15, lod: 1, keyakinan: "perkiraan", ada: [622, 661],
        ket: "Rumah Utsman berada di seberang sisi timur masjid; pintu masjid di sisi itu kemudian dikenal sebagai Bab Utsman atau Bab Jibril. Di rumah ini Utsman dikepung para pemberontak dan terbunuh pada 656 M. Titik di peta perkiraan.",
        riwayat: [
          { t: [656, 656], judul: "Berbicara dari atas rumah", tokoh: ["utsman"], derajat: "shahih", sumber: "HR. Bukhari no. 2778 (Abu Abdurrahman As-Sulami)", url: sn("bukhari", 2778),
            isi: "Saat dikepung, Utsman berbicara kepada orang-orang dari atas rumahnya. Ia mengingatkan bahwa Nabi ﷺ menjanjikan surga bagi yang menggali sumur Rumah dan bagi yang membiayai pasukan Tabuk, dan ia telah melakukan keduanya. Para sahabat membenarkannya." },
          { t: [656, 656], judul: "Syahid di rumahnya", tokoh: ["utsman"], derajat: "sirah", sumber: "Ibnu Katsir, Al-Bidayah wan Nihayah; Wikipedia: Al-Baqi Cemetery", url: W("Al-Baqi_Cemetery"),
            isi: "Utsman terbunuh di rumahnya pada bulan Dzulhijjah 35 H saat sedang membaca Al-Qur'an. Ia dimakamkan di sebidang tanah di sisi timur Baqi' yang kemudian disatukan dengan pemakaman itu." },
          { t: null, judul: "Kabar gembira disertai ujian", tokoh: ["utsman", "nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 3674", url: sn("bukhari", 3674), lihat: "bir-aris",
            isi: "Di sumur Aris, Nabi ﷺ memberi Utsman kabar gembira surga disertai ujian yang akan menimpanya. Lihat di Sumur Aris." }
        ] },

      { id: "suq", nama: "Pasar Madinah", arab: "سوق المدينة", jenis: "pasar", e: -420, n: 100, lod: 1, keyakinan: "kitab", ada: [622, 661],
        ket: "Pasar kaum Muslimin di lapangan barat masjid, ke arah Musalla dan Gunung Sal'. Di masa kemudian kawasan ini dikenal sebagai Al-Manakhah. Sebelumnya pasar utama Yatsrib berada di perkampungan Bani Qainuqa'.",
        sumberLokasi: "Kitab sejarah Madinah (Ibnu Syabbah; As-Samhudi) menurut sumber sekunder; titik perkiraan",
        riwayat: [
          { t: [622, 623], judul: "\"Inilah pasar kalian\"", tokoh: ["nabi"], derajat: "lemah", sumber: "HR. Ibnu Majah no. 2233 (Abu Usaid As-Sa'idi)", url: sn("ibnmajah", 2233),
            isi: "Nabi ﷺ melihat pasar An-Nabith dan pasar lain, lalu bersabda bahwa itu bukan pasar bagi kaum Muslimin. Beliau kembali ke satu tempat, berkeliling di dalamnya, lalu menetapkannya sebagai pasar mereka yang tidak boleh dipersempit dan tidak dikenai pungutan.",
            catatan: "Dinilai dha'if (lemah) oleh Darussalam. Kisah pendirian pasar ini juga dikenal dalam kitab sejarah Madinah." },
          { t: null, judul: "\"Siapa menipu, bukan golonganku\"", tokoh: ["nabi"], derajat: "shahih", sumber: "HR. Muslim no. 102 (Abu Hurairah)", url: sn("muslim", 102),
            isi: "Nabi ﷺ melewati setumpuk bahan makanan, memasukkan tangan ke dalamnya, dan jari beliau basah. Pemiliknya berkata itu terkena hujan. Nabi bertanya mengapa bagian yang basah tidak diletakkan di atas agar terlihat pembeli, lalu bersabda, \"Siapa yang menipu, bukan golonganku.\"",
            catatan: "Hadits ini tidak menyebut nama pasarnya." }
        ] },

      { id: "saqifah", nama: "Saqifah Bani Sa'idah", arab: "سقيفة بني ساعدة", jenis: "rumah", e: -290, n: 230, lod: 1, keyakinan: "kitab",
        ket: "Balai beratap milik Bani Sa'idah dari suku Khazraj, tempat mereka bermusyawarah. Di sini Abu Bakar dibaiat sebagai khalifah setelah Nabi ﷺ wafat. Kini menjadi taman kecil di barat laut Masjid Nabawi.",
        sumberLokasi: "Visit Madinah: Saqifat Bani Sa'idah (sisi barat laut Masjid Nabawi)",
        riwayat: [
          { t: [632, 632], judul: "Baiat Abu Bakar", tokoh: ["abubakar", "umar", "abuubaidah", "saadubadah"], derajat: "shahih", sumber: "HR. Bukhari no. 6830 (Ibnu Abbas, dari khutbah Umar)", url: sn("bukhari", 6830),
            isi: "Kaum Anshar berkumpul di Saqifah Bani Sa'idah bersama Sa'ad bin Ubadah yang sedang sakit. Abu Bakar dan Umar datang, dan Abu Ubaidah ada bersama mereka. Seorang Anshar mengusulkan satu pemimpin dari Anshar dan satu dari Quraisy. Abu Bakar menyampaikan pandangannya, lalu Umar membaiatnya, diikuti kaum Muhajirin dan Anshar." }
        ] },

      { id: "bir-ha", nama: "Sumur Bairuha'", arab: "بيرحاء", jenis: "sumur", e: 40, n: 220, lod: 1, keyakinan: "kitab",
        ket: "Kebun kurma dan sumur milik Abu Thalhah Al-Anshari, harta yang paling ia cintai, berhadapan dengan Masjid Nabawi. Nabi ﷺ sering masuk ke kebun ini dan minum airnya yang segar. Kini letaknya di bawah lantai perluasan utara Masjid Nabawi.",
        sumberLokasi: "Madain Project: Historic Wells of Medina (utara Masjid Nabawi, kini di bawah lantainya, dekat Gerbang Raja Fahd); titik perkiraan",
        riwayat: [
          { t: null, judul: "Menyedekahkan harta tercinta", tokoh: ["abuthalhah", "nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 1461 (Anas bin Malik)", url: sn("bukhari", 1461),
            isi: "Ketika ayat ini turun, Abu Thalhah datang kepada Nabi ﷺ dan menyedekahkan Bairuha'. Nabi memujinya sebagai harta yang menguntungkan dan menyarankan agar dibagikan kepada kerabatnya. Abu Thalhah pun membaginya kepada kerabat dan sepupu-sepupunya.",
            ayat: { surah: "Ali 'Imran", no: "92", arab: "لَن تَنَالُوا الْبِرَّ حَتَّىٰ تُنفِقُوا مِمَّا تُحِبُّونَ" } }
        ] },

      { id: "bir-budhaah", nama: "Sumur Budha'ah", arab: "بئر بضاعة", jenis: "sumur", e: -380, n: 420, lod: 2, keyakinan: "perkiraan",
        ket: "Sumur di perkampungan Bani Sa'idah, barat laut Masjid Nabawi. Terkenal karena hadits tentang kesucian air. Titik di peta perkiraan.",
        riwayat: [
          { t: null, judul: "\"Air itu suci\"", tokoh: ["nabi"], derajat: "shahih", sumber: "HR. Abu Dawud no. 66 (Abu Sa'id Al-Khudri)", url: sn("abudawud", 66),
            isi: "Para sahabat bertanya apakah boleh berwudhu dari sumur Budha'ah, yang kadang kemasukan kain bekas, bangkai anjing, dan benda busuk. Nabi ﷺ menjawab, \"Air itu suci, tidak ada sesuatu pun yang menajiskannya.\"",
            catatan: "Dinilai shahih oleh Al-Albani." }
        ] },

      // ---------- Kabilah Anshar ----------
      { id: "bani-najjar", nama: "Perkampungan Bani Najjar", arab: "بنو النجار", jenis: "kawasan", e: 120, n: -200, lod: 1, keyakinan: "kitab",
        ket: "Kabilah Khazraj yang tinggal di sekitar Masjid Nabawi dan ke arah selatan. Mereka keluarga ibu Abdul Muthalib, kakek Nabi ﷺ. Abu Ayyub, Abu Thalhah, Anas bin Malik, dan As'ad bin Zurarah berasal dari kabilah ini.",
        riwayat: [
          { t: [576, 576], judul: "Kunjungan masa kecil", tokoh: ["nabi", "aminah", "ummuaiman", "abdullah"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam; Ibnu Sa'd, Ath-Thabaqat",
            isi: "Saat berusia enam tahun, Muhammad dibawa ibunya, Aminah, bersama Ummu Aiman mengunjungi keluarga Bani Adi bin Najjar di Yatsrib. Ayahnya, Abdullah, wafat dan dimakamkan di Yatsrib sebelum beliau lahir. Dalam perjalanan pulang, Aminah wafat di Al-Abwa'." },
          { t: null, judul: "Keluarga Anshar terbaik", tokoh: ["nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 3789 (Abu Usaid As-Sa'idi)", url: sn("bukhari", 3789),
            isi: "Nabi ﷺ bersabda bahwa keluarga Anshar terbaik adalah Bani Najjar, lalu Bani Abdul Asyhal, lalu Bani Al-Harits bin Al-Khazraj, lalu Bani Sa'idah, dan pada semua keluarga Anshar ada kebaikan." }
        ] },

      { id: "bani-saidah", nama: "Perkampungan Bani Sa'idah", arab: "بنو ساعدة", jenis: "kawasan", e: -380, n: 330, lod: 1, keyakinan: "kitab",
        ket: "Kabilah Khazraj di barat laut Masjid Nabawi, dipimpin Sa'ad bin Ubadah. Di perkampungan ini ada Saqifah dan Sumur Budha'ah.",
        riwayat: [
          { t: null, judul: "Disebut di urutan keempat", tokoh: ["nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 3789 (Abu Usaid As-Sa'idi)", url: sn("bukhari", 3789), lihat: "bani-najjar",
            isi: "Abu Usaid, dari kabilah ini, meriwayatkan sabda Nabi ﷺ tentang keluarga Anshar terbaik. Bani Sa'idah disebut keempat, setelah Bani Najjar, Bani Abdul Asyhal, dan Bani Al-Harits bin Al-Khazraj." },
          { t: [632, 632], judul: "Musyawarah di Saqifah", tokoh: ["saadubadah", "abubakar"], derajat: "shahih", sumber: "HR. Bukhari no. 6830", url: sn("bukhari", 6830), lihat: "saqifah",
            isi: "Setelah Nabi ﷺ wafat, kaum Anshar berkumpul di balai kabilah ini. Lihat di Saqifah Bani Sa'idah." }
        ] },

      { id: "bani-abdulasyhal", nama: "Perkampungan Bani Abdul Asyhal", arab: "بنو عبد الأشهل", jenis: "kawasan", e: 850, n: 750, lod: 1, keyakinan: "perkiraan",
        ket: "Kabilah utama suku Aus di tepi barat Harrah Waqim, timur laut kota. Pemimpinnya Sa'ad bin Mu'adz dan Usaid bin Hudhair. Titik di peta perkiraan.",
        riwayat: [
          { t: [621, 621], judul: "Satu kabilah masuk Islam dalam sehari", tokoh: ["mushab", "asad", "usaid", "saadmuadz"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam",
            isi: "Mush'ab bin Umair dan As'ad bin Zurarah berdakwah di sebuah kebun dekat perkampungan ini. Usaid bin Hudhair datang dengan marah, lalu masuk Islam setelah mendengar Al-Qur'an, disusul Sa'ad bin Mu'adz. Sa'ad berkata kepada kaumnya bahwa ia tidak mau bicara dengan mereka sampai mereka beriman, dan sore itu seluruh Bani Abdul Asyhal masuk Islam." },
          { t: [627, 627], judul: "Kemah Sa'ad di masjid", tokoh: ["saadmuadz", "nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 463 (Aisyah)", url: sn("bukhari", 463), lihat: "masjid-nabawi",
            isi: "Sa'ad bin Mu'adz terluka di lengannya saat Perang Khandaq. Nabi ﷺ mendirikan kemah untuknya di dalam masjid agar mudah menjenguknya. Lukanya kembali parah dan ia wafat di kemah itu." }
        ] },

      { id: "bani-salimah", nama: "Perkampungan Bani Salimah", arab: "بنو سلمة", jenis: "kawasan", e: -2400, n: 1150, lod: 1, keyakinan: "kitab",
        ket: "Kabilah Khazraj yang tinggal di antara Gunung Sal' dan Harrah Wabrah sampai ke Masjid Qiblatain. Dari kabilah ini berasal Jabir bin Abdullah dan Ka'ab bin Malik. Rumah mereka cukup jauh dari Masjid Nabawi.",
        riwayat: [
          { t: null, judul: "Pahala setiap langkah", tokoh: ["nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 655 (Anas bin Malik)", url: sn("bukhari", 655),
            isi: "Bani Salimah ingin pindah mendekati Nabi ﷺ. Beliau tidak ingin rumah-rumah di tepi kota menjadi kosong, lalu bersabda, \"Wahai Bani Salimah, tidakkah kalian mengharap pahala dari setiap langkah kalian?\"" },
          { t: [625, 625], judul: "Hampir goyah sebelum Uhud", tokoh: ["jabir"], derajat: "shahih", sumber: "HR. Bukhari no. 4051 (Jabir bin Abdullah)", url: sn("bukhari", 4051),
            isi: "Jabir berkata ayat ini turun tentang kaumnya, Bani Salimah, dan Bani Haritsah, yang hampir kehilangan semangat menjelang Perang Uhud.",
            ayat: { surah: "Ali 'Imran", no: "122", arab: "إِذْ هَمَّت طَّائِفَتَانِ مِنكُمْ أَن تَفْشَلَا وَاللَّهُ وَلِيُّهُمَا" } }
        ] },

      { id: "bani-haritsah", nama: "Perkampungan Bani Haritsah", arab: "بنو حارثة", jenis: "kawasan", e: 0, n: 2750, lod: 1, keyakinan: "kitab",
        ket: "Kabilah Aus di utara kota, di jalan menuju Uhud. Ujung timur parit Khandaq dimulai dari sini. Kini di sini berdiri Masjid Bani Haritsah (Masjid Al-Mustarah).",
        sumberLokasi: "Wikipedia: Bani Harithah Mosque (24.49189, 39.60972)",
        riwayat: [
          { t: [625, 625], judul: "Hampir goyah sebelum Uhud", tokoh: ["jabir"], derajat: "shahih", sumber: "HR. Bukhari no. 4051 (Jabir bin Abdullah)", url: sn("bukhari", 4051), lihat: "bani-salimah",
            isi: "Ayat tentang dua kelompok yang hampir goyah menjelang Uhud turun tentang Bani Haritsah dan Bani Salimah.",
            ayat: { surah: "Ali 'Imran", no: "122", arab: "إِذْ هَمَّت طَّائِفَتَانِ مِنكُمْ أَن تَفْشَلَا" } },
          { t: [627, 627], judul: "\"Rumah kami tidak terlindung\"", tokoh: [], derajat: "sirah", sumber: "Tafsir Ibnu Katsir, QS. Al-Ahzab: 13 (dari riwayat Ibnu Ishaq)",
            isi: "Saat Khandaq, sebagian orang dari Bani Haritsah meminta izin pulang dengan alasan rumah mereka tidak terlindung, padahal tidak demikian.",
            ayat: { surah: "Al-Ahzab", no: "13", arab: "يَقُولُونَ إِنَّ بُيُوتَنَا عَوْرَةٌ وَمَا هِيَ بِعَوْرَةٍ" } }
        ] },

      // ---------- Kawasan timur dan selatan ----------
      { id: "baqi", nama: "Baqi' Al-Gharqad", arab: "بقيع الغرقد", jenis: "makam", besar: true, e: 527, n: -44, lod: 0, keyakinan: "pasti", ada: [623, 661],
        ket: "Pemakaman utama Madinah di tenggara Masjid Nabawi, dulu ditumbuhi semak gharqad. Di sini dimakamkan banyak keluarga dan sahabat Nabi ﷺ, termasuk putra beliau Ibrahim, putri-putri beliau, dan sebagian istri beliau. Makam kaum Muslimin di sini dimulai sekitar 623–624 M.",
        sumberLokasi: "Wikipedia: Al-Baqi Cemetery (24.4669, 39.6164)",
        riwayat: [
          { t: [624, 625], judul: "Batu penanda kubur Utsman bin Mazh'un", tokoh: ["utsmanmazhun", "nabi"], derajat: "shahih", sumber: "HR. Abu Dawud no. 3206 (Al-Muththalib)", url: sn("abudawud", 3206),
            isi: "Setelah Utsman bin Mazh'un dimakamkan, Nabi ﷺ sendiri mengangkat sebuah batu besar dan meletakkannya di dekat kepala kuburnya. Beliau bersabda, \"Dengan ini aku menandai kubur saudaraku, dan di sisinya akan kumakamkan keluargaku yang wafat.\"",
            catatan: "Dinilai hasan oleh Al-Albani. Utsman bin Mazh'un disebut Muhajirin pertama yang dimakamkan di Baqi', sedangkan As'ad bin Zurarah (wafat sekitar 623 M) disebut Anshar pertama." },
          { t: [632, 632], judul: "Ibrahim, putra Nabi ﷺ", tokoh: ["nabi", "ibrahim", "abdurrahman"], derajat: "shahih", sumber: "HR. Bukhari no. 1303 (Anas bin Malik)", url: sn("bukhari", 1303),
            isi: "Saat Ibrahim dalam sakaratul maut, mata Nabi ﷺ berlinang. Abdurrahman bin Auf heran, lalu Nabi bersabda, \"Mata menangis dan hati bersedih, tetapi kami hanya mengucapkan yang diridhai Tuhan kami.\" Ibrahim kemudian dimakamkan di Baqi'.",
            catatan: "Keterangan pemakaman di Baqi' dari kitab sirah (Ibnu Sa'd), bukan dari hadits ini." },
          { t: [623, 632], judul: "Salam di tengah malam", tokoh: ["nabi", "aisyah"], derajat: "shahih", sumber: "HR. Muslim no. 974 (Aisyah)", url: sn("muslim", 974),
            matan: "السَّلاَمُ عَلَيْكُمْ دَارَ قَوْمٍ مُؤْمِنِينَ",
            isi: "Pada malam giliran Aisyah, Nabi ﷺ keluar di akhir malam ke Baqi', mengucapkan salam kepada penghuni kubur, dan memohon ampunan bagi penghuni Baqi' Al-Gharqad." },
          { t: null, judul: "Nasihat di samping jenazah", tokoh: ["nabi", "ali"], derajat: "shahih", sumber: "HR. Bukhari no. 1362 (Ali bin Abi Thalib)", url: sn("bukhari", 1362),
            isi: "Saat mengantar jenazah di Baqi' Al-Gharqad, Nabi ﷺ duduk dikelilingi para sahabat sambil menggores tanah dengan tongkat kecil. Beliau mengajarkan bahwa tempat setiap jiwa telah ditetapkan, dan setiap orang dimudahkan untuk amal yang sesuai dengan ketetapannya.",
            ayat: { surah: "Al-Lail", no: "5–6", arab: "فَأَمَّا مَنْ أَعْطَىٰ وَاتَّقَىٰ ﴿٥﴾ وَصَدَّقَ بِالْحُسْنَىٰ ﴿٦﴾" } }
        ] },

      { id: "masjid-ijabah", nama: "Masjid Al-Ijabah (Bani Mu'awiyah)", arab: "مسجد الإجابة", jenis: "masjid", e: 734, n: 520, lod: 1, keyakinan: "pasti",
        ket: "Masjid kecil Bani Mu'awiyah dari suku Aus, sekitar 385 m di utara Baqi'. Dinamai Al-Ijabah (pengabulan) karena doa Nabi ﷺ di sini.",
        sumberLokasi: "Wikipedia: Al-Ijabah Mosque (24.472, 39.61844)",
        riwayat: [
          { t: null, judul: "Tiga permohonan", tokoh: ["nabi", "saad"], derajat: "shahih", sumber: "HR. Muslim no. 2890 (Amir bin Sa'ad, dari ayahnya)", url: sn("muslim", 2890),
            isi: "Pulang dari daerah Al-'Aliyah, Nabi ﷺ singgah di masjid Bani Mu'awiyah, shalat dua rakaat, lalu berdoa lama. Beliau memohon tiga hal: agar umatnya tidak dibinasakan dengan paceklik, tidak dengan tenggelam, dan agar mereka tidak saling menghancurkan. Dua permohonan dikabulkan, yang ketiga tidak." }
        ] },

      { id: "musalla", nama: "Musalla (lapangan shalat Id)", arab: "المصلى", jenis: "titik", e: -428, n: -168, lod: 1, keyakinan: "kitab", ada: [624, 661],
        ket: "Lapangan terbuka di barat daya masjid, tempat Nabi ﷺ shalat Idul Fitri dan Idul Adha. Kini di tempat ini berdiri Masjid Al-Ghamamah, sekitar 500 m dari pintu As-Salam.",
        sumberLokasi: "Wikipedia: Mosque of Al-Ghamama (24.46578, 39.60697)",
        riwayat: [
          { t: [624, 632], judul: "Shalat dulu, lalu khutbah", tokoh: ["nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 956 (Abu Sa'id Al-Khudri)", url: sn("bukhari", 956),
            isi: "Pada hari Idul Fitri dan Idul Adha, Nabi ﷺ keluar ke Musalla. Beliau memulai dengan shalat, lalu berdiri menghadap jamaah yang duduk di saf-saf mereka untuk memberi nasihat dan perintah. Bila hendak mengirim pasukan, beliau mengumumkannya di sini.",
            catatan: "Shalat Id pertama dilaksanakan pada 2 H (624 M)." },
          { t: [630, 630], judul: "Shalat ghaib untuk Najasyi", tokoh: ["nabi", "najasyi"], derajat: "shahih", sumber: "HR. Bukhari no. 1245 (Abu Hurairah)", url: sn("bukhari", 1245),
            isi: "Pada hari Najasyi wafat, Nabi ﷺ mengumumkan kematiannya, keluar ke Musalla, membariskan para sahabat, dan menshalatinya dengan empat takbir.",
            catatan: "Tahunnya umumnya disebut 9 H (630 M)." },
          { t: null, judul: "Asal nama Ghamamah", tokoh: ["nabi"], derajat: "lemah", sumber: "Wikipedia: Mosque of Al-Ghamama (mengutip Madain Project)", url: W("Mosque_of_Al-Ghamama"),
            isi: "Menurut tradisi setempat, Nabi ﷺ pernah shalat istisqa di sini dan awan (ghamamah) menaungi kota, sehingga masjidnya dinamai Al-Ghamamah.",
            catatan: "Kami belum menemukan riwayat shahih tentang awan ini; anggap sebagai tradisi lokal." }
        ] },

      { id: "qainuqa", nama: "Perkampungan Bani Qainuqa'", arab: "بنو قينقاع", jenis: "benteng", besar: true, e: -550, n: -450, lod: 1, keyakinan: "kitab", ada: [570, 624],
        ket: "Kabilah Yahudi pengrajin emas dan pedagang yang tinggal di dua benteng di barat daya Yatsrib, tempat pasar utama kota. Mereka diusir ke Syam pada 2 H (624 M), tetapi nama \"pasar Bani Qainuqa'\" tetap dipakai sesudahnya. Titik di peta perkiraan.",
        sumberLokasi: "Wikipedia: Siege of Banu Qaynuqa (barat daya Yatsrib, di kawasan pasar)",
        riwayat: [
          { t: [622, 622], judul: "Ulama Yahudi yang masuk Islam", tokoh: ["abdullahsalam", "nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 3911 (Anas bin Malik); no. 4028 menyebut Bani Qainuqa' sebagai kaum Abdullah bin Salam", url: sn("bukhari", 3911),
            isi: "Abdullah bin Salam mendengar kedatangan Nabi ﷺ saat sedang memetik kurma. Ia datang, bertanya, lalu bersyahadat. Ketika orang-orang Yahudi ditanya tentang dirinya, mereka memujinya, tetapi setelah tahu ia masuk Islam, mereka mencelanya." },
          { t: [622, 623], judul: "\"Di mana pasarnya?\"", tokoh: ["abdurrahman"], derajat: "shahih", sumber: "HR. Bukhari no. 2048 (Abdurrahman bin Auf)", url: sn("bukhari", 2048),
            isi: "Abdurrahman bin Auf dipersaudarakan dengan Sa'ad bin Ar-Rabi' dari Anshar, yang menawarkan separuh hartanya. Abdurrahman menolak dan bertanya, \"Adakah pasar tempat berdagang?\" Ia ditunjukkan pasar Qainuqa', berdagang di sana, dan tak lama kemudian sudah mampu menikah." },
          { t: [624, 624], judul: "Dikepung lalu diusir", tokoh: ["nabi", "abdullahubay"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam; Ar-Rahiq Al-Makhtum; HR. Bukhari no. 4028", url: sn("bukhari", 4028),
            isi: "Setelah Badar, Bani Qainuqa' menantang kaum Muslimin dan melanggar perjanjian. Nabi ﷺ mengepung benteng mereka sekitar 15 hari sampai mereka menyerah. Atas desakan Abdullah bin Ubay, mereka tidak dihukum mati melainkan diusir, lalu pindah ke Syam.",
            catatan: "Kisah pemicunya di pasar (gangguan terhadap seorang perempuan Muslim) diriwayatkan dalam kitab sirah dengan sanad yang dipersoalkan." }
        ] },

      { id: "rumah-abubakar-sunh", nama: "Rumah Abu Bakar di As-Sunh", arab: "منزل أبي بكر بالسنح", jenis: "rumah", e: 1200, n: -1300, lod: 1, keyakinan: "perkiraan", ada: [622, 634],
        ket: "As-Sunh adalah perkampungan Bani Al-Harits bin Al-Khazraj di 'Awali, dataran tinggi di tenggara kota. Abu Bakar tinggal di sini bersama istrinya dari kabilah itu. Titik di peta perkiraan.",
        riwayat: [
          { t: [622, 622], judul: "Singgah di As-Sunh", tokoh: ["abubakar"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam; Ibnu Sa'd, Ath-Thabaqat",
            isi: "Saat tiba di Madinah, Abu Bakar menginap di rumah Khubaib bin Isaf di As-Sunh; ada yang menyebut di rumah Kharijah bin Zaid. Abu Bakar kemudian menikahi Habibah putri Kharijah dan tinggal di sini." },
          { t: [632, 632], judul: "\"Siapa menyembah Allah, Allah Maha Hidup\"", tokoh: ["abubakar", "umar", "nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 3667–3668 (Aisyah)", url: sn("bukhari", 3667),
            isi: "Ketika Rasulullah ﷺ wafat, Abu Bakar sedang berada di As-Sunh (Al-'Aliyah). Ia segera datang, masuk menemui jenazah Nabi dan menciumnya, lalu keluar menenangkan orang-orang: siapa menyembah Muhammad, Muhammad telah wafat; siapa menyembah Allah, Allah Maha Hidup dan tidak akan mati.",
            ayat: { surah: "Ali 'Imran", no: "144", arab: "وَمَا مُحَمَّدٌ إِلَّا رَسُولٌ قَدْ خَلَتْ مِن قَبْلِهِ الرُّسُلُ" } },
          { t: [632, 632], judul: "Khalifah yang pulang-pergi dari As-Sunh", tokoh: ["abubakar"], derajat: "sirah", sumber: "Ibnu Sa'd, Ath-Thabaqat; Ath-Thabari, Tarikh",
            isi: "Setelah dibaiat menjadi khalifah, Abu Bakar masih tinggal sekitar enam bulan di As-Sunh dan berangkat ke kota setiap pagi, sebelum akhirnya pindah ke dekat masjid." }
        ] },

      { id: "masyrabah-mariyah", nama: "Masyrabah Ummu Ibrahim", arab: "مشربة أم إبراهيم", jenis: "rumah", e: 1450, n: -900, lod: 1, keyakinan: "perkiraan", ada: [629, 661],
        ket: "Rumah berkebun di 'Awali, timur kota, tempat tinggal Mariyah Al-Qibthiyyah. Di sini lahir Ibrahim, putra Nabi ﷺ, pada 8 H (630 M). Titik di peta perkiraan.",
        riwayat: [
          { t: [630, 630], judul: "Kelahiran Ibrahim", tokoh: ["mariyah", "ibrahim", "nabi", "muqawqis"], derajat: "sirah", sumber: "Ibnu Sa'd, Ath-Thabaqat al-Kubra",
            isi: "Mariyah, hadiah dari Muqauqis penguasa Mesir, tinggal di sebuah kebun di 'Awali yang kemudian dikenal sebagai Masyrabah Ummu Ibrahim. Di sinilah ia melahirkan Ibrahim, dan Nabi ﷺ sering mengunjunginya." },
          { t: [632, 632], judul: "Disusui di rumah Abu Saif", tokoh: ["ibrahim", "nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 1303 (Anas bin Malik)", url: sn("bukhari", 1303), lihat: "baqi",
            isi: "Ibrahim disusui di rumah Abu Saif, seorang pandai besi. Di sana Nabi ﷺ menjenguknya menjelang wafatnya. Lihat di Baqi'." }
        ] },

      { id: "quraizhah", nama: "Perkampungan Bani Quraizhah", arab: "بنو قريظة", jenis: "benteng", besar: true, e: 1900, n: -1450, lod: 1, keyakinan: "perkiraan", ada: [570, 627],
        ket: "Kabilah Yahudi di Wadi Mahzur, 'Awali tenggara kota, di tepi Harrah Waqim. Mereka terikat perjanjian dengan kaum Muslimin tetapi membatalkannya saat Perang Khandaq, lalu dikepung sekitar 25 hari pada akhir 5 H (627 M). Titik di peta perkiraan.",
        sumberLokasi: "Wikipedia: Banu Qurayza (Wadi Mahzur di Al-Harrah); IslamicLandmarks: Site of Banu Quraizah",
        riwayat: [
          { t: [618, 622], judul: "Salman di kebun tuannya", tokoh: ["salman"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam (kisah Salman dari Ibnu Ishaq); Musnad Ahmad",
            isi: "Salman Al-Farisi dibeli seorang Yahudi Bani Quraizhah dan dibawa ke Madinah sebagai budak. Ia sedang bekerja di kebun kurma tuannya ketika mendengar kabar kedatangan Nabi ﷺ di Quba.",
            catatan: "Tahun kedatangan Salman di Madinah tidak diketahui pasti." },
          { t: [627, 627], judul: "Perjanjian dibatalkan", tokoh: ["huyay", "kaabasad"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam; Wikipedia: Ka'b ibn Asad", url: W("Ka%27b_ibn_Asad"),
            isi: "Saat pasukan Ahzab mengepung Madinah, Huyay bin Akhthab mendatangi Ka'ab bin Asad, pemimpin Bani Quraizhah, dan terus membujuknya sampai ia membatalkan perjanjian dengan kaum Muslimin. Kaum Muslimin pun terancam dari dalam kota." },
          { t: [627, 627], judul: "\"Jangan shalat Ashar kecuali di Bani Quraizhah\"", tokoh: ["nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 4119 (Ibnu Umar)", url: sn("bukhari", 4119),
            matan: "لاَ يُصَلِّيَنَّ أَحَدٌ الْعَصْرَ إِلاَّ فِي بَنِي قُرَيْظَةَ",
            isi: "Sepulang dari Khandaq, Nabi ﷺ memerintahkan agar tidak ada yang shalat Ashar kecuali di Bani Quraizhah. Di perjalanan, sebagian sahabat shalat ketika waktunya tiba, sebagian lain menunggu sampai tiba. Nabi tidak menyalahkan kedua kelompok." },
          { t: [627, 627], judul: "Keputusan Sa'ad bin Mu'adz", tokoh: ["saadmuadz", "nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 4121 (Abu Sa'id Al-Khudri)", url: sn("bukhari", 4121),
            isi: "Bani Quraizhah setuju menerima keputusan Sa'ad bin Mu'adz, pemimpin Aus yang sedang terluka. Ketika ia datang, Nabi ﷺ bersabda kepada Anshar, \"Berdirilah untuk pemimpin kalian.\" Sa'ad menjatuhkan hukuman berat atas pengkhianatan itu, dan Nabi menyatakan keputusannya sesuai hukum Allah.",
            catatan: "Menurut HR. Bukhari no. 4028, laki-laki dewasa mereka dihukum mati, perempuan dan anak-anak ditawan, dan sebagian yang meminta perlindungan diberi keamanan lalu masuk Islam. Jumlah yang dihukum berbeda-beda dalam sumber." }
        ] },

      { id: "nadhir", nama: "Perkampungan Bani Nadhir", arab: "بنو النضير", jenis: "benteng", besar: true, e: 1650, n: -2650, lod: 1, keyakinan: "perkiraan", ada: [570, 625],
        ket: "Kabilah Yahudi yang memiliki benteng dan kebun kurma subur di 'Awali, tenggara kota, di sekitar Al-Buwairah dan Wadi Mudzainib. Mereka diusir pada 4 H (625 M). Masjid Al-Fadikh (Masjid Asy-Syams) kini menandai tempat Nabi ﷺ shalat selama pengepungan. Titik di peta perkiraan.",
        sumberLokasi: "Wikipedia: Mosque of Al-Fadeekh (Wadi Mudzainib, ±1 km dari Masjid Quba); Banu Nadir",
        riwayat: [
          { t: [625, 625], judul: "Rencana menjatuhkan batu", tokoh: ["nabi", "huyay"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam; Ar-Rahiq Al-Makhtum",
            isi: "Nabi ﷺ datang ke Bani Nadhir untuk membicarakan bantuan diyat dan duduk di samping dinding rumah mereka. Beliau mendapat kabar bahwa mereka berencana menjatuhkan batu dari atas dinding, lalu segera kembali ke Madinah. Bani Nadhir menolak perintah keluar dan dikepung beberapa hari hingga menyerah.",
            ayat: { surah: "Al-Hasyr", no: "2", arab: "هُوَ الَّذِي أَخْرَجَ الَّذِينَ كَفَرُوا مِنْ أَهْلِ الْكِتَابِ مِن دِيَارِهِمْ لِأَوَّلِ الْحَشْرِ" },
            catatan: "Lama pengepungan berbeda dalam riwayat, dari sekitar enam malam sampai dua pekan." },
          { t: [625, 625], judul: "Kebun kurma Al-Buwairah", tokoh: [], derajat: "shahih", sumber: "HR. Bukhari no. 4031 (Ibnu Umar)", url: sn("bukhari", 4031),
            isi: "Sebagian pohon kurma Bani Nadhir di Al-Buwairah ditebang dan dibakar selama pengepungan. Lalu turun ayat yang menjelaskan bahwa hal itu terjadi dengan izin Allah.",
            ayat: { surah: "Al-Hasyr", no: "5", arab: "مَا قَطَعْتُم مِّن لِّينَةٍ أَوْ تَرَكْتُمُوهَا قَائِمَةً عَلَىٰ أُصُولِهَا فَبِإِذْنِ اللَّهِ" } },
          { t: [625, 625], judul: "Pindah ke Khaibar", tokoh: ["huyay"], derajat: "shahih", sumber: "HR. Bukhari no. 4028 (Ibnu Umar); Wikipedia: Banu Nadir", url: sn("bukhari", 4028),
            isi: "Bani Nadhir diusir dari Madinah. Sebagian besar pindah ke Khaibar bersama pemimpin mereka, Huyay bin Akhthab, dan sebagian lain ke Syam.",
            catatan: "Hadits ini menyebut pengusirannya; tujuan Khaibar dan Syam dari kitab sirah." }
        ] },

      { id: "bir-ghars", nama: "Sumur Ghars", arab: "بئر غرس", jenis: "sumur", e: 1843, n: -2445, lod: 1, keyakinan: "kitab",
        ket: "Sumur di sisi timur kawasan Quba yang airnya disukai Nabi ﷺ. Sumurnya masih ada dan telah dipugar.",
        sumberLokasi: "Wikipedia: Gharas Well (24.44519, 39.62939)",
        riwayat: [
          { t: [632, 632], judul: "Pesan tentang air Ghars", tokoh: ["nabi", "ali"], derajat: "lemah", sumber: "HR. Ibnu Majah no. 1468 (Ali bin Abi Thalib)", url: sn("ibnmajah", 1468),
            isi: "Ali meriwayatkan bahwa Nabi ﷺ berpesan: bila beliau wafat, mandikanlah beliau dengan tujuh timba air dari sumur beliau, sumur Ghars.",
            catatan: "Dinilai dha'if (lemah) oleh Darussalam." }
        ] },

      // ---------- Quba ----------
      { id: "bani-amr-auf", nama: "Perkampungan Bani Amr bin Auf (Quba)", arab: "بنو عمرو بن عوف", jenis: "kawasan", e: 750, n: -3250, lod: 1, keyakinan: "kitab",
        ket: "Kabilah Aus di Quba, di dataran tinggi selatan Madinah ('Aliyah). Di sinilah Nabi ﷺ pertama kali singgah dalam hijrah dan membangun Masjid Quba.",
        riwayat: [
          { t: [622, 622], judul: "Empat belas malam di Quba", tokoh: ["nabi", "abubakar"], derajat: "shahih", sumber: "HR. Bukhari no. 428 (Anas bin Malik)", url: sn("bukhari", 428),
            isi: "Nabi ﷺ tiba dan singgah di bagian atas Madinah, di perkampungan Bani Amr bin Auf, selama empat belas malam. Lalu beliau memanggil Bani Najjar, yang datang menjemput beliau dengan menyandang pedang.",
            catatan: "Lama tinggal di Quba berbeda dalam riwayat: empat hari (Ibnu Ishaq), lebih dari sepuluh malam (HR. Bukhari no. 3906), atau empat belas malam (hadits ini)." }
        ] },

      { id: "masjid-quba", nama: "Masjid Quba", arab: "مسجد قباء", jenis: "masjid", besar: true, e: 610, n: -3110, lod: 0, keyakinan: "pasti", ada: [622, 661],
        kiblat: [{ t: [622, 624], arah: "utara" }, { t: [624, 661], arah: "selatan" }],
        ket: "Masjid pertama yang dibangun Nabi ﷺ setelah hijrah, di perkampungan Bani Amr bin Auf, sekitar 3 km di selatan Masjid Nabawi. Menurut sebagian riwayat, tanahnya bekas tempat menjemur kurma milik Kultsum bin Al-Hidm.",
        sumberLokasi: "Wikipedia: Quba Mosque (24.43917, 39.61722)",
        riwayat: [
          { t: [622, 622], judul: "Masjid yang dibangun di atas takwa", tokoh: ["nabi", "abubakar", "kultsum"], derajat: "shahih", sumber: "HR. Bukhari no. 3906 (Urwah bin Az-Zubair)", url: sn("bukhari", 3906),
            isi: "Nabi ﷺ tiba di perkampungan Bani Amr bin Auf pada hari Senin bulan Rabi'ul Awwal, tinggal di sana lebih dari sepuluh malam, dan mendirikan masjid yang dibangun di atas takwa, lalu shalat di dalamnya.",
            ayat: { surah: "At-Taubah", no: "108", arab: "لَّمَسْجِدٌ أُسِّسَ عَلَى التَّقْوَىٰ مِنْ أَوَّلِ يَوْمٍ أَحَقُّ أَن تَقُومَ فِيهِ ۚ فِيهِ رِجَالٌ يُحِبُّونَ أَن يَتَطَهَّرُوا" },
            catatan: "Dalam HR. Muslim no. 1398, Nabi menyebut masjid yang dibangun di atas takwa adalah masjid beliau di Madinah. Ulama menjelaskan keduanya sama-sama dibangun di atas takwa." },
          { t: [624, 624], judul: "Berputar di tengah shalat Subuh", tontonan: "kiblat", tokoh: [], derajat: "shahih", sumber: "HR. Bukhari no. 403 (Ibnu Umar)", url: sn("bukhari", 403),
            isi: "Penduduk Quba sedang shalat Subuh ketika seseorang datang mengabarkan bahwa semalam turun perintah menghadap Ka'bah. Mereka yang tadinya menghadap Syam langsung berputar menghadap Ka'bah." },
          { t: [622, 632], judul: "Setiap hari Sabtu", tokoh: ["nabi", "ibnuumar"], derajat: "shahih", sumber: "HR. Bukhari no. 1193 (Ibnu Umar)", url: sn("bukhari", 1193),
            isi: "Nabi ﷺ biasa datang ke Masjid Quba setiap hari Sabtu, kadang berjalan kaki dan kadang berkendara. Ibnu Umar pun melakukan hal yang sama." },
          { t: null, judul: "Seperti umrah", tokoh: ["nabi"], derajat: "shahih", sumber: "HR. Tirmidzi no. 324 (Usaid bin Zhuhair Al-Anshari)", url: sn("tirmidhi", 324),
            isi: "Nabi ﷺ bersabda bahwa shalat di Masjid Quba seperti umrah.",
            catatan: "Dinilai hasan (Darussalam); At-Tirmidzi menyebutnya hasan gharib." }
        ] },

      { id: "rumah-kultsum", nama: "Rumah Kultsum bin Al-Hidm", arab: "دار كلثوم بن الهدم", jenis: "rumah", e: 660, n: -3165, lod: 1, keyakinan: "perkiraan",
        ket: "Rumah sesepuh Bani Amr bin Auf di Quba, tempat Nabi ﷺ menginap saat tiba dari Mekah. Letak persisnya di sekitar Masjid Quba tidak tercatat jelas.",
        riwayat: [
          { t: [622, 622], judul: "Menginap di rumah Kultsum", tokoh: ["nabi", "kultsum"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam",
            isi: "Di Quba, Nabi ﷺ menginap di rumah Kultsum bin Al-Hidm. Untuk menerima tamu, beliau duduk di rumah Sa'ad bin Khaitsamah, yang dijuluki rumah para bujangan karena dihuni Muhajirin yang belum berkeluarga." },
          { t: [622, 622], judul: "Ali menyusul", tokoh: ["ali", "nabi"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam",
            isi: "Ali bin Abi Thalib tinggal di Mekah tiga hari untuk mengembalikan barang-barang titipan orang kepada Nabi ﷺ. Setelah itu ia menyusul dan menginap bersama beliau di Quba." }
        ] },

      { id: "bir-aris", nama: "Sumur Aris", arab: "بئر أريس", jenis: "sumur", e: 555, n: -3150, lod: 1, keyakinan: "kitab",
        ket: "Sumur di sebuah kebun di barat daya Masjid Quba. Dikenal juga sebagai Bi'r al-Khatam (sumur cincin) karena cincin Nabi ﷺ jatuh ke dalamnya dari tangan Utsman.",
        sumberLokasi: "Madain Project: Historic Wells of Medina (barat daya Masjid Quba)",
        riwayat: [
          { t: null, judul: "Abu Musa menjaga pintu", tokoh: ["nabi", "abumusa", "abubakar", "umar", "utsman"], derajat: "shahih", sumber: "HR. Bukhari no. 3674 (Abu Musa Al-Asy'ari)", url: sn("bukhari", 3674),
            isi: "Abu Musa menjaga pintu kebun ketika Nabi ﷺ duduk di bibir sumur Aris dengan kaki terjulur ke dalamnya. Abu Bakar datang, diberi kabar gembira surga, lalu duduk di kanan beliau. Umar datang dengan kabar yang sama dan duduk di kiri. Utsman diberi kabar gembira surga disertai ujian yang akan menimpanya; karena bibir sumur sudah penuh, ia duduk di seberang." },
          { t: [644, 656], judul: "Cincin yang jatuh", tokoh: ["utsman", "abubakar", "umar"], derajat: "shahih", sumber: "HR. Bukhari no. 5879 (Anas bin Malik)", url: sn("bukhari", 5879),
            isi: "Cincin Nabi ﷺ dipakai Abu Bakar, lalu Umar, lalu Utsman. Suatu hari Utsman duduk di sumur Aris, melepas cincin itu sambil memainkannya, dan cincin itu jatuh ke dalam sumur. Selama tiga hari orang-orang mencarinya bersama Utsman, bahkan menguras sumurnya, tetapi cincin itu tidak ditemukan.",
            catatan: "Hadits ini hanya menyebut terjadi di masa kekhalifahan Utsman (644–656 M)." }
        ] },

      { id: "masjid-jumuah", nama: "Masjid Jumu'ah (Bani Salim bin Auf)", arab: "مسجد الجمعة", jenis: "masjid", e: 419, n: -2410, lod: 1, keyakinan: "kitab", ada: [622, 661],
        ket: "Di lembah Ranuna', perkampungan Bani Salim bin Auf, sekitar 900 m di utara Masjid Quba. Di sinilah Nabi ﷺ melaksanakan shalat Jumat pertama dalam perjalanan dari Quba ke pusat kota.",
        sumberLokasi: "Wikipedia: Al Jum'ah Mosque (24.4455, 39.61533)",
        riwayat: [
          { t: [622, 622], judul: "Shalat Jumat pertama", tokoh: ["nabi"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam",
            isi: "Pada hari Jumat Nabi ﷺ berangkat dari Quba. Waktu Jumat tiba ketika beliau sampai di perkampungan Bani Salim bin Auf, maka beliau shalat Jumat bersama mereka di dasar lembah Ranuna'. Inilah shalat Jumat pertama yang beliau pimpin di Madinah, lengkap dengan khutbah.",
            catatan: "Tanggalnya tidak disepakati karena hari tiba di Quba dan lama tinggal di sana berbeda dalam riwayat." }
        ] },

      // ---------- Barat dan barat laut ----------
      { id: "masjid-qiblatain", nama: "Masjid Qiblatain", arab: "مسجد القبلتين", jenis: "masjid", e: -3271, n: 1856, lod: 0, keyakinan: "pasti",
        namaLama: [{ t: [622, 624], nama: "Masjid Bani Salimah" }],
        kiblat: [{ t: [622, 624], arah: "utara" }, { t: [624, 661], arah: "selatan" }],
        ket: "Masjid Bani Salimah di tepi Harrah Wabrah, barat laut kota. Dinamai Qiblatain (dua kiblat) karena di masjid ini jamaah berputar arah di tengah shalat ketika kabar perpindahan kiblat datang.",
        sumberLokasi: "Wikipedia: Masjid al-Qiblatayn (24.48409, 39.57891)",
        riwayat: [
          { t: [624, 624], judul: "Berputar dalam keadaan rukuk", tontonan: "kiblat", tokoh: [], derajat: "shahih", sumber: "HR. Bukhari no. 40 (Al-Bara' bin Azib)", url: sn("bukhari", 40),
            isi: "Seorang sahabat yang baru shalat bersama Nabi ﷺ melewati jamaah sebuah masjid yang sedang rukuk. Ia berkata bahwa ia baru shalat bersama Nabi menghadap Mekah, dan mereka langsung berputar menghadap Ka'bah dalam keadaan rukuk.",
            catatan: "Hadits ini tidak menyebut nama masjidnya. Kitab sirah mengaitkannya dengan masjid Bani Salimah." },
          { t: [624, 624], judul: "Riwayat shalat Zhuhur di Bani Salimah", tokoh: ["nabi"], derajat: "sirah", sumber: "Ibnu Sa'd, Ath-Thabaqat (dari Al-Waqidi); Wikipedia: Masjid al-Qiblatayn", url: W("Masjid_al-Qiblatayn"),
            isi: "Menurut riwayat sirah, Nabi ﷺ sedang berkunjung ke perkampungan Bani Salimah dan shalat Zhuhur di masjid mereka ketika perintah menghadap Ka'bah turun di tengah shalat. Beliau berputar, dan jamaah mengikutinya.",
            catatan: "Berbeda dengan HR. Bukhari no. 40 yang menyebut shalat pertama beliau menghadap Ka'bah adalah Ashar. Tempat dan shalat persisnya diperselisihkan ulama." }
        ] },

      { id: "bir-rumah", nama: "Sumur Rumah (Sumur Utsman)", arab: "بئر رومة", jenis: "sumur", e: -2647, n: 2870, lod: 1, keyakinan: "pasti",
        ket: "Sumur berair tawar di kawasan Wadi Al-'Aqiq, barat laut kota. Utsman bin Affan membelinya lalu mewakafkannya untuk kaum Muslimin. Sumur ini masih ada dan dikenal sebagai Sumur Utsman.",
        sumberLokasi: "Wikipedia: Bir Rumah (24.49326, 39.58507)",
        riwayat: [
          { t: [622, 624], judul: "Dibeli untuk kaum Muslimin", tokoh: ["utsman", "nabi"], derajat: "shahih", sumber: "HR. Tirmidzi no. 3703 (Tsumamah bin Hazn Al-Qusyairi)", url: sn("tirmidhi", 3703),
            isi: "Ketika Nabi ﷺ tiba di Madinah, air tawar hanya ada di sumur Rumah. Nabi bertanya siapa yang mau membelinya untuk kaum Muslimin dengan balasan yang lebih baik di surga. Utsman membelinya dengan hartanya sendiri.",
            catatan: "Dinilai hasan (Darussalam). Tahun pembeliannya tidak disebut; diperkirakan tahun-tahun awal setelah hijrah." },
          { t: [656, 656], judul: "\"Siapa menggali Rumah, baginya surga\"", tokoh: ["utsman"], derajat: "shahih", sumber: "HR. Bukhari no. 2778", url: sn("bukhari", 2778), lihat: "rumah-utsman",
            matan: "مَنْ حَفَرَ رُومَةَ فَلَهُ الْجَنَّةُ",
            isi: "Saat dikepung, Utsman mengingatkan orang-orang akan sabda Nabi ﷺ ini dan bahwa dialah yang menggali sumur Rumah." }
        ] },

      { id: "tsaniyyah-wada", nama: "Tsaniyyatul Wada'", arab: "ثنية الوداع", jenis: "titik", e: -700, n: 1150, lod: 1, keyakinan: "kitab",
        ket: "Celah jalan di barat laut kota pada jalur ke Syam, tempat penduduk melepas dan menyambut orang yang bepergian. Ada pendapat bahwa ada juga Tsaniyyatul Wada' di jalur selatan arah Mekah; peta ini mengikuti pendapat jalur Syam. Titiknya perkiraan.",
        riwayat: [
          { t: null, judul: "Lomba pacuan kuda", tokoh: ["nabi", "ibnuumar"], derajat: "shahih", sumber: "HR. Bukhari no. 420 (Ibnu Umar)", url: sn("bukhari", 420),
            isi: "Nabi ﷺ mengadakan lomba pacuan kuda. Kuda yang terlatih berlomba dari Al-Hafya' sampai Tsaniyyatul Wada', sedangkan kuda yang belum terlatih dari Tsaniyyah sampai masjid Bani Zuraiq. Ibnu Umar ikut berlomba." },
          { t: [630, 630], judul: "Anak-anak menyambut Nabi ﷺ", tokoh: ["nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 3083 (As-Saib bin Yazid)", url: sn("bukhari", 3083),
            isi: "As-Saib bin Yazid bercerita, ia bersama anak-anak lain keluar ke Tsaniyyatul Wada' untuk menyambut Rasulullah ﷺ yang pulang dari peperangan.",
            catatan: "Hadits ini tidak menyebut perangnya; banyak ulama mengaitkannya dengan kepulangan dari Tabuk (630 M)." },
          { t: [622, 622], judul: "Syair \"Thala'al badru 'alaina\"", tokoh: ["nabi"], derajat: "lemah", sumber: "Al-Baihaqi, Dala'il an-Nubuwwah; Ibnul Qayyim, Zadul Ma'ad",
            isi: "Syair terkenal ini disebut dinyanyikan penduduk Madinah saat menyambut Nabi ﷺ dari Tsaniyyatul Wada' ketika hijrah.",
            catatan: "Sanadnya lemah karena terputus. Ibnul Qayyim berpendapat syair ini lebih cocok saat pulang dari Tabuk, karena Tsaniyyatul Wada' berada di arah Syam, bukan arah Mekah." }
        ] },

      { id: "sal", nama: "Gunung Sal'", arab: "جبل سلع", jenis: "gunung", e: -1191, n: 851, lod: 0, keyakinan: "pasti",
        ket: "Bukit batu memanjang dari utara ke selatan di barat laut Masjid Nabawi, sekitar 80 m di atas dataran. Saat Perang Khandaq, pasukan Muslimin berkemah dengan Sal' di belakang mereka.",
        sumberLokasi: "Wikipedia: Sela (Saudi Arabia) (puncak 24.475, 39.59944)",
        riwayat: [
          { t: null, judul: "Awan dari balik Sal'", tokoh: ["nabi", "anas"], derajat: "shahih", sumber: "HR. Bukhari no. 1013 (Anas bin Malik)", url: sn("bukhari", 1013),
            isi: "Seorang laki-laki masuk saat Nabi ﷺ berkhutbah Jumat dan meminta hujan. Nabi berdoa. Saat itu langit bersih, dan tidak ada rumah atau bangunan antara mereka dan Sal'. Lalu muncul awan seperti perisai dari balik Sal', hujan turun, dan mereka tidak melihat matahari selama enam hari." },
          { t: [627, 627], judul: "Berkemah membelakangi Sal'", tontonan: "khandaq", tokoh: ["nabi"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam; Wikipedia: Battle of the Trench", url: W("Battle_of_the_Trench"),
            isi: "Saat Perang Khandaq, Nabi ﷺ keluar bersama sekitar 3.000 Muslim dan berkemah dengan Gunung Sal' di belakang mereka, sementara parit memisahkan mereka dari pasukan Ahzab." },
          { t: [630, 630], judul: "Seruan dari atas Sal'", tokoh: ["kaab", "nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 4418 (Ka'ab bin Malik)", url: sn("bukhari", 4418),
            isi: "Setelah lima puluh malam dijauhi karena tidak ikut Perang Tabuk, Ka'ab bin Malik mendengar seseorang berseru dari atas Sal', \"Wahai Ka'ab bin Malik, bergembiralah!\" Itulah kabar bahwa taubatnya diterima.",
            ayat: { surah: "At-Taubah", no: "118", arab: "وَعَلَى الثَّلَاثَةِ الَّذِينَ خُلِّفُوا" } }
        ] },

      { id: "masjid-fath", nama: "Masjid Al-Fath", arab: "مسجد الفتح", jenis: "masjid", e: -1535, n: 1075, lod: 1, keyakinan: "kitab", ada: [627, 661],
        ket: "Di kaki barat Gunung Sal', tempat Nabi ﷺ berdoa memohon kemenangan saat Perang Khandaq. Bangunan masjidnya didirikan kemudian; bersama masjid-masjid kecil di sekitarnya dikenal sebagai Masjid Tujuh.",
        sumberLokasi: "Wikipedia: The Seven Mosques (24.47683, 39.59597)",
        riwayat: [
          { t: [627, 627], judul: "Doa yang dikabulkan hari Rabu", tontonan: "khandaq", tokoh: ["nabi", "jabir"], derajat: "shahih", sumber: "Al-Bukhari, Al-Adab Al-Mufrad no. 704 (Jabir bin Abdullah)", url: sn("adab", 704),
            isi: "Nabi ﷺ berdoa di Masjid Al-Fath pada hari Senin, Selasa, dan Rabu. Doa beliau dikabulkan pada hari Rabu di antara dua shalat. Sejak itu, setiap ada urusan berat, Jabir memilih waktu yang sama untuk berdoa dan ia selalu mendapati doanya dikabulkan.",
            catatan: "Dinilai hasan oleh Al-Albani. Hadits ini tidak menyebut tahunnya; ulama mengaitkannya dengan Perang Khandaq." }
        ] },

      { id: "khandaq", nama: "Parit Khandaq", arab: "الخندق", jenis: "titik", e: -1250, n: 1640, lod: 0, keyakinan: "kitab", ada: [627, 627],
        ket: "Parit yang digali kaum Muslimin pada 5 H (627 M) di sisi utara kota, dari tepi Harrah Waqim di Bani Haritsah sampai Harrah Wabrah, melewati utara Gunung Sal'. Garis di peta sekitar 4,7 km; perkiraan modern panjang parit ini sekitar 5,5 km. Parit hanya tampak pada tahun 627.",
        sumberLokasi: "Wikipedia: Battle of the Trench; Bani Harithah Mosque (parit dimulai di Bani Haritsah). Garis parit perkiraan.",
        riwayat: [
          { t: [627, 627], judul: "Usul Salman", tokoh: ["salman", "nabi"], derajat: "sirah", sumber: "Ibnu Sa'd, Ath-Thabaqat; Ar-Rahiq Al-Makhtum",
            isi: "Salman Al-Farisi mengusulkan menggali parit, cara bertahan yang biasa di Persia tetapi belum dikenal bangsa Arab. Nabi ﷺ menerima usul itu dan membagi tugas: setiap sepuluh orang menggali sekitar 40 hasta." },
          { t: [627, 627], judul: "Menggali di pagi yang dingin", tontonan: "khandaq", tokoh: ["nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 4099 (Anas bin Malik)", url: sn("bukhari", 4099),
            isi: "Pada pagi yang dingin, Nabi ﷺ mendapati Muhajirin dan Anshar menggali parit sendiri tanpa pembantu. Melihat mereka letih dan lapar, beliau bersyair, \"Ya Allah, kehidupan sejati adalah kehidupan akhirat, maka ampunilah Anshar dan Muhajirin.\" Mereka menjawab, \"Kamilah yang telah membaiat Muhammad untuk berjihad selama kami hidup.\"" },
          { t: [627, 627], judul: "Batu keras dan jamuan Jabir", tokoh: ["nabi", "jabir"], derajat: "shahih", sumber: "HR. Bukhari no. 4101 (Jabir bin Abdullah)", url: sn("bukhari", 4101),
            isi: "Para penggali terhalang batu besar yang keras. Nabi ﷺ turun dan memukulnya dengan cangkul hingga hancur seperti pasir, padahal saat itu beliau mengganjal perut dengan batu karena sudah tiga hari tidak makan. Jabir lalu menyiapkan seekor anak kambing dan sedikit gandum, dan makanan itu cukup untuk Muhajirin dan Anshar." }
        ] },

      { id: "kemah-ahzab", nama: "Perkemahan Pasukan Ahzab", arab: "مجتمع الأسيال", jenis: "titik", e: -2650, n: 4000, lod: 1, keyakinan: "perkiraan", ada: [627, 627],
        ket: "Pasukan Quraisy dan sekutunya berkemah di pertemuan aliran wadi (Mujtama' al-Asyal) dekat sumur Rumah, antara Al-Jurf dan Zaghabah. Pasukan Ghathafan berkemah di dekat Uhud. Titik di peta perkiraan.",
        riwayat: [
          { t: [627, 627], judul: "Pasukan sekutu tiba", tokoh: ["abusufyan"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam",
            isi: "Pasukan Ahzab, sekitar 10.000 orang dari Quraisy, Ghathafan, dan sekutunya, datang dari utara. Quraisy berkemah di Mujtama' al-Asyal dekat Rumah, sedangkan Ghathafan di Dzanab Naqma di sisi Uhud. Mereka terkejut mendapati parit, siasat yang belum pernah mereka lihat." },
          { t: [627, 627], judul: "Dari atas dan dari bawah", tokoh: ["aisyah"], derajat: "shahih", sumber: "HR. Bukhari no. 4103 (Aisyah)", url: sn("bukhari", 4103),
            isi: "Aisyah menjelaskan bahwa ayat ini turun tentang hari Khandaq, ketika musuh datang dari atas dan dari bawah lembah.",
            ayat: { surah: "Al-Ahzab", no: "10", arab: "إِذْ جَاءُوكُم مِّن فَوْقِكُمْ وَمِنْ أَسْفَلَ مِنكُمْ وَإِذْ زَاغَتِ الْأَبْصَارُ" } }
        ] },

      // ---------- Utara: Uhud ----------
      { id: "syaikhain", nama: "Syaikhain (perkemahan sebelum Uhud)", arab: "الشيخان", jenis: "titik", e: -262, n: 2418, lod: 1, keyakinan: "kitab",
        ket: "Tempat Nabi ﷺ bermalam bersama pasukan sebelum Perang Uhud, di jalan antara Masjid Nabawi dan Uhud. Kini di sini berdiri Masjid Asy-Syaikhain, juga disebut Masjid Ad-Dir' (baju besi).",
        sumberLokasi: "Wikipedia: Al-Deraa Mosque (24.48917, 39.60861)",
        riwayat: [
          { t: [625, 625], judul: "Malam sebelum Uhud", tokoh: ["nabi", "ibnuumar", "zaidtsabit"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam; Al-Waqidi, Al-Maghazi; Wikipedia: Al-Deraa Mosque", url: W("Al-Deraa_Mosque"),
            isi: "Nabi ﷺ singgah di Syaikhain pada sore hari, shalat Ashar, Maghrib, dan Isya, lalu bermalam. Di sini beliau memeriksa pasukan dan memulangkan beberapa remaja yang dianggap terlalu muda, di antaranya Abdullah bin Umar dan Zaid bin Tsabit. Menjelang Subuh pasukan bergerak ke Uhud." }
        ] },

      { id: "rumat", nama: "Jabal Rumat (Bukit Pemanah)", arab: "جبل الرماة", jenis: "bukit", e: 123, n: 3839, lod: 1, keyakinan: "pasti",
        ket: "Bukit kecil di tepi selatan Wadi Qanat, di depan Gunung Uhud, juga disebut Jabal 'Ainain. Di sini Nabi ﷺ menempatkan 50 pemanah. Kini bukit ini tampak rendah karena tertimbun endapan wadi.",
        sumberLokasi: "AroundUs: Jabal al-Rumah (24.50202, 39.61241)",
        riwayat: [
          { t: [625, 625], judul: "\"Jangan tinggalkan tempat kalian\"", tontonan: "uhud", tokoh: ["nabi", "abdullahjubair"], derajat: "shahih", sumber: "HR. Bukhari no. 3039 (Al-Bara' bin Azib)", url: sn("bukhari", 3039),
            isi: "Nabi ﷺ menempatkan 50 pemanah di bawah pimpinan Abdullah bin Jubair dan berpesan, \"Tetaplah di tempat kalian, walaupun kalian melihat burung menyambar kami.\" Ketika musuh mundur, sebagian besar pemanah turun mengambil rampasan meski Abdullah bin Jubair mengingatkan. Musuh lalu berbalik menyerang. Hanya sekitar 12 orang yang tetap bersama Nabi, dan 70 Muslim gugur." },
          { t: [625, 625], judul: "Seruan Abu Sufyan", tokoh: ["abusufyan", "umar", "nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 3039 (Al-Bara' bin Azib)", url: sn("bukhari", 3039),
            isi: "Seusai pertempuran, Abu Sufyan berseru menanyakan apakah Muhammad, Abu Bakar, dan Umar masih hidup. Nabi ﷺ menyuruh sahabat diam, lalu Umar menjawab bahwa mereka semua hidup. Ketika Abu Sufyan memuji berhalanya, kaum Muslimin menjawab, \"Allah lebih tinggi dan lebih agung. Allah pelindung kami, dan kalian tidak punya pelindung.\"" }
        ] },

      { id: "syuhada-uhud", nama: "Makam Syuhada Uhud", arab: "مقبرة شهداء أحد", jenis: "makam", e: 220, n: 3960, lod: 1, keyakinan: "pasti", ada: [625, 661],
        ket: "Para sahabat yang gugur di Uhud dimakamkan di medan perang itu sendiri, dekat Jabal Rumat. Di antaranya Hamzah bin Abdul Muthalib, paman Nabi ﷺ, dan Mush'ab bin Umair.",
        sumberLokasi: "Wikipedia: Battle of Uhud; Madain Project: Sayed as-Shuhada (±3,5 km di utara Masjid Nabawi)",
        riwayat: [
          { t: [625, 625], judul: "Dimakamkan seperti saat gugur", tokoh: ["nabi", "jabir"], derajat: "shahih", sumber: "HR. Bukhari no. 1343 (Jabir bin Abdullah)", url: sn("bukhari", 1343),
            isi: "Nabi ﷺ memakamkan dua syuhada Uhud dalam satu kain, mendahulukan yang lebih banyak hafalan Al-Qur'annya. Mereka dimakamkan dalam keadaan seperti saat gugur, tanpa dimandikan dan tanpa dishalatkan waktu itu. Beliau bersabda, \"Aku akan menjadi saksi bagi mereka pada hari kiamat.\"" },
          { t: [625, 625], judul: "Gugurnya Hamzah", tokoh: ["hamzah", "wahsyi", "musailamah"], derajat: "shahih", sumber: "HR. Bukhari no. 4072 (Ja'far bin Amr, dari Wahsyi)", url: sn("bukhari", 4072),
            isi: "Wahsyi, budak Jubair bin Muth'im, dijanjikan kemerdekaan bila membunuh Hamzah. Ia bersembunyi di balik batu lalu melemparkan tombaknya, dan Hamzah gugur. Bertahun-tahun kemudian Wahsyi bergabung dengan kaum Muslimin, dan di Yamamah ia turut menjatuhkan Musailamah." },
          { t: [632, 632], judul: "Shalat untuk syuhada setelah delapan tahun", tokoh: ["nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 4042 (Uqbah bin Amir)", url: sn("bukhari", 4042),
            isi: "Delapan tahun setelah Uhud, Nabi ﷺ menshalati para syuhada Uhud, seakan berpamitan kepada yang hidup dan yang telah wafat.",
            catatan: "Ini terjadi tidak lama sebelum Nabi wafat." }
        ] },

      { id: "uhud", nama: "Gunung Uhud", arab: "جبل أحد", jenis: "gunung", e: 300, n: 5300, lod: 0, keyakinan: "pasti",
        ket: "Gunung batu kemerahan sepanjang sekitar 7,5 km di utara Madinah, puncaknya 1.077 m di atas permukaan laut. Di kaki selatannya terjadi Perang Uhud pada 3 H (625 M).",
        sumberLokasi: "Wikipedia: Mount Uhud (24.51028, 39.61389)",
        riwayat: [
          { t: [625, 625], judul: "Perang Uhud", tontonan: "uhud", tokoh: ["nabi", "abdullahubay", "khalid", "abusufyan"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam; Ar-Rahiq Al-Makhtum; Wikipedia: Battle of Uhud", url: W("Battle_of_Uhud"),
            isi: "Pada Syawwal 3 H, sekitar 3.000 pasukan Quraisy datang membalas kekalahan di Badar. Nabi ﷺ berangkat dengan sekitar 1.000 orang; Abdullah bin Ubay kembali bersama sekitar 300 orang, sehingga tersisa sekitar 700. Kaum Muslimin unggul di awal, tetapi setelah sebagian pemanah meninggalkan pos, pasukan berkuda Khalid bin Walid menyerang dari belakang. Sekitar 70 sahabat gugur." },
          { t: [630, 630], judul: "\"Gunung yang mencintai kita\"", tokoh: ["nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 4422 (Abu Humaid As-Sa'idi); juga no. 4083 (Anas)", url: sn("bukhari", 4422),
            matan: "هَذَا جَبَلٌ يُحِبُّنَا وَنُحِبُّهُ",
            isi: "Sepulang dari Tabuk, ketika Madinah sudah terlihat, Nabi ﷺ bersabda, \"Ini Thabah (Madinah), dan ini Uhud, gunung yang mencintai kita dan kita mencintainya.\"" },
          { t: null, judul: "\"Tenanglah, Uhud!\"", tokoh: ["nabi", "abubakar", "umar", "utsman"], derajat: "shahih", sumber: "HR. Bukhari no. 3675 (Anas bin Malik)", url: sn("bukhari", 3675),
            isi: "Nabi ﷺ naik ke Uhud bersama Abu Bakar, Umar, dan Utsman, lalu gunung itu bergetar. Beliau bersabda, \"Tenanglah, Uhud! Di atasmu hanya ada seorang nabi, seorang shiddiq, dan dua syahid.\"",
            catatan: "Kelak Umar dan Utsman memang wafat sebagai syahid." }
        ] },

      { id: "tsaur", nama: "Gunung Tsaur (Madinah)", arab: "جبل ثور", jenis: "gunung", e: -400, n: 8300, lod: 1, keyakinan: "kitab",
        ket: "Gunung kecil kemerahan di belakang (utara) Gunung Uhud, sekitar 9 km dari Masjid Nabawi, batas utara tanah haram Madinah. Bukan Gua Tsur tempat persembunyian hijrah di Mekah. Titik di peta perkiraan.",
        sumberLokasi: "Visit Madinah: Mount Thawr (di belakang Uhud, ±9 km dari Masjid Nabawi)",
        riwayat: [
          { t: null, judul: "Batas utara tanah haram", tokoh: ["ali", "nabi"], derajat: "shahih", sumber: "HR. Muslim no. 1370; HR. Bukhari no. 6755 (Ali bin Abi Thalib)", url: sn("muslim", 1370), lihat: "ayr",
            matan: "الْمَدِينَةُ حَرَمٌ مَا بَيْنَ عَيْرٍ إِلَى ثَوْرٍ",
            isi: "Madinah adalah tanah haram dari 'Ayr sampai Tsaur.",
            catatan: "Sebagian ulama dahulu mengira Tsaur hanya ada di Mekah. Ahli sejarah Madinah kemudian menunjukkan gunung kecil di belakang Uhud yang bernama Tsaur." }
        ] },

      { id: "qanat", nama: "Wadi Qanat", arab: "وادي قناة", jenis: "kawasan", e: 700, n: 4150, lod: 0, keyakinan: "pasti",
        ket: "Lembah yang datang dari timur dan mengalir ke barat di kaki selatan Gunung Uhud, lalu bertemu Wadi Al-'Aqiq di utara kota. Medan Perang Uhud berada di tepinya. Garis di peta perkiraan.",
        riwayat: [
          { t: [625, 625], judul: "Medan Uhud di tepi Qanat", tontonan: "uhud", tokoh: ["nabi", "abusufyan"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam; Ar-Rahiq Al-Makhtum",
            isi: "Pasukan Quraisy berkemah di dekat Jabal 'Ainain di tepi Wadi Qanat, berhadapan dengan Madinah. Nabi ﷺ menempatkan pasukan di kaki Uhud dengan gunung di belakang mereka, dan para pemanah di bukit di tepi lembah ini." }
        ] },

      // ---------- Medan alam ----------
      { id: "harrah-waqim", nama: "Harrah Waqim (Harrah Timur)", arab: "حرة واقم", jenis: "kawasan", e: 3500, n: 0, lod: 0, keyakinan: "pasti",
        ket: "Hamparan batu basal hitam bekas aliran lava di timur Madinah. Menurut ahli sejarah Madinah, namanya diambil dari Waqim, benteng milik Bani Abdul Asyhal. Batu-batunya menyulitkan pasukan berkuda, sehingga sisi ini tidak perlu digali parit.",
        riwayat: [
          { t: null, judul: "Haram di antara dua harrah", tokoh: ["abuhurairah", "nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 1873 (Abu Hurairah)", url: sn("bukhari", 1873),
            matan: "مَا بَيْنَ لاَبَتَيْهَا حَرَامٌ",
            isi: "Abu Hurairah berkata, seandainya ia melihat kijang merumput di Madinah, ia tidak akan mengusiknya, karena Nabi ﷺ bersabda bahwa wilayah di antara dua labah Madinah adalah tanah haram.",
            catatan: "Labah berarti tanah berbatu hitam (harrah). Dua labah yang dimaksud adalah harrah timur dan harrah barat Madinah." }
        ] },

      { id: "harrah-wabrah", nama: "Harrah Wabrah (Harrah Barat)", arab: "حرة الوبرة", jenis: "kawasan", e: -3400, n: -1200, lod: 0, keyakinan: "pasti",
        ket: "Hamparan batu basal hitam di barat Madinah, di antara Wadi Bathan dan Wadi Al-'Aqiq. Masjid Qiblatain berdiri di tepi utaranya, dan perkampungan Bani Salimah ada di antara harrah ini dan Gunung Sal'.",
        riwayat: [
          { t: null, judul: "Kota haram seperti Mekah", tokoh: ["nabi", "jabir"], derajat: "shahih", sumber: "HR. Muslim no. 1362 (Jabir bin Abdullah)", url: sn("muslim", 1362),
            isi: "Nabi ﷺ bersabda bahwa Ibrahim menetapkan Mekah sebagai tanah haram, dan beliau menetapkan Madinah, wilayah di antara dua labahnya, sebagai tanah haram: pohonnya tidak boleh ditebang dan hewan buruannya tidak boleh diburu." },
          { t: [627, 627], judul: "Benteng alami kota", tokoh: ["nabi"], derajat: "sirah", sumber: "Ar-Rahiq Al-Makhtum; Wikipedia: Battle of the Trench", url: W("Battle_of_the_Trench"),
            isi: "Saat Khandaq, parit hanya digali di sisi utara. Sisi timur dan barat kota terlindung harrah yang sulit dilalui kuda dan unta, sedangkan sisi selatan rapat dengan kebun kurma, rumah, dan benteng." }
        ] },

      { id: "aqiq", nama: "Wadi Al-'Aqiq", arab: "وادي العقيق", jenis: "kawasan", e: -4800, n: -300, lod: 0, keyakinan: "pasti",
        ket: "Lembah besar di barat Madinah yang mengalir dari selatan ke utara, melewati sisi barat Gunung 'Ayr dan sisi timur Dzul Hulaifah, lalu bertemu Wadi Bathan dan Wadi Qanat di utara kota. Airnya mengalir hanya setelah hujan. Garis di peta perkiraan.",
        sumberLokasi: "Madain Project: al-Aqeeq Valley",
        riwayat: [
          { t: [632, 632], judul: "Lembah yang diberkahi", tokoh: ["umar", "nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 1534 (Umar bin Khattab)", url: sn("bukhari", 1534),
            isi: "Umar mendengar Nabi ﷺ bersabda di Wadi Al-'Aqiq, \"Tadi malam datang utusan dari Tuhanku dan berkata: shalatlah di lembah yang diberkahi ini, dan katakan: umrah dalam haji.\"",
            catatan: "Ucapan ini terkait perjalanan haji Wada' (10 H / 632 M)." },
          { t: [622, 624], judul: "Sumur Rumah di lembah ini", tokoh: ["utsman"], derajat: "shahih", sumber: "HR. Tirmidzi no. 3703", url: sn("tirmidhi", 3703), lihat: "bir-rumah",
            isi: "Sumur Rumah yang dibeli Utsman untuk kaum Muslimin berada di kawasan lembah ini. Lihat di Sumur Rumah." }
        ] },

      { id: "bathan", nama: "Wadi Bathan", arab: "وادي بطحان", jenis: "kawasan", e: -600, n: 0, lod: 0, keyakinan: "pasti",
        ket: "Lembah yang mengalir dari 'Awali di selatan, melintasi sisi barat kota lama di antara Masjid Nabawi dan Gunung Sal', lalu ke barat laut bertemu Wadi Al-'Aqiq. Garis di peta perkiraan.",
        riwayat: [
          { t: [622, 622], judul: "Demam di kota baru", tokoh: ["abubakar", "bilal", "aisyah", "nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 1889 (Aisyah)", url: sn("bukhari", 1889),
            isi: "Saat Muhajirin baru tiba, Abu Bakar dan Bilal jatuh demam. Nabi ﷺ berdoa agar Allah menjadikan Madinah dicintai seperti Mekah atau lebih, memberkahi takarannya, dan memindahkan demamnya ke Al-Juhfah. Aisyah berkata Madinah waktu itu negeri yang paling berpenyakit, dan Bathan mengalirkan air yang keruh." }
        ] },

      { id: "ayr", nama: "Gunung 'Ayr", arab: "جبل عير", jenis: "gunung", e: -5497, n: -7503, lod: 0, keyakinan: "pasti",
        ket: "Gunung memanjang dari timur ke barat sekitar 2 km di barat daya Madinah, puncaknya sekitar 955 m di atas permukaan laut. Menjadi batas selatan tanah haram Madinah.",
        sumberLokasi: "Wikipedia: Ayr Mountain (24.39944, 39.55694)",
        riwayat: [
          { t: null, judul: "Dari 'Ayr sampai Tsaur", tokoh: ["ali", "nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 6755; HR. Muslim no. 1370 (Ali bin Abi Thalib)", url: sn("bukhari", 6755),
            matan: "الْمَدِينَةُ حَرَمٌ مَا بَيْنَ عَيْرٍ إِلَى ثَوْرٍ",
            isi: "Ali bin Abi Thalib menyampaikan isi lembaran catatannya dari Nabi ﷺ: Madinah adalah tanah haram dari 'Ayr sampai Tsaur." }
        ] },

      { id: "dzulhulaifah", nama: "Dzul Hulaifah (Miqat)", arab: "ذو الحليفة", jenis: "masjid", e: -6966, n: -5925, lod: 1, keyakinan: "pasti",
        ket: "Miqat penduduk Madinah di barat daya kota, di sisi barat Wadi Al-'Aqiq. Masjidnya kemudian disebut Masjid Asy-Syajarah (masjid pohon); kawasannya kini dikenal sebagai Abyar Ali.",
        sumberLokasi: "Wikipedia: Miqat Dhu al-Hulayfah (24.41372, 39.54243)",
        riwayat: [
          { t: [628, 632], judul: "Berihram dari masjid ini", tokoh: ["nabi", "ibnuumar"], derajat: "shahih", sumber: "HR. Bukhari no. 1541 (Ibnu Umar)", url: sn("bukhari", 1541),
            isi: "Ibnu Umar berkata, Rasulullah ﷺ tidak pernah memulai ihram kecuali dari masjid ini, yaitu masjid Dzul Hulaifah." }
        ] },

      // ---------- Jalan ----------
      { id: "jalan-quba", nama: "Jalan ke Quba", arab: "طريق قباء", jenis: "jalan", e: 150, n: -1700, lod: 0, keyakinan: "perkiraan",
        ket: "Jalan dari Masjid Nabawi ke selatan menuju Quba, sekitar 3 km, melewati kebun-kebun kurma. Garis jalurnya perkiraan.",
        riwayat: [
          { t: [622, 632], judul: "Ke Quba setiap Sabtu", tokoh: ["nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 1193 (Ibnu Umar)", url: sn("bukhari", 1193), lihat: "masjid-quba",
            isi: "Setiap hari Sabtu Nabi ﷺ menempuh jalan ini ke Masjid Quba, kadang berjalan kaki dan kadang berkendara." }
        ] },

      { id: "jalan-uhud", nama: "Jalan ke Uhud", arab: "طريق أحد", jenis: "jalan", e: -230, n: 2100, lod: 0, keyakinan: "perkiraan",
        ket: "Jalan dari kota ke utara melewati Syaikhain dan Bani Haritsah menuju kaki Gunung Uhud, sekitar 5 km. Garis jalurnya perkiraan.",
        riwayat: [
          { t: [625, 625], judul: "Sebagian pasukan kembali", tokoh: ["nabi", "abdullahubay"], derajat: "shahih", sumber: "HR. Bukhari no. 4050 (Zaid bin Tsabit)", url: sn("bukhari", 4050),
            isi: "Ketika Nabi ﷺ berangkat ke Uhud, sebagian orang yang ikut bersama beliau kembali ke Madinah. Kaum Muslimin terbelah dua pendapat tentang mereka, lalu turun ayat ini.",
            ayat: { surah: "An-Nisa'", no: "88", arab: "فَمَا لَكُمْ فِي الْمُنَافِقِينَ فِئَتَيْنِ" },
            catatan: "Kitab sirah menyebut yang kembali adalah Abdullah bin Ubay bersama sekitar 300 orang, di Asy-Syauth antara Madinah dan Uhud." }
        ] },

      { id: "jalan-mekah", nama: "Jalan ke Mekah lewat Dzul Hulaifah", arab: "طريق مكة", jenis: "jalan", e: -1900, n: -3000, lod: 0, keyakinan: "perkiraan",
        ket: "Jalan dari Musalla ke barat daya, memutari ujung selatan Harrah Wabrah, menyeberangi Wadi Al-'Aqiq, lalu ke Dzul Hulaifah dan terus ke Mekah. Garis jalurnya perkiraan.",
        riwayat: [
          { t: [632, 632], judul: "Zhuhur di Madinah, Ashar di Dzul Hulaifah", tokoh: ["nabi", "anas"], derajat: "shahih", sumber: "HR. Bukhari no. 1089 (Anas bin Malik)", url: sn("bukhari", 1089), lihat: "dzulhulaifah",
            isi: "Anas shalat Zhuhur empat rakaat bersama Nabi ﷺ di Madinah, lalu shalat Ashar dua rakaat (diqashar) di Dzul Hulaifah.",
            catatan: "Hadits ini tidak menyebut perjalanannya; para ulama mengaitkannya dengan keberangkatan haji Wada'." }
        ] },

      { id: "jalan-syam", nama: "Jalan ke Syam", arab: "طريق الشام", jenis: "jalan", e: -1300, n: 2700, lod: 0, keyakinan: "perkiraan",
        ket: "Jalan ke barat laut melewati Tsaniyyatul Wada', menuju Al-Jurf lalu terus ke Wadi Al-Qura, Tabuk, dan Syam. Garis jalurnya perkiraan.",
        riwayat: [
          { t: [632, 632], judul: "Pasukan Usamah di Al-Jurf", tokoh: ["usamah", "abubakar", "nabi"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam; Ath-Thabari, Tarikh",
            isi: "Pasukan Usamah bin Zaid berkemah di Al-Jurf, di jalan ini, ketika Nabi ﷺ sakit menjelang wafat. Setelah Nabi wafat, Abu Bakar tetap memberangkatkan pasukan itu ke arah Syam." },
          { t: [630, 630], judul: "Pulang dari Tabuk", tokoh: ["nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 3083", url: sn("bukhari", 3083), lihat: "tsaniyyah-wada",
            isi: "Anak-anak Madinah keluar ke Tsaniyyatul Wada' di jalan ini untuk menyambut Nabi ﷺ. Lihat di Tsaniyyatul Wada'." }
        ] }
    ],

    sumber: [
      { judul: "Sunnah.com: teks dan nomor hadits", url: "https://sunnah.com/" },
      { judul: "HadithUnlocked: derajat Al-Adab Al-Mufrad no. 704 (Al-Albani: hasan)", url: "https://hadithunlocked.com/adab:704" },
      { judul: "Wikipedia: Prophet's Mosque", url: W("Prophet%27s_Mosque") },
      { judul: "Wikipedia: Quba Mosque", url: W("Quba_Mosque") },
      { judul: "Wikipedia: Masjid al-Qiblatayn", url: W("Masjid_al-Qiblatayn") },
      { judul: "Wikipedia: Al Jum'ah Mosque", url: W("Al_Jum%27ah_Mosque") },
      { judul: "Wikipedia: Al-Ijabah Mosque", url: W("Al-Ijabah_Mosque") },
      { judul: "Wikipedia: Mosque of Al-Ghamama", url: W("Mosque_of_Al-Ghamama") },
      { judul: "Wikipedia: Al-Baqi Cemetery", url: W("Al-Baqi_Cemetery") },
      { judul: "Wikipedia: Mount Uhud", url: W("Mount_Uhud") },
      { judul: "Wikipedia: Battle of Uhud", url: W("Battle_of_Uhud") },
      { judul: "Wikipedia: Battle of the Trench", url: W("Battle_of_the_Trench") },
      { judul: "Wikipedia: Sela (Saudi Arabia)", url: W("Sela_(Saudi_Arabia)") },
      { judul: "Wikipedia: The Seven Mosques", url: W("The_Seven_Mosques") },
      { judul: "Wikipedia: Mosque of Bani Haram", url: W("Mosque_of_Bani_Haram") },
      { judul: "Wikipedia: Al-Deraa Mosque", url: W("Al-Deraa_Mosque") },
      { judul: "Wikipedia: Bani Harithah Mosque", url: W("Bani_Harithah_Mosque") },
      { judul: "Wikipedia: Fas'h Mosque", url: W("Fas%27h_Mosque") },
      { judul: "Wikipedia: Bir Rumah", url: W("Bir_Rumah") },
      { judul: "Wikipedia: Gharas Well", url: W("Gharas_Well") },
      { judul: "Wikipedia: Ayr Mountain", url: W("Ayr_Mountain") },
      { judul: "Wikipedia: Miqat Dhu al-Hulayfah", url: W("Miqat_Dhu_al-Hulayfah") },
      { judul: "Wikipedia: Mosque of Al-Fadeekh", url: W("Mosque_of_Al-Fadeekh") },
      { judul: "Wikipedia: Siege of Banu Qaynuqa", url: W("Siege_of_Banu_Qaynuqa") },
      { judul: "Wikipedia: Banu Nadir", url: W("Banu_Nadir") },
      { judul: "Wikipedia: Banu Qurayza", url: W("Banu_Qurayza") },
      { judul: "Wikipedia: Saqifa", url: W("Saqifa") },
      { judul: "Madain Project: Historic Wells of Medina", url: "https://madainproject.com/historic_wells_of_medina" },
      { judul: "Madain Project: al-Aqeeq Valley", url: "https://madainproject.com/al_aqeeq_valley" },
      { judul: "Madain Project: Mosques in Medina", url: "https://madainproject.com/mosques_in_medina" },
      { judul: "Madain Project: Sayed as-Shuhada (Medina)", url: "https://madainproject.com/sayed_as_shuhada_(medina)" },
      { judul: "AroundUs: Jabal al-Rumah (koordinat)", url: "https://aroundus.com/p/176466250-jbl-lrm" },
      { judul: "Visit Madinah: Saqifat Bani Sa'idah", url: "https://visitmadinahsa.com/en/Details/1110" },
      { judul: "Visit Madinah: Mount Thawr", url: "https://visitmadinahsa.com/en/Details/1109" },
      { judul: "People of Madina: The Prophetic Homes Around the Masjid al-Nabawi", url: "https://peopleofmadina.com/the-prophetic-homes-around-the-masjid-al-nabawi/" },
      { judul: "SeekersGuidance: How Many Houses Did the Prophet Have in Madinah?", url: "https://seekersguidance.org/uncategorized/how-many-houses-did-the-prophet-have-in-madinah/" },
      { judul: "IslamicLandmarks: Site of Banu Quraizah", url: "https://www.islamiclandmarks.com/?p=947" }
    ],
    // Kitab rujukan tanpa tautan: Sirah Ibnu Hisyam; Ibnu Sa'd, Ath-Thabaqat al-Kubra; Al-Waqidi, Al-Maghazi;
    // Ar-Rahiq Al-Makhtum; Tafsir Ibnu Katsir; Ibnul Qayyim, Zadul Ma'ad; Ath-Thabari, Tarikh.

    tokohBaru: {
      kultsum: { nama: "Kultsum bin Al-Hidm", arab: "كلثوم بن الهدم", lahir: 560, wafat: 623, kira: true, gelar: "Tuan rumah Nabi di Quba",
        kel: ["anshar"], tinggal: [["madinah", 560, 623, "Quba, perkampungan Bani Amr bin Auf"]],
        ringkas: "Sesepuh Bani Amr bin Auf dari suku Aus di Quba. Nabi ﷺ menginap di rumahnya saat tiba dalam hijrah. Ia wafat tidak lama kemudian, sebelum Perang Badar." },
      huyay: { nama: "Huyay bin Akhthab", arab: "حيي بن أخطب", lahir: 570, wafat: 627, kira: true, gelar: "Pemimpin Bani Nadhir",
        kel: ["penentang"], tinggal: [["madinah", 570, 625, "Perkampungan Bani Nadhir"], ["khaibar", 625, 627]],
        ringkas: "Pemimpin Bani Nadhir dan ayah Shafiyyah, kelak istri Nabi ﷺ. Setelah Bani Nadhir diusir pada 625 M ia pindah ke Khaibar, menggalang pasukan Ahzab, dan membujuk Bani Quraizhah membatalkan perjanjian. Ia dihukum mati setelah pengepungan Bani Quraizhah (627 M).",
        wiki: W("Huyayy_ibn_Akhtab") },
      kaabasad: { nama: "Ka'ab bin Asad", arab: "كعب بن أسد", lahir: 580, wafat: 627, kira: true, gelar: "Pemimpin Bani Quraizhah",
        kel: ["penentang"], tinggal: [["madinah", 580, 627, "Perkampungan Bani Quraizhah"]],
        ringkas: "Pemimpin Bani Quraizhah yang mengikat kaumnya dalam perjanjian dengan kaum Muslimin sejak 622 M. Saat Perang Khandaq ia dibujuk Huyay bin Akhthab hingga membatalkan perjanjian itu, dan ia dihukum mati setelah pengepungan Bani Quraizhah (627 M).",
        wiki: W("Ka%27b_ibn_Asad") },
      abdullahjubair: { nama: "Abdullah bin Jubair", arab: "عبد الله بن جبير", lahir: 590, wafat: 625, kira: true, gelar: "Komandan pemanah di Uhud",
        kel: ["anshar", "panglima"], tinggal: [["madinah", 590, 625]],
        ringkas: "Sahabat Anshar dari suku Aus yang ikut Perang Badar. Di Uhud ia memimpin 50 pemanah di Jabal Rumat dan mengingatkan pasukannya agar tidak meninggalkan pos (HR. Bukhari no. 3039). Ia gugur syahid di Uhud." },
      abdullahsalam: { nama: "Abdullah bin Salam", arab: "عبد الله بن سلام", lahir: 570, wafat: 663, kira: true, gelar: "Ulama Yahudi yang masuk Islam",
        kel: ["ulama"], tinggal: [["madinah", 570, 663]],
        ringkas: "Ulama Yahudi dari Bani Qainuqa' yang masuk Islam segera setelah Nabi ﷺ tiba di Madinah (HR. Bukhari no. 3911). Ia wafat di Madinah pada 43 H (663 M).",
        wiki: W("Abd_Allah_ibn_Salam") }
    }
  };
})();
