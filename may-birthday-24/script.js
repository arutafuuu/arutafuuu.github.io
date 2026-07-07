document.addEventListener('DOMContentLoaded', () => {
    // State
    const audio = document.getElementById('bgMusic');
    let isMusicPlaying = false;
    let currentScene = 1;

    // Elements
    const scene1 = document.getElementById('scene1');
    const scene2 = document.getElementById('scene2');
    const scene3 = document.getElementById('scene3');
    const scene4 = document.getElementById('scene4');

    const btnStart = document.getElementById('btn-start');
    const btnNext1 = document.getElementById('btn-next-1');
    const btnNext2 = document.getElementById('btn-next-2');
    
    const muteToggle = document.getElementById('muteToggle');
    const iconMute = document.getElementById('icon-mute');
    const iconUnmute = document.getElementById('icon-unmute');

    const modal = document.getElementById('modal');
    const btnEasterEgg = document.getElementById('btn-easter-egg');
    const btnCloseModal = document.getElementById('close-modal');

    const text2 = "Sama seperti melodi lagu ini, setiap hari altap menjadi lebih indah sejak ada mayaa. Maya dengarkan sebentar yaaa...";
    const text3 = "Selamat ulang tahun ya manisss. Terima kasih yaaa sudah hadir dan membawa banyak cerita indah untuk maya sendiri dan bahkan untuk altap. Maap yaaa nda ada perayaan besar, cuma ada doa tulus semoga maya selalu sehat, bahagia, dan semua impian maya tercapai. Altap selalu ada di sini buat dukung mayaaa.";

    // Utility: Smooth Scene Transition
    function transitionScene(hideElement, showElement, callback) {
        hideElement.classList.remove('active');
        
        setTimeout(() => {
            hideElement.classList.add('hidden-scene');
            showElement.classList.remove('hidden-scene');
            
            // Allow display to update before opacity fades in
            setTimeout(() => {
                showElement.classList.add('active');
                if (callback) callback();
            }, 50);
        }, 1000); // Wait for fade-out
    }

    // Utility: Typewriter Effect
    function typeWriter(elementId, text, speed, callback) {
        const element = document.getElementById(elementId);
        element.innerHTML = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                if(callback) callback();
            }
        }
        
        // Small delay before starting typewriter
        setTimeout(type, 500);
    }

    // Audio Play Setup
    function playAudio() {
        if (!isMusicPlaying) {
            audio.volume = 0.5; // Start with half volume
            audio.play().then(() => {
                isMusicPlaying = true;
                muteToggle.classList.remove('hidden'); // Show mute button
            }).catch(e => console.log("Audio autoplay prevented by browser"));
        }
    }

    // Audio Mute Toggle
    muteToggle.addEventListener('click', () => {
        if (audio.muted) {
            audio.muted = false;
            iconUnmute.classList.remove('hidden');
            iconMute.classList.add('hidden');
        } else {
            audio.muted = true;
            iconUnmute.classList.add('hidden');
            iconMute.classList.remove('hidden');
        }
    });

    // Scene 1 -> 2
    btnStart.addEventListener('click', () => {
        playAudio();
        transitionScene(scene1, scene2, () => {
            // Callback when Scene 2 is active
            typeWriter('scene2-text', text2, 60, () => {
                // Show next button after typing
                btnNext1.style.animationDelay = "0s"; // override delay
                btnNext1.classList.add('fade-in-up');
                btnNext1.style.opacity = 1;
            });
        });
    });

    // Scene 2 -> 3
    btnNext1.addEventListener('click', () => {
        transitionScene(scene2, scene3, () => {
            typeWriter('scene3-text', text3, 50, () => {
                btnNext2.style.animationDelay = "0s";
                btnNext2.classList.add('fade-in-up');
                btnNext2.style.opacity = 1;
            });
        });
    });

    // Scene 3 -> 4
    btnNext2.addEventListener('click', () => {
        transitionScene(scene3, scene4, () => {
            startConfetti();
        });
    });

    // Modal logic
    btnEasterEgg.addEventListener('click', () => {
        modal.classList.remove('hidden-modal');
    });

    btnCloseModal.addEventListener('click', () => {
        modal.classList.add('hidden-modal');
    });

    // Confetti Effect
    function startConfetti() {
        const container = document.getElementById('confetti-container');
        const colors = ['#F2C6C2', '#D4E0D6', '#ffb6b9', '#fae3d9', '#bbded6', '#8ac6d1'];
        
        function createHeart() {
            const heart = document.createElement('div');
            heart.classList.add('confetti');
            
            // Randomize styling
            const size = Math.random() * 15 + 10; // 10px to 25px
            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.animationDuration = `${Math.random() * 3 + 2}s`; // 2s to 5s fall
            
            // Instead of pure color squares, let's use heart character or pure CSS
            heart.innerHTML = '❤️';
            heart.style.fontSize = `${size}px`;
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            heart.style.filter = `hue-rotate(${Math.random() * 40 - 20}deg)`; // slight color variation

            container.appendChild(heart);

            // Clean up
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }

        // Generate hearts continuously
        setInterval(createHeart, 300);
    }
});
