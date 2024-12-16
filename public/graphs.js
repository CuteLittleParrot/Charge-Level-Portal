// Assicurati che lo script venga eseguito dopo il caricamento del documento

const graphScales = {
    y: {
        beginAtZero: true,  // Start the Y-axis at 0
        ticks: {
            color: 'rgba(255, 255, 255, 0.5)',  // Change tick label color
        },
        grid: {
            color: 'rgba(255, 255, 255, 0.2)',  // Change grid line color
        },
        border: {
            color: 'rgba(255, 255, 255, 0)',  // Change axis line color
        }
    },
    x: {
        display: false
    }
}

const maingraphOptions = {
    responsive: true,  // Ensures the chart resizes with the window
    maintainAspectRatio: true,      // Ensures the aspect ratio isn't forced (useful for responsiveness)
    aspectRatio: 2,
    scales: graphScales
}

const subgraphOptions = {
    responsive: true,  // Ensures the chart resizes with the window
    maintainAspectRatio: true,      // Ensures the aspect ratio isn't forced (useful for responsiveness)
    aspectRatio: 1,
    scales: graphScales
}



window.onload = function() {
    var main = document.getElementById('main').getContext('2d');
    var myChart = new Chart(main, {
        type: "line",
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First Dataset',  // Label for the dataset
                data: [65, 59, 80, 81, 56, 55, 40],  // Data points
                borderColor: 'rgba(75, 192, 192, 1)',  // Line color
                backgroundColor: 'rgba(75, 192, 192, 1)',  // Fill color under the line
                tension: 0.25  // Curvature of the line
            }]
        },
        options: maingraphOptions
    });



    var main = document.getElementById('left').getContext('2d');
    var myChart = new Chart(left, {
        type: "line",
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First Dataset',  // Label for the dataset
                data: [65, 59, 80, 81, 56, 55, 40],  // Data points
                borderColor: 'rgba(75, 192, 192, 1)',  // Line color
                backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Fill color under the line
                tension: 0.1  // Curvature of the line
            }]
        },
        options: subgraphOptions
    });



    var main = document.getElementById('right').getContext('2d');
    var myChart = new Chart(right, {
        type: "line",
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First Dataset',  // Label for the dataset
                data: [65, 59, 80, 81, 56, 55, 40],  // Data points
                borderColor: 'rgba(75, 192, 192, 1)',  // Line color
                backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Fill color under the line
                tension: 0.1  // Curvature of the line
            }]
        },
        options: subgraphOptions
    });
    
};
