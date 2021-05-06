<template>
  <div class="play">
    <audio
      :src="
        'https://music.163.com/song/media/outer/url?id=' +
        currentMusic.id +
        '.mp3'
      "
      controls
      autoplay
      style="width: 100%; height: 40px"
      ref="audio"
      hidden
    ></audio>
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__slideInUp"
      leave-active-class="animate__animated animate__slideOutDown"
    >
      <div class="play-bar" v-show="isShowPlayBar">
        <img
          :src="currentMusic.imgUrl"
          alt=""
        />
        <h5>
          {{ currentMusic.song }}
          <p style="fontSize:13px">{{currentMusic.singer}}</p>
        </h5>
        <div class="control" @click.stop="togglePlayState">
          <canvas ref="circle" width="50" height="50"></canvas>
          <!-- 暂停 -->
          <span class="icon">
            <span v-if="!playerStatus"
              ><svg
                t="1609963355731"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3799"
                width="16"
                height="16"
              >
                <path
                  d="M870.4 0c-81.613 0-153.6 50.995-153.6 109.466v804.966c0 58.573 71.987 109.568 153.6 109.568S1024 973.005 1024 914.534V109.568C1023.078 50.995 952.013 0 870.4 0zM153.6 0C71.987 0 0 50.995 0 109.466v804.966C0 973.005 71.987 1024 153.6 1024s153.6-50.995 153.6-109.466V109.568C307.2 50.995 235.213 0 153.6 0z"
                  p-id="3800"
                  fill="#bfbfbf"
                ></path></svg
            ></span>
            <!-- 播放 -->
            <span v-else style="margin-left: 2px">
              <svg
                t="1609963430670"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1733"
                width="20"
                height="20"
              >
                <path
                  d="M918.49697 437.527273c-9.309091-15.515152-21.721212-27.927273-40.339394-40.339394L285.478788 24.824242C229.624242-12.412121 152.048485 6.206061 114.812121 62.060606 102.4 83.781818 96.193939 105.50303 96.193939 130.327273v744.727272c0 68.266667 55.854545 124.121212 124.121213 124.121213 24.824242 0 46.545455-6.206061 65.163636-18.618182l592.678788-372.363637c58.957576-37.236364 74.472727-114.812121 40.339394-170.666666z"
                  p-id="1734"
                  fill="#8a8a8a"
                ></path>
              </svg>
            </span>
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// import PlayFullHeader from "@/components/PlayFullHeader.vue";
// import PlayFullyric from "@/components/PlayFullyric.vue";
// import PlayFullChart from "@/components/PlayFullChart.vue";
// import PlayFullFooter from "@/components/PlayFullFooter.vue";
import { mapGetters } from "vuex";
export default {
  props: ["currentIndex", "playlist"],
  components: {
    // PlayFullHeader,
    // PlayFullyric,
    // PlayFullChart,
    // PlayFullFooter,
  },
  data: function () {
    return {};
  },
  computed: {
    ...mapGetters(["currentMusic", "isShowPlayBar", "isShowLyric", "duration","playerStatus"]),
  },
  watch: {
  },
};
</script>

<style scoped lang="less">
.play {
  &.paused {
    .play-bar {
      img {
        animation-play-state: paused;
      }
      .control {
        span.icon {
          span {
          }
        }
      }
    }
  }
}
.play-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 29;
  width: 100%;
  height: 51px;
  background: white;
  display: flex;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  img {
    width: 36px;
    height: 36px;
    margin: 7px;
    border-radius: 50%;
    animation: playing 6s linear infinite;
    box-shadow: 0 0 5px 0 grey;
  }
  h5 {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis; //超出部分以省略号显示
    white-space: nowrap;
    width: 20em; //用px单位亦可行
  }
  .control {
    position: relative;
    span.icon {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      // display: block;
      // background: rgba(240, 128, 128, 0.507);
      // &::before {
      //   content: "Pause";
      // }
    }
  }
}
.play-full {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  color: white;
  .bg {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    transform: scale(1.2);
    filter: blur(14px);
  }
  &::after {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    content: " ";
    background-color: rgba(0, 0, 0, 0.7);
    display: block;
  }
}

@keyframes playing {
  form {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
