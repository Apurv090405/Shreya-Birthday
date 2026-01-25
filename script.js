// Countdown timer functionality for January 29, 2026

// Target date: January 29, 2026 at midnight (local time)
const targetDate = new Date('2026-01-29T00:00:00').getTime();

// DOM elements - will be set when DOM is ready
let daysElement = null;
let hoursElement = null;
let minutesElement = null;
let secondsElement = null;
let countdownInterval = null;

/**
 * Formats time value to always show two digits
 * @param {number} value - The time value to format
 * @returns {string} - Formatted time string with leading zero if needed
 */
function formatTime(value) {
    if (value < 0) return '00';
    return value < 10 ? '0' + value : value.toString();
}

/**
 * Updates the countdown timer display
 */
function updateCountdown() {
    // Get elements if not already cached
    if (!daysElement) {
        daysElement = document.getElementById('days');
        hoursElement = document.getElementById('hours');
        minutesElement = document.getElementById('minutes');
        secondsElement = document.getElementById('seconds');
    }

    // Check if elements exist
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        console.log('Timer elements not found, retrying...');
        return;
    }

    const currentTime = new Date().getTime();
    const timeDifference = targetDate - currentTime;

    // Check if countdown has reached zero
    if (timeDifference <= 0) {
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        // Trigger party animation and celebration page
        if (!window.partyTriggered) {
            window.partyTriggered = true;
            triggerPartyAnimation();
        }
        return;
    }

    // Calculate time units
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Update DOM elements with formatted values
    daysElement.textContent = formatTime(days);
    hoursElement.textContent = formatTime(hours);
    minutesElement.textContent = formatTime(minutes);
    secondsElement.textContent = formatTime(seconds);
}

/**
 * Initializes the countdown timer
 */
function initializeCountdown() {
    // Try to update immediately
    updateCountdown();
    
    // If elements are not found, wait a bit and try again
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        setTimeout(function() {
            updateCountdown();
            // Start the interval
            if (!countdownInterval) {
                countdownInterval = setInterval(updateCountdown, 1000);
            }
        }, 100);
    } else {
        // Start the interval
        if (!countdownInterval) {
            countdownInterval = setInterval(updateCountdown, 1000);
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCountdown);
} else {
    // DOM is already loaded
    initializeCountdown();
}

// Fallback: Also try on window load
window.addEventListener('load', function() {
    if (!countdownInterval) {
        initializeCountdown();
    }
});

// Initialize Particles.js with galaxy star configuration
function initializeParticles() {
    if (typeof particlesJS === 'undefined') {
        // Retry if particles.js hasn't loaded yet
        setTimeout(initializeParticles, 100);
        return;
    }

    particlesJS('particles-js', {
        particles: {
            number: {
                value: window.innerWidth < 768 ? 80 : 150,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#d946ef', '#a855f7', '#ec4899', '#c084fc', '#e879f9', '#f0abfc']
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.6,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 2,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.5,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#d946ef',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: ['bubble', 'grab', 'repulse']
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 180,
                    line_linked: {
                        opacity: 0.6
                    }
                },
                bubble: {
                    distance: 200,
                    size: 6,
                    duration: 2,
                    opacity: 0.8,
                    speed: 3
                },
                repulse: {
                    distance: 150,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
}

// Initialize particles when DOM and library are ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(initializeParticles, 100);
    });
} else {
    setTimeout(initializeParticles, 100);
}

window.addEventListener('load', function() {
    setTimeout(initializeParticles, 100);
});

// Custom shape formation on mouse hover (heart, circle, star, etc.)
function createShapeFormation() {
    const particlesCanvas = document.querySelector('#particles-js canvas');
    if (!particlesCanvas) return;

    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;
    let shapeType = 'heart'; // Can be 'heart', 'circle', 'star', 'spiral'
    let shapeCounter = 0;

    particlesCanvas.addEventListener('mousemove', function(e) {
        const rect = particlesCanvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        isHovering = true;
        
        // Cycle through shapes every 3 seconds
        shapeCounter++;
        if (shapeCounter % 180 === 0) {
            const shapes = ['heart', 'circle', 'star', 'spiral'];
            shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        }
    });

    particlesCanvas.addEventListener('mouseleave', function() {
        isHovering = false;
    });

    // Create shape formation effect
    function formShape() {
        if (!isHovering || typeof pJSDom === 'undefined' || !pJSDom[0] || !pJSDom[0].pJS) return;

        const pJS = pJSDom[0].pJS;
        const particles = pJS.particles.array;
        const centerX = mouseX;
        const centerY = mouseY;
        const shapeSize = 80;

        particles.forEach(function(particle, index) {
            const dx = particle.x - centerX;
            const dy = particle.y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 250) {
                let targetX, targetY;
                const angle = (index / particles.length) * Math.PI * 2;
                const t = angle;

                switch(shapeType) {
                    case 'heart':
                        // Heart shape equation
                        targetX = centerX + shapeSize * Math.pow(Math.sin(t), 3);
                        targetY = centerY - shapeSize * (Math.cos(t) - 0.5 * Math.cos(2*t) - 0.2 * Math.cos(3*t) - 0.1 * Math.cos(4*t));
                        break;
                    case 'circle':
                        // Circle shape
                        targetX = centerX + shapeSize * Math.cos(t);
                        targetY = centerY + shapeSize * Math.sin(t);
                        break;
                    case 'star':
                        // Star shape (5-pointed)
                        const starRadius = shapeSize * (0.5 + 0.5 * Math.cos(5 * t));
                        targetX = centerX + starRadius * Math.cos(t);
                        targetY = centerY + starRadius * Math.sin(t);
                        break;
                    case 'spiral':
                        // Spiral shape
                        const spiralRadius = (distance / 250) * shapeSize;
                        targetX = centerX + spiralRadius * Math.cos(t * 3);
                        targetY = centerY + spiralRadius * Math.sin(t * 3);
                        break;
                    default:
                        targetX = centerX;
                        targetY = centerY;
                }

                // Smooth movement towards shape
                const forceX = (targetX - particle.x) * 0.02;
                const forceY = (targetY - particle.y) * 0.02;

                particle.vx += forceX;
                particle.vy += forceY;

                // Limit speed
                const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
                if (speed > 3) {
                    particle.vx = (particle.vx / speed) * 3;
                    particle.vy = (particle.vy / speed) * 3;
                }
            }
        });
    }

    // Animate shape formation
    setInterval(function() {
        if (isHovering) {
            formShape();
        }
    }, 16); // ~60fps
}

// Initialize shape formation after particles are loaded
setTimeout(function() {
    createShapeFormation();
}, 800);

// Dynamic background color changes
function initializeBackgroundColorChange() {
    const gradientElement = document.querySelector('.animated-gradient');
    if (!gradientElement) return;

    // Array of beautiful color combinations in rose pink and purple tones - matching image
    const colorSchemes = [
        ['#e9d5ff', '#f3e8ff', '#fce7f3', '#fecdd3'], // Original soft purple-pink (matching image)
        ['#f3e8ff', '#fce7f3', '#fecdd3', '#e9d5ff'], // Rotated version
        ['#fce7f3', '#fecdd3', '#e9d5ff', '#f3e8ff'], // Another rotation
        ['#f8bbd0', '#d1c4e9', '#f48fb1', '#ce93d8'], // Deeper pink-purple
        ['#f5c2e7', '#c5bae9', '#f8a5c2', '#e1bee7'], // Bright pink-lavender
        ['#ffb3d9', '#b39ddb', '#ff9ecb', '#ba68c8'], // Vibrant pink-purple
        ['#fce4ec', '#e1bee7', '#f8bbd0', '#d1c4e9'], // Light pink-lavender
        ['#f3e5f5', '#e8d5e3', '#f8c1d9', '#d7a3d3'], // Soft pastel mix
        ['#ffccdd', '#d4a5e8', '#ffb3d1', '#c8a2d8'], // Warm pink-purple
        ['#ffe0e6', '#e6d9f2', '#ffd1dc', '#dcc3e8']  // Very light pastel
    ];

    let currentSchemeIndex = 0;

    function changeBackgroundColor() {
        // Get random interval between 10-20 seconds
        const interval = Math.random() * 10000 + 10000; // 10000-20000ms (10-20 seconds)
        
        setTimeout(function() {
            // Move to next color scheme
            currentSchemeIndex = (currentSchemeIndex + 1) % colorSchemes.length;
            const newColors = colorSchemes[currentSchemeIndex];
            
            // Create new gradient
            const gradient = `linear-gradient(-45deg, ${newColors[0]}, ${newColors[1]}, ${newColors[2]}, ${newColors[3]})`;
            
            // Apply with smooth transition
            gradientElement.style.background = gradient;
            
            // Continue the cycle
            changeBackgroundColor();
        }, interval);
    }

    // Start the color change cycle
    changeBackgroundColor();
}

// Initialize background color changes when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeBackgroundColorChange);
} else {
    initializeBackgroundColorChange();
}

window.addEventListener('load', initializeBackgroundColorChange);

// Party animation and celebration page
function triggerPartyAnimation() {
    const partyContainer = document.getElementById('party-animation');
    const celebrationPage = document.getElementById('celebration-page');
    
    if (!partyContainer || !celebrationPage) return;

    // Create confetti
    createConfetti();
    
    // Show party animation
    partyContainer.classList.remove('hidden');
    
    // After 5 seconds, show celebration page
    setTimeout(function() {
        partyContainer.classList.add('hidden');
        celebrationPage.classList.remove('hidden');
        document.body.classList.add('celebration-mode');
        
        // Trigger paper blast effect (multiple bursts)
        createPaperBlast();
        
        // Second burst after 0.5 seconds
        setTimeout(function() {
            createPaperBlast();
        }, 500);
        
        // Third burst after 1 second
        setTimeout(function() {
            createPaperBlast();
        }, 1000);
        
        // Show background video after paper blast animation completes (after 3.5 seconds)
        setTimeout(function() {
            const celebrationVideo = document.querySelector('.celebration-video');
            if (celebrationVideo) {
                celebrationVideo.classList.remove('hidden-video');
                celebrationVideo.classList.add('show-video');
                // Ensure video plays
                celebrationVideo.play().catch(function(error) {
                    console.log('Video autoplay prevented:', error);
                });
                
                // Show button 10 seconds after video loads
                setTimeout(function() {
                    const celebrationButton = document.querySelector('.celebration-button');
                    if (celebrationButton) {
                        celebrationButton.classList.remove('hidden-button');
                        celebrationButton.classList.add('show-button');
                        
                        // Add click handler to redirect to cake page
                        celebrationButton.addEventListener('click', function() {
                            window.location.href = 'cake.html';
                        });
                    }
                }, 10000); // 10 seconds after video appears
            }
        }, 3500); // 3.5 seconds after celebration page appears (paper blast completes)
        
        // Show celebration text after paper blast effect (after 2.5 seconds)
        setTimeout(function() {
            const celebrationContent = document.querySelector('.celebration-content');
            if (celebrationContent) {
                celebrationContent.classList.remove('hidden-content');
                celebrationContent.classList.add('fade-in-up');
            }
        }, 2500);
        
        // Hide message after 5 seconds
        setTimeout(function() {
            const celebrationMessage = document.querySelector('.celebration-message');
            if (celebrationMessage) {
                celebrationMessage.classList.add('hide-message');
            }
        }, 5000); // 5 seconds
        
        // Move title to top after 10 seconds
        setTimeout(function() {
            const celebrationTitle = document.querySelector('.celebration-title');
            if (celebrationTitle) {
                celebrationTitle.classList.add('move-to-top');
            }
        }, 10000); // 10 seconds
        
        // Continue confetti on celebration page (stop after 15 seconds)
        const celebrationConfetti = document.getElementById('celebration-confetti');
        if (celebrationConfetti) {
            const confettiInterval = setInterval(function() {
                createConfettiForContainer(celebrationConfetti);
            }, 2000);
            
            // Stop confetti after 15 seconds
            setTimeout(function() {
                clearInterval(confettiInterval);
            }, 15000); // 15 seconds
        }
    }, 5000);
}

function createConfetti() {
    const partyContainer = document.getElementById('party-animation');
    if (!partyContainer) return;
    createConfettiForContainer(partyContainer);
}

function createConfettiForContainer(container) {
    if (!container) return;

    const colors = ['#ff1744', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#ff4081', '#f50057'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 10 + 5;
        const startX = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 0.5;
        
        confetti.style.left = startX + '%';
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.backgroundColor = color;
        confetti.style.animationDuration = duration + 's';
        confetti.style.animationDelay = delay + 's';
        
        container.appendChild(confetti);
        
        // Remove after animation
        setTimeout(function() {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, (duration + delay) * 1000);
    }
}

function createPaperBlast() {
    const celebrationPage = document.getElementById('celebration-page');
    if (!celebrationPage) return;

    const paperCount = 80;
    const colors = ['#d946ef', '#a855f7', '#ec4899', '#c084fc', '#e879f9', '#a78bfa', '#f0abfc', '#ddd6fe', '#fce7f3'];
    
    // Bottom left and bottom right starting positions
    const bottomLeftX = window.innerWidth * 0.1; // 10% from left
    const bottomRightX = window.innerWidth * 0.9; // 90% from left (10% from right)
    const startY = window.innerHeight * 0.95; // Near bottom (95% down)

    for (let i = 0; i < paperCount; i++) {
        const paper = document.createElement('div');
        paper.className = 'paper-piece';
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Split papers: half from bottom left, half from bottom right
        const isLeftSide = i < paperCount / 2;
        const startX = isLeftSide ? bottomLeftX : bottomRightX;
        
        // Angle for cross pattern
        // Bottom left → Up and to the right (diagonal up-right)
        // Bottom right → Up and to the left (diagonal up-left)
        let angle;
        if (isLeftSide) {
            // From bottom left: go up-right (around -45° with some spread)
            angle = -Math.PI / 4 + (Math.random() - 0.5) * Math.PI / 6; // -45° ± 15°
        } else {
            // From bottom right: go up-left (around -135° with some spread)
            angle = -Math.PI * 3 / 4 + (Math.random() - 0.5) * Math.PI / 6; // -135° ± 15°
        }
        
        const distance = Math.random() * 700 + 500; // Distance to travel upward
        const rotation = Math.random() * 360;
        const rotationSpeed = (Math.random() - 0.5) * 1080;
        const size = Math.random() * 25 + 8;
        const shape = Math.random();
        
        // Create different paper shapes
        if (shape < 0.3) {
            // Rectangle
            paper.style.borderRadius = '2px';
        } else if (shape < 0.6) {
            // Circle
            paper.style.borderRadius = '50%';
        } else {
            // Triangle-like (diamond)
            paper.style.borderRadius = '0';
        }
        
        // Calculate end position - going upward
        const deltaX = Math.cos(angle) * distance;
        const deltaY = Math.sin(angle) * distance; // This will be negative (upward)
        const endX = startX + deltaX;
        const endY = startY + deltaY;
        
        paper.style.left = startX + 'px';
        paper.style.top = startY + 'px';
        paper.style.width = size + 'px';
        paper.style.height = size + 'px';
        paper.style.backgroundColor = color;
        paper.style.boxShadow = `0 0 8px ${color}60, 0 0 15px ${color}30`;
        paper.style.opacity = '0.85';
        
        // Set CSS custom properties for animation
        paper.style.setProperty('--start-x', startX + 'px');
        paper.style.setProperty('--start-y', startY + 'px');
        paper.style.setProperty('--end-x', endX + 'px');
        paper.style.setProperty('--end-y', endY + 'px');
        paper.style.setProperty('--delta-x', deltaX + 'px');
        paper.style.setProperty('--delta-y', deltaY + 'px');
        paper.style.setProperty('--rotation', rotation + 'deg');
        paper.style.setProperty('--rotation-speed', rotationSpeed + 'deg');
        paper.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
        paper.style.animationDelay = '0s';
        
        celebrationPage.appendChild(paper);
        
        // Remove after animation
        setTimeout(function() {
            if (paper.parentNode) {
                paper.parentNode.removeChild(paper);
            }
        }, 4000);
    }
}

