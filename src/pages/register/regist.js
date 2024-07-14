import '@/styles/pages/regist.scss';
import '@/layout/footer';
import { getNode } from './../../library/getNode';
import { createData, getData } from '../../api/serverData';

// 로그인 시 {token, model:{username, name, id, email}}
const id = 'kor123@gmail.com';
const pw = 'gksrnrtkfka12!';

const registerForm = getNode('.input-form');
const idInput = getNode('#idInput');
const pwInput = getNode('#pwInput');
const pwCheckInput = getNode('#pwCheckInput');
const emailInput = getNode('#emailInput');
const confirmButton = getNode('.confirm-button');

const buttonState = {
  idState: false,
  emailState: false,
  pwState: false,
  pwCheckState: false,
  checkState: false,
};

idInput.addEventListener('input', idValidation);
emailInput.addEventListener('input', emailValidation);
pwInput.addEventListener('input', pwValidation);
pwCheckInput.addEventListener('input', pwCheckValidation);

confirmButton.addEventListener('click', createAccount);

// 입력 폼 초기화 추가
// 중복 요소
async function createAccount() {
  const id = idInput.value;
  const pw = pwInput.value;
  const pwCheck = pwCheckInput.value;
  const email = emailInput.value;

  const data = {
    username: id,
    name: id,
    email: email,
    password: pw, //8자 이상
    passwordConfirm: pwCheck, //8자 이상
    emailVisibility: true,
  };

  const sameIdEmail = await getData('users', {
    filter: `username='${data.username}'|| email='${data.email}'`,
  }).then((result) => result.length);

  if (sameIdEmail) {
    console.log('중복');
    alert('아이디 또는 이메일이 이미 존재합니다');
    return;
  } else {
    console.log('중복 ㄴㄴ');

    createData('users', data)
      .then((data) => alert(`${data.username}님 가입이 완료되었습니다`))
      .then(() => (location.href = 'src/pages/loginID/index.html'));
    registerForm.reset();
    // 입력 폼 초기화 추가
  }
}

// 유효성
function idValidation(e) {
  const value = e.target.value;
  const idReg = /^[a-z]+[a-z0-9]{5,12}$/g;
  value.match(idReg)
    ? (buttonState.idState = true)
    : (buttonState.idState = false);
  activeButtonState(buttonState);
}

function pwValidation(e) {
  const value = e.target.value;
  const symbolReg = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

  value.match(symbolReg) && value.length >= 6 && value.length <= 16
    ? (buttonState.pwState = true)
    : (buttonState.pwState = false);
  activeButtonState(buttonState);
}

function pwCheckValidation(e) {
  const value = e.target.value;
  pwInput.value === value
    ? (buttonState.pwCheckState = true)
    : (buttonState.pwCheckState = false);
  activeButtonState(buttonState);
}

function emailValidation(e) {
  const value = e.target.value;
  const emailRule = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

  value.match(emailRule)
    ? (buttonState.emailState = true)
    : (buttonState.emailState = false);
  console.log('buttonState', buttonState);
  activeButtonState(buttonState);
}

//확인 버튼 활성화
function activeButtonState({
  idState,
  pwState,
  pwCheckState,
  emailState,
  checkState,
}) {
  if (idState && emailState && pwCheckState && pwState && checkState) {
    confirmButton.disabled = false;
    confirmButton.classList.add('active');
  } else {
    confirmButton.disabled = true;
    confirmButton.classList.remove('active');
  }
}

//계정 삭제
// const deleteButton = document.querySelector('.delete');
// deleteButton.addEventListener('click', deleteUser);
// async function deleteUser(auth) {
//   console.log('delete');
//   await pb.collection('users').delete(auth.user.model.id);
// }

//계정 중복 확인

//체크박스
const checkAllButton = getNode('.check-all-checkbox');
const checkListitems = document.querySelectorAll('.check-list-container input');

console.log('checkAllButton', checkAllButton);
checkAllButton.addEventListener('click', (e) => {
  const checkAll = e.target.checked;

  if (checkAll) {
    checkListitems.forEach((item) => (item.checked = true));
  } else {
    checkListitems.forEach((item) => (item.checked = false));
  }
});

function getCheckState() {
  const necessaryCheck = document.querySelectorAll('.necessary');
  const length = Array.from(necessaryCheck).filter(
    (item) => item.checked
  ).length;

  length === necessaryCheck.length
    ? (buttonState.checkState = true)
    : (buttonState.checkState = false);
  activeButtonState(buttonState);
}

const checkListContainer = document.querySelector('.check-list-container');

//closest 사용 필 나중에 수정
checkListContainer.addEventListener('click', () => {
  getCheckState();
});

//
//
//
//

//
//
//

//
//
//

//
//
//
//
//
//

//
//
//

//
//
//

//
//
//
//
//
//

//
//
//

//
//
//

//
//
//
//
//
//

//
//
//

//
//
//

//
//

//
// - 회원가입을 통해 사용자(user)를 생성하고 관리합니다.
// - 데이터 통신을 통해 유저를 생성하고 관리해주세요 V
// - 유저의 회원을 탈퇴할 수 있는 기능을 구현해주세요
// - 로그인된 유저를 인식하여 UI를 다르게 랜더링해주세요
// - 로그인되지 않은 사용자면 회원가입 페이지로 리디렉션 시켜주세요
// - 회원가입시 중복된 유저가 있는지 체크해주세요

// function aa() {
//   window.location.href = 'http://www.naver.com/';
// }
// aa();

//로그인
// await pb.collection('users').authWithPassword(data.name, data.password);

//중복
// function checkSameIdEmail(username, email) {
//   return pb
//     .collection('users')
//     .getFullList({
//       filter: `username='${username}'|| email='${email}'`,
//     })
//     .then((result) => result.length);
//   // return result;
//   //?filter=(id='abc' && created>'2022-01-01')
// }
