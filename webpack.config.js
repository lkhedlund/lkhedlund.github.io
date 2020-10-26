const path = require("path");
const dist = path.resolve(__dirname, './dist');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: './assets/index.js',
    },
    output: {
        filename: '[name].js',
        path: dist,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    "css-loader", 
                    "sass-loader"
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ 
            filename: "[name].css", 
            allChunks: true 
        }),
        new MinifyPlugin(),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        minimizer: [
          new OptimizeCSSAssetsPlugin({})
        ]
    },
};