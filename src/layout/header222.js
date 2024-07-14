// import { getStorage, setStorage } from 'kind-tiger';
// import pb from '@/api/pocketbase';
// import defaultAuthData from '@/api/defaultAuthData';

// // IIAFE
// (async function () {
//   if (!localStorage.getItem('auth')) {
//     setStorage('auth', defaultAuthData);
//   }

//   const { isAuth, user } = await getStorage('auth');

//   class Header extends HTMLElement {
//     constructor() {
//       super();
//       this.attachShadow({ mode: 'open' });
//       const style = document.createElement('style');
//       style.textContent = `@import '/src/styles/layout/header.scss';`;

//       this.shadowRoot.innerHTML = `
//         <style>
//           ${style.textContent}
//         </style>
//         <header class="header">

//           <nav class="nav">
//             <h1 class="header__logo">
//               <a class="header__logo__link" href="/index.html">
//                 <!-- role img가 맞나? -->
//                 <svg class="logo1" role="img" aria-label="타잉">
//                   <use href="/icons/stack.svg#live_default" />
//                 </svg>
//               </a>
//             </h1>

//           ${
//             isAuth
//               ? `
//             <ul class="header__menu">
//               <li class="menu__list">
//                 <a class="list__live" href="/">
//                   <svg role="img" aria-label="라이브 페이지로 이동하기">
//                     <use href="/icons/stack.svg#live_default" />
//                   </svg>
//                   <span>실시간</span>
//                 </a>
//               </li>
//               <li class="menu__list">
//                 <a class="list__tv" href="/">
//                   <span>TV프로그램</span>
//                 </a>
//               </li>
//               <li class="menu__list">
//                 <a class="list__movie" href="/">
//                   <span>영화</span>
//                 </a>
//               </li>
//               <li class="menu__list">
//                 <a class="list__paramount" href="/">
//                 <svg role="img" aria-label="파라마운트 이동하기">
//                   <use href="/icons/stack.svg#paramount_default" />
//                 </svg>
//                 </a>
//               </li>
//             </ul>

//             <div class="header__actions">
//               <svg class="actions__search" role="img" aria-label="검색하기">
//                 <use href="/icons/stack.svg#search_defualt" />
//               </svg>
//               <svg class="actions__profile" role="img" aria-label="프로필 편집 또는 시청중인 컨텐츠, 로그아웃, 회원탈퇴 페이지로 이동하기">
//                 <use href="/icons/stack.svg#profile_img" />
//               </svg>
//             </div>
//             `
//               : ` `
//           }
          
//           </nav>
//         </header>
//       `;

//       this.logout = this.shadowRoot.querySelector('.logout');
//     }

//     connectedCallback() {
//       this.logout?.addEventListener('click', this.logOut.bind(this));
//     }

//     logOut(e) {
//       e.preventDefault();

//       pb.authStore.clear();
//       setStorage('auth', defaultAuthData);

//       location.reload();
//     }
//   }

//   customElements.define('c-header', Header);
// })();
