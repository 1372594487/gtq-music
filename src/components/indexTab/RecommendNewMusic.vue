<template>
  <ul class="new-music">
    <Song v-for="item in data"
    :key="item.id"
    :music="item"
    :songList="data"
    >
    </Song>
  </ul>
</template>

<script>
import Song from "../Song";
import { getNewSong } from "../../api/getData";
// import {mapMutations} from "vuex"
export default {
  name: "RecommendNewMusic",
  components: {
    Song,
  },
  data() {
    return {
      loading: true,
      remdNews: [],
      data:[],
    };
  },
  async created() {
    try {
      let response = await getNewSong();
      this.data = this.parseData(response);
      // this.setSongList(this.data);
    } catch {
      alert("服务器错误，请重试!");
    } finally {
      this.loading = false;
    }
  },
  methods: {
    // ...mapMutations(['setSongList']),
    parseData(response) {
      let result = response.data.result.map(function (currentValue) {
        let artistsName = "";
        if (currentValue.song.artists.length >= 2) {
          artistsName =
            currentValue.song.artists[0].name +
            "/" +
            currentValue.song.artists[1].name;
        } else {
          artistsName = currentValue.song.artists[0].name;
        }

        let obj = {
          id: currentValue.id,
          title: currentValue.name,
          artists: artistsName,
          album: currentValue.song.album.name,
        };
        return obj;
      });

      return result;
    },
  },
};
</script>

<style scoped lang="less">
.new-music {
  position: relative;
  padding-bottom: 51px;
  &::after {
    content: "";
    display: block;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 51px;
    background-color: rgba(230, 227, 227, 0.5);
  }
}
</style>