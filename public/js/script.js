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
    document.querySelectorAll('.primary-cta, .cta-option').forEach(btn => {
        btn.addEventListener('click', function() {
            // Simulate booking or form
            alert('Thank you! We\'ll be in touch soon.');
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

