// Inicialización y Coordinación General del Archivo
document.addEventListener('DOMContentLoaded', () => {

  // Inicializar Iconos Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Registrar ScrollTrigger si está disponible
  if (!prefersReducedMotion && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Revelado progresivo al scrollear entre secciones
    const secciones = [
      '.seccion-chart-gosplan',
      '.seccion-balanza-archivo',
      '.seccion-proyector-video',
      '.seccion-red-historica',
      '.seccion-conclusion-archivo'
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

  // Desbloqueo y revelado progresivo tras presionar "INGRESAR AL ARCHIVO"
  function desbloquearYRevelarArchivo() {
    document.body.classList.remove('archivo-bloqueado');
    window.scrollTo({ top: 0, behavior: 'instant' });

    if (!prefersReducedMotion && typeof gsap !== 'undefined') {
      const tl = gsap.timeline();

      // 1. Barra de navegación superior desciende suavemente
      tl.fromTo('.barra-nav-archivo', 
        { y: -50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out' }
      )
      // 2. Carpeta carátula aparece con elevación y escala
      .fromTo('.carpeta-expediente', 
        { y: 60, opacity: 0, scale: 0.97 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' }, 
        '-=0.2'
      )
      // 3. El sello rojo se estampa con impacto
      .fromTo('.sello-desclasificado', 
        { scale: 1.6, opacity: 0, rotation: 18 }, 
        { scale: 1, opacity: 1, rotation: 4, duration: 0.5, ease: 'back.out(2)' }, 
        '-=0.25'
      )
      // 4. El memorándum de discusión aparece
      .fromTo('.memo-oficial', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out' }, 
        '-=0.2'
      )
      // 5. El primer bloque de contexto se revela progresivamente
      .fromTo('#contexto', 
        { y: 35, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.75, ease: 'power2.out' }, 
        '-=0.2'
      );

      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }
  }

  // Modal Inicial en Pantalla Completa: Autorización de Acceso
  function lanzarModalAutorizacionInicial() {
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
        backdrop: 'rgba(17, 24, 20, 0.96)',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: true,
        customClass: {
          popup: 'swal-archivo-custom',
          backdrop: 'swal-backdrop-militar'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          desbloquearYRevelarArchivo();
        }
      });
    } else {
      desbloquearYRevelarArchivo();
    }
  }

  // Ejecutar autorización inicial al abrir la página
  lanzarModalAutorizacionInicial();

  // Interacción posterior al pulsar el Sello "DOCUMENTO DESCLASIFICADO"
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
          confirmButtonText: 'CONTINUAR LECTURA',
          confirmButtonColor: '#28352A',
          background: '#FAF6EE',
          allowOutsideClick: true,
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
