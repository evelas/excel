// Pure func
// String.fromCharCode(65) = 'A'

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 31;

export function createTable(rowsCount = 10, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = generateColumns(colsCount, state.colState);
  // формируем ряд с шапкой
  rows.push(createRow('', cols, {}));
  // формируем остальные ряды
  for (let row = 0; row < rowsCount; row++) {
    rows.push(createRow(row + 1, generateCells(colsCount, row, state), state.rowState));
  }
  return rows.join('');
}

function generateColumns(colsCount, state) {
  return (
    new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(widthFrom(state))
      .map(toColumn)
      // .map((col, index) => {
      //   const width = getWidth(state, index);
      //   return toColumn(col, index, width);
      // })
      .join('')
  );
}

function getWidth(state, indexCol) {
  return (state[indexCol] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, indexRow) {
  return (state[indexRow] || DEFAULT_HEIGHT) + 'px';
}

function widthFrom(state) {
  return function (col, index) {
    const width = getWidth(state, index);
    return { col, index, width };
  };
}

function generateCells(colsCount, row, state) {
  return new Array(colsCount).fill('').map(toCell(row, state)).join('');
}

function createRow(rowIndex, content, state) {
  const rowResize = rowIndex ? '<div class="row-resize" data-resize="row"></div>' : '';
  const height = getHeight(state, rowIndex);
  return `
    <div 
      class="row"
      data-type="resizable"
      data-row="${rowIndex}"
      style="height: ${height}"
    >
      <div class="row-info">
       ${rowIndex}
       ${rowResize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toColumn({ col, index, width }) {
  return `
    <div 
      class="column"
      data-type="resizable"
      data-col="${index}"
      style="width: ${width}"
    >
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function toCell(row, state) {
  return function (_, col) {
    const width = getWidth(state.colState, col);
    const id = `${row}:${col}`;
    const data = state.dataState[id];
    return `
      <div 
        class="cell"
        contenteditable
        data-col="${col}"
        data-id="${id}" 
        data-type="cell"
        style="width: ${width}"
      >
        ${data || ''} 
      </div>
    `;
  };
}

// _ - placeholder, нам нужно его обозначить
// чтобы получить доступ до второго
// входящего значения - index
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}
