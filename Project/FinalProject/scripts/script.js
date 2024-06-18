const galleryContainer = document.querySelector('.gallery-container');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
let currentIndex = 0;

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  galleryContainer.style.transform = `translateX(-${currentIndex * 800}px)`; // Adjust the value as needed
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  galleryContainer.style.transform = `translateX(-${currentIndex * 800}px)`; // Adjust the value as needed
});