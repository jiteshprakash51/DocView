// viewer.js

// Initialize PDF.js library with online worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

// Get the PDF URL from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const pdfUrlFromParams = urlParams.get('url');
const pdfViewer = document.getElementById('pdf-viewer');

if (pdfUrlFromParams && pdfViewer) {
  (async () => {
    try {
      // Load the PDF document
      const loadingTask = pdfjsLib.getDocument(pdfUrlFromParams);
      const pdf = await loadingTask.promise;

      pdfViewer.innerHTML = ''; // Clear previous content

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.5 });

        // Create a canvas for each page
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        pdfViewer.appendChild(canvas);

        // Render the page on the canvas
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
} else {
  alert('No PDF URL specified.');
}
