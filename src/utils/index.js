// 打包部署到正式环境需要改变 baseUrl
// export const baseUrl = "http://jinran.jisoft.net/inxedu";
// export const baseUrl = "http://edu.ophyer.com/inxedu";
export const baseUrl = "http://pingtai.jr-vr.com/inxedu";
// export const baseUrl = "/api";

import storage from "./storage";
let Base64 = require("js-base64").Base64;

// 转换参数为 form-data
export const change = [
  function(data) {
    let ret = "";
    for (let it in data) {
      ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
    }
    ret = ret.substring(0, ret.lastIndexOf("&"));
    return ret;
  }
];

let userId = storage.get("userId");
export const getToken = Base64.encode(userId[0]);
