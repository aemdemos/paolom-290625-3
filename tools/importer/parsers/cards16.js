/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row as specified
  const headerRow = ['Cards (cards16)'];
  const rows = [headerRow];

  // Get all direct <a> elements (cards)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  cardLinks.forEach(card => {
    // Get card image (first <img> found)
    const img = card.querySelector('img');

    // Get the content wrapper - the first <div> after <img>
    // In this layout, the first <div> after <img> holds the text
    const contentDiv = card.querySelector('img + div');
    const textContent = [];
    if (contentDiv) {
      // Meta row: tag and read time (first child div with horizontal flex)
      const metaRow = contentDiv.querySelector('.flex-horizontal');
      if (metaRow) {
        // Tag is a div.tag > div
        const tagDiv = metaRow.querySelector('.tag > div');
        if (tagDiv) {
          const spanTag = document.createElement('span');
          spanTag.textContent = tagDiv.textContent.trim();
          spanTag.style.fontWeight = 'bold';
          textContent.push(spanTag);
          textContent.push(document.createTextNode(' '));
        }
        // Read time is .paragraph-sm.utility-margin-bottom-0
        const timeDiv = metaRow.querySelector('.paragraph-sm');
        if (timeDiv) {
          const spanTime = document.createElement('span');
          spanTime.textContent = timeDiv.textContent.trim();
          textContent.push(spanTime);
        }
        textContent.push(document.createElement('br'));
      }
      // Heading: h3 or .h4-heading
      const heading = contentDiv.querySelector('h3, .h4-heading');
      if (heading) {
        const strong = document.createElement('strong');
        strong.textContent = heading.textContent.trim();
        textContent.push(strong);
        textContent.push(document.createElement('br'));
      }
      // Description: <p>
      const desc = contentDiv.querySelector('p');
      if (desc) {
        // Use the actual node to preserve possible formatting
        textContent.push(desc);
        textContent.push(document.createElement('br'));
      }
      // CTA: a div with text 'Read' (case-insensitive)
      // There may be several <div>s; pick the one with textContent 'Read'
      const ctaDiv = Array.from(contentDiv.querySelectorAll('div')).find(d => d.textContent.trim().toLowerCase() === 'read');
      if (ctaDiv) {
        const ctaLink = document.createElement('a');
        ctaLink.href = card.href;
        ctaLink.textContent = 'Read';
        textContent.push(ctaLink);
      }
    }
    // Push this card row [image, text cell]
    rows.push([
      img,
      textContent
    ]);
  });

  // Create and replace with table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
