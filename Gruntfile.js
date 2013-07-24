/*jshint camelcase: false */
/*global module:false */
module.exports = function (grunt) {

    grunt.initConfig({
        clean: {
            files: {
                src: ['build/', 'dist/', 'report/']
            }
        },

        // We're using the template here to construct an array of functions
        // that sets up Balanced so we can destroy and reconstruct the
        // entire app while running tests.
        neuter: {
            dev: {
                options: {
                    includeSourceURL: true,
                    template: "window.balancedSetupFunctions.push(function() { {%= src %} ; });"
                },
                src: ['app/dashboard.js'],
                dest: 'build/js/includes-dev.js'
            },
            prod: {
                options: {
                    template: "window.balancedSetupFunctions.push(function() { {%= src %} ; });"
                },
                src: ['app/dashboard.js'],
                dest: 'build/js/includes-prod.js'
            },
            testfixtures: {
                options: {
                    template: "{%= src %} ;"
                },
                src: ['test/support/fixtures/fixtures.js'],
                dest: 'build/test/js/test-fixtures.js'
            }
        },

        concat: {
            options: {
                separator: ';\n'
            },
            dashboarddev: {
                src: [
                    'app/app_setup.js',
                    'build/js/includes-dev.js'
                ],
                dest: 'build/js/dashboard-dev.js'
            },
            dashboardprod: {
                src: [
                    'app/app_setup.js',
                    'build/js/includes-prod.js'
                ],
                dest: 'build/js/dashboard-prod.js'
            },
            libdev: {
                src: [
                    'static/lib/cldr.js',
                    'static/lib/jquery-2.0.0.js',
                    'static/lib/handlebars-1.0.0-rc.4.js',
                    'static/lib/ember-1.0.0-rc.5.js',
                    'static/lib/ember-auth-6.0.5-modified.js',
                    'static/lib/ember-validations.prod.js',
                    'static/lib/ember-i18n-1.4.1.js',
                    'static/lib/bootstrap/bootstrap-dropdown.js',
                    'static/lib/bootstrap/bootstrap-modal.js',
                    'static/lib/bootstrap-datepicker.js',
                    'static/lib/jquery.browser.js',
                    'static/lib/jquery.iframe-auto-height.plugin.1.9.1.js',
                    'static/lib/underscore-1.4.4.js',
                    'static/lib/mixpanel-2.2.js'
                ],
                dest: 'build/js/lib-dev.js'
            },
            libprod: {
                src: [
                    'static/lib/cldr.js',
                    'static/lib/jquery-2.0.0.js',
                    'static/lib/handlebars-1.0.0-rc.4.js',
                    'static/lib/ember-1.0.0-rc.5.js',
                    'static/lib/ember-auth-6.0.5-modified.js',
                    'static/lib/ember-validations.prod.js',
                    'static/lib/ember-i18n-1.4.1.js',
                    'static/lib/bootstrap/bootstrap-dropdown.js',
                    'static/lib/bootstrap/bootstrap-modal.js',
                    'static/lib/bootstrap-datepicker.js',
                    'static/lib/jquery.browser.js',
                    'static/lib/jquery.iframe-auto-height.plugin.1.9.1.js',
                    'static/lib/underscore-1.4.4.js',
                    'static/lib/mixpanel-2.2.js'
                ],
                dest: 'build/js/lib-prod.js'
            },
            tests: {
                src: [
                    'test/lib/*.js',
                    'test/unit/**/*.js',
                    'test/integration/**/*.js'
                ],
                dest: 'build/test/js/tests.js'
            }
        },

        uglify: {
            dashboard: {
                files: {
                    'build/js/dashboard-prod.min.js': [
                        'build/js/dashboard-prod.js'
                    ]
                }
            },
            lib: {
                files: {
                    'build/js/lib-prod.min.js': [
                        'build/js/lib-prod.js'
                    ]
                }
            }
        },

        /*
         Finds Handlebars templates and precompiles them into functions.
         The provides two benefits:

         1. Templates render much faster
         2. We only need to include the handlebars-runtime microlib
         and not the entire Handlebars parser.

         Files will be written out to build/compiled/templates.js
         which is required within the project files so will end up
         as part of our application.

         The compiled result will be stored in
         Ember.TEMPLATES keyed on their file path (with the 'app/templates' stripped)
         */
        emberTemplates: {
            options: {
                templateName: function (sourceFile) {
                    return sourceFile.replace(/app\/templates\//, '');
                }
            },
            'build/js/compiled-templates.js': ["app/templates/**/*.hbs"]
        },

        less: {
            development: {
                options: {
                    paths: ["assets/css"]
                },
                files: {
                    "build/css/base.css": "static/less/base.less"
                }
            },
            production: {
                options: {
                    paths: ["assets/css"],
                    yuicompress: true
                },
                files: {
                    "build/css/base.min.css": "static/less/base.less"
                }
            }
        },

        copy: {
            css: {
                files: [
                    {
                        cwd: 'build/css/',
                        expand: true,
                        src: ['**'],
                        dest: 'dist/css/'
                    }
                ]
            },
            images: {
                files: [
                    {
                        cwd: 'static/images/',
                        expand: true,
                        src: ['**'],
                        dest: 'build/images/'
                    },
                    {
                        cwd: 'static/images/',
                        expand: true,
                        src: ['**'],
                        dest: 'build/test/images/'
                    }
                ]
            },
            dist: {
                files: [
                    {
                        cwd: 'build/js/',
                        expand: true,
                        src: ['*-prod.min-*.js'],
                        dest: 'dist/js/'
                    },
                    {
                        cwd: 'build/css/',
                        expand: true,
                        src: ['*.min-*.css'],
                        dest: 'dist/css/'
                    },
                    {
                        src: 'build/prod.html',
                        dest: 'dist/index.html'
                    },
                    {
                        cwd: 'build/images/',
                        expand: true,
                        src: ['**'],
                        dest: 'dist/images/'
                    }
                ]
            },
            test: {
                files: [
                    {
                        cwd: 'test/support/static/',
                        expand: true,
                        src: ['**'],
                        dest: 'build/test/'
                    },
                    {
                        cwd: 'test/support/lib/',
                        expand: true,
                        src: ['**'],
                        dest: 'build/test/js'
                    },
                    {
                        src: 'test/support/testconfig.js',
                        dest: 'build/test/js/testconfig.js'
                    }
                ]
            }
        },

        /*jshint multistr: true */
        'compile-handlebars': {
            dev: {
                template: 'app/index.html.hbs',
                templateData: {
                    cssFile: "css/base.css",
                    jsLibFile: "js/lib-dev.js",
                    jsDashboardFile: "js/dashboard-dev.js",
                    env: "{\
                        BALANCED: {\
                            API: 'https://auth.balancedpayments.com',\
                            AUTH: 'https://auth.balancedpayments.com',\
                            WWW: 'https://www.balancedpayments.com',\
                            DOCS: 'https://docs.balancedpayments.com',\
                            DEBUG: true,\
                            MIXPANEL: '',\
                            GOOGLE_ANALYTICS: ''\
                        }\
                    }"
                },
                output: 'build/dev.html'
            },
            prod: {
                template: 'app/index.html.hbs',
                templateData: {
                    cssFile: "css/base.min.css",
                    jsLibFile: "js/lib-prod.min.js",
                    jsDashboardFile: "js/dashboard-prod.min.js",
                    env: "{\
                        BALANCED: {\
                            API: 'https://auth.balancedpayments.com',\
                            AUTH: 'https://auth.balancedpayments.com',\
                            WWW: 'https://www.balancedpayments.com',\
                            DOCS: 'https://docs.balancedpayments.com',\
                            DEBUG: false,\
                            MIXPANEL: '991598fc644dd5d0894e6cb070154330',\
                            GOOGLE_ANALYTICS: 'UA-30733850-1'\
                        }\
                    }"
                },
                output: 'build/prod.html'
            }
        },

        hashres: {
            options: {
                fileNameFormat: '${name}-${hash}.${ext}'
            },
            css: {
                src: ['build/js/*.js', 'build/css/*.css'],
                dest: ['build/dev.html', 'build/prod.html', 'build/test/runner.html']
            },
            images: {
                src: ['build/images/**/*.png'],
                dest: ['build/dev.html', 'build/prod.html', 'build/css/*.css', 'build/js/*.js']
            }
        },

        img: {
            // using only dirs with output path
            crush_them: {
                src: ['build/images/**/*.png']
            }
        },

        s3: {
            options: {
                bucket: 'balanced-dashboard',
                access: 'public-read',
                region: 'us-west-1',
                gzip: true,
                headers: {
                    'X-Employment': 'aXdhbnR0b21ha2VhZGlmZmVyZW5jZStobkBiYWxhbmNlZHBheW1lbnRzLmNvbQ=='
                }
            },
            cached: {
                headers: {
                    'Cache-Control': 'public, max-age=86400'
                },
                upload: [
                    {
                        src: 'dist/js/*',
                        dest: 'js/'
                    },
                    {
                        src: 'dist/css/*',
                        dest: 'css/'
                    },
                    {
                        src: 'dist/images/**/*',
                        dest: 'images/'
                    }
                ]
            },
            not_cached: {
                headers: {
                    'Cache-Control': 'max-age=60'
                },
                upload: [
                    {
                        src: 'dist/*',
                        dest: ''
                    }
                ]
            }
        },

        /*
         Reads the projects .jshintrc file and applies coding
         standards. Doesn't lint the dependencies or test
         support files.
         */
        jshint: {
            all: [
                'Gruntfile.js',
                'app/**/*.js',
                'test/**/*.js',
                '!static/lib/*.*',
                '!test/support/lib/*.*',
                '!test/support/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        qunit: {
            options: {
                '--web-security': 'no',
                timeout: 60000,
                coverage: {
                    src: ['build/js/dashboard-prod.js'],
                    instrumentedFiles: 'temp/',
                    htmlReport: 'report/coverage',
                    coberturaReport: 'report/',
                    linesThresholdPct: 77,
                    statementsThresholdPct: 76,
                    functionsThresholdPct: 68,
                    branchesThresholdPct: 57
                }
            },
            all: ['build/test/runner.html']
        },

        exec: {
            // We're not using this currently, but leaving it in here in case
            // somebody wants to run tests using their installed phantomJS
            run_tests: {
                command: 'phantomjs test/support/lib/run-qunit.js build/test/runner.html'
            }
        },

        /*
         * A test server used for casperjs tests
         * */
        connect: {
            server: {
                options: {
                    port: 9876,
                    base: '.'
                }
            }
        },

        casperjs: {
            options: {
                // Task-specific options go here.
            },
            files: ['test/casperjs/**/*.js']
        },

        watch: {
            templates: {
                files: [
                    'app/**/*.hbs'
                ],
                tasks: ['_buildJS']
            },
            js: {
                files: [
                    'app/**/*.js',
                    'static/lib/**/*.js'
                ],
                tasks: ['_buildJSAfterTemplates']
            },
            tests: {
                files: [
                    'test/support/**/*',
                    'test/**/*.js'
                ],
                tasks: ['_buildTests']
            },
            css: {
                files: [
                    'static/less/*'
                ],
                tasks: ['_buildCSS']
            },
            images: {
                files: [
                    'static/images/**/*'
                ],
                tasks: ['_buildImages']
            },
            html: {
                files: [
                    'app/index.html.hbs'
                ],
                tasks: ['_buildHTML']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-neuter');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ember-templates');
    grunt.loadNpmTasks('grunt-casperjs');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-hashres');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-s3');
    grunt.loadNpmTasks('grunt-img');
    grunt.loadNpmTasks('grunt-qunit-istanbul');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-compile-handlebars');


    grunt.registerMultiTask('clean', 'Deletes files', function () {
        this.files.forEach(function (file) {
            file.orig.src.forEach(function (f) {
                if (grunt.file.exists(f)) {
                    grunt.file.delete(f);
                }
            });
        });
    });

    /*
     A task to run the application's unit tests via the command line.
     It will headlessy load the test runner page and print the test runner results
     */
    grunt.registerTask('test', ['_devBuild', 'qunit', 'jshint']);
    grunt.registerTask('itest', ['_devBuild', 'connect:server', 'casperjs']);

    /*
     Default task. Compiles templates, neuters application code, and begins
     watching for changes.
     */
    grunt.registerTask('default', ['_devBuild', 'watch']);

    /*
     Builds for production.
     */
    grunt.registerTask('build', ['jshint', '_devBuild', '_prodBuildSteps', '_copyDist']);

    /*
     * Uploads to s3. Requires environment variables to be set if the bucket
     * you're uploading to doesn't have public write access.
     */
    grunt.registerTask('deploy', ['build', 's3']);

    grunt.registerTask('_devBuild', ['clean', '_buildJS', '_buildTests', '_buildCSS', '_buildImages', '_buildHTML']);

    // keeping these steps out of the normal build because
    // uglify) Uglifying takes forever
    // img) Img task has dependencies that must be installed, so trying to easy the pain for new devs
    // hashres) Hashes depend on image bytes, so need to crush the images before running this
    grunt.registerTask('_prodBuildSteps', ['uglify', 'img', 'hashres']);
    grunt.registerTask('_copyDist', ['copy:dist']);

    grunt.registerTask('_buildJS', ['emberTemplates', '_buildJSAfterTemplates']);
    grunt.registerTask('_buildJSAfterTemplates', ['neuter:dev', 'neuter:prod', 'concat:dashboarddev', 'concat:dashboardprod', 'concat:libdev', 'concat:libprod']);
    grunt.registerTask('_buildTests', ['neuter:testfixtures', 'concat:tests', 'copy:test']);
    grunt.registerTask('_buildCSS', ['less']);
    grunt.registerTask('_buildImages', ['copy:images']);
    grunt.registerTask('_buildHTML', ['compile-handlebars']);
};
