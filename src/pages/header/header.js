import pb from '@/api/pocketbase';
// import defaultAuthData from '@/api/defaultAuthData';
import { getStorage, deleteStorage } from '@/library/index';
import '@/pages/header/header.scss';
import '@/pages/myInfo_modal/myInfo_modal.scss';

import textCSS from '@/pages/header/header.scss?inline';

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
           <svg role="img" aria-label="라이브 페이지로 이동하기">
             <use href="/icons/stack.svg#live-default" />
           </svg>
           <span>실시간</span>
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
           <svg role="img" aria-label="파라마운트 이동하기">
             <use href="/icons/stack.svg#paramount-default" />
           </svg>
         </a>
       </li>
     </ul>     
     <div class="header__actions">
       <button type="button" class="button_profile_open">
         <img src="/image/profile_4.png" alt="" />
       </button>
       <div class="profile">
         <div class= profile_wrapper>
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

const buttonProfile = cHeader.shadowRoot.querySelector('.button_profile_open');
const profile = cHeader.shadowRoot.querySelector('.profile');
const buttonDeleteID = cHeader.shadowRoot.querySelector('.deleteID_button');
const buttonLogout = cHeader.shadowRoot.querySelector('.logout_button');

// 로그인 했을 때 모달 버튼 나오게 하기

if (!localStorage.getItem('auth')) {
  buttonProfile.classList.remove('signIn');
} else {
  buttonProfile.classList.add('signIn');
}

let isActive = false;

// 프로필 모달창 열기

buttonProfile.addEventListener('click', () => {
  if (!isActive) {
    profile.classList.add('active');
    isActive = true;
  }
});

// 프로필 모달창 닫기

profile.addEventListener('click', () => {
  if (isActive) {
    profile.classList.remove('active');
    isActive = false;
  }
});

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
