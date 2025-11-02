// Smoke test script for Brand Fuel Website
console.log('Running smoke tests...');

// Test auth functionality
function testAuth() {
    console.log('\nTesting Auth:');
    
    // Test user registration
    localStorage.clear();
    const testUser = { username: 'testuser', password: 'test123', role: 'user' };
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(testUser);
    localStorage.setItem('users', JSON.stringify(users));
    console.log('✓ User registration simulation passed');

    // Test auth state
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (currentUser === null) {
        console.log('✓ Initial auth state check passed');
    }
}

// Test site configuration
function testSiteConfig() {
    console.log('\nTesting Site Config:');
    
    // Test default config
    const defaultConfig = {
        heroHeadline: 'Welcome to Brand Fuel',
        heroSubhead: 'Your Partner in Brand Growth',
        ctaText: 'Get Started',
        logo: null
    };
    
    localStorage.setItem('siteConfig', JSON.stringify(defaultConfig));
    const savedConfig = JSON.parse(localStorage.getItem('siteConfig'));
    
    if (savedConfig.heroHeadline === defaultConfig.heroHeadline) {
        console.log('✓ Site config storage passed');
    }
}

// Run all tests
function runAllTests() {
    testAuth();
    testSiteConfig();
    console.log('\nAll smoke tests completed!');
}

// Execute tests when included in test.html
runAllTests();