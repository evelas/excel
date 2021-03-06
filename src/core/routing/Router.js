import { $ } from '@core/dom';
import { Loader } from '../../components/loader/loader';
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
    this.loader = new Loader();

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

  async changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }
    // добавляем loader
    this.$placeholder.clear().append(this.loader);
    console.log(this.$placeholder);
    // const Page = this.routes.excel;
    // const page = new Page();
    const Page = ActiveRoute.path.includes('excel')
                ? this.routes.excel
                : this.routes.dashboard;
    // создаем инстантс класса Page,
    // для доступ к getRoot и прочему
    this.page = new Page(ActiveRoute.param);

    const root = await this.page.getRoot();

    // чистим loader
    this.$placeholder.clear().append(root);
    this.page.afterRender();
  }
}
