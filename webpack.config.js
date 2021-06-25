const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const nodeExternals = require('webpack-node-externals');

const TerserPlugin = require('terser-webpack-plugin');

module.exports = () => {
  const envFile = '.env';

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'build'),
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: { url: false },
            },
          ],
        },
        {
          test: /\.(png|jp(e*)g|svg|gif)/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'public/[name].[ext]',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      modules: ['node_modules', path.resolve(__dirname, 'src')],
      extensions: ['.ts', '.tsx', '.min.js', '.js', '.jsx'],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'public/**/*',
            to: path.resolve(__dirname, 'build'),
          },
          //          {
          //            context: './public/img',
          //            from: '*.svg',
          //            to: path.resolve(__dirname, 'build', 'img'),
          //          },
        ],
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new Dotenv({ path: envFile }),
      new CleanWebpackPlugin(),
    ],
    devServer: {
      inline: true,
      contentBase: path.join(__dirname, 'public'),
      watchContentBase: true,
      historyApiFallback: true,
    },
  };
};
