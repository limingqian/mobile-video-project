import axios from "axios";
import { baseUrl, change, getToken } from "../utils";

// 收藏接口
export const collect = async params => {
  axios.defaults.baseURL = baseUrl;
  axios.defaults.contentType = "application/x-www-form-urlencoded";
  axios.defaults.headers.common["token"] = getToken;

  const config = {
    url: "/webapp/front/createfavorites",
    method: "post",
    data: params, // 直接传递参数
    transformRequest: change
  };
  axios.defaults.withCredentials = true;

  return await axios(config);
};

// 取消收藏接口
export const cancelCollect = async params => {
  axios.defaults.baseURL = baseUrl;
  axios.defaults.contentType = "application/x-www-form-urlencoded";
  axios.defaults.headers.common["token"] = getToken;

  const config = {
    url: "/webapp/deleteFaveorite",
    method: "post",
    data: params, // 直接传递参数
    transformRequest: change
  };
  axios.defaults.withCredentials = true;

  return await axios(config);
};

// 我的收藏接口
export const myCollection = async params => {
  axios.defaults.baseURL = baseUrl;
  axios.defaults.contentType = "application/x-www-form-urlencoded";
  axios.defaults.headers.common["token"] = getToken;

  const config = {
    url: "/webapp/myFavorites",
    method: "post",
    data: params, // 直接传递参数
    transformRequest: change
  };
  axios.defaults.withCredentials = true;

  return await axios(config);
};




