document.addEventListener("DOMContentLoaded", function () {
    function getRandomValues(numValues, min, max) {
        let values = [];
        for (let i = 0; i < numValues; i++) {
            values.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return values;
    }

    const sensorData = {
        temperatura: getRandomValues(6, 20, 30),
        umidade: getRandomValues(6, 40, 60),
        movimento: getRandomValues(6, 0, 1),
        luminosidade: getRandomValues(6, 200, 1000),
        qualidadeDoAr: getRandomValues(6, 70, 100),
        nivelDeRuido: getRandomValues(6, 30, 70)
    };

    const sensorStatus = {
        temperatura: "Ativado",
        umidade: "Ativado",
        movimento: "Ativado",
        luminosidade: "Ativado",
        qualidadeDoAr: "Ativado",
        nivelDeRuido: "Ativado"
    };

    var ctx = document.getElementById('historicoGrafico').getContext('2d');
    var historicoGrafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
            datasets: [{
                label: 'Dados do Sensor',
                data: sensorData.temperatura, // Inicia com dados de temperatura
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

    document.getElementById('sensorSelect').addEventListener('change', function() {
        var selectedSensor = this.value;
        historicoGrafico.data.datasets[0].data = sensorData[selectedSensor];
        historicoGrafico.update();
    });

    document.querySelector('button').addEventListener('click', function() {
        var selectedSensor = document.getElementById('sensorSelect').value;
        sensorData[selectedSensor] = getRandomValues(6, 50, 100); // Atualiza os valores randômicos
        historicoGrafico.data.datasets[0].data = sensorData[selectedSensor];
        historicoGrafico.update();
    });

    window.alterarStatus = function(sensor) {
        const statusElement = document.getElementById(`status-${sensor}`);
        const currentStatus = sensorStatus[sensor];

        switch (currentStatus) {
            case "Ativado":
                sensorStatus[sensor] = "Desativado";
                break;
            case "Desativado":
                sensorStatus[sensor] = "Sleep";
                break;
            case "Sleep":
                sensorStatus[sensor] = "Ativado";
                break;
        }

        statusElement.textContent = `Status: ${sensorStatus[sensor]}`;
    };
});
