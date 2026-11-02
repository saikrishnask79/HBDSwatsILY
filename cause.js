// ============================
// PARTICLE STARFIELD (same vibe as index)
// ============================
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const starParticles = [];
for (let i = 0; i < 60; i++) {
    starParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        phase: Math.random() * Math.PI * 2,
        color: ['rgba(192,132,252,', 'rgba(244,163,200,', 'rgba(167,139,250,'][Math.floor(Math.random() * 3)]
    });
}

let frameTime = 0;
function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frameTime++;
    starParticles.forEach(s => {
        s.x += s.speedX;
        s.y += s.speedY;
        if (s.x < 0 || s.x > canvas.width) s.speedX *= -1;
        if (s.y < 0 || s.y > canvas.height) s.speedY *= -1;
        const opacity = (Math.sin(frameTime * 0.015 + s.phase) + 1) / 2 * 0.5 + 0.15;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}${opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `${s.color}0.3)`;
        ctx.fill();
        ctx.shadowBlur = 0;
    });
    requestAnimationFrame(drawStars);
}
drawStars();


// ============================
// REASONS DATABASE (Rephrased & Unique)
// ============================
const reasons = [
    { 
        text: "Your kindness isn't just rare — it's a whole vibe. Grateful doesn't even begin to cover how I feel about our bond. 💜", 
        emoji: "🌟",
        gif: "gif1.gif"
    },
    { 
        text: "May today overflow with the same love and laughter you pour into everyone else's life. You deserve it tenfold. 🌸", 
        emoji: "💜",
        gif: "gif2.gif"
    },
    { 
        text: "Wishing you a year full of plot twists you actually enjoy — success, peace, and everything your heart secretly hopes for. ✨", 
        emoji: "🦋",
        gif: "gif1.gif"
    },
    { 
        text: "Never change that energy of yours — the kind that makes everyone around you feel like they matter. Here's to you, superstar. 🥳", 
        emoji: "⭐",
        gif: "gif2.gif"
    }
];


// ============================
// STATE MANAGEMENT
// ============================
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Keep the next action after the growing list so the user can continue downward.
reasonsContainer.after(reasonCounter, shuffleButton);


// ============================
// CREATE REASON CARD
// ============================
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    
    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;
    
    card.appendChild(text);
    
    return card;
}


// ============================
// DISPLAY NEW REASON
// ============================
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);

        // Keep the card in the page even if the animation library is unavailable.
        if (window.gsap) {
            gsap.from(card, {
                opacity: 0,
                y: 50,
                scale: 0.95,
                duration: 0.6,
                ease: "back.out(1.5)"
            });
        }

        requestAnimationFrame(() => {
            shuffleButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        
        // Update counter with styled text
        reasonCounter.textContent = `✦ ${currentReasonIndex + 1} of ${reasons.length} reasons ✦`;
        
        currentReasonIndex++;

        // Check if we should transform the button
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.querySelector('.btn-inner').textContent = "Enter Our Memory Lane 💫";
                    shuffleButton.classList.add('story-mode');
                    shuffleButton.addEventListener('click', () => {
                        gsap.to('.container', {
                            scale: 0.9,
                            opacity: 0,
                            filter: 'blur(10px)',
                            duration: 0.8,
                            ease: "power3.in"
                        });
                        gsap.to('body', {
                            opacity: 0,
                            duration: 1.2,
                            delay: 0.3,
                            onComplete: () => {
                                window.location.href = 'last.html';
                            }
                        });
                    });
                }
            });
        }

        // Create floating elements
        createFloatingElement();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 600);
    }
}


// ============================
// BUTTON CLICK HANDLER
// ============================
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.92,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});


// ============================
// FLOATING ELEMENTS
// ============================
function createFloatingElement() {
    const elements = ['🌸', '✨', '💜', '🦋', '⭐', '💫', '🌙'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 18 + 12) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -(Math.random() * 400 + 300),
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 360,
        duration: Math.random() * 8 + 6,
        opacity: 0,
        onComplete: () => element.remove()
    });
}


// ============================
// CLICK SPARKLE BURST
// ============================
document.addEventListener('click', (e) => {
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = ['✨', '💫', '⭐'][Math.floor(Math.random() * 3)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.fontSize = (Math.random() * 12 + 10) + 'px';
        sparkle.style.zIndex = '9999';
        document.body.appendChild(sparkle);

        gsap.to(sparkle, {
            x: (Math.random() - 0.5) * 120,
            y: (Math.random() - 0.5) * 120,
            opacity: 0,
            scale: 0,
            duration: 0.7 + Math.random() * 0.4,
            ease: "power2.out",
            onComplete: () => sparkle.remove()
        });
    }
});


// ============================
// CUSTOM CURSOR
// ============================
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});


// ============================
// PERIODIC FLOATING ELEMENTS
// ============================
setInterval(createFloatingElement, 2500);
