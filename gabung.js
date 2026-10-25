// Menyatukan data dari berkas-berkas tambahan (Madinah, Hijrah, Perang) ke data inti aplikasi.
// Dimuat setelah semua berkas data dan sebelum berkas tampilan.
(function () {
  const D = window.SIRAH;
  if (!D) return;

  // 1. Tokoh baru: definisi pertama yang dipakai, tokoh lama tidak ditimpa
  [window.MADINAH, window.HIJRAH, window.PERANG].forEach((src) => {
    if (!src || !src.tokohBaru) return;
    Object.entries(src.tokohBaru).forEach(([id, t]) => {
      if (D.tokoh[id]) return;
      D.tokoh[id] = { kel: ["lain"], tinggal: [], gelar: "", ringkas: "", arab: t.nama, ...t };
    });
  });

  // 1b. Lokasi tambahan untuk asbabun nuzul: Wadi Nakhlah (jin mendengarkan Al-Qur'an, QS. Al-Jinn 1–2)
  if (!D.lokasi.nakhlah) D.lokasi.nakhlah = { nama: "Nakhlah", arab: "نخلة", lat: 21.62, lon: 40.13, jenis: "oasis", ikon: "kurma", kecil: true,
    ket: "Lembah Nakhlah di antara Mekah dan Thaif, di jalan menuju Pasar 'Ukazh. Di sinilah, menurut HR. Bukhari no. 4921, sekelompok jin mendengar Nabi ﷺ membaca Al-Qur'an saat shalat Subuh. Titik di peta adalah perkiraan." };

  // 2a. Ikon peta wilayah menurut fungsi tempat
  const IKON = { makkah: "kabah", madinah: "masjid", quds: "kubah", khaibar: "benteng", thaif: "kota", tabuk: "kemah", habasyah: "mahkota", madain: "mahkota",
    badar: "pedang", yarmuk: "pedang", yamamah: "pedang", shiffin: "pedang", mutah: "pedang", hunain: "pedang", nahawand: "pedang",
    syam: "kota", kufah: "kota", bashrah: "kota", mesir: "kota", yaman: "kota", hims: "kota" };
  Object.entries(IKON).forEach(([id, ik]) => { if (D.lokasi[id] && !D.lokasi[id].ikon) D.lokasi[id].ikon = ik; });

  // 2. Lokasi peta wilayah untuk ghazwah yang tempatnya belum ada di peta
  if (window.PERANG) {
    window.PERANG.daftar.forEach((p) => {
      if (p.lok || !p.tempat || p.tempat.lat == null) return;
      const id = "g-" + p.id;
      p.lokPeta = id;
      D.lokasi[id] = {
        nama: p.tempat.nama.split(/[,(]/)[0].trim(), arab: "", lat: p.tempat.lat, lon: p.tempat.lon,
        jenis: "medan", kecil: true, perang: p.id, ket: p.tempat.nama,
        ikon: p.jenis === "pertempuran" ? "pedang" : p.jenis === "pengepungan" ? "benteng" : "kemah"
      };
    });
    window.PERANG.daftar.forEach((p) => { if (p.lok) p.lokPeta = p.lok; });
  }

  // 3. Hijrah: tautkan episode ke tontonan yang sudah dibuat
  if (window.HIJRAH && window.TONTONAN) {
    const T = { "laba-laba-merpati": "laa-tahzan", "darun-nadwah": "makar-nadwah", "ali-ranjang": "makar-nadwah" };
    window.HIJRAH.episode.forEach((e) => {
      if (!e.tontonan && window.TONTONAN[e.id]) e.tontonan = e.id;
      if (!e.tontonan && T[e.id] && window.TONTONAN[T[e.id]]) e.tontonan = T[e.id];
    });
  }

  // 4. Daftar kota untuk peta 3D
  window.KOTA = {
    mekah: {
      nama: "Mekah", data: () => window.MEKAH, engine: () => window.MekahScene, pusat: "kabah",
      ket: "Ka'bah, rumah para tokoh, dan bukit di sekitarnya.", mulai: "Mulai jalan kaki dari Ka'bah", tahunAwal: 570
    },
    madinah: {
      nama: "Madinah", data: () => window.MADINAH, engine: () => window.MadinahScene, pusat: "masjid-nabawi",
      ket: "Masjid Nabawi, rumah para sahabat, kampung kabilah, benteng, sumur, kebun kurma, dan gunung di sekitarnya.", mulai: "Mulai jalan kaki dari Masjid Nabawi", tahunAwal: 622
    }
  };
})();
