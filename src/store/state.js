const state = {
  isLoad: false, //加载组件
  isToast: false, //toast组件
  currentMusic: {}, //当前播放歌曲
  isMiniPlayer: false, //mini播放器是否显示
  listDetail: {}, //歌单页面数据
  currentTime: 0, //当前播放进度
  playerStatus: false, //当前播放状态
  songList:[],
  currentIndex:0,
  //
  isShowLyric: false,
  totalTime: 0,
  isShowPlayBar:false,
};

export default state;