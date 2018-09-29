import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 获取接口访问记录 api
 */
export async function getListByPage(params) {
  return request(`/Api/SysInterfaceRecord/GetListByPage?${stringify(params)}`);
}