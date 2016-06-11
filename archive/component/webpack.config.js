module.exports = [
	{
		entry: __dirname + '/index.js',
		output: {
			filename: 'build.js'
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					query: {
						plugins: [
							'babel-plugin-transform-object-rest-spread',
							['babel-plugin-transform-react-jsx', {pragma: 'h'}]
						]
					}
				}
			]
		}
	}
];
