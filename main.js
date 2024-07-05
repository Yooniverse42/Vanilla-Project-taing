import '@/styles/style.scss';
import pb from '@/api/pocketbase';

const records = await pb.collection('test').getFullList({
  sort: '-created',
});

console.log(records);
