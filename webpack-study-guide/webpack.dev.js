/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2019-09-02 21:34:02
 * @LastEditTime: 2019-09-03 23:54:14
 */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'eval-source-map',
    mode: 'development',
    devServer: {
        contentBase: './dist'
    }
})