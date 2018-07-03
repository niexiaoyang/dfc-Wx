import request from './request';

export function getList(params) {
  return request.post('Arrears/ArrearsList', params);
}
