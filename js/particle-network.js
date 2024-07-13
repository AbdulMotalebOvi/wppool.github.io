class ParticleNetwork extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML =  `
        <style>
            #particleCanvas {
                position: absolute;
                top: 50%;
                left: 40%;
                width: 500px;
                height: 500px;
                transform: translate(-40%, -50%);
                z-index: -1;
                opacity: 0.7;
            }
            .content-container {
                position: relative;
                z-index: 1;
                color: white;
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
          
                height: 80vh; /* Full height to center content vertically */
            }
            .index-header h2{
                font-size: 82px;
                letter-spacing:6px;
                height: 55px;
                margin-bottom: 50px;
            }
            .index-header p {
                font-size: 20px;
            }
        </style>
        <div class="content-container">
            <canvas id="particleCanvas"></canvas>
            <div class="index-header">
                <h2>The WPPOOL Index</h2>
                <p>Monitor the performance of emerging, publicly traded, financial technology companies</p>
            </div>
        </div>
    `;

        const canvas = shadow.getElementById('particleCanvas');
        const ctx = canvas.getContext('2d');

        canvas.width = 500;
        canvas.height = 500;

        const particlesArray = [];
        const numberOfParticles = 100;
        const colors = ['#FF1493', '#00BFFF', '#8A2BE2', '#FF4500', '#FF0000'];

        class Particle {
            constructor(x, y, size, speedX, speedY, color) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.speedX = speedX;
                this.speedY = speedY;
                this.color = color;
            }
            update() {
                if (this.x + this.size > canvas.width || this.x - this.size < 0) {
                    this.speedX = -this.speedX;
                }
                if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                    this.speedY = -this.speedY;
                }
                this.x += this.speedX;
                this.y += this.speedY;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }

        function init() {
            for (let i = 0; i < numberOfParticles; i++) {
                const size = Math.random() * 3 + 2;
                const x = Math.random() * (canvas.width - size * 2);
                const y = Math.random() * (canvas.height - size * 2);
                const speedX = Math.random() * 1 - 0.5;
                const speedY = Math.random() * 1 - 0.5;
                const color = colors[Math.floor(Math.random() * colors.length)];
                particlesArray.push(new Particle(x, y, size, speedX, speedY, color));
            }
        }

        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                        + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    if (distance < (canvas.width / 5) * (canvas.height / 5)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            connect();
        }

        init();
        animate();
    }
}

customElements.define('particle-network', ParticleNetwork);
