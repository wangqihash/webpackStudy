/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2019-09-02 21:34:18
 * @LastEditTime: 2019-09-03 23:24:29
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: "production",
    devtool: 'source-map',
    optimization: {
        // minimizer: [
        //     new UglifyJsPlugin({
        //         cache: true,
        //         include: /\/includes/,
        //     })
        // ]
    },
    plugins: [
        
    ]
});