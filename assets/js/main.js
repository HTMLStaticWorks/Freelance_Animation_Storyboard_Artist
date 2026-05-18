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

    // Password Visibility Toggle
    const togglePasswords = document.querySelectorAll('.toggle-password');
    togglePasswords.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = toggle.parentElement.querySelector('input');
            const icon = toggle.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Custom horizontal scroll (Latest Sequences Slider)
    const scrollContainer = document.getElementById('sequences-scroll');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('scroll-progress');

    if (scrollContainer && prevBtn && nextBtn) {
        // Scroll amount: 1 card width + gap (approx. 450px)
        const scrollAmount = 450;

        nextBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        prevBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        const updateScrollState = () => {
            const scrollLeft = scrollContainer.scrollLeft;
            const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            
            // Progress percentage
            const progress = maxScrollLeft > 0 ? (scrollLeft / maxScrollLeft) * 100 : 0;
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }

            // Adjust button opacity & interactability based on bounds
            if (scrollLeft <= 5) {
                prevBtn.style.opacity = '0';
                prevBtn.style.pointerEvents = 'none';
            } else {
                prevBtn.style.opacity = '';
                prevBtn.style.pointerEvents = '';
            }

            if (scrollLeft >= maxScrollLeft - 5) {
                nextBtn.style.opacity = '0';
                nextBtn.style.pointerEvents = 'none';
            } else {
                nextBtn.style.opacity = '';
                nextBtn.style.pointerEvents = '';
            }
        };

        scrollContainer.addEventListener('scroll', updateScrollState);
        window.addEventListener('resize', updateScrollState);

        // Initial trigger
        setTimeout(updateScrollState, 150);
    }
});
