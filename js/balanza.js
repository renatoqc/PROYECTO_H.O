/**
 * js/balanza.js
 * Balanza Histórica de la Transformación: Gosplán vs. NKVD (1928–1941)
 * Actualización dinámica de métricas, barras animadas y sustento documental.
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Base de Datos Histórica Verificada (1928 - 1941)
  const DATOS_HISTORICOS = [
    {
      anio: '1928',
      folio: 'INICIO DEL GRAN VIRAJE',
      gosplan: {
        aceroVal: '4.3 MT',
        aceroPct: 21.5, // (4.3 / 20.0) * 100
        aceroNota: 'Capacidad siderúrgica previa a la colectivización',
        carbonVal: '35.5 MT',
        carbonPct: 19.7, // (35.5 / 180.0) * 100
        carbonNota: 'Cuenca hullera del Donbás en reactivación',
        hito: 'Lanzamiento del 1° Plan Quinquenal: subordinación económica para liquidar el mercado de la NEP y priorizar acero y energía.'
      },
      nkvd: {
        gulagVal: '~30,000',
        gulagPct: 3.5, // Mínimo visible
        gulagNota: 'Presos recluidos en los campos Solovkí (SLON)',
        colectivVal: '1.7%',
        colectivPct: 1.7,
        colectivNota: 'Tierras agrícolas bajo control estatal',
        represion: 'Liquidación de la pequeña empresa urbana y primeras requisas forzadas de cereal a los campesinos en los Urales.'
      },
      fuente: 'R. W. Davies & Stephen Wheatcroft (The Industrialisation of Soviet Russia); registros desclasificados del Politburó sobre el fin de la NEP y primeros censos de prisioneros en Solovkí (GARF f. 9414).'
    },
    {
      anio: '1932',
      folio: 'CIERRE DEL 1° PLAN & HAMBRUNA',
      gosplan: {
        aceroVal: '5.9 MT',
        aceroPct: 29.5, // (5.9 / 20.0) * 100
        aceroNota: 'Entrada en servicio del primer alto horno de Magnitogorsk',
        carbonVal: '64.4 MT',
        carbonPct: 35.8, // (64.4 / 180.0) * 100
        carbonNota: 'Extracción forzada y apertura de minas en Kuznetsk',
        hito: 'Clausura anticipada del 1° Plan Quinquenal ("en 4 años"); despliegue masivo de ciudades industriales creadas de la nada.'
      },
      nkvd: {
        gulagVal: '~268,000',
        gulagPct: 13.4, // (268,000 / 2,000,000) * 100
        gulagNota: 'Trabajo penal en la excavación del Belomorkanal',
        colectivVal: '61.5%',
        colectivPct: 61.5,
        colectivNota: 'Deskulakización masiva y formación de Koljoses',
        represion: 'Ley de las Cinco Espigas y Gran Hambruna / Holodomor: 3.5 a 5 millones de víctimas en Ucrania y 1.5 millones en Kazajistán por requisas punitivas.'
      },
      fuente: 'Sheila Fitzpatrick (Stalin’s Peasants); Archivo Estatal de la Economía de la URSS (RGAE f. 1562); actas de la Comisión Extraordinaria de Requisas de Molotov y Kaganóvich (RGASPI f. 17).'
    },
    {
      anio: '1937',
      folio: 'CÚSPIDE DEL GRAN TERROR',
      gosplan: {
        aceroVal: '17.7 MT',
        aceroPct: 88.5, // (17.7 / 20.0) * 100
        aceroNota: 'Autosuficiencia en maquinaria bélica y tractores',
        carbonVal: '128.0 MT',
        carbonPct: 71.1, // (128.0 / 180.0) * 100
        carbonNota: 'Récords estajanovistas y doble turno industrial',
        hito: 'Culminación del 2° Plan Quinquenal; la URSS consolida su infraestructura pesada y elimina la dependencia de tecnología occidental.'
      },
      nkvd: {
        gulagVal: '~1.19 Millones',
        gulagPct: 59.8, // (1.19 / 2.0) * 100
        gulagNota: 'Expansión de la red minera de Kolymá y Dalstroy',
        colectivVal: '93.0%',
        colectivPct: 93.0,
        colectivNota: 'Monopolio estatal absoluto sobre la cosecha de granos',
        represion: 'Promulgación de la Orden NKVD N° 00447 y Juicios de Moscú: 681,692 ejecuciones sumarias documentadas en 1937–1938 por las "Troikas" del Estado.'
      },
      fuente: 'Oleg Khlevniuk (The History of the Gulag); Orden Operativa N° 00447 firmada por N. Yezhov; fondos desclasificados de la Lubyanka y actas de las Troikas del NKVD (GARF f. 9401).'
    },
    {
      anio: '1941',
      folio: 'VÍSPERAS DE LA GUERRA PATRIA',
      gosplan: {
        aceroVal: '18.3 MT',
        aceroPct: 91.5, // (18.3 / 20.0) * 100
        aceroNota: 'Capacidad de blindaje militar de tanques T-34',
        carbonVal: '165.9 MT',
        carbonPct: 92.2, // (165.9 / 180.0) * 100
        carbonNota: 'Suministro garantizado para el complejo militar-industrial',
        hito: 'La URSS alcanza el rango de 2ª potencia industrial del mundo; la estructura fabril de los Urales permite la evacuación estratégica.'
      },
      nkvd: {
        gulagVal: '~1.93 Millones',
        gulagPct: 96.5, // (1.93 / 2.0) * 100
        gulagNota: 'Población penitenciaria en colonias y campos de régimen severo',
        colectivVal: '96.9%',
        colectivPct: 96.9,
        colectivNota: 'Totalidad de la tierra fértil socializada bajo sovjoses y koljoses',
        represion: 'Militarización total de la mano de obra, castigo penal por ausentismo laboral y deportaciones preventivas de minorías étnicas fronterizas.'
      },
      fuente: 'Stephen Kotkin (Stalin: Waiting for Hitler, 1929–1941); censos de la Administración Principal de Campos de Trabajo (GULAG) a enero de 1941; memorandos de movilización bélica del Gosplán.'
    }
  ];

  // 2. Elementos del DOM
  const slider = document.getElementById('balanza-slider');
  const displayAnio = document.getElementById('balanza-anio-display');
  const botonesAnio = document.querySelectorAll('.btn-anio-marcador');

  // Nodos Gosplán
  const valAcero = document.getElementById('val-acero');
  const barAcero = document.getElementById('bar-acero');
  const notaAcero = document.getElementById('nota-acero');

  const valCarbon = document.getElementById('val-carbon');
  const barCarbon = document.getElementById('bar-carbon');
  const notaCarbon = document.getElementById('nota-carbon');

  const txtHito = document.getElementById('txt-hito-industrial');

  // Nodos NKVD
  const valGulag = document.getElementById('val-gulag');
  const barGulag = document.getElementById('bar-gulag');
  const notaGulag = document.getElementById('nota-gulag');

  const valColectiv = document.getElementById('val-colectiv');
  const barColectiv = document.getElementById('bar-colectiv');
  const notaColectiv = document.getElementById('nota-colectiv');

  const txtRepresion = document.getElementById('txt-represion');

  // Nodos Sustento
  const fuenteAnioFolio = document.getElementById('fuente-anio-folio');
  const fuenteDescripcion = document.getElementById('fuente-descripcion');

  // Si la sección no está presente, salir limpiamente
  if (!slider) return;

  // 3. Función de Actualización Dinámica
  function actualizarBalanza(indice) {
    const data = DATOS_HISTORICOS[indice];
    if (!data) return;

    // Actualizar Slider y Botones
    slider.value = indice;
    displayAnio.textContent = `AÑO ACTIVO: ${data.anio} [${data.folio}]`;

    botonesAnio.forEach((btn, idx) => {
      const activo = idx === indice;
      btn.classList.toggle('activo', activo);
      btn.setAttribute('aria-pressed', activo ? 'true' : 'false');
    });

    // Actualizar Gosplán
    if (valAcero) valAcero.textContent = data.gosplan.aceroVal;
    if (barAcero) barAcero.style.width = `${data.gosplan.aceroPct}%`;
    if (notaAcero) notaAcero.textContent = data.gosplan.aceroNota;

    if (valCarbon) valCarbon.textContent = data.gosplan.carbonVal;
    if (barCarbon) barCarbon.style.width = `${data.gosplan.carbonPct}%`;
    if (notaCarbon) notaCarbon.textContent = data.gosplan.carbonNota;

    if (txtHito) {
      txtHito.style.opacity = '0';
      setTimeout(() => {
        txtHito.textContent = data.gosplan.hito;
        txtHito.style.opacity = '1';
      }, 150);
    }

    // Actualizar NKVD
    if (valGulag) valGulag.textContent = data.nkvd.gulagVal;
    if (barGulag) barGulag.style.width = `${data.nkvd.gulagPct}%`;
    if (notaGulag) notaGulag.textContent = data.nkvd.gulagNota;

    if (valColectiv) valColectiv.textContent = data.nkvd.colectivVal;
    if (barColectiv) barColectiv.style.width = `${data.nkvd.colectivPct}%`;
    if (notaColectiv) notaColectiv.textContent = data.nkvd.colectivNota;

    if (txtRepresion) {
      txtRepresion.style.opacity = '0';
      setTimeout(() => {
        txtRepresion.textContent = data.nkvd.represion;
        txtRepresion.style.opacity = '1';
      }, 150);
    }

    // Actualizar Ficha Metodológica de Sustento
    if (fuenteAnioFolio) fuenteAnioFolio.textContent = data.anio;
    if (fuenteDescripcion) {
      fuenteDescripcion.innerHTML = `<strong>Fuentes archivísticas del registro (${data.anio}):</strong> ${data.fuente}`;
    }
  }

  // 4. Event Listeners
  slider.addEventListener('input', (e) => {
    actualizarBalanza(parseInt(e.target.value, 10));
  });

  botonesAnio.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      actualizarBalanza(idx);
    });
  });

  // Re-inicializar iconos Lucide si se cargaron dinámicamente
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

});
