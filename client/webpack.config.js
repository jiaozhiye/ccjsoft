var path = require('path')
var webpack = require('webpack')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    // index: './3g/src/main.js', // 首页
    index: './src/main.js', // 首页
    list: './src/list.js', // 通用列表页
    teacher: './src/teacher.js', // 教师列表页
    course: './src/course.js', // 课程视频列表页
    courseView: './src/courseView.js', // 课程视频详情页
    view: './src/view.js' // 通用详情页
  },
  output: {
    // path: path.resolve(__dirname, './3g/dist'),
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {}
          // other vue-loader options go here
        }
      },
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
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
	  {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue',
      // 'components': path.resolve(__dirname, './3g/src/components'),
      'components': path.resolve(__dirname, './src/components'),
      'common': path.resolve(__dirname, './src/common'),
      'assets': path.resolve(__dirname, './src/assets'),
      'store': path.resolve(__dirname, './src/store')
    }
  },
  devServer: {
    // host: '192.168.1.102',
    historyApiFallback: true,
    noInfo: true,
    contentBase: __dirname
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production'){
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
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
    new CopyWebpackPlugin([{
      from: path.join(__dirname, '/src/assets/content'),
      to: path.join(__dirname, '/dist')
    }])
  ])
}
