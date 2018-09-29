import { getListByPage, add, update, del } from '@/services/book/bookUserMessage';

export default {
  namespace: 'bookUserMessage',

  state: {
  },

  effects: {
    // 分页查询数据
    *getListByPage({ payload }, { call, put }) {
      const response = yield call(getListByPage, payload);
      const { Data } = response
      // console.info('响应', response, Data);
      yield put({
        type: 'getListByPageReducer',
        payload: Data,
      });
    },
    // 新增
    *add({ payload }, { call, put }) {
      const response = yield call(add, payload);
      const { Data } = response
      yield put({
        type: 'addReducer',
        payload: Data,
      });
    },
    // 编辑
    *update({ payload }, { call, put }) {
      const response = yield call(update, payload);
      const { Data } = response
      yield put({
        type: 'updateReducer',
        payload: Data,
      });
    },
    // 删除
    *del({ payload }, { call, put }) {
      const response = yield call(del, payload);
      const { Data } = response
      yield put({
        type: 'delReducer',
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
    addReducer(state, action) {
      return {
        ...state,
        resByAdd: action.payload || null,
      };
    },
    updateReducer(state, action) {
      return {
        ...state,
        resByUpdate: action.payload || null,
      };
    },
    delReducer(state, action) {
      return {
        ...state,
        resByDel: action.payload || null,
      };
    },
  },
};
