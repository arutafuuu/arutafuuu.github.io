const container = document.getElementById('heart-container');

// Heart parametric equations
// t: angle, scale: size multiplier
function getHeartPosition(t, scale) {
    // Math formulas for a heart shape
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    
    // Y is inverted because in computer graphics Y goes down, but math Y goes up
    return { x: x * scale, y: -y * scale };
}

const numPaths = 4;        // Number of concentric heart paths (thickness)
const textsPerPath = 120;  // How many text elements per path
const texts = [];

// Base text string
const textContent = "i Love You";

// Create DOM elements
for (let p = 0; p < numPaths; p++) {
    // Each path has a slightly different scale to create a thick boundary
    // Scales: 11, 13, 15, 17
    const scale = 11 + p * 2;
    
    for (let i = 0; i < textsPerPath; i++) {
        const el = document.createElement('div');
        el.className = 'love-text';
        el.textContent = textContent;
        
        // Evenly distribute text along the path (0 to 2PI)
        const t = (i / textsPerPath) * Math.PI * 2;
        
        container.appendChild(el);
        
        texts.push({
            el: el,
            t: t,
            scale: scale,
            // Add a small random offset to t so they don't look perfectly rigid, 
            // but the request implies "berbaris membentuk love" and "tetap pada baris yang ada"
            // so we keep it mostly aligned.
        });
    }
}

// Animation loop
let lastTime = 0;
// Speed controls how fast they travel along the path (radians per millisecond)
const speed = 0.0003; 

function animate(time) {
    if (!lastTime) lastTime = time;
    const deltaTime = time - lastTime;
    lastTime = time;

    texts.forEach(item => {
        // Move along the path
        item.t += speed * deltaTime;
        
        // Keep t within 0 to 2PI
        if (item.t > Math.PI * 2) {
            item.t -= Math.PI * 2;
        }

        const pos = getHeartPosition(item.t, item.scale);
        
        // Translate to position and apply the -15deg tilt requested
        // Using -50%, -50% to center the text exactly on the path point
        item.el.style.transform = `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px) rotate(-15deg)`;
    });

    requestAnimationFrame(animate);
}

// Handle window resize for mobile responsiveness
function handleResize() {
    // Base design is roughly 550px wide, 400px high
    const baseWidth = 550;
    const baseHeight = 400;
    
    // Calculate scaling factor needed to fit on screen
    const scaleX = window.innerWidth / baseWidth;
    const scaleY = window.innerHeight / baseHeight;
    
    // Use the smaller scale to ensure it fits entirely on screen, max scale of 1.2
    let finalScale = Math.min(scaleX, scaleY, 1.2);
    
    // Add some margin for smaller screens so it doesn't touch the edges
    if (window.innerWidth < 600) {
        finalScale *= 0.9;
    }
    
    container.style.transform = `scale(${finalScale})`;
}

window.addEventListener('resize', handleResize);
handleResize(); // Initialize scale

// Start animation
requestAnimationFrame(animate);
