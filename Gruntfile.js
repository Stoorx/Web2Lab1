module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            dist: {
                files: {
                    "dist/index.js": "src/index.js"
                }
            }
        },
        watch: {
            js: {
                files: ['src/*.js'],
                tasks: ['babel']
            },
            // css: {
            //
            // },
            html: {
                files: ['src/*.html'],
                tasks: ['htmlbuild']
            },
            options: {
                livereload: true
            }
        },
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: {
                        path: 'dist',
                        options: {
                            index: 'index.html'
                        }
                    }
                }
            }
        },
        htmlbuild: {
            dist: {
                src: 'src/*.html',
                dest: 'dist/',
                options: {
                    beautify: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-html-build');

    grunt.registerTask('dev', ['babel', 'htmlbuild']);
    grunt.registerTask('serve', ['dev', 'connect', 'watch']);
};
