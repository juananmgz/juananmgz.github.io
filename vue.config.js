const { defineConfig } = require("@vue/cli-service");
const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require("zlib");

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.plugins.push(
        new CompressionPlugin({
          algorithm: "gzip",
          test: /\.(js|css|html|svg)$/,
          threshold: 1024,
          minRatio: 0.8,
        }),
        new CompressionPlugin({
          filename: "[path][base].br",
          algorithm: "brotliCompress",
          test: /\.(js|css|html|svg)$/,
          compressionOptions: { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 } },
          threshold: 1024,
          minRatio: 0.8,
        })
      );
    }
  },
});
