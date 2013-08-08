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

  getResult: (id) ->
    results = @getResults()
    result = _.find results, (r) -> r.paramName is id
    unless result?
      throw new Error('No result with id ' + id)
    result.value

  getFirstResult: (param, id) ->
    result = @getResult(param)
    try
      return result[0].features[0].attributes[id]
    catch e
      throw "Error finding #{param}:#{id} in gp results"

  getResults: () ->
    unless results = @results?.get('data')?.results
      throw new Error('No gp results')
    _.filter results, (result) ->
      result.paramName not in ['ResultCode', 'ResultMsg']

module.exports = ReportTab