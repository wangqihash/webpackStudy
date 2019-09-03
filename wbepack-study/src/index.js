/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2019-08-12 22:18:06
 * @LastEditTime: 2019-08-17 17:54:18
 */

let str = require('./a.js');
require("./a.css")
require("./a.less");
console.log(str, "run Cdoe");

let fn = () => {
    console.log(1111111);
}
fn();

@log
class A {
    a = "我是class的aaa";
}
let a = new A();
console.log(a.a);

function log(params) {
    console.log(params, "装饰器语法")
}

let p = new Promise((res, rej) => { })
console.log(p, "promise");

function* gen(param) {
    yield 1;
}
console.log(gen().next());

console.log("wwwwdddfff".includes("w"));


import wman from './wman.jpg';
console.log(wman,"wman");
let image = new Image();
image.src = wman;
document.getElementsByClassName("img")[0].appendChild(image);