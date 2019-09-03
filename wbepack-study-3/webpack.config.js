/*
 * @Description: webpack配置
 * @Author: wangqi
 * @Date: 2019-08-18 01:24:55
 * @LastEditTime: 2019-09-01 17:42:28
 */
let path = require("path");
let Webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: "eval-souce-map",
    optimization: {
        //提取公共的代码，进行缓存下次加载时不必下载
        // splitChunks: {          //分割代码块
        //     cacheGroups: {      //缓存组
        //         common: {       //公共的模块
        //             chunks: "initial",
        //             minSize: 0,
        //             minChunks: 2,
        //         }
        //     },
        // },
    },
    entry: {
        index: "./src/index.js",
        // other: "./src/other.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        noParse: /jquery/,      //不解析jquery依赖，提升打包的时间，优化性能
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                }
            }
        }],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html",
        }),
        //每次打包前先清除dist
        // new CleanWebpackPlugin({}),

        //优化项： 查找动态链接文件,
        // new Webpack.DllReferencePlugin({
        //     manifest: path.resolve(__dirname, 'dist', 'manifest.json')
        // }),

        //new Webpack.NamedModulesPlugin(),           //打印更新的模块路径
        new Webpack.HotModuleReplacementPlugin(),   //热更新插件
    ],

    devServer: {
        hot: false,            //启用热更新    true:启用; fasle:关闭
        port: 8080,
        progress: true,
        contentBase: './dist',
    },
};