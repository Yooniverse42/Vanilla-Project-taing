import '@/styles/pages/search_modal.scss';
import { getNode, getNodes } from '@/library/index';

const searchBox1 = getNode('#search__box1');
const searchBox2 = getNode('#search__box2');
const recentDeletButton = getNode('#recent__delet__button');
const recentSearchList = getNode('#recent__search__list');

// 검색어 로컬 스토리지 저장 및 업데이트
function saveRecentSearch(e) {
  const searchQuery = e.target.value.trim();
  if (!searchQuery) return;

  let recentSearch = JSON.parse(localStorage.getItem('recentSearch')) || [];
  recentSearch = [
    searchQuery,
    ...recentSearch.filter((search) => search !== searchQuery),
  ].slice(0, 20);

  localStorage.setItem('recentSearch', JSON.stringify(recentSearch));
  displayRecentSearch();
}

// 최근 검색 목록 불러오기, 검색어 삭재 기능 구현
function displayRecentSearch() {
  const recentSearch = JSON.parse(localStorage.getItem('recentSearch')) || [];
  recentSearchList.innerHTML = recentSearch.length
    ? ''
    : '<li>검색 내역이 없습니다</li>';

  recentSearch.forEach((search, index) => {
    const li = document.createElement('li');
    li.classList.add('delet__recent');
    li.innerHTML = `${search}
            <svg data-index ="${index}"  class="delet__icon" role="img" aria-label="삭제 아이콘">
              <use href="/public/icons/stack.svg#delete-no-fiiled" />
            </svg>
            
          `;
    recentSearchList.appendChild(li);
  });

  getNodes('.delet__icon').forEach((button) => {
    button.addEventListener('click', deleteRecentSearch);
  });
}

function deleteRecentSearch(e) {
  const index = e.target.getAttribute('data-index');
  let recentSearch = JSON.parse(localStorage.getItem('recentSearch')) || [];
  recentSearch.splice(index, 1);
  localStorage.setItem('recentSearch', JSON.stringify(recentSearch));
  displayRecentSearch();
}
function deletAllrecentsearch() {
  localStorage.removeItem('recentSearch');
  displayRecentSearch();
}

document.addEventListener('DOMContentLoaded', displayRecentSearch);

// 이벤트 실행
searchBox1.addEventListener('change', saveRecentSearch);
searchBox2.addEventListener('change', saveRecentSearch);
recentDeletButton.addEventListener('click', deletAllrecentsearch);
