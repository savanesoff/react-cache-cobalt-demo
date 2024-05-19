const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    target: 'web',
    resolve: {
        // alias: {
        //     'react': 'preact/compat',
        //     'react-dom/test-utils': 'preact/test-utils',
        //     'react-dom': 'preact/compat',
        //     'react/jsx-runtime': 'preact/jsx-runtime'
        // },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'swc-loader'
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 9500,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            scriptLoading: 'blocking',
        }),
        new MiniCssExtractPlugin({
            filename: './index.css',
        }),
        new webpack.ProvidePlugin({
            'React': 'react',
        }),
    ],
};
