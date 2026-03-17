document.addEventListener('DOMContentLoaded', () => {

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // --- Navigation Scroll Effect ---
    const navbar = document.getElementById('navbar');

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.classList.add('navbar--hidden');
        } else {
            navbar.classList.remove('navbar--hidden');
        }

        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    };

    hamburger.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        scrollObserver.observe(element);
    });

    // --- Menu Category Tab Switching ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const categoryPanes = document.querySelectorAll('.menu-category-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-category');

            // Toggle button active state
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Toggle pane active state
            categoryPanes.forEach(pane => {
                if (pane.id === targetId) {
                    pane.classList.add('active');
                } else {
                    pane.classList.remove('active');
                }
            });
        });
    });

    // --- Gallery Slider Functionality ---
    const sliderTrack = document.querySelector('.slider-track');
    const sliderItems = document.querySelectorAll('.slider-track .gallery-item');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    const currentSlideEl = document.getElementById('current-slide');
    const totalSlidesEl = document.getElementById('total-slides');

    if (sliderTrack && sliderItems.length > 0) {
        let currentIndex = 0;
        let slideInterval;
        const intervalTime = 2500; // 2.5 seconds as requested

        // Initialize total slides
        if (totalSlidesEl) {
            totalSlidesEl.textContent = sliderItems.length;
        }

        const updateSlider = () => {
            sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update counter
            if (currentSlideEl) {
                currentSlideEl.textContent = currentIndex + 1;
            }
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % sliderItems.length;
            updateSlider();
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
            updateSlider();
        };

        const goToSlide = (index) => {
            currentIndex = index;
            updateSlider();
        };

        const startTimer = () => {
            slideInterval = setInterval(nextSlide, intervalTime);
        };

        const resetTimer = () => {
            clearInterval(slideInterval);
            startTimer();
        };

        // Arrow controls
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetTimer();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetTimer();
        });

        // Initialize
        startTimer();

        // Pause on hover
        sliderTrack.addEventListener('mouseenter', () => clearInterval(slideInterval));
        sliderTrack.addEventListener('mouseleave', startTimer);
    }

    // --- Lightbox Functionality ---
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.parentElement.addEventListener('click', () => {
            const fullImgSrc = item.getAttribute('data-full') || item.src;
            lightboxImg.src = fullImgSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImg.src = ''; 
        }, 300);
    };

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Parallax effect on hero floating dish
    const floatingDish = document.getElementById('floating-dish');
    if (floatingDish) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                floatingDish.style.transform = `translateY(${scrolled * 0.2}px)`;
            }
        });
    }
});
