Tab = require './tab.coffee'

window.app.registerReport (report) ->
  report.tabs [Tab]
  # path must be relative to dist/
  report.stylesheets ['./report.css']
