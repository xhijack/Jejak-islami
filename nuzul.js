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
    { id: "dhuha-1-3", ev: "dhuha", a: 0 },
    { id: "syuara-214", ev: "shafa", a: 0 },
    { id: "masad-1-5", ev: "shafa", a: 1 },
    { id: "abasa-1-10", ev: "abasa", a: 0 },
    { id: "alaq-9-19", tempat: "kabah", r: "Ancaman Abu Jahal" },
    { id: "isra-1", ev: "isra", a: 0, waktu: "Diperselisihkan, ±1 tahun sebelum Hijrah" },
    { id: "baqarah-144", ev: "kiblat", a: 0, waktu: "16 atau 17 bulan setelah Hijrah (2 H)", ws: "HR. Bukhari no. 40 (Al-Bara' bin 'Azib)", wu: sn("bukhari", 40) },
    { id: "baqarah-125", tempat: "maqam", r: "Usul Umar" },
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
    }
  };

  window.NUZUL = { urutan, artikel };
})();
