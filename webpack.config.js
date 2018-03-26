var path = require('path');

var config = {
    entry: './app/main.js',

    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },

    devServer: {
        inline: true,
        port: 8080,
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback : true,
    },

    module: {
        loaders: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            query: {
                presets: ['es2015', 'react', 'stage-2']
            }
        },
        {
            test: /\.css$/,
            loaders: [
                'style-loader',
                'css-loader',
            ],
        },
        ]
    }
};

module.exports = config;
