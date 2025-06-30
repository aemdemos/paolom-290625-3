/* global WebImporter */
export default function parse(element, { document }) {
  // Header row should match example exactly
  const headerRow = ['Hero (hero17)'];

  // Find the background image (img with class 'cover-image')
  let bgImg = null;
  const imgs = element.querySelectorAll('img');
  for (const img of imgs) {
    if (img.classList.contains('cover-image')) {
      bgImg = img;
      break;
    }
  }

  // 2nd row: background image if present, else empty string
  const imageRow = [bgImg || ''];

  // 3rd row: headline/title, subheading (if any), and call to action buttons
  // Per HTML structure, these are children under .container > .utility-margin-bottom-6rem
  let contentCell = '';
  const contentContainer = element.querySelector('.container');
  if (contentContainer) {
    const mainContent = contentContainer.querySelector('.utility-margin-bottom-6rem');
    if (mainContent) {
      contentCell = [mainContent];
    } else {
      // fallback: include whatever's in .container
      contentCell = [contentContainer];
    }
  }
  
  // Compose array for createTable
  const cells = [
    headerRow,
    imageRow,
    contentCell
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
