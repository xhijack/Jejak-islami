// Lembah Mekah 3D sekitar masa Nabi. 1 unit = 20 m. x = timur, -z = utara.
// Rumah dari jauh: kotak sederhana (instanced). Rumah dekat & dalam pandangan: model detail per sel 60 m (streaming).
(function () {
  const M = 20, VX = 1.3; // meter per unit, eksagerasi vertikal
  const CELL = 60;
  const toX = (e) => e / M, toZ = (n) => -n / M;

  function hash(x, y) { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); }
  function vnoise(x, y) {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  function fbm(x, y) { let s = 0, a = 0.5, f = 1; for (let i = 0; i < 5; i++) { s += a * vnoise(x * f, y * f); f *= 2.03; a *= 0.5; } return s; }
  function segDist(px, py, ax, ay, bx, by) {
    const dx = bx - ax, dy = by - ay;
    const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
    return Math.hypot(px - ax - t * dx, py - ay - t * dy);
  }
  const smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

  const PEAKS = [[360, -200, 185, 140], [700, 420, 280, 160], [-200, -660, 260, 100], [260, -720, 240, 110], [-160, 860, 300, 120], [900, -150, 260, 120]];
  const RIDGES = [[-460, -180, -330, 470, 170, 130], [520, 180, 860, 640, 150, 120], [-700, 300, -500, 800, 200, 110]];
  const HILLOCKS = [[100, -85, 26, 9], [125, 340, 24, 7]]; // Shafa, Marwah
  // Jabal Nur (Wikipedia: 21°27′29″U 39°51′40″T) ≈ 3,6 km ke timur dan 3,9 km ke utara Ka'bah; Gua Hira di dekat puncaknya
  const JN = [3616, 3943], HIRA = [3590, 3915];
  // Jabal Tsur (21,3775 LU 39,8508 BT) ≈ 2,6 km ke timur dan 5 km ke selatan Ka'bah; gua di dekat puncaknya
  const TSUR = [2552, -4976], GUA_TSUR = [2538, -4952];
  const FAR = [[1500, 1150, 420, 170], [700, 2650, 480, 200], [2650, 1950, 500, 210], [4350, 3050, 480, 190], [3050, 4750, 560, 240], [4650, 4650, 480, 200],
    [1750, 3850, 450, 170], [-800, 1800, 480, 170], [2250, 350, 430, 150], [-1200, -200, 450, 150], [4200, 1600, 500, 170], [1200, 4500, 500, 190], [400, -1400, 420, 140],
    // pegunungan di selatan Mekah, mengapit lembah menuju Jabal Tsur
    [-750, -2300, 480, 170], [-100, -3500, 520, 180], [650, -4700, 500, 175], [1500, -5750, 480, 165], [1400, -2050, 440, 160],
    [2650, -2950, 500, 185], [3550, -4150, 520, 195], [3850, -5500, 480, 185], [-1300, -4300, 520, 170], [4500, -2300, 480, 170]];

  function mountainH(e, n) {
    let h = 0;
    for (const [pe, pn, r, ht] of PEAKS) h += ht * Math.exp(-(((e - pe) ** 2 + (n - pn) ** 2) / (r * r)));
    for (const [a, b, c, d, w, ht] of RIDGES) h += ht * Math.exp(-((segDist(e, n, a, b, c, d) / w) ** 2));
    for (const [pe, pn, r, ht] of FAR) { const dx = e - pe, dy = n - pn; if (dx > 3 * r || dx < -3 * r || dy > 3 * r || dy < -3 * r) continue; h += ht * Math.exp(-(dx * dx + dy * dy) / (r * r)); }
    const dj = Math.hypot(e - JN[0], n - JN[1]); if (dj < 900) h += 290 * Math.pow(1 - dj / 900, 1.7);
    const dt = Math.hypot(e - TSUR[0], n - TSUR[1]); if (dt < 1150) h += 330 * Math.pow(1 - dt / 1150, 1.6);
    return h * (0.75 + 0.5 * fbm(e / 90, n / 90));
  }
  function heightAt(e, n) {
    const d = Math.hypot(e, n);
    let floor = Math.min(95, Math.max(0, 0.016 * (0.45 * e + 0.9 * n))) * smooth(30, 120, d);
    for (const [he, hn, r, ht] of HILLOCKS) floor += ht * Math.exp(-(((e - he) ** 2 + (n - hn) ** 2) / (r * r)));
    return floor + mountainH(e, n) + fbm(e / 40, n / 40) * 1.5;
  }
  const Y = (e, n) => (heightAt(e, n) * VX) / M;

  // ---------- Pembangun geometri gabungan ----------
  let UNIT = null;
  function units(THREE) {
    if (UNIT) return UNIT;
    const g1 = new THREE.BoxGeometry(1, 1, 1).toNonIndexed(), g2 = new THREE.CylinderGeometry(0.42, 0.5, 1, 9).toNonIndexed();
    UNIT = { box: { p: g1.attributes.position.array, n: g1.attributes.normal.array }, cyl: { p: g2.attributes.position.array, n: g2.attributes.normal.array } };
    return UNIT;
  }
  function Acc() { return { p: [], n: [], c: [], uv: [] }; }
  // Tambah satu bagian ke akumulator. Koordinat lokal rumah (meter): x lebar, y naik, z ke depan (pintu).
  function part(acc, U, sx, sy, sz, ox, oy, oz, ry, color, H) {
    const { p, n } = U, cr = Math.cos(ry), sr = Math.sin(ry), ct = Math.cos(H.t), st = Math.sin(H.t);
    const j = 0.94 + hash(ox * 3.1 + H.e, oz * 1.7 + H.n) * 0.1;
    const r = ((color >> 16) & 255) / 255 * j, g = ((color >> 8) & 255) / 255 * j, b = (color & 255) / 255 * j;
    for (let i = 0; i < p.length; i += 3) {
      const px = p[i] * sx, py = p[i + 1] * sy, pz = p[i + 2] * sz;
      const lx = px * cr + pz * sr + ox, ly = py + oy, lz = -px * sr + pz * cr + oz;
      const nx0 = n[i] * cr + n[i + 2] * sr, ny0 = n[i + 1], nz0 = -n[i] * sr + n[i + 2] * cr;
      const we = H.e + lx * ct + lz * st, wz = -H.n - lx * st + lz * ct;
      acc.p.push(we / M, ((H.g + ly) * VX) / M, wz / M);
      let wx = nx0 * ct + nz0 * st, wy = ny0 / VX, wzN = -nx0 * st + nz0 * ct;
      const L = Math.hypot(wx, wy, wzN) || 1; acc.n.push(wx / L, wy / L, wzN / L);
      acc.c.push(r, g, b);
      if (Math.abs(ny0) > 0.5) acc.uv.push(lx / 3, lz / 3); else if (Math.abs(nx0) > Math.abs(nz0)) acc.uv.push(lz / 3, ly / 3); else acc.uv.push(lx / 3, ly / 3);
    }
  }
  function toGeometry(THREE, acc) {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(acc.p, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(acc.n, 3));
    g.setAttribute("color", new THREE.Float32BufferAttribute(acc.c, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(acc.uv, 2));
    g.computeBoundingSphere();
    return g;
  }

  const C = { stone: 0x8c7660, wood: 0x5a3f2c, door: 0x4a3424, dark: 0x2a211b, straw: 0xa8915f, clay: 0x9c6a45 };
  const shade = (c, k) => (Math.round(((c >> 16) & 255) * k) << 16) | (Math.round(((c >> 8) & 255) * k) << 8) | Math.round((c & 255) * k);

  // Rumah Mekah abad ke-7 (rekonstruksi umum): batu dan bata lumpur, atap datar dari balok kayu dan pelepah,
  // dinding pembatas atap, pintu kayu rendah, jendela kecil, sebagian punya halaman dengan naungan pelepah kurma ('arisy).
  function genHouse(acc, U, h) {
    const W = h.w, L = h.l, Ht = h.h, wall = h.col, pc = shade(wall, 0.88);
    let s = h.seed; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
    const B = (sx, sy, sz, ox, oy, oz, col, ry = 0) => part(acc, U.box, sx, sy, sz, ox, oy, oz, ry, col, h);
    B(W + 0.4, 2, L + 0.4, 0, -0.5, 0, C.stone);                     // fondasi batu (masuk ke tanah di lereng)
    B(W, Ht, L, 0, Ht / 2, 0, wall);                                   // dinding
    B(W, 0.45, 0.3, 0, Ht + 0.22, L / 2 - 0.15, pc); B(W, 0.45, 0.3, 0, Ht + 0.22, -L / 2 + 0.15, pc);
    B(0.3, 0.45, L - 0.6, W / 2 - 0.15, Ht + 0.22, 0, pc); B(0.3, 0.45, L - 0.6, -W / 2 + 0.15, Ht + 0.22, 0, pc);
    B(W - 0.5, 0.08, L - 0.5, 0, Ht + 0.04, 0, C.straw);               // lapisan pelepah & tanah di atap
    const nb = Math.max(3, Math.floor(W / 1.1));
    for (let i = 0; i < nb; i++) {                                     // ujung balok kayu yang menonjol
      const x = -W / 2 + ((i + 0.5) * W) / nb;
      B(0.17, 0.17, 0.5, x, Ht - 0.35, L / 2 + 0.2, C.wood); B(0.17, 0.17, 0.5, x, Ht - 0.35, -L / 2 - 0.2, C.wood);
    }
    const dx = (r() - 0.5) * Math.max(0, W - 2.6);
    B(1.05, 1.95, 0.14, dx, 0.98, L / 2 + 0.05, C.door);              // pintu
    B(1.6, 0.2, 0.32, dx, 2.06, L / 2 + 0.1, C.wood);                 // ambang atas
    B(1.4, 0.2, 0.6, dx, 0.1, L / 2 + 0.4, C.stone);                  // batu injakan
    const nw = 1 + Math.floor(r() * 2);
    for (let i = 0; i < nw; i++) {
      let x = -W / 2 + 1 + r() * (W - 2); if (Math.abs(x - dx) < 1.2) x = dx + (x < dx ? -1.4 : 1.4);
      B(0.5, 0.42, 0.08, Math.max(-W / 2 + 0.5, Math.min(W / 2 - 0.5, x)), Ht - 1.15, L / 2 + 0.03, C.dark);
    }
    B(0.08, 0.42, 0.5, W / 2 + 0.03, Ht - 1.15, (r() - 0.5) * (L - 2), C.dark);
    B(0.14, 0.12, 0.8, W / 2 - 0.7, Ht + 0.1, L / 2 + 0.4, C.wood);    // talang air
    if (h.court) {
      const Cd = h.court, ch = 1.9;
      B(0.4, ch, Cd, -W / 2 + 0.2, ch / 2, L / 2 + Cd / 2, wall); B(0.4, ch, Cd, W / 2 - 0.2, ch / 2, L / 2 + Cd / 2, wall);
      const gw = 1.5, gx = Math.max(-W / 2 + 1.4, Math.min(W / 2 - 1.4, dx + (r() - 0.5) * 2));
      const left = gx - gw / 2 + W / 2, right = W / 2 - (gx + gw / 2);
      if (left > 0.2) B(left, ch, 0.4, -W / 2 + left / 2, ch / 2, L / 2 + Cd - 0.2, wall);
      if (right > 0.2) B(right, ch, 0.4, W / 2 - right / 2, ch / 2, L / 2 + Cd - 0.2, wall);
      const aw = Math.min(3.8, W - 1.4), ad = Math.min(2.6, Cd - 1), ax = (r() < 0.5 ? -1 : 1) * (W / 2 - 0.6 - aw / 2), az = L / 2 + 0.3 + ad / 2;
      for (const [px, pz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) B(0.14, 2.3, 0.14, ax + (px * aw) / 2, 1.15, az + (pz * ad) / 2, C.wood);
      B(aw + 0.4, 0.14, ad + 0.4, ax, 2.36, az, C.straw);              // naungan pelepah kurma
      part(acc, U.cyl, 0.6, 0.75, 0.6, -ax * 0.6, 0.37, L / 2 + Cd - 1, 0, C.clay, h); // tempayan air
    } else if (h.jar) part(acc, U.cyl, 0.6, 0.75, 0.6, dx + 1, 0.37, L / 2 + 0.45, 0, C.clay, h);
    if (h.upper) {                                                      // kamar atas (ghurfah)
      const uw = W * 0.45, ul = L * 0.5, uh = 2.6, ux = W / 2 - uw / 2 - 0.3, uz = -L / 2 + ul / 2 + 0.3;
      B(uw, uh, ul, ux, Ht + uh / 2, uz, wall); B(uw + 0.25, 0.35, ul + 0.25, ux, Ht + uh + 0.17, uz, pc);
      B(0.8, 1.6, 0.1, ux - uw / 4, Ht + 0.8, uz + ul / 2 + 0.05, C.door);
      for (let i = 0; i < 3; i++) B(0.15, 0.15, 0.4, ux - uw / 2 + ((i + 0.5) * uw) / 3, Ht + uh - 0.3, uz + ul / 2 + 0.15, C.wood);
    }
  }

  function plasterTexture(THREE) {
    const c = document.createElement("canvas"); c.width = c.height = 256;
    const g = c.getContext("2d");
    g.fillStyle = "#e2dbcf"; g.fillRect(0, 0, 256, 256);
    for (let row = 0; row < 8; row++) {
      const y = row * 32, off = (row % 2) * 22;
      for (let x = -44 + off, k = 0; x < 256; k++) {
        const w = 38 + Math.floor(hash(row, k) * 20), v = 236 + Math.floor(hash(k, row) * 16);
        g.fillStyle = `rgb(${v},${v - 5},${v - 12})`; g.fillRect(x + 0.8, y + 0.8, w - 1.6, 30.4); x += w;
      }
    }
    const img = g.getImageData(0, 0, 256, 256), d = img.data;
    for (let i = 0; i < d.length; i += 4) { const k = (hash(i, 7) - 0.5) * 16; d[i] += k; d[i + 1] += k; d[i + 2] += k; }
    g.putImageData(img, 0, 0);
    const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4;
    return t;
  }

  // Tekstur detail pasir/kerikil (abu-abu terang, dikalikan warna medan) dan normal map untuk relief halus
  function groundTextures(THREE) {
    const N = 256, hgt = new Float32Array(N * N);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const u = x / N, v = y / N, tile = (fx, fy, f) => vnoise(((fx * f) % f + f) % f, ((fy * f) % f + f) % f);
      let hv = 0, a = 0.5, f = 8;
      for (let o = 0; o < 4; o++) { // noise yang bisa diulang tanpa sambungan
        const X = u * f, Yv = v * f, xi = Math.floor(X), yi = Math.floor(Yv), xf = X - xi, yf = Yv - yi;
        const g = (i, j) => hash(((xi + i) % f + f) % f + o * 37, ((yi + j) % f + f) % f);
        const sx = xf * xf * (3 - 2 * xf), sy = yf * yf * (3 - 2 * yf);
        hv += a * (g(0, 0) + (g(1, 0) - g(0, 0)) * sx + (g(0, 1) - g(0, 0)) * sy + (g(0, 0) - g(1, 0) - g(0, 1) + g(1, 1)) * sx * sy);
        a *= 0.5; f *= 2;
      }
      hgt[y * N + x] = hv + (hash(x, y) - 0.5) * 0.18; // butiran kerikil
    }
    const cm = document.createElement("canvas"), cn = document.createElement("canvas"); cm.width = cm.height = cn.width = cn.height = N;
    const gm = cm.getContext("2d"), gn = cn.getContext("2d"), im = gm.createImageData(N, N), inn = gn.createImageData(N, N);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const i = y * N + x, h = hgt[i], hx = hgt[y * N + ((x + 1) % N)] - hgt[y * N + ((x - 1 + N) % N)], hy = hgt[((y + 1) % N) * N + x] - hgt[((y - 1 + N) % N) * N + x];
      const v = 200 + h * 55; im.data.set([v, v - 3, v - 8, 255], i * 4);
      let nx = -hx * 2.2, ny = -hy * 2.2, nz = 1; const L = Math.hypot(nx, ny, nz); nx /= L; ny /= L; nz /= L;
      inn.data.set([(nx * 0.5 + 0.5) * 255, (ny * 0.5 + 0.5) * 255, (nz * 0.5 + 0.5) * 255, 255], i * 4);
    }
    gm.putImageData(im, 0, 0); gn.putImageData(inn, 0, 0);
    const mk = (c) => { const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 8; return t; };
    return { map: mk(cm), normal: mk(cn) };
  }

  function create(container, opts) {
    const THREE = window.THREE, U = units(THREE);
    const places = opts.tempat, onStatus = opts.onStatus || (() => {});
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const FOG_MAP = [80, 170], FOG_WALK = [6, 46], FOG_C_MAP = 0x15122a, FOG_C_WALK = 0xe6b98c;
    scene.fog = new THREE.Fog(FOG_C_MAP, FOG_MAP[0], FOG_MAP[1]);
    const camera = new THREE.PerspectiveCamera(36, 1, 0.05, 700);

    const hemi = new THREE.HemisphereLight(0xe6dcff, 0x4a3524, 0.62); scene.add(hemi);
    // Matahari sore dari barat; bayangan mengikuti area yang sedang dilihat
    const SUN_DIR = new THREE.Vector3(-40, 17, 12).normalize();
    const sun = new THREE.DirectionalLight(0xffd3a0, 1.15); scene.add(sun); scene.add(sun.target);
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    sun.shadow.mapSize.set(2048, 2048); sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.03;
    const shCam = sun.shadow.camera; shCam.near = 1; shCam.far = 200;
    let shHalf = 0;
    function updateSun(fx, fz, half) {
      sun.target.position.set(fx, 0, fz); sun.position.set(fx + SUN_DIR.x * 80, SUN_DIR.y * 80, fz + SUN_DIR.z * 80);
      sun.target.updateMatrixWorld();
      if (Math.abs(half - shHalf) > 0.5) { shHalf = half; shCam.left = -half; shCam.right = half; shCam.top = half; shCam.bottom = -half; shCam.updateProjectionMatrix(); }
    }

    // Jalan: jalur bersejarah dari data + gang rekonstruksi yang menyebar dari Ka'bah
    const roads = (opts.jalan || []).map((r) => ({ id: r.id, pts: r.pts, w: r.lebar || 8 }));
    { let s2 = 3; const rr = () => (s2 = (s2 * 16807) % 2147483647) / 2147483647;
      for (let i = 0; i < 10; i++) {
        let a = (i / 10) * Math.PI * 2 + rr() * 0.3; const pts = [];
        for (let r = 34; r < 380; r += 30) { a += (rr() - 0.5) * 0.35; pts.push([Math.cos(a) * r, Math.sin(a) * r]); }
        roads.push({ id: "gang" + i, pts, w: 5, generic: true });
      } }
    const WADI = [[330, 1000], [220, 640], [130, 340], [50, 130], [-5, 0], [-35, -160], [-60, -460], [-85, -860]];
    const segs = [];
    for (const r of roads) for (let k = 0; k < r.pts.length - 1; k++) {
      const [a, b] = r.pts[k], [c, d] = r.pts[k + 1];
      segs.push({ a, b, c, d, w: r.w, g: !!r.generic, x0: Math.min(a, c) - 20, x1: Math.max(a, c) + 20, y0: Math.min(b, d) - 20, y1: Math.max(b, d) + 20 });
    }
    function roadDist(e, n) {
      let best = 1e9, gen = true;
      for (const s of segs) {
        if (e < s.x0 || e > s.x1 || n < s.y0 || n > s.y1) continue;
        const dd = segDist(e, n, s.a, s.b, s.c, s.d) - s.w / 2;
        if (dd < best) { best = dd; gen = s.g; }
      }
      return [best, gen];
    }
    function wadiDist(e, n) { let b = 1e9; for (let k = 0; k < WADI.length - 1; k++) b = Math.min(b, segDist(e, n, ...WADI[k], ...WADI[k + 1])); return b; }

    // Medan (±6,7 m per titik)
    const SIZE = 2200, SEG = 330, HALF = SIZE / 2, OFF_E = 100, OFF_N = 80, ROW = SEG + 1, STEP = SIZE / SEG;
    const geo = new THREE.PlaneGeometry(SIZE / M, SIZE / M, SEG, SEG); geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position, col = new Float32Array(pos.count * 3);
    const hA = new Float32Array(pos.count), mA = new Float32Array(pos.count);
    for (let i = 0; i < pos.count; i++) { const e = pos.getX(i) * M + OFF_E, n = -pos.getZ(i) * M + OFF_N; hA[i] = heightAt(e, n); mA[i] = mountainH(e, n); }
    const cSand = new THREE.Color(0xb08f62), cDust = new THREE.Color(0x92714c), cRock = new THREE.Color(0x5e4536), cDark = new THREE.Color(0x3a2b22),
      cWadi = new THREE.Color(0xcdb388), cRoad = new THREE.Color(0xbfa27a), cGang = new THREE.Color(0xa88a63);
    const tmp = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const e = pos.getX(i) * M + OFF_E, n = -pos.getZ(i) * M + OFF_N, h = hA[i], mh = mA[i];
      pos.setX(i, toX(e)); pos.setZ(i, toZ(n)); pos.setY(i, (h * VX) / M);
      const ix = i % ROW, iy = Math.floor(i / ROW);
      const hx = hA[i + (ix < SEG ? 1 : -1)], hy = hA[i + (iy < SEG ? ROW : -ROW)];
      const slope = Math.hypot(hx - h, hy - h) / STEP;
      const r = fbm(e / 25, n / 25), r2 = fbm(e / 7, n / 7);
      if (mh < 6) tmp.copy(cSand).lerp(cDust, r * 0.7);
      else if (mh < 60) tmp.copy(cDust).lerp(cRock, (mh - 6) / 54 + r * 0.2);
      else tmp.copy(cRock).lerp(cDark, Math.min(1, (mh - 60) / 90 + r * 0.3));
      tmp.lerp(cDark, smooth(0.3, 0.9, slope) * 0.65);                       // tebing curam: batu gelap
      if (mh < 14) {                                                          // dasar Wadi Ibrahim: pasir halus bekas aliran banjir
        const wt = smooth(48, 8, wadiDist(e, n)) * (1 - mh / 14);
        tmp.lerp(cWadi, wt * (0.55 + 0.25 * r2));
      }
      const [rd, gen] = roadDist(e, n);                                       // jalan tanah yang terinjak
      if (rd < 4) tmp.lerp(gen ? cGang : cRoad, smooth(4, -1, rd) * (gen ? 0.35 * smooth(380, 200, Math.hypot(e, n)) : 0.75) * (0.85 + 0.3 * r2));
      tmp.multiplyScalar(0.94 + 0.12 * r2);
      col.set([tmp.r, tmp.g, tmp.b], i * 3);
    }
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3)); geo.computeVertexNormals();
    const groundTex = groundTextures(THREE);
    const terrainMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, map: groundTex.map, normalMap: groundTex.normal, normalScale: new THREE.Vector2(0.9, 0.9) });
    for (const t of [groundTex.map, groundTex.normal]) t.repeat.set(SIZE / 9, SIZE / 9);
    const terrain = new THREE.Mesh(geo, terrainMat); terrain.receiveShadow = true; scene.add(terrain);
    // Medan jauh (±24 m per titik) dari Jabal Tsur di selatan sampai Jabal Nur di utara; di bawah medan dekat
    const FE0 = -1800, FE1 = 5000, FN0 = -6200, FN1 = 5200, FSEG = 280, FSEGN = Math.round((FSEG * (FN1 - FN0)) / (FE1 - FE0));
    const fgeo = new THREE.PlaneGeometry((FE1 - FE0) / M, (FN1 - FN0) / M, FSEG, FSEGN); fgeo.rotateX(-Math.PI / 2);
    const fpos = fgeo.attributes.position, fcol = new Float32Array(fpos.count * 3), FROW = FSEG + 1;
    const NE0 = OFF_E - HALF, NE1 = OFF_E + HALF, NN0 = OFF_N - HALF, NN1 = OFF_N + HALF;
    // Tinggi dihitung sekali per titik; kemiringan diambil dari titik tetangga (lebih hemat daripada memanggil heightAt lagi)
    const fh = new Float32Array(fpos.count), fm = new Float32Array(fpos.count);
    for (let i = 0; i < fpos.count; i++) { const e = fpos.getX(i) * M + (FE0 + FE1) / 2, n = -fpos.getZ(i) * M + (FN0 + FN1) / 2; fm[i] = mountainH(e, n); fh[i] = heightAt(e, n); }
    const FST = (FE1 - FE0) / FSEG;
    for (let i = 0; i < fpos.count; i++) {
      const e = fpos.getX(i) * M + (FE0 + FE1) / 2, n = -fpos.getZ(i) * M + (FN0 + FN1) / 2;
      const h = fh[i], mh = fm[i];
      const inside = Math.min(e - NE0, NE1 - e, n - NN0, NN1 - n);       // >0 di dalam area medan dekat
      const sink = inside > 0 ? smooth(0, 60, inside) * 8 : 0;
      const edge = Math.min(1, Math.min(e - FE0, FE1 - e, n - FN0, FN1 - n) / 150);
      fpos.setX(i, toX(e)); fpos.setZ(i, toZ(n)); fpos.setY(i, (((h - sink) * VX) / M) * edge - (1 - edge) * 1.5);
      const ix = i % FROW, iy = Math.floor(i / FROW);
      const hx = fh[i + (ix < FSEG ? 1 : -1)], hy = fh[i + (iy < FSEGN ? FROW : -FROW)], slope = Math.hypot(hx - h, hy - h) / FST, r = fbm(e / 60, n / 60);
      if (mh < 6) tmp.copy(cSand).lerp(cDust, r * 0.7);
      else if (mh < 60) tmp.copy(cDust).lerp(cRock, (mh - 6) / 54 + r * 0.2);
      else tmp.copy(cRock).lerp(cDark, Math.min(1, (mh - 60) / 90 + r * 0.3));
      tmp.lerp(cDark, smooth(0.3, 0.9, slope) * 0.65);
      const [rd] = roadDist(e, n); if (rd < 6) tmp.lerp(cRoad, smooth(6, -1, rd) * 0.7);
      fcol.set([tmp.r, tmp.g, tmp.b], i * 3);
    }
    fgeo.setAttribute("color", new THREE.BufferAttribute(fcol, 3)); fgeo.computeVertexNormals();
    const farMesh = new THREE.Mesh(fgeo, terrainMat); farMesh.receiveShadow = true; scene.add(farMesh);
    const base = new THREE.Mesh(new THREE.BoxGeometry((FE1 - FE0) / M + 0.6, 1.4, (FN1 - FN0) / M + 0.6), new THREE.MeshStandardMaterial({ color: 0x1a2550, roughness: 0.6, metalness: 0.3 }));
    base.position.set(toX((FE0 + FE1) / 2), -2.2, toZ((FN0 + FN1) / 2)); scene.add(base);

    // Mulut gua (Hira dan Tsur): celah gelap di antara batu besar, menghadap ke arah Mekah
    function addCave([ce, cn], big) {
      const cave = new THREE.Group(), k = big ? 1.5 : 1;
      const gy = Y(ce, cn), ang = Math.atan2(-ce, cn);
      const dark = new THREE.Mesh(new THREE.BoxGeometry((3 * k) / M, (2 * VX) / M, 2.5 / M), new THREE.MeshBasicMaterial({ color: 0x050403 }));
      dark.position.set(0, (1 * VX) / M, 0); cave.add(dark);
      const rm = new THREE.MeshStandardMaterial({ color: 0x4a382b, roughness: 1, flatShading: true });
      for (const [x, y, z, sc] of [[-3, 1.6, 0.5, 2.6], [3.2, 1.4, 0.2, 2.4], [0, 3.6, -0.6, 3], [-1.8, 3, 1.2, 1.6], [2.4, 3.2, 1, 1.8]]) {
        const b = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 0), rm); b.scale.set((sc * k) / M, (sc * 0.8 * VX * k) / M, (sc * k) / M); b.position.set((x * k) / M, (y * VX * k) / M, (z * k) / M); b.castShadow = true; cave.add(b);
      }
      cave.position.set(toX(ce), gy, toZ(cn)); cave.rotation.y = ang; scene.add(cave);
    }
    addCave(HIRA); addCave(GUA_TSUR, true);

    // Bebatuan berserakan di lereng dan sesekali di lembah
    const rocks = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 0), new THREE.MeshStandardMaterial({ roughness: 0.95, flatShading: true }), 2600);
    { let s3 = 5; const rr = () => (s3 = (s3 * 16807) % 2147483647) / 2147483647;
      const m = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), p = new THREE.Vector3(), eu = new THREE.Euler();
      const rc1 = new THREE.Color(0x3e2f26), rc2 = new THREE.Color(0x6e5643); let n = 0;
      for (let k = 0; k < 40000 && n < 2600; k++) {
        const e = -900 + rr() * 2000, nn = -850 + rr() * 1850, mh = mountainH(e, nn), d = Math.hypot(e, nn);
        const pr = mh > 12 ? 0.55 : mh > 4 ? 0.12 : 0.012;
        if (rr() > pr || d < 70 || roadDist(e, nn)[0] < 3) continue;
        const sz = (mh > 12 ? 0.8 + rr() * 3.2 : 0.3 + rr() * 0.9);
        eu.set(rr() * 3, rr() * 3, rr() * 3); q.setFromEuler(eu);
        sc.set((sz * (0.7 + rr() * 0.6)) / M, (sz * 0.55 * VX) / M, (sz * (0.7 + rr() * 0.6)) / M);
        p.set(toX(e), Y(e, nn) - (sz * 0.15 * VX) / M, toZ(nn));
        rocks.setMatrixAt(n, m.compose(p, q, sc)); rocks.setColorAt(n, tmp.copy(rc1).lerp(rc2, rr())); n++;
      }
      rocks.count = n; }
    rocks.castShadow = true; rocks.receiveShadow = true; scene.add(rocks);

    // Langit saat jalan kaki: gradasi senja dan cakram matahari
    const sky = new THREE.Mesh(new THREE.SphereGeometry(300, 32, 16), new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false, fog: false, uniforms: { sunDir: { value: SUN_DIR }, night: { value: 0 }, moonDir: { value: new THREE.Vector3(0.35, 0.55, 0.76).normalize() } },
      vertexShader: "varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader: "uniform vec3 sunDir; uniform float night; uniform vec3 moonDir; varying vec3 vDir;" +
        " float hsh(vec3 p){ return fract(sin(dot(p, vec3(12.9898,78.233,45.164))) * 43758.5453); }" +
        " void main(){ vec3 d = normalize(vDir); float h = d.y;" +
        " vec3 top = vec3(0.24,0.36,0.63), hor = vec3(0.90,0.73,0.55); vec3 c = mix(hor, top, pow(clamp(h,0.0,1.0), 0.5));" +
        " float s = max(dot(d, sunDir), 0.0); c += (vec3(1.0,0.85,0.6) * pow(s, 900.0) * 2.0 + vec3(1.0,0.72,0.45) * pow(s, 10.0) * 0.35) * (1.0 - night);" +
        " vec3 ntop = vec3(0.015,0.03,0.09), nhor = vec3(0.09,0.12,0.24); vec3 nc = mix(nhor, ntop, pow(clamp(h,0.0,1.0), 0.6));" +
        " vec3 g = floor(d * 260.0); float st = step(0.9975, hsh(g)) * smoothstep(0.02, 0.3, h); nc += vec3(1.0,0.96,0.85) * st * (0.6 + 0.4 * hsh(g + 3.1));" +
        " float m1 = dot(d, moonDir), m2 = dot(d, normalize(moonDir + vec3(0.012, 0.006, 0.0)));" +
        " float moon = smoothstep(0.99955, 0.9997, m1) * (1.0 - smoothstep(0.99955, 0.9997, m2)); nc += vec3(1.0,0.95,0.8) * moon * 1.4 + vec3(0.25,0.3,0.45) * pow(max(m1,0.0), 60.0) * 0.25;" +
        " c = mix(c, nc, night); if (h < 0.0) c = mix(hor, nhor, night); gl_FragColor = vec4(c, 1.0); }"
    }));
    sky.renderOrder = -1; sky.visible = false; scene.add(sky);

    // Halaman thawaf: sempit sebelum Umar, lebih luas setelah rumah-rumah di sekitarnya dibeli dan dirobohkan
    const matMataf = new THREE.MeshStandardMaterial({ color: 0xcdb68a, roughness: 0.9 });
    const mataf1 = new THREE.Mesh(new THREE.CircleGeometry(32 / M, 48), matMataf), mataf2 = new THREE.Mesh(new THREE.CircleGeometry(52 / M, 64), matMataf);
    for (const m of [mataf1, mataf2]) { m.rotation.x = -Math.PI / 2; m.position.y = 0.012; m.receiveShadow = true; scene.add(m); }

    // Ka'bah: ±12 x 10 m, tinggi ±9 m (bangunan Quraisy). Pintu ditinggikan (HR. Bukhari 1584).
    const kabah = new THREE.Group(); kabah.rotation.y = -Math.PI / 4;
    const kb = new THREE.Mesh(new THREE.BoxGeometry(12 / M, (9 * VX) / M, 10 / M), new THREE.MeshStandardMaterial({ color: 0x2c2723, roughness: 0.85 }));
    kb.position.y = (4.5 * VX) / M; kabah.add(kb);
    const shd = new THREE.Mesh(new THREE.BoxGeometry(12.8 / M, (0.5 * VX) / M, 10.8 / M), new THREE.MeshStandardMaterial({ color: 0x9a8a72, roughness: 0.9 }));
    shd.position.y = (0.25 * VX) / M; kabah.add(shd);
    const door = new THREE.Mesh(new THREE.BoxGeometry(2 / M, (3 * VX) / M, 0.25 / M), new THREE.MeshStandardMaterial({ color: 0x8a6a2c, metalness: 0.4, roughness: 0.5 }));
    door.position.set(2.5 / M, ((2.2 + 1.5) * VX) / M, -5.08 / M); kabah.add(door);
    const hijrMat = new THREE.MeshStandardMaterial({ color: 0xcdb48a, roughness: 0.9 });
    for (let i = 0, SEGS = 16; i < SEGS; i++) {
      const a0 = -Math.PI / 2 + (Math.PI * i) / SEGS, a1 = -Math.PI / 2 + (Math.PI * (i + 1)) / SEGS;
      const p0 = [-6 - 8 * Math.cos(a0), 5.2 * Math.sin(a0)], p1 = [-6 - 8 * Math.cos(a1), 5.2 * Math.sin(a1)];
      const seg = new THREE.Mesh(new THREE.BoxGeometry((Math.hypot(p1[0] - p0[0], p1[1] - p0[1]) + 0.3) / M, (1.3 * VX) / M, 0.9 / M), hijrMat);
      seg.position.set((p0[0] + p1[0]) / 2 / M, (0.65 * VX) / M, (p0[1] + p1[1]) / 2 / M);
      seg.rotation.y = -Math.atan2(p1[1] - p0[1], p1[0] - p0[0]); kabah.add(seg);
    }
    kabah.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    scene.add(kabah);
    const zam = new THREE.Mesh(new THREE.CylinderGeometry(1.6 / M, 1.6 / M, 1.4 / M, 16), new THREE.MeshStandardMaterial({ color: 0xbfa77d }));
    zam.position.set(toX(18), 0.7 / M, toZ(-8)); scene.add(zam);
    const maq = new THREE.Mesh(new THREE.BoxGeometry(1.2 / M, 1.4 / M, 1.2 / M), new THREE.MeshStandardMaterial({ color: 0xa99068 }));
    maq.position.set(toX(12), 0.7 / M, toZ(9)); scene.add(maq);

    // 360 berhala di sekitar Ka'bah sebelum Fathu Makkah (HR. Bukhari 4287), digambarkan sebagai batu tegak
    const idols = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0), new THREE.MeshStandardMaterial({ roughness: 0.9 }), 360);
    { const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), p = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0); let s = 11;
      const rr = () => (s = (s * 16807) % 2147483647) / 2147483647;
      for (let i = 0; i < 360; i++) {
        const a = (i / 360) * Math.PI * 2 + rr() * 0.02, rad = 17 + (i % 3) * 4 + rr() * 3;
        q.setFromAxisAngle(up, rr() * 3); sc.set((0.45 + rr() * 0.5) / M, ((0.8 + rr() * 1.4) * VX) / M, (0.4 + rr() * 0.4) / M);
        p.set(toX(Math.cos(a) * rad), 0, toZ(Math.sin(a) * rad));
        idols.setMatrixAt(i, m4.compose(p, q, sc)); idols.setColorAt(i, tmp.setHex(0x6f6a62).lerp(new THREE.Color(0x9a8f7c), rr()));
      } }
    idols.castShadow = true; scene.add(idols);

    // Dinding pertama sekeliling Ka'bah oleh Umar: lebih rendah dari tinggi orang, dengan lampu di atasnya
    const umarWall = new THREE.Group();
    { const wm = new THREE.MeshStandardMaterial({ color: 0xc8b48c, roughness: 0.9 }), lm = new THREE.MeshStandardMaterial({ color: 0xffd27a, emissive: 0xffb84a, emissiveIntensity: 0.8 });
      const R = 52, N = 64;
      for (let i = 0; i < N; i++) {
        const a0 = (i / N) * Math.PI * 2, a1 = ((i + 1) / N) * Math.PI * 2, am = (a0 + a1) / 2;
        if (i % 16 === 0) continue; // pintu masuk
        const len = 2 * R * Math.sin(Math.PI / N) + 0.2;
        const w = new THREE.Mesh(new THREE.BoxGeometry(len / M, (1.4 * VX) / M, 0.6 / M), wm);
        w.position.set(toX(Math.cos(am) * R), (0.7 * VX) / M, toZ(Math.sin(am) * R)); w.rotation.y = am + Math.PI / 2; umarWall.add(w);
        if (i % 4 === 2) { const l = new THREE.Mesh(new THREE.BoxGeometry(0.4 / M, (0.5 * VX) / M, 0.4 / M), lm); l.position.copy(w.position); l.position.y += (0.95 * VX) / M; umarWall.add(l); }
      } }
    umarWall.traverse((o) => { if (o.isMesh) o.castShadow = true; });
    scene.add(umarWall);

    // Jalan Mas'a
    const mas = new THREE.Mesh(new THREE.PlaneGeometry(14 / M, 430 / M), new THREE.MeshStandardMaterial({ color: 0xd6bf92, roughness: 1, transparent: true, opacity: 0.55 }));
    mas.rotation.x = -Math.PI / 2; mas.rotation.z = Math.atan2(25, 425); mas.position.set(toX(112), Y(112, 128) + 0.03, toZ(128)); scene.add(mas);

    // ---------- Data rumah ----------
    const named = places.filter((p) => p.jenis === "rumah");
    const masE = (n) => 100 + ((n + 85) / 425) * 25;
    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const WALLS = [0xc8a679, 0xbba78b, 0xb79a72, 0xd6c9b0, 0xa98a66];
    const houses = [];
    for (let k = 0; k < 12000 && houses.length < 760; k++) {
      const e = -560 + rnd() * 1300, n = -520 + rnd() * 1300, d = Math.hypot(e, n);
      if (d < 34 || rnd() > Math.exp(-d / 520)) continue;
      if (n > -95 && n < 350 && Math.abs(e - masE(n)) < 13) continue;
      if (mountainH(e, n) > 28) continue;
      const h0 = heightAt(e, n), sl = Math.abs(heightAt(e + 8, n) - h0) + Math.abs(heightAt(e, n + 8) - h0);
      if (sl > 3.2) continue;
      if (named.some((p) => Math.hypot(p.e - e, p.n - n) < 24)) continue;
      if (Math.hypot(e - 18, n + 8) < 10) continue;
      if (houses.some((q) => Math.abs(q.e - e) < 12 && Math.abs(q.n - n) < 12)) continue;
      const w = 6 + rnd() * 5, l = 6 + rnd() * 4, court = rnd() < 0.35 ? 3.5 + rnd() * 2.5 : 0;
      if (roadDist(e, n)[0] < Math.hypot(w, l + court) / 2 + 1) continue;
      let t = Math.atan2(-e, n) + (rnd() - 0.5) * 0.6; if (rnd() < 0.3) t += rnd() < 0.5 ? Math.PI / 2 : -Math.PI / 2;
      houses.push({ e, n, w, l, h: 2.8 + rnd() * 2.4, t, g: h0, col: WALLS[Math.floor(rnd() * WALLS.length)], court, upper: rnd() < 0.22, jar: rnd() < 0.4,
        seed: 1 + Math.floor(rnd() * 1e6), umar: d < 56 });
    }
    // Kotak jauh (instanced), ukurannya sama dengan tapak rumah detail agar pergantian tidak mencolok
    const hGeo = new THREE.BoxGeometry(1, 1, 1); hGeo.translate(0, 0.5, 0);
    const inst = new THREE.InstancedMesh(hGeo, new THREE.MeshStandardMaterial({ roughness: 0.95 }), houses.length);
    const m4 = new THREE.Matrix4(), qq = new THREE.Quaternion(), s3 = new THREE.Vector3(), p3 = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0), ZERO = new THREE.Matrix4().makeScale(0, 0, 0);
    const baseM = houses.map((hh, i) => {
      qq.setFromAxisAngle(up, hh.t); s3.set(hh.w / M, (hh.h * VX) / M, hh.l / M); p3.set(toX(hh.e), (hh.g * VX) / M - 0.02, toZ(hh.n));
      const m = new THREE.Matrix4().compose(p3, qq, s3); inst.setColorAt(i, tmp.setHex(hh.col)); return m;
    });
    inst.castShadow = true; inst.receiveShadow = true; scene.add(inst);

    // Sel streaming
    const cells = new Map();
    houses.forEach((hh, i) => {
      const key = Math.floor(hh.e / CELL) + "," + Math.floor(hh.n / CELL);
      if (!cells.has(key)) cells.set(key, { key, ids: [], ce: (Math.floor(hh.e / CELL) + 0.5) * CELL, cn: (Math.floor(hh.n / CELL) + 0.5) * CELL });
      cells.get(key).ids.push(i);
    });
    const tex = plasterTexture(THREE);
    const detailMat = new THREE.MeshStandardMaterial({ vertexColors: true, map: tex, roughness: 0.95 });
    const built = new Map();
    let year = 610;
    const removed = (hh) => hh.umar && year >= 638;
    const instVisible = new Array(houses.length).fill(true);
    function refreshInstances() {
      houses.forEach((hh, i) => {
        const cellKey = Math.floor(hh.e / CELL) + "," + Math.floor(hh.n / CELL);
        const show = !removed(hh) && !built.has(cellKey);
        inst.setMatrixAt(i, show ? baseM[i] : ZERO); instVisible[i] = show;
      });
      inst.instanceMatrix.needsUpdate = true;
    }
    function buildCell(cell) {
      const acc = Acc();
      for (const i of cell.ids) if (!removed(houses[i])) genHouse(acc, U, houses[i]);
      const mesh = new THREE.Mesh(toGeometry(THREE, acc), detailMat);
      mesh.castShadow = true; mesh.receiveShadow = true; scene.add(mesh);
      built.set(cell.key, { mesh, last: performance.now() });
      for (const i of cell.ids) { inst.setMatrixAt(i, ZERO); }
      inst.instanceMatrix.needsUpdate = true;
    }
    function dropCell(key) {
      const b = built.get(key); if (!b) return;
      scene.remove(b.mesh); b.mesh.geometry.dispose(); built.delete(key);
      for (const i of cells.get(key).ids) if (!removed(houses[i])) inst.setMatrixAt(i, baseM[i]);
      inst.instanceMatrix.needsUpdate = true;
    }

    // Rumah bernama: selalu detail, materialnya sendiri agar bisa menyala
    const KCOL = { pasti: 0xd9b45a, kitab: 0x6cc4ae, perkiraan: 0xd08f7c };
    const markers = {}, colliders = [];
    places.forEach((p, idx) => {
      const x = toX(p.e), z = toZ(p.n);
      let topY, mat = null;
      if (p.jenis === "rumah") {
        const big = p.id === "nadwah";
        const hh = { e: p.e, n: p.n, w: big ? 24 : p.besar ? 18 : 13, l: big ? 18 : p.besar ? 14 : 11, h: big ? 6 : p.besar ? 4.8 : 4.2,
          t: Math.atan2(-p.e, p.n), g: heightAt(p.e, p.n), col: 0xd9c6a0, court: p.besar && !big ? 6 : 0, upper: !!p.besar, jar: true, seed: 100 + idx };
        const acc = Acc(); genHouse(acc, U, hh);
        mat = new THREE.MeshStandardMaterial({ vertexColors: true, map: tex, roughness: 0.9, emissive: KCOL[p.keyakinan], emissiveIntensity: 0 });
        const nm = new THREE.Mesh(toGeometry(THREE, acc), mat); nm.castShadow = true; nm.receiveShadow = true; scene.add(nm);
        colliders.push(hh);
        topY = ((hh.g + hh.h) * VX) / M;
      } else if (p.jenis === "kabah") topY = (9 * VX) / M;
      else if (p.jenis === "gunung") topY = Y(p.e, p.n) + 0.3;
      else topY = Y(p.e, p.n) + 0.05;
      const flat = p.jenis === "gunung" || p.jenis === "jalan";
      const g = new THREE.Group(), show = !flat && p.jenis !== "kawasan";
      const pm = new THREE.MeshBasicMaterial({ color: KCOL[p.keyakinan] });
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1, 6), pm), gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.06, 0), pm);
      const ringM = new THREE.MeshBasicMaterial({ color: KCOL[p.keyakinan], transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false });
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.22, 36), ringM); ring.rotation.x = -Math.PI / 2;
      if (show) g.add(pole, gem);
      if (!flat) g.add(ring);
      g.position.set(x, topY, z); scene.add(g);
      ring.position.y = (p.jenis === "rumah" ? -(topY - Y(p.e, p.n)) : 0) + 0.03;
      markers[p.id] = { p, g, pole, gem, ring, ringM, mat, h: 0.35, show, topY };
    });
    colliders.push({ e: 0, n: 0, w: 12.6, l: 10.6, t: -Math.PI / 4, court: 0 }); // Ka'bah

    // Grid tabrakan
    const GRID = 30, grid = new Map();
    function rebuildGrid() {
      grid.clear();
      const add = (c) => {
        const r = Math.hypot(c.w, c.l + (c.court || 0)) / 2 + 2;
        for (let gx = Math.floor((c.e - r) / GRID); gx <= Math.floor((c.e + r) / GRID); gx++)
          for (let gy = Math.floor((c.n - r) / GRID); gy <= Math.floor((c.n + r) / GRID); gy++) {
            const k = gx + "," + gy; if (!grid.has(k)) grid.set(k, []); grid.get(k).push(c);
          }
      };
      houses.forEach((hh) => !removed(hh) && add(hh)); colliders.forEach(add);
    }
    function blocked(e, n, rad = 1) {
      const list = grid.get(Math.floor(e / GRID) + "," + Math.floor(n / GRID)); if (!list) return false;
      for (const c of list) {
        const dx = e - c.e, dn = n - c.n, ct = Math.cos(c.t), st = Math.sin(c.t);
        const lx = dx * ct + dn * st, lz = dx * st - dn * ct;
        if (Math.abs(lx) < c.w / 2 + rad && lz > -c.l / 2 - rad && lz < c.l / 2 + (c.court || 0) + rad) {
          // halaman: hanya dindingnya yang menghalangi, bagian dalam bisa dimasuki lewat gerbang (disederhanakan: halaman bisa dilalui)
          if (lz > c.l / 2 + rad && c.court) continue;
          return true;
        }
      }
      return false;
    }

    function setYear(y) {
      const before = year >= 638, beforeIdol = year < 630; year = y;
      idols.visible = y < 630; umarWall.visible = y >= 638; mataf1.visible = y < 638; mataf2.visible = y >= 638;
      if (before !== y >= 638 || beforeIdol !== y < 630) { for (const k of [...built.keys()]) dropCell(k); rebuildGrid(); }
      refreshInstances();
    }

    // ---------- Kamera: mode peta (orbit) dan mode jalan kaki ----------
    const st = { az: -0.55, el: 0.82, dist: 34, target: new THREE.Vector3(toX(90), 0, toZ(90)) };
    const goal = { az: st.az, el: st.el, dist: st.dist, target: st.target.clone() };
    const walk = { on: false, e: 0, n: 0, yaw: 0, pitch: -0.05 };
    const keys = new Set();
    const el = renderer.domElement;
    // Mode peta: seret kiri = geser. Klik kanan / Shift / Ctrl + seret = putar & miringkan.
    const clampT = (t) => { t.x = Math.max(-85, Math.min(245, t.x)); t.z = Math.max(-255, Math.min(305, t.z)); };
    function panBy(dx, dy) {
      const k = (2 * st.dist * Math.tan((camera.fov * Math.PI) / 360)) / Math.max(1, container.clientHeight);
      const ca = Math.cos(st.az), sa = Math.sin(st.az), ky = k / Math.max(0.45, Math.sin(st.el));
      goal.target.x += -ca * dx * k - sa * dy * ky; goal.target.z += sa * dx * k - ca * dy * ky;
      clampT(goal.target); st.target.x = goal.target.x; st.target.z = goal.target.z;
    }
    window.SirahGestures({ THREE, el, camera, st, goal, minD: 2.2, maxD: 90, clamp: clampT, panBy,
      isWalk: () => walk.on, locked: () => story.on,
      look: (dx, dy) => { walk.yaw += dx * 0.0042; walk.pitch = Math.max(-1.2, Math.min(1.1, walk.pitch - dy * 0.0035)); },
      rotate: (dx, dy) => { goal.az -= dx * 0.005; goal.el = Math.max(0.25, Math.min(1.45, goal.el + dy * 0.004)); } });
    const typing = (t) => t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable);
    const MOVE_KEYS = ["w", "a", "s", "d", "q", "e", "arrowup", "arrowdown", "arrowleft", "arrowright", "shift"];
    const kd = (e) => { if (typing(e.target)) return; const k = e.key.toLowerCase(); if (MOVE_KEYS.includes(k)) { keys.add(k); if (k.startsWith("arrow")) e.preventDefault(); } };
    const ku = (e) => keys.delete(e.key.toLowerCase());
    const blur = () => keys.clear();
    window.addEventListener("keydown", kd); window.addEventListener("keyup", ku); window.addEventListener("blur", blur);

    function startWalk(id) {
      const p = id && places.find((x) => x.id === id);
      let te = p ? p.e : goal.target.x * M, tn = p ? p.n : -goal.target.z * M;
      if (!p) { te = Math.max(-500, Math.min(700, te)); tn = Math.max(-500, Math.min(750, tn)); }
      const back = Math.hypot(te, tn) > 1 ? Math.atan2(tn, te) : -Math.PI / 4;
      let found = null;
      for (let r = p && p.jenis === "rumah" ? 26 : 30; r < 160 && !found; r += 6)
        for (let a = 0; a < 12 && !found; a++) {
          const ang = back + Math.PI + (a % 2 ? 1 : -1) * Math.ceil(a / 2) * 0.35;
          const e = te + Math.cos(ang) * r, n = tn + Math.sin(ang) * r;
          if (!blocked(e, n, 3)) found = [e, n];
        }
      if (!found) found = [30, -30];
      walk.e = found[0]; walk.n = found[1]; walk.yaw = Math.atan2(te - walk.e, tn - walk.n); walk.pitch = 0.08; walk.on = true;
      camera.near = 0.01; camera.updateProjectionMatrix(); scene.fog.near = FOG_WALK[0]; scene.fog.far = FOG_WALK[1]; scene.fog.color.setHex(FOG_C_WALK); sky.visible = true;
    }
    function stopWalk() {
      if (!walk.on) return;
      walk.on = false; camera.near = 0.05; camera.updateProjectionMatrix(); scene.fog.near = FOG_MAP[0]; scene.fog.far = FOG_MAP[1]; scene.fog.color.setHex(FOG_C_MAP); sky.visible = false;
      goal.target.set(toX(walk.e), Y(walk.e, walk.n), toZ(walk.n)); goal.dist = 9; goal.az = -walk.yaw; goal.el = 0.7;
      st.target.copy(goal.target); st.dist = 3; st.az = goal.az; st.el = 0.4;
    }

    function resize() { const w = container.clientWidth, h = container.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
    const ro = new ResizeObserver(resize); ro.observe(container); resize();

    const labels = {}; const v = new THREE.Vector3();
    const frustum = new THREE.Frustum(), pm4 = new THREE.Matrix4(), sphere = new THREE.Sphere();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let active = new Set(), selected = null, raf, t0 = performance.now(), last = t0, lastTick = 0;
    const DIRS = ["utara", "timur laut", "timur", "tenggara", "selatan", "barat daya", "barat", "barat laut"];
    // sudut kompas: 0 = utara, searah jarum jam
    const dirName = (ang) => DIRS[((Math.round(ang / (Math.PI / 4)) % 8) + 8) % 8];

    function stream(now) {
      if (now - lastTick < 200) return; lastTick = now;
      const fe = walk.on ? walk.e : st.target.x * M, fn = walk.on ? walk.n : -st.target.z * M;
      const R = walk.on ? 170 : st.dist < 14 ? 150 : 0;
      pm4.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse); frustum.setFromProjectionMatrix(pm4);
      const want = [];
      if (R > 0) for (const cell of cells.values()) {
        const d = Math.hypot(cell.ce - fe, cell.cn - fn); if (d > R + 45) continue;
        sphere.center.set(toX(cell.ce), Y(cell.ce, cell.cn), toZ(cell.cn)); sphere.radius = 48 / M;
        if (d < 55 || frustum.intersectsSphere(sphere)) want.push([d, cell]);
      }
      const wantKeys = new Set(want.map(([, c]) => c.key));
      for (const [k, b] of built) { if (wantKeys.has(k)) b.last = now; else if (now - b.last > 1500) dropCell(k); }
      want.sort((a, b) => a[0] - b[0]);
      let budget = 2;
      for (const [, c] of want) { if (budget <= 0) break; if (!built.has(c.key)) { buildCell(c); budget--; } }
      let detail = 0; for (const k of built.keys()) detail += cells.get(k).ids.length;
      let near = null;
      if (walk.on) for (const p of places) {
        if (p.jenis === "gunung" || p.jenis === "jalan") continue;
        const d = Math.hypot(p.e - walk.e, p.n - walk.n) - (p.jenis === "kawasan" ? 90 : p.jenis === "rumah" ? 8 : 0);
        if (d < 45 && (!near || d < near.dist)) near = { id: p.id, dist: Math.max(0, Math.round(d)) };
      }
      const kdist = Math.hypot(walk.e, walk.n);
      onStatus({ walking: walk.on, detail, cells: built.size, near, facing: walk.on ? dirName(walk.yaw) : null,
        kabah: walk.on ? { dist: Math.round(kdist), dir: dirName(Math.atan2(-walk.e, -walk.n)) } : null });
    }

    function frame(now) {
      const t = (now - t0) / 1000, dtR = Math.min(0.3, (now - last) / 1000), dt = Math.min(0.05, dtR); last = now;
      const run = keys.has("shift") ? 3 : 1;
      if (walk.on) {
        const f = (keys.has("w") || keys.has("arrowup") ? 1 : 0) - (keys.has("s") || keys.has("arrowdown") ? 1 : 0);
        const sd = (keys.has("d") ? 1 : 0) - (keys.has("a") ? 1 : 0);
        walk.yaw += ((keys.has("arrowright") || keys.has("e") ? 1 : 0) - (keys.has("arrowleft") || keys.has("q") ? 1 : 0)) * dt * 1.6;
        if (f || sd) {
          const sp = 7 * run * dt, se = Math.sin(walk.yaw), cn = Math.cos(walk.yaw);
          const de = (se * f + cn * sd) * sp, dn = (cn * f - se * sd) * sp;
          const ne = Math.max(-1700, Math.min(4900, walk.e + de)), nn = Math.max(-6100, Math.min(5100, walk.n + dn));
          if (!blocked(ne, nn)) { walk.e = ne; walk.n = nn; } else if (!blocked(ne, walk.n)) walk.e = ne; else if (!blocked(walk.e, nn)) walk.n = nn;
        }
        const eyeY = ((heightAt(walk.e, walk.n) + 1.7) * VX) / M;
        camera.position.set(toX(walk.e), eyeY, toZ(walk.n));
        const cp = Math.cos(walk.pitch);
        camera.lookAt(camera.position.x + Math.sin(walk.yaw) * cp, eyeY + Math.sin(walk.pitch), camera.position.z - Math.cos(walk.yaw) * cp);
      } else {
        const fx = -Math.sin(st.az), fz = -Math.cos(st.az), rx = Math.cos(st.az), rz = -Math.sin(st.az);
        const f = (keys.has("w") || keys.has("arrowup") ? 1 : 0) - (keys.has("s") || keys.has("arrowdown") ? 1 : 0);
        const sd = (keys.has("d") || keys.has("arrowright") ? 1 : 0) - (keys.has("a") || keys.has("arrowleft") ? 1 : 0);
        const sp = goal.dist * 0.9 * dt * run;
        goal.target.x += (fx * f + rx * sd) * sp; goal.target.z += (fz * f + rz * sd) * sp;
        goal.az += ((keys.has("e") ? 1 : 0) - (keys.has("q") ? 1 : 0)) * dt * 1.4;
        if (story.on) storyCamera(now); else { clampT(goal.target); const gy = Y(goal.target.x * M, -goal.target.z * M); goal.target.y = Math.max(gy * 0.6, gy - 2.5); }
        // pelunakan berbasis waktu agar sama cepat di laptop lambat maupun cepat
        const k = reduce ? 1 : 1 - Math.exp(-dtR * (story.on ? 2.4 : 5));
        if (story.on) { let da = goal.az - st.az; da = Math.atan2(Math.sin(da), Math.cos(da)); st.az += da * (1 - Math.exp(-dtR * 1.6)); } else st.az += (goal.az - st.az) * k; st.el += (goal.el - st.el) * k; st.dist += (goal.dist - st.dist) * (reduce ? 1 : 1 - Math.exp(-dtR * (story.on ? 2.4 : 11))); st.target.lerp(goal.target, k);
        camera.position.set(st.target.x + st.dist * Math.cos(st.el) * Math.sin(st.az), st.target.y + st.dist * Math.sin(st.el), st.target.z + st.dist * Math.cos(st.el) * Math.cos(st.az));
        { const cg = Y(camera.position.x * M, -camera.position.z * M) + 0.5; if (camera.position.y < cg) camera.position.y = cg; } // jangan masuk ke dalam gunung (Jabal Nur, Jabal Tsur)
        camera.lookAt(st.target);
      }
      camera.updateMatrixWorld();
      if (!walk.on) { scene.fog.near = st.dist * 2.4; scene.fog.far = st.dist * 6 + 40; }
      storyFrame(now, dtR);
      if (walk.on) { sky.position.copy(camera.position); updateSun(toX(walk.e), toZ(walk.n), 11); }
      else updateSun(st.target.x, st.target.z, Math.max(6, Math.min(34, st.dist * 0.95)));
      stream(now);

      const lodMax = st.dist < 9 ? 2 : st.dist < 48 ? 1 : 0;
      const W = container.clientWidth, H = container.clientHeight;
      for (const id in markers) {
        const m = markers[id], act = active.has(id), sel = id === selected;
        const scl = walk.on ? 0.3 : Math.min(1.6, Math.max(0.5, st.dist / 22));
        const want = (act || sel ? 0.75 : 0.32) * scl;
        m.h += (want - m.h) * 0.12;
        m.pole.scale.y = m.h; m.pole.position.y = m.h / 2; m.gem.position.y = m.h + 0.03; m.gem.rotation.y = t * (act ? 1.4 : 0.3);
        const sc = walk.on ? 0.25 : Math.max(0.4, st.dist / 22);
        m.gem.scale.setScalar(sc * (sel ? 1.5 : 1));
        const ph = reduce ? 0.5 : (t * 0.7) % 1;
        m.ring.scale.setScalar(sc * (act || sel ? 1 + ph * (m.p.jenis === "kawasan" ? 6 : 2.2) : 1));
        m.ringM.opacity = act || sel ? (1 - ph) * 0.8 : 0;
        if (m.mat) m.mat.emissiveIntensity = (walk.on ? 0.3 : 1) * (sel ? 0.25 : act ? 0.14 + 0.06 * Math.sin(t * 3) : 0);
        const lab = labels[id];
        if (lab) {
          let vis;
          if (walk.on) { const d = Math.hypot(m.p.e - walk.e, m.p.n - walk.n); vis = m.p.jenis === "gunung" || m.p.jenis === "kawasan" ? d < 900 : m.p.jenis === "jalan" ? d < 200 : d < 320; }
          else vis = sel || m.p.lod <= lodMax || (act && m.p.lod <= lodMax + 1);
          v.set(m.g.position.x, m.g.position.y + (m.show ? m.h + 0.12 : 0.1), m.g.position.z).project(camera);
          lab.style.transform = `translate(${((v.x * 0.5 + 0.5) * W).toFixed(1)}px, ${((-v.y * 0.5 + 0.5) * H).toFixed(1)}px)`;
          lab.style.visibility = v.z < 1 && v.z > -1 && vis ? "visible" : "hidden";
          lab.style.zIndex = String(sel ? 99999 : Math.round((1 - v.z) * 10000));
        }
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }

    // ---------- Mode cerita: aktor, malam, kamera ----------
    function glowTexture(stops) {
      const c = document.createElement("canvas"); c.width = c.height = 128; const g = c.getContext("2d");
      const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64); stops.forEach(([o, col]) => gr.addColorStop(o, col)); g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(c);
    }
    function raysTexture() {
      const c = document.createElement("canvas"); c.width = c.height = 256; const g = c.getContext("2d"); g.translate(128, 128);
      for (let i = 0; i < 18; i++) { g.rotate((Math.PI * 2) / 18); const gr = g.createLinearGradient(0, 0, 0, -128); gr.addColorStop(0, "rgba(255,244,200,.9)"); gr.addColorStop(1, "rgba(255,244,200,0)"); g.fillStyle = gr; g.fillRect(-3, -128, 6, 128); }
      return new THREE.CanvasTexture(c);
    }
    const orb = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture([[0, "rgba(255,250,225,1)"], [0.25, "rgba(255,226,150,.75)"], [1, "rgba(255,210,120,0)"]]), blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false, transparent: true }));
    const jib = new THREE.Group();
    const jibGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture([[0, "rgba(255,255,255,1)"], [0.2, "rgba(255,246,206,.9)"], [0.55, "rgba(255,226,140,.3)"], [1, "rgba(255,226,140,0)"]]), blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false, transparent: true }));
    const jibRays = new THREE.Sprite(new THREE.SpriteMaterial({ map: raysTexture(), blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false, transparent: true }));
    jib.add(jibGlow, jibRays);
    const lampA = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture([[0, "rgba(255,214,140,.9)"], [1, "rgba(255,180,80,0)"]]), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
    const lampB = lampA.clone();
    for (const o of [orb, jib, lampA, lampB]) { o.visible = false; o.renderOrder = 5; scene.add(o); }
    const story = { on: false, actors: {}, nodes: new Map(), cam: null, night: 0, nightGoal: 0, lamps: [] };
    const cDay = { hemi: new THREE.Color(0xe6dcff), ground: new THREE.Color(0x4a3524), sun: new THREE.Color(0xffd3a0), fog: new THREE.Color(FOG_C_MAP) };
    const cNight = { hemi: new THREE.Color(0x7d90c8), ground: new THREE.Color(0x1a1410), sun: new THREE.Color(0xa8bcff), fog: new THREE.Color(0x141c40) };
    function samplePath(P, t) {
      if (!P.len) { P.len = [0]; for (let i = 1; i < P.pts.length; i++) P.len.push(P.len[i - 1] + Math.hypot(P.pts[i][0] - P.pts[i - 1][0], P.pts[i][1] - P.pts[i - 1][1])); }
      const L = P.len[P.len.length - 1], d = Math.max(0, Math.min(1, t)) * L;
      let i = 1; while (i < P.len.length - 1 && P.len[i] < d) i++;
      const a = P.pts[i - 1], b = P.pts[i], seg = P.len[i] - P.len[i - 1] || 1, k = (d - P.len[i - 1]) / seg;
      return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, (b[0] - a[0]) / seg, (b[1] - a[1]) / seg];
    }
    const ease = (k) => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
    function actorWorld(a, out) { out.set(toX(a.e), ((heightAt(a.e, a.n) + (a.up || 0)) * VX) / M, toZ(a.n)); return out; }
    const tv = new THREE.Vector3();
    function storyCamera() {
      const c = story.cam; if (!c) return;
      const a = c.follow && story.actors[c.follow];
      const e = a ? a.e : c.at[0], n = a ? a.n : c.at[1];
      goal.target.set(toX(e), ((heightAt(e, n) + (c.up || 3)) * VX) / M, toZ(n));
      goal.dist = c.dist; goal.el = c.el;
      if (c.az === "behind" && a && a.dir) goal.az = Math.atan2(-a.dir[0], a.dir[1]);
      else if (typeof c.az === "number") goal.az = c.az;
    }
    function storyFrame(now, dt) {
      if (Math.abs(story.night - story.nightGoal) > 0.001) {
        story.night += (story.nightGoal - story.night) * Math.min(1, dt * 1.5);
        const k = story.night;
        hemi.color.copy(cDay.hemi).lerp(cNight.hemi, k); hemi.groundColor.copy(cDay.ground).lerp(cNight.ground, k); hemi.intensity = 0.62 - 0.3 * k;
        sun.color.copy(cDay.sun).lerp(cNight.sun, k); sun.intensity = 1.15 - 0.55 * k;
        if (!walk.on) scene.fog.color.copy(cDay.fog).lerp(cNight.fog, k);
        sky.material.uniforms.night.value = k;
      }
      sky.visible = walk.on || story.night > 0.02;
      if (sky.visible) sky.position.copy(camera.position);
      if (!story.on) return;
      const camD = camera.position.distanceTo(st.target);
      for (const id in story.actors) {
        const a = story.actors[id];
        if (a.anim) {
          const k = Math.min(1, (now - a.anim.t0) / a.anim.dur), s = samplePath(a.anim.P, a.anim.from + (a.anim.to - a.anim.from) * ease(k));
          a.e = s[0]; a.n = s[1]; a.dir = a.anim.to >= a.anim.from ? [s[2], s[3]] : [-s[2], -s[3]];
          if (k >= 1) a.anim = null;
        }
        if (a.goal) { const g = a.goal, kk = Math.min(1, dt * 2.2); a.e += (g.e - a.e) * kk; a.n += (g.n - a.n) * kk; a.up += (g.up - a.up) * kk; a.power += (g.power - a.power) * kk; }
      }
      const r = story.actors.rasul;
      orb.visible = !!(r && r.vis);
      if (orb.visible) { actorWorld(r, orb.position); orb.position.y += (1.2 * VX) / M; orb.scale.setScalar(Math.max(0.12, camD * 0.075)); }
      const j = story.actors.jibril;
      jib.visible = !!(j && j.power > 0.02);
      if (jib.visible) {
        actorWorld(j, jib.position);
        const sz = Math.max(0.25, camD * 0.09) * (0.5 + j.power * 1.1) * (1 + 0.05 * Math.sin(now / 300));
        jibGlow.scale.setScalar(sz); jibRays.scale.setScalar(sz * 1.3); jibRays.material.rotation = now / 4000; jibRays.material.opacity = j.power; jibGlow.material.opacity = Math.min(1, j.power * 1.2);
      }
      story.lamps.forEach((l, i) => { const s = [lampA, lampB][i]; s.visible = story.night > 0.3; s.position.set(toX(l[0]), ((heightAt(l[0], l[1]) + 2) * VX) / M, toZ(l[1])); s.scale.setScalar(Math.max(0.15, camD * 0.03) * (0.9 + 0.1 * Math.sin(now / 130 + i))); });
      const Wc = container.clientWidth, Hc = container.clientHeight;
      for (const [node, o] of story.nodes) {
        const a = story.actors[o.actor];
        if (!a || (a.vis === false && o.actor !== "jibril")) { node.style.visibility = "hidden"; continue; }
        actorWorld(a, tv); tv.y += ((o.dy || 0) * VX) / M; tv.project(camera);
        const vis = tv.z < 1 && tv.z > -1;
        node.style.visibility = vis ? "visible" : "hidden";
        if (o.scale) node.style.setProperty("--s", Math.max(0.35, Math.min(1, 2 / camD)).toFixed(3));
        node.style.transform = `translate(${((tv.x * 0.5 + 0.5) * Wc).toFixed(1)}px, ${((-tv.y * 0.5 + 0.5) * Hc).toFixed(1)}px)`;
        node.style.zIndex = String(Math.round((1 - tv.z) * 10000));
      }
    }
    const storyApi = {
      begin({ lamps, malam } = {}) {
        if (walk.on) stopWalk();
        story.on = true; story.nightGoal = malam ?? 1; story.lamps = lamps || []; story.actors = {};
        for (const id in markers) markers[id].g.visible = false;
        renderer.domElement.classList.add("story");
      },
      end() {
        story.on = false; story.nightGoal = 0; story.cam = null; story.actors = {}; orb.visible = false; jib.visible = false; lampA.visible = lampB.visible = false;
        for (const id in markers) markers[id].g.visible = true;
        renderer.domElement.classList.remove("story");
      },
      actor(id, o) { const a = story.actors[id] || (story.actors[id] = { e: 0, n: 0, up: 0, power: 0, vis: true }); Object.assign(a, o); a.anim = null; a.goal = null; },
      move(id, pts, from, to, dur) { const a = story.actors[id]; if (!a) return; a.goal = null; a.anim = { P: { pts }, from, to, t0: performance.now(), dur }; },
      glide(id, o) { const a = story.actors[id]; if (!a) return; a.anim = null; a.goal = { e: o.e ?? a.e, n: o.n ?? a.n, up: o.up ?? a.up, power: o.power ?? a.power }; },
      camera(c) { story.cam = c; },
      night(v) { story.nightGoal = v; },
      node(el, o) { if (o) story.nodes.set(el, o); else story.nodes.delete(el); },
      heightAt
    };

    rebuildGrid(); setYear(opts.year || 610);
    renderer.shadowMap.enabled = opts.quality !== false; sun.castShadow = opts.quality !== false; rocks.visible = opts.quality !== false;
    if (opts.quality === false) terrainMat.normalMap = null;
    raf = requestAnimationFrame(frame);

    return {
      registerLabel(id, node) { if (node) labels[id] = node; else delete labels[id]; },
      setActive(ids) { active = ids; },
      setYear,
      select(id) {
        selected = id;
        const m = id && markers[id];
        if (!m || walk.on) return;
        goal.target.set(m.g.position.x, Math.max(0, m.topY * 0.5), m.g.position.z);
        goal.dist = Math.min(goal.dist, m.p.jenis === "gunung" || m.p.jenis === "kawasan" ? 28 : m.p.lod === 2 ? 5 : 10);
      },
      overview() { selected = null; if (walk.on) return; goal.target.set(toX(90), 0, toZ(90)); goal.dist = 34; goal.el = 0.82; },
      rotate(d) { if (walk.on) walk.yaw += d; else goal.az += d; },
      zoom(f) { if (!walk.on) goal.dist = Math.max(2.2, Math.min(90, goal.dist * f)); },
      startWalk, stopWalk, story: storyApi,
      setQuality(high) {
        renderer.shadowMap.enabled = high; sun.castShadow = high; rocks.visible = high;
        terrainMat.normalMap = high ? groundTex.normal : null;
        scene.traverse((o) => { if (o.material) o.material.needsUpdate = true; });
      },
      press(k, on) { if (on) keys.add(k); else keys.delete(k); },
      dispose() {
        cancelAnimationFrame(raf); ro.disconnect();
        window.removeEventListener("keydown", kd); window.removeEventListener("keyup", ku); window.removeEventListener("blur", blur);
        for (const k of [...built.keys()]) dropCell(k);
        renderer.dispose(); el.remove();
      }
    };
  }
  window.MekahScene = { create };
})();
