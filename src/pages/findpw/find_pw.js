import '@/pages/findpw/find_pw.scss';
import '@/layout/index';
import { getNode, idReg, debounce } from '@/library/index';
import { getRecord } from '@/api/getRecords';

const checkButton = getNode('.check__email');
const userId = getNode('#findPw__id');
const errorMessage = getNode('.error-message');
const buttonDelete = getNode('.button__delete');

// 이메일 유효성 검사
let isEmailValid = false;

function handleEmailValid() {
  const value = userId.value;

  if (idReg(value)) {
    // 유효한 값이면 true : display: none;
    errorMessage.classList.remove('is--invalid');
    isEmailValid = true;
  } else {
    // 유효한 값이 아니면 false : display : block;
    errorMessage.classList.add('is--invalid');
    isEmailValid = false;
  }
}

// 확인 버튼 활성화 기능
function checkButtonOn() {
  if (!userId.value) {
    checkButton.disabled = 'disabled';
    checkButton.style.color = '#B6B7B4';
  } else {
    checkButton.disabled = false;
    checkButton.style.color = 'black';
  }
}

// input value 삭제 버튼 활성화 기능
function deleteButtonOn() {
  if (!userId.value) {
    buttonDelete.classList.remove('is--valid');
  } else {
    buttonDelete.classList.add('is--valid');
  }
}

// 서버에서 아이디 찾기
// 입력한 이메일이 서버에 있으면 아이디 알려주기

async function checkUserEmail() {
  const filter = `id = "${userId.value}"`;
  const userRecord = await getRecord('users', filter);

  if (userRecord.items.length >= 1 && isEmailValid) {
    alert(
      `등록하신 이메일로 비밀번호가 전송되었습니다. 이메일을 확인 해주세요.`
    );
  } else {
    alert('입력하신 아이디를 다시 확인 해주세요!');
  }
}

// 이벤트 실행
userId.addEventListener('keydown', debounce(handleEmailValid, 100));
userId.addEventListener('keydown', debounce(deleteButtonOn, 100));
userId.addEventListener('keydown', debounce(checkButtonOn, 100));
buttonDelete.addEventListener('click', debounce(checkButtonOn, 100));
checkButton.addEventListener('click', checkUserEmail);
