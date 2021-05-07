const mutations = {
  setLoad(state, show) {
    //设置loading组件是否显示
    state.isLoad = show;
  },
  setToast(state, show) {
    //设置toast组件是否显示
    state.isToast = show;
  },
  setSongList(state,data){
    //设置播放列表
    state.songList = data;
  },
  setCurrentIndex(state,data){
    //设置播放列表
    state.currentIndex = data;
  },
  setCurrentMusic(state, data) {
    //设置当前播放音乐数据
    state.currentMusic = data;
  },
  setMiniPlayer(state, show) {
    //设置播放器是否显示
    state.isMiniPlayer = show;
  },
  setListDetail(state, data) {
    //设置歌单页面数据
    state.listDetail = data;
  },
  setCurrentTime(state, data) {
    //设置播放进度
    state.currentTime = data;
  },
  setTotalTime(state, data) {
    //设置歌曲播放时间
    state.totalTime = data;
  },
  changePlayerStatus(state, status) {
    //设置播放状态
      state.playerStatus = status;
    //  else {
    //   if (state.playerStatus) {
    //     state.playerStatus = false;
    //   } else {
    //     state.playerStatus = true;
    //   }
    // }

  },
  changePlayBar(state,status) {
      state.isShowPlayBar = status
  }
};

export default mutations;