export default [{
  path: '/',
  name: '首页',
  component: () => import('./views/index.vue'),
  meta: {
    title: ''
  },
  children: []
}];