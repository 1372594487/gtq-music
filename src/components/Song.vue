5<template>
  <a href="javascript: void(0)" class="song" @click="playMusic(music)">
    <div class="song-num" v-if="music.rank" :class="{ highlight: music.color }">
      {{ music.rank }}
    </div>
    <div class="song-wrapper">
      <div class="song-info">
        <div class="song-title">
          {{ music.title }}
          <span v-if="music.alias">({{ music.alias }})</span>
        </div>
        <div class="song-detail">
          <i class="sq"></i>
          {{ music.artists }} - {{ music.album }}
        </div>
      </div>
      <div class="song-play">
        <span
          class="play-active"
          :class="{ paused: !playerStatus }"
          v-if="currentMusic && currentMusic.id === music.id"
        >
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </span>
        <span class="play-static" v-else></span>
      </div>
    </div>
  </a>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name: "Song",
  props: {
    music: {
      type: Object,
      required: true,
      default: () => {},
    },
    songList: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["currentMusic", "playerStatus"]),
  },
  methods: {
    ...mapActions(["getMusicData", "MygetData"]),
    ...mapMutations([
      "changePlayBar",
      "changePlayerStatus",
      "setSongList",
      "setCurrentIndex",
    ]),
    playMusic(music) {
      try {
        //
        console.log("play");
        music.checked ? this.MygetData(music).catch(err=>console.log(err)) : this.getMusicData(music).catch(err=>console.log(err))
        this.changePlayerStatus(true);
        this.changePlayBar(true);
        this.setSongList(this.songList);
        this.setCurrentIndex(this.currentIndex);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="less">
.play-icon {
  display: inline-block;
  width: 22px;
  height: 22px;
  //   background: url('~@/assets/hot_icon.png') no-repeat;
  background-position: -24px 0;
  background-size: 166px 97px;
}
.song-info {
  text-align: left;
  flex: 1 1 auto;
  padding: 6px 0;
  width: 0;
}
.song-play {
  display: flex;
  padding: 0 10px;
  align-items: center;
  .play-active {
    display: flex;
    justify-content: space-between;
    padding-right: 6px;
    align-items: flex-end;

    i {
      width: 2px;
      height: 13px;
      background: rgba(51, 203, 255);
      margin-right: 2px;
      // display: inline-block;
      transform-origin: center bottom;

      animation: playing 0.6s linear -0.2s infinite alternate-reverse;

      &:first-of-type {
        margin-left: 3px;
        animation-delay: 0s;
      }
      &:last-of-type {
        animation-delay: -0.4s;
      }
    }
    &.paused {
      i {
        animation-play-state: paused;
      }
    }
  }
  .play-static {
    width: 27px;
    height: 27px;
    background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=")
      no-repeat;
    background-size: 173px 97px;
    background-position: -24px 0px;
  }
}
.sq {
  display: inline-block;
  width: 12px;
  height: 8px;
  margin-right: 4px;
  //   background: url('~@/assets/hot_icon.png') no-repeat;
  background-size: 166px 97px;
}
.song-detail {
  font-size: 12px;
  color: #888;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: normal;
}
.song-title {
  font-size: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: normal;
}
.song-title span {
  color: #888;
}
.song {
  display: flex;
  padding-left: 10px;
  color: #333;
}
.song-num {
  color: #999;
  align-items: center;
  width: 28px;
  font-size: 17px;
  display: flex;
}
.highlight {
  color: #df3436 !important;
}
.song-wrapper {
  position: relative;
  display: flex;
  flex: 1 1 auto;
}
.song-wrapper:after {
  width: 300%;
  height: 300%;
  transform: scale(0.333333);
  position: absolute;
  z-index: 20;
  content: " ";
  top: 0;
  left: 0;
  pointer-events: none;
  box-sizing: border-box;
  transform-origin: top left;
  border: 0 solid rgba(0, 0, 0, 0.1);
  border-bottom-width: 2px;
}

@keyframes playing {
  from {
    // height: 50px;
    transform: scaleY(1);
  }
  to {
    // height: 10px;
    transform: scaleY(0.2);
  }
}
</style>