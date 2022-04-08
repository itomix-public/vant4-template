import moment from 'moment';

// 格式化时间
const formatDate = (date) => {
  return moment(date).format('YYYY-MM-DD HH:mm');
};
// 判断是不是桌面微信
const wxInfo = () => {
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  let uAgent = navigator.userAgent.toLowerCase();
  let isTable = (uAgent.match(/MicroMessenger/i) == 'micromessenger') ? true : false;
  return {
    isAndroid,
    isiOS,
    isTable
  };
};
export { formatDate, wxInfo };