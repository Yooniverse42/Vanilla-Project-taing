import { getNode, getNodes } from '@/library/index';

const searchBar = getNode('.search__bar');
const searchInputs = getNodes('.search__bar__input, .search__bar__input2');

const toggleSearch = () => {
  const cHeader = getNode('c-header');
  const searchModal = cHeader.shadowRoot.querySelector('c-search');
  const buttonSearch = cHeader.shadowRoot.querySelector('.button_search_open');

  if (buttonSearch.classList.contains('button__cancel')) {
    searchModal.close();
  } else {
    searchModal.open();
  }
};
searchBar.addEventListener('click', toggleSearch);
searchInputs.forEach((input) => {
  input.addEventListener('keydown', (e) => {
    if (['Backspace', 'Tab', 'Escape', 'PageUp', 'PageDown'].includes(e.key))
      return;
    if (
      [
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'Home',
        'End',
        'Insert',
        'Delete',
      ].includes(e.key)
    )
      return;
    if (e.key.startsWith('F') && e.key.length <= 3) return;

    e.preventDefault();
    toggleSearch();
  });
});
