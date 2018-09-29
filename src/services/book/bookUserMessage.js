import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 分页查询数据 api
 */
export async function getListByPage(params) {
  return request(`/Api/BookUserMessage/GetListByPage?${stringify(params)}`);
}
/**
 * 新增 api
 */
export async function add(params) {
  return request('/Api/BookUserMessage/Add', {
    method: 'POST',
    body: { ...params },
  });
}
/**
 * 编辑 api
 */
export async function update(params) {
  return request('/Api/BookUserMessage/Update', {
    method: 'POST',
    body: { ...params },
  });
}
/**
 * 删除 api
 */
export async function del(params) {
  return request('/Api/BookUserMessage/Delete', {
    method: 'POST',
    body: { ...params },
  });
}