// main.js

// Search functionality for Library Page
const searchInput = document.getElementById('searchInput');
const pdfCards = document.querySelectorAll('.pdf-card');

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    pdfCards.forEach(card => {
      const title = card.querySelector('.card-title').textContent.toLowerCase();
      card.style.display = title.includes(query) ? '' : 'none';
    });
  });
}

// Handle PDF View and Download on Library Page
const pdfLinks = document.querySelectorAll('.view-pdf, .download-pdf');

if (pdfLinks) {
  pdfLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      const pdfUrl = event.target.dataset.pdf;
      const action = event.target.classList.contains('download-pdf') ? 'download' : 'view';

      if (action === 'view') {
        window.location.href = `viewer.html?url=${encodeURIComponent(pdfUrl)}`;
      } else if (action === 'download') {
        window.open(pdfUrl, '_blank');
      }
    });
  });
}

// Extract and Render PDF in Viewer Page
const urlParams = new URLSearchParams(window.location.search);
const pdfUrlFromParams = urlParams.get('url');
const pdfViewer = document.getElementById('pdf-viewer');

if (pdfUrlFromParams && pdfViewer) {
  (async () => {
    try {
      const loadingTask = pdfjsLib.getDocument(pdfUrlFromParams);
      const pdf = await loadingTask.promise;

      pdfViewer.innerHTML = ''; // Clear previous content

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        pdfViewer.appendChild(canvas);

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
      }
    } catch (error) {
      alert('Failed to load PDF. Please check the URL.');
      console.error(error);
    }
  })();
}
