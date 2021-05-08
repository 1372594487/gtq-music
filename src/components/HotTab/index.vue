// 排行榜选项卡
<template>
  <div class="hot-view">
    <div class="hot-flex">
      <div class="hot-icon"></div>
      <div class="hot-time">更新日期：{{ getTime }}</div>
    </div>
    <section v-if="error">
      <h1>加载失败！</h1>
    </section>
    <section v-else style="padding-bottom: 68px">
      <div v-if="loading">loading...</div>
      <div v-else>
        <Song v-for="(item,index) in rank"
        :key="item.id"
        :music="item"
        :songList="rank"
        :currentIndex="index"
        ></Song>
      </div>
    </section>
  </div>
</template>

<script>
import Song from "../Song";
import { getRank } from "../../api/getData";

export default {
  data() {
    return {
      loading: true,
      error: false,
      rank: [],
    };
  },
  components: {
    Song,
  },
  computed: {
    getTime() {
      let date = new Date();
      let month = date.getMonth();
      let day = date.getDate();
      return `${month + 1}月${day}日`;
    },
  },
  async created() {
    try {
      let response = await getRank();
      this.rank = this.parseData(response);
    } catch {
      this.error = true;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    parseData(response) {
      let song = response.data.playlist.tracks.slice(0, 20);
      let rankListData = song.map((value, index) => {
        let artistsName = "";
        if (value.ar.length >= 2) {
          //最多两个歌手名称
          artistsName = value.ar[0].name + "/" + value.ar[1].name;
        } else {
          artistsName = value.ar[0].name;
        }
        let obj = {
          id: value.id,
          title: value.name,
          alias: value.alia[0],
          artists: artistsName,
          album: value.al.name,
          rank: index + 1,
        };
        if (index <= 2) {
          //前三歌曲加粗
          obj.color = true;
        }
        if (index <= 8) {
          //前9歌曲序号加0
          obj.rank = "0" + obj.rank;
        }
        return obj;
      });

      return rankListData;
    },
  },
};
</script>

<style lang="less" scoped>
.hot-view {
  position: relative;
  padding-top: 39%;
  .hot-flex {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 2;
    padding-left: 20px;
    box-sizing: border-box;
    .hot-time {
      text-align: left;
      margin-top: 10px;
      color: hsla(0, 0%, 100%, 0.8);
      font-size: 12px;
      transform: scale(0.91);
      transform-origin: left top;
    }
    .hot-icon {
      width: 142px;
      height: 67px;
      background-image: url("../../assets/hot_icon.png");
      background-position: -24px -30px;
      background-size: 166px 97px;
    }
  }
}
</style>
