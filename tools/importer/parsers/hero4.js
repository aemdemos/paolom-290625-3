/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row - must match exactly as in example
  const headerRow = ['Hero (hero4)'];

  // 2. Second row: background image (first <img> in the element)
  const img = element.querySelector('img');
  const imageRow = [img ? img : ''];

  // 3. Third row: Heading, paragraph, and CTA (existing elements only)
  let contentCellContent = [];
  // Find the container that holds the text/cta (second grid div)
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  if (gridDivs.length > 1) {
    // The text container is the second grid child
    const textGrid = gridDivs[1];
    // It usually has another grid inside (with the actual h1/paragraph/button)
    const innerGrid = textGrid.querySelector('.w-layout-grid');
    if (innerGrid) {
      // Heading
      const heading = innerGrid.querySelector('h1');
      if (heading) contentCellContent.push(heading);
      // Paragraph (description)
      const paragraph = innerGrid.querySelector('p');
      if (paragraph) contentCellContent.push(paragraph);
      // Button group (may have CTA button)
      const buttonGroup = innerGrid.querySelector('.button-group');
      if (buttonGroup) {
        // Only append if there's at least one link
        const cta = buttonGroup.querySelector('a');
        if (cta) contentCellContent.push(cta);
      }
    }
  }
  // Defensive: if no content found, push an empty string
  if (contentCellContent.length === 0) contentCellContent = [''];
  const contentRow = [contentCellContent];

  // Combine into block table
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
