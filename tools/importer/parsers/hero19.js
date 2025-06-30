/* global WebImporter */
export default function parse(element, { document }) {
  // Find the currently active tab pane (the visible hero)
  const activePane = element.querySelector('.w-tab-pane.w--tab-active');
  let image = null;
  let contentElements = [];

  if (activePane) {
    // The inner grid contains both heading and image and any text content
    const grid = activePane.querySelector('.w-layout-grid');
    if (grid) {
      // Get the image element
      image = grid.querySelector('img');
      // Get all direct children except images, maintaining order
      Array.from(grid.children).forEach(child => {
        if (!(child.tagName && child.tagName.toLowerCase() === 'img')) {
          contentElements.push(child);
        }
      });
    }
  }

  // Compose the rows for the table
  const rows = [];
  rows.push(['Hero (hero19)']); // Header row EXACTLY as in the example
  rows.push([image]); // Image row
  rows.push([contentElements.length ? contentElements : '']); // All text content row; empty string if none

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
