import '/main.scss';
import '@/layout/index';
import 'swiper/css/bundle';
import { getNodes, renderImgList } from '@/library/index';
import { getRecords } from '@/api/getRecords';
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

function checkUserAuth() {
  const pageLinks = getNodes('.login__move');
  const { record } = JSON.parse(localStorage.getItem('user'));

  pageLinks.forEach((pageLink) => {
    if (record.id) {
      const currentProfile = JSON.parse(localStorage.getItem('currentProfile'));
      if (currentProfile?.name) {
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
  });
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
    slidesPerView: 3,
    slidesPerGroup: 3,
    breakpoints: {
      430: {
        slidesPerView: 3.5,
        slidesPerGroup: 3.5,
      },
      768: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      1000: {
        slidesPerView: 6,
        slidesPerGroup: 6,
      },
    },
  });
}

function renderSwiper() {
  const getImage = getRecords('image');
  renderImgList(
    getImage,
    'onboarding1',
    '.section1__swiper .swiper-wrapper',
    null,
    false
  );

  new Swiper('.section1__swiper .swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 2.3,
    initialSlide: 1,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    spaceBetween: 5,
    breakpoints: {
      768: {
        slidesPerView: 3,
      },
      1280: {
        slidesPerView: 2,
      },
    },
  });

  renderImgList(
    getImage,
    'onboarding2',
    '.section2__swiper1 .swiper-wrapper',
    null,
    false
  );
  renderImgList(
    getImage,
    'onboarding2',
    '.section2__swiper2 .swiper-wrapper',
    null,
    false
  );
  renderImgList(
    getImage,
    'onboarding2',
    '.section2__swiper1 .swiper-wrapper',
    null,
    false
  );
  renderImgList(
    getImage,
    'onboarding2',
    '.section2__swiper2 .swiper-wrapper',
    null,
    false
  );

  createSwiper('.section2__swiper1', 5000);
  createSwiper('.section2__swiper2', 5030);
}
renderSwiper();

const cHeader = document.querySelector('c-header');
const header = cHeader.shadowRoot.querySelector('header');
header.style.position = 'absolute';
