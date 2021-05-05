import axios from 'axios';
// const BaseUrl ='http://music.kele8.cn';
const BaseUrl = 'https://api.mtnhao.com';
const target = 'http://localhost:10001';


//推荐歌曲列表
export const getReco = () => axios.get(`${BaseUrl}/personalized`)
//最新歌曲列表
export const getNewSong = () => axios.get(`${BaseUrl}/personalized/newsong`)

//banner?type=2 iphone
export const getBanner = () => axios.get(`${BaseUrl}//banner?type=2`)

//歌曲排行
export const getRank = () => axios.get(`${BaseUrl}/playlist/detail?id=3778678`);

//login
export const login = () => axios.post(`${target}/login`)
//register
export const Register = ({email,password,code}) => axios({
    method: 'POST',
    url: `http://localhost:10001/register`,
    data: {
        email,
        password,
        code,
    }
})
