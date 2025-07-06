function toggleAlbum(cardElement, index) {
  const isExpanding = cardElement.classList.contains('compact');
  
  if (isExpanding) {
    // Получаем данные из атрибутов
    const tracks = cardElement.dataset.tracks.split(',').map(t => t.trim());
    const durations = cardElement.dataset.durations?.split(',')?.map(d => d.trim()) || [];
    
    // Создаем разметку для раскрытого состояния
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
            <li onclick="event.stopPropagation(); playTrack('${track}', '${cardElement.dataset.artist}', 
                 '/static/music_app/records/${track.replace(/\s+/g, '_')}.mp3', 
                 '${cardElement.dataset.cover}')">
              <span>${track}</span>
              <span class="duration">${durations[i] || ''}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
    
    cardElement.classList.remove('compact');
    cardElement.classList.add('expanded');
  } else {
    // Возвращаем компактный вид
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









