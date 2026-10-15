/* ==========================================================================
   Section interactivity
   - Header: highlight pill slides to the hovered / active nav link
   - Hero: typing line of what I build, cursor spotlight, floating cards
     drift with the mouse, flip-card portrait with a details side
   - Experience: career-bar segments highlight + jump to their timeline card
   - Skills: hovering a skill lights it up on the 3D globe; clicking a globe
     tag flashes its skill tile
   - Projects: clicking a screenshot opens the case study / live site
   - Publications & contact: copy-to-clipboard (citations, email) + toast
   - Contact & footer: live Japan time; message character counter
   ========================================================================== */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    function t(k) { return window.I18N.t(k); }
    function scrollToEl(el) {
        var lenis = window.SmoothScroll && window.SmoothScroll.instance;
        var header = document.getElementById('site-header');
        var offset = -((header ? header.offsetHeight : 72) + 24);
        if (lenis) lenis.scrollTo(el, { offset: offset, duration: 1.2 });
        else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: reduceMotion ? 'auto' : 'smooth' });
    }

    /* ---------- Toast ---------- */
    var toastEl, toastTimer;
    function toast(msg) {
        toastEl = toastEl || document.getElementById('toast');
        if (!toastEl) return;
        toastEl.textContent = msg;
        toastEl.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2200);
    }
    window.Toast = toast;

    /* ---------- Copy to clipboard: any [data-copy] button ---------- */
    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
        return new Promise(function (resolve, reject) {
            var ta = document.createElement('textarea');
            ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
            document.body.appendChild(ta); ta.select();
            try { document.execCommand('copy') ? resolve() : reject(); } catch (e) { reject(e); }
            document.body.removeChild(ta);
        });
    }
    function initCopy() {
        document.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-copy]');
            if (!btn) return;
            copyText(btn.getAttribute('data-copy')).then(function () {
                toast(t(btn.getAttribute('data-copied') || 'toast.copied'));
                btn.classList.add('copied');
                setTimeout(function () { btn.classList.remove('copied'); }, 1600);
            }, function () { toast(t('toast.copyFail')); });
        });
    }

    /* ---------- Header: sliding highlight under the hovered / active link ---------- */
    function initNavIndicator() {
        var nav = document.querySelector('.nav-links');
        var pill = nav && nav.querySelector('.nav-indicator');
        if (!pill) return;
        var hovering = null;
        function moveTo(a) {
            var show = !!(a && a.offsetWidth);
            if (show) {
                pill.style.width = a.offsetWidth + 'px';
                pill.style.transform = 'translateX(' + a.offsetLeft + 'px)';
            }
            // Only touch the class when it changes (avoids re-triggering the observer below)
            if (pill.classList.contains('on') !== show) pill.classList.toggle('on', show);
        }
        function settle() { moveTo(hovering || nav.querySelector('a.active')); }
        nav.addEventListener('pointerover', function (e) { var a = e.target.closest('a'); if (a) { hovering = a; settle(); } });
        nav.addEventListener('pointerleave', function () { hovering = null; settle(); });
        nav.addEventListener('focusin', function (e) { hovering = e.target.closest('a'); settle(); });
        nav.addEventListener('focusout', function () { hovering = null; settle(); });
        // Follow the active link as sections change (set by animations.js)
        new MutationObserver(function (records) {
            var linkChanged = records.some(function (r) { return r.target !== pill; });
            if (linkChanged && !hovering) settle();
        }).observe(nav, { subtree: true, attributes: true, attributeFilter: ['class'] });
        window.addEventListener('resize', settle, { passive: true });
        document.addEventListener('langchange', function () { requestAnimationFrame(settle); });
    }

    /* ---------- Hero: typing line ---------- */
    function initTyped() {
        var host = document.getElementById('hero-typed');
        var out = host && host.querySelector('.ht-word');
        if (!out) return;
        var words = [], wi = 0, ci = 0, deleting = false, timer = null;
        function load() {
            words = t('hero.typed').split('|');
            host.setAttribute('aria-label', t('hero.typedLead') + ' ' + words.join(', '));
            wi = 0; ci = 0; deleting = false;
            clearTimeout(timer);
            if (reduceMotion) { out.textContent = words[0]; return; }
            tick();
        }
        function tick() {
            var w = words[wi];
            ci += deleting ? -1 : 1;
            out.textContent = w.slice(0, ci);
            var delay = deleting ? 35 : 75;
            if (!deleting && ci === w.length) { deleting = true; delay = 1700; }
            else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 350; }
            timer = setTimeout(tick, delay);
        }
        load();
        document.addEventListener('langchange', load);
    }

    /* ---------- Hero: spotlight + floating cards follow the cursor ---------- */
    function initHeroPointer() {
        var hero = document.getElementById('home');
        if (!hero || reduceMotion || !finePointer) return;
        var raf = null, ev = null;
        hero.addEventListener('pointermove', function (e) {
            ev = e;
            if (raf) return;
            raf = requestAnimationFrame(function () {
                raf = null;
                var r = hero.getBoundingClientRect();
                hero.style.setProperty('--sx', (ev.clientX - r.left).toFixed(0) + 'px');
                hero.style.setProperty('--sy', (ev.clientY - r.top).toFixed(0) + 'px');
                hero.style.setProperty('--px', ((ev.clientX - r.left) / r.width * 2 - 1).toFixed(3));
                hero.style.setProperty('--py', ((ev.clientY - r.top) / r.height * 2 - 1).toFixed(3));
                hero.classList.add('spot-on');
            });
        });
        hero.addEventListener('pointerleave', function () {
            hero.classList.remove('spot-on');
            hero.style.setProperty('--px', 0); hero.style.setProperty('--py', 0);
        });
    }

    /* ---------- Hero: flip-card portrait ---------- */
    function initFlip() {
        var portrait = document.getElementById('hero-portrait');
        var btn = portrait && portrait.querySelector('.portrait-flip-btn');
        var back = document.getElementById('portrait-back');
        if (!btn || !back) return;
        var cta = back.querySelector('a');
        function setFlip(on) {
            portrait.classList.toggle('flipped', on);
            // Floating stat cards step aside so the back of the card is readable
            if (portrait.parentElement) portrait.parentElement.classList.toggle('is-flipped', on);
            btn.setAttribute('aria-pressed', String(on));
            back.setAttribute('aria-hidden', String(!on));
            if (cta) cta.tabIndex = on ? 0 : -1;
        }
        btn.addEventListener('click', function (e) { e.stopPropagation(); setFlip(!portrait.classList.contains('flipped')); });
        portrait.querySelector('.portrait-flip').addEventListener('click', function (e) {
            if (e.target.closest('a')) return;
            setFlip(!portrait.classList.contains('flipped'));
        });
    }

    /* ---------- Experience: career bar ↔ timeline cards ---------- */
    function initCareerLinks() {
        var items = document.querySelectorAll('.timeline .tl-item');
        document.querySelectorAll('.career-bar .seg[data-tl]').forEach(function (seg) {
            var item = items[parseInt(seg.getAttribute('data-tl'), 10)];
            if (!item) return;
            seg.addEventListener('pointerenter', function () { item.classList.add('linked'); seg.classList.add('hot'); });
            seg.addEventListener('pointerleave', function () { item.classList.remove('linked'); seg.classList.remove('hot'); });
            seg.addEventListener('click', function () {
                scrollToEl(item);
                item.classList.add('flash');
                setTimeout(function () { item.classList.remove('flash'); }, 1400);
            });
        });
    }

    /* ---------- Skills: tiles ↔ 3D globe tags ---------- */
    function initSkillLinks() {
        var globe = document.getElementById('skill-globe');
        if (!globe) return;
        function nameOf(li) { return li.lastChild.textContent.trim(); }
        function tagFor(name) {
            return Array.prototype.find.call(globe.querySelectorAll('.globe-tag'), function (g) { return g.textContent === name; });
        }
        document.querySelectorAll('.skill-tiles li').forEach(function (li) {
            li.addEventListener('pointerenter', function () { var g = tagFor(nameOf(li)); if (g) g.classList.add('hot'); });
            li.addEventListener('pointerleave', function () { var g = tagFor(nameOf(li)); if (g) g.classList.remove('hot'); });
        });
        // A tap/click on a globe tag (not a drag) flashes the matching skill tile
        var downX = 0, downY = 0;
        globe.addEventListener('pointerdown', function (e) { downX = e.clientX; downY = e.clientY; });
        globe.addEventListener('pointerup', function (e) {
            if (Math.abs(e.clientX - downX) + Math.abs(e.clientY - downY) > 6) return;
            var el = document.elementFromPoint(e.clientX, e.clientY);
            var tag = el && el.closest('.globe-tag');
            if (!tag) return;
            var li = Array.prototype.find.call(document.querySelectorAll('.skill-tiles li'), function (x) { return nameOf(x) === tag.textContent; });
            if (!li) return;
            li.classList.remove('flash'); void li.offsetWidth; li.classList.add('flash');
            tag.classList.add('hot');
            setTimeout(function () { tag.classList.remove('hot'); }, 1200);
        });
    }

    /* ---------- Projects: clicking a screenshot opens the project ---------- */
    function initProjectMedia() {
        document.addEventListener('click', function (e) {
            var media = e.target.closest('.fp-media, .ac-media');
            if (!media) return;
            var card = media.closest('.fp-card, .archive-card');
            var target = card && (card.querySelector('[data-case]') || card.querySelector('a.ac-link[href^="http"]'));
            if (target) target.click();
        });
    }

    /* ---------- Contact: message character counter ---------- */
    function initCounter() {
        var ta = document.getElementById('message');
        var out = document.querySelector('#message-count .cc-num');
        if (!ta || !out) return;
        var max = parseInt(ta.getAttribute('maxlength'), 10) || 2000;
        function update() {
            out.textContent = ta.value.length;
            out.parentElement.classList.toggle('near', ta.value.length > max * 0.9);
        }
        ta.addEventListener('input', update);
        ta.form && ta.form.addEventListener('reset', function () { setTimeout(update, 0); });
        update();
    }

    /* ---------- Live Japan time (contact + footer) ---------- */
    function initClock() {
        var clocks = document.querySelectorAll('.jst-clock');
        if (!clocks.length) return;
        function update() {
            var fmt = new Intl.DateTimeFormat(document.documentElement.lang === 'ja' ? 'ja-JP' : 'en-GB', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', hour12: false });
            var now = fmt.format(new Date());
            clocks.forEach(function (c) { c.textContent = now; });
        }
        update();
        setInterval(update, 15000);
        document.addEventListener('langchange', update);
    }

    document.addEventListener('DOMContentLoaded', function () {
        initCopy();
        initNavIndicator();
        initTyped();
        initHeroPointer();
        initFlip();
        initCareerLinks();
        initSkillLinks();
        initProjectMedia();
        initCounter();
        initClock();
    });
})();
