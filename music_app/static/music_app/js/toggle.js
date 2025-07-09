function toggleFavorite(icon) {
    const albumId = icon.dataset.albumId;

    fetch("/toggle_favorite/", {
        method: "POST",
        headers: {
            "X-CSRFToken": getCSRFToken(),
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "album_id=" + encodeURIComponent(albumId)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'added') {
            icon.src = STATIC_URLS.favOn;
            icon.dataset.fav = 'true';
        } else {
            icon.src = STATIC_URLS.favOff;
            icon.dataset.fav = 'false';
        }
    });
}

function getCSRFToken() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='));
    return cookieValue ? cookieValue.split('=')[1] : '';
}

// Глобальные пути для иконок (устанавливаются через Django)
const STATIC_URLS = {
    favOn: "",
    favOff: ""
};
