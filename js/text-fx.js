/* ==========================================================================
   Interactive typography
   - Section titles are split into letters: they flip up one by one when the
     section appears, ripple in a wave on hover, and single letters pop
     under the cursor
   - Hero title letters react to the mouse (they lift and grow as the cursor
     gets close) on desktop
   - Section labels ("eyebrows") decode from random glyphs when they appear
     and again on hover (katakana glyphs in Japanese)
   Re-applied after every language switch. Disabled for reduced motion.
   ========================================================================== */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var CJK = /[　-ヿ一-鿿＀-￯]/;

    /* ---------- Split an element's text into letter spans (keeps inner markup like .grad-text) ---------- */
    function split(el) {
        if (!el || el.dataset.splitFor === el.innerHTML) return;
        var label = el.textContent.replace(/\s+/g, ' ').trim();
        var index = 0;
        (function walk(node) {
            Array.prototype.slice.call(node.childNodes).forEach(function (child) {
                if (child.nodeType === 3) {
                    var frag = document.createDocumentFragment();
                    // Latin text: keep each word together (no mid-word breaks); CJK: one unit per character
                    child.textContent.split(/(\s+)/).forEach(function (word) {
                        if (!word) return;
                        if (/^\s+$/.test(word)) { frag.appendChild(document.createTextNode(' ')); return; }
                        var units = CJK.test(word) ? word.split('').map(function (c) { return [c]; }) : [word.split('')];
                        units.forEach(function (chars) {
                            var w = document.createElement('span');
                            w.className = 'wd';
                            chars.forEach(function (c) {
                                var s = document.createElement('span');
                                s.className = 'ch';
                                s.textContent = c;
                                s.style.setProperty('--ci', index++);
                                w.appendChild(s);
                            });
                            frag.appendChild(w);
                        });
                    });
                    node.replaceChild(frag, child);
                } else if (child.nodeType === 1) {
                    walk(child);
                }
            });
        })(el);
        el.classList.add('split');
        el.setAttribute('aria-label', label);
        Array.prototype.forEach.call(el.children, function (c) { c.setAttribute('aria-hidden', 'true'); });
        el.dataset.splitFor = el.innerHTML;
        paintGradients(el);
    }

    /* Letters inside .grad-text get one continuous gradient (each letter shows its own slice) */
    function paintGradients(el) {
        el.querySelectorAll('.grad-text').forEach(function (g) {
            var gr = g.getBoundingClientRect();
            g.querySelectorAll('.ch').forEach(function (c) {
                var cr = c.getBoundingClientRect();
                c.style.backgroundSize = Math.max(gr.width, 1).toFixed(0) + 'px 100%';
                c.style.backgroundPosition = (-(cr.left - gr.left)).toFixed(0) + 'px 0';
            });
        });
    }

    function splitAll() {
        document.querySelectorAll('.section-head h2, .hero-title').forEach(split);
    }

    /* ---------- Hero title: letters react to the cursor ---------- */
    function initHeroMagnet() {
        if (reduceMotion || !finePointer) return;
        var hero = document.getElementById('home');
        if (!hero) return;
        var mx = -9999, my = -9999, raf = null, active = false;
        function frame() {
            raf = null;
            var title = hero.querySelector('.hero-title');
            if (!title) return;
            title.querySelectorAll('.ch').forEach(function (c) {
                var r = c.getBoundingClientRect();
                var dx = mx - (r.left + r.width / 2), dy = my - (r.top + r.height / 2);
                var d = Math.sqrt(dx * dx + dy * dy);
                var f = active ? Math.max(0, 1 - d / 180) : 0;
                c.style.transform = f ? 'translate3d(0,' + (-f * 14).toFixed(1) + 'px,0) scale(' + (1 + f * 0.18).toFixed(3) + ') rotate(' + (dx > 0 ? -f * 6 : f * 6).toFixed(1) + 'deg)' : '';
            });
        }
        hero.addEventListener('pointermove', function (e) {
            mx = e.clientX; my = e.clientY; active = true;
            if (!raf) raf = requestAnimationFrame(frame);
        });
        hero.addEventListener('pointerleave', function () {
            active = false;
            if (!raf) raf = requestAnimationFrame(frame);
        });
    }

    /* ---------- Eyebrow labels decode from random glyphs ---------- */
    var GLYPHS = { en: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+<>/', ja: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン' };

    function scramble(el) {
        if (reduceMotion || el._scrambling) return;
        var final = el.textContent;
        var set = GLYPHS[document.documentElement.lang === 'ja' ? 'ja' : 'en'];
        var start = performance.now(), dur = 650 + final.length * 25;
        el._scrambling = true;
        el.style.minWidth = el.offsetWidth + 'px';
        (function tick(now) {
            var p = Math.min(1, (now - start) / dur);
            var reveal = Math.floor(p * final.length);
            var out = '';
            for (var i = 0; i < final.length; i++) {
                var ch = final[i];
                out += (i < reveal || ch === ' ') ? ch : set[Math.floor(Math.random() * set.length)];
            }
            el.textContent = out;
            if (p < 1) requestAnimationFrame(tick);
            else { el.textContent = final; el._scrambling = false; el.style.minWidth = ''; }
        })(start);
    }

    function initScramble() {
        if (reduceMotion || !('IntersectionObserver' in window)) return;
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (!e.isIntersecting) return;
                scramble(e.target);
                io.unobserve(e.target);
            });
        }, { threshold: 1 });
        document.querySelectorAll('.eyebrow').forEach(function (el) {
            io.observe(el);
            el.addEventListener('pointerenter', function () { scramble(el); });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        if (reduceMotion) return;
        splitAll();
        initHeroMagnet();
        initScramble();
    });
    // i18n replaces the heading markup on language change → split again
    document.addEventListener('langchange', function () { if (!reduceMotion) splitAll(); });
    window.addEventListener('load', function () { document.querySelectorAll('.split').forEach(paintGradients); });
    window.addEventListener('resize', function () { document.querySelectorAll('.split').forEach(paintGradients); }, { passive: true });
})();
