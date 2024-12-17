import pb from './pocketbase';
import { sweetConfirm, sweetToast, sweetError } from '@/components/sweetAlert';

export function createData(src, data) {
  return pb.collection(src).create(data);
}

export function getData(src, option) {
  return pb.collection(src).getFullList(option);
}

export function getImageData(src) {
  return pb.collection(src).getList(1, 1);
}

export async function addProfile(userId, profileData) {
  try {
    const user = await pb.collection('users').getOne(userId);
    const currentProfiles = user.profiles || [];

    if (currentProfiles.length >= 4) {
      await sweetConfirm(
        'warning',
        '프로필 추가 실패',
        '프로필은 최대 4개까지 생성할 수 있습니다.',
        '확인'
      );
      return;
    }

    const newProfile = {
      id: `profile${currentProfiles.length + 1}`,
      name: profileData.name,
      avatar: profileData.avatar,
      lockPassword: null,
    };

    const updatedProfiles = [...currentProfiles, newProfile];

    const result = await pb
      .collection('users')
      .update(userId, { profiles: updatedProfiles });

    await sweetToast('success', '새로운 프로필이 추가되었습니다.');

    return result;
  } catch (error) {
    await sweetError('오류 발생', `프로필 추가 실패 : ${error.message}`);
  }
}
