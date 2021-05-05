exports.serverOptions = {
    host: 'http://127.0.0.1',
    port: 10001,
    baseUrl: '/static/file/'
}
exports.hostOptions = [
    'http://127.0.0.1:8080',
    'http://localhost:8080'
]
exports.codeUrlOptions = [
    '/register',
]
//sql
exports.mysqlOptions = {
    //数据库名称
    database: 'music_db',
    //用户名
    username: 'root',
    //密码
    password: 'root',
    //数据库类型
    dialect: 'mysql',
    //时区
    timezone: '+08:00',
    //字段命名 以 _ 分隔
    define: {
        underscored: true
    }
}