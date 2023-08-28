const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
const Dotenv = require('dotenv-webpack')

/**@type {import('webpack').Configuration} */

module.exports = {
    entry: './src/index.js',
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: ""
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            // {
            //     test: /\.svg$/,
            //     loader: 'svg-inline-loader'
            // },
            {
                use: ["style-loader", "css-loader", "sass-loader"],
                test: /.(css|sass|scss)$/
            },
            {
                type: "asset/inline",
                test: /\.(png|svg|jpg|jpeg|gif)$/i
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/inline',
            },
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"],
        fallback: {
            "crypto": false,
            // "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new Dotenv({
            path: '.env'
        })
    ]
}