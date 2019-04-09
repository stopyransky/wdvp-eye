/* eslint-disable no-undef */

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const styledComponentsTransformer = require('typescript-plugin-styled-components').default;
const keysTransformer = require('ts-transformer-keys/transformer').default;

process.traceDeprecation = false;

module.exports = {
  mode: 'development',
  entry: {
    main: [
      'babel-polyfill',
      './main.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-bundle.js'
  },
  resolve: {
    extensions: [ 'jsx', '.tsx', '.ts', '.js' ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    overlay: {
      warnings: true,
      errors: true
    },
    stats: 'errors-only',
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader'
          }
        ]
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              getCustomTransformers: program => ({
                before: [
                  styledComponentsTransformer(),
                  keysTransformer(program)
                ]
              })
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.html $/,
        use: [
          { loader: 'file-loader', options: {  name: '[name].html' } },
          { loader: 'extract-loader' },
          { loader: 'html-loader', options: { attrs: ['img:src'] } }
        ]
      },
      {
        test: /\.(svg|jpeg|jpg|gif|png|ico)$/,
        use: [
          { loader: 'file-loader', options: { name: 'images/[name].[ext]' } }
        ]
      },
      {
        test: /\.(glsl|frag|vert)$/,
        use: [
          { loader: 'raw-loader' },
          { loader: 'glslify-loader' }
        ]
      },
      {
        test: /\.(xml|txt|(c|d|t)sv)$/,
        use: [
          { loader: 'file-loader', options: { name: 'data/[name].[ext]' } }
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.ejs',
      favicon: './src/favicon.ico',
      title: 'wdvp'
    })
  ]
};
