/**
 * Portfolio - Script principal
 * Minimaliste, performant et accessible
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Initialisation
    // ============================================
    
    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const currentYear = document.getElementById('currentYear');
    
    // ============================================
    // Fonctions
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
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
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
        const contactForm = document.getElementById('contactForm');
        
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulation d'envoi
            console.log('Formulaire soumis:', data);
            
            // Afficher un message de succès
            alert('Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.');
            
            // Réinitialiser le formulaire
            this.reset();
            
            // Remettre le focus sur le premier champ
            this.querySelector('input').focus();
        });
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
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observer les éléments à animer
        document.querySelectorAll('.skill-category, .project-card').forEach(el => {
            observer.observe(el);
        });
    }
    
    // ============================================
    // Initialisation des fonctionnalités
    // ============================================
    
    initMobileMenu();
    updateCopyrightYear();
    initContactForm();
    initSmoothScroll();
    initScrollAnimations();
    
    // ============================================
    // Optimisations
    // ============================================
    
    // Préchargement des images
    function preloadImages() {
        const images = [
            'images/profile.jpg',
            'images/projects/project-sakila.jpg',
            'images/projects/project-mimic.jpg'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    // Démarrer le préchargement après le chargement initial
    window.addEventListener('load', preloadImages);
    
    // Ajouter une classe pour les appareils mobiles
    function detectMobile() {
        if (window.innerWidth <= 768) {
            document.body.classList.add('is-mobile');
        } else {
            document.body.classList.remove('is-mobile');
        }
    }
    
    window.addEventListener('resize', detectMobile);
    detectMobile();
});
