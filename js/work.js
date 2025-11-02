// Load data-loader first (must be included before this script)
// work.js - Work page data loading with automatic refresh

(function() {
    'use strict';

    // --- Helper Functions ---
    const setIf = (id, value, property = 'textContent') => {
        const el = document.getElementById(id);
        if (el && value) {
            el[property] = value;
        }
    };

    // --- Populate Page Function ---
    function populatePage({ data, logoImage }) {
        if (!data) {
            data = {};
        }

        // Font
        if (data.fontFamily) {
            // Remove existing font link if any
            const existingFontLink = document.querySelector('link[href*="fonts.googleapis.com"]');
            if (existingFontLink && existingFontLink.href.includes('family=')) {
                existingFontLink.remove();
            }

            const fontName = data.fontFamily.replace(/ /g, '+');
            const fontLink = document.createElement('link');
            fontLink.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@100;200;300;400;500;600;700;800;900&display=swap`;
            fontLink.rel = 'stylesheet';
            document.head.appendChild(fontLink);
            document.body.style.fontFamily = `'${data.fontFamily}', sans-serif`;
        }

        // Logo
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
    }

    // Initialize on DOM ready
    function init() {
        // Load initial data
        const initialData = window.BrandFuelDataLoader ? window.BrandFuelDataLoader.load() : { data: {}, logoImage: null };
        populatePage(initialData);

        // Set up automatic refresh if data-loader is available
        if (window.BrandFuelDataLoader) {
            window.BrandFuelDataLoader.init(function(updatedData) {
                console.log('work.js: Data updated, refreshing page content');
                populatePage(updatedData);
            });
        }
    }

    // Wait for DOM and data-loader
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM already ready, wait a tick for data-loader to be available
        setTimeout(init, 0);
    }
})();
