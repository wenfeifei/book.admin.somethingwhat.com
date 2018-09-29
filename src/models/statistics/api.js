import {
  bookUserStatistics, bookUserTimeSlotStatistics, bookUserGenderStatistics, readUserStatistics,
  bookUserReadStatistics, bookReadTimeSlotStatistics, getMostPopularBook, getReadRanking,
} from '@/services/statistics/api';

export default {
  namespace: 'statistics',

  state: {
  },

  effects: {
    // 新增用户统计、新增小说用户统计
    *getBookUserStatistics({ payload }, { call, put }) {
      const response = yield call(bookUserStatistics, payload);
      const { Data } = response
      // console.info('响应', response, Data);
      yield put({
        type: 'getBookUserStatisticsReducer',
        payload: Data,
      });
    },
    // 时间段（每小时）新增用户统计
    *getBookUserTimeSlotStatistics({ payload }, { call, put }) {
      const response = yield call(bookUserTimeSlotStatistics, payload);
      const { Data } = response
      // console.info('响应', response, Data);
      yield put({
        type: 'getBookUserTimeSlotStatisticsReducer',
        payload: Data,
      });
    },
    // 新增用户 （男女分组）统计
    *getBookUserGenderStatistics({ payload }, { call, put }) {
      const response = yield call(bookUserGenderStatistics, payload);
      const { Data } = response
      // console.info('响应', response, Data);
      yield put({
        type: 'getBookUserGenderStatisticsReducer',
        payload: Data,
      });
    },
    // 新增用户 （男女分组）统计
    *getByReadUserStatistics({ payload }, { call, put }) {
      const response = yield call(readUserStatistics, payload);
      const { Data } = response
      // console.info('响应', response, Data);
      yield put({
        type: 'getByReadUserStatisticsReducer',
        payload: Data,
      });
    },
    // 用户阅读统计（参与阅读用户数、阅读章节数）
    *getByBookUserReadStatistics({ payload }, { call, put }) {
      const response = yield call(bookUserReadStatistics, payload);
      const { Data } = response
      // console.info('响应', response, Data);
      yield put({
        type: 'getByBookUserReadStatisticsReducer',
        payload: Data,
      });
    },
    // 时间段（每小时）阅读小说数、时间段（每小时）阅读小说章节数 统计
    *getByBookReadTimeSlotStatistics({ payload }, { call, put }) {
      const response = yield call(bookReadTimeSlotStatistics, payload);
      const { Data } = response
      // console.info('响应', response, Data);
      yield put({
        type: 'getByBookReadTimeSlotStatisticsReducer',
        payload: Data,
      });
    },
    // 最受欢迎小说排行
    *getByMostPopularBook({ payload }, { call, put }) {
      const response = yield call(getMostPopularBook, payload);
      const { Data } = response
      // console.info('响应', response, Data);
      yield put({
        type: 'getByMostPopularBookReducer',
        payload: Data,
      });
    },
    // 阅读排行榜
    *getByReadRanking({ payload }, { call, put }) {
      const response = yield call(getReadRanking, payload);
      const { Data } = response
      // console.info('响应', response, Data);
      yield put({
        type: 'getByReadRankingReducer',
        payload: Data,
      });
    },
  },

  reducers: {
    getBookUserStatisticsReducer(state, action) {
      return {
        ...state,
        resByBookUserStatistics: action.payload || null,
      };
    },
    getBookUserTimeSlotStatisticsReducer(state, action) {
      return {
        ...state,
        resByBookUserTimeSlotStatistics: action.payload || null,
      };
    },
    getBookUserGenderStatisticsReducer(state, action) {
      return {
        ...state,
        resByBookUserGenderStatistics: action.payload || null,
      };
    },
    getByReadUserStatisticsReducer(state, action) {
      return {
        ...state,
        resByReadUserStatistics: action.payload || null,
      };
    },
    getByBookUserReadStatisticsReducer(state, action) {
      return {
        ...state,
        resByBookUserReadStatistics: action.payload || null,
      };
    },
    getByBookReadTimeSlotStatisticsReducer(state, action) {
      return {
        ...state,
        resByBookReadTimeSlotStatistics: action.payload || null,
      };
    },
    getByMostPopularBookReducer(state, action) {
      return {
        ...state,
        resByMostPopularBook: action.payload || null,
      };
    },
    getByReadRankingReducer(state, action) {
      return {
        ...state,
        resByReadRanking: action.payload || null,
      };
    },
  },
};
