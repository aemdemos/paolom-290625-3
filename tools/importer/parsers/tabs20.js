/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Create the header row: one cell with block name
  const rows = [['Tabs (tabs20)']];

  // 2. For each tab, create a row: [tab label, tab content (empty for tab menus)]
  const tabLinks = Array.from(element.querySelectorAll(':scope > a'));
  tabLinks.forEach(tabLink => {
    // Tab label is in a child <div>, fallback to text if missing
    const labelDiv = tabLink.querySelector('div');
    const label = labelDiv ? labelDiv : tabLink.textContent.trim();
    rows.push([label, '']);
  });

  // 3. Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
