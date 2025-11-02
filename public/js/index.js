document.addEventListener('DOMContentLoaded', function() {
    const data = JSON.parse(localStorage.getItem('brandFuelData')) || {};

    // --- Helper Functions ---
    const setIf = (id, value, property = 'textContent') => {
        const el = document.getElementById(id);
        if (el && value) {
            el[property] = value;
        }
    };

    // --- Populate Page ---
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

    // Hero
    setIf('hero-headline', data.heroHeadline);
    setIf('hero-subhead', data.heroSubhead);
    setIf('primary-cta', data.primaryCta);
    setIf('secondary-cta', data.secondaryCtaText);

    // Trust Strip
    setIf('trust-metric', data.trustMetric);

    // Home Page Content
    if (data.homePage) {
        setIf('what-we-do-headline', data.homePage.whatWeDoHeadline);
        setIf('spotlight-case-headline', data.homePage.spotlightCaseHeadline);
        setIf('fuel-system-headline', data.homePage.fuelSystemHeadline);
        setIf('fuel-system-step1-headline', data.homePage.fuelSystemStep1Headline);
        setIf('fuel-system-step1-text', data.homePage.fuelSystemStep1Text);
        setIf('fuel-system-step2-headline', data.homePage.fuelSystemStep2Headline);
        setIf('fuel-system-step2-text', data.homePage.fuelSystemStep2Text);
        setIf('fuel-system-step3-headline', data.homePage.fuelSystemStep3Headline);
        setIf('fuel-system-step3-text', data.homePage.fuelSystemStep3Text);
        setIf('social-proof-headline', data.homePage.socialProofHeadline);
        setIf('cta-block-headline', data.homePage.ctaBlockHeadline);
        setIf('cta-block-btn1', data.homePage.ctaBlockBtn1Text);
        setIf('cta-block-btn2', data.homePage.ctaBlockBtn2Text);
        setIf('cta-block-btn3', data.homePage.ctaBlockBtn3Text);
    }

    // Services
    if (data.services && data.services.items) {
        const cards = document.querySelector('.cards');
        if (cards) {
            cards.innerHTML = '';
            data.services.items.forEach(svc => {
                const card = document.createElement('div');
                card.className = 'card';
                const points = (svc.points || []).map(p => `<li>${p}</li>`).join('');
                card.innerHTML = `<h3>${svc.title || ''}</h3><p>${svc.description || ''}</p><ul>${points}</ul>`;
                cards.appendChild(card);
            });
        }
    }

    // Testimonials
    if (data.testimonials && data.testimonials.items) {
        const tcontainer = document.querySelector('.testimonials');
        if (tcontainer) {
            tcontainer.innerHTML = '';
            data.testimonials.items.forEach(t => {
                const card = document.createElement('div');
                card.className = 'testimonial';
                card.innerHTML = `<p>"${t.text || ''}"</p><cite>- ${t.name || ''}${t.company ? ', ' + t.company : ''}</cite>`;
                tcontainer.appendChild(card);
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

    // Spotlight Case Content
    if (data.work && data.work.spotlightCase) {
        const spotlightEl = document.getElementById('spotlight-case-content');
        if (spotlightEl) {
            spotlightEl.innerHTML = data.work.spotlightCase;
        }
    }
});

window.addEventListener('storage', (e) => {
    if (e.key === 'brandfuel-content-updated') {
        window.location.reload();
    }
});