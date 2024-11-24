import '/src/pages/findId/find_id.scss';
import '@/layout/index';
import { getNode, emailReg, debounce } from '@/library/index';
import { getRecord } from '@/api/getRecords';
import { sweetConfirm, sweetToast } from '@/layout/sweetAlert';

const checkButton = getNode('.check_email_button');
const userId = getNode('#findId_email');
const errorMessage = getNode('.error-message');
const buttonDelete = getNode('.button_delete');
const buttonValidThirdparty = getNode('.button_valid_thirdparty');

// 이메일 유효성 검사
let isEmailValid = false;

function handleEmailValid() {
  const value = userId.value;

  if (emailReg(value)) {
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
  if (!emailReg(userId.value)) {
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

// 본인 인증하기 버튼 시 연결
function popUp() {
  const url = 'https://nice.checkplus.co.kr/cert/main/menu';
  window.open(url, '본인인증', 'width:480 height:800');
}

// 서버에서 아이디 찾기
// 입력한 이메일이 서버에 있으면 아이디 알려주기

async function checkUserEmail() {
  const filter = `email = "${userId.value}"`;
  const userRecord = await getRecord('users', filter);
  const userInfo = userRecord.items[0];

  if (userRecord.items.length >= 1 && isEmailValid) {
    sweetConfirm(
      'info',
      '아이디 찾기 결과',
      `<p>아이디는<span style="font-weight: bold; color: #fd2739"> ${userInfo.username} </span>입니다.</p>`,
      '로그인 하기',
      '비밀번호 찾기',
      '다른 아이디 찾기'
    ).then((res) => {
      if (res.isConfirmed) {
        window.location.href = '/src/pages/loginID/';
      }
      if (res.isDenied) {
        window.location.href = '/src/pages/findPw/';
      }
    });
  } else {
    sweetToast('info', '입력하신 이메일을 다시 확인해 주세요!');
  }
}

// 이벤트 실행
userId.addEventListener('input', handleEmailValid);
userId.addEventListener('input', deleteButtonOn);
userId.addEventListener('input', checkButtonOn);
buttonDelete.addEventListener('click', debounce(checkButtonOn, 100));
buttonValidThirdparty.addEventListener('click', popUp);
checkButton.addEventListener('click', checkUserEmail);

userId.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    checkUserEmail();
  }
});
