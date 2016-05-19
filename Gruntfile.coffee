path = require('path')

module.exports = (grunt) ->

  require('load-grunt-config') grunt,
    configPath: path.join(process.cwd(), 'grunt')
    init: true
    data:
      dirs:
        root: process.cwd()
    mergeFunction: require('recursive-merge')
    loadGruntTasks:
      pattern: 'grunt-*'
      config: require('./package.json')
      scope: 'dependencies'
    postProcess: (config) ->
    preMerge: (config, data) ->
