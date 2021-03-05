import { ExcelComponent } from '@core/ExcelComponent';
import * as action from './../../redux/actions/actions';
import { $ } from '@core/dom';
import { createHeader } from './header.template';
import { ActiveRoute } from '@core/routing/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  onInput(event) {
    const name = $(event.target).text();
    this.$dispatch(
        action.tableName({
          name,
        }),
    );
  }

  onClick(event) {
    const $target = $(event.target);

    if ($target.data.button === 'remove') {
      const decision = confirm('Вы действительно хотите удалить эту таблицу?');

      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param);
        ActiveRoute.navigate('');
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('');
    }
  }

  toHTML() {
    return createHeader(this.store.getState());
  }
}
