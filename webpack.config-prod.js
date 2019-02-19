const path = require('path');

const config = {
    mode: 'production',
    devtool: 'source-map',
    entry: path.resolve(__dirname, 'src/js/init'),
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        publicPath: '/js/',
        filename: 'init.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'eslint-loader',
                ],
            }
        ],
    }
};

module.exports = config;
