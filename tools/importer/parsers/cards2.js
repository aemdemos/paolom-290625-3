/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row exactly as in the example
  const cells = [['Cards (cards2)']];

  // Get all card containers (direct children)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Get the image (if any)
    const img = cardDiv.querySelector('img');

    // For the second cell: check for any non-img content (e.g. headings, paragraphs, links, etc.)
    let textElements = [];
    Array.from(cardDiv.childNodes).forEach(node => {
      // Skip the image node
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'img') return;
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.textContent.trim()) textElements.push(node);
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        textElements.push(document.createTextNode(node.textContent));
      }
    });
    // If there is no text content, default to image alt text (if available)
    if (textElements.length === 0 && img && img.alt && img.alt.trim()) {
      textElements = [img.alt];
    }
    cells.push([img, textElements]);
  });

  // Build the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
