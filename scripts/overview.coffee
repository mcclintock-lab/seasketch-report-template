ReportTab = require 'reportTab'
templates = require '../templates/templates.js'
_partials = require '../node_modules/seasketch-reporting-api/templates/templates.js'

partials = []
for key, val of _partials
  partials[key.replace('node_modules/seasketch-reporting-api/', '')] = val
d3=window.d3

class OverviewTab extends ReportTab
  name: 'Overview'
  className: 'overview'
  template: templates.overview
  dependencies: [
     'SizeToolbox' 
     'OverlapWithTidalAreas'
  ]
  render: () ->
    # pull data from GP script
    isCollection = @model.isCollection()
    areas = @recordSet('SizeToolbox', 'Size').toArray()
    intertidal_areas = @recordSet('OverlapWithTidalAreas', 'Areas').toArray()
    intertidalAreas = 0.0
    if intertidal_areas?.length > 0
      @roundData(intertidal_areas, 'SizeAcres', 'SizePerc')
      intertidalAreas = intertidal_areas[0]

    # setup context object with data and render the template from it
    context =
      sketch: @model.forTemplate()
      sketchClass: @sketchClass.forTemplate()
      attributes: @model.getAttributes()
      admin: @project.isAdmin window.user
      areas: areas
      isCollection: isCollection
      intertidalAreas: intertidalAreas

    @$el.html @template.render(context, templates)

  roundData: (data, area_col, perc_col) =>
    for d in data
      if area_col != undefined
        d[area_col] = parseFloat(d[area_col]).toFixed(2)
      if perc_col != undefined
        d[perc_col] = parseFloat(d[perc_col]).toFixed(2)

  addCommas: (num_str) =>
    num_str += ''
    x = num_str.split('.')
    x1 = x[0]
    x2 = if x.length > 1 then '.' + x[1] else ''
    rgx = /(\d+)(\d{3})/
    while rgx.test(x1)
      x1 = x1.replace(rgx, '$1' + ',' + '$2')
    return x1 + x2

module.exports = OverviewTab