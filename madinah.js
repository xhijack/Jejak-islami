// Madinah (Yatsrib) 3D sekitar masa Nabi ﷺ. 1 unit = 20 m. x = timur, -z = utara. Titik (0,0) = Raudhah Masjid Nabawi.
// Medan berlapis: satu medan kasar (50 m per titik) untuk seluruh wilayah Quba sampai Uhud, ditambah beberapa petak detail
// (10–12,5 m) di kota lama, Quba/'Awali, depan Uhud, dan jalur Khandaq. Petak detail tepat menempel pada garis grid medan kasar
// sehingga tidak ada celah; titik medan kasar di dalam petak diturunkan agar tertutup.
// Rumah dari jauh: kotak (instanced). Rumah dekat: model detail per sel 60 m (streaming), seperti peta Mekah.
// API sama dengan window.MekahScene (city.js) sehingga komponen peta dan mode cerita bisa memakai keduanya.
// DRAF: bentuk bangunan adalah rekonstruksi umum, bukan hasil arkeologi.
(function () {
  const M = 20, VX = 1.3; // meter per unit, eksagerasi vertikal
  const CELL = 60;
  const toX = (e) => e / M, toZ = (n) => -n / M;

  function hash(x, y) { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); }
  // hash bilangan bulat untuk noise medan (jauh lebih cepat daripada sin)
  function ihash(x, y) { let h = (Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263)) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; }
  function vnoise(x, y) {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const a = ihash(xi, yi), b = ihash(xi + 1, yi), c = ihash(xi, yi + 1), d = ihash(xi + 1, yi + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  function fbm(x, y, oct = 5) { let s = 0, a = 0.5, f = 1, t = 0; for (let i = 0; i < oct; i++) { s += a * vnoise(x * f, y * f); t += a; f *= 2.03; a *= 0.5; } return (s / t) * 0.96875; }
  function ridged(x, y, oct = 4) { let s = 0, a = 0.55, f = 1; for (let i = 0; i < oct; i++) { const v = 1 - Math.abs(2 * vnoise(x * f + i * 7.3, y * f) - 1); s += a * v * v; f *= 2.1; a *= 0.5; } return s; }
  function segDist(px, py, ax, ay, bx, by) {
    const dx = bx - ax, dy = by - ay;
    const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy || 1)));
    return Math.hypot(px - ax - t * dx, py - ay - t * dy);
  }
  const smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

  // ---------- Geometri bantu: poligon dan polyline ----------
  function bboxOf(pts, pad) {
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const [x, y] of pts) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    return { x0: x0 - pad, x1: x1 + pad, y0: y0 - pad, y1: y1 + pad };
  }
  function polyInfo(pts, pad = 300) { return { pts, bb: bboxOf(pts, pad) }; }
  function inPoly(pts, x, y) {
    let c = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const [xi, yi] = pts[i], [xj, yj] = pts[j];
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
    }
    return c;
  }
  // Jarak bertanda ke tepi poligon: + di dalam, - di luar (dibatasi pad)
  function polySigned(P, x, y) {
    const b = P.bb; if (x < b.x0 || x > b.x1 || y < b.y0 || y > b.y1) return -1e4;
    let d = Infinity; const p = P.pts;
    for (let i = 0, j = p.length - 1; i < p.length; j = i++) d = Math.min(d, segDist(x, y, p[j][0], p[j][1], p[i][0], p[i][1]));
    return inPoly(p, x, y) ? d : -d;
  }
  function lineInfo(pts, pad) { return { pts, bb: bboxOf(pts, pad) }; }
  function lineDist(L, x, y) {
    const b = L.bb; if (x < b.x0 || x > b.x1 || y < b.y0 || y > b.y1) return 1e4;
    let d = Infinity; const p = L.pts;
    for (let k = 0; k < p.length - 1; k++) d = Math.min(d, segDist(x, y, p[k][0], p[k][1], p[k + 1][0], p[k + 1][1]));
    return d;
  }

  // ---------- Pembangun geometri gabungan ----------
  let UNIT = null;
  function prismGeo() {
    // prisma segitiga: alas y=0 (x -0.5..0.5), puncak y=1, memanjang z -0.5..0.5
    const P = [], N = [];
    const tri = (a, b, c) => {
      const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx; const L = Math.hypot(nx, ny, nz) || 1; nx /= L; ny /= L; nz /= L;
      for (const v of [a, b, c]) { P.push(...v); N.push(nx, ny, nz); }
    };
    const A = [-0.5, 0, 0.5], B = [0.5, 0, 0.5], C = [0, 1, 0.5], A2 = [-0.5, 0, -0.5], B2 = [0.5, 0, -0.5], C2 = [0, 1, -0.5];
    tri(A, B, C); tri(B2, A2, C2);           // ujung depan & belakang
    tri(B, B2, C2); tri(B, C2, C);           // sisi kanan
    tri(A2, A, C); tri(A2, C, C2);           // sisi kiri
    tri(A, A2, B2); tri(A, B2, B);           // alas
    return { p: new Float32Array(P), n: new Float32Array(N) };
  }
  function units(THREE) {
    if (UNIT) return UNIT;
    const g1 = new THREE.BoxGeometry(1, 1, 1).toNonIndexed(), g2 = new THREE.CylinderGeometry(0.42, 0.5, 1, 9).toNonIndexed();
    const g3 = new THREE.CylinderGeometry(0.5, 0.5, 1, 7).toNonIndexed();
    UNIT = { box: { p: g1.attributes.position.array, n: g1.attributes.normal.array }, cyl: { p: g2.attributes.position.array, n: g2.attributes.normal.array },
      col: { p: g3.attributes.position.array, n: g3.attributes.normal.array }, prism: prismGeo() };
    return UNIT;
  }
  function Acc() { return { p: [], n: [], c: [], uv: [] }; }
  // Tambah satu bagian ke akumulator. Koordinat lokal (meter): x lebar, y naik, z ke depan (pintu). H.t = arah hadap.
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

  const C = { stone: 0x8c7660, wood: 0x5a3f2c, door: 0x4a3424, dark: 0x2a211b, straw: 0xa8915f, clay: 0x9c6a45, palm: 0x6b5434,
    fort: 0x8a7a66, fortDark: 0x6e604f, cloth: [0x8a3b2e, 0x3d4a6e, 0xa8823e, 0x6b6e3a, 0x7a5a6e, 0xc9b89a], dates: 0x7a3e22 };
  const shade = (c, k) => (Math.round(Math.min(255, ((c >> 16) & 255) * k)) << 16) | (Math.round(Math.min(255, ((c >> 8) & 255) * k)) << 8) | Math.round(Math.min(255, (c & 255) * k));

  // Rumah Madinah abad ke-7 (rekonstruksi umum): bata lumpur di atas fondasi batu, atap datar dari batang dan pelepah kurma
  // berlapis tanah, sebagian berhalaman dengan naungan pelepah ('arisy), sebagian punya kamar atas.
  function genHouse(acc, U, h) {
    const W = h.w, L = h.l, Ht = h.h, wall = h.col, pc = shade(wall, 0.88);
    let s = h.seed; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
    const B = (sx, sy, sz, ox, oy, oz, col, ry = 0) => part(acc, U.box, sx, sy, sz, ox, oy, oz, ry, col, h);
    B(W + 0.4, 2, L + 0.4, 0, -0.5, 0, C.stone);
    B(W, Ht, L, 0, Ht / 2, 0, wall);
    B(W, 0.45, 0.3, 0, Ht + 0.22, L / 2 - 0.15, pc); B(W, 0.45, 0.3, 0, Ht + 0.22, -L / 2 + 0.15, pc);
    B(0.3, 0.45, L - 0.6, W / 2 - 0.15, Ht + 0.22, 0, pc); B(0.3, 0.45, L - 0.6, -W / 2 + 0.15, Ht + 0.22, 0, pc);
    B(W - 0.5, 0.08, L - 0.5, 0, Ht + 0.04, 0, C.straw);
    const nb = Math.max(3, Math.floor(W / 1.1));
    for (let i = 0; i < nb; i++) {
      const x = -W / 2 + ((i + 0.5) * W) / nb;
      B(0.17, 0.17, 0.5, x, Ht - 0.35, L / 2 + 0.2, C.palm); B(0.17, 0.17, 0.5, x, Ht - 0.35, -L / 2 - 0.2, C.palm);
    }
    const dx = (r() - 0.5) * Math.max(0, W - 2.6);
    B(1.0, 1.9, 0.14, dx, 0.95, L / 2 + 0.05, C.door);
    B(1.5, 0.2, 0.3, dx, 2.0, L / 2 + 0.1, C.wood);
    B(1.3, 0.2, 0.6, dx, 0.1, L / 2 + 0.4, C.stone);
    const nw = 1 + Math.floor(r() * 2);
    for (let i = 0; i < nw; i++) {
      let x = -W / 2 + 1 + r() * (W - 2); if (Math.abs(x - dx) < 1.2) x = dx + (x < dx ? -1.4 : 1.4);
      B(0.5, 0.42, 0.08, Math.max(-W / 2 + 0.5, Math.min(W / 2 - 0.5, x)), Ht - 1.1, L / 2 + 0.03, C.dark);
    }
    if (W > 5) B(0.08, 0.42, 0.5, W / 2 + 0.03, Ht - 1.1, (r() - 0.5) * (L - 2), C.dark);
    B(0.14, 0.12, 0.8, W / 2 - 0.7, Ht + 0.1, L / 2 + 0.4, C.wood);
    if (h.court) {
      const Cd = h.court, ch = 1.9;
      B(0.4, ch, Cd, -W / 2 + 0.2, ch / 2, L / 2 + Cd / 2, wall); B(0.4, ch, Cd, W / 2 - 0.2, ch / 2, L / 2 + Cd / 2, wall);
      const gw = 1.5, gx = Math.max(-W / 2 + 1.4, Math.min(W / 2 - 1.4, dx + (r() - 0.5) * 2));
      const left = gx - gw / 2 + W / 2, right = W / 2 - (gx + gw / 2);
      if (left > 0.2) B(left, ch, 0.4, -W / 2 + left / 2, ch / 2, L / 2 + Cd - 0.2, wall);
      if (right > 0.2) B(right, ch, 0.4, W / 2 - right / 2, ch / 2, L / 2 + Cd - 0.2, wall);
      const aw = Math.min(3.8, W - 1.4), ad = Math.min(2.6, Cd - 1), ax = (r() < 0.5 ? -1 : 1) * (W / 2 - 0.6 - aw / 2), az = L / 2 + 0.3 + ad / 2;
      for (const [px, pz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) B(0.14, 2.3, 0.14, ax + (px * aw) / 2, 1.15, az + (pz * ad) / 2, C.palm);
      B(aw + 0.4, 0.14, ad + 0.4, ax, 2.36, az, C.straw);
      part(acc, U.cyl, 0.6, 0.75, 0.6, -ax * 0.6, 0.37, L / 2 + Cd - 1, 0, C.clay, h);
    } else if (h.jar) part(acc, U.cyl, 0.6, 0.75, 0.6, dx + 1, 0.37, L / 2 + 0.45, 0, C.clay, h);
    if (h.upper) {
      const uw = W * 0.45, ul = L * 0.5, uh = 2.6, ux = W / 2 - uw / 2 - 0.3, uz = -L / 2 + ul / 2 + 0.3;
      B(uw, uh, ul, ux, Ht + uh / 2, uz, wall); B(uw + 0.25, 0.35, ul + 0.25, ux, Ht + uh + 0.17, uz, pc);
      B(0.8, 1.6, 0.1, ux - uw / 4, Ht + 0.8, uz + ul / 2 + 0.05, C.door);
      for (let i = 0; i < 3; i++) B(0.15, 0.15, 0.4, ux - uw / 2 + ((i + 0.5) * uw) / 3, Ht + uh - 0.3, uz + ul / 2 + 0.15, C.palm);
    }
  }

  // Utum/atam: menara benteng batu dua-tiga lantai, tempat berlindung dan menyimpan hasil kebun
  function genTower(acc, U, h) {
    const W = h.w, L = h.l, Ht = h.h, col = h.col || C.fort, dk = shade(col, 0.82);
    let s = h.seed; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
    const B = (sx, sy, sz, ox, oy, oz, c) => part(acc, U.box, sx, sy, sz, ox, oy, oz, 0, c, h);
    B(W + 0.8, 2.4, L + 0.8, 0, -0.6, 0, C.stone);
    const h1 = Ht * 0.62, h2 = Ht - h1;
    B(W, h1, L, 0, h1 / 2, 0, col);
    B(W * 0.9, h2, L * 0.9, 0, h1 + h2 / 2, 0, shade(col, 1.04));
    B(W + 0.15, 0.3, L + 0.15, 0, h1, 0, dk);                          // garis lantai
    const tw = W * 0.9, tl = L * 0.9, top = Ht;
    const nm = Math.max(3, Math.round(tw / 1.4));
    for (let i = 0; i < nm; i++) {                                     // gigi benteng
      const x = -tw / 2 + ((i + 0.5) * tw) / nm;
      B(0.7, 0.8, 0.45, x, top + 0.4, tl / 2 - 0.22, col); B(0.7, 0.8, 0.45, x, top + 0.4, -tl / 2 + 0.22, col);
    }
    for (let i = 0; i < nm; i++) {
      const z = -tl / 2 + ((i + 0.5) * tl) / nm;
      B(0.45, 0.8, 0.7, tw / 2 - 0.22, top + 0.4, z, col); B(0.45, 0.8, 0.7, -tw / 2 + 0.22, top + 0.4, z, col);
    }
    B(tw - 0.6, 0.1, tl - 0.6, 0, top + 0.05, 0, C.straw);
    B(1.0, 1.7, 0.16, (r() - 0.5) * (W - 2.5), 0.85, L / 2 + 0.05, C.door);
    for (let k = 0; k < 3; k++) {                                       // lubang intai kecil
      B(0.25, 0.55, 0.08, (r() - 0.5) * (W - 1.5), h1 + 1.2 + r() * (h2 - 2), L * 0.45 + 0.03, C.dark);
      B(0.08, 0.55, 0.25, W * 0.45 + 0.03, h1 + 1.2 + r() * (h2 - 2), (r() - 0.5) * (L - 1.5), C.dark);
    }
    if (h.awning) {                                                     // naungan kain di atap selama berpenghuni
      for (const [px, pz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) B(0.12, 1.8, 0.12, (px * tw) / 4, top + 0.9, (pz * tl) / 4, C.palm);
      B(tw / 2 + 0.5, 0.08, tl / 2 + 0.5, 0, top + 1.85, 0, C.cloth[h.seed % C.cloth.length]);
    }
  }

  // Masjid sederhana: dinding bata lumpur (atau batu pada perluasan Utsman), tiang batang kurma, atap pelepah di sisi kiblat.
  // Koordinat lokal dengan H.t = 0: x = timur, z = selatan.
  function genMasjid(acc, U, H, o) {
    const W = o.w, L = o.l, T = o.thick || 0.7, h = o.ht, wall = o.wall, base = shade(o.stone ? o.wall : C.stone, o.stone ? 0.85 : 1);
    const B = (sx, sy, sz, ox, oy, oz, c) => part(acc, U.box, sx, sy, sz, ox, oy, oz, 0, c, H);
    const cols = o.colliders;
    const piece = (sx, sz, ox, oz) => {
      B(sx, h, sz, ox, h / 2, oz, wall); B(sx + 0.25, 0.6, sz + 0.25, ox, 0.1, oz, base);
      B(sx + 0.1, 0.25, sz + 0.1, ox, h + 0.12, oz, shade(wall, 0.9));
      if (o.stone) B(sx + 0.06, 0.28, sz + 0.06, ox, h - 0.75, oz, shade(wall, 0.78)); // pita ukiran
      if (cols) cols.push({ e: H.e + ox, n: H.n - oz, w: sx, l: sz, t: 0, court: 0 });
    };
    const DW = o.doorW || 2.4;
    const wallX = (z, gap) => {                    // dinding memanjang timur-barat
      if (gap == null) { piece(W, T, 0, z); return; }
      const a = gap - DW / 2 + W / 2, b = W / 2 - (gap + DW / 2);
      if (a > 0.3) piece(a, T, -W / 2 + a / 2, z); if (b > 0.3) piece(b, T, W / 2 - b / 2, z);
    };
    const wallZ = (x, gap) => {                    // dinding memanjang utara-selatan
      const Lz = L - 2 * T;
      if (gap == null) { piece(T, Lz, x, 0); return; }
      const a = gap - DW / 2 + Lz / 2, b = Lz / 2 - (gap + DW / 2);
      if (a > 0.3) piece(T, a, x, -Lz / 2 + a / 2); if (b > 0.3) piece(T, b, x, Lz / 2 - b / 2);
    };
    const d = o.doors || {};
    wallX(-L / 2 + T / 2, d.n); wallX(L / 2 - T / 2, d.s); wallZ(W / 2 - T / 2, d.e); wallZ(-W / 2 + T / 2, d.w);
    B(W - 2 * T, 0.1, L - 2 * T, 0, 0.06, 0, o.floor);
    for (const z of o.roofs || []) {               // atap dan tiang
      const z0 = z[0], z1 = z[1], depth = z1 - z0, zc = (z0 + z1) / 2;
      B(W - 2 * T + 0.2, 0.32, depth, 0, h - 0.06, zc, o.roof);
      B(W - 2 * T + 0.2, 0.12, 0.5, 0, h - 0.32, z0 < 0 ? z1 - 0.2 : z0 + 0.2, shade(o.roof, 0.8));   // tepi pelepah menjuntai
      const nx = Math.max(2, Math.round((W - 2 * T) / (o.span || 3.6))), nz = Math.max(1, Math.round(depth / 3.4));
      const inner = Math.abs(z0) < Math.abs(z1) ? z0 : z1, dir = inner === z0 ? 1 : -1;   // baris tiang dari tepi dalam atap ke arah dinding
      for (let ix = 0; ix < nx - 1; ix++) for (let iz = 0; iz < nz; iz++) {
        const x = -W / 2 + T + ((ix + 1) * (W - 2 * T)) / nx, pz = inner + dir * (iz * depth) / nz + dir * 0.3;
        part(acc, o.stone ? U.col : U.cyl, o.pillarR * 2, h - 0.2, o.pillarR * 2, x, (h - 0.2) / 2, pz, 0, o.pillar, H);
      }
      for (let iz = 0; iz <= nz; iz++) B(W - 2 * T, 0.18, 0.22, 0, h - 0.33, z0 + (iz * depth) / nz, o.stone ? shade(o.roof, 0.85) : C.palm); // balok
    }
    if (o.mimbar) {                                 // mimbar tiga anak tangga
      const [mx, mz] = o.mimbar, dir = o.kiblat === "selatan" ? -1 : 1;
      B(0.9, 0.35, 0.7, mx, 0.17, mz + dir * 0.7, C.wood); B(0.9, 0.7, 0.7, mx, 0.35, mz, C.wood); B(0.9, 1.05, 0.7, mx, 0.52, mz - dir * 0.7, C.wood);
      B(0.08, 0.9, 2.1, mx - 0.45, 0.9, mz, C.wood); B(0.08, 0.9, 2.1, mx + 0.45, 0.9, mz, C.wood);
    }
  }

  function genWell(acc, U, H) {
    const B = (sx, sy, sz, ox, oy, oz, c) => part(acc, U.box, sx, sy, sz, ox, oy, oz, 0, c, H);
    part(acc, U.col, 3, 0.95, 3, 0, 0.47, 0, 0, 0xa18c6e, H);
    part(acc, U.col, 2.2, 0.06, 2.2, 0, 0.96, 0, 0, 0x1d2a2e, H);
    B(0.2, 2.6, 0.2, -1.35, 1.3, 0, C.wood); B(0.2, 2.6, 0.2, 1.35, 1.3, 0, C.wood);
    B(2.9, 0.18, 0.18, 0, 2.55, 0, C.wood); part(acc, U.col, 0.5, 0.18, 0.5, 0, 2.3, 0, Math.PI / 2, C.wood, H);
    B(2.4, 0.45, 0.7, 0, 0.22, 2.4, 0x8f7a5e); B(2.2, 0.06, 0.5, 0, 0.44, 2.4, 0x283a3e);
    part(acc, U.cyl, 0.5, 0.5, 0.5, 1.1, 1.2, 0.1, 0, C.clay, H);
  }

  // Naungan terbuka (saqifah): tiang dan atap pelepah tanpa dinding
  function genShelter(acc, U, H, w, l) {
    const B = (sx, sy, sz, ox, oy, oz, c) => part(acc, U.box, sx, sy, sz, ox, oy, oz, 0, c, H);
    B(w + 1, 0.3, l + 1, 0, 0.05, 0, C.stone);
    for (let x = -w / 2; x <= w / 2 + 0.01; x += w / 4) for (let z = -l / 2; z <= l / 2 + 0.01; z += l / 3) part(acc, U.cyl, 0.45, 3.2, 0.45, x, 1.6, z, 0, C.palm, H);
    B(w + 0.6, 0.35, l + 0.6, 0, 3.3, 0, C.straw);
    for (let z = -l / 2; z <= l / 2 + 0.01; z += l / 3) B(w + 0.3, 0.2, 0.25, 0, 3.05, z, C.palm);
    B(w * 0.5, 1.6, 0.4, -w * 0.25, 0.8, -l / 2, 0xb08a5e);              // dinding rendah di satu sisi
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

  function groundTextures(THREE) {
    const N = 256, hgt = new Float32Array(N * N);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const u = x / N, v = y / N;
      let hv = 0, a = 0.5, f = 8;
      for (let o = 0; o < 4; o++) {
        const X = u * f, Yv = v * f, xi = Math.floor(X), yi = Math.floor(Yv), xf = X - xi, yf = Yv - yi;
        const g = (i, j) => hash(((xi + i) % f + f) % f + o * 37, ((yi + j) % f + f) % f);
        const sx = xf * xf * (3 - 2 * xf), sy = yf * yf * (3 - 2 * yf);
        hv += a * (g(0, 0) + (g(1, 0) - g(0, 0)) * sx + (g(0, 1) - g(0, 0)) * sy + (g(0, 0) - g(1, 0) - g(0, 1) + g(1, 1)) * sx * sy);
        a *= 0.5; f *= 2;
      }
      hgt[y * N + x] = hv + (hash(x, y) - 0.5) * 0.18;
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

  // Grid medan sendiri (indeks iy naik ke utara) dengan interpolasi yang sama persis dengan triangulasinya
  function makeGrid(e0, n0, nx, ny, step) { return { e0, n0, nx, ny, step, e1: e0 + nx * step, n1: n0 + ny * step, H: new Float32Array((nx + 1) * (ny + 1)) }; }
  function gridInterp(G, A, e, n) {
    const fx = (e - G.e0) / G.step, fy = (n - G.n0) / G.step;
    const ix = clamp(Math.floor(fx), 0, G.nx - 1), iy = clamp(Math.floor(fy), 0, G.ny - 1);
    const u = clamp(fx - ix, 0, 1), v = clamp(fy - iy, 0, 1), R = G.nx + 1, a = iy * R + ix;
    const hA = A[a], hB = A[a + 1], hC = A[a + R + 1], hD = A[a + R];
    return u >= v ? hA + (hB - hA) * u + (hC - hB) * v : hA + (hC - hD) * u + (hD - hA) * v;
  }
  function gridIndex(G) {
    const R = G.nx + 1, idx = new Uint32Array(G.nx * G.ny * 6); let k = 0;
    for (let iy = 0; iy < G.ny; iy++) for (let ix = 0; ix < G.nx; ix++) {
      const a = iy * R + ix, b = a + 1, c = a + R + 1, d = a + R;
      idx[k++] = a; idx[k++] = b; idx[k++] = c; idx[k++] = a; idx[k++] = c; idx[k++] = d;
    }
    return idx;
  }

  function create(container, opts) {
    const THREE = window.THREE, U = units(THREE);
    const MD = window.MADINAH || {};
    const places = opts.tempat || MD.tempat || [], medan = opts.medan || MD.medan || {}, jalanData = opts.jalan || MD.jalan || [];
    const onStatus = opts.onStatus || (() => {});
    const byId = Object.fromEntries(places.map((p) => [p.id, p]));
    const aliveAt = (p, y) => !p.ada || (y >= p.ada[0] && y <= p.ada[1]);
    // benteng Yahudi tetap berdiri setelah penghuninya diusir; yang berubah hanya tanda berpenghuni
    const alive = (p, y) => p.jenis === "benteng" || aliveAt(p, y);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const FOG_MAP = [80, 170], FOG_WALK = [8, 60], FOG_C_MAP = 0x15122a, FOG_C_WALK = 0xe6b98c;
    scene.fog = new THREE.Fog(FOG_C_MAP, FOG_MAP[0], FOG_MAP[1]);
    const camera = new THREE.PerspectiveCamera(36, 1, 0.05, 2400);

    const hemi = new THREE.HemisphereLight(0xe6dcff, 0x4a3524, 0.62); scene.add(hemi);
    const SUN_DIR = new THREE.Vector3(-40, 17, 12).normalize();
    const sun = new THREE.DirectionalLight(0xffd3a0, 1.15); scene.add(sun); scene.add(sun.target);
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    sun.shadow.mapSize.set(2048, 2048); sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.03;
    const shCam = sun.shadow.camera; shCam.near = 1; shCam.far = 220;
    let shHalf = 0;
    function updateSun(fx, fz, half) {
      sun.target.position.set(fx, 0, fz); sun.position.set(fx + SUN_DIR.x * 90, SUN_DIR.y * 90, fz + SUN_DIR.z * 90);
      sun.target.updateMatrixWorld();
      if (Math.abs(half - shHalf) > 0.5) { shHalf = half; shCam.left = -half; shCam.right = half; shCam.top = half; shCam.bottom = -half; shCam.updateProjectionMatrix(); }
    }
    let year = opts.year || 622;
    const T0 = performance.now(), timing = {}; const mark = (k) => (timing[k] = Math.round(performance.now() - T0));

    // ---------- Fitur medan dari data ----------
    const HAR = (medan.harrah || []).map((h) => polyInfo(h.poly, 300));
    const KEB = (medan.kebun || []).map((k) => ({ ...polyInfo(k.poly, 120), rapat: k.rapat ?? 0.5, id: k.id }));
    const WAD = (medan.wadi || []).map((w) => ({ ...lineInfo(w.pts, (w.lebar || 60) / 2 + 60), lebar: w.lebar || 60, id: w.id }));
    const MTN = (medan.gunung || []).map((g) => {
      const half = g.ridge ? (g.lebar || g.r * 2) / 2 : g.r;
      const reach = g.ridge ? half * 1.35 + 40 : g.r * 1.7 + 30;
      const pts = g.ridge ? g.ridge : [[g.e, g.n]];
      return { ...g, half, bb: bboxOf(pts, reach), uhud: g.id === "uhud", ayr: g.id === "ayr" };
    });
    const KHD = medan.khandaq && medan.khandaq.pts ? { ...lineInfo(medan.khandaq.pts, 120), t: medan.khandaq.t || [627, 627], lebar: medan.khandaq.lebar || 9, dalam: medan.khandaq.dalam || 4.5 } : null;
    const trenchOn = () => !!KHD && year >= KHD.t[0] && year <= KHD.t[1];

    // Jalan: data + lorong rekonstruksi di tiap perkampungan
    const roads = jalanData.map((r) => ({ id: r.id, pts: r.pts, w: r.lebar || 6 }));
    const SEEDS = [];
    const SEED_CFG = { "bani-najjar": [300, 170, 4], "bani-saidah": [230, 95, 3], "bani-abdulasyhal": [220, 80, 3], "bani-salimah": [260, 85, 3],
      "bani-haritsah": [260, 80, 3], "bani-amr-auf": [300, 115, 4] };
    places.forEach((p) => {
      if (p.jenis === "kawasan" && SEED_CFG[p.id]) { const [r, n, tw] = SEED_CFG[p.id]; SEEDS.push({ id: p.id, e: p.e, n: p.n, r, count: n, towers: tw }); }
      if (p.jenis === "benteng") SEEDS.push({ id: p.id, e: p.e, n: p.n, r: p.besar ? 270 : 160, count: p.besar ? 95 : 40, towers: p.besar ? 4 : 2, yahudi: true, p });
    });
    // Perkampungan lain (rekonstruksi tanpa nama di peta): Bani Zuraiq, Bani Salim, Bani Zhafar, Bani Bayadhah, dan kampung di selatan Quba
    [[-330, -560, 190, 55, 2], [470, -2330, 210, 55, 2], [1020, -420, 190, 45, 2], [-950, -950, 210, 45, 2], [950, -3750, 200, 45, 2], [-150, 1050, 170, 35, 2]]
      .forEach(([e, n, r, c, tw], i) => SEEDS.push({ id: "kampung" + i, e, n, r, count: c, towers: tw }));
    { let s2 = 3; const rr = () => (s2 = (s2 * 16807) % 2147483647) / 2147483647;
      SEEDS.forEach((sd, si) => {
        const nl = 4 + Math.floor(rr() * 3);
        for (let i = 0; i < nl; i++) {
          let a = (i / nl) * Math.PI * 2 + rr() * 0.6; const pts = [[sd.e, sd.n]];
          for (let r = 30; r < sd.r * 1.05; r += 28) { a += (rr() - 0.5) * 0.4; pts.push([sd.e + Math.cos(a) * r, sd.n + Math.sin(a) * r]); }
          roads.push({ id: "lorong" + si + "-" + i, pts, w: 4, generic: true });
        }
      }); }
    const segs = [];
    for (const r of roads) for (let k = 0; k < r.pts.length - 1; k++) {
      const [a, b] = r.pts[k], [c, d] = r.pts[k + 1];
      segs.push({ a, b, c, d, w: r.w, g: !!r.generic, x0: Math.min(a, c) - 20, x1: Math.max(a, c) + 20, y0: Math.min(b, d) - 20, y1: Math.max(b, d) + 20 });
    }
    // indeks grid kasar untuk ruas jalan agar pencarian cepat
    const SEGG = 200, segGrid = new Map();
    segs.forEach((s) => {
      for (let gx = Math.floor(s.x0 / SEGG); gx <= Math.floor(s.x1 / SEGG); gx++) for (let gy = Math.floor(s.y0 / SEGG); gy <= Math.floor(s.y1 / SEGG); gy++) {
        const k = gx + "," + gy; if (!segGrid.has(k)) segGrid.set(k, []); segGrid.get(k).push(s);
      }
    });
    function roadDist(e, n) {
      let best = 1e9, gen = true; const list = segGrid.get(Math.floor(e / SEGG) + "," + Math.floor(n / SEGG)); if (!list) return [best, gen];
      for (const s of list) {
        if (e < s.x0 || e > s.x1 || n < s.y0 || n > s.y1) continue;
        const dd = segDist(e, n, s.a, s.b, s.c, s.d) - s.w / 2;
        if (dd < best) { best = dd; gen = s.g; }
      }
      return [best, gen];
    }
    // Lapangan terbuka yang terinjak (pasar, tempat shalat Id) dan halaman masjid
    const OPEN = places.filter((p) => p.jenis === "pasar" || p.id === "musalla").map((p) => [p.e, p.n, p.jenis === "pasar" ? 75 : 60]);

    function harrahW(e, n) {
      let w = 0;
      for (const P of HAR) { let d = polySigned(P, e, n); if (d < -260) continue; d += (fbm(e / 160, n / 160, 3) - 0.5) * 220; if (d > -40) w = Math.max(w, smooth(-25, 70, d)); }
      return w;
    }
    function kebunW(e, n) {
      let w = 0, r = 0;
      for (const P of KEB) { let d = polySigned(P, e, n); if (d < -160) continue; d += (fbm(e / 140 + 9, n / 140, 3) - 0.5) * 160; if (d > -40) { const k = smooth(-30, 70, d); if (k > w) { w = k; r = P.rapat; } } }
      return [w, r];
    }
    function wadiW(e, n) {
      let bed = 0, depth = 0;
      for (const W of WAD) {
        const d = lineDist(W, e, n), half = W.lebar / 2; if (d > half + 60) continue;
        const b = smooth(half + 35, half * 0.45, d); if (b > bed) bed = b;
        depth = Math.max(depth, b * (W.lebar >= 100 ? 3.2 : 1.8));
      }
      return [bed, depth];
    }
    function mountains(e, n) {
      let h = 0, uh = 0;
      for (const g of MTN) {
        const b = g.bb; if (e < b.x0 || e > b.x1 || n < b.y0 || n > b.y1) continue;
        let q, taper = 1;
        if (g.ridge) {
          const [a, c] = g.ridge, dx = c[0] - a[0], dy = c[1] - a[1], L2 = dx * dx + dy * dy || 1;
          const t = ((e - a[0]) * dx + (n - a[1]) * dy) / L2, tc = clamp(t, 0, 1);
          q = Math.hypot(e - a[0] - tc * dx, n - a[1] - tc * dy) / g.half;
          taper = smooth(-0.16, 0.1, t) * smooth(1.16, 0.9, t);
        } else q = Math.hypot(e - g.e, n - g.n) / g.r;
        const qq = q / (g.uhud ? 1.25 : 1.35); if (qq >= 1) continue;
        const base = (g.uhud ? Math.pow(1 - qq * qq, 1.15) * (0.55 + 0.45 * smooth(1, 0.35, qq)) : Math.pow(1 - qq * qq, 1.8)) * taper; if (base <= 0) continue;
        const vari = 0.7 + 0.6 * fbm(e / 420 + g.n * 0.001, n / 420, 3);
        const crag = g.uhud ? 0.7 * ridged(e / 260, n / 260) + 0.45 * ridged(e / 85 + 5, n / 85) : ridged(e / 140, n / 140);
        const hh = g.h * base * vari + (g.uhud ? 105 : g.h * 0.25) * crag * base * (g.uhud ? 1 : base);
        h += hh; if (g.uhud || g.ayr) uh += hh;
      }
      return [h, uh];
    }
    // Sampel medan lengkap (m di atas dataran). fine 0..1 = bobot detail halus (hanya di petak detail)
    function sample(e, n, fine) {
      let h = -0.0036 * n + (fbm(e / 1100 + 3, n / 1100, 3) - 0.5) * 7;
      const hw = harrahW(e, n);
      if (hw > 0) h += hw * (5 + 7 * fbm(e / 600, n / 600, 3)) + hw * (9 * ridged(e / 260, n / 260, 3) + 3.5 * ridged(e / 85 + 3, n / 85, 2) + fine * 1.4 * vnoise(e / 22, n / 22));
      const [mt, uh] = mountains(e, n); h += mt;
      const [bed, wd] = wadiW(e, n); h -= wd * (1 - smooth(4, 30, mt)) * (1 - hw * 0.7);
      if (fine > 0) h += fine * (fbm(e / 40, n / 40, 3) - 0.5) * 1.6 * (1 - hw * 0.5);
      // pelataran bangunan bernama diratakan agar lantai dan fondasi tidak tertembus medan
      if (FLAT.ready) for (const F of FLAT) {
        const d = Math.hypot(e - F.e, n - F.n); if (d > F.r + 30) continue;
        const f = smooth(F.r + 30, F.r, d); h = h * (1 - f) + F.h * f;
      }
      return { h, hw, mt, uh, bed };
    }
    const FLAT = [];
    places.forEach((p) => {
      const r = p.id === "masjid-nabawi" ? 70 : p.jenis === "masjid" ? (p.besar ? 26 : 16) : p.jenis === "benteng" ? 46 : p.jenis === "pasar" ? 70 : p.id === "baqi" ? 85
        : p.jenis === "rumah" ? 12 : p.jenis === "sumur" ? 6 : p.jenis === "makam" ? 24 : 0;
      if (r) FLAT.push({ e: p.id === "masjid-nabawi" ? -14 : p.e, n: p.id === "masjid-nabawi" ? 20 : p.n, r });
    });
    FLAT.forEach((F) => (F.h = sample(F.e, F.n, 0).h));
    FLAT.ready = true;
    const cSoil = new THREE.Color(0xb39267), cDust = new THREE.Color(0x9a7a52), cCult = new THREE.Color(0x6a5536), cField = new THREE.Color(0x727b38),
      cSand = new THREE.Color(0xd2bc92), cBas1 = new THREE.Color(0x2a2522), cBas2 = new THREE.Color(0x463a31), cGran1 = new THREE.Color(0x8e5b43), cGran2 = new THREE.Color(0x6a4131),
      cRock = new THREE.Color(0x7a6650), cCrev = new THREE.Color(0x3a2820), cRoad = new THREE.Color(0xc6a97e), cGang = new THREE.Color(0xa98b64), cOpen = new THREE.Color(0xc8b08a);
    const tmp = new THREE.Color(), tmp2 = new THREE.Color();
    const cCanopy = new THREE.Color(0x46532a), cRust = new THREE.Color(0x5a4232), cWeath = new THREE.Color(0x6b5c4a), cGranHi = new THREE.Color(0xa87458), cPlain2 = new THREE.Color(0xa3855c);
    function colorAt(e, n, s, slope, out, res = 12.5) {
      const r = fbm(e / 30, n / 30, 3), r2 = fbm(e / 7, n / 7, 2);
      out.copy(cSoil).lerp(cDust, r * 0.7).lerp(cPlain2, smooth(0.45, 0.7, fbm(e / 400 + 2, n / 400, 3)) * 0.5);
      const [kw, rap] = kebunW(e, n);
      if (kw > 0) {
        out.lerp(cCult, kw * (0.55 + 0.3 * rap));
        const f = smooth(0.5, 0.62, fbm(e / 60 + 7.7, n / 60, 3)) * kw; out.lerp(cField, f * 0.75);
        // dari jauh tajuk kurma yang rapat tampak sebagai bercak hijau gelap
        out.lerp(cCanopy, kw * rap * 0.6 * smooth(0.35, 0.65, fbm(e / 22 + 1.3, n / 22, 2)));
      }
      if (s.bed > 0) out.lerp(cSand, s.bed * 0.8 * (1 - kw * 0.4));
      for (const [oe, on, orad] of OPEN) { const d = Math.hypot(e - oe, n - on); if (d < orad + 20) out.lerp(cOpen, smooth(orad + 20, orad * 0.6, d) * 0.6); }
      if (s.hw > 0) {
        tmp2.copy(cBas1).lerp(cBas2, fbm(e / 45, n / 45, 3)).lerp(cRust, smooth(0.5, 0.7, fbm(e / 300 + 4, n / 300, 3)) * 0.6).lerp(cWeath, smooth(0.62, 0.75, fbm(e / 90, n / 90 + 6, 3)) * 0.45);
        out.lerp(tmp2, s.hw * 0.95);
      }
      if (s.mt > 3) {
        const w = smooth(3, 45, s.mt);
        if (s.uh > s.mt * 0.5) tmp2.copy(cGran1).lerp(cGran2, fbm(e / 70, n / 70, 3) * 0.9).lerp(cGranHi, smooth(0.55, 0.8, fbm(e / 140 + 8, n / 140, 3)) * 0.5);
        else tmp2.copy(cRock).lerp(cGran2, r * 0.4);
        out.lerp(tmp2, w); out.lerp(cCrev, smooth(0.35, 1.0, slope) * 0.55 * w);
      }
      const [rd, gen] = roadDist(e, n), rw = 8, ri = 0.8; void res;
      if (rd < rw) out.lerp(gen ? cGang : cRoad, smooth(rw, -1, rd) * (gen ? 0.4 : 0.75) * ri * (0.85 + 0.3 * r2) * (1 - s.hw * 0.6));
      out.multiplyScalar(0.94 + 0.12 * r2);
      return out;
    }

    // ---------- Medan kasar untuk seluruh wilayah ----------
    const MID = makeGrid(-7500, -10000, 300, 380, 50);
    // Petak detail: tepinya harus kelipatan 50 m agar tepat di garis grid medan kasar
    const PATCHES = [
      { id: "kota", e0: -1700, e1: 1500, n0: -1700, n1: 1200, step: 12.5 },
      { id: "quba", e0: -200, e1: 2300, n0: -3600, n1: -1700, step: 12.5 },
      { id: "uhud", e0: -1500, e1: 2000, n0: 3200, n1: 5800, step: 25 },
      { id: "khandaq", e0: -3450, e1: 1000, n0: 1200, n1: 2950, step: 12.5, lazy: true }   // hanya dibangun dan tampil pada 627 M
    ];
    const inPatch = (P, e, n) => e >= P.e0 && e <= P.e1 && n >= P.n0 && n <= P.n1;
    const strictlyIn = (P, e, n) => e > P.e0 + 0.01 && e < P.e1 - 0.01 && n > P.n0 + 0.01 && n < P.n1 - 0.01;
    const terrainMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 });
    const groundTex = groundTextures(THREE);
    terrainMat.map = groundTex.map; terrainMat.normalMap = groundTex.normal; terrainMat.normalScale = new THREE.Vector2(0.9, 0.9);
    const SAMPLES = new Map();
    function buildGridMesh(G, heightFn, sunkFn, borderNormal) {
      const R = G.nx + 1, cnt = R * (G.ny + 1);
      const pos = new Float32Array(cnt * 3), col = new Float32Array(cnt * 3), uv = new Float32Array(cnt * 2), smp = new Array(cnt);
      for (let iy = 0; iy <= G.ny; iy++) for (let ix = 0; ix <= G.nx; ix++) {
        const i = iy * R + ix, e = G.e0 + ix * G.step, n = G.n0 + iy * G.step;
        const [h, s] = heightFn(e, n); G.H[i] = h; smp[i] = s;
        pos[i * 3] = toX(e); pos[i * 3 + 1] = (h * VX) / M; pos[i * 3 + 2] = toZ(n);
        uv[i * 2] = e / 9; uv[i * 2 + 1] = n / 9;
      }
      for (let iy = 0; iy <= G.ny; iy++) for (let ix = 0; ix <= G.nx; ix++) {
        const i = iy * R + ix, e = G.e0 + ix * G.step, n = G.n0 + iy * G.step;
        const hx = G.H[i + (ix < G.nx ? 1 : -1)] - G.H[i], hy = G.H[i + (iy < G.ny ? R : -R)] - G.H[i];
        const slope = (Math.hypot(hx, hy) / G.step) * VX;
        colorAt(e, n, smp[i], slope, tmp, G.step);
        col[i * 3] = tmp.r; col[i * 3 + 1] = tmp.g; col[i * 3 + 2] = tmp.b;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
      geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
      geo.setIndex(new THREE.BufferAttribute(gridIndex(G), 1));
      geo.computeVertexNormals();
      const nrm = geo.attributes.normal;
      if (borderNormal) for (let iy = 0; iy <= G.ny; iy++) for (let ix = 0; ix <= G.nx; ix++) {
        if (ix > 0 && ix < G.nx && iy > 0 && iy < G.ny) continue;
        const i = iy * R + ix, v3 = borderNormal(G.e0 + ix * G.step, G.n0 + iy * G.step); nrm.setXYZ(i, v3[0], v3[1], v3[2]);
      }
      if (sunkFn) for (let iy = 0; iy <= G.ny; iy++) for (let ix = 0; ix <= G.nx; ix++) {   // turunkan setelah normal dihitung
        const i = iy * R + ix, sk = sunkFn(G.e0 + ix * G.step, G.n0 + iy * G.step); if (sk) pos[i * 3 + 1] = ((G.H[i] - sk) * VX) / M;
      }
      geo.attributes.position.needsUpdate = true; geo.computeBoundingSphere();
      const mesh = new THREE.Mesh(geo, terrainMat); mesh.receiveShadow = true; scene.add(mesh);
      return mesh;
    }
    const midMesh = buildGridMesh(MID, (e, n) => {
      const s = sample(e, n, 0);
      const ed = Math.min(e - MID.e0, MID.e1 - e, n - MID.n0, MID.n1 - n), fade = Math.min(1, ed / 350);
      return [s.h * fade - (1 - fade) * 30, s];
    }, (e, n) => (PATCHES.some((P) => !P.lazy && strictlyIn(P, e, n)) ? 9 : 0));
    const midN = midMesh.geometry.attributes.normal;
    function midNormalAt(e, n) {
      const fx = (e - MID.e0) / MID.step, fy = (n - MID.n0) / MID.step, ix = clamp(Math.floor(fx), 0, MID.nx - 1), iy = clamp(Math.floor(fy), 0, MID.ny - 1);
      const u = clamp(fx - ix, 0, 1), v = clamp(fy - iy, 0, 1), R = MID.nx + 1, a = iy * R + ix, idx = [a, a + 1, a + R, a + R + 1], w = [(1 - u) * (1 - v), u * (1 - v), (1 - u) * v, u * v];
      let x = 0, y = 0, z = 0; for (let k = 0; k < 4; k++) { x += midN.getX(idx[k]) * w[k]; y += midN.getY(idx[k]) * w[k]; z += midN.getZ(idx[k]) * w[k]; }
      const L = Math.hypot(x, y, z) || 1; return [x / L, y / L, z / L];
    }
    function buildPatch(P) {
      P.G = makeGrid(P.e0, P.n0, Math.round((P.e1 - P.e0) / P.step), Math.round((P.n1 - P.n0) / P.step), P.step);
      P.mesh = buildGridMesh(P.G, (e, n) => {
        const bd = Math.min(e - P.e0, P.e1 - e, n - P.n0, P.n1 - n), w = smooth(0, 160, bd);
        const s = sample(e, n, P.lazy ? 0 : w), hm = gridInterp(MID, MID.H, e, n);
        return [hm + (s.h - hm) * w, s];
      }, null, midNormalAt);
      P.on = !P.lazy;
    }
    PATCHES.forEach((P) => { if (!P.lazy) buildPatch(P); else P.on = false; });
    mark("medan");
    const base = new THREE.Mesh(new THREE.BoxGeometry((MID.e1 - MID.e0) / M + 0.6, 1.4, (MID.n1 - MID.n0) / M + 0.6), new THREE.MeshStandardMaterial({ color: 0x1a2550, roughness: 0.6, metalness: 0.3 }));
    base.position.set(toX((MID.e0 + MID.e1) / 2), -2.6, toZ((MID.n0 + MID.n1) / 2)); scene.add(base);

    // Tinggi permukaan yang benar-benar tergambar (dipakai rumah, pohon, aktor cerita)
    const PK = PATCHES.find((P) => P.id === "khandaq");
    function trenchProfile(d) {
      if (!KHD) return 0;
      const half = KHD.lebar / 2, D = KHD.dalam;
      if (d < half - 0.9) return -D;
      if (d < half + 0.3) return -D * (half + 0.3 - d) / 1.2;
      if (d > half + 1 && d < half + 7.5) return 1.25 * Math.sin((Math.PI * (d - half - 1)) / 6.5);  // tanggul tanah galian
      return 0;
    }
    function groundAt(e, n) {
      for (const P of PATCHES) if (P.on && inPatch(P, e, n)) return gridInterp(P.G, P.G.H, e, n);
      return gridInterp(MID, MID.H, e, n);
    }
    function surfaceAt(e, n) {
      const g = groundAt(e, n);
      if (trenchShown && PK && inPatch(PK, e, n)) { const d = lineDist(KHD, e, n); if (d < 34) return g + trenchProfile(d); }
      return g;
    }
    const Y = (e, n) => (surfaceAt(e, n) * VX) / M;

    // ---------- Parit Khandaq (627 M): pita medan khusus dengan penampang parit dan tanggul ----------
    let trenchMesh = null, trenchShown = false, midTrench = [];
    if (KHD && PK) {   // titik medan kasar di bawah petak Khandaq (diturunkan hanya saat petak itu tampil)
      const R = MID.nx + 1;
      for (let iy = 0; iy <= MID.ny; iy++) for (let ix = 0; ix <= MID.nx; ix++) if (strictlyIn(PK, MID.e0 + ix * MID.step, MID.n0 + iy * MID.step)) midTrench.push(iy * R + ix);
    }
    function buildTrench() {
      buildPatch(PK); PK.on = false;
      const pts = KHD.pts, OFF = [-34, -28, -22, -17, -13, -10, -8, -6.5, -5.5, -4.8, -3.6, -1.8, 0, 1.8, 3.6, 4.8, 5.5, 6.5, 8, 10, 13, 17, 22, 28, 34];
      const samples = [];
      for (let k = 0; k < pts.length - 1; k++) {
        const [a, b] = pts[k], [c, d] = pts[k + 1], L = Math.hypot(c - a, d - b), ns = Math.max(1, Math.round(L / 5));
        for (let i = 0; i < ns; i++) samples.push([a + ((c - a) * i) / ns, b + ((d - b) * i) / ns]);
      }
      samples.push(pts[pts.length - 1]);
      const NS = samples.length, NO = OFF.length, pos = new Float32Array(NS * NO * 3), col = new Float32Array(NS * NO * 3), uv = new Float32Array(NS * NO * 2);
      const cDug = new THREE.Color(0x9b7650), cPit = new THREE.Color(0x4e3a2a);
      for (let i = 0; i < NS; i++) {
        const p0 = samples[Math.max(0, i - 1)], p1 = samples[Math.min(NS - 1, i + 1)], tx = p1[0] - p0[0], ty = p1[1] - p0[1], tl = Math.hypot(tx, ty) || 1;
        const nxv = -ty / tl, nyv = tx / tl;
        for (let j = 0; j < NO; j++) {
          const o = OFF[j], e = samples[i][0] + nxv * o, n = samples[i][1] + nyv * o, d = Math.abs(o), k = (i * NO + j);
          const g = gridInterp(PK.G, PK.G.H, e, n), h = g + trenchProfile(d);
          pos[k * 3] = toX(e); pos[k * 3 + 1] = (h * VX) / M; pos[k * 3 + 2] = toZ(n); uv[k * 2] = e / 9; uv[k * 2 + 1] = n / 9;
          colorAt(e, n, sample(e, n, 1), 0.1, tmp);
          if (d < KHD.lebar / 2 + 0.4) tmp.lerp(cPit, 0.85); else if (d < KHD.lebar / 2 + 8) tmp.lerp(cDug, 0.75 * smooth(KHD.lebar / 2 + 8, KHD.lebar / 2 + 3, d));
          col[k * 3] = tmp.r; col[k * 3 + 1] = tmp.g; col[k * 3 + 2] = tmp.b;
        }
      }
      const idx = [];
      for (let i = 0; i < NS - 1; i++) for (let j = 0; j < NO - 1; j++) { const a = i * NO + j, b = a + 1, c = a + NO + 1, d = a + NO; idx.push(a, d, c, a, c, b); }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3)); geo.setAttribute("color", new THREE.BufferAttribute(col, 3)); geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
      geo.setIndex(idx); geo.computeVertexNormals(); geo.computeBoundingSphere();
      // arah segitiga: pastikan normal ke atas
      { const nrm = geo.attributes.normal; let up = 0; for (let i = 0; i < nrm.count; i += 50) up += nrm.getY(i); if (up < 0) { for (let i = 0; i < idx.length; i += 3) { const t = idx[i + 1]; idx[i + 1] = idx[i + 2]; idx[i + 2] = t; } geo.setIndex(idx); geo.computeVertexNormals(); } }
      const tm = terrainMat.clone(); tm.polygonOffset = true; tm.polygonOffsetFactor = -2; tm.polygonOffsetUnits = -6;
      trenchMesh = new THREE.Mesh(geo, tm); trenchMesh.receiveShadow = true; trenchMesh.visible = false; scene.add(trenchMesh);
      // titik petak di sekitar parit diturunkan agar tertutup pita parit
      const R = PK.G.nx + 1, pa = PK.mesh.geometry.attributes.position;
      for (let iy = 0; iy <= PK.G.ny; iy++) for (let ix = 0; ix <= PK.G.nx; ix++) {
        const e = PK.G.e0 + ix * PK.G.step, n = PK.G.n0 + iy * PK.G.step, i = iy * R + ix;
        if (lineDist(KHD, e, n) < 13) pa.setY(i, ((PK.G.H[i] - 7) * VX) / M);
      }
      pa.needsUpdate = true;
    }
    function applyTrench(on) {
      if (!KHD || !PK || on === trenchShown) return;
      if (on && !trenchMesh) buildTrench();
      trenchShown = on; PK.on = on;
      if (trenchMesh) { trenchMesh.visible = on; PK.mesh.visible = on; }
      const pa = midMesh.geometry.attributes.position;
      for (const i of midTrench) pa.setY(i, ((MID.H[i] - (on ? 9 : 0)) * VX) / M);
      pa.needsUpdate = true;
    }

    // ---------- Instans berkelompok per petak (agar bisa dipangkas di luar pandangan) ----------
    function chunked(geo, mat, items, tile, opt = {}) {
      const groups = new Map();
      for (const it of items) { const k = Math.floor(it.e / tile) + "," + Math.floor(it.n / tile); if (!groups.has(k)) groups.set(k, []); groups.get(k).push(it); }
      const meshes = [];
      for (const [k, list] of groups) {
        const [gx, gy] = k.split(",").map(Number), ce = (gx + 0.5) * tile, cn = (gy + 0.5) * tile;
        const g = new THREE.BufferGeometry();
        for (const a in geo.attributes) g.setAttribute(a, geo.attributes[a]);
        if (geo.index) g.setIndex(geo.index);
        let ymax = 0; list.forEach((it) => (ymax = Math.max(ymax, it.y || 0)));
        g.boundingSphere = new THREE.Sphere(new THREE.Vector3(toX(ce), ymax / 2, toZ(cn)), (tile * 0.75) / M + ymax / 2 + (opt.pad || 1));
        const im = new THREE.InstancedMesh(g, mat, list.length);
        list.forEach((it, i) => { im.setMatrixAt(i, it.m); if (it.c) im.setColorAt(i, it.c); });
        im.castShadow = !!opt.cast; im.receiveShadow = opt.receive !== false; scene.add(im); meshes.push(im);
      }
      return meshes;
    }

    // ---------- Bangunan bernama ----------
    const tex = plasterTexture(THREE);
    const KCOL = { pasti: 0xd9b45a, kitab: 0x6cc4ae, perkiraan: 0xd08f7c };
    const markers = {}, colliders = [], yearly = [];          // yearly: fungsi pembaruan per tahun
    const nabawi = byId["masjid-nabawi"];
    const center = nabawi ? [nabawi.e, nabawi.n] : [0, 0];
    // daerah larangan rumah generik
    const KEEP = [];
    const keepRect = (e0, e1, n0, n1) => KEEP.push({ rect: [e0, e1, n0, n1] });
    const keepCirc = (e, n, r) => KEEP.push({ c: [e, n, r] });
    const kept = (e, n, pad = 0) => KEEP.some((k) => (k.rect ? e > k.rect[0] - pad && e < k.rect[1] + pad && n > k.rect[2] - pad && n < k.rect[3] + pad : Math.hypot(e - k.c[0], n - k.c[1]) < k.c[2] + pad));
    if (nabawi && nabawi.tahap) {
      let e0 = Infinity, e1 = -Infinity, n0 = Infinity, n1 = -Infinity;
      nabawi.tahap.forEach((s) => { const ce = s.e ?? nabawi.e, cn = s.n ?? nabawi.n; e0 = Math.min(e0, ce - s.w / 2); e1 = Math.max(e1, ce + s.w / 2); n0 = Math.min(n0, cn - s.l / 2); n1 = Math.max(n1, cn + s.l / 2); });
      keepRect(e0 - 8, e1 + 10, n0 - 8, n1 + 8);
    }
    const isHujrah = (p) => p.jenis === "rumah" && Math.hypot(p.e - center[0], p.n - center[1]) < 45;
    const kiblatAt = (p, y) => { let k = "selatan"; (p.kiblat || []).forEach((r) => { if (y >= r.t[0] && y <= r.t[1]) k = r.arah; }); return k; };
    const glowMat = (p) => new THREE.MeshStandardMaterial({ vertexColors: true, map: tex, roughness: 0.9, emissive: KCOL[p.keyakinan] || 0xd9b45a, emissiveIntensity: 0 });
    function addMesh(acc, mat, cast = true) { const m = new THREE.Mesh(toGeometry(THREE, acc), mat); m.castShadow = cast; m.receiveShadow = true; scene.add(m); return m; }
    const footG = (e, n, w, l) => Math.min(surfaceAt(e - w / 2, n - l / 2), surfaceAt(e + w / 2, n - l / 2), surfaceAt(e - w / 2, n + l / 2), surfaceAt(e + w / 2, n + l / 2), surfaceAt(e, n));

    // Masjid: satu varian geometri per (tahap, arah kiblat), dibangun saat pertama kali dibutuhkan
    function masjidVariants(p) {
      const stages = p.tahap && p.tahap.length ? p.tahap : [{ t: p.ada || [622, 661], w: p.id === "masjid-quba" ? 26 : p.besar ? 22 : 14, l: p.id === "masjid-quba" ? 26 : p.besar ? 22 : 12 }];
      const vs = [];
      stages.forEach((s, si) => {
        let cur = null;
        for (let y = s.t[0]; y <= s.t[1]; y++) {
          const k = kiblatAt(p, y), floorK = p.id === "masjid-nabawi" && y >= 625 ? 1 : 0, key = si + ":" + k + ":" + floorK;
          if (cur && cur.key === key) cur.t[1] = y; else { cur = { key, t: [y, y], s, si, kib: k, pebble: floorK || p.id !== "masjid-nabawi" }; vs.push(cur); }
        }
      });
      return vs;
    }
    function buildMasjid(p, v, mat) {
      const s = v.s, ce = s.e ?? p.e, cn = s.n ?? p.n, nab = p.id === "masjid-nabawi";
      const H = { e: ce, n: cn, g: footG(ce, cn, s.w, s.l), t: 0, seed: 1 };
      const stone = nab && v.si >= 3, big = nab && v.si >= 2;
      const T = nab ? (stone ? 1.0 : 0.75) : 0.6, ht = nab ? (big ? 5.2 : 3.6) : 3.2;
      const L = s.l, W = s.w, kS = v.kib !== "utara";
      const mainD = nab ? [9, 11, 14, 17][v.si] : Math.max(4, L * 0.38), shuffD = nab ? [0, 6, 8, 10][v.si] || 0 : 0;
      const roofs = [];
      if (kS) { roofs.push([L / 2 - T - mainD, L / 2 - T]); if (nab && (v.t[1] >= 624) && shuffD) roofs.push([-L / 2 + T, -L / 2 + T + shuffD]); else if (nab && v.si === 0) roofs.push([-L / 2 + T, -L / 2 + T + 5]); }
      else roofs.push([-L / 2 + T, -L / 2 + T + mainD]);
      // pintu di sisi timur dan barat, dan satu pintu di sisi yang membelakangi kiblat
      const doors = nab ? { e: -L * 0.05, w: -L * 0.12, [kS ? "n" : "s"]: 0 } : { [kS ? "n" : "s"]: 0, e: 0 };
      let mimbar = null;
      if (nab && v.si >= 1) { const me = -10, mn = -4; mimbar = [me - ce, -(mn - cn)]; }
      const acc = Acc(), cols = [];
      genMasjid(acc, U, H, { w: W, l: L, thick: T, ht, wall: stone ? 0xd8ccb2 : nab ? 0xab8a64 : 0xa8885f, stone, floor: v.pebble ? 0xcbb894 : 0xa9895f,
        roof: stone ? 0x6f4b2d : 0xa08a5a, pillar: stone ? 0xd2c6ad : big ? 0x7a5a3a : C.palm, pillarR: stone ? 0.38 : 0.26, span: stone ? 4 : 3.6,
        roofs, doors, mimbar, kiblat: v.kib, colliders: cols });
      const mesh = addMesh(acc, mat);
      return { mesh, cols, top: ((H.g + ht) * VX) / M };
    }

    // Kompleks benteng Yahudi: pagar batu, beberapa utum, dan rumah di dalamnya
    function buildFort(p, mat, inhabited) {
      const acc = Acc(), cols = [];
      let s = 97 + p.e * 7 + p.n * 3; const rr = () => (s = (Math.abs(Math.round(s)) * 16807 + 11) % 2147483647) / 2147483647;
      const W = 64, L = 48, wh = 2.8, g0 = footG(p.e, p.n, W, L);
      const H = { e: p.e, n: p.n, g: g0, t: 0, seed: 5 };
      const B = (sx, sy, sz, ox, oy, oz, c) => part(acc, U.box, sx, sy, sz, ox, oy, oz, 0, c, H);
      const wall = (sx, sz, ox, oz) => { B(sx, wh, sz, ox, wh / 2, oz, C.fortDark); B(sx + 0.3, 0.6, sz + 0.3, ox, 0.1, oz, C.stone); cols.push({ e: p.e + ox, n: p.n - oz, w: sx, l: sz, t: 0, court: 0 }); };
      wall(W, 0.8, 0, -L / 2); wall(W / 2 - 2, 0.8, -W / 4 - 1, L / 2); wall(W / 2 - 2, 0.8, W / 4 + 1, L / 2); wall(0.8, L, -W / 2, 0); wall(0.8, L, W / 2, 0);
      const towers = [[-W / 2 + 7, -L / 2 + 7, 11, 10], [W / 2 - 7, -L / 2 + 6, 9, 12], [W / 2 - 8, L / 2 - 8, 8, 9.5]];
      towers.forEach(([x, z, w, h], i) => {
        const th = { e: p.e + x, n: p.n - z, g: g0, t: 0, w, l: w, h, col: C.fort, seed: 40 + i + Math.round(p.e), awning: inhabited };
        genTower(acc, U, th); cols.push({ e: th.e, n: th.n, w, l: w, t: 0, court: 0 });
      });
      for (let i = 0; i < 5; i++) {
        const x = -W / 2 + 10 + rr() * (W - 20), z = -L / 2 + 12 + rr() * (L - 22);
        if (towers.some(([tx, tz]) => Math.hypot(tx - x, tz - z) < 12)) continue;
        const hh = { e: p.e + x, n: p.n - z, g: g0, t: Math.PI * (rr() < 0.5 ? 0 : 0.5), w: 6 + rr() * 3, l: 6 + rr() * 2, h: 3 + rr(), col: 0xb59672, seed: 7 + i, court: 0, upper: rr() < 0.4, jar: true };
        genHouse(acc, U, hh); cols.push({ e: hh.e, n: hh.n, w: hh.w, l: hh.l, t: hh.t, court: 0 });
      }
      const mesh = addMesh(acc, mat);
      return { mesh, cols, top: ((g0 + 12) * VX) / M };
    }

    // Kuburan: gundukan rendah membujur timur-barat dengan batu nisan kecil, bertambah dari tahun ke tahun
    const graveFields = [];
    function graveField(p, total, firstYear, perYear, radius) {
      let s = 31 + Math.round(p.e); const rr = () => (s = (s * 16807) % 2147483647) / 2147483647;
      const spots = [];
      for (let k = 0; k < total * 12 && spots.length < total; k++) {
        const r = radius * Math.sqrt(rr()), a = rr() * Math.PI * 2, e = p.e + Math.cos(a) * r * 1.2, n = p.n + Math.sin(a) * r * 0.85;
        if (spots.some((q) => Math.abs(q.e - e) < 2.6 && Math.abs(q.n - n) < 1.6)) continue;
        spots.push({ e, n, d: Math.hypot(e - p.e - 12, n - p.n) });
      }
      spots.sort((a, b) => a.d - b.d);
      const mound = new THREE.BoxGeometry(1, 1, 1); mound.translate(0, 0.5, 0);
      const im = new THREE.InstancedMesh(mound, new THREE.MeshStandardMaterial({ roughness: 1, color: 0xffffff }), spots.length * 2);
      const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), pp = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0);
      spots.forEach((sp, i) => {
        const g = surfaceAt(sp.e, sp.n), rot = (rr() - 0.5) * 0.08;
        q.setFromAxisAngle(up, rot); sc.set(2.0 / M, (0.32 * VX) / M, 0.85 / M); pp.set(toX(sp.e), ((g - 0.05) * VX) / M, toZ(sp.n));
        im.setMatrixAt(i * 2, m4.compose(pp, q, sc)); im.setColorAt(i * 2, tmp.setHex(0x9b8362).lerp(tmp2.setHex(0x7d6a50), rr()));
        sc.set(0.22 / M, (0.5 * VX) / M, 0.3 / M); pp.set(toX(sp.e - 0.95), ((g - 0.02) * VX) / M, toZ(sp.n));
        im.setMatrixAt(i * 2 + 1, m4.compose(pp, q, sc)); im.setColorAt(i * 2 + 1, tmp.setHex(0x5e5650));
      });
      im.castShadow = false; im.receiveShadow = true; im.frustumCulled = false; scene.add(im);
      graveFields.push({ im, p, total: spots.length, firstYear, perYear });
    }

    const named = [];   // rumah/benteng/masjid untuk tabrakan & larangan
    places.forEach((p, idx) => {
      const x = toX(p.e), z = toZ(p.n);
      let topY = Y(p.e, p.n) + 0.05, mat = null;
      const entry = { p, meshes: [], cols: [] };
      if (p.jenis === "masjid") {
        mat = glowMat(p);
        const vs = masjidVariants(p), cache = new Map();
        const big = vs.reduce((m, v) => Math.max(m, v.s.w, v.s.l), 0);
        keepCirc(p.e, p.n, big / 2 + 12);
        entry.update = (y) => {
          let v = null; for (const c of vs) if (y >= c.t[0] && y <= c.t[1]) v = c;
          for (const [k, b] of cache) b.mesh.visible = v && k === v.key;
          if (!v) { entry.cols = []; return; }
          if (!cache.has(v.key)) cache.set(v.key, buildMasjid(p, v, mat));
          const b = cache.get(v.key); b.mesh.visible = true; entry.cols = b.cols; entry.top = b.top;
        };
        topY = ((surfaceAt(p.e, p.n) + 4) * VX) / M;
      } else if (p.jenis === "rumah") {
        mat = glowMat(p);
        const huj = isHujrah(p), sq = p.id === "saqifah";
        const w = huj ? 4.6 : sq ? 16 : p.besar ? 14 : 12, l = huj ? 5.4 : sq ? 12 : p.besar ? 12 : 10;
        // bilik istri Nabi menempel di sisi timur masjid, pintunya menghadap ke barat (ke dalam masjid)
        const t = huj ? -Math.PI / 2 : Math.atan2(-(p.e - center[0]), p.n - center[1]);
        const hh = { e: p.e, n: p.n, w, l, h: huj ? 3.1 : p.besar ? 4.6 : 4, t, g: footG(p.e, p.n, w, l), col: 0xcdb08a,
          court: huj ? 0 : p.besar ? 6 : 4, upper: !!p.besar || /masyrabah/.test(p.id), jar: true, seed: 100 + idx };
        const acc = Acc();
        if (sq) genShelter(acc, U, hh, w, l); else genHouse(acc, U, hh);
        entry.meshes.push(addMesh(acc, mat));
        if (!sq) entry.cols.push({ e: hh.e, n: hh.n, w: hh.w, l: hh.l, t: hh.t, court: hh.court });
        keepCirc(p.e, p.n, huj ? 6 : 20);
        topY = ((hh.g + hh.h + (hh.upper ? 2.6 : 0)) * VX) / M;
      } else if (p.jenis === "benteng") {
        mat = glowMat(p);
        const variants = {};
        entry.update = (y) => {
          const inh = !p.ada || y <= p.ada[1], key = inh ? "a" : "b";
          if (!variants[key]) variants[key] = buildFort(p, mat, inh);
          for (const k in variants) variants[k].mesh.visible = k === key;
          entry.cols = variants[key].cols;
        };
        keepCirc(p.e, p.n, 45);
        topY = ((surfaceAt(p.e, p.n) + 12) * VX) / M;
      } else if (p.jenis === "sumur") {
        mat = glowMat(p);
        const acc = Acc(), H = { e: p.e, n: p.n, g: surfaceAt(p.e, p.n), t: 0.4, seed: idx };
        genWell(acc, U, H); entry.meshes.push(addMesh(acc, mat));
        entry.cols.push({ e: p.e, n: p.n, w: 3.2, l: 3.2, t: 0.4, court: 0 });
        keepCirc(p.e, p.n, 10);
        topY = ((H.g + 2.8) * VX) / M;
      } else if (p.jenis === "makam") {
        const baqi = p.id === "baqi";
        graveField(p, baqi ? 420 : 46, p.ada ? p.ada[0] : 623, baqi ? 11 : 999, baqi ? 62 : 16);
        if (baqi) {   // semak gharqad yang memberi nama Baqi' al-Gharqad
          let s = 41; const rr = () => (s = (s * 16807) % 2147483647) / 2147483647;
          const items = [], q = new THREE.Quaternion(), eu = new THREE.Euler(), sc = new THREE.Vector3(), pp = new THREE.Vector3();
          for (let i = 0; i < 70; i++) {
            const a = rr() * Math.PI * 2, r = 20 + rr() * 70, e = p.e + Math.cos(a) * r * 1.2, n = p.n + Math.sin(a) * r * 0.9, sz = 0.8 + rr() * 1.4;
            eu.set(0, rr() * 3, 0); q.setFromEuler(eu); sc.set((sz * 1.3) / M, (sz * 0.8 * VX) / M, (sz * 1.2) / M); pp.set(toX(e), Y(e, n), toZ(n));
            items.push({ e, n, y: pp.y + sc.y, m: new THREE.Matrix4().compose(pp, q, sc), c: new THREE.Color(0x4a5a2e).lerp(new THREE.Color(0x6a6a3a), rr()) });
          }
          chunked(new THREE.IcosahedronGeometry(1, 0), new THREE.MeshStandardMaterial({ roughness: 1, flatShading: true }), items, 1000, { cast: true });
        }
        keepCirc(p.e, p.n, baqi ? 90 : 25);
      } else if (p.jenis === "pasar") {
        const acc = Acc(); let s = 17; const rr = () => (s = (s * 16807) % 2147483647) / 2147483647;
        for (let i = 0; i < 30; i++) {
          const a = rr() * Math.PI * 2, r = 12 + rr() * 50, e = p.e + Math.cos(a) * r, n = p.n + Math.sin(a) * r * 0.7;
          const H = { e, n, g: surfaceAt(e, n), t: a, seed: i };
          const B = (sx, sy, sz, ox, oy, oz, c) => part(acc, U.box, sx, sy, sz, ox, oy, oz, 0, c, H);
          const w = 2.6 + rr() * 1.6, d = 2.2 + rr();
          for (const [px, pz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) B(0.1, 2.1, 0.1, (px * w) / 2, 1.05, (pz * d) / 2, C.palm);
          B(w + 0.3, 0.06, d + 0.3, 0, 2.12, 0, C.cloth[i % C.cloth.length]);
          for (let k = 0; k < 3; k++) part(acc, rr() < 0.5 ? U.cyl : U.box, 0.5 + rr() * 0.3, 0.6, 0.5, (rr() - 0.5) * w * 0.7, 0.3, (rr() - 0.5) * d * 0.6, 0, rr() < 0.5 ? C.clay : 0xb7a07a, H);
        }
        const mesh = addMesh(acc, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95 }));
        entry.meshes.push(mesh);
        keepCirc(p.e, p.n, 72);
      } else if (p.id === "mirbad") {
        // tempat menjemur kurma sebelum masjid dibangun
        const acc = Acc(); let s = 23; const rr = () => (s = (s * 16807) % 2147483647) / 2147483647;
        for (let i = 0; i < 12; i++) {
          const e = p.e + (rr() - 0.5) * 24, n = p.n + (rr() - 0.5) * 20, H = { e, n, g: surfaceAt(e, n), t: rr(), seed: i };
          part(acc, U.box, 3, 0.05, 2, 0, 0.03, 0, 0, 0x9a8458, H); part(acc, U.box, 2.6, 0.08, 1.6, 0, 0.08, 0, 0, C.dates, H);
        }
        const mesh = addMesh(acc, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 }), false);
        entry.meshes.push(mesh);
        entry.update = (y) => { mesh.visible = y < 622; };
      } else if (p.id === "kemah-ahzab") {
        // perkemahan pasukan Ahzab (627 M): tenda bulu dan kulit
        const acc = Acc(); let s = 29; const rr = () => (s = (s * 16807) % 2147483647) / 2147483647;
        for (let i = 0; i < 90; i++) {
          const a = rr() * Math.PI * 2, r = 30 + rr() * 380, e = p.e + Math.cos(a) * r * 1.3, n = p.n + Math.sin(a) * r * 0.8;
          if (harrahW(e, n) > 0.3) continue;
          const H = { e, n, g: surfaceAt(e, n), t: rr() * 3, seed: i }, w = 3 + rr() * 2.5, l = 4 + rr() * 3;
          part(acc, U.prism, w, 1.8 + rr() * 0.6, l, 0, 0, 0, 0, [0x5a4a3a, 0x7a6650, 0x3e342c, 0x8a7a62][i % 4], H);
        }
        const mesh = addMesh(acc, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 }));
        entry.meshes.push(mesh);
      }
      if (p.jenis === "gunung") topY = Y(p.e, p.n) + 0.3;
      const flat = p.jenis === "gunung" || p.jenis === "jalan" || p.jenis === "kawasan";
      const g = new THREE.Group(), show = !flat;
      const pm = new THREE.MeshBasicMaterial({ color: KCOL[p.keyakinan] || 0xd9b45a });
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1, 6), pm), gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.06, 0), pm);
      const ringM = new THREE.MeshBasicMaterial({ color: KCOL[p.keyakinan] || 0xd9b45a, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false });
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.22, 36), ringM); ring.rotation.x = -Math.PI / 2;
      if (show) g.add(pole, gem);
      if (p.jenis !== "gunung" && p.jenis !== "jalan") g.add(ring);
      g.position.set(x, topY, z); scene.add(g);
      ring.position.y = -(topY - Y(p.e, p.n)) + 0.03;
      markers[p.id] = { p, g, pole, gem, ring, ringM, mat, h: 0.35, show, topY, entry, alive: true };
      named.push(entry);
    });

    mark("bangunan");
    // ---------- Rumah dan utum di perkampungan ----------
    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const WALLS = [0xb08a5e, 0xa47e55, 0xbf9a6a, 0x9c7650, 0xc2a47a, 0xb89470];
    const houses = [], hgrid = new Map(), HG = 20;
    const hkey = (e, n) => Math.floor(e / HG) + "," + Math.floor(n / HG);
    function hfree(e, n, r) {
      for (let gx = Math.floor((e - r - 14) / HG); gx <= Math.floor((e + r + 14) / HG); gx++) for (let gy = Math.floor((n - r - 14) / HG); gy <= Math.floor((n + r + 14) / HG); gy++) {
        const l = hgrid.get(gx + "," + gy); if (!l) continue;
        for (const q of l) if (Math.abs(q.e - e) < r + q.rad && Math.abs(q.n - n) < r + q.rad) return false;
      }
      return true;
    }
    function hput(o) { const k = hkey(o.e, o.n); if (!hgrid.has(k)) hgrid.set(k, []); hgrid.get(k).push(o); }
    const trenchD = (e, n) => (KHD ? lineDist(KHD, e, n) : 1e4);
    function siteOk(e, n, rad) {
      if (kept(e, n, rad)) return false;
      if (harrahW(e, n) > 0.45) return false;
      const [mt] = mountains(e, n); if (mt > 5) return false;
      const [bed] = wadiW(e, n); if (bed > 0.45) return false;
      if (trenchD(e, n) < 22 + rad) return false;
      if (roadDist(e, n)[0] < rad + 1) return false;
      const h0 = surfaceAt(e, n), sl = Math.abs(surfaceAt(e + 8, n) - h0) + Math.abs(surfaceAt(e, n + 8) - h0);
      return sl < 3;
    }
    for (const sd of SEEDS) {
      // utum di dekat pusat kampung
      let tw = 0;
      for (let k = 0; k < 300 && tw < sd.towers; k++) {
        const a = rnd() * Math.PI * 2, r = sd.r * (0.15 + rnd() * 0.55), e = sd.e + Math.cos(a) * r, n = sd.n + Math.sin(a) * r, w = 6.5 + rnd() * 2.5;
        if (!siteOk(e, n, w) || !hfree(e, n, w / 2 + 6)) continue;
        const o = { kind: "utum", e, n, w, l: w * (0.9 + rnd() * 0.2), h: 8 + rnd() * 3, t: rnd() * Math.PI, g: footG(e, n, w, w), col: sd.yahudi ? C.fort : shade(C.fort, 1.05),
          seed: 1 + Math.floor(rnd() * 1e6), court: 0, rad: w / 2 + 1, yahudi: !!sd.yahudi, seedP: sd.p };
        houses.push(o); hput(o); tw++;
      }
      let c = 0;
      for (let k = 0; k < sd.count * 14 && c < sd.count; k++) {
        const out = rnd() < 0.18, r = sd.r * Math.sqrt(rnd()) * (out ? 1.5 : 1), a = rnd() * Math.PI * 2, e = sd.e + Math.cos(a) * r, n = sd.n + Math.sin(a) * r;
        const w = 5.5 + rnd() * 5, l = 5.5 + rnd() * 4, court = rnd() < 0.4 ? 3.5 + rnd() * 2.5 : 0, rad = Math.hypot(w, l + court) / 2;
        if (!siteOk(e, n, rad) || !hfree(e, n, rad + 1.5)) continue;
        let t = Math.atan2(-(e - sd.e), n - sd.n) + (rnd() - 0.5) * 0.7; if (rnd() < 0.3) t += rnd() < 0.5 ? Math.PI / 2 : -Math.PI / 2;
        const o = { kind: "rumah", e, n, w, l, h: 2.8 + rnd() * 2, t, g: footG(e, n, w, l), col: WALLS[Math.floor(rnd() * WALLS.length)], court, upper: rnd() < 0.18, jar: rnd() < 0.4,
          seed: 1 + Math.floor(rnd() * 1e6), rad };
        houses.push(o); hput(o); c++;
      }
    }
    // Kotak jauh (instanced)
    const hGeo = new THREE.BoxGeometry(1, 1, 1); hGeo.translate(0, 0.5, 0);
    const inst = new THREE.InstancedMesh(hGeo, new THREE.MeshStandardMaterial({ roughness: 0.95 }), houses.length);
    inst.frustumCulled = false;
    const m4 = new THREE.Matrix4(), qq = new THREE.Quaternion(), s3 = new THREE.Vector3(), p3 = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0), ZERO = new THREE.Matrix4().makeScale(0, 0, 0);
    const baseM = houses.map((hh, i) => {
      qq.setFromAxisAngle(up, hh.t); s3.set(hh.w / M, ((hh.h + (hh.kind === "utum" ? 0.6 : 0)) * VX) / M, hh.l / M); p3.set(toX(hh.e), (hh.g * VX) / M - 0.02, toZ(hh.n));
      const m = new THREE.Matrix4().compose(p3, qq, s3); inst.setColorAt(i, tmp.setHex(hh.col)); return m;
    });
    inst.castShadow = true; inst.receiveShadow = true; scene.add(inst);

    const cells = new Map();
    houses.forEach((hh, i) => {
      const key = Math.floor(hh.e / CELL) + "," + Math.floor(hh.n / CELL);
      if (!cells.has(key)) cells.set(key, { key, ids: [], ce: (Math.floor(hh.e / CELL) + 0.5) * CELL, cn: (Math.floor(hh.n / CELL) + 0.5) * CELL });
      cells.get(key).ids.push(i);
    });
    const detailMat = new THREE.MeshStandardMaterial({ vertexColors: true, map: tex, roughness: 0.95 });
    const built = new Map();
    const inhabitedTower = (hh) => !hh.yahudi || !hh.seedP || !hh.seedP.ada || year <= hh.seedP.ada[1];
    function refreshInstances() {
      houses.forEach((hh, i) => {
        const cellKey = Math.floor(hh.e / CELL) + "," + Math.floor(hh.n / CELL);
        inst.setMatrixAt(i, built.has(cellKey) ? ZERO : baseM[i]);
      });
      inst.instanceMatrix.needsUpdate = true;
    }
    function buildCell(cell) {
      const acc = Acc();
      for (const i of cell.ids) { const hh = houses[i]; if (hh.kind === "utum") genTower(acc, U, { ...hh, awning: inhabitedTower(hh) }); else genHouse(acc, U, hh); }
      const mesh = new THREE.Mesh(toGeometry(THREE, acc), detailMat);
      mesh.castShadow = true; mesh.receiveShadow = true; scene.add(mesh);
      built.set(cell.key, { mesh, last: performance.now() });
      for (const i of cell.ids) inst.setMatrixAt(i, ZERO);
      inst.instanceMatrix.needsUpdate = true;
    }
    function dropCell(key) {
      const b = built.get(key); if (!b) return;
      scene.remove(b.mesh); b.mesh.geometry.dispose(); built.delete(key);
      for (const i of cells.get(key).ids) inst.setMatrixAt(i, baseM[i]);
      inst.instanceMatrix.needsUpdate = true;
    }

    mark("rumah");
    // ---------- Pohon kurma (instanced, dikelompokkan per petak 800 m) ----------
    function palmGeos() {
      const trunk = new THREE.CylinderGeometry(0.16, 0.26, 1, 5, 1, true); trunk.translate(0, 0.5, 0);
      const P = [], N = [], Cc = [];
      const green = [new THREE.Color(0x5f6f30), new THREE.Color(0x6f7d38), new THREE.Color(0x4f5f2a)], dry = new THREE.Color(0x8a7646);
      const NF = 7;
      for (let f = 0; f < NF; f++) {
        const a = (f / NF) * Math.PI * 2 + (f % 2) * 0.2, lower = f % 3 === 0, len = lower ? 0.32 : 0.42, lift = lower ? -0.25 : 0.32;
        const col = lower ? dry : green[f % 3];
        const segs = 2, w = 0.085;
        const pts = [];
        for (let k = 0; k <= segs; k++) { const t = k / segs, r = len * t, y = lift * t - 0.55 * t * t * len; pts.push([Math.cos(a) * r, y + 0.02, Math.sin(a) * r]); }
        const sx = -Math.sin(a) * w, sz = Math.cos(a) * w;
        for (let k = 0; k < segs; k++) {
          const p0 = pts[k], p1 = pts[k + 1], ww0 = 1 - (k / segs) * 0.7, ww1 = 1 - ((k + 1) / segs) * 0.7;
          const v = [[p0[0] - sx * ww0, p0[1], p0[2] - sz * ww0], [p0[0] + sx * ww0, p0[1], p0[2] + sz * ww0], [p1[0] + sx * ww1, p1[1], p1[2] + sz * ww1], [p1[0] - sx * ww1, p1[1], p1[2] - sz * ww1]];
          const ctr = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2 + 0.03, (p0[2] + p1[2]) / 2];   // sedikit melengkung (lipatan tengah)
          for (const [A, B, Cn] of [[v[0], v[1], ctr], [v[0], ctr, v[3]], [v[1], v[2], v[3]]]) {
            const ux = B[0] - A[0], uy = B[1] - A[1], uz = B[2] - A[2], vx = Cn[0] - A[0], vy = Cn[1] - A[1], vz = Cn[2] - A[2];
            let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx; const L = Math.hypot(nx, ny, nz) || 1; if (ny < 0) { nx = -nx; ny = -ny; nz = -nz; }
            for (const q of [A, B, Cn]) { P.push(...q); N.push(nx / L, ny / L, nz / L); Cc.push(col.r, col.g, col.b); }
          }
        }
      }
      // bonggol tengah
      const crown = new THREE.BufferGeometry();
      crown.setAttribute("position", new THREE.Float32BufferAttribute(P, 3)); crown.setAttribute("normal", new THREE.Float32BufferAttribute(N, 3)); crown.setAttribute("color", new THREE.Float32BufferAttribute(Cc, 3));
      // tajuk sederhana untuk jarak jauh: empat pelepah, satu segitiga masing-masing
      const P2 = [], N2 = [], C2 = [];
      for (let f = 0; f < 5; f++) {
        const a = (f / 5) * Math.PI * 2, c = green[f % 3], tip = [Math.cos(a) * 0.42, -0.05, Math.sin(a) * 0.42], l = [-Math.sin(a) * 0.12, 0.06, Math.cos(a) * 0.12];
        for (const q of [[0, 0.06, 0], [l[0] + tip[0] * 0.4, 0.12, l[2] + tip[2] * 0.4], tip, [0, 0.06, 0], tip, [-l[0] + tip[0] * 0.4, 0.12, -l[2] + tip[2] * 0.4]]) { P2.push(...q); N2.push(0, 1, 0); C2.push(c.r, c.g, c.b); }
      }
      const crownLo = new THREE.BufferGeometry();
      crownLo.setAttribute("position", new THREE.Float32BufferAttribute(P2, 3)); crownLo.setAttribute("normal", new THREE.Float32BufferAttribute(N2, 3)); crownLo.setAttribute("color", new THREE.Float32BufferAttribute(C2, 3));
      return { trunk, crown, crownLo };
    }
    const PG = palmGeos();
    const palmTrunkMat = new THREE.MeshStandardMaterial({ color: 0x7a6146, roughness: 1 });
    const palmCrownMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.85, side: THREE.DoubleSide });
    const palms = [];
    { let s5 = 13; const rr = () => (s5 = (s5 * 16807) % 2147483647) / 2147483647;
      const pgrid = new Map(), PGS = 12;
      const pfree = (e, n, r) => { for (let gx = Math.floor((e - r) / PGS); gx <= Math.floor((e + r) / PGS); gx++) for (let gy = Math.floor((n - r) / PGS); gy <= Math.floor((n + r) / PGS); gy++) { const l = pgrid.get(gx + "," + gy); if (l) for (const q of l) if (Math.hypot(q[0] - e, q[1] - n) < r) return false; } return true; };
      const addPalm = (e, n, minGap = 6) => {
        if (!pfree(e, n, minGap)) return false;
        if (kept(e, n, 3) || !hfree(e, n, 1.5) || roadDist(e, n)[0] < 2.5 || harrahW(e, n) > 0.3 || trenchD(e, n) < 16) return false;
        const [mt] = mountains(e, n); if (mt > 6) return false;
        const k = Math.floor(e / PGS) + "," + Math.floor(n / PGS); if (!pgrid.has(k)) pgrid.set(k, []); pgrid.get(k).push([e, n]);
        palms.push({ e, n, h: 7 + rr() * 8, lean: (rr() - 0.5) * 0.16, leanA: rr() * Math.PI * 2, rot: rr() * Math.PI * 2, s: 0.85 + rr() * 0.4, c: rr() });
        return true;
      };
      // kebun
      for (const K of KEB) {
        const b = K.bb, sp = 28 / Math.sqrt(Math.max(0.15, K.rapat));
        for (let e = b.x0; e < b.x1; e += sp) for (let n = b.y0; n < b.y1; n += sp) {
          const je = e + (rr() - 0.5) * sp * 0.9, jn = n + (rr() - 0.5) * sp * 0.9;
          if (polySigned(K, je, jn) < 0) continue;
          addPalm(je, jn, 6);
          if (rr() < 0.22) addPalm(je + (rr() - 0.5) * 8, jn + (rr() - 0.5) * 8, 4);   // rumpun anakan
        }
      }
      // sekitar rumah
      for (const hh of houses) if (hh.kind === "rumah" && rr() < 0.42) {
        const k = 1 + Math.floor(rr() * 3);
        for (let i = 0; i < k; i++) { const a = rr() * Math.PI * 2, r = hh.rad + 3 + rr() * 8; addPalm(hh.e + Math.cos(a) * r, hh.n + Math.sin(a) * r, 5); }
      }
      // tepi wadi
      for (const W of WAD) for (let k = 0; k < W.pts.length - 1; k++) {
        const [a, b] = W.pts[k], [c, d] = W.pts[k + 1], L = Math.hypot(c - a, d - b);
        for (let t = 0; t < L; t += 34) {
          if (rr() > 0.5) continue;
          const f = t / L, e = a + (c - a) * f, n = b + (d - b) * f, side = rr() < 0.5 ? -1 : 1, off = W.lebar / 2 + 8 + rr() * 50;
          const nx = -(d - b) / L, ny = (c - a) / L;
          if (Math.hypot(e, n) > 6500) continue;
          addPalm(e + nx * off * side, n + ny * off * side, 6);
        }
      }
    }
    const palmItemsT = [], palmItemsC = [];
    { const eu = new THREE.Euler(), q = new THREE.Quaternion(), q2 = new THREE.Quaternion(), sc = new THREE.Vector3(), p = new THREE.Vector3(), topv = new THREE.Vector3();
      const cA = new THREE.Color(0xffffff), cB = new THREE.Color(0xd8e0b0);
      for (const pl of palms) {
        const g = surfaceAt(pl.e, pl.n), hu = (pl.h * VX) / M;
        eu.set(Math.cos(pl.leanA) * pl.lean, 0, Math.sin(pl.leanA) * pl.lean); q.setFromEuler(eu);
        p.set(toX(pl.e), (g * VX) / M - 0.02, toZ(pl.n)); sc.set((pl.s * 1.6) / M, hu, (pl.s * 1.6) / M);
        palmItemsT.push({ e: pl.e, n: pl.n, y: p.y + hu, m: new THREE.Matrix4().compose(p, q, sc) });
        topv.set(0, hu, 0).applyQuaternion(q).add(p);
        q2.setFromAxisAngle(up, pl.rot); q2.premultiply(q);
        const cs = (pl.s * (4.8 + pl.h * 0.22)) / M;
        sc.set(cs * 1.0, cs * 0.9, cs * 1.0);
        palmItemsC.push({ e: pl.e, n: pl.n, y: topv.y + cs, m: new THREE.Matrix4().compose(topv.clone(), q2.clone(), sc.clone()), c: cA.clone().lerp(cB, pl.c * 0.6) });
      }
    }
    // LOD per petak: dekat = batang + tajuk detail; jauh = tajuk sederhana saja
    const palmT = chunked(PG.trunk, palmTrunkMat, palmItemsT, 1200, { cast: true }), palmHi = chunked(PG.crown, palmCrownMat, palmItemsC, 1200, { cast: true }),
      palmLo = chunked(PG.crownLo, palmCrownMat, palmItemsC, 1200, { cast: false });
    const palmMeshes = [...palmT, ...palmHi];
    const palmTiles = palmHi.map((m, i) => ({ hi: m, lo: palmLo[i], tr: palmT[i], c: m.geometry.boundingSphere.center }));
    let palmHigh = true;
    function palmLod() {
      const cp = camera.position;
      for (const t of palmTiles) {
        const near = Math.hypot(cp.x - t.c.x, cp.z - t.c.z) < 75 + (walk.on ? 0 : 0);
        t.hi.visible = near; t.tr.visible = near; t.lo.visible = !near;
        t.hi.castShadow = t.tr.castShadow = near && palmHigh;
      }
    }

    mark("kurma");
    // ---------- Bebatuan: basal di harrah, granit di Uhud ----------
    const rockItems = [];
    { let s3 = 5; const rr = () => (s3 = (s3 * 16807) % 2147483647) / 2147483647;
      const q = new THREE.Quaternion(), sc = new THREE.Vector3(), p = new THREE.Vector3(), eu = new THREE.Euler();
      const rb1 = new THREE.Color(0x231f1c), rb2 = new THREE.Color(0x4a3d33), rg1 = new THREE.Color(0x7a4a36), rg2 = new THREE.Color(0x9a6a50);
      let n = 0;
      for (let k = 0; k < 220000 && n < 5200; k++) {
        const e = -5500 + rr() * 11500, nn = -6000 + rr() * 13500, d = Math.hypot(e - 200, nn - 600);
        if (rr() > Math.exp(-d / 3000)) continue;
        const hw = harrahW(e, nn), [mt, uh] = mountains(e, nn);
        const pr = hw > 0.4 ? 0.5 : mt > 25 ? 0.3 : mt > 6 ? 0.08 : 0;
        if (rr() > pr || kept(e, nn, 4) || roadDist(e, nn)[0] < 2) continue;
        const sz = hw > 0.4 ? 0.6 + rr() * 2.6 : 1 + rr() * 4;
        eu.set(rr() * 3, rr() * 3, rr() * 3); q.setFromEuler(eu);
        sc.set((sz * (0.7 + rr() * 0.6)) / M, (sz * 0.55 * VX) / M, (sz * (0.7 + rr() * 0.6)) / M);
        p.set(toX(e), Y(e, nn) - (sz * 0.15 * VX) / M, toZ(nn));
        const c = hw > 0.4 && uh < 5 ? rb1.clone().lerp(rb2, rr()) : rg1.clone().lerp(rg2, rr());
        rockItems.push({ e, n: nn, y: p.y + sc.y, m: new THREE.Matrix4().compose(p, q, sc), c }); n++;
      }
    }
    const rockMeshes = chunked(new THREE.IcosahedronGeometry(1, 0), new THREE.MeshStandardMaterial({ roughness: 0.95, flatShading: true }), rockItems, 1500, { cast: true });

    // ---------- Langit ----------
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

    // ---------- Tabrakan ----------
    const GRID = 30, grid = new Map();
    const khCols = [];
    if (KHD) for (let k = 0; k < KHD.pts.length - 1; k++) {
      const [a, b] = KHD.pts[k], [c, d] = KHD.pts[k + 1], L = Math.hypot(c - a, d - b);
      for (let t = 0; t < L; t += 40) {
        const l = Math.min(40, L - t) + 2, f = (t + l / 2) / L, t2 = Math.atan2(-(c - a), d - b);
        khCols.push({ e: a + (c - a) * f, n: b + (d - b) * f, w: KHD.lebar, l, t: t2, court: 0, khandaq: true }); // l searah parit
      }
    }
    function rebuildGrid() {
      grid.clear();
      const add = (c) => {
        const r = Math.hypot(c.w, c.l + (c.court || 0)) / 2 + 2;
        for (let gx = Math.floor((c.e - r) / GRID); gx <= Math.floor((c.e + r) / GRID); gx++)
          for (let gy = Math.floor((c.n - r) / GRID); gy <= Math.floor((c.n + r) / GRID); gy++) {
            const k = gx + "," + gy; if (!grid.has(k)) grid.set(k, []); grid.get(k).push(c);
          }
      };
      houses.forEach(add);
      for (const en of named) if (alive(en.p, year)) en.cols.forEach(add);
      if (trenchOn()) khCols.forEach(add);
    }
    function blocked(e, n, rad = 1) {
      const list = grid.get(Math.floor(e / GRID) + "," + Math.floor(n / GRID)); if (!list) return false;
      for (const c of list) {
        const dx = e - c.e, dn = n - c.n, ct = Math.cos(c.t), st = Math.sin(c.t);
        const lx = dx * ct + dn * st, lz = dx * st - dn * ct;
        if (Math.abs(lx) < c.w / 2 + rad && lz > -c.l / 2 - rad && lz < c.l / 2 + (c.court || 0) + rad) {
          if (lz > c.l / 2 + rad && c.court) continue;
          return true;
        }
      }
      return false;
    }

    function setYear(y) {
      const oldY = year; year = y;
      for (const en of named) {
        const al = alive(en.p, y);
        for (const m of en.meshes) m.visible = al;
        if (en.update) en.update(y);
        const mk = markers[en.p.id]; if (mk) { mk.alive = al; mk.g.visible = al && !story.on; }
      }
      for (const gf of graveFields) {
        const al = aliveAt(gf.p, y), cnt = !al ? 0 : gf.perYear >= 999 ? gf.total : Math.min(gf.total, Math.round(3 + (y - gf.firstYear) * gf.perYear));
        gf.im.count = Math.max(0, cnt) * 2;
      }
      applyTrench(trenchOn());
      const tw = (yy) => SEEDS.filter((s) => s.yahudi && s.p && s.p.ada).map((s) => yy <= s.p.ada[1]).join();
      if (tw(oldY) !== tw(y)) for (const k of [...built.keys()]) dropCell(k);
      rebuildGrid(); refreshInstances();
    }

    // ---------- Kamera ----------
    const OV = { e: 300, n: 300, dist: 500, el: 0.95, az: 0 };
    const st = { az: -0.35, el: 0.85, dist: 70, target: new THREE.Vector3(toX(60), 0, toZ(150)) };
    const goal = { az: st.az, el: st.el, dist: st.dist, target: st.target.clone() };
    const walk = { on: false, e: 0, n: 0, yaw: 0, pitch: -0.05 };
    const keys = new Set();
    const el = renderer.domElement;
    const LIM = { e0: MID.e0 + 300, e1: MID.e1 - 300, n0: MID.n0 + 300, n1: MID.n1 - 300 };
    const clampT = (t) => { t.x = clamp(t.x, toX(LIM.e0), toX(LIM.e1)); t.z = clamp(t.z, toZ(LIM.n1), toZ(LIM.n0)); };
    function panBy(dx, dy) {
      const k = (2 * st.dist * Math.tan((camera.fov * Math.PI) / 360)) / Math.max(1, container.clientHeight);
      const ca = Math.cos(st.az), sa = Math.sin(st.az), ky = k / Math.max(0.45, Math.sin(st.el));
      goal.target.x += -ca * dx * k - sa * dy * ky; goal.target.z += sa * dx * k - ca * dy * ky;
      clampT(goal.target); st.target.x = goal.target.x; st.target.z = goal.target.z;
    }
    const MAXD = 560;
    window.SirahGestures({ THREE, el, camera, st, goal, minD: 2.2, maxD: MAXD, clamp: clampT, panBy,
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
      if (!p) { te = clamp(te, LIM.e0, LIM.e1); tn = clamp(tn, LIM.n0, LIM.n1); }
      const back = Math.hypot(te - center[0], tn - center[1]) > 1 ? Math.atan2(tn - center[1], te - center[0]) : -Math.PI / 2;
      let found = null;
      const r0 = !p ? 10 : p.jenis === "masjid" ? (p.id === "masjid-nabawi" ? 46 : 24) : p.jenis === "benteng" ? 44 : p.jenis === "rumah" ? (isHujrah(p) ? 9 : 22) : p.jenis === "gunung" ? 60 : 16;
      for (let r = r0; r < r0 + 200 && !found; r += 6)
        for (let a = 0; a < 12 && !found; a++) {
          const ang = back + Math.PI + (a % 2 ? 1 : -1) * Math.ceil(a / 2) * 0.35;
          const e = te + Math.cos(ang) * r, n = tn + Math.sin(ang) * r;
          if (!blocked(e, n, 2.5) && harrahW(e, n) < 0.8) found = [e, n];
        }
      if (!found) found = [center[0] - 40, center[1] - 50];
      walk.e = found[0]; walk.n = found[1]; walk.yaw = Math.atan2(te - walk.e, tn - walk.n); walk.pitch = 0.08; walk.on = true;
      camera.near = 0.01; camera.far = 420; camera.updateProjectionMatrix(); scene.fog.near = FOG_WALK[0]; scene.fog.far = FOG_WALK[1]; scene.fog.color.setHex(FOG_C_WALK); sky.visible = true;
    }
    function stopWalk() {
      if (!walk.on) return;
      walk.on = false; camera.near = 0.05; camera.far = 2400; camera.updateProjectionMatrix(); scene.fog.near = FOG_MAP[0]; scene.fog.far = FOG_MAP[1]; scene.fog.color.setHex(FOG_C_MAP); sky.visible = false;
      goal.target.set(toX(walk.e), Y(walk.e, walk.n), toZ(walk.n)); goal.dist = 9; goal.az = -walk.yaw; goal.el = 0.7;
      st.target.copy(goal.target); st.dist = 3; st.az = goal.az; st.el = 0.4;
    }

    function resize() { const w = container.clientWidth, h = container.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / Math.max(1, h); camera.updateProjectionMatrix(); }
    const ro = new ResizeObserver(resize); ro.observe(container); resize();

    const labels = {}; const v = new THREE.Vector3();
    const frustum = new THREE.Frustum(), pm4 = new THREE.Matrix4(), sphere = new THREE.Sphere();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let active = new Set(), selected = null, raf, t0 = performance.now(), last = t0, lastTick = 0;
    const DIRS = ["utara", "timur laut", "timur", "tenggara", "selatan", "barat daya", "barat", "barat laut"];
    const dirName = (ang) => DIRS[((Math.round(ang / (Math.PI / 4)) % 8) + 8) % 8];

    function stream(now) {
      if (now - lastTick < 200) return; lastTick = now;
      palmLod();
      const fe = walk.on ? walk.e : st.target.x * M, fn = walk.on ? walk.n : -st.target.z * M;
      const R = walk.on ? 190 : st.dist < 14 ? 160 : 0;
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
        if (p.jenis === "gunung" || p.jenis === "jalan" || !alive(p, year)) continue;
        const d = Math.hypot(p.e - walk.e, p.n - walk.n) - (p.jenis === "kawasan" ? 150 : p.jenis === "rumah" ? 6 : p.jenis === "masjid" ? 16 : p.jenis === "makam" ? 50 : 0);
        if (d < 45 && (!near || d < near.dist)) near = { id: p.id, dist: Math.max(0, Math.round(d)) };
      }
      const pd = Math.hypot(walk.e - center[0], walk.n - center[1]);
      onStatus({ walking: walk.on, detail, cells: built.size, near, facing: walk.on ? dirName(walk.yaw) : null,
        kabah: null, kiblat: walk.on ? "selatan" : null,
        pusat: walk.on ? { id: "masjid-nabawi", nama: "Masjid Nabawi", dist: Math.round(pd), dir: dirName(Math.atan2(center[0] - walk.e, center[1] - walk.n)) } : null });
    }

    function frame(now) {
      if (now < last) last = now;   // cap waktu rAF bisa lebih awal dari akhir pembangunan scene
      const t = (now - t0) / 1000, dtR = Math.min(0.3, (now - last) / 1000), dt = Math.min(0.05, dtR); last = now;
      const run = keys.has("shift") ? 3 : 1;
      if (walk.on) {
        const f = (keys.has("w") || keys.has("arrowup") ? 1 : 0) - (keys.has("s") || keys.has("arrowdown") ? 1 : 0);
        const sd = (keys.has("d") ? 1 : 0) - (keys.has("a") ? 1 : 0);
        walk.yaw += ((keys.has("arrowright") || keys.has("e") ? 1 : 0) - (keys.has("arrowleft") || keys.has("q") ? 1 : 0)) * dt * 1.6;
        if (f || sd) {
          const sp = 7 * run * dt, se = Math.sin(walk.yaw), cn = Math.cos(walk.yaw);
          const de = (se * f + cn * sd) * sp, dn = (cn * f - se * sd) * sp;
          const ne = clamp(walk.e + de, LIM.e0, LIM.e1), nn = clamp(walk.n + dn, LIM.n0, LIM.n1);
          if (!blocked(ne, nn)) { walk.e = ne; walk.n = nn; } else if (!blocked(ne, walk.n)) walk.e = ne; else if (!blocked(walk.e, nn)) walk.n = nn;
        }
        const eyeY = ((surfaceAt(walk.e, walk.n) + 1.7) * VX) / M;
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
        if (story.on) storyCamera(now); else { clampT(goal.target); goal.target.y = Y(goal.target.x * M, -goal.target.z * M) * 0.6; }
        const k = reduce ? 1 : 1 - Math.exp(-dtR * (story.on ? 2.4 : 5));
        if (story.on) { let da = goal.az - st.az; da = Math.atan2(Math.sin(da), Math.cos(da)); st.az += da * (1 - Math.exp(-dtR * 1.6)); } else st.az += (goal.az - st.az) * k; st.el += (goal.el - st.el) * k; st.dist += (goal.dist - st.dist) * (reduce ? 1 : 1 - Math.exp(-dtR * (story.on ? 2.4 : 11))); st.target.lerp(goal.target, k);
        camera.position.set(st.target.x + st.dist * Math.cos(st.el) * Math.sin(st.az), st.target.y + st.dist * Math.sin(st.el), st.target.z + st.dist * Math.cos(st.el) * Math.cos(st.az));
        camera.lookAt(st.target);
        const nearP = clamp(st.dist * 0.004, 0.05, 2), farP = Math.max(400, st.dist * 7 + 200);
        if (Math.abs(camera.near - nearP) > 0.01 || Math.abs(camera.far - farP) > 20) { camera.near = nearP; camera.far = farP; camera.updateProjectionMatrix(); }
      }
      camera.updateMatrixWorld();
      if (!walk.on) { scene.fog.near = st.dist * 2.4; scene.fog.far = st.dist * 6 + 40; }
      storyFrame(now, dtR);
      if (walk.on) { sky.position.copy(camera.position); updateSun(toX(walk.e), toZ(walk.n), 12); }
      else updateSun(st.target.x, st.target.z, Math.max(6, Math.min(40, st.dist * 0.95)));
      stream(now);

      const lodMax = st.dist < 9 ? 2 : st.dist < 80 ? 1 : 0;
      const W = container.clientWidth, H = container.clientHeight;
      for (const id in markers) {
        const m = markers[id], act = active.has(id), sel = id === selected;
        const scl = walk.on ? 0.3 : Math.min(14, Math.max(0.5, st.dist / 22));
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
          if (!m.alive) vis = false;
          else if (walk.on) { const d = Math.hypot(m.p.e - walk.e, m.p.n - walk.n); vis = m.p.jenis === "gunung" || m.p.jenis === "kawasan" ? d < 1600 : m.p.jenis === "jalan" ? d < 220 : d < 340; }
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

    // ---------- Mode cerita: aktor, malam, kamera (sama dengan peta Mekah) ----------
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
    function actorWorld(a, out) { out.set(toX(a.e), ((surfaceAt(a.e, a.n) + (a.up || 0)) * VX) / M, toZ(a.n)); return out; }
    const tv = new THREE.Vector3();
    function storyCamera() {
      const c = story.cam; if (!c) return;
      const a = c.follow && story.actors[c.follow];
      const e = a ? a.e : c.at[0], n = a ? a.n : c.at[1];
      goal.target.set(toX(e), ((surfaceAt(e, n) + (c.up || 3)) * VX) / M, toZ(n));
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
      story.lamps.forEach((l, i) => { const s = [lampA, lampB][i]; if (!s) return; s.visible = story.night > 0.3; s.position.set(toX(l[0]), ((surfaceAt(l[0], l[1]) + 2) * VX) / M, toZ(l[1])); s.scale.setScalar(Math.max(0.15, camD * 0.03) * (0.9 + 0.1 * Math.sin(now / 130 + i))); });
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
        for (const id in markers) markers[id].g.visible = markers[id].alive;
        renderer.domElement.classList.remove("story");
      },
      actor(id, o) { const a = story.actors[id] || (story.actors[id] = { e: 0, n: 0, up: 0, power: 0, vis: true }); Object.assign(a, o); a.anim = null; a.goal = null; },
      move(id, pts, from, to, dur) { const a = story.actors[id]; if (!a) return; a.goal = null; a.anim = { P: { pts }, from, to, t0: performance.now(), dur }; },
      glide(id, o) { const a = story.actors[id]; if (!a) return; a.anim = null; a.goal = { e: o.e ?? a.e, n: o.n ?? a.n, up: o.up ?? a.up, power: o.power ?? a.power }; },
      camera(c) { story.cam = c; },
      night(v) { story.nightGoal = v; },
      node(el2, o) { if (o) story.nodes.set(el2, o); else story.nodes.delete(el2); },
      heightAt: surfaceAt
    };

    const high0 = opts.quality !== false;
    renderer.shadowMap.enabled = high0; sun.castShadow = high0;
    rockMeshes.forEach((m) => (m.visible = high0));
    if (!high0) terrainMat.normalMap = null;
    setYear(year); mark("selesai");
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
        const j = m.p.jenis;
        goal.dist = Math.min(goal.dist, m.p.id === "uhud" ? 140 : j === "gunung" ? 70 : j === "kawasan" ? (/^harrah/.test(m.p.id) ? 160 : 70) : j === "jalan" ? 110 : m.p.id === "khandaq" ? 90 : j === "makam" ? 14 : m.p.lod === 2 ? 5 : 12);
      },
      overview() { selected = null; if (walk.on) return; goal.target.set(toX(OV.e), 0, toZ(OV.n)); goal.dist = OV.dist; goal.el = OV.el; goal.az = OV.az; },
      rotate(d) { if (walk.on) walk.yaw += d; else goal.az += d; },
      zoom(f) { if (!walk.on) goal.dist = Math.max(2.2, Math.min(MAXD, goal.dist * f)); },
      startWalk, stopWalk, story: storyApi,
      setQuality(high) {
        renderer.shadowMap.enabled = high; sun.castShadow = high;
        rockMeshes.forEach((m) => (m.visible = high));
        palmHigh = high; palmLod();
        terrainMat.normalMap = high ? groundTex.normal : null;
        scene.traverse((o) => { if (o.material) o.material.needsUpdate = true; });
      },
      press(k, on) { if (on) keys.add(k); else keys.delete(k); },
      dispose() {
        cancelAnimationFrame(raf); ro.disconnect();
        window.removeEventListener("keydown", kd); window.removeEventListener("keyup", ku); window.removeEventListener("blur", blur);
        for (const k of [...built.keys()]) dropCell(k);
        scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); });
        renderer.dispose(); el.remove();
      },
      // tambahan untuk uji dan integrasi
      debug: { surfaceAt, timing, counts: () => ({ houses: houses.length, palms: palms.length, rocks: rockItems.length, cells: cells.size }), camera, st, goal, renderer, scene }
    };
  }
  window.MadinahScene = { create };
})();
