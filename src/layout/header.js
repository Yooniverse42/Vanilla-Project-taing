import pb from '@/api/pocketbase';
import defaultAuthData from '@/api/defaultAuthData';
import { getStorage, setStorage, deleteStorage, getNodes } from '@/library/index';
import '@/styles/layout/header.scss';
import '@/pages/myInfo_modal/myInfo_modal.scss';
import '@/styles/pages/search_modal.scss';
import textCSS from '@/styles/layout/header.scss?inline';

// 기본값
setStorage('auth', defaultAuthData)

const headerTemplate = document.createElement('template');
headerTemplate.innerHTML = `
  <style>
    ${textCSS}
  </style>
  <header class="header">
    <nav class="nav">
      <h1 class="header__logo">
        <a class="header__logo__link" href="/index.html">
          <svg class="logo1" role="img" aria-label="타잉">
            <use href="/icons/stack.svg#logo" />
          </svg>
        </a>
      </h1>
      <ul class="header__menu">
        <li class="menu__list">
          <a class="list__live" href="/">
            <span aria-label="라이브 페이지로 이동하기">실시간</span>
          </a>
        </li>
        <li class="menu__list">
          <a class="list__tv" href="/">
            <span>TV프로그램</span>
          </a>
        </li>
        <li class="menu__list">
          <a class="list__movie" href="/">
            <span>영화</span>
          </a>
        </li>
        <li class="menu__list">
          <a class="list__paramount" href="/">
            <span aria-label="파라마운트 이동하기"></span>
          </a>
        </li>
      </ul>
      <div class="header__actions">
        <!-- 검색창 --------------------------------------->
        <button type="button" class="button_search_open" aria-label="검색창으로 이동하기">
        </button>
        <div class="search">
          <form class="search__bar" action="URL" method="POST">
          <input
            class="search__bar__input"
            id="search__box1"
            type="text"
            name="searchBox"
            placeholder="검색"
            required
            aria-invalid="false"
            aria-live="polite"
          />
          <input
            class="search__bar__input2"
            id="search__box2"
            type="text"
            name="searchBox"
            placeholder="TV프로그램, 영화 제목 및 출연진으로 검색해보세요"
            required
            aria-invalid="false"
            aria-live="polite"
          />
          <button type="button" class="search__icon__button">
            <svg class="search__icon" role="img" aria-label="검색 아이콘">
              <use href="/public/icons/stack.svg#search-defualt" />
            </svg>
          </button>
        </form>
        <!-- 검색 바 -->
        <section class="search__list__container">
          <div class="recent__search">
            <h2>최근 검색어</h2>
            <ul id="recent__search__list">
              <li>검색 내역이 없습니다</li>
            </ul>
            <button type="button" id="recent__delet__button"></button>
          </div>
          <!-- 최근 검색어 -->
          <div class="popular__search">
            <h2>실시간 인기 검색어</h2>
            <ul class="popular__list">
              <li class="popular__list__order"><span>1</span>재벌집 막내아들</li>
              <li class="popular__list__order">
                <span>2</span>미드터트롯2: 새로운 전설의 시작
              </li>
              <li class="popular__list__order">
                <span>3</span>유 퀴즈 온 더 블럭
              </li>
              <li class="popular__list__order"><span>4</span>대행사</li>
              <li class="popular__list__order">
                <span>5</span>SHOW MW THE MONEY 11
              </li>
              <li class="popular__list__order">
                <span>6</span>미씽: 그들이 있었다2
              </li>
              <li class="popular__list__order"><span>7</span>술꾼도시여자들2</li>
              <li class="popular__list__order"><span>8</span>캐나다 체크인</li>
              <li class="popular__list__order">
                <span>9</span>미씽:그들이 있었다 - 그들을 다만나다
              </li>
              <li class="popular__list__order"><span>10</span>술꾼도시여자들</li>
            </ul>
            
            <div class="date">2024.07.14 오후 10시 41 기준</div>
            <!-- 날짜 -->
          </div>
          <!-- 실시간 인기 검색어 -->
        </section>
        </div>
        <!-- 프로필 --------------------------------------->
          <button type="button" class="button_profile_open">
            <img src="/image/profile_4.png" alt="프로필 이동하기" />
          </button>
          <div class="profile">
            <div class="profile_wrapper">
              <div class="profile_container">
                <img src="/image/profile_4.png" alt="프로필" />
                <h2>이듬</h2>
                <button type="button">
                  <span>프로필 편집</span>
                </button>
              </div>
              <div class="button_container">
                <button type="button" class="contents_button">
                  <img src="/image/icon_TV.svg" alt="티비 아이콘" />
                  <span>시청 중인 컨텐츠</span>
                </button>
                <button type="button" class="logout_button">
                  <img src="/image/icon_logout.svg" alt="로그아웃 아이콘" />
                  <span>로그아웃</span>
                </button>
                <button type="button" class="deleteID_button">
                  <span>회원탈퇴</span>
                </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
`;

// if (!localStorage.getItem('auth')) {
//   setStorage('auth', defaultAuthData);
// }

export class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true));
  }
}

customElements.define('c-header', Header);

const cHeader = document.querySelector('c-header');
const headerMenu = cHeader.shadowRoot.querySelector('.header__menu');
const buttonSearch = cHeader.shadowRoot.querySelector('.button_search_open');
const buttonProfile = cHeader.shadowRoot.querySelector('.button_profile_open');
const search = cHeader.shadowRoot.querySelector('.search');
const profile = cHeader.shadowRoot.querySelector('.profile');
const buttonDeleteID = cHeader.shadowRoot.querySelector('.deleteID_button');
const buttonLogout = cHeader.shadowRoot.querySelector('.logout_button');

const searchBox1 = cHeader.shadowRoot.querySelector('#logout_button');
const searchBox2 = cHeader.shadowRoot.querySelector('#search__box2');
const recentDeletButton = cHeader.shadowRoot.querySelector('#recent__delet__button');
const recentSearchList = cHeader.shadowRoot.querySelector('#recent__search__list');

// 로그인 했을 때 모달 버튼 나오게 하기
if (!localStorage.getItem('auth')) {
  buttonSearch.classList.remove('header-signin');
  buttonProfile.classList.remove('header-signin');
  headerMenu.classList.remove('header-signin');
} else {
  buttonSearch.classList.add('header-signin');
  buttonProfile.classList.add('header-signin');
  headerMenu.classList.add('header-signin');
}

let isActive = false;
let isSearchActive = false;

// 모달창 열기
buttonSearch.addEventListener('click', () => {
  if (!isSearchActive) {
    search.classList.add('active');
    isSearchActive = true;
  } else {
    search.classList.remove('active');
    isSearchActive = false;
  }
});

buttonProfile.addEventListener('click', () => {
  if (!isActive) {
    profile.classList.add('active');
    isActive = true;
  }
});

// 모달창 닫기
profile.addEventListener('click', () => {
  if (isActive) {
    profile.classList.remove('active');
    isActive = false;
  }
});

/* ----------------------------------- 검색창 ---------------------------------- */
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



// 로그아웃
buttonLogout.addEventListener('click', (e) => {
  const target = e.target.closest('button');

  if (target == e.currentTarget) {
    if (!confirm('로그아웃 하시겠습니까?')) {
      return;
    } else {
      deleteStorage('auth');
      window.location.href = '/index.html';
      return;
    }
  }
});

// 회원 탈퇴
buttonDeleteID.addEventListener('click', async (e) => {
  const target = e.target.closest('button');

  if (target == e.currentTarget) {
    if (!confirm('회원 탈퇴 하시겠습니까?')) {
      return;
    } else {
      let user = await getStorage('auth');
      pb.collection('users').delete(user.id);
      return;
    }
  }
});