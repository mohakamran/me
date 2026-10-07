/* ==========================================================================
   Publications — renders the paper list from SITE_DATA.publications.
   In Japanese mode the Japanese title is the heading and the official
   English title is shown below it as 原題 (original title). Dates and
   author lists are formatted for the current language.
   Re-renders on language change.
   ========================================================================== */
(function () {
    'use strict';

    var pubs = (window.SITE_DATA && window.SITE_DATA.publications) || [];
    var STATUS_ICON = { accepted: 'fa-circle-check', published: 'fa-book-bookmark' };

    function esc(str) {
        return String(str).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }
    function t(k) { return window.I18N.t(k); }
    function pick(o) { return window.I18N.pick(o); }

    function formatDate(iso, isoEnd) {
        var ja = window.I18N.lang === 'ja';
        var fmt = new Intl.DateTimeFormat(ja ? 'ja-JP' : 'en-GB', { day: 'numeric', month: ja ? 'long' : 'short', year: 'numeric' });
        var a = new Date(iso + 'T00:00:00');
        if (!isoEnd) return fmt.format(a);
        var b = new Date(isoEnd + 'T00:00:00');
        // Same month: "25–26 Nov 2026" / "2026年11月25〜26日"
        if (a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()) {
            return ja
                ? a.getFullYear() + '年' + (a.getMonth() + 1) + '月' + a.getDate() + '〜' + b.getDate() + '日'
                : a.getDate() + '–' + fmt.format(b);
        }
        return fmt.format(a) + (ja ? '〜' : ' – ') + fmt.format(b);
    }

    function authors(list, year) {
        // First author (Muhammad Kamran) is highlighted
        var names = list.map(function (a, i) { return i === 0 ? '<strong>' + esc(a) + '</strong>' : esc(a); });
        if (window.I18N.lang === 'ja') {
            return names.join('、') + '（' + year + '年）';
        }
        var joined = names.length > 1 ? names.slice(0, -1).join(', ') + ', &amp; ' + names[names.length - 1] : names[0];
        return joined + ' (' + year + ')';
    }

    function render() {
        var list = document.getElementById('pub-list');
        if (!list) return;
        list.innerHTML = pubs.map(function (p, i) {
            var ja = window.I18N.lang === 'ja' && p.titleJa;
            var dateLabel = t(p.status === 'accepted' ? 'pubs.toPresent' : 'pubs.presentedOn');
            var action = p.link
                ? '<a class="btn btn-primary btn-sm" href="' + p.link + '" target="_blank" rel="noopener">' +
                      '<i class="fa-solid fa-file-lines" aria-hidden="true"></i><span>' + esc(t('pubs.read')) + '</span></a>' +
                  (p.doi ? '<a class="pub-doi" href="https://doi.org/' + p.doi + '" target="_blank" rel="noopener">DOI: ' + esc(p.doi) + '</a>' : '')
                : '<span class="pub-soon"><i class="fa-regular fa-clock" aria-hidden="true"></i>' + esc(t(p.status === 'accepted' ? 'pubs.soonUpcoming' : 'pubs.soon')) + '</span>';
            return '' +
                '<li class="pub-card glass tilt" data-tilt-max="4" data-status="' + p.status + '">' +
                    '<span class="pub-num" aria-hidden="true">' + (i + 1) + '</span>' +
                    '<article class="pub-body">' +
                        '<div class="pub-meta">' +
                            '<span class="pub-status"><i class="fa-solid ' + STATUS_ICON[p.status] + '" aria-hidden="true"></i>' + esc(t('pubs.status.' + p.status)) + '</span>' +
                            '<span class="chip chip-accent">' + esc(t('pubs.firstAuthor')) + '</span>' +
                            '<span class="chip">' + esc(pick(p.topic)) + '</span>' +
                        '</div>' +
                        (ja
                            ? '<h3 lang="ja">' + esc(p.titleJa) + '</h3>' +
                              '<p class="pub-title-orig" lang="en"><span>' + esc(t('pubs.originalTitle')) + '</span>' + esc(p.title) + '</p>'
                            : '<h3 lang="en">' + esc(p.title) + '</h3>') +
                        '<p class="pub-authors">' + authors(p.authors, p.year) + '</p>' +
                        '<p class="pub-venue"><i class="fa-solid fa-building-columns" aria-hidden="true"></i><span>' + esc(pick(p.venue)) + '</span></p>' +
                        '<p class="pub-where">' +
                            '<span><i class="fa-solid fa-location-dot" aria-hidden="true"></i>' + esc(pick(p.place)) + '</span>' +
                            '<span><i class="fa-regular fa-calendar" aria-hidden="true"></i>' + esc(dateLabel) + ' <time datetime="' + p.date + '">' + esc(formatDate(p.date, p.dateEnd)) + '</time></span>' +
                        '</p>' +
                        (p.note ? '<p class="pub-note">' + esc(pick(p.note)) + '</p>' : '') +
                        '<div class="pub-actions">' + action + '</div>' +
                    '</article>' +
                '</li>';
        }).join('');
        document.dispatchEvent(new CustomEvent('contentrendered', { detail: { scope: list } }));
    }

    document.addEventListener('DOMContentLoaded', render);
    document.addEventListener('langchange', render);
})();
