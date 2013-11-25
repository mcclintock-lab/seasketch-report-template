module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    connect:
      server:
        options:
          port: 8080
          base: './dist'
          keepalive: true
    watch:
      scripts:
        files: [
          'scripts/**/*.coffee', 
          'node_modules/seasketch-reporting-api/scripts/**/*.coffee'
        ]
        tasks: ['browserify']
      templates:
        files: [
          'templates/**/*.mustache'
          'node_modules/seasketch-reporting-api/templates/**/*.mustache'
        ]
        tasks: ['hogan', 'browserify']
      stylesheets:
        files: [
          'stylesheets/**/*.less'
          'node_modules/backbone/less/*'
          'node_modules/seasketch-reporting-api/stylesheets/**/*.less'
        ]
        tasks: ['less']
      livereload:
        files: ['dist/**/*.css']
        options:
          livereload: true
    hogan:
      main:
        dest: 'templates/templates.js'
        src: 'templates/**/*.mustache'
      lib:
        dest: 'node_modules/seasketch-reporting-api/templates/templates.js'
        src: 'node_modules/seasketch-reporting-api/templates/**/*.mustache'
      options:
        commonJsWrapper: true
        defaultName: (filename) -> 
          filename
            .replace('templates/', '')
            .replace('node_modules/seasketch-reporting-api/templates/', '')
            .replace('.mustache', '')
    less:
      report:
        files:
          'dist/report.css': 'stylesheets/report.less'
      main:
        files:
          'dist/main.css': 'node_modules/seasketch-reporting-api/stylesheets/common.less'
    browserify:
      report:
        src: 'scripts/report.coffee'
        dest: 'dist/report.js'
      generic:
        src: 'scripts/generic.coffee'
        dest: 'dist/generic.js'
      options:
        transform: ['coffeeify']
        debug: true
        alias: [
          'node_modules/seasketch-reporting-api/scripts/reportTab.coffee:reportTab'
          'node_modules/seasketch-reporting-api/scripts/utils.coffee:api/utils'
          'node_modules/seasketch-reporting-api/templates/templates.js:api/templates'
        ]
        ignore: ['views/collectionView']

  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-contrib-hogan')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-notify')
  
  # Default task(s).
  grunt.registerTask('default', ['less', 'hogan', 'browserify'])
