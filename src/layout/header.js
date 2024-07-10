// import { getStorage,setStorage } from 'kind-tiger';
// import getPbImageURL from '../api/getPbImageURL';
// import pb from '../api/pocketbase'
// import defaultAuthData from '@/api/defaultAuthData'

// // IIAFE
// (async function(){

//   if(!localStorage.getItem('auth')) {
//     setStorage('auth', defaultAuthData)
//   }

//   const {isAuth, user} = await getStorage('auth');


//   class Header extends HTMLElement{
    
//     constructor(){
//       super();
//       this.attachShadow({mode:'open'});
//       const style = document.createElement('style');
//       // style.textContent = `@import url('컴파일된 css 넣기!');`;



//       this.shadowRoot.innerHTML = `
//         <style>
//           /* ${style.textContent} */
//         </style>
//         <header class="header">

//           <nav class="header__container">
//             <h1 class="header__logo">
//               <a href="/index.html">
//                 <picture class="message_title_button_img">
//                   <source media="(min-width: 1920px)" srcset="http://yooniverse.pockethost.io/api/files/icon/996jh1fp64lu2vq/logo_l_MphmumOKiy.svg">
//                   <source media="(min-width: 768px)" srcset="http://yooniverse.pockethost.io/api/files/icon/2cffqgs2lq2k6t7/logo_m_VreQNMTbLn.svg">
//                   <img src="http://yooniverse.pockethost.io/api/files/icon/529jxuhmio4cfda/logo_s_DWQKIp5chm.svg" alt="타잉">
//                 </picture>
//               </a>
//           </h1>

//           ${
//             isAuth ? `
//             <ul class="header__menu"></ul>
//           <div>
//             <img src="search아이콘" alt="" />
//             <img src="profile아이콘" alt="" />
//           </div>`
//           :`
//           null넣을 순 없나요 ㅋㅋ`
//           }
          
//           </nav>
//         </header>
//       `

//         this.logout = this.shadowRoot.querySelector('.logout');

//       }

//       connectedCallback(){
//         this.logout?.addEventListener('click',this.logOut.bind(this));
//       }


//       logOut(e){
//         e.preventDefault();
        
//         pb.authStore.clear();
//         setStorage('auth',defaultAuthData)
    
//         location.reload()
//       }
//   }

//     customElements.define('c-header',Header);

// })()