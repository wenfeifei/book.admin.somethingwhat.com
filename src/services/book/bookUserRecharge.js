import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 获取用户充值/赠送记录 api
 */
export async function getListByPage(params) {
  return request(`/Api/BookUserRecharge/GetListByPage?${stringify(params)}`);
}