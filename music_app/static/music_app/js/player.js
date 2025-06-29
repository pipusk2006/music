let audio = document.getElementById("audio");
let progress = document.getElementById("progress");
let progressBar = document.getElementById("progress-bar");

function playTrack(title, artist, url, cover) {
  document.getElementById("player-title").innerText = title;
  document.getElementById("player-artist").innerText = artist;
  document.getElementById("player-cover").src = cover;

  audio.src = url;
  audio.play();
  document.getElementById("player").classList.remove("hidden");
}

function closePlayer() {
  audio.pause();
  document.getElementById("player").classList.add("hidden");
}

audio.ontimeupdate = () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = percent + "%";
};

progress.onclick = (e) => {
  const clickX = e.offsetX;
  const width = progress.clientWidth;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
};


