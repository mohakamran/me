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
            id: 'scholaria',
            isNew: true,
            highlights: [
                { en: 'Runs 100% offline on an 8 GB M1 MacBook: no cloud AI, no API keys, no telemetry', ja: '8GBのM1 MacBookで完全オフライン動作。クラウドAI・APIキー・テレメトリ一切なし' },
                { en: 'Citations and page numbers come from the database, never from the model', ja: '引用元とページ番号はモデルではなくデータベースから取得' },
                { en: 'Statistics computed by pandas, SciPy and statsmodels; the LLM only explains them', ja: '統計はpandas・SciPy・statsmodelsで計算し、LLMは結果の説明のみを担当' }
            ],
            category: 'ai',
            image: 'img/projects/scholaria.webp',
            image2: 'img/projects/scholaria-2.webp',
            wide: true,
            label: { en: 'Local LLM · RAG', ja: 'ローカルLLM・RAG' },
            title: { en: 'Scholaria — Private AI Research Assistant', ja: 'Scholaria（プライベートAI研究アシスタント）' },
            summary: {
                en: 'A full-stack research workspace that runs entirely on your own computer: chat with your papers with page-cited answers, analyse datasets and draft academic writing with a local LLM.',
                ja: '自分のPC上だけで動く研究用ワークスペース。ローカルLLMで論文にページ付きの引用で質問し、データ分析や学術文章の作成まで行えます。'
            },
            role: { en: 'AI engineer & full-stack developer', ja: 'AIエンジニア・フルスタック開発' },
            problem: {
                en: 'Students and researchers want AI help with papers and data, but uploading unpublished research to cloud chatbots is a privacy risk — and small models confidently invent citations, page numbers and statistics.',
                ja: '学生や研究者は論文やデータの分析にAIを使いたい一方、未発表の研究をクラウドのチャットボットに送るのはプライバシー上のリスクです。さらに小型モデルは引用・ページ番号・統計値をもっともらしく捏造しがちです。'
            },
            solution: {
                en: 'A local stack — Ollama (Qwen3 4B, quantized), FastAPI, SQLite FTS5 and Streamlit. Uploaded PDFs are chunked with real page numbers and retrieved for grounded answers cited as [S1]…[Sn]; invented labels and invalid page references are stripped in code. If nothing relevant is retrieved, the model is not called. Data analysis (correlations, OLS regression with VIF, Durbin-Watson and Breusch-Pagan diagnostics) runs in predefined Python functions, and documents are treated as untrusted input to block prompt injection. It adds 15 guided academic-writing workflows, projects with BibTeX export, and multi-user accounts with scrypt-hashed passwords.',
                ja: 'Ollama（量子化したQwen3 4B）、FastAPI、SQLite FTS5、Streamlitによる完全ローカル構成。アップロードしたPDFは実際のページ番号付きでチャンク化・検索され、回答は[S1]…[Sn]形式で引用されます。モデルが作った架空の引用や存在しないページ参照はコード側で除去し、関連する箇所が見つからない場合はモデルを呼び出しません。相関分析やVIF・Durbin-Watson・Breusch-Pagan診断付きのOLS回帰は定義済みのPython関数で実行し、文書は信頼できない入力として扱ってプロンプトインジェクションを防ぎます。15種類の学術文章ワークフロー、BibTeX出力付きのプロジェクト管理、scryptでハッシュ化したパスワードによる複数アカウントにも対応しています。'
            },
            result: {
                en: 'A trustworthy research assistant that never sends data off the machine, with 64 passing automated tests. Tuned for and tested on an Apple M1 with 8 GB of memory.',
                ja: 'データを端末の外に一切送らない、信頼できる研究アシスタントが完成。64件の自動テストをパスし、メモリ8GBのApple M1で動作検証済みです。'
            },
            metric: { value: '0', label: { en: 'bytes sent to the cloud', ja: 'バイト：クラウドへの送信量' } },
            stack: ['Python 3.11', 'Ollama', 'FastAPI', 'Streamlit', 'SQLite FTS5', 'statsmodels'],
            links: { github: 'https://github.com/mohakamran/scholaria' }
        },
        {
            id: 'personal-doctor-ai',
            isNew: true,
            highlights: [
                { en: 'Safety layer detects urgent symptoms before any AI call — even without an API key', ja: 'AIを呼び出す前に緊急症状を検知する安全レイヤー（APIキーなしでも動作）' },
                { en: 'Lab-report PDFs explained in plain language, only with explicit consent', ja: '検査結果PDFを、本人の同意がある場合のみ平易な言葉で解説' },
                { en: 'Argon2 passwords, CSRF protection and API keys encrypted at rest', ja: 'Argon2によるパスワード保護、CSRF対策、APIキーの暗号化保存' }
            ],
            category: 'ai',
            image: 'img/projects/personal-doctor-ai.webp',
            image2: 'img/projects/personal-doctor-ai-2.webp',
            wide: true,
            label: { en: 'AI health companion', ja: 'AIヘルスケア' },
            title: { en: 'Personal Doctor AI — Health Companion', ja: 'Personal Doctor AI（AIヘルスケア）' },
            summary: {
                en: 'A private, local-first health workspace with a streaming AI Doctor chat, health dashboard, symptom journal, measurements, medications and plain-language lab-report explanations.',
                ja: 'ストリーミング対応のAIドクターチャット、健康ダッシュボード、症状日記、測定値、服薬管理、検査結果のわかりやすい解説を備えた、ローカルファーストの健康管理アプリ。'
            },
            role: { en: 'Sole designer & full-stack AI engineer', ja: '設計・フルスタックAI開発をすべて担当' },
            problem: {
                en: 'Health information is scattered across apps, paper reports and memory, and general chatbots know nothing about your history. Health data is also some of the most sensitive data there is, and an AI must never miss an emergency or pretend to diagnose.',
                ja: '健康に関する情報はアプリ・紙の検査結果・記憶にバラバラに存在し、一般的なチャットボットは個人の病歴を知りません。また健康データは最も機微な個人情報の一つであり、AIが緊急事態を見逃したり診断を装ったりすることは許されません。'
            },
            solution: {
                en: 'A React 19 + TypeScript front end and a FastAPI back end over a local SQLite database. The AI Doctor streams answers over Server-Sent Events and, per conversation, can use only the relevant parts of your record — showing which data categories were used. A rule-based safety service screens messages for cardiac, stroke, breathing, anaphylaxis and self-harm warning signs before any model call and shows country-specific emergency numbers. Versioned system instructions forbid diagnosis, prescribing and invented values. Analytics chart blood pressure, weight, BMI, heart rate, sleep and glucose with CSV export, and macOS gets one-click setup and launch.',
                ja: 'React 19＋TypeScriptのフロントエンドと、ローカルSQLiteを使うFastAPIバックエンドで構成。AIドクターはServer-Sent Eventsでストリーミング回答し、会話ごとに健康記録の関連部分だけを参照して、使用したデータの種類も表示します。ルールベースの安全サービスが、モデルを呼ぶ前に心臓・脳卒中・呼吸・アナフィラキシー・自傷の兆候を判定し、国別の緊急番号を案内します。バージョン管理されたシステム指示で診断・処方・数値の捏造を禁止。血圧・体重・BMI・心拍・睡眠・血糖のグラフとCSV出力に対応し、macOSではワンクリックでセットアップ・起動できます。'
            },
            result: {
                en: 'A calm, professional health workspace where data stays on your Mac, backed by 69 passing automated tests and a clear "not a doctor" safety design.',
                ja: 'データがMac内にとどまる、落ち着いたプロフェッショナルな健康管理環境が完成。69件の自動テストをパスし、「医師ではない」ことを明確にした安全設計です。'
            },
            metric: { value: '69', label: { en: 'automated tests passing', ja: '件の自動テストをパス' } },
            stack: ['React 19', 'TypeScript', 'FastAPI', 'OpenAI Responses API', 'SQLite', 'Tailwind CSS 4'],
            links: { github: 'https://github.com/mohakamran/personal-doctor-ai' }
        },
        {
            id: 'japanese-ai-tutor',
            isNew: true,
            highlights: [
                { en: 'Every model response validated against a Pydantic schema before it is shown', ja: 'すべてのモデル出力をPydanticスキーマで検証してから表示' },
                { en: 'Quiz scoring and answer keys handled by code, so hallucinations cannot cheat', ja: 'クイズの採点と解答はコード側で管理し、ハルシネーションの影響を排除' },
                { en: '208 automated tests with a mocked AI layer — tested without spending on tokens', ja: 'AIレイヤーをモック化した208件の自動テスト（トークン費用ゼロで検証）' }
            ],
            category: 'ai',
            image: 'img/projects/japanese-ai-tutor.webp',
            image2: 'img/projects/japanese-ai-tutor-2.webp',
            label: { en: 'EdTech · Structured outputs', ja: 'EdTech・構造化出力' },
            title: { en: 'Japanese AI Tutor', ja: 'Japanese AI Tutor（AI日本語教師）' },
            summary: {
                en: 'An AI Japanese teacher for English speakers: vocabulary builder with flashcards, grammar explanations, seven quiz types, writing correction, role-play conversation and progress tracking.',
                ja: '英語話者向けのAI日本語教師。フラッシュカード付きの単語学習、文法解説、7種類のクイズ、作文添削、ロールプレイ会話、学習進捗の管理ができます。'
            },
            role: { en: 'AI engineer & developer', ja: 'AIエンジニア・開発' },
            problem: {
                en: 'Learners of Japanese need explanations of why, not just answers — but raw chatbot output is inconsistent, can\'t be scored reliably, and is easy to manipulate.',
                ja: '日本語学習者には答えだけでなく「なぜそうなるのか」の説明が必要です。しかしチャットボットの生の出力は一貫性がなく、確実な採点ができず、操作もされやすいという課題がありました。'
            },
            solution: {
                en: 'A multi-user Streamlit app on the OpenAI Responses API with structured outputs: every lesson, quiz and correction is a Pydantic schema, and nothing is saved until it validates. Deterministic logic — scoring, hidden answer keys, de-duplication and streaks — lives in plain Python. AI strings are HTML-escaped, inputs are wrapped in prompt-injection delimiters, SQL is parameterized, and accounts use scrypt hashing, login lockout and encrypted API keys.',
                ja: 'OpenAI Responses APIの構造化出力を使った複数ユーザー対応のStreamlitアプリ。レッスン・クイズ・添削はすべてPydanticスキーマで定義し、検証に通るまで保存しません。採点、解答の非表示、重複排除、連続学習日数などの確定的な処理は通常のPythonで実装。AIの文字列はHTMLエスケープし、入力はプロンプトインジェクション対策の区切りで囲み、SQLはパラメータ化。アカウントはscryptハッシュ、ログイン試行制限、APIキーの暗号化で保護しています。'
            },
            result: {
                en: 'A reliable AI-engineering showcase with 208 passing tests, including headless UI tests of sign-up, login, quizzes and settings.',
                ja: '新規登録・ログイン・クイズ・設定のヘッドレスUIテストを含む208件のテストをパスした、信頼性の高いAIエンジニアリング作品です。'
            },
            metric: { value: '208', label: { en: 'automated tests passing', ja: '件の自動テストをパス' } },
            stack: ['Python', 'Streamlit', 'OpenAI Responses API', 'Pydantic v2', 'SQLite', 'Plotly'],
            links: { github: 'https://github.com/mohakamran/japanese-ai-tutor' }
        },
        {
            id: 'jobai-japan',
            isNew: true,
            highlights: [
                { en: 'English CV turned into a Japanese 履歴書 and 職務経歴書 with Gemini', ja: '英文レジュメからGeminiで履歴書と職務経歴書を自動生成' },
                { en: 'AI match scores for roles in the Japanese job market', ja: '日本の求人ごとにAIで適合度スコアを算出' },
                { en: 'Kanban-style application tracker from "Applied" to "Offer"', ja: '「応募」から「内定」まで管理できるカンバン式の応募トラッカー' }
            ],
            category: 'ai',
            image: 'img/projects/jobai-japan.webp',
            label: { en: 'Generative AI · Careers', ja: '生成AI・就職支援' },
            title: { en: 'JobAI Japan — Career Accelerator', ja: 'JobAI Japan（就職支援AI）' },
            summary: {
                en: 'A job-hunting platform for international professionals in Japan: AI-generated Japanese résumés, a job explorer with match scores, an application tracker and JLPT progress.',
                ja: '日本で働きたい外国人プロフェッショナル向けの就職活動プラットフォーム。AIによる日本語の履歴書作成、適合度スコア付きの求人検索、応募管理、JLPTの進捗管理ができます。'
            },
            role: { en: 'Full-stack & AI developer', ja: 'フルスタック・AI開発' },
            problem: {
                en: 'Foreign job seekers in Japan must produce a rirekisho and shokumu keirekisho in formal Japanese, then juggle dozens of applications across sites — a real barrier I experienced myself.',
                ja: '日本で就職を目指す外国人は、正式な日本語で履歴書と職務経歴書を作成し、多くのサイトにまたがる応募を管理しなければなりません。私自身も経験した大きな壁です。'
            },
            solution: {
                en: 'A React 18 + TypeScript app on Firebase Auth and Firestore. Google Gemini generates structured Japanese résumé documents from a master English CV, which users can then refine by hand. A job explorer shows AI compatibility scores and syncs one-click applications into a tracker with notes, salary details and status history.',
                ja: 'Firebase AuthとFirestoreを使ったReact 18＋TypeScriptアプリ。マスターの英文レジュメからGoogle Geminiが構造化された日本語の応募書類を生成し、ユーザーが手で微調整できます。求人検索ではAIによる適合度を表示し、ワンクリックで応募をトラッカーに登録。メモ、給与条件、ステータス履歴も管理できます。'
            },
            result: {
                en: 'One workspace for the whole Japan job hunt — from bilingual documents to the offer stage.',
                ja: 'バイリンガルの応募書類作成から内定まで、日本での就職活動をひとつのワークスペースで完結できます。'
            },
            stack: ['React 18', 'TypeScript', 'Google Gemini', 'Firebase', 'Tailwind CSS', 'Framer Motion'],
            links: { github: 'https://github.com/mohakamran/jobai-japan' }
        },
        {
            id: 'gymflow',
            highlights: [
                { en: 'Self-service signup with a fully isolated, branded workspace for every gym', ja: 'ジムごとに完全に分離された、ブランド付きワークスペースをセルフ登録で提供' },
                { en: '2-second QR check-in, plus a self check-in kiosk for the front desk', ja: '2秒で完了するQRチェックインと、受付用のセルフチェックイン端末モード' },
                { en: 'Invoices with partial payments, refunds, PDF export and email', ja: '分割払い・返金・PDF出力・メール送信に対応した請求書機能' }
            ],
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
            highlights: [
                { en: 'First-expiry-first-out selling, so expired stock can never be sold', ja: '使用期限の早い順に販売（FEFO）し、期限切れ在庫は販売不可' },
                { en: 'Barcode POS with invoice numbers that stay correct with several cashiers', ja: '複数レジでも番号が重複しないバーコード対応POS' },
                { en: '31 granular permissions and a full before/after audit log', ja: '31種類の細かな権限と、変更前後を記録する監査ログ' }
            ],
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
            highlights: [
                { en: '100% in-browser processing: images never leave the device', ja: '処理はすべてブラウザ内で完結し、画像が端末の外に出ない' },
                { en: 'Batch queue with ZIP and multi-page PDF export', ja: '一括処理キューと、ZIP・複数ページPDFでの書き出し' },
                { en: 'Optional Gemini auto-enhance through a secure server proxy', ja: 'サーバー経由で安全に呼び出す、Geminiによる自動補正（任意）' }
            ],
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
            highlights: [
                { en: 'GPT-4o turns a learning goal into a step-by-step roadmap', ja: 'GPT-4oが学習目標をステップ式のロードマップに変換' },
                { en: 'Lessons unlock in order, with XP, levels and daily streaks', ja: 'レッスンは順番に解放され、XP・レベル・連続学習日数で継続を支援' },
                { en: 'One-command Docker setup: MySQL, Laravel API, React + Nginx', ja: 'Dockerのコマンド1つでMySQL・Laravel API・React＋Nginxが起動' }
            ],
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
            highlights: [
                { en: 'JWT authentication with separate guest and host roles', ja: 'ゲストとホストの権限を分けたJWT認証' },
                { en: 'Booking engine that rejects overlapping dates', ja: '日程の重複を防ぐ予約エンジン' },
                { en: 'Dockerized PostgreSQL, Redis, Celery, Django and React', ja: 'PostgreSQL・Redis・Celery・Django・ReactをDockerで構成' }
            ],
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
            highlights: [
                { en: 'Drag-and-drop board across Pending, Working and Completed', ja: '「未着手・作業中・完了」をドラッグ＆ドロップで移動できるボード' },
                { en: 'bcrypt hashing, JWT authentication and protected routes', ja: 'bcryptによるハッシュ化、JWT認証、保護されたルート' },
                { en: 'Containerized with Docker Compose', ja: 'Docker Composeでコンテナ化' }
            ],
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
            highlights: [
                { en: 'A personalized email for each recipient, with a CV attached', ja: '受信者ごとにパーソナライズし、CVを添付したメールを送信' },
                { en: 'Spaced-out sending, with each email tracked as sent, pending or failed', ja: '送信間隔を空け、各メールを「送信済み・保留・失敗」で記録' },
                { en: 'Searchable dashboard with one-click resend', ja: '検索できるダッシュボードと、ワンクリック再送信' }
            ],
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
            highlights: [
                { en: 'Guided 4-step booking, pre-filled from destination pages', ja: '目的地ページから自動入力される4ステップの予約フロー' },
                { en: 'Particle effects, Framer Motion transitions and glass UI', ja: 'パーティクル演出、Framer Motionの画面遷移、ガラス風UI' },
                { en: 'Destination filters and an interactive Leaflet map', ja: '目的地の絞り込みと、インタラクティブなLeaflet地図' }
            ],
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
        { image: 'img/projects/pinspire.webp', category: 'web-app', isNew: true, title: { en: 'Pinspire', ja: 'Pinspire（ビジュアル発見アプリ）' }, desc: { en: 'Full-stack visual discovery app with a masonry feed, boards and pin details — Next.js 16 front end on a Laravel 13 REST API.', ja: 'メイソンリー型フィード、ボード、ピン詳細を備えたビジュアル発見アプリ。Next.js 16のフロントエンドとLaravel 13のREST API。' }, tags: ['Next.js 16', 'Laravel 13'], github: 'https://github.com/mohakamran/pinspire' },
        { image: 'img/projects/unique-links.webp', category: 'web-app', title: { en: 'Unique Links', ja: 'Unique Links' }, desc: { en: 'PHP-based website for a Pakistani web hosting company, with Linux shared-hosting plans and domain search.', ja: 'PHPで構築した、パキスタンのホスティング会社のWebサイト。Linux共用サーバーのプランとドメイン検索を掲載。' }, tags: ['PHP', 'Hosting'], live: 'https://www.unique-links.com.pk/' },

        /* AI & Data */
        { image: 'img/projects/ai-engineering-academy.webp', category: 'ai', isNew: true, title: { en: 'AI Engineering Academy', ja: 'AI Engineering Academy' }, desc: { en: 'Day-by-day roadmap from zero to job-ready AI engineer: 294 lessons, 12 portfolio projects, 143 vetted resources, streaks and a learning journal.', ja: 'ゼロから実務レベルのAIエンジニアを目指す日別ロードマップ。294のレッスン、12のポートフォリオ課題、厳選した143の教材、連続学習記録と学習日誌。' }, tags: ['RAG & Agents', 'Vanilla JS'], github: 'https://github.com/mohakamran/ai-engineering-academy', live: 'https://mohakamran.github.io/ai-engineering-academy/' },
        { image: 'img/projects/cvinsight.webp', category: 'ai', title: { en: 'CVInsight — AI Resume Analyzer', ja: 'CVInsight（AI履歴書分析）' }, desc: { en: 'Scores résumés section by section, flags missing ATS keywords, matches them against a job description and exports a PDF report.', ja: '履歴書をセクションごとに採点し、ATSで不足しているキーワードを指摘。求人票との照合やPDFレポートの出力にも対応。' }, tags: ['Gemini', 'React'], github: 'https://github.com/mohakamran/cvinsight-ai-resume-analyzer', live: 'https://cvinsight-ai-resume-analyzer.vercel.app/' },
        { image: 'img/projects/acehire.webp', category: 'ai', title: { en: 'AceHire — AI Interviewer', ja: 'AceHire（AI面接官）' }, desc: { en: 'Simulates role-specific job interviews with adaptive difficulty and realistic follow-ups, then writes an honest hiring report.', ja: '職種別の模擬面接を、難易度の自動調整とリアルな深掘り質問で再現し、率直な採用評価レポートを作成。' }, tags: ['Gemini', 'TypeScript'], github: 'https://github.com/mohakamran/acehire' },
        { image: 'img/projects/sakura-learn.webp', category: 'ai', title: { en: 'Sakura Learn', ja: 'Sakura Learn（日本語学習）' }, desc: { en: 'Interactive Hiragana, Katakana and beginner vocabulary lessons with quizzes, pronunciation and saved progress.', ja: 'ひらがな・カタカナ・初級語彙をクイズや発音機能で学べる、進捗保存つきの学習アプリ。' }, tags: ['React', 'Gemini'], github: 'https://github.com/mohakamran/sakura-learn' },
        { image: 'img/projects/customer-churn.webp', category: 'ai', title: { en: 'Customer Churn Prediction', ja: '顧客離反（チャーン）予測' }, desc: { en: 'End-to-end machine-learning pipeline that scores telecom customers by churn risk and explains the drivers.', ja: '通信サービスの顧客ごとに解約リスクを算出し、その要因まで可視化する機械学習パイプライン。' }, tags: ['Python', 'Machine Learning'], github: 'https://github.com/mohakamran/customer-churn-predictor' },
        { image: 'img/projects/sentiment.webp', category: 'ai', title: { en: 'Sentiment Analyzer', ja: '感情分析ツール' }, desc: { en: 'NLP tool that classifies the sentiment of reviews and free text with an instant web UI.', ja: 'レビューや自由記述テキストの感情を判定する、シンプルなWebツール。' }, tags: ['NLP', 'JavaScript'], github: 'https://github.com/mohakamran/sentiment-analyzer', live: 'https://sentiment-analyzer-demo.vercel.app/' },

        /* WordPress */
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
       status: accepted | published;  date (dateEnd optional): ISO presentation date;
       links: [{ href, label: i18n key, icon }] — the first one is the main button   */
    publications: [
        {
            status: 'accepted',
            date: '2026-11-25',
            title: 'Spacing Over Speed: An Exploratory CARLA Study of Collision Risk During a Gradual Weather Transition',
            titleJa: '速度より車間距離：天候の段階的変化における衝突リスクに関するCARLAを用いた探索的研究',
            authors: ['Kamran, M.', 'Hayami, T.'],
            year: 2026,
            venue: { en: '8th International Conference on Smart Vehicular Technology, Transportation, Communication and Applications (VTCA 2026)', ja: '第8回 スマート車両技術・交通・通信・応用に関する国際会議（VTCA 2026）' },
            place: { en: 'University of Miyazaki, Miyazaki, Japan', ja: '宮崎大学（宮崎県宮崎市）' },
            desc: {
                en: 'An exploratory study using the CARLA driving simulator to investigate collision risk during gradual weather transitions, examining the relationship between vehicle spacing, driving speed and road safety under changing environmental conditions.',
                ja: 'CARLA運転シミュレーターを用いて、天候が徐々に変化する状況での衝突リスクを調べた探索的研究。変化する環境条件の下で、車間距離・走行速度と道路の安全性の関係を検証しました。'
            },
            note: { en: 'Proceedings to be published by Springer (Smart Innovation, Systems and Technologies).', ja: '論文集はSpringer（Smart Innovation, Systems and Technologies）より刊行予定。' },
            links: [
                { href: 'https://vtca2026.com/', label: 'pubs.linkSite', icon: 'fa-globe' },
                { href: 'https://vtca2026.com/program', label: 'pubs.linkProgram', icon: 'fa-list-ul' }
            ],
            topic: { en: 'Driving simulation', ja: '運転シミュレーション' }
        },
        {
            status: 'published',
            date: '2026-09-16',
            title: 'Acoustic Variability of the /ai/ Diphthong: The Impact of Phonetic Context and Articulatory Behavior',
            titleJa: '二重母音/ai/の音響的変動：音声環境と調音動作の影響',
            authors: ['Kamran, M.', 'Kondo, E.', 'Hayami, T.'],
            year: 2026,
            venue: { en: '2026 SICE Festival with Annual Conference (SICE 2026)', ja: '2026年 計測自動制御学会 SICE Festival with Annual Conference（SICE 2026）' },
            place: { en: 'Yokohama, Japan', ja: '横浜（日本）' },
            desc: {
                en: 'Research investigating acoustic variability in the /ai/ diphthong, focusing on the influence of phonetic context and articulatory behavior through acoustic and formant analysis.',
                ja: '二重母音/ai/の音響的な変動について、音声環境（前後の音）と調音動作の影響に着目し、音響分析とフォルマント分析によって調べた研究です。'
            },
            paperId: '0285',
            session: 'WeCT1-01.13',
            links: [
                { href: 'https://controls.papercept.net/conferences/conferences/SICE26/program/SICE26_ContentListWeb_3.html', label: 'pubs.linkProgram', icon: 'fa-list-ul' }
            ],
            topic: { en: 'Speech & phonetics', ja: '音声・音響分析' }
        },
        {
            status: 'published',
            date: '2026-08-04',
            title: 'Systematic Visualization of Articulatory Motion and Formant-to-Coordinate Mapping across Classes and Groups',
            titleJa: 'クラス・グループ間における調音運動の体系的可視化とフォルマント‐座標マッピング',
            authors: ['Kamran, M.', 'Kondo, E.', 'Hayami, T.'],
            year: 2026,
            venue: { en: '3rd International Conference on Connected Innovation and Technology (ICCITX 2026), IEEE', ja: '第3回 コネクテッド・イノベーション技術国際会議（ICCITX 2026・IEEE）' },
            place: { en: 'Published in IEEE Xplore', ja: 'IEEE Xploreに掲載' },
            doi: '10.1109/ICCITX70146.2026.11679952',
            links: [
                { href: 'https://ieeexplore.ieee.org/document/11679952', label: 'pubs.read', icon: 'fa-file-lines' }
            ],
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
