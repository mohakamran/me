/* ==========================================================================
   App tools — the "app-like" layer on top of the portfolio.
   - Command palette (⌘K / Ctrl+K, header search button, hero chip)
   - Interactive terminal (hero "Try the terminal" button, palette, `t` key)
   - Header label showing the section you are reading
   - Confetti (window.Confetti) in the current accent colours
   ========================================================================== */
(function () {
    'use strict';

    var root = document.documentElement;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);
    var EMAIL = 'mohammadkamran1515@gmail.com';
    var LINKS = {
        github: 'https://github.com/mohakamran',
        linkedin: 'https://www.linkedin.com/in/mokamran/',
        cv: 'japan-kamran-cv.pdf'
    };
    var ACCENTS = ['emerald', 'violet', 'ocean', 'sunset'];

    function t(key) { return window.I18N ? window.I18N.t(key) : key; }
    function pick(v) { return window.I18N ? window.I18N.pick(v) : (v && v.en) || v; }
    function ja() { return root.lang === 'ja'; }
    function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
    function data() { return window.SITE_DATA || {}; }
    function toast(msg) { if (window.Toast) window.Toast(msg); }

    function lock(on) { if (window.ScrollLock) window.ScrollLock(on); }

    function scrollToId(id) {
        var el = document.getElementById(id);
        if (!el) return;
        var lenis = window.SmoothScroll && window.SmoothScroll.instance;
        var header = document.getElementById('site-header');
        var offset = -((header && header.offsetHeight) || 72) - 12;
        if (lenis) lenis.scrollTo(el, { offset: id === 'home' ? 0 : offset, duration: 1.4 });
        else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: reduceMotion ? 'auto' : 'smooth' });
    }

    function copyEmail() {
        var done = function () { toast(t('toast.emailCopied')); };
        if (navigator.clipboard) navigator.clipboard.writeText(EMAIL).then(done, done);
        else done();
    }

    function openCase(id) {
        // projects.js listens for clicks on [data-case]
        var b = document.createElement('button');
        b.type = 'button';
        b.hidden = true;
        b.setAttribute('data-case', id);
        document.body.appendChild(b);
        b.click();
        b.remove();
    }

    function setLang(l) {
        var btn = document.querySelector('[data-lang-btn="' + l + '"]');
        if (btn) btn.click();
        else if (window.I18N) window.I18N.setLang(l, true);
    }

    function download(href) {
        var a = document.createElement('a');
        a.href = href;
        a.download = '';
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    /* ======================================================================
       Confetti
       ====================================================================== */
    var confetti = (function () {
        var canvas, ctx, parts = [], raf = 0;
        function colours() {
            var cs = getComputedStyle(root);
            return ['--accent-1', '--accent-2', '--accent-3'].map(function (v) { return cs.getPropertyValue(v).trim() || '#10b981'; }).concat(['#fbbf24', '#ffffff']);
        }
        function frame() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var dpr = window.devicePixelRatio || 1;
            parts = parts.filter(function (p) { return p.life > 0 && p.y < innerHeight + 40; });
            parts.forEach(function (p) {
                p.vy += 0.18; p.vx *= 0.99; p.vy *= 0.99;
                p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= 1;
                ctx.save();
                ctx.globalAlpha = Math.min(1, p.life / 40);
                ctx.translate(p.x * dpr, p.y * dpr);
                ctx.rotate(p.rot);
                ctx.fillStyle = p.c;
                if (p.round) { ctx.beginPath(); ctx.arc(0, 0, p.s * dpr / 2, 0, Math.PI * 2); ctx.fill(); }
                else ctx.fillRect(-p.s * dpr / 2, -p.s * dpr / 4, p.s * dpr, p.s * dpr / 2);
                ctx.restore();
            });
            if (parts.length) raf = requestAnimationFrame(frame);
            else { raf = 0; canvas.classList.remove('on'); }
        }
        return function fire(opts) {
            if (reduceMotion) return;
            canvas = canvas || document.getElementById('confetti');
            if (!canvas) return;
            ctx = ctx || canvas.getContext('2d');
            var dpr = window.devicePixelRatio || 1;
            canvas.width = innerWidth * dpr;
            canvas.height = innerHeight * dpr;
            canvas.classList.add('on');
            var cols = colours();
            var x = (opts && opts.x != null) ? opts.x : innerWidth / 2;
            var y = (opts && opts.y != null) ? opts.y : innerHeight * 0.6;
            var n = innerWidth < 600 ? 90 : 160;
            for (var i = 0; i < n; i++) {
                var a = -Math.PI / 2 + (Math.random() - 0.5) * 1.6;
                var v = 7 + Math.random() * 9;
                parts.push({ x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, s: 6 + Math.random() * 7, c: cols[i % cols.length], life: 110 + Math.random() * 60, round: Math.random() < 0.3 });
            }
            if (!raf) raf = requestAnimationFrame(frame);
        };
    })();
    window.Confetti = confetti;

    /* ======================================================================
       Command palette
       ====================================================================== */
    var cmdk, cmdkInput, cmdkList, items = [], filtered = [], active = 0, lastFocus;

    function buildItems() {
        var list = [];
        var sections = [
            ['home', 'cmdk.home', 'fa-house'], ['about', 'nav.about', 'fa-user'], ['experience', 'nav.experience', 'fa-briefcase'],
            ['publications', 'nav.publications', 'fa-book-open'], ['skills', 'nav.skills', 'fa-layer-group'], ['work', 'nav.work', 'fa-star'],
            ['projects', 'cmdk.allProjects', 'fa-grip'], ['services', 'nav.services', 'fa-wand-magic-sparkles'], ['gallery', 'nav.life', 'fa-images'],
            ['contact', 'nav.contact', 'fa-envelope']
        ];
        sections.forEach(function (s) {
            list.push({ group: 'cmdk.gNavigate', icon: 'fa-solid ' + s[2], label: t(s[1]), run: function () { scrollToId(s[0]); } });
        });
        (data().featured || []).forEach(function (p) {
            list.push({ group: 'cmdk.gProjects', icon: 'fa-solid fa-folder-open', label: pick(p.title), hint: t('work.caseStudy'), keys: p.title.en + ' ' + p.title.ja + ' ' + (p.stack || []).join(' '), run: function () { openCase(p.id); } });
        });
        list.push(
            { group: 'cmdk.gActions', icon: 'fa-solid fa-terminal', label: t('cmdk.terminal'), hint: 'T', run: function () { openTerminal(); } },
            { group: 'cmdk.gActions', icon: 'fa-regular fa-copy', label: t('cmdk.copyEmail'), hint: EMAIL, run: copyEmail },
            { group: 'cmdk.gActions', icon: 'fa-solid fa-download', label: t('hero.cv'), run: function () { download(LINKS.cv); } },
            { group: 'cmdk.gActions', icon: 'fa-solid fa-paper-plane', label: t('cmdk.hire'), run: function () { confetti(); scrollToId('contact'); } },
            { group: 'cmdk.gTheme', icon: 'fa-solid fa-circle-half-stroke', label: t('cmdk.toggleMode'), run: function () { window.Theme.set(window.Theme.current === 'dark' ? 'light' : 'dark'); } }
        );
        ACCENTS.forEach(function (a) {
            list.push({ group: 'cmdk.gTheme', icon: 'fa-solid fa-palette', swatch: a, label: t('cmdk.accent') + ': ' + t('theme.' + a), keys: a, run: function () { window.Theme.setAccent(a); } });
        });
        list.push(
            { group: 'cmdk.gLanguage', icon: 'fa-solid fa-language', label: 'English', keys: 'english en 英語', run: function () { setLang('en'); } },
            { group: 'cmdk.gLanguage', icon: 'fa-solid fa-language', label: '日本語', keys: 'japanese ja nihongo 日本語', run: function () { setLang('ja'); } },
            { group: 'cmdk.gLinks', icon: 'fa-brands fa-github', label: 'GitHub', hint: 'github.com/mohakamran', run: function () { window.open(LINKS.github, '_blank', 'noopener'); } },
            { group: 'cmdk.gLinks', icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn', hint: 'in/mokamran', run: function () { window.open(LINKS.linkedin, '_blank', 'noopener'); } }
        );
        return list;
    }

    // Substring match first; otherwise a tight subsequence match (handles typos like "gymflw")
    function score(text, q, fuzzy) {
        text = text.toLowerCase();
        if (!q) return 1;
        var i = text.indexOf(q);
        if (i >= 0) return 100 - i;
        if (!fuzzy || q.length < 3) return 0;
        var start = -1, ti = 0;
        for (var qi = 0; qi < q.length; qi++) {
            var f = text.indexOf(q[qi], ti);
            if (f < 0) return 0;
            if (start < 0) start = f;
            ti = f + 1;
        }
        // Reject matches scattered across the whole label
        return ti - start <= q.length + 2 ? 20 : 0;
    }

    function renderList() {
        var q = cmdkInput.value.trim().toLowerCase();
        filtered = items.map(function (it) {
            return { it: it, s: Math.max(score(it.label, q, true), score(t(it.group), q) * 0.5, it.keys ? score(it.keys, q) : 0) };
        }).filter(function (x) { return x.s > 0; });
        if (q) filtered.sort(function (a, b) { return b.s - a.s; });
        filtered = filtered.map(function (x) { return x.it; });
        if (active >= filtered.length) active = 0;

        if (!filtered.length) {
            cmdkList.innerHTML = '<p class="cmdk-empty">' + esc(t('cmdk.empty')) + '</p>';
            return;
        }
        var html = '', group = null;
        filtered.forEach(function (it, i) {
            if (!q && it.group !== group) { group = it.group; html += '<p class="cmdk-group">' + esc(t(group)) + '</p>'; }
            html += '<button type="button" class="cmdk-item" role="option" id="cmdk-o' + i + '" data-i="' + i + '" aria-selected="' + (i === active) + '">' +
                (it.swatch ? '<span class="cmdk-sw" data-sw="' + it.swatch + '"></span>' : '<i class="' + it.icon + '" aria-hidden="true"></i>') +
                '<span class="cmdk-label">' + esc(it.label) + '</span>' +
                (it.hint ? '<span class="cmdk-hint">' + esc(it.hint) + '</span>' : '') +
                '<i class="fa-solid fa-arrow-turn-down cmdk-enter" aria-hidden="true"></i></button>';
        });
        cmdkList.innerHTML = html;
        cmdkInput.setAttribute('aria-activedescendant', 'cmdk-o' + active);
    }

    function setActive(i) {
        if (!filtered.length) return;
        active = (i + filtered.length) % filtered.length;
        cmdkList.querySelectorAll('.cmdk-item').forEach(function (el) {
            var on = +el.getAttribute('data-i') === active;
            el.setAttribute('aria-selected', String(on));
            if (on) el.scrollIntoView({ block: 'nearest' });
        });
        cmdkInput.setAttribute('aria-activedescendant', 'cmdk-o' + active);
    }

    function runItem(i) {
        var it = filtered[i];
        if (!it) return;
        closeCmdk(true);
        // Let the dialog close (and the scroll lock release) before acting
        setTimeout(it.run, 60);
    }

    function openCmdk() {
        if (!cmdk || cmdk.open) return;
        if (term && term.open) closeTerminal();
        lastFocus = document.activeElement;
        items = buildItems();
        cmdkInput.value = '';
        active = 0;
        renderList();
        cmdk.showModal();
        lock(true);
        requestAnimationFrame(function () { cmdk.classList.add('show'); cmdkInput.focus(); });
    }

    function closeCmdk(keepFocus) {
        if (!cmdk || !cmdk.open) return;
        cmdk.classList.remove('show');
        cmdk.close();
        lock(false);
        if (!keepFocus && lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }

    function initCmdk() {
        cmdk = document.getElementById('cmdk');
        if (!cmdk) return;
        cmdkInput = document.getElementById('cmdk-input');
        cmdkList = document.getElementById('cmdk-list');

        cmdkInput.addEventListener('input', function () { active = 0; renderList(); });
        cmdkInput.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
            else if (e.key === 'Enter') { e.preventDefault(); runItem(active); }
            else if (e.key === 'Escape') { e.preventDefault(); closeCmdk(); }
        });
        cmdkList.addEventListener('click', function (e) {
            var b = e.target.closest('.cmdk-item');
            if (b) runItem(+b.getAttribute('data-i'));
        });
        cmdkList.addEventListener('mousemove', function (e) {
            var b = e.target.closest('.cmdk-item');
            if (b && +b.getAttribute('data-i') !== active) setActive(+b.getAttribute('data-i'));
        });
        cmdk.addEventListener('click', function (e) { if (e.target === cmdk) closeCmdk(); });
        cmdk.addEventListener('cancel', function (e) { e.preventDefault(); closeCmdk(); });

        document.querySelectorAll('.cmdk-btn, [data-open-cmdk]').forEach(function (b) { b.addEventListener('click', openCmdk); });
        document.querySelectorAll('.kbd-mod').forEach(function (k) { k.textContent = isMac ? '⌘K' : 'Ctrl K'; });
        if (window.matchMedia('(hover: none)').matches) root.classList.add('touch-ui');
    }

    /* ======================================================================
       Terminal
       ====================================================================== */
    var term, out, input, body, history = [], hIndex = 0;
    var COMMANDS = ['help', 'whoami', 'about', 'skills', 'experience', 'projects', 'open', 'papers', 'contact', 'email', 'cv', 'github', 'linkedin', 'theme', 'lang', 'date', 'clear', 'sudo', 'exit'];

    function print(html, cls) {
        var line = document.createElement('div');
        line.className = 'term-row' + (cls ? ' ' + cls : '');
        line.innerHTML = html;
        out.appendChild(line);
        body.scrollTop = body.scrollHeight;
    }
    function row(k, v) { return '<span class="tk">' + esc(k) + '</span>' + v; }

    function welcome() {
        print('<span class="t-accent">' + esc(t('term.welcome')) + '</span>');
        print(esc(t('term.welcomeHint')).replace('help', '<b class="t-cmd">help</b>'), 't-dim');
    }

    var handlers = {
        help: function () {
            var lines = ['whoami', 'skills', 'experience', 'projects', 'open', 'papers', 'contact', 'cv', 'github', 'theme', 'lang', 'date', 'clear', 'exit'];
            print(lines.map(function (c) { return row(c + (c === 'open' ? ' <n>' : c === 'theme' ? ' <name>' : c === 'lang' ? ' <en|ja>' : ''), esc(t('term.h.' + c))); }).join('<br>'));
            print(esc(t('term.secret')), 't-dim');
        },
        whoami: function () {
            print('<b>Muhammad Kamran</b> — ' + esc(t('term.whoami')));
        },
        skills: function () {
            var groups = [
                ['Frontend', 'React · Next.js · TypeScript · Tailwind · Three.js'],
                ['Backend', 'Laravel · PHP · Node.js · Express · REST APIs'],
                ['AI / Data', 'Python · Machine learning · NLP · OpenAI APIs'],
                ['Data', 'MySQL · MongoDB · Firebase'],
                ['CMS / Commerce', 'WordPress · WooCommerce · Shopify']
            ];
            print(groups.map(function (g) { return row(g[0], esc(g[1])); }).join('<br>'));
        },
        experience: function () {
            var rows = [];
            document.querySelectorAll('#experience .tl-card').forEach(function (c) {
                var date = c.querySelector('.tl-date'), role = c.querySelector('h3'), org = c.querySelector('.tl-org span');
                rows.push(row(date ? date.textContent : '', '<b>' + esc(role ? role.textContent : '') + '</b> — ' + esc(org ? org.textContent : '')));
            });
            print(rows.join('<br>'));
        },
        projects: function () {
            print((data().featured || []).map(function (p, i) { return row('[' + (i + 1) + ']', esc(pick(p.title))); }).join('<br>'));
            print(esc(t('term.openHint')), 't-dim');
        },
        open: function (args) {
            var list = data().featured || [];
            var n = parseInt(args[0], 10);
            var p = list[n - 1] || list.filter(function (x) { return args[0] && x.id.indexOf(args[0].toLowerCase()) === 0; })[0];
            if (!p) { print(esc(t('term.openUsage')), 't-err'); return; }
            print(esc(t('term.opening')) + ' <b>' + esc(pick(p.title)) + '</b>…');
            setTimeout(function () { closeTerminal(true); openCase(p.id); }, 450);
        },
        papers: function () {
            print((data().publications || []).map(function (p) {
                return row(p.year + ' · ' + t('term.' + p.status), esc(ja() && p.titleJa ? p.titleJa : p.title));
            }).join('<br>'));
        },
        contact: function () {
            copyEmail();
            print(row('email', '<a href="mailto:' + EMAIL + '">' + EMAIL + '</a> <span class="t-dim">(' + esc(t('term.copied')) + ')</span>'));
        },
        cv: function () { download(LINKS.cv); print(esc(t('term.cv'))); },
        github: function () { window.open(LINKS.github, '_blank', 'noopener'); print(esc(t('term.opening')) + ' github.com/mohakamran'); },
        linkedin: function () { window.open(LINKS.linkedin, '_blank', 'noopener'); print(esc(t('term.opening')) + ' linkedin.com/in/mokamran'); },
        theme: function (args) {
            var a = (args[0] || '').toLowerCase();
            if (a === 'dark' || a === 'light') window.Theme.set(a);
            else if (ACCENTS.indexOf(a) >= 0) window.Theme.setAccent(a);
            else { print(esc(t('term.themeUsage')), 't-err'); return; }
            print('✓ ' + esc(t('term.themeSet')) + ' ' + esc(a));
        },
        lang: function (args) {
            var l = (args[0] || '').toLowerCase();
            if (l !== 'en' && l !== 'ja') { print('lang en | lang ja', 't-err'); return; }
            setLang(l);
            print('✓ ' + esc(t('term.langSet')));
        },
        date: function () {
            var f = new Intl.DateTimeFormat(ja() ? 'ja-JP' : 'en-GB', { timeZone: 'Asia/Tokyo', dateStyle: 'full', timeStyle: 'short' });
            print(esc(f.format(new Date())) + ' <span class="t-dim">(JST · Kitakyushu)</span>');
        },
        clear: function () { out.innerHTML = ''; },
        sudo: function (args) {
            if ((args[0] || '').toLowerCase() === 'hire-me' || (args.join(' ').toLowerCase() === 'hire me')) {
                print('<span class="t-accent">[sudo]</span> ' + esc(t('term.hire1')));
                print('✓ ' + esc(t('term.hire2')), 't-ok');
                confetti();
                setTimeout(function () { closeTerminal(true); scrollToId('contact'); }, 1400);
            } else print(esc(t('term.sudo')), 't-err');
        },
        exit: function () { closeTerminal(); }
    };
    handlers.about = handlers.whoami;
    handlers.email = handlers.contact;
    handlers.time = handlers.date;
    handlers.ls = handlers.projects;

    function run(raw) {
        var line = raw.trim();
        print('<span class="tp-user">kamran@kitakyushu</span>:<span class="tp-dir">~</span>$ ' + esc(line), 't-echo');
        if (!line) return;
        history.push(line);
        hIndex = history.length;
        var parts = line.split(/\s+/);
        var cmd = parts[0].toLowerCase();
        var fn = handlers[cmd];
        if (fn) fn(parts.slice(1));
        else print(esc(t('term.notFound').replace('{cmd}', cmd)), 't-err');
    }

    function complete() {
        var v = input.value;
        var parts = v.split(/\s+/);
        var pool = COMMANDS, word = parts[0];
        if (parts.length > 1) {
            word = parts[parts.length - 1];
            pool = parts[0] === 'theme' ? ACCENTS.concat(['dark', 'light']) : parts[0] === 'lang' ? ['en', 'ja'] : parts[0] === 'sudo' ? ['hire-me'] : [];
        }
        var hits = pool.filter(function (c) { return c.indexOf(word.toLowerCase()) === 0; });
        if (hits.length === 1) { parts[parts.length - 1] = hits[0]; input.value = parts.join(' ') + ' '; }
        else if (hits.length > 1) print(hits.join('  '), 't-dim');
    }

    function renderChips() {
        var chips = document.getElementById('term-chips');
        if (!chips) return;
        chips.innerHTML = ['help', 'whoami', 'projects', 'skills', 'papers', 'theme ocean', 'sudo hire-me'].map(function (c) {
            return '<button type="button" data-cmd="' + c + '">' + c + '</button>';
        }).join('');
    }

    function openTerminal() {
        if (!term || term.open) return;
        if (cmdk && cmdk.open) closeCmdk(true);
        lastFocus = document.activeElement;
        if (!out.childNodes.length) welcome();
        term.showModal();
        lock(true);
        requestAnimationFrame(function () {
            term.classList.add('show');
            // Avoid popping the keyboard on phones; they can tap the chips
            if (!root.classList.contains('touch-ui')) input.focus();
        });
    }

    function closeTerminal(keepFocus) {
        if (!term || !term.open) return;
        term.classList.remove('show');
        term.close();
        lock(false);
        if (!keepFocus && lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }

    function initTerminal() {
        term = document.getElementById('terminal');
        if (!term) return;
        out = document.getElementById('term-out');
        input = document.getElementById('term-input');
        body = document.getElementById('term-body');
        renderChips();

        document.getElementById('term-form').addEventListener('submit', function (e) {
            e.preventDefault();
            run(input.value);
            input.value = '';
        });
        input.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowUp') { e.preventDefault(); if (hIndex > 0) input.value = history[--hIndex]; }
            else if (e.key === 'ArrowDown') { e.preventDefault(); hIndex = Math.min(history.length, hIndex + 1); input.value = history[hIndex] || ''; }
            else if (e.key === 'Tab') { e.preventDefault(); complete(); }
            else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); out.innerHTML = ''; }
            else if (e.key === 'Escape') { e.preventDefault(); closeTerminal(); }
        });
        document.getElementById('term-chips').addEventListener('click', function (e) {
            var b = e.target.closest('[data-cmd]');
            if (b) run(b.getAttribute('data-cmd'));
        });
        body.addEventListener('click', function () { if (!window.getSelection().toString() && !root.classList.contains('touch-ui')) input.focus(); });
        term.querySelectorAll('[data-term-close]').forEach(function (b) { b.addEventListener('click', function () { closeTerminal(); }); });
        term.addEventListener('click', function (e) { if (e.target === term) closeTerminal(); });
        term.addEventListener('cancel', function (e) { e.preventDefault(); closeTerminal(); });
        document.querySelectorAll('[data-open-terminal]').forEach(function (b) { b.addEventListener('click', openTerminal); });
        document.addEventListener('langchange', function () {
            if (out.childNodes.length) { out.innerHTML = ''; welcome(); }
        });
    }

    /* ======================================================================
       Global shortcuts: ⌘K / Ctrl+K and "/" open the palette, "t" the terminal
       ====================================================================== */
    function typing(el) {
        return el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
    }
    function initShortcuts() {
        document.addEventListener('keydown', function (e) {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                if (cmdk && cmdk.open) closeCmdk(); else openCmdk();
                return;
            }
            if (e.metaKey || e.ctrlKey || e.altKey || typing(e.target) || document.querySelector('dialog[open]')) return;
            if (e.key === '/') { e.preventDefault(); openCmdk(); }
            else if (e.key === 't' || e.key === '`') { e.preventDefault(); openTerminal(); }
        });
    }

    /* ======================================================================
       Header: "→ Section" label for the section in view
       ====================================================================== */
    function initSectionLabel() {
        var label = document.querySelector('.brand-now');
        var sub = document.querySelector('.brand-sub');
        if (!label || !sub || !('IntersectionObserver' in window)) return;
        var names = {
            story: 'nav.about', about: 'nav.about', experience: 'nav.experience', publications: 'nav.publications', skills: 'nav.skills',
            work: 'nav.work', projects: 'nav.work', services: 'nav.services', certifications: 'cmdk.certs', gallery: 'nav.life', contact: 'nav.contact'
        };
        var current = null;
        function paint() {
            if (current && names[current]) {
                label.textContent = '→ ' + t(names[current]);
                sub.classList.add('has-now');
            } else sub.classList.remove('has-now');
        }
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (en.isIntersecting) { current = en.target.id === 'home' ? null : en.target.id; paint(); }
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        document.querySelectorAll('main section[id], #home').forEach(function (s) { io.observe(s); });
        document.addEventListener('langchange', paint);
    }

    /* ======================================================================
       Footer back-to-top (labelled button): smooth scroll via Lenis
       ====================================================================== */
    function initBackTop() {
        document.querySelectorAll('.back-top').forEach(function (a) {
            a.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var lenis = window.SmoothScroll && window.SmoothScroll.instance;
                if (lenis) lenis.scrollTo(0, { duration: 1.8 });
                else window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initCmdk();
        initTerminal();
        initShortcuts();
        initSectionLabel();
        initBackTop();
    });
})();
