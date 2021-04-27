<template>
  <div class="header">
    <div class="logo">
      <div>
        <svg t="1619513497843" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8261" width="30" height="30"><path d="M745 386.8c-81.7 0-148.2-66.5-148.2-148.2 0-14.9-12.1-27-27-27s-27 12.1-27 27c0 2.9 0.1 5.7 0.2 8.5-0.1 0.7-0.2 1.4-0.2 2.1v269.5c-27.1-23.4-62.4-37.7-101-37.7-85.4 0-154.9 69.5-154.9 154.9s69.5 154.9 154.9 154.9c83.5 0 151.6-66.4 154.6-149.2 0.1-1 0.3-1.9 0.3-2.9v-263c36.9 39.9 89.7 64.9 148.2 64.9 14.9 0 27-12.1 27-27 0.1-14.7-12-26.8-26.9-26.8zM441.9 736.9c-55.7 0-101-45.3-101-101s45.3-101 101-101 101 45.3 101 101-45.3 101-101 101z" fill="#ffffff" p-id="8262"></path><path d="M510.8 64.4c-247 0-447.9 200.9-447.9 447.9 0 247 200.9 447.9 447.9 447.9 247 0 447.9-200.9 447.9-447.9 0-247-200.9-447.9-447.9-447.9z m0 841.9c-217.2 0-394-176.7-394-394 0-217.2 176.7-394 394-394 217.2 0 394 176.7 394 394s-176.8 394-394 394z" fill="#ffffff" p-id="8263"></path></svg>
        <p>抑云音乐</p>
      </div>
      <div>Vue3.js</div>
    </div>
    <van-tabs v-model:active="activeName"
    color="#d33a31"
    line-width="90px"
    line-height="1px"
    @click="setTab">
      <van-tab title="首页" name="indexTab" dep="1"></van-tab>
      <van-tab title="热歌榜" name="HotTab" dep="2"></van-tab>
      <van-tab title="搜索" name="SearchTab" dep="3"></van-tab>
      <van-tab title="用户" name="UserTab" dep="4"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  components: {},
  setup(props, ctx) {
    const activeName = ref("indexTab");
    const setTab = function (name) {
      ctx.emit("setTab", name);
    };

    return {
      activeName,
      setTab,
    };
  },
};
</script>

<style lang="less" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px 0;
  padding-left: 20px;
  box-sizing: border-box;
  background-color:black;
  box-shadow: black 0px 65px 200px 70px;
  color: #fff;
  font-size:18px;
  width: 100%;
  height: 60px;
  .icon{
    vertical-align:middle;
  }
  &>div>p{
    display: inline-block;
    padding-top: 5px;
    padding-left: 3px;
  }
  & div:nth-child(2){
    font-size: 14px;
  }
}
</style>