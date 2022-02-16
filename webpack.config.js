const path = require('path')
const html = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MainfestVersionSyncPlugin = require('webpack-manifest-version-sync')
const cssGlobalRegex = /\.global\.css$/i
const cssModuleRegex = /\.css$/i
const sassGlobalRegex = /\.global\.s[ac]ss$/i
const sassModuleRegex = /\.s[ac]ss$/i

module.exports = {
  entry: {
    popup: './src/popup/main.js'
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
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ],
      },
      {
        test: cssModuleRegex,
        exclude: cssGlobalRegex,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
              sourceMap: true,
            }
          }
        ]
      },
      {
        test: cssGlobalRegex,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                mode: 'icss'
              }
            }
          }
        ]
      },
      {
        test: sassModuleRegex,
        exclude: sassGlobalRegex,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
              sourceMap: true,
            }
          },
          'sass-loader'
        ]
      },
      {
        test: sassGlobalRegex,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: {
                localIdentName: '[local]',
              }
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new html({
      template: './src/popup/index.html',
      filename: 'popup.html',
      chunks: ['popup']
    }),
    new CleanWebpackPlugin(), 
    new MainfestVersionSyncPlugin() // 同步package版本号
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    open: false,
    host: '127.0.0.1',
    port: 8080,
    compress: true
  }
}