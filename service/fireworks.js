document.addEventListener('DOMContentLoaded', function() {
    const colors = [
        '#FF0000', '#FF7300', '#FFFB00', '#48FF00', 
        '#00FFD5', '#002BFF', '#7A00FF', '#FF00C8'
    ];
    
    const isMobile = window.innerWidth < 768;
    const isSmallMobile = window.innerWidth < 480;
    
    const getParticleCount = () => {
        if (isSmallMobile) return 12;  
        if (isMobile) return 20;       
        return 40;                       
    };
    
    const getIntervalTime = () => {
        if (isSmallMobile) return 2500;  
        if (isMobile) return 2000;        
        return 1000;                       
    };
    
    let animationFrame;
    let particles = [];
    
    function createFirework(x, y) {
        const particleCount = getParticleCount();
        const container = document.querySelector('.fireworks');
        if (!container) return;
        
        const existingParticles = container.children.length;
        if (existingParticles > (isMobile ? 100 : 200)) {
            while (container.children.length > (isMobile ? 80 : 150)) {
                container.removeChild(container.firstChild);
            }
        }
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * (isMobile ? 60 : 100) + (isMobile ? 30 : 50);
            const px = x + Math.cos(angle) * distance;
            const py = y + Math.sin(angle) * distance;
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.backgroundColor = color;
            particle.style.boxShadow = `0 0 ${isMobile ? 5 : 10}px ${color}`;
            
            particle.style.willChange = 'transform, opacity';
            
            container.appendChild(particle);
            
            particle.style.transition = 'transform 1s cubic-bezier(0.1, 0.8, 0.2, 1), opacity 1s ease';
            
            particle.offsetHeight;
            
            particle.style.transform = `translate(${px - x}px, ${py - y}px) scale(1)`;
            particle.style.opacity = '0';
            
            // Remover após a animação
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 1000);
        }
    }
    
    function createInitialFireworks() {
        if (isMobile) {
            const positions = [
                { x: window.innerWidth * 0.3, y: window.innerHeight * 0.3 },
                { x: window.innerWidth * 0.7, y: window.innerHeight * 0.4 },
                { x: window.innerWidth * 0.5, y: window.innerHeight * 0.2 }
            ];
            
            positions.forEach((pos, index) => {
                setTimeout(() => createFirework(pos.x, pos.y), index * 200);
            });
        } else {
            const positions = [
                { x: window.innerWidth * 0.2, y: window.innerHeight * 0.3 },
                { x: window.innerWidth * 0.8, y: window.innerHeight * 0.4 },
                { x: window.innerWidth * 0.5, y: window.innerHeight * 0.2 },
                { x: window.innerWidth * 0.3, y: window.innerHeight * 0.6 },
                { x: window.innerWidth * 0.7, y: window.innerHeight * 0.7 }
            ];
            
            positions.forEach((pos, index) => {
                setTimeout(() => createFirework(pos.x, pos.y), index * 150);
            });
        }
    }
    
    function startFireworks() {
        createInitialFireworks();
        
        if (!isMobile) {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const x = Math.random() * (window.innerWidth - 100) + 50;
                    const y = Math.random() * (window.innerHeight * 0.7) + 50;
                    createFirework(x, y);
                }, i * 300);
            }
        }
    }
    
    let interval;
    
    function startAutoFireworks() {
        if (interval) clearInterval(interval);
        
        interval = setInterval(() => {
            if (document.hidden) return;
            
            const x = Math.random() * (window.innerWidth - (isMobile ? 50 : 100)) + (isMobile ? 25 : 50);
            const y = Math.random() * (window.innerHeight * 0.6) + (isMobile ? 30 : 50);
            createFirework(x, y);
        }, getIntervalTime());
    }
    
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (interval) clearInterval(interval);
            
            const container = document.querySelector('.fireworks');
            if (container) {
                container.innerHTML = '';
            }
        } else {
            startAutoFireworks();
        }
    });
    
    startFireworks();
    startAutoFireworks();
    
    let lastClickTime = 0;
    document.addEventListener('click', function(e) {
        const now = Date.now();
        const clickDelay = isMobile ? 300 : 100; 
        
        if (now - lastClickTime > clickDelay) {
            createFirework(e.clientX, e.clientY);
            lastClickTime = now;
        }
    });
    
    if (isMobile) {
        let lastTouchTime = 0;
        document.addEventListener('touchstart', function(e) {
            const now = Date.now();
            if (now - lastTouchTime > 500) {
                const touch = e.touches[0];
                createFirework(touch.clientX, touch.clientY);
                lastTouchTime = now;
            }
        }, { passive: true });
    }
    
    window.addEventListener('beforeunload', () => {
        if (interval) clearInterval(interval);
        if (animationFrame) cancelAnimationFrame(animationFrame);
    });
});