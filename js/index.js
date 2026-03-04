// ===== NAVBAR FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function () {
    console.log('Portfolio website loaded successfully');

    // Mobile Menu Functionality
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
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
            link.classList.remove('active', 'text-white');
            link.classList.add('text-gray-300');

            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active', 'text-white');
                link.classList.remove('text-gray-300');
            }
        });

        // Update mobile nav links
        mobileNavLinks.forEach(link => {
            link.classList.remove('active', 'text-white', 'bg-teal-500/20');
            link.classList.add('text-gray-300');

            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active', 'text-white', 'bg-teal-500/20');
                link.classList.remove('text-gray-300');
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
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 60 + 10;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100 + 100}vh`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${Math.random() * 20 + 10}s`;

        container.appendChild(particle);
    }
}

// ===== TYPEWRITER EFFECT =====
const roles = ["PHP", "Python", "Shopify", "WordPress", "React", "Laravel", "JavaScript", "Node.js"];
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
            filterButtons.forEach(b => b.classList.add('text-gray-300'));

            // Add active class to clicked button
            btn.classList.add('active', 'text-white');
            btn.classList.remove('text-gray-300');

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
                b.classList.add('text-gray-300');
            });

            // Add active class to clicked button
            btn.classList.add('active', 'text-white');
            btn.classList.remove('text-gray-300');

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
            progressLine.style.background = 'linear-gradient(90deg, #2dd4bf 0%, #22d3ee 50%, #8b5cf6 100%)';
            progressLine.style.boxShadow = '0 0 15px rgba(45, 212, 191, 0.5)';
        } else {
            progressLine.style.background = 'linear-gradient(90deg, #8b5cf6 0%, #22d3ee 50%, #2dd4bf 100%)';
            progressLine.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.5)';
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
            filterButtons.forEach(b => b.classList.add('text-gray-300'));

            // Add active class to clicked button
            btn.classList.add('active', 'text-white');
            btn.classList.remove('text-gray-300');

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
    const languageManager = new LanguageManager();

    // Initialize core functionality
    createParticles();
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
                'nav-skills': 'Skills',
                'nav-education': 'Education',
                'nav-certifications': 'Certifications',
                'nav-portfolio': 'Portfolio',
                'nav-services': 'Services',
                'nav-gallery': 'Gallery',
                'nav-contact': 'Contact',

                // Hero Section
                'hero-available': 'Available for freelance work',
                'hero-title-1': 'Full Stack',
                'hero-title-2': 'Developer',
                'hero-title-3': '& AI Enthusiast',
                'hero-builds': 'I build with',
                'hero-description': 'Professional in PHP, JavaScript, Laravel, React, Python & AI solutions. MEXT scholar in University of Kitakyushu and my research theme is traffic psychology and behavior. I will graduate in September 2026.',
                'hero-cta-work': 'View My Work',
                'hero-cta-contact': 'Get In Touch',
                'hero-projects': 'Projects',
                'hero-experience': 'Years Exp',
                'hero-satisfaction': 'Satisfaction',
                'hero-scroll': 'Explore More',

                // Skills Section
                'skills-title': 'My Skills',
                'skills-subtitle': 'Technologies & Tools I Master',

                // Education Section
                'education-title': 'Education & Experience',
                'education-subtitle': 'My academic journey and professional path',
                'education-masters': 'Masters in Applied Information Systems',
                'education-masters-desc': 'Focused on Maths, Databases, Data Structures and Algorithms, Software Engineering and Programming.',
                'education-bachelors': 'Bachelor\'s in Information Technology',
                'education-bachelors-desc': 'Focused on Full Stack Development, Software Architecture, and modern web technologies.',
                'experience-fullstack': 'Full Stack Engineer',
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
                'project-windows-11': 'Windows 11 Web Clone',
                'project-bakery': 'Bakery Website',
                'project-travelx': 'Travelx Travel Website',
                'project-ai': 'AI tools SAAS website',
                'project-atoms': 'Interactive 3D Atom Simulator',
                'project-def': 'Galactic Defender',
                'project-digizone': 'Digizone',

                // Project Descriptions
                'project-windows-11-desc': 'Browser-based simulation of the Windows 11 desktop environment',
                'project-bakery-desc': 'A responsive bakery web design',
                'project-travelx-desc': 'Travel Agency Website',
                'project-ai-desc': 'A website for AI tools Marketing page',
                'project-atoms-desc': 'The Bohr atomic model in interactive 3D using HTML, Tailwind CSS, and Three.js.',
                'project-def-desc': 'Classic-style 2D vertical space shooter built using pure HTML, CSS, and JavaScript.',
                'project-digizone-desc': 'Ecommerce Services Startup Website',

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
                'footer-quick-links': 'Quick Links',
                'footer-services': 'Services',
                'footer-copyright': '&copy; 2024 Muhammad Kamran. All rights reserved.',
                'footer-privacy': 'Privacy Policy',
                'footer-terms': 'Terms of Service'
            },
            jp: {
                // Navigation
                'nav-home': 'ホーム',
                'nav-skills': 'スキル',
                'nav-education': '学歴',
                'nav-certifications': '資格',
                'nav-portfolio': 'ポートフォリオ',
                'nav-services': 'サービス',
                'nav-gallery': 'ギャラリー',
                'nav-contact': 'お問い合わせ',

                // Hero Section
                'hero-available': 'フリーランス対応可能',
                'hero-title-1': 'フルスタック',
                'hero-title-2': '開発者',
                'hero-title-3': '＆ AI 愛好家',
                'hero-builds': '使用技術',
                'hero-description': 'PHP、JavaScript、Laravel、React、Python、AIソリューションの専門家。北九州市立大学文部科学省奨学生。研究テーマは交通心理学と行動。2026年9月卒業予定。',
                'hero-cta-work': '作品を見る',
                'hero-cta-contact': 'お問い合わせ',
                'hero-projects': 'プロジェクト',
                'hero-experience': '年の経験',
                'hero-satisfaction': '満足度',
                'hero-scroll': 'もっと見る',

                // Skills Section
                'skills-title': '私のスキル',
                'skills-subtitle': '習得した技術とツール',

                // Education Section
                'education-title': '学歴と職歴',
                'education-subtitle': '私の学業とキャリアの歩み',
                'education-masters': '応用情報システム学修士',
                'education-masters-desc': 'データサイエンスとAI技術を用いた交通シミュレーションシステムと心理学研究に焦点を当てています。',
                'education-bachelors': '情報技術学士',
                'education-bachelors-desc': '数学、データベース、データ構造とアルゴリズム、ソフトウェア工学とプログラミングに焦点を当てています。',
                'experience-fullstack': 'フルスタックエンジニア',
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
                'project-windows-11': 'Windows 11 Webクローン',
                'project-bakery': 'ベーカリーウェブサイト',
                'project-travelx': 'トラベルエックス旅行ウェブサイト',
                'project-ai': 'AIツールSaaSウェブサイト',
                'project-atoms': 'インタラクティブ3D原子シミュレーター',
                'project-def': 'ギャラクティックディフェンダー',
                'project-digizone': 'Digizone',
                'project-digizone-desc': 'Eコマースサービス スタートアップウェブサイト',

                // Project Descriptions
                'project-windows-11-desc': 'ブラウザで体験できるWindows 11デスクトップ環境のシミュレーション',
                'project-bakery-desc': 'レスポンシブなベーカリーWebデザイン',
                'project-travelx-desc': '旅行代理店のウェブサイト',
                'project-ai-desc': 'AIツールのマーケティングページ用ウェブサイト',
                'project-atoms-desc': 'HTML、Tailwind CSS、Three.jsでボーアの原子モデルをインタラクティブに体験できます。',
                'project-def-desc': 'HTML、CSS、JavaScriptで構築したクラシックな2D縦スクロールシューティングゲーム.',
                'project-unique-desc': 'ウェブホスティング会社のウェブサイト',
                'project-zoobounty-desc': 'オンラインショッピングサイト',
                'project-travel-desc': '旅行代理店のウェブサイト',
                'project-swif-desc': 'デジタルマーケティングエージェンシー',
                'project-reblate-desc': 'エージェンシーウェブサイト',
                'project-crm-desc': 'JavaScript + Laravel Webアプリ',
                'project-firex-desc': 'UnityとC#の卒業プロジェクト',

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
        // Desktop language switchers
        const enBtn = document.getElementById('lang-en');
        const jpBtn = document.getElementById('lang-jp');

        // Mobile language switchers  
        const enBtnMobile = document.getElementById('lang-en-mobile');
        const jpBtnMobile = document.getElementById('lang-jp-mobile');

        console.log('Language buttons found:', {
            enBtn: !!enBtn,
            jpBtn: !!jpBtn,
            enBtnMobile: !!enBtnMobile,
            jpBtnMobile: !!jpBtnMobile
        });

        // Add event listeners if elements exist
        if (enBtn) enBtn.addEventListener('click', () => this.switchLanguage('en'));
        if (jpBtn) jpBtn.addEventListener('click', () => this.switchLanguage('jp'));
        if (enBtnMobile) enBtnMobile.addEventListener('click', () => this.switchLanguage('en'));
        if (jpBtnMobile) jpBtnMobile.addEventListener('click', () => this.switchLanguage('jp'));
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
        console.log('Updating button states for language:', lang);

        // Desktop buttons
        const enBtn = document.getElementById('lang-en');
        const jpBtn = document.getElementById('lang-jp');

        // Mobile buttons
        const enBtnMobile = document.getElementById('lang-en-mobile');
        const jpBtnMobile = document.getElementById('lang-jp-mobile');

        // Remove active styles from ALL buttons first
        [enBtn, jpBtn, enBtnMobile, jpBtnMobile].forEach(btn => {
            if (btn) {
                // Remove all possible active styles
                btn.classList.remove(
                    'bg-gradient-to-r', 'from-teal-500', 'to-cyan-500',
                    'text-white', 'border-teal-500/30',
                    'bg-teal-500', 'bg-cyan-500', 'bg-gray-800', 'text-gray-300', 'border-gray-600',
                    'glass'
                );

                // Add base styles
                if (btn === enBtnMobile || btn === jpBtnMobile) {
                    // Mobile buttons - default to glass style
                    btn.classList.add('glass', 'text-gray-300');
                } else {
                    // Desktop buttons - default to dark style
                    btn.classList.add('bg-gray-800', 'text-gray-300', 'border-gray-600');
                }
            }
        });

        // Apply active styles to the correct button based on language
        if (lang === 'en') {
            // Activate English buttons
            if (enBtn) {
                enBtn.classList.remove('bg-gray-800', 'text-gray-300', 'border-gray-600');
                enBtn.classList.add('bg-gradient-to-r', 'from-teal-500', 'to-cyan-500', 'text-white', 'border-teal-500/30');
            }
            if (enBtnMobile) {
                enBtnMobile.classList.remove('glass', 'text-gray-300');
                enBtnMobile.classList.add('bg-gradient-to-r', 'from-teal-500', 'to-cyan-500', 'text-white');
            }
        } else {
            // Activate Japanese buttons  
            if (jpBtn) {
                jpBtn.classList.remove('bg-gray-800', 'text-gray-300', 'border-gray-600');
                jpBtn.classList.add('bg-gradient-to-r', 'from-teal-500', 'to-cyan-500', 'text-white', 'border-teal-500/30');
            }
            if (jpBtnMobile) {
                jpBtnMobile.classList.remove('glass', 'text-gray-300');
                jpBtnMobile.classList.add('bg-gradient-to-r', 'from-teal-500', 'to-cyan-500', 'text-white');
            }
        }

        console.log('Button states updated. Active language:', lang);
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
            const key = element.getAttribute('data-i18n');
            if (translations[key] !== undefined) {
                try {
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.placeholder = translations[key];
                    } else {
                        element.textContent = translations[key];
                    }
                } catch (error) {
                    console.error(`Error updating element with key '${key}':`, error);
                }
            } else {
                console.warn(`No translation found for key: ${key}`);
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