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
    { id: "isra-1", s: 17, ev: "isra", a: 0, waktu: "Diperselisihkan; antara lain ±1 tahun sebelum Hijrah", ws: "Al-Qurthubi dan Ibnu Katsir, tafsir Al-Isra' 1; Ibnu Hajar, Fath al-Bari 8/670", wu: "https://quran.com/17:1/tafsirs/ar-tafseer-al-qurtubi" },
    { id: "baqarah-144", s: 2, ev: "kiblat", a: 0, waktu: "16 atau 17 bulan setelah Hijrah (2 H)", ws: "HR. Bukhari no. 40 (Al-Bara' bin 'Azib)", wu: sn("bukhari", 40) },
    { id: "baqarah-125", s: 2, tempat: "maqam", r: "Usul Umar", waktu: "Tidak pasti; periode Madinah (624 M di peta hanya perkiraan)" },
    { id: "anfal-9", s: 8, ev: "badar", a: 0, waktu: "17 Ramadhan 2 H, hari Perang Badar", ws: "Sirah Ibnu Hisyam" },
    { id: "anfal-30", s: 8, tempat: "nadwah", r: "Rencana membunuh Nabi", waktu: "Ayat turun setelah Badar (2 H); peristiwanya menjelang Hijrah",
      catatan: "Surah Al-Anfal turun tentang Perang Badar (HR. Bukhari no. 4645); ayat ini mengingatkan peristiwa menjelang Hijrah." },
    { id: "aliimran-128", s: 3, ev: "uhud", a: 0, waktu: "Syawal 3 H, Perang Uhud", ws: "Sirah Ibnu Hisyam" },
    { id: "aliimran-144", s: 3, ev: "uhud", a: 1, waktu: "Syawal 3 H, Perang Uhud", ws: "Sirah Ibnu Hisyam" },
    { id: "ahzab-10", s: 33, ev: "khandaq", a: 0, waktu: "Syawal 5 H menurut pendapat yang masyhur; Musa bin 'Uqbah: 4 H", ws: "Ibnu Katsir, tafsir Al-Ahzab 9–10", wu: "https://quran.com/33:10/tafsirs/en-tafisr-ibn-kathir" },
    { id: "nur-11-20", s: 24, ev: "ifki", a: 0, waktu: "Sepulang ghazwah Bani al-Mushthaliq; 4, 5, atau 6 H (diperselisihkan)", ws: "Al-Qurthubi, tafsir An-Nur 11 (6 H menurut Ibnu Ishaq, 4 H menurut Musa bin 'Uqbah)", wu: "https://quran.com/24:11/tafsirs/ar-tafseer-al-qurtubi" },
    { id: "fath-1", s: 48, ev: "hudaibiyah", a: 0, waktu: "Dzulqa'dah 6 H, sepulang dari Hudaibiyah", ws: "HR. Bukhari no. 1778 (Anas): umrah Hudaibiyah di bulan Dzulqa'dah", wu: sn("bukhari", 1778) },
    { id: "nashr-1-3", s: 110, ev: "fathu", a: 0, waktu: "Diperselisihkan: sekitar Fathu Makkah dan Hunain (8 H), atau hari tasyriq Haji Wada' (10 H)" },
    { id: "taubah-40", s: 9, ev: "tsur", a: 0, waktu: "Ayat turun 9 H, masa seruan Perang Tabuk; peristiwanya saat Hijrah (622 M)" },
    { id: "taubah-118", s: 9, ev: "tabuk", a: 0, waktu: "9 H, setelah Perang Tabuk (berangkat Rajab menurut Ibnu Ishaq)", ws: "Sirah Ibnu Hisyam" },
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
    }
  };

  window.NUZUL = { urutan, artikel };
})();
