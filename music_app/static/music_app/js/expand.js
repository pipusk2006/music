function toggleAlbum(cardElement, index) {
  const isExpanding = cardElement.classList.contains('compact');
  const allCards = document.querySelectorAll('.album-card');
  
  // Сворачиваем все карточки
  allCards.forEach(card => {
    if (card !== cardElement) {
      card.classList.remove('expanded');
      card.classList.add('compact');
    }
  });

  // Работаем с текущей карточкой
  if (isExpanding) {
    // Создаем структуру для раскрытого состояния
    cardElement.innerHTML = `
      <div class="album-cover-container">
        <img src="${cardElement.dataset.cover}" alt="Обложка альбома" class="album-cover">
      </div>
      <div class="album-content">
        <div class="album-info">
          <h2>${cardElement.dataset.title}</h2>
          <p>${cardElement.dataset.artist}</p>
        </div>
        <p class="album-description">${cardElement.dataset.description}</p>
        <ul class="tracklist"></ul>
      </div>
    `;
    
    // Обрабатываем треки (разделяем строку по запятым)
    const tracks = cardElement.dataset.tracks.split(',').map(t => t.trim());
    const tracklist = cardElement.querySelector('.tracklist');
    
    tracks.forEach(track => {
      const li = document.createElement('li');
      li.textContent = track;
      li.onclick = (e) => {
        e.stopPropagation();
        playTrack(
          track, 
          cardElement.dataset.artist, 
          `${track}.mp3`, 
          cardElement.dataset.cover
        );
      };
      tracklist.appendChild(li);
    });
    
    cardElement.classList.remove('compact');
    cardElement.classList.add('expanded');
  } else {
    // Возвращаем компактное состояние
    cardElement.innerHTML = `
      <img src="${cardElement.dataset.cover}" alt="Обложка альбома" class="album-cover">
      <div class="album-info">
        <h2>${cardElement.dataset.title}</h2>
        <p>${cardElement.dataset.artist}</p>
      </div>
    `;
    cardElement.classList.remove('expanded');
    cardElement.classList.add('compact');
  }

  if (isExpanding) {
    cardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}









