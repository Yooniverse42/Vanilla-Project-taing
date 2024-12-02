import { insertLast } from '@/library/insert';
import { getNode, getNodes, setStorage, debounce } from '@/library/index';
import { authWithPassword } from '@/api/getRecords';

export async function renderProfileItem(movePage) {
  const userData = JSON.parse(localStorage.getItem('user'));
  const currentProfile = JSON.parse(localStorage.getItem('currentProfile'));

  if (!userData) {
    location.href = '/src/pages/loginID/';
    return;
  }

  const { record } = userData;
  const profiles = record.profiles || [];

  for (const item of profiles) {
    let href;
    if (movePage === 'main') {
      href = '/src/pages/taing/index.html';
    } else if (movePage === 'edit') {
      href = '/src/pages/profile_edit_detail/index.html';
    } else {
      href = '/src/pages/profile_select/';
    }

    // 프로필 아이템의 기본 구조만 먼저 추가
    const template = `
      <figure class="avatar">
        <a href="${href}" class="avatar__picture__container">
          <img src="${item.avatar}" alt="${item.name}의 프로필" />
        </a>
        <figcaption class="avatar__name">${item.name}</figcaption>
      </figure>`;
    insertLast('.profile__picture__container', template);

    const links = getNodes('.avatar__picture__container');
    links.forEach((link) => {
      const img = link.querySelector('img');
      const myProfileName = img.alt.replace('의 프로필', '');
      const password = profiles.find(
        (myProfile) => myProfile.name === myProfileName
      ).lockPassword;

      if (movePage === 'main' && password) {
        link.classList.add('is--locked');
      }

      if (movePage === 'edit') {
        link.classList.add('is--edit');
      }
    });
  }

  const avatars = getNodes('.avatar');
  const dialog = getNode('.dialog__container');
  const dialogAcct = getNode('.dialog__accountPw__container');
  const inputs = getNodes('input[id^="profilePw"]');
  const headerDefault = getNodes('.header__content__default');
  const headerNotMatch = getNodes('.header__content__notMatch');
  const resetMoalOpenButton = getNode('.dialog__reset__button');
  const inputAcctPassword = getNode('.input__reset__password');
  const cancelButton = getNodes('[class*="exit"]');
  const resetButton = getNode('.password__reset__button');

  avatars.forEach((avatar) => {
    avatar.addEventListener('click', (e) => {
      e.preventDefault();
      const link = avatar.querySelector('a');
      const selectProfile = link.querySelector('img');
      const selectProfileName = selectProfile.alt.replace('의 프로필', '');
      const selectProfilePassword = profiles.find(
        (item) => item.name === selectProfileName
      ).lockPassword;

      if (selectProfilePassword) {
        updateDialogTitle('dialog', 'default');
        dialog.showModal();

        inputs.forEach((input) => {
          input.addEventListener('input', (e) => {
            checkPassword(e, selectProfilePassword, link);
          });
        });
      } else {
        location.href = link.getAttribute('href');
      }
    });
  });

  // 비밀번호 확인
  function checkPassword(e, pw, link) {
    const inputPassword = Array.from(inputs)
      .map((input) => input.value)
      .join('');
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
    }

    if (inputPassword.length === 4) {
      if (inputPassword == pw) {
        dialog.close();
        location.href = link.getAttribute('href');
      } else {
        updateDialogTitle('dialog', 'notMatch');

        inputs.forEach((input) => (input.value = ''));
        inputs[0].focus();
      }
    }
  }

  // 비밀번호 초기화 모달 오픈
  async function resetModalOpen() {
    dialog.close();
    updateDialogTitle('dialogAcct', 'default');
    dialogAcct.showModal();
  }
  resetMoalOpenButton.addEventListener('click', resetModalOpen);

  // 비밀번호 초기화 진행
  async function passwordReset() {
    const currentUser = currentProfile.name;

    try {
      const response = await authWithPassword(
        record.email,
        inputAcctPassword.value
      );
      if (response.success) {
        userData.record.profiles = userData.record.profiles.map((profile) => {
          if (profile.name === currentUser) {
            return { ...profile, lockPassword: null };
          }
          return profile;
        });
        setStorage('currentProfile', { ...currentProfile, pw: null });
        setStorage('user', userData);
        dialogAcct.close();
      } else {
        updateDialogTitle('dialogAcct', 'notMatch');
        inputAcctPassword.value = '';
      }
    } catch (error) {
      console.error('Password reset error:', error);
      updateDialogTitle('dialogAcct', 'notMatch');
    } finally {
      inputAcctPassword.value = '';
    }
  }
  const debouncedPasswordReset = debounce(passwordReset, 1000);
  resetButton.addEventListener('click', debouncedPasswordReset);
  resetButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      debouncedPasswordReset;
    }
  });

  // 취소버튼
  function closeDialog() {
    inputs.forEach((input) => (input.value = ''));
    inputs[0].focus();
    inputAcctPassword.value = '';
    dialog.close();
    dialogAcct.close();
  }
  cancelButton.forEach((button) => {
    button.addEventListener('click', closeDialog);
  });
  dialog.addEventListener('cancel', closeDialog);
  dialogAcct.addEventListener('cancel', closeDialog);

  // 모달 타이틀 변경
  function updateDialogTitle(container, state) {
    if (container == 'dialog') {
      headerDefault[0].style.display = state === 'default' ? 'block' : 'none';
      headerNotMatch[0].style.display = state === 'notMatch' ? 'block' : 'none';
    }

    if (container == 'dialogAcct') {
      headerDefault[1].style.display = state === 'default' ? 'block' : 'none';
      headerNotMatch[1].style.display = state === 'notMatch' ? 'block' : 'none';
    }
  }
}
