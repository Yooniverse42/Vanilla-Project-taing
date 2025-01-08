import '/main.scss';
import '@/layout/index';
import 'swiper/css/bundle';
import { getNode } from '@/library/index';
import Swiper from 'swiper/bundle';
import gsap from 'gsap';

let tl = gsap.timeline();
gsap.defaults({
  opacity: 0,
  y: 100,
  duration: 1,
});
tl.from('.section0__background, .section1, .section2, .section3', {})
  .from('.container__header, .container__message', {}, '-=0.3')
  .from('.login__move', {}, '-=0.5');

new Swiper('.section1__swiper1', {
  autoplay: {
    delay: 1500,
  },

  slidesPerView: 1.5,
  spaceBetween: 12,
  centeredSlides: true,
  breakepoint: {
    768: {
      spaceBetween: 20,
    },
  },
});

const pageLink = getNode('.login__move');

function checkUserAuth() {
  const { record } = JSON.parse(localStorage.getItem('user'));
  if (record.id) {
    const currentProfile = JSON.parse(localStorage.getItem('currentProfile'));
    if (currentProfile.name) {
      pageLink.setAttribute('href', '/src/pages/taing/');
      pageLink.setAttribute('aria-label', '메인 페이지로 이동');
    } else {
      pageLink.setAttribute('href', '/src/pages/profile/profile_select/');
      pageLink.setAttribute('aria-label', '프로필 선택 페이지로 이동');
    }
  } else {
    pageLink.setAttribute('href', '/src/pages/loginID/');
    pageLink.setAttribute('aria-label', '로그인 페이지로 이동');
  }
}
checkUserAuth();

function createSwiper(className, speed) {
  return new Swiper(className, {
    autoplay: {
      delay: 0,
      reverseDirection: true,
    },
    speed: speed,
    loop: true,
    spaceBetween: 12,
    slidesPerView: 1.7,
    breakpoints: {
      768: {
        slidesPerView: 4,
      },
    },
  });
}

createSwiper('.section2__swiper1', 5000);
createSwiper('.section2__swiper2', 5030);

const cHeader = document.querySelector('c-header');
const header = cHeader.shadowRoot.querySelector('header');
header.style.position = 'absolute';
