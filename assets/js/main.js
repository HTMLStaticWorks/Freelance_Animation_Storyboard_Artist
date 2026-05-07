document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    const updateToggleState = (isActive) => {
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = isActive ? 'rotate(45deg) translate(5px, 5px)' : 'none';
        spans[1].style.opacity = isActive ? '0' : '1';
        spans[2].style.transform = isActive ? 'rotate(-45deg) translate(5px, -5px)' : 'none';
    };

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            updateToggleState(isActive);
        });
    }

    // Mobile dropdown toggle
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const link = item.querySelector('a');
        const dropdown = item.querySelector('.dropdown');
        
        if (dropdown) {
            link.addEventListener('click', (e) => {
                // Expanded check for tablet/mobile
                if (window.innerWidth <= 1024) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const wasActive = item.classList.contains('active');
                    
                    // Close all other dropdowns
                    navItems.forEach(i => i.classList.remove('active'));
                    
                    // Toggle current one
                    if (!wasActive) {
                        item.classList.add('active');
                    }
                }
            });
        } else if (link) {
            // Regular links - close menu on click in mobile
            link.addEventListener('click', () => {
                if (window.innerWidth <= 1024) {
                    navLinks.classList.remove('active');
                    updateToggleState(false);
                }
            });
        }
    });

    // Close menu when clicking sub-links
    document.querySelectorAll('.dropdown a').forEach(subLink => {
        subLink.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                navLinks.classList.remove('active');
                updateToggleState(false);
            }
        });
    });
    
    // Lazy loading images
    const images = document.querySelectorAll('img[data-src]');
    const config = {
        rootMargin: '0px 0px 50px 0px',
        threshold: 0
    };

    let observer = new IntersectionObserver(function (entries, self) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                preloadImage(entry.target);
                self.unobserve(entry.target);
            }
        });
    }, config);

    images.forEach(image => {
        observer.observe(image);
    });

    function preloadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;
        img.src = src;
    }

    // Active menu highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const allLinks = document.querySelectorAll('.nav-links a');
    
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href === currentPath) {
            link.classList.add('active-link');
            // If it's in a dropdown, highlight the parent nav-item as well
            const parentDropdown = link.closest('.dropdown');
            if (parentDropdown) {
                const parentLink = parentDropdown.previousElementSibling;
                if (parentLink) parentLink.classList.add('active-link');
            }
        }
    });
});
