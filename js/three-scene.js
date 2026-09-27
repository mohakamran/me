/* ==========================================================================
   Hero 3D scene (Three.js)
   - A glossy morphing "blob" (custom shader) sits behind the portrait,
     with glossy geometric shapes orbiting it and a soft particle field.
   - Everything reacts to the mouse; the blob tracks the portrait's
     position on screen (including while the hero parallax-scrolls).
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
        light: { c1: '#6366f1', c2: '#a855f7', c3: '#ec4899', shapes: ['#6366f1', '#a855f7', '#ec4899', '#f59e0b', '#06b6d4', '#8b5cf6'], particles: ['#6366f1', '#a855f7', '#ec4899'] },
        dark:  { c1: '#4f46e5', c2: '#9333ea', c3: '#db2777', shapes: ['#818cf8', '#c084fc', '#f472b6', '#fbbf24', '#22d3ee', '#a78bfa'], particles: ['#818cf8', '#c084fc', '#f472b6'] }
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

        /* Lights (for the glossy shapes) */
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

        /* Floating glossy shapes orbiting the blob */
        var geometries = [
            new THREE.TorusGeometry(0.28, 0.1, 24, 48),
            new THREE.OctahedronGeometry(0.3),
            new THREE.IcosahedronGeometry(0.26),
            new THREE.TorusKnotGeometry(0.2, 0.065, 96, 12),
            new THREE.BoxGeometry(0.34, 0.34, 0.34),
            new THREE.SphereGeometry(0.17, 32, 32)
        ];
        var shapes = geometries.map(function (geo, i) {
            var mat = new THREE.MeshPhysicalMaterial({ roughness: 0.18, metalness: 0.25, clearcoat: 1, clearcoatRoughness: 0.15 });
            var mesh = new THREE.Mesh(geo, mat);
            anchor.add(mesh);
            return {
                mesh: mesh,
                angle: (i / geometries.length) * Math.PI * 2,
                speed: 0.12 + (i % 3) * 0.05,
                rx: 1.25 + (i % 2) * 0.2,        // orbit radius (in blob radii)
                ry: 1.05 + ((i + 1) % 2) * 0.2,
                zOff: (i % 2 ? 1 : -1) * 0.5,
                bob: Math.random() * Math.PI * 2,
                spin: new THREE.Vector3(Math.random(), Math.random(), Math.random()).multiplyScalar(0.8)
            };
        });

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
            shapes.forEach(function (s, i) { s.mesh.material.color.set(pal.shapes[i % pal.shapes.length]); });
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

        /* Mouse */
        var mouse = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
        window.addEventListener('pointermove', function (e) {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
        }, { passive: true });

        /* Loop — only while visible */
        var visible = true, running = false, last = 0, time = 0;
        function loop(ts) {
            if (!visible || document.hidden) { running = false; return; }
            var dt = Math.min(0.05, (ts - (last || ts)) / 1000);
            last = ts;
            time += dt;

            cur.x += (mouse.x - cur.x) * 0.05;
            cur.y += (mouse.y - cur.y) * 0.05;

            // Intro: grow in with a soft overshoot (ease-out-back)
            intro = Math.min(1, intro + dt * 0.9);
            var introEase = 1 + 1.4 * Math.pow(intro - 1, 3) + 0.4 * Math.pow(intro - 1, 2);
            placeAnchor();
            blob.scale.setScalar(anchor.userData.radius * Math.max(0, introEase));

            blobUniforms.uTime.value = time;
            blobUniforms.uAmp.value = 1 + Math.hypot(cur.x, cur.y) * 0.35;
            blob.rotation.y = time * 0.15 + cur.x * 0.5;
            blob.rotation.x = cur.y * 0.35;

            var R = anchor.userData.radius;
            shapes.forEach(function (s, i) {
                s.angle += dt * s.speed;
                var a = s.angle;
                s.mesh.position.set(
                    Math.cos(a) * R * s.rx + cur.x * 0.25 * (i % 2 ? 1 : -1),
                    Math.sin(a) * R * s.ry + Math.sin(time * 1.2 + s.bob) * 0.12 - cur.y * 0.2,
                    Math.sin(a * 0.7) * R * 0.6 + s.zOff
                );
                s.mesh.scale.setScalar(Math.max(0.001, R / 1.9) * Math.max(0, introEase));
                s.mesh.rotation.x += dt * s.spin.x;
                s.mesh.rotation.y += dt * s.spin.y;
                s.mesh.rotation.z += dt * s.spin.z;
            });

            points.rotation.y = time * 0.02 + cur.x * 0.08;
            points.rotation.x = cur.y * 0.05;
            camera.position.x = cur.x * 0.35;
            camera.position.y = -cur.y * 0.25;
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
