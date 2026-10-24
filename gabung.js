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

  // 2. Lokasi peta wilayah untuk ghazwah yang tempatnya belum ada di peta
  if (window.PERANG) {
    window.PERANG.daftar.forEach((p) => {
      if (p.lok || !p.tempat || p.tempat.lat == null) return;
      const id = "g-" + p.id;
      p.lokPeta = id;
      D.lokasi[id] = {
        nama: p.tempat.nama.split(/[,(]/)[0].trim(), arab: "", lat: p.tempat.lat, lon: p.tempat.lon,
        jenis: "medan", kecil: true, perang: p.id, ket: p.tempat.nama
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
