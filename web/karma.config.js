// Karma configuration
// Generated on Sun Nov 15 2015 17:37:19 GMT+1100 (AEDT)

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],

    files: [
      'src/test-index.js'
    ],

    frameworks: ['jasmine-ajax', 'jasmine', 'phantomjs-shim'],

    preprocessors: {
        'src/test-index.js': ['webpack', 'sourcemap']
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: "babel", query: {presets: ['es2015', 'react']} },
          { test: /\.scss$/, exclude: /node_modules/, loader: 'style!css!sass'  },
          { test: /\.gif$/, loader: 'url-loader?limit=8192'}
        ]
      },
      watch: true
    },

    autoWatch: true,

    reporters: ['progress'],

    webpackMiddlewareServer: {
      noInfo: true
    },

    webpackServer: {
      quiet: true
    },

    plugins: [
      'karma-jasmine',
      'karma-phantomjs-shim',
      'karma-phantomjs-launcher',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-jasmine-ajax',
      'karma-spec-reporter'
    ]
  })
}
