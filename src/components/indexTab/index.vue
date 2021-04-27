<template>
  <div class="index-view">
    <h2 class="remd">
      推荐歌单
    </h2>
    <RecommendPlayList></RecommendPlayList>
    <h2 class="remd">
      最新音乐
    </h2>
    <RecommendNewMusic></RecommendNewMusic>
  </div>
</template>

<script>
import RecommendPlayList from './RecommendPlayList'
import RecommendNewMusic from './RecommendNewMusic'
export default {
components:{
  RecommendPlayList,
  RecommendNewMusic,
}
}
</script>

<style lang="less" scoped>
.index-view{
  padding-top: 20px;
  .remd {
  display: block;
  position: relative;
  padding-left: 9px;
  margin-bottom: 14px;
  font-size: 17px;
  font-weight: 400;
  height: 20px;
  line-height: 20px;
  text-align: left;
}
.remd:after {
  content: ' ';
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -11px;
  width: 2px;
  height: 22px;
  background-color: #d33a31;
}
}
</style>