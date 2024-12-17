import '@/pages/loginID/login_ID.scss';
import '@/layout/index';
import '@/components/loading.js';
import {
  getNode,
  idReg,
  pwReg,
  debounce,
  getStorage,
  setStorage,
} from '@/library/index';
import { authWithPassword } from '@/api/getRecords';
import { sweetError, sweetToast } from '@/components/sweetAlert';

const loading = getNode('c-loading');
const loginButton = getNode('.login__button');
const loginUserID = getNode('#userID');
const loginUserPassword = getNode('#userPassword');
const passwordToggleIcon = getNode('#userPasswordToggle');
const idMessageError = getNode('.id__error__message');
const pwMessageError = getNode('.pw__error__message');
const autoLoginCheck = getNode('.check');

// 비밀번호 표시/숨김 토글
passwordToggleIcon.addEventListener('change', () => {
  loginUserPassword.type = passwordToggleIcon.checked ? 'text' : 'password';
  passwordToggleIcon.classList.toggle('visible');
  passwordToggleIcon.setAttribute(
    'aria-label',
    passwordToggleIcon.checked ? '비밀번호 숨기기' : '비밀번호 표시'
  );
});

// 자동로그인 초기 상태 설정
let autoLogin = false;
getStorage('autoLogin')
  .then((result) => {
    autoLogin = result || false;
    if (autoLogin) {
      autoLoginCheck.classList.add('active');
    }
  })
  .catch(() => {
    autoLogin = false;
  });

// 자동로그인 아이콘 클릭 이벤트
autoLoginCheck.addEventListener('click', () => {
  autoLogin = !autoLogin;
  setStorage('autoLogin', autoLogin);
  autoLoginCheck.classList.toggle('active');
});

// 이메일 유효성 검사

let idValid = false;

function handleIdValid() {
  const value = loginUserID.value;

  if (idReg(value)) {
    idMessageError.classList.remove('is--invalid');
    idValid = true;
  } else {
    idMessageError.classList.add('is--invalid');
    idValid = false;
  }
}
// 비밀번호  유효성 검사
let pwValid = false;

function handlePasswordValid() {
  const value = loginUserPassword.value;
  if (pwReg(value)) {
    pwMessageError.classList.remove('is--invalid');
    pwValid = true;
  } else {
    pwMessageError.classList.add('is--invalid');
    pwValid = false;
  }
}
// 로그인
loginButton.addEventListener('click', async (e) => {
  loading.show();
  e.preventDefault();
  // 유효성 검사 통과 시 로그인 시도
  if (idValid && pwValid) {
    const userId = loginUserID.value;
    const userPassword = loginUserPassword.value;

    try {
      const response = await authWithPassword(userId, userPassword);
      if (response.success) {
        await setStorage('user', response.authData);
        location.href = '/src/pages/profile/profile_select/index.html';
      } else {
        loading.hide();
        sweetError('로그인 실패', `아이디 또는 비밀번호를 확인해 주세요.`);
      }
    } catch (error) {
      loading.hide();
      console.error('로그인 오류:', error);
      sweetToast(
        'error',
        '일시적인 오류로 로그인할 수 없습니다. 잠시 후 다시 이용해 주세요.'
      );
    }
  } else {
    loading.hide();
    sweetToast('info', '아이디와 비밀번호를 확인해 주세요.');
    loginUserID.focus();
  }
});

//  이벤트 실행
loginUserID.addEventListener('input', debounce(handleIdValid, 100));
loginUserID.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    loginUserPassword.focus();
  }
});
loginUserPassword.addEventListener('input', debounce(handlePasswordValid, 100));
loginUserPassword.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    loginButton.click();
  }
});
