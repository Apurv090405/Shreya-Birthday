// Music Player JavaScript

(function() {
    'use strict';

    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.querySelector('.progress-bar');
    const progressFill = document.getElementById('progress-fill');
    const progressHandle = document.getElementById('progress-handle');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeValue = document.getElementById('volume-value');
    const currentSongTitle = document.getElementById('current-song-title');
    const currentSongArtist = document.getElementById('current-song-artist');
    const playSvg = playPauseBtn.querySelector('.play-svg');
    const pauseSvg = playPauseBtn.querySelector('.pause-svg');

    const songs = [
        {
            title: 'Happiest Birthday Shreya',
            artist: 'Special Birthday Song',
            src: 'images/Happiest_Birthday_Shreya.mp3'
        },
        {
            title: 'Happy Birthday Dost',
            artist: 'For My Best Friend',
            src: 'images/Shreya_Happy_BirthdayDost.mp3'
        },
        {
            title: 'My Greatest Gift',
            artist: 'A Special Message',
            src: 'images/Shreya_My_Greatest_Gift.mp3'
        },
        {
            title: 'Sunshine Shreya',
            artist: 'Bright & Beautiful',
            src: 'images/SunshineShreya.mp3'
        }
    ];

    let currentSongIndex = 0;
    let isPlaying = false;
    let isDragging = false;

    // Initialize
    function init() {
        // Set initial volume
        audioPlayer.volume = volumeSlider.value / 100;
        volumeValue.textContent = volumeSlider.value + '%';

        // Load first song
        loadSong(0);

        // Event listeners
        playPauseBtn.addEventListener('click', togglePlayPause);
        prevBtn.addEventListener('click', playPrevious);
        nextBtn.addEventListener('click', playNext);
        volumeSlider.addEventListener('input', updateVolume);
        progressBar.addEventListener('click', seek);
        progressBar.addEventListener('mousedown', startDragging);
        progressBar.addEventListener('touchstart', startDragging, { passive: true });
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('touchmove', drag, { passive: true });
        document.addEventListener('touchend', stopDragging);
        audioPlayer.addEventListener('timeupdate', updateProgress);
        audioPlayer.addEventListener('loadedmetadata', updateTotalTime);
        audioPlayer.addEventListener('ended', playNext);
        audioPlayer.addEventListener('error', handleError);

        // Song item click listeners
        document.querySelectorAll('.song-item').forEach((item, index) => {
            item.addEventListener('click', function(e) {
                if (!e.target.closest('.play-btn')) {
                    loadSong(index);
                    playSong();
                }
            });

            const playBtn = item.querySelector('.play-btn');
            playBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (currentSongIndex === index && isPlaying) {
                    pauseSong();
                } else {
                    loadSong(index);
                    playSong();
                }
            });
        });
    }

    // Load song
    function loadSong(index) {
        if (index < 0 || index >= songs.length) return;
        
        currentSongIndex = index;
        const song = songs[index];
        
        // Try to get src from data attribute first, then fallback to songs array
        const songItem = document.querySelector(`[data-song="${index}"]`);
        const dataSrc = songItem ? songItem.getAttribute('data-src') : null;
        const srcToUse = dataSrc || song.src;
        
        audioPlayer.src = srcToUse;
        
        // Update UI
        updateCurrentSongInfo();
        updateSongItems();
        
        // Load metadata
        audioPlayer.load();
        
        // Log for debugging
        console.log(`Loading song ${index + 1}: ${srcToUse}`);
    }

    // Play song
    function playSong() {
        audioPlayer.play().then(() => {
            isPlaying = true;
            updatePlayPauseButton();
        }).catch(error => {
            console.error('Error playing song:', error);
            handleError();
        });
    }

    // Pause song
    function pauseSong() {
        audioPlayer.pause();
        isPlaying = false;
        updatePlayPauseButton();
    }

    // Toggle play/pause
    function togglePlayPause() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }

    // Play previous
    function playPrevious() {
        const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(prevIndex);
        playSong();
    }

    // Play next
    function playNext() {
        const nextIndex = (currentSongIndex + 1) % songs.length;
        loadSong(nextIndex);
        playSong();
    }

    // Update progress
    function updateProgress() {
        if (isDragging) return;
        
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        
        if (duration) {
            const progress = (currentTime / duration) * 100;
            progressFill.style.width = progress + '%';
            progressHandle.style.left = progress + '%';
            currentTimeEl.textContent = formatTime(currentTime);
        }
    }

    // Update total time
    function updateTotalTime() {
        const duration = audioPlayer.duration;
        if (duration) {
            totalTimeEl.textContent = formatTime(duration);
            
            // Update song duration in list
            const songItem = document.querySelector(`[data-song="${currentSongIndex}"]`);
            if (songItem) {
                const durationEl = songItem.querySelector('.song-duration');
                if (durationEl) {
                    durationEl.textContent = formatTime(duration);
                }
            }
        }
    }

    // Format time
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return mins + ':' + (secs < 10 ? '0' : '') + secs;
    }

    // Update volume
    function updateVolume() {
        const volume = volumeSlider.value;
        audioPlayer.volume = volume / 100;
        volumeValue.textContent = volume + '%';
    }

    // Seek
    function seek(e) {
        const rect = progressBar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        const time = (percentage / 100) * audioPlayer.duration;
        
        if (!isNaN(time) && isFinite(time)) {
            audioPlayer.currentTime = time;
        }
    }

    // Drag progress - Touch support
    let startDragging = function(e) {
        const target = e.target || e.touches?.[0]?.target;
        if (target === progressBar || target === progressFill || target === progressHandle || 
            progressBar.contains(target)) {
            isDragging = true;
            const clientX = e.clientX || e.touches?.[0]?.clientX;
            if (clientX !== undefined) {
                seek({...e, clientX});
            }
        }
    };

    let drag = function(e) {
        if (isDragging) {
            const clientX = e.clientX || e.touches?.[0]?.clientX;
            if (clientX !== undefined) {
                seek({...e, clientX});
            }
        }
    };

    let stopDragging = function() {
        isDragging = false;
    };

    // Update play/pause button
    function updatePlayPauseButton() {
        if (isPlaying) {
            playSvg.classList.add('hidden');
            pauseSvg.classList.remove('hidden');
        } else {
            playSvg.classList.remove('hidden');
            pauseSvg.classList.add('hidden');
        }
    }

    // Update current song info
    function updateCurrentSongInfo() {
        const song = songs[currentSongIndex];
        currentSongTitle.textContent = song.title;
        currentSongArtist.textContent = song.artist;
    }

    // Update song items
    function updateSongItems() {
        document.querySelectorAll('.song-item').forEach((item, index) => {
            if (index === currentSongIndex) {
                item.classList.add('playing');
            } else {
                item.classList.remove('playing');
            }
        });
    }

    // Handle error
    function handleError(e) {
        console.error('Error loading audio:', e);
        console.error('Failed to load:', audioPlayer.src);
        currentSongTitle.textContent = 'Error loading song';
        currentSongArtist.textContent = 'Please try another song';
        
        // Try next song if available
        if (currentSongIndex < songs.length - 1) {
            setTimeout(() => {
                console.log('Trying next song...');
                playNext();
            }, 1000);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

