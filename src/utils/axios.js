import axios from 'axios';
import router from '../router';

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 发送请求前
    return config;
  },
  error => {
    // 请求错误处理
    return Promise.reject(error);
  });

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code === 401) { // 未授权跳转登录页
      router.replace({
        path: '/auth'
      });
    }
    return response;
  },
  error => {
    return Promise.reject(error.response.data);
  });

export default axios;
