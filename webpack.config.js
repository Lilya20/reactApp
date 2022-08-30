const path = require('path');
const HtmlWebpackPlugin =require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const plugins=[
    new HtmlWebpackPlugin({
        template: './src/index.html',
    }),

    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',}),
];

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

if(process.env.SERVER){
    plugins.push(new ReactRefreshWebpackPlugin());
}

let mode ='development';
let target = 'web';
if(process.env.NODE_ENV === 'production'){
    mode= 'production';
    target = 'browserlist';
}

module.exports ={
    mode,
    plugins,
    target,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[hash][ext][query]', //все ассеты будут складываться в dist/assets
        clean: true,
    },

    devtool: 'source-map',

    devServer:{
        hot: true, //включает автоматическую перезагрузку при изменениях
    },   

    module:{
        rules:[
            {test: /\.(html)$/, use: ['html-loader']},
            {test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
            type: mode === 'production' ? 'asset' : 'asset/resource'},
            {test: /\.js$/,
            exclude: /node_modules/,
            use:{
                loader:'babel-loader',
                options:{
                    cacheDirectory: true,
                },
            }}, 
            {
                test: /\.css$/i,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test:/\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            }
        ],
    }
}






