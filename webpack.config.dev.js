const webpack = require("webpack");
const path = require("path");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
	debug: true,
	noInfo: false,
	devTool: 'eval-source-map',
	entry: [
		'webpack-hot-middleware/client',
		path.join( __dirname, '/src/index.js')
	],
	target: 'web',
	output: {
		path: '/'
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.optimize\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: {
				discardComments: {
					removeAll: true
				}
			},
			canPrint: true
		}),
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
				loaders: ['react-hot', 'babel']
			},
			{
				test: /\.json$/,
				exclude: /(node_modules)/,
				loader: "json-loader"
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader!autoprefixer-loader',
			},
			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
			},
			{
				test: /\.less$/,
				loader: 'style-loader!css-loader!less-loader'
			},
			{
				test: /bootstrap\/js\//,
				loader: 'imports?jQuery=jquery'
			},
			{
				test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=application/font-woff"
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=application/octet-stream"
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: "file"
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=image/svg+xml"
			},
			//Images
			{
				test: /\.(jpg|jpeg|gif|png)$/,
				exclude: /(node_modules)/,
				loader: "file-loader?name=../images/[name].[ext]"
			}
		]
	}
};