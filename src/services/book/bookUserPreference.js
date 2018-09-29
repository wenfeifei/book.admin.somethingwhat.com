import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 搜索用户偏好数据 api
 */
export async function getListByPage(params) {
  return request(`/Api/BookUserPreference/GetListByPage?${stringify(params)}`);
}