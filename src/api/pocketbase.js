import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_PB_URL);
// pb.autoCancellation(false);
// pocketbase에서 저장소 중복 호출 막아둠

export default pb;
