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
      publicPath: '/',
      filename: '[name].bundle.js',
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
                name: '[name].[ext]',
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
            from: 'public/css/**/*',
            to: path.resolve(__dirname, 'build'),
          },
          {
            from: 'public/img/samples/**/*.png',
            to: path.resolve(__dirname, 'build'),
          },
        ],
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new HtmlWebpackPlugin({
        filename: 'wip.html',
        template: './public/wip.html',
      }),
      new Dotenv({ path: envFile }),
      new CleanWebpackPlugin(),
    ],
    devtool: 'inline-source-map',
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      historyApiFallback: true,
      port: '8081',
    },
    watchOptions: {
      ignored: '**/node_modules',
    },
  };
};
