import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpack from 'webpack';

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => ({
    mode: argv.mode || 'development',
    entry: './src/index.tsx',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: argv.mode === 'development' ? 'source-map' : false, // Use 'source-map' for better debugging
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        plugins: [new TsconfigPathsPlugin({
            configFile: './tsconfig.json' // Ensure it uses your tsconfig.json
        })],
        alias: {
            'react': 'preact/compat',
            'react-dom': 'preact/compat',
            // Add other aliases if needed
        },
        mainFields: ['main'], // Ensure main field is preferred over module field
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'swc-loader',
                    options: {
                        sourceMaps: true, // Ensure SWC loader generates source maps
                    }
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
            overlay: false
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
