module.exports = {
  configureWebpack: {
    devtool: "source-map",
  },
  pwa: {
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      clientsClaim: true,
    },
  },
  transpileDependencies: ["vuetify"],

  devServer: {
    // https://github.com/webpack/webpack-dev-server/issues/1850#issuecomment-490926569
    // host: "127.0.0.1",
    hot: false,
    // liveReload: true,
    // ipc: true,
    proxy: {
      "^/db": {
        target: "http://localhost:5984/",
        pathRewrite: {
          "^/db": "", // remove base path
        },
        ws: true,
        changeOrigin: true,
        headers: {
          Connection: "keep-alive",
        },
        secure: false,
      },
      "^/api": {
        target: "http://localhost:5050/",
        pathRewrite: {
          "^/api": "", // remove base path
        },
        secure: false,
      },
      "^/s3": {
        target: "http://localhost:5660/",
        pathRewrite: {
          "^/s3": "",
        },
        secure: false,
      },
    },
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true,
      enableBridge: false,
    },
  },
};
