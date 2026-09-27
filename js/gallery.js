/* ==========================================================================
   Gallery — "Life in Japan" 3D coverflow slider + full-screen lightbox.
   - Infinite loop, autoplay (pauses on hover, focus, touch, when off-screen
     or when the tab is hidden; disabled for prefers-reduced-motion)
   - Drag / swipe, arrow buttons, keyboard ←/→, click a side photo to bring
     it to the front, click the front photo to open it full size
   - Slides use small WebP thumbnails; full-size images load only in the lightbox
   ========================================================================== */
(function () {
    'use strict';

    var photos = (window.SITE_DATA && window.SITE_DATA.gallery) || [];
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var AUTOPLAY_MS = 4200;

    var root, stage, captionEl, progressBar, slides = [];
    var active = 0, dragX = 0, autoplayTimer = null, progressStart = 0, progressRaf = null;
    var paused = false, inView = false;

    function pick(o) { return window.I18N.pick(o); }
    function escAttr(s) { return String(s).replace(/"/g, '&quot;'); }
    function lock(on) { if (window.ScrollLock) window.ScrollLock(on); else document.body.classList.toggle('no-scroll', on); }

    /* ---------- Slider ---------- */
    function render() {
        if (!stage) return;
        stage.innerHTML = photos.map(function (p, i) {
            var cap = pick(p.caption);
            return '' +
                '<button type="button" class="cf-slide" data-index="' + i + '" aria-label="' + escAttr(cap) + '" tabindex="-1">' +
                    '<img src="img/gallery/' + p.id + '-sm.webp" alt="' + escAttr(cap) + '" width="640" height="' + Math.round(640 * p.h / p.w) + '" loading="lazy" decoding="async" draggable="false">' +
                    '<span class="cf-glare" aria-hidden="true"></span>' +
                '</button>';
        }).join('');
        slides = Array.prototype.slice.call(stage.querySelectorAll('.cf-slide'));
        layout(0);
    }

    /* Shortest signed distance from the active slide, so the loop wraps both ways */
    function offsetOf(i) {
        var n = photos.length, d = i - active;
        if (d > n / 2) d -= n;
        if (d < -n / 2) d += n;
        return d;
    }

    function layout(drag) {
        var w = stage.clientWidth;
        var mobile = w < 640;
        var spacing = mobile ? w * 0.5 : Math.min(300, w * 0.2);
        var dragShift = drag / spacing; // fraction of a slide
        slides.forEach(function (el, i) {
            var o = offsetOf(i) + dragShift;
            var abs = Math.abs(o);
            var visible = abs < (mobile ? 2.2 : 3.4);
            var x = o * spacing;
            var z = -abs * (mobile ? 180 : 220);
            var ry = Math.max(-55, Math.min(55, -o * (mobile ? 38 : 32)));
            var scale = 1 - Math.min(abs, 3) * 0.06;
            el.style.transform = 'translate(-50%, -50%) translate3d(' + x.toFixed(1) + 'px,0,' + z.toFixed(1) + 'px) rotateY(' + ry.toFixed(1) + 'deg) scale(' + scale.toFixed(3) + ')';
            el.style.opacity = visible ? String(Math.max(0, 1 - abs * 0.22)) : '0';
            el.style.zIndex = String(100 - Math.round(abs * 10));
            el.style.pointerEvents = visible ? 'auto' : 'none';
            el.style.setProperty('--shade', Math.min(abs * 0.25, 0.6).toFixed(2));
            el.classList.toggle('is-active', Math.round(o) === 0);
            el.setAttribute('aria-hidden', Math.round(o) === 0 ? 'false' : 'true');
        });
        if (captionEl && photos[active]) {
            captionEl.textContent = pick(photos[active].caption) + '  ·  ' + (active + 1) + ' / ' + photos.length;
        }
    }

    function goTo(i) {
        active = (i + photos.length) % photos.length;
        layout(0);
        restartAutoplay();
    }

    /* ---------- Autoplay with progress bar ---------- */
    function stopAutoplay() {
        clearTimeout(autoplayTimer);
        cancelAnimationFrame(progressRaf);
        if (progressBar) progressBar.style.transform = 'scaleX(0)';
    }
    function restartAutoplay() {
        stopAutoplay();
        if (reduceMotion || paused || !inView || document.hidden) return;
        progressStart = performance.now();
        autoplayTimer = setTimeout(function () { goTo(active + 1); }, AUTOPLAY_MS);
        (function tick(now) {
            var p = Math.min(1, (now - progressStart) / AUTOPLAY_MS);
            if (progressBar) progressBar.style.transform = 'scaleX(' + p.toFixed(3) + ')';
            if (p < 1) progressRaf = requestAnimationFrame(tick);
        })(progressStart);
    }
    function setPaused(v) { paused = v; restartAutoplay(); }

    /* ---------- Drag / swipe ---------- */
    function initDrag() {
        var startX = 0, startY = 0, dragging = false, moved = false, pointerId = null;
        stage.addEventListener('pointerdown', function (e) {
            if (e.button !== 0) return;
            dragging = true; moved = false; startX = e.clientX; startY = e.clientY; pointerId = e.pointerId;
            stopAutoplay();
        });
        stage.addEventListener('pointermove', function (e) {
            if (!dragging || e.pointerId !== pointerId) return;
            var dx = e.clientX - startX, dy = e.clientY - startY;
            if (!moved && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
                moved = true;
                stage.setPointerCapture(pointerId);
                root.classList.add('dragging');
            }
            if (moved) { dragX = dx; layout(dragX); }
        });
        function end() {
            if (!dragging) return;
            dragging = false;
            root.classList.remove('dragging');
            if (moved) {
                var threshold = Math.min(80, stage.clientWidth * 0.12);
                if (dragX < -threshold) active = (active + 1) % photos.length;
                else if (dragX > threshold) active = (active - 1 + photos.length) % photos.length;
                dragX = 0;
                layout(0);
            }
            restartAutoplay();
        }
        stage.addEventListener('pointerup', end);
        stage.addEventListener('pointercancel', end);
        // Suppress the click that follows a drag
        stage.addEventListener('click', function (e) {
            if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; return; }
            var slide = e.target.closest('.cf-slide');
            if (!slide) return;
            var i = parseInt(slide.getAttribute('data-index'), 10);
            if (i === active) openLightbox(i, slide); else goTo(i);
        }, true);
    }

    function initSlider() {
        root = document.getElementById('coverflow');
        stage = document.getElementById('cf-stage');
        captionEl = document.getElementById('cf-caption');
        progressBar = document.getElementById('cf-progress-bar');
        if (!root || !stage || !photos.length) return;

        render();
        initDrag();

        root.querySelector('[data-cf="prev"]').addEventListener('click', function () { goTo(active - 1); });
        root.querySelector('[data-cf="next"]').addEventListener('click', function () { goTo(active + 1); });
        root.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(active - 1); }
            if (e.key === 'ArrowRight') { e.preventDefault(); goTo(active + 1); }
            if (e.key === 'Enter' && e.target === root) openLightbox(active, slides[active]);
        });

        root.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') setPaused(true); });
        root.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') setPaused(false); });
        root.addEventListener('focusin', function () { setPaused(true); });
        root.addEventListener('focusout', function () { setPaused(false); });
        document.addEventListener('visibilitychange', restartAutoplay);

        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (entries) {
                inView = entries[0].isIntersecting;
                restartAutoplay();
            }, { threshold: 0.3 }).observe(root);
        }

        var resizeRaf;
        window.addEventListener('resize', function () {
            cancelAnimationFrame(resizeRaf);
            resizeRaf = requestAnimationFrame(function () { layout(0); });
        }, { passive: true });
    }

    /* ---------- Lightbox ---------- */
    var lb, lbImg, lbCap, lbIndex = 0, lastTrigger;

    function showLb(i) {
        lbIndex = (i + photos.length) % photos.length;
        var p = photos[lbIndex];
        var cap = pick(p.caption);
        lb.classList.add('loading');
        lbImg.onload = function () { lb.classList.remove('loading'); };
        lbImg.src = 'img/gallery/' + p.id + '.webp';
        lbImg.width = p.w;
        lbImg.height = p.h;
        lbImg.alt = cap;
        lbCap.textContent = cap + '  ·  ' + (lbIndex + 1) + ' / ' + photos.length;
    }

    function openLightbox(i, trigger) {
        if (!lb) return;
        lastTrigger = trigger;
        stopAutoplay();
        showLb(i);
        if (typeof lb.showModal === 'function') lb.showModal(); else lb.setAttribute('open', '');
        lock(true);
    }

    function initLightbox() {
        lb = document.getElementById('lightbox');
        lbImg = document.getElementById('lb-img');
        lbCap = document.getElementById('lb-caption');
        if (!lb) return;

        lb.addEventListener('click', function (e) {
            var action = e.target.closest('[data-lb]');
            if (action) {
                var a = action.getAttribute('data-lb');
                if (a === 'close') lb.close();
                if (a === 'prev') showLb(lbIndex - 1);
                if (a === 'next') showLb(lbIndex + 1);
            } else if (e.target === lb) {
                lb.close();
            }
        });
        lb.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') showLb(lbIndex - 1);
            if (e.key === 'ArrowRight') showLb(lbIndex + 1);
        });
        lb.addEventListener('close', function () {
            lock(false);
            // Keep the slider in sync with the last photo viewed
            if (lbIndex !== active) goTo(lbIndex); else restartAutoplay();
            if (root) root.focus({ preventScroll: true });
        });

        var startX = null;
        lb.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
        lb.addEventListener('touchend', function (e) {
            if (startX === null) return;
            var dx = e.changedTouches[0].clientX - startX;
            if (Math.abs(dx) > 50) showLb(dx < 0 ? lbIndex + 1 : lbIndex - 1);
            startX = null;
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initSlider();
        initLightbox();
    });

    document.addEventListener('langchange', function () {
        if (!stage) return;
        render();
        if (lb && lb.open) showLb(lbIndex);
    });
})();
