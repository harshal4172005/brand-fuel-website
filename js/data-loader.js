// data-loader.js - Shared utility for loading and refreshing site data
// Provides polling, visibility-based refresh, and cross-tab synchronization

(function() {
    'use strict';

    const UPDATE_CHECK_KEY = 'brandfuel-content-updated';
    const DATA_KEY = 'brandFuelData';
    const LOGO_KEY = 'logo-image';
    
    // Check for updates every 1 second (can be adjusted)
    const POLL_INTERVAL = 1000;
    let lastUpdateTimestamp = null;
    let pollIntervalId = null;

    // Get the current update timestamp
    function getUpdateTimestamp() {
        return localStorage.getItem(UPDATE_CHECK_KEY);
    }

    // Check if data has been updated
    function hasUpdate() {
        const currentTimestamp = getUpdateTimestamp();
        if (currentTimestamp !== lastUpdateTimestamp) {
            lastUpdateTimestamp = currentTimestamp;
            return true;
        }
        return false;
    }

    // Load data from localStorage
    function loadData() {
        try {
            const data = JSON.parse(localStorage.getItem(DATA_KEY)) || {};
            const logoImage = localStorage.getItem(LOGO_KEY);
            return { data, logoImage };
        } catch (e) {
            console.error('Error loading data:', e);
            return { data: {}, logoImage: null };
        }
    }

    // Initialize update checking
    function initUpdateChecker(onUpdate) {
        if (typeof onUpdate !== 'function') {
            console.error('data-loader: onUpdate must be a function');
            return;
        }

        // Set initial timestamp
        lastUpdateTimestamp = getUpdateTimestamp();

        // Listen for storage events (works for cross-tab updates)
        window.addEventListener('storage', function(e) {
            if (e.key === UPDATE_CHECK_KEY || e.key === DATA_KEY || e.key === LOGO_KEY) {
                console.log('data-loader: Storage event detected, reloading data');
                onUpdate(loadData());
            }
        });

        // Poll for updates (works within same tab)
        pollIntervalId = setInterval(function() {
            if (hasUpdate()) {
                console.log('data-loader: Update detected via polling, reloading data');
                onUpdate(loadData());
            }
        }, POLL_INTERVAL);

        // Check when page becomes visible again (user switches back to tab)
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden && hasUpdate()) {
                console.log('data-loader: Page visible and update detected, reloading data');
                onUpdate(loadData());
            }
        });

        // Check on focus (when user clicks back into the window)
        window.addEventListener('focus', function() {
            if (hasUpdate()) {
                console.log('data-loader: Window focused and update detected, reloading data');
                onUpdate(loadData());
            }
        });

        // Also listen for custom events (for same-tab updates)
        window.addEventListener('brandfuel-data-updated', function() {
            console.log('data-loader: Custom event detected, reloading data');
            lastUpdateTimestamp = getUpdateTimestamp();
            onUpdate(loadData());
        });
    }

    // Cleanup polling interval
    function cleanup() {
        if (pollIntervalId) {
            clearInterval(pollIntervalId);
            pollIntervalId = null;
        }
    }

    // Expose API
    window.BrandFuelDataLoader = {
        load: loadData,
        init: initUpdateChecker,
        cleanup: cleanup,
        getTimestamp: getUpdateTimestamp
    };
})();

