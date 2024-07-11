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

//           <nav class="nav">

//             <h1 class="header__logo">
//               <a class="header__logo__link" href="/index.html">
//                 <img class="logo1" src="http://yooniverse.pockethost.io/api/files/icon/451vddo2teve45p/icon_l_QGEdYLL7JV.svg" alt="타잉" />
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