import pb from './pocketbase';

export function createData(src, data) {
  return pb.collection(src).create(data);
}

export function getData(src, option) {
  return pb.collection(src).getFullList(option);
}
