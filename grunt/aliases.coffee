module.exports = () ->
  build: [
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify:generated',
    'filerev',
    'usemin'
  ]
  release: [
    'compress',
    'shell:uploadRelease'
  ]