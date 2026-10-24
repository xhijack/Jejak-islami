// Mekah sekitar masa Nabi ﷺ. Posisi dalam meter dari Ka'bah: e = timur (+), n = utara (+).
// keyakinan: "pasti" | "kitab" | "perkiraan". derajat riwayat: "shahih" | "sirah" | "lemah".
// DRAF: wajib diverifikasi ustadz sebelum dipakai.
(function () {
  const sn = (k, n) => `https://sunnah.com/${k}:${n}`;
  window.MEKAH = {
    keyakinan: {
      pasti: { nama: "Lokasi pasti", ket: "Situs masih ada dan posisinya tidak diperselisihkan." },
      kitab: { nama: "Menurut kitab sejarah", ket: "Disebut dalam kitab sejarah Mekah (Al-Azraqi, Al-Fakihi, Al-Fasi). Titiknya adalah perkiraan peneliti modern." },
      perkiraan: { nama: "Perkiraan", ket: "Berdasarkan tradisi lokal atau sumber sekunder, belum dapat dipastikan." }
    },
    catatanVisual: "Bentuk rumah adalah rekonstruksi umum, bukan hasil arkeologi: dinding batu dan bata lumpur, atap datar dari balok kayu dan pelepah, pintu kayu rendah, dan sebagian berhalaman dengan naungan pelepah kurma. Lembah ini tandus tanpa tanaman (QS. Ibrahim: 37), jadi hampir tidak ada pepohonan. Sebelum 630 M, batu-batu tegak di sekitar Ka'bah melambangkan 360 berhala. Mulai 638 M tampak dinding rendah yang dibangun Umar. Jalan bernama mengikuti arah dari sumber, tapi garisnya perkiraan; gang-gang lain adalah rekonstruksi.",
    derajat: {
      shahih: "Hadits shahih",
      sirah: "Kitab sirah/sejarah",
      lemah: "Riwayat lemah"
    },

    // Jalur jalan (meter dari Ka'bah). Geometri jalur adalah perkiraan; nama dan arahnya dari sumber.
    jalan: [
      { id: "jalan-mala", lebar: 10, pts: [[125, 345], [170, 470], [230, 620], [300, 800], [340, 1000]] },
      { id: "jalan-misfalah", lebar: 9, pts: [[40, -45], [35, -180], [10, -330], [-30, -520], [-60, -820]] },
      { id: "kuda", lebar: 8, pts: [[-38, -12], [-160, -70], [-300, -190], [-420, -300], [-560, -380]] },
      { id: "suqlail", lebar: 6, pts: [[117, 188], [175, 190], [235, 190], [300, 196], [360, 230], [420, 270]] },
      { id: "attarin", lebar: 4, pts: [[113, 112], [138, 112]] },
      { id: "jalan-hira", lebar: 5, pts: [[340, 1000], [700, 1500], [1300, 2150], [2050, 2850], [2850, 3400], [3250, 3650], [3300, 3700], [3420, 3700], [3380, 3760], [3500, 3790], [3460, 3840], [3560, 3870], [3587, 3912]] },
      { id: "jalan-tsur", lebar: 5, pts: [[-60, -820], [-250, -1250], [-150, -1700], [250, -2200], [600, -2650], [1100, -3050], [1500, -3500], [1800, -4000], [2000, -4350], [2150, -4500], [2300, -4620], [2250, -4720], [2420, -4800], [2380, -4880], [2538, -4952]] }
    ],

    tempat: [
      { id: "kabah", nama: "Ka'bah", arab: "الكعبة", jenis: "kabah", e: 0, n: 0, lod: 0, keyakinan: "pasti",
        ket: "Bangunan suci yang didirikan Ibrahim dan Ismail. Sekitar 605 M Quraisy membangunnya ulang dengan ukuran lebih kecil dari fondasi Ibrahim. Saat itu belum ada masjid berdinding; rumah-rumah penduduk mengelilingi halaman thawaf. Warna kiswahnya pada masa itu belum tentu hitam seperti sekarang.",
        riwayat: [
          { t: [576, 578], judul: "Majelis Abdul Muthalib", tokoh: ["abdulmuthalib", "nabi"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam (dari Ibnu Ishaq)",
            isi: "Abdul Muthalib biasa duduk di atas hamparan di bayangan Ka'bah, dikelilingi anak-anaknya. Muhammad kecil datang dan duduk di hamparan itu, dan sang kakek membiarkannya." },
          { t: [605, 605], judul: "Peletakan Hajar Aswad", tokoh: ["nabi"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam",
            isi: "Saat renovasi Ka'bah, kabilah-kabilah berselisih siapa yang meletakkan Hajar Aswad. Nabi meletakkannya di atas kain yang diangkat bersama oleh para kepala kabilah." },
          { t: [613, 616], judul: "Ancaman Abu Jahal", tokoh: ["abujahal", "nabi"], derajat: "shahih", tontonan: "ancaman-abujahal",
            sumber: "HR. Bukhari no. 4958 (Ibnu Abbas); HR. Muslim no. 2797 (Abu Hurairah)", url: sn("bukhari", 4958),
            isi: "Abu Jahal bersumpah akan menginjak leher Nabi bila melihat beliau shalat di dekat Ka'bah. Nabi bersabda, seandainya ia melakukannya, malaikat akan menyambarnya.",
            ayat: { surah: "Al-'Alaq", no: "6–19", arab: "أَرَأَيْتَ الَّذِي يَنْهَىٰ ﴿٩﴾ عَبْدًا إِذَا صَلَّىٰ ﴿١٠﴾" },
            catatan: "Tahun persisnya tidak disebut dalam riwayat." },
          { t: [613, 619], judul: "Isi perut unta di punggung Nabi", tokoh: ["nabi", "abujahal", "fatimah"], derajat: "shahih",
            sumber: "HR. Bukhari no. 240 (Abdullah bin Mas'ud)", url: sn("bukhari", 240),
            isi: "Saat Nabi sujud di dekat Ka'bah, Abu Jahal dan kawan-kawannya menyuruh orang meletakkan isi perut unta di punggung beliau. Fatimah yang masih kecil datang menyingkirkannya.",
            catatan: "Tahun persisnya tidak disebut dalam riwayat." },
          { t: [638, 661], judul: "Dinding pertama di sekeliling Ka'bah", tokoh: ["umar"], derajat: "sirah", sumber: "Yaqut al-Hamawi, Mu'jam al-Buldan 5/146 (dikutip IslamQA no. 3748)", url: "https://islamqa.info/en/answers/3748/",
            isi: "Pada masa Nabi dan Abu Bakar belum ada dinding di sekeliling Ka'bah. Karena rumah-rumah terlalu dekat dan ruang ibadah sempit, Umar membeli rumah-rumah itu, merobohkannya, lalu membangun dinding yang lebih rendah dari tinggi orang dewasa dengan lampu di atasnya.",
            catatan: "Tahun 17 H (638 M) mengikuti pendapat yang umum dikenal; sumber yang kami kutip tidak menyebut tahunnya." },
          { t: [630, 630], judul: "Adzan Bilal di atas Ka'bah", tokoh: ["bilal", "nabi"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam; Ibnu Sa'd, Ath-Thabaqat",
            isi: "Pada hari Fathu Makkah, Nabi ﷺ memerintahkan Bilal naik ke atas Ka'bah dan mengumandangkan adzan. Bekas budak yang dulu disiksa di Mekah itu kini menyerukan adzan dari tempat tertinggi di kota itu." },
          { t: [630, 630], judul: "Berhala dihancurkan", tokoh: ["nabi"], derajat: "shahih",
            sumber: "HR. Bukhari no. 4287 (Abdullah bin Mas'ud)", url: sn("bukhari", 4287),
            isi: "Saat Fathu Makkah ada 360 berhala di sekitar Ka'bah. Nabi menusuknya satu per satu dengan tongkat sambil membaca ayat ini.",
            ayat: { surah: "Al-Isra'", no: "81", arab: "جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ" } }
        ] },

      { id: "hijr", nama: "Hijr Ismail", arab: "الحِجر", jenis: "titik", e: -9, n: 9, lod: 2, keyakinan: "pasti",
        ket: "Dinding rendah setengah lingkaran di sisi barat laut Ka'bah. Area di dalamnya termasuk bagian Ka'bah.",
        riwayat: [
          { t: null, judul: "Bagian dari Ka'bah", tokoh: ["aisyah", "nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 1584 (Aisyah)", url: sn("bukhari", 1584),
            isi: "Aisyah bertanya apakah dinding melengkung itu termasuk Ka'bah. Nabi menjawab ya; Quraisy tidak memasukkannya ke dalam bangunan karena kekurangan biaya." },
          { t: [621, 621], judul: "Membuktikan Isra'", tokoh: ["nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 3886 (Jabir bin Abdullah)", url: sn("bukhari", 3886),
            isi: "Ketika Quraisy mendustakan kisah Isra', Nabi berdiri di Hijr. Allah menampakkan Baitul Maqdis di hadapan beliau sehingga beliau bisa menjelaskan tanda-tandanya." }
        ] },

      { id: "zamzam", nama: "Sumur Zamzam", arab: "زمزم", jenis: "titik", e: 18, n: -8, lod: 2, keyakinan: "pasti",
        ket: "Sumur sekitar 20 m di timur Ka'bah.",
        riwayat: [
          { t: null, judul: "Asal mula Zamzam", tokoh: [], derajat: "shahih", sumber: "HR. Bukhari no. 3364 (Ibnu Abbas)", url: sn("bukhari", 3364),
            isi: "Air memancar untuk Hajar dan Ismail kecil yang kehausan di lembah tak berpenghuni." },
          { t: null, judul: "Digali ulang Abdul Muthalib", tokoh: ["abdulmuthalib"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam",
            isi: "Sumur ini tertimbun sejak masa kabilah Jurhum. Abdul Muthalib menggalinya kembali setelah mendapat petunjuk dalam mimpi, sebelum Nabi lahir." }
        ] },

      { id: "maqam", nama: "Maqam Ibrahim", arab: "مقام إبراهيم", jenis: "titik", e: 12, n: 9, lod: 2, keyakinan: "pasti",
        ket: "Batu tempat Nabi Ibrahim berdiri saat membangun Ka'bah, di depan sisi pintu Ka'bah.",
        riwayat: [
          { t: null, judul: "Usul Umar", tokoh: ["umar", "nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 402 (Anas, dari Umar)", url: sn("bukhari", 402),
            isi: "Umar berkata kepada Nabi, \"Seandainya kita jadikan Maqam Ibrahim tempat shalat.\" Lalu turun ayat ini.",
            ayat: { surah: "Al-Baqarah", no: "125", arab: "وَاتَّخِذُوا مِن مَّقَامِ إِبْرَاهِيمَ مُصَلًّى" } }
        ] },

      { id: "shafa", nama: "Bukit Shafa", arab: "الصفا", jenis: "bukit", e: 100, n: -85, lod: 1, keyakinan: "pasti",
        ket: "Bukit kecil sekitar 130 m di tenggara Ka'bah, di kaki Jabal Abu Qubais. Titik awal sa'i.",
        riwayat: [
          { t: [613, 613], judul: "Seruan di atas Shafa", tokoh: ["nabi", "abulahab"], derajat: "shahih", sumber: "HR. Bukhari no. 4770 (Ibnu Abbas)", url: sn("bukhari", 4770),
            isi: "Nabi naik ke Shafa dan memanggil kabilah-kabilah Quraisy untuk memperingatkan mereka. Abu Lahab mencela beliau, lalu turun Surah Al-Masad.",
            ayat: { surah: "Asy-Syu'ara'", no: "214", arab: "وَأَنذِرْ عَشِيرَتَكَ الْأَقْرَبِينَ" } },
          { t: [630, 630], judul: "Doa di Shafa saat Fathu Makkah", tokoh: ["nabi"], derajat: "shahih", sumber: "HR. Muslim no. 1780 (Abu Hurairah)", url: sn("muslim", 1780),
            isi: "Setelah thawaf, Nabi naik ke Shafa hingga dapat memandang Ka'bah, lalu mengangkat tangan berzikir dan berdoa." }
        ] },

      { id: "marwah", nama: "Bukit Marwah", arab: "المروة", jenis: "bukit", e: 125, n: 340, lod: 1, keyakinan: "pasti",
        ket: "Bukit kecil sekitar 300 m di timur laut Ka'bah. Jarak Shafa–Marwah sekitar 450 m. Pada masa Nabi, jalur di antaranya adalah jalan terbuka di tengah permukiman.",
        riwayat: [
          { t: null, judul: "Lari kecil Hajar", tokoh: [], derajat: "shahih", sumber: "HR. Bukhari no. 3364 (Ibnu Abbas)", url: sn("bukhari", 3364),
            isi: "Hajar berlari bolak-balik tujuh kali antara Shafa dan Marwah mencari air untuk Ismail. Inilah asal ibadah sa'i." }
        ] },

      { id: "nadwah", nama: "Darun Nadwah", arab: "دار الندوة", jenis: "rumah", besar: true, e: -40, n: 48, lod: 1, keyakinan: "perkiraan",
        ket: "Balai musyawarah Quraisy yang didirikan Qusay bin Kilab di dekat Ka'bah, dengan pintu menghadap Masjidil Haram. Para pemuka Quraisy memutuskan urusan bersama di sini. Hakim bin Hizam kemudian membelinya, lalu di masa Mu'awiyah menjualnya seharga seratus ribu dirham dan menyedekahkan hasilnya. Titik di peta ini perkiraan.",
        sumberLokasi: "Ibnu Katsir, Al-Bidayah wan Nihayah; Ibnu Al-Atsir, Usd al-Ghabah (melalui Darul Iftaa AskImam)",
        riwayat: [
          { t: [622, 622], judul: "Rencana membunuh Nabi", tontonan: "makar-nadwah", tokoh: ["abujahal", "nabi"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam; tafsir Ibnu Katsir",
            isi: "Para pemuka Quraisy bermusyawarah di sini. Atas usul Abu Jahal, mereka sepakat mengirim pemuda dari tiap kabilah untuk membunuh Nabi bersama-sama. Malam itu Nabi berangkat hijrah.",
            ayat: { surah: "Al-Anfal", no: "30", arab: "وَإِذْ يَمْكُرُ بِكَ الَّذِينَ كَفَرُوا" } }
        ] },

      { id: "arqam", nama: "Darul Arqam", arab: "دار الأرقم", jenis: "rumah", e: 122, n: -58, lod: 1, keyakinan: "kitab",
        ket: "Rumah Al-Arqam bin Abil Arqam dari Bani Makhzum, di sisi utara Bukit Shafa. Kemudian dibeli Al-Khaizuran, ibu Harun Ar-Rasyid, sehingga dikenal sebagai Darul Khaizuran.",
        sumberLokasi: "Al-Azraqi, Akhbar Makkah (dikutip Dr. Abdulwahab Abu Sulaiman); IslamicLandmarks",
        riwayat: [
          { t: [613, 616], judul: "Pusat dakwah sembunyi-sembunyi", tokoh: ["nabi", "hamzah", "umar"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam",
            isi: "Nabi dan para sahabat berkumpul di rumah ini untuk shalat dan belajar tanpa diketahui Quraisy. Hamzah dan Umar disebut menyatakan keislaman pada masa ini." }
        ] },

      { id: "khadijah", nama: "Rumah Khadijah", arab: "دار خديجة", jenis: "rumah", besar: true, e: 150, n: 110, lod: 1, keyakinan: "kitab",
        ket: "Rumah Nabi di Mekah, di sisi timur laut Masjidil Haram, di gang Al-'Attarin (kemudian disebut Zuqaq al-Hajar) dekat Marwah. Mu'awiyah kemudian membelinya dan menjadikannya masjid. Kini menjadi area terbuka di sisi timur masjid, dekat Bab as-Salam.",
        sumberLokasi: "Al-Azraqi; Al-Fakihi; Al-Fasi, Syifa'ul Gharam (dikaji Al-Furqan, 2014)",
        riwayat: [
          { t: [595, 622], judul: "Rumah keluarga Nabi", tokoh: ["nabi", "khadijah", "fatimah"], derajat: "sirah", sumber: "Al-Azraqi, Akhbar Makkah; Al-Fakihi, Akhbar Makkah",
            isi: "Nabi tinggal di sini sejak menikah dengan Khadijah sampai hijrah. Anak-anak beliau dari Khadijah lahir di rumah ini, termasuk Fatimah." },
          { t: [610, 610], judul: "\"Selimuti aku\"", tokoh: ["nabi", "khadijah"], derajat: "shahih", tontonan: "wahyu-pertama", sumber: "HR. Bukhari no. 3 (Aisyah)", url: sn("bukhari", 3),
            isi: "Sepulang dari Gua Hira dalam keadaan gemetar, Nabi menemui Khadijah dan berkata, \"Selimuti aku.\" Khadijah menenangkan beliau dan membawanya kepada Waraqah bin Naufal." },
          { t: [619, 619], judul: "Khadijah wafat", tokoh: ["khadijah", "nabi"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam",
            isi: "Khadijah wafat pada Tahun Kesedihan, tidak lama setelah pemboikotan berakhir." }
        ] },

      { id: "abusufyan", nama: "Rumah Abu Sufyan", arab: "دار أبي سفيان", jenis: "rumah", besar: true, e: 174, n: 90, lod: 2, keyakinan: "kitab",
        ket: "Rumah pemimpin Bani Umayyah, bersebelahan dengan rumah Khadijah. Mu'awiyah kemudian membuat pintu yang menghubungkan kedua rumah itu.",
        sumberLokasi: "Al-Fakihi, Akhbar Makkah (dikaji Al-Furqan, 2014)",
        riwayat: [
          { t: [630, 630], judul: "\"Siapa masuk rumah Abu Sufyan, ia aman\"", tokoh: ["abusufyan", "nabi"], derajat: "shahih", sumber: "HR. Muslim no. 1780 (Abu Hurairah)", url: sn("muslim", 1780),
            isi: "Saat Fathu Makkah, Nabi menjamin keamanan bagi siapa yang masuk ke rumah Abu Sufyan, meletakkan senjata, atau menutup pintu rumahnya.",
            matan: "مَنْ دَخَلَ دَارَ أَبِي سُفْيَانَ فَهُوَ آمِنٌ" }
        ] },

      { id: "abulahab", nama: "Rumah Abu Lahab", arab: "دار أبي لهب", jenis: "rumah", e: 152, n: 142, lod: 2, keyakinan: "perkiraan",
        ket: "Abu Lahab bertetangga dengan rumah Khadijah. Sisi persisnya tidak tercatat, jadi titik ini hanya menandai bahwa rumahnya bersebelahan.",
        sumberLokasi: "Al-Azraqi, Akhbar Makkah (dikutip Dr. Abdulwahab Abu Sulaiman)",
        riwayat: [
          { t: [610, 622], judul: "Tetangga yang memusuhi", tokoh: ["abulahab", "nabi"], derajat: "sirah", sumber: "Al-Azraqi, Akhbar Makkah",
            isi: "Al-Azraqi mencatat batu pernah dilempar dari rumah Abu Lahab ke arah rumah Khadijah." },
          { t: [610, 622], judul: "Riwayat \"dua tetangga terburuk\"", tokoh: ["abulahab", "nabi"], derajat: "lemah", sumber: "Ibnu Sa'd, Ath-Thabaqat al-Kubra 1/157",
            isi: "Ada riwayat bahwa Abu Lahab dan Uqbah bin Abi Mu'aith membuang kotoran di depan pintu rumah Nabi.",
            catatan: "Sanadnya dinilai sangat lemah (HadithAnswers), jadi jangan dijadikan pegangan." }
        ] },

      { id: "abujahal", nama: "Rumah Abu Jahal", arab: "دار أبي جهل", jenis: "rumah", e: 150, n: 25, lod: 1, keyakinan: "perkiraan",
        ket: "Abu Jahal (Amr bin Hisyam) dari Bani Makhzum. Pemandu lokal Mekah menunjuk area di luar Mas'a sekarang sebagai perkiraan lokasi rumahnya. Kami belum menemukan sumber klasik yang memastikannya.",
        sumberLokasi: "IslamicLandmarks (mengutip pemandu lokal; Ar-Rahiq al-Makhtum)",
        riwayat: [
          { t: [613, 619], judul: "Memusuhi Nabi di dekat Ka'bah", tokoh: ["abujahal", "nabi"], derajat: "shahih", lihat: "kabah",
            sumber: "HR. Bukhari no. 4958 dan no. 240", url: sn("bukhari", 4958),
            isi: "Ancaman menginjak leher Nabi dan peristiwa isi perut unta terjadi di dekat Ka'bah. Lihat detailnya di Ka'bah." },
          { t: [624, 624], judul: "Tewas di Badar", tokoh: ["abujahal"], derajat: "shahih", sumber: "HR. Bukhari no. 3962 (Anas bin Malik)", url: sn("bukhari", 3962),
            isi: "Abu Jahal tewas dalam Perang Badar pada tahun 2 H. Ibnu Mas'ud menemukannya dalam keadaan sekarat." }
        ] },

      { id: "maulid", nama: "Tempat lahir Nabi ﷺ", arab: "المولد", jenis: "rumah", e: 235, n: 205, lod: 1, keyakinan: "kitab",
        ket: "Di Suq al-Lail, Syi'ib Bani Hasyim. Rumah ini milik Abdul Muthalib lalu diberikan kepada Abdullah, ayah Nabi. Kemudian dibeli Muhammad bin Yusuf (saudara Al-Hajjaj) sehingga disebut Dar Ibnu Yusuf, lalu dijadikan masjid oleh Al-Khaizuran. Kini berdiri Perpustakaan Makkah Al-Mukarramah di atasnya.",
        sumberLokasi: "Al-Azraqi; Al-Fakihi; Al-Fasi, Syifa'ul Gharam (dirangkum Encyclopedia of Muhammad)",
        riwayat: [
          { t: [570, 570], judul: "Kelahiran Nabi ﷺ", tokoh: ["nabi", "aminah", "abdulmuthalib"], derajat: "sirah", sumber: "Al-Azraqi; Al-Fakihi; Al-Fasi",
            isi: "Mayoritas sejarawan Mekah menyebut Nabi lahir di rumah ini, di gang yang dahulu disebut Zuqaq al-Maulid.",
            catatan: "Sebagian ulama berpendapat titik pastinya tidak bisa ditentukan lagi karena tidak dijaga sejak awal Islam." }
        ] },

      { id: "abdulmuthalib", nama: "Kediaman Abdul Muthalib", arab: "دار عبد المطلب", jenis: "rumah", besar: true, e: 300, n: 170, lod: 1, keyakinan: "perkiraan",
        ket: "Abdul Muthalib, kakek Nabi, adalah pemuka Bani Hasyim. Letak rumahnya tidak tercatat pasti; di peta ini diletakkan di kawasan Syi'ib Bani Hasyim sebagai perkiraan.",
        sumberLokasi: "Perkiraan, mengikuti letak Syi'ib Bani Hasyim",
        riwayat: [
          { t: [576, 578], judul: "Mengasuh cucunya", tokoh: ["abdulmuthalib", "nabi"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam",
            isi: "Setelah Aminah wafat, Nabi yang berusia 6 tahun diasuh kakeknya sampai sang kakek wafat dua tahun kemudian." },
          { t: [576, 578], judul: "Majelis di bayangan Ka'bah", tokoh: ["abdulmuthalib", "nabi"], derajat: "sirah", lihat: "kabah", sumber: "Sirah Ibnu Hisyam",
            isi: "Abdul Muthalib menerima orang di hamparan di bayangan Ka'bah. Lihat di Ka'bah." }
        ] },

      { id: "syiib", nama: "Syi'ib Bani Hasyim", arab: "شعب أبي طالب", jenis: "kawasan", e: 330, n: 230, lod: 0, keyakinan: "kitab",
        ket: "Lembah permukiman Bani Hasyim, juga disebut Syi'ib Abi Thalib. Terletak di antara Jabal Abu Qubais di selatan dan Jabal Khandamah di utara dan timur, menghadap Masjidil Haram. Kini hanya tersisa sebagian kecil di kawasan Suq al-Lail.",
        sumberLokasi: "Okaz, 2026 (Dr. Hamad Al-Balawi)",
        riwayat: [
          { t: [617, 619], judul: "Pemboikotan Bani Hasyim", tokoh: ["nabi", "abuthalib", "khadijah"], derajat: "sirah", sumber: "Ibnu Sa'd, Ath-Thabaqat; Ibnu Qayyim, Zadul Ma'ad",
            isi: "Bani Hasyim dan Bani Muthalib dikurung di lembah ini selama sekitar tiga tahun. Ibnu Qayyim menyebut mulainya pada malam awal Muharram tahun ke-7 kenabian. Abu Lahab tidak ikut, ia berpihak kepada Quraisy." }
        ] },

      { id: "jalan-mala", nama: "Jalan ke Ma'la dan Kada'", arab: "طريق المعلاة", jenis: "jalan", e: 250, n: 680, lod: 0, keyakinan: "perkiraan",
        ket: "Jalan di Mekah bagian atas, mengikuti Wadi Ibrahim ke arah timur laut menuju Ma'la, lalu ke Mina dan Arafah. Kada' (tsaniyyah atas) umumnya diidentifikasi di kawasan Al-Hajun dekat pemakaman Ma'la, di luar batas peta ini.",
        sumberLokasi: "Arah dari hadits dan sejarah Mekah; garis jalurnya perkiraan",
        riwayat: [
          { t: [630, 630], judul: "Masuk Mekah dari Kada'", tokoh: ["nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 1578 (Aisyah)", url: sn("bukhari", 1578),
            isi: "Pada tahun Fathu Makkah, Nabi masuk dari Kada' di bagian atas Mekah dan keluar dari Kuda.",
            matan: "دَخَلَ عَامَ الْفَتْحِ مِنْ كَدَاءٍ وَخَرَجَ مِنْ كُدًا" },
          { t: null, judul: "Masuk dari jalan atas, keluar dari jalan bawah", tokoh: ["nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 1575 (Ibnu Umar)", url: sn("bukhari", 1575),
            isi: "Ibnu Umar meriwayatkan Nabi masuk Mekah melalui tsaniyyah atas dan keluar melalui tsaniyyah bawah." },
          { t: [619, 619], judul: "Pemakaman Ma'la", tokoh: ["khadijah", "abuthalib"], derajat: "sirah", sumber: "Ibnu Sa'd, Ath-Thabaqat",
            isi: "Khadijah dan Abu Thalib dimakamkan di pemakaman Ma'la (Al-Hajun), di ujung jalan ini." }
        ] },
      { id: "kuda", nama: "Jalan ke Kuda", arab: "كُدى", jenis: "jalan", e: -330, n: -215, lod: 0, keyakinan: "perkiraan",
        ket: "Jalan keluar di Mekah bagian bawah. Kuda (tsaniyyah bawah) adalah jalur Nabi keluar dari Mekah. Arah garis di peta ini perkiraan.",
        sumberLokasi: "HR. Bukhari 1575 dan 1578; garis jalurnya perkiraan",
        riwayat: [
          { t: [630, 630], judul: "Keluar lewat Kuda", tokoh: ["nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 1578 (Aisyah); no. 1575 (Ibnu Umar)", url: sn("bukhari", 1578),
            isi: "Setelah masuk dari Kada' di bagian atas, Nabi keluar dari Mekah melalui Kuda, jalan di bagian bawah kota." }
        ] },
      { id: "jalan-misfalah", nama: "Jalan Misfalah ke Yaman", arab: "المسفلة", jenis: "jalan", e: 5, n: -360, lod: 0, keyakinan: "perkiraan",
        ket: "Jalan ke selatan melewati Misfalah, Mekah bagian bawah, menuju Yaman. Garis jalurnya perkiraan.",
        riwayat: [
          { t: null, judul: "Kafilah musim dingin", tokoh: [], derajat: "sirah", sumber: "Tafsir Ibnu Katsir, Surah Quraisy",
            isi: "Quraisy punya dua perjalanan dagang tahunan: ke Yaman pada musim dingin dan ke Syam pada musim panas. Kafilah ke Yaman berangkat ke arah ini.",
            ayat: { surah: "Quraisy", no: "1–2", arab: "لِإِيلَافِ قُرَيْشٍ ﴿١﴾ إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ ﴿٢﴾" } }
        ] },
      { id: "suqlail", nama: "Suq al-Lail", arab: "سوق الليل", jenis: "jalan", e: 205, n: 188, lod: 1, keyakinan: "kitab",
        ket: "Jalan di lembah Bani Hasyim, tempat rumah kelahiran Nabi berada. Kawasan Suq al-Lail sebagian masih ada di timur laut Masjidil Haram.",
        sumberLokasi: "Al-Azraqi; Al-Fakihi (dirangkum Encyclopedia of Muhammad); Okaz 2026",
        riwayat: [
          { t: [570, 570], judul: "Jalan menuju rumah kelahiran Nabi", tokoh: ["nabi"], derajat: "sirah", lihat: "maulid", sumber: "Al-Azraqi; Al-Fakihi",
            isi: "Rumah kelahiran Nabi berada di gang yang dahulu disebut Zuqaq al-Maulid, di kawasan Suq al-Lail." }
        ] },
      { id: "attarin", nama: "Gang Al-'Attarin", arab: "زقاق العطارين", jenis: "jalan", e: 125, n: 116, lod: 2, keyakinan: "kitab",
        ket: "Gang para penjual minyak wangi yang menuju rumah Khadijah, kemudian disebut Zuqaq al-Hajar.",
        sumberLokasi: "Al-Azraqi, Akhbar Makkah (dikaji Al-Furqan, 2014)",
        riwayat: [
          { t: [595, 622], judul: "Gang menuju rumah Khadijah", tokoh: ["khadijah"], derajat: "sirah", lihat: "khadijah", sumber: "Al-Azraqi, Akhbar Makkah",
            isi: "Al-Azraqi menulis: inilah gang yang menuju rumah Khadijah binti Khuwailid." }
        ] },

      { id: "jalan-hira", nama: "Jalan ke Jabal Nur", arab: "طريق جبل النور", jenis: "jalan", e: 1300, n: 2150, lod: 0, keyakinan: "perkiraan",
        ket: "Rute dari Mekah ke Jabal Nur melewati Ma'la, lalu mendaki ke Gua Hira. Garis jalurnya perkiraan.",
        riwayat: [
          { t: [610, 610], judul: "Membawa bekal ke Gua Hira", tokoh: ["nabi", "khadijah"], derajat: "shahih", sumber: "HR. Bukhari no. 3 (Aisyah)", url: sn("bukhari", 3), tontonan: "wahyu-pertama",
            isi: "Rasulullah ﷺ membawa bekal dari rumah Khadijah untuk beberapa malam di Gua Hira, lalu kembali lagi mengambil bekal." }
        ] },
      { id: "hira", nama: "Gua Hira", arab: "غار حراء", jenis: "titik", e: 3590, n: 3915, lod: 0, keyakinan: "pasti",
        ket: "Gua kecil di dekat puncak Jabal Nur, tempat Rasulullah ﷺ menyendiri dan menerima wahyu pertama.",
        sumberLokasi: "Wikipedia: Jabal al-Nour; Muhammad's first revelation",
        riwayat: [
          { t: [610, 610], judul: "Wahyu pertama", tokoh: ["nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 3 (Aisyah)", url: sn("bukhari", 3), tontonan: "wahyu-pertama",
            isi: "Di gua ini malaikat datang dan berkata, \"Bacalah!\" Setelah tiga kali dekapan, turun ayat pertama.",
            ayat: { surah: "Al-'Alaq", no: "1–3", arab: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ" } }
        ] },
      { id: "jabalnur", nama: "Jabal Nur", arab: "جبل النور", jenis: "gunung", e: 3616, n: 3943, lod: 0, keyakinan: "pasti",
        ket: "Gunung sekitar 4 km di timur laut Masjidil Haram. Gua Hira berada di dekat puncaknya.", riwayat: [] },
      { id: "waraqah", nama: "Rumah Waraqah bin Naufal", arab: "دار ورقة", jenis: "rumah", e: 45, n: 245, lod: 2, keyakinan: "perkiraan",
        ket: "Sumber yang kami temukan tidak mencatat letak rumah Waraqah. Rumah ini hanya ilustrasi untuk tontonan wahyu pertama.",
        riwayat: [
          { t: [610, 610], judul: "\"Inilah an-Namus\"", tokoh: ["waraqah", "khadijah", "nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 3 (Aisyah)", url: sn("bukhari", 3), tontonan: "wahyu-pertama",
            isi: "Khadijah membawa Rasulullah ﷺ kepada Waraqah. Waraqah berkata bahwa yang datang adalah an-Namus yang dahulu Allah turunkan kepada Musa." }
        ] },

      { id: "abuqubais", nama: "Jabal Abu Qubais", arab: "أبو قبيس", jenis: "gunung", e: 360, n: -200, lod: 0, keyakinan: "pasti",
        ket: "Gunung di timur dan tenggara Masjidil Haram. Bukit Shafa berada di kakinya.",
        riwayat: [
          { t: [619, 619], judul: "Tawaran malaikat penjaga gunung", tokoh: ["nabi"], derajat: "shahih", sumber: "HR. Bukhari no. 3231 (Aisyah)", url: sn("bukhari", 3231),
            isi: "Sepulang dari Thaif, malaikat penjaga gunung menawarkan untuk menimpakan Al-Akhsyabain kepada penduduk Mekah. Nabi menolak dan berharap dari keturunan mereka lahir orang yang menyembah Allah.",
            catatan: "Al-Akhsyabain ditafsirkan sebagai Abu Qubais dan gunung di seberangnya." }
        ] },
      { id: "quaiqian", nama: "Jabal Qu'aiqi'an", arab: "قعيقعان", jenis: "gunung", e: -390, n: 150, lod: 0, keyakinan: "pasti",
        ket: "Gunung di sisi barat lembah Mekah, berhadapan dengan Abu Qubais.", riwayat: [] },
      { id: "khandamah", nama: "Jabal Khandamah", arab: "الخندمة", jenis: "gunung", e: 700, n: 420, lod: 0, keyakinan: "pasti",
        ket: "Gunung di timur laut kota, batas utara dan timur Syi'ib Bani Hasyim.", riwayat: [] },

      // ---------- Hijrah ----------
      { id: "rumah-abubakar", nama: "Rumah Abu Bakar", arab: "دار أبي بكر الصديق", jenis: "rumah", e: -228, n: -199, lod: 1, keyakinan: "perkiraan",
        ket: "Rumah Abu Bakar Ash-Shiddiq, tempat Nabi ﷺ datang di tengah hari untuk mengabarkan izin hijrah, dan tempat keduanya berangkat di malam hari. Sumber primer yang kami temukan tidak menyebut letaknya; tradisi setempat menempatkannya di sisi barat daya Masjidil Haram, di kawasan Misfalah. Titik ini perkiraan.",
        sumberLokasi: "Tradisi setempat (kawasan Misfalah, kini kompleks Makkah Towers); tidak disebut dalam hadits",
        riwayat: [
          { t: [613, 616], judul: "Bilal dimerdekakan Abu Bakar", tokoh: ["abubakar", "bilal", "umayyah"], derajat: "shahih", sumber: "HR. Bukhari no. 3754 (Jabir bin Abdullah, dari Umar); HR. Ibnu Majah no. 150 (Ibnu Mas'ud, hasan)", url: sn("bukhari", 3754),
            isi: "Bilal termasuk tujuh orang pertama yang menampakkan keislamannya. Ia disiksa dan diarak anak-anak di lorong-lorong Mekah, tetapi terus mengucapkan \"Ahad, Ahad\" (HR. Ibnu Majah 150). Abu Bakar lalu memerdekakannya; Umar kelak berkata, \"Abu Bakar adalah pemimpin kami, dan ia telah memerdekakan pemimpin kami,\" yakni Bilal (HR. Bukhari 3754).",
            catatan: "Hadits tidak menyebut di mana Bilal dimerdekakan. Riwayat ini ditautkan ke rumah Abu Bakar karena dialah yang memerdekakannya; letak rumah Bilal dan tuannya, Umayyah bin Khalaf, tidak tercatat." },
          { t: [613, 622], judul: "Masjid di halaman rumah", tokoh: ["abubakar"], derajat: "shahih", sumber: "HR. Bukhari no. 476 (Aisyah)", url: sn("bukhari", 476),
            isi: "Abu Bakar membangun tempat shalat di halaman rumahnya. Perempuan dan anak-anak musyrik berkerumun mendengar bacaannya karena ia mudah menangis saat membaca Al-Qur'an." },
          { t: [622, 622], judul: "Kunjungan di tengah hari", tokoh: ["nabi", "abubakar", "aisyah"], derajat: "shahih", sumber: "HR. Bukhari no. 3905 (Aisyah)", url: sn("bukhari", 3905), tontonan: "siang-abubakar",
            isi: "Nabi ﷺ datang di tengah hari, waktu yang tidak biasa, lalu bersabda, \"Aku telah diizinkan untuk keluar.\" Abu Bakar meminta ikut menemani, dan beliau menjawab, \"Ya.\"" },
          { t: [622, 622], judul: "Dzatun Nithaqain", tokoh: ["asma", "abubakar"], derajat: "shahih", sumber: "HR. Bukhari no. 2979 (Asma' binti Abu Bakar)", url: sn("bukhari", 2979), tontonan: "siang-abubakar",
            isi: "Tidak ada tali untuk mengikat bekal. Asma' membelah ikat pinggangnya menjadi dua, satu untuk wadah air dan satu untuk kantong makanan, sehingga ia dijuluki pemilik dua ikat pinggang." },
          { t: [622, 622], judul: "Berangkat lewat pintu belakang", tokoh: ["nabi", "abubakar"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam; Ar-Rahiq Al-Makhtum", tontonan: "keluar-menuju-tsur",
            isi: "Di malam hari Nabi ﷺ datang ke rumah ini. Menurut kitab sirah, keduanya keluar lewat pintu kecil di belakang rumah, lalu berjalan ke selatan menuju Jabal Tsur." },
          { t: [622, 622], judul: "Abu Jahal mencari Abu Bakar", tokoh: ["abujahal", "asma"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam (Ibnu Ishaq, dari Asma')", tontonan: "tiga-malam",
            isi: "Abu Jahal datang bersama beberapa orang Quraisy dan bertanya kepada Asma' di mana ayahnya. Ketika Asma' menjawab tidak tahu, Abu Jahal menamparnya. Asma' juga menenangkan kakeknya yang buta, Abu Quhafah, dengan batu-batu yang ditutup kain di tempat penyimpanan uang." }
        ] },
      { id: "jalan-tsur", nama: "Jalan ke Jabal Tsur", arab: "طريق جبل ثور", jenis: "jalan", e: 900, n: -2850, lod: 0, keyakinan: "perkiraan",
        ket: "Jalan dari Misfalah ke selatan menuju Jabal Tsur, berlawanan arah dengan jalan ke Madinah. Kitab sirah menyebut jaraknya sekitar lima mil. Garis jalurnya perkiraan.",
        riwayat: [
          { t: [622, 622], judul: "Malam keberangkatan", tokoh: ["nabi", "abubakar"], derajat: "sirah", sumber: "Sirah Ibnu Hisyam; Ar-Rahiq Al-Makhtum", tontonan: "keluar-menuju-tsur",
            isi: "Nabi ﷺ dan Abu Bakar berjalan di malam hari ke selatan, ke Jabal Tsur, agar tidak disangka para pengejar yang mengawasi jalan ke utara." }
        ] },
      { id: "jabal-tsur", nama: "Jabal Tsur", arab: "جبل ثور", jenis: "gunung", e: 2552, n: -4976, lod: 0, keyakinan: "pasti",
        ket: "Gunung setinggi sekitar 750 m di atas permukaan laut, sekitar 5,5 km (garis lurus) di selatan-tenggara Ka'bah. Gua persembunyian Nabi ﷺ dan Abu Bakar saat hijrah berada di gunung ini (HR. Bukhari no. 3905).",
        sumberLokasi: "Wikipedia: Jabal Thawr", riwayat: [] },
      { id: "gua-tsur", nama: "Gua Tsur", arab: "غار ثور", jenis: "titik", e: 2538, n: -4952, lod: 0, keyakinan: "kitab",
        ket: "Gua kecil di dekat puncak Jabal Tsur, tempat Nabi ﷺ dan Abu Bakar bersembunyi tiga malam. Gua yang dikunjungi orang sekarang adalah identifikasi turun-temurun.",
        sumberLokasi: "HR. Bukhari no. 3905; QS. At-Taubah: 40; identifikasi tradisional",
        riwayat: [
          { t: [622, 622], judul: "Tiga malam di gua", tokoh: ["nabi", "abubakar"], derajat: "shahih", sumber: "HR. Bukhari no. 3905 (Aisyah)", url: sn("bukhari", 3905), tontonan: "tiga-malam",
            isi: "Keduanya bersembunyi tiga malam. Abdullah bin Abi Bakar bermalam di sana dan kembali ke Mekah sebelum fajar membawa kabar, sedangkan Amir bin Fuhairah menggembalakan kambing di dekat gua dan membawakan susu." },
          { t: [622, 622], judul: "\"Jangan bersedih, Allah bersama kita\"", tokoh: ["nabi", "abubakar"], derajat: "shahih", sumber: "HR. Bukhari no. 3653 (Anas, dari Abu Bakar)", url: sn("bukhari", 3653), tontonan: "laa-tahzan",
            isi: "Para pengejar sampai di mulut gua. Abu Bakar berkata, seandainya salah seorang menunduk melihat ke bawah kakinya, tentu ia melihat mereka. Nabi ﷺ bersabda, \"Apa pendapatmu tentang dua orang yang Allah adalah yang ketiganya?\"",
            ayat: { surah: "At-Taubah", no: "40", arab: "إِذْ يَقُولُ لِصَاحِبِهِ لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا" },
            catatan: "Surah At-Taubah turun sekitar 9 H; ayat 40 mengenang peristiwa ini." },
          { t: [622, 622], judul: "Sarang laba-laba dan merpati", tokoh: ["nabi", "abubakar"], derajat: "lemah", sumber: "HR. Ahmad no. 3251 (Ibnu Abbas); Al-Bazzar dan Ath-Thabarani", url: "https://islamqa.info/en/answers/27224", tontonan: "laa-tahzan",
            isi: "Kisah sarang laba-laba di mulut gua, serta pohon dan sepasang merpati, sangat terkenal.",
            catatan: "Riwayat laba-laba diperselisihkan (hasan menurut Ibnu Hajar dan Ibnu Katsir, lemah menurut Al-Albani); riwayat pohon dan merpati lebih lemah karena perawinya tidak dikenal." },
          { t: [622, 622], judul: "Berangkat bersama pemandu", tokoh: ["nabi", "abubakar"], derajat: "shahih", sumber: "HR. Bukhari no. 2263 dan 3905 (Aisyah)", url: sn("bukhari", 2263), tontonan: "berangkat-pantai",
            isi: "Setelah tiga malam, pemandu sewaan dari Bani Ad-Dil datang membawa unta. Ia masih memeluk agama Quraisy, tetapi keduanya memercayainya. Rombongan berangkat lewat jalan pantai." }
        ] },
      { id: "aqabah-mina", nama: "Aqabah, Mina", arab: "العقبة", jenis: "titik", e: 4280, n: 246, lod: 1, keyakinan: "kitab",
        ket: "Celah bukit di ujung Mina arah Mekah, tempat dua Bai'at Aqabah (621 dan 622 M). Masjid Al-Bai'ah kemudian didirikan di tempat ini.",
        sumberLokasi: "Masjid Al-Bai'ah (didirikan sekitar 761 M); Wikipedia: Second pledge at al-Aqabah",
        riwayat: [
          { t: [621, 621], judul: "Bai'at Aqabah pertama", tokoh: ["nabi", "asad", "ubadah"], derajat: "shahih", sumber: "HR. Bukhari no. 3892 (Ubadah bin Ash-Shamit)", url: sn("bukhari", 3892),
            isi: "Dua belas orang dari Yatsrib berbaiat kepada Nabi ﷺ untuk tidak menyekutukan Allah, tidak mencuri, tidak berzina, dan tidak membunuh anak-anak mereka.",
            catatan: "Lafaz hadits tidak menyebut baiat yang mana; Ibnu Ishaq meriwayatkan dari Ubadah bahwa Aqabah pertama berisi janji serupa." },
          { t: [622, 622], judul: "Bai'at Aqabah kedua", tokoh: ["nabi", "abbas", "kaab", "jabir", "nusaibah"], derajat: "shahih", sumber: "HR. Bukhari no. 3889 (Ka'ab bin Malik); Sirah Ibnu Hisyam", url: sn("bukhari", 3889),
            isi: "Sekitar tujuh puluh lebih laki-laki dan dua perempuan dari Yatsrib berjanji melindungi Nabi ﷺ seperti melindungi keluarga sendiri. Ka'ab bin Malik berkata ia tidak ingin malam Aqabah ditukar dengan Perang Badar.",
            catatan: "Ibnu Ishaq mencatat 73 laki-laki dan 2 perempuan." }
        ] }
    ],

    // Rumah Abu Bakar kini dipetakan (tempat "rumah-abubakar", titik perkiraan menurut tradisi setempat).
    belumDipetakan: [],

    sumber: [
      { judul: "Al-Furqan: The Location of the House of Khadijah", url: "https://al-furqan.com/the-location-of-the-house-of-khadijah-%D8%B1%D8%B6%D9%8A-%D8%A7%D9%84%D9%84%D9%87-%D8%B9%D9%86%D9%87%D8%A7-and-the-houses-that-surrounded-it" },
      { judul: "Okaz: kajian Al-Azraqi oleh Dr. Abdulwahab Abu Sulaiman (2009)", url: "https://www.okaz.com.sa/article/239541" },
      { judul: "Okaz: Syi'ib Abi Thalib (2026)", url: "https://www.okaz.com.sa/local/na/2236902" },
      { judul: "Encyclopedia of Muhammad: Birthplace of Prophet Muhammad", url: "https://muhammadencyclopedia.com/article/birthplace-of-prophet-muhammad" },
      { judul: "Darul Iftaa AskImam: peran Darun Nadwah di masa Nabi", url: "https://islamqa.org/hanafi/askimam/6019/what-was-the-role-of-dar-an-nadwah/" },
      { judul: "IslamicLandmarks: rumah Abu Jahal", url: "https://www.islamiclandmarks.com/?p=650" },
      { judul: "IslamicLandmarks: Darul Arqam", url: "https://www.islamiclandmarks.com/?p=693" },
      { judul: "Wikipedia: Safa and Marwa", url: "https://en.wikipedia.org/wiki/Safa_and_Marwa" },
      { judul: "Wikipedia: Zamzam Well", url: "https://en.wikipedia.org/wiki/Zamzam_Well" },
      { judul: "HadithAnswers: riwayat tetangga Nabi", url: "https://islamqa.org/hanafi/hadithanswers/155428/nabis-sallallahu-alayhi-wa-sallam-neighbours-causing-him-harm/" },
      { judul: "IslamQA 3748: sejarah Masjidil Haram", url: "https://islamqa.info/en/answers/3748/" },
      { judul: "Sunnah.com: teks dan nomor hadits Bukhari & Muslim", url: "https://sunnah.com/" }
    ]
  };

  // Tokoh tambahan untuk peta kota
  if (window.SIRAH && !window.SIRAH.tokoh.waraqah) {
    window.SIRAH.tokoh.waraqah = { nama: "Waraqah bin Naufal", arab: "ورقة بن نوفل", lahir: 540, wafat: 610, kira: true, gelar: "Sepupu Khadijah",
      ringkas: "Sepupu Khadijah dari Bani Asad. Di masa jahiliyah ia memeluk Nasrani, menulis kitab dengan aksara Ibrani, dan menyalin Injil. Ia membenarkan wahyu pertama, lalu wafat tidak lama kemudian (HR. Bukhari no. 3)." };
  }
  if (window.SIRAH && !window.SIRAH.tokoh.abusufyan) {
    window.SIRAH.tokoh.abusufyan = { nama: "Abu Sufyan bin Harb", arab: "أبو سفيان", lahir: 565, wafat: 652, kira: true, gelar: "Pemimpin Bani Umayyah",
      ringkas: "Pemimpin Quraisy yang lama memusuhi dakwah dan memimpin pasukan di Uhud dan Khandaq. Masuk Islam menjelang Fathu Makkah. Ayah Mu'awiyah dan Ummu Habibah, istri Nabi." };
  }
})();
