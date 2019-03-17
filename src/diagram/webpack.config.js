const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'app/app.js'),
  context: path.join(__dirname, 'app'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "app.js"
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        include: [
          path.resolve(__dirname, 'app')
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [ '@babel/plugin-transform-react-jsx'  ]
          }
        }
      },
      {
        oneOf: [
          {
            test: /\.css$/,
            use: [
              { loader: 'style-loader' },
              { loader: 'css-loader' }
            ]
          },
          {
            test: /\.bpmn$/,
            use: 'raw-loader',
          },
          {
            exclude: /\.(js|html|json)$/,
            loader: 'file-loader',
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'assets/**', to: 'vendor/bpmn-js', context: '../node_modules/bpmn-js/dist/' },
      { from: '**/*.{html,css,bpmn}' },
      { from: 'lib', to: 'lib'},
      { from: 'server.js'}
    ])
  ],
  devServer: {
    outputPath: path.join(__dirname, 'dist')
  }
};