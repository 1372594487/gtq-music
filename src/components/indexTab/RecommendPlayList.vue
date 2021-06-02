<template>
  <ul class="play-list">
    <li class="list-item" v-for="item in currentList" :key="item.id">
      <div class="thumb">
        <img :src="item.imgUrl" alt="" />
        <span class="item-count">{{ item.play }}</span>
      </div>
      <p>{{ item.name }}</p>
    </li>
  </ul>
</template>

<script>
import { getReco } from "../../api/getData";
export default {
  name: "RecommendPlayList",
  data() {
    return {
      loading: true,
      remdList: [],
      currentId: "",
      remdIndex: 0,
    };
  },
  computed: {
    currentList: function () {
      return this.remdList.slice(
        this.remdIndex * 6,
        (this.remdIndex + 1) * 6
      );
    },
  },
  async created() {
    //
    let localStorage = window.localStorage;
    let hasStorage = Object.prototype.hasOwnProperty.call(
      localStorage,
      "recommends"
    );
    try {
      if (hasStorage) {
        const localRend = JSON.parse(localStorage.getItem("recommends"));
        this.remdList = JSON.parse(localRend.data)
        this.remdIndex =localRend.index;
        this.remdIndex = this.remdIndex >= 4 ? 0 : this.remdIndex + 1;
      }
       else {
        let response = await getReco();
        console.log(response);
        let handledList = this.handleData(response);
        this._localStorage(handledList);
        this.remdList = this.parseData(response);
      }
    } catch {
      console.log("服务器错误，请重试！");
    } finally {
      this.loading = false;
    }
  },
  mounted() {
  },
  methods: {
    handleData: function (response) {
      let result = response.data.result.map((currentValue) => {
        let obj = {
          id: currentValue.id,
          name: currentValue.name,
          imgUrl: currentValue.picUrl,
        };
        //处理播放量
        let tempStr = parseInt(currentValue.playCount) + "";
        if (tempStr.length >= 6) {
          obj.play = tempStr[0] + tempStr[1] + "万";
        } else {
          obj.play = tempStr;
        }
        return obj;
      });
      return result;
    },
    //params Object
    _localStorage: function (params) {
      let remdListObj = JSON.stringify(params);
      let index = this.remdIndex;
      window.localStorage.setItem(
        "recommends",
        JSON.stringify({
          expire: Date.now() + 600 * 1000,
          data: remdListObj,
          index,
        })
      );
    },
  },
};
</script>

<style lang="less">
.play-list {
  display: flex;
  flex-wrap: wrap;
  .list-item {
    flex: 1 1 calc(100vw / 3 - 10px);
    padding-bottom: 16px;
    &:nth-of-type(3n + 2) {
      margin-right: 5px;
      margin-left: 5px;
    }
    .thumb {
      position: relative;
      img {
        min-height: 30vw;
        vertical-align: middle;
      }
      .item-count {
        position: absolute;
        top: 0;
        right: 0;
        color: white;
        text-shadow: 0 0 1px black;
        &::before {
          content: "";
          background: no-repeat
            url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+");
          background-position: left center;
          background-size: auto 100%;
          width: 1.2em;
          height: 0.9em;
          display: inline-block;
          // vertical-align: middle;
        }
      }
    }
    p {
      overflow: hidden;
      padding: 6px 2px 0 6px;
      line-height: 1.1;
      font-size: 12px;
      max-height: 30px;
    }
  }
}
</style>