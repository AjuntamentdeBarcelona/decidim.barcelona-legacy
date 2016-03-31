var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'app/frontend/entry.test.js'
    ],

    preprocessors: {
      'app/frontend/entry.test.js': ['webpack', 'sourcemap']
    },

    webpack: { //kind of a copy of your webpack config
      module: {
        noParse: [
          /\/sinon\.js/
        ],
        loaders: [
          { test: /\.coffee$/, loader: 'coffee-loader' },
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
          },
          {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
          },
          { test: require.resolve("react"), loader: "expose?React" },
          { test: require.resolve("react-dom"), loader: "expose?ReactDOM" }
        ]
      },
      externals: {
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },

    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },

    plugins: [
      'karma-webpack',
      'karma-jasmine',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher'
    ],


    babelPreprocessor: {
      options: {
        presets: ['airbnb']
      }
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
  })
};
