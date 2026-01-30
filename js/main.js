/**
 * Portfolio Bienvenu DAGA - Script principal CORRIGÉ
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialisation
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const currentYear = document.getElementById('currentYear');
    
    // Gestion du menu mobile
    function initMobileMenu() {
        if (!menuToggle || !navLinks) return;
        
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            
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
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // Mettre à jour l'année du copyright
    function updateCopyrightYear() {
        if (currentYear) {
            currentYear.textContent = new Date().getFullYear();
        }
    }
    
    /**
     * Gestion du formulaire de contact - SOLUTION SIMPLE
     */
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const company = document.getElementById('company').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation
            if (!name || !email || !message) {
                showFormMessage('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Veuillez entrer une adresse email valide.', 'error');
                return;
            }
            
            // Préparer l'email
            const subject = `Message portfolio de ${name}`;
            const body = `Nom: ${name}%0D%0AEmail: ${email}%0D%0AEntreprise: ${company || 'Non spécifié'}%0D%0A%0D%0AMessage:%0D%0A${message}%0D%0A%0D%0A---%0D%0AEnvoyé depuis le portfolio Bienvenu DAGA`;
            
            // Ouvrir le client email
            window.open(`mailto:bienvenudaga30@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
            
            // Message de confirmation
            showFormMessage('✅ Votre message est prêt ! Votre client email s\'ouvre. Il ne reste plus qu\'à cliquer sur "Envoyer".', 'success');
            
            // Réinitialiser après 3 secondes
            setTimeout(() => {
                contactForm.reset();
            }, 3000);
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
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        // Supprimer les messages existants
        const existingMessage = contactForm.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Créer le nouveau message
        const messageEl = document.createElement('div');
        messageEl.className = `form-message form-message-${type}`;
        messageEl.innerHTML = message;
        
        // Style selon le type
        const styles = {
            success: {
                backgroundColor: '#d4edda',
                color: '#155724',
                border: '1px solid #c3e6cb'
            },
            error: {
                backgroundColor: '#f8d7da',
                color: '#721c24',
                border: '1px solid #f5c6cb'
            },
            info: {
                backgroundColor: '#d1ecf1',
                color: '#0c5460',
                border: '1px solid #bee5eb'
            }
        };
        
        Object.assign(messageEl.style, {
            padding: '12px',
            marginTop: '16px',
            borderRadius: '4px',
            fontSize: '0.9rem',
            textAlign: 'center',
            ...styles[type]
        });
        
        // Ajouter avant le bouton d'envoi
        const submitBtn = contactForm.querySelector('.btn-submit');
        contactForm.insertBefore(messageEl, submitBtn);
        
        // Supprimer après 8 secondes
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 8000);
    }
    
    /**
     * Gestion des ancres smooth scroll
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
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
    
    // Initialiser tout
    function init() {
        initMobileMenu();
        updateCopyrightYear();
        initContactForm();
        initSmoothScroll();
        console.log('Portfolio Bienvenu DAGA - Initialisé avec formulaire corrigé');
    }
    
    init();
});
