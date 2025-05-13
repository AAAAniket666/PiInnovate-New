// PiInnovate Website Javascript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-menu') && !event.target.closest('.hamburger') && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let currentSlide = 0;
        const slides = testimonialSlider.querySelectorAll('.testimonial');
        const totalSlides = slides.length;
        
        // Set initial state
        updateSlider();
        
        // Previous button
        document.querySelector('.testimonial-prev').addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
        
        // Next button
        document.querySelector('.testimonial-next').addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        });
        
        function updateSlider() {
            slides.forEach((slide, index) => {
                if (index === currentSlide) {
                    slide.style.display = 'block';
                } else {
                    slide.style.display = 'none';
                }
            });
            
            // Update navigation dots if they exist
            const dots = document.querySelectorAll('.testimonial-dot');
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Auto slide (uncomment to enable)
        /*
        setInterval(function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }, 5000);
        */
    }
    
    // Portfolio Carousel
    const portfolioCarousel = document.querySelector('.portfolio-carousel');
    if (portfolioCarousel) {
        let currentPortfolio = 0;
        const items = portfolioCarousel.querySelectorAll('.portfolio-item');
        const totalItems = items.length;
        
        // Set initial state
        updatePortfolio();
        
        // Previous button
        document.querySelector('.portfolio-prev').addEventListener('click', function() {
            currentPortfolio = (currentPortfolio - 1 + totalItems) % totalItems;
            updatePortfolio();
        });
        
        // Next button
        document.querySelector('.portfolio-next').addEventListener('click', function() {
            currentPortfolio = (currentPortfolio + 1) % totalItems;
            updatePortfolio();
        });
        
        function updatePortfolio() {
            items.forEach((item, index) => {
                if (index === currentPortfolio) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
    }
    
    // Career Job Listings Toggle
    const jobHeaders = document.querySelectorAll('.job-header');
    if (jobHeaders.length > 0) {
        jobHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const content = this.nextElementSibling;
                content.classList.toggle('active');
                
                // Toggle the + and - icons
                const icon = this.querySelector('.job-toggle-icon');
                if (icon) {
                    icon.textContent = content.classList.contains('active') ? '-' : '+';
                }
            });
        });
    }
    
    // Animate on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkInView() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            // Is element in viewport?
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add(element.dataset.animation || 'animate-fade-in');
            }
        });
    }
    
    // Run once on page load
    checkInView();
    
    // Run on scroll
    window.addEventListener('scroll', checkInView);
    
    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let valid = true;
            
            // Basic validation
            const requiredFields = contactForm.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    valid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (!valid) {
                e.preventDefault();
                const errorMessage = document.createElement('div');
                errorMessage.className = 'form-error';
                errorMessage.textContent = 'Please fill all required fields correctly.';
                
                // Remove any existing error messages
                const existingError = contactForm.querySelector('.form-error');
                if (existingError) {
                    existingError.remove();
                }
                
                contactForm.prepend(errorMessage);
            }
        });
    }
    
    // Newsletter signup validation
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            const emailInput = this.querySelector('input[type="email"]');
            if (!emailInput.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                e.preventDefault();
                emailInput.classList.add('error');
                
                // Show error message
                let errorMsg = this.querySelector('.newsletter-error');
                if (!errorMsg) {
                    errorMsg = document.createElement('div');
                    errorMsg.className = 'newsletter-error';
                    errorMsg.textContent = 'Please enter a valid email address.';
                    this.appendChild(errorMsg);
                }
            }
        });
    }
    
    // Lazy loading images
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            lazyImageObserver.observe(img);
        });
    }
});
