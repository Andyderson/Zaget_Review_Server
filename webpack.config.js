const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

var SRC_DIR = path.join(__dirname, '/client');
var DIST_DIR = path.join(__dirname, '/public');

// <<<<<<<<<<<<<<<<<<< Server Side Rendering >>>>>>>>>>>>>>>
const common = {
  plugins: [
    new webpack.DefinePlugin({
      // BASE_URL: JSON.stringify('http://localhost:3003'),
      // BASE_URL: JSON.stringify('http://proxyloadbalancer-1317420474.us-west-1.elb.amazonaws.com/')
      // BASE_URL: JSON.stringify('http://54.67.36.192:3003'),
      BASE_URL: JSON.stringify('http://54.193.102.234:3003'),
      // BASE_URL: JSON.stringify('http://54.183.83.62:3003'),
      // BASE_URL: JSON.stringify('http://54.215.133.181:3003'),
      // BASE_URL: JSON.stringify('http://13.57.213.76:3003'),
      // BASE_URL: JSON.stringify('http://54.153.25.117:3003'),
      // BASE_URL: JSON.stringify('http://13.57.30.252:3003'),
      // BASE_URL: JSON.stringify('http://13.57.210.81:3003'),
      // BASE_URL: JSON.stringify('http://54.219.150.853:3003'),
      // BASE_URL: JSON.stringify('http://54.241.140.13:3003'),
    })
  ],
  context: __dirname + '/client',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include : SRC_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'env']
        },
      },
    ],
  }
};

const client = {
  entry: `${SRC_DIR}/client.js`,
  output: {
    path: __dirname + '/public',
    filename: 'app.js'
  }
};

const server = {
  entry: `${SRC_DIR}/server.js`,
  target: 'node',
  output: {
    path: __dirname + '/public',
    filename: 'app-server.js',
    libraryTarget: 'commonjs-module'
  }
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server)
];

// <<<<<<<<<<<<<<<<<<< Original >>>>>>>>>>>>>>>>>>>>>>>
// module.exports = {
//   plugins: [
//     new webpack.DefinePlugin({
//       // BASE_URL: JSON.stringify('http://54.215.215.188:3003'),
//       BASE_URL: JSON.stringify('http://localhost:3003'),
//       // BASE_URL: JSON.stringify('http://54.183.72.230:3003'),
//       APIKEY: JSON.stringify('YOUR_API_KEY'),
//     })
//   ],
//   context: __dirname + '/client',
//   entry: './index.jsx',
//   module: {
//     loaders: [
//       {
//         test: /\.jsx?$/,
//         include : SRC_DIR,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//         query: {
//           presets: ['react', 'es2015', 'env']
//         },
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader','css-loader']
//       }
//     ],
//   },
//   output: {
//     path: __dirname + '/public',
//     filename: 'app.js',
//   }
// };