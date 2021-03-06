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

export class ExcelPage extends Page {
  constructor(param) {
    super(param);

    this.storeSub = null;
  }
  getRoot() {
    const params = this.params ? this.params : Date.now().toString();
    console.log(this.params);
    const state = storage(storageName(params));
    const store = createStore(rootReducer, normalizeInitialState(state));

    const stateListener = debounce((state) => {
      console.log('State:', state);
      storage(storageName(params), state);
    }, 300);

    this.storeSub = store.subscribe(stateListener);

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
