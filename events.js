// Tontonan peristiwa. Rasulullah ﷺ dan malaikat hanya ditampilkan sebagai nama, tanpa sosok.
// Tokoh lain tampil sebagai karakter sederhana: wajah hanya mata (titik/bulan sabit) dan mulut (garis).
// Dialog adalah terjemahan bebas dari sumber yang disebut di tiap babak. DRAF: wajib diverifikasi ustadz.
(function () {
  const B3 = { sumber: "HR. Bukhari no. 3 (Aisyah)", url: "https://sunnah.com/bukhari:3" };
  window.TONTONAN = {
    "wahyu-pertama": {
      judul: "Wahyu Pertama di Gua Hira",
      tahun: "610 M",
      pengantar: "Rasulullah ﷺ dan malaikat tidak digambarkan; keduanya hanya tampil sebagai nama. Dialog disusun dari terjemahan bebas HR. Bukhari no. 3 dan perlu diverifikasi ustadz.",
      tokoh: { khadijah: { nama: "Khadijah" }, waraqah: { nama: "Waraqah bin Naufal" } },
      babak: [
        { judul: "Mimpi yang benar", beats: [
          { scene: "fajar", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 760, y: 610, small: true, state: "tenang" }, ...B3,
            narr: "Wahyu pertama kepada Rasulullah ﷺ diawali dengan mimpi yang benar. Setiap mimpi beliau menjadi nyata, seterang cahaya fajar." }
        ] },
        { judul: "Menyendiri di Gua Hira", beats: [
          { scene: "hira-luar", cam: { x: 960, y: 480, s: 1 }, rasul: { x: 1215, y: 250, small: true, state: "tenang" }, ...B3,
            narr: "Kemudian beliau suka menyendiri. Beliau beribadah di Gua Hira, di sebuah gunung di luar kota Mekah, selama beberapa malam." },
          { cam: { x: 1200, y: 300, s: 2.3 }, ...B3,
            narr: "Beliau membawa bekal, lalu pulang kepada Khadijah untuk mengambil bekal lagi. Begitu seterusnya, hingga datang kebenaran ketika beliau berada di Gua Hira." }
        ] },
        { judul: "Datangnya malaikat", beats: [
          { scene: "hira-dalam", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 800, y: 640, small: false, state: "tenang" }, jibril: { x: 800, y: 320, power: 0 },
            sumber: "HR. Bukhari no. 3; bulan Ramadhan menurut Sirah Ibnu Hisyam", url: B3.url,
            narr: "Pada suatu malam, saat beliau sendirian di dalam gua. Menurut Ibnu Ishaq, peristiwa ini terjadi di bulan Ramadhan." },
          { jibril: { x: 800, y: 320, power: 0.6 }, ...B3, say: { who: "jibril", text: "Bacalah!", arab: "اقْرَأْ" } },
          { ...B3, say: { who: "rasul", text: "Aku tidak bisa membaca.", arab: "مَا أَنَا بِقَارِئٍ" } },
          { jibril: { x: 800, y: 600, power: 1 }, rasul: { state: "payah" }, hitung: "Dekapan pertama", ...B3,
            narr: "Malaikat itu mendekap beliau dengan kuat hingga beliau merasa sangat payah, lalu melepaskannya." },
          { jibril: { x: 800, y: 320, power: 0.6 }, rasul: { state: "tenang" }, ...B3, say: { who: "jibril", text: "Bacalah!", arab: "اقْرَأْ" } },
          { ...B3, say: { who: "rasul", text: "Aku tidak bisa membaca.", arab: "مَا أَنَا بِقَارِئٍ" } },
          { jibril: { x: 800, y: 600, power: 1 }, rasul: { state: "payah" }, hitung: "Dekapan kedua", ...B3,
            narr: "Malaikat itu mendekap beliau untuk kedua kalinya hingga beliau sangat payah, lalu melepaskannya." },
          { jibril: { x: 800, y: 320, power: 0.6 }, rasul: { state: "tenang" }, ...B3, say: { who: "jibril", text: "Bacalah!", arab: "اقْرَأْ" } },
          { ...B3, say: { who: "rasul", text: "Aku tidak bisa membaca.", arab: "مَا أَنَا بِقَارِئٍ" } },
          { jibril: { x: 800, y: 600, power: 1 }, rasul: { state: "payah" }, hitung: "Dekapan ketiga", ...B3,
            narr: "Untuk ketiga kalinya malaikat itu mendekap beliau, lalu melepaskannya dan berkata:" },
          { jibril: { x: 800, y: 380, power: 0.85 }, rasul: { state: "tenang" }, sumber: "HR. Bukhari no. 3; QS. Al-'Alaq: 1–3", url: B3.url, hold: 4500,
            say: { who: "jibril", ayat: "QS. Al-'Alaq: 1–3",
              arab: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ﴿١﴾ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ ﴿٢﴾ اقْرَأْ وَرَبُّكَ الْأَكْرَمُ ﴿٣﴾",
              text: "Bacalah dengan nama Tuhanmu yang menciptakan. Dia menciptakan manusia dari segumpal darah. Bacalah, dan Tuhanmulah Yang Maha Mulia." } },
          { jibril: { power: 0 }, ...B3,
            narr: "Hadits ini menyebutnya \"malaikat\". Waraqah kemudian menyebutnya an-Namus, yang dijelaskan para ulama sebagai Jibril." }
        ] },
        { judul: "Pulang dengan hati gemetar", beats: [
          { scene: "turun", cam: { x: 1050, y: 380, s: 1.25 }, rasul: { x: 1200, y: 270, small: true, state: "gemetar" }, ...B3,
            narr: "Rasulullah ﷺ pulang membawa ayat-ayat itu dengan hati yang gemetar." },
          { cam: { x: 560, y: 640, s: 1.25 }, rasul: { x: 440, y: 700 }, ...B3,
            narr: "Beliau menuruni gunung menuju rumah Khadijah binti Khuwailid." }
        ] },
        { judul: "Di rumah Khadijah", beats: [
          { scene: "rumah-khadijah", cam: { x: 800, y: 470, s: 1 }, rasul: { x: 590, y: 600, small: false, state: "gemetar" },
            chars: [{ id: "khadijah", x: 1040, y: 640, expr: "kaget", on: true }], ...B3,
            say: { who: "rasul", text: "Selimuti aku, selimuti aku!", arab: "زَمِّلُونِي زَمِّلُونِي" } },
          { rasul: { state: "berselimut" }, chars: [{ id: "khadijah", x: 860, expr: "khawatir" }], ...B3,
            narr: "Beliau pun diselimuti hingga rasa takutnya hilang. Lalu beliau menceritakan semua yang terjadi kepada Khadijah." },
          { ...B3, say: { who: "rasul", text: "Sungguh, aku khawatir terhadap diriku.", arab: "لَقَدْ خَشِيتُ عَلَى نَفْسِي" } },
          { chars: [{ id: "khadijah", expr: "tegas" }], ...B3,
            say: { who: "khadijah", text: "Sekali-kali tidak. Demi Allah, Allah tidak akan menghinakanmu selamanya.", arab: "كَلَّا وَاللَّهِ مَا يُخْزِيكَ اللَّهُ أَبَدًا" } },
          { chars: [{ id: "khadijah", expr: "lembut" }], ...B3, hold: 3500,
            say: { who: "khadijah", text: "Engkau menyambung silaturahim, menanggung beban orang lain, memberi orang yang tidak punya, memuliakan tamu, dan menolong orang yang tertimpa musibah di jalan kebenaran." } }
        ] },
        { judul: "Menemui Waraqah bin Naufal", beats: [
          { scene: "rumah-waraqah", cam: { x: 820, y: 480, s: 1 }, rasul: { x: 500, y: 600, small: false, state: "tenang" },
            chars: [{ id: "khadijah", x: 790, y: 640, expr: "netral", on: true }, { id: "waraqah", x: 1130, y: 660, expr: "netral", on: true }], ...B3,
            narr: "Khadijah membawa beliau kepada sepupunya, Waraqah bin Naufal. Di masa jahiliyah ia memeluk Nasrani, menulis kitab dengan aksara Ibrani, dan menyalin Injil. Ia sudah tua dan buta." },
          { chars: [{ id: "khadijah", expr: "senyum" }], ...B3,
            say: { who: "khadijah", text: "Wahai putra pamanku, dengarkanlah putra saudaramu ini.", arab: "يَا ابْنَ عَمِّ، اسْمَعْ مِنَ ابْنِ أَخِيكَ" } },
          { chars: [{ id: "khadijah", expr: "netral" }, { id: "waraqah", expr: "netral" }], ...B3,
            say: { who: "waraqah", text: "Wahai putra saudaraku, apa yang engkau lihat?", arab: "يَا ابْنَ أَخِي، مَاذَا تَرَى؟" } },
          { chars: [{ id: "waraqah", expr: "kaget" }], ...B3,
            narr: "Rasulullah ﷺ menceritakan apa yang beliau lihat di Gua Hira." },
          { chars: [{ id: "waraqah", expr: "kagum" }], ...B3,
            say: { who: "waraqah", text: "Inilah an-Namus yang dahulu Allah turunkan kepada Musa.", arab: "هَذَا النَّامُوسُ الَّذِي نَزَّلَ اللَّهُ عَلَى مُوسَى" } },
          { chars: [{ id: "waraqah", expr: "sedih" }], ...B3,
            say: { who: "waraqah", text: "Andai aku masih muda saat itu. Andai aku masih hidup ketika kaummu mengusirmu." } },
          { chars: [{ id: "khadijah", expr: "khawatir" }], ...B3,
            say: { who: "rasul", text: "Apakah mereka akan mengusirku?", arab: "أَوَمُخْرِجِيَّ هُمْ" } },
          { chars: [{ id: "waraqah", expr: "tegas" }], ...B3, hold: 3500,
            say: { who: "waraqah", text: "Ya. Tidak seorang pun datang membawa seperti yang engkau bawa melainkan dimusuhi. Jika aku masih hidup di harimu, aku akan menolongmu dengan sungguh-sungguh." } },
          { chars: [{ id: "waraqah", on: false }, { id: "khadijah", expr: "sedih" }], ...B3,
            narr: "Tidak lama kemudian Waraqah wafat, dan wahyu terhenti untuk sementara waktu." }
        ] }
      ],
      penutup: "Setelah masa terhentinya wahyu, turunlah Surah Al-Muddatstsir. Lihat peristiwa 611 M di peta."
    }
  };
})();
