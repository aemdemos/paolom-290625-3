/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero7)'];

  // Extract background images (the collage in the hero)
  // Images are under: header > div > div > div.ix-hero-scale-3x-to-1x > div.grid-layout.desktop-3-column > div.utility-position-relative > img
  let bgImages = [];
  const grid = element.querySelector('.ix-hero-scale-3x-to-1x .grid-layout.desktop-3-column');
  if (grid) {
    bgImages = Array.from(grid.querySelectorAll('img'));
  } else {
    // fallback: any images in the element
    bgImages = Array.from(element.querySelectorAll('img'));
  }
  let bgImageCell = '';
  if (bgImages.length === 1) {
    bgImageCell = bgImages[0];
  } else if (bgImages.length > 1) {
    bgImageCell = bgImages;
  }

  // Extract hero content (heading, subheading, CTA)
  let contentCell = '';
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentContainer) {
    const parts = [];
    const heading = contentContainer.querySelector('h1');
    if (heading) parts.push(heading);
    const subheading = contentContainer.querySelector('p');
    if (subheading) parts.push(subheading);
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) {
      // Only include direct <a> children (not the whole button group div)
      const links = Array.from(buttonGroup.querySelectorAll('a'));
      if (links.length) {
        const btnDiv = document.createElement('div');
        links.forEach(link => btnDiv.appendChild(link));
        parts.push(btnDiv);
      }
    }
    contentCell = parts.length > 1 ? parts : (parts[0] || '');
  }

  // Compose table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [bgImageCell],
    [contentCell]
  ], document);
  element.replaceWith(table);
}
