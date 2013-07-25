GenericAttributesTab = require '../../lib/scripts/genericAttributesTab.coffee'

window.app.addReports [GenericAttributesTab]
# path must be relative to dist/
window.app.addReportStylesheet './main.css'
