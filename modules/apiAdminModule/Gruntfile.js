module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    // Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        dirs: {
            app: '.',
            release: 'release/app',
            cwd: 'release'
        },
        archiveName: "<%= pkg.name %>-<%= pkg.version %>.tar.gz",
        clean: {
            release: {
                src: "<%= dirs.release %>/*"
            }
        },
        copy: {
            release: {
                files: [
                    {
                        expand: true,
                        cwd: "<%= dirs.release %>/../",
                        src: ['Dockerfile', 'nginx-docker.conf'],
                        dest: "<%= dirs.release %>"
                    },
                    {
                        expand: true,
                        cwd: "<%= dirs.app %>",
                        src: ['index.html'],
                        dest: "<%= dirs.release %>"
                    },
                    {
                        expand: true,
                        cwd: "<%= dirs.app %>/bower/fontawesome",
                        src: ['fonts/**'],
                        dest: "<%= dirs.release %>"
                    },
                    {
                        expand: true,
                        cwd: "<%= dirs.app %>/bower/inspinia/dist/css",
                        src: ['patterns/**'],
                        dest: "<%= dirs.release %>/css"
                    }
                ]
            }
        },
        useminPrepare: {
            html: '<%= dirs.app %>/index.html',
            options: {
                dest: '<%= dirs.release %>'
            }
        },
        uglify:{
            options:{
                mangle:false,
                beautify:true
            }
        },
        filerev:{
            build:{
                src:[
                    '<%= dirs.release %>/js/{,*/}*.js',
                    '<%= dirs.release %>/css/{,*/}*.css'
                ]
            }
        },
        usemin: {
            html: ['<%= dirs.release %>/index.html']
        },
        compress: {
            main: {
                options: {
                    archive: "<%= archiveName %>",
                    mode: 'tgz'
                },
                files: [
                    {cwd: '<%= dirs.release %>/../', expand: true, src: ['*/**', '*']}
                ]
            }
        },
        shell: {
            uploadRelease: {
                command: "curl -v -k --user 'admin:admin123' --upload-file <%= archiveName %> https://nexus.hb.vmc.loc/repository/acontext-front-releases/<%= archiveName %>"
            }
        }
    });

    // Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('build', [
        'clean:release',
        'copy',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'uglify',
        'filerev',
        'usemin'
    ]);

    grunt.registerTask('release', [
        'compress:main',
        'shell:uploadRelease'
    ])

};