// Tokoh sejarah Islam (570–661 M): profil, kelompok, tempat tinggal per periode, rumah di peta Mekah, dan sumber profil.
// Melengkapi SIRAH.tokoh dari data.js dan city-data.js. Tahun bertanda kira: true adalah perkiraan.
// tinggal: [lokasi, dari, sampai, keterangan] — lokasi berupa id di SIRAH.lokasi, atau null bila tempatnya di luar peta (nama ditulis di keterangan).
// rumah: [[id tempat di peta Mekah, keterangan]]. DRAF: wajib diverifikasi ustadz.
(function () {
  const D = window.SIRAH;
  const W = (p) => "https://en.wikipedia.org/wiki/" + p;

  // ---------- Lokasi tambahan di peta wilayah ----------
  Object.assign(D.lokasi, {
    yaman: { nama: "Yaman (Shan'a)", arab: "اليمن", lon: 44.2, lat: 15.35, jenis: "kota",
      ket: "Negeri subur di selatan Jazirah, pusat kerajaan-kerajaan Arab Selatan. Pada abad ke-6 dikuasai Habasyah lalu Persia, dan masuk Islam di masa Nabi." },
    madain: { nama: "Al-Mada'in", arab: "المدائن", lon: 44.58, lat: 33.09, jenis: "kota",
      ket: "Ibu kota Kekaisaran Persia Sasaniyah (Ktesifon) di tepi Sungai Tigris. Dibebaskan pasukan Sa'ad bin Abi Waqqash pada 637 M." },
    hims: { nama: "Hims", arab: "حمص", lon: 36.72, lat: 34.73, jenis: "kota",
      ket: "Kota di Syam bagian utara, tempat Khalid bin Walid menghabiskan akhir hidupnya." },
    mutah: { nama: "Mu'tah", arab: "مؤتة", lon: 35.7, lat: 31.08, jenis: "medan",
      ket: "Desa di timur Laut Mati, tempat pasukan Muslim pertama kali berhadapan dengan pasukan Romawi pada 629 M." },
    hunain: { nama: "Hunain", arab: "حنين", lon: 40.06, lat: 21.55, jenis: "medan",
      ket: "Lembah di antara Mekah dan Thaif, tempat Perang Hunain melawan kabilah Hawazin pada 630 M." },
    nahawand: { nama: "Nahawand", arab: "نهاوند", lon: 48.37, lat: 34.19, jenis: "medan",
      ket: "Kota di pegunungan Zagros, Persia. Kemenangan di sini pada 642 M disebut fathul futuh, kemenangan dari segala kemenangan." }
  });

  const KELOMPOK = {
    keluarga: "Keluarga Nabi", istri: "Istri Nabi", khulafa: "Khulafaur Rasyidin", asyarah: "Sepuluh yang dijamin surga",
    muhajirin: "Muhajirin", anshar: "Anshar", panglima: "Panglima", ulama: "Ulama dan penghafal Al-Qur'an",
    sahabiyat: "Sahabat perempuan", penentang: "Penentang dakwah", raja: "Raja dan tokoh bangsa lain", pra: "Sebelum kenabian", lain: "Sahabat lainnya"
  };
  D.kelompok = KELOMPOK;

  // ---------- Melengkapi tokoh yang sudah ada ----------
  const PLUS = {
    nabi: { kira: true, ringkas: "Nabi dan rasul terakhir. Lahir di Mekah pada Tahun Gajah, menerima wahyu pertama di usia 40 tahun, hijrah ke Madinah pada usia 53, dan wafat di Madinah pada usia 63 tahun (hitungan tahun Hijriah).", kel: ["keluarga"], tinggal: [["makkah", 570, 622, "Lahir di Mekah; masa kecil disusui di perkampungan Bani Sa'd"], ["madinah", 622, 632, "Hijrah dan tinggal di Madinah sampai wafat"]],
      rumah: [["maulid", "tempat lahir"], ["khadijah", "rumah bersama Khadijah sampai Hijrah"]], wiki: W("Muhammad") },
    abdulmuthalib: { lahir: 496, kira: true, kel: ["keluarga", "pra"], tinggal: [["madinah", 496, 504, "Lahir di Yatsrib dan diasuh keluarga ibunya, Bani Najjar"], ["makkah", 504, 578, "Dibawa pamannya, Al-Muthalib, ke Mekah; kemudian pemimpin Quraisy dan pengurus Zamzam"]], rumah: [["abdulmuthalib", "perkiraan"]], wiki: W("Abd_al-Muttalib") },
    aminah: { kel: ["keluarga", "pra"], tinggal: [["makkah", 549, 576, "Wafat di Abwa' dalam perjalanan pulang dari Yatsrib"]], wiki: W("Amina_bint_Wahb") },
    abuthalib: { kel: ["keluarga"], tinggal: [["makkah", 535, 619, "Pemimpin Bani Hasyim"]], rumah: [["syiib", "kawasan Bani Hasyim"]], wiki: W("Abu_Talib_ibn_Abd_al-Muttalib") },
    khadijah: { kel: ["istri"], tinggal: [["makkah", 555, 619]], rumah: [["khadijah", "rumahnya bersama Nabi"]], wiki: W("Khadija_bint_Khuwaylid") },
    abubakar: { kira: true, kel: ["khulafa", "asyarah", "muhajirin"], tinggal: [["makkah", 573, 622, "Rumahnya di Mekah belum bisa dipetakan"], ["madinah", 622, 634]], wiki: W("Abu_Bakr") },
    umar: { kel: ["khulafa", "asyarah", "muhajirin"], tinggal: [["makkah", 584, 622], ["madinah", 622, 644]], wiki: W("Umar") },
    utsman: { kel: ["khulafa", "asyarah", "muhajirin"], tinggal: [["makkah", 576, 615], ["habasyah", 615, 619, "Hijrah ke Habasyah bersama Ruqayyah (perkiraan lama tinggal)"], ["makkah", 619, 622], ["madinah", 622, 656]], wiki: W("Uthman") },
    ali: { kel: ["khulafa", "asyarah", "keluarga", "muhajirin"], tinggal: [["makkah", 600, 622, "Diasuh Nabi sejak kecil"], ["madinah", 622, 656], ["kufah", 656, 661, "Pusat pemerintahan selama menjadi khalifah"]], wiki: W("Ali") },
    aisyah: { kel: ["istri", "ulama"], tinggal: [["makkah", 613, 622], ["madinah", 622, 678]], wiki: W("Aisha") },
    fatimah: { kel: ["keluarga"], tinggal: [["makkah", 605, 622], ["madinah", 622, 632]], wiki: W("Fatimah") },
    hamzah: { kel: ["keluarga", "muhajirin"], tinggal: [["makkah", 568, 622], ["madinah", 622, 625, "Gugur di Uhud"]], wiki: W("Hamza_ibn_Abd_al-Muttalib") },
    bilal: { kel: ["muhajirin"], tinggal: [["makkah", 580, 622, "Budak Umayyah bin Khalaf, lalu dimerdekakan Abu Bakar"], ["madinah", 622, 634], ["syam", 634, 640, "Ikut ke Syam setelah Nabi wafat; wafat di Damaskus"]], wiki: W("Bilal_ibn_Rabah") },
    abulahab: { kel: ["penentang", "keluarga"], tinggal: [["makkah", 549, 624]], rumah: [["abulahab", "perkiraan"]], wiki: W("Abu_Lahab") },
    abujahal: { kel: ["penentang"], tinggal: [["makkah", 570, 624]], rumah: [["abujahal", "perkiraan"]], wiki: W("Abu_Jahl") },
    ibnuummimaktum: { kel: ["muhajirin"], tinggal: [["makkah", 580, 621], ["madinah", 621, 636, "Tiba di Madinah sebelum Nabi (HR. Bukhari no. 3925); muadzin dan beberapa kali mewakili Nabi memimpin Madinah"], ["kufah", 636, 636, "Gugur dalam Perang Qadisiyyah, dekat Kufah"]], wiki: W("Ibn_Umm_Maktum") },
    zaid: { kel: ["keluarga", "muhajirin", "panglima"], tinggal: [[null, 581, 589, "Lahir di kabilah Kalb, Najd; diculik lalu dijual sebagai budak"], ["makkah", 589, 622], ["madinah", 622, 629, "Gugur sebagai panglima di Mu'tah"]], wiki: W("Zayd_ibn_Haritha") },
    jafar: { kel: ["keluarga", "muhajirin", "panglima"], tinggal: [["makkah", 590, 615], ["habasyah", 615, 628, "Memimpin kaum Muhajirin di Habasyah"], ["madinah", 628, 629]], wiki: W("Ja%27far_ibn_Abi_Talib") },
    najasyi: { kel: ["raja"], tinggal: [["habasyah", 580, 630, "Raja Aksum"]], wiki: W("Najashi") },
    salman: { kel: ["lain"], tinggal: [[null, 568, 620, "Persia (Isfahan), lalu Syam dan Irak sebagai pencari kebenaran"], ["madinah", 620, 637], ["madain", 637, 653, "Gubernur Al-Mada'in di masa Umar; wafat di sana (riwayat tahun wafat berbeda, 652–656)"]], wafat: 653, wiki: W("Salman_the_Persian") },
    khalid: { kel: ["panglima"], tinggal: [["makkah", 592, 629], ["madinah", 629, 633], ["kufah", 633, 634, "Kampanye Irak (Al-Hirah), sebelum Kufah dibangun"], ["syam", 634, 638, "Memimpin penaklukan Syam; gubernur Qinnasrin"], ["hims", 638, 642, "Wafat di Hims; ada riwayat wafat di Madinah"]], wiki: W("Khalid_ibn_al-Walid") },
    kaab: { kel: ["anshar"], tinggal: [["madinah", 595, 670]], wiki: "https://sunnah.com/narrator/6603" },
    zaidtsabit: { kel: ["anshar", "ulama"], tinggal: [["madinah", 611, 665]], wiki: W("Zayd_ibn_Thabit") },
    abuubaidah: { kel: ["asyarah", "muhajirin", "panglima"], tinggal: [["makkah", 583, 622], ["madinah", 622, 634], ["syam", 634, 639, "Panglima tertinggi di Syam; wafat karena wabah Amwas"]], wiki: W("Abu_Ubayda_ibn_al-Jarrah") },
    saad: { kel: ["asyarah", "muhajirin", "panglima"], tinggal: [["makkah", 595, 622], ["madinah", 622, 636], ["kufah", 638, 642, "Membangun Kufah dan menjadi gubernurnya"], ["madinah", 642, 644], ["kufah", 644, 646, "Diangkat kembali oleh Utsman"], ["madinah", 646, 674, "Wafat di Al-'Aqiq dekat Madinah"]], wiki: W("Sa%27d_ibn_Abi_Waqqas") },
    amr: { kel: ["panglima"], tinggal: [["makkah", 573, 629], ["madinah", 629, 634, "Sempat menjadi gubernur Oman"], ["quds", 634, 639, "Panglima dan gubernur Palestina"], ["mesir", 640, 646, "Membebaskan Mesir dan membangun Fustat"], ["quds", 646, 658, "Tinggal di tanahnya di Palestina"], ["mesir", 658, 664, "Gubernur Mesir lagi sampai wafat"]], wiki: W("Amr_ibn_al-As") },
    muawiyah: { kel: ["lain"], tinggal: [["makkah", 602, 630], ["madinah", 630, 634], ["syam", 634, 680, "Panglima di bawah saudaranya, Yazid; gubernur Damaskus sejak 639, kemudian khalifah"]], wiki: W("Mu%27awiya_I") },
    hasan: { kira: true, kel: ["keluarga"], tinggal: [["madinah", 625, 656], ["kufah", 656, 661], ["madinah", 661, 670]], wiki: W("Hasan_ibn_Ali") },
    waraqah: { kel: ["pra"], tinggal: [["makkah", 540, 610]], rumah: [["waraqah", "ilustrasi, letak tidak tercatat"]], wiki: W("Waraqah_ibn_Nawfal") },
    abusufyan: { lahir: 560, wafat: 653, kel: ["penentang"], tinggal: [["makkah", 560, 630], ["madinah", 630, 653]], rumah: [["abusufyan", "menurut kitab sejarah"]], wiki: W("Abu_Sufyan_ibn_Harb") }
  };
  Object.entries(PLUS).forEach(([id, p]) => { if (D.tokoh[id]) Object.assign(D.tokoh[id], p); });

  // ---------- Tokoh baru ----------
  // T(id, nama, arab, lahir, wafat, kira, gelar, kel, tinggal, ringkas, lain)
  const T = (id, nama, arab, lahir, wafat, kira, gelar, kel, tinggal, ringkas, lain = {}) => {
    D.tokoh[id] = { nama, arab, lahir, wafat, kira, gelar, kel, tinggal, ringkas, ...lain };
  };
  const BARU = () => {
    // Keluarga Nabi
    T("abdullah", "Abdullah bin Abdul Muthalib", "عبد الله", 545, 570, true, "Ayahanda Nabi", ["keluarga", "pra"], [["makkah", 545, 570, "Wafat di Yatsrib sebelum Nabi lahir"]],
      "Putra Abdul Muthalib yang menikah dengan Aminah binti Wahab. Ia wafat di Yatsrib (Madinah) dalam perjalanan dagang, beberapa bulan sebelum Nabi lahir.", { wiki: W("Abdullah_ibn_Abd_al-Muttalib") });
    T("halimah", "Halimah As-Sa'diyah", "حليمة", 550, 630, true, "Ibu susuan Nabi", ["keluarga", "pra", "sahabiyat"], [[null, 550, 630, "Perkampungan Bani Sa'd bin Bakr, pedalaman tenggara Mekah"]],
      "Perempuan dari Bani Sa'd bin Bakr yang menyusui dan mengasuh Nabi di pedalaman selama beberapa tahun masa kecil beliau. Tahun lahir dan wafatnya tidak tercatat pasti.", { wiki: W("Halimah_bint_Abi_Dhuayb"), takTercatat: true });
    T("ummuaiman", "Ummu Aiman (Barakah)", "أم أيمن", 550, 644, true, "Pengasuh Nabi", ["keluarga", "sahabiyat"], [["makkah", 550, 622], ["madinah", 622, 644]],
      "Pembantu Abdullah yang mengasuh Nabi sejak kecil, lalu dimerdekakan beliau. Istri Zaid bin Haritsah dan ibu Usamah bin Zaid. Tahun wafatnya diperselisihkan: sekitar lima bulan setelah Nabi, atau di awal masa Utsman menurut Ibnu Sa'd.", { wiki: W("Umm_Ayman") });
    T("abbas", "Al-Abbas bin Abdul Muthalib", "العباس", 567, 653, true, "Paman Nabi", ["keluarga"], [["makkah", 567, 630], ["madinah", 630, 653]],
      "Paman Nabi yang usianya hanya terpaut sekitar dua atau tiga tahun. Menurut kitab sirah ia hadir di Baiat Aqabah kedua. Ia tertawan di Badar di pihak Quraisy, lalu masuk Islam. Di Perang Hunain ia berseru memanggil para sahabat untuk kembali (HR. Muslim no. 1775).", { wiki: W("Al-Abbas_ibn_Abd_al-Muttalib") });
    T("zainab", "Zainab binti Muhammad", "زينب", 599, 629, true, "Putri sulung Nabi", ["keluarga"], [["makkah", 599, 624], ["madinah", 624, 629]],
      "Putri sulung Nabi dan Khadijah, istri Abul 'Ash bin Ar-Rabi'. Ia hijrah ke Madinah setelah Perang Badar; suaminya kemudian masuk Islam dan menyusulnya.", { wiki: W("Zainab_bint_Muhammad") });
    T("ruqayyah", "Ruqayyah binti Muhammad", "رقية", 601, 624, true, "Putri Nabi", ["keluarga"], [["makkah", 601, 615], ["habasyah", 615, 619, "Hijrah bersama Utsman (perkiraan lama tinggal)"], ["makkah", 619, 622], ["madinah", 622, 624]],
      "Putri Nabi yang menikah dengan Utsman bin Affan dan ikut hijrah ke Habasyah. Ia wafat di Madinah ketika kaum muslimin berada di Badar.", { wiki: W("Ruqayya_bint_Muhammad") });
    T("ummukultsum", "Ummu Kultsum binti Muhammad", "أم كلثوم", 603, 630, true, "Putri Nabi", ["keluarga"], [["makkah", 603, 622], ["madinah", 622, 630]],
      "Putri Nabi yang dinikahkan dengan Utsman setelah Ruqayyah wafat, sehingga Utsman dijuluki Dzun Nurain.", { wiki: W("Umm_Kulthum_bint_Muhammad") });
    T("ibrahim", "Ibrahim bin Muhammad", "إبراهيم", 630, 632, true, "Putra Nabi", ["keluarga"], [["madinah", 630, 632]],
      "Putra Nabi dari Mariyah. Ia wafat saat masih bayi. Hari itu terjadi gerhana matahari, dan Nabi menegaskan bahwa gerhana tidak terjadi karena kematian atau kelahiran seseorang (HR. Bukhari no. 1043).", { wiki: W("Ibrahim_ibn_Muhammad") });
    T("husain", "Husain bin Ali", "الحسين", 626, 680, false, "Cucu Nabi", ["keluarga"], [["madinah", 626, 656], ["kufah", 656, 661], ["madinah", 661, 680]],
      "Putra Ali dan Fatimah, cucu Nabi. Nabi bersabda bahwa Hasan dan Husain adalah penghulu pemuda ahli surga (HR. Tirmidzi). Ia wafat di Karbala pada 680 M, di luar rentang aplikasi ini.", { wiki: W("Husayn_ibn_Ali") });
    T("ibnuabbas", "Abdullah bin Abbas", "ابن عباس", 619, 687, true, "Turjumanul Qur'an", ["keluarga", "ulama"], [["makkah", 619, 629], ["madinah", 629, 656], ["bashrah", 656, 660, "Gubernur Bashrah di masa Ali"], ["makkah", 660, 680], ["thaif", 680, 687, "Wafat di Thaif"]],
      "Sepupu Nabi. Nabi mendoakannya, \"Ya Allah, ajarkanlah kepadanya Al-Kitab\" (HR. Bukhari no. 75). Ia menjadi ahli tafsir terkemuka dari kalangan sahabat.", { wiki: W("Abd_Allah_ibn_Abbas") });
    T("usamah", "Usamah bin Zaid", "أسامة", 613, 674, true, "Kesayangan Rasulullah", ["keluarga", "panglima"], [["makkah", 613, 622], ["madinah", 622, 632], [null, 632, 640, "Wadi Al-Qura, utara Madinah"], ["madinah", 640, 674, "Wafat di Al-Jurf dekat Madinah"]],
      "Putra Zaid bin Haritsah dan Ummu Aiman. Di usia muda ia diangkat Nabi memimpin pasukan ke arah Syam; pasukan itu diberangkatkan Abu Bakar setelah Nabi wafat. Wafat sekitar 54 H; ada riwayat lain sekitar 680 M.", { wiki: W("Usama_ibn_Zayd") });
    T("safiyyah", "Shafiyyah binti Abdul Muthalib", "صفية", 570, 640, true, "Bibi Nabi", ["keluarga", "sahabiyat"], [["makkah", 570, 622], ["madinah", 622, 640]],
      "Bibi Nabi dan ibu Az-Zubair bin Al-Awwam. Menurut kitab sirah, di Perang Khandaq ia berjaga di benteng tempat para perempuan berlindung.", { wiki: W("Safiyya_bint_Abd_al-Muttalib") });

    // Istri Nabi
    T("saudah", "Saudah binti Zam'ah", "سودة", 580, 674, true, "Ummul Mukminin", ["istri"], [["makkah", 580, 615], ["habasyah", 615, 619, "Hijrah bersama suami pertamanya, As-Sakran"], ["makkah", 619, 622], ["madinah", 622, 674]],
      "Termasuk yang awal masuk Islam. Dinikahi Nabi setelah Khadijah wafat. Di masa tuanya ia memberikan gilirannya kepada Aisyah.", { wiki: W("Sawdah_bint_Zam%27ah") });
    T("hafshah", "Hafshah binti Umar", "حفصة", 605, 665, true, "Ummul Mukminin", ["istri"], [["makkah", 605, 622], ["madinah", 622, 665]],
      "Putri Umar bin Khattab. Lembaran-lembaran Al-Qur'an yang dikumpulkan di masa Abu Bakar disimpan padanya, lalu dipinjam Utsman untuk disalin menjadi mushaf (HR. Bukhari no. 4987).", { wiki: W("Hafsa_bint_Umar") });
    T("zainabkhuzaimah", "Zainab binti Khuzaimah", "زينب بنت خزيمة", 595, 625, true, "Ummul Masakin", ["istri"], [["makkah", 595, 622], ["madinah", 622, 625]],
      "Dijuluki Ummul Masakin, ibu orang-orang miskin, karena kedermawanannya. Ia wafat beberapa bulan setelah menikah dengan Nabi.", { wiki: W("Zaynab_bint_Khuzayma") });
    T("ummusalamah", "Ummu Salamah", "أم سلمة", 596, 680, true, "Ummul Mukminin", ["istri"], [["makkah", 596, 615], ["habasyah", 615, 619, "Hijrah ke Habasyah bersama suaminya, Abu Salamah"], ["makkah", 619, 622, "Sempat tertahan di Mekah, terpisah dari suaminya sekitar setahun"], ["madinah", 622, 680]],
      "Hindun binti Abi Umayyah. Bersama suaminya Abu Salamah ia hijrah ke Habasyah lalu ke Madinah. Di Hudaibiyah, sarannya agar Nabi menyembelih lebih dulu diikuti seluruh sahabat (HR. Bukhari no. 2731).", { wiki: W("Umm_Salama") });
    T("zainabjahsy", "Zainab binti Jahsy", "زينب بنت جحش", 590, 641, true, "Ummul Mukminin", ["istri"], [["makkah", 590, 622], ["madinah", 622, 641]],
      "Sepupu Nabi. Pernikahannya disebut dalam QS. Al-Ahzab: 37. Ia dikenal sangat dermawan dan menjadi istri Nabi pertama yang wafat sesudah beliau.", { wiki: W("Zaynab_bint_Jahsh") });
    T("juwairiyah", "Juwairiyah binti Al-Harits", "جويرية", 608, 676, true, "Ummul Mukminin", ["istri"], [[null, 608, 627, "Kabilah Bani Mushthaliq"], ["madinah", 627, 676]],
      "Putri pemimpin Bani Mushthaliq. Menurut riwayat Abu Dawud, setelah ia dinikahi Nabi, para sahabat membebaskan tawanan dari kaumnya.", { wiki: W("Juwayriyya_bint_al-Harith") });
    T("ummuhabibah", "Ummu Habibah (Ramlah)", "أم حبيبة", 594, 665, true, "Ummul Mukminin", ["istri"], [["makkah", 594, 615], ["habasyah", 615, 628, "Hijrah ke Habasyah; akad nikahnya dengan Nabi dilangsungkan di sana"], ["madinah", 628, 665]],
      "Ramlah binti Abi Sufyan. Ia tetap berislam meski ayahnya memimpin Quraisy. Akad nikahnya dengan Nabi dilangsungkan di Habasyah, diwakili Najasyi.", { wiki: W("Ramla_bint_Abi_Sufyan") });
    T("shafiyyah", "Shafiyyah binti Huyay", "صفية بنت حيي", 610, 670, true, "Ummul Mukminin", ["istri"], [["madinah", 610, 625, "Yatsrib, permukiman Bani Nadhir"], ["khaibar", 625, 628, "Keluarganya pindah ke Khaibar setelah Bani Nadhir diusir"], ["madinah", 628, 670]],
      "Putri Huyay bin Akhthab, pemimpin Bani Nadhir. Dinikahi Nabi setelah pembebasan Khaibar (HR. Bukhari no. 371).", { wiki: W("Safiyya_bint_Huyayy") });
    T("maimunah", "Maimunah binti Al-Harits", "ميمونة", 594, 671, true, "Ummul Mukminin", ["istri"], [["makkah", 594, 629], ["madinah", 629, 671]],
      "Istri terakhir yang dinikahi Nabi, pada Umrah Qadha (7 H). Ia bibi dari Ibnu Abbas dan Khalid bin Walid.", { wiki: W("Maymuna_bint_al-Harith") });
    T("mariyah", "Mariyah Al-Qibthiyyah", "مارية", 610, 637, true, "Ibu Ibrahim putra Nabi", ["keluarga"], [[null, 610, 628, "Mesir; desa Hebenu dekat Antinoöpolis (menurut Al-Maqrizi)"], ["madinah", 628, 637]],
      "Dihadiahkan penguasa Mesir, Al-Muqauqis, kepada Nabi, lalu melahirkan Ibrahim. Ia wafat di masa Umar.", { wiki: W("Maria_al-Qibtiyya") });

    // Sepuluh yang dijamin surga (selain yang sudah ada)
    T("thalhah", "Thalhah bin Ubaidillah", "طلحة", 594, 656, true, "Salah satu dari sepuluh yang dijamin surga", ["asyarah", "muhajirin"], [["makkah", 594, 622], ["madinah", 622, 656]],
      "Di Perang Uhud ia melindungi Nabi dengan tangannya hingga tangannya lumpuh (HR. Bukhari no. 3724). Termasuk enam anggota syura yang ditunjuk Umar. Gugur di Perang Jamal.", { wiki: W("Talha_ibn_Ubayd_Allah") });
    T("zubair", "Az-Zubair bin Al-Awwam", "الزبير", 594, 656, true, "Hawari Rasulullah", ["asyarah", "muhajirin", "keluarga"], [["makkah", 594, 615], ["habasyah", 615, 619, "Termasuk rombongan pertama yang hijrah ke Habasyah"], ["makkah", 619, 622], ["madinah", 622, 656]],
      "Sepupu Nabi, putra Shafiyyah. Nabi bersabda, \"Setiap nabi punya hawari (pembela setia), dan hawariku adalah Az-Zubair\" (HR. Bukhari no. 2846). Anggota syura; wafat setelah meninggalkan Perang Jamal.", { wiki: W("Al-Zubayr_ibn_al-Awwam") });
    T("abdurrahman", "Abdurrahman bin Auf", "عبد الرحمن", 581, 654, true, "Salah satu dari sepuluh yang dijamin surga", ["asyarah", "muhajirin"], [["makkah", 581, 615], ["habasyah", 615, 619, "Hijrah ke Habasyah"], ["makkah", 619, 622], ["madinah", 622, 654]],
      "Pedagang yang dermawan. Di Madinah ia dipersaudarakan dengan Sa'ad bin Ar-Rabi' dan memilih berdagang di pasar daripada menerima separuh harta saudaranya. Ia memimpin musyawarah syura yang memilih Utsman.", { wiki: W("Abd_al-Rahman_ibn_Awf") });
    T("said", "Sa'id bin Zaid", "سعيد بن زيد", 593, 671, true, "Salah satu dari sepuluh yang dijamin surga", ["asyarah", "muhajirin"], [["makkah", 593, 622], ["madinah", 622, 671]],
      "Masuk Islam di awal dakwah bersama istrinya, Fathimah binti Khattab, adik Umar. Menurut kitab sirah, di rumah merekalah Umar membaca Al-Qur'an sebelum masuk Islam.", { wiki: W("Sa%27id_ibn_Zayd") });

    // Muhajirin dan sahabat Mekah
    T("ammar", "Ammar bin Yasir", "عمار", 570, 657, true, "Sahabat yang disiksa bersama keluarganya", ["muhajirin"], [["makkah", 570, 622], ["madinah", 622, 642], ["kufah", 642, 644, "Gubernur Kufah di masa Umar"], ["madinah", 644, 656], ["kufah", 656, 657]],
      "Bersama ayahnya Yasir dan ibunya Sumayyah ia disiksa di Mekah karena keimanannya. Ikut membangun masjid pertama di Quba. Gugur di Perang Shiffin.", { wiki: W("Ammar_ibn_Yasir") });
    T("yasir", "Yasir bin Amir", "ياسر", 530, 615, true, "Ayah Ammar", ["muhajirin"], [[null, 530, 560, "Yaman, sebelum menetap di Mekah"], ["makkah", 560, 615]],
      "Pendatang dari Yaman yang menetap di Mekah. Ia, istrinya, dan putranya disiksa karena masuk Islam; ia wafat akibat siksaan itu (kitab sirah).", { wiki: W("Yasir_ibn_Amir") });
    T("sumayyah", "Sumayyah binti Khayyat", "سمية", 550, 615, true, "Syahidah pertama", ["sahabiyat", "muhajirin"], [["makkah", 550, 615]],
      "Ibu Ammar bin Yasir. Menurut kitab sirah, ia dibunuh Abu Jahal karena keimanannya dan menjadi orang pertama yang syahid dalam Islam.", { wiki: W("Sumayyah_bint_Khayyat") });
    T("mushab", "Mush'ab bin Umair", "مصعب", 596, 625, true, "Duta pertama Islam", ["muhajirin"], [["makkah", 596, 621], ["madinah", 621, 625, "Diutus mengajar ke Yatsrib sebelum Hijrah"]],
      "Pemuda Mekah yang diutus Nabi ke Yatsrib setelah Baiat Aqabah pertama untuk mengajarkan Al-Qur'an. Pembawa panji di Uhud dan gugur di sana; kain kafannya tidak cukup menutupi seluruh tubuhnya (HR. Bukhari no. 1276).", { wiki: W("Mus%27ab_ibn_Umayr") });
    T("abudzar", "Abu Dzar Al-Ghifari", "أبو ذر", 590, 652, true, "Sahabat yang zuhud", ["muhajirin"], [[null, 590, 628, "Perkampungan kabilah Ghifar"], ["madinah", 628, 634], ["syam", 634, 650], [null, 650, 652, "Rabadzah, timur Madinah; wafat di sana"]],
      "Dari kabilah Ghifar dan termasuk yang awal masuk Islam. Ia mengumumkan keislamannya dengan lantang di dekat Ka'bah hingga dipukuli kaum Quraisy (HR. Bukhari no. 3861).", { wiki: W("Abu_Dharr_al-Ghifari") });
    T("ibnumasud", "Abdullah bin Mas'ud", "ابن مسعود", 594, 653, true, "Ahli Al-Qur'an", ["muhajirin", "ulama"], [["makkah", 594, 616], ["habasyah", 616, 619], ["makkah", 619, 622], ["madinah", 622, 641], ["kufah", 641, 650, "Diutus Umar mengajar di Kufah"], ["madinah", 650, 653]],
      "Penggembala yang masuk Islam di awal dakwah. Nabi bersabda, \"Ambillah Al-Qur'an dari empat orang,\" dan menyebutnya yang pertama (HR. Bukhari no. 3808).", { wiki: W("Abd_Allah_ibn_Mas%27ud") });
    T("khabbab", "Khabbab bin Al-Arat", "خباب", 586, 657, true, "Pandai besi yang disiksa", ["muhajirin"], [["makkah", 586, 622], ["madinah", 622, 640], ["kufah", 640, 657]],
      "Pandai besi di Mekah yang disiksa karena Islam. Ia mengadukan siksaan itu kepada Nabi yang sedang berbantal kain di naungan Ka'bah (HR. Bukhari no. 3612). Wafat di Kufah.", { wiki: W("Khabbab_ibn_al-Aratt") });
    T("suhaib", "Shuhaib Ar-Rumi", "صهيب", 592, 659, true, "Sahabat dari negeri Romawi", ["muhajirin"], [[null, 592, 612, "Tumbuh sebagai budak di wilayah Romawi"], ["makkah", 612, 622], ["madinah", 622, 659]],
      "Dibesarkan di wilayah Romawi sebelum tinggal di Mekah. Menurut kitab sirah, ia menyerahkan seluruh hartanya kepada Quraisy agar diizinkan berhijrah.", { wiki: W("Suhayb_ar-Rumi") });
    T("abuhurairah", "Abu Hurairah", "أبو هريرة", 603, 679, true, "Perawi hadits terbanyak", ["ulama", "lain"], [[null, 603, 628, "Kabilah Daus, selatan Hijaz"], ["madinah", 628, 679, "Sempat menjadi gubernur Bahrain di masa Umar"]],
      "Dari kabilah Daus; datang ke Madinah dan masuk Islam pada tahun Khaibar (7 H). Ia selalu menyertai Nabi dan meriwayatkan hadits paling banyak (HR. Bukhari no. 118).", { wiki: W("Abu_Hurayra") });
    T("arqam", "Al-Arqam bin Abil Arqam", "الأرقم", 597, 675, true, "Pemilik Darul Arqam", ["muhajirin"], [["makkah", 597, 622], ["madinah", 622, 675]],
      "Rumahnya di dekat Bukit Shafa menjadi tempat Nabi mengajar para sahabat secara diam-diam di awal dakwah.", { rumah: [["arqam", "Darul Arqam"]], wiki: W("Al-Arqam_ibn_Abi_al-Arqam") });
    T("utsmanmazhun", "Utsman bin Mazh'un", "عثمان بن مظعون", 590, 625, true, "Muhajirin pertama yang wafat di Madinah", ["muhajirin"], [["makkah", 590, 615], ["habasyah", 615, 616], ["makkah", 616, 622], ["madinah", 622, 625]],
      "Termasuk yang awal masuk Islam dan hijrah ke Habasyah. Menurut kitab sirah, ia Muhajirin pertama yang wafat di Madinah dan dimakamkan di Baqi'.", { wiki: W("Uthman_ibn_Maz%27un") });
    T("abumusa", "Abu Musa Al-Asy'ari", "أبو موسى", 602, 662, true, "Gubernur dan qari", ["ulama", "lain"], [["yaman", 602, 627], ["habasyah", 627, 628, "Kapalnya terdampar di Habasyah; datang bersama Ja'far saat Khaibar"], ["madinah", 628, 631], ["yaman", 631, 634, "Diutus Nabi ke Yaman bersama Mu'adz"], ["bashrah", 638, 650, "Gubernur Bashrah"], ["kufah", 650, 656, "Gubernur Kufah"], ["makkah", 657, 662, "Wafat di Mekah; ada yang menyebut Kufah"]],
      "Dari Yaman. Nabi mengutusnya ke Yaman bersama Mu'adz dengan pesan, \"Mudahkanlah, jangan mempersulit\" (HR. Bukhari no. 4341). Dikenal dengan suaranya yang indah saat membaca Al-Qur'an.", { wiki: W("Abu_Musa_al-Ash%27ari") });
    T("ikrimah", "Ikrimah bin Abi Jahal", "عكرمة", 598, 636, true, "Penentang yang menjadi pembela", ["penentang", "panglima"], [["makkah", 598, 632], ["yaman", 632, 634, "Perang Riddah di Yaman dan Oman"], ["quds", 634, 636, "Syam; gugur di Ajnadain atau Yarmuk"]],
      "Putra Abu Jahal yang lama memusuhi Islam, lalu masuk Islam setelah Fathu Makkah. Menurut kitab sejarah, ia gugur di Perang Ajnadain (634); ada yang menyebut di Yarmuk (636).", { wiki: W("Ikrima_ibn_Abi_Jahl") });

    // Anshar
    T("saadmuadz", "Sa'ad bin Mu'adz", "سعد بن معاذ", 590, 627, true, "Pemimpin suku Aus", ["anshar"], [["madinah", 590, 627]],
      "Masuk Islam lewat dakwah Mush'ab bin Umair, lalu seluruh kaumnya mengikutinya. Terluka di Khandaq dan wafat tak lama kemudian; Nabi bersabda Arasy bergetar karena wafatnya (HR. Bukhari no. 3803).", { wiki: W("Sa%27d_ibn_Mu%27adh") });
    T("saadubadah", "Sa'ad bin Ubadah", "سعد بن عبادة", 584, 636, true, "Pemimpin suku Khazraj", ["anshar"], [["madinah", 584, 634], ["syam", 634, 636, "Wafat di Hauran"]],
      "Pemimpin Khazraj yang terkenal dermawan dan sering menjamu Nabi serta para sahabat. Menurut kitab sejarah, ia wafat di Hauran, Syam.", { wiki: "https://en.wikipedia.org/wiki/Sa%CA%BDd_ibn_%CA%BDUbadah" });
    T("abuayyub", "Abu Ayyub Al-Anshari", "أبو أيوب", 576, 674, true, "Tuan rumah Nabi", ["anshar"], [["madinah", 576, 674], [null, 674, 674, "Wafat saat pengepungan Konstantinopel"]],
      "Khalid bin Zaid dari Bani Najjar. Ketika tiba di Madinah, Nabi singgah di rumahnya sampai Masjid Nabawi dan rumah beliau selesai dibangun.", { wiki: W("Abu_Ayyub_al-Ansari") });
    T("muadz", "Mu'adz bin Jabal", "معاذ", 603, 639, true, "Ahli halal dan haram", ["anshar", "ulama"], [["madinah", 603, 630], ["yaman", 630, 634, "Diutus Nabi ke Yaman sebagai pengajar dan hakim"], ["quds", 634, 639, "Mengajar di Palestina dan Yordania; wafat karena wabah Amwas"]],
      "Termasuk empat orang yang disebut Nabi sebagai rujukan belajar Al-Qur'an (HR. Bukhari no. 3808). Nabi mengutusnya ke Yaman (HR. Bukhari no. 4341). Wafat karena wabah Amwas di Syam.", { wiki: W("Muadh_ibn_Jabal") });
    T("ubay", "Ubay bin Ka'ab", "أبي", 590, 649, true, "Pemimpin para qari", ["anshar", "ulama"], [["madinah", 590, 649]],
      "Penulis wahyu dan ahli qiraah. Atas perintah Allah, Nabi membacakan Surah Al-Bayyinah kepadanya (HR. Bukhari no. 4959). Tahun wafatnya diperselisihkan.", { wiki: W("Ubayy_ibn_Ka%27b") });
    T("anas", "Anas bin Malik", "أنس", 612, 712, true, "Pelayan Rasulullah", ["anshar", "ulama"], [["madinah", 612, 638], ["bashrah", 638, 712, "Wafat di Bashrah"]],
      "Diserahkan ibunya, Ummu Sulaim, untuk melayani Nabi sejak kecil; ia melayani beliau selama sepuluh tahun (HR. Muslim no. 2309). Termasuk sahabat yang paling akhir wafat.", { wiki: W("Anas_ibn_Malik") });
    T("asad", "As'ad bin Zurarah", "أسعد بن زرارة", 585, 623, true, "Perintis Islam di Yatsrib", ["anshar"], [["madinah", 585, 623]],
      "Menurut kitab sirah, termasuk orang Yatsrib pertama yang masuk Islam di Aqabah. Ia menjamu Mush'ab bin Umair dan membantu dakwahnya di Yatsrib.", { wiki: W("As%27ad_ibn_Zurara") });
    T("usaid", "Usaid bin Hudhair", "أسيد", 590, 641, true, "Pemimpin suku Aus", ["anshar"], [["madinah", 590, 641]],
      "Masuk Islam lewat dakwah Mush'ab. Suatu malam ketika ia membaca Al-Qur'an, malaikat turun mendengarkannya (HR. Bukhari no. 5018).", { wiki: W("Usayd_ibn_Hudayr") });
    T("abdullahrawahah", "Abdullah bin Rawahah", "ابن رواحة", 580, 629, true, "Penyair dan panglima", ["anshar", "panglima"], [["madinah", 580, 629]],
      "Penyair Anshar dan salah satu naqib di Baiat Aqabah. Gugur sebagai panglima ketiga di Mu'tah setelah Zaid dan Ja'far (HR. Bukhari no. 4262).", { wiki: W("Abd_Allah_ibn_Rawaha") });
    T("hassan", "Hassan bin Tsabit", "حسان", 563, 674, true, "Penyair Rasulullah", ["anshar"], [["madinah", 563, 674]],
      "Penyair yang membela Nabi dengan syair. Nabi mendoakannya, \"Ya Allah, kuatkanlah ia dengan Ruhul Qudus\" (HR. Bukhari no. 453).", { wiki: W("Hassan_ibn_Thabit") });
    T("abuthalhah", "Abu Thalhah Al-Anshari", "أبو طلحة", 585, 654, true, "Pemanah ulung", ["anshar"], [["madinah", 585, 654]],
      "Zaid bin Sahl, suami Ummu Sulaim. Pemanah yang melindungi Nabi di Uhud. Ia menyedekahkan kebun Bairuha', harta yang paling dicintainya (HR. Bukhari no. 1461).", { wiki: W("Abu_Talha_al-Ansari") });
    T("jabir", "Jabir bin Abdullah", "جابر", 607, 697, true, "Perawi hadits", ["anshar", "ulama"], [["madinah", 607, 697]],
      "Ayahnya gugur di Uhud. Di Khandaq ia mengundang Nabi makan, dan makanan yang sedikit itu cukup untuk seluruh pasukan (HR. Bukhari no. 4101).", { wiki: W("Jabir_ibn_Abd_Allah") });
    T("abudujanah", "Abu Dujanah", "أبو دجانة", 590, 633, true, "Penerima pedang Nabi", ["anshar"], [["madinah", 590, 632], ["yamamah", 632, 633, "Gugur di Yamamah"]],
      "Simak bin Kharasyah. Di Uhud ia menerima pedang Nabi dan berjanji menunaikan haknya (HR. Muslim no. 2470). Gugur di Perang Yamamah.", { wiki: W("Abu_Dujana") });
    T("khubaib", "Khubaib bin Adi", "خبيب", 590, 625, true, "Syahid di Mekah", ["anshar"], [["madinah", 590, 625], ["makkah", 625, 625, "Ditawan dan dibunuh Quraisy"]],
      "Ditawan lalu dibunuh Quraisy di Mekah. Ia shalat dua rakaat sebelum dieksekusi, dan itu menjadi sunnah bagi yang akan dibunuh (HR. Bukhari no. 3045).", { wiki: W("Khubayb_ibn_Adiy") });
    T("ubadah", "Ubadah bin Ash-Shamit", "عبادة", 586, 655, true, "Naqib di Aqabah", ["anshar", "ulama"], [["madinah", 586, 634], ["syam", 634, 640, "Ikut penaklukan Syam; wakil di Hims dan diutus Umar mengajar"], ["quds", 640, 655, "Qadhi Palestina; ikut penaklukan Mesir dan Siprus; wafat di Ramlah"]],
      "Salah satu naqib di Baiat Aqabah (HR. Bukhari no. 18). Diutus Umar mengajar di Syam.", { wiki: W("Ubada_ibn_al-Samit") });
    T("hanzhalah", "Hanzhalah bin Abi Amir", "حنظلة", 600, 625, true, "Ghasilul Malaikah", ["anshar"], [["madinah", 600, 625]],
      "Menurut kitab sirah, ia berangkat ke Uhud tak lama setelah malam pernikahannya dan gugur di sana; Nabi mengabarkan ia dimandikan malaikat.", { wiki: W("Hanzala_Ibn_Abi_Amir") });
    T("abudarda", "Abu Darda'", "أبو الدرداء", 580, 652, true, "Hakim Damaskus", ["anshar", "ulama"], [["madinah", 580, 640], ["syam", 640, 652, "Mengajar Al-Qur'an dan menjadi qadhi di Damaskus"]],
      "Uwaimir bin Zaid, pedagang Anshar yang menjadi ahli ibadah dan ilmu. Diutus Umar mengajar di Syam.", { wiki: W("Abu_al-Darda") });

    // Sahabat perempuan
    T("ummusulaim", "Ummu Sulaim", "أم سليم", 590, 650, true, "Ibu Anas bin Malik", ["sahabiyat", "anshar"], [["madinah", 590, 650]],
      "Rumaisha binti Milhan. Ia menyerahkan putranya, Anas, untuk melayani Nabi, dan menjadikan keislaman Abu Thalhah sebagai maharnya (HR. An-Nasa'i).", { wiki: W("Umm_Sulaym_bint_Milhan") });
    T("nusaibah", "Nusaibah binti Ka'ab", "نسيبة", 590, 634, true, "Ummu 'Imarah", ["sahabiyat", "anshar"], [["madinah", 590, 634]],
      "Menurut kitab sirah, ia ikut di Baiat Aqabah kedua dan berperang melindungi Nabi di Uhud hingga terluka.", { wiki: W("Nusaybah_bint_Ka%27ab") });
    T("asma", "Asma' binti Abu Bakar", "أسماء", 595, 692, true, "Dzatun Nithaqain", ["sahabiyat", "muhajirin"], [["makkah", 595, 622], ["madinah", 622, 680], ["makkah", 680, 692]],
      "Ia membelah ikat pinggangnya untuk mengikat bekal Nabi dan Abu Bakar saat Hijrah, sehingga dijuluki Dzatun Nithaqain (HR. Bukhari no. 2979). Ibu Abdullah bin Az-Zubair.", { wiki: W("Asma_bint_Abi_Bakr") });
    T("rufaidah", "Rufaidah Al-Aslamiyah", "رفيدة", 600, 650, true, "Perawat pertama", ["sahabiyat", "anshar"], [["madinah", 600, 650]],
      "Menurut kitab sirah, ia merawat orang-orang yang terluka di kemahnya di Masjid Nabawi; Sa'ad bin Mu'adz dirawat di sana setelah Khandaq. Tahun lahir dan wafatnya tidak tercatat.", { wiki: W("Rufaida_Al-Aslamia"), takTercatat: true });
    T("khansa", "Al-Khansa'", "الخنساء", 575, 645, true, "Penyair perempuan", ["sahabiyat"], [[null, 575, 645, "Najd, kabilah Bani Sulaim"]],
      "Tumadhir binti Amr, penyair perempuan terbesar bangsa Arab yang masuk Islam bersama kaumnya. Menurut kitab sejarah, keempat putranya gugur di Qadisiyyah.", { wiki: W("Al-Khansa") });
    T("ummuhani", "Ummu Hani' binti Abi Thalib", "أم هانئ", 585, 670, true, "Sepupu Nabi", ["sahabiyat", "keluarga"], [["makkah", 585, 670]],
      "Saudari Ali bin Abi Thalib. Pada Fathu Makkah ia memberi perlindungan kepada seseorang, dan Nabi bersabda, \"Kami melindungi orang yang engkau lindungi\" (HR. Bukhari no. 357). Ia wafat setelah Ali, di masa Mu'awiyah.", { wiki: W("Fakhitah_bint_Abi_Talib") });
    T("ummuruman", "Ummu Ruman", "أم رومان", 575, 630, true, "Ibu Aisyah", ["sahabiyat", "muhajirin"], [["makkah", 575, 622], ["madinah", 622, 630]],
      "Istri Abu Bakar dan ibu Aisyah. Ia mendampingi Aisyah saat Haditsul Ifki (HR. Bukhari no. 4750). Tahun wafatnya diperselisihkan.", { wiki: W("Umm_Ruman") });

    // Panglima dan pemimpin
    T("mutsanna", "Al-Mutsanna bin Haritsah", "المثنى", 590, 635, true, "Perintis pembebasan Irak", ["panglima"], [[null, 590, 633, "Kabilah Bani Syaiban, perbatasan Irak"], ["kufah", 633, 635, "Wilayah Irak sebelum Kufah dibangun"]],
      "Pemimpin Bani Syaiban yang memulai peperangan di Irak di masa Abu Bakar. Menurut Ath-Thabari, ia wafat karena luka-lukanya sebelum Qadisiyyah; sumber lain menyebutnya hadir di Qadisiyyah.", { wiki: W("Al-Muthanna_ibn_Haritha") });
    T("numan", "An-Nu'man bin Muqarrin", "النعمان", 590, 642, true, "Panglima Nahawand", ["panglima"], [[null, 590, 625, "Kabilah Muzainah, dekat Madinah"], ["madinah", 625, 636], ["kufah", 636, 642, "Wilayah Irak (Kaskar); Kufah baru dibangun 638"], ["nahawand", 642, 642, "Gugur di Nahawand"]],
      "Dari kabilah Muzainah, masuk Islam setelah Uhud. Panglima pasukan Islam di Nahawand; ia gugur saat memimpin serangan penentu, sebelum pasukan Islam meraih kemenangan besar.", { wiki: W("Al-Nu%27man_ibn_Muqarrin") });
    T("syurahbil", "Syurahbil bin Hasanah", "شرحبيل", 571, 639, true, "Panglima penaklukan Syam", ["panglima", "muhajirin"], [["makkah", 571, 616], ["habasyah", 616, 628, "Hijrah ke Habasyah gelombang kedua"], ["madinah", 628, 634], ["quds", 634, 639, "Yordania dan Palestina utara; wafat karena wabah Amwas"]],
      "Termasuk yang awal masuk Islam dan hijrah ke Habasyah. Salah satu panglima penaklukan Syam; wafat karena wabah Amwas.", { wiki: W("Shurahbil_ibn_Hasana") });
    T("yazid", "Yazid bin Abi Sufyan", "يزيد بن أبي سفيان", 590, 640, true, "Gubernur Damaskus", ["panglima"], [["makkah", 590, 630], ["madinah", 630, 634], ["syam", 634, 640]],
      "Putra Abu Sufyan, saudara Mu'awiyah. Panglima penaklukan Syam dan gubernur Damaskus; wafat karena wabah Amwas. Bukan Yazid bin Mu'awiyah.", { wiki: W("Yazid_ibn_Abi_Sufyan") });
    T("abdullahzubair", "Abdullah bin Az-Zubair", "ابن الزبير", 624, 692, true, "Bayi pertama Muhajirin", ["muhajirin"], [["madinah", 624, 680], ["makkah", 680, 692]],
      "Putra Az-Zubair dan Asma'. Bayi pertama yang lahir dari kaum Muhajirin setelah Hijrah (HR. Bukhari no. 3909).", { wiki: W("Abd_Allah_ibn_al-Zubayr") });
    T("ibnuumar", "Abdullah bin Umar", "ابن عمر", 610, 693, true, "Penjaga sunnah", ["ulama", "muhajirin"], [["makkah", 610, 622], ["madinah", 622, 692], ["makkah", 692, 693, "Wafat di Mekah"]],
      "Putra Umar bin Khattab. Dikenal sangat teliti mengikuti sunnah Nabi dan termasuk perawi hadits terbanyak.", { wiki: W("Abd_Allah_ibn_Umar_ibn_al-Khattab") });

    // Penentang dakwah dan kaum munafik
    T("ummujamil", "Ummu Jamil (Arwa binti Harb)", "أم جميل", 570, 630, true, "Istri Abu Lahab", ["penentang"], [["makkah", 570, 630]],
      "Istri Abu Lahab dan saudari Abu Sufyan. Disebut dalam QS. Al-Masad: 4–5 sebagai \"pembawa kayu bakar\". Tahun lahir dan wafatnya tidak tercatat.", { rumah: [["abulahab", "perkiraan"]], wiki: W("Umm_Jamil"), takTercatat: true });
    T("umayyah", "Umayyah bin Khalaf", "أمية بن خلف", 560, 624, true, "Pemuka Bani Jumah", ["penentang"], [["makkah", 560, 624]],
      "Majikan Bilal yang menyiksanya di padang pasir (kitab sirah). Terbunuh di Badar.", { wiki: W("Umayyah_ibn_Khalaf") });
    T("utbah", "Utbah bin Rabi'ah", "عتبة", 563, 624, true, "Pemuka Bani Abdu Syams", ["penentang"], [["makkah", 563, 624]],
      "Menurut kitab sirah, ia pernah datang menawari Nabi harta dan kedudukan agar berhenti berdakwah. Ayah Hindun; terbunuh di Badar.", { wiki: W("Utbah_ibn_Rabi%27ah") });
    T("walid", "Al-Walid bin Al-Mughirah", "الوليد بن المغيرة", 550, 622, true, "Pemuka Bani Makhzum", ["penentang"], [["makkah", 550, 622]],
      "Ayah Khalid bin Walid. Menurut kitab tafsir, ia mengakui keindahan Al-Qur'an namun tetap menuduhnya sihir, dan Al-Muddatstsir 11–25 turun tentang dirinya.", { wiki: W("Al-Walid_ibn_al-Mughira") });
    T("uqbah", "Uqbah bin Abi Mu'aith", "عقبة", 570, 624, true, "Penentang dari Bani Umayyah", ["penentang"], [["makkah", 570, 624]],
      "Ia meletakkan isi perut unta sembelihan di punggung Nabi yang sedang sujud di dekat Ka'bah (HR. Bukhari no. 3854; lihat juga no. 240). Terbunuh setelah Perang Badar.", { wiki: W("Uqba_ibn_Abi_Mu%27ayt") });
    T("hindun", "Hindun binti Utbah", "هند", 585, 635, true, "Istri Abu Sufyan", ["penentang", "sahabiyat"], [["makkah", 585, 635]],
      "Putri Utbah bin Rabi'ah. Memusuhi Islam hingga Uhud, lalu masuk Islam pada Fathu Makkah.", { rumah: [["abusufyan", "rumah suaminya"]], wiki: W("Hind_bint_Utba") });
    T("suhail", "Suhail bin Amr", "سهيل", 556, 639, true, "Juru runding Quraisy", ["penentang"], [["makkah", 556, 634], ["quds", 634, 639, "Syam; wafat karena wabah Amwas (riwayat lain: gugur di Yarmuk)"]],
      "Juru runding Quraisy dalam Perjanjian Hudaibiyah (HR. Bukhari no. 2731). Masuk Islam pada Fathu Makkah dan wafat di Syam.", { wiki: W("Suhayl_ibn_Amr") });
    T("wahsyi", "Wahsyi bin Harb", "وحشي", 600, 660, true, "Dari pembunuh Hamzah menjadi sahabat", ["penentang"], [["makkah", 600, 630], ["thaif", 630, 632], ["hims", 640, 660, "Wafat di Hims"]],
      "Budak Habasyah yang membunuh Hamzah di Uhud, lalu masuk Islam. Di Perang Yamamah ia ikut membunuh Musailamah (HR. Bukhari no. 4072).", { wiki: W("Wahshi_ibn_Harb") });
    T("musailamah", "Musailamah Al-Kadzdzab", "مسيلمة", 580, 632, true, "Nabi palsu", ["penentang"], [["yamamah", 580, 632]],
      "Pemuka Bani Hanifah di Yamamah yang mengaku nabi. Terbunuh dalam Perang Yamamah.", { wiki: W("Musaylima") });
    T("abdullahubay", "Abdullah bin Ubay bin Salul", "ابن سلول", 570, 631, true, "Pemimpin kaum munafik", ["penentang"], [["madinah", 570, 631]],
      "Pemuka Khazraj yang menurut kitab sirah hampir diangkat menjadi pemimpin Yatsrib sebelum Hijrah. Ia memimpin kaum munafik dan menjadi penyebar utama Haditsul Ifki (HR. Bukhari no. 4750).", { wiki: W("Abd_Allah_ibn_Ubayy") });

    // Raja dan tokoh bangsa lain
    T("heraklius", "Heraklius", "هرقل", 575, 641, true, "Kaisar Romawi Timur", ["raja"], [[null, 610, 641, "Konstantinopel"], ["quds", 629, 630, "Berada di Iliya' (Baitul Maqdis) saat menerima surat Nabi"]],
      "Kaisar Romawi Timur. Ia menerima surat Nabi dan bertanya kepada Abu Sufyan tentang beliau (HR. Bukhari no. 7).", { wiki: W("Heraclius") });
    T("kisra", "Kisra (Khosrau II)", "كسرى", 570, 628, true, "Raja Persia", ["raja"], [["madain", 590, 628]],
      "Raja Persia Sasaniyah yang merobek surat Nabi; Nabi mendoakan agar kerajaannya dicabik-cabik (HR. Bukhari no. 64).", { wiki: W("Khosrow_II") });
    T("muqawqis", "Al-Muqauqis", "المقوقس", 580, 641, true, "Penguasa Mesir", ["raja"], [["mesir", 580, 641, "Iskandariyah"]],
      "Penguasa Mesir di bawah Romawi. Menurut kitab sirah, ia membalas surat Nabi dengan hadiah, di antaranya Mariyah.", { wiki: W("Al-Muqawqis") });
    T("abrahah", "Abrahah", "أبرهة", 520, 570, true, "Penguasa Yaman", ["raja", "pra"], [["yaman", 530, 570]],
      "Penguasa Yaman dari Habasyah yang menyerang Ka'bah dengan pasukan bergajah pada Tahun Gajah. Peristiwa ini diabadikan dalam Surah Al-Fil.", { wiki: W("Abraha") });
    T("bahira", "Buhaira sang rahib", "بحيرى", 540, 600, true, "Rahib di Bushra", ["raja", "pra"], [["syam", 540, 600, "Bushra, Syam"]],
      "Rahib yang mengenali tanda kenabian pada Nabi kecil yang ikut kafilah Abu Thalib (HR. Tirmidzi no. 3620; sebagian ulama mengkritik detail riwayat ini). Tahun lahir dan wafatnya tidak tercatat.", { wiki: W("Bahira"), takTercatat: true });

    // Tokoh dalam kisah
    T("safwan", "Shafwan bin Al-Mu'aththal", "صفوان", 600, 638, true, "Sahabat dalam kisah Ifki", ["lain"], [["madinah", 600, 636], [null, 636, 638, "Bashrah, lalu front Jazirah dan Armenia; wafat di Armenia (riwayat lain: 679)"]],
      "Sahabat yang berjalan di belakang pasukan dan menemukan Aisyah yang tertinggal, lalu menuntun untanya sampai menyusul pasukan (HR. Bukhari no. 4750).", { wiki: W("Safwan_ibn_Muattal") });
  };
  BARU();


  // ---------- Tokoh dalam peristiwa yang sudah ada ----------
  const IKUT = {
    gajah: ["abrahah", "abdullah"], hira: ["waraqah"], huzn: ["saudah"], umarislam: ["said", "arqam"], shafa: ["ummujamil"], habasyah: ["ruqayyah", "ummusalamah", "ummuhabibah", "utsmanmazhun", "syurahbil"],
    aqabah: ["asad", "mushab", "abbas", "ubadah", "nusaibah", "abdullahrawahah"], tsur: ["asma"], hijrah: ["abuayyub"],
    badar: ["utbah", "umayyah", "zubair", "saadmuadz", "abdurrahman", "abbas", "ibnumasud"], uhud: ["mushab", "hindun", "wahsyi", "nusaibah", "thalhah", "abudujanah", "hanzhalah", "abusufyan", "abuthalhah", "ummusulaim", "aisyah"],
    khandaq: ["saadmuadz", "abusufyan", "jabir", "safiyyah", "rufaidah", "ibnuumar"], ifki: ["safwan", "ummuruman", "abdullahubay", "zainabjahsy", "usaid", "saadubadah"], hudaibiyah: ["suhail", "ummusalamah"], khaibar: ["shafiyyah", "abuhurairah", "abumusa", "jafar"],
    fathu: ["abusufyan", "hindun", "ikrimah", "suhail", "ummuhani", "saadubadah"], wada: ["ibnuabbas"], tabuk: ["abdullahubay", "abudzar"], wafat: ["usamah"], yamamah: ["wahsyi", "musailamah", "abudujanah"],
    yarmuk: ["yazid", "syurahbil", "ikrimah"], mushaf: ["hafshah"], umarwafat: ["abdurrahman", "thalhah", "zubair", "suhaib"], jamal: ["thalhah", "zubair"], shiffin: ["ammar"],
    kufahpusat: ["husain"], aliwafat: ["husain"], quds: ["muadz"], qadisiyyah: ["mutsanna", "khansa"], jamquran: ["hafshah"]
  };
  D.peristiwa.forEach((e) => { (IKUT[e.id] || []).forEach((t) => { if (D.tokoh[t] && !e.tokoh.includes(t)) e.tokoh.push(t); }); });
  // Riwayat di peta Mekah
  (window.MEKAH ? window.MEKAH.tempat : []).forEach((p) => p.riwayat.forEach((r) => { if (/Isi perut unta/.test(r.judul) && !r.tokoh.includes("uqbah")) r.tokoh.push("uqbah"); }));

  // ---------- Peristiwa baru ----------
  const E = (id, tahun, h, lok, tempat, judul, narasi, tokoh, sumber, ayat = [], catatan) => ({ id, tahun, h, lok, tempat, judul, narasi, tokoh, sumber, ayat, ...(catatan ? { catatan } : {}) });
  D.peristiwa.push(
    E("halimah", 571, "53 SH", "thaif", "Perkampungan Bani Sa'd", "Disusui Halimah di pedalaman",
      "Seperti kebiasaan bangsawan Mekah, bayi Muhammad diserahkan kepada ibu susuan dari pedalaman, Halimah As-Sa'diyah, dan tinggal di perkampungan Bani Sa'd selama beberapa tahun.",
      ["nabi", "halimah", "aminah"], "Sirah Ibnu Hisyam", [], "Letak perkampungan Bani Sa'd hanya perkiraan, di pedalaman tenggara Mekah."),
    E("bahira", 582, "41 SH", "syam", "Bushra, Syam", "Ikut kafilah ke Syam",
      "Nabi kecil ikut kafilah dagang Abu Thalib ke Syam. Di Bushra, seorang rahib bernama Buhaira mengenali tanda kenabian pada diri beliau dan menyarankan Abu Thalib membawanya pulang.",
      ["nabi", "abuthalib", "bahira"], "Sirah Ibnu Hisyam; HR. Tirmidzi no. 3620 (Abu Musa), hasan gharib menurut Tirmidzi; sebagian ulama mengkritik detail riwayat ini"),
    E("aminahwafat", 576, "47 SH", "makkah", "Abwa', antara Mekah dan Madinah", "Aminah wafat di Abwa'",
      "Aminah membawa putranya yang berusia enam tahun mengunjungi kerabat di Yatsrib. Dalam perjalanan pulang ia wafat di Abwa'. Ummu Aiman membawa Nabi kecil kembali ke Mekah, dan beliau diasuh kakeknya, Abdul Muthalib.",
      ["nabi", "aminah", "ummuaiman", "abdulmuthalib"], "Sirah Ibnu Hisyam"),
    E("sumayyah", 615, "8 SH", "makkah", "Mekah", "Keluarga Yasir disiksa",
      "Yasir, istrinya Sumayyah, dan putra mereka Ammar disiksa kaum Quraisy karena masuk Islam. Sumayyah dibunuh Abu Jahal dan menjadi syahidah pertama; Yasir wafat karena siksaan. Sahabat lemah lain seperti Bilal bin Rabah dan Khabbab bin Al-Arat juga disiksa.",
      ["sumayyah", "yasir", "ammar", "abujahal", "bilal", "khabbab"], "Sirah Ibnu Hisyam; Ibnu Sa'd, Ath-Thabaqat", [], "Tahun persisnya tidak diketahui; ditempatkan di masa penyiksaan sebelum hijrah ke Habasyah."),
    E("masjidnabawi", 622, "1 H", "madinah", "Madinah", "Masjid Nabawi dan persaudaraan Muhajirin–Anshar",
      "Setibanya di Madinah, Nabi singgah di rumah Abu Ayyub Al-Anshari sementara Masjid Nabawi dibangun bersama para sahabat. Kaum Muhajirin dipersaudarakan dengan kaum Anshar; Abdurrahman bin Auf dipersaudarakan dengan Sa'ad bin Ar-Rabi'.",
      ["nabi", "abuayyub", "abdurrahman", "ammar", "abubakar"], "Sirah Ibnu Hisyam; HR. Bukhari no. 3780"),
    E("raji", 625, "4 H", "makkah", "Mekah", "Khubaib dibunuh di Mekah",
      "Sepuluh sahabat yang diutus Nabi (menurut Bukhari sebagai pasukan pengintai; menurut Ibnu Ishaq sebagai pengajar atas permintaan kabilah 'Adhal dan Qarah) dikhianati di Ar-Raji'. Khubaib bin Adi ditawan dan dijual ke Quraisy, lalu dibunuh di luar Tanah Haram. Sebelum dieksekusi ia meminta waktu untuk shalat dua rakaat.",
      ["khubaib"], "HR. Bukhari no. 3045 (Abu Hurairah); Sirah Ibnu Hisyam"),
    E("quraizhah", 627, "5 H", "madinah", "Madinah", "Bani Quraizhah",
      "Setelah Perang Khandaq, Bani Quraizhah yang melanggar perjanjian dikepung. Mereka bersedia menerima keputusan Sa'ad bin Mu'adz, dan Nabi membenarkan keputusannya.",
      ["nabi", "saadmuadz"], "HR. Bukhari no. 3043 (Abu Sa'id Al-Khudri)", [{ surah: "Al-Ahzab", no: "26", arab: "وَأَنزَلَ الَّذِينَ ظَاهَرُوهُم مِّنْ أَهْلِ الْكِتَابِ مِن صَيَاصِيهِمْ",
        nuzul: "Ayat ini menyebut ahli kitab yang membantu pasukan sekutu, yang diturunkan dari benteng-benteng mereka.", sumber: "Tafsir Ibnu Katsir" }]),
    E("surat", 628, "6–7 H", "madinah", "Madinah", "Surat kepada para raja",
      "Setelah Perjanjian Hudaibiyah, Nabi mengirim surat ajakan masuk Islam kepada para penguasa: Heraklius di Romawi, Kisra di Persia, Al-Muqauqis di Mesir, dan Najasyi di Habasyah. Heraklius bertanya kepada Abu Sufyan tentang Nabi, sedangkan Kisra merobek suratnya.",
      ["nabi", "heraklius", "kisra", "muqawqis", "abusufyan"], "HR. Bukhari no. 7 (Heraklius) dan no. 64 (Kisra)", [],
      "Menurut HR. Muslim no. 1774, Najasyi penerima surat ini bukan Najasyi (Ashamah) yang dishalatkan Nabi; Ibnu Ishaq menyebutnya Ashamah. Ulama berbeda pendapat."),
    E("mutah", 629, "8 H", "mutah", "Mu'tah", "Perang Mu'tah",
      "Pasukan Muslim berhadapan dengan pasukan Romawi yang jauh lebih besar. Zaid bin Haritsah, Ja'far bin Abi Thalib, dan Abdullah bin Rawahah gugur berturut-turut memegang panji, lalu Khalid bin Walid mengambilnya dan menyelamatkan pasukan. Nabi mengabarkan peristiwa itu di Madinah sambil berlinang air mata.",
      ["zaid", "jafar", "abdullahrawahah", "khalid", "nabi"], "HR. Bukhari no. 4262 (Anas)"),
    E("hunain", 630, "8 H", "hunain", "Lembah Hunain", "Perang Hunain",
      "Setelah Fathu Makkah, pasukan Muslim yang besar disergap kabilah Hawazin di lembah Hunain dan sempat kocar-kacir. Nabi tetap teguh bersama Al-Abbas dan Abu Sufyan bin Al-Harits bin Abdul Muthalib, sepupu beliau. Al-Abbas berseru memanggil para sahabat hingga mereka kembali dan menang.",
      ["nabi", "abbas"], "HR. Muslim no. 1775 (Al-Abbas)", [{ surah: "At-Taubah", no: "25", arab: "وَيَوْمَ حُنَيْنٍ ۙ إِذْ أَعْجَبَتْكُمْ كَثْرَتُكُمْ فَلَمْ تُغْنِ عَنكُمْ شَيْئًا",
        nuzul: "Ayat ini mengingatkan bahwa banyaknya jumlah pasukan di Hunain tidak menolong mereka sedikit pun; kemenangan hanya dari Allah.", sumber: "QS. At-Taubah: 25–26; Tafsir Ibnu Katsir" }]),
    E("ibrahimwafat", 632, "10 H", "madinah", "Madinah", "Wafatnya Ibrahim putra Nabi",
      "Ibrahim, putra Nabi dari Mariyah, wafat saat masih bayi. Hari itu terjadi gerhana matahari, dan orang-orang mengira gerhana itu karena kematiannya. Nabi menegaskan bahwa gerhana adalah tanda kebesaran Allah, bukan karena kematian atau kelahiran seseorang.",
      ["nabi", "ibrahim", "mariyah"], "HR. Bukhari no. 1043 (Al-Mughirah bin Syu'bah)"),
    E("madain", 637, "16 H", "madain", "Al-Mada'in", "Pembebasan Al-Mada'in",
      "Setelah Qadisiyyah, pasukan Sa'ad bin Abi Waqqash menyeberangi Sungai Tigris dan memasuki Al-Mada'in, ibu kota Persia. Salman Al-Farisi kemudian menjadi gubernurnya.",
      ["saad", "salman"], "Tarikh Ath-Thabari"),
    E("amwas", 639, "18 H", "quds", "Amwas, Palestina", "Wabah Amwas",
      "Wabah besar melanda Syam dan merenggut banyak sahabat, di antaranya Abu Ubaidah, Mu'adz bin Jabal, Syurahbil bin Hasanah, dan Yazid bin Abi Sufyan. Umar yang hendak ke Syam bertemu para panglima di Sargh, lalu memutuskan kembali ke Madinah setelah bermusyawarah dengan para sahabat; keputusan itu kemudian dikuatkan oleh hadits Nabi tentang wabah yang disampaikan Abdurrahman bin Auf.",
      ["abuubaidah", "muadz", "syurahbil", "yazid", "suhail", "umar", "abdurrahman"], "HR. Bukhari no. 5729 (Ibnu Abbas); Tarikh Ath-Thabari"),
    E("nahawand", 642, "21 H", "nahawand", "Nahawand", "Perang Nahawand",
      "Pasukan Islam di bawah An-Nu'man bin Muqarrin mengalahkan pasukan Persia di Nahawand. An-Nu'man gugur dalam serangan penentu di fase akhir pertempuran. Kemenangan yang dijuluki Fathul Futuh ini membuka jalan bagi penaklukan wilayah Persia selanjutnya.",
      ["numan", "umar"], "Tarikh Ath-Thabari"),
    E("khalidwafat", 642, "21 H", "hims", "Hims", "Khalid bin Walid wafat",
      "Khalid bin Walid, panglima yang dijuluki Saifullah, wafat di atas tempat tidurnya, bukan di medan perang. Pendapat yang lebih banyak menyebut ia wafat di Hims; ada riwayat yang menyebut Madinah.",
      ["khalid"], "Ibnu Katsir, Al-Bidayah wan Nihayah")
  );
  D.peristiwa.sort((a, b) => a.tahun - b.tahun);

  // Ringkasan Abu Sufyan dan Waraqah sudah ada di city-data.js; tokoh lama tanpa kelompok masuk "lain"
  Object.values(D.tokoh).forEach((t) => { if (!t.kel) t.kel = ["lain"]; if (!t.tinggal) t.tinggal = []; });

  // Tempat tinggal pada tahun tertentu
  D.tinggalPada = (t, y) => { const l = (t.tinggal || []).filter(([, a, b]) => y >= a && y <= b); return l.length ? l[l.length - 1] : null; };
})();
