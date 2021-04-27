<template>
  <div class="home">
    <Header @setTab="setTab"></Header>
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <keep-alive>
        <component :is="tabName" class="comp-view"></component>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import Header from "../components/Header";
import indexTab from "../components/indexTab";
import HotTab from "../components/HotTab";
import SearchTab from "../components/SearchTab";
import UserTab from "../components/UserTab";
export default {
  name: "Home",
  components: {
    Header,
    indexTab,
    HotTab,
    SearchTab,
    UserTab,
  },
  data() {
    return {
      tabName: "indexTab",
    };
  },
  watch: {
    $route(to, from) {
      let toDepth = to.meta.depth;
      let fromDepth = from.meta.depth;
      if (fromDepth > toDepth) {
        this.enterTransition = "animate__animated animate__fadeInLeft";
        this.leaveTransition = "animate__animated animate__fadeOutRight";
      } else if (fromDepth < toDepth) {
        this.enterTransition = "animate__animated animate__fadeInRight";
        this.leaveTransition = "animate__animated animate__fadeOutLeft";
      } else {
        this.enterTransition = "animate__animated animate__fadeIn";
        this.leaveTransition = "animate__animated animate__fadeOut";
      }
    },
  },
  methods: {
    setTab: function (name) {
      this.tabName = name;
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  position: relative;
  .comp-view {
    position: absolute;
    left: 0;
    right: 0;
    top: 103px;
    bottom: 0;
  }
}
</style>