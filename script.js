// ============================
// PARTICLE STARFIELD CANVAS
// ============================
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
const PARTICLE_COUNT = 80;

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.flickerSpeed = Math.random() * 0.02 + 0.005;
        this.flickerPhase = Math.random() * Math.PI * 2;
        // Rose-gold and lavender hues
        const colors = [
            'rgba(244, 163, 200,',  // rose
            'rgba(192, 132, 252,',  // purple
            'rgba(167, 139, 250,',  // lavender
            'rgba(251, 207, 232,',  // light pink
            'rgba(196, 181, 253,',  // light purple
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update(time) {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity = (Math.sin(time * this.flickerSpeed + this.flickerPhase) + 1) / 2 * 0.6 + 0.1;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color} ${this.opacity})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `${this.color} 0.3)`;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
}

let time = 0;
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    time++;
    particles.forEach(p => {
        p.update(time);
        p.draw();
    });
    // Draw connections between nearby particles
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(192, 132, 252, ${0.08 * (1 - dist / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();


// ============================
// CURSOR + TRAIL
// ============================
const cursor = document.querySelector('.cursor');
const cursorTrail = document.querySelector('.cursor-trail');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX - 8 + 'px';
    cursor.style.top = mouseY - 8 + 'px';
});

// Smooth trail follow
function animateTrail() {
    const trailX = parseFloat(cursorTrail.style.left) || mouseX;
    const trailY = parseFloat(cursorTrail.style.top) || mouseY;
    cursorTrail.style.left = trailX + (mouseX - 20 - trailX) * 0.15 + 'px';
    cursorTrail.style.top = trailY + (mouseY - 20 - trailY) * 0.15 + 'px';
    requestAnimationFrame(animateTrail);
}
animateTrail();


// ============================
// TYPING EFFECT
// ============================
const greetingText = "Hey Swats! You light up every room you walk into — the world's a better place with you in it. 💫";
const greetingElement = document.querySelector('.greeting');
let charIndex = 0;

function typeGreeting() {
    if (charIndex < greetingText.length) {
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex++;
        // Vary typing speed for natural feel
        const delay = greetingText.charAt(charIndex - 1) === ' ' ? 60 : Math.random() * 50 + 40;
        setTimeout(typeGreeting, delay);
    }
}


// ============================
// FLOATING ELEMENTS (Enhanced)
// ============================
const floatingElements = ['💜', '✨', '🌸', '💫', '🦋', '⭐', '💗', '🌙'];
function createFloating() {
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = floatingElements[Math.floor(Math.random() * floatingElements.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = Math.random() * 100 + 'vh';
    element.style.fontSize = (Math.random() * 18 + 14) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -(Math.random() * 400 + 300),
        x: Math.random() * 120 - 60,
        rotation: Math.random() * 360,
        duration: Math.random() * 6 + 5,
        opacity: 0.7,
        ease: "none",
        onComplete: () => element.remove()
    });
}


// ============================
// CLICK SPARKLE BURST
// ============================
document.addEventListener('click', (e) => {
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = ['✨', '💫', '⭐', '🌟'][Math.floor(Math.random() * 4)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.fontSize = (Math.random() * 14 + 10) + 'px';
        sparkle.style.zIndex = '9999';
        document.body.appendChild(sparkle);

        gsap.to(sparkle, {
            x: (Math.random() - 0.5) * 150,
            y: (Math.random() - 0.5) * 150,
            opacity: 0,
            scale: 0,
            duration: 0.8 + Math.random() * 0.5,
            ease: "power2.out",
            onComplete: () => sparkle.remove()
        });
    }
});


// ============================
// INITIALIZE ANIMATIONS
// ============================
window.addEventListener('load', () => {
    // Badge fade-in
    gsap.to('.badge', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
    });

    // Title staggered reveal
    gsap.to('.title', {
        opacity: 1,
        duration: 0.1,
        delay: 0.5
    });

    gsap.from('.title-line', {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.6,
        ease: "power3.out"
    });

    gsap.from('.title-name', {
        opacity: 0,
        y: 60,
        scale: 0.8,
        duration: 1.2,
        delay: 0.9,
        ease: "elastic.out(1, 0.5)"
    });

    gsap.from('.title-emoji', {
        opacity: 0,
        scale: 0,
        duration: 0.8,
        delay: 1.5,
        ease: "back.out(3)"
    });

    // Button animation
    gsap.to('.cta-button', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1.8,
        ease: "power3.out"
    });

    // Start typing effect after title appears
    setTimeout(typeGreeting, 2000);

    // Create floating elements periodically
    setInterval(createFloating, 1200);
});


// ============================
// BUTTON HOVER + CLICK
// ============================
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.08,
            duration: 0.3,
            ease: "power2.out"
        });
        // Expand cursor on hover
        cursor.style.transform = 'scale(2)';
        cursorTrail.style.transform = 'scale(1.5)';
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.3
        });
        cursor.style.transform = 'scale(1)';
        cursorTrail.style.transform = 'scale(1)';
    });

    // Smooth page transition on click
    button.addEventListener('click', () => {
        // Collapse particles inward
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
                window.location.href = 'cause.html';
            }
        });
    });
});