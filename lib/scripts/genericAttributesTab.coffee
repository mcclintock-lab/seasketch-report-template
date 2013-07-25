ReportTab = require './reportTab.coffee'
templates = require '../templates/templates.js'

class GenericAttributesTab extends ReportTab
  name: 'Attributes'
  className: 'genericAttributes'
  template: templates.genericAttributes

  render: () ->
    context =
      sketch: @model.forTemplate()
      sketchClass: @sketchClass.forTemplate()
      attributes: @model.getAttributes()
      admin: @project.isAdmin window.user
    @$el.html @template.render(context, templates)


module.exports = GenericAttributesTab