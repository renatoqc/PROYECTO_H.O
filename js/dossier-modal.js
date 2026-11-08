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
      contexto: 'Tras el deceso de Vladímir Ilich Lenin en Gorki, la dirección colectiva bolchevique se fracturó. La Nueva Política Económica (NEP), diseñada en 1921 como una tregua táctica con el campesinado, permitía el comercio privado menor. Para Stalin, la lentitud del crecimiento industrial bajo la NEP amenazaba con dejar indefensa a la URSS frente a las potencias capitalistas. Entre 1924 y 1928, Stalin maniobró hábilmente aliándose primero con la derecha del partido (Bujarin) para marginar a Trotski, para luego liquidar a los partidarios de la propia NEP e imponer la colectivización forzosa.',
      personajes: [
        { nombre: 'Iósif V. Stalin', rol: 'Secretario General del PCUS; artífice del viraje industrializador.' },
        { nombre: 'Nikolái Bujarin', rol: 'Defensor de la NEP y enriquecimiento gradual campesino; purgado posteriormente.' },
        { nombre: 'Lev Trotski', rol: 'Líder de la Oposición de Izquierda; desterrado en 1929 y asesinado en 1940.' }
      ],
      datosClave: [
        'Producción industrial en 1924: apenas alcanzaba el 35% del nivel de 1913 previo a la guerra.',
        'Crisis de acopio de grano (1927–1928): los campesinos retuvieron cosechas por los bajos precios fijados por el Estado.',
        'Diciembre de 1927: el XV Congreso del PCUS aprueba las directrices para el Primer Plan Quinquenal.'
      ],
      cita: '«No podemos permitir que el destino de la patria de los trabajadores dependa de los caprichos del kulak y el comerciante privado.» — Informe interno al Politburó, 1928.',
      fuente: 'Archivos Estatales de la Federación Rusa (GARF), fondo 5446; Cohen, S. (1973), "Bukharin and the Bolshevik Revolution".'
    },
    'exp-viraje-1928': {
      codigo: 'EXP-1928-IND-02',
      clasificacion: 'ALTO SECRETO MILITAR // GOSPLÁN',
      fecha: 'OCTUBRE DE 1928 – DICIEMBRE DE 1932',
      titulo: 'El Gran Viraje y el Primer Plan Quinquenal',
      subtitulo: 'La industrialización a marchas forzadas y la forja del acero',
      contexto: 'El Gran Viraje (Veliki Perelom) proclamó la subordinación total de la economía a la industria pesada: siderurgia, generación hidroeléctrica, minería del carbón y maquinaria bélica. Bajo directrices implacables del Gosplán, se crearon ciudades enteras en la estepa desde cero, como el coloso metalúrgico de Magnitogorsk al pie del monte Magnítnaya. Cientos de miles de brigadistas y trabajadores forzados trabajaron en condiciones polares sin maquinaria moderna, motivados por una intensa propaganda y castigados si no cumplían las cuotas.',
      personajes: [
        { nombre: 'Valerián Kúibyshev', rol: 'Presidente del Gosplán y del Sóviet Supremo de Economía Nacional.' },
        { nombre: 'Sergó Ordzhonikidze', rol: 'Comisario del Pueblo para la Industria Pesada (Narkomtiazhprom).' },
        { nombre: 'Ingenieros extranjeros', rol: 'Más de 1,500 técnicos estadounidenses y alemanes contratados bajo estricta vigilancia.' }
      ],
      datosClave: [
        'Construcción de la central DneproGES: la mayor planta hidroeléctrica de Europa en su época.',
        'Metas de producción irreales: se exigió quintuplicar la extracción de hierro en cuatro años.',
        'Tasa de inversión récord: más del 40% del ingreso nacional se reorientó a la industria pesada.'
      ],
      cita: '«Nos encontramos con un retraso de 50 o 100 años respecto a los países avanzados. Debemos recorrer esta distancia en 10 años. O lo logramos, o nos aplastarán.» — Iósif Stalin, 4 de febrero de 1931.',
      fuente: 'Davies, R. W. (1989), "The Industrialisation of Soviet Russia"; Kotkin, S. (1995), "Magnetic Mountain: Stalinism as a Civilization".'
    },
    'exp-colectivizacion': {
      codigo: 'EXP-1929-COL-03',
      clasificacion: 'ESTRICTAMENTE RESERVADO // COMISARIADO DE AGRICULTURA',
      fecha: 'NOVIEMBRE DE 1929 – MARZO DE 1933',
      titulo: 'Colectivización Forzada y "Deskulakización"',
      subtitulo: 'Expropiación masiva, requisa de grano y la hambruna del Holodomor',
      contexto: 'Para financiar la compra de maquinaria pesada occidental, el Estado soviético requería exportar grano masivamente. La solución de Stalin fue liquidar la propiedad individual agraria y forzar a más de 25 millones de familias campesinas a ingresar en Koljoses (granjas colectivas) o Sovjoses (granjas estatales). Aquellos que se resistieron al despojo fueron etiquetados como "kulaks". Mediante la orden de "liquidación de los kulaks como clase", cientos de miles fueron fusilados y cerca de 2 millones fueron deportados a regiones inhóspitas de Siberia y Asia Central.',
      personajes: [
        { nombre: 'Iósif V. Stalin', rol: 'Ordenó la liquidación integral y requisas sin concesiones.' },
        { nombre: 'Viacheslav Mólotov', rol: 'Enviado plenipotenciario a Ucrania para asegurar la extracción total del grano.' },
        { nombre: 'Campesinado ucraniano y cosaco', rol: 'Víctimas de la confiscación armada y el confinamiento militar.' }
      ],
      datosClave: [
        'Ley de las Cinco Espigas (1932): castigaba con fusilamiento o 10 años de GULAG el robo de un puñado de grano de los campos colectivos.',
        'Bloqueo militar de fronteras en Ucrania y Kubán para impedir la huida de la población hambrienta.',
        'Mortalidad catastrófica: se estima entre 3.5 y 5 millones de fallecidos por la hambruna en Ucrania (Holodomor) y 1.5 millones en Kazajistán.'
      ],
      cita: '«Para desplazar a los kulaks como clase, debemos quebrar abiertamente su resistencia en una batalla implacable.» — Discurso de Stalin, diciembre de 1929.',
      fuente: 'Conquest, Robert (1986), "The Harvest of Sorrow"; Applebaum, Anne (2017), "Red Famine: Stalin\'s War on Ukraine".'
    },
    'exp-magnitogorsk': {
      codigo: 'EXP-1932-MAG-04',
      clasificacion: 'EXPEDIENTE INDUSTRIAL S-04',
      fecha: '1929 – 1936',
      titulo: 'Magnitogorsk: La Forja del Socialismo',
      subtitulo: 'Construcción del mayor complejo metalúrgico del mundo en los Urales',
      contexto: 'Inspirada en la planta siderúrgica de Gary (Indiana, EE. UU.), Magnitogorsk fue diseñada por la firma estadounidense Arthur McKee & Co. y levantada por una masa de trabajadores voluntarios del Komsomol, desempleados forzados y decenas de miles de deportados "deskulakizados". Las temperaturas en invierno descendían hasta -40 °C mientras miles vivían en tiendas de campaña de lona y chozas de barro. Hacia 1939, producía un tercio del acero y la mitad de los blindajes de tanques de toda la Unión Soviética.',
      personajes: [
        { nombre: 'Aleksandr Zavenyaguin', rol: 'Director del Combinado Metalúrgico de Magnitogorsk (MMK).' },
        { nombre: 'John Scott', rol: 'Soldador estadounidense que documentó la epopeya y el terror diario en la fábrica.' },
        { nombre: 'Brigadistas del Komsomol', rol: 'Juventud movilizada por la mística revolucionaria del acero.' }
      ],
      datosClave: [
        'Alto Horno N° 1 encendido el 31 de enero de 1932.',
        'Más del 30% de la fuerza laboral original eran presos políticos y colonos especiales bajo vigilancia de la OGPU/NKVD.',
        'La acería proveyó el acero para los tanques T-34 que derrotaron a las divisiones blindadas nazis en 1943.'
      ],
      cita: '«Construíamos con picos y palas congeladas, pero sentíamos que estábamos levantando el futuro sobre el lomo del mundo antiguo.» — John Scott, "Beyond the Urals".',
      fuente: 'Scott, John (1942), "Behind the Urals: An American Worker in Russia\'s City of Steel".'
    },
    'exp-belomorkanal': {
      codigo: 'EXP-1933-GUL-05',
      clasificacion: 'COMISARIADO DEL PUEBLO DE ASUNTOS INTERNOS (NKVD)',
      fecha: 'NOVIEMBRE DE 1931 – AGOSTO DE 1933',
      titulo: 'El Belomorkanal y la Génesis del GULAG',
      subtitulo: 'Trabajo forzado, la "perekovka" (reforja moral) y el canal Báltico-Mar Blanco',
      contexto: 'El canal Mar Blanco-Báltico (Belomorkanal) fue el primer megaproyecto construido casi exclusivamente mediante trabajo esclavo de prisioneros del campo de concentración Belbaltlag. Supervisado por Guénrij Yagoda y Matvéi Berman, el canal de 227 kilómetros se cavó en solo 20 meses sin excavadoras modernas, utilizando herramientas de madera, palas y carretillas manuales. La propaganda soviética proclamó el concepto de "perekovka" (la reforja del delincuente a través del trabajo socialista), mientras entre 12,000 y 25,000 prisioneros murieron de agotamiento y frío.',
      personajes: [
        { nombre: 'Guénrij Yagoda', rol: 'Segundo jefe de la OGPU; condecorado con la Orden de Lenin por el canal.' },
        { nombre: 'Naftali Frenkel', rol: 'Ex prisionero de Solovkí que diseñó el sistema de raciones calóricas según metros cúbicos de tierra movidos.' },
        { nombre: 'Máximo Gorki', rol: 'Escritor que lideró la delegación de autores para ensalzar el canal en un libro conmemorativo.' }
      ],
      datosClave: [
        '227 kilómetros de longitud a través de roca granítica y pantanos de Carelia.',
        'Tiempo récord: 20 meses (noviembre 1931 – julio 1933).',
        'Falla de ingeniería: debido a la prisa propagandística, se cavó con solo 3.6 metros de profundidad, haciéndolo inútil para la mayoría de buques de guerra.'
      ],
      cita: '«Los prisioneros se convirtieron en piedras angulares del canal. Su sudor derritió el hielo y su esfuerzo forjó al hombre nuevo.» — Libro conmemorativo del Belomorkanal, 1934.',
      fuente: 'Applebaum, Anne (2003), "Gulag: A History"; Solzhenitsyn, Aleksandr (1973), "Archipiélago Gulag".'
    },
    'exp-purgas-1937': {
      codigo: 'EXP-1937-TER-06',
      clasificacion: 'ORDEN OPERATIVA NKVD N° 00447',
      fecha: 'JULIO DE 1936 – NOVIEMBRE DE 1938',
      titulo: 'La Gran Purga y el Gran Terror (Yezhóvshchina)',
      subtitulo: 'Juicios de Moscú, cuotas de fusilamiento y descabezamiento del Ejército Rojo',
      contexto: 'El asesinato de Serguéi Kírov en 1934 desató una espiral represiva que culminó entre 1937 y 1938 con el Gran Terror. Bajo la dirección de Nikolái Yezhov, el Politburó emitió la Orden N° 00447, estableciendo "cuotas" territoriales de personas a fusilar (Categoría 1) o enviar 10 años al GULAG (Categoría 2). Los jerarcas locales del partido competían por pedir aumentos de cuota para demostrar su lealtad. Simultáneamente, tres grandes juicios públicos en Moscú forzaron a la vieja guardia bolchevique (Zinóviev, Kámenev, Bujarin) a confesar crímenes inverosímiles de conspiración con la Gestapo.',
      personajes: [
        { nombre: 'Nikolái Yezhov', rol: 'Comisario del Pueblo del NKVD apodado "el enano de hierro"; ejecutado en 1940.' },
        { nombre: 'Andréi Vyshinski', rol: 'Fiscal General de la URSS célebre por su lema: "La confesión es la reina de las pruebas".' },
        { nombre: 'Mijaíl Tujachevski', rol: 'Mariscal de la URSS fusilado junto al 80% del alto mando del Ejército Rojo en vísperas de la II Guerra Mundial.' }
      ],
      datosClave: [
        '681,692 fusilamientos documentados en los archivos del NKVD entre 1937 y 1938 (más de 1,000 ejecuciones diarias).',
        'Fosas comunes secretas como Butovo (Moscú), Levashovo (Leningrado) y Sandarmokh (Carelia).',
        'Descabezamiento militar: 3 de los 5 mariscales soviéticos, 13 de 15 comandantes de ejército y miles de oficiales fueron purgados.'
      ],
      cita: '«Fusilen a los perros rabiosos. Muerte a esa banda que oculta sus garras feroces bajo la máscara del partido.» — Andréi Vyshinski, alegato fiscal, 1938.',
      fuente: 'Getty, J. Arch & Naumov, Oleg (1999), "The Road to Terror"; Memorial International (Archivos de víctimas del terror político).'
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
