/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2019-09-02 21:34:02
 * @LastEditTime: 2019-09-02 22:00:27
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