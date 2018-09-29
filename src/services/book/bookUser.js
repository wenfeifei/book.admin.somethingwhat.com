import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 查询book用户列表 api
 */
export async function getListByPage(params) {
  return request(`/Api/BookUser/GetListByPage?${stringify(params)}`);
}
/**
 * 查询book用户详情 api
 */
export async function getSingleById(params) {
  return request(`/Api/BookUser/GetSingleById?${stringify(params)}`);
}
/**
 * 管理员赠送喵币
 */
export async function addCurrency(params) {
  return request(`/Api/BookUser/AddCurrency?${stringify(params)}`);
}
/**
 * 获取用户的概括信息：阅读时长、阅读记录、收藏书本
 */
export async function getBookSummary(params) {
  return request(`/Api/BookUser/GetBookSummary?${stringify(params)}`);
}
/**
 * 获取用户订单记录
 */
export async function getWechatPayOrderByPage(params) {
  return request(`/Api/BookUser/GetWechatPayOrderByPage?${stringify(params)}`);
}
