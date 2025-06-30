/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (the columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Header row: exactly one cell, matching the example
  const headerRow = ['Columns (columns15)'];

  // Content row: one cell for each column
  const contentRow = columns;

  // Compose the table: single-cell header, multi-cell content row
  const cells = [headerRow, contentRow];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table block
  element.replaceWith(block);
}
