import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './route.js';

// 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  history: createWebHashHistory('/index.html'),
  routes
});

export default router;