import axios from "axios";
import { baseUrl, change, getToken } from "../utils";

// 专业列表接口
export const subjectList = async params => {
  axios.defaults.baseURL = baseUrl;
  axios.defaults.contentType = "application/x-www-form-urlencoded";
  axios.defaults.headers.common["token"] = getToken;

  const config = {
    url: "/webapp/subj/toSubjectList",
    method: "post",
    data: params, // 直接传递参数
    transformRequest: change
  };
  axios.defaults.withCredentials = true;

  return await axios(config);
};

// 讲师列表接口
export const teacherList = async params => {
  axios.defaults.baseURL = baseUrl;
  axios.defaults.contentType = "application/x-www-form-urlencoded";
  axios.defaults.headers.common["token"] = getToken;

  const config = {
    url: "/webapp/teacher/list",
    method: "post",
    data: params, // 直接传递参数
    transformRequest: change
  };
  axios.defaults.withCredentials = true;

  return await axios(config);
};
