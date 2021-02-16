const path = require("path");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const dotenvP = require('dotenv').config({ path: __dirname + '/.env' });
const webpack = require('webpack');

module.exports = {
  entry: {
    main: "./client/index.tsx"
  },
  devServer: {
    open: true,
    hot: true,
    contentBase: path.join(__dirname, 'dist-client'),
    compress: true,
    port: process.env.DEV_CLIENT_PORT ? parseInt(process.env.DEV_CLIENT_PORT) : 8000,
    historyApiFallback: true
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".jsx", ".js", ".json"],
    plugins: [
      new TsconfigPathsPlugin({ configFile: 'client.tsconfig.json' })
    ],
    alias: {
      crypto: "crypto-browserify",
      util: "util",
      stream: "stream-browserify"
    }
  },
  output: {
    path: path.join(__dirname, "dist-client"),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            babelrc: false,
            plugins: ["@babel/plugin-transform-regenerator", "@babel/plugin-transform-runtime"],
            presets: [
              [
                "@babel/preset-env",
                { targets: { browsers: "last 2 versions" } }
              ],
              "@babel/preset-typescript",
              "@babel/preset-react"
            ],
          }
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'dist-react/fonts/',
              publicPath: '/dist-react/fonts/'
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'dist-react/images/',
          publicPath: '/dist-react/images/'
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenvP.parsed)
    }),
    new Dotenv(),
    new webpack.ProvidePlugin({
      "React": "react",
      process: "process/browser"
    }),
  ]
};