const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

//为生产打包压缩
const compress = new CompressionWebpackPlugin({
  filename: info => {
    return `${info.path}.gz${info.query}`
  },
  algorithm: 'gzip',
  threshold: 10240,
  test: new RegExp('\\.(' + ['js'].join('|') + ')$'),
  minRatio: 0.8,
  deleteOriginalAssets: false
})
//获取环境变量，判断是否为生成环境
const isProduction = process.env.NODE_ENV === 'production'
//用cdn的形式引入
const cdn = {
  css: [],
  js: [
    'https://cdn.bootcss.com/vue/2.5.21/vue.runtime.min.js',
    'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
    'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
    'https://cdn.bootcss.com/axios/0.18.0/axios.min.js'
  ]
}

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  //部署应用包时的基本 URL，具体根据生产环境路径配置
  publicPath: process.env.NODE_ENV === 'production' ? '/online/' : './',
  //当运行 vue-cli-service build 时生成的生产环境构建文件的目录
  outputDir: 'dist',
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'assets',
  // eslint-loader 是否在保存的时候检查 安装@vue/cli-plugin-eslint有效
  // lintOnSave: true,
  //是否使用包含运行时编译器的 Vue 构建版本。设置true后你就可以在使用template
  runtimeCompiler: true,
  /**
   * 生产环境是否生成 sourceMap ,开发环境为true，方便调试，生产环境为false ，加速生产环境构建，优化项目体积大小
   * */
  productionSourceMap: isProduction ? false : true,
  // webpack配置
  chainWebpack: config => {
    config
      .entry('index')
      .add('babel-polyfill')
      .end()
    // 配置别名
    config.resolve.alias.set('@', resolve('src'))
    // .set('@img',resolve('src/assets/images'))
    // .set('@css'.resolve('src/assets/css'))
    // .set('@less'.resolve('src/assets/less'))
    //生产环境配置
    if (isProduction) {
      //生产环境注入cdn
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args
      })
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
    config.plugins.delete('prefetch') //取消prefetch(预取)和preload(预加载)
    config.plugins.delete('preload')
    // 压缩代码
    config.optimization.minimize(true)
    // 分割代码
    config.optimization.splitChunks({
      chunks: 'all'
    })
    // //压缩图片
    // config.module
    //   .rule('images')
    //   .test(/\.(gif|png|jpe?g|svg)$/i)
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({
    //     bypassOnDebug: true
    //   })
    //   .end()
  },
  configureWebpack: config => {
    if (isProduction) {
      // 为生产环境修改配置...
      const plugins = []
      plugins.push(
        // 生产环境自动删除console.log
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              //   warnings:false,
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log'] // 移除console
            }
          },
          sourceMap: false,
          parallel: true
        }),
        compress
      )
      config.plugins = [...config.plugins, ...plugins]
      //用CDN方式引入
      config.externals = {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        axios: 'axios'
      }
    } else {
      // 为开发环境修改配置...
    }
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin 生产环境下是true,开发环境下是false,因为它和 CSS 热重载不兼容。
    extract: isProduction ? true : false,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      // postcss: {
      //   plugins: [
      //     require('postcss-plugin-px2rem')({
      //       rootValue: 75, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
      //       // unitPrecision: 5, //允许REM单位增长到的十进制数字。
      //       //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
      //       // propBlackList: [], //黑名单
      //       exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
      //       // selectorBlackList: [], //要忽略并保留为px的选择器
      //       // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
      //       // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
      //       mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
      //       minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
      //     })
      //   ]
      // }
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // webpack-dev-server 相关配置
  devServer: {
    // 设置代理
    hot: true, //热加载
    host: '0.0.0.0', //ip地址
    // port: 8085, //端口
    https: false, //false关闭https，true为开启
    open: true, //自动打开浏览器
    proxy: {
      '/api': {
        //本地
        target: 'xxx',
        // 如果要代理 websockets
        ws: true,
        changeOrigin: true
      },
      '/test': {
        //测试
        target: 'xxx'
      },
      '/pre': {
        //预发布
        target: 'xxx'
      },
      '/pro': {
        //正式
        target: 'xxx'
      }
    }
  },
  pluginOptions: {
    // 第三方插件配置
    // ...
    webpackBundleAnalyzer: {
      openAnalyzer: false //使用webpack-bundle-analyzer可以看到项目各模块的大小，可以按需优化
    }
  }
}
