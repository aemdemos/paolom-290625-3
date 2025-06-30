/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all the direct children of the grid; each is a column
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Header: single column as per the markdown example
  const headerRow = ['Columns (columns11)'];
  // Content row: single cell containing an array of the column elements
  const contentRow = [columns];

  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
