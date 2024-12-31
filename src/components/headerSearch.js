import textCSS from '@/styles/components/headerSearch.scss?inline';

const searchTemplate = document.createElement('template');
searchTemplate.innerHTML = `
  <style>${textCSS}</style>
  <div class="search">
    <div class="search__wrapper">
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
        <button type="button" class="search__icon__button" aria-label="검색하기">
          <svg class="search__icon" role="img">
            <use href="/icons/stack.svg#search-defualt" />
          </svg>
        </button>
      </form>
      <section class="search__list__container">
        <div class="recent__search">
          <h2>최근 검색어</h2>
          <ul id="recent__search__list">
            <li>검색 내역이 없습니다</li>
          </ul>
          <button type="button" id="recent__delete__button" aria-label="검색 내역 삭제하기"></button>
        </div>
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
    this.#searchBox1 = this.shadowRoot.querySelector('#search__box1');
    this.#searchBox2 = this.shadowRoot.querySelector('#search__box2');
    this.recentdeleteButton = this.shadowRoot.querySelector(
      '#recent__delete__button'
    );
    this.recentSearchList = this.shadowRoot.querySelector(
      '#recent__search__list'
    );
  }

  connectedCallback() {
    this.#searchBox1.addEventListener(
      'change',
      this.saveRecentSearch.bind(this)
    );
    this.#searchBox2.addEventListener(
      'change',
      this.saveRecentSearch.bind(this)
    );
    this.recentdeleteButton.addEventListener(
      'click',
      this.deleteAllRecentSearch.bind(this)
    );
    this.displayRecentSearch();
    this.renderToday();
  }

  open() {
    this.#container.classList.add('is--open');
    this.#searchBox1.focus() || this.#searchBox2.focus();
  }

  close() {
    this.#container.classList.remove('is--open');
  }

  saveRecentSearch(e) {
    const currentProfile = JSON.parse(localStorage.getItem('currentProfile'));
    const searchQuery = e.target.value.trim();
    if (!searchQuery) return;

    let recentSearch =
      JSON.parse(localStorage.getItem(`${currentProfile.name}RecentSearch`)) ||
      [];
    recentSearch = [
      searchQuery,
      ...recentSearch.filter((search) => search !== searchQuery),
    ].slice(0, 20);

    localStorage.setItem(
      `${currentProfile.name}RecentSearch`,
      JSON.stringify(recentSearch)
    );
    this.displayRecentSearch();
  }

  displayRecentSearch() {
    const currentProfile = JSON.parse(localStorage.getItem('currentProfile'));
    const recentSearch =
      JSON.parse(localStorage.getItem(`${currentProfile.name}RecentSearch`)) ||
      [];

    this.recentSearchList.innerHTML = recentSearch.length
      ? ''
      : '<li>검색 내역이 없습니다</li>';

    recentSearch.forEach((search, index) => {
      const li = document.createElement('li');
      li.classList.add('delete__recent');
      li.innerHTML = `${search}
        <svg data-index="${index}" class="delete__icon" role="img" aria-label="삭제 아이콘">
          <use href="/icons/stack.svg#delete-no-fiiled" />
        </svg>
      `;
      this.recentSearchList.appendChild(li);
    });

    this.#searchBox1.value = '';
    this.#searchBox2.value = '';
    this.#searchBox1.focus() || this.#searchBox2.focus();

    this.shadowRoot.querySelectorAll('.delete__icon').forEach((button) => {
      button.addEventListener('click', this.deleteRecentSearch.bind(this));
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
  }

  renderToday() {
    const date = this.shadowRoot.querySelector('.date');
    const today = new Date();
    const ampm = today.getHours() < 12 ? '오전' : '오후';
    const hours = today.getHours() % 12 ? today.getHours() % 12 : 12;

    date.textContent = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')} ${ampm} ${hours}시 ${String(today.getMinutes()).padStart(2, '0')}분 기준`;
  }
}

customElements.define('c-search', SearchModal);
