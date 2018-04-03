let webpack = require('webpack');
let path = require("path");
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

module.exports = {
	entry: "./src/index",
	target: 'web',
	devTool: 'source-map',
	debug: true,
	noInfo: false,
	output: {
		path: __dirname + "/public/assets",
		publicPath: "/assets",
		filename: "bundle.js"
	},
	devServer: {
		inline: true,
		contentBase: './public',
		port: 3000
	},
	plugins: [
		new webpack.DefinePlugin(GLOBALS),//defines vars avaialble to livraries
		new ExtractTextPlugin('/styles.css', { allChunks: true}),
		new webpack.optimize.OccurrenceOrderPlugin(), //optimizes the order files are bundled
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin(), //minifies JS files
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.optimize\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: {
				discardComments: {
					removeAll: true
				}
			},
			canPrint: true
		})
	],
	node:{
		net: 'empty',
		dns: 'empty'
	},
	module: {
		loaders: [{
				test: /\.js$/,
				include: path.join(__dirname, 'src'), 
				exclude: /(node_modules)/,
				loader: "babel-loader",
			},
			{
				test: /\.json$/,
				exclude: /(node_modules)/,
				loader: "json-loader"
			},
			{ test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery'},
			// CSS Definitions
			{ test: /\.css$/,  loader: ExtractTextPlugin.extract("style-loader","css-loader") },
			{ test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass')},
			// Font Definitions
			{ test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,  loader: 'url?limit=10000&mimetype=application/font-woff&name=/fonts/[name].[ext]' },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 		loader: 'url?limit=10000&mimetype=application/vnd.ms-fontobject&name=/fonts/[name].[ext]' },
			{ test: /\.[ot]tf(\?v=\d+\.\d+\.\d+)?$/, 	loader: 'url?limit=10000&mimetype=application/octet-stream&name=/fonts/[name].[ext]' },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 		loader: 'url?limit=10000&mimetype=image/svg+xml&name=/fonts/[name].[ext]' },
			// Images
			{
				test: /\.(jpg|jpeg|gif|png)$/,
				exclude: /(node_modules)/,
				loader: "file-loader?name=/images/[name].[ext]"
			}
		]
	}
};