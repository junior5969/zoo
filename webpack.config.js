const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/app.ts', // il tuo file principale TypeScript
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]', // mantiene il nome e la cartella
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'], // per import senza estensione
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // pulisce dist ad ogni build
    publicPath: '/zoo/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // prende l'HTML dalla root
    }),
      new CopyWebpackPlugin({
      patterns: [
        { from: 'img', to: 'img' } // copia tutta la cartella img nella dist/img
      ],
    }),
  ],
  devServer: {
    static: './dist',
    port: 3000,
    open: true, // apre il browser automaticamente
  },
  mode: 'development',
};
