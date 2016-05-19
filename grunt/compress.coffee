module.exports = () ->
  release:
    options:
      archive: "TableAdmin.tar.gz",
      mode: 'tgz'
    ,
    files: [
      {cwd: 'release/', expand: true, src: ['**/*']},
      {cwd: 'demo/', expand: true, src: ['**/icons/*']}
    ]
