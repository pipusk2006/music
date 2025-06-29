function toggleAlbum(index) {
  const allCards = document.querySelectorAll('.album-card');
  const allExpanded = document.querySelectorAll('.album-expanded');

  allCards.forEach((card, i) => {
    const isCurrent = i === index;
    const isAlreadyExpanded = card.classList.contains('expanded');

    if (isCurrent && !isAlreadyExpanded) {
      card.classList.remove('compact');
      card.classList.add('expanded');
      allExpanded[i].classList.remove('hidden');
    } else {
      card.classList.remove('expanded');
      card.classList.add('compact');
      allExpanded[i].classList.add('hidden');
    }
  });

  // Прокрутка к текущей карточке (если она развёрнута)
  const currentCard = allCards[index];
  if (currentCard.classList.contains('expanded')) {
    currentCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}








