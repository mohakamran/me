/* ==========================================================================
   Skills globe — a rotating 3D sphere of skill tags (pure CSS 3D + JS,
   no WebGL). Tags are read from the skill cards, so there is one source
   of truth. Auto-rotates, follows drag / mouse, and only animates while
   visible. Static (no rotation loop) for prefers-reduced-motion.
   ========================================================================== */
(function () {
    'use strict';

    function init() {
        var globe = document.getElementById('skill-globe');
        if (!globe) return;

        var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var tiles = document.querySelectorAll('.skill-tiles li');
        var items = Array.prototype.map.call(tiles, function (li) {
            // lastChild is the name text node; the icon / letter badge comes before it
            return { label: li.lastChild.textContent.trim(), color: li.style.getPropertyValue('--c') || 'var(--accent)' };
        });
        if (!items.length) return;

        // Evenly distribute points on a sphere (Fibonacci lattice)
        var n = items.length, golden = Math.PI * (3 - Math.sqrt(5));
        var nodes = items.map(function (item, i) {
            var y = 1 - (i / (n - 1)) * 2;
            var r = Math.sqrt(1 - y * y);
            var theta = golden * i;
            var el = document.createElement('span');
            el.className = 'globe-tag';
            el.textContent = item.label;
            el.style.setProperty('--c', item.color);
            globe.appendChild(el);
            return { el: el, x: Math.cos(theta) * r, y: y, z: Math.sin(theta) * r };
        });

        var radius = 160, rotX = 0.35, rotY = 0, velX = 0.0012, velY = 0.0042;
        var visible = false, running = false, dragging = false, lastX = 0, lastY = 0;

        // Radius leaves room for the widest tag (front tags scale up to 1.15×),
        // so no tag ever pokes outside the globe — this caused horizontal scroll on phones.
        function measure() {
            var size = Math.min(globe.clientWidth, globe.clientHeight);
            var widest = 0;
            nodes.forEach(function (n) { widest = Math.max(widest, n.el.offsetWidth); });
            radius = Math.max(size * 0.28, size / 2 - (widest * 1.15) / 2 - 6);
        }

        function draw() {
            var cx = Math.cos(rotX), sx = Math.sin(rotX), cy = Math.cos(rotY), sy = Math.sin(rotY);
            for (var i = 0; i < nodes.length; i++) {
                var p = nodes[i];
                // rotate around Y, then X
                var x1 = p.x * cy + p.z * sy;
                var z1 = -p.x * sy + p.z * cy;
                var y2 = p.y * cx - z1 * sx;
                var z2 = p.y * sx + z1 * cx;
                var depth = (z2 + 1) / 2; // 0 (back) … 1 (front)
                p.el.style.transform = 'translate(-50%, -50%) translate3d(' + (x1 * radius).toFixed(1) + 'px,' + (y2 * radius).toFixed(1) + 'px,' + (z2 * radius).toFixed(1) + 'px) scale(' + (0.6 + depth * 0.55).toFixed(3) + ')';
                p.el.style.opacity = (0.25 + depth * 0.75).toFixed(2);
                p.el.style.zIndex = String(Math.round(depth * 100));
                p.el.classList.toggle('front', depth > 0.8);
            }
        }

        function loop() {
            if (!visible || document.hidden) { running = false; return; }
            if (!dragging) {
                rotX += velX; rotY += velY;
                // ease back to the cruising speed after a drag fling
                velX += (0.0012 - velX) * 0.02;
                velY += (0.0042 - velY) * 0.02;
            }
            draw();
            requestAnimationFrame(loop);
        }
        function kick() { if (!running && visible && !reduceMotion) { running = true; requestAnimationFrame(loop); } }

        globe.addEventListener('pointerdown', function (e) {
            dragging = true; lastX = e.clientX; lastY = e.clientY;
            globe.setPointerCapture(e.pointerId);
            globe.classList.add('grabbing');
        });
        globe.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var dx = e.clientX - lastX, dy = e.clientY - lastY;
            lastX = e.clientX; lastY = e.clientY;
            velY = dx * 0.0009; velX = -dy * 0.0009;
            rotY += dx * 0.008; rotX -= dy * 0.008;
            if (reduceMotion) draw();
        });
        function release() { dragging = false; globe.classList.remove('grabbing'); }
        globe.addEventListener('pointerup', release);
        globe.addEventListener('pointercancel', release);

        measure();
        draw();
        window.addEventListener('resize', function () { measure(); draw(); }, { passive: true });
        window.addEventListener('load', function () { measure(); draw(); }); // tag widths change once web fonts load
        document.addEventListener('visibilitychange', kick);
        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; kick(); }).observe(globe);
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
