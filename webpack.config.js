const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
      app: './src/index.tsx'
    },
    output: {
      path: __dirname + '/dist/savitri',
    },
    target: 'node',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
          // use: [
          //   {
          //     loader: 'babel-loader',
          //     options: { 
          //       presets: [['@babel/preset-env']],
          //       // presets: [['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3}]]
          //       plugins: ['@babel/plugin-transform-runtime'],
          //     }
          //   }
          // ],
          exclude: /node_modules/,
        },
        // {
        //   test: /\.html$/,
        //   use: [
        //     {
        //       loader: 'html-loader',
        //       options: {minimize: true},
        //     },
        //   ],
        // },
      ],
    },
  
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './public/savitri-manifest.json',
            to: path.join(__dirname, 'dist', 'savitri', 'manifest.json')
          },
          {
            context: 'db/dumped',
            from: '*.csv',
            to: path.join(__dirname, 'dist','savitri', 'init')
          }
        ]
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: './index.html',
        chunks: ['app'],
      }),
      new CleanWebpackPlugin()
    ],
    devServer: {
      inline: true,
      contentBase: path.join(__dirname, 'public'),
      watchContentBase: true
    }
  }
]