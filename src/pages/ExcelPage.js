import { Page } from '../core/page/Page';
import { createStore } from '@core/state/createStore';
import { rootReducer } from '../redux/rootReducer';
import { normalizeInitialState } from '../redux/initialState';
import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { StateProcessor } from '../core/page/StateProcessor';
import { LocalStorageClient } from '../shared/LocalStorageClient';


export class ExcelPage extends Page {
  constructor(param) {
    super(param);
    this.storeSub = null;
    // передаем клиент localStorage
    // и выстраиваем взимодействие с приложением
    this.processor = new StateProcessor(new LocalStorageClient(this.params));
  }

  // getRoot возвращает промис,
  // так как async
  // значит в Router нужно это обработать
  // конкретнее в changePageHandler
  async getRoot() {
    // const params = this.params ? this.params : Date.now().toString();

    // const state = storage(storageName(params));

    // получения state может быть асинхронный,
    // если будет грузится с сервера
    const state = await this.processor.get();
    const initialState = normalizeInitialState(state);
    const store = createStore(rootReducer, initialState);

    // const stateListener = debounce((state) => {
    //   console.log('State:', state);
    //   storage(storageName(params), state);
    // }, 300);

    this.storeSub = store.subscribe(this.processor.listen);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }
  afterRender() {
    this.excel.init();
  }

  destrou() {
    this.destroy();
    this.storeSub.unsubscribe();
  }
}
