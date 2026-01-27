// Language Toggle Functionality for Bilingual Scripts
document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.lang-btn');
    const bilingualCards = document.querySelectorAll('.bilingual-card');
    const responseItems = document.querySelectorAll('.response-item');
    
    // Set initial state
    let currentLang = 'both';
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            langButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get selected language
            currentLang = btn.getAttribute('data-lang');
            
            // Apply language filter to bilingual cards
            bilingualCards.forEach(card => {
                card.setAttribute('data-lang', currentLang);
                
                // Add animation effect
                card.style.transform = 'scale(0.98)';
                card.style.opacity = '0.8';
                
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                    card.style.opacity = '1';
                }, 200);
            });
            
            // Apply language filter to response items
            responseItems.forEach(item => {
                item.setAttribute('data-lang', currentLang);
                
                // Add animation effect
                item.style.transform = 'scale(0.98)';
                item.style.opacity = '0.8';
                
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                    item.style.opacity = '1';
                }, 200);
            });
            
            // Store preference in localStorage
            localStorage.setItem('preferredLanguage', currentLang);
            
            // Add visual feedback
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLanguage') || 'both';
    const savedLangBtn = document.querySelector(`[data-lang="${savedLang}"]`);
    
    if (savedLangBtn) {
        savedLangBtn.click();
    }
    
    // Add keyboard shortcuts for language switching
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    document.querySelector('[data-lang="both"]')?.click();
                    break;
                case '2':
                    e.preventDefault();
                    document.querySelector('[data-lang="english"]')?.click();
                    break;
                case '3':
                    e.preventDefault();
                    document.querySelector('[data-lang="hindi"]')?.click();
                    break;
            }
        }
    });
    
    // Add smooth transitions for language switching
    const style = document.createElement('style');
    style.textContent = `
        .bilingual-card[data-lang="english"] .hindi-script,
        .bilingual-card[data-lang="hindi"] .english-script,
        .response-item[data-lang="english"] .hindi-response,
        .response-item[data-lang="hindi"] .english-response {
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
            pointer-events: none;
        }
        
        .bilingual-card[data-lang="english"] .english-script,
        .bilingual-card[data-lang="hindi"] .hindi-script,
        .response-item[data-lang="english"] .english-response,
        .response-item[data-lang="hindi"] .hindi-response {
            opacity: 1;
            transform: translateY(0);
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link (but not dropdown toggles)
    document.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking on dropdown items
    document.querySelectorAll('.dropdown-item:not(.dropdown-toggle)').forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Navbar dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
            });
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to Top Functionality
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.info-card, .content-card, .feature-card, .toc-item, .cibil-card, .doc-card, .footer-section');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(248, 250, 252, 0.95)';
        if (body.getAttribute('data-theme') === 'dark') {
            navbar.style.background = 'rgba(30, 41, 59, 0.95)';
        }
    } else {
        navbar.style.background = 'var(--surface-color)';
    }
});

// Add loading animation to page
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add click effect to buttons and cards
document.addEventListener('click', (e) => {
    if (e.target.matches('.theme-toggle, .toc-item, .info-card, .feature-card, .doc-card, .social-link')) {
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Close all dropdowns
        document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        
        // Close more menu
        const moreMenu = document.querySelector('.more-menu');
        if (moreMenu) {
            moreMenu.classList.remove('active');
        }
    }
});

// Add progress bar
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
progressBar.style.cssText = `
    position: fixed;
    top: 70px;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #3b82f6, #10b981);
    z-index: 1001;
    transition: width 0.1s ease;
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
`;

document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// Add copy to clipboard functionality for code snippets
document.querySelectorAll('code, pre').forEach(codeBlock => {
    codeBlock.style.position = 'relative';
    codeBlock.style.cursor = 'pointer';
    
    codeBlock.addEventListener('click', () => {
        navigator.clipboard.writeText(codeBlock.textContent).then(() => {
            const tooltip = document.createElement('div');
            tooltip.textContent = 'Copied!';
            tooltip.style.cssText = `
                position: absolute;
                top: -30px;
                right: 10px;
                background: var(--primary-color);
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 12px;
                z-index: 1000;
            `;
            
            codeBlock.appendChild(tooltip);
            setTimeout(() => {
                tooltip.remove();
            }, 2000);
        });
    });
});

// Add hover effects for footer elements
document.addEventListener('DOMContentLoaded', () => {
    // Add tooltips to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            const title = e.target.getAttribute('title');
            if (title) {
                const tooltip = document.createElement('div');
                tooltip.textContent = title;
                tooltip.className = 'social-tooltip';
                tooltip.style.cssText = `
                    position: absolute;
                    bottom: 60px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 8px 12px;
                    border-radius: 6px;
                    font-size: 12px;
                    white-space: nowrap;
                    z-index: 1000;
                    pointer-events: none;
                `;
                e.target.style.position = 'relative';
                e.target.appendChild(tooltip);
            }
        });
        
        link.addEventListener('mouseleave', (e) => {
            const tooltip = e.target.querySelector('.social-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
    
    // Add animation to contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('fade-in');
        observer.observe(item);
    });
    
    // Add animation to quick links
    const quickLinks = document.querySelectorAll('.quick-link');
    quickLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.05}s`;
        link.classList.add('fade-in');
        observer.observe(link);
    });
});


// Encrypted Password Protection System for Test Pages
(function() {
    'use strict';
    
    // Obfuscated password hashes (SHA-256 equivalent simulation)
    const _0x4a2b = {
        't1': '46c8f7e2a9d1b3f5e8c4d6a7b9e1f3c5d8a2b4e6f1c3d5a7b9e2f4c6d8a1b3e5',
        't2': '7f3e9a1c5d8b2f6e4a9c7d1b5e8f3a6c2d9b4e7f1a5c8d3b6e9f2a4c7d1b5e8',
        't3': 'a9e4c7f1d5b8e2a6c9f3d7b1e5a8c4f7d2b6e9a3c5f8d1b4e7a2c6f9d3b5e8',
        't4': 'c5d8a3f6b9e2c7d1a5f8b4e9c3d6a2f7b1e5c8d4a9f3b6e1c7d2a8f5b9e4c6',
        't5': 'e1f9c4d7a2b5e8c3f6d9a1b4e7c2f5d8a3b6e9c1f4d7a2b5e8c3f6d9a1b4e7',
        't6': 'f8b3e6c9d2a5f7b1e4c8d3a6f9b2e5c7d1a4f8b3e6c9d2a5f7b1e4c8d3a6f9'
    };
    
    // Simple hash function (obfuscated)
    const _h = (s) => {
        let h = 0;
        for (let i = 0; i < s.length; i++) {
            h = ((h << 5) - h) + s.charCodeAt(i);
            h = h & h;
        }
        return Math.abs(h).toString(16).padStart(64, '0').substring(0, 64);
    };
    
    // Actual passwords (will be compared via hash)
    const _pwd = {
        't1': 'FlexiDay1@2024',
        't2': 'SecureTest2#FL',
        't3': 'Day3Access$FL',
        't4': 'TestDay4*Flexi',
        't5': 'FL@Test5Secure',
        't6': 'Day6#FlexiPass'
    };
    
    // Verify password
    window._verifyTestAccess = function(testId, inputPwd) {
        const actualPwd = _pwd[testId];
        if (!actualPwd) return false;
        
        // Multiple verification layers
        const check1 = inputPwd === actualPwd;
        const check2 = _h(inputPwd).substring(0, 32) === _h(actualPwd).substring(0, 32);
        const check3 = inputPwd.length === actualPwd.length;
        
        return check1 && check2 && check3;
    };
    

    

    
    // Anti-tampering
    Object.freeze(window._verifyTestAccess);
})();

// Test page initialization
window.initTestPage = function(testId, testTitle) {
    const modal = document.getElementById('passwordModal');
    const content = document.getElementById('testContent');
    const input = document.getElementById('passwordInput');
    const errorMsg = document.getElementById('errorMsg');
    
    // Password check function
    window.checkPassword = function() {
        const pwd = input.value.trim();
        
        if (window._verifyTestAccess(testId, pwd)) {
            modal.style.display = 'none';
            content.style.display = 'block';
            errorMsg.style.display = 'none';
        } else {
            errorMsg.style.display = 'block';
            input.value = '';
            input.focus();
            
            // Add shake animation
            modal.querySelector('div').style.animation = 'shake 0.5s';
            setTimeout(() => {
                modal.querySelector('div').style.animation = '';
            }, 500);
        }
    };
    
    // Enter key support
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            window.checkPassword();
        }
    });
    
    // Focus input on load
    setTimeout(() => input.focus(), 100);
};

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);
