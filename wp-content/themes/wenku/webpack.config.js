const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const isProduction = process.env.NODE_ENV == 'production';
var webpack = require("webpack");



const config = {
    entry: 
    {
        main: "./src/index.js",
    },
    output: {
        filename: "./assets/js/[name].js",
        path: path.resolve(__dirname, ''),
    },
    devtool: "source-map",
    plugins: [
        new MiniCssExtractPlugin({
          filename: './assets/css/[name].css',
          chunkFilename: './assets/[id].css',
        }),
        new CopyWebpackPlugin({'patterns': [
            //{from:'./src/images', to:'images'},
            {from: './node_modules/bootstrap-icons/font/fonts', to: isProduction? 'fonts' : 'assets/css/fonts'},
            {from: './node_modules/jquery-colorbox/example2/images', to: isProduction? 'images' : 'assets/css/images'},
        ]}), //kopiuje po prostu cały katalog 1 do 1, ale można zrobić z lodash src="<%=require('./src/images/logo.png')%>"

        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          jquery: 'jquery',
          "window.jQuery": 'jquery',
        }), //Most legacy modules rely on the presence of specific globals, like jQuery plugins do on $ or jQuery. Configure webpack, to prepend var $ = require("jquery") everytime it encounters the global $ identifier.
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    isProduction? 'style-loader' : MiniCssExtractPlugin.loader,
                    { //https://webpack.js.org/loaders/css-loader/
                        loader: "css-loader",
                        options: {
                            url: false,
                        }
                    },
                    {
                    loader: 'postcss-loader',
                        options: {
                          postcssOptions: {
                            plugins: () => [
                              require('autoprefixer')
                            ]
                          }
                        }
                    },
                    {
                    loader: 'sass-loader',  
                    options: {
                      sassOptions: {
                        silenceDeprecations: ['mixed-decls', 'import'],
                        quietDeps: true,
                      },
                    },
                  },
                ],
                sideEffects: true,
            },
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
        
    } else {
        config.mode = 'development';
    }
    return config;
};
