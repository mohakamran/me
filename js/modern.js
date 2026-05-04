/* ===== MODERN INTERACTIONS ===== */

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.section-hidden');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => observer.observe(el));
}

// ===== STAGGER REVEAL =====
function initStaggerReveal() {
    const staggerContainers = document.querySelectorAll('[data-stagger]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    staggerContainers.forEach(el => observer.observe(el));
}

// ===== CARD TILT (subtle) =====
function initCardTilt() {
    const cards = document.querySelectorAll('.portfolio-card, .service-card, .certification-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 50;
            const rotateY = (centerX - x) / 50;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.01)`;
            card.style.transition = 'transform 0.15s ease-out';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
        });
    });
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
            navbar.style.borderBottomColor = 'rgba(0,0,0,0.06)';
        } else {
            navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
            navbar.style.borderBottomColor = 'var(--border-color)';
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

// ===== SMOOTH ANCHOR SCROLLING =====
function initSmoothAnchorScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ===== PARTICLES.JS =====
function initParticlesJs() {
    if (typeof particlesJS === 'undefined') return;
    particlesJS('particles-js', {
        particles: {
            number: { value: 90, density: { enable: true, value_area: 900 } },
            color: { value: ['#ffffff', '#60a5fa', '#0d9488', '#fb7185', '#a78bfa'] },
            shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
            opacity: { value: 0.32, random: true, anim: { enable: true, speed: 0.8, opacity_min: 0.08, sync: false } },
            size: { value: 4, random: true, anim: { enable: true, speed: 1.5, size_min: 0.3, sync: false } },
            line_linked: { enable: true, distance: 170, color: '#ffffff', opacity: 0.35, width: 1.25 },
            move: { enable: true, speed: 1.1, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: {
                grab: { distance: 200, line_linked: { opacity: 0.45 } },
                push: { particles_nb: 6 },
                repulse: { distance: 140, duration: 0.45 }
            }
        },
        retina_detect: true
    });
}

// ===== STICKY HEADER ENHANCEMENT =====
function initStickyHeader() {
    const header = document.getElementById('modern-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }, { passive: true });
}

// ===== INITIALIZE ALL =====
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initStaggerReveal();
    initCardTilt();
    initNavbarScroll();
    initSmoothAnchorScroll();
    initParticlesJs();
    initStickyHeader();
});
