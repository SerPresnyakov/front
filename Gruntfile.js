module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    // Вся настройка находится здесь
    grunt.initConfig({
        app: 'demo',
        build: 'release',
        useminPrepare: {
            html: '<%= app %>/index.html',
            options: {
                dest: '<%= build %>'
            }
        },
        filerev:{
            build:{
                scr:[
                    '<%= build %>/js/{,*/}*.js',
                    '<%= build %>/css/{,*/}*.css'
                ]
            }
        },
        usemin: {
            html: ['<%= build %>/index.html']
        },
        compress: {
            main: {
                options: {
                    archive: "TableAdmin.tar.gz",
                    mode: 'tgz'
                },
                files: [
                    {cwd: 'release/', expand: true, src: ['**/*']},
                    {cwd: 'demo/', expand: true, src: ['**/icons/*']}

                ]
            }
        },
        shell: {
            uploadRelease: {
                command: "curl -k --user 'ser:123123' --upload-file release.tar.gz https://nexus.hb.vmc.loc/repository/acontext-front-release/TableAdmin.tar.gz"
            }
        }
    });

    // Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('build', [
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify:generated',
        'filerev',
        'usemin',
        'compress',
        'shell:uploadRelease'
    ]);

};