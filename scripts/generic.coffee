GenericAttributesTab = require '../../lib/scripts/genericAttributesTab.coffee'

window.app.registerReport (report) ->
  report.tabs [GenericAttributesTab]
  # path must be relative to dist/
  report.stylesheets ['./main.css']
