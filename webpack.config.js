const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const ExtractRootCss = new ExtractTextPlugin({filename:'styles/root.css',allChunks:false}) //公共样式
const ExtractVueCss = new ExtractTextPlugin({filename:'styles/[name]/style.css',allChunks:true}) // 每个页面的样式
const ExtractOthersCss = new ExtractTextPlugin({filename:'styles/others.css',allChunks:false})

const config  ={
  entry:'./src/main.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:"js/[name].js"
  },
  devServer: {
    contentBase: './dist', // devServer会从这个目录下寻找编译后的文件然后加载到模板上,
    proxy: {
      '/api/*': {
        target: 'https://cnodejs.org',
        pathRewrite: { '^/api': '/api' },
        changeOrigin: true,
        secure: false, // 接受 运行在 https 上的服务
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ['env']
        }
      },
      {
        test:/\.css$/,
        include: /node_modules/,
        use:ExtractOthersCss.extract({
          fallback:'style-loader',
          use:['css-loader']
        })

        //依次使用以上loader加载css文件，postcss-loader可以暂时不加，后面再深入修改webpack配置的时候再说用处
        //
        //也可以写成这样 loader："style-loader!css-loader!postcss-loader"
      },
      {
        test:/\.css$/,
        exclude: /node_modules/,
        use:ExtractRootCss.extract({
          fallback:'style-loader',
          use:['css-loader']
        })

        //依次使用以上loader加载css文件，postcss-loader可以暂时不加，后面再深入修改webpack配置的时候再说用处
        //
        //也可以写成这样 loader："style-loader!css-loader!postcss-loader"
      },
      {
        test:/\.(png|jpe?j|gif|svg)(\?.*)?$/,
        loader:'url-loader',
        options:{
          limit:10000,
          name:'img/[name].[ext]?[hash]'
        }
        //图片文件大小小于limit的数值，就会被改写成base64直接填入url里面，
        //不然会输出到dist/img目录下，[name]原文件名，[ext]原后缀，[hash]在url上加上一点哈希值避免缓存。
      },
      {
        test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader:"url-loader",
        options:{
          limit:10000,
          name:'fonts/[name].[ext]?[hash]'
        }
        //和上面一致
      },
      {
        test:/\.less$/,
        exclude: /node_modules/,
        use:ExtractVueCss.extract({
          fallback:'style-loader',
          use:[
            'css-loader',
            'less-loader'
          ]
        })
      },
      {
        test:/\.vue$/,
        loader:'vue-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.less'],
    alias: {
      //正在使用的是vue的运行时版本，而此版本中的编译器时不可用的，我们需要把它切换成运行时 + 编译的版本
      'vue$':'vue/dist/vue.esm.js',// 'vue/dist/vue.common.js' for webpack 1
      //用@直接指引到src目录下，如：'./src/main'可以写成、'@/main'
      '@': path.resolve(__dirname,'./src'),
      common: require('path').resolve(__dirname, './src/common/') // 配置路径
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({ // 按照index.html作为模板在dist目录下生成带上所有资源的html 文件。
      filename: 'index.html',
      title: 'vue demo',
      template: './index.html',
    }),
    ExtractRootCss,//填入插件实例，复用的css
    ExtractVueCss,//记得按顺序填入，vue内的css
    ExtractOthersCss,
    new UglifyJsPlugin({  // 压缩js
      exclude: /node_modules/,
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: true
    }),
    new webpack.HotModuleReplacementPlugin() // 代码改后不用重新刷新页面
  ],
  externals: {
    'jquery': 'window.jquery'
  }
}


if(process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }))
  config.optimization = { //minChunks参数可以是number类型,填2 就是说有2个chunk以上用到的公共块就会被打包的vender.js里面。minChunks也可以传一个方法，返回值是boolean类型.（chunk可以简单理解为entry属性设置的入口而生成的整条关系树,所以到目前为止本项目也只有一个chunk，就是'app',当然插件生成的vender也是一个chunk。对初学者来说就这样理解吧，用多了自然会有概念）
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2, maxInitialRequests: 5, //两个以上的入口文件就打包生成公共模块
          minSize: 0
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    },
    runtimeChunk: true
  }
}

module.exports = config