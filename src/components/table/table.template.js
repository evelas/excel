// Pure func
// первый row немного отличается названиями колонок

// String.fromCharCode(65) = 'A'
const CODES = {
  A: 65,
  Z: 90,
};

export function createTable(rowsCount = 10) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount).fill('').map(toChar).map(toColumn).join('');
  // формируем шапку
  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow());
  }

  return rows.join('');
}

function createRow(content) {
  return `
    <div class="row">
      <div class="row-info"></div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toColumn(col) {
  return `
    <div class="column">${col}</div>
  `;
}

// _ - placeholder, нам нужно его обозначить
// чтобы получить доступ до второго
// входящего значения - index
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}
