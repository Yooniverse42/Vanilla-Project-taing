import '@/layout/footer';
import '@/styles/pages/profile_detail.scss';
import { getNode, getNodes, setStorage } from '@/library/index';
import { sweetConfirm, sweetBasic, sweetError } from '@/layout/sweetAlert';
import { getMyProfile, updateRecord } from '@/api/getRecords';
import gsap from 'gsap';

const avatarImg = getNode('.avatar__img');
const nameInput = getNode('.profileName__input');
const submitButton = getNode('.submit');
const toggleLabel = getNode('#toggle__button__label');
const toggleButton = getNode('.toggle__button');
const dialog = getNode('.dialog__container');
const headerDefault = getNode('.header__content__default');
const headerConfirm = getNode('.header__content__confirm');
const headerNotMatch = getNode('.header__content__notMatch');
const dialogCancelButton = getNode('.dialog__exit__button');
const prevButton = getNode('.prev__icon');

// 유저 정보 가져오기
const { record } = JSON.parse(localStorage.getItem('user'));
const currentProfile = JSON.parse(localStorage.getItem('currentProfile'));
const currentProfileDB = getMyProfile(record.id, currentProfile.name);

function getToggleDistance() {
  const width = window.innerWidth;
  if (width >= 1280) {
    return 59;
  } else if (width >= 768) {
    return 27.5;
  } else {
    return 19;
  }
}

renderToggle();
// 토글 렌더링
function renderToggle() {
  if (currentProfile.isPin) {
    gsap.to(toggleButton, {
      x: getToggleDistance(),
      duration: 0.3,
    });
    toggleLabel.classList.remove('toggle__unlocked');
    toggleLabel.classList.add('toggle__locked');
  }
}

// 뒤로가기 버튼
history.pushState(null, null, location.href);

function handlePrevButton() {
  sweetConfirm(
    'warning',
    '변경사항을 취소하시겠습니까?',
    '이 페이지를 벗어나면 변경된 내용은 저장되지 않습니다.',
    '확인',
    '취소'
  ).then((res) => {
    if (res.isConfirmed) {
      setStorage('currentProfile', {
        name: currentProfileDB.name,
        imgSrc: currentProfileDB.avatar,
        isPin: currentProfileDB.isPin,
      });
      location.href = document.referrer;
    } else {
      history.pushState(null, null, location.href);
    }
  });
}

prevButton.addEventListener('click', handlePrevButton);
window.addEventListener('popstate', handlePrevButton);

function renderProfile() {
  if (!currentProfile) return;

  nameInput.placeholder = `현재 사용자 이름 : ${currentProfile.name}`;
  avatarImg.setAttribute('src', currentProfile.imgSrc);
  avatarImg.setAttribute('alt', `${currentProfile.name}의 프로필`);
}
renderProfile();

// dialog 타이틀 변경
function updateDialogTitle(state) {
  headerDefault.style.display = state === 'default' ? 'block' : 'none';
  headerConfirm.style.display = state === 'confirm' ? 'block' : 'none';
  headerNotMatch.style.display = state === 'notMatch' ? 'block' : 'none';
}

// 잠금 설정
let myLockPassword = '';
let myLockPasswordConfirm = '';
const inputs = getNodes('input[id^="profilePw"]');

function getCurrentPassword() {
  return Array.from(inputs)
    .map((input) => input.value)
    .join('');
}

function clearInputs() {
  inputs.forEach((input) => (input.value = ''));
  inputs[0].focus();
}

async function handlePasswordInput(e) {
  const currentPassword = getCurrentPassword();
  const currentInput = e.target;
  const nextInput = currentInput
    .closest('li')
    .nextElementSibling?.querySelector('input');

  if (!isFinite(currentInput.value)) {
    currentInput.value = '';
    return;
  }

  if (nextInput) nextInput.focus();

  // 비밀번호 설정
  if (!myLockPassword) {
    if (currentPassword.length === 4) {
      myLockPassword = currentPassword;
      updateDialogTitle('confirm');
      clearInputs();
    }
  } else {
    // 비밀번호 확인
    if (currentPassword.length === 4) {
      myLockPasswordConfirm = currentPassword;

      if (currentPassword === myLockPassword) {
        dialog.close();
        await setStorage('currentProfile', {
          ...currentProfile,
          isPin: true,
        });
      } else {
        // 불일치
        updateDialogTitle('notMatch');
        clearInputs();
      }
    }
  }
}

// 토글 클릭 시 열기
async function profileLocked(e) {
  if (!currentProfile) return;

  const label = e.target.closest('#toggle__button__label');

  if (label.classList.contains('toggle__unlocked')) {
    dialog.showModal();

    inputs.forEach((input) => {
      input.removeEventListener('input', handlePasswordInput);
      input.addEventListener('input', async (e) => {
        await handlePasswordInput(e);
      });
    });
    updateDialogTitle('default');

    gsap.to(toggleButton, {
      x: getToggleDistance(),
      duration: 0.3,
    });
    label.classList.add('toggle__locked');
    label.classList.remove('toggle__unlocked');
    toggleButton.setAttribute('aria-label', '프로필이 잠겨있습니다.');

    toggleButton.setAttribute('aria-expanded', 'true');
  } else {
    gsap.to(toggleButton, { x: 0, duration: 0.3 });
    label.classList.remove('toggle__locked');
    label.classList.add('toggle__unlocked');

    await setStorage('currentProfile', {
      ...currentProfile,
      isPin: false,
    });

    toggleButton.setAttribute('aria-label', '프로필이 잠겨있지 않습니다.');
  }
}

toggleLabel.addEventListener('click', profileLocked);

// 모달 닫기(ESC, 취소 버튼)
function handleCloseModal() {
  gsap.to(toggleButton, { x: 0, duration: 0.3 });
  toggleLabel.classList.remove('toggle__locked');
  toggleLabel.classList.add('toggle__unlocked');
  toggleButton.setAttribute('aria-expanded', 'false');
  dialog.close();
  clearInputs();
}
dialogCancelButton.addEventListener('click', handleCloseModal);
dialog.addEventListener('cancel', handleCloseModal);

// 프로필 저장
async function updateUserProfile() {
  if (!currentProfile) return;

  const newName = nameInput.value || currentProfile.name;
  const latestProfile = JSON.parse(localStorage.getItem('currentProfile'));

  try {
    await updateRecord(
      'profileinfo',
      `user="${record.id}" && name="${currentProfile.name}"`,
      {
        name: newName,
        pin: latestProfile.isPin ? myLockPassword : null,
      }
    );

    await setStorage('currentProfile', {
      name: newName,
      imgSrc: currentProfile.imgSrc,
      isPin: latestProfile.isPin,
    });

    sweetBasic('프로필 편집 결과', '프로필 업데이트가 완료되었습니다.').then(
      (res) => {
        if (res.isConfirmed) {
          location.href = '/src/pages/profile_edit/index.html';
        }
      }
    );
  } catch (error) {
    console.log('Error updating user profile:', error);
    sweetError(
      '프로필 편집 결과',
      '프로필 업데이트 중 오류가 발생했습니다.<br/>잠시 후 다시 시도해 주세요.'
    );
  }
}

submitButton.addEventListener('click', updateUserProfile);
