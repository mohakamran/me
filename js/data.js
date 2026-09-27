/* ==========================================================================
   Site content data — projects & gallery (bilingual).
   Edit this file to add/remove projects or photos; no HTML changes needed.
   Each translatable field is { en: '...', ja: '...' }.
   ========================================================================== */
window.SITE_DATA = {

    /* ---------- Featured projects (case studies) ---------- */
    featured: [
        {
            id: 'crm',
            category: 'web-app',
            image: 'img/projects/crm-reblate.webp',
            wide: true,
            label: { en: 'Company project', ja: '社内プロジェクト' },
            title: { en: 'Company CRM Platform', ja: '社内CRMプラットフォーム' },
            summary: {
                en: 'A Laravel CRM that brought customer data, sales pipelines and employee performance tracking into one system.',
                ja: '顧客データ・営業パイプライン・従業員の業績管理をひとつに統合した、LaravelベースのCRMです。'
            },
            role: { en: 'Full stack engineer · Reblate Solutions', ja: 'フルスタックエンジニア（Reblate Solutions）' },
            problem: {
                en: 'Customer records and employee performance data were spread across separate spreadsheets and tools. Follow-ups were slow and reporting was largely manual.',
                ja: '顧客情報や従業員の業績データが複数のスプレッドシートやツールに分散しており、フォローアップに時間がかかるうえ、レポート作成も手作業に頼っていました。'
            },
            solution: {
                en: 'Designed and built a Laravel web application that centralizes customer data, sales pipelines and performance tracking, with a MySQL data model and a JavaScript front end used daily by the team.',
                ja: 'Laravelで顧客データ・営業パイプライン・業績管理を一元化するWebアプリケーションを設計・開発。MySQLのデータモデルとJavaScriptのフロントエンドを備え、チームが日常業務で利用するシステムとして運用しました。'
            },
            result: {
                en: 'Improved team workflow efficiency by 70%.',
                ja: 'チームの業務効率を70%改善。'
            },
            metric: { value: '70%', label: { en: 'workflow efficiency gain', ja: '業務効率の改善' } },
            stack: ['Laravel', 'PHP', 'JavaScript', 'MySQL'],
            note: { en: 'Private company codebase — not publicly available.', ja: '社内案件のため、ソースコードは非公開です。' },
            links: {}
        },
        {
            id: 'churn',
            category: 'ai',
            image: 'img/projects/customer-churn.webp',
            label: { en: 'AI & ML', ja: 'AI・機械学習' },
            title: { en: 'Customer Churn Prediction', ja: '顧客離反（チャーン）予測' },
            summary: {
                en: 'An end-to-end machine-learning pipeline that scores telecom customers by churn risk and explains the drivers.',
                ja: '通信サービスの顧客ごとに解約リスクを算出し、その要因まで可視化する機械学習パイプラインです。'
            },
            role: { en: 'Sole developer', ja: '個人開発（単独）' },
            problem: {
                en: 'Telecom providers lose revenue when customers leave without warning, and retention teams need to know who is at risk — and why — early enough to act.',
                ja: '通信事業者にとって、予兆なく顧客が解約することは大きな収益損失につながります。リテンション施策を打つためには、誰が・なぜ解約しそうなのかを早期に把握する必要があります。'
            },
            solution: {
                en: 'Built the full pipeline in Python: data cleaning, exploratory analysis, feature engineering and a comparison of classification models, with visualizations that surface the main churn drivers.',
                ja: 'Pythonでデータクレンジング、探索的データ分析、特徴量エンジニアリング、複数の分類モデルの比較までを一貫して実装。解約の主な要因を可視化し、施策の検討に使える形にまとめました。'
            },
            result: {
                en: 'Delivered a complete, reproducible pipeline from raw data to actionable churn-risk insights.',
                ja: '生データから実用的な解約リスクの分析結果までを、再現可能なパイプラインとして完成させました。'
            },
            stack: ['Python', 'pandas', 'Machine Learning', 'Data Visualization'],
            links: { github: 'https://github.com/mohakamran/customer-churn-predictor' }
        },
        {
            id: 'expense',
            category: 'web-app',
            image: 'img/projects/expense-iq.webp',
            label: { en: 'Full stack', ja: 'フルスタック' },
            title: { en: 'Expense IQ', ja: 'Expense IQ（家計管理アプリ）' },
            summary: {
                en: 'A MERN web app for tracking income and expenses with real-time updates and dynamic charts.',
                ja: '収入と支出をリアルタイムに記録・集計し、グラフで可視化するMERNスタックのWebアプリです。'
            },
            role: { en: 'Sole architect & developer', ja: '設計・開発をすべて担当' },
            problem: {
                en: 'Most personal-finance tools are either overly complex or don\'t show clearly where money is going right now.',
                ja: '既存の家計管理ツールの多くは機能が複雑すぎるか、「今お金がどこに使われているか」がひと目で分かりにくいという課題がありました。'
            },
            solution: {
                en: 'A full MERN application — MongoDB, Express REST API and a React front end — with income/expense management and live dashboard charts.',
                ja: 'MongoDB・Express（REST API）・Reactで構成したMERNアプリケーション。収支の登録・管理と、リアルタイムに更新されるダッシュボードのグラフを実装しました。'
            },
            result: {
                en: 'Production-ready and fully responsive from mobile to desktop; designed, built and deployed end-to-end.',
                ja: 'モバイルからデスクトップまで完全レスポンシブ対応。設計から開発、デプロイまで一人で完結させました。'
            },
            stack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
            links: { github: 'https://github.com/mohakamran/Expense-IQ' }
        },
        {
            id: 'saas',
            category: 'web-app',
            image: 'img/projects/saas.webp',
            label: { en: 'SaaS', ja: 'SaaS' },
            title: { en: 'SaaS Analytics Dashboard', ja: 'SaaS分析ダッシュボード' },
            summary: {
                en: 'A responsive analytics dashboard for SaaS metrics built with Next.js, Tailwind CSS and shadcn/ui.',
                ja: 'Next.js・Tailwind CSS・shadcn/uiで構築した、SaaS向けのレスポンシブな分析ダッシュボードです。'
            },
            role: { en: 'Design & development', ja: 'デザイン・開発' },
            problem: {
                en: 'SaaS teams need a fast, readable view of revenue, users and growth — without wrestling with a heavy BI tool.',
                ja: 'SaaSチームには、重いBIツールを使わずに売上・ユーザー数・成長率をすばやく確認できる画面が求められていました。'
            },
            solution: {
                en: 'A component-driven dashboard with reusable chart, KPI and table components and a layout that adapts to any screen.',
                ja: 'グラフ・KPI・テーブルを再利用可能なコンポーネントとして設計し、あらゆる画面サイズに対応するレイアウトを実装しました。'
            },
            result: {
                en: 'Deployed live on Vercel; the component structure is ready to connect to a real data API.',
                ja: 'Vercelで公開中。実データのAPIにそのまま接続できるコンポーネント構成になっています。'
            },
            stack: ['Next.js', 'Tailwind CSS', 'shadcn/ui'],
            links: { github: 'https://github.com/mohakamran/saas-dashboard', live: 'https://saas-dashboard-sand.vercel.app/' }
        },
        {
            id: 'sentiment',
            category: 'ai',
            image: 'img/projects/sentiment.webp',
            label: { en: 'AI & NLP', ja: 'AI・自然言語処理' },
            title: { en: 'Sentiment Analyzer', ja: '感情分析ツール' },
            summary: {
                en: 'An NLP tool that classifies the sentiment of reviews and free text, with a clean, instant web UI.',
                ja: 'レビューや自由記述テキストの感情（ポジティブ／ネガティブ）を判定する、シンプルなWebツールです。'
            },
            role: { en: 'Sole developer', ja: '個人開発（単独）' },
            problem: {
                en: 'Teams collecting customer reviews need a quick way to gauge sentiment without reading every entry by hand.',
                ja: 'カスタマーレビューを集めているチームにとって、すべてを目で読まずに全体の傾向を把握できる手段が必要でした。'
            },
            solution: {
                en: 'A lightweight sentiment classifier behind a simple web interface: paste text, get an instant label and score.',
                ja: 'テキストを貼り付けるだけで、判定結果とスコアを即座に表示する軽量な感情分類ツールを開発しました。'
            },
            result: {
                en: 'Live and publicly usable; built and deployed end-to-end as a focused AI product.',
                ja: '一般公開中。AIを活用した小規模プロダクトとして、開発から公開まで一貫して対応しました。'
            },
            stack: ['JavaScript', 'NLP', 'Vercel'],
            links: { github: 'https://github.com/mohakamran/sentiment-analyzer', live: 'https://sentiment-analyzer-liart.vercel.app/' }
        }
    ],

    /* ---------- Archive (compact cards) ----------
       category: web-app | ai | wordpress | ecommerce | other
       (featured projects are added to the "All projects" grid automatically)                    */
    archive: [
        { image: 'img/projects/pos.webp', category: 'web-app', title: { en: 'Modern POS Application', ja: 'POSレジアプリ' }, desc: { en: 'Point-of-sale front end with React, Vite and Tailwind CSS v4.', ja: 'React・Vite・Tailwind CSS v4で作成したPOSレジのフロントエンド。' }, tags: ['React', 'Tailwind'], github: 'https://github.com/mohakamran/pos-app', live: 'https://pos-app-demo.vercel.app/' },
        { image: 'img/projects/devtool_kit.webp', category: 'web-app', title: { en: 'Code Helper Toolkit', ja: '開発者向けツールキット' }, desc: { en: 'Developer utility suite with an in-browser code editor.', ja: 'ブラウザ上のコードエディタを備えた開発者向けユーティリティ集。' }, tags: ['Next.js', 'Utilities'], github: 'https://github.com/mohakamran/devtool_kit', live: 'https://devtool-kit.vercel.app/' },
        { image: 'img/projects/transporto.webp', category: 'web-app', title: { en: 'Transporto', ja: 'Transporto（物流サイト）' }, desc: { en: 'Logistics and cargo booking website built with React.', ja: 'Reactで構築した物流・貨物輸送の予約サイト。' }, tags: ['React', 'Logistics'], github: 'https://github.com/mohakamran/transporto', live: 'https://transporto-umber.vercel.app/' },
        { image: 'img/projects/data-hive.webp', category: 'web-app', title: { en: 'Data Hive', ja: 'Data Hive' }, desc: { en: 'Conversion-focused landing page for a data services platform.', ja: 'データサービス向けの、成果につながるランディングページ。' }, tags: ['React', 'UI/UX'], live: 'https://data-hive-demo.vercel.app/' },
        { image: 'img/projects/envoice-generator.webp', category: 'web-app', title: { en: 'Invoice Generator', ja: '請求書ジェネレーター' }, desc: { en: 'Client billing and invoice builder in vanilla JavaScript.', ja: 'Vanilla JavaScriptで作成した請求書作成ツール。' }, tags: ['JavaScript', 'Utility'], github: 'https://github.com/mohakamran/invoice-creator', live: 'https://invoice-creator-view.vercel.app/' },
        { image: 'img/projects/longs-cafe.webp', category: 'web-app', title: { en: 'Longs Cafe', ja: 'Longs Cafe' }, desc: { en: 'Café website built with Next.js and Tailwind CSS.', ja: 'Next.jsとTailwind CSSで制作したカフェのWebサイト。' }, tags: ['Next.js', 'Tailwind'], github: 'https://github.com/mohakamran/longs-cafe', live: 'https://longscafe.vercel.app/' },
        { image: 'img/projects/ai-tools.webp', category: 'web-app', title: { en: 'AI Tools SaaS', ja: 'AIツールSaaSサイト' }, desc: { en: 'SaaS landing site presenting AI product features and pricing.', ja: 'AIプロダクトの機能と料金プランを紹介するSaaSサイト。' }, tags: ['Next.js', 'SaaS'], github: 'https://github.com/mohakamran/ai-tools', live: 'https://ai-tools-dun.vercel.app/' },
        { image: 'img/projects/digizone.webp', category: 'ecommerce', title: { en: 'Digizone', ja: 'Digizone' }, desc: { en: 'Digital products storefront with Next.js and Framer Motion.', ja: 'Next.jsとFramer Motionで構築したデジタル商品のECサイト。' }, tags: ['Next.js', 'E-commerce'], github: 'https://github.com/mohakamran/digizoneee', live: 'https://digizoneee.vercel.app/' },
        { image: 'img/projects/zoo-bounty.webp', category: 'ecommerce', title: { en: 'Zoo Bounty', ja: 'Zoo Bounty' }, desc: { en: 'Pet products WooCommerce store tuned for fast search.', ja: '商品検索を高速化したペット用品のWooCommerceストア。' }, tags: ['WooCommerce', 'WordPress'], live: 'https://zoobounty.com/' },
        { image: 'img/projects/expert-estores.webp', category: 'ecommerce', title: { en: 'Expert Estores', ja: 'Expert Estores' }, desc: { en: 'E-commerce services site with polished product presentation.', ja: '商品を魅力的に見せるEC支援サービスのサイト。' }, tags: ['WordPress', 'E-commerce'], live: 'https://expertestores.com/' },
        { image: 'img/projects/estores-experts.webp', category: 'wordpress', title: { en: 'Estores Experts', ja: 'Estores Experts' }, desc: { en: 'Corporate services platform with a custom WordPress theme.', ja: 'カスタムテーマで構築した企業向けサービスサイト。' }, tags: ['WordPress', 'Corporate'], live: 'https://www.estoresexperts.com' },
        { image: 'img/projects/7-digits-hub.webp', category: 'wordpress', title: { en: '7 Digits Hub', ja: '7 Digits Hub' }, desc: { en: 'Business consulting website with an SEO-first structure.', ja: 'SEOを重視した構成のビジネスコンサルティングサイト。' }, tags: ['WordPress', 'SEO'], live: 'https://7digitshub.com/' },
        { image: 'img/projects/unique-links.webp', category: 'wordpress', title: { en: 'Unique Links', ja: 'Unique Links' }, desc: { en: 'Web hosting landing pages with modular pricing.', ja: '料金プランを分かりやすく整理したホスティングサービスのサイト。' }, tags: ['WordPress', 'Hosting'], live: 'https://uniquelinks.com/' },
        { image: 'img/projects/global-travel-wide.webp', category: 'wordpress', title: { en: 'Global Travel Wide', ja: 'Global Travel Wide' }, desc: { en: 'Travel agency portal with a catalogue of destinations.', ja: '旅行先カタログを備えた旅行代理店のポータルサイト。' }, tags: ['WordPress', 'Travel'], live: 'https://globaltravelwide.com/' },
        { image: 'img/projects/swif-sol.webp', category: 'wordpress', title: { en: 'Swif Sol', ja: 'Swif Sol' }, desc: { en: 'Marketing agency site with lead-capture forms.', ja: '問い合わせ獲得フォームを備えたマーケティング会社のサイト。' }, tags: ['WordPress', 'Marketing'], live: 'https://swifsol.com/' },
        { image: 'img/projects/reblate-sols.webp', category: 'wordpress', title: { en: 'Reblate Solutions', ja: 'Reblate Solutions' }, desc: { en: 'Company website for an IT outsourcing business.', ja: 'ITアウトソーシング企業のコーポレートサイト。' }, tags: ['WordPress', 'Business'], live: 'https://reblatesols.com/' },
        { image: 'img/projects/travelx.webp', category: 'other', title: { en: 'Travelx', ja: 'Travelx' }, desc: { en: 'Tourism showcase built with Next.js and Three.js.', ja: 'Next.jsとThree.jsで表現した観光プロモーションサイト。' }, tags: ['Three.js', 'Next.js'], github: 'https://github.com/mohakamran/travelx', live: 'https://travelx-gold.vercel.app/' },
        { image: 'img/projects/bakery.webp', category: 'other', title: { en: 'Bakery Website', ja: 'ベーカリーサイト' }, desc: { en: 'Product ordering showcase in plain HTML, CSS and JS.', ja: 'HTML・CSS・JavaScriptのみで作成した商品紹介・注文サイト。' }, tags: ['HTML', 'CSS'], github: 'https://github.com/mohakamran/bakery', live: 'https://bakery-demo-web.vercel.app' },
        { image: 'img/projects/firex.webp', category: 'other', title: { en: 'Firex (Unity game)', ja: 'Firex（Unityゲーム）' }, desc: { en: 'First-person survival game in Unity and C#.', ja: 'UnityとC#で開発した一人称視点のサバイバルゲーム。' }, tags: ['Unity', 'C#'], linkedin: 'https://www.linkedin.com/posts/mokamran_finalyearproject-indiegame-gamedevlife-activity-7143562652156420096-nOJh' }
    ],

    /* ---------- Life in Japan gallery ----------
       w/h = full-size pixel dimensions (prevents layout shift)             */
    gallery: [
        { id: 10, w: 803, h: 810, caption: { en: 'Seaside torii gate, Fukuoka', ja: '海辺の鳥居（福岡）' } },
        { id: 11, w: 1108, h: 1477, caption: { en: 'Shrine visit with friends', ja: '友人たちと神社めぐり' } },
        { id: 7, w: 1108, h: 1477, caption: { en: 'Autumn flower fields', ja: '秋の花畑' } },
        { id: 21, w: 1600, h: 1200, caption: { en: 'City lights at night', ja: '夜の街並み' } },
        { id: 18, w: 960, h: 1280, caption: { en: 'Blue skies on the coast', ja: '青空の海岸' } },
        { id: 24, w: 1536, h: 2048, caption: { en: 'First snow of winter', ja: '冬の初雪' } },
        { id: 8, w: 1477, h: 1108, caption: { en: 'Dinner with friends', ja: '友人たちとの食事会' } },
        { id: 26, w: 1536, h: 2048, caption: { en: 'Cherry blossom season', ja: '桜の季節' } },
        { id: 19, w: 1156, h: 867, caption: { en: 'Cycling along the coast', ja: '海沿いをサイクリング' } },
        { id: 14, w: 1536, h: 2048, caption: { en: 'At a space museum', ja: '宇宙博物館にて' } },
        { id: 23, w: 1440, h: 1440, caption: { en: 'Stadium night with international friends', ja: '各国の友人たちとスタジアム観戦' } },
        { id: 22, w: 1600, h: 1200, caption: { en: 'Castle moat walk', ja: 'お城のお堀を散策' } },
        { id: 6, w: 1108, h: 1477, caption: { en: 'Breakwater by the sea', ja: '海辺の防波堤' } },
        { id: 4, w: 1600, h: 900, caption: { en: 'Presenting research at the university', ja: '大学での研究発表' } }
    ]
};
