import { getListByPage, getSingleById, addCurrency, getBookSummary, getWechatPayOrderByPage } from '@/services/book/bookUser';

export default {
  namespace: 'bookUser',

  state: {
  },

  effects: {
    // book用户列表数据
    *getListByPage({ payload }, { call, put }) {
      const response = yield call(getListByPage, payload);
      const { Data } = response
      // console.info('响应', response, Data);
      yield put({
        type: 'getListByPageReducer',
        payload: Data,
      });
    },
    // book用户数据
    *getSingleById({ payload }, { call, put }) {
      const response = yield call(getSingleById, payload);
      const { Data } = response
      yield put({
        type: 'getSingleByIdReducer',
        payload: Data,
      });
    },
    // 管理员赠送喵币
    *addCurrency({ payload }, { call, put }) {
      const response = yield call(addCurrency, payload);
      yield put({
        type: 'addCurrencyReducer',
        payload: response,
      });
    },
    // 获取用户的概括信息：阅读时长、阅读记录、收藏书本
    *getBookSummary({ payload }, { call, put }) {
      const response = yield call(getBookSummary, payload);
      const { Data } = response
      yield put({
        type: 'getBookSummaryReducer',
        payload: Data,
      });
    },
    // 获取用户订单记录
    *getWechatPayOrderByPage({ payload }, { call, put }) {
      const response = yield call(getWechatPayOrderByPage, payload);
      const { Data } = response
      yield put({
        type: 'getWechatPayOrderByPageReducer',
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
    getSingleByIdReducer(state, action) {
      return {
        ...state,
        resByGetSingleById: action.payload || {},
      };
    },
    addCurrencyReducer(state, action) {
      return {
        ...state,
        resByAddCurrency: action.payload || {},
      };
    },
    getBookSummaryReducer(state, action) {
      return {
        ...state,
        resByGetBookSummary: action.payload || {},
      };
    },
    getWechatPayOrderByPageReducer(state, action) {
      return {
        ...state,
        resByGetWechatPayOrder: action.payload || {},
      };
    },
  },
};
