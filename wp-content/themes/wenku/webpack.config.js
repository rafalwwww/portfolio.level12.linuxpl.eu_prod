// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

// const stylesHandler = MiniCssExtractPlugin.loader;

var webpack = require("webpack");



const config = {
    entry: 
    {
        main: "./src/index.js",
        // custom_bootstrap: "./src/js/custom-bootstrap.js",
    },
/*    resolve: {
        alias: {
          'images/loading.gif': path.resolve(__dirname, '../images/loading.gif'),
          'images/controls.png': path.resolve(__dirname, '../images/controls.png'),
          'images/loading.gif': path.resolve(__dirname, './images/loading.gif'),
          'images/controls.png': path.resolve(__dirname, './images/controls.png'),
        }
    },*/
/*  resolve: {
        alias: {
          './fonts/bootstrap-icons.woff': path.resolve(__dirname, './node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff'),
          './fonts/bootstrap-icons.woff2': path.resolve(__dirname, './node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff2')
        }
    },*/
/*
    {
        home : "./src/js/home.js",
        app  : "./src/js/app.js",
    }
*/    
    output: {
        filename: "./assets/js/[name].js",
        path: path.resolve(__dirname, ''),
        //clean: true, // remove unused bundled files
        //assetModuleFilename: 'images/[name].[ext]'

    },
    devtool: "source-map",
    // devtool: 'inline-source-map',
    plugins: [
        // new HtmlWebpackPlugin({
        //     // filename: 'index.html',
        //     template: 'index.html',
        //     inject: 'body'
        // }),

        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // all options are optional
          filename: './assets/css/[name].css',
          chunkFilename: './assets/[id].css',
          //ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        //isProduction? "{from:'./src/fonts', to:'fonts'}," : MiniCssExtractPlugin.loader,
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

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            /*{
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, 'css-loader', 'sass-loader'],
            },*/
            {
                //test: /\.scss$/,
                test: /\.s[ac]ss$/i,
                //include: path.resolve(__dirname, './src/scss/main.scss'),
                //include: /src/,
                /*use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                },
                {
                  loader: 'style-loader', // inject CSS to page
                }, {
                  loader: 'css-loader', // translates CSS into CommonJS modules
                }, {
                  loader: 'postcss-loader', // Run post css actions
                  options: {
                    plugins: function () { // post css plugins, can be exported to postcss.config.js
                      return [
                        require('precss'),
                        require('autoprefixer')
                      ];
                    }
                  }
                }, {
                  loader: 'sass-loader' // compiles Sass to CSS
                }],*/
                use: [
                    isProduction? 'style-loader' : MiniCssExtractPlugin.loader,
                    //MiniCssExtractPlugin.loader, // Extracts CSS for each JS file that includes CSS
                    //'style-loader',              // Adds CSS to the DOM by injecting a `<style>` tag                    
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
                //exclude: '/node_modules/',
                sideEffects: true,
            },
/*            {
              test: /\.(ico|png|jpg|jpeg|gif|svg|webp|tiff)$/i,
              type: "asset/resource",
              generator: {
                filename: "images/[name].[hash][ext]",
              },
            },*/
            /*{
              test: /\.(woff|woff2|eot|ttf|otf)$/i,
              type: "asset/inline",
            },*/
            /*{
                test: /\.(eot|svg|ttf|woff|woff2|png|jpe?g|gif|webp|avif)$/i,
                type: 'asset/resource',
            }*/
/*            {
                test: /\.(svg|png|jpe?g|gif|webp|avif)$/i,
                type: 'asset/resource',
                generator: {
                   filename: 'images/[name].[ext]'
                },
                use: [
                {
                    loader: "file-loader",
                    options: { //grafiki chcemy w katalogu dist/images
                        //context: "public",
                        //name: "[name]-[hash].[ext]",
                        outputPath: 'images',
                    },
                },
                ],
            },
            // Rule for processing the Bootstrap icons
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)/i,
                type: 'asset/resource',
                generator: {
                    //filename: 'fonts/[name]-[hash][ext][query]'
                    filename: 'fonts/[name][ext][query]'
                }
            },*/
/*            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/inline",
            },*/

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
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
