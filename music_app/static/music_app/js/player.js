function playTrack(title, artist, url, cover) {
    const audio = document.getElementById("audio");
    const player = document.getElementById("player");
    
    console.log("Attempting to play:", url); // Для отладки
    
    // Проверяем доступность файла
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Audio file not found');
            
            document.getElementById("player-title").textContent = title;
            document.getElementById("player-artist").textContent = artist;
            document.getElementById("player-cover").src = cover;

            audio.src = url;
            return audio.play();
        })
        .then(() => {
            player.classList.remove("hidden");
        })
        .catch(error => {
            console.error("Playback error:", error);
            alert(`Ошибка загрузки трека: ${url}`);
        });
    
    // Останавливаем всплытие события
    if (event) event.stopPropagation();
}



