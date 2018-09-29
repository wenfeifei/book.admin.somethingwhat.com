import { getListByPage } from '@/services/book/sysInterfaceRecord';

export default {
  namespace: 'sysInterfaceRecord',

  state: {
  },

  effects: {
    // 获取接口访问记录
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
