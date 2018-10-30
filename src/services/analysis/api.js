import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 获取用户访问小程序数据日趋势 api
 */
export async function getAnalysisDailyVisitTrend(params) {
  return request(`/Api/Analysis/GetAnalysisDailyVisitTrend?${stringify(params)}`);
}
/**
 * 获取用户访问小程序数据周趋势 api
 */
export async function getAnalysisWeeklyVisitTrend(params) {
  return request(`/Api/Analysis/GetAnalysisWeeklyVisitTrend?${stringify(params)}`);
}
/**
 * 获取用户访问小程序数据月趋势 api
 */
export async function getAnalysisMonthlyVisitTrend(params) {
  return request(`/Api/Analysis/GetAnalysisMonthlyVisitTrend?${stringify(params)}`);
}
/**
 * 获取用户访问小程序日留存 api
 */
export async function getAnalysisDailyRetain(params) {
  return request(`/Api/Analysis/GetAnalysisDailyRetain?${stringify(params)}`);
}
/**
 * 获取用户访问小程序周留存 api
 */
export async function getAnalysisWeeklyRetain(params) {
  return request(`/Api/Analysis/GetAnalysisWeeklyRetain?${stringify(params)}`);
}
/**
 * 获取用户访问小程序月留存 api
 */
export async function getAnalysisMonthlyRetain(params) {
  return request(`/Api/Analysis/GetAnalysisMonthlyRetain?${stringify(params)}`);
}
/**
 * 获取用户访问小程序数据概况 api
 */
export async function getAnalysisDailySummary(params) {
  return request(`/Api/Analysis/GetAnalysisDailySummary?${stringify(params)}`);
}
/**
 * 获取小程序新增或活跃用户的画像分布数据 api
 */
export async function getAnalysisUserPortrait(params) {
  return request(`/Api/Analysis/GetAnalysisUserPortrait?${stringify(params)}`);
}
/**
 * 获取用户小程序访问分布数据 api
 */
export async function getAnalysisVisitDistribution(params) {
  return request(`/Api/Analysis/GetAnalysisVisitDistribution?${stringify(params)}`);
}
/**
 * 访问页面。目前只提供按 page_visit_pv 排序的 top200。 api
 */
export async function getAnalysisVisitPage(params) {
  return request(`/Api/Analysis/GetAnalysisVisitPage?${stringify(params)}`);
}