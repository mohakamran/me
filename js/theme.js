/* ==========================================================================
   Theme — light / dark toggle + accent palettes.
   - The site always opens in light mode (set in the inline <head> script).
     Visitors can switch to dark for the current visit with the sun/moon button.
   - Accent palette (Violet / Ocean / Sunset / Emerald) is chosen from the
     palette popover (header) or the mobile menu, and is remembered.
   Fires 'themechange' on document (used by the Three.js scene).
   ========================================================================== */
(function () {
    'use strict';

    var root = document.documentElement;
    var ACCENTS = ['violet', 'ocean', 'sunset', 'emerald'];

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
        if (ACCENTS.indexOf(name) < 0) name = 'violet';
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

    document.addEventListener('DOMContentLoaded', function () {
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
