// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease',
    once: true
});

// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease',
    once: true
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const menuLinks = document.querySelectorAll('.nav-links a');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Add animation delays to menu items
        menuLinks.forEach((link, index) => {
            if (navMenu.classList.contains('active')) {
                link.style.transitionDelay = `${index * 0.1}s`;
            } else {
                link.style.transitionDelay = '0s';
            }
        });

        // Toggle body scroll
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', toggleMenu);

    // Close menu on link click
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Navigation functionality
function initNavigation() {
    const menuLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    const headerOffset = 80;

    // Update active link based on scroll position
    function updateActiveLink() {
        // Get the current scroll position
        const scrollPosition = window.scrollY;
        
        // Find which section has the most visibility in the viewport
        let maxVisibleSection = null;
        let maxVisibleAmount = 0;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionHeight = rect.height;
            const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
            const visibleAmount = Math.max(0, visibleHeight) / sectionHeight;

            if (visibleAmount > maxVisibleAmount) {
                maxVisibleAmount = visibleAmount;
                maxVisibleSection = section;
            }
        });

        // Update active state of nav links
        if (maxVisibleSection) {
            menuLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${maxVisibleSection.id}`) {
                    link.classList.add('active');
                }
            });
        }
    }

    // Smooth scroll to section
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const targetPosition = targetSection.offsetTop - headerOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active state
                menuLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');

                // Close mobile menu if open
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Debounced scroll listener for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            updateActiveLink();
        });
    });

    // Initialize active link on page load
    window.addEventListener('load', updateActiveLink);
}

// Initialize navigation
document.addEventListener('DOMContentLoaded', initNavigation);

// Typing animation
const typingText = document.querySelector('.typing-text');
const phrases = ['Lead Manager - TechMahindra', 'Software Engineer'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, 2000); // Wait before starting to delete
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 500); // Wait before typing next phrase
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

// Start typing animation
type();

// Form submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Scroll to top button
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '↑';
scrollButton.classList.add('scroll-top');
document.body.appendChild(scrollButton);

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/hide scroll button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('show');
    } else {
        scrollButton.classList.remove('show');
    }
});

// Section reveal observer
const allSections = document.querySelectorAll('section[id]');

const revealSection = function (entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-show');
            // Don't unobserve to allow re-animation when revisiting
        } else {
            entry.target.classList.remove('section-show');
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.1,
    rootMargin: '-100px 0px'
});

allSections.forEach(section => {
    section.classList.add('section-hidden');
    sectionObserver.observe(section);
});
}); // Close DOMContentLoaded event listener
