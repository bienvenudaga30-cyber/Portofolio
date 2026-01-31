// ============================================
// NAVIGATION MENU TOGGLE
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu lorsqu'on clique sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// FORM SUBMISSION
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Récupération des valeurs du formulaire
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Ici, normalement on enverrait les données à un serveur
    // Pour l'instant, on simule l'envoi avec un message de succès
    console.log('Formulaire soumis:', { name, email, subject, message });
    
    // Message de succès
    alert(`Merci ${name} ! Votre message a été envoyé. Je vous répondrai dans les plus brefs délais.`);
    
    // Réinitialisation du formulaire
    contactForm.reset();
});

// ============================================
// ANIMATION AU SCROLL
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-card');
        }
    });
}, observerOptions);

// Observer les cartes de compétences et projets
document.querySelectorAll('.skill-category, .project-card, .contact-info, .contact-form').forEach(el => {
    observer.observe(el);
});

// ============================================
// ANIMATION DE TEXTE POUR LE HERO
// ============================================
const heroTitle = document.querySelector('.hero-title');
const heroText = heroTitle.textContent;
const words = heroText.split(' ');

// Créer un nouveau titre avec des spans pour chaque mot
heroTitle.innerHTML = words.map(word => {
    if (word.includes('data') || word.includes('design')) {
        return `<span class="highlight">${word}</span>`;
    }
    return word;
}).join(' ');

// ============================================
// COMPTEUR POUR LES PROJETS (animation)
// ============================================
const projectNumbers = document.querySelectorAll('.project-number');

projectNumbers.forEach(number => {
    const targetValue = parseInt(number.textContent);
    let currentValue = 0;
    
    const updateNumber = () => {
        if (currentValue < targetValue) {
            currentValue++;
            number.textContent = currentValue.toString().padStart(2, '0');
            setTimeout(updateNumber, 100);
        }
    };
    
    // Démarrer l'animation quand la section est visible
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateNumber();
                projectObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    projectObserver.observe(number.closest('.project-card'));
});

// ============================================
// CHANGEMENT DE COULEUR DU HEADER AU SCROLL
// ============================================
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
});
