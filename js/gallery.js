// Galería y Carrusel de Evidencias Históricas con Swiper.js
document.addEventListener('DOMContentLoaded', () => {

  const swiperContainer = document.querySelector('.swiper-evidencias');
  if (!swiperContainer || typeof Swiper === 'undefined') return;

  const swiper = new Swiper('.swiper-evidencias', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    speed: 500,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return `<span class="${className}" role="button" tabindex="0" title="Evidencia #${index + 1}">0${index + 1}</span>`;
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

  // Forzar respuesta al clic en botones de navegación
  const btnNext = document.querySelector('.swiper-btn-next');
  const btnPrev = document.querySelector('.swiper-btn-prev');

  if (btnNext) {
    btnNext.addEventListener('click', (e) => {
      e.preventDefault();
      swiper.slideNext();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', (e) => {
      e.preventDefault();
      swiper.slidePrev();
    });
  }

});
