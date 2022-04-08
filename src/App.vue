<template>
  <router-view></router-view>
</template>

<script setup>
import axios from '@/utils/axios'
import { useRoute, useRouter } from 'vue-router'
import { Toast } from 'vant'
import { mainStore } from './store';
const store = mainStore();
const $router = useRouter();

</script>

<style lang="less">
  html,body{
    width: 100%;
    height: 100%;
  }

  body {
    position: relative;
    /* --van-white: #fff;
    --van-blue: #1989fa;
    --van-button-primary-color: var(--van-white);
    --van-button-primary-background: var(--van-primary-color); */
    /* 全局修改主色调 */
    --van-blue: #3FC9E9;
    
    background-color: #FAFAFA;
    p {
      margin: 0;
      padding: 0;
    }
  }
</style>