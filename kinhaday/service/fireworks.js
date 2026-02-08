document.addEventListener('DOMContentLoaded', function() {
    const colors = [
        '#FF0000', '#FF7300', '#FFFB00', '#48FF00', 
        '#00FFD5', '#002BFF', '#7A00FF', '#FF00C8'
    ];
    
    function createFirework(x, y) {
        const particles = window.innerWidth < 480 ? 30 : 60;
        const container = document.querySelector('.fireworks');
        
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const px = x + Math.cos(angle) * distance;
            const py = y + Math.sin(angle) * distance;
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.backgroundColor = color;
            particle.style.boxShadow = `0 0 10px ${color}`;
            
            container.appendChild(particle);
            
            const animation = particle.animate([
                {
                    transform: 'translate(0, 0) scale(0)',
                    opacity: 1
                },
                {
                    transform: `translate(${px - x}px, ${py - y}px) scale(1)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
            });
            
            animation.onfinish = () => {
                particle.remove();
            };
        }
    }
    
    function createInitialFireworks() {
        const positions = [
            { x: window.innerWidth * 0.2, y: window.innerHeight * 0.3 },
            { x: window.innerWidth * 0.8, y: window.innerHeight * 0.4 },
            { x: window.innerWidth * 0.5, y: window.innerHeight * 0.2 },
            { x: window.innerWidth * 0.3, y: window.innerHeight * 0.6 },
            { x: window.innerWidth * 0.7, y: window.innerHeight * 0.7 }
        ];
        
        positions.forEach(pos => {
            setTimeout(() => createFirework(pos.x, pos.y), Math.random() * 500);
        });
    }
    
    function startFireworks() {
        createInitialFireworks();

        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const x = Math.random() * (window.innerWidth - 100) + 50;
                const y = Math.random() * (window.innerHeight * 0.7) + 50;
                createFirework(x, y);
        }, i * 200);
        }
    }

    const intervalTime = window.innerWidth < 480 ? 1200 : 800;

    setInterval(() => {
        const x = Math.random() * (window.innerWidth - 100) + 50;
        const y = Math.random() * (window.innerHeight * 0.7) + 50;
        createFirework(x, y);
    }, intervalTime);
    
    startFireworks();
    
    document.addEventListener('click', function(e) {
        createFirework(e.clientX, e.clientY);
    });
});