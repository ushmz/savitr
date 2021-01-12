const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const nodeExternals = require('webpack-node-externals');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled TerserPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/terser-webpack-plugin
 *
 */

const TerserPlugin = require('terser-webpack-plugin');

module.exports = [
  {
    entry: {
      popup: './src/popup/index.tsx',
      option: [
        './src/option/Attention.tsx', 
        './src/option/Introduction.tsx',
        './src/option/PostTask.tsx',
        './src/option/PreTask.tsx',
        './src/option/Task/index.tsx',
        './src/option/index.tsx'
      ],
      background: './src/background/RuntimeMessageListener.ts'
    },
    output: {
      path: __dirname + '/dist/savitr',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
       },
        {
          test: /\.css/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: { url: false }
            }
          ]
        }
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.min.js', '.js', '.jsx'],
      modules: [
        path.resolve(__dirname, 'src', 'option'), 
        path.resolve(__dirname, 'src', 'popup'), 
        path.resolve(__dirname, 'src', 'service'), 
        path.resolve(__dirname, 'src', 'shared'), 
        'node_modules'
      ]
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './public/savitri-manifest.json',
            to: path.join(__dirname, 'dist', 'savitr', 'manifest.json')
          },
          {
            context: 'db/dumped',
            from: '*.csv',
            to: path.join(__dirname, 'dist','savitr', 'init', 'xrayed')
          },
          {
            context: 'db/serp/',
            from: '*.csv',
            to: path.join(__dirname, 'dist','savitr', 'init', 'serp')
          }
        ]
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: './index.html',
        chunks: ['popup'],
      }),
      new HtmlWebpackPlugin({
        template: './public/option.html',
        filename: './option.html',
        chunks: ['option'],
      }),
      new Dotenv(),
      new CleanWebpackPlugin()
    ],
    devServer: {
      inline: true,
      contentBase: path.join(__dirname, 'public'),
      watchContentBase: true
    }
  }
]