// Karma configuration
// Generated on Sun Nov 15 2015 17:37:19 GMT+1100 (AEDT)

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],

    files: [
      'src/test-index.js'
    ],
    
    singleRun: true,

    frameworks: ['jasmine-ajax', 'jasmine', 'phantomjs-shim'],

    preprocessors: {
        'src/test-index.js': ['webpack', 'sourcemap']
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: "babel" },
          { test: /\.scss$/, exclude: /node_modules/, loader: 'style!css!sass'  },
          { test: /\.gif$/, loader: 'url-loader?limit=8192'}
        ]
        ,
        postLoaders: [ 
          { test: /\.js$/, exclude: /(node_modules|__tests__)/, loader: "isparta" }
          // { test: /\.js$/, exclude: /(__tests__|node_modules)/, loader: ‘isparta’ }
        ]
      },
      watch: true
    },

    autoWatch: true,

    reporters: ['progress', 'coverage', 'threshold'],

    coverageReporter: {
     type: 'html', //produces a html document after code is run
     dir: 'coverage/' //path to created html doc
    },

    thresholdReporter: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90
    },

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
      'karma-coverage',
      'karma-threshold-reporter',
      'karma-sourcemap-loader',
      'karma-jasmine-ajax',
      'karma-spec-reporter'
    ]
  })
}
