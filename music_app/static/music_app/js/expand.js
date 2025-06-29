let currentExpanded = null;

function toggleAlbum(index) {
  const allDetails = document.querySelectorAll('.album-details');
  const allCards = document.querySelectorAll('.album-card');

  if (currentExpanded !== null && currentExpanded !== index) {
    allDetails[currentExpanded].classList.add('hidden');
    allCards[currentExpanded].classList.remove('expanded');
  }

  const card = allCards[index];
  const details = allDetails[index];
  const isVisible = !details.classList.contains('hidden');

  if (isVisible) {
    details.classList.add('hidden');
    card.classList.remove('expanded');
    currentExpanded = null;
  } else {
    details.classList.remove('hidden');
    card.classList.add('expanded');
    currentExpanded = index;
  }
}
