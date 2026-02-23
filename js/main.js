// main.js - Interactions minimales

document.addEventListener('DOMContentLoaded', function() {

    // 1. Menu mobile : toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Fermer le menu quand on clique sur un lien (mobile)
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. Highlight du lien actif pendant le défilement (optionnel, pour le confort)
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        let scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100; // offset pour la hauteur du header
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // Ajouter un style pour l'élément actif (optionnel)
    const style = document.createElement('style');
    style.innerHTML = `
        .nav-link.active {
            color: var(--accent);
            border-bottom-color: var(--accent);
        }
    `;
    document.head.appendChild(style);

    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // exécuter au chargement
});
