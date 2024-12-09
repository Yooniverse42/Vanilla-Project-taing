import '@/styles/pages/profile.scss';
import '@/layout/footer';
import { renderProfileItem } from '@/layout/profile_item';
import { getNode } from '@/library/index';
renderProfileItem('main');

const avatarsEditButton = getNode('.edit__button');

// 프로필 편집 (전체 페이지)
function editPage() {
  location.href = '/src/pages/profile_edit/index.html';
}
avatarsEditButton.addEventListener('click', editPage);
