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

    // Work Headline
    if (data.work) {
        setIf('work-headline', data.work.headline);
    }

    // Populate work items
    if (data.work && data.work.caseStudies) {
        const container = document.querySelector('.work-items');
        if (container) {
            container.innerHTML = '';
            data.work.caseStudies.forEach(caseStudy => {
                const item = document.createElement('div');
                item.className = 'work-item';
                let imageHtml = '';
                if (caseStudy.imageUrl) {
                    imageHtml = `<img src="${caseStudy.imageUrl}" alt="${caseStudy.title}" class="case-study-image">`;
                }
                item.innerHTML = `
                    ${imageHtml}
                    <h3>${caseStudy.title || ''}</h3>
                    <p>${caseStudy.description || ''}</p>
                `;
                container.appendChild(item);
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
