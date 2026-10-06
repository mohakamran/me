/* ==========================================================================
   Site content data — projects & gallery (bilingual).
   Edit this file to add/remove projects or photos; no HTML changes needed.
   Each translatable field is { en: '...', ja: '...' }.
   Project write-ups are based on each repository's README (github.com/mohakamran).
   ========================================================================== */
window.SITE_DATA = {

    /* ---------- Case studies (Problem → Solution → Stack → Result) ----------
       wide: true   → full-width card;  image2 → second screenshot in the popup  */
    featured: [
        {
            id: 'gymflow',
            category: 'web-app',
            image: 'img/projects/gymflow.webp',
            image2: 'img/projects/gymflow-2.webp',
            wide: true,
            label: { en: 'Multi-tenant SaaS', ja: 'マルチテナントSaaS' },
            title: { en: 'GymFlow — Gym Management SaaS', ja: 'GymFlow（ジム管理SaaS）' },
            summary: {
                en: 'All-in-one gym software where every gym gets its own branded, fully isolated workspace: members, memberships, QR check-in, invoices, classes, trainers and reports.',
                ja: 'ジムごとに専用のブランド付きワークスペースを提供するオールインワンのジム管理ソフト。会員・会員プラン・QRチェックイン・請求書・クラス・トレーナー・レポートまで管理できます。'
            },
            role: { en: 'Sole architect & developer', ja: '設計・開発をすべて担当' },
            problem: {
                en: 'Gyms juggle spreadsheets, paper sign-in sheets and separate billing tools. Software for them has to serve owners, front-desk staff, trainers and members — and keep each gym\'s data completely private.',
                ja: '多くのジムは、スプレッドシートや紙の受付表、別々の請求ツールを使い分けています。オーナー・受付スタッフ・トレーナー・会員それぞれが使え、かつジムごとのデータを完全に分離できるシステムが求められていました。'
            },
            solution: {
                en: 'A Laravel 13 SaaS with self-service gym signup and a 14-day trial. A tenant middleware and model trait scope every query to the current gym, so other gyms\' records return 404. It includes 2-second QR check-in with a kiosk mode, one-step membership sales with automatic invoices, freeze/renew, class booking with capacity limits, PDF invoices, partial payments and refunds, per-gym branding, and role-based access for owners, staff, trainers and members.',
                ja: 'Laravel 13で構築したSaaSで、ジムは自分でサインアップでき14日間の無料トライアルが付きます。テナント用ミドルウェアとモデルのトレイトですべてのクエリを現在のジムに限定し、他のジムのデータは404になります。2秒で完了するQRチェックインとキオスクモード、請求書を自動作成する会員プランの販売、休会・更新、定員管理付きのクラス予約、PDF請求書、分割払い・返金、ジムごとのブランド設定、オーナー・スタッフ・トレーナー・会員の権限管理を実装しました。'
            },
            result: {
                en: 'Production-ready, with 85 passing automated tests. Runs on SQLite, MySQL or PostgreSQL, and the payment layer is ready for Stripe, PayPal or local gateways.',
                ja: '85件の自動テストをすべてパスした本番運用レベルの品質。SQLite・MySQL・PostgreSQLに対応し、決済部分はStripe・PayPal・国内決済にそのまま接続できる設計です。'
            },
            metric: { value: '85', label: { en: 'automated tests passing', ja: '件の自動テストをパス' } },
            stack: ['Laravel 13', 'PHP 8.3', 'Blade', 'Tailwind CSS', 'Alpine.js', 'MySQL / PostgreSQL'],
            links: { github: 'https://github.com/mohakamran/gymflow' }
        },
        {
            id: 'medicore',
            category: 'web-app',
            image: 'img/projects/medicore.webp',
            image2: 'img/projects/medicore-2.webp',
            wide: true,
            label: { en: 'ERP', ja: 'ERP' },
            title: { en: 'MediCore — Pharmacy ERP', ja: 'MediCore（薬局向けERP）' },
            summary: {
                en: 'A complete ERP for pharmacies: batch and expiry inventory, a barcode point of sale, purchasing, invoices, returns, staff permissions, reports and a full audit trail.',
                ja: '薬局・ドラッグストア向けの統合ERP。ロット・使用期限管理、バーコード対応のPOS、仕入れ、請求書、返品、スタッフ権限、レポート、監査ログまで備えています。'
            },
            role: { en: 'Sole architect & developer', ja: '設計・開発をすべて担当' },
            problem: {
                en: 'Pharmacies must track every batch and expiry date, never sell expired medicine, and keep exact records of stock, sales and who changed what — something generic POS tools don\'t handle well.',
                ja: '薬局では、すべてのロットと使用期限を管理し、期限切れの医薬品を絶対に販売せず、在庫・売上・操作履歴を正確に記録する必要があります。一般的なPOSでは対応しきれない要件です。'
            },
            solution: {
                en: 'A Laravel 13 ERP with multiple batches per medicine and first-expiry-first-out selling, so expired stock can never be sold. Every stock change goes into a ledger. It has a keyboard-friendly barcode POS, invoice numbering that stays correct with several cashiers at once, print and PDF invoices, returns that settle balances before refunding, 31 granular permissions, profit & loss and expiry reports, and an audit log with before/after values.',
                ja: 'Laravel 13で構築したERPで、医薬品ごとに複数のロットを管理し、使用期限の早い順に販売（FEFO）するため、期限切れ在庫は販売できません。在庫の変動はすべて台帳に記録されます。キーボード操作に対応したバーコードPOS、複数レジでも重複しない請求書番号、印刷・PDF請求書、未収金を先に精算する返品処理、31種類の細かな権限、損益・期限切れレポート、変更前後の値を残す監査ログを実装しました。'
            },
            result: {
                en: 'Production-ready, with 88 passing automated tests, full audit history and a layout that also works on tablets and phones.',
                ja: '88件の自動テストをすべてパス。完全な監査履歴を備え、タブレットやスマートフォンでも利用できるレイアウトに仕上げました。'
            },
            metric: { value: '88', label: { en: 'automated tests passing', ja: '件の自動テストをパス' } },
            stack: ['Laravel 13', 'PHP 8.3', 'MySQL 8', 'Tailwind CSS', 'Alpine.js', 'Blade'],
            links: { github: 'https://github.com/mohakamran/medicore-pharmacy-erp' }
        },
        {
            id: 'pixelforge',
            category: 'web-app',
            image: 'img/projects/pixelforge.webp',
            label: { en: 'Web app · AI', ja: 'Webアプリ・AI' },
            title: { en: 'PixelForge — Image Toolkit', ja: 'PixelForge（画像編集ツール）' },
            summary: {
                en: 'A fast, privacy-first image toolkit: compress, convert, resize, crop, filter and watermark images in batches — all inside the browser, no login.',
                ja: '画像の圧縮・変換・リサイズ・切り抜き・フィルター・透かしをまとめて行える、プライバシー重視の高速な画像ツール。すべてブラウザ内で完結し、ログインも不要です。'
            },
            role: { en: 'Sole developer', ja: '個人開発（単独）' },
            problem: {
                en: 'Most online image converters upload your photos to their servers, add limits or ask you to sign up — a privacy problem for personal and client images.',
                ja: '多くのオンライン画像変換サービスは、写真をサーバーにアップロードしたり、利用制限や会員登録を求めたりします。個人やクライアントの画像を扱ううえでプライバシー上の問題があります。'
            },
            solution: {
                en: 'A React 19 + TypeScript app that processes everything locally with the Canvas API: a batch drag-and-drop queue, side-by-side before/after comparison, rotate/flip/crop presets, colour filters and watermarking. Results download as a ZIP or a multi-page PDF. An optional AI auto-enhance feature uses Google Gemini through a server-side proxy so the API key stays private.',
                ja: 'React 19とTypeScriptで開発し、Canvas APIですべての処理をブラウザ内で行います。ドラッグ＆ドロップの一括処理キュー、加工前後の比較表示、回転・反転・切り抜きのプリセット、カラーフィルター、透かし挿入に対応し、結果はZIPまたは複数ページのPDFでダウンロードできます。オプションのAI自動補正はGoogle Geminiをサーバー経由で呼び出し、APIキーを公開しない設計です。'
            },
            result: {
                en: 'Live on Vercel. Images never leave the user\'s device, and there are no accounts or tracking.',
                ja: 'Vercelで公開中。画像はユーザーの端末から外に出ることがなく、アカウント登録やトラッキングもありません。'
            },
            stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Canvas API', 'Gemini API'],
            links: { github: 'https://github.com/mohakamran/pixelforge', live: 'https://pixelforge-images.vercel.app/' }
        },
        {
            id: 'learnflow',
            category: 'web-app',
            image: 'img/projects/learnflow.webp',
            label: { en: 'AI · Full stack', ja: 'AI・フルスタック' },
            title: { en: 'LearnFlow AI', ja: 'LearnFlow AI（AI学習プラットフォーム）' },
            summary: {
                en: 'An AI learning platform that turns a goal into a step-by-step roadmap with curated videos and articles, XP levels, streaks and progress tracking.',
                ja: '学びたい目標を伝えるだけで、厳選された動画や記事付きのステップ式ロードマップを作成するAI学習プラットフォーム。XP・レベル・連続学習日数・進捗管理にも対応しています。'
            },
            role: { en: 'Sole developer (API + frontend)', ja: '個人開発（API・フロントエンド）' },
            problem: {
                en: 'Self-learners lose time deciding what to study next and lose motivation without structure or visible progress.',
                ja: '独学では「次に何を学ぶか」を決めるのに時間がかかり、体系的な道筋や進捗が見えないとモチベーションも続きません。'
            },
            solution: {
                en: 'Users describe a goal and experience level, and GPT-4o generates a structured roadmap where each lesson links to real tutorials and documentation. Lessons unlock one after another, with XP, levels, daily streaks, weekly activity charts and notifications. The Laravel 12 REST API uses Sanctum token authentication; the React 19 + TypeScript frontend uses TanStack Query, with light and dark themes.',
                ja: '目標と経験レベルを入力すると、GPT-4oが体系的なロードマップを生成し、各レッスンに実際のチュートリアルや公式ドキュメントへのリンクを付けます。レッスンは順番に解放され、XP・レベル・連続学習日数・週間アクティビティのグラフ・通知でモチベーションを支えます。Laravel 12のREST APIはSanctumのトークン認証を使い、React 19＋TypeScriptのフロントエンドはTanStack Queryで構築し、ライト／ダークテーマにも対応しました。'
            },
            result: {
                en: 'Runs with one command via Docker Compose — MySQL, the Laravel API and the React app served by Nginx.',
                ja: 'Docker Composeのコマンド1つで、MySQL・Laravel API・Nginxで配信するReactアプリが起動します。'
            },
            stack: ['Laravel 12', 'React 19', 'TypeScript', 'MySQL', 'OpenAI GPT-4o', 'Docker'],
            links: { github: 'https://github.com/mohakamran/LearnFlow' }
        },
        {
            id: 'stayease',
            category: 'web-app',
            image: 'img/projects/stayease.webp',
            label: { en: 'Full stack', ja: 'フルスタック' },
            title: { en: 'StayEase — Property Booking Platform', ja: 'StayEase（宿泊予約プラットフォーム）' },
            summary: {
                en: 'An Airbnb-style booking platform with guest and host roles, property listings, search, conflict-free bookings, payments and reviews.',
                ja: 'ゲストとホストの役割、物件掲載、検索、重複のない予約、決済、レビューを備えたAirbnb型の宿泊予約プラットフォームです。'
            },
            role: { en: 'Sole developer', ja: '個人開発（単独）' },
            problem: {
                en: 'A booking platform has to serve two kinds of users and must never let two guests book the same property for overlapping dates.',
                ja: '宿泊予約サービスでは、ゲストとホストという2種類のユーザーに対応し、同じ物件に日程が重なる予約が入らないようにする必要があります。'
            },
            solution: {
                en: 'A Django REST Framework API with JWT authentication and guest/host roles. Hosts list and manage properties with images; guests search, filter, book and review. The booking engine rejects overlapping dates, a simulated payment step confirms the booking, and each role has its own dashboard. The frontend is React with Vite and Tailwind CSS.',
                ja: 'Django REST FrameworkのAPIで、JWT認証とゲスト／ホストの権限管理を実装しました。ホストは画像付きで物件を掲載・管理し、ゲストは検索・絞り込み・予約・レビューができます。予約エンジンは日程の重複を防ぎ、決済シミュレーションで予約を確定し、役割ごとに専用のダッシュボードを用意しました。フロントエンドはReact・Vite・Tailwind CSSです。'
            },
            result: {
                en: 'A Dockerized stack — PostgreSQL, Redis, Celery, Django and React — with a documented REST API.',
                ja: 'PostgreSQL・Redis・Celery・Django・ReactをDockerでまとめて起動でき、REST APIもドキュメント化しています。'
            },
            stack: ['Django REST Framework', 'React', 'PostgreSQL', 'Celery', 'Redis', 'Docker'],
            links: { github: 'https://github.com/mohakamran/stayease' }
        },
        {
            id: 'task-manager',
            category: 'web-app',
            image: 'img/projects/task-manager.webp',
            label: { en: 'MERN', ja: 'MERN' },
            title: { en: 'MERN Task Manager', ja: 'MERNタスク管理アプリ' },
            summary: {
                en: 'A full-stack task manager with secure accounts and a drag-and-drop board that moves tasks between Pending, Working and Completed.',
                ja: '安全なアカウント管理と、タスクを「未着手・作業中・完了」の間でドラッグ＆ドロップで移動できるボードを備えたフルスタックのタスク管理アプリです。'
            },
            role: { en: 'Sole developer', ja: '個人開発（単独）' },
            problem: {
                en: 'Small teams and individuals need a simple, private place to track work — without the complexity of large project-management tools.',
                ja: '小規模チームや個人には、大規模なプロジェクト管理ツールほど複雑ではない、シンプルで安全に作業を管理できる場所が必要です。'
            },
            solution: {
                en: 'An Express 5 + MongoDB API with bcrypt password hashing, JWT authentication and protected routes, and a React 18 frontend with a three-column drag-and-drop board, task editing, confirmation dialogs, toast notifications, a profile page and a collapsible sidebar.',
                ja: 'Express 5とMongoDBのAPIで、bcryptによるパスワードのハッシュ化、JWT認証、保護されたルートを実装しました。React 18のフロントエンドには、3列のドラッグ＆ドロップボード、タスク編集、確認ダイアログ、トースト通知、プロフィール画面、折りたたみ式サイドバーを備えています。'
            },
            result: {
                en: 'Containerized with Docker Compose, with every change saved to MongoDB in real time.',
                ja: 'Docker Composeでコンテナ化し、すべての変更をリアルタイムでMongoDBに保存します。'
            },
            stack: ['MongoDB', 'Express 5', 'React 18', 'Node.js', 'JWT', 'Docker'],
            links: { github: 'https://github.com/mohakamran/task-manager' }
        },
        {
            id: 'bulk-email',
            category: 'web-app',
            image: 'img/projects/bulk-email.webp',
            label: { en: 'Automation', ja: '業務自動化' },
            title: { en: 'Bulk Email Sender', ja: '一括メール送信ツール' },
            summary: {
                en: 'A Laravel tool that sends personalized outreach emails — each with a CV attached — to a whole list of contacts, and tracks the status of every message.',
                ja: '連絡先リスト全員に、CVを添付したパーソナライズされたメールを一括送信し、すべてのメールの送信状況を追跡できるLaravel製ツールです。'
            },
            role: { en: 'Sole developer', ja: '個人開発（単独）' },
            problem: {
                en: 'Reaching out to many professors or companies means writing near-identical emails one by one and keeping track of who has been contacted.',
                ja: '多くの教授や企業に連絡するには、ほぼ同じ内容のメールを1通ずつ作成し、誰に送ったかを自分で管理する必要がありました。'
            },
            solution: {
                en: 'Paste names, email addresses, universities and research fields, attach one PDF CV, and the app sends each person a personalized email. Sends are spaced out to respect mail-server limits, each one is logged as sent, pending or failed, and a searchable dashboard lets you filter by status and resend individual emails. Behind a login, with a queued job for background sending.',
                ja: '名前・メールアドレス・大学・研究分野を貼り付け、PDFのCVを1つ添付するだけで、一人ひとりに合わせたメールを送信します。メールサーバーの制限に合わせて送信間隔を空け、各メールを「送信済み・保留・失敗」として記録します。検索できるダッシュボードでステータス別に絞り込み、個別に再送信することもできます。ログイン保護とバックグラウンド送信用のキュージョブにも対応しています。'
            },
            result: {
                en: 'Replaces one-by-one manual outreach with a single form, with a full record of every email sent.',
                ja: '1通ずつの手作業を1つのフォーム入力に置き換え、送信したすべてのメールを記録として残せるようにしました。'
            },
            stack: ['Laravel 12', 'PHP 8.2', 'MySQL', 'Laravel Queues', 'Bootstrap'],
            links: { github: 'https://github.com/mohakamran/bulk_email_sender' }
        },
        {
            id: 'travelx',
            category: 'web-app',
            image: 'img/projects/travelx.webp',
            label: { en: 'Frontend', ja: 'フロントエンド' },
            title: { en: 'TravelX — Luxury Travel Booking', ja: 'TravelX（高級旅行予約サイト）' },
            summary: {
                en: 'A cinematic luxury-travel booking site with particle effects, destination filters, an interactive map and a guided 4-step booking flow.',
                ja: 'パーティクル演出、目的地の絞り込み、インタラクティブな地図、4ステップの予約フローを備えた、映画のような雰囲気の高級旅行予約サイトです。'
            },
            role: { en: 'Design & development', ja: 'デザイン・開発' },
            problem: {
                en: 'Luxury travel brands need a site that feels premium yet still makes booking quick and easy.',
                ja: '高級旅行ブランドには、高級感のある体験と、迷わずスムーズに予約できる使いやすさの両立が求められます。'
            },
            solution: {
                en: 'A React 18 + TypeScript site with a "Sunset Explorer" design, tsparticles background, Framer Motion transitions and glass-style UI. A 4-step booking flow (destination → dates → services → details) is pre-filled from destination pages, with a date-picker calendar and add-on services. Destinations can be filtered by continent, name and price, and shown on a Leaflet map.',
                ja: 'React 18とTypeScriptで、「サンセット・エクスプローラー」をテーマにしたデザイン、tsparticlesの背景、Framer Motionの画面遷移、ガラス風のUIを実装しました。4ステップの予約フロー（目的地→日程→サービス→詳細）は目的地ページから自動入力され、カレンダーでの日付選択やオプションサービスにも対応しています。目的地は大陸・名前・価格で絞り込め、Leafletの地図で表示できます。'
            },
            result: {
                en: 'Live on Vercel, with a code-split, optimized Vite build.',
                ja: 'Vercelで公開中。Viteによるコード分割と最適化を行っています。'
            },
            stack: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'React Leaflet'],
            links: { github: 'https://github.com/mohakamran/travelx', live: 'https://travelx-gold.vercel.app/' }
        }
    ],

    /* ---------- All projects grid (case studies above are added automatically) ----------
       category: web-app | ai | wordpress | ecommerce | javascript                    */
    archive: [
        /* Web apps */
        { image: 'img/projects/unique-links.webp', category: 'web-app', title: { en: 'Unique Links', ja: 'Unique Links' }, desc: { en: 'PHP-based website for a Pakistani web hosting company, with Linux shared-hosting plans and domain search.', ja: 'PHPで構築した、パキスタンのホスティング会社のWebサイト。Linux共用サーバーのプランとドメイン検索を掲載。' }, tags: ['PHP', 'Hosting'], live: 'https://www.unique-links.com.pk/' },

        /* AI & Data */
        { image: 'img/projects/customer-churn.webp', category: 'ai', title: { en: 'Customer Churn Prediction', ja: '顧客離反（チャーン）予測' }, desc: { en: 'End-to-end machine-learning pipeline that scores telecom customers by churn risk and explains the drivers.', ja: '通信サービスの顧客ごとに解約リスクを算出し、その要因まで可視化する機械学習パイプライン。' }, tags: ['Python', 'Machine Learning'], github: 'https://github.com/mohakamran/customer-churn-predictor' },
        { image: 'img/projects/sentiment.webp', category: 'ai', title: { en: 'Sentiment Analyzer', ja: '感情分析ツール' }, desc: { en: 'NLP tool that classifies the sentiment of reviews and free text with an instant web UI.', ja: 'レビューや自由記述テキストの感情を判定する、シンプルなWebツール。' }, tags: ['NLP', 'JavaScript'], github: 'https://github.com/mohakamran/sentiment-analyzer', live: 'https://sentiment-analyzer-demo.vercel.app/' },

        /* WordPress */
        { image: 'img/projects/expert-estores.webp', category: 'wordpress', title: { en: 'Expert Estores', ja: 'Expert Estores' }, desc: { en: 'WordPress website for an e-commerce services agency.', ja: 'EC支援エージェンシーのWordPressサイト。' }, tags: ['WordPress', 'Agency'], live: 'https://expertestores.com/' },
        { image: 'img/projects/estores-experts.webp', category: 'wordpress', title: { en: 'Estores Experts', ja: 'Estores Experts' }, desc: { en: 'WordPress website for a UK digital marketing agency, with services, portfolio and blog pages.', ja: '英国のデジタルマーケティング会社のWordPressサイト。サービス、実績、ブログのページを掲載。' }, tags: ['WordPress', 'Agency'], live: 'https://www.estoresexperts.com/' },
        { image: 'img/projects/7-digits-hub.webp', category: 'wordpress', title: { en: '7 Digits Hub', ja: '7 Digits Hub' }, desc: { en: 'WordPress website for an e-commerce management agency in Illinois, with a lead-capture form on the home page.', ja: '米国イリノイ州のEC運営代行会社のWordPressサイト。トップページに問い合わせフォームを設置。' }, tags: ['WordPress', 'Lead generation'], live: 'https://7digitshub.com/' },
        { image: 'img/projects/global-travel-wide.webp', category: 'wordpress', title: { en: 'Global Travel Wide', ja: 'Global Travel Wide' }, desc: { en: 'WordPress travel agency site with a flight and hotel enquiry form and featured destinations.', ja: '航空券・ホテルの問い合わせフォームと人気の旅行先を掲載した、旅行代理店のWordPressサイト。' }, tags: ['WordPress', 'Travel'], live: 'https://www.globaltravelwide.com/' },
        { image: 'img/projects/swif-sol.webp', category: 'wordpress', title: { en: 'Swif Sol', ja: 'Swif Sol' }, desc: { en: 'WordPress website for an e-commerce SEO and marketing agency serving Amazon and Shopify sellers.', ja: 'AmazonやShopifyの出店者向けにSEO・マーケティングを提供する会社のWordPressサイト。' }, tags: ['WordPress', 'Marketing'], live: 'https://swifsol.com/' },

        /* E-commerce */
        { image: 'img/projects/vapercore.webp', category: 'ecommerce', title: { en: 'VaperCore', ja: 'VaperCore' }, desc: { en: 'Shopify store selling rechargeable vapes and pods across Spain, in five languages, with 24-hour delivery.', ja: 'スペイン全土に24時間以内で配送する、5か国語対応の電子たばこ・ポッドのShopifyストア。' }, tags: ['Shopify', 'Multilingual'], live: 'https://vapercore.com/' },
        { image: 'img/projects/cpprospain.webp', category: 'ecommerce', title: { en: 'CP Pro Spain', ja: 'CP Pro Spain' }, desc: { en: 'Shopify brand store for prefilled pod vape kits, with product collections and a Spanish/English storefront.', ja: 'プレフィルド型ポッドキットのブランド公式Shopifyストア。商品コレクションと英語・スペイン語に対応。' }, tags: ['Shopify', 'Brand store'], live: 'https://www.cpprospain.com/' },

        /* JavaScript */
        { image: 'img/projects/nexvora.webp', category: 'javascript', title: { en: 'Nexvora Digital', ja: 'Nexvora Digital' }, desc: { en: 'Premium agency website with 22+ static routes, an interactive 3D hero, a 4-step consultation booking flow, light/dark themes and full SEO — Lighthouse ~98 on desktop.', ja: '22以上の静的ページ、インタラクティブな3Dヒーロー、4ステップの相談予約フロー、ライト／ダークテーマ、充実したSEOを備えた高品質なエージェンシーサイト。デスクトップのLighthouseは約98点。' }, tags: ['Next.js 16', 'React Three Fiber'], github: 'https://github.com/mohakamran/nexvora-digital', live: 'https://nds-sols.vercel.app/' },
        { image: 'img/projects/japan-salary.webp', category: 'javascript', title: { en: 'Japan Take-Home Pay Calculator', ja: '日本の手取り給与計算ツール' }, desc: { en: 'Estimates take-home pay, income and resident tax, social insurance and savings with 2026 rates — bilingual EN/日本語, no dependencies.', ja: '2026年の料率で手取り額・所得税・住民税・社会保険料・貯蓄額を試算。英語・日本語対応で、外部ライブラリ不要。' }, tags: ['Vanilla JS', 'EN / 日本語'], github: 'https://github.com/mohakamran/japan-salary-calculator', live: 'https://mohakamran.github.io/japan-salary-calculator/' },
        { image: 'img/projects/omniticket.webp', category: 'javascript', title: { en: 'OmniTicket', ja: 'OmniTicket（チケット管理）' }, desc: { en: 'Role-based ticket management for admins and employees, with real-time updates, priorities, assignment and comments.', ja: '管理者と社員の権限に分かれたチケット管理システム。リアルタイム更新、優先度、担当者割り当て、コメントに対応。' }, tags: ['React', 'Firebase'], github: 'https://github.com/mohakamran/ticket-management' },
        { image: 'img/projects/student-market.webp', category: 'javascript', title: { en: 'Student Market', ja: 'Student Market（留学生向けマーケット）' }, desc: { en: 'Marketplace where foreign students in Japan buy, sell and exchange used everyday items.', ja: '日本に住む留学生が日用品を売買・交換できるマーケットプレイス。' }, tags: ['React', 'Material UI'], github: 'https://github.com/mohakamran/student-market' },
        { image: 'img/projects/expense-iq.webp', category: 'javascript', title: { en: 'Expense IQ', ja: 'Expense IQ（家計管理アプリ）' }, desc: { en: 'MERN finance tracker with real-time sync (Socket.io), budgets, custom categories, multi-currency support and charts.', ja: 'Socket.ioによるリアルタイム同期、予算管理、カスタムカテゴリ、多通貨、グラフに対応したMERNの家計管理アプリ。' }, tags: ['MERN', 'Socket.io'], github: 'https://github.com/mohakamran/Expense-IQ' },
        { image: 'img/projects/linker.webp', category: 'javascript', title: { en: 'Linker', ja: 'Linker（メディア共有）' }, desc: { en: 'MERN platform for photographers to share photo and video collections through private links, with Cloudinary storage.', ja: '写真家が写真・動画コレクションを限定リンクで共有できるMERNプラットフォーム。Cloudinaryで保存。' }, tags: ['MERN', 'Cloudinary'], github: 'https://github.com/mohakamran/Linker' },
        { image: 'img/projects/digizone.webp', category: 'javascript', title: { en: 'Digizone', ja: 'Digizone' }, desc: { en: 'Marketing site for an e-commerce services agency in the UK and Australia, with case studies, blog and careers pages.', ja: '英国・オーストラリアのEC支援エージェンシーのサイト。事例、ブログ、採用ページを掲載。' }, tags: ['Next.js', 'Framer Motion'], github: 'https://github.com/mohakamran/digizoneee', live: 'https://digizoneee.vercel.app/' },
        { image: 'img/projects/transporto.webp', category: 'javascript', title: { en: 'Transporto', ja: 'Transporto（物流サイト）' }, desc: { en: 'Responsive transportation and logistics website with tracking UI, services, pricing and a validated contact form.', ja: '配送追跡UI、サービス紹介、料金プラン、入力チェック付きフォームを備えた物流サイト。' }, tags: ['React', 'Tailwind CSS'], github: 'https://github.com/mohakamran/transporto', live: 'https://transporto-umber.vercel.app/' },
        { image: 'img/projects/westduct.webp', category: 'javascript', title: { en: 'WestDuct Pipes', ja: 'WestDuct Pipes（製造業サイト）' }, desc: { en: 'Fast, SEO-optimized website for a US PVC pipe manufacturer, built with pure HTML, CSS and JavaScript.', ja: '米国の塩ビ管メーカー向けに、HTML・CSS・JavaScriptのみで構築した高速でSEOに強いWebサイト。' }, tags: ['HTML', 'Vanilla JS'], github: 'https://github.com/mohakamran/mfg-web-vanilla', live: 'https://mohakamran.github.io/mfg-web-vanilla/' },
        { image: 'img/projects/reblate-sols.webp', category: 'javascript', title: { en: 'Reblate Solutions', ja: 'Reblate Solutions' }, desc: { en: 'React-based website for a business development agency offering design, web development, SEO and digital marketing.', ja: 'デザイン、Web開発、SEO、デジタルマーケティングを提供する会社の、Reactで構築したWebサイト。' }, tags: ['React', 'Agency'], live: 'https://reblatesols.com/' },
    ],

    /* ---------- Publications (first author on all) ----------
       status: upcoming | presented | published;  date: ISO (presentation date)   */
    publications: [
        {
            status: 'upcoming',
            date: '2026-11-26',
            title: 'Spacing Over Speed: An Exploratory CARLA Study of Collision Risk During a Gradual Weather Transition',
            titleJa: '速度より車間距離：天候の段階的変化における衝突リスクに関するCARLAを用いた探索的研究',
            authors: ['Kamran, M.', 'Hayami, T.'],
            year: 2026,
            venue: { en: '8th International Conference on Smart Vehicular Technology, Transportation, Communication and Applications (VTCA 2026)', ja: '第8回 スマート車両技術・交通・通信・応用に関する国際会議（VTCA 2026）' },
            place: { en: 'University of Miyazaki, Japan', ja: '宮崎大学（日本）' },
            note: { en: 'Proceedings to be published by Springer (Smart Innovation, Systems and Technologies).', ja: '論文集はSpringer（Smart Innovation, Systems and Technologies）より刊行予定。' },
            topic: { en: 'Driving simulation', ja: '運転シミュレーション' }
        },
        {
            status: 'presented',
            date: '2026-08-17',
            title: 'Acoustic Variability of the /ai/ Diphthong: The Impact of Phonetic Context and Articulatory Behavior',
            titleJa: '二重母音/ai/の音響的変動：音声環境と調音動作の影響',
            authors: ['Kamran, M.', 'Kondo, E.', 'Hayami, T.'],
            year: 2026,
            venue: { en: 'SICE Festival with Annual Conference 2026 (SICE FES 2026)', ja: 'SICE Festival with Annual Conference 2026（SICE FES 2026）' },
            place: { en: 'Yokohama, Japan', ja: '横浜（日本）' },
            topic: { en: 'Speech & phonetics', ja: '音声・音響分析' }
        },
        {
            status: 'published',
            date: '2026-08-04',
            title: 'Systematic Visualization of Articulatory Motion and Formant-to-Coordinate Mapping across Classes and Groups',
            titleJa: 'クラス・グループ間における調音運動の体系的可視化とフォルマント‐座標マッピング',
            authors: ['Kamran, M.', 'Kondo, E.', 'Hayami, T.'],
            year: 2026,
            venue: { en: '3rd International Conference on Connected Innovation and Technology (ICCITX 2026), IEEE', ja: '第3回 Connected Innovation and Technology国際会議（ICCITX 2026）、IEEE' },
            place: { en: 'Published in IEEE Xplore', ja: 'IEEE Xploreに掲載' },
            doi: '10.1109/ICCITX70146.2026.11679952',
            link: 'https://ieeexplore.ieee.org/document/11679952',
            topic: { en: 'Speech & data visualization', ja: '音声・データ可視化' }
        }
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
