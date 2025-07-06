function toggleAlbum(cardElement, index) {
  const isExpanding = cardElement.classList.contains('compact');
  
  // Сворачиваем все другие карточки
  document.querySelectorAll('.album-card.expanded').forEach(card => {
    if (card !== cardElement) {
      card.classList.remove('expanded');
      card.classList.add('compact');
    }
  });

  if (isExpanding) {
    // Создаем разметку для раскрытого состояния
    cardElement.innerHTML = `
      <div class="album-cover-container">
        <img src="${cardElement.dataset.cover}" class="album-cover">
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
    
    // Обрабатываем треки и длительности
    const tracks = cardElement.dataset.tracks.split(',').map(t => t.trim());
    const durations = cardElement.dataset.durations?.split(',')?.map(d => d.trim()) || [];
    
    const tracklist = cardElement.querySelector('.tracklist');
    
    tracks.forEach((track, i) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="track-name">${track}</span>
        <span class="duration">${durations[i] || ''}</span>
      `;
      
      // Правильный обработчик клика
      li.addEventListener('click', function(e) {
        // Проверяем, что кликнули именно по треку (а не по пустому месту)
        if (e.target.closest('li')) {
          playTrack(
            track,
            cardElement.dataset.artist,
            `${track}.mp3`,
            cardElement.dataset.cover
          );
        }
      });
      
      tracklist.appendChild(li);
    });
    
    cardElement.classList.remove('compact');
    cardElement.classList.add('expanded');
    cardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
  } else {
    // Возвращаем компактный вид
    cardElement.innerHTML = `
      <img src="${cardElement.dataset.cover}" class="album-cover">
      <div class="album-info">
        <h2>${cardElement.dataset.title}</h2>
        <p>${cardElement.dataset.artist}</p>
      </div>
    `;
    cardElement.classList.remove('expanded');
    cardElement.classList.add('compact');
  }
}









