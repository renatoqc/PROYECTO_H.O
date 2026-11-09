// Red Interactiva de Relaciones Históricas (Vis.js) con Nodos Fijos y Colores Distintivos
document.addEventListener('DOMContentLoaded', () => {

  const networkContainer = document.getElementById('network-graph');
  if (!networkContainer) return;

  // Paleta de colores por categoría (formato oficial de Vis.js)
  const colores = {
    causas: {
      background: '#D4E6F1',
      border: '#1F4E79',
      highlight: { background: '#AED6F1', border: '#154360' },
      hover: { background: '#AED6F1', border: '#154360' }
    },
    actores: {
      background: '#D5F5E3',
      border: '#117A65',
      highlight: { background: '#A9DFBF', border: '#0E6251' },
      hover: { background: '#A9DFBF', border: '#0E6251' }
    },
    procesos: {
      background: '#FCF3CF',
      border: '#B7950B',
      highlight: { background: '#F9E79F', border: '#9A7D0A' },
      hover: { background: '#F9E79F', border: '#9A7D0A' }
    },
    consecuencias: {
      background: '#FADBD8',
      border: '#A52D27',
      highlight: { background: '#F5B7B1', border: '#78281F' },
      hover: { background: '#F5B7B1', border: '#78281F' }
    }
  };

  // Nodos con posiciones fijas (X, Y) organizados de izquierda a derecha
  const nodosRaw = [
    // COLUMNA 1: CAUSAS (X: -360)
    {
      id: 'c1',
      label: 'Retraso\nIndustrial',
      category: 'causas',
      x: -360,
      y: -140,
      title_full: 'Atraso Técnico e Industrial de la URSS',
      desc: 'Hacia 1928, la URSS producía menos del 5% del acero mundial y dependía de maquinaria extranjera, amenazando su viabilidad económica.',
      fuente: 'Davies, R.W. (1989). "The Industrialisation of Soviet Russia". Palgrave Macmillan.',
      color: colores.causas
    },
    {
      id: 'c2',
      label: 'Cerco\nCapitalista',
      category: 'causas',
      x: -360,
      y: 0,
      title_full: 'Percepción de Asedio y Guerra Inminente',
      desc: 'La convicción de la cúpula bolchevique de que las potencias occidentales planificaban invadir la URSS si no se industrializaba con rapidez bélica.',
      fuente: 'Discurso de Stalin (1931): "Estamos 50 a 100 años por detrás de los países avanzados... o lo logramos en 10 años, o nos aplastarán".',
      color: colores.causas
    },
    {
      id: 'c3',
      label: 'Mando de\nStalin',
      category: 'causas',
      x: -360,
      y: 140,
      title_full: 'Consolidación del Poder Autocrático',
      desc: 'Eliminación sucesiva de las oposiciones de izquierda (Trotski) y derecha (Bujarin), centralizando todas las decisiones en el Politburó.',
      fuente: 'Kotkin, S. (2014). "Stalin: Paradoxes of Power". Penguin Books.',
      color: colores.causas
    },

    // COLUMNA 2: ACTORES (X: -120)
    {
      id: 'a3',
      label: 'Campesinado\ny Kulaks',
      category: 'actores',
      x: -120,
      y: -210,
      title_full: 'Población Agraria y "Deskulakización"',
      desc: 'Más del 80% de la población de la URSS. Fueron despojados de tierras y cosechas, categorizados como enemigos ideológicos.',
      fuente: 'Conquest, R. (1986). "The Harvest of Sorrow: Soviet Collectivization and the Terror-Famine". Oxford University Press.',
      color: colores.actores
    },
    {
      id: 'a4',
      label: 'Obreros\nEstajanovistas',
      category: 'actores',
      x: -120,
      y: -70,
      title_full: 'Movimiento Estajanovista y Proletariado Fabril',
      desc: 'Trabajadores fabriles movilizados con propaganda de productividad extrema, emulación socialista y severas sanciones por impuntualidad.',
      fuente: 'Siegelbaum, L. (1988). "Stakhanovism and the Politics of Productivity in the USSR". Cambridge University Press.',
      color: colores.actores
    },
    {
      id: 'a1',
      label: 'Stalin y\nNomenklatura',
      category: 'actores',
      x: -120,
      y: 70,
      title_full: 'Élite Burocrática del Partido (Nomenklatura)',
      desc: 'Casta de funcionarios y comisarios que ejecutaban sin objeción las metas del Gosplán, premiados con privilegios y amenazados con purgas.',
      fuente: 'Fitzpatrick, S. (1999). "Everyday Stalinism". Oxford University Press.',
      color: colores.actores
    },
    {
      id: 'a2',
      label: 'Aparato\nNKVD',
      category: 'actores',
      x: -120,
      y: 210,
      title_full: 'Comisariado del Pueblo para Asuntos Internos',
      desc: 'Órgano de seguridad y policía secreta estatal encabezado por Yagoda, Yezhov y Beria; brazo armado del terror de Estado.',
      fuente: 'Jansen, M. & Petrov, N. (2002). "Stalin\'s Loyal Executioner: People\'s Commissar Nikolai Ezhov". Hoover Institution Press.',
      color: colores.actores
    },

    // COLUMNA 3: PROCESOS (X: 130)
    {
      id: 'p2',
      label: 'Colectivización\nForzada',
      category: 'procesos',
      x: 130,
      y: -210,
      title_full: 'Expropiación Agraria y Granjas Colectivas',
      desc: 'Sustitución compulsiva de explotaciones privadas por Koljoses y Sovjoses para extraer grano a bajo costo y financiar la importación de maquinaria.',
      fuente: 'Viola, L. (1996). "Peasant Rebels Under Stalin". Oxford University Press.',
      color: colores.procesos
    },
    {
      id: 'p1',
      label: 'Planes\nQuinquenales',
      category: 'procesos',
      x: 130,
      y: -70,
      title_full: 'Economía Planificada y Planes Quinquenales (1928+)',
      desc: 'Metas forzadas de producción pesada fijadas por el Gosplán. Construcción récord de complejos metalúrgicos (Magnitogorsk) y centrales hidroeléctricas.',
      fuente: 'Ellman, M. (1979). "Socialist Planning". Cambridge University Press.',
      color: colores.procesos
    },
    {
      id: 'p4',
      label: 'Sistema\nGULAG',
      category: 'procesos',
      x: 130,
      y: 70,
      title_full: 'Dirección General de Campos de Trabajo Correccional',
      desc: 'Red continental de colonias penitenciarias usada como mano de obra esclava en minería polar (Kolyma), canales (Belomorkanal) y tala siberiana.',
      fuente: 'Applebaum, A. (2003). "Gulag: A History". Doubleday.',
      color: colores.procesos
    },
    {
      id: 'p3',
      label: 'La Gran Purga\n(1936–1938)',
      category: 'procesos',
      x: 130,
      y: 210,
      title_full: 'El Gran Terror (Yezhóvshchina)',
      desc: 'Campaña masiva de detenciones, juicios farsa y ejecuciones sumarias dirigida a la vieja guardia bolchevique, militares del Ejército Rojo e intelectuales.',
      fuente: 'Getty, J. A. & Naumov, O. (1999). "The Road to Terror: Stalin and the Self-Destruction of the Bolsheviks". Yale University Press.',
      color: colores.procesos
    },

    // COLUMNA 4: CONSECUENCIAS (X: 370)
    {
      id: 'r1',
      label: 'Holodomor\n(1932–1933)',
      category: 'consecuencias',
      x: 370,
      y: -210,
      title_full: 'Hambruna Catastrófica en Ucrania, Kazajistán y Kubán',
      desc: 'Consecuencia directa de las requisas confiscatorias y el cierre de fronteras regionales. Provocó entre 3.5 y 5 millones de muertes por inanición.',
      fuente: 'Applebaum, A. (2017). "Red Famine: Stalin\'s War on Ukraine". Doubleday.',
      color: colores.consecuencias
    },
    {
      id: 'r2',
      label: 'Poderío Militar\ne Industrial',
      category: 'consecuencias',
      x: 370,
      y: -70,
      title_full: 'Transformación en Superpotencia Siderúrgica y Bélica',
      desc: 'La URSS se erigió como la 2ª potencia fabril mundial, base indispensable para resistir la invasión nazi en la Segunda Guerra Mundial (1941–1945).',
      fuente: 'Barber, J. & Harrison, M. (1991). "The Soviet Home Front, 1941-1945". Longman.',
      color: colores.consecuencias
    },
    {
      id: 'r3',
      label: 'Destrucción del\nTejido Social',
      category: 'consecuencias',
      x: 370,
      y: 150,
      title_full: 'Cultura de la Delación y Trauma Colectivo',
      desc: 'Quiebre de los vínculos comunitarios y familiares por la desconfianza generalizada, vigilancia constante y represión a disidentes.',
      fuente: 'Figes, O. (2007). "The Whisperers: Private Life in Stalin\'s Russia". Metropolitan Books.',
      color: colores.consecuencias
    }
  ];

  // Conexiones dirigidas con etiquetas históricas claras y horizontales
  const conexionesRaw = [
    { from: 'c1', to: 'p1', label: 'Impulsa' },
    { from: 'c2', to: 'p1', label: 'Justifica urgencia' },
    { from: 'c3', to: 'a1', label: 'Subordina' },
    { from: 'a1', to: 'p1', label: 'Fija metas' },
    { from: 'a1', to: 'p2', label: 'Ordena' },
    { from: 'a1', to: 'p3', label: 'Instiga' },
    { from: 'p2', to: 'a3', label: 'Expropia' },
    { from: 'a3', to: 'p4', label: 'Deportados' },
    { from: 'p2', to: 'r1', label: 'Desencadena' },
    { from: 'a2', to: 'p3', label: 'Ejecuta arrestos' },
    { from: 'a2', to: 'p4', label: 'Custodia' },
    { from: 'p1', to: 'a4', label: 'Exige récords' },
    { from: 'p4', to: 'p1', label: 'Aporta trabajo' },
    { from: 'p1', to: 'r2', label: 'Engendra' },
    { from: 'p3', to: 'r3', label: 'Siembra pánico' }
  ];

  // Formato visual general para nodos
  const nodosFormateados = nodosRaw.map(n => ({
    ...n,
    shape: 'box',
    margin: 11,
    borderWidth: 2.5,
    font: {
      face: 'Courier Prime, monospace',
      size: 13,
      color: '#151D19',
      bold: { color: '#151D19' }
    },
    shadow: {
      enabled: true,
      color: 'rgba(21, 29, 25, 0.15)',
      size: 4,
      x: 2,
      y: 2
    }
  }));

  // Formato visual para aristas con texto horizontal legible y fondo blanco
  const conexionesFormateadas = conexionesRaw.map((e, index) => ({
    id: `e-${index}`,
    ...e,
    arrows: { to: { enabled: true, scaleFactor: 0.85 } },
    color: { color: '#28352A', highlight: '#A52D27', hover: '#A52D27' },
    width: 2,
    font: {
      face: 'Courier Prime, monospace',
      size: 11,
      align: 'horizontal', // Texto siempre horizontal para lectura cómoda
      background: '#FAF6EE',
      strokeWidth: 2,
      strokeColor: '#FAF6EE',
      color: '#151D19'
    },
    smooth: { type: 'continuous', roundness: 0.15 }
  }));

  // DataSets de Vis.js
  const nodesDataSet = new vis.DataSet(nodosFormateados);
  const edgesDataSet = new vis.DataSet(conexionesFormateadas);

  // Opciones de Vis.js con físicas desactivadas y nodos inmóviles
  const opciones = {
    physics: {
      enabled: false // Desactiva movimiento caótico de nodos
    },
    interaction: {
      dragNodes: false, // Los nodos NO se pueden mover con el ratón
      dragView: true,  // El usuario puede arrastrar el lienzo para navegar
      zoomView: true,  // Zoom habilitado con la rueda del ratón
      hover: true
    }
  };

  // Inicialización de la red
  const network = new vis.Network(networkContainer, { nodes: nodesDataSet, edges: edgesDataSet }, opciones);

  // Centrar la red inicialmente
  network.once('afterDrawing', () => {
    network.fit({ animation: { duration: 500, easingFunction: 'easeInOutQuad' } });
  });

  // Elementos del panel lateral (ficha)
  const drawer = document.getElementById('drawer-ficha');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerCloseBtn = document.getElementById('drawer-close');
  const drawerSello = document.getElementById('drawer-sello');
  const drawerTitulo = document.getElementById('drawer-titulo');
  const drawerDesc = document.getElementById('drawer-desc');
  const drawerConexiones = document.getElementById('drawer-conexiones');
  const drawerFuente = document.getElementById('drawer-fuente');

  // Abre la ficha lateral con los datos del nodo
  function abrirFicha(nodoId) {
    const nodo = nodosRaw.find(n => n.id === nodoId);
    if (!nodo) return;

    // Sello de categoría
    const etiquetas = {
      causas: 'Causa Estructural',
      actores: 'Actor Histórico',
      procesos: 'Proceso Estatal',
      consecuencias: 'Consecuencia / Impacto'
    };
    drawerSello.textContent = `★ ${etiquetas[nodo.category] || nodo.category} ★`;
    drawerSello.className = `drawer-sello sello-${nodo.category}`;

    drawerTitulo.textContent = nodo.title_full;
    drawerDesc.textContent = nodo.desc;
    drawerFuente.textContent = nodo.fuente;

    // Conexiones directas
    drawerConexiones.innerHTML = '';
    const vinculadas = conexionesRaw.filter(c => c.from === nodoId || c.to === nodoId);

    vinculadas.forEach(v => {
      const li = document.createElement('li');
      const esOrigen = v.from === nodoId;
      const otroId = esOrigen ? v.to : v.from;
      const otroNodo = nodosRaw.find(n => n.id === otroId);
      const nombreOtro = otroNodo ? otroNodo.title_full : otroId;

      if (esOrigen) {
        li.innerHTML = `→ <em>${v.label}</em> hacia <strong>${nombreOtro}</strong>`;
      } else {
        li.innerHTML = `← <em>${v.label}</em> por <strong>${nombreOtro}</strong>`;
      }
      drawerConexiones.appendChild(li);
    });

    drawer.classList.add('activo');
    drawerBackdrop.classList.add('activo');
  }

  // Cierra la ficha lateral
  function cerrarFicha() {
    drawer.classList.remove('activo');
    drawerBackdrop.classList.remove('activo');
  }

  // Clic en un nodo de la red para abrir el panel lateral
  network.on('click', params => {
    if (params.nodes.length > 0) {
      abrirFicha(params.nodes[0]);
    }
  });

  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', cerrarFicha);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', cerrarFicha);

  // Filtros de categoría superiores
  const botonesFiltro = document.querySelectorAll('.btn-filtro-archivo');

  botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
      botonesFiltro.forEach(b => b.classList.remove('activo'));
      boton.classList.add('activo');

      const categoriaSeleccionada = boton.getAttribute('data-categoria');

      const todosLosNodos = nodesDataSet.get();
      const updates = todosLosNodos.map(n => {
        const visible = categoriaSeleccionada === 'todos' || n.category === categoriaSeleccionada;
        return { id: n.id, hidden: !visible };
      });
      nodesDataSet.update(updates);

      // Reenfocar suavemente
      setTimeout(() => {
        network.fit({ animation: { duration: 400, easingFunction: 'easeInOutQuad' } });
      }, 50);
    });
  });

});
