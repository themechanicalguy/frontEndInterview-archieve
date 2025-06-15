/**
 * @param {any[]} items
 * @param {number[]} newOrder
 * @return {void}
 */
function sort(items, newOrder) {
  // reorder items inline
  for (let i = 0; i < newOrder.length; i++) {
    while (newOrder[i] !== i) {
      const to = newOrder[i];
      [newOrder[i], newOrder[to]] = [newOrder[to], newOrder[i]];
      [items[i], items[to]] = [items[to], items[i]];
    }
  }
}
