import {
  getMusicUrl,
  mygetMusicUrl,
  getPlaylist,
  getMusicDetail,
  mygetMusicDetail,
  checkMusic,
  getLrc,
} from '@/api/getData';
import lyricParser from '../utils/lrcparse';
const actions = {
  async getMusicData({
      //获取当前音乐信息
      commit,
    },
    music,
  ) {

    let check = await checkMusic(music.id);
    if (check.data.success) {
      let musicUrlData = await getMusicUrl(music.id);
      let musicDetailData = await getMusicDetail(music.id);
      let musicLycicData = await getLrc(music.id);
      console.log("aaa", musicLycicData.data);
      const {
        lyric
      } = lyricParser(musicLycicData.data);
      let currentMusicData = {
        id: music.id,
        url: musicUrlData.data.data[0].url,
        imgUrl: musicDetailData.data.songs[0].al.picUrl,
        singer: music.artists,
        song: music.title,
        lyric,
      };
      if (!currentMusicData.url) {
        return Promise.reject('false');
      }
      commit('setCurrentMusic', currentMusicData);
      console.log(currentMusicData);
    } else {
      return Promise.reject('false');
    }
  },
  async getListDetail({
      //获取歌单详细信息
      commit,
    },
    id,
  ) {
    let response = await getPlaylist(id);
    let song = response.data.playlist.tracks.slice(0, 25);

    let playListSong = song.map(function (currentValue, index) {
      let artistsName = '';
      if (currentValue.ar.length >= 2) {
        artistsName = currentValue.ar[0].name + '/' + currentValue.ar[1].name;
      } else {
        artistsName = currentValue.ar[0].name;
      }
      return {
        id: currentValue.id,
        title: currentValue.name,
        alias: currentValue.alia[0],
        artists: artistsName,
        album: currentValue.al.name,
        rank: index + 1,
      };
    });
    let playlistDetail = {
      tags: response.data.playlist.tags,
      des: response.data.playlist.description,
      music: playListSong,
      name: response.data.playlist.name,
      imgUrl: response.data.playlist.coverImgUrl,
    };
    commit('setListDetail', playlistDetail);
  },
  async MygetData({
    //获取当前音乐信息
    commit,
  }, music) {
    console.log("MygetData");
    let musicUrlData = await mygetMusicUrl(music.otid).then(res => {
      console.log(res);
      return res;
    }).catch(err=>{
      console.log(err);
    });
    let musicDetailData = await mygetMusicDetail(music.otid).then(res => {
      console.log(res);
      return res;
    }).catch(err=>{
      console.log(err);
    });
    let musicLycicData = await getLrc(music.otid).then(res => {
      console.log(res.data);
      return res.data.lrc ? lyricParser(res.data) : "";
    }).catch(err=>{
      console.log(err);
    });


    // const {
    //   lyric
    // } = lyricParser(musicLycicData.data);
    let currentMusicData = {
      id: music.otid,
      url: musicUrlData.data.data[0].url || '',
      imgUrl: musicDetailData.data.songs[0].al.picUrl,
      singer: music.artists,
      song: music.title,
      lyric: musicLycicData
    };
    console.log(currentMusicData);
    if (!currentMusicData.url) {
      return Promise.reject('false');
    }
    commit('setCurrentMusic', currentMusicData);
  }
}
export default actions;