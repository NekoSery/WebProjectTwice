// Global Audio Object
let currentSong = new Audio();
let isPlaying = false;
let currentTrackIndex = 0;
let currentAlbumTracks = [];
let isShuffle = false;
let isRepeat = false;

// DOM Elements
const masterPlay = document.getElementById('masterPlay');
const playerTitle = document.getElementById('player-title');
const playerArtist = document.getElementById('player-artist');
const playerImg = document.getElementById('player-img');
const sidebarImg = document.getElementById('sidebar-img');
const sidebarTitle = document.getElementById('sidebar-title');
const sidebarAlbum = document.getElementById('sidebar-album');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const progressHandle = document.getElementById('progressHandle');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volumeBar = document.getElementById('volumeBar');
const volumeProgress = document.getElementById('volumeProgress');
const volumeIcon = document.getElementById('volumeIcon');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const likeBtn = document.querySelector('.like-btn');
const shuffleBtn = document.querySelector('.shuffle-btn');
const repeatBtn = document.querySelector('.repeat-btn');

// Get all track items
const trackItems = document.querySelectorAll('.track-item');
const allTracks = Array.from(trackItems);

// Get all play-all buttons
const playAllBtns = document.querySelectorAll('.play-all-btn');

// Format time helper
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Update progress bar
function updateProgress() {
    if (currentSong.duration) {
        const percent = (currentSong.currentTime / currentSong.duration) * 100;
        progress.style.width = `${percent}%`;
        progressHandle.style.left = `${percent}%`;
        currentTimeEl.textContent = formatTime(currentSong.currentTime);
        durationEl.textContent = formatTime(currentSong.duration);
    }
}

// Update sidebar
function updateSidebar(songName, albumName, coverImg) {
    if (sidebarTitle) sidebarTitle.textContent = songName;
    if (sidebarAlbum) sidebarAlbum.textContent = albumName;
    if (sidebarImg) sidebarImg.src = coverImg;
}

// Load track
function loadTrack(trackElement) {
    const songFile = trackElement.getAttribute('data-audio');
    const songName = trackElement.getAttribute('data-song');
    const coverImg = trackElement.getAttribute('data-cover');
    const albumName = trackElement.getAttribute('data-album');

    // Update Player UI
    playerTitle.innerText = songName;
    playerArtist.innerText = albumName;
    playerImg.src = coverImg;
    
    // Update Sidebar
    updateSidebar(songName, albumName, coverImg);

    // Update Active States
    allTracks.forEach(t => {
        t.classList.remove('active', 'playing');
        t.querySelector('.track-play i').className = 'bx bx-play';
    });
    
    trackElement.classList.add('active', 'playing');
    trackElement.querySelector('.track-play i').className = 'bx bx-pause';

    // Find current album tracks
    const albumSection = trackElement.closest('.album-section');
    currentAlbumTracks = Array.from(albumSection.querySelectorAll('.track-item'));
    currentTrackIndex = currentAlbumTracks.indexOf(trackElement);

    // Load audio
    currentSong.src = songFile;
    
    if (isPlaying) {
        currentSong.play();
        updatePlayButton(true);
    }
}

// Toggle Play/Pause
function togglePlay() {
    if (!currentSong.src || currentSong.src === window.location.href) {
        // Play first track if nothing selected
        if (allTracks.length > 0) {
            isPlaying = true;
            loadTrack(allTracks[0]);
            currentSong.play();
        }
    } else if (currentSong.paused) {
        currentSong.play();
        isPlaying = true;
        const currentTrack = allTracks.find(t => t.getAttribute('data-song') === playerTitle.innerText);
        if (currentTrack) currentTrack.classList.add('playing');
    } else {
        currentSong.pause();
        isPlaying = false;
        const currentTrack = allTracks.find(t => t.getAttribute('data-song') === playerTitle.innerText);
        if (currentTrack) currentTrack.classList.remove('playing');
    }
    updatePlayButton(isPlaying);
}

// Update play button icon
function updatePlayButton(playing) {
    if (playing) {
        masterPlay.classList.replace('bx-play-circle', 'bx-pause-circle');
        playerImg.classList.add('playing');
    } else {
        masterPlay.classList.replace('bx-pause-circle', 'bx-play-circle');
        playerImg.classList.remove('playing');
    }
    
    // Update track item icons
    const currentTrack = allTracks.find(t => t.getAttribute('data-song') === playerTitle.innerText);
    if (currentTrack) {
        const icon = currentTrack.querySelector('.track-play i');
        if (playing) {
            icon.className = 'bx bx-pause';
        } else {
            icon.className = 'bx bx-play';
        }
    }
}

// Play next track
function playNext() {
    if (currentAlbumTracks.length === 0) return;
    
    let nextIndex;
    if (isShuffle) {
        nextIndex = Math.floor(Math.random() * currentAlbumTracks.length);
    } else {
        nextIndex = currentTrackIndex + 1;
        if (nextIndex >= currentAlbumTracks.length) nextIndex = 0;
    }
    
    isPlaying = true;
    loadTrack(currentAlbumTracks[nextIndex]);
    currentSong.play();
}

// Play previous track
function playPrev() {
    if (currentAlbumTracks.length === 0) return;
    
    let prevIndex = currentTrackIndex - 1;
    if (prevIndex < 0) prevIndex = currentAlbumTracks.length - 1;
    
    isPlaying = true;
    loadTrack(currentAlbumTracks[prevIndex]);
    currentSong.play();
}

// Click on track item
allTracks.forEach(track => {
    track.addEventListener('click', (e) => {
        // Don't trigger if clicking like button
        if (e.target.classList.contains('track-like') || e.target.closest('.track-like')) {
            e.target.classList.toggle('active');
            e.target.classList.toggle('bxs-heart');
            e.target.classList.toggle('bx-heart');
            return;
        }
        
        const isCurrentTrack = track.getAttribute('data-song') === playerTitle.innerText && currentSong.src !== "";
        
        if (isCurrentTrack && isPlaying) {
            togglePlay();
        } else {
            isPlaying = true;
            loadTrack(track);
            currentSong.play();
        }
    });
});

// Play All button
playAllBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const albumId = btn.getAttribute('data-album');
        const albumSection = document.querySelector(`[data-album-id="${albumId}"]`);
        const tracks = albumSection.querySelectorAll('.track-item');
        
        if (tracks.length > 0) {
            isPlaying = true;
            loadTrack(tracks[0]);
            currentSong.play();
            
            // Scroll to album
            albumSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Master play button
masterPlay.addEventListener('click', togglePlay);

// Previous/Next buttons
prevBtn.addEventListener('click', playPrev);
nextBtn.addEventListener('click', playNext);

// Progress bar interaction
let isDragging = false;

function seek(e) {
    const rect = progressBar.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (currentSong.duration) {
        currentSong.currentTime = percent * currentSong.duration;
    }
}

progressBar.addEventListener('click', seek);
progressBar.addEventListener('mousedown', (e) => {
    isDragging = true;
    seek(e);
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) seek(e);
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Volume control
function setVolume(e) {
    const rect = volumeBar.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    currentSong.volume = percent;
    volumeProgress.style.width = `${percent * 100}%`;
    
    updateVolumeIcon(percent);
}

function updateVolumeIcon(percent) {
    if (percent === 0) {
        volumeIcon.className = 'bx bx-volume-mute';
    } else if (percent < 0.3) {
        volumeIcon.className = 'bx bx-volume-low';
    } else if (percent < 0.7) {
        volumeIcon.className = 'bx bx-volume';
    } else {
        volumeIcon.className = 'bx bx-volume-full';
    }
}

volumeBar.addEventListener('click', setVolume);

// Volume icon click to mute/unmute
volumeIcon.addEventListener('click', () => {
    if (currentSong.volume > 0) {
        currentSong.dataset.prevVolume = currentSong.volume;
        currentSong.volume = 0;
        volumeProgress.style.width = '0%';
        volumeIcon.className = 'bx bx-volume-mute';
    } else {
        const prev = parseFloat(currentSong.dataset.prevVolume) || 0.7;
        currentSong.volume = prev;
        volumeProgress.style.width = `${prev * 100}%`;
        updateVolumeIcon(prev);
    }
});

// Audio events
currentSong.addEventListener('timeupdate', updateProgress);

currentSong.addEventListener('ended', () => {
    if (isRepeat) {
        currentSong.currentTime = 0;
        currentSong.play();
    } else {
        playNext();
    }
});

currentSong.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(currentSong.duration);
});

currentSong.addEventListener('play', () => {
    isPlaying = true;
    updatePlayButton(true);
});

currentSong.addEventListener('pause', () => {
    isPlaying = false;
    updatePlayButton(false);
});

// Like button
likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('active');
    if (likeBtn.classList.contains('active')) {
        likeBtn.classList.replace('bx-heart', 'bxs-heart');
    } else {
        likeBtn.classList.replace('bxs-heart', 'bx-heart');
    }
});

// Shuffle toggle
shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active');
});

// Repeat toggle
repeatBtn.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('active');
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        togglePlay();
    } else if (e.code === 'ArrowRight') {
        if (currentSong.duration) {
            currentSong.currentTime = Math.min(currentSong.duration, currentSong.currentTime + 5);
        }
    } else if (e.code === 'ArrowLeft') {
        currentSong.currentTime = Math.max(0, currentSong.currentTime - 5);
    } else if (e.code === 'ArrowUp') {
        e.preventDefault();
        currentSong.volume = Math.min(1, currentSong.volume + 0.1);
        volumeProgress.style.width = `${currentSong.volume * 100}%`;
        updateVolumeIcon(currentSong.volume);
    } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        currentSong.volume = Math.max(0, currentSong.volume - 0.1);
        volumeProgress.style.width = `${currentSong.volume * 100}%`;
        updateVolumeIcon(currentSong.volume);
    }
});

// Initialize
currentSong.volume = 0.7;
volumeProgress.style.width = '70%';

// Check for hash in URL to scroll to album
if (window.location.hash) {
    const albumId = window.location.hash.substring(1);
    const albumSection = document.querySelector(`[data-album-id="${albumId}"]`);
    if (albumSection) {
        setTimeout(() => {
            albumSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

console.log("🎵 TWICE Discography Player Loaded!");
console.log("💿 Albums: With YOU-th, Ready To Be, Between 1&2, Formula of Love, Eyes Wide Open");
console.log("⌨️ Keyboard: Space (Play/Pause), Arrows (Seek/Volume)");