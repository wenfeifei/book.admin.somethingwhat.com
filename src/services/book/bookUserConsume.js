import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 用户消费喵币记录 api
 */
export async function getListByPage(params) {
  return request(`/Api/BookUserConsume/GetListByPage?${stringify(params)}`);
}