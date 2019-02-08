var path = require('path')

let jsRule = {
  test: /\.js$/,
  exclude: [/node_modules/],
  use: [{
    loader: 'babel-loader',
    options: {
      plugins: [
        "transform-class-properties"
      ]
    }
  }]
}

module.exports = (env, argv) => {
  const defaultConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    watch: false,
    module: {
      rules: [
        jsRule
      ]
    },
    output: {
      filename: '[name]',
      path: path.resolve(__dirname, 'dist')
    },
    node: {
      fs: 'empty'
    }
  }

  let mainConfig = Object.assign({}, defaultConfig, {
    name: 'editor-exports',
    mode: 'development',
    entry: {
      'client.js': path.resolve(__dirname, 'src/client.js')
    },
  })


  const configs = [
    mainConfig
  ]
  return configs
}