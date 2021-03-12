import axios from "axios";
import { baseUrl, change, getToken } from "../utils";

// 课程列表接口
export const courseList = async params => {
  axios.defaults.baseURL = baseUrl;
  axios.defaults.contentType = "application/x-www-form-urlencoded";
  axios.defaults.headers.common["token"] = getToken;

  const config = {
    url: "/webapp/cou/list",
    method: "post",
    data: params, // 直接传递参数
    transformRequest: change
  };
  axios.defaults.withCredentials = true;

  return await axios(config);
};

// 课程详情接口
export const courseDetail = async params => {
  axios.defaults.baseURL = baseUrl;
  axios.defaults.contentType = "application/x-www-form-urlencoded";
  axios.defaults.headers.common["token"] = getToken;

  const config = {
    url: "/webapp/front/couinfo",
    method: "post",
    data: params, // 直接传递参数
    transformRequest: change
  };
  axios.defaults.withCredentials = true;

  return await axios(config);
};

// 我的课程列表接口
export const myCourseList = async params => {
  axios.defaults.baseURL = baseUrl;
  axios.defaults.contentType = "application/x-www-form-urlencoded";
  axios.defaults.headers.common["token"] = getToken;

  const config = {
    url: "/webapp/myCourse",
    method: "post",
    data: params, // 直接传递参数
    transformRequest: change // 转换为 form-data
  };
  axios.defaults.withCredentials = true;

  return await axios(config);
};

// 学过此课的人接口
export const learnList = async params => {
  axios.defaults.baseURL = baseUrl;
  axios.defaults.contentType = "application/x-www-form-urlencoded";
  axios.defaults.headers.common["token"] = getToken;

  const config = {
    url: "/couserStudyHistory/ajax/courseLearnedUser/" + params.courseId,
    method: "get"
  };
  axios.defaults.withCredentials = true;

  return await axios(config);
};
