import {
  getAnalysisDailyVisitTrend, getAnalysisWeeklyVisitTrend, getAnalysisMonthlyVisitTrend,
  getAnalysisDailyRetain, getAnalysisWeeklyRetain, getAnalysisMonthlyRetain,
  getAnalysisDailySummary, getAnalysisUserPortrait, getAnalysisVisitDistribution, getAnalysisVisitPage,
} from '@/services/analysis/api';

export default {
  namespace: 'analysis',

  state: {
  },

  effects: {
    // 获取用户访问小程序数据日趋势
    *getAnalysisDailyVisitTrend({ payload }, { call, put }) {
      const response = yield call(getAnalysisDailyVisitTrend, payload);
      const { Data } = response
      yield put({
        type: 'getAnalysisDailyVisitTrendReducer',
        payload: Data,
      });
    },
    // 获取用户访问小程序数据周趋势
    *getAnalysisWeeklyVisitTrend({ payload }, { call, put }) {
      const response = yield call(getAnalysisWeeklyVisitTrend, payload);
      const { Data } = response
      yield put({
        type: 'getAnalysisWeeklyVisitTrendReducer',
        payload: Data,
      });
    },
    // 获取用户访问小程序数据月趋势
    *getAnalysisMonthlyVisitTrend({ payload }, { call, put }) {
      const response = yield call(getAnalysisMonthlyVisitTrend, payload);
      const { Data } = response
      yield put({
        type: 'getAnalysisMonthlyVisitTrendReducer',
        payload: Data,
      });
    },
    // 获取用户访问小程序日留存
    *getAnalysisDailyRetain({ payload }, { call, put }) {
      const response = yield call(getAnalysisDailyRetain, payload);
      const { Data } = response
      yield put({
        type: 'getAnalysisDailyRetainReducer',
        payload: Data,
      });
    },
    // 获取用户访问小程序周留存
    *getAnalysisWeeklyRetain({ payload }, { call, put }) {
      const response = yield call(getAnalysisWeeklyRetain, payload);
      const { Data } = response
      yield put({
        type: 'getAnalysisWeeklyRetainReducer',
        payload: Data,
      });
    },
    // 获取用户访问小程序月留存
    *getAnalysisMonthlyRetain({ payload }, { call, put }) {
      const response = yield call(getAnalysisMonthlyRetain, payload);
      const { Data } = response
      yield put({
        type: 'getAnalysisMonthlyRetainReducer',
        payload: Data,
      });
    },
    // 获取用户访问小程序数据概况
    *getAnalysisDailySummary({ payload }, { call, put }) {
      const response = yield call(getAnalysisDailySummary, payload);
      const { Data } = response
      const { type } = payload
      let reducer = 'getAnalysisDailySummaryReducer'
      if (type === 1)
        reducer = 'getAnalysisLastWeeklySummaryReducer'
      else if (type === 2)
        reducer = 'getAnalysiLastMonthlySummaryReducer'
      yield put({
        type: reducer,
        payload: Data,
      });
    },
    // 获取小程序新增或活跃用户的画像分布数据
    *getAnalysisUserPortrait({ payload }, { call, put }) {
      const response = yield call(getAnalysisUserPortrait, payload);
      const { Data } = response
      yield put({
        type: 'getAnalysisUserPortraitReducer',
        payload: Data,
      });
    },
    // 获取用户小程序访问分布数据
    *getAnalysisVisitDistribution({ payload }, { call, put }) {
      const response = yield call(getAnalysisVisitDistribution, payload);
      const { Data } = response
      yield put({
        type: 'getAnalysisVisitDistributionReducer',
        payload: Data,
      });
    },
    // 访问页面。目前只提供按 page_visit_pv 排序的 top200。
    *getAnalysisVisitPage({ payload }, { call, put }) {
      const response = yield call(getAnalysisVisitPage, payload);
      const { Data } = response
      yield put({
        type: 'getAnalysisVisitPageReducer',
        payload: Data,
      });
    },
  },

  reducers: {
    getAnalysisDailyVisitTrendReducer(state, action) {
      return {
        ...state,
        resByDailyVisitTrend: action.payload || null,
      };
    },
    getAnalysisWeeklyVisitTrendReducer(state, action) {
      return {
        ...state,
        resByWeeklyVisitTrend: action.payload || null,
      };
    },
    getAnalysisMonthlyVisitTrendReducer(state, action) {
      return {
        ...state,
        resByMonthlyVisitTrend: action.payload || null,
      };
    },
    getAnalysisDailyRetainReducer(state, action) {
      return {
        ...state,
        resByDailyRetain: action.payload || null,
      };
    },
    getAnalysisWeeklyRetainReducer(state, action) {
      return {
        ...state,
        resByWeeklyRetain: action.payload || null,
      };
    },
    getAnalysisMonthlyRetainReducer(state, action) {
      return {
        ...state,
        resByMonthlyRetain: action.payload || null,
      };
    },
    getAnalysisDailySummaryReducer(state, action) {
      return {
        ...state,
        resByDailySummary: action.payload || null,
      };
    },
    getAnalysisLastWeeklySummaryReducer(state, action) {
      return {
        ...state,
        resByLastWeeklySummary: action.payload || null,
      };
    },
    getAnalysiLastMonthlySummaryReducer(state, action) {
      return {
        ...state,
        resByLastMonthlySummary: action.payload || null,
      };
    },
    getAnalysisUserPortraitReducer(state, action) {
      return {
        ...state,
        resByUserPortrait: action.payload || null,
      };
    },
    getAnalysisVisitDistributionReducer(state, action) {
      return {
        ...state,
        resByVisitDistribution: action.payload || null,
      };
    },
    getAnalysisVisitPageReducer(state, action) {
      return {
        ...state,
        resByVisitPage: action.payload || null,
      };
    },
  },
};
