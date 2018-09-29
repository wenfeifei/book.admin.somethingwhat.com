import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 获取小说章节阅读记录 api
 */
export async function getListByPage(params) {
  return request(`/Api/BookChapterReadRecord/GetListByPage?${stringify(params)}`);
}