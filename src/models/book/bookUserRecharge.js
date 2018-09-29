import { getListByPage } from '@/services/book/bookUserRecharge';

export default {
  namespace: 'bookUserRecharge',

  state: {
  },

  effects: {
    // 用户阅读偏好
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
