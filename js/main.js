/**
 * Portfolio Bienvenu DAGA - Script principal
 * Minimaliste, performant et accessible
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Initialisation
    // ============================================
    
    console.log('Portfolio Bienvenu DAGA - Chargé');
    
    // Éléments DOM
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const currentYear = document.getElementById('currentYear');
    const contactForm = document.getElementById('contactForm');
    
    // ============================================
    // Fonctions principales
    // ============================================
    
    /**
     * Gestion du menu mobile
     */
    function initMobileMenu() {
        if (!menuToggle || !navLinks) return;
        
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Basculer l'état du menu
            this.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            
            // Animer les barres du hamburger
            const spans = this.querySelectorAll('span');
            if (!isExpanded) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Fermer le menu en cliquant sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
                
                // Réinitialiser l'animation du hamburger
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
        
        // Fermer le menu en cliquant à l'extérieur
        document.addEventListener('click', (event) => {
            if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
                menuToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
                
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    /**
     * Mettre à jour l'année du copyright
     */
    function updateCopyrightYear() {
        if (currentYear) {
            currentYear.textContent = new Date().getFullYear();
        }
    }
    
    /**
     * Gestion du formulaire de contact
     */
    function initContactForm() {
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validation basique
            if (!data.name || !data.email || !data.message) {
                showFormMessage('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showFormMessage('Veuillez entrer une adresse email valide.', 'error');
                return;
            }
            
            // Simulation d'envoi (à remplacer par un vrai service)
            try {
                // En mode développement, on simule juste l'envoi
                console.log('Données du formulaire:', data);
                
                // Simuler un délai d'envoi
                this.classList.add('loading');
                
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Afficher le message de succès
                showFormMessage('Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.', 'success');
                
                // Réinitialiser le formulaire
                this.reset();
                
                // Remettre le focus sur le premier champ
                this.querySelector('input').focus();
                
            } catch (error) {
                console.error('Erreur:', error);
                showFormMessage('Une erreur est survenue. Veuillez réessayer.', 'error');
            } finally {
                this.classList.remove('loading');
            }
        });
    }
    
    /**
     * Valider un email
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    /**
     * Afficher un message pour le formulaire
     */
    function showFormMessage(message, type) {
        // Supprimer les messages existants
        const existingMessage = contactForm.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Créer le nouveau message
        const messageEl = document.createElement('div');
        messageEl.className = `form-message form-message-${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            padding: 12px;
            margin-top: 16px;
            border-radius: 4px;
            font-size: 0.9rem;
            text-align: center;
            background-color: ${type === 'success' ? '#d4edda' : '#f8d7da'};
            color: ${type === 'success' ? '#155724' : '#721c24'};
            border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
        `;
        
        // Ajouter avant le bouton d'envoi
        const submitBtn = contactForm.querySelector('.btn-submit');
        contactForm.insertBefore(messageEl, submitBtn);
        
        // Supprimer après 5 secondes
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
    }
    
    /**
     * Gestion des ancres smooth scroll
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Ignorer les ancres vides
                if (href === '#') return;
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Calculer la position avec offset pour le header fixe
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    /**
     * Animation au scroll
     */
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-visible');
                    
                    // Optionnel : arrêter d'observer après animation
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observer les éléments à animer
        document.querySelectorAll('.project-card, .skill-category').forEach(el => {
            observer.observe(el);
        });
    }
    
    /**
     * Gestion du lazy loading des images
     */
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        
                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                        }
                        
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    /**
     * Détection des fonctionnalités
     */
    function detectFeatures() {
        // Ajouter des classes pour les fonctionnalités supportées
        if ('IntersectionObserver' in window) {
            document.documentElement.classList.add('intersection-observer');
        }
        
        if ('scrollBehavior' in document.documentElement.style) {
            document.documentElement.classList.add('smooth-scroll');
        }
    }
    
    // ============================================
    // Initialisation
    // ============================================
    
    function init() {
        initMobileMenu();
        updateCopyrightYear();
        initContactForm();
        initSmoothScroll();
        initScrollAnimations();
        initLazyLoading();
        detectFeatures();
        
        console.log('Portfolio initialisé avec succès');
    }
    
    // Lancer l'initialisation
    init();
    
    // ============================================
    // Optimisations avancées
    // ============================================
    
    // Gérer le resize avec debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Fermer le menu mobile sur resize
            if (window.innerWidth > 768) {
                menuToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
                
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }, 250);
    });
    
    // Gérer la visibilité de la page
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            console.log('Portfolio visible');
        }
    });
});
