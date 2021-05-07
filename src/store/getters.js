const getters = {
  isLoad: (state) => state.isLoad,
  isToast: (state) => state.isToast,
  currentMusic: (state) => state.currentMusic,
  isMiniPlayer: (state) => state.isMiniPlayer,
  listDetail: (state) => state.listDetail,
  currentTime: (state) => state.currentTime,
  playerStatus: (state) => state.playerStatus,
  isShowPlayBar: (state) => state.isShowPlayBar,
  isShowLyric: (state) => state.isShowLyric,
  totalTime: (state) => state.totalTime,
  songList:(state) => state.songList,
  currentIndex:(state)=>state.currentIndex,
};

export default getters;