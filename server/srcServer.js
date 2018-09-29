const colors = require('colors');
const express = require('express');
const webpack = require('webpack');
const path = require('path');
const webpackConfig = require('../webpack.config.dev');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const open = require('open');
const cors = require( 'cors');

/* eslint-disable no-console */

const port = 3000;
const compiler = webpack(webpackConfig);
const app = express();

app.use(cors());
app.use( webpackMiddleware(compiler, { noInfo: true, hot: true, publicPath: webpackConfig.output.publicPath }) );
app.use( webpackHotMiddleware(compiler) );
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});

console.log(`Src Server is running at port:${port}.`.green);
