const HtmlWebPackPlugin = require('html-webpack-plugin');

const now = () => (new Date).toLocaleDateString();

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/index.html',
      title: 'IDGF',
      date: now()
    })
  ]
};

