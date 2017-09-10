const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { CommonsChunkPlugin } = require('webpack').optimize;

const isDev = process.env.NODE_ENV === 'development';

function isExternal(module) {
  var context = module.context;

  if (typeof context !== 'string') {
    return false;
  }

  return context.indexOf('node_modules') !== -1;
}


const clientConfig = {
  entry: {
    app: './src/client/index.js',
  },
  output: {
    path: path.resolve('public'),
    filename: '[name].js',
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'file-loader',
        options: {
          name: 'public/media/[name].[ext]',
          publicPath: url => url.replace(/public/, ''),
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 },
            },
            {
              loader: 'postcss-loader',
              options: { plugins: [autoprefixer()] },
            },
          ],
        }),
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'public/css/[name].css',
    }),
    new CommonsChunkPlugin({
      name: 'common',
      minChunks: function(module, count) {
        return !isExternal(module) && count >= 2; // adjustable
      },
    }),
    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module) {
        return isExternal(module);
      },
    }),
  ],
};

if (isDev) {
  clientConfig.plugins = [
    ...clientConfig.plugins,
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
      chunks: ['vendor', 'common', 'app'],
    }),
  ];
}

module.exports = clientConfig;
