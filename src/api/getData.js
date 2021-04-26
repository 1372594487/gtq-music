import axios from 'axios';
const BaseUrl ='http://music.kele8.cn/';

//推荐歌曲列表
export const getReco = ()=>axios.get(`${HOST}/personalized`)
//最新歌曲列表
export const getReco = ()=>axios.get(`${HOST}/personalized/newsong`)

//banner?type=2 iphone
export const getReco = ()=>axios.get(`${HOST}//banner?type=2`)
