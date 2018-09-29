const webpack = require('webpack');
const path = require("path");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const autoprefixer = require('autoprefixer');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

module.exports = {
	mode: 'production',//'production' | 'development' | 'none'
	entry: "./src/index",
	target: 'web',
	devtool: 'source-map',
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
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					mangle: true,
				},
			}),
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
	},
	plugins: [
		new webpack.DefinePlugin(GLOBALS),//defines vars avaialble to livraries
		new webpack.optimize.OccurrenceOrderPlugin(), //optimizes the order files are bundled
		new MiniCssExtractPlugin({
			filename: 'styles.css'
		})
	],
	node:{
		net: 'empty',
		dns: 'empty'
	},
	module: {
		rules: [{
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
			{
				test: /\.s?[ac]ss$/,
				use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false, sourceMap: false } },
                    { loader: 'sass-loader', options: { sourceMap: false } }
                ],
			},
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