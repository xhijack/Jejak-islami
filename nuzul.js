// Ensiklopedia Asbabun Nuzul: urutan kejadian turunnya ayat dan artikel bergaya ensiklopedia.
// Artikel "lengkap" ditulis satu per satu; entri lain sementara berupa ringkasan dari data peristiwa yang sudah ada.
// DRAF: semua isi wajib diverifikasi ustadz sebelum dipakai.
(function () {
  const sn = (k, n) => `https://sunnah.com/${k}:${n}`;

  // Urutan kejadian menurut waktu turunnya ayat. ev = id peristiwa di data.js (a = indeks ayat);
  // tempat = id tempat di kota Mekah (r = judul riwayat).
  // waktu: bulan/tanggal bila ada sumbernya (ws = sumber, wu = tautan). Yang diperselisihkan ditulis begitu.
  const urutan = [
    { id: "alaq-1-5", waktu: "Senin, Ramadhan 610 M" },
    { id: "muddatstsir-1-5", ev: "muddatstsir", a: 0, waktu: "Setelah masa jeda wahyu, ±611 M" },
    { id: "dhuha-1-3", ev: "dhuha", a: 0, waktu: "Tidak disebut; awal periode Mekah (±612 M, perkiraan)" },
    { id: "syuara-214", ev: "shafa", a: 0, waktu: "±613 M, awal dakwah terang-terangan (menurut kitab sirah)" },
    { id: "masad-1-5", ev: "shafa", a: 1, waktu: "±613 M, hari seruan di Bukit Shafa" },
    { id: "abasa-1-10", ev: "abasa", a: 0, waktu: "Tidak disebut; periode Mekah (±614 M, perkiraan)" },
    { id: "alaq-9-19", tempat: "kabah", r: "Ancaman Abu Jahal", waktu: "Tidak disebut; periode Mekah (±614 M, perkiraan)" },
    { id: "isra-1", ev: "isra", a: 0, waktu: "Diperselisihkan; masyhur 27 Rajab, ±1 tahun sebelum Hijrah" },
    { id: "baqarah-144", ev: "kiblat", a: 0, waktu: "16 atau 17 bulan setelah Hijrah (2 H)", ws: "HR. Bukhari no. 40 (Al-Bara' bin 'Azib)", wu: sn("bukhari", 40) },
    { id: "baqarah-125", tempat: "maqam", r: "Usul Umar", waktu: "Tidak disebut; periode Madinah" },
    { id: "anfal-9", ev: "badar", a: 0, waktu: "17 Ramadhan 2 H, hari Perang Badar", ws: "Sirah Ibnu Hisyam" },
    { id: "anfal-30", tempat: "nadwah", r: "Rencana membunuh Nabi", waktu: "Ayat turun setelah Badar (2 H); peristiwanya menjelang Hijrah",
      catatan: "Surah Al-Anfal turun di Madinah setelah Perang Badar; ayat ini mengingatkan peristiwa menjelang Hijrah." },
    { id: "aliimran-128", ev: "uhud", a: 0, waktu: "Syawal 3 H, Perang Uhud", ws: "Sirah Ibnu Hisyam" },
    { id: "aliimran-144", ev: "uhud", a: 1, waktu: "Syawal 3 H, Perang Uhud", ws: "Sirah Ibnu Hisyam" },
    { id: "ahzab-10", ev: "khandaq", a: 0, waktu: "Syawal 5 H menurut Ibnu Ishaq (ada yang menyebut Dzulqa'dah)", ws: "Sirah Ibnu Hisyam" },
    { id: "nur-11-20", ev: "ifki", a: 0, waktu: "Sepulang perang Bani Mushthaliq, 5 atau 6 H (diperselisihkan)" },
    { id: "fath-1", ev: "hudaibiyah", a: 0, waktu: "Dzulqa'dah 6 H, sepulang dari Hudaibiyah", ws: "HR. Bukhari no. 1778 (Anas): umrah Hudaibiyah di bulan Dzulqa'dah", wu: sn("bukhari", 1778) },
    { id: "nashr-1-3", ev: "fathu", a: 0, waktu: "Diperselisihkan: sekitar Fathu Makkah (8 H) atau Haji Wada' (10 H)" },
    { id: "taubah-40", ev: "tsur", a: 0, waktu: "Ayat turun ±9 H; peristiwanya saat Hijrah" },
    { id: "taubah-118", ev: "tabuk", a: 0, waktu: "9 H, setelah Perang Tabuk (berangkat Rajab menurut Ibnu Ishaq)", ws: "Sirah Ibnu Hisyam" },
    { id: "hujurat-2", ev: "wufud", a: 0, waktu: "9 H, tahun para utusan" },
    { id: "maidah-3", ev: "wada", a: 0, waktu: "Jumat, hari Arafah (9 Dzulhijjah) 10 H, saat Haji Wada'", ws: "HR. Bukhari no. 45 (Umar bin Khattab)", wu: sn("bukhari", 45) }
  ];

  const artikel = {
    "alaq-1-5": {
      judul: "Al-'Alaq 1–5",
      sub: "Ayat-ayat pertama Al-Qur'an yang diturunkan",
      surah: "Al-'Alaq", ayatNo: "1–5", tahun: 610,
      tontonan: "wahyu-pertama", peta: { tahun: 610, tempat: "hira" },
      lead: [
        "Al-'Alaq ayat 1–5 adalah ayat-ayat Al-Qur'an yang pertama kali diturunkan kepada Nabi Muhammad ﷺ, menurut pendapat yang dipegang mayoritas ulama.[ref:itqan] Ayat-ayat ini turun di Gua Hira melalui malaikat yang kemudian dikenal sebagai Jibril, pada bulan Ramadhan sekitar tahun 610 M, ketika beliau berusia 40 tahun.[ref:b3][ref:b3902]",
        "Peristiwa turunnya ayat ini menandai awal kenabian Muhammad ﷺ. Kisahnya diriwayatkan oleh Aisyah dalam Shahih Bukhari dan Shahih Muslim, mulai dari mimpi yang benar, perintah \"Bacalah!\", hingga pertemuan dengan Waraqah bin Naufal.[ref:b3][ref:m160]"
      ],
      infobox: [
        ["Surah", "Al-'Alaq (العلق), surah ke-96 dalam mushaf"],
        ["Ayat", "1–5"],
        ["Golongan", "Makkiyah"],
        ["Urutan turun", "Pertama, menurut mayoritas ulama[ref:itqan]"],
        ["Waktu", "Senin malam, bulan Ramadhan, ±610 M[ref:m1162][ref:baqarah185]"],
        ["Tempat", "Gua Hira, Jabal Nur, Mekah[ref:wikinur]"],
        ["Penerima", "Rasulullah ﷺ, usia 40 tahun[ref:b3902]"],
        ["Perantara", "Malaikat (Jibril)[ref:b3]"],
        ["Riwayat utama", "HR. Bukhari no. 3 dan 4953; HR. Muslim no. 160"]
      ],
      ayat: [
        { no: 1, ar: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ", id: "Bacalah dengan nama Tuhanmu yang menciptakan," },
        { no: 2, ar: "خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ", id: "Dia telah menciptakan manusia dari segumpal darah." },
        { no: 3, ar: "اقْرَأْ وَرَبُّكَ الْأَكْرَمُ", id: "Bacalah, dan Tuhanmulah Yang Maha Mulia," },
        { no: 4, ar: "الَّذِي عَلَّمَ بِالْقَلَمِ", id: "yang mengajar manusia dengan pena." },
        { no: 5, ar: "عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ", id: "Dia mengajarkan kepada manusia apa yang tidak diketahuinya." }
      ],
      bagian: [
        { id: "latar", judul: "Latar belakang", isi: [
          "Menurut riwayat Aisyah, wahyu kepada Rasulullah ﷺ diawali dengan mimpi yang benar. Setiap mimpi beliau menjadi nyata, seterang cahaya fajar.[ref:b3]",
          "Setelah itu beliau suka menyendiri. Beliau beribadah (tahannuts) di Gua Hira selama beberapa malam, membawa bekal dari rumah, lalu pulang kepada Khadijah untuk mengambil bekal lagi. Hal itu berlangsung hingga datang kebenaran ketika beliau berada di Gua Hira.[ref:b3]"
        ] },
        { id: "turun", judul: "Peristiwa turunnya ayat", isi: [
          "Malaikat datang dan berkata, \"Bacalah!\" Beliau menjawab, \"Aku tidak bisa membaca.\" Malaikat itu lalu mendekap beliau dengan kuat hingga beliau merasa sangat payah, kemudian melepaskannya dan kembali berkata, \"Bacalah!\" Hal ini terjadi tiga kali. Setelah dekapan ketiga, malaikat membacakan awal Surah Al-'Alaq.[ref:b3]",
          "Riwayat-riwayat berbeda dalam panjang kutipannya: Shahih Bukhari no. 3 mengutip hingga ayat 3, Shahih Muslim no. 160 hingga ayat 4, dan Shahih Bukhari no. 4953 hingga ayat 5.[ref:b3][ref:m160][ref:b4953]"
        ] },
        { id: "setelah", judul: "Setelah turunnya ayat", isi: [
          "Rasulullah ﷺ pulang dengan hati yang gemetar dan menemui Khadijah sambil berkata, \"Selimuti aku, selimuti aku!\" Beliau diselimuti hingga rasa takutnya hilang, lalu menceritakan kejadian itu dan berkata bahwa beliau khawatir terhadap dirinya.[ref:b3]",
          "Khadijah menenangkan beliau: \"Sekali-kali tidak. Demi Allah, Allah tidak akan menghinakanmu selamanya.\" Ia menyebut sifat-sifat beliau: menyambung silaturahim, menanggung beban orang lain, memberi orang yang tidak punya, memuliakan tamu, dan menolong orang yang tertimpa musibah di jalan kebenaran.[ref:b3]",
          "Khadijah kemudian membawa beliau kepada sepupunya, Waraqah bin Naufal, yang di masa jahiliyah memeluk Nasrani dan menulis kitab dengan aksara Ibrani. Setelah mendengar cerita beliau, Waraqah berkata bahwa yang datang adalah an-Namus yang dahulu Allah turunkan kepada Musa, dan bahwa kaum beliau kelak akan mengusir beliau. Tidak lama kemudian Waraqah wafat dan wahyu terhenti untuk sementara waktu.[ref:b3]"
        ] },
        { id: "waktu", judul: "Waktu dan tempat", isi: [
          "Nabi ﷺ menyebut hari Senin sebagai hari beliau dilahirkan dan hari beliau diutus atau wahyu diturunkan kepada beliau.[ref:m1162] Al-Qur'an menyebut bahwa ia diturunkan pada bulan Ramadhan.[ref:baqarah185] Menurut Ibnu Ishaq, peristiwa di Gua Hira terjadi di bulan Ramadhan.[ref:ibnuishaq]",
          "Tanggal pastinya diperselisihkan. Al-Mubarakfuri menghitung Senin, 21 Ramadhan sebelum fajar, bertepatan dengan 10 Agustus 610 M.[ref:wikirev] Di Indonesia, Nuzulul Qur'an umum diperingati setiap 17 Ramadhan.",
          "Gua Hira berada di dekat puncak Jabal Nur, sekitar 4 km di timur laut Masjidil Haram.[ref:wikinur]"
        ] },
        { id: "pendapat", judul: "Perbedaan pendapat tentang ayat pertama", isi: [
          "Jabir bin Abdullah berpendapat bahwa yang pertama turun adalah Surah Al-Muddatstsir.[ref:b4922] Namun dalam riwayat Jabir yang lain disebutkan bahwa Al-Muddatstsir turun setelah masa terhentinya wahyu, ketika Nabi ﷺ melihat malaikat \"yang dahulu mendatangiku di Hira\".[ref:b4]",
          "Karena itu mayoritas ulama memadukan kedua riwayat: Al-'Alaq 1–5 adalah ayat pertama yang turun secara mutlak, sedangkan Al-Muddatstsir adalah yang pertama turun setelah masa jeda wahyu (fatrah).[ref:itqan]"
        ] },
        { id: "kandungan", judul: "Kandungan ayat", isi: [
          "Kelima ayat ini berisi perintah membaca dengan nama Allah, penegasan bahwa Allah menciptakan manusia dari segumpal darah ('alaq), sifat Allah Yang Maha Mulia, serta bahwa Allah mengajar manusia dengan pena dan mengajarkan apa yang tidak diketahuinya."
        ] }
      ],
      lihatJuga: [
        { label: "Al-Muddatstsir 1–5", wiki: "muddatstsir-1-5", ket: "wahyu berikutnya setelah masa jeda" },
        { label: "Gua Hira", tempat: "hira", ket: "lokasi di peta" },
        { label: "Khadijah binti Khuwailid", tokoh: "khadijah" },
        { label: "Waraqah bin Naufal", tokoh: "waraqah" }
      ],
      rujukan: {
        b3: { t: "HR. Bukhari no. 3, dari Aisyah (Kitab Permulaan Wahyu).", url: sn("bukhari", 3) },
        m160: { t: "HR. Muslim no. 160, dari Aisyah (Kitab Iman).", url: sn("muslim", "160a") },
        b4953: { t: "HR. Bukhari no. 4953, dari Aisyah (Kitab Tafsir, Surah Al-'Alaq).", url: sn("bukhari", 4953) },
        b4922: { t: "HR. Bukhari no. 4922, dari Jabir bin Abdullah (Kitab Tafsir, Surah Al-Muddatstsir).", url: sn("bukhari", 4922) },
        b4: { t: "HR. Bukhari no. 4, dari Jabir bin Abdullah (Kitab Permulaan Wahyu).", url: sn("bukhari", 4) },
        b3902: { t: "HR. Bukhari no. 3902, dari Ibnu Abbas: beliau diutus pada usia 40 tahun.", url: sn("bukhari", 3902) },
        m1162: { t: "HR. Muslim no. 1162, dari Abu Qatadah: tentang puasa hari Senin.", url: sn("muslim", "1162b") },
        baqarah185: { t: "QS. Al-Baqarah: 185." },
        ibnuishaq: { t: "Ibnu Hisyam, As-Sirah an-Nabawiyyah (riwayat Ibnu Ishaq), bab permulaan wahyu." },
        itqan: { t: "As-Suyuthi, Al-Itqan fi 'Ulum al-Qur'an, pembahasan ayat yang pertama dan terakhir turun." },
        wikirev: { t: "Wikipedia, \"Muhammad's first revelation\".", url: "https://en.wikipedia.org/wiki/Muhammad%27s_first_revelation" },
        wikinur: { t: "Wikipedia, \"Jabal al-Nour\".", url: "https://en.wikipedia.org/wiki/Jabal_al-Nour" }
      }
    },
    "muddatstsir-1-5": {
      judul: "Al-Muddatstsir 1–5",
      sub: "Wahyu yang turun setelah masa jeda",
      surah: "Al-Muddatstsir", ayatNo: "1–5", tahun: 611,
      tontonan: "wahyu-kedua", peta: { tahun: 611, tempat: "hira" },
      lead: [
        "Al-Muddatstsir ayat 1–5 adalah wahyu yang turun setelah masa jeda (fatrah) yang menyusul wahyu pertama di Gua Hira.[ref:b4] Dalam riwayat Jabir bin Abdullah, Nabi ﷺ melihat malaikat yang dahulu mendatangi beliau di Hira, duduk di atas kursi di antara langit dan bumi. Beliau ketakutan, pulang, dan minta diselimuti. Lalu turunlah ayat ini.[ref:b4][ref:b4922]",
        "Ayat-ayat ini berisi perintah untuk bangkit dan memberi peringatan. Setelah itu wahyu turun berturut-turut dan tidak terputus lagi.[ref:b4]"
      ],
      infobox: [
        ["Surah", "Al-Muddatstsir (المدثر), surah ke-74 dalam mushaf"],
        ["Ayat", "1–5"],
        ["Golongan", "Makkiyah"],
        ["Urutan turun", "Pertama setelah masa jeda wahyu[ref:b4]"],
        ["Waktu", "Setelah masa fatrah, ±611 M (perkiraan; tanggal tidak disebut dalam riwayat)"],
        ["Tempat", "Saat turun dari Hira; ayat turun setelah beliau pulang ke rumah Khadijah[ref:b4922]"],
        ["Penerima", "Rasulullah ﷺ"],
        ["Perantara", "Malaikat yang sama dengan di Hira (Jibril)[ref:b4]"],
        ["Riwayat utama", "HR. Bukhari no. 4, 4922, dan 4925 (Jabir bin Abdullah)"]
      ],
      ayat: [
        { no: 1, ar: "يَا أَيُّهَا الْمُدَّثِّرُ", id: "Wahai orang yang berselimut!" },
        { no: 2, ar: "قُمْ فَأَنذِرْ", id: "Bangunlah, lalu berilah peringatan!" },
        { no: 3, ar: "وَرَبَّكَ فَكَبِّرْ", id: "Dan agungkanlah Tuhanmu," },
        { no: 4, ar: "وَثِيَابَكَ فَطَهِّرْ", id: "dan bersihkanlah pakaianmu," },
        { no: 5, ar: "وَالرُّجْزَ فَاهْجُرْ", id: "dan tinggalkanlah ar-rujz (berhala)." }
      ],
      bagian: [
        { id: "fatrah", judul: "Masa jeda wahyu", isi: [
          "Setelah peristiwa di Gua Hira dan wafatnya Waraqah bin Naufal, wahyu terhenti untuk sementara waktu.[ref:b3] Jabir bin Abdullah meriwayatkan bahwa Nabi ﷺ menceritakan peristiwa ini ketika berbicara tentang masa jeda wahyu tersebut.[ref:b4] Lamanya masa jeda ini tidak disebut dalam riwayat-riwayat di atas dan diperselisihkan ulama."
        ] },
        { id: "panggilan", judul: "Panggilan dari langit", isi: [
          "Nabi ﷺ bercerita bahwa beliau berdiam di Hira. Setelah selesai, beliau turun dan mendengar panggilan. Beliau menoleh ke kanan, ke kiri, ke depan, dan ke belakang, tetapi tidak melihat apa pun. Ketika beliau mengangkat kepala, beliau melihat sesuatu.[ref:b4922]",
          "Dalam riwayat yang lain beliau menjelaskan: yang beliau lihat adalah malaikat yang dahulu mendatangi beliau di Hira, duduk di atas kursi di antara langit dan bumi. Beliau merasa takut kepadanya.[ref:b4][ref:b4925]"
        ] },
        { id: "pulang", judul: "Pulang ke rumah Khadijah", isi: [
          "Beliau pulang menemui Khadijah dan berkata, \"Selimuti aku, dan siramkan air dingin kepadaku.\" Beliau pun diselimuti dan disirami air dingin.[ref:b4922] Dalam riwayat lain disebutkan beliau berkata, \"Selimuti aku, selimuti aku.\"[ref:b4]"
        ] },
        { id: "turun", judul: "Turunnya ayat", isi: [
          "Kemudian Allah menurunkan awal Surah Al-Muddatstsir sampai ayat kelima, \"dan tinggalkanlah ar-rujz.\" Dalam riwayat ini ar-rujz dijelaskan sebagai berhala.[ref:b4925] Setelah itu wahyu datang berturut-turut.[ref:b4]"
        ] },
        { id: "hubungan", judul: "Hubungan dengan Al-'Alaq 1–5", isi: [
          "Jabir berpendapat bahwa surah yang pertama turun adalah Al-Muddatstsir.[ref:b4922] Mayoritas ulama memadukannya dengan riwayat Jabir yang lain, yang menyebut bahwa malaikat itu adalah \"yang dahulu mendatangiku di Hira\". Jadi Al-'Alaq 1–5 adalah yang pertama turun secara mutlak, sedangkan Al-Muddatstsir yang pertama turun setelah masa jeda.[ref:b4][ref:itqan]"
        ] },
        { id: "kandungan", judul: "Kandungan ayat", isi: [
          "Kelima ayat ini menyeru Nabi ﷺ yang sedang berselimut untuk bangkit dan memberi peringatan, mengagungkan Allah, membersihkan pakaian, dan meninggalkan berhala. Ayat-ayat ini sering dipahami sebagai awal perintah berdakwah."
        ] }
      ],
      lihatJuga: [
        { label: "Al-'Alaq 1–5", wiki: "alaq-1-5", ket: "wahyu pertama" },
        { label: "Gua Hira", tempat: "hira", ket: "lokasi di peta" },
        { label: "Khadijah binti Khuwailid", tokoh: "khadijah" }
      ],
      rujukan: {
        b4: { t: "HR. Bukhari no. 4, dari Jabir bin Abdullah (Kitab Permulaan Wahyu).", url: sn("bukhari", 4) },
        b4922: { t: "HR. Bukhari no. 4922, dari Jabir bin Abdullah (Kitab Tafsir, Surah Al-Muddatstsir).", url: sn("bukhari", 4922) },
        b4925: { t: "HR. Bukhari no. 4925, dari Jabir bin Abdullah (Kitab Tafsir, ayat \"wa tsiyabaka fathahhir\").", url: sn("bukhari", 4925) },
        b3: { t: "HR. Bukhari no. 3, dari Aisyah (Kitab Permulaan Wahyu).", url: sn("bukhari", 3) },
        itqan: { t: "As-Suyuthi, Al-Itqan fi 'Ulum al-Qur'an, pembahasan ayat yang pertama dan terakhir turun." }
      }
    },
    "dhuha-1-3": {
      judul: "Ad-Dhuha 1–3",
      sub: "Ejekan saat wahyu tertunda",
      surah: "Ad-Dhuha", ayatNo: "1–3", tahun: 612,
      tontonan: "wahyu-dhuha", peta: { tahun: 612, tempat: "khadijah" },
      lead: [
        "Ad-Dhuha ayat 1–3 turun ketika wahyu tidak datang beberapa malam. Rasulullah ﷺ sedang sakit sehingga tidak bangun shalat malam selama dua atau tiga malam, lalu seorang perempuan datang mengejek bahwa \"setan\" beliau telah meninggalkannya.[ref:b4950]",
        "Allah menjawab ejekan itu dengan sumpah demi waktu dhuha dan demi malam yang sunyi: Tuhanmu tidak meninggalkanmu dan tidak membencimu.[ref:b4950][ref:m1797]"
      ],
      infobox: [
        ["Surah", "Ad-Dhuha (الضحى), surah ke-93 dalam mushaf"],
        ["Ayat", "1–3"],
        ["Golongan", "Makkiyah"],
        ["Waktu", "Tidak disebut dalam riwayat; awal periode Mekah (±612 M, perkiraan)"],
        ["Lama tertunda", "Dua atau tiga malam menurut riwayat Jundub[ref:b4950]"],
        ["Tempat", "Mekah"],
        ["Penerima", "Rasulullah ﷺ"],
        ["Yang mengejek", "Seorang perempuan (tidak disebut namanya dalam Shahih Bukhari)[ref:b4950]; dalam riwayat Muslim: kaum musyrik[ref:m1797]"],
        ["Riwayat utama", "HR. Bukhari no. 4950, 4951, 1125; HR. Muslim no. 1797 (Jundub bin Abdullah al-Bajali)"]
      ],
      ayat: [
        { no: 1, ar: "وَالضُّحَىٰ", id: "Demi waktu dhuha (ketika matahari naik sepenggalah)," },
        { no: 2, ar: "وَاللَّيْلِ إِذَا سَجَىٰ", id: "dan demi malam apabila telah sunyi," },
        { no: 3, ar: "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ", id: "Tuhanmu tidak meninggalkanmu dan tidak (pula) membencimu." }
      ],
      bagian: [
        { id: "sakit", judul: "Beliau sakit, wahyu tidak datang", isi: [
          "Jundub bin Abdullah al-Bajali meriwayatkan bahwa Rasulullah ﷺ sakit sehingga tidak bangun (untuk shalat malam) selama dua atau tiga malam.[ref:b4950]",
          "Dalam riwayat lain dari Jundub disebutkan bahwa Jibril terlambat datang kepada beliau.[ref:b1125][ref:m1797]"
        ] },
        { id: "ejekan", judul: "Ejekan seorang perempuan", isi: [
          "Lalu datang seorang perempuan dan berkata, \"Wahai Muhammad, aku berharap setanmu telah meninggalkanmu. Aku tidak melihatnya mendekatimu sejak dua atau tiga malam.\"[ref:b4950] Dalam riwayat lain, seorang perempuan Quraisy berkata, \"Setannya telah meninggalkannya.\"[ref:b1125] Dalam riwayat Muslim, yang berkata adalah kaum musyrik: \"Muhammad telah ditinggalkan.\"[ref:m1797]",
          "Shahih Bukhari tidak menyebut nama perempuan itu. Sebagian ulama menyebutkan riwayat di luar Shahih yang menamainya Ummu Jamil, istri Abu Lahab. Keterangan ini perlu diverifikasi."
        ] },
        { id: "turun", judul: "Turunnya ayat", isi: [
          "Maka Allah menurunkan: \"Demi waktu dhuha, dan demi malam apabila telah sunyi, Tuhanmu tidak meninggalkanmu dan tidak (pula) membencimu.\"[ref:b4950][ref:b1125]"
        ] },
        { id: "riwayat-lain", judul: "Riwayat lain dan perbedaan pendapat", isi: [
          "Ada riwayat dari Jundub dengan redaksi berbeda: seorang perempuan berkata, \"Wahai Rasulullah, aku melihat sahabatmu (Jibril) terlambat datang kepadamu.\" Lalu turun ayat yang sama.[ref:b4951] Sebagian ulama memahami ada dua perempuan dengan maksud berbeda: yang pertama mengejek, yang kedua merasa iba.",
          "Lama tertundanya wahyu berbeda menurut riwayat: dua atau tiga malam dalam riwayat Jundub,[ref:b4950] dan \"beberapa hari\" dalam riwayat Ibnu Abbas yang dikutip Ibnu Katsir.[ref:ik] Ada pula kisah anak anjing di bawah ranjang sebagai sebab tertundanya Jibril; kisah ini dinilai lemah oleh para ulama hadits dan tidak dipakai di sini."
        ] },
        { id: "kandungan", judul: "Kandungan ayat", isi: [
          "Ayat ini menenangkan hati Nabi ﷺ: terhentinya wahyu sesaat bukan tanda Allah meninggalkan atau membenci beliau. Sumpah demi terangnya dhuha dan sunyinya malam sering dipahami sebagai gambaran bahwa jeda dan kedatangan wahyu sama-sama dalam kehendak Allah."
        ] }
      ],
      lihatJuga: [
        { label: "Al-Muddatstsir 1–5", wiki: "muddatstsir-1-5", ket: "wahyu setelah masa jeda" },
        { label: "Al-Masad 1–5", wiki: "masad-1-5", ket: "tentang Abu Lahab dan istrinya" },
        { label: "Rumah Khadijah", tempat: "khadijah", ket: "lokasi di peta" }
      ],
      rujukan: {
        b4950: { t: "HR. Bukhari no. 4950, dari Jundub bin Sufyan (Kitab Tafsir, Surah Ad-Dhuha).", url: sn("bukhari", 4950) },
        b4951: { t: "HR. Bukhari no. 4951, dari Jundub al-Bajali (Kitab Tafsir, Surah Ad-Dhuha).", url: sn("bukhari", 4951) },
        b1125: { t: "HR. Bukhari no. 1125, dari Jundub bin Abdullah (Kitab Tahajjud).", url: sn("bukhari", 1125) },
        m1797: { t: "HR. Muslim no. 1797, dari Jundub bin Abdullah al-Bajali (Kitab Jihad).", url: "https://sunnah.com/muslim:1797a" },
        ik: { t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Surah Ad-Dhuha.", url: "https://quran.com/93:1/tafsirs/en-tafisr-ibn-kathir" }
      }
    },
    "syuara-214": {
      judul: "Asy-Syu'ara 214",
      sub: "Perintah memperingatkan kerabat terdekat",
      surah: "Asy-Syu'ara", ayatNo: "214", tahun: 613,
      tontonan: "dakwah-shafa", peta: { tahun: 613, tempat: "shafa" },
      lead: [
        "Asy-Syu'ara ayat 214 memerintahkan Rasulullah ﷺ memberi peringatan kepada kerabat terdekat. Setelah ayat ini turun, beliau naik ke Bukit Shafa dan memanggil kabilah-kabilah Quraisy.[ref:b4770][ref:b4971]",
        "Peristiwa di Bukit Shafa menandai dimulainya dakwah secara terang-terangan, dan di sana pula Abu Lahab mencela beliau, yang menjadi sebab turunnya Surah Al-Masad.[ref:b4971][ref:ih]"
      ],
      infobox: [
        ["Surah", "Asy-Syu'ara (الشعراء), surah ke-26 dalam mushaf"],
        ["Ayat", "214"],
        ["Golongan", "Makkiyah"],
        ["Waktu", "±613 M, setelah sekitar tiga tahun dakwah secara diam-diam (menurut kitab sirah)[ref:ih]"],
        ["Tempat", "Bukit Shafa, Mekah[ref:b4971]"],
        ["Yang dipanggil", "Kabilah-kabilah Quraisy, antara lain Bani Fihr dan Bani 'Adi[ref:b4770]"],
        ["Riwayat utama", "HR. Bukhari no. 4770 dan 4971 (Ibnu Abbas); HR. Bukhari no. 2753 (Abu Hurairah)"]
      ],
      ayat: [
        { no: 214, ar: "وَأَنذِرْ عَشِيرَتَكَ الْأَقْرَبِينَ", id: "Dan berilah peringatan kepada kerabat-kerabatmu yang terdekat." }
      ],
      bagian: [
        { id: "latar", judul: "Dari dakwah diam-diam ke terang-terangan", isi: [
          "Menurut kitab sirah, selama sekitar tiga tahun pertama Rasulullah ﷺ berdakwah secara diam-diam kepada orang-orang terdekat.[ref:ih] Ayat ini memerintahkan beliau memperingatkan kerabatnya secara terbuka."
        ] },
        { id: "shafa", judul: "Seruan dari atas Bukit Shafa", isi: [
          "Ibnu Abbas meriwayatkan: ketika ayat ini turun, Nabi ﷺ naik ke Bukit Shafa dan berseru, \"Wahai Bani Fihr! Wahai Bani 'Adi!\" memanggil kabilah-kabilah Quraisy hingga mereka berkumpul. Orang yang tidak bisa datang mengirim utusan untuk melihat apa yang terjadi. Abu Lahab dan orang-orang Quraisy pun datang.[ref:b4770]",
          "Beliau bertanya, \"Bagaimana pendapat kalian, jika aku kabarkan bahwa ada pasukan berkuda di lembah ini yang hendak menyerang kalian, apakah kalian akan mempercayaiku?\" Mereka menjawab, \"Ya, kami tidak pernah mendapatimu kecuali berkata benar.\" Beliau bersabda, \"Sesungguhnya aku adalah pemberi peringatan bagi kalian sebelum datangnya azab yang pedih.\"[ref:b4770][ref:b4971]"
        ] },
        { id: "keluarga", judul: "Peringatan kepada keluarga sendiri", isi: [
          "Dalam riwayat Abu Hurairah, beliau berseru kepada kaum Quraisy agar menyelamatkan diri mereka sendiri, lalu kepada Bani Abdi Manaf, Abbas bin Abdul Muthalib, bibinya Shafiyyah, dan putrinya Fatimah: \"Mintalah dari hartaku sesukamu, tetapi aku tidak dapat menolongmu sedikit pun dari Allah.\"[ref:b2753]"
        ] },
        { id: "abulahab", judul: "Jawaban Abu Lahab", isi: [
          "Abu Lahab berkata, \"Celakalah engkau sepanjang hari ini! Untuk inikah engkau mengumpulkan kami?\" Lalu turunlah Surah Al-Masad.[ref:b4770] Lihat artikel Al-Masad 1–5."
        ] },
        { id: "kandungan", judul: "Kandungan ayat", isi: [
          "Ayat ini mengajarkan bahwa dakwah dimulai dari orang terdekat, dan bahwa hubungan kekerabatan dengan Nabi tidak menyelamatkan siapa pun tanpa iman dan amalnya sendiri.[ref:b2753]"
        ] }
      ],
      lihatJuga: [
        { label: "Al-Masad 1–5", wiki: "masad-1-5", ket: "jawaban atas Abu Lahab" },
        { label: "Bukit Shafa", tempat: "shafa", ket: "lokasi di peta" },
        { label: "Abu Lahab", tokoh: "abulahab" }
      ],
      rujukan: {
        b4770: { t: "HR. Bukhari no. 4770, dari Ibnu Abbas (Kitab Tafsir, Surah Asy-Syu'ara).", url: sn("bukhari", 4770) },
        b4971: { t: "HR. Bukhari no. 4971, dari Ibnu Abbas (Kitab Tafsir, Surah Al-Masad).", url: sn("bukhari", 4971) },
        b2753: { t: "HR. Bukhari no. 2753, dari Abu Hurairah (Kitab Wasiat).", url: sn("bukhari", 2753) },
        ih: { t: "Ibnu Hisyam, As-Sirah an-Nabawiyah (dari Ibnu Ishaq), bab perintah berdakwah terang-terangan." }
      }
    },
    "masad-1-5": {
      judul: "Al-Masad 1–5",
      sub: "Jawaban atas celaan Abu Lahab",
      surah: "Al-Masad", ayatNo: "1–5", tahun: 613,
      tontonan: "dakwah-shafa", peta: { tahun: 613, tempat: "shafa" },
      lead: [
        "Surah Al-Masad (juga disebut Al-Lahab) turun setelah Abu Lahab, paman Nabi sendiri, mencela beliau di depan kabilah-kabilah Quraisy di Bukit Shafa.[ref:b4770][ref:b4971]",
        "Surah ini menyebut Abu Lahab dan istrinya dengan nama dan sifat mereka, dan memastikan nasib keduanya.[ref:ik]"
      ],
      infobox: [
        ["Surah", "Al-Masad (المسد), disebut juga Al-Lahab; surah ke-111 dalam mushaf"],
        ["Ayat", "1–5 (seluruh surah)"],
        ["Golongan", "Makkiyah"],
        ["Waktu", "±613 M, pada hari seruan di Bukit Shafa[ref:b4770]"],
        ["Tempat", "Bukit Shafa, Mekah[ref:b4971]"],
        ["Tokoh", "Abu Lahab ('Abdul 'Uzza bin Abdul Muthalib), paman Nabi; istrinya Ummu Jamil (Arwa binti Harb)[ref:ik]"],
        ["Riwayat utama", "HR. Bukhari no. 4770 dan 4971 (Ibnu Abbas)"]
      ],
      ayat: [
        { no: 1, ar: "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ", id: "Binasalah kedua tangan Abu Lahab, dan benar-benar binasa dia!" },
        { no: 2, ar: "مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ", id: "Tidaklah berguna baginya hartanya dan apa yang dia usahakan." },
        { no: 3, ar: "سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ", id: "Kelak dia akan masuk ke dalam api yang bergejolak." },
        { no: 4, ar: "وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ", id: "Dan (begitu pula) istrinya, pembawa kayu bakar." },
        { no: 5, ar: "فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ", id: "Di lehernya ada tali dari sabut." }
      ],
      bagian: [
        { id: "celaan", judul: "Celaan di Bukit Shafa", isi: [
          "Setelah Nabi ﷺ menyampaikan bahwa beliau adalah pemberi peringatan sebelum datangnya azab yang pedih, Abu Lahab berkata, \"Celakalah engkau sepanjang hari ini! Untuk inikah engkau mengumpulkan kami?\"[ref:b4770] Dalam riwayat lain disebutkan ia lalu berdiri dan pergi.[ref:b4971]",
          "Kata yang ia pakai, tabban (\"celaka\"), dijawab dengan kata yang sama di awal surah: tabbat yada Abi Lahab, \"binasalah kedua tangan Abu Lahab\".[ref:b4971]"
        ] },
        { id: "turun", judul: "Turunnya surah", isi: [
          "Maka Allah menurunkan, \"Binasalah kedua tangan Abu Lahab, dan benar-benar binasa dia!\" sampai akhir surah.[ref:b4770][ref:b4971]"
        ] },
        { id: "istri", judul: "Istri Abu Lahab, \"pembawa kayu bakar\"", isi: [
          "Ayat 4–5 menyebut istri Abu Lahab, Ummu Jamil binti Harb, saudari Abu Sufyan. Ibnu Katsir menjelaskan bahwa ia ikut memusuhi Nabi; sebagian ulama menafsirkan \"pembawa kayu bakar\" sebagai orang yang menebar fitnah, sebagian lagi sebagai orang yang meletakkan duri di jalan Nabi.[ref:ik]",
          "Ibnu Ishaq meriwayatkan bahwa setelah mendengar ayat ini, Ummu Jamil datang ke dekat Ka'bah membawa batu untuk mencari Nabi, tetapi ia tidak dapat melihat beliau yang sedang duduk bersama Abu Bakar.[ref:ih] Kisah ini dari kitab sirah, bukan hadits shahih."
        ] },
        { id: "kandungan", judul: "Kandungan dan pelajaran", isi: [
          "Surah ini menunjukkan bahwa kedudukan dan kekerabatan tidak berguna bagi orang yang memusuhi kebenaran: Abu Lahab adalah paman Nabi sendiri. Ia wafat dalam kekafiran tak lama setelah Perang Badar (624 M), sehingga surah ini terbukti tentang dirinya.[ref:ik]"
        ] }
      ],
      lihatJuga: [
        { label: "Asy-Syu'ara 214", wiki: "syuara-214", ket: "seruan di Bukit Shafa" },
        { label: "Rumah Abu Lahab", tempat: "abulahab", ket: "lokasi di peta" },
        { label: "Abu Lahab", tokoh: "abulahab" }
      ],
      rujukan: {
        b4770: { t: "HR. Bukhari no. 4770, dari Ibnu Abbas (Kitab Tafsir, Surah Asy-Syu'ara).", url: sn("bukhari", 4770) },
        b4971: { t: "HR. Bukhari no. 4971, dari Ibnu Abbas (Kitab Tafsir, Surah Al-Masad).", url: sn("bukhari", 4971) },
        ik: { t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Surah Al-Masad.", url: "https://quran.com/111:1/tafsirs/en-tafisr-ibn-kathir" },
        ih: { t: "Ibnu Hisyam, As-Sirah an-Nabawiyah (dari Ibnu Ishaq), kisah Ummu Jamil." }
      }
    },
    "abasa-1-10": {
      judul: "'Abasa 1–10",
      sub: "Teguran karena seorang tunanetra",
      surah: "'Abasa", ayatNo: "1–10", tahun: 614,
      tontonan: "abasa", peta: { tahun: 614, tempat: "kabah" },
      lead: [
        "'Abasa ayat 1–10 turun berkenaan dengan Abdullah bin Ummi Maktum, sahabat tunanetra yang datang meminta bimbingan ketika Rasulullah ﷺ sedang berbicara dengan seorang pembesar musyrikin Quraisy.[ref:t3331]",
        "Allah menegur Nabi-Nya karena bermuka masam dan berpaling dari orang yang datang dengan sungguh-sungguh, demi memberi perhatian kepada orang yang merasa dirinya cukup.[ref:t3331][ref:ik]"
      ],
      infobox: [
        ["Surah", "'Abasa (عبس), surah ke-80 dalam mushaf"],
        ["Ayat", "1–10"],
        ["Golongan", "Makkiyah"],
        ["Waktu", "Tidak disebut dalam riwayat; periode Mekah (±614 M, perkiraan)"],
        ["Tempat", "Mekah (tempat persisnya tidak disebut)"],
        ["Tokoh", "Abdullah bin Ummi Maktum; seorang pembesar musyrikin Quraisy (namanya diperselisihkan)"],
        ["Riwayat utama", "HR. Tirmidzi no. 3331 (Aisyah); Muwatha' Malik (Urwah, mursal)"],
        ["Derajat", "Tirmidzi: hasan gharib; dinilai shahih oleh Al-Albani[ref:t3331]"]
      ],
      ayat: [
        { no: 1, ar: "عَبَسَ وَتَوَلَّىٰ", id: "Dia (Muhammad) bermuka masam dan berpaling," },
        { no: 2, ar: "أَن جَاءَهُ الْأَعْمَىٰ", id: "karena seorang buta telah datang kepadanya." },
        { no: 3, ar: "وَمَا يُدْرِيكَ لَعَلَّهُ يَزَّكَّىٰ", id: "Dan tahukah engkau, barangkali dia ingin menyucikan dirinya," },
        { no: 4, ar: "أَوْ يَذَّكَّرُ فَتَنفَعَهُ الذِّكْرَىٰ", id: "atau dia ingin mendapatkan pengajaran, sehingga pengajaran itu bermanfaat baginya?" },
        { no: 5, ar: "أَمَّا مَنِ اسْتَغْنَىٰ", id: "Adapun orang yang merasa dirinya serba cukup," },
        { no: 6, ar: "فَأَنتَ لَهُ تَصَدَّىٰ", id: "maka engkau (Muhammad) memberi perhatian kepadanya," },
        { no: 7, ar: "وَمَا عَلَيْكَ أَلَّا يَزَّكَّىٰ", id: "padahal tidak ada (cela) atasmu kalau dia tidak menyucikan diri." },
        { no: 8, ar: "وَأَمَّا مَن جَاءَكَ يَسْعَىٰ", id: "Adapun orang yang datang kepadamu dengan bersegera," },
        { no: 9, ar: "وَهُوَ يَخْشَىٰ", id: "sedang dia takut (kepada Allah)," },
        { no: 10, ar: "فَأَنتَ عَنْهُ تَلَهَّىٰ", id: "engkau (Muhammad) malah mengabaikannya." }
      ],
      bagian: [
        { id: "kejadian", judul: "Datangnya Ibnu Ummi Maktum", isi: [
          "Aisyah berkata: ayat \"'Abasa wa tawalla\" turun berkenaan dengan Ibnu Ummi Maktum, orang buta itu. Ia datang kepada Rasulullah ﷺ dan berkata, \"Wahai Rasulullah, bimbinglah aku.\" Saat itu di sisi Rasulullah ﷺ ada seorang laki-laki dari pembesar musyrikin.[ref:t3331]",
          "Rasulullah ﷺ berpaling darinya dan menghadap kepada laki-laki itu, sambil berkata kepadanya, \"Apakah menurutmu ada yang salah dengan apa yang aku katakan?\" Ia menjawab, \"Tidak.\" Maka turunlah ayat ini.[ref:t3331]",
          "Ibnu Katsir menjelaskan bahwa Nabi sedang berbicara dengan pembesar itu karena sangat berharap ia masuk Islam.[ref:ik]"
        ] },
        { id: "pembesar", judul: "Siapa pembesar itu?", isi: [
          "Riwayat Tirmidzi tidak menyebut namanya.[ref:t3331] Kitab-kitab tafsir menyebut nama yang berbeda-beda, misalnya Utbah bin Rabi'ah, Abu Jahal, atau Umayyah bin Khalaf; tidak ada yang disepakati. Keterangan ini perlu diverifikasi."
        ] },
        { id: "teguran", judul: "Teguran yang lembut", isi: [
          "Ayat ini menegur dengan menyebut perbuatan, bukan dengan memanggil nama. Ibnu Katsir menyimpulkan: peringatan Al-Qur'an harus disampaikan sama rata kepada yang mulia dan yang lemah, yang kaya dan yang miskin, yang tua dan yang muda.[ref:ik]"
        ] },
        { id: "setelah", judul: "Setelah itu", isi: [
          "Ibnu Ummi Maktum tetap dekat dengan Nabi. Di Madinah ia menjadi salah satu muadzin Rasulullah ﷺ bersama Bilal.[ref:b617]"
        ] }
      ],
      lihatJuga: [
        { label: "Abdullah bin Ummi Maktum", tokoh: "ibnuummimaktum" },
        { label: "Ka'bah", tempat: "kabah", ket: "lokasi ilustrasi di peta" }
      ],
      rujukan: {
        t3331: { t: "HR. Tirmidzi no. 3331, dari Aisyah (Kitab Tafsir, Surah 'Abasa). Tirmidzi: hasan gharib; Al-Albani: shahih.", url: "https://sunnah.com/tirmidhi:3331" },
        ik: { t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Surah 'Abasa.", url: "https://quran.com/80:1/tafsirs/en-tafisr-ibn-kathir" },
        b617: { t: "HR. Bukhari no. 617, dari Abdullah bin Umar (Kitab Adzan).", url: sn("bukhari", 617) }
      }
    },
    "alaq-9-19": {
      judul: "Al-'Alaq 6–19",
      sub: "Ancaman Abu Jahal terhadap Nabi yang sedang shalat",
      surah: "Al-'Alaq", ayatNo: "6–19", tahun: 614,
      tontonan: "ancaman-abujahal", peta: { tahun: 614, tempat: "kabah" },
      lead: [
        "Al-'Alaq ayat 6–19 turun berkenaan dengan Abu Jahal, yang bersumpah akan menginjak leher Rasulullah ﷺ bila melihat beliau sujud di dekat Ka'bah. Ketika ia mendekat, ia justru mundur ketakutan.[ref:m2797][ref:b4958]",
        "Ayat-ayat ini membalas orang \"yang melarang seorang hamba ketika ia shalat\" dan ditutup dengan perintah: \"Janganlah engkau patuh kepadanya; sujudlah dan dekatkanlah dirimu (kepada Allah).\"[ref:m2797]"
      ],
      infobox: [
        ["Surah", "Al-'Alaq (العلق), surah ke-96 dalam mushaf"],
        ["Ayat", "6–19 menurut riwayat Muslim[ref:m2797] (sering disebut 9–19)"],
        ["Golongan", "Makkiyah"],
        ["Waktu", "Tidak disebut dalam riwayat; periode Mekah, setelah Nabi shalat terang-terangan di Ka'bah (±614 M, perkiraan)"],
        ["Tempat", "Dekat Ka'bah, Masjidil Haram[ref:b4958]"],
        ["Tokoh", "Abu Jahal ('Amr bin Hisyam)"],
        ["Riwayat utama", "HR. Muslim no. 2797 (Abu Hurairah); HR. Bukhari no. 4958 dan HR. Tirmidzi no. 3349 (Ibnu Abbas)"]
      ],
      ayat: [
        { no: 6, ar: "كَلَّا إِنَّ الْإِنسَانَ لَيَطْغَىٰ", id: "Sekali-kali tidak! Sungguh, manusia benar-benar melampaui batas," },
        { no: 7, ar: "أَن رَّآهُ اسْتَغْنَىٰ", id: "apabila melihat dirinya serba cukup." },
        { no: 8, ar: "إِنَّ إِلَىٰ رَبِّكَ الرُّجْعَىٰ", id: "Sungguh, hanya kepada Tuhanmulah tempat kembali." },
        { no: 9, ar: "أَرَأَيْتَ الَّذِي يَنْهَىٰ", id: "Bagaimana pendapatmu tentang orang yang melarang" },
        { no: 10, ar: "عَبْدًا إِذَا صَلَّىٰ", id: "seorang hamba ketika dia melaksanakan shalat?" },
        { no: 11, ar: "أَرَأَيْتَ إِن كَانَ عَلَى الْهُدَىٰ", id: "Bagaimana pendapatmu jika dia (yang dilarang) berada di atas petunjuk," },
        { no: 12, ar: "أَوْ أَمَرَ بِالتَّقْوَىٰ", id: "atau dia menyuruh bertakwa?" },
        { no: 13, ar: "أَرَأَيْتَ إِن كَذَّبَ وَتَوَلَّىٰ", id: "Bagaimana pendapatmu jika dia (yang melarang) itu mendustakan dan berpaling?" },
        { no: 14, ar: "أَلَمْ يَعْلَم بِأَنَّ اللَّهَ يَرَىٰ", id: "Tidakkah dia mengetahui bahwa sesungguhnya Allah melihat?" },
        { no: 15, ar: "كَلَّا لَئِن لَّمْ يَنتَهِ لَنَسْفَعًا بِالنَّاصِيَةِ", id: "Sekali-kali tidak! Sungguh, jika dia tidak berhenti, niscaya Kami tarik ubun-ubunnya," },
        { no: 16, ar: "نَاصِيَةٍ كَاذِبَةٍ خَاطِئَةٍ", id: "(yaitu) ubun-ubun orang yang mendustakan dan durhaka." },
        { no: 17, ar: "فَلْيَدْعُ نَادِيَهُ", id: "Maka biarlah dia memanggil golongannya," },
        { no: 18, ar: "سَنَدْعُ الزَّبَانِيَةَ", id: "Kami pun akan memanggil Malaikat Zabaniyah." },
        { no: 19, ar: "كَلَّا لَا تُطِعْهُ وَاسْجُدْ وَاقْتَرِب", id: "Sekali-kali tidak! Janganlah engkau patuh kepadanya; sujudlah dan dekatkanlah (dirimu kepada Allah)." }
      ],
      bagian: [
        { id: "sumpah", judul: "Sumpah Abu Jahal", isi: [
          "Abu Hurairah meriwayatkan: Abu Jahal bertanya kepada orang-orang, \"Apakah Muhammad menyungkurkan wajahnya (sujud) di hadapan kalian?\" Mereka menjawab, \"Ya.\" Ia berkata, \"Demi Lata dan Uzza, jika aku melihatnya melakukan itu, sungguh akan kuinjak lehernya, atau akan kubenamkan wajahnya ke tanah.\"[ref:m2797]"
        ] },
        { id: "mundur", judul: "Mundur ketakutan", isi: [
          "Lalu ia mendatangi Rasulullah ﷺ yang sedang shalat, bermaksud menginjak leher beliau. Tetapi tiba-tiba ia mundur sambil melindungi diri dengan kedua tangannya. Ketika ditanya, ia menjawab, \"Sesungguhnya antara aku dan dia ada parit dari api, kengerian, dan sayap-sayap.\"[ref:m2797]",
          "Rasulullah ﷺ bersabda, \"Seandainya ia mendekatiku, niscaya malaikat akan menyambarnya anggota demi anggota.\"[ref:m2797] Dalam riwayat Ibnu Abbas: \"Seandainya ia melakukannya, malaikat pasti akan menyambarnya.\"[ref:b4958]"
        ] },
        { id: "turun", judul: "Turunnya ayat", isi: [
          "Maka Allah menurunkan ayat \"Sekali-kali tidak! Sungguh, manusia benar-benar melampaui batas\" sampai akhir surah. Perawi menyebut ia tidak tahu pasti apakah bagian ini dari hadits Abu Hurairah atau dari sumber lain.[ref:m2797]"
        ] },
        { id: "nadi", judul: "\"Biarlah dia memanggil golongannya\"", isi: [
          "Ibnu Abbas meriwayatkan peristiwa yang mirip: Abu Jahal datang saat Nabi shalat dan berkata, \"Bukankah aku sudah melarangmu dari ini?\" Nabi menghardiknya. Abu Jahal berkata, \"Engkau tahu tidak ada di Mekah orang yang majelisnya (pendukungnya) lebih banyak dariku.\" Maka turun ayat 17–18. Ibnu Abbas berkata, seandainya ia memanggil golongannya, malaikat Zabaniyah pasti menyambarnya.[ref:t3349]"
        ] },
        { id: "urutan", judul: "Hubungan dengan Al-'Alaq 1–5", isi: [
          "Ayat 1–5 adalah wahyu pertama di Gua Hira. Ayat-ayat selanjutnya turun kemudian, ketika Nabi sudah shalat secara terbuka di Ka'bah dan mulai dihalangi kaum Quraisy.[ref:m2797]"
        ] }
      ],
      lihatJuga: [
        { label: "Al-'Alaq 1–5", wiki: "alaq-1-5", ket: "awal surah yang sama" },
        { label: "Ka'bah", tempat: "kabah", ket: "lokasi di peta" },
        { label: "Abu Jahal", tokoh: "abujahal" }
      ],
      rujukan: {
        m2797: { t: "HR. Muslim no. 2797, dari Abu Hurairah (Kitab Sifat Munafiqin).", url: "https://sunnah.com/muslim:2797" },
        b4958: { t: "HR. Bukhari no. 4958, dari Ibnu Abbas (Kitab Tafsir, Surah Al-'Alaq).", url: sn("bukhari", 4958) },
        t3349: { t: "HR. Tirmidzi no. 3349, dari Ibnu Abbas (Kitab Tafsir). Tirmidzi: hasan gharib shahih.", url: "https://sunnah.com/tirmidhi:3349" }
      }
    },
    "isra-1": {
      judul: "Al-Isra' 1",
      sub: "Isra' Mi'raj",
      surah: "Al-Isra'", ayatNo: "1", tahun: 621,
      tontonan: "isra-miraj", peta: { tahun: 621, tempat: "hijr" },
      lead: [
        "Al-Isra' ayat 1 menyebut perjalanan malam Rasulullah ﷺ dari Masjidil Haram ke Masjidil Aqsha. Peristiwa ini disusul Mi'raj, naiknya beliau melewati tujuh langit sampai Sidratul Muntaha, tempat shalat lima waktu diwajibkan.[ref:b3887]",
        "Ayat ini tidak turun karena satu pertanyaan atau kejadian kecil seperti kebanyakan asbabun nuzul; ia mengabarkan peristiwa itu sendiri. Keesokan harinya kaum Quraisy mendustakannya, lalu Allah menampakkan Baitul Maqdis kepada Nabi sehingga beliau bisa menggambarkannya.[ref:b3886]"
      ],
      infobox: [
        ["Surah", "Al-Isra' (الإسراء), surah ke-17 dalam mushaf"],
        ["Ayat", "1"],
        ["Golongan", "Makkiyah"],
        ["Waktu", "Diperselisihkan. Pendapat yang masyhur: 27 Rajab, sekitar satu tahun sebelum Hijrah (±621 M); Ibnu Sa'd menyebut tanggal lain[ref:wiki]"],
        ["Tempat berangkat", "Al-Hathim atau Al-Hijr di sisi Ka'bah[ref:b3887]"],
        ["Tujuan", "Masjidil Aqsha (Baitul Maqdis), lalu tujuh langit dan Sidratul Muntaha[ref:b3887]"],
        ["Kendaraan", "Buraq, hewan putih di antara bagal dan keledai[ref:b3887]"],
        ["Riwayat utama", "HR. Bukhari no. 3887 (Malik bin Sha'sha'ah) dan 3886 (Jabir bin Abdullah)"]
      ],
      ayat: [
        { no: 1, ar: "سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى الَّذِي بَارَكْنَا حَوْلَهُ لِنُرِيَهُ مِنْ آيَاتِنَا ۚ إِنَّهُ هُوَ السَّمِيعُ الْبَصِيرُ",
          id: "Mahasuci (Allah) yang telah memperjalankan hamba-Nya (Muhammad) pada malam hari dari Masjidil Haram ke Masjidil Aqsha yang telah Kami berkahi sekelilingnya, agar Kami perlihatkan kepadanya sebagian tanda-tanda (kebesaran) Kami. Sesungguhnya Dia Maha Mendengar, Maha Melihat." }
      ],
      bagian: [
        { id: "hijr", judul: "Di sisi Ka'bah", isi: [
          "Nabi ﷺ menceritakan bahwa beliau sedang berbaring di Al-Hathim (atau Al-Hijr) ketika malaikat datang. Dada beliau dibelah, hati beliau dicuci dalam bejana emas berisi iman, lalu dikembalikan.[ref:b3887]",
          "Kemudian didatangkan Buraq, hewan putih yang lebih kecil dari bagal dan lebih besar dari keledai, yang langkahnya sejauh pandangan mata.[ref:b3887]"
        ] },
        { id: "langit", judul: "Tujuh langit", isi: [
          "Jibril membawa beliau naik. Di setiap langit pintu dibukakan setelah Jibril ditanya siapa yang bersamanya. Beliau bertemu Adam di langit pertama, Yahya dan Isa di langit kedua, Yusuf di langit ketiga, Idris di langit keempat, Harun di langit kelima, Musa di langit keenam, dan Ibrahim di langit ketujuh. Masing-masing menyambut beliau.[ref:b3887]",
          "Beliau lalu dinaikkan ke Sidratul Muntaha dan diperlihatkan Baitul Ma'mur. Beliau ditawari khamar, susu, dan madu, lalu memilih susu. Jibril berkata itulah fitrah.[ref:b3887]"
        ] },
        { id: "shalat", judul: "Lima puluh menjadi lima", isi: [
          "Allah mewajibkan lima puluh shalat sehari. Musa menyarankan beliau kembali memohon keringanan karena umatnya tidak akan sanggup. Beliau kembali beberapa kali hingga menjadi lima. Ketika Musa menyarankan kembali lagi, beliau berkata malu kepada Tuhannya, dan beliau ridha serta menerima. Lalu terdengar seruan: \"Aku telah menetapkan kewajiban-Ku dan meringankan hamba-hamba-Ku.\"[ref:b3887]"
        ] },
        { id: "quraisy", judul: "Didustakan Quraisy", isi: [
          "Jabir meriwayatkan: ketika kaum Quraisy mendustakan beliau, beliau berdiri di Al-Hijr. Allah menampakkan Baitul Maqdis kepada beliau, dan beliau menceritakan tanda-tandanya sambil melihatnya.[ref:b3886]",
          "Kisah Abu Bakar yang langsung membenarkan peristiwa ini, sehingga dijuluki Ash-Shiddiq, terdapat dalam kitab sirah dan riwayat di luar Shahih Bukhari."
        ] },
        { id: "waktu", judul: "Kapan terjadinya", isi: [
          "Tanggalnya tidak disebut dalam hadits shahih. Pendapat yang masyhur di kalangan Sunni adalah 27 Rajab, sedikit lebih dari setahun sebelum Hijrah. Ibnu Sa'd mencatat tanggal lain, dan sebagian peneliti menilai 27 Rajab sebagai pilihan tanpa riwayat yang kuat.[ref:wiki]",
          "Pada masa itu kawasan Baitul Maqdis belum memiliki bangunan masjid seperti sekarang. Musalla pertama di sana dibangun di masa Umar bin Khattab.[ref:wiki]"
        ] }
      ],
      lihatJuga: [
        { label: "Hijr Ismail", tempat: "hijr", ket: "lokasi di peta" },
        { label: "Al-Baqarah 144", wiki: "baqarah-144", ket: "kiblat berpindah dari Baitul Maqdis" }
      ],
      rujukan: {
        b3887: { t: "HR. Bukhari no. 3887, dari Anas dari Malik bin Sha'sha'ah (Kitab Manaqib al-Anshar, bab Mi'raj).", url: sn("bukhari", 3887) },
        b3886: { t: "HR. Bukhari no. 3886, dari Jabir bin Abdullah (Kitab Manaqib al-Anshar, bab Isra').", url: sn("bukhari", 3886) },
        wiki: { t: "Wikipedia: Isra' and Mi'raj (merujuk Ibnu Sa'd, Ibnu Hisyam, dan Ath-Thabari).", url: "https://en.wikipedia.org/wiki/Isra%27_and_Mi%27raj" }
      }
    },
    "baqarah-144": {
      judul: "Al-Baqarah 144",
      sub: "Kiblat berpindah ke Ka'bah",
      surah: "Al-Baqarah", ayatNo: "144", tahun: 624,
      tontonan: "kiblat", peta: { tahun: 624, lok: "madinah" },
      lead: [
        "Al-Baqarah ayat 144 memerintahkan Rasulullah ﷺ dan kaum muslimin menghadap Masjidil Haram ketika shalat. Sebelumnya, selama 16 atau 17 bulan di Madinah, mereka shalat menghadap Baitul Maqdis.[ref:b4486]",
        "Ayat ini menjawab harapan Nabi, yang sering menengadahkan wajah ke langit karena ingin kiblatnya diarahkan ke Ka'bah.[ref:b4486][ref:b399]"
      ],
      infobox: [
        ["Surah", "Al-Baqarah (البقرة), surah ke-2 dalam mushaf"],
        ["Ayat", "144"],
        ["Golongan", "Madaniyah"],
        ["Waktu", "16 atau 17 bulan setelah Hijrah[ref:b4486]; menurut kitab sirah bulan Rajab atau Sya'ban 2 H (±624 M)[ref:qibla]"],
        ["Tempat", "Madinah"],
        ["Shalat pertama menghadap Ka'bah", "Shalat Ashar[ref:b4486]"],
        ["Riwayat utama", "HR. Bukhari no. 40, 399, 4486 (Al-Bara' bin 'Azib); HR. Bukhari no. 403 (Ibnu Umar)"]
      ],
      ayat: [
        { no: 144, ar: "قَدْ نَرَىٰ تَقَلُّبَ وَجْهِكَ فِي السَّمَاءِ ۖ فَلَنُوَلِّيَنَّكَ قِبْلَةً تَرْضَاهَا ۚ فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ ۚ وَحَيْثُ مَا كُنتُمْ فَوَلُّوا وُجُوهَكُمْ شَطْرَهُ",
          id: "Kami melihat wajahmu (Muhammad) sering menengadah ke langit, maka akan Kami palingkan engkau ke kiblat yang engkau senangi. Maka hadapkanlah wajahmu ke arah Masjidil Haram. Dan di mana saja kamu berada, hadapkanlah wajahmu ke arah itu. (sebagian ayat)" }
      ],
      bagian: [
        { id: "latar", judul: "Enam belas atau tujuh belas bulan", isi: [
          "Al-Bara' bin 'Azib meriwayatkan bahwa setelah tiba di Madinah, Rasulullah ﷺ shalat menghadap Baitul Maqdis selama 16 atau 17 bulan, padahal beliau ingin kiblatnya diarahkan ke Ka'bah.[ref:b4486][ref:b40]"
        ] },
        { id: "turun", judul: "Turunnya ayat dan shalat Ashar", isi: [
          "Lalu Allah menurunkan ayat ini. Shalat pertama yang beliau kerjakan menghadap Ka'bah adalah shalat Ashar, bersama sebagian sahabat.[ref:b4486]",
          "Seorang laki-laki yang ikut shalat bersama beliau lalu melewati jamaah sebuah masjid yang sedang ruku'. Ia berkata, \"Aku bersaksi demi Allah, aku telah shalat bersama Nabi menghadap Mekah.\" Mereka pun berputar menghadap Ka'bah dalam keadaan ruku'.[ref:b4486]",
          "Ibnu Umar meriwayatkan bahwa jamaah di Quba baru menerima kabar ini pada shalat Subuh keesokan harinya, lalu berputar ke arah Ka'bah.[ref:b403]"
        ] },
        { id: "tempat", judul: "Masjid Dua Kiblat", isi: [
          "Tempat jamaah yang berputar di tengah shalat kemudian dikenal sebagai Masjid Al-Qiblatain, \"masjid dua kiblat\".[ref:qibla] Hadits-hadits di atas tidak menyebut nama masjidnya."
        ] },
        { id: "ayat143", judul: "Bagaimana shalat mereka yang telah wafat?", isi: [
          "Sebagian sahabat telah wafat sebelum kiblat berpindah, dan orang-orang bertanya tentang shalat mereka. Allah menurunkan ayat 143: \"Allah tidak akan menyia-nyiakan imanmu.\"[ref:b4486]"
        ] }
      ],
      lihatJuga: [
        { label: "Al-Isra' 1", wiki: "isra-1", ket: "Baitul Maqdis" },
        { label: "Ka'bah", tempat: "kabah", ket: "kiblat kaum muslimin" }
      ],
      rujukan: {
        b4486: { t: "HR. Bukhari no. 4486, dari Al-Bara' bin 'Azib (Kitab Tafsir).", url: sn("bukhari", 4486) },
        b40: { t: "HR. Bukhari no. 40, dari Al-Bara' bin 'Azib (Kitab Iman).", url: sn("bukhari", 40) },
        b399: { t: "HR. Bukhari no. 399, dari Al-Bara' bin 'Azib (Kitab Shalat).", url: sn("bukhari", 399) },
        b403: { t: "HR. Bukhari no. 403, dari Abdullah bin Umar (Kitab Shalat).", url: sn("bukhari", 403) },
        qibla: { t: "Wikipedia: Qibla (merujuk Wensinck dan Bashori).", url: "https://en.wikipedia.org/wiki/Qibla" }
      }
    },
    "baqarah-125": {
      judul: "Al-Baqarah 125",
      sub: "Usul Umar: Maqam Ibrahim sebagai tempat shalat",
      surah: "Al-Baqarah", ayatNo: "125", tahun: 624,
      peta: { tahun: 624, tempat: "maqam" },
      lead: [
        "Sebagian Al-Baqarah ayat 125, \"Dan jadikanlah Maqam Ibrahim tempat shalat\", turun sesuai dengan usul Umar bin Khattab.[ref:b402]",
        "Umar menyebut peristiwa ini sebagai salah satu dari tiga hal ketika pendapatnya sejalan dengan wahyu yang kemudian turun.[ref:b402]"
      ],
      infobox: [
        ["Surah", "Al-Baqarah (البقرة), surah ke-2 dalam mushaf"],
        ["Ayat", "125 (bagian \"wattakhidzu min maqami Ibrahima mushalla\")"],
        ["Golongan", "Madaniyah"],
        ["Waktu", "Tidak disebut dalam riwayat; periode Madinah"],
        ["Tempat", "Tidak disebut; yang dibicarakan adalah Maqam Ibrahim di Mekah"],
        ["Tokoh", "Umar bin Khattab"],
        ["Riwayat utama", "HR. Bukhari no. 402 dan 4483 (Anas, dari Umar)"]
      ],
      ayat: [
        { no: 125, ar: "وَإِذْ جَعَلْنَا الْبَيْتَ مَثَابَةً لِّلنَّاسِ وَأَمْنًا وَاتَّخِذُوا مِن مَّقَامِ إِبْرَاهِيمَ مُصَلًّى",
          id: "Dan (ingatlah) ketika Kami menjadikan rumah (Ka'bah) tempat berkumpul dan tempat yang aman bagi manusia. Dan jadikanlah Maqam Ibrahim itu tempat shalat. (sebagian ayat)" }
      ],
      bagian: [
        { id: "usul", judul: "Usul Umar", isi: [
          "Anas meriwayatkan dari Umar: \"Aku sepakat dengan Tuhanku dalam tiga hal. Aku berkata, 'Wahai Rasulullah, seandainya kita jadikan Maqam Ibrahim tempat shalat.' Maka turunlah ayat: 'Dan jadikanlah Maqam Ibrahim tempat shalat.'\"[ref:b402]"
        ] },
        { id: "tiga", judul: "Tiga kesesuaian Umar", isi: [
          "Dua hal lainnya: usul agar istri-istri Nabi berhijab dari laki-laki, lalu turun ayat hijab; dan teguran Umar kepada istri-istri Nabi saat mereka bersatu dalam kecemburuan, lalu turun At-Tahrim ayat 5.[ref:b402]"
        ] },
        { id: "maqam", judul: "Apa itu Maqam Ibrahim", isi: [
          "Maqam Ibrahim adalah batu tempat Nabi Ibrahim berdiri ketika membangun Ka'bah. Sampai sekarang jamaah shalat dua rakaat di belakangnya setelah thawaf."
        ] }
      ],
      lihatJuga: [
        { label: "Maqam Ibrahim", tempat: "maqam", ket: "lokasi di peta" },
        { label: "Umar bin Khattab", tokoh: "umar" }
      ],
      rujukan: {
        b402: { t: "HR. Bukhari no. 402, dari Anas bin Malik dari Umar (Kitab Shalat).", url: sn("bukhari", 402) }
      }
    },
    "anfal-9": {
      judul: "Al-Anfal 9",
      sub: "Doa Nabi dan bantuan malaikat di Badar",
      surah: "Al-Anfal", ayatNo: "9", tahun: 624,
      tontonan: "badar", peta: { tahun: 624, lok: "badar" },
      lead: [
        "Al-Anfal ayat 9 turun pada hari Perang Badar, ketika Rasulullah ﷺ berdoa sungguh-sungguh memohon pertolongan Allah. Allah menjawab bahwa Dia akan membantu dengan seribu malaikat yang datang berturut-turut.[ref:m1763]"
      ],
      infobox: [
        ["Surah", "Al-Anfal (الأنفال), surah ke-8 dalam mushaf"],
        ["Ayat", "9"],
        ["Golongan", "Madaniyah"],
        ["Waktu", "17 Ramadhan 2 H (±624 M), hari Perang Badar[ref:ih]"],
        ["Tempat", "Lembah Badar, ±150 km barat daya Madinah"],
        ["Jumlah pasukan", "Kaum musyrikin 1.000 orang; kaum muslimin 319 orang[ref:m1763]"],
        ["Riwayat utama", "HR. Muslim no. 1763 (Ibnu Abbas dari Umar bin Khattab)"]
      ],
      ayat: [
        { no: 9, ar: "إِذْ تَسْتَغِيثُونَ رَبَّكُمْ فَاسْتَجَابَ لَكُمْ أَنِّي مُمِدُّكُم بِأَلْفٍ مِّنَ الْمَلَائِكَةِ مُرْدِفِينَ",
          id: "(Ingatlah) ketika kamu memohon pertolongan kepada Tuhanmu, lalu Dia mengabulkan bagimu, \"Sungguh, Aku akan mendatangkan bala bantuan kepadamu dengan seribu malaikat yang datang berturut-turut.\"" }
      ],
      bagian: [
        { id: "doa", judul: "Doa di malam dan pagi Badar", isi: [
          "Umar bin Khattab menceritakan: pada hari Badar, Rasulullah ﷺ melihat kaum musyrikin berjumlah seribu orang, sedangkan para sahabat 319 orang. Beliau menghadap kiblat, menengadahkan kedua tangan, dan terus berdoa: \"Ya Allah, penuhilah untukku apa yang Engkau janjikan kepadaku. Ya Allah, jika pasukan kecil kaum muslimin ini binasa, Engkau tidak akan disembah di muka bumi.\"[ref:m1763]",
          "Beliau berdoa begitu lama hingga selendangnya jatuh dari bahu. Abu Bakar datang, memakaikan selendang itu kembali, dan memeluk beliau dari belakang sambil berkata, \"Wahai Nabi Allah, cukuplah permohonanmu kepada Tuhanmu. Sungguh Dia akan memenuhi apa yang Dia janjikan kepadamu.\"[ref:m1763]"
        ] },
        { id: "turun", judul: "Turunnya ayat", isi: [
          "Maka Allah menurunkan ayat ini, dan Allah membantu mereka dengan para malaikat.[ref:m1763]",
          "Dalam riwayat yang sama, seorang sahabat Anshar mendengar suara cambuk dan seruan penunggang kuda, \"Majulah, Haizum!\" Nabi ﷺ membenarkannya dan bersabda, \"Itu adalah bantuan dari langit ketiga.\"[ref:m1763]"
        ] },
        { id: "akhir", judul: "Akhir pertempuran", isi: [
          "Hari itu tujuh puluh orang musyrikin terbunuh dan tujuh puluh tertawan.[ref:m1763] Di antara yang terbunuh adalah Abu Jahal."
        ] }
      ],
      lihatJuga: [
        { label: "Al-Anfal 30", wiki: "anfal-30", ket: "makar Quraisy sebelum Hijrah" },
        { label: "Abu Bakar Ash-Shiddiq", tokoh: "abubakar" }
      ],
      rujukan: {
        m1763: { t: "HR. Muslim no. 1763, dari Ibnu Abbas dari Umar bin Khattab (Kitab Jihad).", url: "https://sunnah.com/muslim:1763" },
        ih: { t: "Ibnu Hisyam, As-Sirah an-Nabawiyah, bab Perang Badar." }
      }
    },
    "anfal-30": {
      judul: "Al-Anfal 30",
      sub: "Makar Quraisy di malam Hijrah",
      surah: "Al-Anfal", ayatNo: "30", tahun: 622,
      tontonan: "makar-nadwah", peta: { tahun: 622, tempat: "nadwah" },
      lead: [
        "Al-Anfal ayat 30 mengingatkan malam ketika kaum Quraisy bermusyawarah untuk menahan, membunuh, atau mengusir Rasulullah ﷺ. Allah memberi tahu Nabi rencana itu, dan beliau keluar dari Mekah menuju gua.[ref:a3251]",
        "Surah Al-Anfal turun di Madinah setelah Perang Badar; ayat ini mengenang peristiwa menjelang Hijrah."
      ],
      infobox: [
        ["Surah", "Al-Anfal (الأنفال), surah ke-8 dalam mushaf"],
        ["Ayat", "30"],
        ["Golongan", "Madaniyah"],
        ["Waktu peristiwa", "Malam Hijrah, 622 M (bulan Shafar atau Rabi'ul Awwal menurut kitab sirah)[ref:ih]"],
        ["Waktu turun", "Setelah Perang Badar, 2 H"],
        ["Tempat", "Mekah; menurut kitab sirah musyawarahnya di Darun Nadwah[ref:ih]"],
        ["Riwayat utama", "HR. Ahmad no. 3251 (Ibnu Abbas), sanadnya dinilai hasan oleh Ibnu Hajar[ref:a3251]; HR. Bukhari no. 3905 (Aisyah)"]
      ],
      ayat: [
        { no: 30, ar: "وَإِذْ يَمْكُرُ بِكَ الَّذِينَ كَفَرُوا لِيُثْبِتُوكَ أَوْ يَقْتُلُوكَ أَوْ يُخْرِجُوكَ ۚ وَيَمْكُرُونَ وَيَمْكُرُ اللَّهُ ۖ وَاللَّهُ خَيْرُ الْمَاكِرِينَ",
          id: "Dan (ingatlah) ketika orang-orang kafir memikirkan tipu daya terhadapmu untuk menangkap dan memenjarakanmu, atau membunuhmu, atau mengusirmu. Mereka membuat tipu daya, dan Allah membalas tipu daya mereka. Allah adalah sebaik-baik pembalas tipu daya." }
      ],
      bagian: [
        { id: "musyawarah", judul: "Musyawarah di malam hari", isi: [
          "Ibnu Abbas menafsirkan ayat ini: kaum Quraisy bermusyawarah pada suatu malam di Mekah. Sebagian berkata, \"Jika pagi tiba, ikatlah dia.\" Sebagian berkata, \"Bunuhlah dia.\" Sebagian lagi berkata, \"Usirlah dia.\"[ref:a3251]",
          "Kitab sirah menyebut musyawarah itu terjadi di Darun Nadwah, dihadiri para pemuka Quraisy termasuk Abu Jahal, yang mengusulkan agar setiap kabilah mengirim seorang pemuda untuk membunuh beliau bersama-sama.[ref:ih]"
        ] },
        { id: "ali", judul: "Ali di tempat tidur Nabi", isi: [
          "Allah memberi tahu Nabi ﷺ rencana itu. Malam itu Ali bin Abi Thalib tidur di tempat tidur beliau, dan beliau keluar hingga sampai ke gua. Kaum musyrikin berjaga semalaman mengira Ali adalah Nabi.[ref:a3251]",
          "Pagi harinya mereka menyerbu dan mendapati Ali. Ketika ditanya di mana sahabatnya, Ali menjawab, \"Aku tidak tahu.\"[ref:a3251]"
        ] },
        { id: "gua", judul: "Menuju Gua Tsur", isi: [
          "Mereka mengikuti jejak sampai ke gunung, lalu melewati gua dan melihat sarang laba-laba di mulutnya. Mereka berkata, \"Seandainya ia masuk ke sini, tentu tidak ada sarang laba-laba di mulutnya.\" Nabi tinggal di gua itu tiga malam.[ref:a3251]",
          "Abu Bakar menemani beliau dalam perjalanan ini; keduanya bersembunyi di Gua Tsur selama tiga malam.[ref:b3905] Lihat juga At-Taubah 40."
        ] }
      ],
      lihatJuga: [
        { label: "Darun Nadwah", tempat: "nadwah", ket: "lokasi di peta" },
        { label: "Ali bin Abi Thalib", tokoh: "ali" },
        { label: "Al-Anfal 9", wiki: "anfal-9", ket: "surah yang sama, Perang Badar" }
      ],
      rujukan: {
        a3251: { t: "HR. Ahmad no. 3251, dari Ibnu Abbas. Ibnu Hajar menilai sanadnya hasan.", url: "https://hadithunlocked.com/ahmad:3251" },
        b3905: { t: "HR. Bukhari no. 3905, dari Aisyah (Kitab Manaqib al-Anshar, bab Hijrah).", url: sn("bukhari", 3905) },
        ih: { t: "Ibnu Hisyam, As-Sirah an-Nabawiyah (dari Ibnu Ishaq), bab Hijrah Rasulullah ﷺ." }
      }
    },
    "aliimran-128": {
      judul: "Ali 'Imran 128",
      sub: "\"Tidak ada sedikit pun urusanmu\"",
      surah: "Ali 'Imran", ayatNo: "128", tahun: 625,
      tontonan: "uhud", peta: { tahun: 625, lok: "madinah" },
      lead: [
        "Ali 'Imran ayat 128 turun setelah Perang Uhud. Ada dua riwayat shahih tentang sebabnya: ucapan Nabi ﷺ ketika wajah beliau terluka di Uhud, dan doa beliau dalam qunut shalat Subuh terhadap beberapa orang musyrikin.[ref:m1791][ref:b4069]",
        "Ayat ini menegaskan bahwa urusan akhir, apakah Allah menerima tobat mereka atau mengazab mereka, sepenuhnya milik Allah."
      ],
      infobox: [
        ["Surah", "Ali 'Imran (آل عمران), surah ke-3 dalam mushaf"],
        ["Ayat", "128"],
        ["Golongan", "Madaniyah"],
        ["Waktu", "Syawal 3 H (±625 M), Perang Uhud dan sesudahnya[ref:ih]"],
        ["Tempat", "Gunung Uhud, utara Madinah; dan Madinah"],
        ["Riwayat utama", "HR. Muslim no. 1791 (Anas); HR. Bukhari no. 4069 (Ibnu Umar)"]
      ],
      ayat: [
        { no: 128, ar: "لَيْسَ لَكَ مِنَ الْأَمْرِ شَيْءٌ أَوْ يَتُوبَ عَلَيْهِمْ أَوْ يُعَذِّبَهُمْ فَإِنَّهُمْ ظَالِمُونَ",
          id: "Itu bukan menjadi urusanmu (Muhammad), apakah Allah menerima tobat mereka, atau mengazab mereka, karena sesungguhnya mereka orang-orang zalim." }
      ],
      bagian: [
        { id: "luka", judul: "Luka di Uhud", isi: [
          "Anas meriwayatkan: pada Perang Uhud gigi seri Rasulullah ﷺ patah dan kepala beliau terluka. Beliau mengusap darah dari wajahnya dan berkata, \"Bagaimana mungkin beruntung suatu kaum yang melukai nabi mereka dan mematahkan giginya, padahal ia menyeru mereka kepada Allah?\" Maka turunlah ayat ini.[ref:m1791]"
        ] },
        { id: "qunut", judul: "Doa dalam shalat Subuh", isi: [
          "Ibnu Umar meriwayatkan: ia mendengar Rasulullah ﷺ, ketika bangkit dari ruku' pada rakaat terakhir shalat Subuh, setelah membaca \"Sami'allahu liman hamidah, Rabbana wa lakal hamd\", mendoakan laknat atas beberapa orang yang disebut namanya. Lalu turunlah ayat ini.[ref:b4069]"
        ] },
        { id: "makna", judul: "Makna ayat", isi: [
          "Para ulama memadukan kedua riwayat ini: ayat turun berkaitan dengan peristiwa Uhud dan doa beliau setelahnya. Sebagian orang yang pernah didoakan itu kemudian masuk Islam, sehingga tampak hikmah bahwa urusan hidayah ada di tangan Allah."
        ] }
      ],
      lihatJuga: [
        { label: "Ali 'Imran 144", wiki: "aliimran-144", ket: "kabar wafatnya Nabi di Uhud" }
      ],
      rujukan: {
        m1791: { t: "HR. Muslim no. 1791, dari Anas bin Malik (Kitab Jihad, bab Perang Uhud).", url: "https://sunnah.com/muslim:1791" },
        b4069: { t: "HR. Bukhari no. 4069, dari Abdullah bin Umar (Kitab Al-Maghazi).", url: sn("bukhari", 4069) },
        ih: { t: "Ibnu Hisyam, As-Sirah an-Nabawiyah, bab Perang Uhud." }
      }
    },
    "aliimran-144": {
      judul: "Ali 'Imran 144",
      sub: "\"Muhammad hanyalah seorang rasul\"",
      surah: "Ali 'Imran", ayatNo: "144", tahun: 625,
      tontonan: "uhud", peta: { tahun: 625, lok: "madinah" },
      lead: [
        "Ali 'Imran ayat 144 turun berkaitan dengan Perang Uhud, ketika tersiar kabar bahwa Rasulullah ﷺ terbunuh dan sebagian kaum muslimin goyah.[ref:ik]",
        "Tujuh tahun kemudian, ketika Nabi ﷺ benar-benar wafat, Abu Bakar membacakan ayat ini kepada orang-orang yang terguncang, dan seakan-akan mereka baru mengetahui ayat itu.[ref:b1242]"
      ],
      infobox: [
        ["Surah", "Ali 'Imran (آل عمران), surah ke-3 dalam mushaf"],
        ["Ayat", "144"],
        ["Golongan", "Madaniyah"],
        ["Waktu", "Syawal 3 H (±625 M), Perang Uhud[ref:ik]"],
        ["Tempat", "Gunung Uhud, utara Madinah"],
        ["Sebab turun", "Kabar palsu bahwa Nabi terbunuh (Tafsir Ibnu Katsir)[ref:ik]"],
        ["Dibacakan kembali", "Oleh Abu Bakar saat wafatnya Nabi, 11 H[ref:b1242]"]
      ],
      ayat: [
        { no: 144, ar: "وَمَا مُحَمَّدٌ إِلَّا رَسُولٌ قَدْ خَلَتْ مِن قَبْلِهِ الرُّسُلُ ۚ أَفَإِن مَّاتَ أَوْ قُتِلَ انقَلَبْتُمْ عَلَىٰ أَعْقَابِكُمْ ۚ وَمَن يَنقَلِبْ عَلَىٰ عَقِبَيْهِ فَلَن يَضُرَّ اللَّهَ شَيْئًا ۗ وَسَيَجْزِي اللَّهُ الشَّاكِرِينَ",
          id: "Dan Muhammad hanyalah seorang rasul; sebelumnya telah berlalu beberapa rasul. Apakah jika dia wafat atau dibunuh kamu berbalik ke belakang (murtad)? Barang siapa berbalik ke belakang, maka ia tidak akan merugikan Allah sedikit pun. Allah akan memberi balasan kepada orang-orang yang bersyukur." }
      ],
      bagian: [
        { id: "kabar", judul: "Kabar palsu di Uhud", isi: [
          "Ibnu Katsir menjelaskan: ketika kaum muslimin terdesak di Uhud dan sebagian gugur, terdengar teriakan bahwa Muhammad telah terbunuh. Ibnu Qami'ah, yang melukai beliau, juga mengaku telah membunuh beliau. Sebagian kaum muslimin mempercayainya dan semangat mereka melemah.[ref:ik]",
          "Allah menurunkan ayat ini: Muhammad hanyalah seorang rasul, sebagaimana rasul-rasul sebelumnya yang telah wafat; iman tidak boleh berbalik karena kepergian beliau.[ref:ik]"
        ] },
        { id: "wafat", judul: "Dibacakan Abu Bakar saat Nabi wafat", isi: [
          "Ketika Nabi ﷺ wafat, Abu Bakar datang, membuka wajah beliau, menciumnya, dan menangis. Ia berkata, \"Allah tidak akan menghimpun dua kematian atasmu.\"[ref:b1241]",
          "Lalu ia keluar menemui orang-orang dan berkata, \"Barang siapa menyembah Muhammad, sesungguhnya Muhammad telah wafat. Barang siapa menyembah Allah, sesungguhnya Allah Maha Hidup dan tidak akan mati.\" Kemudian ia membaca ayat ini. Orang-orang seakan-akan baru mengetahui ayat itu, dan mereka pun membacanya.[ref:b1242]"
        ] }
      ],
      lihatJuga: [
        { label: "Ali 'Imran 128", wiki: "aliimran-128", ket: "luka Nabi di Uhud" },
        { label: "Abu Bakar Ash-Shiddiq", tokoh: "abubakar" }
      ],
      rujukan: {
        ik: { t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Ali 'Imran 144–148.", url: "https://quran.com/3:144/tafsirs/en-tafisr-ibn-kathir" },
        b1241: { t: "HR. Bukhari no. 1241, dari Aisyah (Kitab Jenazah).", url: sn("bukhari", 1241) },
        b1242: { t: "HR. Bukhari no. 1242, dari Ibnu Abbas (Kitab Jenazah).", url: sn("bukhari", 1242) }
      }
    },
    "ahzab-10": {
      judul: "Al-Ahzab 10",
      sub: "Ketika musuh datang dari atas dan bawah",
      surah: "Al-Ahzab", ayatNo: "10", tahun: 627,
      tontonan: "khandaq", peta: { tahun: 627, lok: "madinah" },
      lead: [
        "Al-Ahzab ayat 10 menggambarkan Perang Khandaq, ketika pasukan sekutu (al-ahzab) mengepung Madinah dari atas dan dari bawah lembah. Aisyah menegaskan bahwa ayat ini berbicara tentang hari Khandaq.[ref:b4103]",
        "Kaum muslimin bertahan di balik parit yang mereka gali di utara Madinah."
      ],
      infobox: [
        ["Surah", "Al-Ahzab (الأحزاب), surah ke-33 dalam mushaf"],
        ["Ayat", "10 (bagian dari ayat 9–27 tentang Perang Ahzab)"],
        ["Golongan", "Madaniyah"],
        ["Waktu", "Syawal 5 H menurut Ibnu Ishaq (±627 M); Musa bin Uqbah menyebut 4 H[ref:ih]"],
        ["Tempat", "Parit di utara Madinah"],
        ["Riwayat utama", "HR. Bukhari no. 4103 (Aisyah)"]
      ],
      ayat: [
        { no: 10, ar: "إِذْ جَاءُوكُم مِّن فَوْقِكُمْ وَمِنْ أَسْفَلَ مِنكُمْ وَإِذْ زَاغَتِ الْأَبْصَارُ وَبَلَغَتِ الْقُلُوبُ الْحَنَاجِرَ وَتَظُنُّونَ بِاللَّهِ الظُّنُونَا",
          id: "(Yaitu) ketika mereka datang kepadamu dari atas dan dari bawahmu, dan ketika penglihatan(mu) terpana dan hatimu naik sampai ke tenggorokan, dan kamu berprasangka yang bukan-bukan terhadap Allah." }
      ],
      bagian: [
        { id: "aisyah", judul: "Keterangan Aisyah", isi: [
          "Aisyah berkata tentang ayat \"ketika mereka datang kepadamu dari atas dan dari bawahmu, dan ketika penglihatan terpana\": \"Itu terjadi pada hari Khandaq.\"[ref:b4103]"
        ] },
        { id: "parit", judul: "Menggali parit", isi: [
          "Menurut kitab sirah, ketika kabar datang bahwa Quraisy dan sekutunya bergerak menuju Madinah, kaum muslimin menggali parit di sisi utara kota yang terbuka. Nabi ﷺ ikut menggali dan mengangkat tanah bersama para sahabat.[ref:ih]",
          "Pengepungan berlangsung sekitar sebulan di musim dingin. Pada akhirnya Allah mengirim angin kencang dan pasukan yang tidak terlihat, sehingga pasukan sekutu pulang tanpa hasil (Al-Ahzab 9).[ref:ih]"
        ] },
        { id: "makna", judul: "\"Dari atas dan dari bawah\"", isi: [
          "Para mufassir menjelaskan \"dari atas\" sebagai arah timur atau dataran tinggi, dan \"dari bawah\" sebagai arah barat atau lembah, yaitu arah datangnya kabilah-kabilah sekutu."
        ] }
      ],
      lihatJuga: [
        { label: "Al-Anfal 9", wiki: "anfal-9", ket: "pertolongan di Badar" }
      ],
      rujukan: {
        b4103: { t: "HR. Bukhari no. 4103, dari Aisyah (Kitab Al-Maghazi, bab Perang Khandaq).", url: sn("bukhari", 4103) },
        ih: { t: "Ibnu Hisyam, As-Sirah an-Nabawiyah (dari Ibnu Ishaq), bab Perang Khandaq." }
      }
    },
    "nur-11-20": {
      judul: "An-Nur 11–20",
      sub: "Haditsul Ifki: fitnah terhadap Aisyah",
      surah: "An-Nur", ayatNo: "11–20", tahun: 627,
      tontonan: "ifki", peta: { tahun: 627, lok: "madinah" },
      lead: [
        "An-Nur ayat 11–20 turun untuk membersihkan nama Aisyah, istri Nabi ﷺ, dari tuduhan dusta (al-ifk) yang disebarkan sekelompok orang setelah sebuah ekspedisi.[ref:b4750]",
        "Selama sekitar sebulan wahyu tentang perkara ini tidak turun. Sepuluh ayat ini kemudian turun di rumah Abu Bakar, saat Aisyah menyerahkan urusannya kepada Allah dengan \"kesabaran yang indah\".[ref:b4750]"
      ],
      infobox: [
        ["Surah", "An-Nur (النور), surah ke-24 dalam mushaf"],
        ["Ayat", "11–20 (dan ayat 22 tentang Abu Bakar)"],
        ["Golongan", "Madaniyah"],
        ["Waktu", "Sepulang ekspedisi Bani Mushthaliq menurut kitab sirah, 5 atau 6 H (diperselisihkan)"],
        ["Tempat", "Madinah, di rumah Abu Bakar[ref:b4750]"],
        ["Tokoh", "Aisyah; Shafwan bin Al-Mu'aththal; Abdullah bin Ubay (penyebar utama); Abu Bakar dan Ummu Ruman"],
        ["Riwayat utama", "HR. Bukhari no. 4750 (Aisyah)"]
      ],
      ayat: [
        { no: 11, ar: "إِنَّ الَّذِينَ جَاءُوا بِالْإِفْكِ عُصْبَةٌ مِّنكُمْ ۚ لَا تَحْسَبُوهُ شَرًّا لَّكُم ۖ بَلْ هُوَ خَيْرٌ لَّكُمْ",
          id: "Sesungguhnya orang-orang yang membawa berita bohong itu adalah dari golongan kamu (juga). Janganlah kamu mengira berita itu buruk bagi kamu, bahkan itu baik bagi kamu. (sebagian ayat)" },
        { no: 12, ar: "لَّوْلَا إِذْ سَمِعْتُمُوهُ ظَنَّ الْمُؤْمِنُونَ وَالْمُؤْمِنَاتُ بِأَنفُسِهِمْ خَيْرًا وَقَالُوا هَٰذَا إِفْكٌ مُّبِينٌ",
          id: "Mengapa orang-orang mukmin dan mukminat tidak berbaik sangka terhadap diri mereka sendiri ketika kamu mendengar berita bohong itu, dan berkata, \"Ini adalah berita bohong yang nyata\"?" }
      ],
      bagian: [
        { id: "kalung", judul: "Kalung yang hilang", isi: [
          "Aisyah menceritakan: ia ikut dalam sebuah ekspedisi setelah turun perintah hijab. Dalam perjalanan pulang, ia keluar sebentar dari rombongan untuk suatu keperluan. Kalungnya putus dan ia mencarinya, sehingga tertinggal. Orang-orang yang mengangkat sekedupnya mengira ia ada di dalam, karena tubuhnya ringan, lalu rombongan berangkat.[ref:b4750]",
          "Shafwan bin Al-Mu'aththal, yang berjalan di belakang pasukan, menemukannya pagi hari. Ia mengucapkan \"Inna lillahi wa inna ilaihi raji'un\", menundukkan untanya, lalu menuntunnya sampai menyusul pasukan di siang terik. Keduanya tidak berbicara sepatah kata pun.[ref:b4750]"
        ] },
        { id: "fitnah", judul: "Fitnah menyebar", isi: [
          "Orang-orang yang binasa karena perkara ini pun membicarakannya; pemimpin mereka adalah Abdullah bin Ubay bin Salul. Aisyah jatuh sakit sebulan di Madinah tanpa mengetahui apa yang beredar; ia hanya merasa Nabi tidak selembut biasanya.[ref:b4750]",
          "Ia baru mengetahuinya dari Ummu Misthah. Sakitnya bertambah, dan ia meminta izin pulang ke rumah orang tuanya. Ia menangis dua malam dan satu hari tanpa henti.[ref:b4750]"
        ] },
        { id: "musyawarah", judul: "Nabi bertanya kepada orang-orang terdekat", isi: [
          "Karena wahyu tidak turun, Nabi ﷺ meminta pendapat Ali bin Abi Thalib dan Usamah bin Zaid. Usamah berkata ia hanya mengetahui kebaikan. Barirah, pembantu Aisyah, berkata ia tidak pernah melihat sesuatu yang tercela, kecuali Aisyah masih muda dan kadang tertidur hingga adonan dimakan kambing. Zainab binti Jahsy juga berkata ia hanya mengetahui kebaikan.[ref:b4750]"
        ] },
        { id: "sabar", judul: "\"Fashabrun jamil\"", isi: [
          "Nabi ﷺ datang ke rumah Abu Bakar, duduk, dan berkata, \"Wahai Aisyah, jika engkau bersih, Allah akan membersihkanmu. Jika engkau melakukan dosa, mohonlah ampun kepada Allah dan bertobatlah.\"[ref:b4750]",
          "Kedua orang tuanya tidak sanggup menjawab. Aisyah berkata, \"Demi Allah, aku tidak menemukan perumpamaan untukku dan kalian kecuali ucapan ayah Nabi Yusuf: 'Maka kesabaran yang indah (itulah yang terbaik), dan Allah tempat memohon pertolongan atas apa yang kalian ceritakan.'\"[ref:b4750]"
        ] },
        { id: "turun", judul: "Turunnya sepuluh ayat", isi: [
          "Sebelum beliau beranjak, wahyu turun. Keringat bercucuran dari beliau seperti mutiara meski di hari yang dingin. Setelah itu beliau tersenyum, dan kalimat pertama yang beliau ucapkan adalah, \"Wahai Aisyah, adapun Allah, Dia telah membersihkanmu.\"[ref:b4750]",
          "Ibunya berkata, \"Berdirilah kepada beliau.\" Aisyah menjawab, \"Demi Allah, aku tidak akan berdiri kepadanya dan aku tidak memuji kecuali Allah.\" Allah menurunkan sepuluh ayat, \"Sesungguhnya orang-orang yang membawa berita bohong itu...\".[ref:b4750]"
        ] },
        { id: "misthah", judul: "Abu Bakar dan Misthah", isi: [
          "Abu Bakar, yang biasa menafkahi kerabatnya Misthah, bersumpah tidak akan menafkahinya lagi karena Misthah ikut membicarakan fitnah itu. Lalu turun ayat 22: \"Hendaklah mereka memaafkan dan berlapang dada. Tidakkah kamu ingin Allah mengampunimu?\" Abu Bakar berkata, \"Tentu, demi Allah, aku ingin Allah mengampuniku,\" lalu kembali menafkahi Misthah.[ref:b4750]"
        ] }
      ],
      lihatJuga: [
        { label: "Aisyah binti Abu Bakar", tokoh: "aisyah" },
        { label: "Abu Bakar Ash-Shiddiq", tokoh: "abubakar" }
      ],
      rujukan: {
        b4750: { t: "HR. Bukhari no. 4750, dari Aisyah (Kitab Tafsir, Surah An-Nur).", url: sn("bukhari", 4750) }
      }
    },
    "fath-1": {
      judul: "Al-Fath 1",
      sub: "Kemenangan yang nyata, sepulang dari Hudaibiyah",
      surah: "Al-Fath", ayatNo: "1", tahun: 628,
      tontonan: "fath", peta: { tahun: 628, lok: "makkah" },
      lead: [
        "Surah Al-Fath turun pada malam hari dalam perjalanan pulang dari Hudaibiyah. Nabi ﷺ bersabda, \"Malam ini telah turun kepadaku sebuah surah yang lebih aku cintai daripada apa pun yang disinari matahari.\"[ref:b4177]",
        "Perjanjian Hudaibiyah, yang terasa berat bagi para sahabat, disebut Allah sebagai \"kemenangan yang nyata\".[ref:b4172]"
      ],
      infobox: [
        ["Surah", "Al-Fath (الفتح), surah ke-48 dalam mushaf"],
        ["Ayat", "1"],
        ["Golongan", "Madaniyah"],
        ["Waktu", "Dzulqa'dah 6 H (±628 M), malam hari sepulang dari Hudaibiyah[ref:b1778][ref:b4177]"],
        ["Tempat", "Di perjalanan antara Hudaibiyah dan Madinah"],
        ["Tokoh", "Umar bin Khattab"],
        ["Riwayat utama", "HR. Bukhari no. 4177 (Aslam dari Umar); HR. Bukhari no. 4172 (Anas)"]
      ],
      ayat: [
        { no: 1, ar: "إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا", id: "Sungguh, Kami telah memberikan kepadamu kemenangan yang nyata." }
      ],
      bagian: [
        { id: "umar", judul: "Tiga pertanyaan Umar", isi: [
          "Aslam meriwayatkan: Rasulullah ﷺ sedang dalam perjalanan pada malam hari, dan Umar bin Khattab berjalan bersama beliau. Umar bertanya tentang sesuatu, tetapi beliau tidak menjawab. Ia bertanya lagi, tidak dijawab; bertanya ketiga kalinya, tetap tidak dijawab.[ref:b4177]",
          "Umar berkata kepada dirinya sendiri, \"Celakalah engkau, Umar. Engkau telah mendesak Rasulullah tiga kali dan beliau tidak menjawabmu.\" Ia memacu untanya ke depan rombongan, khawatir turun ayat Al-Qur'an tentang dirinya.[ref:b4177]"
        ] },
        { id: "turun", judul: "\"Lebih aku cintai dari apa pun yang disinari matahari\"", isi: [
          "Tidak lama kemudian seseorang memanggilnya. Umar datang dan mengucapkan salam. Nabi ﷺ bersabda, \"Malam ini telah turun kepadaku sebuah surah yang lebih aku cintai daripada apa pun yang disinari matahari.\" Lalu beliau membaca, \"Sungguh, Kami telah memberikan kepadamu kemenangan yang nyata.\"[ref:b4177]"
        ] },
        { id: "hudaibiyah", judul: "Kemenangan berupa perjanjian", isi: [
          "Anas berkata bahwa \"kemenangan\" dalam ayat ini adalah Perjanjian Hudaibiyah.[ref:b4172] Saat itu kaum muslimin batal berumrah dan menerima syarat-syarat yang terasa berat. Dua tahun kemudian perjanjian ini membuka jalan bagi Fathu Makkah."
        ] }
      ],
      lihatJuga: [
        { label: "Umar bin Khattab", tokoh: "umar" },
        { label: "An-Nashr 1–3", wiki: "nashr-1-3", ket: "Fathu Makkah" }
      ],
      rujukan: {
        b4177: { t: "HR. Bukhari no. 4177, dari Zaid bin Aslam dari ayahnya (Kitab Al-Maghazi, bab Hudaibiyah).", url: sn("bukhari", 4177) },
        b4172: { t: "HR. Bukhari no. 4172, dari Anas bin Malik (Kitab Al-Maghazi).", url: sn("bukhari", 4172) },
        b1778: { t: "HR. Bukhari no. 1778, dari Anas: umrah Hudaibiyah di bulan Dzulqa'dah.", url: sn("bukhari", 1778) }
      }
    }
  };

  window.NUZUL = { urutan, artikel };
})();
