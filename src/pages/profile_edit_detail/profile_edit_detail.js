import '@/layout/footer';
import '@/pages/profile_edit_detail/profile_edit_detail.scss';
import { getNode, getNodes } from '@/library/getNode';
import pb from '@/api/pocketbase';
import { setStorage } from '@/library/storage';
import { sweetConfirm, sweetBasic, sweetError } from '@/layout/sweetAlert';

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
const userData = JSON.parse(localStorage.getItem('user'));
const { profiles } = userData.record;
const currentProfile = JSON.parse(localStorage.getItem('currentProfile'));
const currentUser = profiles.find((item) => item.name === currentProfile.name);

console.log(currentUser.lockPassword);
renderToggle();
// 토글 렌더링
function renderToggle() {
  if (currentUser.lockPassword) {
    toggleLabel.classList.remove('toggle__unlocked');
    toggleLabel.classList.add('toggle__locked');
  }
}

// 뒤로가기 버튼
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
        name: currentUser.name,
        imgSrc: currentUser.avatar,
        pw: currentUser.lockPassword,
      });
      window.history.back();
    }
  });
}
prevButton.addEventListener('click', handlePrevButton);

//현재 사용자 이름, 사진으로 속성 설정
function renderProfile() {
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
          pw: myLockPassword,
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
  const label = e.target.closest('#toggle__button__label');

  if (label.classList.contains('toggle__unlocked')) {
    dialog.showModal();

    inputs.forEach((input) => {
      input.addEventListener('input', async (e) => {
        await handlePasswordInput(e);
      });
    });
    updateDialogTitle('default');

    label.classList.add('toggle__locked');
    label.classList.remove('toggle__unlocked');
    toggleButton.setAttribute('aria-label', '프로필이 잠겨있습니다.');

    toggleButton.setAttribute('aria-expanded', 'true');
  } else {
    label.classList.remove('toggle__locked');
    label.classList.add('toggle__unlocked');

    setStorage('currentProfile', {
      ...currentProfile,
      pw: null,
    });

    toggleButton.setAttribute('aria-label', '프로필이 잠겨있지 않습니다.');
  }
}

toggleLabel.addEventListener('click', profileLocked);

// 모달 닫기(ESC, 취소 버튼)
function handleCloseModal() {
  toggleLabel.classList.remove('toggle__locked');
  toggleLabel.classList.add('toggle__unlocked');
  toggleButton.setAttribute('aria-expanded', 'false');
  dialog.close();
  clearInputs();
}
dialogCancelButton.addEventListener('click', handleCloseModal);
dialog.addEventListener('cancel', handleCloseModal);

// 프로필 저장
async function updataUserProfile() {
  console.log('Current profile before update:', currentProfile);
  const updateProfiles = profiles.map((profile) => {
    if (profile.name === currentProfile.name) {
      return {
        ...profile,
        name: nameInput.value || profile.name,
        lockPassword: currentProfile.pw,
      };
    }
    return profile;
  });

  const updatedData = {
    ...userData.record,
    profiles: updateProfiles,
  };

  console.log('Updated data:', updatedData);

  try {
    await setStorage('user', { record: updatedData });
    await setStorage('currentProfile', {
      ...currentProfile,
      name: nameInput.value || currentProfile.name,
      pw: currentProfile.pw,
    });
    console.log('Storage updated');

    await pb.collection('users').update(userData.record.id, updatedData);
    console.log('Database updated');
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

submitButton.addEventListener('click', updataUserProfile);
