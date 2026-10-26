// Simulasi perang: diorama meja pasir 3D per fase (PerangScene) dan pemutarnya (SirahSimulasi).
// Skenario dari perang-skenario.js (window.PERANG_SKENARIO); jumlah pasukan total dari perang.js (window.PERANG).
// Nabi ﷺ hanya tampil sebagai cahaya lembut bernama; malaikat tidak digambarkan. Korban hanya berupa angka dan barisan yang menipis.
(function () {
  const { useState, useEffect, useRef, useMemo } = React;
  const html = htm.bind(React.createElement);

  // ---------- Utilitas ----------
  function hash(x, y) { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); }
  function vnoise(x, y) {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  function fbm(x, y) { let s = 0, a = 0.5, f = 1; for (let i = 0; i < 4; i++) { s += a * vnoise(x * f, y * f); f *= 2.03; a *= 0.5; } return s; }
  function segDist(px, py, ax, ay, bx, by) {
    const dx = bx - ax, dy = by - ay, L = dx * dx + dy * dy || 1;
    const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / L));
    return Math.hypot(px - ax - t * dx, py - ay - t * dy);
  }
  function lineDist(px, py, pts) { let b = 1e9; for (let k = 0; k < pts.length - 1; k++) b = Math.min(b, segDist(px, py, ...pts[k], ...pts[k + 1])); return b; }
  function inPoly(x, y, poly) {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
    }
    return c;
  }
  function polyEdgeDist(x, y, poly) { return lineDist(x, y, [...poly, poly[0]]); }
  const smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const rad = (d) => (d * Math.PI) / 180;
  function rng(seed) { let s = (seed * 2654435761) % 2147483647 || 7; return () => (s = (s * 16807) % 2147483647) / 2147483647; }
  function polyLen(pts) { let L = 0; for (let k = 0; k < pts.length - 1; k++) L += Math.hypot(pts[k + 1][0] - pts[k][0], pts[k + 1][1] - pts[k][1]); return L; }
  function alongPoly(pts, d) {
    for (let k = 0; k < pts.length - 1; k++) {
      const [ax, ay] = pts[k], [bx, by] = pts[k + 1], L = Math.hypot(bx - ax, by - ay);
      if (d <= L || k === pts.length - 2) { const t = Math.min(1, d / (L || 1)); return [ax + (bx - ax) * t, ay + (by - ay) * t, Math.atan2(by - ay, bx - ax)]; }
      d -= L;
    }
    return [...pts[0], 0];
  }
  const NICE = [1, 2, 5, 10, 20, 25, 50, 100, 200];
  const fmt = (n) => (n == null ? "—" : Number(n).toLocaleString("id-ID"));

  const WARNA = {
    muslim: { jubah: 0xefe5cc, panji: 0x2e8b62, garis: 0x57c08a, css: "#57c08a" },
    musuh: { jubah: 0xa2503f, panji: 0x6e1f22, garis: 0xe0675a, css: "#e0675a" },
    netral: { jubah: 0x8f8a82, panji: 0x6f6a62, garis: 0xb9b5ad, css: "#b9b5ad" }
  };
  const JENIS = { infanteri: "Pejalan kaki", kavaleri: "Pasukan berkuda", pemanah: "Pemanah", unta: "Penunggang unta", pengintai: "Pengintai", benteng: "Pembela benteng", tawanan: "Tawanan", tokoh: "Tokoh" };
  const FORMASI = { shaf: "barisan (shaf)", kolom: "barisan berjalan", lingkar: "melingkar", tersebar: "tersebar", bertahan: "bertahan", garis: "sepanjang garis" };

  // ---------- Medan ----------
  function makeHeight(md) {
    const F = md.fitur || [], rough = md.kasar == null ? 5 : md.kasar;
    const hills = F.filter((f) => f.jenis === "gunung" || f.jenis === "bukit" || f.jenis === "lereng");
    const dunes = F.filter((f) => f.jenis === "bukit-pasir");
    const harrah = F.filter((f) => f.jenis === "harrah");
    const wadi = F.filter((f) => f.jenis === "wadi");
    return function h(x, y) {
      let z = fbm(x / 500 + 3, y / 500 + 7) * rough * 2 + fbm(x / 90, y / 90) * rough * 0.35, rock = 0, black = 0, wet = 0;
      for (const f of hills) {
        const d = f.ridge ? segDist(x, y, ...f.ridge[0], ...f.ridge[1]) : Math.hypot(x - f.pos[0], y - f.pos[1]);
        const w = f.ridge ? (f.lebar || 400) / 2 : f.r || 200;
        const k = Math.exp(-((d / w) ** 2) * 1.3);
        if (k < 0.002) continue;
        const v = f.h * k * (0.78 + 0.44 * fbm(x / 160 + f.h, y / 160));
        z += v; rock = Math.max(rock, Math.min(1, (v / Math.max(20, f.h)) * 1.1));
      }
      for (const f of dunes) {
        const d = Math.hypot(x - f.pos[0], y - f.pos[1]), r = f.r || 200;
        if (d > r * 1.8) continue;
        z += f.h * Math.exp(-((d / r) ** 2)) * (0.7 + 0.3 * Math.sin((x * 0.8 + y * 0.6) / 28 + fbm(x / 80, y / 80) * 4));
      }
      for (const f of harrah) {
        if (inPoly(x, y, f.poly)) { const e = smooth(0, 120, polyEdgeDist(x, y, f.poly)); z += (f.h || 8) * e * (0.6 + 0.8 * fbm(x / 45, y / 45)); black = Math.max(black, 0.4 + 0.6 * e); }
      }
      for (const f of wadi) {
        const d = lineDist(x, y, f.pts), w = (f.lebar || 80);
        if (d < w * 2) { const k = smooth(w * 1.5, w * 0.2, d); z -= (f.dalam || 3) * k; wet = Math.max(wet, k); }
      }
      return { z, rock, black, wet };
    };
  }

  // ---------- Geometri sosok (sederhana, tanpa wajah realistis) ----------
  function mergeParts(THREE, parts) {
    const p = [], n = [], c = [];
    parts.forEach(([g, col, m]) => {
      const gg = g.index ? g.toNonIndexed() : g; gg.applyMatrix4(m); gg.computeVertexNormals();
      const P = gg.attributes.position.array, N = gg.attributes.normal.array, cc = new THREE.Color(col);
      for (let i = 0; i < P.length; i += 3) { p.push(P[i], P[i + 1], P[i + 2]); n.push(N[i], N[i + 1], N[i + 2]); c.push(cc.r, cc.g, cc.b); }
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(p, 3));
    geo.setAttribute("normal", new THREE.Float32BufferAttribute(n, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(c, 3));
    return geo;
  }
  function figureGeos(THREE) {
    const M = (x, y, z, rx = 0, ry = 0, rz = 0, s = 1) => new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)), new THREE.Vector3(s, s, s));
    const W = 0xffffff, SKIN = 0xc99a72, WOOD = 0x6b4a2e, IRON = 0x9aa0a6, HORSE = 0x6e4a32, CAMEL = 0xc49a62;
    const robe = (y = 0) => [[new THREE.CylinderGeometry(0.016, 0.027, 0.058, 7), W, M(0, 0.029 + y, 0)], [new THREE.SphereGeometry(0.019, 7, 5, 0, Math.PI * 2, 0, Math.PI / 2), W, M(0, 0.07 + y, 0)]];
    const head = (y = 0) => [[new THREE.SphereGeometry(0.0165, 8, 6), SKIN, M(0, 0.077 + y, 0)]];
    const spear = [[new THREE.CylinderGeometry(0.0022, 0.0022, 0.12, 4), WOOD, M(0.024, 0.06, 0.004)], [new THREE.ConeGeometry(0.005, 0.014, 4), IRON, M(0.024, 0.126, 0.004)]];
    const bow = [[new THREE.TorusGeometry(0.03, 0.0026, 3, 10, Math.PI), WOOD, M(0.022, 0.06, 0.008, 0, Math.PI / 2, Math.PI / 2)]];
    const horse = [[new THREE.BoxGeometry(0.028, 0.03, 0.075), HORSE, M(0, 0.05, 0)], [new THREE.BoxGeometry(0.024, 0.036, 0.06), HORSE, M(0, 0.018, 0)],
      [new THREE.BoxGeometry(0.016, 0.042, 0.018), HORSE, M(0, 0.074, 0.038, -0.5)], [new THREE.BoxGeometry(0.014, 0.016, 0.03), HORSE, M(0, 0.09, 0.052, 0.3)]];
    const camel = [[new THREE.BoxGeometry(0.03, 0.032, 0.08), CAMEL, M(0, 0.072, 0)], [new THREE.BoxGeometry(0.024, 0.056, 0.06), CAMEL, M(0, 0.028, 0)],
      [new THREE.SphereGeometry(0.019, 6, 5), CAMEL, M(0, 0.09, -0.004)], [new THREE.BoxGeometry(0.012, 0.05, 0.014), CAMEL, M(0, 0.095, 0.045, -0.35)], [new THREE.BoxGeometry(0.012, 0.014, 0.028), CAMEL, M(0, 0.12, 0.058)]];
    const up = (parts, y) => parts.map(([g, c, m]) => [g, c, new THREE.Matrix4().makeTranslation(0, y, 0).multiply(m)]);
    const T = {
      infanteri: { a: robe(), b: [...head(), ...spear] },
      pengintai: { a: robe(), b: [...head()] },
      benteng: { a: robe(), b: [...head(), ...spear] },
      tawanan: { a: robe(), b: [...head()] },
      pemanah: { a: robe(), b: [...head(), ...bow] },
      kavaleri: { a: up(robe(), 0.05).map(([g, c, m]) => [g, c, m.clone().scale(new THREE.Vector3(0.85, 0.85, 0.85))]), b: [...horse, ...up(head(), 0.043), [new THREE.CylinderGeometry(0.0022, 0.0022, 0.13, 4), WOOD, M(0.022, 0.11, 0.01, 0.25)]] },
      unta: { a: up(robe(), 0.085).map(([g, c, m]) => [g, c, m.clone().scale(new THREE.Vector3(0.85, 0.85, 0.85))]), b: [...camel, ...up(head(), 0.075)] },
      tokoh: { a: robe(), b: [...spear] }
    };
    const out = {};
    for (const k in T) out[k] = { a: mergeParts(THREE, T[k].a), b: mergeParts(THREE, T[k].b) };
    return out;
  }
  function faceTexture(THREE) {
    const c = document.createElement("canvas"); c.width = 128; c.height = 64; const g = c.getContext("2d");
    g.fillStyle = "#c99a72"; g.fillRect(0, 0, 128, 64);
    // Wajah di u≈0.25 (menghadap +z): dua titik mata dan garis mulut
    g.fillStyle = "#2a1d16"; g.beginPath(); g.arc(26, 30, 3.2, 0, 7); g.arc(38, 30, 3.2, 0, 7); g.fill();
    g.strokeStyle = "#2a1d16"; g.lineWidth = 2.2; g.beginPath(); g.moveTo(28, 40); g.lineTo(36, 40); g.stroke();
    const t = new THREE.CanvasTexture(c); return t;
  }
  function glowTexture(THREE, stops) {
    const c = document.createElement("canvas"); c.width = c.height = 128; const g = c.getContext("2d");
    const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64); stops.forEach(([o, col]) => gr.addColorStop(o, col));
    g.fillStyle = gr; g.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(c);
  }

  // ---------- Formasi (offset dalam satuan adegan) ----------
  function formasiOffsets(n, f, spacing, seed, radiusSU) {
    const out = [], r = rng(seed + n * 13);
    const jit = () => (r() - 0.5) * spacing * 0.35;
    if (f === "lingkar") {
      const R = radiusSU || Math.max(spacing * 2, (n * spacing) / (2 * Math.PI) / 1.6);
      let placed = 0, ring = 0;
      while (placed < n) {
        const rr = R + ring * spacing * 0.9, cap = Math.max(6, Math.floor((2 * Math.PI * rr) / (spacing * 0.95)));
        for (let k = 0; k < cap && placed < n; k++, placed++) { const a = (k / cap) * Math.PI * 2 + ring * 0.3; out.push([Math.cos(a) * rr + jit() * 0.4, Math.sin(a) * rr + jit() * 0.4, a]); }
        ring++;
      }
      return out;
    }
    if (f === "tersebar") {
      const R = Math.sqrt(n) * spacing * 1.35;
      for (let k = 0; k < n; k++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * R; out.push([Math.cos(a) * d, Math.sin(a) * d * 0.8, (r() - 0.5) * 1.6]); }
      return out;
    }
    const cols = f === "kolom" ? Math.max(2, Math.round(Math.sqrt(n / 5))) : f === "bertahan" ? Math.ceil(Math.sqrt(n * 1.4)) : Math.ceil(Math.sqrt(n * 6));
    const rows = Math.ceil(n / cols), sp = f === "bertahan" ? spacing * 0.85 : spacing;
    for (let k = 0; k < n; k++) {
      const cx = k % cols, ry = Math.floor(k / cols), inRow = Math.min(cols, n - ry * cols);
      out.push([(cx - (inRow - 1) / 2) * sp + jit(), (ry - (rows - 1) / 2) * sp * (f === "kolom" ? 1.05 : 1.15) + jit(), 0]);
    }
    return out; // [kanan, belakang, putaran tambahan]
  }

  // ---------- Diorama ----------
  function create(container, sk, opts = {}) {
    const THREE = window.THREE;
    const md = sk.medan, [WM, HM] = md.ukuran;
    const S = 24 / Math.max(WM, HM), VX = md.vertikal || 1.25, FS = 2.3; // FS: skala figur agar terbaca di meja
    const hgt = makeHeight(md);
    const toX = (x) => x * S, toZ = (y) => -y * S;
    const heightSU = (xm, ym) => (hgt(xm, ym).z * VX * S);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.05, 300);
    scene.add(new THREE.HemisphereLight(0xdbe2ff, 0x3a2a1a, 0.5));
    const sun = new THREE.DirectionalLight(0xffe2b0, 1.15); sun.position.set(-12, 9, 6); scene.add(sun);
    const fill = new THREE.DirectionalLight(0x9fb4ff, 0.18); fill.position.set(8, 6, -6); scene.add(fill);

    // Tanah
    const segX = Math.round(230 * (WM / Math.max(WM, HM))), segZ = Math.round(230 * (HM / Math.max(WM, HM)));
    const geo = new THREE.PlaneGeometry(WM * S, HM * S, segX, segZ); geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position, col = new Float32Array(pos.count * 3);
    const SAND = new THREE.Color(md.warna || 0xc9a676), DUNE = new THREE.Color(0xdcc093), ROCK = new THREE.Color(0x7a5a44), DARK = new THREE.Color(0x4b382d),
      BLACK = new THREE.Color(0x2d2724), WADI = new THREE.Color(0xd8c39b), GARDEN = new THREE.Color(0x8f8a55), ROAD = new THREE.Color(0xe2cda4), tmp = new THREE.Color();
    const roads = (md.fitur || []).filter((f) => f.jenis === "jalan"), gardens = (md.fitur || []).filter((f) => f.jenis === "kebun");
    const dunes = (md.fitur || []).filter((f) => f.jenis === "bukit-pasir");
    for (let i = 0; i < pos.count; i++) {
      const xm = pos.getX(i) / S, ym = -pos.getZ(i) / S, r = hgt(xm, ym);
      const ex = Math.min(xm + WM / 2, WM / 2 - xm) * S, ez = Math.min(ym + HM / 2, HM / 2 - ym) * S;
      const edge = Math.min(1, Math.min(ex, ez) / 0.35);
      pos.setY(i, r.z * VX * S * edge - (1 - edge) * 0.35);
      const n = fbm(xm / 60, ym / 60);
      tmp.copy(SAND).multiplyScalar(0.92 + 0.14 * n);
      for (const f of dunes) { const d = Math.hypot(xm - f.pos[0], ym - f.pos[1]); if (d < (f.r || 200) * 1.3) tmp.lerp(DUNE, smooth((f.r || 200) * 1.3, (f.r || 200) * 0.4, d) * 0.8); }
      if (r.wet > 0) tmp.lerp(WADI, r.wet * 0.7);
      if (r.rock > 0) { tmp.lerp(ROCK, Math.min(0.85, r.rock * 0.9)); if (r.rock > 0.75) tmp.lerp(DARK, (r.rock - 0.75) * 1.2); }
      if (r.black > 0) tmp.lerp(BLACK, r.black * 0.85);
      for (const f of gardens) if (f.poly ? inPoly(xm, ym, f.poly) : Math.hypot(xm - f.pos[0], ym - f.pos[1]) < (f.r || 200)) tmp.lerp(GARDEN, 0.45);
      for (const f of roads) { const d = lineDist(xm, ym, f.pts); const w = (f.lebar || 30); if (d < w) tmp.lerp(ROAD, smooth(w, w * 0.2, d) * 0.55); }
      col.set([tmp.r, tmp.g, tmp.b], i * 3);
    }
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3)); geo.computeVertexNormals();
    scene.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.96 })));
    const base = new THREE.Mesh(new THREE.BoxGeometry(WM * S + 0.5, 0.6, HM * S + 0.5), new THREE.MeshStandardMaterial({ color: 0x1a2550, roughness: 0.6, metalness: 0.3 }));
    base.position.y = -0.7; scene.add(base);
    const trim = new THREE.Mesh(new THREE.BoxGeometry(WM * S + 0.58, 0.05, HM * S + 0.58), new THREE.MeshStandardMaterial({ color: 0xc9a24a, roughness: 0.35, metalness: 0.8 }));
    trim.position.y = -0.4; scene.add(trim);

    // Fitur medan
    const featObjs = {}, forts = [], walls = [];
    const fitur = md.fitur || [];
    const Y = (xm, ym) => heightSU(xm, ym);
    const mat = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.9, ...o });
    fitur.forEach((f, fi) => {
      const g = new THREE.Group(); let anchorY = null;
      const at = (xm, ym, obj, dy = 0) => { obj.position.set(toX(xm), Y(xm, ym) + dy, toZ(ym)); g.add(obj); return obj; };
      if (f.jenis === "kebun") {
        const R = rng(fi + 3), cnt = Math.min(700, f.jumlah || Math.round((f.poly ? 220 : Math.PI * (f.r || 200) ** 2 / 9000) * (f.rapat || 1)));
        const trunkG = new THREE.CylinderGeometry(0.004, 0.007, 0.13, 5); trunkG.translate(0, 0.065, 0);
        const crownG = new THREE.ConeGeometry(0.05, 0.035, 6, 1, true); crownG.rotateX(Math.PI); crownG.translate(0, 0.14, 0);
        const tr = new THREE.InstancedMesh(trunkG, mat(0x6b4f35), cnt), cr = new THREE.InstancedMesh(crownG, mat(0x3f6b3a, { side: THREE.DoubleSide }), cnt);
        const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), p3 = new THREE.Vector3();
        let bb = f.poly ? f.poly.reduce((b, [x, y]) => [Math.min(b[0], x), Math.min(b[1], y), Math.max(b[2], x), Math.max(b[3], y)], [1e9, 1e9, -1e9, -1e9]) : [f.pos[0] - f.r, f.pos[1] - f.r, f.pos[0] + f.r, f.pos[1] + f.r];
        let k = 0;
        for (let t = 0; t < cnt * 8 && k < cnt; t++) {
          const xm = bb[0] + R() * (bb[2] - bb[0]), ym = bb[1] + R() * (bb[3] - bb[1]);
          if (f.poly ? !inPoly(xm, ym, f.poly) : Math.hypot(xm - f.pos[0], ym - f.pos[1]) > f.r) continue;
          const s = 0.7 + R() * 0.6; q.setFromEuler(new THREE.Euler((R() - 0.5) * 0.25, R() * 6, (R() - 0.5) * 0.25));
          m4.compose(p3.set(toX(xm), Y(xm, ym), toZ(ym)), q, sc.set(s, s, s)); tr.setMatrixAt(k, m4); cr.setMatrixAt(k, m4); k++;
        }
        tr.count = cr.count = k; g.add(tr, cr);
      } else if (f.jenis === "sumur" || f.jenis === "mataair") {
        const big = f.jenis === "mataair" ? 2.2 : 1;
        at(f.pos[0], f.pos[1], new THREE.Mesh(new THREE.TorusGeometry(0.05 * big, 0.016, 5, 14), mat(0x8a7b6a)), 0.01).rotation.x = Math.PI / 2;
        const w = at(f.pos[0], f.pos[1], new THREE.Mesh(new THREE.CircleGeometry(0.045 * big, 16), new THREE.MeshStandardMaterial({ color: 0x3f7fb8, roughness: 0.2, metalness: 0.2 })), 0.015);
        w.rotation.x = -Math.PI / 2; g.userData.air = w;
        const mound = at(f.pos[0], f.pos[1], new THREE.Mesh(new THREE.SphereGeometry(0.05 * big, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), mat(0xcfb385)), 0); mound.scale.y = 0.5; mound.visible = false; g.userData.timbun = mound;
      } else if (f.jenis === "naungan") {
        const post = new THREE.CylinderGeometry(0.004, 0.004, 0.1, 4);
        [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => { const m = new THREE.Mesh(post, mat(0x6b4a2e)); m.position.set(toX(f.pos[0]) + a * 0.045, Y(...f.pos) + 0.05, toZ(f.pos[1]) + b * 0.035); g.add(m); });
        at(f.pos[0], f.pos[1], new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.012, 0.1), mat(0x8a7a3a)), 0.105);
      } else if (f.jenis === "kemah" || f.jenis === "kota" || f.jenis === "ternak") {
        const R = rng(fi + 11), r = f.r || 150, cnt = Math.min(f.jenis === "kota" ? 380 : 160, f.jumlah || Math.round((r * r) / (f.jenis === "kota" ? 2600 : 2300)) + 6);
        const gg = f.jenis === "kemah" ? new THREE.ConeGeometry(0.03, 0.045, 5) : f.jenis === "kota" ? new THREE.BoxGeometry(0.06, 0.05, 0.06) : new THREE.BoxGeometry(0.016, 0.014, 0.026);
        gg.translate(0, f.jenis === "kemah" ? 0.0225 : f.jenis === "kota" ? 0.025 : 0.012, 0);
        const im = new THREE.InstancedMesh(gg, mat(0xffffff), cnt), m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), p3 = new THREE.Vector3();
        const pal = f.jenis === "kemah" ? (f.warna === "gelap" ? [0x6e4d3a, 0x5a3f31, 0x7d5a44] : [0xd9c8a4, 0xc7b086, 0xb89a6e]) : f.jenis === "kota" ? [0xcdb89a, 0xbfa785, 0xd8c7a8, 0xa98f6e] : [0xe9e1d0, 0x7a5636, 0x3a2c22];
        for (let k = 0; k < cnt; k++) {
          const a = R() * Math.PI * 2, d = Math.sqrt(R()) * r, xm = f.pos[0] + Math.cos(a) * d, ym = f.pos[1] + Math.sin(a) * d;
          const s = f.jenis === "kota" ? 0.7 + R() * 0.8 : 0.8 + R() * 0.5;
          q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), R() * 3);
          m4.compose(p3.set(toX(xm), Y(xm, ym), toZ(ym)), q, sc.set(s, f.jenis === "kota" ? 0.6 + R() * 0.9 : s, s)); im.setMatrixAt(k, m4);
          im.setColorAt(k, tmp.setHex(pal[Math.floor(R() * pal.length)]));
        }
        g.add(im);
      } else if (f.jenis === "benteng") {
        const [w, l, hh] = f.ukuran || [60, 60, 14];
        const Wd = Math.max(0.16, w * S), Ld = Math.max(0.16, l * S), Hd = Math.max(0.14, hh * S * VX * 1.6);
        const gy = Y(...f.pos);
        const body = new THREE.Mesh(new THREE.BoxGeometry(Wd, Hd, Ld), mat(f.warna || 0x9c8468)); body.position.set(toX(f.pos[0]), gy + Hd / 2, toZ(f.pos[1])); g.add(body);
        const cg = new THREE.BoxGeometry(0.018, 0.022, 0.018);
        for (let k = 0; k < 4; k++) for (let j = 0; j < 5; j++) {
          const t = (j + 0.5) / 5, side = k % 2 ? Ld : Wd, m = new THREE.Mesh(cg, mat(f.warna || 0x9c8468));
          const off = (t - 0.5) * side;
          const px = k === 0 ? off : k === 1 ? Wd / 2 : k === 2 ? -off : -Wd / 2, pz = k === 0 ? Ld / 2 : k === 1 ? off : k === 2 ? -Ld / 2 : -off;
          m.position.set(toX(f.pos[0]) + px, gy + Hd + 0.011, toZ(f.pos[1]) + pz); g.add(m);
        }
        forts.push({ x: toX(f.pos[0]), z: toZ(f.pos[1]), w: Wd, l: Ld, top: gy + Hd });
        anchorY = gy + Hd + 0.05;
      } else if (f.jenis === "tembok") {
        const pts = f.tutup === false ? f.pts : [...f.pts, f.pts[0]], H = Math.max(0.07, (f.h || 8) * S * VX * 1.6), T = 0.03;
        for (let k = 0; k < pts.length - 1; k++) {
          const [ax, ay] = pts[k], [bx, by] = pts[k + 1], L = Math.hypot(bx - ax, by - ay) * S, mx = (ax + bx) / 2, my = (ay + by) / 2;
          const seg = new THREE.Mesh(new THREE.BoxGeometry(L, H, T), mat(f.warna || 0xa58b6c));
          seg.position.set(toX(mx), Y(mx, my) + H / 2, toZ(my)); seg.rotation.y = Math.atan2(by - ay, bx - ax); g.add(seg);
          const tw = new THREE.Mesh(new THREE.BoxGeometry(0.05, H * 1.4, 0.05), mat(f.warna || 0xa58b6c)); tw.position.set(toX(ax), Y(ax, ay) + H * 0.7, toZ(ay)); g.add(tw);
          walls.push({ a: [toX(ax), toZ(ay)], b: [toX(bx), toZ(by)], top: Y(mx, my) + H });
        }
      } else if (f.jenis === "parit") {
        const pts = f.pts, w = Math.max(0.05, (f.lebar || 9) * S * 3), samples = [];
        const L = polyLen(pts), n = Math.max(2, Math.round(L * S / 0.04));
        for (let k = 0; k <= n; k++) samples.push(alongPoly(pts, (k / n) * L));
        const P = [];
        for (let k = 0; k < samples.length - 1; k++) {
          const [ax, ay, aa] = samples[k], [bx, by, ba] = samples[k + 1];
          const nx = (a) => [Math.sin(a) * (w / 2) / S, -Math.cos(a) * (w / 2) / S];
          const [nax, nay] = nx(aa), [nbx, nby] = nx(ba);
          const quad = [[ax + nax, ay + nay], [ax - nax, ay - nay], [bx - nbx, by - nby], [bx + nbx, by + nby]];
          const v = quad.map(([x, y]) => [toX(x), Y(x, y) + 0.006, toZ(y)]);
          P.push(...v[0], ...v[1], ...v[2], ...v[0], ...v[2], ...v[3]);
        }
        const gg = new THREE.BufferGeometry(); gg.setAttribute("position", new THREE.Float32BufferAttribute(P, 3)); gg.computeVertexNormals();
        g.add(new THREE.Mesh(gg, new THREE.MeshBasicMaterial({ color: 0x241a14, side: THREE.DoubleSide })));
        const edge = new THREE.Line(new THREE.BufferGeometry().setFromPoints(samples.map(([x, y]) => new THREE.Vector3(toX(x), Y(x, y) + 0.012, toZ(y)))), new THREE.LineBasicMaterial({ color: 0xe0c48a }));
        g.add(edge);
      } else if (f.jenis === "kabah") {
        const k = at(f.pos[0], f.pos[1], new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.11, 0.085), mat(0x141414)), 0.055);
        const band = new THREE.Mesh(new THREE.BoxGeometry(0.102, 0.012, 0.087), mat(0xc9a24a, { metalness: 0.6, roughness: 0.4 })); band.position.copy(k.position); band.position.y += 0.025; g.add(band);
        anchorY = Y(...f.pos) + 0.14;
      } else if (f.jenis === "berhala") {
        const R = rng(fi), n = f.jumlah || 60, r = (f.r || 40) * S + 0.09;
        const im = new THREE.InstancedMesh(new THREE.BoxGeometry(0.008, 0.026, 0.008).translate(0, 0.013, 0), mat(0x6a6058), n), m4 = new THREE.Matrix4();
        for (let k = 0; k < n; k++) { const a = (k / n) * Math.PI * 2, rr = r * (0.85 + R() * 0.35); m4.makeTranslation(toX(f.pos[0]) + Math.cos(a) * rr, Y(...f.pos), toZ(f.pos[1]) + Math.sin(a) * rr); im.setMatrixAt(k, m4); }
        g.add(im);
      } else if (f.jenis === "manjaniq") {
        const fr = new THREE.Group(), wm = mat(0x6b4a2e);
        const b1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.01, 0.05), wm); b1.position.y = 0.005; fr.add(b1);
        [-1, 1].forEach((s) => { const p = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.07, 0.008), wm); p.position.set(0, 0.035, s * 0.02); fr.add(p); });
        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.006, 0.006), wm); arm.position.y = 0.07; arm.rotation.z = 0.5; fr.add(arm);
        fr.rotation.y = rad(-(f.arah || 0)); at(f.pos[0], f.pos[1], fr);
      } else if (f.jenis === "masjid") {
        const m = at(f.pos[0], f.pos[1], new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.03, 0.12), mat(0xd8c7a0)), 0.015);
        anchorY = m.position.y + 0.05;
      }
      if (anchorY == null) {
        const p = f.pos || (f.pts && alongPoly(f.pts, polyLen(f.pts) * (f.labelT == null ? 0.5 : f.labelT))) || (f.poly && f.poly.reduce((a, [x, y]) => [a[0] + x / f.poly.length, a[1] + y / f.poly.length], [0, 0])) || (f.ridge && [(f.ridge[0][0] + f.ridge[1][0]) / 2, (f.ridge[0][1] + f.ridge[1][1]) / 2]);
        const lp = f.labelPos || p;
        const extra = f.jenis === "gunung" || f.jenis === "bukit" ? 0.06 : 0.04;
        anchorY = lp ? Y(lp[0], lp[1]) + extra : 0.1;
        g.userData.anchor = lp ? new THREE.Vector3(toX(lp[0]), anchorY, toZ(lp[1])) : null;
      } else {
        const lp = f.labelPos || f.pos;
        g.userData.anchor = new THREE.Vector3(toX(lp[0]), anchorY, toZ(lp[1]));
      }
      scene.add(g); featObjs[f.id || "f" + fi] = { f, g };
    });
    const surfaceY = (x, z) => {
      let y = heightSU(x / S, -z / S);
      for (const f of forts) if (Math.abs(x - f.x) < f.w / 2 + 0.01 && Math.abs(z - f.z) < f.l / 2 + 0.01) y = Math.max(y, f.top);
      for (const w of walls) if (segDist(x, z, ...w.a, ...w.b) < 0.03) y = Math.max(y, w.top);
      return y;
    };

    // Satuan pasukan
    const units = sk.unit || [];
    const tot = units.reduce((s, u) => s + (u.jenis === "tokoh" ? 0 : (u.jumlah != null ? u.jumlah : u.ilustrasi || 0)), 0);
    const per = sk.perFigur || NICE.find((v) => v >= tot / 520) || 200;
    const G = figureGeos(THREE), faceTex = faceTexture(THREE);
    const U = {};
    const robeMat = new THREE.MeshStandardMaterial({ roughness: 0.85 }), partMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.85 });
    const headMat = new THREE.MeshStandardMaterial({ map: faceTex, roughness: 0.8 });
    units.forEach((u, ui) => {
      const base = u.jumlah != null ? u.jumlah : u.ilustrasi || 50;
      const tokoh = u.jenis === "tokoh", geos = G[u.jenis] || G.infanteri, side = WARNA[u.sisi] || WARNA.netral;
      const nf = tokoh ? 1 : Math.max(2, Math.min(260, Math.round(base / per)));
      const a = new THREE.InstancedMesh(geos.a, robeMat, nf), b = new THREE.InstancedMesh(geos.b, partMat, nf);
      const tint = new THREE.Color(u.warna || side.jubah), R = rng(ui + 1);
      for (let i = 0; i < nf; i++) a.setColorAt(i, tmp.copy(tint).multiplyScalar(0.9 + R() * 0.18));
      if (tokoh) a.setColorAt(0, tmp.setHex(u.sisi === "musuh" ? 0x7b2b22 : 0xd9b45a));
      scene.add(a, b);
      let face = null;
      if (tokoh) { face = new THREE.Mesh(new THREE.SphereGeometry(0.0165, 12, 9), headMat); scene.add(face); }
      const flag = new THREE.Group();
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.0035, 0.0035, 0.2, 5), mat(0x5a3f2c)); pole.position.y = 0.1; flag.add(pole);
      const cloth = new THREE.Mesh(new THREE.PlaneGeometry(0.075, 0.045, 6, 1), new THREE.MeshStandardMaterial({ color: side.panji, side: THREE.DoubleSide, roughness: 0.8 }));
      cloth.position.set(0.04, 0.175, 0); flag.add(cloth); flag.visible = !tokoh && u.panji !== false; scene.add(flag);
      const ringM = new THREE.MeshBasicMaterial({ color: 0xf2d27a, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false });
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.9, 1, 48), ringM); ring.rotation.x = -Math.PI / 2; scene.add(ring);
      const outline = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints([0, 1, 2, 3].map(() => new THREE.Vector3())), new THREE.LineBasicMaterial({ color: side.garis, transparent: true, opacity: 0 }));
      scene.add(outline);
      const spacing = (u.jenis === "kavaleri" || u.jenis === "unta" ? 0.11 : 0.075) * FS;
      flag.scale.setScalar(FS * 0.75);
      U[u.id] = { u, nf, base, a, b, face, flag, cloth, ring, ringM, outline, spacing, scale: (tokoh ? 1.6 : 1) * FS,
        cur: new Float32Array(nf * 4), from: new Float32Array(nf * 4), to: new Float32Array(nf * 4), delay: new Float32Array(nf).map(() => R() * 0.35),
        vis: new Float32Array(nf), visFrom: new Float32Array(nf), visTo: new Float32Array(nf), centre: new THREE.Vector3(), centreFrom: new THREE.Vector3(), centreTo: new THREE.Vector3(),
        aktif: false, jumlah: base, state: null, init: false };
    });

    // Cahaya Rasulullah ﷺ (tanpa sosok)
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(THREE, [[0, "rgba(255,248,220,1)"], [0.25, "rgba(255,236,170,.75)"], [1, "rgba(255,220,140,0)"]]), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    glow.scale.set(0.9, 0.9, 1); scene.add(glow);
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.09, 1.1, 16, 1, true), new THREE.MeshBasicMaterial({ color: 0xfff1c4, transparent: true, opacity: 0.22, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
    scene.add(beam);
    const rasul = { on: false, cur: new THREE.Vector3(), from: new THREE.Vector3(), to: new THREE.Vector3(), op: 0, opFrom: 0, opTo: 0 };

    // Panah gerakan
    const arrowGroup = new THREE.Group(); scene.add(arrowGroup);
    function buildArrows(list) {
      arrowGroup.children.slice().forEach((c) => { arrowGroup.remove(c); c.geometry.dispose(); c.material.dispose(); });
      (list || []).forEach((p) => {
        const [from, to, sisi] = Array.isArray(p) ? p : [p.dari, p.ke, p.sisi];
        const lengkung = (!Array.isArray(p) && p.lengkung != null) ? p.lengkung : 0.18;
        const mid = p.lewat || [(from[0] + to[0]) / 2 + (to[1] - from[1]) * lengkung, (from[1] + to[1]) / 2 - (to[0] - from[0]) * lengkung];
        const N = 40, pts = [];
        for (let k = 0; k <= N; k++) { const t = k / N, a = (1 - t) * (1 - t), b = 2 * t * (1 - t), c = t * t; pts.push([a * from[0] + b * mid[0] + c * to[0], a * from[1] + b * mid[1] + c * to[1]]); }
        const w = 0.065, head = 0.2, P = [];
        const total = polyLen(pts);
        for (let k = 0; k < N; k++) {
          const [ax, ay] = pts[k], [bx, by] = pts[k + 1], ang = Math.atan2(by - ay, bx - ax), nx = Math.sin(ang) * w / 2 / S, ny = -Math.cos(ang) * w / 2 / S;
          const dEnd = polyLen(pts.slice(k)) * S; if (dEnd < head * 0.9) break;
          const v = [[ax + nx, ay + ny], [ax - nx, ay - ny], [bx - nx, by - ny], [bx + nx, by + ny]].map(([x, y]) => [toX(x), Y(x, y) + 0.05, toZ(y)]);
          P.push(...v[0], ...v[1], ...v[2], ...v[0], ...v[2], ...v[3]);
        }
        const [ex, ey] = pts[N], [px, py] = alongPoly(pts, total - head / S), ang = Math.atan2(ey - py, ex - px);
        const hx = Math.sin(ang) * w * 1.6 / S, hy = -Math.cos(ang) * w * 1.6 / S;
        [[px + hx, py + hy], [px - hx, py - hy], [ex, ey]].forEach(([x, y]) => P.push(toX(x), Y(x, y) + 0.05, toZ(y)));
        const gg = new THREE.BufferGeometry(); gg.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
        const m = new THREE.Mesh(gg, new THREE.MeshBasicMaterial({ color: (WARNA[sisi] || WARNA.netral).garis, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false, depthTest: false }));
        m.renderOrder = 5; m.userData.want = Array.isArray(p) ? 0.85 : (p.putus ? 0.55 : 0.85); arrowGroup.add(m);
        if (!Array.isArray(p) && p.label) arrowLabels.push({ text: p.label, sisi, pos: new THREE.Vector3(toX(mid[0] * 0.5 + (from[0] + to[0]) / 4), Y(...mid) + 0.08, toZ(mid[1] * 0.5 + (from[1] + to[1]) / 4)) });
      });
    }

    // Label HTML
    const layer = document.createElement("div"); layer.className = "ps-labels"; container.appendChild(layer);
    const labels = [];
    const mk = (cls, inner, prio) => { const d = document.createElement("div"); d.className = "ps-lab " + cls; d.innerHTML = `<div class="ps-lab-in">${inner}</div>`; layer.appendChild(d); const L = { el: d, prio, w: 0, h: 0, x: 0, y: 0, show: true }; labels.push(L); return L; };
    const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    const namaTokoh = (x) => { if (!x) return ""; const T = (window.SIRAH && window.SIRAH.tokoh) || {}, B = (window.PERANG && window.PERANG.tokohBaru) || {}; return (T[x] && T[x].nama) || (B[x] && B[x].nama) || x; };
    fitur.forEach((f, fi) => {
      const o = featObjs[f.id || "f" + fi]; if (!f.nama || f.label === false || !o.g.userData.anchor) return;
      o.label = mk(`ps-fitur ps-j-${f.jenis}${f.jenis === "arah" ? " ps-arah" : ""}`, esc(f.nama), f.jenis === "arah" ? 1 : f.penting ? 3 : 2);
      o.label.anchor = o.g.userData.anchor;
    });
    Object.values(U).forEach((x) => {
      const u = x.u, side = u.sisi || "netral";
      x.label = mk(`ps-unit ps-${side}${u.jenis === "tokoh" ? " ps-tokoh" : ""}`, "", u.jenis === "tokoh" ? 5 : 4);
    });
    const rasulLab = mk("ps-rasul", `<span lang="ar">رسول الله ﷺ</span><b>Rasulullah ﷺ</b>`, 9);
    let arrowLabels = [], arrowLabelEls = [];
    let view = opts.view || "diorama";
    function unitLabelHTML(x) {
      const u = x.u, j = x.jumlah, jt = u.jenis === "tokoh" ? "" : j != null ? fmt(j) : u.ilustrasi ? "jumlah tak tercatat" : "";
      const more = view === "atas" && u.jenis !== "tokoh" ? `<small>${esc(JENIS[u.jenis] || u.jenis)}${u.panglima ? " · " + esc(namaTokoh(u.panglima)) : ""}${x.state && x.state.formasi ? " · " + esc(FORMASI[x.state.formasi] || x.state.formasi) : ""}</small>` : "";
      return `<div class="ps-lab-in"><b>${esc(u.nama || namaTokoh(u.tokoh))}</b>${jt ? `<span>${esc(jt)}</span>` : ""}${more}</div>`;
    }

    // Kamera
    const st = { az: 0, el: 1.0, dist: 30, target: new THREE.Vector3() }, goal = { az: 0, el: 1.0, dist: 30, target: new THREE.Vector3() };
    const fitDist = () => { const asp = Math.max(0.6, container.clientWidth / Math.max(1, container.clientHeight)); const span = Math.max(WM * S / asp, HM * S); return (span * 0.62) / Math.tan(rad(19)) * 0.85; };
    function camFor(k) {
      const atas = view === "atas";
      const tg = k && k.target ? k.target : [0, 0];
      const d = k && k.jarak ? (k.jarak * S) / (2 * Math.tan(rad(19))) * 1.05 : fitDist();
      return { target: new THREE.Vector3(toX(tg[0]), atas ? 0 : Math.max(0, heightSU(tg[0], tg[1]) * 0.6), toZ(tg[1])), dist: atas ? Math.max(d, 4) * 1.05 : d,
        az: atas ? 0 : rad(k && k.sudut != null ? k.sudut : 0), el: atas ? 1.5 : rad(k && k.tinggi != null ? k.tinggi : 52) };
    }
    const el = renderer.domElement;
    const clampT = (t) => { t.x = Math.max(-WM * S / 2, Math.min(WM * S / 2, t.x)); t.z = Math.max(-HM * S / 2, Math.min(HM * S / 2, t.z)); };
    function panBy(dx, dy) {
      const k = (2 * st.dist * Math.tan(rad(19))) / Math.max(1, container.clientHeight);
      const ca = Math.cos(st.az), sa = Math.sin(st.az), ky = k / Math.max(0.45, Math.sin(st.el));
      goal.target.x += -ca * dx * k - sa * dy * ky; goal.target.z += sa * dx * k - ca * dy * ky;
      clampT(goal.target); st.target.x = goal.target.x; st.target.z = goal.target.z;
    }
    const gest = { THREE, el, camera, st, goal, minD: 1.2, maxD: 60, clamp: clampT, panBy,
      rotate: (dx, dy) => { if (view === "atas") return; goal.az -= dx * 0.005; goal.el = Math.max(0.3, Math.min(1.5, goal.el + dy * 0.004)); } };
    if (window.SirahGestures) window.SirahGestures(gest);
    else {
      let drag = null;
      el.addEventListener("pointerdown", (e) => { drag = { x: e.clientX, y: e.clientY, rot: e.button === 2 || e.shiftKey }; });
      window.addEventListener("pointerup", () => (drag = null));
      el.addEventListener("pointermove", (e) => { if (!drag) return; const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag.x = e.clientX; drag.y = e.clientY; drag.rot ? gest.rotate(dx, dy) : panBy(dx, dy); });
      el.addEventListener("wheel", (e) => { e.preventDefault(); goal.dist = st.dist = Math.max(1.2, Math.min(60, st.dist * Math.exp(e.deltaY * 0.0015))); }, { passive: false });
    }

    function resize() { const w = container.clientWidth, h = container.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / Math.max(1, h); camera.updateProjectionMatrix(); }
    const ro = new ResizeObserver(resize); ro.observe(container); resize();

    // Status per fase (posisi dibawa dari fase sebelumnya)
    const fase = sk.fase || [];
    const states = [];
    (function resolve() {
      let prev = {}, rpos = null, korban = { muslim: 0, musuh: 0 };
      fase.forEach((F, i) => {
        const cur = {};
        units.forEach((u) => {
          const p = (F.posisi || {})[u.id], q = prev[u.id];
          if (p) cur[u.id] = { aktif: p.aktif !== false, pos: p.pos || (q && q.pos) || [0, 0], arah: p.arah != null ? p.arah : q ? q.arah : 0,
            formasi: p.formasi || (q && q.formasi) || "bertahan", jumlah: p.jumlah !== undefined ? p.jumlah : q ? q.jumlah : u.jumlah, garis: p.garis || (p.ikut ? (fitur.find((f) => f.id === p.ikut) || {}).pts : null) || (p.pos ? null : q && q.garis), radius: p.radius != null ? p.radius : p.pos ? null : q && q.radius };
          else if (q) cur[u.id] = { ...q };
          else cur[u.id] = { aktif: false, pos: [0, 0], arah: 0, formasi: "bertahan", jumlah: u.jumlah };
        });
        if ((F.posisi || {}).rasul) rpos = F.posisi.rasul.aktif === false ? null : F.posisi.rasul.pos;
        if (F.korban) korban = { ...korban, ...F.korban };
        states.push({ units: cur, rasul: rpos, korban: { ...korban } });
        prev = cur;
      });
    })();

    function targetsFor(x, s) {
      const u = x.u, nf = x.nf, out = [];
      const visN = !s.aktif ? 0 : u.jenis === "tokoh" ? 1 : Math.max(s.jumlah === 0 ? 0 : 1, Math.round(nf * ((s.jumlah != null ? s.jumlah : x.base) / x.base)));
      let cx = toX(s.pos[0]), cz = toZ(s.pos[1]);
      const ang = rad(s.arah), fx = Math.sin(ang), fz = -Math.cos(ang), rx = Math.cos(ang), rz = Math.sin(ang);
      const yaw = Math.PI - ang;
      if (s.formasi === "garis" && s.garis && s.garis.length > 1) {
        const L = polyLen(s.garis);
        for (let i = 0; i < nf; i++) {
          const [xm, ym] = alongPoly(s.garis, ((i + 0.5) / nf) * L), x0 = toX(xm), z0 = toZ(ym);
          const back = ((i * 7919) % 3) * 0.02;
          out.push([x0 - fx * back, z0 - fz * back, yaw]);
        }
        const [mx, my] = alongPoly(s.garis, L / 2); cx = toX(mx); cz = toZ(my);
      } else {
        const off = formasiOffsets(nf, s.formasi, x.spacing, u.id.length * 31 + (u.jenis || "").length, s.radius ? s.radius * S : null);
        off.forEach(([ox, oy, extra], i) => {
          if (s.formasi === "lingkar") out.push([cx + ox, cz + oy, Math.atan2(-ox, -oy) + Math.PI]);
          else out.push([cx + rx * ox - fx * oy, cz + rz * ox - fz * oy, yaw + (s.formasi === "tersebar" ? extra : 0)]);
        });
      }
      return { pts: out, visN, cx, cz };
    }

    let tween = { t0: 0, dur: 1 }, faseIdx = -1;
    function setFase(i, instant) {
      i = Math.max(0, Math.min(fase.length - 1, i)); faseIdx = i;
      const sNow = states[i], F = fase[i];
      Object.values(U).forEach((x) => {
        const s = sNow.units[x.u.id];
        const { pts, visN, cx, cz } = targetsFor(x, s);
        for (let k = 0; k < x.nf; k++) {
          const [tx, tz, ty] = pts[k] || pts[pts.length - 1];
          x.from.set(x.init ? x.cur.subarray(k * 4, k * 4 + 4) : [tx, tz, ty, 0], k * 4);
          x.to.set([tx, tz, ty, 0], k * 4);
          x.visFrom[k] = x.init ? x.vis[k] : 0; x.visTo[k] = k < visN ? 1 : 0;
        }
        x.centreFrom.copy(x.init ? x.centre : new THREE.Vector3(cx, 0, cz)); x.centreTo.set(cx, 0, cz);
        // formasi melingkar: label dan panji di sisi utara lingkaran agar beberapa lingkaran sepusat tidak bertumpuk
        x.labFrom = x.init ? x.lab || 0 : 0; x.labTo = s.formasi === "lingkar" ? Math.max(0, ...pts.slice(0, Math.max(1, visN)).map(([, pz]) => cz - pz)) : 0;
        if (!x.init) x.centre.set(cx, 0, cz);
        x.init = true; x.aktif = s.aktif; x.jumlah = s.jumlah; x.state = s;
        x.label.el.innerHTML = unitLabelHTML(x);
        x.label.el.classList.toggle("on", !!(F.sorot && F.sorot.includes(x.u.id)));
        x.sorot = !!(F.sorot && F.sorot.includes(x.u.id));
        // kotak formasi untuk tampilan konstruksi
        let mnx = 1e9, mnz = 1e9, mxx = -1e9, mxz = -1e9;
        pts.slice(0, Math.max(1, visN)).forEach(([px, pz]) => { mnx = Math.min(mnx, px); mnz = Math.min(mnz, pz); mxx = Math.max(mxx, px); mxz = Math.max(mxz, pz); });
        const pad = 0.07, yy = (px, pz) => surfaceY(px, pz) + 0.02;
        x.outline.geometry.setFromPoints([[mnx - pad, mnz - pad], [mxx + pad, mnz - pad], [mxx + pad, mxz + pad], [mnx - pad, mxz + pad]].map(([px, pz]) => new THREE.Vector3(px, yy(px, pz), pz)));
        x.outlineWant = view === "atas" && s.aktif && x.u.jenis !== "tokoh" ? 0.9 : 0;
        x.ringR = Math.max(0.22, Math.hypot(mxx - mnx, mxz - mnz) / 2 + 0.1);
      });
      rasul.from.copy(rasul.cur); rasul.opFrom = rasul.op;
      if (sNow.rasul) { rasul.to.set(toX(sNow.rasul[0]), heightSU(...sNow.rasul), toZ(sNow.rasul[1])); if (!rasul.on) rasul.from.copy(rasul.to); rasul.opTo = 1; rasul.on = true; }
      else { rasul.opTo = 0; rasul.on = false; }
      arrowLabelEls.forEach((L) => { L.el.remove(); labels.splice(labels.indexOf(L), 1); }); arrowLabels = []; arrowLabelEls = [];
      buildArrows(F.panah);
      arrowLabelEls = arrowLabels.map((a) => { const L = mk(`ps-panah ps-${a.sisi || "netral"}`, esc(a.text), 3); L.anchor = a.pos; return L; });
      fitur.forEach((f, fi) => {
        const o = featObjs[f.id || "f" + fi];
        const vis = !f.fase || (i >= f.fase[0] && i <= f.fase[1]);
        o.g.visible = vis; if (o.label) { o.label.hidden = !vis; o.label.el.classList.toggle("on", !!(F.sorot && F.sorot.includes(f.id))); }
        if (o.g.userData.timbun) { const t = f.ditimbun != null && i >= f.ditimbun; o.g.userData.timbun.visible = t; o.g.userData.air.visible = !t; }
      });
      const c = camFor(F.kamera);
      goal.target.copy(c.target); goal.dist = c.dist; goal.az = c.az; goal.el = c.el;
      tween = { t0: performance.now(), dur: instant ? 1 : 2600 };
      if (instant) { st.target.copy(goal.target); st.dist = goal.dist; st.az = goal.az; st.el = goal.el; }
    }

    // Lingkaran waktu
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), p3 = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0), v = new THREE.Vector3();
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf, t0 = performance.now(), frameN = 0, last = performance.now();
    function frame(now) {
      const t = (now - t0) / 1000, dt = Math.min(0.1, (now - last) / 1000); last = now; frameN++;
      const kk = reduce ? 1 : 1 - Math.exp(-dt * 3.2);
      let dAz = goal.az - st.az; while (dAz > Math.PI) dAz -= 2 * Math.PI; while (dAz < -Math.PI) dAz += 2 * Math.PI;
      st.az += dAz * kk; st.el += (goal.el - st.el) * kk; st.dist += (goal.dist - st.dist) * kk; st.target.lerp(goal.target, kk);
      camera.position.set(st.target.x + st.dist * Math.cos(st.el) * Math.sin(st.az), st.target.y + st.dist * Math.sin(st.el), st.target.z + st.dist * Math.cos(st.el) * Math.cos(st.az));
      camera.lookAt(st.target);
      const T = reduce ? 1 : Math.min(1, (now - tween.t0) / tween.dur);
      const ka = reduce ? 1 : 1 - Math.exp(-dt * 3);
      Object.values(U).forEach((x) => {
        const sc0 = x.scale;
        if (x.settled !== tween.t0) for (let k = 0; k < x.nf; k++) {
          const tt = ease(Math.max(0, Math.min(1, (T - x.delay[k] * 0.6) / (1 - x.delay[k] * 0.6))));
          const o = k * 4;
          const px = x.from[o] + (x.to[o] - x.from[o]) * tt, pz = x.from[o + 1] + (x.to[o + 1] - x.from[o + 1]) * tt;
          let ry = x.to[o + 2]; if (tt < 1) { let dr = x.to[o + 2] - x.from[o + 2]; while (dr > Math.PI) dr -= 2 * Math.PI; while (dr < -Math.PI) dr += 2 * Math.PI; ry = x.from[o + 2] + dr * tt; }
          const vv = x.visFrom[k] + (x.visTo[k] - x.visFrom[k]) * tt;
          x.cur[o] = px; x.cur[o + 1] = pz; x.cur[o + 2] = ry; x.vis[k] = vv;
          const walk = tt > 0 && tt < 1 ? Math.abs(Math.sin(t * 14 + k)) * 0.012 : 0;
          const s = Math.max(0.0001, vv) * sc0;
          q.setFromAxisAngle(up, ry);
          m4.compose(p3.set(px, surfaceY(px, pz) + walk, pz), q, sc.set(s, s, s));
          x.a.setMatrixAt(k, m4); x.b.setMatrixAt(k, m4);
          if (x.face && k === 0) { x.face.position.set(px, p3.y + 0.077 * s, pz); x.face.rotation.set(0, ry - Math.PI / 2, 0); x.face.scale.setScalar(s); }
        }
        if (x.settled !== tween.t0) { x.a.instanceMatrix.needsUpdate = true; x.b.instanceMatrix.needsUpdate = true; }
        if (T >= 1 && x.settled !== tween.t0) x.settled = tween.t0; // posisi akhir sudah tergambar; berhenti menghitung ulang
        const tc = ease(T);
        x.centre.lerpVectors(x.centreFrom, x.centreTo, tc);
        const cy = surfaceY(x.centre.x, x.centre.z);
        const alive = x.aktif;
        x.flag.visible = alive && x.u.jenis !== "tokoh" && x.u.panji !== false;
        if (x.flag.visible) { x.flag.position.set(x.centre.x, cy, x.centre.z); x.cloth.rotation.y = Math.sin(t * 2.2 + x.nf) * 0.35; }
        x.ring.position.set(x.centre.x, cy + 0.015, x.centre.z); x.ring.scale.setScalar(x.ringR || 0.2);
        x.ringM.opacity = x.sorot && alive ? 0.35 + 0.25 * Math.sin(t * 3) : 0;
        x.outline.material.opacity += ((view === "atas" && alive && x.u.jenis !== "tokoh" && x.state && x.state.formasi !== "tersebar" ? 0.9 : 0) - x.outline.material.opacity) * ka;
        x.label.anchor = x.label.anchor || new THREE.Vector3();
        x.lab = x.labFrom + (x.labTo - x.labFrom) * tc;
        x.label.anchor.set(x.centre.x, surfaceY(x.centre.x, x.centre.z - x.lab) + (x.u.jenis === "tokoh" ? 0.36 : 0.42), x.centre.z - x.lab);
        if (x.lab > 0 && x.flag.visible) x.flag.position.set(x.centre.x, surfaceY(x.centre.x, x.centre.z - x.lab), x.centre.z - x.lab);
        x.label.hidden = !alive;
      });
      // Rasul
      const tr = ease(T);
      rasul.cur.lerpVectors(rasul.from, rasul.to, tr); rasul.op = rasul.opFrom + (rasul.opTo - rasul.opFrom) * tr;
      glow.position.set(rasul.cur.x, rasul.cur.y + 0.16, rasul.cur.z); glow.material.opacity = rasul.op * (0.85 + 0.15 * Math.sin(t * 2));
      glow.scale.setScalar(0.85 + 0.08 * Math.sin(t * 1.7));
      beam.position.set(rasul.cur.x, rasul.cur.y + 0.55, rasul.cur.z); beam.material.opacity = rasul.op * 0.2;
      rasulLab.anchor = rasulLab.anchor || new THREE.Vector3(); rasulLab.anchor.set(rasul.cur.x, rasul.cur.y + 0.62, rasul.cur.z); rasulLab.hidden = rasul.op < 0.3;
      arrowGroup.children.forEach((m) => { m.material.opacity += (m.userData.want - m.material.opacity) * ka; });
      // proyeksi label + hindari tumpang tindih
      const W = container.clientWidth, H = container.clientHeight;
      labels.forEach((L) => {
        if (!L.anchor || L.hidden) { L.vis = false; return; }
        v.copy(L.anchor).project(camera);
        L.vis = v.z < 1 && Math.abs(v.x) < 1.1 && Math.abs(v.y) < 1.1;
        L.x = (v.x * 0.5 + 0.5) * W; L.y = (-v.y * 0.5 + 0.5) * H;
      });
      if (frameN % 8 === 1) labels.forEach((L) => { if (L.vis) { L.w = L.el.offsetWidth || L.w; L.h = L.el.offsetHeight || L.h; } });
      const placed = [];
      const hit = (bx) => placed.find((p) => bx[0] < p[2] - 2 && bx[2] > p[0] + 2 && bx[1] < p[3] - 1 && bx[3] > p[1] + 1);
      labels.slice().sort((a, b) => b.prio - a.prio).forEach((L) => {
        let ok = L.vis, y = L.y;
        if (ok) {
          let bx = [L.x - L.w / 2, y - L.h, L.x + L.w / 2, y];
          if (L.prio >= 4 && hit(bx)) {
            // label pasukan dicoba digeser sedikit ke kanan, kiri, atau atas; bila tetap bertumpuk, label tokoh disembunyikan
            const tries = [[L.w * 0.55, 0], [-L.w * 0.55, 0], [0, -L.h - 2], [L.w * 0.55, -L.h - 2], [-L.w * 0.55, -L.h - 2]];
            let found = false;
            for (const [dx, dy] of tries) { const b2 = [bx[0] + dx, bx[1] + dy, bx[2] + dx, bx[3] + dy]; if (!hit(b2)) { bx = b2; L.dx = dx; y += dy; found = true; break; } }
            if (!found) { if (L.prio === 5) ok = false; L.dx = 0; }
          } else { L.dx = 0; if (L.prio < 4 && hit(bx)) ok = false; }
          if (ok) placed.push(bx);
        }
        L.el.style.transform = `translate(${(L.x + (L.dx || 0)).toFixed(1)}px, ${y.toFixed(1)}px)`;
        L.el.style.visibility = ok ? "visible" : "hidden";
        L.el.style.zIndex = String(L.prio * 100);
      });
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }
    setFase(opts.fase || 0, true);
    raf = requestAnimationFrame(frame);

    return {
      setFase: (i) => setFase(i, false),
      get fase() { return faseIdx; },
      states, perFigur: per,
      setView(vw) {
        view = vw; layer.classList.toggle("atas", vw === "atas");
        Object.values(U).forEach((x) => { x.label.el.innerHTML = unitLabelHTML(x); });
        const c = camFor(fase[faseIdx] && fase[faseIdx].kamera);
        goal.target.copy(c.target); goal.dist = c.dist; goal.az = c.az; goal.el = c.el;
      },
      zoom(f) { goal.dist = Math.max(1.2, Math.min(60, goal.dist * f)); },
      rotate(d) { if (view !== "atas") goal.az += d; },
      reset() { const c = camFor(fase[faseIdx] && fase[faseIdx].kamera); goal.target.copy(c.target); goal.dist = c.dist; goal.az = c.az; goal.el = c.el; },
      dispose() {
        cancelAnimationFrame(raf); ro.disconnect();
        scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) { (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { if (m.map) m.map.dispose(); m.dispose(); }); } });
        renderer.dispose(); el.remove(); layer.remove();
      }
    };
  }
  window.PerangScene = { create };

  // ---------- CSS ----------
  function ensureCss() {
    if (document.getElementById("ps-css")) return;
    const s = document.createElement("style"); s.id = "ps-css";
    s.textContent = `
.ps-root { position: absolute; inset: 0; z-index: 40; overflow: hidden; border-radius: 14px; background: radial-gradient(120% 90% at 40% 10%, var(--lapis-1, #121e45), var(--lapis-0, #0b1430) 70%); color: var(--ink, #ece4d2); font: 14px/1.5 var(--f-ui, system-ui); border: 1px solid var(--line, rgba(212,174,90,.28)); }
.ps-stage { position: absolute; inset: 0; z-index: 0; }
.ps-stage canvas { display: block; width: 100%; height: 100%; touch-action: none; }
.ps-labels { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 1; }
.ps-lab { position: absolute; left: 0; top: 0; white-space: nowrap; will-change: transform; }
.ps-lab-in { transform: translate(-50%, -100%); display: flex; flex-direction: column; align-items: center; line-height: 1.15; }
.ps-unit .ps-lab-in { padding: 2px 8px 3px; border-radius: 8px; background: rgba(11, 20, 48, .82); border: 1px solid rgba(212, 174, 90, .25); border-left: 3px solid #888; }
.ps-unit.ps-muslim .ps-lab-in { border-left-color: #57c08a; } .ps-unit.ps-musuh .ps-lab-in { border-left-color: #e0675a; } .ps-unit.ps-netral .ps-lab-in { border-left-color: #b9b5ad; }
.ps-unit b { font: 600 11.5px var(--f-ui, system-ui); color: var(--ink, #ece4d2); }
.ps-unit span { font-size: 11px; color: var(--gold-soft, #ecd8a2); font-variant-numeric: tabular-nums; }
.ps-unit small { font-size: 10.5px; color: var(--muted, #a7aec6); white-space: normal; max-width: 170px; text-align: center; }
.ps-unit.on .ps-lab-in, .ps-fitur.on .ps-lab-in { box-shadow: 0 0 0 2px rgba(242, 210, 122, .7); }
.ps-tokoh .ps-lab-in { padding: 1px 7px; border-radius: 99px; background: rgba(11, 20, 48, .9); }
.ps-tokoh b { font-size: 11px; }
.ps-fitur .ps-lab-in { padding: 1px 7px; border-radius: 6px; background: rgba(11, 20, 48, .55); font-size: 11px; color: #f1e6c8; text-shadow: 0 1px 2px #000; }
.ps-j-gunung .ps-lab-in, .ps-j-bukit .ps-lab-in { background: none; font-style: italic; color: #f4e7c4; }
.ps-arah .ps-lab-in { background: none; color: var(--muted, #a7aec6); font-size: 11px; letter-spacing: .02em; }
.ps-panah .ps-lab-in { padding: 0 6px; border-radius: 6px; background: rgba(11, 20, 48, .7); font-size: 10.5px; color: var(--ink, #ece4d2); }
.ps-panah.ps-muslim .ps-lab-in { color: #9fe2bd; } .ps-panah.ps-musuh .ps-lab-in { color: #f3a49b; }
.ps-rasul .ps-lab-in { padding: 2px 10px; border-radius: 99px; background: rgba(40, 34, 20, .62); border: 1px solid rgba(255, 236, 170, .6); box-shadow: 0 0 18px rgba(255, 230, 160, .35); }
.ps-rasul span { font: 15px/1.2 var(--f-ar, serif); color: #fff3cf; }
.ps-rasul b { font-size: 10.5px; font-weight: 600; color: #fff3cf; }
.ps-labels.atas .ps-unit .ps-lab-in { padding: 3px 9px 4px; }
/* Tampilan sinematik: judul kecil, teks narasi seperti subtitle, kendali ringkas yang memudar saat diputar. Rincian ada di laci Info. */
.ps-shade { position: absolute; left: 0; right: 0; bottom: 0; height: 40%; z-index: 2; pointer-events: none; background: linear-gradient(to top, rgba(5, 9, 24, .82), rgba(5, 9, 24, .35) 55%, rgba(5, 9, 24, 0)); transition: opacity .5s; }
.ps-root.nocap .ps-shade { opacity: 0; }
.ps-title { position: absolute; left: 16px; top: 13px; z-index: 3; max-width: calc(100% - 420px); text-shadow: 0 1px 3px rgba(0, 0, 0, .75); transition: opacity .5s; }
.ps-title .k { margin: 0; font-size: 10.5px; letter-spacing: .07em; text-transform: uppercase; color: var(--muted, #a7aec6); }
.ps-title h2 { margin: 0; font: 600 19px/1.25 var(--f-text, Georgia, serif); color: var(--gold-soft, #ecd8a2); display: flex; flex-wrap: wrap; align-items: baseline; gap: 2px 10px; }
.ps-title h2 .ar { font: 15px/1.2 var(--f-ar, serif); color: var(--gold, #d4ae5a); }
.ps-vs { margin: 5px 0 0; display: flex; flex-wrap: wrap; align-items: center; gap: 2px 10px; font: 600 13px var(--f-ui, system-ui); font-variant-numeric: tabular-nums; color: var(--ink, #ece4d2); }
.ps-vs span { display: inline-flex; align-items: center; gap: 5px; }
.ps-vs i { width: 8px; height: 8px; border-radius: 2px; }
.ps-vs em { font-style: normal; font-weight: 500; font-size: 11.5px; color: var(--muted, #a7aec6); }
.ps-disc-mini { margin: 3px 0 0; font-size: 10.5px; color: rgba(167, 174, 198, .85); }
.ps-tools { position: absolute; right: 12px; top: 12px; display: flex; gap: 6px; align-items: center; z-index: 4; transition: opacity .5s; }
.ps-seg { display: flex; border-radius: 9px; border: 1px solid rgba(255, 255, 255, .12); background: rgba(8, 13, 34, .55); backdrop-filter: blur(6px); overflow: hidden; }
.ps-seg button { height: 30px; min-width: 30px; padding: 0 10px; border: 0; background: none; color: var(--ink, #ece4d2); font: 600 12px var(--f-ui, system-ui); cursor: pointer; }
.ps-seg button + button { border-left: 1px solid rgba(255, 255, 255, .1); }
.ps-seg button.on { background: rgba(212, 174, 90, .9); color: var(--lapis-0, #0b1430); }
.ps-seg button:hover:not(.on) { background: rgba(27, 43, 94, .8); }
.ps-seg.ic button { padding: 0; width: 30px; font-size: 15px; font-weight: 500; }
.ps-btn { height: 30px; min-width: 30px; padding: 0 9px; border-radius: 9px; border: 1px solid rgba(255, 255, 255, .12); background: rgba(8, 13, 34, .55); backdrop-filter: blur(6px); color: var(--ink, #ece4d2); font: 600 12px var(--f-ui, system-ui); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 5px; }
.ps-btn:hover { background: rgba(27, 43, 94, .85); }
.ps-btn.on { border-color: var(--gold, #d4ae5a); color: var(--gold-soft, #ecd8a2); }
.ps-btn svg { width: 15px; height: 15px; }
.ps-close { font-size: 19px; font-weight: 400; line-height: 1; }
.ps-utara { position: absolute; right: 16px; top: 52px; z-index: 3; width: 38px; height: 50px; display: flex; flex-direction: column; align-items: center; color: var(--gold-soft, #ecd8a2); font: 700 12px var(--f-ui, system-ui); pointer-events: none; text-shadow: 0 1px 2px #000; }
.ps-utara svg { width: 20px; height: 28px; }
.ps-cap { position: absolute; left: 50%; bottom: 62px; transform: translateX(-50%); width: min(780px, calc(100% - 40px)); z-index: 3; text-align: center; pointer-events: none; text-shadow: 0 1px 2px #000, 0 0 14px rgba(0, 0, 0, .65); animation: psCap .45s ease both; }
@keyframes psCap { from { opacity: 0; transform: translate(-50%, 6px); } }
.ps-cap .k { margin: 0; font: 600 11px var(--f-ui, system-ui); letter-spacing: .06em; text-transform: uppercase; color: var(--gold, #d4ae5a); }
.ps-cap h3 { margin: 2px 0 4px; font: 600 18px/1.25 var(--f-text, Georgia, serif); color: var(--gold-soft, #ecd8a2); }
.ps-cap p { margin: 0 auto; max-width: 70ch; font: 15px/1.55 var(--f-text, Georgia, serif); color: #f4eddd; }
.ps-dock { position: absolute; left: 50%; bottom: 14px; transform: translateX(-50%); z-index: 4; display: flex; align-items: center; gap: 4px; padding: 4px; border-radius: 99px; background: rgba(8, 13, 34, .6); border: 1px solid rgba(255, 255, 255, .1); backdrop-filter: blur(8px); transition: opacity .5s; }
.ps-dock > button { height: 32px; min-width: 32px; border-radius: 99px; border: 0; background: none; color: var(--ink, #ece4d2); font-size: 17px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
.ps-dock > button:hover:not(:disabled) { background: rgba(255, 255, 255, .08); }
.ps-dock > button:disabled { opacity: .35; cursor: default; }
.ps-dock > button.play { background: var(--gold, #d4ae5a); color: var(--lapis-0, #0b1430); }
.ps-dock > button.play svg { width: 14px; height: 14px; }
.ps-dock > button.cc { font: 600 11px var(--f-ui, system-ui); padding: 0 10px; color: var(--muted, #a7aec6); }
.ps-dock > button.cc.on { color: var(--gold-soft, #ecd8a2); }
.ps-dots { display: flex; align-items: center; gap: 5px; padding: 0 8px; }
.ps-dots button { position: relative; width: 18px; height: 6px; padding: 0; border: 0; border-radius: 99px; background: rgba(255, 255, 255, .22); cursor: pointer; transition: width .3s, background .3s; }
.ps-dots button::before { content: ""; position: absolute; inset: -10px -3px; }
.ps-dots button.done { background: rgba(212, 174, 90, .55); }
.ps-dots button.on { width: 32px; background: var(--gold, #d4ae5a); }
.ps-dots button:hover:not(.on) { background: rgba(255, 255, 255, .45); }
.ps-root.idle .ps-dock, .ps-root.idle .ps-tools, .ps-root.idle .ps-utara { opacity: 0; pointer-events: none; }
.ps-root.idle .ps-title { opacity: .55; }
.ps-root.idle { cursor: none; }
.ps-root:fullscreen { border-radius: 0; border: 0; }
.ps-info { position: absolute; top: 52px; right: 12px; bottom: 62px; width: min(350px, calc(100% - 24px)); box-sizing: border-box; overflow: auto; z-index: 5; padding: 14px 16px 16px; border-radius: 12px; background: rgba(8, 13, 34, .93); border: 1px solid var(--line, rgba(212,174,90,.28)); backdrop-filter: blur(8px); font-size: 12.5px; line-height: 1.5; animation: psInfo .22s ease both; }
@keyframes psInfo { from { opacity: 0; transform: translateX(10px); } }
.ps-info h3 { margin: 0 0 8px; font: 600 15px var(--f-text, Georgia, serif); color: var(--gold-soft, #ecd8a2); display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.ps-info h4 { margin: 14px 0 5px; font: 600 11px var(--f-ui, system-ui); letter-spacing: .06em; text-transform: uppercase; color: var(--muted, #a7aec6); }
.ps-info p { margin: 0 0 4px; color: var(--ink, #ece4d2); }
.ps-info a { color: var(--gold-soft, #ecd8a2); }
.ps-info .muted { color: var(--muted, #a7aec6); font-size: 11.5px; }
.ps-count { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.ps-side { display: flex; flex-direction: column; gap: 1px; }
.ps-side h5 { margin: 0; font: 600 11.5px var(--f-ui, system-ui); color: var(--muted, #a7aec6); display: flex; align-items: center; gap: 6px; }
.ps-side h5 i { width: 9px; height: 9px; border-radius: 2px; flex: none; }
.ps-side .big { font: 600 20px/1.1 var(--f-ui, system-ui); font-variant-numeric: tabular-nums; color: var(--ink, #ece4d2); }
.ps-side .big.na { font-size: 12.5px; font-weight: 500; color: var(--muted, #a7aec6); padding: 3px 0; }
.ps-side small { font-size: 11.5px; color: var(--muted, #a7aec6); font-variant-numeric: tabular-nums; }
.ps-side small b { color: var(--gold-soft, #ecd8a2); font-weight: 600; }
.ps-bar { grid-column: 1 / -1; display: flex; height: 5px; border-radius: 4px; overflow: hidden; background: rgba(255,255,255,.08); }
.ps-bar i { display: block; height: 100%; transition: width .6s ease; }
.ps-legend { display: flex; flex-wrap: wrap; gap: 4px 12px; font-size: 11.5px; color: var(--ink, #ece4d2); }
.ps-legend span { display: inline-flex; align-items: center; gap: 5px; }
.ps-legend i.sw { width: 10px; height: 10px; border-radius: 2px; }
.ps-legend i.ln { width: 16px; height: 3px; border-radius: 2px; }
.ps-legend i.glow { width: 12px; height: 12px; border-radius: 50%; background: radial-gradient(circle, #fff6d8, rgba(255, 220, 140, 0) 70%); }
.ps-legend svg { width: 16px; height: 14px; }
.ps-der { display: inline-block; padding: 0 7px; border-radius: 99px; border: 1px solid rgba(212,174,90,.35); font-size: 11px; color: var(--gold-soft, #ecd8a2); margin-right: 6px; }
.ps-chips { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
.ps-chips button { padding: 1px 8px; border-radius: 99px; border: 1px solid var(--line, rgba(212,174,90,.28)); background: var(--lapis-2, #1b2b5e); color: var(--ink, #ece4d2); font-size: 11.5px; cursor: pointer; }
.ps-chips button:hover { border-color: var(--gold, #d4ae5a); }
.ps-srcs { margin: 0; padding-left: 16px; }
.ps-srcs li { margin: 2px 0; }
.ps-keys { display: grid; grid-template-columns: auto 1fr; gap: 2px 10px; font-size: 11.5px; color: var(--muted, #a7aec6); }
.ps-keys kbd { font: 600 11px var(--f-ui, system-ui); color: var(--ink, #ece4d2); padding: 0 5px; border-radius: 4px; border: 1px solid rgba(255,255,255,.18); justify-self: start; }
/* Label di medan: ringkas pada mode diorama, kotak lengkap pada mode konstruksi */
.ps-unit.ps-muslim { --c: #57c08a; } .ps-unit.ps-musuh { --c: #e0675a; } .ps-unit.ps-netral { --c: #b9b5ad; }
.ps-labels:not(.atas) .ps-unit .ps-lab-in { flex-direction: row; align-items: baseline; gap: 5px; padding: 1px 7px 2px 6px; border: 0; border-radius: 6px; background: rgba(8, 13, 34, .42); text-shadow: 0 1px 2px #000; }
.ps-labels:not(.atas) .ps-unit .ps-lab-in::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--c, #888); align-self: center; flex: none; }
.ps-labels:not(.atas) .ps-unit b { font-size: 11px; font-weight: 600; }
.ps-labels:not(.atas) .ps-unit span { font-size: 10.5px; opacity: .9; }
.ps-labels:not(.atas) .ps-tokoh .ps-lab-in { background: rgba(8, 13, 34, .3); }
.ps-labels:not(.atas) .ps-fitur:not(.ps-j-gunung):not(.ps-j-bukit) .ps-lab-in { background: none; }
.ps-root.nolab .ps-lab:not(.ps-rasul) { visibility: hidden; }
.ps-root .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.ps-none { position: absolute; inset: 0; display: grid; place-items: center; color: var(--muted, #a7aec6); }
@media (max-width: 760px) {
  .ps-tools { left: 8px; right: 8px; top: 8px; justify-content: flex-end; gap: 5px; }
  .ps-tools .ps-seg.ic, .ps-tools .ps-btn > span { display: none; }
  .ps-title { left: 12px; top: 46px; max-width: calc(100% - 24px); }
  .ps-title h2 .ar { font-size: 13px; }
  .ps-title h2 { font-size: 16px; }
  .ps-cap { bottom: 56px; width: calc(100% - 20px); } .ps-cap h3 { font-size: 15px; } .ps-cap p { font-size: 13px; line-height: 1.45; }
  .ps-utara { top: 92px; }
  .ps-info { top: 44px; bottom: 56px; }
  .ps-dots button { width: 12px; } .ps-dots button.on { width: 22px; }
}
@media (prefers-reduced-motion: reduce) { .ps-bar i { transition: none; } }
`;
    document.head.appendChild(s);
  }

  // ---------- Komponen pemutar ----------
  const nm = (x) => { if (!x) return ""; const T = (window.SIRAH && window.SIRAH.tokoh) || {}, B = (window.PERANG && window.PERANG.tokohBaru) || {}; return (T[x] && T[x].nama) || (B[x] && B[x].nama) || x; };
  const ICON = {
    infanteri: html`<svg viewBox="0 0 16 14"><circle cx="8" cy="3" r="2.3" fill="currentColor"/><path d="M4.5 13 L6 6 H10 L11.5 13 Z" fill="currentColor"/></svg>`,
    kavaleri: html`<svg viewBox="0 0 16 14"><rect x="2" y="6" width="11" height="4" rx="1.5" fill="currentColor"/><rect x="11" y="3" width="3" height="5" rx="1" fill="currentColor"/><path d="M3 10v3M6 10v3M10 10v3M12 10v3" stroke="currentColor" stroke-width="1.4"/><circle cx="7" cy="2.6" r="1.8" fill="currentColor"/></svg>`,
    pemanah: html`<svg viewBox="0 0 16 14"><path d="M5 1 Q12 7 5 13" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 1 V13 M3 7 H13" stroke="currentColor" stroke-width="1"/></svg>`,
    unta: html`<svg viewBox="0 0 16 14"><path d="M2 9 Q4 4 7 7 Q9 3 11 7 L13 4 L14 5 L12 9 Z" fill="currentColor"/><path d="M4 9v4M7 9v4M10 9v4M12 9v4" stroke="currentColor" stroke-width="1.3"/></svg>`,
    benteng: html`<svg viewBox="0 0 16 14"><path d="M2 13V4h2v2h2V4h2v2h2V4h2v2h2v7Z" fill="currentColor"/></svg>`
  };

  function SirahSimulasi({ id, onClose, onProfile }) {
    ensureCss();
    const sk = window.PERANG_SKENARIO && window.PERANG_SKENARIO[id];
    const data = window.PERANG && window.PERANG.daftar.find((d) => d.id === id);
    const box = useRef(null), api = useRef(null), root = useRef(null), idleT = useRef(0);
    const [i, setI] = useState(0), [playing, setPlaying] = useState(false), [view, setView] = useState("diorama");
    const [info, setInfo] = useState(false), [cap, setCap] = useState(true), [lab, setLab] = useState(true), [idle, setIdle] = useState(false), [fs, setFs] = useState(false);
    const [per, setPer] = useState(null);
    useEffect(() => {
      if (!sk || !box.current || !window.THREE) return;
      api.current = window.PerangScene.create(box.current, sk, { view, fase: 0 });
      setPer(api.current.perFigur);
      return () => { api.current && api.current.dispose(); api.current = null; };
    }, [id]);
    useEffect(() => { api.current && api.current.setFase(i); }, [i]);
    useEffect(() => { api.current && api.current.setView(view); }, [view]);
    const n = sk ? sk.fase.length : 0, F = sk ? sk.fase[i] : null;
    useEffect(() => {
      if (!playing) return;
      const ms = 4200 + Math.min(9000, ((F && F.narasi) || "").length * 38);
      const t = setTimeout(() => { if (i < n - 1) setI(i + 1); else setPlaying(false); }, ms);
      return () => clearTimeout(t);
    }, [playing, i]);
    // Kendali memudar saat diputar dan tetikus diam; muncul lagi saat digerakkan
    const wake = () => { setIdle(false); clearTimeout(idleT.current); idleT.current = setTimeout(() => setIdle(true), 2600); };
    useEffect(() => { wake(); return () => clearTimeout(idleT.current); }, [playing]);
    useEffect(() => {
      const f = () => setFs(!!document.fullscreenElement && document.fullscreenElement === root.current);
      document.addEventListener("fullscreenchange", f); return () => document.removeEventListener("fullscreenchange", f);
    }, []);
    const canFs = typeof document !== "undefined" && document.fullscreenEnabled;
    const toggleFs = () => { try { if (document.fullscreenElement) document.exitFullscreen(); else root.current && root.current.requestFullscreen(); } catch (e) {} };
    const togglePlay = () => { if (i >= n - 1 && !playing) { setI(0); setPlaying(true); } else setPlaying(!playing); };
    const goto = (k) => { setPlaying(false); setI(Math.max(0, Math.min(n - 1, k))); };
    useEffect(() => {
      const k = (e) => {
        if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        wake();
        if (e.key === "Escape") { if (document.fullscreenElement) return; e.preventDefault(); if (info) setInfo(false); else onClose && onClose(); }
        else if (e.key === " ") { e.preventDefault(); togglePlay(); }
        else if (e.key === "ArrowRight") { e.preventDefault(); goto(i + 1); }
        else if (e.key === "ArrowLeft") { e.preventDefault(); goto(i - 1); }
        else if (e.key === "i" || e.key === "I") setInfo(!info);
        else if (e.key === "t" || e.key === "T") setCap(!cap);
        else if (e.key === "l" || e.key === "L") setLab(!lab);
        else if ((e.key === "f" || e.key === "F") && canFs) toggleFs();
      };
      window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
    });
    if (!sk || !data) return html`<div class="ps-root"><div class="ps-none"><p>Simulasi untuk peristiwa ini belum tersedia.</p>
      <button type="button" class="ps-btn ps-close" style=${{ position: "absolute", right: "12px", top: "12px" }} onClick=${onClose} aria-label="Tutup simulasi">×</button></div></div>`;

    // Hitungan pasukan pada fase ini
    const stt = api.current && api.current.states ? api.current.states[i] : null;
    const sum = (side) => {
      if (!stt) return null; let s = 0, unknown = false;
      sk.unit.forEach((u) => { if (u.sisi !== side || u.jenis === "tokoh" || u.hitung === false) return; const x = stt.units[u.id]; if (!x || !x.aktif) return; if (x.jumlah == null) unknown = true; else s += x.jumlah; });
      return unknown ? null : s;
    };
    const kor = stt ? stt.korban : { muslim: 0, musuh: 0 };
    const mus = data.muslim || {}, lawan = data.musuh || {};
    const namaLawan = ((data.lawan || "Pihak lawan").split(/[:(;]/)[0] || "Pihak lawan").trim();
    const mNow = sum("muslim"), eNow = sum("musuh");
    const tm = mus.jumlah || 0, te = lawan.jumlah || 0, totalBar = Math.max(1, tm + te);
    const side = (k, title, total, ket, now, gugur, label2, color) => html`<div class="ps-side" title=${ket || ""}>
      <h5><i style=${{ background: color }}></i>${title}</h5>
      ${total != null ? html`<span class="big">${fmt(total)}</span>` : html`<span class="big na">Jumlah tidak tercatat</span>`}
      <small>di medan saat ini: <b>${now != null ? fmt(now) : "—"}</b></small>
      <small>${label2}: <b>${gugur != null ? fmt(gugur) : "tidak tercatat"}</b>${k === "musuh" && kor.tawanan ? html` · ditawan <b>${fmt(kor.tawanan)}</b>` : ""}</small>
      ${ket && html`<small>${ket}</small>`}
    </div>`;
    const tokohChips = [...new Set(sk.unit.filter((u) => stt && stt.units[u.id] && stt.units[u.id].aktif).flatMap((u) => [u.tokoh, u.panglima]).filter((x) => x && window.SIRAH && window.SIRAH.tokoh[x]))].slice(0, 8);
    const srcs = [...(F.url ? [{ sumber: F.sumber || "Sumber fase ini", url: F.url }] : []), ...(data.riwayat || []).filter((r) => r.url && r.url !== F.url)];
    const jenisAda = [...new Set(sk.unit.map((u) => u.jenis).filter((j) => ICON[j]))];
    const DERJ = { shahih: "Hadits shahih", sirah: "Kitab sirah", lemah: "Riwayat lemah" };
    const gugur = [kor.muslim ? `${fmt(kor.muslim)} syahid` : "", kor.musuh ? `${fmt(kor.musuh)} tewas` : ""].filter(Boolean).join(" · ");
    const cls = ["ps-root", idle && playing && !info ? "idle" : "", cap ? "" : "nocap", lab ? "" : "nolab"].filter(Boolean).join(" ");
    const ICO = {
      play: html`<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3 1.5 L12 7 L3 12.5 Z" fill="currentColor"/></svg>`,
      pause: html`<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="2.5" y="1.5" width="3.2" height="11" rx="1" fill="currentColor"/><rect x="8.3" y="1.5" width="3.2" height="11" rx="1" fill="currentColor"/></svg>`,
      ulang: html`<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M11.5 7a4.5 4.5 0 1 1-1.4-3.3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M10.6 1.2 V4.4 H7.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      info: html`<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 7.2 V11.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="8" cy="4.8" r="1" fill="currentColor"/></svg>`,
      label: html`<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 3.5 H10 L14 8 L10 12.5 H2 Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>${lab ? "" : html`<path d="M2 14 L14 2" stroke="currentColor" stroke-width="1.5"/>`}</svg>`,
      fs: html`<svg viewBox="0 0 16 16" aria-hidden="true"><path d=${fs ? "M6 2v4H2M10 2v4h4M6 14v-4H2M10 14v-4h4" : "M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4"} fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    };
    return html`<div class=${cls} ref=${root} role="region" aria-label=${"Simulasi " + data.nama} onPointerMove=${wake} onPointerDown=${wake}>
      <div class="ps-stage" ref=${box}></div>
      <div class="ps-shade"></div>
      <div class="ps-title">
        <p class="k">Simulasi · ${data.tahun} M · ${data.h}</p>
        <h2>${data.nama}${data.arab && html`<span class="ar" lang="ar" dir="rtl">${data.arab}</span>`}</h2>
        <p class="ps-vs">
          <span title=${mus.ket || ""}><i style=${{ background: "#57c08a" }}></i>${mus.jumlah != null ? fmt(mus.jumlah) : "?"}</span>
          <em>lawan</em>
          <span title=${lawan.ket || ""}><i style=${{ background: "#e0675a" }}></i>${lawan.jumlah != null ? fmt(lawan.jumlah) : "?"}</span>
          ${gugur && html`<em>${gugur}</em>`}
        </p>
        <p class="ps-disc-mini">Rekonstruksi ilustratif, bukan peta arkeologis</p>
      </div>
      <div class="ps-tools">
        <div class="ps-seg" role="group" aria-label="Tampilan">
          <button type="button" class=${view === "diorama" ? "on" : ""} aria-pressed=${view === "diorama"} onClick=${() => setView("diorama")}>Diorama</button>
          <button type="button" class=${view === "atas" ? "on" : ""} aria-pressed=${view === "atas"} onClick=${() => setView("atas")}>Konstruksi</button>
        </div>
        <div class="ps-seg ic" role="group" aria-label="Kamera">
          <button type="button" onClick=${() => api.current && api.current.zoom(0.8)} aria-label="Perbesar" title="Perbesar">+</button>
          <button type="button" onClick=${() => api.current && api.current.zoom(1.25)} aria-label="Perkecil" title="Perkecil">−</button>
          <button type="button" onClick=${() => api.current && api.current.reset()} aria-label="Kembalikan kamera" title="Kembalikan kamera">⟲</button>
        </div>
        <button type="button" class=${`ps-btn${lab ? "" : " on"}`} onClick=${() => setLab(!lab)} aria-pressed=${!lab} aria-label=${lab ? "Sembunyikan label pasukan" : "Tampilkan label pasukan"} title=${lab ? "Sembunyikan label (L)" : "Tampilkan label (L)"}>${ICO.label}</button>
        <button type="button" class=${`ps-btn${info ? " on" : ""}`} onClick=${() => setInfo(!info)} aria-expanded=${info} title="Jumlah pasukan, legenda, sumber (I)">${ICO.info}<span>Info</span></button>
        ${canFs && html`<button type="button" class="ps-btn" onClick=${toggleFs} aria-label=${fs ? "Keluar layar penuh" : "Layar penuh"} title=${fs ? "Keluar layar penuh (F)" : "Layar penuh (F)"}>${ICO.fs}</button>`}
        <button type="button" class="ps-btn ps-close" onClick=${onClose} aria-label="Tutup simulasi" title="Tutup (Esc)">×</button>
      </div>
      ${view === "atas" && html`<div class="ps-utara" aria-label="Arah utara"><svg viewBox="0 0 22 30"><path d="M11 1 L19 27 L11 21 L3 27 Z" fill="currentColor" opacity=".85"/></svg>U</div>`}
      ${cap ? html`<div class="ps-cap" key=${i} aria-live="polite">
          <p class="k">Fase ${i + 1} dari ${n}${F.waktu ? " · " + F.waktu : ""}</p>
          <h3>${F.judul}</h3>
          <p>${F.narasi}</p>
        </div>` : html`<p class="sr-only" aria-live="polite">${F.judul}</p>`}
      <div class="ps-dock">
        <button type="button" onClick=${() => goto(i - 1)} disabled=${i === 0} aria-label="Fase sebelumnya" title="Fase sebelumnya (←)">‹</button>
        <button type="button" class="play" onClick=${togglePlay} aria-label=${playing ? "Jeda" : i >= n - 1 ? "Ulangi" : "Putar"} title="Putar / jeda (Spasi)">${playing ? ICO.pause : i >= n - 1 ? ICO.ulang : ICO.play}</button>
        <button type="button" onClick=${() => goto(i + 1)} disabled=${i >= n - 1} aria-label="Fase berikutnya" title="Fase berikutnya (→)">›</button>
        <div class="ps-dots" role="group" aria-label="Fase">
          ${sk.fase.map((f, k) => html`<button type="button" key=${k} class=${k === i ? "on" : k < i ? "done" : ""} aria-current=${k === i ? "step" : undefined} aria-label=${`Fase ${k + 1}: ${f.judul}`} title=${`Fase ${k + 1}: ${f.judul}`} onClick=${() => goto(k)}></button>`)}
        </div>
        <button type="button" class=${`cc${cap ? " on" : ""}`} onClick=${() => setCap(!cap)} aria-pressed=${cap} title="Tampilkan atau sembunyikan narasi (T)">Teks</button>
      </div>
      ${info && html`<aside class="ps-info" aria-label="Rincian simulasi">
        <h3>${data.nama}<button type="button" class="ps-btn ps-close" onClick=${() => setInfo(false)} aria-label="Tutup info">×</button></h3>
        <p class="muted">${data.tanggal || data.bulan}${data.tempat && data.tempat.nama ? " · " + data.tempat.nama : ""}</p>
        <h4>Kekuatan pasukan</h4>
        <div class="ps-count">
          ${side("muslim", "Kaum Muslimin", mus.jumlah, mus.ket, mNow, kor.muslim, "syahid", "#57c08a")}
          ${side("musuh", namaLawan, lawan.jumlah, lawan.ket, eNow, kor.musuh, "tewas", "#e0675a")}
          <div class="ps-bar" aria-hidden="true"><i style=${{ width: (tm / totalBar) * 100 + "%", background: "#57c08a" }}></i><i style=${{ width: (te / totalBar) * 100 + "%", background: "#e0675a" }}></i></div>
        </div>
        <h4>Fase ini</h4>
        <p>${F.derajat && html`<span class="ps-der">${DERJ[F.derajat] || F.derajat}</span>`}${F.sumber && html`${F.url ? html`<a href=${F.url} target="_blank" rel="noopener">${F.sumber}</a>` : F.sumber}`}</p>
        ${tokohChips.length > 0 && onProfile && html`<div class="ps-chips">${tokohChips.map((t) => html`<button type="button" key=${t} onClick=${() => onProfile(t)}>${nm(t)}</button>`)}</div>`}
        <h4>Legenda</h4>
        <div class="ps-legend">
          <span><i class="sw" style=${{ background: "#57c08a" }}></i>Muslimin</span>
          <span><i class="sw" style=${{ background: "#e0675a" }}></i>${namaLawan}</span>
          ${sk.unit.some((u) => u.sisi === "netral") && html`<span><i class="sw" style=${{ background: "#b9b5ad" }}></i>Pihak lain</span>`}
          <span><i class="glow"></i>Posisi Rasulullah ﷺ</span>
          <span><i class="ln" style=${{ background: "linear-gradient(90deg,#57c08a,#e0675a)" }}></i>Gerakan</span>
          ${jenisAda.map((j) => html`<span key=${j}>${ICON[j]}${JENIS[j]}</span>`)}
        </div>
        ${per && html`<p class="muted" style=${{ marginTop: "6px" }}>1 figur ≈ ${fmt(per)} orang. Tokoh bernama tampil sebagai figur sendiri.</p>`}
        <h4>Catatan rekonstruksi</h4>
        <p class="muted">Rekonstruksi ilustratif: letak dan susunan pasukan disusun dari kitab sirah dan perkiraan, bukan peta arkeologis. Angka total dari sumber pada data perang.</p>
        ${sk.catatan && html`<p>${sk.catatan}</p>`}
        ${srcs.length > 0 && html`<h4>Sumber (${srcs.length})</h4>
          <ul class="ps-srcs">${srcs.map((r, k) => html`<li key=${k}><a href=${r.url} target="_blank" rel="noopener">${r.sumber || r.url}</a></li>`)}</ul>`}
        <h4>Pintasan papan ketik</h4>
        <div class="ps-keys"><kbd>Spasi</kbd><span>putar / jeda</span><kbd>← →</kbd><span>fase sebelum / berikut</span><kbd>T</kbd><span>narasi</span><kbd>L</kbd><span>label pasukan</span><kbd>I</kbd><span>info ini</span>${canFs && html`<kbd>F</kbd><span>layar penuh</span>`}<kbd>Esc</kbd><span>tutup</span></div>
      </aside>`}
    </div>`;
  }
  window.SirahSimulasi = SirahSimulasi;
})();
