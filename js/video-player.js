// Gestor del Reproductor y Carga de Videos Históricos
document.addEventListener('DOMContentLoaded', () => {

  const videoPlayer = document.getElementById('reproductor-video-archivo');
  const iframePlayer = document.getElementById('reproductor-iframe-archivo');
  const inputArchivo = document.getElementById('input-video-archivo');
  const inputUrl = document.getElementById('input-video-url');
  const btnCargarUrl = document.getElementById('btn-cargar-video-url');
  const selectorClips = document.querySelectorAll('.btn-clip-predefinido');
  const btnFiltroSepia = document.getElementById('btn-filtro-sepia');
  const btnFiltroBw = document.getElementById('btn-filtro-bw');
  const btnFiltroNormal = document.getElementById('btn-filtro-normal');
  const marcoProyector = document.getElementById('marco-proyector-pantalla');
  const visorTitulo = document.getElementById('proyector-titulo-clip');

  if (!marcoProyector) return;

  // 1. CARGA DE VIDEO LOCAL DESDE LA COMPUTADORA (.mp4, .webm, etc.)
  if (inputArchivo) {
    inputArchivo.addEventListener('change', (e) => {
      const archivo = e.target.files[0];
      if (!archivo) return;

      const urlBlob = URL.createObjectURL(archivo);

      // Mostrar reproductor HTML5 y ocultar iframe
      if (iframePlayer) iframePlayer.style.display = 'none';
      if (videoPlayer) {
        videoPlayer.style.display = 'block';
        videoPlayer.src = urlBlob;
        videoPlayer.play();
      }

      if (visorTitulo) {
        visorTitulo.textContent = `ARCHIVO LOCAL CARGADO: ${archivo.name}`;
      }

      // Notificación estilizada
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: 'DOCUMENTO FÍLMICO CARGADO',
          text: `El archivo "${archivo.name}" se ha proyectado exitosamente en el visor de archivo.`,
          icon: 'success',
          confirmButtonColor: '#28352A',
          background: '#FAF6EE'
        });
      }
    });
  }

  // 2. CARGA DE VIDEO MEDIANTE ENLACE WEB O YOUTUBE
  function procesarUrlVideo() {
    if (!inputUrl) return;
    const url = inputUrl.value.trim();
    if (!url) return;

    // Detectar si es un enlace de YouTube
    let idYouTube = null;
    const matchLargo = url.match(/[?&]v=([^&#]+)/);
    const matchCorto = url.match(/youtu\.be\/([^?&#]+)/);
    const matchEmbed = url.match(/youtube\.com\/embed\/([^?&#]+)/);

    if (matchLargo) idYouTube = matchLargo[1];
    else if (matchCorto) idYouTube = matchCorto[1];
    else if (matchEmbed) idYouTube = matchEmbed[1];

    if (idYouTube) {
      // Reproducir como iframe de YouTube
      if (videoPlayer) {
        videoPlayer.pause();
        videoPlayer.style.display = 'none';
      }
      if (iframePlayer) {
        iframePlayer.style.display = 'block';
        iframePlayer.src = `https://www.youtube.com/embed/${idYouTube}?autoplay=1`;
      }
      if (visorTitulo) visorTitulo.textContent = `PROYECCIÓN EXTERNA (YOUTUBE): ID ${idYouTube}`;
    } else {
      // Asumir que es una URL directa de archivo de video (ej. .mp4 web)
      if (iframePlayer) iframePlayer.style.display = 'none';
      if (videoPlayer) {
        videoPlayer.style.display = 'block';
        videoPlayer.src = url;
        videoPlayer.play();
      }
      if (visorTitulo) visorTitulo.textContent = `TRANSMISIÓN WEB: ${url}`;
    }

    if (typeof Swal !== 'undefined') {
      Swal.fire({
        title: 'ENLACE FÍLMICO INCORPORADO',
        text: 'La fuente audiovisual externa ha sido vinculada al proyector de inteligencia.',
        icon: 'info',
        confirmButtonColor: '#28352A',
        background: '#FAF6EE'
      });
    }
  }

  if (btnCargarUrl) btnCargarUrl.addEventListener('click', procesarUrlVideo);
  if (inputUrl) {
    inputUrl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') procesarUrlVideo();
    });
  }

  // 3. CLIPS HISTÓRICOS PREDEFINIDOS
  selectorClips.forEach(boton => {
    boton.addEventListener('click', () => {
      selectorClips.forEach(b => b.classList.remove('activo'));
      boton.classList.add('activo');

      const tipo = boton.getAttribute('data-tipo');
      const fuente = boton.getAttribute('data-fuente');
      const titulo = boton.getAttribute('data-titulo');

      if (visorTitulo) visorTitulo.textContent = titulo;

      if (tipo === 'youtube') {
        if (videoPlayer) {
          videoPlayer.pause();
          videoPlayer.style.display = 'none';
        }
        if (iframePlayer) {
          iframePlayer.style.display = 'block';
          iframePlayer.src = fuente;
        }
      } else {
        if (iframePlayer) iframePlayer.style.display = 'none';
        if (videoPlayer) {
          videoPlayer.style.display = 'block';
          videoPlayer.src = fuente;
          videoPlayer.play();
        }
      }
    });
  });

  // 4. FILTROS DE ÉPOCA SOBRE LA PANTALLA
  if (btnFiltroSepia) {
    btnFiltroSepia.addEventListener('click', () => {
      marcoProyector.className = 'marco-proyector-pantalla filtro-sepia';
    });
  }

  if (btnFiltroBw) {
    btnFiltroBw.addEventListener('click', () => {
      marcoProyector.className = 'marco-proyector-pantalla filtro-bw';
    });
  }

  if (btnFiltroNormal) {
    btnFiltroNormal.addEventListener('click', () => {
      marcoProyector.className = 'marco-proyector-pantalla';
    });
  }

});
