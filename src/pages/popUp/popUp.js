import '@/styles/pages/popUp.scss';
import '@/layout/index';

document.addEventListener('DOMContentLoaded', () => {
  const popUp = document.querySelector('.popup__wrapper');
  const todayButton = document.querySelector('.today');
  const closeButton = document.querySelector('.close');

  // 날짜 데이터 변환
  function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  // 로컬 스토리지에서 닫기 값 가져옴
  const closeDate = localStorage.getItem('popupCloseDate');
  const today = getDate();

  // 오늘 날짜가 popupCloseDate 같으면 숨김
  if (closeDate === today) {
    popUp.computedStyleMap.display = 'none';
  }
  // 오늘 하루 보지 않기 클릭시 로컬 저장 후 숨김
  todayButton.addEventListener('click', () => {
    localStorage.getItem('popupCloseDate', today);
    popUp.style.display = 'none';
  });

  // 닫기 버튼 클릭 시 숨김
  closeButton.addEventListener('click', () => {
    popUp.style.display = 'none';
  });
});
