document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-image');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
            
    let currentIndex = 0;
    const totalImages = images.length;
            
    function updateCarousel() {
        const width = images[0].clientWidth;
            carousel.style.transform = `translateX(-${currentIndex * width}px)`;
    }
            
    function nextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
            updateCarousel();
    }
            
    function prevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateCarousel();
    }
            
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);
            
    setInterval(nextImage, 3000);
            
    window.addEventListener('resize', updateCarousel);
});