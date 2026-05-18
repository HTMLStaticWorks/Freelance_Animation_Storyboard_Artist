document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Fade in elements
    gsap.from('.hero h1', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: 'power4.out',
        stagger: 0.2
    });

    gsap.fromTo('.nav-item', 
        {
            y: -20,
            opacity: 0
        },
        {
            duration: 1,
            y: 0,
            opacity: 1,
            ease: 'power3.out',
            stagger: 0.1,
            delay: 0.5,
            clearProps: "all"
        }
    );

    // Reveal animations on scroll
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                onEnter: () => el.classList.add('active') // Optional class for extra CSS control
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            clearProps: "all" // Important: clean up after animation
        });
    });

    // Refresh ScrollTrigger after a short delay to account for dynamic content/images
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });

});
