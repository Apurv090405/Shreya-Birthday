// Surprise Page JavaScript

(function() {
    'use strict';

    // Open expanded card
    window.openCard = function(cardNumber) {
        const expandedCard = document.getElementById(`expanded-card-${cardNumber}`);
        if (expandedCard) {
            expandedCard.classList.remove('hidden-expanded');
            expandedCard.classList.add('show-expanded');
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }
    };

    // Close expanded card
    window.closeCard = function(cardNumber) {
        const expandedCard = document.getElementById(`expanded-card-${cardNumber}`);
        if (expandedCard) {
            expandedCard.classList.remove('show-expanded');
            expandedCard.classList.add('hidden-expanded');
            // Restore body scroll
            document.body.style.overflow = '';
        }
    };

    // Close card when clicking outside
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('expanded-card')) {
            const cardNumber = event.target.id.replace('expanded-card-', '');
            closeCard(cardNumber);
        }
    });

    // Initialize cards - show them in grid with animation
    function initializeCards() {
        const cards = document.querySelectorAll('.wish-card');
        cards.forEach(function(card, index) {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            
            // Animate cards appearing one by one
            setTimeout(function() {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, index * 150);
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCards);
    } else {
        initializeCards();
    }

})();

