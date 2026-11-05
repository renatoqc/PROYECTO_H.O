// Espera a que el HTML termine de cargar
document.addEventListener('DOMContentLoaded', () => {

  // Clic en el sello desclasificado
  const sello = document.querySelector('.sello-desclasificado');
  if (sello) {
    sello.addEventListener('click', () => {
      sello.style.transform = 'scale(0.92) rotate(12deg)';
      setTimeout(() => {
        sello.style.transform = 'rotate(7deg)';
      }, 150);

      mostrarNotificacion("Acceso concedido: Expediente desclasificado por el Comité.");
    });
  }

  // Clic para resaltar tarjetas de hitos
  const tarjetasHitos = document.querySelectorAll('.hito-card');
  tarjetasHitos.forEach(tarjeta => {
    tarjeta.addEventListener('click', () => {
      const yaActiva = tarjeta.style.borderColor === 'var(--color-sello-rojo)';

      tarjetasHitos.forEach(t => {
        t.style.borderColor = 'var(--color-borde-suave)';
        t.style.backgroundColor = 'var(--color-papel-fondo)';
      });

      if (!yaActiva) {
        tarjeta.style.borderColor = 'var(--color-sello-rojo)';
        tarjeta.style.backgroundColor = '#FAF4EB';
      }
    });
  });

});

// Mensaje flotante temporal
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
