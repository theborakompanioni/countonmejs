
module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        dirs: {
            js:     'src/main',
            build:  'dist',
            coverage:  'bin/coverage'
        },

        pkg: grunt.file.readJSON('package.json'),

        banner: '/*\n' +
         ' * <%= pkg.title %> v<%= pkg.version %>\n' +
         ' * <%= pkg.author.url %> <<%= pkg.author.email %>>\n' +
         ' * Copyright (c) <%= grunt.template.today(\'yyyy\') %> <%= pkg.author.name %>\n' +
         ' */\n',

        jshint: {
            options: {
                jshintrc: true
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            source: {
                src: ['src/**/*.js']
            },
            jasmine: {
                src: ['spec/**/*.js']
            },
            karma: {
                src: ['karma.conf.js']
            }
        },
        umd: {
            all: {
                options: {
                    src: '<%= dirs.js %>/<%= pkg.name %>.js',
                    dest: '<%= dirs.build %>/<%= pkg.name %>.js',
                    objectToExport: 'CountOnMe', // optional, internal object that will be exported
                    globalAlias: 'CountOnMe', // optional, changes the name of the global variable
                    indent: 4 // optional (defaults to 2), indent source code. Accepts strings as well
                }
            }
        },
        uglify: {
            options: {
                mangle: false,
                banner: '<%= banner %>'
            },
            dist: {
              files: {
                  '<%= dirs.build %>/<%= pkg.name %>.min.js': '<%= dirs.build %>/<%= pkg.name %>.js'
              }
            }
        },
        jasmine: {
            js: {
                src: 'src/**/*.js',
                options: {
                    display: 'full',
                    summary: true,
                    specs: 'spec/*Spec.js',
                    helpers: 'spec/*Helper.js'
                }
            },
            coverage: {
                src: ['src/**/*.js'],
                options: {
                    specs: ['spec/*Spec.js'],
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: '<%= dirs.coverage %>/coverage.json',
                        report: [{
                                type: 'html',
                                options: {
                                    dir: '<%= dirs.coverage %>/html'
                                }
                            }, {
                                type: 'cobertura',
                                options: {
                                    dir: '<%= dirs.coverage %>/cobertura'
                                }
                            }, {
                                type: 'lcov',
                                options: {
                                    dir: '<%= dirs.coverage %>/lcov'
                                }
                            }, {
                                type: 'text-summary'
                            }
                        ]
                    }
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        micro: {
            dist: {
              src: '<%= dirs.build %>/<%= pkg.name %>.min.js'
            }
        },
        notify: {
            js: {
                options: {
                    title: 'Javascript - <%= pkg.title %>',
                    message: 'Minified and validated with success!'
                }
            }
        }
    });

    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-micro');
    grunt.loadNpmTasks('grunt-umd');

    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask( 'test', [ 'jasmine', 'karma']);
    grunt.registerTask( 'default', [ 'jshint', 'test', 'umd', 'uglify', 'micro', 'notify:js' ]);

};