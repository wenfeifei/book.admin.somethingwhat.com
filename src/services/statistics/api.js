import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 新增用户统计、新增小说用户统计 api
 */
export async function bookUserStatistics(params) {
  return request(`/Api/Statistics/BookUserStatistics?${stringify(params)}`);
}
/**
 * 时间段（每小时）新增用户统计 api
 */
export async function bookUserTimeSlotStatistics(params) {
  return request(`/Api/Statistics/BookUserTimeSlotStatistics?${stringify(params)}`);
}
/**
 * 新增用户 （男女分组）统计 api
 */
export async function bookUserGenderStatistics(params) {
  return request(`/Api/Statistics/BookUserGenderStatistics?${stringify(params)}`);
}
/**
 * 僵尸粉与有阅读记录的用户统计 api
 */
export async function readUserStatistics(params) {
  return request(`/Api/Statistics/GetByReadUserStatistics?${stringify(params)}`);
}
/**
 * 用户阅读统计（参与阅读用户数、阅读章节数）
 */
export async function bookUserReadStatistics(params) {
  return request(`/Api/Statistics/BookUserReadStatistics?${stringify(params)}`);
}
/**
 * 时间段（每小时）阅读小说数、时间段（每小时）阅读小说章节数 统计
 */
export async function bookReadTimeSlotStatistics(params) {
  return request(`/Api/Statistics/BookReadTimeSlotStatistics?${stringify(params)}`);
}
/**
 * 最受欢迎小说排行
 */
export async function getMostPopularBook(params) {
  return request(`/Api/Statistics/GetMostPopularBook?${stringify(params)}`);
}
/**
 * 阅读排行榜
 */
export async function getReadRanking(params) {
  return request(`/Api/Statistics/GetReadRanking?${stringify(params)}`);
}