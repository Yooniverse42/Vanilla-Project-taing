import '@/layout/footer';
import '@/styles/pages/profile_detail.scss';
import { getNode, getNodes, setStorage } from '@/library/index';
import { sweetConfirm, sweetBasic, sweetError } from '@/components/sweetAlert';
import { getRecords } from '@/api/getRecords';
import { getImageData, createData } from '@/api/serverData';
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

// 뒤로가기 버튼
history.pushState(null, null, location.href);

function handlePrevButton() {
  sweetConfirm(
    'warning',
    '프로필 생성을 중단하시겠습니까?',
    '이 페이지를 벗어나면 프로필이 생성되지 않습니다.',
    '확인',
    '취소'
  ).then((res) => {
    if (res.isConfirmed) {
      localStorage.removeItem('currentProfile');
      location.href = document.referrer;
    } else {
      history.pushState(null, null, location.href);
    }
  });
}

prevButton.addEventListener('click', handlePrevButton);
window.addEventListener('popstate', handlePrevButton);

async function renderProfile() {
  const profiles = await getRecords('profileinfo', `user="${record.id}`);

  const existingAvatars = profiles.map((profile) => {
    return profile.avatar.split('/').pop();
  });

  const profileImages = await getImageData('profile').then(
    (response) => response.items[0].photo
  );

  const availableImages = profileImages.filter(
    (image) => !existingAvatars.includes(image)
  );

  const randomImage =
    availableImages[Math.floor(Math.random() * availableImages.length)];

  const urlParts = profiles[0].avatar.split('/');
  urlParts[urlParts.length - 1] = randomImage;
  const newAvatarUrl = urlParts.join('/');

  if (newAvatarUrl) {
    avatarImg.setAttribute('src', newAvatarUrl);
    avatarImg.setAttribute('alt', '새로운 프로필');
    setStorage('currentProfile', {
      name: null,
      imgSrc: newAvatarUrl,
      isPin: null,
    });
  }
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
        const currentProfile = JSON.parse(
          localStorage.getItem('currentProfile')
        );

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

    const currentProfile = JSON.parse(localStorage.getItem('currentProfile'));
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
  const newName = nameInput.value;
  if (!newName) {
    sweetError(
      '프로필 이름 미작성',
      '프로필 이름이 비어있습니다.<br/>이름을 입력해주세요!'
    );
    return;
  }
  const latestProfile = JSON.parse(localStorage.getItem('currentProfile'));
  console.log(latestProfile);
  console.log(latestProfile.imgSrc);

  try {
    const profiles = await getRecords('profileinfo', {
      filter: `user="${record.id}"`,
    });

    const isNameExists = profiles.some((profile) => profile.name === newName);
    if (isNameExists) {
      sweetError(
        '프로필 생성 실패',
        '이미 사용 중인 프로필 이름입니다.<br/>다른 이름을 입력해 주세요.'
      );
      return;
    }

    const newProfile = {
      user: record.id,
      name: newName,
      avatar: latestProfile.imgSrc,
      pin: latestProfile.isPin ? myLockPassword : null,
    };
    console.log(latestProfile.imgSrc);
    await createData('profileinfo', newProfile);
    await setStorage('currentProfile', {
      name: newName,
      imgSrc: latestProfile.imgSrc,
      isPin: latestProfile.isPin,
    });
    console.log(latestProfile.imgSrc);

    sweetBasic('프로필 생성 결과', '프로필이 생성되었습니다.').then((res) => {
      if (res.isConfirmed) {
        location.href = '/src/pages/profile_select/index.html';
      }
    });
  } catch (error) {
    console.log('Error updating user profile:', error);
    sweetError(
      '프로필 생성 결과',
      '프로필 생성 중 오류가 발생했습니다.<br/>잠시 후 다시 시도해 주세요.'
    );
  }
}

submitButton.addEventListener('click', updateUserProfile);
