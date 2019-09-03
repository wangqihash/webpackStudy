/*
 * @Description: 生产环境
 * @Author: wangqi
 * @Date: 2019-08-17 23:58:41
 * @LastEditTime: 2019-08-18 00:04:36
 */
let { smart } = require('webpack-merge');
let base = require('./webpack.base');

module.exports = smart(base, {
    mode: 'production',
})