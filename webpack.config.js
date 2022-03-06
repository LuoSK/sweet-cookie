const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

const html = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const MainfestVersionSyncPlugin = require('webpack-manifest-version-sync-plugin')
const cssGlobalRegex = /global\.css$/i
const cssModuleRegex = /\.css$/i
const sassGlobalRegex = /global\.s[ac]ss$/i
const sassModuleRegex = /\.s[ac]ss$/i


module.exports = {
  devtool: isDev ? 'cheap-module-source-map' : false,
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
      'react-dom': 'preact/compat',
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          }
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
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(__dirname, 'src/assets/styles/reset.scss'),
                path.resolve(__dirname, 'src/assets/styles/variables.scss'),
              ]
            }
          }
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
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(__dirname, 'src/assets/styles/reset.scss'),
                path.resolve(__dirname, 'src/assets/styles/variables.scss'),
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        loader: 'url-loader',
        options: {
          limit: 4096
        }
      }
    ]
  },
  plugins: [
    new html({
      template: './src/popup/index.html',
      filename: 'popup.html',
      chunks: ['popup']
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './src/manifest.json',
          to: './manifest.json'
        },
        {
          from: './src/assets',
          to: './assets'
        }
      ]
    }),
    new MainfestVersionSyncPlugin(), // 同步package版本号
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: [path.resolve(__dirname, 'dist/popup.js.LICENSE.txt')],
    }),
  ],
  devServer: {
    hot: true,
    static: {
      watch: false
    },
    open: false,
    devMiddleware: {
      writeToDisk: true,
    },
    port: 8080,
    compress: true
  }
}
