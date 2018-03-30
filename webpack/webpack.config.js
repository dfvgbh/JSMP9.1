const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const now = () => (new Date).toLocaleDateString();

module.exports = {
    entry: {
        main: './src/index.js',
        ts: './src/typescript.ts'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    cache: false,
    devtool: 'source-map',
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'babel-loader' },
                    { loader: 'eslint-loader' }
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    { loader: 'postcss-loader' },
                    { loader: 'sass-loader' },
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' }
                ]
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache:    true,
                parallel: true
            }),
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {discardComments: {removeAll: true}}
            })
        ],
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: true
    },
    plugins:      [
        new HtmlWebPackPlugin({
            template: 'src/index.html',
            title: 'IDGF',
            date: now()
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new CleanWebpackPlugin('dist')
    ]
};

