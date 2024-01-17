import $ from 'jquery';

export const init = () => {
  const goBackBtn = $('.coming-soon__btn-back');
  const listenerCb = (event) => {
    event.preventDefault(); // link
    // eslint-disable-next-line no-restricted-globals
    history.back();
  };

  if (goBackBtn && goBackBtn.length) {
    goBackBtn[0].addEventListener('click', listenerCb);
    window.addEventListener('beforeunload', () => {
      goBackBtn[0].removeEventListener('click', listenerCb);
    });
  }
}
