import '@/layout/index';
import '@/pages/profile_edit_detail/profile_edit_detail.scss';
import { getNode } from '../../library/getNode';
import pb from '../../api/pocketbase';
import { setStorage } from './../../library/storage';

const avatarImg = getNode('.avatar__img');
const nameInput = getNode('.profileName__input');
const submitButton = getNode('.submit');

const { name: currentName, imgSrc } = JSON.parse(
  localStorage.getItem('profileInfo')
);

renderProfile();

function renderProfile() {
  nameInput.placeholder = `현재 사용자 이름 : ${currentName}`;
  avatarImg.setAttribute('src', imgSrc);
}

async function updataUserProfile() {
  if (imgSrc.includes('default')) {
    alert('1~3번까지는 고정이라 못 바꿔요ㅠ 혹시나 써놨어요');
    location.href = '/src/pages/profile_edit/index.html';
    return;
  }
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
