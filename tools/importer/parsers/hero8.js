/* global WebImporter */
export default function parse(element, { document }) {
  // Find the first active tab pane, or fallback to the first pane if none active
  const panes = element.querySelectorAll('.w-tab-pane');
  const activePane = Array.from(panes).find(p => p.classList.contains('w--tab-active')) || panes[0];
  if (!activePane) return;

  // The content grid inside the active pane (contains image and all text elements)
  const grid = activePane.querySelector('.w-layout-grid');
  if (!grid) return;

  // Find the first image (for background image row)
  const img = grid.querySelector('img');

  // Gather all non-image elements and text nodes for the text cell
  const textElements = [];
  Array.from(grid.childNodes).forEach(node => {
    if (node.nodeType === 1 && node.tagName.toLowerCase() !== 'img') {
      // Element node that's not an image
      textElements.push(node);
    } else if (node.nodeType === 3 && node.textContent.trim() !== '') {
      // Text node with content
      const p = document.createElement('p');
      p.textContent = node.textContent.trim();
      textElements.push(p);
    }
  });

  // Prepare table rows
  const cells = [
    ['Hero (hero8)'],
    [img ? img : ''],
    [textElements.length > 0 ? textElements : ''],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
