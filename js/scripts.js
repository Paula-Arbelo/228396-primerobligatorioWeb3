// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link, .nav-menu .btn');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.textContent = '☰';
    });
});

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.dataset.category;

        // Filter projects with animation
        projectCards.forEach((card, index) => {
            card.style.animation = 'none';

            setTimeout(() => {
                if (category === 'Todos' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
                } else {
                    card.style.display = 'none';
                }
            }, 10);
        });
    });
});



// Contact form handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // In production, send this data to your backend/email service
    console.log('Form submitted:', formData);

    alert('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.\n\nPara producción, conecta este formulario con:\n- EmailJS\n- Formspree\n- Tu propio backend');

    // Reset form
    contactForm.reset();
});

// Smooth scroll offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Height of fixed nav
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll animations when elements come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.card, .project-card, .about-card').forEach(card => {
    observer.observe(card);
});