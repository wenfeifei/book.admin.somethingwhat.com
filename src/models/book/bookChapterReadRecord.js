import { getListByPage } from '@/services/book/bookChapterReadRecord';

export default {
  namespace: 'bookChapterReadRecord',

  state: {
  },

  effects: {
    // 获取小说章节阅读记录
    *getListByPage({ payload }, { call, put }) {
      const response = yield call(getListByPage, payload);
      const { Data } = response
      // console.info('响应', response, Data);
      yield put({
        type: 'getListByPageReducer',
        payload: Data,
      });
    },
  },

  reducers: {
    getListByPageReducer(state, action) {
      return {
        ...state,
        resByGetListByPage: action.payload || {},
      };
    },
  },
};
