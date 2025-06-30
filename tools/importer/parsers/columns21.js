/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns container (the grid)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // The header row must be a single cell (matching the example exactly)
  const headerRow = ['Columns (columns21)'];
  // The second row contains all columns, one per cell
  const columnsRow = columns;

  const cells = [
    headerRow,
    columnsRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
