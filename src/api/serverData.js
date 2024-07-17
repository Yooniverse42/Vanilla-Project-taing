import pb from './pocketbase';

export function createData(src, data) {
  return pb.collection(src).create(data);
}

export function getData(src, option) {
  return pb.collection(src).getFullList(option);
}

export function getImageData(src) {
  return pb.collection(src).getList(1, 1);
}
