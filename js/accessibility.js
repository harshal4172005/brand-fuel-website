// Accessibility enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add tabindex and aria-labels to interactive elements
    const buttons = document.querySelectorAll('button, .cta-button, .secondary-cta');
    buttons.forEach(btn => {
        if (!btn.hasAttribute('tabindex')) {
            btn.setAttribute('tabindex', '0');
        }
        if (!btn.hasAttribute('aria-label') && btn.textContent) {
            btn.setAttribute('aria-label', btn.textContent.trim());
        }
    });

    // Keyboard navigation for cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', card.querySelector('h3').textContent + ' service');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Focus management
    const focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(el => {
        el.addEventListener('focus', function() {
            this.style.outline = '2px solid #ff6b35';
        });
        el.addEventListener('blur', function() {
            this.style.outline = '';
        });
    });
});
