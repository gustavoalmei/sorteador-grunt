module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        less: {
            development: {// ambiente de desenvolvimento
                files: {
                    'dev/styles/main.css' : 'src/styles/main.less'
                },
            },
            production:{// ambiente de produção (usuário final)
                options:{
                    compress: true,
                },
                files:{
                    'dist/styles/main.min.css' : 'src/styles/main.less'
                }
            }
        },
        watch:{
            less:{
                files:['./src/styles/**/*.less'],
                tasks:['less:development']
            },
            html:{
                files:['./src/index.html'],
                tasks:['replace:dev']
            },
            js:{
                files:['./src/**/*.js'],
                tasks:['replace:dev']
            }
        },
        replace:{
            dev:{
                options:{
                    patterns:[
                        {
                            match:'FILE_CSS',
                            replacement: './styles/main.css',
                        },
                        {
                            match:'FILE_JS',
                            replacement: './src/scripts/main.js',
                        }
                    ]
                },
                files:[
                    {
                        expand:true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    },
                    {
                        expand:true,
                        flatten: true,
                        src: ['src/scripts/**/*.js'],
                        dest: 'dev/scripts/'
                    }
                ]
            },
            dist:{
                options:{
                    patterns:[
                        {
                            match:'FILE_CSS',
                            replacement: './styles/main.min.css',
                        },
                        {
                            match:'FILE_JS',
                            replacement: './scripts/main.min.js',
                        }
                    ]
                },
                files:[
                    {
                        expand:true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin:{
            dist:{
                options:{
                    removeComments: true,
                    collapseWhitespace: true
                },
                files:{
                    'prebuild/index.html' : 'src/index.html'
                }
            }
        },
        clean: ['prebuild'],
        uglify: {
            target:{
                files: {
                    'dist/scripts/main.min.js' : 'src/scripts/main.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-replace');

    grunt.registerTask('default', ['watch'])
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify'])
}