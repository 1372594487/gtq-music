let routesController = require(__basename + '/routes/index')
// moudule.exports exports
module.exports = app => {
    //请求域拦截（白名单）
    // app.use(routesController.verifyHost);
    //验证码拦截（白名单）
    // app.use(routesController.verifyCode);
    //验证登录
    // app.use(routesController.verifyToken);
    //注册接口
    // app.post('/register', routesController.register);
    app.post('/register',routesController.register);

    //发送验证码
    app.post('/email',routesController.email);
    
}