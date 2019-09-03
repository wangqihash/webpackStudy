/*
 * @Description: 基础环境
 * @Author: wangqi
 * @Date: 2019-08-17 18:51:05
 * @LastEditTime: 2019-08-24 09:11:46
 */

let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
//清除打包文件，保证每次打包的文件都是最新的
let { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // mode: "development",
    /**
     * source-map:      源码映射，打包时会生成一个sourcemap文件(未压缩的),方便查看报错位置
     * eval-souce-map   源码映射，不生成sourcemap文件,但任然可以查看报错位置
     */
    devtool: 'eval-souce-map',
    //多入口配置
    entry: {
        home: "./src/index.js",
        // other: "./src/other.js"
    },
    output: {
        filename: '[name].js',          //多入口配置时，这里的名称必须是这种动态的 
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                },
            },
        },{
            test:/\.css$/,
            use: ['style-loader', 'css-loader'],
        }],
    },
    resolve: {         
        //解析第三方包, 只对node_modules文件夹中进行解析查找                         
        modules: [path.resolve('node_modules')],    
        // alias: {
        //     bootstrap: "bootstrap/dist/css/bootstrap.css",
        // },
        //改配置能后省去写文件后缀的；规则：先去找 .js, 找不到接着找 .css 还找不到接着找 .vue以此类推
        extensions: ['.js', '.less', '.css', '.json'],  
        
    },
    plugins: [
        //生成html到打包文件中
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            chunks: ['home'],
        }),
        // new HtmlWebpackPlugin({
        //     template: './index.html',
        //     filename: 'other.html',
        //     chunks: ['other'],
        // }),
        
        //每次打包时先自动清除打包文件
        new CleanWebpackPlugin({}),

        //配置全局环境变量
        new webpack.DefinePlugin({
            DEV: JSON.stringify('dev'),     //相当于生成了一个全局的DEV变量
        }),

    ],
    devServer: {
        port: 8080,
        progress: true,
        /**
         * 处理跨域的方式:
         *  1): 把请求代理到express服务器上
         *      -- 这里"/api"以说,请求是碰到以api开头的文件,需要将本地的地址转成target地址，防止找不到请求位置;
         *      -- pathRewrite的目的: 并不是所有的请求都是以 "/api"开头,所以配上pathRewrite，我们正常请求都加上
         *      "/api"开头，但是实际发送出去时webpack的proxy会自动帮我们置空
         */
        proxy: {
            '/api': {
                target: 'http://localhost:3000',    
                pathRewrite: { "/api": "" },
            }
        },

        /**
         * 处理跨域的方式:
         *  2): 前端通过模拟数据的方式；
         *      -- 其实这里的devServer，可以理解成一个请求的钩子，每次请求前都会访问一次这里
         */
        // before(app){
        //     app.get('/user', (req, res) => {
        //         res.json({name:"wangqi11111"});
        //     })
        // }

         /**
         * 处理跨域的方式:
         *  3): 服务端中启动webpack, 前端后服务端公用一个端口 (前提需使用node为后端)
         */
    }
};