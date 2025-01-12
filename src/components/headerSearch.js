import textCSS from '@/styles/components/headerSearch.scss?inline';
import { getNode } from '@/library/index';

const searchTemplate = document.createElement('template');
searchTemplate.innerHTML = `
  <style>${textCSS}</style>
  <div class="search">
    <div class="search__wrapper">
      <form class="search__bar" action="/src/pages/taing/search/">
        <input
          class="search__bar__input"
          id="search__box1"
          type="text"
          name="search"
          placeholder="검색"
          aria-invalid="false"
          aria-live="polite"
        />
        <input
          class="search__bar__input2"
          id="search__box2"
          type="text"
          name="search"
          placeholder="TV프로그램, 영화 제목 및 출연진으로 검색해보세요"
          aria-invalid="false"
          aria-live="polite"
        />
        <button type="submit" class="search__icon__button" aria-label="검색하기">
          <svg class="search__icon" role="img">
            <use href="/icons/stack.svg#search-defualt" />
          </svg>
        </button>
      </form>
      <section class="search__list__container">
        <div class="recent__search">
          <h2>최근 검색어</h2>
          <button type="button" id="recent__delete__button" aria-label="검색 내역 모두 지우기">모두 지우기</button>
          <ul id="recent__search__list">
            <li>검색 내역이 없습니다</li>
          </ul>
        </div>
        <div class="popular__search">
          <h2 id="popularSearchLive">실시간 인기 검색어</h2>
          <ul class="popular__list" aria-describedby="popularSearchLive">
            <li class="popular__list__order">
              <button type="button" title="검색하기"><span>1</span>재벌집 막내아들</button>
            </li>
            <li class="popular__list__order">
              <button type="button" title="검색하기"><span>2</span>술꾼도시여자들2</button>
            </li>
            <li class="popular__list__order">
              <button type="button" title="검색하기"><span>3</span>아무것도 하고 싶지 않아</button>
            </li>
            <li class="popular__list__order">
              <button type="button" title="검색하기"><span>4</span>블랙독</button>
            </li>
            <li class="popular__list__order">
              <button type="button" title="검색하기"><span>5</span>SHOW ME THE MONEY 11</button>
            </li>
            <li class="popular__list__order">
              <button type="button" title="검색하기"><span>6</span>우리들의 블루스</button>
            </li>
            <li class="popular__list__order">
              <button type="button" title="검색하기"><span>7</span>알쓸인잡</button>
            </li>
            <li class="popular__list__order">
              <button type="button" title="검색하기"><span>8</span>러브캐처 인 발리</button>
            </li>
            <li class="popular__list__order">
              <button type="button" title="검색하기"><span>9</span>보물찾기</button>
            </li>
            <li class="popular__list__order">
              <button type="button" title="검색하기"><span>10</span>환혼: 빛과 그림자</button>
            </li>
          </ul>
          <div class="date"></div>
        </div>
      </section>
    </div>
  </div>
`;

export class SearchModal extends HTMLElement {
  #container;
  #searchBox1;
  #searchBox2;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(searchTemplate.content.cloneNode(true));

    this.#container = this.shadowRoot.querySelector('.search');
    this.searchForm = this.shadowRoot.querySelector('.search__bar');
    this.#searchBox1 = this.shadowRoot.querySelector('#search__box1');
    this.#searchBox2 = this.shadowRoot.querySelector('#search__box2');
    this.recentdeleteButton = this.shadowRoot.querySelector(
      '#recent__delete__button'
    );
    this.recentSearchList = this.shadowRoot.querySelector(
      '#recent__search__list'
    );
    this.popularList = this.shadowRoot.querySelector('.popular__list');
  }

  connectedCallback() {
    this.#container.addEventListener('click', (e) => {
      if (e.target === this.#container) {
        this.close();
      }
    });
    this.searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const searchValue =
        this.#searchBox1.value.trim() || this.#searchBox2.value.trim();
      await this.saveRecentSearch(searchValue);
    });

    document.addEventListener('keydown', (e) => {
      if (
        e.key === 'Escape' &&
        this.#container.classList.contains('is--open')
      ) {
        this.close();
      }
    });

    this.recentdeleteButton.addEventListener(
      'click',
      this.deleteAllRecentSearch.bind(this)
    );
    this.displayRecentSearch();
    this.recentSearchList.addEventListener(
      'click',
      this.handlePopularSearchClick.bind(this)
    );
    this.popularList.addEventListener(
      'click',
      this.handlePopularSearchClick.bind(this)
    );
    this.renderToday();
  }

  open() {
    this.#container.classList.add('is--open');
    this.#searchBox1.focus() || this.#searchBox2.focus();
    document.body.style.overflow = 'hidden';
    const cHeader = getNode('c-header');
    const headerContainer = cHeader.shadowRoot.querySelector('.header');
    const buttonSearch = cHeader.shadowRoot.querySelector(
      '.button_search_open'
    );

    headerContainer.classList.add('search--open');
    buttonSearch.classList.add('button__cancel');
  }

  close() {
    this.#container.classList.remove('is--open');

    this.#searchBox1.value = '';
    this.#searchBox2.value = '';
    document.body.style.overflow = '';
    const cHeader = getNode('c-header');
    const headerContainer = cHeader.shadowRoot.querySelector('.header');
    const buttonSearch = cHeader.shadowRoot.querySelector(
      '.button_search_open'
    );

    headerContainer.classList.remove('search--open');
    buttonSearch.classList.remove('button__cancel');
  }

  async saveRecentSearch(searchValue) {
    if (!searchValue) return;

    const currentProfile = JSON.parse(localStorage.getItem('currentProfile'));
    let recentSearch =
      JSON.parse(localStorage.getItem(`${currentProfile.name}RecentSearch`)) ||
      [];
    recentSearch = [
      searchValue,
      ...recentSearch.filter((search) => search !== searchValue),
    ].slice(0, 20);
    localStorage.setItem(
      `${currentProfile.name}RecentSearch`,
      JSON.stringify(recentSearch)
    );

    window.location.href = `/src/pages/taing/search/?search=${encodeURIComponent(searchValue)}`;
  }

  displayRecentSearch() {
    const currentProfile = JSON.parse(localStorage.getItem('currentProfile'));
    const recentSearch =
      JSON.parse(localStorage.getItem(`${currentProfile.name}RecentSearch`)) ||
      [];

    if (recentSearch) {
      this.recentdeleteButton.style.display = 'block';
    }

    this.recentSearchList.innerHTML = recentSearch.length
      ? ''
      : '<li>검색 내역이 없습니다</li>';

    recentSearch.forEach((search, index) => {
      const template = `
      <li class="delete__recent">
        <button type="button" title="검색하기">${search}</button>
        <svg data-index=${index} class="delete__icon" role="button" aria-label="${search} 검색 기록 삭제하기" tabindex="0">
          <use href="/icons/stack.svg#delete-no-fiiled" />
        </svg>
      </li>
      `;
      this.recentSearchList.insertAdjacentHTML('beforeend', template);
    });

    this.#searchBox1.value = '';
    this.#searchBox2.value = '';
    this.#searchBox1.focus() || this.#searchBox2.focus();

    this.shadowRoot.querySelectorAll('.delete__icon').forEach((button) => {
      button.addEventListener('click', this.deleteRecentSearch.bind(this));
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.deleteRecentSearch(e);
        }
      });
    });
  }

  deleteRecentSearch(e) {
    e.stopPropagation();
    const currentProfile = JSON.parse(localStorage.getItem('currentProfile'));
    const index = e.target.getAttribute('data-index');
    let recentSearch =
      JSON.parse(localStorage.getItem(`${currentProfile.name}RecentSearch`)) ||
      [];
    recentSearch.splice(index, 1);
    localStorage.setItem(
      `${currentProfile.name}RecentSearch`,
      JSON.stringify(recentSearch)
    );
    this.displayRecentSearch();
  }

  deleteAllRecentSearch() {
    const currentProfile = JSON.parse(localStorage.getItem('currentProfile'));
    localStorage.removeItem(`${currentProfile.name}RecentSearch`);
    this.displayRecentSearch();
    this.recentdeleteButton.style.display = 'none';
  }

  renderToday() {
    const date = this.shadowRoot.querySelector('.date');
    const today = new Date();
    const ampm = today.getHours() < 12 ? '오전' : '오후';
    const hours = today.getHours() % 12 ? today.getHours() % 12 : 12;

    date.textContent = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')} ${ampm} ${hours}시 ${String(today.getMinutes()).padStart(2, '0')}분 기준`;
  }

  handlePopularSearchClick(e) {
    if (e.target.tagName === 'BUTTON') {
      const searchValue = e.target.lastChild.textContent;
      location.href = `/src/pages/taing/search/?search=${encodeURIComponent(searchValue)}`;
    }
  }
}

customElements.define('c-search', SearchModal);
