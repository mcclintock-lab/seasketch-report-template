ReportTab = require './reportTab.coffee'
templates = require '../templates/templates.js'
d3 = require '../../node_modules/d3/index-browserify.js'

class DemoTab extends ReportTab
  name: 'Examples'
  className: 'demo'
  template: templates.demo

  render: () ->
    context =
      sketch: @model.forTemplate()
      sketchClass: @sketchClass.forTemplate()
      attributes: @model.getAttributes()
      admin: @project.isAdmin window.user
      chartData: _.times 100, () -> Math.round(Math.random() * 100)
    
    @$el.html @template.render(context, templates)
    


module.exports = DemoTab