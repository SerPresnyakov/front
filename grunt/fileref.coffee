module.exports = () ->
  build:
    scr: [
      '<%= build %>/js/{,*/}*.js',
      '<%= build %>/css/{,*/}*.css'
    ]
