import '@/pages/loginID/login_ID.scss';
import '@/layout/index';
import {
  getNode,
  idReg,
  pwReg,
  debounce,
  getStorage,
  setStorage,
} from '@/library/index';
import { authWithPassword } from '@/api/getRecords';

const loginButton = getNode('.login__button');
const loginUserID = getNode('#userID');
const loginUserPassword = getNode('#userPassword');
const idMessageError = getNode('.id__error__message');
const pwMessageError = getNode('.pw__error__message');
const autoLoginCheck = getNode('.check');
const passwordHideIcon = getNode('.hide__icon');

// 지동로그인
let autoLogin = getStorage('autoLogin') || false;
if (autoLogin) {
  autoLoginCheck.classList.add('active');
}
// 지동로그인 아이콘 클릭 이벤트
autoLoginCheck.addEventListener('click', () => {
  autoLogin = !autoLogin;
  setStorage('autoLogin', autoLogin);
  autoLoginCheck.classList.toggle('active');
});
// 비밀번호 표시
let passwordVisible = false;
passwordHideIcon.addEventListener('click', () => {
  passwordVisible = !passwordVisible;
  loginUserPassword.type = passwordVisible ? 'text' : 'password';
  passwordHideIcon.classList.toggle('visible');
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
  e.preventDefault();
  // 유효성 검사 통과 시 로그인 시도
  if (idValid && pwValid) {
    const userId = loginUserID.value;
    const userPassword = loginUserPassword.value;

    try {
      const response = await authWithPassword(userId, userPassword);
      if (response.success) {
        setStorage('user', response.authData); //사용자 정보 로컬 스토리지에 저장
        location.href = '/src/pages/profile_select/index.html'; //로그인 성공!!
      } else {
        alert('로그인 실패:' + response.error);
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  } else {
    alert('아이디와 비밀번호를 확인해 주세요.');
  }
});

//  이벤트 실행
loginUserID.addEventListener('keydown', debounce(handleIdValid, 100));
loginUserPassword.addEventListener(
  'keydown',
  debounce(handlePasswordValid, 100)
);
