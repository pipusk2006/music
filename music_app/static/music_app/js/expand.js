// expand.js

function toggleAlbum(index) {
  const allCards = document.querySelectorAll('.album-card');
  const allDetails = document.querySelectorAll('.album-details');

  allCards.forEach((card, i) => {
    if (i == index) {
      card.classList.toggle('expanded');
    } else {
      card.classList.remove('expanded');
    }
  });

  allDetails.forEach((detail, i) => {
    if (i == index) {
      detail.classList.toggle('hidden');
    } else {
      detail.classList.add('hidden');
    }
  });
}



