function toggleAlbum(cardElement) {
    const albumData = JSON.parse(cardElement.dataset.album);
    const isExpanded = cardElement.classList.contains('expanded');

    // Сворачиваем все другие карточки
    document.querySelectorAll('.album-card.expanded').forEach(card => {
        if (card !== cardElement) {
            card.classList.remove('expanded');
            card.classList.add('compact');
            resetCardContent(card);
        }
    });

    if (isExpanded) {
        // Сворачиваем текущую карточку
        cardElement.classList.remove('expanded');
        cardElement.classList.add('compact');
        resetCardContent(cardElement);
    } else {
        // Раскрываем карточку
        cardElement.classList.remove('compact');
        cardElement.classList.add('expanded');
        renderExpandedCard(cardElement, albumData);
    }
}

function resetCardContent(card) {
    const albumData = JSON.parse(card.dataset.album);
    card.innerHTML = `
        <img src="${albumData.cover}" 
             class="album-cover"
             onerror="this.src='{% static 'music_app/images/default_cover.jpg' %}'">
        <div class="album-info">
            <h2>${albumData.title}</h2>
            <p>${albumData.artist}</p>
        </div>
    `;
}

function renderExpandedCard(card, albumData) {
    const tracks = albumData.tracks_data || [];
    const durations = albumData.durations ? albumData.durations.split(',').map(d => d.trim()) : [];
    const isFavorite = albumData.is_favorite;

    card.innerHTML = `
        <div class="album-cover-container">
            <img src="${albumData.cover}" 
                 class="album-cover"
                 onerror="this.src='/static/music_app/images/default_cover.jpg'">
            
            <div class="fav-control" 
                 onclick="event.stopPropagation(); toggleFavVisual(this)" 
                 data-album-id="${albumData.id}" 
                 data-fav="${isFavorite}">
                <div class="disc-icon"></div>
                <div class="flash"></div>
                <svg class="checkmark ${isFavorite ? '' : 'hidden'}" viewBox="0 0 52 52">
                    <path d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
            </div>
        </div>

        <div class="album-content">
            <div class="album-info">
                <h2>${albumData.title}</h2>
                <p>${albumData.artist}</p>
            </div>
            <p class="album-description">${albumData.description}</p>
            <ul class="tracklist">
                ${tracks.map((trackObj, i) => `
                    <li onclick="event.stopPropagation(); playTrack(
                        '${trackObj.name}',
                        '${albumData.artist}',
                        '${trackObj.url}',
                        '${albumData.cover}'
                    )">
                        <span class="track-name">${trackObj.name}</span>
                        <span class="duration">${durations[i] || ''}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
}
