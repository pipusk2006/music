// expand.js
function toggleAlbum(cardElement, index) {
  const isExpanding = cardElement.classList.contains('compact');
  const allCards = document.querySelectorAll('.album-card');
  
  // Сворачиваем все другие карточки
  allCards.forEach(card => {
    if (card !== cardElement && card.classList.contains('expanded')) {
      card.classList.remove('expanded');
      card.classList.add('compact');
      card.innerHTML = `
        <img src="${card.dataset.cover}" class="album-cover" 
             onerror="this.src='{% static 'music_app/images/default_cover.jpg' %}'">
        <div class="album-info">
          <h2>${card.dataset.title}</h2>
          <p>${card.dataset.artist}</p>
        </div>
      `;
    }
  });

  if (isExpanding) {
    // Получаем данные
    const tracks = cardElement.dataset.tracks.split(',').map(t => t.trim());
    const durations = (cardElement.dataset.duration || '').split(',').map(d => d.trim());
    
    // Создаем разметку
    cardElement.innerHTML = `
      <div class="album-cover-container">
        <img src="${cardElement.dataset.cover}" class="album-cover"
             onerror="this.src='{% static 'music_app/images/default_cover.jpg' %}'">
      </div>
      <div class="album-content">
        <div class="album-info">
          <h2>${cardElement.dataset.title}</h2>
          <p>${cardElement.dataset.artist}</p>
        </div>
        <p class="album-description">${cardElement.dataset.description}</p>
        <ul class="tracklist">
          ${tracks.map((track, i) => `
            <li data-track="${track.replace(/\s+/g, '_')}">
              <span class="track-name">${track}</span>
              <span class="duration">${durations[i] || ''}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
    
    // Вешаем обработчики на треки
    cardElement.querySelectorAll('.tracklist li').forEach(track => {
      track.addEventListener('click', function(e) {
        e.stopPropagation();
        const trackName = this.getAttribute('data-track');
        playTrack(
          this.querySelector('.track-name').textContent,
          cardElement.dataset.artist,
          `/static/music_app/records/${trackName}.mp3`,
          cardElement.dataset.cover
        );
      });
    });
    
    cardElement.classList.remove('compact');
    cardElement.classList.add('expanded');
  } else {
    // Сворачиваем текущую карточку
    cardElement.innerHTML = `
      <img src="${cardElement.dataset.cover}" class="album-cover"
           onerror="this.src='{% static 'music_app/images/default_cover.jpg' %}'">
      <div class="album-info">
        <h2>${cardElement.dataset.title}</h2>
        <p>${cardElement.dataset.artist}</p>
      </div>
    `;
    cardElement.classList.remove('expanded');
    cardElement.classList.add('compact');
  }
}









