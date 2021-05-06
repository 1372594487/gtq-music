//routeController
// 导入API，操作mysql
let api = require(__basename + '/db/api/index')
//导入utils，调用公共方法
// let utils = require(__basename + '/')
class routesController {

    //请求域拦截
    // verifyHost(req, res, next) {
    //     if (config.hostOptions.indexOf(req.headers.origin) === -1) {
    //         console.log("pass", config.hostOptions, "your", req.headers.origin);
    //         return res.send({ msg: '请求域不合法', status: 1020 });
    //     }
    //     //否则允许通过
    //     next();
    // }
    //验证码拦截
    // verifyCode(req, res, next) {
    //     let url = req.url.split('?')[0];
    //     if (config.codeUrlOptions.indexOf(url) > -1) {
    //         //验证验证码
    //         console.log('req.body ==> ', req.body);
    //         //根据codeId查询验证码信息
    //         api.findData({
    //             modelName: 'Code',
    //             condition: {
    //                 codeId: req.body.codeId
    //             }
    //         }).then(result => {
    //             console.log("result ==> ", result);
    //             //获取当前时间-5mins
    //             let time = new Date().getTime() - config.emailOptions.expires;
    //             let codeTime = new Date(result[0].dataValues.createdAt).getTime();
    //             let isPass = req.body.validcode == result[0].dataValues.text && req.body.email == result[0].dataValues.email && codeTime >= time;
    //             // 如果验证码保存时间 >= time
    //             if (isPass) {
    //                 //如果验证通过，则将请求传递给下一个中间件或者路由
    //                 next();
    //             } else {
    //                 res.send({ msg: "验证码错误", status: 1031 })
    //             }
    //         }).catch(err => {
    //             console.log("err ==> ", err);
    //             res.send({ msg: '验证码错误', status: 1031 })
    //         })
    //     } else {
    //         //无需验证验证码，直接将请求传递给下一个中间件或者路由
    //         next();
    //     }
    // }
    //验证登录
    // verifyToken(req, res, next) {
    //     console.log('经过验证token');
    //     let url = req.url.split('?')[0];
    //     let judge = config.tokenOptions.tokenUrls.indexOf(url) > -1;
    //     if (judge) {
    //         console.log("req.headers.cookie ==> ", req.headers.cookie);
    //         if (!req.headers.cookie) {
    //             return res.send({ msg: '请先登录', status: 1034 });
    //         }
    //         let cookie = utils.transformCookie(req.headers.cookie);
    //         let token = [cookie.kaosd12, cookie.nanaasd, cookie.mamaawe].join('.');
    //         console.log('token ==>', token);
    //         //验证token
    //         utils.verifyToken(token).then(result => {
    //             console.log("result ==>", result);
    //             //传递userId
    //             req.userId = result.data;
    //             //验证通过，传递给下一个中间件或者路由
    //             next();
    //         }).catch(err => {
    //             res.send({ msg: '请先登录', status: 1034 });
    //         })
    //     } else {
    //         next();
    //     }
    // }

    //注册接口
    register(req, res) {
        //插入数据 ==> 模型.create(创建数据对象)

        //查询邮箱是否已被注册
        api.findData({
            modelName: 'User',
            condition: {
                email: req.body.email
            },
            attributes: ['email']
        }).then(result => {
            // console.log("result ==> ",result);
            // res.send('find ok')
            if (result.length > 0) {
                res.send({ msg: '该邮箱已被注册', status: 1002 })
            } else {
                //注册
                //创建用户id
                let userId = '_uid' + new Date().getTime();
                //随机昵称
                let index = Math.floor(Math.random() * config.nickNameOptions.length);
                let nickName = config.nickNameOptions[index] + userId;
                //加密密码
                let password = utils.encodeString(req.body.password);
                console.log('password ==>', password);
                //添加用户数据，注册用户
                api.createData('User', {
                    email: req.body.email,
                    password,
                    nickName,
                    userId
                }).then(result => {
                    res.send({ msg: '注册成功', status: 1000, result });
                }).catch(err => {
                    console.log('err ==> ', err);
                    res.send({ msg: '注册失败', status: 1001 })
                })
            }
        }).catch(err => {
            console.log("err==> ", err);
            res.send({ msg: '注册失败', status: 1001 })
        })


    }
}

//
module.exports = new routesController();