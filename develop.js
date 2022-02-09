// webpack.config.js
const html = require('html-webpack-plugin');
const clean = require('clean-webpack-plugin');
const path = require('path');
const extract = require('extract-text-webpack-plugin');
module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader']
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'static/fonts/[name].[hash].[ext]'
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        loader: 'url-loader',
        options: {
          name: 'static/img/[name].[hash].[ext]',
          limit: 4096
        }
      }
    ]
  },
  mode: 'development',
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts']
  },
  plugins: [
    new html({
      template: './src/index.html'
    }),
    new clean([path.resolve('./dist')], {
      root: path.resolve('./')
    })
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve("./dist")
  }
}