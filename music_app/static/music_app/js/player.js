function playTrack(title, artist, url, cover) {
    console.log(`Attempting to play: ${url}`);
    
    const player = document.querySelector('.music-player');
    const audio = document.querySelector('audio') || document.createElement('audio');
    
    if (!document.querySelector('audio')) {
        player.appendChild(audio);
    }
    
    audio.src = url;
    player.querySelector('.player-cover').src = cover;
    player.querySelector('.player-info h3').textContent = title;
    player.querySelector('.player-info p').textContent = artist;
    player.classList.remove('hidden');
    
    audio.play().catch(e => console.error('Playback failed:', e));
}



