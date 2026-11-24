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
    var csCat = 'all';   // case-study filter: all | ai | web

    /* Case studies visible under the current filter */
    function shownCases() {
        return data.featured.filter(function (p) {
            return csCat === 'all' || (csCat === 'ai' ? p.category === 'ai' : p.category !== 'ai');
        });
    }
    function newBadge(p) {
        return p.isNew ? '<span class="new-badge">' + esc(t('work.new')) + '</span>' : '';
    }

    function esc(str) {
        return String(str).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }
    function t(k) { return window.I18N.t(k); }
    function pick(o) { return window.I18N.pick(o); }
    function lock(on) { if (window.ScrollLock) window.ScrollLock(on); else document.body.classList.toggle('no-scroll', on); }
    function pad(n) { return (n < 10 ? '0' : '') + n; }
    /* 640px copy for small screens and grid cards, full 1280px for large previews */
    function srcset(src) { var sm = src.replace(/\.webp$/, '-sm.webp'); return 'src="' + sm + '" srcset="' + sm + ' 640w, ' + src + ' 1280w"'; }

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
                live: p.links.live,
                isNew: p.isNew
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
        tabs.innerHTML = shownCases().map(function (p, i) {
            var on = p.id === activeCase;
            return '<button type="button" role="tab" class="cs-tab" id="cs-tab-' + p.id + '" data-cs="' + p.id + '" aria-controls="cs-stage" aria-selected="' + on + '" tabindex="' + (on ? 0 : -1) + '">' +
                '<span class="cs-num">' + pad(i + 1) + '</span>' +
                '<span class="cs-tab-text"><strong>' + esc(pick(p.title)) + '</strong><small>' + newBadge(p) + esc(pick(p.label)) + '</small></span>' +
                '<i class="fa-solid fa-arrow-right" aria-hidden="true"></i>' +
            '</button>';
        }).join('');
    }

    function renderStage(animate) {
        var stage = document.getElementById('cs-stage');
        var cases = shownCases();
        var i = cases.findIndex(function (x) { return x.id === activeCase; });
        var p = cases[i];
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
                    '<img ' + srcset(p.image) + ' sizes="(min-width: 1100px) 46vw, (min-width: 900px) 52vw, 92vw" alt="' + esc(pick(p.title)) + ' — screenshot" width="1280" height="800" decoding="async">' +
                    '<span class="chip chip-solid">' + esc(pick(p.label)) + '</span>' +
                    '<span class="cs-counter">' + pad(i + 1) + ' / ' + pad(cases.length) + '</span>' +
                    (p.isNew ? '<span class="new-badge new-badge-media">' + esc(t('work.new')) + '</span>' : '') +
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
                    '<span class="cs-dots" aria-hidden="true">' + cases.map(function (x) { return '<span class="' + (x.id === p.id ? 'on' : '') + '"></span>'; }).join('') + '</span>' +
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
        var cases = shownCases();
        var i = cases.findIndex(function (x) { return x.id === activeCase; });
        var n = cases.length;
        select(cases[(i + dir + n) % n].id);
    }

    function initShowcase() {
        var tabs = document.getElementById('cs-tabs');
        var stage = document.getElementById('cs-stage');
        if (!tabs || !stage) return;
        // Preload every case-study image so switching is instant (no blank flash)
        // (after the page has loaded, at the size this screen will actually use)
        window.addEventListener('load', function () {
            var go = function () {
                var small = window.innerWidth < 900;
                data.featured.forEach(function (p) { var im = new Image(); im.src = small ? p.image.replace(/\.webp$/, '-sm.webp') : p.image; });
            };
            var idle = function () { if ('requestIdleCallback' in window) requestIdleCallback(go, { timeout: 3000 }); else setTimeout(go, 1500); };
            // Only once the visitor is getting close to the case studies (saves data for people who never scroll there)
            if (!('IntersectionObserver' in window)) return idle();
            var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { io.disconnect(); idle(); } }, { rootMargin: '800px 0px' });
            io.observe(stage);
        });

        tabs.addEventListener('click', function (e) {
            var b = e.target.closest('.cs-tab');
            if (b) select(b.getAttribute('data-cs'));
        });
        tabs.addEventListener('keydown', function (e) {
            var keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
            var ids = shownCases().map(function (x) { return x.id; });
            var i = ids.indexOf(activeCase);
            if (keys[e.key]) { e.preventDefault(); select(ids[(i + keys[e.key] + ids.length) % ids.length], true); }
            else if (e.key === 'Home') { e.preventDefault(); select(ids[0], true); }
            else if (e.key === 'End') { e.preventDefault(); select(ids[ids.length - 1], true); }
        });
        // AI / full-stack filter chips above the showcase
        var filter = document.getElementById('cs-filter');
        if (filter) filter.addEventListener('click', function (e) {
            var b = e.target.closest('[data-cs-filter]');
            if (!b) return;
            csCat = b.getAttribute('data-cs-filter');
            renderCsFilter();
            var cases = shownCases();
            if (!cases.some(function (x) { return x.id === activeCase; })) activeCase = cases[0].id;
            renderTabs();
            renderStage(true);
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

    function renderCsFilter() {
        var el = document.getElementById('cs-filter');
        if (!el) return;
        var opts = [['all', 'work.filterAll', 'fa-layer-group'], ['ai', 'work.filterAi', 'fa-wand-magic-sparkles'], ['web', 'work.filterWeb', 'fa-code']];
        el.innerHTML = opts.map(function (o) {
            var n = data.featured.filter(function (p) { return o[0] === 'all' || (o[0] === 'ai' ? p.category === 'ai' : p.category !== 'ai'); }).length;
            return '<button type="button" class="cs-filter-btn" data-cs-filter="' + o[0] + '" aria-pressed="' + (csCat === o[0]) + '">' +
                '<i class="fa-solid ' + o[2] + '" aria-hidden="true"></i><span>' + esc(t(o[1])) + '</span><span class="count">' + n + '</span></button>';
        }).join('');
    }

    /* Shipping log ticker: list rendered twice so the CSS loop is seamless */
    function renderShipLog() {
        var track = document.getElementById('ship-track');
        if (!track || !data.shipLog) return;
        var lang = window.I18N.lang;
        var items = data.shipLog.map(function (x) {
            var d = new Date(x.date + '-01T00:00:00');
            var when = lang === 'ja' ? d.getFullYear() + '年' + (d.getMonth() + 1) + '月' : d.toLocaleString('en', { month: 'short', year: 'numeric' });
            return '<li><time datetime="' + x.date + '">' + esc(when) + '</time><strong>' + esc(x.name) + '</strong><span>' + esc(pick(x.what)) + '</span></li>';
        }).join('');
        track.innerHTML = items + items.replace(/<li>/g, '<li aria-hidden="true">');
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
    var expanded = false;

    function cardHTML(p, i, n) {
        var title = pick(p.title);
        var links = '';
        if (p.caseId) links += '<button type="button" class="ac-link" data-case="' + p.caseId + '" aria-label="' + esc(t('work.caseStudy') + ' — ' + title) + '"><i class="fa-solid fa-book-open" aria-hidden="true"></i></button>';
        if (p.github) links += '<a href="' + p.github + '" target="_blank" rel="noopener" class="ac-link" aria-label="' + esc(t('archive.viewCode') + ' — ' + title) + '"><i class="fa-brands fa-github" aria-hidden="true"></i></a>';
        if (p.live) links += '<a href="' + p.live + '" target="_blank" rel="noopener" class="ac-link" aria-label="' + esc(t('archive.viewLive') + ' — ' + title) + '"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>';
        if (p.linkedin) links += '<a href="' + p.linkedin + '" target="_blank" rel="noopener" class="ac-link" aria-label="' + esc(t('archive.viewPost') + ' — ' + title) + '"><i class="fa-brands fa-linkedin-in" aria-hidden="true"></i></a>';
        var isNew = p.isNew || (p.caseId && (data.featured.find(function (f) { return f.id === p.caseId; }) || {}).isNew);
        var badges = (isNew ? '<span class="new-badge new-badge-card">' + esc(t('work.new')) + '</span>' : '') + (p.caseId ? '<span class="chip chip-solid ac-badge"><i class="fa-solid fa-star" aria-hidden="true"></i>' + esc(t('archive.featured')) + '</span>' : '') +
                     (p.live ? '<span class="chip ac-live"><span class="pulse-dot" aria-hidden="true"></span>' + esc(t('archive.liveBadge')) + '</span>' : '');
        return '' +
            '<article class="archive-card glass" style="--i:' + Math.min(n, 8) + '" data-idx="' + i + '" data-category="' + p.category + '">' +
                '<div class="ac-media"><img ' + srcset(p.image) + ' sizes="(min-width: 700px) 360px, 92vw" alt="' + esc(title) + ' — project screenshot" width="960" height="600" loading="lazy" decoding="async">' + badges + '</div>' +
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
    }

    function renderArchive() {
        if (!document.getElementById('archive-grid')) return;
        list = allProjects();
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

    // Only the cards on screen are in the DOM (keeps the page light on phones); filters rebuild the grid
    function archiveLimit() { return window.innerWidth >= 1200 ? 8 : window.innerWidth >= 900 ? 6 : 4; }

    function applyFilters(animate) {
        var grid = document.getElementById('archive-grid');
        if (!grid) return;
        var matching = [];
        list.forEach(function (p, i) { if (matches(p)) matching.push(i); });
        var visible = expanded ? matching : matching.slice(0, archiveLimit());
        var before = grid.children.length;
        grid.innerHTML = visible.map(function (i, n) { return cardHTML(list[i], i, n); }).join('');
        if (animate && !reduceMotion) {
            // When expanding, only the newly added cards animate in
            Array.prototype.forEach.call(grid.children, function (card, n) {
                if (expanded && n < before && before < visible.length) return;
                card.style.animationDelay = Math.min(n % 8, 8) * 40 + 'ms';
                card.classList.add('fade-in');
            });
        }
        document.dispatchEvent(new CustomEvent('contentrendered', { detail: { scope: grid } }));
        // Live counts per category (respect the search + live-demo switch)
        document.querySelectorAll('.filter-btn').forEach(function (btn) {
            var f = btn.getAttribute('data-filter');
            var n = list.filter(function (p) { return matches(p, true) && (f === 'all' || p.category === f); }).length;
            var el = btn.querySelector('.count');
            if (el) el.textContent = n;
            btn.classList.toggle('is-empty', n === 0);
        });
        var matched = matching.length;
        var line = document.getElementById('result-line');
        if (line) line.textContent = t('archive.showing').replace('{n}', matched).replace('{total}', list.length);
        var moreWrap = document.getElementById('archive-more-wrap'), more = document.getElementById('archive-more');
        if (moreWrap && more) {
            moreWrap.hidden = matched <= archiveLimit();
            more.setAttribute('aria-expanded', String(expanded));
            more.querySelector('span').textContent = expanded ? t('archive.less') : t('archive.more').replace('{n}', matched);
        }
        var empty = document.getElementById('empty-state');
        if (empty) empty.hidden = matched !== 0;
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
        var more = document.getElementById('archive-more');
        if (more) more.addEventListener('click', function () {
            var grid = document.getElementById('archive-grid');
            expanded = !expanded;
            applyFilters(expanded);
            if (!expanded && grid) grid.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        });
        if (reset) reset.addEventListener('click', function () {
            state = { cat: 'all', q: '', live: false };
            if (search) { search.value = ''; clear.hidden = true; }
            if (live) live.checked = false;
            buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-filter') === 'all')); });
            applyFilters(true);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        renderShipLog();
        renderCsFilter();
        renderTabs();
        renderStage(false);
        initShowcase();
        renderArchive();
        initModal();
        initFilters();
    });

    document.addEventListener('langchange', function () {
        renderShipLog();
        renderCsFilter();
        renderTabs();
        renderStage(false);
        renderArchive();
        if (openId) {
            var p = data.featured.find(function (x) { return x.id === openId; });
            if (p) renderCase(p);
        }
    });
})();
