/* ========================================
   Custom JavaScript for Aishwary Pathak Portfolio
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ===================
    // Navigation Functions
    // ===================
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile navbar if open
                const navbarToggle = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarToggle && !navbarToggle.classList.contains('collapsed')) {
                    navbarToggle.click();
                }
            }
        });
    });
    
    // ===================
    // Scroll Animations
    // ===================
    
    // Intersection Observer for fade-up animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe all fade-up elements
    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // ===================
    // Skills Progress Animation
    // ===================
    
    const skillsSection = document.querySelector('#skills');
    let skillsAnimated = false;
    
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                animateProgressBars();
                skillsAnimated = true;
            }
        });
    }, { threshold: 0.5 });
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                bar.setAttribute('aria-valuenow', width);
            }, index * 200);
        });
    }
    
    // ===================
    // Contact Form Handling
    // ===================
    
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset validation
            contactForm.classList.remove('was-validated');
            formSuccess.style.display = 'none';
            
            // Validate form
            if (contactForm.checkValidity()) {
                // Simulate form submission
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                // Show loading state
                submitButton.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
                submitButton.disabled = true;
                
                // Simulate API call delay
                setTimeout(() => {
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message
                    formSuccess.style.display = 'block';
                    
                    // Reset button
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    
                    // Scroll to success message
                    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                    }, 5000);
                }, 2000);
                
            } else {
                // Show validation errors
                contactForm.classList.add('was-validated');
            }
        });
        
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.checkValidity()) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                } else {
                    this.classList.remove('is-valid');
                    this.classList.add('is-invalid');
                }
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid') && this.checkValidity()) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                }
            });
        });
    }
    
    // ===================
    // Back to Top Button
    // ===================
    
    const backToTopButton = document.getElementById('backToTop');
    
    function handleBackToTopVisibility() {
        if (window.scrollY > 600) {
            backToTopButton.style.display = 'block';
            setTimeout(() => {
                backToTopButton.style.opacity = '1';
            }, 10);
        } else {
            backToTopButton.style.opacity = '0';
            setTimeout(() => {
                if (backToTopButton.style.opacity === '0') {
                    backToTopButton.style.display = 'none';
                }
            }, 300);
        }
    }
    
    if (backToTopButton) {
        backToTopButton.style.opacity = '0';
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===================
    // Project Card Interactions
    // ===================
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ===================
    // Hero Section Typing Animation
    // ===================
    
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const titleText = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < titleText.length) {
                heroTitle.textContent += titleText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // ===================
    // Modal Enhancements
    // ===================
    
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('shown.bs.modal', function() {
            // Focus management for accessibility
            const firstInput = this.querySelector('input, button, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstInput) {
                firstInput.focus();
            }
        });
    });
    
    // ===================
    // Preloader (Optional)
    // ===================
    
    function hidePreloader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }
    }
    
    // ===================
    // Initialize Tooltips
    // ===================
    
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // ===================
    // Performance Optimized Scroll Handler
    // ===================
    
    let ticking = false;
    
    function updateOnScroll() {
        handleNavbarScroll();
        handleBackToTopVisibility();
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    // ===================
    // Event Listeners
    // ===================
    
    // Scroll events
    window.addEventListener('scroll', requestTick);
    
    // Resize events
    window.addEventListener('resize', function() {
        // Recalculate navbar height on resize
        const newNavbarHeight = navbar.offsetHeight;
        if (newNavbarHeight !== navbarHeight) {
            navbarHeight = newNavbarHeight;
        }
    });
    
    // Page load events
    window.addEventListener('load', function() {
        hidePreloader();
        
        // Trigger initial animations
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero-section .fade-in');
            heroElements.forEach((element, index) => {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }, 200);
    });
    
    // ===================
    // Accessibility Enhancements
    // ===================
    
    // Keyboard navigation for custom elements
    document.addEventListener('keydown', function(e) {
        // Back to top button
        if (e.key === 'Enter' || e.key === ' ') {
            if (e.target === backToTopButton) {
                e.preventDefault();
                backToTopButton.click();
            }
        }
        
        // Escape key to close modals
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                const modalInstance = bootstrap.Modal.getInstance(openModal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        }
    });
    
    // ===================
    // Error Handling
    // ===================
    
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.error);
        // You can add error reporting here
    });
    
    // ===================
    // Console Welcome Message
    // ===================
    
    console.log('%cWelcome to Aishwary Pathak\'s Portfolio! 🚀', 'color: #0F766E; font-size: 20px; font-weight: bold;');
    console.log('%cInterested in the code? Check out the source at: https://github.com/aishwary-pathak', 'color: #6366F1; font-size: 14px;');
    
});

// ===================
// Utility Functions
// ===================

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get scroll percentage
function getScrollPercentage() {
    const winHeight = window.innerHeight || document.documentElement.clientHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const trackLength = docHeight - winHeight;
    return Math.floor(scrollTop / trackLength * 100);
}