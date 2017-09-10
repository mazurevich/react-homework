const path = require('path');

module.exports = {
  entry: './src/server/index.js',
  target: 'node',
  output: {
    path: path.join(__dirname, '../'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'file-loader',
        options: {
          name: 'public/media/[name].[ext]',
          publicPath: url => url.replace(/public/, ''),
          emit: false,
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader/locals',
          },
        ],
      },
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
    ],
  },
};
