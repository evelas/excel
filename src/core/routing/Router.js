import { $ } from '@core/dom';
import { ActiveRoute } from './ActiveRoute';
// import { ActiveRoute } from './ActiveRoute';
// import { Page } from '@core/routing/Page';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router');
    }
    this.$placeholder = $(selector);
    this.routes = routes;

    this.page = null;
    this.changePageHandler = this.changePageHandler.bind(this);
    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }

    this.$placeholder.clear();
    console.log(this.$placeholder);
    // const Page = this.routes.excel;
    // const page = new Page();
    const Page = ActiveRoute.path.includes('excel') ? this.routes.excel : this.routes.dashboard;
    // создаем инстантс класса Page,
    // для доступ к getRoot и прочему
    this.page = new Page(ActiveRoute.param);

    this.$placeholder.append(this.page.getRoot());
    this.page.afterRender();
  }
}
