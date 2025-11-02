// Micro-interactions and animations
document.addEventListener('DOMContentLoaded', function() {
    // Scroll-triggered reveals
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Card hover effects
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // CTA button interactions
    // Note: Primary CTA (Book a Call) is handled by calendar.js
    // Quick Call is handled by phone-helper.js with tel: links
    // Only handle other CTA options that need custom behavior
    
    document.querySelectorAll('.cta-option').forEach(btn => {
        // Skip Quick Call (handled by tel: link) and primary-cta (handled by calendar.js)
        if (btn.id === 'cta-block-btn2' || btn.classList.contains('primary-cta')) {
            return;
        }
        
        btn.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            
            // Handle different CTA options
            if (buttonText.includes('Free Audit') || buttonText.includes('Audit')) {
                e.preventDefault();
                // Could open a form or redirect to contact page
                window.location.href = 'contact.html?action=audit';
            } else if (buttonText.includes('RFP')) {
                e.preventDefault();
                // Could open RFP form or contact page
                window.location.href = 'contact.html?action=rfp';
            }
            // Other buttons can have their default behavior
        });
    });

    // Service modals (expandable deep-dive)
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            const service = this.dataset.service;
            // In a real implementation, this would open a modal with detailed info
            alert(`Detailed info for ${service} service would open here.`);
        });
    });
});

