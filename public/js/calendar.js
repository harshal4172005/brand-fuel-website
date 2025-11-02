// calendar.js - Google Calendar booking integration

(function() {
    'use strict';

    /**
     * Open Google Calendar with pre-filled event details
     * @param {Object} options - Event options
     */
    function openGoogleCalendar(options = {}) {
        const defaults = {
            text: 'Brand Fuel - 15 Minute Discovery Call',
            dates: getNextAvailableSlot(), // Get next available 15-minute slot
            details: 'Join us for a quick 15-minute discovery call to discuss how Brand Fuel can help fuel your brand\'s growth.\n\nWe\'ll explore:\n- Your brand goals and challenges\n- Growth opportunities\n- How we can help fuel your success\n\nLooking forward to connecting with you!',
            location: 'Online (Video Call)'
        };

        const params = Object.assign({}, defaults, options);
        
        // Build Google Calendar URL (using the correct format)
        const baseUrl = 'https://calendar.google.com/calendar/render';
        
        // Encode parameters properly
        const queryParams = new URLSearchParams({
            action: 'TEMPLATE',
            text: params.text,
            dates: params.dates,
            details: params.details,
            location: params.location,
            sf: 'true',
            output: 'xml'
        });

        const calendarUrl = `${baseUrl}?${queryParams.toString()}`;
        
        // Open in new window/tab
        window.open(calendarUrl, '_blank', 'noopener,noreferrer');
        
        console.log('Opening Google Calendar:', calendarUrl);
        
        // Return URL for testing purposes
        return calendarUrl;
    }

    /**
     * Get next available 15-minute slot (defaults to tomorrow at 10 AM)
     * Format: YYYYMMDDTHHMMSSZ (UTC)
     */
    function getNextAvailableSlot() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(10, 0, 0, 0); // 10:00 AM
        
        // Convert to UTC and format for Google Calendar
        const startDate = new Date(tomorrow.toISOString());
        const endDate = new Date(startDate);
        endDate.setMinutes(endDate.getMinutes() + 15); // 15 minute meeting
        
        // Format: YYYYMMDDTHHMMSSZ
        function formatDate(date) {
            const year = date.getUTCFullYear();
            const month = String(date.getUTCMonth() + 1).padStart(2, '0');
            const day = String(date.getUTCDate()).padStart(2, '0');
            const hours = String(date.getUTCHours()).padStart(2, '0');
            const minutes = String(date.getUTCMinutes()).padStart(2, '0');
            const seconds = String(date.getUTCSeconds()).padStart(2, '0');
            return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
        }
        
        return `${formatDate(startDate)}/${formatDate(endDate)}`;
    }

    /**
     * Initialize calendar booking for all primary CTA buttons
     */
    function initCalendarBooking() {
        // Find all "Book a 15-min Fuel Call" buttons
        const bookingButtons = document.querySelectorAll('#primary-cta, button.primary-cta[id="primary-cta"]');
        
        bookingButtons.forEach(button => {
            // Remove any existing event listeners by cloning
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Add calendar booking functionality
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get button text for customization
                const buttonText = this.textContent.trim();
                
                openGoogleCalendar({
                    text: buttonText || 'Brand Fuel - 15 Minute Discovery Call',
                    details: `Schedule a 15-minute discovery call with Brand Fuel to discuss how we can help fuel your brand's growth. We'll explore your goals, challenges, and opportunities.\n\nLooking forward to connecting with you!`
                });
            });
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCalendarBooking);
    } else {
        initCalendarBooking();
    }

    // Re-initialize after dynamic content loads (for admin panel updates)
    if (window.BrandFuelDataLoader) {
        const originalInit = window.BrandFuelDataLoader.init;
        window.BrandFuelDataLoader.init = function(onUpdate) {
            originalInit.call(this, function(updatedData) {
                if (onUpdate) onUpdate(updatedData);
                // Re-initialize calendar after content updates
                setTimeout(initCalendarBooking, 100);
            });
        };
    }

    // Expose function globally for manual use
    window.openBrandFuelCalendar = openGoogleCalendar;
})();

