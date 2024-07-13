const ctx = document.getElementById('myChart').getContext('2d');

// Custom plugin to draw vertical line and tooltip for May 5, 2022
const verticalLinePlugin = {
    id: 'verticalLine',
    afterDraw: (chart) => {
        if (chart.tooltip._active && chart.tooltip._active.length) {
            const activePoint = chart.tooltip._active[0];
            const ctx = chart.ctx;
            const x = activePoint.element.x;
            const topY = chart.scales.y.top;
            const bottomY = chart.scales.y.bottom;

            // Draw vertical line
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, topY);
            ctx.lineTo(x, bottomY);
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.stroke();
            ctx.restore();
        }
    }
};

Chart.register(verticalLinePlugin);

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May 5, 2022', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'WPPOOL',
                data: [0, 20, 60, 50, 1556.9, 70, 60],
                borderColor: '#FF0000',
                radius:'100%',
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            },
            {
                label: 'Google',
                data: [0, 15, 35, 45, 877.7, 85, 90],
                borderColor: '#0000FF',
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            },
            {
                label: 'Microsoft',
                data: [0, 10, 25, 30, 193.3, 50, 55],
                borderColor: '#00FF00',
                backgroundColor: 'rgba(0, 255, 0, 0.2)',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            },
            {
                label: 'Twitter',
                data: [0, 5, 20, 15, 90.2, 30, 40],
                borderColor: '#800080',
                backgroundColor: 'rgba(128, 0, 128, 0.2)',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.raw}%`;
                    },
                    title: function(context) {
                        return `Date: ${context[0].label}`;
                    }
                }
            },
            legend: {
                display: true,
                position: 'bottom'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return value + '%';
                    }
                }
            },
            x: {
                beginAtZero: true
            }
        },
        elements: {
            point: {
                radius: 3,
                hoverRadius: 5
            },
            line: {
                borderWidth: 2
            }
        }
    }
});