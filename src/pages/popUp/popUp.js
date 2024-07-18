import '@/styles/pages/popUp.scss';
import '@/layout/index';
import { getNode } from '@/library/index';
const popUp = getNode('.popup__container');
const todayCloseButton = getNode('.today');
const closeButton = getNode('.close');

// 로컬 스토리지에 데이터 저장

function setItemExpiry(key, value, ttl) {
  const todayDate = new Date();

  const item = {
    value: value,
    expiry: todayDate.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

// 데이터 읽기

function getItemExpiry(key) {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const todayDate = new Date();

  // 오늘 시간이 만료시간 보다 크면 아이템 삭제  or null
  if (todayDate.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

function hidePopup() {
  const popup = getNode('.popup__container');
  popup.style.display = 'none';
}

//  패이지 로드 시 팝업 숨기기 결정
window.onload = function () {
  const todayCloseButton = getNode('.today');
  const closeButton = getNode('.close');

  const showPopup = !getItemExpiry('hidePopup');

  if (!showPopup) {
    hidePopup();
  }

  todayCloseButton.addEventListener('click', () => {
    setItemExpiry('hidePopup', true, 10 * 60 * 1000); //10분 유효
    hidePopup();

    location.href = '/src/pages/taing/index.html';
  });
  closeButton.addEventListener('click', () => {
    hidePopup();
    location.href = '/src/pages/taing/index.html';
  });
};
