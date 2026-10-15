/* ==========================================================================
   Hero 3D scene (Three.js)
   - A glossy morphing "blob" (custom shader) sits behind the portrait,
     orbited by 3D tiles of my tech stack (Python, Laravel, React, AI…)
     on two tilted rings, plus a soft particle field. Hover a tile to flip
     it and see its name; click or tap it to spin it.
   - Everything reacts to the mouse; the blob tracks the portrait's
     position on screen. Scrolling away spins and swells the blob, sends
     the tiles outward and dollies the camera in.
   - Lazy: loaded from the CDN only after the page has loaded and the
     browser is idle. Skipped for prefers-reduced-motion, Save-Data,
     no WebGL or very low-end devices — the CSS gradient orbs remain.
   - Rendering pauses when the hero is off-screen or the tab is hidden.
   ========================================================================== */
(function () {
    'use strict';

    var THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.min.js';

    function shouldRun() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
        var conn = navigator.connection;
        if (conn && (conn.saveData || /2g/.test(conn.effectiveType || ''))) return false;
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return false;
        try {
            var c = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
        } catch (e) { return false; }
    }

    function start() {
        var canvas = document.getElementById('hero-canvas');
        var hero = document.getElementById('home');
        var portrait = document.getElementById('hero-portrait');
        if (!canvas || !hero || !portrait || !shouldRun()) return;

        import(THREE_URL).then(function (THREE) { build(THREE, canvas, hero, portrait); })
            .catch(function (err) { console.warn('3D scene unavailable, using CSS fallback.', err); });
    }

    var PALETTES = {
        light: { c1: '#6366f1', c2: '#a855f7', c3: '#ec4899', particles: ['#6366f1', '#a855f7', '#ec4899'] },
        dark:  { c1: '#4f46e5', c2: '#9333ea', c3: '#db2777', particles: ['#818cf8', '#c084fc', '#f472b6'] }
    };

    var BLOB_VERTEX = [
        'uniform float uTime;',
        'uniform float uAmp;',
        'varying vec3 vNormal;',
        'varying float vDisp;',
        'varying vec3 vPos;',
        'void main() {',
        '  vec3 p = position;',
        '  float t = uTime;',
        '  float d = sin(p.x * 1.7 + t * 0.9) * sin(p.y * 2.0 + t * 0.7) * sin(p.z * 1.5 + t * 0.8) * 0.30',
        '          + sin(p.x * 3.2 + p.y * 2.4 + t * 1.3) * 0.06;',
        '  d *= uAmp;',
        '  vDisp = d;',
        '  vPos = p;',
        '  vec3 displaced = p + normal * d;',
        '  vNormal = normalize(normalMatrix * normal);',
        '  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);',
        '}'
    ].join('\n');

    var BLOB_FRAGMENT = [
        'uniform vec3 uC1;',
        'uniform vec3 uC2;',
        'uniform vec3 uC3;',
        'uniform float uRim;',
        'varying vec3 vNormal;',
        'varying float vDisp;',
        'varying vec3 vPos;',
        'void main() {',
        '  float t = clamp(vDisp * 1.6 + 0.5 + vPos.y * 0.18, 0.0, 1.0);',
        '  vec3 col = mix(uC1, uC2, smoothstep(0.0, 0.55, t));',
        '  col = mix(col, uC3, smoothstep(0.45, 1.0, t));',
        '  vec3 n = normalize(vNormal);',
        '  float fresnel = pow(1.0 - abs(n.z), 2.4);',
        '  col += fresnel * uRim;',
        '  float spec = pow(max(dot(n, normalize(vec3(-0.45, 0.6, 0.65))), 0.0), 28.0);',
        '  col += spec * 0.55;',
        '  gl_FragColor = vec4(col, 1.0);',
        '}'
    ].join('\n');

    function build(THREE, canvas, hero, portrait) {
        var small = window.innerWidth < 768;
        var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75));
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        camera.position.z = 10;

        /* Lights (for the glossy tiles) */
        scene.add(new THREE.AmbientLight(0xffffff, 0.9));
        var key = new THREE.DirectionalLight(0xffffff, 1.6);
        key.position.set(4, 6, 8);
        scene.add(key);
        var pinkLight = new THREE.PointLight(0xec4899, 30, 30);
        pinkLight.position.set(5, 2, 4);
        scene.add(pinkLight);
        var blueLight = new THREE.PointLight(0x6366f1, 30, 30);
        blueLight.position.set(-5, -3, 4);
        scene.add(blueLight);

        /* Anchor group — positioned behind the portrait */
        var anchor = new THREE.Group();
        scene.add(anchor);

        /* Morphing blob */
        var blobUniforms = {
            uTime: { value: 0 },
            uAmp: { value: 1 },
            uC1: { value: new THREE.Color() },
            uC2: { value: new THREE.Color() },
            uC3: { value: new THREE.Color() },
            uRim: { value: 0.55 }
        };
        var blob = new THREE.Mesh(
            new THREE.SphereGeometry(1, small ? 64 : 128, small ? 64 : 128),
            new THREE.ShaderMaterial({ vertexShader: BLOB_VERTEX, fragmentShader: BLOB_FRAGMENT, uniforms: blobUniforms })
        );
        anchor.add(blob);

        /* Tech-stack orbit: glossy logo tiles circling the core on two tilted rings */
        var TECH = [
            { name: 'Python', glyph: '', fam: 'b', color: '#3776ab', ring: 0 },
            { name: 'Laravel', glyph: '', fam: 'b', color: '#f05340', ring: 0 },
            { name: 'React', glyph: '', fam: 'b', color: '#149eca', ring: 0 },
            { name: 'Node.js', glyph: '', fam: 'b', color: '#3c873a', ring: 0 },
            { name: 'PHP', glyph: '', fam: 'b', color: '#777bb4', ring: 0 },
            { name: 'JavaScript', glyph: '', fam: 'b', color: '#e0a800', ring: 0 },
            { name: 'AI & LLMs', glyph: '', fam: 's', color: '#a855f7', ring: 1 },
            { name: 'Docker', glyph: '', fam: 'b', color: '#2496ed', ring: 1 },
            { name: 'TypeScript', text: 'TS', color: '#3178c6', ring: 1 },
            { name: 'MySQL', glyph: '', fam: 's', color: '#00758f', ring: 1 },
            { name: 'Git', glyph: '', fam: 'b', color: '#f05032', ring: 1 },
            { name: 'Tailwind CSS', glyph: '', fam: 's', color: '#06b6d4', ring: 1 }
        ];
        var RINGS = [
            { r: 1.24, speed: 0.20, tilt: new THREE.Euler(1.12, 0, 0.34) },
            { r: 1.5, speed: -0.14, tilt: new THREE.Euler(1.2, 0, -0.38) }
        ];
        var fontsReady = false;

        // Rounded tile: extruded rounded rectangle; caps carry the logo texture, sides the brand colour
        var tileGeo = (function () {
            var sh = new THREE.Shape(), rr = 0.22;
            sh.moveTo(rr, 0); sh.lineTo(1 - rr, 0); sh.quadraticCurveTo(1, 0, 1, rr);
            sh.lineTo(1, 1 - rr); sh.quadraticCurveTo(1, 1, 1 - rr, 1);
            sh.lineTo(rr, 1); sh.quadraticCurveTo(0, 1, 0, 1 - rr);
            sh.lineTo(0, rr); sh.quadraticCurveTo(0, 0, rr, 0);
            var g = new THREE.ExtrudeGeometry(sh, { depth: 0.12, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 4, curveSegments: 10 });
            g.translate(-0.5, -0.5, -0.06);
            return g;
        })();

        function drawFace(t, dark) {
            var c = t.canvas, g = c.getContext('2d'), n = c.width;
            var grd = g.createLinearGradient(0, 0, n, n);
            // Face: soft brand-tinted gradient
            var tint = new THREE.Color(t.color);
            var top = new THREE.Color(dark ? '#20244a' : '#ffffff').lerp(tint, dark ? 0.12 : 0.05);
            var bottom = new THREE.Color(dark ? '#121530' : '#f4f2fb').lerp(tint, dark ? 0.2 : 0.12);
            grd.addColorStop(0, '#' + top.getHexString());
            grd.addColorStop(1, '#' + bottom.getHexString());
            g.fillStyle = grd; g.fillRect(0, 0, n, n);
            var col = new THREE.Color(t.color);
            if (dark) col.lerp(new THREE.Color('#ffffff'), 0.22);
            g.textAlign = 'center'; g.textBaseline = 'middle';
            if (t.text) {
                // TypeScript-style badge
                var b = n * 0.56, x = (n - b) / 2;
                g.fillStyle = t.color; g.beginPath();
                if (g.roundRect) g.roundRect(x, x, b, b, n * 0.07); else g.rect(x, x, b, b);
                g.fill();
                g.fillStyle = '#ffffff'; g.font = '800 ' + Math.round(n * 0.27) + 'px "Outfit", Arial, sans-serif';
                g.fillText(t.text, n / 2 + n * 0.04, n / 2 + n * 0.06);
            } else if (fontsReady) {
                g.fillStyle = '#' + col.getHexString();
                g.font = (t.fam === 'b' ? '400 ' : '900 ') + Math.round(n * 0.56) + 'px "' + (t.fam === 'b' ? 'Font Awesome 6 Brands' : 'Font Awesome 6 Free') + '"';
                g.shadowColor = 'rgba(0,0,0,' + (dark ? 0.35 : 0.12) + ')';
                g.shadowBlur = n * 0.03; g.shadowOffsetY = n * 0.015;
                g.fillText(t.glyph, n / 2, n / 2 + n * 0.02);
                g.shadowColor = 'transparent';
            } else {
                g.fillStyle = '#' + col.getHexString();
                g.font = '800 ' + Math.round(n * 0.2) + 'px Arial, sans-serif';
                g.fillText(t.name.slice(0, 3), n / 2, n / 2);
            }
            t.texture.needsUpdate = true;
        }

        var tiles = TECH.map(function (t, i) {
            t.canvas = document.createElement('canvas');
            t.canvas.width = t.canvas.height = 256;
            t.texture = new THREE.CanvasTexture(t.canvas);
            t.texture.colorSpace = THREE.SRGBColorSpace;
            t.texture.anisotropy = 4;
            // Face is partly self-lit (emissive = its own texture) so logo colours stay true under the coloured lights
            var face = new THREE.MeshPhysicalMaterial({ map: t.texture, emissive: 0xffffff, emissiveMap: t.texture, emissiveIntensity: 0.55, roughness: 0.4, clearcoat: 0.6, clearcoatRoughness: 0.25 });
            var side = new THREE.MeshPhysicalMaterial({ color: t.color, roughness: 0.25, metalness: 0.25, clearcoat: 1 });
            t.mesh = new THREE.Mesh(tileGeo, [face, side]);
            t.mesh.userData.tile = t;
            anchor.add(t.mesh);
            var inRing = TECH.filter(function (x) { return x.ring === t.ring; });
            t.angle = (inRing.indexOf(t) / inRing.length) * Math.PI * 2 + t.ring * 0.5;
            t.phase = i * 1.7;
            t.hover = 0; t.spin = 0; t.spinTarget = 0; t.jump = 0;
            return t;
        });

        // Dashed orbit paths
        var orbitLines = RINGS.map(function (ring) {
            var pts = new THREE.EllipseCurve(0, 0, 1, 1, 0, Math.PI * 2).getPoints(128);
            var geo = new THREE.BufferGeometry().setFromPoints(pts.map(function (p) { return new THREE.Vector3(p.x, p.y, 0); }));
            var line = new THREE.LineLoop(geo, new THREE.LineDashedMaterial({ dashSize: 0.04, gapSize: 0.03, transparent: true, opacity: 0.45 }));
            line.computeLineDistances();
            line.rotation.copy(ring.tilt);
            anchor.add(line);
            return line;
        });

        // Logos use the page's Font Awesome fonts; redraw once they are available
        if (document.fonts && document.fonts.load) {
            Promise.all([
                document.fonts.load('400 64px "Font Awesome 6 Brands"'),
                document.fonts.load('900 64px "Font Awesome 6 Free"')
            ]).then(function () { fontsReady = true; applyTheme(); }).catch(function () {});
        }

        /* Soft particle field */
        var sprite = (function () {
            var s = document.createElement('canvas');
            s.width = s.height = 64;
            var g = s.getContext('2d');
            var grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
            grd.addColorStop(0, 'rgba(255,255,255,1)');
            grd.addColorStop(0.45, 'rgba(255,255,255,0.5)');
            grd.addColorStop(1, 'rgba(255,255,255,0)');
            g.fillStyle = grd;
            g.fillRect(0, 0, 64, 64);
            var tex = new THREE.CanvasTexture(s);
            tex.colorSpace = THREE.SRGBColorSpace;
            return tex;
        })();
        var COUNT = small ? 260 : 700;
        var pos = new Float32Array(COUNT * 3), col = new Float32Array(COUNT * 3), seed = new Float32Array(COUNT);
        for (var i = 0; i < COUNT; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 22;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 13;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
            seed[i] = Math.random();
        }
        var pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        pGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
        var pMat = new THREE.PointsMaterial({ size: 0.07, map: sprite, vertexColors: true, transparent: true, depthWrite: false });
        var points = new THREE.Points(pGeo, pMat);
        scene.add(points);

        function themeKey() { return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }
        function applyTheme() {
            var k = themeKey(), pal = PALETTES[k];
            blobUniforms.uC1.value.set(pal.c1);
            blobUniforms.uC2.value.set(pal.c2);
            blobUniforms.uC3.value.set(pal.c3);
            blobUniforms.uRim.value = k === 'dark' ? 0.45 : 0.6;
            tiles.forEach(function (t) { drawFace(t, k === 'dark'); });
            orbitLines.forEach(function (l) { l.material.color.set(pal.c2); l.material.opacity = k === 'dark' ? 0.55 : 0.4; });
            var c = new THREE.Color();
            for (var i = 0; i < COUNT; i++) {
                c.set(pal.particles[Math.floor(seed[i] * pal.particles.length)]);
                col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
            }
            pGeo.attributes.color.needsUpdate = true;
            pMat.blending = k === 'dark' ? THREE.AdditiveBlending : THREE.NormalBlending;
            pMat.opacity = k === 'dark' ? 0.85 : 0.5;
            pMat.needsUpdate = true;
        }
        applyTheme();
        document.addEventListener('themechange', applyTheme);

        /* Sizing: keep the blob centred behind the portrait */
        var heroW = 1, heroH = 1, unitsPerPx = 0.01;
        function resize() {
            heroW = hero.clientWidth; heroH = hero.clientHeight;
            renderer.setSize(heroW, heroH, false);
            camera.aspect = heroW / heroH;
            camera.updateProjectionMatrix();
            var visibleH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
            unitsPerPx = visibleH / heroH;
        }
        function placeAnchor() {
            var hr = hero.getBoundingClientRect();
            var pr = portrait.getBoundingClientRect();
            var cx = pr.left + pr.width / 2 - hr.left;
            var cy = pr.top + pr.height / 2 - hr.top;
            anchor.position.x = (cx - heroW / 2) * unitsPerPx;
            anchor.position.y = -(cy - heroH / 2) * unitsPerPx;
            // Blob a bit larger than the portrait so it glows out around the edges
            anchor.userData.radius = (pr.width * (heroW < 640 ? 0.6 : 0.66)) * unitsPerPx;
        }
        var intro = 0; // 0 → 1 grow-in progress
        resize();
        window.addEventListener('resize', resize, { passive: true });

        /* Tile interaction: hover grows + flips a tile and shows its name; click spins it */
        var raycaster = new THREE.Raycaster(), ndc = new THREE.Vector2(), tmpV = new THREE.Vector3();
        var hovered = null, px = -1, py = -1, pointerMoved = false, blocked = false, tipTimer = null;
        var tileMeshes = tiles.map(function (t) { return t.mesh; });
        var cursorEl = document.querySelector('.cursor');
        var tip = document.createElement('div');
        tip.className = 'tech-tip';
        tip.setAttribute('aria-hidden', 'true');
        document.body.appendChild(tip);

        function hitTest(x, y) {
            var rect = canvas.getBoundingClientRect();
            if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) return null;
            ndc.set(((x - rect.left) / rect.width) * 2 - 1, -((y - rect.top) / rect.height) * 2 + 1);
            raycaster.setFromCamera(ndc, camera);
            var hits = raycaster.intersectObjects(tileMeshes.concat([blob]), false);
            // A tile hidden behind the glowing core doesn't count
            return hits.length && hits[0].object.userData.tile ? hits[0].object.userData.tile : null;
        }
        function isBlocked(x, y) {
            var el = document.elementFromPoint(x, y);
            return !el || !!el.closest('.portrait, .float-card, .hero-copy a, .hero-copy button, .hero-title, .hero-lead, .hero-meta, .status-pill, .site-header, .scroll-cue');
        }
        function setHover(t) {
            if (t === hovered) return;
            if (t) t.spinTarget += Math.PI * 2;          // flip around once on hover
            hovered = t;
            hero.classList.toggle('tile-hover', !!t);
            // The custom cursor shows its hover ring; the name floats above the tile
            if (cursorEl && document.documentElement.classList.contains('has-custom-cursor')) {
                cursorEl.setAttribute('data-state', t ? 'link' : '');
            }
            if (t) showTip(t); else hideTip();
        }
        function pickHover() {
            if (!pointerMoved) return;
            pointerMoved = false;
            setHover(blocked ? null : hitTest(px, py));
        }
        function showTip(t) { tip.textContent = t.name; tip.style.setProperty('--c', t.color); tip.classList.add('show'); tip._t = t; }
        function hideTip() { tip.classList.remove('show'); tip._t = null; }
        function placeTip() {
            var t = tip._t;
            if (!t) return;
            t.mesh.getWorldPosition(tmpV).project(camera);
            var rect = canvas.getBoundingClientRect();
            tip.style.transform = 'translate3d(' + (rect.left + (tmpV.x + 1) / 2 * rect.width).toFixed(1) + 'px,' + (rect.top + (1 - tmpV.y) / 2 * rect.height).toFixed(1) + 'px,0)';
        }
        window.addEventListener('pointermove', function (e) {
            if (e.pointerType !== 'mouse') return;
            px = e.clientX; py = e.clientY; pointerMoved = true;
            blocked = isBlocked(px, py);
        }, { passive: true });
        hero.addEventListener('pointerleave', function () { px = py = -1; pointerMoved = true; });
        hero.addEventListener('click', function (e) {
            if (e.target.closest('a, button, input, .portrait')) return;
            var t = hitTest(e.clientX, e.clientY);
            if (!t) return;
            t.spinTarget += Math.PI * 4;                 // double spin + hop toward the viewer
            t.jump = 1;
            if (e.pointerType !== 'mouse' || !hovered) {   // touch: show the name for a moment
                showTip(t);
                clearTimeout(tipTimer);
                tipTimer = setTimeout(function () { if (hovered !== t) hideTip(); }, 1600);
            }
        });

        /* Mouse */
        var mouse = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
        window.addEventListener('pointermove', function (e) {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
        }, { passive: true });

        /* Scroll: 0 at the top of the page → 1 once the hero has scrolled away */
        var scrollP = 0, scrollCur = 0;
        function readScroll() { scrollP = Math.max(0, Math.min(1, window.scrollY / Math.max(1, hero.offsetHeight * 0.85))); }
        window.addEventListener('scroll', readScroll, { passive: true });
        readScroll();

        /* Loop — only while visible */
        var visible = true, running = false, last = 0, time = 0;
        function loop(ts) {
            if (!visible || document.hidden) { running = false; return; }
            var dt = Math.min(0.05, (ts - (last || ts)) / 1000);
            last = ts;
            time += dt;

            cur.x += (mouse.x - cur.x) * 0.05;
            cur.y += (mouse.y - cur.y) * 0.05;
            scrollCur += (scrollP - scrollCur) * 0.08;      // smoothed scroll progress
            var sp = scrollCur;

            // Intro: grow in with a soft overshoot (ease-out-back)
            intro = Math.min(1, intro + dt * 0.9);
            var introEase = 1 + 1.4 * Math.pow(intro - 1, 3) + 0.4 * Math.pow(intro - 1, 2);
            placeAnchor();
            // Scrolling away: the blob swells, wobbles harder and spins
            blob.scale.setScalar(anchor.userData.radius * Math.max(0, introEase) * (1 + sp * 0.55));

            blobUniforms.uTime.value = time;
            blobUniforms.uAmp.value = 1 + Math.hypot(cur.x, cur.y) * 0.35 + sp * 0.9;
            blob.rotation.y = time * 0.15 + cur.x * 0.5 + sp * 2.4;
            blob.rotation.x = cur.y * 0.35 + sp * 0.8;
            blob.rotation.z = sp * 1.2;

            // Tech tiles orbit the core; scrolling widens the rings and speeds them up
            var R = anchor.userData.radius * (1 + sp * 1.2) * (heroW < 640 ? 0.8 : 1);   // tighter orbits on phones
            pickHover();
            orbitLines.forEach(function (l, i) { l.scale.setScalar(Math.max(0.001, R * RINGS[i].r * introEase)); });
            tiles.forEach(function (t) {
                var ring = RINGS[t.ring];
                t.angle += dt * ring.speed * (1 + sp * 2.5) * (hovered ? 0.3 : 1);
                var rr = R * ring.r;
                tmpV.set(Math.cos(t.angle) * rr, Math.sin(t.angle) * rr, 0).applyEuler(ring.tilt);
                t.hover += ((hovered === t ? 1 : 0) - t.hover) * 0.14;
                t.jump *= 0.93;
                t.spin += (t.spinTarget - t.spin) * 0.07;
                t.mesh.position.set(tmpV.x, tmpV.y, tmpV.z + t.jump * R * 0.6 + t.hover * R * 0.25);
                t.mesh.scale.setScalar(Math.max(0.001, R * 0.31 * (1 + t.hover * 0.45 + t.jump * 0.3) * Math.max(0, introEase)));
                // Mostly face the viewer so logos stay readable, with a gentle wobble
                t.mesh.rotation.set(
                    Math.sin(time * 0.9 + t.phase) * 0.22 - cur.y * 0.25,
                    Math.cos(time * 0.7 + t.phase) * 0.3 + cur.x * 0.35 + t.spin,
                    Math.sin(time * 0.5 + t.phase) * 0.08
                );
            });
            placeTip();

            points.rotation.y = time * 0.02 + cur.x * 0.08 + sp * 0.7;
            points.rotation.x = cur.y * 0.05 + sp * 0.25;
            camera.position.x = cur.x * 0.35;
            camera.position.y = -cur.y * 0.25;
            camera.position.z = 10 - sp * 2.6;                // dolly in
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
            requestAnimationFrame(loop);
        }
        function kick() {
            if (!running && visible && !document.hidden) { running = true; last = 0; requestAnimationFrame(loop); }
        }

        new IntersectionObserver(function (entries) {
            visible = entries[0].isIntersecting;
            kick();
        }, { threshold: 0 }).observe(hero);
        document.addEventListener('visibilitychange', kick);

        kick();
        canvas.classList.add('ready');
        document.documentElement.classList.add('has-webgl');
    }

    window.addEventListener('load', function () {
        if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 2000 });
        else setTimeout(start, 500);
    });
})();
