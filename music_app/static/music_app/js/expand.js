function toggleAlbum(index) {
  const allCards = document.querySelectorAll('.album-card');
  const allExpanded = document.querySelectorAll('.album-expanded');

  allCards.forEach((card, i) => {
    const isCurrent = i === index;

    if (isCurrent) {
      card.classList.remove('compact');
      card.classList.add('expanded');
      allExpanded[i].classList.remove('hidden');
    } else {
      card.classList.remove('expanded');
      card.classList.add('compact');
      allExpanded[i].classList.add('hidden');
    }
  });

  const currentCard = allCards[index];
  if (currentCard) {
    currentCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}









