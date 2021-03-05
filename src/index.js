// import { Excel } from '@/components/excel/Excel';
// import { Header } from '@/components/header/Header';
// import { Toolbar } from '@/components/toolbar/Toolbar';
// import { Formula } from '@/components/formula/Formula';
// import { Table } from '@/components/table/Table';
// import { createStore } from '@core/state/createStore';
// import { rootReducer } from './redux/rootReducer';
// import { debounce, storage } from './core/utils';
// import { initialState } from './redux/initialState';
import { Router } from './core/routing/Router';
import { DashboardPage } from './pages/DashboardPage';
import { ExcelPage } from './pages/ExcelPage';
import './scss/app.scss';
new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
});
