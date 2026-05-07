document.addEventListener('DOMContentLoaded', () => {
    const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
    const html = document.documentElement;

    // Check for saved RTL preference
    const savedRTL = localStorage.getItem('rtl') === 'true';
    if (savedRTL) {
        html.setAttribute('dir', 'rtl');
        updateAllRTLButtons(true);
    }

    rtlToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const isRTL = html.getAttribute('dir') === 'rtl';
            const newRTL = !isRTL;
            
            html.setAttribute('dir', newRTL ? 'rtl' : 'ltr');
            localStorage.setItem('rtl', newRTL);
            updateAllRTLButtons(newRTL);
            
            // Refresh ScrollTrigger as layout changed
            if (window.ScrollTrigger) {
                ScrollTrigger.refresh();
            }
        });
    });

    function updateAllRTLButtons(isRTL) {
        rtlToggles.forEach(btn => {
            btn.innerHTML = isRTL ? 'LTR' : 'RTL';
        });
    }
});
