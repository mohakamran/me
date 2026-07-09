/* ===== ELITE INTERACTION & ANIMATION ENGINE (2026 EDITION) ===== */

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
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

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

// ===== EXTREMELY SMOOTH 3D CARD TILT =====
function initCardTilt() {
    const cards = document.querySelectorAll('.portfolio-card, .service-card, .certification-card, .hero-avatar-wrapper');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Subtle premium tilt parameters
            const rotateX = ((centerY - y) / centerY) * 6; // Max 6deg
            const rotateY = ((x - centerX) / centerX) * 6; // Max 6deg

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.015)`;
            card.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.12)';
            card.style.borderColor = 'var(--primary-light)';
            card.style.transition = 'transform 0.1s ease-out, box-shadow 0.2s, border-color 0.2s';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
            card.style.boxShadow = '';
            card.style.borderColor = '';
            card.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.6s, border-color 0.6s';
        });
    });
}

// ===== MOUSE REACTIVE HERO LIGHTING (ORB TRACKER) =====
function initMouseLighting() {
    const hero = document.getElementById('home');
    const orb = document.getElementById('gradient-orb');
    if (!hero || !orb) return;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Pass coordinates to css variables for dynamic lighting
        hero.style.setProperty('--mx', `${x}px`);
        hero.style.setProperty('--my', `${y}px`);

        // Move the glowing orb smoothly with a slight lag (magnetic effect)
        orb.style.transform = `translate(calc(-50% + ${(x - rect.width / 2) * 0.12}px), calc(-50% + ${(y - rect.height / 2) * 0.12}px))`;
        orb.style.transition = 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)';
    });
}

// ===== STATS NUMERIC COUNTER EFFECT =====
function initStatsCounter() {
    const counters = document.querySelectorAll('.counter-val');
    if (!counters.length) return;

    const countUp = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2000; // 2 seconds
        const stepTime = 16; // ~60fps
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;
        let currentCount = 0;

        const timer = setInterval(() => {
            currentCount += increment;
            if (currentCount >= target) {
                counter.textContent = target + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = Math.ceil(currentCount) + suffix;
            }
        }, stepTime);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    counters.forEach(c => observer.observe(c));
}

// ===== PHYSICAL MAGNETIC BUTTONS =====
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic-btn');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Physical draw towards cursor
            const pullX = (x - centerX) * 0.32;
            const pullY = (y - centerY) * 0.32;

            btn.style.transform = `translate(${pullX}px, ${pullY}px) scale(1.03)`;
            btn.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.22)';
            btn.style.transition = 'transform 0.1s ease-out, box-shadow 0.2s';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px) scale(1)';
            btn.style.boxShadow = '';
            btn.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s';
        });
    });
}

// ===== INTERACTIVE NEURAL FLOW (SVG ANIMATION OVERRIDES) =====
function initNeuralFlow() {
    const neuralSection = document.getElementById('ai-research');
    if (!neuralSection) return;

    const nodes = neuralSection.querySelectorAll('.neural-node');
    nodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            // Pulse current node and lines
            node.setAttribute('r', '10');
            node.style.fill = 'var(--accent)';
            node.style.filter = 'drop-shadow(0 0 12px var(--accent))';
            node.style.transition = 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)';
        });

        node.addEventListener('mouseleave', () => {
            node.setAttribute('r', '6');
            node.style.fill = '';
            node.style.filter = '';
        });
    });
}

// ===== CUSTOM ELASTIC CURSOR =====
function initCustomCursor() {
    const dot = document.querySelector('.custom-cursor-dot');
    const circle = document.querySelector('.custom-cursor-circle');
    if (!dot || !circle) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let circleX = mouseX;
    let circleY = mouseY;
    let isHovering = false;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant position for the dot
        if (!isHovering) {
            dot.style.left = `${mouseX}px`;
            dot.style.top = `${mouseY}px`;
        }
    });

    // Elastic custom easing loop for the outer circle
    function tick() {
        const easing = 0.15; // smooth lag
        circleX += (mouseX - circleX) * easing;
        circleY += (mouseY - circleY) * easing;

        circle.style.left = `${circleX}px`;
        circle.style.top = `${circleY}px`;
        
        requestAnimationFrame(tick);
    }
    tick();

    // Scale and style overrides on hovering interactive elements
    function addCursorListeners() {
        const links = document.querySelectorAll('a, button, select, input, textarea, .gallery-item, .filter-btn, .portfolio-btn, .theme-button, [role="button"]');
        links.forEach(link => {
            // Prevent duplicate listeners
            link.removeEventListener('mouseenter', onLinkEnter);
            link.removeEventListener('mouseleave', onLinkLeave);
            
            link.addEventListener('mouseenter', onLinkEnter);
            link.addEventListener('mouseleave', onLinkLeave);
        });
    }

    function onLinkEnter() {
        isHovering = true;
        circle.style.transform = 'translate(-50%, -50%) scale(1.6)';
        circle.style.borderColor = 'var(--secondary)';
        circle.style.backgroundColor = 'rgba(167, 139, 250, 0.08)';
        dot.style.transform = 'translate(-50%, -50%) scale(0)';
    }

    function onLinkLeave() {
        isHovering = false;
        circle.style.transform = 'translate(-50%, -50%) scale(1)';
        circle.style.borderColor = 'var(--accent)';
        circle.style.backgroundColor = 'transparent';
        dot.style.transform = 'translate(-50%, -50%) scale(1)';
    }

    addCursorListeners();

    // Re-bind when content changes (e.g. portfolio filtering)
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(addCursorListeners, 100);
            setTimeout(addCursorListeners, 400);
        });
    });
}

// ===== BACK TO TOP =====
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== INITIALIZE ALL EXTRAS =====
document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initScrollReveal();
    initStaggerReveal();
    initCardTilt();
    initMouseLighting();
    initStatsCounter();
    initMagneticButtons();
    initNeuralFlow();
    initBackToTop();
});
