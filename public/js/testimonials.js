// Load data-loader first (must be included before this script)
// testimonials.js - Testimonials page data loading with automatic refresh

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

        // Testimonials Headline
        if (data.testimonials) {
            setIf('testimonials-headline', data.testimonials.headline);
        }

        // Populate testimonials
        if (data.testimonials && data.testimonials.items) {
            const container = document.querySelector('.testimonials-container');
            if (container) {
                container.innerHTML = '';
                data.testimonials.items.forEach(testimonial => {
                    const card = document.createElement('div');
                    card.className = 'testimonial-card';
                    let mediaHtml = '';
                    if (testimonial.imageUrl) {
                        mediaHtml += `<img src="${testimonial.imageUrl}" alt="${testimonial.name}" class="testimonial-image">`;
                    }
                    if (testimonial.videoUrl) {
                        mediaHtml += `<video controls class="testimonial-video"><source src="${testimonial.videoUrl}" type="video/mp4"></video>`;
                    }
                    card.innerHTML = `
                        ${mediaHtml}
                        <p>"${testimonial.text || ''}"</p>
                        <cite>- ${testimonial.name || ''}${testimonial.company ? ', ' + testimonial.company : ''}</cite>
                    `;
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
    }

    // Initialize on DOM ready
    function init() {
        // Load initial data
        const initialData = window.BrandFuelDataLoader ? window.BrandFuelDataLoader.load() : { data: {}, logoImage: null };
        populatePage(initialData);

        // Set up automatic refresh if data-loader is available
        if (window.BrandFuelDataLoader) {
            window.BrandFuelDataLoader.init(function(updatedData) {
                console.log('testimonials.js: Data updated, refreshing page content');
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
