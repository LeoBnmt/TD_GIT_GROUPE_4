const CONFIG = {
    particles: {
        count: 80,
        speed: 0.3,
        size: { min: 1, max: 3 },
        colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe']
    },
    animations: {
        duration: 800,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
};

class ParticleSystem {
    constructor() {
        this.canvas = this.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        
        this.init();
        this.bindEvents();
        this.animate();
    }
    
    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particles-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.6;
        `;
        document.body.appendChild(canvas);
        return canvas;
    }
    
    init() {
        this.resize();
        
        for (let i = 0; i < CONFIG.particles.count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * CONFIG.particles.speed,
                vy: (Math.random() - 0.5) * CONFIG.particles.speed,
                size: Math.random() * (CONFIG.particles.size.max - CONFIG.particles.size.min) + CONFIG.particles.size.min,
                color: CONFIG.particles.colors[Math.floor(Math.random() * CONFIG.particles.colors.length)],
                opacity: Math.random() * 0.8 + 0.2,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02
            });
        }
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.rotation += particle.rotationSpeed;
            
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 80) {
                const force = (80 - distance) / 80;
                particle.x -= dx * force * 0.005;
                particle.y -= dy * force * 0.005;
            }
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            this.particles.slice(index + 1).forEach(otherParticle => {
                const dx2 = particle.x - otherParticle.x;
                const dy2 = particle.y - otherParticle.y;
                const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                
                if (distance2 < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = particle.color;
                    this.ctx.globalAlpha = 0.1 * (1 - distance2 / 100);
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            });
            
            this.ctx.save();
            this.ctx.translate(particle.x, particle.y);
            this.ctx.rotate(particle.rotation);
            this.ctx.beginPath();
            this.ctx.rect(-particle.size/2, -particle.size/2, particle.size, particle.size);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
            this.ctx.restore();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

class SimplifiedPageAnimator {
    constructor() {
        this.init();
        this.setupTypewriterEffect();
    }
    
    init() {
        const style = document.createElement('style');
        style.textContent = `
            body {
                background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe);
                background-size: 400% 400%;
                animation: gradientShift 15s ease infinite;
                overflow-x: hidden;
            }
            
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            .header h1 {
                font-size: 3.5rem;
                font-weight: 800;
                background: linear-gradient(45deg, #fff, #f0f0f0);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-shadow: 0 0 30px rgba(255,255,255,0.5);
                transform: translateY(50px);
                opacity: 0;
                animation: slideInUp 1s ease forwards 0.5s;
                cursor: pointer;
                transition: transform 0.3s ease;
            }
            
            .header h1:hover {
                transform: scale(1.05);
            }
            
            @keyframes slideInUp {
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            @media (max-width: 768px) {
                .header h1 { font-size: 2.5rem; }
            }
        `;
        document.head.appendChild(style);
    }
    
    setupTypewriterEffect() {
        const title = document.querySelector('.header h1');
        if (title) {
            const text = title.textContent;
            title.textContent = '';
            title.style.borderRight = '2px solid white';
            
            let index = 0;
            const typeWriter = () => {
                if (index < text.length) {
                    title.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, 100);
                } else {
                    setTimeout(() => {
                        title.style.borderRight = 'none';
                    }, 500);
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    }
}

class SimpleNotificationSystem {
    constructor() {
        this.container = this.createContainer();
    }
    
    createContainer() {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            pointer-events: none;
        `;
        document.body.appendChild(container);
        return container;
    }
    
    show(message, duration = 3000) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            color: #333;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            margin-bottom: 10px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            pointer-events: auto;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            font-weight: 600;
        `;
        
        toast.textContent = message;
        this.container.appendChild(toast);
        
        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(0)';
        });

        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
    new SimplifiedPageAnimator();
    const notifications = new SimpleNotificationSystem();
    
    let clickCount = 0;
    const title = document.querySelector('.header h1');
    
    if (title) {
        title.addEventListener('click', () => {
            clickCount++;
            title.style.transform = 'scale(0.95)';
            setTimeout(() => {
                title.style.transform = '';
            }, 150);
            
            if (clickCount === 5) {
                const isInverted = document.body.style.filter === 'invert(1)';
                document.body.style.filter = isInverted ? '' : 'invert(1)';
                document.body.style.transition = 'filter 0.5s ease';
                
                notifications.show('Mode ' + (isInverted ? 'clair' : 'sombre') + ' activé! 🎨');
                clickCount = 0;
            } else {
                title.style.textShadow = `0 0 ${30 + clickCount * 10}px rgba(255,255,255,${0.5 + clickCount * 0.1})`;
            }
        });
    }
});