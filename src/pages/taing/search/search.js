import '@/layout/index';
import '@/styles/components/headerSearch.scss';
import '@/pages/taing/search/search.scss';
import '@/components/loading.js';
import { getNode, getNodes, renderSearchList } from '@/library/index';
import gsap from 'gsap';

document.addEventListener('DOMContentLoaded', async () => {
  const searchParams = new URLSearchParams(window.location.search);
  const searchValue = searchParams.get('search');

  if (searchValue) {
    const loading = getNode('c-loading');
    const searchListWrapper = getNode('.search__poster__list');
    const notSearchListContainer = getNode('.notSearch__poster__container');

    searchListWrapper.textContent = '';
    loading.show();

    await renderSearchList(
      'image',
      'main_poster',
      '.search__poster__list',
      searchValue
    );

    const searchPosters = getNodes('figure');

    const handleRecommendClick = (e) => {
      if (e.target.tagName === 'BUTTON') {
        const searchValue = e.target.textContent;
        location.href = `/src/pages/taing/search/?search=${encodeURIComponent(searchValue)}`;
      }
    };
    if (searchPosters.length === 0) {
      const template = `
      <article class="notSearch">
        <h3 class="notSearch__header">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
            <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
          </svg>
          <span>'${searchValue}' 검색 결과가 없습니다.</span>
        </h3>
        <p id="popularSearch">요즘 인기 있는 검색어를 추천해 드릴게요.</p>
        <ul class="recommend__list" aria-describedby="popularSearch">
          <li><button type="button" title="검색하기">재벌집 막내아들</button></li>
          <li><button type="button" title="검색하기">놀라운 토요일</button></li>
          <li><button type="button" title="검색하기">SHOW ME THE MONEY 11</button></li>
          <li><button type="button" title="검색하기">환혼: 빛과 그림자</button></li>
          <li><button type="button" title="검색하기">러브캐처</button></li>
          <li><button type="button" title="검색하기">우리들의 블루스</button></li>
          <li><button type="button" title="검색하기">블랙독</button></li>
          <li><button type="button" title="검색하기">술꾼도시여자들</button></li>
        </ul>
      </article>
      `;

      notSearchListContainer.insertAdjacentHTML('beforeend', template);

      const recommendList = getNode('.recommend__list');
      recommendList.addEventListener('click', handleRecommendClick);
    }

    searchPosters.forEach((poster) => {
      gsap.fromTo(poster, { scale: 0 }, { scale: 1 });
      poster.addEventListener('mouseenter', () => {
        gsap.to(poster, { y: -20 });
      });
      poster.addEventListener('mouseleave', () => {
        gsap.to(poster, { y: 0 });
      });
    });

    loading.hide();
  }
});

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
