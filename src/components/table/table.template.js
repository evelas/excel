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
  for (let row = 0; row < rowsCount; row++) {
    rows.push(createRow(row + 1, generateCells(colsCount, row)));
  }
  return rows.join('');
}

function generateColumns(colsCount) {
  return new Array(colsCount).fill('').map(toChar).map(toColumn).join('');
}

function generateCells(colsCount, row) {
  return new Array(colsCount).fill('').map(toCell(row)).join('');
  // return new Array(colsCount)
  //   .fill('')
  //   .map((_, col) => toCell(row, col))
  //   .join('');
}

function createRow(rowIndex, content) {
  const rowResize = rowIndex ? '<div class="row-resize" data-resize="row"></div>' : '';
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
       ${rowIndex}
       ${rowResize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function toCell(row) {
  return function (_, col) {
    return `
      <div class="cell"
          contenteditable
          data-col="${col}"
          data-id="${row + 1}:${col + 1}" 
          data-type="cell"></div>
    `;
  };
}

// function toCell(row, col) {
//   return `
//       <div class="cell" contenteditable data-col="${col}" data-row="${row}" data-type="cell"></div>
//     `;
// }

// _ - placeholder, нам нужно его обозначить
// чтобы получить доступ до второго
// входящего значения - index
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}
