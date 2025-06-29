function toggleAlbum(index) {
  const allCards = document.querySelectorAll('.album-card');
  const allDetails = document.querySelectorAll('.album-expanded');

  allCards.forEach((card, i) => {
    const detail = allDetails[i];
    const isCurrent = i == index;

    // Toggle visibility and styles
    if (isCurrent) {
      card.classList.add('bg-gray-900', 'shadow-lg');
      card.classList.remove('bg-gray-800');
      detail.classList.remove('hidden');
    } else {
      card.classList.remove('bg-gray-900', 'shadow-lg');
      card.classList.add('bg-gray-800');
      detail.classList.add('hidden');
    }
  });

  // Smooth scroll to the expanded album
  const expandedCard = document.querySelector(`.album-card[data-index="${index}"]`);
  if (expandedCard) {
    expandedCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}





