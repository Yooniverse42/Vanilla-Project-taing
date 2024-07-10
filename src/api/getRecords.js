import pb from '@/api/pocketbase';

export function getRecords(storage) {
  return pb.collection(storage).getFullList();
}
