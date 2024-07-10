import '@/styles/pages/onboarding/onboarding_section1.scss';
import 'swiper/css/bundle';
import Swiper from 'swiper/bundle';
import { Pagination } from 'swiper/modules';

const swiper = new Swiper('.section1__swiper1', {
  autoplay: {
    delay: 2000,
  },
  slidesPerView: 2,
  spaceBetween: 12,
  centeredSlides: true,
});
