import { setStorage, defaultAuthData } from '@/library/index';
import '@/components/headerSearch.js';
import '@/components/headerProfile.js';
import textCSS from '@/styles/layout/header.scss?inline';

const headerTemplate = document.createElement('template');

export class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const user = JSON.parse(localStorage.getItem('user'));
    const currentProfile = JSON.parse(localStorage.getItem('currentProfile'));

    if (!user) {
      setStorage('user', defaultAuthData);
    }

    headerTemplate.innerHTML = `
      <style>${textCSS}</style>
      <header class="header">
        <nav class="nav">
          <h1 class="header__logo">
            <a class="header__logo__link" href="${currentProfile ? '/src/pages/taing/' : '/'}">
              <svg class="logo1" role="img" aria-label="타잉">
                <use href="/icons/stack.svg#logo" />
              </svg>
            </a>
          </h1>

          ${
            currentProfile
              ? `<ul class="header__menu">
              <li class="menu__list">
                <a class="list__live" href="/src/pages/taing/">
                  실시간
                </a>
              </li>
              <li class="menu__list">
                <a class="list__tv" href="/src/pages/taing/">
                  TV프로그램
                </a>
              </li>
              <li class="menu__list">
                <a class="list__movie" href="/src/pages/taing/">
                  영화
                </a>
              </li>
              <li class="menu__list">
                <a class="list__paramount" href="/src/pages/taing/" aria-label="파라마운트">
                </a>
              </li>
            </ul>

            <div class="header__actions">
              <button type="button" class="button_search_open" aria-label="검색창으로 이동하기"></button>
              <button type="button" class="button_profile_open">
                <img src="${currentProfile.imgSrc}" alt="프로필 메뉴 열기" />
              </button>
            </div>
            `
              : ''
          }
        </nav>
        <c-search></c-search>
        <c-profile></c-profile>
      </header>
    `;

    this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true));

    if (currentProfile) {
      this.setupModalButtons();
    }
  }

  setupModalButtons() {
    const buttonSearch = this.shadowRoot.querySelector('.button_search_open');
    const buttonProfile = this.shadowRoot.querySelector('.button_profile_open');
    const searchModal = this.shadowRoot.querySelector('c-search');
    const profileModal = this.shadowRoot.querySelector('c-profile');

    if (!buttonProfile || !profileModal) {
      console.error('Required modal elements not found');
      return;
    }

    let isSearchActive = false;
    let isProfileActive = false;

    if (buttonSearch && searchModal) {
      buttonSearch.addEventListener('click', () => {
        if (!isSearchActive) {
          searchModal.open();
          buttonSearch.classList.add('button__cancel');
          isSearchActive = true;
        } else {
          searchModal.close();
          buttonSearch.classList.remove('button__cancel');
          isSearchActive = false;
        }
      });
    }

    buttonProfile.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!isProfileActive) {
        profileModal.open();
        isProfileActive = true;
      } else {
        profileModal.close();
        isProfileActive = false;
      }
    });

    // 모달 외부 클릭 시 닫기
    document.addEventListener('click', (e) => {
      if (
        isProfileActive &&
        !profileModal.contains(e.target) &&
        !buttonProfile.contains(e.target)
      ) {
        profileModal.close();
        isProfileActive = false;
      }
    });
  }
}

customElements.define('c-header', Header);
