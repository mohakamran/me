/* ==========================================================================
   i18n — EN / 日本語 text swap (no library).
   Markup hooks:
     data-i18n="key"             → textContent
     data-i18n-html="key"        → innerHTML (for strings with <span class="grad-text">)
     data-i18n-attr="attr:key;…" → attributes (placeholder, aria-label, alt…)
   Choice persists in localStorage ('preferred-language'); first visit follows
   navigator.language (applied pre-paint by the inline script in <head>).
   Fires a 'langchange' event on document so data-driven sections re-render.
   ========================================================================== */
(function () {
    'use strict';

    var dict = {
        en: {
            'meta.title': 'Muhammad Kamran — Full Stack & AI Engineer',
            'meta.description': 'Muhammad Kamran is a Full Stack & AI Engineer with 5+ years of professional experience building production systems with Laravel, React, Node.js and Python. M.Sc. graduate of the University of Kitakyushu, based in Japan. Speaks English and Japanese.',

            'a11y.skip': 'Skip to content',
            'a11y.language': 'Language',
            'a11y.theme': 'Toggle light and dark theme',
            'a11y.menu': 'Open menu',
            'a11y.menuClose': 'Close menu',
            'a11y.scroll': 'Scroll to About',
            'a11y.top': 'Back to top',
            'a11y.lightbox': 'Photo viewer',
            'a11y.close': 'Close',
            'a11y.prev': 'Previous photo',
            'a11y.next': 'Next photo',

            'cursor.drag': 'Drag',
            'cursor.view': 'View',
            'cursor.spin': 'Spin',

            'alt.portrait': 'Portrait of Muhammad Kamran',
            'alt.about': 'Muhammad Kamran in Japan',

            'nav.role': 'Full Stack & AI',
            'nav.about': 'About',
            'nav.experience': 'Experience',
            'nav.skills': 'Skills',
            'nav.work': 'Projects',
            'nav.services': 'Services',
            'nav.life': 'Life in Japan',
            'nav.contact': 'Contact Me',

            'hero.status': 'Open to full-time roles & freelance projects',
            'hero.kicker': "Hi, I'm Muhammad Kamran",
            'hero.title': 'Full Stack &amp; <span class="grad-text">AI Engineer</span>',
            'hero.lead': '<strong>5+ years</strong> building production systems with Laravel, React, Node.js and Python — for teams and clients worldwide. Now based in Kitakyushu, Japan.',
            'hero.ctaWork': 'View Projects',
            'hero.ctaContact': 'Contact Me',
            'hero.cv': 'Download CV',
            'hero.metaLocation': 'Kitakyushu, Japan',
            'hero.metaLang': 'Speaks English & 日本語',
            'hero.fcYearsNum': '5+',
            'hero.fcYears': 'years in production',
            'hero.fcProjectsNum': '50+',
            'hero.fcProjects': 'projects shipped',
            'hero.scroll': 'Scroll',

            'about.eyebrow': 'About',
            'about.title': 'Five years of shipping <span class="grad-text">real products</span>',
            'about.badge': 'M.Sc. Graduate · University of Kitakyushu',
            'about.p1': "I'm a full stack engineer with 5+ years of professional experience across the whole product lifecycle — from database schemas and REST APIs to fast, responsive front ends. For nearly four years I was a Full Stack Engineer at Reblate Solutions, where I engineered 15+ production web applications for internal business systems and e-commerce clients — including a company CRM that improved team workflow efficiency by 70%.",
            'about.p2': 'Since August 2024 I\'ve worked independently with startups and small businesses on full stack and AI-powered products. Alongside that work I earned my M.Sc. in Applied Information Systems from the University of Kitakyushu as a MEXT scholar, graduating in September 2026. My research used Python and the CARLA driving simulator to study traffic behavior — the same data-driven mindset I bring to product work.',
            'about.p3': 'I work comfortably in both English and Japanese, and I care about clean architecture, fast pages and code the next engineer can read. AI-assisted workflows (Claude Code, Cursor) help me move faster without cutting corners.',

            'stats.yearsSuffix': '+',
            'stats.years': 'Years of professional experience',
            'stats.projectsSuffix': '+',
            'stats.projects': 'Projects shipped',
            'stats.appsSuffix': '+',
            'stats.apps': 'Production apps at Reblate Solutions',
            'stats.efficiency': 'Workflow efficiency gain (CRM)',

            'facts.location': 'Based in',
            'facts.locationVal': 'Kitakyushu, Fukuoka, Japan',
            'facts.languages': 'Languages',
            'facts.languagesVal': 'English (business level) · Japanese',
            'facts.education': 'Education',
            'facts.educationVal': 'M.Sc. Applied Information Systems, University of Kitakyushu (2026) · B.Sc. IT, University of Gujrat (2020)',
            'facts.focus': 'Focus',
            'facts.focusVal': 'Full stack web apps · AI integration · Data & ML',

            'exp.eyebrow': 'Experience',
            'exp.title': 'Career <span class="grad-text">timeline</span>',
            'exp.sub': 'Two clear phases: almost four years in-house at a software company, then independent work from Japan.',
            'exp.barAria': 'Career overview: Full Stack Engineer at Reblate Solutions from January 2021 to August 2024, freelance from August 2024 to present, and an M.Sc. completed between October 2024 and September 2026',
            'exp.segCompany': 'Reblate Solutions',
            'exp.segFreelance': 'Freelance',
            'exp.segEdu': 'M.Sc.',
            'exp.co.date': 'Jan 2021 – Aug 2024',
            'exp.co.type': 'Full-time · 3 yrs 8 mos',
            'exp.co.role': 'Full Stack Engineer',
            'exp.co.org': 'Reblate Solutions · Software development company, Pakistan',
            'exp.co.p1': 'Engineered 15+ production web applications for internal business systems and e-commerce clients.',
            'exp.co.p2': 'Owned features end-to-end: database design, Laravel/PHP back ends, REST APIs and React front ends.',
            'exp.co.p3': 'Built custom WordPress/WooCommerce and Shopify stores, including payment-gateway integrations.',
            'exp.co.key': 'Key achievement: built the company CRM that centralized customer data and employee performance tracking — improving team workflow efficiency by 70%.',
            'exp.fl.date': 'Aug 2024 – Present',
            'exp.fl.type': 'Freelance · Remote',
            'exp.fl.role': 'Freelance Full Stack & AI Engineer',
            'exp.fl.org': 'Independent · Kitakyushu, Japan & remote clients',
            'exp.fl.p1': 'Design and build Next.js / React applications backed by Node.js or Laravel APIs for startups and small businesses.',
            'exp.fl.p2': 'Integrate AI into products: LLM features, data dashboards and machine-learning prototypes such as churn prediction and sentiment analysis.',
            'exp.fl.p3': 'Improve performance and SEO of existing sites, and deploy on Vercel, Netlify and VPS infrastructure.',
            'exp.fl.key': 'Key achievement: sole architect and developer on every engagement — from requirements to deployment — while working across time zones.',
            'exp.ed.date': 'Oct 2024 – Sep 2026',
            'exp.ed.type': 'Graduated',
            'exp.ed.role': 'M.Sc. Applied Information Systems',
            'exp.ed.org': 'University of Kitakyushu, Japan · MEXT Scholarship',
            'exp.ed.summary': 'Completed alongside freelance work. Research on traffic psychology, driver behavior and speech articulation using Python and the CARLA simulator (Unreal Engine), resulting in three first-author conference papers, including one in IEEE Xplore.',

            'skills.eyebrow': 'Skills',
            'skills.title': 'A stack built <span class="grad-text">in production</span>',
            'skills.sub': 'The tools I use every day, grouped by what they\'re for.',
            'skills.frontend': 'Frontend',
            'skills.backend': 'Backend',
            'skills.ai': 'AI & Data',
            'skills.devops': 'DevOps & Cloud',
            'skills.cms': 'CMS & E-commerce',

            'work.eyebrow': 'Featured work',
            'work.title': 'Selected <span class="grad-text">case studies</span>',
            'work.sub': 'Problem, solution, stack and result — open any project for the full story and screenshots.',
            'work.caseStudy': 'Read case study',
            'work.problem': 'Problem',
            'work.solution': 'Solution',
            'work.stack': 'Stack',
            'work.result': 'Result',
            'work.role': 'Role',
            'work.github': 'GitHub',
            'work.live': 'Live demo',
            'work.close': 'Close',

            'archive.eyebrow': 'All projects',
            'archive.title': 'Everything I\'ve <span class="grad-text">built</span>',
            'archive.filterAria': 'Filter projects',
            'archive.all': 'All',
            'archive.web': 'Web apps',
            'archive.wordpress': 'WordPress',
            'archive.ecommerce': 'E-commerce',
            'archive.javascript': 'JavaScript',
            'archive.github': 'More on GitHub',
            'archive.viewPost': 'View post',
            'archive.viewCode': 'View code',
            'archive.viewLive': 'Visit site',

            'services.eyebrow': 'Services',
            'services.title': 'How I can <span class="grad-text">help</span>',
            'services.cta': 'Discuss a project',
            'services.s1.title': 'Full stack web development',
            'services.s1.desc': 'Production web apps with Laravel, Node.js, React and Next.js — from data model and APIs to a polished, responsive UI.',
            'services.s2.title': 'AI-powered features',
            'services.s2.desc': 'LLM integrations, RAG pipelines and AI assistants built with FastAPI, LangChain and vector databases — shipped into real products.',
            'services.s3.title': 'Data & machine learning',
            'services.s3.desc': 'Data cleaning, analysis and predictive models in Python, delivered as dashboards or APIs your team can use.',
            'services.s4.title': 'CMS & e-commerce',
            'services.s4.desc': 'Custom WordPress, WooCommerce and Shopify builds with payment integrations, fast load times and solid SEO foundations.',

            'certs.title': 'Education & certifications',
            'certs.mext': 'MEXT Scholarship',
            'certs.mextBy': 'Japanese Government',

            'gallery.eyebrow': 'Life in Japan',
            'gallery.title': 'Beyond the <span class="grad-text">keyboard</span>',
            'gallery.sub': 'Seasons, shrines, coastlines and good company — a few moments from life in Fukuoka and around Japan.',

            'contact.eyebrow': 'Contact',
            'contact.title': "Let's build <span class=\"grad-text\">something great</span>",
            'contact.sub': 'Hiring for a full stack or AI role, or have a project in mind? Send a message in English or Japanese — I usually reply within 24 hours.',
            'contact.availability': 'Availability',
            'contact.availabilityVal': 'Open to full-time roles in Japan and remote freelance work',
            'contact.location': 'Location',
            'contact.locationVal': 'Kitakyushu, Fukuoka, Japan (JST, UTC+9)',
            'contact.email': 'Email',

            'form.title': 'Send a message',
            'form.name': 'Full name',
            'form.namePh': 'Your name',
            'form.email': 'Email address',
            'form.emailPh': 'you@company.com',
            'form.subject': 'Subject',
            'form.subjectPh': 'What is this about?',
            'form.message': 'Message',
            'form.messagePh': 'Tell me about the role or project…',
            'form.submit': 'Send message',
            'form.sending': 'Sending…',
            'form.sent': 'Message sent!',
            'form.success': "Message sent! I'll get back to you within 24 hours.",
            'form.error': 'Something went wrong. Please try again or email me directly.',
            'form.errRequired': 'This field is required.',
            'form.errName': 'Please enter at least 2 characters.',
            'form.errEmail': 'Please enter a valid email address.',
            'form.errSubject': 'Please enter at least 3 characters.',
            'form.errMessage': 'Please write at least 10 characters.',

            'footer.tagline': 'Full stack & AI engineer building fast, reliable products — from Kitakyushu, Japan.',
            'footer.links': 'Quick links',
            'footer.connect': 'Connect',
            'footer.rights': 'All rights reserved.',
            'hero.metaGrad': 'M.Sc., University of Kitakyushu',
            'skills.globeHint': 'Drag to spin',
            'skills.frontendDesc': 'Fast, responsive interfaces',
            'skills.backendDesc': 'APIs, business logic & auth',
            'skills.data': 'Databases',
            'skills.dataDesc': 'Schema design & query tuning',
            'skills.aiDesc': 'LLM features, ML & analysis',
            'skills.devopsDesc': 'Ship, deploy & automate',
            'skills.cmsDesc': 'Stores that load fast & rank',
            'archive.sub': 'Web apps, AI tools, WordPress sites, online stores and JavaScript projects — filter by type.',
            'archive.ai': 'AI & Data',
            'archive.featured': 'Case study',
            'certs.msc': 'M.Sc. Applied Information Systems',
            'certs.mscBy': 'University of Kitakyushu · 2026',
            'gallery.aria': 'Life in Japan photo slider',
            'contact.languages': 'Languages',
            'contact.languagesVal': 'English & Japanese',
            'nav.publications': 'Publications',
            'pubs.eyebrow': 'Research',
            'pubs.title': 'Publications &amp; <span class="grad-text">conference papers</span>',
            'pubs.sub': 'First-author research from my M.Sc. at the University of Kitakyushu — driving simulation, speech acoustics and data visualization.',
            'pubs.statPapers': 'first-author papers',
            'pubs.statConf': 'conferences: ICCITX (IEEE), SICE FES, VTCA',
            'pubs.firstAuthor': 'First author',
            'pubs.status.published': 'Published',
            'pubs.presentedOn': 'Presented',
            'pubs.toPresent': 'To be presented',
            'pubs.read': 'Read on IEEE Xplore',
            'pubs.soon': 'Paper link coming soon',
            'pubs.soonUpcoming': 'Link available after the conference',
            'pubs.status.accepted': 'Accepted',
            'pubs.originalTitle': 'Original title',
            'pubs.statPublished': 'published · 1 accepted (Springer)'
        },

        ja: {
            'meta.title': 'ムハンマド・カムラン｜フルスタック＆AIエンジニア',
            'meta.description': 'Laravel・React・Node.js・Pythonを中心に、5年以上にわたり本番システムの開発に携わってきたフルスタック＆AIエンジニア、ムハンマド・カムランのポートフォリオです。北九州市立大学大学院修了。英語・日本語に対応。',

            'a11y.skip': '本文へスキップ',
            'a11y.language': '言語',
            'a11y.theme': 'ライト／ダークテーマを切り替え',
            'a11y.menu': 'メニューを開く',
            'a11y.menuClose': 'メニューを閉じる',
            'a11y.scroll': '自己紹介へスクロール',
            'a11y.top': 'ページの先頭へ戻る',
            'a11y.lightbox': '写真ビューア',
            'a11y.close': '閉じる',
            'a11y.prev': '前の写真',
            'a11y.next': '次の写真',

            'cursor.drag': 'ドラッグ',
            'cursor.view': '拡大',
            'cursor.spin': '回転',

            'alt.portrait': 'ムハンマド・カムランのポートレート',
            'alt.about': '日本でのムハンマド・カムラン',

            'nav.role': 'フルスタック＆AI',
            'nav.about': '自己紹介',
            'nav.experience': '経歴',
            'nav.skills': 'スキル',
            'nav.work': 'プロジェクト',
            'nav.services': 'サービス',
            'nav.life': '日本での生活',
            'nav.contact': 'お問い合わせ',

            'hero.status': '正社員・業務委託のご相談を受け付けています',
            'hero.kicker': 'はじめまして、ムハンマド・カムランです',
            'hero.title': 'フルスタック＆<span class="grad-text">AIエンジニア</span>',
            'hero.lead': 'Laravel・React・Node.js・Pythonを軸に、<strong>5年以上</strong>にわたって世界各地のチームやクライアント向けに本番システムを開発してきました。現在は福岡県北九州市を拠点に活動しています。',
            'hero.ctaWork': 'プロジェクトを見る',
            'hero.ctaContact': 'お問い合わせ',
            'hero.cv': '履歴書をダウンロード',
            'hero.metaLocation': '福岡県北九州市',
            'hero.metaLang': '英語・日本語に対応',
            'hero.fcYearsNum': '5年以上',
            'hero.fcYears': '本番開発の実務経験',
            'hero.fcProjectsNum': '50件以上',
            'hero.fcProjects': '開発プロジェクト',
            'hero.scroll': 'スクロール',

            'about.eyebrow': '自己紹介',
            'about.title': '5年間、<span class="grad-text">現場で使われるプロダクト</span>を作ってきました',
            'about.badge': '北九州市立大学大学院 修士課程修了',
            'about.p1': 'データベース設計やREST APIの構築から、高速でレスポンシブなフロントエンドの実装まで、プロダクト開発の全工程に5年以上携わってきたフルスタックエンジニアです。Reblate Solutionsではフルスタックエンジニアとして約4年間勤務し、社内業務システムやECサイトなど15件以上の本番Webアプリケーションを開発しました。中でも自社CRMの開発では、顧客データと業績管理を一元化し、チームの業務効率を70%改善しています。',
            'about.p2': '2024年8月からはフリーランスとして、スタートアップや中小企業のフルスタック開発・AIを活用したプロダクト開発を支援しています。並行して、文部科学省の国費留学生として北九州市立大学大学院で応用情報システムを専攻し、2026年9月に修士課程を修了しました。研究ではPythonとCARLA運転シミュレーターを用いて交通行動を分析しており、データに基づいて考える姿勢はプロダクト開発にも活きています。',
            'about.p3': '英語と日本語の両方でコミュニケーションが可能です。読みやすく保守しやすいコード、表示の速さ、シンプルで堅実な設計を大切にしており、Claude CodeやCursorなどのAI支援ツールも取り入れながら、品質を保ちつつ開発スピードを高めています。',

            'stats.yearsSuffix': '年以上',
            'stats.years': '実務経験',
            'stats.projectsSuffix': '件以上',
            'stats.projects': '開発したプロジェクト',
            'stats.appsSuffix': '件以上',
            'stats.apps': 'Reblate Solutionsで開発した本番アプリ',
            'stats.efficiency': 'CRM導入による業務効率の改善',

            'facts.location': '拠点',
            'facts.locationVal': '福岡県北九州市',
            'facts.languages': '言語',
            'facts.languagesVal': '英語（ビジネスレベル）・日本語',
            'facts.education': '学歴',
            'facts.educationVal': '北九州市立大学大学院 応用情報システム 修士（2026年修了）／グジュラート大学 情報技術 学士（2020年卒業）',
            'facts.focus': '専門領域',
            'facts.focusVal': 'フルスタックWeb開発・AI活用・データ分析／機械学習',

            'exp.eyebrow': '経歴',
            'exp.title': 'キャリアの<span class="grad-text">あゆみ</span>',
            'exp.sub': 'ソフトウェア開発会社での約4年間の社内開発と、日本を拠点としたフリーランスでの活動。2つのフェーズで歩んできました。',
            'exp.barAria': 'キャリア概要：2021年1月〜2024年8月 Reblate Solutionsでフルスタックエンジニア、2024年8月〜現在 フリーランス、2024年10月〜2026年9月 修士課程（修了）',
            'exp.segCompany': 'Reblate Solutions',
            'exp.segFreelance': 'フリーランス',
            'exp.segEdu': '修士課程',
            'exp.co.date': '2021年1月 – 2024年8月',
            'exp.co.type': '正社員・3年8か月',
            'exp.co.role': 'フルスタックエンジニア',
            'exp.co.org': 'Reblate Solutions（パキスタンのソフトウェア開発会社）',
            'exp.co.p1': '社内業務システムやECサイトなど、15件以上の本番Webアプリケーションを開発。',
            'exp.co.p2': 'データベース設計、Laravel／PHPによるバックエンド、REST API、Reactのフロントエンドまで、機能単位で一貫して担当。',
            'exp.co.p3': 'WordPress／WooCommerceおよびShopifyのカスタムストアを構築し、決済ゲートウェイの連携も実装。',
            'exp.co.key': '主な成果：顧客データと従業員の業績管理を一元化する社内CRMを開発し、チームの業務効率を70%改善。',
            'exp.fl.date': '2024年8月 – 現在',
            'exp.fl.type': 'フリーランス・リモート',
            'exp.fl.role': 'フリーランス フルスタック＆AIエンジニア',
            'exp.fl.org': '個人事業・北九州市および国内外のリモート案件',
            'exp.fl.p1': 'スタートアップや中小企業向けに、Node.jsまたはLaravelのAPIと連携するNext.js／Reactアプリケーションを設計・開発。',
            'exp.fl.p2': 'LLMを活用した機能、データダッシュボード、解約予測や感情分析などの機械学習プロトタイプを開発し、プロダクトにAIを組み込み。',
            'exp.fl.p3': '既存サイトの表示速度とSEOを改善し、Vercel・Netlify・VPS環境へのデプロイを担当。',
            'exp.fl.key': '主な成果：すべての案件で要件定義からデプロイまでを一人で設計・開発。時差のあるクライアントとも円滑に進行。',
            'exp.ed.date': '2024年10月 – 2026年9月',
            'exp.ed.type': '修了',
            'exp.ed.role': '応用情報システム 修士課程',
            'exp.ed.org': '北九州市立大学大学院・文部科学省（MEXT）国費留学生',
            'exp.ed.summary': 'フリーランスの仕事と並行して修了。PythonとCARLAシミュレーター（Unreal Engine）を用いて、交通心理学・ドライバー行動・音声の調音動作を研究し、IEEE Xplore掲載論文を含む3件の筆頭著者論文を発表しました。',

            'skills.eyebrow': 'スキル',
            'skills.title': '<span class="grad-text">実務で磨いた</span>技術スタック',
            'skills.sub': '日々の開発で使っている技術を、用途ごとにまとめました。',
            'skills.frontend': 'フロントエンド',
            'skills.backend': 'バックエンド',
            'skills.ai': 'AI・データ',
            'skills.devops': 'DevOps・クラウド',
            'skills.cms': 'CMS・EC',

            'work.eyebrow': '主な実績',
            'work.title': '<span class="grad-text">ケーススタディ</span>',
            'work.sub': '課題・解決策・技術スタック・成果の流れでご紹介します。各プロジェクトから詳細とスクリーンショットをご覧いただけます。',
            'work.caseStudy': '詳細を見る',
            'work.problem': '課題',
            'work.solution': '解決策',
            'work.stack': '技術スタック',
            'work.result': '成果',
            'work.role': '担当',
            'work.github': 'GitHub',
            'work.live': 'デモを見る',
            'work.close': '閉じる',

            'archive.eyebrow': 'すべてのプロジェクト',
            'archive.title': 'これまでに<span class="grad-text">開発したもの</span>',
            'archive.filterAria': 'プロジェクトを絞り込む',
            'archive.all': 'すべて',
            'archive.web': 'Webアプリ',
            'archive.wordpress': 'WordPress',
            'archive.ecommerce': 'EC',
            'archive.javascript': 'JavaScript',
            'archive.github': 'GitHubでもっと見る',
            'archive.viewPost': '投稿を見る',
            'archive.viewCode': 'コードを見る',
            'archive.viewLive': 'サイトを見る',

            'services.eyebrow': 'サービス',
            'services.title': '<span class="grad-text">お手伝いできること</span>',
            'services.cta': '相談する',
            'services.s1.title': 'フルスタックWeb開発',
            'services.s1.desc': 'Laravel・Node.js・React・Next.jsを用いた本番運用向けのWebアプリ開発。データ設計やAPIから、使いやすいレスポンシブUIまで対応します。',
            'services.s2.title': 'AI機能の開発・導入',
            'services.s2.desc': 'FastAPI・LangChain・ベクトルデータベースを活用し、LLM連携やRAG、AIアシスタントを実際のプロダクトに組み込みます。',
            'services.s3.title': 'データ分析・機械学習',
            'services.s3.desc': 'Pythonによるデータの前処理・分析・予測モデル構築を行い、チームで活用できるダッシュボードやAPIとして提供します。',
            'services.s4.title': 'CMS・ECサイト構築',
            'services.s4.desc': 'WordPress・WooCommerce・Shopifyのカスタム構築。決済連携、表示速度の最適化、SEOの基盤づくりまで対応します。',

            'certs.title': '学歴・資格',
            'certs.mext': '文部科学省 国費留学生',
            'certs.mextBy': '日本政府（MEXT）奨学金',

            'gallery.eyebrow': '日本での生活',
            'gallery.title': '<span class="grad-text">仕事以外</span>の日々',
            'gallery.sub': '四季の移ろい、神社めぐり、海辺の風景、そして大切な仲間たち。福岡をはじめ、日本各地での思い出を少しだけご紹介します。',

            'contact.eyebrow': 'お問い合わせ',
            'contact.title': '<span class="grad-text">一緒に</span>つくりましょう',
            'contact.sub': 'フルスタック・AIエンジニアの採用や、開発のご相談はお気軽にどうぞ。英語・日本語どちらでも大丈夫です。通常24時間以内にご返信いたします。',
            'contact.availability': '稼働状況',
            'contact.availabilityVal': '日本国内での正社員採用、およびリモートでの業務委託に対応可能です',
            'contact.location': '所在地',
            'contact.locationVal': '福岡県北九州市（日本時間）',
            'contact.email': 'メール',

            'form.title': 'メッセージを送る',
            'form.name': 'お名前',
            'form.namePh': '山田 太郎',
            'form.email': 'メールアドレス',
            'form.emailPh': 'you@company.co.jp',
            'form.subject': '件名',
            'form.subjectPh': 'ご用件をご記入ください',
            'form.message': 'メッセージ',
            'form.messagePh': '募集ポジションやご依頼内容についてお聞かせください',
            'form.submit': '送信する',
            'form.sending': '送信中…',
            'form.sent': '送信しました',
            'form.success': 'メッセージを送信しました。24時間以内にご返信いたします。',
            'form.error': '送信に失敗しました。お手数ですが、再度お試しいただくか、メールで直接ご連絡ください。',
            'form.errRequired': 'この項目は必須です。',
            'form.errName': '2文字以上で入力してください。',
            'form.errEmail': '正しいメールアドレスを入力してください。',
            'form.errSubject': '3文字以上で入力してください。',
            'form.errMessage': '10文字以上で入力してください。',

            'footer.tagline': '北九州市を拠点に、速く信頼できるプロダクトをつくるフルスタック＆AIエンジニア。',
            'footer.links': 'リンク',
            'footer.connect': 'SNS・連絡先',
            'footer.rights': 'All rights reserved.',
            'hero.metaGrad': '北九州市立大学大学院 修了',
            'skills.globeHint': 'ドラッグで回転',
            'skills.frontendDesc': '高速でレスポンシブなUI',
            'skills.backendDesc': 'API・業務ロジック・認証',
            'skills.data': 'データベース',
            'skills.dataDesc': 'スキーマ設計・クエリ最適化',
            'skills.aiDesc': 'LLM活用・機械学習・分析',
            'skills.devopsDesc': 'デプロイと自動化',
            'skills.cmsDesc': '速くて検索に強いサイト',
            'archive.sub': 'Webアプリ、AIツール、WordPressサイト、ECサイト、JavaScriptのプロジェクトなど。種類ごとに絞り込めます。',
            'archive.ai': 'AI・データ',
            'archive.featured': 'ケーススタディ',
            'certs.msc': '応用情報システム 修士',
            'certs.mscBy': '北九州市立大学大学院・2026年修了',
            'gallery.aria': '日本での生活 フォトスライダー',
            'contact.languages': '対応言語',
            'contact.languagesVal': '英語・日本語',
            'nav.publications': '研究業績',
            'pubs.eyebrow': '研究',
            'pubs.title': '研究業績・<span class="grad-text">学会発表</span>',
            'pubs.sub': '北九州市立大学大学院での研究成果（すべて筆頭著者）。運転シミュレーション、音声音響分析、データ可視化に取り組みました。',
            'pubs.statPapers': '件の筆頭著者論文',
            'pubs.statConf': '件の学会：ICCITX（IEEE）・SICE FES・VTCA',
            'pubs.firstAuthor': '筆頭著者',
            'pubs.status.published': '掲載済み',
            'pubs.presentedOn': '発表日',
            'pubs.toPresent': '発表予定',
            'pubs.read': 'IEEE Xploreで読む',
            'pubs.soon': '論文リンクは近日公開',
            'pubs.soonUpcoming': '学会発表後に公開予定',
            'pubs.status.accepted': '採択済み',
            'pubs.originalTitle': '原題',
            'pubs.statPublished': '件 掲載済み・1件 採択（Springer）'
        }
    };

    var root = document.documentElement;
    var current = root.getAttribute('lang') === 'ja' ? 'ja' : 'en';

    function t(key, lang) {
        var table = dict[lang || current];
        return table && table[key] !== undefined ? table[key] : (dict.en[key] !== undefined ? dict.en[key] : key);
    }

    /* Pick the right language from a { en, ja } object (used by data-driven renders) */
    function pick(obj) {
        if (!obj || typeof obj === 'string') return obj || '';
        return obj[current] || obj.en || '';
    }

    function apply(scope) {
        var el = scope || document;
        el.querySelectorAll('[data-i18n]').forEach(function (node) {
            node.textContent = t(node.getAttribute('data-i18n'));
        });
        el.querySelectorAll('[data-i18n-html]').forEach(function (node) {
            node.innerHTML = t(node.getAttribute('data-i18n-html'));
        });
        el.querySelectorAll('[data-i18n-attr]').forEach(function (node) {
            node.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
                var parts = pair.split(':');
                if (parts.length === 2) node.setAttribute(parts[0].trim(), t(parts[1].trim()));
            });
        });
    }

    function updateMeta() {
        document.title = t('meta.title');
        var desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute('content', t('meta.description'));
        var ogLocale = document.querySelector('meta[property="og:locale"]');
        if (ogLocale) ogLocale.setAttribute('content', current === 'ja' ? 'ja_JP' : 'en_US');
    }

    function updateButtons() {
        document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
            btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang-btn') === current));
        });
    }

    function setLang(lang, save) {
        if (lang !== 'en' && lang !== 'ja') lang = 'en';
        current = lang;
        root.setAttribute('lang', lang);
        apply();
        updateMeta();
        updateButtons();
        if (save) {
            try { localStorage.setItem('preferred-language', lang); } catch (e) { /* storage blocked */ }
        }
        document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
    }

    /* Public API used by other modules */
    window.I18N = {
        t: t,
        pick: pick,
        apply: apply,
        setLang: setLang,
        get lang() { return current; }
    };

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var lang = btn.getAttribute('data-lang-btn');
                if (lang !== current) setLang(lang, true);
            });
        });
        setLang(current, false);
    });
})();
