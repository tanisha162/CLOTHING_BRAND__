// Regression test for the size-guide measurement tables: the dresses
// chart dropped its UK/AU column (header and data present, no cell), so
// bust/waist/hip rendered one column to the left, and the handbags chart
// rendered a "Universal" US cell its headers have no column for, shifting
// every measurement one column to the right. A shopper reading the
// dresses chart would have read the bust range as a UK size.
// Run with: npx tsx src/components/SizeGuidePage.test.tsx
import assert from 'node:assert';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>');
(globalThis as any).window = dom.window;
(globalThis as any).document = dom.window.document;
Object.defineProperty(globalThis, 'navigator', {
  value: dom.window.navigator,
  configurable: true,
});
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

const React = await import('react');
const { act } = React;
const { createRoot } = await import('react-dom/client');
const { SizeGuidePage } = await import('./SizeGuidePage');

const container = document.getElementById('root')!;
const root = createRoot(container);
const noop = () => {};

act(() => {
  root.render(React.createElement(SizeGuidePage, { onNavigateToCollection: noop }));
});

const headers = () =>
  [...container.querySelectorAll('thead th')].map((t) => t.textContent?.trim());
const firstRowCells = () =>
  [...container.querySelectorAll('tbody tr')[0].querySelectorAll('td')].map(
    (td) => td.textContent?.trim()
  );
const clickTab = (label: string) =>
  act(() => {
    const btn = [...container.querySelectorAll('button')].find(
      (b) => b.textContent?.trim() === label
    );
    assert.ok(btn, `tab "${label}" should exist`);
    btn!.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
  });
// Every body row must have exactly one cell per header, and the values
// must sit under the header that names them.
const checkAlignment = (expectedHeaders: string[], expectedFirstRow: string[]) => {
  assert.deepEqual(headers(), expectedHeaders);
  assert.deepEqual(firstRowCells(), expectedFirstRow);
};

// Dresses (default tab): UK/AU column present with the UK range, bust
// under Bust — not shifted one column left.
checkAlignment(
  ['Size', 'US', 'UK/AU', 'Bust', 'Waist', 'Hip', 'Length', 'Quick Shop'],
  ['XS', '0 - 2', '4 - 6', '31 - 33"', '24 - 26"', '34 - 36"', '34"', 'Shop XS']
);

clickTab('👚 Tops & Tees');
checkAlignment(
  ['Size', 'US', 'Chest / Bust', 'Shoulder', 'Front Length', 'Sleeve', 'Quick Shop'],
  ['XS', '0 - 2', '32 - 34"', '14.5"', '24.0"', '7.0"', 'Shop XS']
);

clickTab('🧥 Outerwear & Coats');
checkAlignment(
  ['Size', 'US', 'Chest', 'Shoulder Width', 'Sleeve Length', 'Total Coat Length', 'Quick Shop'],
  ['XS', '0 - 2', '36 - 38"', '15.5"', '23.5"', '39.0"', 'Shop XS']
);

// Handbags: no US column, so no "Universal" cell — the length sits under
// Length / Width, not under a phantom column.
clickTab('👜 Handbags & Accessories');
checkAlignment(
  ['Bag Style', 'Length / Width', 'Height', 'Depth / Base', 'Handle / Strap Drop', 'Quick Shop'],
  ['Market Tote', '16.5"', '13.0"', '5.5"', '10.5" Drop', 'Shop Market Tote']
);

console.log('SizeGuidePage.test.tsx: all assertions passed');
