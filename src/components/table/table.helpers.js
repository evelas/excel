import { range } from '@core/utils';

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return (event.target.dataset.type = 'cell');
}

export function matrix($cellId, $current) {
  const cellId = $cellId.id(true);
  const current = $current.id(true);
  const cols = range(current.col, cellId.col);
  const rows = range(current.row, cellId.row);

  return cols.reduce((acc, col) => {
    rows.forEach((row) => {
      acc.push(`${row}:${col}`);
    });
    return acc;
  }, []);
}

export function nextSelector(key, { col, row }) {
  const MIN_VALUE = 1;
  switch (key) {
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
      console.log(row);
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
      break;
  }
  return `[data-id="${row}:${col}"]`;
}
