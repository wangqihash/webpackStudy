/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2019-08-17 18:50:30
 * @LastEditTime: 2019-08-24 09:25:00
 */

import 'bootstrap/dist/css/bootstrap.css';
import './style';

{
    let xhr = new XMLHttpRequest();

    xhr.open('GET', '/api/user', true);

    xhr.onload = function () {
        console.log(xhr.response);
    }

    xhr.send();
}

{
    let url = "";
    if(DEV==="dev"){
        url = "http://localhost:8089";
    }else{
        url = 'http://www.wqhash.com';
    }
    console.log(url,"devevvev===")
}
