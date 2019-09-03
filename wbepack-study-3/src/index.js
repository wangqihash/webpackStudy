/*
 * @Description: 项目入口
 * @Author: wangqi
 * @Date: 2019-08-18 01:24:31
 * @LastEditTime: 2019-08-27 20:10:03
 */

//测试dll动态链接库
import jQuery from "jquery";
// import React from 'react';
// import { render } from 'react-dom';

// render(<h1>jsx</h1>, window.root)
// console.log("indexjs");


//提取公共的代码
// import './a';
// import './b';
// console.log("~~~index.js");

//懒加载
let btn = document.createElement("button");
btn.innerHTML = "按钮";
btn.addEventListener("click", ()=>{
    //require 能够实现这样的懒加载但是其本身没有import做的更优化
    //import如果不支持这样懒加载的话需要下载插件:
    //@babel/plugin-syntax-dynamic-import

    // let test = require("./test");
    // console.log(test)
    import('./test').then((data)=>{
        console.log(data)
    })
});
document.body.appendChild(btn);

{
    let obj = {
        sname:"wq",
        sage:12
    }
    console.log(obj.hasOwnProperty("toString"));
    console.log(jQuery,"jQuery");
}