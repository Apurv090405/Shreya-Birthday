// Cake Page JavaScript

(function() {
    'use strict';

    // Hide text loader and show cake page instantly after 10 seconds
    setTimeout(function() {
        const textLoader = document.getElementById('text-loader');
        const cakePage = document.getElementById('cake-page');
        
        if (textLoader) {
            textLoader.style.display = 'none';
        }
        
        if (cakePage) {
            cakePage.classList.remove('hidden');
            // Add class to html and body to hide default cursor
            document.documentElement.classList.add('cake-page-active');
            document.body.classList.add('cake-page-active');
            // Initialize knife cursor and cake cutting immediately when page appears
            initializeKnifeCursor();
            initializeCakeCutting();
        }
    }, 10000); // 10 seconds

    // Paper blast animation function (same as celebration page)
    function createPaperBlast() {
        const paperContainer = document.getElementById('cake-paper-animation');
        if (!paperContainer) return;

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
            let angle;
            if (isLeftSide) {
                // From bottom left: go up-right (around -45° with some spread)
                angle = -Math.PI / 4 + (Math.random() - 0.5) * Math.PI / 6; // -45° ± 15°
            } else {
                // From bottom right: go up-left (around -135° with some spread)
                angle = -Math.PI * 3 / 4 + (Math.random() - 0.5) * Math.PI / 6; // -135° ± 15°
            }
            
            const distance = Math.random() * 700 + 500;
            const rotation = Math.random() * 360;
            const rotationSpeed = (Math.random() - 0.5) * 1080;
            const size = Math.random() * 25 + 8;
            const shape = Math.random();
            
            // Create different paper shapes
            if (shape < 0.3) {
                paper.style.borderRadius = '2px';
            } else if (shape < 0.6) {
                paper.style.borderRadius = '50%';
            } else {
                paper.style.borderRadius = '0';
            }
            
            // Calculate end position - going upward
            const deltaX = Math.cos(angle) * distance;
            const deltaY = Math.sin(angle) * distance;
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
            
            paperContainer.appendChild(paper);
            
            // Remove after animation
            setTimeout(function() {
                if (paper.parentNode) {
                    paper.parentNode.removeChild(paper);
                }
            }, 4000);
        }
    }

    // Knife cursor functionality
    function initializeKnifeCursor() {
        const knifeCursor = document.getElementById('knife-cursor');
        const cakeImage = document.getElementById('cake-image');
        
        if (!knifeCursor) return;
        
        let isHovering = false;
        let mouseX = 0;
        let mouseY = 0;
        
        // Show knife cursor
        knifeCursor.classList.add('active');
        
        // Update knife position on mouse move
        function updateKnifePosition(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            knifeCursor.style.left = mouseX + 'px';
            knifeCursor.style.top = mouseY + 'px';
        }
        
        // Track mouse movement
        document.addEventListener('mousemove', function(e) {
            updateKnifePosition(e);
            
            // Check if hovering over cake
            if (cakeImage) {
                const rect = cakeImage.getBoundingClientRect();
                const isOverCake = (
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom
                );
                
                if (isOverCake && !isHovering) {
                    isHovering = true;
                    knifeCursor.classList.add('hovering');
                } else if (!isOverCake && isHovering) {
                    isHovering = false;
                    knifeCursor.classList.remove('hovering');
                }
            }
        });
        
        // Handle touch events for mobile
        document.addEventListener('touchmove', function(e) {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                mouseX = touch.clientX;
                mouseY = touch.clientY;
                knifeCursor.style.left = mouseX + 'px';
                knifeCursor.style.top = mouseY + 'px';
                
                // Check if touching cake
                if (cakeImage) {
                    const rect = cakeImage.getBoundingClientRect();
                    const isOverCake = (
                        touch.clientX >= rect.left &&
                        touch.clientX <= rect.right &&
                        touch.clientY >= rect.top &&
                        touch.clientY <= rect.bottom
                    );
                    
                    if (isOverCake && !isHovering) {
                        isHovering = true;
                        knifeCursor.classList.add('hovering');
                    } else if (!isOverCake && isHovering) {
                        isHovering = false;
                        knifeCursor.classList.remove('hovering');
                    }
                }
            }
        });
        
        // Hide cursor when mouse leaves window (but keep it active)
        document.addEventListener('mouseleave', function() {
            knifeCursor.style.opacity = '0.3'; // Make it semi-transparent instead of hiding
        });
        
        document.addEventListener('mouseenter', function() {
            knifeCursor.style.opacity = '1';
            knifeCursor.classList.add('active'); // Ensure it stays active
        });
        
        // Hide on touch devices when not touching
        let touchTimeout;
        document.addEventListener('touchstart', function() {
            knifeCursor.style.opacity = '1';
            clearTimeout(touchTimeout);
        });
        
        document.addEventListener('touchend', function() {
            touchTimeout = setTimeout(function() {
                knifeCursor.style.opacity = '0.5';
            }, 2000);
        });
        
        return knifeCursor;
    }

    // Cake cutting functionality
    function initializeCakeCutting() {
        const cakeImage = document.getElementById('cake-image');
        const cakeMessage = document.getElementById('cake-message');
        const knifeCursor = document.getElementById('knife-cursor');
        
        if (!cakeImage) return;
        
        let isCut = false;
        
        function cutCake() {
            if (!isCut) {
                // Animate knife cutting
                if (knifeCursor) {
                    knifeCursor.classList.add('cutting');
                    setTimeout(function() {
                        knifeCursor.classList.remove('cutting');
                    }, 300);
                }
                
                cakeImage.src = 'images/cut_cake.png';
                cakeImage.classList.add('cake-cut');
                isCut = true;
                
                // Hide the message text
                if (cakeMessage) {
                    cakeMessage.classList.add('hide-message');
                }
                
                // Show "Khai le cake" text
                const khaiLeText = document.getElementById('khai-le-text');
                if (khaiLeText) {
                    khaiLeText.classList.remove('hidden-text');
                    khaiLeText.classList.add('show-text');
                }
                
                // Trigger paper blast animation
                createPaperBlast();
                
                // Second burst after 0.5 seconds
                setTimeout(function() {
                    createPaperBlast();
                }, 500);
                
                // Third burst after 1 second
                setTimeout(function() {
                    createPaperBlast();
                }, 1000);
                
                // Ensure knife cursor stays visible after cutting
                if (knifeCursor) {
                    knifeCursor.classList.add('active');
                    knifeCursor.style.display = 'block';
                    knifeCursor.style.opacity = '1';
                }
                
                // After 8 seconds: remove cut cake image and show video
                setTimeout(function() {
                    // Hide cut cake image
                    if (cakeImage) {
                        cakeImage.style.opacity = '0';
                        cakeImage.style.transition = 'opacity 1s ease';
                        setTimeout(function() {
                            cakeImage.style.display = 'none';
                        }, 1000);
                    }
                    
                    // Hide "Khai le cake" text
                    if (khaiLeText) {
                        khaiLeText.classList.remove('show-text');
                        khaiLeText.classList.add('hide-text');
                    }
                    
                    // Ensure knife cursor remains visible
                    if (knifeCursor) {
                        knifeCursor.classList.add('active');
                        knifeCursor.style.display = 'block';
                        knifeCursor.style.opacity = '1';
                    }
                    
                    // Show background video
                    const cakeVideo = document.getElementById('cake-video');
                    if (cakeVideo) {
                        cakeVideo.classList.remove('hidden-video');
                        cakeVideo.classList.add('show-video');
                        // Ensure video plays
                        cakeVideo.play().catch(function(error) {
                            console.log('Video autoplay prevented:', error);
                        });
                        
                        // Show surprise section after video starts (after 3 seconds)
                        setTimeout(function() {
                            const surpriseSection = document.getElementById('surprise-section');
                            const surpriseButton = document.getElementById('surprise-button');
                            
                            // Ensure knife cursor remains visible
                            if (knifeCursor) {
                                knifeCursor.classList.add('active');
                                knifeCursor.style.display = 'block';
                                knifeCursor.style.opacity = '1';
                            }
                            
                            if (surpriseSection) {
                                surpriseSection.classList.remove('hidden-section');
                                surpriseSection.classList.add('show-section');
                            }
                            
                            // Add click handler to redirect to surprise page
                            if (surpriseButton) {
                                surpriseButton.addEventListener('click', function() {
                                    window.location.href = 'surprise.html';
                                });
                            }
                        }, 3000); // 3 seconds after video appears
                    }
                }, 8000); // 8 seconds after cake is cut
            }
        }
        
        // Add click event
        cakeImage.addEventListener('click', cutCake);
        
        // Add touch event for mobile
        cakeImage.addEventListener('touchstart', function(e) {
            e.preventDefault();
            cutCake();
        });
    }

    // Initialize after page loads (fallback)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            // Will be initialized when cake page appears
        });
    }

})();

