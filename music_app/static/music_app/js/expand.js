function toggleAlbum(cardElement, index) {
  const isExpanding = cardElement.classList.contains('compact');
  const allCards = document.querySelectorAll('.album-card');
  
  // Сначала свернем все карточки
  allCards.forEach(card => {
    if (card !== cardElement) {
      card.classList.remove('expanded');
      card.classList.add('compact');
      card.querySelector('.expanded-content').classList.add('hidden');
    }
  });

  // Затем работаем с текущей карточкой
  if (isExpanding) {
    // Раскрываем карточку
    cardElement.classList.remove('compact');
    cardElement.classList.add('expanded');
    
    // Заполняем данные
    const expandedContent = cardElement.querySelector('.expanded-content');
    expandedContent.querySelector('.album-description').textContent = cardElement.dataset.description;
    
    const tracklist = expandedContent.querySelector('.tracklist');
    tracklist.innerHTML = '';
    
    try {
      const tracks = JSON.parse(cardElement.dataset.tracks);
      tracks.forEach(track => {
        const li = document.createElement('li');
        li.textContent = track;
        li.onclick = () => playTrack(
          track, 
          cardElement.dataset.artist, 
          `${track}.mp3`, 
          cardElement.dataset.cover
        );
        tracklist.appendChild(li);
      });
    } catch (e) {
      console.error('Error parsing tracks:', e);
    }
    
    expandedContent.classList.remove('hidden');
  } else {
    // Сворачиваем карточку
    cardElement.classList.remove('expanded');
    cardElement.classList.add('compact');
    cardElement.querySelector('.expanded-content').classList.add('hidden');
  }

  if (isExpanding) {
    cardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}









