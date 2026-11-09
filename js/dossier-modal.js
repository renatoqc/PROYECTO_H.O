// Sistema de Expedientes Históricos Interactivos con GSAP
document.addEventListener('DOMContentLoaded', () => {

  // Dataset de expedientes desclasificados
  const expedientesDB = {
    'exp-lenin-nep': {
      codigo: 'EXP-1924-NEP-01',
      clasificacion: 'ESTRICTAMENTE CONFIDENCIAL // GRADO I',
      fecha: '21 DE ENERO DE 1924 – NOVIEMBRE DE 1928',
      titulo: 'El Ocaso de la NEP y la Muerte de Lenin',
      subtitulo: 'Fin del compromiso mercantil y pugna por la sucesión en el Comité Central',
      contexto: 'Tras la muerte de Lenin en 1924, la cúpula bolchevique se dividió. Para Stalin, la Nueva Política Económica (NEP) era lenta e incompatible con la seguridad de la URSS frente a las potencias capitalistas. Maniobró políticamente para aislar a Trotski y Bujarin, liquidando el comercio privado para imponer la industrialización y colectivización forzosas.',
      personajes: [
        { nombre: 'Iósif V. Stalin', rol: 'Secretario General del PCUS; artífice del viraje industrializador.' },
        { nombre: 'Nikolái Bujarin', rol: 'Defensor de la NEP y del campesinado; purgado posteriormente.' },
        { nombre: 'Lev Trotski', rol: 'Líder de la Oposición de Izquierda; desterrado en 1929 y asesinado en 1940.' }
      ],
      datosClave: [
        'La producción fabril en 1924 apenas llegaba al 35% del nivel previo a la Gran Guerra.',
        'Diciembre de 1927: El XV Congreso aprueba el fin de la NEP y el 1° Plan Quinquenal.'
      ],
      cita: '«No podemos permitir que el destino de la patria dependa de los caprichos del kulak y el comerciante privado.» — Informe al Politburó, 1928.',
      fuente: 'Archivos Estatales de la Federación Rusa (GARF), fondo 5446.'
    },
    'exp-viraje-1928': {
      codigo: 'EXP-1928-IND-02',
      clasificacion: 'ALTO SECRETO MILITAR // GOSPLÁN',
      fecha: 'OCTUBRE DE 1928 – DICIEMBRE DE 1932',
      titulo: 'El Gran Viraje y el Primer Plan Quinquenal',
      subtitulo: 'La industrialización a marchas forzadas y la forja del acero',
      contexto: 'El Gran Viraje subordinó la economía a la industria pesada y armamentística. Bajo directrices implacables del Gosplán, se crearon ciudades siderúrgicas en la estepa como Magnitogorsk. Cientos de miles de brigadistas y deportados trabajaron en condiciones extremas motivados por propaganda y castigados si incumplían las cuotas de carbón y acero.',
      personajes: [
        { nombre: 'Valerián Kúibyshev', rol: 'Presidente del Gosplán; organizador de las metas quinquenales.' },
        { nombre: 'Sergó Ordzhonikidze', rol: 'Comisario del Pueblo para la Industria Pesada (Narkomtiazhprom).' },
        { nombre: 'Técnicos extranjeros', rol: 'Más de 1,500 ingenieros occidentales contratados bajo vigilancia.' }
      ],
      datosClave: [
        'Construcción de la central DneproGES: la mayor hidroeléctrica europea de su tiempo.',
        'Más del 40% del ingreso nacional se reorientó exclusivamente a la industria pesada.'
      ],
      cita: '«Tenemos un retraso de 50 o 100 años respecto a los países avanzados. Debemos recorrerlo en 10 años o nos aplastarán.» — Iósif Stalin, 1931.',
      fuente: 'Davies, R. W. (1989), "The Industrialisation of Soviet Russia".'
    },
    'exp-colectivizacion': {
      codigo: 'EXP-1929-COL-03',
      clasificacion: 'ESTRICTAMENTE RESERVADO // AGRICULTURA',
      fecha: 'NOVIEMBRE DE 1929 – MARZO DE 1933',
      titulo: 'Colectivización Forzada y "Deskulakización"',
      subtitulo: 'Expropiación masiva, requisa de grano y la hambruna del Holodomor',
      contexto: 'Para financiar maquinaria pesada mediante la exportación de grano, el Estado forzó a 25 millones de familias campesinas a ingresar en Koljoses. Quienes opusieron resistencia fueron tachados de "kulaks", desatando ejecuciones y cerca de 2 millones de deportados a Siberia. La requisa implacable derivó en la catastrófica hambruna del Holodomor.',
      personajes: [
        { nombre: 'Iósif V. Stalin', rol: 'Ordenó la liquidación del kulak como clase y requisas sin concesión.' },
        { nombre: 'Viacheslav Mólotov', rol: 'Comisionado en Ucrania para confiscar hasta la última reserva de grano.' },
        { nombre: 'Campesinado rural', rol: 'Víctimas del despojo de tierras, ganado y confinamiento militar.' }
      ],
      datosClave: [
        'Ley de las Cinco Espigas (1932): Fusilamiento o 10 años de GULAG por hurtar un puñado de grano.',
        'Entre 3.5 y 5 millones de muertes por inanición en Ucrania y 1.5 millones en Kazajistán.'
      ],
      cita: '«Para desplazar a los kulaks como clase, debemos quebrar abiertamente su resistencia.» — Iósif Stalin, 1929.',
      fuente: 'Conquest, Robert (1986), "The Harvest of Sorrow"; Archivos GARF.'
    },
    'exp-magnitogorsk': {
      codigo: 'EXP-1932-MAG-04',
      clasificacion: 'EXPEDIENTE INDUSTRIAL S-04',
      fecha: '1929 – 1936',
      titulo: 'Magnitogorsk: La Forja del Socialismo',
      subtitulo: 'Construcción del mayor complejo metalúrgico del mundo en los Urales',
      contexto: 'Construida al pie del monte Magnítnaya con asesoría técnica estadounidense, Magnitogorsk fue levantada en tiempo récord por voluntarios del Komsomol y miles de deportados forzados a temperaturas de -40 °C. Hacia 1939 abastecía un tercio del acero y los blindajes blindados de tanques soviéticos.',
      personajes: [
        { nombre: 'Aleksandr Zavenyaguin', rol: 'Director general del Combinado Metalúrgico (MMK).' },
        { nombre: 'John Scott', rol: 'Soldador estadounidense que documentó la epopeya fabril y el terror diario.' },
        { nombre: 'Brigadistas Komsomol', rol: 'Jóvenes movilizados por la mística revolucionaria del acero.' }
      ],
      datosClave: [
        'Alto Horno N° 1 encendido el 31 de enero de 1932.',
        'Proveyó el acero fundido para los tanques T-34 decisivos en la Segunda Guerra Mundial.'
      ],
      cita: '«Construíamos con picos congelados, pero sentíamos que levantábamos el futuro.» — John Scott, 1942.',
      fuente: 'Scott, John (1942), "Behind the Urals".'
    },
    'exp-belomorkanal': {
      codigo: 'EXP-1933-GUL-05',
      clasificacion: 'COMISARIADO DEL PUEBLO DE ASUNTOS INTERNOS (NKVD)',
      fecha: 'NOVIEMBRE DE 1931 – AGOSTO DE 1933',
      titulo: 'El Belomorkanal y la Génesis del GULAG',
      subtitulo: 'Trabajo forzado, la "perekovka" (reforja moral) y el canal Báltico-Mar Blanco',
      contexto: 'Fue el primer megaproyecto construido casi íntegramente con mano de obra esclava del campo Belbaltlag. Supervisado por el NKVD, 227 kilómetros se excavaron en 20 meses sin maquinaria pesada. La propaganda proclamó la "reforja" del delincuente, mientras miles perecían de frío y agotamiento en la roca ártica.',
      personajes: [
        { nombre: 'Guénrij Yagoda', rol: 'Subdirector de la policía política; organizador del trabajo concentracionario.' },
        { nombre: 'Naftali Frenkel', rol: 'Diseñó el racionamiento calórico según metros cúbicos de tierra excavada.' },
        { nombre: 'Máximo Gorki', rol: 'Escritor que encabezó la delegación oficial para glorificar la obra.' }
      ],
      datosClave: [
        '227 kilómetros cavados con palas y carretillas manuales en 20 meses.',
        'Entre 12,000 y 25,000 prisioneros murieron durante la construcción.'
      ],
      cita: '«Los prisioneros fueron las piedras angulares del canal. Su esfuerzo forjó al hombre nuevo.» — Libro conmemorativo, 1934.',
      fuente: 'Applebaum, Anne (2003), "Gulag: A History".'
    },
    'exp-purgas-1937': {
      codigo: 'EXP-1937-TER-06',
      clasificacion: 'ORDEN OPERATIVA NKVD N° 00447',
      fecha: 'JULIO DE 1936 – NOVIEMBRE DE 1938',
      titulo: 'La Gran Purga y el Gran Terror (Yezhóvshchina)',
      subtitulo: 'Juicios de Moscú, cuotas de fusilamiento y descabezamiento del Ejército Rojo',
      contexto: 'Bajo la conducción de Stalin y Nikolái Yezhov, el NKVD emitió cuotas regionales de arrestos y ejecuciones inmediatas. Mediante confesiones obtenidas bajo tortura y tres grandes juicios públicos, se liquidó a los antiguos dirigentes bolcheviques y al 80% del alto mando militar en vísperas del conflicto mundial.',
      personajes: [
        { nombre: 'Nikolái Yezhov', rol: 'Comisario del NKVD; ejecutor del terror estatal (purgado en 1940).' },
        { nombre: 'Andréi Vyshinski', rol: 'Fiscal General; artífice de la doctrina de la confesión inculpatoria.' },
        { nombre: 'Mijaíl Tujachevski', rol: 'Mariscal de la URSS fusilado junto a la cúpula del Ejército Rojo.' }
      ],
      datosClave: [
        '681,692 ejecuciones documentadas por el NKVD entre 1937 y 1938.',
        'Descabezamiento militar: 3 de 5 mariscales y la mayoría de comandantes de división fueron purgados.'
      ],
      cita: '«Fusilen a los perros rabiosos. Muerte a los enemigos del pueblo.» — Andréi Vyshinski, 1938.',
      fuente: 'Getty, J. A. (1999), "The Road to Terror"; Memorial International.'
    }
  };

  // Referencias al DOM del modal de expediente
  const modal = document.getElementById('modal-expediente');
  const backdrop = document.getElementById('expediente-backdrop');
  const carpetaTapa = document.getElementById('carpeta-tapa-frontal');
  const docInterior = document.getElementById('expediente-doc-interior');
  const btnCerrar = document.getElementById('expediente-btn-cerrar');

  // Campos de texto dinámicos
  const elCodigo = document.getElementById('exp-codigo');
  const elClasif = document.getElementById('exp-clasificacion');
  const elFecha = document.getElementById('exp-fecha');
  const elTitulo = document.getElementById('exp-titulo');
  const elSubtitulo = document.getElementById('exp-subtitulo');
  const elContexto = document.getElementById('exp-contexto');
  const elPersonajes = document.getElementById('exp-personajes');
  const elDatos = document.getElementById('exp-datos');
  const elCita = document.getElementById('exp-cita');
  const elFuente = document.getElementById('exp-fuente');
  const elTapaCodigo = document.getElementById('tapa-codigo');
  const elTapaTitulo = document.getElementById('tapa-titulo');

  if (!modal) return;

  let animacionEnProgreso = false;

  // Función para abrir el expediente con animación GSAP
  window.abrirExpediente = function (id) {
    if (animacionEnProgreso) return;
    const datos = expedientesDB[id] || expedientesDB['exp-lenin-nep'];

    // Inyectar datos en la plantilla
    if (elCodigo) elCodigo.textContent = datos.codigo;
    if (elClasif) elClasif.textContent = `★ ${datos.clasificacion} ★`;
    if (elFecha) elFecha.textContent = datos.fecha;
    if (elTitulo) elTitulo.textContent = datos.titulo;
    if (elSubtitulo) elSubtitulo.textContent = datos.subtitulo;
    if (elContexto) elContexto.textContent = datos.contexto;
    if (elCita) elCita.textContent = datos.cita;
    if (elFuente) elFuente.textContent = datos.fuente;

    if (elTapaCodigo) elTapaCodigo.textContent = datos.codigo;
    if (elTapaTitulo) elTapaTitulo.textContent = datos.titulo;

    // Inyectar personajes clave
    if (elPersonajes) {
      elPersonajes.innerHTML = '';
      datos.personajes.forEach(p => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${p.nombre}:</strong> <span>${p.rol}</span>`;
        elPersonajes.appendChild(li);
      });
    }

    // Inyectar datos clave
    if (elDatos) {
      elDatos.innerHTML = '';
      datos.datosClave.forEach(d => {
        const li = document.createElement('li');
        li.textContent = d;
        elDatos.appendChild(li);
      });
    }

    // Mostrar modal en el DOM
    modal.classList.add('visible');
    document.body.style.overflow = 'hidden';

    // Verificar si el usuario prefiere reducir animaciones
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof gsap === 'undefined') {
      if (backdrop) backdrop.style.opacity = '1';
      if (carpetaTapa) carpetaTapa.style.transform = 'rotateY(-110deg)';
      if (docInterior) {
        docInterior.style.opacity = '1';
        docInterior.style.transform = 'none';
      }
      return;
    }

    animacionEnProgreso = true;

    // Timeline GSAP para apertura realista de carpeta militar
    const tl = gsap.timeline({
      onComplete: () => {
        animacionEnProgreso = false;
      }
    });

    // Estado inicial
    gsap.set(backdrop, { opacity: 0 });
    gsap.set(carpetaTapa, { rotateY: 0, opacity: 1 });
    gsap.set(docInterior, { opacity: 0, y: 35, scale: 0.96 });

    // Animación secuencial
    tl.to(backdrop, {
      opacity: 1,
      duration: 0.35,
      ease: 'power2.out'
    })
    .to(carpetaTapa, {
      rotateY: -115,
      duration: 0.85,
      ease: 'power2.inOut',
      transformOrigin: 'left center'
    }, '-=0.1')
    .to(docInterior, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.55,
      ease: 'back.out(1.1)'
    }, '-=0.35');
  };

  // Función para cerrar el expediente
  window.cerrarExpediente = function () {
    if (animacionEnProgreso) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof gsap === 'undefined') {
      modal.classList.remove('visible');
      document.body.style.overflow = '';
      return;
    }

    animacionEnProgreso = true;

    const tl = gsap.timeline({
      onComplete: () => {
        modal.classList.remove('visible');
        document.body.style.overflow = '';
        animacionEnProgreso = false;
      }
    });

    tl.to(docInterior, {
      opacity: 0,
      y: 20,
      scale: 0.98,
      duration: 0.3,
      ease: 'power2.in'
    })
    .to(carpetaTapa, {
      rotateY: 0,
      duration: 0.45,
      ease: 'power2.inOut'
    }, '-=0.15')
    .to(backdrop, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.out'
    }, '-=0.1');
  };

  // Listeners de cierre
  if (btnCerrar) btnCerrar.addEventListener('click', cerrarExpediente);
  if (backdrop) backdrop.addEventListener('click', cerrarExpediente);

  // Cierre con la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('visible')) {
      cerrarExpediente();
    }
  });

  // Vincular clics de elementos con atributo data-expediente
  document.addEventListener('click', (e) => {
    const disparador = e.target.closest('[data-expediente]');
    if (disparador) {
      e.preventDefault();
      const id = disparador.getAttribute('data-expediente');
      abrirExpediente(id);
    }
  });

});
