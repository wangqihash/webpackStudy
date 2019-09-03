/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2019-08-17 22:20:39
 * @LastEditTime: 2019-08-17 22:58:38
 */
let express = require('express');   // express是node内置的插件
let app = express();
let webpack = require("webpack");

//中间件   作用: 服务端启用webpack
// let middle = require('webpack-dev-middleware');

// let config = require('./webpack.config.js');
// let compiler = webpack(config);
// app.use(middle(compiler));

app.get('/user', (req, res) => {
    res.json({ name: "wangqi" });
})

app.listen(3000)