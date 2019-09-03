/*
 * @Description: webpack配置
 * @Author: wangqi
 * @Date: 2019-08-12 22:38:11
 * @LastEditTime: 2019-08-17 18:30:32
 */

let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
//js压缩优化插件 uglifyjs-webpack-plugin
const TerserJSPlugin = require('terser-webpack-plugin');
//抽离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//css压缩优化插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: "development",                      //模式 默认两种 production[上线压缩版]  development[开始未压缩版]
    entry: "./src/index.js",                  //入口
    output: {
        filename: 'bundle[hash:8].js',        //出口文件用8位的hash后缀结尾，防止缓存问题
        path: path.resolve(__dirname, 'build'),
        // publicPath:"www.wqhash.com",          //指定所有引用资源的服务地址
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            exclude: /(node_modules|bower_components)/, // (不处理node_modules 和 bower_components下的js文件) 优化处理加快速度
            use: {
                //通过babel-loader把es6转为es5;
                loader: 'babel-loader',
                options: {
                    presets:['@babel/preset-env'],                          //转为es6
                    plugins:[
                        ["@babel/plugin-proposal-decorators", { "legacy": true }],      //s7题案中装饰器方法, 转为游览器能识别的
                        ["@babel/plugin-proposal-class-properties", { "loose" : true }], //es7题案中类方法,转为游览器能识别的 [用来编译类]
                        ['@babel/plugin-transform-runtime'],
                    ],    

                },
            },
        }, {
            test: /\.css$/,
            use: [
                // {
                //     //注意loader的执行顺序默认从右向左执行, 从下到上执行
                //     loader: 'style-loader',                   
                //     options: {
                //         // insertAt: 'top',

                //     }
                // },
                //相当于创建了一个link标签，把css都放入了这个文件中
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
            ]
        }, {
            test: /\.less$/,
            use: [
                // {
                //     //注意loader的执行顺序默认从右向左执行, 从下到上执行
                //     loader: 'style-loader',                   
                //     options: {
                //         // insertAt: 'top',
                //     }
                // },
                MiniCssExtractPlugin.loader,
                'css-loader',    //解析css 也能解析import引入css
                'postcss-loader',
                'less-loader',   //把less -> css
            ]
        },{
            test:/\.(png|jpg|gif)$/,    //file-loader默认会在内部生成一张图片到build目录下
            //url-loader实在file-loade上进行封装，当图片小于多少K时会采用base64来转换，否则就使用file-loader产生真实图片
            use: {
                loader: 'url-loader',
                options: {
                    limit: 1*1024,                  //当图片小于200K时用base方式
                    outputPath:"/img/",             //指定输出图片的位置(在build打包位置)
                    // publicPath:"www.hash.com"    //单独指定服务地址 (类似output.publicPath功能)
                },
            },

        },{
            test: /\.html$/,        //html-withimg-loader, html中加载图片,把加载的图片路径改成打包的图片地址
            use: 'html-withimg-loader',
        }]
    },

    devServer: {                              //webpack通过这种服务方式启项目，实际访问的文件地址是存在服务器中的
        port: 3000,
        progress: true,                       //跑项目时的进度条
        contentBase: './build',               //以指定的位置来加载index.html页面入口 [默认为output.path的路径],同步服务器路径
        compress: true,                       //压缩
    },

    plugins: [
        //模板文件。作用:通过HtmlWebpackPlugin将指定的模板文件 放入到 指定的devServer服务目录下；打包的话生成在output指定的位置下
        new HtmlWebpackPlugin({
            template: './src/index.html',      //指定模板文件位置
            filename: 'index.html',            //指定模板文件名称 [不写按默认名称]
            hash: true,                        //给模板文件增加hash戳, 处理缓存问题
            // minify: {                           //作用：模板文件进行压缩
            //     removeAttributeQuotes: true,   //删除模板文件中的双引号
            //     collapseWhitespace: true,      //折叠空行
            // }
        }),

        //抽离css并压缩
        new MiniCssExtractPlugin({
            filename: "css/main.css",
            chunkFilename: "hash.css",
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),

        //压缩css
        // new OptimizeCSSAssetsPlugin({}),
        //压缩js, [本省通过打包成production也能压缩]
        // new TerserJSPlugin({}),
     
    ],

    //优化项 =>这么写的前提必须为production模式, 开发环境并不会走优化项
    optimization: {
        minimizer: [
            //压缩css
            new TerserJSPlugin({}),
            //压缩js,
            new OptimizeCSSAssetsPlugin({})
        ],
    },
}