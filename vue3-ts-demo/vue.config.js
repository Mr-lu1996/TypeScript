const { defineConfig } = require('@vue/cli-service')
// 按需引入
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:8888',
  //       pathRewrite: {'^/api': ''}, //将路径中的 /api 全部替换为空字符串
  //       ws: true,  //用于支持 websocket
  //       changeOrigin: true  //用于控制请求头中的host值
  //     }
  //   }
  // }
})
