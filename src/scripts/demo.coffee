GenericAttributesTab = require '../../lib/scripts/genericAttributesTab.coffee'
DemoTab = require '../../lib/scripts/demoTab.coffee'

window.app.addReports [GenericAttributesTab, DemoTab]
# path must be relative to dist/
window.app.addReportStylesheet './main.css'