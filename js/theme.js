/* ==========================================================================
   Theme — light / dark toggle + accent palettes.
   - The site always opens in light mode (set in the inline <head> script).
     Visitors can switch to dark for the current visit with the sun/moon button.
   - Accent palette: Emerald by default; Violet / Ocean / Sunset can be
     chosen from the floating colour picker (bottom-right), the header
     palette popover or the mobile menu. The choice is remembered.
   - First-time visitors get a one-time hint next to the colour picker.
   Fires 'themechange' on document (used by the Three.js scene).
   ========================================================================== */
(function () {
    'use strict';

    var root = document.documentElement;
    var ACCENTS = ['emerald', 'violet', 'ocean', 'sunset'];

    function withTransition(fn) {
        // Colour transitions are enabled only while switching, not on page load
        root.classList.add('theme-transition');
        fn();
        window.setTimeout(function () { root.classList.remove('theme-transition'); }, 600);
    }

    function setTheme(theme) {
        withTransition(function () { root.setAttribute('data-theme', theme); });
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', theme === 'dark' ? '#080a18' : '#f7f7fc');
        document.querySelectorAll('.theme-toggle').forEach(function (btn) {
            btn.setAttribute('aria-pressed', String(theme === 'dark'));
        });
        document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: theme } }));
    }

    function currentAccent() { return root.getAttribute('data-accent') || 'violet'; }

    function syncSwatches() {
        var a = currentAccent();
        document.querySelectorAll('[data-accent-btn]').forEach(function (b) {
            b.setAttribute('aria-pressed', String(b.getAttribute('data-accent-btn') === a));
        });
    }

    function setAccent(name) {
        if (ACCENTS.indexOf(name) < 0) name = 'emerald';
        withTransition(function () {
            if (name === 'violet') root.removeAttribute('data-accent');
            else root.setAttribute('data-accent', name);
        });
        try { localStorage.setItem('accent', name); } catch (e) { /* storage blocked */ }
        syncSwatches();
        document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: root.getAttribute('data-theme'), accent: name } }));
    }

    window.Theme = {
        get current() { return root.getAttribute('data-theme'); },
        get accent() { return currentAccent(); },
        set: setTheme,
        setAccent: setAccent
    };

    /* Palette popover in the header */
    function initPopover() {
        var btn = document.querySelector('.palette-btn');
        var pop = document.getElementById('theme-pop');
        if (!btn || !pop) return;
        function open(on) {
            pop.hidden = !on;
            btn.setAttribute('aria-expanded', String(on));
            if (on) requestAnimationFrame(function () { pop.classList.add('open'); });
            else pop.classList.remove('open');
        }
        btn.addEventListener('click', function (e) { e.stopPropagation(); open(pop.hidden); });
        pop.addEventListener('click', function (e) { e.stopPropagation(); });
        document.addEventListener('click', function () { if (!pop.hidden) open(false); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !pop.hidden) { open(false); btn.focus(); } });
    }

    /* Floating colour picker (bottom-right) + one-time hint */
    function initDock() {
        var dock = document.getElementById('theme-dock');
        if (!dock) return;
        var btn = dock.querySelector('.dock-btn');
        var panel = document.getElementById('dock-panel');
        var hint = document.getElementById('dock-hint');
        var hintTimer, hideTimer;

        function seen() {
            try { localStorage.setItem('themeHintSeen', '1'); } catch (e) {}
            clearTimeout(hintTimer); clearTimeout(hideTimer);
            if (hint && !hint.hidden) { hint.classList.remove('show'); setTimeout(function () { hint.hidden = true; }, 300); }
            dock.classList.remove('nudge');
        }
        function open(on) {
            panel.hidden = !on;
            btn.setAttribute('aria-expanded', String(on));
            dock.classList.toggle('open', on);
            if (on) { seen(); requestAnimationFrame(function () { panel.classList.add('show'); }); }
            else panel.classList.remove('show');
        }
        btn.addEventListener('click', function (e) { e.stopPropagation(); open(panel.hidden); });
        panel.addEventListener('click', function (e) { e.stopPropagation(); });
        document.addEventListener('click', function () { if (!panel.hidden) open(false); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) { open(false); btn.focus(); } });
        dock.querySelectorAll('[data-accent-btn]').forEach(function (b) { b.addEventListener('click', seen); });

        // First visit: point the colour picker out once
        var already = false;
        try { already = localStorage.getItem('themeHintSeen') === '1'; } catch (e) {}
        if (hint && !already) {
            // Timed from when the page content is ready (not full load, which is slow on phones)
            hintTimer = setTimeout(function () {
                if (!panel.hidden) return;
                hint.hidden = false;
                dock.classList.add('nudge');
                requestAnimationFrame(function () { hint.classList.add('show'); });
                hideTimer = setTimeout(function () { hint.classList.remove('show'); dock.classList.remove('nudge'); setTimeout(function () { hint.hidden = true; }, 300); }, 14000);
            }, 4000);
            hint.querySelector('.dock-hint-close').addEventListener('click', seen);
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        initDock();
        document.querySelectorAll('.theme-toggle').forEach(function (btn) {
            btn.setAttribute('aria-pressed', 'false');
            btn.addEventListener('click', function () {
                setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
            });
        });
        document.querySelectorAll('[data-accent-btn]').forEach(function (b) {
            b.addEventListener('click', function () { setAccent(b.getAttribute('data-accent-btn')); });
        });
        syncSwatches();
        initPopover();
    });
})();
