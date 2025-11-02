document.addEventListener('DOMContentLoaded', function() {
    const data = JSON.parse(localStorage.getItem('brandFuelData')) || {};

    // --- Helper Functions ---
    const setIf = (id, value, property = 'textContent') => {
        const el = document.getElementById(id);
        if (el && value) {
            el[property] = value;
        }
    };

    // Font
    if (data.fontFamily) {
        const fontName = data.fontFamily.replace(/ /g, '+');
        const fontLink = document.createElement('link');
        fontLink.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@100;200;300;400;500;600;700;800;900&display=swap`;
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
        document.body.style.fontFamily = `'${data.fontFamily}', sans-serif`;
    }

    // Logo
    const logoImage = localStorage.getItem('logo-image');
    const logoSize = data.logoSize || 60;
    const logoEl = document.querySelector('.logo');
    if (logoEl) {
        if (logoImage) {
            logoEl.innerHTML = `<img src="${logoImage}" alt="Brand Fuel Logo" style="height:${logoSize}px;">`;
        } else {
            logoEl.innerHTML = `<img src="assets/logo.svg" alt="Brand Fuel Logo" style="height:${logoSize}px;">`;
        }
    }

    // Services Headline
    if (data.services) {
        setIf('services-headline', data.services.headline);
    }

    // Populate services
    if (data.services && data.services.items) {
        const container = document.querySelector('.service-cards');
        if (container) {
            container.innerHTML = '';
            data.services.items.forEach(service => {
                const card = document.createElement('div');
                card.className = 'service-card';
                const points = (service.points || []).map(p => `<li>${p}</li>`).join('');
                card.innerHTML = `<h3>${service.title || ''}</h3><p>${service.description || ''}</p><ul>${points}</ul>`;
                container.appendChild(card);
            });
        }
    }

    // Footer
    if (data.footer) {
        const setLink = (id, url) => {
            const el = document.getElementById(id);
            if (el && url) el.href = url;
        };
        setIf('footer-email', data.footer.contactEmail);
        setIf('contact-phone-text', data.footer.contactPhone);
        setIf('contact-email-text', data.footer.contactEmail);
        setIf('contact-address-text', data.footer.contactAddress);
        if (data.footer.social) {
            setLink('social-linkedin-link', data.footer.social.linkedin);
            setLink('social-twitter-link', data.footer.social.twitter);
            setLink('social-instagram-link', data.footer.social.instagram);
        }
        if (data.footer.legal) {
            setLink('legal-privacy-link', data.footer.legal.privacyUrl);
            setLink('legal-terms-link', data.footer.legal.termsUrl);
        }
        const newsletterInput = document.getElementById('newsletter-input');
        if(newsletterInput) newsletterInput.placeholder = data.footer.newsletterText;
    }

    // Listen for storage changes
    window.addEventListener('storage', (e) => {
        if (e.key === 'brandfuel-content-updated') {
            window.location.reload();
        }
    });
});
