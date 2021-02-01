const BASE_URL =
  process.env.NODE_ENV === "production" ? "/mobile-video-project/" : "/";

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
  }
};
