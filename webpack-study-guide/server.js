/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2019-09-02 10:50:41
 * @LastEditTime: 2019-09-02 20:40:21
 */
const express = require('express');
const webapck = require('webpack');
//该中间件内部包含了webpackDevMiddleware插件但是webpackDevMiddleware也可以单独抽离使用
const webpackDevServer = require('webpack-dev-server');
const webpackDevMiddleware = require('webpack-dev-middleware');

const config = require('./webpack.config');
const options = {
    contentBase: "./dist",
    host: 'localhost'
};
webpackDevServer.addDevServerEntrypoints(config, options);

// const app = express();

const compiler = webapck(config);
const app = new webpackDevServer(compiler, options);

// app.use(webpackDevMiddleware(compiler, {
//     publicPath: config.output.publicPath
// }));



app.listen(3000, function () {
    console.log("通过 => 127.0.0.1:3000 来启动web项目");
})