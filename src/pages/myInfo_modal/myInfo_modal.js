import '@/layout/footer';
import '@/pages/myInfo_modal/myInfo_modal.scss';
import { getNode, getStorage, deleteStorage } from '@/library/index';
import pb from '@/api/pocketbase';

const buttonProfile = getNode('.button_profile_open');
const profile = getNode('.profile');
const buttonDeleteID = getNode('.deleteID_button');
const buttonLogout = getNode('.logout_button');

const cHeader = getNode('c-header');
cHeader.shadowRoot.querySelector('.button_profile_open');

// const shadow = cHeader.shadowRoot.querySelector('.button_profile_open');

// setStorage('auth', { id: '44vbcckr39voea4' });

let isActive = false;

// 모달 임시

buttonProfile.addEventListener('click', () => {
  if (!isActive) {
    profile.classList.add('active');
    isActive = true;
  } else {
    profile.classList.remove('active');
    isActive = false;
  }
});

// 로그아웃

buttonLogout.addEventListener('click', () => {
  if (!confirm('로그아웃 하시겠습니까?')) {
    return;
  } else {
    deleteStorage('auth');
    window.location.href = '/index.html';
    return;
  }
});

// 회원 탈퇴

buttonDeleteID.addEventListener('click', async () => {
  if (!confirm('회원 탈퇴 하시겠습니까?')) {
    return;
  } else {
    let user = await getStorage('auth');
    pb.collection('users').delete(user.id);
    return;
  }
});
