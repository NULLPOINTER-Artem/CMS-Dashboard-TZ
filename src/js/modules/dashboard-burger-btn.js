import $ from 'jquery';
import { outsideClick } from '../helpers/clickoutside.js';

export const init = () => {
  // burger btn
  const burgerBtn = $('.dashboard-menu-btn');
  // icon close
  const closeBtn = $('.dashboard-sidebar-menu__close');

  if (burgerBtn && burgerBtn.length) {
    const toggleMenu = () => {
      const sidebarMenu = $('.dashboard-sidebar-menu');

      if (sidebarMenu && sidebarMenu.length) {
        outsideClick(sidebarMenu[0], 'dashboard-sidebar-menu--open')
        sidebarMenu.toggleClass('dashboard-sidebar-menu--open');
      }
    };

    burgerBtn[0].addEventListener('click', toggleMenu);
    closeBtn[0].addEventListener('click', toggleMenu);
    window.addEventListener('beforeunload', () => {
      burgerBtn[0].removeEventListener('click', toggleMenu);
      closeBtn[0].removeEventListener('click', toggleMenu);
    });
  }
}
