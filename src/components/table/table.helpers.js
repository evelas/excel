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
