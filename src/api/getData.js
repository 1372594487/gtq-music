import axios from 'axios';
// const BaseUrl ='http://music.kele8.cn';
const BaseUrl = 'https://api.mtnhao.com';
const target = 'http://localhost:10001';


//推荐歌曲列表
export const getReco = () => axios.get(`${BaseUrl}/personalized`)
//最新歌曲列表
export const getNewSong = () => axios.get(`${BaseUrl}/personalized/newsong`)
//播放列表
// export const getSongList =()=>axios.get(`${BaseUrl}/`)
//banner?type=2 iphone
export const getBanner = () => axios.get(`${BaseUrl}//banner?type=2`)

//歌曲排行
export const getRank = () => axios.get(`${BaseUrl}/playlist/detail?id=3778678`);
//Musicurl
export const getMusicUrl = (id) => axios.get(`${BaseUrl}/song/url?id=${id}`);
//推荐歌单
export const getPlaylist = (id) =>
  axios.get(`${BaseUrl}/playlist/detail?id=${id}`);
// 音乐详情
export const getMusicDetail = (id) =>
  axios.get(`${BaseUrl}/song/detail?ids=${id}`);
// 检测歌曲是否能播放
export const checkMusic = (id) => axios.get(`${BaseUrl}/check/music?id=${id}`);
//  lyric
export const getLrc = (id) => axios.get(`${BaseUrl}/lyric?id=${id}`);

//login
export const login = () => axios.post(`${target}/login`)
//register
export const Register = ({email,password,code}) => axios({
    method: 'POST',
    url: `${target}/register`,
    data: {
        email,
        password,
        code,
    }
})
//send Email
export const SendEmail = ({email,password,code}) => axios({
  method: 'POST',
  url: `${target}/email`,
  data: {
      email,
      password,
      code,
  }
})
