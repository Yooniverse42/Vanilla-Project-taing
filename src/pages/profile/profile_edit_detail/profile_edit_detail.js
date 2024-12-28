import '@/layout/index';
import '@/styles/pages/profile_detail.scss';
import { renderProfileForm } from '@/pages/profile/profile_form.js';
import pb from '@/api/pocketbase';
import { getRecords } from '@/api/getRecords';
import { getNode, deleteStorage } from '@/library/index';
import {
  sweetConfirm,
  sweetBasic,
  sweetError,
  sweetToast,
} from '@/components/sweetAlert';
import '@/components/loading.js';

renderProfileForm('edit');

const deleteProfileButton = getNode('.profile__delete');

function renderProfile() {
  const loading = getNode('c-loading');
  const avatarImg = getNode('.avatar__img');
  const currentProfile = JSON.parse(localStorage.getItem('currentProfile'));
  const nameInput = getNode('.profileName__input');
  if (!currentProfile) return;

  nameInput.placeholder = `현재 사용자 이름 : ${currentProfile.name}`;
  avatarImg.setAttribute('src', currentProfile.imgSrc);
  avatarImg.setAttribute('alt', `${currentProfile.name}의 프로필`);
  loading.hide();
}
renderProfile();

async function deleteProfile() {
  try {
    const loading = getNode('c-loading');
    loading.show();

    const user = JSON.parse(localStorage.getItem('user'));
    const { record } = user;
    const profiles = await getRecords('profileinfo', {
      filter: `user="${record.id}"`,
    });

    loading.hide();

    if (profiles.length === 1) {
      sweetToast('warning', '마지막 프로필은 삭제할 수 없습니다.');
      return;
    }

    const confirmResult = await sweetConfirm(
      'warning',
      '정말 삭제하시겠습니까?',
      '삭제 시 시청내역과 구매내역 모두 삭제되며,<br />이 작업은 되돌릴 수 없습니다.',
      '확인',
      false,
      '취소'
    );

    if (!confirmResult.isConfirmed) {
      return;
    }

    loading.show();

    const currentProfile = JSON.parse(localStorage.getItem('currentProfile'));
    const myRecord = await pb
      .collection('profileinfo')
      .getFirstListItem(
        `user = "${record.id}" && name = "${currentProfile.name}"`
      );

    await pb.collection('profileinfo').delete(myRecord.id);
    deleteStorage('currentProfile');

    loading.hide();

    const result = await sweetBasic(
      'Delete Success',
      '확인을 누르면 프로필 선택 페이지로 이동합니다.'
    );

    if (result.isConfirmed) {
      location.href = '/src/pages/profile/profile_select/';
    }
  } catch (error) {
    const loading = getNode('c-loading');
    loading.hide();

    console.error('프로필 삭제 중 오류 발생:', error);

    if (error.status === 404) {
      sweetError('Delete Failed', '삭제할 프로필을 찾을 수 없습니다.');
    } else {
      sweetError(
        'Delete Failed',
        '프로필 삭제 중 오류가 발생했습니다.<br/>잠시 후 다시 시도해 주세요.'
      );
    }
  }
}
deleteProfileButton.addEventListener('click', deleteProfile);
