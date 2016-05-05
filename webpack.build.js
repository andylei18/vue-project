var webpack = require('webpack')
var text = require("extract-text-webpack-plugin")
var html = require('html-webpack-plugin')

function clear(_path, _fs) {
	if (_fs.existsSync(_path)) {
		_fs.readdirSync(_path).forEach(function(_file, _index) {
			var _curPath = _path + "/" + _file
			if (_fs.statSync(_curPath).isDirectory()) {
				clear(_curPath, _fs)
			} else {
				_fs.unlinkSync(_curPath)
			}
		});
		_fs.rmdirSync(_path)
		return true
	}
	return false
}
clear('./n-build/',require('fs'))


var config = {}
config.entry = ["./src/app.js"]
config.output = {
	path: "./n-build/static",
	publicPath: "http://localhost:63342/vue-project/n-build/static/",//发布前端服务器地址比如:static.a.com
	filename: "build.[hash].js"
}
config.module = {
	loaders: [
		{
			test: /\.vue$/,
			loader: 'vue'
		},
		{
			test: /\.js$/,
			loader: 'babel',
			exclude: /node_modules/
		},
		{
			test: /\.(png|jpg|gif)$/,
			loader: 'url-loader?limit=8192'
		},
		{
			test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url",
			query: {
				name: '[name].[ext]?[hash]&mimetype=application/font-woff'
			}
		},
		{
			test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url",
			query: {
				name: '[name].[ext]?[hash]&mimetype=application/font-woff2'
			}
		},
		{
			test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url",
			query: {
				name: '[name].[ext]?mimetype=application/font-woff2'
			}
		},
		{
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url",
			query: {
				name: '[name].[ext]?mimetype=application/font-woff2'
			}
		},
		{
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url",
			query: {
				name: '[name].[ext]?mimetype=image/svg+xml'
			}
		},
		{
			test: /\.json(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url",
			query: {
				name: '[name].[ext]?mimetype=application/json'
			}
		}
	]
}

config.vue = {
	loaders: {
		css: text.extract("css"),
		js: 'babel'
	}
}

config.plugins = [
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: '"production"'
		}
	}),
	new text('build.[hash].css'),
	new html({
		filename: '../index.html',
		template: './src/app.html'
	}),
	new webpack.optimize.CommonsChunkPlugin("common.[hash].js"),
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.optimize.UglifyJsPlugin({
		sourceMap: false,
		mangle: true,
		compress: {
			warnings: false
		}
	})
]
module.exports = config
