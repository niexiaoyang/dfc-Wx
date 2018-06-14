export function spliteWords(words, count) {
  if (words && words.length > count) {
    words = `${words.substring(0, count)}...`;
  }
  return words;
}

// brand
export function setBrandStatus(status) {
  const list = ['未审核', '已审核', '审核不通过'];
  return list[status];
}
// advertisement
export function setAdSname(cateId) {
  const list = { 200: '厂家端首页', 201: '厂家端中部', 300: '买家端首页', 311: '童品汇', 312: '潮流馆', 313: '品牌馆', 314: '尾品汇', 320: '天天特价', 330: '聚爆款', 340: '聚爆款' };
  return list[cateId];
}
// adStatus
export function setPayStatus(status) {
  const list = ['撤回', '立即支付', '待投放', '投放中'];
  return list[status];
}

