const palavras = [
    "Inspiração", "Inteligente", "Dedicada", "Linda", "Engraçada",
    "Forte", "Determinada", "Convicta", "Autêntica", "Especial",
    "Confiável", "Cativante", "Única", "Suporte (melhor)", "Alegria",
    "Talentosa", "Divertida", "Persistente", "Responsável", "Destemida",
    "Maluca", "Encantadora", "Cheirosa", "Brava", "Gata",
    "Esforçada", "Eloquente", "Corajosa", "jubileueu", "Chata",
    "Trabalhadora", "Insubstituível", "Brilhante", "Competente", "Perfeita",
    "Madura", "Otaka", "Pedagoga", "Grande 💪🏿", "Vibrante",
    "Mulher", "Realista", "Sorriso", "Gamer", "Admirável",
    "Gentil", "Intensa", "Estilosa", "Calorosa", "Sincera",
    "Comunista", "Pitú", "Reservada", "Consciente", "Tenaz",
    "Honesta", "Animada", "tomate 🍅", "Importante", "Guerreira",
    "Chata", "Complexa", "Leitora", "Comunicativa", "Indescritível",
    "Carismática", "Empática", "Atenciosa", "Extraordinária", "Radiante",
    "Abençoada", "Educada", "Espontânea", "Marcante", "Encorajadora",
    "Impressionante", "Complicada", "Católica", "Indiana", "Beats",
    "Verdadeira", "Boa...", "Resolvida", "Incrível", "Sensata",
    "Diferente", "Chata", "Amiga", "São paulina", "Teimosa",
    "Fofoqueira", "Merecedora", "Doida", "Memórias", "Vivaz",
    "Segura", "Deslumbrante", "Espetacular", "Valiosa", "Eduarda Rebeca"
];

document.addEventListener("DOMContentLoaded", function() {
    const wordList = document.getElementById('wordList');
    
    for (let i = 0; i < 5; i++) {
        const wordItem = document.createElement('div');
        wordItem.className = 'word-item';
        wordList.appendChild(wordItem);
    }

    const wordItems = document.querySelectorAll('.word-item');
    let startIndex = 0; 
    
    function updatewords() {
        for (let i = 0; i < 5; i++) {
            const index = (startIndex + i) % palavras.length;
            wordItems[i].textContent = palavras[index];

            if (i == 2) {
                wordItems[i].className = 'word-item center';
            } else {
                wordItems[i].className = 'word-item';
            }
        }
    }

    function nextWords() {
        startIndex = (startIndex + 1) % palavras.length;
        updatewords();
    }

    function prevWords() {
        startIndex = (startIndex - 1 + palavras.length) % palavras.length;
        updatewords();
    }

    updatewords(); 

    setInterval(nextWords, 3000);

    let touchStartY = 0;
    let touchEndY = 0;
    let isScrolling = false;
    let wheelTimeout;
    let lastWheelTime = 0;

    wordList.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        isScrolling = false;
    }, { passive: true });

    wordList.addEventListener('touchmove', (e) => {
        if (!isScrolling && Math.abs(e.touches[0].clientY - touchStartY) > 10) {
            isScrolling = true;
            e.preventDefault(); 
        }
    }, { passive: false });

    wordList.addEventListener('touchend', (e) => {
        if (!isScrolling) return;
        
        touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > 30) { 
            if (diff > 0) {
                nextWords(); 
            } else {
                prevWords(); 
            }
        }
    });

    wordList.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        const now = Date.now();
        if (now - lastWheelTime < 200) return; // Debounce para evitar múltiplos disparos
        
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            if (Math.abs(e.deltaY) > 20) {
                if (e.deltaY > 0) {
                    nextWords();
                } else {
                    prevWords();
                }
                lastWheelTime = now;
            }
        }, 50);
    }, { passive: false });

    function createParticles() {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = 8 + Math.random() * 10 + 's';
            particle.style.background = `rgba(255, ${100 + Math.random() * 155}, ${100 + Math.random() * 155}, ${0.2 + Math.random() * 0.3})`;
            particlesContainer.appendChild(particle);
        }
    }

    createParticles();
});