import '@/layout/index';
import '@/styles/pages/profile_detail.scss';
import { renderProfileForm } from '@/pages/profile/profile_form.js';
import { getRecords } from '@/api/getRecords';
import { getImageData } from '@/api/serverData';
import { getNode, setStorage } from '@/library/index';
import '@/components/loading.js';

renderProfileForm('create');

async function renderProfile() {
  const loading = getNode('c-loading');
  const { record } = JSON.parse(localStorage.getItem('user'));
  const avatarImg = getNode('.avatar__img');
  const profiles = await getRecords('profileinfo', {
    filter: `user="${record.id}"`,
  });

  const existingAvatars = profiles.map((profile) => {
    return profile.avatar.split('/').pop();
  });

  const profileImages = await getImageData('profile').then(
    (response) => response.items[0].photo
  );

  const availableImages = profileImages.filter(
    (image) => !existingAvatars.includes(image)
  );

  const randomImage =
    availableImages[Math.floor(Math.random() * availableImages.length)];

  const urlParts = profiles[0].avatar.split('/');
  urlParts[urlParts.length - 1] = randomImage;
  const newAvatarUrl = urlParts.join('/');

  if (newAvatarUrl) {
    avatarImg.setAttribute('src', newAvatarUrl);
    avatarImg.setAttribute('alt', '새로운 프로필');
    setStorage('currentProfile', {
      name: null,
      imgSrc: newAvatarUrl,
      isPin: null,
    });
  }
  loading.hide();
}
renderProfile();
