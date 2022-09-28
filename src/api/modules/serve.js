import { instance } from "../https";

const SERVE = {
  // 卡片相關
  CARDS: {
    GET_All_CARDS: (params) => instance.get('cards', { params }),
  },
  // 系列相關
  SETS: {
    GET_ALL_SETS: () => instance.get('sets'),
  }
};

export default SERVE;