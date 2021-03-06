import { Page } from '../core/routing/Page';
import { createStore } from '@core/state/createStore';
import { debounce, storage } from '@core/utils';
import { rootReducer } from '../redux/rootReducer';
import { normalizeInitialState } from '../redux/initialState';
import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';

function storageName(param) {
  return 'excel:' + param;
}

class StateProcessor {
  constructor(client, delay = 300) {
    this.client = client;
    this.listen = debounce(this.listen.bind(this), delay);
  }

  // Сохраняет state в client
  listen(state) {
    this.client.save(state);
  }

  // Метод для получения state
  // в client находится другой new класс
  get() {
    return this.client.get();
  }
}

// отдельный клиент
// можно сделать клиент под сервер
class LocalStorageClient {
  constructor(params) {
    this.params = storageName(params);
  }

  // как только сохранится state
  // промис resolve
  save(state) {
    storage(this.params, state);
    return Promise.resolve();
  }

  get() {
    // return Promise.resolve(storage(this.params));
    return new Promise((resolve) => {
      setTimeout(() =>{
        resolve(storage(this.params));
      }, 2500);
    });
  }
}

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
