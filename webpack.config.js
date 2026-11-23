const path = require('path');

module.exports = {
    entry: './client/components/index.jsx',

    output: {
        path: path.resolve(__dirname, 'hosted'),
        filename: 'bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx'],
    },
};