import { defaultTableName } from '../../constans';

export function createHeader({ tableName = defaultTableName }) {
  return `
    <input type="text" class="excel__header-input" value="${tableName}" />

    <div>
      <div class="excel__button"  data-button="remove">
        <i class="material-icons"  data-button="remove">delete</i>
      </div>

      <div class="excel__button" data-button="exit">
        <i class="material-icons" data-button="exit">exit_to_app</i>
      </div>
    </div>
  `;
}
