// expand.js

function toggleAlbum(index) {
  const allCards = document.querySelectorAll('.album-card');
  const allDetails = document.querySelectorAll('.album-details');

  allCards.forEach((card, i) => {
    const detail = allDetails[i];
    const isCurrent = i == index;
    
    card.classList.toggle('expanded', isCurrent);
    detail.classList.toggle('hidden', !isCurrent);
  });

  // Scroll to the expanded album
  const expanded = document.querySelector('.album-card.expanded');
  if (expanded) {
    expanded.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
} 





