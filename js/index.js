// ===== NAVBAR FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function () {
    console.log('Portfolio website loaded successfully');

    // Mobile Menu Functionality
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        function toggleMobileMenu(show) {
            if (show) {
                mobileMenu.classList.remove('hidden');
                requestAnimationFrame(() => {
                    mobileMenu.classList.remove('opacity-0');
                    mobileMenu.classList.add('opacity-100');
                });
            } else {
                mobileMenu.classList.remove('opacity-100');
                mobileMenu.classList.add('opacity-0');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            }
        }

        menuToggle.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            toggleMobileMenu(isHidden);
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (isHidden) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('#mobile-menu a, #mobile-menu button').forEach(el => {
            el.addEventListener('click', () => {
                toggleMobileMenu(false);
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!mobileMenu.classList.contains('hidden') &&
                !mobileMenu.contains(e.target) &&
                !menuToggle.contains(e.target)) {
                toggleMobileMenu(false);
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Active nav link on scroll
    // Active nav link on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-item');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        // Update desktop nav links
        navLinks.forEach(link => {
            link.classList.remove('active', 'text-orange-500');
            link.classList.add('text-gray-500');

            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active', 'text-orange-500');
                link.classList.remove('text-gray-500');
            }
        });

        // Update mobile nav links
        mobileNavLinks.forEach(link => {
            link.classList.remove('active', 'text-orange-500', 'bg-orange-50');
            link.classList.add('text-gray-500');

            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active', 'text-orange-500');
                link.classList.remove('text-gray-500');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Initialize on load
    updateActiveNavLink();

    // Force navbar to stay visible
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.display = 'block';
        navbar.style.visibility = 'visible';
        navbar.style.opacity = '1';
    }

    // Theme initialization is handled later in the main DOMContentLoaded initializer.
});

// Additional safety check for navbar
window.addEventListener('load', function () {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.display = 'block';
        navbar.style.visibility = 'visible';
        navbar.style.opacity = '1';
        console.log('Navbar forced visible on load');
    }
});

// ===== BACKGROUND ANIMATIONS =====
// Create floating particles
function createParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 12;
    const colors = ['#1e40af', '#0d9488', '#7c3aed', '#f97316'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 40 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = color;
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        particle.style.boxShadow = `0 0 20px ${color}`;
        
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100 + 100}vh`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${Math.random() * 15 + 10}s`;

        container.appendChild(particle);
    }
}

function updateThemeIcons(theme) {
    const buttons = [document.getElementById('theme-toggle'), document.getElementById('theme-toggle-mobile')];
    buttons.forEach(btn => {
        if (!btn) return;
        const icon = btn.querySelector('i');
        if (!icon) return;
        icon.className = theme === 'dark' ? 'fas fa-sun text-sm' : 'fas fa-moon text-sm';
    });
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    updateThemeIcons(theme);
    applyCardTheme(theme);
    document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
}

function applyCardTheme(theme) {
    const isLight = theme !== 'dark';
    // All section card panels that carry hardcoded dark Tailwind bg classes
    const cardSelectors = [
        '#about .rounded-3xl', '#about .rounded-2xl',
        '#journey .rounded-3xl',
        '#skills .shimmer-panel',
        '#experience .timeline-card', '#experience .rounded-3xl', '#experience .rounded-2xl',
        '#services .rounded-3xl', '#services .rounded-2xl',
        '#featured-projects .rounded-3xl', '#featured-projects .rounded-2xl',
        '#certifications .rounded-3xl', '#certifications .rounded-2xl',
        '#contact .rounded-3xl', '#contact .rounded-2xl',
        '#gallery .rounded-3xl', '#gallery .rounded-2xl',
        '#portfolio .rounded-3xl',
        '#ai-research .rounded-3xl',
        '#mobile-menu',
        '.float-badge-1 > div', '.float-badge-2 > div', '.float-badge-3 > div'
    ];
    cardSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            if (isLight) {
                el.style.setProperty('background-color', 'var(--bg-surface)', 'important');
                el.style.setProperty('border-color', 'var(--border-color)', 'important');
            } else {
                el.style.removeProperty('background-color');
                el.style.removeProperty('border-color');
            }
        });
    });
    // Text colors inside cards
    const textSelectors = ['section .text-white', 'footer .text-white'];
    textSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            if (el.closest('.gradient-text') || el.classList.contains('gradient-text')) return;
            if (isLight) {
                el.style.setProperty('color', 'var(--text-main)', 'important');
            } else {
                el.style.removeProperty('color');
            }
        });
    });
}

function initThemeToggle() {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = storedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);

    const toggleButtons = [document.getElementById('theme-toggle'), document.getElementById('theme-toggle-mobile')];
    toggleButtons.forEach(button => {
        if (!button) return;
        button.addEventListener('click', () => {
            const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme);
        });
    });
}

// ===== TYPEWRITER EFFECT =====
const roles = ["PHP", "Python", "React", "Laravel", "JavaScript", "Node.js", "MongoDB", "Express", "Git", "Docker", "TypeScript", "AI Driven Development", "Shopify", "WordPress"];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typewriter = document.getElementById("typewriter");

function typeEffect() {
    const fullText = roles[roleIndex];

    if (isDeleting) {
        charIndex--;
        typewriter.textContent = fullText.substring(0, charIndex);
    } else {
        charIndex++;
        typewriter.textContent = fullText.substring(0, charIndex);
    }

    if (!isDeleting && charIndex === fullText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 200);
    } else {
        setTimeout(typeEffect, isDeleting ? 80 : 120);
    }
}

// ===== SCROLL ANIMATIONS =====
function checkScroll() {
    const sections = document.querySelectorAll('.section-hidden');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight * 0.8;
        if (sectionTop < triggerBottom) {
            section.classList.add('section-visible');
        }
    });
}

// Smooth scrolling for navigation
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== SKILLS ANIMATION =====
function animateSkills() {
    const skillCards = document.querySelectorAll('.skill-card');
    const skillProgresses = document.querySelectorAll('.skill-progress');

    skillProgresses.forEach(progress => {
        const level = progress.getAttribute('data-level');
        setTimeout(() => {
            progress.style.width = level + '%';
        }, 300);
    });

    // Add stagger animation to cards
    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 80);
    });
}

// Initialize skills animation when section is in view
function initSkillsAnimation() {
    const skillsSection = document.getElementById('skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// ===== TIMELINE ANIMATION =====
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate-in');
        }, index * 200);
    });
}

// Initialize timeline animation when section is in view
function initTimelineAnimation() {
    const educationSection = document.getElementById('education');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTimeline();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    if (educationSection) {
        observer.observe(educationSection);
    }
}

// ===== CERTIFICATIONS ANIMATION =====
function animateCertifications() {
    const certificationCards = document.querySelectorAll('.certification-card');

    certificationCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate-in');
        }, index * 150);
    });
}

// Initialize certifications animation when section is in view
function initCertificationsAnimation() {
    const certificationsSection = document.getElementById('certifications');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCertifications();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    if (certificationsSection) {
        observer.observe(certificationsSection);
    }
}

// ===== PORTFOLIO FUNCTIONALITY =====
// Portfolio Filter Functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active', 'text-white'));
            filterButtons.forEach(b => b.classList.add('text-gray-500'));

            // Add active class to clicked button
            btn.classList.add('active', 'text-white');
            btn.classList.remove('text-gray-500');

            const filter = btn.getAttribute('data-filter');

            // Filter items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        });
    });

    // View details functionality
    const viewDetailButtons = document.querySelectorAll('.view-details');
    viewDetailButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const project = btn.getAttribute('data-project');
            alert(`Project details for ${project} would open in a modal. This is a demo.`);
        });
    });
}

// Portfolio Animation
function animatePortfolio() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate-in');
        }, index * 150);
    });
}

// Initialize portfolio when section is in view
// ===== PORTFOLIO FUNCTIONALITY =====
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => {
                b.classList.remove('active', 'text-white');
                b.classList.add('text-gray-500');
            });

            // Add active class to clicked button
            btn.classList.add('active', 'text-white');
            btn.classList.remove('text-gray-500');

            const filter = btn.getAttribute('data-filter');

            // Filter items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    // Ensure items are visible after filtering
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        });
    });
}

// Portfolio Animation
function animatePortfolio() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    console.log('Animating portfolio items:', portfolioItems.length);

    portfolioItems.forEach((item, index) => {
        // Reset to ensure clean state
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Initialize portfolio when section is in view
function initPortfolioAnimation() {
    const portfolioSection = document.getElementById('portfolio');

    if (!portfolioSection) {
        console.log('Portfolio section not found');
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Portfolio section in view, animating items');
                animatePortfolio();
                initPortfolioFilter();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(portfolioSection);

    // Fallback: If Intersection Observer doesn't trigger
    setTimeout(() => {
        if (portfolioSection.getBoundingClientRect().top < window.innerHeight * 0.8) {
            console.log('Fallback: Animating portfolio');
            animatePortfolio();
            initPortfolioFilter();
        }
    }, 1000);
}

// ===== SERVICES FUNCTIONALITY =====
// Services Animation
function animateServices() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate-in');
        }, index * 150);
    });
}

// Service CTA functionality
function initServiceCTAs() {
    const serviceCTAs = document.querySelectorAll('.service-cta');

    serviceCTAs.forEach(cta => {
        cta.addEventListener('click', function () {
            const serviceTitle = this.closest('.service-card').querySelector('.service-title').textContent;
            // Scroll to contact section
            document.getElementById('contact').scrollIntoView({
                behavior: 'smooth'
            });

            // You could also set a value in a contact form here
            setTimeout(() => {
                alert(`Ready to discuss ${serviceTitle} services! Please fill out the contact form.`);
            }, 1000);
        });
    });
}

// Initialize services animation when section is in view
// ===== SERVICES FUNCTIONALITY =====
// Services Animation
function animateServices() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach((card, index) => {
        // Reset styles first to ensure clean state
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// ===== PROGRESS LINE FUNCTIONALITY =====
// ===== SCROLL PROGRESS LINE =====
function initProgressLine() {
    const progressLine = document.getElementById('progress-line');

    if (!progressLine) {
        console.log('Progress line element not found');
        return;
    }

    let lastScrollTop = 0;
    let isScrollingDown = true;

    function updateProgressLine() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (documentHeight <= 0) return;

        // Calculate scroll percentage
        const scrollPercentage = (scrollTop / documentHeight) * 100;

        // Determine scroll direction
        isScrollingDown = scrollTop > lastScrollTop;
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

        // Update progress line width
        progressLine.style.width = Math.min(100, Math.max(0, scrollPercentage)) + '%';

        // Add direction-based effects
        if (isScrollingDown) {
            progressLine.style.background = 'linear-gradient(90deg, #f97316 0%, #d97706 50%, #fbbf24 100%)';
            progressLine.style.boxShadow = '0 0 15px rgba(249, 115, 22, 0.35)';
        } else {
            progressLine.style.background = 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, #f97316 100%)';
            progressLine.style.boxShadow = '0 0 15px rgba(249, 115, 22, 0.35)';
        }

        // Add glow effect when actively scrolling
        if (scrollPercentage > 1 && scrollPercentage < 99) {
            progressLine.classList.add('opacity-100');
        } else {
            progressLine.classList.remove('opacity-100');
        }
    }

    // Throttle function for performance
    function throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Use throttled update
    const throttledUpdate = throttle(updateProgressLine, 10);

    // Event listeners
    window.addEventListener('scroll', throttledUpdate);
    window.addEventListener('resize', throttledUpdate);
    window.addEventListener('load', updateProgressLine);

    // Initial update
    updateProgressLine();

    console.log('Progress line initialized');
}

// Initialize services animation when section is in view
function initServicesAnimation() {
    const servicesSection = document.getElementById('services');

    if (!servicesSection) {
        console.log('Services section not found');
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Services section in view, animating cards');
                animateServices();
                initServiceCTAs();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Lower threshold for mobile
        rootMargin: '0px 0px -50px 0px' // Trigger when 50px from bottom of viewport
    });

    observer.observe(servicesSection);

    // Fallback: If Intersection Observer doesn't trigger, animate after 1 second
    setTimeout(() => {
        if (servicesSection.getBoundingClientRect().top < window.innerHeight * 0.8) {
            console.log('Fallback: Animating services');
            animateServices();
            initServiceCTAs();
        }
    }, 1000);
}

// ===== GALLERY FUNCTIONALITY =====
// Gallery Data
const galleryData = {
    'cat-island': {
        title: 'Cat Island, Japan',
        description: 'Exploring the famous cat island with adorable feline friends. A unique experience with hundreds of friendly cats roaming freely.',
        tags: ['Nature', 'Cats', 'Island', 'Japan'],
        category: 'travel'
    },
    'flower-festival': {
        title: 'Flower Festival',
        description: 'Beautiful cherry blossoms and traditional Japanese flowers during the spring festival. The colors and atmosphere were breathtaking.',
        tags: ['Flowers', 'Festival', 'Spring', 'Cherry Blossoms'],
        category: 'nature'
    },
    'friends-1': {
        title: 'Friends Gathering',
        description: 'Memorable moments with friends exploring Japan together. Great food, laughter, and unforgettable experiences.',
        tags: ['Friends', 'Travel', 'Memories', 'Fun'],
        category: 'friends'
    },
    'friends-2': {
        title: 'City Exploration',
        description: 'Exploring Japanese cities and cultural landmarks with friends. Discovering hidden gems and local culture.',
        tags: ['City', 'Culture', 'Friends', 'Urban'],
        category: 'friends'
    },
    'temple': {
        title: 'Traditional Temple',
        description: 'Visiting ancient Japanese temples and historical sites. The peace and architecture were truly inspiring.',
        tags: ['Temple', 'History', 'Culture', 'Architecture'],
        category: 'culture'
    },
    'mountain': {
        title: 'Mountain Scenery',
        description: 'Breathtaking views of Japanese mountains and landscapes. Nature at its finest with stunning vistas.',
        tags: ['Mountains', 'Nature', 'Scenery', 'Landscape'],
        category: 'nature'
    }
};

// Gallery Filter Functionality
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active', 'text-white'));
            filterButtons.forEach(b => b.classList.add('text-gray-500'));

            // Add active class to clicked button
            btn.classList.add('active', 'text-white');
            btn.classList.remove('text-gray-500');

            const filter = btn.getAttribute('data-filter');

            // Filter items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        });
    });
}

// Lightbox Functionality
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.getElementById('close-lightbox');
    const prevBtn = document.getElementById('prev-image');
    const nextBtn = document.getElementById('next-image');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxTags = document.getElementById('lightbox-tags');

    let currentImageIndex = 0;
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

    // Open lightbox
    document.querySelectorAll('.view-image').forEach(btn => {
        btn.addEventListener('click', function () {
            const imageId = this.getAttribute('data-image');
            const imageData = galleryData[imageId];

            if (imageData) {
                currentImageIndex = galleryItems.findIndex(item =>
                    item.querySelector('.view-image').getAttribute('data-image') === imageId
                );

                updateLightbox(imageData);
                lightbox.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close lightbox
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navigation
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('hidden')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        }
    });

    function updateLightbox(data) {
        lightboxTitle.textContent = data.title;
        lightboxDescription.textContent = data.description;

        // Update tags
        lightboxTags.innerHTML = '';
        data.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'gallery-tag';
            tagElement.textContent = tag;
            lightboxTags.appendChild(tagElement);
        });
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        const imageId = galleryItems[currentImageIndex].querySelector('.view-image').getAttribute('data-image');
        updateLightbox(galleryData[imageId]);
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        const imageId = galleryItems[currentImageIndex].querySelector('.view-image').getAttribute('data-image');
        updateLightbox(galleryData[imageId]);
    }

    function closeLightbox() {
        lightbox.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Gallery Animation
function animateGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate-in');
        }, index * 150);
    });
}

// Initialize gallery when section is in view
function initGalleryAnimation() {
    const gallerySection = document.getElementById('gallery');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateGallery();
                initGalleryFilter();
                initLightbox();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    if (gallerySection) {
        observer.observe(gallerySection);
    }
}

// ===== CONTACT FORM FUNCTIONALITY =====
// ===== CONTACT FORM FUNCTIONALITY =====
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');

    if (!contactForm) return;

    const submitBtn = contactForm.querySelector('.submit-btn');
    const submitText = contactForm.querySelector('.submit-text');
    const submitIcon = contactForm.querySelector('.submit-icon');
    const submitLoader = contactForm.querySelector('.submit-loader');

    // Initialize EmailJS (Replace with your actual EmailJS public key)
    emailjs.init("AakA3t5WF9wwSEi1y"); // You'll get this from EmailJS dashboard

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Hide previous messages
        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');

        // Show loading state
        submitBtn.disabled = true;
        submitText.textContent = 'Sending...';
        submitIcon.classList.add('hidden');
        submitLoader.classList.remove('hidden');

        try {
            // Send email using EmailJS
            const result = await emailjs.sendForm(
                'service_66v7xoy', // Replace with your service ID
                'template_xtkzatr', // Replace with your template ID
                this
            );

            console.log('Email sent successfully:', result);

            // Show success state
            submitText.textContent = 'Message Sent!';
            submitLoader.classList.add('hidden');
            successMessage.classList.remove('hidden');

            // Reset form after delay
            setTimeout(() => {
                contactForm.reset();
                submitBtn.disabled = false;
                submitText.textContent = 'Send Message';
                submitIcon.classList.remove('hidden');
            }, 3000);

        } catch (error) {
            console.error('Email sending failed:', error);
            
            // Show error state
            submitText.textContent = 'Send Message';
            submitLoader.classList.add('hidden');
            submitIcon.classList.remove('hidden');
            errorMessage.classList.remove('hidden');
            submitBtn.disabled = false;
        }
    });
}

// Contact Section Animation
function animateContactSection() {
    const contactCards = document.querySelectorAll('.contact-card');
    const contactForm = document.querySelector('.contact-form-container');

    contactCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate-in');
        }, index * 200);
    });

    setTimeout(() => {
        if (contactForm) {
            contactForm.classList.add('animate-in');
        }
    }, 600);
}

// Initialize contact section when in view
function initContactAnimation() {
    const contactSection = document.getElementById('contact');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateContactSection();
                initContactForm();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    if (contactSection) {
        observer.observe(contactSection);
    }
}

// ===== PRICING SECTION FUNCTIONALITY =====
function initPricingSection() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    const pricingButtons = document.querySelectorAll('.pricing-cta, [data-i18n="pricing-custom-cta"]');

    // Add click handlers for pricing buttons
    pricingButtons.forEach(button => {
        button.addEventListener('click', function () {
            const planTitle = this.closest('.pricing-card')?.querySelector('.pricing-title')?.textContent || 'Custom Solution';

            // Scroll to contact section
            document.getElementById('contact').scrollIntoView({
                behavior: 'smooth'
            });

            // You could also pre-fill the contact form with the selected plan
            setTimeout(() => {
                console.log(`Selected plan: ${planTitle}`);
                // Here you could set a value in your contact form
            }, 1000);
        });
    });

    console.log('Pricing section initialized');
}

// Initialize when section is in view
function initPricingAnimation() {
    const pricingSection = document.getElementById('pricing');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initPricingSection();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    if (pricingSection) {
        observer.observe(pricingSection);
    }
}


// ===== INITIALIZE ALL FUNCTIONALITY =====
// ===== INITIALIZE ALL FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function () {
    // LanguageManager is initialized in the block below — do not re-create it here

    // Initialize theme and core functionality
    initThemeToggle();
    // Apply card theming after layout settles so all cards are in DOM
    requestAnimationFrame(() => applyCardTheme(document.documentElement.dataset.theme || 'dark'));
    typeEffect();
    checkScroll();
    initSmoothScrolling();
    initProgressLine();
    initPricingAnimation();

    // Initialize section animations
    initSkillsAnimation();
    initTimelineAnimation();
    initCertificationsAnimation();
    initPortfolioAnimation(); // Make sure this is called
    initServicesAnimation();
    initGalleryAnimation();
    initContactAnimation();

    // Force portfolio items to be visible on mobile
    setTimeout(() => {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        });
    }, 500);

    // Add scroll event listener
    window.addEventListener('scroll', checkScroll);
});

// Additional initialization on window load
window.addEventListener('load', function () {
    // Re-check scroll position after all assets are loaded
    checkScroll();
});



// ===== LANGUAGE SWITCHER FUNCTIONALITY =====
class LanguageManager {
    constructor() {
        this.currentLang = 'en';
        this.translations = {
            en: {

                // Pricing Section
                'pricing-title': 'Pricing Plans',
                'pricing-subtitle': 'Affordable packages tailored for your needs with guaranteed support',

                // Pricing Cards
                'pricing-web-design': 'Web Design',
                'pricing-web-dev': 'Web Development',
                'pricing-ecommerce': 'E-commerce Development',
                'pricing-data-analysis': 'Data Analysis & Others',

                // Pricing Badge
                'pricing-badge-best': 'Best Deal',

                // Pricing Features
                'pricing-feature-modern': 'Modern & Responsive UI',
                'pricing-feature-pages': 'Up to 5 Pages',
                'pricing-feature-support': '30 Days Free Support',
                'pricing-feature-satisfaction': '100% Satisfaction Guarantee',
                'pricing-feature-fullstack': 'Full Stack Development',
                'pricing-feature-custom': 'Custom Web Applications',
                'pricing-feature-platforms': 'Shopify, WooCommerce & WordPress Stores',
                'pricing-feature-responsive': 'Responsive Product Pages',
                'pricing-feature-payment': 'Payment Gateway Integration',
                'pricing-feature-support-guarantee': '30 Days Free Support & Guarantee',
                'pricing-feature-visualization': 'Data Visualization & Insights',
                'pricing-feature-python': 'Python, Pandas, Matplotlib, Seaborn',
                'pricing-feature-api': 'API Development',

                // Pricing CTA
                'pricing-cta-get-started': 'Get Started',

                // Custom Solution
                'pricing-custom-title': 'Need a Custom Solution?',
                'pricing-custom-desc': 'Let\'s discuss your specific requirements and create a tailored package just for you.',
                'pricing-custom-cta': 'Discuss Your Project',
                // Navigation
                'nav-home': 'Home',
                'nav-about': 'About',
                'nav-skills': 'Skills',
                'nav-journey': 'Journey',
                'nav-education': 'Education',
                'nav-certifications': 'Certifications',
                'nav-portfolio': 'Portfolio',
                'nav-services': 'Services',
                'nav-gallery': 'Gallery',
                'nav-contact': 'Contact',

                // Section headings with gradient spans (uses innerHTML)
                'about-title': 'About <span class="gradient-text">Me</span>',
                'journey-title': 'My Academic & <span class="gradient-text">Career Journey</span>',
                'experience-title': 'Work <span class="gradient-text">Experience</span>',
                'featured-title': 'Featured <span class="gradient-text">Solutions</span>',

                // Experience — Freelance role
                'experience-freelance': 'Freelance Full Stack Architect',
                'experience-freelance-company': 'Independent Consulting',
                'experience-freelance-date': 'August 2024 – Present',
                'experience-freelance-desc': 'Formulating tailored, robust web architectures and cloud microservices for modern international startups and research labs.',
                'experience-freelance-li1': 'Design elegant Next.js, React, and Tailwind structures linked to cloud database engines.',
                'experience-freelance-li2': 'Automate data pipelines, customer dashboards, and AI integrations (Cursor, OpenAI, Claude).',
                'experience-freelance-li3': 'Develop SEO blueprints to optimize storefront index ratings across major search frameworks.',

                // Services — AI Powered Apps (new)
                'service-ai-apps': 'AI Powered Apps',
                'service-ai-apps-desc': 'Build intelligent applications using LangChain, FastAPI, Hugging Face models, Vector DBs, and RAG pipelines.',
                'service-ai-apps-f1': 'LangChain & RAG Pipelines',
                'service-ai-apps-f2': 'FastAPI & Vector DBs',

                // Hero Section
                'hero-available': 'Open to International Opportunities',
                'hero-senior-level': 'Senior Level',
                'hero-tag-scholar': 'MEXT Scholar',
                'hero-tag-projects': '50+ Projects Shipped',
                'hero-tag-ai': 'AI-Driven Dev',
                'hero-tag-location': 'Fukuoka, Japan',
                'hero-title-1': 'Full-stack',
                'hero-title-2': 'Web Engineer',
                'hero-title-3': 'MEXT Scholar',
                'hero-builds': 'I build with',
                'hero-description': 'Senior Full-Stack Engineer & MEXT Scholar with 3+ years delivering production-grade systems used globally. Expert in MERN, TypeScript, PHP (Laravel) and AI-driven development. M.Sc. Candidate in Applied Information Systems, University of Kitakyushu, Japan.',
                'hero-cta-work': 'View Projects',
                'hero-cta-contact': 'Get In Touch',
                'hero-cta-resume': 'Download CV',
                'hero-projects': 'Projects Done',
                'hero-experience': 'Years Exp.',
                'hero-satisfaction': 'Satisfaction',
                'hero-scroll': 'Explore More',

                // About Section
                'about-personal-story': 'Personal Story',
                'about-personal-story-text': 'My passion is combining engineering and technology to solve complex digital challenges. Over the past 3+ years, I have built production-ready applications using Laravel, React, and Python, helping global teams increase product velocities. Currently, as a MEXT Scholar in Kitakyushu, Japan, I am researching Traffic Psychology and Autonomous Vehicle Simulations inside the CARLA Simulator framework to analyze human-vehicle interaction and enhance roadway safety systems.',
                'about-mission-title': 'My Mission',
                'about-mission-text': 'Build robust and performant software systems that solve real-world human behavior challenges using AI and data.',
                'about-research-title': 'Research Focus',
                'about-research-text': 'Applying machine learning and simulated environments (CARLA) to study traffic safety, behavior, and automation.',
                'about-projects-desc': 'Full-stack, WordPress & Shopify products deployed worldwide.',
                'about-experience-desc': 'Professional engineering and team collaboration experience.',
                'about-global-title': 'Global Scope',
                'about-global-desc': 'Available for Remote, JP, AUS & worldwide.',
                'about-bilingual-title': 'Bilingual Engine',
                'about-bilingual-desc': 'Conversational Japanese (JLPT N4/N3 Candidate)',
                'about-satisfaction-title': '100% Satisfaction',

                // AI Research Section
                'ai-research-badge': 'Autonomous Simulation',
                'ai-research-title': 'AI Research &<br><span class="gradient-text">Traffic Psychology</span>',
                'ai-research-desc': 'Combining information systems with behavioral data science. I hold professional experience researching driver interactions and roadway metrics within the CARLA Simulator platform (built on Unreal Engine 5). I analyze high-dimensional safety scenarios, studying psychology factors and automated vehicle reactions to improve future traffic architectures.',
                'ai-research-li1': 'CARLA Autonomous Simulations & Unreal Engine Integration',
                'ai-research-li2': 'Interactive node analyses & behavioral datasets',
                'ai-research-li3': 'Traffic safety modeling & simulation algorithms',

                // Skills Section
                'skills-title': 'Technical <span class="gradient-text">Ecosystem</span>',
                'skills-subtitle': 'Full-stack, AI Engineering & Research tools I ship with',

                // Skills Categories
                'skill-cat-frontend': 'Frontend & UI',
                'skill-cat-backend': 'Backend & Frameworks',
                'skill-cat-ai': 'AI Engineering',
                'skill-cat-research': 'Research & Simulation',
                'skill-cat-devops': 'DevOps & Deployment',
                'skill-cat-cms': 'CMS & E-Commerce',

                // Skill Names & Descriptions
                'skill-react': 'React & Next.js',
                'skill-react-desc': 'Single Page Apps & Server Rendered',
                'skill-js': 'JavaScript & TypeScript',
                'skill-js-desc': 'Typed and dynamic programming',
                'skill-html': 'HTML5, CSS3 & Tailwind',
                'skill-html-desc': 'Responsive layouts and animations',
                'skill-php': 'PHP & Laravel',
                'skill-php-desc': 'Enterprise APIs & MVC Structures',
                'skill-node': 'Node.js & Express',
                'skill-node-desc': 'REST APIs & real-time scripting',
                'skill-db': 'MySQL, MongoDB & Redis',
                'skill-db-desc': 'Relational, document & cache stores',
                'skill-python': 'Python & FastAPI',
                'skill-python-desc': 'AI backends, async APIs, ML pipelines',
                'skill-langchain': 'LangChain & RAG',
                'skill-langchain-desc': 'Hugging Face, Vector DBs, LLM chains',
                'skill-claude': 'Claude Code & Cursor AI',
                'skill-claude-desc': 'Agentic AI-driven engineering',
                'skill-carla': 'CARLA Simulator',
                'skill-carla-desc': 'Autonomous driving research & datasets',
                'skill-ue5': 'Unreal Engine 5',
                'skill-ue5-desc': '3D simulation environments',
                'skill-pandas': 'Data Analysis & Pandas',
                'skill-pandas-desc': 'Traffic datasets, behavioral metrics',
                'skill-docker': 'Docker & Containers',
                'skill-docker-desc': 'Containerized deployments & CI/CD',
                'skill-git': 'Git & GitHub Actions',
                'skill-git-desc': 'Version control & automated pipelines',
                'skill-vercel': 'Vercel, Netlify & VPS',
                'skill-vercel-desc': 'Cloud deploys, nginx, SSH, domains',
                'skill-wordpress': 'WordPress & WooCommerce',
                'skill-wordpress-desc': 'Custom themes & plugin development',
                'skill-shopify': 'Shopify & Liquid',
                'skill-shopify-desc': 'Custom storefronts & e-commerce flows',
                'skill-seo': 'SEO & Digital Marketing',
                'skill-seo-desc': 'Google Ads, Analytics, conversion CRO',

                // Education Section
                'education-title': 'Education & Experience',
                'education-subtitle': 'My academic journey and professional path',
                'education-masters': 'MEXT Scholarship Scholar',
                'education-masters-date': 'October 2024 – September 2026',
                'education-masters-desc': 'Researching driver psychology, simulation metrics, and machine learning utilizing autonomous systems simulators (CARLA) to optimize roadway designs.',
                'education-bachelors': 'BS Information Technology',
                'education-bachelors-date': 'September 2016 – September 2020',
                'education-bachelors-desc': "Completed Bachelor's in IT with deep focus on algorithms, data structures, database designs, and foundational software engineering methodologies.",
                'journey-date-1': 'Sep 2016 – 2020',
                'journey-date-2': 'Jan 2021 – Aug 2024',
                'journey-date-3': 'Oct 2024 – Present',
                'journey-mext-desc': "Awarded the prestigious Japanese Government MEXT Scholarship to pursue a Master's degree in Applied Information Systems at the University of Kitakyushu.",
                'journey-current-label': 'Current Theme',
                'journey-research-title': 'Traffic Psychology Research',
                'experience-fullstack': 'Full Stack Engineer',
                'experience-fullstack-date': 'January 2021 - August 2024',
                'experience-fullstack-desc': 'Developed and maintained web applications using modern technologies. Worked on both frontend and backend development.',
                'experience-teacher': 'Computer Teacher',
                'experience-teacher-desc': 'Taught various computer science subjects including web development, digital marketing, and software tools.',

                // Certifications Section
                'certifications-title': 'My Certifications',
                'certifications-subtitle': 'Validating my expertise and continuous learning journey',
                'cert-scientific': 'Scientific Computing With Python',
                'cert-scientific-desc': 'Mastered Python programming, data structures, algorithms, and scientific computing concepts.',
                'cert-data-analysis': 'Data Analysis with Python',
                'cert-data-analysis-desc': 'Learned data analysis, visualization, and manipulation using Python libraries like Pandas and NumPy.',
                'cert-digital-marketing': 'Google Digital Marketing',
                'cert-digital-marketing-desc': 'Comprehensive digital marketing training covering SEO, SEM, social media, and analytics.',
                'cert-web-dev': 'Full Stack Web Development',
                'cert-web-dev-desc': 'Continuous learning in modern web technologies including React, Node.js, and cloud platforms.',
                'cert-ai': 'AI & Machine Learning',
                'cert-ai-desc': 'Researching AI applications in traffic psychology and data science for Masters degree.',
                'cert-ecommerce': 'E-commerce Development',
                'cert-ecommerce-desc': 'Extensive experience building and optimizing e-commerce platforms and online stores.',
                'cert-cta-title': 'Continuous Learning Journey',
                'cert-cta-desc': 'I believe in lifelong learning and constantly updating my skills with the latest technologies and methodologies.',
                'cert-cta-button': 'Start a Project With Me',

                // Portfolio Section
                'portfolio-title': 'My Portfolio',
                'portfolio-subtitle': 'Some of my projects in Web Development & Design',
                'filter-all': 'All Projects',
                'filter-wordpress': 'WordPress',
                'filter-ecommerce': 'E-Commerce',
                'filter-ai': 'AI & Data',
                'filter-web-app': 'Web Apps',
                'filter-other': 'Others',

                // Project Titles
                'project-expense-iq': 'Expense IQ — Income & Expense Tracker',
                'project-modern-pos': 'Modern POS Application',
                'project-windows-11': 'Windows 11 Web Clone',
                'project-bakery': 'Bakery Website',
                'project-travelx': 'Travelx Travel Website',
                'project-ai': 'AI tools SAAS website',
                'project-atoms': 'Interactive 3D Atom Simulator',
                'project-def': 'Galactic Defender',
                'project-digizone': 'Digizone',
                'project-longs-cafe': 'Longs Cafe Website',
                'project-code-helper-toolkit': 'Code Helper Toolkit',
                'project-transporto': 'Transporto – Modern Transportation Website',
                'project-saas-dashboard': 'SaaS Analytics Dashboard',

                // Project Descriptions
                'project-expense-iq-desc': 'A production-ready, fully responsive MERN stack web application for tracking income and expenses with real-time updates and dynamic charts.',
                'project-modern-pos-desc': 'A professional, modern, and fully responsive Point of Sale frontend web application built with React, Vite, and Tailwind CSS v4. It simulates a real-world cashier system with a polished UI and smooth UX.',
                'project-windows-11-desc': 'Browser-based Windows 11 interface clone with responsive desktop UI and interactive app windows.',
                'project-bakery-desc': 'Responsive bakery website with product showcase, menu highlights, and customer-friendly ordering flow.',
                'project-travelx-desc': 'Modern travel agency website featuring destination highlights, service booking, and immersive trip planning design.',
                'project-ai-desc': 'AI tools SaaS landing page showcasing product capabilities, pricing, and marketing messaging.',
                'project-atoms-desc': 'Interactive 3D atomic model built with HTML, Tailwind CSS, and Three.js.',
                'project-def-desc': 'Retro 2D vertical space shooter crafted with HTML, CSS, and JavaScript for browser gameplay.',
                'project-digizone-desc': 'Digital services e-commerce website built with modern UX, fast performance, and conversion-focused layout.',
                'project-longs-cafe-desc': 'University lab matcha website with clean product presentation, easy ordering, and polished UX.',
                'project-code-helper-toolkit-desc': 'Developer toolkit hub offering lightweight utilities and a built-in HTML/CSS/JavaScript compiler for faster workflow.',
                'project-transporto-desc': 'Modern transportation website for logistics and delivery businesses, optimized for performance and conversion.',
                'project-saas-dashboard-desc': 'Production-ready SaaS analytics dashboard built with Next.js, Tailwind CSS, and shadcn/ui for clear visual reporting.',
                'project-customer-churn-desc': 'Machine learning solution for telecom churn prediction, delivering data-driven insights for retention.',
                'project-datahive-desc': 'Analytics landing page designed to showcase data products with polished visuals and high-converting messaging.',
                'project-invoice-desc': 'Invoice generation tool with intuitive workflow for creating professional invoices quickly.',
                'project-sentiment-desc': 'AI-powered sentiment analysis tool with real-time text insights and classification.',
                'project-estores-desc': 'Professional WordPress business website with service showcases and conversion-oriented layout for Estores Experts.',
                'project-digits-desc': 'Consulting website for 7 Digits Hub highlighting services, trust, and responsive business branding.',
                'project-expert-desc': 'WordPress e-commerce website for Expert Estores with polished product presentation and user-focused design.',
                'project-unique-desc': 'Web hosting company website featuring service plans, support highlights, and modern hosting branding.',
                'project-zoobounty-desc': 'Pet e-commerce website with clean product discovery and responsive shopping flow.',
                'project-travel-desc': 'Travel agency website built to highlight tours, packages, and booking-ready services.',
                'project-swif-desc': 'Digital marketing agency website showcasing campaigns, client services, and lead generation design.',
                'project-reblate-desc': 'Agency website featuring services, client success stories, and a trust-building visual layout.',
                'project-crm-desc': 'JavaScript and Laravel CRM application for managing customer relationships, pipelines, and operations.',
                'project-firex-desc': 'Unity and C# game project delivering an action-packed experience with polished visuals and controls.',

                // Portfolio CTA
                'portfolio-cta': 'Want to See More? Let\'s Talk',

                // Services Section
                'services-title': 'My Services',
                'services-subtitle': 'Helping you build, optimize, and scale your online presence',
                'service-design': 'Web Design & UI/UX',
                'service-design-desc': 'Crafting modern, responsive, and visually appealing websites optimized for user experience and conversion rates.',
                'service-dev': 'Web Development',
                'service-dev-desc': 'Building scalable and high-performance websites using modern technologies and best practices.',
                'service-ecommerce': 'E-Commerce Development',
                'service-ecommerce-desc': 'Creating custom online stores with Shopify, WooCommerce tailored for your business growth.',
                'service-wordpress': 'WordPress Development',
                'service-wordpress-desc': 'Custom WordPress themes, plugins, and full website development with SEO optimization.',
                'service-ai': 'AI & Data Solutions',
                'service-ai-desc': 'Implementing AI solutions, data analysis, and machine learning for your business intelligence.',
                'service-maintenance': 'Maintenance & Support',
                'service-maintenance-desc': 'Ongoing website maintenance, updates, security, and technical support services.',
                'service-feature-1': 'Responsive Design',
                'service-feature-2': 'User Experience',
                'service-feature-3': 'Modern UI',
                'service-feature-4': 'Full Stack',
                'service-feature-5': 'API Integration',
                'service-feature-6': 'Performance',
                'service-feature-7': 'Shopify Stores',
                'service-feature-8': 'Payment Integration',
                'service-feature-9': 'Inventory Management',
                'service-feature-10': 'Custom Themes',
                'service-feature-11': 'Plugin Development',
                'service-feature-12': 'SEO Ready',
                'service-feature-13': 'Data Analysis',
                'service-feature-14': 'Machine Learning',
                'service-feature-15': 'AI Integration',
                'service-feature-16': 'Regular Updates',
                'service-feature-17': 'Security Monitoring',
                'service-feature-18': 'Technical Support',
                'service-cta': 'Get Started',
                'services-main-cta-title': 'Ready to Start Your Project?',
                'services-main-cta-desc': 'Let\'s discuss your ideas and create something amazing together. I\'m here to help bring your vision to life.',
                'services-cta-contact': 'Get In Touch',
                'services-cta-portfolio': 'View My Work',

                // Gallery Section
                'gallery-title': 'My Travel Gallery',
                'gallery-subtitle': 'Moments captured from my travels and adventures in Japan',
                'gallery-cat-island': 'Cat Island, Japan',
                'gallery-cat-island-desc': 'Exploring the famous cat island with adorable feline friends',
                'gallery-flower-festival': 'Flower Festival',
                'gallery-flower-festival-desc': 'Beautiful cherry blossoms and traditional Japanese flowers',
                'gallery-friends-1': 'Friends Gathering',
                'gallery-friends-1-desc': 'Memorable moments with friends exploring Japan together',
                'gallery-friends-2': 'City Exploration',
                'gallery-friends-2-desc': 'Exploring Japanese cities and cultural landmarks with friends',
                'gallery-temple': 'Traditional Temple',
                'gallery-temple-desc': 'Visiting ancient Japanese temples and historical sites',
                'gallery-mountain': 'Mountain Scenery',
                'gallery-mountain-desc': 'Breathtaking views of Japanese mountains and landscapes',
                'filter-photos-all': 'All Photos',
                'filter-photos-travel': 'Travel',
                'filter-photos-nature': 'Nature',
                'filter-photos-friends': 'Friends',
                'filter-photos-culture': 'Culture',
                'gallery-cta-title': 'More Adventures Coming Soon!',
                'gallery-cta-desc': 'I\'m constantly exploring new places and capturing memories. Follow my journey for more updates!',
                'gallery-cta-button': 'Share Your Travel Stories',

                // Contact Section
                'contact-title': 'Let\'s Connect',
                'contact-subtitle': 'Get in touch and let\'s create something amazing together',
                'contact-email': 'Email Me',
                'contact-location': 'Location',
                'contact-availability': 'Availability',
                'contact-follow': 'Follow Me',
                'contact-send-email': 'Send Email',
                'contact-based-in': 'Currently based in Japan for Masters studies',
                'contact-open-projects': 'Open for freelance projects',
                'contact-quick-response': 'Quick response within 24 hours',
                'form-name': 'Full Name',
                'form-email': 'Email Address',
                'form-subject': 'Subject',
                'form-message': 'Message',
                'form-name-placeholder': 'Enter your full name',
                'form-email-placeholder': 'Enter your email address',
                'form-subject-placeholder': 'What is this regarding?',
                'form-message-placeholder': 'Tell me about your project...',
                'form-submit': 'Send Message',
                'form-sending': 'Sending...',
                'form-sent': 'Message Sent!',

                // Footer
                'footer-brand-desc': 'Full Stack Developer & AI Enthusiast crafting digital experiences with modern technologies. Based in Japan, creating innovative solutions worldwide.',
                'footer-cv-en': 'CV English',
                'footer-cv-jp': 'CV 日本語',
                'footer-cv-download': 'Download CV',
                'footer-quick-links': 'Quick Links',
                'footer-services': 'Services',
                'footer-copyright': '&copy; 2024 Muhammad Kamran. All rights reserved.',
                'footer-privacy': 'Privacy Policy',
                'footer-terms': 'Terms of Service'
            },
            jp: {
                // Navigation
                'nav-home': 'ホーム',
                'nav-about': '自己紹介',
                'nav-skills': 'スキル',
                'nav-journey': '歩み',
                'nav-education': '学歴',
                'nav-certifications': '資格',
                'nav-portfolio': 'ポートフォリオ',
                'nav-services': 'サービス',
                'nav-gallery': 'ギャラリー',
                'nav-contact': 'お問い合わせ',

                // Section headings with gradient spans (uses innerHTML)
                'about-title': '自己<span class="gradient-text">紹介</span>',
                'journey-title': '学歴・<span class="gradient-text">キャリアの歩み</span>',
                'experience-title': '職務<span class="gradient-text">経験</span>',
                'featured-title': '注目の<span class="gradient-text">プロジェクト</span>',

                // Experience — Freelance role
                'experience-freelance': 'フリーランス フルスタックアーキテクト',
                'experience-freelance-company': '独立コンサルティング',
                'experience-freelance-date': '2024年8月 – 現在',
                'experience-freelance-desc': '国際的なスタートアップや研究所向けに、カスタマイズされた堅牢なウェブアーキテクチャとクラウドマイクロサービスを構築。',
                'experience-freelance-li1': 'クラウドデータベースエンジンと連携したNext.js、React、Tailwindの構築。',
                'experience-freelance-li2': 'データパイプライン、顧客ダッシュボード、AI統合（Cursor、OpenAI、Claude）の自動化。',
                'experience-freelance-li3': '主要な検索エンジンでのストアフロントのSEO最適化。',

                // Services — AI Powered Apps (new)
                'service-ai-apps': 'AIパワードアプリ',
                'service-ai-apps-desc': 'LangChain、FastAPI、Hugging Face、Vector DB、RAGパイプラインを使用したインテリジェントアプリの構築。',
                'service-ai-apps-f1': 'LangChain & RAGパイプライン',
                'service-ai-apps-f2': 'FastAPI & ベクターDB',

                // Hero Section
                'hero-available': '国際的な機会を求めて',
                'hero-senior-level': 'シニアレベル',
                'hero-tag-scholar': '文部科学省奨学生',
                'hero-tag-projects': '50以上のプロジェクト完了',
                'hero-tag-ai': 'AI駆動開発',
                'hero-tag-location': '福岡、日本',
                'hero-title-1': 'フルスタック',
                'hero-title-2': 'Webエンジニア',
                'hero-title-3': '文部科学省奨学生',
                'hero-builds': '使用技術',
                'hero-description': '3年以上の実績を持つシニアフルスタックエンジニア & 文部科学省奨学生。MERNスタック、TypeScript、PHP（Laravel）を専門とし、世界規模で使用される本番システムを構築。AI駆動開発（Claude Code、Cursor）を活用し、チーム効率を向上。北九州市立大学応用情報システム研究科修士課程在学中。',
                'hero-cta-work': 'プロジェクトを見る',
                'hero-cta-contact': 'お問い合わせ',
                'hero-cta-resume': '履歴書をダウンロード',
                'hero-projects': 'プロジェクト完了',
                'hero-experience': '年の経験',
                'hero-satisfaction': '満足度',
                'hero-scroll': 'もっと見る',

                // About Section
                'about-personal-story': 'パーソナルストーリー',
                'about-personal-story-text': '私の情熱は、エンジニアリングとテクノロジーを組み合わせて複雑なデジタル課題を解決することです。過去3年以上、Laravel、React、Pythonを使用して本番対応のアプリケーションを構築し、グローバルチームの開発速度向上に貢献してきました。現在は、北九州市立大学のMEXT奨学生として、CARLAシミュレーターフレームワーク内で交通心理学と自律走行シミュレーションを研究し、人間と車両の相互作用を分析して道路安全システムの改善に取り組んでいます。',
                'about-mission-title': 'ミッション',
                'about-mission-text': 'AIとデータを活用して、現実世界の人間行動の課題を解決する堅牢で高性能なソフトウェアシステムを構築する。',
                'about-research-title': '研究テーマ',
                'about-research-text': '機械学習とシミュレーション環境（CARLA）を活用し、交通安全、行動、自動化の研究を行う。',
                'about-projects-desc': '世界中に展開されたフルスタック・WordPress・Shopify製品。',
                'about-experience-desc': 'プロフェッショナルなエンジニアリングとチームコラボレーションの経験。',
                'about-global-title': 'グローバル対応',
                'about-global-desc': 'リモート・日本・オーストラリア・世界中で対応可能。',
                'about-bilingual-title': 'バイリンガル対応',
                'about-bilingual-desc': '日常会話レベルの日本語（JLPT N4/N3 受験予定）',
                'about-satisfaction-title': '100%満足保証',

                // AI Research Section
                'ai-research-badge': '自律シミュレーション',
                'ai-research-title': 'AI研究と<br><span class="gradient-text">交通心理学</span>',
                'ai-research-desc': '情報システムと行動データサイエンスを組み合わせた研究を行っています。Unreal Engine 5上に構築されたCARLAシミュレータープラットフォームでドライバーの行動と道路指標を研究した実務経験を持ち、高次元の安全シナリオを分析して将来の交通アーキテクチャの改善に取り組んでいます。',
                'ai-research-li1': 'CARLAによる自律走行シミュレーションとUnreal Engine統合',
                'ai-research-li2': 'インタラクティブなノード分析と行動データセット',
                'ai-research-li3': '交通安全モデリングとシミュレーションアルゴリズム',

                // Skills Section
                'skills-title': '技術<span class="gradient-text">エコシステム</span>',
                'skills-subtitle': 'フルスタック・AI・リサーチで使用する技術スタック',

                // Skills Categories
                'skill-cat-frontend': 'フロントエンド & UI',
                'skill-cat-backend': 'バックエンド & フレームワーク',
                'skill-cat-ai': 'AIエンジニアリング',
                'skill-cat-research': 'リサーチ & シミュレーション',
                'skill-cat-devops': 'DevOps & デプロイ',
                'skill-cat-cms': 'CMS & Eコマース',

                // Skill Names & Descriptions
                'skill-react': 'React & Next.js',
                'skill-react-desc': 'SPA & サーバーサイドレンダリング',
                'skill-js': 'JavaScript & TypeScript',
                'skill-js-desc': '型付き & 動的プログラミング',
                'skill-html': 'HTML5, CSS3 & Tailwind',
                'skill-html-desc': 'レスポンシブレイアウト & アニメーション',
                'skill-php': 'PHP & Laravel',
                'skill-php-desc': 'エンタープライズAPI & MVC構造',
                'skill-node': 'Node.js & Express',
                'skill-node-desc': 'REST API & リアルタイム処理',
                'skill-db': 'MySQL, MongoDB & Redis',
                'skill-db-desc': 'リレーショナル・ドキュメント・キャッシュDB',
                'skill-python': 'Python & FastAPI',
                'skill-python-desc': 'AIバックエンド・非同期API・MLパイプライン',
                'skill-langchain': 'LangChain & RAG',
                'skill-langchain-desc': 'Hugging Face・ベクターDB・LLMチェーン',
                'skill-claude': 'Claude Code & Cursor AI',
                'skill-claude-desc': 'エージェント型AI駆動エンジニアリング',
                'skill-carla': 'CARLAシミュレーター',
                'skill-carla-desc': '自動運転研究 & データセット収集',
                'skill-ue5': 'Unreal Engine 5',
                'skill-ue5-desc': '3Dシミュレーション環境',
                'skill-pandas': 'データ分析 & Pandas',
                'skill-pandas-desc': '交通データセット・行動指標分析',
                'skill-docker': 'Docker & コンテナ',
                'skill-docker-desc': 'コンテナデプロイ & CI/CD',
                'skill-git': 'Git & GitHub Actions',
                'skill-git-desc': 'バージョン管理 & 自動パイプライン',
                'skill-vercel': 'Vercel, Netlify & VPS',
                'skill-vercel-desc': 'クラウドデプロイ・nginx・SSH・ドメイン',
                'skill-wordpress': 'WordPress & WooCommerce',
                'skill-wordpress-desc': 'カスタムテーマ & プラグイン開発',
                'skill-shopify': 'Shopify & Liquid',
                'skill-shopify-desc': 'カスタムストアフロント & ECフロー',
                'skill-seo': 'SEO & デジタルマーケティング',
                'skill-seo-desc': 'Google広告・アナリティクス・CRO最適化',

                // Education Section
                'education-title': '学歴と職歴',
                'education-subtitle': '私の学業とキャリアの歩み',
                'education-masters': 'MEXT奨学金留学生',
                'education-masters-date': '2024年10月 – 2026年9月',
                'education-masters-desc': 'ドライバー心理学、シミュレーション指標、自律システムシミュレーター（CARLA）を活用した機械学習を研究し、道路設計の最適化を目指しています。',
                'education-bachelors': '情報技術学士',
                'education-bachelors-date': '2016年9月 – 2020年9月',
                'education-bachelors-desc': 'アルゴリズム、データ構造、データベース設計、ソフトウェア工学の基礎に深く取り組み、IT学士号を取得しました。',
                'journey-date-1': '2016年9月 – 2020年',
                'journey-date-2': '2021年1月 – 2024年8月',
                'journey-date-3': '2024年10月 – 現在',
                'journey-mext-desc': '日本政府文部科学省（MEXT）奨学金を授与され、北九州市立大学で応用情報システム学修士号を取得するために来日しました。',
                'journey-current-label': '現在のテーマ',
                'journey-research-title': '交通心理学研究',
                'experience-fullstack': 'フルスタックエンジニア',
                'experience-fullstack-date': '2021年1月 - 2024年8月',
                'experience-fullstack-desc': '最新技術を使用したWebアプリケーションの開発と保守。フロントエンドとバックエンドの両方の開発に携わりました。',
                'experience-teacher': 'コンピューター講師',
                'experience-teacher-desc': 'Web開発、デジタルマーケティング、ソフトウェアツールを含む様々なコンピューターサイエンス科目を教えました。',

                // Certifications Section
                'certifications-title': '資格と認定',
                'certifications-subtitle': '専門知識と継続的な学習の証',
                'cert-scientific': 'Pythonによる科学計算',
                'cert-scientific-desc': 'Pythonプログラミング、データ構造、アルゴリズム、科学計算の概念を習得しました。',
                'cert-data-analysis': 'Pythonによるデータ分析',
                'cert-data-analysis-desc': 'PandasやNumPyなどのPythonライブラリを使用したデータ分析、可視化、操作を学びました。',
                'cert-digital-marketing': 'Google デジタルマーケティング',
                'cert-digital-marketing-desc': 'SEO、SEM、ソーシャルメディア、アナリティクスを網羅した包括的なデジタルマーケティングトレーニング。',
                'cert-web-dev': 'フルスタックWeb開発',
                'cert-web-dev-desc': 'React、Node.js、クラウドプラットフォームを含む最新のWeb技術の継続的な学習。',
                'cert-ai': 'AI & 機械学習',
                'cert-ai-desc': '修士号のための交通心理学とデータサイエンスにおけるAIアプリケーションの研究。',
                'cert-ecommerce': 'Eコマース開発',
                'cert-ecommerce-desc': 'Eコマースプラットフォームとオンラインストアの構築と最適化の豊富な経験。',
                'cert-cta-title': '継続的な学習の旅',
                'cert-cta-desc': '生涯学習を信じ、最新の技術と方法論で常にスキルを更新しています。',
                'cert-cta-button': 'プロジェクトを始める',

                // Portfolio Section
                'portfolio-title': 'ポートフォリオ',
                'portfolio-subtitle': 'Web開発とデザインのプロジェクト',
                'filter-all': 'すべてのプロジェクト',
                'filter-wordpress': 'WordPress',
                'filter-ecommerce': 'Eコマース',
                'filter-ai': 'AI & データ',
                'filter-web-app': 'Webアプリ',
                'filter-other': 'その他',

                // Project Titles
                'project-expense-iq': 'Expense IQ — 収支管理トラッカー',
                'project-modern-pos': 'モダンPOSアプリケーション',
                'project-windows-11': 'Windows 11 Webクローン',
                'project-bakery': 'ベーカリーウェブサイト',
                'project-travelx': 'トラベルエックス旅行ウェブサイト',
                'project-ai': 'AIツールSaaSウェブサイト',
                'project-atoms': 'インタラクティブ3D原子シミュレーター',
                'project-def': 'ギャラクティックディフェンダー',
                'project-digizone': 'Digizone',
                'project-longs-cafe': 'Longs Cafe ウェブサイト',
                'project-code-helper-toolkit': 'Code Helper Toolkit',
                'project-transporto': 'Transporto – Modern Transportation Website',
                'project-saas-dashboard': 'SaaS Analytics Dashboard',

                // Project Descriptions
                'project-expense-iq-desc': '収益と支出を追跡する本番対応のMERNスタックウェブアプリで、リアルタイム更新と動的チャートを備えています。',
                'project-modern-pos-desc': 'プロフェッショナルでモダン、完全レスポンシブなPOSフロントエンドアプリで、React、Vite、Tailwind CSS v4を使用し、実際のレジシステムを洗練されたUIとスムーズなUXで再現します。',
                'project-windows-11-desc': 'ブラウザで使えるWindows 11インターフェイスのクローン。レスポンシブなデスクトップUIとインタラクティブなウィンドウが特徴です。',
                'project-bakery-desc': '商品紹介、メニュー、顧客に優しい注文フローを備えたレスポンシブなベーカリーサイトです。',
                'project-travelx-desc': '目的地の魅力を伝え、予約を促すトラベルサイトです。',
                'project-ai-desc': 'AIツールの機能、価格、魅力的なマーケティングメッセージを紹介するSaaSランディングページです。',
                'project-atoms-desc': 'HTML、Tailwind CSS、Three.jsを使って作成したインタラクティブな3D原子モデル体験です。',
                'project-def-desc': 'HTML、CSS、JavaScriptで構築されたレトロなブラウザ向け2D縦スクロールシューティングゲームです。',
                'project-digizone-desc': 'デジタルサービスをモダンなUXで紹介し、コンバージョンを重視したEコマースサイトです。',
                'project-longs-cafe-desc': '抹茶販売を目的とした大学研究室のサイト。商品表示と注文フローが洗練されています。',
                'project-code-helper-toolkit-desc': '毎日のコーディング作業を簡素化するために設計された、高速で軽量な開発者向けツール集です。HTML/CSS/JavaScriptコンパイラを内蔵しています。🚀',
                'project-transporto-desc': '物流、貨物、タクシー、配送サービス向けのモダンでレスポンシブなウェブサイトです。性能とコンバージョンを重視した設計が特徴です。',
                'project-saas-dashboard-desc': 'Next.js、Tailwind CSS、shadcn/uiで構築された実運用対応のSaaS分析ダッシュボードです。明確なビジュアルレポートとスケーラブルな構造を提供します。',
                'project-customer-churn-desc': '通信業界向けの顧客離脱予測ソリューション。データ駆動型の洞察を提供します。',
                'project-datahive-desc': 'データ製品を魅力的に紹介する、洗練されたビジュアルと高いコンバージョンを目指したランディングページです。',
                'project-invoice-desc': 'プロフェッショナルな請求書を素早く作成できる、直感的なワークフローを備えた請求書作成ツールです。',
                'project-sentiment-desc': 'リアルタイムのテキストインサイトと視覚化レポートを提供するAI感情分析ツールです。',
                'project-estores-desc': 'サービス紹介とコンバージョン重視のレイアウトを備えたEstores Expertsのプロフェッショナルサイトです。',
                'project-digits-desc': 'サービス、信頼性、レスポンシブなブランド体験を強調した7 Digits Hubのコンサルティングサイトです。',
                'project-expert-desc': '商品紹介とユーザー重視のデザインを備えたExpert EstoresのWordPress eコマースサイトです。',
                'project-unique-desc': 'ホスティングプラン、サポートの強み、企業向けブランディングを備えたウェブホスティング会社サイトです。',
                'project-zoobounty-desc': 'ペット製品のクリーンな商品発見とレスポンシブなショッピングフローを備えたeコマースサイトです。',
                'project-travel-desc': 'ツアーやパッケージを紹介し、予約につながるサービスページを備えた旅行サイトです。',
                'project-swif-desc': 'キャンペーンとサービスを紹介する、リード獲得に特化したデジタルマーケティングサイトです。',
                'project-reblate-desc': 'サービス、プロジェクト、実績を信頼感あるレイアウトで紹介するエージェンシーサイトです。',
                'project-crm-desc': '顧客関係、営業パイプライン、業務ワークフローを管理するJavaScriptとLaravelベースのCRMアプリです。',
                'project-firex-desc': '洗練されたビジュアルと快適な操作感を備えた、UnityとC#によるアクションゲームプロジェクトです。',

                // Pricing Section
                'pricing-title': '料金プラン',
                'pricing-subtitle': 'あなたのニーズに合わせた手頃な価格のパッケージと保証付きサポート',

                // Pricing Cards
                'pricing-web-design': 'Webデザイン',
                'pricing-web-dev': 'Web開発',
                'pricing-ecommerce': 'Eコマース開発',
                'pricing-data-analysis': 'データ分析 & その他',

                // Pricing Badge
                'pricing-badge-best': 'お得なプラン',

                // Pricing Features
                'pricing-feature-modern': 'モダンでレスポンシブなUI',
                'pricing-feature-pages': '最大5ページ',
                'pricing-feature-support': '30日間無料サポート',
                'pricing-feature-satisfaction': '100%満足保証',
                'pricing-feature-fullstack': 'フルスタック開発',
                'pricing-feature-custom': 'カスタムWebアプリケーション',
                'pricing-feature-platforms': 'Shopify、WooCommerce、WordPressストア',
                'pricing-feature-responsive': 'レスポンシブ商品ページ',
                'pricing-feature-payment': '決済ゲートウェイ統合',
                'pricing-feature-support-guarantee': '30日間無料サポート & 保証',
                'pricing-feature-visualization': 'データ可視化 & インサイト',
                'pricing-feature-python': 'Python、Pandas、Matplotlib、Seaborn',
                'pricing-feature-api': 'API開発',

                // Pricing CTA
                'pricing-cta-get-started': '始める',

                // Custom Solution
                'pricing-custom-title': 'カスタムソリューションが必要ですか？',
                'pricing-custom-desc': 'あなたの特定の要件について話し合い、あなたに合わせたパッケージを作成しましょう。',
                'pricing-custom-cta': 'プロジェクトについて話す',

                // Portfolio CTA
                'portfolio-cta': 'もっと見たいですか？お話しましょう',

                // Services Section
                'services-title': 'サービス',
                'services-subtitle': 'オンラインプレゼンスの構築、最適化、拡大を支援',
                'service-design': 'Webデザイン & UI/UX',
                'service-design-desc': 'ユーザー体験とコンバージョン率に最適化された、モダンでレスポンシブ、視覚的に魅力的なウェブサイトの作成。',
                'service-dev': 'Web開発',
                'service-dev-desc': '最新技術とベストプラクティスを使用した、スケーラブルで高性能なウェブサイトの構築。',
                'service-ecommerce': 'Eコマース開発',
                'service-ecommerce-desc': 'ビジネス成長に合わせたShopify、WooCommerceを使用したカスタムオンラインストアの作成。',
                'service-wordpress': 'WordPress開発',
                'service-wordpress-desc': 'カスタムWordPressテーマ、プラグイン、SEO最適化を備えた完全なウェブサイト開発。',
                'service-ai': 'AI & データソリューション',
                'service-ai-desc': 'ビジネスインテリジェンスのためのAIソリューション、データ分析、機械学習の実装。',
                'service-maintenance': '保守 & サポート',
                'service-maintenance-desc': '継続的なウェブサイトのメンテナンス、更新、セキュリティ、技術サポートサービス。',
                'service-feature-1': 'レスポンシブデザイン',
                'service-feature-2': 'ユーザー体験',
                'service-feature-3': 'モダンUI',
                'service-feature-4': 'フルスタック',
                'service-feature-5': 'API統合',
                'service-feature-6': 'パフォーマンス',
                'service-feature-7': 'Shopifyストア',
                'service-feature-8': '決済統合',
                'service-feature-9': '在庫管理',
                'service-feature-10': 'カスタムテーマ',
                'service-feature-11': 'プラグイン開発',
                'service-feature-12': 'SEO対応',
                'service-feature-13': 'データ分析',
                'service-feature-14': '機械学習',
                'service-feature-15': 'AI統合',
                'service-feature-16': '定期的な更新',
                'service-feature-17': 'セキュリティ監視',
                'service-feature-18': '技術サポート',
                'service-cta': '始める',
                'services-main-cta-title': 'プロジェクトを始める準備はできていますか？',
                'services-main-cta-desc': 'あなたのアイデアについて話し合い、一緒に素晴らしいものを作りましょう。あなたのビジョンを実現するお手伝いをします。',
                'services-cta-contact': 'お問い合わせ',
                'services-cta-portfolio': '作品を見る',

                // Gallery Section
                'gallery-title': '旅行ギャラリー',
                'gallery-subtitle': '日本での旅と冒険から撮影した瞬間',
                'gallery-cat-island': '猫島、日本',
                'gallery-cat-island-desc': '愛らしい猫たちがいる有名な猫島を探索',
                'gallery-flower-festival': '花まつり',
                'gallery-flower-festival-desc': '美しい桜と伝統的な日本の花々',
                'gallery-friends-1': '友人との集い',
                'gallery-friends-1-desc': '友人と一緒に日本を探索した思い出の瞬間',
                'gallery-friends-2': '街探索',
                'gallery-friends-2-desc': '友人と日本の都市と文化的ランドマークを探索',
                'gallery-temple': '伝統的な寺院',
                'gallery-temple-desc': '古代日本の寺院と史跡を訪問',
                'gallery-mountain': '山の景色',
                'gallery-mountain-desc': '日本の山々と風景の息をのむような景色',
                'filter-photos-all': 'すべての写真',
                'filter-photos-travel': '旅行',
                'filter-photos-nature': '自然',
                'filter-photos-friends': '友人',
                'filter-photos-culture': '文化',
                'gallery-cta-title': 'さらに冒険が続きます！',
                'gallery-cta-desc': '常に新しい場所を探索し、思い出を記録しています。更新情報は私の旅をフォローしてください！',
                'gallery-cta-button': 'あなたの旅行記を共有',

                // Contact Section
                'contact-title': 'お問い合わせ',
                'contact-subtitle': 'ご連絡いただき、一緒に素晴らしいものを作りましょう',
                'contact-email': 'メール',
                'contact-location': '所在地',
                'contact-availability': '対応状況',
                'contact-follow': 'フォロー',
                'contact-send-email': 'メールを送信',
                'contact-based-in': '現在、修士号取得のため日本在住',
                'contact-open-projects': 'フリーランスプロジェクト対応可能',
                'contact-quick-response': '24時間以内に迅速な返信',
                'form-name': '氏名',
                'form-email': 'メールアドレス',
                'form-subject': '件名',
                'form-message': 'メッセージ',
                'form-name-placeholder': '氏名を入力してください',
                'form-email-placeholder': 'メールアドレスを入力してください',
                'form-subject-placeholder': 'どのようなご用件ですか？',
                'form-message-placeholder': 'プロジェクトについて教えてください...',
                'form-submit': 'メッセージを送信',
                'form-sending': '送信中...',
                'form-sent': '送信完了！',

                // Footer
                'footer-brand-desc': 'モダンな技術でデジタル体験を創造するフルスタック開発者＆AI愛好家。日本を拠点に世界中で革新的なソリューションを提供。',
                'footer-cv-en': '英語履歴書',
                'footer-cv-jp': '日本語履歴書',
                'footer-cv-download': '履歴書をダウンロード',
                'footer-quick-links': 'クイックリンク',
                'footer-services': 'サービス',
                'footer-copyright': '&copy; 2024 ムハンマド・カムラン 全著作権所有',
                'footer-privacy': 'プライバシーポリシー',
                'footer-terms': '利用規約'
            }
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSavedLanguage();
    }

    setupEventListeners() {
        // Language dropdown toggle
        const dropdownBtn = document.getElementById('lang-dropdown-btn');
        const dropdownMenu = document.getElementById('lang-dropdown-menu');

        if (dropdownBtn && dropdownMenu) {
            dropdownBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = dropdownMenu.classList.contains('open');
                dropdownMenu.classList.toggle('open', !isOpen);
                dropdownBtn.classList.toggle('open', !isOpen);
            });
            document.addEventListener('click', () => {
                dropdownMenu.classList.remove('open');
                dropdownBtn.classList.remove('open');
            });
        }

        // Language option buttons (dropdown items)
        document.querySelectorAll('.lang-option[data-lang]').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                this.switchLanguage(lang);
                if (dropdownMenu) dropdownMenu.classList.remove('open');
                if (dropdownBtn) dropdownBtn.classList.remove('open');
            });
        });
    }

    loadSavedLanguage() {
        // Default to English first, then check for saved preference
        const savedLang = localStorage.getItem('preferred-language') || 'en';
        this.switchLanguage(savedLang, false);
        console.log('Loaded language:', savedLang);
    }

    switchLanguage(lang, save = true) {
        if (this.currentLang === lang) return;

        console.log(`Switching to ${lang} from ${this.currentLang}`);
        this.currentLang = lang;

        try {
            // Update all text content first
            this.updateContent(lang);
            
            // Then update button states
            this.updateButtonStates(lang);

            // Save preference
            if (save) {
                localStorage.setItem('preferred-language', lang);
            }
            
            console.log(`Successfully switched to ${lang}`);
        } catch (error) {
            console.error('Error switching language:', error);
        }
    }

    updateButtonStates(lang) {
        // Update dropdown display
        const flagEl = document.getElementById('lang-flag');
        const codeEl = document.getElementById('lang-code');
        if (flagEl) flagEl.innerHTML = lang === 'en' ? '&#x1F1FA;&#x1F1F8;' : '&#x1F1EF;&#x1F1F5;';
        if (codeEl) codeEl.textContent = lang === 'en' ? 'EN' : 'JP';

        // Mark active lang option
        document.querySelectorAll('.lang-option[data-lang]').forEach(btn => {
            btn.classList.toggle('active-lang', btn.getAttribute('data-lang') === lang);
        });
    }

    updateContent(lang) {
        console.log(`Updating content to ${lang}`);
        const translations = this.translations[lang];
        
        if (!translations) {
            console.error(`No translations found for language: ${lang}`);
            return;
        }

        // Update all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        console.log(`Found ${elements.length} elements to translate`);
        
        elements.forEach(element => {
            const rawKey = element.getAttribute('data-i18n');
            // Strip any curly/smart quotes that may have been introduced by text editors
            const key = rawKey.replace(/[“”‘’]/g, '');
            if (translations[key] !== undefined) {
                try {
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.placeholder = translations[key];
                    } else if (element.children.length > 0) {
                        // Preserve child element structure (e.g. gradient-text spans)
                        element.innerHTML = translations[key];
                    } else {
                        element.textContent = translations[key];
                    }
                } catch (error) {
                    console.error(`Error updating element with key '${key}':`, error);
                }
            }
        });

        // Update page title
        document.title = lang === 'en'
            ? 'Muhammad Kamran - Full Stack Developer & AI Enthusiast'
            : 'ムハンマド・カムラン - フルスタック開発者 & AI 愛好家';
            
        console.log(`Content updated to ${lang}`);
    }
}

// ===== INITIALIZE LANGUAGE MANAGER =====
let languageManager;

document.addEventListener('DOMContentLoaded', () => {
    languageManager = new LanguageManager();
    
    // Force update content after a short delay to ensure all elements are loaded
    setTimeout(() => {
        languageManager.updateContent(languageManager.currentLang);
        languageManager.updateButtonStates(languageManager.currentLang);
    }, 100);
});