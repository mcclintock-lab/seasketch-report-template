class ReportTab extends Backbone.View
  name: 'Information'
  dependencies: []

  initialize: (@model, @options) ->
    # Will be initialized by SeaSketch with the following arguments:
    #   * model - The sketch being reported on
    #   * options
    #     - .parent - the parent report view 
    #        call @options.parent.destroy() to close the whole report window
    @app = window.app
    _.extend @, @options

  render: () ->
    throw 'render method must be overidden'

  show: () ->
    @$el.show()
    @visible = true

  hide: () ->
    @$el.hide()
    @visible = false

  remove: () =>
    super()
  
  onLoading: () -> # extension point for subclasses

module.exports = ReportTab