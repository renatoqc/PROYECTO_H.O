// Galería y Carrusel de Evidencias Históricas con Swiper.js
document.addEventListener('DOMContentLoaded', () => {

  const swiperContainer = document.querySelector('.swiper-evidencias');
  if (!swiperContainer || typeof Swiper === 'undefined') return;

  new Swiper('.swiper-evidencias', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    speed: 600,
    autoplay: {
      delay: 6000,
      disableOnInteraction: true,
      pauseOnMouseEnter: true
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return `<span class="${className}" title="Evidencia #${index + 1}">0${index + 1}</span>`;
      }
    },
    navigation: {
      nextEl: '.swiper-btn-next',
      prevEl: '.swiper-btn-prev'
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 24
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 28
      }
    }
  });

});
