import pb from '@/api/pocketbase';
import { getStorage, deleteStorage } from '@/library/index';
import textCSS from '@/styles/components/headerProfile.scss?inline';

const currentProfile = JSON.parse(localStorage.getItem('currentProfile'));

const profileTemplate = document.createElement('template');
profileTemplate.innerHTML = `
  <style>${textCSS}</style>
    <dialog class="profile">
      <div class="profile_container">
        <div class="profile_wrapper">
          <img src="${currentProfile?.imgSrc}" alt="${currentProfile?.name}" />
          <h2>${currentProfile?.name}</h2>
          <a href="/src/pages/profile/profile_edit_detail/">프로필 편집</a>
        </div>
        <div class="button_container">
          <button type="button" class="contents_button">
            <span>시청 중인 컨텐츠</span>
          </button>
          <button type="button" class="logout_button">
            <span>로그아웃</span>
          </button>
        </div>
        <button type="button" class="deleteID_button">
          <span>회원탈퇴</span>
        </button>
      </div>
    </dialog>
`;

export class ProfileModal extends HTMLElement {
  #dialog;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.appendChild(profileTemplate.content.cloneNode(true));
    this.#dialog = this.shadowRoot.querySelector('dialog');

    this.logoutButton = this.shadowRoot.querySelector('.logout_button');
    this.deleteButton = this.shadowRoot.querySelector('.deleteID_button');

    this.logoutButton.addEventListener('click', this.handleLogout.bind(this));
    this.deleteButton.addEventListener(
      'click',
      this.handleDeleteAccount.bind(this)
    );
  }

  open() {
    this.#dialog.showModal();
  }

  close() {
    this.#dialog.close();
    this.getRootNode()
      .host.shadowRoot.querySelector('.button_profile_open')
      .focus();
  }

  handleLogout(e) {
    const target = e.target.closest('button');

    if (target == e.currentTarget) {
      if (!confirm('로그아웃 하시겠습니까?')) {
        return;
      }
      deleteStorage('user');
      deleteStorage('currentProfile');
      window.location.href = '/';
    }
  }

  async handleDeleteAccount(e) {
    const target = e.target.closest('button');

    if (target == e.currentTarget) {
      if (!confirm('회원 탈퇴를 진행 하시겠습니까?')) {
        return;
      }
      let user = await getStorage('user');
      await pb.collection('users').delete(user.record.id);
      await pb.collection('profileinfo').delete(user.record.id);
      deleteStorage('user');
      deleteStorage('currentProfile');
      alert('회원 탈퇴가 완료 되었습니다.');
      location.href = '/';
    }
  }
}

customElements.define('c-profile', ProfileModal);
