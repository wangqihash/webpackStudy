/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2019-09-01 17:58:58
 * @LastEditTime: 2019-09-02 21:18:30
 */
const path = require('path');
const webpack = require('webpack')
//清除打包文件插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    mode: 'development',    // development production
    devtool: 'eval-source-map',
    entry: {
        add: './src/index.js',
        // print: './src/print.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Output Management111',
            template: './index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        contentBase: "./dist",
    },

};