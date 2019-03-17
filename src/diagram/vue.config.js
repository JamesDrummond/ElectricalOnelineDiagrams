const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');
var webpack = require('webpack');

var file = fs.readFileSync('app/diagram.bpmn', "utf8");  

module.exports = {
    configureWebpack: config => {
        return {
            plugins: [
                new webpack.DefinePlugin({
                    XML: file,
                })
            ]
        }
    },
};