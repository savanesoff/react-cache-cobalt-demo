const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => ({
    mode: argv.mode || 'development',
    entry: './src/index.tsx',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: argv.mode === 'development' ? 'source-map' : false, // Use 'source-map' for better debugging
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'swc-loader',
                },
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
        hot: true,
        client: {
            overlay: {
                warnings: false,
                errors: true,
            },
        },
        devMiddleware: {
            publicPath: '/',
        },
        historyApiFallback: true, // Ensure single page app routing works
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            scriptLoading: 'blocking',
        }),
        new MiniCssExtractPlugin({
            filename: 'index.css',
        }),
        new webpack.ProvidePlugin({
            React: 'react',
        }),
    ],
});
