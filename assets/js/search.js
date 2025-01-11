// search.js

// Search functionality for the Library Page
const searchInput = document.getElementById('searchInput');
const pdfCards = document.querySelectorAll('.pdf-card');

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    pdfCards.forEach(card => {
      const title = card.querySelector('.card-title').textContent.toLowerCase();
      const description = card.querySelector('.card-text').textContent.toLowerCase();

      if (title.includes(query) || description.includes(query)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });

    // Show a message if no results are found
    const visibleCards = Array.from(pdfCards).filter(card => card.style.display !== 'none');
    const noResultsMessage = document.getElementById('noResultsMessage');

    if (noResultsMessage) {
      noResultsMessage.style.display = visibleCards.length === 0 ? 'block' : 'none';
    }
  });
}
