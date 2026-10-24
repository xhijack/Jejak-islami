# Jejak Sirah

Prototipe aplikasi pengetahuan internal Sopwer: peta 3D sejarah Islam dari Tahun Gajah (570 M) sampai akhir Khulafaur Rasyidin (661 M), lengkap dengan timeline, asbabun nuzul, dan profil tokoh.

> **Status konten: DRAF.** Narasi, tahun, dan rujukan hadits masih harus diverifikasi ustadz sebelum dipakai.

## Fitur

- Peta "meja pasir" 3D (Three.js) dari Jazirah Arab sampai Syam, Irak, Mesir, dan Habasyah.
- Timeline 570–661 M dengan pita era: sebelum kenabian, Mekah, Madinah, dan empat khalifah. Ada tombol putar otomatis.
- Klik kota untuk melihat ilustrasi, peristiwa, ayat, asbabun nuzul, dan rujukan.
- Tokoh ditampilkan sebagai medali kaligrafi nama, tanpa wajah. Klik untuk membuka profil dan usia di tahun terpilih.
- Tab "Tokoh yang hidup" untuk tahun yang dipilih.
- **Mode kota Mekah**: lembah Mekah 3D dengan Ka'bah, Hijr Ismail, Zamzam, Maqam Ibrahim, Shafa–Marwah, Darun Nadwah, Darul Arqam, rumah Khadijah, Abu Sufyan, Abu Lahab, Abu Jahal, tempat lahir Nabi, dan Syi'ib Bani Hasyim. Tiap titik diberi tingkat keyakinan lokasi (pasti / menurut kitab sejarah / perkiraan), dan tiap riwayat diberi derajat (hadits shahih / kitab sirah / lemah) beserta rujukannya.
- **Geser peta** (wilayah dan kota): seret kiri untuk menggeser, klik kanan atau Shift+seret untuk memutar dan memiringkan, scroll atau pinch (trackpad, layar sentuh, Safari) untuk zoom langsung ke arah kursor, WASD/panah atau tombol panah di layar untuk menggeser, Q/E untuk memutar. **Mode jalan kaki** setinggi mata (W/S jalan, A/D geser, Q/E belok, seret untuk melihat, Shift berlari, Esc keluar) dengan tabrakan rumah, petunjuk arah Ka'bah, dan tempat terdekat.
- **Rumah gaya abad ke-7 dengan LOD streaming**: dari jauh rumah berupa kotak instanced yang ringan. Rumah detail (fondasi batu, dinding bata lumpur, balok atap menonjol, pintu kayu, halaman dengan naungan pelepah, kamar atas) dibangun per sel 60 m hanya di sekitar kamera dan di dalam pandangan, digabung menjadi satu mesh per sel, lalu dibuang saat menjauh.
- **Gurun dan jalan**: tekstur pasir dan kerikil dengan relief, tebing batu gelap berdasar kemiringan, dasar Wadi Ibrahim berpasir halus, ±2.600 bebatuan di lereng, bayangan matahari sore yang mengikuti area pandang, dan langit senja saat jalan kaki. Jalan bersejarah: ke Ma'la/Kada' (HR. Bukhari 1578), ke Kuda (HR. Bukhari 1575, 1578), Misfalah ke Yaman, Suq al-Lail, dan gang Al-'Attarin; gang lain adalah rekonstruksi. Tombol **Kualitas ringan** mematikan bayangan, bebatuan, dan relief untuk laptop yang lebih lemah.
- **Tontonan peristiwa di peta**: tombol "Tonton peristiwa" memutar kejadian langsung di peta 3D Mekah pada malam hari. Episode pertama: *Wahyu Pertama di Gua Hira* (HR. Bukhari no. 3), dari rumah Khadijah, berjalan lewat Ma'la ke Jabal Nur (peta diperluas ±7 km), mendaki ke Gua Hira, turun pulang, lalu ke rumah Waraqah. Kamera mengikuti perjalanan di peta; saat masuk gua atau rumah, layar beralih ke adegan dalam ruangan (Gua Hira dengan "Iqra'" dan tiga dekapan, rumah Khadijah, rumah Waraqah), lalu kembali ke peta saat keluar. Rasulullah ﷺ dan Jibril hanya tampil sebagai nama dan cahaya; Khadijah dan Waraqah sebagai karakter dengan wajah hanya mata dan mulut yang ekspresinya berubah. Gelembung dialog menempel di peta, ada kartu tanggal (Senin, HR. Muslim 1162; Ramadhan, QS. Al-Baqarah 185; 21 Ramadhan menurut Al-Mubarakfuri, diperselisihkan), sumber per adegan, serta kontrol putar/jeda, maju/mundur, dan lompat babak.
- **Ensiklopedia Asbabun Nuzul** (tombol di header): halaman bergaya Wikipedia berisi urutan kejadian turunnya ayat. Tiap artikel punya kotak info (surah, ayat, golongan, urutan turun, waktu, tempat, penerima, perantara, riwayat utama), daftar isi, teks ayat Arab dan terjemah, bagian kronologi, perbedaan pendapat, rujukan bernomor yang tertaut ke sunnah.com, navigasi sebelumnya/berikutnya, serta tombol **Tonton kejadian** dan **Lihat di peta**. Artikel lengkap ditulis satu per satu (sudah: Al-'Alaq 1–5); entri lain sementara berupa ringkasan dari data peristiwa.
- **Mengikuti timeline**: 360 berhala (batu tegak) di sekitar Ka'bah sebelum 630 M; mulai 638 M rumah-rumah terdekat dirobohkan dan tampak dinding rendah Umar.

## Struktur

| File | Isi |
| --- | --- |
| `index.html` | Halaman, gaya, dan pemuatan library (React 18 UMD, htm, Three.js r128) |
| `data.js` | Data lokasi, tokoh, era, dan peristiwa (`window.SIRAH`) |
| `city-data.js` | Data tempat di kota Mekah, riwayat, dan daftar sumber (`window.MEKAH`) |
| `city.js` | Scene 3D lembah Mekah (`window.MekahScene`) |
| `scene.js` | Medan 3D, penanda kota, kamera orbit (`window.SirahScene`) |
| `events.js` | Naskah tontonan peristiwa di peta: jalur, posisi, kamera, dialog (`window.TONTONAN`) |
| `nuzul.js` | Urutan kejadian asbabun nuzul dan artikel ensiklopedia (`window.NUZUL`) |
| `wiki.js` | Tampilan ensiklopedia bergaya Wikipedia (`window.SirahWiki`) |
| `interior.js` | Adegan dalam ruangan (gua dan rumah) yang tampil di atas peta (`window.SirahInterior`) |
| `story.js` | Pemutar cerita di peta: karakter, gelembung dialog, kartu tanggal, kontrol (`window.SirahStory`) |
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
