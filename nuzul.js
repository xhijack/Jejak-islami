// Ensiklopedia Asbabun Nuzul: urutan kejadian turunnya ayat dan artikel bergaya ensiklopedia.
// Artikel "lengkap" ditulis satu per satu; entri lain sementara berupa ringkasan dari data peristiwa yang sudah ada.
// DRAF: semua isi wajib diverifikasi ustadz sebelum dipakai.
(function () {
  const sn = (k, n) => `https://sunnah.com/${k}:${n}`;

  // Urutan kejadian menurut waktu turunnya ayat. ev = id peristiwa di data.js (a = indeks ayat);
  // tempat = id tempat di kota Mekah (r = judul riwayat).
  // waktu: bulan/tanggal bila ada sumbernya (ws = sumber, wu = tautan). Yang diperselisihkan ditulis begitu.
  const urutan = [
    { id: "alaq-1-5", s: 96, waktu: "Senin, Ramadhan 610 M" },
    { id: "muddatstsir-1-5", s: 74, ev: "muddatstsir", a: 0, waktu: "Setelah masa jeda wahyu, ±611 M" },
    { id: "dhuha-1-3", s: 93, ev: "dhuha", a: 0, waktu: "Tidak disebut; awal periode Mekah (±612 M, perkiraan)" },
    { id: "jin-1-2", s: 72, waktu: "Diperselisihkan: awal kenabian (±612 M, perkiraan) atau sepulang dari Thaif (±620 M)", ws: "Ibnu Hajar, Fath al-Bari 8/670–672; Ibnu Katsir, tafsir Al-Ahqaf 29", wu: "https://shamela.ws/book/1673/5018" },
    { id: "syuara-214", s: 26, ev: "shafa", a: 0, waktu: "±613 M, awal dakwah terang-terangan (menurut kitab sirah)" },
    { id: "masad-1-5", s: 111, ev: "shafa", a: 1, waktu: "±613 M, hari seruan di Bukit Shafa" },
    { id: "abasa-1-10", s: 80, ev: "abasa", a: 0, waktu: "Tidak disebut; periode Mekah (±614 M, perkiraan)" },
    { id: "alaq-9-19", s: 96, tempat: "kabah", r: "Ancaman Abu Jahal", waktu: "Tidak disebut; periode Mekah (±614 M, perkiraan)" },
    { id: "isra-110", s: 17, waktu: "Awal Islam, ketika Nabi ﷺ masih bersembunyi di Mekah (Ibnu Hajar); tahunnya tidak disebut (±614 M, perkiraan)", ws: "Ibnu Hajar, Fath al-Bari 8/405", wu: "https://shamela.ws/book/1673/4752" },
    { id: "anam-52", s: 6, waktu: "Tidak disebut; periode Mekah (±617 M, perkiraan)" },
    { id: "qamar-1-2", s: 54, waktu: "Sekitar lima tahun sebelum Hijrah (±617 M), menurut Ibnu Hajar", ws: "Ibnu Hajar, Fath al-Bari 6/632", wu: "https://shamela.ws/book/1673/3826" },
    { id: "fushshilat-22", s: 41, waktu: "Tidak disebut; periode Mekah (±618 M, perkiraan)" },
    { id: "qashash-56", s: 28, waktu: "Menjelang wafat Abu Thalib, ±619 M (tahun ke-10 kenabian); waktu turunnya At-Taubah 113 dibahas ulama", ws: "Ibnu Hajar, Fath al-Bari 8/508", wu: "https://shamela.ws/book/1673/4855" },
    { id: "isra-1", s: 17, ev: "isra", a: 0, waktu: "Diperselisihkan; antara lain ±1 tahun sebelum Hijrah", ws: "Al-Qurthubi dan Ibnu Katsir, tafsir Al-Isra' 1; Ibnu Hajar, Fath al-Bari 8/670", wu: "https://quran.com/17:1/tafsirs/ar-tafseer-al-qurtubi" },
    { id: "isra-85", s: 17, waktu: "Diperselisihkan: di Madinah setelah Hijrah (riwayat Ibnu Mas'ud) atau di Mekah (riwayat Ibnu Abbas); tahunnya tidak disebut, 623 M di peta hanya perkiraan" },
    { id: "kautsar-1-3", s: 108, waktu: "Diperselisihkan: di Madinah menurut hadits Anas (Muslim), atau di Mekah menurut riwayat Al-'Ash bin Wa'il; tahunnya tidak disebut, 623 M di peta hanya perkiraan" },
    { id: "baqarah-144", s: 2, ev: "kiblat", a: 0, waktu: "16 atau 17 bulan setelah Hijrah (2 H)", ws: "HR. Bukhari no. 40 (Al-Bara' bin 'Azib)", wu: sn("bukhari", 40) },
    { id: "baqarah-125", s: 2, tempat: "maqam", r: "Usul Umar", waktu: "Tidak pasti; periode Madinah (624 M di peta hanya perkiraan)" },
    { id: "baqarah-187", s: 2, waktu: "2 H (±624 M), di masa awal kewajiban puasa Ramadhan; tanggalnya tidak disebut" },
    { id: "anfal-9", s: 8, ev: "badar", a: 0, waktu: "17 Ramadhan 2 H, hari Perang Badar", ws: "Sirah Ibnu Hisyam" },
    { id: "anfal-1", s: 8, waktu: "Seusai Perang Badar, Ramadhan 2 H (±624 M)" },
    { id: "anfal-30", s: 8, tempat: "nadwah", r: "Rencana membunuh Nabi", waktu: "Ayat turun setelah Badar (2 H); peristiwanya menjelang Hijrah",
      catatan: "Surah Al-Anfal turun tentang Perang Badar (HR. Bukhari no. 4645); ayat ini mengingatkan peristiwa menjelang Hijrah." },
    { id: "nisa-95", s: 4, waktu: "Tidak disebut dalam hadits Zaid; menurut Ibnu Abbas berkaitan dengan Perang Badar (2 H, ±624 M, perkiraan)", ws: "HR. Bukhari no. 4595 (Ibnu Abbas)", wu: "https://sunnah.com/bukhari:4595" },
    { id: "jumuah-11", s: 62, waktu: "Tidak disebut dalam riwayat; periode Madinah (±624 M, perkiraan)" },
    { id: "aliimran-128", s: 3, ev: "uhud", a: 0, waktu: "Syawal 3 H, Perang Uhud", ws: "Sirah Ibnu Hisyam" },
    { id: "aliimran-144", s: 3, ev: "uhud", a: 1, waktu: "Syawal 3 H, Perang Uhud", ws: "Sirah Ibnu Hisyam" },
    { id: "nisa-11", s: 4, waktu: "Setelah Perang Uhud (Syawal 3 H) menurut riwayat dua putri Sa'ad bin Ar-Rabi'; riwayat Jabir tidak menyebut waktunya" },
    { id: "hasyr-9", s: 59, waktu: "Tidak disebut dalam riwayat; Surah Al-Hasyr turun tentang Bani Nadhir (±625 M, perkiraan)", ws: "Muqbil, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 206 (riwayat Ibnu Abbas)", wu: "https://shamela.ws/book/11547/201" },
    { id: "mujadilah-1-4", s: 58, waktu: "Tidak disebut dalam riwayat; periode Madinah (±626 M, perkiraan)" },
    { id: "ahzab-10", s: 33, ev: "khandaq", a: 0, waktu: "Syawal 5 H menurut pendapat yang masyhur; Musa bin 'Uqbah: 4 H", ws: "Ibnu Katsir, tafsir Al-Ahzab 9–10", wu: "https://quran.com/33:10/tafsirs/en-tafisr-ibn-kathir" },
    { id: "ahzab-37", s: 33, waktu: "Menjelang pernikahan Nabi ﷺ dengan Zainab: Dzulqa'dah 5 H (±627 M) menurut Qatadah dan Al-Waqidi; ada yang menyebut 3 H", ws: "Ibnu Katsir, tafsir Al-Ahzab 53", wu: "https://quran.com/33:53/tafsirs/ar-tafsir-ibn-kathir" },
    { id: "munafiqun-1-8", s: 63, waktu: "Ghazwah Bani al-Mushthaliq menurut ahli maghazi (tahunnya diperselisihkan: 4, 5, atau 6 H); sebagian riwayat menyebut Ghazwah Tabuk", ws: "Ibnu Hajar, Fath al-Bari 8/644", wu: "https://shamela.ws/book/1673/4991" },
    { id: "nur-11-20", s: 24, ev: "ifki", a: 0, waktu: "Sepulang ghazwah Bani al-Mushthaliq; 4, 5, atau 6 H (diperselisihkan)", ws: "Al-Qurthubi, tafsir An-Nur 11 (6 H menurut Ibnu Ishaq, 4 H menurut Musa bin 'Uqbah)", wu: "https://quran.com/24:11/tafsirs/ar-tafseer-al-qurtubi" },
    { id: "baqarah-196", s: 2, waktu: "Dzulqa'dah 6 H (±628 M), di Hudaibiyah", ws: "HR. Bukhari no. 1778 (Anas) dan 4191 (Ka'ab bin 'Ujrah)", wu: "https://sunnah.com/bukhari:4191" },
    { id: "fath-1", s: 48, ev: "hudaibiyah", a: 0, waktu: "Dzulqa'dah 6 H, sepulang dari Hudaibiyah", ws: "HR. Bukhari no. 1778 (Anas): umrah Hudaibiyah di bulan Dzulqa'dah", wu: sn("bukhari", 1778) },
    { id: "tahrim-1-4", s: 66, waktu: "Tidak disebut dalam riwayat; periode Madinah, ketika Zainab binti Jahsy sudah menjadi istri Nabi ﷺ (±629 M, perkiraan)" },
    { id: "nashr-1-3", s: 110, ev: "fathu", a: 0, waktu: "Diperselisihkan: sekitar Fathu Makkah dan Hunain (8 H), atau hari tasyriq Haji Wada' (10 H)" },
    { id: "taubah-40", s: 9, ev: "tsur", a: 0, waktu: "Ayat turun 9 H, masa seruan Perang Tabuk; peristiwanya saat Hijrah (622 M)" },
    { id: "nur-6-9", s: 24, waktu: "Sya'ban 9 H, saat Nabi ﷺ kembali dari Tabuk, menurut Ath-Thabari (dinukil Al-Qurthubi); hadits-haditsnya tidak menyebut tahun", ws: "Al-Qurthubi, tafsir An-Nur 6 (menukil Ath-Thabari)", wu: "https://quran.com/24:6/tafsirs/ar-tafseer-al-qurtubi" },
    { id: "taubah-118", s: 9, ev: "tabuk", a: 0, waktu: "9 H, setelah Perang Tabuk (berangkat Rajab menurut Ibnu Ishaq)", ws: "Sirah Ibnu Hisyam" },
    { id: "taubah-84", s: 9, waktu: "Dzulqa'dah 9 H, saat Abdullah bin Ubay wafat sepulang Perang Tabuk", ws: "Ibnu Hajar, Fath al-Bari 8/334 (menukil Al-Waqidi dan Al-Hakim dalam Al-Iklil)", wu: "https://shamela.ws/book/1673/4681" },
    { id: "hujurat-2", s: 49, ev: "wufud", a: 0, waktu: "9 H, saat rombongan Bani Tamim datang (tahun para utusan)" },
    { id: "maidah-3", s: 5, ev: "wada", a: 0, waktu: "Jumat, hari Arafah (9 Dzulhijjah) 10 H, saat Haji Wada'", ws: "HR. Bukhari no. 45 (Umar bin Khattab)", wu: sn("bukhari", 45) }
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
        ["Tempat", "Gua Hira, Jabal Nur, Mekah[ref:rahiq18]"],
        ["Penerima", "Rasulullah ﷺ, usia 40 tahun[ref:b3902]"],
        ["Perantara", "Malaikat (Jibril)[ref:b3]"],
        ["Riwayat utama", "HR. Bukhari no. 3, 4953, dan 4956; HR. Muslim no. 160"]
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
          "Riwayat-riwayat berbeda dalam panjang kutipannya: Shahih Bukhari no. 3 mengutip hingga ayat 3, Shahih Bukhari no. 4956 hingga ayat 4, sedangkan Shahih Muslim no. 160 dan Shahih Bukhari no. 4953 hingga ayat 5.[ref:b3][ref:b4956][ref:m160][ref:b4953]"
        ] },
        { id: "setelah", judul: "Setelah turunnya ayat", isi: [
          "Rasulullah ﷺ pulang dengan hati yang gemetar dan menemui Khadijah sambil berkata, \"Selimuti aku, selimuti aku!\" Beliau diselimuti hingga rasa takutnya hilang, lalu menceritakan kejadian itu dan berkata bahwa beliau khawatir terhadap dirinya.[ref:b3]",
          "Khadijah menenangkan beliau: \"Sekali-kali tidak. Demi Allah, Allah tidak akan menghinakanmu selamanya.\" Ia menyebut sifat-sifat beliau: menyambung silaturahim, menanggung beban orang lain, memberi orang yang tidak punya, memuliakan tamu, dan menolong orang yang tertimpa musibah di jalan kebenaran.[ref:b3]",
          "Khadijah kemudian membawa beliau kepada sepupunya, Waraqah bin Naufal, yang di masa jahiliyah memeluk Nasrani dan menulis kitab. Dalam riwayat Bukhari ia disebut menulis dengan aksara Ibrani, sedangkan dalam riwayat Muslim dengan tulisan Arab.[ref:b3][ref:m160] Setelah mendengar cerita beliau, Waraqah berkata bahwa yang datang adalah an-Namus yang dahulu Allah turunkan kepada Musa, dan bahwa kaum beliau kelak akan mengusir beliau. Tidak lama kemudian Waraqah wafat dan wahyu terhenti untuk sementara waktu.[ref:b3]"
        ] },
        { id: "waktu", judul: "Waktu dan tempat", isi: [
          "Nabi ﷺ menyebut hari Senin sebagai hari beliau dilahirkan dan hari beliau diutus atau wahyu diturunkan kepada beliau.[ref:m1162] Al-Qur'an menyebut bahwa ia diturunkan pada bulan Ramadhan.[ref:baqarah185] Menurut Ibnu Ishaq, peristiwa di Gua Hira terjadi di bulan Ramadhan.[ref:ibnuishaq]",
          "Tanggal pastinya diperselisihkan. Al-Mubarakfuri, dengan menghitung hari Senin di bulan Ramadhan tahun itu, menyimpulkan bahwa peristiwa ini terjadi pada malam 21 Ramadhan, bertepatan dengan 10 Agustus 610 M.[ref:rahiq19][ref:rahiq20] Di Indonesia, Nuzulul Qur'an umum diperingati setiap 17 Ramadhan.",
          "Menurut Al-Mubarakfuri, Gua Hira berada di Jabal Nur, sekitar dua mil dari Mekah.[ref:rahiq18]"
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
        b4956: { t: "HR. Bukhari no. 4956, dari Aisyah (Kitab Tafsir, bab \"Iqra' wa rabbukal-akram\").", url: sn("bukhari", 4956) },
        rahiq18: { t: "Shafiyyurrahman Al-Mubarakfuri, Ar-Rahiq al-Makhtum (ma'a ziyadat), bab \"Fi Ghar Hira'\".", url: "https://usul.ai/t/the-sealed-nectar-with-additions/18" },
        rahiq19: { t: "Shafiyyurrahman Al-Mubarakfuri, Ar-Rahiq al-Makhtum (ma'a ziyadat), bab turunnya wahyu pertama.", url: "https://usul.ai/t/the-sealed-nectar-with-additions/19" },
        rahiq20: { t: "Shafiyyurrahman Al-Mubarakfuri, Ar-Rahiq al-Makhtum (ma'a ziyadat), perhitungan hari Senin di bulan Ramadhan.", url: "https://usul.ai/t/the-sealed-nectar-with-additions/20" }
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
        { id: "riwayat-lain", judul: "Riwayat lain tentang sebab turunnya", isi: [
          "Ibnu Katsir juga menukil riwayat Ath-Thabarani dari Ibnu Abbas: Al-Walid bin al-Mughirah menjamu para pembesar Quraisy, lalu mereka sepakat menyebut Nabi ﷺ penyihir. Beliau bersedih, menutup kepala, dan berselimut, kemudian turun ayat 1–7. Ibnu Katsir tidak memberi penilaian atas riwayat ini.[ref:ik] Al-Qurthubi membawakan kisah serupa yang terjadi di Darun Nadwah.[ref:qurthubi]",
          "Riwayat Jabir di atas tercantum dalam Shahih Bukhari dan Shahih Muslim, dan Ibnu Katsir memakai riwayat Jabir itu untuk memadukan keterangan tentang wahyu pertama dan wahyu setelah masa jeda.[ref:b4][ref:ik]"
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
        itqan: { t: "As-Suyuthi, Al-Itqan fi 'Ulum al-Qur'an, pembahasan ayat yang pertama dan terakhir turun." },
        ik: { t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim (teks Arab), tafsir Al-Muddatstsir 1.", url: "https://quran.com/74:1/tafsirs/ar-tafsir-ibn-kathir" },
        qurthubi: { t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Al-Muddatstsir 1.", url: "https://quran.com/74:1/tafsirs/ar-tafseer-al-qurtubi" }
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
        ["Lama tertunda", "Satu, dua, atau tiga malam; lafaz riwayat Jundub berbeda-beda[ref:b4950][ref:b4983]"],
        ["Tempat", "Mekah"],
        ["Penerima", "Rasulullah ﷺ"],
        ["Yang mengejek", "Seorang perempuan (tidak disebut namanya dalam Shahih Bukhari)[ref:b4950]; dalam riwayat Muslim: kaum musyrik[ref:m1797]; dalam riwayat Al-Hakim: istri Abu Lahab, yang oleh Ibnu Hajar disebut Ummu Jamil[ref:durr][ref:muharrar]"],
        ["Riwayat utama", "HR. Bukhari no. 4950, 4951, 4983, 1125; HR. Muslim no. 1797 (Jundub bin Abdullah al-Bajali)"]
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
          "Shahih Bukhari tidak menyebut nama perempuan itu. Dalam riwayat Al-Hakim dari Zaid bin Arqam, ia adalah istri Abu Lahab,[ref:durr] dan Ibnu Hajar menyebut namanya Ummu Jamil binti Harb.[ref:muharrar] Keterangan \"istri Abu Lahab\" dalam terjemahan Inggris hadits Bukhari ini di sunnah.com adalah tambahan penerjemah, bukan bagian teks Arabnya.[ref:b4950]"
        ] },
        { id: "turun", judul: "Turunnya ayat", isi: [
          "Maka Allah menurunkan: \"Demi waktu dhuha, dan demi malam apabila telah sunyi, Tuhanmu tidak meninggalkanmu dan tidak (pula) membencimu.\"[ref:b4950][ref:b1125]"
        ] },
        { id: "riwayat-lain", judul: "Riwayat lain dan perbedaan pendapat", isi: [
          "Ada riwayat dari Jundub dengan redaksi berbeda: seorang perempuan berkata, \"Wahai Rasulullah, aku melihat sahabatmu (Jibril) terlambat datang kepadamu.\" Lalu turun ayat yang sama.[ref:b4951] Ibnu Hajar memahami ada dua perempuan dengan maksud berbeda: yang pertama mengejek, yang kedua merasa iba.[ref:humaidan]",
          "Dalam riwayat mursal Hisyam bin 'Urwah dari ayahnya, dan dalam riwayat Abdullah bin Syaddad, perempuan yang iba itu adalah Khadijah.[ref:wahidi][ref:lubab] Pentahqiq kitab Al-Wahidi menilai riwayat 'Urwah itu mursal dengan sanad shahih, dan As-Suyuthi menyebut riwayat Abdullah bin Syaddad mursal dengan perawi yang tsiqah.[ref:humaidan][ref:lubab] Namun Ibnu Katsir menilai riwayat Khadijah mursal dan menduga penyebutan Khadijah di dalamnya tidak mahfuzh (tidak terjaga).[ref:ikar]",
          "Lama tertundanya wahyu juga berbeda menurut riwayat: satu atau dua malam, atau dua atau tiga malam, menurut lafaz-lafaz riwayat Jundub,[ref:b4983][ref:b4950] dan \"beberapa hari\" dalam riwayat Ibnu Abbas yang dikutip Ibnu Katsir.[ref:ik]",
          "Ada pula kisah anak anjing yang mati di bawah ranjang sebagai sebab tertundanya Jibril, yang dibawakan Al-Wahidi dari Khaulah, pelayan Nabi ﷺ.[ref:wahidi] Al-Qurthubi menegaskan bahwa riwayat Bukhari dari Jundub adalah yang paling shahih tentang sebab turunnya ayat ini,[ref:qurthubi] sehingga kisah anak anjing tidak dipakai di sini."
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
        b4983: { t: "HR. Bukhari no. 4983 dan 1124, dari Jundub: \"satu atau dua malam\" (dikutip Al-Mausu'ah al-Haditsiyyah, Ad-Durar as-Saniyyah).", url: "https://dorar.net/h/KVph6dnj?sims=1" },
        ik: { t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim (ringkasan Inggris), tafsir Surah Ad-Dhuha.", url: "https://quran.com/93:1/tafsirs/en-tafisr-ibn-kathir" },
        ikar: { t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim (teks Arab), tafsir Ad-Dhuha 1.", url: "https://quran.com/93:1/tafsirs/ar-tafsir-ibn-kathir" },
        qurthubi: { t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Ad-Dhuha 3.", url: "https://quran.com/93:3/tafsirs/ar-tafseer-al-qurtubi" },
        wahidi: { t: "Al-Wahidi, Asbab an-Nuzul, Surah Ad-Dhuha (terjemahan Mokrane Guezzou).", url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=93&Ayah=1&search=yes&img=A&LanguageID=2" },
        humaidan: { t: "Al-Wahidi, Asbab Nuzul al-Qur'an, tahqiq 'Isham al-Humaidan, Surah Ad-Dhuha (takhrij dan catatan pentahqiq).", url: "https://shamela.ws/book/11314/454" },
        lubab: { t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 333: riwayat Abdullah bin Syaddad (dikutip Al-Mausu'ah al-Haditsiyyah, Ad-Durar as-Saniyyah).", url: "https://dorar.net/h/hk6zZ7W4" },
        durr: { t: "As-Suyuthi, Ad-Durr al-Mantsur, tafsir Ad-Dhuha (memuat riwayat Al-Hakim dari Zaid bin Arqam).", url: "https://quranpedia.net/surah/4/93/book/273" },
        muharrar: { t: "Khalid al-Muzaini, Al-Muharrar fi Asbab Nuzul al-Qur'an min Khilal al-Kutub at-Tis'ah, Surah Ad-Dhuha (mengutip Ibnu Hajar).", url: "https://quranpedia.net/surah/4/93/book/460" }
      }
    },
    "jin-1-2": {
      judul: "Al-Jinn 1–2",
      sub: "Jin mendengarkan Al-Qur'an di Nakhlah",
      surah: "Al-Jinn", ayatNo: "1–2", tahun: 612,
      peta: { tahun: 612, lok: "nakhlah" },
      lead: [
        "Al-Jinn ayat 1–2 turun mengabarkan bahwa sekelompok jin telah mendengarkan Al-Qur'an, lalu beriman. Menurut Ibnu Abbas, mereka mendengarnya di Nakhlah, ketika Rasulullah ﷺ bersama sebagian sahabat dalam perjalanan menuju Pasar 'Ukazh dan sedang mengimami mereka shalat Subuh.[ref:b4921][ref:m449]",
        "Saat itu Nabi ﷺ tidak membacakan Al-Qur'an kepada jin dan tidak melihat mereka; beliau mengetahuinya dari wahyu ini.[ref:m449] Peristiwa ini berbeda dengan \"malam jin\" yang diriwayatkan Ibnu Mas'ud, ketika beliau didatangi penyeru dari kalangan jin lalu membacakan Al-Qur'an kepada mereka.[ref:m450a][ref:nawawi]"
      ],
      infobox: [
        ["Surah", "Al-Jinn (الجن), surah ke-72 dalam mushaf"],
        ["Ayat", "1–2"],
        ["Golongan", "Makkiyah; Al-Qurthubi menyebutnya disepakati[ref:qurthubi]"],
        ["Waktu", "Diperselisihkan. Ibnu Katsir dan Ibnu Hajar: awal kenabian (±612 M, perkiraan)[ref:ik46][ref:fath672]; Ibnu Ishaq dan Ibnu Sa'd: Dzulqa'dah tahun ke-10 kenabian, sepulang dari Thaif[ref:fath]"],
        ["Tempat", "Nakhlah, di jalan menuju Pasar 'Ukazh[ref:b4921]; 'Ukazh berada di lembah antara Mekah dan Thaif[ref:fath671]"],
        ["Saat kejadian", "Shalat Subuh berjamaah bersama sebagian sahabat[ref:b773]"],
        ["Yang mendengar", "Sekelompok (nafar) jin; jumlah dan asalnya berbeda menurut riwayat tafsir, antara lain tujuh atau sembilan, dari Nashibin atau Ninawa[ref:ik46][ref:qurthubi]"],
        ["Riwayat utama", "HR. Bukhari no. 773 dan 4921; HR. Muslim no. 449; HR. Tirmidzi no. 3323 (Ibnu Abbas)"],
        ["Derajat", "Shahih; Tirmidzi: hasan shahih[ref:t3323]"]
      ],
      ayat: [
        { no: 1, ar: "قُلْ أُوحِيَ إِلَيَّ أَنَّهُ اسْتَمَعَ نَفَرٌ مِّنَ الْجِنِّ فَقَالُوا إِنَّا سَمِعْنَا قُرْآنًا عَجَبًا", id: "Katakanlah (Muhammad), \"Telah diwahyukan kepadaku bahwa sekumpulan jin telah mendengarkan (bacaan),\" lalu mereka berkata, \"Kami telah mendengarkan bacaan yang menakjubkan (Al-Qur'an)," },
        { no: 2, ar: "يَهْدِي إِلَى الرُّشْدِ فَآمَنَّا بِهِ ۖ وَلَن نُّشْرِكَ بِرَبِّنَا أَحَدًا", id: "(yang) memberi petunjuk kepada jalan yang benar, lalu kami beriman kepadanya. Dan kami sekali-kali tidak akan mempersekutukan sesuatu pun dengan Tuhan kami.\"" }
      ],
      bagian: [
        { id: "langit", judul: "Langit dijaga, jin mencari sebabnya", isi: [
          "Ibnu Abbas meriwayatkan: ketika itu setan-setan telah dihalangi dari berita langit dan dilempari nyala api (syihab). Mereka kembali kepada kaumnya, yang lalu menyimpulkan bahwa pasti ada sesuatu yang baru terjadi, dan menyuruh mereka menjelajahi timur dan barat bumi untuk mencari sebabnya.[ref:b773][ref:b4921]",
          "Dalam riwayat Ibnu Abbas yang lain disebutkan bahwa jin dahulu naik ke langit untuk mencuri dengar wahyu. Setelah Rasulullah ﷺ diutus, mereka dihalangi dari tempat-tempat itu.[ref:t3324]"
        ] },
        { id: "nakhlah", judul: "Di Nakhlah, saat shalat Subuh", isi: [
          "Rombongan yang menuju Tihamah mendapati Nabi ﷺ di Nakhlah, dalam perjalanan ke Pasar 'Ukazh, sedang shalat Subuh bersama para sahabatnya. Ketika mendengar Al-Qur'an, mereka menyimaknya dan menyadari bahwa inilah yang menghalangi mereka dari berita langit.[ref:b4921][ref:m449]",
          "Mereka pulang kepada kaumnya dan berkata, \"Sungguh, kami telah mendengar bacaan yang menakjubkan, yang memberi petunjuk kepada jalan yang benar, lalu kami beriman kepadanya, dan kami tidak akan mempersekutukan Tuhan kami dengan siapa pun.\"[ref:b4921]"
        ] },
        { id: "turun", judul: "Turunnya ayat", isi: [
          "Lalu Allah menurunkan kepada Nabi-Nya, \"Katakanlah (Muhammad), 'Telah diwahyukan kepadaku bahwa sekumpulan jin telah mendengarkan (bacaan).'\" Ibnu Abbas menjelaskan bahwa yang diwahyukan kepada beliau adalah ucapan jin itu.[ref:b4921][ref:b773]",
          "Dalam riwayat Muslim, Ibnu Abbas membuka kisahnya dengan menegaskan bahwa Rasulullah ﷺ tidak membacakan Al-Qur'an kepada jin dan tidak melihat mereka.[ref:m449] Ath-Thabari juga membawakan riwayat Adh-Dhahhak bahwa beliau tidak mengetahui kehadiran mereka sampai wahyu ini turun.[ref:thabari] Ibnu Hajar mencatat bahwa Al-Bukhari tidak memuat kalimat penafian itu, dan menduga sebabnya: riwayat Ibnu Mas'ud yang menetapkan bahwa beliau membacakan Al-Qur'an kepada jin lebih didahulukan.[ref:fath]",
          "Khalid al-Muzaini, yang meneliti riwayat sebab turun dalam sembilan kitab hadits, menyimpulkan bahwa hadits Ibnu Abbas inilah sebab turunnya ayat: sanadnya shahih, tegas menyebut sebab, sesuai dengan konteks ayat, dan disepakati para mufassir.[ref:muharrar]"
        ] },
        { id: "waktu", judul: "Kapan peristiwa ini terjadi", isi: [
          "Hadits Ibnu Abbas tidak menyebut tahunnya. Ibnu Ishaq, dari Yazid bin Ruman dari Muhammad bin Ka'b al-Qurazhi, menceritakan bahwa Nabi ﷺ bermalam di Nakhlah sepulang dari Thaif dan membaca Al-Qur'an, lalu sekelompok jin dari Nashibin mendengarkannya.[ref:ik46] Menurut Ibnu Hajar, Ibnu Ishaq dan Ibnu Sa'd menempatkannya pada Dzulqa'dah tahun ke-10 kenabian.[ref:fath] Riwayat tabi'in tentang sebab turun seperti ini berstatus mursal.[ref:itqan]",
          "Ibnu Katsir menilai inti kisah Ibnu Ishaq itu shahih, tetapi keterangan bahwa jin mendengarkan pada malam itu \"perlu ditinjau\": jin mendengarkan Al-Qur'an di awal masa wahyu, sebagaimana ditunjukkan hadits Ibnu Abbas, sedangkan perjalanan ke Thaif terjadi setelah wafatnya Abu Thalib, setahun atau dua tahun sebelum Hijrah.[ref:ik46] An-Nawawi menukil pendapat para ulama bahwa kisah Ibnu Abbas terjadi di awal kenabian, sedangkan kisah Ibnu Mas'ud terjadi lama sesudahnya.[ref:nawawi]",
          "Ibnu Hajar mula-mula menyebut shalat Subuh dalam hadits ini sebagai penguat waktu Thaif, karena shalat fardhu disyariatkan pada malam Isra'. Namun ia mencatat kesulitannya: ketika ke Thaif, Nabi ﷺ hanya ditemani Zaid bin Haritsah, sedangkan hadits ini menyebut sekelompok sahabat.[ref:fath] Pada pembahasan berikutnya ia menyimpulkan bahwa kedua kisah berbeda waktunya. Jin dihalangi dari langit sejak awal kenabian, dan \"shalat Subuh\" di sini bisa berarti shalat di waktu fajar sebelum shalat lima waktu diwajibkan. Ia juga menyebut datangnya jin itu sebelum Nabi ﷺ keluar ke Thaif.[ref:fath671] Ia menutup dengan menyatakan bahwa kisah ini terjadi di awal kenabian, dan itulah pendapat yang dipegang.[ref:fath672]",
          "Di sini peristiwa ini ditempatkan di awal periode Mekah; tahun ±612 M hanya perkiraan. Ibnu Hajar memandang kisah Ibnu Ishaq sepulang dari Thaif sebagai kisah lain yang berbeda waktunya,[ref:fath671] dan Ibnu Katsir menyebut kemungkinan utusan jin datang berkali-kali.[ref:ik46]"
        ] },
        { id: "ibnumasud", judul: "Malam jin: kisah Ibnu Mas'ud", isi: [
          "Alqamah pernah bertanya kepada Ibnu Mas'ud apakah ada di antara mereka yang menyertai Rasulullah ﷺ pada malam jin. Ia menjawab tidak. Suatu malam mereka kehilangan beliau, mencarinya di lembah-lembah dan celah-celah bukit, dan khawatir beliau diculik atau dibunuh diam-diam, sehingga mereka melewati malam yang paling buruk.[ref:m450a]",
          "Pagi harinya beliau datang dari arah Hira dan bersabda, \"Penyeru dari kalangan jin datang kepadaku, lalu aku pergi bersamanya dan membacakan Al-Qur'an kepada mereka.\" Beliau lalu memperlihatkan bekas-bekas mereka dan bekas api mereka. Mereka meminta bekal, dan beliau menyebut tulang dan kotoran hewan sebagai bekal bagi mereka dan hewan mereka; karena itu beliau melarang beristinja dengan keduanya.[ref:m450a]",
          "Ibnu Mas'ud berkata, \"Aku tidak bersama Rasulullah ﷺ pada malam jin, dan aku ingin sekali bersama beliau.\"[ref:m450d] Masruq menyampaikan dari Ibnu Mas'ud bahwa yang memberi tahu Nabi ﷺ tentang kehadiran jin pada malam mereka mendengarkan Al-Qur'an adalah sebatang pohon.[ref:b3859] Abu Hurairah juga meriwayatkan datangnya utusan jin dari Nashibin yang meminta bekal, yang beliau sebut sebaik-baik jin.[ref:b3860]",
          "Ada pula riwayat di luar Shahih bahwa Ibnu Mas'ud ikut menemani beliau ke Al-Hajun; Ibnu Katsir dan Al-Qurthubi membawakannya.[ref:ik46][ref:qurthubi] Riwayat Muslim di atas menegaskan bahwa tidak seorang pun dari mereka bersama beliau.[ref:m450a]"
        ] },
        { id: "ahqaf", judul: "Hubungan dengan Al-Ahqaf 29–32", isi: [
          "Al-Ahqaf ayat 29–32 juga menceritakan serombongan jin yang dihadapkan kepada Nabi ﷺ untuk mendengarkan Al-Qur'an, lalu kembali memberi peringatan kepada kaumnya. Ibnu Katsir menghimpun seluruh riwayat kisah jin di tafsir ayat tersebut, termasuk hadits Ibnu Abbas di atas.[ref:ik46]",
          "Al-Baihaqi memadukannya begini: yang diceritakan Ibnu Abbas adalah saat pertama jin mendengar bacaan Nabi ﷺ, ketika beliau tidak membacakan kepada mereka dan tidak melihat mereka; setelah itu datang penyeru jin, lalu beliau membacakan Al-Qur'an kepada mereka.[ref:ik46][ref:qurthubi] Ibnu Katsir menambahkan bahwa beragamnya jumlah jin dalam riwayat-riwayat itu mungkin menunjukkan bahwa utusan mereka datang berkali-kali. Ia juga menukil Abdul Aziz bin Umar bahwa jin di Nakhlah berasal dari Ninawa, sedangkan jin di Mekah berasal dari Nashibin.[ref:ik46]"
        ] },
        { id: "kandungan", judul: "Kandungan ayat", isi: [
          "Kedua ayat ini memerintahkan Nabi ﷺ menyampaikan bahwa sekelompok jin telah mendengarkan Al-Qur'an, mengakui bahwa bacaan itu menakjubkan, beriman, dan bertekad tidak mempersekutukan Allah. Tafsir Ringkas Kemenag menjelaskan bahwa kabar ini sampai kepada beliau melalui Jibril, dan bahwa bacaan itu menakjubkan dari kata-kata maupun kandungannya.[ref:kemenag] Ibnu Katsir menyebut jin yang beriman itu menjadi pemberi peringatan bagi kaumnya.[ref:ik46]"
        ] }
      ],
      lihatJuga: [
        { label: "Al-Muddatstsir 1–5", wiki: "muddatstsir-1-5", ket: "awal masa wahyu" },
        { label: "Al-Isra' 1", wiki: "isra-1", ket: "shalat lima waktu diwajibkan" },
        { label: "Gua Hira", tempat: "hira", ket: "arah datangnya Nabi pada pagi malam jin" },
        { label: "Abdullah bin Abbas", tokoh: "ibnuabbas" },
        { label: "Abdullah bin Mas'ud", tokoh: "ibnumasud" }
      ],
      rujukan: {
        b4921: { t: "HR. Bukhari no. 4921, dari Ibnu Abbas (Kitab Tafsir, Surah Al-Jinn).", url: sn("bukhari", 4921) },
        b773: { t: "HR. Bukhari no. 773, dari Ibnu Abbas (Kitab Adzan, bab mengeraskan bacaan shalat Subuh).", url: sn("bukhari", 773) },
        m449: { t: "HR. Muslim no. 449, dari Ibnu Abbas (Kitab Shalat, bab mengeraskan bacaan Subuh dan membaca kepada jin).", url: sn("muslim", 449) },
        t3323: { t: "HR. Tirmidzi no. 3323, dari Ibnu Abbas (Kitab Tafsir, Surah Al-Jinn). Tirmidzi: hasan shahih.", url: sn("tirmidhi", 3323) },
        t3324: { t: "HR. Tirmidzi no. 3324, dari Ibnu Abbas (Kitab Tafsir, Surah Al-Jinn). Tirmidzi: hasan shahih.", url: sn("tirmidhi", 3324) },
        m450a: { t: "HR. Muslim no. 450a, dari Alqamah dari Ibnu Mas'ud (Kitab Shalat).", url: sn("muslim", "450a") },
        m450d: { t: "HR. Muslim no. 450d, dari Alqamah dari Ibnu Mas'ud (Kitab Shalat).", url: sn("muslim", "450d") },
        b3859: { t: "HR. Bukhari no. 3859, dari Masruq dari Ibnu Mas'ud (Kitab Manaqib al-Anshar, bab tentang jin); juga HR. Muslim no. 450e.", url: sn("bukhari", 3859) },
        b3860: { t: "HR. Bukhari no. 3860, dari Abu Hurairah (Kitab Manaqib al-Anshar, bab tentang jin).", url: sn("bukhari", 3860) },
        ik46: { t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Al-Ahqaf 29 (memuat riwayat Ibnu Abbas, Ibnu Mas'ud, Ibnu Ishaq, dan Al-Baihaqi).", url: "https://quran.com/46:29/tafsirs/ar-tafsir-ibn-kathir" },
        thabari: { t: "Ath-Thabari, Jami' al-Bayan, tafsir Al-Jinn 1.", url: "https://quran.com/72:1/tafsirs/ar-tafsir-al-tabari" },
        qurthubi: { t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Al-Jinn 1.", url: "https://quran.com/72:1/tafsirs/ar-tafseer-al-qurtubi" },
        fath: { t: "Ibnu Hajar, Fath al-Bari 8/670 (Kitab Tafsir, Surah Al-Jinn).", url: "https://shamela.ws/book/1673/5017" },
        fath671: { t: "Ibnu Hajar, Fath al-Bari 8/671 (Kitab Tafsir, Surah Al-Jinn).", url: "https://shamela.ws/book/1673/5018" },
        fath672: { t: "Ibnu Hajar, Fath al-Bari 8/672 (Kitab Tafsir, Surah Al-Jinn).", url: "https://shamela.ws/book/1673/5019" },
        nawawi: { t: "An-Nawawi, Syarh Shahih Muslim 4/167 (bab mengeraskan bacaan Subuh dan membaca kepada jin).", url: "https://shamela.ws/book/1711/878" },
        itqan: { t: "As-Suyuthi, Al-Itqan fi 'Ulum al-Qur'an 1/117, bab sebab turun (riwayat tabi'in berstatus mursal).", url: "https://shamela.ws/book/11728/110" },
        muharrar: { t: "Khalid al-Muzaini, Al-Muharrar fi Asbab Nuzul al-Qur'an min Khilal al-Kutub at-Tis'ah, Surah Al-Jinn.", url: "https://quranpedia.net/surah/1/72/book/460" },
        kemenag: { t: "Tafsir Ringkas Kemenag RI, Al-Jinn 1 (dimuat ulang di TafsirWeb).", url: "https://tafsirweb.com/11441-surat-al-jin-ayat-1.html" }
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
        ["Riwayat utama", "HR. Bukhari no. 4770 dan 4971, HR. Muslim no. 208 (Ibnu Abbas); HR. Bukhari no. 2753 (Abu Hurairah)"]
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
          "Beliau bertanya, \"Bagaimana pendapat kalian, jika aku kabarkan bahwa ada pasukan berkuda di lembah ini yang hendak menyerang kalian, apakah kalian akan mempercayaiku?\" Mereka menjawab, \"Ya, kami tidak pernah mendapatimu kecuali berkata benar.\" Beliau bersabda, \"Sesungguhnya aku adalah pemberi peringatan bagi kalian sebelum datangnya azab yang keras.\"[ref:b4770][ref:b4971]"
        ] },
        { id: "keluarga", judul: "Peringatan kepada keluarga sendiri", isi: [
          "Dalam riwayat Abu Hurairah, beliau berseru kepada kaum Quraisy agar menyelamatkan diri mereka sendiri, lalu kepada Bani Abdi Manaf, Abbas bin Abdul Muthalib, bibinya Shafiyyah, dan putrinya Fatimah: \"Mintalah dari hartaku sesukamu, tetapi aku tidak dapat menolongmu sedikit pun dari Allah.\"[ref:b2753]",
          "Ath-Thabari dan Ibnu Katsir juga membawakan riwayat dari Ali bin Abi Thalib tentang jamuan untuk sekitar empat puluh orang Bani Abdul Muthalib: Abu Lahab memotong pembicaraan Nabi ﷺ, dan Ali menyatakan siap membantu beliau.[ref:thabari][ref:ik] Salah satu perawi jalur Ibnu Ishaq dalam riwayat ini, Abdul Ghaffar bin al-Qasim Abu Maryam, disebut Ibnu Katsir matruk (ditinggalkan), pendusta, dan syi'i, dan Ali bin al-Madini menuduhnya memalsukan hadits.[ref:ik] Adapun seruan di Bukit Shafa diriwayatkan dalam Shahih Bukhari dan Shahih Muslim.[ref:b4770][ref:m208]"
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
        m208: { t: "HR. Muslim no. 208, dari Ibnu Abbas (dikutip Al-Mausu'ah al-Haditsiyyah, Ad-Durar as-Saniyyah).", url: "https://dorar.net/h/YywFJAGb" },
        ik: { t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim (teks Arab), tafsir Asy-Syu'ara 214.", url: "https://quran.com/26:214/tafsirs/ar-tafsir-ibn-kathir" },
        thabari: { t: "Ath-Thabari, Jami' al-Bayan, tafsir Asy-Syu'ara 214.", url: "https://quran.com/26:214/tafsirs/ar-tafsir-al-tabari" },
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
          "Setelah Nabi ﷺ menyampaikan bahwa beliau adalah pemberi peringatan sebelum datangnya azab yang keras, Abu Lahab berkata, \"Celakalah engkau sepanjang hari ini! Untuk inikah engkau mengumpulkan kami?\"[ref:b4770] Dalam riwayat lain disebutkan ia lalu berdiri dan pergi.[ref:b4971]",
          "Kata yang ia pakai, tabban (\"celaka\"), dijawab dengan kata yang sama di awal surah: tabbat yada Abi Lahab, \"binasalah kedua tangan Abu Lahab\".[ref:b4971]"
        ] },
        { id: "turun", judul: "Turunnya surah", isi: [
          "Maka Allah menurunkan, \"Binasalah kedua tangan Abu Lahab, dan benar-benar binasa dia!\" sampai akhir surah.[ref:b4770][ref:b4971]"
        ] },
        { id: "riwayat-lain", judul: "Riwayat lain tentang sebab turunnya", isi: [
          "Al-Qurthubi menyebut riwayat Bukit Shafa dari Shahih Bukhari dan Shahih Muslim sebagai sebab turunnya surah ini, lalu menambahkan riwayat lain dari kalangan tabi'in. Menurut Ibnu Zaid, Abu Lahab bertanya apa imbalannya jika ia beriman, lalu berkata, \"Celakalah agama seperti ini.\" Menurut Abdurrahman bin Kaisan, Abu Lahab menghalangi para utusan yang datang ingin menemui Nabi ﷺ.[ref:qurthubi][ref:thabari]",
          "Al-Wahidi juga membawakan versi lain kisah celaan Abu Lahab dari jalur Al-Kalbi dari Abu Shalih; pentahqiq kitabnya menilai sanad versi itu sangat lemah (dha'if jiddan).[ref:humaidan]"
        ] },
        { id: "istri", judul: "Istri Abu Lahab, \"pembawa kayu bakar\"", isi: [
          "Ayat 4–5 menyebut istri Abu Lahab, Ummu Jamil binti Harb, saudari Abu Sufyan.[ref:qurthubi] Ibnu Katsir menjelaskan bahwa ia ikut memusuhi Nabi ﷺ. Tentang makna \"pembawa kayu bakar\", ia menukil beberapa penafsiran: penebar fitnah (Mujahid dan Qatadah), orang yang meletakkan duri di jalan Nabi (riwayat Al-'Aufi dan Ibnu Zaid), serta penjelasan yang ia kedepankan: kelak di neraka ia membawa kayu bakar untuk menambah azab suaminya.[ref:ik]",
          "Ibnu Ishaq meriwayatkan bahwa setelah mendengar ayat ini, Ummu Jamil datang ke dekat Ka'bah membawa batu untuk mencari Nabi, tetapi ia tidak dapat melihat beliau yang sedang duduk bersama Abu Bakar.[ref:ih] Ibnu Katsir juga membawakan kisah ini dari riwayat Ibnu Abi Hatim (dari Asma' binti Abi Bakar) dan Al-Bazzar (dari Ibnu Abbas); Al-Bazzar berkata ia tidak mengetahui sanad yang lebih baik untuk kisah ini.[ref:ik5] Al-Qurthubi menyebutnya sebagai tambahan dalam riwayat Al-Humaidi.[ref:qurthubi] Kisah ini tidak terdapat dalam Shahih Bukhari dan Shahih Muslim."
        ] },
        { id: "kandungan", judul: "Kandungan dan pelajaran", isi: [
          "Surah ini menunjukkan bahwa kedudukan dan kekerabatan tidak berguna bagi orang yang memusuhi kebenaran: Abu Lahab adalah paman Nabi sendiri. Ibnu Katsir menukil catatan para ulama bahwa surah ini termasuk mukjizat, karena Abu Lahab dan istrinya tidak pernah beriman, sesuai kabar surah ini.[ref:ik5] Menurut kitab sirah, Abu Lahab wafat dalam kekafiran tak lama setelah Perang Badar (624 M)."
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
        ik: { t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim (ringkasan Inggris), tafsir Surah Al-Masad.", url: "https://quran.com/111:1/tafsirs/en-tafisr-ibn-kathir" },
        ik5: { t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim (teks Arab), tafsir Al-Masad 2–5.", url: "https://quran.com/111:5/tafsirs/ar-tafsir-ibn-kathir" },
        thabari: { t: "Ath-Thabari, Jami' al-Bayan, tafsir Al-Masad 1.", url: "https://quran.com/111:1/tafsirs/ar-tafsir-al-tabari" },
        qurthubi: { t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Al-Masad 1.", url: "https://quran.com/111:1/tafsirs/ar-tafseer-al-qurtubi" },
        humaidan: { t: "Al-Wahidi, Asbab Nuzul al-Qur'an, tahqiq 'Isham al-Humaidan, Surah Al-Masad (takhrij pentahqiq).", url: "https://shamela.ws/book/11314/466" },
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
        ["Riwayat utama", "HR. Tirmidzi no. 3331 (Aisyah)[ref:t3331]; Muwaththa' Malik (dari 'Urwah, mursal)[ref:muwatha]"],
        ["Derajat", "Diperselisihkan. Riwayat Aisyah: hasan gharib menurut At-Tirmidzi; shahih sesuai syarat Bukhari-Muslim menurut Al-Hakim; shahih al-isnad menurut Al-Albani[ref:t3331][ref:hakim]. Adz-Dzahabi dan Muqbil menilai yang benar adalah mursal (dari 'Urwah)[ref:muallah]. Kisahnya dikuatkan riwayat Anas (Abu Ya'la) yang dimuat Muqbil dalam Ash-Shahih al-Musnad min Asbab an-Nuzul[ref:muqbil]"]
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
          "Riwayat Tirmidzi tidak menyebut namanya.[ref:t3331] Riwayat-riwayat lain menyebut nama yang berbeda-beda. Dalam riwayat Anas (Abu Ya'la), ia adalah Ubay bin Khalaf; Al-Wadi'i menyebut para perawi riwayat ini perawi kitab Shahih.[ref:muqbil] Dalam riwayat Masruq dari Aisyah (Al-Hakim), Nabi ﷺ sedang berbicara dengan Utbah dan Syaibah bin Rabi'ah.[ref:hakim6835]",
          "Riwayat Ibnu Abbas lewat jalur Al-'Aufi menyebut Utbah bin Rabi'ah, Abu Jahal, dan Al-Abbas.[ref:thabari] Ibnu Katsir berkata riwayat ini mengandung keganjilan dan kemungkaran (gharabah wa nakarah), dan sanadnya diperbincangkan.[ref:ikjauzi] Al-Qurthubi juga mencantumkan Umayyah bin Khalaf dan Al-Walid bin al-Mughirah, lalu menukil Ibnu al-'Arabi yang menolak kedua nama itu.[ref:qurthubi] Tidak ada nama yang disepakati."
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
        t3331: { t: "HR. Tirmidzi no. 3331, dari Aisyah (Kitab Tafsir, Surah 'Abasa). Tirmidzi: hasan gharib; Al-Albani: shahih al-isnad.", url: "https://sunnah.com/tirmidhi:3331" },
        muwatha: { t: "Al-Muwaththa' (riwayat Yahya), Kitab al-Qur'an: dari Hisyam bin 'Urwah dari ayahnya (mursal).", url: "https://sunnah.com/malik/15/9" },
        hakim: { t: "Al-Hakim, Al-Mustadrak no. 3944: riwayat Aisyah, \"shahih sesuai syarat Bukhari dan Muslim\" (dikutip Al-Mausu'ah al-Haditsiyyah, Ad-Durar as-Saniyyah).", url: "https://dorar.net/h/kpkRxuJ4" },
        hakim6835: { t: "Al-Hakim, Al-Mustadrak no. 6835: riwayat Masruq dari Aisyah (dikutip Al-Mausu'ah al-Haditsiyyah, Ad-Durar as-Saniyyah).", url: "https://dorar.net/h/R5oLru2R" },
        muallah: { t: "Muqbil bin Hadi Al-Wadi'i, Ahadits Mu'allah Zhahiruha ash-Shihhah no. 468, menukil Adz-Dzahabi bahwa yang benar mursal (dikutip Ad-Durar as-Saniyyah).", url: "https://dorar.net/h/ncUxIEtC" },
        muqbil: { t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 267: riwayat Anas, Abu Ya'la no. 3123 (dikutip Mausu'at at-Tafsir, Ad-Durar as-Saniyyah).", url: "https://dorar.net/tafseer/80/1" },
        ik: { t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim (ringkasan Inggris), tafsir Surah 'Abasa.", url: "https://quran.com/80:1/tafsirs/en-tafisr-ibn-kathir" },
        ikjauzi: { t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim (ed. Dar Ibn al-Jauzi) 7/479, tafsir 'Abasa.", url: "https://shamela.ws/book/1503/4476" },
        thabari: { t: "Ath-Thabari, Jami' al-Bayan, tafsir 'Abasa 1.", url: "https://quran.com/80:1/tafsirs/ar-tafsir-al-tabari" },
        qurthubi: { t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir 'Abasa 1.", url: "https://quran.com/80:1/tafsirs/ar-tafseer-al-qurtubi" },
        b617: { t: "HR. Bukhari no. 617, dari Abdullah bin Umar (Kitab Adzan).", url: sn("bukhari", 617) }
      }
    },
    "alaq-9-19": {
      judul: "Al-'Alaq 6–19",
      sub: "Ancaman Abu Jahal terhadap Nabi yang sedang shalat",
      surah: "Al-'Alaq", ayatNo: "6–19", tahun: 614,
      tontonan: "ancaman-abujahal", peta: { tahun: 614, tempat: "kabah" },
      lead: [
        "Al-'Alaq ayat 6–19 turun berkenaan dengan Abu Jahal, yang bersumpah akan menginjak leher Rasulullah ﷺ bila melihat beliau sujud di dekat Ka'bah.[ref:m2797][ref:b4958] Ketika ia mendekat, ia justru mundur ketakutan.[ref:m2797]",
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
          "Ayat 1–5 adalah wahyu pertama di Gua Hira (lihat artikel Al-'Alaq 1–5). Al-Qurthubi menyebut kemungkinan bahwa lima ayat pertama turun lebih dulu, lalu ayat-ayat sesudahnya turun tentang Abu Jahal.[ref:qurthubi] Hadits-hadits di atas sendiri tidak menyebut urutan itu; keduanya hanya menggambarkan Nabi ﷺ yang sudah shalat di dekat Ka'bah ketika Abu Jahal mengancam beliau.[ref:m2797][ref:b4958]"
        ] }
      ],
      lihatJuga: [
        { label: "Al-'Alaq 1–5", wiki: "alaq-1-5", ket: "awal surah yang sama" },
        { label: "Ka'bah", tempat: "kabah", ket: "lokasi di peta" },
        { label: "Abu Jahal", tokoh: "abujahal" }
      ],
      rujukan: {
        m2797: { t: "HR. Muslim no. 2797, dari Abu Hurairah (Kitab Shifat al-Qiyamah wal-Jannah wan-Nar).", url: "https://sunnah.com/muslim:2797" },
        b4958: { t: "HR. Bukhari no. 4958, dari Ibnu Abbas (Kitab Tafsir, Surah Al-'Alaq).", url: sn("bukhari", 4958) },
        t3349: { t: "HR. Tirmidzi no. 3349, dari Ibnu Abbas (Kitab Tafsir). Tirmidzi: hasan gharib shahih.", url: "https://sunnah.com/tirmidhi:3349" },
        qurthubi: { t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Al-'Alaq 6.", url: "https://quran.com/96:6/tafsirs/ar-tafseer-al-qurtubi" }
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
        ["Waktu", "Diperselisihkan; tidak disebut dalam hadits shahih. Antara lain setahun sebelum Hijrah (±621 M; Az-Zuhri), enam belas bulan sebelum Hijrah (As-Suddi), atau dua atau tiga tahun sebelum Hijrah (pendapat yang dikuatkan Ibnu Hajar)[ref:qurthubi][ref:ik][ref:fath]. Tanggal 27 Rajab populer sebagai hari peringatan, tetapi tidak bersandar pada riwayat shahih"],
        ["Tempat berangkat", "Al-Hathim atau Al-Hijr di sisi Ka'bah menurut HR. Bukhari no. 3887[ref:b3887]; dalam riwayat Abu Dzar, dari rumah beliau di Mekah[ref:b349]; Ath-Thabari juga memuat riwayat bahwa malam itu beliau tidur di rumah Ummu Hani'[ref:thabari]"],
        ["Tujuan", "Masjidil Aqsha (Baitul Maqdis), lalu tujuh langit dan Sidratul Muntaha[ref:b3887]"],
        ["Kendaraan", "Buraq, hewan putih di antara bagal dan keledai[ref:b3887]"],
        ["Riwayat utama", "HR. Bukhari no. 3887 (Malik bin Sha'sha'ah), 3886 (Jabir bin Abdullah), dan 349 (Abu Dzar); HR. Muslim no. 162 (Anas)"]
      ],
      ayat: [
        { no: 1, ar: "سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى الَّذِي بَارَكْنَا حَوْلَهُ لِنُرِيَهُ مِنْ آيَاتِنَا ۚ إِنَّهُ هُوَ السَّمِيعُ الْبَصِيرُ",
          id: "Mahasuci (Allah) yang telah memperjalankan hamba-Nya (Muhammad) pada malam hari dari Masjidil Haram ke Masjidil Aqsha yang telah Kami berkahi sekelilingnya, agar Kami perlihatkan kepadanya sebagian tanda-tanda (kebesaran) Kami. Sesungguhnya Dia Maha Mendengar, Maha Melihat." }
      ],
      bagian: [
        { id: "hijr", judul: "Di sisi Ka'bah", isi: [
          "Nabi ﷺ menceritakan bahwa beliau sedang berbaring di Al-Hathim (atau Al-Hijr) ketika malaikat datang. Dada beliau dibelah, hati beliau dicuci dalam bejana emas berisi iman, lalu dikembalikan.[ref:b3887]",
          "Kemudian didatangkan Buraq, hewan putih yang lebih kecil dari bagal dan lebih besar dari keledai, yang langkahnya sejauh pandangan mata.[ref:b3887]",
          "Riwayat lain berbeda tentang titik berangkatnya. Dalam riwayat Abu Dzar, beliau bercerita bahwa atap rumah beliau di Mekah dibuka, lalu dada beliau dibelah dan dicuci dengan air Zamzam.[ref:b349] Ath-Thabari juga memuat riwayat bahwa malam itu beliau tidur di rumah Ummu Hani'.[ref:thabari]"
        ] },
        { id: "langit", judul: "Tujuh langit", isi: [
          "Dalam riwayat Anas di Shahih Muslim, beliau tiba di Baitul Maqdis, menambatkan Buraq pada lingkaran tempat para nabi menambatkan tunggangan mereka, lalu shalat dua rakaat di sana sebelum dinaikkan ke langit.[ref:m162]",
          "Jibril membawa beliau naik. Di setiap langit pintu dibukakan setelah Jibril ditanya siapa yang bersamanya. Beliau bertemu Adam di langit pertama, Yahya dan Isa di langit kedua, Yusuf di langit ketiga, Idris di langit keempat, Harun di langit kelima, Musa di langit keenam, dan Ibrahim di langit ketujuh. Masing-masing menyambut beliau.[ref:b3887]",
          "Beliau lalu dinaikkan ke Sidratul Muntaha dan diperlihatkan Baitul Ma'mur. Beliau ditawari khamar, susu, dan madu, lalu memilih susu. Jibril berkata itulah fitrah.[ref:b3887]"
        ] },
        { id: "shalat", judul: "Lima puluh menjadi lima", isi: [
          "Allah mewajibkan lima puluh shalat sehari. Musa menyarankan beliau kembali memohon keringanan karena umatnya tidak akan sanggup. Beliau kembali beberapa kali hingga menjadi lima. Ketika Musa menyarankan kembali lagi, beliau berkata malu kepada Tuhannya, dan beliau ridha serta menerima. Lalu terdengar seruan: \"Aku telah menetapkan kewajiban-Ku dan meringankan hamba-hamba-Ku.\"[ref:b3887]"
        ] },
        { id: "quraisy", judul: "Didustakan Quraisy", isi: [
          "Jabir meriwayatkan: ketika kaum Quraisy mendustakan beliau, beliau berdiri di Al-Hijr. Allah menampakkan Baitul Maqdis kepada beliau, dan beliau menceritakan tanda-tandanya sambil melihatnya.[ref:b3886]",
          "Ibnu Katsir membawakan kisah Abu Bakar yang langsung membenarkan peristiwa ini. Ketika diberi tahu, ia berkata, \"Jika beliau mengatakannya, maka beliau benar,\" dan karena itulah ia dijuluki Ash-Shiddiq.[ref:ikar] Kisah ini diriwayatkan di luar Shahih Bukhari."
        ] },
        { id: "waktu", judul: "Kapan terjadinya", isi: [
          "Tanggal peristiwa ini tidak disebut dalam hadits shahih, dan para ulama berbeda pendapat tentang waktunya. Al-Qurthubi mencatat beberapa pendapat: setahun sebelum Hijrah (Musa bin 'Uqbah dari Ibnu Syihab Az-Zuhri), malam 27 Rabi'ul Akhir setahun sebelum Hijrah (Al-Harbi), dan lima tahun setelah kenabian (Al-Waqqashi).[ref:qurthubi]",
          "Ibnu Katsir menukil pendapat setahun sebelum Hijrah dari Az-Zuhri dan 'Urwah, serta enam belas bulan sebelum Hijrah dari As-Suddi.[ref:ik] Ibnu Hajar menyebut bahwa menurut pendapat yang rajih, Isra' terjadi dua atau tiga tahun sebelum Hijrah.[ref:fath]",
          "Di Indonesia dan banyak negeri muslim, Isra' Mi'raj populer diperingati setiap 27 Rajab. Tanggal itu tidak bersandar pada riwayat shahih, dan tidak disebut dalam tafsir-tafsir di atas.[ref:qurthubi][ref:ik]"
        ] }
      ],
      lihatJuga: [
        { label: "Hijr Ismail", tempat: "hijr", ket: "lokasi di peta" },
        { label: "Al-Baqarah 144", wiki: "baqarah-144", ket: "kiblat berpindah dari Baitul Maqdis" }
      ],
      rujukan: {
        b3887: { t: "HR. Bukhari no. 3887, dari Anas dari Malik bin Sha'sha'ah (Kitab Manaqib al-Anshar, bab Mi'raj).", url: sn("bukhari", 3887) },
        b3886: { t: "HR. Bukhari no. 3886, dari Jabir bin Abdullah (Kitab Manaqib al-Anshar, bab Isra').", url: sn("bukhari", 3886) },
        b349: { t: "HR. Bukhari no. 349, dari Anas dari Abu Dzar (Kitab Shalat).", url: sn("bukhari", 349) },
        m162: { t: "HR. Muslim no. 162a, dari Anas bin Malik (Kitab Iman, bab Isra').", url: sn("muslim", "162a") },
        ik: { t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim (ringkasan Inggris), tafsir Al-Isra' 1.", url: "https://quran.com/17:1/tafsirs/en-tafisr-ibn-kathir" },
        ikar: { t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim (teks Arab), tafsir Al-Isra' 1.", url: "https://quran.com/17:1/tafsirs/ar-tafsir-ibn-kathir" },
        thabari: { t: "Ath-Thabari, Jami' al-Bayan, tafsir Al-Isra' 1.", url: "https://quran.com/17:1/tafsirs/ar-tafsir-al-tabari" },
        qurthubi: { t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Al-Isra' 1 (masalah kedua: tarikh Isra').", url: "https://quran.com/17:1/tafsirs/ar-tafseer-al-qurtubi" },
        fath: { t: "Ibnu Hajar, Fath al-Bari 8/670 (Kitab Tafsir, Surah Al-Jinn): Isra' menurut pendapat yang rajih terjadi dua atau tiga tahun sebelum Hijrah.", url: "https://shamela.ws/book/1673/5017" }
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
        ["Waktu", "16 atau 17 bulan setelah Hijrah[ref:b4486]. Bulannya diperselisihkan: Rajab 2 H, Selasa pertengahan Sya'ban, atau dua bulan sebelum Badar (±624 M)[ref:qurthubi]; Ibnu Hajar menguatkan pertengahan Rajab 2 H sebagai pendapat jumhur[ref:fatwa]"],
        ["Tempat", "Madinah"],
        ["Shalat pertama menghadap Ka'bah", "Shalat Ashar menurut riwayat Al-Bara'[ref:b4486]; ada riwayat yang menyebut shalat Zhuhur[ref:ik]"],
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
        { id: "turun", judul: "Turunnya ayat dan shalat pertama menghadap Ka'bah", isi: [
          "Lalu Allah menurunkan ayat ini. Menurut riwayat Al-Bara', shalat pertama yang beliau kerjakan menghadap Ka'bah adalah shalat Ashar, bersama sebagian sahabat.[ref:b4486] Ibnu Katsir menyebut Ashar sebagai pendapat yang masyhur, tetapi juga menukil riwayat Ibnu Umar (Ibnu Mardawaih) dan Abu Sa'id bin Al-Mu'alla (An-Nasa'i) bahwa shalat itu adalah Zhuhur.[ref:ik] Ath-Thabari juga memuat riwayat Mujahid bahwa perpindahan kiblat terjadi saat shalat Zhuhur.[ref:thabari]",
          "Seorang laki-laki yang ikut shalat bersama beliau lalu melewati jamaah sebuah masjid yang sedang ruku'. Ia berkata, \"Aku bersaksi demi Allah, aku telah shalat bersama Nabi menghadap Mekah.\" Mereka pun berputar menghadap Ka'bah dalam keadaan ruku'.[ref:b4486]",
          "Ibnu Umar meriwayatkan bahwa jamaah di Quba baru menerima kabar ini pada shalat Subuh keesokan harinya, lalu berputar ke arah Ka'bah.[ref:b403]"
        ] },
        { id: "tempat", judul: "Masjid Dua Kiblat", isi: [
          "Hadits-hadits di atas tidak menyebut nama masjid tempat jamaah itu berputar. Al-Qurthubi membawakan riwayat lain: shalat Zhuhur di masjid Bani Salimah, yang kemudian disebut Masjid Al-Qiblatain, \"masjid dua kiblat\".[ref:qurthubi]",
          "As-Samhudi dalam Wafa' al-Wafa' juga mengaitkan nama itu dengan shalat Zhuhur Bani Salimah (riwayat Ibnu Zabalah). Ia menukil Ibnu Hajar bahwa jamaah shalat Ashar dalam riwayat Al-Bara' adalah Bani Haritsah, dan mencatat pendapat Al-Majd bahwa Masjid Quba' lebih berhak atas nama itu.[ref:samhudi] Jadi, riwayat tentang masjid mana yang disebut Masjid Al-Qiblatain berbeda-beda."
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
        ik: { t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim (teks Arab), tafsir Al-Baqarah 142–144.", url: "https://quran.com/2:144/tafsirs/ar-tafsir-ibn-kathir" },
        thabari: { t: "Ath-Thabari, Jami' al-Bayan, tafsir Al-Baqarah 144.", url: "https://quran.com/2:144/tafsirs/ar-tafsir-al-tabari" },
        qurthubi: { t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Al-Baqarah 142.", url: "https://quran.com/2:142/tafsirs/ar-tafseer-al-qurtubi" },
        samhudi: { t: "As-Samhudi, Wafa' al-Wafa' bi Akhbar Dar al-Mushthafa 1/277.", url: "https://shamela.ws/book/23695/273" },
        fatwa: { t: "Fatwa Islamweb no. 240181 tentang sebab dan waktu turunnya \"sayaqulus sufaha'\" (mengutip Lubab an-Nuqul dan Fath al-Bari; dimuat ulang Quranpedia).", url: "https://quranpedia.net/fatwa/128" }
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
        ["Waktu", "Diperselisihkan. Hadits Anas tidak menyebut waktunya; riwayat Jabir yang dikutip Ibnu Katsir menyebut saat Nabi thawaf dalam haji atau pada hari Fathu Makkah[ref:ik]. Tahun 624 M di peta hanya perkiraan"],
        ["Tempat", "Tidak disebut; yang dibicarakan adalah Maqam Ibrahim di Mekah"],
        ["Tokoh", "Umar bin Khattab"],
        ["Riwayat utama", "HR. Bukhari no. 402 dan 4483 (Anas, dari Umar)[ref:b402][ref:b4483]; HR. Muslim no. 2399 (Ibnu Umar, dari Umar)[ref:m2399]"]
      ],
      ayat: [
        { no: 125, ar: "وَإِذْ جَعَلْنَا الْبَيْتَ مَثَابَةً لِّلنَّاسِ وَأَمْنًا وَاتَّخِذُوا مِن مَّقَامِ إِبْرَاهِيمَ مُصَلًّى",
          id: "Dan (ingatlah) ketika Kami menjadikan rumah (Ka'bah) tempat berkumpul dan tempat yang aman bagi manusia. Dan jadikanlah Maqam Ibrahim itu tempat shalat. (sebagian ayat)" }
      ],
      bagian: [
        { id: "usul", judul: "Usul Umar", isi: [
          "Anas meriwayatkan dari Umar: \"Aku sepakat dengan Tuhanku dalam tiga hal. Aku berkata, 'Wahai Rasulullah, seandainya kita jadikan Maqam Ibrahim tempat shalat.' Maka turunlah ayat: 'Dan jadikanlah Maqam Ibrahim tempat shalat.'\"[ref:b402][ref:b4483]",
          "Hadits Anas ini tidak menyebut kapan Umar menyampaikan usulnya. Ibnu Katsir mengutip riwayat Jabir yang menempatkan pertanyaan Umar saat Nabi ﷺ thawaf dalam haji (riwayat Ibnu Abi Hatim) atau pada hari Fathu Makkah (riwayat Ibnu Mardawaih).[ref:ik] Karena itu, tahun 624 M yang dipakai di peta hanya perkiraan."
        ] },
        { id: "tiga", judul: "Tiga kesesuaian Umar", isi: [
          "Dua hal lainnya: usul agar istri-istri Nabi berhijab dari laki-laki, lalu turun ayat hijab; dan teguran Umar kepada istri-istri Nabi saat mereka bersatu dalam kecemburuan, lalu turun At-Tahrim ayat 5.[ref:b402]",
          "Dalam riwayat Ibnu Umar dari Umar di Shahih Muslim, tiga hal itu adalah Maqam Ibrahim, hijab, dan tawanan Badar.[ref:m2399] Al-Qurthubi juga mencatat versi Ath-Thayalisi yang menyebut empat hal, sehingga bila digabung, kesesuaian Umar menjadi lima.[ref:qurthubi] Ibnu Katsir menyatakan riwayat-riwayat ini tidak bertentangan dan semuanya shahih.[ref:ik]"
        ] },
        { id: "maqam", judul: "Apa itu Maqam Ibrahim", isi: [
          "Maqam Ibrahim adalah batu tempat Nabi Ibrahim berdiri ketika membangun Ka'bah. Dalam riwayat Ibnu Abbas, ketika dinding Ka'bah meninggi, Ismail membawakan batu ini, lalu Ibrahim berdiri di atasnya sambil membangun.[ref:b3364]",
          "Ketika berhaji, Nabi ﷺ membaca ayat ini di Maqam Ibrahim, lalu shalat dua rakaat dengan Maqam berada di antara beliau dan Ka'bah.[ref:m1218] Sampai sekarang jamaah shalat dua rakaat di belakangnya setelah thawaf."
        ] }
      ],
      lihatJuga: [
        { label: "Maqam Ibrahim", tempat: "maqam", ket: "lokasi di peta" },
        { label: "Umar bin Khattab", tokoh: "umar" }
      ],
      rujukan: {
        b402: { t: "HR. Bukhari no. 402, dari Anas bin Malik dari Umar (Kitab Shalat).", url: sn("bukhari", 402) },
        b4483: { t: "HR. Bukhari no. 4483, dari Anas bin Malik dari Umar (Kitab Tafsir, bab Al-Baqarah 125).", url: sn("bukhari", 4483) },
        m2399: { t: "HR. Muslim no. 2399, dari Ibnu Umar dari Umar (Kitab Keutamaan Sahabat).", url: sn("muslim", 2399) },
        b3364: { t: "HR. Bukhari no. 3364, dari Ibnu Abbas (Kitab Para Nabi).", url: sn("bukhari", 3364) },
        m1218: { t: "HR. Muslim no. 1218, dari Jabir bin Abdullah (hadits tentang haji Nabi).", url: sn("muslim", 1218) },
        ik: { t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim (teks Arab), tafsir Al-Baqarah 125.", url: "https://quran.com/2:125/tafsirs/ar-tafsir-ibn-kathir" },
        qurthubi: { t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Al-Baqarah 125.", url: "https://quran.com/2:125/tafsirs/ar-tafseer-al-qurtubi" }
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
        ["Jumlah pasukan", "Kaum musyrikin 1.000 orang; kaum muslimin 319 orang menurut riwayat Muslim[ref:m1763], \"tiga ratus sepuluh lebih\" menurut riwayat lain[ref:t3081][ref:b3957]"],
        ["Riwayat utama", "HR. Muslim no. 1763 dan HR. Tirmidzi no. 3081 (Ibnu Abbas dari Umar bin Khattab)"]
      ],
      ayat: [
        { no: 9, ar: "إِذْ تَسْتَغِيثُونَ رَبَّكُمْ فَاسْتَجَابَ لَكُمْ أَنِّي مُمِدُّكُم بِأَلْفٍ مِّنَ الْمَلَائِكَةِ مُرْدِفِينَ",
          id: "(Ingatlah) ketika kamu memohon pertolongan kepada Tuhanmu, lalu Dia mengabulkan bagimu, \"Sungguh, Aku akan mendatangkan bala bantuan kepadamu dengan seribu malaikat yang datang berturut-turut.\"" }
      ],
      bagian: [
        { id: "doa", judul: "Doa di malam dan pagi Badar", isi: [
          "Umar bin Khattab menceritakan: pada hari Badar, Rasulullah ﷺ melihat kaum musyrikin berjumlah seribu orang, sedangkan para sahabat 319 orang. Beliau menghadap kiblat, menengadahkan kedua tangan, dan terus berdoa: \"Ya Allah, penuhilah untukku apa yang Engkau janjikan kepadaku. Ya Allah, jika pasukan kecil kaum muslimin ini binasa, Engkau tidak akan disembah di muka bumi.\"[ref:m1763] Dalam riwayat At-Tirmidzi untuk hadits Umar yang sama, jumlah sahabat disebut \"tiga ratus sepuluh lebih\", sama dengan angka dalam riwayat Al-Bara' di Shahih Bukhari.[ref:t3081][ref:b3957]",
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
        t3081: { t: "HR. Tirmidzi no. 3081, dari Ibnu Abbas dari Umar (Kitab Tafsir, Surah Al-Anfal). At-Tirmidzi: hasan shahih gharib; Darussalam: shahih.", url: sn("tirmidhi", 3081) },
        b3957: { t: "HR. Bukhari no. 3957, dari Al-Bara' (Kitab Al-Maghazi, bab jumlah ahli Badar).", url: sn("bukhari", 3957) },
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
        "Menurut Ibnu Abbas, Surah Al-Anfal turun tentang Perang Badar,[ref:b4645] dan Ibnu Katsir menegaskan bahwa ayat ini Madaniyah: ia turun di Madinah untuk mengenang peristiwa menjelang Hijrah.[ref:ik]"
      ],
      infobox: [
        ["Surah", "Al-Anfal (الأنفال), surah ke-8 dalam mushaf"],
        ["Ayat", "30"],
        ["Golongan", "Madaniyah"],
        ["Waktu peristiwa", "Malam Hijrah, 622 M (bulan Shafar atau Rabi'ul Awwal menurut kitab sirah)[ref:ih]"],
        ["Waktu turun", "Setelah Perang Badar, 2 H[ref:b4645][ref:ik]"],
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
        ] },
        { id: "turun", judul: "Kapan ayat ini turun", isi: [
          "Ibnu Abbas menyebut Surah Al-Anfal turun tentang Perang Badar.[ref:b4645] Ibnu Katsir menilai riwayat 'Ubaid bin 'Umair yang menyebut Abu Thalib dalam kisah ini sangat gharib, bahkan munkar, karena ayat ini Madaniyah dan peristiwanya terjadi pada malam Hijrah, sekitar tiga tahun setelah Abu Thalib wafat.[ref:ik]",
          "Ath-Thabari juga memuat riwayat Ibnu Juraij dari Mujahid bahwa ayat ini Makkiyah. Ini pendapat minoritas, dan catatan kaki pentahqiq Tafsir Ath-Thabari meragukan riwayat tersebut.[ref:thabari]"
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
        b4645: { t: "HR. Bukhari no. 4645, dari Sa'id bin Jubair dari Ibnu Abbas (Kitab Tafsir, Surah Al-Anfal).", url: sn("bukhari", 4645) },
        ik: { t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim (teks Arab), tafsir Al-Anfal 30.", url: "https://quran.com/8:30/tafsirs/ar-tafsir-ibn-kathir" },
        thabari: { t: "Ath-Thabari, Jami' al-Bayan, tafsir Al-Anfal 30.", url: "https://quran.com/8:30/tafsirs/ar-tafsir-al-tabari" },
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
        { id: "abuhurairah", judul: "Riwayat Abu Hurairah tentang qunut", isi: [
          "Ada pula riwayat Abu Hurairah tentang qunut dalam shalat Subuh: Nabi ﷺ mendoakan keselamatan Al-Walid bin al-Walid, Salamah bin Hisyam, dan 'Ayyasy, serta melaknat kabilah Lihyan, Ri'l, Dzakwan, dan 'Ushayyah. Kalimat bahwa beliau meninggalkan doa itu ketika ayat ini turun adalah tambahan perawi (\"lalu sampai kepada kami...\"), bukan ucapan Abu Hurairah.[ref:m675]",
          "Ibnu Hajar, yang dikutip As-Suyuthi, menilai kaitan itu sisipan (idraj) dari Az-Zuhri dan tidak sah untuk kabilah-kabilah tersebut, karena kisah Ri'l dan Dzakwan terjadi setelah Uhud.[ref:lubab]"
        ] },
        { id: "makna", judul: "Makna ayat", isi: [
          "Ibnu Hajar, yang dikutip As-Suyuthi dalam Lubab an-Nuqul, memadukan kedua riwayat pertama: ayat ini turun untuk peristiwa Uhud sekaligus doa beliau yang muncul darinya.[ref:lubab]",
          "Dalam riwayat Ibnu Umar di Sunan At-Tirmidzi, orang-orang yang didoakan itu adalah Abu Sufyan, Al-Harits bin Hisyam, dan Shafwan bin Umayyah. Allah menerima tobat mereka, mereka masuk Islam, dan Islam mereka baik. At-Tirmidzi menilai riwayat ini hasan gharib, sedangkan Darussalam menilainya shahih.[ref:t3004] Al-Qurthubi menjelaskan bahwa ayat ini memberi harapan sebagian musuh kelak masuk Islam, seperti Khalid bin al-Walid, 'Amr bin al-'Ash, dan 'Ikrimah bin Abi Jahl.[ref:qurthubi] Dari sini tampak hikmah bahwa urusan hidayah ada di tangan Allah."
        ] }
      ],
      lihatJuga: [
        { label: "Ali 'Imran 144", wiki: "aliimran-144", ket: "kabar wafatnya Nabi di Uhud" }
      ],
      rujukan: {
        m1791: { t: "HR. Muslim no. 1791, dari Anas bin Malik (Kitab Jihad, bab Perang Uhud).", url: "https://sunnah.com/muslim:1791" },
        b4069: { t: "HR. Bukhari no. 4069, dari Abdullah bin Umar (Kitab Al-Maghazi).", url: sn("bukhari", 4069) },
        t3004: { t: "HR. Tirmidzi no. 3004, dari Ibnu Umar (Kitab Tafsir, Surah Ali 'Imran). At-Tirmidzi: hasan gharib; Darussalam: shahih.", url: sn("tirmidhi", 3004) },
        m675: { t: "HR. Muslim no. 675a, dari Abu Hurairah (Kitab Al-Masajid, bab qunut).", url: sn("muslim", "675a") },
        lubab: { t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, Ali 'Imran 128 (teks OpenITI dari Shamela no. 2247, Dar al-Kutub al-'Ilmiyyah).", url: "https://raw.githubusercontent.com/OpenITI/0925AH/master/data/0911Suyuti/0911Suyuti.LubabNuqul/0911Suyuti.LubabNuqul.Shamela0002247-ara1" },
        qurthubi: { t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Ali 'Imran 128.", url: "https://quran.com/3:128/tafsirs/ar-tafseer-al-qurtubi" },
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
        "Kaum muslimin bertahan di balik parit yang mereka gali untuk melindungi Madinah.[ref:rahiq][ref:ik]"
      ],
      infobox: [
        ["Surah", "Al-Ahzab (الأحزاب), surah ke-33 dalam mushaf"],
        ["Ayat", "10 (bagian dari ayat 9–27 tentang Perang Ahzab)"],
        ["Golongan", "Madaniyah"],
        ["Waktu", "Syawal 5 H menurut pendapat yang masyhur (±627 M); Musa bin 'Uqbah dan lainnya menyebut 4 H[ref:ik]"],
        ["Tempat", "Parit di sisi utara Madinah menurut Al-Mubarakfuri[ref:rahiq]; Ibnu Katsir menyebut arah timur kota[ref:ik]"],
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
          "Menurut kitab sirah, ketika kabar datang bahwa Quraisy dan sekutunya bergerak menuju Madinah, kaum muslimin menggali parit untuk melindungi kota. Nabi ﷺ ikut menggali dan mengangkat tanah bersama para sahabat.[ref:ih]",
          "Letak parit dijelaskan berbeda. Al-Mubarakfuri menulis bahwa Madinah dikelilingi harrah (dataran batu hitam), gunung, dan kebun kurma di semua sisi kecuali utara, sehingga parit digali di sisi itu.[ref:rahiq] Ibnu Katsir menyebut parit itu digali atas usul Salman Al-Farisi, di arah timur Madinah.[ref:ik]",
          "Pengepungan berlangsung sekitar sebulan di musim dingin. Pada akhirnya Allah mengirim angin kencang dan pasukan yang tidak terlihat, sehingga pasukan sekutu pulang tanpa hasil (Al-Ahzab 9).[ref:ih][ref:ik]"
        ] },
        { id: "makna", judul: "\"Dari atas dan dari bawah\"", isi: [
          "Al-Qurthubi menjelaskan \"dari atas\" sebagai hulu lembah di arah timur, tempat datangnya 'Uyainah bin Hishn bersama penduduk Najd, dan \"dari bawah\" sebagai dasar lembah di arah barat, tempat datangnya Abu Sufyan bersama penduduk Mekah.[ref:qurthubi]",
          "Siapa yang datang dari masing-masing arah diperselisihkan, terutama tentang Bani Quraizhah yang melanggar perjanjian. Al-Qurthubi memasukkan mereka ke kelompok yang datang \"dari bawah\", begitu pula Hudzaifah dalam riwayat yang dikutip Ibnu Katsir.[ref:qurthubi][ref:ik] Sebaliknya, Ibnu Ishaq yang dikutip Ath-Thabari menyebut Bani Quraizhah datang \"dari atas\", sedangkan Quraisy dan Ghathafan \"dari bawah\". Ath-Thabari juga menukil Mujahid: \"dari atas\" adalah 'Uyainah dan penduduk Najd, \"dari bawah\" adalah Abu Sufyan dan Quraisy.[ref:thabari]"
        ] }
      ],
      lihatJuga: [
        { label: "Al-Anfal 9", wiki: "anfal-9", ket: "pertolongan di Badar" }
      ],
      rujukan: {
        b4103: { t: "HR. Bukhari no. 4103, dari Aisyah (Kitab Al-Maghazi, bab Perang Khandaq).", url: sn("bukhari", 4103) },
        ik: { t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim (ringkasan Inggris), tafsir Al-Ahzab 9–10.", url: "https://quran.com/33:10/tafsirs/en-tafisr-ibn-kathir" },
        thabari: { t: "Ath-Thabari, Jami' al-Bayan, tafsir Al-Ahzab 10.", url: "https://quran.com/33:10/tafsirs/ar-tafsir-al-tabari" },
        qurthubi: { t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Al-Ahzab 10.", url: "https://quran.com/33:10/tafsirs/ar-tafseer-al-qurtubi" },
        rahiq: { t: "Shafiyyurrahman Al-Mubarakfuri, Ar-Rahiq al-Makhtum (ma'a ziyadat), bab Ghazwah al-Ahzab: penggalian parit.", url: "https://usul.ai/t/the-sealed-nectar-with-additions/227" },
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
        ["Waktu", "Sepulang ghazwah Bani al-Mushthaliq (al-Muraisi'). Tahunnya diperselisihkan: 6 H menurut Ibnu Ishaq dan 4 H menurut Musa bin 'Uqbah[ref:qurthubi]; Hidayatul Insan menyebut Sya'ban 5 H[ref:tafsirweb]"],
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
          "Aisyah menceritakan: ia ikut dalam sebuah ekspedisi setelah turun perintah hijab. Dalam perjalanan pulang, ia keluar sebentar dari rombongan untuk suatu keperluan. Kalungnya putus dan ia mencarinya, sehingga tertinggal. Orang-orang yang mengangkat sekedupnya mengira ia ada di dalam, karena tubuhnya ringan, lalu rombongan berangkat.[ref:b4750] Hadits ini hanya menyebut \"sebuah ekspedisi\"; Al-Qurthubi menyebutnya ghazwah Bani al-Mushthaliq, yang juga dikenal sebagai ghazwah al-Muraisi'.[ref:qurthubi]",
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
        ] },
        { id: "penyebar", judul: "Para penyebar berita bohong", isi: [
          "Selain Abdullah bin Ubay, Ath-Thabari menyebut Hassan bin Tsabit, Misthah bin Utsatsah, dan Hamnah binti Jahsy di antara kelompok (\"'ushbah\") yang membawa berita bohong itu.[ref:thabari] Al-Qurthubi mengutip riwayat Abu Dawud dari Aisyah bahwa Nabi ﷺ menjatuhkan hukuman had kepada Hassan, Misthah, dan Hamnah; menurut mayoritas ulama, Abdullah bin Ubay tidak dijatuhi had.[ref:qurthubi]",
          "Tentang jumlah ayat yang turun, Aisyah menyebut sepuluh ayat.[ref:b4750] As-Suyuthi juga membawakan riwayat Al-Hakam bin 'Utaibah bahwa yang turun lima belas ayat, sampai \"al-khabitsatu lil-khabitsin\" (ayat 26), dan menilainya mursal dengan sanad shahih.[ref:lubab]"
        ] }
      ],
      lihatJuga: [
        { label: "Aisyah binti Abu Bakar", tokoh: "aisyah" },
        { label: "Abu Bakar Ash-Shiddiq", tokoh: "abubakar" }
      ],
      rujukan: {
        b4750: { t: "HR. Bukhari no. 4750, dari Aisyah (Kitab Tafsir, Surah An-Nur).", url: sn("bukhari", 4750) },
        qurthubi: { t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir An-Nur 11.", url: "https://quran.com/24:11/tafsirs/ar-tafseer-al-qurtubi" },
        thabari: { t: "Ath-Thabari, Jami' al-Bayan, tafsir An-Nur 11.", url: "https://quran.com/24:11/tafsirs/ar-tafsir-al-tabari" },
        lubab: { t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, An-Nur 11 (teks OpenITI dari Shamela no. 2247, Dar al-Kutub al-'Ilmiyyah).", url: "https://raw.githubusercontent.com/OpenITI/0925AH/master/data/0911Suyuti/0911Suyuti.LubabNuqul/0911Suyuti.LubabNuqul.Shamela0002247-ara1" },
        tafsirweb: { t: "Hidayatul Insan, tafsir An-Nur 11 (dimuat di TafsirWeb).", url: "https://tafsirweb.com/6139-surat-an-nur-ayat-11.html" }
      }
    },
    "fath-1": {
      judul: "Al-Fath 1",
      sub: "Kemenangan yang nyata, sepulang dari Hudaibiyah",
      surah: "Al-Fath", ayatNo: "1", tahun: 628,
      tontonan: "fath", peta: { tahun: 628, lok: "makkah" },
      lead: [
        "Surah Al-Fath turun pada malam hari dalam perjalanan pulang dari Hudaibiyah.[ref:ik][ref:wahidi] Nabi ﷺ bersabda, \"Malam ini telah turun kepadaku sebuah surah yang lebih aku cintai daripada apa pun yang disinari matahari.\"[ref:b4177]",
        "Perjanjian Hudaibiyah, yang terasa berat bagi para sahabat, disebut Allah sebagai \"kemenangan yang nyata\".[ref:b4172]"
      ],
      infobox: [
        ["Surah", "Al-Fath (الفتح), surah ke-48 dalam mushaf"],
        ["Ayat", "1"],
        ["Golongan", "Madaniyah"],
        ["Waktu", "Dzulqa'dah 6 H (±628 M), malam hari sepulang dari Hudaibiyah[ref:b1778][ref:b4177][ref:ik]"],
        ["Tempat", "Di perjalanan antara Hudaibiyah dan Madinah"],
        ["Tokoh", "Umar bin Khattab"],
        ["Riwayat utama", "HR. Bukhari no. 4177 (Aslam dari Umar); HR. Bukhari no. 4172 (Anas)"]
      ],
      ayat: [
        { no: 1, ar: "إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا", id: "Sungguh, Kami telah memberikan kepadamu kemenangan yang nyata." }
      ],
      bagian: [
        { id: "umar", judul: "Tiga pertanyaan Umar", isi: [
          "Aslam meriwayatkan: Rasulullah ﷺ sedang dalam perjalanan pada malam hari, dan Umar bin Khattab berjalan bersama beliau. Umar bertanya tentang sesuatu, tetapi beliau tidak menjawab. Ia bertanya lagi, tidak dijawab; bertanya ketiga kalinya, tetap tidak dijawab.[ref:b4177] Teks hadits ini hanya menyebut \"dalam salah satu perjalanan\"; Al-Bukhari meletakkannya dalam bab Ghazwah Hudaibiyah, dan Ibnu Katsir menyebut surah ini turun ketika Nabi ﷺ pulang dari Hudaibiyah.[ref:b4177][ref:ik]",
          "Umar berkata kepada dirinya sendiri, \"Celakalah engkau, Umar. Engkau telah mendesak Rasulullah tiga kali dan beliau tidak menjawabmu.\" Ia memacu untanya ke depan rombongan, khawatir turun ayat Al-Qur'an tentang dirinya.[ref:b4177]"
        ] },
        { id: "turun", judul: "\"Lebih aku cintai dari apa pun yang disinari matahari\"", isi: [
          "Tidak lama kemudian seseorang memanggilnya. Umar datang dan mengucapkan salam. Nabi ﷺ bersabda, \"Malam ini telah turun kepadaku sebuah surah yang lebih aku cintai daripada apa pun yang disinari matahari.\" Lalu beliau membaca, \"Sungguh, Kami telah memberikan kepadamu kemenangan yang nyata.\"[ref:b4177]"
        ] },
        { id: "hudaibiyah", judul: "Kemenangan berupa perjanjian", isi: [
          "Anas berkata bahwa \"kemenangan\" dalam ayat ini adalah Perjanjian Hudaibiyah.[ref:b4172] Saat itu kaum muslimin batal berumrah dan menerima syarat-syarat yang terasa berat. Dua tahun kemudian perjanjian ini membuka jalan bagi Fathu Makkah.",
          "Makna \"al-fath\" dalam ayat ini diperselisihkan. Kebanyakan mufassir memaknainya Perjanjian Hudaibiyah, dan itu pula pilihan Ath-Thabari; ada pula yang memaknainya Fathu Makkah atau Khaibar.[ref:qurthubi][ref:thabari]",
          "Dalam riwayat Sahl bin Hunaif yang dimuat Muqbil dari Shahih Bukhari dan Muslim, surah ini turun setelah Umar menyampaikan keberatannya atas perjanjian itu. Dalam lafaz Muslim, Umar bertanya, \"Apakah itu kemenangan?\" dan Nabi ﷺ menjawab, \"Ya.\"[ref:muqbil]"
        ] }
      ],
      lihatJuga: [
        { label: "Umar bin Khattab", tokoh: "umar" },
        { label: "An-Nashr 1–3", wiki: "nashr-1-3", ket: "Fathu Makkah" }
      ],
      rujukan: {
        b4177: { t: "HR. Bukhari no. 4177, dari Zaid bin Aslam dari ayahnya (Kitab Al-Maghazi, bab Hudaibiyah).", url: sn("bukhari", 4177) },
        b4172: { t: "HR. Bukhari no. 4172, dari Anas bin Malik (Kitab Al-Maghazi).", url: sn("bukhari", 4172) },
        b1778: { t: "HR. Bukhari no. 1778, dari Anas: umrah Hudaibiyah di bulan Dzulqa'dah.", url: sn("bukhari", 1778) },
        ik: { t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim (ringkasan Inggris), tafsir Al-Fath 1.", url: "https://quran.com/48:1/tafsirs/en-tafisr-ibn-kathir" },
        wahidi: { t: "Al-Wahidi, Asbab an-Nuzul, Al-Fath 1 (terjemahan Mokrane Guezzou): riwayat Anas lewat Qatadah.", url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=48&Ayah=1&search=yes&img=A&LanguageID=2" },
        qurthubi: { t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Al-Fath 1.", url: "https://quran.com/48:1/tafsirs/ar-tafseer-al-qurtubi" },
        thabari: { t: "Ath-Thabari, Jami' al-Bayan, tafsir Al-Fath 1 (di quran.com tampil pada halaman ayat 2).", url: "https://quran.com/48:2/tafsirs/ar-tafsir-al-tabari" },
        muqbil: { t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 187, bab Surah Al-Fath.", url: "https://shamela.ws/book/11547/182" }
      }
    },

    // nashr-1-3 (ditulis dari riset rujukan silang)
    "nashr-1-3": {
      judul: "An-Nashr 1–3",
      sub: "Kemenangan dan isyarat dekatnya ajal Nabi ﷺ",
      surah: "An-Nashr",
      ayatNo: "1–3",
      tahun: 630,
      tontonan: null,
      peta: {
        tahun: 630,
        lok: "makkah"
      },
      lead: ["Surah An-Nashr mengabarkan datangnya pertolongan Allah dan kemenangan, ketika manusia masuk agama Allah berbondong-bondong, lalu memerintahkan Nabi ﷺ bertasbih dan memohon ampun.[ref:kemenag] Ibnu Abbas menafsirkan \"kemenangan\" itu sebagai Fathu Makkah, dan memahami surah ini sebagai pemberitahuan bahwa ajal Rasulullah ﷺ sudah dekat.[ref:b4294][ref:b4970]", "Umar bin Khattab membenarkan tafsir itu di hadapan para sahabat senior peserta Perang Badar.[ref:b4970] Kapan tepatnya surah ini turun diperselisihkan: ada riwayat yang menyebut tahun Fathu Makkah atau sepulang Perang Hunain (8 H), dan ada riwayat Ibnu Umar bahwa surah ini turun di Mina pada hari-hari tasyriq Haji Wada' (10 H).[ref:lubab][ref:wahidi][ref:ik][ref:qurthubi]"],
      infobox: [
        ["Surah", "An-Nashr (النصر), surah ke-110 dalam mushaf"],
        ["Ayat", "1–3 (seluruh surah)"],
        ["Golongan", "Madaniyah"],
        ["Waktu", "Diperselisihkan: tahun Fathu Makkah, 8 H (Az-Zuhri)[ref:lubab]; sepulang Perang Hunain, 8 H (riwayat Al-Wahidi)[ref:wahidi]; di Madinah setelah Fathu Makkah ('Atha' bin Yasar)[ref:thabari]; atau pertengahan hari tasyriq saat Haji Wada', 10 H (Ibnu Umar)[ref:ik][ref:qurthubi]"],
        ["Tempat", "Mekah, Madinah, atau Mina, mengikuti perbedaan riwayat di atas[ref:lubab][ref:thabari][ref:qurthubi]"],
        ["Makna \"al-fath\"", "Fathu Makkah, menurut Ibnu Abbas[ref:b4294]"],
        ["Kedudukan", "Surah terakhir yang turun secara utuh menurut Ibnu Abbas[ref:m3024]; menurut Al-Bara' bin 'Azib, surah itu Bara'ah (At-Taubah)[ref:b4364]"],
        ["Riwayat utama", "HR. Bukhari no. 4294, 4430, 4969, dan 4970 (Ibnu Abbas); HR. Muslim no. 3024 (Ibnu Abbas); HR. Bukhari no. 4967–4968 dan Muslim no. 484 (Aisyah)"],
        ["Derajat", "Tafsir Ibnu Abbas shahih (Bukhari)[ref:b4970]; At-Tirmidzi menilai kisah Umar dan Ibnu Abbas hasan shahih[ref:qurthubi]. Riwayat tentang waktu turunnya ada di luar Shahih Bukhari dan Muslim; riwayat Az-Zuhri berstatus mursal[ref:lubab][ref:itqan]"]
      ],
      ayat: [
        {
          no: 1,
          ar: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ",
          id: "Apabila telah datang pertolongan Allah dan kemenangan,"
        },
        {
          no: 2,
          ar: "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا",
          id: "dan engkau melihat manusia berbondong-bondong masuk agama Allah,"
        },
        {
          no: 3,
          ar: "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا",
          id: "maka bertasbihlah dengan memuji Tuhanmu dan mohonlah ampunan kepada-Nya. Sungguh, Dia Maha Penerima tobat."
        }
      ],
      bagian: [
        {
          id: "majelis",
          judul: "Pertanyaan Umar di majelis ahli Badar",
          isi: ["Umar bin Khattab biasa mengajak Ibnu Abbas, yang masih muda, duduk bersama para sahabat senior peserta Perang Badar. Sebagian mereka keberatan dan bertanya mengapa anak muda ini diikutkan, padahal mereka juga punya anak seusianya. Umar menjawab bahwa mereka sendiri tahu kedudukannya.[ref:b4970][ref:b4294] Dalam riwayat lain, yang menyampaikan keberatan itu adalah Abdurrahman bin 'Auf.[ref:b4430]", "Suatu hari Umar memanggil mereka bersama Ibnu Abbas, yang menduga Umar memanggilnya agar mereka melihat sendiri ilmunya. Umar bertanya tentang makna \"Apabila telah datang pertolongan Allah dan kemenangan\". Sebagian menjawab bahwa kita diperintahkan memuji Allah dan memohon ampun kepada-Nya bila diberi pertolongan dan kemenangan, sebagian lagi diam.[ref:b4970] Dalam riwayat lain mereka menjawab: penaklukan kota-kota dan istana-istana.[ref:b4969]"]
        },
        {
          id: "ibnuabbas",
          judul: "Jawaban Ibnu Abbas",
          isi: ["Umar bertanya, \"Begitukah pendapatmu, wahai Ibnu Abbas?\" Ia menjawab tidak. Menurutnya, surah ini adalah ajal Rasulullah ﷺ yang Allah beritahukan kepada beliau.[ref:b4970] Dalam riwayat Kitab Al-Maghazi ia menjelaskan: \"kemenangan\" itu adalah Fathu Makkah, dan itulah tanda ajal beliau, maka \"bertasbihlah dengan memuji Tuhanmu dan mohonlah ampunan kepada-Nya\".[ref:b4294]", "Umar berkata, \"Aku tidak mengetahui maknanya kecuali seperti yang engkau katakan.\"[ref:b4970][ref:b4430] Dalam riwayat yang lebih ringkas, Ibnu Abbas menyebut surah ini \"ajal, atau perumpamaan yang dibuat untuk Muhammad ﷺ; kematiannya diberitahukan kepadanya\".[ref:b4969]", "Al-Qurthubi mencatat bahwa At-Tirmidzi juga meriwayatkan kisah ini, dengan keberatan Abdurrahman bin 'Auf, dan menilainya hasan shahih.[ref:qurthubi]"]
        },
        {
          id: "waktu",
          judul: "Kapan surah ini turun",
          isi: ["Hadits-hadits Bukhari di atas menjelaskan makna surah, tetapi tidak menyebut kapan surah ini turun.[ref:b4970][ref:b4294] Riwayat-riwayat tentang waktunya, semuanya di luar Shahih Bukhari dan Muslim, berbeda-beda.[ref:lubab][ref:wahidi][ref:ik]", "Tahun Fathu Makkah (8 H). 'Abdurrazzaq meriwayatkan dari Ma'mar dari Az-Zuhri: ketika Rasulullah ﷺ memasuki Mekah pada tahun Fathu Makkah, beliau mengutus Khalid bin Al-Walid, yang memerangi barisan Quraisy di bagian bawah Mekah sampai Allah mengalahkan mereka. Setelah beliau memerintahkan pertempuran dihentikan, orang-orang masuk Islam, lalu turunlah surah ini. Hanya riwayat ini yang dimuat As-Suyuthi untuk Surah An-Nashr.[ref:lubab] Az-Zuhri seorang tabi'in, sehingga riwayatnya tentang sebab turun berstatus mursal.[ref:itqan]", "Sepulang Perang Hunain (8 H). Al-Wahidi membawakan riwayat dengan sanadnya sendiri dari 'Ikrimah dari Ibnu Abbas: ketika Rasulullah ﷺ kembali dari Hunain dan surah ini turun, beliau memanggil Ali bin Abi Thalib dan Fatimah, lalu mengabarkan bahwa pertolongan Allah dan kemenangan telah datang. Riwayat ini menyebut beliau hidup dua tahun sesudahnya.[ref:wahidi]", "Di Madinah setelah Fathu Makkah. Ath-Thabari membawakan perkataan 'Atha' bin Yasar, lewat Ibnu Ishaq dari sebagian sahabatnya, bahwa seluruh surah ini turun di Madinah setelah Fathu Makkah.[ref:thabari] Ath-Thabari juga mengutip Qatadah bahwa Nabi ﷺ hidup sekitar dua tahun setelah surah ini turun.[ref:thabari]", "Hari tasyriq saat Haji Wada' (10 H). Ibnu Katsir mengutip riwayat Al-Bazzar dan Al-Baihaqi dari Ibnu Umar: surah ini turun kepada Rasulullah ﷺ pada pertengahan hari-hari tasyriq, dan beliau mengetahui bahwa itu tanda perpisahan. Beliau lalu meminta untanya, Al-Qashwa', dipelanai, kemudian berdiri menyampaikan khutbahnya yang terkenal.[ref:ik] Al-Qurthubi menukil ucapan Ibnu Umar bahwa surah ini turun di Mina saat Haji Wada', disusul ayat \"Pada hari ini telah Aku sempurnakan agamamu\", dan Nabi ﷺ hidup delapan puluh hari sesudahnya.[ref:qurthubi] Di halaman tafsir yang dirujuk, sanad riwayat Ibnu Umar ini tidak dinilai.[ref:ik][ref:qurthubi]", "Urutan dalam riwayat Ibnu Umar itu tidak sejalan dengan riwayat Umar dalam Shahih Bukhari, yang menyebut Al-Ma'idah 3 turun di Arafah, padahal hari Arafah jatuh sebelum hari-hari tasyriq.[ref:b45][ref:qurthubi] Di aplikasi ini, urutan kejadiannya ditempatkan di sekitar Fathu Makkah (8 H), sesuai pendapat-pendapat yang pertama.[ref:lubab][ref:wahidi]"]
        },
        {
          id: "terakhir",
          judul: "Surah terakhir yang turun utuh?",
          isi: ["'Ubaidullah bin Abdullah bin 'Utbah meriwayatkan: Ibnu Abbas bertanya kepadanya, \"Tahukah engkau surah Al-Qur'an terakhir yang turun secara utuh?\" Ia menjawab, \"Ya, 'Idza ja'a nashrullahi wal-fath'.\" Ibnu Abbas berkata, \"Engkau benar.\"[ref:m3024] Ibnu Katsir menyebut riwayat ini dari An-Nasa'i.[ref:ik]", "Sementara itu Al-Bara' bin 'Azib menyebut surah terakhir yang turun utuh adalah Bara'ah (At-Taubah), dan ayat terakhir yang turun adalah ayat penutup Surah An-Nisa' tentang kalalah.[ref:b4364] Al-Qurthubi juga mencatat beberapa ayat yang disebut turun sesudah An-Nashr, misalnya ayat kalalah, lengkap dengan berbagai perkiraan berapa hari Nabi ﷺ hidup sesudahnya.[ref:qurthubi]"]
        },
        {
          id: "tasbih",
          judul: "Tasbih dan istighfar sesudahnya",
          isi: ["Aisyah meriwayatkan: setelah surah ini turun, Nabi ﷺ tidak mengerjakan satu shalat pun kecuali membaca di dalamnya, \"Subhanaka Rabbana wa bihamdika, Allahummaghfir li\" (Mahasuci Engkau, wahai Tuhan kami, dan dengan memuji-Mu; ya Allah, ampunilah aku).[ref:b4967] Dalam riwayat lain ia menyebut beliau sering membacanya dalam rukuk dan sujud, mengamalkan perintah Al-Qur'an.[ref:b4968][ref:m484]", "Aisyah juga pernah bertanya mengapa beliau sering mengucapkan tasbih, tahmid, istighfar, dan taubat. Beliau menjawab bahwa Tuhannya mengabarkan beliau akan melihat suatu tanda pada umatnya, dan bila melihatnya beliau memperbanyak ucapan itu. Tanda itu telah beliau lihat: \"Apabila telah datang pertolongan Allah dan kemenangan\", yang dalam riwayat ini dijelaskan sebagai Fathu Makkah.[ref:m484d]", "Ibnu Katsir juga membawakan riwayat Al-Baihaqi dari 'Ikrimah dari Ibnu Abbas: setelah surah ini turun, Nabi ﷺ memanggil Fatimah dan mengabarkan bahwa ajal beliau telah diberitahukan. Fatimah menangis, lalu tertawa ketika beliau mengabarkan bahwa ia keluarga beliau yang pertama menyusul beliau.[ref:ik]"]
        },
        {
          id: "kandungan",
          judul: "Kandungan surah",
          isi: ["Tafsir Ringkas Kemenag memaknai kemenangan dalam surah ini sebagai penaklukan Mekah, yang membuat kota itu kembali bersih dari kesyirikan.[ref:kemenag] As-Sa'di dan Hidayatul Insan, yang dimuat di halaman yang sama, memahami perintah bertasbih dan beristighfar sebagai isyarat bahwa ajal beliau sudah dekat.[ref:kemenag]"]
        }
      ],
      lihatJuga: [
        {
          label: "Al-Fath 1",
          wiki: "fath-1",
          ket: "kemenangan yang nyata di Hudaibiyah"
        },
        {
          label: "Al-Ma'idah 3",
          wiki: "maidah-3",
          ket: "ayat yang turun di Arafah"
        },
        {
          label: "Ka'bah",
          tempat: "kabah",
          ket: "Fathu Makkah, 8 H"
        },
        {
          label: "Abdullah bin Abbas",
          tokoh: "ibnuabbas"
        },
        {
          label: "Umar bin Khattab",
          tokoh: "umar"
        },
        {
          label: "Aisyah binti Abu Bakar",
          tokoh: "aisyah"
        },
        {
          label: "Fatimah Az-Zahra",
          tokoh: "fatimah"
        }
      ],
      rujukan: {
        b4970: {
          t: "HR. Bukhari no. 4970, dari Ibnu Abbas (Kitab Tafsir, Surah An-Nashr).",
          url: "https://sunnah.com/bukhari:4970"
        },
        b4969: {
          t: "HR. Bukhari no. 4969, dari Ibnu Abbas (Kitab Tafsir, Surah An-Nashr).",
          url: "https://sunnah.com/bukhari:4969"
        },
        b4294: {
          t: "HR. Bukhari no. 4294, dari Ibnu Abbas (Kitab Al-Maghazi).",
          url: "https://sunnah.com/bukhari:4294"
        },
        b4430: {
          t: "HR. Bukhari no. 4430, dari Ibnu Abbas (Kitab Al-Maghazi, bab sakit dan wafatnya Nabi ﷺ).",
          url: "https://sunnah.com/bukhari:4430"
        },
        m3024: {
          t: "HR. Muslim no. 3024a, dari 'Ubaidullah bin Abdullah bin 'Utbah dari Ibnu Abbas (Kitab Tafsir).",
          url: "https://sunnah.com/muslim:3024a"
        },
        b4364: {
          t: "HR. Bukhari no. 4364, dari Al-Bara' bin 'Azib (Kitab Al-Maghazi).",
          url: "https://sunnah.com/bukhari:4364"
        },
        b4967: {
          t: "HR. Bukhari no. 4967, dari Aisyah (Kitab Tafsir, Surah An-Nashr).",
          url: "https://sunnah.com/bukhari:4967"
        },
        b4968: {
          t: "HR. Bukhari no. 4968, dari Aisyah (Kitab Tafsir, Surah An-Nashr).",
          url: "https://sunnah.com/bukhari:4968"
        },
        m484: {
          t: "HR. Muslim no. 484a, dari Masruq dari Aisyah (Kitab Shalat, bab bacaan rukuk dan sujud).",
          url: "https://sunnah.com/muslim:484"
        },
        m484d: {
          t: "HR. Muslim no. 484d, dari Masruq dari Aisyah (Kitab Shalat, bab bacaan rukuk dan sujud).",
          url: "https://sunnah.com/muslim:484d"
        },
        b45: {
          t: "HR. Bukhari no. 45, dari Thariq bin Syihab dari Umar bin Khattab (Kitab Iman).",
          url: "https://sunnah.com/bukhari:45"
        },
        wahidi: {
          t: "Al-Wahidi, Asbab an-Nuzul, Surah An-Nashr (terjemahan Inggris Mokrane Guezzou).",
          url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=110&Ayah=1&search=yes&img=A&LanguageID=2"
        },
        lubab: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 218, Surah An-Nashr (riwayat 'Abdurrazzaq dari Ma'mar dari Az-Zuhri).",
          url: "https://shamela.ws/book/2247/216"
        },
        itqan: {
          t: "As-Suyuthi, Al-Itqan fi 'Ulum al-Qur'an 1/117, bab sebab turun (riwayat tabi'in berstatus mursal).",
          url: "https://shamela.ws/book/11728/110"
        },
        ik: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Surah An-Nashr (memuat riwayat Ibnu Umar dari Al-Bazzar dan Al-Baihaqi).",
          url: "https://quran.com/110:1/tafsirs/ar-tafsir-ibn-kathir"
        },
        thabari: {
          t: "Ath-Thabari, Jami' al-Bayan, tafsir Surah An-Nashr.",
          url: "https://quran.com/110:3/tafsirs/ar-tafsir-al-tabari"
        },
        qurthubi: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Surah An-Nashr.",
          url: "https://quran.com/110:3/tafsirs/ar-tafseer-al-qurtubi"
        },
        kemenag: {
          t: "Tafsir Ringkas Kemenag RI, As-Sa'di, dan Hidayatul Insan untuk An-Nashr 1 (dimuat di TafsirWeb).",
          url: "https://tafsirweb.com/13088-surat-an-nasr-ayat-1.html"
        }
      }
    },

    // taubah-40 (ditulis dari riset rujukan silang)
    "taubah-40": {
      judul: "At-Taubah 40",
      sub: "Pertolongan di Gua Tsur, diingatkan di masa Tabuk",
      surah: "At-Taubah",
      ayatNo: "40",
      tahun: 630,
      tontonan: "laa-tahzan",
      peta: {
        tahun: 622,
        tempat: "gua-tsur"
      },
      lead: ["At-Taubah ayat 40 mengingatkan pertolongan Allah kepada Rasulullah ﷺ pada tahun Hijrah, ketika beliau dan Abu Bakar bersembunyi di Gua Tsur dari kejaran kaum Quraisy.[ref:ik][ref:thabari] Di dalam gua, Abu Bakar khawatir para pengejar melihat mereka, dan Nabi ﷺ menenangkannya: \"Apa dugaanmu tentang dua orang yang Allah adalah yang ketiganya?\"[ref:b3653][ref:m2381]", "Ayat ini sendiri turun sekitar delapan tahun kemudian (9 H), dalam rangkaian ayat 38–41 yang menegur orang-orang yang enggan berangkat ke Perang Tabuk.[ref:wahidi][ref:lubab] Kitab-kitab asbabun nuzul tidak mencatat sebab turun khusus untuk ayat 40; kisah di gua adalah peristiwa yang diingatkan ayat ini, bukan sebab turunnya.[ref:wahidi][ref:lubab][ref:muqbil]"],
      infobox: [
        ["Surah", "At-Taubah (التوبة), surah ke-9 dalam mushaf"],
        ["Ayat", "40 (bagian dari rangkaian ayat 38–41)"],
        ["Golongan", "Madaniyah"],
        ["Waktu turun", "9 H (±630 M), masa seruan Perang Tabuk[ref:wahidi][ref:lubab]"],
        ["Peristiwa yang diingatkan", "Hijrah, 622 M: tiga malam bersembunyi di gua Gunung Tsur[ref:b3905]"],
        ["Tempat peristiwa", "Gua di Gunung Tsur, Mekah[ref:b3905][ref:thabari]"],
        ["Tokoh", "Rasulullah ﷺ dan Abu Bakar Ash-Shiddiq"],
        ["Sebab turun khusus", "Tidak dicatat Al-Wahidi, As-Suyuthi, maupun Muqbil[ref:wahidi][ref:lubab][ref:muqbil]"],
        ["Riwayat utama", "HR. Bukhari no. 3653 dan 4663; HR. Muslim no. 2381; HR. Tirmidzi no. 3096 (Anas dari Abu Bakar)"],
        ["Derajat", "Shahih; At-Tirmidzi: hasan shahih gharib[ref:t3096]"]
      ],
      ayat: [
        {
          no: 40,
          ar: "إِلَّا تَنصُرُوهُ فَقَدْ نَصَرَهُ اللَّهُ إِذْ أَخْرَجَهُ الَّذِينَ كَفَرُوا ثَانِيَ اثْنَيْنِ إِذْ هُمَا فِي الْغَارِ إِذْ يَقُولُ لِصَاحِبِهِ لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا ۖ فَأَنزَلَ اللَّهُ سَكِينَتَهُ عَلَيْهِ وَأَيَّدَهُ بِجُنُودٍ لَّمْ تَرَوْهَا وَجَعَلَ كَلِمَةَ الَّذِينَ كَفَرُوا السُّفْلَىٰ ۗ وَكَلِمَةُ اللَّهِ هِيَ الْعُلْيَا ۗ وَاللَّهُ عَزِيزٌ حَكِيمٌ",
          id: "Jika kamu tidak menolongnya (Muhammad), sesungguhnya Allah telah menolongnya (yaitu) ketika orang-orang kafir mengusirnya (dari Mekah); sedang dia salah seorang dari dua orang ketika keduanya berada dalam gua, ketika itu dia berkata kepada sahabatnya, \"Janganlah engkau bersedih, sesungguhnya Allah bersama kita.\" Maka Allah menurunkan ketenangan kepadanya (Muhammad) dan membantu dengan bala tentara (malaikat-malaikat) yang tidak terlihat olehmu, dan Dia menjadikan seruan orang-orang kafir itu rendah. Dan firman Allah itulah yang tinggi. Allah Mahaperkasa, Mahabijaksana."
        }
      ],
      bagian: [
        {
          id: "tabuk",
          judul: "Teguran di masa Perang Tabuk",
          isi: ["Ayat 38–41 menegur orang-orang yang merasa berat ketika diseru berangkat di jalan Allah.[ref:wahidi][ref:qurthubi] Al-Wahidi menyebut ayat-ayat ini turun untuk mendorong kaum muslimin berangkat menghadapi Romawi di Tabuk, tak lama setelah Nabi ﷺ pulang dari Hunain dan Thaif, pada musim paceklik dan panas terik ketika buah kurma siap dipetik dan orang-orang lebih suka berteduh.[ref:wahidi]", "As-Suyuthi membawakan riwayat Mujahid yang senada: ayat itu tentang perintah berangkat ke Tabuk setelah Fathu Makkah, di musim panas ketika buah-buahan matang dan orang-orang menyukai naungan.[ref:lubab] Al-Qurthubi menafsirkan \"jika kamu tidak menolongnya\" sebagai tidak ikut berangkat bersama Nabi ﷺ ke Tabuk, dan Tafsir Ringkas Kemenag juga mengaitkan ayat ini dengan Perang Tabuk.[ref:qurthubi][ref:kemenag]", "Lalu ayat 40 mengingatkan: jika mereka tidak menolong Rasul, Allah tetap penolongnya, sebagaimana Allah telah menolongnya pada tahun Hijrah.[ref:ik]"]
        },
        {
          id: "hijrah",
          judul: "Peristiwa yang diingatkan: Hijrah",
          isi: ["Ibnu Katsir menjelaskan bahwa yang dimaksud adalah tahun Hijrah, ketika Nabi ﷺ berlindung di Gua Tsur selama tiga hari sampai para pengejar kembali.[ref:ik] Dalam riwayat yang dikutip Ath-Thabari, Qatadah menyebut gua itu Tsur, sebuah gunung di Mekah, dan Az-Zuhri menyebut mereka tinggal di sana tiga malam.[ref:thabari]", "Aisyah meriwayatkan: Nabi ﷺ datang ke rumah Abu Bakar di tengah hari dan mengabarkan bahwa beliau telah diizinkan berhijrah. Abu Bakar meminta ikut, dan beliau mengiyakan. Keduanya lalu bersembunyi di sebuah gua di Gunung Tsur selama tiga malam.[ref:b3905]", "Setiap malam Abdullah bin Abi Bakar bermalam bersama mereka dan berangkat sebelum fajar, sehingga pagi harinya ia sudah berada di tengah Quraisy seolah-olah bermalam di Mekah. Ia menyimak setiap rencana jahat terhadap keduanya, lalu menyampaikannya ketika malam tiba. Amir bin Fuhairah, bekas budak Abu Bakar, membawa kambing-kambing perah ke gua setelah Isya, sehingga mereka bisa minum susu.[ref:b3905]", "Pada pagi setelah malam ketiga, pemandu sewaan dari Bani Ad-Dil, yang masih memeluk agama kaum Quraisy, datang membawa unta mereka, lalu mereka berangkat menyusuri jalan pantai.[ref:b3905]"]
        },
        {
          id: "gua",
          judul: "\"Dua orang yang Allah adalah yang ketiganya\"",
          isi: ["Anas bin Malik meriwayatkan dari Abu Bakar: ketika berada di dalam gua, Abu Bakar berkata kepada Nabi ﷺ, \"Seandainya salah seorang dari mereka melihat ke bawah kakinya, tentu ia akan melihat kita.\" Beliau menjawab, \"Apa dugaanmu, wahai Abu Bakar, tentang dua orang yang Allah adalah yang ketiganya?\"[ref:b3653]", "Al-Bukhari mencantumkan hadits ini dalam bab keutamaan kaum Muhajirin dan dalam Kitab Tafsir, pada bab tentang ayat ini.[ref:b3653][ref:b4663] Muslim meriwayatkannya dalam bab keutamaan Abu Bakar, dan At-Tirmidzi menilainya hasan shahih gharib.[ref:m2381][ref:t3096]", "Ibnu Katsir membawakan hadits ini dalam tafsir ayat 40; ucapan beliau di gua itu sejalan dengan kalimat yang diabadikan ayat: \"Janganlah engkau bersedih, sesungguhnya Allah bersama kita.\"[ref:ik]"]
        },
        {
          id: "sakinah",
          judul: "Kepada siapa ketenangan diturunkan?",
          isi: ["Para mufassir berbeda pendapat tentang kalimat \"maka Allah menurunkan ketenangan (sakinah) kepadanya\".[ref:ik][ref:qurthubi] Ibnu Katsir menyebut \"kepada Rasulullah ﷺ\" sebagai pendapat yang paling masyhur. Ia juga menyebut pendapat lain, yang diriwayatkan dari Ibnu Abbas dan lainnya, bahwa sakinah itu turun kepada Abu Bakar.[ref:ik]", "Pendukung pendapat kedua beralasan bahwa Rasulullah ﷺ senantiasa disertai ketenangan. Ibnu Katsir menanggapi bahwa hal itu tidak menafikan turunnya ketenangan baru yang khusus untuk keadaan tersebut.[ref:ik] Ath-Thabari juga mendahulukan pendapat bahwa sakinah turun kepada Nabi ﷺ.[ref:thabari]", "Sebaliknya, Al-Qurthubi mengutip Ibnu Al-'Arabi yang menilai pendapat \"kepada Abu Bakar\" lebih kuat, karena Abu Bakar-lah yang merasa takut.[ref:qurthubi] Tafsir Ringkas Kemenag mengikuti pendapat pertama, dan terjemahan di atas pun menambahkan \"(Muhammad)\" setelah \"kepadanya\".[ref:kemenag]", "Adapun \"bala tentara yang tidak terlihat olehmu\" ditafsirkan Ibnu Katsir sebagai para malaikat.[ref:ik]"]
        },
        {
          id: "kisah",
          judul: "Sarang laba-laba dan merpati",
          isi: ["Kisah sarang laba-laba yang menutup mulut gua tidak terdapat dalam hadits Bukhari dan Muslim di atas, dan tidak disebut Ibnu Katsir maupun Ath-Thabari dalam tafsir ayat ini.[ref:b3653][ref:ik][ref:thabari] Al-Qurthubi menyebutnya kabar yang masyhur, sedangkan kisah merpati yang bertelur di sana ia bawakan dengan kata \"diriwayatkan\" tanpa menilai sanadnya.[ref:qurthubi]", "Kisah laba-laba terdapat dalam riwayat Ibnu Abbas di Musnad Ahmad, yang sanadnya dinilai hasan oleh Ibnu Hajar; lihat artikel Al-Anfal 30.[ref:a3251]"]
        },
        {
          id: "kandungan",
          judul: "Kandungan ayat",
          isi: ["Ayat ini menegaskan bahwa Allah tetap menolong Rasul-Nya meski tanpa bantuan manusia: ketika diusir dari Mekah, beliau hanya berdua, dan Allah menolongnya.[ref:ik] Menurut Ibnu Abbas yang dikutip Ibnu Katsir, \"seruan orang-orang kafir\" adalah kesyirikan, sedangkan \"kalimat Allah\" adalah La ilaha illallah.[ref:ik]"]
        }
      ],
      lihatJuga: [
        {
          label: "Al-Anfal 30",
          wiki: "anfal-30",
          ket: "makar Quraisy di malam Hijrah"
        },
        {
          label: "At-Taubah 118",
          wiki: "taubah-118",
          ket: "Perang Tabuk, surah yang sama"
        },
        {
          label: "Gua Tsur",
          tempat: "gua-tsur",
          ket: "lokasi di peta"
        },
        {
          label: "Rumah Abu Bakar",
          tempat: "rumah-abubakar",
          ket: "tempat Nabi datang di tengah hari"
        },
        {
          label: "Abu Bakar Ash-Shiddiq",
          tokoh: "abubakar"
        },
        {
          label: "Abdullah bin Abi Bakar",
          tokoh: "abdullahabubakar"
        },
        {
          label: "Amir bin Fuhairah",
          tokoh: "amirfuhairah"
        }
      ],
      rujukan: {
        b3653: {
          t: "HR. Bukhari no. 3653, dari Anas dari Abu Bakar (Kitab Keutamaan Sahabat, bab keutamaan Muhajirin).",
          url: "https://sunnah.com/bukhari:3653"
        },
        b4663: {
          t: "HR. Bukhari no. 4663, dari Anas dari Abu Bakar (Kitab Tafsir, bab \"tsaniyatsnaini idz huma fil-ghar\").",
          url: "https://sunnah.com/bukhari:4663"
        },
        m2381: {
          t: "HR. Muslim no. 2381, dari Anas dari Abu Bakar (Kitab Keutamaan Sahabat, bab keutamaan Abu Bakar).",
          url: "https://sunnah.com/muslim:2381"
        },
        t3096: {
          t: "HR. Tirmidzi no. 3096, dari Anas dari Abu Bakar (Kitab Tafsir, Surah At-Taubah). Tirmidzi: hasan shahih gharib, hanya dikenal dari jalur Hammam.",
          url: "https://sunnah.com/tirmidhi:3096"
        },
        b3905: {
          t: "HR. Bukhari no. 3905, dari Aisyah (Kitab Manaqib al-Anshar, bab Hijrah Nabi ﷺ).",
          url: "https://sunnah.com/bukhari:3905"
        },
        a3251: {
          t: "HR. Ahmad no. 3251, dari Ibnu Abbas. Ibnu Hajar menilai sanadnya hasan.",
          url: "https://hadithunlocked.com/ahmad:3251"
        },
        wahidi: {
          t: "Al-Wahidi, Asbab an-Nuzul, At-Taubah 38 (terjemahan Inggris Mokrane Guezzou); untuk ayat 40 tidak ada sebab turun.",
          url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=9&Ayah=38&search=yes&img=A&LanguageID=2"
        },
        lubab: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 104 (At-Taubah 38, 39, dan 41; tanpa entri ayat 40).",
          url: "https://shamela.ws/book/2247/102"
        },
        muqbil: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 107 (Surah At-Taubah; tanpa entri ayat 38–41).",
          url: "https://shamela.ws/book/11547/102"
        },
        ik: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir At-Taubah 40.",
          url: "https://quran.com/9:40/tafsirs/ar-tafsir-ibn-kathir"
        },
        thabari: {
          t: "Ath-Thabari, Jami' al-Bayan, tafsir At-Taubah 40.",
          url: "https://quran.com/9:40/tafsirs/ar-tafsir-al-tabari"
        },
        qurthubi: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir At-Taubah 40.",
          url: "https://quran.com/9:40/tafsirs/ar-tafseer-al-qurtubi"
        },
        kemenag: {
          t: "Tafsir Ringkas Kemenag RI, At-Taubah 40 (dimuat di TafsirWeb).",
          url: "https://tafsirweb.com/3056-surat-at-taubah-ayat-40.html"
        }
      }
    },

    // taubah-118 (ditulis dari riset rujukan silang)
    "taubah-118": {
      judul: "At-Taubah 118",
      sub: "Taubat Ka'ab bin Malik dan dua sahabatnya",
      surah: "At-Taubah",
      ayatNo: "118",
      tahun: 630,
      tontonan: null,
      peta: {
        tahun: 630,
        lok: "madinah"
      },
      lead: ["At-Taubah ayat 118 turun mengabarkan bahwa Allah menerima taubat tiga sahabat yang tidak ikut Perang Tabuk tanpa uzur: Ka'ab bin Malik, Murarah bin Ar-Rabi', dan Hilal bin Umayyah.[ref:b4418][ref:m2769][ref:lubab] Berbeda dengan lebih dari delapan puluh orang yang datang membawa alasan, mereka bertiga mengaku terus terang, lalu perkara mereka ditangguhkan dan kaum muslimin dilarang berbicara dengan mereka selama lima puluh malam.[ref:b4418]", "Kisahnya dituturkan Ka'ab sendiri dalam hadits panjang yang menurut Ibnu Katsir shahih dan disepakati kesahihannya.[ref:ik] Ka'ab juga menjelaskan bahwa \"tiga orang yang ditinggalkan\" (khullifu) dalam ayat ini bukan berarti mereka tertinggal dari perang, melainkan perkara mereka ditangguhkan sampai Allah memutuskannya.[ref:b4418]"],
      infobox: [
        ["Surah", "At-Taubah (التوبة), surah ke-9 dalam mushaf"],
        ["Ayat", "118 (turun bersama ayat 117; ayat 119 juga disebut tentang mereka)[ref:t3102]"],
        ["Golongan", "Madaniyah"],
        ["Waktu", "9 H (±630 M), sepulang Perang Tabuk; diumumkan seusai shalat Subuh pada pagi kelima puluh[ref:b4418][ref:b4677]"],
        ["Tempat turun", "Madinah, di rumah Ummu Salamah, pada sepertiga malam terakhir[ref:b4677]"],
        ["Tokoh", "Ka'ab bin Malik, Murarah bin Ar-Rabi' Al-'Amri, dan Hilal bin Umayyah Al-Waqifi[ref:b4418]"],
        ["Lama pengucilan", "Lima puluh malam[ref:b4418]"],
        ["Riwayat utama", "HR. Bukhari no. 4418 dan 4677; HR. Muslim no. 2769; HR. Tirmidzi no. 3102 (Ka'ab bin Malik)"],
        ["Derajat", "Shahih; menurut Ibnu Katsir shahih, tetap, dan disepakati kesahihannya[ref:ik]; dimuat Muqbil dalam Ash-Shahih al-Musnad[ref:muqbil]"]
      ],
      ayat: [
        {
          no: 118,
          ar: "وَعَلَى الثَّلَاثَةِ الَّذِينَ خُلِّفُوا حَتَّىٰ إِذَا ضَاقَتْ عَلَيْهِمُ الْأَرْضُ بِمَا رَحُبَتْ وَضَاقَتْ عَلَيْهِمْ أَنفُسُهُمْ وَظَنُّوا أَن لَّا مَلْجَأَ مِنَ اللَّهِ إِلَّا إِلَيْهِ ثُمَّ تَابَ عَلَيْهِمْ لِيَتُوبُوا ۚ إِنَّ اللَّهَ هُوَ التَّوَّابُ الرَّحِيمُ",
          id: "dan terhadap tiga orang yang ditinggalkan (ditangguhkan perkaranya). Hingga ketika bumi terasa sempit bagi mereka, padahal bumi itu luas dan jiwa mereka pun telah (pula terasa) sempit bagi mereka, serta mereka telah mengetahui bahwa tidak ada tempat lari dari (siksaan) Allah, melainkan kepada-Nya saja, kemudian Allah menerima tobat mereka agar mereka tetap dalam tobatnya. Sesungguhnya Allah Maha Penerima tobat, Maha Penyayang."
        }
      ],
      bagian: [
        {
          id: "tabuk",
          judul: "Tabuk dan Ka'ab yang menunda",
          isi: ["Ka'ab bin Malik bercerita bahwa ia tidak pernah absen dari peperangan bersama Rasulullah ﷺ kecuali Tabuk. Ia juga tidak ikut Badar, tetapi tidak seorang pun ditegur karena tidak ikut Badar.[ref:b4418]", "Tabuk berlangsung ketika buah-buahan matang dan naungan terasa nyaman, dalam panas yang sangat, dengan perjalanan jauh melintasi gurun menghadapi musuh yang besar.[ref:b4418] Ka'ab tidak menyebut angka pasukan; ia hanya mengatakan kaum muslimin sangat banyak dan tidak tercatat dalam satu daftar. Salah satu jalur riwayat Muslim menyebut jumlahnya lebih dari sepuluh ribu orang.[ref:b4418][ref:m2769d]", "Ka'ab mengaku belum pernah sekuat dan selapang saat itu; untuk pertama kalinya ia memiliki dua unta sekaligus. Namun ia terus menunda persiapan sampai pasukan telah berangkat jauh, dan ia pun tertinggal.[ref:b4418]"]
        },
        {
          id: "jujur",
          judul: "Memilih berkata jujur",
          isi: ["Sepulang Nabi ﷺ, lebih dari delapan puluh orang yang tidak ikut datang mengajukan alasan sambil bersumpah. Beliau menerima lahiriah mereka, membaiat mereka, memohonkan ampun bagi mereka, dan menyerahkan isi hati mereka kepada Allah.[ref:b4418]", "Ka'ab memilih berkata jujur bahwa ia tidak punya uzur. Ia lalu mendapati dua orang lain yang bernasib sama: Murarah bin Ar-Rabi' Al-'Amri dan Hilal bin Umayyah Al-Waqifi.[ref:b4418] Nama Murarah ditulis berbeda dalam sebagian riwayat dan tafsir, misalnya Murarah bin Rabi'ah; Ibnu Katsir menegaskan bahwa yang benar adalah Murarah bin Ar-Rabi'.[ref:ik][ref:kemenag]", "Dalam riwayat Bukhari, Ka'ab menyebut keduanya orang saleh yang pernah ikut Perang Badar.[ref:b4418] Ibnu Katsir menukil pendapat, dengan kata \"dikatakan\", bahwa penyebutan Badar ini kekeliruan Az-Zuhri, karena tidak dikenal seorang pun dari ketiganya ikut Badar.[ref:ik]"]
        },
        {
          id: "boikot",
          judul: "Lima puluh malam dikucilkan",
          isi: ["Nabi ﷺ melarang kaum muslimin berbicara dengan mereka bertiga; orang-orang lain yang tidak ikut tidak dikenai larangan itu.[ref:b4677] Pengucilan ini berlangsung lima puluh malam.[ref:b4418]", "Setelah empat puluh malam, utusan Nabi ﷺ datang menyuruh Ka'ab menjauhi istrinya tanpa menceraikannya. Istri Hilal meminta izin tetap melayani suaminya, dan Nabi ﷺ mengizinkannya asalkan Hilal tidak mendekatinya.[ref:b4418]", "Di masa itu seorang petani Nabath dari Syam membawa surat dari raja Ghassan yang mengajak Ka'ab bergabung dengan mereka. Ka'ab menganggapnya ujian lain, lalu membakar surat itu di tungku.[ref:b4418] Ia sangat gelisah, khawatir mati tanpa dishalatkan Nabi ﷺ, atau Nabi ﷺ wafat sementara ia masih dikucilkan.[ref:b4677]"]
        },
        {
          id: "turun",
          judul: "Turunnya ayat",
          isi: ["Allah menurunkan taubat mereka pada sepertiga malam terakhir, ketika Nabi ﷺ berada di rumah Ummu Salamah. Beliau bersabda, \"Wahai Ummu Salamah, taubat Ka'ab telah diterima.\" Ummu Salamah menawarkan untuk segera mengabarkannya, tetapi beliau menjawab bahwa orang-orang akan berdatangan dan mengganggu tidur mereka sepanjang sisa malam.[ref:b4677]", "Seusai shalat Subuh, Nabi ﷺ mengumumkan bahwa Allah telah menerima taubat mereka.[ref:b4677][ref:m2769] Saat itu, pada pagi kelima puluh, Ka'ab sedang duduk di atap rumahnya, lalu terdengar seruan dari atas Gunung Sal': \"Wahai Ka'ab bin Malik, bergembiralah!\" Ka'ab langsung bersujud.[ref:b4418]", "Ka'ab datang ke masjid. Thalhah bin Ubaidillah bergegas menyalami dan memberinya selamat. Rasulullah ﷺ bersabda, \"Bergembiralah dengan hari terbaik yang engkau alami sejak engkau dilahirkan ibumu.\"[ref:b4418] Allah menurunkan ayat 117–118 tentang taubat mereka, dan Ka'ab menyebut ayat 119, \"Bertakwalah kepada Allah dan bersamalah dengan orang-orang yang benar\", juga turun tentang mereka.[ref:t3102][ref:lubab]"]
        },
        {
          id: "khullifu",
          judul: "Makna \"yang ditinggalkan\"",
          isi: ["Di akhir kisahnya, Ka'ab menjelaskan kata khullifu dalam ayat ini: yang dimaksud bukan tertinggalnya mereka dari peperangan, melainkan penangguhan keputusan Nabi ﷺ atas perkara mereka, berbeda dengan orang-orang yang bersumpah dan beralasan lalu alasannya diterima.[ref:b4418][ref:b4677]", "Ibnu Katsir, Ath-Thabari, dan Al-Qurthubi memegang makna ini; Al-Qurthubi juga mencatat tafsir dan bacaan lain.[ref:ik][ref:thabari][ref:qurthubi] Ath-Thabari menyamakan ketiganya dengan \"orang-orang yang ditangguhkan sampai ada keputusan Allah\" dalam ayat 106, dan Al-Wahidi menyebut nama ketiganya di bawah ayat itu.[ref:thabari][ref:wahidi]", "As-Suyuthi membawakan riwayat Ibnu Abbas bahwa tiga orang yang tidak ikut mengikat diri di tiang bersama Abu Lubabah adalah mereka yang disebut dalam ayat 106. Orang-orang berselisih tentang nasib mereka, sebagian berkata mereka binasa dan sebagian berharap taubat mereka diterima, sampai turun ayat 118.[ref:lubab110]"]
        },
        {
          id: "setelah",
          judul: "Setelah taubat diterima",
          isi: ["Sebagai bagian dari taubatnya, Ka'ab ingin menyedekahkan seluruh hartanya kepada Allah dan Rasul-Nya. Nabi ﷺ menyarankan agar ia menyimpan sebagian karena itu lebih baik baginya, dan Ka'ab pun menyimpan bagiannya di Khaibar.[ref:b4418][ref:t3102]", "Ka'ab juga bertekad tidak berkata kecuali yang benar selama hidupnya.[ref:b4418] Al-Qurthubi mengambil pelajaran dari kisah ini tentang kejujuran, dan tentang mengucilkan pelaku dosa sampai ia bertaubat.[ref:qurthubi]"]
        }
      ],
      lihatJuga: [
        {
          label: "Ka'ab bin Malik",
          tokoh: "kaab"
        },
        {
          label: "Ummu Salamah",
          tokoh: "ummusalamah"
        },
        {
          label: "Thalhah bin Ubaidillah",
          tokoh: "thalhah"
        },
        {
          label: "At-Taubah 40",
          wiki: "taubah-40",
          ket: "seruan Tabuk, surah yang sama"
        },
        {
          label: "Gunung Sal'",
          tempat: "sal",
          kota: "madinah",
          ket: "asal seruan kabar gembira"
        },
        {
          label: "Masjid Nabawi",
          tempat: "masjid-nabawi",
          kota: "madinah",
          ket: "taubat diumumkan seusai Subuh"
        }
      ],
      rujukan: {
        b4418: {
          t: "HR. Bukhari no. 4418, dari Ka'ab bin Malik (Kitab Al-Maghazi, bab hadits Ka'ab bin Malik).",
          url: "https://sunnah.com/bukhari:4418"
        },
        b4677: {
          t: "HR. Bukhari no. 4677, dari Ka'ab bin Malik (Kitab Tafsir, bab At-Taubah 118).",
          url: "https://sunnah.com/bukhari:4677"
        },
        m2769: {
          t: "HR. Muslim no. 2769a, dari Ka'ab bin Malik (Kitab Taubat, bab taubat Ka'ab bin Malik dan dua sahabatnya).",
          url: "https://sunnah.com/muslim/50/62"
        },
        m2769d: {
          t: "HR. Muslim no. 2769d, jalur Ma'qil bin 'Ubaidillah dari Az-Zuhri (Kitab Taubat): pasukan \"lebih dari sepuluh ribu\".",
          url: "https://sunnah.com/muslim:2769d"
        },
        t3102: {
          t: "HR. Tirmidzi no. 3102, dari Ka'ab bin Malik (Kitab Tafsir, Surah At-Taubah). Darussalam: shahih.",
          url: "https://sunnah.com/tirmidhi:3102"
        },
        wahidi: {
          t: "Al-Wahidi, Asbab an-Nuzul, At-Taubah 106 (terjemahan Inggris Mokrane Guezzou).",
          url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=9&Ayah=106&search=yes&img=A&LanguageID=2"
        },
        lubab: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 114 (At-Taubah 117–119, hadits Ka'ab bin Malik).",
          url: "https://shamela.ws/book/2247/112"
        },
        lubab110: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 110 (At-Taubah 102–106, riwayat Ibnu Abbas lewat Al-'Aufi).",
          url: "https://shamela.ws/book/2247/108"
        },
        muqbil: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 112–113 (At-Taubah 117–119, hadits Ka'ab dari Shahih Bukhari).",
          url: "https://shamela.ws/book/11547/107"
        },
        ik: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir At-Taubah 117–119.",
          url: "https://quran.com/9:118/tafsirs/ar-tafsir-ibn-kathir"
        },
        thabari: {
          t: "Ath-Thabari, Jami' al-Bayan, tafsir At-Taubah 118.",
          url: "https://quran.com/9:118/tafsirs/ar-tafsir-al-tabari"
        },
        qurthubi: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir At-Taubah 118.",
          url: "https://quran.com/9:118/tafsirs/ar-tafseer-al-qurtubi"
        },
        kemenag: {
          t: "Tafsir Ringkas Kemenag RI dan tafsir lain untuk At-Taubah 118 (dimuat di TafsirWeb).",
          url: "https://tafsirweb.com/3134-surat-at-taubah-ayat-118.html"
        }
      }
    },

    // hujurat-2 (ditulis dari riset rujukan silang)
    "hujurat-2": {
      judul: "Al-Hujurat 2",
      sub: "Adab berbicara di hadapan Nabi ﷺ",
      surah: "Al-Hujurat",
      ayatNo: "2",
      tahun: 631,
      tontonan: null,
      peta: {
        tahun: 631,
        lok: "madinah"
      },
      lead: ["Al-Hujurat ayat 2 melarang orang-orang beriman meninggikan suara melebihi suara Nabi ﷺ dan berbicara keras kepada beliau.[ref:kemenag] Menurut riwayat Bukhari, ayat ini turun ketika rombongan Bani Tamim datang dan Abu Bakar serta Umar berselisih tentang siapa yang diangkat memimpin mereka, hingga suara keduanya meninggi di hadapan Nabi ﷺ.[ref:b4845][ref:b7302]", "Riwayat lain menyebut Tsabit bin Qais bin Syammas, juru bicara kaum Anshar, yang mengurung diri karena takut amalnya terhapus akibat suaranya yang keras; Nabi ﷺ lalu mengabarkan bahwa ia termasuk penghuni surga.[ref:b4846][ref:m119b] Al-Wahidi memuat kedua kisah ini untuk ayat 2.[ref:wahidi]"],
      infobox: [
        ["Surah", "Al-Hujurat (الحجرات), surah ke-49 dalam mushaf"],
        ["Ayat", "2"],
        ["Golongan", "Madaniyah"],
        ["Waktu", "9 H (±631 M), saat rombongan Bani Tamim datang, menurut Ibnu Katsir; satu jalur Muslim yang menyebut Sa'ad bin Mu'adz (wafat 5 H) dinilainya cacat[ref:ik]"],
        ["Tempat", "Madinah, di hadapan Nabi ﷺ, pada masa datangnya para utusan kabilah[ref:ik]"],
        ["Tokoh", "Abu Bakar dan Umar; Al-Qa'qa' bin Ma'bad dan Al-Aqra' bin Habis dari Bani Tamim[ref:b4847]; Tsabit bin Qais bin Syammas[ref:b4846]"],
        ["Riwayat utama", "HR. Bukhari no. 4845 dan 7302 (Ibnu Abi Mulaikah, dengan tambahan Ibnu Az-Zubair); HR. Tirmidzi no. 3266 (Ibnu Az-Zubair); HR. Bukhari no. 4846 dan Muslim no. 119 (Anas, kisah Tsabit)"],
        ["Riwayat pembanding", "HR. Bukhari no. 4367 dan 4847 (Ibnu Az-Zubair): menyebut ayat 1 yang turun[ref:b4847]"],
        ["Derajat", "Shahih (Bukhari); At-Tirmidzi: hasan gharib[ref:t3266]"]
      ],
      ayat: [
        {
          no: 2,
          ar: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَرْفَعُوا أَصْوَاتَكُمْ فَوْقَ صَوْتِ النَّبِيِّ وَلَا تَجْهَرُوا لَهُ بِالْقَوْلِ كَجَهْرِ بَعْضِكُمْ لِبَعْضٍ أَن تَحْبَطَ أَعْمَالُكُمْ وَأَنتُمْ لَا تَشْعُرُونَ",
          id: "Wahai orang-orang yang beriman! Janganlah kamu meninggikan suaramu melebihi suara Nabi, dan janganlah kamu berkata kepadanya dengan suara keras sebagaimana kerasnya (suara) sebagian kamu terhadap yang lain, nanti (pahala) segala amalmu bisa terhapus sedangkan kamu tidak menyadari."
        }
      ],
      bagian: [
        {
          id: "tamim",
          judul: "Rombongan Bani Tamim",
          isi: ["Ibnu Abi Mulaikah, seorang tabi'in, menuturkan: dua orang terbaik, Abu Bakar dan Umar, hampir binasa karena meninggikan suara di hadapan Nabi ﷺ ketika rombongan Bani Tamim datang.[ref:b4845] Salah seorang dari keduanya mengusulkan Al-Aqra' bin Habis, saudara Bani Mujasyi', sebagai pemimpin mereka, sedangkan yang lain mengusulkan orang lain; perawi Nafi' bin Umar tidak ingat namanya.[ref:b4845]", "Abu Bakar berkata kepada Umar, \"Engkau hanya ingin menyelisihiku.\" Umar menjawab, \"Aku tidak bermaksud menyelisihimu.\" Suara keduanya meninggi dalam perselisihan itu, lalu Allah menurunkan, \"Wahai orang-orang yang beriman! Janganlah kamu meninggikan suaramu melebihi suara Nabi...\"[ref:b4845] Dalam riwayat Bukhari yang lain dari jalur yang sama, disebutkan ayat 2–3.[ref:b7302]"]
        },
        {
          id: "ayat1",
          judul: "Ayat 1 atau ayat 2?",
          isi: ["Jalur Ibnu Juraij, dari Ibnu Abi Mulaikah dari Abdullah bin Az-Zubair, menyebut nama keduanya: Abu Bakar mengusulkan Al-Qa'qa' bin Ma'bad bin Zurarah, sedangkan Umar mengusulkan Al-Aqra' bin Habis.[ref:b4367][ref:b4847] Namun menurut jalur ini, yang turun saat itu adalah ayat 1: \"Wahai orang-orang yang beriman! Janganlah kamu mendahului Allah dan Rasul-Nya.\"[ref:b4847][ref:b4367]", "As-Suyuthi mengutip jalur Ibnu Az-Zubair ini untuk ayat 1 sampai ayat 5.[ref:lubab] At-Tirmidzi meriwayatkannya lewat Nafi' bin Umar dari Ibnu Abi Mulaikah dari Ibnu Az-Zubair dengan menyebut ayat 2, menilainya hasan gharib, dan mencatat bahwa sebagian perawi meriwayatkannya secara mursal dari Ibnu Abi Mulaikah tanpa menyebut Ibnu Az-Zubair. Dalam versi At-Tirmidzi, Abu Bakar-lah yang mengusulkan Al-Aqra' dan Umar menolaknya.[ref:t3266]", "Ibnu Katsir mencatat bahwa kisah Abu Bakar dan Umar ini hanya diriwayatkan Al-Bukhari, tidak oleh Muslim.[ref:ik] Muqbil memuat jalur Ibnu Az-Zubair di bawah ayat 1 dan jalur Ibnu Abi Mulaikah di bawah ayat 2.[ref:muqbil]"]
        },
        {
          id: "suara",
          judul: "Suara yang direndahkan",
          isi: ["Ibnu Az-Zubair berkata: sesudah ayat ini turun, Umar berbicara kepada Nabi ﷺ dengan suara sangat pelan, seperti orang berbisik, sampai beliau harus memintanya mengulang. Ibnu Az-Zubair tidak menyebutkan hal yang sama tentang kakeknya dari pihak ibu, Abu Bakar.[ref:b4845][ref:b7302]", "Al-Bazzar meriwayatkan bahwa Abu Bakar bersumpah hanya akan berbicara kepada Nabi ﷺ seperti orang yang berbisik. Ibnu Katsir menyebut salah seorang perawinya, Husain bin Umar, lemah, tetapi mencatat ada riwayat serupa dari Abdurrahman bin 'Auf dan Abu Hurairah.[ref:ik]"]
        },
        {
          id: "tsabit",
          judul: "Kisah Tsabit bin Qais",
          isi: ["Anas bin Malik meriwayatkan: Nabi ﷺ merasa kehilangan Tsabit bin Qais, lalu seorang sahabat pergi mencarinya. Ia mendapati Tsabit duduk di rumahnya dengan kepala tertunduk. Tsabit berkata keadaannya buruk: ia biasa meninggikan suara melebihi suara Nabi ﷺ, sehingga amalnya terhapus dan ia termasuk penghuni neraka.[ref:b4846]", "Orang itu kembali dan menyampaikannya kepada Nabi ﷺ, lalu diutus lagi membawa kabar gembira: \"Engkau bukan penghuni neraka, tetapi penghuni surga.\"[ref:b4846] Dalam riwayat Muslim, Tsabit disebut juru bicara kaum Anshar.[ref:m119b]", "Ath-Thabari dan As-Suyuthi membawakan riwayat dari putranya, Muhammad bin Tsabit: ketika ayat ini turun, Tsabit duduk menangis di jalan karena takut ayat itu turun tentang dirinya, sebab suaranya keras. Nabi ﷺ memanggilnya dan bersabda, \"Tidakkah engkau ridha hidup terpuji, terbunuh sebagai syahid, dan masuk surga?\"[ref:thabari][ref:lubab] Menurut riwayat yang dikutip As-Suyuthi, Tsabit menjawab bahwa ia ridha dan tidak akan meninggikan suaranya lagi di atas suara Rasulullah ﷺ, lalu turunlah ayat 3.[ref:lubab] Tsabit kemudian gugur dalam Perang Yamamah.[ref:ik]"]
        },
        {
          id: "waktu",
          judul: "Kapan ayat ini turun",
          isi: ["Salah satu jalur Muslim menyebut Sa'ad bin Mu'adz dalam kisah Tsabit, padahal Sa'ad wafat tahun 5 H, beberapa hari setelah peristiwa Bani Quraizhah.[ref:ik] Ibnu Katsir menilai penyebutan Sa'ad itu cacat, karena hanya datang dari jalur Hammad bin Salamah, sedangkan jalur-jalur lain tidak menyebutnya.[ref:ik] Jalur Muslim yang lain memang tidak menyebut Sa'ad.[ref:m119b]", "Menurut Ibnu Katsir, ayat ini turun berkenaan dengan rombongan Bani Tamim, dan para utusan kabilah banyak berdatangan pada tahun 9 H.[ref:ik] Al-Qurthubi juga menukil riwayat Al-Mahdawi bahwa ayat ini berkaitan dengan suara Ali, Ja'far, dan Zaid bin Haritsah yang meninggi ketika mereka berselisih tentang hak asuh putri Hamzah.[ref:qurthubi]"]
        },
        {
          id: "kandungan",
          judul: "Kandungan ayat",
          isi: ["Ayat ini mengajarkan adab berbicara kepada Nabi ﷺ: tidak meninggikan suara melebihi suara beliau dan tidak berbicara keras kepada beliau seperti kepada sesama, karena hal itu dapat menghapus pahala amal tanpa disadari.[ref:kemenag]", "Ibnu Katsir menukil para ulama bahwa meninggikan suara di dekat makam beliau dibenci, sebagaimana di masa hidupnya, karena beliau tetap dimuliakan.[ref:ik] Al-Qurthubi menurunkan adab yang sama untuk majelis para ulama.[ref:qurthubi]"]
        }
      ],
      lihatJuga: [
        {
          label: "Abu Bakar Ash-Shiddiq",
          tokoh: "abubakar"
        },
        {
          label: "Umar bin Khattab",
          tokoh: "umar"
        },
        {
          label: "Abdullah bin Az-Zubair",
          tokoh: "abdullahzubair"
        },
        {
          label: "Sa'ad bin Mu'adz",
          tokoh: "saadmuadz"
        },
        {
          label: "Masjid Nabawi",
          tempat: "masjid-nabawi",
          kota: "madinah",
          ket: "lokasi di peta Madinah"
        }
      ],
      rujukan: {
        b4845: {
          t: "HR. Bukhari no. 4845, dari Nafi' bin Umar dari Ibnu Abi Mulaikah, dengan tambahan Ibnu Az-Zubair (Kitab Tafsir, Surah Al-Hujurat).",
          url: "https://sunnah.com/bukhari:4845"
        },
        b7302: {
          t: "HR. Bukhari no. 7302, dari Nafi' bin Umar dari Ibnu Abi Mulaikah (Kitab Al-I'tisham bil-Kitab was-Sunnah).",
          url: "https://sunnah.com/bukhari:7302"
        },
        b4367: {
          t: "HR. Bukhari no. 4367, dari Ibnu Juraij dari Ibnu Abi Mulaikah dari Abdullah bin Az-Zubair (Kitab Al-Maghazi).",
          url: "https://sunnah.com/bukhari:4367"
        },
        b4847: {
          t: "HR. Bukhari no. 4847, dari Ibnu Juraij dari Ibnu Abi Mulaikah dari Abdullah bin Az-Zubair (Kitab Tafsir, Surah Al-Hujurat).",
          url: "https://sunnah.com/bukhari:4847"
        },
        t3266: {
          t: "HR. Tirmidzi no. 3266, dari Ibnu Abi Mulaikah dari Abdullah bin Az-Zubair (Kitab Tafsir, Surah Al-Hujurat). Tirmidzi: hasan gharib; Darussalam: shahih.",
          url: "https://sunnah.com/tirmidhi:3266"
        },
        b4846: {
          t: "HR. Bukhari no. 4846, dari Musa bin Anas dari Anas bin Malik (Kitab Tafsir, Surah Al-Hujurat).",
          url: "https://sunnah.com/bukhari/65/367"
        },
        m119b: {
          t: "HR. Muslim no. 119b, dari Tsabit Al-Bunani dari Anas bin Malik (Kitab Iman, bab takutnya mukmin bila amalnya terhapus).",
          url: "https://sunnah.com/muslim:119b"
        },
        wahidi: {
          t: "Al-Wahidi, Asbab an-Nuzul, Al-Hujurat 2 (terjemahan Inggris Mokrane Guezzou).",
          url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=49&Ayah=2&search=yes&img=A&LanguageID=2"
        },
        lubab: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 178–179 (Al-Hujurat 1–3).",
          url: "https://shamela.ws/book/2247/177"
        },
        muqbil: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 197 (Al-Hujurat 1–2).",
          url: "https://shamela.ws/book/11547/192"
        },
        ik: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Al-Hujurat 2.",
          url: "https://quran.com/49:2/tafsirs/ar-tafsir-ibn-kathir"
        },
        thabari: {
          t: "Ath-Thabari, Jami' al-Bayan, tafsir Al-Hujurat 2.",
          url: "https://quran.com/49:2/tafsirs/ar-tafsir-al-tabari"
        },
        qurthubi: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Al-Hujurat 2.",
          url: "https://quran.com/49:2/tafsirs/ar-tafseer-al-qurtubi"
        },
        kemenag: {
          t: "Tafsir Ringkas Kemenag RI, Al-Hujurat 2 (dimuat di TafsirWeb).",
          url: "https://tafsirweb.com/9772-surat-al-hujurat-ayat-2.html"
        }
      }
    },

    // maidah-3 (ditulis dari riset rujukan silang)
    "maidah-3": {
      judul: "Al-Ma'idah 3",
      sub: "\"Pada hari ini telah Aku sempurnakan agamamu\"",
      surah: "Al-Ma'idah",
      ayatNo: "3",
      tahun: 632,
      tontonan: null,
      peta: {
        tahun: 632,
        lok: "makkah"
      },
      lead: ["Bagian Al-Ma'idah ayat 3, \"Pada hari ini telah Aku sempurnakan agamamu untukmu\", turun di Arafah pada hari Jumat, ketika Rasulullah ﷺ wukuf dalam Haji Wada'.[ref:b45][ref:wahidi] Keterangan ini datang dari Umar bin Khattab, saat seorang Yahudi berkata bahwa seandainya ayat itu turun kepada kaumnya, mereka akan menjadikan harinya hari raya.[ref:b45][ref:m3017]", "Riwayat ini menerangkan waktu dan tempat turunnya ayat, bukan peristiwa yang memicunya.[ref:b45][ref:wahidi] Ada beberapa pendapat lain tentang waktunya, termasuk riwayat yang mengaitkannya dengan Ghadir Khum, tetapi Ath-Thabari, Ibnu Katsir, dan Al-Qurthubi menguatkan riwayat Umar.[ref:thabari][ref:ik][ref:qurthubi]"],
      infobox: [
        ["Surah", "Al-Ma'idah (المائدة), surah ke-5 dalam mushaf"],
        ["Ayat", "3 (bagian \"al-yauma akmaltu lakum dinakum\")"],
        ["Golongan", "Madaniyah"],
        ["Waktu", "Jumat, hari Arafah (9 Dzulhijjah) 10 H (632 M), sore hari setelah Ashar[ref:b45][ref:a188][ref:wahidi]"],
        ["Tempat", "Padang Arafah, saat Nabi ﷺ wukuf di atas untanya, Al-'Adhba'[ref:b45][ref:wahidi][ref:qurthubi]"],
        ["Saksi", "Umar bin Khattab, yang hadir di Arafah saat itu[ref:b4606]"],
        ["Riwayat utama", "HR. Bukhari no. 45 dan 4606; HR. Muslim no. 3017; HR. Nasa'i no. 3002; HR. Ahmad no. 188 (Thariq bin Syihab dari Umar); HR. Tirmidzi no. 3044 (Ibnu Abbas)"],
        ["Derajat", "Shahih, diriwayatkan Bukhari dan Muslim; menurut Ibnu Katsir, riwayat tentang hari Jumat itu mutawatir[ref:ik]"],
        ["Pendapat lain", "Hari Senin, dalam perjalanan haji, bukan pada hari tertentu, hari Fathu Makkah, atau Ghadir Khum (18 Dzulhijjah); tidak dipilih Ath-Thabari, Ibnu Katsir, dan Al-Qurthubi[ref:thabari][ref:ik][ref:qurthubi]"]
      ],
      ayat: [
        {
          no: 3,
          ar: "الْيَوْمَ يَئِسَ الَّذِينَ كَفَرُوا مِن دِينِكُمْ فَلَا تَخْشَوْهُمْ وَاخْشَوْنِ ۚ الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي وَرَضِيتُ لَكُمُ الْإِسْلَامَ دِينًا",
          id: "Pada hari ini orang-orang kafir telah putus asa untuk (mengalahkan) agamamu, sebab itu janganlah kamu takut kepada mereka, tetapi takutlah kepada-Ku. Pada hari ini telah Aku sempurnakan agamamu untukmu, dan telah Aku cukupkan nikmat-Ku bagimu, dan telah Aku ridai Islam sebagai agamamu. (sebagian ayat)"
        }
      ],
      bagian: [
        {
          id: "umar",
          judul: "Jawaban Umar kepada seorang Yahudi",
          isi: ["Thariq bin Syihab meriwayatkan: seorang Yahudi berkata kepada Umar bin Khattab, \"Wahai Amirul Mukminin, ada satu ayat dalam kitab kalian yang kalian baca. Seandainya ayat itu turun kepada kami kaum Yahudi, tentu kami jadikan hari turunnya hari raya.\" Umar bertanya, \"Ayat yang mana?\" Ia menjawab, \"Pada hari ini telah Aku sempurnakan agamamu untukmu, dan telah Aku cukupkan nikmat-Ku bagimu, dan telah Aku ridai Islam sebagai agamamu.\"[ref:b45]", "Umar menjawab, \"Kami tahu hari itu dan tempat ayat itu turun kepada Nabi ﷺ: beliau sedang berdiri di Arafah pada hari Jumat.\"[ref:b45] Dalam riwayat Kitab Tafsir, Umar bersumpah bahwa ia sendiri berada di Arafah saat itu.[ref:b4606]", "Hadits ini juga diriwayatkan Muslim, An-Nasa'i, dan Ahmad.[ref:m3017][ref:n3002][ref:a188] Dalam riwayat Ahmad disebut \"sore hari Arafah pada hari Jumat\".[ref:a188] Al-Wahidi dan Al-Qurthubi menambahkan bahwa ayat ini turun setelah Ashar, ketika Nabi ﷺ berada di atas untanya, Al-'Adhba'.[ref:wahidi][ref:qurthubi]"]
        },
        {
          id: "ibnuabbas",
          judul: "Dua hari raya",
          isi: ["Ibnu Abbas pernah membaca ayat ini, dan seorang Yahudi di dekatnya berkata, \"Seandainya ayat ini turun kepada kami, tentu kami jadikan harinya hari raya.\" Ibnu Abbas menjawab bahwa ayat ini justru turun pada dua hari raya: hari Jumat dan hari Arafah.[ref:t3044]", "At-Tirmidzi menilainya hasan gharib dari hadits Ibnu Abbas, dan menyebutnya shahih.[ref:t3044] Al-Wahidi juga memuat riwayat ini.[ref:wahidi]"]
        },
        {
          id: "jumat",
          judul: "Keraguan tentang hari Jumat",
          isi: ["Dalam salah satu jalur Bukhari, perawi Sufyan ragu apakah hari itu hari Jumat.[ref:b4606] Ibnu Katsir menegaskan bahwa hari Arafah pada Haji Wada' itu jatuh pada hari Jumat: tidak ada ahli maghazi, ahli sirah, maupun fuqaha yang berbeda pendapat tentangnya, dan riwayatnya mutawatir.[ref:ik]"]
        },
        {
          id: "pendapat",
          judul: "Pendapat lain tentang waktunya",
          isi: ["Ath-Thabari mencatat beberapa pendapat lain: ayat ini turun pada hari Arafah tanpa menyebut hari Jumat (Ibnu Zaid), dalam perjalanan Haji Wada' (Ar-Rabi' bin Anas), pada hari Senin (dari Ibnu Abbas lewat jalur Hanasy, dan dari Qatadah), atau \"bukan pada hari yang diketahui\" (dari Ibnu Abbas lewat jalur Ali bin Abi Thalhah). Ia memilih riwayat Umar karena sanadnya paling shahih.[ref:thabari]", "Ibnu Katsir menilai riwayat hari Senin sebagai atsar gharib yang sanadnya lemah. Menurutnya, mungkin yang dimaksud Ibnu Abbas adalah \"hari dua hari raya\" (yaumi 'idaini itsnaini), lalu kata itsnain (dua) tertukar bagi perawi dengan hari Senin (yaum al-itsnain).[ref:ik]", "Ibnu Katsir juga menyebut riwayat Ibnu Mardawaih, lewat Abu Harun Al-'Abdi dari Abu Sa'id Al-Khudri dan riwayat lain dari Abu Hurairah, yang mengaitkan turunnya ayat ini dengan peristiwa di Ghadir Khum pada 18 Dzulhijjah, sepulang Haji Wada'. Ia menolak keduanya: \"Tidak shahih, baik yang ini maupun yang itu\"; yang benar tanpa keraguan, ayat ini turun pada hari Arafah, yang jatuh pada hari Jumat.[ref:ik]", "Al-Qurthubi menyebut riwayat Mujahid bahwa ayat ini turun pada hari Fathu Makkah, lalu menilai pendapat pertama, yaitu Arafah, lebih shahih.[ref:qurthubi]"]
        },
        {
          id: "kitab",
          judul: "Dalam kitab-kitab asbabun nuzul",
          isi: ["Al-Wahidi memuat riwayat Umar dan Ibnu Abbas dalam kitab asbabun nuzulnya.[ref:wahidi] As-Suyuthi dalam Lubab an-Nuqul hanya memuat riwayat untuk bagian awal ayat 3 tentang bangkai, dan Muqbil memulai bab Surah Al-Ma'idah dari ayat 6, sehingga keduanya tidak memuat entri untuk bagian ayat ini.[ref:lubab][ref:muqbil]"]
        },
        {
          id: "makna",
          judul: "Makna \"penyempurnaan\"",
          isi: ["As-Suddi dan sebagian riwayat dari Ibnu Abbas memahami penyempurnaan agama sebagai selesainya hukum halal dan haram, sehingga tidak turun lagi hukum sesudahnya.[ref:thabari] Ath-Thabari menolak pemahaman ini karena ayat kalalah turun sesudahnya, sebagaimana diriwayatkan Al-Bara' bin 'Azib, dan memilih makna bahwa Allah menyempurnakan agama mereka dengan menjadikan mereka berhaji sendiri tanpa kaum musyrik.[ref:thabari][ref:b4364]", "Ibnu Juraij dan lainnya menyebut Nabi ﷺ wafat 81 hari setelah hari Arafah itu.[ref:ik] Ibnu Jarir juga meriwayatkan dari Harun bin 'Antarah dari ayahnya bahwa Umar menangis ketika ayat ini turun, karena \"tidak ada sesudah kesempurnaan kecuali kekurangan\", dan Nabi ﷺ membenarkannya; Ibnu Katsir mengutipnya tanpa menilai sanadnya.[ref:ik]", "Tafsir Ringkas Kemenag menjelaskan \"hari ini\" dalam ayat sebagai waktu Haji Wada', haji terakhir yang dilakukan Nabi Muhammad ﷺ.[ref:kemenag]"]
        }
      ],
      lihatJuga: [
        {
          label: "An-Nashr 1–3",
          wiki: "nashr-1-3",
          ket: "riwayat hari tasyriq Haji Wada'"
        },
        {
          label: "Umar bin Khattab",
          tokoh: "umar"
        },
        {
          label: "Abdullah bin Abbas",
          tokoh: "ibnuabbas"
        }
      ],
      rujukan: {
        b45: {
          t: "HR. Bukhari no. 45, dari Thariq bin Syihab dari Umar bin Khattab (Kitab Iman).",
          url: "https://sunnah.com/bukhari:45"
        },
        b4606: {
          t: "HR. Bukhari no. 4606, dari Thariq bin Syihab (Kitab Tafsir, bab \"al-yauma akmaltu lakum dinakum\").",
          url: "https://sunnah.com/bukhari:4606"
        },
        m3017: {
          t: "HR. Muslim no. 3017c, dari Thariq bin Syihab dari Umar (Kitab Tafsir).",
          url: "https://sunnah.com/muslim:3017c"
        },
        n3002: {
          t: "HR. Nasa'i no. 3002, dari Thariq bin Syihab dari Umar (Kitab Manasik Haji, bab hari Arafah). Darussalam: shahih.",
          url: "https://sunnah.com/nasai:3002"
        },
        a188: {
          t: "HR. Ahmad no. 188, dari Thariq bin Syihab dari Umar (Musnad Umar). Darussalam: shahih.",
          url: "https://sunnah.com/ahmad:188"
        },
        t3044: {
          t: "HR. Tirmidzi no. 3044, dari 'Ammar bin Abi 'Ammar tentang Ibnu Abbas (Kitab Tafsir, Surah Al-Ma'idah). Tirmidzi: hasan gharib, shahih; Darussalam: shahih.",
          url: "https://sunnah.com/tirmidhi:3044"
        },
        b4364: {
          t: "HR. Bukhari no. 4364, dari Al-Bara' bin 'Azib (Kitab Al-Maghazi): ayat terakhir yang turun adalah akhir Surah An-Nisa'.",
          url: "https://sunnah.com/bukhari:4364"
        },
        wahidi: {
          t: "Al-Wahidi, Asbab an-Nuzul, Al-Ma'idah 3 (terjemahan Inggris Mokrane Guezzou).",
          url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=5&Ayah=3&search=yes&img=A&LanguageID=2"
        },
        lubab: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 75 (Al-Ma'idah 3, hanya bagian tentang bangkai).",
          url: "https://shamela.ws/book/2247/73"
        },
        muqbil: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 83 (bab Surah Al-Ma'idah dimulai dari ayat 6).",
          url: "https://shamela.ws/book/11547/78"
        },
        ik: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Al-Ma'idah 3.",
          url: "https://quran.com/5:3/tafsirs/ar-tafsir-ibn-kathir"
        },
        thabari: {
          t: "Ath-Thabari, Jami' al-Bayan, tafsir Al-Ma'idah 3.",
          url: "https://quran.com/5:3/tafsirs/ar-tafsir-al-tabari"
        },
        qurthubi: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Al-Ma'idah 3.",
          url: "https://quran.com/5:3/tafsirs/ar-tafseer-al-qurtubi"
        },
        kemenag: {
          t: "Tafsir Ringkas Kemenag RI dan tafsir lain untuk Al-Ma'idah 3 (dimuat di TafsirWeb).",
          url: "https://tafsirweb.com/1887-surat-al-maidah-ayat-3.html"
        }
      }
    },

    // anam-52 (ditulis dari riset rujukan silang)
    "anam-52": {
      judul: "Al-An'am 52",
      sub: "Larangan mengusir sahabat yang lemah",
      surah: "Al-An'am",
      ayatNo: "52",
      tahun: 617,
      tontonan: null,
      peta: {
        tahun: 617,
        lok: "makkah"
      },
      lead: ["Al-An'am ayat 52 melarang Nabi ﷺ mengusir orang-orang beriman yang menyeru Tuhannya pagi dan petang demi mengharap keridaan-Nya.[ref:kemenag] Sa'ad bin Abi Waqqash menuturkan bahwa ayat ini turun tentang enam orang, termasuk dirinya dan Abdullah bin Mas'ud, ketika kaum musyrikin meminta Nabi ﷺ menjauhkan mereka.[ref:m2413a][ref:m2413b]", "Dalam riwayat Ibnu Majah, yang meminta adalah kaum Quraisy, dan keenam orang itu adalah Sa'ad, Ibnu Mas'ud, Shuhaib, Ammar, Al-Miqdad, dan Bilal.[ref:ib4128] Riwayat lain yang menyebut Al-Aqra' bin Habis dan 'Uyainah bin Hishn dinilai gharib oleh Ibnu Katsir, karena ayat ini Makkiyah sedangkan keduanya baru masuk Islam lama setelah Hijrah.[ref:ik]"],
      infobox: [
        ["Surah", "Al-An'am (الأنعام), surah ke-6 dalam mushaf"],
        ["Ayat", "52; dalam riwayat Ibnu Hibban dan Al-Hakim, sampai ayat 53[ref:lubab]"],
        ["Golongan", "Makkiyah; Ibnu Katsir menegaskan ayat ini Makkiyah[ref:ik]"],
        ["Waktu", "Tidak disebut dalam riwayat; periode Mekah (±617 M di peta hanya perkiraan)"],
        ["Tempat", "Mekah (tempat persisnya tidak disebut)"],
        ["Tokoh", "Sa'ad bin Abi Waqqash, Abdullah bin Mas'ud, Bilal, seorang laki-laki dari Hudzail, dan dua orang yang tidak disebut namanya (riwayat Muslim)[ref:m2413b]; menurut riwayat Ibnu Majah juga Shuhaib, Ammar, dan Al-Miqdad; yang meminta adalah kaum Quraisy[ref:ib4128]"],
        ["Riwayat utama", "HR. Muslim no. 2413a dan 2413b (Sa'ad bin Abi Waqqash)[ref:m2413a][ref:m2413b]; HR. Ibnu Majah no. 4128[ref:ib4128]"],
        ["Riwayat pembanding", "HR. Ibnu Majah no. 4127 (Khabbab: Al-Aqra' bin Habis dan 'Uyainah bin Hishn)[ref:ib4127]; riwayat Ibnu Mas'ud (Ahmad, Ibnu Jarir) dan 'Ikrimah (Ibnu Jarir)[ref:ik][ref:thabari]"],
        ["Derajat", "Shahih (Muslim). Ibnu Majah no. 4128: shahih menurut Darussalam[ref:ib4128]; Al-Hakim menilai riwayat Sa'ad shahih sesuai syarat Bukhari dan Muslim, disetujui Adz-Dzahabi[ref:muqbil]. Riwayat Khabbab: dha'if menurut Darussalam[ref:ib4127], gharib menurut Ibnu Katsir[ref:ik]"]
      ],
      ayat: [
        {
          no: 52,
          ar: "وَلَا تَطْرُدِ الَّذِينَ يَدْعُونَ رَبَّهُم بِالْغَدَاةِ وَالْعَشِيِّ يُرِيدُونَ وَجْهَهُ ۖ مَا عَلَيْكَ مِنْ حِسَابِهِم مِّن شَيْءٍ وَمَا مِنْ حِسَابِكَ عَلَيْهِم مِّن شَيْءٍ فَتَطْرُدَهُمْ فَتَكُونَ مِنَ الظَّالِمِينَ",
          id: "Janganlah engkau mengusir orang-orang yang menyeru Tuhannya di pagi hari dan petang hari, mereka mengharapkan keridaan-Nya. Engkau tidak memikul tanggung jawab sedikit pun terhadap perbuatan mereka dan mereka tidak memikul tanggung jawab sedikit pun terhadap perbuatanmu, yang menyebabkan engkau (berhak) mengusir mereka, sehingga engkau termasuk orang-orang yang zalim."
        }
      ],
      bagian: [
        {
          id: "enam",
          judul: "Enam orang yang diminta dijauhkan",
          isi: ["Sa'ad bin Abi Waqqash berkata bahwa ayat ini turun tentang dirinya: turun tentang enam orang, dan ia serta Ibnu Mas'ud termasuk di antara mereka. Kaum musyrikin mempersoalkan mengapa Nabi ﷺ mendekatkan orang-orang itu.[ref:m2413a][ref:ik]", "Dalam jalur Isra'il, Sa'ad menuturkan bahwa mereka berenam sedang bersama Nabi ﷺ ketika kaum musyrikin berkata kepada beliau, \"Usirlah mereka, agar mereka tidak berani kepada kami.\" Ia menyebut dirinya, Ibnu Mas'ud, seorang laki-laki dari Hudzail, Bilal, dan dua orang lagi yang tidak ia sebutkan namanya.[ref:m2413b]", "Lalu terlintas dalam hati Rasulullah ﷺ apa yang Allah kehendaki, dan beliau berbicara dalam hatinya. Maka Allah menurunkan, \"Janganlah engkau mengusir orang-orang yang menyeru Tuhannya di pagi hari dan petang hari, mereka mengharapkan keridaan-Nya.\"[ref:m2413b]"]
        },
        {
          id: "quraisy",
          judul: "Permintaan para pemuka Quraisy",
          isi: ["Riwayat Ibnu Majah dari Sa'ad menyebut nama keenam orang itu: Sa'ad, Ibnu Mas'ud, Shuhaib, Ammar, Al-Miqdad, dan Bilal. Kaum Quraisy meminta Rasulullah ﷺ mengusir mereka, lalu terlintas sesuatu dalam hati beliau, dan turunlah ayat ini.[ref:ib4128] Al-Wahidi membawakan nama-nama yang sama lewat jalur Al-Miqdam bin Syuraih.[ref:wahidi]", "Dalam lafal Ibnu Hibban dan Al-Hakim yang dibawakan As-Suyuthi, mereka berkata, \"Usirlah mereka, karena kami malu menjadi pengikutmu seperti orang-orang ini.\"[ref:lubab] Muqbil memuat hadits Sa'ad ini dari Shahih Muslim dan menukil penilaian Al-Hakim bahwa riwayatnya shahih sesuai syarat Bukhari dan Muslim, disetujui Adz-Dzahabi.[ref:muqbil]", "Ibnu Mas'ud juga meriwayatkan bahwa sekelompok pemuka Quraisy melewati Nabi ﷺ ketika di sisi beliau ada Khabbab bin Al-Arat, Shuhaib, Bilal, dan Ammar. Mereka bertanya apakah beliau rela dengan orang-orang itu, dan berkata bahwa seandainya beliau mengusir mereka, niscaya mereka akan mengikutinya.[ref:lubab][ref:ik] Menurut riwayat ini, kemudian turunlah ayat-ayat tentang mereka, dari ayat 51 sampai ayat 55.[ref:lubab89] Ibnu Katsir menukilnya dari Ahmad dan Ibnu Jarir.[ref:ik]"]
        },
        {
          id: "ikrimah",
          judul: "Riwayat 'Ikrimah: permintaan lewat Abu Thalib",
          isi: ["Ath-Thabari dan Al-Wahidi membawakan riwayat 'Ikrimah: Utbah dan Syaibah bin Rabi'ah, Muth'im bin 'Adi, dan Al-Harits bin Naufal, para pemuka Bani Abdi Manaf, mendatangi Abu Thalib dan meminta agar keponakannya menjauhkan para budak dan sekutu dari majelisnya, karena hal itu akan membuatnya lebih dihormati di mata mereka dan lebih mendekatkan mereka untuk mengikutinya.[ref:thabari][ref:wahidi][ref:lubab89]", "Abu Thalib menyampaikannya kepada Nabi ﷺ, dan Umar bin Khattab sempat menyarankan agar permintaan itu dipenuhi untuk melihat apa yang sebenarnya mereka inginkan. Setelah ayat turun, Umar datang meminta maaf atas ucapannya.[ref:wahidi][ref:lubab89] Orang-orang yang dimaksud antara lain Bilal, Ammar bin Yasir, Salim maula Abu Hudzaifah, Ibnu Mas'ud, dan Al-Miqdad.[ref:lubab89][ref:thabari]", "Sebab turun yang diriwayatkan seorang tabi'in seperti 'Ikrimah berstatus mursal; menurut As-Suyuthi, riwayat seperti ini dapat diterima bila sanadnya shahih sampai kepadanya dan ia termasuk imam tafsir murid para sahabat, atau bila dikuatkan riwayat mursal lain.[ref:itqan]"]
        },
        {
          id: "khabbab",
          judul: "Riwayat Khabbab dan penilaiannya",
          isi: ["Khabbab bin Al-Arat meriwayatkan bahwa Al-Aqra' bin Habis At-Tamimi dan 'Uyainah bin Hishn Al-Fazari mendapati Nabi ﷺ duduk bersama Shuhaib, Bilal, Ammar, Khabbab, dan orang-orang mukmin yang lemah. Mereka meminta majelis khusus agar para utusan Arab tidak melihat mereka bersama orang-orang itu, dan meminta perjanjian tertulis.[ref:ib4127]", "Menurut riwayat ini, Jibril datang membawa ayat 52 sehingga Nabi ﷺ melemparkan lembaran itu, dan kemudian turun Al-Kahf 28 yang memerintahkan beliau bersabar bersama orang-orang yang menyeru Tuhannya pagi dan petang.[ref:ib4127][ref:ik][ref:thabari]", "Darussalam menilai riwayat Ibnu Majah ini dha'if.[ref:ib4127] Ibnu Katsir menyebutnya gharib, karena ayat ini Makkiyah sedangkan Al-Aqra' dan 'Uyainah baru masuk Islam lama sesudah Hijrah; As-Suyuthi menukil penilaian itu.[ref:ik][ref:lubab89]"]
        },
        {
          id: "makna",
          judul: "Pagi dan petang",
          isi: ["Ibnu Katsir menukil Sa'id bin Al-Musayyab, Mujahid, Al-Hasan, dan Qatadah bahwa \"menyeru Tuhannya pagi dan petang\" maksudnya shalat fardhu.[ref:ik] Al-Qurthubi menyebut pula pendapat dzikir dan membaca Al-Qur'an, sedangkan Ath-Thabari memilih makna umum yang mencakup dzikir, pujian, dan amal ibadah, tanpa mengkhususkan salah satunya.[ref:qurthubi][ref:thabari]", "Ibnu Katsir membandingkan ayat ini dengan perintah bersabar bersama mereka dalam Al-Kahf 28 dan dengan jawaban Nabi Nuh kepada kaumnya yang meremehkan para pengikutnya dalam Surah Asy-Syu'ara.[ref:ik]"]
        },
        {
          id: "kandungan",
          judul: "Kandungan ayat",
          isi: ["Tafsir Ringkas Kemenag menjelaskan bahwa setiap orang bertanggung jawab atas amalnya sendiri, sehingga kedudukan sosial bukan alasan untuk menjauhi orang-orang beriman yang kurang mampu, dan dakwah tidak boleh membeda-bedakan mereka.[ref:kemenag] Tafsir Tahlili Kemenag di NU Online menyebut tokoh-tokoh musyrik yang mau mendengarkan dakwah asalkan Bilal bin Rabah dan kawan-kawannya diusir.[ref:nuonline]", "Ath-Thabari menyimpulkan bahwa kedekatan kepada Allah diraih dengan amal, bukan dengan kedudukan; hisab mereka dan hisab Nabi ﷺ terpisah, sehingga tidak ada alasan untuk mengusir mereka.[ref:thabari]"]
        }
      ],
      lihatJuga: [
        {
          label: "Sa'ad bin Abi Waqqash",
          tokoh: "saad"
        },
        {
          label: "Abdullah bin Mas'ud",
          tokoh: "ibnumasud"
        },
        {
          label: "Bilal bin Rabah",
          tokoh: "bilal"
        },
        {
          label: "Shuhaib Ar-Rumi",
          tokoh: "suhaib"
        },
        {
          label: "Ammar bin Yasir",
          tokoh: "ammar"
        },
        {
          label: "Khabbab bin Al-Arat",
          tokoh: "khabbab"
        },
        {
          label: "'Abasa 1–10",
          wiki: "abasa-1-10",
          ket: "tema serupa: perhatian kepada sahabat yang lemah"
        }
      ],
      rujukan: {
        m2413a: {
          t: "HR. Muslim no. 2413a, dari Sa'ad bin Abi Waqqash (Kitab Keutamaan Sahabat, bab keutamaan Sa'ad).",
          url: "https://sunnah.com/muslim:2413a"
        },
        m2413b: {
          t: "HR. Muslim no. 2413b, jalur Isra'il dari Al-Miqdam bin Syuraih dari ayahnya dari Sa'ad bin Abi Waqqash (Kitab Keutamaan Sahabat).",
          url: "https://sunnah.com/muslim:2413b"
        },
        ib4128: {
          t: "HR. Ibnu Majah no. 4128, dari Sa'ad bin Abi Waqqash (Kitab Zuhud, bab duduk bersama orang-orang miskin). Darussalam: shahih.",
          url: "https://sunnah.com/ibnmajah:4128"
        },
        ib4127: {
          t: "HR. Ibnu Majah no. 4127, dari Khabbab bin Al-Arat (Kitab Zuhud, bab duduk bersama orang-orang miskin). Darussalam: dha'if.",
          url: "https://sunnah.com/ibnmajah:4127"
        },
        wahidi: {
          t: "Al-Wahidi, Asbab an-Nuzul, Al-An'am 52 (terjemahan Inggris Mokrane Guezzou).",
          url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=6&Ayah=52&search=yes&img=A&LanguageID=2"
        },
        lubab: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 88 (Al-An'am 52: riwayat Sa'ad dan Ibnu Mas'ud).",
          url: "https://shamela.ws/book/2247/86"
        },
        lubab89: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 89 (lanjutan Al-An'am 52: riwayat 'Ikrimah dan Khabbab, penilaian Ibnu Katsir).",
          url: "https://shamela.ws/book/2247/87"
        },
        muqbil: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 93 (Al-An'am 52, hadits Sa'ad dari Shahih Muslim).",
          url: "https://shamela.ws/book/11547/88"
        },
        itqan: {
          t: "As-Suyuthi, Al-Itqan fi 'Ulum al-Qur'an 1/117, bab sebab turun (riwayat tabi'in berstatus mursal dan syarat penerimaannya).",
          url: "https://shamela.ws/book/11728/110"
        },
        ik: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Al-An'am 52.",
          url: "https://quran.com/6:52/tafsirs/ar-tafsir-ibn-kathir"
        },
        thabari: {
          t: "Ath-Thabari, Jami' al-Bayan, tafsir Al-An'am 52.",
          url: "https://quran.com/6:52/tafsirs/ar-tafsir-al-tabari"
        },
        qurthubi: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Al-An'am 52.",
          url: "https://quran.com/6:52/tafsirs/ar-tafseer-al-qurtubi"
        },
        kemenag: {
          t: "Tafsir Ringkas Kemenag RI dan tafsir lain untuk Al-An'am 52 (dimuat di TafsirWeb).",
          url: "https://tafsirweb.com/2176-surat-al-anam-ayat-52.html"
        },
        nuonline: {
          t: "Al-Qur'an NU Online, Al-An'am 52 (Tafsir Tahlili Kemenag).",
          url: "https://quran.nu.or.id/al-anam/52"
        }
      }
    },

    // isra-110 (ditulis dari riset rujukan silang)
    "isra-110": {
      judul: "Al-Isra' 110",
      sub: "Bacaan shalat yang tidak terlalu keras dan tidak terlalu pelan",
      surah: "Al-Isra'",
      ayatNo: "110",
      tahun: 614,
      tontonan: null,
      peta: {
        tahun: 614,
        lok: "makkah"
      },
      lead: ["Al-Isra' ayat 110 memerintahkan Nabi ﷺ agar tidak mengeraskan bacaan dalam shalat dan tidak pula merendahkannya, tetapi mengambil jalan tengah.[ref:kemenag] Menurut Ibnu Abbas, ayat ini turun ketika Rasulullah ﷺ masih bersembunyi di Mekah: bila beliau mengimami para sahabat dengan bacaan yang keras, orang-orang musyrik yang mendengarnya mencaci Al-Qur'an, Allah yang menurunkannya, dan Nabi yang membawanya.[ref:b4722][ref:m446]", "Aisyah meriwayatkan bahwa ayat ini turun tentang doa.[ref:b4723][ref:m447] Ath-Thabari mengunggulkan riwayat Ibnu Abbas karena sanadnya lebih shahih, dan An-Nawawi serta ulama lain sependapat; Ibnu Hajar membuka kemungkinan memadukan keduanya, yaitu doa di dalam shalat.[ref:thabari][ref:fath405][ref:lubab]"],
      infobox: [
        ["Surah", "Al-Isra' (الإسراء), surah ke-17 dalam mushaf"],
        ["Ayat", "110; bagian awal ayat (\"Allah\" atau \"Ar-Rahman\") punya riwayat sebab tersendiri[ref:lubab]"],
        ["Golongan", "Makkiyah"],
        ["Waktu", "Awal Islam, ketika Nabi ﷺ masih bersembunyi di Mekah, menurut Ibnu Hajar[ref:fath405]; tahunnya tidak disebut (±614 M di peta hanya perkiraan)"],
        ["Tempat", "Mekah (tempat persisnya tidak disebut)[ref:b4722]"],
        ["Yang terlibat", "Rasulullah ﷺ dan para sahabat yang shalat bersama beliau; orang-orang musyrik Mekah yang mendengar bacaan[ref:b4722]"],
        ["Riwayat utama", "HR. Bukhari no. 4722 dan HR. Muslim no. 446 (Ibnu Abbas)[ref:b4722][ref:m446]"],
        ["Riwayat pembanding", "HR. Bukhari no. 4723 dan HR. Muslim no. 447a (Aisyah): tentang doa[ref:b4723][ref:m447]; riwayat Aisyah lain: tentang tasyahhud (Ibnu Jarir, Al-Hakim)[ref:lubab]"],
        ["Derajat", "Shahih (Bukhari dan Muslim); At-Tirmidzi menilai riwayat Ibnu Abbas hasan shahih[ref:muqbil]"]
      ],
      ayat: [
        {
          no: 110,
          ar: "قُلِ ادْعُوا اللَّهَ أَوِ ادْعُوا الرَّحْمَٰنَ ۖ أَيًّا مَّا تَدْعُوا فَلَهُ الْأَسْمَاءُ الْحُسْنَىٰ ۚ وَلَا تَجْهَرْ بِصَلَاتِكَ وَلَا تُخَافِتْ بِهَا وَابْتَغِ بَيْنَ ذَٰلِكَ سَبِيلًا",
          id: "Katakanlah (Muhammad), \"Serulah Allah atau serulah Ar-Rahman. Dengan nama yang mana saja kamu dapat menyeru, karena Dia mempunyai nama-nama yang terbaik (Asmaul Husna) dan janganlah engkau mengeraskan suaramu dalam shalat dan janganlah (pula) merendahkannya dan usahakan jalan tengah di antara kedua itu.\""
        }
      ],
      bagian: [
        {
          id: "sembunyi",
          judul: "Bacaan yang terdengar kaum musyrikin",
          isi: ["Ibnu Abbas menjelaskan bahwa ayat ini turun ketika Rasulullah ﷺ bersembunyi di Mekah. Bila beliau shalat bersama para sahabat, beliau mengeraskan bacaan Al-Qur'an; ketika orang-orang musyrik mendengarnya, mereka mencaci Al-Qur'an, Allah yang menurunkannya, dan Nabi yang membawanya.[ref:b4722][ref:m446]", "Maka Allah berfirman kepada Nabi-Nya, \"Dan janganlah engkau mengeraskan suaramu dalam shalat\", yakni bacaanmu, sehingga orang-orang musyrik mendengar lalu mencaci Al-Qur'an; \"dan janganlah (pula) merendahkannya\" dari para sahabatmu sehingga mereka tidak mendengarnya; \"dan usahakan jalan tengah di antara kedua itu.\"[ref:b4722]", "Ibnu Hajar menjelaskan bahwa \"bersembunyi di Mekah\" maksudnya di awal Islam.[ref:fath405] Ibnu Ishaq membawakan riwayat Ibnu Abbas yang lebih panjang: bila beliau mengeraskan bacaan, orang-orang musyrik menjauh dan enggan mendengarnya, dan bila beliau merendahkannya, orang yang diam-diam ingin menyimak tidak lagi dapat mendengarnya.[ref:ik][ref:muqbil]"]
        },
        {
          id: "doa",
          judul: "Riwayat Aisyah: tentang doa",
          isi: ["Aisyah berkata bahwa ayat ini diturunkan tentang doa.[ref:b4723][ref:m447] Ath-Thabari membawakan pendapat yang sama dari sejumlah tabi'in, antara lain Mujahid, Sa'id bin Jubair, 'Atha', dan Makhul, serta satu riwayat dari Ibnu Abbas.[ref:thabari]", "Dalam riwayat Aisyah yang lain, yang dibawakan Ibnu Jarir dan Al-Hakim, ayat ini turun tentang tasyahhud.[ref:lubab] Al-Wahidi juga membawakan riwayat Abdullah bin Syaddad bahwa sebagian orang badui Bani Tamim mengeraskan doa meminta harta dan anak setelah shalat.[ref:wahidi][ref:ik]"]
        },
        {
          id: "tarjih",
          judul: "Mana yang lebih kuat",
          isi: ["Ath-Thabari memilih riwayat Ibnu Abbas lewat Sa'id bin Jubair, karena sanadnya paling shahih di antara riwayat sahabat dalam masalah ini dan paling sesuai dengan konteks ayat.[ref:thabari] Ibnu Hajar menukil pilihan Ath-Thabari itu dan menyebut An-Nawawi serta ulama lain juga mengunggulkannya.[ref:fath405][ref:lubab]", "Ibnu Hajar lalu membuka kemungkinan memadukan kedua riwayat: ayat ini turun tentang doa di dalam shalat. Ia menyebut riwayat Ibnu Mardawaih dari Abu Hurairah bahwa bila Rasulullah ﷺ shalat di dekat Ka'bah, beliau mengeraskan suara ketika berdoa, lalu turunlah ayat ini.[ref:fath406][ref:lubab] As-Suyuthi menambahkan bahwa riwayat tasyahhud menjelaskan maksud Aisyah dalam riwayat sebelumnya.[ref:lubab]", "Muqbil menilai penjelasan-penjelasan itu tidak saling bertentangan: kaum musyrikin bisa saja mencaci Al-Qur'an dan pembawanya, sementara ayat ini juga mencakup doa di dalam shalat.[ref:muqbil132]"]
        },
        {
          id: "awal",
          judul: "Bagian awal ayat: \"Allah\" atau \"Ar-Rahman\"",
          isi: ["Untuk bagian awal ayat, Ath-Thabari membawakan riwayat Ibnu Abbas bahwa kaum musyrikin mendengar Nabi ﷺ berdoa dalam sujudnya, \"Ya Rahman, ya Rahim,\" lalu mengira beliau menyeru dua tuhan.[ref:thabari] Al-Qurthubi, dan As-Suyuthi dari Ibnu Mardawaih, membawakannya dengan lafal \"Ya Allah, ya Rahman\": orang-orang musyrik berkata bahwa beliau melarang mereka menyeru dua tuhan, padahal beliau sendiri menyeru dua tuhan.[ref:qurthubi][ref:lubab]", "Ibnu Katsir dan Al-Qurthubi menegaskan bahwa \"Allah\" dan \"Ar-Rahman\" adalah dua nama bagi Zat yang satu; dengan nama mana pun Dia diseru, Dia mempunyai nama-nama yang terbaik.[ref:ik][ref:qurthubi]"]
        },
        {
          id: "kandungan",
          judul: "Kandungan ayat",
          isi: ["Tafsir Ringkas Kemenag menjelaskan bahwa menyeru Allah dengan nama \"Allah\" atau \"Ar-Rahman\" tidak berarti mengakui banyak tuhan, karena keduanya termasuk Asmaul Husna. Nabi ﷺ juga diingatkan agar tidak mengeraskan bacaan shalat sehingga orang musyrik mengejeknya, dan tidak merendahkannya sampai tidak terdengar.[ref:kemenag] Tafsir Tahlili Kemenag di NU Online juga menyebut tujuannya, yaitu agar orang-orang musyrik Mekah tidak menyakiti Nabi ﷺ dan menghina agamanya.[ref:nuonline]", "Al-Qurthubi membedakan hukumnya: dalam shalat sunnah orang boleh memilih mengeraskan atau memelankan bacaan, sedangkan bacaan shalat fardhu sudah jelas ketentuannya, baik malam maupun siang.[ref:qurthubi] Ibnu Katsir membawakan riwayat Adh-Dhahhak bahwa setelah Hijrah ketentuan ini tidak lagi mengikat, sehingga Nabi ﷺ boleh memilih.[ref:ik]"]
        }
      ],
      lihatJuga: [
        {
          label: "Abdullah bin Abbas",
          tokoh: "ibnuabbas"
        },
        {
          label: "Aisyah binti Abu Bakar",
          tokoh: "aisyah"
        },
        {
          label: "Al-Isra' 1",
          wiki: "isra-1",
          ket: "surah yang sama"
        },
        {
          label: "Ka'bah",
          tempat: "kabah",
          kota: "mekah",
          ket: "riwayat Abu Hurairah: doa Nabi saat shalat di dekat Ka'bah"
        }
      ],
      rujukan: {
        b4722: {
          t: "HR. Bukhari no. 4722, dari Sa'id bin Jubair dari Ibnu Abbas (Kitab Tafsir, Surah Al-Isra').",
          url: "https://sunnah.com/bukhari:4722"
        },
        m446: {
          t: "HR. Muslim no. 446, dari Sa'id bin Jubair dari Ibnu Abbas (Kitab Shalat, bab bacaan pertengahan antara keras dan pelan).",
          url: "https://sunnah.com/muslim/4/163"
        },
        b4723: {
          t: "HR. Bukhari no. 4723, dari Hisyam bin 'Urwah dari ayahnya dari Aisyah (Kitab Tafsir, Surah Al-Isra').",
          url: "https://sunnah.com/bukhari:4723"
        },
        m447: {
          t: "HR. Muslim no. 447a, dari Hisyam bin 'Urwah dari ayahnya dari Aisyah (Kitab Shalat).",
          url: "https://sunnah.com/muslim:447"
        },
        fath405: {
          t: "Ibnu Hajar, Fath al-Bari 8/405 (Kitab Tafsir, Surah Bani Isra'il, bab \"wa la tajhar bi shalatika\").",
          url: "https://shamela.ws/book/1673/4752"
        },
        fath406: {
          t: "Ibnu Hajar, Fath al-Bari 8/406 (lanjutan bab yang sama: doa di dalam shalat, riwayat Abu Hurairah).",
          url: "https://shamela.ws/book/1673/4753"
        },
        wahidi: {
          t: "Al-Wahidi, Asbab an-Nuzul, Al-Isra' 110 (terjemahan Inggris Mokrane Guezzou).",
          url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=17&Ayah=110&search=yes&img=A&LanguageID=2"
        },
        lubab: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 128 (Al-Isra' 110).",
          url: "https://shamela.ws/book/2247/126"
        },
        muqbil: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 131 (Al-Isra' 110: riwayat Ibnu Abbas dan Aisyah).",
          url: "https://shamela.ws/book/11547/126"
        },
        muqbil132: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 132 (komentar penyusun tentang Al-Isra' 110).",
          url: "https://shamela.ws/book/11547/127"
        },
        ik: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Al-Isra' 110.",
          url: "https://quran.com/17:110/tafsirs/ar-tafsir-ibn-kathir"
        },
        thabari: {
          t: "Ath-Thabari, Jami' al-Bayan, tafsir Al-Isra' 110.",
          url: "https://quran.com/17:110/tafsirs/ar-tafsir-al-tabari"
        },
        qurthubi: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Al-Isra' 110.",
          url: "https://quran.com/17:110/tafsirs/ar-tafseer-al-qurtubi"
        },
        kemenag: {
          t: "Tafsir Ringkas Kemenag RI dan tafsir lain untuk Al-Isra' 110 (dimuat di TafsirWeb).",
          url: "https://tafsirweb.com/4714-surat-al-isra-ayat-110.html"
        },
        nuonline: {
          t: "Al-Qur'an NU Online, Al-Isra' 110 (Tafsir Tahlili Kemenag).",
          url: "https://quran.nu.or.id/al-isra/110"
        }
      }
    },

    // fushshilat-22 (ditulis dari riset rujukan silang)
    "fushshilat-22": {
      judul: "Fushshilat 22",
      sub: "Tiga orang yang mengira Allah tidak mendengar bisikan",
      surah: "Fushshilat",
      ayatNo: "22",
      tahun: 618,
      tontonan: null,
      peta: {
        tahun: 618,
        tempat: "kabah",
        kota: "mekah"
      },
      lead: ["Fushshilat ayat 22 mengingatkan bahwa manusia tidak dapat bersembunyi dari kesaksian pendengaran, penglihatan, dan kulitnya sendiri, dan bahwa mereka keliru mengira Allah tidak mengetahui banyak dari perbuatan mereka.[ref:kemenag] Abdullah bin Mas'ud meriwayatkan bahwa ayat ini turun tentang tiga orang, dua dari Quraisy dan satu dari Tsaqif atau sebaliknya, yang memperbincangkan apakah Allah mendengar ucapan mereka.[ref:b4817][ref:m2775]", "Dalam riwayat Bukhari dan Muslim lewat Sufyan, mereka berkumpul di dekat Al-Bait, yang menurut Ibnu Hajar adalah Ka'bah; dalam jalur Rauh bin Al-Qasim, mereka berada di sebuah rumah.[ref:b4817][ref:fath562][ref:b4816] Dalam riwayat At-Tirmidzi, Ibnu Mas'ud sendiri bersembunyi di balik tirai Ka'bah, mendengar percakapan itu, lalu menyampaikannya kepada Nabi ﷺ.[ref:t3249]"],
      infobox: [
        ["Surah", "Fushshilat (فصلت), surah ke-41 dalam mushaf; disebut juga Ha Mim As-Sajdah[ref:t3248]"],
        ["Ayat", "22; sebagian jalur menyebut sampai ayat 23[ref:t3249][ref:b4817]"],
        ["Golongan", "Makkiyah"],
        ["Waktu", "Tidak disebut dalam riwayat; periode Mekah (±618 M di peta hanya perkiraan)"],
        ["Tempat", "Di dekat Ka'bah (\"'inda al-bait\")[ref:b4817][ref:fath562]; satu jalur menyebut di sebuah rumah[ref:b4816]"],
        ["Yang terlibat", "Tiga orang musyrik: dua dari Quraisy dan satu dari Tsaqif, atau sebaliknya[ref:m2775]; Abdullah bin Mas'ud yang mendengar percakapan mereka[ref:t3249]"],
        ["Riwayat utama", "HR. Bukhari no. 4816, 4817, dan 7521; HR. Muslim no. 2775a (Ibnu Mas'ud)[ref:b4816][ref:b4817][ref:b7521][ref:m2775]"],
        ["Riwayat pembanding", "HR. Tirmidzi no. 3249 (jalur Al-A'masy): Ibnu Mas'ud bersembunyi di balik tirai Ka'bah[ref:t3249]"],
        ["Derajat", "Shahih (Bukhari dan Muslim); At-Tirmidzi: hasan shahih (no. 3248) dan hasan (no. 3249), Darussalam: shahih[ref:t3248][ref:t3249]"]
      ],
      ayat: [
        {
          no: 22,
          ar: "وَمَا كُنتُمْ تَسْتَتِرُونَ أَن يَشْهَدَ عَلَيْكُمْ سَمْعُكُمْ وَلَا أَبْصَارُكُمْ وَلَا جُلُودُكُمْ وَلَٰكِن ظَنَنتُمْ أَنَّ اللَّهَ لَا يَعْلَمُ كَثِيرًا مِّمَّا تَعْمَلُونَ",
          id: "(Dan kamu tidak dapat bersembunyi dari kesaksian pendengaran, penglihatan dan kulitmu terhadapmu) bahkan kamu mengira Allah tidak mengetahui banyak tentang apa yang kamu lakukan."
        }
      ],
      bagian: [
        {
          id: "tiga",
          judul: "Tiga orang di dekat Ka'bah",
          isi: ["Ibnu Mas'ud menuturkan: tiga orang berkumpul di dekat Al-Bait, dua dari Quraisy dan satu dari Tsaqif, atau dua dari Tsaqif dan satu dari Quraisy. Ia menggambarkan mereka berperut besar karena banyak lemaknya, tetapi sedikit pemahaman hatinya.[ref:b4817][ref:m2775]", "Salah seorang bertanya, \"Apakah menurut kalian Allah mendengar apa yang kita ucapkan?\" Yang lain menjawab, \"Dia mendengar bila kita mengeraskan suara, dan tidak mendengar bila kita memelankannya.\" Yang ketiga berkata, \"Jika Dia mendengar ketika kita mengeraskan suara, berarti Dia juga mendengar ketika kita memelankannya.\" Maka Allah menurunkan ayat ini.[ref:b4817][ref:m2775][ref:t3248]"]
        },
        {
          id: "rumah",
          judul: "Di dekat Ka'bah atau di sebuah rumah?",
          isi: ["Dalam jalur Rauh bin Al-Qasim dari Manshur, Al-Bukhari meriwayatkan bahwa dua orang Quraisy dan ipar mereka dari Tsaqif, atau sebaliknya, berada di sebuah rumah. Dalam lafal ini, salah seorang berkata Allah mendengar sebagian ucapan mereka, dan yang lain menjawab bahwa jika Dia mendengar sebagian, berarti Dia mendengar seluruhnya.[ref:b4816] Al-Wahidi dan Muqbil juga membawakan lafal \"di sebuah rumah\" ini.[ref:wahidi][ref:muqbil]", "Jalur Sufyan bin 'Uyainah dan Sufyan Ats-Tsauri dari Manshur menyebut \"di dekat Al-Bait\".[ref:b4817][ref:b7521] Ibnu Hajar menjelaskan bahwa yang dimaksud adalah Ka'bah, dan bahwa keraguan antara satu atau dua orang Tsaqif berasal dari perawi Abu Ma'mar; riwayat Abdurrazzaq dari Wahb bin Rabi'ah menyebut dua orang Quraisy dan satu orang Tsaqif tanpa ragu.[ref:fath562] As-Suyuthi juga membawakan lafal \"di dekat Al-Bait\".[ref:lubab]", "Jalur Al-A'masy dari 'Umarah bin 'Umair menambahkan bahwa Ibnu Mas'ud saat itu bersembunyi di balik tirai Ka'bah. Ia tidak memahami sebagian pembicaraan mereka, lalu menceritakannya kepada Nabi ﷺ, dan Allah menurunkan ayat 22 sampai ayat 23.[ref:t3249][ref:ik][ref:thabari]"]
        },
        {
          id: "nama",
          judul: "Siapa ketiga orang itu?",
          isi: ["Hadits-hadits Ibnu Mas'ud tidak menyebut nama mereka.[ref:fath562] Ibnu Hajar mengumpulkan beberapa riwayat yang saling berbeda: dari Ibnu Basykuwal, lewat tafsir 'Abdul Ghani bin Sa'id yang lemah dari Ibnu Abbas, Al-Aswad bin 'Abdi Yaghuts dan Al-Akhnas bin Syariq; dari Ats-Tsa'labi dan Al-Baghawi, 'Abdu Yalil bin 'Amr dari Tsaqif bersama Shafwan dan Rabi'ah, putra Umayyah bin Khalaf; dan dari Isma'il At-Taimi, Shafwan bin Umayyah bersama Rabi'ah dan Habib, putra 'Amr.[ref:fath562] Al-Qurthubi juga menukil nama-nama dari Ats-Tsa'labi.[ref:qurthubi]", "Ibnu Hajar menutup daftar itu dengan \"wallahu a'lam\" dan menyebut penerapan riwayat yang pertama pada kisah ini bermasalah, sehingga nama-nama tersebut tidak dapat dipastikan.[ref:fath562]"]
        },
        {
          id: "makna",
          judul: "Makna \"tastatirun\"",
          isi: ["Ath-Thabari memilih makna \"menyembunyikan diri\" (tastakhfun), yang ia nukil dari As-Suddi, karena itulah makna istitar yang dikenal; ia juga menukil makna \"menjaga diri\" dari Mujahid dan \"menyangka\" dari Qatadah.[ref:thabari] Al-Qurthubi menjelaskan maksudnya: karena manusia tidak dapat bersembunyi dari dirinya sendiri, ia semestinya meninggalkan maksiat karena takut anggota tubuhnya kelak bersaksi.[ref:qurthubi]", "Ibnu Katsir menjelaskan bahwa sangkaan keliru tentang Allah itulah yang membinasakan mereka, sebagaimana disebut ayat 23, sehingga mereka termasuk orang-orang yang rugi.[ref:ik] Ia juga membawakan riwayat Bahz bin Hakim dari ayahnya dari kakeknya bahwa pada hari kiamat mulut manusia ditutup, dan yang pertama kali berbicara tentang seseorang adalah paha dan telapak tangannya.[ref:ik]"]
        },
        {
          id: "kandungan",
          judul: "Kandungan ayat",
          isi: ["Tafsir Ringkas Kemenag menjelaskan bahwa orang-orang yang berbuat dosa diam-diam tidak dapat bersembunyi dari pendengaran, penglihatan, dan kulit mereka sendiri yang kelak bersaksi, dan bahwa sangkaan keliru terhadap Tuhan itulah yang membinasakan mereka.[ref:kemenag] Tafsir Hidayatul Insan di TafsirWeb membawakan hadits Ibnu Mas'ud dari Al-Bukhari untuk ayat ini.[ref:kemenag]"]
        }
      ],
      lihatJuga: [
        {
          label: "Abdullah bin Mas'ud",
          tokoh: "ibnumasud"
        },
        {
          label: "Ka'bah",
          tempat: "kabah",
          kota: "mekah",
          ket: "tempat ketiga orang itu berkumpul"
        }
      ],
      rujukan: {
        b4816: {
          t: "HR. Bukhari no. 4816, jalur Rauh bin Al-Qasim dari Manshur dari Mujahid dari Abu Ma'mar dari Ibnu Mas'ud (Kitab Tafsir, Surah Fushshilat): \"di sebuah rumah\".",
          url: "https://sunnah.com/bukhari:4816"
        },
        b4817: {
          t: "HR. Bukhari no. 4817, jalur Sufyan bin 'Uyainah dan Sufyan Ats-Tsauri dari Manshur, dari Ibnu Mas'ud (Kitab Tafsir, Surah Fushshilat): \"di dekat Al-Bait\".",
          url: "https://sunnah.com/bukhari:4817"
        },
        b7521: {
          t: "HR. Bukhari no. 7521, jalur Al-Humaidi dari Sufyan dari Manshur, dari Ibnu Mas'ud (Kitab Tauhid).",
          url: "https://sunnah.com/bukhari:7521"
        },
        m2775: {
          t: "HR. Muslim no. 2775a, jalur Ibnu Abi 'Umar dari Sufyan dari Manshur, dari Ibnu Mas'ud (Kitab Sifat Orang Munafik).",
          url: "https://sunnah.com/muslim:2775a"
        },
        t3248: {
          t: "HR. Tirmidzi no. 3248, dari Ibnu Mas'ud (Kitab Tafsir, Surah Ha Mim As-Sajdah). Tirmidzi: hasan shahih; Darussalam: shahih.",
          url: "https://sunnah.com/tirmidhi:3248"
        },
        t3249: {
          t: "HR. Tirmidzi no. 3249, jalur Al-A'masy dari 'Umarah bin 'Umair dari Abdurrahman bin Yazid dari Ibnu Mas'ud (Kitab Tafsir, Surah Ha Mim As-Sajdah). Tirmidzi: hasan; Darussalam: shahih.",
          url: "https://sunnah.com/tirmidhi:3249"
        },
        fath562: {
          t: "Ibnu Hajar, Fath al-Bari 8/562 (Kitab Tafsir, Surah Ha Mim As-Sajdah).",
          url: "https://shamela.ws/book/1673/4909"
        },
        wahidi: {
          t: "Al-Wahidi, Asbab an-Nuzul, Fushshilat 22 (terjemahan Inggris Mokrane Guezzou).",
          url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=41&Ayah=22&search=yes&img=A&LanguageID=2"
        },
        lubab: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 171 (Surah Ha Mim As-Sajdah).",
          url: "https://shamela.ws/book/2247/169"
        },
        muqbil: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 177 (Fushshilat 22).",
          url: "https://shamela.ws/book/11547/172"
        },
        ik: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Fushshilat 22–23.",
          url: "https://quran.com/41:22/tafsirs/ar-tafsir-ibn-kathir"
        },
        thabari: {
          t: "Ath-Thabari, Jami' al-Bayan, tafsir Fushshilat 22.",
          url: "https://quran.com/41:22/tafsirs/ar-tafsir-al-tabari"
        },
        qurthubi: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Fushshilat 22.",
          url: "https://quran.com/41:22/tafsirs/ar-tafseer-al-qurtubi"
        },
        kemenag: {
          t: "Tafsir Ringkas Kemenag RI dan tafsir lain (Hidayatul Insan, Al-Wajiz) untuk Fushshilat 22 (dimuat di TafsirWeb).",
          url: "https://tafsirweb.com/9004-surat-fussilat-ayat-22.html"
        }
      }
    },

    // qamar-1-2 (ditulis dari riset rujukan silang)
    "qamar-1-2": {
      judul: "Al-Qamar 1–2",
      sub: "Terbelahnya bulan di Mekah",
      surah: "Al-Qamar",
      ayatNo: "1–2",
      tahun: 617,
      tontonan: null,
      peta: {
        tahun: 617,
        lok: "makkah"
      },
      lead: ["Al-Qamar ayat 1–2 menyebut dekatnya hari kiamat dan terbelahnya bulan, lalu menggambarkan orang-orang musyrik yang berpaling dari setiap tanda dan menyebutnya sihir yang terus-menerus.[ref:kemenag] Anas bin Malik meriwayatkan bahwa penduduk Mekah meminta Nabi ﷺ memperlihatkan suatu tanda, lalu beliau memperlihatkan kepada mereka terbelahnya bulan.[ref:b4867]", "Abdullah bin Mas'ud, yang menyaksikannya, menuturkan bahwa bulan terbelah ketika mereka bersama Nabi ﷺ di Mina, dan beliau bersabda, \"Saksikanlah.\"[ref:b3869][ref:b4864] Ibnu Katsir menyebut hadits-hadits tentang peristiwa ini mutawatir dengan sanad-sanad yang shahih, dan para ulama sepakat bahwa ia terjadi di masa Nabi ﷺ.[ref:ik] Menurut Ibnu Hajar, peristiwa itu terjadi di Mekah sekitar lima tahun sebelum Hijrah.[ref:fath632]"],
      infobox: [
        ["Surah", "Al-Qamar (القمر), surah ke-54 dalam mushaf"],
        ["Ayat", "1–2"],
        ["Golongan", "Makkiyah"],
        ["Waktu", "Sekitar lima tahun sebelum Hijrah (±617 M), menurut Ibnu Hajar[ref:fath632]; pada malam hari[ref:fath185]"],
        ["Tempat", "Mekah; Ibnu Mas'ud menyebut mereka sedang di Mina, dan menurut Ibnu Hajar Mina termasuk wilayah Mekah[ref:b3869][ref:fath184]"],
        ["Tokoh", "Penduduk Mekah yang meminta tanda[ref:b4867]; Abdullah bin Mas'ud yang menyaksikannya[ref:b3869][ref:fath632]; Jubair bin Muth'im juga meriwayatkannya[ref:t3289]. Anas dan Ibnu Abbas tidak menyaksikannya: Anas masih kecil di Madinah dan Ibnu Abbas belum lahir, menurut Ibnu Hajar[ref:fath632]"],
        ["Riwayat utama", "HR. Bukhari no. 4867, 4868, dan 3868 (Anas)[ref:b4867][ref:b4868][ref:b3868]; HR. Bukhari no. 3636, 3869, dan 4864, HR. Muslim no. 2800a (Ibnu Mas'ud)[ref:b3636][ref:b3869][ref:b4864][ref:m2800]; HR. Tirmidzi no. 3289 (Jubair bin Muth'im)[ref:t3289]"],
        ["Riwayat pembanding", "Yang tegas menyebut turunnya ayat: HR. Tirmidzi no. 3286 (Anas)[ref:t3286]; Al-Hakim dari Ibnu Mas'ud[ref:lubab]; Ath-Thabarani dari Ibnu Abbas[ref:muqbil]"],
        ["Derajat", "Peristiwanya shahih dan mutawatir menurut Ibnu Katsir[ref:ik]. Riwayat yang menyebut turunnya ayat: hasan shahih menurut At-Tirmidzi[ref:t3286]; Muqbil mencatat Shahihain tidak menyebut turunnya ayat secara tegas[ref:muqbil]. Tirmidzi no. 3289: shahih menurut Darussalam[ref:t3289]"]
      ],
      ayat: [
        {
          no: 1,
          ar: "اقْتَرَبَتِ السَّاعَةُ وَانشَقَّ الْقَمَرُ",
          id: "Saat (hari Kiamat) semakin dekat, bulan pun terbelah."
        },
        {
          no: 2,
          ar: "وَإِن يَرَوْا آيَةً يُعْرِضُوا وَيَقُولُوا سِحْرٌ مُّسْتَمِرٌّ",
          id: "Dan jika mereka (orang-orang musyrikin) melihat suatu tanda (mukjizat), mereka berpaling dan berkata, \"(Ini adalah) sihir yang terus menerus.\""
        }
      ],
      bagian: [
        {
          id: "tanda",
          judul: "Permintaan suatu tanda",
          isi: ["Anas bin Malik meriwayatkan bahwa penduduk Mekah meminta Rasulullah ﷺ memperlihatkan suatu tanda, lalu beliau memperlihatkan kepada mereka terbelahnya bulan.[ref:b4867] Dalam jalur lain dari Anas, bulan tampak terbelah dua sampai mereka melihat Gunung Hira di antara kedua belahannya.[ref:b3868]", "Ibnu Hajar mencatat bahwa hanya riwayat Anas yang mengaitkan terbelahnya bulan secara langsung dengan permintaan penduduk Mekah, dan riwayat Anas ini termasuk mursal sahabat karena Anas tidak menyaksikan peristiwanya.[ref:fath182] Menurut Ibnu Hajar, saat itu Anas baru berusia sekitar empat atau lima tahun dan tinggal di Madinah, sedangkan Ibnu Abbas belum lahir.[ref:fath632]"]
        },
        {
          id: "saksi",
          judul: "Riwayat Ibnu Mas'ud dan Jubair bin Muth'im",
          isi: ["Ibnu Mas'ud berkata bahwa bulan terbelah ketika mereka bersama Nabi ﷺ di Mina, lalu beliau bersabda, \"Saksikanlah,\" dan sebagian bulan bergerak ke arah gunung.[ref:b3869] Dalam lafal lain, satu belahan berada di atas gunung dan belahan lainnya di bawahnya.[ref:b4864] Abu Nu'aim meriwayatkan dari Ibnu Mas'ud bahwa ia melihat Gunung Hira di antara dua belahan bulan.[ref:fath185] Dalam jalur Abu Adh-Dhuha dari Masruq, Ibnu Mas'ud menyebut bulan terbelah di Mekah.[ref:b3869]", "Jubair bin Muth'im meriwayatkan bahwa bulan terbelah di masa Nabi ﷺ menjadi dua bagian, satu di atas gunung ini dan satu di atas gunung itu. Orang-orang berkata, \"Muhammad telah menyihir kita,\" lalu sebagian mereka menjawab bahwa seandainya ia menyihir mereka, ia tidak mungkin menyihir semua orang.[ref:t3289]", "Ibnu Hajar memadukan penyebutan Mina dan Mekah: Mina termasuk wilayah Mekah, sehingga keduanya tidak bertentangan.[ref:fath184]"]
        },
        {
          id: "sihir",
          judul: "\"Sihir yang terus-menerus\"",
          isi: ["Al-Wahidi membawakan riwayat Masruq dari Abdullah: kaum Quraisy menyebutnya sihir, lalu mereka bertanya kepada para musafir yang datang, dan para musafir itu membenarkan bahwa mereka juga melihatnya; kemudian turunlah ayat ini.[ref:wahidi] Ibnu Katsir dan Ath-Thabari juga membawakan kisah para musafir ini.[ref:ik][ref:thabari]", "Ibnu Hajar menukil riwayat Abu 'Awanah bahwa mereka berkata, \"Muhammad tidak mungkin menyihir semua orang,\" lalu menunggu kabar dari para musafir.[ref:fath184]", "Dalam riwayat Ath-Thabarani dari Ibnu Abbas, bulan mengalami gerhana di masa Nabi ﷺ, lalu orang-orang kafir berkata, \"Bulan telah disihir,\" dan turunlah ayat 1–2. Muqbil menukil Ibnu Katsir yang menilai sanadnya jayyid dan menduga bulan terbelah pada malam gerhana, sehingga tidak banyak penduduk bumi yang mengetahuinya; di tempat lain Ibnu Katsir menyebut alur riwayat ini gharib.[ref:muqbil]"]
        },
        {
          id: "turun",
          judul: "Riwayat yang tegas menyebut turunnya ayat",
          isi: ["At-Tirmidzi meriwayatkan dari Anas lewat Ma'mar dari Qatadah: penduduk Mekah meminta suatu tanda kepada Nabi ﷺ, lalu bulan terbelah di Mekah dua kali, maka turunlah \"Iqtarabatis sa'atu wansyaqqal qamar\" sampai \"sihrun mustamirr\". At-Tirmidzi menilainya hasan shahih.[ref:t3286]", "As-Suyuthi membawakan riwayat Ibnu Mas'ud dengan lafal Al-Hakim: ia melihat bulan terbelah dua di Mekah sebelum Nabi ﷺ keluar berhijrah, lalu mereka berkata, \"Bulan telah disihir,\" maka turunlah ayat ini.[ref:lubab] Muqbil menukil penilaian Al-Hakim bahwa riwayat Ibnu Mas'ud ini sesuai syarat Bukhari dan Muslim, disetujui Adz-Dzahabi.[ref:muqbil]", "Muqbil mencatat bahwa asal hadits ini ada di Shahihain, tetapi keduanya tidak tegas menyebut turunnya ayat.[ref:muqbil] Tafsir Hidayatul Insan menilai tambahan \"maka turunlah ayat\" dalam jalur Ma'mar dari Qatadah syadz, karena Ma'mar menyelisihi perawi lain dari Qatadah yang tidak menyebutkannya.[ref:kemenag] Al-Bukhari sendiri meletakkan hadits-hadits ini di bawah ayat 1–2 dalam Kitab Tafsir.[ref:b4867]"]
        },
        {
          id: "duakali",
          judul: "\"Dua kali\" atau \"dua belahan\"?",
          isi: ["Sebagian jalur riwayat Anas menyebut bulan terbelah \"dua kali\" (marratain).[ref:m2802][ref:t3286] Ibnu Hajar mencatat bahwa tidak satu pun jalur hadits Ibnu Mas'ud memakai lafal itu, menukil Ibnu Katsir yang menyebut riwayat \"dua kali\" perlu ditinjau, lalu menyimpulkan bahwa maknanya \"dua belahan\", karena hanya itulah cara memadukan riwayat-riwayat yang ada.[ref:fath183]", "Ibnu Hajar juga menukil Ibnu Al-Qayyim yang menyebut anggapan bulan terbelah dua kali sebagai kekeliruan menurut ahli hadits dan sirah.[ref:fath183] Lafal Al-Bukhari dari Anas memang menyebut bulan terbelah menjadi dua belahan.[ref:b4868]"]
        },
        {
          id: "waktu",
          judul: "Kapan peristiwa ini terjadi",
          isi: ["Ibnu Hajar menyebut peristiwa ini terjadi di Mekah sekitar lima tahun sebelum Hijrah.[ref:fath632] Ath-Thabari membawakan riwayat Ibnu Abbas bahwa peristiwa itu terjadi sebelum Hijrah, dan Ibnu Hajar menyebut riwayat Ibnu Mardawaih dari Ibnu Mas'ud, \"sebelum kami pindah ke Madinah\".[ref:thabari][ref:fath184]", "Peristiwa ini terjadi pada malam hari.[ref:fath185] Ibnu Hajar membahas saatnya di malam itu: kebanyakan riwayat menunjukkan menjelang bulan terbenam, sementara sebagian riwayat menyebut malam purnama.[ref:fath184] Tahun ±617 M di peta adalah perkiraan dari keterangan Ibnu Hajar tersebut.[ref:fath632]"]
        },
        {
          id: "ingkar",
          judul: "Mengapa tidak tercatat di seluruh dunia?",
          isi: ["Ibnu Hajar menukil jawaban Az-Zajjaj: peristiwa itu terjadi pada malam hari, ketika kebanyakan orang tidur dan pintu-pintu tertutup, sehingga hanya sedikit yang memperhatikan langit.[ref:fath185] Al-Khaththabi menambahkan bahwa tanda itu diminta oleh sekelompok orang tertentu dan mungkin hanya terlihat sebentar oleh orang yang sedang mengamati.[ref:fath185] Ibnu Hajar juga mencatat bahwa tidak ada ahli falak yang tegas menafikannya.[ref:fath185]", "Al-Qurthubi menukil pendapat sebagian orang bahwa bulan baru akan terbelah pada hari kiamat, lalu menjawab bahwa riwayat-riwayat dari para perawi yang adil menetapkan bulan telah terbelah di Mekah, dan itulah makna lahir ayat; ia menyebut mayoritas ulama memegang pendapat ini.[ref:qurthubi]"]
        },
        {
          id: "kandungan",
          judul: "Kandungan ayat",
          isi: ["Tafsir Ringkas Kemenag mengaitkan pembukaan surah ini dengan akhir Surah An-Najm yang memperingatkan dekatnya kiamat, dan menjelaskan bahwa orang-orang musyrik tetap berpaling dan menyebut tanda yang mereka lihat sebagai sihir yang terus-menerus.[ref:kemenag] Ath-Thabari menjelaskan bahwa bulan terbelah sebagai hujah atas kebenaran risalah Nabi ﷺ ketika kaum kafir Quraisy meminta bukti, lalu mereka berpaling darinya.[ref:thabari]", "Ibnu Katsir menyebut peristiwa ini salah satu mukjizat yang nyata, dan menukil riwayat Ibnu Mas'ud bahwa terbelahnya bulan termasuk lima tanda yang telah berlalu.[ref:ik]"]
        }
      ],
      lihatJuga: [
        {
          label: "Abdullah bin Mas'ud",
          tokoh: "ibnumasud"
        },
        {
          label: "Anas bin Malik",
          tokoh: "anas"
        },
        {
          label: "Jubair bin Muth'im",
          tokoh: "jubairmuthim"
        },
        {
          label: "Abdullah bin Abbas",
          tokoh: "ibnuabbas"
        },
        {
          label: "Jabal Nur (Hira)",
          tempat: "jabalnur",
          kota: "mekah",
          ket: "Hira terlihat di antara dua belahan bulan"
        },
        {
          label: "Aqabah, Mina",
          tempat: "aqabah-mina",
          kota: "mekah",
          ket: "penanda wilayah Mina; Ibnu Mas'ud menyebut mereka sedang di Mina"
        }
      ],
      rujukan: {
        b4867: {
          t: "HR. Bukhari no. 4867, dari Qatadah dari Anas bin Malik (Kitab Tafsir, Surah Al-Qamar).",
          url: "https://sunnah.com/bukhari:4867"
        },
        b4868: {
          t: "HR. Bukhari no. 4868, dari Qatadah dari Anas bin Malik (Kitab Tafsir, Surah Al-Qamar): \"terbelah menjadi dua belahan\".",
          url: "https://sunnah.com/bukhari:4868"
        },
        b3868: {
          t: "HR. Bukhari no. 3868, dari Qatadah dari Anas bin Malik (Kitab Manaqib al-Anshar, bab terbelahnya bulan).",
          url: "https://sunnah.com/bukhari:3868"
        },
        b3636: {
          t: "HR. Bukhari no. 3636, dari Abu Ma'mar dari Ibnu Mas'ud (Kitab Al-Manaqib, bab mukjizat terbelahnya bulan).",
          url: "https://sunnah.com/bukhari:3636"
        },
        b3869: {
          t: "HR. Bukhari no. 3869, dari Ibrahim dari Abu Ma'mar dari Ibnu Mas'ud (Kitab Manaqib al-Anshar, bab terbelahnya bulan); juga jalur Abu Adh-Dhuha dari Masruq: \"di Mekah\".",
          url: "https://sunnah.com/bukhari:3869"
        },
        b4864: {
          t: "HR. Bukhari no. 4864, dari Abu Ma'mar dari Ibnu Mas'ud (Kitab Tafsir, Surah Al-Qamar).",
          url: "https://sunnah.com/bukhari:4864"
        },
        m2800: {
          t: "HR. Muslim no. 2800a, dari Abu Ma'mar dari Ibnu Mas'ud (Kitab Sifat Kiamat, Surga, dan Neraka, bab terbelahnya bulan).",
          url: "https://sunnah.com/muslim:2800a"
        },
        m2802: {
          t: "HR. Muslim no. 2802a, dari Qatadah dari Anas bin Malik (bab terbelahnya bulan): \"dua kali\".",
          url: "https://sunnah.com/muslim:2802a"
        },
        t3286: {
          t: "HR. Tirmidzi no. 3286, jalur Ma'mar dari Qatadah dari Anas (Kitab Tafsir, Surah Al-Qamar). Tirmidzi: hasan shahih; Darussalam: shahih.",
          url: "https://sunnah.com/tirmidhi:3286"
        },
        t3289: {
          t: "HR. Tirmidzi no. 3289, dari Muhammad bin Jubair bin Muth'im dari ayahnya (Kitab Tafsir, Surah Al-Qamar). Darussalam: shahih.",
          url: "https://sunnah.com/tirmidhi:3289"
        },
        fath182: {
          t: "Ibnu Hajar, Fath al-Bari 7/182 (Kitab Manaqib al-Anshar, bab terbelahnya bulan).",
          url: "https://shamela.ws/book/1673/4010"
        },
        fath183: {
          t: "Ibnu Hajar, Fath al-Bari 7/183 (bab terbelahnya bulan: lafal \"dua kali\").",
          url: "https://shamela.ws/book/1673/4011"
        },
        fath184: {
          t: "Ibnu Hajar, Fath al-Bari 7/184 (bab terbelahnya bulan: Mina dan Mekah, para musafir, saatnya di malam itu).",
          url: "https://shamela.ws/book/1673/4012"
        },
        fath185: {
          t: "Ibnu Hajar, Fath al-Bari 7/185 (bab terbelahnya bulan: terjadi malam hari, jawaban atas penolakan).",
          url: "https://shamela.ws/book/1673/4013"
        },
        fath632: {
          t: "Ibnu Hajar, Fath al-Bari 6/632 (Kitab Al-Manaqib, bab permintaan kaum musyrikin agar diperlihatkan tanda): \"di Mekah sekitar lima tahun sebelum Hijrah\".",
          url: "https://shamela.ws/book/1673/3826"
        },
        wahidi: {
          t: "Al-Wahidi, Asbab an-Nuzul, Al-Qamar 1 (terjemahan Inggris Mokrane Guezzou).",
          url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=54&Ayah=1&search=yes&img=A&LanguageID=2"
        },
        lubab: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 185 (Surah Al-Qamar).",
          url: "https://shamela.ws/book/2247/183"
        },
        muqbil: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 201 (Al-Qamar 1–2).",
          url: "https://shamela.ws/book/11547/196"
        },
        ik: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Al-Qamar 1–2.",
          url: "https://quran.com/54:1/tafsirs/ar-tafsir-ibn-kathir"
        },
        thabari: {
          t: "Ath-Thabari, Jami' al-Bayan, tafsir Al-Qamar 1–2.",
          url: "https://quran.com/54:1/tafsirs/ar-tafsir-al-tabari"
        },
        qurthubi: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Al-Qamar 1.",
          url: "https://quran.com/54:1/tafsirs/ar-tafseer-al-qurtubi"
        },
        kemenag: {
          t: "Tafsir Ringkas Kemenag RI dan tafsir lain (Hidayatul Insan, As-Sa'di, dan lainnya) untuk Al-Qamar 1 (dimuat di TafsirWeb).",
          url: "https://tafsirweb.com/10239-surat-al-qamar-ayat-1.html"
        }
      }
    },

    // qashash-56 (ditulis dari riset rujukan silang)
    "qashash-56": {
      judul: "Al-Qashash 56",
      sub: "Wafatnya Abu Thalib: hidayah hanya milik Allah",
      surah: "Al-Qashash",
      ayatNo: "56",
      tahun: 619,
      tontonan: null,
      peta: {
        tahun: 619,
        lok: "makkah"
      },
      lead: ["Al-Qashash ayat 56 menegaskan bahwa Nabi ﷺ tidak dapat memberi petunjuk kepada orang yang beliau kasihi; hidayah taufik sepenuhnya milik Allah.[ref:kemenag] Menurut hadits Al-Musayyab bin Hazn, ayat ini turun tentang Abu Thalib, paman yang mengasuh dan melindungi beliau, ketika ia menjelang wafat dan tidak mengucapkan \"La ilaha illallah\".[ref:b4772][ref:ik]", "Hadits yang sama menyebut bahwa Nabi ﷺ bersumpah akan terus memohonkan ampunan untuk pamannya selama tidak dilarang, lalu turun At-Taubah 113.[ref:b4772][ref:m24] Karena Surah At-Taubah termasuk yang terakhir turun, sedangkan Abu Thalib wafat di Mekah sebelum Hijrah, para ulama membahas kapan ayat itu turun.[ref:qurthubi113][ref:fath508]"],
      infobox: [
        ["Surah", "Al-Qashash (القصص), surah ke-28 dalam mushaf"],
        ["Ayat", "56; hadits yang sama juga menyebut At-Taubah 113[ref:b4772]"],
        ["Golongan", "Al-Qashash: Makkiyah; At-Taubah: Madaniyah dan termasuk surah yang terakhir turun[ref:qurthubi113]"],
        ["Waktu", "Menjelang wafatnya Abu Thalib di Mekah, sebelum Hijrah menurut kesepakatan ulama (Ibnu Hajar)[ref:fath508]; ±619 M, tahun ke-10 kenabian, dengan bulan yang diperselisihkan[ref:nuonline]"],
        ["Tempat", "Mekah, di sisi Abu Thalib yang menjelang wafat (tempat persisnya tidak disebut)[ref:b4772]"],
        ["Tokoh", "Abu Thalib; Abu Jahal dan Abdullah bin Abi Umayyah bin Al-Mughirah yang hadir di sisinya[ref:b4772]; perawinya Al-Musayyab bin Hazn, yang menurut Ibnu Hajar mungkin ikut hadir ketika itu sebelum masuk Islam[ref:fath507]"],
        ["Riwayat utama", "HR. Bukhari no. 4772, 4675, 3884, dan 1360; HR. Muslim no. 24a (Al-Musayyab bin Hazn)[ref:b4772][ref:b4675][ref:b3884][ref:b1360][ref:m24]"],
        ["Riwayat pembanding", "HR. Muslim no. 25a dan 25b; HR. Tirmidzi no. 3188 (Abu Hurairah)[ref:m25a][ref:m25b][ref:t3188]"],
        ["Derajat", "Shahih, disepakati Bukhari dan Muslim[ref:hadeethenc]; riwayat Abu Hurairah: hasan gharib menurut At-Tirmidzi, shahih menurut Darussalam[ref:t3188]"]
      ],
      ayat: [
        {
          no: 56,
          ar: "إِنَّكَ لَا تَهْدِي مَنْ أَحْبَبْتَ وَلَٰكِنَّ اللَّهَ يَهْدِي مَن يَشَاءُ ۚ وَهُوَ أَعْلَمُ بِالْمُهْتَدِينَ",
          id: "Sungguh, engkau (Muhammad) tidak dapat memberi petunjuk kepada orang yang engkau kasihi, tetapi Allah memberi petunjuk kepada orang yang Dia kehendaki, dan Dia lebih mengetahui orang-orang yang mau menerima petunjuk."
        }
      ],
      bagian: [
        {
          id: "paman",
          judul: "Paman yang melindungi",
          isi: ["Ibnu Katsir menjelaskan bahwa ayat ini turun tentang Abu Thalib, paman Rasulullah ﷺ, yang biasa melindungi dan membela beliau; kasih sayangnya kepada Nabi ﷺ adalah kasih sayang seorang kerabat.[ref:ik] Al-Abbas bin Abdul Muthalib kelak menyebut hal itu di hadapan Nabi ﷺ: Abu Thalib dahulu menjaga beliau dan marah demi beliau.[ref:b3883]"]
        },
        {
          id: "kalimat",
          judul: "Satu kalimat untuk dibela di sisi Allah",
          isi: ["Al-Musayyab bin Hazn meriwayatkan: ketika Abu Thalib menjelang wafat, Rasulullah ﷺ datang dan mendapati Abu Jahal dan Abdullah bin Abi Umayyah bin Al-Mughirah di sisinya. Beliau bersabda, \"Wahai pamanku, ucapkanlah La ilaha illallah, satu kalimat yang dengannya aku akan membelamu di sisi Allah.\"[ref:b4772]", "Abu Jahal dan Abdullah bin Abi Umayyah berkata, \"Wahai Abu Thalib, apakah engkau hendak berpaling dari agama Abdul Muthalib?\" Rasulullah ﷺ terus menawarkan kalimat itu kepadanya, dan keduanya terus mengulang ucapan mereka, hingga kata terakhir Abu Thalib adalah bahwa ia tetap di atas agama Abdul Muthalib, dan ia enggan mengucapkan La ilaha illallah.[ref:m24][ref:b4772]", "Rasulullah ﷺ bersabda, \"Demi Allah, aku sungguh akan memohonkan ampunan untukmu selama aku tidak dilarang.\"[ref:b4772] Ibnu Hajar menukil penjelasan bahwa permohonan ampunan ini tidak berarti memaafkan syirik, dan bahwa yang dimaksud adalah agar azabnya diringankan.[ref:fath507][ref:fath508]"]
        },
        {
          id: "turun",
          judul: "Turunnya dua ayat",
          isi: ["Maka Allah menurunkan At-Taubah 113, dan menurunkan tentang Abu Thalib, \"Sungguh, engkau (Muhammad) tidak dapat memberi petunjuk kepada orang yang engkau kasihi, tetapi Allah memberi petunjuk kepada orang yang Dia kehendaki.\"[ref:b4772][ref:m24] At-Taubah 113 menyatakan bahwa tidak pantas bagi Nabi dan orang-orang beriman memohonkan ampunan bagi orang-orang musyrik, sekalipun kerabat sendiri, setelah jelas bahwa mereka penghuni neraka.[ref:nuquran113]", "Al-Bukhari juga meriwayatkan kisah ini dalam Kitab Jenazah, Kitab Manaqib al-Anshar, dan tafsir At-Taubah 113.[ref:b1360][ref:b3884][ref:b4675] Ibnu Hajar memahami susunan kalimat hadits ini begini: ayat pertama turun tentang Abu Thalib dan orang lain, sedangkan ayat kedua khusus tentang Abu Thalib.[ref:fath508]"]
        },
        {
          id: "abuhurairah",
          judul: "Riwayat Abu Hurairah",
          isi: ["Abu Hurairah meriwayatkan bahwa Rasulullah ﷺ berkata kepada pamannya menjelang wafatnya, \"Ucapkanlah La ilaha illallah, aku akan bersaksi untukmu dengan kalimat itu pada hari kiamat,\" tetapi ia enggan, lalu Allah menurunkan Al-Qashash 56.[ref:m25a]", "Dalam jalur Yahya bin Sa'id, Abu Thalib menjawab bahwa seandainya kaum Quraisy tidak akan mencelanya dengan mengatakan bahwa ia mengucapkannya hanya karena takut menghadapi kematian, niscaya ia akan mengucapkannya untuk menyenangkan hati beliau.[ref:m25b][ref:t3188] At-Tirmidzi menilai riwayat ini hasan gharib, hanya dikenal dari Yazid bin Kaisan.[ref:t3188]", "As-Suyuthi juga membawakan riwayat An-Nasa'i dan Ibnu 'Asakir dengan sanad yang ia nilai jayyid: Abu Sa'id bin Rafi' bertanya kepada Ibnu Umar apakah ayat ini turun tentang Abu Jahal dan Abu Thalib, dan Ibnu Umar menjawab, \"Ya.\"[ref:lubab]"]
        },
        {
          id: "taubah",
          judul: "Kapan At-Taubah 113 turun?",
          isi: ["Al-Qurthubi menukil Al-Husain bin Al-Fadhl yang menganggap kaitan At-Taubah 113 dengan Abu Thalib jauh kemungkinannya, karena surah ini termasuk yang terakhir turun, sedangkan Abu Thalib wafat di awal masa Islam ketika Nabi ﷺ masih di Mekah.[ref:qurthubi113] As-Suyuthi menulis bahwa zahir hadits ini menunjukkan ayat itu turun di Mekah.[ref:lubab113]", "Ayat yang sama juga diriwayatkan turun berkenaan dengan sebab lain. Ali bin Abi Thalib mendengar seseorang memohonkan ampunan untuk kedua orang tuanya yang musyrik; orang itu beralasan dengan Nabi Ibrahim yang memohonkan ampunan untuk ayahnya, lalu Ali menyampaikannya kepada Nabi ﷺ, dan turunlah ayat ini.[ref:lubab113][ref:ik113] Riwayat Ibnu Mas'ud dan Buraidah menyebut Nabi ﷺ meminta izin kepada Rabbnya untuk memohonkan ampunan bagi ibunda beliau dan tidak diizinkan; dalam riwayat Ath-Thabarani dari Ibnu Abbas, itu terjadi di 'Usfan sepulang dari Tabuk.[ref:lubab113][ref:lubab114][ref:wahidi113] Ibnu Katsir menilai riwayat Ath-Thabarani itu gharib dengan alur yang aneh.[ref:ik113]", "Ibnu Hajar menyebut riwayat-riwayat tentang ibunda Nabi ﷺ saling menguatkan dan menunjukkan bahwa turunnya ayat ini tertunda setelah wafatnya Abu Thalib. Menurutnya, ayat ini mungkin punya dua sebab: yang lebih dahulu, yaitu urusan Abu Thalib, dan yang belakangan, yaitu urusan Aminah; bisa jadi pula turunnya ayat tertunda walaupun sebabnya terjadi lebih dahulu.[ref:fath508] As-Suyuthi menukil pendapat Ibnu Hajar ini dan menyebut ulama lain memadukannya dengan turunnya ayat lebih dari sekali.[ref:lubab114]", "Ibnu Hajar juga menyebut riwayat yang memuat sabda Nabi ﷺ bahwa beliau akan terus memohonkan ampunan untuk Abu Thalib \"sampai Rabbku melarangku\".[ref:fath508] Adapun Al-Qashash 56, Ibnu Hajar menegaskan bahwa para perawi tidak berbeda pendapat bahwa ayat itu turun tentang Abu Thalib.[ref:fath506]"]
        },
        {
          id: "kedudukan",
          judul: "Kedudukan Abu Thalib",
          isi: ["Al-Wahidi menukil Az-Zajjaj bahwa para mufassir sepakat Al-Qashash 56 turun tentang Abu Thalib.[ref:wahidi] Al-Qurthubi menukil ungkapan Az-Zajjaj itu sebagai kesepakatan kaum muslimin, lalu meluruskannya menjadi kesepakatan kebanyakan mufassir.[ref:qurthubi] Ibnu Katsir menyebut pendapat ini dari Ibnu Abbas, Ibnu Umar, Mujahid, Asy-Sya'bi, dan Qatadah.[ref:ik]", "Ibnu Katsir menyimpulkan bahwa Abu Thalib tetap pada agama yang dianutnya sebelumnya hingga wafat, dan hal itu termasuk hikmah Allah yang sempurna.[ref:ik] Muqbil menulis bahwa hadits ini membantah anggapan bahwa Abu Thalib masuk Islam, dan HadeethEnc menjelaskan hal yang sama.[ref:muqbil56][ref:hadeethenc] NU Online memaparkan bahwa sebagian ulama belakangan, antara lain Ahmad bin Zaini Dahlan dalam Asna al-Mathalib, berpendapat lain, dengan dalil antara lain riwayat bahwa Al-Abbas melihat bibir Abu Thalib bergerak menjelang wafatnya.[ref:nuonline]", "Ketika Al-Abbas bertanya apa manfaat yang beliau berikan kepada pamannya, Rasulullah ﷺ menjawab bahwa Abu Thalib berada di bagian neraka yang dangkal, dan seandainya bukan karena beliau, ia berada di tingkat yang paling bawah.[ref:b3883] Rumaysho juga menukil hadits Muslim bahwa Abu Thalib adalah penghuni neraka yang paling ringan azabnya.[ref:rumaysho]"]
        },
        {
          id: "kandungan",
          judul: "Kandungan ayat",
          isi: ["Tafsir Ringkas Kemenag membedakan dua macam hidayah: hidayah taufik, yaitu kemampuan menerima dan menjalankan ajaran Allah dengan hati terbuka, sepenuhnya kewenangan Allah; sedangkan Nabi ﷺ diberi hidayah irsyad, yaitu menunjukkan dan menjelaskan jalan yang benar.[ref:kemenag] Ath-Thabari menafsirkan \"Dia lebih mengetahui orang-orang yang mau menerima petunjuk\" sebagai orang-orang yang dalam ilmu Allah telah ditetapkan mendapat petunjuk.[ref:thabari]", "HadeethEnc menarik beberapa pelajaran dari hadits ini, antara lain bahwa amal bergantung pada penutupnya, bahwa mengikuti leluhur dalam kebatilan adalah perilaku jahiliah, dan bahwa boleh menjenguk orang musyrik yang sakit bila diharapkan keislamannya.[ref:hadeethenc] Rumaysho membahas kisah ini dalam pelajaran sirah tentang wafatnya Abu Thalib.[ref:rumaysho]"]
        }
      ],
      lihatJuga: [
        {
          label: "Abu Thalib",
          tokoh: "abuthalib"
        },
        {
          label: "Abu Jahal",
          tokoh: "abujahal"
        },
        {
          label: "Abdullah bin Abi Umayyah",
          tokoh: "abdullahumayyah"
        },
        {
          label: "Al-Musayyab bin Hazn",
          tokoh: "musayyabhazn"
        },
        {
          label: "Al-Abbas bin Abdul Muthalib",
          tokoh: "abbas"
        },
        {
          label: "Abu Hurairah",
          tokoh: "abuhurairah"
        },
        {
          label: "Syi'ib Abi Thalib",
          tempat: "syiib",
          kota: "mekah",
          ket: "kawasan Bani Hasyim; tempat wafatnya tidak disebut dalam hadits"
        },
        {
          label: "At-Taubah 118",
          wiki: "taubah-118",
          ket: "surah yang sama dengan ayat 113"
        }
      ],
      rujukan: {
        b4772: {
          t: "HR. Bukhari no. 4772, dari Sa'id bin Al-Musayyab dari ayahnya (Kitab Tafsir, Surah Al-Qashash).",
          url: "https://sunnah.com/bukhari:4772"
        },
        b4675: {
          t: "HR. Bukhari no. 4675, dari Sa'id bin Al-Musayyab dari ayahnya (Kitab Tafsir, bab At-Taubah 113).",
          url: "https://sunnah.com/bukhari:4675"
        },
        b3884: {
          t: "HR. Bukhari no. 3884, dari Ibnu Al-Musayyab dari ayahnya (Kitab Manaqib al-Anshar, bab kisah Abu Thalib).",
          url: "https://sunnah.com/bukhari:3884"
        },
        b1360: {
          t: "HR. Bukhari no. 1360, dari Sa'id bin Al-Musayyab dari ayahnya (Kitab Jenazah, bab bila orang musyrik mengucapkan La ilaha illallah saat menjelang wafat).",
          url: "https://sunnah.com/bukhari:1360"
        },
        m24: {
          t: "HR. Muslim no. 24a, dari Sa'id bin Al-Musayyab dari ayahnya (Kitab Iman).",
          url: "https://sunnah.com/muslim:24a"
        },
        m25a: {
          t: "HR. Muslim no. 25a, dari Abu Hazim dari Abu Hurairah (Kitab Iman).",
          url: "https://sunnah.com/muslim:25a"
        },
        m25b: {
          t: "HR. Muslim no. 25b, jalur Yahya bin Sa'id dari Yazid bin Kaisan dari Abu Hazim dari Abu Hurairah (Kitab Iman).",
          url: "https://sunnah.com/muslim:25b"
        },
        t3188: {
          t: "HR. Tirmidzi no. 3188, dari Abu Hurairah (Kitab Tafsir, Surah Al-Qashash). Tirmidzi: hasan gharib; Darussalam: shahih.",
          url: "https://sunnah.com/tirmidhi:3188"
        },
        b3883: {
          t: "HR. Bukhari no. 3883, dari Abdullah bin Al-Harits dari Al-Abbas bin Abdul Muthalib (Kitab Manaqib al-Anshar, bab kisah Abu Thalib).",
          url: "https://sunnah.com/bukhari:3883"
        },
        fath506: {
          t: "Ibnu Hajar, Fath al-Bari 8/506 (Kitab Tafsir, Surah Al-Qashash, bab \"innaka la tahdi man ahbabta\").",
          url: "https://shamela.ws/book/1673/4853"
        },
        fath507: {
          t: "Ibnu Hajar, Fath al-Bari 8/507 (bab yang sama: siapa yang hadir di sisi Abu Thalib).",
          url: "https://shamela.ws/book/1673/4854"
        },
        fath508: {
          t: "Ibnu Hajar, Fath al-Bari 8/508 (bab yang sama: waktu turunnya At-Taubah 113).",
          url: "https://shamela.ws/book/1673/4855"
        },
        wahidi: {
          t: "Al-Wahidi, Asbab an-Nuzul, Al-Qashash 56 (terjemahan Inggris Mokrane Guezzou).",
          url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=28&Ayah=56&search=yes&img=A&LanguageID=2"
        },
        wahidi113: {
          t: "Al-Wahidi, Asbab an-Nuzul, At-Taubah 113 (terjemahan Inggris Mokrane Guezzou).",
          url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=9&Ayah=113&search=yes&img=A&LanguageID=2"
        },
        lubab: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 150 (Al-Qashash 56).",
          url: "https://shamela.ws/book/2247/148"
        },
        lubab113: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 113 (At-Taubah 113).",
          url: "https://shamela.ws/book/2247/111"
        },
        lubab114: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 114 (lanjutan At-Taubah 113, pendapat Ibnu Hajar).",
          url: "https://shamela.ws/book/2247/112"
        },
        muqbil56: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 156 (Al-Qashash 56, riwayat Abu Hurairah dari Shahih Muslim).",
          url: "https://shamela.ws/book/11547/151"
        },
        ik: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Al-Qashash 56.",
          url: "https://quran.com/28:56/tafsirs/ar-tafsir-ibn-kathir"
        },
        ik113: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir At-Taubah 113.",
          url: "https://quran.com/9:113/tafsirs/ar-tafsir-ibn-kathir"
        },
        thabari: {
          t: "Ath-Thabari, Jami' al-Bayan, tafsir Al-Qashash 56.",
          url: "https://quran.com/28:56/tafsirs/ar-tafsir-al-tabari"
        },
        qurthubi: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Al-Qashash 56.",
          url: "https://quran.com/28:56/tafsirs/ar-tafseer-al-qurtubi"
        },
        qurthubi113: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir At-Taubah 113.",
          url: "https://quran.com/9:113/tafsirs/ar-tafseer-al-qurtubi"
        },
        kemenag: {
          t: "Tafsir Ringkas Kemenag RI dan tafsir lain untuk Al-Qashash 56 (dimuat di TafsirWeb).",
          url: "https://tafsirweb.com/7106-surat-al-qashash-ayat-56.html"
        },
        nuquran113: {
          t: "Al-Qur'an NU Online, At-Taubah 113 (terjemah dan Tafsir Tahlili Kemenag).",
          url: "https://quran.nu.or.id/at-taubah/113"
        },
        nuonline: {
          t: "Muhamad Abror, \"Kisah Wafatnya Abu Thalib di Bulan Rajab dan Status Keimanannya\", NU Online, 15 Februari 2022.",
          url: "https://nu.or.id/sirah-nabawiyah/kisah-wafatnya-abu-thalib-di-bulan-rajab-dan-status-keimanannya-bei3t"
        },
        rumaysho: {
          t: "Muhammad Abduh Tuasikal, \"Wafatnya Abu Thalib\", Buletin Rumaysho Edisi 61 (Januari 2019).",
          url: "https://rumaysho.com/wp-content/uploads/2019/01/Buletin-Rumaysho-Wonosari-Edisi-61.pdf"
        },
        hadeethenc: {
          t: "Ensiklopedia Hadis Terjemahan (HadeethEnc), hadits Al-Musayyab tentang wafatnya Abu Thalib: derajat dan penjelasan.",
          url: "https://hadeethenc.com/id/browse/hadith/3410"
        }
      }
    },

    // isra-85 (ditulis dari riset rujukan silang)
    "isra-85": {
      judul: "Al-Isra' 85",
      sub: "Pertanyaan tentang ruh",
      surah: "Al-Isra'",
      ayatNo: "85",
      tahun: 623,
      tontonan: null,
      peta: {
        tahun: 623,
        lok: "madinah"
      },
      lead: ["Al-Isra' ayat 85 menjawab pertanyaan tentang ruh: ruh termasuk urusan Tuhan, dan manusia hanya diberi sedikit pengetahuan.[ref:kemenag] Menurut Abdullah bin Mas'ud, pertanyaan itu diajukan sekelompok orang Yahudi ketika ia berjalan bersama Nabi ﷺ di sebuah ladang di Madinah, lalu ayat ini turun sebagai jawabannya.[ref:b4721][ref:b7297]", "Riwayat Ibnu Abbas menyebut penanya yang lain: kaum Quraisy, yang meminta orang Yahudi memberi mereka pertanyaan untuk diajukan kepada Nabi ﷺ.[ref:t3140] Karena Surah Al-Isra' tergolong Makkiyah, Ibnu Katsir memadukan kedua riwayat: ayat ini turun lagi di Madinah, atau beliau menjawab orang Yahudi dengan ayat yang sudah turun sebelumnya.[ref:ik][ref:lubab] As-Suyuthi lebih mendahulukan riwayat Ibnu Mas'ud, karena Ibnu Mas'ud menyaksikan sendiri peristiwanya.[ref:lubab]"],
      infobox: [
        ["Surah", "Al-Isra' (الإسراء), surah ke-17 dalam mushaf"],
        ["Ayat", "85"],
        ["Golongan", "Makkiyah; Ibnu Katsir mencatat bahwa riwayat Al-Bukhari secara lahiriah menunjukkan ayat ini Madaniyah[ref:ik]"],
        ["Waktu", "Tidak disebut dalam riwayat. Menurut riwayat Ibnu Mas'ud, setelah Hijrah, di Madinah[ref:b7297]; menurut riwayat 'Atha' bin Yasar, ayat ini sudah turun di Mekah[ref:ik][ref:thabari]. 623 M di peta hanya perkiraan"],
        ["Tempat", "Sebuah ladang di Madinah[ref:b7297]; dalam jalur lain disebut reruntuhan (khirab) Madinah[ref:b125]. Peta mengikuti riwayat ini"],
        ["Yang terlibat", "Rasulullah ﷺ, Abdullah bin Mas'ud, dan sekelompok orang Yahudi[ref:b4721]; dalam riwayat Ibnu Abbas, kaum Quraisy yang bertanya atas saran orang Yahudi[ref:t3140]"],
        ["Riwayat utama", "HR. Bukhari no. 4721 (juga no. 125 dan 7297) dan HR. Muslim no. 2794a, dari Abdullah bin Mas'ud"],
        ["Riwayat pembanding", "HR. Tirmidzi no. 3140, dari 'Ikrimah dari Ibnu Abbas[ref:t3140]"],
        ["Derajat", "Riwayat Ibnu Mas'ud shahih (Bukhari dan Muslim)[ref:b4721][ref:m2794]. Riwayat Ibnu Abbas: hasan shahih gharib menurut At-Tirmidzi, shahih menurut Darussalam[ref:t3140]; Al-Hakim menshahihkan sanadnya dan disetujui Adz-Dzahabi (dinukil Muqbil)[ref:muqbil130]"]
      ],
      ayat: [
        {
          no: 85,
          ar: "وَيَسْأَلُونَكَ عَنِ الرُّوحِ ۖ قُلِ الرُّوحُ مِنْ أَمْرِ رَبِّي وَمَا أُوتِيتُم مِّنَ الْعِلْمِ إِلَّا قَلِيلًا",
          id: "Dan mereka bertanya kepadamu (Muhammad) tentang roh. Katakanlah, \"Roh itu termasuk urusan Tuhanku, sedangkan kamu diberi pengetahuan hanya sedikit.\""
        }
      ],
      bagian: [
        {
          id: "ladang",
          judul: "Di sebuah ladang di Madinah",
          isi: ["Abdullah bin Mas'ud bercerita: ia sedang bersama Nabi ﷺ di sebuah ladang, ketika beliau bersandar pada sebatang pelepah kurma. Sekelompok orang Yahudi lewat.[ref:b4721] Sebagian dari mereka berkata, \"Tanyakan kepadanya tentang ruh.\" Yang lain berkata, \"Jangan tanyakan, nanti ia memperdengarkan kepada kalian sesuatu yang tidak kalian sukai.\" Mereka tetap bertanya.[ref:b4721][ref:b7297]", "Dalam riwayat Al-Bukhari di Kitab Al-I'tisham, ladang itu disebut berada di Madinah; dalam riwayat di Kitab Al-'Ilm, Ibnu Mas'ud menyebut mereka sedang berjalan di reruntuhan Madinah.[ref:b7297][ref:b125] Muslim meriwayatkan kisah yang sama lewat jalur Al-A'masy.[ref:m2794]"]
        },
        {
          id: "turun",
          judul: "Beliau diam, lalu wahyu turun",
          isi: ["Nabi ﷺ terdiam dan tidak menjawab. Ibnu Mas'ud memahami bahwa wahyu sedang turun kepada beliau, maka ia tetap berdiri di tempatnya.[ref:b4721] Setelah wahyu turun, beliau membaca, \"Dan mereka bertanya kepadamu tentang ruh. Katakanlah, 'Ruh itu termasuk urusan Tuhanku.'\"[ref:b4721][ref:m2794]", "Dalam riwayat di Kitab Al-'Ilm, ujung ayat dibaca \"wa ma utu\" (dan mereka tidak diberi), dan Al-A'masy berkata, \"Begitulah dalam bacaan kami.\"[ref:b125] Al-Qurthubi menyebut \"wa ma utu\" sebagai bacaan Ibnu Mas'ud, sedangkan bacaan mayoritas adalah \"wa ma utitum\" (dan kamu tidak diberi).[ref:qurthubi]"]
        },
        {
          id: "quraisy",
          judul: "Riwayat Ibnu Abbas: pertanyaan titipan untuk Quraisy",
          isi: ["Ibnu Abbas meriwayatkan: kaum Quraisy berkata kepada orang Yahudi, \"Berilah kami sesuatu untuk kami tanyakan kepada laki-laki ini.\" Mereka menjawab, \"Tanyakan kepadanya tentang ruh.\" Kaum Quraisy pun bertanya, lalu Allah menurunkan ayat ini.[ref:t3140]", "Menurut riwayat yang sama, orang Yahudi kemudian berkata bahwa mereka telah diberi ilmu yang banyak, yaitu Taurat, dan siapa yang diberi Taurat telah diberi kebaikan yang banyak.[ref:t3140] Maka turun Al-Kahf ayat 109: seandainya lautan menjadi tinta untuk menulis kalimat-kalimat Tuhanku, pasti habislah lautan itu sebelum kalimat-kalimat Tuhanku selesai ditulis.[ref:t3140]", "Al-Wahidi memuat riwayat Ibnu Mas'ud dan riwayat Ibnu Abbas ini, ditambah keterangan para mufassir bahwa orang Yahudi menyarankan tiga pertanyaan: tentang ruh, tentang para pemuda di masa lalu, dan tentang laki-laki yang menjelajahi timur dan barat.[ref:wahidi] Dua pertanyaan terakhir dijawab di Surah Al-Kahf.[ref:wahidi] Al-Qurthubi juga membawakan keterangan tentang tiga pertanyaan ini.[ref:qurthubi]"]
        },
        {
          id: "padu",
          judul: "Madinah atau Mekah?",
          isi: ["Ibnu Katsir mencatat bahwa konteks riwayat Al-Bukhari secara lahiriah menunjukkan ayat ini Madaniyah, padahal seluruh Surah Al-Isra' Makkiyah.[ref:ik] Ia memberi dua jawaban: ayat ini mungkin turun lagi di Madinah sebagaimana sebelumnya telah turun di Mekah, atau Nabi ﷺ diberi wahyu agar menjawab pertanyaan mereka dengan ayat yang sudah turun sebelumnya.[ref:ik] Muqbil Al-Wadi'i memuat kedua riwayat, lalu menukil penjelasan Ibnu Katsir ini.[ref:muqbil][ref:muqbil130]", "Ibnu Katsir dan Ath-Thabari juga membawakan riwayat 'Atha' bin Yasar lewat Ibnu Ishaq, bahwa ayat ini turun di Mekah, lalu setelah Hijrah para rabi Yahudi mempersoalkannya kepada Nabi ﷺ.[ref:ik][ref:thabari] Tafsir Ringkas Kemenag menyebut penanyanya orang-orang kafir Mekah.[ref:kemenag]", "As-Suyuthi menukil bahwa Ibnu Katsir memadukan kedua hadits dengan berulangnya turun ayat, demikian pula Ibnu Hajar, yang juga menyebut kemungkinan diamnya beliau saat ditanya orang Yahudi karena menunggu penjelasan tambahan; bila tidak, riwayat dalam Ash-Shahih lebih shahih.[ref:lubab] As-Suyuthi sendiri menguatkan riwayat Ash-Shahih, karena perawinya hadir dalam peristiwa itu, sedangkan Ibnu Abbas tidak.[ref:lubab]", "Dalam pengantar kitabnya, As-Suyuthi menjadikan ayat ruh ini contoh ayat yang mungkin turun dua kali.[ref:lubab5] Ia juga menyebut timbangan untuk memilih salah satu dari dua sebab: kekuatan sanad, dan apakah perawinya menyaksikan peristiwa itu.[ref:lubab5]"]
        },
        {
          id: "ruh",
          judul: "Apa yang dimaksud ruh",
          isi: ["Ibnu Katsir menyebut beberapa pendapat tentang ruh yang ditanyakan: ruh manusia, Jibril, atau malaikat yang agung; sebagian riwayat tentang malaikat itu ia nilai gharib, bahkan munkar.[ref:ik] Ath-Thabari menyebut pendapat Jibril (Qatadah) dan malaikat (Ibnu Abbas dan Ali).[ref:thabari]", "Al-Qurthubi menukil bahwa mayoritas mufassir memahaminya sebagai ruh yang membuat badan hidup, lalu memilih membiarkan maknanya umum sebagaimana ayat membiarkannya, agar manusia menyadari ketidakmampuannya mengetahui hakikat dirinya sendiri.[ref:qurthubi] Tafsir Ringkas Kemenag menjelaskan bahwa hanya Allah yang mengetahui hakikat ruh.[ref:kemenag]"]
        },
        {
          id: "ilmu",
          judul: "\"Hanya sedikit\"",
          isi: ["Tentang siapa yang diajak bicara dalam kalimat \"kamu diberi pengetahuan hanya sedikit\", Qatadah memahaminya khusus untuk orang Yahudi, sedangkan Ibnu Juraij memahaminya untuk Nabi ﷺ dan seluruh manusia.[ref:thabari]", "Ath-Thabari memilih makna umum: ilmu siapa pun selain Allah, sebanyak apa pun, tetap sedikit dibanding ilmu Allah.[ref:thabari] Al-Qurthubi juga menilai makna umum ini yang benar, sesuai dengan bacaan mayoritas.[ref:qurthubi]"]
        }
      ],
      lihatJuga: [
        {
          label: "Abdullah bin Mas'ud",
          tokoh: "ibnumasud"
        },
        {
          label: "Abdullah bin Abbas",
          tokoh: "ibnuabbas"
        },
        {
          label: "Al-Isra' 1",
          wiki: "isra-1",
          ket: "surah yang sama"
        }
      ],
      rujukan: {
        b4721: {
          t: "HR. Bukhari no. 4721, dari Alqamah dari Abdullah bin Mas'ud (Kitab Tafsir, Surah Al-Isra').",
          url: "https://sunnah.com/bukhari:4721"
        },
        b7297: {
          t: "HR. Bukhari no. 7297, dari Alqamah dari Abdullah bin Mas'ud (Kitab Al-I'tisham bil-Kitab was-Sunnah): \"di sebuah ladang di Madinah\".",
          url: "https://sunnah.com/bukhari:7297"
        },
        b125: {
          t: "HR. Bukhari no. 125, dari Alqamah dari Abdullah bin Mas'ud (Kitab Al-'Ilm): \"di reruntuhan Madinah\", dengan catatan bacaan Al-A'masy.",
          url: "https://sunnah.com/bukhari:125"
        },
        m2794: {
          t: "HR. Muslim no. 2794a, dari Alqamah dari Abdullah bin Mas'ud (Kitab Sifat Kiamat, Surga, dan Neraka; bab pertanyaan orang Yahudi tentang ruh).",
          url: "https://sunnah.com/muslim:2794a"
        },
        t3140: {
          t: "HR. Tirmidzi no. 3140, dari 'Ikrimah dari Ibnu Abbas (Kitab Tafsir, Surah Bani Isra'il). Tirmidzi: hasan shahih gharib; Darussalam: shahih.",
          url: "https://sunnah.com/tirmidhi:3140"
        },
        wahidi: {
          t: "Al-Wahidi, Asbab an-Nuzul, Al-Isra' 85 (terjemahan Inggris Mokrane Guezzou).",
          url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=17&Ayah=85&search=yes&img=A&LanguageID=2"
        },
        lubab: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 126 (Al-Isra' 85).",
          url: "https://shamela.ws/book/2247/124"
        },
        lubab5: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 5 (tanbih tentang sebab yang berbilang dan cara memilihnya).",
          url: "https://shamela.ws/book/2247/3"
        },
        muqbil: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 129 (Al-Isra' 85: riwayat Ibnu Mas'ud dari Shahih Bukhari).",
          url: "https://shamela.ws/book/11547/124"
        },
        muqbil130: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 130 (takhrij, riwayat Ibnu Abbas, dan kutipan Ibnu Katsir).",
          url: "https://shamela.ws/book/11547/125"
        },
        ik: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Al-Isra' 85.",
          url: "https://quran.com/17:85/tafsirs/ar-tafsir-ibn-kathir"
        },
        thabari: {
          t: "Ath-Thabari, Jami' al-Bayan, tafsir Al-Isra' 85.",
          url: "https://quran.com/17:85/tafsirs/ar-tafsir-al-tabari"
        },
        qurthubi: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Al-Isra' 85.",
          url: "https://quran.com/17:85/tafsirs/ar-tafseer-al-qurtubi"
        },
        kemenag: {
          t: "Tafsir Ringkas Kemenag RI, Al-Isra' 85 (dimuat di TafsirWeb).",
          url: "https://tafsirweb.com/4689-surat-al-isra-ayat-85.html"
        }
      }
    },

    // kautsar-1-3 (ditulis dari riset rujukan silang)
    "kautsar-1-3": {
      judul: "Al-Kautsar 1–3",
      sub: "Nikmat yang banyak, dan pembenci yang terputus",
      surah: "Al-Kausar",
      ayatNo: "1–3",
      tahun: 623,
      tontonan: null,
      peta: {
        tahun: 623,
        lok: "madinah"
      },
      lead: ["Surah Al-Kautsar mengabarkan bahwa Allah telah memberi Nabi ﷺ nikmat yang banyak, memerintahkan beliau shalat dan berkurban karena Allah, dan menegaskan bahwa orang yang membenci beliau itulah yang terputus.[ref:kemenag] Anas bin Malik menceritakan: suatu hari Nabi ﷺ terlelap sejenak di tengah para sahabat, lalu mengangkat kepala sambil tersenyum dan bersabda bahwa baru saja turun kepadanya sebuah surah, kemudian membacanya.[ref:m400]", "Hadits Anas itu tidak menyebut sebab turunnya.[ref:m400] Riwayat-riwayat tentang sebab menyebut seorang pembesar Quraisy, terutama Al-'Ash bin Wa'il, yang mencela beliau \"abtar\" (terputus keturunannya) setelah putra beliau wafat; kebanyakan riwayat ini datang dari tabi'in.[ref:wahidi][ref:ik3][ref:lubab] Karena Anas tinggal bersama Nabi ﷺ di Madinah, hadits Anas dijadikan dalil oleh yang berpendapat surah ini Madaniyah, sedangkan pendapat Makkiyah dinisbatkan kepada mayoritas ulama.[ref:ik][ref:b5166][ref:dorar]"],
      infobox: [
        ["Surah", "Al-Kautsar (الكوثر), surah ke-108 dalam mushaf"],
        ["Ayat", "1–3 (seluruh surah)"],
        ["Golongan", "Diperselisihkan. Makkiyah menurut Ibnu Abbas, Al-Kalbi, dan Muqatil[ref:qurthubi], dan dinisbatkan kepada mayoritas ulama[ref:dorar][ref:nu]; Madaniyah menurut Ibnu Katsir, Ibnu Hajar, dan As-Suyuthi[ref:dorar]; banyak ahli qira'at berdalil dengan hadits Anas untuk pendapat ini[ref:ik]"],
        ["Waktu", "Tidak disebut dalam riwayat. Bila mengikuti hadits Anas, setelah Hijrah[ref:m400][ref:b5166]; riwayat Al-'Ash bin Wa'il menggambarkan masa Mekah[ref:wahidi]. 623 M di peta hanya perkiraan"],
        ["Tempat", "Di tengah para sahabat; jalur Ali bin Hujr menambahkan \"di masjid\"[ref:m400]"],
        ["Tokoh", "Anas bin Malik (perawi)[ref:m400]; dalam riwayat sebab: Al-'Ash bin Wa'il, atau menurut riwayat lain 'Uqbah bin Abi Mu'aith, Abu Jahal, Abu Lahab, dan Ka'ab bin Al-Asyraf bersama pembesar Quraisy[ref:ik3]"],
        ["Riwayat utama", "HR. Muslim no. 400a (Anas bin Malik)"],
        ["Riwayat pembanding", "Riwayat Al-'Ash bin Wa'il: Ibnu Ishaq dari Yazid bin Ruman; Mujahid, Sa'id bin Jubair, dan Qatadah[ref:wahidi][ref:ik3]. Riwayat Ka'ab bin Al-Asyraf: Al-Bazzar dari Ibnu Abbas[ref:lubab][ref:muqbil]"],
        ["Derajat", "Hadits Anas shahih (Muslim)[ref:m400]. Riwayat Al-'Ash bin Wa'il kebanyakan dari tabi'in, sehingga mursal[ref:lubab5]; yang disandarkan kepada Ibnu Abbas dibawakan Al-Wahidi tanpa sanad[ref:wahidi]. Riwayat Ka'ab bin Al-Asyraf dinilai sanadnya shahih oleh Ibnu Katsir dan As-Suyuthi, tetapi Muqbil menyimpulkan yang benar mursal[ref:ik3][ref:lubab][ref:muqbil]. Riwayat Abu Ayyub tentang wafatnya Ibrahim lemah menurut As-Suyuthi[ref:lubab]"]
      ],
      ayat: [
        {
          no: 1,
          ar: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
          id: "Sungguh, Kami telah memberimu (Muhammad) nikmat yang banyak."
        },
        {
          no: 2,
          ar: "فَصَلِّ لِرَبِّكَ وَانْحَرْ",
          id: "Maka laksanakanlah shalat karena Tuhanmu, dan berkurbanlah (sebagai ibadah dan mendekatkan diri kepada Allah)."
        },
        {
          no: 3,
          ar: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ",
          id: "Sungguh, orang-orang yang membencimu dialah yang terputus (dari rahmat Allah)."
        }
      ],
      bagian: [
        {
          id: "anas",
          judul: "Surah yang baru turun",
          isi: ["Anas bin Malik berkata: suatu hari, ketika Rasulullah ﷺ berada di tengah-tengah kami, beliau terlelap sejenak, lalu mengangkat kepala sambil tersenyum. Kami bertanya, \"Apa yang membuat engkau tersenyum, wahai Rasulullah?\" Beliau menjawab, \"Baru saja turun kepadaku sebuah surah,\" lalu membaca basmalah dan Surah Al-Kautsar.[ref:m400]", "Beliau bertanya, \"Tahukah kalian apa Al-Kautsar itu?\" Mereka menjawab, \"Allah dan Rasul-Nya lebih tahu.\" Beliau bersabda bahwa Al-Kautsar adalah sungai yang dijanjikan Tuhannya, yang padanya terdapat kebaikan yang banyak; ia adalah telaga yang didatangi umat beliau pada hari kiamat, dengan bejana sebanyak bintang.[ref:m400]", "Dalam jalur Ali bin Hujr, Anas menyebut peristiwa itu terjadi \"di tengah-tengah kami di masjid\".[ref:m400] Muslim membawakan hadits ini dalam bab dalil bagi yang berpendapat basmalah adalah ayat di awal setiap surah selain Bara'ah.[ref:m400]"]
        },
        {
          id: "abtar",
          judul: "Celaan \"abtar\"",
          isi: ["Al-Wahidi membawakan riwayat yang disandarkan kepada Ibnu Abbas, tanpa sanad: surah ini turun tentang Al-'Ash bin Wa'il, yang bertemu Nabi ﷺ di pintu Bani Sahm ketika beliau keluar dari Masjidil Haram.[ref:wahidi] Ketika ditanya dengan siapa ia berbicara, ia menyebut beliau orang yang tidak punya keturunan. Saat itu putra beliau dari Khadijah, Abdullah, telah wafat.[ref:wahidi]", "Ibnu Ishaq meriwayatkan dari Yazid bin Ruman bahwa setiap kali Nabi ﷺ disebut, Al-'Ash bin Wa'il berkata, \"Biarkan dia, ia laki-laki yang abtar, tidak punya keturunan; bila ia mati, ia akan dilupakan.\" Maka Allah menurunkan surah ini.[ref:wahidi][ref:ik3]", "Ibnu Katsir dan Ath-Thabari juga menyebut Al-'Ash bin Wa'il menurut riwayat dari Ibnu Abbas, Mujahid, Sa'id bin Jubair, dan Qatadah.[ref:ik3][ref:thabari3] As-Suyuthi membawakan riwayat As-Suddi bahwa kaum Quraisy biasa menyebut seseorang \"terputus\" bila anak-anak laki-lakinya wafat, dan ketika putra Nabi ﷺ wafat, Al-'Ash berkata, \"Muhammad telah terputus.\"[ref:lubab] Al-Baihaqi meriwayatkan serupa dari Muhammad bin Ali dan menyebut nama putra itu Al-Qasim.[ref:lubab]"]
        },
        {
          id: "lain",
          judul: "Nama-nama lain dalam riwayat",
          isi: ["Riwayat lain menyebut orang yang berbeda: Syimr bin 'Athiyyah menyebut 'Uqbah bin Abi Mu'aith, yang berkata bahwa tidak akan ada putra Nabi ﷺ yang tetap hidup.[ref:thabari3][ref:lubab] Ibnu Katsir juga menyebut riwayat 'Atha' tentang Abu Lahab, dan riwayat Ibnu Abbas tentang Abu Jahal.[ref:ik3]", "Al-Bazzar meriwayatkan dari Ibnu Abbas bahwa Ka'ab bin Al-Asyraf datang ke Mekah, lalu kaum Quraisy berkata kepadanya, \"Engkau pemimpin mereka. Tidakkah engkau lihat orang yang terputus dari kaumnya ini? Ia mengaku lebih baik daripada kami, padahal kamilah pengurus haji, penyedia minum jamaah haji, dan penjaga Ka'bah.\" Ka'ab menjawab, \"Kalian lebih baik daripadanya.\" Maka turun ayat 3.[ref:lubab][ref:muqbil]", "Ibnu Katsir dan As-Suyuthi menilai sanad riwayat Al-Bazzar ini shahih.[ref:ik3][ref:lubab] Muqbil Al-Wadi'i mula-mula menukil penilaian itu, lalu menyatakan bahwa yang benar menurutnya riwayat ini mursal.[ref:muqbil] Dalam versi Ibnu Jarir yang ia nukil, turun pula An-Nisa' ayat 51–52 tentang orang-orang yang diberi bagian dari Kitab.[ref:muqbil]", "As-Suyuthi juga mencatat riwayat Ath-Thabarani dari Abu Ayyub bahwa surah ini turun ketika Ibrahim, putra Nabi ﷺ, wafat, dan menilai sanadnya lemah.[ref:lubab] Riwayat Sa'id bin Jubair bahwa ayat 2 turun pada hari Hudaibiyah ia nilai sangat ganjil.[ref:lubab]"]
        },
        {
          id: "golongan",
          judul: "Makkiyah atau Madaniyah",
          isi: ["Ibnu Katsir membuka tafsirnya dengan menyebut surah ini Madaniyah, \"dan ada yang mengatakan Makkiyah\", lalu mencatat bahwa banyak ahli qira'at berdalil dengan hadits Anas untuk menggolongkannya Madaniyah.[ref:ik] Anas berusia sepuluh tahun ketika Nabi ﷺ tiba di Madinah, lalu melayani beliau selama sepuluh tahun.[ref:b5166]", "Al-Qurthubi menyebut surah ini Makkiyah menurut Ibnu Abbas, Al-Kalbi, dan Muqatil.[ref:qurthubi] Mausu'at at-Tafsir (Ad-Durar as-Saniyyah) mencatat bahwa Ibnu Al-Jauzi dan Abu Hayyan menisbatkan pendapat Makkiyah kepada mayoritas ulama, sedangkan Ibnu Katsir, Ibnu Hajar, dan As-Suyuthi berpendapat Madaniyah.[ref:dorar] Ibnu 'Asyur, yang dinukil di sana, menyebut pertentangan pendapat dan riwayat dalam hal ini sangat kuat, dan menukil pendapat Madaniyah dari Al-Hasan, Qatadah, Mujahid, dan 'Ikrimah.[ref:dorar] NU Online juga menyebutnya Makkiyah menurut mayoritas ulama.[ref:nu]", "Riwayat Al-'Ash bin Wa'il menggambarkan masa Mekah, sedangkan Anas baru menyertai Nabi ﷺ setelah beliau tiba di Madinah.[ref:wahidi][ref:b5166] Menurut As-Suyuthi, riwayat sebab dari tabi'in berstatus mursal; riwayat itu dapat diterima bila sanad kepadanya shahih dan ia termasuk imam tafsir yang belajar dari para sahabat, seperti Mujahid, 'Ikrimah, dan Sa'id bin Jubair, atau bila dikuatkan riwayat mursal yang lain.[ref:lubab5] Di sini peta mengikuti hadits Anas; tahun 623 M hanya perkiraan."]
        },
        {
          id: "makna",
          judul: "Makna Al-Kautsar dan \"al-abtar\"",
          isi: ["Ibnu Abbas menafsirkan Al-Kautsar sebagai kebaikan yang Allah berikan kepada Nabi ﷺ.[ref:b4966] Ketika Sa'id bin Jubair diberi tahu bahwa sebagian orang mengatakan Al-Kautsar adalah sungai di surga, ia menjawab bahwa sungai itu termasuk kebaikan yang Allah berikan kepada beliau.[ref:b4966] Ibnu Katsir memadukan kedua makna ini, sedangkan Ath-Thabari memilih makna sungai di surga karena riwayatnya dari Nabi ﷺ bersambung dan saling menguatkan.[ref:ik][ref:thabari1] Tafsir Ringkas Kemenag menyebut nikmat itu antara lain kenabian, Al-Qur'an, syafaat, dan telaga.[ref:kemenag]", "Kata \"syani'aka\" berarti orang yang membenci dan memusuhi beliau.[ref:ik3] Ath-Thabari menjelaskan al-abtar sebagai yang paling sedikit dan paling hina, yang terputus keturunannya, dan maknanya berlaku bagi setiap pembenci beliau meskipun ayat ini turun tentang orang tertentu.[ref:thabari3] Ibnu Katsir menyebut anggapan kaum musyrikin itu keliru: Allah justru mengabadikan sebutan Nabi ﷺ dan mewajibkan syariat beliau sampai hari kiamat.[ref:ik3]"]
        }
      ],
      lihatJuga: [
        {
          label: "Anas bin Malik",
          tokoh: "anas"
        },
        {
          label: "Al-'Ash bin Wa'il",
          tokoh: "ashwail"
        },
        {
          label: "Khadijah binti Khuwailid",
          tokoh: "khadijah",
          ket: "ibu putra Nabi yang disebut dalam riwayat"
        },
        {
          label: "Ibrahim bin Muhammad",
          tokoh: "ibrahim",
          ket: "riwayat lemah tentang wafatnya"
        },
        {
          label: "Masjid Nabawi",
          tempat: "masjid-nabawi",
          kota: "madinah",
          ket: "jalur Ali bin Hujr: \"di masjid\""
        }
      ],
      rujukan: {
        m400: {
          t: "HR. Muslim no. 400a, dari Al-Mukhtar bin Fulful dari Anas bin Malik (Kitab Shalat, bab dalil bagi yang berpendapat basmalah adalah ayat di awal setiap surah selain Bara'ah).",
          url: "https://sunnah.com/muslim:400a"
        },
        b4966: {
          t: "HR. Bukhari no. 4966, dari Sa'id bin Jubair dari Ibnu Abbas (Kitab Tafsir, Surah Al-Kautsar).",
          url: "https://sunnah.com/bukhari:4966"
        },
        b5166: {
          t: "HR. Bukhari no. 5166, dari Anas bin Malik (Kitab Nikah): Anas berusia sepuluh tahun ketika Nabi ﷺ tiba di Madinah dan melayani beliau sepuluh tahun.",
          url: "https://sunnah.com/bukhari:5166"
        },
        wahidi: {
          t: "Al-Wahidi, Asbab an-Nuzul, Surah Al-Kautsar (terjemahan Inggris Mokrane Guezzou).",
          url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=108&Ayah=1&search=yes&img=A&LanguageID=2"
        },
        lubab: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 217 (Surah Al-Kautsar).",
          url: "https://shamela.ws/book/2247/215"
        },
        lubab5: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 5 (tanbih: riwayat sebab dari tabi'in berstatus mursal).",
          url: "https://shamela.ws/book/2247/3"
        },
        muqbil: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 237 (Surah Al-Kautsar: riwayat Ka'ab bin Al-Asyraf).",
          url: "https://shamela.ws/book/11547/232"
        },
        ik: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Al-Kautsar 1.",
          url: "https://quran.com/108:1/tafsirs/ar-tafsir-ibn-kathir"
        },
        ik3: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Al-Kautsar 3.",
          url: "https://quran.com/108:3/tafsirs/ar-tafsir-ibn-kathir"
        },
        thabari1: {
          t: "Ath-Thabari, Jami' al-Bayan, tafsir Al-Kautsar 1.",
          url: "https://quran.com/108:1/tafsirs/ar-tafsir-al-tabari"
        },
        thabari3: {
          t: "Ath-Thabari, Jami' al-Bayan, tafsir Al-Kautsar 3.",
          url: "https://quran.com/108:3/tafsirs/ar-tafsir-al-tabari"
        },
        qurthubi: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Al-Kautsar 1.",
          url: "https://quran.com/108:1/tafsirs/ar-tafseer-al-qurtubi"
        },
        dorar: {
          t: "Mausu'at at-Tafsir (Ad-Durar as-Saniyyah), pengantar Surah Al-Kautsar: Makkiyah atau Madaniyah.",
          url: "https://dorar.net/tafseer/108"
        },
        nu: {
          t: "Muhamad Hanif Rahman, \"Pengantar Tafsir Surat Al-Kautsar: Spesifikasi, Munasabab, Sababun Nuzul dan Keutamaannya\", NU Online, 11 Desember 2023.",
          url: "https://nu.or.id/tafsir/pengantar-tafsir-surat-al-kautsar-spesifikasi-munasabab-sababun-nuzul-dan-keutamaannya-f58nS"
        },
        kemenag: {
          t: "Tafsir Ringkas Kemenag RI, Al-Kautsar 1 (dimuat di TafsirWeb).",
          url: "https://tafsirweb.com/13070-surat-al-kautsar-ayat-1.html"
        }
      }
    },

    // baqarah-187 (ditulis dari riset rujukan silang)
    "baqarah-187": {
      judul: "Al-Baqarah 187",
      sub: "Keringanan di malam-malam Ramadhan",
      surah: "Al-Baqarah",
      ayatNo: "187",
      tahun: 624,
      tontonan: null,
      peta: {
        tahun: 624,
        lok: "madinah"
      },
      lead: ["Al-Baqarah ayat 187 menghalalkan bercampur dengan istri pada malam hari bulan puasa, serta makan dan minum sampai jelas terbitnya fajar.[ref:kemenag] Sebelumnya, menurut Al-Bara' bin 'Azib, sahabat yang tertidur sebelum berbuka tidak makan pada malam itu dan siang berikutnya sampai sore.[ref:b1915] Seorang Anshar, Qais bin Shirmah, tertidur karena lelah bekerja dan pingsan di tengah hari berikutnya, lalu ayat ini turun.[ref:b1915]", "Al-Bara' juga meriwayatkan bahwa ketika puasa Ramadhan diwajibkan, para sahabat tidak mendekati istri sepanjang bulan itu, dan sebagian laki-laki \"mengkhianati diri sendiri\"; maka turun bagian ayat \"Allah mengetahui bahwa kamu tidak dapat menahan dirimu sendiri\".[ref:b4508] Riwayat-riwayat lain menyebut Umar bin Khattab di antara mereka.[ref:lubab][ref:ik] Muqbil Al-Wadi'i menyimpulkan bahwa kedua peristiwa itu bersama-sama menjadi sebab turunnya ayat.[ref:muqbil26]"],
      infobox: [
        ["Surah", "Al-Baqarah (البقرة), surah ke-2 dalam mushaf"],
        ["Ayat", "187"],
        ["Golongan", "Madaniyah"],
        ["Waktu", "Tanggalnya tidak disebut. Di masa awal kewajiban puasa Ramadhan[ref:b4508], yang menurut para sejarawan ditetapkan pada 10 Sya'ban 2 H[ref:nupuasa]; jadi ±624 M"],
        ["Tempat", "Madinah"],
        ["Tokoh", "Qais bin Shirmah Al-Anshari, yang namanya berbeda-beda dalam riwayat[ref:b1915][ref:thabari]; Umar bin Khattab[ref:lubab]; Ka'ab bin Malik, menurut riwayatnya sendiri[ref:lubab24]"],
        ["Riwayat utama", "HR. Bukhari no. 1915 dan 4508 (Al-Bara' bin 'Azib); HR. Abu Dawud no. 2314 (Al-Bara')"],
        ["Riwayat pembanding", "HR. Abu Dawud no. 2313 (Ibnu Abbas)[ref:d2313]; riwayat Mu'adz bin Jabal dan Ka'ab bin Malik tentang Umar[ref:lubab][ref:lubab24]; HR. Bukhari no. 1917 (Sahl bin Sa'd) tentang kata \"minal fajr\"[ref:b1917]"],
        ["Derajat", "Shahih (Bukhari)[ref:b1915][ref:b4508]; Abu Dawud no. 2314 shahih dan no. 2313 hasan shahih menurut Al-Albani[ref:d2314][ref:d2313]. Riwayat Mu'adz tentang Umar terputus, karena Ibnu Abi Laila tidak mendengar dari Mu'adz, tetapi punya penguat menurut As-Suyuthi[ref:lubab]"]
      ],
      ayat: [
        {
          no: 187,
          ar: "أُحِلَّ لَكُمْ لَيْلَةَ الصِّيَامِ الرَّفَثُ إِلَىٰ نِسَائِكُمْ ۚ هُنَّ لِبَاسٌ لَّكُمْ وَأَنتُمْ لِبَاسٌ لَّهُنَّ ۗ عَلِمَ اللَّهُ أَنَّكُمْ كُنتُمْ تَخْتَانُونَ أَنفُسَكُمْ فَتَابَ عَلَيْكُمْ وَعَفَا عَنكُمْ ۖ فَالْآنَ بَاشِرُوهُنَّ وَابْتَغُوا مَا كَتَبَ اللَّهُ لَكُمْ ۚ وَكُلُوا وَاشْرَبُوا حَتَّىٰ يَتَبَيَّنَ لَكُمُ الْخَيْطُ الْأَبْيَضُ مِنَ الْخَيْطِ الْأَسْوَدِ مِنَ الْفَجْرِ ۖ ثُمَّ أَتِمُّوا الصِّيَامَ إِلَى اللَّيْلِ ۚ وَلَا تُبَاشِرُوهُنَّ وَأَنتُمْ عَاكِفُونَ فِي الْمَسَاجِدِ ۗ تِلْكَ حُدُودُ اللَّهِ فَلَا تَقْرَبُوهَا ۗ كَذَٰلِكَ يُبَيِّنُ اللَّهُ آيَاتِهِ لِلنَّاسِ لَعَلَّهُمْ يَتَّقُونَ",
          id: "Dihalalkan bagimu pada malam hari puasa bercampur dengan istrimu. Mereka adalah pakaian bagimu, dan kamu adalah pakaian bagi mereka. Allah mengetahui bahwa kamu tidak dapat menahan dirimu sendiri, tetapi Dia menerima tobatmu dan memaafkanmu. Maka sekarang campurilah mereka dan carilah apa yang telah ditetapkan Allah bagimu. Makan dan minumlah hingga jelas bagimu (perbedaan) antara benang putih dan benang hitam, yaitu fajar. Kemudian sempurnakanlah puasa sampai (datang) malam. Tetapi jangan kamu campuri mereka, ketika kamu beriktikaf dalam masjid. Itulah ketentuan Allah, maka janganlah kamu mendekatinya. Demikianlah Allah menerangkan ayat-ayat-Nya kepada manusia, agar mereka bertakwa."
        }
      ],
      bagian: [
        {
          id: "awal",
          judul: "Aturan di masa awal",
          isi: ["Al-Bara' bin 'Azib menuturkan: dahulu, bila seorang sahabat berpuasa lalu tertidur sebelum berbuka, ia tidak makan pada malam itu dan siang berikutnya sampai sore.[ref:b1915] Dalam riwayat Ibnu Abbas, larangan makan, minum, dan bercampur dengan istri berlaku setelah mereka shalat Isya sampai malam berikutnya.[ref:d2313]", "Mu'adz bin Jabal meriwayatkan bahwa puasa melewati beberapa tahap: mula-mula Nabi ﷺ berpuasa tiga hari setiap bulan dan puasa 'Asyura; lalu turun ayat 183–184, yang memberi pilihan antara berpuasa dan memberi makan seorang miskin; kemudian ayat 185 mewajibkan puasa bagi yang hadir di bulan Ramadhan.[ref:d507] Riwayat ini juga menyebut Shirmah yang datang setelah bekerja seharian.[ref:d507]"]
        },
        {
          id: "qais",
          judul: "Qais bin Shirmah pingsan",
          isi: ["Qais bin Shirmah Al-Anshari sedang berpuasa. Ketika waktu berbuka tiba, ia datang kepada istrinya dan bertanya, \"Apakah engkau punya makanan?\" Istrinya menjawab tidak, tetapi ia akan pergi mencarikannya.[ref:b1915] Qais seharian bekerja, sehingga ia tertidur. Ketika istrinya kembali dan melihatnya tertidur, ia berkata, \"Sungguh malang engkau.\"[ref:b1915]", "Ketika tengah hari, Qais pingsan. Hal itu disampaikan kepada Nabi ﷺ, lalu turunlah ayat \"Dihalalkan bagimu pada malam hari puasa bercampur dengan istrimu\", dan para sahabat sangat bergembira. Turun pula, \"Makan dan minumlah hingga jelas bagimu benang putih dari benang hitam.\"[ref:b1915]", "Dalam riwayat Abu Dawud, namanya Shirmah bin Qais Al-Anshari, dan disebut bahwa ia bekerja seharian di tanahnya.[ref:d2314] Ath-Thabari membawakan nama-nama lain dalam berbagai jalur, seperti Shirmah bin Malik, Abu Qais bin Shirmah, dan Shirmah bin Anas.[ref:thabari] Al-Wahidi juga memuat riwayat Al-Qasim bin Muhammad yang menyebutnya Shirmah bin Anas.[ref:wahidi]"]
        },
        {
          id: "umar",
          judul: "Malam-malam Ramadhan dan kisah Umar",
          isi: ["Al-Bara' meriwayatkan: ketika puasa Ramadhan diturunkan, para sahabat tidak mendekati istri-istri mereka sepanjang Ramadhan, dan ada laki-laki yang mengkhianati diri sendiri. Maka Allah menurunkan, \"Allah mengetahui bahwa kamu tidak dapat menahan dirimu sendiri, tetapi Dia menerima tobatmu dan memaafkanmu.\"[ref:b4508] Ibnu Abbas juga menyebut seorang laki-laki yang melanggar larangan itu setelah shalat Isya, lalu Allah berkehendak memberi kemudahan dan keringanan.[ref:d2313]", "As-Suyuthi membawakan riwayat Mu'adz bin Jabal (Ahmad, Abu Dawud, dan Al-Hakim) bahwa Umar bin Khattab mendatangi istrinya setelah tidur, lalu menyampaikannya kepada Nabi ﷺ.[ref:lubab] Ia mencatat bahwa riwayat ini masyhur dari Ibnu Abi Laila, tetapi Ibnu Abi Laila tidak mendengar dari Mu'adz, dan riwayat ini punya penguat-penguat.[ref:lubab]", "Dalam riwayat Ka'ab bin Malik (Ahmad, Ibnu Jarir, dan Ibnu Abi Hatim), Umar pulang larut malam dari majelis Nabi ﷺ dan hendak mendatangi istrinya; istrinya berkata ia sudah tidur, tetapi Umar menyangkalnya.[ref:lubab24] Ka'ab berbuat serupa. Esok harinya Umar mengabarkan hal itu kepada Nabi ﷺ, lalu ayat ini turun.[ref:lubab24] Ibnu Katsir dan Ath-Thabari menghimpun riwayat-riwayat tentang Umar ini dari Ibnu Abbas, Ka'ab bin Malik, Ibnu Abi Laila, dan para tabi'in.[ref:ik][ref:thabari] Tafsir Ringkas Kemenag juga menyebut kisah Umar yang menyesal lalu melapor kepada Nabi ﷺ.[ref:kemenag]"]
        },
        {
          id: "dua",
          judul: "Dua sebab yang dipadukan",
          isi: ["Al-Qurthubi menukil Ibnu Al-'Arabi yang berpendapat bahwa sebab turunnya adalah kisah Umar, karena ayat ini dimulai dengan \"maka sekarang campurilah mereka\"; seandainya sebabnya kisah Qais, ayat akan dimulai dengan perintah makan.[ref:qurthubi]", "Muqbil Al-Wadi'i memuat kedua hadits Al-Bara'.[ref:muqbil] Menurutnya, meski keduanya berbeda, tidak ada halangan ayat ini turun tentang kedua kelompok itu, dan dengan menggabungkan dua hadits Al-Bukhari diketahui bahwa kedua peristiwa itu bersama-sama menjadi sebabnya.[ref:muqbil][ref:muqbil26]", "Al-Qurthubi juga menjelaskan bahwa kata \"dihalalkan\" menunjukkan hal itu sebelumnya diharamkan, lalu hukumnya dihapus.[ref:qurthubi] Menurut Ibnu Katsir, ayat ini mengangkat aturan lama itu, sehingga makan, minum, dan bercampur dengan istri dibolehkan sepanjang malam sampai fajar.[ref:ik]"]
        },
        {
          id: "fajar",
          judul: "\"Minal fajr\": benang putih dan benang hitam",
          isi: ["Sahl bin Sa'd meriwayatkan bahwa mula-mula turun \"Makan dan minumlah hingga jelas bagimu benang putih dari benang hitam\" tanpa kata \"minal fajr\" (yaitu fajar).[ref:b1917] Sebagian orang yang hendak berpuasa mengikat benang putih dan benang hitam di kaki mereka, dan terus makan sampai bisa membedakan keduanya. Lalu Allah menurunkan \"minal fajr\", dan mereka pun tahu bahwa yang dimaksud adalah malam dan siang.[ref:b1917]", "Ibnu Katsir juga membawakan kisah 'Adi bin Hatim yang meletakkan benang putih dan hitam di bawah bantalnya, lalu Nabi ﷺ menjelaskan bahwa yang dimaksud adalah terangnya siang dan gelapnya malam.[ref:ik] Untuk bagian \"jangan kamu campuri mereka ketika kamu beriktikaf\", As-Suyuthi membawakan riwayat Qatadah bahwa dahulu orang yang beriktikaf bila keluar dari masjid boleh mendatangi istrinya, lalu ayat ini melarangnya.[ref:lubab24]"]
        },
        {
          id: "waktu",
          judul: "Kapan ayat ini turun",
          isi: ["Hadits-hadits di atas tidak menyebut tanggalnya, tetapi Al-Bara' menggambarkan masa ketika puasa Ramadhan baru diturunkan.[ref:b4508] Abu Dawud meletakkan hadits Al-Bara' dan Ibnu Abbas dalam bab permulaan diwajibkannya puasa.[ref:d2314][ref:d2313]", "NU Online menukil para sejarawan bahwa kewajiban puasa Ramadhan ditetapkan pada 10 Sya'ban tahun kedua Hijrah, dan Perang Badar terjadi pada Ramadhan pertama sesudahnya.[ref:nupuasa][ref:nubadar] Karena itu ayat ini ditempatkan di tahun 2 H (±624 M); bulannya hanya perkiraan."]
        }
      ],
      lihatJuga: [
        {
          label: "Umar bin Khattab",
          tokoh: "umar"
        },
        {
          label: "Ka'ab bin Malik",
          tokoh: "kaab",
          ket: "meriwayatkan kisah Umar dan dirinya"
        },
        {
          label: "Al-Baqarah 144",
          wiki: "baqarah-144",
          ket: "surah yang sama, 2 H"
        },
        {
          label: "Al-Anfal 9",
          wiki: "anfal-9",
          ket: "Perang Badar, Ramadhan 2 H"
        }
      ],
      rujukan: {
        b1915: {
          t: "HR. Bukhari no. 1915, dari Abu Ishaq dari Al-Bara' bin 'Azib (Kitab Puasa, bab firman Allah \"Uhilla lakum lailatash shiyam\").",
          url: "https://sunnah.com/bukhari:1915"
        },
        b4508: {
          t: "HR. Bukhari no. 4508, dari Abu Ishaq dari Al-Bara' bin 'Azib (Kitab Tafsir, Al-Baqarah 187).",
          url: "https://sunnah.com/bukhari:4508"
        },
        b1917: {
          t: "HR. Bukhari no. 1917, dari Abu Hazim dari Sahl bin Sa'd (Kitab Puasa).",
          url: "https://sunnah.com/bukhari:1917"
        },
        d2314: {
          t: "HR. Abu Dawud no. 2314, dari Abu Ishaq dari Al-Bara' bin 'Azib (Kitab Puasa, bab permulaan diwajibkannya puasa). Al-Albani: shahih.",
          url: "https://sunnah.com/abudawud:2314"
        },
        d2313: {
          t: "HR. Abu Dawud no. 2313, dari 'Ikrimah dari Ibnu Abbas (Kitab Puasa, bab permulaan diwajibkannya puasa). Al-Albani: hasan shahih.",
          url: "https://sunnah.com/abudawud:2313"
        },
        d507: {
          t: "HR. Abu Dawud no. 507, dari Ibnu Abi Laila dari Mu'adz bin Jabal (Kitab Shalat, bab tata cara adzan): tahap-tahap syariat shalat dan puasa.",
          url: "https://sunnah.com/abudawud:507"
        },
        wahidi: {
          t: "Al-Wahidi, Asbab an-Nuzul, Al-Baqarah 187 (terjemahan Inggris Mokrane Guezzou).",
          url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=2&Ayah=187&search=yes&img=A&LanguageID=2"
        },
        lubab: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 23 (Al-Baqarah 187: riwayat Mu'adz dan awal hadits Al-Bara').",
          url: "https://shamela.ws/book/2247/21"
        },
        lubab24: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 24 (Al-Baqarah 187: hadits Al-Bara', Ka'ab bin Malik, Sahl bin Sa'd, dan Qatadah).",
          url: "https://shamela.ws/book/2247/22"
        },
        muqbil: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 25 (Al-Baqarah 187: dua hadits Al-Bara' dari Shahih Bukhari).",
          url: "https://shamela.ws/book/11547/20"
        },
        muqbil26: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 26 (memadukan dua hadits Al-Bara').",
          url: "https://shamela.ws/book/11547/21"
        },
        ik: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Al-Baqarah 187.",
          url: "https://quran.com/2:187/tafsirs/ar-tafsir-ibn-kathir"
        },
        thabari: {
          t: "Ath-Thabari, Jami' al-Bayan, tafsir Al-Baqarah 187.",
          url: "https://quran.com/2:187/tafsirs/ar-tafsir-al-tabari"
        },
        qurthubi: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Al-Baqarah 187.",
          url: "https://quran.com/2:187/tafsirs/ar-tafseer-al-qurtubi"
        },
        kemenag: {
          t: "Tafsir Ringkas Kemenag RI, Al-Baqarah 187 (dimuat di TafsirWeb).",
          url: "https://tafsirweb.com/690-surat-al-baqarah-ayat-187.html"
        },
        nupuasa: {
          t: "Fathoni Ahmad, \"Keterangan Lengkap Puasa Ramadhan dalam QS Al-Baqarah\", NU Online, 27 April 2020.",
          url: "https://nu.or.id/ramadhan/keterangan-lengkap-puasa-ramadhan-dalam-qs-al-baqarah-BO99H"
        },
        nubadar: {
          t: "Muhammad Afiq Zahara, \"Ramadhan di Saat Perang Badar dan Fathu Makkah\", NU Online, 8 Mei 2019.",
          url: "https://nu.or.id/ramadhan/ramadhan-di-saat-perang-badar-dan-fathu-makkah-ud8FB"
        }
      }
    },

    // anfal-1 (ditulis dari riset rujukan silang)
    "anfal-1": {
      judul: "Al-Anfal 1",
      sub: "Perselisihan harta rampasan Badar",
      surah: "Al-Anfal",
      ayatNo: "1",
      tahun: 624,
      tontonan: null,
      peta: {
        tahun: 624,
        lok: "badar"
      },
      lead: ["Al-Anfal ayat 1 menjawab pertanyaan para sahabat tentang harta rampasan perang (al-anfal): harta itu milik Allah dan Rasul, maka mereka diperintahkan bertakwa, memperbaiki hubungan di antara sesama, dan taat kepada Allah dan Rasul-Nya.[ref:kemenag] Menurut Ibnu Abbas, Surah Al-Anfal turun berkenaan dengan Perang Badar.[ref:b4645]", "Sa'ad bin Abi Waqqash menuturkan bahwa pada hari Badar ia membawa sebuah pedang dan memintanya dari Nabi ﷺ; beliau menolak, lalu turunlah ayat ini.[ref:t3079][ref:m1748a] Riwayat lain menyebut perselisihan para pemuda dan orang-orang tua tentang bagian rampasan (Ibnu Abbas), atau tiga kelompok pasukan yang masing-masing merasa paling berhak (Ubadah bin Ash-Shamit).[ref:d2737][ref:muqbil97] Hidayatul Insan menilai riwayat Sa'ad dan riwayat Ibnu Abbas tidak bertentangan, dan mungkin keduanya menjadi sebab.[ref:kemenag]"],
      infobox: [
        ["Surah", "Al-Anfal (الأنفال), surah ke-8 dalam mushaf"],
        ["Ayat", "1"],
        ["Golongan", "Madaniyah; turun berkenaan dengan Perang Badar[ref:b4645][ref:qurthubi]"],
        ["Waktu", "Seusai Perang Badar, Ramadhan 2 H (±624 M)[ref:b4645][ref:nubadar][ref:nupuasa]. Dalam riwayat Ahmad, surah ini turun tak lama setelah Sa'ad diminta menyerahkan pedangnya[ref:lubab94]"],
        ["Tempat", "Badar (tidak disebut tegas); dalam riwayat Ahmad, Sa'ad baru berjalan sedikit ketika surah ini turun[ref:lubab94]"],
        ["Tokoh", "Sa'ad bin Abi Waqqash[ref:t3079]; para pemuda dan orang-orang tua pasukan Badar[ref:d2737]; Ubadah bin Ash-Shamit[ref:muqbil97]"],
        ["Riwayat utama", "HR. Tirmidzi no. 3079 dan HR. Muslim no. 1748a–b (Sa'ad bin Abi Waqqash)"],
        ["Riwayat pembanding", "HR. Abu Dawud no. 2737 (Ibnu Abbas)[ref:d2737]; riwayat Ubadah bin Ash-Shamit (Ahmad, Ibnu Hibban, Al-Hakim)[ref:muqbil96][ref:ik]"],
        ["Derajat", "Riwayat Sa'ad shahih (Muslim); At-Tirmidzi: hasan shahih; Darussalam: shahih[ref:t3079]. Riwayat Ibnu Abbas shahih menurut Al-Albani[ref:d2737]. Riwayat Ubadah dishahihkan Al-Hakim menurut syarat Muslim dan disetujui Adz-Dzahabi[ref:muqbil96]"]
      ],
      ayat: [
        {
          no: 1,
          ar: "يَسْأَلُونَكَ عَنِ الْأَنفَالِ ۖ قُلِ الْأَنفَالُ لِلَّهِ وَالرَّسُولِ ۖ فَاتَّقُوا اللَّهَ وَأَصْلِحُوا ذَاتَ بَيْنِكُمْ ۖ وَأَطِيعُوا اللَّهَ وَرَسُولَهُ إِن كُنتُم مُّؤْمِنِينَ",
          id: "Mereka menanyakan kepadamu (Muhammad) tentang (pembagian) harta rampasan perang. Katakanlah, \"Harta rampasan perang itu milik Allah dan Rasul (menurut ketentuan Allah dan Rasul-Nya), maka bertakwalah kepada Allah dan perbaikilah hubungan di antara sesamamu, dan taatlah kepada Allah dan Rasul-Nya jika kamu orang-orang yang beriman.\""
        }
      ],
      bagian: [
        {
          id: "pedang",
          judul: "Pedang Sa'ad bin Abi Waqqash",
          isi: ["Mush'ab bin Sa'ad meriwayatkan dari ayahnya: pada hari Badar, Sa'ad datang membawa sebuah pedang dan berkata, \"Wahai Rasulullah, Allah telah melegakan dadaku dari kaum musyrikin; berikanlah pedang ini kepadaku.\" Beliau menjawab, \"Pedang ini bukan milikku dan bukan milikmu.\"[ref:t3079]", "Sa'ad berkata, \"Bisa jadi pedang ini diberikan kepada orang yang tidak berjuang seperti perjuanganku.\"[ref:t3079] Kemudian Rasulullah ﷺ mendatanginya dan bersabda, \"Engkau memintanya kepadaku ketika ia bukan milikku. Sekarang ia telah menjadi milikku, dan ia untukmu.\" Sa'ad berkata, saat itulah turun ayat \"Mereka menanyakan kepadamu tentang harta rampasan perang\".[ref:t3079]", "Dalam riwayat Muslim, Sa'ad mengambil pedang itu dari bagian seperlima (khumus), lalu meminta Nabi ﷺ memberikannya, tetapi beliau menolak, maka turun ayat ini.[ref:m1748a] Dalam jalur lain, Sa'ad menyebut empat ayat Al-Qur'an turun tentang dirinya.[ref:m1748b] Ia meminta pedang itu sampai tiga kali, dan beliau menyuruhnya meletakkannya kembali di tempat ia mengambilnya.[ref:m1748b]"]
        },
        {
          id: "umair",
          judul: "Riwayat Ahmad: saudaranya, 'Umair",
          isi: ["Dalam riwayat Ahmad yang dibawakan As-Suyuthi dan Ibnu Katsir, Sa'ad menuturkan bahwa saudaranya, 'Umair, terbunuh pada hari Badar.[ref:lubab94] Sa'ad membalas dengan membunuh Sa'id bin Al-'Ash dan mengambil pedangnya, lalu membawanya kepada Nabi ﷺ. Beliau bersabda, \"Pergilah, letakkan pedang itu di tempat pengumpulan harta rampasan.\"[ref:lubab94][ref:ik]", "Sa'ad kembali dengan perasaan yang hanya diketahui Allah, karena saudaranya terbunuh dan rampasannya diambil.[ref:lubab94] Belum jauh ia berjalan, turunlah Surah Al-Anfal, dan Nabi ﷺ bersabda kepadanya, \"Pergilah, ambil pedangmu.\"[ref:lubab94] Al-Wahidi juga membawakan riwayat ini dengan sanadnya.[ref:wahidi]"]
        },
        {
          id: "pemuda",
          judul: "Para pemuda dan orang-orang tua",
          isi: ["Ibnu Abbas meriwayatkan bahwa pada Perang Badar, Rasulullah ﷺ bersabda, \"Siapa yang melakukan ini dan itu, baginya tambahan sekian dan sekian.\" Para pemuda maju, sedangkan orang-orang tua tetap di bawah panji-panji.[ref:d2737] Setelah Allah memberi kemenangan, orang-orang tua berkata, \"Kami adalah penopang kalian; seandainya kalian kalah, kalian akan kembali kepada kami. Jangan kalian ambil harta rampasan sendiri.\" Para pemuda menolak dan berkata, \"Rasulullah ﷺ telah memberikannya untuk kami.\"[ref:d2737]", "Maka Allah menurunkan ayat ini sampai ayat 5, \"Sebagaimana Tuhanmu menyuruhmu pergi dari rumahmu dengan kebenaran\".[ref:d2737] Riwayat itu ditutup dengan keterangan bahwa hal itu ternyata lebih baik bagi mereka.[ref:d2737] As-Suyuthi mencatat riwayat ini juga dikeluarkan An-Nasa'i, Ibnu Hibban, dan Al-Hakim.[ref:lubab]"]
        },
        {
          id: "ubadah",
          judul: "Riwayat Ubadah bin Ash-Shamit",
          isi: ["Ubadah bin Ash-Shamit, yang ikut Perang Badar, menuturkan bahwa setelah musuh dikalahkan, kaum muslimin terbagi tiga: sebagian mengejar musuh, sebagian mengumpulkan harta rampasan, dan sebagian mengelilingi Rasulullah ﷺ untuk menjaga beliau.[ref:muqbil97] Masing-masing merasa paling berhak atas harta rampasan, lalu turun ayat ini, dan Rasulullah ﷺ membaginya di antara kaum muslimin.[ref:muqbil97][ref:wahidi]", "Ibnu Katsir membawakan ucapan Ubadah: \"Tentang kami, para peserta Badar, ayat ini turun, ketika kami berselisih tentang rampasan dan akhlak kami menjadi buruk karenanya. Maka Allah mencabutnya dari tangan kami dan menyerahkannya kepada Rasulullah ﷺ.\" Lalu beliau membaginya secara merata.[ref:ik] Muqbil memuat riwayat ini sebagai sebab lain dan membahas apakah Makhul mendengar langsung dari Abu Umamah, perawi riwayat ini dari Ubadah.[ref:muqbil97]"]
        },
        {
          id: "makna",
          judul: "Makna al-anfal dan hukumnya",
          isi: ["Ibnu Katsir menukil Ibnu Abbas, Mujahid, 'Ikrimah, 'Atha', Adh-Dhahhak, Qatadah, dan mayoritas ulama bahwa al-anfal berarti harta rampasan perang (ghanimah).[ref:ik] Ath-Thabari memilih makna tambahan yang diberikan imam kepada sebagian atau seluruh pasukan di luar bagian pokok, karena secara bahasa nafl berarti tambahan.[ref:thabari]", "Mujahid dan 'Ikrimah berpendapat hukum ayat ini dihapus oleh ayat 41 tentang seperlima (khumus), sedangkan Ibnu Zaid berpendapat ayat ini tetap berlaku.[ref:thabari] Ath-Thabari menguatkan bahwa ayat ini tidak dihapus, karena tidak ada dalil yang menunjukkannya.[ref:thabari] Al-Qurthubi mencatat bahwa pembagian oleh Rasulullah ﷺ itu terjadi sebelum turun ayat 41.[ref:qurthubi]", "Tafsir Ringkas Kemenag menyebut bahwa melimpahnya harta rampasan Badar sempat memicu perselisihan, sehingga ayat ini mengajak kaum mukmin bertakwa dan mempererat persaudaraan.[ref:kemenag]"]
        }
      ],
      lihatJuga: [
        {
          label: "Sa'ad bin Abi Waqqash",
          tokoh: "saad"
        },
        {
          label: "Ubadah bin Ash-Shamit",
          tokoh: "ubadah"
        },
        {
          label: "Abdullah bin Abbas",
          tokoh: "ibnuabbas"
        },
        {
          label: "Al-Anfal 9",
          wiki: "anfal-9",
          ket: "doa Nabi di hari Badar"
        },
        {
          label: "Al-Anfal 30",
          wiki: "anfal-30",
          ket: "surah yang sama"
        }
      ],
      rujukan: {
        t3079: {
          t: "HR. Tirmidzi no. 3079, dari Mush'ab bin Sa'ad dari Sa'ad bin Abi Waqqash (Kitab Tafsir, Surah Al-Anfal). Tirmidzi: hasan shahih; Darussalam: shahih.",
          url: "https://sunnah.com/tirmidhi:3079"
        },
        m1748a: {
          t: "HR. Muslim no. 1748a, dari Mush'ab bin Sa'ad dari ayahnya (Kitab Jihad, bab al-anfal).",
          url: "https://sunnah.com/muslim:1748a"
        },
        m1748b: {
          t: "HR. Muslim no. 1748b, dari Mush'ab bin Sa'ad dari ayahnya (Kitab Jihad, bab al-anfal): \"empat ayat turun tentang diriku\".",
          url: "https://sunnah.com/muslim:1748b"
        },
        d2737: {
          t: "HR. Abu Dawud no. 2737, dari 'Ikrimah dari Ibnu Abbas (Kitab Jihad, bab tentang nafl). Al-Albani: shahih.",
          url: "https://sunnah.com/abudawud:2737"
        },
        b4645: {
          t: "HR. Bukhari no. 4645, dari Sa'id bin Jubair dari Ibnu Abbas (Kitab Tafsir, Al-Anfal 1): \"Surah Al-Anfal turun tentang Badar\".",
          url: "https://sunnah.com/bukhari:4645"
        },
        wahidi: {
          t: "Al-Wahidi, Asbab an-Nuzul, Al-Anfal 1 (terjemahan Inggris Mokrane Guezzou).",
          url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=8&Ayah=1&search=yes&img=A&LanguageID=2"
        },
        lubab: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 93 (awal Surah Al-Anfal, riwayat Ibnu Abbas).",
          url: "https://shamela.ws/book/2247/91"
        },
        lubab94: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 94 (Al-Anfal 1: riwayat Sa'ad bin Abi Waqqash dan Mujahid).",
          url: "https://shamela.ws/book/2247/92"
        },
        muqbil96: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 96 (Al-Anfal 1: riwayat Sa'ad dan takhrij \"sebab lain\").",
          url: "https://shamela.ws/book/11547/91"
        },
        muqbil97: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 97 (Al-Anfal 1: riwayat Ubadah bin Ash-Shamit dan catatan sanadnya).",
          url: "https://shamela.ws/book/11547/92"
        },
        ik: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Al-Anfal 1.",
          url: "https://quran.com/8:1/tafsirs/ar-tafsir-ibn-kathir"
        },
        thabari: {
          t: "Ath-Thabari, Jami' al-Bayan, tafsir Al-Anfal 1.",
          url: "https://quran.com/8:1/tafsirs/ar-tafsir-al-tabari"
        },
        qurthubi: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Al-Anfal 1.",
          url: "https://quran.com/8:1/tafsirs/ar-tafseer-al-qurtubi"
        },
        kemenag: {
          t: "Tafsir Ringkas Kemenag RI dan tafsir lain (termasuk Hidayatul Insan) untuk Al-Anfal 1 (dimuat di TafsirWeb).",
          url: "https://tafsirweb.com/2867-surat-al-anfal-ayat-1.html"
        },
        nubadar: {
          t: "Muhammad Afiq Zahara, \"Ramadhan di Saat Perang Badar dan Fathu Makkah\", NU Online, 8 Mei 2019: Badar terjadi pada Ramadhan pertama kewajiban puasa.",
          url: "https://nu.or.id/ramadhan/ramadhan-di-saat-perang-badar-dan-fathu-makkah-ud8FB"
        },
        nupuasa: {
          t: "Fathoni Ahmad, \"Keterangan Lengkap Puasa Ramadhan dalam QS Al-Baqarah\", NU Online, 27 April 2020: puasa Ramadhan diwajibkan pada Sya'ban 2 H.",
          url: "https://nu.or.id/ramadhan/keterangan-lengkap-puasa-ramadhan-dalam-qs-al-baqarah-BO99H"
        }
      }
    },

    // nisa-11 (ditulis dari riset rujukan silang)
    "nisa-11": {
      judul: "An-Nisa' 11",
      sub: "Ayat warisan untuk anak dan orang tua",
      surah: "An-Nisa'",
      ayatNo: "11",
      tahun: 625,
      tontonan: null,
      peta: {
        tahun: 625,
        tempat: "bani-salimah",
        kota: "madinah"
      },
      lead: ["An-Nisa' ayat 11 menetapkan bagian warisan anak-anak dan kedua orang tua: bagian anak laki-laki dua kali bagian anak perempuan, anak perempuan yang berjumlah dua atau lebih mendapat dua pertiga, dan pembagian dilakukan setelah wasiat dan utang dipenuhi.[ref:kemenag] Jabir bin Abdullah meriwayatkan bahwa ayat ini turun ketika ia sakit dan dijenguk Nabi ﷺ dan Abu Bakar di perkampungan Bani Salimah, lalu ia bertanya apa yang harus ia lakukan dengan hartanya.[ref:b4577]", "Jabir juga meriwayatkan kisah istri Sa'ad bin Ar-Rabi', yang datang bersama dua putrinya setelah Sa'ad gugur di Uhud dan paman mereka mengambil seluruh harta peninggalannya; menurut riwayat ini, ayat warisan turun karena peristiwa itu.[ref:t2092][ref:d2892] Ibnu Katsir menilai riwayat kedua inilah yang lebih cocok dengan ayat ini, sedangkan Ibnu Hajar dan Muqbil Al-Wadi'i berpendapat ayat ini dapat turun karena kedua peristiwa sekaligus.[ref:ik][ref:lubab][ref:muqbil65]"],
      infobox: [
        ["Surah", "An-Nisa' (النساء), surah ke-4 dalam mushaf"],
        ["Ayat", "11 (Muqbil memuat ayat 11–12 dalam satu bab)[ref:muqbil]"],
        ["Golongan", "Madaniyah"],
        ["Waktu", "Riwayat Jabir tidak menyebut waktunya[ref:b4577]. Riwayat dua putri Sa'ad bin Ar-Rabi' menunjuk masa setelah Perang Uhud[ref:t2092], yang terjadi pada Syawal 3 H[ref:ik121]; 625 M di peta hanya perkiraan"],
        ["Tempat", "Perkampungan Bani Salimah, Madinah, tempat Jabir dijenguk[ref:b4577]"],
        ["Tokoh", "Jabir bin Abdullah; Nabi ﷺ dan Abu Bakar[ref:b4577]; istri dan dua putri Sa'ad bin Ar-Rabi', serta paman kedua putri itu[ref:t2092]"],
        ["Riwayat utama", "HR. Bukhari no. 4577 (Jabir bin Abdullah)"],
        ["Riwayat pembanding", "HR. Muslim no. 1616a (Jabir): ayat yang turun disebut ayat kalalah[ref:m1616]; HR. Abu Dawud no. 2891–2892 dan HR. Tirmidzi no. 2092 (Jabir): kisah dua putri Sa'ad bin Ar-Rabi'[ref:d2891][ref:d2892][ref:t2092]"],
        ["Derajat", "Riwayat Jabir dari Al-Bukhari shahih dan disepakati Al-Bukhari dan Muslim[ref:muqbil65]. Riwayat dua putri Sa'ad: hasan shahih menurut At-Tirmidzi, dha'if menurut Darussalam[ref:t2092]; hasan menurut Al-Albani[ref:d2892]; Al-Hakim menshahihkan sanadnya dan disetujui Adz-Dzahabi[ref:muqbil]. Perawinya, Abdullah bin Muhammad bin 'Aqil, menurut Muqbil jujur tetapi lemah hafalannya[ref:muqbil65]"]
      ],
      ayat: [
        {
          no: 11,
          ar: "يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ ۚ فَإِن كُنَّ نِسَاءً فَوْقَ اثْنَتَيْنِ فَلَهُنَّ ثُلُثَا مَا تَرَكَ ۖ وَإِن كَانَتْ وَاحِدَةً فَلَهَا النِّصْفُ ۚ وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ مِمَّا تَرَكَ إِن كَانَ لَهُ وَلَدٌ ۚ فَإِن لَّمْ يَكُن لَّهُ وَلَدٌ وَوَرِثَهُ أَبَوَاهُ فَلِأُمِّهِ الثُّلُثُ ۚ فَإِن كَانَ لَهُ إِخْوَةٌ فَلِأُمِّهِ السُّدُسُ ۚ مِن بَعْدِ وَصِيَّةٍ يُوصِي بِهَا أَوْ دَيْنٍ ۗ آبَاؤُكُمْ وَأَبْنَاؤُكُمْ لَا تَدْرُونَ أَيُّهُمْ أَقْرَبُ لَكُمْ نَفْعًا ۚ فَرِيضَةً مِّنَ اللَّهِ ۗ إِنَّ اللَّهَ كَانَ عَلِيمًا حَكِيمًا",
          id: "Allah mensyariatkan (mewajibkan) kepadamu tentang (pembagian warisan untuk) anak-anakmu, (yaitu) bagian seorang anak laki-laki sama dengan bagian dua orang anak perempuan. Dan jika anak itu semuanya perempuan yang jumlahnya lebih dari dua, maka bagian mereka dua pertiga dari harta yang ditinggalkan. Jika dia (anak perempuan) itu seorang saja, maka dia memperoleh setengah (harta yang ditinggalkan). Dan untuk kedua ibu-bapak, bagian masing-masing seperenam dari harta yang ditinggalkan, jika dia (yang meninggal) mempunyai anak. Jika dia (yang meninggal) tidak mempunyai anak dan dia diwarisi oleh kedua ibu-bapaknya (saja), maka ibunya mendapat sepertiga. Jika dia (yang meninggal) mempunyai beberapa saudara, maka ibunya mendapat seperenam. (Pembagian-pembagian tersebut di atas) setelah (dipenuhi) wasiat yang dibuatnya atau (dan setelah dibayar) hutangnya. (Tentang) orang tuamu dan anak-anakmu, kamu tidak mengetahui siapa di antara mereka yang lebih banyak manfaatnya bagimu. Ini adalah ketetapan Allah. Sungguh, Allah Maha Mengetahui, Mahabijaksana."
        }
      ],
      bagian: [
        {
          id: "jabir",
          judul: "Jabir sakit di Bani Salimah",
          isi: ["Jabir bin Abdullah berkata: Nabi ﷺ dan Abu Bakar menjengukku di perkampungan Bani Salimah dengan berjalan kaki.[ref:b4577] Nabi ﷺ mendapatiku tidak sadarkan diri, lalu beliau meminta air, berwudhu dengannya, kemudian memercikkannya kepadaku, hingga aku sadar.[ref:b4577]", "Jabir bertanya, \"Apa yang engkau perintahkan kepadaku tentang hartaku, wahai Rasulullah?\" Maka turunlah, \"Allah mensyariatkan kepadamu tentang (pembagian warisan untuk) anak-anakmu.\"[ref:b4577] Al-Wahidi dan As-Suyuthi membawakan riwayat ini; As-Suyuthi menyebutnya dikeluarkan para imam yang enam.[ref:wahidi][ref:lubab]"]
        },
        {
          id: "kalalah",
          judul: "Ayat warisan atau ayat kalalah?",
          isi: ["Jalur-jalur hadits Jabir berbeda dalam menyebut ayat yang turun: jalur Ibnu Juraij dalam riwayat Al-Bukhari menyebut ayat 11.[ref:b4577] Jalur Sufyan bin 'Uyainah dalam riwayat Muslim menyebut Nabi ﷺ tidak menjawab sampai turun ayat warisan, \"Mereka meminta fatwa kepadamu. Katakanlah, 'Allah memberi fatwa kepadamu tentang kalalah'\", yaitu ayat 176.[ref:m1616] Dalam jalur Syu'bah yang dibawakan Ath-Thabari, Jabir berkata, \"Yang mewarisiku hanyalah kalalah.\"[ref:thabari]", "Ibnu Katsir berkata: yang tampak, hadits Jabir yang pertama menjadi sebab turunnya ayat terakhir surah ini, karena saat itu Jabir hanya punya saudara-saudara perempuan dan belum punya anak perempuan.[ref:ik]"]
        },
        {
          id: "saad",
          judul: "Dua putri Sa'ad bin Ar-Rabi'",
          isi: ["Jabir juga meriwayatkan: istri Sa'ad bin Ar-Rabi' datang kepada Rasulullah ﷺ bersama dua putri Sa'ad dan berkata, \"Wahai Rasulullah, ini dua putri Sa'ad bin Ar-Rabi'. Ayah mereka gugur sebagai syahid bersamamu di Perang Uhud. Paman mereka mengambil harta mereka dan tidak menyisakan apa pun, padahal mereka tidak akan dinikahkan kecuali bila punya harta.\" Beliau bersabda, \"Allah akan memutuskan perkara ini.\"[ref:t2092]", "Lalu turun ayat warisan. Rasulullah ﷺ memerintahkan paman mereka, \"Berikan kepada dua putri Sa'ad dua pertiga, dan kepada ibu mereka seperdelapan; sisanya untukmu.\"[ref:t2092] Dalam riwayat Abu Dawud, ayat yang turun disebut dengan lafal \"Allah mensyariatkan kepadamu tentang anak-anakmu\".[ref:d2891]", "Salah satu jalur Abu Dawud, lewat Bisyr bin Al-Mufadhdhal, menyebut keduanya putri Tsabit bin Qais; Abu Dawud menyatakan Bisyr keliru, karena keduanya putri Sa'ad bin Ar-Rabi', sedangkan Tsabit bin Qais gugur di Perang Yamamah.[ref:d2891] Abu Dawud menyebut jalur yang menyebut Sa'ad sebagai yang paling benar.[ref:d2892] Al-Qurthubi menukil Al-Kiya Ath-Thabari bahwa ayat ini turun tentang ahli waris Sa'ad bin Ar-Rabi', dan pendapat inilah yang lebih shahih menurut ahli riwayat dibanding pendapat ahli waris Tsabit bin Qais.[ref:qurthubi]"]
        },
        {
          id: "mana",
          judul: "Mana yang menjadi sebab?",
          isi: ["Ibnu Katsir menilai hadits Jabir yang kedua, tentang dua putri Sa'ad, lebih mirip dengan sebab turunnya ayat ini.[ref:ik] As-Suyuthi menukil Ibnu Hajar: sebagian ulama berpegang pada kisah ini untuk mengatakan ayat ini turun tentang dua putri Sa'ad, bukan tentang Jabir, apalagi Jabir saat itu belum punya anak.[ref:lubab] Jawaban Ibnu Hajar: ayat ini turun karena kedua perkara itu, dan mungkin awal ayat turun tentang dua putri itu, sedangkan bagian \"jika seseorang meninggal dalam keadaan kalalah\" (ayat 12) turun tentang Jabir.[ref:lubab]", "Muqbil Al-Wadi'i memuat kedua riwayat.[ref:muqbil] Menurutnya, kisah Jabir lebih shahih karena disepakati Al-Bukhari dan Muslim, sedangkan kisah dua putri Sa'ad diriwayatkan Abdullah bin Muhammad bin 'Aqil, yang jujur tetapi lemah hafalannya.[ref:muqbil65] Ia mengkritik pembagian ayat oleh Ibnu Hajar, karena kalalah dalam ayat 12 berkaitan dengan warisan saudara seibu, lalu menyimpulkan, sebagaimana juga dinyatakan Ibnu Hajar sebelumnya, bahwa tidak ada halangan ayat ini turun tentang kedua perkara sekaligus.[ref:muqbil65]", "Al-Qurthubi mendahulukan kisah ahli waris Sa'ad bin Ar-Rabi' sebelum kisah Jabir.[ref:qurthubi] Ath-Thabari membawakan riwayat-riwayat ini tanpa memilih salah satunya.[ref:thabari]"]
        },
        {
          id: "jahiliyah",
          judul: "Latar: warisan di masa jahiliyah",
          isi: ["Ibnu Katsir menyebut bahwa orang-orang jahiliyah memberikan seluruh warisan kepada laki-laki, tidak kepada perempuan; menurut Ibnu Abbas, mereka hanya memberi warisan kepada yang ikut berperang.[ref:ik] As-Suddi, dalam riwayat Ath-Thabari, menyebut bahwa orang jahiliyah tidak memberi warisan kepada anak-anak perempuan dan anak laki-laki yang masih kecil, lalu menceritakan Ummu Kujjah, janda Abdurrahman saudara penyair Hassan, yang mengadukan para ahli waris yang mengambil harta suaminya.[ref:thabari]", "Al-Qurthubi menyebut ayat ini salah satu rukun agama dan menekankan agungnya ilmu faraidh.[ref:qurthubi] Tafsir Ringkas Kemenag menjelaskan bahwa ketentuan ini datang dari Allah, karena manusia tidak mengetahui siapa di antara orang tua dan anak yang lebih besar manfaatnya.[ref:kemenag]"]
        }
      ],
      lihatJuga: [
        {
          label: "Jabir bin Abdullah",
          tokoh: "jabir"
        },
        {
          label: "Sa'ad bin Ar-Rabi'",
          tokoh: "saadrabi"
        },
        {
          label: "Abu Bakar Ash-Shiddiq",
          tokoh: "abubakar"
        },
        {
          label: "Perkampungan Bani Salimah",
          tempat: "bani-salimah",
          kota: "madinah",
          ket: "tempat Jabir dijenguk"
        },
        {
          label: "Ali 'Imran 128",
          wiki: "aliimran-128",
          ket: "Perang Uhud, 3 H"
        }
      ],
      rujukan: {
        b4577: {
          t: "HR. Bukhari no. 4577, dari Ibnu Al-Munkadir dari Jabir bin Abdullah (Kitab Tafsir, bab \"Yushikumullah\").",
          url: "https://sunnah.com/bukhari:4577"
        },
        m1616: {
          t: "HR. Muslim no. 1616a, dari Ibnu Al-Munkadir dari Jabir bin Abdullah (Kitab Faraidh, bab warisan kalalah).",
          url: "https://sunnah.com/muslim:1616a"
        },
        d2891: {
          t: "HR. Abu Dawud no. 2891, dari Abdullah bin Muhammad bin 'Aqil dari Jabir (Kitab Faraidh, bab warisan anak kandung). Al-Albani: hasan, tetapi penyebutan Tsabit bin Qais keliru; yang terpelihara adalah Sa'ad bin Ar-Rabi'.",
          url: "https://sunnah.com/abudawud:2891"
        },
        d2892: {
          t: "HR. Abu Dawud no. 2892, dari Abdullah bin Muhammad bin 'Aqil dari Jabir (Kitab Faraidh): menyebut istri Sa'ad bin Ar-Rabi'. Al-Albani: hasan.",
          url: "https://sunnah.com/abudawud:2892"
        },
        t2092: {
          t: "HR. Tirmidzi no. 2092, dari Abdullah bin Muhammad bin 'Aqil dari Jabir (Kitab Faraidh, bab warisan anak perempuan). Tirmidzi: hasan shahih, hanya dikenal dari hadits Ibnu 'Aqil; Darussalam: dha'if.",
          url: "https://sunnah.com/tirmidhi:2092"
        },
        wahidi: {
          t: "Al-Wahidi, Asbab an-Nuzul, An-Nisa' 11 (terjemahan Inggris Mokrane Guezzou).",
          url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=4&Ayah=11&search=yes&img=A&LanguageID=2"
        },
        lubab: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 53 (An-Nisa' 11, dengan kutipan Ibnu Hajar).",
          url: "https://shamela.ws/book/2247/51"
        },
        muqbil: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 64 (An-Nisa' 11–12: dua riwayat Jabir).",
          url: "https://shamela.ws/book/11547/59"
        },
        muqbil65: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 65 (penilaian kedua riwayat dan tanggapan atas Ibnu Hajar).",
          url: "https://shamela.ws/book/11547/60"
        },
        ik: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir An-Nisa' 11.",
          url: "https://quran.com/4:11/tafsirs/ar-tafsir-ibn-kathir"
        },
        ik121: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Ali 'Imran 121: Perang Uhud terjadi pada hari Sabtu, bulan Syawal 3 H.",
          url: "https://quran.com/3:121/tafsirs/ar-tafsir-ibn-kathir"
        },
        thabari: {
          t: "Ath-Thabari, Jami' al-Bayan, tafsir An-Nisa' 11.",
          url: "https://quran.com/4:11/tafsirs/ar-tafsir-al-tabari"
        },
        qurthubi: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir An-Nisa' 11.",
          url: "https://quran.com/4:11/tafsirs/ar-tafseer-al-qurtubi"
        },
        kemenag: {
          t: "Tafsir Ringkas Kemenag RI, An-Nisa' 11 (dimuat di TafsirWeb).",
          url: "https://tafsirweb.com/1543-surat-an-nisa-ayat-11.html"
        }
      }
    },

    // nisa-95 (ditulis dari riset rujukan silang)
    "nisa-95": {
      judul: "An-Nisa' 95",
      sub: "Tambahan \"ghairu ulid-dharar\" untuk Ibnu Ummi Maktum",
      surah: "An-Nisa'",
      ayatNo: "95",
      tahun: 624,
      tontonan: null,
      peta: {
        tahun: 624,
        lok: "madinah"
      },
      lead: ["An-Nisa' ayat 95 menegaskan bahwa orang beriman yang duduk tidak ikut berperang tanpa uzur tidak sama dengan orang yang berjihad di jalan Allah dengan harta dan jiwanya.[ref:kemenag] Menurut Zaid bin Tsabit, penulis wahyu, ketika ia sedang menuliskan ayat ini dari dikte Rasulullah ﷺ, Abdullah bin Ummi Maktum yang tunanetra datang dan berkata bahwa seandainya mampu, ia pasti ikut berjihad.[ref:b4592]", "Allah lalu menurunkan tambahan \"ghairu ulid-dharar\" (selain yang mempunyai uzur), sehingga orang yang berhalangan tidak termasuk yang dicela.[ref:b4592][ref:b4593] Kisah ini diriwayatkan Al-Bukhari dari Zaid bin Tsabit dan Al-Bara' bin 'Azib, serta Muslim dari Al-Bara'.[ref:b4592][ref:b4593][ref:m1898] Al-Wahidi, As-Suyuthi, dan Muqbil memuatnya dalam kitab-kitab asbabun nuzul.[ref:wahidi][ref:lubab][ref:muqbil]"],
      infobox: [
        ["Surah", "An-Nisa' (النساء), surah ke-4 dalam mushaf"],
        ["Ayat", "95; kalimat \"ghairu ulid-dharar\" turun menyusul ketika ayat itu sedang ditulis[ref:b4592][ref:fath261]"],
        ["Golongan", "Madaniyah"],
        ["Waktu", "Tidak disebut dalam hadits Zaid dan Al-Bara'. Menurut Ibnu Abbas, ayat ini berkenaan dengan orang yang tidak ikut dan yang ikut Perang Badar (2 H)[ref:b4595][ref:t3032]; tahun ±624 M di peta hanya perkiraan"],
        ["Tempat", "Madinah (tempat persisnya tidak disebut)"],
        ["Tokoh", "Abdullah bin Ummi Maktum; Zaid bin Tsabit, penulis wahyu[ref:b4592]. Riwayat Ibnu Abbas juga menyebut seorang putra Jahsy[ref:t3032][ref:thabari]"],
        ["Riwayat utama", "HR. Bukhari no. 4592 (Sahl bin Sa'd dari Marwan bin Al-Hakam dari Zaid bin Tsabit); HR. Bukhari no. 4593–4594 dan Muslim no. 1898 (Al-Bara' bin 'Azib)"],
        ["Riwayat pembanding", "HR. Abu Dawud no. 2507 (Kharijah bin Zaid dari Zaid bin Tsabit)[ref:d2507]; HR. Bukhari no. 4595 dan Tirmidzi no. 3032 (Ibnu Abbas): kaitannya dengan Perang Badar[ref:b4595][ref:t3032]"],
        ["Derajat", "Shahih (Bukhari, Muslim). At-Tirmidzi: hasan shahih untuk riwayat Al-Bara' dan riwayat Zaid lewat Sahl[ref:t3031][ref:t3033]; Al-Albani: hasan shahih untuk riwayat Abu Dawud[ref:d2507]; dimuat Muqbil dalam Ash-Shahih al-Musnad min Asbab an-Nuzul[ref:muqbil]"]
      ],
      ayat: [
        {
          no: 95,
          ar: "لَّا يَسْتَوِي الْقَاعِدُونَ مِنَ الْمُؤْمِنِينَ غَيْرُ أُولِي الضَّرَرِ وَالْمُجَاهِدُونَ فِي سَبِيلِ اللَّهِ بِأَمْوَالِهِمْ وَأَنفُسِهِمْ ۚ فَضَّلَ اللَّهُ الْمُجَاهِدِينَ بِأَمْوَالِهِمْ وَأَنفُسِهِمْ عَلَى الْقَاعِدِينَ دَرَجَةً ۚ وَكُلًّا وَعَدَ اللَّهُ الْحُسْنَىٰ ۚ وَفَضَّلَ اللَّهُ الْمُجَاهِدِينَ عَلَى الْقَاعِدِينَ أَجْرًا عَظِيمًا",
          id: "Tidaklah sama antara orang beriman yang duduk (yang tidak turut berperang) tanpa mempunyai uzur (halangan) dengan orang yang berjihad di jalan Allah dengan harta dan jiwanya. Allah melebihkan derajat orang-orang yang berjihad dengan harta dan jiwanya atas orang-orang yang duduk (tidak ikut berperang tanpa halangan). Kepada masing-masing, Allah menjanjikan (pahala) yang baik (surga) dan Allah melebihkan orang-orang yang berjihad atas orang yang duduk dengan pahala yang besar."
        }
      ],
      bagian: [
        {
          id: "dikte",
          judul: "Ayat yang sedang ditulis",
          isi: ["Sahl bin Sa'd As-Sa'idi menuturkan: ia melihat Marwan bin Al-Hakam duduk di masjid, lalu ia mendekat dan duduk di sampingnya.[ref:b4592] Marwan mengabarkan bahwa Zaid bin Tsabit bercerita kepadanya: Rasulullah ﷺ mendiktekan kepadanya ayat \"Tidaklah sama orang-orang beriman yang duduk dengan orang-orang yang berjihad di jalan Allah\".[ref:b4592]", "Al-Bara' bin 'Azib juga meriwayatkan bahwa ketika ayat itu turun, Nabi ﷺ memanggil Zaid untuk menuliskannya.[ref:b4593] Dalam salah satu jalurnya, Zaid datang membawa tinta dan papan atau tulang bahu (katif), dan riwayat Muslim menyebut Zaid menuliskannya di atas tulang bahu.[ref:b4594][ref:m1898][ref:wahidi]"]
        },
        {
          id: "keluhan",
          judul: "Keluhan Ibnu Ummi Maktum",
          isi: ["Ketika itu Ibnu Ummi Maktum, yang tunanetra, datang dan berkata, \"Wahai Rasulullah, seandainya aku mampu berjihad, tentu aku berjihad.\"[ref:b4592] Dalam riwayat Al-Bara', ia mengadukan kebutaannya; As-Suyuthi menukil lafalnya bahwa ia saat itu berada di belakang Nabi ﷺ dan berkata, \"Wahai Rasulullah, aku ini buta.\"[ref:b4593][ref:lubab]", "Ibnu Hajar memadukan kedua lafal itu: Ibnu Ummi Maktum bangkit dari tempatnya di belakang Nabi ﷺ hingga berada di hadapan beliau.[ref:fath261] Ath-Thabari juga membawakan riwayat Zaid bin Arqam bahwa Ibnu Ummi Maktum berdoa, \"Ya Allah, aku ini buta, maka berilah aku keringanan.\"[ref:thabari]"]
        },
        {
          id: "turun",
          judul: "Turunnya \"ghairu ulid-dharar\"",
          isi: ["Zaid menuturkan bahwa wahyu lalu turun kepada Rasulullah ﷺ ketika ia duduk berimpit dengan beliau, dan ia merasakan beratnya wahyu itu sampai khawatir pahanya sendiri remuk.[ref:b4592] Setelah keadaan itu berlalu, turunlah tambahan \"ghairu ulid-dharar\".[ref:b4592]", "Dalam riwayat Abu Dawud dari jalur Kharijah bin Zaid, Zaid menuliskan ayat itu di atas tulang bahu, lalu menambahkan pengecualian yang turun kemudian.[ref:d2507] Ibnu Hajar menukil ucapan Zaid dalam jalur ini, \"Seakan-akan aku masih melihat tempat sisipannya, di dekat retakan pada tulang bahu itu.\"[ref:fath261]", "Ibnu Hajar menukil dua kemungkinan dari Ibnu al-Munir: hanya kalimat pengecualian yang turun lalu disisipkan, atau seluruh ayat diturunkan ulang.[ref:fath261] Ia menilai kemungkinan pertama lebih jelas.[ref:fath261] Al-Qurthubi juga menukil dari Zaid bahwa kalimat itu turun tersendiri, lalu Zaid menyisipkannya pada tempatnya.[ref:qurthubi]"]
        },
        {
          id: "badar",
          judul: "Kaitannya dengan Perang Badar",
          isi: ["Ibnu Abbas menafsirkan ayat ini: tidak sama orang beriman yang duduk tidak ikut Perang Badar dengan orang yang ikut ke Badar.[ref:b4595]", "Dalam riwayat At-Tirmidzi dari Ibnu Abbas, ketika terjadi Perang Badar, Abdullah bin Jahsy dan Ibnu Ummi Maktum berkata bahwa mereka berdua buta dan bertanya apakah ada keringanan bagi mereka, lalu turunlah pengecualian itu.[ref:t3032] At-Tirmidzi memberi catatan gharib untuk jalur ini, dan Ibnu Katsir mengutipnya sebagai hasan gharib.[ref:t3032][ref:ik]", "Ath-Thabari meriwayatkan kisah ini dari jalur yang sama, Miqsam dari Ibnu Abbas, dengan nama Abu Ahmad bin Jahsy.[ref:thabari] Hidayatul Insan, yang dimuat TafsirWeb, mencatat bahwa Abdullah bin Jahsy bukan orang buta.[ref:kemenag]"]
        },
        {
          id: "jalur",
          judul: "Jalur-jalur riwayat",
          isi: ["As-Suyuthi menyebut kisah ini juga datang dari Zaid bin Arqam (Ath-Thabarani) dan Al-Faltan bin 'Ashim (Ibnu Hibban), serta dari banyak riwayat mursal pada Ibnu Jarir.[ref:lubab] Al-Wahidi membawakan riwayat Zaid bin Tsabit dan dua jalur Al-Bara'; dalam salah satunya, pengecualian itu turun sebelum Ibnu Ummi Maktum beranjak.[ref:wahidi]", "Muqbil memuat hadits Al-Bara', Zaid bin Tsabit, dan Al-Faltan bin 'Ashim.[ref:muqbil] Ia mencatat bahwa jalur Al-Bukhari dari Zaid melewati Marwan bin Al-Hakam yang diperbincangkan, tetapi dikuatkan oleh jalur Kharijah bin Zaid dan Qabishah bin Dzu'aib.[ref:muqbil] Ibnu Katsir menyebut hadits Zaid lewat Sahl dan hadits Ibnu Abbas tentang Badar hanya diriwayatkan Al-Bukhari, tidak oleh Muslim.[ref:ik]"]
        },
        {
          id: "kandungan",
          judul: "Kandungan ayat",
          isi: ["Tafsir Ringkas Kemenag menjelaskan bahwa orang yang berjihad dengan harta dan jiwa dilebihkan satu derajat atas orang yang duduk tanpa uzur, sementara kedua golongan dijanjikan surga dan para mujahid mendapat pahala yang lebih besar.[ref:kemenag]", "Ibnu Katsir menyimpulkan dari kalimat \"kepada masing-masing Allah menjanjikan (pahala) yang baik\" bahwa jihad adalah fardhu kifayah, bukan fardhu 'ain.[ref:ik] Ia juga membawakan hadits Anas bahwa ada orang-orang di Madinah yang tertahan oleh uzur, tetapi tetap menyertai pasukan dalam pahala setiap kali pasukan menempuh jalan bukit atau lembah.[ref:ik][ref:b2839]", "Al-Qurthubi menukil dua pendapat tentang orang yang berhalangan: pahalanya sama dengan para mujahid, atau ia mendapat pahala tanpa pelipatgandaan; ia condong kepada pendapat pertama.[ref:qurthubi]"]
        },
        {
          id: "setelah",
          judul: "Ibnu Ummi Maktum sesudahnya",
          isi: ["Rumaysho, menukil Siyar A'lam an-Nubala', menyebut riwayat Anas bahwa Ibnu Ummi Maktum ikut dalam Perang Qadisiyyah dengan membawa bendera hitam dan mengenakan baju besi.[ref:rumaysho] Tentang wafatnya ada perbedaan: Al-Waqidi menyebut ia kembali ke Madinah dan wafat di sana, sedangkan pendapat lain menyebut ia syahid di Qadisiyyah.[ref:rumaysho]"]
        }
      ],
      lihatJuga: [
        {
          label: "Abdullah bin Ummi Maktum",
          tokoh: "ibnuummimaktum"
        },
        {
          label: "Zaid bin Tsabit",
          tokoh: "zaidtsabit",
          ket: "penulis wahyu"
        },
        {
          label: "Abdullah bin Abbas",
          tokoh: "ibnuabbas"
        },
        {
          label: "'Abasa 1–10",
          wiki: "abasa-1-10",
          ket: "teguran tentang Ibnu Ummi Maktum"
        },
        {
          label: "Al-Anfal 9",
          wiki: "anfal-9",
          ket: "Perang Badar"
        }
      ],
      rujukan: {
        b4592: {
          t: "HR. Bukhari no. 4592, dari Sahl bin Sa'd dari Marwan bin Al-Hakam dari Zaid bin Tsabit (Kitab Tafsir, bab An-Nisa' 95).",
          url: "https://sunnah.com/bukhari:4592"
        },
        b4593: {
          t: "HR. Bukhari no. 4593, dari Al-Bara' bin 'Azib (Kitab Tafsir, bab An-Nisa' 95).",
          url: "https://sunnah.com/bukhari:4593"
        },
        b4594: {
          t: "HR. Bukhari no. 4594, dari Abu Ishaq dari Al-Bara' bin 'Azib (Kitab Tafsir, bab An-Nisa' 95).",
          url: "https://sunnah.com/bukhari:4594"
        },
        b4595: {
          t: "HR. Bukhari no. 4595, dari Miqsam dari Ibnu Abbas (Kitab Tafsir, bab An-Nisa' 95).",
          url: "https://sunnah.com/bukhari:4595"
        },
        m1898: {
          t: "HR. Muslim no. 1898a, dari Abu Ishaq dari Al-Bara' bin 'Azib (Kitab Al-Imarah, bab gugurnya kewajiban jihad bagi yang berhalangan).",
          url: "https://sunnah.com/muslim:1898a"
        },
        t3031: {
          t: "HR. Tirmidzi no. 3031, dari Al-Bara' bin 'Azib (Kitab Tafsir, Surah An-Nisa'). Tirmidzi: hasan shahih; Darussalam: shahih.",
          url: "https://sunnah.com/tirmidhi:3031"
        },
        t3032: {
          t: "HR. Tirmidzi no. 3032, dari Miqsam dari Ibnu Abbas (Kitab Tafsir, Surah An-Nisa'). Tirmidzi: gharib dari jalur ini; Darussalam: shahih.",
          url: "https://sunnah.com/tirmidhi:3032"
        },
        t3033: {
          t: "HR. Tirmidzi no. 3033, dari Sahl bin Sa'd dari Marwan bin Al-Hakam dari Zaid bin Tsabit (Kitab Tafsir, Surah An-Nisa'). Tirmidzi: hasan shahih; Darussalam: shahih.",
          url: "https://sunnah.com/tirmidhi:3033"
        },
        d2507: {
          t: "HR. Abu Dawud no. 2507, dari Kharijah bin Zaid dari Zaid bin Tsabit (Kitab Jihad, bab keringanan tidak ikut berperang karena uzur). Al-Albani: hasan shahih.",
          url: "https://sunnah.com/abudawud:2507"
        },
        b2839: {
          t: "HR. Bukhari no. 2839, dari Anas bin Malik (Kitab Jihad, bab orang yang tertahan uzur dari berperang).",
          url: "https://sunnah.com/bukhari:2839"
        },
        wahidi: {
          t: "Al-Wahidi, Asbab an-Nuzul, An-Nisa' 95 (terjemahan Inggris Mokrane Guezzou).",
          url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=4&Ayah=95&search=yes&img=A&LanguageID=2"
        },
        lubab: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 67 (An-Nisa' 95).",
          url: "https://shamela.ws/book/2247/65"
        },
        muqbil: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 75 (An-Nisa' 95).",
          url: "https://shamela.ws/book/11547/70"
        },
        fath261: {
          t: "Ibnu Hajar, Fath al-Bari 8/261 (Kitab Tafsir, bab An-Nisa' 95).",
          url: "https://shamela.ws/book/1673/4608"
        },
        ik: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir An-Nisa' 95.",
          url: "https://quran.com/4:95/tafsirs/ar-tafsir-ibn-kathir"
        },
        thabari: {
          t: "Ath-Thabari, Jami' al-Bayan, tafsir An-Nisa' 95.",
          url: "https://quran.com/4:95/tafsirs/ar-tafsir-al-tabari"
        },
        qurthubi: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir An-Nisa' 95.",
          url: "https://quran.com/4:95/tafsirs/ar-tafseer-al-qurtubi"
        },
        kemenag: {
          t: "Tafsir Ringkas Kemenag RI dan tafsir lain (antara lain Hidayatul Insan) untuk An-Nisa' 95 (dimuat di TafsirWeb).",
          url: "https://tafsirweb.com/1627-surat-an-nisa-ayat-95.html"
        },
        rumaysho: {
          t: "Muhammad Abduh Tuasikal, \"Ibnu Ummi Maktum: Sahabat Nabi yang Buta tetapi Tetap Berjuang untuk Islam\", Rumaysho.com (2026).",
          url: "https://rumaysho.com/41601-ibnu-ummi-maktum-sahabat-nabi-yang-buta-tetapi-tetap-berjuang-untuk-islam.html"
        }
      }
    },

    // hasyr-9 (ditulis dari riset rujukan silang)
    "hasyr-9": {
      judul: "Al-Hasyr 9",
      sub: "Anshar yang mengutamakan tamu Rasulullah ﷺ",
      surah: "Al-Hasyr",
      ayatNo: "9",
      tahun: 625,
      tontonan: null,
      peta: {
        tahun: 625,
        lok: "madinah"
      },
      lead: ["Al-Hasyr ayat 9 memuji kaum Anshar: mereka mencintai kaum Muhajirin, tidak menaruh keinginan dalam hati terhadap apa yang diberikan kepada Muhajirin, dan mengutamakan mereka atas diri sendiri meskipun mereka juga membutuhkan.[ref:kemenag]", "Menurut Abu Hurairah, ayat ini turun setelah seorang Anshar menjamu tamu Rasulullah ﷺ dengan makanan yang hanya cukup untuk anak-anaknya: lampu dipadamkan agar sang tamu dapat makan, sementara ia dan istrinya tidur dalam keadaan lapar.[ref:b4889][ref:b3798] Salah satu jalur Muslim menyebut Anshar itu Abu Thalhah, sedangkan riwayat lain menyebut nama yang berbeda.[ref:m2054c][ref:fath632]"],
      infobox: [
        ["Surah", "Al-Hasyr (الحشر), surah ke-59 dalam mushaf"],
        ["Ayat", "9, khususnya \"wa yu'tsiruna 'ala anfusihim wa lau kana bihim khashashah\""],
        ["Golongan", "Madaniyah; menurut Ibnu Abbas, surah ini turun tentang Bani Nadhir[ref:muqbil206]"],
        ["Waktu", "Tidak disebut dalam hadits Abu Hurairah[ref:b4889]; tahun ±625 M di peta mengikuti konteks surah, yaitu pengusiran Bani Nadhir, dan hanya perkiraan[ref:muqbil206]"],
        ["Tempat", "Madinah, di rumah seorang Anshar[ref:b4889]"],
        ["Tokoh", "Seorang Anshar dan istrinya; Abu Thalhah menurut satu jalur Muslim[ref:m2054c], Tsabit bin Qais menurut riwayat mursal Abul Mutawakkil[ref:lubab]"],
        ["Riwayat utama", "HR. Bukhari no. 3798 dan 4889; HR. Muslim no. 2054 (Abu Hurairah)"],
        ["Riwayat pembanding", "Riwayat Yazid Al-Asham tentang tawaran Anshar membagi tanah dengan Muhajirin, dan riwayat Ibnu Umar tentang kepala kambing yang berpindah ke tujuh rumah[ref:wahidi][ref:lubab]"],
        ["Derajat", "Shahih (Bukhari, Muslim); dimuat Muqbil dalam Ash-Shahih al-Musnad min Asbab an-Nuzul[ref:muqbil]. Riwayat Abul Mutawakkil berstatus mursal[ref:fath632]"]
      ],
      ayat: [
        {
          no: 9,
          ar: "وَالَّذِينَ تَبَوَّءُوا الدَّارَ وَالْإِيمَانَ مِن قَبْلِهِمْ يُحِبُّونَ مَنْ هَاجَرَ إِلَيْهِمْ وَلَا يَجِدُونَ فِي صُدُورِهِمْ حَاجَةً مِّمَّا أُوتُوا وَيُؤْثِرُونَ عَلَىٰ أَنفُسِهِمْ وَلَوْ كَانَ بِهِمْ خَصَاصَةٌ ۚ وَمَن يُوقَ شُحَّ نَفْسِهِ فَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ",
          id: "Dan orang-orang (Ansar) yang telah menempati kota Madinah dan telah beriman sebelum (kedatangan) mereka (Muhajirin), mereka mencintai orang yang berhijrah ke tempat mereka. Dan mereka tidak menaruh keinginan dalam hati mereka terhadap apa yang diberikan kepada mereka (Muhajirin); dan mereka mengutamakan (Muhajirin) atas dirinya sendiri, meskipun mereka juga memerlukan. Dan siapa yang dijaga dirinya dari kekikiran, maka mereka itulah orang-orang yang beruntung."
        }
      ],
      bagian: [
        {
          id: "tamu",
          judul: "Tamu yang lapar",
          isi: ["Abu Hurairah meriwayatkan: seorang laki-laki datang kepada Rasulullah ﷺ dalam keadaan sangat lapar.[ref:b4889][ref:b3798] Beliau mengirim utusan kepada istri-istri beliau, tetapi tidak ada makanan pada mereka; dalam riwayat lain, mereka hanya memiliki air.[ref:b4889][ref:b3798]", "Rasulullah ﷺ lalu bertanya siapa yang mau menjamu orang itu malam ini, dan seorang laki-laki Anshar menyanggupinya.[ref:b4889][ref:m2054a]"]
        },
        {
          id: "lampu",
          judul: "Lampu yang dipadamkan",
          isi: ["Laki-laki itu membawanya pulang dan berpesan kepada istrinya agar memuliakan tamu Rasulullah ﷺ.[ref:b4889] Istrinya menjawab bahwa mereka hanya punya makanan untuk anak-anak.[ref:b4889]", "Ia meminta istrinya menyiapkan makanan, menyalakan lampu, dan menidurkan anak-anak bila mereka meminta makan malam.[ref:b3798] Istrinya lalu berdiri seolah-olah hendak membetulkan lampu, tetapi justru memadamkannya.[ref:b3798] Keduanya berpura-pura ikut makan, lalu tidur dalam keadaan lapar.[ref:b3798]"]
        },
        {
          id: "turun",
          judul: "Turunnya ayat",
          isi: ["Pagi harinya, laki-laki itu menemui Rasulullah ﷺ, dan beliau bersabda, \"Sungguh Allah takjub, atau tertawa, karena perbuatan si fulan dan si fulanah.\"[ref:b4889][ref:lubab] Lalu Allah menurunkan ayat \"dan mereka mengutamakan (Muhajirin) atas dirinya sendiri, meskipun mereka juga memerlukan\".[ref:b4889][ref:lubab]", "Muqbil memuat hadits ini dalam Ash-Shahih al-Musnad min Asbab an-Nuzul dan menyebut periwayatnya, antara lain Al-Bukhari, Muslim, At-Tirmidzi, dan Ibnu Jarir.[ref:muqbil]"]
        },
        {
          id: "nama",
          judul: "Siapa Anshar itu?",
          isi: ["Riwayat Al-Bukhari hanya menyebut \"seorang laki-laki dari Anshar\".[ref:b4889] Dalam salah satu jalur Muslim, yaitu dari Ibnu Fudhail dari ayahnya dari Abu Hazim, ia disebut Abu Thalhah.[ref:m2054c] Ath-Thabari juga menyebut nama Abu Thalhah dalam riwayatnya, dan Ibnu Katsir mencatat bahwa satu riwayat Muslim menamainya demikian.[ref:thabari][ref:ik]", "Ibnu Hajar menyatakan bahwa Anshar itu adalah Abu Thalhah, sebagaimana telah ia jelaskan dalam bab Manaqib al-Anshar, tetapi ia menukil keraguan Al-Khathib apakah yang dimaksud Abu Thalhah Zaid bin Sahl atau sahabat lain dengan kunyah yang sama.[ref:fath632]", "Riwayat mursal Abul Mutawakkil An-Naji, yang dikutip As-Suyuthi dari Musaddad dan Ibnul Mundzir, menyebut penjamu itu Tsabit bin Qais bin Syammas.[ref:lubab] Al-Qurthubi menukil dari Al-Mahdawi dan An-Nahhas bahwa ayat ini turun tentang Tsabit bin Qais dan seorang Anshar bernama Abul Mutawakkil.[ref:qurthubi] Ibnu Hajar menilai anggapan bahwa ayat ini turun tentang Abul Mutawakkil sebagai kekeliruan yang nyata, karena Abul Mutawakkil adalah seorang tabi'in yang dikenal.[ref:fath632]"]
        },
        {
          id: "lain",
          judul: "Riwayat-riwayat lain",
          isi: ["Al-Wahidi dan As-Suyuthi membawakan riwayat Yazid Al-Asham: kaum Anshar meminta Nabi ﷺ membagi tanah mereka menjadi dua dengan kaum Muhajirin.[ref:wahidi][ref:lubab] Beliau menolak dan mengusulkan agar Anshar mencukupi kebutuhan Muhajirin dan berbagi hasil buahnya, sedangkan tanahnya tetap milik Anshar.[ref:wahidi][ref:lubab] Mereka ridha, lalu turunlah ayat ini.[ref:wahidi][ref:lubab]", "Keduanya juga membawakan riwayat Ibnu Umar: seorang sahabat diberi hadiah kepala kambing, lalu mengirimkannya kepada saudaranya yang ia anggap lebih membutuhkan.[ref:wahidi][ref:lubab] Hadiah itu terus berpindah sampai tujuh rumah dan kembali kepada orang pertama, lalu ayat ini turun.[ref:wahidi][ref:lubab]", "Al-Qurthubi juga menukil riwayat Ibnu Abbas tentang harta Bani Nadhir yang diserahkan kepada kaum Muhajirin dengan kerelaan kaum Anshar.[ref:qurthubi] Dari semua riwayat itu, ia menilai kisah penjamuan tamu sebagai yang paling shahih.[ref:qurthubi] Ath-Thabari dan Ibnu Katsir juga membawakan riwayat tentang pembagian harta Bani Nadhir dalam menafsirkan ayat ini.[ref:thabari][ref:ik]"]
        },
        {
          id: "kandungan",
          judul: "Kandungan ayat",
          isi: ["Tafsir Ringkas Kemenag menjelaskan bahwa kaum Anshar menyambut Muhajirin dengan cinta dan persaudaraan karena Allah, membantu mereka tanpa rasa iri, dan mendahulukan kebutuhan saudara seiman meskipun mereka sendiri membutuhkan.[ref:kemenag]", "Ibnu Katsir menjelaskan bahwa \"hajah\" dalam ayat ini berarti rasa dengki, sedangkan \"khashashah\" berarti keadaan butuh.[ref:ik] Ia menilai memberi ketika sedang membutuhkan lebih tinggi derajatnya daripada memberi dari kelebihan.[ref:ik] Almanhaj memuat uraian Ustadz Abu Minhal tentang kedermawanan keluarga Anshar ini, dengan merujuk HR. Bukhari no. 3798 dan Muslim no. 2054.[ref:almanhaj]"]
        }
      ],
      lihatJuga: [
        {
          label: "Abu Thalhah Al-Anshari",
          tokoh: "abuthalhah",
          ket: "nama tuan rumah menurut satu jalur Muslim"
        },
        {
          label: "Abu Hurairah",
          tokoh: "abuhurairah",
          ket: "perawi kisah"
        },
        {
          label: "Perkampungan Bani Nadhir",
          tempat: "nadhir",
          kota: "madinah",
          ket: "konteks Surah Al-Hasyr"
        }
      ],
      rujukan: {
        b4889: {
          t: "HR. Bukhari no. 4889, dari Abu Hurairah (Kitab Tafsir, bab Al-Hasyr 9).",
          url: "https://sunnah.com/bukhari:4889"
        },
        b3798: {
          t: "HR. Bukhari no. 3798, dari Abu Hurairah (Kitab Manaqib al-Anshar, bab \"wa yu'tsiruna 'ala anfusihim\").",
          url: "https://sunnah.com/bukhari:3798"
        },
        m2054a: {
          t: "HR. Muslim no. 2054a, dari Abu Hurairah (Kitab Minuman, bab memuliakan tamu dan keutamaan mendahulukannya).",
          url: "https://sunnah.com/muslim:2054a"
        },
        m2054c: {
          t: "HR. Muslim no. 2054c, dari Ibnu Fudhail dari ayahnya dari Abu Hazim dari Abu Hurairah; tuan rumah disebut Abu Thalhah.",
          url: "https://sunnah.com/muslim:2054c"
        },
        wahidi: {
          t: "Al-Wahidi, Asbab an-Nuzul, Al-Hasyr 9 (terjemahan Inggris Mokrane Guezzou).",
          url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=59&Ayah=9&search=yes&img=A&LanguageID=2"
        },
        lubab: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 192 (Al-Hasyr 9).",
          url: "https://shamela.ws/book/2247/190"
        },
        muqbil: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 208 (Al-Hasyr 9).",
          url: "https://shamela.ws/book/11547/203"
        },
        muqbil206: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 206 (Al-Hasyr 1–2: riwayat Ibnu Abbas bahwa surah ini turun tentang Bani Nadhir).",
          url: "https://shamela.ws/book/11547/201"
        },
        fath632: {
          t: "Ibnu Hajar, Fath al-Bari 8/632 (Kitab Tafsir, bab \"wa yu'tsiruna 'ala anfusihim\").",
          url: "https://shamela.ws/book/1673/4979"
        },
        ik: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Al-Hasyr 9.",
          url: "https://quran.com/59:9/tafsirs/ar-tafsir-ibn-kathir"
        },
        thabari: {
          t: "Ath-Thabari, Jami' al-Bayan, tafsir Al-Hasyr 9.",
          url: "https://quran.com/59:9/tafsirs/ar-tafsir-al-tabari"
        },
        qurthubi: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Al-Hasyr 9.",
          url: "https://quran.com/59:9/tafsirs/ar-tafseer-al-qurtubi"
        },
        kemenag: {
          t: "Tafsir Ringkas Kemenag RI dan tafsir lain untuk Al-Hasyr 9 (dimuat di TafsirWeb).",
          url: "https://tafsirweb.com/10807-surat-al-hasyr-ayat-9.html"
        },
        almanhaj: {
          t: "Ustadz Abu Minhal, \"Kedermawanan Keluarga Anshar\", Almanhaj (dari Majalah As-Sunnah Edisi 01/Tahun XXI/1438 H).",
          url: "https://almanhaj.or.id/11221-kedermawanan-keluarga-anshar.html"
        }
      }
    },

    // ahzab-37 (ditulis dari riset rujukan silang)
    "ahzab-37": {
      judul: "Al-Ahzab 37",
      sub: "Zaid, Zainab, dan berakhirnya hukum anak angkat",
      surah: "Al-Ahzab",
      ayatNo: "37",
      tahun: 627,
      tontonan: null,
      peta: {
        tahun: 627,
        lok: "madinah"
      },
      lead: ["Al-Ahzab ayat 37 turun berkenaan dengan Zainab binti Jahsy dan Zaid bin Haritsah, sebagaimana dikatakan Anas bin Malik dalam riwayat Al-Bukhari.[ref:b4787] Zaid, yang dimerdekakan dan pernah diangkat anak oleh Rasulullah ﷺ, datang mengadukan istrinya, dan beliau terus berkata kepadanya, \"Bertakwalah kepada Allah dan pertahankan istrimu.\"[ref:b7420][ref:b4782]", "Menurut penjelasan Ali bin Al-Husain yang dibawakan Ibnu Katsir dan Ibnu Hajar, yang beliau sembunyikan adalah kabar dari Allah bahwa Zainab kelak akan menjadi istri beliau.[ref:ik][ref:fath524] Pernikahan itu kemudian terjadi atas ketetapan Allah, untuk menghapus anggapan jahiliyah bahwa bekas istri anak angkat sama dengan bekas istri anak kandung.[ref:fath524][ref:kemenag]"],
      infobox: [
        ["Surah", "Al-Ahzab (الأحزاب), surah ke-33 dalam mushaf"],
        ["Ayat", "37"],
        ["Golongan", "Madaniyah"],
        ["Waktu", "Setelah Zaid menceraikan Zainab dan masa iddahnya selesai[ref:m1428b]. Pernikahan Nabi ﷺ dengan Zainab terjadi pada Dzulqa'dah 5 H (±627 M) menurut Qatadah, Al-Waqidi, dan lainnya; Abu 'Ubaidah dan Khalifah bin Khayyath menyebut 3 H[ref:ik53]"],
        ["Tempat", "Madinah"],
        ["Tokoh", "Zaid bin Haritsah dan Zainab binti Jahsy[ref:b4787]"],
        ["Riwayat utama", "HR. Bukhari no. 4787 dan 7420 (Anas bin Malik); HR. Muslim no. 1428b (Anas, kisah pinangan setelah iddah)"],
        ["Riwayat pembanding", "Ayat 36 tentang pinangan Zainab untuk Zaid: riwayat Qatadah dan Ibnu Abbas[ref:lubab]; HR. Bukhari no. 4782 (Ibnu Umar) tentang panggilan \"Zaid bin Muhammad\" dan Al-Ahzab 5[ref:b4782]; HR. Tirmidzi no. 3207 (Aisyah), dha'if menurut Darussalam[ref:t3207]"],
        ["Derajat", "Shahih (Bukhari, Muslim); dimuat Muqbil dalam Ash-Shahih al-Musnad min Asbab an-Nuzul[ref:muqbil]. Sanad penjelasan Ali bin Al-Husain lemah karena Ali bin Zaid bin Jud'an, tetapi maknanya sejalan dengan riwayat As-Suddi dan dipegang Ibnu Hajar[ref:fath524]"]
      ],
      ayat: [
        {
          no: 37,
          ar: "وَإِذْ تَقُولُ لِلَّذِي أَنْعَمَ اللَّهُ عَلَيْهِ وَأَنْعَمْتَ عَلَيْهِ أَمْسِكْ عَلَيْكَ زَوْجَكَ وَاتَّقِ اللَّهَ وَتُخْفِي فِي نَفْسِكَ مَا اللَّهُ مُبْدِيهِ وَتَخْشَى النَّاسَ وَاللَّهُ أَحَقُّ أَن تَخْشَاهُ ۖ فَلَمَّا قَضَىٰ زَيْدٌ مِّنْهَا وَطَرًا زَوَّجْنَاكَهَا لِكَيْ لَا يَكُونَ عَلَى الْمُؤْمِنِينَ حَرَجٌ فِي أَزْوَاجِ أَدْعِيَائِهِمْ إِذَا قَضَوْا مِنْهُنَّ وَطَرًا ۚ وَكَانَ أَمْرُ اللَّهِ مَفْعُولًا",
          id: "Dan (ingatlah), ketika engkau (Muhammad) berkata kepada orang yang telah diberi nikmat oleh Allah dan engkau (juga) telah memberi nikmat kepadanya, \"Pertahankanlah terus istrimu dan bertakwalah kepada Allah,\" sedang engkau menyembunyikan di dalam hatimu apa yang akan ditampakkan oleh Allah, dan engkau takut kepada manusia, padahal Allah lebih berhak engkau takuti. Maka ketika Zaid telah mengakhiri keperluan terhadap istrinya (menceraikannya), Kami nikahkan engkau dengan dia (Zainab) agar tidak ada keberatan bagi orang mukmin untuk (menikahi) istri-istri anak-anak angkat mereka, apabila anak-anak angkat itu telah menyelesaikan keperluannya terhadap istrinya. Dan ketetapan Allah itu pasti terjadi."
        }
      ],
      bagian: [
        {
          id: "zaid",
          judul: "Zaid bin Haritsah dan anak angkat",
          isi: ["Ibnu Katsir dan Ath-Thabari menjelaskan bahwa \"orang yang telah diberi nikmat oleh Allah dan engkau juga telah memberi nikmat kepadanya\" adalah Zaid bin Haritsah: Allah memberinya nikmat Islam, dan Rasulullah ﷺ memerdekakannya.[ref:ik][ref:thabari]", "Abdullah bin Umar menuturkan bahwa para sahabat dahulu memanggil Zaid dengan \"Zaid bin Muhammad\", sampai turun ayat 5 surah ini yang memerintahkan agar anak angkat dipanggil dengan nama bapak mereka.[ref:b4782] Ibnu Katsir menjelaskan bahwa Allah mengakhiri penisbatan anak angkat itu, dan pernikahan dalam ayat 37 menghapus keberatan orang beriman untuk menikahi bekas istri anak angkat mereka.[ref:ik]"]
        },
        {
          id: "pinangan",
          judul: "Pernikahan Zaid dengan Zainab",
          isi: ["As-Suyuthi membawakan riwayat Qatadah, dengan sanad yang ia sebut shahih: Nabi ﷺ meminang Zainab untuk Zaid.[ref:lubab] Zainab semula mengira pinangan itu untuk beliau sendiri, lalu menolak ketika tahu pinangan itu untuk Zaid, hingga turun ayat 36, \"Dan tidaklah pantas bagi laki-laki yang mukmin dan perempuan yang mukmin...\", lalu ia ridha dan menerimanya.[ref:lubab]", "Dalam riwayat Ibnu Abbas lewat Ikrimah, yang juga dibawakan As-Suyuthi dari Ibnu Jarir, Zainab menolak karena merasa nasabnya lebih mulia.[ref:lubab]"]
        },
        {
          id: "nasihat",
          judul: "\"Pertahankan istrimu\"",
          isi: ["Anas bin Malik menuturkan bahwa Zaid bin Haritsah datang mengadukan istrinya, dan Nabi ﷺ terus berkata kepadanya, \"Bertakwalah kepada Allah dan pertahankan istrimu.\"[ref:b7420] Tsabit Al-Bunani, perawi dari Anas, membaca ayat ini dan berkata bahwa ayat itu turun tentang Zainab dan Zaid bin Haritsah.[ref:b7420] Ibnu Hajar menegaskan bahwa riwayat-riwayat tidak berbeda bahwa ayat ini turun tentang Zaid dan Zainab.[ref:fath523]", "Aisyah berkata, \"Seandainya Rasulullah ﷺ menyembunyikan sesuatu, tentu beliau menyembunyikan ayat ini.\"[ref:b7420] Dalam riwayat Muslim, Aisyah juga menegaskan bahwa siapa yang mengira Rasulullah ﷺ menyembunyikan sesuatu dari Kitab Allah, ia telah melakukan kebohongan besar atas nama Allah.[ref:m177a]"]
        },
        {
          id: "disembunyikan",
          judul: "Apa yang beliau sembunyikan?",
          isi: ["Ibnu Katsir membawakan riwayat Ibnu Abi Hatim dari Ali bin Al-Husain (Zainal Abidin): Allah telah memberitahukan kepada Nabi-Nya bahwa Zainab akan menjadi salah satu istrinya sebelum beliau menikahinya.[ref:ik] Maka ketika Zaid datang mengadukannya, beliau berkata, \"Bertakwalah kepada Allah dan pertahankan istrimu.\"[ref:ik] Ibnu Katsir menyebut As-Suddi juga meriwayatkan penjelasan serupa.[ref:ik]", "Ibnu Hajar mencatat bahwa sanad riwayat Ali bin Al-Husain itu lemah karena perawinya, Ali bin Zaid bin Jud'an, dan bahwa riwayat As-Suddi menyampaikan kisah yang sama dengan lebih jelas.[ref:fath524] Ia menyimpulkan: yang disembunyikan Nabi ﷺ adalah kabar dari Allah bahwa Zainab akan menjadi istrinya.[ref:fath524] Beliau menyembunyikannya karena khawatir orang-orang berkata bahwa beliau menikahi istri anaknya.[ref:fath524]", "Menurut Ibnu Hajar, Allah hendak menghapus hukum adopsi jahiliyah dengan cara yang paling tegas, yaitu pernikahan pemimpin kaum muslimin dengan bekas istri orang yang dipanggil anaknya, agar lebih mudah diterima.[ref:fath524] Al-Qurthubi menyebut penjelasan ini sebagai tafsir terbaik untuk ayat ini, dan menisbatkannya kepada para ulama peneliti seperti Az-Zuhri, Al-Qadhi Bakr bin Al-'Ala' Al-Qusyairi, dan Ibnu Al-'Arabi.[ref:qurthubi]"]
        },
        {
          id: "ditolak",
          judul: "Riwayat yang ditolak para ulama",
          isi: ["Ibnu Katsir menyatakan bahwa Ibnu Abi Hatim dan Ibnu Jarir membawakan di sini atsar-atsar dari sebagian salaf yang sengaja ia lewati dan tidak ia sebutkan karena tidak shahih.[ref:ik] Ia juga tidak menyebutkan satu riwayat Imam Ahmad dari Hammad bin Zaid dari Tsabit dari Anas, karena di dalamnya ada keganjilan.[ref:ik]", "Ibnu Hajar juga menyatakan bahwa atsar-atsar lain yang dibawakan Ibnu Abi Hatim dan Ath-Thabari, lalu dinukil banyak mufassir, tidak sepatutnya disibukkan, dan bahwa riwayat yang ia bawakan itulah yang menjadi pegangan.[ref:fath524]", "Al-Qurthubi menolak riwayat yang menggambarkan bahwa hati Nabi ﷺ condong kepada Zainab ketika ia masih menjadi istri Zaid.[ref:qurthubi] Menurutnya, ucapan seperti itu hanya muncul dari orang yang tidak memahami kemaksuman Nabi ﷺ atau meremehkan kehormatannya.[ref:qurthubi] Artikel Almanhaj yang menerjemahkan bahasan Ibnul Qayyim dalam Zadul Ma'ad juga menolak anggapan itu, dan catatan kakinya menyebut riwayat tersebut batil.[ref:almanhaj]"]
        },
        {
          id: "zawwajnakaha",
          judul: "\"Kami nikahkan engkau dengan dia\"",
          isi: ["Anas menuturkan: setelah masa iddah Zainab selesai, Rasulullah ﷺ meminta Zaid menyampaikan pinangan beliau kepadanya.[ref:m1428b] Zaid merasa sangat segan kepada Zainab, sehingga ia menyampaikan pinangan itu sambil membelakanginya.[ref:m1428b]", "Zainab menjawab, \"Aku tidak akan berbuat apa pun sampai aku meminta petunjuk kepada Tuhanku,\" lalu ia menuju tempat shalatnya.[ref:m1428b] Kemudian turunlah Al-Qur'an, dan Rasulullah ﷺ datang menemuinya tanpa meminta izin.[ref:m1428b] Ibnu Katsir menjelaskan bahwa Allah sendirilah yang menikahkan Zainab dengan Nabi ﷺ melalui wahyu.[ref:ik]", "Zainab biasa membanggakan diri di hadapan istri-istri Nabi ﷺ yang lain: mereka dinikahkan oleh keluarga mereka, sedangkan ia dinikahkan oleh Allah dari atas tujuh langit.[ref:b7420] Menurut Anas, pada walimah pernikahan itu disajikan roti dan daging, dan Ibnu Katsir menyebut ayat hijab (ayat 53) turun pada pagi hari walimah tersebut.[ref:m1428b][ref:ik53]"]
        },
        {
          id: "ayat40",
          judul: "Ucapan orang-orang dan ayat 40",
          isi: ["Dalam riwayat At-Tirmidzi dari Aisyah, setelah Nabi ﷺ menikahi Zainab, orang-orang berkata bahwa beliau menikahi istri anaknya, lalu Allah menurunkan ayat 40, \"Muhammad itu bukanlah bapak dari seseorang di antara kamu.\"[ref:t3207] At-Tirmidzi menilai riwayat ini gharib, dan Darussalam menilainya dha'if.[ref:t3207]"]
        },
        {
          id: "sumber",
          judul: "Dalam kitab-kitab asbabun nuzul",
          isi: ["As-Suyuthi membawakan riwayat Al-Bukhari dari Anas, riwayat Al-Hakim dari Anas tentang Zaid yang mengadukan istrinya, dan riwayat Muslim, Ahmad, dan An-Nasa'i tentang pinangan setelah iddah.[ref:lubab] Muqbil memuat riwayat Al-Bukhari dari Anas, juga dari At-Tirmidzi, Ahmad, dan Al-Hakim, serta riwayat Ibnu Sa'd tentang ucapan Zainab.[ref:muqbil]", "Al-Wahidi tidak memuat sebab turun ayat 36 dan 37 dalam kitabnya: terjemahan Inggrisnya menyatakan ayat ini tidak termuat, dan dalam teks Arabnya pembahasan berpindah dari ayat 35 langsung ke ayat 51.[ref:wahidi][ref:wahidiar]"]
        },
        {
          id: "kandungan",
          judul: "Kandungan ayat",
          isi: ["Tafsir Ringkas Kemenag menjelaskan bahwa pernikahan ini terasa berat bagi Nabi ﷺ karena menyangkut persoalan yang sangat sensitif di tengah masyarakat, lalu Allah menguatkan hati beliau dan menegaskan bahwa ketetapan-Nya pasti terlaksana.[ref:kemenag]", "Rumaysho mencatat bahwa Nabi ﷺ menikahi Zainab setelah masa iddahnya selesai, pada bulan Dzulqa'dah 5 H, mengikuti pendapat Al-Waqidi dan Ibnu Katsir.[ref:rumaysho]"]
        }
      ],
      lihatJuga: [
        {
          label: "Zaid bin Haritsah",
          tokoh: "zaid"
        },
        {
          label: "Zainab binti Jahsy",
          tokoh: "zainabjahsy"
        },
        {
          label: "Anas bin Malik",
          tokoh: "anas",
          ket: "perawi kisah"
        },
        {
          label: "Aisyah binti Abu Bakar",
          tokoh: "aisyah"
        },
        {
          label: "Al-Ahzab 10",
          wiki: "ahzab-10",
          ket: "surah yang sama, Perang Khandaq"
        },
        {
          label: "An-Nur 11–20",
          wiki: "nur-11-20",
          ket: "Zainab memberi kesaksian baik tentang Aisyah"
        }
      ],
      rujukan: {
        b4787: {
          t: "HR. Bukhari no. 4787, dari Tsabit dari Anas bin Malik (Kitab Tafsir, bab Al-Ahzab 37).",
          url: "https://sunnah.com/bukhari:4787"
        },
        b7420: {
          t: "HR. Bukhari no. 7420, dari Tsabit dari Anas bin Malik (Kitab At-Tauhid).",
          url: "https://sunnah.com/bukhari:7420"
        },
        b4782: {
          t: "HR. Bukhari no. 4782, dari Salim dari Abdullah bin Umar (Kitab Tafsir, bab Al-Ahzab 5).",
          url: "https://sunnah.com/bukhari:4782"
        },
        m1428b: {
          t: "HR. Muslim no. 1428b, dari Tsabit dari Anas bin Malik (Kitab Nikah).",
          url: "https://sunnah.com/muslim:1428b"
        },
        m177a: {
          t: "HR. Muslim no. 177a, dari Masruq dari Aisyah (Kitab Iman).",
          url: "https://sunnah.com/muslim:177a"
        },
        t3207: {
          t: "HR. Tirmidzi no. 3207, dari Aisyah (Kitab Tafsir, Surah Al-Ahzab). Tirmidzi: gharib; Darussalam: dha'if.",
          url: "https://sunnah.com/tirmidhi:3207"
        },
        wahidi: {
          t: "Al-Wahidi, Asbab an-Nuzul, Al-Ahzab 37 (terjemahan Inggris Mokrane Guezzou): tidak memuat sebab turun ayat ini.",
          url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=33&Ayah=37&search=yes&img=A&LanguageID=2"
        },
        wahidiar: {
          t: "Al-Wahidi, Asbab Nuzul al-Qur'an (teks Arab), hlm. 357: dari ayat 35 langsung ke ayat 51.",
          url: "https://shamela.ws/book/11314/354"
        },
        lubab: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 159 (Al-Ahzab 36–37).",
          url: "https://shamela.ws/book/2247/157"
        },
        muqbil: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 168 (Al-Ahzab 37).",
          url: "https://shamela.ws/book/11547/163"
        },
        fath523: {
          t: "Ibnu Hajar, Fath al-Bari 8/523 (Kitab Tafsir, bab \"wa tukhfi fi nafsika ma Allahu mubdihi\").",
          url: "https://shamela.ws/book/1673/4870"
        },
        fath524: {
          t: "Ibnu Hajar, Fath al-Bari 8/524 (lanjutan bab yang sama).",
          url: "https://shamela.ws/book/1673/4871"
        },
        ik: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Al-Ahzab 37.",
          url: "https://quran.com/33:37/tafsirs/ar-tafsir-ibn-kathir"
        },
        ik53: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Al-Ahzab 53 (waktu turunnya ayat hijab dan tahun pernikahan Zainab).",
          url: "https://quran.com/33:53/tafsirs/ar-tafsir-ibn-kathir"
        },
        thabari: {
          t: "Ath-Thabari, Jami' al-Bayan, tafsir Al-Ahzab 37.",
          url: "https://quran.com/33:37/tafsirs/ar-tafsir-al-tabari"
        },
        qurthubi: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Al-Ahzab 37.",
          url: "https://quran.com/33:37/tafsirs/ar-tafseer-al-qurtubi"
        },
        kemenag: {
          t: "Tafsir Ringkas Kemenag RI dan tafsir lain untuk Al-Ahzab 37 (dimuat di TafsirWeb).",
          url: "https://tafsirweb.com/7649-surat-al-ahzab-ayat-37.html"
        },
        rumaysho: {
          t: "Muhammad Abduh Tuasikal, \"Faedah Sirah Nabi: Istri Nabi, Zainab binti Jahsy\", Rumaysho.com.",
          url: "https://rumaysho.com/16864-faedah-sirah-nabi-istri-nabi-zainab-binti-jahsy.html"
        },
        almanhaj: {
          t: "Ibnul Qayyim, Zadul Ma'ad 4/265–274, \"Terapi Rasulullah dalam Penyembuhan Penyakit Al-'Isyq\", terjemahan Ustadz Ahmad Ridwan, Almanhaj (2007).",
          url: "https://almanhaj.or.id/2074-terapi-rasulullah-dalam-penyembuhan-penyakit-al-isyq-cinta.html"
        }
      }
    },

    // munafiqun-1-8 (ditulis dari riset rujukan silang)
    "munafiqun-1-8": {
      judul: "Al-Munafiqun 1–8",
      sub: "Ucapan Abdullah bin Ubay dan kejujuran Zaid bin Arqam",
      surah: "Al-Munafiqun",
      ayatNo: "1–8",
      tahun: 627,
      tontonan: null,
      peta: {
        tahun: 627,
        lok: "g-mushthaliq"
      },
      lead: ["Surah Al-Munafiqun, terutama ayat 7–8, mengabadikan ucapan Abdullah bin Ubay, pemimpin kaum munafik, dalam sebuah ekspedisi: \"Janganlah kalian berinfak kepada orang-orang yang ada di sisi Rasulullah sampai mereka bubar,\" dan \"Jika kita kembali ke Madinah, pastilah orang yang mulia akan mengusir orang yang hina dari sana.\"[ref:b4900][ref:m2772]", "Zaid bin Arqam, yang mendengarnya, melaporkan ucapan itu, tetapi Abdullah bin Ubay bersumpah tidak mengatakannya, dan Zaid sempat dianggap berdusta sampai Allah menurunkan surah ini membenarkannya.[ref:b4900][ref:b4903] Menurut para ahli maghazi, peristiwa ini terjadi dalam Ghazwah Bani al-Mushthaliq, sedangkan sebagian riwayat menyebut Ghazwah Tabuk.[ref:fath644][ref:t3314]"],
      infobox: [
        ["Surah", "Al-Munafiqun (المنافقون), surah ke-63 dalam mushaf"],
        ["Ayat", "1–8, dengan fokus ayat 7–8"],
        ["Golongan", "Madaniyah[ref:ik1]"],
        ["Waktu", "Diperselisihkan. Ghazwah Bani al-Mushthaliq (Al-Muraisi') menurut para ahli maghazi[ref:fath644]; tahunnya 6 H menurut Ibnu Ishaq dan 4 H menurut Musa bin 'Uqbah[ref:qurthubi24], sedangkan Rumaysho menyebut Sya'ban 5 H[ref:rumaysho]. Sebagian riwayat menyebut Ghazwah Tabuk[ref:t3314][ref:lubab197]"],
        ["Tempat", "Mata air Al-Muraisi' di wilayah Bani al-Mushthaliq, menurut para mufassir dan ahli sirah yang dikutip Al-Wahidi[ref:wahidi]; sebagian riwayat menyebut surah ini turun ketika rombongan masih dalam perjalanan[ref:fath645][ref:t3313]"],
        ["Tokoh", "Abdullah bin Ubay bin Salul; Zaid bin Arqam; paman Zaid, yang menurut Ath-Thabarani dan Ibnu Mardawaih adalah Sa'ad bin Ubadah[ref:fath645]; Umar bin Khattab[ref:b4905]"],
        ["Riwayat utama", "HR. Bukhari no. 4900–4904 dan Muslim no. 2772 (Zaid bin Arqam); HR. Bukhari no. 4905 dan Tirmidzi no. 3315 (Jabir bin Abdullah)"],
        ["Riwayat pembanding", "HR. Tirmidzi no. 3313 (Abu Sa'd Al-Azdi dari Zaid: perselisihan di mata air) dan no. 3314 (Muhammad bin Ka'b dari Zaid: \"dalam Ghazwah Tabuk\")[ref:t3313][ref:t3314]"],
        ["Derajat", "Shahih (Bukhari, Muslim). At-Tirmidzi menilai no. 3312–3315 hasan shahih; Darussalam: shahih, kecuali no. 3315 hasan[ref:t3312][ref:t3313][ref:t3314][ref:t3315]; dimuat Muqbil dalam Ash-Shahih al-Musnad min Asbab an-Nuzul[ref:muqbil]"]
      ],
      ayat: [
        {
          no: 1,
          ar: "إِذَا جَاءَكَ الْمُنَافِقُونَ قَالُوا نَشْهَدُ إِنَّكَ لَرَسُولُ اللَّهِ ۗ وَاللَّهُ يَعْلَمُ إِنَّكَ لَرَسُولُهُ وَاللَّهُ يَشْهَدُ إِنَّ الْمُنَافِقِينَ لَكَاذِبُونَ",
          id: "Apabila orang-orang munafik datang kepadamu (Muhammad), mereka berkata, \"Kami mengakui, bahwa engkau adalah Rasul Allah.\" Dan Allah mengetahui bahwa engkau benar-benar Rasul-Nya; dan Allah menyaksikan bahwa orang-orang munafik itu benar-benar pendusta."
        },
        {
          no: 2,
          ar: "اتَّخَذُوا أَيْمَانَهُمْ جُنَّةً فَصَدُّوا عَن سَبِيلِ اللَّهِ ۚ إِنَّهُمْ سَاءَ مَا كَانُوا يَعْمَلُونَ",
          id: "Mereka menjadikan sumpah-sumpah mereka sebagai perisai, lalu mereka menghalang-halangi (manusia) dari jalan Allah. Sungguh, betapa buruknya apa yang telah mereka kerjakan."
        },
        {
          no: 3,
          ar: "ذَٰلِكَ بِأَنَّهُمْ آمَنُوا ثُمَّ كَفَرُوا فَطُبِعَ عَلَىٰ قُلُوبِهِمْ فَهُمْ لَا يَفْقَهُونَ",
          id: "Yang demikian itu karena sesungguhnya mereka telah beriman, kemudian menjadi kafir, maka hati mereka dikunci, sehingga mereka tidak dapat mengerti."
        },
        {
          no: 4,
          ar: "وَإِذَا رَأَيْتَهُمْ تُعْجِبُكَ أَجْسَامُهُمْ ۖ وَإِن يَقُولُوا تَسْمَعْ لِقَوْلِهِمْ ۖ كَأَنَّهُمْ خُشُبٌ مُّسَنَّدَةٌ ۖ يَحْسَبُونَ كُلَّ صَيْحَةٍ عَلَيْهِمْ ۚ هُمُ الْعَدُوُّ فَاحْذَرْهُمْ ۚ قَاتَلَهُمُ اللَّهُ ۖ أَنَّىٰ يُؤْفَكُونَ",
          id: "Dan apabila engkau melihat mereka, tubuh mereka mengagumkanmu. Dan jika mereka berkata, engkau mendengarkan tutur katanya. Mereka seakan-akan kayu yang tersandar. Mereka mengira bahwa setiap teriakan ditujukan kepada mereka. Mereka itulah musuh (yang sebenarnya), maka waspadalah terhadap mereka; semoga Allah membinasakan mereka. Bagaimanakah mereka dapat dipalingkan (dari kebenaran)?"
        },
        {
          no: 5,
          ar: "وَإِذَا قِيلَ لَهُمْ تَعَالَوْا يَسْتَغْفِرْ لَكُمْ رَسُولُ اللَّهِ لَوَّوْا رُءُوسَهُمْ وَرَأَيْتَهُمْ يَصُدُّونَ وَهُم مُّسْتَكْبِرُونَ",
          id: "Dan apabila dikatakan kepada mereka, \"Marilah (beriman), agar Rasulullah memohonkan ampunan bagimu,\" mereka membuang muka dan engkau lihat mereka berpaling dengan menyombongkan diri."
        },
        {
          no: 6,
          ar: "سَوَاءٌ عَلَيْهِمْ أَسْتَغْفَرْتَ لَهُمْ أَمْ لَمْ تَسْتَغْفِرْ لَهُمْ لَن يَغْفِرَ اللَّهُ لَهُمْ ۚ إِنَّ اللَّهَ لَا يَهْدِي الْقَوْمَ الْفَاسِقِينَ",
          id: "Sama saja bagi mereka, engkau (Muhammad) mohonkan ampunan untuk mereka atau tidak engkau mohonkan ampunan bagi mereka, Allah tidak akan mengampuni mereka; sesungguhnya Allah tidak akan memberi petunjuk kepada orang-orang yang fasik."
        },
        {
          no: 7,
          ar: "هُمُ الَّذِينَ يَقُولُونَ لَا تُنفِقُوا عَلَىٰ مَنْ عِندَ رَسُولِ اللَّهِ حَتَّىٰ يَنفَضُّوا ۗ وَلِلَّهِ خَزَائِنُ السَّمَاوَاتِ وَالْأَرْضِ وَلَٰكِنَّ الْمُنَافِقِينَ لَا يَفْقَهُونَ",
          id: "Mereka yang berkata (kepada orang-orang Ansar), \"Janganlah kamu bersedekah kepada orang-orang (Muhajirin) yang ada di sisi Rasulullah sampai mereka bubar (meninggalkan Rasulullah).\" Padahal milik Allah-lah perbendaharaan langit dan bumi, tetapi orang-orang munafik itu tidak memahami."
        },
        {
          no: 8,
          ar: "يَقُولُونَ لَئِن رَّجَعْنَا إِلَى الْمَدِينَةِ لَيُخْرِجَنَّ الْأَعَزُّ مِنْهَا الْأَذَلَّ ۚ وَلِلَّهِ الْعِزَّةُ وَلِرَسُولِهِ وَلِلْمُؤْمِنِينَ وَلَٰكِنَّ الْمُنَافِقِينَ لَا يَعْلَمُونَ",
          id: "Mereka berkata, \"Sungguh, jika kita kembali ke Madinah (kembali dari perang Bani Mustalik), pastilah orang yang kuat akan mengusir orang-orang yang lemah dari sana.\" Padahal kekuatan itu hanyalah bagi Allah, Rasul-Nya dan bagi orang-orang mukmin, tetapi orang-orang munafik itu tidak mengetahui."
        }
      ],
      bagian: [
        {
          id: "ucapan",
          judul: "Ucapan Abdullah bin Ubay",
          isi: ["Zaid bin Arqam menuturkan: ia sedang ikut dalam sebuah ghazwah ketika mendengar Abdullah bin Ubay berkata, \"Janganlah kalian berinfak kepada orang-orang yang ada di sisi Rasulullah sampai mereka bubar dari sekitarnya,\" dan \"Jika kita kembali ke Madinah, pastilah orang yang mulia akan mengusir orang yang hina dari sana.\"[ref:b4900]", "Dalam riwayat Muslim, perjalanan itu disebut sebagai perjalanan yang membuat orang-orang mengalami kesulitan.[ref:m2772] Dalam riwayat At-Tirmidzi lewat Abu Sa'd Al-Azdi, pemicunya adalah perebutan air: seorang Arab badui memukul kepala seorang Anshar, lalu orang itu mengadu kepada Abdullah bin Ubay, yang marah dan mengucapkan kata-kata tersebut.[ref:t3313]"]
        },
        {
          id: "jabir",
          judul: "Seruan jahiliyah di mata air",
          isi: ["Jabir bin Abdullah meriwayatkan: dalam sebuah ghazwah, seorang Muhajirin menendang seorang Anshar.[ref:b4905][ref:t3315] Orang Anshar itu berseru, \"Wahai kaum Anshar!\" dan orang Muhajirin itu berseru, \"Wahai kaum Muhajirin!\"[ref:b4905][ref:t3315] Rasulullah ﷺ mendengarnya dan bersabda, \"Mengapa ada seruan jahiliyah? Tinggalkanlah, karena seruan itu busuk.\"[ref:b4905][ref:t3315]", "Abdullah bin Ubay mendengar kejadian itu dan berkata bahwa jika mereka kembali ke Madinah, pastilah orang yang mulia akan mengusir orang yang hina dari sana.[ref:b4905] Jabir menambahkan bahwa ketika kaum Muhajirin baru tiba di Madinah, jumlah kaum Anshar lebih banyak, kemudian jumlah Muhajirin bertambah.[ref:b4905]", "Ibnu Hajar menyebut nama kedua orang itu: Jahjah bin Qais, atau bin Sa'id, Al-Ghifari, yang menuntun kuda Umar bin Khattab, dan Sinan bin Wabarah Al-Juhani, sekutu kaum Anshar.[ref:fath649] Al-Wahidi membawakan kisah ini dari para mufassir dan ahli sirah dengan menyebut mata air Al-Muraisi'.[ref:wahidi]"]
        },
        {
          id: "umar",
          judul: "Umar dan kebijaksanaan Nabi ﷺ",
          isi: ["Ketika ucapan itu sampai kepada Nabi ﷺ, Umar meminta izin untuk memenggal leher orang munafik itu.[ref:b4905][ref:t3315] Beliau menjawab, \"Biarkan dia, agar orang-orang tidak berkata bahwa Muhammad membunuh sahabat-sahabatnya.\"[ref:b4905][ref:t3315]", "Ibnu Katsir menukil kisah Ibnu Ishaq bahwa Nabi ﷺ lalu memerintahkan rombongan segera berangkat, sehingga orang-orang sibuk dengan perjalanan dan melupakan peristiwa itu.[ref:iken]"]
        },
        {
          id: "zaid",
          judul: "Zaid dianggap berdusta",
          isi: ["Zaid menyampaikan ucapan itu kepada pamannya, atau kepada Umar, lalu kabar itu sampai kepada Nabi ﷺ.[ref:b4900] Beliau memanggil Zaid dan mendengar penuturannya, lalu memanggil Abdullah bin Ubay dan kawan-kawannya, yang bersumpah tidak mengatakannya.[ref:b4900] Rasulullah ﷺ menerima sumpah mereka dan tidak membenarkan Zaid.[ref:b4900]", "Zaid sangat sedih dan memilih tinggal di rumah.[ref:b4900] Pamannya berkata, \"Engkau hanya ingin Rasulullah ﷺ tidak memercayaimu dan membencimu.\"[ref:b4900] Dalam riwayat Muslim, orang-orang berkata bahwa Zaid telah berdusta kepada Rasulullah ﷺ.[ref:m2772]", "Ibnu Hajar mencatat bahwa sebagian besar riwayat menyebut \"pamanku\".[ref:fath645] Menurut Ath-Thabarani dan Ibnu Mardawaih, yang dimaksud adalah Sa'ad bin Ubadah, pemimpin Khazraj, bukan paman kandung Zaid.[ref:fath645] Ia juga mengambil pelajaran bahwa menyampaikan ucapan seseorang demi kemaslahatan yang lebih besar bukanlah namimah yang tercela.[ref:fath646]"]
        },
        {
          id: "turun",
          judul: "Turunnya surah",
          isi: ["Lalu Allah menurunkan \"Apabila orang-orang munafik datang kepadamu...\".[ref:b4900] Nabi ﷺ memanggil Zaid, membacakan ayat-ayat itu kepadanya, dan bersabda, \"Wahai Zaid, sesungguhnya Allah telah membenarkanmu.\"[ref:b4900] As-Suyuthi membawakan hadits Zaid ini untuk surah tersebut, didahului riwayat Qatadah bahwa Abdullah bin Ubay memalingkan kepalanya ketika diajak menemui Nabi ﷺ agar dimohonkan ampun (ayat 5).[ref:lubab]", "Dalam riwayat At-Tirmidzi lewat Abu Sa'd Al-Azdi, ketika Zaid berjalan bersama Rasulullah ﷺ dalam perjalanan, beliau menghampirinya dan menggosok telinganya; Abu Bakar dan Umar lalu menyampaikan kabar gembira kepadanya, dan keesokan paginya Rasulullah ﷺ membacakan Surah Al-Munafiqun.[ref:t3313] Ibnu Hajar menukil riwayat mursal Al-Hasan bahwa Nabi ﷺ memegang telinga Zaid dan berkata, \"Telingamu telah jujur, wahai anak muda.\"[ref:fath646]", "Dalam riwayat Muslim dan Al-Bukhari, ketika Nabi ﷺ memanggil mereka agar beliau memohonkan ampun bagi mereka, mereka memalingkan kepala.[ref:m2772][ref:b4903] Zaid menyebut mereka, yang diumpamakan \"kayu yang tersandar\" dalam ayat 4, sebagai orang-orang yang berpenampilan sangat bagus.[ref:m2772][ref:b4903]"]
        },
        {
          id: "ekspedisi",
          judul: "Bani al-Mushthaliq atau Tabuk?",
          isi: ["Hadits Zaid dalam riwayat utama Al-Bukhari hanya menyebut \"dalam sebuah ghazwah\".[ref:b4900] Dalam riwayat At-Tirmidzi dari Muhammad bin Ka'b Al-Qurazhi, Zaid menyebutnya \"dalam Ghazwah Tabuk\".[ref:t3314] As-Suyuthi mencatat bahwa hadits Zaid memiliki banyak jalur, dan sebagiannya menyebut peristiwa itu terjadi dalam Ghazwah Tabuk serta surah ini turun pada malam hari.[ref:lubab197]", "Ibnu Hajar memaparkan kedua pendapat.[ref:fath644] Pendapat Tabuk didukung riwayat Muhammad bin Ka'b pada An-Nasa'i, lafal Zuhair tentang \"perjalanan yang sulit\", dan riwayat mursal Sa'id bin Jubair pada 'Abd bin Humaid dengan sanad shahih.[ref:fath644] Adapun para ahli maghazi berpendapat bahwa itu Ghazwah Bani al-Mushthaliq, didukung hadits Jabir serta riwayat Ibnu 'Aidz dan Al-Hakim dalam Al-Iklil dari jalur Abul Aswad dari 'Urwah.[ref:fath644]", "Untuk hadits Jabir, Sufyan bin 'Uyainah berkata, \"Mereka berpendapat bahwa itu adalah Ghazwah Bani al-Mushthaliq.\"[ref:t3315] Ibnu Hajar menukil bahwa Ibnu Ishaq juga menamainya Ghazwah Bani al-Mushthaliq, dan Ibnu Abi Hatim meriwayatkan dari jalur Az-Zuhri dan 'Urwah bahwa itu Ghazwah Al-Muraisi'.[ref:fath649] Ibnu Katsir juga membawakan riwayat Ibnu Abi Hatim yang menempatkan peristiwa ini pada Ghazwah Al-Muraisi'.[ref:ik7]", "Terjemahan Kemenag untuk ayat 8 memberi keterangan \"(kembali dari perang Bani Mustalik)\".[ref:kemenag] Di sini peristiwa ini ditempatkan pada Ghazwah Bani al-Mushthaliq, mengikuti pendapat para ahli maghazi; tahun ±627 M di peta hanya perkiraan, karena tahun ghazwah itu sendiri diperselisihkan.[ref:fath644][ref:qurthubi24]"]
        },
        {
          id: "putra",
          judul: "Abdullah, putra Abdullah bin Ubay",
          isi: ["Dalam riwayat At-Tirmidzi dari jalur Jabir, putra Abdullah bin Ubay, yang juga bernama Abdullah, berkata kepada ayahnya bahwa ia tidak akan dibiarkan pulang sampai mengakui bahwa dialah yang hina dan Rasulullah ﷺ yang mulia, lalu ayahnya mengucapkannya.[ref:t3315] At-Tirmidzi mencatat bahwa tambahan ini datang dari perawi selain 'Amr bin Dinar.[ref:t3315]", "Al-Qurthubi juga menyebut bahwa ia tidak membiarkan ayahnya masuk Madinah sampai mengakui hal itu.[ref:qurthubi8] Al-Wahidi menuturkan dari para ahli sirah bahwa Abdullah bahkan menawarkan diri untuk membunuh ayahnya, tetapi Nabi ﷺ memilih untuk tetap memperlakukan ayahnya dengan baik.[ref:wahidi]"]
        },
        {
          id: "kandungan",
          judul: "Kandungan ayat 7–8",
          isi: ["Ath-Thabari menjelaskan bahwa ayat 7 menceritakan ucapan kaum munafik kepada kawan-kawan mereka agar berhenti membantu Rasulullah ﷺ dan para sahabatnya supaya mereka bubar, padahal perbendaharaan langit dan bumi adalah milik Allah, dan tidak seorang pun dapat memberi kecuali dengan kehendak-Nya.[ref:thabari]", "Al-Qurthubi menjelaskan bahwa kaum munafik mengira kemuliaan ada pada harta dan banyaknya pengikut, lalu Allah menegaskan bahwa kemuliaan itu milik-Nya, Rasul-Nya, dan orang-orang beriman.[ref:qurthubi8] Tafsir Ringkas Kemenag juga menegaskan bahwa kekuatan sejati ada pada Allah, Rasul-Nya, dan kaum mukmin.[ref:kemenag]", "Rumaysho menguraikan peristiwa ini dalam rangkaian Ghazwah Bani al-Mushthaliq, dengan mengutip Ibnu Ishaq dan Tafsir As-Sa'di.[ref:rumaysho]"]
        }
      ],
      lihatJuga: [
        {
          label: "Abdullah bin Ubay bin Salul",
          tokoh: "abdullahubay"
        },
        {
          label: "Zaid bin Arqam",
          tokoh: "zaidarqam"
        },
        {
          label: "Umar bin Khattab",
          tokoh: "umar"
        },
        {
          label: "Sa'ad bin Ubadah",
          tokoh: "saadubadah",
          ket: "\"paman\" Zaid menurut riwayat Ath-Thabarani"
        },
        {
          label: "An-Nur 11–20",
          wiki: "nur-11-20",
          ket: "haditsul ifki, sepulang ghazwah yang sama"
        },
        {
          label: "At-Taubah 118",
          wiki: "taubah-118",
          ket: "Ghazwah Tabuk, pendapat lain"
        }
      ],
      rujukan: {
        b4900: {
          t: "HR. Bukhari no. 4900, dari Abu Ishaq dari Zaid bin Arqam (Kitab Tafsir, bab Al-Munafiqun 1).",
          url: "https://sunnah.com/bukhari:4900"
        },
        b4903: {
          t: "HR. Bukhari no. 4903, dari Zaid bin Arqam (Kitab Tafsir, Surah Al-Munafiqun).",
          url: "https://sunnah.com/bukhari:4903"
        },
        b4905: {
          t: "HR. Bukhari no. 4905, dari 'Amr bin Dinar dari Jabir bin Abdullah (Kitab Tafsir, bab Al-Munafiqun 6).",
          url: "https://sunnah.com/bukhari:4905"
        },
        m2772: {
          t: "HR. Muslim no. 2772, dari Abu Ishaq dari Zaid bin Arqam (Kitab Sifat Kaum Munafik).",
          url: "https://sunnah.com/muslim:2772"
        },
        t3312: {
          t: "HR. Tirmidzi no. 3312, dari Abu Ishaq dari Zaid bin Arqam (Kitab Tafsir, Surah Al-Munafiqun). Tirmidzi: hasan shahih; Darussalam: shahih.",
          url: "https://sunnah.com/tirmidhi:3312"
        },
        t3313: {
          t: "HR. Tirmidzi no. 3313, dari As-Suddi dari Abu Sa'd Al-Azdi dari Zaid bin Arqam (Kitab Tafsir, Surah Al-Munafiqun). Tirmidzi: hasan shahih; Darussalam: shahih.",
          url: "https://sunnah.com/tirmidhi:3313"
        },
        t3314: {
          t: "HR. Tirmidzi no. 3314, dari Al-Hakam dari Muhammad bin Ka'b Al-Qurazhi dari Zaid bin Arqam: \"dalam Ghazwah Tabuk\" (Kitab Tafsir, Surah Al-Munafiqun). Tirmidzi: hasan shahih; Darussalam: shahih.",
          url: "https://sunnah.com/tirmidhi:3314"
        },
        t3315: {
          t: "HR. Tirmidzi no. 3315, dari 'Amr bin Dinar dari Jabir bin Abdullah (Kitab Tafsir, Surah Al-Munafiqun). Tirmidzi: hasan shahih; Darussalam: hasan.",
          url: "https://sunnah.com/tirmidhi:3315"
        },
        wahidi: {
          t: "Al-Wahidi, Asbab an-Nuzul, Al-Munafiqun 7 (terjemahan Inggris Mokrane Guezzou).",
          url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=63&Ayah=7&search=yes&img=A&LanguageID=2"
        },
        lubab: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 196 (Surah Al-Munafiqun).",
          url: "https://shamela.ws/book/2247/194"
        },
        lubab197: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 197 (lanjutan hadits Zaid bin Arqam dan catatan jalur-jalurnya).",
          url: "https://shamela.ws/book/2247/195"
        },
        muqbil: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 214 (Surah Al-Munafiqun).",
          url: "https://shamela.ws/book/11547/209"
        },
        fath644: {
          t: "Ibnu Hajar, Fath al-Bari 8/644 (Kitab Tafsir, Surah Al-Munafiqun, bab ayat 1).",
          url: "https://shamela.ws/book/1673/4991"
        },
        fath645: {
          t: "Ibnu Hajar, Fath al-Bari 8/645 (lanjutan bab yang sama).",
          url: "https://shamela.ws/book/1673/4992"
        },
        fath646: {
          t: "Ibnu Hajar, Fath al-Bari 8/646 (Surah Al-Munafiqun, bab ayat 2).",
          url: "https://shamela.ws/book/1673/4993"
        },
        fath649: {
          t: "Ibnu Hajar, Fath al-Bari 8/649 (Surah Al-Munafiqun, bab ayat 6: hadits Jabir).",
          url: "https://shamela.ws/book/1673/4996"
        },
        ik1: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Al-Munafiqun 1.",
          url: "https://quran.com/63:1/tafsirs/ar-tafsir-ibn-kathir"
        },
        ik7: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Al-Munafiqun 5–8.",
          url: "https://quran.com/63:7/tafsirs/ar-tafsir-ibn-kathir"
        },
        iken: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim (ringkasan Inggris), tafsir Al-Munafiqun 5–8.",
          url: "https://quran.com/63:5/tafsirs/en-tafisr-ibn-kathir"
        },
        thabari: {
          t: "Ath-Thabari, Jami' al-Bayan, tafsir Al-Munafiqun 7.",
          url: "https://quran.com/63:7/tafsirs/ar-tafsir-al-tabari"
        },
        qurthubi8: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Al-Munafiqun 8.",
          url: "https://quran.com/63:8/tafsirs/ar-tafseer-al-qurtubi"
        },
        qurthubi24: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir An-Nur 11 (tahun Ghazwah Bani al-Mushthaliq menurut Ibnu Ishaq dan Musa bin 'Uqbah).",
          url: "https://quran.com/24:11/tafsirs/ar-tafseer-al-qurtubi"
        },
        kemenag: {
          t: "Terjemah dan Tafsir Ringkas Kemenag RI serta tafsir lain untuk Al-Munafiqun 8 (dimuat di TafsirWeb).",
          url: "https://tafsirweb.com/10930-surat-al-munafiqun-ayat-8.html"
        },
        rumaysho: {
          t: "Muhammad Abduh Tuasikal, \"Faedah Sirah Nabi: Perang Bani Musthaliq (Muraisi')...\", Rumaysho.com (2023).",
          url: "https://rumaysho.com/37191-faedah-sirah-nabi-perang-bani-musthaliq-muraisi-rasulullah-menikah-dengan-juwairiyyah-kisah-haditsul-ifki-aisyah-difitnah-selingkuh.html"
        }
      }
    },

    // baqarah-196 (ditulis dari riset rujukan silang)
    "baqarah-196": {
      judul: "Al-Baqarah 196",
      sub: "Fidyah untuk Ka'ab bin 'Ujrah di Hudaibiyah",
      surah: "Al-Baqarah",
      ayatNo: "196",
      tahun: 628,
      tontonan: null,
      peta: {
        tahun: 628,
        lok: "makkah"
      },
      lead: ["Al-Baqarah ayat 196 memuat ketentuan haji dan umrah.[ref:kemenag] Bagian \"Jika ada di antara kamu yang sakit atau ada gangguan di kepalanya (lalu dia bercukur), maka dia wajib berfidyah\" turun berkenaan dengan Ka'ab bin 'Ujrah.[ref:kemenag][ref:b4517]", "Ka'ab menuturkan bahwa di Hudaibiyah, ketika sedang berihram, kutu kepalanya berjatuhan ke wajahnya.[ref:b4190][ref:b4191] Nabi ﷺ menyuruhnya bercukur dan memberinya pilihan: berpuasa tiga hari, memberi makan enam orang miskin, atau menyembelih seekor kambing.[ref:b4190][ref:b4191] Ka'ab berkata bahwa ayat itu turun khusus tentang dirinya, tetapi berlaku umum untuk semua.[ref:b4517]"],
      infobox: [
        ["Surah", "Al-Baqarah (البقرة), surah ke-2 dalam mushaf"],
        ["Ayat", "196, bagian fidyah: \"fa man kana minkum maridhan au bihi adzan min ra'sihi fa fidyatun min shiyamin au shadaqatin au nusuk\""],
        ["Golongan", "Madaniyah"],
        ["Waktu", "Dzulqa'dah 6 H (±628 M), saat umrah Hudaibiyah[ref:b1778][ref:iken]"],
        ["Tempat", "Hudaibiyah, ketika kaum muslimin berihram dan dihalangi kaum musyrikin menuju Ka'bah[ref:b4191]"],
        ["Tokoh", "Ka'ab bin 'Ujrah[ref:b4517]"],
        ["Riwayat utama", "HR. Bukhari no. 4517 (Abdullah bin Ma'qil dari Ka'ab); HR. Bukhari no. 4159, 4190, dan 4191 (Abdurrahman bin Abi Laila dari Ka'ab); HR. Muslim no. 1201; HR. Tirmidzi no. 2973"],
        ["Riwayat pembanding", "Riwayat Ibnu Abbas lewat 'Atha' (Al-Wahidi)[ref:wahidi][ref:lubab28]; untuk awal ayat 196, riwayat Ya'la bin Umayyah tentang orang yang berihram umrah dengan pakaian berwangi[ref:muqbil29]"],
        ["Derajat", "Shahih (Bukhari, Muslim); At-Tirmidzi: hasan shahih[ref:t2973]; dimuat Muqbil dalam Ash-Shahih al-Musnad min Asbab an-Nuzul[ref:muqbil]"]
      ],
      ayat: [
        {
          no: 196,
          ar: "وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ ۚ فَإِنْ أُحْصِرْتُمْ فَمَا اسْتَيْسَرَ مِنَ الْهَدْيِ ۖ وَلَا تَحْلِقُوا رُءُوسَكُمْ حَتَّىٰ يَبْلُغَ الْهَدْيُ مَحِلَّهُ ۚ فَمَن كَانَ مِنكُم مَّرِيضًا أَوْ بِهِ أَذًى مِّن رَّأْسِهِ فَفِدْيَةٌ مِّن صِيَامٍ أَوْ صَدَقَةٍ أَوْ نُسُكٍ ۚ فَإِذَا أَمِنتُمْ فَمَن تَمَتَّعَ بِالْعُمْرَةِ إِلَى الْحَجِّ فَمَا اسْتَيْسَرَ مِنَ الْهَدْيِ ۚ فَمَن لَّمْ يَجِدْ فَصِيَامُ ثَلَاثَةِ أَيَّامٍ فِي الْحَجِّ وَسَبْعَةٍ إِذَا رَجَعْتُمْ ۗ تِلْكَ عَشَرَةٌ كَامِلَةٌ ۗ ذَٰلِكَ لِمَن لَّمْ يَكُنْ أَهْلُهُ حَاضِرِي الْمَسْجِدِ الْحَرَامِ ۚ وَاتَّقُوا اللَّهَ وَاعْلَمُوا أَنَّ اللَّهَ شَدِيدُ الْعِقَابِ",
          id: "Dan sempurnakanlah ibadah haji dan umrah karena Allah. Tetapi jika kamu terkepung (oleh musuh), maka (sembelihlah) hadyu yang mudah didapat, dan jangan kamu mencukur kepalamu, sebelum hadyu sampai di tempat penyembelihannya. Jika ada di antara kamu yang sakit atau ada gangguan di kepalanya (lalu dia bercukur), maka dia wajib berfidyah, yaitu berpuasa, bersedekah atau berkurban. Apabila kamu dalam keadaan aman, maka barang siapa mengerjakan umrah sebelum haji, dia (wajib menyembelih) hadyu yang mudah didapat. Tetapi jika dia tidak mendapatkannya, maka dia (wajib) berpuasa tiga hari dalam (musim) haji dan tujuh (hari) setelah kamu kembali. Itulah sepuluh (hari) yang lengkap. Demikian itu, bagi orang yang keluarganya tidak ada (tinggal) di sekitar Masjidilharam. Bertakwalah kepada Allah dan ketahuilah bahwa Allah sangat keras hukuman-Nya."
        }
      ],
      bagian: [
        {
          id: "hudaibiyah",
          judul: "Berihram di Hudaibiyah",
          isi: ["Ka'ab bin 'Ujrah menuturkan: mereka bersama Nabi ﷺ di Hudaibiyah dalam keadaan berihram, sementara kaum musyrikin menghalangi mereka menuju Ka'bah.[ref:b4191] Rambut Ka'ab lebat, dan kutu kepalanya berjatuhan ke wajahnya.[ref:b4191]", "Dalam riwayat Muslim, Nabi ﷺ mendatanginya ketika ia sedang menyalakan api di bawah periuk.[ref:m1201] Riwayat Al-Bukhari lewat Mujahid menyebut bahwa saat itu belum dijelaskan kepada mereka bahwa mereka akan bertahalul di Hudaibiyah, dan mereka masih berharap dapat memasuki Mekah.[ref:b4159]"]
        },
        {
          id: "pertanyaan",
          judul: "\"Apakah kutu kepalamu mengganggumu?\"",
          isi: ["Nabi ﷺ bertanya, \"Apakah kutu-kutu kepalamu mengganggumu?\"[ref:b4190][ref:b4191] Ka'ab menjawab, \"Ya.\"[ref:b4190][ref:b4191]", "Dalam riwayat Abdullah bin Ma'qil, Ka'ab dibawa kepada Nabi ﷺ, dan beliau bersabda, \"Aku tidak mengira penderitaanmu sampai seberat ini. Apakah engkau mampu menyediakan seekor kambing?\"[ref:b4517] Ka'ab menjawab tidak.[ref:b4517]"]
        },
        {
          id: "fidyah",
          judul: "Tiga pilihan fidyah",
          isi: ["Nabi ﷺ menyuruhnya mencukur kepala, lalu berpuasa tiga hari, atau memberi makan enam orang miskin, atau menyembelih seekor kambing.[ref:b4190][ref:m1201] Ayyub, salah seorang perawi, berkata bahwa ia tidak tahu pilihan mana yang disebut pertama.[ref:b4190][ref:m1201]", "Dalam riwayat Abdullah bin Ma'qil, setiap orang miskin mendapat setengah sha' makanan.[ref:b4517] Riwayat Mujahid lewat Ibnu Abi Najih menyebut takarannya satu faraq untuk enam orang miskin.[ref:b4159] Hidayatul Insan, yang dimuat TafsirWeb, menjelaskan bahwa satu faraq sama dengan tiga sha'.[ref:kemenag]"]
        },
        {
          id: "turun",
          judul: "\"Khusus untukku, umum untuk kalian\"",
          isi: ["Abdullah bin Ma'qil menuturkan bahwa ia duduk bersama Ka'ab di masjid Kufah dan bertanya tentang fidyah.[ref:b4517] Ka'ab menjawab bahwa ayat itu turun khusus tentang dirinya, tetapi berlaku umum untuk mereka semua.[ref:b4517]", "Riwayat Al-Bukhari lewat Abdurrahman bin Abi Laila menyebut bahwa ayat fidyah turun setelah Nabi ﷺ bertanya kepadanya.[ref:b4191][ref:b4159] Ibnu Hajar mencatat bahwa Al-Bukhari membawakan hadits Ka'ab di bab tafsir ini sebagai sebab turunnya ayat, dan rinciannya telah ia uraikan di Kitab al-Hajj.[ref:fath186]", "As-Suyuthi juga membawakan riwayat Ahmad dari Ka'ab bahwa mereka berihram di Hudaibiyah ketika dikepung kaum musyrikin, dan riwayat Al-Wahidi lewat 'Atha' dari Ibnu Abbas bahwa Allah menurunkan ayat ini \"di tempat itu\".[ref:lubab][ref:lubab28] Al-Wahidi menghimpun tujuh riwayat tentang Ka'ab untuk ayat ini, dengan beberapa perbedaan rincian tentang hewan sembelihan dan takaran makanan.[ref:wahidi]"]
        },
        {
          id: "hukum",
          judul: "Pilihan, bukan urutan",
          isi: ["Ibnu Katsir menegaskan bahwa ketiga bentuk fidyah itu adalah pilihan (takhyir), dan menyebutnya sebagai pendapat empat imam dan mayoritas ulama.[ref:ik] Menurutnya, ayat menyebut mulai dari yang paling ringan, sedangkan perintah Nabi ﷺ kepada Ka'ab mendahulukan yang paling utama.[ref:ik]", "Ibnu Katsir dan Al-Qurthubi menukil riwayat dari sebagian ulama, seperti Al-Hasan dan 'Ikrimah, tentang puasa sepuluh hari atau memberi makan sepuluh orang miskin.[ref:ik][ref:qurthubi] Ibnu Katsir menilainya gharib karena menyelisihi hadits Ka'ab, dan Al-Qurthubi mencatat bahwa para fuqaha dan ahli hadits tidak memakainya.[ref:ik][ref:qurthubi]", "Tentang tempatnya, Al-Qurthubi menukil pendapat 'Atha' bahwa sembelihan dilakukan di Mekah, sedangkan makanan dan puasa boleh di mana saja; Imam Malik membolehkan ketiganya di mana saja.[ref:qurthubi]"]
        },
        {
          id: "kandungan",
          judul: "Kandungan ayat",
          isi: ["Tafsir Ringkas Kemenag menjelaskan bahwa orang yang sakit atau terganggu kepalanya lalu bercukur sebelum waktunya wajib membayar fidyah, dengan memilih berpuasa, bersedekah, atau menyembelih hewan sesuai kemampuannya.[ref:kemenag]", "NU Online menyebut contoh gangguan di kepala itu antara lain kutu, dengan tiga pilihan fidyah: berpuasa tiga hari, bersedekah makanan untuk enam orang miskin, atau menyembelih seekor kambing.[ref:nuonline] Almanhaj juga memuat kisah Ka'ab ini dalam bahasan larangan mencukur rambut ketika ihram.[ref:almanhaj]"]
        }
      ],
      lihatJuga: [
        {
          label: "Ka'ab bin 'Ujrah",
          tokoh: "kaabujrah"
        },
        {
          label: "Al-Fath 1",
          wiki: "fath-1",
          ket: "Hudaibiyah, perjalanan yang sama"
        },
        {
          label: "Al-Baqarah 144",
          wiki: "baqarah-144",
          ket: "surah yang sama"
        }
      ],
      rujukan: {
        b4517: {
          t: "HR. Bukhari no. 4517, dari Abdullah bin Ma'qil dari Ka'ab bin 'Ujrah (Kitab Tafsir, bab Al-Baqarah 196).",
          url: "https://sunnah.com/bukhari:4517"
        },
        b4190: {
          t: "HR. Bukhari no. 4190, dari Mujahid dari Abdurrahman bin Abi Laila dari Ka'ab bin 'Ujrah (Kitab Al-Maghazi, bab Ghazwah Al-Hudaibiyah).",
          url: "https://sunnah.com/bukhari:4190"
        },
        b4191: {
          t: "HR. Bukhari no. 4191, dari Mujahid dari Abdurrahman bin Abi Laila dari Ka'ab bin 'Ujrah (Kitab Al-Maghazi, bab Ghazwah Al-Hudaibiyah).",
          url: "https://sunnah.com/bukhari:4191"
        },
        b4159: {
          t: "HR. Bukhari no. 4159, dari Ibnu Abi Najih dari Mujahid dari Abdurrahman bin Abi Laila dari Ka'ab bin 'Ujrah (Kitab Al-Maghazi, bab Ghazwah Al-Hudaibiyah).",
          url: "https://sunnah.com/bukhari:4159"
        },
        b1778: {
          t: "HR. Bukhari no. 1778, dari Qatadah dari Anas bin Malik: umrah Hudaibiyah pada bulan Dzulqa'dah (Kitab Umrah).",
          url: "https://sunnah.com/bukhari:1778"
        },
        m1201: {
          t: "HR. Muslim no. 1201a, dari Mujahid dari Abdurrahman bin Abi Laila dari Ka'ab bin 'Ujrah (Kitab Haji, bab bolehnya orang yang berihram mencukur rambut karena gangguan).",
          url: "https://sunnah.com/muslim:1201a"
        },
        t2973: {
          t: "HR. Tirmidzi no. 2973, dari Ka'ab bin 'Ujrah (Kitab Tafsir, Surah Al-Baqarah). Tirmidzi: hasan shahih; Darussalam: shahih.",
          url: "https://sunnah.com/tirmidhi:2973"
        },
        wahidi: {
          t: "Al-Wahidi, Asbab an-Nuzul, Al-Baqarah 196 (terjemahan Inggris Mokrane Guezzou).",
          url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=2&Ayah=196&search=yes&img=A&LanguageID=2"
        },
        lubab: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 27 (Al-Baqarah 196).",
          url: "https://shamela.ws/book/2247/25"
        },
        lubab28: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 28 (lanjutan riwayat Ahmad dan riwayat Al-Wahidi dari Ibnu Abbas).",
          url: "https://shamela.ws/book/2247/26"
        },
        muqbil: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 30 (Al-Baqarah 196, bagian fidyah).",
          url: "https://shamela.ws/book/11547/25"
        },
        muqbil29: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 29 (awal Al-Baqarah 196, riwayat Ya'la bin Umayyah).",
          url: "https://shamela.ws/book/11547/24"
        },
        fath186: {
          t: "Ibnu Hajar, Fath al-Bari 8/186 (Kitab Tafsir, bab Al-Baqarah 196).",
          url: "https://shamela.ws/book/1673/4533"
        },
        ik: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Al-Baqarah 196.",
          url: "https://quran.com/2:196/tafsirs/ar-tafsir-ibn-kathir"
        },
        iken: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim (ringkasan Inggris), tafsir Al-Baqarah 196: turun pada tahun keenam Hijriah, tahun Perjanjian Hudaibiyah.",
          url: "https://quran.com/2:196/tafsirs/en-tafisr-ibn-kathir"
        },
        qurthubi: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Al-Baqarah 196.",
          url: "https://quran.com/2:196/tafsirs/ar-tafseer-al-qurtubi"
        },
        kemenag: {
          t: "Terjemah dan Tafsir Ringkas Kemenag RI serta tafsir lain (antara lain Hidayatul Insan) untuk Al-Baqarah 196 (dimuat di TafsirWeb).",
          url: "https://tafsirweb.com/717-surat-al-baqarah-ayat-196.html"
        },
        nuonline: {
          t: "Alwi Jamalulel Ubab, \"Tafsir Surat Al-Baqarah Ayat 196: 6 Hukum dan Adab Haji\", NU Online (2023).",
          url: "https://nu.or.id/tafsir/tafsir-surat-al-baqarah-ayat-196-6-hukum-dan-adab-haji-aodXn"
        },
        almanhaj: {
          t: "Ustadz Khalid Syamhudi, \"Larangan dalam Ihram\", Almanhaj (dari Majalah As-Sunnah Edisi 12/Tahun V/1422 H).",
          url: "https://almanhaj.or.id/2872-larangan-dalam-ihram.html"
        }
      }
    },

    // jumuah-11 (ditulis dari riset rujukan silang)
    "jumuah-11": {
      judul: "Al-Jumu'ah 11",
      sub: "Kafilah dagang di tengah khutbah Jumat",
      surah: "Al-Jumu'ah",
      ayatNo: "11",
      tahun: 624,
      tontonan: null,
      peta: {
        tahun: 624,
        tempat: "masjid-nabawi",
        kota: "madinah"
      },
      lead: ["Al-Jumu'ah ayat 11 turun ketika sebuah kafilah dagang datang pada hari Jumat, saat Rasulullah ﷺ sedang berkhutbah sambil berdiri.[ref:m863a] Orang-orang berhamburan menuju kafilah itu sampai yang tersisa bersama beliau hanya dua belas orang.[ref:b4899][ref:m863a]", "Jabir bin Abdullah, perawi kisah ini, termasuk di antara dua belas orang itu, dan riwayat lain menyebut Abu Bakar dan Umar juga bertahan.[ref:m863c][ref:m863d] Ayat ini menegaskan bahwa apa yang ada di sisi Allah lebih baik daripada permainan dan perdagangan.[ref:thabari]"],
      infobox: [
        ["Surah", "Al-Jumu'ah (الجمعة), surah ke-62 dalam mushaf"],
        ["Ayat", "11"],
        ["Golongan", "Madaniyah"],
        ["Waktu", "Hari Jumat, ketika Nabi ﷺ berkhutbah[ref:m863a]; tahunnya tidak disebut dalam riwayat (periode Madinah, ±624 M di peta hanya perkiraan)"],
        ["Tempat", "Madinah, di masjid tempat Nabi ﷺ berkhutbah[ref:t3311][ref:wahidi]"],
        ["Tokoh", "Jabir bin Abdullah, perawi yang ikut bertahan[ref:m863c]; Abu Bakar dan Umar[ref:m863d]; Dihyah bin Khalifah Al-Kalbi, pemilik kafilah menurut para mufassir[ref:wahidi][ref:ik]"],
        ["Yang bertahan", "Dua belas orang[ref:b4899]; riwayat lain menyebut sebelas, delapan, atau empat puluh, dan angka empat puluh hanya diriwayatkan 'Ali bin 'Ashim menurut Ad-Daraquthni[ref:qurthubi]"],
        ["Riwayat utama", "HR. Bukhari no. 4899 dan 936; HR. Muslim no. 863; HR. Tirmidzi no. 3311 (Jabir bin Abdullah)"],
        ["Riwayat pembanding", "Riwayat Jabir lewat Ibnu Jarir: orang-orang juga bubar mendatangi arak-arakan pernikahan yang diiringi rebana dan seruling[ref:lubab][ref:muqbil]"],
        ["Derajat", "Shahih (Bukhari dan Muslim); At-Tirmidzi: hasan shahih[ref:t3311]; dimuat Muqbil dalam Ash-Shahih al-Musnad min Asbab an-Nuzul[ref:muqbil]"]
      ],
      ayat: [
        {
          no: 11,
          ar: "وَإِذَا رَأَوْا تِجَارَةً أَوْ لَهْوًا انفَضُّوا إِلَيْهَا وَتَرَكُوكَ قَائِمًا ۚ قُلْ مَا عِندَ اللَّهِ خَيْرٌ مِّنَ اللَّهْوِ وَمِنَ التِّجَارَةِ ۚ وَاللَّهُ خَيْرُ الرَّازِقِينَ",
          id: "Dan apabila mereka melihat perdagangan atau permainan, mereka segera menuju kepadanya dan mereka tinggalkan engkau (Muhammad) sedang berdiri (berkhotbah). Katakanlah, \"Apa yang ada di sisi Allah lebih baik daripada permainan dan perdagangan,\" dan Allah Pemberi rezeki yang terbaik."
        }
      ],
      bagian: [
        {
          id: "kafilah",
          judul: "Kafilah tiba saat khutbah",
          isi: ["Jabir bin Abdullah menuturkan: pada suatu hari Jumat sebuah kafilah dagang datang ketika mereka sedang bersama Nabi ﷺ.[ref:b4899] Orang-orang pun berhamburan keluar kecuali dua belas orang, lalu Allah menurunkan ayat ini.[ref:b4899]", "Dalam riwayat Muslim, kafilah itu datang dari Syam ketika Nabi ﷺ sedang berkhutbah sambil berdiri.[ref:m863a] At-Tirmidzi meriwayatkan kisah yang sama dan menilainya hasan shahih.[ref:t3311] Salah satu jalur Bukhari menyebut kafilah itu membawa bahan makanan.[ref:b936]"]
        },
        {
          id: "bertahan",
          judul: "Dua belas orang yang bertahan",
          isi: ["Jabir berkata bahwa ia termasuk di antara dua belas orang itu.[ref:m863c] Jalur Muslim yang lain dan riwayat At-Tirmidzi menyebut Abu Bakar dan Umar di antara mereka.[ref:m863d][ref:t3311]", "Al-Qurthubi mencatat angka lain dalam berbagai riwayat, yaitu sebelas, delapan, dan empat puluh orang.[ref:qurthubi] Tentang angka empat puluh, Ad-Daraquthni menjelaskan bahwa hanya 'Ali bin 'Ashim yang meriwayatkannya, sedangkan perawi lain menyebut dua belas.[ref:qurthubi]", "Al-Qurthubi juga membawakan riwayat mursal Muqatil bin Hayyan dalam Al-Marasil karya Abu Dawud yang menyebut nama-nama mereka: Abu Bakar, Umar, Utsman, Ali, Thalhah, Az-Zubair, Sa'ad bin Abi Waqqash, Abdurrahman bin 'Auf, Abu 'Ubaidah bin Al-Jarrah, Sa'id bin Zaid, dan Bilal, ditambah Ibnu Mas'ud atau 'Ammar bin Yasir menurut versi yang berbeda.[ref:qurthubi]"]
        },
        {
          id: "dihyah",
          judul: "Kafilah siapa, dan mengapa disambut?",
          isi: ["Hadits-hadits Jabir di atas tidak menyebut pemilik kafilah.[ref:b4899][ref:m863a] Menurut para mufassir yang dikutip Al-Wahidi, penduduk Madinah saat itu sedang dilanda kelaparan dan harga-harga mahal.[ref:wahidi] Dihyah bin Khalifah Al-Kalbi datang dari Syam membawa dagangan, dan kedatangannya diumumkan dengan tabuhan genderang ketika Nabi ﷺ berkhutbah.[ref:wahidi]", "Ibnu Katsir membawakan keterangan Muqatil bin Hayyan bahwa dagangan itu milik Dihyah sebelum ia masuk Islam, dan bersamanya ada genderang.[ref:ik] Al-Qurthubi menukil Al-Kalbi dan lainnya bahwa kafilah itu membawa gandum dan tepung di masa paceklik.[ref:qurthubi] Ath-Thabari membawakan riwayat Al-Hasan tentang lapar dan mahalnya harga, serta riwayat Abu Malik bahwa Dihyah datang dari Syam membawa minyak zaitun.[ref:thabari] Tafsir Ringkas Kemenag juga menyebut kafilah itu datang dari Syam.[ref:kemenag]"]
        },
        {
          id: "lahw",
          judul: "Makna \"permainan\" (lahw)",
          isi: ["Ath-Thabari juga membawakan riwayat Jabir bahwa ketika ada gadis-gadis yang dinikahkan, arak-arakannya lewat dengan rebana dan seruling, lalu orang-orang meninggalkan Nabi ﷺ yang berdiri di atas mimbar dan pergi ke sana.[ref:thabari]", "Muqbil memuat riwayat ini dari Ibnu Jarir dan Abu 'Awanah melalui nukilan Ibnu Hajar dalam Fath al-Bari, dan menyebut para perawinya perawi kitab Shahih.[ref:muqbil] As-Suyuthi menyimpulkan bahwa ayat ini seakan turun berkenaan dengan kedua hal itu sekaligus, lalu menyebut Ibnu Al-Mundzir meriwayatkan kisah pernikahan dan kedatangan kafilah bersama-sama dari satu jalur Jabir.[ref:lubab]", "Mujahid menafsirkan \"lahw\" sebagai genderang.[ref:thabari] Tafsir Ringkas Kemenag menyebutnya hiburan musik dan tari yang diadakan untuk menyambut kafilah dagang.[ref:kemenag]"]
        },
        {
          id: "khutbah",
          judul: "Saat khutbah atau saat shalat?",
          isi: ["Sebagian besar riwayat menyebut peristiwa ini terjadi saat khutbah.[ref:m863a][ref:wahidi] Namun salah satu lafaz Bukhari berbunyi \"ketika kami sedang shalat bersama Nabi ﷺ\", dan Al-Bukhari menempatkannya dalam bab tentang jamaah yang bubar meninggalkan imam dalam shalat Jumat.[ref:b936]", "Ibnu Katsir membawakan, dengan ungkapan \"dikatakan\" (qila), riwayat Muqatil bin Hayyan dalam Al-Marasil karya Abu Dawud: dahulu Nabi ﷺ mengerjakan shalat Jumat sebelum khutbah, seperti shalat 'Id, lalu peristiwa ini terjadi saat beliau berkhutbah.[ref:ik] Al-Qurthubi menambahkan dari riwayat mursal yang sama bahwa sesudah itu khutbah didahulukan sebelum shalat.[ref:qurthubi]", "Qatadah, sebagaimana dibawakan Ath-Thabari, menyebut kejadian seperti ini terulang sampai tiga kali Jumat.[ref:thabari]"]
        },
        {
          id: "kandungan",
          judul: "Kandungan ayat",
          isi: ["Dalam riwayat Abu Ya'la yang dibawakan Ibnu Katsir, Nabi ﷺ bersabda bahwa seandainya mereka semua pergi, lembah itu akan mengalirkan api kepada mereka.[ref:ik] Al-Wahidi dan Ath-Thabari membawakan makna yang serupa dari para mufassir dan Qatadah.[ref:wahidi][ref:thabari]", "Ath-Thabari menafsirkan bahwa pahala di sisi Allah bagi orang yang tetap duduk mendengarkan khutbah sampai selesai lebih baik daripada hiburan dan perdagangan, dan Allah sebaik-baik pemberi rezeki.[ref:thabari]", "Ibnu Katsir menjadikan frasa \"dan mereka tinggalkan engkau sedang berdiri\" dalil bahwa khatib berkhutbah sambil berdiri.[ref:ik] Al-Qurthubi juga membahas hukum Jumat dari ayat ini, termasuk perbedaan pendapat tentang jumlah minimal jamaah: Rabi'ah menyebut dua belas, sedangkan Asy-Syafi'i empat puluh.[ref:qurthubi]"]
        }
      ],
      lihatJuga: [
        {
          label: "Jabir bin Abdullah",
          tokoh: "jabir"
        },
        {
          label: "Abu Bakar Ash-Shiddiq",
          tokoh: "abubakar"
        },
        {
          label: "Umar bin Khattab",
          tokoh: "umar"
        },
        {
          label: "Masjid Nabawi",
          tempat: "masjid-nabawi",
          kota: "madinah",
          ket: "tempat khutbah Jumat Nabi ﷺ"
        },
        {
          label: "Al-Hujurat 2",
          wiki: "hujurat-2",
          ket: "adab di hadapan Nabi ﷺ"
        }
      ],
      rujukan: {
        b4899: {
          t: "HR. Bukhari no. 4899, dari Jabir bin Abdullah (Kitab Tafsir, Surah Al-Jumu'ah).",
          url: "https://sunnah.com/bukhari:4899"
        },
        b936: {
          t: "HR. Bukhari no. 936, dari Jabir bin Abdullah (Kitab Jumu'ah, bab bila jamaah bubar meninggalkan imam dalam shalat Jumat).",
          url: "https://sunnah.com/bukhari:936"
        },
        m863a: {
          t: "HR. Muslim no. 863a, dari Jabir bin Abdullah (Kitab Jumu'ah).",
          url: "https://sunnah.com/muslim:863a"
        },
        m863c: {
          t: "HR. Muslim no. 863c, dari Jabir bin Abdullah: \"tidak tersisa kecuali dua belas orang, aku termasuk di antara mereka\".",
          url: "https://sunnah.com/muslim:863c"
        },
        m863d: {
          t: "HR. Muslim no. 863d, dari Jabir bin Abdullah: \"di antara mereka Abu Bakar dan Umar\".",
          url: "https://sunnah.com/muslim:863d"
        },
        t3311: {
          t: "HR. Tirmidzi no. 3311, dari Jabir bin Abdullah (Kitab Tafsir, Surah Al-Jumu'ah). Tirmidzi: hasan shahih; Darussalam: shahih.",
          url: "https://sunnah.com/tirmidhi:3311"
        },
        wahidi: {
          t: "Al-Wahidi, Asbab an-Nuzul, Al-Jumu'ah 11 (terjemahan Inggris Mokrane Guezzou).",
          url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=62&Ayah=11&search=yes&img=A&LanguageID=2"
        },
        lubab: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 196 (Surah Al-Jumu'ah).",
          url: "https://shamela.ws/book/2247/194"
        },
        muqbil: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 213 (Surah Al-Jumu'ah).",
          url: "https://shamela.ws/book/11547/208"
        },
        ik: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Al-Jumu'ah 11.",
          url: "https://quran.com/62:11/tafsirs/ar-tafsir-ibn-kathir"
        },
        thabari: {
          t: "Ath-Thabari, Jami' al-Bayan, tafsir Al-Jumu'ah 11.",
          url: "https://quran.com/62:11/tafsirs/ar-tafsir-al-tabari"
        },
        qurthubi: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Al-Jumu'ah 11.",
          url: "https://quran.com/62:11/tafsirs/ar-tafseer-al-qurtubi"
        },
        kemenag: {
          t: "Tafsir Ringkas Kemenag RI dan tafsir lain untuk Al-Jumu'ah 11 (dimuat di TafsirWeb).",
          url: "https://tafsirweb.com/10911-surat-al-jumuah-ayat-11.html"
        }
      }
    },

    // mujadilah-1-4 (ditulis dari riset rujukan silang)
    "mujadilah-1-4": {
      judul: "Al-Mujadilah 1–4",
      sub: "Gugatan Khaulah dan hukum zhihar",
      surah: "Al-Mujadilah",
      ayatNo: "1–4",
      tahun: 626,
      tontonan: null,
      peta: {
        tahun: 626,
        lok: "madinah"
      },
      lead: ["Al-Mujadilah ayat 1–4 turun tentang seorang perempuan yang datang mengadukan suaminya kepada Rasulullah ﷺ, sementara Aisyah yang berada di sudut rumah tidak dapat mendengar pembicaraannya.[ref:im188] Aisyah lalu memuji Allah yang pendengaran-Nya meliputi segala suara.[ref:im188]", "Dalam riwayat Ibnu Majah ia disebut Khaulah binti Tsa'labah, dan dalam riwayat Abu Dawud Khuwailah binti Malik bin Tsa'labah, istri Aus bin Ash-Shamit, yang telah menzhiharnya.[ref:im2063][ref:d2214] Ayat 2–4 lalu menetapkan hukum zhihar beserta kafaratnya.[ref:ik2]"],
      infobox: [
        ["Surah", "Al-Mujadilah (المجادلة), surah ke-58 dalam mushaf"],
        ["Ayat", "1–4"],
        ["Golongan", "Madaniyah"],
        ["Waktu", "Tidak disebut dalam riwayat; periode Madinah (±626 M di peta hanya perkiraan). Menurut riwayat Ibnu Abbas, inilah zhihar pertama dalam Islam[ref:ik2]"],
        ["Tempat", "Madinah, di rumah tempat Nabi ﷺ menerima perempuan itu; Aisyah berada di sudut rumah[ref:im188]"],
        ["Tokoh", "Khaulah binti Tsa'labah, disebut juga Khuwailah[ref:im2063][ref:d2214]; suaminya, Aus bin Ash-Shamit, saudara 'Ubadah bin Ash-Shamit[ref:d2214]; Aisyah[ref:im188]"],
        ["Riwayat utama", "HR. Ibnu Majah no. 188 dan 2063; HR. An-Nasa'i no. 3460 (Aisyah)"],
        ["Riwayat pembanding", "HR. Abu Dawud no. 2214 (Khuwailah binti Malik bin Tsa'labah), dengan rincian kafarat[ref:d2214]; riwayat Ahmad dari Khuwailah binti Tsa'labah[ref:ik2]"],
        ["Derajat", "Riwayat Aisyah: shahih menurut Darussalam[ref:im188][ref:im2063][ref:n3460]; Al-Hakim: shahih al-isnad, disetujui Adz-Dzahabi[ref:muqbil]; Al-Bukhari menyebutnya secara mu'allaq dalam Kitab at-Tauhid[ref:ik]. Riwayat Abu Dawud: hasan menurut Al-Albani, kecuali keterangan tentang 'araq[ref:d2214]"]
      ],
      ayat: [
        {
          no: 1,
          ar: "قَدْ سَمِعَ اللَّهُ قَوْلَ الَّتِي تُجَادِلُكَ فِي زَوْجِهَا وَتَشْتَكِي إِلَى اللَّهِ وَاللَّهُ يَسْمَعُ تَحَاوُرَكُمَا ۚ إِنَّ اللَّهَ سَمِيعٌ بَصِيرٌ",
          id: "Sungguh, Allah telah mendengar ucapan perempuan yang mengajukan gugatan kepadamu (Muhammad) tentang suaminya, dan mengadukan (halnya) kepada Allah, dan Allah mendengar percakapan antara kamu berdua. Sesungguhnya Allah Maha Mendengar, Maha Melihat."
        },
        {
          no: 2,
          ar: "الَّذِينَ يُظَاهِرُونَ مِنكُم مِّن نِّسَائِهِم مَّا هُنَّ أُمَّهَاتِهِمْ ۖ إِنْ أُمَّهَاتُهُمْ إِلَّا اللَّائِي وَلَدْنَهُمْ ۚ وَإِنَّهُمْ لَيَقُولُونَ مُنكَرًا مِّنَ الْقَوْلِ وَزُورًا ۚ وَإِنَّ اللَّهَ لَعَفُوٌّ غَفُورٌ",
          id: "Orang-orang di antara kamu yang menzihar istrinya, (menganggap istrinya sebagai ibunya, padahal) istri mereka itu bukanlah ibunya. Ibu-ibu mereka hanyalah perempuan yang melahirkannya. Dan sesungguhnya mereka benar-benar telah mengucapkan suatu perkataan yang mungkar dan dusta. Dan sesungguhnya Allah Maha Pemaaf, Maha Pengampun."
        },
        {
          no: 3,
          ar: "وَالَّذِينَ يُظَاهِرُونَ مِن نِّسَائِهِمْ ثُمَّ يَعُودُونَ لِمَا قَالُوا فَتَحْرِيرُ رَقَبَةٍ مِّن قَبْلِ أَن يَتَمَاسَّا ۚ ذَٰلِكُمْ تُوعَظُونَ بِهِ ۚ وَاللَّهُ بِمَا تَعْمَلُونَ خَبِيرٌ",
          id: "Dan mereka yang menzihar istrinya, kemudian menarik kembali apa yang telah mereka ucapkan, maka (mereka diwajibkan) memerdekakan seorang budak sebelum kedua suami istri itu bercampur. Demikianlah yang diajarkan kepadamu, dan Allah Mahateliti atas apa yang kamu kerjakan."
        },
        {
          no: 4,
          ar: "فَمَن لَّمْ يَجِدْ فَصِيَامُ شَهْرَيْنِ مُتَتَابِعَيْنِ مِن قَبْلِ أَن يَتَمَاسَّا ۖ فَمَن لَّمْ يَسْتَطِعْ فَإِطْعَامُ سِتِّينَ مِسْكِينًا ۚ ذَٰلِكَ لِتُؤْمِنُوا بِاللَّهِ وَرَسُولِهِ ۚ وَتِلْكَ حُدُودُ اللَّهِ ۗ وَلِلْكَافِرِينَ عَذَابٌ أَلِيمٌ",
          id: "Maka barangsiapa tidak dapat (memerdekakan hamba sahaya), maka (dia wajib) berpuasa dua bulan berturut-turut sebelum keduanya bercampur. Tetapi barangsiapa tidak mampu, maka (wajib) memberi makan enam puluh orang miskin. Demikianlah agar kamu beriman kepada Allah dan Rasul-Nya. Itulah hukum-hukum Allah, dan bagi orang-orang yang mengingkarinya akan mendapat azab yang sangat pedih."
        }
      ],
      bagian: [
        {
          id: "aduan",
          judul: "Aduan yang didengar Allah",
          isi: ["Aisyah berkata, \"Segala puji bagi Allah yang pendengaran-Nya meliputi segala suara.\"[ref:im188] Perempuan yang mengajukan gugatan itu datang kepada Nabi ﷺ dan berbicara dengan beliau, sementara Aisyah berada di sudut rumah dan tidak mendengar apa yang dikatakannya.[ref:im188] Lalu Allah menurunkan, \"Sungguh, Allah telah mendengar ucapan perempuan yang mengajukan gugatan kepadamu tentang suaminya.\"[ref:im188]", "Dalam riwayat Ibnu Majah yang lain, Aisyah menyebut namanya, Khaulah binti Tsa'labah, dan berkata bahwa sebagian ucapannya tidak terdengar olehnya.[ref:im2063] Khaulah mengadu bahwa suaminya telah menghabiskan masa mudanya dan ia telah melahirkan anak-anak untuknya, tetapi setelah ia tua dan tidak dapat lagi melahirkan, suaminya menzhiharnya.[ref:im2063] Ia terus mengadu sampai Jibril turun membawa ayat-ayat ini.[ref:im2063]", "Al-Wahidi membawakan riwayat yang sama dari Al-Hakim, termasuk doa Khaulah, \"Ya Allah, aku mengadu kepada-Mu.\"[ref:wahidi] An-Nasa'i juga meriwayatkannya dari Aisyah dengan menyebut nama Khaulah.[ref:n3460] As-Suyuthi mengutip riwayat Al-Hakim, yang dinilai shahih oleh Al-Hakim sendiri, dengan keterangan bahwa suaminya adalah Aus bin Ash-Shamit.[ref:lubab]"]
        },
        {
          id: "nama",
          judul: "Siapa perempuan itu?",
          isi: ["Riwayat Abu Dawud datang dari perempuan itu sendiri, yang menyebut dirinya Khuwailah binti Malik bin Tsa'labah.[ref:d2214] Ia menyebut suaminya Aus bin Ash-Shamit, dan Abu Dawud menjelaskan bahwa Aus adalah saudara 'Ubadah bin Ash-Shamit.[ref:d2214]", "Ibnu Katsir membawakan riwayat Imam Ahmad dari Khuwailah binti Tsa'labah: \"Demi Allah, tentang aku dan Aus bin Ash-Shamit Allah menurunkan awal Surah Al-Mujadilah,\" lalu menyatakan bahwa inilah sebab turun yang benar bagi awal surah ini.[ref:ik2]", "Ath-Thabari membawakan banyak riwayat dengan nama yang berbeda-beda, seperti Khaulah binti Tsa'labah, Khuwailah binti Khuwailid, Khuwailah binti Ad-Dulaij, dan Jamilah; riwayat-riwayat yang menyebut suaminya menamainya Aus bin Ash-Shamit.[ref:thabari] Al-Qurthubi juga mencatat nama-nama itu dan menilai \"Khaulah\" yang paling benar.[ref:qurthubi] Ia menukil Al-Mawardi bahwa perbedaannya muncul karena penisbatan kepada ayah atau kakek.[ref:qurthubi]"]
        },
        {
          id: "zhihar",
          judul: "Zhihar dan jawaban Nabi ﷺ",
          isi: ["Zhihar adalah ucapan suami yang menyamakan istrinya dengan punggung ibunya, seperti \"Engkau bagiku seperti punggung ibuku.\"[ref:kemenag] Ibnu Katsir menjelaskan bahwa di masa Jahiliyah zhihar dianggap talak, lalu Allah memberi keringanan bagi umat ini dengan menetapkan kafarat, bukan talak.[ref:ik2] Al-Qurthubi juga menyebut zhihar dan ila' sebagai bentuk talak di masa Jahiliyah.[ref:qurthubi]", "Menurut beberapa riwayat tafsir, sebelum ayat ini turun Nabi ﷺ menjawab bahwa perempuan itu telah menjadi haram bagi suaminya.[ref:thabari][ref:qurthubi] Dalam riwayat Abu Dawud, beliau menasihatinya agar bertakwa kepada Allah, dan ia terus mengadu sampai ayat Al-Qur'an turun.[ref:d2214]", "Dalam riwayat Ahmad, Khuwailah menyebut suaminya sudah lanjut usia dan perangainya memburuk.[ref:ik2] Menurut riwayat Ibnu Abbas lewat 'Ikrimah, Aus adalah orang pertama yang melakukan zhihar dalam Islam; Ibnu Katsir menilai sanadnya jayyid dan kuat.[ref:ik2]"]
        },
        {
          id: "hukum",
          judul: "Hukum zhihar yang kemudian turun",
          isi: ["Ayat 2 menegaskan bahwa istri yang dizhihar tidak menjadi ibu suaminya; ibunya hanyalah perempuan yang melahirkannya, dan ucapan zhihar adalah perkataan mungkar dan dusta.[ref:ik2]", "Ayat 3–4 menetapkan kafaratnya secara berurutan: memerdekakan seorang budak sebelum suami istri bercampur; jika tidak mampu, berpuasa dua bulan berturut-turut; jika tidak mampu juga, memberi makan enam puluh orang miskin.[ref:ik2][ref:d2214]", "Dalam riwayat Abu Dawud, Nabi ﷺ menyampaikan urutan kafarat itu, dan Khuwailah menjawab bahwa suaminya tidak mampu pada setiap tahap.[ref:d2214] Nabi ﷺ lalu membantu dengan sekeranjang kurma ('araq), dan Khuwailah menambah satu keranjang lagi.[ref:d2214] Nabi ﷺ bersabda, \"Engkau telah berbuat baik,\" lalu menyuruhnya memberi makan enam puluh orang miskin atas nama suaminya dan kembali kepadanya.[ref:d2214]"]
        },
        {
          id: "umar",
          judul: "Catatan tentang kisah yang populer",
          isi: ["Al-Qurthubi membawakan kisah Umar bin Khattab yang berhenti lama mendengarkan nasihat perempuan ini, dan berkata bahwa Allah telah mendengar ucapannya dari atas tujuh langit.[ref:qurthubi] Ibnu Katsir mencatat bahwa sanad kisah ini terputus (munqathi') antara Abu Yazid dan Umar, meskipun diriwayatkan pula dari jalur lain.[ref:ik]"]
        },
        {
          id: "kandungan",
          judul: "Kandungan ayat",
          isi: ["Tafsir Ringkas Kemenag menjelaskan bahwa Allah Maha Mendengar semua jenis percakapan, yang terbuka maupun yang tertutup.[ref:kemenag]", "Ibnu Katsir dan Muqbil mencatat bahwa riwayat Aisyah ini juga dikeluarkan Ahmad, An-Nasa'i, Ibnu Majah, dan Ibnu Jarir, dan bahwa Al-Bukhari menyebutnya secara mu'allaq dalam Kitab at-Tauhid.[ref:ik][ref:muqbil]"]
        }
      ],
      lihatJuga: [
        {
          label: "Khaulah binti Tsa'labah",
          tokoh: "khaulahtsalabah"
        },
        {
          label: "Aisyah binti Abu Bakar",
          tokoh: "aisyah"
        },
        {
          label: "Ubadah bin Ash-Shamit",
          tokoh: "ubadah",
          ket: "saudara Aus bin Ash-Shamit"
        },
        {
          label: "Umar bin Khattab",
          tokoh: "umar",
          ket: "kisah yang sanadnya terputus"
        },
        {
          label: "An-Nur 6–9",
          wiki: "nur-6-9",
          ket: "hukum keluarga: li'an"
        }
      ],
      rujukan: {
        im188: {
          t: "HR. Ibnu Majah no. 188, dari Aisyah (Muqaddimah, bab yang diingkari kaum Jahmiyyah). Darussalam: shahih.",
          url: "https://sunnah.com/ibnmajah:188"
        },
        im2063: {
          t: "HR. Ibnu Majah no. 2063, dari Aisyah (Kitab Thalaq, bab zhihar), menyebut nama Khaulah binti Tsa'labah. Darussalam: shahih.",
          url: "https://sunnah.com/ibnmajah:2063"
        },
        n3460: {
          t: "HR. An-Nasa'i no. 3460, dari Aisyah (Kitab Thalaq, bab zhihar). Darussalam: shahih.",
          url: "https://sunnah.com/nasai:3460"
        },
        d2214: {
          t: "HR. Abu Dawud no. 2214, dari Khuwailah binti Malik bin Tsa'labah (Kitab Thalaq, bab zhihar). Al-Albani: hasan, kecuali ucapan \"dan 'araq itu...\".",
          url: "https://sunnah.com/abudawud:2214"
        },
        wahidi: {
          t: "Al-Wahidi, Asbab an-Nuzul, Al-Mujadilah 1 (terjemahan Inggris Mokrane Guezzou).",
          url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=58&Ayah=1&search=yes&img=A&LanguageID=2"
        },
        lubab: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 189 (Surah Al-Mujadilah).",
          url: "https://shamela.ws/book/2247/187"
        },
        muqbil: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 204 (Surah Al-Mujadilah).",
          url: "https://shamela.ws/book/11547/199"
        },
        ik: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Al-Mujadilah 1.",
          url: "https://quran.com/58:1/tafsirs/ar-tafsir-ibn-kathir"
        },
        ik2: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir Al-Mujadilah 2–4 (riwayat Ahmad dari Khuwailah dan hukum zhihar).",
          url: "https://quran.com/58:2/tafsirs/ar-tafsir-ibn-kathir"
        },
        thabari: {
          t: "Ath-Thabari, Jami' al-Bayan, tafsir Al-Mujadilah 1.",
          url: "https://quran.com/58:1/tafsirs/ar-tafsir-al-tabari"
        },
        qurthubi: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir Al-Mujadilah 1.",
          url: "https://quran.com/58:1/tafsirs/ar-tafseer-al-qurtubi"
        },
        kemenag: {
          t: "Tafsir Ringkas Kemenag RI dan tafsir lain untuk Al-Mujadilah 1 (dimuat di TafsirWeb).",
          url: "https://tafsirweb.com/10755-surat-al-mujadalah-ayat-1.html"
        }
      }
    },

    // nur-6-9 (ditulis dari riset rujukan silang)
    "nur-6-9": {
      judul: "An-Nur 6–9",
      sub: "Li'an: sumpah suami dan istri tanpa saksi",
      surah: "An-Nur",
      ayatNo: "6–9",
      tahun: 630,
      tontonan: null,
      peta: {
        tahun: 630,
        lok: "madinah"
      },
      lead: ["An-Nur ayat 6–9 menetapkan hukum li'an: seorang suami yang menuduh istrinya berzina tanpa empat saksi bersumpah empat kali dengan nama Allah bahwa ia benar, lalu pada sumpah kelima memohon laknat Allah atas dirinya jika ia berdusta; istri terhindar dari hukuman bila ia bersumpah dengan cara yang sama.[ref:ik]", "Menurut riwayat Ibnu Abbas dalam Shahih Bukhari, ayat ini turun ketika Hilal bin Umayyah mengajukan tuduhan seperti itu dan Nabi ﷺ bersabda, \"Bukti, atau hukuman had di punggungmu.\"[ref:b4747] Riwayat Sahl bin Sa'd mengaitkan ayat yang sama dengan 'Uwaimir Al-'Ajlani; para ulama berbeda pendapat tentang mana yang lebih dahulu, dan sebagian memadukan keduanya.[ref:b4745][ref:lubab139]"],
      infobox: [
        ["Surah", "An-Nur (النور), surah ke-24 dalam mushaf"],
        ["Ayat", "6–9"],
        ["Golongan", "Madaniyah"],
        ["Waktu", "Sya'ban 9 H (±630 M), saat Nabi ﷺ kembali dari Tabuk ke Madinah, menurut Ath-Thabari sebagaimana dinukil Al-Qurthubi[ref:qurthubi]; hadits-haditsnya tidak menyebut tahun, dan Al-Qurthubi tidak merinci kisah mana yang dimaksud"],
        ["Tempat", "Madinah, di hadapan Nabi ﷺ[ref:b4747][ref:b4745]"],
        ["Yang terlibat", "Hilal bin Umayyah dan istrinya[ref:b4747]; 'Uwaimir Al-'Ajlani dan istrinya, dengan 'Ashim bin 'Adi sebagai perantara pertanyaan[ref:b4745]; Sa'ad bin 'Ubadah, yang bertanya tentang ayat empat saksi[ref:wahidi]"],
        ["Riwayat utama", "HR. Bukhari no. 4747 (Ibnu Abbas, kisah Hilal)"],
        ["Riwayat pembanding", "HR. Bukhari no. 4745 (Sahl bin Sa'd, kisah 'Uwaimir)[ref:b4745]; HR. Muslim no. 1496 (Anas): Hilal orang pertama yang melakukan li'an dalam Islam[ref:m1496]"],
        ["Derajat", "Shahih (Bukhari); kisah 'Uwaimir diriwayatkan Bukhari dan Muslim[ref:lubab139]; Muqbil memuat keduanya[ref:muqbil][ref:muqbil144]"]
      ],
      ayat: [
        {
          no: 6,
          ar: "وَالَّذِينَ يَرْمُونَ أَزْوَاجَهُمْ وَلَمْ يَكُن لَّهُمْ شُهَدَاءُ إِلَّا أَنفُسُهُمْ فَشَهَادَةُ أَحَدِهِمْ أَرْبَعُ شَهَادَاتٍ بِاللَّهِ ۙ إِنَّهُ لَمِنَ الصَّادِقِينَ",
          id: "Dan orang-orang yang menuduh istrinya (berzina), padahal mereka tidak mempunyai saksi-saksi selain diri mereka sendiri, maka kesaksian masing-masing orang itu ialah empat kali bersumpah dengan (nama) Allah, bahwa sesungguhnya dia termasuk orang yang berkata benar."
        },
        {
          no: 7,
          ar: "وَالْخَامِسَةُ أَنَّ لَعْنَتَ اللَّهِ عَلَيْهِ إِن كَانَ مِنَ الْكَاذِبِينَ",
          id: "Dan (sumpah) yang kelima bahwa laknat Allah akan menimpanya, jika dia termasuk orang yang berdusta."
        },
        {
          no: 8,
          ar: "وَيَدْرَأُ عَنْهَا الْعَذَابَ أَن تَشْهَدَ أَرْبَعَ شَهَادَاتٍ بِاللَّهِ ۙ إِنَّهُ لَمِنَ الْكَاذِبِينَ",
          id: "Dan istri itu terhindar dari hukuman apabila dia bersumpah empat kali atas (nama) Allah bahwa dia (suaminya) benar-benar termasuk orang-orang yang berdusta,"
        },
        {
          no: 9,
          ar: "وَالْخَامِسَةَ أَنَّ غَضَبَ اللَّهِ عَلَيْهَا إِن كَانَ مِنَ الصَّادِقِينَ",
          id: "dan (sumpah) yang kelima bahwa kemurkaan Allah akan menimpanya (istri), jika dia (suaminya) itu termasuk orang yang berkata benar."
        }
      ],
      bagian: [
        {
          id: "hilal",
          judul: "Hilal bin Umayyah dan turunnya ayat",
          isi: ["Ibnu Abbas meriwayatkan bahwa Hilal bin Umayyah menuduh istrinya berzina di hadapan Nabi ﷺ.[ref:b4747] Beliau bersabda, \"Bukti, atau hukuman had di punggungmu.\"[ref:b4747] Hilal adalah salah satu dari tiga sahabat yang tidak ikut Perang Tabuk lalu diterima taubatnya.[ref:b4418][ref:lubab139]", "Hilal bertanya apakah seorang suami yang menyaksikan sendiri hal itu harus pergi mencari bukti, dan Nabi ﷺ mengulangi sabdanya.[ref:b4747] Hilal berkata, \"Demi Zat yang mengutusmu dengan kebenaran, sungguh aku jujur, dan Allah pasti akan menurunkan sesuatu yang membebaskan punggungku dari hukuman.\" Lalu Jibril turun membawa ayat 6 sampai 9.[ref:b4747][ref:lubab]", "Dalam riwayat yang dibawakan Al-Wahidi, kisah ini didahului pertanyaan Sa'ad bin 'Ubadah tentang ayat 4 yang mewajibkan empat saksi, dan 'Ubadah bin Ash-Shamit sempat berkata bahwa Hilal akan didera.[ref:wahidi] Setelah wahyu turun, Nabi ﷺ bersabda, \"Bergembiralah, wahai Hilal.\"[ref:wahidi] Ibnu Katsir membawakan riwayat Ibnu Abbas ini dari Ahmad, dan Ath-Thabari meriwayatkannya dengan sanadnya sendiri.[ref:ik][ref:thabari]"]
        },
        {
          id: "lian",
          judul: "Li'an di hadapan Nabi ﷺ",
          isi: ["Nabi ﷺ memanggil keduanya.[ref:b4747] Hilal bersaksi lebih dahulu, dan Nabi ﷺ bersabda, \"Allah mengetahui bahwa salah seorang dari kalian berdua berdusta; adakah yang mau bertaubat?\" Kemudian istrinya bersaksi.[ref:b4747]", "Ketika tiba sumpah kelima, orang-orang menghentikannya dan mengingatkan bahwa sumpah itu menentukan.[ref:b4747] Ia sempat ragu, lalu berkata bahwa ia tidak akan mempermalukan kaumnya sepanjang hari itu, dan melanjutkan sumpahnya.[ref:b4747]", "Di akhir kisah Nabi ﷺ bersabda, \"Seandainya tidak ada ketetapan yang telah lalu dari Kitab Allah, tentu ada urusan antara aku dan dia.\"[ref:b4747] Ibnu Katsir menjelaskan bahwa dengan sumpahnya itu istri terhindar dari hukuman.[ref:ik]"]
        },
        {
          id: "uwaimir",
          judul: "Kisah 'Uwaimir Al-'Ajlani",
          isi: ["Sahl bin Sa'd meriwayatkan: 'Uwaimir datang kepada 'Ashim bin 'Adi, pemuka Bani 'Ajlan, dan memintanya menanyakan kepada Nabi ﷺ apa yang harus dilakukan seorang suami yang mendapati istrinya bersama laki-laki lain.[ref:b4745] Nabi ﷺ tidak menyukai pertanyaan seperti itu.[ref:b4745]", "'Uwaimir lalu datang sendiri, dan Nabi ﷺ bersabda, \"Allah telah menurunkan Al-Qur'an tentang engkau dan istrimu.\" Keduanya pun melakukan li'an sesuai yang disebutkan Allah dalam Kitab-Nya.[ref:b4745]", "Sesudahnya 'Uwaimir berkata bahwa jika ia tetap menahan istrinya, ia telah menzaliminya, lalu ia menceraikannya.[ref:b4745] Sejak itu berpisahnya suami istri menjadi ketentuan bagi pasangan yang melakukan li'an, dan anak yang lahir dinisbatkan kepada ibunya.[ref:b4745]", "Ath-Thabari dan Ibnu Katsir juga membawakan riwayat Ibnu Umar tentang seorang laki-laki yang mula-mula bertanya secara umum, lalu kembali karena hal itu benar-benar menimpanya, kemudian turun ayat ini; namanya tidak disebut.[ref:thabari][ref:ik] Al-Wahidi membawakan riwayat Ibnu Mas'ud dari Muslim tentang seorang laki-laki Anshar yang juga tidak disebut namanya.[ref:wahidi]"]
        },
        {
          id: "mana",
          judul: "Hilal atau 'Uwaimir?",
          isi: ["Hadits Anas dalam Shahih Muslim menyebut Hilal bin Umayyah sebagai orang pertama yang melakukan li'an dalam Islam.[ref:m1496] Al-Qurthubi menyebut pendapat yang masyhur: kasus Hilal terjadi lebih dahulu dan itulah sebab turunnya ayat.[ref:qurthubi]", "Sebagian ulama berpendapat lain: Al-Qurthubi menukil Abu 'Abdillah bin Abi Shufrah yang menilai penuduh itu adalah 'Uwaimir dan menyebut penyebutan Hilal sebagai kekeliruan, Ath-Thabari yang mempersoalkan penyebutan Hilal, serta Al-Kalbi yang menganggap 'Uwaimir lebih tampak.[ref:qurthubi]", "Ibnu Hajar, sebagaimana dinukil As-Suyuthi, merangkum perbedaan ini: ada yang menguatkan 'Uwaimir, ada yang menguatkan Hilal, dan ada yang memadukan keduanya.[ref:lubab139] An-Nawawi condong pada pendapat bahwa Hilal yang pertama mengalaminya, lalu 'Uwaimir datang pada waktu yang berdekatan, sehingga ayat turun tentang keduanya; Al-Khatib mengikutinya.[ref:lubab139]", "Ibnu Hajar sendiri menyebut kemungkinan lain: ayat turun karena Hilal, lalu ketika 'Uwaimir datang tanpa mengetahui kejadian itu, Nabi ﷺ mengabarkan hukumnya kepadanya.[ref:lubab139] Karena itu dalam kisah Hilal disebut \"Jibril turun\", sedangkan dalam kisah 'Uwaimir disebut \"Allah telah menurunkan tentang engkau\", yakni tentang orang yang mengalami hal serupa.[ref:lubab139][ref:lubab140]", "Ibnu Hajar juga mencatat bahwa Al-Qurthubi membolehkan kemungkinan ayat ini turun dua kali, dan menegaskan tidak ada halangan bagi satu ayat untuk memiliki beberapa sebab.[ref:lubab140] Kajian Ulumul Qur'an berbahasa Indonesia menjadikan kisah ini contoh beberapa sebab untuk satu ayat yang dapat dipadukan.[ref:taaddud]"]
        },
        {
          id: "hukum",
          judul: "Ketentuan li'an",
          isi: ["Menurut Ibnu Katsir, suami yang menuduh istrinya tanpa bukti boleh melakukan li'an: ia bersaksi empat kali dengan nama Allah sebagai ganti empat saksi, lalu sumpah kelima memohon laknat Allah atas dirinya jika ia berdusta.[ref:ik]", "Istri terhindar dari hukuman bila ia bersaksi empat kali bahwa suaminya berdusta, lalu sumpah kelima memohon murka Allah atas dirinya jika suaminya benar.[ref:ik] Keduanya lalu dipisahkan untuk selamanya, dan anaknya tidak dinisbatkan kepada suami.[ref:ik]", "Al-Qurthubi mencatat pendapat mayoritas ulama bahwa li'an berlaku untuk setiap tuduhan zina dari suami kepada istrinya, dan bahwa suami yang memulai, sesuai urutan dalam ayat.[ref:qurthubi] Di TafsirWeb, Hidayatul Insan memuat kedua riwayat Bukhari tentang 'Uwaimir dan Hilal, sedangkan Tafsir Ringkas Kemenag menjelaskan hukumnya tanpa menyebut sebab turun.[ref:kemenag]"]
        }
      ],
      lihatJuga: [
        {
          label: "Hilal bin Umayyah",
          tokoh: "hilalumayyah"
        },
        {
          label: "Sa'ad bin Ubadah",
          tokoh: "saadubadah"
        },
        {
          label: "At-Taubah 118",
          wiki: "taubah-118",
          ket: "Hilal, salah satu dari tiga sahabat Tabuk"
        },
        {
          label: "An-Nur 11–20",
          wiki: "nur-11-20",
          ket: "surah yang sama"
        },
        {
          label: "Al-Mujadilah 1–4",
          wiki: "mujadilah-1-4",
          ket: "hukum keluarga: zhihar"
        }
      ],
      rujukan: {
        b4747: {
          t: "HR. Bukhari no. 4747, dari Ibnu Abbas (Kitab Tafsir, Surah An-Nur).",
          url: "https://sunnah.com/bukhari:4747"
        },
        b4745: {
          t: "HR. Bukhari no. 4745, dari Sahl bin Sa'd (Kitab Tafsir, Surah An-Nur, bab ayat 6).",
          url: "https://sunnah.com/bukhari:4745"
        },
        m1496: {
          t: "HR. Muslim no. 1496, dari Anas bin Malik (Kitab Li'an).",
          url: "https://sunnah.com/muslim:1496"
        },
        b4418: {
          t: "HR. Bukhari no. 4418, dari Ka'ab bin Malik (Kitab Al-Maghazi): menyebut Murarah bin Ar-Rabi' dan Hilal bin Umayyah Al-Waqifi.",
          url: "https://sunnah.com/bukhari:4418"
        },
        wahidi: {
          t: "Al-Wahidi, Asbab an-Nuzul, An-Nur 6 (terjemahan Inggris Mokrane Guezzou).",
          url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=24&Ayah=6&search=yes&img=A&LanguageID=2"
        },
        lubab: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 138 (An-Nur 6, riwayat Bukhari tentang Hilal).",
          url: "https://shamela.ws/book/2247/136"
        },
        lubab139: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 139 (riwayat Sahl bin Sa'd dan pembahasan Ibnu Hajar).",
          url: "https://shamela.ws/book/2247/137"
        },
        lubab140: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 140 (lanjutan pembahasan Ibnu Hajar).",
          url: "https://shamela.ws/book/2247/138"
        },
        muqbil: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 143 (An-Nur 6–9, hadits Sahl bin Sa'd dari Bukhari).",
          url: "https://shamela.ws/book/11547/138"
        },
        muqbil144: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 144 (catatan kaki: riwayat Ibnu Abbas tentang Hilal).",
          url: "https://shamela.ws/book/11547/139"
        },
        ik: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim (ringkasan Inggris), tafsir An-Nur 6–10.",
          url: "https://quran.com/24:6/tafsirs/en-tafisr-ibn-kathir"
        },
        thabari: {
          t: "Ath-Thabari, Jami' al-Bayan, tafsir An-Nur 6.",
          url: "https://quran.com/24:6/tafsirs/ar-tafsir-al-tabari"
        },
        qurthubi: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir An-Nur 6.",
          url: "https://quran.com/24:6/tafsirs/ar-tafseer-al-qurtubi"
        },
        kemenag: {
          t: "Tafsir Ringkas Kemenag RI dan tafsir lain untuk An-Nur 6 (dimuat di TafsirWeb).",
          url: "https://tafsirweb.com/6134-surat-an-nur-ayat-6.html"
        },
        taaddud: {
          t: "Ahmad Qoys Jamalallail, \"Konsep Taaddud As-Sabab Wa An-Nazil Wahid di Dalam Ulumul Al-Quran (Bagian 2)\", TafsirAlquran.id, 27 Mei 2021.",
          url: "https://tafsiralquran.id/konsep-taaddud-as-sabab-wa-an-nazil-wahid-di-dalam-ulumul-al-quran-bagian-2/"
        }
      }
    },

    // tahrim-1-4 (ditulis dari riset rujukan silang)
    "tahrim-1-4": {
      judul: "At-Tahrim 1–4",
      sub: "Madu di rumah Zainab dan sumpah Nabi ﷺ",
      surah: "At-Tahrim",
      ayatNo: "1–4",
      tahun: 629,
      tontonan: null,
      peta: {
        tahun: 629,
        lok: "madinah"
      },
      lead: ["At-Tahrim ayat 1–4 turun ketika Nabi ﷺ bersumpah tidak akan lagi minum madu yang biasa beliau minum di rumah Zainab binti Jahsy.[ref:b4912] Menurut penuturan Aisyah, ia dan Hafshah telah bersepakat untuk mengatakan kepada beliau bahwa tercium bau maghafir darinya.[ref:b4912][ref:b5267]", "Ayat 1 bertanya mengapa beliau mengharamkan apa yang dihalalkan Allah, dan ayat 2 mensyariatkan cara membebaskan diri dari sumpah.[ref:thabari] Ada pula riwayat bahwa yang beliau haramkan adalah hamba sahaya beliau, Mariyah.[ref:n3959][ref:lubab] Ibnu Katsir dan Al-Qurthubi menilai kisah madu sebagai sebab yang benar, sedangkan Ibnu Hajar membuka kemungkinan keduanya menjadi sebab.[ref:ik2][ref:qurthubi][ref:lubab200]"],
      infobox: [
        ["Surah", "At-Tahrim (التحريم), surah ke-66 dalam mushaf"],
        ["Ayat", "1–4"],
        ["Golongan", "Madaniyah"],
        ["Waktu", "Tidak disebut dalam riwayat; periode Madinah, ketika Zainab binti Jahsy sudah menjadi istri Nabi ﷺ[ref:b4912] (±629 M di peta hanya perkiraan)"],
        ["Tempat", "Madinah, di rumah-rumah istri Nabi ﷺ[ref:b4912][ref:b5268]"],
        ["Tokoh", "Zainab binti Jahsy, Aisyah, dan Hafshah[ref:b5267]; dalam riwayat lain Saudah dan Shafiyyah[ref:b5268], atau Mariyah[ref:lubab]"],
        ["Dua istri dalam ayat 4", "Aisyah dan Hafshah, menurut Aisyah[ref:b5267] dan menurut jawaban Umar kepada Ibnu Abbas[ref:b4913]"],
        ["Riwayat utama", "HR. Bukhari no. 4912 dan 5267; HR. Muslim no. 1474a (Aisyah, lewat 'Ubaid bin 'Umair)"],
        ["Riwayat pembanding", "HR. Bukhari no. 5268 dan Muslim no. 1474b (Aisyah, lewat Hisyam bin 'Urwah): madu di rumah Hafshah[ref:b5268][ref:m1474b]; HR. An-Nasa'i no. 3959 (Anas): pengharaman hamba sahaya[ref:n3959]"],
        ["Derajat", "Kisah madu: shahih (Bukhari dan Muslim). Riwayat Anas tentang hamba sahaya: shahih menurut Darussalam[ref:n3959], sanadnya shahih menurut As-Suyuthi[ref:lubab], shahih sesuai syarat Muslim menurut Al-Hakim yang disetujui Adz-Dzahabi[ref:muqbil]; Ibnu al-'Arabi mencatat kisah Mariyah tidak termuat dalam kitab Shahih[ref:qurthubi]"]
      ],
      ayat: [
        {
          no: 1,
          ar: "يَا أَيُّهَا النَّبِيُّ لِمَ تُحَرِّمُ مَا أَحَلَّ اللَّهُ لَكَ ۖ تَبْتَغِي مَرْضَاتَ أَزْوَاجِكَ ۚ وَاللَّهُ غَفُورٌ رَّحِيمٌ",
          id: "Wahai Nabi! Mengapa engkau mengharamkan apa yang dihalalkan Allah bagimu? Engkau ingin menyenangkan hati istri-istrimu? Dan Allah Maha Pengampun, Maha Penyayang."
        },
        {
          no: 2,
          ar: "قَدْ فَرَضَ اللَّهُ لَكُمْ تَحِلَّةَ أَيْمَانِكُمْ ۚ وَاللَّهُ مَوْلَاكُمْ ۖ وَهُوَ الْعَلِيمُ الْحَكِيمُ",
          id: "Sungguh, Allah telah mewajibkan kepadamu membebaskan diri dari sumpahmu; dan Allah adalah pelindungmu dan Dia Maha Mengetahui, Mahabijaksana."
        },
        {
          no: 3,
          ar: "وَإِذْ أَسَرَّ النَّبِيُّ إِلَىٰ بَعْضِ أَزْوَاجِهِ حَدِيثًا فَلَمَّا نَبَّأَتْ بِهِ وَأَظْهَرَهُ اللَّهُ عَلَيْهِ عَرَّفَ بَعْضَهُ وَأَعْرَضَ عَن بَعْضٍ ۖ فَلَمَّا نَبَّأَهَا بِهِ قَالَتْ مَنْ أَنبَأَكَ هَٰذَا ۖ قَالَ نَبَّأَنِيَ الْعَلِيمُ الْخَبِيرُ",
          id: "Dan ingatlah ketika secara rahasia Nabi membicarakan suatu peristiwa kepada salah seorang istrinya (Hafsah). Lalu dia menceritakan peristiwa itu (kepada Aisyah) dan Allah memberitahukan peristiwa itu kepadanya (Nabi), lalu (Nabi) memberitahukan (kepada Hafsah) sebagian dan menyembunyikan sebagian yang lain. Maka ketika dia (Nabi) memberitahukan pembicaraan itu kepadanya (Hafsah), dia bertanya, \"Siapa yang telah memberitahukan hal ini kepadamu?\" Nabi menjawab, \"Yang memberitahukan kepadaku adalah Allah Yang Maha Mengetahui, Mahateliti.\""
        },
        {
          no: 4,
          ar: "إِن تَتُوبَا إِلَى اللَّهِ فَقَدْ صَغَتْ قُلُوبُكُمَا ۖ وَإِن تَظَاهَرَا عَلَيْهِ فَإِنَّ اللَّهَ هُوَ مَوْلَاهُ وَجِبْرِيلُ وَصَالِحُ الْمُؤْمِنِينَ ۖ وَالْمَلَائِكَةُ بَعْدَ ذَٰلِكَ ظَهِيرٌ",
          id: "Jika kamu berdua bertobat kepada Allah, maka sungguh, hati kamu berdua telah condong (untuk menerima kebenaran); dan jika kamu berdua saling bantu membantu menyusahkan Nabi, maka sungguh, Allah menjadi pelindungnya dan (juga) Jibril dan orang-orang mukmin yang baik; dan selain itu malaikat-malaikat adalah penolongnya."
        }
      ],
      bagian: [
        {
          id: "madu",
          judul: "Madu di rumah Zainab binti Jahsy",
          isi: ["Aisyah menuturkan bahwa Rasulullah ﷺ biasa minum madu di rumah Zainab binti Jahsy dan tinggal agak lama di sana.[ref:b4912] Aisyah dan Hafshah lalu bersepakat: siapa pun di antara mereka yang didatangi beliau lebih dahulu akan berkata, \"Aku mencium bau maghafir darimu,\" yaitu sejenis getah yang baunya tajam.[ref:b5267][ref:m1474a]", "Ketika hal itu disampaikan, beliau menjawab, \"Tidak, aku hanya minum madu di rumah Zainab binti Jahsy, dan aku tidak akan mengulanginya lagi.\"[ref:b5267][ref:m1474a] Dalam riwayat Kitab Tafsir, beliau menambahkan, \"Aku telah bersumpah; jangan engkau ceritakan hal ini kepada siapa pun.\"[ref:b4912]"]
        },
        {
          id: "turun",
          judul: "Turunnya ayat 1–4",
          isi: ["Aisyah menyebut ayat-ayat yang turun sesudahnya, dari \"Wahai Nabi, mengapa engkau mengharamkan apa yang dihalalkan Allah bagimu\" sampai \"Jika kamu berdua bertobat kepada Allah\"; dua orang yang dimaksud adalah Aisyah dan Hafshah.[ref:b5267] Ayat tentang Nabi yang membicarakan sesuatu secara rahasia kepada salah seorang istrinya merujuk pada ucapan beliau, \"Aku hanya minum madu.\"[ref:b5267]", "Ath-Thabari menjelaskan bahwa Allah menegur pengharaman sesuatu yang halal itu, lalu mensyariatkan kafarat sumpah melalui firman-Nya, \"Allah telah mewajibkan kepadamu membebaskan diri dari sumpahmu.\" Menurutnya, penutup ayat 1, \"Allah Maha Pengampun, Maha Penyayang,\" berarti Allah telah mengampuni beliau atas pengharaman itu.[ref:thabari]", "Dalam riwayat-riwayat yang dibawakan Ibnu Katsir disebutkan bahwa Nabi ﷺ kemudian membayar kafarat atas sumpahnya.[ref:ik]"]
        },
        {
          id: "hisyam",
          judul: "Rumah Zainab atau rumah Hafshah?",
          isi: ["Jalur Hisyam bin 'Urwah dari ayahnya dari Aisyah menceritakan versi yang berbeda: madu itu diminum di rumah Hafshah binti Umar, dan yang bersepakat adalah Aisyah, Saudah, dan Shafiyyah.[ref:b5268][ref:m1474b] Dalam riwayat ini Aisyah sendiri menuturkan rasa cemburunya.[ref:b5268][ref:m1474b]", "Al-Wahidi membawakan versi Hisyam ini dari Bukhari dan Muslim, serta riwayat Ibnu Abi Mulaikah yang menyebut madu itu hadiah untuk Saudah.[ref:wahidi]", "Al-Qurthubi mencatat riwayat-riwayat yang menyebut Hafshah, Saudah, dan Ummu Salamah, lalu menyimpulkan bahwa yang shahih adalah madu yang diminum di rumah Zainab.[ref:qurthubi] Ibnu Katsir juga membawakan dua jalur riwayat Aisyah yang menyebut Zainab binti Jahsy.[ref:ik2]"]
        },
        {
          id: "mariyah",
          judul: "Riwayat tentang Mariyah",
          isi: ["Anas bin Malik meriwayatkan bahwa Nabi ﷺ memiliki seorang hamba sahaya, lalu Aisyah dan Hafshah terus mendesak beliau hingga beliau menyatakannya haram atas diri beliau.[ref:n3959] Maka Allah menurunkan ayat 1.[ref:n3959]", "As-Suyuthi menyebut riwayat Anas ini dikeluarkan Al-Hakim dan An-Nasa'i dengan sanad shahih.[ref:lubab] Ia juga membawakan riwayat Adh-Dhiya' dalam Al-Mukhtarah dari Ibnu Umar dari Umar bahwa Nabi ﷺ berpesan kepada Hafshah agar tidak memberi tahu siapa pun bahwa Ummu Ibrahim (Mariyah) haram bagi beliau, tetapi Hafshah menceritakannya kepada Aisyah, lalu turun ayat 2.[ref:lubab]", "Riwayat Abu Hurairah melalui Ath-Thabarani dinilai As-Suyuthi sanadnya lemah, sedangkan riwayat Al-Bazzar dari Ibnu Abbas bahwa ayat ini turun tentang hamba sahaya beliau dinilainya bersanad shahih.[ref:lubab][ref:lubab200]", "Muqbil memuat riwayat Anas ini di samping kisah madu, dengan menukil penilaian Al-Hakim bahwa sanadnya shahih sesuai syarat Muslim, yang disetujui Adz-Dzahabi.[ref:muqbil] Ath-Thabari membawakan banyak riwayat tentang hamba sahaya ini, antara lain dari Zaid bin Aslam, Masruq, Asy-Sya'bi, dan Ibnu Abbas.[ref:thabari] Ibnu Katsir juga membawakannya dari An-Nasa'i, Ibnu Jarir, dan Al-Haitsam bin Kulaib.[ref:ik]"]
        },
        {
          id: "pendapat",
          judul: "Pendapat para ulama",
          isi: ["Ibnu Katsir menegaskan, \"Yang benar, hal itu terjadi ketika beliau mengharamkan madu atas dirinya,\" lalu membawakan hadits Bukhari dari Aisyah.[ref:ik2]", "Al-Qurthubi menyebut tiga pendapat tentang sebab turunnya: madu, wanita yang menghibahkan dirinya kepada Nabi ﷺ, dan Mariyah.[ref:qurthubi] Menurutnya yang paling shahih adalah yang pertama dan yang paling lemah adalah yang kedua.[ref:qurthubi] Ia menukil Ibnu al-'Arabi bahwa riwayat Mariyah lebih baik sanadnya dan lebih dekat maknanya, tetapi tidak dicatat dalam kitab Shahih.[ref:qurthubi]", "Ath-Thabari tidak memastikan salah satunya.[ref:thabari] Menurutnya yang diharamkan beliau adalah sesuatu yang halal baginya, entah hamba sahaya, minuman, atau yang lain, dan masing-masing mungkin.[ref:thabari]", "As-Suyuthi menukil Ibnu Hajar bahwa ayat ini mungkin turun karena kedua sebab itu sekaligus.[ref:lubab200] Di TafsirWeb, Hidayatul Insan mengikuti pendapat ini dan menukil Asy-Syaukani bahwa kedua sebab itu shahih, sedangkan Tafsir Ringkas Kemenag menyebut kedua sebab tanpa menguatkan salah satunya.[ref:kemenag]", "Dua riwayat lain dinilai As-Suyuthi sangat gharib atau lemah: bahwa ayat 2 turun tentang sumpah Abu Bakar terhadap Misthah, dan bahwa ayat 1 turun tentang wanita yang menghibahkan dirinya.[ref:lubab200]"]
        },
        {
          id: "ayat4",
          judul: "Dua istri dalam ayat 4",
          isi: ["Ibnu Abbas menuturkan bahwa selama setahun ia ingin bertanya kepada Umar tentang ayat ini, tetapi segan.[ref:b4913] Dalam perjalanan pulang haji, ia akhirnya bertanya siapa dua istri Nabi ﷺ yang saling membantu itu, dan Umar menjawab, \"Mereka adalah Hafshah dan Aisyah.\"[ref:b4913]"]
        }
      ],
      lihatJuga: [
        {
          label: "Zainab binti Jahsy",
          tokoh: "zainabjahsy"
        },
        {
          label: "Aisyah binti Abu Bakar",
          tokoh: "aisyah"
        },
        {
          label: "Hafshah binti Umar",
          tokoh: "hafshah"
        },
        {
          label: "Mariyah Al-Qibthiyyah",
          tokoh: "mariyah"
        },
        {
          label: "Umar bin Khattab",
          tokoh: "umar",
          ket: "menjawab pertanyaan Ibnu Abbas tentang ayat 4"
        },
        {
          label: "Rumah Hafshah",
          tempat: "rumah-hafshah",
          kota: "madinah",
          ket: "tempat minum madu menurut riwayat Hisyam"
        }
      ],
      rujukan: {
        b4912: {
          t: "HR. Bukhari no. 4912, dari Aisyah lewat 'Ubaid bin 'Umair (Kitab Tafsir, Surah At-Tahrim).",
          url: "https://sunnah.com/bukhari:4912"
        },
        b5267: {
          t: "HR. Bukhari no. 5267, dari Aisyah lewat 'Ubaid bin 'Umair (Kitab Thalaq, bab At-Tahrim 1).",
          url: "https://sunnah.com/bukhari:5267"
        },
        b5268: {
          t: "HR. Bukhari no. 5268, dari Aisyah lewat Hisyam bin 'Urwah dari ayahnya (Kitab Thalaq).",
          url: "https://sunnah.com/bukhari:5268"
        },
        m1474a: {
          t: "HR. Muslim no. 1474a, dari Aisyah (Kitab Thalaq, bab kafarat bagi yang mengharamkan istrinya tanpa niat talak).",
          url: "https://sunnah.com/muslim:1474a"
        },
        m1474b: {
          t: "HR. Muslim no. 1474b, dari Aisyah lewat Hisyam bin 'Urwah (Kitab Thalaq).",
          url: "https://sunnah.com/muslim:1474b"
        },
        b4913: {
          t: "HR. Bukhari no. 4913, dari Ibnu Abbas (Kitab Tafsir, Surah At-Tahrim): pertanyaannya kepada Umar.",
          url: "https://sunnah.com/bukhari:4913"
        },
        n3959: {
          t: "HR. An-Nasa'i no. 3959, dari Anas bin Malik (Kitab 'Isyratin Nisa', bab cemburu). Darussalam: shahih.",
          url: "https://sunnah.com/nasai:3959"
        },
        wahidi: {
          t: "Al-Wahidi, Asbab an-Nuzul, At-Tahrim 1 (terjemahan Inggris Mokrane Guezzou).",
          url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=66&Ayah=1&search=yes&img=A&LanguageID=2"
        },
        lubab: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 199 (Surah At-Tahrim).",
          url: "https://shamela.ws/book/2247/197"
        },
        lubab200: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 200 (lanjutan Surah At-Tahrim).",
          url: "https://shamela.ws/book/2247/198"
        },
        muqbil: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 217 (Surah At-Tahrim).",
          url: "https://shamela.ws/book/11547/212"
        },
        ik: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir At-Tahrim 1 (riwayat-riwayat tentang Mariyah).",
          url: "https://quran.com/66:1/tafsirs/ar-tafsir-ibn-kathir"
        },
        ik2: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir At-Tahrim 2 (kisah madu).",
          url: "https://quran.com/66:2/tafsirs/ar-tafsir-ibn-kathir"
        },
        thabari: {
          t: "Ath-Thabari, Jami' al-Bayan, tafsir At-Tahrim 1.",
          url: "https://quran.com/66:1/tafsirs/ar-tafsir-al-tabari"
        },
        qurthubi: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir At-Tahrim 1.",
          url: "https://quran.com/66:1/tafsirs/ar-tafseer-al-qurtubi"
        },
        kemenag: {
          t: "Tafsir Ringkas Kemenag RI dan tafsir lain untuk At-Tahrim 1 (dimuat di TafsirWeb).",
          url: "https://tafsirweb.com/11005-surat-at-tahrim-ayat-1.html"
        }
      }
    },

    // taubah-84 (ditulis dari riset rujukan silang)
    "taubah-84": {
      judul: "At-Taubah 84",
      sub: "Shalat jenazah untuk Abdullah bin Ubay",
      surah: "At-Taubah",
      ayatNo: "84",
      tahun: 631,
      tontonan: null,
      peta: {
        tahun: 631,
        lok: "madinah"
      },
      lead: ["At-Taubah ayat 84 turun setelah Rasulullah ﷺ menshalatkan jenazah Abdullah bin Ubay bin Salul, pemimpin kaum munafik, meskipun Umar bin Khattab keberatan.[ref:b4670] Ayat ini melarang beliau menshalatkan siapa pun dari kaum munafik yang mati dan berdiri di kuburnya.[ref:b4670][ref:ik]", "Menurut Al-Waqidi dan Al-Hakim yang dinukil Ibnu Hajar, Abdullah bin Ubay wafat sepulang Perang Tabuk, pada Dzulqa'dah 9 H.[ref:fath] Setelah ayat ini turun, Nabi ﷺ tidak pernah lagi menshalatkan seorang munafik dan tidak berdiri di kuburnya.[ref:t3097]"],
      infobox: [
        ["Surah", "At-Taubah (التوبة), surah ke-9 dalam mushaf"],
        ["Ayat", "84 (berkaitan dengan ayat 80 tentang memohonkan ampun tujuh puluh kali)[ref:b4670]"],
        ["Golongan", "Madaniyah"],
        ["Waktu", "Dzulqa'dah 9 H (±631 M), sepulang Perang Tabuk, menurut Al-Waqidi dan Al-Hakim yang dinukil Ibnu Hajar[ref:fath]"],
        ["Tempat", "Madinah[ref:fath]"],
        ["Tokoh", "Abdullah bin Ubay bin Salul; putranya, Abdullah bin Abdullah; Umar bin Khattab[ref:b4670]"],
        ["Riwayat utama", "HR. Bukhari no. 4670 dan Muslim no. 2400a (Ibnu Umar); HR. Bukhari no. 1366 dan Tirmidzi no. 3097 (Ibnu Abbas dari Umar)"],
        ["Riwayat pembanding", "HR. Bukhari no. 1350 dan 3008 (Jabir): Nabi ﷺ memakaikan gamisnya setelah jenazah dimasukkan ke liang kubur, sebagai balasan atas gamis yang dahulu diberikan kepada Al-Abbas[ref:b1350][ref:b3008]"],
        ["Derajat", "Shahih (Bukhari dan Muslim); At-Tirmidzi: hasan shahih gharib[ref:t3097]; dimuat Muqbil dalam Ash-Shahih al-Musnad[ref:muqbil]"]
      ],
      ayat: [
        {
          no: 84,
          ar: "وَلَا تُصَلِّ عَلَىٰ أَحَدٍ مِّنْهُم مَّاتَ أَبَدًا وَلَا تَقُمْ عَلَىٰ قَبْرِهِ ۖ إِنَّهُمْ كَفَرُوا بِاللَّهِ وَرَسُولِهِ وَمَاتُوا وَهُمْ فَاسِقُونَ",
          id: "Dan janganlah engkau (Muhammad) melaksanakan salat untuk seseorang yang mati di antara mereka (orang-orang munafik), selama-lamanya dan janganlah engkau berdiri (mendoakan) di atas kuburnya. Sesungguhnya mereka ingkar kepada Allah dan Rasul-Nya dan mereka mati dalam keadaan fasik."
        }
      ],
      bagian: [
        {
          id: "gamis",
          judul: "Permintaan putranya",
          isi: ["Ibnu Umar meriwayatkan: ketika Abdullah bin Ubay wafat, putranya, Abdullah bin Abdullah, datang kepada Rasulullah ﷺ meminta gamis beliau untuk mengafani ayahnya, dan beliau memberikannya.[ref:b4670] Ia lalu meminta beliau menshalatkan ayahnya.[ref:b4670]", "Al-Bukhari juga meriwayatkan dari Jabir bahwa saat Perang Badar, Al-Abbas dibawa sebagai tawanan tanpa pakaian, dan gamis Abdullah bin Ubay-lah yang pas untuknya.[ref:b3008] Karena itu Nabi ﷺ kemudian memberikan gamisnya kepada Abdullah bin Ubay; Ibnu 'Uyainah berkata bahwa Abdullah pernah berjasa kepada Nabi ﷺ sehingga beliau ingin membalasnya.[ref:b3008]", "Dalam riwayat Jabir yang lain, Nabi ﷺ datang setelah jenazah Abdullah bin Ubay dimasukkan ke liang kubur, lalu memerintahkan agar ia dikeluarkan dan memakaikan gamis beliau kepadanya.[ref:b1350]"]
        },
        {
          id: "umar",
          judul: "Keberatan Umar",
          isi: ["Ketika Nabi ﷺ berdiri hendak menshalatkannya, Umar bangkit, memegang pakaian beliau, dan berkata, \"Wahai Rasulullah, apakah engkau akan menshalatkannya, padahal Tuhanmu telah melarangmu menshalatkannya?\"[ref:b4670]", "Nabi ﷺ menjawab, \"Allah hanya memberiku pilihan,\" lalu membaca ayat 80 tentang memohonkan ampun bagi mereka sampai tujuh puluh kali, dan bersabda, \"Aku akan menambahnya lebih dari tujuh puluh kali.\" Umar berkata, \"Dia orang munafik.\"[ref:b4670]", "Dalam penuturan Umar sendiri, ia mendekati Nabi ﷺ dan menyebut ucapan-ucapan Abdullah bin Ubay di masa lalu.[ref:b1366] Nabi ﷺ tersenyum dan bersabda, \"Mundurlah dariku, wahai Umar. Aku diberi pilihan, maka aku memilih. Seandainya aku tahu bahwa bila aku menambah lebih dari tujuh puluh kali ia akan diampuni, tentu aku menambahnya.\"[ref:b1366]"]
        },
        {
          id: "turun",
          judul: "Turunnya larangan",
          isi: ["Nabi ﷺ pun menshalatkannya, lalu Allah menurunkan ayat 84.[ref:b4670][ref:m2400a]", "Umar menuturkan bahwa beliau menshalatkannya lalu pergi, dan tidak lama kemudian turun dua ayat dari Surah Bara'ah.[ref:b1366] Belakangan Umar merasa heran atas keberaniannya kepada Rasulullah ﷺ pada hari itu.[ref:b1366]", "Dalam riwayat At-Tirmidzi, Nabi ﷺ juga mengiringi jenazahnya, dan setelah ayat ini turun beliau tidak pernah lagi menshalatkan seorang munafik dan tidak berdiri di kuburnya.[ref:t3097]", "As-Suyuthi membawakan riwayat Ibnu Umar ini dari Bukhari dan Muslim, dan mencatat bahwa kisah yang sama juga datang dari hadits Umar, Anas, Jabir, dan lainnya.[ref:lubab] Muqbil memuatnya dalam Ash-Shahih al-Musnad dengan takhrij hadits Umar dari Bukhari, Muslim, At-Tirmidzi, Ahmad, dan lainnya.[ref:muqbil]"]
        },
        {
          id: "pilihan",
          judul: "Mengapa Umar berkata \"Tuhanmu telah melarangmu\"?",
          isi: ["Ibnu Hajar mencatat bahwa ucapan Umar ini perlu dijelaskan, karena saat itu belum ada larangan khusus menshalatkan orang munafik.[ref:fath] Ia menguatkan pendapat Al-Qurthubi bahwa Umar memahaminya dari ayat tentang larangan memohonkan ampun bagi kaum musyrik.[ref:fath]", "Al-Qurthubi menyebut penjelasan lain, antara lain bahwa Umar mendapat ilham yang kemudian dibenarkan wahyu, atau memahaminya dari ayat 80.[ref:qurthubi] Tentang \"pilihan\" dalam ayat 80, sebagian ulama memahaminya sebagai ungkapan putus harapan, dengan angka tujuh puluh sebagai kiasan banyaknya, dan sebagian lain berpendapat pilihan itu kemudian dihapus oleh ayat \"sama saja bagi mereka\".[ref:qurthubi]"]
        },
        {
          id: "hikmah",
          judul: "Hikmah di balik sikap Nabi ﷺ",
          isi: ["Al-Qurthubi menilai alasan yang paling shahih bagi pemberian gamis itu adalah membalas jasa Abdullah bin Ubay yang dahulu memberikan gamisnya kepada Al-Abbas; ada pula pendapat bahwa beliau ingin memuliakan putranya.[ref:qurthubi]", "Qatadah, sebagaimana dibawakan Ath-Thabari, meriwayatkan bahwa Nabi ﷺ bersabda gamis itu tidak akan memberi manfaat baginya di sisi Allah, tetapi beliau berharap dengan itu seribu orang dari kaumnya masuk Islam.[ref:thabari] Al-Wahidi membawakannya dari para mufassir, sedangkan Al-Qurthubi mencatat bahwa dalam riwayat yang shahih disebut \"beberapa orang dari kaumnya\", bukan seribu.[ref:wahidi][ref:qurthubi]"]
        },
        {
          id: "lemah",
          judul: "Riwayat yang lemah",
          isi: ["Ada riwayat dari Anas bahwa Jibril menarik pakaian Nabi ﷺ untuk mencegah beliau menshalatkannya.[ref:ik][ref:thabari] Ibnu Katsir menilainya lemah karena perawinya, Yazid Ar-Raqasyi, lemah; Al-Qurthubi menyebutnya bertentangan dengan riwayat yang lebih kuat.[ref:ik][ref:qurthubi]"]
        },
        {
          id: "hukum",
          judul: "Kandungan dan hukum",
          isi: ["Ibnu Katsir menjelaskan bahwa larangan ini berlaku bagi siapa saja yang dikenal kemunafikannya, meskipun turun tentang Abdullah bin Ubay.[ref:ik] Ia juga menukil bahwa Umar tidak menshalatkan jenazah yang tidak ia kenal sampai Hudzaifah bin Al-Yaman, yang diberi tahu Nabi ﷺ nama-nama sebagian munafik, ikut menshalatkannya.[ref:ik]", "Ath-Thabari menafsirkan \"janganlah engkau berdiri di atas kuburnya\" sebagai larangan mengurus pemakamannya.[ref:thabari] Al-Qurthubi menegaskan bahwa larangan ini khusus bagi orang yang mati dalam kekafiran, sedangkan para ulama bersepakat bahwa shalat jenazah tidak boleh ditinggalkan bagi seorang muslim, termasuk pelaku dosa besar.[ref:qurthubi]", "Di TafsirWeb, Zubdatut Tafsir, Hidayatul Insan, dan Al-Wajiz juga mengaitkan ayat ini dengan shalat jenazah Abdullah bin Ubay.[ref:kemenag]"]
        }
      ],
      lihatJuga: [
        {
          label: "Abdullah bin Ubay bin Salul",
          tokoh: "abdullahubay"
        },
        {
          label: "Umar bin Khattab",
          tokoh: "umar"
        },
        {
          label: "Abdullah bin Umar",
          tokoh: "ibnuumar",
          ket: "perawi kisah"
        },
        {
          label: "Al-Abbas bin Abdul Muthalib",
          tokoh: "abbas",
          ket: "gamis saat menjadi tawanan Badar"
        },
        {
          label: "At-Taubah 118",
          wiki: "taubah-118",
          ket: "Perang Tabuk, surah yang sama"
        },
        {
          label: "An-Nur 11–20",
          wiki: "nur-11-20",
          ket: "peran Abdullah bin Ubay dalam haditsul ifki"
        }
      ],
      rujukan: {
        b4670: {
          t: "HR. Bukhari no. 4670, dari Ibnu Umar (Kitab Tafsir, bab At-Taubah 80).",
          url: "https://sunnah.com/bukhari:4670"
        },
        b1366: {
          t: "HR. Bukhari no. 1366, dari Ibnu Abbas dari Umar bin Khattab (Kitab Jenazah, bab dibencinya menshalatkan orang munafik).",
          url: "https://sunnah.com/bukhari:1366"
        },
        m2400a: {
          t: "HR. Muslim no. 2400a, dari Ibnu Umar (Kitab Fadha'il ash-Shahabah, bab keutamaan Umar).",
          url: "https://sunnah.com/muslim:2400a"
        },
        t3097: {
          t: "HR. Tirmidzi no. 3097, dari Ibnu Abbas dari Umar (Kitab Tafsir, Surah At-Taubah). Tirmidzi: hasan shahih gharib; Darussalam: shahih.",
          url: "https://sunnah.com/tirmidhi:3097"
        },
        b1350: {
          t: "HR. Bukhari no. 1350, dari Jabir bin Abdullah (Kitab Jenazah).",
          url: "https://sunnah.com/bukhari:1350"
        },
        b3008: {
          t: "HR. Bukhari no. 3008, dari Jabir bin Abdullah (Kitab Jihad, bab pakaian untuk tawanan).",
          url: "https://sunnah.com/bukhari:3008"
        },
        wahidi: {
          t: "Al-Wahidi, Asbab an-Nuzul, At-Taubah 84 (terjemahan Inggris Mokrane Guezzou).",
          url: "https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=9&Ayah=84&search=yes&img=A&LanguageID=2"
        },
        lubab: {
          t: "As-Suyuthi, Lubab an-Nuqul fi Asbab an-Nuzul, hlm. 109 (Surah Bara'ah, ayat 84).",
          url: "https://shamela.ws/book/2247/107"
        },
        muqbil: {
          t: "Muqbil bin Hadi Al-Wadi'i, Ash-Shahih al-Musnad min Asbab an-Nuzul, hlm. 109–110 (At-Taubah 84).",
          url: "https://shamela.ws/book/11547/104"
        },
        ik: {
          t: "Ibnu Katsir, Tafsir al-Qur'an al-'Azhim, tafsir At-Taubah 84.",
          url: "https://quran.com/9:84/tafsirs/ar-tafsir-ibn-kathir"
        },
        thabari: {
          t: "Ath-Thabari, Jami' al-Bayan, tafsir At-Taubah 84.",
          url: "https://quran.com/9:84/tafsirs/ar-tafsir-al-tabari"
        },
        qurthubi: {
          t: "Al-Qurthubi, Al-Jami' li Ahkam al-Qur'an, tafsir At-Taubah 84.",
          url: "https://quran.com/9:84/tafsirs/ar-tafseer-al-qurtubi"
        },
        fath: {
          t: "Ibnu Hajar, Fath al-Bari 8/334 (Kitab Tafsir, bab At-Taubah 80), menukil Al-Waqidi dan Al-Hakim dalam Al-Iklil.",
          url: "https://shamela.ws/book/1673/4681"
        },
        kemenag: {
          t: "Tafsir Ringkas Kemenag RI dan tafsir lain untuk At-Taubah 84 (dimuat di TafsirWeb).",
          url: "https://tafsirweb.com/3100-surat-at-taubah-ayat-84.html"
        }
      }
    }
  };

  window.NUZUL = { urutan, artikel };
})();
