import '@/layout/index';
import '@/pages/profile_edit_detail/profile_edit_detail.scss';
import { getNode } from '../../library/getNode';
import pb from '../../api/pocketbase';
import { setStorage } from './../../library/storage';

const prevButton = getNode('.prev__icon');

prevButton.addEventListener('click', () => {
  window.history.back();
});

const avatarImg = getNode('.avatar__img');
const nameInput = getNode('.profileName__input');
const submitButton = getNode('.submit');

const { name: currentName, imgSrc } = JSON.parse(
  localStorage.getItem('profileInfo')
);

renderProfile();

//현재 사용자 이름, 사진으로 속성 설정
function renderProfile() {
  nameInput.placeholder = `현재 사용자 이름 : ${currentName}`;
  avatarImg.setAttribute('src', imgSrc);
}

async function updataUserProfile() {
  //기본 예제 프로필일 경우 profile_edit으로 이동
  if (imgSrc.includes('default')) {
    alert('4번 프로필부터 편집이 가능해요');
    location.href = '/src/pages/profile_edit/index.html';
    return;
  }
  //포켓베이스 데이터에 있는 유저일 경우 pb update()로 유저 이름 변경
  const user = JSON.parse(localStorage.getItem('user'));
  const { record } = user;
  const data = {
    ...record,
    name: nameInput.value || currentName,
  };
  setStorage('user', { record: data });
  await pb.collection('users').update(record.id, data);
  alert('프로필 이름 변경 완료');
  location.href = '/src/pages/profile_edit/index.html';
}

submitButton.addEventListener('click', updataUserProfile);
