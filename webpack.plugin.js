const path = require('path');

module.exports = {
	entry: './src/main.js', // точка входа
	output: {
		filename: 'plugin.js', // имя итогового файла
		path: path.resolve(__dirname, 'plugin'), // путь к папке сборки
	},
	mode: 'production', // или 'development' для отладки
	resolve: {
		fallback: {
			fs: false, // fs не нужен в браузере
			path: require.resolve('path-browserify'),
		},
	},
	module: {
		rules: [
			{
				test: /src\/\.js$/, // применимо ко всем .js-файлам
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader', // если хочешь использовать Babel (опционально)
				},
			},
		],
	},
};
