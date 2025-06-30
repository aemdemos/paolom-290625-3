/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards3)'];
  const cardLinks = element.querySelectorAll(':scope > a.card-link');
  const rows = [headerRow];

  cardLinks.forEach((card) => {
    // Image (always first child div > img)
    let imgDiv = card.querySelector(':scope > div');
    let imgEl = imgDiv ? imgDiv.querySelector('img') : null;
    
    // Text content (second child div)
    let textDiv = card.querySelector(':scope > div.utility-padding-all-1rem');
    let textElements = [];
    if (textDiv) {
      // Tag (optional; wrapped in a <div> with class 'tag')
      let tag = textDiv.querySelector('.tag');
      if (tag) textElements.push(tag);
      // Heading (h3)
      let heading = textDiv.querySelector('h3');
      if (heading) textElements.push(heading);
      // Description (p)
      let desc = textDiv.querySelector('p');
      if (desc) textElements.push(desc);
    } else {
      textElements = null;
    }
    rows.push([imgEl, textElements]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
