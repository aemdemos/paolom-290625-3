/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid - these are the columns
  const columns = Array.from(grid.children);
  const numCols = columns.length;

  // The header row should have exactly one cell, spanning all columns
  // We'll set the correct colspan
  const table = document.createElement('table');
  const trHeader = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Columns (columns18)';
  if (numCols > 1) th.setAttribute('colspan', numCols);
  trHeader.appendChild(th);
  table.appendChild(trHeader);

  // Create the columns row
  const tr = document.createElement('tr');
  columns.forEach(col => {
    const td = document.createElement('td');
    td.append(col);
    tr.appendChild(td);
  });
  table.appendChild(tr);

  element.replaceWith(table);
}
