var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

// 项目根目录
var projectRoot = path.join(__dirname, '/server/public');
// var projectRoot = path.join(__dirname, '/client');

// 路径
var paths = {
	SRC_PATH: projectRoot + '/src',
	BUILD_PATH: projectRoot + '/dist'
};

module.exports = {
	entry: {
		app: paths.SRC_PATH + '/app.js'
	},
	output: {
		path: paths.BUILD_PATH,
		publicPath: '/dist/',
		filename: '[name].build.min.js' // [name].[chunkhash].min.js
	},
	resolve: {
		alias: {
			'src': paths.SRC_PATH,
			'common': paths.SRC_PATH + '/common',
			'assets': paths.SRC_PATH + '/assets',
			'components': paths.SRC_PATH + '/components'
		}
	},
	devServer: {
		port: 8080,
		historyApiFallback: true, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
		noInfo: true, // 显示合并代码进度
		inline: true, // 设置为true，当源文件改变时会自动刷新页面
	},
	performance: {
		hints: false
	},
	devtool: '#eval-source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /(node_modules|bower_components)/,
				options: {
				  	presets: ['es2015'],
				  	plugins: ['transform-object-rest-spread']
				}
			},
			{
				test: /\.css$/,
				use: [
					{loader: 'style-loader'},
					{
						loader: 'css-loader',
						options: {
							minimize: true
						}
					}
				]
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'img/[name].[ext]?[hash]'
					}
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'fonts/[name].[ext]?[hash]'
					}
				}
			}
		]
	}
};

if (process.env.NODE_ENV === 'production'){
	module.exports.devtool = '#source-map';
	module.exports.plugins = (module.exports.plugins || []).concat([
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		}),
		// new CopyWebpackPlugin([{
		// 	from: paths.SRC_PATH + '/assets',
		// 	to: paths.BUILD_PATH
		// }])
	]);
}
