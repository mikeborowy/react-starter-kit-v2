import colors from 'colors';
import express from'express';
import webpack from'webpack';
import path from'path';
import webpackConfig from'../webpack.config.dev';
import webpackMiddleware from'webpack-dev-middleware';
import webpackHotMiddleware from'webpack-hot-middleware';
import open from'open';
import cors from 'cors';

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
