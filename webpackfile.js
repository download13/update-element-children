module.exports = [
	{
		entry: __dirname + '/src/index.js',
		output: {
			path: __dirname + '/dist',
			filename: 'index.js',
			libraryTarget: 'commonjs2'
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					query: {
						presets: ['babel-preset-es2015-native-modules'],
						plugins: [
							'babel-plugin-transform-object-rest-spread'
						]
					}
				}
			]
		}
	},
	{
		entry: __dirname + '/examples/index.js',
		output: {
			path: __dirname + '/examples',
			filename: 'build.js'
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					query: {
						presets: ['babel-preset-es2015-native-modules'],
						plugins: ['babel-plugin-transform-react-jsx',]
					}
				}
			]
		}
	}
];
