<template>
  <div class="header">
    <div class="logo">
      <div>
        <img src="" alt="" />
        <p>抑云音乐</p>
      </div>
      <div>Vue.js</div>
    </div>
    <van-tabs v-model:active="activeName"
    color="black"
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
import { ref, getCurrentInstance } from "vue";
export default {
  components: {},
  setup(props, ctx) {
    const instance = getCurrentInstance();
    const activeName = ref("HotTab");
    const setTab = function (name) {
      ctx.emit("setTab", name);
      console.log(ctx, name);
      console.log(instance);
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
  padding-left: 60px;
  box-sizing: border-box;
  background-color:black;
  box-shadow: black 0px 65px 200px 70px;
  color: #fff;
  font-size:18px;
  width: 100%;
  height: 60px;
  &>div>p{
    display: inline-block;
  }
  & div:nth-child(2){
    font-size: 14px;
  }
}
</style>