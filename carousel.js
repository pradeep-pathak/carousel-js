function Carousel(options) {
    if (!options) {
        return;
    }

    const {
        carouselSelector,
        slideChangeInterval = 3700,
        autoplay = false,
        controls = false,
        indicators = false,
        autoplayHoverPause = false,
        activeSlideDisplay = 'block'
    } = options;

    const carouselContainers = document.querySelectorAll(carouselSelector);

    function showSlide(carousel, index) {
        const slideElements = carousel.querySelectorAll('.slide');
        slideElements.forEach((slide) => {
            slide.style.display = 'none';
        });
        slideElements[index].style.display = activeSlideDisplay;

        if (indicators) {
            const indicatorElements = carousel.querySelectorAll('.slide-indicator');
            indicatorElements.forEach((indicator, i) => {
                indicator.classList.toggle('is-active', i === index);
            });
        }
    }

    function getNextSlideIndex(carousel, currentIndex) {
        return (currentIndex + 1) % carousel.querySelectorAll('.slide').length;
    }

    function getPrevSlideIndex(carousel, currentIndex) {
        return (currentIndex - 1 + carousel.querySelectorAll('.slide').length) % carousel.querySelectorAll('.slide').length;
    }

    function initCarousel(carousel) {
        let currentIndex = 0;
        let autoplayInterval = null;

        function autoChangeSlide() {
            if (!autoplay) {
                clearInterval(autoplayInterval);
                return;
            }

            currentIndex = getNextSlideIndex(carousel, currentIndex);
            showSlide(carousel, currentIndex);
        }

        if (controls) {
            carousel.querySelector('.slide-button-prev').addEventListener('click', () => {
                currentIndex = getPrevSlideIndex(carousel, currentIndex);
                showSlide(carousel, currentIndex);
                clearInterval(autoplayInterval);
                autoplayInterval = setInterval(autoChangeSlide, slideChangeInterval);
            });

            carousel.querySelector('.slide-button-next').addEventListener('click', () => {
                currentIndex = getNextSlideIndex(carousel, currentIndex);
                showSlide(carousel, currentIndex);
                clearInterval(autoplayInterval);
                autoplayInterval = setInterval(autoChangeSlide, slideChangeInterval);
            });
        }

        if (indicators) {
            carousel.querySelector('.slide-indicators').addEventListener('click', (event) => {
                const clickedIndicator = event.target.closest('.slide-indicator');
                if (clickedIndicator) {
                    const index = Array.from(carousel.querySelectorAll('.slide-indicator')).indexOf(clickedIndicator);
                    currentIndex = index;
                    showSlide(carousel, currentIndex);
                    clearInterval(autoplayInterval);
                    autoplayInterval = setInterval(autoChangeSlide, slideChangeInterval);
                }
            });
        }

        if (autoplayHoverPause) {
            carousel.addEventListener('mouseover', () => {
                clearInterval(autoplayInterval);
            });

            carousel.addEventListener('mouseout', () => {
                autoplayInterval = setInterval(autoChangeSlide, slideChangeInterval);
            });
        }

        if (autoplay) {
            autoplayInterval = setInterval(autoChangeSlide, slideChangeInterval);
        }

        showSlide(carousel, currentIndex);
    }

    carouselContainers.forEach((carousel) => {
        initCarousel(carousel);
    });
}
