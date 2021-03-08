// 打包部署到正式环境需要改变 baseUrl
// export const baseUrl = 'http://jinran.jisoft.net/inxedu'
export const baseUrl = "/api";

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
