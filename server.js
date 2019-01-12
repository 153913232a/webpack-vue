const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

const server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  proxy: {
    '/api/*': {
      target: "https://cnodejs.org",
      secure: true
    }
  },
  stats: {
    color: true
  }
})

//将其他路由，全部返回index.html
server.app.get('*', function (req, res) {
  res.sendFile(__dirname + '/index.html')
});

server.listen(8080);