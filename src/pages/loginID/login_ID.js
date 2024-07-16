import '@/styles/pages/login_ID.scss';
import '@/layout/index';
import {
  getNode,
  emailReg,
  pwReg,
  debounce,
  setStorage,
} from '@/library/index';
import { authWithPassword } from '@/api/getRecords';

const loginButton = getNode('.login__button');
const loginUserID = getNode('#userEmail');
const loginUserPassword = getNode('#userPassword');
const idMessageError = getNode('.login__form__error__message');
const pwMessageError = getNode('.login__form__PWerror__message');

// 이메일 유효성 검사

let emailValid = false;

function handleEmailValid() {
  const value = loginUserID.value;

  if (emailReg(value)) {
    idMessageError.classList.remove('is--invalid');
    emailValid = true;
  } else {
    idMessageError.classList.add('is--invalid');
    emailValid = false;
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
  if (emailValid && pwValid) {
    const userEmail = loginUserID.value;
    const userPassword = loginUserPassword.value;

    try {
      const response = await authWithPassword(userEmail, userPassword);
      if (response.success) {
        setStorage('user', response.authData); //사용자 정보 로컬 스토리지에 저장
        location.href = '/src/pages/taing/index.html'; //로그인 성공!!
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
loginUserID.addEventListener('keydown', debounce(handleEmailValid, 100));
loginUserPassword.addEventListener(
  'keydown',
  debounce(handlePasswordValid, 100)
);
