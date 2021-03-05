import { Router } from './core/routing/Router';
import { DashboardPage } from './pages/DashboardPage';
import { ExcelPage } from './pages/ExcelPage';
import './scss/app.scss';
new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
});
