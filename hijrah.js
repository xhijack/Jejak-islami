// Hijrah per kejadian: perjalanan Nabi ﷺ dari Mekah ke Madinah (621–622 M), disusun per episode.
// Kontrak C: window.HIJRAH = { ringkas, rute, tempatMekahBaru, episode, sumber, tokohBaru }.
// Medan tambahan (opsional, aman diabaikan): fase (daftar babak), episode.fase, episode.peristiwa (id di SIRAH.peristiwa),
// episode.tontonan (id di TONTONAN), tempatMekahBaru[].e/n (meter dari Ka'bah, dihitung dari lat/lon).
// Tanggal Masehi mengikuti Ar-Rahiq Al-Makhtum (kalender Gregorian) dan hanya perkiraan.
// derajat riwayat: "shahih" | "sirah" | "lemah". DRAF: wajib diverifikasi ustadz sebelum dipakai.
(function () {
  const sn = (k, n) => `https://sunnah.com/${k}:${n}`;
  const hu = (k, n) => `https://hadithunlocked.com/${k}:${n}`;
  const W = (p) => "https://en.wikipedia.org/wiki/" + p;

  // Ka'bah sebagai titik nol peta Mekah (e = timur, n = utara, meter).
  const KABAH = { lat: 21.4225, lon: 39.8262 };
  const enM = (lat, lon) => ({
    e: Math.round((lon - KABAH.lon) * 111320 * Math.cos((KABAH.lat * Math.PI) / 180)),
    n: Math.round((lat - KABAH.lat) * 110570)
  });

  const U = {
    ahmad3251: hu("ahmad", 3251),
    rahiq: "https://usul.ai/t/the-sealed-nectar-with-additions/103",
    rahiqQuba: "https://usul.ai/t/the-sealed-nectar-with-additions/110",
    rahiqQubaHari: "https://usul.ai/t/the-sealed-nectar-with-additions/112",
    rahiqRute: "https://usul.ai/t/the-sealed-nectar-with-additions/107",
    rahiqMuakhah: "https://usul.ai/t/the-sealed-nectar-with-additions/118",
    qa27224: "https://islamqa.info/en/answers/27224",
    qa119722: "https://islamqa.info/en/answers/119722/the-nasheed-talaa-al-badru-alayna",
    qa208771: "https://islamqa.info/ar/answers/208771",
    majma9904: "https://en.tohed.com/hadith/majma-al-zawaid/9904/",
    baihaqi13036: "https://en.tohed.com/hadith/sunan-kubra-bayhaqi/13036/",
    mathalib2040: "https://en.tohed.com/hadith/matalib-al-aliyah/2040/",
    mustadrakShuhaib: "https://en.tohed.com/hadith/mustadrak-hakim/chapter/2756/sub/76667/",
    bidayahUmmuMabad: "https://shamela.ws/book/23708/883",
    buraidah: "https://hadithtransmitters.hawramani.com/%d8%a8%d8%b1%d9%8a%d8%af%d8%a9-%d8%a8%d9%86-%d8%ad%d8%b5%d9%8a%d8%a8-%d8%a7%d9%84%d8%a3%d8%b3%d9%84%d9%85%d9%8a/"
  };

  const AYAT = {
    anfal30: { surah: "Al-Anfal", no: "30",
      arab: "وَإِذْ يَمْكُرُ بِكَ الَّذِينَ كَفَرُوا لِيُثْبِتُوكَ أَوْ يَقْتُلُوكَ أَوْ يُخْرِجُوكَ ۚ وَيَمْكُرُونَ وَيَمْكُرُ اللَّهُ ۖ وَاللَّهُ خَيْرُ الْمَاكِرِينَ",
      arti: "Dan (ingatlah) ketika orang-orang kafir membuat tipu daya terhadapmu untuk menahanmu, membunuhmu, atau mengusirmu. Mereka membuat tipu daya, dan Allah membalas tipu daya mereka. Allah sebaik-baik pembalas tipu daya." },
    yasin9: { surah: "Yasin", no: "9",
      arab: "وَجَعَلْنَا مِن بَيْنِ أَيْدِيهِمْ سَدًّا وَمِنْ خَلْفِهِمْ سَدًّا فَأَغْشَيْنَاهُمْ فَهُمْ لَا يُبْصِرُونَ",
      arti: "Dan Kami jadikan di hadapan mereka sekat dan di belakang mereka sekat, lalu Kami tutup (penglihatan) mereka sehingga mereka tidak dapat melihat." },
    taubah40: { surah: "At-Taubah", no: "40",
      arab: "إِلَّا تَنصُرُوهُ فَقَدْ نَصَرَهُ اللَّهُ إِذْ أَخْرَجَهُ الَّذِينَ كَفَرُوا ثَانِيَ اثْنَيْنِ إِذْ هُمَا فِي الْغَارِ إِذْ يَقُولُ لِصَاحِبِهِ لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا ۖ فَأَنزَلَ اللَّهُ سَكِينَتَهُ عَلَيْهِ وَأَيَّدَهُ بِجُنُودٍ لَّمْ تَرَوْهَا وَجَعَلَ كَلِمَةَ الَّذِينَ كَفَرُوا السُّفْلَىٰ ۗ وَكَلِمَةُ اللَّهِ هِيَ الْعُلْيَا ۗ وَاللَّهُ عَزِيزٌ حَكِيمٌ",
      arti: "Jika kamu tidak menolongnya, sungguh Allah telah menolongnya, ketika orang-orang kafir mengusirnya, sedang ia salah satu dari dua orang, ketika keduanya berada di dalam gua, ketika ia berkata kepada sahabatnya, \"Jangan bersedih, sesungguhnya Allah bersama kita.\" Lalu Allah menurunkan ketenangan kepadanya dan menguatkannya dengan bala tentara yang tidak kamu lihat. Dia menjadikan seruan orang-orang kafir itu rendah, dan kalimat Allah itulah yang tinggi. Allah Mahaperkasa, Mahabijaksana." },
    taubah108: { surah: "At-Taubah", no: "108",
      arab: "لَا تَقُمْ فِيهِ أَبَدًا ۚ لَّمَسْجِدٌ أُسِّسَ عَلَى التَّقْوَىٰ مِنْ أَوَّلِ يَوْمٍ أَحَقُّ أَن تَقُومَ فِيهِ ۚ فِيهِ رِجَالٌ يُحِبُّونَ أَن يَتَطَهَّرُوا ۚ وَاللَّهُ يُحِبُّ الْمُطَّهِّرِينَ",
      arti: "Janganlah engkau shalat di dalamnya selama-lamanya. Sungguh, masjid yang didirikan atas dasar takwa sejak hari pertama lebih pantas engkau shalat di dalamnya. Di dalamnya ada orang-orang yang suka menyucikan diri, dan Allah menyukai orang-orang yang menyucikan diri." },
    baqarah207: { surah: "Al-Baqarah", no: "207",
      arab: "وَمِنَ النَّاسِ مَن يَشْرِي نَفْسَهُ ابْتِغَاءَ مَرْضَاتِ اللَّهِ ۗ وَاللَّهُ رَءُوفٌ بِالْعِبَادِ",
      arti: "Dan di antara manusia ada orang yang menjual dirinya untuk mencari keridhaan Allah. Allah Maha Penyantun kepada hamba-hamba-Nya." },
    hasyr9: { surah: "Al-Hasyr", no: "9",
      arab: "وَالَّذِينَ تَبَوَّءُوا الدَّارَ وَالْإِيمَانَ مِن قَبْلِهِمْ يُحِبُّونَ مَنْ هَاجَرَ إِلَيْهِمْ وَلَا يَجِدُونَ فِي صُدُورِهِمْ حَاجَةً مِّمَّا أُوتُوا وَيُؤْثِرُونَ عَلَىٰ أَنفُسِهِمْ وَلَوْ كَانَ بِهِمْ خَصَاصَةٌ",
      arti: "Dan orang-orang (Anshar) yang telah menempati negeri itu dan beriman sebelum kedatangan mereka, mencintai orang yang berhijrah kepada mereka. Mereka tidak menginginkan dalam hati apa yang diberikan kepada (Muhajirin), dan mereka mengutamakan (Muhajirin) atas diri mereka sendiri, meskipun mereka juga memerlukan." }
  };

  // ---------- Tempat baru di peta Mekah ----------
  const tempatMekahBaru = [
    { id: "rumah-abubakar", nama: "Rumah Abu Bakar", arab: "دار أبي بكر الصديق", jenis: "rumah", lat: 21.4207, lon: 39.8240, keyakinan: "perkiraan",
      ket: "Rumah Abu Bakar Ash-Shiddiq, tempat Nabi ﷺ datang di tengah hari untuk mengabarkan izin hijrah dan tempat keduanya berangkat di malam hari lewat pintu belakang. Sumber primer yang kami temukan tidak menyebut letaknya; tradisi setempat menempatkannya di sisi barat daya Masjidil Haram (kawasan Misfalah, kini kompleks hotel Makkah Towers yang memuat musala bernama Masjid Abu Bakar). Titik ini perkiraan." },
    { id: "jabal-tsur", nama: "Jabal Tsur", arab: "جبل ثور", jenis: "gunung", lat: 21.3775, lon: 39.85083, keyakinan: "pasti",
      ket: "Gunung setinggi sekitar 750 m di atas permukaan laut, sekitar 5,5 km (garis lurus) di selatan-tenggara Ka'bah, berlawanan arah dengan jalan ke Madinah. HR. Bukhari no. 3905 menyebut gua persembunyian Nabi ﷺ dan Abu Bakar berada di gunung ini." },
    { id: "gua-tsur", nama: "Gua Tsur", arab: "غار ثور", jenis: "titik", lat: 21.3775, lon: 39.85083, keyakinan: "kitab",
      ket: "Gua kecil di dekat puncak Jabal Tsur, tempat Nabi ﷺ dan Abu Bakar bersembunyi tiga malam (HR. Bukhari no. 3905; QS. At-Taubah: 40). Gua yang dikunjungi orang sekarang adalah identifikasi turun-temurun; titik di peta memakai koordinat puncak gunung." },
    { id: "aqabah-mina", nama: "Aqabah, Mina (Masjid Al-Bai'ah)", arab: "العقبة", jenis: "titik", lat: 21.424722, lon: 39.8675, keyakinan: "kitab",
      ket: "Celah bukit di ujung Mina arah Mekah, tempat dua Bai'at Aqabah (621 dan 622 M). Masjid Al-Bai'ah didirikan di tempat ini atas perintah Khalifah Abu Ja'far Al-Manshur sekitar 761 M." }
  ].map((t) => Object.assign(t, enM(t.lat, t.lon)));

  // ---------- Rute di peta wilayah ----------
  // Urutan stasiun dari Ibnu Ishaq (Sirah Ibnu Hisyam 1/491–492, dikutip Ar-Rahiq). Koordinat di luar kota hanya perkiraan.
  const rute = [
    { lat: 21.4207, lon: 39.8240, nama: "Mekah: rumah Abu Bakar", ket: "Titik berangkat di malam 27 Shafar 1 H, lewat pintu belakang rumah. Letak rumah perkiraan." },
    { lat: 21.3775, lon: 39.8508, nama: "Gua Tsur", ket: "Sekitar 5,5 km di selatan Ka'bah, berlawanan arah dengan Madinah. Tiga malam bersembunyi." },
    { lat: 21.40, lon: 39.70, nama: "Mekah bagian bawah", ket: "Pemandu membawa rombongan lewat bagian bawah Mekah, yaitu jalan ke arah pantai (HR. Bukhari no. 2263). Titik perkiraan." },
    { lat: 21.68, lon: 39.24, nama: "Jalan pantai", ket: "Menyusuri pesisir Laut Merah, menjauhi jalan kafilah biasa (HR. Bukhari no. 3905). Titik perkiraan." },
    { lat: 21.92, lon: 39.30, nama: "'Usfan (sisi bawahnya)", ket: "Memotong jalan utama di bawah 'Usfan, sekitar 80 km utara Mekah (Ibnu Ishaq). Perkiraan." },
    { lat: 22.15, lon: 39.26, nama: "Amaj (bagian bawah)", ket: "Lembah di kawasan Khulais sekarang (Ibnu Ishaq). Perkiraan." },
    { lat: 22.38, lon: 39.24, nama: "Qudaid", ket: "Memotong jalan lagi setelah melewati Qudaid (Ibnu Ishaq). Kitab sirah menempatkan kemah Ummu Ma'bad dan permukiman Bani Mudlij di sekitar sini. Perkiraan." },
    { lat: 22.62, lon: 39.22, nama: "Al-Kharrar", ket: "Lembah di sekitar Al-Juhfah. Perkiraan." },
    { lat: 22.85, lon: 39.24, nama: "Tsaniyyatul Marrah", ket: "Celah bukit; letak persisnya tidak diketahui. Perkiraan kasar." },
    { lat: 23.05, lon: 39.22, nama: "Liqf", ket: "Lalu padang Liqf. Letak persisnya tidak diketahui. Perkiraan kasar." },
    { lat: 23.22, lon: 39.18, nama: "Madlajah Liqf dan Madlajah Majah", ket: "Lalu Marjih Majah, Marjih Dzil Ghadhwain, Bathn Dzi Kasyr, Al-Jadajid, dan Al-Ajrad (Ibnu Ishaq). Letak persisnya tidak diketahui; perkiraan kasar." },
    { lat: 23.40, lon: 39.15, nama: "Dzu Salam dan Madlajah Ta'hin", ket: "Lalu Al-'Ababid dan Al-Fajah (Ibnu Ishaq). Perkiraan kasar." },
    { lat: 23.62, lon: 39.18, nama: "Al-'Arj", ket: "Lembah di jalan Mekah–Madinah, di sisi selatan Jabal Waraqan. Perkiraan." },
    { lat: 24.02, lon: 39.36, nama: "Tsaniyyatul 'A'ir, di kanan Rakubah", ket: "Celah gunung di kawasan Jabal Waraqan; Rakubah disebut sebagai patokan arah (riwayat berbeda tentang mana yang di kanan). Perkiraan." },
    { lat: 24.25, lon: 39.48, nama: "Bathn Ri'm", ket: "Lembah terakhir yang disebut Ibnu Ishaq sebelum Quba. Perkiraan." },
    { lat: 24.42, lon: 39.56, nama: "Lembah Al-'Aqiq", ket: "Tidak disebut dalam daftar Ibnu Ishaq; dicantumkan karena jalan dari barat daya menuju Quba melintasi lembah ini. Perkiraan." },
    { lat: 24.448, lon: 39.588, nama: "Tepi harrah", ket: "Kaum muslimin Madinah menyambut di tepi harrah, lalu rombongan berbelok ke kanan menuju Bani Amr bin Auf (HR. Bukhari no. 3906). Perkiraan." },
    { lat: 24.4393, lon: 39.6173, nama: "Quba", ket: "Perkampungan Bani Amr bin Auf. Tiba hari Senin, 8 Rabi'ul Awwal 1 H menurut Ar-Rahiq (12 Rabi'ul Awwal menurut Ibnu Ishaq)." },
    { lat: 24.4478, lon: 39.6125, nama: "Bani Salim bin Auf (Masjid Jumu'ah)", ket: "Shalat Jumat pertama yang dipimpin Nabi ﷺ, di dasar lembah Ranuna'. Titik perkiraan." },
    { lat: 24.4673, lon: 39.6112, nama: "Madinah: mirbad Bani Najjar", ket: "Unta Nabi ﷺ berlutut di sini; kelak menjadi Masjid Nabawi. Rumah Abu Ayyub di dekatnya." }
  ];

  const fase = [
    { id: "persiapan", nama: "Jalan menuju hijrah", ket: "Bai'at Aqabah dan gelombang sahabat yang berangkat lebih dulu (621–622 M)." },
    { id: "mekah", nama: "Hari terakhir di Mekah", ket: "Makar Quraisy dan malam keberangkatan." },
    { id: "gua", nama: "Tiga malam di Gua Tsur", ket: "Bersembunyi di selatan Mekah." },
    { id: "perjalanan", nama: "Di jalan pantai", ket: "Perjalanan sekitar sepekan menyusuri pesisir." },
    { id: "quba", nama: "Di Quba", ket: "Tiba di Bani Amr bin Auf dan masjid pertama." },
    { id: "madinah", nama: "Di Madinah", ket: "Masuk kota, Masjid Nabawi, dan persaudaraan." }
  ];

  // ---------- Episode ----------
  const episode = [
    { id: "aqabah-pertama", no: 1, fase: "persiapan", judul: "Bai'at Aqabah pertama", arab: "بيعة العقبة الأولى", peristiwa: "aqabah",
      tahun: 621, tanggal: "Musim haji, Dzulhijjah tahun ke-12 kenabian (±Juni–Juli 621 M)", urutWaktu: 621.50,
      tempat: { kota: "mekah", id: "aqabah-mina" },
      tokoh: ["nabi", "asad", "ubadah"],
      ringkas: "Dua belas orang dari Yatsrib berbaiat kepada Nabi ﷺ di Aqabah, Mina: tidak menyekutukan Allah, tidak mencuri, tidak berzina, tidak membunuh anak, tidak berdusta, dan taat dalam kebaikan.",
      isi: [
        "Setahun sebelumnya, pada musim haji, Nabi ﷺ menemui enam orang dari kabilah Khazraj di Aqabah, Mina. Mereka pernah mendengar dari tetangga Yahudi mereka bahwa seorang nabi akan diutus. Mereka pun beriman dan pulang membawa kabar itu ke Yatsrib.",
        "Pada musim haji berikutnya datang dua belas orang: sepuluh dari Khazraj dan dua dari Aus, di antaranya As'ad bin Zurarah dan Ubadah bin Ash-Shamit. Di celah bukit Aqabah mereka berbaiat untuk tidak menyekutukan Allah dengan apa pun, tidak mencuri, tidak berzina, tidak membunuh anak, tidak membuat tuduhan dusta, dan tidak menentang Nabi ﷺ dalam kebaikan. Siapa yang menepatinya, pahalanya di sisi Allah.",
        "Baiat ini belum memuat janji melindungi Nabi ﷺ. Isinya serupa dengan janji yang kelak diambil dari kaum perempuan (QS. Al-Mumtahanah: 12), sehingga kitab sirah menyebutnya baiat an-nisa'."
      ],
      riwayat: [
        { derajat: "sirah", sumber: "Sirah Ibnu Hisyam (Ibnu Ishaq), bab Aqabah pertama: enam orang Khazraj setahun sebelumnya, lalu dua belas orang, dan riwayat Ubadah tentang isi baiat" },
        { derajat: "shahih", sumber: "HR. Bukhari no. 3892 (Ubadah bin Ash-Shamit, peserta malam Aqabah), bab utusan Anshar dan Aqabah", url: sn("bukhari", 3892),
          kutip: "Berbaiatlah kepadaku untuk tidak menyekutukan Allah dengan apa pun, tidak mencuri, tidak berzina, dan tidak membunuh anak-anak kalian." }
      ],
      catatan: "Bukhari meletakkan hadits Ubadah di bab Aqabah, tetapi lafaznya tidak menyebut baiat yang mana. Ibnu Hajar berpendapat lafaz ini mungkin diucapkan kemudian, setelah turun QS. Al-Mumtahanah: 12; sedangkan Ibnu Ishaq meriwayatkan dari Ubadah bahwa Aqabah pertama memang berisi janji serupa. Padanan Masehi untuk musim haji sebelum Hijrah hanya perkiraan, karena orang Arab saat itu kadang menggeser bulan (nasi').",
      adegan: "Malam di celah bukit Aqabah, Mina, diterangi bulan. Dua belas sosok chibi dari Yatsrib duduk melingkar di sekitar cahaya lembut berlabel \"Nabi ﷺ\". Satu per satu mereka maju mengulurkan tangan, sementara teks janji muncul baris demi baris: \"Tidak menyekutukan Allah… tidak mencuri… tidak berzina…\". Di akhir, rombongan pulang ke utara." },

    { id: "mushab-yatsrib", no: 2, fase: "persiapan", judul: "Mush'ab bin Umair, guru pertama di Yatsrib", arab: "مصعب بن عمير",
      tahun: 621, tanggal: "Setelah Bai'at Aqabah pertama (±621 M), sekitar setahun di Yatsrib", urutWaktu: 621.55,
      tempat: { lat: 24.4680, lon: 39.6125, nama: "Yatsrib: rumah As'ad bin Zurarah, Bani Najjar (titik perkiraan)" },
      tokoh: ["mushab", "ibnuummimaktum", "asad", "usaid", "saadmuadz"],
      ringkas: "Nabi ﷺ mengutus Mush'ab bin Umair ke Yatsrib untuk mengajarkan Al-Qur'an. Dalam setahun Islam masuk ke banyak rumah, termasuk rumah para pemimpin Aus.",
      isi: [
        "Sepulang rombongan Aqabah pertama, Nabi ﷺ mengutus Mush'ab bin Umair ke Yatsrib untuk membacakan Al-Qur'an dan mengajarkan agama. Mush'ab tinggal di rumah As'ad bin Zurarah dari Bani Najjar. Al-Bara' bin 'Azib, yang saat itu masih kecil, mengingat bahwa yang pertama datang kepada mereka adalah Mush'ab dan Abdullah bin Ummi Maktum, dan keduanya mengajarkan Al-Qur'an.",
        "Kitab sirah mengisahkan Usaid bin Hudhair datang membawa tombak hendak mengusir Mush'ab. Mush'ab berkata, \"Duduklah dan dengarkan. Jika engkau suka, terimalah; jika tidak, kami berhenti.\" Usaid mendengarkan Al-Qur'an lalu masuk Islam. Setelah itu Sa'ad bin Mu'adz, pemimpin Bani Abdul Asyhal, datang dan mengalami hal yang sama. Ia pulang dan berkata tidak akan berbicara dengan kaumnya sampai mereka beriman; sore itu Bani Abdul Asyhal masuk Islam.",
        "Pada masa ini As'ad bin Zurarah mengumpulkan kaum muslimin Yatsrib untuk shalat Jumat yang pertama di sana, di Naqi' Al-Khadhamat, bersama sekitar empat puluh orang. Menjelang musim haji berikutnya Mush'ab kembali ke Mekah membawa kabar gembira."
      ],
      riwayat: [
        { derajat: "shahih", sumber: "HR. Bukhari no. 3925 (Al-Bara' bin 'Azib)", url: sn("bukhari", 3925),
          kutip: "Yang pertama datang kepada kami adalah Mush'ab bin Umair dan Ibnu Ummi Maktum; keduanya mengajarkan Al-Qur'an kepada orang-orang." },
        { derajat: "sirah", sumber: "Sirah Ibnu Hisyam (Ibnu Ishaq): Mush'ab di rumah As'ad bin Zurarah; keislaman Usaid bin Hudhair dan Sa'ad bin Mu'adz" },
        { derajat: "shahih", sumber: "HR. Abu Dawud no. 1069 (Ka'ab bin Malik); dinilai hasan oleh Al-Albani", url: sn("abudawud", 1069),
          kutip: "As'ad bin Zurarah adalah orang pertama yang mengumpulkan kami untuk shalat Jumat… Kami saat itu empat puluh orang." }
      ],
      catatan: "Ibnu Ishaq menyebut Mush'ab diutus bersama rombongan Aqabah pertama; ada riwayat lain bahwa kaum Anshar yang memintanya. Hadits Abu Dawud tidak menyebut tahunnya; urutannya di sini mengikuti kitab sirah, yaitu sebelum Nabi ﷺ tiba.",
      adegan: "Kebun kurma Bani Abdul Asyhal. Mush'ab (chibi) duduk membaca dari lembaran. Usaid datang membawa tombak, berhenti, lalu perlahan menurunkan tombaknya dan duduk. Teks: \"Duduklah dan dengarkan dulu.\" Setelah itu titik-titik cahaya kecil menyala di rumah-rumah Yatsrib satu per satu." },

    { id: "abusalamah", no: 3, fase: "persiapan", judul: "Abu Salamah dan Ummu Salamah: keluarga yang terpisah", arab: "هجرة أبي سلمة",
      tahun: 621, tanggal: "Sekitar setahun sebelum Bai'at Aqabah kedua (±621 M), menurut Ibnu Ishaq", urutWaktu: 621.60,
      tempat: { kota: "mekah", id: "jalan-mala" },
      tokoh: ["abusalamah", "ummusalamah", "utsmanthalhah"],
      ringkas: "Abu Salamah berangkat ke Yatsrib lebih dulu, tetapi keluarga istrinya menahan Ummu Salamah dan keluarganya sendiri mengambil anak mereka. Hampir setahun kemudian Ummu Salamah menyusul seorang diri bersama anaknya.",
      isi: [
        "Abu Salamah bin Abdul Asad, sepupu sekaligus saudara sesusuan Nabi ﷺ, baru kembali dari Habasyah dan terus disakiti di Mekah. Menurut Ibnu Ishaq, ia orang Quraisy pertama yang hijrah ke Yatsrib. Ia menaikkan istrinya, Ummu Salamah, dan putra mereka, Salamah, ke atas unta lalu berangkat.",
        "Bani Mughirah, keluarga Ummu Salamah, menghadang: \"Engkau boleh pergi, tetapi putri kami tidak.\" Mereka mengambil Ummu Salamah. Bani Abdul Asad, keluarga Abu Salamah, tidak terima dan mengambil si kecil Salamah. Dalam sehari keluarga itu terpisah tiga: Abu Salamah di Yatsrib, Ummu Salamah di Bani Mughirah, dan anaknya di Bani Abdul Asad.",
        "Ummu Salamah bercerita bahwa setiap pagi ia keluar ke Al-Abthah dan menangis sampai sore, hampir setahun lamanya. Akhirnya seorang kerabat iba kepadanya, keluarganya mengizinkannya pergi, dan anaknya dikembalikan. Ia berangkat seorang diri dengan untanya.",
        "Di At-Tan'im ia bertemu Utsman bin Thalhah, pemegang kunci Ka'bah yang saat itu belum masuk Islam. Utsman menuntun untanya sampai Quba, selalu menjauh ketika ia turun beristirahat, lalu pulang ke Mekah. Ummu Salamah berkata ia tidak pernah melihat teman perjalanan yang lebih mulia daripada Utsman bin Thalhah."
      ],
      riwayat: [
        { derajat: "sirah", sumber: "Sirah Ibnu Hisyam (Ibnu Ishaq), dari Ummu Salamah melalui cucunya",
          kutip: "Setiap pagi aku keluar ke Al-Abthah dan duduk menangis hingga sore, hampir setahun." },
        { derajat: "shahih", sumber: "HR. Bukhari no. 5101 (Ummu Habibah): Nabi ﷺ dan Abu Salamah sama-sama disusui Tsuwaibah", url: sn("bukhari", 5101),
          kutip: "Aku dan Abu Salamah disusui oleh Tsuwaibah." }
      ],
      catatan: "Ibnu Ishaq menyebut Abu Salamah sebagai muhajir pertama ke Yatsrib, sekitar setahun sebelum Bai'at Aqabah kedua, sedangkan Al-Bara' (HR. Bukhari no. 3925) menyebut Mush'ab dan Ibnu Ummi Maktum yang pertama datang. Keduanya bisa dipadukan: Mush'ab diutus sebagai guru, Abu Salamah hijrah untuk menyelamatkan diri. Tanggal Ummu Salamah tiba di Quba tidak tercatat. Letak di peta Mekah memakai jalan ke Ma'la karena Al-Abthah adalah lembah di Mekah bagian atas.",
      adegan: "Pagi di tepi kota: satu unta membawa sosok ibu dan bayi. Dua kelompok kerabat menghadang dari kiri dan kanan; unta Abu Salamah berjalan sendirian ke utara, sedangkan ibu dan anak dibawa ke dua arah berbeda (garis putus-putus, tanpa kekerasan). Transisi musim: sang ibu duduk di lembah setiap pagi. Akhir: ibu dan anak di atas unta yang dituntun Utsman bin Thalhah, dengan teks \"Tidak pernah kulihat teman perjalanan yang lebih mulia.\"" },

    { id: "aqabah-kedua", no: 4, fase: "persiapan", judul: "Bai'at Aqabah kedua", arab: "بيعة العقبة الثانية", peristiwa: "aqabah",
      tahun: 622, tanggal: "Malam hari tasyriq, Dzulhijjah tahun ke-13 kenabian (±Juni 622 M)", urutWaktu: 622.45,
      tempat: { kota: "mekah", id: "aqabah-mina" },
      tokoh: ["nabi", "abbas", "kaab", "jabir", "asad", "ubadah", "saadubadah", "saadrabi", "abdullahrawahah", "nusaibah", "mushab"],
      ringkas: "Sekitar tujuh puluh lebih laki-laki dan dua perempuan dari Yatsrib berjanji melindungi Nabi ﷺ seperti mereka melindungi keluarga sendiri. Janji inilah yang membuka jalan bagi Hijrah.",
      isi: [
        "Setahun setelah Mush'ab diutus, rombongan haji dari Yatsrib datang dalam jumlah besar. Kaum muslimin di antara mereka menyelinap keluar dari kemah di tengah malam hari tasyriq, lalu berkumpul di celah bukit dekat Aqabah agar tidak diketahui kaum musyrik, termasuk teman serombongan mereka sendiri. Ka'ab bin Malik, salah seorang peserta, kelak berkata ia tidak mau menukar malam Aqabah itu dengan ikut Perang Badar.",
        "Nabi ﷺ datang bersama pamannya, Al-Abbas, yang menurut kitab sirah saat itu belum masuk Islam tetapi ingin memastikan keselamatan keponakannya. Jabir bin Abdullah meriwayatkan isi janjinya: mendengar dan taat dalam keadaan semangat maupun malas, berinfak dalam kelapangan maupun kesempitan, mengajak kepada kebaikan dan mencegah kemungkaran, berbicara karena Allah tanpa takut celaan, dan melindungi Nabi ﷺ bila beliau datang kepada mereka, sebagaimana mereka melindungi diri, istri, dan anak-anak mereka. Balasannya surga.",
        "Menurut Ibnu Ishaq, Al-Bara' bin Ma'rur yang pertama menjabat tangan beliau. Nabi ﷺ lalu meminta mereka memilih dua belas naqib (pemimpin): sembilan dari Khazraj dan tiga dari Aus. Ketika seorang Anshar bertanya apakah beliau akan meninggalkan mereka bila Allah memberi kemenangan, beliau tersenyum dan menjawab bahwa beliau bagian dari mereka dan mereka bagian dari beliau."
      ],
      riwayat: [
        { derajat: "shahih", sumber: "HR. Ahmad no. 14456 (Jabir bin Abdullah); sanadnya dinilai shahih oleh Syu'aib Al-Arna'uth", url: hu("ahmad", 14456),
          kutip: "…dan kalian melindungiku sebagaimana kalian melindungi diri, istri, dan anak-anak kalian. Bagi kalian surga." },
        { derajat: "shahih", sumber: "HR. Bukhari no. 3889 (Ka'ab bin Malik)", url: sn("bukhari", 3889),
          kutip: "Aku tidak suka malam Aqabah itu diganti dengan Perang Badar, meskipun Badar lebih terkenal di kalangan orang." },
        { derajat: "shahih", sumber: "HR. Bukhari no. 3890 (Jabir): ia hadir di Aqabah bersama dua pamannya dari pihak ibu, salah satunya Al-Bara' bin Ma'rur", url: sn("bukhari", 3890) },
        { derajat: "shahih", sumber: "HR. Bukhari no. 3893 (Ubadah bin Ash-Shamit): ia termasuk para naqib", url: sn("bukhari", 3893) },
        { derajat: "sirah", sumber: "Sirah Ibnu Hisyam (Ibnu Ishaq, dari Ka'ab bin Malik): jumlah peserta, kehadiran Al-Abbas, Al-Bara' bin Ma'rur, dan dua belas naqib" }
      ],
      catatan: "Ibnu Ishaq mencatat 73 laki-laki dan 2 perempuan, yaitu Nusaibah binti Ka'ab (Ummu 'Umarah) dan Asma' binti Amr (Ummu Mani'); riwayat Jabir dalam Musnad Ahmad menyebut \"tujuh puluh orang\". Nomor Ahmad mengikuti penomoran hadithunlocked. Padanan Juni 622 M adalah perkiraan.",
      adegan: "Tengah malam di Mina: kemah-kemah sunyi, lalu sosok-sosok chibi menyelinap satu per satu ke celah bukit. Di sana ada cahaya berlabel \"Nabi ﷺ\" dan Al-Abbas di sisinya. Tangan-tangan terulur bergiliran sementara penghitung naik sampai \"73 + 2\". Dua belas penanda naqib menyala di atas kepala para pemimpin." },

    { id: "izin-hijrah", no: 5, fase: "persiapan", judul: "Izin hijrah dan rombongan yang berangkat diam-diam", arab: "الإذن بالهجرة",
      tahun: 622, tanggal: "Setelah Aqabah kedua sampai akhir Shafar 1 H (±Juli–September 622 M)", urutWaktu: 622.50,
      tempat: { lat: 21.4225, lon: 39.8262, nama: "Mekah" },
      tokoh: ["nabi", "abubakar", "mushab", "ibnuummimaktum", "bilal", "saad", "ammar", "umar"],
      ringkas: "Nabi ﷺ mengabarkan negeri hijrah: tanah berkebun kurma di antara dua harrah. Para sahabat berangkat ke Yatsrib sedikit demi sedikit, sementara Abu Bakar diminta menunggu.",
      isi: [
        "Aisyah meriwayatkan bahwa Nabi ﷺ berkata kepada kaum muslimin, \"Telah diperlihatkan kepadaku negeri hijrah kalian: tanah berkebun kurma di antara dua harrah (padang batu hitam).\" Maka sebagian sahabat berhijrah ke Madinah, dan sebagian besar yang dulu hijrah ke Habasyah kembali lalu menyusul ke sana.",
        "Mereka berangkat diam-diam, sendiri atau dalam kelompok kecil, karena Quraisy berusaha menahan siapa pun yang pergi. Al-Bara' bin 'Azib mengingat urutan kedatangan di Madinah: Mush'ab bin Umair dan Ibnu Ummi Maktum, lalu Bilal, Sa'ad, dan Ammar bin Yasir, kemudian Umar bin Al-Khaththab bersama dua puluh sahabat, barulah Nabi ﷺ.",
        "Abu Bakar juga bersiap pergi, tetapi Nabi ﷺ bersabda, \"Tunggulah, aku berharap akan diizinkan juga.\" Abu Bakar bertanya, \"Demi ayahku, engkau berharap begitu?\" Beliau menjawab, \"Ya.\" Abu Bakar pun menahan diri agar bisa menemani beliau, dan selama empat bulan memberi makan dua untanya dengan daun pohon samur.",
        "Menjelang akhir Shafar, hampir semua muslim yang mampu telah pergi. Menurut Ibnu Ishaq, yang tersisa di Mekah hanya Nabi ﷺ, Abu Bakar, Ali, dan mereka yang ditahan keluarganya atau tidak sanggup pergi."
      ],
      riwayat: [
        { derajat: "shahih", sumber: "HR. Bukhari no. 3905 (Aisyah)", url: sn("bukhari", 3905),
          kutip: "Telah diperlihatkan kepadaku negeri hijrah kalian, tanah berkebun kurma di antara dua harrah." },
        { derajat: "shahih", sumber: "HR. Bukhari no. 3925 (Al-Bara' bin 'Azib)", url: sn("bukhari", 3925),
          kutip: "Kemudian Umar bin Al-Khaththab datang bersama dua puluh sahabat Nabi ﷺ, lalu Nabi ﷺ datang." },
        { derajat: "sirah", sumber: "Sirah Ibnu Hisyam (Ibnu Ishaq): yang tertinggal di Mekah hanya Nabi ﷺ, Abu Bakar, Ali, dan orang yang ditahan" }
      ],
      catatan: "Sa'ad dalam riwayat Al-Bara' umumnya dipahami sebagai Sa'ad bin Abi Waqqash. Hadits tidak menyebut tanggal; rentang waktu di sini mengikuti kitab sirah, yaitu setelah Aqabah kedua dan sebelum Nabi ﷺ berangkat. Tempatnya tidak disebut, jadi episode ini ditautkan ke Mekah secara umum.",
      adegan: "Peta Mekah di malam hari: titik-titik kecil keluar dari rumah-rumah, menyelinap lewat gang menuju jalan ke utara, lalu menghilang satu per satu. Penanda waktu berganti: \"Muharram… Shafar\". Di halaman rumah Abu Bakar, dua unta sedang makan daun samur." },

    { id: "umar-ayyasy", no: 6, fase: "persiapan", judul: "Umar, Ayyasy, dan Hisyam", arab: "هجرة عمر وعياش",
      tahun: 622, tanggal: "Masa gelombang hijrah, ±Muharram–Shafar 1 H (Juli–Agustus 622 M)", urutWaktu: 622.55,
      tempat: { lat: 21.575, lon: 39.74, nama: "At-Tanadhub, dekat Sarif di utara Mekah (perkiraan)" },
      tokoh: ["umar", "ayyasy", "hisyamash", "abujahal"],
      ringkas: "Umar berjanji bertemu Ayyasy dan Hisyam di luar Mekah. Hisyam tertahan, sedangkan Ayyasy kemudian dibujuk pulang dengan tipu daya. Kisah Umar menantang Quraisy secara terbuka sanadnya lemah.",
      isi: [
        "Umar bin Al-Khaththab menceritakan bahwa ia, Ayyasy bin Abi Rabi'ah, dan Hisyam bin Al-'Ash sepakat bertemu di At-Tanadhub, dekat Sarif di utara Mekah. Siapa yang tidak muncul sampai pagi berarti tertahan, dan yang lain berangkat tanpanya. Umar dan Ayyasy datang; Hisyam ditahan keluarganya.",
        "Keduanya sampai di Quba. Tak lama kemudian Abu Jahal dan saudaranya, Al-Harits, yang seibu dengan Ayyasy, menyusul dan berkata, \"Ibumu bersumpah tidak akan menyisir rambut dan tidak akan berteduh dari matahari sampai melihatmu.\" Umar memperingatkan bahwa ini tipu daya, bahkan menawarkan separuh hartanya agar Ayyasy tetap tinggal. Ayyasy tetap pulang, dan Umar memberinya unta yang cepat. Di tengah jalan Ayyasy diikat dan dibawa masuk ke Mekah.",
        "Ayyasy tertahan di Mekah selama beberapa tahun. Nabi ﷺ kelak menyebut namanya dalam doa di shalat, bersama orang-orang beriman yang lemah, agar Allah menyelamatkan mereka.",
        "Ada kisah terkenal bahwa Umar berhijrah terang-terangan: ia thawaf, lalu menantang siapa saja yang ingin ibunya kehilangan anak untuk menghadangnya di balik lembah. Kisah ini sanadnya lemah. Riwayat yang lebih kuat menunjukkan Umar pun berangkat dengan rencana yang hati-hati."
      ],
      riwayat: [
        { derajat: "sirah", sumber: "Sirah Ibnu Hisyam (Ibnu Ishaq, dari Nafi', dari Ibnu Umar, dari Umar)",
          kutip: "Siapa di antara kita yang tidak ada di sana pada pagi hari, berarti ia telah ditahan; maka dua yang lain berangkat." },
        { derajat: "shahih", sumber: "HR. Bukhari no. 804 (Abu Hurairah): doa Nabi ﷺ untuk Al-Walid bin Al-Walid, Salamah bin Hisyam, dan Ayyasy bin Abi Rabi'ah", url: sn("bukhari", 804) },
        { derajat: "shahih", sumber: "HR. Bukhari no. 3925 (Al-Bara'): Umar datang ke Madinah bersama dua puluh sahabat", url: sn("bukhari", 3925) },
        { derajat: "lemah", sumber: "Ibnu Asakir, Tarikh Dimasyq; Ibnul Atsir, Usdul Ghabah (dari Ibnu Abbas, dari Ali): Umar hijrah terang-terangan. Dibahas IslamQA no. 208771", url: U.qa208771,
          kutip: "Siapa yang ingin ibunya kehilangan anaknya… temuilah aku di balik lembah ini." }
      ],
      catatan: "Kisah hijrah terang-terangan diriwayatkan melalui Az-Zubair bin Muhammad Al-Utsmani, Abdullah bin Al-Qasim Al-Aili, dan ayahnya; Al-Albani menyebut ketiganya tidak dikenal (majhul), sehingga kisah ini tidak bisa dijadikan pegangan. Riwayat Al-Bara' menyebut Umar datang bersama dua puluh orang, sedangkan Ibnu Ishaq berfokus pada tiga orang yang berjanji bertemu; keduanya tidak saling meniadakan. Letak At-Tanadhub perkiraan.",
      adegan: "Fajar di At-Tanadhub: tiga penanda tempat bertemu. Dua sosok (Umar dan Ayyasy) tiba, satu tempat kosong bertanda tanya untuk Hisyam. Pindah ke Quba: dua sosok datang membujuk, Ayyasy menoleh ke arah Mekah dan pergi dengan unta pemberian Umar. Di akhir muncul label kecil: \"Kisah tantangan terbuka: sanad lemah\"." },

    { id: "darun-nadwah", no: 7, fase: "mekah", judul: "Makar di Darun Nadwah", arab: "دار الندوة", tontonan: "makar-nadwah",
      tahun: 622, tanggal: "Akhir Shafar 1 H, menjelang malam keberangkatan (±12 September 622 M)", urutWaktu: 622.6960,
      tempat: { kota: "mekah", id: "nadwah" },
      tokoh: ["abujahal", "abusufyan", "utbah", "umayyah", "nabi"],
      ringkas: "Melihat kaum muslimin pindah ke Yatsrib, para pemuka Quraisy bermusyawarah: menahan, mengusir, atau membunuh Nabi ﷺ. Mereka memilih usul Abu Jahal agar pemuda dari setiap kabilah membunuh beliau bersama-sama.",
      isi: [
        "Quraisy sadar Yatsrib telah menjadi tempat berlindung kaum muslimin. Bila Nabi ﷺ menyusul, sebuah kekuatan baru akan tumbuh di jalur dagang mereka ke Syam. Para pemuka kabilah pun berkumpul di Darun Nadwah, balai musyawarah yang didirikan Qushay bin Kilab.",
        "Ibnu Abbas menafsirkan QS. Al-Anfal: 30: ada yang mengusulkan agar beliau diikat dan dipenjara, ada yang mengusulkan diusir, dan ada yang mengusulkan dibunuh. Menurut kitab sirah, Abu Jahal mengusulkan agar setiap kabilah mengirim seorang pemuda yang kuat. Mereka menyerang bersama-sama sehingga tanggung jawabnya terbagi ke semua kabilah, dan Bani Abdi Manaf tidak akan sanggup menuntut balas kepada semuanya.",
        "Mereka sepakat. Tetapi Allah memberi tahu Nabi ﷺ rencana itu, dan malam itu beliau tidak tidur di tempat tidurnya. Ayat Al-Anfal: 30 kelak mengingatkan peristiwa ini: mereka membuat tipu daya, dan Allah membalas tipu daya mereka."
      ],
      riwayat: [
        { derajat: "sirah", sumber: "Sirah Ibnu Hisyam (Ibnu Ishaq), bab Hijrah: musyawarah di Darun Nadwah dan usul Abu Jahal" },
        { derajat: "lemah", sumber: "HR. Ahmad no. 3251 (Ibnu Abbas), tafsir QS. Al-Anfal: 30", url: U.ahmad3251,
          kutip: "Sebagian mereka berkata: bila pagi tiba, ikatlah dia. Sebagian berkata: bunuhlah dia. Sebagian lagi berkata: usirlah dia." },
        { derajat: "lemah", sumber: "Kitab sirah dan tafsir (Ibnu Ishaq; tafsir Ibnu Katsir): Iblis hadir menyamar sebagai orang tua dari Najd" }
      ],
      ayat: [AYAT.anfal30],
      catatan: "Sanad Ahmad no. 3251 (no. 3241 dalam penomoran lain) dinilai hasan oleh Ibnu Hajar dan Ibnu Katsir, tetapi lemah menurut Al-Albani dan pentahqiq Musnad, sehingga ditandai diperselisihkan. Rincian bahwa Iblis datang menyamar sebagai orang tua dari Najd hanya ada di kitab sirah dan tafsir, tidak dalam hadits shahih. Menurut kitab sirah, setelah musyawarah itu Jibril datang dan meminta Nabi ﷺ tidak tidur di tempat tidurnya malam itu; jadi musyawarah ini terjadi tidak lama sebelum malam keberangkatan.",
      adegan: "Ruang Darun Nadwah remang-remang; para pemuka duduk melingkar. Tiga gulungan usulan muncul di tengah: \"Penjarakan\", \"Usir\", \"Bunuh\". Dua tercoret, satu menyala merah. Kamera keluar ke langit malam dan teks QS. Al-Anfal: 30 muncul perlahan. (Lihat tontonan \"makar-nadwah\".)" },

    { id: "siang-abubakar", no: 8, fase: "mekah", judul: "Siang hari di rumah Abu Bakar dan ikat pinggang Asma'", arab: "ذات النطاقين",
      tahun: 622, tanggal: "Akhir Shafar 1 H, tengah hari (±12 September 622 M)", urutWaktu: 622.6965,
      tempat: { kota: "mekah", id: "rumah-abubakar" },
      tokoh: ["nabi", "abubakar", "aisyah", "asma"],
      ringkas: "Nabi ﷺ datang ke rumah Abu Bakar di tengah hari, waktu yang tidak biasa, membawa kabar: \"Aku telah diizinkan keluar.\" Keluarga Abu Bakar menyiapkan bekal, dan Asma' membelah ikat pinggangnya untuk mengikat kantong makanan.",
      isi: [
        "Aisyah bercerita: suatu hari, saat mereka duduk di rumah Abu Bakar di tengah hari yang terik, ada yang berkata bahwa Rasulullah ﷺ datang pada jam yang biasanya beliau tidak datang. Abu Bakar berkata, \"Demi Allah, beliau tidak datang pada jam seperti ini kecuali karena urusan penting.\"",
        "Nabi ﷺ meminta izin masuk dan berkata, \"Suruh keluar orang-orang yang ada bersamamu.\" Abu Bakar menjawab, \"Mereka hanyalah keluargamu.\" Beliau bersabda, \"Aku telah diizinkan untuk keluar.\" Abu Bakar bertanya, \"Aku menemanimu?\" Beliau menjawab, \"Ya.\" Menurut riwayat Ibnu Ishaq, Aisyah belum pernah melihat orang menangis karena gembira sampai ia melihat ayahnya menangis hari itu.",
        "Abu Bakar menawarkan salah satu dari dua untanya, dan Nabi ﷺ menerimanya dengan syarat membayar harganya. Keluarga itu lalu menyiapkan bekal secepatnya dan menaruhnya dalam kantong kulit.",
        "Tidak ada tali untuk mengikat kantong makanan dan wadah air. Asma' binti Abu Bakar berkata ia hanya punya ikat pinggangnya. Abu Bakar menyuruhnya membelah ikat pinggang itu menjadi dua: satu untuk wadah air, satu untuk kantong makanan. Sejak itu Asma' dijuluki Dzatun Nithaqain, \"pemilik dua ikat pinggang\"."
      ],
      riwayat: [
        { derajat: "shahih", sumber: "HR. Bukhari no. 3905 (Aisyah)", url: sn("bukhari", 3905), kutip: "Aku telah diizinkan untuk keluar." },
        { derajat: "shahih", sumber: "HR. Bukhari no. 2979 (Asma' binti Abu Bakar)", url: sn("bukhari", 2979),
          kutip: "Belahlah menjadi dua; ikatkan yang satu pada wadah air dan yang lain pada kantong makanan." },
        { derajat: "sirah", sumber: "Sirah Ibnu Hisyam (Ibnu Ishaq, dari Aisyah): Abu Bakar menangis karena gembira" }
      ],
      catatan: "Hadits Bukhari tidak menyebut tanggal; kitab sirah menempatkan kunjungan ini pada hari terakhir sebelum keberangkatan, setelah musyawarah di Darun Nadwah. Letak rumah Abu Bakar di Mekah hanya diketahui dari tradisi setempat (lihat tempat \"rumah-abubakar\").",
      adegan: "Halaman rumah Abu Bakar di siang terik, bayangan pendek. Cahaya berlabel \"Nabi ﷺ\" tiba di pintu; Abu Bakar berdiri terkejut. Teks: \"Aku telah diizinkan keluar.\" Lalu close-up: Asma' (chibi) memegang ikat pinggang, membelahnya dua, mengikat kantong makanan dan wadah air; label \"Dzatun Nithaqain\" muncul." },

    { id: "ali-ranjang", no: 9, fase: "mekah", judul: "Ali di tempat tidur Nabi ﷺ", arab: "مبيت علي في فراش النبي", peristiwa: "tsur",
      tahun: 622, tanggal: "Malam 27 Shafar 1 H (±12/13 September 622 M)", urutWaktu: 622.6970,
      tempat: { kota: "mekah", id: "khadijah" },
      tokoh: ["ali", "nabi", "abujahal", "abulahab", "umayyah", "uqbah"],
      ringkas: "Malam itu para pemuda Quraisy mengepung rumah Nabi ﷺ. Ali bin Abi Thalib tidur di tempat tidur beliau, sehingga para pengepung mengira Nabi ﷺ masih di dalam.",
      isi: [
        "Sejak gelap, orang-orang yang dipilih dari berbagai kabilah berjaga di sekitar rumah Nabi ﷺ, menunggu saat untuk menyerang. Kitab sirah menyebut beberapa nama di antara mereka: Abu Jahal, Al-Hakam bin Abil 'Ash, Uqbah bin Abi Mu'aith, Umayyah bin Khalaf, dan Abu Lahab.",
        "Nabi ﷺ meminta Ali bin Abi Thalib tidur di tempat tidurnya dan berselimut dengan burdah milik beliau, sambil menenangkannya bahwa tidak akan ada hal buruk yang menimpanya. Para pengepung mengintip, melihat ada yang berbaring, lalu terus menunggu sampai pagi.",
        "Pagi harinya mereka masuk dan mendapati Ali. Ketika ditanya di mana sahabatnya, Ali menjawab bahwa ia tidak tahu. Mereka sadar telah menunggu semalaman dengan sia-sia.",
        "Nabi ﷺ juga menitipkan kepada Ali barang-barang titipan penduduk Mekah untuk dikembalikan kepada pemiliknya. Bahkan orang-orang yang memusuhi beliau tetap menitipkan barang berharga kepada Al-Amin, orang yang terpercaya."
      ],
      riwayat: [
        { derajat: "sirah", sumber: "Sirah Ibnu Hisyam (Ibnu Ishaq): Ali tidur di tempat tidur Nabi ﷺ dan ditugasi mengembalikan titipan; nama-nama pengepung" },
        { derajat: "lemah", sumber: "HR. Ahmad no. 3251 (Ibnu Abbas)", url: U.ahmad3251,
          kutip: "Ali tidur di tempat tidur Nabi ﷺ… kaum musyrikin berjaga semalaman mengira ia adalah Nabi ﷺ." }
      ],
      catatan: "Sanad Ahmad no. 3251 diperselisihkan (hasan menurut Ibnu Hajar dan Ibnu Katsir, lemah menurut Al-Albani), tetapi kisah Ali tidur di tempat tidur Nabi ﷺ masyhur dalam kitab-kitab sirah. Jumlah dan nama para pengepung berbeda-beda antarriwayat. Tanggal mengikuti Ar-Rahiq Al-Makhtum.",
      adegan: "Rumah Nabi ﷺ di malam hari dikelilingi lingkaran siluet pengepung yang membawa obor. Di dalam, Ali berbaring berselimut. Waktu dipercepat ke pagi; para pengepung masuk, Ali bangun, dan balon teks muncul: \"Aku tidak tahu.\"" },

    { id: "keluar-menuju-tsur", no: 10, fase: "mekah", judul: "Keluar di malam hari menuju Gua Tsur", arab: "الخروج إلى غار ثور", peristiwa: "tsur",
      tahun: 622, tanggal: "Malam 27 Shafar 1 H (±12/13 September 622 M)", urutWaktu: 622.6975,
      tempat: { kota: "mekah", id: "rumah-abubakar" },
      tokoh: ["nabi", "abubakar"],
      ringkas: "Nabi ﷺ keluar dari rumahnya dan pergi ke rumah Abu Bakar. Keduanya keluar lewat pintu belakang lalu berjalan ke selatan, ke Jabal Tsur, berlawanan arah dengan Madinah.",
      isi: [
        "Kitab sirah meriwayatkan bahwa Nabi ﷺ keluar melewati para pengepung, mengambil segenggam pasir dan menaburkannya ke atas kepala mereka sambil membaca awal Surah Yasin sampai ayat 9. Riwayat ini mursal (sanadnya terputus), jadi rinciannya tidak pasti; yang pasti, beliau keluar dengan selamat.",
        "Beliau menuju rumah Abu Bakar. Menurut kitab sirah, keduanya keluar lewat pintu kecil di belakang rumah, lalu berjalan ke selatan menuju Jabal Tsur, sekitar lima mil dari kota. Jalur ini berlawanan dengan arah Madinah di utara, sehingga tidak disangka para pengejar.",
        "Abu Bakar membawa seluruh hartanya yang tersisa, sekitar lima atau enam ribu dirham, untuk keperluan perjalanan. Sebuah hadits shahih juga mencatat Nabi ﷺ pernah berdiri di Al-Hazwarah, pasar Mekah, dan bersabda, \"Demi Allah, engkau adalah bumi Allah yang terbaik dan paling dicintai Allah. Seandainya aku tidak diusir darimu, aku tidak akan keluar.\""
      ],
      riwayat: [
        { derajat: "lemah", sumber: "Sirah Ibnu Hisyam (Ibnu Ishaq, dari Muhammad bin Ka'ab Al-Qurazhi): menaburkan pasir sambil membaca Yasin 1–9" },
        { derajat: "sirah", sumber: "Sirah Ibnu Hisyam; Ar-Rahiq Al-Makhtum: keluar lewat pintu belakang rumah Abu Bakar menuju Gua Tsur, arah selatan, sekitar lima mil", url: "https://usul.ai/t/the-sealed-nectar-with-additions/104" },
        { derajat: "sirah", sumber: "Sirah Ibnu Hisyam (Ibnu Ishaq, dari Asma'): Abu Bakar membawa lima atau enam ribu dirham" },
        { derajat: "shahih", sumber: "HR. Tirmidzi no. 3925 (Abdullah bin 'Adi bin Al-Hamra'); Tirmidzi: hasan shahih gharib", url: sn("tirmidhi", 3925),
          kutip: "Demi Allah, engkau adalah bumi Allah yang terbaik dan yang paling dicintai Allah." }
      ],
      ayat: [AYAT.yasin9],
      catatan: "Riwayat penaburan pasir datang dari Muhammad bin Ka'ab Al-Qurazhi, seorang tabi'in yang tidak menyaksikan peristiwa itu (mursal); karena itu ditandai lemah. Hadits Al-Hazwarah tidak menyebut kapan beliau mengucapkannya; sebagian penulis mengaitkannya dengan malam hijrah, sebagian dengan masa sesudahnya. Jarak \"sekitar lima mil\" mengikuti Ar-Rahiq; garis lurus dari Ka'bah ke puncak Jabal Tsur sekitar 5,5 km.",
      adegan: "Peta Mekah gelap. Cahaya berlabel \"Nabi ﷺ\" bergerak dari rumahnya melewati lingkaran pengepung yang diam tertunduk, menuju rumah Abu Bakar. Dua titik keluar dari pintu belakang, lalu garis putus-putus memanjang ke selatan menuju siluet Jabal Tsur, sementara panah \"Madinah\" di utara ditinggalkan. Teks: \"Ke selatan, bukan ke utara.\"" },

    { id: "tiga-malam", no: 11, fase: "gua", judul: "Tiga malam di Gua Tsur", arab: "غار ثور", peristiwa: "tsur",
      tahun: 622, tanggal: "Malam 27 Shafar sampai malam 1 Rabi'ul Awwal 1 H (±13–16 September 622 M)", urutWaktu: 622.7000,
      tempat: { kota: "mekah", id: "gua-tsur" },
      tokoh: ["nabi", "abubakar", "abdullahabubakar", "amirfuhairah", "asma", "abujahal", "abuquhafah"],
      ringkas: "Selama tiga malam Abdullah bin Abi Bakar membawa kabar dari Mekah, dan Amir bin Fuhairah membawa susu sambil menghapus jejak dengan kambing-kambingnya. Sementara itu Quraisy mengumumkan hadiah besar bagi siapa saja yang menangkap keduanya.",
      isi: [
        "Aisyah meriwayatkan: Abdullah bin Abi Bakar, pemuda yang cerdas dan cepat paham, bermalam bersama mereka di gua. Sebelum fajar ia kembali ke Mekah sehingga pagi harinya ia tampak berada di tengah Quraisy seperti orang yang bermalam di kota. Setiap rencana Quraisy yang ia dengar, ia bawa ke gua ketika hari mulai gelap.",
        "Amir bin Fuhairah, bekas budak yang dimerdekakan Abu Bakar, menggembalakan kambing di dekat gua. Selepas sebagian malam ia membawa kambing-kambing itu kepada mereka sehingga keduanya bisa minum susu segar, lalu menggiringnya pergi sebelum fajar. Menurut kitab sirah, kambing-kambing itu juga sengaja dilewatkan di atas jejak Abdullah agar jejaknya terhapus.",
        "Di Mekah, Quraisy menjaga jalan-jalan dan mengumumkan hadiah: bagi siapa yang membawa Nabi ﷺ atau Abu Bakar, hidup atau mati, diberikan diyat masing-masing, yaitu seratus ekor unta. Abu Jahal datang ke rumah Abu Bakar dan bertanya kepada Asma' di mana ayahnya. Ketika Asma' menjawab tidak tahu, Abu Jahal menamparnya.",
        "Kakek Asma', Abu Quhafah, yang sudah buta dan belum masuk Islam, khawatir Abu Bakar membawa semua hartanya. Asma' menaruh batu-batu di ceruk tempat ayahnya biasa menyimpan uang, menutupnya dengan kain, lalu menuntun tangan kakeknya untuk merabanya. Abu Quhafah pun tenang. Asma' berkata, ayahnya sebenarnya tidak meninggalkan apa pun; ia hanya ingin menenangkan orang tua itu."
      ],
      riwayat: [
        { derajat: "shahih", sumber: "HR. Bukhari no. 3905 (Aisyah)", url: sn("bukhari", 3905),
          kutip: "Abdullah bin Abi Bakar bermalam bersama keduanya, lalu pergi sebelum fajar, sehingga pagi harinya ia bersama Quraisy di Mekah seperti orang yang bermalam di sana." },
        { derajat: "shahih", sumber: "HR. Bukhari no. 3906 (Suraqah bin Malik)", url: sn("bukhari", 3906),
          kutip: "Utusan kafir Quraisy datang kepada kami, menetapkan diyat untuk masing-masing dari keduanya bagi siapa yang membunuh atau menawan mereka." },
        { derajat: "sirah", sumber: "Sirah Ibnu Hisyam (Ibnu Ishaq); Ar-Rahiq Al-Makhtum: hadiah seratus unta untuk masing-masing, Amir menghapus jejak, Abu Jahal menampar Asma', Asma' dan Abu Quhafah", url: "https://usul.ai/t/the-sealed-nectar-with-additions/105" }
      ],
      catatan: "Riwayat Bukhari menyebut \"diyat\" tanpa angka; Ibnu Ishaq dan Ar-Rahiq menjelaskannya sebagai seratus unta untuk masing-masing. Ar-Rahiq menyebut tiga malam itu adalah malam Jumat, malam Sabtu, dan malam Ahad. Kitab sirah juga menyebut Asma' mengantar makanan ke gua.",
      adegan: "Mulut gua kecil di lereng Jabal Tsur, dilihat dari luar di malam hari. Animasi berulang tiga kali (penanda \"Malam 1, 2, 3\"): Abdullah mendaki membawa kabar, Amir menggiring kambing yang langkahnya menghapus jejak kaki di pasir, lalu keduanya turun sebelum fajar. Panel kecil Mekah: penyeru di dekat Ka'bah dan angka \"100 unta\"." },

    { id: "laa-tahzan", no: 12, fase: "gua", judul: "\"Jangan bersedih, Allah bersama kita\"", arab: "لا تحزن إن الله معنا", peristiwa: "tsur",
      tahun: 622, tanggal: "Salah satu hari di gua (±13–15 September 622 M)", urutWaktu: 622.7030,
      tempat: { kota: "mekah", id: "gua-tsur" },
      tokoh: ["nabi", "abubakar"],
      ringkas: "Para pengejar sampai di mulut gua. Abu Bakar berbisik bahwa mereka akan terlihat bila salah seorang menunduk. Nabi ﷺ menjawab, \"Apa pendapatmu tentang dua orang yang Allah adalah yang ketiganya?\"",
      isi: [
        "Para pencari jejak Quraisy mengikuti tanda-tanda sampai ke Jabal Tsur. Dari dalam gua, Abu Bakar melihat kaki-kaki mereka tepat di atas.",
        "Abu Bakar menceritakan: \"Aku berkata kepada Nabi ﷺ ketika kami di dalam gua: Seandainya salah seorang dari mereka melihat ke bawah kakinya, tentu ia akan melihat kita.\" Beliau bersabda, \"Apa pendapatmu, wahai Abu Bakar, tentang dua orang yang Allah adalah yang ketiganya?\"",
        "Al-Qur'an mengabadikan saat itu dalam QS. At-Taubah: 40: ketika ia berkata kepada sahabatnya, \"Jangan bersedih, sesungguhnya Allah bersama kita.\" Allah menurunkan ketenangan dan menolong dengan bala tentara yang tidak terlihat. Para pengejar pun berbalik tanpa menemukan mereka."
      ],
      riwayat: [
        { derajat: "shahih", sumber: "HR. Bukhari no. 3653 (Anas, dari Abu Bakar)", url: sn("bukhari", 3653),
          kutip: "Apa pendapatmu, wahai Abu Bakar, tentang dua orang yang Allah adalah yang ketiganya?" },
        { derajat: "shahih", sumber: "HR. Muslim no. 2381 (Anas, dari Abu Bakar)", url: sn("muslim", 2381) }
      ],
      ayat: [AYAT.taubah40],
      catatan: "Surah At-Taubah turun belakangan (sekitar 9 H); ayat 40 mengenang peristiwa di gua ini. Hadits tidak menyebut pada hari keberapa para pengejar datang.",
      adegan: "Potongan melintang gunung: di atas, deretan kaki pengejar (siluet) berjalan bolak-balik di mulut gua; di bawah, di dalam gua, Abu Bakar (chibi) menahan napas di samping cahaya berlabel \"Nabi ﷺ\". Teks muncul lembut: \"Laa tahzan, innallaha ma'ana.\" Cahaya hangat memenuhi gua, lalu kaki-kaki di atas berbalik menjauh." },

    { id: "laba-laba-merpati", no: 13, fase: "gua", judul: "Laba-laba, merpati, dan kisah-kisah gua yang masyhur", arab: "العنكبوت والحمامتان",
      tahun: 622, tanggal: "Saat bersembunyi di gua (±13–15 September 622 M)", urutWaktu: 622.7040,
      tempat: { kota: "mekah", id: "gua-tsur" },
      tokoh: ["nabi", "abubakar"],
      ringkas: "Kisah sarang laba-laba dan sepasang merpati di mulut gua sangat terkenal, tetapi sanadnya lemah atau diperselisihkan. Al-Qur'an dan hadits shahih hanya menyebut Allah melindungi keduanya dengan cara yang tidak terlihat.",
      isi: [
        "Dalam tafsir Ibnu Abbas tentang QS. Al-Anfal: 30 disebutkan bahwa para pengejar melihat sarang laba-laba di mulut gua dan berkata, \"Seandainya ia masuk ke sini, tentu tidak ada sarang laba-laba di mulutnya.\" Sanad riwayat ini dinilai hasan oleh Ibnu Hajar dan Ibnu Katsir, tetapi lemah menurut Al-Albani dan para pentahqiq Musnad.",
        "Kisah sebatang pohon yang tumbuh di depan gua dan sepasang merpati liar yang bersarang di sana diriwayatkan Al-Bazzar dan Ath-Thabarani melalui Abu Mush'ab Al-Makki. Al-Haitsami berkata sanadnya memuat sekelompok perawi yang tidak ia kenal, Ibnu Katsir menyebutnya sangat gharib, dan Al-Albani menilainya lemah.",
        "Kisah lain menyebut Abu Bakar masuk lebih dulu untuk membersihkan gua dan menutup lubang-lubangnya dengan kainnya, lalu kakinya tersengat tetapi ia tidak bergerak agar Nabi ﷺ tidak terbangun. Kisah ini dimuat sebagian kitab sirah, termasuk Ar-Rahiq, tetapi tidak terdapat dalam kitab hadits shahih.",
        "Yang pasti menurut Al-Qur'an (QS. At-Taubah: 40) serta Shahih Bukhari dan Muslim: keduanya bersembunyi di gua, para pengejar sampai sangat dekat, dan Allah melindungi mereka. Kisah-kisah di atas boleh diceritakan dengan menyebut derajatnya, bukan sebagai kepastian."
      ],
      riwayat: [
        { derajat: "lemah", sumber: "HR. Ahmad no. 3251 (Ibnu Abbas): sarang laba-laba di mulut gua", url: U.ahmad3251,
          kutip: "Seandainya ia masuk ke sini, tentu tidak ada sarang laba-laba di mulutnya." },
        { derajat: "lemah", sumber: "Al-Bazzar dan Ath-Thabarani (Al-Mu'jam Al-Kabir), dari Abu Mush'ab Al-Makki; dinilai Al-Haitsami dalam Majma' Az-Zawa'id: pohon dan dua merpati", url: U.majma9904 },
        { derajat: "lemah", sumber: "IslamQA no. 27224: tidak ada hadits shahih tentang laba-laba dan merpati di gua (mengutip Al-Albani dan Ibnu Katsir)", url: U.qa27224 },
        { derajat: "lemah", sumber: "Ar-Rahiq Al-Makhtum dan sebagian kitab sirah: Abu Bakar membersihkan gua dan tersengat", url: "https://usul.ai/t/the-sealed-nectar-with-additions/104" }
      ],
      catatan: "Ketiga kisah ini ditandai lemah. Riwayat laba-laba diperselisihkan (hasan menurut Ibnu Hajar dan Ibnu Katsir, lemah menurut Al-Albani); riwayat pohon dan merpati lebih lemah karena perawinya tidak dikenal; kisah sengatan tidak kami temukan dengan sanad yang shahih. Nomor Ahmad 3251 mengikuti penomoran hadithunlocked; IslamQA menyebutnya no. 3241.",
      adegan: "Adegan bergaya buku cerita berbingkai \"Riwayat lemah\": benang laba-laba terjalin di mulut gua dan sepasang merpati hinggap. Lalu bingkai berganti menjadi \"Yang pasti (QS. At-Taubah: 40)\": mulut gua yang sama tanpa hiasan, hanya diselimuti cahaya ketenangan." },

    { id: "berangkat-pantai", no: 14, fase: "perjalanan", judul: "Berangkat lewat jalan pantai", arab: "طريق الساحل",
      tahun: 622, tanggal: "Malam Senin, 1 Rabi'ul Awwal 1 H (±16 September 622 M) menurut Ar-Rahiq", urutWaktu: 622.7080,
      tempat: { kota: "mekah", id: "gua-tsur" },
      tokoh: ["nabi", "abubakar", "amirfuhairah", "uraiqith"],
      ringkas: "Setelah tiga malam, pemandu sewaan Abdullah bin Uraiqith datang membawa unta. Rombongan empat orang turun ke Mekah bagian bawah lalu menyusuri jalan pantai, menjauhi jalan biasa ke Madinah.",
      isi: [
        "Nabi ﷺ dan Abu Bakar telah menyewa seorang penunjuk jalan yang sangat mahir dari Bani Ad-Dil. Ia masih memeluk agama kaum Quraisy dan terikat sumpah setia dengan keluarga Al-'Ash bin Wa'il, tetapi keduanya memercayainya. Mereka menitipkan unta kepadanya dan berjanji bertemu di Gua Tsur setelah tiga malam. Kitab sirah menyebut namanya Abdullah bin Uraiqith.",
        "Pada pagi hari ketiga ia datang membawa unta. Berangkatlah mereka berempat: Nabi ﷺ, Abu Bakar, Amir bin Fuhairah, dan sang pemandu. Ia membawa mereka lewat bagian bawah Mekah, lalu menyusuri jalan pantai.",
        "Abu Bakar bercerita: mereka berjalan semalaman dan esoknya sampai tengah hari, ketika jalan sepi. Tampak sebuah batu tinggi yang masih menyisakan naungan. Abu Bakar meratakan tanah di situ, menghamparkan alas, dan mempersilakan Nabi ﷺ tidur sementara ia berjaga. Datang seorang penggembala; Abu Bakar meminta susu, menyuruhnya membersihkan ambing kambing dari debu, lalu mendinginkan susu itu dengan air. Ketika Nabi ﷺ bangun, beliau minum sampai Abu Bakar merasa senang, lalu bertanya, \"Bukankah sudah tiba waktunya berangkat?\"",
        "Di sepanjang jalan, orang yang mengenal Abu Bakar bertanya siapa lelaki yang bersamanya. Abu Bakar menjawab, \"Ia menunjukiku jalan.\" Orang mengira yang dimaksud jalan biasa, padahal maksudnya jalan kebaikan."
      ],
      riwayat: [
        { derajat: "shahih", sumber: "HR. Bukhari no. 2263 (Aisyah)", url: sn("bukhari", 2263),
          kutip: "Keduanya menyewa seorang lelaki dari Bani Ad-Dil sebagai penunjuk jalan yang mahir, padahal ia masih memeluk agama kafir Quraisy." },
        { derajat: "shahih", sumber: "HR. Bukhari no. 3905 (Aisyah): pemandu datang pada pagi hari ketiga, lalu membawa mereka lewat jalan pantai", url: sn("bukhari", 3905) },
        { derajat: "shahih", sumber: "HR. Bukhari no. 3615 (Al-Bara', dari Abu Bakar)", url: sn("bukhari", 3615),
          kutip: "Kami berjalan semalaman dan siangnya sampai tengah hari, ketika jalan sepi dan tidak ada seorang pun yang lewat." },
        { derajat: "shahih", sumber: "HR. Bukhari no. 3911 (Anas)", url: sn("bukhari", 3911), kutip: "Lelaki ini menunjukiku jalan." },
        { derajat: "sirah", sumber: "Sirah Ibnu Hisyam; Ar-Rahiq Al-Makhtum: nama Abdullah bin Uraiqith dan tanggal malam 1 Rabi'ul Awwal", url: "https://usul.ai/t/the-sealed-nectar-with-additions/106" }
      ],
      catatan: "Riwayat Bukhari tidak menyebut nama pemandu; nama Abdullah bin Uraiqith (atau Arqath) dari kitab sirah. Bukhari 3905 menyebut pemandu datang \"pada pagi hari ketiga\", sedangkan Ar-Rahiq menyebut malam Senin, 1 Rabi'ul Awwal 1 H (16 September 622 M); keduanya berarti setelah tiga malam di gua. Padanan Masehi adalah perkiraan.",
      adegan: "Pagi di kaki Jabal Tsur: pemandu (chibi) datang menuntun unta. Empat sosok berangkat; peta wilayah memperbesar garis rute yang turun ke barat lalu menyusuri garis pantai Laut Merah. Siang: batu tinggi dengan naungan, Abu Bakar menghampar alas, penggembala datang membawa kambing, dan semangkuk susu disodorkan kepada cahaya berlabel \"Nabi ﷺ\"." },

    { id: "suraqah", no: 15, fase: "perjalanan", judul: "Suraqah bin Malik mengejar", arab: "سراقة بن مالك",
      tahun: 622, tanggal: "Beberapa hari setelah meninggalkan gua, awal Rabi'ul Awwal 1 H (±16–19 September 622 M)", urutWaktu: 622.7110,
      tempat: { lat: 22.42, lon: 39.20, nama: "Pesisir dekat Qudaid, wilayah Bani Mudlij (perkiraan)" },
      tokoh: ["suraqah", "nabi", "abubakar", "amirfuhairah"],
      ringkas: "Tergiur hadiah Quraisy, Suraqah bin Malik memacu kudanya mengejar rombongan. Kaki kudanya terbenam ke tanah, dan ia akhirnya meminta surat jaminan keamanan.",
      isi: [
        "Suraqah bin Malik dari Bani Mudlij sedang duduk bersama kaumnya ketika seseorang berkata, \"Aku melihat beberapa sosok di pantai; kurasa itu Muhammad dan sahabat-sahabatnya.\" Suraqah tahu itu benar, tetapi ia berkata itu orang lain, karena ingin hadiahnya untuk dirinya sendiri. Diam-diam ia menyuruh budaknya membawa kuda ke balik bukit kecil, lalu keluar lewat belakang rumah dengan ujung tombak direndahkan agar tidak terlihat.",
        "Kudanya tersandung dan ia jatuh. Ia mengundi dengan anak panah ramalan, kebiasaan jahiliyah, dan hasilnya tidak sesuai keinginannya, tetapi ia tetap melanjutkan. Ketika sudah begitu dekat sampai mendengar bacaan Al-Qur'an Nabi ﷺ, yang tidak menoleh, sedangkan Abu Bakar sering menoleh, kaki depan kudanya terbenam ke tanah sampai lutut. Debu membubung seperti asap.",
        "Abu Bakar cemas, dan Nabi ﷺ menenangkannya: \"Jangan bersedih, Allah bersama kita.\" Suraqah lalu berseru meminta keamanan. Ia menceritakan hadiah yang dijanjikan Quraisy dan menawarkan bekal, tetapi keduanya tidak mengambil apa pun. Nabi ﷺ hanya meminta, \"Rahasiakan tentang kami.\" Suraqah meminta surat jaminan keamanan, dan Amir bin Fuhairah menuliskannya pada sepotong kulit.",
        "Suraqah menepati janjinya: setiap pencari yang ia temui ia suruh pulang, dengan alasan ia sudah memeriksa arah itu. Anas berkata, di awal hari ia memburu Nabi ﷺ, di akhir hari ia menjadi pelindung beliau. Bertahun-tahun kemudian, di Ji'ranah sepulang dari Thaif, Suraqah datang membawa surat itu; Nabi ﷺ menyambutnya, dan ia masuk Islam."
      ],
      riwayat: [
        { derajat: "shahih", sumber: "HR. Bukhari no. 3906 (Suraqah bin Malik)", url: sn("bukhari", 3906),
          kutip: "Aku memintanya menuliskan surat jaminan keamanan, maka beliau menyuruh Amir bin Fuhairah, dan ia menuliskannya pada sepotong kulit." },
        { derajat: "shahih", sumber: "HR. Bukhari no. 3615 (Al-Bara', dari Abu Bakar)", url: sn("bukhari", 3615), kutip: "Jangan bersedih, sesungguhnya Allah bersama kita." },
        { derajat: "shahih", sumber: "HR. Bukhari no. 3911 (Anas)", url: sn("bukhari", 3911),
          kutip: "Di awal hari ia memburu Nabi Allah ﷺ, dan di akhir hari ia menjadi pelindung beliau." },
        { derajat: "shahih", sumber: "Ibnu Hajar, Al-Mathalib Al-'Aliyah no. 2040 (Suraqah, melalui Az-Zuhri): Suraqah menunjukkan surat itu di Ji'ranah; sanadnya dinilai shahih", url: U.mathalib2040 },
        { derajat: "lemah", sumber: "Al-Baihaqi, As-Sunan Al-Kubra (dari Al-Hasan): Umar memakaikan gelang Kisra kepada Suraqah", url: U.baihaqi13036 }
      ],
      catatan: "Kisah terkenal bahwa Nabi ﷺ saat itu menjanjikan Suraqah akan memakai gelang Kisra tidak terdapat dalam riwayat Bukhari tentang Suraqah. Riwayat Umar memakaikan gelang Kisra kepadanya setelah penaklukan Persia datang dari Al-Hasan, tabi'in yang tidak menyaksikannya, dan dinilai lemah. Waktu pengejaran tidak disebut dalam hadits; Bukhari 3615 mengisahkannya setelah istirahat siang, sedangkan Ar-Rahiq (mengutip Zad Al-Ma'ad) menyebut kemungkinan hari ketiga perjalanan. Tempatnya perkiraan.",
      adegan: "Peta pesisir dari atas: debu kuda Suraqah melesat mengejar empat titik. Saat jarak dekat, kaki kuda terbenam dan pasir naik seperti asap; Suraqah jatuh tanpa luka. Ia mengangkat tangan meminta aman. Amir menulis di sepotong kulit, muncul teks \"Surat jaminan keamanan\". Suraqah berbalik dan melambai menyuruh pengejar lain pulang." },

    { id: "ummu-mabad", no: 16, fase: "perjalanan", judul: "Kemah Ummu Ma'bad", arab: "خيمة أم معبد",
      tahun: 622, tanggal: "Dalam perjalanan, awal Rabi'ul Awwal 1 H (±September 622 M)", urutWaktu: 622.7130,
      tempat: { lat: 22.38, lon: 39.24, nama: "Qudaid, kemah Ummu Ma'bad (perkiraan)" },
      tokoh: ["ummumabad", "nabi", "abubakar", "amirfuhairah", "uraiqith"],
      ringkas: "Rombongan singgah di kemah Ummu Ma'bad dari Khuza'ah. Ia tidak punya makanan; hanya ada seekor kambing kurus. Menurut riwayat yang masyhur, kambing itu mengeluarkan susu yang melimpah.",
      isi: [
        "Kitab sirah mengisahkan rombongan melewati kemah Ummu Ma'bad Al-Khuza'iyyah, perempuan yang biasa memberi minum dan makan kepada musafir di depan kemahnya. Mereka ingin membeli daging atau kurma, tetapi musim sedang kering dan ia tidak punya apa-apa.",
        "Di sudut kemah ada seekor kambing yang terlalu lemah untuk ikut kawanan ke padang. Nabi ﷺ meminta izin memerahnya, menyebut nama Allah dan berdoa, lalu kambing itu mengeluarkan susu yang banyak. Semua minum sampai puas, lalu beliau memerah lagi dan meninggalkan satu bejana penuh untuk tuan rumah.",
        "Sore harinya suaminya, Abu Ma'bad, pulang menggiring kambing-kambing kurus dan heran melihat susu itu. Ummu Ma'bad menceritakan tamu yang penuh berkah tadi. Abu Ma'bad berkata, \"Demi Allah, inilah orang Quraisy yang sedang dicari-cari itu.\""
      ],
      riwayat: [
        { derajat: "lemah", sumber: "Al-Hakim, Al-Mustadrak; Ibnu Sa'd, Ath-Thabaqat; Ath-Thabarani (dari Hubaisy bin Khalid, saudara Ummu Ma'bad)" },
        { derajat: "sirah", sumber: "Ibnu Katsir, Al-Bidayah wan Nihayah 3/190: kisahnya masyhur, diriwayatkan dari jalur-jalur yang saling menguatkan", url: U.bidayahUmmuMabad }
      ],
      catatan: "Derajat kisah ini diperselisihkan: tiap sanadnya dipersoalkan, tetapi Ibnu Katsir menyebutnya masyhur dengan jalur-jalur yang saling menguatkan. Karena itu riwayat hadits-nya ditandai lemah (diperselisihkan). Dalam riwayat ini Ummu Ma'bad juga menggambarkan rupa Nabi ﷺ kepada suaminya; aplikasi ini sengaja tidak menampilkan gambaran fisik beliau. Letak kemah di Qudaid mengikuti sebagian kitab sirah.",
      adegan: "Kemah sederhana di padang kering; Ummu Ma'bad (chibi) menggeleng: tidak ada makanan. Seekor kambing kurus di sudut. Cahaya berlabel \"Nabi ﷺ\" mendekat; bejana kosong perlahan terisi susu. Label kecil di pojok: \"Riwayat diperselisihkan\"." },

    { id: "buraidah", no: 17, fase: "perjalanan", judul: "Buraidah Al-Aslami dan kaumnya", arab: "بريدة الأسلمي",
      tahun: 622, tanggal: "Dalam perjalanan, awal Rabi'ul Awwal 1 H (±September 622 M)", urutWaktu: 622.7150,
      tempat: { lat: 22.00, lon: 39.30, nama: "Al-Ghamim, kawasan 'Usfan (perkiraan)" },
      tokoh: ["buraidah", "nabi", "abubakar"],
      ringkas: "Kitab biografi sahabat mencatat Buraidah bin Al-Hushaib dari Bani Aslam masuk Islam ketika Nabi ﷺ melewatinya dalam perjalanan hijrah. Kisah tambahan bahwa ia datang memburu hadiah lalu mengikat serbannya di tombak tidak memiliki sanad yang kuat.",
      isi: [
        "Ibnu Mandah dalam kitab biografi sahabat mencatat bahwa Buraidah bin Al-Hushaib Al-Aslami masuk Islam ketika Nabi ﷺ melewatinya dalam hijrah, di Al-Ghamim. Ia lalu tinggal bersama kaumnya dan baru datang ke Madinah setelah Badar dan Uhud.",
        "Kitab sejarah yang lebih belakangan menambahkan kisah: Buraidah keluar bersama sekitar tujuh puluh penunggang dari kaumnya karena tergiur hadiah Quraisy. Setelah berbicara dengan Nabi ﷺ, mereka masuk Islam. Buraidah lalu mengikat serbannya pada tombak dan berjalan di depan beliau seperti pembawa panji.",
        "Kisah tambahan ini tidak terdapat dalam kitab hadits shahih, dan kami belum menemukan penilaian yang menguatkan sanadnya, sehingga ditandai lemah. Buraidah sendiri kemudian menjadi sahabat terkemuka dan wafat di Marw, Khurasan, sekitar 62–63 H."
      ],
      riwayat: [
        { derajat: "sirah", sumber: "Ibnu Mandah, Ma'rifat Ash-Shahabah: Buraidah masuk Islam ketika Nabi ﷺ melewatinya saat hijrah di Al-Ghamim", url: U.buraidah },
        { derajat: "lemah", sumber: "Ibnu Asakir, Tarikh Dimasyq (diringkas Ibnu Manzhur); dikutip Zad Al-Ma'ad dan Ar-Rahiq Al-Makhtum: tujuh puluh penunggang dan serban di ujung tombak", url: U.rahiqQuba }
      ],
      catatan: "Urutan di sini mengikuti Ar-Rahiq, yang menyebut kisah Buraidah setelah Suraqah dan Ummu Ma'bad. Namun jika Al-Ghamim yang dimaksud adalah Kura' Al-Ghamim di sekitar 'Usfan, pertemuan ini mungkin terjadi lebih awal dalam perjalanan. Titik di peta perkiraan.",
      adegan: "Padang terbuka: sekelompok penunggang Bani Aslam (siluet chibi) mendekat dengan kepulan debu, lalu berhenti, turun, dan berkumpul. Seorang mengikat kain di ujung tombak dan berjalan di depan rombongan. Label: \"Kisah tambahan: sanad lemah\"." },

    { id: "zubair", no: 18, fase: "perjalanan", judul: "Pakaian putih dari Az-Zubair", arab: "الزبير بن العوام",
      tahun: 622, tanggal: "Menjelang Madinah, awal Rabi'ul Awwal 1 H (±September 622 M)", urutWaktu: 622.7190,
      tempat: { lat: 23.80, lon: 39.20, nama: "Jalan kafilah sebelum Madinah (tempat tidak disebut; perkiraan)" },
      tokoh: ["zubair", "nabi", "abubakar"],
      ringkas: "Di tengah jalan rombongan bertemu kafilah dagang kaum muslimin yang pulang dari Syam. Az-Zubair bin Al-Awwam memberi Nabi ﷺ dan Abu Bakar pakaian putih.",
      isi: [
        "Urwah bin Az-Zubair meriwayatkan bahwa Rasulullah ﷺ bertemu Az-Zubair bersama rombongan pedagang muslim yang sedang pulang dari Syam. Az-Zubair memberi Rasulullah ﷺ dan Abu Bakar pakaian putih.",
        "Az-Zubair bin Al-Awwam adalah sepupu Nabi ﷺ, putra bibi beliau Shafiyyah, dan suami Asma' binti Abu Bakar. Pertemuan ini menunjukkan kaum muslimin Madinah masih berdagang di jalur Syam, dan rombongan hijrah kini sudah dekat dengan tujuan."
      ],
      riwayat: [
        { derajat: "shahih", sumber: "HR. Bukhari no. 3906 (Urwah bin Az-Zubair)", url: sn("bukhari", 3906),
          kutip: "Rasulullah ﷺ bertemu Az-Zubair dalam rombongan pedagang muslim yang pulang dari Syam, lalu Az-Zubair memberi Rasulullah ﷺ dan Abu Bakar pakaian putih." }
      ],
      catatan: "Bagian ini diriwayatkan Urwah, putra Az-Zubair, seorang tabi'in, dalam Shahih Bukhari. Tempat pertemuannya tidak disebut; titik di peta hanya perkiraan di jalur kafilah sebelum Madinah. Aplikasi ini tidak menggambarkan pakaian Nabi ﷺ; adegan cukup menampilkan penyerahan hadiah.",
      adegan: "Dua rombongan berpapasan di jalan berbatu. Dari kafilah dagang yang membawa muatan dari Syam, Az-Zubair (chibi) turun dan menyerahkan lipatan kain putih kepada Abu Bakar dan kepada cahaya berlabel \"Nabi ﷺ\". Kedua rombongan berpisah ke arah berlawanan." },

    { id: "tiba-quba", no: 19, fase: "quba", judul: "Penantian di harrah dan tiba di Quba", arab: "الوصول إلى قباء", peristiwa: "hijrah",
      tahun: 622, tanggal: "Senin, 8 Rabi'ul Awwal 1 H (±23 September 622 M) menurut Ar-Rahiq; Senin, 12 Rabi'ul Awwal menurut Ibnu Ishaq", urutWaktu: 622.7270,
      tempat: { kota: "madinah", id: "rumah-kultsum" },
      tokoh: ["nabi", "abubakar", "kultsum"],
      ringkas: "Setiap pagi kaum muslimin Madinah menunggu di harrah sampai terik memaksa mereka pulang. Suatu siang seorang Yahudi dari atas bentengnya berseru bahwa yang ditunggu telah tiba. Nabi ﷺ singgah di Quba, perkampungan Bani Amr bin Auf.",
      isi: [
        "Kaum muslimin Madinah sudah mendengar Nabi ﷺ keluar dari Mekah. Setiap pagi mereka pergi ke harrah, padang batu hitam di tepi kota, dan menunggu sampai panas tengah hari memaksa mereka pulang. Suatu hari, setelah lama menunggu, mereka baru saja kembali ke rumah.",
        "Seorang Yahudi yang naik ke atas salah satu benteng (uthum) melihat rombongan itu muncul dari balik fatamorgana. Ia tak tahan untuk berseru, \"Wahai orang-orang Arab, inilah orang besar kalian yang kalian tunggu!\" Kaum muslimin bergegas mengambil senjata dan menyambut beliau di tepi harrah. Beliau berbelok ke kanan bersama mereka dan singgah di Bani Amr bin Auf, pada hari Senin di bulan Rabi'ul Awwal.",
        "Abu Bakar berdiri menyambut orang-orang, sedangkan Nabi ﷺ duduk diam. Kaum Anshar yang belum pernah melihat beliau menyalami Abu Bakar. Ketika matahari mengenai Nabi ﷺ, Abu Bakar menaunginya dengan selendangnya; saat itulah orang-orang tahu siapa Rasulullah ﷺ.",
        "Menurut kitab sirah, Nabi ﷺ menginap di rumah Kultsum bin Al-Hidm, sesepuh Bani Amr bin Auf, sedangkan Abu Bakar singgah di rumah Khubaib bin Isaf di As-Sunh."
      ],
      riwayat: [
        { derajat: "shahih", sumber: "HR. Bukhari no. 3906 (Urwah bin Az-Zubair)", url: sn("bukhari", 3906),
          kutip: "Wahai orang-orang Arab, inilah orang besar kalian yang kalian tunggu!" },
        { derajat: "sirah", sumber: "Sirah Ibnu Hisyam (Ibnu Ishaq): tiba di Quba hari Senin 12 Rabi'ul Awwal menjelang tengah hari; rumah Kultsum bin Al-Hidm; Abu Bakar di rumah Khubaib bin Isaf" },
        { derajat: "sirah", sumber: "Ar-Rahiq Al-Makhtum: Senin, 8 Rabi'ul Awwal tahun ke-14 kenabian (23 September 622 M), tengah hari", url: U.rahiqQuba }
      ],
      catatan: "Tanggal kedatangan diperselisihkan. Bukhari 3906 hanya menyebut hari Senin di bulan Rabi'ul Awwal. Ibnu Ishaq menyebut 12 Rabi'ul Awwal, sedangkan Ar-Rahiq Al-Makhtum memilih 8 Rabi'ul Awwal (23 September 622 M) dan menempatkan tanggal 12 pada hari Jumat ketika beliau meninggalkan Quba. Aplikasi ini mengikuti Ar-Rahiq untuk urutan waktu. Sebagai pendukung (bukan bukti, karena kalender saat itu berdasarkan pengamatan hilal): menurut kalender hijriah tabular, 8 Rabi'ul Awwal 1 H jatuh pada hari Senin (20 September 622 kalender Julian, sama dengan 23 September Gregorian), sedangkan 12 Rabi'ul Awwal jatuh pada hari Jumat. Sebagian riwayat menyebut beliau singgah di rumah Sa'ad bin Khaitsamah, bukan Kultsum.",
      adegan: "Siang terik di tepi harrah hitam: kerumunan kecil Anshar menunggu, lalu pulang satu per satu sementara bayangan matahari bergeser. Dari atas benteng, sosok Yahudi menunjuk ke cakrawala; fatamorgana bergetar dan rombongan muncul. Orang-orang berlari menyambut. Di Quba, Abu Bakar berdiri menyalami; saat sinar matahari jatuh, ia membentangkan selendang menaungi cahaya berlabel \"Nabi ﷺ\"." },

    { id: "masjid-quba", no: 20, fase: "quba", judul: "Masjid Quba, didirikan atas dasar takwa", arab: "مسجد قباء",
      tahun: 622, tanggal: "Selama tinggal di Quba, Rabi'ul Awwal 1 H (±September 622 M)", urutWaktu: 622.7280,
      tempat: { kota: "madinah", id: "masjid-quba" },
      tokoh: ["nabi", "abubakar"],
      ringkas: "Selama tinggal di Bani Amr bin Auf, Nabi ﷺ mendirikan Masjid Quba, masjid pertama yang beliau bangun setelah hijrah.",
      isi: [
        "Urwah meriwayatkan bahwa Rasulullah ﷺ tinggal di Bani Amr bin Auf lebih dari sepuluh malam dan mendirikan masjid yang didasarkan atas takwa, lalu shalat di dalamnya. Inilah Masjid Quba.",
        "QS. At-Taubah: 108 memuji masjid yang didirikan atas dasar takwa sejak hari pertama, yang di dalamnya ada orang-orang yang suka menyucikan diri. Abu Hurairah meriwayatkan bahwa ayat ini turun tentang penduduk Quba, yang terbiasa bersuci dengan air.",
        "Ulama berbeda pendapat tentang masjid yang dimaksud ayat ini. Dalam riwayat Muslim, Nabi ﷺ menunjuk masjid beliau di Madinah sebagai masjid yang didirikan atas takwa. Sebagian ulama memadukan keduanya: ayat ini berkaitan dengan Quba, dan Masjid Nabawi lebih utama lagi menyandang sifat itu."
      ],
      riwayat: [
        { derajat: "shahih", sumber: "HR. Bukhari no. 3906 (Urwah bin Az-Zubair)", url: sn("bukhari", 3906),
          kutip: "Beliau tinggal di Bani Amr bin Auf lebih dari sepuluh malam dan mendirikan masjid yang didasarkan atas takwa." },
        { derajat: "shahih", sumber: "HR. Abu Dawud no. 44 (Abu Hurairah); dishahihkan Al-Albani", url: sn("abudawud", 44),
          kutip: "Ayat ini turun tentang penduduk Quba." },
        { derajat: "shahih", sumber: "HR. Muslim no. 1398 (Abu Sa'id Al-Khudri)", url: sn("muslim", 1398), kutip: "Itulah masjid kalian ini (masjid Madinah)." }
      ],
      ayat: [AYAT.taubah108],
      catatan: "Lama tinggal di Quba diperselisihkan: Ibnu Ishaq menyebut empat hari (Senin–Kamis), Bukhari 3906 menyebut \"lebih dari sepuluh malam\" (bidh'a 'asyrata lailah), dan Anas dalam HR. Bukhari no. 428 menyebut empat belas malam. Ibnul Qayyim memilih empat belas malam, Ar-Rahiq memilih empat hari. Surah At-Taubah turun belakangan (sekitar 9 H).",
      adegan: "Tanah lapang di Quba di antara kebun kurma. Sosok-sosok chibi mengangkut batu dan pelepah; dinding rendah tumbuh dari fondasi. Cahaya berlabel \"Nabi ﷺ\" di tengah barisan, dan teks QS. At-Taubah: 108 muncul di langit." },

    { id: "menyusul-quba", no: 21, fase: "quba", judul: "Yang menyusul ke Quba: Ali dan Shuhaib", arab: "ربح البيع",
      tahun: 622, tanggal: "Selama Nabi ﷺ di Quba, Rabi'ul Awwal 1 H (±September 622 M)", urutWaktu: 622.7290,
      tempat: { kota: "madinah", id: "rumah-kultsum" },
      tokoh: ["ali", "suhaib", "nabi"],
      ringkas: "Ali tiba di Quba setelah tiga hari mengembalikan titipan orang di Mekah. Shuhaib Ar-Rumi juga menyusul setelah menyerahkan hartanya kepada Quraisy, dan Nabi ﷺ menyambutnya: \"Beruntunglah jual belimu.\"",
      isi: [
        "Ali bin Abi Thalib tinggal di Mekah tiga hari untuk mengembalikan barang-barang titipan yang ada pada Nabi ﷺ kepada para pemiliknya. Setelah itu ia menyusul dan bertemu Nabi ﷺ di Quba, lalu tinggal bersama beliau di rumah Kultsum bin Al-Hidm.",
        "Shuhaib Ar-Rumi, sahabat yang dulu datang ke Mekah tanpa harta lalu menjadi kaya, dihadang orang Quraisy ketika hendak hijrah: \"Engkau datang kepada kami dalam keadaan miskin, lalu menjadi kaya di tengah kami. Kini engkau mau pergi membawa dirimu dan hartamu?\" Shuhaib bertanya, \"Kalau kuberikan hartaku, kalian akan membiarkanku pergi?\" Mereka setuju, dan ia menunjukkan tempat hartanya.",
        "Shuhaib sampai di Quba saat Nabi ﷺ masih di sana. Beliau bersabda, \"Beruntunglah jual belimu, wahai Abu Yahya.\" Sebagian riwayat menyebut QS. Al-Baqarah: 207 turun tentang Shuhaib."
      ],
      riwayat: [
        { derajat: "sirah", sumber: "Sirah Ibnu Hisyam (Ibnu Ishaq): Ali tinggal tiga malam untuk mengembalikan titipan, lalu menyusul ke Quba dan tinggal di rumah Kultsum bin Al-Hidm" },
        { derajat: "sirah", sumber: "Sirah Ibnu Hisyam (Ibnu Ishaq): Shuhaib menyerahkan hartanya; sabda \"Beruntunglah Shuhaib\"" },
        { derajat: "lemah", sumber: "Al-Hakim, Al-Mustadrak (Shuhaib, melalui Sa'id bin Al-Musayyib): Shuhaib menebus diri dan bertemu Nabi ﷺ di Quba; dishahihkan Al-Hakim, tetapi pentahqiq menyebut kelemahan pada salah satu perawinya", url: U.mustadrakShuhaib,
          kutip: "Beruntunglah jual belimu, wahai Abu Yahya." },
        { derajat: "lemah", sumber: "Al-Hakim, Al-Mustadrak (dari Ibnu Juraij dan Ikrimah): QS. Al-Baqarah: 207 turun tentang Shuhaib", url: U.mustadrakShuhaib }
      ],
      ayat: [AYAT.baqarah207],
      catatan: "Tanggal kedatangan Ali dan Shuhaib tidak tercatat. Riwayat Shuhaib di Al-Mustadrak diperselisihkan: Al-Hakim menshahihkannya, sedangkan pentahqiq modern menunjuk perawi yang lemah (Ya'qub bin Muhammad Az-Zuhri). Sebab turunnya QS. Al-Baqarah: 207 juga diperselisihkan; banyak mufassir memahaminya berlaku umum bagi setiap mukmin yang mengorbankan diri karena Allah. Nomor Al-Mustadrak berbeda di tiap edisi, jadi kami menautkan halaman babnya.",
      adegan: "Dua jalur bergerak menuju Quba di peta. Jalur pertama: Ali menyerahkan bungkusan titipan kepada pemiliknya di Mekah, lalu berjalan kaki ke utara. Jalur kedua: Shuhaib menyerahkan kantong-kantong harta kepada para penghadang, lalu melaju. Di Quba keduanya disambut, dan muncul teks \"Beruntunglah jual belimu, wahai Abu Yahya.\"" },

    { id: "jumat-pertama", no: 22, fase: "quba", judul: "Jumat pertama bersama Nabi ﷺ di Bani Salim bin Auf", arab: "أول جمعة",
      tahun: 622, tanggal: "Jumat, 12 Rabi'ul Awwal 1 H (±27 September 622 M) menurut Ar-Rahiq", urutWaktu: 622.7380,
      tempat: { kota: "madinah", id: "masjid-jumuah" },
      tokoh: ["nabi", "abubakar"],
      ringkas: "Hari Jumat Nabi ﷺ meninggalkan Quba menuju pusat Madinah. Waktu Jumat tiba di perkampungan Bani Salim bin Auf, dan beliau shalat Jumat bersama mereka di dasar lembah.",
      isi: [
        "Pada hari kelima, hari Jumat, Nabi ﷺ menaiki untanya meninggalkan Quba. Waktu Jumat tiba ketika beliau sampai di perkampungan Bani Salim bin Auf. Beliau mengumpulkan orang-orang dan shalat Jumat bersama mereka di dasar lembah Ranuna'. Menurut Ar-Rahiq, jumlah mereka sekitar seratus orang.",
        "Inilah shalat Jumat pertama yang dipimpin Nabi ﷺ sendiri. Di tempat itu kemudian berdiri masjid yang dikenal sebagai Masjid Jumu'ah. Sebelumnya kaum muslimin Madinah sudah pernah shalat Jumat yang dikumpulkan As'ad bin Zurarah."
      ],
      riwayat: [
        { derajat: "sirah", sumber: "Sirah Ibnu Hisyam (Ibnu Ishaq): Jumat di Bani Salim bin Auf, di dasar lembah Ranuna'" },
        { derajat: "sirah", sumber: "Ar-Rahiq Al-Makhtum: empat hari di Quba, berangkat hari kelima (Jumat), shalat bersama sekitar seratus orang", url: U.rahiqQubaHari },
        { derajat: "shahih", sumber: "HR. Abu Dawud no. 1069 (Ka'ab bin Malik); dinilai hasan oleh Al-Albani: As'ad bin Zurarah lebih dulu mengumpulkan Jumat di Madinah", url: sn("abudawud", 1069) }
      ],
      catatan: "Tanggal 12 Rabi'ul Awwal untuk hari Jumat ini mengikuti Ar-Rahiq. Jika mengikuti riwayat Anas yang menyebut empat belas malam di Quba (HR. Bukhari no. 428), Jumat ini terjadi sekitar dua pekan setelah kedatangan di Quba.",
      adegan: "Rombongan unta bergerak dari Quba ke utara di peta Madinah; matahari naik ke tengah hari. Di dasar lembah Bani Salim orang-orang berkumpul dan berbaris; cahaya berlabel \"Nabi ﷺ\" di depan saf. Penghitung jamaah naik sampai \"sekitar 100\"." },

    { id: "masuk-madinah", no: 23, fase: "madinah", judul: "Memasuki Madinah", arab: "دخول المدينة", peristiwa: "hijrah",
      tahun: 622, tanggal: "Jumat, 12 Rabi'ul Awwal 1 H (±27 September 622 M), setelah shalat Jumat (menurut Ar-Rahiq)", urutWaktu: 622.7385,
      tempat: { lat: 24.4620, lon: 39.6080, nama: "Jalan dari Bani Salim ke perkampungan Bani Najjar (perkiraan)" },
      tokoh: ["nabi", "abubakar", "saadubadah", "saadrabi", "abdullahrawahah"],
      ringkas: "Penduduk Madinah menyambut dengan kegembiraan yang belum pernah terlihat. Setiap kabilah Anshar meminta beliau singgah, tetapi beliau bersabda, \"Biarkan untanya, ia diperintah.\"",
      isi: [
        "Al-Bara' bin 'Azib berkata ia tidak pernah melihat penduduk Madinah segembira hari itu; bahkan para budak perempuan berseru, \"Rasulullah ﷺ telah datang!\" Anas menceritakan orang-orang naik ke tempat tinggi untuk melihat sambil berseru bahwa Nabi Allah telah tiba. Abu Bakar membonceng di belakang beliau.",
        "Menurut kitab sirah, setiap kabilah yang dilewati memegang tali kekang unta dan berkata, \"Tinggallah bersama kami, dengan jumlah, perlengkapan, dan perlindungan kami.\" Di antaranya Bani Sa'idah (Sa'ad bin Ubadah) dan Bani Al-Harits bin Al-Khazraj (Sa'ad bin Ar-Rabi' dan Abdullah bin Rawahah). Beliau menjawab dengan lembut, \"Biarkan jalannya, sesungguhnya ia diperintah.\"",
        "Syair \"Thala'al badru 'alaina\" yang sangat terkenal disebut dinyanyikan pada penyambutan ini, tetapi riwayatnya lemah. Kisah itu dicatat Al-Baihaqi dari Ibnu Aisyah, yang wafat tahun 228 H, sehingga ada beberapa perawi yang hilang dari sanadnya. Ibnul Qayyim juga mencatat bahwa Tsaniyyatul Wada' berada di arah Syam (utara), bukan di jalan dari Mekah, dan ada ulama yang menduga syair ini dilantunkan saat Nabi ﷺ pulang dari Tabuk. Para ulama tetap membolehkan menyanyikannya karena maknanya baik."
      ],
      riwayat: [
        { derajat: "shahih", sumber: "HR. Bukhari no. 3925 (Al-Bara' bin 'Azib)", url: sn("bukhari", 3925),
          kutip: "Aku tidak pernah melihat penduduk Madinah bergembira dengan sesuatu seperti kegembiraan mereka dengan kedatangan Rasulullah ﷺ." },
        { derajat: "shahih", sumber: "HR. Bukhari no. 3911 (Anas): orang-orang naik untuk melihat dan berseru bahwa Nabi Allah telah datang", url: sn("bukhari", 3911) },
        { derajat: "shahih", sumber: "HR. Bukhari no. 428 (Anas): Abu Bakar membonceng di belakang beliau, dikelilingi Bani Najjar", url: sn("bukhari", 428) },
        { derajat: "sirah", sumber: "Sirah Ibnu Hisyam (Ibnu Ishaq): kabilah-kabilah meminta beliau singgah; \"Biarkan jalannya, ia diperintah\"" },
        { derajat: "lemah", sumber: "Al-Baihaqi, Dala'il An-Nubuwwah (dari Ubaidullah bin Muhammad bin Aisyah): syair \"Thala'al badru 'alaina\"; dibahas IslamQA no. 119722", url: U.qa119722 }
      ],
      catatan: "Riwayat \"Thala'al badru\" terputus sanadnya; Al-'Iraqi dan Ibnu Hajar menyebut sanadnya bermasalah, dan Al-Albani menilainya lemah. Ar-Rahiq tetap menempatkannya pada saat kedatangan di Madinah, sedangkan Ibnul Qayyim mengaitkannya dengan kepulangan dari Tabuk. Karena itu adegan penyambutan sebaiknya tidak menyajikan syair ini sebagai fakta pasti.",
      adegan: "Jalan-jalan Madinah di antara kebun kurma: orang-orang di atap dan tepi jalan melambai, anak-anak berlari. Unta berjalan perlahan; di setiap persimpangan sekelompok orang memegang tali kekang lalu melepaskannya, dengan teks \"Biarkan, ia diperintah.\" Bila syair ditampilkan, beri label kecil: \"Syair ini dari riwayat lemah\"." },

    { id: "unta-abuayyub", no: 24, fase: "madinah", judul: "Unta berlutut di mirbad dan rumah Abu Ayyub", arab: "دار أبي أيوب", peristiwa: "hijrah",
      tahun: 622, tanggal: "Hari kedatangan di Madinah, Rabi'ul Awwal 1 H (±27 September 622 M)", urutWaktu: 622.7390,
      tempat: { kota: "madinah", id: "mirbad" },
      tokoh: ["nabi", "abuayyub", "asad", "sahlnajjar", "suhailnajjar", "abdullahsalam"],
      ringkas: "Unta Nabi ﷺ berlutut di sebuah mirbad, tempat menjemur kurma milik dua anak yatim, Sahl dan Suhail. Abu Ayyub Al-Anshari, yang rumahnya paling dekat, membawa beliau singgah di rumahnya.",
      isi: [
        "Unta itu terus berjalan sampai berlutut di tempat yang kini menjadi Masjid Nabawi. Tempat itu adalah mirbad, lahan untuk menjemur kurma, milik Sahl dan Suhail, dua anak yatim yang diasuh As'ad bin Zurarah. Nabi ﷺ bersabda, \"Inilah, insya Allah, tempat tinggal kita.\"",
        "Beliau bertanya rumah kerabat mana yang paling dekat. Abu Ayyub Al-Anshari dari Bani Najjar, keluarga ibu Abdul Muthalib, menjawab, \"Saya, wahai Nabi Allah. Ini rumahku dan ini pintuku.\" Menurut kitab sirah, Abu Ayyub lalu membawa pelana beliau masuk ke rumahnya.",
        "Rumah Abu Ayyub bertingkat dua. Nabi ﷺ menempati lantai bawah. Suatu malam Abu Ayyub terbangun dan merasa tidak pantas berjalan di atas kepala Rasulullah ﷺ, maka keluarganya pindah ke sudut. Akhirnya mereka bertukar tempat: beliau pindah ke atas. Abu Ayyub biasa mengirim makanan dan mencari bekas jari beliau agar bisa ikut makan dari bagian itu.",
        "Hari itu juga Abdullah bin Salam, pemuka ilmu kaum Yahudi, bergegas datang dari kebunnya membawa kurma yang baru dipetik. Ia mendengarkan Nabi ﷺ, dan tak lama kemudian menyatakan keislamannya."
      ],
      riwayat: [
        { derajat: "shahih", sumber: "HR. Bukhari no. 3906 (Urwah bin Az-Zubair)", url: sn("bukhari", 3906), kutip: "Inilah, insya Allah, tempat tinggal kita." },
        { derajat: "shahih", sumber: "HR. Bukhari no. 428 (Anas): beliau berhenti di halaman rumah Abu Ayyub", url: sn("bukhari", 428) },
        { derajat: "shahih", sumber: "HR. Bukhari no. 3911 (Anas): Abu Ayyub dan Abdullah bin Salam", url: sn("bukhari", 3911), kutip: "Ini rumahku dan ini pintuku." },
        { derajat: "shahih", sumber: "HR. Muslim no. 2053c (Abu Ayyub): lantai bawah dan lantai atas", url: sn("muslim", "2053c") },
        { derajat: "sirah", sumber: "Sirah Ibnu Hisyam (Ibnu Ishaq): unta berlutut, bangkit, lalu berlutut lagi; Abu Ayyub membawa pelana" }
      ],
      catatan: "Bani Najjar adalah keluarga ibu Abdul Muthalib (Salma binti Amr), sehingga mereka disebut paman-paman Nabi ﷺ dari pihak ibu. Kitab sirah berbeda tentang nama ayah Sahl dan Suhail serta wali mereka: Bukhari 3906 menyebut As'ad bin Zurarah, sebagian riwayat sirah menyebut Mu'adz bin 'Afra'. Beliau tinggal di rumah Abu Ayyub beberapa bulan sampai masjid dan bilik-bilik beliau selesai dibangun.",
      adegan: "Unta berjalan di antara pohon kurma lalu berlutut di lahan jemuran kurma. Dua anak kecil (Sahl dan Suhail) mengintip dari balik pagar. Abu Ayyub (chibi) bergegas mengangkat pelana dan membawanya ke rumah bertingkat dua di dekatnya. Potongan rumah: lantai bawah bercahaya lembut, di lantai atas keluarga Abu Ayyub berjingkat pelan." },

    { id: "masjid-nabawi", no: 25, fase: "madinah", judul: "Membangun Masjid Nabawi", arab: "بناء المسجد النبوي", peristiwa: "masjidnabawi",
      tahun: 622, tanggal: "Rabi'ul Awwal 1 H dan bulan-bulan sesudahnya (622–623 M)", urutWaktu: 622.7450,
      tempat: { kota: "madinah", id: "masjid-nabawi" },
      tokoh: ["nabi", "abubakar", "ammar", "anas", "asad", "sahlnajjar", "suhailnajjar"],
      ringkas: "Nabi ﷺ membeli lahan itu dan membangun masjid bersama para sahabat: dinding bata lumpur, tiang batang kurma, dan atap pelepah. Beliau sendiri ikut mengangkut bata sambil bersyair.",
      isi: [
        "Nabi ﷺ memanggil kedua anak yatim itu dan menawar lahan mereka. Keduanya berkata akan menghibahkannya, tetapi beliau tetap ingin membelinya. Dalam riwayat Anas, Bani Najjar berkata mereka hanya mengharap harganya dari Allah.",
        "Di lahan itu ada kuburan orang musyrik, puing-puing, dan pohon kurma. Nabi ﷺ memerintahkan kuburan itu dibongkar, tanah diratakan, dan pohon kurma ditebang. Batang-batang kurma dijajarkan sebagai dinding kiblat, yang saat itu masih menghadap Baitul Maqdis di utara. Dindingnya dari bata lumpur, atapnya pelepah kurma, dan tiangnya batang kurma.",
        "Para sahabat mengangkut batu dan bata sambil bersyair, dan Nabi ﷺ ikut mengangkut bata sambil berkata, \"Inilah beban (yang sesungguhnya), bukan beban dagangan Khaibar; ini lebih baik dan lebih suci, wahai Tuhan kami.\" Beliau juga berdoa, \"Ya Allah, sesungguhnya pahala sejati adalah pahala akhirat, maka rahmatilah kaum Anshar dan Muhajirin.\"",
        "Abu Sa'id Al-Khudri bercerita: setiap orang membawa satu bata, sedangkan Ammar bin Yasir membawa dua-dua. Nabi ﷺ melihatnya, menyeka debu darinya, dan mendoakannya."
      ],
      riwayat: [
        { derajat: "shahih", sumber: "HR. Bukhari no. 3906 (Urwah bin Az-Zubair): membeli lahan, ikut mengangkut bata, dan syairnya", url: sn("bukhari", 3906),
          kutip: "Inilah beban, bukan beban Khaibar; ini lebih baik dan lebih suci, wahai Tuhan kami." },
        { derajat: "shahih", sumber: "HR. Bukhari no. 428 (Anas): kuburan, puing, dan pohon kurma; batang kurma sebagai dinding kiblat", url: sn("bukhari", 428),
          kutip: "Tidak ada kebaikan kecuali kebaikan akhirat, maka ampunilah kaum Anshar dan Muhajirin." },
        { derajat: "shahih", sumber: "HR. Bukhari no. 446 (Ibnu Umar): bata lumpur, atap pelepah, tiang batang kurma", url: sn("bukhari", 446) },
        { derajat: "shahih", sumber: "HR. Bukhari no. 447 (Abu Sa'id Al-Khudri): Ammar membawa dua bata", url: sn("bukhari", 447) }
      ],
      catatan: "Riwayat berbeda tentang pembelian: Bukhari 3906 menyebut kedua anak yatim menawarkan hibah lalu Nabi ﷺ membelinya, sedangkan Bukhari 428 menyebut Bani Najjar hanya mengharap balasan dari Allah. Harga dan siapa yang membayarnya diriwayatkan berbeda-beda dalam kitab sirah, jadi tidak dicantumkan. Ukuran dan tahap perluasan masjid ada di data tempat \"masjid-nabawi\". Kiblat dipindahkan ke Ka'bah sekitar 16–17 bulan kemudian.",
      adegan: "Lahan mirbad berubah: pohon kurma ditebang menjadi batang-batang yang dijajarkan; sosok-sosok chibi beriringan membawa bata lumpur, satu per orang, sedangkan Ammar membawa dua. Cahaya berlabel \"Nabi ﷺ\" ikut bergerak di barisan pengangkut. Teks syair muncul: \"Ya Allah, pahala sejati adalah pahala akhirat…\". Akhir: denah masjid terbentuk dengan panah kiblat ke utara (Baitul Maqdis)." },

    { id: "muakhah", no: 26, fase: "madinah", judul: "Persaudaraan Muhajirin dan Anshar", arab: "المؤاخاة",
      tahun: 622, tanggal: "Tahun 1 H, setelah kedatangan di Madinah (waktu persisnya tidak tercatat)", urutWaktu: 622.8000,
      tempat: { kota: "madinah", id: "masjid-nabawi" },
      tokoh: ["nabi", "anas", "abdurrahman", "saadrabi", "salman", "abudarda"],
      ringkas: "Nabi ﷺ mempersaudarakan kaum Muhajirin dengan kaum Anshar, berpasang-pasangan. Sa'ad bin Ar-Rabi' menawarkan separuh hartanya kepada Abdurrahman bin Auf, yang memilih minta ditunjukkan jalan ke pasar.",
      isi: [
        "Kaum Muhajirin tiba di Madinah dengan meninggalkan rumah, kebun, dan dagangan di Mekah. Nabi ﷺ lalu mengikat persaudaraan antara mereka dan kaum Anshar. Anas bin Malik berkata ikatan itu dibuat di rumahnya. Menurut Ibnul Qayyim, jumlahnya sembilan puluh orang, separuh Muhajirin dan separuh Anshar.",
        "Contoh yang paling terkenal adalah Abdurrahman bin Auf dan Sa'ad bin Ar-Rabi'. Sa'ad berkata, \"Aku orang Anshar yang paling banyak hartanya. Akan kubagi dua hartaku untukmu.\" Abdurrahman mendoakan keberkahan bagi keluarga dan harta saudaranya, lalu bertanya di mana pasar. Ia berdagang di pasar Bani Qainuqa' sampai mendapat untung, lalu menikah dengan perempuan Anshar.",
        "Pada awalnya persaudaraan ini membuat mereka saling mewarisi, mendahului kerabat sedarah. Ibnu Abbas menjelaskan bahwa hukum waris itu kemudian dihapus oleh ayat Al-Qur'an, sedangkan ikatan tolong-menolong dan nasihat tetap berlaku. Persaudaraan juga diikat dengan sahabat yang datang belakangan, seperti Salman Al-Farisi dengan Abu Darda'."
      ],
      riwayat: [
        { derajat: "shahih", sumber: "HR. Bukhari no. 3780 (Abdurrahman bin Auf dan Sa'ad bin Ar-Rabi')", url: sn("bukhari", 3780),
          kutip: "Aku orang Anshar yang paling banyak hartanya, maka akan kubagi hartaku menjadi dua." },
        { derajat: "shahih", sumber: "HR. Bukhari no. 3937 (Anas)", url: sn("bukhari", 3937) },
        { derajat: "shahih", sumber: "HR. Bukhari no. 2294 (Anas)", url: sn("bukhari", 2294),
          kutip: "Nabi ﷺ telah mengikat perjanjian antara Quraisy dan Anshar di rumahku." },
        { derajat: "shahih", sumber: "HR. Bukhari no. 4580 (Ibnu Abbas): waris karena persaudaraan dihapus oleh QS. An-Nisa': 33", url: sn("bukhari", 4580) },
        { derajat: "shahih", sumber: "HR. Bukhari no. 1968 (Abu Juhaifah): persaudaraan Salman dan Abu Darda'", url: sn("bukhari", 1968) },
        { derajat: "sirah", sumber: "Ibnul Qayyim, Zad Al-Ma'ad 2/56 (dikutip Ar-Rahiq): sembilan puluh orang di rumah Anas; saling mewarisi sampai Perang Badar", url: U.rahiqMuakhah }
      ],
      ayat: [AYAT.hasyr9],
      catatan: "Ibnu Abbas (HR. Bukhari no. 4580) mengaitkan penghapusan waris dengan QS. An-Nisa': 33, sedangkan Ibnul Qayyim menyebut ayat tentang ulul arham (QS. Al-Anfal: 75) setelah Perang Badar. Waktu persaudaraan ini tidak disebut dalam hadits-hadits di atas; urutannya di sini perkiraan. Salman baru masuk Islam beberapa waktu setelah hijrah, jadi persaudaraannya dengan Abu Darda' terjadi belakangan. Letak rumah Anas tidak kami temukan, jadi episode ini ditautkan ke Masjid Nabawi.",
      adegan: "Halaman di Madinah: dua barisan sosok chibi, kiri berlabel \"Muhajirin\" (membawa bungkusan kecil), kanan \"Anshar\". Pasangan-pasangan dipertemukan dan berjabat tangan, dan garis cahaya menghubungkan tiap pasangan sampai terbentuk sekitar 45 pasang. Fokus akhir: Sa'ad menunjuk kebunnya, Abdurrahman tersenyum dan menunjuk ke arah pasar." }
  ];

  // ---------- Tokoh baru ----------
  const tokohBaru = {
    suraqah: { nama: "Suraqah bin Malik", arab: "سراقة بن مالك", lahir: 590, wafat: 644, kira: true, gelar: "Pengejar yang menjadi pelindung",
      kel: ["lain"], tinggal: [[null, 590, 644, "Perkampungan Bani Mudlij (Kinanah), sekitar Qudaid antara Mekah dan Madinah"]],
      ringkas: "Penunggang kuda dari Bani Mudlij yang mengejar Nabi ﷺ dan Abu Bakar demi hadiah Quraisy, lalu kaki kudanya terbenam dan ia meminta surat jaminan keamanan (HR. Bukhari no. 3906). Ia masuk Islam di Ji'ranah tahun 8 H dan wafat sekitar 24 H.",
      wiki: W("Suraqa_ibn_Malik") },
    ummumabad: { nama: "Ummu Ma'bad (Atikah binti Khalid)", arab: "أم معبد", lahir: 580, wafat: 640, kira: true, takTercatat: true, gelar: "Pemilik kemah di jalan hijrah",
      kel: ["sahabiyat"], tinggal: [[null, 580, 640, "Kemah di sekitar Qudaid, kabilah Bani Ka'b dari Khuza'ah"]],
      ringkas: "Perempuan dari Khuza'ah yang kemahnya disinggahi rombongan hijrah menurut kitab sirah. Kisahnya masyhur, tetapi derajat riwayatnya diperselisihkan. Tahun lahir dan wafatnya tidak tercatat.",
      wiki: W("Umm_Ma%27bad") },
    amirfuhairah: { nama: "Amir bin Fuhairah", arab: "عامر بن فهيرة", lahir: 586, wafat: 625, kira: true, gelar: "Penggembala di Gua Tsur",
      kel: ["muhajirin"], tinggal: [["makkah", 586, 622, "Budak yang dimerdekakan Abu Bakar"], ["madinah", 622, 625]],
      ringkas: "Bekas budak yang dibeli dan dimerdekakan Abu Bakar. Saat hijrah ia menggembalakan kambing di dekat Gua Tsur untuk membawa susu, lalu ikut dalam perjalanan dan menuliskan surat jaminan untuk Suraqah. Ia gugur di Bi'r Ma'unah tahun 4 H.",
      wiki: W("Amir_ibn_Fuhayra") },
    abdullahabubakar: { nama: "Abdullah bin Abi Bakar", arab: "عبد الله بن أبي بكر", lahir: 606, wafat: 633, kira: true, gelar: "Pembawa kabar ke Gua Tsur",
      kel: ["muhajirin"], tinggal: [["makkah", 606, 622], ["madinah", 622, 633]],
      ringkas: "Putra Abu Bakar dan saudara Asma'. Selama tiga malam ia membawa kabar Quraisy ke Gua Tsur dan kembali ke Mekah sebelum fajar (HR. Bukhari no. 3905). Ia terkena anak panah saat pengepungan Thaif dan wafat ketika lukanya kambuh di awal masa Abu Bakar.",
      wiki: W("Abd_Allah_ibn_Abi_Bakr") },
    uraiqith: { nama: "Abdullah bin Uraiqith", arab: "عبد الله بن أريقط", lahir: 580, wafat: 640, kira: true, takTercatat: true, gelar: "Pemandu jalan hijrah",
      kel: ["lain"], tinggal: [["makkah", 580, 640, "Dari Bani Ad-Dil; sekutu keluarga Al-'Ash bin Wa'il"]],
      ringkas: "Penunjuk jalan yang sangat mahir dari Bani Ad-Dil, disewa Nabi ﷺ dan Abu Bakar. Saat itu ia belum muslim, tetapi dipercaya membawa unta ke Gua Tsur dan menuntun rombongan lewat jalan pantai (HR. Bukhari no. 2263). Tidak ada keterangan pasti apakah ia kemudian masuk Islam; tahun lahir dan wafatnya tidak tercatat." },
    kultsum: { nama: "Kultsum bin Al-Hidm", arab: "كلثوم بن الهدم", lahir: 560, wafat: 623, kira: true, gelar: "Tuan rumah Nabi ﷺ di Quba",
      kel: ["anshar"], tinggal: [["madinah", 560, 623, "Quba, Bani Amr bin Auf (Aus)"]],
      ringkas: "Sesepuh Bani Amr bin Auf di Quba. Menurut kitab sirah, Nabi ﷺ menginap di rumahnya saat tiba di Quba, dan Ali menyusul ke sana. Ia wafat tidak lama setelah hijrah." },
    buraidah: { nama: "Buraidah bin Al-Hushaib Al-Aslami", arab: "بريدة بن الحصيب", lahir: 600, wafat: 682, kira: true, gelar: "Sahabat dari Bani Aslam",
      kel: ["lain"], tinggal: [[null, 600, 625, "Perkampungan Bani Aslam, antara Mekah dan Madinah"], ["madinah", 625, 650, "Datang ke Madinah setelah Badar dan Uhud"], [null, 650, 682, "Ikut ke wilayah timur; wafat di Marw, Khurasan"]],
      ringkas: "Masuk Islam ketika Nabi ﷺ melewatinya dalam perjalanan hijrah di Al-Ghamim (Ibnu Mandah). Ia ikut Khaibar dan Fathu Makkah, lalu wafat di Marw sekitar 62–63 H. Kisah serban di ujung tombak saat hijrah sanadnya lemah.",
      wiki: W("Buraydah_ibn_al-Husayb") },
    sahlnajjar: { nama: "Sahl (anak yatim Bani Najjar)", arab: "سهل", lahir: 610, wafat: 650, kira: true, takTercatat: true, gelar: "Pemilik mirbad Masjid Nabawi",
      kel: ["anshar"], tinggal: [["madinah", 610, 650, "Bani Najjar"]],
      ringkas: "Salah satu dari dua anak yatim Bani Najjar pemilik mirbad tempat unta Nabi ﷺ berlutut dan Masjid Nabawi dibangun (HR. Bukhari no. 3906). Riwayat berbeda tentang nama ayah dan walinya. Tahun lahir dan wafatnya tidak tercatat." },
    suhailnajjar: { nama: "Suhail (anak yatim Bani Najjar)", arab: "سهيل", lahir: 610, wafat: 650, kira: true, takTercatat: true, gelar: "Pemilik mirbad Masjid Nabawi",
      kel: ["anshar"], tinggal: [["madinah", 610, 650, "Bani Najjar"]],
      ringkas: "Saudara Sahl, pemilik bersama mirbad yang menjadi lahan Masjid Nabawi; keduanya diasuh As'ad bin Zurarah menurut HR. Bukhari no. 3906. Berbeda dari Suhail bin Amr, tokoh Quraisy. Tahun lahir dan wafatnya tidak tercatat." },
    abusalamah: { nama: "Abu Salamah bin Abdul Asad", arab: "أبو سلمة", lahir: 582, wafat: 625, kira: true, gelar: "Saudara sesusuan Nabi ﷺ",
      kel: ["muhajirin"], tinggal: [["makkah", 582, 615], ["habasyah", 615, 616, "Hijrah ke Habasyah"], ["makkah", 616, 621], ["madinah", 621, 625]],
      ringkas: "Sepupu dan saudara sesusuan Nabi ﷺ (keduanya disusui Tsuwaibah, HR. Bukhari no. 5101). Ikut hijrah ke Habasyah, lalu menurut Ibnu Ishaq menjadi orang Quraisy pertama yang hijrah ke Yatsrib. Ia wafat ketika luka dari Uhud kambuh; jandanya, Ummu Salamah, kemudian dinikahi Nabi ﷺ.",
      wiki: W("Abu_Salama") },
    ayyasy: { nama: "Ayyasy bin Abi Rabi'ah", arab: "عياش بن أبي ربيعة", lahir: 590, wafat: 636, kira: true, takTercatat: true, gelar: "Saudara seibu Abu Jahal",
      kel: ["muhajirin"], tinggal: [["makkah", 590, 622], ["madinah", 622, 636, "Sempat dibujuk pulang dan ditahan di Mekah beberapa tahun"]],
      ringkas: "Sahabat dari Bani Makhzum, saudara seibu Abu Jahal. Ia hijrah bersama Umar sampai Quba, lalu dibujuk pulang dan ditahan di Mekah; Nabi ﷺ menyebut namanya dalam doa di shalat (HR. Bukhari no. 804). Tahun wafatnya diperselisihkan.",
      wiki: W("Ayyash_ibn_Abi_Rabi%27a") },
    hisyamash: { nama: "Hisyam bin Al-'Ash", arab: "هشام بن العاص", lahir: 595, wafat: 634, kira: true, gelar: "Saudara Amr bin Al-'Ash",
      kel: ["muhajirin"], tinggal: [["makkah", 595, 627, "Ditahan keluarganya; tahun hijrahnya perkiraan"], ["madinah", 627, 634]],
      ringkas: "Saudara Amr bin Al-'Ash dari Bani Sahm. Ia berjanji hijrah bersama Umar dan Ayyasy tetapi ditahan keluarganya, lalu hijrah belakangan. Ia gugur dalam perang di Syam; tahunnya diperselisihkan (13–15 H).",
      wiki: W("Hisham_ibn_al-As") },
    utsmanthalhah: { nama: "Utsman bin Thalhah", arab: "عثمان بن طلحة", lahir: 590, wafat: 662, kira: true, gelar: "Pemegang kunci Ka'bah",
      kel: ["lain"], tinggal: [["makkah", 590, 629], ["madinah", 629, 630], ["makkah", 630, 662]],
      ringkas: "Dari Bani Abdud Dar, pemegang kunci Ka'bah. Sebelum masuk Islam ia mengawal Ummu Salamah dari At-Tan'im sampai Quba. Ia masuk Islam sekitar 8 H bersama Khalid bin Al-Walid, dan saat Fathu Makkah Nabi ﷺ menyerahkan kunci Ka'bah kepadanya.",
      wiki: W("Uthman_ibn_Talha") },
    abuquhafah: { nama: "Abu Quhafah (Utsman bin Amir)", arab: "أبو قحافة", lahir: 540, wafat: 635, kira: true, gelar: "Ayah Abu Bakar",
      kel: ["lain"], tinggal: [["makkah", 540, 635]],
      ringkas: "Ayah Abu Bakar. Saat hijrah ia sudah buta dan belum muslim; Asma' menenangkannya dengan batu-batu yang ditutup kain. Ia masuk Islam saat Fathu Makkah dan wafat di Mekah pada 635 M.",
      wiki: W("Abu_Quhafa") },
    saadrabi: { nama: "Sa'ad bin Ar-Rabi'", arab: "سعد بن الربيع", lahir: 590, wafat: 625, kira: true, gelar: "Saudara Abdurrahman bin Auf",
      kel: ["anshar"], tinggal: [["madinah", 590, 625]],
      ringkas: "Pemuka Anshar dari Khazraj yang hadir di Bai'at Aqabah dan termasuk naqib menurut Ibnu Ishaq. Ia dipersaudarakan dengan Abdurrahman bin Auf dan menawarkan separuh hartanya (HR. Bukhari no. 3780). Ia gugur di Perang Uhud.",
      wiki: W("Sa%27d_ibn_al-Rabi%27") },
    abdullahsalam: { nama: "Abdullah bin Salam", arab: "عبد الله بن سلام", lahir: 550, wafat: 663, kira: true, gelar: "Ulama Yahudi yang masuk Islam",
      kel: ["ulama"], tinggal: [["madinah", 550, 663]],
      ringkas: "Bernama asli Al-Hushain, pemuka ilmu kaum Yahudi Bani Qainuqa' di Madinah. Ia bergegas menemui Nabi ﷺ pada hari kedatangan beliau di rumah Abu Ayyub, lalu menyatakan keislamannya (HR. Bukhari no. 3911). Wafat di Madinah tahun 43 H.",
      wiki: W("Abd_Allah_ibn_Salam") }
  };

  const sumber = [
    { judul: "Sunnah.com: Shahih Bukhari no. 3905 (Aisyah, kisah hijrah)", url: sn("bukhari", 3905) },
    { judul: "Sunnah.com: Shahih Bukhari no. 3906 (Suraqah; Urwah tentang Az-Zubair, harrah, Quba, dan Masjid Nabawi)", url: sn("bukhari", 3906) },
    { judul: "Hadithunlocked: Bukhari 3906 dengan teks Arab", url: hu("bukhari", 3906) },
    { judul: "Sunnah.com: Shahih Bukhari no. 3653 dan Shahih Muslim no. 2381 (di dalam gua)", url: sn("bukhari", 3653) },
    { judul: "Sunnah.com: Shahih Bukhari no. 3615 (Al-Bara', dari Abu Bakar)", url: sn("bukhari", 3615) },
    { judul: "Sunnah.com: Shahih Bukhari no. 3911, 3925, 428, 446, 447", url: sn("bukhari", 3911) },
    { judul: "Sunnah.com: Shahih Bukhari no. 3780, 3937, 2294, 4580, 1968 (persaudaraan)", url: sn("bukhari", 3780) },
    { judul: "Sunnah.com: Shahih Bukhari no. 3889, 3890, 3892, 3893 (Aqabah)", url: sn("bukhari", 3892) },
    { judul: "Hadithunlocked: Musnad Ahmad no. 14456 (Jabir, Aqabah) dan no. 3251 (Ibnu Abbas, Al-Anfal 30)", url: hu("ahmad", 14456) },
    { judul: "Ibnu Hisyam, As-Sirah An-Nabawiyah (dari Ibnu Ishaq), bab Aqabah dan Hijrah (1/482–494)" },
    { judul: "Al-Mubarakfuri, Ar-Rahiq Al-Makhtum (teks Arab di usul.ai)", url: U.rahiq },
    { judul: "Islamweb: The warm welcoming by the Ansar (dari Ar-Rahiq Al-Makhtum)", url: "https://www.islamweb.net/en/article/76850/" },
    { judul: "IslamQA no. 27224: bermalam di Gua Tsur (laba-laba dan merpati)", url: U.qa27224 },
    { judul: "IslamQA no. 119722: nasyid Thala'al Badru", url: U.qa119722 },
    { judul: "IslamQA no. 208771: kisah hijrah Umar dan kelemahannya", url: U.qa208771 },
    { judul: "Majma' Az-Zawa'id (Al-Haitsami): riwayat pohon dan merpati", url: U.majma9904 },
    { judul: "Al-Baihaqi, As-Sunan Al-Kubra: gelang Kisra", url: U.baihaqi13036 },
    { judul: "Ibnu Hajar, Al-Mathalib Al-'Aliyah no. 2040: surat Suraqah di Ji'ranah", url: U.mathalib2040 },
    { judul: "Al-Hakim, Al-Mustadrak: riwayat Shuhaib", url: U.mustadrakShuhaib },
    { judul: "Ibnu Katsir, Al-Bidayah wan Nihayah 3/190: kisah Ummu Ma'bad", url: U.bidayahUmmuMabad },
    { judul: "Biografi Buraidah bin Al-Hushaib (Ibnu Mandah; Mukhtashar Tarikh Dimasyq)", url: U.buraidah },
    { judul: "Wikipedia: Jabal Thawr", url: W("Jabal_Thawr") },
    { judul: "Wikipedia: Bay'ah Mosque", url: W("Bay%27ah_Mosque") },
    { judul: "Wikipedia: Wareqan Mountain", url: W("Wareqan_Mountain") },
    { judul: "IslamicLandmarks: rumah Abu Bakar di Mekah", url: "https://www.islamiclandmarks.com/makkah-other/house-of-abu-bakr-ra" }
  ];

  window.HIJRAH = {
    ringkas: "Hijrah adalah perpindahan Nabi ﷺ dan kaum muslimin dari Mekah ke Yatsrib, yang kemudian disebut Madinah, pada 622 M. Jalannya dibuka oleh dua Bai'at Aqabah, ketika kaum Anshar berjanji melindungi Nabi ﷺ. Para sahabat berangkat diam-diam lebih dulu. Ketika Quraisy berencana membunuh beliau, Nabi ﷺ dan Abu Bakar keluar di malam hari, bersembunyi tiga malam di Gua Tsur di selatan Mekah, lalu menempuh jalan pantai yang jarang dilalui bersama seorang pemandu sewaan. Sekitar sepekan kemudian mereka tiba di Quba pada hari Senin di bulan Rabi'ul Awwal 1 H, mendirikan Masjid Quba, lalu memasuki Madinah dan membangun Masjid Nabawi. Tanggal Masehi di sini mengikuti Ar-Rahiq Al-Makhtum dan hanya perkiraan.",
    fase,
    rute,
    tempatMekahBaru,
    episode,
    sumber,
    tokohBaru
  };
})();
