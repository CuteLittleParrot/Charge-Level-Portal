const graphScales = {
  y: {
      beginAtZero: true,
      ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
      },
      grid: {
          color: 'rgba(255, 255, 255, 0.2)',
      },
      border: {
          color: 'rgba(255, 255, 255, 0)',
      }
  },
  x: {
      display: false
  }
}

const maingraphOptions = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 4,
  scales: graphScales
}

const subgraphOptions = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2,
  scales: graphScales
}

let voltageChart, currentChart, windChart;

async function fetchData() {
  const response = await fetch('fetch_data.php');
  const data = await response.json();

  
  data.reverse();


  const labels = data.map(entry => entry.data);
  const voltages = data.map(entry => parseFloat(entry.voltage));
  const currents = data.map(entry => parseFloat(entry.current));
  const windIntensities = data.map(entry => parseFloat(entry.windIntensity));
  const windDirections = data.map(entry => entry.windDirection);

  return { labels, voltages, currents, windIntensities, windDirections };
}

function change() {

}

async function updateCharts() {
  const { labels, voltages, currents, windIntensities, windDirections } = await fetchData();

  if (!labels) return;  


  voltageChart.data.labels = labels;
  voltageChart.data.datasets[0].data = voltages;
  voltageChart.update();

  currentChart.data.labels = labels;
  currentChart.data.datasets[0].data = currents;
  currentChart.update();

  windChart.data.labels = labels;
  windChart.data.datasets[0].data = windIntensities;
  windChart.options.plugins.tooltip.callbacks.label = function(tooltipItem) {
      const index = tooltipItem.dataIndex;
      const direction = windDirections[index];
      return `Intensità: ${tooltipItem.parsed.y} km/h | Direzione: ${direction}`;
  };
  windChart.update();
}

window.onload = async function() {
  const { labels, voltages, currents, windIntensities, windDirections } = await fetchData();

  var main = document.getElementById('main').getContext('2d');
  voltageChart = new Chart(main, {
      type: "line",
      data: {
          labels: labels,
          datasets: [{
              label: 'Voltaggio (V)',
              data: voltages,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.25
          }]
      },
      options: maingraphOptions
  });

  var left = document.getElementById('left').getContext('2d');
  currentChart = new Chart(left, {
      type: "line",
      data: {
          labels: labels,
          datasets: [{
              label: 'Corrente (A)',
              data: currents,
              borderColor: 'rgba(192, 75, 75, 1)',
              backgroundColor: 'rgba(192, 75, 75, 0.2)',
              tension: 0.1
          }]
      },
      options: subgraphOptions
  });

  var right = document.getElementById('right').getContext('2d');
  windChart = new Chart(right, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: 'Intensità del Vento (km/h)',
              data: windIntensities,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.1
          }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        scales: graphScales,
          plugins: {
              tooltip: {
                  callbacks: {
                      title: function(tooltipItems) {
                          return tooltipItems[0].label;
                      },
                      label: function(tooltipItem) {
                          const index = tooltipItem.dataIndex;
                          const direction = windDirections[index];
                          return `Intensità: ${tooltipItem.parsed.y} km/h | Direzione: ${direction}`;
                      }
                  }
              }
          }
      }
  });


  setInterval(updateCharts, 60000);
};
