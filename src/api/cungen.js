import request from './request';

export function getCungenList(params) {
  return request.post('order/invoicingOrderDetail', params);
}
