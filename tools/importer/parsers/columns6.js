/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two content columns
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  let mainCols = [];
  if (mainGrid) {
    mainCols = Array.from(mainGrid.querySelectorAll(':scope > div'));
  }

  // Find the image grid containing the two images
  const imageGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let imageCols = [];
  if (imageGrid) {
    imageCols = Array.from(imageGrid.querySelectorAll(':scope > div')).map(div => {
      const img = div.querySelector('img');
      return img ? img : '';
    });
  }

  // The number of columns is determined by the number of content columns (mainCols)
  const numColumns = Math.max(mainCols.length, imageCols.length);
  // The header row should have exactly one cell (spanning all columns via colspan rendered)
  const headerRow = ['Columns (columns6)'];
  
  // Compose rows: header, content, images
  const tableRows = [
    headerRow,
    mainCols,
    imageCols
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
