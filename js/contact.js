/* ==========================================================================
   Contact form
   Submission logic is unchanged from the previous site: EmailJS with the
   same public key, service ID and template ID, sending the form fields
   (from_name, from_email, subject, message) via emailjs.sendForm().
   Added on top: real-time validation and animated button / message states
   (data-state="idle | loading | success | error" on the submit button).
   ========================================================================== */
(function () {
    'use strict';

    var EMAILJS_PUBLIC_KEY = 'AakA3t5WF9wwSEi1y';
    var EMAILJS_SERVICE_ID = 'service_66v7xoy';
    var EMAILJS_TEMPLATE_ID = 'template_xtkzatr';

    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function t(k) { return window.I18N.t(k); }

    function validateField(input) {
        var v = input.value.trim();
        var msg = '';
        if (!v) msg = t('form.errRequired');
        else if (input.name === 'from_name' && v.length < 2) msg = t('form.errName');
        else if (input.name === 'from_email' && !EMAIL_RE.test(v)) msg = t('form.errEmail');
        else if (input.name === 'subject' && v.length < 3) msg = t('form.errSubject');
        else if (input.name === 'message' && v.length < 10) msg = t('form.errMessage');

        var field = input.closest('.field');
        var err = field && field.querySelector('.field-error');
        if (err) err.textContent = msg;
        input.setAttribute('aria-invalid', msg ? 'true' : 'false');
        if (field) {
            field.classList.toggle('has-error', !!msg);
            field.classList.toggle('is-valid', !msg);
        }
        return !msg;
    }

    function setState(btn, state) {
        btn.setAttribute('data-state', state);
        var text = btn.querySelector('.submit-text');
        var key = { idle: 'form.submit', loading: 'form.sending', success: 'form.sent', error: 'form.submit' }[state];
        text.setAttribute('data-i18n', key);
        text.textContent = t(key);
        btn.disabled = state === 'loading' || state === 'success';
        btn.setAttribute('aria-busy', state === 'loading' ? 'true' : 'false');
    }

    function showMsg(el, show) {
        if (show) {
            el.hidden = false;
            requestAnimationFrame(function () { el.classList.add('show'); });
        } else {
            el.classList.remove('show');
            el.hidden = true;
        }
    }

    function init() {
        var form = document.getElementById('contact-form');
        if (!form) return;
        var successMessage = document.getElementById('form-success');
        var errorMessage = document.getElementById('form-error');
        var submitBtn = form.querySelector('.submit-btn');
        var inputs = form.querySelectorAll('input, textarea');

        var emailjsReady = false;
        function ensureEmailJS() {
            if (!emailjsReady && window.emailjs) { emailjs.init(EMAILJS_PUBLIC_KEY); emailjsReady = true; }
            return emailjsReady;
        }
        ensureEmailJS();

        // Real-time validation: validate on blur, then live once a field has been touched
        inputs.forEach(function (input) {
            input.addEventListener('blur', function () {
                if (input.value.trim()) { input.dataset.touched = '1'; validateField(input); }
            });
            input.addEventListener('input', function () {
                if (input.dataset.touched) validateField(input);
            });
        });

        // Re-translate visible error messages on language change
        document.addEventListener('langchange', function () {
            inputs.forEach(function (input) { if (input.dataset.touched) validateField(input); });
        });

        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            var valid = true, firstInvalid = null;
            inputs.forEach(function (input) {
                input.dataset.touched = '1';
                if (!validateField(input)) { valid = false; firstInvalid = firstInvalid || input; }
            });
            if (!valid) {
                form.classList.remove('shake');
                void form.offsetWidth;
                form.classList.add('shake');
                firstInvalid.focus();
                return;
            }

            // Hide previous messages
            showMsg(successMessage, false);
            showMsg(errorMessage, false);

            // Loading state
            setState(submitBtn, 'loading');

            try {
                if (!ensureEmailJS()) throw new Error('EmailJS not loaded');

                // Send email using EmailJS (unchanged)
                var result = await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this);
                console.log('Email sent successfully:', result);

                // Success state
                setState(submitBtn, 'success');
                showMsg(successMessage, true);

                // Reset form after delay
                setTimeout(function () {
                    form.reset();
                    inputs.forEach(function (input) {
                        delete input.dataset.touched;
                        input.removeAttribute('aria-invalid');
                        var field = input.closest('.field');
                        if (field) field.classList.remove('is-valid', 'has-error');
                    });
                    setState(submitBtn, 'idle');
                }, 3000);
            } catch (error) {
                console.error('Email sending failed:', error);
                setState(submitBtn, 'error');
                showMsg(errorMessage, true);
                setTimeout(function () {
                    if (submitBtn.getAttribute('data-state') === 'error') setState(submitBtn, 'idle');
                }, 1200);
            }
        });
    }

    // EmailJS is a deferred CDN script that loads before this file, so it is ready at DOMContentLoaded
    document.addEventListener('DOMContentLoaded', init);
})();
