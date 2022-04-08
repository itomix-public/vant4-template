export default {
  // 初始化设置
  init: {
    mounted () {
      document.title = this.$route.meta.title;
    }
  }
};