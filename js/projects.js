/* ==========================================================================
   Projects
   - Case study showcase: tabs (list on desktop, swipeable row on phones)
     + a large preview with highlights, stack and links. Keyboard arrows,
     prev/next buttons and swipe on the image switch projects.
   - Case-study modal (native <dialog>) with the full Problem → Result story
   - "All projects" grid (case studies + archive) with search, category
     chips (live counts), a "live demo only" switch and an empty state
   Content comes from js/data.js; everything re-renders on language change.
   ========================================================================== */
(function () {
    'use strict';

    var data = window.SITE_DATA || { featured: [], archive: [] };
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var state = { cat: 'all', q: '', live: false };
    var activeCase = data.featured.length ? data.featured[0].id : null;

    function esc(str) {
        return String(str).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }
    function t(k) { return window.I18N.t(k); }
    function pick(o) { return window.I18N.pick(o); }
    function lock(on) { if (window.ScrollLock) window.ScrollLock(on); else document.body.classList.toggle('no-scroll', on); }
    function pad(n) { return (n < 10 ? '0' : '') + n; }

    /* Case studies first, then the archive — one list for the "All projects" grid */
    function allProjects() {
        var featured = data.featured.map(function (p) {
            return {
                caseId: p.id,
                image: p.image,
                category: p.category,
                title: p.title,
                desc: p.summary,
                tags: p.stack.slice(0, 2),
                search: p.stack.join(' '),
                github: p.links.github,
                live: p.links.live
            };
        });
        return featured.concat(data.archive);
    }

    function linkButtons(links) {
        var out = '';
        if (links.github) out += '<a class="btn btn-ghost btn-sm" href="' + links.github + '" target="_blank" rel="noopener"><i class="fa-brands fa-github" aria-hidden="true"></i><span>' + esc(t('work.github')) + '</span></a>';
        if (links.live) out += '<a class="btn btn-ghost btn-sm" href="' + links.live + '" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i><span>' + esc(t('work.live')) + '</span></a>';
        return out;
    }

    /* ======================= Case study showcase ======================= */
    function renderTabs() {
        var tabs = document.getElementById('cs-tabs');
        if (!tabs) return;
        tabs.innerHTML = data.featured.map(function (p, i) {
            var on = p.id === activeCase;
            return '<button type="button" role="tab" class="cs-tab" id="cs-tab-' + p.id + '" data-cs="' + p.id + '" aria-controls="cs-stage" aria-selected="' + on + '" tabindex="' + (on ? 0 : -1) + '">' +
                '<span class="cs-num">' + pad(i + 1) + '</span>' +
                '<span class="cs-tab-text"><strong>' + esc(pick(p.title)) + '</strong><small>' + esc(pick(p.label)) + '</small></span>' +
                '<i class="fa-solid fa-arrow-right" aria-hidden="true"></i>' +
            '</button>';
        }).join('');
    }

    function renderStage(animate) {
        var stage = document.getElementById('cs-stage');
        var i = data.featured.findIndex(function (x) { return x.id === activeCase; });
        var p = data.featured[i];
        if (!stage || !p) return;
        stage.setAttribute('aria-labelledby', 'cs-tab-' + p.id);
        var metric = p.metric
            ? '<div class="cs-metric"><strong>' + esc(p.metric.value) + '</strong><span>' + esc(pick(p.metric.label)) + '</span></div>' : '';
        var highlights = (p.highlights || []).map(function (h) {
            return '<li><i class="fa-solid fa-check" aria-hidden="true"></i><span>' + esc(pick(h)) + '</span></li>';
        }).join('');
        stage.innerHTML = '' +
            '<article class="cs-card' + (animate && !reduceMotion ? ' enter' : '') + '">' +
                '<div class="cs-media tilt" data-tilt-max="5">' +
                    '<img src="' + p.image + '" alt="' + esc(pick(p.title)) + '" width="1280" height="800" decoding="async">' +
                    '<span class="chip chip-solid">' + esc(pick(p.label)) + '</span>' +
                    '<span class="cs-counter">' + pad(i + 1) + ' / ' + pad(data.featured.length) + '</span>' +
                '</div>' +
                '<div class="cs-info">' +
                    '<p class="cs-role"><i class="fa-solid fa-user-gear" aria-hidden="true"></i>' + esc(pick(p.role)) + '</p>' +
                    '<h3>' + esc(pick(p.title)) + '</h3>' +
                    '<p class="cs-summary">' + esc(pick(p.summary)) + '</p>' +
                    metric +
                    (highlights ? '<ul class="cs-highlights">' + highlights + '</ul>' : '') +
                    '<ul class="tag-list">' + p.stack.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>' +
                    '<div class="cs-actions">' +
                        '<button type="button" class="btn btn-primary btn-sm" data-case="' + p.id + '"><span>' + esc(t('work.caseStudy')) + '</span><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>' +
                        linkButtons(p.links) +
                    '</div>' +
                '</div>' +
                '<div class="cs-nav">' +
                    '<button type="button" class="icon-btn" data-cs-step="-1" aria-label="' + esc(t('work.prev')) + '"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i></button>' +
                    '<span class="cs-dots" aria-hidden="true">' + data.featured.map(function (x) { return '<span class="' + (x.id === p.id ? 'on' : '') + '"></span>'; }).join('') + '</span>' +
                    '<button type="button" class="icon-btn" data-cs-step="1" aria-label="' + esc(t('work.next')) + '"><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>' +
                '</div>' +
            '</article>';
        document.dispatchEvent(new CustomEvent('contentrendered', { detail: { scope: stage } }));
    }

    function select(id, focusTab) {
        if (!id || id === activeCase) return;
        activeCase = id;
        var tabs = document.getElementById('cs-tabs');
        tabs.querySelectorAll('.cs-tab').forEach(function (b) {
            var on = b.getAttribute('data-cs') === id;
            b.setAttribute('aria-selected', String(on));
            b.tabIndex = on ? 0 : -1;
            if (on) {
                if (focusTab) b.focus({ preventScroll: true });
                // Keep the active chip visible in the horizontal row on phones (without scrolling the page)
                if (tabs.scrollWidth > tabs.clientWidth + 4) {
                    tabs.scrollTo({ left: b.offsetLeft - (tabs.clientWidth - b.offsetWidth) / 2, behavior: reduceMotion ? 'auto' : 'smooth' });
                }
            }
        });
        renderStage(true);
    }

    function step(dir) {
        var i = data.featured.findIndex(function (x) { return x.id === activeCase; });
        var n = data.featured.length;
        select(data.featured[(i + dir + n) % n].id);
    }

    function initShowcase() {
        var tabs = document.getElementById('cs-tabs');
        var stage = document.getElementById('cs-stage');
        if (!tabs || !stage) return;
        // Preload every case-study image so switching is instant (no blank flash)
        data.featured.forEach(function (p) { var im = new Image(); im.src = p.image; });

        tabs.addEventListener('click', function (e) {
            var b = e.target.closest('.cs-tab');
            if (b) select(b.getAttribute('data-cs'));
        });
        tabs.addEventListener('keydown', function (e) {
            var keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
            var ids = data.featured.map(function (x) { return x.id; });
            var i = ids.indexOf(activeCase);
            if (keys[e.key]) { e.preventDefault(); select(ids[(i + keys[e.key] + ids.length) % ids.length], true); }
            else if (e.key === 'Home') { e.preventDefault(); select(ids[0], true); }
            else if (e.key === 'End') { e.preventDefault(); select(ids[ids.length - 1], true); }
        });
        stage.addEventListener('click', function (e) {
            var b = e.target.closest('[data-cs-step]');
            if (b) step(parseInt(b.getAttribute('data-cs-step'), 10));
        });
        // Swipe the preview image left/right on touch screens
        var sx = null;
        stage.addEventListener('touchstart', function (e) { if (e.target.closest('.cs-media')) sx = e.touches[0].clientX; }, { passive: true });
        stage.addEventListener('touchend', function (e) {
            if (sx === null) return;
            var dx = e.changedTouches[0].clientX - sx;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            sx = null;
        });
    }

    /* ======================= Case-study modal ======================= */
    var modal, modalContent, lastTrigger, openId = null;

    function renderCase(p) {
        var note = p.note ? '<p class="case-note"><i class="fa-solid fa-lock" aria-hidden="true"></i>' + esc(pick(p.note)) + '</p>' : '';
        var colon = window.I18N.lang === 'ja' ? '：' : ':';
        modalContent.innerHTML = '' +
            '<button type="button" class="icon-btn modal-close" data-close aria-label="' + esc(t('work.close')) + '"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>' +
            '<div class="case-hero"><img src="' + p.image + '" alt="" width="960" height="600"></div>' +
            '<div class="case-body">' +
                '<span class="chip chip-accent">' + esc(pick(p.label)) + '</span>' +
                '<h2 id="case-title">' + esc(pick(p.title)) + '</h2>' +
                '<p class="case-role"><strong>' + esc(t('work.role')) + colon + '</strong> ' + esc(pick(p.role)) + '</p>' +
                '<div class="case-steps">' +
                    caseStep('1', t('work.problem'), pick(p.problem)) +
                    caseStep('2', t('work.solution'), pick(p.solution)) +
                    '<section class="case-step"><span class="case-num">3</span><div><h3>' + esc(t('work.stack')) + '</h3><ul class="tag-list">' +
                        p.stack.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></div></section>' +
                    '<section class="case-step case-result"><span class="case-num">4</span><div><h3>' + esc(t('work.result')) + '</h3><p>' + esc(pick(p.result)) + '</p></div></section>' +
                '</div>' +
                (p.image2 ? '<figure class="case-shot"><img src="' + p.image2 + '" alt="' + esc(pick(p.title)) + '" width="1280" height="800" loading="lazy" decoding="async"></figure>' : '') +
                note +
                '<div class="fp-actions">' + linkButtons(p.links) + '</div>' +
            '</div>';
    }

    function caseStep(n, title, body) {
        return '<section class="case-step"><span class="case-num">' + n + '</span><div><h3>' + esc(title) + '</h3><p>' + esc(body) + '</p></div></section>';
    }

    function openCase(id, trigger) {
        var p = data.featured.find(function (x) { return x.id === id; });
        if (!p || !modal) return;
        lastTrigger = trigger;
        openId = id;
        renderCase(p);
        if (typeof modal.showModal === 'function') modal.showModal(); else modal.setAttribute('open', '');
        modalContent.scrollTop = 0;
        lock(true);
        var closeBtn = modal.querySelector('[data-close]');
        if (closeBtn) closeBtn.focus();
    }

    function closeCase() {
        if (!modal || !modal.open) return;
        modal.classList.add('closing');
        window.setTimeout(function () {
            modal.classList.remove('closing');
            if (typeof modal.close === 'function') modal.close(); else modal.removeAttribute('open');
        }, 200);
    }

    function initModal() {
        modal = document.getElementById('case-modal');
        modalContent = document.getElementById('case-content');
        if (!modal) return;
        document.addEventListener('click', function (e) {
            var trigger = e.target.closest('[data-case]');
            if (trigger) openCase(trigger.getAttribute('data-case'), trigger);
        });
        modal.addEventListener('click', function (e) {
            if (e.target === modal || e.target.closest('[data-close]')) closeCase();
        });
        modal.addEventListener('cancel', function (e) { e.preventDefault(); closeCase(); });
        modal.addEventListener('close', function () {
            openId = null;
            lock(false);
            if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus({ preventScroll: true });
        });
    }

    /* ======================= All projects grid ======================= */
    var list = [];

    function renderArchive() {
        var grid = document.getElementById('archive-grid');
        if (!grid) return;
        list = allProjects();
        grid.innerHTML = list.map(function (p, i) {
            var title = pick(p.title);
            var links = '';
            if (p.caseId) links += '<button type="button" class="ac-link" data-case="' + p.caseId + '" aria-label="' + esc(t('work.caseStudy') + ' — ' + title) + '"><i class="fa-solid fa-book-open" aria-hidden="true"></i></button>';
            if (p.github) links += '<a href="' + p.github + '" target="_blank" rel="noopener" class="ac-link" aria-label="' + esc(t('archive.viewCode') + ' — ' + title) + '"><i class="fa-brands fa-github" aria-hidden="true"></i></a>';
            if (p.live) links += '<a href="' + p.live + '" target="_blank" rel="noopener" class="ac-link" aria-label="' + esc(t('archive.viewLive') + ' — ' + title) + '"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>';
            if (p.linkedin) links += '<a href="' + p.linkedin + '" target="_blank" rel="noopener" class="ac-link" aria-label="' + esc(t('archive.viewPost') + ' — ' + title) + '"><i class="fa-brands fa-linkedin-in" aria-hidden="true"></i></a>';
            var badges = (p.caseId ? '<span class="chip chip-solid ac-badge"><i class="fa-solid fa-star" aria-hidden="true"></i>' + esc(t('archive.featured')) + '</span>' : '') +
                         (p.live ? '<span class="chip ac-live"><span class="pulse-dot" aria-hidden="true"></span>' + esc(t('archive.liveBadge')) + '</span>' : '');
            return '' +
                '<article class="archive-card glass" style="--i:' + Math.min(i, 8) + '" data-idx="' + i + '" data-category="' + p.category + '">' +
                    '<div class="ac-media"><img src="' + p.image + '" alt="' + esc(title) + '" width="960" height="600" loading="lazy" decoding="async">' + badges + '</div>' +
                    '<div class="ac-body">' +
                        '<h3>' + esc(title) + '</h3>' +
                        '<p>' + esc(pick(p.desc)) + '</p>' +
                        '<div class="ac-foot">' +
                            '<ul class="tag-list tag-list-sm">' + p.tags.slice(0, 2).map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>' +
                            '<div class="ac-links">' + links + '</div>' +
                        '</div>' +
                    '</div>' +
                    '<span class="card-shine" aria-hidden="true"></span>' +
                '</article>';
        }).join('');
        document.dispatchEvent(new CustomEvent('contentrendered', { detail: { scope: grid } }));
        applyFilters(false);
    }

    function matches(p, ignoreCat) {
        if (!ignoreCat && state.cat !== 'all' && p.category !== state.cat) return false;
        if (state.live && !p.live) return false;
        if (state.q) {
            var hay = [p.title.en, p.title.ja, p.desc.en, p.desc.ja, p.tags.join(' '), p.search || ''].join(' ').toLowerCase();
            if (hay.indexOf(state.q) === -1) return false;
        }
        return true;
    }

    function applyFilters(animate) {
        var grid = document.getElementById('archive-grid');
        if (!grid) return;
        var shown = 0;
        grid.querySelectorAll('.archive-card').forEach(function (card) {
            var p = list[parseInt(card.getAttribute('data-idx'), 10)];
            var show = matches(p);
            card.hidden = !show;
            if (show) {
                if (animate && !reduceMotion) {
                    card.style.animationDelay = Math.min(shown, 8) * 40 + 'ms';
                    card.classList.remove('fade-in'); void card.offsetWidth; card.classList.add('fade-in');
                }
                shown++;
            }
        });
        // Live counts per category (respect the search + live-demo switch)
        document.querySelectorAll('.filter-btn').forEach(function (btn) {
            var f = btn.getAttribute('data-filter');
            var n = list.filter(function (p) { return matches(p, true) && (f === 'all' || p.category === f); }).length;
            var el = btn.querySelector('.count');
            if (el) el.textContent = n;
            btn.classList.toggle('is-empty', n === 0);
        });
        var line = document.getElementById('result-line');
        if (line) line.textContent = t('archive.showing').replace('{n}', shown).replace('{total}', list.length);
        var empty = document.getElementById('empty-state');
        if (empty) empty.hidden = shown !== 0;
        if (window.SmoothScroll) window.SmoothScroll.resize();
    }

    function initFilters() {
        var buttons = document.querySelectorAll('.filter-btn');
        var search = document.getElementById('project-search');
        var clear = document.querySelector('.search-clear');
        var live = document.getElementById('live-only');
        var reset = document.getElementById('reset-filters');
        var timer;

        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                state.cat = btn.getAttribute('data-filter');
                buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
                applyFilters(true);
            });
        });
        if (search) {
            search.addEventListener('input', function () {
                clear.hidden = !search.value;
                clearTimeout(timer);
                timer = setTimeout(function () { state.q = search.value.trim().toLowerCase(); applyFilters(true); }, 140);
            });
            clear.addEventListener('click', function () { search.value = ''; clear.hidden = true; state.q = ''; applyFilters(true); search.focus(); });
        }
        if (live) live.addEventListener('change', function () { state.live = live.checked; applyFilters(true); });
        if (reset) reset.addEventListener('click', function () {
            state = { cat: 'all', q: '', live: false };
            if (search) { search.value = ''; clear.hidden = true; }
            if (live) live.checked = false;
            buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-filter') === 'all')); });
            applyFilters(true);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        renderTabs();
        renderStage(false);
        initShowcase();
        renderArchive();
        initModal();
        initFilters();
    });

    document.addEventListener('langchange', function () {
        renderTabs();
        renderStage(false);
        renderArchive();
        if (openId) {
            var p = data.featured.find(function (x) { return x.id === openId; });
            if (p) renderCase(p);
        }
    });
})();
