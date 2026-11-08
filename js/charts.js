// Visualización de Datos Históricos con Chart.js
document.addEventListener('DOMContentLoaded', () => {

  const canvas = document.getElementById('chart-gosplan');
  if (!canvas || typeof Chart === 'undefined') return;

  // Datos verificados de los archivos del Gosplán (Fuentes: Davies, Wheatcroft & Harrison)
  const anios = ['1928', '1930', '1932', '1934', '1936', '1938', '1940'];
  const produccionAcero = [4.3, 5.8, 5.9, 9.6, 16.4, 18.1, 18.3]; // Millones de toneladas
  const produccionCarbon = [35.5, 47.8, 64.4, 93.6, 126.0, 132.9, 165.9]; // Millones de toneladas
  const tasaColectivizacion = [1.7, 23.6, 61.5, 71.4, 90.5, 93.5, 96.9]; // Porcentaje de granjas campesinas

  // Configuración de estilo acorde a la estética de expediente soviético
  const ctx = canvas.getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: anios,
      datasets: [
        {
          label: 'Producción de Acero (Millones de Tm)',
          data: produccionAcero,
          borderColor: '#1F4E79', // Azul archivo militar
          backgroundColor: 'rgba(31, 78, 121, 0.1)',
          borderWidth: 3,
          pointBackgroundColor: '#1F4E79',
          pointBorderColor: '#FAF6EE',
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.25,
          yAxisID: 'y'
        },
        {
          label: 'Extracción de Carbón (Millones de Tm)',
          data: produccionCarbon,
          borderColor: '#28352A', // Verde militar
          backgroundColor: 'rgba(40, 53, 42, 0.08)',
          borderWidth: 2.5,
          borderDash: [5, 4],
          pointBackgroundColor: '#28352A',
          pointBorderColor: '#FAF6EE',
          pointRadius: 4,
          tension: 0.2,
          yAxisID: 'y'
        },
        {
          label: '% Granjas Colectivizadas (Koljoses)',
          data: tasaColectivizacion,
          borderColor: '#A52D27', // Rojo clasificación
          backgroundColor: 'rgba(165, 45, 39, 0.12)',
          borderWidth: 3,
          pointBackgroundColor: '#A52D27',
          pointBorderColor: '#FAF6EE',
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.2,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              family: 'Courier Prime, monospace',
              size: 11
            },
            color: '#151D19',
            boxWidth: 16,
            usePointStyle: true
          }
        },
        tooltip: {
          backgroundColor: '#FAF6EE',
          titleColor: '#A52D27',
          bodyColor: '#151D19',
          borderColor: '#151D19',
          borderWidth: 1.5,
          titleFont: { family: 'Special Elite, monospace', size: 13 },
          bodyFont: { family: 'Courier Prime, monospace', size: 12 },
          padding: 12,
          displayColors: true,
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              const val = context.parsed.y;
              if (context.datasetIndex === 2) {
                return ` ${label}: ${val}% de granjas bajo control estatal`;
              }
              return ` ${label}: ${val} MT (millones de toneladas)`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: '#D8D0B9',
            lineWidth: 1
          },
          ticks: {
            font: { family: 'Courier Prime, monospace', size: 12 },
            color: '#151D19'
          },
          title: {
            display: true,
            text: 'Año Fiscal / Período del Gosplán',
            font: { family: 'Courier Prime, monospace', size: 11 },
            color: '#424B44'
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          grid: {
            color: '#D8D0B9',
            lineWidth: 1
          },
          ticks: {
            font: { family: 'Courier Prime, monospace', size: 11 },
            color: '#151D19'
          },
          title: {
            display: true,
            text: 'Producción Pesada (Millones de Tm)',
            font: { family: 'Courier Prime, monospace', size: 11 },
            color: '#151D19'
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: {
            drawOnChartArea: false
          },
          ticks: {
            font: { family: 'Courier Prime, monospace', size: 11 },
            color: '#A52D27',
            callback: value => `${value}%`
          },
          title: {
            display: true,
            text: '% Colectivización Forzada',
            font: { family: 'Courier Prime, monospace', size: 11 },
            color: '#A52D27'
          },
          min: 0,
          max: 100
        }
      }
    }
  });

});
