import { defaultTableName } from '../../constans';

export function createHeader({ tableName = defaultTableName }) {
  return `
    <input type="text" class="excel__header-input" value="${tableName}" />

    <div>
      <div class="excel__button">
        <i class="material-icons">delete</i>
      </div>

      <div class="excel__button">
        <i class="material-icons">exit_to_app</i>
      </div>
    </div>
  `;
}
