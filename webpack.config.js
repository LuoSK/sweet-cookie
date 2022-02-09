const path = require('path')
const html = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  entry: {
    popup: './src/popup/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat'
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      }
    ]
  },
  plugins: [
    new html({
      template: './src/popup/index.html',
      filename: 'popup.html'
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    open: true,
    host: '127.0.0.1',
    port: 8080,
    compress: true
  }
}