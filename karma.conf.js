module.exports = function(config) {
    'use strict';

    var configuration = {
 
        // base path, that will be used to resolve files and exclude
        basePath: './',
 
        // frameworks to use
        frameworks: ['jasmine'],
 
        // list of files / patterns to load in the browser
        files: [
            './src/**/*.js',
            './spec/**/*Spec.js'
        ],
 
        // list of files to exclude
        exclude: [
        ],
 
        // test results reporter to use
        reporters: ['progress'],
 
        // web server port
        port: 9876,
 
        // enable / disable colors in the output (reporters and logs)
        colors: true,
 
        // level of logging
        logLevel: config.LOG_INFO,
 
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
 
        // Start these browsers
        browsers: ['PhantomJS', 'Firefox', 'Chrome'],

        customLaunchers: {
          Chrome_without_security: {
            base: 'Chrome',
            flags: ['--disable-web-security']
          },
          Chrome_travis_ci: {
            base: 'Chrome',
            flags: ['--no-sandbox']
          }
        },

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 6000,
 
        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    };

    if(process.env.TRAVIS){
        configuration.browsers = ['PhantomJS', 'Firefox', 'Chrome_travis_ci'];
    }

    config.set(configuration);
};