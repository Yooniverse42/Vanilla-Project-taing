import { getNode, getNodes, setStorage } from '@/library/index';
import { authWithPassword, getRecords, updateRecord } from '@/api/getRecords';
import gsap from 'gsap';
import '@/components/loading.js';

export async function renderProfileItem(movePage) {
  const loading = getNode('c-loading');
  loading.show();
  const userData = JSON.parse(localStorage.getItem('user'));
  const currentProfile = JSON.parse(localStorage.getItem('currentProfile'));

  if (!userData) {
    loading.hide();
    location.href = '/src/pages/loginID/';
    return;
  }

  const { record } = userData;
  const profiles = await getRecords('profileinfo', {
    filter: `user="${record.id}"`,
  });

  const templates = profiles
    .map((item) => {
      let href;
      if (movePage === 'main') {
        href = '/src/pages/taing/index.html';
      } else if (movePage === 'edit') {
        href = '/src/pages/profile/profile_edit_detail/index.html';
      } else {
        href = '/src/pages/profile/profile_select/';
      }

      return `
      <figure class="avatar">
        <a href="${href}" class="avatar__picture__container${
          movePage === 'main' && Boolean(item.pin) ? ' is--locked' : ''
        }${movePage === 'edit' ? ' is--edit' : ''}">
          <img src="${item.avatar}" alt="${item.name}의 프로필" />
        </a>
        <figcaption class="avatar__name">${item.name}</figcaption>
      </figure>`;
    })
    .join('');

  const container = document.querySelector('.profile__picture__container');
  container.innerHTML = templates;
  loading.hide();

  const avatars = getNodes('.avatar');
  const dialog = getNode('.dialog__container');
  const dialogAcct = getNode('.dialog__accountPw__container');
  const inputs = getNodes('input[id^="profilePw"]');
  const headerDefault = getNodes('.header__content__default');
  const headerNotMatch = getNodes('.header__content__notMatch');
  const resetMoalOpenButton = getNode('.dialog__reset__button');
  const inputAcctPassword = getNode('.input__reset__password');
  const cancelButton = getNodes('[class*="exit"]');
  const resetInput = getNode('#input__reset__pin');
  const resetButton = getNode('.password__reset__button');

  avatars.forEach((avatar) => {
    gsap.fromTo(avatar, { scale: 0 }, { scale: 1 });
    avatar.addEventListener('mouseenter', () => {
      gsap.to(avatar, { y: -20 });
    });
    avatar.addEventListener('mouseleave', () => {
      gsap.to(avatar, { y: 0 });
    });
    avatar.addEventListener('click', async (e) => {
      e.preventDefault();
      const link = avatar.querySelector('a');
      const selectProfile = link.querySelector('img');
      const selectProfileName = selectProfile.alt.replace('의 프로필', '');
      const profile = profiles.find((item) => item.name === selectProfileName);
      const pin = profile.pin;

      await setStorage('currentProfile', {
        name: selectProfileName,
        imgSrc: selectProfile.src,
        isPin: Boolean(pin),
      });

      if (pin) {
        updateDialogTitle('dialog', 'default');
        dialog.showModal();

        inputs.forEach((input) => {
          input.addEventListener('input', (e) => {
            checkPassword(e, pin, link);
          });
        });
      } else {
        location.href = link.getAttribute('href');
      }
    });
  });

  // 비밀번호 확인
  function checkPassword(e, pin, link) {
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
      if (inputPassword == pin) {
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
  function resetModalOpen() {
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
        dialogAcct.close();
        setStorage('currentProfile', { ...currentProfile, isPin: false });

        const currentProfileImg = document.querySelector(
          `img[alt="${currentUser}의 프로필"]`
        );
        if (currentProfileImg) {
          const linkContainer = currentProfileImg.closest(
            '.avatar__picture__container'
          );
          linkContainer.classList.remove('is--locked');
        }

        updateRecord(
          'profileinfo',
          `user="${record.id}" && name="${currentUser}"`,
          { pin: null }
        );
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

  if (resetButton) {
    resetButton.addEventListener('click', passwordReset);
  }
  if (resetInput) {
    resetInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        passwordReset();
      }
    });
  }

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
