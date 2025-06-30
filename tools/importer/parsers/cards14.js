/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Cards (cards14)'];
  const rows = [headerRow];

  // Find all card anchor children
  const cards = element.querySelectorAll(':scope > a');

  cards.forEach(card => {
    // IMAGE CELL
    // Find the first .utility-aspect-2x3 (image container)
    let imgElement = null;
    const imageDiv = card.querySelector('div.utility-aspect-2x3');
    if (imageDiv) {
      imgElement = imageDiv.querySelector('img');
    }

    // TEXT CELL
    const textContent = [];
    // Tag/date row (may contain .tag and .paragraph-sm)
    const tagDate = card.querySelector('.flex-horizontal');
    if (tagDate) textContent.push(tagDate);
    // Title (h3 or .h4-heading)
    const title = card.querySelector('h3, .h4-heading');
    if (title) textContent.push(title);
    // If there is any other content in the card (other than image/tagDate/title), include it as description
    // But in this HTML, there is no other explicit description, so nothing more to include

    // Add row to table
    rows.push([
      imgElement,
      textContent.length === 1 ? textContent[0] : textContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
