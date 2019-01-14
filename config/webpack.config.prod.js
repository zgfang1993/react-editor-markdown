const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devConfig = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js',
    libraryTarget: 'umd', // 采用通用模块定义, 注意webpack到4.0为止依然不提供输出es module的方法，所以输出的结果必须使用npm安装到node_modules里再用，不然会报错
    library: 'react-editor-markdown',
    libraryExport: 'default', // 兼容 ES6(ES2015) 的模块系统、CommonJS 和 AMD 模块规范
  },
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom"
    }
  },
  module: {
    rules: [{
      test: /\.(sc|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
          loader: "sass-loader",
          options: {
            sourceMap: false
          }
        }
      ]
    }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "editor.css"
    })
  ],
}

module.exports = merge(devConfig, baseConfig);