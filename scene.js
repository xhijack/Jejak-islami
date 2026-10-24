// Meja pasir 3D: Jazirah Arab dan sekitarnya (lon 30–52, lat 10–37.5)
(function () {
  const LON0 = 30, LON1 = 52, LAT0 = 10, LAT1 = 37.5;
  const CX = (LON0 + LON1) / 2, CZ = (LAT0 + LAT1) / 2;
  const W = LON1 - LON0, H = LAT1 - LAT0;
  const toXZ = (lon, lat) => [lon - CX, -(lat - CZ)];

  // Laut, perkiraan garis pantai [lon, lat]
  const SEAS = [
    // Laut Merah + Teluk Suez/Aqaba
    [[32.3, 30.0], [32.6, 29.3], [33.5, 27.5], [35.0, 24.0], [37.2, 21.0], [38.5, 18.0], [39.7, 15.5], [41.5, 13.5], [43.2, 12.6],
     [43.4, 12.7], [42.8, 14.8], [42.6, 16.5], [41.0, 19.0], [39.2, 21.5], [38.5, 23.5], [37.2, 25.0], [35.6, 27.5], [35.0, 29.5],
     [34.6, 29.4], [34.3, 28.0], [33.8, 27.9]],
    // Teluk Aden dan Laut Arab
    [[43.4, 12.7], [45.0, 13.0], [48.0, 14.0], [52.5, 15.6], [52.5, 9.5], [51.2, 9.5], [51.0, 11.8], [47.0, 11.1], [44.5, 10.4], [43.2, 11.5]],
    // Teluk Persia
    [[47.9, 29.9], [48.6, 30.1], [50.3, 29.9], [51.4, 28.4], [52.5, 27.4], [52.5, 24.0], [51.6, 24.2], [51.1, 25.9], [50.6, 25.0],
     [50.0, 26.2], [49.6, 27.0], [48.9, 27.6], [48.4, 28.5]],
    // Laut Tengah
    [[29.5, 31.0], [30.5, 31.5], [32.0, 31.2], [34.2, 31.3], [34.9, 32.5], [35.1, 33.5], [35.8, 34.8], [35.9, 36.0], [36.1, 36.6],
     [34.5, 36.8], [32.5, 36.1], [29.5, 36.4]]
  ];
  // Pegunungan: [lon1, lat1, lon2, lat2, tinggi, lebar]
  const RIDGES = [
    [36.4, 28.6, 44.0, 14.0, 0.95, 0.75], // Hijaz–Sarawat
    [43.6, 13.4, 45.2, 16.2, 0.6, 0.9],   // Dataran tinggi Yaman
    [35.8, 31.0, 36.6, 35.2, 0.5, 0.5],   // Lebanon
    [45.6, 34.6, 52.5, 28.6, 1.0, 0.9],   // Zagros
    [37.4, 11.0, 39.6, 15.0, 1.0, 1.0],   // Dataran tinggi Habasyah
    [32.0, 37.5, 41.0, 38.2, 0.9, 0.9],   // Taurus
    [56.0, 24.0, 57.0, 22.0, 0.8, 0.8]    // Hajar (di luar peta)
  ];

  function inPoly(p, poly) {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > p[1]) !== (yj > p[1]) && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) c = !c;
    }
    return c;
  }
  function segDist(px, py, ax, ay, bx, by) {
    const dx = bx - ax, dy = by - ay;
    const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
    return Math.hypot(px - ax - t * dx, py - ay - t * dy);
  }
  function hash(x, y) { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); }
  function vnoise(x, y) {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  function fbm(x, y) { let s = 0, a = 0.5, f = 1; for (let i = 0; i < 4; i++) { s += a * vnoise(x * f, y * f); f *= 2.1; a *= 0.5; } return s; }

  function landHeight(lon, lat) {
    let h = 0.12 + fbm(lon * 0.9, lat * 0.9) * 0.28;
    for (const [a, b, c, d, amp, wid] of RIDGES) {
      const dd = segDist(lon, lat, a, b, c, d);
      h += amp * Math.exp(-((dd / wid) ** 2)) * (0.7 + 0.6 * fbm(lon * 2.3, lat * 2.3));
    }
    // Gurun Nafud & Rub' al-Khali: bukit pasir halus
    h += 0.05 * Math.sin(lon * 7 + fbm(lon, lat) * 6) * (lat < 22 && lon > 45 ? 1 : 0.3);
    return h;
  }

  function lerpC(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
  const SAND_LO = [0.86, 0.74, 0.55], SAND_MID = [0.76, 0.6, 0.4], ROCK = [0.5, 0.37, 0.27], PEAK = [0.36, 0.27, 0.22];
  const SEA_SH = [0.13, 0.27, 0.44], SEA_DP = [0.07, 0.13, 0.27];


  // Gerakan bersama untuk kedua peta: seret (geser/putar), pinch trackpad (ctrl+wheel), gesture Safari,
  // pinch dua jari di layar sentuh, dan scroll. Zoom langsung tanpa jeda dan mengarah ke titik di bawah kursor.
  function installGestures(o) {
    const { THREE, el, camera, st, goal } = o;
    const walking = () => !!(o.isWalk && o.isWalk());
    const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), hit = new THREE.Vector3();
    const ptrs = new Map(); let drag = null, pinch = null;
    function zoomAt(f, cx, cy) {
      if (walking() || (o.locked && o.locked())) return;
      const old = st.dist, nd = Math.max(o.minD, Math.min(o.maxD, old * f));
      if (Math.abs(nd - old) < 1e-6) return;
      if (cx != null) {
        const r = el.getBoundingClientRect();
        ndc.set(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1);
        camera.updateMatrixWorld(); ray.setFromCamera(ndc, camera);
        plane.constant = -st.target.y;
        if (ray.ray.intersectPlane(plane, hit)) {
          const k = 1 - nd / old;
          st.target.x += (hit.x - st.target.x) * k; st.target.z += (hit.z - st.target.z) * k;
          o.clamp(st.target); goal.target.x = st.target.x; goal.target.z = st.target.z;
        }
      }
      st.dist = goal.dist = nd;
    }
    el.addEventListener("contextmenu", (e) => e.preventDefault());
    const locked = () => !!(o.locked && o.locked());
    el.addEventListener("pointerdown", (e) => {
      if (locked()) return;
      try { el.setPointerCapture(e.pointerId); } catch (err) {}
      ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }; drag = null; }
      else if (ptrs.size === 1) drag = { x: e.clientX, y: e.clientY, rot: e.button === 2 || e.shiftKey || e.ctrlKey };
    });
    el.addEventListener("pointermove", (e) => {
      if (!ptrs.has(e.pointerId) || locked()) return;
      ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pinch && ptrs.size >= 2) {
        const [a, b] = [...ptrs.values()], d = Math.hypot(a.x - b.x, a.y - b.y), mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        if (walking()) o.look(mx - pinch.x, my - pinch.y);
        else { if (d > 0 && pinch.d > 0) zoomAt(pinch.d / d, mx, my); o.panBy(mx - pinch.x, my - pinch.y); }
        pinch.d = d; pinch.x = mx; pinch.y = my; return;
      }
      if (!drag) return;
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag.x = e.clientX; drag.y = e.clientY;
      if (walking()) o.look(dx, dy); else if (drag.rot) o.rotate(dx, dy); else o.panBy(dx, dy);
    });
    const up = (e) => {
      ptrs.delete(e.pointerId);
      if (ptrs.size < 2) pinch = null;
      if (ptrs.size === 0) drag = null; else if (ptrs.size === 1) { const [a] = [...ptrs.values()]; drag = { x: a.x, y: a.y, rot: false }; }
    };
    el.addEventListener("pointerup", up); el.addEventListener("pointercancel", up);
    el.addEventListener("wheel", (e) => {
      e.preventDefault();
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 400 : 1);
      const k = e.ctrlKey ? 0.012 : 0.0016; // ctrlKey = pinch trackpad di Chrome/Edge/Firefox
      zoomAt(Math.exp(Math.max(-0.6, Math.min(0.6, dy * k))), e.clientX, e.clientY);
    }, { passive: false });
    let gs = 1; // Safari macOS mengirim pinch sebagai gesture event
    el.addEventListener("gesturestart", (e) => { e.preventDefault(); gs = e.scale || 1; });
    el.addEventListener("gesturechange", (e) => { e.preventDefault(); const s = e.scale || 1; zoomAt(gs / s, e.clientX, e.clientY); gs = s; });
    el.addEventListener("gestureend", (e) => e.preventDefault());
    return { zoomAt };
  }

  function create(container, opts) {
    const THREE = window.THREE;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0b1430, 30, 70);
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 200);

    scene.add(new THREE.HemisphereLight(0xcfd8ff, 0x3a2a1a, 0.55));
    const sun = new THREE.DirectionalLight(0xffe2b0, 1.05);
    sun.position.set(-12, 16, 6);
    scene.add(sun);

    // Medan
    const SEG_X = 220, SEG_Z = 275;
    const geo = new THREE.PlaneGeometry(W, H, SEG_X, SEG_Z);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i);
      const lon = x + CX, lat = -z + CZ;
      const sea = SEAS.some((p) => inPoly([lon, lat], p));
      let y, col;
      if (sea) {
        y = -0.32 - fbm(lon * 0.6, lat * 0.6) * 0.15;
        col = lerpC(SEA_SH, SEA_DP, fbm(lon * 0.5, lat * 0.5));
      } else {
        const hgt = landHeight(lon, lat);
        y = hgt * 0.9;
        const n = fbm(lon * 3, lat * 3) * 0.12;
        col = hgt < 0.35 ? lerpC(SAND_LO, SAND_MID, hgt / 0.35 + n)
          : hgt < 0.8 ? lerpC(SAND_MID, ROCK, (hgt - 0.35) / 0.45 + n)
          : lerpC(ROCK, PEAK, Math.min(1, (hgt - 0.8) / 0.5));
      }
      // Tepi meja menurun
      const ex = Math.min(x + W / 2, W / 2 - x), ez = Math.min(z + H / 2, H / 2 - z);
      const edge = Math.min(1, Math.min(ex, ez) / 0.6);
      pos.setY(i, y * edge - (1 - edge) * 0.6);
      colors.set(col, i * 3);
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    const terrain = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95, metalness: 0 }));
    scene.add(terrain);

    // Permukaan air
    const water = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.4, H - 0.4),
      new THREE.MeshStandardMaterial({ color: 0x24508a, transparent: true, opacity: 0.55, roughness: 0.25, metalness: 0.2 }));
    water.rotation.x = -Math.PI / 2; water.position.y = -0.06;
    scene.add(water);

    // Alas meja
    const base = new THREE.Mesh(new THREE.BoxGeometry(W + 0.6, 0.6, H + 0.6),
      new THREE.MeshStandardMaterial({ color: 0x1a2550, roughness: 0.6, metalness: 0.3 }));
    base.position.y = -0.95; scene.add(base);
    const trim = new THREE.Mesh(new THREE.BoxGeometry(W + 0.7, 0.06, H + 0.7),
      new THREE.MeshStandardMaterial({ color: 0xc9a24a, roughness: 0.35, metalness: 0.8 }));
    trim.position.y = -0.64; scene.add(trim);

    // Debu bintang
    const sg = new THREE.BufferGeometry(); const sp = [];
    for (let i = 0; i < 700; i++) { const r = 45 + Math.random() * 30, t = Math.random() * Math.PI * 2, p = Math.random() * 1.2 + 0.15; sp.push(r * Math.cos(t) * Math.cos(p), r * Math.sin(p), r * Math.sin(t) * Math.cos(p)); }
    sg.setAttribute("position", new THREE.Float32BufferAttribute(sp, 3));
    scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xe8d9a8, size: 0.12, fog: false, transparent: true, opacity: 0.7 })));

    // Penanda lokasi
    const ray = new THREE.Raycaster();
    const markers = {};
    const gold = 0xd9b45a;
    Object.entries(opts.lokasi).forEach(([id, l]) => {
      const [x, z] = toXZ(l.lon, l.lat);
      ray.set(new THREE.Vector3(x, 10, z), new THREE.Vector3(0, -1, 0));
      const hit = ray.intersectObject(terrain)[0];
      const gy = hit ? Math.max(hit.point.y, -0.06) : 0;
      const g = new THREE.Group(); g.position.set(x, gy, z);
      if (l.kecil) g.scale.setScalar(0.6);
      const pillarMat = new THREE.MeshStandardMaterial({ color: gold, emissive: 0x6b4d10, emissiveIntensity: 0.2, metalness: 0.7, roughness: 0.3 });
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.06, 1, 10), pillarMat);
      pillar.position.y = 0.5; g.add(pillar);
      const top = new THREE.Mesh(new THREE.OctahedronGeometry(0.11, 0), pillarMat); top.position.y = 1.05; g.add(top);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xf2d27a, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false });
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.22, 0.3, 40), ringMat);
      ring.rotation.x = -Math.PI / 2; ring.position.y = 0.04; g.add(ring);
      scene.add(g);
      markers[id] = { g, pillar, top, ring, ringMat, pillarMat, active: false, h: 0.45, ground: gy, kecil: !!l.kecil };
    });

    // Rute (misalnya jalur Hijrah): garis emas mengikuti permukaan, titik singgah, dan satu titik sorot
    const down = new THREE.Vector3(0, -1, 0);
    const groundAt = (x, z) => { ray.set(new THREE.Vector3(x, 10, z), down); const hit = ray.intersectObject(terrain)[0]; return hit ? Math.max(hit.point.y, -0.06) : 0; };
    let route = null, routeHi = null;
    function clearRoute() {
      if (!route) return;
      scene.remove(route); route.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); }); route = null; routeHi = null;
    }
    function setRoute(pts, hi) {
      clearRoute();
      if (!pts || pts.length < 2) return;
      const grp = new THREE.Group(), P = [];
      for (let i = 0; i < pts.length - 1; i++) {
        const [ax, az] = toXZ(pts[i].lon, pts[i].lat), [bx, bz] = toXZ(pts[i + 1].lon, pts[i + 1].lat);
        const n = Math.max(2, Math.ceil(Math.hypot(bx - ax, bz - az) / 0.04));
        for (let k = 0; k < n; k++) { const t = k / n, x = ax + (bx - ax) * t, z = az + (bz - az) * t; P.push(new THREE.Vector3(x, groundAt(x, z) + 0.035, z)); }
      }
      const [lx, lz] = toXZ(pts[pts.length - 1].lon, pts[pts.length - 1].lat); P.push(new THREE.Vector3(lx, groundAt(lx, lz) + 0.035, lz));
      const curve = new THREE.CatmullRomCurve3(P, false, "centripetal");
      grp.add(new THREE.Mesh(new THREE.TubeGeometry(curve, P.length * 2, 0.022, 6, false), new THREE.MeshBasicMaterial({ color: 0xf2d27a, transparent: true, opacity: 0.92 })));
      const dotG = new THREE.SphereGeometry(0.04, 12, 8), dotM = new THREE.MeshBasicMaterial({ color: 0xfff1c4 });
      pts.forEach((p, i) => {
        const [x, z] = toXZ(p.lon, p.lat), y = groundAt(x, z) + 0.05;
        const d = new THREE.Mesh(dotG, dotM); d.position.set(x, y, z); grp.add(d);
        if (i === hi) {
          const glow = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffe08a, transparent: true, opacity: 0.55, depthWrite: false }));
          glow.position.set(x, y, z); grp.add(glow); routeHi = { x, y, z, glow };
        }
      });
      scene.add(grp); route = grp;
    }

    // Kamera orbit sederhana
    const st = { az: -0.35, el: 0.95, dist: 30, target: new THREE.Vector3(0, 0, 0) };
    const goal = { az: st.az, el: st.el, dist: st.dist, target: st.target.clone() };
    // Seret kiri = geser peta. Klik kanan / Shift / Ctrl + seret = putar & miringkan.
    const el = renderer.domElement;
    const keys = new Set();
    const clampT = (t) => { t.x = Math.max(-W / 2, Math.min(W / 2, t.x)); t.z = Math.max(-H / 2, Math.min(H / 2, t.z)); };
    function panBy(dx, dy) {
      const k = (2 * st.dist * Math.tan((camera.fov * Math.PI) / 360)) / Math.max(1, container.clientHeight);
      const ca = Math.cos(st.az), sa = Math.sin(st.az), ky = k / Math.max(0.45, Math.sin(st.el));
      goal.target.x += -ca * dx * k - sa * dy * ky; goal.target.z += sa * dx * k - ca * dy * ky;
      clampT(goal.target); st.target.x = goal.target.x; st.target.z = goal.target.z;
    }
    installGestures({ THREE, el, camera, st, goal, minD: 6, maxD: 40, clamp: clampT, panBy,
      rotate: (dx, dy) => { goal.az -= dx * 0.005; goal.el = Math.max(0.35, Math.min(1.45, goal.el + dy * 0.004)); } });
    const typing = (t) => t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable);
    const KEYS = ["w", "a", "s", "d", "q", "e", "arrowup", "arrowdown", "arrowleft", "arrowright"];
    const kd = (e) => { if (typing(e.target)) return; const k = e.key.toLowerCase(); if (KEYS.includes(k)) { keys.add(k); if (k.startsWith("arrow")) e.preventDefault(); } };
    const ku = (e) => keys.delete(e.key.toLowerCase()), blur = () => keys.clear();
    window.addEventListener("keydown", kd); window.addEventListener("keyup", ku); window.addEventListener("blur", blur);
    let lastF = performance.now();

    function resize() {
      const w = container.clientWidth, h = container.clientHeight;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    }
    const ro = new ResizeObserver(resize); ro.observe(container); resize();

    const labels = {};
    const v = new THREE.Vector3();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf, t0 = performance.now(), selected = null;
    function frame(now) {
      const t = (now - t0) / 1000, k = reduce ? 1 : 0.07, dt = Math.min(0.05, (now - lastF) / 1000); lastF = now;
      const kx = (keys.has("d") || keys.has("arrowright") ? 1 : 0) - (keys.has("a") || keys.has("arrowleft") ? 1 : 0);
      const ky = (keys.has("s") || keys.has("arrowdown") ? 1 : 0) - (keys.has("w") || keys.has("arrowup") ? 1 : 0);
      if (kx || ky) panBy(-kx * 600 * dt, -ky * 600 * dt);
      goal.az += ((keys.has("e") ? 1 : 0) - (keys.has("q") ? 1 : 0)) * dt * 1.4;
      st.az += (goal.az - st.az) * k; st.el += (goal.el - st.el) * k; st.dist += (goal.dist - st.dist) * (reduce ? 1 : 0.2);
      st.target.lerp(goal.target, k);
      camera.position.set(
        st.target.x + st.dist * Math.cos(st.el) * Math.sin(st.az),
        st.target.y + st.dist * Math.sin(st.el),
        st.target.z + st.dist * Math.cos(st.el) * Math.cos(st.az));
      camera.lookAt(st.target);
      const near = [];
      for (const id in markers) {
        const m = markers[id];
        const want = m.active ? 1.25 : 0.45;
        m.h += (want - m.h) * 0.1;
        m.pillar.scale.y = m.h; m.pillar.position.y = m.h / 2; m.top.position.y = m.h + 0.06;
        m.top.rotation.y = t * (m.active ? 1.2 : 0.3);
        m.pillarMat.emissiveIntensity = m.active ? 0.55 + 0.25 * Math.sin(t * 3) : 0.1;
        const isSel = id === selected;
        const p = reduce ? 0.5 : (t * 0.7) % 1;
        m.ring.scale.setScalar(m.active ? 1 + p * (isSel ? 3 : 2) : 1);
        m.ringMat.opacity = m.active ? (1 - p) * 0.8 : 0;
        const lab = labels[id];
        if (lab) {
          v.set(m.g.position.x, m.ground + m.h + 0.25, m.g.position.z).project(camera);
          const w = container.clientWidth, h = container.clientHeight;
          const sx = (v.x * 0.5 + 0.5) * w, sy = (-v.y * 0.5 + 0.5) * h;
          lab.style.transform = `translate(${sx.toFixed(1)}px, ${sy.toFixed(1)}px)`;
          lab.style.visibility = v.z < 1 ? "visible" : "hidden";
          lab.style.zIndex = String(Math.round((1 - v.z) * 10000));
          // Tingkat detail label: 0 jauh (nama kota), 1 sedang (jumlah tokoh), 2 dekat (nama tokoh)
          const d = camera.position.distanceTo(m.g.position);
          let lod = d < 17 ? 2 : d < 25 ? 1 : 0;
          if (lod === 2) near.push({ lab, c: Math.hypot(v.x, v.y * 1.2), y: v.y, sel: id === selected });
          if (lod === 2) lod = 1;
          lab._lod = lod;
        }
      }
      // Nama tokoh hanya untuk satu kota: kota terpilih, atau yang paling dekat ke tengah layar. Kota lain cukup jumlahnya.
      near.sort((a, b) => (b.sel - a.sel) || a.c - b.c);
      if (near[0] && (near[0].sel || near[0].c < 0.6)) {
        const w = near[0]; w.lab._lod = 2; w.lab.style.zIndex = "20000";
        const f = w.y > 0.2 ? "1" : "0"; if (w.lab.dataset.flip !== f) w.lab.dataset.flip = f; // dekat tepi atas: daftar nama dibalik ke bawah
      }
      for (const id in labels) { const lab = labels[id]; const s = String(lab._lod || 0); if (lab.dataset.lod !== s) lab.dataset.lod = s; }
      const rl = labels["__rute"];
      if (rl) {
        if (routeHi) {
          routeHi.glow.scale.setScalar(1 + 0.35 * Math.sin(t * 3));
          v.set(routeHi.x, routeHi.y + 0.12, routeHi.z).project(camera);
          rl.style.transform = `translate(${((v.x * 0.5 + 0.5) * container.clientWidth).toFixed(1)}px, ${((-v.y * 0.5 + 0.5) * container.clientHeight).toFixed(1)}px)`;
          rl.style.visibility = v.z < 1 ? "visible" : "hidden"; rl.style.zIndex = "25000";
        } else rl.style.visibility = "hidden";
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return {
      registerLabel(id, node) { if (node) labels[id] = node; else delete labels[id]; },
      setActive(ids) { for (const id in markers) markers[id].active = ids.has(id); },
      select(id) {
        selected = id;
        if (id && markers[id]) {
          const m = markers[id];
          goal.target.set(m.g.position.x, 0, m.g.position.z);
          goal.dist = Math.min(goal.dist, 14);
        }
      },
      overview() { selected = null; goal.target.set(0, 0, 0); goal.dist = 30; goal.el = 0.95; },
      setRoute,
      focus(lon, lat, dist) { const [x, z] = toXZ(lon, lat); goal.target.set(x, 0, z); goal.dist = dist || 12; },
      rotate(d) { goal.az += d; },
      press(k, on) { if (on) keys.add(k); else keys.delete(k); },
      zoom(f) { goal.dist = Math.max(6, Math.min(40, goal.dist * f)); },
      dispose() {
        cancelAnimationFrame(raf); ro.disconnect(); renderer.dispose(); el.remove();
        window.removeEventListener("keydown", kd); window.removeEventListener("keyup", ku); window.removeEventListener("blur", blur);
      }
    };
  }

  window.SirahScene = { create };
  window.SirahGestures = installGestures;
})();
