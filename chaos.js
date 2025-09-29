// chaos.js


// Fonction pour afficher une notification
function afficherNotification(message, emoji) {
    const notification = document.createElement('div');
    notification.innerHTML = `${emoji} ${message}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-size: 14px;
        z-index: 9999;
        animation: slideInRight 0.5s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        max-width: 300px;
    `;

    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 4000);
}

// Fonction qui fait trembler la page comme un tremblement de terre
function tremblementDeTerre() {
    afficherNotification("Tremblement de terre en cours!", "🌍");

    let intensité = 0;
    const interval = setInterval(() => {
        document.body.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px) rotate(${Math.random() * 2 - 1}deg)`;
        intensité++;
        if (intensité > 20) {
            clearInterval(interval);
            document.body.style.transform = 'none';
            afficherNotification("Tremblement de terre terminé!", "✅");
        }
    }, 100);
}

function pluieDEmojis() {
    afficherNotification("Pluie d'emojis magique!", "🌧️");

    const emojis = ['🦄', '🍕', '🚀', '🎸', '🦆', '🎭', '🌈', '⚡', '🎪', '🦋', '🔥', '💎', '🎯', '🎪'];

    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.cssText = `
                position: fixed;
                top: -50px;
                left: ${Math.random() * window.innerWidth}px;
                font-size: ${Math.random() * 30 + 20}px;
                pointer-events: none;
                z-index: 9999;
                animation: fall ${Math.random() * 3 + 2}s linear forwards;
            `;

            document.body.appendChild(emoji);
            setTimeout(() => emoji.remove(), 5000);
        }, i * 200);
    }
}

function déclencherLeChaos() {
    console.log("🎪 BIENVENUE DANS LE CHAOS TOTAL! 🎪");

    setTimeout(pluieDEmojis, 1000);
    setTimeout(tremblementDeTerre, 7000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            top: 100vh;
            transform: rotate(360deg);
        }
    }

    @keyframes bounce {
        0%, 20%, 60%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        80% {
            transform: translateY(-5px);
        }
    }

    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes pop {
        0% {
            transform: translate(-50%, -50%) scale(0);
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;
document.head.appendChild(style);

// Démarrer le chaos automatiquement après 1 seconde
setTimeout(déclencherLeChaos, 1000);


console.log("🎭 Chaos.js est chargé et prêt à semer la pagaille! 🎭");