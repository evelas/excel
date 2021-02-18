// Pure func
// String.fromCharCode(65) = 'A'

const CODES = {
  A: 65,
  Z: 90,
};

export function createTable(rowsCount = 10) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = generateColumns(colsCount);
  // формируем ряд с шапкой
  rows.push(createRow('', cols));
  // формируем остальные ряды
  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i + 1, generateCells(colsCount)));
  }
  return rows.join('');
}

function generateColumns(colsCount) {
  return new Array(colsCount).fill('').map(toChar).map(toColumn).join('');
}

function generateCells(colsCount) {
  return new Array(colsCount).fill('').map(toCell).join('');
}

function createRow(rowIndex, content) {
  const rowResize = rowIndex ? '<div class="row-resize" data-resize="row"></div>' : '';
  return `
    <div class="row">
      <div class="row-info">
       ${rowIndex}
       ${rowResize}
      </div>
      <div class="row-data" data-type="resizable">${content}</div>
    </div>
  `;
}

function toColumn(col) {
  return `
    <div class="column" data-type="resizable">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function toCell(content) {
  return `
    <div class="cell" contenteditable>${content}</div>
  `;
}

// _ - placeholder, нам нужно его обозначить
// чтобы получить доступ до второго
// входящего значения - index
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}
