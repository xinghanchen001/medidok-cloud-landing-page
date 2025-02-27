document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scrolling für Navigation Links
    const navLinks = document.querySelectorAll('nav a, .btn[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Sticky Header
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'white';
        }
    });
    
    // Formular-Validierung und -Verarbeitung
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Formular-Daten sammeln
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Einfache Validierung
            let isValid = true;
            let errorMessage = '';
            
            if (!formData.name.trim()) {
                isValid = false;
                errorMessage += 'Bitte geben Sie Ihren Namen ein.\n';
            }
            
            if (!formData.email.trim() || !isValidEmail(formData.email)) {
                isValid = false;
                errorMessage += 'Bitte geben Sie eine gültige E-Mail-Adresse ein.\n';
            }
            
            if (!formData.message.trim()) {
                isValid = false;
                errorMessage += 'Bitte geben Sie eine Nachricht ein.\n';
            }
            
            if (!isValid) {
                alert(errorMessage);
                return;
            }
            
            // In einer realen Anwendung würden hier die Daten an einen Server gesendet werden
            // Hier simulieren wir eine erfolgreiche Übermittlung
            alert('Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze bei Ihnen melden.');
            contactForm.reset();
        });
    }
    
    // E-Mail-Validierungsfunktion
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Animation für Feature-Karten
    const featureCards = document.querySelectorAll('.feature-card');
    
    if (featureCards.length > 0) {
        window.addEventListener('scroll', function() {
            featureCards.forEach(card => {
                const cardPosition = card.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (cardPosition < screenPosition) {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }
            });
        });
        
        // Initial Style setzen
        featureCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    }
}); 