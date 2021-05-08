<template>
  <div class="lyric" @click="$emit('toggle-show-lyric')">
    <div
      v-if="hasLyric"
      class="wrapper"
      @touchmove="move"
    >
      <ul class="lyrics" ref="lyricUl" v-if="isReady">
        <li
          v-for="(singleTextParm, index) in lyric"
          :key="index"
          data-lyric-id="singleTextParm.lyric_id"
          height=""
          :class="{ active: singleTextParm.isActive }"
        >
          {{ singleTextParm.text }}
        </li>
      </ul>
    </div>
    <div class="noLyric" v-else>本歌曲暂无歌词</div>
  </div>
</template>

<script>
export default {
  data: function () {
  },
 
};
</script>

<style lang="less">
.lyric {
  height: 700px;
  position: relative;
  z-index: 10;
  .noLyric {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .wrapper {
    height: 500px;
    margin-top: 42px;
    position: absolute;
    overflow: hidden;
    top: 36%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    &::before {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      content: " ";
      background-color: rgba(0, 0, 0, 0.6);
      display: block;
    }

    .lyrics {
      transition: transform 0.4s linear;
      -webkit-transition: -webkit-transform transform 0.4s linear;
      li {
        text-align: center;
        width: 21em;
        height: 42px;
        color: honeydew;

        &.active {
          color: red;
        }
      }
    }
  }
}
</style>
