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
- **Geser peta** (wilayah dan kota): seret kiri untuk menggeser, klik kanan atau Shift+seret untuk memutar dan memiringkan, scroll untuk zoom, WASD/panah atau tombol panah di layar untuk menggeser, Q/E untuk memutar. **Mode jalan kaki** setinggi mata (W/S jalan, A/D geser, Q/E belok, seret untuk melihat, Shift berlari, Esc keluar) dengan tabrakan rumah, petunjuk arah Ka'bah, dan tempat terdekat.
- **Rumah gaya abad ke-7 dengan LOD streaming**: dari jauh rumah berupa kotak instanced yang ringan. Rumah detail (fondasi batu, dinding bata lumpur, balok atap menonjol, pintu kayu, halaman dengan naungan pelepah, kamar atas) dibangun per sel 60 m hanya di sekitar kamera dan di dalam pandangan, digabung menjadi satu mesh per sel, lalu dibuang saat menjauh.
- **Mengikuti timeline**: 360 berhala (batu tegak) di sekitar Ka'bah sebelum 630 M; mulai 638 M rumah-rumah terdekat dirobohkan dan tampak dinding rendah Umar.

## Struktur

| File | Isi |
| --- | --- |
| `index.html` | Halaman, gaya, dan pemuatan library (React 18 UMD, htm, Three.js r128) |
| `data.js` | Data lokasi, tokoh, era, dan peristiwa (`window.SIRAH`) |
| `city-data.js` | Data tempat di kota Mekah, riwayat, dan daftar sumber (`window.MEKAH`) |
| `city.js` | Scene 3D lembah Mekah (`window.MekahScene`) |
| `scene.js` | Medan 3D, penanda kota, kamera orbit (`window.SirahScene`) |
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
