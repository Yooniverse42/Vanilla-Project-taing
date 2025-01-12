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
    const currentPath = location.pathname;
    const isTaingPage = currentPath.includes('/pages/taing/');
    const isCreatePage = currentPath.includes('/pages/profile/profile_create/');

    if (!user) {
      setStorage('user', defaultAuthData);
    }

    headerTemplate.innerHTML = `
      <style>${textCSS}</style>
      <header class="header">
        <nav class="nav">
          <h1 class="header__logo">
            <a class="header__logo__link" href="${currentProfile && !isCreatePage ? '/src/pages/taing/' : user ? '/src/pages/profile/profile_select/' : '/'}">
              <svg class="logo1" role="img" aria-label="타잉">
                <use href="/icons/stack.svg#logo" />
              </svg>
            </a>
          </h1>

          ${
            currentProfile && isTaingPage
              ? `<ul class="header__menu">
              <li class="menu__list">
                <a class="list__live" href="/src/pages/taing/live/">
                  실시간
                </a>
              </li>
              <li class="menu__list">
                <a class="list__tv" href="/src/pages/taing/live/">
                  TV프로그램
                </a>
              </li>
              <li class="menu__list">
                <a class="list__movie" href="/src/pages/taing/live/">
                  영화
                </a>
              </li>
              <li class="menu__list">
                <a class="list__paramount" href="/src/pages/taing/live/" aria-label="파라마운트">
                </a>
              </li>
            </ul>

            <div class="header__actions">
              <button type="button" class="button_search_open" aria-label="검색창으로 이동하기"></button>
              <button type="button" class="button_profile_open">
                <img src="${currentProfile?.imgSrc}" alt="프로필 메뉴 열기" />
              </button>
            </div>
            `
              : ''
          }
        </nav>
        ${
          currentProfile && isTaingPage
            ? `<c-search></c-search>
              <c-profile></c-profile>`
            : ''
        }
      </header>
    `;

    this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true));

    if (currentProfile && isTaingPage) {
      this.setupModalButtons();
    }
  }

  setupModalButtons() {
    const buttonSearch = this.shadowRoot.querySelector('.button_search_open');
    const buttonProfile = this.shadowRoot.querySelector('.button_profile_open');
    const searchModal = this.shadowRoot.querySelector('c-search');
    const profileModal = this.shadowRoot.querySelector('c-profile');

    if (buttonSearch && searchModal) {
      buttonSearch.addEventListener('click', () => {
        if (buttonSearch.classList.contains('button__cancel')) {
          searchModal.close();
        } else {
          searchModal.open();
        }
      });
    }

    if (buttonProfile && profileModal) {
      buttonProfile.addEventListener('click', () => {
        profileModal.open();
      });
    }
  }
}

customElements.define('c-header', Header);
