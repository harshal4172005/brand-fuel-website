document.addEventListener('DOMContentLoaded', () => {
    console.log('Admin script loaded.');
    let siteData = {};

    // --- DOM Elements ---
    const form = document.getElementById('admin-form');
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    // --- Event Listeners ---
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.querySelector(`.tab-content[data-tab="${tab.dataset.tab}"]`).classList.add('active');
        });
    });

    form.addEventListener('submit', (e) => {
        console.log('Form submitted.');
        e.preventDefault();
        saveData();
        alert('Changes saved successfully!');
    });

    document.getElementById('logo-file').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('logo-data-url').value = event.target.result;
                ensureLogoPreview(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // --- Data Handling ---
    function loadData() {
        siteData = JSON.parse(localStorage.getItem('brandFuelData')) || {};
        populateForm();
        updateConfigPreview();
    }

    function saveData() {
        console.log('saveData function called.');
        gatherData();
        localStorage.setItem('brandFuelData', JSON.stringify(siteData));
        if (siteData.logoImage) {
            localStorage.setItem('logo-image', siteData.logoImage);
        } else {
            localStorage.removeItem('logo-image');
        }
        localStorage.setItem('brandfuel-content-updated', new Date().getTime());
        updateConfigPreview();
    }

    function gatherData() {
        console.log('gatherData function called.');
        const getValue = (id) => document.getElementById(id)?.value || '';
        siteData = {
            logoText: getValue('logo-text'),
            logoImage: document.getElementById('logo-data-url').value,
            fontFamily: getValue('font-select'),
            logoSize: getValue('logo-size'),
            heroHeadline: getValue('hero-headline'),
            heroSubhead: getValue('hero-subhead'),
            primaryCta: getValue('primary-cta'),
            secondaryCtaText: getValue('secondary-cta-text'),
            trustMetric: getValue('trust-metric'),
            homePage: {
                whatWeDoHeadline: getValue('what-we-do-headline'),
                spotlightCaseHeadline: getValue('spotlight-case-headline'),
                fuelSystemHeadline: getValue('fuel-system-headline'),
                fuelSystemStep1Headline: getValue('fuel-system-step1-headline'),
                fuelSystemStep1Text: getValue('fuel-system-step1-text'),
                fuelSystemStep2Headline: getValue('fuel-system-step2-headline'),
                fuelSystemStep2Text: getValue('fuel-system-step2-text'),
                fuelSystemStep3Headline: getValue('fuel-system-step3-headline'),
                fuelSystemStep3Text: getValue('fuel-system-step3-text'),
                socialProofHeadline: getValue('social-proof-headline'),
                ctaBlockHeadline: getValue('cta-block-headline'),
                ctaBlockBtn1Text: getValue('cta-block-btn1-text'),
                ctaBlockBtn2Text: getValue('cta-block-btn2-text'),
                ctaBlockBtn3Text: getValue('cta-block-btn3-text')
            },
            services: {
                headline: getValue('services-headline'),
                items: Array.from(document.querySelectorAll('.service-item')).map(el => ({
                    title: el.querySelector('input[type="text"]')?.value || '',
                    description: el.querySelector('textarea')?.value || '',
                    points: el.querySelector('textarea[data-points]')?.value.split('\n').filter(Boolean) || []
                }))
            },
            work: {
                headline: getValue('work-headline'),
                spotlightCase: getValue('spotlight-case'),
                caseStudies: Array.from(document.querySelectorAll('.work-item')).map(el => ({
                    title: el.querySelector('input[type="text"]')?.value || '',
                    description: el.querySelector('textarea')?.value || '',
                    imageUrl: el.querySelector('.case-image-data-url')?.value || ''
                }))
            },
            testimonials: {
                headline: getValue('testimonials-headline'),
                items: Array.from(document.querySelectorAll('.testimonial-item')).map(el => ({
                    name: el.querySelector('input[placeholder="Client Name"]')?.value || '',
                    company: el.querySelector('input[placeholder="Company Name"]')?.value || '',
                    text: el.querySelector('textarea')?.value || '',
                    imageUrl: el.querySelector('.testimonial-image-data-url')?.value || '',
                    videoUrl: el.querySelector('.testimonial-video-url')?.value || ''
                }))
            },
            footer: {
                contactEmail: getValue('contact-email'),
                contactPhone: getValue('contact-phone'),
                contactAddress: getValue('contact-address'),
                social: {
                    linkedin: getValue('social-linkedin'),
                    twitter: getValue('social-twitter'),
                    instagram: getValue('social-instagram')
                },
                legal: {
                    privacyUrl: getValue('legal-privacy-url'),
                    termsUrl: getValue('legal-terms-url')
                },
                newsletterText: getValue('newsletter-text')
            },
            loginPage: {
                headline: getValue('login-headline'),
                paragraph: getValue('login-paragraph')
            }
        };
    }

    function populateForm() {
        const setValue = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.value = value || '';
        };

        setValue('logo-text', siteData.logoText);
        setValue('font-select', siteData.fontFamily);
        setValue('logo-size', siteData.logoSize);
        setValue('logo-size-range', siteData.logoSize);
        setValue('hero-headline', siteData.heroHeadline);
        setValue('hero-subhead', siteData.heroSubhead);
        setValue('primary-cta', siteData.primaryCta);
        setValue('secondary-cta-text', siteData.secondaryCtaText);
        setValue('trust-metric', siteData.trustMetric);

        if (siteData.homePage) {
            setValue('what-we-do-headline', siteData.homePage.whatWeDoHeadline);
            setValue('spotlight-case-headline', siteData.homePage.spotlightCaseHeadline);
            setValue('fuel-system-headline', siteData.homePage.fuelSystemHeadline);
            setValue('fuel-system-step1-headline', siteData.homePage.fuelSystemStep1Headline);
            setValue('fuel-system-step1-text', siteData.homePage.fuelSystemStep1Text);
            setValue('fuel-system-step2-headline', siteData.homePage.fuelSystemStep2Headline);
            setValue('fuel-system-step2-text', siteData.homePage.fuelSystemStep2Text);
            setValue('fuel-system-step3-headline', siteData.homePage.fuelSystemStep3Headline);
            setValue('fuel-system-step3-text', siteData.homePage.fuelSystemStep3Text);
            setValue('social-proof-headline', siteData.homePage.socialProofHeadline);
            setValue('cta-block-headline', siteData.homePage.ctaBlockHeadline);
            setValue('cta-block-btn1-text', siteData.homePage.ctaBlockBtn1Text);
            setValue('cta-block-btn2-text', siteData.homePage.ctaBlockBtn2Text);
            setValue('cta-block-btn3-text', siteData.homePage.ctaBlockBtn3Text);
        }

        if (siteData.services) {
            setValue('services-headline', siteData.services.headline);
            const container = document.querySelector('.service-items');
            container.innerHTML = '';
            (siteData.services.items || []).forEach((item, idx) => {
                container.appendChild(createServiceElement(idx + 1, item));
            });
        }

        if (siteData.work) {
            setValue('work-headline', siteData.work.headline);
            setValue('spotlight-case', siteData.work.spotlightCase);
            const container = document.querySelector('.work-items');
            container.innerHTML = '';
            (siteData.work.caseStudies || []).forEach((item, idx) => {
                container.appendChild(createCaseStudyElement(idx + 1, item));
            });
        }

        if (siteData.testimonials) {
            setValue('testimonials-headline', siteData.testimonials.headline);
            const container = document.querySelector('.testimonial-items');
            container.innerHTML = '';
            (siteData.testimonials.items || []).forEach((item, idx) => {
                container.appendChild(createTestimonialElement(idx + 1, item));
            });
        }

        if (siteData.footer) {
            setValue('contact-email', siteData.footer.contactEmail);
            setValue('contact-phone', siteData.footer.contactPhone);
            setValue('contact-address', siteData.footer.contactAddress);
            if (siteData.footer.social) {
                setValue('social-linkedin', siteData.footer.social.linkedin);
                setValue('social-twitter', siteData.footer.social.twitter);
                setValue('social-instagram', siteData.footer.social.instagram);
            }
            if (siteData.footer.legal) {
                setValue('legal-privacy-url', siteData.footer.legal.privacyUrl);
                setValue('legal-terms-url', siteData.footer.legal.termsUrl);
            }
            setValue('newsletter-text', siteData.footer.newsletterText);
        }

        if (siteData.loginPage) {
            setValue('login-headline', siteData.loginPage.headline);
            setValue('login-paragraph', siteData.loginPage.paragraph);
        }
        
        if (siteData.logoImage) {
            ensureLogoPreview(siteData.logoImage);
        }
    }

    function updateConfigPreview() {
        const previewEl = document.getElementById('config-preview-content');
        if (!previewEl) return;
        const previewData = { ...siteData };
        if (previewData.logoImage) {
            previewData.logoImage = '(Logo image present)';
        }
        previewEl.textContent = JSON.stringify(previewData, null, 2);
    }
    
    function ensureLogoPreview(dataUrl){
        let preview = document.getElementById('logo-preview');
        if(!preview){
            const container = document.createElement('div');
            container.style.marginTop = '12px';
            preview = document.createElement('img');
            preview.id = 'logo-preview';
            container.appendChild(preview);
            document.querySelector('.logo-upload').appendChild(container);
        }
        preview.src = dataUrl;
        const size = document.getElementById('logo-size').value || 60;
        preview.style.height = size + 'px';
    }

    // --- Init ---
    loadData();

    // --- Dynamic Item Creation ---
    function createServiceElement(index, item = {}){
        const div = document.createElement('div');
        div.className = 'form-group service-item';
        div.innerHTML = `
            <h3>Service ${index}</h3>
            <input type="text" placeholder="Service Title" value="${item.title || ''}">
            <textarea placeholder="Service Description" rows="2">${item.description || ''}</textarea>
            <textarea data-points placeholder="Service Points (one per line)" rows="3">${(item.points || []).join('\n')}</textarea>
        `;
        const del = document.createElement('button');
        del.type = 'button';
        del.className = 'secondary-btn delete-btn';
        del.style.marginTop = '10px';
        del.textContent = 'Delete Service';
        del.addEventListener('click', () => div.remove());
        div.appendChild(del);
        return div;
    }

    function createCaseStudyElement(index, item = {}) {
        const div = document.createElement('div');
        div.className = 'form-group work-item';
        div.innerHTML = `
            <h3>Case Study ${index}</h3>
            <input type="text" placeholder="Case Study Title" value="${item.title || ''}">
            <textarea placeholder="Case Study Description" rows="3">${item.description || ''}</textarea>
            <label>Case Study Image</label>
            <input type="file" class="case-image" accept="image/*">
            <input type="hidden" class="case-image-data-url" value="${item.imageUrl || ''}">
            <img class="case-image-preview" src="${item.imageUrl || ''}" style="width: 100px; height: 100px; display: ${item.imageUrl ? 'block' : 'none'}; margin-top: 10px;">
        `;
        const del = document.createElement('button');
        del.type = 'button';
        del.className = 'secondary-btn delete-btn';
        del.style.marginTop = '10px';
        del.textContent = 'Delete Case Study';
        del.addEventListener('click', () => div.remove());
        div.appendChild(del);
        return div;
    }

    function createTestimonialElement(index, item = {}) {
        const div = document.createElement('div');
        div.className = 'form-group testimonial-item';
        div.innerHTML = `
            <h3>Testimonial ${index}</h3>
            <input type="text" placeholder="Client Name" value="${item.name || ''}">
            <input type="text" placeholder="Company Name" value="${item.company || ''}">
            <textarea placeholder="Testimonial Text" rows="3">${item.text || ''}</textarea>
            <label>Client Image</label>
            <input type="file" class="testimonial-image" accept="image/*">
            <input type="hidden" class="testimonial-image-data-url" value="${item.imageUrl || ''}">
            <img class="testimonial-image-preview" src="${item.imageUrl || ''}" style="width: 100px; height: 100px; display: ${item.imageUrl ? 'block' : 'none'}; margin-top: 10px;">
            <h4 style="margin-top: 20px;">Testimonial Video</h4>
            <div class="form-group">
                <label>Or Video URL</label>
                <input type="url" class="testimonial-video-url" placeholder="https://example.com/video" value="${item.videoUrl || ''}">
            </div>
            <video class="testimonial-video-preview" controls style="width: 100%; display: none; margin-top: 10px;"></video>
        `;
        const del = document.createElement('button');
        del.type = 'button';
        del.className = 'secondary-btn delete-btn';
        del.style.marginTop = '10px';
        del.textContent = 'Delete Testimonial';
        del.addEventListener('click', () => div.remove());
        div.appendChild(del);
        return div;
    }

    document.getElementById('add-service')?.addEventListener('click', () => {
        const container = document.querySelector('.service-items');
        const count = container.querySelectorAll('.service-item').length + 1;
        container.appendChild(createServiceElement(count));
    });

    document.getElementById('add-case-study')?.addEventListener('click', () => {
        const container = document.querySelector('.work-items');
        const count = container.querySelectorAll('.work-item').length + 1;
        container.appendChild(createCaseStudyElement(count));
    });

    document.getElementById('add-testimonial')?.addEventListener('click', () => {
        const container = document.querySelector('.testimonial-items');
        const count = container.querySelectorAll('.testimonial-item').length + 1;
        container.appendChild(createTestimonialElement(count));
    });

    document.querySelector('.testimonial-items').addEventListener('change', function(e) {
        if (e.target.classList.contains('testimonial-image')) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                const item = e.target.closest('.testimonial-item');
                const preview = item.querySelector('.testimonial-image-preview');
                const dataUrlInput = item.querySelector('.testimonial-image-data-url');

                reader.onload = function(event) {
                    dataUrlInput.value = event.target.result;
                    preview.src = event.target.result;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        }
    });

    document.querySelector('.work-items').addEventListener('change', function(e) {
        if (e.target.classList.contains('case-image')) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                const item = e.target.closest('.work-item');
                const preview = item.querySelector('.case-image-preview');
                const dataUrlInput = item.querySelector('.case-image-data-url');

                reader.onload = function(event) {
                    dataUrlInput.value = event.target.result;
                    preview.src = event.target.result;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        }
    });
});