/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the Cards block
  const headerRow = ['Cards'];

  // Select all direct child card containers
  const cards = Array.from(element.querySelectorAll(':scope > div'));

  const rows = cards.map(card => {
    // The card content is the <p> element (description)
    const p = card.querySelector('p');
    // If <p> exists, use it. Otherwise, fallback to full card text.
    if (p) {
      // Reference the existing element (do not clone)
      return [p];
    }
    // If <p> is missing, fallback to a trimmed text node
    return [document.createTextNode(card.textContent.trim())];
  });

  // Compose the table structure
  const tableCells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new table
  element.replaceWith(block);
}
