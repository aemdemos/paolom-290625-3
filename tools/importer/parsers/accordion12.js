/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Accordion'];

  // Find all direct accordion items
  const accordionItems = Array.from(element.querySelectorAll(':scope > .w-dropdown'));

  // Build rows: each row is [title, content]
  const rows = accordionItems.map((item) => {
    // Title cell
    let titleEl = null;
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      // Prefer direct .paragraph-lg if present
      titleEl = toggle.querySelector('.paragraph-lg') || toggle;
    }

    // Content cell
    let contentEl = null;
    const contentNav = item.querySelector('.w-dropdown-list');
    if (contentNav) {
      // Prefer inner .rich-text if present, else the innermost .utility-padding-all-1rem, else nav itself
      const inner = contentNav.querySelector('.rich-text') || contentNav.querySelector('.utility-padding-all-1rem') || contentNav;
      contentEl = inner;
    }

    return [titleEl, contentEl];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
