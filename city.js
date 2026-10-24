// Lembah Mekah 3D sekitar masa Nabi. 1 unit = 20 m. x = timur, -z = utara.
(function () {
  const M = 20, VX = 1.6; // meter per unit, eksagerasi vertikal
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

  // Gunung: [e, n, radius, tinggi] (meter) dan punggungan [e1, n1, e2, n2, lebar, tinggi]
  const PEAKS = [[360, -200, 185, 140], [700, 420, 280, 160], [-200, -660, 260, 100], [260, -720, 240, 110], [-160, 860, 300, 120], [900, -150, 260, 120]];
  const RIDGES = [[-460, -180, -330, 470, 170, 130], [520, 180, 860, 640, 150, 120], [-700, 300, -500, 800, 200, 110]];
  const HILLOCKS = [[100, -85, 26, 9], [125, 340, 24, 7]]; // Shafa, Marwah

  function mountainH(e, n) {
    let h = 0;
    for (const [pe, pn, r, ht] of PEAKS) h += ht * Math.exp(-(((e - pe) ** 2 + (n - pn) ** 2) / (r * r)));
    for (const [a, b, c, d, w, ht] of RIDGES) h += ht * Math.exp(-((segDist(e, n, a, b, c, d) / w) ** 2));
    return h * (0.75 + 0.5 * fbm(e / 90, n / 90));
  }
  function heightAt(e, n) {
    const d = Math.hypot(e, n);
    let floor = Math.max(0, 0.016 * (0.45 * e + 0.9 * n)) * smooth(30, 120, d);
    for (const [he, hn, r, ht] of HILLOCKS) floor += ht * Math.exp(-(((e - he) ** 2 + (n - hn) ** 2) / (r * r)));
    return floor + mountainH(e, n) + fbm(e / 40, n / 40) * 1.5;
  }

  function create(container, opts) {
    const THREE = window.THREE;
    const places = opts.tempat;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x15122a, 80, 170);
    const camera = new THREE.PerspectiveCamera(36, 1, 0.05, 400);

    scene.add(new THREE.HemisphereLight(0xd9d2ff, 0x2a1d14, 0.42));
    const sun = new THREE.DirectionalLight(0xffcf96, 1.05);
    sun.position.set(-40, 17, 12); scene.add(sun);

    // Medan
    const SIZE = 2200, SEG = 220, HALF = SIZE / 2, OFF_E = 100, OFF_N = 80;
    const geo = new THREE.PlaneGeometry(SIZE / M, SIZE / M, SEG, SEG);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position, col = new Float32Array(pos.count * 3);
    const cSand = new THREE.Color(0xa9875a), cDust = new THREE.Color(0x8c6b47), cRock = new THREE.Color(0x5b4334), cDark = new THREE.Color(0x372921);
    const tmp = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const e = pos.getX(i) * M + OFF_E, n = -pos.getZ(i) * M + OFF_N;
      const mh = mountainH(e, n), h = heightAt(e, n);
      const edge = Math.min(1, (HALF - Math.max(Math.abs(e - OFF_E), Math.abs(n - OFF_N))) / 80);
      pos.setX(i, toX(e)); pos.setZ(i, toZ(n));
      pos.setY(i, (h * VX) / M * edge - (1 - edge) * 0.8);
      const r = fbm(e / 25, n / 25);
      if (mh < 6) tmp.copy(cSand).lerp(cDust, r * 0.8);
      else if (mh < 60) tmp.copy(cDust).lerp(cRock, (mh - 6) / 54 + r * 0.2);
      else tmp.copy(cRock).lerp(cDark, Math.min(1, (mh - 60) / 90 + r * 0.3));
      col.set([tmp.r, tmp.g, tmp.b], i * 3);
    }
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    geo.computeVertexNormals();
    scene.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 })));
    const base = new THREE.Mesh(new THREE.BoxGeometry(SIZE / M + 0.6, 0.8, SIZE / M + 0.6),
      new THREE.MeshStandardMaterial({ color: 0x1a2550, roughness: 0.6, metalness: 0.3 }));
    base.position.set(toX(OFF_E), -1.2, toZ(OFF_N)); scene.add(base);

    const Y = (e, n) => (heightAt(e, n) * VX) / M;

    // Halaman thawaf
    const mataf = new THREE.Mesh(new THREE.CircleGeometry(38 / M, 48), new THREE.MeshStandardMaterial({ color: 0xcdb68a, roughness: 0.9 }));
    mataf.rotation.x = -Math.PI / 2; mataf.position.y = 0.012; scene.add(mataf);

    // Ka'bah (dibangun ulang Quraisy): ±12 x 10 m, tinggi ±9 m. Sudut Hajar Aswad menghadap timur.
    // rotasi -45°: sisi lokal -x menghadap barat laut (Hijr), sisi lokal -z menghadap timur laut (pintu)
    const kabah = new THREE.Group(); kabah.rotation.y = -Math.PI / 4;
    const kb = new THREE.Mesh(new THREE.BoxGeometry(12 / M, (9 * VX) / M, 10 / M), new THREE.MeshStandardMaterial({ color: 0x2c2723, roughness: 0.85 }));
    kb.position.y = (4.5 * VX) / M; kabah.add(kb);
    const door = new THREE.Mesh(new THREE.BoxGeometry(2 / M, 3 / M, 0.2 / M), new THREE.MeshStandardMaterial({ color: 0x8a6a2c, metalness: 0.5, roughness: 0.4 }));
    door.position.set(2.5 / M, (4.2 * VX) / M, -5.05 / M); kabah.add(door);
    // Hijr: setengah lingkaran pada sisi pendek
    const hijrMat = new THREE.MeshStandardMaterial({ color: 0xcdb48a, roughness: 0.9 });
    const SEGS = 16;
    for (let i = 0; i < SEGS; i++) {
      const a0 = -Math.PI / 2 + (Math.PI * i) / SEGS, a1 = -Math.PI / 2 + (Math.PI * (i + 1)) / SEGS;
      const p0 = [-6 - 8 * Math.cos(a0), 5.2 * Math.sin(a0)], p1 = [-6 - 8 * Math.cos(a1), 5.2 * Math.sin(a1)];
      const len = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);
      const seg = new THREE.Mesh(new THREE.BoxGeometry((len + 0.3) / M, (1.3 * VX) / M, 0.9 / M), hijrMat);
      seg.position.set((p0[0] + p1[0]) / 2 / M, (0.65 * VX) / M, (p0[1] + p1[1]) / 2 / M);
      seg.rotation.y = -Math.atan2(p1[1] - p0[1], p1[0] - p0[0]);
      kabah.add(seg);
    }
    scene.add(kabah);
    const zam = new THREE.Mesh(new THREE.CylinderGeometry(1.6 / M, 1.6 / M, 1.4 / M, 16), new THREE.MeshStandardMaterial({ color: 0xbfa77d }));
    zam.position.set(toX(18), 0.7 / M, toZ(-8)); scene.add(zam);
    const maq = new THREE.Mesh(new THREE.BoxGeometry(1.2 / M, 1.4 / M, 1.2 / M), new THREE.MeshStandardMaterial({ color: 0xa99068 }));
    maq.position.set(toX(12), 0.7 / M, toZ(9)); scene.add(maq);

    // Jalan Mas'a (tanah terbuka)
    const mas = new THREE.Mesh(new THREE.PlaneGeometry(14 / M, 430 / M), new THREE.MeshStandardMaterial({ color: 0xd6bf92, roughness: 1, transparent: true, opacity: 0.55 }));
    mas.rotation.x = -Math.PI / 2; mas.rotation.z = Math.atan2(25, 425);
    mas.position.set(toX(112), Y(112, 128) + 0.03, toZ(128)); scene.add(mas);

    // Rumah-rumah penduduk (instanced)
    const named = places.filter((p) => p.jenis === "rumah");
    const masE = (n) => 100 + ((n + 85) / 425) * 25;
    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const houses = [];
    for (let k = 0; k < 9000 && houses.length < 720; k++) {
      const e = -560 + rnd() * 1300, n = -520 + rnd() * 1300;
      const d = Math.hypot(e, n);
      if (d < 46 || rnd() > Math.exp(-d / 520)) continue;
      if (n > -95 && n < 350 && Math.abs(e - masE(n)) < 13) continue;
      if (mountainH(e, n) > 28) continue;
      const h0 = heightAt(e, n), sl = Math.abs(heightAt(e + 8, n) - h0) + Math.abs(heightAt(e, n + 8) - h0);
      if (sl > 3.2) continue;
      if (named.some((p) => Math.hypot(p.e - e, p.n - n) < 22)) continue;
      if (houses.some((q) => Math.abs(q.e - e) < 10 && Math.abs(q.n - n) < 10)) continue;
      houses.push({ e, n, w: 6 + rnd() * 5, l: 6 + rnd() * 5, h: 3 + rnd() * 3.5, r: Math.atan2(n, e) + (rnd() - 0.5) * 0.5, c: rnd() });
    }
    const hGeo = new THREE.BoxGeometry(1, 1, 1); hGeo.translate(0, 0.5, 0);
    const hMat = new THREE.MeshStandardMaterial({ roughness: 0.95 });
    const inst = new THREE.InstancedMesh(hGeo, hMat, houses.length);
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p3 = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0);
    const hc1 = new THREE.Color(0xc29a68), hc2 = new THREE.Color(0xe2c69c);
    houses.forEach((hh, i) => {
      q.setFromAxisAngle(up, -hh.r); s.set(hh.w / M, (hh.h * VX) / M, hh.l / M);
      p3.set(toX(hh.e), Y(hh.e, hh.n) - 0.02, toZ(hh.n));
      inst.setMatrixAt(i, m4.compose(p3, q, s));
      inst.setColorAt(i, tmp.copy(hc1).lerp(hc2, hh.c));
    });
    scene.add(inst);

    // Rumah bernama dan penanda
    const KCOL = { pasti: 0xd9b45a, kitab: 0x6cc4ae, perkiraan: 0xd08f7c };
    const markers = {};
    const ray = new THREE.Raycaster();
    places.forEach((p) => {
      const x = toX(p.e), z = toZ(p.n);
      let topY, mesh = null, mat = null;
      if (p.jenis === "rumah") {
        const w = p.besar ? 20 : 14, l = p.besar ? 16 : 12, h = p.besar ? 8 : 6.5;
        mat = new THREE.MeshStandardMaterial({ color: 0xf2dcae, roughness: 0.8, emissive: KCOL[p.keyakinan], emissiveIntensity: 0 });
        mesh = new THREE.Mesh(new THREE.BoxGeometry(w / M, (h * VX) / M, l / M), mat);
        const gy = Y(p.e, p.n);
        mesh.position.set(x, gy + (h * VX) / M / 2 - 0.02, z); mesh.rotation.y = -Math.atan2(p.n, p.e);
        scene.add(mesh);
        const par = new THREE.Mesh(new THREE.BoxGeometry((w + 1) / M, 0.6 / M, (l + 1) / M), new THREE.MeshStandardMaterial({ color: 0xa47e55 }));
        par.position.copy(mesh.position); par.position.y += (h * VX) / M / 2; par.rotation.copy(mesh.rotation); scene.add(par);
        topY = gy + (h * VX) / M;
      } else if (p.jenis === "kabah") topY = (9 * VX) / M;
      else if (p.jenis === "gunung") topY = Y(p.e, p.n) + 0.3;
      else topY = Y(p.e, p.n) + 0.05;
      const g = new THREE.Group();
      const show = p.jenis !== "gunung" && p.jenis !== "kawasan";
      const pm = new THREE.MeshBasicMaterial({ color: KCOL[p.keyakinan] });
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1, 6), pm);
      const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.06, 0), pm);
      const ringM = new THREE.MeshBasicMaterial({ color: KCOL[p.keyakinan], transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false });
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.22, 36), ringM); ring.rotation.x = -Math.PI / 2;
      if (show) { g.add(pole, gem); }
      if (p.jenis !== "gunung") g.add(ring);
      g.position.set(x, topY, z); scene.add(g);
      ring.position.y = (p.jenis === "rumah" ? -(topY - Y(p.e, p.n)) : 0) + 0.03;
      markers[p.id] = { p, g, pole, gem, ring, ringM, mat, h: 0.35, show, topY };
    });

    // Kamera
    const st = { az: -0.55, el: 0.82, dist: 34, target: new THREE.Vector3(toX(90), 0, toZ(90)) };
    const goal = { az: st.az, el: st.el, dist: st.dist, target: st.target.clone() };
    let drag = null; const el = renderer.domElement;
    el.addEventListener("pointerdown", (e) => { drag = { x: e.clientX, y: e.clientY }; el.setPointerCapture(e.pointerId); });
    el.addEventListener("pointermove", (e) => {
      if (!drag) return;
      goal.az -= (e.clientX - drag.x) * 0.005;
      goal.el = Math.max(0.3, Math.min(1.45, goal.el + (e.clientY - drag.y) * 0.004));
      drag = { x: e.clientX, y: e.clientY };
    });
    el.addEventListener("pointerup", () => { drag = null; });
    el.addEventListener("wheel", (e) => { e.preventDefault(); goal.dist = Math.max(2.2, Math.min(90, goal.dist * (1 + e.deltaY * 0.001))); }, { passive: false });

    function resize() { const w = container.clientWidth, h = container.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
    const ro = new ResizeObserver(resize); ro.observe(container); resize();

    const labels = {}; const v = new THREE.Vector3();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let active = new Set(), selected = null, raf, t0 = performance.now();
    function frame(now) {
      const t = (now - t0) / 1000, k = reduce ? 1 : 0.08;
      st.az += (goal.az - st.az) * k; st.el += (goal.el - st.el) * k; st.dist += (goal.dist - st.dist) * k; st.target.lerp(goal.target, k);
      camera.position.set(st.target.x + st.dist * Math.cos(st.el) * Math.sin(st.az), st.target.y + st.dist * Math.sin(st.el), st.target.z + st.dist * Math.cos(st.el) * Math.cos(st.az));
      camera.lookAt(st.target);
      const lodMax = st.dist < 9 ? 2 : st.dist < 48 ? 1 : 0;
      const W = container.clientWidth, H = container.clientHeight;
      for (const id in markers) {
        const m = markers[id], act = active.has(id), sel = id === selected;
        const want = (act || sel ? 0.75 : 0.32) * Math.min(1.6, Math.max(0.5, st.dist / 22));
        m.h += (want - m.h) * 0.12;
        m.pole.scale.y = m.h; m.pole.position.y = m.h / 2; m.gem.position.y = m.h + 0.03; m.gem.rotation.y = t * (act ? 1.4 : 0.3);
        const sc = Math.max(0.4, st.dist / 22);
        m.gem.scale.setScalar(sc * (sel ? 1.5 : 1));
        const ph = reduce ? 0.5 : (t * 0.7) % 1;
        m.ring.scale.setScalar(sc * (act || sel ? 1 + ph * (m.p.jenis === "kawasan" ? 6 : 2.2) : 1));
        m.ringM.opacity = act || sel ? (1 - ph) * 0.8 : 0;
        if (m.mat) m.mat.emissiveIntensity = sel ? 0.6 : act ? 0.3 + 0.15 * Math.sin(t * 3) : 0.05;
        const lab = labels[id];
        if (lab) {
          const vis = sel || m.p.lod <= lodMax || (act && m.p.lod <= lodMax + 1);
          v.set(m.g.position.x, m.g.position.y + (m.show ? m.h + 0.12 : 0.1), m.g.position.z).project(camera);
          lab.style.transform = `translate(${((v.x * 0.5 + 0.5) * W).toFixed(1)}px, ${((-v.y * 0.5 + 0.5) * H).toFixed(1)}px)`;
          lab.style.visibility = v.z < 1 && vis ? "visible" : "hidden";
          lab.style.zIndex = String(sel ? 99999 : Math.round((1 - v.z) * 10000));
        }
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return {
      registerLabel(id, node) { if (node) labels[id] = node; else delete labels[id]; },
      setActive(ids) { active = ids; },
      select(id) {
        selected = id;
        const m = id && markers[id];
        if (!m) return;
        goal.target.set(m.g.position.x, Math.max(0, m.topY * 0.5), m.g.position.z);
        const zoomTo = m.p.jenis === "gunung" || m.p.jenis === "kawasan" ? 28 : m.p.lod === 2 ? 5 : 10;
        goal.dist = Math.min(goal.dist, zoomTo);
      },
      overview() { selected = null; goal.target.set(toX(90), 0, toZ(90)); goal.dist = 34; goal.el = 0.82; },
      rotate(d) { goal.az += d; },
      zoom(f) { goal.dist = Math.max(2.2, Math.min(90, goal.dist * f)); },
      dispose() { cancelAnimationFrame(raf); ro.disconnect(); renderer.dispose(); el.remove(); }
    };
  }
  window.MekahScene = { create };
})();
