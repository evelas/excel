import { ExcelComponent } from '@core/ExcelComponent';
import * as action from './../../redux/actions/actions';
import { $ } from '@core/dom';
import { createHeader } from './header.template';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
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

  toHTML() {
    return createHeader(this.store.getState());
  }
}
