import { storage } from '../core/utils';

function toHTML(data) {
  const id = data.split(':')[1];
  const model = storage(data);

  return `
    <a href="#excel/${id}">
      <li class="dashboard__record">
        <span>${model.tableName}</span>
        <strong>
          ${new Date(model.openedDate).toLocaleDateString()}
          /
          ${new Date(model.openedDate).toLocaleTimeString()}
        </strong>
      </li>
    </a>
  `;
}

// excel: id from localStorage
function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue;
    }
    keys.push(key);
  }
  return keys;
}

export function createRecordsTable() {
  const keys = getAllKeys();
  console.log(keys.map(toHTML).join(''));
  Object.keys(keys).forEach((key) => {
    console.log(keys[key]);
  });

  if (!keys.length) {
    return `<p>Вы пока не создали ни одной таблицы</p>`;
  }

  return `
    <div class="dashboard__list-header"><span>Name</span><span>Date</span></div>
    <ul class="dashboard__list">
          ${keys.map(toHTML).join('')}
          
    </ul>`;
}
