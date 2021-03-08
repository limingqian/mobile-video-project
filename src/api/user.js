import axios from "axios";
import { baseUrl, change } from "../utils";

export const login = async params => {
  axios.defaults.baseURL = baseUrl;
  axios.defaults.contentType = "application/x-www-form-urlencoded";
  const config = {
    url: "/webapp/login",
    method: "post",
    data: {
      account: params.username,
      password: params.pwd
    },
    transformRequest: change
  };
  axios.defaults.withCredentials = true;

  return await axios(config);
};
