function toggleAlbum(index) {
  const allCards = document.querySelectorAll('.album-card');
  const allExpanded = document.querySelectorAll('.album-expanded');

  allCards.forEach((card, i) => {
    const isCurrent = i == index;

    if (isCurrent) {
      card.classList.add('expanded');
      allExpanded[i].classList.remove('hidden');
    } else {
      card.classList.remove('expanded');
      allExpanded[i].classList.add('hidden');
    }
  });

  // Scroll into view
  const currentCard = allCards[index];
  if (currentCard) {
    currentCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}






