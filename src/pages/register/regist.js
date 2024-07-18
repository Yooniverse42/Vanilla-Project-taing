import '@/pages/register/regist.scss';
import '@/layout/index';
import { createData, getData, getImageData } from '@/api/serverData';
import getPbImageURL from '@/api/getPbImageURL';
import { getNode, emailReg, idReg } from '@/library/index';

// 로그인 시 {token, model:{username, name, id, email}}
const id = 'kor123@gmail.com';
const pw = 'gksrnrtkfka12!';

const registerForm = getNode('.input-form');
const idInput = getNode('#idInput');
const pwInput = getNode('#pwInput');
const pwCheckInput = getNode('#pwCheckInput');
const emailInput = getNode('#emailInput');
const confirmButton = getNode('.confirm-button');
const modal = getNode('.modal');

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

const errorMessage = getNode('.email__error');

confirmButton.addEventListener('click', createAccount);

// 입력 폼 초기화 추가
// 중복 요소
async function createAccount() {
  const id = idInput.value;
  const pw = pwInput.value;
  const pwCheck = pwCheckInput.value;
  const email = emailInput.value;
  const imageBlob = await getImageData('profile') //
    .then((response) => ({
      ...response.items[0],
      photo: [response.items[0].field],
    }))
    .then((item) => getPbImageURL(item)) //
    .then((url) => fetch(url))
    .then((response) => response.blob());

  const form = new FormData();
  form.append('avatar', imageBlob);
  console.log(form.get('avatar'));
  const data = {
    username: id,
    name: id,
    email: email,
    password: pw, //8자 이상
    passwordConfirm: pwCheck, //8자 이상
    emailVisibility: true,
    avatar: form.get('avatar'),
  };

  const sameIdEmail = await getData('users', {
    filter: `username='${data.username}'|| email='${data.email}'`,
  }).then((result) => result.length);

  if (sameIdEmail) {
    alert('아이디 또는 이메일이 이미 존재합니다');
    return;
  } else {
    modal.classList.add('modal-active');

    createData('users', data)
      .then((data) => {
        modal.classList.remove('modal-active');
        alert(`${data.username}님 가입이 완료되었습니다`);
      })
      .then(() => (location.href = 'src/pages/loginID/index.html'));
    registerForm.reset();
    // 입력 폼 초기화 추가
  }
}

// 유효성
function idValidation(e) {
  const value = e.target.value;
  // const idReg = /^[a-z]+[a-z0-9]{5,12}$/g;
  buttonState['idState'] = idReg(value);
  activeButtonState(buttonState);

  if (!idReg(value)) {
    getNode('.user-email > span').classList.add('error');
  } else {
    getNode('.user-email > span').classList.remove('error');
  }
}

function pwValidation(e) {
  const value = e.target.value;
  const symbolReg = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
  const result =
    symbolReg.test(value) && value.length >= 6 && value.length <= 16;
  buttonState['pwState'] = result;
  activeButtonState(buttonState);

  if (!result) {
    getNode('.user-password > span').classList.add('error');
  } else {
    getNode('.user-password > span').classList.remove('error');
  }
}

function pwCheckValidation(e) {
  const value = e.target.value;
  const result = pwInput.value === value;
  buttonState['pwCheckState'] = result;
  activeButtonState(buttonState);

  if (!result) {
    getNode('.pwCheckInput__error').classList.add('error');
  } else {
    getNode('.pwCheckInput__error').classList.remove('error');
  }
  
}

function emailValidation(e) {
  const value = e.target.value;
  const emailRule = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  if (emailRule.test(value) || value === '') {
    errorMessage.classList.remove('display');
  } else {
    errorMessage.classList.add('display');
  }
  buttonState['emailState'] = emailRule.test(value);
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

//체크박스
const checkAllButton = getNode('.check-all-checkbox');
const checkListitems = document.querySelectorAll('.check-list-container input');

checkAllButton.addEventListener('click', (e) => {
  const checkAll = e.target.checked;

  if (checkAll) {
    checkListitems.forEach((item) => (item.checked = true));
    buttonState.checkState = true;
  } else {
    checkListitems.forEach((item) => (item.checked = false));
    buttonState.checkState = false;
  }
  activeButtonState(buttonState);
});

function getCheckState() {
  const necessaryCheck = document.querySelectorAll('.necessary');
  const length = Array.from(necessaryCheck).filter(
    (item) => item.checked
  ).length;
  const result = length === necessaryCheck.length;
  checkAllButton.checked = result;
  buttonState['checkState'] = result;

  activeButtonState(buttonState);
  console.log(buttonState);
}

const checkListContainer = document.querySelector('.check-list-container');

//closest 사용 필 나중에 수정
checkListContainer.addEventListener('click', () => {
  getCheckState();
});
