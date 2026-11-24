/* ==========================================================================
   Hero 3D scene (Three.js)
   - A glossy morphing "blob" (custom shader) sits behind the portrait,
     orbited by 3D tiles of my tech stack (Python, Laravel, React, AI…)
     on two tilted rings, plus a soft particle field. Hover a tile to flip
     it and see its name; click or tap it to spin it.
   - Everything reacts to the mouse; the blob tracks the portrait's
     position on screen. Scrolling away spins and swells the blob, sends
     the tiles outward and dollies the camera in.
   - Lazy: loaded from the CDN only after the page has loaded and the
     browser is idle. Skipped for prefers-reduced-motion, Save-Data,
     no WebGL or very low-end devices — the CSS gradient orbs remain.
   - Rendering pauses when the hero is off-screen or the tab is hidden.
   ========================================================================== */
(function () {
    'use strict';

    var THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.min.js';

    function shouldRun() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
        var conn = navigator.connection;
        if (conn && (conn.saveData || /2g/.test(conn.effectiveType || ''))) return false;
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return false;
        // Phones and tablets get the lighter CSS hero (saves ~600 KB of 3D code)
        if (window.innerWidth < 900 || window.matchMedia('(pointer: coarse)').matches) return false;
        try {
            var c = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
        } catch (e) { return false; }
    }

    function start() {
        var canvas = document.getElementById('hero-canvas');
        var hero = document.getElementById('home');
        var portrait = document.getElementById('hero-portrait');
        if (!canvas || !hero || !portrait || !shouldRun()) return;

        import(THREE_URL).then(function (THREE) { build(THREE, canvas, hero, portrait); })
            .catch(function (err) { console.warn('3D scene unavailable, using CSS fallback.', err); });
    }

    /* Tile logos as SVG paths (Font Awesome Free, CC BY 4.0): [viewBox width, height, path] */
    var LOGOS = {"Python":[448,512,"M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2h-40.1v47.4c0 36.8-31.2 67.8-66.8 67.8H172.7c-29.2 0-53.4 25-53.4 54.3v101.8c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3v-40.7H226.2v-13.6h160.2c31.1 0 42.6-21.7 53.4-54.2 11.2-33.5 10.7-65.7 0-108.6zM286.2 404c11.1 0 20.1 9.1 20.1 20.3 0 11.3-9 20.4-20.1 20.4-11 0-20.1-9.2-20.1-20.4.1-11.3 9.1-20.3 20.1-20.3zM167.8 248.1h106.8c29.7 0 53.4-24.5 53.4-54.3V91.9c0-29-24.4-50.7-53.4-55.6-35.8-5.9-74.7-5.6-106.8.1-45.2 8-53.4 24.7-53.4 55.6v40.7h106.9v13.6h-147c-31.1 0-58.3 18.7-66.8 54.2-9.8 40.7-10.2 66.1 0 108.6 7.6 31.6 25.7 54.2 56.8 54.2H101v-48.8c0-35.3 30.5-66.4 66.8-66.4zm-6.7-142.6c-11.1 0-20.1-9.1-20.1-20.3.1-11.3 9-20.4 20.1-20.4 11 0 20.1 9.2 20.1 20.4s-9 20.3-20.1 20.3z"],"Laravel":[512,512,"M504.4,115.83a5.72,5.72,0,0,0-.28-.68,8.52,8.52,0,0,0-.53-1.25,6,6,0,0,0-.54-.71,9.36,9.36,0,0,0-.72-.94c-.23-.22-.52-.4-.77-.6a8.84,8.84,0,0,0-.9-.68L404.4,55.55a8,8,0,0,0-8,0L300.12,111h0a8.07,8.07,0,0,0-.88.69,7.68,7.68,0,0,0-.78.6,8.23,8.23,0,0,0-.72.93c-.17.24-.39.45-.54.71a9.7,9.7,0,0,0-.52,1.25c-.08.23-.21.44-.28.68a8.08,8.08,0,0,0-.28,2.08V223.18l-80.22,46.19V63.44a7.8,7.8,0,0,0-.28-2.09c-.06-.24-.2-.45-.28-.68a8.35,8.35,0,0,0-.52-1.24c-.14-.26-.37-.47-.54-.72a9.36,9.36,0,0,0-.72-.94,9.46,9.46,0,0,0-.78-.6,9.8,9.8,0,0,0-.88-.68h0L115.61,1.07a8,8,0,0,0-8,0L11.34,56.49h0a6.52,6.52,0,0,0-.88.69,7.81,7.81,0,0,0-.79.6,8.15,8.15,0,0,0-.71.93c-.18.25-.4.46-.55.72a7.88,7.88,0,0,0-.51,1.24,6.46,6.46,0,0,0-.29.67,8.18,8.18,0,0,0-.28,2.1v329.7a8,8,0,0,0,4,6.95l192.5,110.84a8.83,8.83,0,0,0,1.33.54c.21.08.41.2.63.26a7.92,7.92,0,0,0,4.1,0c.2-.05.37-.16.55-.22a8.6,8.6,0,0,0,1.4-.58L404.4,400.09a8,8,0,0,0,4-6.95V287.88l92.24-53.11a8,8,0,0,0,4-7V117.92A8.63,8.63,0,0,0,504.4,115.83ZM111.6,17.28h0l80.19,46.15-80.2,46.18L31.41,63.44Zm88.25,60V278.6l-46.53,26.79-33.69,19.4V123.5l46.53-26.79Zm0,412.78L23.37,388.5V77.32L57.06,96.7l46.52,26.8V338.68a6.94,6.94,0,0,0,.12.9,8,8,0,0,0,.16,1.18h0a5.92,5.92,0,0,0,.38.9,6.38,6.38,0,0,0,.42,1v0a8.54,8.54,0,0,0,.6.78,7.62,7.62,0,0,0,.66.84l0,0c.23.22.52.38.77.58a8.93,8.93,0,0,0,.86.66l0,0,0,0,92.19,52.18Zm8-106.17-80.06-45.32,84.09-48.41,92.26-53.11,80.13,46.13-58.8,33.56Zm184.52,4.57L215.88,490.11V397.8L346.6,323.2l45.77-26.15Zm0-119.13L358.68,250l-46.53-26.79V131.79l33.69,19.4L392.37,178Zm8-105.28-80.2-46.17,80.2-46.16,80.18,46.15Zm8,105.28V178L455,151.19l33.68-19.4v91.39h0Z"],"React":[512,512,"M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1.9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2.6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9C38.3 196.2 0 225.4 0 255.6c0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zM167.2 307.5c5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5 4.6 8.8 9.3 17.5 14.3 26.1zm-30.3-120.3c14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26-6.3-14.9-11.6-29.5-16-43.6zm27.4 68.9c6.6-13.8 13.8-27.3 21.4-40.6s15.8-26.2 24.4-38.9c15-1.1 30.3-1.7 45.9-1.7s31 .6 45.9 1.7c8.5 12.6 16.6 25.5 24.3 38.7s14.9 26.7 21.7 40.4c-6.7 13.8-13.9 27.4-21.6 40.8-7.6 13.3-15.7 26.2-24.2 39-14.9 1.1-30.4 1.6-46.1 1.6s-30.9-.5-45.6-1.4c-8.7-12.7-16.9-25.7-24.6-39s-14.8-26.8-21.5-40.6zm180.6 51.2c5.1-8.8 9.9-17.7 14.6-26.7 6.4 14.5 12 29.2 16.9 44.3-15.5 3.5-31.2 6.2-47 8 5.4-8.4 10.5-17 15.5-25.6zm14.4-76.5c-4.7-8.8-9.5-17.6-14.5-26.2-4.9-8.5-10-16.9-15.3-25.2 16.1 2 31.5 4.7 45.9 8-4.6 14.8-10 29.2-16.1 43.4zM256.2 118.3c10.5 11.4 20.4 23.4 29.6 35.8-19.8-.9-39.7-.9-59.5 0 9.8-12.9 19.9-24.9 29.9-35.8zM140.2 57c16.8-9.8 54.1 4.2 93.4 39 2.5 2.2 5 4.6 7.6 7-15.5 16.7-29.8 34.5-42.9 53.1-22.6 2-45 5.5-67.2 10.4-1.3-5.1-2.4-10.3-3.5-15.5-9.4-48.4-3.2-84.9 12.6-94zm-24.5 263.6c-4.2-1.2-8.3-2.5-12.4-3.9-21.3-6.7-45.5-17.3-63-31.2-10.1-7-16.9-17.8-18.8-29.9 0-18.3 31.6-41.7 77.2-57.6 5.7-2 11.5-3.8 17.3-5.5 6.8 21.7 15 43 24.5 63.6-9.6 20.9-17.9 42.5-24.8 64.5zm116.6 98c-16.5 15.1-35.6 27.1-56.4 35.3-11.1 5.3-23.9 5.8-35.3 1.3-15.9-9.2-22.5-44.5-13.5-92 1.1-5.6 2.3-11.2 3.7-16.7 22.4 4.8 45 8.1 67.9 9.8 13.2 18.7 27.7 36.6 43.2 53.4-3.2 3.1-6.4 6.1-9.6 8.9zm24.5-24.3c-10.2-11-20.4-23.2-30.3-36.3 9.6.4 19.5.6 29.5.6 10.3 0 20.4-.2 30.4-.7-9.2 12.7-19.1 24.8-29.6 36.4zm130.7 30c-.9 12.2-6.9 23.6-16.5 31.3-15.9 9.2-49.8-2.8-86.4-34.2-4.2-3.6-8.4-7.5-12.7-11.5 15.3-16.9 29.4-34.8 42.2-53.6 22.9-1.9 45.7-5.4 68.2-10.5 1 4.1 1.9 8.2 2.7 12.2 4.9 21.6 5.7 44.1 2.5 66.3zm18.2-107.5c-2.8.9-5.6 1.8-8.5 2.6-7-21.8-15.6-43.1-25.5-63.8 9.6-20.4 17.7-41.4 24.5-62.9 5.2 1.5 10.2 3.1 15 4.7 46.6 16 79.3 39.8 79.3 58 0 19.6-34.9 44.9-84.8 61.4zm-149.7-15c25.3 0 45.8-20.5 45.8-45.8s-20.5-45.8-45.8-45.8c-25.3 0-45.8 20.5-45.8 45.8s20.5 45.8 45.8 45.8z"],"Node.js":[448,512,"M224 508c-6.7 0-13.5-1.8-19.4-5.2l-61.7-36.5c-9.2-5.2-4.7-7-1.7-8 12.3-4.3 14.8-5.2 27.9-12.7 1.4-.8 3.2-.5 4.6.4l47.4 28.1c1.7 1 4.1 1 5.7 0l184.7-106.6c1.7-1 2.8-3 2.8-5V149.3c0-2.1-1.1-4-2.9-5.1L226.8 37.7c-1.7-1-4-1-5.7 0L36.6 144.3c-1.8 1-2.9 3-2.9 5.1v213.1c0 2 1.1 4 2.9 4.9l50.6 29.2c27.5 13.7 44.3-2.4 44.3-18.7V167.5c0-3 2.4-5.3 5.4-5.3h23.4c2.9 0 5.4 2.3 5.4 5.3V378c0 36.6-20 57.6-54.7 57.6-10.7 0-19.1 0-42.5-11.6l-48.4-27.9C8.1 389.2.7 376.3.7 362.4V149.3c0-13.8 7.4-26.8 19.4-33.7L204.6 9c11.7-6.6 27.2-6.6 38.8 0l184.7 106.7c12 6.9 19.4 19.8 19.4 33.7v213.1c0 13.8-7.4 26.7-19.4 33.7L243.4 502.8c-5.9 3.4-12.6 5.2-19.4 5.2zm149.1-210.1c0-39.9-27-50.5-83.7-58-57.4-7.6-63.2-11.5-63.2-24.9 0-11.1 4.9-25.9 47.4-25.9 37.9 0 51.9 8.2 57.7 33.8.5 2.4 2.7 4.2 5.2 4.2h24c1.5 0 2.9-.6 3.9-1.7s1.5-2.6 1.4-4.1c-3.7-44.1-33-64.6-92.2-64.6-52.7 0-84.1 22.2-84.1 59.5 0 40.4 31.3 51.6 81.8 56.6 60.5 5.9 65.2 14.8 65.2 26.7 0 20.6-16.6 29.4-55.5 29.4-48.9 0-59.6-12.3-63.2-36.6-.4-2.6-2.6-4.5-5.3-4.5h-23.9c-3 0-5.3 2.4-5.3 5.3 0 31.1 16.9 68.2 97.8 68.2 58.4-.1 92-23.2 92-63.4z"],"PHP":[640,512,"M320 104.5c171.4 0 303.2 72.2 303.2 151.5S491.3 407.5 320 407.5c-171.4 0-303.2-72.2-303.2-151.5S148.7 104.5 320 104.5m0-16.8C143.3 87.7 0 163 0 256s143.3 168.3 320 168.3S640 349 640 256 496.7 87.7 320 87.7zM218.2 242.5c-7.9 40.5-35.8 36.3-70.1 36.3l13.7-70.6c38 0 63.8-4.1 56.4 34.3zM97.4 350.3h36.7l8.7-44.8c41.1 0 66.6 3 90.2-19.1 26.1-24 32.9-66.7 14.3-88.1-9.7-11.2-25.3-16.7-46.5-16.7h-70.7L97.4 350.3zm185.7-213.6h36.5l-8.7 44.8c31.5 0 60.7-2.3 74.8 10.7 14.8 13.6 7.7 31-8.3 113.1h-37c15.4-79.4 18.3-86 12.7-92-5.4-5.8-17.7-4.6-47.4-4.6l-18.8 96.6h-36.5l32.7-168.6zM505 242.5c-8 41.1-36.7 36.3-70.1 36.3l13.7-70.6c38.2 0 63.8-4.1 56.4 34.3zM384.2 350.3H421l8.7-44.8c43.2 0 67.1 2.5 90.2-19.1 26.1-24 32.9-66.7 14.3-88.1-9.7-11.2-25.3-16.7-46.5-16.7H417l-32.8 168.7z"],"JavaScript":[448,512,"M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z"],"AI & LLMs":[512,512,"M184 0c30.9 0 56 25.1 56 56V456c0 30.9-25.1 56-56 56c-28.9 0-52.7-21.9-55.7-50.1c-5.2 1.4-10.7 2.1-16.3 2.1c-35.3 0-64-28.7-64-64c0-7.4 1.3-14.6 3.6-21.2C21.4 367.4 0 338.2 0 304c0-31.9 18.7-59.5 45.8-72.3C37.1 220.8 32 207 32 192c0-30.7 21.6-56.3 50.4-62.6C80.8 123.9 80 118 80 112c0-29.9 20.6-55.1 48.3-62.1C131.3 21.9 155.1 0 184 0zM328 0c28.9 0 52.6 21.9 55.7 49.9c27.8 7 48.3 32.1 48.3 62.1c0 6-.8 11.9-2.4 17.4c28.8 6.2 50.4 31.9 50.4 62.6c0 15-5.1 28.8-13.8 39.7C493.3 244.5 512 272.1 512 304c0 34.2-21.4 63.4-51.6 74.8c2.3 6.6 3.6 13.8 3.6 21.2c0 35.3-28.7 64-64 64c-5.6 0-11.1-.7-16.3-2.1c-3 28.2-26.8 50.1-55.7 50.1c-30.9 0-56-25.1-56-56V56c0-30.9 25.1-56 56-56z"],"Docker":[640,512,"M349.9 236.3h-66.1v-59.4h66.1v59.4zm0-204.3h-66.1v60.7h66.1V32zm78.2 144.8H362v59.4h66.1v-59.4zm-156.3-72.1h-66.1v60.1h66.1v-60.1zm78.1 0h-66.1v60.1h66.1v-60.1zm276.8 100c-14.4-9.7-47.6-13.2-73.1-8.4-3.3-24-16.7-44.9-41.1-63.7l-14-9.3-9.3 14c-18.4 27.8-23.4 73.6-3.7 103.8-8.7 4.7-25.8 11.1-48.4 10.7H2.4c-8.7 50.8 5.8 116.8 44 162.1 37.1 43.9 92.7 66.2 165.4 66.2 157.4 0 273.9-72.5 328.4-204.2 21.4.4 67.6.1 91.3-45.2 1.5-2.5 6.6-13.2 8.5-17.1l-13.3-8.9zm-511.1-27.9h-66v59.4h66.1v-59.4zm78.1 0h-66.1v59.4h66.1v-59.4zm78.1 0h-66.1v59.4h66.1v-59.4zm-78.1-72.1h-66.1v60.1h66.1v-60.1z"],"MySQL":[448,512,"M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432V346.1z"],"Git":[448,512,"M439.55 236.05L244 40.45a28.87 28.87 0 0 0-40.81 0l-40.66 40.63 51.52 51.52c27.06-9.14 52.68 16.77 43.39 43.68l49.66 49.66c34.23-11.8 61.18 31 35.47 56.69-26.49 26.49-70.21-2.87-56-37.34L240.22 199v121.85c25.3 12.54 22.26 41.85 9.08 55a34.34 34.34 0 0 1-48.55 0c-17.57-17.6-11.07-46.91 11.25-56v-123c-20.8-8.51-24.6-30.74-18.64-45L142.57 101 8.45 235.14a28.86 28.86 0 0 0 0 40.81l195.61 195.6a28.86 28.86 0 0 0 40.8 0l194.69-194.69a28.86 28.86 0 0 0 0-40.81z"],"Tailwind CSS":[512,512,"M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"]};

    var PALETTES = {
        light: { c1: '#6366f1', c2: '#a855f7', c3: '#ec4899', particles: ['#6366f1', '#a855f7', '#ec4899'] },
        dark:  { c1: '#4f46e5', c2: '#9333ea', c3: '#db2777', particles: ['#818cf8', '#c084fc', '#f472b6'] }
    };

    var BLOB_VERTEX = [
        'uniform float uTime;',
        'uniform float uAmp;',
        'varying vec3 vNormal;',
        'varying float vDisp;',
        'varying vec3 vPos;',
        'void main() {',
        '  vec3 p = position;',
        '  float t = uTime;',
        '  float d = sin(p.x * 1.7 + t * 0.9) * sin(p.y * 2.0 + t * 0.7) * sin(p.z * 1.5 + t * 0.8) * 0.30',
        '          + sin(p.x * 3.2 + p.y * 2.4 + t * 1.3) * 0.06;',
        '  d *= uAmp;',
        '  vDisp = d;',
        '  vPos = p;',
        '  vec3 displaced = p + normal * d;',
        '  vNormal = normalize(normalMatrix * normal);',
        '  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);',
        '}'
    ].join('\n');

    var BLOB_FRAGMENT = [
        'uniform vec3 uC1;',
        'uniform vec3 uC2;',
        'uniform vec3 uC3;',
        'uniform float uRim;',
        'varying vec3 vNormal;',
        'varying float vDisp;',
        'varying vec3 vPos;',
        'void main() {',
        '  float t = clamp(vDisp * 1.6 + 0.5 + vPos.y * 0.18, 0.0, 1.0);',
        '  vec3 col = mix(uC1, uC2, smoothstep(0.0, 0.55, t));',
        '  col = mix(col, uC3, smoothstep(0.45, 1.0, t));',
        '  vec3 n = normalize(vNormal);',
        '  float fresnel = pow(1.0 - abs(n.z), 2.4);',
        '  col += fresnel * uRim;',
        '  float spec = pow(max(dot(n, normalize(vec3(-0.45, 0.6, 0.65))), 0.0), 28.0);',
        '  col += spec * 0.55;',
        '  gl_FragColor = vec4(col, 1.0);',
        '}'
    ].join('\n');

    function build(THREE, canvas, hero, portrait) {
        var small = window.innerWidth < 768;
        var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75));
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        camera.position.z = 10;

        /* Lights (for the glossy tiles) */
        scene.add(new THREE.AmbientLight(0xffffff, 0.9));
        var key = new THREE.DirectionalLight(0xffffff, 1.6);
        key.position.set(4, 6, 8);
        scene.add(key);
        var pinkLight = new THREE.PointLight(0xec4899, 30, 30);
        pinkLight.position.set(5, 2, 4);
        scene.add(pinkLight);
        var blueLight = new THREE.PointLight(0x6366f1, 30, 30);
        blueLight.position.set(-5, -3, 4);
        scene.add(blueLight);

        /* Anchor group — positioned behind the portrait */
        var anchor = new THREE.Group();
        scene.add(anchor);

        /* Morphing blob */
        var blobUniforms = {
            uTime: { value: 0 },
            uAmp: { value: 1 },
            uC1: { value: new THREE.Color() },
            uC2: { value: new THREE.Color() },
            uC3: { value: new THREE.Color() },
            uRim: { value: 0.55 }
        };
        var blob = new THREE.Mesh(
            new THREE.SphereGeometry(1, small ? 64 : 128, small ? 64 : 128),
            new THREE.ShaderMaterial({ vertexShader: BLOB_VERTEX, fragmentShader: BLOB_FRAGMENT, uniforms: blobUniforms })
        );
        anchor.add(blob);

        /* Tech-stack orbit: glossy logo tiles circling the core on two tilted rings */
        var TECH = [
            { name: 'Python', color: '#3776ab', ring: 0 },
            { name: 'Laravel', color: '#f05340', ring: 0 },
            { name: 'React', color: '#149eca', ring: 0 },
            { name: 'Node.js', color: '#3c873a', ring: 0 },
            { name: 'PHP', color: '#777bb4', ring: 0 },
            { name: 'JavaScript', color: '#e0a800', ring: 0 },
            { name: 'AI & LLMs', color: '#a855f7', ring: 1 },
            { name: 'Docker', color: '#2496ed', ring: 1 },
            { name: 'TypeScript', text: 'TS', color: '#3178c6', ring: 1 },
            { name: 'MySQL', color: '#00758f', ring: 1 },
            { name: 'Git', color: '#f05032', ring: 1 },
            { name: 'Tailwind CSS', color: '#06b6d4', ring: 1 }
        ];
        var RINGS = [
            { r: 1.24, speed: 0.20, tilt: new THREE.Euler(1.12, 0, 0.34) },
            { r: 1.5, speed: -0.14, tilt: new THREE.Euler(1.2, 0, -0.38) }
        ];

        // Rounded tile: extruded rounded rectangle; caps carry the logo texture, sides the brand colour
        var tileGeo = (function () {
            var sh = new THREE.Shape(), rr = 0.22;
            sh.moveTo(rr, 0); sh.lineTo(1 - rr, 0); sh.quadraticCurveTo(1, 0, 1, rr);
            sh.lineTo(1, 1 - rr); sh.quadraticCurveTo(1, 1, 1 - rr, 1);
            sh.lineTo(rr, 1); sh.quadraticCurveTo(0, 1, 0, 1 - rr);
            sh.lineTo(0, rr); sh.quadraticCurveTo(0, 0, rr, 0);
            var g = new THREE.ExtrudeGeometry(sh, { depth: 0.12, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 4, curveSegments: 10 });
            g.translate(-0.5, -0.5, -0.06);
            return g;
        })();

        function drawFace(t, dark) {
            var c = t.canvas, g = c.getContext('2d'), n = c.width;
            var grd = g.createLinearGradient(0, 0, n, n);
            // Face: soft brand-tinted gradient
            var tint = new THREE.Color(t.color);
            var top = new THREE.Color(dark ? '#20244a' : '#ffffff').lerp(tint, dark ? 0.12 : 0.05);
            var bottom = new THREE.Color(dark ? '#121530' : '#f4f2fb').lerp(tint, dark ? 0.2 : 0.12);
            grd.addColorStop(0, '#' + top.getHexString());
            grd.addColorStop(1, '#' + bottom.getHexString());
            g.fillStyle = grd; g.fillRect(0, 0, n, n);
            var col = new THREE.Color(t.color);
            if (dark) col.lerp(new THREE.Color('#ffffff'), 0.22);
            g.textAlign = 'center'; g.textBaseline = 'middle';
            if (t.text) {
                // TypeScript-style badge
                var b = n * 0.56, x = (n - b) / 2;
                g.fillStyle = t.color; g.beginPath();
                if (g.roundRect) g.roundRect(x, x, b, b, n * 0.07); else g.rect(x, x, b, b);
                g.fill();
                g.fillStyle = '#ffffff'; g.font = '800 ' + Math.round(n * 0.27) + 'px "Outfit", Arial, sans-serif';
                g.fillText(t.text, n / 2 + n * 0.04, n / 2 + n * 0.06);
            } else if (LOGOS[t.name] && window.Path2D) {
                // Logo drawn from its SVG path, scaled to ~56% of the tile and centred
                var L = LOGOS[t.name], sc = (n * 0.56) / Math.max(L[0], L[1]);
                g.save();
                g.translate((n - L[0] * sc) / 2, (n - L[1] * sc) / 2 + n * 0.01);
                g.scale(sc, sc);
                g.fillStyle = '#' + col.getHexString();
                g.shadowColor = 'rgba(0,0,0,' + (dark ? 0.35 : 0.12) + ')';
                g.shadowBlur = n * 0.03; g.shadowOffsetY = n * 0.015; // shadows ignore the transform
                g.fill(new Path2D(L[2]));
                g.restore();
            } else {
                g.fillStyle = '#' + col.getHexString();
                g.font = '800 ' + Math.round(n * 0.2) + 'px Arial, sans-serif';
                g.fillText(t.name.slice(0, 3), n / 2, n / 2);
            }
            t.texture.needsUpdate = true;
        }

        var tiles = TECH.map(function (t, i) {
            t.canvas = document.createElement('canvas');
            t.canvas.width = t.canvas.height = 256;
            t.texture = new THREE.CanvasTexture(t.canvas);
            t.texture.colorSpace = THREE.SRGBColorSpace;
            t.texture.anisotropy = 4;
            // Face is partly self-lit (emissive = its own texture) so logo colours stay true under the coloured lights
            var face = new THREE.MeshPhysicalMaterial({ map: t.texture, emissive: 0xffffff, emissiveMap: t.texture, emissiveIntensity: 0.55, roughness: 0.4, clearcoat: 0.6, clearcoatRoughness: 0.25 });
            var side = new THREE.MeshPhysicalMaterial({ color: t.color, roughness: 0.25, metalness: 0.25, clearcoat: 1 });
            t.mesh = new THREE.Mesh(tileGeo, [face, side]);
            t.mesh.userData.tile = t;
            anchor.add(t.mesh);
            var inRing = TECH.filter(function (x) { return x.ring === t.ring; });
            t.angle = (inRing.indexOf(t) / inRing.length) * Math.PI * 2 + t.ring * 0.5;
            t.phase = i * 1.7;
            t.hover = 0; t.spin = 0; t.spinTarget = 0; t.jump = 0;
            return t;
        });

        // Dashed orbit paths
        var orbitLines = RINGS.map(function (ring) {
            var pts = new THREE.EllipseCurve(0, 0, 1, 1, 0, Math.PI * 2).getPoints(128);
            var geo = new THREE.BufferGeometry().setFromPoints(pts.map(function (p) { return new THREE.Vector3(p.x, p.y, 0); }));
            var line = new THREE.LineLoop(geo, new THREE.LineDashedMaterial({ dashSize: 0.04, gapSize: 0.03, transparent: true, opacity: 0.45 }));
            line.computeLineDistances();
            line.rotation.copy(ring.tilt);
            anchor.add(line);
            return line;
        });

        /* Soft particle field */
        var sprite = (function () {
            var s = document.createElement('canvas');
            s.width = s.height = 64;
            var g = s.getContext('2d');
            var grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
            grd.addColorStop(0, 'rgba(255,255,255,1)');
            grd.addColorStop(0.45, 'rgba(255,255,255,0.5)');
            grd.addColorStop(1, 'rgba(255,255,255,0)');
            g.fillStyle = grd;
            g.fillRect(0, 0, 64, 64);
            var tex = new THREE.CanvasTexture(s);
            tex.colorSpace = THREE.SRGBColorSpace;
            return tex;
        })();
        var COUNT = small ? 260 : 700;
        var pos = new Float32Array(COUNT * 3), col = new Float32Array(COUNT * 3), seed = new Float32Array(COUNT);
        for (var i = 0; i < COUNT; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 22;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 13;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
            seed[i] = Math.random();
        }
        var pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        pGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
        var pMat = new THREE.PointsMaterial({ size: 0.07, map: sprite, vertexColors: true, transparent: true, depthWrite: false });
        var points = new THREE.Points(pGeo, pMat);
        scene.add(points);

        function themeKey() { return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }
        // Colours follow the CSS accent palette (Violet / Ocean / Sunset / Emerald)
        function cssPalette(k) {
            var cs = getComputedStyle(document.documentElement);
            var v = function (n, fb) { return (cs.getPropertyValue(n) || '').trim() || fb; };
            var base = PALETTES[k];
            var c1 = v('--accent-1', base.c1), c2 = v('--accent-2', base.c2), c3 = v('--accent-3', base.c3);
            return { c1: c1, c2: c2, c3: c3, particles: [c1, c2, c3] };
        }
        function applyTheme() {
            var k = themeKey(), pal = cssPalette(k);
            blobUniforms.uC1.value.set(pal.c1);
            blobUniforms.uC2.value.set(pal.c2);
            blobUniforms.uC3.value.set(pal.c3);
            blobUniforms.uRim.value = k === 'dark' ? 0.45 : 0.6;
            tiles.forEach(function (t) { drawFace(t, k === 'dark'); });
            orbitLines.forEach(function (l) { l.material.color.set(pal.c2); l.material.opacity = k === 'dark' ? 0.55 : 0.4; });
            var c = new THREE.Color();
            for (var i = 0; i < COUNT; i++) {
                c.set(pal.particles[Math.floor(seed[i] * pal.particles.length)]);
                col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
            }
            pGeo.attributes.color.needsUpdate = true;
            pMat.blending = k === 'dark' ? THREE.AdditiveBlending : THREE.NormalBlending;
            pMat.opacity = k === 'dark' ? 0.85 : 0.5;
            pMat.needsUpdate = true;
            pinkLight.color.set(pal.c3);
            blueLight.color.set(pal.c1);
        }
        applyTheme();
        document.addEventListener('themechange', applyTheme);

        /* Sizing: keep the blob centred behind the portrait */
        var heroW = 1, heroH = 1, unitsPerPx = 0.01;
        function resize() {
            heroW = hero.clientWidth; heroH = hero.clientHeight;
            renderer.setSize(heroW, heroH, false);
            camera.aspect = heroW / heroH;
            camera.updateProjectionMatrix();
            var visibleH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
            unitsPerPx = visibleH / heroH;
        }
        function placeAnchor() {
            var hr = hero.getBoundingClientRect();
            var pr = portrait.getBoundingClientRect();
            var cx = pr.left + pr.width / 2 - hr.left;
            var cy = pr.top + pr.height / 2 - hr.top;
            anchor.position.x = (cx - heroW / 2) * unitsPerPx;
            anchor.position.y = -(cy - heroH / 2) * unitsPerPx;
            // Blob a bit larger than the portrait so it glows out around the edges
            anchor.userData.radius = (pr.width * (heroW < 640 ? 0.6 : 0.66)) * unitsPerPx;
        }
        var intro = 0; // 0 → 1 grow-in progress
        resize();
        window.addEventListener('resize', resize, { passive: true });

        /* Tile interaction: hover grows + flips a tile and shows its name; click spins it */
        var raycaster = new THREE.Raycaster(), ndc = new THREE.Vector2(), tmpV = new THREE.Vector3();
        var hovered = null, px = -1, py = -1, pointerMoved = false, blocked = false, tipTimer = null;
        var tileMeshes = tiles.map(function (t) { return t.mesh; });
        var cursorEl = document.querySelector('.cursor');
        var tip = document.createElement('div');
        tip.className = 'tech-tip';
        tip.setAttribute('aria-hidden', 'true');
        document.body.appendChild(tip);

        function hitTest(x, y) {
            var rect = canvas.getBoundingClientRect();
            if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) return null;
            ndc.set(((x - rect.left) / rect.width) * 2 - 1, -((y - rect.top) / rect.height) * 2 + 1);
            raycaster.setFromCamera(ndc, camera);
            var hits = raycaster.intersectObjects(tileMeshes.concat([blob]), false);
            // A tile hidden behind the glowing core doesn't count
            return hits.length && hits[0].object.userData.tile ? hits[0].object.userData.tile : null;
        }
        function isBlocked(x, y) {
            var el = document.elementFromPoint(x, y);
            return !el || !!el.closest('.portrait, .float-card, .hero-copy a, .hero-copy button, .hero-title, .hero-lead, .hero-meta, .status-pill, .site-header, .scroll-cue');
        }
        function setHover(t) {
            if (t === hovered) return;
            if (t) t.spinTarget += Math.PI * 2;          // flip around once on hover
            hovered = t;
            hero.classList.toggle('tile-hover', !!t);
            // The custom cursor shows its hover ring; the name floats above the tile
            if (cursorEl && document.documentElement.classList.contains('has-custom-cursor')) {
                cursorEl.setAttribute('data-state', t ? 'link' : '');
            }
            if (t) showTip(t); else hideTip();
        }
        function pickHover() {
            if (!pointerMoved) return;
            pointerMoved = false;
            setHover(blocked ? null : hitTest(px, py));
        }
        function showTip(t) { tip.textContent = t.name; tip.style.setProperty('--c', t.color); tip.classList.add('show'); tip._t = t; }
        function hideTip() { tip.classList.remove('show'); tip._t = null; }
        function placeTip() {
            var t = tip._t;
            if (!t) return;
            t.mesh.getWorldPosition(tmpV).project(camera);
            var rect = canvas.getBoundingClientRect();
            tip.style.transform = 'translate3d(' + (rect.left + (tmpV.x + 1) / 2 * rect.width).toFixed(1) + 'px,' + (rect.top + (1 - tmpV.y) / 2 * rect.height).toFixed(1) + 'px,0)';
        }
        window.addEventListener('pointermove', function (e) {
            if (e.pointerType !== 'mouse') return;
            px = e.clientX; py = e.clientY; pointerMoved = true;
            blocked = isBlocked(px, py);
        }, { passive: true });
        hero.addEventListener('pointerleave', function () { px = py = -1; pointerMoved = true; });
        hero.addEventListener('click', function (e) {
            if (e.target.closest('a, button, input, .portrait')) return;
            var t = hitTest(e.clientX, e.clientY);
            if (!t) return;
            t.spinTarget += Math.PI * 4;                 // double spin + hop toward the viewer
            t.jump = 1;
            if (e.pointerType !== 'mouse' || !hovered) {   // touch: show the name for a moment
                showTip(t);
                clearTimeout(tipTimer);
                tipTimer = setTimeout(function () { if (hovered !== t) hideTip(); }, 1600);
            }
        });

        /* Mouse */
        var mouse = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
        window.addEventListener('pointermove', function (e) {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
        }, { passive: true });

        /* Scroll: 0 at the top of the page → 1 once the hero has scrolled away */
        var scrollP = 0, scrollCur = 0;
        function readScroll() { scrollP = Math.max(0, Math.min(1, window.scrollY / Math.max(1, hero.offsetHeight * 0.85))); }
        window.addEventListener('scroll', readScroll, { passive: true });
        readScroll();

        /* Loop — only while visible */
        var visible = true, running = false, last = 0, time = 0;
        function loop(ts) {
            if (!visible || document.hidden) { running = false; return; }
            var dt = Math.min(0.05, (ts - (last || ts)) / 1000);
            last = ts;
            time += dt;

            cur.x += (mouse.x - cur.x) * 0.05;
            cur.y += (mouse.y - cur.y) * 0.05;
            scrollCur += (scrollP - scrollCur) * 0.08;      // smoothed scroll progress
            var sp = scrollCur;

            // Intro: grow in with a soft overshoot (ease-out-back)
            intro = Math.min(1, intro + dt * 0.9);
            var introEase = 1 + 1.4 * Math.pow(intro - 1, 3) + 0.4 * Math.pow(intro - 1, 2);
            placeAnchor();
            // Scrolling away: the blob swells, wobbles harder and spins
            blob.scale.setScalar(anchor.userData.radius * Math.max(0, introEase) * (1 + sp * 0.55));

            blobUniforms.uTime.value = time;
            blobUniforms.uAmp.value = 1 + Math.hypot(cur.x, cur.y) * 0.35 + sp * 0.9;
            blob.rotation.y = time * 0.15 + cur.x * 0.5 + sp * 2.4;
            blob.rotation.x = cur.y * 0.35 + sp * 0.8;
            blob.rotation.z = sp * 1.2;

            // Tech tiles orbit the core; scrolling widens the rings and speeds them up
            var R = anchor.userData.radius * (1 + sp * 1.2) * (heroW < 640 ? 0.8 : 1);   // tighter orbits on phones
            pickHover();
            orbitLines.forEach(function (l, i) { l.scale.setScalar(Math.max(0.001, R * RINGS[i].r * introEase)); });
            tiles.forEach(function (t) {
                var ring = RINGS[t.ring];
                t.angle += dt * ring.speed * (1 + sp * 2.5) * (hovered ? 0.3 : 1);
                var rr = R * ring.r;
                tmpV.set(Math.cos(t.angle) * rr, Math.sin(t.angle) * rr, 0).applyEuler(ring.tilt);
                t.hover += ((hovered === t ? 1 : 0) - t.hover) * 0.14;
                t.jump *= 0.93;
                t.spin += (t.spinTarget - t.spin) * 0.07;
                t.mesh.position.set(tmpV.x, tmpV.y, tmpV.z + t.jump * R * 0.6 + t.hover * R * 0.25);
                t.mesh.scale.setScalar(Math.max(0.001, R * 0.31 * (1 + t.hover * 0.45 + t.jump * 0.3) * Math.max(0, introEase)));
                // Mostly face the viewer so logos stay readable, with a gentle wobble
                t.mesh.rotation.set(
                    Math.sin(time * 0.9 + t.phase) * 0.22 - cur.y * 0.25,
                    Math.cos(time * 0.7 + t.phase) * 0.3 + cur.x * 0.35 + t.spin,
                    Math.sin(time * 0.5 + t.phase) * 0.08
                );
            });
            placeTip();

            points.rotation.y = time * 0.02 + cur.x * 0.08 + sp * 0.7;
            points.rotation.x = cur.y * 0.05 + sp * 0.25;
            camera.position.x = cur.x * 0.35;
            camera.position.y = -cur.y * 0.25;
            camera.position.z = 10 - sp * 2.6;                // dolly in
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
            requestAnimationFrame(loop);
        }
        function kick() {
            if (!running && visible && !document.hidden) { running = true; last = 0; requestAnimationFrame(loop); }
        }

        new IntersectionObserver(function (entries) {
            visible = entries[0].isIntersecting;
            kick();
        }, { threshold: 0 }).observe(hero);
        document.addEventListener('visibilitychange', kick);

        kick();
        canvas.classList.add('ready');
        document.documentElement.classList.add('has-webgl');
    }

    window.addEventListener('load', function () {
        if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 2000 });
        else setTimeout(start, 500);
    });
})();
