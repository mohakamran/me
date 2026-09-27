/* ==========================================================================
   Theme — light / dark toggle.
   The site always opens in light mode (set in the inline <head> script).
   Visitors can switch to dark for the current visit with the sun/moon button.
   Fires 'themechange' on document (used by the Three.js scene).
   ========================================================================== */
(function () {
    'use strict';

    var root = document.documentElement;

    function setTheme(theme) {
        // Colour transitions are enabled only while switching, not on page load
        root.classList.add('theme-transition');
        root.setAttribute('data-theme', theme);
        window.setTimeout(function () { root.classList.remove('theme-transition'); }, 600);

        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', theme === 'dark' ? '#080a18' : '#f7f7fc');
        document.querySelectorAll('.theme-toggle').forEach(function (btn) {
            btn.setAttribute('aria-pressed', String(theme === 'dark'));
        });
        document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: theme } }));
    }

    window.Theme = {
        get current() { return root.getAttribute('data-theme'); },
        set: setTheme
    };

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.theme-toggle').forEach(function (btn) {
            btn.setAttribute('aria-pressed', 'false');
            btn.addEventListener('click', function () {
                setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
            });
        });
    });
})();
