# Jejak Sirah

Dibuat oleh Ramdani (ramd4ni@gmail.com). Prototipe aplikasi pengetahuan: peta 3D sejarah Islam dari Tahun Gajah (570 M) sampai akhir Khulafaur Rasyidin (661 M), lengkap dengan timeline, asbabun nuzul, dan profil tokoh.

> **Status konten: DRAF.** Narasi, tahun, dan rujukan hadits masih harus diverifikasi ustadz sebelum dipakai.
>
> **Disklaimer.** Informasi di aplikasi ini bersifat edukatif dan masih draf. Mohon validasi setiap informasi kepada ustadz atau langsung ke sumber aslinya sebelum dikutip, diajarkan, atau disebarkan. Kami tidak bertanggung jawab atas apa pun yang mengatasnamakan aplikasi ini atau pembuatnya.

## Fitur

- **Navigasi utama** di kepala halaman: Peta wilayah, Kota (Mekah dan Madinah), Hijrah, Perang, Tokoh, Kekerabatan, dan Asbabun Nuzul, dengan penanda bagian yang sedang dibuka. Satu catatan "Draf, belum diverifikasi ustadz" dan tombol **Tentang** (pembuat: Ramdani, ramd4ni@gmail.com; daftar semua sumber yang dikumpulkan otomatis dari data aplikasi: hadits per kitab, kitab rujukan, halaman web, data dan teknologi).
- Kontrol peta dikumpulkan di satu baris kanan bawah (geser, zoom, putar, seluruh peta, bantuan), dengan pengaturan kualitas grafis di menu ⚙ pada peta kota. Asbabun Nuzul dibuka sebagai tampilan baca penuh (detail di kiri, daftar di kanan); setelah tontonan selesai, aplikasi kembali ke Asbabun Nuzul.
- Peta "meja pasir" 3D (Three.js) dari Jazirah Arab sampai Syam, Irak, Mesir, dan Habasyah.
- Timeline 570–661 M dengan pita era: sebelum kenabian, Mekah, Madinah, dan empat khalifah. Ada tombol putar otomatis.
- Klik kota untuk melihat ilustrasi, peristiwa, ayat, asbabun nuzul, dan rujukan.
- Tokoh ditampilkan sebagai medali kaligrafi nama, tanpa wajah. Klik untuk membuka profil dan usia di tahun terpilih.
- Tab "Tokoh yang hidup" untuk tahun yang dipilih.
- **Mode kota Mekah**: lembah Mekah 3D dengan Ka'bah, Hijr Ismail, Zamzam, Maqam Ibrahim, Shafa–Marwah, Darun Nadwah, Darul Arqam, rumah Khadijah, Abu Sufyan, Abu Lahab, Abu Jahal, tempat lahir Nabi, dan Syi'ib Bani Hasyim. Tiap titik diberi tingkat keyakinan lokasi (pasti / menurut kitab sejarah / perkiraan), dan tiap riwayat diberi derajat (hadits shahih / kitab sirah / lemah) beserta rujukannya.
- **Geser peta** (wilayah dan kota): seret kiri untuk menggeser, klik kanan atau Shift+seret untuk memutar dan memiringkan, scroll atau pinch (trackpad, layar sentuh, Safari) untuk zoom langsung ke arah kursor, WASD/panah atau tombol panah di layar untuk menggeser, Q/E untuk memutar. **Mode jalan kaki** setinggi mata (W/S jalan, A/D geser, Q/E belok, seret untuk melihat, Shift berlari, Esc keluar) dengan tabrakan rumah, petunjuk arah Ka'bah, dan tempat terdekat.
- **Rumah gaya abad ke-7 dengan LOD streaming**: dari jauh rumah berupa kotak instanced yang ringan. Rumah detail (fondasi batu, dinding bata lumpur, balok atap menonjol, pintu kayu, halaman dengan naungan pelepah, kamar atas) dibangun per sel 60 m hanya di sekitar kamera dan di dalam pandangan, digabung menjadi satu mesh per sel, lalu dibuang saat menjauh.
- **Gurun dan jalan**: tekstur pasir dan kerikil dengan relief, tebing batu gelap berdasar kemiringan, dasar Wadi Ibrahim berpasir halus, ±2.600 bebatuan di lereng, bayangan matahari sore yang mengikuti area pandang, dan langit senja saat jalan kaki. Jalan bersejarah: ke Ma'la/Kada' (HR. Bukhari 1578), ke Kuda (HR. Bukhari 1575, 1578), Misfalah ke Yaman, Suq al-Lail, dan gang Al-'Attarin; gang lain adalah rekonstruksi. Tombol **Kualitas ringan** mematikan bayangan, bebatuan, dan relief untuk laptop yang lebih lemah.
- **Tontonan peristiwa di peta**: tombol "Tonton peristiwa" memutar kejadian langsung di peta 3D Mekah pada malam hari. Episode pertama: *Wahyu Pertama di Gua Hira* (HR. Bukhari no. 3), dari rumah Khadijah, berjalan lewat Ma'la ke Jabal Nur (peta diperluas ±7 km), mendaki ke Gua Hira, turun pulang, lalu ke rumah Waraqah. Kamera mengikuti perjalanan di peta; saat masuk gua atau rumah, layar beralih ke adegan dalam ruangan (Gua Hira dengan "Iqra'" dan tiga dekapan, rumah Khadijah, rumah Waraqah), lalu kembali ke peta saat keluar. Rasulullah ﷺ dan Jibril hanya tampil sebagai nama dan cahaya; Khadijah dan Waraqah sebagai karakter dengan wajah hanya mata dan mulut yang ekspresinya berubah. Gelembung dialog menempel di peta, ada kartu tanggal (Senin, HR. Muslim 1162; Ramadhan, QS. Al-Baqarah 185; 21 Ramadhan menurut Al-Mubarakfuri, diperselisihkan), sumber per adegan, serta kontrol putar/jeda, maju/mundur, dan lompat babak. Episode kedua: *Wahyu Turun Kembali* (HR. Bukhari no. 4, 4922, 4925), siang hari sebagai ilustrasi: beliau turun dari Gua Hira, mendengar panggilan, menoleh ke segala arah, lalu melihat cahaya malaikat di antara langit dan bumi; pulang ke rumah Khadijah ("Selimuti aku, dan siramkan air dingin kepadaku"), lalu turun Al-Muddatstsir 1–5. Episode ketiga: *Ejekan Saat Wahyu Tertunda* (HR. Bukhari no. 4950, 1125; HR. Muslim no. 1797): malam-malam beliau sakit dan tidak bangun shalat malam, siangnya seorang perempuan datang mengejek, lalu turun Ad-Dhuha 1–3. Pencahayaan bisa berganti per adegan (malam ke siang). Episode berikutnya: *Seruan di Bukit Shafa* (Asy-Syu'ara 214 dan Al-Masad 1–5; HR. Bukhari no. 4770, 4971, 2753) dengan kabilah Quraisy yang berkumpul dan celaan Abu Lahab; *Teguran dalam Surah 'Abasa* (HR. Tirmidzi no. 3331) dengan Ibnu Ummi Maktum; dan *Ancaman Abu Jahal di Ka'bah* (Al-'Alaq 6–19; HR. Muslim no. 2797, HR. Bukhari no. 4958, HR. Tirmidzi no. 3349). Ayat yang turun di luar ruangan tampil sebagai kartu wahyu di atas peta. Lalu *Isra' Mi'raj* (HR. Bukhari no. 3887, 3886; para nabi di tujuh langit hanya tampil sebagai nama) dan *Makar Quraisy di Malam Hijrah* (Al-Anfal 30; HR. Ahmad no. 3251). Kejadian di luar Mekah diputar dalam **mode panggung** tanpa peta: Pemindahan Kiblat, Doa di Badar, Uhud (Ali 'Imran 128 dan 144, sampai Abu Bakar membacakannya saat Nabi wafat), Khandaq, Haditsul Ifki, dan Al-Fath sepulang Hudaibiyah.
- **Asbabun Nuzul** (tombol di header): panel kanan berisi daftar kejadian menurut urutan turunnya ayat (dengan pencarian; tanda ▶ bila ada tontonan). Memilih satu kejadian membuka detail di atas peta (sisi kiri): ringkasan fakta (golongan, urutan turun, waktu, tempat, penerima, perantara, riwayat), teks ayat Arab dan terjemah, "Mengapa ayat ini turun", perbedaan pendapat, rujukan bernomor ke sunnah.com, navigasi sebelumnya/berikutnya, serta tombol **▶ Putar kejadian** dan **Lihat di peta**. Tiap entri menampilkan bulan atau tanggal bila ada sumbernya (misalnya Al-Ma'idah 3: Jumat, hari Arafah, HR. Bukhari no. 45; Al-Baqarah 144: 16–17 bulan setelah Hijrah, HR. Bukhari no. 40), dan yang diperselisihkan ditulis begitu. Penjelasan lengkap ditulis satu per satu (sudah 17 dari 22: sampai Al-Fath 1); entri lain sementara berupa ringkasan dari data peristiwa.
- **Asbabun Nuzul per surah**: tab "Per surah (114)" berisi semua surah dengan nama Arab, arti, jumlah ayat, golongan Makkiyah/Madaniyah, urutan turun (mushaf standar Mesir, Al-Azhar 1924), dan perkiraan periode turunnya. Bisa diurutkan menurut mushaf atau urutan turun, dan disaring Makkiyah/Madaniyah/yang punya asbabun nuzul. Detail surah menampilkan catatan waktu turun yang bersumber (hadits shahih, kitab sirah, atau tafsir), daftar kejadian asbabun nuzul di surah itu, dan navigasi ke surah yang turun sebelum/sesudahnya.
- **Tokoh** (menu di navigasi): 115 tokoh dari Tahun Gajah sampai akhir Khulafaur Rasyidin, dikelompokkan (keluarga Nabi, istri Nabi, Khulafaur Rasyidin, sepuluh yang dijamin surga, Muhajirin, Anshar, sahabat perempuan, panglima, ulama, penentang dakwah, raja dan tokoh bangsa lain, sebelum kenabian). Profil berisi gelar, tahun hidup, ringkasan bersumber, **tempat tinggal per periode** (bisa dibuka di peta), rumah di peta kota Mekah bila tercatat, dan **kejadian yang melibatkannya**. Panel kota di peta wilayah menampilkan tokoh yang tinggal di kota itu pada tahun terpilih. Data tokoh dan 15 peristiwa baru (Mu'tah, Hunain, wabah Amwas, Nahawand, surat kepada para raja, dan lainnya) sudah diperiksa silang terhadap Wikipedia dan sunnah.com.
- **Nama tokoh di peta wilayah**: saat peta di-zoom ke sebuah kota, label kota menampilkan jumlah tokoh yang tinggal di sana pada tahun terpilih. Klik angka itu (atau zoom sangat dekat) untuk membuka daftar nama yang ringkas; hanya satu kota yang menampilkan nama sekaligus agar tidak bertumpuk.
- **Ikon sesuai fungsi tempat**: di peta wilayah, puncak penanda 3D dan labelnya berbentuk Ka'bah, masjid, kubah, kota, mahkota (pusat kerajaan), benteng, kebun kurma, pedang (medan perang), atau kemah (ekspedisi tanpa pertempuran). Di peta kota, ikon menunjukkan jenis tempat (rumah, balai, sumur, gua, pasar, makam, kampung, harrah, wadi, parit, dan lainnya) dengan warna tingkat keyakinan lokasi. Arti ikon ada di tombol bantuan (?).
- **Jejak tokoh**: dari profil, "Lihat di peta" atau "Peta kota" membawa jejak tokoh itu ke peta. Di peta wilayah tampil kartu jejak (tempat tinggal pada tahun terpilih, rangkaian tempat tinggalnya sebagai rute, dan nama tokoh disorot di daftar warga kota). Di peta kota Mekah atau Madinah, kartu jejak menunjukkan rumahnya bila tercatat (atau menyatakan bahwa letaknya tidak tercatat) dan tempat-tempat yang mencatat tokoh itu; penandanya disorot dan riwayatnya ditaruh paling atas. Jejak ikut tersimpan di alamat (`?jejak=bilal`).
- **Alamat per halaman**: URL berubah mengikuti menu dan pilihan, misalnya `#/perang/uhud/simulasi`, `#/hijrah/suraqah`, `#/kota/madinah/masjid-nabawi?tahun=625`, `#/tokoh/abubakar`, `#/kerabat/nabi/khalid`, atau `#/nuzul/surah/96`. Alamat bisa dibagikan, dan tombol kembali di peramban ikut bekerja.
- **Kota Madinah 3D** (tombol Mekah/Madinah di peta kota): dataran oasis dengan dua harrah basal hitam, Gunung Uhud, Sal', Rumat, 'Ayr, wadi Aqiq/Bathan/Qanat, ±8.800 pohon kurma, dan kampung-kampung kabilah dengan menara batu (utum). Masjid Nabawi mengikuti tahap pembangunannya (622, 629, 638, 649) dan arah kiblat (utara sampai 624, lalu selatan), dengan kamar para istri di sisi timur dan Shuffah. 56 tempat: Quba, Qiblatain, Masjid Jumu'ah, Baqi' (makam bertambah per tahun), makam syuhada Uhud, sumur Rumah/Bairuha'/Aris, pasar, Saqifah, benteng Bani Qainuqa'/Nadhir/Quraizhah, dan parit Khandaq yang hanya muncul pada 627 M. Mode jalan kaki dan tontonan di peta sama seperti Mekah.
- **Hijrah per kejadian**: 26 kejadian dari Bai'at Aqabah sampai persaudaraan Muhajirin–Anshar, masing-masing dengan tanggal, tempat, tokoh, kisah, ayat, riwayat beserta derajatnya, dan catatan perbedaan pendapat. Rute hijrah tergambar di peta wilayah (20 titik singgah menurut Ibnu Ishaq) dan otomatis tampil pada tahun 622 M. 17 kejadian bisa diputar sebagai tontonan, termasuk siang di rumah Abu Bakar, malam keberangkatan ke Gua Tsur (peta Mekah diperluas sampai Jabal Tsur), "Laa tahzan", Suraqah, kemah Ummu Ma'bad (riwayat diperselisihkan), tiba di Quba, unta berlutut di mirbad, dan pembangunan Masjid Nabawi di peta Madinah.
- **Perang zaman Rasul**: 27 ghazwah menurut Ibnu Ishaq ditambah Bani Qainuqa' (Ibnu Sa'd), dengan tanggal, tempat di peta, jumlah pasukan kedua pihak beserta rentang riwayatnya, panglima, panji, wakil di Madinah, korban, hasil, kronologi, ayat terkait, dan rujukan. Sembilan yang terjadi pertempuran (Badar, Uhud, Khandaq, Quraizhah, Mushthaliq, Khaibar, Fathu Makkah, Hunain, Thaif) punya **simulasi diorama** per fase dan tampilan **Konstruksi** (susunan pasukan dari atas). Susunan itu rekonstruksi ilustratif, bukan peta arkeologi.
- **Kekerabatan**: jaringan 105 hubungan keluarga, pernikahan, susuan/asuhan, dan persaudaraan (muakhah) antartokoh dalam bentuk graf **3D** yang bisa diputar, digeser, dan di-zoom (tampak atas sama dengan jaringan 2D; sumbu tegak menunjukkan tahun lahir, makin atas makin tua), dengan pilihan tampilan 2D. Klik tokoh untuk melihat kerabatnya; pencari jalur menjelaskan hubungan dua tokoh (misalnya Abu Bakar adalah mertua Nabi ﷺ) beserta jalur lainnya. Hubungan sudah diperiksa silang terhadap Wikipedia, sunnah.com, dan kitab rijal.
- **Mengikuti timeline**: 360 berhala (batu tegak) di sekitar Ka'bah sebelum 630 M; mulai 638 M rumah-rumah terdekat dirobohkan dan tampak dinding rendah Umar.

## Struktur

| File | Isi |
| --- | --- |
| `index.html` | Halaman, gaya, dan pemuatan library (React 18 UMD, htm, Three.js r128) |
| `data.js` | Data lokasi, tokoh, era, dan peristiwa (`window.SIRAH`) |
| `city-data.js` | Data tempat di kota Mekah, riwayat, dan daftar sumber (`window.MEKAH`) |
| `tokoh.js` | Profil tokoh, kelompok, tempat tinggal per periode, rumah di peta Mekah, peristiwa tambahan, dan lokasi baru |
| `city.js` | Scene 3D lembah Mekah (`window.MekahScene`) |
| `scene.js` | Medan 3D, penanda kota, kamera orbit (`window.SirahScene`) |
| `events.js` | Naskah tontonan peristiwa di peta: jalur, posisi, kamera, dialog (`window.TONTONAN`) |
| `surah.js` | Data 114 surah: golongan, urutan turun, perkiraan periode, catatan waktu bersumber (`window.SURAH`) |
| `nuzul.js` | Urutan kejadian asbabun nuzul dan penjelasan lengkap per kejadian (`window.NUZUL`) |
| `nuzul-ui.js` | Daftar asbabun nuzul (panel kanan) dan detailnya di atas peta (`window.SirahNuzulList`, `window.SirahNuzulDetail`) |
| `interior.js` | Adegan dalam ruangan (gua dan rumah) yang tampil di atas peta (`window.SirahInterior`) |
| `story.js` | Pemutar cerita di peta: karakter, gelembung dialog, kartu tanggal, kontrol (`window.SirahStory`) |
| `madinah-data.js` | Data tempat, medan, dan riwayat kota Madinah (`window.MADINAH`) |
| `madinah.js` | Scene 3D kota Madinah dengan API yang sama dengan `city.js` (`window.MadinahScene`) |
| `hijrah.js` | Kejadian Hijrah, rute, dan tempat baru (`window.HIJRAH`) |
| `perang.js` | 27 ghazwah dan Bani Qainuqa' (`window.PERANG`) |
| `perang-skenario.js` | Medan, pasukan, dan fase untuk sembilan simulasi perang (`window.PERANG_SKENARIO`) |
| `perang-sim.js` | Diorama simulasi perang dan pemutarnya (`window.PerangScene`, `window.SirahSimulasi`) |
| `kerabat.js` | Data dan tampilan jaringan kekerabatan (`window.SirahKerabat`) |
| `gabung.js` | Menyatukan tokoh baru, lokasi ghazwah, tautan tontonan Hijrah, dan daftar kota |
| `hijrah-ui.js`, `perang-ui.js` | Daftar dan detail Hijrah serta Perang |
| `app.js` | UI React: peta, panel detail, timeline, profil |

## Menjalankan

Tidak perlu build. Sajikan foldernya dengan server statis apa saja:

```bash
npx serve .
# atau
python3 -m http.server 8000
```

## Rencana berikutnya

- Pindahkan data ke DocType Frappe (Lokasi, Tokoh, Peristiwa, Ayat & Asbabun Nuzul) agar konten bisa diisi tim tanpa menyentuh kode.
- Porting ke proyek React + Vite.
- Review konten oleh ustadz.
