// nav-auth.js - show current user and sign out link in nav
document.addEventListener('DOMContentLoaded', function(){
    try {
        const cur = (window.BFAuth && typeof window.BFAuth.currentUser === 'function') 
            ? window.BFAuth.currentUser() 
            : JSON.parse(localStorage.getItem('bf_current_user') || 'null');
        
        const desktopNav = document.querySelector('.top-nav .container nav ul');
        const mobileNav = document.querySelector('.mobile-nav');
        
        // Create mobile nav if it doesn't exist
        if (!mobileNav && desktopNav) {
            const mobileNavDiv = document.createElement('div');
            mobileNavDiv.className = 'mobile-nav';
            const mobileNavUl = document.createElement('ul');
            mobileNavDiv.appendChild(mobileNavUl);
            document.body.appendChild(mobileNavDiv);
        }

        function createAuthElement(isMobile) {
            const li = document.createElement('li');
            li.id = isMobile ? 'mobile-nav-user-li' : 'nav-user-li';
            li.className = 'nav-auth-item';
            if (!isMobile) li.style.marginLeft = '20px';
            
            if(cur && cur.username){
                if (isMobile) {
                    // Mobile: Just show sign out
                    const signout = document.createElement('a');
                    signout.href = '#';
                    signout.textContent = 'Sign out';
                    signout.style.color = '#ff6b35';
                    signout.addEventListener('click', function(e){ 
                        e.preventDefault(); 
                        if(window.BFAuth && typeof window.BFAuth.signout === 'function') {
                            window.BFAuth.signout();
                        } else { 
                            localStorage.removeItem('bf_current_user'); 
                            window.location.href = 'login.html'; 
                        }
                    });
                    li.appendChild(signout);
                } else {
                    // Desktop: Show welcome message and sign out
                    const span = document.createElement('span');
                    span.textContent = `Welcome, ${cur.username}`;
                    span.style.marginRight = '10px';
                    span.style.fontWeight = '600';
                    const signout = document.createElement('a');
                    signout.href = '#';
                    signout.textContent = 'Sign out';
                    signout.addEventListener('click', function(e){ 
                        e.preventDefault(); 
                        if(window.BFAuth && typeof window.BFAuth.signout === 'function') {
                            window.BFAuth.signout();
                        } else { 
                            localStorage.removeItem('bf_current_user'); 
                            window.location.href = 'login.html'; 
                        }
                    });
                    li.appendChild(span);
                    li.appendChild(signout);
                }
            } else {
                const a = document.createElement('a');
                a.href = 'login.html';
                a.textContent = 'Sign in';
                if (isMobile) {
                    a.style.color = '#ff6b35';
                }
                li.appendChild(a);
            }
            return li;
        }

        // Update desktop nav
        if (desktopNav) {
            const existingDesktop = document.getElementById('nav-user-li');
            if(existingDesktop) existingDesktop.remove();
            desktopNav.appendChild(createAuthElement(false));
        }

        // Update mobile nav
        const mobileNavUl = document.querySelector('.mobile-nav ul');
        if (mobileNavUl) {
            const existingMobile = document.getElementById('mobile-nav-user-li');
            if(existingMobile) existingMobile.remove();
            mobileNavUl.appendChild(createAuthElement(true));
        }

        // Add mobile nav toggle if doesn't exist
        if (!document.querySelector('.mobile-nav-toggle')) {
            const toggle = document.createElement('button');
            toggle.className = 'mobile-nav-toggle';
            toggle.innerHTML = `
                <span class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            `;
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                document.querySelector('.mobile-nav').classList.toggle('active');
            });
            document.querySelector('.top-nav .container').appendChild(toggle);
        }

    } catch(e) {
        // Log errors but don't break the page
        console.error('Nav auth error:', e);
    }
});
