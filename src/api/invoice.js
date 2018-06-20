import request from './request';

export function getStorePerformance(params) {
  return request.post('invoicing/wholeStorePerformance', params);
}

export function getProfitReport(params) {
  return request.post('invoicing/profitReport', params);
}

export function getEmployeeRank(params) {
  return request.post('invoicing/employeealesRanking', params);
}

export function getProductRank(params) {
  return request.post('invoicing/productSalesRanking', params);
}

export function getCustomRank(params) {
  return request.post('invoicing/customSalesRanking', params);
}
