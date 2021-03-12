const BASE_URL = process.env.NODE_ENV === "production" ? "/" : "/";
// /mobile-video-project/

module.exports = {
  publicPath: BASE_URL,
  chainWebpack: config => {
    // 配置 file Loader 加载文件
    const imagesRule = config.module.rule("images");
    imagesRule.uses.clear();
    imagesRule
      .use("file-loader")
      .loader("url-loader")
      .options({
        limit: 1000000,
        fallback: {
          loader: "file-loader",
          options: {
            name: "img/[name].[hash:8].[ext]"
          }
        }
      });
  },
  devServer: {
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      // 解决本地开发调用远程接口的跨域问题
      "/api": {
        target: "http://jinran.jisoft.net/inxedu",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
