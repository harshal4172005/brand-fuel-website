// phone-helper.js - Dynamic phone number handling and Quick Call functionality

(function() {
    'use strict';

    /**
     * Format phone number for tel: links
     * Removes spaces, dashes, and other formatting
     */
    function formatPhoneForTel(phone) {
        if (!phone) return '';
        // Remove all non-digit characters except +
        return phone.replace(/[^\d+]/g, '');
    }

    /**
     * Update all Quick Call links with phone number from admin data
     */
    function updateQuickCallLinks() {
        // Get phone number from localStorage (set by admin panel)
        const data = JSON.parse(localStorage.getItem('brandFuelData') || '{}');
        const phoneNumber = data.footer ? data.footer.contactPhone : '+919512841201'; // Default fallback
        
        // Format for tel: link
        const telNumber = formatPhoneForTel(phoneNumber);
        
        // Find all Quick Call buttons/links
        const quickCallElements = document.querySelectorAll('#cta-block-btn2, a[href*="tel:"]');
        
        quickCallElements.forEach(element => {
            if (element.id === 'cta-block-btn2' || element.textContent.includes('Quick Call')) {
                element.href = `tel:${telNumber}`;
                element.setAttribute('aria-label', `Quick Call: ${phoneNumber}`);
                
                // Add click tracking
                element.addEventListener('click', function() {
                    console.log('Quick Call clicked:', telNumber);
                    // Analytics tracking could go here
                });
            }
        });
        
        // Also update footer phone links
        const footerPhoneLinks = document.querySelectorAll('footer a[href*="tel:"]');
        footerPhoneLinks.forEach(link => {
            link.href = `tel:${telNumber}`;
        });
    }

    /**
     * Initialize phone number updates
     */
    function init() {
        // Update on page load
        updateQuickCallLinks();
        
        // Listen for admin panel updates
        if (window.BrandFuelDataLoader) {
            window.BrandFuelDataLoader.init(function(updatedData) {
                updateQuickCallLinks();
            });
        } else {
            // Fallback: listen for storage events
            window.addEventListener('storage', function(e) {
                if (e.key === 'brandFuelData' || e.key === 'brandfuel-content-updated') {
                    updateQuickCallLinks();
                }
            });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose function globally
    window.updateQuickCallLinks = updateQuickCallLinks;
})();

