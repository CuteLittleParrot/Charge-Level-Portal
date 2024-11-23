// Assicurati che lo script venga eseguito dopo il caricamento del documento
window.onload = function() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',  // Tipo di grafico
        data: {
            labels: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno'],
            datasets: [{
                label: 'Vendite',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};
