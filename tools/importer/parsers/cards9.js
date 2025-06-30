/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as per specs
  const headerRow = ['Cards (cards9)'];

  // Each child div is a card (img only, no text content in this HTML)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Each card: extract the <img>, put in first cell, leave second cell empty
  const rows = Array.from(cardDivs).map(cardDiv => {
    const img = cardDiv.querySelector('img');
    return [img, ''];
  });

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
