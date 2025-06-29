let audio = new Audio();
let currentIndex = 0;
let trackList = [];

function playTrack(url, title, artist, cover) {
    audio.src = url;
    audio.play();

    document.getElementById("player").style.display = "flex";
    document.getElementById("player-title").textContent = title;
    document.getElementById("player-artist").textContent = artist;
    document.getElementById("player-cover").src = cover;
}

function stopTrack() {
    audio.pause();
    audio.currentTime = 0;
}

function nextTrack() {
    if (currentIndex < trackList.length - 1) {
        currentIndex++;
        const track = trackList[currentIndex];
        playTrack(track.url, track.title, track.artist, track.cover);
    }
}

function prevTrack() {
    if (currentIndex > 0) {
        currentIndex--;
        const track = trackList[currentIndex];
        playTrack(track.url, track.title, track.artist, track.cover);
    }
}
