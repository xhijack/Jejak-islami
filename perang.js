// Perang zaman Rasul: 27 ghazwah (ekspedisi yang dipimpin Nabi ﷺ sendiri) menurut daftar Ibnu Ishaq,
// ditambah pengepungan Bani Qainuqa' yang dihitung Ibnu Sa'd sebagai ghazwah (no: null).
// Angka pasukan dan korban sering berbeda antar sumber; rentangnya ditulis di `ket`, sengketa di `catatan`.
// Koordinat untuk tempat yang sudah tidak dikenal pasti adalah perkiraan (disebut di `catatan`).
// Nomor hadits sudah dicek di sunnah.com. DRAF: semua isi wajib diverifikasi ustadz sebelum dipakai.
(function () {
  const sn = (k, n) => `https://sunnah.com/${k}:${n}`;
  const W = (p) => "https://en.wikipedia.org/wiki/" + p;
  const IH = "Ibnu Hisyam, As-Sirah an-Nabawiyah (dari Ibnu Ishaq)";
  const B = (n, isi) => ({ derajat: "shahih", sumber: `HR. Bukhari no. ${n}: ${isi}`, url: sn("bukhari", n) });
  const M = (n, isi) => ({ derajat: "shahih", sumber: `HR. Muslim no. ${n}: ${isi}`, url: sn("muslim", n) });
  const S = (sumber, url) => (url ? { derajat: "sirah", sumber, url } : { derajat: "sirah", sumber });
  const TANPA = { muslim: null, musuh: null, ket: "Tidak terjadi pertempuran." };

  window.PERANG = {
    catatan: "Daftar ini mengikuti Ibnu Ishaq sebagaimana diringkas Ibnu Hisyam: Nabi ﷺ memimpin sendiri 27 ekspedisi (ghazwah) dan bertempur dalam sembilan di antaranya, yaitu Badar, Uhud, Khandaq, Bani Quraizhah, Bani Al-Mushthaliq, Khaibar, Fathu Makkah, Hunain, dan Thaif. Ekspedisi yang dipimpin sahabat (sariyyah) tidak termasuk. Hitungan lain juga ada: Zaid bin Arqam menyebut 19 ghazwah (HR. Bukhari 3949), dan Buraidah menyebut 19 ghazwah dengan pertempuran di delapan di antaranya (HR. Muslim 1814a). Perbedaan ini muncul karena ada yang menggabungkan beberapa ghazwah, misalnya Khandaq dengan Quraizhah atau Hunain dengan Thaif, dan karena perawi hanya menghitung yang ia ketahui. Pengepungan Bani Qainuqa' tidak ada dalam daftar Ibnu Ishaq, tetapi Ibnu Sa'd menghitungnya sebagai ghazwah; karena itu ia dicantumkan sebagai entri tambahan tanpa nomor.",

    daftar: [
      // ---------------------------------------------------------------- 1
      {
        id: "waddan", no: 1, nama: "Ghazwah Waddan (Al-Abwa')", arab: "غزوة ودان (الأبواء)",
        jenis: "tanpa-pertempuran", tahun: 623, h: "2 H", bulan: "Shafar 2 H", tanggal: "Shafar 2 H (±Agustus 623 M)", urutWaktu: 623.6,
        tempat: { nama: "Waddan dan Al-Abwa', antara Mekah dan Madinah", lat: 23.1, lon: 39.1 },
        lok: null, peristiwa: null, tontonan: null,
        lawan: "Kafilah Quraisy (tidak dijumpai); berakhir dengan perjanjian bersama Bani Dhamrah",
        muslim: { jumlah: 70, ket: "Sekitar 70 orang, kebanyakan Muhajirin (Wikipedia). Kitab sirah lain tidak selalu menyebut angka." },
        musuh: { jumlah: null, ket: "Kafilah yang dicari tidak dijumpai." },
        panglima: { muslim: ["nabi"], musuh: [] },
        panji: "Hamzah bin Abdul Muthalib (panji putih), menurut Al-Waqidi yang dikutip Ibnu Katsir",
        wakilMadinah: "Sa'ad bin Ubadah (Ibnu Hisyam)",
        korban: TANPA,
        hasil: "Tanpa pertempuran; perjanjian damai dengan Bani Dhamrah.",
        ringkas: "Ekspedisi pertama yang dipimpin Nabi ﷺ sendiri, dua belas bulan setelah Hijrah. Pasukan berangkat untuk menghadang kafilah Quraisy, tetapi tidak menjumpainya. Nabi ﷺ lalu membuat perjanjian damai dengan Bani Dhamrah dan pulang tanpa pertempuran.",
        kronologi: [
          { judul: "Berangkat ke Al-Abwa'", isi: "Pada bulan Shafar 2 H, Nabi ﷺ keluar dari Madinah bersama sekitar 70 orang Muhajirin menuju Waddan dan Al-Abwa', di jalur kafilah Mekah–Syam. Sa'ad bin Ubadah ditugaskan mengurus Madinah." },
          { judul: "Perjanjian dengan Bani Dhamrah", isi: "Kafilah Quraisy tidak dijumpai. Nabi ﷺ membuat perjanjian dengan Bani Dhamrah melalui pemimpin mereka, Makhsyi bin Amr Adh-Dhamri: kedua pihak tidak saling menyerang dan Bani Dhamrah tidak membantu musuh. Setelah itu beliau pulang ke Madinah." }
        ],
        riwayat: [
          S(IH + ", bab Ghazwah Waddan (ghazwah pertama)."),
          S("Ibnu Katsir, Al-Bidayah wan Nihayah, jilid 3: Ghazwah Al-Abwa' (perjanjian dengan Makhsyi bin Amr Adh-Dhamri; panji Hamzah menurut Al-Waqidi)", "https://shamela.ws/book/23708/936"),
          S("Wikipedia: Patrol of al-Abwa", W("Patrol_of_al-Abwa"))
        ],
        catatan: "Ibnu Ishaq menyebut Waddan sebagai ghazwah pertama. Letak Waddan sudah tidak dikenal pasti; koordinat di peta adalah perkiraan di sekitar Al-Abwa', di antara Rabigh dan Madinah."
      },
      // ---------------------------------------------------------------- 2
      {
        id: "buwath", no: 2, nama: "Ghazwah Buwath", arab: "غزوة بواط",
        jenis: "tanpa-pertempuran", tahun: 623, h: "2 H", bulan: "Rabi'ul Awwal 2 H", tanggal: "Rabi'ul Awwal 2 H (±September 623 M)", urutWaktu: 623.7,
        tempat: { nama: "Pegunungan Buwath, dekat Gunung Radhwa", lat: 24.506, lon: 38.496 },
        lok: null, peristiwa: null, tontonan: null,
        lawan: "Kafilah Quraisy yang dikawal Umayyah bin Khalaf",
        muslim: { jumlah: 200, ket: "Sekitar 200 orang (Wikipedia bahasa Arab, dari kitab sirah)." },
        musuh: { jumlah: 100, ket: "Kafilah sekitar 2.500 unta yang dikawal sekitar 100 orang di bawah Umayyah bin Khalaf; kafilah itu lolos sebelum pasukan tiba." },
        panglima: { muslim: ["nabi"], musuh: ["umayyah"] },
        panji: "Sa'ad bin Abi Waqqash (panji putih)",
        wakilMadinah: "As-Sa'ib bin Utsman bin Mazh'un menurut Ibnu Hisyam; Sa'ad bin Mu'adz menurut Ibnu Sa'd",
        korban: TANPA,
        hasil: "Kafilah lolos; pasukan pulang tanpa pertempuran.",
        ringkas: "Nabi ﷺ memimpin sekitar 200 sahabat untuk menghadang kafilah besar Quraisy yang dikawal Umayyah bin Khalaf. Kafilah itu lolos lewat jalur lain, dan pasukan pulang tanpa pertempuran.",
        kronologi: [
          { judul: "Menuju Buwath", isi: "Pada Rabi'ul Awwal 2 H, Nabi ﷺ berangkat bersama sekitar 200 orang menuju Buwath, pegunungan kabilah Juhainah di dekat Gunung Radhwa. Sasarannya kafilah Quraisy berisi sekitar 2.500 unta yang dikawal 100 orang di bawah Umayyah bin Khalaf." },
          { judul: "Kafilah lolos", isi: "Mata-mata Quraisy memperingatkan kafilah, sehingga kafilah berbelok ke jalur lain. Nabi ﷺ kembali ke Madinah tanpa bertemu musuh." }
        ],
        riwayat: [
          S(IH + ", bab Ghazwah Buwath."),
          S("Wikipedia bahasa Arab: غزوة بواط (merujuk Ibnu Katsir)", "https://ar.wikipedia.org/wiki/غزوة_بواط")
        ],
        catatan: "Ada dua tempat bernama Buwath; koordinat mengikuti Wikipedia bahasa Arab dan tetap merupakan perkiraan."
      },
      // ---------------------------------------------------------------- 3
      {
        id: "usyairah", no: 3, nama: "Ghazwah Dzul 'Usyairah", arab: "غزوة العشيرة",
        jenis: "tanpa-pertempuran", tahun: 623, h: "2 H", bulan: "Jumadil Ula 2 H", tanggal: "Jumadil Ula hingga awal Jumadil Akhirah 2 H (±akhir 623 M)", urutWaktu: 623.9,
        tempat: { nama: "Dzul 'Usyairah, Lembah Yanbu'", lat: 24.15, lon: 38.4 },
        lok: null, peristiwa: null, tontonan: null,
        lawan: "Kafilah Quraisy menuju Syam; berakhir dengan perjanjian bersama Bani Mudlij",
        muslim: { jumlah: 150, ket: "150–200 orang (Wikipedia bahasa Arab, dari kitab sirah)." },
        musuh: { jumlah: null, ket: "Kafilah yang dicari sudah lewat sebelum pasukan tiba." },
        panglima: { muslim: ["nabi"], musuh: [] },
        wakilMadinah: "Abu Salamah bin Abdul Asad (Ibnu Hisyam)",
        korban: TANPA,
        hasil: "Tanpa pertempuran; perjanjian damai dengan Bani Mudlij dan sekutunya dari Bani Dhamrah.",
        ringkas: "Nabi ﷺ keluar dengan 150–200 sahabat untuk menghadang kafilah besar Quraisy yang menuju Syam. Kafilah itu sudah lewat, tetapi beliau membuat perjanjian damai dengan Bani Mudlij. Menurut kitab sirah, kafilah inilah yang kelak dicegat lagi saat pulang dari Syam dan berujung pada Perang Badar.",
        kronologi: [
          { judul: "Berangkat ke Lembah Yanbu'", isi: "Pada Jumadil Ula 2 H, Nabi ﷺ berangkat dengan 150–200 orang menuju Dzul 'Usyairah di Lembah Yanbu'. Abu Salamah bin Abdul Asad ditugaskan mengurus Madinah." },
          { judul: "Perjanjian dengan Bani Mudlij", isi: "Kafilah Quraisy sudah lewat beberapa hari sebelumnya. Nabi ﷺ tinggal di sana hingga awal Jumadil Akhirah dan membuat perjanjian damai dengan Bani Mudlij, lalu pulang tanpa pertempuran." }
        ],
        riwayat: [
          B(3949, "Zaid bin Arqam ditanya berapa ghazwah Nabi ﷺ; ia menjawab 19, dan yang pertama adalah Al-'Usyairah (atau Al-'Usairah)."),
          B(441, "Sahl bin Sa'd: Nabi ﷺ menjuluki Ali \"Abu Turab\" ketika mendapatinya tidur berdebu di masjid."),
          S(IH + ", bab Ghazwah Al-'Usyairah."),
          S("Wikipedia bahasa Arab: غزوة العشيرة", "https://ar.wikipedia.org/wiki/غزوة_العشيرة")
        ],
        catatan: "Ibnu Ishaq menempatkannya ketiga setelah Waddan dan Buwath, sedangkan Zaid bin Arqam menyebutnya yang pertama (HR. Bukhari 3949), mungkin karena itulah yang pertama ia ketahui. Ibnu Ishaq juga meriwayatkan bahwa Ali dijuluki Abu Turab dalam perjalanan ini, tetapi riwayat shahih (HR. Bukhari 441) menyebut julukan itu diberikan di masjid. Lokasi persis Dzul 'Usyairah tidak diketahui; koordinat adalah perkiraan di Lembah Yanbu' An-Nakhl."
      },
      // ---------------------------------------------------------------- 4
      {
        id: "badarula", no: 4, nama: "Ghazwah Badar Pertama (Safawan)", arab: "غزوة بدر الأولى",
        jenis: "tanpa-pertempuran", tahun: 623, h: "2 H", bulan: "Jumadil Akhirah 2 H", tanggal: "Jumadil Akhirah 2 H menurut urutan Ibnu Ishaq (±akhir 623 M)", urutWaktu: 623.97,
        tempat: { nama: "Lembah Safawan, di sekitar Badar", lat: 23.8, lon: 38.85 },
        lok: "badar", peristiwa: null, tontonan: null,
        lawan: "Kurz bin Jabir Al-Fihri dan kelompoknya",
        muslim: { jumlah: 70, ket: "Sekitar 70 orang menurut Wikipedia (artikelnya ditandai masih perlu rujukan tambahan)." },
        musuh: { jumlah: null, ket: "Kelompok kecil penyerbu; jumlahnya tidak tercatat." },
        panglima: { muslim: ["nabi"], musuh: ["Kurz bin Jabir Al-Fihri"] },
        wakilMadinah: "Zaid bin Haritsah (Ibnu Hisyam)",
        korban: TANPA,
        hasil: "Kurz bin Jabir lolos; pasukan pulang tanpa pertempuran.",
        ringkas: "Kurz bin Jabir Al-Fihri menyerbu padang gembala Madinah dan membawa lari ternak. Nabi ﷺ mengejarnya sampai Lembah Safawan di dekat Badar, tetapi Kurz sudah lolos. Ekspedisi ini dikenal sebagai Badar Pertama.",
        kronologi: [
          { judul: "Serbuan Kurz bin Jabir", isi: "Tidak sampai sepuluh malam setelah pulang dari Al-'Usyairah, Kurz bin Jabir Al-Fihri menyerbu padang gembala di pinggiran Madinah dan membawa lari ternak." },
          { judul: "Pengejaran ke Safawan", isi: "Nabi ﷺ mengejarnya hingga Lembah Safawan di sekitar Badar. Kurz sudah lolos, dan pasukan pulang ke Madinah. Zaid bin Haritsah ditugaskan mengurus Madinah selama itu." }
        ],
        riwayat: [
          S(IH + ", bab Ghazwah Safawan (Badar Pertama)."),
          S("Wikipedia: First Expedition to Badr", W("First_Expedition_to_Badr")),
          B(4280, "pada Fathu Makkah, Kurz bin Jabir Al-Fihri (yang kemudian masuk Islam) gugur bersama pasukan Khalid bin Walid.")
        ],
        catatan: "Ibnu Ishaq menempatkannya setelah Al-'Usyairah (Jumadil Akhirah 2 H); Wikipedia menyebut Rabi'ul Awwal 2 H. Kurz bin Jabir kemudian masuk Islam dan gugur pada Fathu Makkah. Koordinat Safawan adalah perkiraan."
      },
      // ---------------------------------------------------------------- 5
      {
        id: "badar", no: 5, nama: "Perang Badar", arab: "غزوة بدر الكبرى",
        jenis: "pertempuran", tahun: 624, h: "2 H", bulan: "Ramadhan 2 H", tanggal: "Jumat, 17 Ramadhan 2 H (13 Maret 624 M)", urutWaktu: 624.2,
        tempat: { nama: "Lembah Badar", lat: 23.73, lon: 38.78 },
        lok: "badar", peristiwa: "badar", tontonan: "badar",
        lawan: "Quraisy",
        muslim: { jumlah: 313, kuda: 2, unta: 70, ket: "313–319 orang. HR. Bukhari 3957 menyebut jumlahnya sama dengan pasukan Thalut yang menyeberang sungai, tiga ratus sekian orang; HR. Muslim 1763 menyebut 319. Menurut Wikipedia sekitar 82 Muhajirin dan 231 Anshar, dengan 2 kuda dan 70 unta yang ditunggangi bergantian." },
        musuh: { jumlah: 1000, ket: "Sekitar 950–1.000 orang. HR. Muslim 1763 menyebut seribu; Ibnu Ishaq memperkirakan 900–1.000 dari jumlah unta yang mereka sembelih setiap hari. Wikipedia mencatat sekitar 100 kuda, dan juga menyebut angka sekitar 1.300 saat awal keberangkatan." },
        panglima: { muslim: ["nabi", "hamzah", "ali", "Ubaidah bin Al-Harits", "mushab", "saadmuadz"], musuh: ["abujahal", "utbah", "Syaibah bin Rabi'ah", "Al-Walid bin Utbah", "umayyah"] },
        panji: "Panji utama dibawa Mush'ab bin Umair; dua bendera lain dibawa Ali bin Abi Thalib (Muhajirin) dan Sa'ad bin Mu'adz (Anshar), menurut kitab sirah",
        wakilMadinah: "Ibnu Ummi Maktum menjadi imam shalat; Abu Lubabah, yang dipulangkan dari Ar-Rauha', mengurus Madinah (Ibnu Hisyam)",
        korban: { muslim: 14, musuh: 70, ket: "Kaum muslimin: 14 syahid (6 Muhajirin dan 8 Anshar). Quraisy: 70 tewas dan 70 ditawan (HR. Muslim 1763; HR. Bukhari 3986), di antaranya Abu Jahal, Utbah, Syaibah, dan Umayyah bin Khalaf." },
        hasil: "Kemenangan besar kaum muslimin; banyak pemuka Quraisy tewas.",
        ringkas: "Pertempuran besar pertama antara kaum muslimin dan Quraisy. Sekitar 313 sahabat yang semula hendak menghadang kafilah Abu Sufyan berhadapan dengan sekitar seribu pasukan Quraisy. Kaum muslimin menang; 70 orang Quraisy tewas dan 70 lainnya ditawan.",
        kronologi: [
          { judul: "Kafilah dan musyawarah", isi: "Nabi ﷺ keluar untuk menghadang kafilah dagang Quraisy yang pulang dari Syam di bawah Abu Sufyan. Abu Sufyan berbelok lewat pesisir dan meminta bantuan ke Mekah, sehingga Quraisy berangkat dengan pasukan besar. Nabi ﷺ bermusyawarah, dan Sa'ad bin Ubadah menyatakan para sahabat siap mengikuti beliau, bahkan bila diperintah menceburkan kuda ke laut (HR. Muslim 1779)." },
          { judul: "Berkemah di Badar", isi: "Kaum muslimin tiba di Badar dan menguasai sumber airnya. Nabi ﷺ menunjukkan tempat-tempat para pemuka Quraisy akan jatuh, dan tidak seorang pun dari mereka meleset dari tempat yang beliau tunjuk (HR. Muslim 1779)." },
          { judul: "Doa di pagi Badar", isi: "Melihat pasukan musuh tiga kali lebih besar, Nabi ﷺ menghadap kiblat dan berdoa sungguh-sungguh hingga Abu Bakar berkata, \"Cukuplah, wahai Nabi Allah.\" Lalu turun Al-Anfal 9 tentang bala bantuan seribu malaikat (HR. Muslim 1763). Beliau juga membaca, \"Golongan itu pasti akan dikalahkan dan mereka akan mundur ke belakang\" (Al-Qamar 45; HR. Bukhari 3953)." },
          { judul: "Perang tanding", isi: "Pertempuran dibuka dengan duel. Hamzah, Ali, dan Ubaidah bin Al-Harits menghadapi Utbah, Syaibah, dan Al-Walid bin Utbah. Ketiga penantang Quraisy tewas, sedangkan Ubaidah terluka berat dan kemudian wafat. Abu Dzar bersumpah bahwa ayat \"Inilah dua golongan yang bertengkar\" (Al-Hajj 19) turun tentang mereka (HR. Bukhari 3969)." },
          { judul: "Serangan umum", isi: "Quraisy menyerbu, dan kaum muslimin bertahan dalam barisan lalu balik menyerang hingga Quraisy kocar-kacir. Abu Jahal tewas di tangan dua pemuda Anshar, Mu'adz bin Amr bin Al-Jamuh dan Mu'adz bin Afra' (HR. Bukhari 3141)." },
          { judul: "Tawanan dan kepulangan", isi: "Tujuh puluh orang Quraisy tewas dan tujuh puluh ditawan. Para tawanan dibawa ke Madinah; sebagian ditebus dengan harta, dan menurut kitab sirah sebagian yang pandai menulis diminta mengajari anak-anak Madinah membaca dan menulis." }
        ],
        ayat: [
          { surah: "Ali 'Imran", no: "123", arab: "وَلَقَدْ نَصَرَكُمُ اللَّهُ بِبَدْرٍ وَأَنْتُمْ أَذِلَّةٌ", arti: "Dan sungguh, Allah telah menolong kamu dalam Perang Badar, padahal kamu dalam keadaan lemah." },
          { surah: "Al-Anfal", no: "9", arab: "إِذْ تَسْتَغِيثُونَ رَبَّكُمْ فَاسْتَجَابَ لَكُمْ أَنِّي مُمِدُّكُمْ بِأَلْفٍ مِنَ الْمَلَائِكَةِ مُرْدِفِينَ", arti: "(Ingatlah) ketika kamu memohon pertolongan kepada Tuhanmu, lalu Dia mengabulkan bagimu, \"Sungguh, Aku akan mendatangkan bala bantuan kepadamu dengan seribu malaikat yang datang berturut-turut.\"" },
          { surah: "Al-Anfal", no: "17", arab: "وَمَا رَمَيْتَ إِذْ رَمَيْتَ وَلَٰكِنَّ اللَّهَ رَمَىٰ", arti: "Dan bukan engkau yang melempar ketika engkau melempar, tetapi Allah yang melempar." }
        ],
        riwayat: [
          M(1763, "Umar bin Khattab: kaum musyrikin seribu orang, para sahabat 319 orang; doa Nabi ﷺ, turunnya Al-Anfal 9, 70 tewas dan 70 ditawan."),
          B(3957, "Al-Bara' bin Azib: jumlah pasukan Badar sama dengan pasukan Thalut yang menyeberang sungai, tiga ratus sekian orang."),
          B(3953, "Ibnu Abbas: doa Nabi ﷺ di hari Badar dan bacaan Al-Qamar 45."),
          B(3969, "Abu Dzar: Al-Hajj 19 turun tentang para peserta duel di Badar."),
          B(3141, "Abdurrahman bin Auf: dua pemuda Anshar, Mu'adz bin Afra' dan Mu'adz bin Amr bin Al-Jamuh, menewaskan Abu Jahal."),
          B(3986, "Al-Bara' bin Azib: di Badar kaum musyrikin kehilangan 140 orang, 70 tewas dan 70 ditawan."),
          M(1779, "Anas: musyawarah sebelum Badar dan isyarat Nabi ﷺ tentang tempat jatuhnya para pemuka Quraisy."),
          S(IH + ", bab Perang Badar."),
          S("Wikipedia: Battle of Badr", W("Battle_of_Badr"))
        ],
        catatan: "Tanggal 17 Ramadhan adalah pendapat yang masyhur di kitab sirah; konversinya ke 13 Maret 624 M bersifat perkiraan. Jumlah pasukan muslim berkisar 313–319 menurut riwayat yang berbeda, dan jumlah Quraisy antara sekitar 950 dan 1.000 (ada yang menyebut 1.300 saat berangkat)."
      },
      // ---------------------------------------------------------------- 6
      {
        id: "bnsulaim", no: 6, nama: "Ghazwah Bani Sulaim (Al-Kudr)", arab: "غزوة بني سليم (قرقرة الكدر)",
        jenis: "tanpa-pertempuran", tahun: 624, h: "2 H", bulan: "Syawal 2 H", tanggal: "Awal Syawal 2 H, sekitar sepekan setelah Badar (624 M)", urutWaktu: 624.26,
        tempat: { nama: "Qarqaratul Kudr, mata air di wilayah Bani Sulaim", lat: 24.6, lon: 40.3 },
        lok: null, peristiwa: null, tontonan: null,
        lawan: "Bani Sulaim",
        muslim: { jumlah: 200, ket: "Sekitar 200 orang menurut Ibnu Sa'd (Wikipedia)." },
        musuh: { jumlah: null, ket: "Mereka sudah bubar sebelum pasukan tiba." },
        panglima: { muslim: ["nabi"], musuh: [] },
        wakilMadinah: "Siba' bin Urfuthah Al-Ghifari atau Ibnu Ummi Maktum (Ibnu Hisyam)",
        korban: TANPA,
        hasil: "Musuh bubar; pasukan membawa pulang sekitar 500 unta yang ditinggalkan.",
        ringkas: "Sekitar sepekan setelah pulang dari Badar, Nabi ﷺ bergerak ke mata air Al-Kudr setelah ada kabar Bani Sulaim berkumpul. Mereka sudah bubar, sehingga pasukan tinggal tiga malam di sana lalu pulang tanpa pertempuran.",
        kronologi: [
          { judul: "Menuju Al-Kudr", isi: "Tujuh malam setelah pulang dari Badar, Nabi ﷺ berangkat ke Qarqaratul Kudr, mata air di wilayah Bani Sulaim." },
          { judul: "Musuh bubar", isi: "Bani Sulaim sudah menyingkir. Pasukan tinggal tiga malam di sana; menurut Ibnu Sa'd mereka membawa pulang sekitar 500 unta yang ditinggalkan, lalu kembali ke Madinah." }
        ],
        riwayat: [
          S(IH + ", bab Ghazwah Bani Sulaim di Al-Kudr."),
          S("Wikipedia: Al Kudr Invasion", W("Al_Kudr_Invasion"))
        ],
        catatan: "Ibnu Ishaq menyebutnya tujuh malam setelah pulang dari Badar; Wikipedia (mengikuti Watt) mencatat Mei 624 M. Letak Al-Kudr tidak diketahui pasti; koordinat adalah perkiraan di wilayah Bani Sulaim, sebelah timur Madinah."
      },
      // ---------------------------------------------------------------- 7
      {
        id: "sawiq", no: 7, nama: "Ghazwah As-Sawiq", arab: "غزوة السويق",
        jenis: "tanpa-pertempuran", tahun: 624, h: "2 H", bulan: "Dzulhijjah 2 H", tanggal: "Dzulhijjah 2 H (±Mei–Juni 624 M)", urutWaktu: 624.42,
        tempat: { nama: "Qarqaratul Kudr (batas pengejaran); serangan Abu Sufyan terjadi di Al-'Uraidh, pinggiran Madinah", lat: 24.6, lon: 40.3 },
        lok: null, peristiwa: null, tontonan: null,
        lawan: "Quraisy (Abu Sufyan)",
        muslim: { jumlah: 200, ket: "Sekitar 200 orang Muhajirin dan Anshar menurut Ibnu Sa'd." },
        musuh: { jumlah: 200, ket: "Abu Sufyan datang dengan sekitar 200 penunggang (Wikipedia, dari kitab sirah)." },
        panglima: { muslim: ["nabi"], musuh: ["abusufyan"] },
        wakilMadinah: "Abu Lubabah, Basyir bin Abdul Mundzir (Ibnu Hisyam)",
        korban: { muslim: 2, musuh: null, ket: "Dua orang muslim dibunuh pasukan Abu Sufyan di Al-'Uraidh; tidak ada pertempuran antar-pasukan." },
        hasil: "Abu Sufyan lolos; pasukannya membuang perbekalan sawiq agar bisa lari lebih cepat.",
        ringkas: "Abu Sufyan, yang bersumpah membalas kekalahan Badar, menyusup ke pinggiran Madinah dengan sekitar 200 penunggang, membakar kebun kurma di Al-'Uraidh, dan membunuh dua orang. Nabi ﷺ mengejarnya; pasukan Quraisy kabur sambil membuang karung-karung sawiq untuk meringankan beban.",
        kronologi: [
          { judul: "Sumpah Abu Sufyan", isi: "Setelah Badar, Abu Sufyan bersumpah tidak akan mandi junub sebelum menyerang Muhammad. Pada Dzulhijjah 2 H ia datang diam-diam dengan sekitar 200 penunggang ke pinggiran Madinah." },
          { judul: "Serangan di Al-'Uraidh", isi: "Mereka membakar pohon kurma di Al-'Uraidh, beberapa mil dari Madinah, dan membunuh seorang Anshar beserta seorang kawannya, lalu segera lari." },
          { judul: "Pengejaran", isi: "Nabi ﷺ mengejar sampai Qarqaratul Kudr. Pasukan Quraisy melarikan diri sambil membuang bekal sawiq (tepung gandum sangrai), sehingga ekspedisi ini dikenal sebagai Ghazwah As-Sawiq." }
        ],
        riwayat: [
          S(IH + ", bab Ghazwah As-Sawiq."),
          S("Wikipedia: Invasion of Sawiq", W("Invasion_of_Sawiq"))
        ],
        catatan: "Letak Al-Kudr tidak diketahui pasti; koordinat adalah perkiraan. Wikipedia mencatat hasilnya diperselisihkan, karena Abu Sufyan berhasil lolos."
      },
      // ---------------------------------------------------------------- 8
      {
        id: "ghathafan", no: 8, nama: "Ghazwah Ghathafan (Dzu Amar)", arab: "غزوة ذي أمر (غطفان)",
        jenis: "tanpa-pertempuran", tahun: 624, h: "3 H", bulan: "Muharram–Shafar 3 H", tanggal: "Muharram–Shafar 3 H menurut Ibnu Ishaq; Rabi'ul Awwal 3 H menurut Ibnu Sa'd (624 M)", urutWaktu: 624.5,
        tempat: { nama: "Dzu Amar, Najd", lat: 25.0, lon: 40.6 },
        lok: null, peristiwa: null, tontonan: null,
        lawan: "Bani Tsa'labah dan Bani Muharib (Ghathafan)",
        muslim: { jumlah: 450, ket: "450 orang menurut Ibnu Sa'd (Wikipedia)." },
        musuh: { jumlah: null, ket: "Jumlahnya tidak tercatat; mereka lari ke pegunungan." },
        panglima: { muslim: ["nabi"], musuh: [] },
        wakilMadinah: "Utsman bin Affan (Ibnu Hisyam)",
        korban: TANPA,
        hasil: "Kabilah-kabilah Ghathafan menyingkir; pasukan pulang tanpa pertempuran.",
        ringkas: "Nabi ﷺ memimpin sekitar 450 orang ke Najd setelah ada kabar Bani Tsa'labah dan Bani Muharib dari Ghathafan berkumpul hendak menyerang. Mereka melarikan diri ke pegunungan, dan Nabi ﷺ tinggal di Najd hampir sebulan tanpa pertempuran.",
        kronologi: [
          { judul: "Ke Najd", isi: "Setelah Ghazwah As-Sawiq, datang kabar bahwa kabilah Ghathafan menghimpun orang di Dzu Amar. Nabi ﷺ berangkat ke Najd dan menitipkan Madinah kepada Utsman bin Affan." },
          { judul: "Musuh menyingkir", isi: "Kabilah-kabilah itu lari ke puncak-puncak gunung. Seorang dari mereka tertawan lalu masuk Islam dan menjadi penunjuk jalan (Wikipedia, dari Ibnu Sa'd). Nabi ﷺ tinggal di Najd hampir sepanjang bulan Shafar, lalu pulang." }
        ],
        riwayat: [
          S(IH + ", bab Ghazwah Dzu Amar."),
          S("Wikipedia: Raid on Dhu Amarr", W("Raid_on_Dhu_Amarr"))
        ],
        catatan: "Ibnu Sa'd menyebut ghazwah ini berlangsung 11 hari pada Rabi'ul Awwal 3 H. Al-Waqidi mengisahkan seorang musuh bernama Du'tsur yang mengangkat pedang ke arah Nabi ﷺ dalam ghazwah ini; kisah serupa dalam Shahih Bukhari (no. 4135) terjadi pada Ghazwah Dzatur Riqa'. Letak Dzu Amar tidak diketahui pasti; koordinat adalah perkiraan di Najd."
      },
      // ---------------------------------------------------------------- 9
      {
        id: "bahran", no: 9, nama: "Ghazwah Bahran (Al-Furu')", arab: "غزوة بحران",
        jenis: "tanpa-pertempuran", tahun: 624, h: "3 H", bulan: "Rabi'ul Akhir–Jumadil Ula 3 H", tanggal: "Rabi'ul Akhir hingga Jumadil Ula 3 H (±akhir 624 M)", urutWaktu: 624.75,
        tempat: { nama: "Bahran, daerah tambang di Al-Furu', Hijaz", lat: 23.6, lon: 39.5 },
        lok: null, peristiwa: null, tontonan: null,
        lawan: "Quraisy menurut Ibnu Ishaq; Bani Sulaim menurut Ibnu Sa'd",
        muslim: { jumlah: 300, ket: "Sekitar 300 orang menurut Ibnu Sa'd (Wikipedia)." },
        musuh: { jumlah: null, ket: "Musuh tidak dijumpai." },
        panglima: { muslim: ["nabi"], musuh: [] },
        wakilMadinah: "Ibnu Ummi Maktum (Ibnu Hisyam)",
        korban: TANPA,
        hasil: "Musuh menyingkir; pasukan pulang tanpa pertempuran.",
        ringkas: "Nabi ﷺ berangkat dengan sekitar 300 orang ke Bahran, daerah tambang di wilayah Al-Furu' di Hijaz. Musuh tidak ditemukan; beliau tinggal di sana sekitar dua bulan lalu pulang tanpa pertempuran.",
        kronologi: [
          { judul: "Menuju Bahran", isi: "Nabi ﷺ keluar ke Bahran di wilayah Al-Furu'. Menurut Ibnu Ishaq sasarannya Quraisy; menurut Ibnu Sa'd, Bani Sulaim yang dikabarkan berkumpul." },
          { judul: "Pulang tanpa pertempuran", isi: "Musuh tidak dijumpai. Nabi ﷺ tinggal di sana selama bulan Rabi'ul Akhir dan Jumadil Ula, lalu kembali ke Madinah." }
        ],
        riwayat: [
          S(IH + ", bab Ghazwah Al-Furu' dari Bahran."),
          S("Wikipedia: Invasion of Buhran", W("Invasion_of_Buhran"))
        ],
        catatan: "Letak Bahran tidak diketahui pasti; koordinat adalah perkiraan di wilayah Al-Furu', selatan Madinah."
      },
      // ---------------------------------------------------------------- tambahan (Ibnu Sa'd)
      {
        id: "qainuqa", no: null, nama: "Pengepungan Bani Qainuqa'", arab: "غزوة بني قينقاع",
        jenis: "pengepungan", tahun: 624, h: "2 H", bulan: "Syawal 2 H", tanggal: "Sabtu, 15 Syawal 2 H (±9 April 624 M) menurut Ibnu Sa'd", urutWaktu: 624.27,
        tempat: { nama: "Perkampungan dan pasar Bani Qainuqa', Madinah", lat: 24.463, lon: 39.606 },
        lok: "madinah", peristiwa: null, tontonan: null,
        lawan: "Bani Qainuqa' (kabilah Yahudi Madinah)",
        muslim: { jumlah: null, ket: "Jumlah pasukan tidak tercatat dalam kitab sirah." },
        musuh: { jumlah: 700, ket: "Sekitar 700 orang bersenjata, yaitu 400 tanpa baju besi dan 300 berbaju besi, menurut ucapan Abdullah bin Ubay yang diriwayatkan Ibnu Ishaq (dikutip Wikipedia dari Ath-Thabari)." },
        panglima: { muslim: ["nabi"], musuh: [] },
        wakilMadinah: "Abu Lubabah, Basyir bin Abdul Mundzir (Ibnu Hisyam)",
        korban: { muslim: null, musuh: null, ket: "Tidak terjadi pertempuran terbuka; mereka menyerah setelah dikepung sekitar 15 malam." },
        hasil: "Bani Qainuqa' menyerah dan diusir dari Madinah; mereka pindah ke Adzri'at (Dar'a) di Syam.",
        ringkas: "Bani Qainuqa', kabilah Yahudi yang menguasai pasar di Madinah, dinilai melanggar perjanjian setelah Perang Badar. Nabi ﷺ mengepung perkampungan mereka sekitar 15 malam sampai mereka menyerah. Atas desakan Abdullah bin Ubay, mereka dibiarkan hidup dan diperintahkan meninggalkan Madinah.",
        kronologi: [
          { judul: "Ketegangan setelah Badar", isi: "Menurut kitab sirah, Nabi ﷺ mengumpulkan Bani Qainuqa' di pasar mereka dan mengajak mereka masuk Islam, tetapi mereka menjawab dengan tantangan. Ibnu Hisyam juga meriwayatkan insiden seorang muslimah yang dipermalukan di pasar itu hingga terjadi saling bunuh." },
          { judul: "Pengepungan", isi: "Nabi ﷺ mengepung perkampungan mereka sekitar 15 malam, dan mereka akhirnya menyerah tanpa syarat." },
          { judul: "Pengusiran", isi: "Abdullah bin Ubay, sekutu lama mereka dari Khazraj, mendesak agar mereka dibebaskan. Nabi ﷺ membiarkan mereka hidup dan memerintahkan mereka meninggalkan Madinah; mereka pindah ke arah Syam. Ubadah bin Ash-Shamit, yang juga sekutu lama mereka, memutuskan persekutuannya." }
        ],
        ayat: [
          { surah: "Ali 'Imran", no: "12", arab: "قُلْ لِلَّذِينَ كَفَرُوا سَتُغْلَبُونَ وَتُحْشَرُونَ إِلَىٰ جَهَنَّمَ", arti: "Katakanlah (Muhammad) kepada orang-orang yang kafir, \"Kamu (pasti) akan dikalahkan dan digiring ke dalam neraka Jahanam.\"" }
        ],
        riwayat: [
          B(4028, "Ibnu Umar: Nabi ﷺ mengusir seluruh Yahudi Madinah, di antaranya Bani Qainuqa' (kaum Abdullah bin Salam), Yahudi Bani Haritsah, dan Bani Nadhir."),
          { derajat: "lemah", sumber: "HR. Abu Dawud no. 3001: Ibnu Abbas menyebut Nabi ﷺ mengumpulkan orang Yahudi di pasar Bani Qainuqa' setelah Badar, lalu turun Ali 'Imran 12–13.", url: sn("abudawud", 3001), catatan: "Sanadnya dinilai lemah (dha'if) oleh Al-Albani. Ibnu Ishaq juga mengaitkan ayat ini dengan Bani Qainuqa'." },
          S(IH + ", bab Urusan Bani Qainuqa'."),
          S("Wikipedia: Invasion of Banu Qaynuqa", W("Invasion_of_Banu_Qaynuqa"))
        ],
        catatan: "Ibnu Ishaq tidak memasukkan peristiwa ini ke dalam daftar 27 ghazwah, dan Ibnu Hisyam menceritakannya sesudah Ghazwah Bahran tanpa tanggal pasti. Ibnu Sa'd menghitungnya sebagai ghazwah dan menanggalinya Sabtu, 15 Syawal 2 H; tanggal inilah yang dipakai untuk urutan waktu. Rincian 400 dan 300 orang diriwayatkan terbalik di beberapa sumber. Lokasi di peta adalah perkiraan kawasan Bani Qainuqa' di barat daya Masjid Nabawi."
      },
      // ---------------------------------------------------------------- 10
      {
        id: "uhud", no: 10, nama: "Perang Uhud", arab: "غزوة أحد",
        jenis: "pertempuran", tahun: 625, h: "3 H", bulan: "Syawal 3 H", tanggal: "Sabtu, pertengahan Syawal 3 H menurut Ibnu Ishaq; sebagian menyebut 7 Syawal (±23 Maret 625 M)", urutWaktu: 625.23,
        tempat: { nama: "Kaki Gunung Uhud dan Bukit Ar-Rumat, utara Madinah", lat: 24.503, lon: 39.612 },
        lok: "madinah", peristiwa: "uhud", tontonan: "uhud",
        lawan: "Quraisy dan sekutunya",
        muslim: { jumlah: 700, ket: "Berangkat sekitar 1.000 orang; Abdullah bin Ubay mundur bersama sekitar 300 orang, sehingga tersisa sekitar 700. Di antaranya 50 pemanah (HR. Bukhari 3039). Pasukan berkuda sangat sedikit, 2–4 kuda menurut beragam riwayat (Wikipedia)." },
        musuh: { jumlah: 3000, ket: "Sekitar 3.000 orang, 700 di antaranya berbaju besi. Kitab sirah (Ibnu Sa'd) menyebut 200 kuda, sedangkan infobox Wikipedia mencatat 100 penunggang kuda." },
        panglima: { muslim: ["nabi", "abdullahjubair", "mushab", "hamzah", "ali", "abudujanah", "thalhah", "zubair"], musuh: ["abusufyan", "khalid", "ikrimah", "amr", "Shafwan bin Umayyah", "Thalhah bin Abi Thalhah"] },
        panji: "Mush'ab bin Umair membawa panji kaum muslimin hingga gugur, lalu panji diambil Ali bin Abi Thalib (kitab sirah). Panji Quraisy dipegang Bani Abdud Dar, dimulai Thalhah bin Abi Thalhah",
        wakilMadinah: "Ibnu Ummi Maktum (Ibnu Hisyam)",
        korban: { muslim: 70, musuh: 22, ket: "Kaum muslimin: sekitar 70 syahid (HR. Bukhari 3986 dan 4078); daftar Ibnu Ishaq memuat 65 nama dan ada yang menyebut sampai 75. Di antaranya Hamzah, Mush'ab bin Umair, Abdullah bin Jubair, dan Hanzhalah. Quraisy: 22 tewas menurut Ibnu Ishaq; Wikipedia memberi rentang 22–35." },
        hasil: "Kaum muslimin unggul di awal, lalu terdesak setelah pemanah meninggalkan pos. Quraisy pulang tanpa menyerang Madinah.",
        ringkas: "Setahun setelah Badar, Quraisy datang membalas dengan sekitar 3.000 pasukan. Kaum muslimin unggul di awal, tetapi sebagian besar pemanah meninggalkan bukit, sehingga pasukan berkuda Khalid bin Walid memutar dan menyerang dari belakang. Sekitar 70 sahabat gugur, termasuk Hamzah, dan Nabi ﷺ terluka; Quraisy lalu pulang tanpa menyerang Madinah.",
        kronologi: [
          { judul: "Musyawarah dan berangkat", isi: "Nabi ﷺ bermusyawarah apakah bertahan di dalam kota atau keluar menghadapi musuh. Banyak sahabat, terutama yang muda dan yang tidak ikut Badar, ingin keluar. Pasukan berangkat sekitar 1.000 orang, tetapi di Asy-Syauth Abdullah bin Ubay pulang membawa sekitar sepertiga pasukan." },
          { judul: "Pemanah di Bukit Ar-Rumat", isi: "Nabi ﷺ menempatkan 50 pemanah di bawah Abdullah bin Jubair di sebuah bukit kecil dan berpesan, \"Tetaplah di tempat kalian, jangan tinggalkan meskipun kalian melihat burung-burung menyambar kami, sampai aku mengutus orang kepada kalian\" (HR. Bukhari 3039). Gunung Uhud berada di belakang pasukan muslim." },
          { judul: "Kaum muslimin unggul", isi: "Para pembawa panji Quraisy dari Bani Abdud Dar berjatuhan satu per satu. Abu Dujanah maju dengan pedang yang diserahkan Nabi ﷺ kepadanya (HR. Muslim 2470), dan barisan Quraisy terdesak hingga lari meninggalkan perkemahan (HR. Bukhari 4043)." },
          { judul: "Pemanah turun dari bukit", isi: "Melihat musuh lari, sebagian besar pemanah turun mengejar harta rampasan, meskipun Abdullah bin Jubair mengingatkan mereka. Khalid bin Walid memimpin pasukan berkuda Quraisy memutari bukit dan menyerang dari belakang; Abdullah bin Jubair dan segelintir pemanah yang bertahan gugur." },
          { judul: "Saat paling genting", isi: "Barisan muslim terpecah dan tersiar kabar bahwa Nabi ﷺ terbunuh. Beliau tetap bertahan, dikelilingi tujuh orang Anshar dan dua orang Quraisy (HR. Muslim 1789), dan terluka (HR. Muslim 1791). Hamzah gugur oleh tombak Wahsyi (HR. Bukhari 4072)." },
          { judul: "Berkumpul di lereng Uhud", isi: "Nabi ﷺ dan para sahabat naik ke lereng gunung. Abu Sufyan berseru memuji berhala Hubal, dan Nabi ﷺ menyuruh para sahabat menjawab, \"Allah lebih tinggi dan lebih agung\" (HR. Bukhari 3039). Quraisy kemudian pulang ke Mekah." },
          { judul: "Memakamkan para syuhada", isi: "Para syuhada dimakamkan di Uhud, dua orang dalam satu liang, tanpa dimandikan (HR. Bukhari 1343). Esok harinya Nabi ﷺ menyusul Quraisy sampai Hamra'ul Asad." }
        ],
        ayat: [
          { surah: "Ali 'Imran", no: "121", arab: "وَإِذْ غَدَوْتَ مِنْ أَهْلِكَ تُبَوِّئُ الْمُؤْمِنِينَ مَقَاعِدَ لِلْقِتَالِ", arti: "Dan (ingatlah) ketika engkau (Muhammad) berangkat pada pagi hari meninggalkan keluargamu untuk mengatur orang-orang beriman pada pos-pos pertempuran." },
          { surah: "Ali 'Imran", no: "152", arab: "حَتَّىٰ إِذَا فَشِلْتُمْ وَتَنَازَعْتُمْ فِي الْأَمْرِ وَعَصَيْتُمْ مِنْ بَعْدِ مَا أَرَاكُمْ مَا تُحِبُّونَ", arti: "...sampai pada saat kamu lemah dan berselisih dalam urusan itu dan mengabaikan perintah Rasul setelah Allah memperlihatkan kepadamu apa yang kamu sukai." }
        ],
        riwayat: [
          B(3039, "Al-Bara' bin Azib: 50 pemanah di bawah Abdullah bin Jubair, pesan agar tidak meninggalkan pos, dan dialog dengan Abu Sufyan di akhir pertempuran."),
          B(4043, "Al-Bara' bin Azib: penempatan pemanah dan larinya pasukan Quraisy di awal pertempuran."),
          B(3986, "Al-Bara' bin Azib: di Uhud tujuh puluh orang muslim gugur."),
          B(4078, "Anas: tujuh puluh orang Anshar syahid di Uhud."),
          M(1789, "Anas: di saat genting Nabi ﷺ hanya ditemani tujuh orang Anshar dan dua orang Quraisy."),
          M(1791, "Anas: Nabi ﷺ terluka di Uhud, lalu turun Ali 'Imran 128."),
          M(2470, "Anas: pedang Nabi ﷺ diambil Abu Dujanah untuk ditunaikan haknya."),
          B(4072, "kisah Wahsyi tentang gugurnya Hamzah dan kedatangannya kemudian kepada Nabi ﷺ."),
          B(1343, "Jabir: para syuhada Uhud dimakamkan dua orang dalam satu liang tanpa dimandikan."),
          S(IH + ", bab Perang Uhud."),
          S("Wikipedia: Battle of Uhud", W("Battle_of_Uhud"))
        ],
        catatan: "Tanggalnya diperselisihkan: Ibnu Ishaq menyebut Sabtu pertengahan Syawal 3 H, sedangkan sumber lain (dan Wikipedia) menyebut 7 Syawal, 23 Maret 625 M. Jumlah syuhada berkisar 65–75 dan korban Quraisy 22–35. Jumlah kuda Quraisy 200 menurut kitab sirah, 100 menurut infobox Wikipedia."
      },
      // ---------------------------------------------------------------- 11
      {
        id: "hamraulasad", no: 11, nama: "Ghazwah Hamra'ul Asad", arab: "غزوة حمراء الأسد",
        jenis: "tanpa-pertempuran", tahun: 625, h: "3 H", bulan: "Syawal 3 H", tanggal: "Ahad, sehari setelah Uhud (16 Syawal 3 H menurut hitungan Ibnu Ishaq)", urutWaktu: 625.24,
        tempat: { nama: "Hamra'ul Asad, sekitar 8 mil dari Madinah di jalan ke Mekah", lat: 24.37, lon: 39.5 },
        lok: null, peristiwa: null, tontonan: null,
        lawan: "Quraisy (Abu Sufyan)",
        muslim: { jumlah: null, ket: "Hanya mereka yang ikut Perang Uhud yang diizinkan berangkat, termasuk yang terluka; jumlah pastinya tidak tercatat. HR. Bukhari 4077 menyebut 70 orang, di antaranya Abu Bakar dan Az-Zubair, yang dipilih untuk menyusul musuh." },
        musuh: { jumlah: 3000, ket: "Pasukan Quraisy yang baru pulang dari Uhud dan berhenti di Ar-Rauha'; mereka tidak jadi kembali menyerang." },
        panglima: { muslim: ["nabi", "abubakar", "zubair"], musuh: ["abusufyan"] },
        wakilMadinah: "Ibnu Ummi Maktum (Ibnu Hisyam)",
        korban: { muslim: null, musuh: null, ket: "Tidak ada pertempuran. Menurut kitab sirah, Abu 'Azzah Al-Jumahi, tawanan Badar yang dulu dibebaskan dengan janji tidak lagi memerangi kaum muslimin, tertangkap dan dihukum mati." },
        hasil: "Quraisy mengurungkan niat menyerang kembali; wibawa kaum muslimin pulih.",
        ringkas: "Sehari setelah Uhud, Nabi ﷺ memerintahkan para sahabat yang ikut Uhud, walau banyak yang terluka, untuk menyusul pasukan Quraisy. Mereka berkemah tiga malam di Hamra'ul Asad. Abu Sufyan, yang sempat berniat kembali menyerang Madinah, membatalkannya setelah mendengar kabar kekuatan kaum muslimin dari Ma'bad Al-Khuza'i.",
        kronologi: [
          { judul: "Seruan menyusul musuh", isi: "Nabi ﷺ khawatir Quraisy kembali menyerang, lalu bertanya siapa yang mau menyusul mereka. Para sahabat yang terluka di Uhud menyambut seruan itu (HR. Bukhari 4077; Ali 'Imran 172)." },
          { judul: "Tiga malam di Hamra'ul Asad", isi: "Pasukan berkemah di Hamra'ul Asad dan, menurut kitab sirah, menyalakan banyak api unggun. Ma'bad bin Abi Ma'bad Al-Khuza'i menemui Abu Sufyan di Ar-Rauha' dan menggambarkan pasukan muslim sangat besar." },
          { judul: "Quraisy pulang", isi: "Abu Sufyan mengurungkan niatnya dan pulang ke Mekah. Nabi ﷺ kembali ke Madinah." }
        ],
        ayat: [
          { surah: "Ali 'Imran", no: "172", arab: "الَّذِينَ اسْتَجَابُوا لِلَّهِ وَالرَّسُولِ مِنْ بَعْدِ مَا أَصَابَهُمُ الْقَرْحُ", arti: "(Yaitu) orang-orang yang menaati (perintah) Allah dan Rasul setelah mereka mendapat luka." }
        ],
        riwayat: [
          B(4077, "Aisyah tentang Ali 'Imran 172: setelah Uhud Nabi ﷺ memilih 70 orang, di antaranya Abu Bakar dan Az-Zubair, untuk menyusul kaum musyrikin."),
          S(IH + ", bab Ghazwah Hamra'ul Asad."),
          S("Wikipedia: Battle of Hamra al-Asad", W("Battle_of_Hamra_al-Asad"))
        ],
        catatan: "Wikipedia menanggalinya 8 Syawal 3 H karena mengikuti tanggal Uhud 7 Syawal. Pasukan tinggal tiga malam menurut Ibnu Ishaq, lima malam menurut Ibnu Sa'd (Wikipedia). Koordinat Hamra'ul Asad adalah perkiraan."
      },
      // ---------------------------------------------------------------- 12
      {
        id: "bnnadhir", no: 12, nama: "Pengepungan Bani Nadhir", arab: "غزوة بني النضير",
        jenis: "pengepungan", tahun: 625, h: "4 H", bulan: "Rabi'ul Awwal 4 H", tanggal: "Rabi'ul Awwal 4 H menurut Ibnu Ishaq (625 M)", urutWaktu: 625.6,
        tempat: { nama: "Perkampungan Bani Nadhir di Al-'Aliyah, tenggara Madinah", lat: 24.443, lon: 39.628 },
        lok: "madinah", peristiwa: null, tontonan: null,
        lawan: "Bani Nadhir (kabilah Yahudi Madinah)",
        muslim: { jumlah: null, ket: "Jumlah pasukan tidak tercatat dalam kitab sirah." },
        musuh: { jumlah: null, ket: "Jumlahnya tidak tercatat; mereka bertahan di dalam benteng-benteng mereka." },
        panglima: { muslim: ["nabi", "ali"], musuh: ["huyay"] },
        panji: "Ali bin Abi Thalib (Wikipedia)",
        wakilMadinah: "Ibnu Ummi Maktum (Ibnu Hisyam)",
        korban: { muslim: null, musuh: null, ket: "Hampir tanpa pertempuran; tidak ada korban berarti yang tercatat." },
        hasil: "Bani Nadhir menyerah dan diusir; mereka boleh membawa harta yang dapat diangkut unta, kecuali senjata. Sebagian besar pindah ke Khaibar dan sebagian ke Syam.",
        ringkas: "Bani Nadhir dituduh berencana membunuh Nabi ﷺ ketika beliau datang ke perkampungan mereka untuk urusan diyat. Nabi ﷺ mengepung benteng mereka sekitar enam malam dan sebagian kebun kurma mereka ditebang, lalu mereka menyerah dan diusir dari Madinah. Surah Al-Hasyr turun tentang peristiwa ini.",
        kronologi: [
          { judul: "Rencana di balik dinding", isi: "Nabi ﷺ datang ke Bani Nadhir meminta bantuan membayar diyat dua orang Bani Amir. Menurut Ibnu Ishaq, ketika beliau duduk di sisi dinding rumah mereka, sebagian dari mereka bersepakat menjatuhkan batu ke atas beliau. Nabi ﷺ diberi tahu lewat wahyu dan segera kembali ke Madinah." },
          { judul: "Pengepungan", isi: "Bani Nadhir menolak pergi karena dijanjikan bantuan oleh Abdullah bin Ubay (Al-Hasyr 11). Nabi ﷺ mengepung benteng mereka sekitar enam malam, dan sebagian pohon kurma mereka di Al-Buwairah ditebang dan dibakar (HR. Bukhari 4031; Al-Hasyr 5)." },
          { judul: "Pengusiran", isi: "Bantuan yang dijanjikan tidak datang. Bani Nadhir menyerah dan pergi; pemuka mereka seperti Huyay bin Akhthab pindah ke Khaibar. Ibnu Abbas menyebut Surah Al-Hasyr sebagai Surah Bani Nadhir (HR. Bukhari 4029)." }
        ],
        ayat: [
          { surah: "Al-Hasyr", no: "2", arab: "هُوَ الَّذِي أَخْرَجَ الَّذِينَ كَفَرُوا مِنْ أَهْلِ الْكِتَابِ مِنْ دِيَارِهِمْ لِأَوَّلِ الْحَشْرِ", arti: "Dialah yang mengeluarkan orang-orang kafir di antara Ahli Kitab dari kampung halamannya pada saat pengusiran yang pertama." },
          { surah: "Al-Hasyr", no: "5", arab: "مَا قَطَعْتُمْ مِنْ لِينَةٍ أَوْ تَرَكْتُمُوهَا قَائِمَةً عَلَىٰ أُصُولِهَا فَبِإِذْنِ اللَّهِ", arti: "Apa yang kamu tebang di antara pohon kurma atau yang kamu biarkan berdiri di atas pokoknya, maka (itu terjadi) dengan izin Allah." }
        ],
        riwayat: [
          B(4031, "Ibnu Umar: Rasulullah ﷺ membakar dan menebang pohon kurma Bani Nadhir di Al-Buwairah."),
          B(4029, "Sa'id bin Jubair: Ibnu Abbas berkata, \"Sebutlah Surah An-Nadhir\" untuk Surah Al-Hasyr."),
          B(4028, "Ibnu Umar: Nabi ﷺ mengusir Bani Nadhir dan membiarkan Bani Quraizhah tetap tinggal."),
          S(IH + ", bab Pengusiran Bani Nadhir."),
          S("Wikipedia: Invasion of Banu Nadir", W("Invasion_of_Banu_Nadir"))
        ],
        catatan: "Ibnu Ishaq menanggalinya Rabi'ul Awwal 4 H. Riwayat 'Urwah bin Az-Zubair (diriwayatkan Al-Hakim dan Al-Baihaqi) menyebutnya enam bulan setelah Badar, sebelum Uhud; dalam salah satu jalurnya penyebutan Aisyah dinilai tidak terpelihara (dorar.net). Lama pengepungan enam malam menurut Ibnu Ishaq, lima belas malam menurut riwayat lain. Lokasi di peta adalah perkiraan."
      },
      // ---------------------------------------------------------------- 13
      {
        id: "dzaturriqa", no: 13, nama: "Ghazwah Dzatur Riqa'", arab: "غزوة ذات الرقاع",
        jenis: "tanpa-pertempuran", tahun: 625, h: "4 H", bulan: "Jumadil Ula 4 H", tanggal: "Jumadil Ula 4 H menurut Ibnu Ishaq (diperselisihkan, lihat catatan)", urutWaktu: 625.78,
        tempat: { nama: "Nakhl, Najd", lat: 24.9, lon: 40.5 },
        lok: null, peristiwa: null, tontonan: null,
        lawan: "Bani Muharib dan Bani Tsa'labah (Ghathafan)",
        muslim: { jumlah: 400, ket: "400 orang menurut Ibnu Sa'd; ada yang menyebut 700 atau 800 (Wikipedia)." },
        musuh: { jumlah: null, ket: "Disebut sebagai himpunan besar Ghathafan; jumlahnya tidak tercatat." },
        panglima: { muslim: ["nabi"], musuh: [] },
        wakilMadinah: "Abu Dzar Al-Ghifari, atau Utsman bin Affan (Ibnu Hisyam)",
        korban: TANPA,
        hasil: "Kedua pasukan berhadapan tanpa bertempur; kabilah-kabilah Ghathafan mundur.",
        ringkas: "Nabi ﷺ memimpin pasukan ke Najd menghadapi kabilah Ghathafan. Kedua pihak berhadapan tetapi tidak bertempur, dan dalam ghazwah ini Nabi ﷺ mengerjakan shalat khauf. Namanya berasal dari kain-kain (riqa') yang dibalutkan para sahabat ke kaki mereka yang luka karena berjalan jauh.",
        kronologi: [
          { judul: "Perjalanan berat ke Najd", isi: "Abu Musa Al-Asy'ari menceritakan, enam orang bergantian menunggang seekor unta hingga kaki mereka luka, lalu mereka membalut kaki dengan kain; karena itu ghazwah ini dinamai Dzatur Riqa' (HR. Bukhari 4128)." },
          { judul: "Shalat khauf", isi: "Ketika berhadapan dengan musuh, Nabi ﷺ shalat bersama satu kelompok sementara kelompok lain berjaga, lalu kedua kelompok bergantian (HR. Bukhari 4129)." },
          { judul: "Pedang di bawah pohon", isi: "Saat beristirahat siang, Nabi ﷺ menggantungkan pedangnya di pohon dan tertidur. Seorang Badui mengambil pedang itu dan bertanya siapa yang dapat melindungi beliau; beliau menjawab, \"Allah.\" Nabi ﷺ tidak menghukumnya (HR. Bukhari 4135)." }
        ],
        ayat: [
          { surah: "An-Nisa'", no: "102", arab: "وَإِذَا كُنْتَ فِيهِمْ فَأَقَمْتَ لَهُمُ الصَّلَاةَ فَلْتَقُمْ طَائِفَةٌ مِنْهُمْ مَعَكَ", arti: "Dan apabila engkau (Muhammad) berada di tengah-tengah mereka lalu engkau hendak melaksanakan salat bersama mereka, maka hendaklah segolongan dari mereka berdiri (salat) bersamamu." }
        ],
        riwayat: [
          B(4128, "Abu Musa Al-Asy'ari: enam orang dengan satu unta, kaki dibalut kain, asal nama Dzatur Riqa'."),
          B(4129, "Shalih bin Khawwat dari sahabat yang ikut: tata cara shalat khauf pada hari Dzatur Riqa'."),
          B(4135, "Jabir bin Abdullah: kisah pedang Nabi ﷺ yang diambil seorang Badui dalam ghazwah ke arah Najd."),
          B(4230, "Abu Musa Al-Asy'ari: rombongannya tiba menemui Nabi ﷺ saat Khaibar ditaklukkan."),
          S(IH + ", bab Ghazwah Dzatur Riqa'."),
          S("Wikipedia: Expedition of Dhat al-Riqa", W("Expedition_of_Dhat_al-Riqa"))
        ],
        catatan: "Waktunya diperselisihkan. Ibnu Ishaq: Jumadil Ula 4 H; Al-Waqidi dan Ibnu Sa'd: Muharram 5 H. Sejumlah ulama, di antaranya Mubarakfuri dalam Ar-Rahiq Al-Makhtum (Wikipedia), berpendapat ghazwah ini terjadi setelah Khaibar (7 H), karena Abu Musa Al-Asy'ari yang baru tiba saat Khaibar (HR. Bukhari 4230) ikut di dalamnya (HR. Bukhari 4128). Di sini dipakai urutan dan tanggal Ibnu Ishaq. Letak Nakhl adalah perkiraan."
      },
      // ---------------------------------------------------------------- 14
      {
        id: "badarakhir", no: 14, nama: "Ghazwah Badar Al-Akhirah (Badar Al-Mau'id)", arab: "غزوة بدر الآخرة (بدر الموعد)",
        jenis: "tanpa-pertempuran", tahun: 626, h: "4 H", bulan: "Sya'ban 4 H", tanggal: "Sya'ban 4 H menurut Ibnu Ishaq (626 M)", urutWaktu: 626.02,
        tempat: { nama: "Badar", lat: 23.73, lon: 38.78 },
        lok: "badar", peristiwa: null, tontonan: null,
        lawan: "Quraisy (tidak datang)",
        muslim: { jumlah: 1500, kuda: 10, ket: "1.500 orang dengan 10 kuda (Wikipedia, dari kitab sirah)." },
        musuh: { jumlah: 2000, ket: "Abu Sufyan berangkat dengan sekitar 2.000 orang dan 50 kuda, tetapi berbalik pulang dari Majannah, dekat Marr Azh-Zhahran (Wikipedia)." },
        panglima: { muslim: ["nabi", "ali"], musuh: ["abusufyan"] },
        panji: "Ali bin Abi Thalib (Wikipedia)",
        wakilMadinah: "Abdullah bin Abdullah bin Ubay menurut Ibnu Hisyam; Abdullah bin Rawahah menurut sumber lain (Wikipedia)",
        korban: TANPA,
        hasil: "Quraisy tidak datang; kaum muslimin berdagang di pasar Badar lalu pulang, dan wibawa mereka pulih.",
        ringkas: "Saat meninggalkan Uhud, Abu Sufyan menantang bertemu lagi di Badar tahun berikutnya. Nabi ﷺ datang menepati janji dengan 1.500 orang dan menunggu delapan malam, tetapi Quraisy berbalik pulang di tengah jalan dengan alasan musim paceklik.",
        kronologi: [
          { judul: "Janji di Uhud", isi: "Saat meninggalkan Uhud, Abu Sufyan berseru bahwa mereka akan bertemu lagi di Badar tahun depan, dan Nabi ﷺ menerima tantangan itu." },
          { judul: "Menunggu di Badar", isi: "Pada Sya'ban 4 H, Nabi ﷺ berangkat dengan 1.500 orang dan menunggu delapan malam di Badar. Abu Sufyan keluar dengan sekitar 2.000 orang, tetapi berbalik dari Majannah." },
          { judul: "Pulang dengan nikmat", isi: "Kaum muslimin berdagang di pasar musiman Badar lalu pulang. Banyak mufassir mengaitkan Ali 'Imran 173–174 dengan peristiwa ini atau dengan Hamra'ul Asad." }
        ],
        ayat: [
          { surah: "Ali 'Imran", no: "173", arab: "فَزَادَهُمْ إِيمَانًا وَقَالُوا حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ", arti: "...ternyata (ucapan) itu menambah (kuat) iman mereka dan mereka menjawab, \"Cukuplah Allah (menjadi penolong) bagi kami dan Dia sebaik-baik pelindung.\"" },
          { surah: "Ali 'Imran", no: "174", arab: "فَانْقَلَبُوا بِنِعْمَةٍ مِنَ اللَّهِ وَفَضْلٍ لَمْ يَمْسَسْهُمْ سُوءٌ", arti: "Maka mereka kembali dengan nikmat dan karunia (yang besar) dari Allah, mereka tidak ditimpa suatu bencana." }
        ],
        riwayat: [
          B(4563, "Ibnu Abbas: \"Hasbunallah wa ni'mal wakil\" diucapkan Ibrahim saat dilemparkan ke api, dan diucapkan Nabi Muhammad ﷺ ketika dikatakan bahwa orang-orang telah berkumpul untuk menyerang."),
          S(IH + ", bab Ghazwah Badar Al-Akhirah."),
          S("Wikipedia: Expedition of Badr al-Maw'id", W("Expedition_of_Badr_al-Maw%27id"))
        ],
        catatan: "Ibnu Ishaq menanggalinya Sya'ban 4 H; Wikipedia menyebut Oktober 625 M (artikelnya) atau April 626 M (daftar ekspedisi, mengikuti Watt). Ali 'Imran 173–174 dikaitkan sebagian mufassir dengan Hamra'ul Asad dan sebagian lagi dengan Badar Al-Akhirah."
      },
      // ---------------------------------------------------------------- 15
      {
        id: "dumatuljandal", no: 15, nama: "Ghazwah Dumatul Jandal", arab: "غزوة دومة الجندل",
        jenis: "tanpa-pertempuran", tahun: 626, h: "5 H", bulan: "Rabi'ul Awwal 5 H", tanggal: "Rabi'ul Awwal 5 H (±Agustus 626 M)", urutWaktu: 626.6,
        tempat: { nama: "Dumatul Jandal (Al-Jauf), di perbatasan Syam", lat: 29.811, lon: 39.868 },
        lok: null, peristiwa: null, tontonan: null,
        lawan: "Kabilah-kabilah di sekitar Dumatul Jandal",
        muslim: { jumlah: 1000, ket: "1.000 orang (Wikipedia, dari Ar-Rahiq Al-Makhtum)." },
        musuh: { jumlah: null, ket: "Jumlahnya tidak tercatat; mereka bubar sebelum pasukan tiba." },
        panglima: { muslim: ["nabi"], musuh: [] },
        wakilMadinah: "Siba' bin Urfuthah Al-Ghifari (Ibnu Hisyam)",
        korban: TANPA,
        hasil: "Musuh bubar; pasukan mengambil ternak yang ditinggalkan lalu pulang tanpa pertempuran.",
        ringkas: "Kabar sampai ke Madinah bahwa kabilah-kabilah di Dumatul Jandal, di perbatasan Syam, merampok para musafir dan bersiap mendekati Madinah. Nabi ﷺ berangkat dengan 1.000 orang dalam perjalanan jauh ke utara, tetapi musuh bubar sebelum pasukan tiba.",
        kronologi: [
          { judul: "Perjalanan ke utara", isi: "Nabi ﷺ berangkat pada Rabi'ul Awwal 5 H dengan dipandu seorang dari Bani Udzrah. Perjalanan ke Dumatul Jandal memakan waktu sekitar lima belas hari (Wikipedia)." },
          { judul: "Musuh bubar", isi: "Kabilah-kabilah itu melarikan diri. Pasukan mengambil ternak dan penggembala yang tertinggal, lalu pulang ke Madinah tanpa pertempuran." }
        ],
        riwayat: [
          S(IH + ", bab Ghazwah Dumatul Jandal."),
          S("Wikipedia: Expedition of Dumat al-Jandal", W("Expedition_of_Dumat_al-Jandal"))
        ],
        catatan: "Ibnu Ishaq menyebut Nabi ﷺ pulang sebelum benar-benar sampai, sedangkan Ibnu Sa'd dan Ar-Rahiq menyebut pasukan tiba dan mendapati musuh sudah bubar. Ini ghazwah terjauh ke utara sebelum Tabuk."
      },
      // ---------------------------------------------------------------- 16
      {
        id: "khandaq", no: 16, nama: "Perang Khandaq (Al-Ahzab)", arab: "غزوة الخندق (الأحزاب)",
        jenis: "pengepungan", tahun: 627, h: "5 H", bulan: "Syawal 5 H", tanggal: "Syawal 5 H menurut Ibnu Ishaq (awal 627 M)", urutWaktu: 627.17,
        tempat: { nama: "Parit di utara Madinah, sekitar Jabal Sal'", lat: 24.478, lon: 39.597 },
        lok: "madinah", peristiwa: "khandaq", tontonan: "khandaq",
        lawan: "Al-Ahzab (pasukan sekutu): Quraisy, Ghathafan, Bani Sulaim, Bani Asad, dan lainnya; Bani Quraizhah membatalkan perjanjian",
        muslim: { jumlah: 3000, ket: "Sekitar 3.000 orang (Ibnu Ishaq; Wikipedia)." },
        musuh: { jumlah: 10000, ket: "Sekitar 10.000 orang (Ibnu Ishaq; Wikipedia) dengan sekitar 600 penunggang kuda menurut Wikipedia. Di antaranya Quraisy dan sekutunya di bawah Abu Sufyan, Ghathafan (Fazarah di bawah Uyainah bin Hishn, Murrah 400 orang, dan Asyja'), Bani Sulaim sekitar 700 orang, dan Bani Asad. Perkiraan modern berkisar 7.500 sampai lebih dari 12.000." },
        panglima: { muslim: ["nabi", "ali", "zubair", "saadmuadz", "saadubadah"], musuh: ["abusufyan", "Uyainah bin Hishn Al-Fazari", "huyay", "amrabdwudd", "ikrimah"] },
        wakilMadinah: "Ibnu Ummi Maktum (Ibnu Hisyam)",
        korban: { muslim: 6, musuh: 3, ket: "Kaum muslimin: 6 syahid menurut Ibnu Ishaq, termasuk Sa'ad bin Mu'adz yang wafat setelah pengepungan Bani Quraizhah karena luka panah di Khandaq (HR. Bukhari 4122). Pasukan sekutu: 3 tewas, di antaranya Amr bin Abd Wudd." },
        hasil: "Pengepungan gagal; pasukan sekutu bubar karena angin kencang dan saling curiga. Sejak itu Quraisy tidak lagi menyerang Madinah.",
        ringkas: "Sekitar 10.000 pasukan gabungan (Al-Ahzab) yang dihimpun Quraisy, Ghathafan, dan pemuka Bani Nadhir mengepung Madinah. Kaum muslimin menggali parit di sisi utara kota yang terbuka dan bertahan di baliknya selama dua puluh sekian malam. Pasukan sekutu akhirnya bubar setelah diterpa angin dingin yang kencang dan pecah karena saling curiga.",
        kronologi: [
          { judul: "Pasukan sekutu dihimpun", isi: "Pemuka Bani Nadhir yang terusir ke Khaibar, di antaranya Huyay bin Akhthab, mendatangi Quraisy dan Ghathafan untuk bersekutu menyerang Madinah. Terkumpullah sekitar 10.000 pasukan." },
          { judul: "Menggali parit", isi: "Kaum muslimin menggali parit di sisi utara Madinah yang terbuka; menurut kitab sirah gagasan ini datang dari Salman Al-Farisi. Nabi ﷺ ikut menggali di pagi yang dingin sambil bersyair, \"Ya Allah, kehidupan sejati adalah kehidupan akhirat; ampunilah kaum Anshar dan Muhajirin\" (HR. Bukhari 4099). Ketika para sahabat menemui batu keras, beliau sendiri turun memecahkannya, padahal sudah tiga hari belum makan (HR. Bukhari 4101)." },
          { judul: "Pengepungan dan pengkhianatan", isi: "Pasukan sekutu tertahan di depan parit. Huyay membujuk Ka'ab bin Asad, pemimpin Bani Quraizhah, membatalkan perjanjian dengan kaum muslimin, sehingga Madinah terancam dari dalam. Aisyah menegaskan bahwa Al-Ahzab 10, \"ketika mereka datang kepadamu dari atas dan dari bawahmu\", berbicara tentang hari Khandaq (HR. Bukhari 4103)." },
          { judul: "Amr bin Abd Wudd menyeberang", isi: "Beberapa penunggang kuda Quraisy menemukan bagian parit yang sempit dan menyeberang. Amr bin Abd Wudd menantang duel dan tewas di tangan Ali bin Abi Thalib (kitab sirah). Hari itu kaum muslimin begitu sibuk hingga shalat Ashar tertunda sampai matahari terbenam (HR. Bukhari 4111)." },
          { judul: "Nu'aim memecah sekutu", isi: "Nu'aim bin Mas'ud dari Ghathafan diam-diam masuk Islam. Atas izin Nabi ﷺ, ia menanamkan saling curiga antara Bani Quraizhah dan pasukan sekutu, sehingga kerja sama mereka berantakan (kitab sirah)." },
          { judul: "Angin dan kepulangan sekutu", isi: "Allah mengirim angin dingin yang kencang (Al-Ahzab 9). Nabi ﷺ bersabda, \"Aku ditolong dengan angin timur (shaba)\" (HR. Bukhari 4105). Hudzaifah diutus mengintai di malam yang sangat dingin dan melihat Abu Sufyan menghangatkan punggungnya di dekat api (HR. Muslim 1788). Pagi harinya pasukan sekutu telah pergi, dan Nabi ﷺ bersabda bahwa mulai saat itu kaum musliminlah yang akan mendatangi mereka (HR. Bukhari 4110)." }
        ],
        ayat: [
          { surah: "Al-Ahzab", no: "9", arab: "إِذْ جَاءَتْكُمْ جُنُودٌ فَأَرْسَلْنَا عَلَيْهِمْ رِيحًا وَجُنُودًا لَمْ تَرَوْهَا", arti: "...ketika bala tentara datang kepadamu, lalu Kami kirimkan kepada mereka angin topan dan bala tentara yang tidak dapat terlihat olehmu." },
          { surah: "Al-Ahzab", no: "10", arab: "إِذْ جَاءُوكُمْ مِنْ فَوْقِكُمْ وَمِنْ أَسْفَلَ مِنْكُمْ", arti: "(Yaitu) ketika mereka datang kepadamu dari atas dan dari bawahmu." },
          { surah: "Al-Ahzab", no: "25", arab: "وَرَدَّ اللَّهُ الَّذِينَ كَفَرُوا بِغَيْظِهِمْ لَمْ يَنَالُوا خَيْرًا وَكَفَى اللَّهُ الْمُؤْمِنِينَ الْقِتَالَ", arti: "Dan Allah menghalau orang-orang kafir itu dalam keadaan penuh kejengkelan, mereka tidak memperoleh keuntungan apa pun. Cukuplah Allah yang menghindarkan orang-orang mukmin dari peperangan." }
        ],
        riwayat: [
          B(4099, "Anas: kaum Muhajirin dan Anshar menggali parit di pagi yang dingin, dan syair Nabi ﷺ."),
          B(4101, "Jabir: batu keras di parit, Nabi ﷺ memecahkannya, dan jamuan di rumah Jabir."),
          B(4103, "Aisyah: Al-Ahzab 10 terjadi pada hari Khandaq."),
          B(4105, "Ibnu Abbas: \"Aku ditolong dengan angin shaba.\""),
          B(4110, "Sulaiman bin Shurad: sabda Nabi ﷺ setelah Al-Ahzab pergi, \"Sekarang kita yang akan mendatangi mereka.\""),
          B(4111, "Ali: pada hari Khandaq kaum musyrikin menyibukkan kaum muslimin dari shalat wustha (Ashar) hingga matahari terbenam."),
          B(4122, "Aisyah: Sa'ad bin Mu'adz terkena panah pada hari Khandaq."),
          B(4097, "Ibnu Umar: ditolak ikut perang saat Uhud pada usia 14 tahun dan diterima saat Khandaq pada usia 15 tahun."),
          M(1788, "Hudzaifah diutus mengintai pasukan Al-Ahzab di malam yang dingin."),
          S(IH + ", bab Perang Khandaq."),
          S("Wikipedia: Battle of the Trench", W("Battle_of_the_Trench"))
        ],
        catatan: "Ibnu Ishaq menanggalinya Syawal 5 H, dan ini pendapat mayoritas; Musa bin Uqbah menyebut Syawal 4 H. Sebagian berdalil dengan HR. Bukhari 4097 (Ibnu Umar 14 tahun saat Uhud dan 15 tahun saat Khandaq) yang tampak menunjukkan jarak setahun; ulama yang memilih 5 H menjelaskan bahwa saat Uhud ia baru memasuki usia 14, sedangkan saat Khandaq sudah melewati 15. Lama pengepungan disebut dua puluh sekian malam, hampir sebulan (Ibnu Ishaq); Wikipedia mencatat 20 malam ditambah enam hari penggalian. Kisah usulan Salman dan duel Amr bin Abd Wudd berasal dari kitab sirah, bukan dari Shahih Bukhari atau Muslim."
      },
      // ---------------------------------------------------------------- 17
      {
        id: "quraizhah", no: 17, nama: "Pengepungan Bani Quraizhah", arab: "غزوة بني قريظة",
        jenis: "pengepungan", tahun: 627, h: "5 H", bulan: "Dzulqa'dah 5 H", tanggal: "Dzulqa'dah 5 H, langsung setelah Khandaq (627 M)", urutWaktu: 627.25,
        tempat: { nama: "Perkampungan Bani Quraizhah, tenggara Madinah", lat: 24.445, lon: 39.635 },
        lok: "madinah", peristiwa: "quraizhah", tontonan: null,
        lawan: "Bani Quraizhah (kabilah Yahudi Madinah)",
        muslim: { jumlah: 3000, kuda: 30, ket: "Sekitar 3.000 orang dengan 30 penunggang kuda (Wikipedia)." },
        musuh: { jumlah: 600, ket: "Laki-laki dewasa Bani Quraizhah sekitar 600–700 menurut Ibnu Ishaq (ada yang menyebut 800–900); HR. Tirmidzi 1582 dari Jabir menyebut 400. Infobox Wikipedia mencantumkan 1.000." },
        panglima: { muslim: ["nabi", "ali", "saadmuadz"], musuh: ["kaabasad", "huyay"] },
        panji: "Ali bin Abi Thalib (kitab sirah)",
        wakilMadinah: "Ibnu Ummi Maktum (Ibnu Hisyam)",
        korban: { muslim: 2, musuh: null, ket: "Kaum muslimin: 2 orang selama pengepungan (Wikipedia, dari Ibnu Ishaq). Setelah menyerah, Bani Quraizhah menerima keputusan Sa'ad bin Mu'adz: pasukan tempurnya dihukum mati, sedangkan perempuan dan anak-anak ditawan (HR. Bukhari 4121). Jumlah yang dihukum berbeda antar riwayat: 400 (HR. Tirmidzi 1582) hingga 600–900 (Ibnu Ishaq)." },
        hasil: "Bani Quraizhah menyerah setelah dikepung sekitar 25 malam; hukumannya diputuskan Sa'ad bin Mu'adz, pemimpin Aus yang dulu menjadi sekutu mereka.",
        ringkas: "Sepulang dari Khandaq, Nabi ﷺ diperintahkan menuju Bani Quraizhah, yang membatalkan perjanjian di saat genting pengepungan. Setelah dikepung sekitar 25 malam, mereka menyerah dan bersedia menerima keputusan Sa'ad bin Mu'adz, pemimpin Aus. Nabi ﷺ menyatakan keputusan Sa'ad sesuai dengan hukum Allah.",
        kronologi: [
          { judul: "Perintah setelah Khandaq", isi: "Ketika Nabi ﷺ baru meletakkan senjata dan mandi sepulang dari Khandaq, Jibril datang dan berkata bahwa para malaikat belum meletakkan senjata, lalu menunjuk ke arah Bani Quraizhah (HR. Bukhari 4117)." },
          { judul: "Shalat Ashar di Bani Quraizhah", isi: "Nabi ﷺ berpesan, \"Janganlah seorang pun shalat Ashar kecuali di perkampungan Bani Quraizhah.\" Sebagian sahabat shalat di jalan dan sebagian menunggu sampai tiba; Nabi ﷺ tidak mencela kedua kelompok itu (HR. Bukhari 4119)." },
          { judul: "Pengepungan", isi: "Benteng Bani Quraizhah dikepung sekitar 25 malam. Pemimpin mereka, Ka'ab bin Asad, menawarkan beberapa jalan keluar kepada kaumnya, tetapi semuanya ditolak. Menurut Ibnu Ishaq, Abu Lubabah yang mereka mintai pendapat memberi isyarat tentang nasib mereka, lalu menyesal dan mengikat dirinya di tiang Masjid Nabawi sampai tobatnya diterima." },
          { judul: "Keputusan Sa'ad bin Mu'adz", isi: "Mereka menyerah dan bersedia menerima keputusan Sa'ad bin Mu'adz, yang sedang dirawat karena luka panah di Khandaq. Nabi ﷺ bersabda, \"Berdirilah untuk pemimpin kalian.\" Sa'ad memutuskan pasukan tempur mereka dihukum mati dan keluarga mereka ditawan, dan Nabi ﷺ bersabda bahwa keputusan itu sesuai dengan hukum Allah (HR. Bukhari 4121)." },
          { judul: "Wafatnya Sa'ad", isi: "Tak lama kemudian luka Sa'ad kembali terbuka dan ia wafat (HR. Bukhari 4122). Al-Ahzab 26 menyebut bahwa Allah menurunkan Ahli Kitab yang membantu pasukan sekutu dari benteng-benteng mereka." }
        ],
        ayat: [
          { surah: "Al-Ahzab", no: "26", arab: "وَأَنْزَلَ الَّذِينَ ظَاهَرُوهُمْ مِنْ أَهْلِ الْكِتَابِ مِنْ صَيَاصِيهِمْ", arti: "Dan Dia menurunkan orang-orang Ahli Kitab yang membantu golongan-golongan yang bersekutu itu dari benteng-benteng mereka." }
        ],
        riwayat: [
          B(4117, "Aisyah: Jibril datang setelah Nabi ﷺ pulang dari Khandaq dan meletakkan senjata, lalu menunjuk ke arah Bani Quraizhah."),
          B(4119, "Ibnu Umar: pesan agar tidak shalat Ashar kecuali di Bani Quraizhah."),
          B(4121, "Abu Sa'id Al-Khudri: Bani Quraizhah menerima keputusan Sa'ad bin Mu'adz, dan Nabi ﷺ membenarkan keputusannya."),
          B(4122, "Aisyah: luka Sa'ad di Khandaq, keputusannya, dan wafatnya."),
          { derajat: "shahih", sumber: "HR. Tirmidzi no. 1582: Jabir menyebut jumlah laki-laki Bani Quraizhah yang dihukum 400 orang (dinilai hasan shahih oleh At-Tirmidzi).", url: sn("tirmidhi", 1582) },
          S(IH + ", bab Ghazwah Bani Quraizhah."),
          S("Wikipedia: Siege of Banu Qurayza", W("Siege_of_Banu_Qurayza"))
        ],
        catatan: "Jumlah laki-laki yang dihukum berbeda antar sumber: 400 menurut HR. Tirmidzi 1582; 600–700, bahkan 800–900, menurut Ibnu Ishaq; 700–800 menurut Ibnu Katsir. Sebagian sejarawan modern mempersoalkan angka-angka ini. Kisah Abu Lubabah diriwayatkan Ibnu Ishaq; Wikipedia mencatat ia terikat di tiang selama enam malam."
      },
      // ---------------------------------------------------------------- 18
      {
        id: "lihyan", no: 18, nama: "Ghazwah Bani Lihyan", arab: "غزوة بني لحيان",
        jenis: "tanpa-pertempuran", tahun: 627, h: "6 H", bulan: "Jumadil Ula 6 H", tanggal: "Jumadil Ula 6 H menurut Ibnu Ishaq; Rabi'ul Awwal 6 H menurut Ibnu Sa'd (627 M)", urutWaktu: 627.7,
        tempat: { nama: "Lembah Gharran, antara Amaj dan 'Usfan", lat: 22.05, lon: 39.33 },
        lok: null, peristiwa: null, tontonan: null,
        lawan: "Bani Lihyan (Hudzail)",
        muslim: { jumlah: 200, ket: "200 orang (Wikipedia, dari Ar-Rahiq Al-Makhtum)." },
        musuh: { jumlah: null, ket: "Jumlahnya tidak tercatat; mereka mengungsi ke puncak-puncak bukit." },
        panglima: { muslim: ["nabi"], musuh: [] },
        wakilMadinah: "Ibnu Ummi Maktum (Ibnu Hisyam)",
        korban: TANPA,
        hasil: "Bani Lihyan melarikan diri; pasukan pulang tanpa pertempuran setelah sekitar 14 hari.",
        ringkas: "Nabi ﷺ bergerak untuk menuntut balas atas pembunuhan para sahabat di Ar-Raji' oleh Bani Lihyan. Untuk mengecoh, beliau mula-mula berjalan seolah menuju Syam, lalu berbelok cepat ke selatan. Bani Lihyan telanjur mengungsi ke bukit-bukit, sehingga tidak terjadi pertempuran.",
        kronologi: [
          { judul: "Mengecoh arah", isi: "Sekitar enam bulan setelah Quraizhah, Nabi ﷺ keluar dari Madinah seolah hendak ke Syam agar Bani Lihyan tidak waspada, lalu berbelok cepat menuju wilayah mereka di Gharran." },
          { judul: "Gharran dan Kura' Al-Ghamim", isi: "Bani Lihyan sudah mengungsi ke puncak-puncak bukit. Nabi ﷺ kemudian bergerak ke arah 'Usfan dan mengirim sepuluh penunggang kuda hingga Kura' Al-Ghamim agar Quraisy mendengar kedatangan beliau, lalu pulang ke Madinah." }
        ],
        riwayat: [
          S(IH + ", bab Ghazwah Bani Lihyan."),
          S("Wikipedia: Invasion of Banu Lahyan", W("Invasion_of_Banu_Lahyan"))
        ],
        catatan: "Ibnu Ishaq menyebut Jumadil Ula 6 H; Ibnu Sa'd menyebut Rabi'ul Awwal 6 H. Peristiwa Ar-Raji' sendiri terjadi sekitar 4 H. Koordinat Gharran adalah perkiraan."
      },
      // ---------------------------------------------------------------- 19
      {
        id: "dzuqarad", no: 19, nama: "Ghazwah Dzu Qarad (Al-Ghabah)", arab: "غزوة ذي قرد (الغابة)",
        jenis: "tanpa-pertempuran", tahun: 627, h: "6 H", bulan: "Jumadil Akhirah 6 H", tanggal: "Beberapa malam setelah Ghazwah Bani Lihyan menurut Ibnu Ishaq (6 H); tiga malam sebelum Khaibar menurut HR. Muslim (7 H)", urutWaktu: 627.78,
        tempat: { nama: "Mata air Dzu Qarad, sekitar sehari perjalanan dari Madinah", lat: 24.75, lon: 39.75 },
        lok: null, peristiwa: null, tontonan: null,
        lawan: "Penyerbu Ghathafan (Bani Fazarah)",
        muslim: { jumlah: 500, ket: "500–700 orang menyusul bersama Nabi ﷺ (Wikipedia); pengejaran awal dilakukan Salamah bin Al-Akwa' seorang diri, disusul beberapa penunggang kuda." },
        musuh: { jumlah: 40, ket: "Sekitar 40 penunggang kuda Ghathafan (Wikipedia)." },
        panglima: { muslim: ["nabi", "salamahakwa", "Abu Qatadah Al-Anshari"], musuh: ["Uyainah bin Hishn Al-Fazari", "Abdurrahman Al-Fazari"] },
        wakilMadinah: "Ibnu Ummi Maktum (Ibnu Hisyam)",
        korban: { muslim: 2, musuh: null, ket: "Seorang penggembala unta Nabi ﷺ terbunuh saat serbuan, dan Al-Akhram Al-Asadi gugur dalam pengejaran. Di pihak penyerbu, Abdurrahman Al-Fazari tewas di tangan Abu Qatadah (HR. Muslim 1807a)." },
        hasil: "Unta-unta direbut kembali oleh Salamah bin Al-Akwa'; para penyerbu melarikan diri.",
        ringkas: "Pasukan berkuda Ghathafan merampas unta-unta perah Nabi ﷺ dan membunuh penggembalanya. Salamah bin Al-Akwa' mengejar mereka seorang diri dengan panah dan merebut kembali unta-unta itu. Nabi ﷺ menyusul bersama pasukan sampai mata air Dzu Qarad; Nabi ﷺ sendiri tidak bertempur.",
        kronologi: [
          { judul: "Unta-unta dirampas", isi: "Salamah bin Al-Akwa' keluar sebelum adzan Subuh dan mendapat kabar unta-unta perah Nabi ﷺ dirampas orang Ghathafan. Ia berteriak memperingatkan penduduk Madinah lalu mengejar sendirian (HR. Bukhari 4194)." },
          { judul: "Pengejaran Salamah", isi: "Salamah memanah para penyerbu hingga mereka meninggalkan unta-unta dan banyak barang. Para penunggang kuda muslim menyusul; Al-Akhram gugur, dan Abu Qatadah menewaskan pemimpin penyerbu (HR. Muslim 1807a)." },
          { judul: "Di Dzu Qarad", isi: "Nabi ﷺ tiba bersama pasukan di Dzu Qarad. Ketika Salamah meminta orang untuk terus mengejar, beliau menyuruhnya bersikap lunak (HR. Bukhari 4194). Nabi ﷺ memuji Abu Qatadah sebagai penunggang kuda terbaik dan Salamah sebagai pejalan kaki terbaik hari itu (HR. Muslim 1807a)." }
        ],
        riwayat: [
          B(4194, "Salamah bin Al-Akwa': unta-unta Nabi ﷺ dirampas orang Ghathafan, dan Salamah mengejar mereka seorang diri."),
          M("1807a", "hadits panjang Salamah bin Al-Akwa': gugurnya Al-Akhram, Abu Qatadah menewaskan Abdurrahman Al-Fazari, dan mereka hanya tinggal tiga malam di Madinah sebelum berangkat ke Khaibar."),
          S(IH + ", bab Ghazwah Dzu Qarad."),
          S("Wikipedia: Expedition of Dhu Qarad", W("Expedition_of_Dhu_Qarad"))
        ],
        catatan: "Ibnu Ishaq menempatkannya setelah Bani Lihyan (6 H). Dalam HR. Muslim 1807a, Salamah menyebut mereka hanya tinggal tiga malam di Madinah sebelum berangkat ke Khaibar, sehingga banyak ulama menempatkannya di awal 7 H. Ibnu Ishaq menyebut pemimpin penyerbu Uyainah bin Hishn, sedangkan HR. Muslim menyebut Abdurrahman Al-Fazari. Unta-unta itu digembalakan di Dzu Qarad menurut HR. Bukhari 4194, di Al-Ghabah menurut Ibnu Ishaq. Koordinat Dzu Qarad adalah perkiraan."
      },
      // ---------------------------------------------------------------- 20
      {
        id: "mushthaliq", no: 20, nama: "Ghazwah Bani Al-Mushthaliq (Al-Muraisi')", arab: "غزوة بني المصطلق (المريسيع)",
        jenis: "pertempuran", tahun: 627, h: "6 H", bulan: "Sya'ban 6 H", tanggal: "Sya'ban 6 H menurut Ibnu Ishaq (±Desember 627 M); Senin, 2 Sya'ban 5 H menurut Al-Waqidi", urutWaktu: 627.96,
        tempat: { nama: "Mata air Al-Muraisi', dekat Qudaid di pesisir", lat: 22.45, lon: 39.15 },
        lok: null, peristiwa: null, tontonan: null,
        lawan: "Bani Al-Mushthaliq (Khuza'ah)",
        muslim: { jumlah: 700, kuda: 30, ket: "Sekitar 700 orang dengan 30 kuda (Nadhrat An-Na'im, mengikuti Al-Waqidi); banyak orang munafik ikut serta." },
        musuh: { jumlah: null, ket: "Jumlahnya tidak tercatat dalam kitab sirah. Mereka dipimpin Al-Harits bin Abi Dhirar." },
        panglima: { muslim: ["nabi", "abubakar", "saadubadah"], musuh: ["Al-Harits bin Abi Dhirar"] },
        panji: "Abu Bakar memimpin Muhajirin dan Sa'ad bin Ubadah memimpin Anshar (Wikipedia)",
        wakilMadinah: "Abu Dzar Al-Ghifari, atau Numailah bin Abdullah Al-Laitsi (Ibnu Hisyam)",
        korban: { muslim: 1, musuh: null, ket: "Kaum muslimin: 1 orang, Hisyam bin Shubabah, terbunuh karena salah sasaran oleh seorang Anshar. Bani Al-Mushthaliq: beberapa orang tewas, di antaranya Malik dan putranya (Wikipedia), dan sekitar 200 keluarga ditawan." },
        hasil: "Kemenangan cepat kaum muslimin. Banyak tawanan kemudian dibebaskan setelah Nabi ﷺ menikahi Juwairiyah binti Al-Harits.",
        ringkas: "Nabi ﷺ menyerang Bani Al-Mushthaliq di mata air Al-Muraisi' setelah ada kabar mereka menghimpun pasukan. Pertempuran berlangsung singkat dan banyak dari mereka ditawan, termasuk Juwairiyah putri pemimpin mereka, yang kemudian dinikahi Nabi ﷺ. Dalam perjalanan pulang terjadi ucapan Abdullah bin Ubay yang diabadikan Surah Al-Munafiqun, dan peristiwa haditsul ifki.",
        kronologi: [
          { judul: "Kabar dari Al-Muraisi'", isi: "Nabi ﷺ mendengar Al-Harits bin Abi Dhirar menghimpun kaumnya untuk menyerang Madinah. Setelah kabar itu dipastikan, beliau berangkat bersama sekitar 700 orang." },
          { judul: "Serangan di mata air", isi: "Kaum muslimin menyerang Bani Al-Mushthaliq di dekat mata air Al-Muraisi' ketika ternak mereka sedang diberi minum (HR. Bukhari 2541). Pertempurannya singkat; sebagian tewas dan selebihnya ditawan." },
          { judul: "Juwairiyah dan pembebasan tawanan", isi: "Juwairiyah binti Al-Harits termasuk tawanan (HR. Bukhari 2541). Nabi ﷺ menikahinya, dan para sahabat membebaskan tawanan dari kaumnya karena mereka kini kerabat istri Nabi ﷺ; menurut riwayat Abu Dawud yang dikutip Wikipedia, sekitar 100 keluarga dibebaskan." },
          { judul: "Ucapan Abdullah bin Ubay", isi: "Di mata air terjadi perselisihan antara seorang Muhajirin dan seorang Anshar. Abdullah bin Ubay berkata bahwa jika kembali ke Madinah, orang yang mulia akan mengusir orang yang hina. Umar meminta izin menghukumnya, tetapi Nabi ﷺ menolak agar orang tidak berkata Muhammad membunuh sahabatnya sendiri (HR. Bukhari 4905; Al-Munafiqun 8)." },
          { judul: "Haditsul ifki", isi: "Dalam perjalanan pulang, Aisyah tertinggal rombongan karena mencari kalungnya, lalu diantar pulang oleh Shafwan bin Al-Mu'aththal. Kaum munafik menyebarkan fitnah, sampai Allah menurunkan An-Nur 11–20 yang membersihkan namanya (HR. Bukhari 4750)." }
        ],
        ayat: [
          { surah: "Al-Munafiqun", no: "8", arab: "يَقُولُونَ لَئِنْ رَجَعْنَا إِلَى الْمَدِينَةِ لَيُخْرِجَنَّ الْأَعَزُّ مِنْهَا الْأَذَلَّ", arti: "Mereka berkata, \"Sungguh, jika kita kembali ke Madinah, pastilah orang yang kuat akan mengusir orang-orang yang lemah dari sana.\"" },
          { surah: "An-Nur", no: "11", arab: "إِنَّ الَّذِينَ جَاءُوا بِالْإِفْكِ عُصْبَةٌ مِنْكُمْ", arti: "Sesungguhnya orang-orang yang membawa berita bohong itu adalah dari golongan kamu (juga)." }
        ],
        riwayat: [
          B(2541, "Ibnu Umar (lewat Nafi'): Nabi ﷺ menyerang Bani Al-Mushthaliq ketika mereka lengah dan ternak mereka sedang diberi minum; Juwairiyah termasuk tawanan hari itu."),
          B(4138, "Abu Sa'id Al-Khudri menyebut peristiwa dalam Ghazwah Bani Al-Mushthaliq (bab: Ghazwah Bani Al-Mushthaliq dari Khuza'ah, yaitu Ghazwah Al-Muraisi')."),
          B(4905, "Jabir: perselisihan Muhajirin dan Anshar serta ucapan Abdullah bin Ubay."),
          B(4750, "Aisyah: kisah ifki dan turunnya An-Nur 11–20."),
          S("Nadhrat An-Na'im fi Makarim Akhlaq Ar-Rasul (rangkuman kitab sirah): 700 orang dan 30 kuda, berangkat 2 Sya'ban 5 H", "https://shamela.ws/book/22798/417"),
          S(IH + ", bab Ghazwah Bani Al-Mushthaliq."),
          S("Wikipedia: Invasion of Banu Mustaliq", W("Invasion_of_Banu_Mustaliq"))
        ],
        catatan: "Tanggalnya diperselisihkan. Ibnu Ishaq: Sya'ban 6 H (dipakai di sini sesuai urutan daftarnya); Al-Waqidi dan Ibnu Sa'd: Sya'ban 5 H; Musa bin Uqbah: 4 H. Pendapat 5 H banyak dikuatkan karena Sa'ad bin Mu'adz, yang wafat setelah Quraizhah (5 H), ikut berbicara dalam kisah ifki (HR. Bukhari 4750). Jumlah pasukan musuh tidak tercatat. Koordinat Al-Muraisi' adalah perkiraan."
      },
      // ---------------------------------------------------------------- 21
      {
        id: "hudaibiyah", no: 21, nama: "Ghazwah Hudaibiyah", arab: "غزوة الحديبية",
        jenis: "tanpa-pertempuran", tahun: 628, h: "6 H", bulan: "Dzulqa'dah 6 H", tanggal: "Dzulqa'dah 6 H (±Maret 628 M)", urutWaktu: 628.2,
        tempat: { nama: "Hudaibiyah (kini Asy-Syumaisi), sekitar 20 km barat Mekah", lat: 21.44, lon: 39.62 },
        lok: "makkah", peristiwa: "hudaibiyah", tontonan: null,
        lawan: "Quraisy (berakhir dengan perjanjian damai)",
        muslim: { jumlah: 1400, unta: 70, ket: "Sekitar 1.400 orang (HR. Bukhari 4150; HR. Muslim 1807a); riwayat lain menyebut 1.300 (HR. Bukhari 4155) dan 1.500 (HR. Bukhari 4152). Ibnu Ishaq menyebut 700 orang dengan 70 unta kurban, satu unta untuk sepuluh orang." },
        musuh: { jumlah: null, ket: "Quraisy dan sekutunya bersiaga di Mekah; pasukan berkuda mereka di Al-Ghamim dipimpin Khalid bin Walid (HR. Bukhari 2731)." },
        panglima: { muslim: ["nabi", "utsman"], musuh: ["suhail", "khalid", "Urwah bin Mas'ud Ats-Tsaqafi"] },
        wakilMadinah: "Numailah bin Abdullah Al-Laitsi (Ibnu Hisyam)",
        korban: TANPA,
        hasil: "Perjanjian Hudaibiyah: gencatan senjata (sepuluh tahun menurut Ibnu Ishaq) dan umrah ditunda ke tahun berikutnya. Al-Qur'an menyebutnya kemenangan yang nyata (Al-Fath 1).",
        ringkas: "Nabi ﷺ berangkat umrah bersama sekitar 1.400 sahabat, tetapi dihadang Quraisy di Hudaibiyah. Setelah utusan bolak-balik dan Baiat Ridwan di bawah pohon, kedua pihak menandatangani perjanjian damai yang tampak merugikan kaum muslimin. Dalam perjalanan pulang turun Surah Al-Fath yang menyebut perjanjian itu kemenangan yang nyata.",
        kronologi: [
          { judul: "Berangkat umrah", isi: "Pada Dzulqa'dah 6 H, Nabi ﷺ berangkat untuk umrah dengan membawa hewan kurban. Mendengar pasukan berkuda Quraisy di bawah Khalid bin Walid menunggu di Al-Ghamim, beliau mengambil jalan lain hingga unta beliau, Al-Qashwa', berlutut di Hudaibiyah (HR. Bukhari 2731)." },
          { judul: "Utusan dan Baiat Ridwan", isi: "Budail bin Warqa' dan Urwah bin Mas'ud datang berunding (HR. Bukhari 2731). Nabi ﷺ mengutus Utsman bin Affan ke Mekah; tersiar kabar ia terbunuh, sehingga para sahabat berbaiat kepada Nabi ﷺ di bawah pohon (Al-Fath 18). Kabar itu ternyata tidak benar (kitab sirah)." },
          { judul: "Perjanjian dengan Suhail bin Amr", isi: "Suhail bin Amr mewakili Quraisy. Isinya antara lain umrah ditunda ke tahun depan dan orang Quraisy yang datang ke Madinah harus dikembalikan. Abu Jandal, putra Suhail, datang dalam keadaan terbelenggu dan harus dikembalikan sesuai perjanjian. Setelah itu Nabi ﷺ menyembelih kurban dan bercukur atas saran Ummu Salamah, lalu para sahabat mengikuti (HR. Bukhari 2731). Dalam perjalanan pulang turun Surah Al-Fath (HR. Bukhari 4177)." }
        ],
        ayat: [
          { surah: "Al-Fath", no: "1", arab: "إِنَّا فَتَحْنَا لَكَ فَتْحًا مُبِينًا", arti: "Sungguh, Kami telah memberikan kepadamu kemenangan yang nyata." },
          { surah: "Al-Fath", no: "18", arab: "لَقَدْ رَضِيَ اللَّهُ عَنِ الْمُؤْمِنِينَ إِذْ يُبَايِعُونَكَ تَحْتَ الشَّجَرَةِ", arti: "Sungguh, Allah telah meridai orang-orang mukmin ketika mereka berjanji setia kepadamu (Muhammad) di bawah pohon." }
        ],
        riwayat: [
          B(2731, "Al-Miswar bin Makhramah dan Marwan: kisah panjang Hudaibiyah, dari Khalid di Al-Ghamim hingga perjanjian, Abu Jandal, dan saran Ummu Salamah."),
          B(4150, "Al-Bara' bin Azib: pada hari Hudaibiyah mereka 1.400 orang."),
          B(4152, "Jabir: air memancar dari sela jari Nabi ﷺ di Hudaibiyah; mereka 1.500 orang."),
          B(4155, "Abdullah bin Abi Aufa: peserta Baiat di bawah pohon 1.300 orang."),
          M("1807a", "Salamah bin Al-Akwa': mereka sekitar 1.400 orang di Hudaibiyah, kisah sumur, dan baiat di bawah pohon."),
          B(4177, "Aslam: Surah Al-Fath turun pada suatu malam dalam perjalanan pulang dari Hudaibiyah."),
          S(IH + ", bab Umrah Hudaibiyah."),
          S("Wikipedia: Treaty of Hudaybiyyah", W("Treaty_of_Hudaybiyyah"))
        ],
        catatan: "Jumlah peserta berbeda antar riwayat shahih: 1.300, 1.400, dan 1.500; Ibnu Ishaq menyebut 700. Ibnu Ishaq menghitung Hudaibiyah sebagai ghazwah walaupun tidak terjadi pertempuran."
      },
      // ---------------------------------------------------------------- 22
      {
        id: "khaibar", no: 22, nama: "Perang Khaibar", arab: "غزوة خيبر",
        jenis: "pertempuran", tahun: 628, h: "7 H", bulan: "Muharram 7 H", tanggal: "Akhir Muharram 7 H (±Mei 628 M)", urutWaktu: 628.4,
        tempat: { nama: "Benteng-benteng Khaibar", lat: 25.7, lon: 39.29 },
        lok: "khaibar", peristiwa: "khaibar", tontonan: null,
        lawan: "Yahudi Khaibar (sekutu Ghathafan tidak jadi datang)",
        muslim: { jumlah: 1400, kuda: 200, ket: "Sekitar 1.400 orang, yaitu para peserta Hudaibiyah. Wikipedia mencatat 1.400–1.600 (ada yang menyebut sampai 1.800) dengan 100–200 kuda." },
        musuh: { jumlah: 10000, ket: "Sekitar 10.000 pejuang menurut Wikipedia; angka ini dianggap perkiraan, dan ada yang menyebut 20.000. Sekutu mereka dari Ghathafan, sekitar 4.000 orang, tidak jadi datang membantu." },
        panglima: { muslim: ["nabi", "ali", "abubakar", "umar", "zubair"], musuh: ["marhab", "Kinanah bin Ar-Rabi' bin Abil Huqaiq"] },
        panji: "Ali bin Abi Thalib (HR. Bukhari 4210)",
        wakilMadinah: "Numailah bin Abdullah Al-Laitsi menurut Ibnu Hisyam; sumber lain menyebut Siba' bin Urfuthah Al-Ghifari",
        korban: { muslim: 18, musuh: 93, ket: "Kaum muslimin: sekitar 16–20 syahid (Wikipedia: 18–20), di antaranya Amir bin Al-Akwa'. Yahudi Khaibar: 93 tewas (Wikipedia)." },
        hasil: "Seluruh benteng Khaibar jatuh. Penduduknya dibiarkan menggarap tanah dengan membagi separuh hasil panen (HR. Bukhari 2285).",
        ringkas: "Khaibar, oase berbenteng di utara Madinah, menjadi tempat berkumpulnya para penggerak Perang Ahzab. Sekitar dua bulan setelah Hudaibiyah, Nabi ﷺ menaklukkan benteng-bentengnya satu per satu; panji diserahkan kepada Ali bin Abi Thalib, dan jagoan Khaibar, Marhab, tewas. Penduduknya tetap boleh menggarap kebun dengan perjanjian bagi hasil.",
        kronologi: [
          { judul: "Berangkat dari Madinah", isi: "Pada akhir Muharram 7 H, Nabi ﷺ berangkat bersama para peserta Hudaibiyah. Menurut kitab sirah, pasukan berkemah di antara Khaibar dan wilayah Ghathafan agar sekutu itu tidak bisa membantu." },
          { judul: "Pagi di Khaibar", isi: "Pasukan tiba malam hari dan bergerak di pagi hari ketika penduduk keluar ke ladang. Melihat pasukan, mereka berseru, \"Muhammad dan pasukannya!\" Nabi ﷺ bertakbir, \"Allahu akbar, binasalah Khaibar\" (HR. Bukhari 371)." },
          { judul: "Benteng-benteng dikepung", isi: "Benteng-benteng Khaibar dikepung dan direbut satu per satu, mulai dari kawasan An-Nathah dan Asy-Syiqq, lalu benteng Al-Qamush yang kokoh. Benteng terakhir, Al-Wathih dan As-Sulalim, menyerah dengan perjanjian (Wikipedia; kitab sirah)." },
          { judul: "Panji untuk Ali", isi: "Nabi ﷺ bersabda, \"Besok akan kuserahkan panji ini kepada seseorang yang melalui tangannya Allah memberi kemenangan; ia mencintai Allah dan Rasul-Nya, dan Allah dan Rasul-Nya mencintainya.\" Panji itu diberikan kepada Ali, yang sedang sakit mata lalu sembuh setelah didoakan Nabi ﷺ (HR. Bukhari 4210)." },
          { judul: "Marhab", isi: "Marhab, jagoan Khaibar, menantang duel. Amir bin Al-Akwa' gugur saat menghadapinya, lalu Ali maju dan menewaskan Marhab (HR. Muslim 1807a). Menurut Ibnu Ishaq, yang menewaskannya adalah Muhammad bin Maslamah." },
          { judul: "Perjanjian dan sesudahnya", isi: "Penduduk Khaibar dibiarkan menggarap tanah dengan bagi hasil separuh panen (HR. Bukhari 2285). Shafiyyah binti Huyay dimerdekakan lalu dinikahi Nabi ﷺ (HR. Bukhari 371). Saat itu pula rombongan Abu Musa Al-Asy'ari tiba dari Habasyah bersama Ja'far bin Abi Thalib (HR. Bukhari 4230)." }
        ],
        ayat: [
          { surah: "Al-Fath", no: "20", arab: "وَعَدَكُمُ اللَّهُ مَغَانِمَ كَثِيرَةً تَأْخُذُونَهَا فَعَجَّلَ لَكُمْ هَٰذِهِ", arti: "Allah menjanjikan kepadamu harta rampasan perang yang banyak yang dapat kamu ambil, maka Dia segerakan (harta rampasan) ini untukmu. (Banyak mufassir memahami \"ini\" sebagai Khaibar.)" }
        ],
        riwayat: [
          B(371, "Anas: \"Allahu akbar, binasalah Khaibar\", dan Shafiyyah dimerdekakan lalu dinikahi."),
          B(4210, "Sahl bin Sa'd: panji diserahkan kepada Ali, yang sembuh dari sakit matanya."),
          M("1807a", "Salamah bin Al-Akwa': Amir gugur dalam duel dengan Marhab, lalu Ali menewaskan Marhab."),
          B(2285, "Ibnu Umar: tanah Khaibar diserahkan kepada orang Yahudi untuk digarap dengan bagi hasil separuh panen."),
          B(4230, "Abu Musa Al-Asy'ari: rombongannya dari Habasyah tiba saat Khaibar ditaklukkan."),
          S(IH + ", bab Perang Khaibar."),
          S("Wikipedia: Battle of Khaybar", W("Battle_of_Khaybar"))
        ],
        catatan: "Jumlah pasukan dan korban tidak seragam di kitab sirah; angka di sini mengikuti Wikipedia beserta rentangnya. Mengenai Marhab, HR. Muslim 1807a menyebut Ali yang menewaskannya, sedangkan Ibnu Ishaq meriwayatkan Muhammad bin Maslamah. Wikipedia menyebut Maret/April 628 M; perhitungan kalender dari Muharram 7 H memberi sekitar Mei 628 M."
      },
      // ---------------------------------------------------------------- 23
      {
        id: "umratulqadha", no: 23, nama: "Umratul Qadha'", arab: "عمرة القضاء",
        jenis: "tanpa-pertempuran", tahun: 629, h: "7 H", bulan: "Dzulqa'dah 7 H", tanggal: "Dzulqa'dah 7 H (629 M)", urutWaktu: 629.17,
        tempat: { nama: "Masjidil Haram, Mekah", lat: 21.4225, lon: 39.8262 },
        lok: "makkah", peristiwa: null, tontonan: null,
        lawan: "Tidak ada; Quraisy keluar dari Mekah selama tiga hari sesuai perjanjian",
        muslim: { jumlah: 2000, unta: 60, ket: "Sekitar 2.000 orang dengan 60 unta kurban (Wikipedia); 200 orang menjaga senjata di luar tanah haram, sekitar 8 mil dari Mekah." },
        musuh: { jumlah: null, ket: "Tidak ada pasukan lawan." },
        panglima: { muslim: ["nabi"], musuh: [] },
        wakilMadinah: "Uwaif bin Al-Adhbath Ad-Daili (Ibnu Hisyam)",
        korban: TANPA,
        hasil: "Umrah terlaksana dengan aman sesuai Perjanjian Hudaibiyah.",
        ringkas: "Setahun setelah Hudaibiyah, Nabi ﷺ dan sekitar 2.000 sahabat menunaikan umrah pengganti (qadha'). Quraisy mengosongkan Mekah dan menonton dari bukit-bukit; Nabi ﷺ memerintahkan para sahabat berlari kecil saat thawaf untuk menunjukkan bahwa mereka tidak lemah. Mereka tinggal tiga hari sesuai perjanjian.",
        kronologi: [
          { judul: "Masuk Mekah", isi: "Pada Dzulqa'dah 7 H rombongan tiba di Mekah. Sebagian senjata ditinggalkan bersama 200 penjaga di luar tanah haram (Wikipedia), dan Quraisy keluar dari kota." },
          { judul: "Thawaf dengan ramal", isi: "Kaum musyrikin berkata bahwa kaum muslimin telah dilemahkan demam Yatsrib. Nabi ﷺ memerintahkan para sahabat berlari kecil (ramal) pada tiga putaran pertama thawaf (HR. Bukhari 4256)." },
          { judul: "Tiga hari di Mekah", isi: "Dalam perjalanan umrah ini Nabi ﷺ menikahi Maimunah binti Al-Harits (HR. Bukhari 4258). Setelah tiga hari, rombongan meninggalkan Mekah sesuai perjanjian dan pulang ke Madinah." }
        ],
        ayat: [
          { surah: "Al-Fath", no: "27", arab: "لَقَدْ صَدَقَ اللَّهُ رَسُولَهُ الرُّؤْيَا بِالْحَقِّ لَتَدْخُلُنَّ الْمَسْجِدَ الْحَرَامَ إِنْ شَاءَ اللَّهُ آمِنِينَ", arti: "Sungguh, Allah akan membuktikan kepada Rasul-Nya tentang kebenaran mimpinya bahwa kamu pasti akan memasuki Masjidilharam, jika Allah menghendaki, dalam keadaan aman." }
        ],
        riwayat: [
          B(4256, "Ibnu Abbas (bab Umratul Qadha'): ucapan kaum musyrikin tentang demam Yatsrib dan perintah ramal pada tiga putaran pertama."),
          B(4258, "Ibnu Abbas: Nabi ﷺ menikahi Maimunah dalam perjalanan umrah ini."),
          S(IH + ", bab Umratul Qadha'."),
          S("Wikipedia: First Pilgrimage (Umrah al-Qada)", W("First_Pilgrimage"))
        ],
        catatan: "Disebut juga Umratul Qadhiyyah. Ibnu Ishaq memasukkannya ke dalam daftar ghazwah walaupun tidak ada pertempuran."
      },
      // ---------------------------------------------------------------- 24
      {
        id: "fathumakkah", no: 24, nama: "Fathu Makkah", arab: "فتح مكة",
        jenis: "pertempuran", tahun: 630, h: "8 H", bulan: "Ramadhan 8 H", tanggal: "Berangkat 10 Ramadhan dan masuk Mekah sekitar 20 Ramadhan 8 H (±Januari 630 M)", urutWaktu: 630.03,
        tempat: { nama: "Mekah", lat: 21.4225, lon: 39.8262 },
        lok: "makkah", peristiwa: "fathu", tontonan: "fath",
        lawan: "Quraisy (perlawanan kecil di Khandamah)",
        muslim: { jumlah: 10000, ket: "Sekitar 10.000 orang (HR. Bukhari 4276)." },
        musuh: { jumlah: null, ket: "Jumlahnya tidak tercatat; sebagian besar penduduk Mekah tidak melawan. Perlawanan datang dari kelompok yang dihimpun Ikrimah bin Abi Jahal, Shafwan bin Umayyah, dan Suhail bin Amr di Khandamah." },
        panglima: { muslim: ["nabi", "khalid", "zubair", "abuubaidah", "saadubadah", "Qais bin Sa'ad"], musuh: ["ikrimah", "Shafwan bin Umayyah", "suhail"] },
        panji: "Panji Nabi ﷺ dibawa Az-Zubair bin Al-Awwam dan ditancapkan di Al-Hajun (HR. Bukhari 4280). Panji Anshar semula dibawa Sa'ad bin Ubadah, lalu dipindahkan kepada putranya, Qais (Wikipedia)",
        wakilMadinah: "Abu Ruhm Kultsum bin Hushain Al-Ghifari (Ibnu Hisyam)",
        korban: { muslim: 2, musuh: 12, ket: "Kaum muslimin: 2 orang dari pasukan Khalid, Hubaisy bin Al-Asy'ar dan Kurz bin Jabir Al-Fihri (HR. Bukhari 4280); riwayat lain menyebut tiga. Quraisy: sekitar 12–13 orang dalam bentrokan di Khandamah (Wikipedia, dari Ar-Rahiq Al-Makhtum)." },
        hasil: "Mekah dibebaskan hampir tanpa pertumpahan darah; berhala di sekitar Ka'bah dihancurkan dan penduduk Mekah diberi pengampunan.",
        ringkas: "Setelah Bani Bakar, sekutu Quraisy, menyerang Khuza'ah, sekutu kaum muslimin, Perjanjian Hudaibiyah batal. Nabi ﷺ berangkat diam-diam bersama 10.000 pasukan; Abu Sufyan masuk Islam di Marr Azh-Zhahran, dan pasukan memasuki Mekah dari beberapa arah dengan perlawanan kecil. Nabi ﷺ menjatuhkan 360 berhala di sekitar Ka'bah dan memaafkan penduduk Mekah.",
        kronologi: [
          { judul: "Perjanjian dilanggar", isi: "Bani Bakar, sekutu Quraisy, menyerang Khuza'ah, sekutu kaum muslimin, dengan bantuan sebagian orang Quraisy. Perjanjian Hudaibiyah pun batal (kitab sirah)." },
          { judul: "Persiapan rahasia", isi: "Nabi ﷺ menyiapkan pasukan secara rahasia. Hathib bin Abi Balta'ah sempat mengirim surat peringatan kepada Quraisy; Ali, Az-Zubair, dan Al-Miqdad mencegat pembawa surat itu di Raudhah Khakh. Nabi ﷺ menerima alasan Hathib karena ia ikut Perang Badar (HR. Bukhari 3007)." },
          { judul: "Perjalanan dan Marr Azh-Zhahran", isi: "Pasukan 10.000 orang berangkat di bulan Ramadhan dan berbuka di Al-Kadid (HR. Bukhari 4276). Di Marr Azh-Zhahran, Abu Sufyan, Hakim bin Hizam, dan Budail bin Warqa' yang keluar mencari kabar tertangkap penjaga. Abu Sufyan masuk Islam dan menyaksikan kabilah-kabilah lewat satu per satu (HR. Bukhari 4280)." },
          { judul: "Masuk dari beberapa arah", isi: "Pasukan dibagi: Az-Zubair di satu sayap, Khalid bin Walid di sayap lain, dan Abu Ubaidah memimpin pasukan tanpa baju besi. Nabi ﷺ menjamin keamanan bagi siapa saja yang masuk ke rumah Abu Sufyan (HR. Muslim 1780a); menurut kitab sirah, jaminan itu juga bagi yang menutup pintu rumahnya atau masuk Masjidil Haram." },
          { judul: "Bentrokan di Khandamah", isi: "Hanya pasukan Khalid yang menghadapi perlawanan, dari kelompok Ikrimah, Shafwan, dan Suhail di Khandamah. Sekitar 12–13 orang Quraisy tewas, dan dua orang dari pasukan Khalid gugur (HR. Bukhari 4280)." },
          { judul: "Ka'bah dibersihkan", isi: "Nabi ﷺ thawaf dan menjatuhkan 360 berhala di sekitar Ka'bah sambil membaca, \"Kebenaran telah datang dan yang batil telah lenyap\" (HR. Bukhari 4287). Penduduk Mekah diberi pengampunan, dan Bilal mengumandangkan adzan di atas Ka'bah (kitab sirah)." }
        ],
        ayat: [
          { surah: "Al-Isra'", no: "81", arab: "وَقُلْ جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ إِنَّ الْبَاطِلَ كَانَ زَهُوقًا", arti: "Dan katakanlah, \"Kebenaran telah datang dan yang batil telah lenyap.\" Sungguh, yang batil itu pasti lenyap." },
          { surah: "An-Nashr", no: "1", arab: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ", arti: "Apabila telah datang pertolongan Allah dan kemenangan." }
        ],
        riwayat: [
          B(4276, "Ibnu Abbas: Nabi ﷺ keluar dari Madinah di bulan Ramadhan bersama 10.000 orang dan berbuka di Al-Kadid."),
          B(4280, "Urwah: Abu Sufyan di Marr Azh-Zhahran, barisan kabilah, panji di Al-Hajun, dan dua orang dari pasukan Khalid yang gugur."),
          B(4287, "Ibnu Mas'ud: 360 berhala di sekitar Ka'bah dan bacaan Al-Isra' 81."),
          B(3007, "Ali: surat Hathib bin Abi Balta'ah dicegat di Raudhah Khakh."),
          M("1780a", "Abu Hurairah: pembagian pasukan, jaminan aman bagi yang masuk rumah Abu Sufyan, dan ucapan Nabi ﷺ kepada kaum Anshar."),
          S(IH + ", bab Fathu Makkah."),
          S("Wikipedia: Conquest of Mecca", W("Conquest_of_Mecca"))
        ],
        catatan: "Tanggal berangkat dan masuk Mekah berbeda antar sumber (berangkat 2, 6, atau 10 Ramadhan; masuk antara 10 dan 20 Ramadhan), dan konversinya ke Masehi juga berbeda (Desember 629 atau Januari 630 M). HR. Bukhari 4280 (dari Urwah) menyebut Khalid masuk dari arah atas (Kada') dan Nabi ﷺ dari arah bawah (Kuda), sedangkan Ibnu Ishaq menyebut Khalid masuk dari arah bawah Mekah."
      },
      // ---------------------------------------------------------------- 25
      {
        id: "hunain", no: 25, nama: "Perang Hunain", arab: "غزوة حنين",
        jenis: "pertempuran", tahun: 630, h: "8 H", bulan: "Syawal 8 H", tanggal: "Tiba di Hunain malam 10 Syawal 8 H; pertempuran pada subuh berikutnya (630 M)", urutWaktu: 630.08,
        tempat: { nama: "Lembah Hunain, antara Mekah dan Thaif", lat: 21.55, lon: 40.06 },
        lok: "hunain", peristiwa: "hunain", tontonan: null,
        lawan: "Hawazin dan Tsaqif",
        muslim: { jumlah: 12000, ket: "12.000 orang: 10.000 yang datang dari Madinah ditambah 2.000 penduduk Mekah yang baru masuk Islam (Wikipedia; HR. Bukhari 4337 menyebut 10.000 ditambah thulaqa'). Dalam HR. Muslim 1059g, Anas menyebut angka enam ribu." },
        musuh: { jumlah: 20000, ket: "Sekitar 20.000 menurut Wikipedia dan buku sirah modern; sumber klasik tidak memberi angka yang seragam. Yang bersembunyi dalam penyergapan disebut sekitar 4.000 (Wikipedia). Mereka membawa serta perempuan, anak-anak, dan ternak." },
        panglima: { muslim: ["nabi", "abbas", "Abu Sufyan bin Al-Harits", "abubakar", "umar", "ali", "khalid"], musuh: ["malikauf", "Duraid bin Ash-Shimmah"] },
        wakilMadinah: "Nabi ﷺ berangkat dari Mekah; Mekah dititipkan kepada Attab bin Asid (Ibnu Hisyam)",
        korban: { muslim: 4, musuh: 70, ket: "Kaum muslimin: 4 syahid (Wikipedia). Hawazin dan Tsaqif: sekitar 70 orang dari Tsaqif saja menurut teks Wikipedia, dan infoboxnya menyebut lebih banyak. Sekitar 6.000 orang ditawan dan sekitar 24.000 unta dirampas (Wikipedia)." },
        hasil: "Kemenangan kaum muslimin setelah sempat kocar-kacir; Hawazin lari ke Awthas dan Tsaqif bertahan di Thaif.",
        ringkas: "Setelah Fathu Makkah, kabilah Hawazin dan Tsaqif di bawah Malik bin Auf berhimpun untuk menyerang. Pasukan muslim yang berjumlah 12.000 dan sempat bangga dengan jumlahnya disergap pemanah di lembah Hunain saat subuh hingga barisan depan lari. Nabi ﷺ tetap teguh, Al-Abbas memanggil para sahabat kembali, dan kaum muslimin akhirnya menang.",
        kronologi: [
          { judul: "Hawazin berhimpun", isi: "Malik bin Auf An-Nashri menghimpun Hawazin dan Tsaqif di Awthas dan membawa serta perempuan, anak-anak, serta ternak agar pasukannya tidak lari. Duraid bin Ash-Shimmah, tokoh tua yang berpengalaman, tidak setuju dengan siasat itu (kitab sirah)." },
          { judul: "Berangkat dari Mekah", isi: "Nabi ﷺ keluar dari Mekah pada awal Syawal bersama 12.000 orang, termasuk 2.000 penduduk Mekah yang baru masuk Islam, dan tiba di Hunain pada malam 10 Syawal. Al-Qur'an mengingatkan bahwa saat itu jumlah yang banyak membuat mereka bangga (At-Taubah 25)." },
          { judul: "Disergap di lembah", isi: "Saat subuh, pasukan muslim turun ke lembah dan disambut hujan anak panah dari para pemanah Hawazin yang bersembunyi. Barisan depan lari dan sebagian besar pasukan kocar-kacir (HR. Bukhari 2864; HR. Bukhari 4337)." },
          { judul: "Nabi ﷺ tetap teguh", isi: "Nabi ﷺ tetap di atas bagal putihnya dan berseru, \"Aku adalah Nabi, tidak dusta; aku putra Abdul Muthalib\" (HR. Bukhari 2864). Al-Abbas yang bersuara lantang memanggil para sahabat yang dulu berbaiat di bawah pohon Samurah, lalu kaum Anshar, dan mereka pun kembali (HR. Muslim 1775a)." },
          { judul: "Kemenangan", isi: "Nabi ﷺ melempar kerikil ke arah musuh, dan Hawazin akhirnya kalah (HR. Muslim 1775a). Allah menurunkan ketenangan dan bala tentara yang tidak terlihat (At-Taubah 26). Sisa pasukan lari ke Awthas, Nakhlah, dan Thaif; Abu Amir Al-Asy'ari diutus ke Awthas dan gugur di sana (HR. Bukhari 4323)." },
          { judul: "Rampasan dan kaum Anshar", isi: "Tawanan dan harta dikumpulkan di Al-Ji'ranah. Sebagian besar dibagikan kepada tokoh-tokoh Mekah yang baru masuk Islam, sehingga sebagian Anshar kecewa. Nabi ﷺ berpidato, \"Tidakkah kalian rela orang-orang pulang membawa kambing dan unta, sedangkan kalian pulang membawa Nabi ke rumah kalian?\" (HR. Bukhari 4330). Menurut kitab sirah, tawanan Hawazin dikembalikan setelah utusan mereka datang dan masuk Islam." }
        ],
        ayat: [
          { surah: "At-Taubah", no: "25", arab: "وَيَوْمَ حُنَيْنٍ إِذْ أَعْجَبَتْكُمْ كَثْرَتُكُمْ فَلَمْ تُغْنِ عَنْكُمْ شَيْئًا", arti: "...dan (ingatlah) Perang Hunain, ketika jumlahmu yang besar itu membanggakan kamu, tetapi (jumlah yang banyak itu) sama sekali tidak berguna bagimu." },
          { surah: "At-Taubah", no: "26", arab: "ثُمَّ أَنْزَلَ اللَّهُ سَكِينَتَهُ عَلَىٰ رَسُولِهِ وَعَلَى الْمُؤْمِنِينَ وَأَنْزَلَ جُنُودًا لَمْ تَرَوْهَا", arti: "Kemudian Allah menurunkan ketenangan kepada Rasul-Nya dan kepada orang-orang yang beriman, dan Dia menurunkan bala tentara yang tidak terlihat olehmu." }
        ],
        riwayat: [
          B(2864, "Al-Bara' bin Azib: Rasulullah ﷺ tidak lari di Hunain; Hawazin adalah pemanah ulung; \"Aku adalah Nabi, tidak dusta; aku putra Abdul Muthalib.\""),
          M("1775a", "Al-Abbas: ia memanggil para sahabat pemilik baiat pohon Samurah, dan Nabi ﷺ melempar kerikil ke arah musuh."),
          B(4337, "Anas: Hawazin datang bersama keluarga dan ternak; Nabi ﷺ bersama 10.000 orang dan para thulaqa'; pembagian rampasan dan kaum Anshar."),
          B(4323, "Abu Musa: Abu Amir diutus ke Awthas, Duraid bin Ash-Shimmah terbunuh, dan Abu Amir gugur."),
          B(4330, "Abdullah bin Zaid bin Ashim: pidato Nabi ﷺ kepada kaum Anshar setelah Hunain."),
          M("1059g", "Anas: setelah Fathu Makkah mereka berperang di Hunain, dan jumlah mereka telah mencapai enam ribu."),
          S(IH + ", bab Perang Hunain."),
          S("Wikipedia: Battle of Hunayn", W("Battle_of_Hunayn"))
        ],
        catatan: "Jumlah pasukan Hawazin dan Tsaqif tidak seragam: 20.000 menurut Wikipedia dan buku sirah modern, sementara yang bersembunyi dalam penyergapan disebut sekitar 4.000. Korban musuh juga berbeda: sekitar 70 dari Tsaqif menurut teks Wikipedia, lebih banyak menurut infoboxnya. Titik di peta mengikuti lokasi \"hunain\" yang sudah ada."
      },
      // ---------------------------------------------------------------- 26
      {
        id: "thaif", no: 26, nama: "Pengepungan Thaif", arab: "غزوة الطائف",
        jenis: "pengepungan", tahun: 630, h: "8 H", bulan: "Syawal 8 H", tanggal: "Syawal 8 H, langsung setelah Hunain (±Februari 630 M)", urutWaktu: 630.12,
        tempat: { nama: "Benteng kota Thaif", lat: 21.27, lon: 40.42 },
        lok: "thaif", peristiwa: null, tontonan: null,
        lawan: "Tsaqif dan sisa pasukan Hawazin",
        muslim: { jumlah: 12000, ket: "Pasukan yang sama dari Hunain, sekitar 12.000 orang (Wikipedia)." },
        musuh: { jumlah: null, ket: "Jumlah pembela benteng tidak tercatat dalam sumber klasik (infobox Wikipedia mencantumkan 10.000 tanpa rujukan). Mereka bertahan di balik tembok kota." },
        panglima: { muslim: ["nabi", "khalid"], musuh: ["malikauf", "Abdu Yalail bin Amr"] },
        wakilMadinah: "Mekah dipegang Attab bin Asid (Ibnu Hisyam)",
        korban: { muslim: 12, musuh: null, ket: "Kaum muslimin: 12 syahid menurut Ibnu Hisyam (Wikipedia). Korban di pihak Tsaqif tidak tercatat." },
        hasil: "Pengepungan dihentikan tanpa merebut kota. Setahun kemudian (9 H) utusan Tsaqif datang ke Madinah dan masuk Islam.",
        ringkas: "Sisa pasukan Hawazin dan kabilah Tsaqif berlindung di balik benteng Thaif. Kaum muslimin mengepung kota itu, termasuk dengan manjaniq, tetapi benteng sulit ditembus. Nabi ﷺ lalu memutuskan pulang; tidak lama kemudian Tsaqif sendiri datang menyatakan masuk Islam.",
        kronologi: [
          { judul: "Mengepung benteng", isi: "Setelah Hunain, Nabi ﷺ bergerak ke Thaif dan mengepung kotanya. Para pemanah Tsaqif menghujani pasukan dari atas tembok, sehingga perkemahan dipindahkan lebih jauh (kitab sirah)." },
          { judul: "Manjaniq dan seruan kepada budak", isi: "Kaum muslimin memakai manjaniq (pelontar batu) dan alat pelindung untuk mendekati tembok (Wikipedia). Diumumkan bahwa budak yang turun dari benteng akan merdeka; di antara yang turun adalah Abu Bakrah, salah satu dari sekitar 23 orang (HR. Bukhari 4326)." },
          { judul: "Kembali pulang", isi: "Benteng tetap tidak jebol. Nabi ﷺ bersabda, \"Kita akan pulang besok, insya Allah.\" Para sahabat semula keberatan, tetapi setelah bertempur keesokan harinya mereka menerima, dan Nabi ﷺ tersenyum (HR. Bukhari 4325). Pasukan kembali ke Al-Ji'ranah untuk membagi rampasan Hunain." }
        ],
        riwayat: [
          B(4325, "Abdullah bin Umar (teks Inggris di sunnah.com menulis Abdullah bin Amr): pengepungan Thaif tidak membuahkan hasil, lalu Nabi ﷺ memutuskan pulang."),
          B(4326, "Abu Utsman An-Nahdi dari Abu Bakrah: Abu Bakrah turun dari benteng Thaif bersama beberapa orang."),
          M("1059g", "Anas: setelah Hunain mereka mengepung Thaif selama empat puluh malam."),
          S(IH + ", bab Ghazwah Thaif."),
          S("Wikipedia: Siege of Ta'if", W("Siege_of_Ta%27if"))
        ],
        catatan: "Lama pengepungan diperselisihkan: sekitar 15 hari (Wikipedia), sekitar dua puluh malam menurut kitab sirah, dan 40 malam menurut HR. Muslim 1059g dari Anas. Teks Inggris HR. Bukhari 4326 di sunnah.com menulis 33 orang, sedangkan teks Arabnya menyebut 23. Jumlah pembela Thaif tidak tercatat dalam sumber klasik."
      },
      // ---------------------------------------------------------------- 27
      {
        id: "tabuk", no: 27, nama: "Ghazwah Tabuk", arab: "غزوة تبوك",
        jenis: "tanpa-pertempuran", tahun: 630, h: "9 H", bulan: "Rajab 9 H", tanggal: "Rajab 9 H (Oktober 630 M)", urutWaktu: 630.8,
        tempat: { nama: "Tabuk, di perbatasan wilayah Romawi Timur", lat: 28.38, lon: 36.57 },
        lok: "tabuk", peristiwa: "tabuk", tontonan: null,
        lawan: "Romawi Timur (Bizantium) dan kabilah Arab sekutunya; tidak bertemu",
        muslim: { jumlah: 30000, kuda: 10000, ket: "Sekitar 30.000 orang dengan sekitar 10.000 kuda menurut kitab sirah (Wikipedia). Ka'ab bin Malik menyebut jumlah kaum muslimin sangat banyak sehingga tidak tercatat dalam satu daftar (HR. Bukhari 4418)." },
        musuh: { jumlah: null, ket: "Tersiar kabar bahwa Heraklius menghimpun pasukan besar di Al-Balqa', Syam (Ath-Thabari), tetapi pasukan itu tidak muncul; sejarawan modern meragukan kabar ini (Wikipedia)." },
        panglima: { muslim: ["nabi", "abubakar", "utsman", "khalid"], musuh: [] },
        wakilMadinah: "Muhammad bin Maslamah menurut Ibnu Hisyam (ada yang menyebut Siba' bin Urfuthah); Ali bin Abi Thalib ditinggal untuk menjaga keluarga Nabi ﷺ (HR. Bukhari 4416)",
        korban: TANPA,
        hasil: "Tidak terjadi pertempuran. Penguasa Ailah, Jarba', dan Adzruh berdamai dengan membayar jizyah, dan wibawa kaum muslimin di utara Jazirah menguat.",
        ringkas: "Ekspedisi terakhir dan terbesar yang dipimpin Nabi ﷺ, berangkat di musim panas yang terik dan masa sulit setelah kabar bahwa Romawi menghimpun pasukan. Sekitar 30.000 orang bergerak ke Tabuk dan tinggal sekitar dua puluh malam, tetapi musuh tidak muncul. Beberapa penguasa setempat berdamai, dan sepulangnya turun ayat-ayat At-Taubah tentang orang-orang yang tertinggal.",
        kronologi: [
          { judul: "Seruan di masa sulit", isi: "Berbeda dari kebiasaannya, Nabi ﷺ mengumumkan tujuan ekspedisi secara terang karena perjalanannya jauh dan musuhnya besar. Saat itu cuaca sangat panas dan buah-buahan sedang matang (HR. Bukhari 4418). Utsman bin Affan membiayai perlengkapan pasukan yang disebut Jaisyul 'Usrah, pasukan masa sulit (HR. Bukhari 2778)." },
          { judul: "Yang tinggal dan yang tertinggal", isi: "Ali ditinggal di Madinah untuk menjaga keluarga, dan Nabi ﷺ bersabda, \"Tidakkah engkau rela kedudukanmu di sisiku seperti Harun di sisi Musa, hanya saja tidak ada nabi sesudahku?\" (HR. Bukhari 4416). Kaum munafik mencari-cari alasan, sedangkan tiga sahabat yang jujur, Ka'ab bin Malik, Murarah bin Ar-Rabi', dan Hilal bin Umayyah, tertinggal tanpa uzur (HR. Bukhari 4418)." },
          { judul: "Di Tabuk dan kepulangan", isi: "Pasukan tinggal sekitar dua puluh malam di Tabuk tanpa bertemu musuh. Penguasa Ailah, Jarba', dan Adzruh berdamai dengan membayar jizyah (Wikipedia), dan menurut kitab sirah Khalid bin Walid diutus ke Dumatul Jandal. Sepulangnya, tiga sahabat yang tertinggal diboikot selama lima puluh malam hingga Allah menerima tobat mereka (At-Taubah 118; HR. Bukhari 4418)." }
        ],
        ayat: [
          { surah: "At-Taubah", no: "41", arab: "انْفِرُوا خِفَافًا وَثِقَالًا وَجَاهِدُوا بِأَمْوَالِكُمْ وَأَنْفُسِكُمْ فِي سَبِيلِ اللَّهِ", arti: "Berangkatlah kamu baik dengan rasa ringan maupun dengan rasa berat, dan berjihadlah dengan harta dan jiwamu di jalan Allah." },
          { surah: "At-Taubah", no: "118", arab: "وَعَلَى الثَّلَاثَةِ الَّذِينَ خُلِّفُوا حَتَّىٰ إِذَا ضَاقَتْ عَلَيْهِمُ الْأَرْضُ بِمَا رَحُبَتْ", arti: "Dan terhadap tiga orang yang ditinggalkan, hingga ketika bumi terasa sempit bagi mereka, padahal bumi itu luas..." }
        ],
        riwayat: [
          B(4418, "Ka'ab bin Malik: kisah panjang Tabuk, musim panas, jumlah pasukan yang tidak tercatat dalam daftar, tiga orang yang tertinggal, boikot lima puluh malam, dan turunnya At-Taubah 118."),
          B(4416, "Sa'ad bin Abi Waqqash: Ali ditinggal di Madinah, \"seperti Harun di sisi Musa\"."),
          B(2778, "Utsman: Nabi ﷺ menjanjikan surga bagi yang membiayai Jaisyul 'Usrah, dan Utsman membiayainya."),
          S(IH + ", bab Ghazwah Tabuk."),
          S("Wikipedia: Expedition of Tabuk", W("Expedition_of_Tabuk"))
        ],
        catatan: "Lama tinggal di Tabuk sekitar 20 malam menurut Ibnu Sa'd dan Wikipedia; Ibnu Ishaq menyebut sepuluh sekian malam. Angka 30.000 orang dan 10.000 kuda berasal dari kitab sirah, bukan dari hadits shahih."
      }
    ],

    sumber: [
      { judul: "Ibnu Hisyam, As-Sirah an-Nabawiyah (riwayat Ibnu Ishaq), bab-bab maghazi" },
      { judul: "Ibnu Sa'd, Ath-Thabaqat Al-Kubra, juz maghazi" },
      { judul: "Al-Waqidi, Al-Maghazi" },
      { judul: "Shafiyyurrahman Al-Mubarakfuri, Ar-Rahiq Al-Makhtum" },
      { judul: "Shahih Al-Bukhari, Kitab Al-Maghazi (sunnah.com)", url: "https://sunnah.com/bukhari/64" },
      { judul: "Shahih Muslim, Kitab Al-Jihad wa As-Siyar (sunnah.com)", url: "https://sunnah.com/muslim/32" },
      { judul: "Wikipedia: List of expeditions of Muhammad", url: W("List_of_expeditions_of_Muhammad") },
      { judul: "Wikipedia: Battle of Badr", url: W("Battle_of_Badr") },
      { judul: "Wikipedia: Battle of Uhud", url: W("Battle_of_Uhud") },
      { judul: "Wikipedia: Battle of the Trench", url: W("Battle_of_the_Trench") },
      { judul: "Wikipedia: Siege of Banu Qurayza", url: W("Siege_of_Banu_Qurayza") },
      { judul: "Wikipedia: Invasion of Banu Mustaliq", url: W("Invasion_of_Banu_Mustaliq") },
      { judul: "Wikipedia: Battle of Khaybar", url: W("Battle_of_Khaybar") },
      { judul: "Wikipedia: Conquest of Mecca", url: W("Conquest_of_Mecca") },
      { judul: "Wikipedia: Battle of Hunayn", url: W("Battle_of_Hunayn") },
      { judul: "Wikipedia: Siege of Ta'if", url: W("Siege_of_Ta%27if") },
      { judul: "Wikipedia: Expedition of Tabuk", url: W("Expedition_of_Tabuk") },
      { judul: "Wikipedia: Invasion of Banu Qaynuqa", url: W("Invasion_of_Banu_Qaynuqa") },
      { judul: "Wikipedia: Invasion of Banu Nadir", url: W("Invasion_of_Banu_Nadir") },
      { judul: "Nadhrat An-Na'im fi Makarim Akhlaq Ar-Rasul Al-Karim (Al-Maktabah Asy-Syamilah)", url: "https://shamela.ws/book/22798/417" },
      { judul: "Dorar.net, takhrij riwayat tanggal Bani Nadhir", url: "https://dorar.net/h/c84R0J0X" }
    ],

    tokohBaru: {
      abdullahjubair: {
        nama: "Abdullah bin Jubair", arab: "عبد الله بن جبير", lahir: 595, wafat: 625, kira: true, gelar: "Komandan pemanah di Uhud",
        kel: ["anshar", "panglima"], tinggal: [["madinah", 595, 625, "Dari Bani Amr bin Auf (Aus); gugur di Uhud"]],
        ringkas: "Sahabat Anshar yang ikut Perang Badar. Di Uhud ia memimpin 50 pemanah di bukit kecil dan tetap bertahan bersama segelintir orang ketika sebagian besar anak buahnya turun; ia gugur di pos itu.",
        wiki: W("Battle_of_Uhud")
      },
      amrabdwudd: {
        nama: "Amr bin Abd Wudd", arab: "عمرو بن عبد ود", lahir: 575, wafat: 627, kira: true, gelar: "Jagoan Quraisy di Khandaq",
        kel: ["penentang"], tinggal: [["makkah", 575, 627, "Dari Bani Amir bin Lu'ai, Quraisy"]],
        ringkas: "Penunggang kuda Quraisy yang terkenal pemberani. Dalam Perang Khandaq ia menyeberangi bagian parit yang sempit, menantang duel, lalu tewas di tangan Ali bin Abi Thalib.",
        wiki: W("Amr_ibn_Abd_al-Wud")
      },
      huyay: {
        nama: "Huyay bin Akhthab", arab: "حيي بن أخطب", lahir: 570, wafat: 627, kira: true, gelar: "Pemimpin Bani Nadhir",
        kel: ["penentang"], tinggal: [["madinah", 570, 625, "Pemuka Bani Nadhir di Yatsrib"], ["khaibar", 625, 627, "Pindah ke Khaibar setelah Bani Nadhir diusir"]],
        ringkas: "Pemimpin Bani Nadhir dan ayah Shafiyyah. Setelah kaumnya diusir ke Khaibar, ia menghimpun Quraisy dan Ghathafan untuk Perang Khandaq dan membujuk Bani Quraizhah membatalkan perjanjian. Ia dihukum mati setelah Bani Quraizhah menyerah.",
        wiki: W("Huyayy_ibn_Akhtab")
      },
      kaabasad: {
        nama: "Ka'ab bin Asad Al-Qurazhi", arab: "كعب بن أسد", lahir: 580, wafat: 627, kira: true, gelar: "Pemimpin Bani Quraizhah",
        kel: ["penentang"], tinggal: [["madinah", 580, 627, "Pemimpin Bani Quraizhah di Yatsrib"]],
        ringkas: "Pemimpin Bani Quraizhah yang memegang perjanjian dengan Nabi ﷺ. Semula ia menolak Huyay bin Akhthab, tetapi akhirnya membatalkan perjanjian saat Perang Khandaq. Ia dihukum mati setelah kaumnya menyerah.",
        wiki: W("Ka%27b_ibn_Asad")
      },
      marhab: {
        nama: "Marhab", arab: "مرحب", lahir: 595, wafat: 628, kira: true, gelar: "Jagoan Khaibar",
        kel: ["penentang"], tinggal: [["khaibar", 595, 628, "Kesatria benteng-benteng Khaibar"]],
        ringkas: "Kesatria Yahudi Khaibar yang menantang duel saat Perang Khaibar. Menurut HR. Muslim ia tewas di tangan Ali bin Abi Thalib; Ibnu Ishaq menyebut Muhammad bin Maslamah.",
        wiki: W("Marhab")
      },
      malikauf: {
        nama: "Malik bin Auf An-Nashri", arab: "مالك بن عوف النصري", lahir: 600, wafat: 640, kira: true, gelar: "Panglima Hawazin di Hunain",
        kel: ["panglima"], tinggal: [["thaif", 600, 636, "Pemimpin Hawazin (Bani Nashr), di sekitar Thaif"], ["syam", 636, 640, "Ikut pembebasan Irak dan Syam, lalu menetap di Damaskus"]],
        ringkas: "Pemimpin muda Hawazin yang memimpin pasukan Hawazin dan Tsaqif di Hunain, lalu berlindung di Thaif. Ia kemudian datang kepada Nabi ﷺ dan masuk Islam; keluarganya dikembalikan dan ia diangkat memimpin kaumnya. Tahun wafatnya tidak pasti.",
        wiki: W("Malik_ibn_Awf")
      },
      nuaim: {
        nama: "Nu'aim bin Mas'ud Al-Asyja'i", arab: "نعيم بن مسعود", lahir: 590, wafat: 656, kira: true, gelar: "Pemecah barisan Al-Ahzab",
        kel: ["lain"], tinggal: [[null, 590, 656, "Bani Asyja' (Ghathafan) di Najd; masuk Islam saat Perang Khandaq"]],
        ringkas: "Tokoh Ghathafan yang dihormati para anggota pasukan sekutu. Saat Perang Khandaq ia diam-diam masuk Islam dan, atas izin Nabi ﷺ, membuat Bani Quraizhah dan pasukan sekutu saling curiga. Tahun wafatnya diperselisihkan.",
        wiki: W("Nu%27aym_ibn_Mas%27ud")
      },
      abulubabah: {
        nama: "Abu Lubabah bin Abdul Mundzir", arab: "أبو لبابة بن عبد المنذر", lahir: 590, wafat: 660, kira: true, gelar: "Sahabat yang mengikat diri di tiang masjid",
        kel: ["anshar"], tinggal: [["madinah", 590, 660, "Dari Bani Amr bin Auf (Aus)"]],
        ringkas: "Sahabat Anshar dari suku Aus yang beberapa kali dititipi Madinah, di antaranya saat Perang Badar. Saat pengepungan Bani Quraizhah ia menyesali isyaratnya kepada mereka, lalu mengikat dirinya di tiang Masjid Nabawi sampai tobatnya diterima. Tahun wafatnya tidak pasti.",
        wiki: W("Abu_Lubaba_ibn_Abd_al-Mundhir")
      },
      salamahakwa: {
        nama: "Salamah bin Al-Akwa'", arab: "سلمة بن الأكوع", lahir: 612, wafat: 693, kira: true, gelar: "Pelari dan pemanah ulung",
        kel: ["lain"], tinggal: [["madinah", 612, 693, "Dari Bani Aslam"]],
        ringkas: "Sahabat dari Bani Aslam yang ikut Baiat Ridwan. Pada Ghazwah Dzu Qarad ia mengejar para perampas unta Nabi ﷺ seorang diri dan merebutnya kembali, sehingga dipuji sebagai pejalan kaki terbaik hari itu. Ia juga perawi hadits panjang tentang Hudaibiyah, Dzu Qarad, dan Khaibar.",
        wiki: W("Salamah_ibn_al-Akwa")
      }
    }
  };
})();
