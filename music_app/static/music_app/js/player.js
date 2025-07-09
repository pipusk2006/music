function toggleFavVisual(el) {
    const albumId = el.dataset.albumId;
    const isFav = el.dataset.fav === 'true';

    const flash = el.querySelector('.flash');
    const check = el.querySelector('.checkmark');

    // Вспышка
    flash.classList.remove('flash-active');
    void flash.offsetWidth;
    flash.classList.add('flash-active');

    // После анимации — переключение состояния
    setTimeout(() => {
        const newFav = !isFav;
        el.dataset.fav = newFav.toString();
        check.classList.toggle('hidden', !newFav);

        // Отправка запроса
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
            console.log("Favorite status updated:", data.status);
        });
    }, 400);
}




