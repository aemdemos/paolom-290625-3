/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout: contains all columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all direct children (columns) of the grid
  const columns = Array.from(grid.children);
  // For each column, reference the actual existing node, not a clone
  // Take care to not move nodes from the DOM, so instead, reference them directly
  const rowCells = columns.map((col) => col);
  // Header row must match exactly: 'Columns (columns1)'
  const cells = [
    ['Columns (columns1)'],
    rowCells
  ];
  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(table);
}
