import pb from '@/api/pocketbase';

export function getRecord(storage, option = false) {
  // filter 옵션이 있는 경우
  if (option)
    return pb.collection(storage).getList(1, 20, {
      filter: option,
    });

  // filter 옵션이 없는 경우
  if (!option) {
    return pb.collection(storage).getList(1, 20, {});
  }
}

export function getRecords(storage) {
  return pb.collection(storage).getFullList();
}
