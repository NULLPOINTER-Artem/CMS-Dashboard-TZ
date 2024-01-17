import $ from 'jquery';
import { supportsWebp } from "./modules/functions.js";
import { init as initTables } from './modules/tables.js';
import { init as initDashboardBtn } from './modules/dashboard-burger-btn.js';
import { init as initGoBackAction } from './modules/goBackAction.js';

$(() => {
  supportsWebp();
  initTables();
  initDashboardBtn();
  initGoBackAction();
});
