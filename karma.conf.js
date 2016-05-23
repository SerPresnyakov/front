// Karma configuration
// Generated on Mon May 23 2016 16:43:07 GMT+0300 (MSK)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files : [
      './bower/angular/angular.min.js',
      './bower/angular-ui-router/release/angular-ui-router.min.js',
      './bower/angular-animate/angular-animate.min.js',
      './bower/angular-aria/angular-aria.min.js',
      './bower/angular-material/angular-material.js',
      './bower/angular-material-data-table/dist/md-data-table.min.js',
      './bower/angular-schema-form/dist/schema-form.min.js',
      './bower/angular-schema-form/dist/bootstrap-decorator.min.js',
      './bower/angular-sanitize/angular-sanitize.min.js',
      './bower/angular-local-storage/dist/angular-local-storage.min.js',
      './bower/api-check/dist/api-check.min.js',
      './bower/angular-formly/dist/formly.js',
      './bower/angular-messages/angular-messages.min.js',
      './bower/angular-formly-material/dist/formly-material.min.js',
      './bower/angular-mocks/angular-mocks.js',
      './polyfills/ArrayFind.js',
      './demo/js/*.js',
      './tests/*.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 8010,

    plugins : [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
      /*'karma-junit-reporter'*/
    ],

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};