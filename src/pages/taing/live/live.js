import '@/layout/index';
import '@/pages/taing/common/searchBar';
import '@/styles/components/headerSearch.scss';
import '@/styles/pages/searchLive.scss';
import '@/pages/taing/live/live.scss';
import '@/components/loading.js';
import { getNode, getNodes, renderSearchList } from '@/library/index';
import gsap from 'gsap';

async function renderLivePage() {
  const loading = getNode('c-loading');
  const searchListWrapper = getNode('.search__poster__list');

  searchListWrapper.textContent = '';
  loading.show();

  await renderSearchList('image', 'main_poster', '.search__poster__list');
  loading.hide();
  const posters = getNodes('.search__poster__list > li');

  posters.forEach((poster) => {
    gsap.fromTo(poster, { scale: 0 }, { scale: 1 });
    poster.addEventListener('mouseenter', () => {
      gsap.to(poster, { y: -20 });
    });
    poster.addEventListener('mouseleave', () => {
      gsap.to(poster, { y: 0 });
    });
  });
}
renderLivePage();
