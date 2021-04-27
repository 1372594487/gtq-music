import axios from 'axios';
const BaseUrl ='http://music.kele8.cn';

//推荐歌曲列表
export const getReco = ()=>axios.get(`${BaseUrl}/personalized`)
//最新歌曲列表
export const getNewSong = ()=>axios.get(`${BaseUrl}/personalized/newsong`)

//banner?type=2 iphone
export const getBanner = ()=>axios.get(`${BaseUrl}//banner?type=2`)
