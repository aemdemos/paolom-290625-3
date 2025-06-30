/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate tab links (each tab)
  const tabLinks = Array.from(element.querySelectorAll(':scope > a'));
  // Build the rows: first row is the header (1 cell), others are [Label, Content]
  const rows = [];
  rows.push(['Tabs (tabs13)']);
  tabLinks.forEach((a) => {
    let label = '';
    const labelDiv = a.querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = a.textContent.trim();
    }
    rows.push([label, '']);
  });
  // createTable will normally produce two columns for all rows after the header.
  // We need to fix the header row so it is a single cell that spans two columns.
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Fix the header cell colspan so it matches the markdown example
  const thead = table.querySelector('tr');
  if (thead && thead.children.length === 1 && rows.length > 1 && rows[1].length === 2) {
    thead.firstElementChild.setAttribute('colspan', '2');
  }
  element.replaceWith(table);
}
