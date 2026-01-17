// Simple image carousel
(function() {
    const carousel = document.querySelector('.carousel-container');
    if (!carousel) return;

    const images = carousel.querySelectorAll('.carousel-image');
    const counterPrevBtn = carousel.querySelector('.carousel-counter-prev');
    const counterNextBtn = carousel.querySelector('.carousel-counter-next');
    const currentCounter = carousel.querySelector('.carousel-current');
    const totalCounter = carousel.querySelector('.carousel-total');
    
    let currentIndex = 0;

    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    const lightboxImage = document.createElement('img');
    lightboxImage.className = 'lightbox-image';
    
    const lightboxNav = document.createElement('div');
    lightboxNav.className = 'lightbox-nav';
    
    const lightboxPrev = document.createElement('button');
    lightboxPrev.className = 'lightbox-arrow lightbox-prev';
    lightboxPrev.innerHTML = '←';
    lightboxPrev.setAttribute('aria-label', 'Previous image');
    
    const lightboxCounter = document.createElement('span');
    lightboxCounter.className = 'lightbox-counter';
    
    const lightboxNext = document.createElement('button');
    lightboxNext.className = 'lightbox-arrow lightbox-next';
    lightboxNext.innerHTML = '→';
    lightboxNext.setAttribute('aria-label', 'Next image');
    
    lightboxNav.appendChild(lightboxPrev);
    lightboxNav.appendChild(lightboxCounter);
    lightboxNav.appendChild(lightboxNext);
    
    lightbox.appendChild(lightboxImage);
    lightbox.appendChild(lightboxNav);
    document.body.appendChild(lightbox);

    // Initialize counter
    if (totalCounter) {
        totalCounter.textContent = images.length;
    }

    function showImage(index) {
        // Remove active class from all images
        images.forEach(img => img.classList.remove('active'));

        // Add active class to current image
        images[index].classList.add('active');
        
        // Update counter
        if (currentCounter) {
            currentCounter.textContent = index + 1;
        }
        
        currentIndex = index;
    }

    function nextImage() {
        const nextIndex = (currentIndex + 1) % images.length;
        showImage(nextIndex);
    }

    function prevImage() {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(prevIndex);
    }

    // Lightbox functions
    function openLightbox() {
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    function updateLightboxImage() {
        lightboxImage.src = images[currentIndex].src;
        lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    }

    function lightboxNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightboxImage();
        showImage(currentIndex); // Sync with carousel
    }

    function lightboxPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightboxImage();
        showImage(currentIndex); // Sync with carousel
    }

    // Make carousel track clickable to open lightbox
    carousel.querySelector('.carousel-track').style.cursor = 'pointer';
    carousel.querySelector('.carousel-track').addEventListener('click', openLightbox);

    // Close lightbox on background click (but not on image or arrows)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Lightbox arrow navigation
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxPrevImage();
    });

    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxNextImage();
    });

    // Prevent image click from closing lightbox
    lightboxImage.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Keyboard navigation in lightbox
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                lightboxPrevImage();
            } else if (e.key === 'ArrowRight') {
                lightboxNextImage();
            }
        }
    });

    // Event listeners
    if (counterNextBtn) counterNextBtn.addEventListener('click', nextImage);
    if (counterPrevBtn) counterPrevBtn.addEventListener('click', prevImage);

    // Keyboard navigation (only when lightbox is not active)
    document.addEventListener('keydown', (e) => {
        if (!carousel || lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextImage();
            } else {
                prevImage();
            }
        }
    }
})();
