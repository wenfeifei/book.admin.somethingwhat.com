import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 获取最近的阅读 api
 */
export async function getRecentReadingByPage(params) {
  return request(`/Api/BookReadRecord/GetRecentReadingByPage?${stringify(params)}`);
}
/**
 * 获取用户阅读记录（小说基本信息） api
 */
export async function getListByPage(params) {
  return request(`/Api/BookReadRecord/GetListByPage?${stringify(params)}`);
}