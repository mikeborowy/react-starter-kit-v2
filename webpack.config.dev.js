const webpack = require("webpack");
const path = require("path");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const autoprefixer = require('autoprefixer');

module.exports = {
	mode: 'development',//'production' | 'development' | 'none'
	devtool: 'source-map',
	entry: [
		'webpack-hot-middleware/client',
		path.join( __dirname, '/src/index.js')
	],
	target: 'web',
	output: {
		path: '/',
		filename: './bundle.js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
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
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets:['react','es2015']
					}
				}
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				include: path.join(__dirname, 'src'),
				loader: require.resolve('babel-loader'),
				options: {
					// This is a feature of `babel-loader` for webpack (not Babel itself).
					// It enables caching results in ./node_modules/.cache/babel-loader/
					// directory for faster rebuilds.
					cacheDirectory: true,
					plugins: ['react-hot-loader/babel'],
				},
			},
			{
				test: /\.json$/,
				exclude: /(node_modules)/,
				loader: "json-loader"
			},
			{
				test: /\.css$/,
				use: [
					require.resolve('style-loader'),
					{
					loader: require.resolve('css-loader'),
					options: {
						importLoaders: 1,
					},
					},
					{
					loader: require.resolve('postcss-loader'),
					options: {
						ident: 'postcss',
						plugins: () => [
						require('postcss-flexbugs-fixes'),
						autoprefixer({
							browsers: [
							'>1%',
							'last 4 versions',
							'Firefox ESR',
							'not ie < 9', // React doesn't support IE8 anyway
							],
							flexbox: 'no-2009',
						}),
						],
					},
					},
				],
			},
			{
				test: /\.scss$/,
				loaders: [
					require.resolve('style-loader'),
					require.resolve('css-loader'),
					require.resolve('sass-loader'),
				]
			},
			{
				test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url-loader?limit=10000&mimetype=application/font-woff"
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url-loader?limit=10000&mimetype=application/octet-stream"
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: "file-loader"
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url-loader?limit=10000&mimetype=image/svg+xml"
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