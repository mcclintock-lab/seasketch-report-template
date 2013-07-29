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
        files: ['./src/scripts/**/*.coffee', './lib/scripts/**/*.coffee']
        tasks: ['browserify']
      templates:
        files: [
          './src/templates/**/*.mustache'
          './lib/templates/**/*.mustache'
        ]
        tasks: ['hogan', 'browserify']
      stylesheets:
        files: [
          'src/stylesheets/**/*.less'
          'node_modules/backbone/less/*'
          'lib/stylesheets/**/*.less'
        ]
        tasks: ['less']
      livereload:
        files: ['dist/**/*.css']
        options:
          livereload: true
    hogan:
      main:
        src: 'src/templates/templates.js'
        dest: 'src/templates/**/*.mustache'
      lib:
        dest: 'lib/templates/templates.js'
        src: 'lib/templates/**/*.mustache'
      options:
        commonJsWrapper: true
        defaultName: (filename) -> 
          filename
            .replace('src/templates/', '')
            .replace('lib/templates/', '')
            .replace('.mustache', '')
    less:
      main:
        files:
          'dist/main.css': 'src/stylesheets/main.less'
          'dist/demo.css': 'src/stylesheets/demo.less'
    browserify:
      demo:
        src: 'src/scripts/demo.coffee'
        dest: 'dist/demo.js'
      generic:
        src: 'src/scripts/generic.coffee'
        dest: 'dist/generic.js'
      options:
        transform: ['coffeeify']
        debug: true

  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-contrib-hogan')
  grunt.loadNpmTasks('grunt-contrib-less')

  # Default task(s).
  grunt.registerTask('default', ['less', 'hogan', 'browserify'])
