import { getRecentReadingByPage, getListByPage } from '@/services/book/bookReadRecord';

export default {
  namespace: 'bookReadRecord',

  state: {
  },

  effects: {
    // 获取最近的阅读
    *getRecentReadingByPage({ payload }, { call, put }) {
      const response = yield call(getRecentReadingByPage, payload);
      const { Data } = response
      // console.info('响应', response, Data);
      yield put({
        type: 'getRecentReadingByPageReducer',
        payload: Data,
      });
    },
    // 获取用户阅读记录（小说基本信息）
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
    getRecentReadingByPageReducer(state, action) {
      return {
        ...state,
        resByGetRecentReadingByPage: action.payload || {},
      };
    },
    getListByPageReducer(state, action) {
      return {
        ...state,
        resByGetListByPage: action.payload || {},
      };
    },
  },
};
