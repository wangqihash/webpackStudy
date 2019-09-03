/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2019-08-18 02:10:17
 * @LastEditTime: 2019-08-18 02:27:42
 */

let path = require('path');
let Webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: {
        react: ['react', 'react-dom'],
    },
    output: {
        filename: "__dll_[name].js",
        path: path.resolve(__dirname, 'dist'),
        library: '__dll_[name]'
    },

    plugins: [
        new Webpack.DllPlugin({
            name: "__dll_[name]",
            path: path.resolve(__dirname, 'dist', 'manifest.json')

        })
    ],
};