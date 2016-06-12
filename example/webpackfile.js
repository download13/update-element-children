module.exports = [
	{
		entry: __dirname + '/index.js',
		output: {
			path: __dirname,
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
