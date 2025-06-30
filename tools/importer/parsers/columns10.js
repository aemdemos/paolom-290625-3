/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid element containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid as column containers
  const columnContainers = Array.from(grid.children);

  // For each column, get the innermost .utility-aspect-2x3 (if present) or just the column container
  const columns = columnContainers.map(col => {
    const aspect = col.querySelector('.utility-aspect-2x3');
    if (aspect && aspect.children.length === 1) {
      // If there is an image inside, return the image element
      const img = aspect.querySelector('img');
      if (img) return img;
      return aspect;
    }
    // Otherwise, fallback to the column container
    return col;
  });

  // Build the table cells array
  // The first row must be a single cell header
  // The second row is the columns (multiple cells)
  const cells = [
    ['Columns (columns10)'],
    columns
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element in the DOM with the generated table
  element.replaceWith(block);
}
