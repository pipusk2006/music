function toggleAlbum(index) {
  const details = document.getElementById(`album-details-${index}`);
  details.classList.toggle('hidden');
}

function playTrack(title, artist, url, cover) {
  document.getElementById("player-title").innerText = title;
  document.getElementById("player-artist").innerText = artist;
  document.getElementById("player-cover").src = cover;
  const audio = document.getElementById("audio");
  audio.src = url;
  document.getElementById("player").classList.remove("hidden");
  audio.play();
}

function closePlayer() {
  const audio = document.getElementById("audio");
  audio.pause();
  document.getElementById("player").classList.add("hidden");
}

