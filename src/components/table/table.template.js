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
  const cols = new Array(colsCount)
    .fill('')
    .map((el, index) => {
      return String.fromCharCode(CODES.A + index);
    })
    .map((el) => createColumn(el))
    .join('');
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

function createColumn(col) {
  return `
    <div class="column">${col}</div>
  `;
}
