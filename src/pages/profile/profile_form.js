import { getNode, getNodes, setStorage, deleteStorage } from '@/library/index';
import { sweetConfirm } from '@/components/sweetAlert';
import { updateRecord, getRecords } from '@/api/getRecords';
import { createData } from '@/api/serverData';
import { sweetBasic, sweetError } from '@/components/sweetAlert';
import gsap from 'gsap';
import '@/components/loading.js';

export function renderProfileForm(pageName) {
  const page = pageName === 'edit' ? 'edit' : 'create';
  const loading = getNode('c-loading');
  loading.show();

  const toggleLabel = getNode('#toggle__button__label');
  const toggleButton = getNode('.toggle__button');
  const dialog = getNode('.dialog__container');
  const dialogCancelButton = getNode('.dialog__exit__button');
  const prevButton = getNode('.prev__icon');
  const submitButton = getNode('.submit');
  const nameInput = getNode('.profileName__input');

  // 유저 정보 가져오기
  const { record } = JSON.parse(localStorage.getItem('user'));
  const currentProfile = JSON.parse(localStorage.getItem('currentProfile'));

  if (!currentProfile && pageName === 'edit') {
    loading.hide();
    location.href = '/src/pages/profile/profile_select/index.html';
    return;
  }

  setToggleButtonAria();

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

  function initToggleButton() {
    gsap.set(toggleButton, {
      x: 0,
      yPercent: -50,
    });
  }

  function updateTogglePosition(isLocked = false) {
    gsap.to(toggleButton, {
      x: isLocked ? getToggleDistance() : 0,
      yPercent: -50,
      duration: 0.3,
    });
  }

  initToggleButton();

  window.addEventListener('resize', () => {
    if (currentProfile?.isPin) {
      updateTogglePosition(true);
    }
  });

  function setToggleButtonAria() {
    if (currentProfile?.isPin) {
      toggleButton.setAttribute(
        'aria-label',
        '이 프로필은 현재 잠금 설정이 되어있습니다. 프로필을 선택하면 잠금이 해제됩니다.'
      );
      updateTogglePosition(true);
      toggleLabel.classList.remove('toggle__unlocked');
      toggleLabel.classList.add('toggle__locked');
    } else {
      toggleButton.setAttribute(
        'aria-label',
        '이 프로필은 현재 잠금 설정이 되어있지 않습니다. 프로필을 선택하면 PIN 번호를 설정하여 잠금을 설정할 수 있습니다.'
      );
    }
  }

  history.pushState(null, null, location.href);

  const navigateTo = (res) => {
    if (res.isConfirmed) {
      const pinNumber = localStorage.getItem('saveProfilePinNumber');
      if (pinNumber && JSON.parse(pinNumber)) {
        deleteStorage('saveProfilePinNumber');
      }
      location.href = document.referrer;
    } else {
      history.pushState(null, null, location.href);
    }
  };

  const handlePrevButton = () => {
    const confirmMessages = {
      edit: {
        title: '변경사항을 취소하시겠습니까?',
        text: '이 페이지를 벗어나면 변경된 내용은 저장되지 않습니다.',
      },
      create: {
        title: '프로필 생성을 중단하시겠습니까?',
        text: '이 페이지를 벗어나면 프로필이 생성되지 않습니다.',
      },
    };

    const { title, text } = confirmMessages[page];

    sweetConfirm('warning', title, text, '확인', '취소').then(navigateTo);
  };

  prevButton.addEventListener('click', handlePrevButton);
  window.addEventListener('popstate', handlePrevButton);

  // dialog 타이틀 변경

  function updateDialogTitle(state) {
    const headerDefault = getNode('.header__content__default');
    const headerConfirm = getNode('.header__content__confirm');
    const headerNotMatch = getNode('.header__content__notMatch');

    headerDefault.style.display = state === 'default' ? 'block' : 'none';
    headerConfirm.style.display = state === 'confirm' ? 'block' : 'none';
    headerNotMatch.style.display = state === 'notMatch' ? 'block' : 'none';
  }

  // 잠금 설정

  let myLockPassword = '';
  const inputs = getNodes('input[id^="profilePw"]');

  const getCurrentPassword = () => {
    return Array.from(inputs)
      .map((input) => input.value)
      .join('');
  };

  const clearInputs = () => {
    inputs.forEach((input) => (input.value = ''));
    inputs[0].focus();
  };

  const settingPin = () => {
    const currentPassword = getCurrentPassword();
    if (!myLockPassword && currentPassword.length === 4) {
      myLockPassword = currentPassword;
      updateDialogTitle('confirm');
      clearInputs();
    } else {
      if (currentPassword.length === 4) {
        if (currentPassword === myLockPassword) {
          dialog.close();
          setStorage('saveProfilePinNumber', {
            isPin: true,
          });
        } else {
          updateDialogTitle('notMatch');
          clearInputs();
        }
      }
    }
  };

  function handlePasswordInput(e) {
    const currentInput = e.target;
    const nextInput = currentInput
      .closest('li')
      .nextElementSibling?.querySelector('input');

    if (!isFinite(currentInput.value)) {
      currentInput.value = '';
      return;
    }

    if (nextInput) {
      nextInput.focus();
    } else currentInput.focus();

    settingPin();
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

      updateTogglePosition(true);
      label.classList.add('toggle__locked');
      label.classList.remove('toggle__unlocked');
      toggleButton.setAttribute(
        'aria-label',
        '프로필 잠금 설정이 완료 되어있습니다.'
      );

      toggleButton.setAttribute('aria-expanded', 'true');
      clearInputs();
      myLockPassword = '';
      updateDialogTitle('default');
    } else {
      updateTogglePosition(false);
      label.classList.remove('toggle__locked');
      label.classList.add('toggle__unlocked');

      await setStorage('saveProfilePinNumber', {
        isPin: false,
      });

      toggleButton.setAttribute(
        'aria-label',
        '프로필 잠금 설정을 취소하셨습니다. 이 프로필은 현재 잠금 설정이 되어있지 않습니다.'
      );
      clearInputs();
      myLockPassword = '';
      updateDialogTitle('default');
    }
  }

  toggleLabel.addEventListener('click', profileLocked);

  // 모달 닫기(ESC, 취소 버튼)

  function handleCloseModal() {
    if (currentProfile?.isPin) {
      updateTogglePosition(true);
      toggleLabel.classList.remove('toggle__unlocked');
      toggleLabel.classList.add('toggle__locked');
      toggleButton.setAttribute(
        'aria-label',
        '설정을 취소하셨습니다. 이 프로필은 현재 잠금 설정이 되어 있습니다.'
      );
    } else {
      updateTogglePosition(false);
      toggleLabel.classList.remove('toggle__locked');
      toggleLabel.classList.add('toggle__unlocked');
      toggleButton.setAttribute(
        'aria-label',
        '설정을 취소하셨습니다. 이 프로필은 현재 잠금 설정이 되어있지 않습니다.'
      );
    }
    toggleButton.setAttribute('aria-expanded', 'false');
    dialog.close();

    clearInputs();
    myLockPassword = '';
    updateDialogTitle('default');
  }
  dialogCancelButton.addEventListener('click', handleCloseModal);
  dialog.addEventListener('cancel', handleCloseModal);

  // 프로필 저장

  function saveUserProfile() {
    const currentProfile = JSON.parse(localStorage.getItem('currentProfile'));
    loading.show();
    if (!currentProfile) return;

    const ProfilePinNumber = JSON.parse(
      localStorage.getItem('saveProfilePinNumber')
    );

    if (page === 'edit') {
      updateUserProfile(ProfilePinNumber);
    } else {
      createUserProfile(ProfilePinNumber);
    }
  }
  submitButton.addEventListener('click', saveUserProfile);

  const updateUserProfile = async (ProfilePinNumber) => {
    const newName = nameInput.value || currentProfile.name;

    try {
      await updateRecord(
        'profileinfo',
        `user="${record.id}" && name="${currentProfile.name}"`,
        {
          name: newName,
          pin: ProfilePinNumber?.isPin ? myLockPassword : null,
        }
      );

      await setStorage('currentProfile', {
        name: newName,
        imgSrc: currentProfile?.imgSrc,
        isPin: ProfilePinNumber?.isPin ? myLockPassword : null,
      });

      loading.hide();
      sweetBasic('Updated Success', '프로필 업데이트가 완료되었습니다.').then(
        async (res) => {
          if (res.isConfirmed) {
            await deleteStorage('saveProfilePinNumber');
            location.href = '/src/pages/profile/profile_edit/index.html';
          }
        }
      );
    } catch (error) {
      loading.hide();
      console.log('Error updating user profile:', error);
      deleteStorage('saveProfilePinNumber');
      sweetError(
        'Update Failed',
        '프로필 업데이트 중 오류가 발생했습니다.<br/>잠시 후 다시 시도해 주세요.'
      );
    }
  };

  async function createUserProfile(ProfilePinNumber) {
    loading.show();
    const currentProfile = JSON.parse(localStorage.getItem('currentProfile'));
    const newName = nameInput.value;

    if (!newName) {
      loading.hide();
      sweetError(
        'Profile Name Required',
        '프로필 이름이 비어있습니다.<br/>이름을 입력해주세요!'
      );
      return;
    }

    try {
      const profiles = await getRecords('profileinfo', {
        filter: `user="${record.id}"`,
      });

      const isNameExists = profiles.some((profile) => profile.name === newName);
      if (isNameExists) {
        loading.hide();
        sweetError(
          'Create Failed',
          '이미 사용 중인 프로필 이름입니다.<br/>다른 이름을 입력해 주세요.'
        );
        return;
      }

      const newProfile = {
        user: record.id,
        name: newName,
        avatar: currentProfile?.imgSrc,
        pin: ProfilePinNumber?.isPin ? myLockPassword : null,
      };

      await createData('profileinfo', newProfile);
      await setStorage('currentProfile', {
        name: newName,
        imgSrc: currentProfile?.imgSrc,
        isPin: ProfilePinNumber?.isPin ? myLockPassword : null,
      });

      loading.hide();
      sweetBasic('Create Success', '프로필이 생성이 완료되었습니다.').then(
        async (res) => {
          if (res.isConfirmed) {
            await deleteStorage('saveProfilePinNumber');
            location.href = '/src/pages/profile/profile_select/index.html';
          }
        }
      );
    } catch (error) {
      loading.hide();
      console.log('Error updating user profile:', error);
      deleteStorage('saveProfilePinNumber');
      sweetError(
        'Create Failed',
        '프로필 생성 중 오류가 발생했습니다.<br/>잠시 후 다시 시도해 주세요.'
      );
    }
  }
}
