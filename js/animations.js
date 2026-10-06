/* ==========================================================================
   Animations & interactions (vanilla JS + Lenis for smooth scrolling)
   - Smooth inertia scrolling (Lenis) with offset-aware anchor links
   - Header state, active nav link, mobile drawer
   - Scroll progress, timeline progress line, hero parallax
   - Intersection Observer reveals (.reveal / .reveal-stagger → .is-visible)
   - Count-up counters, 3D tilt + glare, magnetic buttons, cursor glow
   Everything motion-related is skipped for prefers-reduced-motion users.
   ========================================================================== */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var lenis = null;

    /* ---------- Smooth scroll ---------- */
    function initSmoothScroll() {
        if (!reduceMotion && window.Lenis) {
            lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 });
            (function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            })(performance.now());
        }

        function headerOffset() {
            var header = document.getElementById('site-header');
            return -((header ? header.offsetHeight : 72) + 8);
        }

        // Offset-aware anchor links (works with and without Lenis)
        document.addEventListener('click', function (e) {
            var a = e.target.closest('a[href^="#"]');
            if (!a) return;
            var id = a.getAttribute('href');
            if (id.length < 2) return;
            var target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            if (id === '#home') {
                if (lenis) lenis.scrollTo(0, { duration: 1.4 }); else window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
            } else if (lenis) {
                lenis.scrollTo(target, { offset: headerOffset(), duration: 1.4 });
            } else {
                var top = target.getBoundingClientRect().top + window.scrollY + headerOffset();
                window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
            }
            if (history.replaceState) history.replaceState(null, '', id);
        });

        window.SmoothScroll = {
            resize: function () { if (lenis) lenis.resize(); },
            get instance() { return lenis; }
        };
    }

    /* Shared scroll lock for modals, lightbox and the mobile drawer */
    var lockCount = 0;
    window.ScrollLock = function (on) {
        lockCount = Math.max(0, lockCount + (on ? 1 : -1));
        var locked = lockCount > 0;
        document.body.classList.toggle('no-scroll', locked);
        if (lenis) { if (locked) lenis.stop(); else lenis.start(); }
    };

    /* ---------- Header + mobile drawer ---------- */
    function initNav() {
        var header = document.getElementById('site-header');
        var toggle = document.querySelector('.menu-toggle');
        var drawer = document.getElementById('mobile-nav');
        var backdrop = document.querySelector('.drawer-backdrop');
        var isOpen = false;

        function openDrawer() {
            isOpen = true;
            drawer.hidden = false;
            backdrop.hidden = false;
            requestAnimationFrame(function () {
                drawer.classList.add('open');
                backdrop.classList.add('open');
            });
            toggle.setAttribute('aria-expanded', 'true');
            toggle.setAttribute('aria-label', window.I18N.t('a11y.menuClose'));
            window.ScrollLock(true);
            var first = drawer.querySelector('a');
            if (first) first.focus({ preventScroll: true });
        }

        function closeDrawer(returnFocus) {
            if (!isOpen) return;
            isOpen = false;
            drawer.classList.remove('open');
            backdrop.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', window.I18N.t('a11y.menu'));
            window.ScrollLock(false);
            window.setTimeout(function () {
                if (!isOpen) { drawer.hidden = true; backdrop.hidden = true; }
            }, 350);
            if (returnFocus) toggle.focus();
        }

        if (toggle && drawer) {
            toggle.addEventListener('click', function () { isOpen ? closeDrawer(false) : openDrawer(); });
            backdrop.addEventListener('click', function () { closeDrawer(true); });
            // Capture phase: close (and unlock scrolling) before the anchor scroll runs
            drawer.addEventListener('click', function (e) { if (e.target.closest('a[href^="#"]')) closeDrawer(false); }, true);
            document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrawer(true); });
            window.addEventListener('resize', function () { if (window.innerWidth >= 1024) closeDrawer(false); });
            drawer.addEventListener('keydown', function (e) {
                if (e.key !== 'Tab') return;
                var items = drawer.querySelectorAll('a, button');
                var first = items[0], last = items[items.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            });
        }

        // Active link highlighting (the hero clears it; "All projects" counts as Projects)
        var links = document.querySelectorAll('.nav-links a, .drawer-links a');
        var watch = ['home', 'about', 'experience', 'publications', 'skills', 'work', 'projects', 'services', 'gallery', 'contact'];
        var alias = { projects: 'work' };
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    var id = '#' + (alias[entry.target.id] || entry.target.id);
                    links.forEach(function (a) {
                        var active = a.getAttribute('href') === id;
                        a.classList.toggle('active', active);
                        if (active) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
                    });
                });
            }, { rootMargin: '-45% 0px -50% 0px' });
            watch.forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
        }

        return header;
    }

    /* ---------- Scroll-linked updates (one rAF-throttled handler) ---------- */
    function initScroll(header) {
        var bar = document.querySelector('.scroll-progress span');
        var timeline = document.querySelector('.timeline');
        var heroInner = document.querySelector('.hero-inner');
        var ticking = false;

        function update() {
            ticking = false;
            var y = window.scrollY;
            var vh = window.innerHeight;
            var max = document.documentElement.scrollHeight - vh;

            if (header) header.classList.toggle('scrolled', y > 16);
            if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';

            if (timeline) {
                var r = timeline.getBoundingClientRect();
                var p = (vh * 0.6 - r.top) / r.height;
                timeline.style.setProperty('--progress', Math.max(0, Math.min(1, p)).toFixed(3));
            }

            // Hero content drifts up and fades as you scroll away — desktop only.
            // On phones/tablets the portrait sits below the text, so fading would hide it.
            if (heroInner && !reduceMotion) {
                if (window.innerWidth >= 1024 && y < vh * 1.2) {
                    heroInner.style.translate = '0 ' + (y * 0.28).toFixed(1) + 'px';
                    heroInner.style.opacity = Math.max(0, 1 - y / (vh * 0.85)).toFixed(3);
                } else if (window.innerWidth < 1024 && heroInner.style.opacity) {
                    heroInner.style.translate = '';
                    heroInner.style.opacity = '';
                }
            }
        }

        function onScroll() {
            if (!ticking) { ticking = true; requestAnimationFrame(update); }
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        update();
    }

    /* ---------- Reveal on scroll ---------- */
    var revealObserver;

    function indexStaggerChildren(container) {
        Array.prototype.forEach.call(container.children, function (child, i) {
            if (!child.style.getPropertyValue('--i')) child.style.setProperty('--i', Math.min(i, 8));
        });
    }

    function initReveal() {
        var targets = document.querySelectorAll('.reveal, .reveal-stagger, .tl-item');
        document.querySelectorAll('.reveal-stagger').forEach(indexStaggerChildren);

        if (reduceMotion || !('IntersectionObserver' in window)) {
            targets.forEach(function (el) { el.classList.add('is-visible'); });
            document.querySelectorAll('.counter').forEach(function (c) { c.textContent = c.getAttribute('data-count'); });
            return;
        }

        // threshold 0: some containers (e.g. the project grid on phones) are taller than the viewport
        revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                entry.target.querySelectorAll('.counter').forEach(countUp);
                revealObserver.unobserve(entry.target);
            });
        }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });

        targets.forEach(function (el) { revealObserver.observe(el); });
        document.querySelectorAll('.counter').forEach(function (c) { c.textContent = '0'; });
    }

    function countUp(el) {
        if (el.dataset.done) return;
        el.dataset.done = '1';
        var target = parseInt(el.getAttribute('data-count'), 10) || 0;
        var duration = 1600;
        var start = null;
        function frame(ts) {
            if (start === null) start = ts;
            var p = Math.min(1, (ts - start) / duration);
            var eased = 1 - Math.pow(1 - p, 4);
            el.textContent = Math.round(target * eased).toLocaleString(document.documentElement.lang);
            if (p < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }

    /* ---------- 3D tilt + glare (cards & portraits) ---------- */
    function bindTilt(scope) {
        if (reduceMotion || !finePointer) return;
        (scope || document).querySelectorAll('.tilt:not([data-tilt-bound])').forEach(function (el) {
            el.setAttribute('data-tilt-bound', '');
            var max = parseFloat(el.getAttribute('data-tilt-max')) || 6;
            var raf = null;
            el.addEventListener('pointermove', function (e) {
                var r = el.getBoundingClientRect();
                var x = (e.clientX - r.left) / r.width;
                var y = (e.clientY - r.top) / r.height;
                if (raf) cancelAnimationFrame(raf);
                raf = requestAnimationFrame(function () {
                    el.style.setProperty('--rx', ((0.5 - y) * max).toFixed(2) + 'deg');
                    el.style.setProperty('--ry', ((x - 0.5) * max).toFixed(2) + 'deg');
                    el.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
                    el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
                });
                el.classList.add('tilting');
            });
            el.addEventListener('pointerleave', function () {
                if (raf) cancelAnimationFrame(raf);
                el.classList.remove('tilting');
                el.style.setProperty('--rx', '0deg');
                el.style.setProperty('--ry', '0deg');
            });
        });
    }

    /* ---------- Magnetic buttons ---------- */
    function bindMagnetic() {
        if (reduceMotion || !finePointer) return;
        document.querySelectorAll('.magnetic').forEach(function (el) {
            el.addEventListener('pointermove', function (e) {
                var r = el.getBoundingClientRect();
                var dx = e.clientX - (r.left + r.width / 2);
                var dy = e.clientY - (r.top + r.height / 2);
                el.style.transform = 'translate(' + (dx * 0.2).toFixed(1) + 'px,' + (dy * 0.3).toFixed(1) + 'px)';
            });
            el.addEventListener('pointerleave', function () { el.style.transform = ''; });
        });
    }

    /* ---------- Cursor glow ---------- */
    function initCursorGlow() {
        var glow = document.querySelector('.cursor-glow');
        if (!glow || reduceMotion || !finePointer) return;
        var tx = 0, ty = 0, x = 0, y = 0, running = false;
        function loop() {
            x += (tx - x) * 0.14;
            y += (ty - y) * 0.14;
            glow.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
            if (Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3) requestAnimationFrame(loop); else running = false;
        }
        window.addEventListener('pointermove', function (e) {
            tx = e.clientX; ty = e.clientY;
            glow.classList.add('active');
            if (!running) { running = true; requestAnimationFrame(loop); }
        }, { passive: true });
        document.addEventListener('pointerleave', function () { glow.classList.remove('active'); });
    }

    /* ---------- Custom cursor (dot + trailing ring with context labels) ----------
       Mouse/trackpad only. Falls back to the native cursor on touch devices,
       for reduced motion, over text fields, and while a dialog is open
       (dialogs render in the browser's top layer, above the custom cursor). */
    function initCustomCursor() {
        var cursor = document.querySelector('.cursor');
        if (!cursor || reduceMotion || !finePointer) return;
        var root = document.documentElement;
        var ring = cursor.querySelector('.cursor-ring');
        var dot = cursor.querySelector('.cursor-dot');
        var label = cursor.querySelector('.cursor-label');
        var mx = -100, my = -100, rx = -100, ry = -100, running = false;

        root.classList.add('has-custom-cursor');

        function loop() {
            rx += (mx - rx) * 0.2;
            ry += (my - ry) * 0.2;
            dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
            ring.style.transform = 'translate3d(' + rx.toFixed(1) + 'px,' + ry.toFixed(1) + 'px,0)';
            if (Math.abs(mx - rx) > 0.1 || Math.abs(my - ry) > 0.1) requestAnimationFrame(loop); else running = false;
        }

        function setState(state, text) {
            cursor.setAttribute('data-state', state || '');
            label.textContent = text || '';
        }

        window.addEventListener('pointermove', function (e) {
            if (e.pointerType !== 'mouse') return;
            mx = e.clientX; my = e.clientY;
            cursor.classList.add('visible');
            root.classList.toggle('cursor-native', !!document.querySelector('dialog[open]'));
            if (!running) { running = true; requestAnimationFrame(loop); }
        }, { passive: true });

        document.addEventListener('pointerover', function (e) {
            var t = e.target;
            if (!t.closest) return;
            if (t.closest('input, textarea, select, [contenteditable]')) return setState('text');
            if (t.closest('.cf-slide.is-active')) return setState('label', window.I18N.t('cursor.view'));
            if (t.closest('.cf-stage')) return setState('label', window.I18N.t('cursor.drag'));
            if (t.closest('.skill-globe')) return setState('label', window.I18N.t('cursor.spin'));
            if (t.closest('a, button, label, [role="button"], .filter-btn')) return setState('link');
            setState('');
        });

        document.addEventListener('pointerdown', function () { cursor.classList.add('pressed'); });
        document.addEventListener('pointerup', function () { cursor.classList.remove('pressed'); });
        document.documentElement.addEventListener('pointerleave', function () { cursor.classList.remove('visible'); });
        window.addEventListener('blur', function () { cursor.classList.remove('visible'); });
    }

    /* ---------- Service cards prefill the contact subject ---------- */
    function initServiceLinks() {
        document.querySelectorAll('[data-service]').forEach(function (link) {
            link.addEventListener('click', function () {
                var subject = document.getElementById('subject');
                if (!subject) return;
                if (!subject.value || subject.dataset.prefilled === '1') {
                    subject.value = window.I18N.t(link.getAttribute('data-service'));
                    subject.dataset.prefilled = '1';
                    subject.dispatchEvent(new Event('input', { bubbles: true }));
                }
            });
        });
        var subject = document.getElementById('subject');
        if (subject) subject.addEventListener('keydown', function () { subject.dataset.prefilled = '0'; });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initSmoothScroll();
        var header = initNav();
        initScroll(header);
        initReveal();
        bindTilt();
        bindMagnetic();
        initCursorGlow();
        initCustomCursor();
        initServiceLinks();
        var year = document.getElementById('year');
        if (year) year.textContent = new Date().getFullYear();
        requestAnimationFrame(function () { document.documentElement.classList.add('loaded'); });
    });

    // Recalculate page height after images/fonts load (keeps smooth scroll accurate)
    window.addEventListener('load', function () { if (lenis) lenis.resize(); });

    // Newly rendered content (projects) gets tilt + stagger indices
    document.addEventListener('contentrendered', function (e) {
        var scope = e.detail && e.detail.scope;
        if (!scope) return;
        indexStaggerChildren(scope);
        bindTilt(scope);
        if (lenis) lenis.resize();
    });
})();
