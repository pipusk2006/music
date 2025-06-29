function toggleAlbum(index) {
  const allDetails = document.querySelectorAll('.album-details');
  const allCards = document.querySelectorAll('.album-card');

  allDetails.forEach((d, i) => {
    if (i !== index) d.classList.add('hidden');
  });

  allCards.forEach((c, i) => {
    if (i !== index) c.classList.remove('expanded');
  });

  const currentDetails = document.getElementById(`album-details-${index}`);
  const currentCard = allCards[index];

  const isExpanded = currentDetails.classList.contains('hidden') === false;

  if (isExpanded) {
    currentDetails.classList.add('hidden');
    currentCard.classList.remove('expanded');
  } else {
    currentDetails.classList.remove('hidden');
    currentCard.classList.add('expanded');
  }
}

