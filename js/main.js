// Inicialización y Coordinación General del Archivo
document.addEventListener('DOMContentLoaded', () => {

  // Inicializar Iconos Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Animaciones de Entrada con GSAP y ScrollTrigger
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Animación de entrada de la carátula inicial
    gsap.from('.carpeta-expediente', {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out'
    });

    // Revelado progresivo al scrollear entre secciones
    const secciones = [
      '.informe-documento',
      '.seccion-chart-gosplan',
      '.seccion-galeria',
      '.seccion-red-historica'
    ];

    secciones.forEach(sec => {
      const elemento = document.querySelector(sec);
      if (elemento) {
        gsap.from(elemento, {
          scrollTrigger: {
            trigger: elemento,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 35,
          duration: 0.7,
          ease: 'power2.out'
        });
      }
    });
  }

  // Interacción con el Sello "DOCUMENTO DESCLASIFICADO" usando SweetAlert2
  const sello = document.querySelector('.sello-desclasificado');
  if (sello) {
    sello.addEventListener('click', () => {
      if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
        gsap.to(sello, {
          scale: 0.94,
          rotate: 12,
          duration: 0.1,
          yoyo: true,
          repeat: 1
        });
      }

      // Alerta estilizada con SweetAlert2
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: 'AUTORIZACIÓN DE ACCESO',
          html: `
            <div style="font-family: 'Courier Prime', monospace; text-align: left; font-size: 0.95rem; line-height: 1.6; color: #151D19;">
              <p style="margin-bottom: 0.8rem;">
                <strong>REGISTRO:</strong> EXP-URSS-1928-1953<br>
                <strong>ORGANISMO:</strong> ARCHIVO CENTRAL DE INVESTIGACIÓN HISTÓRICA<br>
                <strong>ESTADO:</strong> <span style="color: #A52D27; font-weight: bold;">DESCLASIFICACIÓN PARCIAL CONCEDIDA</span>
              </p>
              <p style="border-top: 1px dashed #BFB8A5; padding-top: 0.6rem; color: #424B44;">
                Los documentos contenidos en este dossier historiográfico integran fuentes desclasificadas del GARF, RGASPI y testimonios del período de modernización y terror estalinista.
              </p>
            </div>
          `,
          icon: 'info',
          confirmButtonText: 'INGRESAR AL ARCHIVO',
          confirmButtonColor: '#28352A',
          background: '#FAF6EE',
          customClass: {
            popup: 'swal-archivo-custom'
          }
        });
      } else {
        mostrarNotificacion("Acceso concedido: Expediente desclasificado por el Comité.");
      }
    });
  }

  // Navegación fluida de la barra superior
  const enlacesNav = document.querySelectorAll('.nav-link-archivo');
  enlacesNav.forEach(enlace => {
    enlace.addEventListener('click', (e) => {
      const targetId = enlace.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const destino = document.querySelector(targetId);
        if (destino) {
          e.preventDefault();
          destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Hitos históricos: abrir expediente al hacer clic
  const hitos = document.querySelectorAll('.hito-card');
  hitos.forEach(h => {
    h.addEventListener('click', () => {
      const idExp = h.getAttribute('data-expediente');
      if (idExp && window.abrirExpediente) {
        window.abrirExpediente(idExp);
      }
    });
  });

});

// Mensaje flotante de respaldo si no está SweetAlert2
function mostrarNotificacion(mensaje) {
  let alerta = document.querySelector('.alerta-desclasificado');

  if (!alerta) {
    alerta = document.createElement('div');
    alerta.className = 'alerta-desclasificado';
    alerta.innerHTML = `<span>★</span> <span class="alerta-texto"></span>`;
    document.body.appendChild(alerta);
  }

  alerta.querySelector('.alerta-texto').textContent = mensaje;
  alerta.classList.add('mostrar');

  setTimeout(() => {
    alerta.classList.remove('mostrar');
  }, 3500);
}
