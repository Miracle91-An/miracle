document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const overlayMenu = document.getElementById('overlay-menu');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        overlayMenu.classList.toggle('active');
        
        if (overlayMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on overlay links
    const overlayLinks = document.querySelectorAll('.overlay-link');
    overlayLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            overlayMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Calculate age
    function calculateAge() {
        const birthDate = new Date('2006-06-06');
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        document.getElementById('age').textContent = age;
    }
    
    calculateAge();
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For this example, we'll just log it and show an alert
            console.log({ name, email, subject, message });
            
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Gallery lightbox (would need additional HTML/CSS for full implementation)
    // This is a basic placeholder - you might want to use a library like lightbox.js
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            // In a full implementation, this would open a lightbox
            console.log('Image clicked:', this.src);
        });
    });
});
// ============ INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ============
const animateOnScroll = function() {
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
};

// ============ TESTIMONIAL SLIDER FUNCTIONALITY ============
const initTestimonialSlider = function() {
    const slider = document.querySelector('.testimonial-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (!slider || slides.length === 0) return;
    
    let currentIndex = 0;
    const slideCount = slides.length;
    
    function goToSlide(index) {
        if (index < 0) index = slideCount - 1;
        if (index >= slideCount) index = 0;
        
        currentIndex = index;
        slider.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    // Auto-advance slides
    let slideInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Initialize first dot as active
    if (dots.length > 0) {
        dots[0].classList.add('active');
    }
};

// ============ RIPPLE EFFECT BUTTONS ============
const initRippleEffects = function() {
    const buttons = document.querySelectorAll('.btn, .work-card, .gallery-grid img');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Only proceed if the element has the ripple class
            if (!this.classList.contains('ripple')) return;
            
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            // Remove the ripple element after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
};

// ============ INITIALIZE ALL ANIMATIONS ============
document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    
    // Add these new initializations
    animateOnScroll();
    initTestimonialSlider();
    initRippleEffects();
    
    // Add ripple class to elements
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.classList.add('ripple');
    });
    
    // Add hover class to gallery images
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    galleryImages.forEach(img => {
        img.classList.add('ripple');
    });
});