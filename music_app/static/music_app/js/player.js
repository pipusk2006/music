let audio = new Audio();
let isPlaying = false;
let updateInterval;

function playTrack(title, artist, url, cover) {
    audio.pause();
    clearInterval(updateInterval);

    audio.src = url;
    document.querySelector('.player-cover').src = cover;
    document.getElementById('player-title').textContent = title;
    document.getElementById('player-artist').textContent = artist;

    document.getElementById('player').classList.remove('hidden');

    audio.play()
        .then(() => {
            isPlaying = true;
            document.getElementById('play-pause-icon').src = ICON_PAUSE;
            startProgressUpdate();
        })
        .catch(e => console.error('Playback failed:', e));
}

function togglePlay() {
    if (audio.src) {
        if (isPlaying) {
            audio.pause();
            document.getElementById('play-pause-icon').src = ICON_PLAY;
        } else {
            audio.play();
            document.getElementById('play-pause-icon').src = ICON_PAUSE;
            startProgressUpdate();
        }
        isPlaying = !isPlaying;
    }
}

function skipBackward() {
    audio.currentTime = Math.max(0, audio.currentTime - 10);
}

function skipForward() {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
}

function startProgressUpdate() {
    clearInterval(updateInterval);
    updateInterval = setInterval(updateProgress, 1000);
    updateProgress();
}

function updateProgress() {
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        document.getElementById('progress-bar').style.width = percent + '%';
        document.getElementById('current-time').textContent = formatTime(audio.currentTime);
        document.getElementById('total-time').textContent = formatTime(audio.duration);
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

document.querySelector('.progress-container').addEventListener('click', function(e) {
    if (audio.duration) {
        const clickX = e.offsetX;
        const width = this.clientWidth;
        audio.currentTime = (clickX / width) * audio.duration;
    }
});

audio.addEventListener('ended', function() {
    isPlaying = false;
    document.getElementById('play-pause-icon').src = ICON_PLAY;
    clearInterval(updateInterval);
});




