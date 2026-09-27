/* ==========================================================================
   Projects — featured case-study cards, case-study modal, and the
   "All projects" grid (featured + archive) with filter counts.
   Content comes from js/data.js; everything re-renders on language change.
   ========================================================================== */
(function () {
    'use strict';

    var data = window.SITE_DATA || { featured: [], archive: [] };
    var activeFilter = 'all';

    function esc(str) {
        return String(str).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }
    function t(k) { return window.I18N.t(k); }
    function pick(o) { return window.I18N.pick(o); }
    function lock(on) { if (window.ScrollLock) window.ScrollLock(on); else document.body.classList.toggle('no-scroll', on); }

    /* Featured projects first, then the archive — one list for the "All projects" grid */
    function allProjects() {
        var featured = data.featured.map(function (p) {
            return {
                caseId: p.id,
                image: p.image,
                category: p.category,
                title: p.title,
                desc: p.summary,
                tags: p.stack.slice(0, 2),
                github: p.links.github,
                live: p.links.live
            };
        });
        return featured.concat(data.archive);
    }

    /* ---------- Featured cards ---------- */
    function renderFeatured() {
        var grid = document.getElementById('featured-grid');
        if (!grid) return;
        grid.innerHTML = data.featured.map(function (p, i) {
            var metric = p.metric
                ? '<div class="fp-metric"><strong>' + esc(p.metric.value) + '</strong><span>' + esc(pick(p.metric.label)) + '</span></div>'
                : '';
            return '' +
                '<article class="fp-card glass tilt' + (p.wide ? ' fp-wide' : '') + '" data-tilt-max="6" style="--i:' + i + '">' +
                    '<div class="fp-media">' +
                        '<img src="' + p.image + '" alt="' + esc(pick(p.title)) + '" width="960" height="600" loading="lazy" decoding="async">' +
                        '<span class="chip chip-solid">' + esc(pick(p.label)) + '</span>' +
                    '</div>' +
                    '<div class="fp-body">' +
                        '<h3>' + esc(pick(p.title)) + '</h3>' +
                        '<p class="fp-summary">' + esc(pick(p.summary)) + '</p>' +
                        metric +
                        '<ul class="tag-list">' + p.stack.slice(0, 4).map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>' +
                        '<div class="fp-actions">' +
                            '<button type="button" class="btn btn-primary btn-sm" data-case="' + p.id + '">' +
                                '<span>' + esc(t('work.caseStudy')) + '</span><i class="fa-solid fa-arrow-right" aria-hidden="true"></i>' +
                            '</button>' +
                            linkButtons(p.links) +
                        '</div>' +
                    '</div>' +
                    '<span class="card-shine" aria-hidden="true"></span>' +
                '</article>';
        }).join('');
        document.dispatchEvent(new CustomEvent('contentrendered', { detail: { scope: grid } }));
    }

    function linkButtons(links) {
        var out = '';
        if (links.github) out += '<a class="btn btn-ghost btn-sm" href="' + links.github + '" target="_blank" rel="noopener"><i class="fa-brands fa-github" aria-hidden="true"></i><span>' + esc(t('work.github')) + '</span></a>';
        if (links.live) out += '<a class="btn btn-ghost btn-sm" href="' + links.live + '" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i><span>' + esc(t('work.live')) + '</span></a>';
        return out;
    }

    /* ---------- Case-study modal (native <dialog>) ---------- */
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
                    step('1', t('work.problem'), pick(p.problem)) +
                    step('2', t('work.solution'), pick(p.solution)) +
                    '<section class="case-step"><span class="case-num">3</span><div><h3>' + esc(t('work.stack')) + '</h3><ul class="tag-list">' +
                        p.stack.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></div></section>' +
                    '<section class="case-step case-result"><span class="case-num">4</span><div><h3>' + esc(t('work.result')) + '</h3><p>' + esc(pick(p.result)) + '</p></div></section>' +
                '</div>' +
                note +
                '<div class="fp-actions">' + linkButtons(p.links) + '</div>' +
            '</div>';
    }

    function step(n, title, body) {
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

    /* ---------- All projects grid ---------- */
    function renderArchive() {
        var grid = document.getElementById('archive-grid');
        if (!grid) return;
        grid.innerHTML = allProjects().map(function (p, i) {
            var title = pick(p.title);
            var links = '';
            if (p.caseId) links += '<button type="button" class="ac-link" data-case="' + p.caseId + '" aria-label="' + esc(t('work.caseStudy') + ' — ' + title) + '"><i class="fa-solid fa-book-open" aria-hidden="true"></i></button>';
            if (p.github) links += '<a href="' + p.github + '" target="_blank" rel="noopener" class="ac-link" aria-label="' + esc(t('archive.viewCode') + ' — ' + title) + '"><i class="fa-brands fa-github" aria-hidden="true"></i></a>';
            if (p.live) links += '<a href="' + p.live + '" target="_blank" rel="noopener" class="ac-link" aria-label="' + esc(t('archive.viewLive') + ' — ' + title) + '"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>';
            if (p.linkedin) links += '<a href="' + p.linkedin + '" target="_blank" rel="noopener" class="ac-link" aria-label="' + esc(t('archive.viewPost') + ' — ' + title) + '"><i class="fa-brands fa-linkedin-in" aria-hidden="true"></i></a>';
            var hidden = activeFilter !== 'all' && activeFilter !== p.category;
            var badge = p.caseId ? '<span class="chip chip-solid ac-badge"><i class="fa-solid fa-star" aria-hidden="true"></i>' + esc(t('archive.featured')) + '</span>' : '';
            return '' +
                '<article class="archive-card glass tilt" data-tilt-max="8" style="--i:' + Math.min(i, 8) + '" data-category="' + p.category + '"' + (hidden ? ' hidden' : '') + '>' +
                    '<div class="ac-media"><img src="' + p.image + '" alt="' + esc(title) + '" width="960" height="600" loading="lazy" decoding="async">' + badge + '</div>' +
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
    }

    function renderCounts() {
        var list = allProjects();
        document.querySelectorAll('.filter-btn').forEach(function (btn) {
            var f = btn.getAttribute('data-filter');
            var n = f === 'all' ? list.length : list.filter(function (p) { return p.category === f; }).length;
            var el = btn.querySelector('.count');
            if (el) el.textContent = n;
        });
    }

    function initFilters() {
        var buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                activeFilter = btn.getAttribute('data-filter');
                buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
                var shown = 0;
                document.querySelectorAll('#archive-grid .archive-card').forEach(function (card) {
                    var show = activeFilter === 'all' || card.getAttribute('data-category') === activeFilter;
                    card.hidden = !show;
                    if (show) {
                        card.style.animationDelay = Math.min(shown, 8) * 50 + 'ms';
                        card.classList.remove('pop');
                        void card.offsetWidth; // restart the animation
                        card.classList.add('pop');
                        shown++;
                    }
                });
                if (window.SmoothScroll) window.SmoothScroll.resize();
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        renderFeatured();
        renderArchive();
        renderCounts();
        initModal();
        initFilters();
    });

    document.addEventListener('langchange', function () {
        renderFeatured();
        renderArchive();
        if (openId) {
            var p = data.featured.find(function (x) { return x.id === openId; });
            if (p) renderCase(p);
        }
    });
})();
