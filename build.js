// webpack.build.config.js
const html = require('html-webpack-plugin');
const clean = require('clean-webpack-plugin');
const path = require('path');
const extract = require('extract-text-webpack-plugin');
module.exports = {
  entry: path.resolve('./src/index.tsx'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader']
      },
      {
        test: /\.less$/,
        use: extract.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
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
  mode: 'production',
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vender: {
          name: 'vendor',
          minSize: 0,
          chunks: 'initial',
          test: /node_modules/,
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    },
    minimize: true
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].js',
    publicPath: './'
  },
  plugins: [
    new html({
      template: './src/index.html'
    }),
    new clean([path.resolve('./dist')], {
      root: path.resolve('./')
    }),
    new extract({
      filename: 'static/css/[name].[hash:8].css',
      allChunks: true
    })
  ]
}