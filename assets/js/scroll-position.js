// Save scroll position before navigating away
document.addEventListener('DOMContentLoaded', function() {
    // Restore scroll position when coming back to the page
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    if (savedScrollPosition !== null) {
        window.scrollTo(0, parseInt(savedScrollPosition));
        sessionStorage.removeItem('scrollPosition');
    }

    // Save scroll position when clicking any link
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            sessionStorage.setItem('scrollPosition', window.scrollY);
        });
    });
});

// Also save scroll position when using back button
window.addEventListener('beforeunload', function() {
    if (performance.navigation.type === 2) { // Back button was used
        sessionStorage.setItem('scrollPosition', window.scrollY);
    }
});
