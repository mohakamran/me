/* ==========================================================================
   Scroll-driven effects ("video scroll")
   - Hero: content tilts back in 3D and fades as you scroll away (desktop)
   - Sections: content blocks rise out of a 3D tilt as they enter the screen
     and settle flat, scrubbed directly by scroll position
   - Watermarks: huge outlined words behind each section slide sideways
   - Story: a pinned panel lights up its sentence word by word as you
     scroll, then rolls its counters
   - Marquee: speeds up, reverses and skews with scroll velocity
   - Back-to-top: bottom-left button with a scroll-progress ring
   One rAF-throttled loop drives everything; it only touches elements that
   are on screen. Everything is disabled for prefers-reduced-motion.
   ========================================================================== */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
    var ease = function (t) { return 1 - Math.pow(1 - t, 3); };

    var vh = window.innerHeight, vw = window.innerWidth;
    var tilts = [], watermarks = [], visible = new Set();
    var hero, heroInner, story, storyWords = [], storyCountersOn = false;
    var marqueeTrack, marqueeAnim, velocity = 0, lastY = window.scrollY;
    var toTop, ring, ringLen = 0;
    var ticking = false;

    /* ---------- Story text: split into words (Intl.Segmenter handles Japanese) ---------- */
    function renderStory() {
        var el = document.getElementById('story-text');
        if (!el) return;
        var raw = window.I18N.t('story.text');           // *word* marks highlighted phrases
        var lang = document.documentElement.lang;
        var parts = raw.split(/(\*[^*]+\*)/).filter(Boolean);
        var html = '';
        parts.forEach(function (part) {
            var hl = part.charAt(0) === '*';
            var text = hl ? part.slice(1, -1) : part;
            var words;
            if (window.Intl && Intl.Segmenter) {
                words = Array.from(new Intl.Segmenter(lang, { granularity: 'word' }).segment(text), function (s) { return s.segment; });
            } else {
                words = lang === 'ja' ? text.split('') : text.split(/(\s+)/);
            }
            words.forEach(function (w) {
                if (/^\s+$/.test(w)) { html += ' '; return; }
                html += '<span class="sw' + (hl ? ' sw-hl' : '') + '">' + w.replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }) + '</span>';
            });
        });
        el.innerHTML = html;
        el.setAttribute('aria-label', raw.replace(/\*/g, ''));
        storyWords = Array.prototype.slice.call(el.querySelectorAll('.sw'));
        if (reduceMotion) storyWords.forEach(function (w) { w.style.setProperty('--w', 1); });
    }

    /* ---------- Watermarks: big outlined word behind each section ---------- */
    function addWatermarks() {
        document.querySelectorAll('[data-watermark]').forEach(function (sec) {
            var wm = document.createElement('div');
            wm.className = 'section-watermark';
            wm.setAttribute('aria-hidden', 'true');
            wm.textContent = sec.getAttribute('data-watermark');
            sec.insertBefore(wm, sec.firstChild);
            watermarks.push({ el: wm, sec: sec, dir: watermarks.length % 2 ? -1 : 1 });
        });
    }

    /* ---------- Back-to-top button ---------- */
    function initToTop() {
        toTop = document.getElementById('to-top');
        if (!toTop) return;
        ring = toTop.querySelector('.to-top-ring circle:last-child');
        if (ring) { ringLen = 2 * Math.PI * ring.r.baseVal.value; ring.style.strokeDasharray = ringLen; }
        toTop.addEventListener('click', function () {
            var lenis = window.SmoothScroll && window.SmoothScroll.instance;
            toTop.classList.add('launch');
            setTimeout(function () { toTop.classList.remove('launch'); }, 900);
            if (lenis) lenis.scrollTo(0, { duration: 1.8, easing: function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; } });
            else window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
            // Keyboard users continue from the top of the page
            var brand = document.querySelector('.site-header .brand');
            if (brand) brand.focus({ preventScroll: true });
        });
    }

    /* ---------- Per-frame update ---------- */
    function update() {
        ticking = false;
        var y = window.scrollY;
        var dy = y - lastY; lastY = y;
        velocity += (dy - velocity) * 0.25;
        var max = document.documentElement.scrollHeight - vh;
        var desktop = vw >= 1024;

        // Hero: tilt back in 3D, sink and fade (desktop only — on phones the portrait sits below the text)
        if (hero && heroInner && !reduceMotion) {
            if (desktop && y < vh * 1.3) {
                var hp = clamp(y / (hero.offsetHeight * 0.9), 0, 1);
                heroInner.style.transform = 'perspective(1200px) translate3d(0,' + (hp * 120).toFixed(1) + 'px,' + (-hp * 260).toFixed(1) + 'px) rotateX(' + (hp * 22).toFixed(2) + 'deg)';
                heroInner.style.opacity = (1 - ease(hp) * 1.05).toFixed(3);
            } else if (!desktop && heroInner.style.transform) {
                heroInner.style.transform = ''; heroInner.style.opacity = '';
            }
        }

        // Section blocks: scrubbed 3D entrance (rotateX + rise + scale), gentle tilt-away on exit
        if (!reduceMotion) {
            var amp = desktop ? 1 : 0.5;
            visible.forEach(function (el) {
                var r = el.getBoundingClientRect();
                var enter = clamp((vh - r.top) / (vh * 0.75), 0, 1);
                var exit = clamp(r.bottom / (vh * 0.45), 0, 1);
                var e = ease(enter);
                var deg = (1 - e) * 16 * amp - (1 - exit) * 6 * amp;
                var ty = (1 - e) * 80 * amp;
                var sc = 0.9 + 0.1 * e;
                var key = deg.toFixed(2) + ty.toFixed(1) + sc.toFixed(3);
                if (el._fx !== key) {
                    el._fx = key;
                    el.style.transform = 'perspective(1400px) translate3d(0,' + ty.toFixed(1) + 'px,0) rotateX(' + deg.toFixed(2) + 'deg) scale(' + sc.toFixed(3) + ')';
                    el.style.opacity = (0.35 + 0.65 * e) * (0.4 + 0.6 * exit);
                }
            });

            // Watermarks slide horizontally with the section's scroll progress
            watermarks.forEach(function (w) {
                var r = w.sec.getBoundingClientRect();
                if (r.bottom < -200 || r.top > vh + 200) return;
                var p = clamp((vh - r.top) / (vh + r.height), 0, 1);
                w.el.style.transform = 'translate3d(' + ((0.5 - p) * 45 * w.dir).toFixed(2) + 'vw,0,0)';
            });
        }

        // Story: pinned panel — words light up one by one, then counters roll
        if (story && storyWords.length && !reduceMotion) {
            var sr = story.getBoundingClientRect();
            var span = sr.height - vh;
            var sp = span > 0 ? clamp(-sr.top / span, 0, 1) : 1;
            story.style.setProperty('--sp', sp.toFixed(4));
            var lit = sp * 1.25 * storyWords.length;       // finish lighting at ~80% of the scroll
            storyWords.forEach(function (w, i) {
                var v = clamp(lit - i, 0, 1);
                if (w._v !== v) { w._v = v; w.style.setProperty('--w', v.toFixed(3)); }
            });
            var on = sp > 0.72;
            if (on !== storyCountersOn) {
                storyCountersOn = on;
                story.classList.toggle('counters-on', on);
                if (on && window.Counters) story.querySelectorAll('.counter').forEach(window.Counters.roll);
            }
        }

        // Back-to-top: show after the hero, fill the ring with overall progress
        if (toTop) {
            toTop.classList.toggle('show', y > vh * 0.8);
            if (ring) ring.style.strokeDashoffset = (ringLen * (1 - (max > 0 ? y / max : 0))).toFixed(1);
        }

        // Marquee: velocity-driven speed, direction and skew
        if (marqueeTrack && !reduceMotion) {
            var v = clamp(velocity, -60, 60);
            if (marqueeAnim) marqueeAnim.playbackRate = (v < -0.5 ? -1 : 1) * (1 + Math.abs(v) / 6);
            marqueeTrack.style.setProperty('--skew', (-v * 0.35).toFixed(2) + 'deg');
        }

        // Keep animating while the velocity eases back to zero (dy is 0 on these frames)
        if (Math.abs(velocity) > 0.05) requestTick();
    }

    function requestTick() {
        if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }

    function init() {
        hero = document.getElementById('home');
        heroInner = hero && hero.querySelector('.hero-inner');
        story = document.getElementById('story');
        marqueeTrack = document.querySelector('.marquee-track');
        if (marqueeTrack && marqueeTrack.getAnimations) marqueeAnim = marqueeTrack.getAnimations()[0];

        renderStory();
        initToTop();
        if (!reduceMotion) addWatermarks();

        tilts = Array.prototype.slice.call(document.querySelectorAll('.fx-3d'));
        if (!reduceMotion && 'IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (e) {
                    if (e.isIntersecting) visible.add(e.target);
                    else {
                        visible.delete(e.target);
                        // park off-screen blocks in their "entered" state when far above
                        if (e.boundingClientRect.top < 0) { e.target.style.transform = ''; e.target.style.opacity = ''; e.target._fx = null; }
                    }
                });
                requestTick();
            }, { rootMargin: '10% 0px 10% 0px' });
            tilts.forEach(function (el) { io.observe(el); });
        }

        window.addEventListener('scroll', requestTick, { passive: true });
        window.addEventListener('resize', function () { vh = window.innerHeight; vw = window.innerWidth; requestTick(); }, { passive: true });
        requestTick();
    }

    document.addEventListener('DOMContentLoaded', init);
    document.addEventListener('langchange', function () { renderStory(); requestTick(); });
})();
