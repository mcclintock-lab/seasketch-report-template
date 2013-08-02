GenericAttributesTab = require '../../lib/scripts/genericAttributesTab.coffee'
DemoTab = require '../../lib/scripts/demoTab.coffee'

window.app.registerReport (report) ->
  report.tabs [GenericAttributesTab, DemoTab]
  # path must be relative to dist/
  report.stylesheets ['./demo.css']
