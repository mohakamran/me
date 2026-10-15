/* ==========================================================================
   Rolling odometer counters
   Any <span class="counter" data-count="70"> becomes a row of digit strips
   that roll into place when scrolled into view, and roll again on hover
   (hovering the surrounding stat card also works). Screen readers get the
   plain number via aria-label. Reduced motion: the final number is shown.
   ========================================================================== */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function build(el) {
        if (el.dataset.odo) return;
        el.dataset.odo = '1';
        var value = String(el.getAttribute('data-count'));
        el.setAttribute('aria-label', value);
        el.classList.add('odo');
        el.innerHTML = value.split('').map(function (ch, i) {
            if (!/[0-9]/.test(ch)) return '<span class="odo-sep" aria-hidden="true">' + ch + '</span>';
            // Two full 0–9 cycles so every digit visibly spins before landing
            var strip = '';
            for (var n = 0; n < 20; n++) strip += '<span>' + (n % 10) + '</span>';
            return '<span class="odo-digit" aria-hidden="true" style="--d:' + ch + ';--k:' + i + '"><span class="odo-strip">' + strip + '</span></span>';
        }).join('');
    }

    function roll(el) {
        if (reduceMotion) { el.classList.add('odo-on'); return; }
        // Reset instantly to 0, then roll to the target on the next frame
        el.classList.add('odo-reset');
        el.classList.remove('odo-on');
        void el.offsetWidth;
        el.classList.remove('odo-reset');
        requestAnimationFrame(function () { el.classList.add('odo-on'); });
    }

    function init() {
        var counters = document.querySelectorAll('.counter[data-count]');
        counters.forEach(build);

        if (reduceMotion || !('IntersectionObserver' in window)) {
            counters.forEach(function (c) { c.classList.add('odo-on'); });
        } else {
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (e) {
                    if (!e.isIntersecting) return;
                    // Counters inside the pinned story panel are triggered by scroll-fx.js instead
                    if (e.target.closest('[data-counters-manual]')) return;
                    setTimeout(function () { roll(e.target); }, 250);
                    io.unobserve(e.target);
                });
            }, { threshold: 0.6 });
            counters.forEach(function (c) { io.observe(c); });
        }

        // Interactivity: hovering a counter (or its card) rolls it again
        document.addEventListener('pointerover', function (e) {
            var host = e.target.closest && e.target.closest('.stat, .count-card, .pub-stats li');
            if (!host || host.contains(e.relatedTarget)) return;
            host.querySelectorAll('.counter.odo-on').forEach(roll);
        });
    }

    window.Counters = { roll: roll };
    document.addEventListener('DOMContentLoaded', init);
})();
